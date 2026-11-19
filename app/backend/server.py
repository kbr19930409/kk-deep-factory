"""Loopback API for an owner-gated development workspace; not production RBAC."""
from __future__ import annotations
import argparse
import hashlib
import hmac
import json
import mimetypes
import os
from pathlib import Path
import sqlite3
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, unquote
import uuid

from domain import FactoryStore, DomainError, ValidationError, ConflictError, NotFoundError, AuthorizationError, DEMO_ACTORS
from workflow import build_workflow
from simulation import FactorySimulator, SOURCE as SIMULATION_SOURCE
from iot_connector import IoTConnector, SOURCE as IOT_SOURCE
from manager_store import ManagerStore
from dispatch_plan import required_roles
from employees import EmployeeService, digest
from equipment_system import EquipmentSystemAdapter, SOURCE as EMS_SOURCE, enabled_environment
from conversation_actions import ConversationActions

APP = Path(__file__).resolve().parents[1]
STATE_LABELS = {'WAITING_TRIAGE':'待核实','ANALYSING':'分析中','WAITING_DECISION':'待决策','WAITING_ACTION':'待派工','WAITING_EXECUTION':'待执行','EXECUTING':'执行中','WAITING_ACCEPTANCE':'待验收','OBSERVING':'观察中','CLOSED':'已关闭','DISMISSED':'已驳回','CANCELLED':'已取消','ISSUED':'待接单','ACCEPTED':'已接单','IN_PROGRESS':'执行中','WAITING_TECH_REVIEW':'待技术复核','COMPLETED':'已完成'}
WO_ACTIONS = {
 'ISSUED':[('accept','ACCEPTED','technician','接单'),('cancel','CANCELLED','business_owner','取消工单')],
 'ACCEPTED':[('start','IN_PROGRESS','technician','开始执行'),('cancel','CANCELLED','business_owner','取消工单')],
 'IN_PROGRESS':[('complete_repair','WAITING_TECH_REVIEW','technician','提交维修结果')],
 'WAITING_TECH_REVIEW':[('technical_review','WAITING_ACCEPTANCE','technical_reviewer','技术复核通过'),('return_repair','IN_PROGRESS','technical_reviewer','退回维修')],
 'WAITING_ACCEPTANCE':[('accept_repair','COMPLETED','acceptor','验收通过'),('reject_acceptance','IN_PROGRESS','acceptor','验收不通过')]
}

def now(): return datetime.now(timezone.utc).isoformat()
def encoded(data): return json.dumps(data,ensure_ascii=False,allow_nan=False,separators=(',',':'),sort_keys=True)
def actor(role):
    # This runtime is an owner-only development workspace. Delegated sample
    # positions are explicit, never taken from a request body or model output.
    if role not in DEMO_ACTORS: raise ValidationError('不支持的开发岗位')
    return dict(DEMO_ACTORS[role], authenticated_subject='workspace-owner', authorization_source='dsh_owner_gate_development_delegation')

JOB_STATES = {name.lower(): name for name in ('QUEUED','RUNNING','WAITING_TOOL','WAITING_HUMAN','BLOCKED','SUCCEEDED','FAILED','TIMED_OUT','CANCELLED')}
ANALYSIS_ROLES = {'efficiency_advisor','maintenance_advisor','maintenance_coordinator'}
ROLE_LABELS = {'business_owner':'业务负责人','acceptor':'最终验收人','technician':'维修执行人','technical_reviewer':'技术复核人','maintenance_coordinator':'维修计划员','efficiency_advisor':'生产损失分析员','maintenance_advisor':'设备诊断员','operations_employee':'运行巡检员工','report_employee':'班报员工','data_admin':'数据管理员','viewer':'查看者'}
SYNTHETIC_COMPLETION_SUMMARY = '合成工单已完成开发流程验收；员工完成工单跟踪。业务任务仍按观察结果单独结案。'

class Application:
    def __init__(self, db, *, simulation_options=None, employee_options=None, ems_options=None):
        self.store=FactoryStore(db)
        self.store.seed_demo()
        self.jobs=sqlite3.connect(str(db),timeout=20,check_same_thread=False,isolation_level=None)
        self.jobs.row_factory=sqlite3.Row
        self.lock=threading.RLock()
        self.request_context=threading.local()
        self.jobs.executescript('''CREATE TABLE IF NOT EXISTS bridge_jobs(id TEXT PRIMARY KEY,request_key TEXT UNIQUE,fingerprint TEXT,data TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS bridge_requests(id TEXT PRIMARY KEY,at TEXT,subject TEXT,delegate_role TEXT,path TEXT,method TEXT,result TEXT);
        ''')
        with self.lock:
            for row in self.jobs.execute('SELECT id,data FROM bridge_jobs').fetchall():
                job=json.loads(row['data'])
                if job['status'] in ('queued','running','waiting_tool'):
                    # Recover only an order already linked to this job. A prior
                    # case order is not proof that this model run delivered it.
                    linked=(job.get('result') or {}).get('work_order')
                    if job['kind']=='employee' and linked:
                        order=self.store.get_work_order(linked['id'])
                        if order['case_id']!=job['input']['case_id']: raise ConflictError('持久任务和工单归属不一致')
                        result=dict(job.get('result') or {},work_order=self.order(order),summary='已从本任务的持久工单回执恢复跟踪，等待现场人员。')
                        self._sync_run(job,'waiting_human',result=result)
                        job.update(status='waiting_human',error=None,result=result,updated_at=now())
                    else:
                        error={'code':'runtime_restarted','message':'服务已重启；原始记录保留，请核对回执后重试。'}
                        self._sync_run(job,'failed',error=error)
                        job.update(status='failed',error=error,updated_at=now())
                    self._write_job(job)
        self.manager=ManagerStore(self)
        ems_enabled=(ems_options or {}).get('enabled')
        if ems_enabled is None: ems_enabled=enabled_environment()
        simulator_config=dict(simulation_options or {})
        if ems_enabled: simulator_config['start_worker']=False
        self.simulation=FactorySimulator(self.store,**simulator_config)
        # The active EMS source never resumes legacy polling through inherited
        # Node-RED environment variables; historical source tables remain intact.
        self.iot=IoTConnector(self.store,endpoint='' if ems_enabled else None,token='' if ems_enabled else None,start_worker=not ems_enabled)
        ems_config=dict(ems_options or {});ems_start=ems_config.pop('start_worker',True)
        employee_config=dict(employee_options or {});employee_start=employee_config.pop('start_scheduler',True)
        # Construct and recover both services before either background worker
        # may use shared application state or the shared SQLite store.
        with self.lock:
            self.ems=EquipmentSystemAdapter(self,start_worker=False,**ems_config)
            self.employees=EmployeeService(self,start_scheduler=False,**employee_config)
            self.conversation=ConversationActions(self)
            self.conversation.reconcile()
        if ems_start: self.ems.start()
        if employee_start: self.employees.start()

    def close(self):
        self.employees.close()
        self.ems.close()
        self.iot.close()
        self.simulation.close()
        self.jobs.close()
        self.store.close()

    def actor(self,role):
        roles=getattr(self.request_context,'roles',None)
        if roles is not None: roles.add(role)
        return actor(role)

    def _sync_run(self,job,status,*,result=None,error=None):
        target=JOB_STATES[status]
        run=self.store.get_agent_run(job['agent_run_id'])
        if run['state']==target: return run
        # A queued job interrupted before execution must still have a durable
        # failed run. Recovery records the interruption, never invents output.
        if run['state']=='QUEUED' and target in ('FAILED','WAITING_HUMAN'):
            run=self.store.transition_agent_run(run['id'],'RUNNING',self.actor(job['role']))
        if run['state'] in ('WAITING_HUMAN','WAITING_TOOL') and target in ('SUCCEEDED','WAITING_HUMAN'):
            run=self.store.transition_agent_run(run['id'],'RUNNING',self.actor(job['role']))
        return self.store.transition_agent_run(run['id'],target,self.actor(job['role']),output=result,error=error)

    def _write_job(self, job):
        self.jobs.execute('UPDATE bridge_jobs SET data=? WHERE id=?',(encoded(job),job['id']))

    def job_create(self, data):
        role=data.get('role','efficiency_advisor')
        kind=data.get('kind')
        if kind not in ('analysis','employee'): raise ValidationError('kind 必须是 analysis 或 employee')
        if role not in ANALYSIS_ROLES or (kind=='employee' and role!='maintenance_coordinator'):
            raise ValidationError('岗位不支持此类模型任务')
        value=data.get('input',{})
        if not isinstance(value,dict): raise ValidationError('input 必须是对象')
        case_id=value.get('case_id')
        self.store.get_case(case_id,self.actor('business_owner'))
        key=data.get('idempotency_key') or 'job-'+uuid.uuid4().hex
        if not isinstance(key,str) or len(key)>256: raise ValidationError('任务幂等键不合法')
        fingerprint=hashlib.sha256(encoded({'kind':data['kind'],'role':role,'input':value}).encode()).hexdigest()
        with self.lock:
            prior=self.jobs.execute('SELECT * FROM bridge_jobs WHERE request_key=?',(key,)).fetchone()
            if prior:
                if prior['fingerprint']!=fingerprint: raise ConflictError('相同任务键对应不同内容')
                return json.loads(prior['data'])
            if value.get('explicit_request') and value['explicit_request'].get('idempotency_key')!=key:
                raise ConflictError('运行与直接交办编号不一致')
            self.employees.check_active(value,case_id)
            profile=self.employees.check_tool(role,'calculate_oee' if kind=='analysis' else 'create_work_order',case_id)
            run=self.store.create_agent_run(case_id,self.actor(role),input_data=value,idempotency_key='agent-'+key)
            job={'id':'JOB-'+uuid.uuid4().hex[:12],'kind':data['kind'],'role':role,'input':value,'agent_run_id':run['id'],'status':'queued','progress':'等待模型执行','tool_receipts':[],'created_at':now(),'updated_at':now(),'result':None,'error':None}
            job.update(scope_generation=self.employees.generation(case_id),profile_version=profile['version'])
            self.jobs.execute('INSERT INTO bridge_jobs VALUES(?,?,?,?)',(job['id'],key,fingerprint,encoded(job)))
            self.employees.on_job(job)
            return job

    def job_get(self, jid, *, project_result=True, persist_progress=True):
        with self.lock:
            row=self.jobs.execute('SELECT data FROM bridge_jobs WHERE id=?',(jid,)).fetchone()
            if not row: raise NotFoundError('任务不存在')
            job=json.loads(row['data'])
            if job['status']=='waiting_human':
                wo=(job.get('result') or {}).get('work_order')
                if wo:
                    current=self.order(self.store.get_work_order(wo['id']))
                    if current['case_id']!=job['input']['case_id']: raise ConflictError('任务和工单归属不一致')
                    job['result']['work_order']=current
                    progress='跟踪工单：'+current['status_label']
                    changed=(wo!=current or job.get('progress')!=progress)
                    job['progress']=progress
                    if current['state']=='COMPLETED':
                        job['status']='succeeded'
                        job['result']['summary']=self.work_order_completion_summary(current)
                        if persist_progress: self._sync_run(job,'succeeded',result=job['result'])
                    elif current['state']=='CANCELLED':
                        job['status']='cancelled'
                        job['result']['summary']='工单已由业务负责人取消；员工跟踪结束，主任务仍须单独处置。'
                        if persist_progress: self._sync_run(job,'cancelled',result=job['result'])
                    if persist_progress and (changed or job['status']!='waiting_human'):
                        job['updated_at']=now();self._write_job(job)
            if project_result and job['status']=='succeeded' and job['kind']=='employee':
                linked=(job.get('result') or {}).get('work_order')
                if isinstance(linked,dict) and linked.get('id'):
                    current=self.store.get_work_order(linked['id'])
                    if current['case_id']!=job['input']['case_id']: raise ConflictError('任务和工单归属不一致')
                    if current['state']=='COMPLETED' and current.get('synthetic'):
                        # Correct the presentation of legacy completed demo jobs;
                        # terminal run output and stored audit history stay intact.
                        job['result']=dict(job['result'],summary=self.work_order_completion_summary(current))
            return job

    def work_order_completion_summary(self,order):
        case=self.store._load('cases',order['case_id'])
        if case.get('fact_source')==EMS_SOURCE:
            return '工单已完成验收记录；员工完成工单跟踪。设备管理系统记录；现场完成以工单证据核对。业务任务仍按观察结果单独结案。'
        return SYNTHETIC_COMPLETION_SUMMARY if order.get('synthetic') else '工单已通过现场验收；员工完成工单跟踪。业务任务仍按观察结果单独结案。'

    def job_update(self,jid,data):
        with self.lock:
            job=self.job_get(jid,project_result=False)
            previous=dict(job)
            old=job['status']
            if 'status' in data and data['status'] not in JOB_STATES: raise ValidationError('不支持的AI任务状态')
            if old in ('succeeded','failed','timed_out','cancelled') and any(k in data and data[k]!=job.get(k) for k in data):
                raise ConflictError('已终结AI运行不能改写，请创建新任务')
            for key in ('status','progress','result','error','tool_receipts','provider','model','usage'):
                if key in data: job[key]=data[key]
            job['updated_at']=now()
            if job['status']=='waiting_human':
                order=(job.get('result') or {}).get('work_order')
                if job['kind']!='employee' or not isinstance(order,dict) or not order.get('id'):
                    raise ValidationError('等待人工必须关联本员工任务的持久工单')
                current=self.store.get_work_order(order['id'])
                if current['case_id']!=job['input']['case_id']: raise ConflictError('工单不属于此任务')
                job['result']['work_order']=self.order(current)
            if job['status']!=old:
                self._sync_run(job,job['status'],result=job.get('result'),error=job.get('error'))
            self._write_job(job)
            self.employees.on_job(job,previous)
            return job

    def metrics(self,m):
        signatures=m.get('product_signatures',[])
        cycle=signatures[0][3] if len(signatures)==1 else None
        window=f"{m.get('start','')} — {m.get('end','')}"
        return dict(m,oee=m.get('OEE_pct'),availability=m.get('A_pct'),performance=m.get('P_pct'),quality=m.get('Q_time_weighted_pct'),count_quality=m.get('Q_pct'),planned_minutes=m.get('T'),run_minutes=m.get('R'),total_count=m.get('N'),good_count=m.get('G'),ideal_cycle_seconds=cycle*60 if cycle is not None else None,window_label=window,percent_unit='percent_0_100',quality_flags=m.get('issues',[]),source='deterministic_business_service')

    def order(self,w):
        actions=[{'action':a,'target':t,'role':r,'label':label,'requires_notes':True,'requires_evidence_refs':t in ('WAITING_TECH_REVIEW','WAITING_ACCEPTANCE','COMPLETED'),'development_delegation':True} for a,t,r,label in WO_ACTIONS.get(w['state'],[])]
        return dict(w,status=w['state'],status_label=STATE_LABELS.get(w['state'],w['state']),asset_id=w['equipment_id'],allowed_actions=actions)

    def case(self,c):
        actions=[];blocked=[]
        if c['state']=='OBSERVING':
            actions=[{'action':'reopen','label':'重新分析','role':'business_owner','requires_notes':True}]
            if c.get('observation_end') and datetime.fromisoformat(c['observation_end'])<=datetime.now(timezone.utc):
                actions.insert(0,{'action':'evaluate_observation','label':'核验恢复观察','role':'operations_employee','requires_notes':False})
            else: blocked.append({'action':'evaluate_observation','label':'核验恢复观察','reason':'完整观察窗口尚未结束'})
            obs=next((o for o in c.get('observations',[]) if o['id']==c.get('latest_observation_id')),None)
            reason='恢复观察尚未通过'
            if obs and obs['passed']:
                fresh=all(self.store.metrics(c['equipment_id'],obs[label]['start'],obs[label]['end'],source=c.get('fact_source'))['snapshot_hash']==obs[label]['snapshot_hash'] for label in ('baseline','recovery'))
                if not fresh: reason='观察数据已修订，需重新核验'
                elif not any(w['state']=='COMPLETED' for w in c['work_orders']): reason='没有已验收工单'
                else: reason=None
            if reason: blocked.append({'action':'close','label':'复核并结案','reason':reason})
            else: actions.append({'action':'close','label':'复核并结案','role':'acceptor','requires_notes':True})
        elif c['state'] in ('CLOSED','WAITING_DECISION'):
            actions=[{'action':'reopen','label':'重新分析','role':'business_owner','requires_notes':True}]
        elif c['state']=='WAITING_ACTION' and not any(w['state'] not in ('COMPLETED','CANCELLED') for w in c['work_orders']):
            actions=[{'action':'reopen','label':'重新分析','role':'business_owner','requires_notes':True}]
        return dict(c,status=c['state'],status_label=STATE_LABELS.get(c['state'],c['state']),asset_id=c['equipment_id'],metrics=self.metrics(c['metrics']),work_orders=[self.order(w) for w in c['work_orders']],allowed_actions=actions,blocked_actions=blocked)

    def case_detail(self,case_id,reader):
        """Safe audit projection only for a detail read, never model/bootstrap."""
        c=self.store.get_case(case_id,reader)
        entities={('cases',c['id'])}
        for item in c['work_orders']:
            order=self.store.get_work_order(item['id'],reader)
            if order['case_id']==c['id'] and order['project_id']==c['project_id'] and order['equipment_id']==c['equipment_id']:
                entities.add(('work_orders',order['id']))
        rows=[]
        for entity_type,entity_id in entities:
            rows.extend(row for row in self.store.audit_log(entity_id,reader)
                        if row['entity_type']==entity_type and row['project_id']==c['project_id'])
        labels={'seed_demo':'初始化合成案例','detect_short_stops':'检测到反复短停候选','approve_proposal':'批准处置提案','configure_observation':'设置恢复观察计划','create_issued':'创建并下发维修工单'}
        events=[]
        for row in sorted(rows,key=lambda item:item['seq']):
            details=row['data'] if isinstance(row['data'],dict) else {}
            evidence=details.get('evidence')
            evidence=evidence if isinstance(evidence,dict) else {}
            notes=evidence.get('notes') if isinstance(evidence.get('notes'),str) else ''
            if row['operation']=='configure_observation' and isinstance(details.get('plan'),dict):
                value=details['plan'].get('notes')
                if isinstance(value,str): notes=value
            refs=evidence.get('evidence_refs',[])
            refs=[refs] if isinstance(refs,str) else refs if isinstance(refs,list) else []
            refs=[value for value in refs if isinstance(value,str) and value.strip()]
            if refs: notes=(notes+'\n' if notes else '')+'证据引用：'+'；'.join(refs)
            subject='主任务' if row['entity_type']=='cases' else '维修工单 '+row['entity_id']
            if row['operation'] in ('transition','work_order_receipt'):
                before=STATE_LABELS.get(details.get('from'),'原状态')
                after=STATE_LABELS.get(details.get('to'),'新状态')
                verb='同步工单进度' if row['operation']=='work_order_receipt' else '状态变更'
                title=f'{subject}{verb}：{before} → {after}'
            else: title=subject+'：'+labels.get(row['operation'],'更新业务记录')
            events.append({'id':'AUDIT-'+str(row['seq']),'seq':row['seq'],'entity_id':row['entity_id'],
                           'title':title,'notes':notes,'evidence_refs':refs,'actor_id':row['actor_id'],
                           'actor':row['actor_id']+' · '+ROLE_LABELS.get(row['actor_role'],'历史岗位')+'（开发岗位）',
                           'timestamp':row['created_at']})
        return dict(self.case(c),events=events,workflow=build_workflow(self.store,c,reader))

    def asset(self,d,detail=False,simulation=None,iot=None,ems=None):
        simulation=simulation if simulation is not None else self.simulation.status()
        iot=iot if iot is not None else self.iot.status()
        ems=ems if ems is not None else self.ems.status()
        heartbeat=next((item for item in simulation['devices'] if item['id']==d['id']),None) if simulation['run_id'] else None
        cases=d.get('cases',[])
        if not cases: cases=[c for c in self.store.list_cases() if c['equipment_id']==d['id']]
        cases=sorted(cases,key=lambda c:(c['state'] not in ('CLOSED','CANCELLED','DISMISSED'),c.get('created_at','')),reverse=True)
        case=cases[0] if cases else None
        metric=self.metrics(self.store.metrics(d['id'],case['baseline_start'],case['baseline_end'],source=case.get('fact_source'))) if case else {'status':'incomplete','oee':None,'quality_flags':['尚未导入生产记录']}
        simulated_window=bool(heartbeat and simulation['window_start'] and simulation['window_end'])
        if simulated_window:
            metric=self.metrics(self.store.metrics(d['id'],simulation['window_start'],simulation['window_end']))
            metric.update(window_kind='latest_completed_simulation',source=SIMULATION_SOURCE)
        elif heartbeat:
            metric={'status':'incomplete','oee':None,'quality_flags':['等待首个完整模拟分钟记录'],'window_kind':'simulation_pending','source':SIMULATION_SOURCE}
        result=dict(d,asset_id=d['id'],name=d.get('name',d.get('display_name',d['id'])),status=d.get('state','UNKNOWN'),operational_state=d.get('state','UNKNOWN'),case_status=case['state'] if case else None,metrics=metric,case_ids=[c['id'] for c in cases],data_source={'mode':'synthetic' if d.get('synthetic') else 'imported','label':'合成设备台账' if d.get('synthetic') else '导入设备记录','scope':'asset_ledger','telemetry_connected':False})
        if heartbeat:
            result.update(status=heartbeat['state'],operational_state=heartbeat['state'],source=SIMULATION_SOURCE,last_seen_at=heartbeat['last_seen_at'],
                          connection_state='SIMULATED' if simulation['state']=='running' and simulation['heartbeat_fresh'] else 'SIMULATION_PAUSED',
                          data_source={'mode':'synthetic','label':'持续模拟采集 · 非现场数据','source':SIMULATION_SOURCE,'telemetry_connected':False})
        platform_device=next((item for item in iot.get('devices',[]) if item['id']==d['id']),None) if iot.get('enabled') and iot.get('latest_batch') else None
        iot_window=iot['latest_batch']['window'] if platform_device else None
        if platform_device:
            metric=self.metrics(self.store.metrics(d['id'],iot_window['start'],iot_window['end']))
            metric.update(window_kind='iot_daily_snapshot',source=IOT_SOURCE)
            result.update(metrics=metric,status=platform_device['state'],operational_state=platform_device['state'],source=IOT_SOURCE,
                source_timestamp=platform_device['source_timestamp'],last_seen_at=platform_device['source_timestamp'],telemetry=platform_device.get('telemetry',{}),
                connection_state='IOT_SNAPSHOT' if iot['connection_verified'] and iot['data_fresh'] else 'IOT_STALE',
                data_source={'mode':'synthetic','source':IOT_SOURCE,'label':'Node-RED · 模拟设备日快照','scope':'daily_snapshot','telemetry_connected':False,'platform_connected':iot['connection_verified']})
        ems_device=next((item for item in ems.get('devices',[]) if item['id']==d['id']),None) if ems.get('enabled') and ems.get('latest_batch') else None
        ems_window=ems_device.get('window') if ems_device else None
        if ems_device:
            metric=dict(ems_device['latest'],window_kind='ems_daily_snapshot',source=EMS_SOURCE)
            result.update(metrics=metric,status=ems_device['state'],operational_state=ems_device['state'],source=EMS_SOURCE,
                source_timestamp=ems_device['source_timestamp'],last_seen_at=ems_device['source_timestamp'],register=ems_device['register'],
                weekly_metrics=ems_device['weekly'],daily_history=ems_device['daily'],work_order_summary=ems_device['work_order_summary'],
                connection_state='EMS_DAILY' if ems['data_fresh'] else 'EMS_STALE',
                data_source={'mode':'synthetic','source':EMS_SOURCE,'label':'设备管理系统 · 每日更新','scope':'daily_snapshot',
                             'telemetry_connected':False,'physical_devices_connected':False,'provenance':ems['provenance']})
        if detail:
            facts=self.store.get_device(d['id'],source=EMS_SOURCE) if ems_window else d
            rows=facts.get('production_records',[])
            events=facts.get('events',[])
            selected_window=ems_window or iot_window
            if selected_window or simulated_window:
                begin=datetime.fromisoformat(selected_window['start'] if selected_window else simulation['window_start']);end=datetime.fromisoformat(selected_window['end'] if selected_window else simulation['window_end'])
                within=lambda row:datetime.fromisoformat(row['start'])<end and datetime.fromisoformat(row['end'])>begin
                rows=[r for r in rows if within(r)];events=[e for e in events if within(e)]
            context=rows[0] if (selected_window or simulated_window) and rows else next((r for r in rows if case and r['start']==case['baseline_start']),rows[0] if rows else {})
            result.update(events=events,production_records=rows,production_context=context,cases=[self.case(self.store.get_case(c['id'])) for c in cases])
        return result

    def request_receipt(self, key):
        """Look up the original committed request, never advance a turn or job."""
        reader = self.actor('business_owner')
        for table, kind, case_path in (('manager_turns', 'turn', '$.case_id'),
                                       ('bridge_jobs', 'job', '$.input.case_id')):
            row = self.jobs.execute(f'SELECT id,json_extract(data,?) AS case_id FROM {table} WHERE request_key=?',
                                    (case_path, key)).fetchone()
            if row:
                return {'found': True, 'kind': kind, **dict(row)}
        project = reader['project_id']
        fact_id = 'MSG-' + digest('field-fact-'+key)[:24]
        fact = self.store._load('employee_messages',fact_id,False)
        if fact and fact.get('project_id') == project:
            return {'found':True,'kind':'employee_message','id':fact_id,'turn_id':fact['turn_id'],'case_id':fact['case_id']}
        for role in ANALYSIS_ROLES:
            message_id = 'MSG-' + digest(f'employee-delivery-{role}-{key}')[:24]
            row = self.store.conn.execute('SELECT id,case_id FROM employee_messages WHERE project_id=? AND id=?',
                                          (project, message_id)).fetchone()
            if row:
                return {'found': True, 'kind': 'employee_message', **dict(row)}
        # Confirmation cards persist the response only after the mutation commits.
        row = self.store.conn.execute("""
            SELECT a.id,a.case_id FROM conversation_actions AS a
            WHERE a.project_id=? AND EXISTS (
                SELECT 1 FROM json_each(a.data,'$.responses') WHERE json_extract(value,'$.key')=?
            ) LIMIT 1""", (project, key)).fetchone()
        if row:
            return {'found': True, 'kind': 'action', **dict(row)}
        row = self.store.conn.execute("""
            SELECT a.id,a.case_id FROM employee_approvals AS a
            WHERE a.project_id=? AND EXISTS (
                SELECT 1 FROM json_each(a.data,'$.decisions') WHERE json_extract(value,'$.key')=?
            ) LIMIT 1""", (project, key)).fetchone()
        if row:
            return {'found': True, 'kind': 'action', **dict(row)}
        row = self.store.conn.execute("""
            SELECT json_extract(result,'$.id') AS id,
                   coalesce(json_extract(result,'$.case_id'),json_extract(result,'$.id')) AS case_id
            FROM idempotency WHERE project_id=? AND key=? AND operation IN
            ('approve_proposal','transition_case','transition_work_order','configure_observation','evaluate_observation')
            """, (project, key)).fetchone()
        if row and row['id']:
            return {'found': True, 'kind': 'action', **dict(row)}
        stop = self.store._load('employee_scopes', 'STOP-' + digest(key)[:24], False)
        if stop and stop.get('receipt') and stop['project_id'] == project:
            return {'found': True, 'kind': 'action', 'id': stop['id'], 'case_id': stop.get('case_id')}
        row = self.jobs.execute("""SELECT id,json_extract(data,'$.case_id') AS case_id FROM manager_turns
            WHERE json_extract(data,'$.resume_request_key')=? OR json_extract(data,'$.approval_request_key')=?
            LIMIT 1""", (key, key)).fetchone()
        if row:
            return {'found': True, 'kind': 'action', **dict(row)}
        return {'found': False}

    def data_source(self,reader,simulation,iot,ems):
        # Read only distinct provenance flags, not every device's event stream.
        provenance=set()
        for table in ('state_events','production_records'):
            rows=self.store.conn.execute(f"SELECT DISTINCT COALESCE(json_extract(data,'$.synthetic'),0) FROM {table} WHERE project_id=?",(reader['project_id'],))
            provenance.update('synthetic' if row[0] else 'imported' for row in rows)
        mode='mixed' if len(provenance)>1 else next(iter(provenance),'no_data')
        labels={'synthetic':'合成开发工况 / 非实时生产数据','mixed':'合成与导入记录并存 / 按记录标注来源','imported':'导入生产记录 / 尚未连接实时采集','no_data':'尚无生产事实记录'}
        label=labels[mode]
        if simulation['run_id']:
            label=('持续模拟采集 · 合成数据（非现场）' if simulation['state']=='running' else '模拟采集已暂停 · 保留历史合成记录')+('；另有导入记录' if mode=='mixed' else '')
        source={'mode':mode,'label':label,'generated_at':now()}
        if iot.get('enabled') and iot.get('latest_batch'):
            source.update(source=IOT_SOURCE,label='Node-RED · 模拟设备日快照')
        if ems.get('enabled') and ems.get('latest_batch'):
            source.update(source=EMS_SOURCE,label='设备管理系统 · 每日更新',synthetic=True,provenance=ems['provenance'],window=ems['latest_batch']['window'])
        return source

    def bootstrap(self):
        reader=self.actor('business_owner')
        snap=self.store.get_snapshot(reader)
        simulation=self.simulation.status()
        iot=self.iot.status()
        ems=self.ems.status()
        with self.lock:
            jobs=[self.job_get(r['id']) for r in self.jobs.execute('SELECT id FROM bridge_jobs ORDER BY rowid DESC LIMIT 30').fetchall()]
        result=dict(project={'id':snap['project_id'],'name':'我的工厂项目','line':'机加工一线'},assets=[self.asset(d,simulation=simulation,iot=iot,ems=ems) for d in snap['devices']],cases=[self.case(c) for c in snap['cases']],tasks=snap['tasks'],work_orders=[self.order(w) for w in snap['work_orders']],jobs=jobs,simulation=simulation,iot=iot,ems=ems,data_source=self.data_source(reader,simulation,iot,ems),capabilities={'ai_available':False,'ai_mode':'unavailable','model':None,'auth_mode':'workspace_owner_development_delegation','authorization_label':'工作区所有者 · 开发岗位委派（非生产多用户权限）','production_rbac':False,'authenticated_subject':'workspace-owner','storage':'SQLite WAL','durable_work_orders':True,'telemetry_connected':False},kpis={'assets':len(snap['devices']),'open_cases':sum(c['state'] not in ('CLOSED','DISMISSED','CANCELLED') for c in snap['cases']),'work_orders':len(snap['work_orders'])},actors=[{'id':v['id'],'role':v['role'],'label':k,'development_only':True} for k,v in DEMO_ACTORS.items()])
        return result

    def manager_facts(self,body):
        if not isinstance(body,dict) or set(body)-{'case_id'}:
            raise ValidationError('总管事实查询只接受业务任务编号')
        case_id=body.get('case_id')
        if case_id is not None and (not isinstance(case_id,str) or not case_id.strip()):
            raise ValidationError('请选择有效的业务任务')
        reader=self.actor('business_owner')
        equipment=set(self.employees.profile('manager')['equipment_ids'])
        assets=[{k:d.get(k) for k in ('id','code')} for d in self.store.list_devices(reader)
                if '*' in equipment or d['id'] in equipment]
        devices={d['id'] for d in assets}
        cases={c['id']:c for c in self.store.list_cases(reader) if c['equipment_id'] in devices}
        if case_id is not None and case_id not in cases:
            self.store._load('cases',case_id)
            raise AuthorizationError('该设备不在员工当前数据范围内')
        current=self.case_detail(case_id,reader) if case_id else None
        history=self.manager.model_history(cases,current,reader)
        pending=self.store._rows('conversation_actions',"project_id=? AND json_extract(data,'$.status')='pending'",(reader['project_id'],))
        cards=[{k:a.get(k) for k in ('id','case_id','turn_id','equipment_id','kind','title','text','current_owner',
                    'next_action','primary_label','actions','source_refs','status','requires_response')}
               for a in pending if a.get('requires_response',True) and a['case_id'] in cases]
        source=self.data_source(reader,self.simulation.status(),self.iot.status(),self.ems.status(include_metrics=False))
        if current:
            # The manager uses recent events and the current workflow summary only.
            # The complete audit remains available in the existing case detail view.
            current={**current,'events':current['events'][-12:],
                     'workflow':{k:current['workflow'].get(k) for k in ('current','metrics')}}
            current.pop('agent_runs',None)
        return {'assets':assets,'cases':[{k:c.get(k) for k in ('id','equipment_id','title','state','baseline_start','baseline_end')} for c in cases.values()],
                'history':history,'attention':{'actions':cards},'data_source':source,'current_case':current}

    def dispatch(self,method,path,body):
        # Serialize state changes and stop requests across both SQLite
        # connections. A late model output cannot race a committed stop.
        with self.lock:
            mutation=method=='POST' and path not in ('/api/conversations/search','/internal/employee-context','/internal/manager/request','/internal/manager-facts')
            ticket=self.conversation.validate(path,body or {}) if mutation else None
            if ticket and 'cached' in ticket: return ticket['cached']
            result=self._dispatch(method,path,body)
            if mutation:
                self.conversation.remember_response(ticket,result)
                self.conversation.reconcile(auto_observe=path.startswith('/api/work-orders/') or path.startswith('/api/cases/') or path in ('/api/import','/api/ems/sync'))
            return result

    def _dispatch(self,method,path,body):
        extra=self.employees.dispatch(method,path,body)
        if extra is not None:
            self.actor('business_owner')
            return extra
        parts=path.strip('/').split('/')
        if path=='/health' and method=='GET': return {'ok':True,'service':'factory-business','storage':'sqlite'}
        if path=='/api/bootstrap' and method=='GET': return self.bootstrap()
        if path=='/api/ems' and method=='GET': return self.ems.status()
        if path=='/api/ems/metrics' and method=='GET': return self.ems.metrics()
        if path in ('/api/conversation-actions','/api/conversation/attention') and method=='GET':
            self.actor('business_owner');return self.conversation.listing()
        if path=='/api/ems/sync' and method=='POST':
            self.actor('business_owner');return self.ems.sync()
        if path=='/api/manager' and method=='GET':
            self.actor('business_owner');return self.manager.list()
        if path=='/internal/manager-facts' and method=='POST':
            return self.manager_facts(body)
        if len(parts)==3 and parts[:2]==['api','receipts'] and method=='GET':
            return self.request_receipt(parts[2])
        if path=='/internal/chat-scope' and method=='GET':
            reader=self.actor('business_owner')
            # Resolving a named device before acknowledging a message needs only the
            # directory and case timestamps. Do not build metrics or read event history.
            return {'assets':[{k:row.get(k) for k in ('id','code')} for row in self.store.list_devices(reader)],
                    'cases':[{k:row.get(k) for k in ('id','equipment_id','state','baseline_end','created_at','updated_at')}
                             for row in self.store.list_cases(reader)]}
        if path=='/internal/manager/active' and method=='GET':
            self.actor('business_owner');return self.manager.active()
        if path=='/internal/manager/request' and method=='POST':
            self.actor('business_owner');return self.manager.find_request(body)
        if path.startswith('/api/manager/turns/') and len(parts)==4 and method=='GET':
            self.actor('business_owner');return self.manager.get(parts[3])
        if path=='/internal/manager/turns' and method=='POST':
            self.actor('business_owner');return self.manager.create(body)
        if path.startswith('/internal/manager/turns/') and len(parts)==4 and method=='POST':
            self.actor('business_owner');return self.manager.update(parts[3],body)
        if path.startswith('/internal/manager/turns/') and len(parts)==5 and parts[4]=='claim-confirmed' and method=='POST':
            self.actor('business_owner');return self.manager.claim_confirmed(parts[3])
        if path.startswith('/internal/manager/turns/') and len(parts)==5 and parts[4]=='claim-field' and method=='POST':
            self.actor('business_owner');return self.manager.claim_field(parts[3])
        if path.startswith('/internal/manager/turns/') and len(parts)==5 and method=='POST' and parts[4] in ('field-fact','dispatch-plan'):
            reader=self.actor('business_owner')
            if parts[4]=='field-fact': return self.manager.accept_field_fact(parts[3],body)
            turn=self.manager.get(parts[3],project=False)
            self.employees.check_active({'turn_id':turn['id']},turn.get('case_id'))
            if turn.get('intent')!='coordinate' or turn['status']!='running': raise ConflictError('总管当前未在分派这件事')
            return self.store.plan_dispatch(turn['case_id'],turn,reader)
        if path=='/api/iot' and method=='GET':
            self.actor('business_owner');return self.iot.status()
        if path=='/api/iot/sync' and method=='POST':
            self.actor('business_owner');return self.iot.sync()
        if path=='/api/simulation' and method=='GET':
            self.actor('business_owner')
            return self.simulation.status()
        if path=='/api/simulation/control' and method=='POST':
            self.actor('business_owner')
            if body.get('action')=='start' and (self.iot.status()['enabled'] or self.ems.enabled):raise ConflictError('已启用设备数据适配源，请在数据接入区同步；历史记录保留')
            return self.simulation.control(body['action'],scenario=body.get('scenario'),duration_minutes=body.get('duration_minutes',60),idempotency_key=body.get('idempotency_key'))
        if path.startswith('/api/assets/') and len(parts)==3 and method=='GET': return self.asset(self.store.get_device(parts[2],self.actor('business_owner')),True)
        if path.startswith('/api/cases/') and len(parts)==3 and method=='GET': return self.case_detail(parts[2],self.actor('business_owner'))
        if path.startswith('/api/work-orders/') and len(parts)==3 and method=='GET': return self.order(self.store.get_work_order(parts[2],self.actor('business_owner')))
        if path.startswith('/api/jobs/') and len(parts)==3 and method=='GET': return self.job_get(parts[2])
        if path=='/internal/jobs/active' and method=='GET':
            return {'jobs':[job for row in self.jobs.execute('SELECT id FROM bridge_jobs').fetchall()
                            if (job:=self.job_get(row['id']))['status'] not in ('succeeded','failed','timed_out','cancelled')]}
        if path=='/internal/jobs' and method=='POST': return self.job_create(body)
        if path.startswith('/internal/jobs/') and len(parts)==3 and method=='POST': return self.job_update(parts[2],body)
        if path=='/internal/context' and method=='POST':
            direct_request=None
            if body.get('explicit_request'):
                direct_request=self.employees.direct_request(body['explicit_request'],body['case_id'],create=True)
            else:
                self.employees.check_active(body,body['case_id'])
            c=self.store.get_case(body['case_id'],self.actor('business_owner'))
            if c['state']=='WAITING_TRIAGE':
                self.store.transition_case(c['id'],'ANALYSING',self.actor('business_owner'),evidence={'notes':'工作区所有者发起证据分析，核对当前设备与记录范围'})
                c=self.store.get_case(c['id'])
            simulation=self.simulation.status()
            brief={k:simulation[k] for k in ('state','scenario','synthetic','source','window_start','window_end')}
            iot=self.iot.status()
            ems=self.ems.status(include_metrics=False)
            return {'case':c,'device':self.store.get_device(c['equipment_id'],source=c.get('fact_source')),'simulation':brief,'iot':{k:iot.get(k) for k in ('platform','platform_version','source','synthetic','timestamp_note','latest_batch','synced_at')},'ems':{k:ems.get(k) for k in ('source','synthetic','provenance','timestamp_note','latest_batch','synced_at')},'actor':{'source':'workspace_owner_development_delegation','authenticated_subject':'workspace-owner','production_rbac':False},'available_assignees':[DEMO_ACTORS['technician']['id']],'direct_request':direct_request}
        if path=='/internal/analysis' and method=='POST':
            self.employees.check_active(body,body['case_id'])
            self.employees.check_tool(body['role'],'calculate_oee',body['case_id'])
            result=self.store.save_analysis(body['case_id'],body['result'],self.actor(body['role']),provider=body.get('provider'),model=body.get('model'),agent_run_id=body.get('agent_run_id'),idempotency_key=body.get('idempotency_key'),expected_analysis_cycle=body.get('expected_analysis_cycle'),expected_snapshot_hash=body.get('expected_snapshot_hash'))
            c=self.store.get_case(body['case_id'])
            current=[a for a in c['analyses'] if a.get('analysis_cycle')==c.get('analysis_cycle') and a.get('baseline_snapshot_hash')==c['metrics']['snapshot_hash']]
            required=required_roles(c)
            if c['state']=='ANALYSING' and (c.get('analysis_plan') or {}).get('route','diagnosis')=='diagnosis' and required and set(required).issubset({a['kind'] for a in current}):
                self.store.transition_case(c['id'],'WAITING_DECISION',self.actor('business_owner'),evidence={'notes':'本轮所需岗位的分析已保存且依据未变，等待审阅方案'})
            return {'analysis':result,'case':self.case(self.store.get_case(c['id']))}
        if path=='/api/proposals/approve' and method=='POST':
            self.employees.validate_direct_approval(body)
            c=self.store.approve_proposal(body['case_id'],body['proposal'],self.actor('business_owner'),body.get('idempotency_key') or 'approve-'+uuid.uuid4().hex)
            return {'case':self.case(self.store.get_case(c['id'])),'proposal':c['approved_proposal'],'approved':True}
        if path=='/internal/tools/create-work-order' and method=='POST':
            self.employees.check_active(body,body['case_id'])
            self.employees.check_tool('maintenance_coordinator','create_work_order',body['case_id'])
            c=self.store.get_case(body['case_id'])
            proposal=c.get('approved_proposal')
            if not proposal: raise ConflictError('尚无有效批准提案')
            created=self.store.create_work_order(c['id'],proposal,self.actor('maintenance_coordinator'),body['idempotency_key'])
            w=self.store.get_work_order(created['id'],self.actor('maintenance_coordinator'))
            return {'work_order':self.order(w),'case':self.case(self.store.get_case(c['id'])),'receipt':{'operation':'create_work_order','entity_id':w['id'],'version':w['version'],'persisted':True,'read_back':True,'at':now()}}
        if path.startswith('/api/work-orders/') and len(parts)==4 and parts[3]=='transition' and method=='POST':
            w=self.store.get_work_order(parts[2]);operation=body.get('action')
            # Stable action names permit a retry with the original idempotency
            # key after the state advanced; the domain still guards new writes.
            found=next((x for actions in WO_ACTIONS.values() for x in actions if x[0]==operation),None)
            if found is None: found=next((x for x in WO_ACTIONS.get(w['state'],[]) if x[1]==operation),None)
            if not found: raise ConflictError('当前工单状态不允许此动作')
            ev=body.get('evidence') or {'notes':body.get('notes',''),'evidence_refs':body.get('evidence_refs',[])}
            if not isinstance(ev,dict): raise ValidationError('evidence 必须为对象')
            if found[1]=='COMPLETED': ev=dict(ev,accepted=True)
            saved=self.store.transition_work_order(w['id'],found[1],self.actor(found[2]),evidence=ev,idempotency_key=body.get('idempotency_key'))
            w=self.store.get_work_order(saved['id'],self.actor(found[2]))
            return {'work_order':self.order(w),'case':self.case(self.store.get_case(w['case_id'])),'receipt':{'operation':'transition_work_order','entity_id':w['id'],'version':w['version'],'persisted':True,'read_back':True,'at':now()}}
        if path.startswith('/api/cases/') and len(parts)==4 and parts[3]=='transition' and method=='POST':
            cid=parts[2];action=body.get('action');notes=body.get('notes','')
            if action in ('evaluate_observation','observe'):
                obs=self.store.evaluate_observation(cid,self.actor('operations_employee'),idempotency_key=body.get('idempotency_key'))
                return {'observation':obs,'case':self.case(self.store.get_case(cid))}
            target='CLOSED' if action=='close' else 'ANALYSING' if action in ('verify','reopen','reanalyze') else None
            if not target: raise ValidationError('未知任务动作')
            key=body.get('idempotency_key')
            if action in ('verify','reanalyze'): key='conversation-'+action+'-'+body['conversation_action_id']+'-'+str(body['conversation_action_version']) if body.get('conversation_action_id') else key or action+'-'+uuid.uuid4().hex
            c=self.store.transition_case(cid,target,self.actor('acceptor' if target=='CLOSED' else 'business_owner'),evidence={'notes':notes},idempotency_key=key)
            if target=='CLOSED': self.employees.complete_case(cid)
            result={'case':self.case(self.store.get_case(c['id']))}
            if action in ('verify','reanalyze'): result['manager_turn']=self.conversation.continuation(self.store.get_case(cid),key,body.get('conversation_action_id'),body.get('conversation_action_version'),action)
            return result
        if path.startswith('/api/cases/') and len(parts)==4 and parts[3]=='observation-plan' and method=='POST':
            c=self.store.configure_observation(parts[2],body['start'],body['end'],body['plan'],self.actor('business_owner'),idempotency_key=body.get('idempotency_key'))
            return {'case':self.case(self.store.get_case(c['id'])),'receipt':{'operation':'configure_observation','entity_id':c['id'],'version':c['version'],'persisted':True,'read_back':True,'at':now()}}
        if path=='/api/detections' and method=='POST': return self.detect(body)
        if path=='/api/import' and method=='POST':
            kind=body.get('kind');rows=body.get('records')
            fn=self.store.import_events if kind=='events' else self.store.import_production_records if kind=='production' else None
            if not fn: raise ValidationError('kind 必须是 events 或 production')
            # Imports and rule evaluations have separate receipts. If detection
            # configuration is invalid, never imply the committed import failed.
            imported=fn(rows,self.actor('data_admin'),idempotency_key=body.get('idempotency_key'),replace=False)
            imported['persisted']=True
            if body.get('detect') is True:
                try: imported['detection']=self.detect(body)
                except (DomainError,KeyError) as error:
                    imported['detection_error']=error.to_dict() if isinstance(error,DomainError) else {'error':'invalid_request','message':'检测缺少字段 '+str(error)}
            return imported
        raise NotFoundError('不支持的业务路径或方法')

    def detect(self,body):
        supplied=body.get('idempotency_key')
        key='detect-'+hashlib.sha256(str(supplied).encode()).hexdigest() if supplied else None
        result=self.store.detect_short_stops(body['equipment_id'],body['window_start'],body['window_end'],self.actor('operations_employee'),owner_id=DEMO_ACTORS['business_owner']['id'],acceptor_id=DEMO_ACTORS['acceptor']['id'],idempotency_key=key)
        if result.get('case_id'): result['case']=self.case(self.store.get_case(result['case_id']))
        return result

    def request_audit(self,path,method,status):
        with self.lock:
            roles=sorted(getattr(self.request_context,'roles',set()))
            self.jobs.execute('INSERT INTO bridge_requests VALUES(?,?,?,?,?,?,?)',('REQ-'+uuid.uuid4().hex,now(),'workspace-owner',encoded(roles),path,method,str(status)))

def make_server(app, *, port=0, token='', dev=False):
    """Bind only loopback. The token is an internal bridge credential, not RBAC."""
    if not dev and len(token)<24: raise ValueError('FACTORY_BRIDGE_TOKEN required for plugin service')
    class Handler(BaseHTTPRequestHandler):
        def log_message(self,fmt,*values): pass
        def do_GET(self): self.handle_request()
        def do_POST(self): self.handle_request()
        def handle_request(self):
            path=unquote(urlsplit(self.path).path)
            app.request_context.roles=set()
            if not dev and not hmac.compare_digest(self.headers.get('X-Factory-Token','').encode('utf-8'),token.encode('utf-8')):
                self.respond(403,{'error':'forbidden','message':'受保护的内部服务'});return
            origin=self.headers.get('Origin')
            actual_port=self.server.server_address[1]
            if dev and origin and origin not in (f'http://127.0.0.1:{actual_port}',f'http://localhost:{actual_port}'):
                self.respond(403,{'error':'origin_rejected','message':'开发服务仅允许同源请求'});return
            if dev and self.command=='GET' and not path.startswith(('/api/','/internal/','/health')):
                rel=path.lstrip('/') or 'index.html';target=(APP/'dist'/rel).resolve();base=(APP/'dist').resolve()
                if base not in target.parents or not target.is_file(): self.respond(404,{'error':'not_found'});return
                data=target.read_bytes();self.send_response(200);self.send_header('Content-Type',mimetypes.guess_type(str(target))[0] or 'application/octet-stream');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data);return
            if dev and path.startswith('/internal/'):
                self.respond(403,{'error':'forbidden','message':'内部工具仅供平台桥接'});return
            status=200
            try:
                size=int(self.headers.get('Content-Length','0'))
                if not 0<=size<=1048576: raise ValidationError('请求大小必须在 0 至 1MB 之间')
                body=json.loads(self.rfile.read(size)) if size else {}
                if not isinstance(body,dict): raise ValidationError('请求应为JSON对象')
                result=app.dispatch(self.command,path,body)
            except DomainError as e: status=e.http_status;result=e.to_dict()
            except (ValueError,KeyError,TypeError) as e: status=400;result={'error':'invalid_request','message':str(e)}
            except Exception as e: status=500;result={'error':'service_error','message':'业务服务处理失败，记录已保留。'};print(type(e).__name__+': '+str(e),flush=True)
            app.request_audit(path,self.command,status);self.respond(status,result)
        def respond(self,status,data):
            raw=encoded(data).encode();self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
    return ThreadingHTTPServer(('127.0.0.1',port),Handler)

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=18766);parser.add_argument('--db',default=str(APP/'data/factory.sqlite'));parser.add_argument('--dev',action='store_true')
    args=parser.parse_args();token=os.environ.get('FACTORY_BRIDGE_TOKEN','')
    if not args.dev and len(token)<24: raise SystemExit('FACTORY_BRIDGE_TOKEN required for plugin service')
    app=Application(args.db)
    server=make_server(app,port=args.port,token=token,dev=args.dev)
    print(f'Factory business ready on loopback:{server.server_address[1]}',flush=True)
    try: server.serve_forever()
    finally: server.server_close();app.close()

if __name__=='__main__': main()
