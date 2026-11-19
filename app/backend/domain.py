"""Persistent factory domain core. No HTTP, framework, or model client required.

The bridge MUST construct actors from a trusted server-side identity. Never pass
an HTTP request's role, project_id or equipment_ids directly to these methods.
Read methods accept actor=None for trusted in-process use; external reads should
always supply the authenticated actor. Synthetic seed data is explicitly marked.
"""
from __future__ import annotations

import hashlib
import json
import math
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
import sqlite3
import threading
import uuid
from dispatch_plan import plan_for_case, required_roles


PROJECT_ID = "PRJ-MY-FACTORY-DEMO"
ROLES = (
    "business_owner", "acceptor", "technician", "technical_reviewer",
    "maintenance_coordinator", "efficiency_advisor", "maintenance_advisor",
    "operations_employee", "report_employee", "data_admin", "viewer",
)
DEMO_ACTORS = {
    role: {"id": "demo-" + {"business_owner": "owner"}.get(role, role.replace("_", "-")),
           "role": role, "project_id": PROJECT_ID, "equipment_ids": ["*"]}
    for role in ROLES
}
TABLES = ("devices", "state_events", "production_records", "cases", "tasks",
          "work_orders", "analyses", "observations", "agent_runs",
          "employee_profiles", "employee_memories", "employee_messages", "employee_logs",
          "employee_skills", "employee_routines", "routine_runs", "employee_approvals", "employee_scopes",
          "ems_state_events", "ems_production_records", "ems_batches", "ems_sync_state", "conversation_actions")


def fact_tables(source=None):
    if source is None: return 'state_events', 'production_records'
    if source == 'equipment_management_system': return 'ems_state_events', 'ems_production_records'
    raise ValidationError('不支持的设备事实来源')


def production_shift(record):
    shift = record.get('shift_code') or record.get('shift') or record.get('shift_id')
    if isinstance(shift, str) and shift.strip():
        return shift.strip()
    # Earlier releases stored each built-in EMS daily shift as one 08–16 row.
    if (record.get('source') == 'equipment_management_system' and
            str(record.get('source_batch_id', '')).startswith('EMS-DAY-') and
            record['start'].endswith('T08:00:00+08:00') and record['end'].endswith('T16:00:00+08:00')):
        return '08:00–16:00'
    return None


class DomainError(Exception):
    code = "domain_error"
    http_status = 400

    def to_dict(self):
        return {"error": self.code, "message": str(self)}


class ValidationError(DomainError):
    code = "validation_error"


class AuthorizationError(DomainError):
    code = "forbidden"
    http_status = 403


class NotFoundError(DomainError):
    code = "not_found"
    http_status = 404


class ConflictError(DomainError):
    code = "conflict"
    http_status = 409


class TransitionError(ConflictError):
    code = "invalid_transition"


def _json(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False)


def _hash(value):
    return hashlib.sha256(_json(value).encode("utf-8")).hexdigest()


def _now():
    return datetime.now(timezone.utc).isoformat()


def _timestamp(value):
    try:
        dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError) as exc:
        raise ValidationError("时间必须为包含时区的 ISO 8601 格式") from exc
    if dt.tzinfo is None:
        raise ValidationError("时间必须包含时区")
    return dt.timestamp()


def _number(value, field, *, nullable=False, integer=False):
    if value is None and nullable:
        return None
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValidationError(f"{field} 必须为有限数字")
    if value < 0 or (integer and value != int(value)):
        raise ValidationError(f"{field} 必须为非负{'整数' if integer else '数'}")
    return value


def _required(data, *keys):
    for key in keys:
        if data.get(key) is None or data.get(key) == "":
            raise ValidationError(f"缺少 {key}")


def _union_seconds(intervals):
    end = None
    total = 0.0
    for a, b in sorted(intervals):
        if b <= a:
            continue
        if end is None or a >= end:
            total += b - a
        elif b > end:
            total += b - end
        end = max(end or b, b)
    return total


def _evidence(evidence):
    if not isinstance(evidence, dict) or not str(evidence.get("notes", "")).strip():
        raise ValidationError("状态变更需要 evidence.notes，说明事实或决定依据")
    return evidence


def _stopped_groups(events):
    """Coalesce retransmissions and contiguous fragments before classification."""
    groups = []
    for x, y, event_id in sorted((_timestamp(e["start"]), _timestamp(e["end"]), e["id"])
                                 for e in events if e["state"] == "STOPPED" and e.get("quality") == "GOOD"):
        if groups and x <= groups[-1][1]:
            groups[-1][1] = max(y, groups[-1][1])
            groups[-1][2].append(event_id)
        else:
            groups.append([x, y, [event_id]])
    return groups


class FactoryStore:
    def __init__(self, db_path, *, contract_path=None):
        self.db_path = str(db_path)
        if self.db_path != ":memory:":
            Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
        self.contract_path = Path(contract_path) if contract_path else Path(__file__).resolve().parents[2] / "contracts" / "short-stop-flow.v0.2.json"
        self._lock = threading.RLock()
        self.conn = sqlite3.connect(self.db_path, timeout=15, isolation_level=None, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA foreign_keys=ON")
        self.conn.execute("PRAGMA journal_mode=WAL")
        self.conn.execute("PRAGMA busy_timeout=15000")
        self._schema()

    def close(self):
        with self._lock:
            self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()

    def _schema(self):
        for table in TABLES:
            foreign = ""
            if table != "devices":
                foreign += ", FOREIGN KEY(equipment_id) REFERENCES devices(id)"
            if table not in ("devices", "cases"):
                foreign += ", FOREIGN KEY(case_id) REFERENCES cases(id)"
            self.conn.execute(f"""CREATE TABLE IF NOT EXISTS {table} (
                id TEXT PRIMARY KEY, project_id TEXT NOT NULL, equipment_id TEXT,
                case_id TEXT, state TEXT, start_ts REAL, end_ts REAL,
                data TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
                {foreign})""")
            self.conn.execute(f"CREATE INDEX IF NOT EXISTS ix_{table}_scope ON {table}(project_id,equipment_id,case_id)")
            self.conn.execute(f"CREATE INDEX IF NOT EXISTS ix_{table}_time ON {table}(equipment_id,start_ts,end_ts)")
        self.conn.executescript("""
            CREATE TABLE IF NOT EXISTS audit (
                seq INTEGER PRIMARY KEY AUTOINCREMENT, project_id TEXT NOT NULL,
                entity_type TEXT NOT NULL, entity_id TEXT NOT NULL,
                operation TEXT NOT NULL, actor_id TEXT NOT NULL, actor_role TEXT NOT NULL,
                created_at TEXT NOT NULL, data TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS idempotency (
                project_id TEXT NOT NULL, key TEXT NOT NULL, operation TEXT NOT NULL,
                fingerprint TEXT NOT NULL, result TEXT NOT NULL, created_at TEXT NOT NULL,
                PRIMARY KEY(project_id,key));
            CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY,value TEXT NOT NULL);
        """)

    @contextmanager
    def _transaction(self):
        with self._lock:
            self.conn.execute("BEGIN IMMEDIATE")
            try:
                yield
                self.conn.commit()
            except Exception:
                self.conn.rollback()
                raise

    def _load(self, table, entity_id, required=True):
        with self._lock:
            row = self.conn.execute(f"SELECT data FROM {table} WHERE id=?", (entity_id,)).fetchone()
        if row is None:
            if required:
                raise NotFoundError(f"{table}/{entity_id} 不存在")
            return None
        return json.loads(row["data"])

    def _rows(self, table, where="1=1", params=()):
        with self._lock:
            return [json.loads(row["data"]) for row in self.conn.execute(
                f"SELECT data FROM {table} WHERE {where} ORDER BY created_at,id", params)]

    def _put(self, table, obj):
        obj = dict(obj)
        old = self._load(table, obj["id"], False)
        obj["created_at"] = old["created_at"] if old else _now()
        obj["updated_at"] = _now()
        self.conn.execute(f"""INSERT INTO {table}
            (id,project_id,equipment_id,case_id,state,start_ts,end_ts,data,created_at,updated_at)
            VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET
            project_id=excluded.project_id,equipment_id=excluded.equipment_id,
            case_id=excluded.case_id,state=excluded.state,start_ts=excluded.start_ts,
            end_ts=excluded.end_ts,data=excluded.data,updated_at=excluded.updated_at""",
            (obj["id"], obj["project_id"], obj.get("equipment_id"), obj.get("case_id"),
             obj.get("state"), _timestamp(obj["start"]) if obj.get("start") else None,
             _timestamp(obj["end"]) if obj.get("end") else None, _json(obj), obj["created_at"], obj["updated_at"]))
        return self._load(table, obj["id"])

    def _guard(self, actor, obj, roles=None, *, assigned=None):
        if not isinstance(actor, dict) or not all(actor.get(k) for k in ("id", "role", "project_id")):
            raise AuthorizationError("需要服务端验证的岗位身份")
        if actor["role"] not in ROLES or (roles is not None and actor["role"] not in roles):
            raise AuthorizationError("当前岗位没有执行此动作的权限")
        if actor["project_id"] != obj["project_id"]:
            raise AuthorizationError("不能跨项目访问对象")
        equipment = obj.get("equipment_id") or (obj["id"] if obj.get("entity_type") == "device" else None)
        allowed = actor.get("equipment_ids", [])
        if equipment and "*" not in allowed and equipment not in allowed:
            raise AuthorizationError("设备不在岗位授权范围内")
        if assigned and actor["id"] != obj.get(assigned):
            raise AuthorizationError("只有当前指定责任人可执行该动作")

    def _read_guard(self, actor, obj):
        if actor is not None:
            self._guard(actor, obj)

    def _audit(self, table, entity_id, operation, actor, details):
        self.conn.execute("INSERT INTO audit(project_id,entity_type,entity_id,operation,actor_id,actor_role,created_at,data) VALUES(?,?,?,?,?,?,?,?)",
                          (actor["project_id"], table, entity_id, operation, actor["id"], actor["role"], _now(), _json(details)))

    def _write(self, operation, actor, payload, key, action):
        if key is not None and (not isinstance(key, str) or not key.strip() or len(key) > 250):
            raise ValidationError("幂等键必须是1–250字符的非空字符串")
        fingerprint = _hash({"operation": operation, "actor_id": actor["id"], "actor_role": actor["role"], "payload": payload})
        with self._transaction():
            if key:
                found = self.conn.execute("SELECT fingerprint,result FROM idempotency WHERE project_id=? AND key=?", (actor["project_id"], key)).fetchone()
                if found:
                    if found["fingerprint"] != fingerprint:
                        raise ConflictError("同一幂等键已用于不同内容或动作")
                    return json.loads(found["result"])
            result = action()
            if key:
                self.conn.execute("INSERT INTO idempotency VALUES(?,?,?,?,?,?)", (actor["project_id"], key, operation, fingerprint, _json(result), _now()))
            return result

    def seed_demo(self):
        """Idempotent synthetic facts only: no seeded analysis or completed order."""
        contract = json.loads(self.contract_path.read_text(encoding="utf-8-sig"))
        d = contract["demo_dataset"]
        ids = contract["cross_page_contract"]["example_ids"]
        project = ids["project_id"]
        actor = {"id": "seed-demo", "role": "data_admin", "project_id": project, "equipment_ids": ["*"]}
        with self._transaction():
            if self.conn.execute("SELECT 1 FROM settings WHERE key='demo_seeded'").fetchone():
                return {"seeded": False, "synthetic": True, "case_id": ids["incident_id"]}
            for i in range(1, 13):
                device_id = f"MC-{i:02d}"
                if self._load("devices", device_id, False):
                    raise ConflictError("演示设备 ID 与现有数据冲突；不会覆盖真实数据")
                self._put("devices", {"id": device_id, "entity_type": "device", "project_id": project,
                           "name": f"{device_id} 加工中心", "line_id": "LINE-MCH-01", "synthetic": True,
                           "source": "synthetic_contract", "state": "UNKNOWN", "connection_state": "REPLAY" if i == 7 else "NO_DATA",
                           "short_stop_boundary_seconds": 120, "minimum_coverage_pct": 98})
            eq = d["equipment"]
            date = d["date_and_windows"]["example_date"]
            common = {"project_id": project, "equipment_id": eq["equipment_id"], "product_id": eq["product_id"],
                      "operation_id": eq["operation_id"], "cycle_version": eq["ideal_cycle_version"],
                      "ideal_cycle_minutes": eq["ideal_cycle_minutes"], "data_coverage_pct": 100,
                      "synthetic": True, "source": "synthetic_contract", "shift_code": "示例日班", "quality_final": True}
            windows = (("thirty_minute_current", "09:30", "10:00"), ("thirty_minute_recovery", "10:30", "11:00"))
            for key, start, end in windows:
                s = d[key]
                self._put("production_records", dict(common, id=s["production_record_id"], start=f"{date}T{start}:00+08:00", end=f"{date}T{end}:00+08:00",
                          planned_minutes=s["T"], total_count=s["N"], good_count=s["G"], evidence_id=s["evidence_id"]))
            m = d["maintenance_segment"]
            self._put("production_records", dict(common, id="P-MAINT-001", start=m["start"], end=m["end"],
                      planned_minutes=m["duration_minutes"], total_count=0, good_count=0, evidence_id="MAINT-001"))
            for group in ("short_stop_events_in_first_window", "recovery_short_stop_events"):
                for event in d[group]:
                    # Do not seed speculative alarm associations from draft text.
                    self._put("state_events", {"id": event["id"], "project_id": project, "equipment_id": eq["equipment_id"],
                              "start": event["start"], "end": event["end"], "state": "STOPPED", "quality": "GOOD",
                              "source_event_id": event["id"], "source": "synthetic_contract", "synthetic": True,
                              "evidence_id": "E-001" if group == "short_stop_events_in_first_window" else "E-002"})
            self._put("state_events", {"id": "STOP-MAINT-001", "project_id": project, "equipment_id": eq["equipment_id"],
                      "start": m["start"], "end": m["end"], "state": "STOPPED", "quality": "GOOD",
                      "synthetic": True, "source": "synthetic_contract", "evidence_id": "MAINT-001"})
            case = {"id": ids["incident_id"], "project_id": project, "equipment_id": eq["equipment_id"],
                    "title": "MC-07 反复短停", "state": "WAITING_TRIAGE", "synthetic": True,
                    "owner_id": DEMO_ACTORS["business_owner"]["id"], "acceptor_id": DEMO_ACTORS["acceptor"]["id"],
                    "baseline_start": f"{date}T09:30:00+08:00", "baseline_end": f"{date}T10:00:00+08:00",
                    "observation_start": f"{date}T10:30:00+08:00", "observation_end": f"{date}T11:00:00+08:00",
                    "observation_plan": {"minimum_minutes": 30, "short_stop_reduction_pct": 50, "quality_tolerance_pp": 0,
                                         "note": "合成演示验收配置，真实上岗需要项目批准"}, "version": 1, "analysis_cycle": 0}
            self._put("cases", case)
            self._put("tasks", {"id": ids["business_task_id"], "project_id": project, "equipment_id": eq["equipment_id"],
                      "case_id": case["id"], "title": "反复短停处置闭环", "synthetic": True})
            self._audit("cases", case["id"], "seed_demo", actor, {"synthetic": True, "contract": self.contract_path.name})
            self.conn.execute("INSERT INTO settings VALUES('demo_seeded',?)", (_now(),))
        return {"seeded": True, "synthetic": True, "case_id": case["id"]}

    def list_devices(self, actor=None):
        rows = self._rows("devices")
        return [r for r in rows if self._visible(actor, r)]

    def _visible(self, actor, obj):
        try:
            self._read_guard(actor, obj)
            return True
        except AuthorizationError:
            return False

    def get_device(self, equipment_id, actor=None, *, source=None):
        d = self._load("devices", equipment_id)
        self._read_guard(actor, d)
        event_table, production_table = fact_tables(source)
        d["production_records"] = self._rows(production_table, "equipment_id=?", (equipment_id,))
        d["events"] = self._rows(event_table, "equipment_id=?", (equipment_id,))
        d["cases"] = self._rows("cases", "equipment_id=?", (equipment_id,))
        return d

    def list_cases(self, actor=None):
        return [r for r in self._rows("cases") if self._visible(actor, r)]

    def list_tasks(self, actor=None):
        result = []
        for task in self._rows("tasks"):
            if self._visible(actor, task):
                case = self._load("cases", task["case_id"])
                result.append(dict(task, state=case["state"], owner_id=case["owner_id"], acceptor_id=case["acceptor_id"]))
        return result

    def get_case(self, case_id, actor=None):
        case = self._load("cases", case_id)
        self._read_guard(actor, case)
        for table in ("tasks", "work_orders", "analyses", "observations", "agent_runs"):
            case[table] = self._rows(table, "case_id=?", (case_id,))
        case["metrics"] = self.metrics(case["equipment_id"], case["baseline_start"], case["baseline_end"], actor, source=case.get('fact_source'))
        case["decision_limits"] = (["OEE或生产口径未完整，只能批准核实/检查类处置；不得宣称量化改善或已查明根因"]
                                   if case.get("detection") and case["metrics"]["status"] != "valid" else [])
        return case

    def get_work_order(self, work_order_id, actor=None):
        order = self._load("work_orders", work_order_id)
        self._read_guard(actor, order)
        return order

    def plan_dispatch(self, case_id, turn, actor):
        """Persist the evidence and the actual prerequisites of this case's current cycle."""
        with self._transaction():
            case = self.get_case(case_id, actor)
            self._guard(actor, case, ('business_owner',), assigned='owner_id')
            if case['state'] not in ('ANALYSING','WAITING_DECISION') or turn.get('case_id') != case_id:
                raise ConflictError('设备异常已变更，请重新核对本轮参与岗位')
            metrics = case['metrics']
            if turn.get('analysis_cycle') != case['analysis_cycle'] or turn.get('snapshot_hash') != metrics['snapshot_hash']:
                raise ConflictError('本轮证据已变化，请核对最新数据')
            saved = case.get('analysis_plan') or {}
            same = saved.get('analysis_cycle') == case['analysis_cycle'] and saved.get('snapshot_hash') == metrics['snapshot_hash']
            if same and saved.get('turn_id') == turn['id'] and saved.get('fact_count') == len(turn.get('field_facts') or []):
                return saved
            existing = [a for a in case['analyses'] if a.get('analysis_cycle') == case['analysis_cycle'] and a.get('baseline_snapshot_hash') == metrics['snapshot_hash']]
            if case['state'] == 'WAITING_DECISION' and any(a['kind']=='maintenance_coordinator' for a in existing):
                if same and saved.get('route') == 'diagnosis': return saved
                return dict(route='diagnosis', roles=list(required_roles(case)), reason='沿用本轮尚在审核的处置提案', evidence_ids=[])
            table, _ = fact_tables(case.get('fact_source'))
            # Use only the observations that were included in the pinned metric snapshot.
            evidence_ids = set(metrics.get('event_ids', []))
            events = [r for r in self._rows(table,'equipment_id=? AND start_ts<? AND end_ts>?',(case['equipment_id'],_timestamp(case['baseline_end']),_timestamp(case['baseline_start']))) if r['id'] in evidence_ids]
            plan = plan_for_case(case, events, turn)
            plan.update(analysis_cycle=case['analysis_cycle'], snapshot_hash=metrics['snapshot_hash'], turn_id=turn['id'],
                        fact_count=len(turn.get('field_facts') or []),field_facts=[{'id':f['id'],'text':f['text']} for f in turn.get('field_facts',[])])
            stored = self._load('cases', case_id)
            stored['analysis_plan'] = plan
            self._put('cases',stored)
            self._audit('cases',case_id,'plan_dispatch',actor,{'route':plan['route'],'roles':plan['roles'],'turn_id':turn['id'],'evidence_ids':plan.get('evidence_ids',[])})
            return plan

    def get_snapshot(self, actor=None):
        cases = self.list_cases(actor)
        return {"project_id": actor["project_id"] if actor else PROJECT_ID, "devices": self.list_devices(actor),
                "cases": [self.get_case(c["id"], actor) for c in cases], "tasks": self.list_tasks(actor),
                "work_orders": [r for r in self._rows("work_orders") if self._visible(actor, r)],
                "agent_runs": [r for r in self._rows("agent_runs") if self._visible(actor, r)],
                "demo_actors": DEMO_ACTORS, "demo_actors_note": "仅供本地开发测试；HTTP必须从服务端认证映射身份，不信任客户端角色",
                "data_mode": "synthetic_or_imported_per_record", "generated_at": _now()}

    def audit_log(self, entity_id=None, actor=None):
        if actor is None:
            where, params = ("entity_id=?", (entity_id,)) if entity_id else ("1=1", ())
        else:
            self._guard(actor, {"project_id": actor.get("project_id")}, ("business_owner", "acceptor", "data_admin"))
            where, params = "project_id=?", (actor["project_id"],)
            if entity_id:
                where += " AND entity_id=?"
                params += (entity_id,)
        with self._lock:
            rows = [dict(r, data=json.loads(r["data"])) for r in self.conn.execute(f"SELECT * FROM audit WHERE {where} ORDER BY seq", params)]
        if actor is not None:
            visibility={}
            for row in rows:
                key=(row['entity_type'],row['entity_id'])
                if key not in visibility: visibility[key]=self._visible(actor,self._load(*key))
            rows=[r for r in rows if visibility[(r['entity_type'],r['entity_id'])]]
        return rows

    def import_events(self, rows, actor, idempotency_key=None, *, replace=False):
        return self._import("state_events", rows, actor, idempotency_key, replace)

    def import_production_records(self, rows, actor, idempotency_key=None, *, replace=False):
        return self._import("production_records", rows, actor, idempotency_key, replace)

    def detect_short_stops(self, equipment_id, window_start, window_end, actor, *, owner_id, acceptor_id, idempotency_key=None, as_of=None, source=None):
        """Create a reviewable case from persisted events in an explicit window.

        This manual-window development rule is not a calibrated production alarm.
        Missing production counts do not erase observed stops. Missing state
        coverage does prevent an exact frequency claim, even if three GOOD stop
        intervals are already observable. Duplicate/overlapping stops are merged.
        """
        device = self._load("devices", equipment_id)
        self._guard(actor, device, ("operations_employee", "business_owner", "data_admin"))
        a, b = _timestamp(window_start), _timestamp(window_end)
        if b <= a or b > (_timestamp(as_of) if as_of else datetime.now(timezone.utc).timestamp()):
            raise ValidationError("检测必须指定已结束且起止有效的时间窗口")
        if not all(isinstance(x, str) and x.strip() for x in (owner_id, acceptor_id)) or owner_id == acceptor_id:
            raise ValidationError("必须指定不同的业务负责人和最终验收人")
        event_table, production_table = fact_tables(source)
        scope={"equipment_id": equipment_id, "start_ts": a, "end_ts": b}
        if source: scope['fact_source']=source
        key = _hash(scope)[:16]
        case_id = "SS-"+key.upper()
        payload = {"equipment_id": equipment_id, "start": window_start, "end": window_end,
                   "owner_id": owner_id, "acceptor_id": acceptor_id}
        if source: payload['fact_source']=source

        def action():
            existing = self._load("cases", case_id, False)
            if existing:
                if (existing["owner_id"], existing["acceptor_id"]) != (owner_id, acceptor_id):
                    raise ConflictError("同设备同窗口已有案例；责任人不能在重复检测中静默更改")
                return {"created": False, "case_id": case_id, "detection": existing["detection"], "reason": "existing_window_case"}
            events = self._rows(event_table, "equipment_id=? AND start_ts<? AND end_ts>?", (equipment_id, b, a))
            production = self._rows(production_table, "equipment_id=? AND start_ts<? AND end_ts>?", (equipment_id, b, a))
            issues = []
            bad = [e for e in events if e.get("quality") != "GOOD" or e["state"] in ("UNKNOWN", "OFFLINE")]
            if bad: issues.append("uncertain_or_offline_events")
            # Merge all GOOD stopped fragments before duration classification so
            # retransmission and split records cannot inflate frequency.
            groups = _stopped_groups(events)
            if any(x < a or y > b for x, y, _ in groups): issues.append("boundary_stop_excluded")
            boundary = device.get("short_stop_boundary_seconds", 120)
            selected = [(x, y, ids) for x, y, ids in groups if x >= a and y <= b and 5 <= y-x < boundary]
            state_intervals = [(max(a, _timestamp(e["start"])), min(b, _timestamp(e["end"]))) for e in events if e.get("quality") == "GOOD" and e["state"] in ("RUNNING", "STOPPED")]
            event_coverage = 100*_union_seconds(state_intervals)/(b-a)
            prod_intervals = [(max(a, _timestamp(p["start"])), min(b, _timestamp(p["end"]))) for p in production]
            reported_coverage = min((p.get("data_coverage_pct") or 0 for p in production), default=0) if _union_seconds(prod_intervals) >= b-a-1e-6 else 0
            coverage = max(event_coverage, reported_coverage)
            if coverage < device.get("minimum_coverage_pct", 98): issues.append("insufficient_state_coverage")
            # Conflicting RUNNING/STOPPED observations indicate bad provenance,
            # not extra productive time or a confident alarm count.
            running = [(_timestamp(e["start"]), _timestamp(e["end"])) for e in events if e["state"] == "RUNNING" and e.get("quality") == "GOOD"]
            if any(max(x, u) < min(y, v) for x, y, _ in groups for u, v in running): issues.append("conflicting_state_intervals")
            provenance = {bool(e.get("synthetic")) for e in events+production}
            if len(provenance) > 1: issues.append("mixed_synthetic_and_real_facts")
            metric = self.metrics(equipment_id, window_start, window_end, source=source)
            if metric["status"] != "valid": issues.append("oee_unavailable")
            frequency_issues = {"uncertain_or_offline_events", "insufficient_state_coverage", "conflicting_state_intervals", "mixed_synthetic_and_real_facts", "boundary_stop_excluded"}
            detection = {"rule_version": "manual-window-development-v1", "production_calibrated": False,
                         "minimum_event_count": 3, "minimum_stop_seconds": 5, "short_stop_boundary_seconds": boundary,
                         "window_start": window_start, "window_end": window_end, "window_minutes": (b-a)/60,
                         "observed_short_stop_count": len(selected), "observed_short_stop_minutes": sum(y-x for x, y, _ in selected)/60,
                         "event_ids": [eid for _, _, ids in selected for eid in ids], "state_coverage_pct": coverage,
                         "confidence": "observed_lower_bound" if frequency_issues.intersection(issues) else "confirmed_observations",
                         "issues": issues, "metrics_status": metric["status"], "baseline_snapshot_hash": metric["snapshot_hash"],
                         "note": "仅针对指定窗口的已观测片段；候选规则待现场标定，不证明根因。覆盖不足时次数为观测下限。"}
            if len(selected) < 3:
                return {"created": False, "case_id": None, "detection": detection, "reason": "fewer_than_three_valid_short_stops"}
            synthetic = any(e.get("synthetic") for e in events+production)
            case = {"id": case_id, "project_id": device["project_id"], "equipment_id": equipment_id,
                    "title": equipment_id+" 反复短停待核实", "state": "WAITING_TRIAGE", "synthetic": synthetic,
                    "source": "persisted_event_detection", "owner_id": owner_id, "acceptor_id": acceptor_id,
                    "baseline_start": window_start, "baseline_end": window_end,
                    "observation_start": None, "observation_end": None, "observation_plan": None,
                    "detection": detection, "version": 1, "analysis_cycle": 0}
            if source: case['fact_source']=source
            self._put("cases", case)
            self._put("tasks", {"id": "TASK-"+case_id, "project_id": device["project_id"], "equipment_id": equipment_id,
                                "case_id": case_id, "title": "核实反复短停并完成处置闭环", "synthetic": synthetic})
            self._audit("cases", case_id, "detect_short_stops", actor, detection)
            return {"created": True, "case_id": case_id, "detection": detection}
        return self._write("detect_short_stops", actor, payload, idempotency_key, action)

    def configure_observation(self, case_id, start, end, plan, actor, *, idempotency_key=None):
        case = self._load("cases", case_id)
        self._guard(actor, case, ("business_owner",), assigned="owner_id")
        a, b = _timestamp(start), _timestamp(end)
        if a < _timestamp(case["baseline_end"]) or b <= a:
            raise ValidationError("恢复观察必须在问题窗口之后，且结束时间晚于开始时间")
        if not isinstance(plan, dict): raise ValidationError("必须提供显式观察验收计划")
        for field in ("minimum_minutes", "short_stop_reduction_pct", "quality_tolerance_pp"):
            _number(plan.get(field), field)
        if plan["minimum_minutes"] <= 0 or plan["minimum_minutes"] > (b-a)/60:
            raise ValidationError("最小观察分钟数必须为正且不超过观察时间窗")
        if not 0 < plan["short_stop_reduction_pct"] <= 100 or plan["quality_tolerance_pp"] > 100:
            raise ValidationError("改善比例必须在0至100之间且大于0，良率容差不得超过100个百分点")
        _evidence({"notes": plan.get("notes", "")})
        def action():
            c = self._load("cases", case_id)
            if c["state"] in ("CLOSED", "CANCELLED", "DISMISSED"):
                raise TransitionError("已终结主任务不能修改观察计划，需先重新开启")
            before = {k: c.get(k) for k in ("observation_start", "observation_end", "observation_plan")}
            c.update(observation_start=start, observation_end=end,
                     observation_plan=dict(plan, comparison_basis='per_run_hour', configured_by=actor["id"], configured_at=_now()),
                     version=c["version"]+1)
            c.pop("latest_observation_id", None)
            saved = self._put("cases", c)
            self._audit("cases", case_id, "configure_observation", actor, {"before": before, "start": start, "end": end, "plan": plan})
            return saved
        return self._write("configure_observation", actor, {"case_id": case_id, "start": start, "end": end, "plan": plan}, idempotency_key, action)

    def _import(self, table, rows, actor, key, replace):
        if not isinstance(rows, list) or not rows:
            raise ValidationError("导入必须包含非空记录列表")
        normalized = []
        for item in rows:
            r = dict(item)
            _required(r, "id", "equipment_id", "start", "end", "source")
            device = self._load("devices", r["equipment_id"])
            self._guard(actor, device, ("data_admin",))
            r["project_id"] = device["project_id"]
            r.setdefault("synthetic", False)
            if not isinstance(r["synthetic"], bool):
                raise ValidationError("synthetic 必须为布尔值")
            a, b = _timestamp(r["start"]), _timestamp(r["end"])
            if b <= a:
                raise ValidationError("结束时间必须晚于开始时间")
            if table in ("state_events", "ems_state_events"):
                if r.get("state") not in ("STOPPED", "RUNNING", "UNKNOWN", "OFFLINE"):
                    raise ValidationError("不支持的设备状态")
                if r.get("quality") not in ("GOOD", "UNCERTAIN", "BAD"):
                    raise ValidationError("事件必须明确标记 quality=GOOD/UNCERTAIN/BAD")
            else:
                for field in ("planned_minutes", "ideal_cycle_minutes", "data_coverage_pct"):
                    _number(r.get(field), field, nullable=True)
                for field in ("total_count", "good_count"):
                    _number(r.get(field), field, nullable=True, integer=True)
                if r.get("planned_minutes") is not None and r["planned_minutes"] > (b-a)/60 + 1e-8:
                    raise ValidationError("计划生产时间超过记录窗口")
                if r.get("data_coverage_pct") is not None and r["data_coverage_pct"] > 100:
                    raise ValidationError("覆盖率超过100%")
                if r.get("ideal_cycle_minutes") == 0:
                    raise ValidationError("理想节拍必须大于0")
                if r.get("good_count") is not None and r.get("total_count") is not None and r["good_count"] > r["total_count"]:
                    raise ValidationError("合格数不能超过总数")
                r.setdefault("quality_final", False)
            normalized.append(r)

        def action():
            result = []
            for r in normalized:
                old = self._load(table, r["id"], False)
                if old:
                    self._guard(actor, old, ("data_admin",))
                    old_content = {k: v for k, v in old.items() if k not in ("created_at", "updated_at")}
                    if _hash(old_content) == _hash(r):
                        result.append(old)
                        continue
                    if not replace:
                        raise ConflictError("记录 ID 已存在且内容不同；更正需显式 replace=True 并留痕")
                if table in ("production_records", "ems_production_records"):
                    overlaps = self._rows(table, "equipment_id=? AND id<>? AND start_ts<? AND end_ts>?",
                                          (r["equipment_id"], r["id"], _timestamp(r["end"]), _timestamp(r["start"])))
                    if overlaps:
                        raise ConflictError("生产记录时间重叠，不能重复计数")
                saved = self._put(table, r)
                self._audit(table, r["id"], "replace" if old else "import", actor, {"before": old, "after": saved})
                result.append(saved)
            return {"records": result, "count": len(result)}
        return self._write("import_" + table, actor, {"records": normalized, "replace": replace}, key, action)

    def metrics(self, equipment_id, start, end, actor=None, *, source=None):
        """Deterministic time-weighted OEE, with explicit incomplete/invalid states.

        Counts are never prorated. A partial aggregated production record makes
        the query incomplete; import finer records to query finer windows.
        """
        device = self._load("devices", equipment_id)
        self._read_guard(actor, device)
        a, b = _timestamp(start), _timestamp(end)
        if b <= a:
            raise ValidationError("指标窗口结束时间必须晚于开始时间")
        event_table, production_table = fact_tables(source)
        rows = self._rows(production_table, "equipment_id=? AND start_ts<? AND end_ts>?", (equipment_id, b, a))
        events = self._rows(event_table, "equipment_id=? AND start_ts<? AND end_ts>?", (equipment_id, b, a))
        issues, fatal = [], []
        intervals = [(max(a, _timestamp(r["start"])), min(b, _timestamp(r["end"]))) for r in rows]
        if not rows or _union_seconds(intervals) < b-a-1e-6:
            issues.append("production_record_gap")
        if any(_timestamp(r["start"]) < a or _timestamp(r["end"]) > b for r in rows):
            issues.append("partial_aggregated_record")
        if any(r.get("planned_minutes") is None for r in rows):
            issues.append("missing_plan")
        if any(r.get("total_count") is None for r in rows):
            issues.append("missing_total_count")
        if any(r.get("good_count") is None or not r.get("quality_final") for r in rows):
            issues.append("missing_final_quality")
        if any(r.get("ideal_cycle_minutes") is None or not all(r.get(x) for x in ("product_id", "operation_id", "cycle_version")) for r in rows):
            issues.append("missing_cycle_or_product")
        coverage = min((r.get("data_coverage_pct") if r.get("data_coverage_pct") is not None else 0 for r in rows), default=0)
        if coverage < device.get("minimum_coverage_pct", 98):
            issues.append("insufficient_state_coverage")
        if any(e["state"] in ("UNKNOWN", "OFFLINE") or e.get("quality") != "GOOD" for e in events):
            issues.append("unknown_state_or_bad_event")
        provenance = {bool(r.get("synthetic")) for r in rows+events}
        if len(provenance) > 1:
            issues.append("mixed_synthetic_and_real_facts")
        T = sum(r.get("planned_minutes") or 0 for r in rows)
        long_intervals, short_intervals, short_ids = [], [], []
        boundary = device.get("short_stop_boundary_seconds", 120)
        groups = _stopped_groups(events)
        for x, y, ids in groups:
            clipped = (max(a, x), min(b, y))
            if y-x >= boundary:
                long_intervals.append(clipped)
            else:
                short_intervals.append(clipped)
                short_ids.append(ids)
        if any(max(x, u) < min(y, v) for x, y in long_intervals for u, v in short_intervals):
            fatal.append("overlapping_stop_classification")
        running = [(_timestamp(e["start"]), _timestamp(e["end"])) for e in events if e["state"] == "RUNNING" and e.get("quality") == "GOOD"]
        if any(max(x, u) < min(y, v) for x, y, _ in groups for u, v in running):
            fatal.append("conflicting_state_intervals")
        D = _union_seconds(long_intervals)/60
        short = _union_seconds(short_intervals)/60
        R = T-D
        N = sum(r.get("total_count") or 0 for r in rows)
        G = sum(r.get("good_count") or 0 for r in rows)
        net = sum((r.get("ideal_cycle_minutes") or 0)*(r.get("total_count") or 0) for r in rows)
        good_time = sum((r.get("ideal_cycle_minutes") or 0)*(r.get("good_count") or 0) for r in rows)
        if D > T+1e-8 or net > R+1e-8 or short > R-net+1e-8:
            fatal.append("inconsistent_time_counts_or_cycle")
        complete_time = not any(i in issues for i in ("production_record_gap", "partial_aggregated_record", "missing_plan", "insufficient_state_coverage", "unknown_state_or_bad_event"))
        count_ok = "missing_total_count" not in issues
        cycle_ok = "missing_cycle_or_product" not in issues
        quality_ok = "missing_final_quality" not in issues and count_ok
        A = 100*R/T if complete_time and T > 0 and not fatal else None
        P = 100*net/R if complete_time and count_ok and cycle_ok and R > 0 and not fatal else None
        Q = 100*G/N if quality_ok and N > 0 and not fatal else None
        weighted_Q = 100*good_time/net if quality_ok and cycle_ok and net > 0 and not fatal else None
        oee = 100*good_time/T if not issues and not fatal and T > 0 else None
        status = "invalid" if fatal else "incomplete" if issues else "not_applicable" if T == 0 else "valid"
        signatures = sorted({(r.get("product_id"), r.get("operation_id"), r.get("cycle_version"), r.get("ideal_cycle_minutes")) for r in rows}, key=str)
        shifts = {production_shift(row) for row in rows}
        result = {"equipment_id": equipment_id, "start": start, "end": end, "status": status,
                  "issues": issues+fatal, "T": T, "D": D, "R": R, "N": N, "G": G,
                  "A_pct": A, "P_pct": P, "Q_pct": Q, "Q_time_weighted_pct": weighted_Q, "OEE_pct": oee,
                  "short_stop_count": len(short_ids), "short_stop_minutes": short,
                  "short_stops_per_run_hour": 60*len(short_ids)/R if status == 'valid' and R > 0 else None,
                  "short_stop_minutes_per_run_hour": 60*short/R if status == 'valid' and R > 0 else None,
                  "production_shift": next(iter(shifts)) if len(shifts)==1 else None,
                  "other_performance_loss_minutes": R-net-short if complete_time and count_ok and cycle_ok and not fatal else None,
                  "quality_loss_minutes": net-good_time if quality_ok and cycle_ok and not fatal else None,
                  "ideal_good_minutes": good_time if quality_ok and cycle_ok else None,
                  "data_coverage_pct": coverage, "mixed_products": len(signatures) > 1,
                  "quality_formula_note": "混产品OEE用理想合格时间加权；Q_pct是件数良率，A×P应乘Q_time_weighted_pct。",
                  "product_signatures": signatures, "record_ids": [r["id"] for r in rows], "event_ids": [e["id"] for e in events],
                  "mixed_provenance": len(provenance) > 1,
                  "synthetic": any(r.get("synthetic") for r in rows+events), "fact_source": source}
        result["snapshot_hash"] = _hash({"records": rows, "events": events, "start": start, "end": end})
        return result

    def save_analysis(self, case_id, raw, actor, *, provider=None, model=None, agent_run_id=None, idempotency_key=None, expected_analysis_cycle=None, expected_snapshot_hash=None):
        case = self._load("cases", case_id)
        self._guard(actor, case, ("efficiency_advisor", "maintenance_advisor", "maintenance_coordinator"))
        if not isinstance(raw, (str, dict, list)) or not raw or (isinstance(raw, str) and not raw.strip()):
            raise ValidationError("必须保存实际非空模型输出，不接受预设占位回答")
        payload = {"case_id": case_id, "raw": raw, "provider": provider, "model": model, "agent_run_id": agent_run_id}
        if expected_analysis_cycle is not None:
            if not isinstance(expected_analysis_cycle, int) or isinstance(expected_analysis_cycle, bool) or expected_analysis_cycle < 0:
                raise ValidationError("分析轮次必须是非负整数")
            payload["expected_analysis_cycle"] = expected_analysis_cycle
        if expected_snapshot_hash is not None:
            if not isinstance(expected_snapshot_hash, str) or not expected_snapshot_hash:
                raise ValidationError("分析依据版本不能为空")
            payload["expected_snapshot_hash"] = expected_snapshot_hash
        def action():
            current = self._load("cases", case_id)
            if current["state"] not in ("ANALYSING", "WAITING_DECISION", "OBSERVING"):
                raise TransitionError("当前业务状态不接受分析产物")
            current_hash = self.metrics(case["equipment_id"], case["baseline_start"], case["baseline_end"], source=case.get('fact_source'))["snapshot_hash"]
            if expected_analysis_cycle is not None and current.get("analysis_cycle", 0) != expected_analysis_cycle:
                raise ConflictError("模型分析期间任务已进入新一轮，本次结果不能计入当前轮次")
            if expected_snapshot_hash is not None and current_hash != expected_snapshot_hash:
                raise ConflictError("模型分析期间业务数据已变化，请根据最新记录重新分析")
            if agent_run_id:
                run = self._load("agent_runs", agent_run_id)
                if run["case_id"] != case_id or run["actor_id"] != actor["id"]:
                    raise AuthorizationError("分析与AI运行归属不匹配")
                if run["state"] in ("CANCELLED", "FAILED", "TIMED_OUT"):
                    raise ConflictError("该员工运行已停止，不能提交迟到的分析结果")
            obj = {"id": "AN-"+uuid.uuid4().hex[:12], "project_id": case["project_id"], "equipment_id": case["equipment_id"],
                   "case_id": case_id, "kind": actor["role"], "raw": raw, "provider": provider, "model": model,
                   "agent_run_id": agent_run_id, "synthetic_context": bool(case.get("synthetic")), "model_output": True,
                   "analysis_cycle": current.get("analysis_cycle", 0),
                   "baseline_snapshot_hash": current_hash}
            saved = self._put("analyses", obj)
            self._audit("analyses", obj["id"], "save_actual_output", actor, {"case_id": case_id, "content_hash": _hash(raw)})
            return saved
        return self._write("save_analysis", actor, payload, idempotency_key, action)

    def transition_case(self, case_id, target, actor, evidence=None, idempotency_key=None):
        case = self._load("cases", case_id)
        self._guard(actor, case)
        evidence = _evidence(evidence)
        def action():
            c = self._load("cases", case_id)
            old = c["state"]
            owner_pairs = {("WAITING_TRIAGE", "ANALYSING"), ("WAITING_TRIAGE", "DISMISSED"),
                           ("ANALYSING", "WAITING_DECISION"), ("WAITING_DECISION", "ANALYSING"),
                           ("WAITING_ACTION", "ANALYSING"),
                           ("OBSERVING", "ANALYSING"), ("CLOSED", "ANALYSING")}
            if (old, target) in owner_pairs:
                self._guard(actor, c, ("business_owner",), assigned="owner_id")
                if old == "WAITING_ACTION" and target == "ANALYSING" and any(
                    w["state"] not in ("COMPLETED", "CANCELLED") for w in self._rows("work_orders", "case_id=?", (case_id,))
                ):
                    raise ValidationError("重新分析前先处理在途工单，避免旧授权继续执行")
                if target == "WAITING_DECISION":
                    analyses = self._rows("analyses", "case_id=?", (case_id,))
                    current_hash = self.metrics(c["equipment_id"], c["baseline_start"], c["baseline_end"], source=c.get('fact_source'))["snapshot_hash"]
                    valid = [a for a in analyses if a.get("analysis_cycle") == c.get("analysis_cycle") and a["baseline_snapshot_hash"] == current_hash]
                    roles = required_roles(c, current_hash)
                    if not roles or (c.get('analysis_plan') or {}).get('route') in ('loss','field','process_followup') or not set(roles).issubset({a['kind'] for a in valid}):
                        raise ValidationError("需要本轮计划指定的实际分析产物，且证据未发生修订")
            elif old == "OBSERVING" and target == "CLOSED":
                self._guard(actor, c, ("acceptor",), assigned="acceptor_id")
                obs = self._load("observations", c.get("latest_observation_id", ""), False)
                if not obs or not obs["passed"]:
                    raise ValidationError("恢复观察尚未通过")
                for label in ("baseline", "recovery"):
                    m = obs[label]
                    fresh = self.metrics(c["equipment_id"], m["start"], m["end"], source=c.get('fact_source'))
                    if fresh["snapshot_hash"] != m["snapshot_hash"]:
                        raise ConflictError("观察数据已修订，需重新核验")
                if not any(w["state"] == "COMPLETED" for w in self._rows("work_orders", "case_id=?", (case_id,))):
                    raise ValidationError("没有已验收工单")
            elif target == "CANCELLED" and old not in ("CLOSED", "CANCELLED", "DISMISSED"):
                self._guard(actor, c, ("business_owner",), assigned="owner_id")
                if any(w["state"] not in ("COMPLETED", "CANCELLED") for w in self._rows("work_orders", "case_id=?", (case_id,))):
                    raise ValidationError("先处理所有在途工单，再取消主任务")
            else:
                raise TransitionError(f"主任务不允许 {old}→{target}")
            c["state"] = target
            c["version"] += 1
            if target == "ANALYSING":
                c.pop('analysis_plan', None)
                c.pop("approved_proposal", None)
                c.pop("approved_proposal_hash", None)
                c["analysis_cycle"] = c.get("analysis_cycle", 0)+1
            saved = self._put("cases", c)
            self._audit("cases", case_id, "transition", actor, {"from": old, "to": target, "evidence": evidence})
            return saved
        return self._write("transition_case", actor, {"case_id": case_id, "target": target, "evidence": evidence}, idempotency_key, action)

    def approve_proposal(self, case_id, proposal, actor, idempotency_key):
        case = self._load("cases", case_id)
        self._guard(actor, case, ("business_owner",), assigned="owner_id")
        if not isinstance(proposal, dict):
            raise ValidationError("proposal 必须是结构化对象")
        _required(proposal, "title", "description", "assignee_id")
        if not all(isinstance(proposal[k], str) and proposal[k].strip() for k in ("title", "description", "assignee_id")):
            raise ValidationError("提案标题、说明和执行人ID必须为非空字符串")
        if proposal["assignee_id"] == case["acceptor_id"]:
            raise ValidationError("现场执行人与最终验收人应分离")
        if proposal.get("equipment_id", case["equipment_id"]) != case["equipment_id"]:
            raise ValidationError("提案设备与主任务不一致")
        def action():
            c = self._load("cases", case_id)
            if c["state"] != "WAITING_DECISION":
                raise TransitionError("只有待决策任务可批准处置提案")
            current_metrics = self.metrics(c["equipment_id"], c["baseline_start"], c["baseline_end"], source=c.get('fact_source'))
            if c.get("detection") and current_metrics["status"] != "valid":
                if proposal.get("action_category") not in ("inspection", "data_verification") or proposal.get("acknowledged_data_limits") is not True:
                    raise ValidationError("缺数案例只允许明确 acknowledged_data_limits=true 的 inspection/data_verification 提案")
            current_hash = current_metrics["snapshot_hash"]
            analyses = self._rows("analyses", "case_id=?", (case_id,))
            valid = [a for a in analyses if a.get("analysis_cycle") == c.get("analysis_cycle") and a["baseline_snapshot_hash"] == current_hash]
            roles = required_roles(c, current_hash)
            if not roles or (c.get('analysis_plan') or {}).get('route') in ('loss','field','process_followup') or not set(roles).issubset({a["kind"] for a in valid}):
                raise ConflictError("分析依据已变更，需重新核验后决策")
            c.update(state="WAITING_ACTION", approved_proposal=proposal, approved_proposal_hash=_hash(proposal),
                     approved_by=actor["id"], approved_at=_now(), approved_metrics_hash=current_hash, version=c["version"]+1)
            saved = self._put("cases", c)
            self._audit("cases", case_id, "approve_proposal", actor, {"proposal": proposal, "proposal_hash": _hash(proposal)})
            return saved
        return self._write("approve_proposal", actor, {"case_id": case_id, "proposal": proposal}, idempotency_key, action)

    def create_work_order(self, case_id, proposal, actor, idempotency_key):
        if not idempotency_key:
            raise ValidationError("创建工单必须提供幂等键")
        case = self._load("cases", case_id)
        self._guard(actor, case, ("maintenance_coordinator",))
        def action():
            c = self._load("cases", case_id)
            if c["state"] != "WAITING_ACTION" or _hash(proposal) != c.get("approved_proposal_hash"):
                raise TransitionError("提案未批准、内容已变更或主任务状态不允许建单")
            current_hash = self.metrics(c["equipment_id"], c["baseline_start"], c["baseline_end"], source=c.get('fact_source'))["snapshot_hash"]
            if current_hash != c.get("approved_metrics_hash"):
                raise ConflictError("批准后业务依据发生修订，需重新分析和批准")
            if any(w["state"] not in ("COMPLETED", "CANCELLED") for w in self._rows("work_orders", "case_id=?", (case_id,))):
                raise ConflictError("此异常已有在途工单，不能重复创建")
            number = self.conn.execute("SELECT COUNT(*) FROM work_orders").fetchone()[0]+1
            order = {"id": f"WO-{number:03d}", "project_id": c["project_id"], "equipment_id": c["equipment_id"],
                     "case_id": case_id, "state": "ISSUED", "title": proposal["title"], "description": proposal["description"],
                     "assignee_id": proposal["assignee_id"], "owner_id": c["owner_id"], "acceptor_id": c["acceptor_id"],
                     "proposal": proposal, "proposal_hash": _hash(proposal), "approval_actor": c["approved_by"],
                     "synthetic": bool(c.get("synthetic")), "version": 1}
            saved = self._put("work_orders", order)
            self._audit("work_orders", order["id"], "create_issued", actor, {"case_id": case_id, "proposal_hash": order["proposal_hash"], "idempotency_key": idempotency_key})
            return saved
        return self._write("create_work_order", actor, {"case_id": case_id, "proposal": proposal}, idempotency_key, action)

    def transition_work_order(self, work_order_id, target, actor, evidence=None, idempotency_key=None):
        order = self._load("work_orders", work_order_id)
        self._guard(actor, order)
        evidence = _evidence(evidence)
        roles = {("ISSUED", "ACCEPTED"): "technician", ("ACCEPTED", "IN_PROGRESS"): "technician",
                 ("IN_PROGRESS", "WAITING_TECH_REVIEW"): "technician",
                 ("WAITING_TECH_REVIEW", "IN_PROGRESS"): "technical_reviewer",
                 ("WAITING_TECH_REVIEW", "WAITING_ACCEPTANCE"): "technical_reviewer",
                 ("WAITING_ACCEPTANCE", "IN_PROGRESS"): "acceptor", ("WAITING_ACCEPTANCE", "COMPLETED"): "acceptor",
                 ("ISSUED", "CANCELLED"): "business_owner", ("ACCEPTED", "CANCELLED"): "business_owner"}
        def action():
            w = self._load("work_orders", work_order_id)
            c = self._load("cases", w["case_id"])
            old = w["state"]
            role = roles.get((old, target))
            if not role:
                raise TransitionError(f"工单不允许 {old}→{target}")
            assigned = {"technician": "assignee_id", "acceptor": "acceptor_id", "business_owner": "owner_id"}.get(role)
            self._guard(actor, w, (role,), assigned=assigned)
            if target in ("WAITING_TECH_REVIEW", "WAITING_ACCEPTANCE", "COMPLETED"):
                if not evidence.get("evidence_refs"):
                    raise ValidationError("完工、复核与验收必须提供 evidence_refs")
            if target == "COMPLETED":
                if evidence.get("accepted") is not True:
                    raise ValidationError("最终验收必须明确 accepted=true")
                if not c.get("observation_plan"):
                    raise ValidationError("未配置恢复观察计划")
            w.update(state=target, version=w["version"]+1, last_evidence=evidence)
            if target == "ACCEPTED":
                w["accepted_by"] = actor["id"]
            if target == "COMPLETED":
                w["acceptance_by"] = actor["id"]
            saved = self._put("work_orders", w)
            old_case = c["state"]
            mapping = {"ACCEPTED": "IN_PROGRESS", "WAITING_ACCEPTANCE": "WAITING_ACCEPTANCE", "COMPLETED": "OBSERVING"}
            if target == "IN_PROGRESS" and old == "WAITING_ACCEPTANCE":
                mapping[target] = "IN_PROGRESS"
            if target in mapping:
                c.update(state=mapping[target], version=c["version"]+1)
                self._put("cases", c)
                self._audit("cases", c["id"], "work_order_receipt", actor, {"from": old_case, "to": c["state"], "work_order_id": w["id"], "evidence": evidence})
            self._audit("work_orders", w["id"], "transition", actor, {"from": old, "to": target, "evidence": evidence})
            return saved
        return self._write("transition_work_order", actor, {"work_order_id": work_order_id, "target": target, "evidence": evidence}, idempotency_key, action)

    def evaluate_observation(self, case_id, actor, *, idempotency_key=None, as_of=None):
        case = self._load("cases", case_id)
        self._guard(actor, case, ("operations_employee", "business_owner", "acceptor"))
        def action():
            c = self._load("cases", case_id)
            if c["state"] != "OBSERVING":
                raise TransitionError("只有观察中的任务可核验恢复数据")
            if not c.get("observation_plan") or not c.get("observation_start") or not c.get("observation_end"):
                raise ValidationError("必须先显式配置恢复观察窗口与验收计划")
            now = _timestamp(as_of) if as_of else datetime.now(timezone.utc).timestamp()
            if now < _timestamp(c["observation_end"]):
                raise ValidationError("观察窗口尚未结束，不能提前给出结果")
            baseline = self.metrics(c["equipment_id"], c["baseline_start"], c["baseline_end"], source=c.get('fact_source'))
            recovery = self.metrics(c["equipment_id"], c["observation_start"], c["observation_end"], source=c.get('fact_source'))
            reasons = []
            if baseline["status"] != "valid" or recovery["status"] != "valid":
                reasons.append("incomplete_or_invalid_metrics")
            if baseline["product_signatures"] != recovery["product_signatures"] or baseline["mixed_products"]:
                reasons.append("product_operation_or_cycle_not_comparable")
            if _timestamp(c["observation_start"]) < _timestamp(c["baseline_end"]):
                reasons.append("overlapping_comparison_windows")
            plan = c["observation_plan"]
            hourly = plan.get('comparison_basis') == 'per_run_hour'
            if hourly and (not baseline['production_shift'] or baseline['production_shift'] != recovery['production_shift']):
                reasons.append('shift_unknown_or_not_comparable')
            if any(m['T'] <= 0 or m['R'] <= 0 for m in (baseline, recovery)):
                reasons.append('no_planned_or_running_time')
            if hourly and any(m['T'] < plan['minimum_minutes'] for m in (baseline, recovery)):
                reasons.append('insufficient_planned_window')
            if not hourly and (recovery["T"] < plan["minimum_minutes"] or abs(recovery["T"]-baseline["T"]) > 1e-8):
                reasons.append("insufficient_or_unequal_planned_window")
            reduction = None
            duration = 'short_stop_minutes_per_run_hour' if hourly else 'short_stop_minutes'
            if not reasons and baseline[duration] and baseline[duration] > 0:
                reduction = 100*(baseline[duration]-recovery[duration])/baseline[duration]
                if reduction < plan["short_stop_reduction_pct"]:
                    reasons.append("short_stops_not_improved")
                if hourly and recovery['short_stops_per_run_hour'] > baseline['short_stops_per_run_hour'] + 1e-8:
                    reasons.append('short_stop_frequency_increased')
            elif not reasons:
                reasons.append("baseline_has_no_short_stops")
            if baseline["Q_pct"] is None or recovery["Q_pct"] is None:
                reasons.append("quality_unavailable")
            elif recovery["Q_pct"] < baseline["Q_pct"]-plan["quality_tolerance_pp"]:
                reasons.append("quality_below_agreed_tolerance")
            can_compare = not (set(reasons) - {'quality_below_agreed_tolerance', 'short_stops_not_improved', 'short_stop_frequency_increased'})
            obj = {"id": "OBS-"+uuid.uuid4().hex[:12], "project_id": c["project_id"], "equipment_id": c["equipment_id"],
                   "case_id": case_id, "baseline": baseline, "recovery": recovery, "passed": not reasons, "comparable": can_compare,
                   "reasons": reasons, "short_stop_reduction_pct": reduction, "plan": plan,
                   "synthetic": baseline["synthetic"] or recovery["synthetic"], "note": "数据比较通过不证明唯一根因，关闭仍需最终验收人决定"}
            saved = self._put("observations", obj)
            c["latest_observation_id"] = obj["id"]
            self._put("cases", c)
            self._audit("observations", obj["id"], "evaluate", actor, {"passed": obj["passed"], "reasons": reasons})
            return saved
        return self._write("evaluate_observation", actor, {"case_id": case_id, "as_of": as_of}, idempotency_key, action)

    def create_agent_run(self, case_id, actor, *, input_data=None, idempotency_key=None):
        c = self._load("cases", case_id)
        self._guard(actor, c, ("efficiency_advisor", "maintenance_advisor", "operations_employee", "maintenance_coordinator", "report_employee"))
        def action():
            obj = {"id": "AIRUN-"+uuid.uuid4().hex[:12], "project_id": c["project_id"], "equipment_id": c["equipment_id"],
                   "case_id": case_id, "actor_id": actor["id"], "role": actor["role"], "state": "QUEUED", "input": input_data or {}}
            saved = self._put("agent_runs", obj)
            self._audit("agent_runs", obj["id"], "create", actor, {"case_id": case_id})
            return saved
        return self._write("create_agent_run", actor, {"case_id": case_id, "input": input_data}, idempotency_key, action)

    def get_agent_run(self, run_id, actor=None):
        run = self._load("agent_runs", run_id)
        self._read_guard(actor, run)
        return run

    def transition_agent_run(self, run_id, target, actor, *, output=None, error=None, idempotency_key=None):
        r = self._load("agent_runs", run_id)
        self._guard(actor, r, (r["role"],), assigned="actor_id")
        allowed = {"QUEUED": {"RUNNING", "CANCELLED"}, "RUNNING": {"WAITING_TOOL", "WAITING_HUMAN", "BLOCKED", "SUCCEEDED", "FAILED", "TIMED_OUT", "CANCELLED"},
                   "WAITING_TOOL": {"RUNNING", "FAILED", "TIMED_OUT", "CANCELLED"}, "WAITING_HUMAN": {"RUNNING", "CANCELLED"},
                   "BLOCKED": {"RUNNING", "FAILED", "CANCELLED"}}
        def action():
            run = self._load("agent_runs", run_id)
            if target not in allowed.get(run["state"], set()):
                raise TransitionError("AI运行状态迁移不合法")
            if target == "SUCCEEDED" and output is None:
                raise ValidationError("成功运行必须保存实际输出或动作回执")
            if target in ("FAILED", "TIMED_OUT") and not error:
                raise ValidationError("失败或超时必须保存错误原因")
            old = run["state"]
            run.update(state=target, output=output, error=error)
            saved = self._put("agent_runs", run)
            self._audit("agent_runs", run_id, "transition", actor, {"from": old, "to": target})
            return saved
        return self._write("transition_agent_run", actor, {"run_id": run_id, "target": target, "output": output, "error": error}, idempotency_key, action)
