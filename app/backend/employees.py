"""Durable employee business records, decisions and background routines.

The business service owns the facts. DSH supplies model execution; this module
never fabricates model replies or external notification receipts.
"""
from __future__ import annotations
import hashlib
import json
import re
import threading
import uuid
from datetime import datetime, timedelta, timezone

from domain import PROJECT_ID, DEMO_ACTORS, ValidationError, ConflictError, NotFoundError, AuthorizationError

SHANGHAI = timezone(timedelta(hours=8), 'Asia/Shanghai')
TOOLS = ('read_telemetry', 'read_short_stops', 'calculate_oee', 'read_work_order', 'search_knowledge', 'generate_report')
PREVIOUS_ROLES = {
    'manager': ('工厂总管', '总管', '理解需求，派活、核实交付、汇总并跟踪业务闭环。'),
    'efficiency_advisor': ('效率顾问', '效率分析', '查询运行记录，解释确定性 OEE 与短停分布，提供有来源的判断。'),
    'maintenance_advisor': ('运维顾问', '设备运维', '核对运维证据，区分已知事实与待现场验证的假设。'),
    'maintenance_coordinator': ('维修协调员', '维修工单', '形成具体方案，获人批准后建工单、回读并跟踪到验收。'),
}
ROLES = {
    'manager': ('工厂总管', '总管', '按设备异常核对影响和已有工单，安排专业岗位，汇总判断，向现场确认缺失事实并跟踪结果。'),
    'efficiency_advisor': ('生产损失分析员', '生产损失分析', '按设备、班次及可比工况量化短停次数、累计分钟、每运行小时频次及其占性能损失的比例，判断处置优先级。'),
    'maintenance_advisor': ('设备诊断员', '设备诊断', '核对设备、工装、工艺和上下游证据，给出可能原因、反证和最小现场核查项。'),
    'maintenance_coordinator': ('维修计划员', '维修计划与工单', '把已核实的诊断转为负责人、窗口、检查步骤和验收条件；方案批准后建单、回读并跟踪现场记录。'),
}
DELIVERABLES = {
    'manager':'每件异常的负责人、下一步、须人确认的事项及闭环结果。',
    'efficiency_advisor':'可比窗口、损失量与占比、数据缺口和优先级判断。',
    'maintenance_advisor':'支持与反对每项原因的证据、现场验证问题和分流建议。',
    'maintenance_coordinator':'含责任人、窗口和验收条件的方案，以及获批工单号和跟踪记录。',
}
CEILINGS = {role: set(TOOLS) | ({'create_work_order', 'update_work_order'} if role == 'maintenance_coordinator' else set()) for role in ROLES}
RISK_ACTIONS = ['create_work_order', 'notify_people', 'change_equipment', 'change_production_plan', 'send_command', 'close_work_order']
TERMINAL_JOBS = {'succeeded', 'failed', 'timed_out', 'cancelled'}
TERMINAL_TURNS = {'answered', 'completed', 'rejected', 'cancelled'}


def stamp(): return datetime.now(timezone.utc).isoformat()
def dt(value): return datetime.fromisoformat(value.replace('Z', '+00:00'))
def canonical(value): return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'), allow_nan=False)
def digest(value): return hashlib.sha256(canonical(value).encode()).hexdigest()
def identifier(prefix): return prefix+'-'+uuid.uuid4().hex[:12]
def text(value, label='文字', maximum=16000, empty=False):
    if not isinstance(value, str) or len(value) > maximum or (not empty and not value.strip()):
        raise ValidationError(f'{label}必须为不超过 {maximum} 字的文字')
    return value.strip()


class EmployeeService:
    def __init__(self, app, *, start_scheduler=True):
        self.app, self.store, self.lock = app, app.store, app.lock
        self._stop = threading.Event()
        self._thread = None
        self.last_scheduler_error = None
        for role, (name, title, responsibilities) in ROLES.items():
            existing = self.store._load('employee_profiles', role, False)
            if not existing:
                self._save('employee_profiles', {'id': role, 'name': name, 'title': title,
                    'responsibilities': responsibilities, 'exclusions': '不虚构数据，不越权执行，不把待验证假设当成事实。',
                    'allowed_tools': sorted(CEILINGS[role]), 'equipment_ids': ['*'], 'approval_required': RISK_ACTIONS,
                    'reports_to': '用户' if role == 'manager' else 'manager', 'deliverables': DELIVERABLES[role],
                    'version': 1}, 'initialize_profile')
            else:
                # Only replace former built-in text. Preserve local names, scope,
                # permissions and any individually edited duties or deliverables.
                fields = ('name', 'title', 'responsibilities', 'deliverables')
                old = (*PREVIOUS_ROLES[role], '任务记录中的分析、方案、工单及结果')
                updated = (name, title, responsibilities, DELIVERABLES[role])
                changed = {key: new for key, prior, new in zip(fields, old, updated)
                           if existing.get(key) == prior and prior != new}
                if changed:
                    if 'name' in changed:
                        changed.update(prior_display_name=existing['name'],role_renamed_at=stamp())
                    self._save('employee_profiles', dict(existing, **changed, version=existing['version']+1), 'update_role_defaults')
        # A committed run has a durable output. Interrupted runs are visible and
        # retried only through a new occurrence or explicit manual execution.
        for run in self.rows('routine_runs'):
            if run.get('state') == 'running':
                run.update(state='interrupted', error='服务重启中断本次运行，未交付结果。')
                self._save('routine_runs', run, 'interrupted')
        for row in self.app.jobs.execute('SELECT data FROM manager_turns').fetchall():
            turn=json.loads(row['data'])
            if turn.get('status')=='awaiting_approval' and turn.get('proposal'):
                self.ensure_approval(turn)
        # Recover a durable final delivery after a crash between the business
        # close commit and conversation delivery. Reads stay side-effect free.
        for case in self.store.list_cases():
            if case['state']=='CLOSED': self.complete_case(case['id'])
        if start_scheduler: self.start()

    def start(self):
        with self.lock:
            if self._thread is None and not self._stop.is_set():
                self._thread = threading.Thread(target=self._loop, name='factory-employee-routines', daemon=True)
                self._thread.start()

    def close(self):
        self._stop.set()
        if self._thread: self._thread.join(timeout=5)

    def rows(self, table):
        return [r for r in self.store._rows(table) if not r.get('deleted_at')]

    def _save(self, table, obj, operation, *, actor_role='business_owner'):
        obj = dict(obj, project_id=PROJECT_ID)
        with self.store._transaction():
            saved = self.store._put(table, obj)
            self.store._audit(table, obj['id'], operation, self.app.actor(actor_role),
                              {'version': saved.get('version'), 'case_id': saved.get('case_id'), 'content_hash': digest(saved)})
        return saved

    def _get(self, table, entity_id):
        value = self.store._load(table, entity_id)
        if value.get('deleted_at'): raise NotFoundError('记录已删除')
        return value

    def profile(self, employee_id):
        if employee_id not in ROLES: raise ValidationError('员工不存在')
        return self._get('employee_profiles', employee_id)

    def update_profile(self, employee_id, body):
        with self.lock:
            old = self.profile(employee_id)
            self.version(old, body)
            allowed = {'name', 'title', 'responsibilities', 'exclusions', 'allowed_tools', 'equipment_ids', 'approval_required', 'reports_to', 'deliverables', 'version', 'idempotency_key'}
            if set(body)-allowed: raise ValidationError('档案包含不支持的字段')
            value = dict(old)
            for key in ('name', 'title', 'responsibilities', 'exclusions', 'reports_to', 'deliverables'):
                if key in body: value[key] = text(body[key], key, 8000)
            if 'allowed_tools' in body:
                items = body['allowed_tools']
                if not isinstance(items, list) or any(not isinstance(i, str) for i in items) or not set(items).issubset(CEILINGS[employee_id]):
                    raise AuthorizationError('员工档案只能缩小服务端已授予的工具范围')
                value['allowed_tools'] = sorted(set(items))
            if 'equipment_ids' in body:
                items = body['equipment_ids']
                if not isinstance(items, list) or not items or any(not isinstance(i, str) for i in items): raise ValidationError('设备范围不能为空')
                valid = {d['id'] for d in self.store.list_devices()}
                if set(items)-valid-{'*'}: raise ValidationError('设备范围包含未知设备')
                value['equipment_ids'] = list(dict.fromkeys(items))
            if 'approval_required' in body:
                items = body['approval_required']
                if not isinstance(items, list) or any(not isinstance(i, str) for i in items) or not set(RISK_ACTIONS).issubset(items):
                    raise AuthorizationError('不能移除服务端规定的人工确认动作')
                value['approval_required'] = list(dict.fromkeys(items))
            value['version'] += 1
            return {'profile': self._save('employee_profiles', value, 'update_profile')}

    @staticmethod
    def version(old, body):
        if body.get('version') != old.get('version'): raise ConflictError('记录已更新，请刷新后再保存')

    def check_tool(self, employee_id, tool, case_id=None):
        if employee_id not in ROLES: raise AuthorizationError('当前岗位没有此员工工具权限')
        profile = self.profile(employee_id)
        if tool not in profile['allowed_tools']: raise AuthorizationError('员工档案当前未允许此工具')
        if case_id:
            case = self.store.get_case(case_id)
            if '*' not in profile['equipment_ids'] and case['equipment_id'] not in profile['equipment_ids']:
                raise AuthorizationError('该设备不在员工当前数据范围内')
        return profile

    def context(self, employee_id, case_id=None):
        profile = self.profile(employee_id)
        if case_id:
            case = self.store.get_case(case_id)
            if '*' not in profile['equipment_ids'] and case['equipment_id'] not in profile['equipment_ids']:
                raise AuthorizationError('该设备不在员工当前数据范围内')
        allowed_cases={c['id'] for c in self.store.list_cases() if '*' in profile['equipment_ids'] or c['equipment_id'] in profile['equipment_ids']}
        def visible_case(record):
            cid=record.get('case_id')
            return not cid or cid in allowed_cases and (not case_id or cid==case_id)
        memories = sorted([m for m in self.rows('employee_memories') if (m['scope'] == 'factory' or m['employee_id'] == employee_id) and visible_case(m)],key=lambda m:m['updated_at'])
        return {'profile': profile, 'memories': memories,
                'skills': [s for s in self.rows('employee_skills') if s['status'] == 'approved' and (not s.get('employee_ids') or employee_id in s['employee_ids'])],
                'logs': [m for m in self.rows('employee_logs') if m['employee_id'] == employee_id and visible_case(m)][-30:],
                'messages':[m for m in self.rows('employee_messages') if visible_case(m) and (m.get('case_id')==case_id if case_id else employee_id in (m.get('author'),m.get('recipient')))][-20:]}

    def memory(self, body, memory_id=None, delete=False):
        with self.lock:
            if memory_id:
                value = self._get('employee_memories', memory_id)
                if not delete or body.get('version') is not None: self.version(value, body)
                if delete: value['deleted_at'] = stamp()
                else:
                    value['text'] = text(body.get('text'), '记忆')
                    value['source'] = text(body.get('source','用户修订'),'来源',1000)
                    if 'scope' in body:
                        if body['scope'] not in ('employee','factory'): raise ValidationError('记忆范围不支持')
                        value['scope']=body['scope']
                    if 'kind' in body:
                        if body['kind'] not in ('preference','fact'): raise ValidationError('记忆分类不支持')
                        value['kind']=body['kind']
                value['version'] += 1
            else:
                role = body.get('employee_id', 'manager'); self.profile(role)
                scope, kind = body.get('scope', 'employee'), body.get('kind', 'preference')
                if scope not in ('employee', 'factory') or kind not in ('preference', 'fact'): raise ValidationError('记忆分类不支持')
                message = text(body.get('text'), '记忆')
                source = text(body.get('source', '用户明确说明'), '来源', 1000)
                case_id = body.get('case_id')
                if case_id: self.store.get_case(case_id)
                # Explicit duplicate preference statements reuse the same record.
                existing = next((m for m in self.rows('employee_memories') if m['employee_id'] == role and m['scope'] == scope and m['text'] == message), None)
                if existing: return {'memory': existing}
                value = {'id': identifier('MEM'), 'employee_id': role, 'scope': scope, 'kind': kind, 'text': message,
                         'source': source, 'case_id': case_id, 'version': 1, 'author': 'workspace-owner'}
            return {'memory': self._save('employee_memories', value, 'delete_memory' if delete else 'save_memory')}

    def message(self, body):
        with self.lock:
            author = body.get('author', 'manager')
            if author not in set(ROLES)|{'user', 'business_service'}: raise ValidationError('消息作者不支持')
            case_id = body.get('case_id')
            if case_id: self.store.get_case(case_id)
            key = body.get('idempotency_key') or identifier('msg')
            text(key, '消息请求编号', 250)
            payload = {k: body.get(k) for k in ('case_id','turn_id','job_id','author','recipient','kind','text','artifacts')}
            mid = 'MSG-'+digest(key)[:24]
            prior = self.store._load('employee_messages', mid, False)
            if prior:
                if prior.get('fingerprint') != digest(payload): raise ConflictError('消息请求编号已用于不同内容')
                return {'message': prior}
            artifacts = body.get('artifacts') or []
            if body.get('kind','progress') not in ('request','received','progress','delivery','handoff','review','rework','assistance','decision','error'):
                raise ValidationError('消息类型不支持')
            if body.get('recipient','user') not in set(ROLES)|{'user','business_service','team'}:
                raise ValidationError('消息接收人不支持')
            if not isinstance(artifacts, list) or len(artifacts) > 40: raise ValidationError('产物列表不合法')
            for artifact in artifacts:
                if not isinstance(artifact, dict) or not isinstance(artifact.get('id'), str): raise ValidationError('产物需要真实记录编号')
                # Validate existence and case ownership. Text labels are only labels.
                actual = self.artifact(artifact['id'])['artifact']
                if case_id and actual.get('case_id') not in (None, case_id): raise ConflictError('产物不属于此任务')
            value = dict(payload, id=mid, text=text(body.get('text'), '消息', 24000), author=author,
                         recipient=body.get('recipient', 'user'), kind=body.get('kind', 'progress'), artifacts=artifacts,
                         fingerprint=digest(payload))
            for field in ('author','recipient'):
                if value[field] in ROLES: value[field+'_name']=self.profile(value[field])['name']
            saved = self._save('employee_messages', value, 'append_message', actor_role=author if author in DEMO_ACTORS else 'business_owner')
            if author in ROLES and value['kind'] in ('delivery', 'review', 'rework', 'handoff'):
                self._save('employee_logs', {'id': 'LOG-'+mid, 'employee_id': author, 'case_id': case_id,
                    'text': value['text'], 'message_id': mid, 'artifacts': artifacts}, 'append_work_log')
            return {'message': saved}

    def on_turn(self, turn, previous=None):
        if previous is None:
            self.message({'author':'user','recipient':'manager','case_id':turn.get('case_id'),'turn_id':turn['id'],
                          'kind':'request','text':turn['message'],'idempotency_key':turn['id']+'-request'})
            self.message({'author':'manager','case_id':turn.get('case_id'),'turn_id':turn['id'],'kind':'received',
                          'text':'收到，我先核对设备和当前任务记录。','idempotency_key':turn['id']+'-received'})
        elif turn.get('reply') and turn.get('reply') != previous.get('reply'):
            self.message({'author':'manager','case_id':turn.get('case_id'),'turn_id':turn['id'],
                'kind':'delivery' if turn['status'] in ('answered','completed','awaiting_approval','tracking') else 'progress',
                'text':turn['reply'],'artifacts':turn.get('artifacts',[]),'idempotency_key':turn['id']+'-reply-'+digest({'reply':turn['reply'],'artifacts':turn.get('artifacts',[])})[:16]})
        if turn.get('status') == 'awaiting_approval' and turn.get('proposal'):
            self.ensure_approval(turn)

    def on_job(self, job, previous=None):
        kind = 'received' if previous is None else 'delivery' if job['status'] in ('succeeded','waiting_human','failed','cancelled','timed_out') else 'progress'
        value = job.get('progress') or '任务已收到，等待执行。'
        result = job.get('result') or {}
        if kind == 'delivery': value = result.get('summary') or (job.get('error') or {}).get('message') or value
        if not isinstance(value, str): value = canonical(value)
        if previous and job.get('status') == previous.get('status') and value == (previous.get('progress') or ''): return
        artifacts = []
        if result.get('analysis_id'): artifacts.append({'id':result['analysis_id'],'type':'analysis','label':'分析报告'})
        if isinstance(result.get('work_order'), dict): artifacts.append({'id':result['work_order']['id'],'type':'work_order','label':'工单'})
        self.message({'author':job['role'],'case_id':job['input']['case_id'],'turn_id':job['input'].get('turn_id') or job['input'].get('manager_turn_id'),
            'job_id':job['id'],'kind':kind,'text':value,'artifacts':artifacts,
            'idempotency_key':job['id']+'-'+digest({'status':job['status'],'text':value})[:20]})

    def skill(self, body, skill_id=None):
        with self.lock:
            old = self._get('employee_skills', skill_id) if skill_id else None
            if old: self.version(old, body)
            value = dict(old or {'id':identifier('SKILL'),'version':0}, **{k:v for k,v in body.items() if k in ('title','description','instructions','status','employee_ids','native_name')})
            value['title'] = text(value.get('title'), '技能名称', 200)
            value['instructions'] = text(value.get('instructions'), '操作说明', 24000)
            value['description'] = text(value.get('description',''), '使用场景', 2000,empty=True)
            value.setdefault('status','draft'); value.setdefault('employee_ids', [])
            if value['status'] not in ('draft','approved','retired'): raise ValidationError('技能状态不支持')
            if not isinstance(value['employee_ids'], list) or set(value['employee_ids'])-set(ROLES): raise ValidationError('技能员工范围不支持')
            value['version'] += 1
            value['approved_by'] = 'workspace-owner' if value['status'] == 'approved' else None
            return {'skill': self._save('employee_skills', value, 'save_skill')}

    def generation(self, case_id):
        scope = self.store._load('employee_scopes', case_id, False)
        return scope.get('generation',0) if scope else 0

    def direct_request(self, request, case_id, *, create=False):
        """Pin a genuine direct user request to the current cancellation epoch.

        Only the trusted runtime creates tickets. Replaying a stopped request
        never grants it a fresh epoch, including the context/job creation gap.
        """
        if not isinstance(request,dict): raise ValidationError('直接交办信息不合法')
        role=request.get('role')
        if role not in ROLES or role=='manager': raise ValidationError('请选择业务员工')
        key=text(request.get('idempotency_key'),'直接交办编号',250)
        self.context(role,case_id)
        entity_id='DIRECT-'+digest(key)[:24]
        current=self.generation(case_id)
        ticket=self.store._load('employee_scopes',entity_id,False)
        if ticket:
            if ticket['case_id']!=case_id or ticket['role']!=role: raise ConflictError('交办编号已用于其他员工或设备任务')
            if ticket['generation']!=current: raise ConflictError('这次交办已经停止，请发送新的需求')
        elif create:
            prior=self.app.jobs.execute('SELECT data FROM bridge_jobs WHERE request_key=?',(key,)).fetchone()
            if prior:
                job=json.loads(prior['data'])
                if job['role']!=role or job['input']['case_id']!=case_id or job.get('cancel_requested') or job['status']=='cancelled' or job.get('scope_generation',0)!=current:
                    raise ConflictError('原交办已停止或范围不同，请发送新的需求')
            ticket=self._save('employee_scopes',{'id':entity_id,'case_id':case_id,'role':role,'generation':current,'request_key':key},'direct_user_request')
        else: raise ConflictError('缺少有效的直接交办记录')
        if not create and request.get('generation')!=ticket['generation']: raise ConflictError('交办依据已停止，请重新提交需求')
        return {'role':role,'idempotency_key':key,'generation':ticket['generation']}

    def check_active(self, body, case_id=None):
        turn_id = body.get('turn_id') or body.get('manager_turn_id')
        job_id = body.get('job_id')
        if job_id:
            job = self.app.job_get(job_id, project_result=False)
            if case_id and job['input']['case_id'] != case_id: raise ConflictError('运行不属于此业务任务')
            case_id = job['input']['case_id']
            if job['status'] in TERMINAL_JOBS or job.get('cancel_requested') or job.get('scope_generation',0) != self.generation(case_id):
                raise ConflictError('该员工运行已经停止或结束')
            turn_id = turn_id or job['input'].get('turn_id') or job['input'].get('manager_turn_id')
        if turn_id:
            turn = self.app.manager.get(turn_id, project=False)
            if case_id and turn.get('case_id') != case_id: raise ConflictError('总管运行不属于此业务任务')
            if turn.get('cancel_requested') or turn['status'] in ('cancelled','rejected'):
                raise ConflictError('该总管安排已经停止或被拒绝')
            case_id = case_id or turn.get('case_id')
            if case_id and turn.get('scope_generation',0) != self.generation(case_id): raise ConflictError('该总管安排已被后续停止请求终止')
        elif not job_id and case_id:
            if body.get('explicit_request'):
                self.direct_request(body['explicit_request'],case_id)
            elif self.generation(case_id):
                raise ConflictError('此任务曾被停止，请从新的员工运行发起操作')

    def stop(self, *, turn_id=None, case_id=None, reason='用户要求停止', request_key=None):
        with self.lock:
            stop_id='STOP-'+digest(request_key)[:24] if request_key else None
            fingerprint=digest({'turn_id':turn_id,'case_id':case_id,'reason':reason})
            prior=self.store._load('employee_scopes',stop_id,False) if stop_id else None
            if prior:
                if prior.get('fingerprint')!=fingerprint: raise ConflictError('停止请求编号已用于不同范围')
                return dict(prior['receipt'],replayed=True)
            if turn_id:
                turn = self.app.manager.get(turn_id, project=False)
                case_id = turn.get('case_id')
            if case_id:
                case = self.store.get_case(case_id)
                self._save('employee_scopes', {'id':case_id,'case_id':case_id,'generation':self.generation(case_id)+1}, 'stop_scope')
            turns = [json.loads(r['data']) for r in self.app.jobs.execute('SELECT data FROM manager_turns').fetchall()]
            selected = [t for t in turns if (case_id and t.get('case_id') == case_id) or t['id'] == turn_id]
            stopped, completed = [], []
            at = stamp()
            for item in selected:
                if item['status'] in TERMINAL_TURNS: completed.append(item['id']); continue
                old = dict(item)
                item.update(status='cancelled',cancel_requested=True,cancelled_at=at,phase='已停止',reply='已停止继续安排工作。已有工单和现场动作保留，请按实际状态处理。',next_action='需要继续时，请发送新的需求。',updated_at=at)
                self.app.manager._save(item); stopped.append(item['id']); self.on_turn(item,old)
            for row in self.app.jobs.execute('SELECT data FROM bridge_jobs').fetchall():
                job = json.loads(row['data'])
                if job['input'].get('case_id') != case_id: continue
                if job['status'] in TERMINAL_JOBS: completed.append(job['id']); continue
                old = dict(job)
                self.app._sync_run(job,'cancelled')
                job.update(status='cancelled',cancel_requested=True,cancelled_at=at,progress='已停止后续执行',updated_at=at)
                self.app._write_job(job); stopped.append(job['id']); self.on_job(job,old)
            orders = self.store.get_case(case_id)['work_orders'] if case_id else []
            self.message({'author':'manager','case_id':case_id,'turn_id':turn_id,'kind':'delivery',
                'text':f'已停止 {len(stopped)} 项运行，{len(completed)} 项此前已结束。已有 {len(orders)} 张工单仍保留实际状态。',
                'idempotency_key':identifier('stop-message')})
            receipt={'stopped':stopped,'completed':completed,'committed_actions':[{'type':'work_order','id':w['id'],'state':w['state']} for w in orders],
                     'turn':self.app.manager.get(turn_id) if turn_id else None,'reason':reason,'replayed':False}
            if stop_id:
                self._save('employee_scopes',{'id':stop_id,'case_id':case_id,'fingerprint':fingerprint,'receipt':receipt},'stop_receipt')
            return receipt

    def ensure_approval(self, turn):
        value = self.store._load('employee_approvals', turn['id'], False)
        if value: return value
        value = {'id':turn['id'],'turn_id':turn['id'],'case_id':turn['case_id'],'status':'pending','proposal':turn['proposal'],
                 'analysis_id':turn.get('proposal_analysis_id'),'analysis_cycle':turn.get('analysis_cycle'),'snapshot_hash':turn.get('snapshot_hash'),
                 'revision':1,'expires_at':(datetime.now(timezone.utc)+timedelta(hours=24)).isoformat(),'version':1}
        return self._save('employee_approvals',value,'request_approval')

    def complete_case(self, case_id):
        """Deliver verified closure only after the case's actual close commit."""
        with self.lock:
            case=self.store.get_case(case_id)
            if case['state']!='CLOSED': return []
            result=self.result(case)
            orders=[w for w in case['work_orders'] if w['state']=='COMPLETED']
            artifacts=[{'id':case_id,'type':'case','label':'结案记录'}]
            if case.get('latest_observation_id'):
                artifacts.append({'id':case['latest_observation_id'],'type':'observation','label':'观察结果'})
            artifacts.extend({'id':w['id'],'type':'work_order','label':'已验收工单 '+w['id']} for w in orders[-3:])
            source_note=(' 设备管理系统记录；现场完成以工单证据核对。' if case.get('fact_source')=='equipment_management_system' else
                         ' 数据为合成软件验收记录，不代表现场维修成果。' if case.get('synthetic') else ' 可打开记录核对现场交付和观察依据。')
            summary=f"{case['equipment_id']} 这件事已结案。{result['summary']}"+source_note
            completed=[]
            for row in self.app.jobs.execute('SELECT data FROM manager_turns').fetchall():
                turn=json.loads(row['data'])
                if turn.get('case_id')!=case_id or turn.get('intent')!='coordinate' or turn['status'] in TERMINAL_TURNS: continue
                # EmployeeService is still being initialized during recovery;
                # use the same persistence + event hook without app.employees.
                previous=dict(turn)
                turn.update(status='completed',reply=summary,artifacts=artifacts,phase='已完成',current_actor='工厂总管',next_action='查看结果与交接记录',error=None,updated_at=stamp())
                self.app.manager._save(turn);self.on_turn(turn,previous);completed.append(turn['id'])
            return completed

    def decision(self, turn_id, body):
        with self.lock:
            turn = self.app.manager.get(turn_id,project=False)
            approval = self.ensure_approval(turn) if turn.get('proposal') else None
            if not approval: raise ConflictError('当前没有可审批的具体方案')
            decision = body.get('decision')
            if decision not in ('approve','modify','reject'): raise ValidationError('审批动作不支持')
            key = text(body.get('idempotency_key') or identifier('decision'), '审批请求编号', 250)
            fingerprint = digest({k:v for k,v in body.items() if k!='idempotency_key'})
            prior = next((d for d in approval.get('decisions',[]) if d['key']==key),None)
            if prior:
                if prior['fingerprint']!=fingerprint: raise ConflictError('审批请求编号对应不同内容')
                return {'turn':self.app.manager.get(turn_id),'approval':approval,'approved':approval['status']=='approved','proposal':approval['proposal'],'case':self.app.case(self.store.get_case(turn['case_id']))}
            if turn.get('cancel_requested') or turn['status'] in ('cancelled','rejected') or approval['status'] != 'pending': raise ConflictError('这张审批卡已结束，不能再次执行')
            if dt(approval['expires_at']) <= datetime.now(timezone.utc):
                approval.update(status='expired',version=approval['version']+1)
                self._save('employee_approvals',approval,'expire_approval')
                old=dict(turn)
                turn.update(status='rejected',phase='确认已过期',reply='这份方案的确认时间已过，不会继续执行。需要办理时，请重新交办。',updated_at=stamp())
                self.app.manager._save(turn);self.on_turn(turn,old)
                raise ConflictError('审批卡已过期，请重新确认方案')
            if body.get('revision',approval['revision']) != approval['revision']: raise ConflictError('方案已修订，请查看最新版本')
            case = self.store.get_case(turn['case_id'])
            if approval.get('analysis_cycle') != case.get('analysis_cycle') or approval.get('snapshot_hash') != case['metrics']['snapshot_hash']:
                raise ConflictError('方案依据已变化，请重新分析')
            analysis = next((a for a in case['analyses'] if a['id']==approval.get('analysis_id') and a['kind']=='maintenance_coordinator'),None)
            latest = next((a for a in reversed(case['analyses']) if a['kind']=='maintenance_coordinator' and a.get('analysis_cycle')==case['analysis_cycle'] and a.get('baseline_snapshot_hash')==case['metrics']['snapshot_hash']),None)
            if not analysis or not latest or latest['id']!=analysis['id']: raise ConflictError('需要当前轮次最新的协调方案')
            raw=analysis.get('raw')
            if approval['revision']==1 and (not isinstance(raw,dict) or raw.get('proposal')!=approval['proposal']):
                raise ConflictError('初始审批卡必须与协调员实际交付方案一致')
            supplied = body.get('proposal')
            if decision=='approve' and supplied is not None and supplied!=approval['proposal']: raise ConflictError('批准内容与当前审批卡不一致')
            old = dict(turn)
            if decision == 'modify':
                if not isinstance(supplied,dict): raise ValidationError('请提交完整修改方案')
                for key_name in ('title','description','assignee_id'): text(supplied.get(key_name),key_name,12000)
                if supplied.get('equipment_id',case['equipment_id'])!=case['equipment_id']: raise ValidationError('不能修改方案所属设备')
                if supplied['assignee_id']!=DEMO_ACTORS['technician']['id']: raise ValidationError('请选择已配置的现场执行人')
                approval.update(proposal=supplied,revision=approval['revision']+1,expires_at=(datetime.now(timezone.utc)+timedelta(hours=24)).isoformat())
                turn.update(proposal=supplied,reply='方案已按你的修改保存，请核对后确认。',status='awaiting_approval',approved=False)
            elif decision == 'reject':
                approval['status']='rejected'
                turn.update(status='rejected',reply='已记录不同意，这份方案不会执行。',next_action='需要其他方案时，请告诉我新的要求。',approved=False)
            else:
                result=self.store.approve_proposal(case['id'],approval['proposal'],self.app.actor('business_owner'),'employee-approval-'+key)
                approval.update(status='approved',approved_at=stamp(),approved_by='workspace-owner')
                turn.update(status='running',approved=True,approval_request_key=key,reply='方案已确认，等待维修计划员创建并回读工单。',next_action='创建并核对工单')
            approval.setdefault('decisions',[]).append({'key':key,'fingerprint':fingerprint,'decision':decision,'at':stamp(),'by':'workspace-owner','reason':body.get('reason','')})
            approval['version'] += 1
            approval=self._save('employee_approvals',approval,decision+'_proposal')
            turn['updated_at']=stamp(); self.app.manager._save(turn); self.on_turn(turn,old)
            self.message({'author':'user','recipient':'manager','case_id':case['id'],'turn_id':turn_id,'kind':'decision',
                'text':{'approve':'确认执行方案','modify':'修改了方案，请按新版办理','reject':'不同意这份方案'}[decision]+('：'+body['reason'] if body.get('reason') else ''),
                'idempotency_key':'decision-message-'+key})
            return {'turn':self.app.manager.get(turn_id),'approval':approval,'approved':approval['status']=='approved','proposal':approval['proposal'],'case':self.app.case(self.store.get_case(case['id']))}

    def validate_direct_approval(self, body):
        """Legacy callers cannot bypass a manager's rejected/expired/revised card."""
        approvals=[a for a in self.rows('employee_approvals') if a['case_id']==body['case_id']]
        if approvals: raise ConflictError('此任务已有总管审批卡，请从该卡片确认最新方案')
        analysis_id=body.get('analysis_id')
        case=self.store.get_case(body['case_id'])
        candidates=[a for a in case['analyses'] if a['kind']=='maintenance_coordinator' and a.get('analysis_cycle')==case.get('analysis_cycle') and a.get('baseline_snapshot_hash')==case['metrics']['snapshot_hash']]
        if not candidates or analysis_id and candidates[-1]['id']!=analysis_id: raise ConflictError('审批必须使用本轮最新协调分析')
        raw=candidates[-1].get('raw')
        proposal=raw.get('proposal') if isinstance(raw,dict) else None
        if proposal!=body['proposal']: raise ConflictError('批准内容与当前协调分析不一致')

    def routine(self, body, routine_id=None, action=None):
        with self.lock:
            if not routine_id and body.get('idempotency_key'):
                prior=next((r for r in self.rows('employee_routines') if r.get('request_key')==body['idempotency_key']),None)
                if prior:
                    if prior.get('request_fingerprint')!=digest(body): raise ConflictError('例行任务请求编号已用于不同内容')
                    return {'routine':prior}
            old=self._get('employee_routines',routine_id) if routine_id else None
            if action=='run': return self.run_routine(routine_id, manual=True, request_key=body.get('idempotency_key'))
            if action:
                if action not in ('pause','resume','delete'): raise ValidationError('例行任务动作不支持')
                value=dict(old)
                if action=='delete': value['deleted_at']=stamp();value['status']='deleted'
                else: value['status']='paused' if action=='pause' else 'active'
                value['version']+=1
                if action=='resume': value['next_run_at']=self.next_due(value)
            else:
                if old: self.version(old,body)
                value=dict(old or {'id':identifier('ROUTINE'),'version':0,'status':'active','last_result':None,'last_run_at':None})
                value.update({k:v for k,v in body.items() if k in ('title','employee_id','kind','time','timezone','equipment_id','threshold','case_id')})
                value.setdefault('employee_id','manager');self.profile(value['employee_id'])
                value.setdefault('time','08:10' if value.get('kind')=='equipment_daily_report' else '08:00');value.setdefault('timezone','Asia/Shanghai');value.setdefault('threshold',24 if value.get('kind')=='overdue_work_orders' else 3)
                value['title']=text(value.get('title'),'例行任务名称',300)
                if value.get('kind') not in ('night_shift_report','equipment_daily_report','short_stop_watch','overdue_work_orders'): raise ValidationError('例行任务类型不支持')
                if value['timezone']!='Asia/Shanghai' or not re.fullmatch(r'(?:[01]\d|2[0-3]):[0-5]\d',value['time']): raise ValidationError('请使用北京时间 HH:MM')
                if not isinstance(value['threshold'],int) or isinstance(value['threshold'],bool) or not 0<=value['threshold']<=100000: raise ValidationError('提醒次数阈值不合法')
                if value.get('equipment_id'): self.store.get_device(value['equipment_id'])
                if value.get('case_id'): self.store.get_case(value['case_id'])
                value['version']+=1;value['next_run_at']=self.next_due(value)
                if not old and body.get('idempotency_key'):
                    value.update(request_key=body['idempotency_key'],request_fingerprint=digest(body))
            return {'routine':self._save('employee_routines',value,'routine_'+(action or 'save'))}

    @staticmethod
    def next_due(routine, at=None):
        current=at or datetime.now(timezone.utc)
        if routine['kind'] not in ('night_shift_report','equipment_daily_report'): return (current+timedelta(seconds=60)).isoformat()
        local=current.astimezone(SHANGHAI); hour,minute=map(int,routine['time'].split(':'))
        due=local.replace(hour=hour,minute=minute,second=0,microsecond=0)
        if due<=local: due+=timedelta(days=1)
        return due.astimezone(timezone.utc).isoformat()

    def _loop(self):
        while not self._stop.wait(5):
            try: self.tick();self.last_scheduler_error=None
            except Exception as error: self.last_scheduler_error=str(error)

    def tick(self, at=None):
        current=at or datetime.now(timezone.utc)
        with self.lock:
            for approval in self.rows('employee_approvals'):
                if approval['status']=='pending' and dt(approval['expires_at'])<=current:
                    approval.update(status='expired',version=approval['version']+1)
                    self._save('employee_approvals',approval,'expire_approval')
                    turn=self.app.manager.get(approval['turn_id'],project=False)
                    if turn['status'] not in TERMINAL_TURNS:
                        previous=dict(turn)
                        turn.update(status='rejected',phase='确认已过期',reply='这份方案的确认时间已过，不会继续执行。需要办理时，请重新交办。',updated_at=stamp())
                        self.app.manager._save(turn);self.on_turn(turn,previous)
        for routine in self.rows('employee_routines'):
            if routine['status']=='active' and dt(routine['next_run_at'])<=current:
                self.run_routine(routine['id'],occurrence=routine['next_run_at'])
        if hasattr(self.app,'conversation'): self.app.conversation.reconcile(auto_observe=True,at=current)

    def run_routine(self, routine_id, *, manual=False, request_key=None, occurrence=None):
        with self.lock:
            routine=self._get('employee_routines',routine_id)
            if not manual and routine['status']!='active': raise ConflictError('例行任务已暂停')
            key=request_key or (identifier('manual') if manual else occurrence or routine['next_run_at'])
            run_id='RR-'+digest({'routine_id':routine_id,'key':key})[:24]
            prior=self.store._load('routine_runs',run_id,False)
            if prior: return {'run':prior,'routine':routine}
            run=self._save('routine_runs',{'id':run_id,'routine_id':routine_id,'case_id':routine.get('case_id'),'state':'running','manual':manual,'scheduled_at':occurrence,'version':1},'routine_started')
            try:
                result=self.routine_report(routine)
                unchanged=result['fingerprint']==routine.get('last_fingerprint')
                notify=manual or (result.get('should_notify',True) and not unchanged)
                run.update(state='succeeded',result=result,notified=notify,completed_at=stamp())
                run=self._save('routine_runs',run,'routine_completed')
                routine.update(last_run_at=run['completed_at'],last_result=result,last_run_id=run_id,last_fingerprint=result['fingerprint'],next_run_at=self.next_due(routine),version=routine['version']+1)
                routine=self._save('employee_routines',routine,'routine_result')
                if notify:
                    self.message({'author':routine['employee_id'],'recipient':'user','case_id':routine.get('case_id'),'kind':'delivery',
                        'text':result['summary'],'artifacts':[{'id':run_id,'type':'report','label':routine['title']}],
                        'idempotency_key':run_id+'-delivery'})
                return {'run':run,'routine':routine}
            except Exception as error:
                run.update(state='failed',error=str(error),completed_at=stamp())
                self._save('routine_runs',run,'routine_failed')
                routine.update(last_run_at=stamp(),last_result={'summary':'本次运行失败：'+str(error)},last_run_id=run_id,next_run_at=self.next_due(routine),version=routine['version']+1)
                self._save('employee_routines',routine,'routine_failed')
                raise

    def routine_report(self, routine):
        role=routine['employee_id'];profile=self.profile(role)
        self.check_tool(role,'generate_report',routine.get('case_id'))
        self.check_tool(role,'read_work_order' if routine['kind']=='overdue_work_orders' else 'calculate_oee',routine.get('case_id'))
        current=datetime.now(timezone.utc)
        if routine['kind']=='equipment_daily_report' or (routine['kind']=='short_stop_watch' and self.app.ems.enabled):
            return self.equipment_report(routine,profile)
        if routine['kind']=='overdue_work_orders':
            hours=routine['threshold']
            orders=[o for o in self.store._rows('work_orders') if o['state'] not in ('COMPLETED','CANCELLED') and (current-dt(o['updated_at'])).total_seconds()>=hours*3600
                    and (not routine.get('equipment_id') or o['equipment_id']==routine['equipment_id']) and ('*' in profile['equipment_ids'] or o['equipment_id'] in profile['equipment_ids'])]
            summary=f'有 {len(orders)} 张工单超过 {hours} 小时没有进展。'+('请确认是否联系现场人员；尚未发送外部催办。' if orders else '本次没有需要提醒的超时工单。')
            payload={'orders':[{'id':o['id'],'state':o['state'],'updated_at':o['updated_at']} for o in orders],'threshold_hours':hours,'day':current.astimezone(SHANGHAI).date().isoformat()}
            return {'summary':summary,'source':'工厂工单业务记录','synthetic':any(o.get('synthetic') for o in orders),'should_notify':bool(orders),'fingerprint':digest(payload),**payload}
        # Report the actual most recent completed night shift; no stale replay
        # is silently promoted to tonight's facts.
        local=current.astimezone(SHANGHAI); day=local.date() if local.hour>=8 else (local-timedelta(days=1)).date()
        start=datetime.combine(day,datetime.min.time(),SHANGHAI);end=start+timedelta(hours=8)
        if routine['kind']=='short_stop_watch': start=local.replace(hour=0,minute=0,second=0,microsecond=0);end=local
        devices=[d for d in self.store.list_devices() if (not routine.get('equipment_id') or d['id']==routine['equipment_id']) and ('*' in profile['equipment_ids'] or d['id'] in profile['equipment_ids'])]
        metrics=[{'equipment_id':d['id'],**self.store.metrics(d['id'],start.isoformat(),end.isoformat())} for d in devices]
        populated=[m for m in metrics if m.get('record_ids') or m.get('event_ids')]
        threshold=routine['threshold']
        # Explicit user preferences apply on every occurrence; edited/deleted
        # preferences are read again, never cached in the browser/runtime.
        for memory in self.context(role,routine.get('case_id'))['memories']:
            match=re.search(r'(?:超过|大于)\s*(\d+)\s*次',memory['text'])
            if memory['kind']=='preference' and '短停' in memory['text'] and match:
                threshold=int(match.group(1))
        alerts=[m for m in populated if m.get('short_stop_count',0)>threshold]
        if not populated: summary='这个时间窗口还没有设备记录，暂时不能判断设备状态。请同步该时段的 IoT 数据。'
        elif routine['kind']=='short_stop_watch': summary='；'.join(f"{m['equipment_id']} 已记录短停 {m['short_stop_count']} 次，超过你设置的 {threshold} 次" for m in alerts) or f"本次已有记录的设备均未超过 {threshold} 次短停。"
        else: summary=f'夜班汇报：{len(populated)} 台设备有记录，'+f'{sum(m.get("short_stop_count",0) for m in populated)} 次短停。'+(f'另有 {len(devices)-len(populated)} 台缺少该时段数据。' if len(populated)<len(devices) else '')
        synthetic=any(m.get('synthetic') for m in populated)
        summary+=f' 数据窗口：{start.strftime("%m/%d %H:%M")}—{end.strftime("%m/%d %H:%M")}（北京时间）；'+('合成数据。' if synthetic else '业务入库记录，按来源核实。')
        fingerprint=digest({'window_day':start.date().isoformat(),'kind':routine['kind'],'threshold':threshold,'metrics':[{'equipment_id':m['equipment_id'],'records':m.get('record_ids'),'events':m.get('event_ids'),'count':m.get('short_stop_count'),'oee':m.get('OEE_pct')} for m in metrics]})
        return {'summary':summary,'source':'确定性业务服务 / IoT 入库记录','window_start':start.isoformat(),'window_end':end.isoformat(),'synthetic':synthetic,
                'metrics':metrics,'effective_threshold':threshold,'should_notify':bool(alerts) if routine['kind']=='short_stop_watch' else True,'fingerprint':fingerprint}

    def equipment_report(self,routine,profile):
        status=self.app.ems.status(include_metrics=False)
        source=self.app.ems.metrics()
        window=source.get('latest_window')
        devices=[d for d in source['devices'] if (not routine.get('equipment_id') or d['id']==routine['equipment_id'])
                 and ('*' in profile['equipment_ids'] or d['id'] in profile['equipment_ids'])]
        metrics=[dict(d['latest'],equipment_id=d['id']) for d in devices if d.get('latest')]
        threshold=routine.get('threshold',3)
        for memory in self.context(routine['employee_id'],routine.get('case_id'))['memories']:
            match=re.search(r'(?:超过|大于)\s*(\d+)\s*次',memory['text'])
            if memory['kind']=='preference' and '短停' in memory['text'] and match: threshold=int(match.group(1))
        if not self.app.ems.enabled or not window or not metrics:
            return {'summary':'设备管理系统尚无可用日报，请先同步设备记录。','source':'equipment_management_system','synthetic':True,
                    'provenance':status['provenance'],'metrics':[],'coverage':{'devices':0},'effective_threshold':threshold,
                    'should_notify':routine['kind']=='equipment_daily_report','fingerprint':digest({'routine':routine['id'],'missing':True})}
        alerts=[m for m in metrics if m.get('short_stop_count',0)>threshold]
        if routine['kind']=='short_stop_watch':
            summary='；'.join(f"{m['equipment_id']} 在该日报窗口有 {m['short_stop_count']} 次短停，超过 {threshold} 次" for m in alerts) or f'本次日报记录均未超过 {threshold} 次短停。'
        else:
            valid=[m for m in metrics if m['status']=='valid'];planned=sum(m.get('T',0) for m in valid)
            overall=100*sum(m.get('ideal_good_minutes',0) for m in valid)/planned if planned else None
            summary=f"设备日报：{len(metrics)} 台设备，{sum(m.get('short_stop_count',0) for m in metrics)} 次短停。"
            if overall is not None: summary+=f'完整记录按计划时间加权的 OEE 为 {overall:.1f}%。'
            if len(valid)<len(metrics): summary+=f'另有 {len(metrics)-len(valid)} 台指标不完整。'
        summary+=f" 数据窗口：{window['business_date']} 08:00–16:00（北京时间）；来源：设备管理系统。"
        if not status['data_fresh']: summary+='前一日更新尚未到齐，这是最近已入库的日报。'
        return {'summary':summary,'source':'equipment_management_system','synthetic':True,'provenance':status['provenance'],
                'window_start':window['start'],'window_end':window['end'],'source_window':window,'metrics':metrics,'effective_threshold':threshold,
                'coverage':{'devices':len(metrics),'valid_devices':sum(m['status']=='valid' for m in metrics)},'data_fresh':status['data_fresh'],
                'should_notify':bool(alerts) if routine['kind']=='short_stop_watch' else True,
                'fingerprint':digest({'window':window,'threshold':threshold,'hashes':[m['snapshot_hash'] for m in metrics]})}

    def result(self, case):
        obs=next((o for o in case.get('observations',[]) if o['id']==case.get('latest_observation_id')),None)
        if not obs: return {'available':False,'comparable':False,'summary':'尚无完整的前后观察结果。','reason':'需要可比的基线与观察窗口。','missing_reason':'需要可比的基线与观察窗口。','synthetic':bool(case.get('synthetic')),'source_label':'合成数据' if case.get('synthetic') else '业务入库记录'}
        before,after=obs['baseline'],obs['recovery']
        fresh=all(self.store.metrics(case['equipment_id'],window['start'],window['end'],source=case.get('fact_source'))['snapshot_hash']==window.get('snapshot_hash') for window in (before,after))
        incomparable={'incomplete_or_invalid_metrics','product_operation_or_cycle_not_comparable','overlapping_comparison_windows',
                      'insufficient_or_unequal_planned_window','insufficient_planned_window','shift_unknown_or_not_comparable','no_planned_or_running_time','quality_unavailable'}
        comparable=fresh and obs.get('comparable',True) and not bool(incomparable.intersection(obs.get('reasons',[])))
        comparison={'oee':{'before':before.get('OEE_pct'),'after':after.get('OEE_pct')}}
        for key,label,unit in (('short_stop_count','短停次数',' 次'),('short_stop_minutes','累计短停',' 分钟'),
                              ('short_stops_per_run_hour','每运行小时短停次数',' 次/小时'),
                              ('short_stop_minutes_per_run_hour','每运行小时短停时长',' 分钟/小时')):
            comparison[key]={'before':before.get(key),'after':after.get(key),'label':label,'unit':unit}
        summary=f"短停 {before.get('short_stop_count','未知')} 次 → {after.get('short_stop_count','未知')} 次。"
        if comparable and all(m.get('short_stops_per_run_hour') is not None for m in (before,after)):
            summary+=f"每运行小时 {before['short_stops_per_run_hour']:.2f} → {after['short_stops_per_run_hour']:.2f} 次，累计短停 {before['short_stop_minutes']:.2f} → {after['short_stop_minutes']:.2f} 分钟。"
        if not fresh: summary='观察数据已修订，请重新核验。以下为历史比较记录。'
        elif not comparable: summary='继续观察。需要同班次、同工况的完整生产和运行记录才能比较。'
        else: summary+='观察核验通过。' if obs.get('passed') else '改善尚未达到约定条件。'
        return {'available':True,'comparable':comparable,'passed':obs['passed'] and fresh,'historical_passed':obs['passed'],'fresh':fresh,'id':obs['id'],'synthetic':bool(before.get('synthetic') or after.get('synthetic')),
                'before':{'short_stop_count':before.get('short_stop_count'),'oee':before.get('OEE_pct'),'start':before['start'],'end':before['end']},
                'after':{'short_stop_count':after.get('short_stop_count'),'oee':after.get('OEE_pct'),'start':after['start'],'end':after['end']},
                'comparison':comparison,'summary':summary,
                'reasons':obs.get('reasons',[]),'source':'已保存的观察核验记录','source_label':'合成数据' if before.get('synthetic') or after.get('synthetic') else '业务入库记录'}

    def task_context(self):
        return {'turns':[json.loads(r['data']) for r in self.app.jobs.execute('SELECT data FROM manager_turns').fetchall()],
                'jobs':[self.app.job_get(r['id']) for r in self.app.jobs.execute('SELECT id FROM bridge_jobs').fetchall()],
                'names':{r:self.profile(r)['name'] for r in ROLES},'messages':self.rows('employee_messages')}

    def task(self, case, shared=None, detail=None):
        shared=self.task_context() if shared is None else shared
        detail=self.app.case_detail(case['id'],self.app.actor('business_owner')) if detail is None else detail
        workflow=detail['workflow'];current=workflow.get('current') or {}
        turns=shared['turns']
        related=[t for t in turns if t.get('case_id')==case['id']]
        turn=next((t for t in reversed(related) if t['status'] not in TERMINAL_TURNS), related[-1] if related else None)
        approval=self.store._load('employee_approvals',turn['id'],False) if turn else None
        if approval and approval['status']=='pending' and dt(approval['expires_at'])<=datetime.now(timezone.utc): approval=dict(approval,status='expired')
        order=next((w for w in reversed(case['work_orders']) if w['state'] not in ('COMPLETED','CANCELLED')),case['work_orders'][-1] if case['work_orders'] else None)
        done=case['state'] in ('CLOSED','CANCELLED','DISMISSED')
        jobs=shared['jobs']
        running=[j for j in jobs if j['input'].get('case_id')==case['id'] and j['status'] in ('queued','running','waiting_tool')]
        if done: column='done'
        elif approval and approval['status']=='pending': column='mine'
        elif running or (turn and turn['status'] in ('queued','thinking','running')): column='ai'
        elif order and order['state'] not in ('COMPLETED','CANCELLED'): column='waiting'
        elif case['state']=='OBSERVING' and not any(a['action']=='close' for a in detail['allowed_actions']): column='waiting'
        else: column='mine'
        names=shared['names']
        owner=names.get(running[0]['role']) if running else names.get(current.get('role'),current.get('role_label','负责人'))
        if owner in ('业务负责人','最终验收人'): owner='你（开发岗位）'
        owner_id=current.get('actor_id')
        current_started=current.get('started_at');current_elapsed=current.get('elapsed_seconds')
        action = '确认给 '+case['equipment_id']+' 建工单' if approval and approval['status']=='pending' else current.get('label','查看当前任务')
        if column=='ai' and not running and turn and turn['status'] in ('queued','thinking','running'):
            owner=turn.get('current_actor') or names['manager'];owner_id='manager'
            action=turn.get('phase') or turn.get('next_action') or '总管正在处理'
            current_started=turn.get('attempt_started_at')
            if not current_started and turn.get('attempt',1)==1 and not turn.get('resume_request_key'):
                current_started=turn.get('created_at')
            current_elapsed=max(0,(datetime.now(timezone.utc)-dt(current_started)).total_seconds()) if current_started else None
        replacements={'等待负责人核实':'等你核对异常','等待负责人审阅批准提案':'等你确认方案','等待负责人发起处置提案':'请总管整理方案','等待维修计划员派工':'等待建工单','等待维修协调员工派工':'等待建工单','恢复观察中':'正在看效果','等待结案复核':'等你确认修好了','等待最终验收':'等验收人确认','等待维修人员接单':'等维修人员接单','等待负责人决定处置':'等你确认'}
        for a,b in replacements.items(): action=action.replace(a,b)
        messages=[m for m in shared['messages'] if m.get('case_id')==case['id']]
        recent=next((m['text'] for m in reversed(messages) if m['author']!='user'),'')
        stage_id=current.get('stage_id','triage');stage=0 if stage_id in ('triage','analysis_efficiency','analysis_maintenance','analysis_preparation') else 1 if stage_id in ('proposal','decision') else 2 if stage_id in ('dispatch','accept','execution','technical_review','acceptance') else 3
        timing=workflow.get('metrics') or {}
        waiting=timing.get('human_wait_seconds'); elapsed=timing.get('wall_elapsed_seconds')
        closed=next((a for a in reversed(self.store.audit_log(case['id'])) if a['entity_type']=='cases' and a['operation']=='transition' and a['data'].get('to')=='CLOSED'),None) if case['state']=='CLOSED' else None
        result=self.result(case)
        next_action=turn.get('next_action','') if turn else current.get('reason','')
        if done:
            action={'CLOSED':'已完成','CANCELLED':'已取消','DISMISSED':'已结束本次异常处理'}[case['state']]
            if case['state']=='CLOSED':
                recent=result['summary']
                next_action='已完成，可查看结果与办理记录。' if result.get('fresh',True) else '历史观察数据已修订，请重新分析并核验结果。'
            else:
                recent='本次任务已取消，未据此确认改善。' if case['state']=='CANCELLED' else '本次异常已结束处理，未据此确认改善。'
                next_action='查看结束原因与历史记录；有新问题时另行交办。'
                result=dict(result,summary=recent,passed=False)
        return {'id':case['id'],'case_id':case['id'],'asset_id':case['equipment_id'],'title':case.get('title','设备反复短停'),'column':column,
            'owner':owner,'owner_id':owner_id,'current_action':action,'next_action':next_action,
            'latest_progress':recent,'stage':stage,'elapsed_seconds':elapsed,'waiting_seconds':waiting,'wait_since':current_started,
            'current_elapsed_seconds':current_elapsed,'current_wait_seconds':current_elapsed if column in ('mine','waiting') else None,
            'overdue':column in ('mine','waiting') and (current.get('elapsed_seconds') or 0)>86400,
            'turn_id':turn['id'] if turn else None,'approval':approval,'work_order':self.app.order(order) if order else None,
            'result':result,'synthetic':bool(case.get('synthetic')),'updated_at':case['updated_at'],'acceptor':closed['actor_id']+'（开发验收岗位）' if closed else None,
            'mine':case.get('owner_id')==DEMO_ACTORS['business_owner']['id'],'allowed_actions':detail['allowed_actions'],'blocked_actions':detail['blocked_actions']}

    def board(self):
        with self.lock:
            shared=self.task_context()
            cases=[self.store.get_case(c['id']) for c in self.store.list_cases()]
            cutoff=datetime.now(timezone.utc)-timedelta(days=7)
            tasks=[self.task(c,shared) for c in cases if c['state'] not in ('CLOSED','CANCELLED','DISMISSED') or dt(c['updated_at'])>=cutoff]
            summary={key:sum(t['column']==key for t in tasks) for key in ('mine','ai','waiting','done')};summary['total']=len(tasks)
            return {'tasks':tasks,'summary':summary,'identity':{'id':'workspace-owner','delegate_id':DEMO_ACTORS['business_owner']['id'],'production_rbac':False,'label':'工作区所有者（开发岗位）'}}

    def detail(self, case_id):
        shared=self.task_context()
        case=self.store.get_case(case_id);detail=self.app.case_detail(case_id,self.app.actor('business_owner'))
        messages=[m for m in self.rows('employee_messages') if m.get('case_id')==case_id]
        profiles={role:self.profile(role) for role in ROLES}
        def author_name(message):
            role=message['author'];profile=profiles.get(role,{})
            if message.get('author_name'): return message['author_name']
            if profile.get('prior_display_name') and dt(message['created_at'])<dt(profile['role_renamed_at']): return profile['prior_display_name']
            return profile.get('name','你' if role=='user' else '业务服务')
        timeline=[{'id':m['id'],'timestamp':m['created_at'],'actor':author_name(m),
                   'actor_type':'human' if m['author']=='user' else 'ai' if m['author'] in ROLES else 'system','text':m['text'],'artifacts':m.get('artifacts',[])} for m in messages]
        timeline.extend({'id':e['id'],'timestamp':e['timestamp'],'actor':e['actor'],'actor_type':'human','text':e['title']+('：'+e['notes'] if e['notes'] else ''),'artifacts':[{'id':e['entity_id'],'label':'业务记录','type':'case' if e['entity_id']==case_id else 'work_order'}]} for e in detail['events'])
        timeline.sort(key=lambda x:(x['timestamp'],x['id']))
        for event in timeline: event.update(at=event['timestamp'],actor_label=event['actor'])
        return {'task':self.task(case,shared,detail),'case':detail,'messages':messages,'timeline':timeline,'result':self.result(case),'workflow':detail['workflow'],
                'approvals':[a for a in self.rows('employee_approvals') if a['case_id']==case_id]}

    def artifact(self, entity_id):
        tables=[('conversation_actions','conversation_action','对话确认事项'),('analyses','analysis','分析报告'),('work_orders','work_order','维修工单'),('observations','observation','观察结果'),('cases','case','业务任务'),('routine_runs','report','例行报告'),('employee_skills','skill','技能'),('employee_messages','message','协作记录'),('employee_approvals','proposal','处置方案'),('employee_memories','memory','长期记忆'),('employee_routines','routine','例行任务')]
        for table,kind,label in tables:
            value=self.store._load(table,entity_id,False)
            if value:
                return {'artifact':{'id':entity_id,'type':kind,'label':label,'case_id':value.get('case_id',entity_id if table=='cases' else None),
                    'data':value,'source':'工厂持久业务记录','synthetic':bool(value.get('synthetic',value.get('synthetic_context',(value.get('result') or {}).get('synthetic',False))))}}
        raise NotFoundError('产物记录不存在')

    def dispatch(self, method, path, body):
        parts=path.strip('/').split('/')
        if path=='/api/employees' and method=='GET': return {'employees':[self.profile(r) for r in ROLES]}
        if len(parts)==3 and parts[:2]==['api','employees'] and method=='POST': return self.update_profile(parts[2],body)
        if len(parts)==4 and parts[:2]==['api','employees'] and parts[3]=='context' and method=='GET': return self.context(parts[2])
        if path=='/internal/employee-context' and method=='POST': return self.context(body.get('employee_id'),body.get('case_id'))
        if path=='/api/memories':
            if method=='GET': return {'memories':self.rows('employee_memories')}
            if method=='POST': return self.memory(body)
        if parts[:2]==['api','memories'] and method=='POST' and len(parts) in (3,4): return self.memory(body,parts[2],delete=len(parts)==4 and parts[3]=='delete')
        if path=='/api/messages' and method=='GET': return {'messages':self.rows('employee_messages')[-1500:]}
        if path=='/api/conversations/search' and method=='POST':
            query=text(body.get('query'),'搜索词',200).casefold()
            return {'messages':[m for m in self.rows('employee_messages') if query in m['text'].casefold() and (not body.get('case_id') or m.get('case_id')==body['case_id']) and (not body.get('employee_id') or body['employee_id'] in (m['author'],m['recipient']))][-100:]}
        if path in ('/internal/messages','/internal/collaboration') and method=='POST':
            if body.get('turn_id') or body.get('job_id'): self.check_active(body,body.get('case_id'))
            return self.message(body)
        if path=='/api/skills':
            if method=='GET': return {'skills':self.rows('employee_skills')}
            if method=='POST': return self.skill(body)
        if len(parts)==3 and parts[:2]==['api','skills'] and method=='POST': return self.skill(body,parts[2])
        if path=='/api/routines':
            if method=='GET': return {'routines':self.rows('employee_routines'),'scheduler':{'running':bool(self._thread and self._thread.is_alive()),'timezone':'Asia/Shanghai','mode':'business_service_background','error':self.last_scheduler_error}}
            if method=='POST': return self.routine(body)
        if parts[:2]==['api','routines'] and method=='POST' and len(parts) in (3,4): return self.routine(body,parts[2],parts[3] if len(parts)==4 else None)
        if path=='/api/task-board' and method=='GET': return self.board()
        if len(parts)==4 and parts[:2]==['api','tasks'] and parts[3]=='detail' and method=='GET': return self.detail(parts[2])
        if len(parts)==3 and parts[:2]==['api','artifacts'] and method=='GET': return self.artifact(parts[2])
        if len(parts)==5 and parts[:3]==['api','manager','turns'] and method=='POST':
            if parts[4]=='stop': return self.stop(turn_id=parts[3],reason=body.get('reason','用户要求停止'),request_key=body.get('idempotency_key'))
            if parts[4]=='decision': return self.decision(parts[3],body)
        if len(parts)==4 and parts[:2]==['api','cases'] and method=='POST':
            if parts[3]=='stop': return self.stop(case_id=parts[2],reason=body.get('reason','用户要求停止'),request_key=body.get('idempotency_key'))
            if parts[3]=='remind':
                self.store.get_case(parts[2])
                return {'sent':False,'status':'unavailable','message':'尚未配置现场通知渠道，本次没有发送催办。请直接联系现场负责人。'}
        return None
