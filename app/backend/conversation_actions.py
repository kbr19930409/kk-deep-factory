"""Durable, fact-derived questions in the manager conversation.

Reads never create reminders. Reconciliation is run after business mutations,
on startup and by the existing employee scheduler. Field actions remain human.
"""
from datetime import datetime,timezone
import json

from domain import ConflictError,ValidationError
from employees import digest,dt,stamp,TERMINAL_TURNS,SHANGHAI


def display_time(value): return dt(value).astimezone(SHANGHAI).strftime('%Y-%m-%d %H:%M')
def display_window(start,end):
    a,b=dt(start).astimezone(SHANGHAI),dt(end).astimezone(SHANGHAI)
    return a.strftime('%Y-%m-%d %H:%M')+'–'+b.strftime('%H:%M' if a.date()==b.date() else '%Y-%m-%d %H:%M')+'（北京时间）'


class ConversationActions:
    def __init__(self,app):
        self.app=app;self.store=app.store;self.employees=app.employees;self.lock=app.lock
        self.last_error=None;self.reconciling=False

    def rows(self): return self.store._rows('conversation_actions')

    def listing(self):
        values=self.rows()
        pending=[a for a in values if a['status']=='pending']
        recent=[a for a in values if a['status']!='pending'][-100:]
        project=lambda a:{**{k:v for k,v in a.items() if k!='responses'},'elapsed_seconds':max(0,(datetime.now(timezone.utc)-dt(a['started_at'])).total_seconds()) if a.get('started_at') else None}
        return {'actions':[project(a) for a in pending+recent],'pending_count':sum(a.get('requires_response',True) for a in pending),
                'last_error':self.last_error,'source':'persisted_business_state','production_rbac':False}

    def _save(self,value,operation): return self.employees._save('conversation_actions',value,operation)

    def _turn(self,case,turns):
        related=[t for t in turns if t.get('case_id')==case['id'] and t.get('intent')=='coordinate']
        return next((t for t in reversed(related) if t['status'] not in TERMINAL_TURNS),related[-1] if related else None)

    def _allowed(self,case,turn):
        generation=self.employees.generation(case['id'])
        if generation and (not turn or turn.get('scope_generation',0)!=generation): return False
        if turn and turn['status']=='rejected':
            approval=self.store._load('employee_approvals',turn['id'],False)
            return bool(approval and approval['status']=='expired')
        return not turn or turn['status']!='cancelled'

    def _action(self,case,kind,key,title,detail,actions,*,turn=None,order=None,approval=None,observation=None,requires_response=True,started_at=None,current_owner='你（开发岗位）'):
        source={'case_id':case['id'],'kind':kind,'key':key}
        device=self.store._load('devices',case['equipment_id'])
        refs=[{'type':'case','id':case['id'],'label':'业务记录'}]
        if order: refs.append({'type':'work_order','id':order['id'],'label':'工单 '+order['id']})
        if observation: refs.append({'type':'observation','id':observation['id'],'label':'观察结果'})
        if approval: refs.append({'type':'proposal','id':approval['id'],'label':'待确认方案'})
        start=started_at or (order or approval or case).get('updated_at') or case['created_at']
        version_refs={'case_version':case['version'],'analysis_cycle':case.get('analysis_cycle'),'snapshot_hash':case['metrics']['snapshot_hash'],
            'scope_generation':self.employees.generation(case['id']),'order_id':order['id'] if order else None,'order_version':order['version'] if order else None,
            'approval_id':approval['id'] if approval else None,'approval_version':approval['version'] if approval else None,
            'observation_id':observation['id'] if observation else None,'observation_plan':case.get('observation_plan')}
        return {'id':'CA-'+digest(source)[:24],'case_id':case['id'],'turn_id':turn['id'] if turn else None,
            'equipment_id':case['equipment_id'],'equipment_name':device.get('name',case['equipment_id']),'kind':kind,
            'title':title,'text':detail,'detail':detail,'primary_label':actions[0]['label'] if actions else '查看记录',
            'next_action':actions[0]['label'] if actions else detail,'current_owner':current_owner,'waiting_for':current_owner,
            'actor_type':'human' if requires_response else 'system','started_at':start,'requires_response':requires_response,
            'case_state':case['state'],'work_order_id':order['id'] if order else None,'approval':approval,
            'actions':actions,'source_refs':refs,'source_versions':version_refs,'source_fingerprint':digest(version_refs),
            'synthetic':bool(case.get('synthetic')),'fact_source':case.get('fact_source'),'status':'pending'}

    @staticmethod
    def endpoint(action,label,kind,object_id,path,**extra):
        return {'action':action,'label':label,'kind':kind,'object_id':object_id,'path':path,'method':'POST',
                'requires_notes':True,'requires_evidence_refs':False,**extra}

    def _plan_action(self,case):
        return self.endpoint('observation_plan','补充观察计划','observation_plan',case['id'],f"/api/cases/{case['id']}/observation-plan")

    @staticmethod
    def approved_plan(case):
        plan=case.get('observation_plan') or {}
        return bool(plan.get('configured_by') and plan.get('configured_at') and case.get('observation_start') and case.get('observation_end'))

    def auto_observe(self,case,turn,current):
        if case['state']!='OBSERVING' or not self._allowed(case,turn) or not self.approved_plan(case): return case
        if dt(case['observation_end'])>current: return case
        baseline=case['metrics'];recovery=self.store.metrics(case['equipment_id'],case['observation_start'],case['observation_end'],source=case.get('fact_source'))
        if baseline['status']!='valid' or recovery['status']!='valid': return case
        fingerprint=digest({'baseline':baseline['snapshot_hash'],'recovery':recovery['snapshot_hash'],'plan':case['observation_plan']})
        latest=next((o for o in case['observations'] if o['id']==case.get('latest_observation_id')),None)
        if latest and latest['baseline']['snapshot_hash']==baseline['snapshot_hash'] and latest['recovery']['snapshot_hash']==recovery['snapshot_hash'] and latest['plan']==case['observation_plan']: return case
        self.store.evaluate_observation(case['id'],self.app.actor('operations_employee'),idempotency_key='conversation-observe-'+case['id']+'-'+fingerprint,as_of=current.isoformat())
        return self.store.get_case(case['id'])

    def desired(self,case,turns,current):
        turn=self._turn(case,turns)
        if case['state'] in ('CLOSED','CANCELLED','DISMISSED') or not self._allowed(case,turn): return []
        actions=[];cid=case['id'];equipment=case['equipment_id']
        approvals=[a for a in self.employees.rows('employee_approvals') if a['case_id']==cid and a['status'] in ('pending','expired')]
        for approval in approvals:
            owner=next((t for t in turns if t['id']==approval['turn_id']),None)
            if not owner or owner['status']=='cancelled' or owner['status']=='rejected' and approval['status']!='expired': continue
            expired=approval['status']=='expired' or dt(approval['expires_at'])<=current
            stale=approval.get('analysis_cycle')!=case['analysis_cycle'] or approval.get('snapshot_hash')!=case['metrics']['snapshot_hash']
            if expired or stale:
                if case['state'] in ('WAITING_DECISION','WAITING_ACTION') and not any(w['state'] not in ('COMPLETED','CANCELLED') for w in case['work_orders']):
                    reason='确认时间已过' if expired else '分析轮次或设备记录已变化'
                    opts=[self.endpoint('reanalyze','按当前记录重新分析','case',cid,f'/api/cases/{cid}/transition')]
                    actions.append(self._action(case,'blocked','approval-invalid-'+approval['id']+'-'+str(approval['revision'])+'-'+str(expired),
                        '这份方案不能继续确认',f"{equipment} 的方案{reason}。我不会继续批准旧方案；请确认是否按当前记录重新分析，也可以在聊天中补充要求。",opts,turn=owner,approval=approval))
                continue
            opts=[self.endpoint(value,label,'approval',owner['id'],f"/api/manager/turns/{owner['id']}/decision",requires_notes=False,revision=approval['revision']) for value,label in [('approve','确认方案并安排工单'),('modify','修改方案'),('reject','不同意')]]
            actions.append(self._action(case,'approval',owner['id']+':'+str(approval['revision']),'请确认这份处置方案',
                f"{equipment} 的顾问分析和处置方案已保存。请核对范围、人员与检查要求；确认后我会安排协调员创建工单。",opts,turn=owner,approval=approval,started_at=approval['updated_at']))
        live=[w for w in case['work_orders'] if w['state'] not in ('COMPLETED','CANCELLED')]
        for order in live:
            missing_plan=order['state']=='WAITING_ACCEPTANCE' and not self.approved_plan(case)
            if missing_plan:
                actions.append(self._action(case,'observation_plan',order['id']+':plan','先确定修好以后怎样观察',
                    f"{equipment} 的维修结果已提交。请明确观察起止时间、最少观察分钟、短停改善比例和良率容差，再完成验收；我不会替你填写这些标准。",[self._plan_action(case)],turn=turn,order=order))
            available=self.app.order(order)['allowed_actions']
            if missing_plan: available=[a for a in available if a['action']!='accept_repair']
            if missing_plan and all(a['action']=='reject_acceptance' for a in available): continue
            opts=[self.endpoint(a['action'],a['label'],'order',order['id'],f"/api/work-orders/{order['id']}/transition",requires_notes=a['requires_notes'],requires_evidence_refs=a['requires_evidence_refs'],role=a['role']) for a in available]
            copy={'ISSUED':('请现场人员确认接单','工单已创建，请由实际执行人确认接单。'),
                  'ACCEPTED':('现场准备好后，请记录开始','工单已接单；请在实际开始作业时记录开始。'),
                  'IN_PROGRESS':('现场处理后，请补充结果和材料','请填写真实处理经过和照片、记录等证据引用，再提交维修结果。'),
                  'WAITING_TECH_REVIEW':('请复核维修结果','请技术复核人根据已提交的现场记录决定通过或退回。'),
                  'WAITING_ACCEPTANCE':('请验收实际维修结果','请最终验收人核对现场结果和已确认的观察计划，再决定通过或退回。')}
            title,detail=copy[order['state']]
            role=available[0]['role'] if available else 'business_owner'
            owner={'technician':'维修执行人','technical_reviewer':'技术复核人','acceptor':'最终验收人','business_owner':'你（开发岗位）'}.get(role,role)
            actions.append(self._action(case,'field_work',order['id']+':'+str(order['version']),title,
                f"{equipment} · {order['id']}：{detail} 我会继续跟踪，聊天记录不代表现场作业已经完成。",opts,turn=turn,order=order,current_owner=owner))
        if case['state']=='OBSERVING':
            if not self.approved_plan(case):
                actions.append(self._action(case,'observation_plan','case-plan-'+str(case['analysis_cycle']),'请确认恢复观察计划',
                    f"{equipment} 已完成工单验收记录，请明确观察窗口和验收标准。收到后，我会在窗口结束且数据完整时自动核验。",[self._plan_action(case)],turn=turn))
            elif dt(case['observation_end'])>current:
                actions.append(self._action(case,'observation_review','window-'+digest(case['observation_plan']),'我会继续查看恢复效果',
                    f"{equipment} 的观察窗口到 {display_time(case['observation_end'])}（北京时间）结束。届时数据完整后，我会核验并把结果发在这里；现在不需要你操作。",[],turn=turn,requires_response=False,current_owner='业务核验服务',started_at=case['observation_start']))
            else:
                result=self.employees.result(case)
                latest=next((o for o in case['observations'] if o['id']==case.get('latest_observation_id')),None)
                if result.get('passed') and result.get('fresh'):
                    opts=[self.endpoint('close','确认结案','case',cid,f'/api/cases/{cid}/transition'),self.endpoint('reanalyze','还需处理','case',cid,f'/api/cases/{cid}/transition')]
                    actions.append(self._action(case,'close',latest['id'],'观察已通过，是否确认结案？',
                        f"{equipment}：{result['summary']} 请你核对工单证据和观察依据后决定；我不会代替最终验收人结案。",opts,turn=turn,observation=latest,current_owner='最终验收人'))
                else:
                    summary=result['summary'] if result.get('available') else '该观察窗口尚未获得完整、有效的可比记录。'
                    opts=[self._plan_action(case),self.endpoint('reanalyze','重新安排分析','case',cid,f'/api/cases/{cid}/transition')]
                    actions.append(self._action(case,'observation_review',latest['id'] if latest else 'missing-'+digest(case['observation_plan']),'恢复效果还不能确认',
                        f"{equipment}：{summary} 请补齐记录，或明确新的观察计划；完整数据到齐后我会继续核验。",opts,turn=turn,observation=latest))
        active=[t for t in turns if t.get('case_id')==cid and t['status'] in ('queued','thinking','running')]
        if case['state']=='WAITING_TRIAGE' and not active:
            opts=[self.endpoint('verify','确认范围，交给总管分析','case',cid,f'/api/cases/{cid}/transition')]
            actions.append(self._action(case,'blocked','verify-'+str(case['analysis_cycle']),'要我安排同事分析这段短停吗？',
                f"{equipment} 在 {display_window(case['baseline_start'],case['baseline_end'])} 有反复短停记录。请确认按这段设备记录安排顾问分析，现场原因仍须核实。",opts,turn=turn))
        elif turn and turn['status']=='blocked' and not live and not actions:
            actions.append(self._action(case,'blocked',turn['id']+':'+str(turn.get('attempt',1))+':'+str(turn.get('resume_request_key')),'这件事需要你补充说明',
                f"{equipment}：{(turn.get('error') or {}).get('message') or turn.get('reply') or '当前安排尚未完成。'} 你可以在这段对话补充要求，再决定是否继续。",[],turn=turn))
        return actions

    def reconcile(self,*,auto_observe=False,at=None):
        with self.lock:
            if self.reconciling: return
            self.reconciling=True
            try:
                current=at or datetime.now(timezone.utc)
                self.recover_continuations()
                turns=[json.loads(r['data']) for r in self.app.jobs.execute('SELECT data FROM manager_turns ORDER BY rowid')]
                old={a['id']:a for a in self.rows()};wanted={};cases=[]
                for raw in self.store.list_cases():
                    case=self.store.get_case(raw['id']);turn=self._turn(case,turns)
                    if auto_observe: case=self.auto_observe(case,turn,current)
                    cases.append(case)
                    for value in self.desired(case,turns,current): wanted[value['id']]=value
                for key,value in wanted.items():
                    prior=old.get(key)
                    if prior:
                        comparable={k:v for k,v in prior.items() if k not in ('version','created_at','updated_at','project_id','responses','resolved_at')}
                        if comparable!=value:
                            value=self._save(dict(prior,**value,version=prior['version']+1),'refresh_conversation_question')
                        else: value=prior
                    else: value=self._save(dict(value,version=1),'ask_conversation_question')
                    # Stable outbox key repairs a crash after saving the item but
                    # before saving its message, without repeating delivered text.
                    message_key='conversation-question-'+key
                    if not self.store._load('employee_messages','MSG-'+digest(message_key)[:24],False):
                        self.employees.message({'author':'manager','recipient':'user','case_id':value['case_id'],'turn_id':value.get('turn_id'),
                            'kind':'request' if value['requires_response'] else 'progress','text':value['title']+'\n'+value['text'],
                            'artifacts':[{'type':'conversation_action','id':key,'label':value['title']}],
                            'idempotency_key':message_key})
                for key,value in old.items():
                    if value['status']=='pending' and key not in wanted:
                        replaced=any(a['case_id']==value['case_id'] and a['kind']==value['kind'] for a in wanted.values())
                        self._save(dict(value,status='superseded' if replaced else 'resolved',resolved_at=stamp(),version=value['version']+1),'resolve_conversation_question')
                for case in cases:
                    if case['state']=='CLOSED' and any(a['case_id']==case['id'] for a in old.values()):
                        self.employees.complete_case(case['id'])
                        delivered=[json.loads(r['data']) for r in self.app.jobs.execute('SELECT data FROM manager_turns')]
                        if any(t.get('case_id')==case['id'] and t['status']=='completed' and dt(t['updated_at'])>=dt(case['updated_at']) for t in delivered): continue
                        self.employees.message({'author':'manager','recipient':'user','case_id':case['id'],'kind':'delivery',
                            'text':case['equipment_id']+' 已按最终确认结案。'+self.employees.result(case)['summary']+' 现场完成以工单证据核对。',
                            'artifacts':[{'type':'case','id':case['id'],'label':'结案与办理记录'}],
                            'idempotency_key':'conversation-closed-'+case['id']+'-'+str(case.get('latest_observation_id'))})
                self.last_error=None
            except Exception as error:
                self.last_error=str(error)
            finally: self.reconciling=False

    def validate(self,path,body):
        key=body.get('conversation_action_id')
        if not key: return None
        version=body.get('conversation_action_version')
        if not isinstance(version,int) or isinstance(version,bool) or version<1: raise ValidationError('请提供确认卡当前的整数版本')
        item=self.store._load('conversation_actions',key)
        fingerprint=digest({'path':path,'body':body})
        request_key=body.get('idempotency_key')
        prior=next((r for r in item.get('responses',[]) if r['key']==request_key),None) if request_key else None
        if prior:
            if prior['fingerprint']!=fingerprint: raise ConflictError('同一确认请求编号对应不同内容')
            return {'cached':prior['result']}
        self.reconcile()
        item=self.store._load('conversation_actions',key)
        if item['status']!='pending' or item['version']!=body.get('conversation_action_version'):
            raise ConflictError('这项确认已经变化，请查看聊天中的最新说明')
        action=body.get('decision') or body.get('action') or 'observation_plan'
        if not any(a['path']==path and a['action']==action for a in item['actions']): raise ConflictError('这张确认卡不允许执行所选动作')
        return {'item':item,'fingerprint':fingerprint,'key':request_key}

    def remember_response(self,ticket,result):
        if not ticket or not ticket.get('item') or not ticket.get('key'): return
        item=self.store._load('conversation_actions',ticket['item']['id'])
        item.setdefault('responses',[]).append({'key':ticket['key'],'fingerprint':ticket['fingerprint'],'result':result,'at':stamp()})
        self._save(item,'record_conversation_confirmation')

    def continuation(self,case,request_key,action_id=None,action_version=None,action='verify'):
        message=(f"我已确认 {case['equipment_id']} 的这段异常范围，请总管安排顾问分析并形成待确认方案。" if action=='verify' else
                 f"请总管依据 {case['equipment_id']} 的当前记录重新安排顾问分析，再把新方案发给我确认。")
        body={'message':message,'case_id':case['id'],'idempotency_key':request_key}
        prior=self.app.manager.find_request(body)['turn']
        if prior and (prior.get('confirmation_source') or prior.get('intent') or prior.get('child_job_ids')
                      or prior['status'] not in ('queued','blocked') or prior['status']=='blocked' and (prior.get('error') or {}).get('code')!='runtime_restarted'):
            return prior
        turn=prior or self.app.manager.create(body)
        turn.update(intent='coordinate',status='queued',phase='准备安排顾问',current_actor='工厂总管',next_action='安排顾问分析已确认的异常范围',
            analysis_cycle=case['analysis_cycle'],snapshot_hash=case['metrics']['snapshot_hash'],
            confirmation_source={'kind':'conversation_confirmation','action':action,'conversation_action_id':action_id,
                'conversation_action_version':action_version,'request_key':request_key,'confirmed_at':stamp(),
                'scope_generation':self.employees.generation(case['id'])})
        self.app.manager._save(turn)
        return turn

    def recover_continuations(self):
        for item in self.rows():
            for action in ('verify','reanalyze'):
                if not any(a['action']==action for a in item['actions']): continue
                # Only the exact committed confirmation receipt authorizes dispatch.
                prefix='conversation-'+action+'-'+item['id']+'-'
                receipts=self.store.conn.execute('SELECT key,result FROM idempotency WHERE operation=? AND key LIKE ?',('transition_case',prefix+'%')).fetchall()
                for receipt in receipts:
                    result=json.loads(receipt['result']);case=self.store.get_case(item['case_id'])
                    if result.get('id')!=case['id'] or result.get('state')!='ANALYSING' or case['state']!='ANALYSING': continue
                    if result.get('analysis_cycle')!=case.get('analysis_cycle'): continue
                    if item['source_versions']['scope_generation']!=self.employees.generation(case['id']): continue
                    self.continuation(case,receipt['key'],item['id'],int(receipt['key'].rsplit('-',1)[1]),action)
