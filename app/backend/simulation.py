"""Bounded synthetic acquisition. Facts still enter through FactoryStore imports."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
import hashlib
import json
import sqlite3
import threading
import uuid

from domain import DEMO_ACTORS, ConflictError, DomainError, ValidationError

SCENARIOS = {'normal':'正常运行', 'short_stops':'反复短停（MC-07）', 'recovery':'恢复观察', 'data_gap':'采集缺口（MC-07/12）'}
SOURCE = 'factory_simulator'
CADENCE = 5
BUCKET = 60
DETECTION_MINUTES = 30


def encoded(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'), allow_nan=False)


def iso(value):
    return value.astimezone(timezone.utc).isoformat()


def instant(value):
    return datetime.fromisoformat(value.replace('Z', '+00:00'))


def floor_minute(value):
    return value.astimezone(timezone.utc).replace(second=0, microsecond=0)


def ceil_minute(value):
    lower = floor_minute(value)
    return lower if value == lower else lower+timedelta(minutes=1)


class FactorySimulator:
    def __init__(self, store, *, clock=None, start_worker=True, initial_backfill_minutes=30):
        self.store = store
        self.clock = clock or (lambda: datetime.now(timezone.utc))
        self.backfill = max(0, min(30, int(initial_backfill_minutes)))
        self.lock = threading.RLock()
        self.stop_event = threading.Event()
        self.thread = None
        self.conn = sqlite3.connect(store.db_path, timeout=20, check_same_thread=False, isolation_level=None)
        self.conn.executescript('''CREATE TABLE IF NOT EXISTS factory_simulation_state(id INTEGER PRIMARY KEY, data TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS factory_simulation_controls(key TEXT PRIMARY KEY, fingerprint TEXT NOT NULL);''')
        row = self.conn.execute('SELECT data FROM factory_simulation_state WHERE id=1').fetchone()
        self.data = json.loads(row[0]) if row else self._initial()
        if row and self.data['state'] == 'running':
            self.data.update(state='paused', pending_scenario=None, message='服务重启，模拟采集已暂停；历史记录保留，恢复不会补造暂停期间数据。')
            self._save()
        if start_worker:
            self.thread = threading.Thread(target=self._worker, name='factory-synthetic-source', daemon=True)
            self.thread.start()

    def _initial(self):
        return {'state':'stopped', 'run_id':None, 'scenario':'short_stops', 'pending_scenario':None,
                'started_at':None, 'last_tick_at':None, 'last_data_at':None, 'expires_at':None,
                'backfill_minutes':0, 'generated_events':0, 'generated_production':0,
                'detected_case_id':None, 'window_start':None, 'window_end':None,
                'message':'模拟采集尚未启动；这是合成数据源，不连接现场设备。',
                'ever_started':False, 'cursor':None, 'segment_start':None,
                'episode':0, 'episode_start':None, 'episode_detected':False, 'pending_bucket':None}

    def _save(self):
        self.conn.execute('INSERT INTO factory_simulation_state VALUES(1,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data', (encoded(self.data),))

    def _worker(self):
        while not self.stop_event.wait(CADENCE):
            try:
                self.tick()
            except Exception as error:
                with self.lock:
                    self.data.update(state='error', message='模拟采集已停止：'+(str(error) if isinstance(error, DomainError) else type(error).__name__))
                    self._save()

    def close(self):
        self.stop_event.set()
        if self.thread:
            self.thread.join(timeout=10)
            if self.thread.is_alive():
                raise RuntimeError('模拟采集线程尚未退出，数据库保持打开')
        self.conn.close()

    def _devices(self):
        return [d for d in self.store.list_devices() if d['id'] in {f'MC-{i:02d}' for i in range(1, 13)}]

    def _state_at(self, device_id, scenario, when):
        if (scenario == 'short_stops' and device_id == 'MC-12') or (scenario == 'data_gap' and device_id in ('MC-07','MC-12')):
            return 'OFFLINE'
        second = when.second
        if device_id == 'MC-07' and scenario == 'short_stops' and (12 <= second < 24 or 36 <= second < 48):
            return 'STOPPED'
        if device_id == 'MC-07' and scenario == 'recovery' and when.minute % 10 == 0 and 24 <= second < 30:
            return 'STOPPED'
        return 'RUNNING'

    def status(self):
        with self.lock:
            now = self.clock()
            fields = ('state','run_id','scenario','pending_scenario','started_at','last_tick_at','last_data_at','expires_at',
                      'backfill_minutes','generated_events','generated_production','detected_case_id','window_start','window_end','message','episode')
            result = {k:self.data.get(k) for k in fields}
            last = self.data.get('last_tick_at')
            fresh = self.data['state'] == 'running' and last and 0 <= (now-instant(last)).total_seconds() <= 15
            result.update(scenario_label=SCENARIOS[self.data['scenario']], cadence_seconds=CADENCE, bucket_seconds=BUCKET,
                          synthetic=True, source=SOURCE, telemetry_connected=False,
                          detection_window_minutes=DETECTION_MINUTES, heartbeat_fresh=bool(fresh),
                          pending_scenario_effective_at=self.data.get('pending_scenario_at'))
            result['devices'] = [{'id':d['id'], 'state':self._state_at(d['id'],self.data['scenario'],instant(last)) if fresh else 'UNKNOWN',
                                  'last_seen_at':last, 'source':SOURCE, 'synthetic':True} for d in self._devices()]
            return result

    def control(self, action, *, scenario=None, duration_minutes=60, idempotency_key=None):
        if action not in ('start','pause'):
            raise ValidationError('模拟采集 action 必须为 start 或 pause')
        if scenario is not None and scenario not in SCENARIOS:
            raise ValidationError('不支持的模拟场景')
        if isinstance(duration_minutes,bool) or not isinstance(duration_minutes,int) or not 1 <= duration_minutes <= 60:
            raise ValidationError('模拟持续时间必须是 1 至 60 分钟的整数')
        if not isinstance(idempotency_key,str) or not idempotency_key.strip() or len(idempotency_key)>200:
            raise ValidationError('模拟控制必须提供 1–200 字符的幂等键')
        fingerprint = hashlib.sha256(encoded({'action':action,'scenario':scenario,'duration_minutes':duration_minutes}).encode()).hexdigest()
        with self.lock:
            prior = self.conn.execute('SELECT fingerprint FROM factory_simulation_controls WHERE key=?',(idempotency_key,)).fetchone()
            if prior:
                if prior[0] != fingerprint:
                    raise ConflictError('同一模拟控制幂等键对应不同内容')
                return self.status()
            now = self.clock()
            if action == 'pause':
                # Discard the still-open bucket. Completed buckets are collected
                # only up to this pause instant, never across the following gap.
                self.tick(now)
                self.data.update(state='paused', pending_scenario=None, message='模拟采集已暂停；暂停期间不生成数据，也不在恢复时补造生产。')
            elif self.data['state'] == 'running':
                wanted = scenario or self.data['scenario']
                if wanted != self.data['scenario']:
                    self.data.update(pending_scenario=wanted, pending_scenario_at=iso(ceil_minute(now)),
                                     message='场景切换已排队，将在下个完整分钟桶边界生效；既有桶不改写。')
                elif self.data.get('pending_scenario'):
                    self.data.update(pending_scenario=None, pending_scenario_at=None, message='已保留当前场景，运行截止时间不变。')
            else:
                # A crash may have committed events but not production. Complete
                # only that already-closed, explicitly journaled old bucket.
                if self.data.get('pending_bucket'):
                    self._commit_bucket(self.data['pending_bucket'])
                # A completed 30th bucket can be durable even if detection was
                # interrupted before its receipt was saved. Finish that old
                # episode before a new run replaces its window metadata.
                if self.data.get('last_data_at') and self.data.get('episode_start'):
                    self._maybe_detect(instant(self.data['last_data_at']))
                first = not self.data.get('ever_started')
                wanted = scenario or self.data['scenario']
                self.data.update(state='running', run_id='SIMRUN-'+uuid.uuid4().hex[:12], scenario=wanted, pending_scenario=None,
                                 pending_scenario_at=None, started_at=iso(now), last_tick_at=iso(now),
                                 expires_at=iso(now+timedelta(minutes=duration_minutes)), cursor=iso(ceil_minute(now)),
                                 segment_start=iso(ceil_minute(now)), episode=self.data.get('episode',0)+1,
                                 episode_start=iso(ceil_minute(now)), episode_detected=False, detected_case_id=None,
                                 ever_started=True, backfill_minutes=0, message='持续模拟采集运行中；所有记录均标记为合成数据，非现场采集。')
                self._save()
                if first and self.backfill:
                    end = floor_minute(now)
                    begin = self._safe_backfill_start(end-timedelta(minutes=self.backfill),end)
                    minutes = int((end-begin).total_seconds()/60)
                    self.data.update(backfill_minutes=minutes, segment_start=iso(begin), episode_start=iso(begin))
                    if minutes < self.backfill:
                        self.data['message'] = f'已有记录限制回填：仅回填 {minutes} 分钟，未覆盖旧记录。后续按完整分钟模拟。'
                    self._save()
                    for i in range(minutes):
                        self._commit_bucket(self._bucket(begin+timedelta(minutes=i),backfill=True))
                    # Live collection begins only at the next full minute.
                    self.data['cursor'] = iso(ceil_minute(now))
            self._save()
            self.conn.execute('INSERT INTO factory_simulation_controls VALUES(?,?)',(idempotency_key,fingerprint))
            return self.status()

    def _existing(self, start, end):
        ids = [d['id'] for d in self._devices()]
        if not ids: raise ValidationError('没有可用于模拟的现有设备台账')
        placeholders = ','.join('?' for _ in ids)
        result = []
        for table in ('state_events','production_records'):
            result.extend((table,row) for row in self.store._rows(table, f'equipment_id IN ({placeholders}) AND start_ts<? AND end_ts>?', (*ids,end.timestamp(),start.timestamp())))
        return result

    def _safe_backfill_start(self, start, end):
        rows = self._existing(start,end)
        return min(end,max([start]+[ceil_minute(instant(row['end'])) for _,row in rows]))

    def _bucket(self, start, *, backfill=False):
        return {'start':iso(start),'end':iso(start+timedelta(minutes=1)), 'scenario':self.data['scenario'],
                'run_id':self.data['run_id'],'episode':self.data['episode'],'backfill':backfill}

    def _rows_for_bucket(self, bucket):
        start,end = instant(bucket['start']),instant(bucket['end'])
        scenario = bucket['scenario']
        events, production = [],[]
        stamp = start.strftime('%Y%m%dT%H%M')
        for device in self._devices():
            device_id = device['id']
            common = {'equipment_id':device_id,'source':SOURCE,'synthetic':True,'simulation_run_id':bucket['run_id'],
                      'simulation_episode':bucket['episode'],'backfill':bucket['backfill']}
            offline = self._state_at(device_id,scenario,start) == 'OFFLINE'
            if offline:
                spans = [(0,60,'OFFLINE')]; count = good = None
            elif device_id == 'MC-07' and scenario == 'short_stops':
                spans = [(0,12,'RUNNING'),(12,24,'STOPPED'),(24,36,'RUNNING'),(36,48,'STOPPED'),(48,60,'RUNNING')]; count = good = 1
            elif device_id == 'MC-07' and scenario == 'recovery' and start.minute % 10 == 0:
                spans = [(0,24,'RUNNING'),(24,30,'STOPPED'),(30,60,'RUNNING')]; count = good = 1
            else:
                spans = [(0,60,'RUNNING')]; count = good = 2
            base = bucket['run_id']+'-'+device_id+'-'+stamp
            for index,(left,right,state) in enumerate(spans):
                event_id = 'SE-'+base+'-'+str(index)
                events.append(dict(common,id=event_id,source_event_id=event_id,start=iso(start+timedelta(seconds=left)),
                                   end=iso(start+timedelta(seconds=right)),state=state,quality='BAD' if offline else 'GOOD'))
            production.append(dict(common,id='SP-'+base,start=iso(start),end=iso(end),product_id='SIM-PART-A',operation_id='SIM-MACHINING',
                                   cycle_version='SIM-CYCLE-V1',ideal_cycle_minutes=.5,planned_minutes=1,total_count=count,good_count=good,
                                   quality_final=not offline,data_coverage_pct=0 if offline else 100))
        return events,production

    def _commit_bucket(self,bucket):
        events,production = self._rows_for_bucket(bucket)
        desired = {('state_events',r['id']):r for r in events}
        desired.update({('production_records',r['id']):r for r in production})
        begin,end = instant(bucket['start']),instant(bucket['end'])
        with self.store._lock:
            for table,row in self._existing(begin,end):
                normalized = {k:v for k,v in row.items() if k not in ('created_at','updated_at','project_id')}
                if desired.get((table,row['id'])) != normalized:
                    raise ConflictError(f'模拟窗口与已有记录冲突：{row["id"]}；已保留旧记录，未覆盖。')
            self.data['pending_bucket'] = bucket
            self._save()
            suffix = bucket['run_id']+'-'+begin.strftime('%Y%m%dT%H%M')
            self.store.import_events(events,DEMO_ACTORS['data_admin'],idempotency_key='sim-events-'+suffix)
            self.store.import_production_records(production,DEMO_ACTORS['data_admin'],idempotency_key='sim-production-'+suffix)
        previous_end = self.data.get('window_end')
        if previous_end != bucket['start']:
            self.data['segment_start'] = bucket['start']
            if not self.data['episode_detected']:
                self.data['episode_start'] = bucket['start']
        segment = instant(self.data['segment_start'])
        self.data.update(pending_bucket=None,last_data_at=bucket['end'],window_start=iso(max(segment,end-timedelta(minutes=30))),
                         window_end=bucket['end'],generated_events=self.data['generated_events']+len(events),
                         generated_production=self.data['generated_production']+len(production),cursor=bucket['end'])
        self._save()
        self._maybe_detect(end)

    def _maybe_detect(self,end):
        if self.data['scenario'] != 'short_stops' or self.data['episode_detected']:
            return
        begin = instant(self.data['episode_start'])
        finish = begin+timedelta(minutes=DETECTION_MINUTES)
        if end < finish: return
        result = self.store.detect_short_stops('MC-07',iso(begin),iso(finish),DEMO_ACTORS['operations_employee'],
                    owner_id=DEMO_ACTORS['business_owner']['id'],acceptor_id=DEMO_ACTORS['acceptor']['id'],
                    idempotency_key='sim-detect-'+self.data['run_id']+'-'+str(self.data['episode']),as_of=iso(end))
        self.data.update(episode_detected=True,detected_case_id=result.get('case_id'))
        self._save()

    def tick(self, now=None):
        with self.lock:
            now = now or self.clock()
            if self.data['state'] != 'running': return self.status()
            try:
                limit = min(now,instant(self.data['expires_at']))
                cursor = instant(self.data['cursor'])
                while cursor+timedelta(minutes=1) <= limit and not self.stop_event.is_set():
                    self._apply_pending(cursor)
                    self._commit_bucket(self._bucket(cursor))
                    cursor += timedelta(minutes=1)
                self._apply_pending(floor_minute(limit))
                self.data['last_tick_at'] = iso(now)
                if now >= instant(self.data['expires_at']):
                    self.data.update(state='paused',pending_scenario=None,message='已达到本次模拟时长上限，自动暂停；不会继续写入。')
                self._save()
            except DomainError as error:
                self.data.update(state='error',message=str(error));self._save()
            return self.status()

    def _apply_pending(self,boundary):
        if not self.data.get('pending_scenario') or boundary < instant(self.data['pending_scenario_at']): return
        self.data.update(scenario=self.data['pending_scenario'],pending_scenario=None,pending_scenario_at=None,
                         episode=self.data['episode']+1,episode_start=iso(boundary),episode_detected=False,
                         message='新场景已在完整分钟边界生效；既有事实和案例基线保持不变。')
        self._save()
