"""Daily equipment-management adapter with independently versioned source facts.

The bundled source is an explicit generated reference dataset. Source records
retain synthetic/provenance fields; ordinary business labels stay neutral.
No Node-RED process, telemetry polling, or physical-device connection is used.
"""
from __future__ import annotations
from copy import deepcopy
from datetime import date, datetime, timedelta, timezone
import hashlib
import json
import math
import os
import threading

from domain import PROJECT_ID, DEMO_ACTORS, ValidationError, ConflictError

SOURCE='equipment_management_system'
SHANGHAI=timezone(timedelta(hours=8),'Asia/Shanghai')
GENERATOR_VERSION='ems-reference-v1'
PROVENANCE={'source':SOURCE,'synthetic':True,'origin':'generated_reference_dataset',
            'generator_version':GENERATOR_VERSION,'physical_devices_connected':False,
            'external_customer_system_connected':False,
            'note':'项目内置设备管理系统适配源；记录由确定性生成规则提供，未连接客户实体设备或外部生产系统。原始来源与生成标记保留供审计。'}


def now(): return datetime.now(timezone.utc)
def stamp(value): return datetime.fromisoformat(value.replace('Z','+00:00'))
def encoded(value): return json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':'),allow_nan=False)
def hashed(value): return hashlib.sha256(encoded(value).encode()).hexdigest()
def enabled_environment(): return os.environ.get('FACTORY_EMS_ENABLED','0').lower() in ('1','true','yes','on')


def generate_day(business_date, devices):
    """Stable day/device IDs and values; rerunning never rewrites history."""
    day=date.fromisoformat(business_date) if isinstance(business_date,str) else business_date
    begin=datetime.combine(day,datetime.min.time(),SHANGHAI)+timedelta(hours=8)
    end=begin+timedelta(hours=8)
    batch_id='EMS-DAY-'+day.strftime('%Y%m%d')
    window={'start':begin.isoformat(),'end':end.isoformat(),'timezone':'Asia/Shanghai','business_date':day.isoformat(),'shift':'08:00–16:00'}
    payload={'id':batch_id,'batch_id':batch_id,'business_date':day.isoformat(),'source':SOURCE,'synthetic':True,
             'generator_version':GENERATOR_VERSION,'window':window,'devices':[],'events':[],'production':[],'provenance':PROVENANCE}
    for index,device in enumerate(sorted(devices,key=lambda item:item['id'])):
        equipment=device['id'];seed=int(hashlib.sha256((day.isoformat()+equipment).encode()).hexdigest()[:8],16)
        is_focus=equipment=='MC-07'
        short_count=7+seed%4 if is_focus else seed%3
        long_minutes=(14+seed%12) if equipment in ('MC-03','MC-10') else 4+seed%8
        stops=[]
        for n in range(short_count):
            at=40*60+n*int(360*60/max(1,short_count))+(seed%15)*10
            duration=35+(seed+n*13)%50
            stops.append((at,at+duration,'STOPPED','短暂停顿'))
        long_start=465*60 if equipment=='MC-03' else 420*60
        long_end=min(480*60,long_start+long_minutes*60)
        if equipment=='MC-03': long_end=480*60
        stops.append((long_start,long_end,'STOPPED','设备管理系统停机记录'))
        stops.sort()
        intervals=[];cursor=0
        for start,finish,state,reason in stops:
            if start>cursor: intervals.append((cursor,start,'RUNNING','生产运行'))
            intervals.append((start,finish,state,reason));cursor=finish
        if cursor<480*60: intervals.append((cursor,480*60,'RUNNING','生产运行'))
        common={'equipment_id':equipment,'source':SOURCE,'synthetic':True,'source_batch_id':batch_id,
                'source_system':'内置设备管理系统','provenance':PROVENANCE}
        for n,(start,finish,state,reason) in enumerate(intervals):
            payload['events'].append(dict(common,id=f'EMS-E-{day:%Y%m%d}-{equipment}-{n:02}',
                start=(begin+timedelta(seconds=start)).isoformat(),end=(begin+timedelta(seconds=finish)).isoformat(),
                state=state,quality='GOOD',reason=reason,source_event_id=f'{batch_id}/{equipment}/{n}'))
        short_minutes=sum((b-a)/60 for a,b,_,_ in stops if b-a<120)
        downtime=sum((b-a)/60 for a,b,_,_ in stops if b-a>=120)
        run_minutes=480-downtime
        speed=(.64+(seed%7)/100) if is_focus else (.86+(seed%9)/100)
        total=int(math.floor((run_minutes-short_minutes)*speed/.5))
        rejected=max(1,int(total*(.018+(seed%5)/1000)))
        payload['production'].append(dict(common,id=f'EMS-P-{day:%Y%m%d}-{equipment}',start=begin.isoformat(),end=end.isoformat(),
            product_id='EMS-PART-A',operation_id='MACHINING',cycle_version='ems-cycle-v1',ideal_cycle_minutes=.5,shift_code=window['shift'],
            planned_minutes=480,total_count=total,good_count=total-rejected,quality_final=True,data_coverage_pct=100,
            source_record_id=f'{batch_id}/{equipment}/production'))
        register={'equipment_id':equipment,'name':device.get('name',equipment+' 加工中心'),'model':'VMC-850' if index%3 else 'VMC-1160',
            'category':'立式加工中心','line_id':device.get('line_id','LINE-MCH-01'),'asset_number':'EMS-ASSET-'+equipment,
            'responsible_team':'机加工设备班','commissioned_on':f'{2020+index%4}-03-15','maintenance_interval_days':30,
            'source':SOURCE,'synthetic':True,'provenance':PROVENANCE}
        payload['devices'].append({'id':equipment,'state':intervals[-1][2],'source_timestamp':end.isoformat(),
                                  'source':SOURCE,'synthetic':True,'register':register,'window':window})
    payload['payload_sha256']=hashed(payload)
    return payload


class EquipmentSystemAdapter:
    def __init__(self,app,*,enabled=None,start_worker=True,clock=now):
        self.app=app;self.store=app.store;self.lock=app.lock;self.clock=clock
        self._metrics_revision=None
        self._daily_metrics={}
        self.enabled=enabled_environment() if enabled is None else bool(enabled)
        self.stop_event=threading.Event();self.thread=None
        saved=self.store._load('ems_sync_state','EMS-SYNC',False)
        self.data=saved or {'id':'EMS-SYNC','state':'disabled','last_sync_at':None,'last_checked_at':None,'latest_batch_id':None,'last_error':None,'receipt':None}
        self.data=dict(self.data,state='waiting' if self.enabled else 'disabled')
        if start_worker: self.start()

    def start(self):
        with self.lock:
            if self.enabled and self.thread is None and not self.stop_event.is_set():
                self.thread=threading.Thread(target=self._worker,name='factory-equipment-system-daily',daemon=True);self.thread.start()

    def close(self):
        self.stop_event.set()
        if self.thread:
            self.thread.join(20)
            if self.thread.is_alive(): raise RuntimeError('设备管理系统同步仍在执行，存储保持打开')

    def _save(self,table,value,operation):
        value=dict(value,project_id=PROJECT_ID)
        with self.store._transaction():
            saved=self.store._put(table,value)
            self.store._audit(table,value['id'],operation,DEMO_ACTORS['data_admin'],
                {'source':SOURCE,'synthetic':True,'provenance':PROVENANCE,'business_date':value.get('business_date'),
                 'payload_sha256':value.get('payload_sha256'),'state':value.get('state')})
        return saved

    def next_sync(self):
        current=self.clock().astimezone(SHANGHAI)
        due=current.replace(hour=8,minute=5,second=0,microsecond=0)
        if due<=current: due+=timedelta(days=1)
        return due.isoformat()

    def _worker(self):
        self.tick()
        while not self.stop_event.wait(30):
            self.tick()

    def tick(self):
        """Bootstrap promptly; thereafter only the persisted due time may sync."""
        if not self.enabled: return None
        due=self.data.get('next_sync_at')
        if self.data['state']=='waiting' or not due or stamp(due)<=self.clock(): return self.sync()
        return None

    def _import_day(self,day):
        batch_id='EMS-DAY-'+day.strftime('%Y%m%d')
        batch=self.store._load('ems_batches',batch_id,False)
        if batch and batch.get('state')=='ready': return batch,False
        if not batch:
            payload=generate_day(day,self.store.list_devices())
            batch=self._save('ems_batches',dict(payload,state='pending',generated_at=self.clock().isoformat()),'prepare_daily_snapshot')
        # A persisted complete payload bridges interruption between the two
        # independent domain imports; original daily data is never regenerated.
        self.store._import('ems_state_events',batch['events'],DEMO_ACTORS['data_admin'],'ems-events-'+batch_id,False)
        self.store._import('ems_production_records',batch['production'],DEMO_ACTORS['data_admin'],'ems-production-'+batch_id,False)
        batch=dict(batch,state='ready',imported_at=self.clock().isoformat())
        batch=self._save('ems_batches',batch,'confirm_daily_snapshot')
        return batch,True

    def sync(self):
        with self.lock:
            if not self.enabled: return self.status()
            self.data.update(state='syncing',last_checked_at=self.clock().isoformat(),last_error=None)
            created=[]
            try:
                last=self.clock().astimezone(SHANGHAI).date()-timedelta(days=1)
                target=[last-timedelta(days=offset) for offset in range(6,-1,-1)]
                for day in target:
                    batch,new=self._import_day(day)
                    if new: created.append(batch['id'])
                latest=batch
                detected=self.store.detect_short_stops('MC-07',latest['window']['start'],latest['window']['end'],DEMO_ACTORS['operations_employee'],
                    owner_id=DEMO_ACTORS['business_owner']['id'],acceptor_id=DEMO_ACTORS['acceptor']['id'],
                    idempotency_key='ems-detect-'+latest['id'],as_of=self.clock().isoformat(),source=SOURCE)
                receipt={'source':SOURCE,'synthetic':True,'provenance':PROVENANCE,'new_batches':created,'new_records':sum(len(self.store._load('ems_batches',bid)['events'])+len(self.store._load('ems_batches',bid)['production']) for bid in created),
                         'days':len(target),'equipment_count':len(latest['devices']),'latest_batch_id':latest['id'],'detected_case_id':detected.get('case_id'),
                         'persisted':True,'read_back':True,'at':self.clock().isoformat()}
                self.data.update(state='ready',last_sync_at=self.clock().isoformat(),latest_batch_id=latest['id'],last_error=None,
                                 next_sync_at=self.next_sync(),receipt=receipt,detected_case_id=detected.get('case_id'))
            except Exception as error:
                self.data.update(state='error',last_error=str(error),next_sync_at=(self.clock()+timedelta(minutes=5)).isoformat())
            self.data=self._save('ems_sync_state',self.data,'sync_result')
            return self.status()

    def batches(self):
        return sorted([b for b in self.store._rows('ems_batches') if b.get('state')=='ready'],key=lambda b:b['business_date'])

    def _recent_batches(self):
        # EMS-DAY-YYYYMMDD keys sort chronologically. Published reports need
        # batch metadata and the register, not the original import payload.
        rows=self.store.conn.execute("""SELECT json_remove(data,'$.events','$.production')
            FROM ems_batches WHERE project_id=? AND state='ready' ORDER BY id DESC LIMIT 7""",(PROJECT_ID,))
        return [json.loads(row[0]) for row in rows][::-1]

    def status(self,*,include_metrics=True):
        with self.lock:
            batches=self._recent_batches()
            latest=batches[-1] if batches else None
            public=lambda batch:{k:batch.get(k) for k in ('batch_id','business_date','window','generated_at','imported_at','payload_sha256')}
            result={**self.data,'enabled':self.enabled,'display_name':'设备管理系统','source':SOURCE,'synthetic':True,
                'cadence':'每日同步','cadence_seconds':86400,'timezone':'Asia/Shanghai','daily_sync_time':'08:05','provenance':PROVENANCE,
                'physical_devices_connected':False,'synced_at':self.data.get('last_sync_at'),'updated_at':self.data.get('last_sync_at'),
                'latest_batch':public(latest) if latest else None,'history':[public(b) for b in batches],
                'source_business_date':latest['business_date'] if latest else None,'next_sync_at':self.data.get('next_sync_at') or self.next_sync(),
                'timestamp_note':'08:00–16:00 完整班次日报；按自然日保留，非设备实时状态。',
                'data_fresh':bool(latest and latest['business_date']==(self.clock().astimezone(SHANGHAI).date()-timedelta(days=1)).isoformat()),
                'devices':latest.get('devices',[]) if latest else []}
            if include_metrics and batches:
                facts=self.metrics(batches)
                result.update(devices=facts['devices'],weekly=facts['weekly'],window=facts['window'],latest_window=facts['latest_window'],days=facts['days'])
            return result

    def metrics(self,batches=None):
        with self.lock:
            if batches is None: batches=self._recent_batches()
            days=[b['business_date'] for b in batches];latest=batches[-1] if batches else None
            assets=self.store.list_devices()
            # Only daily facts are cached. The factory store timestamps every
            # correction; orders and sync/freshness metadata are read on every request.
            revisions=self.store.conn.execute("""SELECT count(*),max(updated_at) FROM ems_production_records
                UNION ALL SELECT count(*),max(updated_at) FROM ems_state_events""").fetchall()
            revision=(tuple((b['id'],b['updated_at']) for b in batches),tuple(tuple(r) for r in revisions),
                      tuple((d['id'],d.get('minimum_coverage_pct'),d.get('short_stop_boundary_seconds')) for d in assets))
            if revision!=self._metrics_revision:
                self._daily_metrics={}
                self._metrics_revision=revision
            orders_by_device={}
            for order in self.store._rows('work_orders'):
                orders_by_device.setdefault(order['equipment_id'],[]).append(order)
            rows=[];devices=[]
            for device in assets:
                device_id=device['id']
                if device_id not in self._daily_metrics:
                    daily=[]
                    for batch in batches:
                        window=batch['window']
                        metric=self.store.metrics(device_id,window['start'],window['end'],source=SOURCE)
                        daily.append({'day':batch['business_date'],'device_id':device_id,'window':window,'metrics':self.app.metrics(metric)})
                    self._daily_metrics[device_id]=daily
                daily=deepcopy(self._daily_metrics[device_id])
                rows.extend(daily)
                snapshot=next((d for d in latest['devices'] if d['id']==device['id']),{}) if latest else {}
                orders=orders_by_device.get(device_id,[])
                summary={'total':len(orders),'open':sum(w['state'] not in ('COMPLETED','CANCELLED') for w in orders),
                         'completed':sum(w['state']=='COMPLETED' for w in orders),'basis':'current_business_records','as_of':self.clock().isoformat()}
                devices.append({**snapshot,'id':device['id'],'latest':daily[-1]['metrics'] if daily else None,
                                'metrics':daily[-1]['metrics'] if daily else None,'weekly':aggregate([d['metrics'] for d in daily]),
                                'daily':daily,'work_order_summary':summary})
            return {'source':SOURCE,'synthetic':True,'provenance':PROVENANCE,'updated_at':self.data.get('last_sync_at'),
                'window':{'start':batches[0]['window']['start'],'end':latest['window']['end'],'timezone':'Asia/Shanghai','windows':[b['window'] for b in batches]} if batches else None,
                'latest_window':latest['window'] if latest else None,'days':days,'devices':devices,'weekly':rows}


def aggregate(metrics):
    """Sum only the actual eight-hour windows; nights are not planned runtime."""
    if not metrics: return {'status':'incomplete','oee':None,'OEE_pct':None,'days':0,'source':SOURCE,'synthetic':True}
    valid=all(m['status']=='valid' for m in metrics)
    total=sum(m.get('T') or 0 for m in metrics);run=sum(m.get('R') or 0 for m in metrics)
    count=sum(m.get('N') or 0 for m in metrics);good=sum(m.get('G') or 0 for m in metrics)
    ideal_good=sum(m.get('ideal_good_minutes') or 0 for m in metrics)
    net=sum((m.get('ideal_cycle_seconds') or 0)/60*(m.get('N') or 0) for m in metrics)
    oee=100*ideal_good/total if valid and total else None
    return {'status':'valid' if valid else 'incomplete','days':len(metrics),'T':total,'R':run,'N':count,'G':good,'OEE_pct':oee,'oee':oee,
        'availability':100*run/total if valid and total else None,'performance':100*net/run if valid and run else None,
        'quality':100*ideal_good/net if valid and net else None,'count_quality':100*good/count if valid and count else None,
        'short_stop_count':sum(m.get('short_stop_count',0) for m in metrics),'short_stop_minutes':sum(m.get('short_stop_minutes',0) for m in metrics),
        'window_count':len(metrics),'planned_minutes':total,'source':SOURCE,'synthetic':True,
        'aggregation':'对实际班次计划时间与理想合格时间求和，不将班外空档计入分母。'}
