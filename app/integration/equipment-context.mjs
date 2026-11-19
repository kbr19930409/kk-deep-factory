const list=value=>Array.isArray(value)?value:[];
const escape=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const assetId=value=>value.equipment_id||value.asset_id||value.id;

/** Only explicit names in the user's new message can change its equipment scope. */
export function mentionedEquipment(message,assets){
  const text=String(message||'');
  return list(assets).filter(asset=>{
    const labels=[asset.id,asset.code].filter(Boolean);
    if(labels.some(label=>new RegExp(`(?:^|[^A-Za-z0-9])${escape(label)}(?![A-Za-z0-9])`,'i').test(text)))return true;
    const numeric=String(asset.code||asset.id||'').match(/^MC[- ]?(\d+)$/i)?.[1];
    if(!numeric)return false;
    const number=Number(numeric);
    if(new RegExp(`(?:^|[^A-Za-z0-9])MC[- ]?0*${number}(?![A-Za-z0-9])`,'i').test(text))return true;
    return new RegExp(`(?:^|[^A-Za-z0-9/.-])0*${number}(?=号|设备|机床|最近|近[一二三四五六七八九十0-9]|的|比|本周|上周|今天|昨天|\\s+[Oo][Ee][Ee])`).test(text);
  }).map(asset=>asset.id);
}

export function resolveMessageCase(message,selectedCaseId,snapshot){
  const ids=mentionedEquipment(message,snapshot.assets);
  if(ids.length!==1)return {case_id:selectedCaseId||null,equipment_ids:ids,explicit:ids.length>0};
  const available=list(snapshot.cases).filter(c=>assetId(c)===ids[0]&&!['CLOSED','DISMISSED','CANCELLED'].includes(String(c.state||c.status).toUpperCase()));
  available.sort((a,b)=>String(b.baseline_end||b.created_at||b.updated_at||b.id).localeCompare(String(a.baseline_end||a.created_at||a.updated_at||a.id)));
  return {case_id:available[0]?.id||null,equipment_ids:ids,explicit:true};
}

const fullMetrics=['equipment_id','start','end','status','issues','T','D','R','N','G','A_pct','P_pct','Q_pct','Q_time_weighted_pct','OEE_pct','oee','availability','performance','quality','count_quality','planned_minutes','window_count','aggregation','short_stop_count','short_stop_minutes','other_performance_loss_minutes','quality_loss_minutes','ideal_good_minutes','data_coverage_pct','mixed_products','product_signatures','synthetic','source','fact_source','mixed_provenance','snapshot_hash','windows','window','days','day','business_date'];
const dailyMetrics=['equipment_id','status','issues','OEE_pct','A_pct','P_pct','Q_pct','short_stop_count','short_stop_minutes','data_coverage_pct','synthetic'];
function metric(value,daily=false){
  if(!value||typeof value!=='object')return value??null;
  const out=Object.fromEntries((daily?dailyMetrics:fullMetrics).filter(k=>Object.hasOwn(value,k)).map(k=>[k,value[k]]));
  if(value.metrics)out.metrics=metric(value.metrics,daily);
  if(value.window)out.window=value.window;
  if(value.day)out.day=value.day;
  if(value.business_date)out.business_date=value.business_date;
  return out;
}

/** Compact, source-preserving comparison facts; never recalculate model metrics. */
export function projectEquipmentManagement(ems,equipmentIds=['*']){
  const allowed=id=>equipmentIds.includes('*')||equipmentIds.includes(id);
  const devices=list(ems?.devices).filter(d=>allowed(assetId(d))).map(d=>({id:assetId(d),name:d.name||d.register?.name,
    latest:metric(d.latest),weekly:metric(d.weekly),daily:list(d.daily).map(day=>metric(day,true)),
    register:d.register,work_order_summary:d.work_order_summary,source:d.source||ems?.source,synthetic:d.synthetic??ems?.synthetic}));
  return {available:devices.length>0,source:ems?.source||'equipment_management_system',synthetic:ems?.synthetic,
    physical_devices_connected:ems?.physical_devices_connected??ems?.provenance?.physical_devices_connected,provenance:ems?.provenance,window:ems?.window,latest_window:ems?.latest_window,
    updated_at:ems?.updated_at,timezone:ems?.timezone||'Asia/Shanghai',days:ems?.days,devices,
    comparison_note:'日指标按各自实际班次窗口；周指标由业务服务汇总已确认班次，不把班次之间空档计为停机。不同产品、工序、数据覆盖和质量结论须先核对。'};
}
