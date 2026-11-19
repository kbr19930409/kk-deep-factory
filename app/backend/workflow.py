"""Read-only workflow projection from durable audit timestamps, never UI clocks."""
from datetime import datetime, timezone
from dispatch_plan import required_roles

ROLE_LABELS = {'business_owner':'业务负责人','acceptor':'最终验收人','technician':'维修执行人',
               'manager':'工厂总管',
               'technical_reviewer':'技术复核人','maintenance_coordinator':'维修计划员',
               'efficiency_advisor':'生产损失分析员','maintenance_advisor':'设备诊断员',
               'operations_employee':'运行巡检员工','report_employee':'班报员工',
               'business_service':'业务服务 / 数据观察','data_admin':'数据管理员'}
AI_ROLES = {'manager','efficiency_advisor','maintenance_advisor','maintenance_coordinator','operations_employee','report_employee'}
TERMINAL = {'SUCCEEDED','FAILED','TIMED_OUT','CANCELLED'}
CASE_TERMINAL = {'CLOSED','CANCELLED','DISMISSED'}
STATE_LABELS = {'QUEUED':'等待模型运行','RUNNING':'实际运行','WAITING_TOOL':'等待工具回执',
                'WAITING_HUMAN':'等待人工交付','BLOCKED':'受阻待处理','FAILED':'失败','TIMED_OUT':'超时',
                'CANCELLED':'取消','SUCCEEDED':'已交付'}
PLAN = [('triage','核实异常','business_owner'),('analysis_efficiency','效率分析','efficiency_advisor'),
        ('analysis_maintenance','运维分析','maintenance_advisor'),('proposal','形成处置提案','maintenance_coordinator'),
        ('decision','人工批准提案','business_owner'),('dispatch','创建与回读工单','maintenance_coordinator'),
        ('accept','等待接单','technician'),('execution','执行并提交结果','technician'),
        ('technical_review','技术复核','technical_reviewer'),('acceptance','最终验收','acceptor'),
        ('observation','恢复观察与核验','business_service'),('close','复核并结案','acceptor')]


def _dt(value):
    try:
        result=datetime.fromisoformat(value.replace('Z','+00:00'))
        return result if result.tzinfo else None
    except (ValueError,TypeError,AttributeError): return None


def _seconds(start,end):
    a,b=_dt(start),_dt(end)
    return (b-a).total_seconds() if a and b and b>=a else None


def _union(intervals):
    spans=sorted((_dt(a).timestamp(),_dt(b).timestamp()) for a,b in intervals if _seconds(a,b) is not None)
    total=0;edge=None
    for a,b in spans:
        total+=max(0,b-max(a,edge if edge is not None else a));edge=max(b,edge if edge is not None else b)
    return total


def _refs(row): return ['AUDIT-'+str(row['seq'])] if row else []


def _valid_analysis_kinds(case):
    return {a['kind'] for a in case.get('analyses',[])
            if a.get('analysis_cycle')==case.get('analysis_cycle')
            and a.get('baseline_snapshot_hash')==case.get('metrics',{}).get('snapshot_hash')}


def _evidence(row):
    details=(row or {}).get('data',{})
    ev=details.get('evidence',{}) if isinstance(details,dict) else {}
    ev=ev if isinstance(ev,dict) else {}
    refs=ev.get('evidence_refs',[])
    refs=[refs] if isinstance(refs,str) else refs if isinstance(refs,list) else []
    return str(ev.get('notes','')),[r for r in refs if isinstance(r,str)]


def _person(role,case,order=None,actor_id=None):
    obj=order or case
    assigned={'business_owner':'owner_id','acceptor':'acceptor_id','technician':'assignee_id'}
    return {'role':role,'role_label':ROLE_LABELS.get(role,role),'actor_type':'system' if role=='business_service' else 'ai' if role in AI_ROLES else 'human',
            'actor_id':actor_id or obj.get(assigned.get(role,''))}


def _periods(initial,start,changes,final,as_of,terminal):
    """Each entry is a recorded state occupancy, not a person's work timer."""
    result=[];state=initial;begin=start;entry=None
    for row,target in changes:
        before=row.get('data',{}).get('from')
        if before is not None and before!=state:
            state=before;begin=None
        if state not in terminal:
            result.append({'state':state,'start':begin,'end':row['created_at'],'entry':entry,'exit':row,'current':False})
        state=target;begin=row['created_at'];entry=row
    if final not in terminal:
        if state!=final: begin=None
        result.append({'state':final,'start':begin,'end':None,'entry':entry,'exit':None,'current':True})
    return result


def project_workflow(case,audits,*,now=None):
    """Pure projection. Caller must scope case, relations and audit rows first."""
    as_of=(now or datetime.now(timezone.utc)).isoformat()
    rows=sorted(audits,key=lambda r:r['seq'])
    by_entity={}
    for row in rows: by_entity.setdefault((row['entity_type'],row['entity_id']),[]).append(row)
    crows=by_entity.get(('cases',case['id']),[])
    orders={w['id']:w for w in case.get('work_orders',[])}
    analyses={a['id']:a for a in case.get('analyses',[])}
    observations={o['id']:o for o in case.get('observations',[])}
    artifacts=[];steps=[];handoffs=[];unknown=[];ai_active=[];human_wait=[]
    stage_order={key:i for i,(key,_,_) in enumerate(PLAN)}

    def artifact(obj,kind,title,summary=''):
        artifacts.append({'id':obj['id'],'kind':kind,'title':title,'summary':summary[:800],
                          'recorded_at':obj.get('created_at')})

    for a in analyses.values():
        raw=a.get('raw');summary=raw.get('summary','') if isinstance(raw,dict) else ''
        artifact(a,'analysis',ROLE_LABELS.get(a['kind'],a['kind'])+'分析产物',summary if isinstance(summary,str) else '')
    for w in orders.values(): artifact(w,'work_order',w.get('title',w['id']),'工单状态：'+w['state'])
    for o in observations.values(): artifact(o,'observation','恢复观察核验','数据核验通过' if o['passed'] else '数据核验未通过；不能据此结案')

    def add_step(identifier,stage,title,role,start,end,kind,status='completed',*,entry=None,exit=None,order=None,artifact_ids=None,notes='',actor_id=None,**extra):
        evidence_notes,refs=_evidence(exit or entry)
        duration=_seconds(start,end or as_of)
        step={'id':identifier,'stage_id':stage,'title':title,**_person(role,case,order,actor_id),
              'status':status,'start_at':start,'end_at':end,'duration_seconds':duration,'duration_kind':kind,
              'notes':notes or evidence_notes,'artifact_ids':artifact_ids or [],'evidence_refs':refs,
              'source_refs':list(dict.fromkeys(_refs(entry)+_refs(exit))),**extra}
        if duration is None: step['timing_note']='起止记录不足或时间顺序异常，耗时未知'
        elif kind=='human_wait': step['timing_note']='待人工响应的状态区间，可能包含审阅，不能等同纯排队时间'
        elif kind=='field_work': step['timing_note']='工单执行状态的墙钟跨度，未记录实际人工工时'
        elif kind=='unknown': step['timing_note']='业务阶段跨度；不能推断其中实际执行或等待各占多久'
        else: step['timing_note']='依据服务端审计时间；不是设备事件时间或模型纯推理时长'
        steps.append(step)
        if kind=='human_wait' and duration is not None: human_wait.append((start,end or as_of))
        return step

    # Case intervals supply triage, decision and observation boundaries. Work
    # order periods below supply the more precise execution/review boundaries.
    changes=[]
    for row in crows:
        target=row['data'].get('to') if row['operation'] in ('transition','work_order_receipt') else 'WAITING_ACTION' if row['operation']=='approve_proposal' else None
        if target: changes.append((row,target))
    case_periods=_periods('WAITING_TRIAGE',case.get('created_at'),changes,case['state'],as_of,CASE_TERMINAL)
    for i,p in enumerate(case_periods):
        state=p['state'];status='current' if p['current'] else 'completed'
        params={'entry':p['entry'],'exit':p['exit']}
        if state=='WAITING_TRIAGE': add_step(f'case-{i}','triage','等待负责人核实异常','business_owner',p['start'],p['end'],'human_wait',status,**params)
        elif state=='ANALYSING': add_step(f'case-{i}','analysis_preparation','顾问协作分析阶段','business_owner',p['start'],p['end'],'unknown',status,notes='阶段内可包含并行分析、重试及等待发起；逐次 AI 运行单独列出。',**params)
        elif state=='WAITING_DECISION':
            entry = p['entry']
            cycle_start = next((r['seq'] for r, target in reversed(changes) if entry and r['seq'] <= entry['seq'] and target == 'ANALYSING'), None)
            within_cycle = [r for r in rows if cycle_start is not None and r['seq'] >= cycle_start and (not p['exit'] or r['seq'] <= p['exit']['seq'])]
            plan = next((r for r in within_cycle if r['entity_type'] == 'cases' and r['operation'] == 'plan_dispatch' and r['data'].get('route') == 'diagnosis'), None)
            proposal = next((r for r in within_cycle if r['entity_type'] == 'analyses' and r['operation'] == 'save_actual_output' and analyses.get(r['entity_id'], {}).get('kind') == 'maintenance_coordinator'), None)
            if not plan or (proposal and proposal['seq'] <= plan['seq']):
                add_step(f'case-{i}','decision','等待负责人决定处置','business_owner',p['start'],p['end'],'human_wait',status,**params)
                continue
            manager_start = plan if plan['seq'] > entry['seq'] else entry
            if manager_start is plan:
                add_step(f'case-{i}-owner','decision','等待负责人发起处置提案','business_owner',p['start'],plan['created_at'],'human_wait',entry=entry,exit=plan)
            review = proposal if proposal and proposal['seq'] > entry['seq'] else None
            if not proposal or review:
                add_step(f'case-{i}-arrange','proposal','总管核对检查项并安排方案','manager',manager_start['created_at'],review['created_at'] if review else p['end'],'unknown','completed' if review else status,entry=manager_start,exit=review or p['exit'])
            if proposal:
                since = review or entry
                add_step(f'case-{i}-review','decision','等待负责人审阅批准提案','business_owner',since['created_at'],p['end'],'human_wait',status,entry=since,exit=p['exit'],artifact_ids=[proposal['entity_id']])
        elif state=='WAITING_ACTION':
            issued=[r for r in rows if r['entity_type']=='work_orders' and r['operation']=='create_issued' and _dt(p['start']) and _dt(r['created_at'])>=_dt(p['start']) and (not p['end'] or _dt(r['created_at'])<=_dt(p['end']))]
            end=issued[0]['created_at'] if issued else p['end']
            add_step(f'case-{i}','dispatch','批准后等待派工交付','maintenance_coordinator',p['start'],end,'unknown','completed' if end else status,**params)
        elif state=='OBSERVING':
            begin=p['start'];role='business_service';kind='observation';entry=p['entry'];aids=[]
            checkpoints=[r for r in rows if ((r['entity_type']=='observations' and r['entity_id'] in observations) or (r['entity_type']=='cases' and r['operation']=='configure_observation'))
                         and _dt(begin) and _dt(r['created_at'])>=_dt(begin) and (not p['end'] or _dt(r['created_at'])<=_dt(p['end']))]
            for n,row in enumerate(checkpoints):
                add_step(f'case-{i}-observe-{n}','close' if kind=='human_wait' else 'observation','等待最终结案决定' if kind=='human_wait' else '恢复观察与数据核验',role,begin,row['created_at'],kind,entry=entry,exit=row,artifact_ids=aids)
                passed=row['entity_type']=='observations' and row['data'].get('passed') is True
                begin=row['created_at'];entry=row;role='acceptor' if passed else 'business_service';kind='human_wait' if passed else 'observation'
                aids=[row['entity_id']] if row['entity_type']=='observations' else []
            add_step(f'case-{i}-observe-current','close' if kind=='human_wait' else 'observation','等待最终结案决定' if kind=='human_wait' else '恢复观察与数据核验',role,begin,p['end'],kind,status,entry=entry,exit=p['exit'],artifact_ids=aids)

    order_roles={'ISSUED':('accept','等待维修人员接单','technician','human_wait'),
                 'ACCEPTED':('execution','已接单，等待开始执行','technician','human_wait'),
                 'IN_PROGRESS':('execution','执行并提交维修结果','technician','field_work'),
                 'WAITING_TECH_REVIEW':('technical_review','等待技术复核决定','technical_reviewer','human_wait'),
                 'WAITING_ACCEPTANCE':('acceptance','等待最终验收决定','acceptor','human_wait')}
    for w in orders.values():
        wrows=by_entity.get(('work_orders',w['id']),[])
        transitions=[(r,r['data']['to']) for r in wrows if r['operation']=='transition' and r['data'].get('to')]
        periods=_periods('ISSUED',w.get('created_at'),transitions,w['state'],as_of,{'COMPLETED','CANCELLED'})
        attempt={}
        for i,p in enumerate(periods):
            if p['state'] not in order_roles: continue
            stage,title,role,kind=order_roles[p['state']];attempt_key=(stage,kind);attempt[attempt_key]=attempt.get(attempt_key,0)+1
            add_step(w['id']+'-'+str(i),stage,title,role,p['start'],p['end'],kind,'current' if p['current'] else 'completed',
                     entry=p['entry'],exit=p['exit'],order=w,artifact_ids=[w['id']],attempt=attempt[attempt_key])

    # Each AI attempt keeps its own state intervals. Never derive a model end
    # from updated_at: later human tracking legitimately updates that field.
    run_views=[];run_attempts={};run_spans={};run_steps=[];ai_timing_unknown=False
    cycle_rows=[r for r,target in changes if target=='ANALYSING']
    for run in sorted(case.get('agent_runs',[]),key=lambda r:(r.get('created_at',''),r['id'])):
        role=run['role'];associated=[a['id'] for a in analyses.values() if a.get('agent_run_id')==run['id']]
        stage='analysis_efficiency' if role=='efficiency_advisor' else 'analysis_maintenance' if role=='maintenance_advisor' else 'proposal' if role=='maintenance_coordinator' and (associated or run.get('input',{}).get('question')) else 'dispatch' if role=='maintenance_coordinator' else role
        run_attempts[stage]=run_attempts.get(stage,0)+1;attempt=run_attempts[stage]
        cycle=sum(1 for row in cycle_rows if _dt(run.get('created_at')) and _dt(row['created_at'])<=_dt(run['created_at']))
        rrows=by_entity.get(('agent_runs',run['id']),[])
        transitions=[(r,r['data']['to']) for r in rrows if r['operation']=='transition' and r['data'].get('to')]
        periods=_periods('QUEUED',run.get('created_at'),transitions,run['state'],as_of,TERMINAL)
        start=next((r['created_at'] for r,target in transitions if target=='RUNNING'),None)
        end=next((r['created_at'] for r,target in reversed(transitions) if target in TERMINAL),None)
        missing=(run['state'] in TERMINAL and end is None) or (run['state'] not in ('QUEUED','CANCELLED') and start is None)
        artifact(run,'agent_run',ROLE_LABELS.get(role,role)+' · 第 '+str(attempt)+' 次运行',STATE_LABELS.get(run['state'],run['state']))
        linked=(run.get('output') or {}).get('work_order') if isinstance(run.get('output'),dict) else None
        if isinstance(linked,dict) and linked.get('id') in orders: associated.append(linked['id'])
        segments=[];active=[];queued=[];waiting=[];tool_wait=[]
        for i,p in enumerate(periods):
            kind={'QUEUED':'ai_queue','RUNNING':'ai_active','WAITING_TOOL':'ai_tool_wait','WAITING_HUMAN':'ai_wait_human'}.get(p['state'],'unknown')
            duration=_seconds(p['start'],p['end'] or as_of)
            if duration is None: missing=True
            span=(p['start'],p['end'] or as_of)
            if duration is not None:
                if kind=='ai_active': active.append(span);ai_active.append(span)
                elif kind=='ai_queue': queued.append(span)
                elif kind=='ai_wait_human': waiting.append(span)
                elif kind=='ai_tool_wait': tool_wait.append(span)
            next_state=p['exit']['data'].get('to') if p['exit'] else None
            status='current' if p['current'] else 'failed' if next_state in ('FAILED','TIMED_OUT') else 'cancelled' if next_state=='CANCELLED' else 'completed'
            step=add_step(run['id']+'-'+str(i),stage,ROLE_LABELS.get(role,role)+' · '+STATE_LABELS.get(p['state'],p['state']),role,p['start'],p['end'],kind,status,
                     entry=p['entry'],exit=p['exit'],actor_id=run.get('actor_id'),artifact_ids=[run['id']]+associated,
                     attempt=attempt,analysis_cycle=cycle,parallel_group=None)
            run_steps.append((run['id'],step))
            segments.append({'state':p['state'],'start_at':p['start'],'end_at':p['end'],'duration_seconds':duration,'duration_kind':kind})
        if missing: ai_timing_unknown=True
        run_spans[run['id']]=active
        run_views.append({'id':run['id'],'role':role,'role_label':ROLE_LABELS.get(role,role),'state':run['state'],'stage_id':stage,'attempt':attempt,
                          'created_at':run.get('created_at'),'started_at':start,'ended_at':end,'active_seconds':None if missing else _union(active),
                          'queued_seconds':_union(queued),'waiting_human_seconds':_union(waiting),'waiting_tool_seconds':_union(tool_wait),
                          'segments':segments,'artifact_ids':associated,'parallel_with':[]})
    for view in run_views:
        view['parallel_with']=[other['id'] for other in run_views if other['id']!=view['id'] and any(
            max(_dt(a),_dt(c))<min(_dt(b),_dt(d)) for a,b in run_spans[view['id']] for c,d in run_spans[other['id']])]
    for run_id,step in run_steps:
        if step['duration_kind']!='ai_active' or not step['stage_id'].startswith('analysis_'):
            continue
        start,end=step['start_at'],step['end_at'] or as_of
        if _seconds(start,end) is not None and any(
                max(_dt(start),_dt(a))<min(_dt(end),_dt(b))
                for other_id,spans in run_spans.items() if other_id!=run_id for a,b in spans):
            step['parallel_group']='analysis-cycle-'+str(step['analysis_cycle'])
    if ai_timing_unknown or any(not a.get('agent_run_id') for a in analyses.values()):
        unknown.append('部分分析或 AI 运行缺少开始/结束审计，AI 总运行耗时不可完整计算。')

    # Handoffs are receipts/state changes, not imagined conversations. Artifact
    # summaries are bounded; complete documents remain in the case's own lists.
    def handoff(row,title,from_role,to_role,*,artifact_ids=None,order=None,notes=None):
        evidence_notes,evidence_refs=_evidence(row)
        handoffs.append({'id':'HANDOFF-'+str(row['seq']),'timestamp':row['created_at'],'title':title,
                         'from':_person(from_role,case,order,row.get('actor_id') if from_role==row.get('actor_role') else None),
                         'to':_person(to_role,case,order),'artifact_ids':artifact_ids or [],'evidence_refs':evidence_refs,
                         'notes':notes if notes is not None else evidence_notes,'source_refs':_refs(row)})
    for row in rows:
        op=row['operation'];details=row['data'];etype=row['entity_type'];entity=row['entity_id']
        if etype=='cases' and op=='transition' and details.get('to')=='ANALYSING':
            handoff(row,'负责人确认范围，进入顾问协作','business_owner','business_service')
        elif etype=='agent_runs':
            run=next((r for r in case.get('agent_runs',[]) if r['id']==entity),None)
            if run and op=='create':
                handoff(row,'AI 作业已登记，等待实际运行','business_service',run['role'],artifact_ids=[entity])
            elif run and details.get('to') in ('FAILED','TIMED_OUT','BLOCKED'):
                handoff(row,'AI 作业未完成，交回负责人处理',run['role'],'business_owner',artifact_ids=[entity],notes='失败、超时或受阻已记录；有效产物是否保留，以关联交付记录为准。')
        elif etype=='analyses' and entity in analyses:
            a=analyses[entity]
            handoff(row,'AI 产物已交付，等待人工核对',a['kind'],'business_owner',artifact_ids=[entity])
        elif etype=='cases' and op=='approve_proposal':
            aid='APPROVAL-'+str(row['seq']);p=details.get('proposal',{})
            artifacts.append({'id':aid,'kind':'approval','title':'负责人批准处置提案','summary':str(p.get('title',''))[:800],'recorded_at':row['created_at']})
            handoff(row,'人批准提案，交给维修计划员','business_owner','maintenance_coordinator',artifact_ids=[aid])
        elif etype=='work_orders' and entity in orders:
            w=orders[entity];target=details.get('to');old=details.get('from')
            if op=='create_issued': handoff(row,'工单已下发，等待维修人员接单','maintenance_coordinator','technician',artifact_ids=[entity],order=w)
            elif target=='WAITING_TECH_REVIEW': handoff(row,'维修结果提交技术复核','technician','technical_reviewer',artifact_ids=[entity],order=w)
            elif target=='WAITING_ACCEPTANCE': handoff(row,'技术复核完成，提交最终验收','technical_reviewer','acceptor',artifact_ids=[entity],order=w)
            elif target=='COMPLETED': handoff(row,'验收完成，进入恢复观察','acceptor','business_service',artifact_ids=[entity],order=w)
            elif target=='IN_PROGRESS' and old in ('WAITING_TECH_REVIEW','WAITING_ACCEPTANCE'):
                handoff(row,'复核或验收退回，重新执行','technical_reviewer' if old=='WAITING_TECH_REVIEW' else 'acceptor','technician',artifact_ids=[entity],order=w)
        elif etype=='observations' and entity in observations:
            handoff(row,'观察核验通过，等待结案决定' if details.get('passed') else '观察未通过，交回负责人处理','business_service','acceptor' if details.get('passed') else 'business_owner',artifact_ids=[entity])

    current,next_roles=_current(case,run_views,steps,as_of)
    if case['state'] not in CASE_TERMINAL:
        seen={s['stage_id'] for s in steps};position=stage_order.get(current['stage_id'],1)
        proposal_needed=(case['state']=='WAITING_DECISION'
                         and 'maintenance_coordinator' not in _valid_analysis_kinds(case)
                         and not any(r['stage_id']=='proposal' and r['state'] in ('QUEUED','RUNNING','WAITING_TOOL') for r in run_views))
        for stage,title,role in PLAN:
            if case.get('analysis_plan'):
                if stage.startswith('analysis_') and role not in required_roles(case): continue
                if case['analysis_plan']['route'] in ('loss','field','process_followup') and stage_order[stage]>=stage_order['proposal']: continue
            if (stage not in seen and stage_order[stage]>=position) or (stage=='proposal' and proposal_needed):
                notes='本轮有效处置提案尚未交付，由总管核对进展。' if stage=='proposal' and proposal_needed else '计划中的后续环节，尚无发生记录。'
                add_step('pending-'+stage,stage,title,role,None,None,'unknown','pending',notes=notes)
    # Timestamp order for actual activity; untimed/pending nodes remain explicit.
    steps.sort(key=lambda s:(s['status']=='pending',_dt(s['start_at']) or _dt(s['end_at']) or datetime.max.replace(tzinfo=timezone.utc),stage_order.get(s['stage_id'],len(PLAN)),s['id']))
    terminals=[r for r,target in changes if target in CASE_TERMINAL]
    ended=terminals[-1]['created_at'] if case['state'] in CASE_TERMINAL and terminals else None
    wall=_seconds(case.get('created_at'),ended or as_of) if case['state'] not in CASE_TERMINAL or ended else None
    if wall is None: unknown.append('案例创建或终结时间不足，不能计算完整墙钟耗时。')
    human_timing_unknown=any(s['duration_kind']=='human_wait' and s['status']!='pending' and s['duration_seconds'] is None for s in steps)
    if human_timing_unknown: unknown.append('部分待人工响应阶段缺少起止记录，累计等待时间未知。')
    unknown.append('未采集人员开始/结束工作的独立打点，实际人工工时未知；待人工响应区间可能包含审阅。')
    return {'schema_version':1,'case_id':case['id'],'generated_at':as_of,'source':'audit_projection','current':current,
            'next_responsibilities':next_roles,'metrics':{'started_at':case.get('created_at'),'ended_at':ended,'wall_elapsed_seconds':wall,
              'ai_active_seconds':None if ai_timing_unknown or any(not a.get('agent_run_id') for a in analyses.values()) else _union(ai_active),
              'human_wait_seconds':None if human_timing_unknown else _union(human_wait),'human_work_seconds':None,'unknown_reasons':unknown,'overlap_policy':'union'},
            'steps':steps,'handoffs':sorted(handoffs,key=lambda h:int(h['id'].split('-')[-1])),'ai_runs':run_views,'artifacts':artifacts,
            'notes':['时间来自服务端真实记录/审计，不使用设备历史窗口冒充处理时间。',
                     '总历时按案例创建至结案或当前时刻计算；AI 并行运行和待人工区间分别取并集，三者不可相加。',
                     'AI 运行态包含模型调用与编排，工具等待、排队及等待人工单独列出，不能等同模型纯推理耗时。',
                     '当前身份为工作区所有者的开发岗位委派，角色标签不是已验证的真实员工身份。']}


def _current(case,runs,steps,as_of):
    active_orders=[w for w in case.get('work_orders',[]) if w['state'] not in ('COMPLETED','CANCELLED')]
    active_runs=[r for r in runs if r['state'] in ('RUNNING','WAITING_TOOL','QUEUED')]
    order=active_orders[-1] if active_orders else None
    state=case['state'];participants=[];next_roles=[]
    if state in CASE_TERMINAL:
        stage,label,role,status,reason='close','任务已结束','acceptor','complete','主任务已终结；保留真实历史记录，不安排下一棒。'
    elif order:
        mapping={'ISSUED':('accept','等待接单','technician','waiting','工单已下发，等待指定维修人员接单。','technician','接单并开始执行'),
                 'ACCEPTED':('execution','已接单，等待执行','technician','waiting','维修人员已接单，尚无开始执行的状态记录。','technician','开始执行并填写现场记录'),
                 'IN_PROGRESS':('execution','执行中','technician','executing','工单处于执行状态；实际人工工时未打点。','technical_reviewer','接收维修结果并技术复核'),
                 'WAITING_TECH_REVIEW':('technical_review','等待技术复核','technical_reviewer','waiting','等待技术复核决定，包含可能的审阅时间。','acceptor','接收复核结果并验收'),
                 'WAITING_ACCEPTANCE':('acceptance','等待最终验收','acceptor','waiting','等待最终验收人通过或退回；通过后仍须恢复观察。','business_service','读取完整恢复窗口并核验')}
        stage,label,role,status,reason,nrole,action=mapping[order['state']]
        next_roles=[dict(_person(nrole,case,order),action=action)]
    elif active_runs and state in ('ANALYSING','WAITING_DECISION','WAITING_ACTION'):
        first=active_runs[0];stage=first['stage_id'];role=first['role'];status='executing' if first['state']=='RUNNING' else 'waiting'
        label='AI 并行协作' if len(active_runs)>1 else first['role_label']+('正在运行' if status=='executing' else '等待运行或工具回执')
        reason='以独立运行审计为准；并行作业不串行累计耗时。'
        participants=[_person(r['role'],case) for r in active_runs]
        next_roles=[dict(_person('business_owner',case),action='核对 AI 交付的证据与提案后决定下一步')]
    elif state=='WAITING_TRIAGE':
        stage,label,role,status,reason='triage','等待负责人核实','business_owner','waiting','等待核实异常及证据范围，再发起顾问分析。'
        next_roles=[dict(_person('business_owner',case),action='向总管说明现象，由总管核对证据并安排岗位')]
    elif state=='ANALYSING':
        stage,label,role,status,reason='analysis_preparation','等待发起或补齐分析','business_owner','waiting','当前没有正在运行的顾问作业；请核对失败重试或补齐本轮分析。'
        valid=_valid_analysis_kinds(case)
        next_roles=[dict(_person(r,case),action='补齐本轮实际需要的分析') for r in required_roles(case) if r not in valid]
        plan=case.get('analysis_plan') or {}
        if plan.get('route') in ('field','process_followup'):
            label,reason='等待班组核实',plan['reason']
            next_roles=[dict(_person('business_owner',case),action=reason)]
        elif not next_roles:
            reason='本轮所需分析已保存，等待核对后续处置。'
            next_roles=[dict(_person('business_owner',case),action='核对产物并进入决策')]
    elif state=='WAITING_DECISION':
        stage,role,status='decision','business_owner','waiting'
        if 'maintenance_coordinator' not in _valid_analysis_kinds(case):
            plan = case.get('analysis_plan') or {}
            if plan.get('turn_id') and plan.get('route')=='diagnosis' and plan.get('analysis_cycle')==case.get('analysis_cycle') and plan.get('snapshot_hash')==case['metrics']['snapshot_hash']:
                stage,role,label='proposal','manager','总管核对检查项并安排方案'
                reason='总管核对现场检查项后，交由维修计划员整理方案。'
            else:
                label='等待负责人发起处置提案'
                reason='本轮尚无有效处置提案，当前由业务负责人发起方案整理。'
            next_roles=[dict(_person('maintenance_coordinator',case),action='基于本轮顾问产物形成待人工审核的处置提案')]
        else:
            label='等待负责人审阅批准提案'
            reason='本轮有效协调提案已交付；负责人核对顾问证据及提案，决定批准或重新分析。'
            next_roles=[dict(_person('maintenance_coordinator',case),action='获得负责人批准后，按批准提案创建并回读工单')]
    elif state=='WAITING_ACTION':
        stage,label,role,status,reason='dispatch','等待维修计划员派工','maintenance_coordinator','waiting','提案已批准，尚无有效在途工单。'
        next_roles=[dict(_person('technician',case),action='接收并执行已下发的工单')]
    elif state=='OBSERVING':
        latest=next((o for o in case.get('observations',[]) if o['id']==case.get('latest_observation_id')),None)
        if latest and latest['passed']:
            stage,label,role,status,reason='close','等待结案复核','acceptor','waiting','已有通过的观察记录；最终结案仍由服务端复核数据新鲜度和验收条件。'
            next_roles=[]
        elif latest and latest.get('comparable',True):
            stage,label,role,status,reason='observation','观察未通过，等待处置','business_owner','blocked','观察核验未通过；负责人决定补数据、重新核验或重新分析。'
            next_roles=[dict(_person('business_service',case),action='在范围完整且工况可比后重新核验')]
        else:
            stage,label,role,status,reason='observation','恢复观察中','business_service','waiting','等待完整观察窗口及数据；核验为确定性业务服务，不冒充已启动 AI 巡检。'
            next_roles=[dict(_person('acceptor',case),action='观察通过后复核并决定结案')]
    else: stage,label,role,status,reason='unknown','等待核对流程状态','business_owner','blocked','当前状态缺少足够交接记录。'
    matching=[s for s in steps if s['stage_id']==stage and s['status']=='current' and s['role']==role]
    start=matching[-1]['start_at'] if matching else None
    person=_person(role,case,order)
    return {'stage_id':stage,'label':label,'status':status,**person,'started_at':start,'elapsed_seconds':_seconds(start,as_of),
            'reason':reason,'participants':participants or [person]},next_roles


def build_workflow(store,case,reader,*,now=None):
    store._read_guard(reader,case)
    entities={('cases',case['id'])}
    scoped=dict(case)
    for table in ('work_orders','analyses','observations','agent_runs'):
        scoped[table]=[r for r in case.get(table,[]) if r.get('case_id')==case['id'] and r.get('project_id')==case['project_id'] and r.get('equipment_id')==case['equipment_id']]
        entities.update((table,r['id']) for r in scoped[table])
    audits=[]
    for table,entity_id in entities:
        audits.extend(r for r in store.audit_log(entity_id,reader) if r['entity_type']==table and r['project_id']==case['project_id'])
    return project_workflow(scoped,audits,now=now)
