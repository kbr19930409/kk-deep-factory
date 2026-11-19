"""Durable manager conversations above the existing case and work-order state machines.

Only trusted internal routes write orchestration state. A model reply is never a
business receipt, and reading a conversation does not start analysis or approve work.
"""
from __future__ import annotations

import hashlib
import json
import re
import uuid
from datetime import datetime, timezone

from domain import ValidationError, ConflictError, NotFoundError
from workflow import _current


STATES = frozenset(('queued', 'thinking', 'running', 'awaiting_facts', 'awaiting_approval', 'tracking', 'blocked', 'answered', 'completed', 'rejected', 'cancelled'))
TERMINAL = frozenset(('answered', 'completed', 'rejected', 'cancelled'))
EDITABLE = frozenset(('case_id', 'reply', 'status', 'phase', 'current_actor', 'next_action', 'child_job_ids',
                      'proposal', 'proposal_analysis_id', 'error', 'intent', 'analysis_cycle', 'snapshot_hash',
                      'approved', 'approval_request_key', 'resume_request_key', 'attempt', 'artifacts', 'field_question'))
ID = re.compile(r'^[A-Za-z0-9_-]{1,128}$')


def timestamp():
    return datetime.now(timezone.utc).isoformat()


def encode(value):
    return json.dumps(value, ensure_ascii=False, allow_nan=False, separators=(',', ':'), sort_keys=True)


class ManagerStore:
    def __init__(self, application):
        self.app = application
        self.db = application.jobs
        self.lock = application.lock
        self.db.execute('''CREATE TABLE IF NOT EXISTS manager_turns(
            id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL,
            fingerprint TEXT NOT NULL, data TEXT NOT NULL)''')
        # No speculative replay after restart. Linked child jobs remain available
        # for explicit resume, and already-issued work stays under its own rules.
        with self.lock:
            for row in self.db.execute('SELECT id,data FROM manager_turns').fetchall():
                turn = json.loads(row['data'])
                if turn['status'] in ('queued', 'thinking', 'running'):
                    if turn['status']=='queued' and not turn.get('confirmation_claimed_at') and self._valid_confirmation(turn): continue
                    if turn['status']=='running' and turn.get('field_resume_pending') and turn.get('field_facts'): continue
                    turn.update(status='blocked', phase='等待继续', current_actor='工厂总管',
                                next_action='服务已重启，请查看已有结果后继续安排。',
                                error={'code': 'runtime_restarted', 'message': '服务已重启；已保存的安排、分析和工单仍在，请继续处理。'},
                                updated_at=timestamp())
                    self._save(turn)

    def _save(self, turn):
        self.db.execute('UPDATE manager_turns SET data=? WHERE id=?', (encode(turn), turn['id']))

    def _valid_confirmation(self,turn):
        source=turn.get('confirmation_source') or {}
        if source.get('kind')!='conversation_confirmation' or source.get('action') not in ('verify','reanalyze'): return False
        receipt=self.app.store.conn.execute('SELECT result FROM idempotency WHERE key=? AND operation=?',(source.get('request_key'),'transition_case')).fetchone()
        if not receipt: return False
        result=json.loads(receipt['result']);case=self.app.store._load('cases',turn.get('case_id'),False)
        scope=self.app.store._load('employee_scopes',turn.get('case_id'),False) or {}
        return bool(case and case['state']=='ANALYSING' and result.get('id')==case['id'] and result.get('state')=='ANALYSING'
                    and result.get('analysis_cycle')==case.get('analysis_cycle')
                    and source.get('scope_generation')==scope.get('generation',0) and turn.get('analysis_cycle')==case.get('analysis_cycle'))

    def claim_confirmed(self,turn_id):
        with self.lock:
            turn=self._read(turn_id)
            if turn['status']!='queued' or turn.get('confirmation_claimed_at') or not self._valid_confirmation(turn):
                return {'claimed':False,'turn':turn}
            self.app.employees.check_active({'turn_id':turn_id},turn.get('case_id'))
            before=dict(turn)
            at=timestamp();turn.update(status='running',confirmation_claimed_at=at,updated_at=at,phase='正在安排顾问',current_actor='工厂总管')
            self._save(turn);self.app.employees.on_turn(turn,before)
            return {'claimed':True,'turn':turn}

    def _read(self, turn_id):
        if not isinstance(turn_id, str) or not ID.fullmatch(turn_id):
            raise ValidationError('总管记录编号不合法')
        row = self.db.execute('SELECT data FROM manager_turns WHERE id=?', (turn_id,)).fetchone()
        if not row:
            raise NotFoundError('总管记录不存在')
        return json.loads(row['data'])

    def _case(self, case_id):
        if not isinstance(case_id, str) or not ID.fullmatch(case_id):
            raise ValidationError('请选择有效的业务任务')
        return self.app.store.get_case(case_id, self.app.actor('business_owner'))

    @staticmethod
    def _text(value, label, maximum, *, empty=True):
        if not isinstance(value, str) or len(value) > maximum or (not empty and not value.strip()):
            raise ValidationError(f'{label}须为{maximum}字以内的文字')
        return value

    def create(self, body):
        if not isinstance(body, dict) or set(body) - {'message', 'case_id', 'idempotency_key'}:
            raise ValidationError('总管请求包含不支持的字段')
        message = self._text(body.get('message'), '需求', 8000, empty=False).strip()
        case_id = body.get('case_id')
        if case_id is not None:
            self._case(case_id)
        request_key = body.get('idempotency_key')
        self._text(request_key, '请求编号', 250, empty=False)
        fingerprint = hashlib.sha256(encode({'message': message, 'case_id': case_id}).encode()).hexdigest()
        with self.lock:
            prior = self.db.execute('SELECT fingerprint,data FROM manager_turns WHERE request_key=?', (request_key,)).fetchone()
            if prior:
                if prior['fingerprint'] != fingerprint:
                    raise ConflictError('同一请求编号对应了不同需求，请使用新的请求编号')
                return json.loads(prior['data'])
            at = timestamp()
            turn = {'id': 'MGR-'+uuid.uuid4().hex[:12], 'case_id': case_id, 'message': message, 'reply': '',
                    'status': 'queued', 'phase': '已收到需求', 'current_actor': '工厂总管', 'next_action': '正在理解你的需求',
                    'child_job_ids': [], 'proposal': None, 'proposal_analysis_id': None, 'error': None,
                    'intent': None, 'analysis_cycle': None, 'snapshot_hash': None, 'approved': False,
                    'approval_request_key': None, 'resume_request_key': None, 'attempt': 1, 'attempt_started_at': at, 'created_at': at, 'updated_at': at}
            turn['scope_generation']=self.app.employees.generation(case_id) if case_id else 0
            self.db.execute('INSERT INTO manager_turns VALUES(?,?,?,?)', (turn['id'], request_key, fingerprint, encode(turn)))
            self.app.employees.on_turn(turn)
            return turn

    def accept_field_fact(self, turn_id, body):
        key = self._text(body.get('idempotency_key'), '请求编号', 220, empty=False)
        note = self._text(body.get('message'), '现场情况', 6000, empty=False).strip()
        message_id = 'MSG-' + hashlib.sha256(encode('field-fact-'+key).encode()).hexdigest()[:24]
        with self.lock, self.app.store._transaction():
            turn = self._read(turn_id)
            cid = turn.get('case_id')
            if not cid or body.get('case_id') not in (None,cid): raise ConflictError('现场反馈与原设备异常不一致')
            prior = self.app.store._load('employee_messages',message_id,False)
            if prior:
                if prior.get('turn_id') != turn_id or prior.get('text') != note: raise ConflictError('请求已用于另一条现场反馈')
                return dict(turn, field_message_id=message_id, field_replayed=True)
            self.app.employees.check_tool('manager','calculate_oee',cid)
            self.app.employees.check_active({'turn_id':turn_id},cid)
            question = turn.get('field_question') or {}
            if turn['status'] != 'awaiting_facts' or not question or body.get('fact_question_id',question['id']) != question['id']:
                raise ConflictError('这次现场询问已更新，请查看原事项中的最新问题')
            case = self._case(cid)
            named={int(n) for n in re.findall(r'(?<![A-Za-z0-9])MC[- ]?(\d+)(?![A-Za-z0-9])',note,re.I)}
            equipment=re.fullmatch(r'MC[- ]?(\d+)',case['equipment_id'],re.I)
            if named and equipment and named!={int(equipment.group(1))}: raise ConflictError('反馈中提到的设备与原异常不一致，请分开记录')
            order_exists=any(w['state'] not in ('CANCELLED','COMPLETED') for w in case['work_orders'])
            if not order_exists and (case['state'] not in ('ANALYSING','WAITING_DECISION') or case.get('analysis_cycle') != turn.get('analysis_cycle')):
                raise ConflictError('原事项已进入下一阶段，现场反馈未提交')
            if not order_exists and case['metrics']['snapshot_hash'] != turn['snapshot_hash'] and question['kind'] != 'window':
                raise ConflictError('班次证据已修订，请按最新记录重新交办')
            actor = self.app.actor('business_owner')
            fact = dict(id=message_id, project_id=actor['project_id'], author='user', recipient='manager',kind='progress',
                        text=note,turn_id=turn_id,case_id=cid,artifacts=[])
            self.app.store._put('employee_messages',fact)
            self.app.store._audit('employee_messages',message_id,'record_shopfloor_fact',actor,{'turn_id':turn_id,'case_id':cid,'question_id':question['id']})
            turn.update(field_facts=[*turn.get('field_facts',[]),{'id':message_id,'kind':question['kind'],'text':note,'at':timestamp()}],
                        status='running',field_resume_pending=True,field_question=None,updated_at=timestamp(),attempt=(turn.get('attempt') or 1)+1,phase='核对现场补充',current_actor='工厂总管',
                        next_action='按现场补充和班次记录继续办理',snapshot_hash=case['metrics']['snapshot_hash'])
            self.app.store.conn.execute('UPDATE manager_turns SET data=? WHERE id=?',(encode(turn),turn_id))
            return dict(turn, field_message_id=message_id, field_replayed=False)

    def claim_field(self, turn_id):
        with self.lock:
            turn=self._read(turn_id)
            if turn['status']!='running' or not turn.get('field_resume_pending') or not turn.get('field_facts'):
                return {'claimed':False,'turn':turn}
            self.app.employees.check_active({'turn_id':turn_id},turn['case_id'])
            turn.update(field_resume_pending=False,updated_at=timestamp())
            self._save(turn)
            return {'claimed':True,'turn':turn}

    def find_request(self, body):
        """Read an existing immutable user request before replay-sensitive work."""
        if not isinstance(body,dict) or set(body)-{'message','case_id','idempotency_key'}:
            raise ValidationError('总管请求包含不支持的字段')
        message=self._text(body.get('message'),'需求',8000,empty=False).strip()
        request_key=self._text(body.get('idempotency_key'),'请求编号',250,empty=False)
        case_id=body.get('case_id')
        if case_id is not None: self._case(case_id)
        fingerprint=hashlib.sha256(encode({'message':message,'case_id':case_id}).encode()).hexdigest()
        with self.lock:
            prior=self.db.execute('SELECT fingerprint,data FROM manager_turns WHERE request_key=?',(request_key,)).fetchone()
            if prior and prior['fingerprint']!=fingerprint:
                raise ConflictError('同一请求编号对应了不同需求，请使用新的请求编号')
            return {'turn':json.loads(prior['data']) if prior else None}

    def update(self, turn_id, changes):
        if not isinstance(changes, dict) or set(changes)-EDITABLE-{'if_status','if_updated_at'}:
            raise ValidationError('总管更新包含不支持的字段')
        with self.lock:
            turn = self._read(turn_id)
            if 'if_updated_at' in changes:
                changes = dict(changes)
                seen_at = changes.pop('if_updated_at')
                if not isinstance(seen_at,str) or not seen_at:
                    raise ValidationError('总管更新的前置时间无效')
                if turn['updated_at'] != seen_at:
                    return dict(turn, applied=False)
            if 'if_status' in changes:
                changes = dict(changes)
                expected = changes.pop('if_status')
                if not isinstance(expected, str) or expected not in STATES:
                    raise ValidationError('总管更新的前置状态无效')
                if turn['status'] != expected:
                    return dict(turn, applied=False)
            if turn['status'] in TERMINAL and any(value != turn.get(key) for key, value in changes.items()):
                raise ConflictError('已结束的总管记录不能改写，请发送新的需求')
            candidate = dict(turn, **changes)
            if candidate.get('case_id') and turn.get('case_id') is None:
                candidate['scope_generation']=self.app.employees.generation(candidate['case_id'])
            case_id = candidate.get('case_id')
            if turn.get('case_id') is not None and case_id != turn['case_id']:
                raise ConflictError('已有总管记录不能切换到其他业务任务')
            if case_id is not None:
                self._case(case_id)
            if candidate.get('status') not in STATES:
                raise ValidationError('总管状态不支持')
            for key, maximum in (('reply', 24000), ('phase', 500), ('current_actor', 200), ('next_action', 4000)):
                self._text(candidate.get(key), key, maximum)
            if candidate.get('intent') not in (None, 'answer', 'coordinate', 'clarify', 'memory', 'routine', 'stop'):
                raise ValidationError('总管安排类型不支持')
            for key in ('analysis_cycle', 'attempt'):
                value = candidate.get(key)
                if value is not None and (not isinstance(value, int) or isinstance(value, bool) or value < (1 if key == 'attempt' else 0) or value > 1000000):
                    raise ValidationError('总管版本或尝试次数不合法')
            for key, maximum in (('snapshot_hash', 128), ('approval_request_key', 250), ('resume_request_key', 250), ('proposal_analysis_id', 128)):
                if candidate.get(key) is not None:
                    self._text(candidate[key], key, maximum, empty=False)
            if not isinstance(candidate.get('approved'), bool):
                raise ValidationError('批准标记须为布尔值')
            if candidate.get('proposal') is not None and not isinstance(candidate['proposal'], dict):
                raise ValidationError('处置提案须为结构化对象')
            error = candidate.get('error')
            if error is not None:
                if not isinstance(error, dict) or set(error)-{'code', 'message'} or not error.get('code') or not error.get('message'):
                    raise ValidationError('总管错误记录须包含code和message')
                self._text(error['code'], '错误类型', 128, empty=False)
                self._text(error['message'], '错误说明', 4000, empty=False)
            child_ids = candidate.get('child_job_ids')
            if not isinstance(child_ids, list) or len(child_ids) > 64 or any(not isinstance(jid, str) or not ID.fullmatch(jid) for jid in child_ids):
                raise ValidationError('总管子任务编号列表不合法')
            if len(set(child_ids)) != len(child_ids) or not set(turn['child_job_ids']).issubset(child_ids):
                raise ConflictError('已关联的子任务记录不能删除或重复')
            if child_ids and case_id is None:
                raise ValidationError('安排同事前需要明确业务任务')
            for jid in child_ids:
                child = self.app.job_get(jid)
                if child.get('input', {}).get('case_id') != case_id:
                    raise ConflictError('同事任务不属于当前业务任务')
            # Require the linked proposal to come from this case, not arbitrary
            # model text. Approval still goes through the existing domain guard.
            analysis_id = candidate.get('proposal_analysis_id')
            if analysis_id:
                if case_id is None:
                    raise ValidationError('处置提案必须属于明确的业务任务')
                case = self._case(case_id)
                analysis = next((row for row in case['analyses'] if row['id'] == analysis_id), None)
                if not analysis or analysis.get('kind') != 'maintenance_coordinator':
                    raise ConflictError('处置提案分析不属于当前任务的协调员工')
            at=timestamp()
            # Resume uses a new durable request key even for read-only questions
            # whose runtime does not increment attempt. Progress updates must
            # never reset this wall-clock interval.
            resumed=bool(candidate.get('resume_request_key') and candidate.get('resume_request_key')!=turn.get('resume_request_key'))
            if resumed or (candidate.get('attempt') or 1)>(turn.get('attempt') or 1):
                candidate['attempt_started_at']=at
            candidate['updated_at'] = at
            self._save(candidate)
            self.app.employees.on_turn(candidate,turn)
            return candidate

    def get(self, turn_id, *, project=True):
        with self.lock:
            turn = self._read(turn_id)
            return self._project(turn) if project else turn

    def model_history(self,cases,current_case,reader):
        """Bound the model's chat history; avoid loading every case's audit timeline."""
        case_ids=encode(list(cases))
        visible="(json_extract(data,'$.case_id') IS NULL OR json_extract(data,'$.case_id') IN (SELECT value FROM json_each(?)))"
        recent=self.db.execute('SELECT data FROM manager_turns WHERE '+visible+' ORDER BY rowid DESC LIMIT 40',(case_ids,))
        recent=[json.loads(row[0]) for row in recent][::-1]
        active=self.db.execute("""SELECT data FROM manager_turns WHERE json_extract(data,'$.intent')='coordinate'
            AND json_extract(data,'$.status') NOT IN ('answered','completed','rejected','cancelled')
            AND json_extract(data,'$.case_id') IN (SELECT value FROM json_each(?)) ORDER BY rowid""",(case_ids,))
        active=[json.loads(row[0]) for row in active]
        context={'cases':dict(cases),'jobs':{}}
        if current_case:
            context['cases'][current_case['id']]=current_case
        # Approval projection checks the original analysis revision against current
        # facts. Only these cases require a baseline lookup without a selected case.
        for case_id in {t['case_id'] for t in active if t['status']=='awaiting_approval'}:
            if current_case and current_case['id']==case_id: continue
            case=dict(cases[case_id])
            case['metrics']=self.app.store.metrics(case['equipment_id'],case['baseline_start'],case['baseline_end'],reader,source=case.get('fact_source'))
            if case.get('approved_proposal'):
                case['work_orders']=self.app.store._rows('work_orders','case_id=?',(case_id,))
                current,_=_current(case,[],[],timestamp())
                case['workflow']={'current':current}
            context['cases'][case_id]=case
        for jid in dict.fromkeys(jid for turn in active for jid in turn['child_job_ids']):
            job=self.app.job_get(jid,project_result=False,persist_progress=False)
            context['jobs'][jid]={k:job.get(k) for k in ('id','role','status','progress')}
        projected={t['id']:self._project(t,context) for t in active}
        turns=[{k:projected.get(t['id'],t).get(k) for k in ('id','message','reply','case_id','status','intent','phase')} for t in recent]
        work=[]
        for t in projected.values():
            if t['status'] in TERMINAL: continue
            item={k:t.get(k) for k in ('id','case_id','status','phase','current_actor','next_action','reply','child_jobs')}
            item['case']={'equipment_id':t['case']['equipment_id']}
            work.append(item)
        return {'turns':turns,'active_turns':work}

    def list(self):
        with self.lock:
            turns = [json.loads(row['data']) for row in self.db.execute('SELECT data FROM manager_turns ORDER BY rowid').fetchall()]
            visible=turns[-40:]
            candidates=[turn for turn in turns if turn.get('intent')=='coordinate' and turn['status'] not in TERMINAL]
            context=self._projection_context(visible+candidates)
            active=[self._project(turn,context) for turn in candidates]
            return {'turns':[self._project(turn,context) for turn in visible],
                    'active_turns':[turn for turn in active if turn['status'] not in TERMINAL]}

    def active(self):
        """Tracking must outlive the bounded conversation window."""
        with self.lock:
            rows = self.db.execute('SELECT data FROM manager_turns ORDER BY rowid').fetchall()
            turns=[json.loads(row['data']) for row in rows]
            candidates=[turn for turn in turns if turn.get('intent')=='coordinate' and turn['status'] not in TERMINAL]
            context=self._projection_context(candidates)
            active=[self._project(turn,context) for turn in candidates]
            unclaimed=[{k:t[k] for k in ('id','status','updated_at')} for t in turns
                       if t['status'] in ('queued','thinking') and t.get('intent')!='coordinate'
                       and not (t.get('approved') or t.get('confirmation_source') or t.get('child_job_ids'))]
            return {'turns':[turn for turn in active if turn['status'] not in TERMINAL],
                    'unclaimed_turns':unclaimed}

    def _projection_context(self,turns):
        """Hydrate each entity once within one locked read, never across requests."""
        # Job hydration can advance a committed order's run status. Do it before
        # building any workflows so all turns see the same resulting snapshot.
        job_ids=dict.fromkeys(jid for turn in turns for jid in turn['child_job_ids'])
        jobs={jid:self.app.job_get(jid) for jid in job_ids}
        case_ids=dict.fromkeys(turn['case_id'] for turn in turns if turn.get('case_id'))
        cases={cid:self.app.case_detail(cid,self.app.actor('business_owner')) for cid in case_ids}
        return {'jobs':jobs,'cases':cases}

    def _project(self, turn, context=None):
        # A read uses case_detail, never /internal/context (which starts triage).
        result = dict(turn)
        result['persisted_status'] = turn['status']
        result['child_jobs'] = [context['jobs'][jid] if context is not None else self.app.job_get(jid) for jid in turn['child_job_ids']]
        case_id = turn.get('case_id')
        case = (context['cases'][case_id] if context is not None else self.app.case_detail(case_id, self.app.actor('business_owner'))) if case_id else None
        result['case'] = case
        result['current'] = case.get('workflow', {}).get('current') if case else None
        if case and turn.get('intent') == 'coordinate' and turn['status'] not in TERMINAL:
            if case['state'] == 'CLOSED':
                result.update(status='completed', phase='任务已闭环', current_actor='工厂总管', next_action='已完成处置、验收与效果核验，可以查看流程记录。')
            elif case['state'] in ('CANCELLED', 'DISMISSED'):
                result.update(status='blocked', phase='业务任务已结束', next_action='当前业务任务已取消或驳回；如有新需求，请重新说明。')
            elif turn['status'] == 'awaiting_approval':
                revision_matches = (turn.get('analysis_cycle') == case.get('analysis_cycle')
                                    and turn.get('snapshot_hash') == case.get('metrics', {}).get('snapshot_hash'))
                approved = case.get('approved_proposal')
                if turn.get('snapshot_hash') and not revision_matches:
                    result.update(status='blocked', phase='方案依据已变化', current_actor='工厂总管',
                                  next_action='原分析轮次或数据已变化，请核对最新任务后重新交办。',
                                  error={'code': 'MANAGER_FACTS_CHANGED', 'message': '方案依据已变化，不能继续批准旧方案。'})
                elif approved:
                    if (revision_matches and approved == turn.get('proposal')
                            and case.get('approved_metrics_hash') == turn.get('snapshot_hash')
                            and case.get('approved_by') and case.get('approved_at')):
                        active = next((order for order in case['work_orders'] if order['state'] not in ('COMPLETED', 'CANCELLED')), None)
                        result.update(approved=True, status='tracking' if active else 'running',
                                      phase='工单已下发' if active else '方案已批准，待安排工单',
                                      current_actor=(result['current'] or {}).get('role_label') or '工厂总管',
                                      next_action='按现有工单继续办理' if active else '总管将沿用这份批准安排建单，无需重复批准。')
                    else:
                        result.update(status='blocked', phase='当前批准与原方案不一致', current_actor='工厂总管',
                                      next_action='已有其他方案获批，请核对当前批准与工单记录。',
                                      error={'code': 'PROPOSAL_CHANGED', 'message': '当前批准与这份方案不一致，不能重复批准或沿用。'})
        return result
