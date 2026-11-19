"""Read actual Node-RED HTTP snapshots; never generate device observations here."""
from __future__ import annotations
from datetime import date, datetime, timedelta, timezone
import json
import hashlib
import os
import sqlite3
import threading
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

from domain import DEMO_ACTORS, ConflictError, ValidationError

SOURCE = 'iot_node_red'
BUSINESS_TIMEZONE = timezone(timedelta(hours=8))


def now(): return datetime.now(timezone.utc)
def stamp(value): return datetime.fromisoformat(value.replace('Z','+00:00'))
def encoded(value): return json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':'),allow_nan=False)


class IoTConnector:
    def __init__(self, store, *, endpoint=None, token=None, start_worker=True, clock=now):
        self.store=store;self.clock=clock
        # Network/import serialization must never hold the UI snapshot lock.
        self.sync_lock=threading.RLock();self.lock=threading.RLock()
        self.stop_event=threading.Event();self.thread=None;self.closed=False
        self.endpoint=(endpoint if endpoint is not None else os.environ.get('FACTORY_IOT_URL','')).rstrip('/')
        self.token=token if token is not None else os.environ.get('FACTORY_IOT_READ_TOKEN','')
        if self.endpoint:
            parsed=urlsplit(self.endpoint)
            if parsed.scheme!='http' or parsed.hostname!='127.0.0.1' or not parsed.port or parsed.username or parsed.password or parsed.path or parsed.query or parsed.fragment:
                raise ValidationError('IoT连接器只允许受监督的本机平台端点')
        self.conn=sqlite3.connect(store.db_path,timeout=20,check_same_thread=False,isolation_level=None)
        self.conn.executescript('''CREATE TABLE IF NOT EXISTS factory_iot_state(id INTEGER PRIMARY KEY,data TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS factory_iot_batches(id TEXT PRIMARY KEY,sha256 TEXT NOT NULL,data TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS factory_iot_pending(
            id TEXT PRIMARY KEY,sha256 TEXT NOT NULL,content_hash TEXT NOT NULL,
            payload TEXT NOT NULL,created_at TEXT NOT NULL);''')
        row=self.conn.execute('SELECT data FROM factory_iot_state WHERE id=1').fetchone()
        self.data=json.loads(row[0]) if row else {'state':'not_configured','latest_batch':None,'synced_at':None,'last_checked_at':None,'last_error':None,'detected_case_id':None,'devices':[],'imported':{'events':0,'production':0}}
        self.data['state']='connecting' if self.endpoint and self.token else 'not_configured'
        self.data['pending_batches']=self.conn.execute('SELECT COUNT(*) FROM factory_iot_pending').fetchone()[0]
        if start_worker and self.endpoint and self.token:
            self.thread=threading.Thread(target=self._worker,name='factory-iot-sync',daemon=True);self.thread.start()

    def _save(self):
        with self.lock:
            data=encoded(self.data)
        self.conn.execute('INSERT INTO factory_iot_state VALUES(1,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',(data,))

    def _update(self, **values):
        with self.lock:
            self.data.update(values)

    def _pending_count(self):
        count=self.conn.execute('SELECT COUNT(*) FROM factory_iot_pending').fetchone()[0]
        self._update(pending_batches=count)

    def close(self):
        self.stop_event.set()
        if self.thread:
            self.thread.join(20)
            if self.thread.is_alive(): raise RuntimeError('IoT同步尚未结束，数据库保持打开')
        with self.sync_lock:
            if not self.closed:
                self.conn.close();self.closed=True

    def _worker(self):
        while not self.stop_event.is_set():
            self.sync()
            self.stop_event.wait(60)

    def _get(self,path):
        req=Request(self.endpoint+path,headers={'X-Factory-IoT-Token':self.token,'Accept':'application/json'})
        with urlopen(req,timeout=8) as res:
            raw=res.read(4*1024*1024+1)
            if len(raw)>4*1024*1024: raise ValidationError('IoT批次超过接入大小限制')
            return json.loads(raw)

    def status(self):
        with self.lock:
            result=json.loads(encoded(self.data))
        current=self.clock()
        checked=result.get('last_checked_at')
        batch=result.get('latest_batch') or {};window=batch.get('window') or {}
        produced=batch.get('produced_at')
        produced_at=stamp(produced) if produced else None
        expected_day=(produced_at.astimezone(BUSINESS_TIMEZONE).date()-timedelta(days=1)) if produced_at else None
        data_age=(current-produced_at).total_seconds() if produced_at else None
        source_day=None;fresh=False
        if window.get('start') and window.get('end'):
            start=stamp(window['start']);end=stamp(window['end'])
            source_day=window.get('business_date') or start.astimezone(BUSINESS_TIMEZONE).date().isoformat()
            # The platform cadence is anchored to source generation, not midnight
            # or receipt. A re-delivery cannot refresh an old source window.
            try:
                source_date=date.fromisoformat(source_day)
                fresh=(source_date==start.astimezone(BUSINESS_TIMEZONE).date()
                       and source_date==expected_day and produced_at is not None
                       and end<=produced_at<=current and 0<=data_age<=30*3600)
            except (ValueError,TypeError):
                fresh=False
            timestamp_note=f'{source_day} 营业日快照，默认每天一批；非当前设备实时状态'
        else:
            timestamp_note='尚无已确认的源营业日快照；非当前设备实时状态'
        result.update(platform='Node-RED',source=SOURCE,synthetic=True,physical_devices_connected=False,
                      cadence_seconds=86400,sync_interval_seconds=60,enabled=bool(self.endpoint and self.token),
                      connection_verified=result['state']=='connected' and bool(checked) and 0<=(current-stamp(checked)).total_seconds()<150,
                      data_fresh=fresh,source_business_date=source_day,expected_business_date=expected_day.isoformat() if expected_day else None,
                      data_age_seconds=data_age,freshness_max_age_seconds=30*3600,
                      freshness_basis='源营业日须为生成日（上海时区）的前一日，且生成时间距今不超过30小时；接收时间不刷新数据',
                      next_batch_expected_at=(stamp(produced)+timedelta(days=1)).isoformat() if produced else None,
                      next_batch_expected_note='按源生成时间加24小时估算；以平台调度为准，过期时间不自动顺延',
                      next_check_at=(stamp(checked)+timedelta(seconds=60)).isoformat() if checked else None,
                      timestamp_note=timestamp_note)
        return result

    def _validate(self,p):
        if not isinstance(p,dict) or p.get('schema_version')!=1 or p.get('source')!=SOURCE or p.get('synthetic') is not True or p.get('platform')!='node-red':
            raise ValidationError('IoT平台来源或协议版本不匹配')
        for key in ('batch_id','packet_id','payload_sha256','produced_at','received_at'):
            if not isinstance(p.get(key),str) or not 1<=len(p[key])<=200: raise ValidationError('IoT批次缺少来源标识或时间')
        if len(p['payload_sha256'])!=64 or any(c not in '0123456789abcdef' for c in p['payload_sha256']): raise ValidationError('IoT批次摘要无效')
        window=p.get('window',{});a=stamp(window['start']);b=stamp(window['end'])
        if a.tzinfo is None or b.tzinfo is None or not a<b<=self.clock(): raise ValidationError('IoT快照必须为已结束的完整时间窗口')
        if window.get('timezone') not in (None,'Asia/Shanghai'):
            raise ValidationError('IoT营业日时区必须为Asia/Shanghai')
        if window.get('business_date') is not None and window['business_date']!=a.astimezone(BUSINESS_TIMEZONE).date().isoformat():
            raise ValidationError('IoT营业日与源窗口开始日期不匹配')
        for key in ('produced_at','received_at'):
            if stamp(p[key]).tzinfo is None or stamp(p[key])>self.clock()+timedelta(minutes=5):raise ValidationError('IoT平台时间无效')
        ids={d['id'] for d in self.store.list_devices()}
        if len(p.get('devices',[]))!=12 or {d.get('id') for d in p['devices']}!={f'MC-{i:02}' for i in range(1,13)}: raise ValidationError('IoT设备集合不完整')
        for d in p['devices']:
            if d['id'] not in ids or d.get('source')!=SOURCE or d.get('synthetic') is not True or d.get('state') not in ('RUNNING','STOPPED','OFFLINE','UNKNOWN'): raise ValidationError('IoT设备映射或状态无效')
            if stamp(d['source_timestamp'])!=b: raise ValidationError('IoT状态快照时间不匹配')
        for table in ('events','production'):
            rows=p.get(table)
            if not isinstance(rows,list) or not rows or len(rows)>3000:raise ValidationError('IoT事实列表为空或过大')
            if len({r.get('id') for r in rows})!=len(rows):raise ValidationError('IoT批次存在重复记录标识')
            for r in rows:
                if r.get('equipment_id') not in ids or r.get('source')!=SOURCE or r.get('synthetic') is not True or r.get('source_batch_id')!=p['batch_id'] or r.get('source_packet_id')!=p['packet_id']:
                    raise ValidationError('IoT记录来源或设备映射不匹配')
                if not a<=stamp(r['start'])<stamp(r['end'])<=b:raise ValidationError('IoT记录超出批次窗口')
        if {r['equipment_id'] for r in p['production']}!={d['id'] for d in p['devices']}:raise ValidationError('IoT生产记录缺少设备')

    def _import(self,p):
        self._validate(p)
        content_hash=hashlib.sha256(encoded({k:p[k] for k in ('batch_id','packet_id','produced_at','window','devices','events','production')}).encode()).hexdigest()
        old=self.conn.execute('SELECT sha256,data FROM factory_iot_batches WHERE id=?',(p['batch_id'],)).fetchone()
        if old:
            if old[0]!=p['payload_sha256']:raise ConflictError('同一IoT批次内容发生变化，已拒绝覆盖')
            receipt=json.loads(old[1])
            if receipt.get('content_hash')!=content_hash:raise ConflictError('IoT批次内容与已同步回执不一致')
            self.conn.execute('DELETE FROM factory_iot_pending WHERE id=?',(p['batch_id'],))
            self._pending_count()
            receipt['new_records']=0
            return receipt
        pending=self.conn.execute('SELECT sha256,content_hash FROM factory_iot_pending WHERE id=?',(p['batch_id'],)).fetchone()
        if pending and pending!=(p['payload_sha256'],content_hash):
            raise ConflictError('待恢复IoT批次内容发生变化，已拒绝覆盖')
        # Cross-source overlap is rejected before either import. A failed second
        # import can be safely retried with the same platform batch/record IDs.
        with self.store._lock:
            for key,table in (('events','state_events'),('production','production_records')):
                desired={r['id']:r for r in p[key]}
                for r in p[key]:
                    overlaps=self.store._rows(table,'equipment_id=? AND start_ts<? AND end_ts>?',(r['equipment_id'],stamp(r['end']).timestamp(),stamp(r['start']).timestamp()))
                    for item in overlaps:
                        normalized={k:v for k,v in item.items() if k not in ('project_id','created_at','updated_at')}
                        if item['id'] not in desired or normalized!=desired[item['id']]:
                            raise ConflictError('IoT时间窗口与既有记录冲突，原记录已保留')
            # Save the complete batch before the first domain mutation. The two
            # domain imports and detection have their own transactions; this
            # durable intent bridges them even if the platform advances a day.
            self.conn.execute('INSERT OR IGNORE INTO factory_iot_pending VALUES(?,?,?,?,?)',
                (p['batch_id'],p['payload_sha256'],content_hash,encoded(p),self.clock().isoformat()))
            self._pending_count()
            self.store.import_events(p['events'],DEMO_ACTORS['data_admin'],idempotency_key='iot-events-'+p['batch_id'])
            self.store.import_production_records(p['production'],DEMO_ACTORS['data_admin'],idempotency_key='iot-production-'+p['batch_id'])
            found=self.store.detect_short_stops('MC-07',p['window']['start'],p['window']['end'],DEMO_ACTORS['operations_employee'],
                owner_id=DEMO_ACTORS['business_owner']['id'],acceptor_id=DEMO_ACTORS['acceptor']['id'],idempotency_key='iot-detect-'+p['batch_id'])
        receipt={'batch_id':p['batch_id'],'payload_sha256':p['payload_sha256'],'content_hash':content_hash,'synced_at':self.clock().isoformat(),
                 'events':len(p['events']),'production':len(p['production']),'new_records':len(p['events'])+len(p['production']),
                 'detected_case_id':found.get('case_id'),'persisted':True}
        self.conn.execute('BEGIN IMMEDIATE')
        try:
            self.conn.execute('INSERT INTO factory_iot_batches VALUES(?,?,?)',(p['batch_id'],p['payload_sha256'],encoded(receipt)))
            self.conn.execute('DELETE FROM factory_iot_pending WHERE id=?',(p['batch_id'],))
            self.conn.execute('COMMIT')
        except Exception:
            self.conn.execute('ROLLBACK')
            raise
        self._pending_count()
        return receipt

    def _publish(self,p,receipt):
        # Recovery of an older pending batch must not move the display backward.
        with self.lock:
            latest=self.data.get('latest_batch') or {}
            latest_end=(latest.get('window') or {}).get('end')
            if latest_end and stamp(latest_end)>stamp(p['window']['end']):
                return
            self.data.update(synced_at=receipt['synced_at'],platform_version=p.get('platform_version'),
                latest_batch={k:p[k] for k in ('batch_id','packet_id','produced_at','received_at','payload_sha256','window')},
                devices=p['devices'],imported={'events':receipt['events'],'production':receipt['production']},
                receipt=receipt,detected_case_id=receipt['detected_case_id'])

    def _recover_pending(self):
        pending=self.conn.execute('SELECT payload FROM factory_iot_pending ORDER BY created_at,id').fetchall()
        for row in pending:
            p=json.loads(row[0]);receipt=self._import(p)
            self._publish(p,receipt)
            self._save()

    def sync(self):
        with self.sync_lock:
            if self.closed or not self.endpoint or not self.token:return self.status()
            try:
                # Recover local committed intent before relying on /snapshot,
                # which may already refer to a newer platform batch.
                self._recover_pending()
                health=self._get('/health')
                if health.get('ok') is not True or health.get('platform')!='node-red':raise ValidationError('IoT运行时身份未通过核验')
                p=self._get('/v1/snapshot');receipt=self._import(p)
                self._publish(p,receipt)
                self._update(state='connected',last_error=None,last_checked_at=self.clock().isoformat(),
                    accepted_http_requests=health.get('accepted_http_requests'),received_batches=health.get('received_batches'))
            except (HTTPError,URLError,TimeoutError,OSError) as error:
                self._update(state='unavailable',last_checked_at=self.clock().isoformat(),last_error='IoT平台暂不可达或尚无已接收快照；保留最后一次已同步记录')
            except Exception as error:
                self._update(state='error',last_checked_at=self.clock().isoformat(),last_error=str(error) if isinstance(error,(ValidationError,ConflictError)) else 'IoT数据校验或持久化未完成；待恢复批次已保留，不确认同步完成')
            self._save()
            return self.status()
