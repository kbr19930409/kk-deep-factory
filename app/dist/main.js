var cc={overview:"\u5DE5\u5382\u603B\u89C8",asset:"\u8BBE\u5907\u5DE5\u4F5C\u53F0",ai:"AI \u540C\u4E8B"};function Na(n){let e=String(n||"").replace(/^#/,"");return e==="tasks"?"ai":Object.hasOwn(cc,e)?e:"overview"}var om=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),dc={manager:{initial:"\u603B",name:"\u5DE5\u5382\u603B\u7BA1",color:"#315842"},efficiency_advisor:{initial:"\u635F",name:"\u751F\u4EA7\u635F\u5931\u5206\u6790\u5458",color:"#2158a5"},maintenance_advisor:{initial:"\u8BCA",name:"\u8BBE\u5907\u8BCA\u65AD\u5458",color:"#9a4b0b"},maintenance_coordinator:{initial:"\u8BA1",name:"\u7EF4\u4FEE\u8BA1\u5212\u5458",color:"#6a3aa3"},user:{initial:"\u4F60",name:"\u4F60",color:"#465c68"},system:{initial:"\u670D",name:"\u4E1A\u52A1\u670D\u52A1",color:"#58615c"}},oi=Object.fromEntries(Object.entries(dc).map(([n,e])=>[n,e.name]));function is(n,e=""){let t=Object.hasOwn(dc,n)?n:"system",i=dc[t];return`<span class="conversation-avatar avatar-${t}" data-chat-avatar="${t}" aria-hidden="true">${om(t==="system"&&e?Array.from(e)[0]:i.initial)}</span>`}function Ua(n="manager",e=null){let t=String(e?.asset_id||e?.equipment_id||"").trim(),i=t||"\u8BBE\u5907",s=[{label:"\u770B\u8FDB\u5C55",icon:"clock",text:t?`${i} \u73B0\u5728\u662F\u8C01\u5728\u5904\u7406\uFF0C\u4E0B\u4E00\u6B65\u9700\u8981\u6211\u505A\u4EC0\u4E48\uFF1F`:"\u73B0\u5728\u6709\u54EA\u4E9B\u4E8B\u9700\u8981\u6211\u786E\u8BA4\u6216\u8865\u5145\uFF1F"},{label:"\u5B89\u6392\u65E5\u62A5",icon:"calendar",text:"\u6BCF\u5929\u65E9\u4E0A 8 \u70B9 10 \u5206\uFF0C\u628A\u524D\u4E00\u5929\u7684\u8BBE\u5907\u8FD0\u884C\u60C5\u51B5\u53D1\u7ED9\u6211\u3002"}],r={manager:[{label:"\u67E5 OEE",icon:"chart",text:t?`\u5E2E\u6211\u5206\u6790 ${i} \u6700\u8FD1 OEE \u6BD4\u5176\u4ED6\u8BBE\u5907\u4F4E\u7684\u539F\u56E0\u3002`:"\u5E2E\u6211\u627E\u51FA\u6700\u8FD1 OEE \u8F83\u4F4E\u7684\u8BBE\u5907\uFF0C\u5E76\u4E0E\u5176\u4ED6\u8BBE\u5907\u6BD4\u8F83\u3002"},{label:"\u5B89\u6392\u5904\u7406",icon:"clipboard",text:t?`${i} \u53CD\u590D\u77ED\u505C\uFF0C\u5E2E\u6211\u67E5\u539F\u56E0\u5E76\u5B89\u6392\u5904\u7406\u3002`:"\u627E\u51FA\u53CD\u590D\u77ED\u505C\u7684\u8BBE\u5907\uFF0C\u5E2E\u6211\u67E5\u539F\u56E0\u5E76\u5B89\u6392\u5904\u7406\u3002"},...s],efficiency_advisor:[{label:"\u6BD4\u8F83 OEE",icon:"chart",text:`\u5E2E\u6211\u6BD4\u8F83${t?` ${i} \u4E0E\u5176\u4ED6\u8BBE\u5907`:"\u5404\u53F0\u8BBE\u5907"}\u6700\u8FD1\u7684 OEE\uFF0C\u627E\u51FA\u635F\u5931\u6700\u5927\u7684\u73AF\u8282\u3002`},{label:"\u7B97\u77ED\u505C\u635F\u5931",icon:"clock",text:`${i}\u7684\u53CD\u590D\u77ED\u505C\u9020\u6210\u4E86\u591A\u5C11\u751F\u4EA7\u635F\u5931\uFF1F\u8BF7\u8BF4\u660E\u4F9D\u636E\u3002`},{label:"\u8BB0\u4F4F\u504F\u597D",icon:"bookmark",text:"\u8BF7\u8BB0\u4F4F\uFF1A\u5206\u6790\u8BBE\u5907\u6548\u7387\u65F6\uFF0C\u5148\u8BF4\u7ED3\u8BBA\uFF0C\u518D\u5217\u6570\u636E\u4F9D\u636E\u3002"}],maintenance_advisor:[{label:"\u67E5\u53EF\u80FD\u539F\u56E0",icon:"inspect",text:`${i}\u53CD\u590D\u77ED\u505C\uFF0C\u53EF\u80FD\u662F\u4EC0\u4E48\u539F\u56E0\uFF1F\u73B0\u573A\u5148\u68C0\u67E5\u54EA\u91CC\uFF1F`},{label:"\u5217\u68C0\u67E5\u6E05\u5355",icon:"clipboard",text:`\u8BF7\u4E3A${i}\u6574\u7406\u73B0\u573A\u68C0\u67E5\u6E05\u5355\uFF0C\u8BF4\u660E\u9700\u8981\u54EA\u4E9B\u8BB0\u5F55\u3002`},{label:"\u8BB0\u4F4F\u504F\u597D",icon:"bookmark",text:"\u8BF7\u8BB0\u4F4F\uFF1A\u7EF4\u4FEE\u5EFA\u8BAE\u5148\u5199\u5B89\u5168\u68C0\u67E5\uFF0C\u518D\u5199\u6392\u67E5\u6B65\u9AA4\u3002"}],maintenance_coordinator:[{label:"\u6574\u7406\u65B9\u6848",icon:"file",text:`\u8BF7\u6839\u636E\u5DF2\u6709\u5206\u6790\uFF0C\u4E3A${i}\u6574\u7406\u73B0\u573A\u5904\u7406\u65B9\u6848\uFF0C\u7B49\u6211\u786E\u8BA4\u540E\u518D\u5EFA\u5DE5\u5355\u3002`},{label:"\u67E5\u5DE5\u5355\u8FDB\u5C55",icon:"clock",text:t?`\u8BF7\u67E5\u770B ${i} \u7684\u5DE5\u5355\u8FDB\u5C55\uFF0C\u544A\u8BC9\u6211\u73B0\u5728\u7B49\u8C01\u5904\u7406\u3002`:"\u8BF7\u67E5\u770B\u672A\u5173\u95ED\u7684\u5DE5\u5355\uFF0C\u544A\u8BC9\u6211\u73B0\u5728\u7B49\u8C01\u5904\u7406\u3002"},s[1]]};return r[n]||r.manager}function Ru(n,e=[]){let t=String(n??"");return t===""?e[0]?.text||"":!t.trim()||t!==t.trimStart()?"":e.find(i=>i.text.length>t.length&&i.text.startsWith(t))?.text||""}function Iu(n,e,t,i=!1){return n.key==="Tab"&&!n.shiftKey&&!n.ctrlKey&&!n.altKey&&!n.metaKey&&!n.repeat&&!n.isComposing&&n.keyCode!==229&&!i&&!e.disabled&&!!t&&(e.value===""||e.value.trim().length>0)&&t.startsWith(e.value)&&t!==e.value&&e.selectionStart===e.selectionEnd&&e.selectionEnd===e.value.length}var bs=n=>String(n||"").toUpperCase().replace(/[\s_-]/g,"");function Pu(n,e,t=[]){let i=e?.id||null,s=bs(e?.asset_id||e?.equipment_id);if(!i)return null;let r=String(n).match(/\b[A-Za-z]{1,6}[\s_-]?\d{1,4}\b/g)||[],a=new Set(r.map(bs)),o=String(n).trim().match(/^(?:设备\s*)?(\d{1,3})(?=\s|号|最近|近期|这|的|老是|总是|反复|又)/)?.[1];if(o){let c=t.filter(u=>String(u.id||u.code).match(/\d+$/)?.[0]?.replace(/^0+/,"")===o.replace(/^0+/,""));c.length===1&&a.add(bs(c[0].id||c[0].code))}return t.filter(c=>a.has(bs(c.id))||a.has(bs(c.code))).map(c=>bs(c.id||c.code)).some(c=>c!==s)?null:i}var Yt=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Oa=n=>n&&Number.isFinite(Date.parse(n))?new Date(n).toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}):"\u5C1A\u672A\u8BB0\u5F55";function hc(n){return!!(n?.latest_batch?.batch_id&&(n.last_sync_at||n.synced_at))}function lm(n){let e=Array.isArray(n?.days)?new Set(n.days.filter(Boolean)).size:null,t=Array.isArray(n?.devices)?new Set(n.devices.map(i=>i.id).filter(Boolean)).size:null;return e!==null&&t!==null?`\u5DF2\u540C\u6B65 ${e} \u65E5 \xB7 ${t} \u53F0\u8BBE\u5907`:""}var uc=n=>n==null||n===""||!Number.isFinite(Number(n))?null:Number(n);function Du(n={}){let e=(Array.isArray(n.daily_history)?n.daily_history:[]).filter(i=>i.device_id===n.id&&/^\d{4}-\d{2}-\d{2}$/.test(i.day||"")).sort((i,s)=>s.day.localeCompare(i.day)).slice(0,7),t=i=>uc(i)===null?"\u672A\u63D0\u4F9B":new Intl.NumberFormat("zh-CN",{maximumFractionDigits:0}).format(uc(i));return`<section id="ems-device-history" class="ems-history" aria-label="${Yt(n.id||"\u5F53\u524D\u8BBE\u5907")}\u8FD17\u65E5\u8BBE\u5907\u65E5\u62A5"><div class="section-heading"><h2>\u8FD1 7 \u65E5\u8BBE\u5907\u65E5\u62A5</h2><span>${Yt(n.id||"\u5F53\u524D\u8BBE\u5907")} \xB7 ${e.length?`\u5DF2\u540C\u6B65 ${e.length} \u65E5`:"\u7B49\u5F85\u65E5\u62A5"}</span></div>${e.length?`<table><colgroup><col style="width:31%"><col style="width:23%"><col style="width:23%"><col style="width:23%"></colgroup><thead><tr><th scope="col">\u65E5\u671F</th><th scope="col">OEE</th><th scope="col">\u77ED\u505C\u6B21\u6570</th><th scope="col">\u4EA7\u91CF</th></tr></thead><tbody>${e.map(i=>{let s=i.metrics||{},r=uc(s.OEE_pct??s.oee);return`<tr><th scope="row">${Yt(i.day)}</th><td>${r===null?"\u672A\u63D0\u4F9B":Yt(r.toFixed(1))+"%"}</td><td>${Yt(t(s.short_stop_count))}</td><td>${Yt(t(s.N??s.total_count))}</td></tr>`}).join("")}</tbody></table><p>\u6BCF\u65E5\u73ED\u6B21\u8BB0\u5F55\uFF0C\u4EE5\u5404\u65E5\u5B9E\u9645\u7A97\u53E3\u8BA1\u7B97\uFF1B\u672A\u63D0\u4F9B\u7684\u6570\u636E\u4E0D\u6309\u96F6\u8BA1\u7B97\u3002</p>`:"<p>\u5F53\u524D\u8BBE\u5907\u8FD8\u6CA1\u6709\u5DF2\u540C\u6B65\u7684\u65E5\u62A5\u3002\u6570\u636E\u63A5\u5165\u540E\u4F1A\u5728\u8FD9\u91CC\u663E\u793A\u3002</p>"}</section>`}function Lu(n,{busy:e=!1,error:t=null,detailsOpen:i=!1}={}){if(!n)return"";let s=hc(n),r=n.latest_batch||{},a=n.provenance||{},o=t?.message||t||n.last_error||n.error,l=lm(n),c={ready:"\u5DF2\u540C\u6B65",syncing:"\u6B63\u5728\u540C\u6B65",partial:"\u90E8\u5206\u8BB0\u5F55\u5F85\u8865\u9F50",error:"\u540C\u6B65\u9700\u8981\u5904\u7406",disabled:"\u63A5\u5165\u5DF2\u505C\u7528"}[n.state]||"\u7B49\u5F85\u540C\u6B65";return`<section id="ems-panel" class="ems-panel" aria-label="\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF\u540C\u6B65"><div class="section-heading"><div><h2>\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF</h2><p>\u6BCF\u65E5\u540C\u6B65\u8BBE\u5907\u53F0\u8D26\u3001\u8FD0\u884C\u8BB0\u5F55\u4E0E\u5DE5\u5355\u8FDB\u5C55\u3002${s&&l?`<span class="ems-coverage">${Yt(l)}</span>`:""}</p></div><span class="ems-status">${Yt(e?"\u6B63\u5728\u540C\u6B65":c)}</span><button type="button" class="button small" data-action="sync-ems" ${e||n.enabled===!1?"disabled":""}>${e?"\u6B63\u5728\u540C\u6B65\u2026":"\u68C0\u67E5\u66F4\u65B0"}</button></div><dl class="ems-facts"><div><dt>\u6570\u636E\u65E5\u671F</dt><dd>${Yt(s?r.business_date||"\u65E5\u671F\u89C1\u8BB0\u5F55":"\u7B49\u5F85\u9996\u6279\u8BB0\u5F55")}</dd></div><div><dt>\u6700\u8FD1\u540C\u6B65</dt><dd>${Yt(Oa(n.last_sync_at||n.synced_at))}</dd></div><div><dt>\u4E0B\u6B21\u540C\u6B65</dt><dd>${Yt(Oa(n.next_sync_at))}</dd></div></dl>${o?`<p class="ems-warning" role="status">${Yt(typeof o=="string"?o:"\u672C\u6B21\u540C\u6B65\u672A\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u66F4\u65B0\u3002")} \u5DF2\u663E\u793A\u7684\u8BB0\u5F55\u4FDD\u7559\u539F\u65F6\u95F4\u3002</p>`:""}<details class="ems-details" data-ems-detail ${i?"open":""}><summary>\u6570\u636E\u63A5\u5165\u8BE6\u60C5</summary><p>${Yt(a.note||"\u63A5\u5165\u6765\u6E90\u8BF4\u660E\u5C1A\u672A\u8FD4\u56DE\uFF0C\u8BF7\u67E5\u9605\u540C\u6B65\u8BB0\u5F55\u3002")}</p>${a.synthetic===!0?"<p>\u5F53\u524D\u4E3A\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF\u751F\u6210\u7684\u53C2\u8003\u6570\u636E\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u4E1A\u52A1\u6D41\u7A0B\u3002</p>":""}${a.physical_devices_connected===!1?"<p>\u5C1A\u672A\u8FDE\u63A5\u5DE5\u5382\u7269\u7406\u8BBE\u5907\uFF1B\u9875\u9762\u5C55\u793A\u6BCF\u65E5\u4E1A\u52A1\u8BB0\u5F55\uFF0C\u4E0D\u4EE3\u8868\u73B0\u573A\u5B9E\u65F6\u6D4B\u91CF\u3002</p>":""}<dl><div><dt>\u4E1A\u52A1\u7A97\u53E3\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09</dt><dd>${Yt(Oa(r.window?.start))} \u2014 ${Yt(Oa(r.window?.end))}</dd></div><div><dt>\u6279\u6B21\u7F16\u53F7</dt><dd>${Yt(r.batch_id||"\u5C1A\u672A\u53D6\u5F97")}</dd></div><div><dt>\u66F4\u65B0\u9891\u7387</dt><dd>\u6BCF\u65E5\u540C\u6B65</dd></div></dl><details><summary>\u540C\u6B65\u51ED\u636E\u4E0E\u6765\u6E90\u8BB0\u5F55</summary><pre>${Yt(JSON.stringify({receipt:n.receipt||null,provenance:a},null,2))}</pre></details></details></section>`}var ss=class extends Error{constructor(e,t=0,i=null,{transient:s=!1,outcomeUnknown:r=!1}={}){super(e),this.name="ApiError",this.status=t,this.detail=i,this.transient=s,this.outcomeUnknown=r}},cm=null;function fc(n,e,t=0,i=null){let s=n?e?"\u8BFB\u53D6\u8BB0\u5F55\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u65B0\u8BFB\u53D6\u3002":"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u8BB0\u5F55\uFF0C\u8BF7\u7A0D\u540E\u91CD\u65B0\u8BFB\u53D6\u3002":"\u6682\u672A\u6536\u5230\u63D0\u4EA4\u7ED3\u679C\uFF0C\u8BF7\u5148\u6838\u5BF9\u6700\u65B0\u529E\u7406\u8BB0\u5F55\u3002";return new ss(s,t,i,{transient:!0,outcomeUnknown:!n})}async function Nu(n,e,t){let{timeout:i=25e3,signal:s,...r}=e,a=new AbortController,o=setTimeout(()=>a.abort(),i);try{let l=await(cm||globalThis.__FACTORY_FETCH__||fetch)(n,{credentials:"same-origin",...r,headers:{Accept:"application/json",...r.body?{"Content-Type":"application/json"}:{},...r.headers},signal:s?AbortSignal.any([s,a.signal]):a.signal}),c=await l.text(),u;try{u=!c&&l.status===204?{}:JSON.parse(c)}catch{throw[408,502,503,504].includes(l.status)?fc(t,[408,504].includes(l.status),l.status):new ss("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BFB\u53D6\u7684\u7ED3\u679C\uFF0C\u8BF7\u6838\u5BF9\u6700\u65B0\u8BB0\u5F55\u3002",l.status,null,{outcomeUnknown:!t&&(l.ok||l.status>=500)})}if(!l.ok){let m=u?.detail||u?.error||u,h=typeof m=="string"?m:m?.message||u?.message||`\u8BF7\u6C42\u672A\u5B8C\u6210\uFF08${l.status}\uFF09`,d=l.status===400&&m?.code===23,_=l.status===400&&m?.code==="REQUEST_FAILED"&&h==="fetch failed";throw d||_||[408,502,503,504].includes(l.status)?fc(t,d||[408,504].includes(l.status),l.status,m):new ss(h,l.status,m,{outcomeUnknown:!t&&l.status>=500})}return u}catch(l){throw l instanceof ss?l:l?.beforeDispatch?new ss(l.message,l.status||0,null,{transient:!l.status||l.status===429}):fc(t,a.signal.aborted||l?.name==="AbortError"||l?.name==="TimeoutError")}finally{clearTimeout(o)}}async function Dt(n,e={}){let t=!e.method||e.method==="GET"||n==="/api/conversations/search";try{return await Nu(n,e,t)}catch(i){if(!t||!i.transient||e.signal?.aborted)throw i;return await new Promise(s=>setTimeout(s,750)),e.signal?.throwIfAborted(),Nu(n,e,t)}}var Pt=(n,e)=>Dt(n,{method:"POST",body:JSON.stringify(e)}),In=(n,e)=>n?.[e]??n?.data?.[e]??n?.data??n,pn=n=>Array.isArray(n)?n:[],li=n=>n==null||n===""?null:Number.isFinite(Number(n))?Number(n):null,_r=n=>String(n||"unknown").toLowerCase(),Fa=(n,e)=>li(n!==void 0?n:e),dm={production_record_gap:"\u751F\u4EA7\u8BB0\u5F55\u8986\u76D6\u4E0D\u8DB3",partial_aggregated_record:"\u7A97\u53E3\u5305\u542B\u4E0D\u5B8C\u6574\u7684\u6C47\u603B\u8BB0\u5F55",missing_plan:"\u7F3A\u5C11\u8BA1\u5212\u65F6\u95F4",missing_total_count:"\u7F3A\u5C11\u603B\u4EA7\u91CF",missing_final_quality:"\u7F3A\u5C11\u6700\u7EC8\u8D28\u91CF\u8BB0\u5F55",missing_cycle_or_product:"\u7F3A\u5C11\u8282\u62CD\u6216\u4EA7\u54C1\u5DE5\u5E8F",insufficient_state_coverage:"\u72B6\u6001\u6570\u636E\u8986\u76D6\u4E0D\u8DB3",unknown_state_or_bad_event:"\u5B58\u5728\u672A\u77E5\u72B6\u6001\u6216\u65E0\u6548\u4E8B\u4EF6",mixed_synthetic_and_real_facts:"\u793A\u4F8B\u4E0E\u771F\u5B9E\u6570\u636E\u6DF7\u7528",overlapping_stop_classification:"\u505C\u673A\u5206\u7C7B\u533A\u95F4\u91CD\u53E0",inconsistent_time_counts_or_cycle:"\u65F6\u95F4\u3001\u4EA7\u91CF\u4E0E\u8282\u62CD\u4E0D\u4E00\u81F4"},um={...oi,business_owner:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",acceptor:"\u73B0\u573A\u9A8C\u6536\u4EBA",technician:"\u7EF4\u4FEE\u6280\u5E08",technical_reviewer:"\u6280\u672F\u590D\u6838\u4EBA",operations_employee:"\u8FD0\u884C\u5DE1\u68C0\u5458",report_employee:"\u73ED\u62A5\u5458",data_admin:"\u6570\u636E\u7BA1\u7406\u5458"},Ou=new Map,ka=n=>Ou.get(n)||n;function Uu(n){let e=String(n.id??n.asset_id??n.code??"");return{...n,id:e,name:n.name||n.asset_name||e,code:n.code||e,type:n.type||n.asset_type||"machining_center",status:_r(n.status||n.operating_state||n.state),line:n.line_name||n.line||n.line_id||"\u673A\u52A0\u5DE5\u4E00\u7EBF",updated_at:["iot_node_red","equipment_management_system"].includes(n.source)?n.source_timestamp||n.last_seen_at||n.updated_at:n.source==="factory_simulator"?n.last_seen_at||n.updated_at||n.last_updated:n.updated_at||n.last_seen_at||n.last_updated,connection_status:_r(n.connection_status||n.connectivity||n.connection_state),owner:ka(n.owner_name||n.owner||n.responsible_person||"\u672A\u6307\u5B9A")}}function gr(n){return{...n,id:String(n.id??n.case_id??""),asset_id:String(n.asset_id??n.equipment_id??""),title:n.title||n.name||"\u8BBE\u5907\u5F02\u5E38",status:_r(n.status||n.stage||n.state),owner:ka(n.owner_name||n.owner||n.owner_id||"\u5F85\u5206\u914D"),acceptor:ka(n.acceptor_name||n.acceptor||n.acceptor_id||"\u5F85\u5206\u914D"),allowed_actions:pn(n.allowed_actions)}}function Ba(n){return{...n,id:String(n.id??n.work_order_id??""),title:n.title||n.summary||"\u7EF4\u4FEE\u5DE5\u5355",status:_r(n.status||n.state),assignee_name:ka(n.assignee_name||n.assignee||n.assignee_id||"\u5F85\u63A5\u5355"),allowed_actions:pn(n.allowed_actions)}}function hm(n={}){return{...n,window_label:n.start&&n.end?`${String(n.start).slice(0,10)} ${String(n.start).slice(11,16)}\u2013${String(n.start).slice(0,10)===String(n.end).slice(0,10)?"":String(n.end).slice(0,10)+" "}${String(n.end).slice(11,16)}`:n.window_label,oee:Fa(n.OEE_pct,n.oee),availability:Fa(n.A_pct,n.availability??n.a),performance:Fa(n.P_pct,n.performance??n.p),quality:Fa(n.Q_time_weighted_pct??n.Q_pct,n.quality??n.q),planned_minutes:li(n.planned_minutes??n.planned_time_minutes??n.T),run_minutes:li(n.run_minutes??n.runtime_minutes??n.operating_minutes??n.R),ideal_cycle_seconds:li(n.ideal_cycle_seconds??n.ideal_cycle_sec),total_count:li(n.total_count??n.total??n.N),good_count:li(n.good_count??n.good??n.G),short_stop_count:li(n.short_stop_count??n.stop_count),short_stop_minutes:li(n.short_stop_minutes??n.stop_minutes),quality_flags:pn(n.quality_flags??n.flags??n.missing_fields??n.issues).map(e=>dm[e]||e)}}var pt={async bootstrap(n){let e=In(await Dt("/api/bootstrap",{signal:n}),"bootstrap");Ou=new Map(pn(e.actors).map(s=>[s.id,um[s.role]||s.name||s.label||s.id]));let t=e.capabilities||{},i=t.ai_mode||e.ai?.mode||(t.ai_available?"connected":"unavailable");return{...e,factory_name:e.factory_name||e.project?.name,line_name:e.line_name||e.project?.line,assets:pn(e.assets).map(Uu),cases:pn(e.cases).map(gr),work_orders:pn(e.work_orders).map(Ba),jobs:pn(e.jobs).map(s=>({...s,question:s.question||s.input?.question,case_id:s.case_id||s.input?.case_id,asset_id:s.asset_id||s.input?.asset_id})),capabilities:{...t,ai_mode:i,ai_available:t.ai_available===!0||i==="connected"},data_source:typeof e.data_source=="string"?{mode:e.data_source,label:e.data_source}:e.data_source||{mode:"unknown",label:"\u6765\u6E90\u672A\u58F0\u660E"},kpis:e.kpis||{}}},async asset(n,e){let t=In(await Dt(`/api/assets/${encodeURIComponent(n)}`,{signal:e}),"asset"),i=t.production_context||t.production||t.production_records?.[0]||{},s=hm(t.metrics||t.oee||{});s.ideal_cycle_seconds===null&&li(i.ideal_cycle_minutes)!==null&&(s.ideal_cycle_seconds=Number(i.ideal_cycle_minutes)*60),!s.window_label&&s.start&&s.end&&(s.window_label=`${String(s.start).slice(11,16)}\u2013${String(s.end).slice(11,16)}`);let r=pn(t.events||t.state_events).map(c=>{let u=(new Date(c.end).getTime()-new Date(c.start).getTime())/1e3;return{...c,state:_r(c.state||c.status),duration_seconds:c.duration_seconds??(Number.isFinite(u)?u:null)}}).sort((c,u)=>{let m=Date.parse(c.start||c.started_at||c.occurred_at||c.timestamp),h=Date.parse(u.start||u.started_at||u.occurred_at||u.timestamp);return(Number.isFinite(m)?m:1/0)-(Number.isFinite(h)?h:1/0)}),a=Date.parse(s.start),o=Date.parse(s.end),l=Number.isFinite(a)&&Number.isFinite(o)?r.filter(c=>{let u=Date.parse(c.start||c.started_at||c.occurred_at||c.timestamp),m=Date.parse(c.end||c.ended_at)||u;return u<o&&m>a}):r;return{...Uu(t),metrics:s,events:r,window_events:l,production_context:i,cases:pn(t.cases).map(gr)}},async case(n){let e=In(await Dt(`/api/cases/${encodeURIComponent(n)}`),"case");return{...gr(e),work_orders:pn(e.work_orders).map(Ba),events:pn(e.events||e.history),analyses:pn(e.analyses),evidence:pn(e.evidence),observation:e.observation||e.observations?.at(-1)||null}},async analyze(n){return In(await Pt("/api/analyses",n),"job")},async job(n){return In(await Dt(`/api/jobs/${encodeURIComponent(n)}`),"job")},async createOrder(n){return await Pt("/api/work-orders",n)},async transitionOrder(n,e){return await Pt(`/api/work-orders/${encodeURIComponent(n)}/transition`,e)},async approveProposal(n){return await Pt("/api/proposals/approve",n)},async runEmployee(n){return In(await Pt("/api/employee-runs",n),"job")},async transitionCase(n,e){return await Pt(`/api/cases/${encodeURIComponent(n)}/transition`,e)},async importRecords(n){return await Pt("/api/import",n)},async observationPlan(n,e){return await Pt(`/api/cases/${encodeURIComponent(n)}/observation-plan`,e)},async simulation(n){return await Dt("/api/simulation",{signal:n})},async controlSimulation(n){return await Dt("/api/simulation/control",{method:"POST",body:JSON.stringify(n),timeout:9e4})},async iot(){return await Dt("/api/iot")},async ems(){return In(await Dt("/api/ems"),"ems")},async syncEms(){return In(await Dt("/api/ems/sync",{method:"POST",body:"{}",timeout:9e4}),"ems")},async syncIot(){return await Dt("/api/iot/sync",{method:"POST",body:"{}",timeout:9e4})},async manager(){return await Dt("/api/manager")},async receipt(n){return Dt(`/api/receipts/${encodeURIComponent(n)}`)},async managerMessage(n){return In(await Pt("/api/manager/messages",n),"turn")},async managerApprove(n,e){return In(await Pt(`/api/manager/turns/${encodeURIComponent(n)}/approve`,e),"turn")},async managerResume(n,e){return In(await Pt(`/api/manager/turns/${encodeURIComponent(n)}/resume`,e),"turn")},async employees(){return Dt("/api/employees")},async employeeContext(n){return Dt(`/api/employees/${encodeURIComponent(n)}/context`)},async saveEmployee(n,e){return Pt(`/api/employees/${encodeURIComponent(n)}`,e)},async employeeMessage(n,e){return Pt(`/api/employees/${encodeURIComponent(n)}/messages`,e)},async memories(){return Dt("/api/memories")},async saveMemory(n,e){return Pt(`/api/memories${n?"/"+encodeURIComponent(n):""}`,e)},async deleteMemory(n,e){return Pt(`/api/memories/${encodeURIComponent(n)}/delete`,e)},async messages(){return Dt("/api/messages")},async searchConversations(n){return Pt("/api/conversations/search",n)},async skills(){return Dt("/api/skills")},async saveSkill(n,e){return Pt(`/api/skills${n?"/"+encodeURIComponent(n):""}`,e)},async routines(){return Dt("/api/routines")},async saveRoutine(n,e){return Pt(`/api/routines${n?"/"+encodeURIComponent(n):""}`,e)},async routineAction(n,e,t={}){return Pt(`/api/routines/${encodeURIComponent(n)}/${e}`,t)},async conversationActions(){return await Dt("/api/conversation-actions")},async taskBoard(){return Dt("/api/task-board")},async taskDetail(n){return Dt(`/api/tasks/${encodeURIComponent(n)}/detail`)},async artifact(n){return Dt(`/api/artifacts/${encodeURIComponent(n)}`)},async managerDecision(n,e){return Pt(`/api/manager/turns/${encodeURIComponent(n)}/decision`,e)},async stopCase(n,e={}){return Pt(`/api/cases/${encodeURIComponent(n)}/stop`,e)},async stopTurn(n,e={}){return Pt(`/api/manager/turns/${encodeURIComponent(n)}/stop`,e)},async remindCase(n,e={}){return Pt(`/api/cases/${encodeURIComponent(n)}/remind`,e)}},Ci=()=>globalThis.crypto?.randomUUID?.()||`req-${Date.now()}-${Math.random().toString(36).slice(2)}`;function Fu(){let n="factory.pending-writes.v1",e=()=>{try{return JSON.parse(globalThis.sessionStorage.getItem(n))||{}}catch{return{}}},t=i=>{try{globalThis.sessionStorage.setItem(n,JSON.stringify(i))}catch{}};return{get(){return Object.entries(e()).map(([i,s])=>typeof s=="string"?{signature:i,key:s}:{signature:i,...s})},put(i,s){let r=e();return r[i]?r[i].key||r[i]:(r[i]=s,t(r),s)},remove(i,s){let r=e();(r[i]?.key||r[i])===s&&(delete r[i],t(r))},setPaused(i,s,r){let a=e();(a[i]?.key||a[i])===s&&(a[i]=r?{key:s,paused:!0}:s,t(a))}}}async function pc(n){if(!globalThis.crypto?.subtle)return null;let e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}async function ku(n,e){let t=await Promise.all(["request","received","delivery"].map(s=>pc(JSON.stringify("employee-"+s+"-"+n+"-"+e)))),i=["message_id","received_id","delivery_id"];return Object.fromEntries(t.flatMap((s,r)=>s?[[i[r],"MSG-"+s.slice(0,24)]]:[]))}async function Bu(n){let e=await pc(JSON.stringify("field-fact-"+n));return e?"MSG-"+e.slice(0,24):null}function zu({journal:n,lookup:e,newKey:t,now:i=Date.now}){let s=new Map,r;function a(){return r||=Promise.resolve().then(()=>n.get()).then(u=>{for(let{signature:m,key:h,paused:d}of u)s.set(m,{signature:m,key:h,paused:d===!0,persisted:!0})}).catch(()=>{})}async function o(u){if(s.get(u.signature)===u&&s.delete(u.signature),u.persisted)try{await n.remove(u.signature,u.key)}catch{}}async function l(u,m){if(!!u.paused!==m&&(u.paused=m,u.persisted))try{await n.setPaused?.(u.signature,u.key,m)}catch{}}async function c(u){return u.checking||(u.checking=(async()=>{let m;try{m=await e(u.key)}catch{}return m?.found!==!0?(u.checks=(u.checks||0)+1,u.nextCheck=i()+Math.min(6e4,5e3*u.checks),m?.found===!1&&(u.misses=(u.misses||0)+1,u.misses>=3&&await l(u,!0)),null):(await o(u),u.onReceipt?.(m),m)})().finally(()=>{u.checking=null})),u.checking}return{async reconcile(u=!1){await a();let m=[...s.values()].filter(h=>!h.sending&&(u||!h.paused&&!(h.nextCheck>i())));await Promise.all(m.map(c))},unconfirmed(u){return[...s.values()].some(m=>!m.sending&&!m.paused&&(!m.scope||m.scope===u))},retryAvailable(u){return[...s.values()].some(m=>!m.sending&&m.paused&&(!m.scope||m.scope===u))},async send(u,m,{scope:h,onReceipt:d}={}){await a();let _=await pc(u),x=_||u,g=s.get(x);if(g?.sending)return{pending:!0};let p=!!g;g||(g={signature:x,key:t(),persisted:!1},s.set(x,g)),g.sending=!0,g.scope=h,g.onReceipt=d;try{let M=g.key;if(_)try{g.key=await n.put(x,M),g.persisted=!0}catch{}if(p||g.key!==M){let w=await c(g);if(w)return{receipt:w}}await l(g,!1),g.misses=0,g.checks=0;let E=await m(g.key);return await o(g),{value:E}}catch(M){if(!M?.outcomeUnknown)throw await o(g),M;let E=await c(g);return E?{receipt:E}:{pending:!0}}finally{g.sending=!1}}}}var Jt=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),yr=n=>Array.isArray(n)?n:[];function $u(n,e){let t=a=>String(a||"").replace(/\s+/g," ").trim(),i=t(n?.text||n?.content),s=t(e?.title),r=t(e?.text);return{hideTitle:!!s&&i.includes(s),hideText:!!r&&i.includes(r)}}function Vu(n=[]){return yr(n).filter(e=>e.status==="pending"&&e.requires_response!==!1)}function mc(n){if(n?.status!=="pending"||!n.id||!Number.isInteger(n.version)||n.version<1)throw new Error("\u8FD9\u6761\u786E\u8BA4\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u518D\u5904\u7406\u3002");return{conversation_action_id:n.id,conversation_action_version:n.version}}function Gu(n,e){if(mc(n),!Number.isInteger(e)||e<0)throw new Error("\u6CA1\u6709\u627E\u5230\u8FD9\u9879\u529E\u7406\u52A8\u4F5C\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002");let t=yr(n.actions)[e];if(!t||!["order","case","observation_plan"].includes(t.kind)||!t.object_id||!t.action)throw new Error("\u5F53\u524D\u6CA1\u6709\u8FD9\u9879\u529E\u7406\u6743\u9650\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002");return t}function za(n={},{busy:e=!1,hideText:t=!1,hideTitle:i=!1}={}){if(!n.id)return"";let s=n.status==="pending",r=s&&n.requires_response!==!1,a=n.approval,o=a?.proposal||{},l=r&&n.kind==="approval"&&a?.id?["approve","modify","reject"].map((c,u)=>`<button type="button" class="button ${u===0?"primary":""}" data-employee-action="decision" data-id="${Jt(a.turn_id||a.id)}" data-decision="${c}" ${e?"disabled":""}>${["\u786E\u8BA4","\u6539\u4E00\u4E0B","\u4E0D\u540C\u610F"][u]}</button>`).join(""):r?yr(n.actions).map((c,u)=>`<button type="button" class="button ${u===0?"primary":""}" data-employee-action="conversation-step" data-id="${Jt(n.id)}" data-step="${u}" ${e?"disabled":""}>${Jt(c.label||n.primary_label||"\u8865\u5145\u5904\u7406\u8BB0\u5F55")}</button>`).join(""):"";return`<section class="conversation-action ${r?"is-pending":s?"is-progress":"is-resolved"}" data-conversation-action="${Jt(n.id)}" data-case-id="${Jt(n.case_id)}" tabindex="-1" aria-label="${Jt(i?r?"\u529E\u7406\u9009\u9879":"\u76F8\u5173\u8BB0\u5F55":n.title||(r?"\u8BF7\u4F60\u786E\u8BA4":"\u5904\u7406\u8FDB\u5C55"))}\uFF1A${Jt(n.equipment_id||"\u5DE5\u5382")}"><div class="conversation-action-heading">${i?"":`<strong>${Jt(n.title||(r?"\u8BF7\u4F60\u786E\u8BA4":"\u5904\u7406\u8FDB\u5C55"))}</strong>`}<span>${Jt(n.equipment_id||"\u5DE5\u5382")}${s?"":` \xB7 ${{resolved:"\u5DF2\u5904\u7406",superseded:"\u5DF2\u6709\u540E\u7EED\u5B89\u6392",cancelled:"\u5DF2\u505C\u6B62"}[n.status]||"\u5386\u53F2\u8BB0\u5F55"}`}</span></div>${n.text&&!t?`<p>${Jt(n.text)}</p>`:""}${s&&n.kind==="approval"?`<p class="conversation-proposal-title">${Jt(o.title||"\u73B0\u573A\u5904\u7406\u65B9\u6848")}</p>${o.description?`<p>${Jt(o.description)}</p>`:""}<details class="conversation-proposal-details"><summary>\u67E5\u770B\u5B8C\u6574\u65B9\u6848</summary>${yr(o.steps).length?`<ol>${o.steps.map(c=>`<li>${Jt(typeof c=="string"?c:c.action||c.description||c.text||"")}</li>`).join("")}</ol>`:""}${o.acceptance_criteria?`<p>\u5B8C\u6210\u8981\u6C42\uFF1A${Jt(typeof o.acceptance_criteria=="string"?o.acceptance_criteria:JSON.stringify(o.acceptance_criteria))}</p>`:""}${o.risks?`<p>\u6CE8\u610F\uFF1A${Jt(typeof o.risks=="string"?o.risks:JSON.stringify(o.risks))}</p>`:""}</details>`:""}${l?`<div class="conversation-action-choices">${l}</div>`:""}<div class="conversation-action-links"><button type="button" class="text-button" data-employee-action="conversation-reply" data-id="${Jt(n.id)}">${r?"\u8865\u5145\u8BF4\u660E":"\u95EE\u95EE\u603B\u7BA1"}</button><button type="button" class="text-button" data-employee-action="conversation-record" data-id="${Jt(n.id)}">\u67E5\u770B\u4F9D\u636E\u548C\u7ECF\u8FC7</button></div></section>`}function gc(n,e=[]){let t=yr(e).find(i=>i.id===n.case_id);return n.equipment_id||n.asset_id||t?.asset_id||t?.equipment_id||""}var Xu=Object.freeze([{id:"owner",title:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",actorType:"human"},{id:"advisors",title:"AI \u987E\u95EE",actorType:"ai"},{id:"coordinator",title:"AI \u534F\u8C03\u5458\u5DE5",actorType:"ai"},{id:"technician",title:"\u7EF4\u4FEE\u6267\u884C\u4EBA",actorType:"human"},{id:"reviewers",title:"\u590D\u6838\u4E0E\u9A8C\u6536\u4EBA",actorType:"human"},{id:"system",title:"\u6570\u636E\u89C2\u5BDF\u670D\u52A1",actorType:"system"}]),yc=Object.freeze([{id:"triage",title:"\u6838\u5B9E\u5F02\u5E38",lane:"owner",phase:0,role:"business_owner",roleLabel:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",actorType:"human"},{id:"analysis_efficiency",title:"\u6548\u7387\u5206\u6790",lane:"advisors",phase:1,role:"efficiency_advisor",roleLabel:"\u751F\u4EA7\u635F\u5931\u5206\u6790\u5458",actorType:"ai"},{id:"analysis_maintenance",title:"\u8FD0\u7EF4\u5206\u6790",lane:"advisors",phase:1,role:"maintenance_advisor",roleLabel:"\u8BBE\u5907\u8BCA\u65AD\u5458",actorType:"ai"},{id:"proposal",title:"\u5F62\u6210\u5904\u7F6E\u63D0\u6848",lane:"coordinator",phase:2,role:"maintenance_coordinator",roleLabel:"\u7EF4\u4FEE\u8BA1\u5212\u5458",actorType:"ai"},{id:"decision",title:"\u4EBA\u5DE5\u6279\u51C6\u63D0\u6848",lane:"owner",phase:2,role:"business_owner",roleLabel:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",actorType:"human"},{id:"dispatch",title:"\u521B\u5EFA\u4E0E\u56DE\u8BFB\u5DE5\u5355",lane:"coordinator",phase:3,role:"maintenance_coordinator",roleLabel:"\u7EF4\u4FEE\u8BA1\u5212\u5458",actorType:"ai"},{id:"accept",title:"\u63A5\u6536\u7EF4\u4FEE\u5DE5\u5355",lane:"technician",phase:3,role:"technician",roleLabel:"\u7EF4\u4FEE\u6267\u884C\u4EBA",actorType:"human"},{id:"execution",title:"\u6267\u884C\u5E76\u63D0\u4EA4\u7ED3\u679C",lane:"technician",phase:4,role:"technician",roleLabel:"\u7EF4\u4FEE\u6267\u884C\u4EBA",actorType:"human"},{id:"technical_review",title:"\u6280\u672F\u590D\u6838",lane:"reviewers",phase:4,role:"technical_reviewer",roleLabel:"\u6280\u672F\u590D\u6838\u4EBA",actorType:"human"},{id:"acceptance",title:"\u6700\u7EC8\u9A8C\u6536",lane:"reviewers",phase:4,role:"acceptor",roleLabel:"\u6700\u7EC8\u9A8C\u6536\u4EBA",actorType:"human"},{id:"observation",title:"\u6062\u590D\u89C2\u5BDF\u4E0E\u6838\u9A8C",lane:"system",phase:5,role:"business_service",roleLabel:"\u4E1A\u52A1\u670D\u52A1 / \u6570\u636E\u89C2\u5BDF",actorType:"system"},{id:"close",title:"\u590D\u6838\u5E76\u7ED3\u6848",lane:"reviewers",phase:5,role:"acceptor",roleLabel:"\u6700\u7EC8\u9A8C\u6536\u4EBA",actorType:"human"}]),Gb=Object.freeze({version:1,statuses:["completed","current","waiting","pending","failed","unknown"],edgeStatuses:["planned","recorded","current"],timeline:"Absolute startMs/endMs. Open segments end at workflow.generated_at, never client time or updated_at. Unknown business spans live in contextSegments; missing boundaries live in unknownSegments.",duration:"Node durationSeconds is the union of its actual primary-kind intervals. timings keeps every other kind separate. Global metrics are server unions; categories must not be added.",evidence:"history and stepIds retain all attempts/cycles; current status uses current-cycle/current-snapshot artifacts. An ended queue or wait is not successful AI work.",waiting:"current locates the next business action, not necessarily an active worker. triggerRequired + actualOwner identify the human who must initiate a not-yet-running AI node."}),Pn=n=>Array.isArray(n)?n:[],$a=n=>[...new Set(n.filter(e=>e!=null&&e!==""))],Dn=n=>n&&Number.isFinite(Date.parse(n))?Date.parse(n):null,vr=n=>String(n?.state||n?.status||"").toUpperCase(),Hu=n=>[...n].sort((e,t)=>(Dn(e.created_at||e.recorded_at)??-1/0)-(Dn(t.created_at||t.recorded_at)??-1/0)),xr=new Map(yc.map(n=>[n.id,n])),Wu=new Set(["ai_active","ai_queue","ai_tool_wait","ai_wait_human","human_wait","field_work","observation"]),fm={completed:"\u5DF2\u5B8C\u6210",current:"\u6B63\u5728\u5904\u7406",waiting:"\u7B49\u5F85\u4E2D",pending:"\u5C1A\u672A\u5F00\u59CB",failed:"\u6267\u884C\u5931\u8D25",unknown:"\u8BB0\u5F55\u5F85\u6838\u5B9E"},pm=n=>n.actorType==="ai"?"ai_active":n.id==="execution"?"field_work":n.id==="observation"?"observation":"human_wait",mm=n=>n==="business_owner"?"owner":["efficiency_advisor","maintenance_advisor"].includes(n)?"advisors":n==="maintenance_coordinator"?"coordinator":n==="technician"?"technician":["technical_reviewer","acceptor"].includes(n)?"reviewers":"system",_c=n=>Array.isArray(n)?n:n?[n]:[];function gm(n){if(n===null)return"\u7528\u65F6\u672A\u8BB0\u5F55";let e=Math.max(0,Math.floor(n));return e<60?`${e} \u79D2`:e<3600?`${Math.floor(e/60)} \u5206 ${e%60} \u79D2`:e<86400?`${Math.floor(e/3600)} \u5C0F\u65F6 ${Math.floor(e%3600/60)} \u5206`:`${Math.floor(e/86400)} \u5929 ${Math.floor(e%86400/3600)} \u5C0F\u65F6`}function qu(n,e){let t=Dn(n.start_at),i=Dn(n.end_at||(n.status==="current"?e:null));return t!==null&&i!==null&&i>=t?{startMs:t,endMs:i}:null}function _m(n){if(!n.length)return null;let e=0,t=null;for(let{startMs:i,endMs:s}of[...n].sort((r,a)=>r.startMs-a.startMs||r.endMs-a.endMs))e+=Math.max(0,s-Math.max(i,t??i)),t=Math.max(t??s,s);return e/1e3}function vc(n={}){let e=n.workflow||{},t=e.source==="audit_projection"||!!n.workflow,i=Pn(e.steps),s=i.filter($=>$.status!=="pending"),r=Pn(e.artifacts),a=Pn(e.handoffs),o=e.current||{},l=e.metrics||{},c=["CLOSED","CANCELLED","DISMISSED"].includes(vr(n)),u=n.analysis_cycle,m=n.metrics?.snapshot_hash,h=s.filter($=>$.stage_id==="analysis_preparation").map($=>Dn($.start_at)).filter($=>$!==null),d=h.length?Math.max(...h):null,_=$=>d===null||(Dn($.created_at||$.recorded_at||$.timestamp)??-1/0)>=d,x=Pn(n.analyses).filter($=>u!==void 0&&m&&$.analysis_cycle===u&&$.baseline_snapshot_hash===m),g=$=>x.filter(Y=>Y.kind===$),p=Hu(Pn(n.work_orders).filter(_)),M=p.findLast($=>!["COMPLETED","CANCELLED"].includes(vr($)))||p.at(-1),E=vr(M),w=Hu(Pn(n.observations).filter(_)),R=w.at(-1),C=r.filter($=>$.kind==="approval"&&_($)),v=!!n.approved_proposal||C.length>0,y=vr(n)==="WAITING_DECISION"&&o.stage_id==="decision"&&!g("maintenance_coordinator").length&&!v,I=new Set(i.filter($=>$.status==="pending").map($=>$.stage_id)),A=[];if(!c&&y)A.push("proposal");else if(!c&&o.stage_id==="analysis_preparation")for(let $ of yc.filter(Y=>["analysis_efficiency","analysis_maintenance"].includes(Y.id)))g($.role).length||A.push($.id);else!c&&xr.has(o.stage_id)&&A.push(o.stage_id);if(!c)for(let $ of s)$.status==="current"&&$.duration_kind==="ai_active"&&xr.has($.stage_id)&&($.analysis_cycle===void 0||u===void 0||$.analysis_cycle===u)&&A.push($.stage_id);let L=new Set(A),N=$=>$.analysis_cycle!==void 0&&u!==void 0?$.analysis_cycle===u:d===null||$.stage_id==="triage"||(Dn($.end_at||$.start_at)??1/0)>=d,q=yc.map($=>{let Y=s.filter(he=>he.stage_id===$.id),de=Y.filter(N),pe=$.actorType==="ai"&&$.id!=="dispatch"?g($.role):[],Re=["dispatch","accept","execution","technical_review","acceptance"].includes($.id)?p:[],ye=["observation","close"].includes($.id)?w:[],ke=$a([...de.flatMap(he=>Pn(he.artifact_ids)),...pe.map(he=>he.id),...Re.map(he=>he.id),...ye.map(he=>he.id),...$.id==="decision"?C.map(he=>he.id):[]]),at=de.filter(he=>he.status==="current"),Pe=!t||c?"unknown":I.has($.id)?"pending":Y.length?"unknown":"pending",Je=!1;$.id==="triage"?Je=de.some(he=>he.status==="completed"&&!!he.end_at):["analysis_efficiency","analysis_maintenance","proposal"].includes($.id)?Je=pe.length>0:$.id==="decision"?Je=v:$.id==="dispatch"?Je=!!M:$.id==="accept"?Je=["ACCEPTED","IN_PROGRESS","WAITING_TECH_REVIEW","WAITING_ACCEPTANCE","COMPLETED"].includes(E):$.id==="execution"?Je=["WAITING_TECH_REVIEW","WAITING_ACCEPTANCE","COMPLETED"].includes(E):$.id==="technical_review"?Je=["WAITING_ACCEPTANCE","COMPLETED"].includes(E):$.id==="acceptance"?Je=E==="COMPLETED":$.id==="observation"?Je=R?.passed===!0:$.id==="close"&&(Je=vr(n)==="CLOSED"&&(Dn(l.ended_at)!==null||de.some(he=>he.status==="completed"&&!!he.end_at))),Je?Pe="completed":de.some(he=>["failed","cancelled","interrupted"].includes(he.status))&&(Pe="failed"),$.id==="observation"&&R?.passed===!1&&(Pe="failed");let st=!1,Ze=!1,Rt=null,St="",z=null;L.has($.id)&&!c&&(Rt={...Pn(o.participants).find(he=>he.role===$.role)||o},y||o.stage_id==="analysis_preparation"?(st=!0,Ze=!0,z="business_owner",St=y?"\u7B49\u5F85\u8D1F\u8D23\u4EBA\u53D1\u8D77":"\u7B49\u5F85\u8D1F\u8D23\u4EBA\u53D1\u8D77\u987E\u95EE\u5206\u6790",Pe!=="failed"&&(Pe="waiting")):at.some(he=>he.duration_kind==="ai_active")||o.status==="executing"&&$.actorType!=="ai"?Pe="current":(st=!0,z=o.role||$.role,Pe=o.status==="blocked"?"failed":"waiting",St=o.label||"")),y&&$.id==="decision"&&(Pe="pending"),E==="IN_PROGRESS"&&["technical_review","acceptance","observation","close"].includes($.id)&&!L.has($.id)&&(Pe="pending");let k=de.map(he=>({step:he,interval:qu(he,e.generated_at)})).filter(he=>he.interval),j={};for(let he of Wu)j[he]=_m(k.filter(me=>me.step.duration_kind===he).map(me=>me.interval));let oe=pm($),ne=y&&$.id==="decision"?null:j[oe],Ae=k.filter(he=>he.step.duration_kind===oe),Be=Ae.length?Math.min(...Ae.map(he=>he.interval.startMs)):null,U=Ae.length&&!Ae.some(he=>!he.step.end_at)?Math.max(...Ae.map(he=>he.interval.endMs)):null,Ie=$a(de.flatMap(he=>_c(he.notes)));return Y.filter(he=>["failed","cancelled","interrupted"].includes(he.status)).length&&Ie.push("\u4FDD\u7559\u6B64\u524D\u5931\u8D25\u6216\u4E2D\u65AD\u8BB0\u5F55\uFF1B\u6210\u529F\u4EA7\u7269\u4E0D\u8986\u76D6\u5931\u8D25\u5386\u53F2\u3002"),Y.some(he=>!N(he))&&Ie.push("\u5386\u53F2\u5206\u6790\u8F6E\u6B21\u4FDD\u7559\u5728\u660E\u7EC6\u4E2D\uFF0C\u4E0D\u4F5C\u4E3A\u672C\u8F6E\u5DF2\u5B8C\u6210\u4F9D\u636E\u3002"),$.id==="execution"&&Ie.push("\u73B0\u573A\u6267\u884C\u9636\u6BB5\u7ECF\u8FC7\u65F6\u95F4\u4E0D\u7B49\u4E8E\u4EBA\u5DE5\u5B9E\u9645\u6295\u5165\u5DE5\u65F6\u3002"),$.id==="decision"&&Ie.push("\u8D1F\u8D23\u4EBA\u54CD\u5E94\u533A\u95F4\u53EF\u80FD\u5305\u542B\u7B49\u5F85\u63D0\u6848\uFF1B\u53EA\u6709\u6279\u51C6\u8BB0\u5F55\u8BC1\u660E\u63D0\u6848\u5DF2\u6279\u51C6\u3002"),Ze&&Ie.push("\u5F53\u524D\u8D23\u4EFB\u4EBA\u5728\u8D1F\u8D23\u4EBA\uFF1BAI \u5C1A\u672A\u5F00\u59CB\u8FD9\u4E00\u6B65\u3002"),$.id==="dispatch"&&de.some(he=>he.duration_kind==="ai_wait_human")&&Ie.push("\u5DE5\u5355\u8DDF\u8E2A\u4E2D\u7684\u7B49\u5F85\u4EBA\u5DE5\u65F6\u95F4\u5355\u72EC\u4FDD\u7559\uFF0C\u4E0D\u8BA1\u5165 AI \u6D3B\u8DC3\u7528\u65F6\u3002"),{...$,status:Pe,statusLabel:Ze?St:fm[Pe],current:L.has($.id),waiting:st,actualOwner:Rt,waitingBy:z,triggerRequired:Ze,actionHint:St,durationSeconds:ne,durationKind:oe,durationLabel:Ze?"\u7B49\u5F85\u8D1F\u8D23\u4EBA\u53D1\u8D77":Pe==="pending"?"\u5C1A\u672A\u5F00\u59CB":gm(ne),waitingDurationSeconds:Ze&&Number.isFinite(o.elapsed_seconds)?o.elapsed_seconds:null,startAt:Be===null?null:new Date(Be).toISOString(),endAt:U===null?null:new Date(U).toISOString(),attempts:Y.length?Math.max(1,...Y.map(he=>Number(he.attempt)||1)):pe.length?1:0,artifactIds:ke,stepIds:Y.map(he=>he.id),notes:Ie,timings:j,history:Y}}),P=[["triage","analysis_efficiency","\u53D1\u8D77\u5206\u6790"],["triage","analysis_maintenance","\u53D1\u8D77\u5206\u6790"],["analysis_efficiency","proposal","\u5206\u6790\u8F93\u5165"],["analysis_maintenance","proposal","\u5206\u6790\u8F93\u5165"],["proposal","decision","\u63D0\u6848\u5F85\u5BA1"],["decision","dispatch","\u6279\u51C6\u6388\u6743"],["dispatch","accept","\u4E0B\u53D1\u5DE5\u5355"],["accept","execution","\u63A5\u5355\u540E\u6267\u884C"],["execution","technical_review","\u63D0\u4EA4\u7ED3\u679C"],["technical_review","acceptance","\u590D\u6838\u901A\u8FC7"],["acceptance","observation","\u9A8C\u6536\u540E\u89C2\u5BDF"],["observation","close","\u89C2\u5BDF\u901A\u8FC7"]],O=($,Y,de)=>{let pe=de.from?.role,Re=de.to?.role,ye=Pn(de.artifact_ids);return $==="triage"?pe==="business_service"&&Re===xr.get(Y).role&&ye.some(ke=>Pn(e.ai_runs).some(at=>at.id===ke&&at.stage_id===Y)):$==="proposal"?pe==="maintenance_coordinator"&&Re==="business_owner"&&ye.some(ke=>g("maintenance_coordinator").some(at=>at.id===ke)):$==="decision"?pe==="business_owner"&&Re==="maintenance_coordinator"&&ye.some(ke=>C.some(at=>at.id===ke)):$==="dispatch"?pe==="maintenance_coordinator"&&Re==="technician"&&ye.some(ke=>p.some(at=>at.id===ke)):$==="execution"?pe==="technician"&&Re==="technical_reviewer":$==="technical_review"?pe==="technical_reviewer"&&Re==="acceptor":$==="acceptance"?pe==="acceptor"&&Re==="business_service":$==="observation"?pe==="business_service"&&Re==="acceptor"&&ye.some(ke=>w.some(at=>at.id===ke&&at.passed===!0)):!1},X=P.map(([$,Y,de])=>{let pe=a.filter(Re=>_(Re)&&O($,Y,Re)).map(Re=>Re.id);return{id:`${$}--${Y}`,from:$,to:Y,label:de,status:pe.length?"recorded":"planned",actualHandoffIds:pe}});for(let $ of a.filter(_))if(["technical_reviewer","acceptor"].includes($.from?.role)&&$.to?.role==="technician"){let Y=$.from.role==="technical_reviewer"?"technical_review":"acceptance";X.push({id:`return-${$.id}`,from:Y,to:"execution",status:"recorded",label:"\u9000\u56DE\u8865\u5145",actualHandoffIds:[$.id],returning:!0})}let H=[],te=[],Z=[];for(let $ of s){let Y=qu($,e.generated_at),de=y&&$.stage_id==="decision"&&$.status==="current"?"proposal":xr.has($.stage_id)?$.stage_id:null,pe={id:$.id,nodeId:de,lane:mm($.role),roleLabel:$.role_label||xr.get(de)?.roleLabel||"\u672A\u8BB0\u5F55",title:$.title||"\u9636\u6BB5\u8BB0\u5F55",startMs:Y?.startMs??null,endMs:Y?.endMs??null,startAt:$.start_at||null,endAt:$.end_at||null,status:$.status,kind:$.duration_kind||"unknown",durationSeconds:Y?(Y.endMs-Y.startMs)/1e3:null,attempt:$.attempt||1,artifactIds:Pn($.artifact_ids),stepId:$.id,analysisCycle:$.analysis_cycle??null,parallelGroup:$.parallel_group||null};Y?Wu.has(pe.kind)?H.push(pe):Z.push(pe):te.push(pe)}H.sort(($,Y)=>$.startMs-Y.startMs||$.endMs-Y.endMs);let re=[...H,...Z],le=Dn(l.started_at)??(re.length?Math.min(...re.map($=>$.startMs)):null),De=Dn(l.ended_at)??Dn(e.generated_at)??(re.length?Math.max(...re.map($=>$.endMs)):null);return{available:t,nodes:q,edges:X,currentNodeIds:$a(A),current:{...o},metrics:{...l},artifacts:[...r],handoffs:[...a],timeline:{originMs:le,endMs:De,segments:H,unknownSegments:te,contextSegments:Z},notes:$a([..._c(e.notes),..._c(l.unknown_reasons),"\u5404\u7C7B\u8017\u65F6\u53EF\u4EE5\u91CD\u53E0\uFF1BAI \u6D3B\u8DC3\u3001\u4EBA\u5DE5\u54CD\u5E94\u548C\u89C2\u5BDF\u65F6\u95F4\u4E0D\u80FD\u76F8\u52A0\u4E3A\u4EFB\u52A1\u603B\u8017\u65F6\u3002"])}}var Ln=n=>Array.isArray(n)?n:[],br=n=>Number.isFinite(Date.parse(n))?Date.parse(n):null;function xc(n){let e=n.map(r=>[r.startMs,r.endMs]).sort((r,a)=>r[0]-a[0]),t=0,i=null,s=null;for(let[r,a]of e)i===null?(i=r,s=a):r<=s?s=Math.max(s,a):(t+=s-i,i=r,s=a);return(t+(i===null?0:s-i))/1e3}function Yu(n,e){let t=br(e);if(t===null)return n;let i=Ln(n.artifacts).filter(_=>{let x=br(_.recorded_at||_.created_at);return x!==null&&x<=t}),s=new Set(i.map(_=>_.id)),r=_=>Ln(_).filter(x=>Number.isFinite(x.startMs)&&x.startMs<=t).map(x=>({...x,endMs:Math.min(x.endMs??t,t),endAt:x.endMs<=t?x.endAt:null,durationSeconds:(Math.min(x.endMs??t,t)-x.startMs)/1e3,status:x.endMs>t?"current":x.status,artifactIds:Ln(x.artifactIds).filter(g=>s.has(g))})),a=r(n.timeline?.segments),o=r(n.timeline?.contextSegments),l=Ln(n.nodes).map(_=>{let x=Ln(_.history).filter(N=>{let q=br(N.start_at);return q!==null&&q<=t}).map(N=>{let q=br(N.end_at);return{...N,end_at:q!==null&&q<=t?N.end_at:null,status:q===null||q>t?"current":N.status,artifact_ids:Ln(N.artifact_ids).filter(P=>s.has(P))}}),g=Ln(_.artifactIds).filter(N=>s.has(N)),p=x.filter(N=>N.status==="current"),M=x.at(-1),E=i.filter(N=>g.includes(N.id)&&N.kind!=="agent_run"),w=["analysis_efficiency","analysis_maintenance","proposal"].includes(_.id),C=w||["decision","dispatch","observation"].includes(_.id)?E.some(N=>w?N.kind==="analysis":_.id==="decision"?N.kind==="approval":_.id==="dispatch"?N.kind==="work_order":N.kind==="observation"&&!/未通过|不通过|未知/.test(N.summary||"")):M?.status==="completed"&&!!M.end_at,v=M&&["failed","cancelled","interrupted"].includes(M.status),y=p.some(N=>["human_wait","ai_wait_human","ai_queue","ai_tool_wait"].includes(N.duration_kind)),I=C&&!p.length?"completed":p.length?y?"waiting":"current":v?"failed":x.length?"unknown":"pending",A=a.filter(N=>N.nodeId===_.id),L=A.length?xc(A):null;return{..._,status:I,statusLabel:{completed:"\u5DF2\u5B8C\u6210",waiting:"\u7B49\u5F85\u4E2D",current:"\u8FDB\u884C\u4E2D",failed:"\u672A\u5B8C\u6210",unknown:"\u8BB0\u5F55\u5F85\u6838\u5B9E",pending:"\u5C1A\u672A\u5F00\u59CB"}[I],current:p.length>0,waiting:y,triggerRequired:!1,actionHint:"",history:x,artifactIds:g,stepIds:x.map(N=>N.id),timings:[],startAt:x[0]?.start_at||null,endAt:p.length?null:M?.end_at||null,durationSeconds:L,durationLabel:null,attempts:x.length?Math.max(...x.map(N=>N.attempt||1)):0,notes:x.flatMap(N=>Ln(N.notes))}}),c=Ln(n.handoffs).filter(_=>{let x=br(_.timestamp||_.at);return x!==null&&x<=t}),u=new Set(c.map(_=>_.id)),m=Ln(n.edges).map(_=>{let x=Ln(_.actualHandoffIds).filter(g=>u.has(g));return{..._,actualHandoffIds:x,status:x.length?"recorded":"planned"}}),h=l.filter(_=>_.current),d=h.at(-1);return{...n,nodes:l,edges:m,artifacts:i,handoffs:c,currentNodeIds:h.map(_=>_.id),current:{role_label:d?.roleLabel||"",label:d?`\u56DE\u653E\uFF1A${d.title}`:"\u56DE\u653E\u81F3\u5DF2\u8BB0\u5F55\u7684\u4EA4\u63A5",status:d?.waiting?"waiting":"executing",elapsed_seconds:d?.durationSeconds},timeline:{...n.timeline,endMs:t,segments:a,contextSegments:o,unknownSegments:[]},metrics:{...n.metrics,ended_at:null,wall_elapsed_seconds:n.timeline?.originMs===null?null:Math.max(0,(t-n.timeline.originMs)/1e3),ai_active_seconds:xc(a.filter(_=>_.kind==="ai_active")),human_wait_seconds:xc(a.filter(_=>_.kind==="human_wait")),human_work_seconds:null}}}var ut=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),En=n=>Array.isArray(n)?n:[],ci=n=>typeof n=="number"&&Number.isFinite(n),Zu={completed:"\u5DF2\u5B8C\u6210",current:"\u6B63\u5728\u6267\u884C",waiting:"\u6B63\u5728\u7B49\u5F85",pending:"\u5C1A\u672A\u5F00\u59CB",failed:"\u6267\u884C\u5931\u8D25",unknown:"\u8BB0\u5F55\u4E0D\u8DB3"},Va={ai_active:"AI \u8FD0\u884C",ai_queue:"\u7B49\u5F85\u6A21\u578B",ai_tool_wait:"\u7B49\u5F85\u5DE5\u5177",ai_wait_human:"AI \u7B49\u5F85\u4EBA\u5DE5",human_wait:"\u5F85\u4EBA\u5DE5\u54CD\u5E94",field_work:"\u73B0\u573A\u6267\u884C\u9636\u6BB5",observation:"\u89C2\u5BDF\u6838\u9A8C",unknown:"\u672A\u5206\u7C7B\u8BB0\u5F55"},Ga={owner:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",advisors:"AI \u987E\u95EE",coordinator:"AI \u5458\u5DE5",technician:"\u73B0\u573A\u6267\u884C\u4EBA",reviewers:"\u590D\u6838 / \u9A8C\u6536\u4EBA",system:"\u4E1A\u52A1\u7CFB\u7EDF"},Ms={triage:"\u6838\u5B9E\u5F02\u5E38",analysis_efficiency:"\u6548\u7387\u5206\u6790",analysis_maintenance:"\u8FD0\u7EF4\u5206\u6790",proposal:"\u5F62\u6210\u5904\u7F6E\u63D0\u6848",decision:"\u4EBA\u5DE5\u6279\u51C6",dispatch:"\u5EFA\u5355\u5E76\u56DE\u8BFB",accept:"\u63A5\u6536\u5DE5\u5355",execution:"\u6267\u884C\u4E0E\u63D0\u4EA4",technical_review:"\u6280\u672F\u590D\u6838",acceptance:"\u6700\u7EC8\u9A8C\u6536",observation:"\u6062\u590D\u89C2\u5BDF",close:"\u590D\u6838\u7ED3\u6848"},ju={width:1e3,height:518,nodeWidth:110,nodeHeight:52,positions:{triage:[153,48],analysis_efficiency:[283,126],analysis_maintenance:[413,126],proposal:[543,204],decision:[543,48],dispatch:[673,204],accept:[673,282],execution:[803,282],technical_review:[803,351],acceptance:[933,351],observation:[933,479],close:[933,411]},bands:[["owner",10,76],["advisors",88,76],["coordinator",166,76],["technician",244,76],["reviewers",322,116],["system",440,76]]},Ku={width:600,height:852,nodeWidth:238,nodeHeight:74,positions:{triage:[160,44],analysis_efficiency:[160,152],analysis_maintenance:[440,152],proposal:[440,260],decision:[160,368],dispatch:[440,476],accept:[160,584],execution:[440,584],technical_review:[160,692],acceptance:[440,692],observation:[440,800],close:[160,800]}},ym='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',vm='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg>';function Ri(n){if(!ci(n)||n<0)return"\u672A\u8BB0\u5F55";let e=Math.floor(n);if(e<60)return`${e} \u79D2`;let t=Math.floor(e/60);if(t<60)return`${t} \u5206 ${e%60} \u79D2`;let i=Math.floor(t/60);return i<24?`${i} \u5C0F\u65F6 ${t%60} \u5206`:`${Math.floor(i/24)} \u5929 ${i%24} \u5C0F\u65F6`}function Ss(n,e=!1){if(n==null||n==="")return"\u672A\u8BB0\u5F55";let t=new Date(n);return Number.isFinite(t.getTime())?t.toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",...e?{month:"2-digit",day:"2-digit"}:{},hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}):"\u672A\u8BB0\u5F55"}function bc(n){return Object.hasOwn(Zu,n)?n:"unknown"}function ws(n){return n.triggerRequired?n.actualOwner?.role_label||n.actualOwner?.roleLabel||"\u4E1A\u52A1\u8D1F\u8D23\u4EBA":n.roleLabel||Ga[n.lane]||"\u8D1F\u8D23\u4EBA\u5F85\u786E\u8BA4"}function Sc(n){return n.statusLabel||Zu[bc(n.status)]}function Qu(n){return n.durationLabel||(n.status==="pending"?"\u672A\u5F00\u59CB":Ri(n.durationSeconds))}function xm(n){return n.triggerRequired?"\u7B49\u8D1F\u8D23\u4EBA\u53D1\u8D77":`${Sc(n)}${n.status==="pending"?"":` \xB7 ${Qu(n)}`}`}function bm(n){if(n.kind==="ai_wait_human")return"\u7B49\u5F85\u4EBA\u5DE5\u53CD\u9988";if(n.kind==="ai_tool_wait")return"\u7B49\u5F85\u5DE5\u5177";if(n.kind==="ai_queue")return"\u7B49\u5F85\u6A21\u578B";let e=Ms[n.nodeId]||n.title||Va[n.kind]||"\u5904\u7406\u8BB0\u5F55";return n.kind==="human_wait"?`${e} \xB7 \u7B49\u5F85\u54CD\u5E94`:e}function Sm(n){let e=n.current||{},t=En(n.nodes).filter(r=>En(n.currentNodeIds).includes(r.id));if(!t.length)return`<div class="wg-current-line is-ended"><span>${ut(e.label||"\u5F53\u524D\u5904\u7406\u8BB0\u5F55\u5DF2\u7ED3\u675F")}</span></div>`;let i=t.length>1?[...new Set(t.map(ws))].join("\u3001"):e.role_label||ws(t[0]),s=ci(e.elapsed_seconds)?`${e.status==="waiting"?"\u5DF2\u7B49\u5F85":"\u5DF2\u6301\u7EED"} ${Ri(e.elapsed_seconds)}`:"\u8017\u65F6\u672A\u8BB0\u5F55";return`<div class="wg-current-line"><span class="wg-current-dot" aria-hidden="true"></span><strong>${ut(i)}</strong><span>${ut(e.label||t.map(Sc).join("\u3001"))}</span><span class="wg-current-elapsed">${s}</span></div>`}function Mm(n){let e=n.metrics||{};return`<div class="wg-time-metrics" aria-label="\u771F\u5B9E\u7D2F\u8BA1\u65F6\u95F4">${[["\u4EFB\u52A1\u603B\u8017\u65F6",Ri(e.wall_elapsed_seconds)],["AI \u6D3B\u8DC3",Ri(e.ai_active_seconds)],["\u5F85\u4EBA\u5DE5\u54CD\u5E94",Ri(e.human_wait_seconds)],["\u5B9E\u9645\u4EBA\u5DE5\u5DE5\u65F6",ci(e.human_work_seconds)?Ri(e.human_work_seconds):"\u672A\u72EC\u7ACB\u6253\u70B9"]].map(([i,s])=>`<span>${i}<strong>${s}</strong></span>`).join("")}</div><p class="wg-metrics-note">\u5404\u7C7B\u65F6\u95F4\u53EF\u80FD\u91CD\u53E0\uFF0C\u4E0D\u80FD\u76F8\u52A0\u4E3A\u603B\u8017\u65F6\u3002</p>`}function wm(n,e="wide"){let t=e==="narrow"?Ku:ju,i=t.positions[n.from],s=t.positions[n.to];if(!i||!s)return"";let r=t.nodeHeight/2+3,a=t.nodeWidth/2+3;if(e==="wide"&&n.from==="acceptance"&&n.to==="observation")return`M ${i[0]+a} ${i[1]} H 997 V ${s[1]} H ${s[0]+a}`;if(i[0]===s[0]){let m=s[1]>i[1]?1:-1;return`M ${i[0]} ${i[1]+r*m} V ${s[1]-r*m}`}if(i[1]===s[1]){let m=s[0]>i[0]?1:-1;return`M ${i[0]+a*m} ${i[1]} H ${s[0]-a*m}`}let o=s[1]>i[1]?1:-1,l=i[1]+r*o,c=s[1]-r*o,u=(l+c)/2;return`M ${i[0]} ${l} V ${u} H ${s[0]} V ${c}`}function eh(n,e){return`wg-${String(n||"case").replace(/[^a-zA-Z0-9_-]/g,"-")}-${e}`}function Ju(n,e,t,i=!1){let s=i?Ku:ju,r=i?"narrow":"wide",a=eh(e.id,r),o=`<svg class="wg-connectors" viewBox="0 0 ${s.width} ${s.height}" preserveAspectRatio="none" aria-hidden="true"><defs>${["recorded","current","planned"].map(l=>`<marker id="${a}-${l}" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path class="wg-arrow-${l}" d="M1 1 7 4 1 7Z"/></marker>`).join("")}</defs>${En(n.edges).map(l=>{let c=["recorded","current"].includes(l.status)?l.status:"planned";return`<path class="wg-edge ${c}" d="${wm(l,r)}" marker-end="url(#${a}-${c})"><title>${ut(l.label||`${Ms[l.from]||l.from} \u2192 ${Ms[l.to]||l.to}`)} \xB7 ${c==="recorded"?"\u6709\u4EA4\u63A5\u8BB0\u5F55":c==="current"?"\u5F53\u524D\u4EA4\u63A5":"\u6D41\u7A0B\u5173\u7CFB\uFF08\u65E0\u4EA4\u63A5\u8BB0\u5F55\uFF09"}</title></path>`}).join("")}</svg>`;return`<div class="wg-flow-chart ${i?"wg-flow-narrow":"wg-flow-wide"}" style="--wg-chart-height:${s.height}px" aria-label="${i?"\u7EB5\u5411\u534F\u4F5C\u6D41\u7A0B\u56FE":"\u6309\u89D2\u8272\u5206\u6CF3\u9053\u7684\u534F\u4F5C\u6D41\u7A0B\u56FE"}">${i?"":s.bands.map(([l,c,u],m)=>`<div class="wg-lane-band ${m%2?"alternate":""}" style="top:${c}px;height:${u}px"><span class="wg-lane-label"><span>${Ga[l]}</span><small>${l==="advisors"?"\u5E76\u884C\u5206\u6790":l==="coordinator"?"\u63D0\u6848\u4E0E\u6D3E\u5DE5":l==="owner"?"\u6838\u5B9E\u4E0E\u51B3\u5B9A":l==="technician"?"\u63A5\u5355\u4E0E\u6267\u884C":l==="reviewers"?"\u5BA1\u9605\u4E0E\u7ED3\u6848":"\u6570\u636E\u4E0E\u6548\u679C"}</small></span></div>`).join("")}${o}${En(n.nodes).filter(l=>s.positions[l.id]).map(l=>{let[c,u]=s.positions[l.id],m=bc(l.status),h=l.id===t,d=Ms[l.id]||l.title,_=xm(l);return`<button type="button" class="wg-node ${m}${l.current?" is-current":""}${h?" selected":""}" data-workflow-node="${ut(l.id)}" aria-pressed="${h}" aria-label="${ut(`${l.title||d}\uFF0C${ws(l)}\uFF0C${_}`)}" title="${ut(`${l.title||d} \xB7 ${ws(l)} \xB7 ${_}`)}" style="left:${c/s.width*100}%;top:${u}px;width:${s.nodeWidth/s.width*100}%;height:${s.nodeHeight}px"><span class="wg-node-title">${m==="completed"?'<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>':""}${ut(d)}</span><span class="wg-node-owner">${ut(ws(l))}</span><span class="wg-node-meta">${ut(_)}</span>${l.current?'<span class="wg-node-current" aria-hidden="true"></span>':""}${Number(l.attempts)>1?`<span class="wg-node-retry" title="\u4FDD\u7559 ${ut(l.attempts)} \u6B21\u8FD0\u884C\u8BB0\u5F55">${ut(l.attempts)} \u6B21</span>`:""}</button>`}).join("")}</div>`}function Em(n){let e=Xu.map(t=>({id:t.id,title:Ga[t.id]||t.title,segments:[],tracks:0}));for(let t of e){let i=[],s=En(n).filter(r=>r.lane===t.id&&ci(r.startMs)&&ci(r.endMs)&&r.endMs>=r.startMs).sort((r,a)=>r.startMs-a.startMs||r.endMs-a.endMs);for(let r of s){let a=i.findIndex(o=>o<=r.startMs);a<0&&(a=i.length),i[a]=r.endMs,t.segments.push({...r,track:a})}t.tracks=Math.max(1,i.length)}return e}function Tm(n,e){let t=n.timeline||{},i=t.originMs,s=t.endMs,r=ci(i)&&ci(s)&&s>=i,a=r?Math.max(1,s-i):1,o=Em(t.segments),l=r&&new Date(i).toLocaleDateString("zh-CN",{timeZone:"Asia/Shanghai"})!==new Date(s).toLocaleDateString("zh-CN",{timeZone:"Asia/Shanghai"});return r?`<div class="wg-time-chart" aria-label="\u771F\u5B9E\u5904\u7406\u65F6\u95F4\u5206\u5E03"><div class="wg-time-ruler"><span>\u5317\u4EAC\u65F6\u95F4</span><div>${[0,.25,.5,.75,1].map((c,u)=>`<time class="tick-${u}" style="left:${c*100}%">${Ss(i+a*c,l)}</time>`).join("")}</div></div>${o.map(c=>`<div class="wg-time-lane" style="--wg-tracks:${c.tracks}"><div class="wg-time-person">${ut(c.title)}<small>${c.segments.length?"\u771F\u5B9E\u8D77\u6B62\u8BB0\u5F55":"\u5C1A\u65E0\u65F6\u95F4\u6BB5"}</small></div><div class="wg-time-track">${[0,25,50,75,100].map(u=>`<span class="wg-time-grid" style="left:${u}%"></span>`).join("")}${c.segments.map(u=>{let m=Math.max(0,Math.min(100,(u.startMs-i)/a*100)),h=Math.max(0,Math.min(100-m,(u.endMs-u.startMs)/a*100)),d=Object.hasOwn(Va,u.kind)?u.kind:"unknown",_=`${u.title||Ms[u.nodeId]||"\u5904\u7406\u9636\u6BB5"}\uFF0C${u.roleLabel||c.title}\uFF0C${Va[d]}\uFF0C${Ss(u.startMs,!0)} \u81F3 ${!u.endAt&&u.status==="current"?`\u672C\u6B21\u56DE\u8BFB ${Ss(u.endMs,!0)}\uFF08\u4ECD\u5728\u8FDB\u884C\uFF09`:Ss(u.endMs,!0)}\uFF0C${Ri(u.durationSeconds)}${u.status==="failed"?"\uFF0C\u5931\u8D25":""}`;return`<button type="button" class="wg-time-bar ${d}${u.status==="failed"?" failed":""}${u.nodeId===e?" selected":""}" data-workflow-node="${ut(u.nodeId)}" aria-pressed="${u.nodeId===e}" aria-label="${ut(_)}" title="${ut(_)}" style="left:${m}%;width:${h}%;top:${10+u.track*27}px">${h>15?`<span>${ut(bm(u))}</span>`:""}</button>`}).join("")}</div></div>`).join("")}<div class="wg-time-legend"><span><i class="ai_active"></i>AI \u8FD0\u884C</span><span><i class="human_wait"></i>\u7B49\u5F85\u54CD\u5E94 / \u5DE5\u5177</span><span><i class="field_work"></i>\u73B0\u573A\u6267\u884C\u9636\u6BB5</span><span><i class="observation"></i>\u7CFB\u7EDF\u89C2\u5BDF</span><span><i class="failed"></i>\u5931\u8D25\u8BB0\u5F55</span></div><p class="wg-time-note">\u6240\u6709\u6CF3\u9053\u5171\u7528\u540C\u4E00\u65F6\u95F4\u8F74\uFF0C\u6A2A\u5411\u91CD\u53E0\u8868\u793A\u540C\u65F6\u53D1\u751F\u3002\u77ED\u65F6\u6BB5\u663E\u793A\u4E3A\u523B\u5EA6\u70B9\uFF1B\u73B0\u573A\u9636\u6BB5\u548C\u7B49\u5F85\u65F6\u95F4\u4E0D\u4EE3\u8868\u5B9E\u9645\u4EBA\u5DE5\u5DE5\u65F6\u3002</p>${En(t.unknownSegments).length?`<details class="wg-unknown-time"><summary>${t.unknownSegments.length} \u6761\u7F3A\u5C11\u65F6\u95F4\u7684\u8BB0\u5F55\uFF0C\u672A\u7ED8\u5165\u6BD4\u4F8B\u56FE</summary><ul>${t.unknownSegments.map(c=>`<li>${ut(c.title||c.nodeId||c.id||"\u4E1A\u52A1\u8BB0\u5F55")} \xB7 ${ut(c.reason||"\u8D77\u6B62\u65F6\u95F4\u4E0D\u5B8C\u6574")}</li>`).join("")}</ul></details>`:""}</div>`:'<div class="wg-empty"><h4>\u5C1A\u65E0\u8DB3\u591F\u7684\u65F6\u95F4\u8BB0\u5F55</h4><p>\u9700\u8981\u771F\u5B9E\u7684\u5F00\u59CB\u548C\u7ED3\u675F\u65F6\u95F4\u624D\u80FD\u7ED8\u5236\u6BD4\u4F8B\u56FE\uFF1B\u672A\u8BB0\u5F55\u7684\u65F6\u6BB5\u4E0D\u4F1A\u8865\u7B97\u3002</p></div>'}function Am(n,e){if(!e)return"";let t=new Map(En(n.artifacts).map(m=>[m.id,m])),i=[...new Set(En(e.artifactIds))],s=En(e.history),r=s.filter(m=>m.status!=="pending"),a=ci(e.waitingDurationSeconds)?e.waitingDurationSeconds:n.current?.elapsed_seconds,o=e.triggerRequired?"\u7B49\u5F85\u8D1F\u8D23\u4EBA\u53D1\u8D77":Va[e.durationKind]||"\u8BB0\u5F55\u8017\u65F6",l=e.triggerRequired?ci(a)?`\u5DF2\u7B49\u5F85 ${Ri(a)}`:"\u7B49\u5F85\u65F6\u957F\u672A\u8BB0\u5F55":Qu(e),c=e.triggerRequired?"\u5C1A\u672A\u542F\u52A8":Ss(e.startAt,!0),u=e.triggerRequired?"\u5C1A\u672A\u542F\u52A8":e.endAt?Ss(e.endAt,!0):e.current&&["current","waiting"].includes(e.status)?e.status==="waiting"?"\u7B49\u5F85\u4E2D":"\u8FDB\u884C\u4E2D":"\u672A\u8BB0\u5F55";return`<section class="wg-node-detail" aria-label="\u6240\u9009\u6D41\u7A0B\u8282\u70B9\u8BE6\u60C5"><div class="wg-detail-heading"><div><h4>${ut(e.title||Ms[e.id])}</h4><p>${ut(ws(e))}${e.triggerRequired?` \xB7 \u53D1\u8D77\u540E\u7531${ut(e.roleLabel||Ga[e.lane]||"\u5BF9\u5E94\u89D2\u8272")}\u5904\u7406`:""}</p></div><span class="wg-detail-status ${bc(e.status)}">${ut(Sc(e))}</span><button type="button" class="text-button" data-workflow-open-stage="${ut(e.id)}">\u67E5\u770B\u9636\u6BB5\u8BB0\u5F55${ym}</button></div><div class="wg-detail-facts"><div><span>${ut(o)}</span><strong>${ut(l)}</strong></div><div><span>\u5F00\u59CB</span><strong>${c}</strong></div><div><span>\u7ED3\u675F</span><strong>${u}</strong></div><div><span>\u5386\u53F2\u8BB0\u5F55</span><strong>${r.length?`${r.length} \u6BB5`:"\u5C1A\u65E0\u5DF2\u53D1\u751F\u8BB0\u5F55"}${Number(e.attempts)>1?` \xB7 ${ut(e.attempts)} \u6B21\u5C1D\u8BD5`:""}</strong></div></div>${e.actionHint?`<p class="wg-detail-hint">${ut(e.actionHint)}</p>`:""}${En(e.notes).length?`<p class="wg-detail-notes">${e.notes.map(m=>ut(typeof m=="string"?m:JSON.stringify(m))).join("\uFF1B")}</p>`:""}<div class="wg-detail-artifacts"><span>\u4EA4\u4ED8\u4EA7\u7269</span>${i.length?i.map(m=>`<span class="wg-artifact-reference" title="${ut(m)}">${ut(t.get(m)?.title||m)}<small>${ut(m)}</small></span>`).join(""):'<span class="wg-no-artifact">\u5C1A\u65E0\u5173\u8054\u4EA7\u7269</span>'}</div></section>`}function th(n,e={}){let t=Yu(vc(n),e.replayAt),i=e.view==="time"?"time":"flow",s=En(t.nodes),r=En(t.currentNodeIds),a=s.find(u=>u.id===e.selectedNodeId)||s.find(u=>r.includes(u.id))||s.find(u=>u.id==="close"&&u.status==="completed")||s[0],o=a?.id||null,l=r[0]||o,c=eh(n.id,"panel");return t.available?`<section class="wg-visualization" aria-label="\u534F\u4F5C\u6D41\u7A0B\u53EF\u89C6\u5316"><div class="wg-toolbar"><div><h3>\u534F\u4F5C\u6D41\u7A0B\u56FE</h3><p>${i==="flow"?"\u6CBF\u7BAD\u5934\u67E5\u770B\u4EFB\u52A1\u5728\u4EBA\u3001AI \u548C\u7CFB\u7EDF\u4E4B\u95F4\u7684\u4EA4\u63A5\u3002":"\u5728\u540C\u4E00\u65F6\u95F4\u8F74\u4E0A\uFF0C\u67E5\u770B\u6267\u884C\u3001\u7B49\u5F85\u548C\u5E76\u884C\u533A\u95F4\u3002"}</p></div><div class="wg-tools"><div class="wg-view-tabs" role="tablist" aria-label="\u5DE5\u4F5C\u6D41\u89C6\u56FE"><button type="button" role="tab" aria-selected="${i==="flow"}" aria-controls="${c}" data-workflow-view="flow">\u534F\u4F5C\u6D41\u7A0B</button><button type="button" role="tab" aria-selected="${i==="time"}" aria-controls="${c}" data-workflow-view="time">\u65F6\u95F4\u5206\u5E03</button></div><button type="button" class="wg-focus" data-workflow-focus-current="${ut(l)}" ${l?"":"disabled"}>${vm}${r.length?"\u5B9A\u4F4D\u5F53\u524D\u8282\u70B9":"\u5B9A\u4F4D\u7ED3\u675F\u8282\u70B9"}</button></div></div><div class="wg-legend"><span><i class="completed"></i>\u5DF2\u5B8C\u6210</span><span><i class="current"></i>\u5F53\u524D\u5904\u7406 / \u7B49\u5F85</span><span><i class="pending"></i>\u672A\u5F00\u59CB\u8282\u70B9</span><span><i class="failed"></i>\u5931\u8D25 / \u9700\u6838\u5B9E</span><small>\u865A\u7EBF\uFF1A\u6D41\u7A0B\u5173\u7CFB\uFF08\u672A\u9010\u6761\u786E\u8BA4\u4EA4\u63A5\uFF09</small></div>${Sm(t)}<div id="${c}" class="wg-view-panel" role="tabpanel" aria-label="${i==="flow"?"\u534F\u4F5C\u6D41\u7A0B":"\u65F6\u95F4\u5206\u5E03"}">${i==="flow"?Ju(t,n,o)+Ju(t,n,o,!0):Mm(t)+Tm(t,o)}</div>${Am(t,a)}${e.error?`<p class="wg-load-warning" role="status">${ut(e.error.message||e.error)} \u56FE\u4E2D\u4FDD\u7559\u6700\u8FD1\u6210\u529F\u8BFB\u53D6\u7684\u8BB0\u5F55\u3002</p>`:""}</section>`:`<section class="wg-visualization" aria-label="\u534F\u4F5C\u6D41\u7A0B\u53EF\u89C6\u5316"><div class="wg-toolbar"><h3>\u534F\u4F5C\u6D41\u7A0B\u56FE</h3></div><div class="wg-empty"><p>${e.loading?"\u6B63\u5728\u8BFB\u53D6\u5B9E\u9645\u4EFB\u52A1\u548C\u4EA4\u63A5\u8BB0\u5F55\u2026":"\u8FD9\u6761\u4EFB\u52A1\u8FD8\u6CA1\u6709\u53EF\u6838\u9A8C\u7684\u6D41\u7A0B\u8BB0\u5F55\u3002"}</p><p>\u8BB0\u5F55\u5C31\u7EEA\u540E\uFF0C\u4EBA\u4E0E AI \u7684\u4EA4\u63A5\u5C06\u663E\u793A\u5728\u540C\u4E00\u5F20\u56FE\u4E0A\u3002</p></div></section>`}var Ke=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),on=n=>Array.isArray(n)?n:[],nh={human:"\u4EBA",ai:"AI",system:"\u7CFB\u7EDF",unknown:"\u672A\u786E\u8BA4"},ih={completed:"\u5DF2\u5B8C\u6210",current:"\u8FDB\u884C\u4E2D",pending:"\u5C1A\u672A\u5F00\u59CB",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",interrupted:"\u5DF2\u4E2D\u65AD",unknown:"\u8BB0\u5F55\u5F85\u6838\u5B9E"},Cm={ai_active:"AI \u601D\u8003\u4E0E\u6267\u884C",ai_tool_wait:"\u7B49\u5F85\u5DE5\u5177\u8FD4\u56DE",ai_queue:"\u7B49\u5F85\u6A21\u578B\u5F00\u59CB",ai_wait_human:"AI \u7B49\u5F85\u4EBA\u5DE5\u53CD\u9988",human_wait:"\u5F85\u4EBA\u5DE5\u54CD\u5E94",field_work:"\u73B0\u573A\u6267\u884C\u9636\u6BB5",observation:"\u6548\u679C\u89C2\u5BDF",unknown:"\u9636\u6BB5\u8BB0\u5F55"},Rm={analysis:"\u5206\u6790\u7ED3\u679C",work_order:"\u7EF4\u4FEE\u5DE5\u5355",observation:"\u89C2\u5BDF\u7ED3\u679C",agent_run:"AI \u8FD0\u884C\u8BB0\u5F55",approval:"\u6279\u51C6\u8BB0\u5F55"},Im=["triage","analysis_efficiency","analysis_maintenance","proposal","decision","dispatch","accept","execution","technical_review","acceptance","observation","close"],Mc='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';function Ii(n){if(n==null||n===""||!Number.isFinite(Number(n))||Number(n)<0)return"\u672A\u8BB0\u5F55";let e=Math.floor(Number(n));if(e<60)return`${e} \u79D2`;let t=Math.floor(e/60);if(t<60)return`${t} \u5206 ${e%60} \u79D2`;let i=Math.floor(t/60);return i<24?`${i} \u5C0F\u65F6 ${t%60} \u5206`:`${Math.floor(i/24)} \u5929 ${i%24} \u5C0F\u65F6`}function Pm(n){let e=on(n).map((s,r)=>({step:s,index:r})),t=s=>{let r=Date.parse(s.start_at),a=Date.parse(s.end_at);return Number.isFinite(r)?r:Number.isFinite(a)?a:1/0},i=s=>{let r=Im.indexOf(s.stage_id);return r<0?1/0:r};return{actual:e.filter(({step:s})=>s.status!=="pending").sort((s,r)=>t(s.step)-t(r.step)||s.index-r.index).map(({step:s})=>s),pending:e.filter(({step:s})=>s.status==="pending").sort((s,r)=>i(s.step)-i(r.step)||s.index-r.index).map(({step:s})=>s)}}function rs(n){if(!n)return"\u672A\u8BB0\u5F55";let e=new Date(n);return Number.isNaN(e.getTime())?"\u672A\u8BB0\u5F55":e.toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})}function Es(n={}){n=n||{};let e=Object.hasOwn(nh,n.actor_type)?n.actor_type:"unknown";return`<span class="workflow-person ${e}" title="${Ke(n.actor_id||n.role||"\u8EAB\u4EFD\u672A\u8BB0\u5F55")}"><span class="workflow-lane">${nh[e]}</span><strong>${Ke(n.role_label||n.label||n.role||"\u5F85\u660E\u786E\u8D1F\u8D23\u4EBA")}</strong></span>`}function as(n,e,t=!1){return(Object.hasOwn(e,n)?e[n]:t)?" open":""}function Dm(n){return new Map(["analyses","work_orders","observations","agent_runs"].flatMap(e=>on(n[e]).map(t=>[t.id,t])))}function Lm(n,e){let{records:t,options:i}=e,s=t.get(n.id);if(!s)return'<p class="workflow-empty">\u672C\u9875\u6CA1\u6709\u66F4\u8BE6\u7EC6\u7684\u4EA7\u7269\u5185\u5BB9\uFF1B\u8BB0\u5F55\u7F16\u53F7\u53EF\u7528\u4E8E\u8FFD\u6EAF\u3002</p>';if(n.kind==="analysis"){let r=s.raw??s.result??s.output;if(typeof r=="string")try{r=JSON.parse(r)}catch{return`<p class="result-prose">${Ke(r)}</p>`}if(r&&typeof r=="object"&&!Array.isArray(r)&&i.renderAnalysis)return`<div class="analysis-result">${i.renderAnalysis(r.analysis||r.result||r)}</div>`}if(n.kind==="observation"&&i.renderObservation){let r=`${e.item.id}:observation-evidence:${n.id}`;return i.renderObservation({observation:s}).replace("<details>",`<details data-workflow-expand="${Ke(r)}"${as(r,e.expanded)}>`)}if(n.kind==="work_order")return`<dl class="workflow-record-fields"><div><dt>\u5DE5\u5355\u72B6\u6001</dt><dd>${Ke(s.status_label||s.status||s.state||"\u672A\u8BB0\u5F55")}</dd></div><div><dt>\u5904\u7F6E\u5185\u5BB9</dt><dd>${Ke(s.description||s.proposal?.description||s.title||"\u672A\u8BB0\u5F55")}</dd></div><div><dt>\u521B\u5EFA\u65F6\u95F4</dt><dd>${rs(s.created_at)}</dd></div></dl><button type="button" class="text-button" data-workflow-scroll="work-order-${Ke(s.id)}">\u67E5\u770B\u5DE5\u5355\u4E0E\u529E\u7406\u52A8\u4F5C${Mc}</button>`;if(n.kind==="agent_run"){let r=s.result||s.output,a=typeof r=="string"?r:r?.summary;return`<dl class="workflow-record-fields"><div><dt>\u8FD0\u884C\u72B6\u6001</dt><dd>${Ke(s.status||s.state||"\u672A\u8BB0\u5F55")}</dd></div><div><dt>\u8FD0\u884C\u7F16\u53F7</dt><dd>${Ke(s.id)}</dd></div></dl>${a?`<p>${Ke(a)}</p>`:""}${s.error?`<p class="workflow-warning">${Ke(typeof s.error=="string"?s.error:s.error.message||"\u8FD0\u884C\u672A\u5B8C\u6210")}</p>`:""}`}return'<p class="workflow-empty">\u8BE6\u7EC6\u5185\u5BB9\u4EE5\u5BF9\u5E94\u4E1A\u52A1\u8BB0\u5F55\u4E3A\u51C6\u3002</p>'}function sh(n,e){return on(n).length?`<div class="workflow-artifacts">${on(n).map(t=>{let i=e.artifacts.get(t);if(!i)return`<p class="workflow-empty">\u4EA7\u7269 ${Ke(t)} \xB7 \u6458\u8981\u5C1A\u672A\u63D0\u4F9B</p>`;let s=`${e.item.id}:artifact:${t}`;return`<details class="workflow-artifact" data-workflow-expand="${Ke(s)}"${as(s,e.expanded)}><summary><span>${Ke(Rm[i.kind]||"\u4E1A\u52A1\u4EA7\u7269")}</span><strong>${Ke(i.title||t)}</strong><small>${Ke(t)}</small></summary><div class="workflow-artifact-body">${i.summary?`<p>${Ke(i.summary)}</p>`:""}${i.recorded_at?`<p class="small-note">\u8BB0\u5F55\u4E8E ${rs(i.recorded_at)}\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09</p>`:""}${Lm(i,e)}</div></details>`}).join("")}</div>`:""}function Nm(n,e){let t=Object.hasOwn(ih,n.status)?n.status:"unknown",i=t==="current",s=t==="pending",r=Cm[n.duration_kind]||"\u9636\u6BB5\u8BB0\u5F55",a=`${e.item.id}:step:${n.id}`,o=["ai_tool_wait","ai_queue","ai_wait_human","human_wait"].includes(n.duration_kind),l=i&&o?"\u7B49\u5F85\u4E2D":ih[t],c=s?"\u672A\u5F00\u59CB":Ii(n.duration_seconds),u=s?"\u5C1A\u672A\u8FDB\u5165\u6B64\u9636\u6BB5":`${rs(n.start_at)} \u2014 ${n.end_at?rs(n.end_at):i?"\u8FDB\u884C\u4E2D":"\u7ED3\u675F\u65F6\u95F4\u672A\u8BB0\u5F55"}`,m=on(n.notes).length?n.notes:n.notes?[n.notes]:[];return`<li class="workflow-step ${Ke(t)}" data-workflow-step="${Ke(n.id)}" data-workflow-stage="${Ke(n.stage_id)}"><details data-workflow-expand="${Ke(a)}"${as(a,e.expanded,i)}><summary><span class="workflow-step-marker" aria-hidden="true"></span><span class="workflow-step-main"><span class="workflow-step-heading"><strong>${Ke(n.title||r)}</strong><span class="workflow-step-status ${Ke(t)}">${l}</span></span><span class="workflow-step-meta">${Es(n)}<span>${Ke(r)}</span>${n.attempt?`<span>\u7B2C ${Ke(n.attempt)} \u6B21\u5C1D\u8BD5</span>`:""}${n.parallel_group?"<span>\u5E76\u884C\u5904\u7406</span>":""}</span><span class="workflow-time-range">${Ke(u)}</span></span><span class="workflow-step-duration"><strong>${c}</strong><small>${i?"\u5DF2\u6301\u7EED":s?"\u5F85\u53D1\u751F":"\u9636\u6BB5\u7528\u65F6"}</small></span></summary><div class="workflow-step-content">${n.duration_kind==="field_work"?'<p class="small-note">\u8FD9\u91CC\u8BB0\u5F55\u73B0\u573A\u6267\u884C\u9636\u6BB5\u7684\u7ECF\u8FC7\u65F6\u95F4\uFF1B\u4EBA\u5DE5\u5B9E\u9645\u6295\u5165\u5DE5\u65F6\u5C1A\u672A\u6253\u70B9\u3002</p>':n.duration_kind==="human_wait"?'<p class="small-note">\u5F85\u4EBA\u5DE5\u54CD\u5E94\u533A\u95F4\u53EF\u80FD\u5305\u542B\u5BA1\u9605\u4E0E\u601D\u8003\uFF0C\u4E0D\u7B49\u540C\u4E8E\u7EAF\u6392\u961F\u65F6\u95F4\u3002</p>':""}${m.map(h=>`<p>${Ke(typeof h=="string"?h:JSON.stringify(h))}</p>`).join("")}${on(n.evidence_refs).length?`<p class="workflow-evidence">\u8BC1\u636E\u5F15\u7528\uFF1A${n.evidence_refs.map(Ke).join("\uFF1B")}</p>`:""}${sh(n.artifact_ids,e)}${on(n.artifact_ids).length?"":`<p class="workflow-empty">${s?"\u8FDB\u5165\u6B64\u9636\u6BB5\u540E\uFF0C\u4EA7\u7269\u548C\u8BB0\u5F55\u4F1A\u5728\u8FD9\u91CC\u51FA\u73B0\u3002":"\u6B64\u9636\u6BB5\u5C1A\u65E0\u5173\u8054\u4EA7\u7269\u3002"}</p>`}${on(n.source_refs).length?`<small class="workflow-source">\u4F9D\u636E ${n.source_refs.map(h=>Ke(typeof h=="string"?h:JSON.stringify(h))).join(" \xB7 ")}</small>`:""}</div></details></li>`}function Um(n,e){if(!n.length)return"";let t=`${e.item.id}:future`;return`<details class="workflow-future" data-workflow-expand="${Ke(t)}"${as(t,e.expanded)}><summary>\u540E\u7EED\u6D41\u7A0B <span>${n.length} \u4E2A\u9636\u6BB5\u5C1A\u672A\u5F00\u59CB</span></summary><p>\u4EE5\u4E0B\u662F\u5C1A\u672A\u8FDB\u5165\u7684\u8BA1\u5212\u73AF\u8282\uFF1B\u5B9E\u9645\u53D1\u751F\u7684\u5904\u7406\u3001\u91CD\u8BD5\u4E0E\u4EA4\u63A5\u4F1A\u8FDB\u5165\u4E0A\u65B9\u65F6\u95F4\u8F74\u3002</p><ol>${n.map(i=>`<li data-workflow-step="${Ke(i.id)}"><span class="workflow-future-node" aria-hidden="true"></span><strong>${Ke(i.title||i.stage_id||"\u540E\u7EED\u9636\u6BB5")}</strong>${Es(i)}<small>\u5C1A\u672A\u5F00\u59CB</small></li>`).join("")}</ol></details>`}function rh(n,e={}){let t=n.workflow;if(!t)return`<section class="workflow-panel"><h3>\u4EBA\u548C AI \u7684\u4EFB\u52A1\u4EA4\u63A5</h3><p class="workflow-empty">${e.loading?"\u6B63\u5728\u8BFB\u53D6\u53EF\u6838\u9A8C\u7684\u4EA4\u63A5\u8BB0\u5F55\u3002":"\u8FD9\u6761\u4EFB\u52A1\u5C1A\u65E0\u53EF\u6838\u9A8C\u7684\u4EA4\u63A5\u65F6\u95F4\u8BB0\u5F55\u3002"}\u6CA1\u6709\u65F6\u95F4\u8BB0\u5F55\u7684\u9636\u6BB5\u4E0D\u4F1A\u8865\u7B97\u4E3A\u5DF2\u5B8C\u6210\u3002</p></section>`;let i=e.expanded||{},s=t.current||{},r=t.metrics||{},a={item:n,options:e,expanded:i,records:Dm(n),artifacts:new Map(on(t.artifacts).map(p=>[p.id,p]))},o=on(s.participants).length?s.participants:[s],l=on(t.next_responsibilities),{actual:c,pending:u}=Pm(t.steps),m=on(t.handoffs),h={executing:"\u6B63\u5728\u5904\u7406",waiting:"\u6B63\u5728\u7B49\u5F85",complete:"\u672C\u8F6E\u5DF2\u7ED3\u675F",blocked:"\u5F53\u524D\u53D7\u963B"},d=[...on(t.notes),...on(r.unknown_reasons)],_=`${n.id}:timing`,x=`${n.id}:handoffs`,g=`${n.id}:records`;return`<section class="workflow-panel" aria-label="\u4EBA\u548CAI\u7684\u771F\u5B9E\u4EFB\u52A1\u4EA4\u63A5">${th(n,e)}<details class="workflow-records" data-workflow-records data-workflow-expand="${Ke(g)}"${as(g,i)}><summary>\u8BE6\u7EC6\u8BB0\u5F55\u4E0E\u8BC1\u636E <span>${c.length} \u6BB5\u6D3B\u52A8 \xB7 ${m.length} \u6B21\u4EA4\u63A5</span></summary><div class="workflow-section-heading"><h3>\u4EBA\u548C AI \u7684\u4EFB\u52A1\u4EA4\u63A5</h3><small>\u622A\u81F3 ${rs(t.generated_at)}</small></div><div class="workflow-current ${Ke(s.status||"unknown")}"><div class="workflow-current-owner"><span class="workflow-label">${h[s.status]||"\u5F53\u524D\u72B6\u6001\u5F85\u6838\u5B9E"}</span><h4>${Ke(s.label||"\u7B49\u5F85\u660E\u786E\u5F53\u524D\u9636\u6BB5")}</h4><div class="workflow-participants">${o.map(Es).join("")}</div>${s.reason?`<p>${Ke(s.reason)}</p>`:""}<small>${s.started_at?`\u5F00\u59CB\u4E8E ${rs(s.started_at)} \xB7 \u5DF2\u6301\u7EED ${Ii(s.elapsed_seconds)}`:"\u5F53\u524D\u9636\u6BB5\u5F00\u59CB\u65F6\u95F4\u672A\u8BB0\u5F55"}</small></div><div class="workflow-next"><span class="workflow-label">${s.status==="complete"?"\u540E\u7EED\u5B89\u6392":"\u4E0B\u4E00\u6B65\u4EA4\u7ED9"}</span>${l.length?l.map(p=>`<div>${Es(p)}<p>${Ke(p.action||"\u540E\u7EED\u52A8\u4F5C\u5F85\u660E\u786E")}</p></div>`).join(""):`<p>${s.status==="complete"?"\u672C\u8F6E\u5DF2\u7ED3\u675F\uFF0C\u6682\u65E0\u540E\u7EED\u4EA4\u63A5\u3002":"\u540E\u7EED\u63A5\u68D2\u4EBA\u5C1A\u672A\u660E\u786E\u3002"}</p>`}<button type="button" class="text-button" data-workflow-scroll="case-action-area">\u67E5\u770B\u529E\u7406\u4E8B\u9879${Mc}</button></div></div><div class="workflow-totals"><div><span>\u4EFB\u52A1\u7ECF\u8FC7\u65F6\u95F4</span><strong>${Ii(r.wall_elapsed_seconds)}</strong></div><div><span>AI \u6D3B\u8DC3\u65F6\u95F4</span><strong>${Ii(r.ai_active_seconds)}</strong></div><div><span>\u5F85\u4EBA\u5DE5\u54CD\u5E94</span><strong>${Ii(r.human_wait_seconds)}</strong></div><div><span>\u4EBA\u5DE5\u5B9E\u9645\u5DE5\u65F6</span><strong>${r.human_work_seconds===null||r.human_work_seconds===void 0?"\u672A\u6253\u70B9":Ii(r.human_work_seconds)}</strong></div></div><details class="workflow-timing-note" data-workflow-expand="${Ke(_)}"${as(_,i)}><summary>\u8017\u65F6\u53E3\u5F84\u4E0E\u7F3A\u5931\u8BB0\u5F55</summary><p>AI \u5E76\u884C\u6D3B\u52A8\u6309\u65F6\u95F4\u533A\u95F4\u5408\u5E76\u8BA1\u7B97\uFF0C\u5404\u7C7B\u8017\u65F6\u4E0D\u80FD\u76F8\u52A0\u4E3A\u4EFB\u52A1\u603B\u8017\u65F6\u3002\u5F85\u4EBA\u5DE5\u54CD\u5E94\u53EF\u80FD\u5305\u542B\u5BA1\u9605\uFF1B\u73B0\u573A\u6267\u884C\u9636\u6BB5\u7684\u7ECF\u8FC7\u65F6\u95F4\u4E0D\u7B49\u4E8E\u4EBA\u5DE5\u5B9E\u9645\u5DE5\u65F6\u3002</p>${d.length?`<ul>${d.map(p=>`<li>${Ke(typeof p=="string"?p:JSON.stringify(p))}</li>`).join("")}</ul>`:""}<p>\u65F6\u95F4\u6765\u81EA\u6301\u4E45\u5316\u4E1A\u52A1\u8BB0\u5F55\uFF0C\u672A\u8BB0\u5F55\u7684\u5F00\u59CB\u3001\u7ED3\u675F\u6216\u8017\u65F6\u4FDD\u6301\u4E3A\u7A7A\u3002\u6240\u6709\u65F6\u523B\u6309\u5317\u4EAC\u65F6\u95F4\u663E\u793A\u3002</p></details><div class="workflow-section-heading workflow-history-heading"><h4>\u9636\u6BB5\u4E0E\u4EA7\u7269</h4><span>\u6309\u4E1A\u52A1\u8BB0\u5F55\u5C55\u5F00\u67E5\u770B</span></div>${c.length?`<ol class="workflow-steps">${c.map(p=>Nm(p,a)).join("")}</ol>`:'<p class="workflow-empty">\u5C1A\u65E0\u53EF\u5C55\u793A\u7684\u9636\u6BB5\u8BB0\u5F55\u3002</p>'}${Um(u,a)}<details class="workflow-handoffs" data-workflow-expand="${Ke(x)}"${as(x,i)}><summary>\u5DF2\u53D1\u751F\u7684\u4EA4\u63A5 <span>${m.length} \u6B21</span></summary>${m.length?`<ol>${m.map(p=>`<li><time>${rs(p.timestamp)}</time><div><strong>${Ke(p.title||"\u4EFB\u52A1\u4EA4\u63A5")}</strong><div class="workflow-handoff-people">${Es(p.from)}${Mc}${Es(p.to)}</div>${p.notes?`<p>${Ke(Array.isArray(p.notes)?p.notes.join("\uFF1B"):p.notes)}</p>`:""}${on(p.evidence_refs).length?`<small>\u8BC1\u636E\u5F15\u7528\uFF1A${p.evidence_refs.map(Ke).join("\uFF1B")}</small>`:""}${sh(p.artifact_ids,a)}</div></li>`).join("")}</ol>`:'<p class="workflow-empty">\u8FD8\u6CA1\u6709\u5DF2\u8BB0\u5F55\u7684\u4EA4\u63A5\u3002</p>'}</details></details>${e.error?`<p class="workflow-warning" role="status">${Ke(e.error.message||e.error)} \u4EA4\u63A5\u72B6\u6001\u4FDD\u7559\u6700\u540E\u4E00\u6B21\u6210\u529F\u56DE\u8BFB\u7ED3\u679C\u3002</p>`:""}</section>`}var Om=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),we=Om,xt=n=>Array.isArray(n)?n:[],Nn=n=>typeof n=="string"?n:Array.isArray(n)?n.map(Nn).join(`
`):n&&typeof n=="object"?n.text||n.label||n.name||n.summary||"":String(n??""),Hn=n=>n&&Number.isFinite(Date.parse(n))?new Date(n).toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}):"\u5C1A\u672A\u8BB0\u5F55",ah=n=>n==null?"\u672A\u8BB0\u5F55":Ii(n).replace(/ 分 \d+ 秒$/," \u5206"),Ec={...oi,business_owner:"\u4E1A\u52A1\u8D1F\u8D23\u4EBA",technician:"\u7EF4\u4FEE\u6280\u5E08",technical_reviewer:"\u6280\u672F\u590D\u6838\u4EBA",acceptor:"\u9A8C\u6536\u4EBA",user:"\u4F60",system:"\u4E1A\u52A1\u670D\u52A1"},Fm=n=>Ec[n]||Ec[n==="demo-owner"?"business_owner":String(n||"").replace(/^demo-/,"").replaceAll("-","_")]||n,Pi=n=>typeof n=="object"?n?.name||n?.label||n?.role_label||Ec[n?.role]||"\u5F85\u660E\u786E\u8D1F\u8D23\u4EBA":Fm(n)||"\u5F85\u660E\u786E\u8D1F\u8D23\u4EBA";var Tc=n=>`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{close:'<path d="m6 6 12 12M18 6 6 18"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',play:'<path d="m8 4 12 8-12 8V4Z"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',file:'<path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8m-8 4h6"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>'}[n]||""}</svg>`,kt=(n,e,t="",i=!1,s=!1)=>`<button type="button" class="button ${i?"primary":""}" data-employee-action="${n}" ${t} ${s?"disabled":""}>${e}</button>`,oh=n=>n?`<div class="employee-error" role="alert">${we(n.message||n)}</div>`:"",wt=(n,e,t="",i={})=>`<label class="employee-field">${we(e)}${i.multiline?`<textarea name="${n}" rows="${i.rows||3}" ${i.required?"required":""}>${we(Nn(t))}</textarea>`:`<input name="${n}" type="${i.type||"text"}" value="${we(Nn(t))}" ${i.required?"required":""} ${i.min!==void 0?`min="${i.min}"`:""} ${i.max!==void 0?`max="${i.max}"`:""}/>`}</label>`,Sr=(n,e,t,i)=>`<label class="employee-field">${we(e)}<select name="${n}">${i.map(([s,r])=>`<option value="${we(s)}" ${String(t)===String(s)?"selected":""}>${we(r)}</option>`).join("")}</select></label>`;function Ac(n){return["collaboration","handoff","assistance","delegation"].includes(n.kind)||["review","rework"].includes(n.kind)&&n.recipient&&n.recipient!=="user"&&n.author!=="user"}function Cc(n=[],{caseId:e="",role:t="manager",includeCollaboration:i=!1,global:s=!1}={}){let r=String(e||"");return xt(n).filter(a=>s||String(a.case_id||"")===r).filter(a=>i||!Ac(a)).filter(a=>t==="manager"?s?a.author==="manager"||a.recipient==="manager"||a.turn_id||a.author==="system":!0:a.author===t||a.recipient===t).map((a,o)=>({message:a,index:o})).sort((a,o)=>(Date.parse(a.message.at||a.message.created_at)||0)-(Date.parse(o.message.at||o.message.created_at)||0)||a.index-o.index).map(({message:a})=>a)}function Ts(n=[]){return xt(n).filter(e=>e?.id).map(e=>`<button type="button" class="employee-artifact" data-employee-action="artifact" data-id="${we(e.id)}">${Tc("file")}${we(e.label||e.title||e.id)}</button>`).join("")}function km(n){if(n.author!=="user"||!n.deliveryState)return"";let e={sending:"\u6B63\u5728\u53D1\u9001\u2026",checking:"\u6B63\u5728\u6838\u5BF9\u662F\u5426\u9001\u8FBE\u2026",sent:"\u5DF2\u9001\u8FBE",failed:"\u53D1\u9001\u5931\u8D25"},t=["checking","failed"].includes(n.deliveryState),i=n.deliveryState==="failed"&&n.error?n.error:e[n.deliveryState];return i?`<small class="chat-delivery-status" role="status">${we(i)}${t?` <button type="button" class="text-button" data-chat-retry="${we(n.id)}">\u91CD\u8BD5</button>`:""}</small>`:""}function Ha(n=[],e=[],t={}){let i=new Map(xt(e).map(a=>[a.id,a])),s=(a,o)=>{let l=i.get(a[o]);return a[o+"_name"]?a[o+"_name"]:l?.prior_display_name&&Date.parse(a.at||a.created_at)<Date.parse(l.role_renamed_at)?l.prior_display_name:l?.name||Pi(a[o])},r={ack:"\u6536\u5230",received:"\u6536\u5230",progress:"\u8FDB\u5C55",result:"\u4EA4\u4ED8",delivery:"\u4EA4\u4ED8",approval:"\u8BF7\u4F60\u786E\u8BA4",decision:"\u51B3\u5B9A",handoff:"\u4EA4\u63A5",collaboration:"\u534F\u4F5C",assistance:"\u534F\u4F5C",delegation:"\u6D3E\u6D3B",stopped:"\u5DF2\u505C\u6B62",routine:"\u4F8B\u884C\u6C47\u62A5",memory:"\u5DF2\u8BB0\u4E0B"};return xt(n).map(a=>`<article class="employee-message ${a.author==="user"?"from-user":""}" data-message-id="${we(a.id)}"><div class="employee-message-meta">${is(a.author,s(a,"author"))}<strong>${we(s(a,"author"))}</strong>${r[a.kind]?`<span>${r[a.kind]}</span>`:""}${gc(a,t.cases)?`<span class="employee-message-device">${we(gc(a,t.cases))}</span>`:""}<time>${Hn(a.at||a.created_at)}</time></div><p>${we(a.text||a.content)}</p>${a.recipient&&a.recipient!=="user"?`<small>\u4EA4\u7ED9 ${we(s(a,"recipient"))}</small>`:""}${Ts(xt(a.artifacts).filter(o=>o.type!=="conversation_action"))}${xt(a.artifacts).filter(o=>o.type==="conversation_action").map(o=>{let l=xt(t.conversationActions).find(c=>c.id===o.id);return l?za(l,{busy:t.busy,...$u(a,l)}):Ts([o])}).join("")}${km(a)}</article>`).join("")}function Bm(n={}){let e=n.comparison||n.metrics||{},i=(Array.isArray(e)?e:Object.entries(e).map(([r,a])=>({key:r,...a}))).filter(r=>Number.isFinite(r.before)&&Number.isFinite(r.after)),s=n.source_label||(n.synthetic===!0?"\u5408\u6210\u6570\u636E":n.synthetic===!1?"\u771F\u5B9E\u6570\u636E":"\u6570\u636E\u6765\u6E90\u89C1\u8BB0\u5F55");return`<section class="employee-results"><h3>\u7ED3\u679C</h3><p>${we(n.summary||"\u8FD8\u6CA1\u6709\u5F62\u6210\u6700\u7EC8\u7ED3\u679C\u3002")}</p>${n.comparable===!1||!i.length?`<p class="employee-muted">${we(n.missing_reason||n.reason||"\u7F3A\u5C11\u53EF\u6BD4\u7684\u524D\u540E\u6570\u636E\uFF0C\u6682\u4E0D\u5224\u65AD\u6539\u5584\u5E45\u5EA6\u3002")}</p>`:`<div class="employee-comparison">${i.map(r=>{let a=Math.max(r.before,r.after,1),o=u=>new Intl.NumberFormat("zh-CN",{maximumFractionDigits:r.key==="short_stop_count"?0:1}).format(u),l=r.label||{short_stop_count:"\u77ED\u505C\u6B21\u6570",short_stop_minutes:"\u77ED\u505C\u65F6\u957F",oee:"OEE",OEE_pct:"OEE"}[r.key]||r.key,c=r.unit||(["oee","OEE_pct"].includes(r.key)?"%":"");return`<div><strong>${we(l)}</strong><div class="comparison-row"><span>\u5904\u7406\u524D</span><div class="comparison-track"><i style="width:${Math.max(0,r.before/a*100)}%"></i></div><b>${we(o(r.before))}${we(c)}</b></div><div class="comparison-row after"><span>\u5904\u7406\u540E</span><div class="comparison-track"><i style="width:${Math.max(0,r.after/a*100)}%"></i></div><b>${we(o(r.after))}${we(c)}</b></div></div>`}).join("")}</div>`}<details class="employee-source-detail"><summary>\u6570\u636E\u6765\u6E90\u4E0E\u6BD4\u8F83\u7A97\u53E3</summary><small>${we(s)}${n.window_label?` \xB7 ${we(n.window_label)}`:""}</small></details></section>`}function zm(n={}){if(!Number.isFinite(n.short_stop_count))return"\u6570\u636E\u4E0D\u8DB3";let e=n.data_coverage_pct;if(Number.isFinite(e)&&e<=0||Array.isArray(n.event_ids)&&n.event_ids.length===0)return"\u6570\u636E\u4E0D\u8DB3";let t=new Intl.NumberFormat("zh-CN",{maximumFractionDigits:0}).format(n.short_stop_count);return Number.isFinite(e)&&e<100||xt(n.issues).includes("insufficient_state_coverage")?`\u5DF2\u8BB0\u5F55 ${t} \u6B21\uFF08\u8986\u76D6\u4E0D\u8DB3\uFF09`:Number.isFinite(e)?t:`\u5DF2\u8BB0\u5F55 ${t} \u6B21\uFF08\u8986\u76D6\u5F85\u6838\u5B9E\uFF09`}function $m(n={},e=[],t=[]){let i=n.data||{},s=n.author||i.author||i.employee_id||i.role||i.kind||xt(e).find(r=>r.id===i.routine_id)?.employee_id;return xt(t).find(r=>r.id===s)?.name||Pi(s||(n.type==="report"?"\u4E1A\u52A1\u670D\u52A1\u751F\u6210\u7684\u4F8B\u884C\u62A5\u544A":null))}function wc(n){return xt(n.timeline).map((e,t)=>({id:e.id||`timeline-${t}`,at:e.at||e.timestamp||e.created_at||e.start_at,author:e.actor_label||e.actor?.role_label||e.role_label||e.author||e.actor||"system",text:e.text||e.summary||e.label||e.description||e.action,artifacts:e.artifacts||[],kind:e.kind||e.actor_type}))}function Vm(n={},e={}){let t=String(e.state||e.status||n.status||"").toUpperCase();return["CLOSED","COMPLETED"].includes(t)?{current:"\u8FD9\u4EF6\u4E8B\u5DF2\u5B8C\u6210\uFF0C\u5904\u7406\u548C\u9A8C\u6536\u8BB0\u5F55\u5DF2\u4FDD\u5B58\u3002",next:"\u67E5\u770B\u5904\u7406\u7ED3\u679C\u548C\u5B8C\u6574\u8BB0\u5F55\u3002"}:t==="CANCELLED"?{current:"\u8FD9\u4EF6\u4E8B\u5DF2\u53D6\u6D88\u3002",next:"\u67E5\u770B\u4FDD\u7559\u7684\u5904\u7406\u8BB0\u5F55\uFF1B\u5DF2\u6709\u5DE5\u5355\u4EE5\u5404\u81EA\u72B6\u6001\u4E3A\u51C6\u3002"}:t==="DISMISSED"?{current:"\u8FD9\u6761\u5F02\u5E38\u5DF2\u9A73\u56DE\u3002",next:"\u67E5\u770B\u9A73\u56DE\u4F9D\u636E\u548C\u539F\u59CB\u8BB0\u5F55\u3002"}:{current:n.current_action||e.next_action||e.title,next:n.next_action||"\u67E5\u770B\u4E0B\u9762\u7684\u529E\u7406\u8BB0\u5F55\u3002"}}function lh({api:n,sendWithReceipt:e,getState:t,onChange:i,onChat:s,onCase:r,renderBusiness:a,renderReplay:o,afterRefresh:l=()=>{},onMessages:c=()=>{},onClose:u=()=>{},onBusinessAction:m=()=>{},onReply:h=()=>{}}){let d={board:{},conversationActions:[],employees:[],memories:[],skills:[],routines:[],messages:[],tab:"tasks",mineOnly:!1,device:"",loaded:!1,loading:!1,busy:!1,error:null,panel:null,panelTab:"profile",employeeId:"manager",detail:null,artifact:null,decision:null,drafts:{},replayIndex:0,replayPlaying:!1,replayOpen:!1,disclosures:{},keys:{}},_=null,x=null,g=null,p=()=>{let z=globalThis.document?.activeElement,k=z?.closest?.("[data-employee-form]"),j=k&&z.name,oe=k?.dataset.employeeForm,ne=z?.tagName==="TEXTAREA"||z?.type==="text"?[z.selectionStart,z.selectionEnd]:null,Ae=globalThis.document?.querySelector(".employee-drawer-body"),Be=Ae?.scrollTop;i();let U=globalThis.document?.querySelector(".employee-drawer"),Ie=j?[...U?.querySelectorAll("[name]")||[]].find(he=>he.name===j&&he.closest("[data-employee-form]")?.dataset.employeeForm===oe):null;Ie?(Ie.focus({preventScroll:!0}),ne&&Ie.setSelectionRange(...ne)):U&&!U.contains(document.activeElement)&&U.querySelector("button")?.focus({preventScroll:!0});let Qe=U?.querySelector(".employee-drawer-body");Qe&&Be!==void 0&&(Qe.scrollTop=Be)},M=(z,k)=>{let j=JSON.stringify([z,k]);return d.keys[j]||(d.keys[j]=Ci())},E=(z,k={})=>d.drafts[z]||k,w=()=>d.detail?.case,R=z=>d.employees.find(k=>k.id===z)?.name||Pi(z),C=()=>d.busy;async function v({render:z=!0,force:k=!1}={}){if(_)return _;if(d.busy&&!k)return;let j=d.busy?null:g;return d.loading=!d.loaded,_=(async()=>{let oe=["messages","conversationActions"];(!d.employees.length||k)&&oe.push("employees"),["employees","routine","artifact"].includes(d.panel)&&oe.push("routines","memories","skills");let Ae=(await Promise.allSettled(oe.map(async Be=>{let U=await n[Be](),Ie=xt(U[Be==="conversationActions"?"actions":Be]),Qe=d[Be];d[Be]=Ie,Be==="messages"&&(Qe.length!==Ie.length||Qe.at(-1)?.id!==Ie.at(-1)?.id)&&c()}))).find(Be=>Be.status==="rejected")?.reason||null;if(j&&!Ae&&d.notice===j&&(d.notice=null,g=null),(!d.error||d.error===d.readError)&&(d.error=Ae),d.readError=Ae,d.loaded=!0,d.loading=!1,d.panel==="task"&&d.detail?.case?.id&&!d.replayPlaying){let Be=d.detail.case.id;try{let U=await n.taskDetail(Be);d.panel==="task"&&d.detail?.case?.id===Be&&(d.detail=y(U),r(d.detail.case))}catch(U){d.panel==="task"&&d.detail?.case?.id===Be&&(d.readError=U)}}z&&!I()&&p()})().finally(()=>{_=null}),_}function y(z){return{...z,case:{...gr(z.case||{}),work_orders:xt(z.case?.work_orders).map(Ba)}}}function I(){return d.panel&&["employees","decision","routine","remind"].includes(d.panel)||t().actionDraft||t().observationEditing}async function A(z,k="\u5DF2\u4FDD\u5B58\u5E76\u91CD\u65B0\u8BFB\u53D6\u3002"){if(!d.busy){d.busy=!0,d.error=null,d.notice=null,g=null,p();try{let j=await z();return d.notice=k,await v({render:!1,force:!0}),g=k||null,j}catch(j){return d.error=j,null}finally{d.busy=!1,p()}}}async function L(z,k=null){d.conversationAction=k,d.panel="task",d.detail=null,d.artifact=null,d.error=null,d.replayIndex=0,d.replayOpen=!1,O(),p();try{let j=await n.taskDetail(z);d.detail=y(j),r(d.detail.case)}catch(j){d.error=j}p()}function N(){d.panel=null,d.artifact=null,d.decision=null,d.error=null,O(),u(),p(),[...document.querySelectorAll("[data-employee-action]")].find(k=>k.dataset.employeeAction===d.returnFocus?.action&&k.dataset.id===d.returnFocus?.id)?.focus({preventScroll:!0})}function q(z){let k=d.board.tasks?.find(oe=>oe.approval?.id===z||oe.approval?.turn_id===z||oe.turn_id===z),j=[...xt(t().managerTurns),...xt(t().managerActiveTurns)].find(oe=>oe.id===z);return d.conversationActions.find(oe=>oe.approval?.id===z||oe.approval?.turn_id===z||oe.turn_id===z)?.approval||k?.approval||j&&{id:j.id,proposal:j.proposal,status:j.status,case_id:j.case_id}}function P(z,k){let j=q(z);if(!j){d.error=new Error("\u65B9\u6848\u8BB0\u5F55\u5DF2\u53D8\u5316\uFF0C\u8BF7\u5237\u65B0\u540E\u518D\u5904\u7406\u3002"),p();return}let oe=d.conversationActions.find(ne=>ne.approval?.id===z||ne.approval?.turn_id===z||ne.turn_id===z);if(oe&&oe.status!=="pending"){d.error=new Error("\u8FD9\u4EFD\u786E\u8BA4\u5DF2\u7ECF\u5904\u7406\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u7EED\u5B89\u6392\u3002"),p();return}d.decision={id:z,decision:k,approval:j,conversationAction:oe},d.panel="decision",d.error=null,p()}function O(){clearTimeout(x),d.replayPlaying=!1}function X(){let z=wc(d.detail||{});d.replayIndex<z.length-1?(d.replayIndex++,p(),d.replayPlaying&&(x=setTimeout(X,1500))):(O(),p())}let H=(z,k="\u4FDD\u5B58")=>`<div class="employee-form-actions">${kt(z,d.busy?"\u6B63\u5728\u4FDD\u5B58\u2026":k,"",!0,d.busy)}${kt("close","\u53D6\u6D88","",!1,d.busy)}</div>`,te=(z,k)=>`<form class="employee-form" data-employee-form="${we(z)}">${k}</form>`;function Z(){let z=d.context?.profile||d.employees.find(oe=>oe.id===d.employeeId)||{},k=`profile:${d.employeeId}`,j=E(k,z);return te(k,`<p class="employee-muted">\u6BCF\u6B21\u5DE5\u4F5C\u5148\u8BFB\u53D6\u8FD9\u4EFD\u8BF4\u660E\u3002\u5DE5\u5177\u6743\u9650\u7531\u4E1A\u52A1\u670D\u52A1\u6821\u9A8C\u3002</p>${wt("name","\u59D3\u540D",j.name,{required:!0})}${wt("title","\u5C97\u4F4D",j.title||j.job_title,{required:!0})}${wt("responsibilities","\u8D1F\u8D23\u4EC0\u4E48",j.responsibilities,{multiline:!0,required:!0})}${wt("exclusions","\u4E0D\u8D1F\u8D23\u4EC0\u4E48\uFF08\u6CA1\u6709\u5219\u586B\u201C\u65E0\u201D\uFF09",j.exclusions,{multiline:!0,required:!0})}${wt("allowed_tools","\u5141\u8BB8\u4F7F\u7528\u7684\u5DE5\u5177\uFF08\u6BCF\u884C\u4E00\u9879\uFF09",j.allowed_tools,{multiline:!0})}${wt("equipment_ids","\u53EF\u67E5\u770B\u7684\u8BBE\u5907\uFF08\u6BCF\u884C\u4E00\u4E2A\u7F16\u53F7\uFF0C* \u8868\u793A\u5168\u90E8\uFF09",j.equipment_ids,{multiline:!0})}${wt("approval_required","\u54EA\u4E9B\u52A8\u4F5C\u5FC5\u987B\u5148\u95EE\u4EBA",j.approval_required,{multiline:!0})}${wt("reports_to","\u6C47\u62A5\u7ED9\u8C01",j.reports_to,{required:!0})}${wt("deliverables","\u4EA4\u4ED8\u7269\u653E\u5728\u54EA\u91CC",j.deliverables,{multiline:!0,required:!0})}${H("save-profile")}`)}function re(){let z=d.memories.filter(ne=>ne.scope==="factory"||ne.employee_id===d.employeeId),k=z.find(ne=>ne.id===d.editMemory),j=`memory:${d.editMemory||"new"}`,oe=E(j,k||{});return`<p class="employee-muted">\u957F\u671F\u504F\u597D\u548C\u4E8B\u5B9E\u4F1A\u4FDD\u7559\u5728\u8FD9\u91CC\uFF1B\u5DE5\u5382\u5171\u4EAB\u8BB0\u5FC6\u53EF\u4F9B\u6240\u6709\u540C\u4E8B\u4F7F\u7528\u3002</p><div class="employee-records">${z.map(ne=>`<article><span>${ne.scope==="factory"?"\u5DE5\u5382\u5171\u4EAB":"\u4E2A\u4EBA\u8BB0\u5FC6"} \xB7 ${Hn(ne.updated_at||ne.created_at)}</span><p>${we(ne.text)}</p><small>\u6765\u6E90\uFF1A${we(ne.source||"\u5C1A\u672A\u8BF4\u660E")}</small><div>${kt("edit-memory","\u4FEE\u6539",`data-id="${we(ne.id)}"`)}${kt("delete-memory","\u5220\u9664",`data-id="${we(ne.id)}"`)}</div></article>`).join("")||"<p>\u8FD8\u6CA1\u6709\u957F\u671F\u8BB0\u5FC6\u3002\u53EF\u4EE5\u5728\u804A\u5929\u4E2D\u544A\u8BC9\u603B\u7BA1\u4F60\u7684\u504F\u597D\u3002</p>"}</div>${d.deleteMemory?`<div class="employee-inline-confirm"><p>\u5220\u9664\u8FD9\u6761\u957F\u671F\u8BB0\u5FC6\uFF1F\u5386\u53F2\u5BA1\u8BA1\u4ECD\u4F1A\u4FDD\u7559\u3002</p>${kt("confirm-delete-memory","\u786E\u8BA4\u5220\u9664",`data-id="${we(d.deleteMemory)}"`,!0,d.busy)}${kt("cancel-delete-memory","\u53D6\u6D88")}</div>`:""}<h3>${k?"\u4FEE\u6539\u8BB0\u5FC6":"\u6DFB\u52A0\u8BB0\u5FC6"}</h3>${te(j,`${Sr("scope","\u8C01\u53EF\u4EE5\u4F7F\u7528",oe.scope||"employee",[["employee","\u5F53\u524D\u5458\u5DE5"],["factory","\u5168\u5382\u5171\u4EAB"]])}${Sr("kind","\u8BB0\u5FC6\u7C7B\u578B",oe.kind||"preference",[["preference","\u5DE5\u4F5C\u504F\u597D"],["fact","\u4E8B\u5B9E"]])}${wt("text","\u8BB0\u4F4F\u4EC0\u4E48",oe.text,{multiline:!0,required:!0})}${wt("source","\u6765\u6E90",oe.source||"\u7528\u6237\u624B\u52A8\u7EF4\u62A4",{required:!0})}${H("save-memory")}`)}`}function le(){let z=d.skills.find(oe=>oe.id===d.editSkill),k=`skill:${d.editSkill||"new"}`,j=E(k,z||{});return`<p class="employee-muted">\u5148\u624B\u5DE5\u8DD1\u901A\uFF0C\u518D\u6C89\u6DC0\u4E3A\u6280\u80FD\uFF1B\u5458\u5DE5\u63D0\u8BAE\u7684\u6280\u80FD\u7531\u4F60\u786E\u8BA4\u540E\u542F\u7528\u3002</p><div class="employee-records">${d.skills.map(oe=>`<article><strong>${we(oe.title||oe.name)}</strong><span>${we({approved:"\u5DF2\u542F\u7528",draft:"\u5F85\u786E\u8BA4",proposed:"\u5F85\u786E\u8BA4",retired:"\u5DF2\u505C\u7528"}[oe.status]||oe.status||"\u5DF2\u4FDD\u5B58")}</span><p>${we(oe.description||"")}</p>${kt("edit-skill","\u67E5\u770B\u4E0E\u7F16\u8F91",`data-id="${we(oe.id)}"`)}</article>`).join("")}</div><h3>${z?"\u7F16\u8F91\u6280\u80FD":"\u65B0\u589E\u6280\u80FD"}</h3>${te(k,`${wt("title","\u6280\u80FD\u540D\u79F0",j.title||j.name,{required:!0})}${wt("description","\u4EC0\u4E48\u65F6\u5019\u4F7F\u7528",j.description,{multiline:!0})}${wt("instructions","\u64CD\u4F5C\u6B65\u9AA4\u4E0E\u5B8C\u6210\u6807\u51C6",j.instructions,{multiline:!0,rows:8,required:!0})}${Sr("status","\u72B6\u6001",j.status||"draft",[["draft","\u8349\u7A3F"],["approved","\u786E\u8BA4\u542F\u7528"],["retired","\u505C\u7528"]])}${H("save-skill")}`)}`}function De(){return`<p class="employee-muted">\u8FD9\u91CC\u8BB0\u5F55\u8FD9\u4F4D\u540C\u4E8B\u5B9E\u9645\u5904\u7406\u8FC7\u7684\u5DE5\u4F5C\u548C\u4EA4\u4ED8\u7269\u3002</p><ol class="employee-timeline">${xt(d.context?.logs).map(k=>`<li><time>${Hn(k.at||k.created_at)}</time><p>${we(k.text||k.summary)}</p>${Ts(k.artifacts)}</li>`).join("")||"<li>\u5C1A\u65E0\u5DE5\u4F5C\u65E5\u5FD7\u3002</li>"}</ol>`}function $(){let z=[["profile","\u6863\u6848"],["memory","\u8BB0\u5FC6"],["routines","\u5B9A\u65F6\u5B89\u6392"],["logs","\u5DE5\u4F5C\u65E5\u5FD7"],["skills","\u6280\u80FD"],["history","\u67E5\u5BF9\u8BDD"]];return`<label class="employee-field">\u9009\u62E9\u540C\u4E8B<select data-employee-profile>${d.employees.map(k=>`<option value="${we(k.id)}" ${k.id===d.employeeId?"selected":""}>${we(k.name)}</option>`).join("")}</select></label><div class="employee-tabs">${z.map(([k,j])=>`<button type="button" class="${d.panelTab===k?"active":""}" data-employee-action="employee-tab" data-tab="${k}">${j}</button>`).join("")}</div>${d.contextLoading?'<p role="status">\u6B63\u5728\u8BFB\u53D6\u5458\u5DE5\u6863\u6848\u2026</p>':{profile:Z,memory:re,logs:De,skills:le,history:Y,routines:pe}[d.panelTab]()}`}function Y(){return`${te("search",`${wt("query","\u641C\u7D22\u4E4B\u524D\u8BF4\u8FC7\u7684\u8BDD",E("search").query,{required:!0})}${kt("search-history","\u641C\u7D22","",!0,d.busy)}`)}${d.searchResults?`<p class="employee-muted">\u627E\u5230 ${d.searchResults.length} \u6761\u76F8\u5173\u8BB0\u5F55\u3002</p>${Ha(d.searchResults,d.employees)}`:'<p class="employee-muted">\u8F93\u5165\u8BBE\u5907\u7F16\u53F7\u3001\u504F\u597D\u6216\u5173\u952E\u8BCD\uFF0C\u627E\u56DE\u8FD9\u4F4D\u540C\u4E8B\u4E4B\u524D\u7684\u5BF9\u8BDD\u3002</p>'}`}function de(){let z=d.routines.find(oe=>oe.id===d.editRoutine)||{},k=`routine:${d.editRoutine||"new"}`,j=E(k,z);return te(k,`${wt("title","\u5B9A\u65F6\u5B89\u6392\u540D\u79F0",j.title,{required:!0})}${Sr("employee_id","\u4EA4\u7ED9\u8C01",j.employee_id||d.employeeId||"manager",d.employees.map(oe=>[oe.id,oe.name]))}${Sr("kind","\u505A\u4EC0\u4E48",j.kind||"equipment_daily_report",[["equipment_daily_report","\u6C47\u62A5\u524D\u4E00\u5929\u8BBE\u5907\u8FD0\u884C\u60C5\u51B5"],["night_shift_report","\u6C47\u62A5\u591C\u73ED\u8BBE\u5907\u72B6\u6001"],["short_stop_watch","\u77ED\u505C\u8D85\u8FC7\u95E8\u69DB\u65F6\u63D0\u9192"],["overdue_work_orders","\u68C0\u67E5\u8D85\u65F6\u5DE5\u5355"]])}${["equipment_daily_report","night_shift_report"].includes(j.kind||"equipment_daily_report")?wt("time","\u6BCF\u5929\u8FD0\u884C\u65F6\u95F4\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09",j.time||(j.kind==="night_shift_report"?"08:00":"08:10"),{type:"time",required:!0}):'<p class="employee-muted">\u540E\u53F0\u6BCF\u5206\u949F\u68C0\u67E5\u4E00\u6B21\uFF0C\u6709\u65B0\u60C5\u51B5\u518D\u6C47\u62A5\u3002</p>'}${wt("equipment_id","\u8BBE\u5907\u7F16\u53F7\uFF08\u7559\u7A7A\u8868\u793A\u9002\u7528\u7684\u5168\u90E8\u8BBE\u5907\uFF09",j.equipment_id)}${j.kind==="overdue_work_orders"?wt("threshold","\u672A\u5173\u95ED\u5DE5\u5355\u591A\u4E45\u6CA1\u6709\u66F4\u65B0\u8FDB\u5C55\uFF08\u5C0F\u65F6\uFF09",j.threshold??24,{type:"number",min:0,max:1e4}):j.kind==="short_stop_watch"?wt("threshold","\u77ED\u505C\u63D0\u9192\u95E8\u69DB\uFF08\u4E00\u5929\u8D85\u8FC7\u51E0\u6B21\uFF09",j.threshold??3,{type:"number",min:0,max:1e4}):""}<p class="employee-muted">\u670D\u52A1\u8FD0\u884C\u65F6\u4F1A\u6309\u5317\u4EAC\u65F6\u95F4\u81EA\u52A8\u6267\u884C\u3002\u901A\u77E5\u73B0\u573A\u4EBA\u5458\u4ECD\u9700\u786E\u8BA4\u3002</p>${H("save-routine")}`)}function pe(){let z=d.routines.filter(k=>k.employee_id===d.employeeId);return`<p class="employee-muted">\u4F60\u53EF\u4EE5\u76F4\u63A5\u544A\u8BC9${we(R(d.employeeId))}\u4EC0\u4E48\u65F6\u5019\u6C47\u62A5\uFF0C\u4E5F\u53EF\u4EE5\u5728\u8FD9\u91CC\u8C03\u6574\u3002</p><div class="routine-settings-heading"><span>\u65F6\u95F4\u5747\u4E3A\u5317\u4EAC\u65F6\u95F4</span>${kt("new-routine","\u65B0\u589E\u5B9A\u65F6\u5B89\u6392","",!0)}</div>${oh(d.error)}<div class="routine-list">${z.map(k=>`<article><div><h2>${we(k.title)}</h2><p>${we(R(k.employee_id))} \xB7 ${k.paused||k.status==="paused"?"\u5DF2\u6682\u505C":["equipment_daily_report","night_shift_report"].includes(k.kind)?"\u6BCF\u5929 "+we(k.time||(k.kind==="night_shift_report"?"08:00":"08:10")):k.kind==="overdue_work_orders"?"\u6BCF\u5206\u949F\u68C0\u67E5 \xB7 \u8D85\u8FC7 "+we(k.threshold??24)+" \u5C0F\u65F6\u65E0\u8FDB\u5C55":"\u6BCF\u5206\u949F\u68C0\u67E5 \xB7 \u4E00\u5929\u8D85\u8FC7 "+we(k.threshold??3)+" \u6B21"}</p></div><dl><div><dt>\u4E0B\u6B21\u8FD0\u884C</dt><dd>${k.paused||k.status==="paused"?"\u5DF2\u6682\u505C":Hn(k.next_run_at)}</dd></div><div><dt>\u4E0A\u6B21\u7ED3\u679C</dt><dd>${we(Nn(k.last_result)||"\u8FD8\u672A\u8FD0\u884C")}${k.last_run_at?`<small>${Hn(k.last_run_at)}</small>`:""}${k.last_run_id?Ts([{id:k.last_run_id,label:"\u6253\u5F00\u4E0A\u6B21\u62A5\u544A"}]):""}</dd></div></dl><div class="routine-actions">${kt("routine-run","\u8FD0\u884C\u4E00\u6B21",`data-id="${we(k.id)}"`,!1,d.busy)}${kt("edit-routine","\u4FEE\u6539",`data-id="${we(k.id)}"`,!1,d.busy)}${kt(k.paused||k.status==="paused"?"routine-resume":"routine-pause",k.paused||k.status==="paused"?"\u7EE7\u7EED":"\u6682\u505C",`data-id="${we(k.id)}"`,!1,d.busy)}${kt("delete-routine","\u5220\u9664",`data-id="${we(k.id)}"`,!1,d.busy)}</div></article>`).join("")||'<div class="employee-empty"><h2>\u628A\u7B2C\u4E00\u4EF6\u4F8B\u884C\u5DE5\u4F5C\u4EA4\u7ED9\u603B\u7BA1</h2><p>\u5728\u804A\u5929\u91CC\u8BF4\u201C\u4EE5\u540E\u6BCF\u5929\u65E9\u4E0A 8 \u70B9 10 \u5206\u544A\u8BC9\u6211\u524D\u4E00\u5929\u7684\u8BBE\u5907\u8FD0\u884C\u60C5\u51B5\u201D\uFF0C\u4E5F\u53EF\u4EE5\u5728\u8FD9\u91CC\u65B0\u5EFA\u3002</p></div>'}</div>${d.deleteRoutine?`<div class="employee-inline-confirm"><p>\u5220\u9664\u8FD9\u9879\u5B9A\u65F6\u5B89\u6392\u540E\u5C06\u505C\u6B62\u540E\u7EED\u8C03\u5EA6\uFF0C\u5DF2\u6709\u7ED3\u679C\u4FDD\u7559\u3002</p>${kt("confirm-delete-routine","\u786E\u8BA4\u5220\u9664",`data-id="${we(d.deleteRoutine)}"`,!0,d.busy)}${kt("cancel-delete-routine","\u53D6\u6D88")}</div>`:""}`}function Re(){let z=d.decision,k=z?.approval?.proposal||{},j=`decision:${z?.id}:${z?.decision}`,oe=E(j,{title:k.title,description:k.description,steps:xt(k.steps).map(Nn).join(`
`),acceptance_criteria:Nn(k.acceptance_criteria),reason:""}),ne=z?.decision==="modify",Ae=z?.decision==="reject";return`<p>${Ae?"\u62D2\u7EDD\u540E\uFF0C\u8FD9\u4EFD\u65B9\u6848\u5C06\u505C\u6B62\u6267\u884C\u3002":ne?"\u4FEE\u6539\u540E\u5F62\u6210\u65B0\u7248\u65B9\u6848\uFF0C\u9700\u8981\u91CD\u65B0\u786E\u8BA4\u624D\u4F1A\u6267\u884C\u3002":"\u786E\u8BA4\u540E\uFF0C\u7EF4\u4FEE\u8BA1\u5212\u5458\u6309\u8FD9\u4EFD\u65B9\u6848\u521B\u5EFA\u5DE5\u5355\uFF0C\u5E76\u56DE\u8BFB\u5DE5\u5355\u53F7\u3002"}</p>${te(j,`${ne?`${wt("title","\u65B9\u6848\u540D\u79F0",oe.title,{required:!0})}${wt("description","\u505A\u4EC0\u4E48",oe.description,{multiline:!0,required:!0})}${wt("steps","\u73B0\u573A\u6B65\u9AA4\uFF08\u9009\u586B\uFF0C\u6BCF\u884C\u4E00\u6B65\uFF09",oe.steps,{multiline:!0})}${wt("acceptance_criteria","\u600E\u6837\u7B97\u5B8C\u6210\uFF08\u9009\u586B\uFF09",oe.acceptance_criteria,{multiline:!0})}`:`<h3>${we(k.title||"\u73B0\u573A\u5904\u7406\u65B9\u6848")}</h3><p>${we(k.description||k.scope||"")}</p><ol>${xt(k.steps).map(Be=>`<li>${we(Nn(Be))}</li>`).join("")}</ol><p>\u5B8C\u6210\u6807\u51C6\uFF1A${we(Nn(k.acceptance_criteria))}</p><p>\u6267\u884C\u4EBA\uFF1A${we(Pi(k.assignee_name||k.assignee_id||k.assignee))}</p>`}${wt("reason",Ae?"\u4E0D\u540C\u610F\u7684\u539F\u56E0":ne?"\u4FEE\u6539\u8BF4\u660E":"\u786E\u8BA4\u8BF4\u660E\uFF08\u9009\u586B\uFF09",oe.reason,{multiline:!0,required:Ae||ne})}${H("submit-decision",Ae?"\u786E\u8BA4\u4E0D\u540C\u610F":ne?"\u4FDD\u5B58\u65B0\u7248\u65B9\u6848":"\u786E\u8BA4\u5E76\u5B89\u6392\u5904\u7406")}`)}`}function ye(){if(!d.detail)return'<p role="status">\u6B63\u5728\u6838\u5BF9\u5904\u7406\u8BB0\u5F55\u2026</p>';let z=d.detail,k=z.task||{},j=z.case||{},oe=wc(z),ne=oe[d.replayIndex],Ae=Vm(k,j);return d.conversationAction&&(t().actionDraft||t().observationEditing)?`<p>${we(d.conversationAction.text||"\u8BF7\u586B\u5199\u5B9E\u9645\u60C5\u51B5\uFF0C\u603B\u7BA1\u6536\u5230\u540E\u7EE7\u7EED\u8DDF\u8FDB\u3002")}</p>${a?.(j)||""}`:`<p class="task-detail-now">${we(Ae.current)}</p><p class="employee-muted">${["CLOSED","COMPLETED","CANCELLED","DISMISSED"].includes(String(j.state||j.status||"").toUpperCase())?"":"\u4E0B\u4E00\u6B65\uFF1A"}${we(Ae.next)}</p><dl class="task-time-summary"><div><dt>\u603B\u5171\u7528\u4E86\u591A\u4E45</dt><dd>${ah(k.elapsed_seconds)}</dd></div><div><dt>\u5176\u4E2D\u7B49\u4EBA\u7528\u4E86\u591A\u4E45</dt><dd>${ah(k.waiting_seconds)}</dd></div></dl>${a?.(j)||""}<section><h3>\u7ECF\u8FC7</h3><ol class="employee-timeline">${oe.map(Be=>`<li><div><strong>${we(Pi(Be.author))}</strong><time>${Hn(Be.at)}</time></div><p>${we(Be.text)}</p>${Ts(Be.artifacts)}</li>`).join("")||"<li>\u5C1A\u65E0\u4EA4\u63A5\u8BB0\u5F55\u3002</li>"}</ol></section>${Bm(z.result||k.result||{})}<details class="employee-replay" data-employee-replay ${d.replayOpen?"open":""}><summary>\u6D41\u7A0B\u56DE\u653E</summary><p class="employee-muted">\u6309\u5DF2\u8BB0\u5F55\u7684\u65F6\u95F4\u9010\u6B65\u56DE\u653E\uFF0C\u672A\u6765\u6B65\u9AA4\u4E0D\u4F1A\u663E\u793A\u4E3A\u5DF2\u5B8C\u6210\u3002</p>${oe.length?`<div class="employee-replay-controls">${kt(d.replayPlaying?"replay-pause":"replay-play",d.replayPlaying?"\u6682\u505C":"\u64AD\u653E","",!1,oe.length<2)}${kt("replay-next","\u4E0B\u4E00\u6B65","",!1,d.replayIndex>=oe.length-1)}${kt("replay-reset","\u4ECE\u5934\u5F00\u59CB")}<span>${d.replayIndex+1} / ${oe.length}</span></div><div class="employee-replay-current" role="status"><time>${Hn(ne?.at)}</time><strong>${we(Pi(ne?.author))}</strong><p>${we(ne?.text)}</p>${Ts(ne?.artifacts)}</div>`:""}<div data-employee-replay-graph>${o?.(j,ne)||""}</div></details>`}function ke(){if(!d.artifact)return'<p role="status">\u6B63\u5728\u8BFB\u53D6\u4EA4\u4ED8\u7269\u2026</p>';let z=d.artifact,k=z.data||z.content||z,j=z.type==="report"&&k?.result?k.result:k?.raw&&typeof k.raw=="object"?k.raw:k,oe={id:"\u7F16\u53F7",state:"\u72B6\u6001",status:"\u72B6\u6001",title:"\u6807\u9898",source:"\u6765\u6E90",case_id:"\u5173\u8054\u4E8B\u9879",equipment_id:"\u8BBE\u5907",assignee_id:"\u6267\u884C\u4EBA",acceptor_id:"\u9A8C\u6536\u4EBA"},ne={ISSUED:"\u7B49\u63A5\u5355",ACCEPTED:"\u5DF2\u63A5\u5355",IN_PROGRESS:"\u6B63\u5728\u5904\u7406",WAITING_TECH_REVIEW:"\u7B49\u6280\u672F\u590D\u6838",WAITING_ACCEPTANCE:"\u7B49\u9A8C\u6536",COMPLETED:"\u5DF2\u5B8C\u6210",CLOSED:"\u5DF2\u5B8C\u6210",CANCELLED:"\u5DF2\u53D6\u6D88"},Ae=[["\u4F9D\u636E",j?.evidence||j?.sources],["\u53EF\u80FD\u539F\u56E0",j?.hypotheses],["\u5EFA\u8BAE\u4E0B\u4E00\u6B65",j?.recommendations||j?.next_steps],["\u8FD8\u9700\u6838\u5B9E",j?.limitations]],Be=Ie=>typeof Ie=="string"?Ie:[Ie?.title||Ie?.hypothesis||Ie?.cause||Ie?.description||Ie?.action||Ie?.id,Ie?.reason||Ie?.reasoning||Ie?.verification].filter(Boolean).join("\uFF1A"),U=$m(z,d.routines,d.employees);return`<p class="employee-muted">${we(U)} \xB7 ${Hn(z.at||z.created_at||k?.completed_at||k?.created_at||k?.timestamp)}${z.source?` \xB7 ${we(Nn(z.source))}`:""}</p>${typeof j=="string"?`<div class="employee-prose">${we(j)}</div>`:`${j?.summary||j?.description||j?.text?`<p>${we(j.summary||j.description||j.text)}</p>`:""}${j?.window_start?`<p class="employee-muted">\u6570\u636E\u7A97\u53E3\uFF1A${Hn(j.window_start)} \u2014 ${Hn(j.window_end)}\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09</p>`:""}${xt(j?.metrics).length?`<div class="table-wrap"><table><thead><tr><th>\u8BBE\u5907</th><th>\u77ED\u505C\u6B21\u6570</th><th>OEE</th></tr></thead><tbody>${j.metrics.map(Ie=>`<tr><td>${we(Ie.equipment_id)}</td><td>${we(zm(Ie))}</td><td>${Number.isFinite(Ie.OEE_pct)?we(Ie.OEE_pct.toFixed(1))+"%":"\u6570\u636E\u4E0D\u8DB3"}</td></tr>`).join("")}</tbody></table></div>`:""}${Ae.filter(([,Ie])=>xt(Ie).length).map(([Ie,Qe])=>`<section><h3>${Ie}</h3><ul>${Qe.map(he=>`<li>${we(Be(he))}</li>`).join("")}</ul></section>`).join("")}${j?.proposal?`<section><h3>${we(j.proposal.title||"\u5904\u7406\u65B9\u6848")}</h3><p>${we(j.proposal.description||"")}</p><ol>${xt(j.proposal.steps).map(Ie=>`<li>${we(Be(Ie))}</li>`).join("")}</ol><p>\u5B8C\u6210\u6807\u51C6\uFF1A${we(Nn(j.proposal.acceptance_criteria))}</p></section>`:""}<dl class="employee-artifact-facts">${Object.entries(k).filter(([Ie,Qe])=>oe[Ie]&&Qe!==null&&typeof Qe!="object").map(([Ie,Qe])=>`<div><dt>${oe[Ie]}</dt><dd>${we(ne[Qe]||Pi(Qe))}</dd></div>`).join("")}</dl><details><summary>\u5B8C\u6574\u539F\u59CB\u8BB0\u5F55</summary><pre>${we(JSON.stringify(k,null,2))}</pre></details>`}`}function at(){if(!d.panel)return"";let z={employees:`${R(d.employeeId)} \xB7 \u5DE5\u4F5C\u8BBE\u7F6E`,task:d.conversationAction?.title||d.detail?.task?.title||d.detail?.case?.title||"\u5904\u7406\u8BB0\u5F55",decision:{approve:"\u786E\u8BA4\u5904\u7406\u65B9\u6848",modify:"\u4FEE\u6539\u5904\u7406\u65B9\u6848",reject:"\u4E0D\u540C\u610F\u8FD9\u4EFD\u65B9\u6848"}[d.decision?.decision],routine:d.editRoutine?"\u4FEE\u6539\u5B9A\u65F6\u5B89\u6392":"\u65B0\u589E\u5B9A\u65F6\u5B89\u6392",remind:"\u786E\u8BA4\u50AC\u529E\u5185\u5BB9",artifact:d.artifact?.title||d.artifact?.label||"\u4EA4\u4ED8\u7269"},k={employees:$,task:ye,decision:Re,routine:de,artifact:ke,remind:()=>`<p>\u51C6\u5907\u50AC\u529E ${we(d.remindTask?.asset_id)} \u7684\u4EFB\u52A1\u3002</p><p>\u63A5\u6536\u4EBA\uFF1A${we(Pi(d.remindTask?.owner))}</p>${te("remind",`${wt("message","\u50AC\u529E\u5185\u5BB9",E("remind").message||`\u8BF7\u66F4\u65B0\u201C${d.remindTask?.title||"\u8BBE\u5907\u4EFB\u52A1"}\u201D\u7684\u5904\u7406\u8FDB\u5C55\u3002`,{multiline:!0,required:!0})}<p class="employee-muted">\u786E\u8BA4\u540E\u5C1D\u8BD5\u53D1\u9001\uFF0C\u5E76\u663E\u793A\u5B9E\u9645\u56DE\u6267\u3002\u672A\u8FDE\u63A5\u901A\u77E5\u6E20\u9053\u65F6\u4F1A\u8BF4\u660E\u539F\u56E0\u3002</p>${H("submit-remind","\u786E\u8BA4\u50AC\u529E")}`)}`}[d.panel]();return`<div class="employee-drawer-backdrop" data-employee-action="close"></div><aside class="employee-drawer" role="dialog" aria-modal="true" aria-labelledby="employee-drawer-title" tabindex="-1"><header><h2 id="employee-drawer-title">${we(z[d.panel])}</h2><button type="button" class="icon-button" aria-label="\u5173\u95ED\u8BE6\u60C5" data-employee-action="close">${Tc("close")}</button></header><div class="employee-drawer-body">${oh(d.error)}${d.notice?`<p class="employee-notice" role="status">${we(d.notice)}</p>`:""}${k}</div></aside>`}async function Pe(z){d.employeeId=z,d.context=null,d.contextLoading=!0,p();try{let[k,j,oe,ne]=await Promise.all([n.employeeContext(z),n.memories(),n.skills(),n.routines()]);d.employeeId===z&&d.panel==="employees"&&(d.context=k,d.memories=xt(j.memories),d.skills=xt(oe.skills),d.routines=xt(ne.routines),d.error=null)}catch(k){d.employeeId===z&&d.panel==="employees"&&(d.error=k)}finally{d.employeeId===z&&(d.contextLoading=!1,p())}}function Je(z){return Object.fromEntries(new FormData(z))}function st(z){let k=z.querySelector("[data-employee-form]");if(!k?.reportValidity())return null;let j=Je(k);return d.drafts[k.dataset.employeeForm]=j,j}async function Ze(z,k,j){if(d.busy&&!["close","artifact","stop"].includes(z))return;let oe=k?.dataset.id;if(d.panel||(d.returnFocus={action:z,id:oe}),z==="close"){N();return}if(z==="conversation-reply"){let ne=d.conversationActions.find(Ae=>Ae.id===oe);ne&&h(ne);return}if(z==="conversation-step"||z==="conversation-record"){let ne=d.conversationActions.find(Be=>Be.id===oe);if(!ne){d.error=new Error("\u8FD9\u6761\u786E\u8BA4\u8BB0\u5F55\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002"),p();return}if(z==="conversation-step"&&ne.status!=="pending"){d.notice="\u8FD9\u4E00\u6B65\u5DF2\u7ECF\u5904\u7406\uFF0C\u6B63\u5728\u8BFB\u53D6\u540E\u7EED\u5B89\u6392\u3002",await v();return}let Ae=z==="conversation-step"?Gu(ne,Number(k.dataset.step)):null;await L(ne.case_id,ne),Ae&&d.detail&&(m(Ae,ne),p());return}if(z==="task"){await L(oe);return}if(z==="chat"){N(),s(oe,k.dataset.employee||"manager");return}if(z==="refresh"){await v();return}if(z==="scope"){d.mineOnly=k.dataset.scope==="mine",p();return}if(z==="tab"){d.tab=k.dataset.tab,d.notice=null,p();return}if(z==="search-history"){let ne=st(j);if(!ne)return;let Ae=await A(()=>n.searchConversations({query:ne.query,employee_id:d.employeeId}),"");Ae&&(d.searchResults=xt(Ae.messages),p());return}if(z==="settings"){d.panel="employees",d.panelTab="profile",d.notice=null,await Pe(oe||t().chatTarget||"manager");return}if(z==="employee-tab"){d.panelTab=k.dataset.tab,d.notice=null,p();return}if(z==="decision"){P(oe,k.dataset.decision);return}if(z==="stop"){d.error=null;try{let ne=await(oe?n.stopCase(oe,{idempotency_key:M("stop",oe)}):n.stopTurn(k.dataset.turn,{idempotency_key:M("stop-turn",k.dataset.turn)}));d.notice=`\u5DF2\u505C\u6B62 ${xt(ne.stopped).length} \u9879\u5DE5\u4F5C\uFF1B${xt(ne.completed).length} \u9879\u6B64\u524D\u5DF2\u5B8C\u6210\u3002${xt(ne.committed_actions).length?"\u5DF2\u4EA7\u751F\u7684\u4E1A\u52A1\u8BB0\u5F55\u4ECD\u7136\u4FDD\u7559\u3002":""}`,await v({render:!1,force:!0})}catch(ne){d.error=ne}p();return}if(z==="remind"){d.remindTask=d.board.tasks?.find(ne=>(ne.case_id||ne.id)===oe),d.panel="remind",d.notice=null,p();return}if(z==="submit-remind"){let ne=st(j);if(!ne)return;let Ae=await A(()=>n.remindCase(d.remindTask.case_id||d.remindTask.id,{message:ne.message,confirmed:!0,idempotency_key:M("remind",[d.remindTask.id,ne])}),"");Ae&&(d.notice=Ae.message||Ae.summary||(Ae.status==="unavailable"?"\u901A\u77E5\u6E20\u9053\u672A\u8FDE\u63A5\uFF0C\u5C1A\u672A\u53D1\u9001\u50AC\u529E\u3002":"\u5DF2\u53D6\u5F97\u50AC\u529E\u56DE\u6267\u3002"),p());return}if(z==="artifact"){let ne=d.conversationActions.find(Ae=>Ae.id===oe);if(ne){await L(ne.case_id,ne);return}d.panel="artifact",d.artifact=null,d.notice=null,p();try{let Ae=await n.artifact(oe);d.artifact=Ae.artifact||Ae}catch(Ae){d.error=Ae}p();return}if(z==="submit-decision"){let ne=st(j);if(!ne||d.busy)return;let Ae=d.decision,{approval:Be,decision:U,id:Ie,conversationAction:Qe}=Ae,he=U==="modify"?{...Be.proposal,title:ne.title,description:ne.description}:Be.proposal;U==="modify"&&(ne.steps?.trim()?he.steps=ne.steps.split(`
`).filter(Boolean):delete he.steps,ne.acceptance_criteria?.trim()?he.acceptance_criteria=ne.acceptance_criteria:delete he.acceptance_criteria);let me={decision:U,proposal:he,revision:Be.revision,reason:ne.reason,...Qe?mc(Qe):{}},Lt=()=>{d.decision===Ae&&(d.panel=null,d.decision=null),d.notice=U==="modify"?"\u65B0\u7248\u65B9\u6848\u5DF2\u4FDD\u5B58\uFF0C\u8BF7\u91CD\u65B0\u786E\u8BA4\u3002":U==="reject"?"\u5DF2\u8BB0\u5F55\u4E0D\u540C\u610F\uFF0C\u8FD9\u4EFD\u65B9\u6848\u4E0D\u4F1A\u6267\u884C\u3002":"\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u7B49\u5F85\u5B9E\u9645\u529E\u7406\u7ED3\u679C\u3002",g=d.notice};d.busy=!0,d.error=null,p();try{let $e=await e("decision",{turnId:Ie,...me},qe=>n.managerDecision(Ie,{...me,idempotency_key:qe}),Lt);$e.value&&Lt(),$e.pending&&(d.notice="\u6B63\u5728\u6838\u5BF9\u65B9\u6848\u51B3\u5B9A\u7684\u56DE\u6267\u3002")}catch($e){d.error=$e}finally{d.busy=!1,l(d),p()}return}if(z==="save-profile"){let ne=st(j);if(!ne)return;let Ae=d.context?.profile||d.employees.find(Ie=>Ie.id===d.employeeId),Be={...ne,version:Ae.version,allowed_tools:ne.allowed_tools.split(`
`).map(Ie=>Ie.trim()).filter(Boolean),equipment_ids:ne.equipment_ids.split(`
`).map(Ie=>Ie.trim()).filter(Boolean),approval_required:ne.approval_required.split(`
`).map(Ie=>Ie.trim()).filter(Boolean)};await A(()=>n.saveEmployee(d.employeeId,Be))&&(delete d.drafts[`profile:${d.employeeId}`],await Pe(d.employeeId));return}if(z==="edit-memory"){d.editMemory=oe,p();return}if(z==="delete-memory"){d.deleteMemory=oe,p();return}if(z==="cancel-delete-memory"){d.deleteMemory=null,p();return}if(z==="confirm-delete-memory"){let ne=d.memories.find(Be=>Be.id===oe);await A(()=>n.deleteMemory(oe,{version:ne.version,idempotency_key:M("delete-memory",oe)}))&&(d.deleteMemory=null,p());return}if(z==="save-memory"){let ne=st(j);if(!ne)return;let Ae=d.memories.find(U=>U.id===d.editMemory);await A(()=>n.saveMemory(d.editMemory,{...ne,employee_id:d.employeeId,version:Ae?.version,idempotency_key:M("memory",[d.editMemory,ne])}))&&(delete d.drafts[`memory:${d.editMemory||"new"}`],d.editMemory=null,p());return}if(z==="edit-skill"){d.editSkill=oe,p();return}if(z==="save-skill"){let ne=st(j);if(!ne)return;let Ae=d.skills.find(U=>U.id===d.editSkill);await A(()=>n.saveSkill(d.editSkill,{...ne,version:Ae?.version,confirmed:ne.status==="approved",idempotency_key:M("skill",[d.editSkill,ne])}))&&(delete d.drafts[`skill:${d.editSkill||"new"}`],d.editSkill=null,p());return}if(z==="new-routine"||z==="edit-routine"){d.editRoutine=z==="edit-routine"?oe:null,d.panel="routine",d.notice=null,p();return}if(z==="save-routine"){let ne=st(j);if(!ne)return;let Ae=d.routines.find(Ie=>Ie.id===d.editRoutine),Be={...ne,threshold:Number(ne.threshold??(ne.kind==="overdue_work_orders"?24:3)),time:ne.time||(ne.kind==="equipment_daily_report"?"08:10":"08:00"),timezone:"Asia/Shanghai",version:Ae?.version,idempotency_key:M("routine",[d.editRoutine,ne])};await A(()=>n.saveRoutine(d.editRoutine,Be))&&(delete d.drafts[`routine:${d.editRoutine||"new"}`],d.panel="employees",d.panelTab="routines",p());return}if(z==="delete-routine"){d.deleteRoutine=oe,p();return}if(z==="cancel-delete-routine"){d.deleteRoutine=null,p();return}if(z==="confirm-delete-routine"){await A(()=>n.routineAction(oe,"delete",{idempotency_key:M("delete-routine",oe)}))&&(d.deleteRoutine=null,p());return}if(z.startsWith("routine-")){let ne=z.slice(8),Ae=await A(()=>n.routineAction(oe,ne,{idempotency_key:Ci()}),ne==="run"?"\u5DF2\u53D6\u5F97\u672C\u6B21\u8FD0\u884C\u8BB0\u5F55\u3002":"\u5B9A\u65F6\u5B89\u6392\u72B6\u6001\u5DF2\u66F4\u65B0\u3002");Ae&&ne==="run"&&(d.notice=Nn(Ae.result||Ae.run?.result||Ae.message)||"\u672C\u6B21\u6267\u884C\u5DF2\u63D0\u4EA4\uFF0C\u7ED3\u679C\u4F1A\u51FA\u73B0\u5728\u5B9A\u65F6\u5B89\u6392\u548C\u5BF9\u5E94\u804A\u5929\u3002",p());return}if(z==="replay-play"){d.replayPlaying=!0,d.replayIndex>=wc(d.detail||{}).length-1&&(d.replayIndex=0),p(),x=setTimeout(X,1500);return}if(z==="replay-pause"){O(),p();return}if(z==="replay-next"){O(),X();return}if(z==="replay-reset"){O(),d.replayIndex=0,p();return}}let Rt=new WeakSet;function St(z){Rt.has(z)||(Rt.add(z),z.addEventListener("click",k=>{let j=k.target.closest("[data-employee-action]");!j||!z.contains(j)||(k.preventDefault(),Ze(j.dataset.employeeAction,j,z).catch(oe=>{d.error=oe,d.busy=!1,p()}))}),z.addEventListener("input",k=>{let j=k.target.closest("[data-employee-form]");j&&(d.drafts[j.dataset.employeeForm]=Je(j))}),z.addEventListener("submit",k=>{k.target.matches("[data-employee-form]")&&k.preventDefault()}),z.addEventListener("change",k=>{if(k.target.name==="kind"&&k.target.closest("[data-employee-form]")?.dataset.employeeForm.startsWith("routine:")){let j=k.target.closest("[data-employee-form]"),oe=Je(j);oe.threshold=oe.kind==="overdue_work_orders"?24:3,d.drafts[j.dataset.employeeForm]=oe,p();return}k.target.matches("[data-employee-device]")&&(d.device=k.target.value,p()),k.target.matches("[data-employee-profile]")&&Pe(k.target.value)}),z.addEventListener("keydown",k=>{if(k.key==="Escape"&&d.panel&&(k.preventDefault(),N()),k.key==="Tab"&&d.panel){let j=z.querySelector(".employee-drawer"),oe=[...j.querySelectorAll('button:not([disabled]),input,textarea,select,[tabindex="0"]')].filter(Be=>Be.getClientRects().length),ne=oe[0],Ae=oe.at(-1);k.shiftKey&&document.activeElement===ne?(k.preventDefault(),Ae?.focus()):!k.shiftKey&&document.activeElement===Ae&&(k.preventDefault(),ne?.focus())}})),z.querySelectorAll("[data-employee-disclosure]").forEach(k=>{k.dataset.employeeBound||(k.dataset.employeeBound="true",k.addEventListener("toggle",()=>{d.disclosures[k.dataset.employeeDisclosure]=k.open}))}),z.querySelectorAll("[data-employee-replay]").forEach(k=>{k.dataset.bound||(k.dataset.bound="true",k.addEventListener("toggle",()=>{d.replayOpen=k.open,k.open||O()}))})}return{state:d,refresh:v,bind:St,openTask:L,panels:at,closePanel:N,dispose(){O()},managerData(){return{profiles:d.employees,persistedMessages:d.messages,conversationActions:d.conversationActions,employeePanel:at(),employeeError:d.error,employeeNotice:d.notice}},toolbar(z){return`${kt("settings",`${Tc("settings")} \u5DE5\u4F5C\u8BBE\u7F6E`,`data-id="${we(t().chatTarget||"manager")}"`)}`}}}var Wi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Fh=0,sd=1,kh=2;var Qr=1,Jo=2,Qs=3,Xi=0,hn=1,Jn=2,hs=0,er=1,rd=2,ad=3,od=4,Bh=5;var fs=100,zh=101,$h=102,Vh=103,Gh=104,Hh=200,Wh=201,qh=202,Xh=203,ld=204,cd=205,Yh=206,Jh=207,Zh=208,jh=209,Kh=210,Qh=211,ef=212,tf=213,nf=214,go=0,_o=1,yo=2,$s=3,vo=4,xo=5,bo=6,So=7,dd=0,sf=1,rf=2,Zn=0,ud=1,hd=2,fd=3,ea=4,pd=5,md=6,gd=7;var _d=300,ps=301,tr=302,Zo=303,jo=304,Mo=1e3,qn=1001,wo=1002,qt=1003,af=1004;var ta=1005;var un=1006,Ko=1007;var xi=1008;var _n=1009,yd=1010,vd=1011,nr=1012,Qo=1013,Bn=1014,zn=1015,$n=1016,el=1017,tl=1018,ms=1020,xd=35902,bd=35899,Sd=1021,Md=1022,Vn=1023,gi=1026,bi=1027,wd=1028,nl=1029,Yi=1030,il=1031;var sl=1033,na=33776,ia=33777,sa=33778,ra=33779,rl=35840,al=35841,ol=35842,ll=35843,cl=36196,dl=37492,ul=37496,hl=37488,fl=37489,aa=37490,pl=37491,ml=37808,gl=37809,_l=37810,yl=37811,vl=37812,xl=37813,bl=37814,Sl=37815,Ml=37816,wl=37817,El=37818,Tl=37819,Al=37820,Cl=37821,Rl=36492,Il=36494,Pl=36495,Dl=36283,Ll=36284,oa=36285,Nl=36286;var Pr=2300,Eo=2301,po=2302,Zc=2303,jc=2400,Kc=2401,Qc=2402;var of=3200;var Ul=0,lf=1,Si="",ln="srgb",Dr="srgb-linear",Lr="linear",gt="srgb";var mo=7680;var cf=519,df=512,uf=513,hf=514,Ed=515,ff=516,pf=517,Td=518,Ad=519,mf=35044;var Cd="300 es",An=2e3,Vs=2001;function Gm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Hm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Nr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gf(){let n=Nr("canvas");return n.style.display="block",n}var ch={},Gs=null;function Rd(...n){let e="THREE."+n.shift();Gs?Gs("log",e,...n):console.log(e,...n)}function _f(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ge(...n){n=_f(n);let e="THREE."+n.shift();if(Gs)Gs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function We(...n){n=_f(n);let e="THREE."+n.shift();if(Gs)Gs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Cr(...n){let e=n.join(" ");e in ch||(ch[e]=!0,Ge(...n))}function yf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var vf={[go]:go,[yo]:bo,[vo]:vo,[$s]:xo,[_o]:_o,[bo]:yo,[So]:So,[xo]:$s},kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dh=1234567,Rr=Math.PI/180,Hs=180/Math.PI;function ir(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function Id(n,e){return(n%e+e)%e}function Wm(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function qm(n,e,t){return n!==e?(t-n)/(e-n):0}function Ir(n,e,t){return(1-t)*n+t*e}function Xm(n,e,t,i){return Ir(n,e,1-Math.exp(-t*i))}function Ym(n,e=1){return e-Math.abs(Id(n,e*2)-e)}function Jm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Zm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function jm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Km(n,e){return n+Math.random()*(e-n)}function Qm(n){return n*(.5-Math.random())}function eg(n){n!==void 0&&(dh=n);let e=dh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function tg(n){return n*Rr}function ng(n){return n*Hs}function ig(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function sg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function rg(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),m=r((e-i)/2),h=a((e-i)/2),d=r((i-e)/2),_=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*m,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*m,o*c);break;case"ZXZ":n.set(l*m,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*d,o*c);break;case"YXY":n.set(l*d,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*d,o*u,o*c);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dd(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function xf(n,e){if(e.constructor===Float32Array)return n;let t=Dd(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function bf(n,e){if(e.constructor===Float32Array)return n;let t=Dd(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}var Ld={DEG2RAD:Rr,RAD2DEG:Hs,generateUUID:ir,clamp:rt,euclideanModulo:Id,mapLinear:Wm,inverseLerp:qm,lerp:Ir,damp:Xm,pingpong:Ym,smoothstep:Jm,smootherstep:Zm,randInt:jm,randFloat:Km,randFloatSpread:Qm,seededRandom:eg,degToRad:tg,radToDeg:ng,isPowerOfTwo:ig,ceilPowerOfTwo:sg,floorPowerOfTwo:Pd,setQuaternionFromProperEuler:rg,normalize:bf,denormalize:xf},He=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Sn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],m=i[s+3],h=r[a+0],d=r[a+1],_=r[a+2],x=r[a+3];if(m!==x||l!==h||c!==d||u!==_){let g=l*h+c*d+u*_+m*x;g<0&&(h=-h,d=-d,_=-_,x=-x,g=-g);let p=1-o;if(g<.9995){let M=Math.acos(g),E=Math.sin(M);p=Math.sin(p*M)/E,o=Math.sin(o*M)/E,l=l*p+h*o,c=c*p+d*o,u=u*p+_*o,m=m*p+x*o}else{l=l*p+h*o,c=c*p+d*o,u=u*p+_*o,m=m*p+x*o;let M=1/Math.sqrt(l*l+c*c+u*u+m*m);l*=M,c*=M,u*=M,m*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],m=r[a],h=r[a+1],d=r[a+2],_=r[a+3];return e[t]=o*_+u*m+l*d-c*h,e[t+1]=l*_+u*h+c*m-o*d,e[t+2]=c*_+u*d+o*h-l*m,e[t+3]=u*_-o*m-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),m=o(r/2),h=l(i/2),d=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=h*u*m+c*d*_,this._y=c*d*m-h*u*_,this._z=c*u*_+h*d*m,this._w=c*u*m-h*d*_;break;case"YXZ":this._x=h*u*m+c*d*_,this._y=c*d*m-h*u*_,this._z=c*u*_-h*d*m,this._w=c*u*m+h*d*_;break;case"ZXY":this._x=h*u*m-c*d*_,this._y=c*d*m+h*u*_,this._z=c*u*_+h*d*m,this._w=c*u*m-h*d*_;break;case"ZYX":this._x=h*u*m-c*d*_,this._y=c*d*m+h*u*_,this._z=c*u*_-h*d*m,this._w=c*u*m+h*d*_;break;case"YZX":this._x=h*u*m+c*d*_,this._y=c*d*m+h*u*_,this._z=c*u*_-h*d*m,this._w=c*u*m-h*d*_;break;case"XZY":this._x=h*u*m-c*d*_,this._y=c*d*m-h*u*_,this._z=c*u*_+h*d*m,this._w=c*u*m+h*d*_;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],m=t[10],h=i+o+m;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>m){let d=2*Math.sqrt(1+i-o-m);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>m){let d=2*Math.sqrt(1+o-i-m);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+m-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),m=2*(r*i-a*t);return this.x=t+l*c+a*m-o*u,this.y=i+l*u+o*c-r*m,this.z=s+l*m+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rc.copy(this).projectOnVector(e),this.sub(Rc)}reflect(e){return this.sub(Rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Rc=new B,uh=new Sn,Ye=class{static{this.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],m=i[7],h=i[2],d=i[5],_=i[8],x=s[0],g=s[3],p=s[6],M=s[1],E=s[4],w=s[7],R=s[2],C=s[5],v=s[8];return r[0]=a*x+o*M+l*R,r[3]=a*g+o*E+l*C,r[6]=a*p+o*w+l*v,r[1]=c*x+u*M+m*R,r[4]=c*g+u*E+m*C,r[7]=c*p+u*w+m*v,r[2]=h*x+d*M+_*R,r[5]=h*g+d*E+_*C,r[8]=h*p+d*w+_*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],m=u*a-o*c,h=o*l-u*r,d=c*r-a*l,_=t*m+i*h+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=m*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=h*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ic.makeScale(e,t)),this}rotate(e){return Cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ic.makeRotation(-e)),this}translate(e,t){return Cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ic.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ic=new Ye,hh=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fh=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ag(){let n={enabled:!0,workingColorSpace:Dr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===gt&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(s.r=zs(s.r),s.g=zs(s.g),s.b=zs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Si?Lr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Dr]:{primaries:e,whitePoint:i,transfer:Lr,toXYZ:hh,fromXYZ:fh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:hh,fromXYZ:fh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),n}var ct=ag();function mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var As,To=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{As===void 0&&(As=Nr("canvas")),As.width=e.width,As.height=e.height;let s=As.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=As}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Nr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(mi(t[i]/255)*255):t[i]=mi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},og=0,Ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=ir(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Pc(s[a].image)):r.push(Pc(s[a]))}else r=Pc(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Pc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?To.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var lg=0,Dc=new B,mn=class n extends kn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=qn,s=qn,r=un,a=xi,o=Vn,l=_n,c=n.DEFAULT_ANISOTROPY,u=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=ir(),this.name="",this.source=new Ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Dc).x}get height(){return this.source.getSize(Dc).y}get depth(){return this.source.getSize(Dc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_d)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mo:e.x=e.x-Math.floor(e.x);break;case qn:e.x=e.x<0?0:1;break;case wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mo:e.y=e.y-Math.floor(e.y);break;case qn:e.y=e.y<0?0:1;break;case wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=_d;mn.DEFAULT_ANISOTROPY=1;var Ct=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],m=l[8],h=l[1],d=l[5],_=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(m-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(m+x)<.1&&Math.abs(_+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,w=(d+1)/2,R=(p+1)/2,C=(u+h)/4,v=(m+x)/4,y=(_+g)/4;return E>w&&E>R?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=C/i,r=v/i):w>R?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=C/s,r=y/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=v/r,s=y/r),this.set(i,s,r,t),this}let M=Math.sqrt((g-_)*(g-_)+(m-x)*(m-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-_)/M,this.y=(m-x)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ao=class extends kn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new mn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ws(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends Ao{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ur=class extends mn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends mn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Et=class n{static{this.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,m,h,d,_,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,m,h,d,_,x,g)}set(e,t,i,s,r,a,o,l,c,u,m,h,d,_,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=m,p[14]=h,p[3]=d,p[7]=_,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Cs.setFromMatrixColumn(e,0).length(),r=1/Cs.setFromMatrixColumn(e,1).length(),a=1/Cs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),m=Math.sin(r);if(e.order==="XYZ"){let h=a*u,d=a*m,_=o*u,x=o*m;t[0]=l*u,t[4]=-l*m,t[8]=c,t[1]=d+_*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=_+d*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,d=l*m,_=c*u,x=c*m;t[0]=h+x*o,t[4]=_*o-d,t[8]=a*c,t[1]=a*m,t[5]=a*u,t[9]=-o,t[2]=d*o-_,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,d=l*m,_=c*u,x=c*m;t[0]=h-x*o,t[4]=-a*m,t[8]=_+d*o,t[1]=d+_*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,d=a*m,_=o*u,x=o*m;t[0]=l*u,t[4]=_*c-d,t[8]=h*c+x,t[1]=l*m,t[5]=x*c+h,t[9]=d*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,d=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=x-h*m,t[8]=_*m+d,t[1]=m,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*m+_,t[10]=h-x*m}else if(e.order==="XZY"){let h=a*l,d=a*c,_=o*l,x=o*c;t[0]=l*u,t[4]=-m,t[8]=c*u,t[1]=h*m+x,t[5]=a*u,t[9]=d*m-_,t[2]=_*m-d,t[6]=o*u,t[10]=x*m+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cg,e,dg)}lookAt(e,t,i){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Di.crossVectors(i,vn),Di.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Di.crossVectors(i,vn)),Di.normalize(),Wa.crossVectors(vn,Di),s[0]=Di.x,s[4]=Wa.x,s[8]=vn.x,s[1]=Di.y,s[5]=Wa.y,s[9]=vn.y,s[2]=Di.z,s[6]=Wa.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],m=i[5],h=i[9],d=i[13],_=i[2],x=i[6],g=i[10],p=i[14],M=i[3],E=i[7],w=i[11],R=i[15],C=s[0],v=s[4],y=s[8],I=s[12],A=s[1],L=s[5],N=s[9],q=s[13],P=s[2],O=s[6],X=s[10],H=s[14],te=s[3],Z=s[7],re=s[11],le=s[15];return r[0]=a*C+o*A+l*P+c*te,r[4]=a*v+o*L+l*O+c*Z,r[8]=a*y+o*N+l*X+c*re,r[12]=a*I+o*q+l*H+c*le,r[1]=u*C+m*A+h*P+d*te,r[5]=u*v+m*L+h*O+d*Z,r[9]=u*y+m*N+h*X+d*re,r[13]=u*I+m*q+h*H+d*le,r[2]=_*C+x*A+g*P+p*te,r[6]=_*v+x*L+g*O+p*Z,r[10]=_*y+x*N+g*X+p*re,r[14]=_*I+x*q+g*H+p*le,r[3]=M*C+E*A+w*P+R*te,r[7]=M*v+E*L+w*O+R*Z,r[11]=M*y+E*N+w*X+R*re,r[15]=M*I+E*q+w*H+R*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],m=e[6],h=e[10],d=e[14],_=e[3],x=e[7],g=e[11],p=e[15],M=l*d-c*h,E=o*d-c*m,w=o*h-l*m,R=a*d-c*u,C=a*h-l*u,v=a*m-o*u;return t*(x*M-g*E+p*w)-i*(_*M-g*R+p*C)+s*(_*E-x*R+p*v)-r*(_*w-x*C+g*v)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],m=e[9],h=e[10],d=e[11],_=e[12],x=e[13],g=e[14],p=e[15],M=t*o-i*a,E=t*l-s*a,w=t*c-r*a,R=i*l-s*o,C=i*c-r*o,v=s*c-r*l,y=u*x-m*_,I=u*g-h*_,A=u*p-d*_,L=m*g-h*x,N=m*p-d*x,q=h*p-d*g,P=M*q-E*N+w*L+R*A-C*I+v*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/P;return e[0]=(o*q-l*N+c*L)*O,e[1]=(s*N-i*q-r*L)*O,e[2]=(x*v-g*C+p*R)*O,e[3]=(h*C-m*v-d*R)*O,e[4]=(l*A-a*q-c*I)*O,e[5]=(t*q-s*A+r*I)*O,e[6]=(g*w-_*v-p*E)*O,e[7]=(u*v-h*w+d*E)*O,e[8]=(a*N-o*A+c*y)*O,e[9]=(i*A-t*N-r*y)*O,e[10]=(_*C-x*w+p*M)*O,e[11]=(m*w-u*C-d*M)*O,e[12]=(o*I-a*L-l*y)*O,e[13]=(t*L-i*I+s*y)*O,e[14]=(x*E-_*R-g*M)*O,e[15]=(u*R-m*E+h*M)*O,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,m=o+o,h=r*c,d=r*u,_=r*m,x=a*u,g=a*m,p=o*m,M=l*c,E=l*u,w=l*m,R=i.x,C=i.y,v=i.z;return s[0]=(1-(x+p))*R,s[1]=(d+w)*R,s[2]=(_-E)*R,s[3]=0,s[4]=(d-w)*C,s[5]=(1-(h+p))*C,s[6]=(g+M)*C,s[7]=0,s[8]=(_+E)*v,s[9]=(g-M)*v,s[10]=(1-(h+x))*v,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Cs.set(s[0],s[1],s[2]).length(),o=Cs.set(s[4],s[5],s[6]).length(),l=Cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Un.copy(this);let c=1/a,u=1/o,m=1/l;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=m,Un.elements[9]*=m,Un.elements[10]*=m,t.setFromRotationMatrix(Un),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=An,l=!1){let c=this.elements,u=2*r/(t-e),m=2*r/(i-s),h=(t+e)/(t-e),d=(i+s)/(i-s),_,x;if(l)_=r/(a-r),x=a*r/(a-r);else if(o===An)_=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Vs)_=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=m,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=An,l=!1){let c=this.elements,u=2/(t-e),m=2/(i-s),h=-(t+e)/(t-e),d=-(i+s)/(i-s),_,x;if(l)_=1/(a-r),x=a/(a-r);else if(o===An)_=-2/(a-r),x=-(a+r)/(a-r);else if(o===Vs)_=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=m,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Cs=new B,Un=new Et,cg=new B(0,0,0),dg=new B(1,1,1),Di=new B,Wa=new B,vn=new B,ph=new Et,mh=new Sn,_i=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],m=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-m,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ph,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mh.setFromEuler(this),this.setFromQuaternion(mh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var qs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ug=0,gh=new B,Rs=new Sn,di=new Et,qa=new B,Mr=new B,hg=new B,fg=new Sn,_h=new B(1,0,0),yh=new B(0,1,0),vh=new B(0,0,1),xh={type:"added"},pg={type:"removed"},Is={type:"childadded",child:null},Lc={type:"childremoved",child:null},Zt=class n extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new B,t=new _i,i=new Sn,s=new B(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ye}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(_h,e)}rotateY(e){return this.rotateOnAxis(yh,e)}rotateZ(e){return this.rotateOnAxis(vh,e)}translateOnAxis(e,t){return gh.copy(e).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_h,e)}translateY(e){return this.translateOnAxis(yh,e)}translateZ(e){return this.translateOnAxis(vh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qa.copy(e):qa.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Mr,qa,this.up):di.lookAt(qa,Mr,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(di),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xh),Is.child=e,this.dispatchEvent(Is),Is.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pg),Lc.child=e,this.dispatchEvent(Lc),Lc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xh),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,fg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let m=l[c];r(e.shapes,m)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),m=a(e.shapes),h=a(e.skeletons),d=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),m.length>0&&(i.shapes=m),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Zt.DEFAULT_UP=new B(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dn=class extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},mg={type:"move"},Xs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,i),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],h=u.position.distanceTo(m.position),d=.02,_=.005;c.inputState.pinching&&h>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new dn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Sf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function Nc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var tt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ct.workingColorSpace){if(e=Id(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Nc(a,r,e+1/3),this.g=Nc(a,r,e),this.b=Nc(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=ln){function i(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){let i=Sf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return ct.workingToColorSpace(en.copy(this),e),Math.round(rt(en.r*255,0,255))*65536+Math.round(rt(en.g*255,0,255))*256+Math.round(rt(en.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(en.copy(this),t);let i=en.r,s=en.g,r=en.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let m=a-o;switch(c=u<=.5?m/(a+o):m/(2-a-o),a){case i:l=(s-r)/m+(s<r?6:0);break;case s:l=(r-i)/m+2;break;case r:l=(i-s)/m+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=ln){ct.workingToColorSpace(en.copy(this),e);let t=en.r,i=en.g,s=en.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(Xa);let i=Ir(Li.h,Xa.h,t),s=Ir(Li.s,Xa.s,t),r=Ir(Li.l,Xa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new tt;tt.NAMES=Sf;var Or=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new tt(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fr=class extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},On=new B,ui=new B,Uc=new B,hi=new B,Ps=new B,Ds=new B,bh=new B,Oc=new B,Fc=new B,kc=new B,Bc=new Ct,zc=new Ct,$c=new Ct,Fi=class n{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),On.subVectors(e,t),s.cross(On);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){On.subVectors(s,t),ui.subVectors(i,t),Uc.subVectors(e,t);let a=On.dot(On),o=On.dot(ui),l=On.dot(Uc),c=ui.dot(ui),u=ui.dot(Uc),m=a*c-o*o;if(m===0)return r.set(0,0,0),null;let h=1/m,d=(c*l-o*u)*h,_=(a*u-o*l)*h;return r.set(1-d-_,_,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(a,hi.y),l.addScaledVector(o,hi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Bc.setScalar(0),zc.setScalar(0),$c.setScalar(0),Bc.fromBufferAttribute(e,t),zc.fromBufferAttribute(e,i),$c.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Bc,r.x),a.addScaledVector(zc,r.y),a.addScaledVector($c,r.z),a}static isFrontFacing(e,t,i,s){return On.subVectors(i,t),ui.subVectors(e,t),On.cross(ui).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),On.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Ps.subVectors(s,i),Ds.subVectors(r,i),Oc.subVectors(e,i);let l=Ps.dot(Oc),c=Ds.dot(Oc);if(l<=0&&c<=0)return t.copy(i);Fc.subVectors(e,s);let u=Ps.dot(Fc),m=Ds.dot(Fc);if(u>=0&&m<=u)return t.copy(s);let h=l*m-u*c;if(h<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(i).addScaledVector(Ps,a);kc.subVectors(e,r);let d=Ps.dot(kc),_=Ds.dot(kc);if(_>=0&&d<=_)return t.copy(r);let x=d*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Ds,o);let g=u*_-d*m;if(g<=0&&m-u>=0&&d-_>=0)return bh.subVectors(r,s),o=(m-u)/(m-u+(d-_)),t.copy(s).addScaledVector(bh,o);let p=1/(g+x+h);return a=x*p,o=h*p,t.copy(i).addScaledVector(Ps,a).addScaledVector(Ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ki=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fn):Fn.fromBufferAttribute(r,a),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ya.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ya.copy(i.boundingBox)),Ya.applyMatrix4(e.matrixWorld),this.union(Ya)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),Ja.subVectors(this.max,wr),Ls.subVectors(e.a,wr),Ns.subVectors(e.b,wr),Us.subVectors(e.c,wr),Ni.subVectors(Ns,Ls),Ui.subVectors(Us,Ns),os.subVectors(Ls,Us);let t=[0,-Ni.z,Ni.y,0,-Ui.z,Ui.y,0,-os.z,os.y,Ni.z,0,-Ni.x,Ui.z,0,-Ui.x,os.z,0,-os.x,-Ni.y,Ni.x,0,-Ui.y,Ui.x,0,-os.y,os.x,0];return!Vc(t,Ls,Ns,Us,Ja)||(t=[1,0,0,0,1,0,0,0,1],!Vc(t,Ls,Ns,Us,Ja))?!1:(Za.crossVectors(Ni,Ui),t=[Za.x,Za.y,Za.z],Vc(t,Ls,Ns,Us,Ja))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fi=[new B,new B,new B,new B,new B,new B,new B,new B],Fn=new B,Ya=new ki,Ls=new B,Ns=new B,Us=new B,Ni=new B,Ui=new B,os=new B,wr=new B,Ja=new B,Za=new B,ls=new B;function Vc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ls.fromArray(n,r);let o=s.x*Math.abs(ls.x)+s.y*Math.abs(ls.y)+s.z*Math.abs(ls.z),l=e.dot(ls),c=t.dot(ls),u=i.dot(ls);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Ut=new B,ja=new He,gg=0,Xn=class extends kn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=mf,this.updateRanges=[],this.gpuType=zn,this.version=0,this._normalizationScale=e!==void 0?Dd(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ja.fromBufferAttribute(this,t),ja.applyMatrix3(e),this.setXY(t,ja.x,ja.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):xf(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):bf(e,this.array)}};var kr=class extends Xn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Br=class extends Xn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var tn=class extends Xn{constructor(e,t,i){super(new Float32Array(e),t,i)}},_g=new ki,Er=new B,Gc=new B,us=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):_g.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Er,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Gc)),this.expandByPoint(Er.copy(e.center).sub(Gc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yg=0,Tn=new Et,Hc=new Zt,Os=new B,xn=new ki,Tr=new ki,Wt=new B,Cn=class n extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gm(e)?Br:kr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ye().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return Hc.lookAt(e),Hc.updateMatrix(),this.applyMatrix4(Hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tn(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(xn.min,Tr.min),xn.expandByPoint(Wt),Wt.addVectors(xn.max,Tr.max),xn.expandByPoint(Wt)):(xn.expandByPoint(Tr.min),xn.expandByPoint(Tr.max))}xn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(Os.fromBufferAttribute(e,c),Wt.add(Os)),s=Math.max(s,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Xn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let I=0;I<i.count;I++)o[I]=new B,l[I]=new B;let u=new B,m=new B,h=new B,d=new He,_=new He,x=new He,g=new B,p=new B;function M(I,A,L){c[I]=c[A]=c[L]=1,u.fromBufferAttribute(i,I),m.fromBufferAttribute(i,A),h.fromBufferAttribute(i,L),d.fromBufferAttribute(r,I),_.fromBufferAttribute(r,A),x.fromBufferAttribute(r,L),m.sub(u),h.sub(u),_.sub(d),x.sub(d);let N=1/(_.x*x.y-x.x*_.y);isFinite(N)&&(g.copy(m).multiplyScalar(x.y).addScaledVector(h,-_.y).multiplyScalar(N),p.copy(h).multiplyScalar(_.x).addScaledVector(m,-x.x).multiplyScalar(N),o[I].add(g),o[A].add(g),o[L].add(g),l[I].add(p),l[A].add(p),l[L].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,A=E.length;I<A;++I){let L=E[I],N=L.start,q=L.count;for(let P=N,O=N+q;P<O;P+=3)M(e.getX(P+0),e.getX(P+1),e.getX(P+2))}let w=new B,R=new B,C=new B,v=new B;function y(I){C.fromBufferAttribute(s,I),v.copy(C);let A=o[I];w.copy(A),w.sub(C.multiplyScalar(C.dot(A))).normalize(),R.crossVectors(v,A);let N=R.dot(l[I])<0?-1:1;a.setXYZW(I,w.x,w.y,w.z,N)}for(let I=0,A=i.count;I<A;++I)c[I]&&y(I);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Xn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,u=new B,m=new B;if(e)for(let h=0,d=e.count;h<d;h+=3){let _=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,m=o.normalized,h=new c.constructor(l.length*u),d=0,_=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*u;for(let p=0;p<u;p++)h[_++]=c[d++]}return new Xn(h,u,m)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,m=c.length;u<m;u++){let h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let m=0,h=c.length;m<h;m++){let d=c[m];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],m=r[c];for(let h=0,d=m.length;h<d;h++)u.push(m[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Wc=new B,vg=new B,xg=new Ye,bn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Wc.subVectors(i,t).cross(vg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Wc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||xg.getNormalMatrix(e),s=this.coplanarPoint(Wc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},bg=0,yi=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=ir(),this.name="",this.type="Material",this.blending=er,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ld,this.blendDst=cd,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mo,this.stencilZFail=mo,this.stencilZPass=mo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new bn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new He().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var pi=new B,qc=new B,Ka=new B,Qa=new B,Bi=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){qc.copy(e).add(t).multiplyScalar(.5),Ka.copy(t).sub(e).normalize(),Qa.copy(this.origin).sub(qc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ka),o=Qa.dot(this.direction),l=-Qa.dot(Ka),c=Qa.lengthSq(),u=Math.abs(1-a*a),m,h,d,_;if(u>0)if(m=a*l-o,h=a*o-l,_=r*u,m>=0)if(h>=-_)if(h<=_){let x=1/u;m*=x,h*=x,d=m*(m+a*h+2*o)+h*(a*m+h+2*l)+c}else h=r,m=Math.max(0,-(a*h+o)),d=-m*m+h*(h+2*l)+c;else h=-r,m=Math.max(0,-(a*h+o)),d=-m*m+h*(h+2*l)+c;else h<=-_?(m=Math.max(0,-(-a*r+o)),h=m>0?-r:Math.min(Math.max(-r,-l),r),d=-m*m+h*(h+2*l)+c):h<=_?(m=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(m=Math.max(0,-(a*r+o)),h=m>0?r:Math.min(Math.max(-r,-l),r),d=-m*m+h*(h+2*l)+c);else h=a>0?-r:r,m=Math.max(0,-(a*h+o)),d=-m*m+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(qc).addScaledVector(Ka,h),d}intersectSphere(e,t){if(e.radius<0)return null;pi.subVectors(e.center,this.origin);let i=pi.dot(this.direction),s=pi.dot(pi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,m=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(e.min.z-h.z)*m,l=(e.max.z-h.z)*m):(o=(e.max.z-h.z)*m,l=(e.min.z-h.z)*m),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,m=e.x-a.x,h=e.y-a.y,d=e.z-a.z,_=t.x-a.x,x=t.y-a.y,g=t.z-a.z,p=i.x-a.x,M=i.y-a.y,E=i.z-a.z,w=Math.abs(l),R=Math.abs(c),C=Math.abs(u),v,y,I,A,L,N,q,P,O,X,H,te;if(w>=R&&w>=C?(I=l,N=m,O=_,te=p,l>=0?(v=c,y=u,A=h,L=d,q=x,P=g,X=M,H=E):(v=u,y=c,A=d,L=h,q=g,P=x,X=E,H=M)):R>=C?(I=c,N=h,O=x,te=M,c>=0?(v=u,y=l,A=d,L=m,q=g,P=_,X=E,H=p):(v=l,y=u,A=m,L=d,q=_,P=g,X=p,H=E)):(I=u,N=d,O=g,te=E,u>=0?(v=l,y=c,A=m,L=h,q=_,P=x,X=p,H=M):(v=c,y=l,A=h,L=m,q=x,P=_,X=M,H=p)),I===0)return null;let Z=v/I,re=y/I,le=1/I,De=A-Z*N,$=L-re*N,Y=q-Z*O,de=P-re*O,pe=X-Z*te,Re=H-re*te,ye=pe*de-Re*Y,ke=De*Re-$*pe,at=Y*$-de*De;if(s){if(ye<0||ke<0||at<0)return null}else if((ye<0||ke<0||at<0)&&(ye>0||ke>0||at>0))return null;let Pe=ye+ke+at;if(Pe===0)return null;let Je=le*(ye*N+ke*O+at*te);return(Pe>0?Je<0:Je>0)?null:this.at(Je/Pe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ro=class extends yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=dd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Sh=new Et,cs=new Bi,eo=new us,Mh=new B,to=new B,no=new B,io=new B,Xc=new B,so=new B,wh=new B,ro=new B,gn=class extends Zt{constructor(e=new Cn,t=new Ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){so.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],m=r[l];u!==0&&(Xc.fromBufferAttribute(m,e),a?so.addScaledVector(Xc,u):so.addScaledVector(Xc.sub(t),u))}t.add(so)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),eo.copy(i.boundingSphere),eo.applyMatrix4(r),cs.copy(e.ray).recast(e.near),!(eo.containsPoint(cs.origin)===!1&&(cs.intersectSphere(eo,Mh)===null||cs.origin.distanceToSquared(Mh)>(e.far-e.near)**2))&&(Sh.copy(r).invert(),cs.copy(e.ray).applyMatrix4(Sh),!(i.boundingBox!==null&&cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,m=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let g=h[_],p=a[g.materialIndex],M=Math.max(g.start,d.start),E=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let w=M,R=E;w<R;w+=3){let C=o.getX(w),v=o.getX(w+1),y=o.getX(w+2);s=ao(this,p,e,i,c,u,m,C,v,y),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let _=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=_,p=x;g<p;g+=3){let M=o.getX(g),E=o.getX(g+1),w=o.getX(g+2);s=ao(this,a,e,i,c,u,m,M,E,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){let g=h[_],p=a[g.materialIndex],M=Math.max(g.start,d.start),E=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let w=M,R=E;w<R;w+=3){let C=w,v=w+1,y=w+2;s=ao(this,p,e,i,c,u,m,C,v,y),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let _=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=_,p=x;g<p;g+=3){let M=g,E=g+1,w=g+2;s=ao(this,a,e,i,c,u,m,M,E,w),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Sg(n,e,t,i,s,r,a,o){let l;if(e.side===hn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Xi,o),l===null)return null;ro.copy(o),ro.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(ro);return c<t.near||c>t.far?null:{distance:c,point:ro.clone(),object:n}}function ao(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,to),n.getVertexPosition(l,no),n.getVertexPosition(c,io);let u=Sg(n,e,t,i,to,no,io,wh);if(u){let m=new B;Fi.getBarycoord(wh,to,no,io,m),s&&(u.uv=Fi.getInterpolatedAttribute(s,o,l,c,m,new He)),r&&(u.uv1=Fi.getInterpolatedAttribute(r,o,l,c,m,new He)),a&&(u.normal=Fi.getInterpolatedAttribute(a,o,l,c,m,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new B,materialIndex:0};Fi.getNormal(to,no,io,h.normal),u.face=h,u.barycoord=m}return u}var Io=class extends mn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=qt,u=qt,m,h){super(null,a,o,l,c,u,s,r,m,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ds=new us,Mg=new He(.5,.5),oo=new B,zi=class{constructor(e=new bn,t=new bn,i=new bn,s=new bn,r=new bn,a=new bn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=An,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],m=r[5],h=r[6],d=r[7],_=r[8],x=r[9],g=r[10],p=r[11],M=r[12],E=r[13],w=r[14],R=r[15];if(s[0].setComponents(c-a,d-u,p-_,R-M).normalize(),s[1].setComponents(c+a,d+u,p+_,R+M).normalize(),s[2].setComponents(c+o,d+m,p+x,R+E).normalize(),s[3].setComponents(c-o,d-m,p-x,R-E).normalize(),i)s[4].setComponents(l,h,g,w).normalize(),s[5].setComponents(c-l,d-h,p-g,R-w).normalize();else if(s[4].setComponents(c-l,d-h,p-g,R-w).normalize(),t===An)s[5].setComponents(c+l,d+h,p+g,R+w).normalize();else if(t===Vs)s[5].setComponents(l,h,g,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);let t=Mg.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(oo.x=s.normal.x>0?e.max.x:e.min.x,oo.y=s.normal.y>0?e.max.y:e.min.y,oo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Eh=new Et,Po=class n{constructor(){this.coordinateSystem=An,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Eh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new zi),i[s].setFromProjectionMatrix(Eh,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new zi),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}};var Ys=class extends yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Do=new B,Lo=new B,Th=new Et,Ar=new Bi,lo=new us,Yc=new B,Ah=new B,zr=class extends Zt{constructor(e=new Cn,t=new Ys){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Do.fromBufferAttribute(t,s-1),Lo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Do.distanceTo(Lo);e.setAttribute("lineDistance",new tn(i,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),lo.copy(i.boundingSphere),lo.applyMatrix4(s),lo.radius+=r,e.ray.intersectsSphere(lo)===!1)return;Th.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Th);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let d=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let x=d,g=_-1;x<g;x+=c){let p=u.getX(x),M=u.getX(x+1),E=co(this,e,Ar,l,p,M,x);E&&t.push(E)}if(this.isLineLoop){let x=u.getX(_-1),g=u.getX(d),p=co(this,e,Ar,l,x,g,_-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=d,g=_-1;x<g;x+=c){let p=co(this,e,Ar,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=co(this,e,Ar,l,_-1,d,_-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function co(n,e,t,i,s,r,a){let o=n.geometry.attributes.position;if(Do.fromBufferAttribute(o,s),Lo.fromBufferAttribute(o,r),t.distanceSqToSegment(Do,Lo,Yc,Ah)>i)return;Yc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Yc);if(!(c<e.near||c>e.far))return{distance:c,point:Ah.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var $r=class extends mn{constructor(e=[],t=ps,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var vi=class extends mn{constructor(e,t,i=Bn,s,r,a,o=qt,l=qt,c,u=gi,m=1){if(u!==gi&&u!==bi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:m};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vr=class extends vi{constructor(e,t=Bn,i=ps,s,r,a=qt,o=qt,l,c=gi){let u={width:e,height:e,depth:1},m=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Gr=class extends mn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},$i=class n extends Cn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],m=[],h=0,d=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(u,3)),this.setAttribute("uv",new tn(m,2));function _(x,g,p,M,E,w,R,C,v,y,I){let A=w/v,L=R/y,N=w/2,q=R/2,P=C/2,O=v+1,X=y+1,H=0,te=0,Z=new B;for(let re=0;re<X;re++){let le=re*L-q;for(let De=0;De<O;De++){let $=De*A-N;Z[x]=$*M,Z[g]=le*E,Z[p]=P,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[g]=0,Z[p]=C>0?1:-1,u.push(Z.x,Z.y,Z.z),m.push(De/v),m.push(1-re/y),H+=1}}for(let re=0;re<y;re++)for(let le=0;le<v;le++){let De=h+le+O*re,$=h+le+O*(re+1),Y=h+(le+1)+O*(re+1),de=h+(le+1)+O*re;l.push(De,$,de),l.push($,Y,de),te+=6}o.addGroup(d,te,I),d+=te,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Js=class n extends Cn{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],m=[],h=[],d=[],_=0,x=[],g=i/2,p=0;M(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new tn(m,3)),this.setAttribute("normal",new tn(h,3)),this.setAttribute("uv",new tn(d,2));function M(){let w=new B,R=new B,C=0,v=(t-e)/i;for(let y=0;y<=r;y++){let I=[],A=y/r,L=A*(t-e)+e;for(let N=0;N<=s;N++){let q=N/s,P=q*l+o,O=Math.sin(P),X=Math.cos(P);R.x=L*O,R.y=-A*i+g,R.z=L*X,m.push(R.x,R.y,R.z),w.set(O,v,X).normalize(),h.push(w.x,w.y,w.z),d.push(q,1-A),I.push(_++)}x.push(I)}for(let y=0;y<s;y++)for(let I=0;I<r;I++){let A=x[I][y],L=x[I+1][y],N=x[I+1][y+1],q=x[I][y+1];(e>0||I!==0)&&(u.push(A,L,q),C+=3),(t>0||I!==r-1)&&(u.push(L,N,q),C+=3)}c.addGroup(p,C,0),p+=C}function E(w){let R=_,C=new He,v=new B,y=0,I=w===!0?e:t,A=w===!0?1:-1;for(let N=1;N<=s;N++)m.push(0,g*A,0),h.push(0,A,0),d.push(.5,.5),_++;let L=_;for(let N=0;N<=s;N++){let P=N/s*l+o,O=Math.cos(P),X=Math.sin(P);v.x=I*X,v.y=g*A,v.z=I*O,m.push(v.x,v.y,v.z),h.push(0,A,0),C.x=O*.5+.5,C.y=X*.5*A+.5,d.push(C.x,C.y),_++}for(let N=0;N<s;N++){let q=R+N,P=L+N;w===!0?u.push(P,P+1,q):u.push(P+1,P,q),y+=3}c.addGroup(p,y,w===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Hr=class n extends Cn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,m=e/o,h=t/l,d=[],_=[],x=[],g=[];for(let p=0;p<u;p++){let M=p*h-a;for(let E=0;E<c;E++){let w=E*m-r;_.push(w,-M,0),x.push(0,0,1),g.push(E/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let E=M+c*p,w=M+c*(p+1),R=M+1+c*(p+1),C=M+1+c*p;d.push(E,w,C),d.push(w,R,C)}this.setIndex(d),this.setAttribute("position",new tn(_,3)),this.setAttribute("normal",new tn(x,3)),this.setAttribute("uv",new tn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};function gs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Ch(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Ch(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function nn(n){let e={};for(let t=0;t<n.length;t++){let i=gs(n[t]);for(let s in i)e[s]=i[s]}return e}function Ch(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function wg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Nd(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var Mf={clone:gs,merge:nn},Eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Yn=class extends yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eg,this.fragmentShader=Tg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gs(e.uniforms),this.uniformsGroups=wg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new tt().setHex(s.value);break;case"v2":this.uniforms[i].value=new He().fromArray(s.value);break;case"v3":this.uniforms[i].value=new B().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ct().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Et().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},No=class extends Yn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Wr=class extends yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ul,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Uo=class extends yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Oo=class extends yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Fs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function uo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Vi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Fo=class extends Vi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jc,endingEnd:jc}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kc:r=e,o=2*t-i;break;case Qc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Kc:a=e,l=2*i-t;break;case Qc:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,m=this._offsetNext,h=this._weightPrev,d=this._weightNext,_=(i-t)/(s-t),x=_*_,g=x*_,p=-h*g+2*h*x-h*_,M=(1+h)*g+(-1.5-2*h)*x+(-.5+h)*_+1,E=(-1-d)*g+(1.5+d)*x+.5*_,w=d*g-d*x;for(let R=0;R!==o;++R)r[R]=p*a[u+R]+M*a[c+R]+E*a[l+R]+w*a[m+R];return r}},ko=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),m=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*m+a[l+h]*u;return r}},Bo=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},zo=class extends Vi{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,m=this.outTangents;if(!u||!m){let _=(i-t)/(s-t),x=1-_;for(let g=0;g!==o;++g)r[g]=a[c+g]*x+a[l+g]*_;return r}let h=o*2,d=e-1;for(let _=0;_!==o;++_){let x=a[c+_],g=a[l+_],p=d*h+_*2,M=m[p],E=m[p+1],w=e*h+_*2,R=u[w],C=u[w+1],v=Cg(i,t,M,R,s);r[_]=wf(v,x,E,C,g)}return r}};function wf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Ag(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Cg(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=wf(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Ag(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var wn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fs(t,this.TimeBufferType),this.values=Fs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Fs(e.times,Array),values:Fs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),uo(e.settings)&&(i.settings={inTangents:Fs(e.settings.inTangents,Array),outTangents:Fs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new zo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pr:t=this.InterpolantFactoryMethodDiscrete;break;case Eo:t=this.InterpolantFactoryMethodLinear;break;case po:t=this.InterpolantFactoryMethodSmooth;break;case Zc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ge("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pr;case this.InterpolantFactoryMethodLinear:return Eo;case this.InterpolantFactoryMethodSmooth:return po;case this.InterpolantFactoryMethodBezier:return Zc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;uo(this.settings)&&(Rh(this.settings.inTangents,e),Rh(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;uo(this.settings)&&(Ih(this.settings.inTangents,e),Ih(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){We("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){We("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Hm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){We("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===po,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let m=o*i,h=m-i,d=m+i;for(let _=0;_!==i;++_){let x=t[m+_];if(x!==t[h+_]||x!==t[d+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let m=o*i,h=a*i;for(let d=0;d!==i;++d)t[h+d]=t[m+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,uo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Rh(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function Ih(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=Eo;var Gi=class extends wn{constructor(e,t,i){super(e,t,i)}};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=Pr;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var $o=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};$o.prototype.ValueTypeName="color";var Vo=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};Vo.prototype.ValueTypeName="number";var Go=class extends Vi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Sn.slerpFlat(r,0,a,c-o,a,c,l);return r}},qr=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Go(this.times,this.values,this.getValueSize(),e)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.InterpolantFactoryMethodSmooth=void 0;var Hi=class extends wn{constructor(e,t,i){super(e,t,i)}};Hi.prototype.ValueTypeName="string";Hi.prototype.ValueBufferType=Array;Hi.prototype.DefaultInterpolation=Pr;Hi.prototype.InterpolantFactoryMethodLinear=void 0;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};Ho.prototype.ValueTypeName="vector";var Wo=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,m){return c.push(u,m),this},this.removeHandler=function(u){let m=c.indexOf(u);return m!==-1&&c.splice(m,2),this},this.getHandler=function(u){for(let m=0,h=c.length;m<h;m+=2){let d=c[m],_=c[m+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ef=new Wo,qo=class{constructor(e){this.manager=e!==void 0?e:Ef,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};qo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xr=class extends Zt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Yr=class extends Xr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Jc=new Et,Ph=new B,Dh=new B,Xo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zi,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ph.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ph),Dh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Dh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Jc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Jc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Vs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ho=new B,fo=new Sn,Wn=new B,Jr=class extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ho,fo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ho,fo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ho,fo,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Oi=new B,Lh=new He,Nh=new He,cn=class extends Jr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,Lh,Nh),t.subVectors(Nh,Lh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Zr=class extends Jr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ed=class extends Xo{constructor(){super(new Zr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zs=class extends Xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new ed}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ks=-90,Bs=1,js=class extends Zt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new cn(ks,Bs,e,t);s.layers=this.layers,this.add(s);let r=new cn(ks,Bs,e,t);r.layers=this.layers,this.add(r);let a=new cn(ks,Bs,e,t);a.layers=this.layers,this.add(a);let o=new cn(ks,Bs,e,t);o.layers=this.layers,this.add(o);let l=new cn(ks,Bs,e,t);l.layers=this.layers,this.add(l);let c=new cn(ks,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===An)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,m=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=x,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(m,h,d),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},Yo=class extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Ud="\\[\\]\\.:\\/",Rg=new RegExp("["+Ud+"]","g"),Od="[^"+Ud+"]",Ig="[^"+Ud.replace("\\.","")+"]",Pg=/((?:WC+[\/:])*)/.source.replace("WC",Od),Dg=/(WCOD+)?/.source.replace("WCOD",Ig),Lg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Od),Ng=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Od),Ug=new RegExp("^"+Pg+Dg+Lg+Ng+"$"),Og=["material","materials","bones","map"],td=class{constructor(e,t,i){let s=i||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Tt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rg,"")}static parseTrackName(e){let t=Ug.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Og.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;We("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=td;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nS=new Float32Array(1);var Uh=new Et,jr=class{constructor(e,t,i=0,s=1/0){this.ray=new Bi(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new qs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):We("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Uh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uh),this}intersectObject(e,t=!0,i=[]){return nd(e,this,i,t),i.sort(Oh),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)nd(e[s],this,i,t);return i.sort(Oh),i}};function Oh(n,e){return n.distance-e.distance}function nd(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)nd(r[a],e,t,!0)}}var Ks=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var id=class{static{this.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};var Kr=class extends kn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Fd(n,e,t,i){let s=Fg(i);switch(t){case Sd:return n*e;case wd:return n*e/s.components*s.byteLength;case nl:return n*e/s.components*s.byteLength;case Yi:return n*e*2/s.components*s.byteLength;case il:return n*e*2/s.components*s.byteLength;case Md:return n*e*3/s.components*s.byteLength;case Vn:return n*e*4/s.components*s.byteLength;case sl:return n*e*4/s.components*s.byteLength;case na:case ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case sa:case ra:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case al:case ll:return Math.max(n,16)*Math.max(e,8)/4;case rl:case ol:return Math.max(n,8)*Math.max(e,8)/2;case cl:case dl:case hl:case fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ul:case aa:case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _l:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case bl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case wl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Tl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Il:case Pl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Dl:case Ll:return Math.ceil(n/4)*Math.ceil(e/4)*8;case oa:case Nl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fg(n){switch(n){case _n:case yd:return{byteLength:1,components:1};case nr:case vd:case $n:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case Bn:case Qo:case zn:return{byteLength:4,components:1};case xd:case bd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Xf(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Bg(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,m=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:m}}function i(o,l,c){let u=l.array,m=l.updateRanges;if(n.bindBuffer(c,o),m.length===0)n.bufferSubData(c,0,u);else{m.sort((d,_)=>d.start-_.start);let h=0;for(let d=1;d<m.length;d++){let _=m[h],x=m[d];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,m[h]=x)}m.length=h+1;for(let d=0,_=m.length;d<_;d++){let x=m[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var zg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$g=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Jg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,e_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,n_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,a_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,o_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,l_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,c_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,d_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,u_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,f_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,p_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,m_="gl_FragColor = linearToOutputTexel( gl_FragColor );",g_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,__=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,y_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,v_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,S_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,w_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,T_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,A_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,R_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,I_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,P_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,D_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,U_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,F_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,k_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,B_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,z_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$_=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,V_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,q_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,J_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q_=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,e0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,n0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,s0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,l0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,c0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,d0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,u0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,h0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,p0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,m0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,g0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,y0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,v0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,x0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,b0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,M0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,w0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,E0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,A0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,R0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,L0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,N0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,k0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,B0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V0=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,q0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,X0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Y0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Z0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,K0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Q0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ey=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ny=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ry=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ay=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,oy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ly=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,py=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,my=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_y=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:zg,alphahash_pars_fragment:$g,alphamap_fragment:Vg,alphamap_pars_fragment:Gg,alphatest_fragment:Hg,alphatest_pars_fragment:Wg,aomap_fragment:qg,aomap_pars_fragment:Xg,batching_pars_vertex:Yg,batching_vertex:Jg,begin_vertex:Zg,beginnormal_vertex:jg,bsdfs:Kg,iridescence_fragment:Qg,bumpmap_pars_fragment:e_,clipping_planes_fragment:t_,clipping_planes_pars_fragment:n_,clipping_planes_pars_vertex:i_,clipping_planes_vertex:s_,color_fragment:r_,color_pars_fragment:a_,color_pars_vertex:o_,color_vertex:l_,common:c_,defaultnormal_vertex:d_,displacementmap_pars_vertex:u_,displacementmap_vertex:h_,emissivemap_fragment:f_,emissivemap_pars_fragment:p_,colorspace_fragment:m_,colorspace_pars_fragment:g_,envmap_fragment:__,envmap_common_pars_fragment:y_,envmap_pars_fragment:v_,envmap_pars_vertex:x_,envmap_physical_pars_fragment:P_,envmap_vertex:b_,fog_vertex:S_,fog_pars_vertex:M_,fog_fragment:w_,fog_pars_fragment:E_,gradientmap_pars_fragment:T_,lightmap_pars_fragment:A_,lights_lambert_fragment:C_,lights_lambert_pars_fragment:R_,lights_pars_begin:I_,lights_toon_fragment:D_,lights_toon_pars_fragment:L_,lights_phong_fragment:N_,lights_phong_pars_fragment:U_,lights_physical_fragment:O_,lights_physical_pars_fragment:F_,lights_fragment_begin:k_,lights_fragment_maps:B_,lights_fragment_end:z_,lightprobes_pars_fragment:$_,logdepthbuf_fragment:V_,logdepthbuf_pars_fragment:G_,logdepthbuf_pars_vertex:H_,logdepthbuf_vertex:W_,map_fragment:q_,map_pars_fragment:X_,map_particle_fragment:Y_,map_particle_pars_fragment:J_,metalnessmap_fragment:Z_,metalnessmap_pars_fragment:j_,morphinstance_vertex:K_,morphcolor_vertex:Q_,morphnormal_vertex:e0,morphtarget_pars_vertex:t0,morphtarget_vertex:n0,normal_fragment_begin:i0,normal_fragment_maps:s0,normal_pars_fragment:r0,normal_pars_vertex:a0,normal_vertex:o0,normalmap_pars_fragment:l0,clearcoat_normal_fragment_begin:c0,clearcoat_normal_fragment_maps:d0,clearcoat_pars_fragment:u0,iridescence_pars_fragment:h0,opaque_fragment:f0,packing:p0,premultiplied_alpha_fragment:m0,project_vertex:g0,dithering_fragment:_0,dithering_pars_fragment:y0,roughnessmap_fragment:v0,roughnessmap_pars_fragment:x0,shadowmap_pars_fragment:b0,shadowmap_pars_vertex:S0,shadowmap_vertex:M0,shadowmask_pars_fragment:w0,skinbase_vertex:E0,skinning_pars_vertex:T0,skinning_vertex:A0,skinnormal_vertex:C0,specularmap_fragment:R0,specularmap_pars_fragment:I0,tonemapping_fragment:P0,tonemapping_pars_fragment:D0,transmission_fragment:L0,transmission_pars_fragment:N0,uv_pars_fragment:U0,uv_pars_vertex:O0,uv_vertex:F0,worldpos_vertex:k0,background_vert:B0,background_frag:z0,backgroundCube_vert:$0,backgroundCube_frag:V0,cube_vert:G0,cube_frag:H0,depth_vert:W0,depth_frag:q0,distance_vert:X0,distance_frag:Y0,equirect_vert:J0,equirect_frag:Z0,linedashed_vert:j0,linedashed_frag:K0,meshbasic_vert:Q0,meshbasic_frag:ey,meshlambert_vert:ty,meshlambert_frag:ny,meshmatcap_vert:iy,meshmatcap_frag:sy,meshnormal_vert:ry,meshnormal_frag:ay,meshphong_vert:oy,meshphong_frag:ly,meshphysical_vert:cy,meshphysical_frag:dy,meshtoon_vert:uy,meshtoon_frag:hy,points_vert:fy,points_frag:py,shadow_vert:my,shadow_frag:gy,sprite_vert:_y,sprite_frag:yy},Te={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Kn={basic:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:nn([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:nn([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:nn([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new tt(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:nn([Te.points,Te.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:nn([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:nn([Te.common,Te.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:nn([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:nn([Te.sprite,Te.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:nn([Te.common,Te.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:nn([Te.lights,Te.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Kn.physical={uniforms:nn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var Ol={r:0,b:0,g:0},vy=new Et,Yf=new Ye;Yf.set(-1,0,0,0,1,0,0,0,1);function xy(n,e,t,i,s,r){let a=new tt(0),o=s===!0?0:1,l,c,u=null,m=0,h=null;function d(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){let w=M.backgroundBlurriness>0;E=e.get(E,w)}return E}function _(M){let E=!1,w=d(M);w===null?g(a,o):w&&w.isColor&&(g(w,1),E=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,E){let w=d(E);w&&w.isCubeTexture?(c===void 0&&(c=new gn(new $i(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:gs(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,C,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(vy.makeRotationFromEuler(E.backgroundRotation)).transpose(),w.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Yf),c.material.toneMapped=ct.getTransfer(w.colorSpace)!==gt,(u!==w||m!==w.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,m=w.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new gn(new Hr(2,2),new Yn({name:"BackgroundMaterial",uniforms:gs(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ct.getTransfer(w.colorSpace)!==gt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||m!==w.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,m=w.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,E){M.getRGB(Ol,Nd(n)),t.buffers.color.setClear(Ol.r,Ol.g,Ol.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:_,addToRenderList:x,dispose:p}}function by(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(L,N,q,P,O){let X=!1,H=m(L,P,q,N);r!==H&&(r=H,c(r.object)),X=d(L,P,q,O),X&&_(L,P,q,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,w(L,N,q,P),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function m(L,N,q,P){let O=P.wireframe===!0,X=i[N.id];X===void 0&&(X={},i[N.id]=X);let H=L.isInstancedMesh===!0?L.id:0,te=X[H];te===void 0&&(te={},X[H]=te);let Z=te[q.id];Z===void 0&&(Z={},te[q.id]=Z);let re=Z[O];return re===void 0&&(re=h(l()),Z[O]=re),re}function h(L){let N=[],q=[],P=[];for(let O=0;O<t;O++)N[O]=0,q[O]=0,P[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:q,attributeDivisors:P,object:L,attributes:{},index:null}}function d(L,N,q,P){let O=r.attributes,X=N.attributes,H=0,te=q.getAttributes();for(let Z in te)if(te[Z].location>=0){let le=O[Z],De=X[Z];if(De===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(De=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(De=L.instanceColor)),le===void 0||le.attribute!==De||De&&le.data!==De.data)return!0;H++}return r.attributesNum!==H||r.index!==P}function _(L,N,q,P){let O={},X=N.attributes,H=0,te=q.getAttributes();for(let Z in te)if(te[Z].location>=0){let le=X[Z];le===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(le=L.instanceColor));let De={};De.attribute=le,le&&le.data&&(De.data=le.data),O[Z]=De,H++}r.attributes=O,r.attributesNum=H,r.index=P}function x(){let L=r.newAttributes;for(let N=0,q=L.length;N<q;N++)L[N]=0}function g(L){p(L,0)}function p(L,N){let q=r.newAttributes,P=r.enabledAttributes,O=r.attributeDivisors;q[L]=1,P[L]===0&&(n.enableVertexAttribArray(L),P[L]=1),O[L]!==N&&(n.vertexAttribDivisor(L,N),O[L]=N)}function M(){let L=r.newAttributes,N=r.enabledAttributes;for(let q=0,P=N.length;q<P;q++)N[q]!==L[q]&&(n.disableVertexAttribArray(q),N[q]=0)}function E(L,N,q,P,O,X,H){H===!0?n.vertexAttribIPointer(L,N,q,O,X):n.vertexAttribPointer(L,N,q,P,O,X)}function w(L,N,q,P){x();let O=P.attributes,X=q.getAttributes(),H=N.defaultAttributeValues;for(let te in X){let Z=X[te];if(Z.location>=0){let re=O[te];if(re===void 0&&(te==="instanceMatrix"&&L.instanceMatrix&&(re=L.instanceMatrix),te==="instanceColor"&&L.instanceColor&&(re=L.instanceColor)),re!==void 0){let le=re.normalized,De=re.itemSize,$=e.get(re);if($===void 0)continue;let Y=$.buffer,de=$.type,pe=$.bytesPerElement,Re=de===n.INT||de===n.UNSIGNED_INT||re.gpuType===Qo;if(re.isInterleavedBufferAttribute){let ye=re.data,ke=ye.isInterleavedBuffer===!0?ye.stride:ye.itemSize,at=re.offset;if(ye.isInstancedInterleavedBuffer||ye.isInstancedBufferAttribute){for(let Pe=0;Pe<Z.locationSize;Pe++)p(Z.location+Pe,ye.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Pe=0;Pe<Z.locationSize;Pe++)g(Z.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let Pe=0;Pe<Z.locationSize;Pe++)E(Z.location+Pe,De/Z.locationSize,de,le,ke*pe,(at+De/Z.locationSize*Pe)*pe,Re)}else{if(re.isInstancedBufferAttribute){for(let ye=0;ye<Z.locationSize;ye++)p(Z.location+ye,re.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ye=0;ye<Z.locationSize;ye++)g(Z.location+ye);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let ye=0;ye<Z.locationSize;ye++)E(Z.location+ye,De/Z.locationSize,de,le,De*pe,De/Z.locationSize*ye*pe,Re)}}else if(H!==void 0){let le=H[te];if(le!==void 0)switch(le.length){case 2:n.vertexAttrib2fv(Z.location,le);break;case 3:n.vertexAttrib3fv(Z.location,le);break;case 4:n.vertexAttrib4fv(Z.location,le);break;default:n.vertexAttrib1fv(Z.location,le)}}}}M()}function R(){I();for(let L in i){let N=i[L];for(let q in N){let P=N[q];for(let O in P){let X=P[O];for(let H in X)u(X[H].object),delete X[H];delete P[O]}}delete i[L]}}function C(L){if(i[L.id]===void 0)return;let N=i[L.id];for(let q in N){let P=N[q];for(let O in P){let X=P[O];for(let H in X)u(X[H].object),delete X[H];delete P[O]}}delete i[L.id]}function v(L){for(let N in i){let q=i[N];for(let P in q){let O=q[P];if(O[L.id]===void 0)continue;let X=O[L.id];for(let H in X)u(X[H].object),delete X[H];delete O[L.id]}}}function y(L){for(let N in i){let q=i[N],P=L.isInstancedMesh===!0?L.id:0,O=q[P];if(O!==void 0){for(let X in O){let H=O[X];for(let te in H)u(H[te].object),delete H[te];delete O[X]}delete q[P],Object.keys(q).length===0&&delete i[N]}}}function I(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:A,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:v,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function Sy(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function My(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let v=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(v){return!(v!==Vn&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){let y=v===$n&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==_n&&v!==zn&&!y&&i.convert(v)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(v){if(v==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ge("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&m===!1;t.reversedDepthBuffer===!0&&m===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&m===!0&&Ge("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:m,maxTextures:d,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:w,maxSamples:R,samples:C}}function wy(n){let e=this,t=null,i=0,s=!1,r=!1,a=new bn,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,h){let d=m.length!==0||h||i!==0||s;return s=h,i=m.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,h){t=u(m,h,0)},this.setState=function(m,h,d){let _=m.clippingPlanes,x=m.clipIntersection,g=m.clipShadows,p=n.get(m);if(!s||_===null||_.length===0||r&&!g)r?u(null):c();else{let M=r?0:i,E=M*4,w=p.clippingState||null;l.value=w,w=u(_,h,E,d);for(let R=0;R!==E;++R)w[R]=t[R];p.clippingState=w,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(m,h,d,_){let x=m!==null?m.length:0,g=null;if(x!==0){if(g=l.value,_!==!0||g===null){let p=d+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,w=d;E!==x;++E,w+=4)a.copy(m[E]).applyMatrix4(M,o),a.normal.toArray(g,w),g[w+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var da=class extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new $r(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $i(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:gs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:hs});r.uniforms.tEquirect.value=t;let a=new gn(s,r),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=un),new js(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},Tf=256,Ey=3,Ty=20,Jf=256,Zf=16,Ay=3,Cy=new B,Ry=new tt,kl=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new js(1,10,null),this._boxMesh=new gn(new $i(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Cy}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let m=l.autoClear,h=l.autoClearColor,d=l.autoClearDepth,_=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(Ry));let g=new js(i,s,u);return g.position.copy(o),g.update(l,e),l.autoClear=m,l.autoClearColor=h,l.autoClearDepth=d,l.autoClearStencil=_,e.background=x,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Tf,Pd(e))}_fromTexture(e,t){e.mapping===ps||e.mapping===tr?this._setSize(e.image.length===0?Tf:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Af(e,!1,!1),i=Math.log2(e)-Ey;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Af(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ps||e.mapping===tr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Cf()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Iy(),this._integrationMaterial=Py());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Zf);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-Ay)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(Jf*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Dy());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};function Af(n,e,t){return new da(n,{minFilter:xi,generateMipmaps:e,type:$n,colorSpace:Dr,depthBuffer:t})}function ua(n,e,t){return new Yn({name:n,uniforms:e,vertexShader:it.cube_vert,fragmentShader:t,side:hn,blending:hs,depthTest:!1,depthWrite:!1})}function Iy(){return ua("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Jf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Py(){return ua("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Zf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Dy(){return ua("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ty}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Cf(){return ua("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Rf(){return ua("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Ly(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===Zo||d===jo)if(e.has(h)){let _=e.get(h).texture;return o(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let x=new da(_.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){let d=h.mapping,_=d===Zo||d===jo,x=d===ps||d===tr;if(_||x){let g=t.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return i===null&&(i=new kl(n)),g=_?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{let M=h.image;return _&&M&&M.height>0||x&&M&&l(M)?(i===null&&(i=new kl(n)),g=_?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===Zo?h.mapping=ps:d===jo&&(h.mapping=tr),h}function l(h){let d=0,_=6;for(let x=0;x<_;x++)h[x]!==void 0&&d++;return d===_}function c(h){let d=h.target;d.removeEventListener("dispose",c);let _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function Ny(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Cr("WebGLRenderer: "+i+" extension not supported."),s}}}function Uy(n,e,t,i){let s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){l(_.target)}function l(_){_.index!==null&&e.remove(_.index);for(let g in _.attributes)e.remove(_.attributes[g]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);let x=r.get(_);x&&(e.remove(x),r.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function u(_){let x=_.attributes;for(let g in x)e.update(x[g],n.ARRAY_BUFFER)}function m(_){let x=_.index,g=_.attributes.position,p=0;if(g===void 0)return;let M=x!==null?x.array.length:g.array.length/3-1,E=g.count>=65535?Br:kr,w=new E(Math.ceil(M/3)*6,1),R=w.array;if(x!==null){let v=x.array;p=x.version;for(let y=0,I=0;y<M;y+=3){let A=v[y+0],L=v[y+1],N=v[y+2];R[I++]=A,R[I++]=L,R[I++]=L,R[I++]=N,R[I++]=N,R[I++]=A}}else{p=g.version;for(let v=0,y=0;v<M;v+=3){let I=v+0,A=v+1,L=v+2;R[y++]=I,R[y++]=A,R[y++]=A,R[y++]=L,R[y++]=L,R[y++]=I}}w.version=p;let C=r.get(_);C&&e.remove(C),r.set(_,w)}function h(_){let x=r.get(_);if(x){let g=_.index;g!==null&&x.version<g.version&&m(_)}else m(_);return r.get(_)}function d(){for(let _ in s){let x=s[_].deref();x!==void 0&&l(x)}}return{get:c,update:u,getWireframeAttribute:h,dispose:d}}function Oy(n,e,t){let i;function s(m){i=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,h){n.drawElements(i,h,r,m*a),t.update(h,i,1)}function c(m,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,m*a,d),t.update(h,i,d))}function u(m,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,m,0,d);let x=0;for(let g=0;g<d;g++)x+=h[g];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Fy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ky(n,e,t){let i=new WeakMap,s=new Ct;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==m){let I=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",I)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;d===!0&&(E=1),_===!0&&(E=2),x===!0&&(E=3);let w=o.attributes.position.count*E,R=1;w>e.maxTextureSize&&(R=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);let C=new Float32Array(w*R*4*m),v=new Ur(C,w,R,m);v.type=zn,v.needsUpdate=!0;let y=E*4;for(let A=0;A<m;A++){let L=g[A],N=p[A],q=M[A],P=w*R*4*A;for(let O=0;O<L.count;O++){let X=O*y;d===!0&&(s.fromBufferAttribute(L,O),C[P+X+0]=s.x,C[P+X+1]=s.y,C[P+X+2]=s.z,C[P+X+3]=0),_===!0&&(s.fromBufferAttribute(N,O),C[P+X+4]=s.x,C[P+X+5]=s.y,C[P+X+6]=s.z,C[P+X+7]=0),x===!0&&(s.fromBufferAttribute(q,O),C[P+X+8]=s.x,C[P+X+9]=s.y,C[P+X+10]=s.z,C[P+X+11]=q.itemSize===4?s.w:1)}}h={count:m,texture:v,size:new He(w,R)},i.set(o,h),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let _=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function By(n,e,t,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,m=c.geometry,h=e.get(c,m);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var zy={[ud]:"LINEAR_TONE_MAPPING",[hd]:"REINHARD_TONE_MAPPING",[fd]:"CINEON_TONE_MAPPING",[ea]:"ACES_FILMIC_TONE_MAPPING",[md]:"AGX_TONE_MAPPING",[gd]:"NEUTRAL_TONE_MAPPING",[pd]:"CUSTOM_TONE_MAPPING"};function $y(n,e,t,i,s,r){let a=new Mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new Cn;u.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new tn([0,2,0,0,2,0],2));let m=new No({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new gn(u,m),d=new Zr(-1,1,1,-1,0,1),_=null,x=null,g=!1,p,M=null,E=[],w=!1;this.setSize=function(R,C){a.setSize(R,C),o!==null&&o.setSize(R,C),l!==null&&l.setSize(R,C);for(let v=0;v<E.length;v++){let y=E[v];y.setSize&&y.setSize(R,C)}},this.setEffects=function(R){E=R,w=E.length>0&&E[0].isRenderPass===!0;let C=a.width,v=a.height;E.length>0&&o===null&&(o=new Mn(C,v,{type:$n,depthBuffer:!1,stencilBuffer:!1}),l=new Mn(C,v,{type:$n,depthBuffer:!1,stencilBuffer:!1}));let y=s===!0&&E.some(I=>I.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&c===null&&(c=new vi(C,v),r===!0&&(c.format=bi,c.type=ms)),a.dispose(),a.depthTexture=y?c:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let I=0;I<E.length;I++){let A=E[I];A.setSize&&A.setSize(C,v),y&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(R,C){if(g||R.toneMapping===Zn&&E.length===0)return!1;if(M=C,C!==null){let v=C.width,y=C.height;(a.width!==v||a.height!==y)&&this.setSize(v,y)}return w===!1&&R.setRenderTarget(a),p=R.toneMapping,R.toneMapping=Zn,!0},this.hasRenderPass=function(){return w},this.end=function(R,C){R.toneMapping=p,g=!0;let v=a,y=o;for(let I=0;I<E.length;I++){let A=E[I];A.enabled!==!1&&(A.render(R,y,v,C),A.needsSwap!==!1&&(v=y,y=y===o?l:o))}if(_!==R.outputColorSpace||x!==R.toneMapping){_=R.outputColorSpace,x=R.toneMapping,m.defines={},ct.getTransfer(_)===gt&&(m.defines.SRGB_TRANSFER="");let I=zy[x];I&&(m.defines[I]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=v.texture,R.setRenderTarget(M),R.render(h,d),M=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),m.dispose()}}var jf=new mn,Kf=new vi(1,1),Qf=new Vr(1),ep=new Ur,tp=new Co,np=new $r,If=[],Pf=[],Df=new Float32Array(16),Lf=new Float32Array(9),Nf=new Float32Array(4);function rr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=If[s];if(r===void 0&&(r=new Float32Array(s),If[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function zl(n,e){let t=Pf[e];t===void 0&&(t=new Int32Array(e),Pf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Vy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Gy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function Hy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function Wy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function qy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Nf.set(i),n.uniformMatrix2fv(this.addr,!1,Nf),zt(t,i)}}function Xy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Lf.set(i),n.uniformMatrix3fv(this.addr,!1,Lf),zt(t,i)}}function Yy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Df.set(i),n.uniformMatrix4fv(this.addr,!1,Df),zt(t,i)}}function Jy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Zy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function jy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function Ky(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function Qy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ev(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function tv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function nv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function $l(n){return n.version===0&&(n.compareFunction=Ad,n.needsUpdate=!0),n}function iv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=$l(Kf):r=jf,t.setTexture2D(e||r,s)}function sv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||tp,s)}function rv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=$l(Qf):r=np,t.setTextureCube(e||r,s)}function av(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ep,s)}function ov(n){switch(n){case 5126:return Vy;case 35664:return Gy;case 35665:return Hy;case 35666:return Wy;case 35674:return qy;case 35675:return Xy;case 35676:return Yy;case 5124:case 35670:return Jy;case 35667:case 35671:return Zy;case 35668:case 35672:return jy;case 35669:case 35673:return Ky;case 5125:return Qy;case 36294:return ev;case 36295:return tv;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return sv;case 35680:case 36300:case 36308:case 36293:return rv;case 36289:case 36303:case 36311:case 36292:return av}}function lv(n,e){n.uniform1fv(this.addr,e)}function cv(n,e){let t=rr(e,this.size,2);n.uniform2fv(this.addr,t)}function dv(n,e){let t=rr(e,this.size,3);n.uniform3fv(this.addr,t)}function uv(n,e){let t=rr(e,this.size,4);n.uniform4fv(this.addr,t)}function hv(n,e){let t=rr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function fv(n,e){let t=rr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function pv(n,e){let t=rr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function mv(n,e){n.uniform1iv(this.addr,e)}function gv(n,e){n.uniform2iv(this.addr,e)}function _v(n,e){n.uniform3iv(this.addr,e)}function yv(n,e){n.uniform4iv(this.addr,e)}function vv(n,e){n.uniform1uiv(this.addr,e)}function xv(n,e){n.uniform2uiv(this.addr,e)}function bv(n,e){n.uniform3uiv(this.addr,e)}function Sv(n,e){n.uniform4uiv(this.addr,e)}function Mv(n,e,t){let i=this.cache,s=e.length,r=zl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=$l(Kf):a=jf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function wv(n,e,t){let i=this.cache,s=e.length,r=zl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||tp,r[a])}function Ev(n,e,t){let i=this.cache,s=e.length,r=zl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=$l(Qf):a=np;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Tv(n,e,t){let i=this.cache,s=e.length,r=zl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),zt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||ep,r[a])}function Av(n){switch(n){case 5126:return lv;case 35664:return cv;case 35665:return dv;case 35666:return uv;case 35674:return hv;case 35675:return fv;case 35676:return pv;case 5124:case 35670:return mv;case 35667:case 35671:return gv;case 35668:case 35672:return _v;case 35669:case 35673:return yv;case 5125:return vv;case 36294:return xv;case 36295:return bv;case 36296:return Sv;case 35678:case 36198:case 36298:case 36306:case 35682:return Mv;case 35679:case 36299:case 36307:return wv;case 35680:case 36300:case 36308:case 36293:return Ev;case 36289:case 36303:case 36311:case 36292:return Tv}}var zd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ov(t.type)}},$d=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Av(t.type)}},Vd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},kd=/(\w+)(\])?(\[|\.)?/g;function Uf(n,e){n.seq.push(e),n.map[e.id]=e}function Cv(n,e,t){let i=n.name,s=i.length;for(kd.lastIndex=0;;){let r=kd.exec(i),a=kd.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Uf(t,c===void 0?new zd(o,n,e):new $d(o,n,e));break}else{let m=t.map[o];m===void 0&&(m=new Vd(o),Uf(t,m)),t=m}}}var sr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Cv(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Of(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Rv=37297,Iv=0;function Pv(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Ff=new Ye;function Dv(n){ct._getMatrix(Ff,ct.workingColorSpace,n);let e=`mat3( ${Ff.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case Lr:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function kf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Pv(n.getShaderSource(e),o)}else return r}function Lv(n,e){let t=Dv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Nv={[ud]:"Linear",[hd]:"Reinhard",[fd]:"Cineon",[ea]:"ACESFilmic",[md]:"AgX",[gd]:"Neutral",[pd]:"Custom"};function Uv(n,e){let t=Nv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Fl=new B;function Ov(){ct.getLuminanceCoefficients(Fl);let n=Fl.x.toFixed(4),e=Fl.y.toFixed(4),t=Fl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function kv(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Bv(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ca(n){return n!==""}function Bf(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function zf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gd(n){return n.replace(zv,$v)}function $v(n,e){let t=it[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Gd(t)}var Vv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $f(n){return n.replace(Vv,Gv)}function Gv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Hv={[Qr]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function Wv(n){return Hv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var qv={[tr]:"ENVMAP_MODE_REFRACTION"};function Xv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":qv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Yv={[dd]:"ENVMAP_BLENDING_MULTIPLY",[sf]:"ENVMAP_BLENDING_MIX",[rf]:"ENVMAP_BLENDING_ADD"};function Jv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Yv[n.combine]||"ENVMAP_BLENDING_NONE"}function Zv(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Wv(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Xv(t),m=Jv(t),h=Fv(t),d=kv(r),_=s.createProgram(),x,g,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(ca).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(ca).join(`
`),g.length>0&&(g+=`
`)):(x=[Vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),g=[Vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+m:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?it.tonemapping_pars_fragment:"",t.toneMapping!==Zn?Uv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Lv("linearToOutputTexel",t.outputColorSpace),Ov(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ca).join(`
`)),a=Gd(a),a=Bf(a,t),a=zf(a,t),o=Gd(o),o=Bf(o,t),o=zf(o,t),a=$f(a),o=$f(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,x=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===Cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=p+x+a,E=p+g+o,w=Of(s,s.VERTEX_SHADER,M),R=Of(s,s.FRAGMENT_SHADER,E);s.attachShader(_,w),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(A){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(_)||"",N=s.getShaderInfoLog(w)||"",q=s.getShaderInfoLog(R)||"",P=L.trim(),O=N.trim(),X=q.trim(),H=!0,te=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,R);else{let Z=kf(s,w,"vertex"),re=kf(s,R,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+P+`
`+Z+`
`+re)}else P!==""?Ge("WebGLProgram: Program Info Log:",P):(O===""||X==="")&&(te=!1);te&&(A.diagnostics={runnable:H,programLog:P,vertexShader:{log:O,prefix:x},fragmentShader:{log:X,prefix:g}})}s.deleteShader(w),s.deleteShader(R),v=new sr(s,_),y=Bv(s,_)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,Rv)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Iv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=R,this}var jv=0,Hd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Wd(e),t.set(e,i)),i}},Wd=class{constructor(e){this.id=jv++,this.code=e,this.usedTimes=0}};function Kv(n){return n===Yi||n===aa||n===oa}function Qv(n,e,t,i,s,r){let a=new qs,o=new Hd,l=new Set,c=[],u=new Map,m=i.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,y,I,A,L,N){let q=A.fog,P=L.geometry,O=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?A.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,H=e.get(v.envMap||O,X),te=h[v.type],Z=i.precision;v.precision!==null&&(Z=i.getMaxPrecision(v.precision),Z!==v.precision&&Ge("WebGLProgram.getParameters:",v.precision,"not supported, using",Z,"instead."));let re=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,le=re!==void 0?re.length:0,De=0;P.morphAttributes.position!==void 0&&(De=1),P.morphAttributes.normal!==void 0&&(De=2),P.morphAttributes.color!==void 0&&(De=3);let $,Y,de,pe;if(te){let Ee=Kn[te];$=Ee.vertexShader,Y=Ee.fragmentShader}else{$=v.vertexShader,Y=v.fragmentShader;let Ee=o.getVertexShaderStage(v),yt=o.getFragmentShaderStage(v);o.update(v,Ee,yt),de=Ee.id,pe=yt.id}let Re=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),ke=L.isInstancedMesh===!0,at=L.isBatchedMesh===!0,Pe=!!v.map,Je=!!v.matcap,st=!!H,Ze=st&&H.isPMREMTexture===!0,Rt=!!v.aoMap,St=!!v.lightMap,z=!!v.bumpMap&&v.wireframe===!1,k=!!v.normalMap,j=!!v.displacementMap,oe=!!v.emissiveMap,ne=!!v.metalnessMap,Ae=!!v.roughnessMap,Be=v.anisotropy>0,U=v.clearcoat>0,Ie=v.diffuseRoughness>0,Qe=v.dispersion>0,he=v.retroreflectivity>0,me=v.iridescence>0,Lt=v.sheen>0,$e=v.transmission>0,qe=Be&&!!v.anisotropyMap,T=U&&!!v.clearcoatMap,b=U&&!!v.clearcoatNormalMap,G=U&&!!v.clearcoatRoughnessMap,ce=Ie&&!!v.diffuseRoughnessMap,ae=me&&!!v.iridescenceMap,ge=me&&!!v.iridescenceThicknessMap,Se=Lt&&!!v.sheenColorMap,ee=Lt&&!!v.sheenRoughnessMap,ie=!!v.specularMap,ve=!!v.specularColorMap,D=!!v.specularIntensityMap,se=$e&&!!v.transmissionMap,K=$e&&!!v.thicknessMap,xe=!!v.gradientMap,fe=!!v.alphaMap,_e=v.alphaTest>0,ze=!!v.alphaHash,nt=!!v.extensions,ue=Zn;v.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(ue=n.toneMapping);let Ve=Ze?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,et={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:$,fragmentShader:Y,defines:v.defines,customVertexShaderID:de,customFragmentShaderID:pe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:Z,batching:at,batchingColor:at&&L._colorsTexture!==null,instancing:ke,instancingColor:ke&&L.instanceColor!==null,instancingMorph:ke&&L.morphTexture!==null,outputColorSpace:Re===null?n.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Pe,matcap:Je,envMap:st,envMapMode:st&&H.mapping,envMapPMREM:Ze,envMapMaxLod:Ze?Ve.length-1:null,envMapSize:Ze?Ve[0].width:null,aoMap:Rt,lightMap:St,bumpMap:z,normalMap:k,displacementMap:j,emissiveMap:oe,normalMapObjectSpace:k&&v.normalMapType===lf,normalMapTangentSpace:k&&v.normalMapType===Ul,packedNormalMap:k&&v.normalMapType===Ul&&Kv(v.normalMap.format),metalnessMap:ne,roughnessMap:Ae,anisotropy:Be,anisotropyMap:qe,clearcoat:U,clearcoatMap:T,clearcoatNormalMap:b,clearcoatRoughnessMap:G,diffuseRoughness:Ie,diffuseRoughnessMap:ce,dispersion:Qe,retroreflection:he,iridescence:me,iridescenceMap:ae,iridescenceThicknessMap:ge,sheen:Lt,sheenColorMap:Se,sheenRoughnessMap:ee,specularMap:ie,specularColorMap:ve,specularIntensityMap:D,transmission:$e,transmissionMap:se,thicknessMap:K,gradientMap:xe,opaque:v.transparent===!1&&v.blending===er&&v.alphaToCoverage===!1,alphaMap:fe,alphaTest:_e,alphaHash:ze,combine:v.combine,mapUv:Pe&&d(v.map.channel),aoMapUv:Rt&&d(v.aoMap.channel),lightMapUv:St&&d(v.lightMap.channel),bumpMapUv:z&&d(v.bumpMap.channel),normalMapUv:k&&d(v.normalMap.channel),displacementMapUv:j&&d(v.displacementMap.channel),emissiveMapUv:oe&&d(v.emissiveMap.channel),metalnessMapUv:ne&&d(v.metalnessMap.channel),roughnessMapUv:Ae&&d(v.roughnessMap.channel),anisotropyMapUv:qe&&d(v.anisotropyMap.channel),clearcoatMapUv:T&&d(v.clearcoatMap.channel),clearcoatNormalMapUv:b&&d(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&d(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ce&&d(v.diffuseRoughnessMap.channel),iridescenceMapUv:ae&&d(v.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&d(v.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&d(v.sheenColorMap.channel),sheenRoughnessMapUv:ee&&d(v.sheenRoughnessMap.channel),specularMapUv:ie&&d(v.specularMap.channel),specularColorMapUv:ve&&d(v.specularColorMap.channel),specularIntensityMapUv:D&&d(v.specularIntensityMap.channel),transmissionMapUv:se&&d(v.transmissionMap.channel),thicknessMapUv:K&&d(v.thicknessMap.channel),alphaMapUv:fe&&d(v.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(k||Be),vertexNormals:!!P.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!P.attributes.uv&&(Pe||fe),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||P.attributes.normal===void 0&&k===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:ye,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:De,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:N.filter(Ee=>Ee.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ue,decodeVideoTexture:Pe&&v.map.isVideoTexture===!0&&ct.getTransfer(v.map.colorSpace)===gt,decodeVideoTextureEmissive:oe&&v.emissiveMap.isVideoTexture===!0&&ct.getTransfer(v.emissiveMap.colorSpace)===gt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Jn,flipSided:v.side===hn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:nt&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&v.extensions.multiDraw===!0||at)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return et.vertexUv1s=l.has(1),et.vertexUv2s=l.has(2),et.vertexUv3s=l.has(3),l.clear(),et}function x(v){let y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)y.push(I),y.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(g(y,v),p(y,v),y.push(n.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function g(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapPMREM),v.push(y.envMapMaxLod),v.push(y.envMapSize),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.diffuseRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.numSunLights),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numSunLightShadows),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.numLightProbeGrids),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function p(v,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){let y=h[v.type],I;if(y){let A=Kn[y];I=Mf.clone(A.uniforms)}else I=v.uniforms;return I}function E(v,y){let I=u.get(y);return I!==void 0?++I.usedTimes:(I=new Zv(n,y,v,s),c.push(I),u.set(y,I)),I}function w(v){if(--v.usedTimes===0){let y=c.indexOf(v);c[y]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function R(v){o.remove(v)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:M,acquireProgram:E,releaseProgram:w,releaseShaderCache:R,programs:c,dispose:C}}function ex(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function tx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Gf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Hf(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,_,x,g,p){let M=n[e];return M===void 0?(M={id:h.id,object:h,geometry:d,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:p},n[e]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=_,M.materialVariant=a(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=g,M.group=p),e++,M}function l(h,d,_,x,g,p,M){M.reversedDepth===!0&&(g=-g);let E=o(h,d,_,x,g,p);_.transmission>0?i.push(E):_.transparent===!0?s.push(E):t.push(E)}function c(h,d,_,x,g,p){let M=o(h,d,_,x,g,p);_.transmission>0?i.unshift(M):_.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,d){t.length>1&&t.sort(h||tx),i.length>1&&i.sort(d||Gf),s.length>1&&s.sort(d||Gf)}function m(){for(let h=e,d=n.length;h<d;h++){let _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:m,sort:u}}function nx(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Hf,n.set(i,[a])):s>=r.length?(a=new Hf,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function ix(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new tt};break;case"SpotLight":t={position:new B,direction:new B,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function sx(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var rx=0;function ax(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ox(n){let e=new ix,t=sx(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let s=new B,r=new Et,a=new Et;function o(c){let u=0,m=0,h=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let d=0,_=0,x=0,g=0,p=0,M=0,E=0,w=0,R=0,C=0,v=0,y=0,I=0,A=0;c.sort(ax);for(let N=0,q=c.length;N<q;N++){let P=c[N],O=P.color,X=P.intensity,H=P.distance,te=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Yi?te=P.shadow.map.texture:te=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=O.r*X,m+=O.g*X,h+=O.b*X;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(P.sh.coefficients[Z],X);A++}else if(P.isSunLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let re=P.shadow,le=t.get(P);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),i.sunShadow[_]=le,i.sunShadowMap[_]=te;let De=re.getViewportCount();for(let $=0;$<De;$++)i.sunShadowMatrix[x+$]=re.getMatrix($),i.sunShadowCascade[x+$]=re._cascadeData[$];x+=De,_++}i.sun[d]=Z,d++}else if(P.isDirectionalLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let re=P.shadow,le=t.get(P);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,i.directionalShadow[g]=le,i.directionalShadowMap[g]=te,i.directionalShadowMatrix[g]=P.shadow.matrix,R++}i.directional[g]=Z,g++}else if(P.isSpotLight){let Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(O).multiplyScalar(X),Z.distance=H,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,i.spot[M]=Z;let re=P.shadow;if(P.map&&(i.spotLightMap[y]=P.map,y++,re.updateMatrices(P),P.castShadow&&I++),i.spotLightMatrix[M]=re.matrix,P.castShadow){let le=t.get(P);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,i.spotShadow[M]=le,i.spotShadowMap[M]=te,v++}M++}else if(P.isRectAreaLight){let Z=e.get(P);Z.color.copy(O).multiplyScalar(X),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),i.rectArea[E]=Z,E++}else if(P.isPointLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){let re=P.shadow,le=t.get(P);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,le.shadowCameraNear=re.camera.near,le.shadowCameraFar=re.camera.far,i.pointShadow[p]=le,i.pointShadowMap[p]=te,i.pointShadowMatrix[p]=P.shadow.matrix,C++}i.point[p]=Z,p++}else if(P.isHemisphereLight){let Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(X),Z.groundColor.copy(P.groundColor).multiplyScalar(X),i.hemi[w]=Z,w++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=m,i.ambient[2]=h;let L=i.hash;(L.sunLength!==d||L.directionalLength!==g||L.pointLength!==p||L.spotLength!==M||L.rectAreaLength!==E||L.hemiLength!==w||L.numSunShadows!==_||L.numDirectionalShadows!==R||L.numPointShadows!==C||L.numSpotShadows!==v||L.numSpotMaps!==y||L.numLightProbes!==A)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=E,i.point.length=p,i.hemi.length=w,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=C,i.pointShadowMap.length=C,i.pointShadowMatrix.length=C,i.spotShadow.length=v,i.spotShadowMap.length=v,i.spotLightMatrix.length=v+y-I,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=A,L.sunLength=d,L.directionalLength=g,L.pointLength=p,L.spotLength=M,L.rectAreaLength=E,L.hemiLength=w,L.numSunShadows=_,L.numDirectionalShadows=R,L.numPointShadows=C,L.numSpotShadows=v,L.numSpotMaps=y,L.numLightProbes=A,i.version=rx++)}function l(c,u){let m=0,h=0,d=0,_=0,x=0,g=0,p=u.matrixWorldInverse;for(let M=0,E=c.length;M<E;M++){let w=c[M];if(w.isSunLight){let R=i.sun[m];R.direction.setFromMatrixPosition(w.matrixWorld),R.direction.transformDirection(p),m++}else if(w.isDirectionalLight){let R=i.directional[h];R.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),h++}else if(w.isSpotLight){let R=i.spot[_];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),_++}else if(w.isRectAreaLight){let R=i.rectArea[x];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),a.identity(),r.copy(w.matrixWorld),r.premultiply(p),a.extractRotation(r),R.halfWidth.set(w.width*.5,0,0),R.halfHeight.set(0,w.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),x++}else if(w.isPointLight){let R=i.point[d];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(p),d++}else if(w.isHemisphereLight){let R=i.hemi[g];R.direction.setFromMatrixPosition(w.matrixWorld),R.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function Wf(n){let e=new ox(n),t=[],i=[],s=[];function r(m){u.camera=m,t.length=0,i.length=0,s.length=0}function a(m){m.isLightProbeGrid?s.push(m):t.push(m)}function o(m){i.push(m)}function l(){e.setup(t),s.sort((m,h)=>m.priority-h.priority||m.id-h.id)}function c(m){e.setupView(t,m)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function lx(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Wf(n),e.set(s,[o])):r>=a.length?(o=new Wf(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var cx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ux=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],hx=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],qf=new Et,la=new B,Bd=new B;function fx(n,e,t){let i=new zi,s=new He,r=new He,a=new Ct,o=new Uo,l=new Oo,c={},u=t.maxTextureSize,m={[Xi]:hn,[hn]:Xi,[Jn]:Jn},h=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:cx,fragmentShader:dx}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let _=new Cn;_.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new gn(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qr;let p=this.type;this.render=function(C,v,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;this.type===Jo&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qr);let I=n.getRenderTarget(),A=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),N=n.state;N.setBlending(hs),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let q=p!==this.type;q&&v.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(O=>O.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,O=C.length;P<O;P++){let X=C[P],H=X.shadow;if(H===void 0){Ge("WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let te=H.getFrameExtents();s.multiply(te),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,H.mapSize.y=r.y));let Z=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Z,H.map===null||q===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Qs){if(X.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Mn(s.x,s.y,{format:Yi,type:$n,minFilter:un,magFilter:un,generateMipmaps:!1}),H.map.texture.name=X.name+".shadowMap",H.map.depthTexture=new vi(s.x,s.y,zn),H.map.depthTexture.name=X.name+".shadowMapDepth",H.map.depthTexture.format=gi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=qt,H.map.depthTexture.magFilter=qt}else X.isPointLight?(H.map=new da(s.x),H.map.depthTexture=new Vr(s.x,Bn)):(H.map=new Mn(s.x,s.y),H.map.depthTexture=new vi(s.x,s.y,Bn)),H.map.depthTexture.name=X.name+".shadowMap",H.map.depthTexture.format=gi,this.type===Qr?(H.map.depthTexture.compareFunction=Z?Td:Ed,H.map.depthTexture.minFilter=un,H.map.depthTexture.magFilter=un):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=qt,H.map.depthTexture.magFilter=qt);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let re=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();X.isPointLight!==!0&&H.updateMatrices(X,y);let le=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:y.layers;for(let De=0;De<re;De++){let $=H.getCamera(De);if(X.isPointLight){let Y=H.camera,de=H.matrix,pe=X.distance||Y.far;pe!==Y.far&&(Y.far=pe,Y.updateProjectionMatrix()),la.setFromMatrixPosition(X.matrixWorld),Y.position.copy(la),Bd.copy(Y.position),Bd.add(ux[De]),Y.up.copy(hx[De]),Y.lookAt(Bd),Y.updateMatrixWorld(),de.makeTranslation(-la.x,-la.y,-la.z),qf.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),H._frustum.setFromProjectionMatrix(qf,Y.coordinateSystem,Y.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,De),n.clear();else{De===0&&(n.setRenderTarget(H.map),n.clear());let Y=H.getViewport(De);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),N.viewport(a)}i=H.getFrustum(De),w(v,y,$,X,le,this.type)}H.isPointLightShadow!==!0&&this.type===Qs&&M(H,y),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(I,A,L)};function M(C,v){let y=e.update(x);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null?C.mapPass=new Mn(s.x,s.y,{format:Yi,type:$n}):(C.mapPass.width!==C.map.width||C.mapPass.height!==C.map.height)&&C.mapPass.setSize(C.map.width,C.map.height),h.uniforms.shadow_pass.value=C.map.depthTexture,h.uniforms.resolution.value.set(C.map.width,C.map.height),h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(v,null,y,h,x,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value.set(C.map.width,C.map.height),d.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(v,null,y,d,x,null)}function E(C,v,y,I){let A=null,L=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)A=L;else if(A=y.isPointLight===!0?l:o,n.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let N=A.uuid,q=v.uuid,P=c[N];P===void 0&&(P={},c[N]=P);let O=P[q];O===void 0&&(O=A.clone(),P[q]=O,v.addEventListener("dispose",R)),A=O}if(A.visible=v.visible,A.wireframe=v.wireframe,I===Qs?A.side=v.shadowSide!==null?v.shadowSide:v.side:A.side=v.shadowSide!==null?v.shadowSide:m[v.side],A.alphaMap=v.alphaMap,A.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,A.map=v.map,A.clipShadows=v.clipShadows,A.clippingPlanes=v.clippingPlanes,A.clipIntersection=v.clipIntersection,A.displacementMap=v.displacementMap,A.displacementScale=v.displacementScale,A.displacementBias=v.displacementBias,A.wireframeLinewidth=v.wireframeLinewidth,A.linewidth=v.linewidth,y.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let N=n.properties.get(A);N.light=y}return A}function w(C,v,y,I,A,L){if(C.visible===!1)return;if(C.layers.test(A)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&L===Qs)&&(!C.frustumCulled||C.intersectsFrustum(i))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);let P=e.update(C),O=C.material;if(Array.isArray(O)){let X=P.groups;for(let H=0,te=X.length;H<te;H++){let Z=X[H],re=O[Z.materialIndex];if(re&&re.visible){let le=E(C,re,I,L);C.onBeforeShadow(n,C,v,y,P,le,Z),n.renderBufferDirect(y,null,P,le,C,Z),C.onAfterShadow(n,C,v,y,P,le,Z)}}}else if(O.visible){let X=E(C,O,I,L);C.onBeforeShadow(n,C,v,y,P,X,null),n.renderBufferDirect(y,null,P,X,C,null),C.onAfterShadow(n,C,v,y,P,X,null)}}let q=C.children;for(let P=0,O=q.length;P<O;P++)w(q[P],v,y,I,A,L)}function R(C){C.target.removeEventListener("dispose",R);for(let y in c){let I=c[y],A=C.target.uuid;A in I&&(I[A].dispose(),delete I[A])}}}function px(n,e){function t(){let D=!1,se=new Ct,K=null,xe=new Ct(0,0,0,0);return{setMask:function(fe){K!==fe&&!D&&(n.colorMask(fe,fe,fe,fe),K=fe)},setLocked:function(fe){D=fe},setClear:function(fe,_e,ze,nt,ue){ue===!0&&(fe*=nt,_e*=nt,ze*=nt),se.set(fe,_e,ze,nt),xe.equals(se)===!1&&(n.clearColor(fe,_e,ze,nt),xe.copy(se))},reset:function(){D=!1,K=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,se=!1,K=null,xe=null,fe=null;return{setReversed:function(_e){if(se!==_e){let ze=e.get("EXT_clip_control");_e?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),se=_e;let nt=fe;fe=null,this.setClear(nt)}},getReversed:function(){return se},setTest:function(_e){_e?ye(n.DEPTH_TEST):ke(n.DEPTH_TEST)},setMask:function(_e){K!==_e&&!D&&(n.depthMask(_e),K=_e)},setFunc:function(_e){if(se&&(_e=vf[_e]),xe!==_e){switch(_e){case go:n.depthFunc(n.NEVER);break;case _o:n.depthFunc(n.ALWAYS);break;case yo:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case vo:n.depthFunc(n.EQUAL);break;case xo:n.depthFunc(n.GEQUAL);break;case bo:n.depthFunc(n.GREATER);break;case So:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=_e}},setLocked:function(_e){D=_e},setClear:function(_e){fe!==_e&&(fe=_e,se&&(_e=1-_e),n.clearDepth(_e))},reset:function(){D=!1,K=null,xe=null,fe=null,se=!1}}}function s(){let D=!1,se=null,K=null,xe=null,fe=null,_e=null,ze=null,nt=null,ue=null;return{setTest:function(Ve){D||(Ve?ye(n.STENCIL_TEST):ke(n.STENCIL_TEST))},setMask:function(Ve){se!==Ve&&!D&&(n.stencilMask(Ve),se=Ve)},setFunc:function(Ve,et,Ee){(K!==Ve||xe!==et||fe!==Ee)&&(n.stencilFunc(Ve,et,Ee),K=Ve,xe=et,fe=Ee)},setOp:function(Ve,et,Ee){(_e!==Ve||ze!==et||nt!==Ee)&&(n.stencilOp(Ve,et,Ee),_e=Ve,ze=et,nt=Ee)},setLocked:function(Ve){D=Ve},setClear:function(Ve){ue!==Ve&&(n.clearStencil(Ve),ue=Ve)},reset:function(){D=!1,se=null,K=null,xe=null,fe=null,_e=null,ze=null,nt=null,ue=null}}}let r=new t,a=new i,o=new s,l={},c=new WeakMap,u={},m={},h={},d=new WeakMap,_=[],x=null,g=!1,p=null,M=null,E=null,w=null,R=null,C=null,v=null,y=new tt(0,0,0),I=0,A=!1,L=null,N=null,q=null,P=null,O=null,X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,te=0,Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(Z)[1]),H=te>=1):Z.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),H=te>=2);let re=null,le={},De=n.getParameter(n.SCISSOR_BOX),$=n.getParameter(n.VIEWPORT),Y=new Ct().fromArray(De),de=new Ct().fromArray($);function pe(D,se,K,xe){let fe=new Uint8Array(4),_e=n.createTexture();n.bindTexture(D,_e),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<K;ze++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(se+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return _e}let Re={};Re[n.TEXTURE_2D]=pe(n.TEXTURE_2D,n.TEXTURE_2D,1),Re[n.TEXTURE_CUBE_MAP]=pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[n.TEXTURE_2D_ARRAY]=pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Re[n.TEXTURE_3D]=pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ye(n.DEPTH_TEST),a.setFunc($s),z(!1),k(sd),ye(n.CULL_FACE),Rt(hs);function ye(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function ke(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function at(D,se){return h[D]!==se?(n.bindFramebuffer(D,se),h[D]=se,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=se),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Pe(D,se){let K=_,xe=!1;if(D){K=d.get(se),K===void 0&&(K=[],d.set(se,K));let fe=D.textures;if(K.length!==fe.length||K[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,ze=fe.length;_e<ze;_e++)K[_e]=n.COLOR_ATTACHMENT0+_e;K.length=fe.length,xe=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,xe=!0);xe&&n.drawBuffers(K)}function Je(D){return x!==D?(n.useProgram(D),x=D,!0):!1}let st={[fs]:n.FUNC_ADD,[zh]:n.FUNC_SUBTRACT,[$h]:n.FUNC_REVERSE_SUBTRACT};st[Vh]=n.MIN,st[Gh]=n.MAX;let Ze={[Hh]:n.ZERO,[Wh]:n.ONE,[qh]:n.SRC_COLOR,[ld]:n.SRC_ALPHA,[Kh]:n.SRC_ALPHA_SATURATE,[Zh]:n.DST_COLOR,[Yh]:n.DST_ALPHA,[Xh]:n.ONE_MINUS_SRC_COLOR,[cd]:n.ONE_MINUS_SRC_ALPHA,[jh]:n.ONE_MINUS_DST_COLOR,[Jh]:n.ONE_MINUS_DST_ALPHA,[Qh]:n.CONSTANT_COLOR,[ef]:n.ONE_MINUS_CONSTANT_COLOR,[tf]:n.CONSTANT_ALPHA,[nf]:n.ONE_MINUS_CONSTANT_ALPHA};function Rt(D,se,K,xe,fe,_e,ze,nt,ue,Ve){if(D===hs){g===!0&&(ke(n.BLEND),g=!1);return}if(g===!1&&(ye(n.BLEND),g=!0),D!==Bh){if(D!==p||Ve!==A){if((M!==fs||R!==fs)&&(n.blendEquation(n.FUNC_ADD),M=fs,R=fs),Ve)switch(D){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rd:n.blendFunc(n.ONE,n.ONE);break;case ad:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case od:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:We("WebGLState: Invalid blending: ",D);break}else switch(D){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ad:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case od:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",D);break}E=null,w=null,C=null,v=null,y.set(0,0,0),I=0,p=D,A=Ve}return}fe=fe||se,_e=_e||K,ze=ze||xe,(se!==M||fe!==R)&&(n.blendEquationSeparate(st[se],st[fe]),M=se,R=fe),(K!==E||xe!==w||_e!==C||ze!==v)&&(n.blendFuncSeparate(Ze[K],Ze[xe],Ze[_e],Ze[ze]),E=K,w=xe,C=_e,v=ze),(nt.equals(y)===!1||ue!==I)&&(n.blendColor(nt.r,nt.g,nt.b,ue),y.copy(nt),I=ue),p=D,A=!1}function St(D,se){D.side===Jn?ke(n.CULL_FACE):ye(n.CULL_FACE);let K=D.side===hn;se&&(K=!K),z(K),D.blending===er&&D.transparent===!1?Rt(hs):Rt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let xe=D.stencilWrite;o.setTest(xe),xe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),oe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ye(n.SAMPLE_ALPHA_TO_COVERAGE):ke(n.SAMPLE_ALPHA_TO_COVERAGE)}function z(D){L!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),L=D)}function k(D){D!==Fh?(ye(n.CULL_FACE),D!==N&&(D===sd?n.cullFace(n.BACK):D===kh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ke(n.CULL_FACE),N=D}function j(D){D!==q&&(H&&n.lineWidth(D),q=D)}function oe(D,se,K){D?(ye(n.POLYGON_OFFSET_FILL),(P!==se||O!==K)&&(P=se,O=K,a.getReversed()&&(se=-se,K=-K),n.polygonOffset(se,K))):ke(n.POLYGON_OFFSET_FILL)}function ne(D){D?ye(n.SCISSOR_TEST):ke(n.SCISSOR_TEST)}function Ae(D){D===void 0&&(D=n.TEXTURE0+X-1),re!==D&&(n.activeTexture(D),re=D)}function Be(D,se,K){K===void 0&&(re===null?K=n.TEXTURE0+X-1:K=re);let xe=le[K];xe===void 0&&(xe={type:void 0,texture:void 0},le[K]=xe),(xe.type!==D||xe.texture!==se)&&(re!==K&&(n.activeTexture(K),re=K),n.bindTexture(D,se||Re[D]),xe.type=D,xe.texture=se)}function U(){let D=le[re];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Ie(){try{n.compressedTexImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function Qe(){try{n.compressedTexImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function he(){try{n.texSubImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function me(){try{n.texSubImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function Lt(){try{n.compressedTexSubImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function $e(){try{n.compressedTexSubImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function qe(){try{n.texStorage2D(...arguments)}catch(D){We("WebGLState:",D)}}function T(){try{n.texStorage3D(...arguments)}catch(D){We("WebGLState:",D)}}function b(){try{n.texImage2D(...arguments)}catch(D){We("WebGLState:",D)}}function G(){try{n.texImage3D(...arguments)}catch(D){We("WebGLState:",D)}}function ce(D){return m[D]!==void 0?m[D]:n.getParameter(D)}function ae(D,se){m[D]!==se&&(n.pixelStorei(D,se),m[D]=se)}function ge(D){Y.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Y.copy(D))}function Se(D){de.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),de.copy(D))}function ee(D,se){let K=c.get(se);K===void 0&&(K=new WeakMap,c.set(se,K));let xe=K.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(se,D.name),n.uniformBlockBinding(se,xe,xe),K.set(D,xe))}function ie(D,se,K){let fe=c.get(se).get(D);l[fe]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,fe,K),l[fe]=K)}function ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},m={},re=null,le={},h={},l={},d=new WeakMap,_=[],x=null,g=!1,p=null,M=null,E=null,w=null,R=null,C=null,v=null,y=new tt(0,0,0),I=0,A=!1,L=null,N=null,q=null,P=null,O=null,Y.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ye,disable:ke,bindFramebuffer:at,drawBuffers:Pe,useProgram:Je,setBlending:Rt,setMaterial:St,setFlipSided:z,setCullFace:k,setLineWidth:j,setPolygonOffset:oe,setScissorTest:ne,activeTexture:Ae,bindTexture:Be,unbindTexture:U,compressedTexImage2D:Ie,compressedTexImage3D:Qe,texImage2D:b,texImage3D:G,pixelStorei:ae,getParameter:ce,updateUBOMapping:ee,uniformBlockBinding:ie,texStorage2D:qe,texStorage3D:T,texSubImage2D:he,texSubImage3D:me,compressedTexSubImage2D:Lt,compressedTexSubImage3D:$e,scissor:ge,viewport:Se,reset:ve}}function mx(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,u=new WeakMap,m=new Set,h,d=new WeakMap,_=new Set,x=new FinalizationRegistry(T=>_.delete(T)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(T,b){return g?new OffscreenCanvas(T,b):Nr("canvas")}function M(T,b,G){let ce=1,ae=qe(T);if((ae.width>G||ae.height>G)&&(ce=G/Math.max(ae.width,ae.height)),ce<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ge=Math.floor(ce*ae.width),Se=Math.floor(ce*ae.height);h===void 0&&(h=p(ge,Se));let ee=b?p(ge,Se):h;return ee.width=ge,ee.height=Se,ee.getContext("2d").drawImage(T,0,0,ge,Se),Ge("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ge+"x"+Se+")."),ee}else return"data"in T&&Ge("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),T;return T}function E(T){return T.generateMipmaps}function w(T){n.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function C(T,b,G,ce,ae,ge=!1){if(T!==null){if(n[T]!==void 0)return n[T];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Se;ce&&(Se=e.get("EXT_texture_norm16"),Se||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=b;if(b===n.RED&&(G===n.FLOAT&&(ee=n.R32F),G===n.HALF_FLOAT&&(ee=n.R16F),G===n.UNSIGNED_BYTE&&(ee=n.R8),G===n.UNSIGNED_SHORT&&Se&&(ee=Se.R16_EXT),G===n.SHORT&&Se&&(ee=Se.R16_SNORM_EXT)),b===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(ee=n.R8UI),G===n.UNSIGNED_SHORT&&(ee=n.R16UI),G===n.UNSIGNED_INT&&(ee=n.R32UI),G===n.BYTE&&(ee=n.R8I),G===n.SHORT&&(ee=n.R16I),G===n.INT&&(ee=n.R32I)),b===n.RG&&(G===n.FLOAT&&(ee=n.RG32F),G===n.HALF_FLOAT&&(ee=n.RG16F),G===n.UNSIGNED_BYTE&&(ee=n.RG8),G===n.UNSIGNED_SHORT&&Se&&(ee=Se.RG16_EXT),G===n.SHORT&&Se&&(ee=Se.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(ee=n.RG8UI),G===n.UNSIGNED_SHORT&&(ee=n.RG16UI),G===n.UNSIGNED_INT&&(ee=n.RG32UI),G===n.BYTE&&(ee=n.RG8I),G===n.SHORT&&(ee=n.RG16I),G===n.INT&&(ee=n.RG32I)),b===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),G===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),G===n.UNSIGNED_INT&&(ee=n.RGB32UI),G===n.BYTE&&(ee=n.RGB8I),G===n.SHORT&&(ee=n.RGB16I),G===n.INT&&(ee=n.RGB32I)),b===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),G===n.UNSIGNED_INT&&(ee=n.RGBA32UI),G===n.BYTE&&(ee=n.RGBA8I),G===n.SHORT&&(ee=n.RGBA16I),G===n.INT&&(ee=n.RGBA32I)),b===n.RGB&&(G===n.UNSIGNED_SHORT&&Se&&(ee=Se.RGB16_EXT),G===n.SHORT&&Se&&(ee=Se.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),b===n.RGBA){let ie=ge?Lr:ct.getTransfer(ae);G===n.FLOAT&&(ee=n.RGBA32F),G===n.HALF_FLOAT&&(ee=n.RGBA16F),G===n.UNSIGNED_BYTE&&(ee=ie===gt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&Se&&(ee=Se.RGBA16_EXT),G===n.SHORT&&Se&&(ee=Se.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(T,b){let G;return T?b===null||b===Bn||b===ms?G=n.DEPTH24_STENCIL8:b===zn?G=n.DEPTH32F_STENCIL8:b===nr&&(G=n.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Bn||b===ms?G=n.DEPTH_COMPONENT24:b===zn?G=n.DEPTH_COMPONENT32F:b===nr&&(G=n.DEPTH_COMPONENT16),G}function y(T,b){return E(T)===!0||T.isFramebufferTexture&&T.minFilter!==qt&&T.minFilter!==un?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function I(T){let b=new WeakRef(T);i.get(T).__ref=b,_.add(b),x.register(T,b,b)}function A(T){let b=i.get(T).__ref;b!==void 0&&(_.delete(b),x.unregister(b))}function L(T){q(T.target)}function N(T){P(T.target)}function q(T){T.removeEventListener("dispose",L),A(T),X(T),T.isVideoTexture&&u.delete(T),T.isHTMLTexture&&m.delete(T)}function P(T){T.removeEventListener("dispose",N),A(T),te(T)}function O(){for(let T of _){let b=T.deref();b!==void 0&&(b.isRenderTarget===!0?P(b):q(b))}_.clear(),m.clear()}function X(T){let b=i.get(T);if(b.__webglInit===void 0)return;let G=T.source,ce=d.get(G);if(ce){let ae=ce[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&H(T),Object.keys(ce).length===0&&d.delete(G)}i.remove(T)}function H(T){let b=i.get(T);n.deleteTexture(b.__webglTexture);let G=T.source,ce=d.get(G);delete ce[b.__cacheKey],a.memory.textures--}function te(T){let b=i.get(T);b.__depthDisposeCallback&&b.__depthDisposeCallback();let G=T.depthTexture;if(G&&G.renderTarget===T&&q(G),T.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(b.__webglFramebuffer[ae]))for(let ge=0;ge<b.__webglFramebuffer[ae].length;ge++)n.deleteFramebuffer(b.__webglFramebuffer[ae][ge]);else n.deleteFramebuffer(b.__webglFramebuffer[ae]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[ae])}else{if(Array.isArray(b.__webglFramebuffer))for(let ae=0;ae<b.__webglFramebuffer.length;ae++)n.deleteFramebuffer(b.__webglFramebuffer[ae]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ae=0;ae<b.__webglColorRenderbuffer.length;ae++)b.__webglColorRenderbuffer[ae]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[ae]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let ce=T.textures;for(let ae=0,ge=ce.length;ae<ge;ae++){let Se=i.get(ce[ae]);Se.__webglTexture&&(n.deleteTexture(Se.__webglTexture),a.memory.textures--),i.remove(ce[ae])}i.remove(T)}let Z=0;function re(){Z=0}function le(){return Z}function De(T){Z=T}function $(){let T=Z;return T>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),Z+=1,T}function Y(T){let b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.mipmapsAutoUpdate),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function de(T,b){let G=i.get(T);if(T.isVideoTexture&&Lt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&G.__version!==T.version){let ce=T.image;if(ce===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{St(G,T,b);return}}else T.isExternalTexture&&(G.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+b)}function pe(T,b){let G=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){St(G,T,b);return}else T.isExternalTexture&&(G.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+b)}function Re(T,b){let G=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){St(G,T,b);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+b)}function ye(T,b){let G=i.get(T);if(T.version>0&&G.__version!==T.version){z(G,T,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+b)}let ke={[Mo]:n.REPEAT,[qn]:n.CLAMP_TO_EDGE,[wo]:n.MIRRORED_REPEAT},at={[qt]:n.NEAREST,[af]:n.NEAREST_MIPMAP_NEAREST,[ta]:n.NEAREST_MIPMAP_LINEAR,[un]:n.LINEAR,[Ko]:n.LINEAR_MIPMAP_NEAREST,[xi]:n.LINEAR_MIPMAP_LINEAR},Pe={[df]:n.NEVER,[Ad]:n.ALWAYS,[uf]:n.LESS,[Ed]:n.LEQUAL,[hf]:n.EQUAL,[Td]:n.GEQUAL,[ff]:n.GREATER,[pf]:n.NOTEQUAL};function Je(T,b){if(b.type===zn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===un||b.magFilter===Ko||b.magFilter===ta||b.magFilter===xi||b.minFilter===un||b.minFilter===Ko||b.minFilter===ta||b.minFilter===xi)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ke[b.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ke[b.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ke[b.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,at[b.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,at[b.minFilter]),b.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===qt||b.minFilter!==ta&&b.minFilter!==xi||b.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function st(T,b){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",L),I(b));let ce=b.source,ae=d.get(ce);ae===void 0&&(ae={},d.set(ce,ae));let ge=Y(b);if(ge!==T.__cacheKey){ae[ge]===void 0&&(ae[ge]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ae[ge].usedTimes++;let Se=ae[T.__cacheKey];Se!==void 0&&(ae[T.__cacheKey].usedTimes--,Se.usedTimes===0&&H(b)),T.__cacheKey=ge,T.__webglTexture=ae[ge].texture}return G}function Ze(T,b,G){return Math.floor(Math.floor(T/G)/b)}function Rt(T,b,G,ce){let ge=T.updateRanges;if(ge.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,G,ce,b.data);else{ge.sort((D,se)=>D.start-se.start);let Se=0;for(let D=1;D<ge.length;D++){let se=ge[Se],K=ge[D],xe=se.start+se.count,fe=Ze(K.start,b.width,4),_e=Ze(se.start,b.width,4);K.start<=xe+1&&fe===_e&&Ze(K.start+K.count-1,b.width,4)===fe?se.count=Math.max(se.count,K.start+K.count-se.start):(++Se,ge[Se]=K)}ge.length=Se+1;let ee=t.getParameter(n.UNPACK_ROW_LENGTH),ie=t.getParameter(n.UNPACK_SKIP_PIXELS),ve=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let D=0,se=ge.length;D<se;D++){let K=ge[D],xe=Math.floor(K.start/4),fe=Math.ceil(K.count/4),_e=xe%b.width,ze=Math.floor(xe/b.width),nt=fe,ue=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(n.UNPACK_SKIP_ROWS,ze),t.texSubImage2D(n.TEXTURE_2D,0,_e,ze,nt,ue,G,ce,b.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ee),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,ve)}}function St(T,b,G){let ce=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ce=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ce=n.TEXTURE_3D);let ae=st(T,b),ge=b.source;t.bindTexture(ce,T.__webglTexture,n.TEXTURE0+G);let Se=i.get(ge);if(ge.version!==Se.__version||ae===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let ue=ct.getPrimaries(ct.workingColorSpace),Ve=b.colorSpace===Si?null:ct.getPrimaries(b.colorSpace),et=b.colorSpace===Si||ue===Ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,et)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let ie=M(b.image,!1,s.maxTextureSize);ie=$e(b,ie);let ve=r.convert(b.format,b.colorSpace),D=r.convert(b.type),se=C(b.internalFormat,ve,D,b.normalized,b.colorSpace,b.isVideoTexture);Je(ce,b);let K,xe=b.mipmaps,fe=b.isVideoTexture!==!0,_e=Se.__version===void 0||ae===!0,ze=ge.dataReady,nt=y(b,ie);if(b.isDepthTexture)se=v(b.format===bi,b.type),_e&&(fe?t.texStorage2D(n.TEXTURE_2D,1,se,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,se,ie.width,ie.height,0,ve,D,null));else if(b.isDataTexture)if(xe.length>0){fe&&_e&&t.texStorage2D(n.TEXTURE_2D,nt,se,xe[0].width,xe[0].height);for(let ue=0,Ve=xe.length;ue<Ve;ue++)K=xe[ue],fe?ze&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,K.width,K.height,ve,D,K.data):t.texImage2D(n.TEXTURE_2D,ue,se,K.width,K.height,0,ve,D,K.data);b.generateMipmaps=!1}else fe?(_e&&t.texStorage2D(n.TEXTURE_2D,nt,se,ie.width,ie.height),ze&&Rt(b,ie,ve,D)):t.texImage2D(n.TEXTURE_2D,0,se,ie.width,ie.height,0,ve,D,ie.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){fe&&_e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,se,xe[0].width,xe[0].height,ie.depth);for(let ue=0,Ve=xe.length;ue<Ve;ue++)if(K=xe[ue],b.format!==Vn)if(ve!==null)if(fe){if(ze)if(b.layerUpdates.size>0){let et=Fd(K.width,K.height,b.format,b.type);for(let Ee of b.layerUpdates){let yt=K.data.subarray(Ee*et/K.data.BYTES_PER_ELEMENT,(Ee+1)*et/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,Ee,K.width,K.height,1,ve,yt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,K.width,K.height,ie.depth,ve,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,se,K.width,K.height,ie.depth,0,K.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?ze&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,K.width,K.height,ie.depth,ve,D,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,se,K.width,K.height,ie.depth,0,ve,D,K.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{fe&&_e&&t.texStorage2D(n.TEXTURE_2D,nt,se,xe[0].width,xe[0].height);for(let ue=0,Ve=xe.length;ue<Ve;ue++)K=xe[ue],b.format!==Vn?ve!==null?fe?ze&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,K.width,K.height,ve,K.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,se,K.width,K.height,0,K.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?ze&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,K.width,K.height,ve,D,K.data):t.texImage2D(n.TEXTURE_2D,ue,se,K.width,K.height,0,ve,D,K.data)}else if(b.isDataArrayTexture)if(fe){if(_e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,se,ie.width,ie.height,ie.depth),ze)if(b.layerUpdates.size>0){let ue=Fd(ie.width,ie.height,b.format,b.type);for(let Ve of b.layerUpdates){let et=ie.data.subarray(Ve*ue/ie.data.BYTES_PER_ELEMENT,(Ve+1)*ue/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ve,ie.width,ie.height,1,ve,D,et)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ve,D,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,se,ie.width,ie.height,ie.depth,0,ve,D,ie.data);else if(b.isData3DTexture)fe?(_e&&t.texStorage3D(n.TEXTURE_3D,nt,se,ie.width,ie.height,ie.depth),ze&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ve,D,ie.data)):t.texImage3D(n.TEXTURE_3D,0,se,ie.width,ie.height,ie.depth,0,ve,D,ie.data);else if(b.isFramebufferTexture){if(_e)if(fe)t.texStorage2D(n.TEXTURE_2D,nt,se,ie.width,ie.height);else{let ue=ie.width,Ve=ie.height;for(let et=0;et<nt;et++)t.texImage2D(n.TEXTURE_2D,et,se,ue,Ve,0,ve,D,null),ue>>=1,Ve>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let ue=n.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),ie.parentNode!==ue){ue.appendChild(ie),m.add(b),ue.onpaint=Ve=>{let et=Ve.changedElements;for(let Ee of m)et.includes(Ee.image)&&(Ee.needsUpdate=!0)},ue.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ie);else{let et=n.RGBA,Ee=n.RGBA,yt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,et,Ee,yt,ie)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(xe.length>0){if(fe&&_e){let ue=qe(xe[0]);t.texStorage2D(n.TEXTURE_2D,nt,se,ue.width,ue.height)}for(let ue=0,Ve=xe.length;ue<Ve;ue++)K=xe[ue],fe?ze&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,ve,D,K):t.texImage2D(n.TEXTURE_2D,ue,se,ve,D,K);b.generateMipmaps=!1}else if(fe){if(_e){let ue=qe(ie);t.texStorage2D(n.TEXTURE_2D,nt,se,ue.width,ue.height)}ze&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,D,ie)}else t.texImage2D(n.TEXTURE_2D,0,se,ve,D,ie);E(b)&&b.mipmapsAutoUpdate===!0&&w(ce),Se.__version=ge.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function z(T,b,G){if(b.image.length!==6)return;let ce=st(T,b),ae=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+G);let ge=i.get(ae);if(ae.version!==ge.__version||ce===!0){t.activeTexture(n.TEXTURE0+G);let Se=ct.getPrimaries(ct.workingColorSpace),ee=b.colorSpace===Si?null:ct.getPrimaries(b.colorSpace),ie=b.colorSpace===Si||Se===ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let ve=b.isCompressedTexture||b.image[0].isCompressedTexture,D=b.image[0]&&b.image[0].isDataTexture,se=[];for(let Ee=0;Ee<6;Ee++)!ve&&!D?se[Ee]=M(b.image[Ee],!0,s.maxCubemapSize):se[Ee]=D?b.image[Ee].image:b.image[Ee],se[Ee]=$e(b,se[Ee]);let K=se[0],xe=r.convert(b.format,b.colorSpace),fe=r.convert(b.type),_e=C(b.internalFormat,xe,fe,b.normalized,b.colorSpace),ze=b.isVideoTexture!==!0,nt=ge.__version===void 0||ce===!0,ue=ae.dataReady,Ve=y(b,K);Je(n.TEXTURE_CUBE_MAP,b);let et;if(b.isDepthTexture){if(_e=v(b.format===bi,b.type),nt)if(ze)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,_e,K.width,K.height);else for(let Ee=0;Ee<6;Ee++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,K.width,K.height,0,xe,fe,null)}else if(ve){ze&&nt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ve,_e,K.width,K.height);for(let Ee=0;Ee<6;Ee++){et=se[Ee].mipmaps;for(let yt=0;yt<et.length;yt++){let Gt=et[yt];b.format!==Vn?xe!==null?ze?ue&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt,0,0,Gt.width,Gt.height,xe,Gt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt,_e,Gt.width,Gt.height,0,Gt.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt,0,0,Gt.width,Gt.height,xe,fe,Gt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt,_e,Gt.width,Gt.height,0,xe,fe,Gt.data)}}}else{if(et=b.mipmaps,ze&&nt){et.length>0&&Ve++;let Ee=qe(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ve,_e,Ee.width,Ee.height)}for(let Ee=0;Ee<6;Ee++)if(D){ze?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,se[Ee].width,se[Ee].height,xe,fe,se[Ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,se[Ee].width,se[Ee].height,0,xe,fe,se[Ee].data);for(let yt=0;yt<et.length;yt++){let Ti=et[yt].image[Ee].image;ze?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt+1,0,0,Ti.width,Ti.height,xe,fe,Ti.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt+1,_e,Ti.width,Ti.height,0,xe,fe,Ti.data)}}else{ze?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,xe,fe,se[Ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,_e,xe,fe,se[Ee]);for(let yt=0;yt<et.length;yt++){let Gt=et[yt];ze?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt+1,0,0,xe,fe,Gt.image[Ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,yt+1,_e,xe,fe,Gt.image[Ee])}}}E(b)&&b.mipmapsAutoUpdate===!0&&w(n.TEXTURE_CUBE_MAP),ge.__version=ae.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function k(T,b,G,ce,ae,ge){let Se=r.convert(G.format,G.colorSpace),ee=r.convert(G.type),ie=C(G.internalFormat,Se,ee,G.normalized,G.colorSpace),ve=i.get(b),D=i.get(G);if(D.__renderTarget=b,!ve.__hasExternalTextures){let se=Math.max(1,b.width>>ge),K=Math.max(1,b.height>>ge);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,ge,ie,se,K,b.depth,0,Se,ee,null):t.texImage2D(ae,ge,ie,se,K,0,Se,ee,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),me(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,ae,D.__webglTexture,0,he(b)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ce,ae,D.__webglTexture,ge),t.bindFramebuffer(n.FRAMEBUFFER,null)}function j(T,b,G){if(n.bindRenderbuffer(n.RENDERBUFFER,T),b.depthBuffer){let ce=b.depthTexture,ae=ce&&ce.isDepthTexture?ce.type:null,ge=v(b.stencilBuffer,ae),Se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;me(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he(b),ge,b.width,b.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,he(b),ge,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ge,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,T)}else{let ce=b.textures;for(let ae=0;ae<ce.length;ae++){let ge=ce[ae],Se=r.convert(ge.format,ge.colorSpace),ee=r.convert(ge.type),ie=C(ge.internalFormat,Se,ee,ge.normalized,ge.colorSpace);me(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he(b),ie,b.width,b.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,he(b),ie,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ie,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function oe(T,b,G){let ce=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ae=i.get(b.depthTexture);ae.__renderTarget=b;let ge=ce?b.depthTexture.image[0]:b.depthTexture.image;(!ae.__webglTexture||ge.width!==b.width||ge.height!==b.height)&&(ge.width=b.width,ge.height=b.height,b.depthTexture.needsUpdate=!0),ce?ye(b.depthTexture,0):de(b.depthTexture,0);let Se=ae.__webglTexture,ee=he(b),ie=ce?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,ve=b.depthTexture.format===bi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===gi)me(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ve,ie,Se,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,ve,ie,Se,0);else if(b.depthTexture.format===bi)me(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ve,ie,Se,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,ve,ie,Se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(T){let b=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){let ce=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ce){let ae=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ce.removeEventListener("dispose",ae)};ce.addEventListener("dispose",ae),b.__depthDisposeCallback=ae}b.__boundDepthTexture=ce}if(T.depthTexture&&!b.__autoAllocateDepthBuffer)if(G)for(let ce=0;ce<6;ce++)oe(b.__webglFramebuffer[ce],T,ce);else T.texture.mipmaps.length>0?oe(b.__webglFramebuffer[0],T,0):oe(b.__webglFramebuffer,T,0);else if(G){b.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[ce]),b.__webglDepthbuffer[ce]===void 0)b.__webglDepthbuffer[ce]=n.createRenderbuffer(),j(b.__webglDepthbuffer[ce],T,!1);else{let ae=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=b.__webglDepthbuffer[ce];n.bindRenderbuffer(n.RENDERBUFFER,ge),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ge)}}else if(T.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),j(b.__webglDepthbuffer,T,!1);else{let ae=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ge),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ge)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(T,b,G){let ce=i.get(T);b!==void 0&&k(ce.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&ne(T)}function Be(T){let b=T.texture,G=i.get(T),ce=i.get(b);T.addEventListener("dispose",N),I(T);let ae=T.textures,ge=T.isWebGLCubeRenderTarget===!0,Se=ae.length>1;if(Se||(ce.__webglTexture===void 0&&(ce.__webglTexture=n.createTexture()),ce.__version=b.version,a.memory.textures++),ge){G.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(b.mipmaps.length>0){G.__webglFramebuffer[ee]=[];for(let ie=0;ie<b.mipmaps.length;ie++)G.__webglFramebuffer[ee][ie]=n.createFramebuffer()}else G.__webglFramebuffer[ee]=n.createFramebuffer()}else{if(b.mipmaps.length>0){G.__webglFramebuffer=[];for(let ee=0;ee<b.mipmaps.length;ee++)G.__webglFramebuffer[ee]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(Se)for(let ee=0,ie=ae.length;ee<ie;ee++){let ve=i.get(ae[ee]);ve.__webglTexture===void 0&&(ve.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&me(T)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ee=0;ee<ae.length;ee++){let ie=ae[ee];G.__webglColorRenderbuffer[ee]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[ee]);let ve=r.convert(ie.format,ie.colorSpace),D=r.convert(ie.type),se=C(ie.internalFormat,ve,D,ie.normalized,ie.colorSpace,T.isXRRenderTarget===!0),K=he(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,se,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,G.__webglColorRenderbuffer[ee])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),j(G.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ge){t.bindTexture(n.TEXTURE_CUBE_MAP,ce.__webglTexture),Je(n.TEXTURE_CUBE_MAP,b);for(let ee=0;ee<6;ee++)if(b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)k(G.__webglFramebuffer[ee][ie],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie);else k(G.__webglFramebuffer[ee],T,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);E(b)?w(n.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}else if(Se){for(let ee=0,ie=ae.length;ee<ie;ee++){let ve=ae[ee],D=i.get(ve),se=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(se=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,D.__webglTexture),Je(se,ve),k(G.__webglFramebuffer,T,ve,n.COLOR_ATTACHMENT0+ee,se,0),E(ve)&&w(se)}t.unbindTexture()}else{let ee=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ee=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,ce.__webglTexture),Je(ee,b),b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)k(G.__webglFramebuffer[ie],T,b,n.COLOR_ATTACHMENT0,ee,ie);else k(G.__webglFramebuffer,T,b,n.COLOR_ATTACHMENT0,ee,0);E(b)?w(ee):b.mipmaps.length>0&&n.texParameteri(ee,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),t.unbindTexture()}T.depthBuffer&&ne(T)}function U(T){let b=T.textures;for(let G=0,ce=b.length;G<ce;G++){let ae=b[G];if(E(ae)&&ae.mipmapsAutoUpdate===!0){let ge=R(T),Se=i.get(ae).__webglTexture;t.bindTexture(ge,Se),w(ge),t.unbindTexture()}}}let Ie=[];function Qe(T){if(T.samples>0){if(me(T)===!1){let b=T.textures,G=T.width,ce=T.height,ae=n.COLOR_BUFFER_BIT,ge=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(T),ee=b.length>1;if(ee)for(let ve=0;ve<b.length;ve++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ve=0;ve<b.length;ve++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),ee){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[ve]);let D=i.get(b[ve]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,D,0)}n.blitFramebuffer(0,0,G,ce,0,0,G,ce,ae,n.NEAREST),l===!0&&(Ie.length=0,Ie.push(n.COLOR_ATTACHMENT0+ve),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Ie.push(ge),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ee)for(let ve=0;ve<b.length;ve++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,Se.__webglColorRenderbuffer[ve]);let D=i.get(b[ve]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,D,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let b=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function he(T){return Math.min(s.maxSamples,T.samples)}function me(T){let b=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Lt(T){let b=a.render.frame;u.get(T)!==b&&(u.set(T,b),T.update())}function $e(T,b){let G=T.colorSpace,ce=T.format,ae=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==Dr&&G!==Si&&(ct.getTransfer(G)===gt?(ce!==Vn||ae!==_n)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",G)),b}function qe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=re,this.getTextureUnits=le,this.setTextureUnits=De,this.setTexture2D=de,this.setTexture2DArray=pe,this.setTexture3D=Re,this.setTextureCube=ye,this.rebindTextures=Ae,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=k,this.useMultisampledRTT=me,this.dispose=O}function gx(n,e){function t(i,s=Si){let r,a=ct.getTransfer(s);if(i===_n)return n.UNSIGNED_BYTE;if(i===el)return n.UNSIGNED_SHORT_4_4_4_4;if(i===tl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===xd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===yd)return n.BYTE;if(i===vd)return n.SHORT;if(i===nr)return n.UNSIGNED_SHORT;if(i===Qo)return n.INT;if(i===Bn)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===$n)return n.HALF_FLOAT;if(i===Sd)return n.ALPHA;if(i===Md)return n.RGB;if(i===Vn)return n.RGBA;if(i===gi)return n.DEPTH_COMPONENT;if(i===bi)return n.DEPTH_STENCIL;if(i===wd)return n.RED;if(i===nl)return n.RED_INTEGER;if(i===Yi)return n.RG;if(i===il)return n.RG_INTEGER;if(i===sl)return n.RGBA_INTEGER;if(i===na||i===ia||i===sa||i===ra)if(a===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rl||i===al||i===ol||i===ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===cl||i===dl||i===ul||i===hl||i===fl||i===aa||i===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===cl||i===dl)return a===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ul)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===hl)return r.COMPRESSED_R11_EAC;if(i===fl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===aa)return r.COMPRESSED_RG11_EAC;if(i===pl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ml||i===gl||i===_l||i===yl||i===vl||i===xl||i===bl||i===Sl||i===Ml||i===wl||i===El||i===Tl||i===Al||i===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ml)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_l)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ml)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===wl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===El)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Al)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cl)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rl||i===Il||i===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Rl)return a===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dl||i===Ll||i===oa||i===Nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ms?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var _x=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Gr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Yn({vertexShader:_x,fragmentShader:yx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gn(new Hr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xd=class extends kn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,m=null,h=null,d=null,_=null,x=typeof XRWebGLBinding<"u",g=new qd,p={},M=t.getContextAttributes(),E=null,w=null,R=[],C=[],v=new He,y=null,I=null,A=new cn;A.viewport=new Ct;let L=new cn;L.viewport=new Ct;let N=[A,L],q=new Yo,P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let de=R[Y];return de===void 0&&(de=new Xs,R[Y]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Y){let de=R[Y];return de===void 0&&(de=new Xs,R[Y]=de),de.getGripSpace()},this.getHand=function(Y){let de=R[Y];return de===void 0&&(de=new Xs,R[Y]=de),de.getHandSpace()};function X(Y){let de=C.indexOf(Y.inputSource);if(de===-1)return;let pe=R[de];pe!==void 0&&(pe.update(Y.inputSource,Y.frame,c||a),pe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",te);for(let Y=0;Y<R.length;Y++){let de=C[Y];de!==null&&(C[Y]=null,R[Y].disconnect(de))}P=null,O=null,g.reset();for(let Y in p)delete p[Y];if(e.setRenderTarget(E),d=null,h=null,m=null,s=null,w=null,$.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(v.width,v.height,!1),I!==null){let Y=I.camera;Y.fov=I.fov,Y.zoom=I.zoom,Y.updateProjectionMatrix(),I=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return m===null&&x&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",H),s.addEventListener("inputsourceschange",te),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(v),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Re=null,ye=null;M.depth&&(ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=M.stencil?bi:gi,Re=M.stencil?ms:Bn);let ke={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};m=this.getBinding(),h=m.createProjectionLayer(ke),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),w=new Mn(h.textureWidth,h.textureHeight,{format:Vn,type:_n,depthTexture:new vi(h.textureWidth,h.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let pe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new Mn(d.framebufferWidth,d.framebufferHeight,{format:Vn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$.setContext(s),$.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function te(Y){for(let de=0;de<Y.removed.length;de++){let pe=Y.removed[de],Re=C.indexOf(pe);Re>=0&&(C[Re]=null,R[Re].disconnect(pe))}for(let de=0;de<Y.added.length;de++){let pe=Y.added[de],Re=C.indexOf(pe);if(Re===-1){for(let ke=0;ke<R.length;ke++)if(ke>=C.length){C.push(pe),Re=ke;break}else if(C[ke]===null){C[ke]=pe,Re=ke;break}if(Re===-1)break}let ye=R[Re];ye&&ye.connect(pe)}}function Z(Y,de){de===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(de.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let de=Y.near,pe=Y.far;g.texture!==null&&(g.depthNear>0&&(de=g.depthNear),g.depthFar>0&&(pe=g.depthFar)),q.near=L.near=A.near=de,q.far=L.far=A.far=pe,(P!==q.near||O!==q.far)&&(s.updateRenderState({depthNear:q.near,depthFar:q.far}),P=q.near,O=q.far),q.layers.mask=Y.layers.mask|6,A.layers.mask=q.layers.mask&-5,L.layers.mask=q.layers.mask&-3;let Re=Y.parent,ye=q.cameras;Z(q,Re);for(let ke=0;ke<ye.length;ke++)Z(ye[ke],Re);q.projectionMatrix.copy(A.projectionMatrix),q.projectionMatrixInverse.copy(A.projectionMatrixInverse),I===null&&Y.isPerspectiveCamera&&(I={camera:Y,fov:Y.fov,zoom:Y.zoom}),re(Y,q,Re)};function re(Y,de,pe){pe===null?Y.matrix.copy(de.matrixWorld):(Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(de.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(de.projectionMatrix),Y.projectionMatrixInverse.copy(de.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Hs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(q)},this.getCameraTexture=function(Y){return p[Y]};let le=null;function De(Y,de){if(u=de.getViewerPose(c||a),_=de,u!==null){let pe=u.views;d!==null&&(e.setRenderTargetFramebuffer(w,d.framebuffer),e.setRenderTarget(w));let Re=!1;pe.length!==q.cameras.length&&(q.cameras.length=0,Re=!0);for(let Pe=0;Pe<pe.length;Pe++){let Je=pe[Pe],st=null;if(d!==null)st=d.getViewport(Je);else{let Rt=m.getViewSubImage(h,Je);st=Rt.viewport,Pe===0&&(e.setRenderTargetTextures(w,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(w))}let Ze=N[Pe];Ze===void 0&&(Ze=new cn,Ze.layers.enable(Pe),Ze.viewport=new Ct,N[Pe]=Ze),Ze.matrix.fromArray(Je.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Je.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(st.x,st.y,st.width,st.height),Pe===0&&(q.matrix.copy(Ze.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Re===!0&&q.cameras.push(Ze)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){m=i.getBinding();let Pe=m.getDepthInformation(pe[0]);Pe&&Pe.isValid&&Pe.texture&&g.init(Pe,s.renderState)}if(ye&&ye.includes("camera-access")&&x){e.state.unbindTexture(),m=i.getBinding();for(let Pe=0;Pe<pe.length;Pe++){let Je=pe[Pe].camera;if(Je){let st=p[Je];st||(st=new Gr,p[Je]=st);let Ze=m.getCameraImage(Je);st.sourceTexture=Ze}}}}for(let pe=0;pe<R.length;pe++){let Re=C[pe],ye=R[pe];Re!==null&&ye!==void 0&&ye.update(Re,de,c||a)}le&&le(Y,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),_=null}let $=new Xf;$.setAnimationLoop(De),this.setAnimationLoop=function(Y){le=Y},this.dispose=function(){}}},vx=new Et,ip=new Ye;ip.set(-1,0,0,0,1,0,0,0,1);function xx(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Nd(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,E,w){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),m(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&d(g,p,w)):p.isMeshMatcapMaterial?(r(g,p),_(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,M,E):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===hn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===hn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let M=e.get(p),E=M.envMap,w=M.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(vx.makeRotationFromEuler(w)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(ip),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function m(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.diffuseRoughness>0&&(g.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let M=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function bx(n,e,t,i){let s={},r={};function a(M,E){let w=E.program;i.uniformBlockBinding(M,w,s[M.id])}function o(M,E){let w=s[M.id];w===void 0&&(_(M),w=l(M),s[M.id]=w,M.addEventListener("dispose",g));let R=E.program;i.updateUBOMapping(M,R);let C=e.render.frame;r[M.id]!==C&&(c(M),r[M.id]=C)}function l(M){let E=n.createBuffer(),w=M.__size,R=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,w,R),n.bindBuffer(n.UNIFORM_BUFFER,null),E}function c(M){let E=s[M.id],w=M.uniforms,R=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,v=w.length;C<v;C++){let y=w[C];if(Array.isArray(y))for(let I=0,A=y.length;I<A;I++)u(y[I],C,I,R);else u(y,C,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(M,E,w,R){if(h(M,E,w,R)===!0){let C=M.__offset,v=M.value;if(Array.isArray(v)){let y=0;for(let I=0;I<v.length;I++){let A=v[I],L=x(A,!0);m(A,M.__data,y),y+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else m(v,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,C,M.__data)}}function m(M,E,w){typeof M=="number"||typeof M=="boolean"?E[w]=M:M.isMatrix3?(E[w]=M.elements[0],E[w+1]=M.elements[1],E[w+2]=M.elements[2],E[w+3]=0,E[w+4]=M.elements[3],E[w+5]=M.elements[4],E[w+6]=M.elements[5],E[w+7]=0,E[w+8]=M.elements[6],E[w+9]=M.elements[7],E[w+10]=M.elements[8],E[w+11]=0):ArrayBuffer.isView(M)?E.set(M.subarray(0,E.length-w),w):M.toArray(E,w)}function h(M,E,w,R){let C=M.value,v=E+"_"+w;if(Array.isArray(C)){R[v]===void 0&&(R[v]=[]);let y=R[v],I=!1;for(let A=0;A<C.length;A++)d(C[A],y,A)===!0&&(I=!0);return I}return d(C,R,v)}function d(M,E,w){if(E[w]===void 0)return typeof M=="number"||typeof M=="boolean"?E[w]=M:ArrayBuffer.isView(M)?E[w]=M.slice():E[w]=M.clone(),!0;{let R=E[w];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return E[w]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(R.equals(M)===!1)return R.copy(M),!0}}return!1}function _(M){let E=M.uniforms,w=0,R=16;for(let v=0,y=E.length;v<y;v++){let I=Array.isArray(E[v])?E[v]:[E[v]];for(let A=0,L=I.length;A<L;A++){let N=I[A],q=Array.isArray(N.value)?N.value:[N.value],P=Array.isArray(E[v])||Array.isArray(N.value),O=w;for(let H=0,te=q.length;H<te;H++){let Z=q[H],re=x(Z,P),le=w%R,De=le%re.boundary,$=le+De;w+=De,$!==0&&R-$<re.storage&&(w+=R-$),H===0&&(O=w),w+=re.storage}let X=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new X((w-O)/Float32Array.BYTES_PER_ELEMENT),N.__offset=O}}let C=w%R;return C>0&&(w+=R-C),M.__size=w,M.__cache={},this}function x(M,E){let w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=16,w.storage=48):M.isMatrix4?(w.boundary=16,w.storage=64):M.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",M),E===!0&&(w.boundary=16,w.storage=Math.ceil(w.storage/16)*16),w}function g(M){let E=M.target;E.removeEventListener("dispose",g),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(let M in s)n.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:p}}var Sx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),jn=null;function Mx(){return jn===null&&(jn=new Io(Sx,16,16,Yi,$n),jn.name="DFG_LUT",jn.minFilter=un,jn.magFilter=un,jn.wrapS=qn,jn.wrapT=qn,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}var Bl=class{constructor(e={}){let{canvas:t=gf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:h=!1,outputBufferType:d=_n}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;let x=d,g=new Set([sl,il,nl]),p=new Set([_n,Bn,nr,ms,el,tl]),M=new Uint32Array(4),E=new Int32Array(4),w={textures:[],min:[],max:[],resolution:[]},R=null,C=null,v=[],y=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,L=!1,N=null,q=null,P=null,O=null;this._outputColorSpace=ln;let X=0,H=0,te=null,Z=-1,re=null,le=new Ct,De=new Ct,$=null,Y=new tt(0),de=0,pe=t.width,Re=t.height,ye=1,ke=null,at=null,Pe=new Ct(0,0,pe,Re),Je=new Ct(0,0,pe,Re),st=!1,Ze=new zi,Rt=new Po,St=!1,z=!1,k=new Et,j=new B,oe=new Ct,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function Be(){return te===null?ye:1}let U=i;function Ie(S,F){return t.getContext(S,F)}let Qe,he,me,Lt,$e,qe,T,b,G,ce,ae,ge,Se,ee,ie,ve,D,se,K,xe,fe,_e,ze;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",et,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),U===null){let F="webgl2";if(U=Ie(F,S),U===null)throw Ie(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}nt()}catch(S){throw t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),We("WebGLRenderer: "+S.message),S}function nt(){Qe=new Ny(U),Qe.init(),fe=new gx(U,Qe),he=new My(U,Qe,e,fe),me=new px(U,Qe),he.reversedDepthBuffer&&h&&me.buffers.depth.setReversed(!0),q=U.createFramebuffer(),P=U.createFramebuffer(),O=U.createFramebuffer(),Lt=new Fy(U),$e=new ex,qe=new mx(U,Qe,me,$e,he,fe,Lt),T=new Ly(A),b=new Bg(U),_e=new by(U,b),G=new Uy(U,b,Lt,_e),ce=new By(U,G,b,_e,Lt),se=new ky(U,he,qe),ie=new wy($e),ae=new Qv(A,T,Qe,he,_e,ie),ge=new xx(A,$e),Se=new nx,ee=new lx(Qe),D=new xy(A,T,me,ce,_,l),ve=new fx(A,ce,he),ze=new bx(U,Lt,he,me),K=new Sy(U,Qe,Lt),xe=new Oy(U,Qe,Lt),Lt.programs=ae.programs,A.capabilities=he,A.extensions=Qe,A.properties=$e,A.renderLists=Se,A.shadowMap=ve,A.state=me,A.info=Lt}x!==_n&&(I=new $y(x,t.width,t.height,o,s,r));let ue=new Xd(A,U);this.xr=ue,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=Qe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Qe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(S){S!==void 0&&(ye=S,this.setSize(pe,Re,!1))},this.getSize=function(S){return S.set(pe,Re)},this.setSize=function(S,F,J=!0){if(ue.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=S,Re=F,t.width=Math.floor(S*ye),t.height=Math.floor(F*ye),J===!0&&(t.style.width=S+"px",t.style.height=F+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(pe*ye,Re*ye).floor()},this.setDrawingBufferSize=function(S,F,J){pe=S,Re=F,ye=J,t.width=Math.floor(S*J),t.height=Math.floor(F*J),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(x===_n){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(le)},this.getViewport=function(S){return S.copy(Pe)},this.setViewport=function(S,F,J,V){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,F,J,V),me.viewport(le.copy(Pe).multiplyScalar(Be()).round())},this.getScissor=function(S){return S.copy(Je)},this.setScissor=function(S,F,J,V){S.isVector4?Je.set(S.x,S.y,S.z,S.w):Je.set(S,F,J,V),me.scissor(De.copy(Je).multiplyScalar(Be()).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(S){me.setScissorTest(st=S)},this.setOpaqueSort=function(S){ke=S},this.setTransparentSort=function(S){at=S},this.getClearColor=function(S){return S.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,J=!0){let V=0;if(S){let W=!1;if(te!==null){let Me=te.texture.format;W=g.has(Me)}if(W){let Me=te.texture.type,Le=p.has(Me),be=D.getClearColor(),Ce=D.getClearAlpha(),Oe=be.r,je=be.g,ot=be.b;Le?(M[0]=Oe,M[1]=je,M[2]=ot,M[3]=Ce,U.clearBufferuiv(U.COLOR,0,M)):(E[0]=Oe,E[1]=je,E[2]=ot,E[3]=Ce,U.clearBufferiv(U.COLOR,0,E))}else V|=U.COLOR_BUFFER_BIT}F&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),N=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),D.dispose(),Se.dispose(),ee.dispose(),qe.dispose(),$e.dispose(),T.dispose(),ce.dispose(),G.dispose(),_e.dispose(),ze.dispose(),ae.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",vu),ue.removeEventListener("sessionend",xu),es.stop()};function Ve(S){S.preventDefault(),Rd("WebGLRenderer: Context Lost."),L=!0}function et(){Rd("WebGLRenderer: Context Restored."),L=!1;let S=Lt.autoReset,F=ve.enabled,J=ve.autoUpdate,V=ve.needsUpdate,W=ve.type;nt(),Lt.autoReset=S,ve.enabled=F,ve.autoUpdate=J,ve.needsUpdate=V,ve.type=W}function Ee(S){We("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function yt(S){let F=S.target;F.removeEventListener("dispose",yt),Gt(F)}function Gt(S){Ti(S),$e.remove(S)}function Ti(S){let F=$e.get(S).programs;F!==void 0&&(F.forEach(function(J){ae.releaseProgram(J)}),S.isShaderMaterial&&ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,J,V,W,Me){F===null&&(F=ne);let Le=W.isMesh&&W.matrixWorld.determinantAffine()<0,be=sm(S,F,J,V,W);me.setMaterial(V,Le);let Ce=J.index,Oe=1;if(V.wireframe===!0){if(Ce=G.getWireframeAttribute(J),Ce===void 0)return;Oe=2}let je=J.drawRange,ot=J.attributes.position,Ne=je.start*Oe,lt=(je.start+je.count)*Oe;Me!==null&&(Ne=Math.max(Ne,Me.start*Oe),lt=Math.min(lt,(Me.start+Me.count)*Oe)),Ce!==null?(Ne=Math.max(Ne,0),lt=Math.min(lt,Ce.count)):ot!=null&&(Ne=Math.max(Ne,0),lt=Math.min(lt,ot.count));let Nt=lt-Ne;if(Nt<0||Nt===1/0)return;_e.setup(W,V,be,J,Ce);let Mt,bt=K;if(Ce!==null&&(Mt=b.get(Ce),bt=xe,bt.setIndex(Mt)),W.isMesh)V.wireframe===!0?(me.setLineWidth(V.wireframeLinewidth*Be()),bt.setMode(U.LINES)):bt.setMode(U.TRIANGLES);else if(W.isLine){let jt=V.linewidth;jt===void 0&&(jt=1),me.setLineWidth(jt*Be()),W.isLineSegments?bt.setMode(U.LINES):W.isLineLoop?bt.setMode(U.LINE_LOOP):bt.setMode(U.LINE_STRIP)}else W.isPoints?bt.setMode(U.POINTS):W.isSprite&&bt.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(Qe.get("WEBGL_multi_draw"))bt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let jt=W._multiDrawStarts,Ue=W._multiDrawCounts,an=W._multiDrawCount,ft=Ce?b.get(Ce).bytesPerElement:1,ts=$e.get(V).currentProgram.getUniforms();for(let Kt=0;Kt<an;Kt++)ts.setValue(U,"_gl_DrawID",Kt),bt.render(jt[Kt]/ft,Ue[Kt])}else if(W.isInstancedMesh)bt.renderInstances(Ne,Nt,W.count);else if(J.isInstancedBufferGeometry){let jt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ue=Math.min(J.instanceCount,jt);bt.renderInstances(Ne,Nt,Ue)}else bt.render(Ne,Nt)};function yu(S,F,J,V){N!==null&&S.isNodeMaterial&&N.setObject(V,S),St===!0&&ie.setState(S,J,!1),S.transparent===!0&&S.side===Jn&&S.forceSinglePass===!1?(S.side=hn,S.needsUpdate=!0,mr(S,F,V),S.side=Xi,S.needsUpdate=!0,mr(S,F,V),S.side=Jn):mr(S,F,V)}this.compile=function(S,F,J=null){J===null&&(J=S),N!==null&&N.renderStart(S,F,J),C=ee.get(J),C.init(F),y.push(C),J.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),S!==J&&S.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(C.pushLight(W),W.castShadow&&C.pushShadow(W))}),C.setupLights(),N!==null&&N.updateLights(C.state.lightsArray),z=this.localClippingEnabled,St=ie.init(this.clippingPlanes,z),St===!0&&ie.setGlobalState(this.clippingPlanes,F),N!==null&&ve.render(C.state.shadowsArray,J,F);let V=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let Me=W.material;if(Me)if(Array.isArray(Me))for(let Le=0;Le<Me.length;Le++){let be=Me[Le];yu(be,J,F,W),V.add(be)}else yu(Me,J,F,W),V.add(Me)}),C=y.pop(),N!==null&&N.renderEnd(),V},this.compileAsync=function(S,F,J=null){let V=this.compile(S,F,J);return new Promise(W=>{function Me(){if(V.forEach(function(Le){let Ce=$e.get(Le).currentProgram;(Ce===void 0||Ce.isReady())&&V.delete(Le)}),V.size===0){W(S);return}setTimeout(Me,10)}Qe.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let oc=null;function nm(S){oc&&oc(S)}function vu(){es.stop()}function xu(){es.start()}let es=new Xf;es.setAnimationLoop(nm),typeof self<"u"&&es.setContext(self),this.setAnimationLoop=function(S){oc=S,ue.setAnimationLoop(S),S===null?es.stop():es.start()},ue.addEventListener("sessionstart",vu),ue.addEventListener("sessionend",xu),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;N!==null&&N.renderStart(S,F);let J=ue.enabled===!0&&ue.isPresenting===!0,V=I!==null&&(te===null||J)&&I.begin(A,te);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(F),F=ue.getCamera()),S.isScene===!0&&S.onBeforeRender(A,S,F,te),C=ee.get(S,y.length),C.init(F),C.state.textureUnits=qe.getTextureUnits(),y.push(C),k.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),F.isArrayCamera?Rt.setFromArrayCamera(F):Ze.setFromProjectionMatrix(k,An,F.reversedDepth),z=this.localClippingEnabled,St=ie.init(this.clippingPlanes,z),R=Se.get(S,v.length),R.init(),v.push(R),this.info.render.frame++,ue.enabled===!0&&ue.isPresenting===!0){let Le=A.xr.getDepthSensingMesh();Le!==null&&lc(Le,F,-1/0,A.sortObjects)}lc(S,F,0,A.sortObjects),R.finish(),N!==null&&N.updateLights(C.state.lightsArray),A.sortObjects===!0&&R.sort(ke,at),Ae=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Ae&&D.addToRenderList(R,S),this.info.autoReset===!0&&this.info.reset(),St===!0&&ie.beginShadows();let W=C.state.shadowsArray;if(ve.render(W,S,F),St===!0&&ie.endShadows(),(V&&I.hasRenderPass())===!1){let Le=R.opaque,be=R.transmissive;if(C.setupLights(),F.isArrayCamera){let Ce=F.cameras;if(be.length>0)for(let Oe=0,je=Ce.length;Oe<je;Oe++){let ot=Ce[Oe];Su(Le,be,S,ot)}Ae&&D.render(S);for(let Oe=0,je=Ce.length;Oe<je;Oe++){let ot=Ce[Oe];bu(R,S,ot,ot.viewport)}}else be.length>0&&Su(Le,be,S,F),Ae&&D.render(S),bu(R,S,F)}te!==null&&H===0&&(qe.updateMultisampleRenderTarget(te),qe.updateRenderTargetMipmap(te)),V&&I.end(A),S.isScene===!0&&S.onAfterRender(A,S,F),_e.resetDefaultState(),Z=-1,re=null,y.pop(),y.length>0?(C=y[y.length-1],qe.setTextureUnits(C.state.textureUnits),St===!0&&ie.setGlobalState(A.clippingPlanes,C.state.camera)):C=null,v.pop(),v.length>0?R=v[v.length-1]:R=null,N!==null&&N.renderEnd()};function lc(S,F,J,V){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)J=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)C.pushLight(S),S.castShadow&&C.pushShadow(S);else if(S.isSprite){let Le=F.isArrayCamera?Rt:Ze;if(!S.frustumCulled||S.intersectsFrustum(Le)){V&&oe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(k);let be=ce.update(S),Ce=S.material;Ce.visible&&R.push(S,be,Ce,J,oe.z,null,F)}}else if(S.isMesh||S.isLine||S.isPoints){let Le=F.isArrayCamera?Rt:Ze;if(!S.frustumCulled||S.intersectsFrustum(Le)){let be=ce.update(S),Ce=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),oe.copy(S.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),oe.copy(be.boundingSphere.center)),oe.applyMatrix4(S.matrixWorld).applyMatrix4(k)),Array.isArray(Ce)){let Oe=be.groups;for(let je=0,ot=Oe.length;je<ot;je++){let Ne=Oe[je],lt=Ce[Ne.materialIndex];lt&&lt.visible&&R.push(S,be,lt,J,oe.z,Ne,F)}}else Ce.visible&&R.push(S,be,Ce,J,oe.z,null,F)}}}let Me=S.children;for(let Le=0,be=Me.length;Le<be;Le++)lc(Me[Le],F,J,V)}function bu(S,F,J,V){let{opaque:W,transmissive:Me,transparent:Le}=S;C.setupLightsView(J),St===!0&&ie.setGlobalState(A.clippingPlanes,J),V&&me.viewport(le.copy(V)),W.length>0&&Da(W,F,J),Me.length>0&&Da(Me,F,J),Le.length>0&&Da(Le,F,J),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Su(S,F,J,V){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[V.id]===void 0){let Ne=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[V.id]=new Mn(1,1,{generateMipmaps:!0,type:Ne?$n:_n,minFilter:xi,samples:Math.max(4,he.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}let Me=C.state.transmissionRenderTarget[V.id],Le=V.viewport||le;Me.setSize(Le.z*A.transmissionResolutionScale,Le.w*A.transmissionResolutionScale);let be=A.getRenderTarget(),Ce=A.getActiveCubeFace(),Oe=A.getActiveMipmapLevel();A.setRenderTarget(Me),A.getClearColor(Y),de=A.getClearAlpha(),de<1&&A.setClearColor(16777215,.5),A.clear(),Ae&&D.render(J);let je=A.toneMapping;A.toneMapping=Zn;let ot=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),C.setupLightsView(V),St===!0&&ie.setGlobalState(A.clippingPlanes,V),Da(S,J,V),qe.updateMultisampleRenderTarget(Me),qe.updateRenderTargetMipmap(Me),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let lt=0,Nt=F.length;lt<Nt;lt++){let Mt=F[lt],{object:bt,geometry:jt,material:Ue,group:an}=Mt;if(Ue.side===Jn&&bt.layers.test(V.layers)){let ft=Ue.side;Ue.side=hn,Ue.needsUpdate=!0,Mu(bt,J,V,jt,Ue,an),Ue.side=ft,Ue.needsUpdate=!0,Ne=!0}}Ne===!0&&(qe.updateMultisampleRenderTarget(Me),qe.updateRenderTargetMipmap(Me))}A.setRenderTarget(be,Ce,Oe),A.setClearColor(Y,de),ot!==void 0&&(V.viewport=ot),A.toneMapping=je}function Da(S,F,J){let V=F.isScene===!0?F.overrideMaterial:null;for(let W=0,Me=S.length;W<Me;W++){let Le=S[W],{object:be,geometry:Ce,group:Oe}=Le,je=Le.material;je.allowOverride===!0&&V!==null&&(je=V),be.layers.test(J.layers)&&Mu(be,F,J,Ce,je,Oe)}}function Mu(S,F,J,V,W,Me){N!==null&&W.isNodeMaterial&&N.setObject(S,W),S.onBeforeRender(A,F,J,V,W,Me),S.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(A,F,J,V,S,Me),W.transparent===!0&&W.side===Jn&&W.forceSinglePass===!1?(W.side=hn,W.needsUpdate=!0,A.renderBufferDirect(J,F,V,W,S,Me),W.side=Xi,W.needsUpdate=!0,A.renderBufferDirect(J,F,V,W,S,Me),W.side=Jn):A.renderBufferDirect(J,F,V,W,S,Me),S.onAfterRender(A,F,J,V,W,Me)}function wu(S){let F=0;for(let J of S)J.texture!==null&&F++;return F}function mr(S,F,J){F.isScene!==!0&&(F=ne);let V=$e.get(S),W=C.state.lights,Me=C.state.shadowsArray,Le=W.state.version,be=ae.getParameters(S,W.state,Me,F,J,C.state.lightProbeGridArray),Ce=ae.getProgramCacheKey(be),Oe=V.programs;V.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;let je=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;V.envMap=T.get(S.envMap||V.environment,je),V.envMapRotation=V.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Oe===void 0&&(S.addEventListener("dispose",yt),Oe=new Map,V.programs=Oe,V.programVariants=new Map);let ot=Oe.get(Ce);if(ot!==void 0){if(V.currentProgram===ot&&V.lightsStateVersion===Le)return Tu(S,be),ot}else be.uniforms=ae.getUniforms(S),N!==null&&S.isNodeMaterial&&N.build(S,J,be),S.onBeforeCompile(be,A),ot=ae.acquireProgram(be,Ce),Oe.set(Ce,ot),V.uniforms=be.uniforms;let Ne=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ne.clippingPlanes=ie.uniform),Tu(S,be),V.needsLights=am(S),V.lightsStateVersion=Le,V.needsLights&&(Ne.ambientLightColor.value=W.state.ambient,Ne.lightProbe.value=W.state.probe,Ne.sunLights.value=W.state.sun,Ne.sunLightShadows.value=W.state.sunShadow,Ne.directionalLights.value=W.state.directional,Ne.directionalLightShadows.value=W.state.directionalShadow,Ne.spotLights.value=W.state.spot,Ne.spotLightShadows.value=W.state.spotShadow,Ne.rectAreaLights.value=W.state.rectArea,Ne.ltc_1.value=W.state.rectAreaLTC1,Ne.ltc_2.value=W.state.rectAreaLTC2,Ne.pointLights.value=W.state.point,Ne.pointLightShadows.value=W.state.pointShadow,Ne.hemisphereLights.value=W.state.hemi,Ne.sunShadowMatrix.value=W.state.sunShadowMatrix,Ne.sunShadowCascade.value=W.state.sunShadowCascade,Ne.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ne.spotLightMatrix.value=W.state.spotLightMatrix,Ne.spotLightMap.value=W.state.spotLightMap,Ne.pointShadowMatrix.value=W.state.pointShadowMatrix),V.numLightProbeGrids=wu(C.state.lightProbeGridArray),V.currentProgram=ot,V.uniformsList=null,ot}function im(S,F,J,V,W){let Me=$e.get(S),Le=Me.currentProgram.id+","+V+","+W,be=Me.programVariants.get(Le);return be===void 0?(be=mr(S,F,J),Me.programVariants.set(Le,be)):(Me.currentProgram=be,Me.uniformsList=null,Me.outputColorSpace=V,Me.toneMapping=W),be}function Eu(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=sr.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Tu(S,F){let J=$e.get(S);J.outputColorSpace=F.outputColorSpace,J.batching=F.batching,J.batchingColor=F.batchingColor,J.instancing=F.instancing,J.instancingColor=F.instancingColor,J.instancingMorph=F.instancingMorph,J.skinning=F.skinning,J.morphTargets=F.morphTargets,J.morphNormals=F.morphNormals,J.morphColors=F.morphColors,J.morphTargetsCount=F.morphTargetsCount,J.numClippingPlanes=F.numClippingPlanes,J.numIntersection=F.numClipIntersection,J.vertexAlphas=F.vertexAlphas,J.vertexTangents=F.vertexTangents,J.toneMapping=F.toneMapping}function sm(S,F,J,V,W){F.isScene!==!0&&(F=ne),qe.resetTextureUnits();let Me=F.fog,Le=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,be=te===null?A.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ct.workingColorSpace,Ce=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Oe=T.get(V.envMap||Le,Ce),je=V.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ot=!!J.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ne=!!J.morphAttributes.position,lt=!!J.morphAttributes.normal,Nt=!!J.morphAttributes.color,Mt=Zn;V.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Mt=A.toneMapping);let bt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,jt=bt!==void 0?bt.length:0,Ue=$e.get(V),an=C.state.lights;if(St===!0&&(z===!0||S!==re)){let It=S===re&&V.id===Z;ie.setState(V,S,It)}let ft=!1,ts=!1;V.version===Ue.__version?Ue.needsLights&&Ue.lightsStateVersion!==an.state.version||W.isBatchedMesh&&Ue.batching===!1||!W.isBatchedMesh&&Ue.batching===!0||W.isBatchedMesh&&Ue.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Ue.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Ue.instancing===!1||!W.isInstancedMesh&&Ue.instancing===!0||W.isSkinnedMesh&&Ue.skinning===!1||!W.isSkinnedMesh&&Ue.skinning===!0||W.isInstancedMesh&&Ue.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ue.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ue.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ue.instancingMorph===!1&&W.morphTexture!==null||Ue.envMap!==Oe||V.fog===!0&&Ue.fog!==Me||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ie.numPlanes||Ue.numIntersection!==ie.numIntersection)||Ue.vertexAlphas!==je||Ue.vertexTangents!==ot||Ue.morphTargets!==Ne||Ue.morphNormals!==lt||Ue.morphColors!==Nt||Ue.morphTargetsCount!==jt||Ue.numLightProbeGrids!==wu(C.state.lightProbeGridArray)?ft=!0:(Ue.outputColorSpace!==be||Ue.toneMapping!==Mt)&&(ts=!0):(ft=!0,Ue.__version=V.version);let Kt=Ue.currentProgram;(ft===!0||ts===!0)&&(Kt=ts===!0?im(V,F,W,be,Mt):mr(V,F,W),N&&V.isNodeMaterial&&N.onUpdateProgram(V,Kt,Ue));let La=!1,Ai=!1,ns=!1,ht=Kt.getUniforms(),Xt=Ue.uniforms;if(me.useProgram(Kt.program)&&(La=!0,Ai=!0,ns=!0),V.id!==Z&&(Z=V.id,Ai=!0),La||re!==S){me.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ht.setValue(U,"projectionMatrix",S.projectionMatrix),ht.setValue(U,"viewMatrix",S.matrixWorldInverse);let Ht=ht.map.cameraPosition;Ht!==void 0&&Ht.setValue(U,j.setFromMatrixPosition(S.matrixWorld)),he.logarithmicDepthBuffer&&ht.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ht.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),re!==S&&(re=S,Ai=!0,ns=!0)}if(Ue.needsLights&&(an.state.sunShadowMap.length>0&&ht.setValue(U,"sunShadowMap",an.state.sunShadowMap,qe),an.state.directionalShadowMap.length>0&&ht.setValue(U,"directionalShadowMap",an.state.directionalShadowMap,qe),an.state.spotShadowMap.length>0&&ht.setValue(U,"spotShadowMap",an.state.spotShadowMap,qe),an.state.pointShadowMap.length>0&&ht.setValue(U,"pointShadowMap",an.state.pointShadowMap,qe)),W.isSkinnedMesh){ht.setOptional(U,W,"bindMatrix"),ht.setOptional(U,W,"bindMatrixInverse");let It=W.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ht.setValue(U,"boneTexture",It.boneTexture,qe))}W.isBatchedMesh&&(ht.setOptional(U,W,"batchingTexture"),ht.setValue(U,"batchingTexture",W._matricesTexture,qe),ht.setOptional(U,W,"batchingIdTexture"),ht.setValue(U,"batchingIdTexture",W._indirectTexture,qe),ht.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&ht.setValue(U,"batchingColorTexture",W._colorsTexture,qe));let Rn=J.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&se.update(W,J,Kt),(Ai||Ue.receiveShadow!==W.receiveShadow)&&(Ue.receiveShadow=W.receiveShadow,ht.setValue(U,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Xt.envMapIntensity.value=F.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=Mx()),Ai){if(ht.setValue(U,"toneMappingExposure",A.toneMappingExposure),Ue.needsLights&&rm(Xt,ns),Me&&V.fog===!0&&ge.refreshFogUniforms(Xt,Me),ge.refreshMaterialUniforms(Xt,V,ye,Re,C.state.transmissionRenderTarget[S.id]),Ue.needsLights&&Ue.numLightProbeGrids>0){let It=w,Ht=0;for(let ai of C.state.lightProbeGridArray)ai.texture!==null&&(It.textures[Ht]=ai.texture,It.min[Ht]=ai.boundingBox.min,It.max[Ht]=ai.boundingBox.max,It.resolution[Ht]=ai.resolution,Ht++);for(let ai in It)It[ai].length=Ht;Xt.probesSH.value=It.textures,Xt.probesMin.value=It.min,Xt.probesMax.value=It.max,Xt.probesResolution.value=It.resolution}sr.upload(U,Eu(Ue),Xt,qe)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(sr.upload(U,Eu(Ue),Xt,qe),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ht.setValue(U,"center",W.center),ht.setValue(U,"modelViewMatrix",W.modelViewMatrix),ht.setValue(U,"normalMatrix",W.normalMatrix),ht.setValue(U,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){let It=V.uniformsGroups;for(let Ht=0,ai=It.length;Ht<ai;Ht++){let Cu=It[Ht];ze.update(Cu,Kt),ze.bind(Cu,Kt)}}return Kt}function rm(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.sunLights.needsUpdate=F,S.sunLightShadows.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function am(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(S,F,J){let V=$e.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),$e.get(S.texture).__webglTexture=F,$e.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:J,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let J=$e.get(S);J.__webglFramebuffer=F,J.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,J=0){te=S,X=F,H=J;let V=null,W=!1,Me=!1;if(S){let be=$e.get(S);if(be.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(U.FRAMEBUFFER,be.__webglFramebuffer),le.copy(S.viewport),De.copy(S.scissor),$=S.scissorTest,me.viewport(le),me.scissor(De),me.setScissorTest($),Z=-1;return}else if(be.__webglFramebuffer===void 0)qe.setupRenderTarget(S);else if(be.__hasExternalTextures)qe.rebindTextures(S,$e.get(S.texture).__webglTexture,$e.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let je=S.depthTexture;if(be.__boundDepthTexture!==je){if(je!==null&&$e.has(je)&&(S.width!==je.image.width||S.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");qe.setupDepthRenderbuffer(S)}}let Ce=S.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Me=!0);let Oe=$e.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Oe[F])?V=Oe[F][J]:V=Oe[F],W=!0):S.samples>0&&qe.useMultisampledRTT(S)===!1?V=$e.get(S).__webglMultisampledFramebuffer:Array.isArray(Oe)?V=Oe[J]:V=Oe,le.copy(S.viewport),De.copy(S.scissor),$=S.scissorTest}else le.copy(Pe).multiplyScalar(ye).floor(),De.copy(Je).multiplyScalar(ye).floor(),$=st;if(J!==0&&(V=q),me.bindFramebuffer(U.FRAMEBUFFER,V)&&me.drawBuffers(S,V),me.viewport(le),me.scissor(De),me.setScissorTest($),W){let be=$e.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,be.__webglTexture,J)}else if(Me){let be=F;for(let Ce=0;Ce<S.textures.length;Ce++){let Oe=$e.get(S.textures[Ce]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ce,Oe.__webglTexture,J,be)}}else if(S!==null&&J!==0){let be=$e.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,be.__webglTexture,J)}Z=-1};function Au(S){let F=$e.get(S);return(F.__readFormat!==S.format||F.__readType!==S.type)&&(F.__readFormat=S.format,F.__readType=S.type,F.__formatReadable=he.textureFormatReadable(S.format),F.__typeReadable=he.textureTypeReadable(S.type)),F}this.readRenderTargetPixels=function(S,F,J,V,W,Me,Le,be=0){if(!(S&&S.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=$e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Le!==void 0&&(Ce=Ce[Le],Array.isArray(Ce)&&(Ce=Ce[0])),Ce){me.bindFramebuffer(U.FRAMEBUFFER,Ce);try{let Oe=S.textures[be],je=Oe.format,ot=Oe.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);let Ne=Au(Oe);if(Ne.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ne.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-V&&J>=0&&J<=S.height-W&&U.readPixels(F,J,V,W,fe.convert(je),fe.convert(ot),Me)}finally{let Oe=te!==null?$e.get(te).__webglFramebuffer:null;me.bindFramebuffer(U.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(S,F,J,V,W,Me,Le,be=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=$e.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Le!==void 0&&(Ce=Ce[Le],Array.isArray(Ce)&&(Ce=Ce[0])),Ce)if(F>=0&&F<=S.width-V&&J>=0&&J<=S.height-W){me.bindFramebuffer(U.FRAMEBUFFER,Ce);let Oe=S.textures[be],je=Oe.format,ot=Oe.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);let Ne=Au(Oe);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let lt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.bufferData(U.PIXEL_PACK_BUFFER,Me.byteLength,U.STREAM_READ),U.readPixels(F,J,V,W,fe.convert(je),fe.convert(ot),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Nt=te!==null?$e.get(te).__webglFramebuffer:null;me.bindFramebuffer(U.FRAMEBUFFER,Nt);let Mt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await yf(U,Mt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Me),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(lt),U.deleteSync(Mt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,J=0){let V=Math.pow(2,-J),W=Math.floor(S.image.width*V),Me=Math.floor(S.image.height*V),Le=F!==null?F.x:0,be=F!==null?F.y:0;qe.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Le,be,W,Me),me.unbindTexture()},this.copyTextureToTexture=function(S,F,J=null,V=null,W=0,Me=0){let Le,be,Ce,Oe,je,ot,Ne,lt,Nt,Mt=S.isCompressedTexture?S.mipmaps[Me]:S.image;if(J!==null)Le=J.max.x-J.min.x,be=J.max.y-J.min.y,Ce=J.isBox3?J.max.z-J.min.z:1,Oe=J.min.x,je=J.min.y,ot=J.isBox3?J.min.z:0;else{let ht=Math.pow(2,-W);Le=Math.floor(Mt.width*ht),be=Math.floor(Mt.height*ht),S.isDataArrayTexture?Ce=Mt.depth:S.isData3DTexture?Ce=Math.floor(Mt.depth*ht):Ce=1,Oe=0,je=0,ot=0}V!==null?(Ne=V.x,lt=V.y,Nt=V.z):(Ne=0,lt=0,Nt=0);let bt=fe.convert(F.format),jt=fe.convert(F.type),Ue;F.isData3DTexture?(qe.setTexture3D(F,0),Ue=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(qe.setTexture2DArray(F,0),Ue=U.TEXTURE_2D_ARRAY):(qe.setTexture2D(F,0),Ue=U.TEXTURE_2D),me.activeTexture(U.TEXTURE0),me.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),me.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),me.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);let an=me.getParameter(U.UNPACK_ROW_LENGTH),ft=me.getParameter(U.UNPACK_IMAGE_HEIGHT),ts=me.getParameter(U.UNPACK_SKIP_PIXELS),Kt=me.getParameter(U.UNPACK_SKIP_ROWS),La=me.getParameter(U.UNPACK_SKIP_IMAGES);me.pixelStorei(U.UNPACK_ROW_LENGTH,Mt.width),me.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Mt.height),me.pixelStorei(U.UNPACK_SKIP_PIXELS,Oe),me.pixelStorei(U.UNPACK_SKIP_ROWS,je),me.pixelStorei(U.UNPACK_SKIP_IMAGES,ot);let Ai=S.isDataArrayTexture||S.isData3DTexture,ns=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let ht=$e.get(S),Xt=$e.get(F),Rn=$e.get(ht.__renderTarget),It=$e.get(Xt.__renderTarget);me.bindFramebuffer(U.READ_FRAMEBUFFER,Rn.__webglFramebuffer),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Ht=0;Ht<Ce;Ht++)Ai&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$e.get(S).__webglTexture,W,ot+Ht),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$e.get(F).__webglTexture,Me,Nt+Ht)),U.blitFramebuffer(Oe,je,Oe+Le,je+be,Ne,lt,Ne+Le,lt+be,U.DEPTH_BUFFER_BIT,U.NEAREST);me.bindFramebuffer(U.READ_FRAMEBUFFER,null),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||$e.has(S)){let ht=$e.get(S),Xt=$e.get(F);me.bindFramebuffer(U.READ_FRAMEBUFFER,P),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,O);for(let Rn=0;Rn<Ce;Rn++)Ai?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ht.__webglTexture,W,ot+Rn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ht.__webglTexture,W),ns?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xt.__webglTexture,Me,Nt+Rn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xt.__webglTexture,Me),W!==0?U.blitFramebuffer(Oe,je,Oe+Le,je+be,Ne,lt,Ne+Le,lt+be,U.COLOR_BUFFER_BIT,U.NEAREST):ns?U.copyTexSubImage3D(Ue,Me,Ne,lt,Nt+Rn,Oe,je,Le,be):U.copyTexSubImage2D(Ue,Me,Ne,lt,Oe,je,Le,be);me.bindFramebuffer(U.READ_FRAMEBUFFER,null),me.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ns?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Ue,Me,Ne,lt,Nt,Le,be,Ce,bt,jt,Mt.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(Ue,Me,Ne,lt,Nt,Le,be,Ce,bt,Mt.data):U.texSubImage3D(Ue,Me,Ne,lt,Nt,Le,be,Ce,bt,jt,Mt):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Me,Ne,lt,Le,be,bt,jt,Mt.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Me,Ne,lt,Mt.width,Mt.height,bt,Mt.data):U.texSubImage2D(U.TEXTURE_2D,Me,Ne,lt,Le,be,bt,jt,Mt);me.pixelStorei(U.UNPACK_ROW_LENGTH,an),me.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ft),me.pixelStorei(U.UNPACK_SKIP_PIXELS,ts),me.pixelStorei(U.UNPACK_SKIP_ROWS,Kt),me.pixelStorei(U.UNPACK_SKIP_IMAGES,La),Me===0&&F.generateMipmaps===!0&&F.mipmapsAutoUpdate===!0&&U.generateMipmap(Ue),me.unbindTexture()},this.initRenderTarget=function(S){$e.get(S).__webglFramebuffer===void 0&&qe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?qe.setTextureCube(S,0):S.isData3DTexture?qe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?qe.setTexture2DArray(S,0):qe.setTexture2D(S,0),me.unbindTexture()},this.resetState=function(){X=0,H=0,te=null,me.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};var sp={type:"change"},Jd={type:"start"},ap={type:"end"},Vl=new Bi,rp=new bn,Ex=Math.cos(70*Ld.DEG2RAD),$t=new B,yn=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yd=1e-6,Gl=class extends Kr{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wi.ROTATE,MIDDLE:Wi.DOLLY,RIGHT:Wi.PAN},this.touches={ONE:qi.ROTATE,TWO:qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Sn,this._lastTargetPosition=new B,this._quat=new Sn().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ks,this._sphericalDelta=new Ks,this._scale=1,this._panOffset=new B,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new B,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ax.bind(this),this._onPointerDown=Tx.bind(this),this._onPointerUp=Cx.bind(this),this._onContextMenu=Ux.bind(this),this._onMouseWheel=Px.bind(this),this._onKeyDown=Dx.bind(this),this._onTouchStart=Lx.bind(this),this._onTouchMove=Nx.bind(this),this._onMouseDown=Rx.bind(this),this._onMouseMove=Ix.bind(this),this._interceptControlDown=Ox.bind(this),this._interceptControlUp=Fx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=mt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sp),this.update(),this.state=mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=yn:i>Math.PI&&(i-=yn),s<-Math.PI?s+=yn:s>Math.PI&&(s-=yn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=$t.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Vl.origin.copy(this.object.position),Vl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vl.direction))<Ex?this.object.lookAt(this.target):(rp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vl.intersectPlane(rp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Yd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yd||this._lastTargetPosition.distanceToSquared(this.target)>Yd?(this.dispatchEvent(sp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?yn/60*this.autoRotateSpeed*e:yn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;$t.copy(s).sub(this.target);let r=$t.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-yn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yn*this._rotateDelta.x/t.clientHeight),this._rotateUp(yn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new He,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function Tx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Ax(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Cx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ap),this.state=mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Rx(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=mt.DOLLY;break;case Wi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}break;case Wi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Jd)}function Ix(n){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Px(n){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(n.preventDefault(),this.dispatchEvent(Jd),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ap))}function Dx(n){this.enabled!==!1&&this._handleKeyDown(n)}function Lx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case qi.ROTATE:if(this.enableRotate===!1){this.state=mt.NONE;break}this._handleTouchStartRotate(n),this.state=mt.TOUCH_ROTATE;break;case qi.PAN:if(this.enablePan===!1){this.state=mt.NONE;break}this._handleTouchStartPan(n),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=mt.TOUCH_DOLLY_PAN;break;case qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Jd)}function Nx(n){switch(this._trackPointer(n),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=mt.NONE}}function Ux(n){this.enabled!==!1&&n.preventDefault()}function Ox(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Fx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Qn={floor:15001830,white:16185332,steel:10793134,dark:3426375,orange:14972725,green:3705964,red:12144956,blue:6722717,unknown:9147028},op=n=>["running","run","\u8FD0\u884C","\u8FD0\u884C\u4E2D"].includes(n),kx=n=>["stopped","stop","fault","alarm","\u505C\u673A","\u505C\u6B62"].includes(n),Hl=class{constructor(e,t,i={}){this.container=e,this.assets=t,this.options=i,this.nodes=new Map,this.labels=[],this.parts=[],this.disposed=!1,this.motion=!matchMedia("(prefers-reduced-motion: reduce)").matches,this.cutaway=!1,this.targetCamera=null,this.selected=i.selectedId||null,this.lastFrame=performance.now(),this.elapsed=0;try{this.init()}catch(s){this.dispose(),e.innerHTML='<div class="scene-fallback"><strong>\u4E09\u7EF4\u6682\u4E0D\u53EF\u7528</strong><p>\u53EF\u901A\u8FC7\u4E0B\u65B9\u8BBE\u5907\u5217\u8868\u7EE7\u7EED\u67E5\u770B\u8BC1\u636E\u548C\u5904\u7406\u4EFB\u52A1\u3002</p></div>',i.onError?.(s)}}material(e,t={}){return new Wr({color:e,roughness:.7,metalness:.12,...t})}box(e,t,i,s,r,a,o,l){let c=new gn(new $i(t,i,s),l);return c.position.set(r,a,o),c.castShadow=!0,c.receiveShadow=!0,e.add(c),c}cylinder(e,t,i,s,r,a,o,l=t){let c=new gn(new Js(l,t,i,20),o);return c.position.set(s,r,a),c.castShadow=!0,c.receiveShadow=!0,e.add(c),c}rod(e,t,i,s,r){let a=new B(...t),o=new B(...i),l=o.clone().sub(a),c=new gn(new Js(s,s,l.length(),12),r);return c.position.copy(a.add(o).multiplyScalar(.5)),c.quaternion.setFromUnitVectors(new B(0,1,0),l.normalize()),c.castShadow=!0,e.add(c),c}init(){this.renderer=new Bl({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Jo,this.renderer.outputColorSpace=ln,this.renderer.toneMapping=ea,this.renderer.toneMappingExposure=1.26,this.renderer.domElement.setAttribute("aria-label","\u673A\u52A0\u5DE5\u4EA7\u7EBF\u4E09\u7EF4\u89C6\u56FE\uFF0C\u53EF\u62D6\u52A8\u65CB\u8F6C\uFF0C\u6EDA\u8F6E\u7F29\u653E\u3002\u8BBE\u5907\u5217\u8868\u63D0\u4F9B\u7B49\u4EF7\u64CD\u4F5C\u3002"),this.renderer.domElement.setAttribute("role","img"),this.container.replaceChildren(this.renderer.domElement),this.labelLayer=document.createElement("div"),this.labelLayer.className="scene-labels",this.container.append(this.labelLayer),this.scene=new Fr,this.scene.background=new tt(15659502),this.scene.fog=new Or(15659502,45,85),this.camera=new cn(39,1,.1,120),this.camera.position.set(23,21,27),this.controls=new Gl(this.camera,this.renderer.domElement),this.controls.target.set(0,.9,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.minDistance=4.5,this.controls.maxDistance=48,this.controls.maxPolarAngle=Math.PI/2.12,this.controls.minPolarAngle=.2,this.controls.addEventListener("start",()=>{this.targetCamera=null}),this.scene.add(new Yr(16777215,11253934,2.3));let e=new Zs(16775663,3.1);e.position.set(-12,26,15),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=-22,e.shadow.camera.right=22,e.shadow.camera.top=22,e.shadow.camera.bottom=-22,e.shadow.normalBias=.04,e.shadow.bias=-15e-5,this.scene.add(e);let t=new Zs(14084594,1.1);t.position.set(18,10,-12),this.scene.add(t),this.materials={white:this.material(Qn.white),dark:this.material(Qn.dark),steel:this.material(Qn.steel,{metalness:.5,roughness:.4}),orange:this.material(Qn.orange),floor:this.material(Qn.floor),glass:this.material(7441553,{transparent:!0,opacity:.62,roughness:.18,metalness:.2}),black:this.material(1911594),pale:this.material(13884629),yellow:this.material(14069333)};let i=new dn;this.scene.add(i),this.plant=i;let s=Math.max(25,Math.ceil(Bx(this.assets).length/2)*4.1+5),r=Math.max(1,s/29.6);this.homeCamera=new B(23,21,27).multiplyScalar(r),this.camera.position.copy(this.homeCamera),this.scene.fog.near=45*r,this.scene.fog.far=85*r,this.controls.maxDistance=Math.max(48,this.homeCamera.length()*1.2),this.camera.far=Math.max(120,this.homeCamera.length()*3),this.camera.updateProjectionMatrix(),this.box(i,s,.22,17.2,0,-.15,0,this.materials.floor),this.box(i,s+.5,.26,17.7,0,-.4,0,this.material(12964042)),this.box(i,s-.6,.025,2.2,0,0,0,this.material(12964555)),this.box(i,s-.8,.018,.055,0,.025,1.22,this.materials.white),this.box(i,s-.8,.018,.055,0,.025,-1.22,this.materials.white);for(let o=-7.5;o<=7.5;o+=1.5)this.box(i,s-.2,.008,.016,0,-.027,o,this.material(13226699));let a=Math.ceil(this.assets.length/2);this.assets.forEach((o,l)=>{let c=l<a?0:1,m=(l%a-(a-1)/2)*4.1,h=c===0?-4.15:4.15,d=new dn;d.position.set(m,0,h),d.userData.assetId=o.id,c===0&&(d.rotation.y=Math.PI),this.scene.add(d);let _=/robot|机器人/i.test(o.type)?this.robot(d,o):/lathe|车床/i.test(o.type)?this.lathe(d,o):this.machine(d,o),x=this.selectionMark(d,4028504),g=this.selectionMark(d,Qn.orange,1.08);g.visible=!!(o.has_open_case||o.open_case_count||this.options.alertAssetIds?.includes(o.id));let p=this.material(this.statusColor(o.status),{emissive:this.statusColor(o.status),emissiveIntensity:.15});this.cylinder(d,.075,.34,1.1,2.68,.4,this.materials.dark);let M=this.cylinder(d,.105,.17,1.1,2.94,.4,p);this.nodes.set(o.id,{group:d,asset:o,body:_,mark:x,caseMark:g,lamp:M,doors:_?.doors||[]}),this.addLabel(o,new B(m,3.15,h))}),this.addEnvironment(s),this.raycaster=new jr,this.pointer=new He,this.pointerDown=o=>{this.pointerOrigin=[o.clientX,o.clientY]},this.pointerUp=o=>{if(!this.pointerOrigin||Math.hypot(o.clientX-this.pointerOrigin[0],o.clientY-this.pointerOrigin[1])>6)return;let l=this.renderer.domElement.getBoundingClientRect();this.pointer.set((o.clientX-l.left)/l.width*2-1,-(o.clientY-l.top)/l.height*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);for(let c of this.raycaster.intersectObjects(this.scene.children,!0)){let u=c.object;for(;u&&!u.userData.assetId;)u=u.parent;if(u?.userData.assetId){this.select(u.userData.assetId),this.options.onSelect?.(u.userData.assetId);break}}},this.renderer.domElement.addEventListener("pointerdown",this.pointerDown),this.renderer.domElement.addEventListener("pointerup",this.pointerUp),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.select(this.selected),this.options.focused&&this.selected&&this.focus(this.selected,!0),this.tick()}statusColor(e){return op(e)?Qn.green:kx(e)?Qn.orange:Qn.unknown}machine(e,t){let i=this.materials;this.box(e,2.65,.34,2.65,0,.2,0,i.dark),this.box(e,2.7,.48,2.45,0,.61,0,i.white),this.box(e,.34,1.48,2.4,-1.18,1.57,0,i.white),this.box(e,.34,1.48,2.4,1.18,1.57,0,i.white),this.box(e,2.7,.27,2.45,0,2.4,0,i.white),this.box(e,2.05,1.45,.14,0,1.6,1.14,i.pale),this.box(e,1.75,.17,1.75,0,1.02,0,i.steel);for(let o=-3;o<=3;o++)this.box(e,1.7,.012,.035,0,1.11,o*.21,i.dark);this.cylinder(e,.34,.3,0,1.25,0,i.steel);let s=new dn;s.position.set(0,2.12,0),e.add(s),this.box(s,.58,.55,.55,0,0,0,i.dark),this.cylinder(s,.13,.5,0,-.48,0,i.steel,.19),this.parts.push({type:"spindle",mesh:s,asset:t,base:2.12});let r=this.box(e,1.92,1.35,.07,-.12,1.64,-1.22,i.glass);this.box(e,.055,1.48,.09,-.12,1.6,-1.27,i.steel);let a=this.box(e,.055,.42,.07,.05,1.61,-1.34,i.dark);this.box(e,.34,.87,.32,1.5,1.63,-.9,i.white),this.box(e,.29,.39,.03,1.5,1.8,-1.08,i.black),this.box(e,.22,.19,.035,1.5,1.81,-1.1,this.material(7969939,{emissive:5667440,emissiveIntensity:.25}));for(let o=0;o<3;o++)this.box(e,.04,.04,.025,1.4+o*.08,1.48,-1.08,o===2?i.orange:i.dark);this.box(e,.82,.03,.65,.65,2.55,.44,i.dark);for(let o=0;o<6;o++)this.box(e,.78,.028,.035,.65,2.57,.18+o*.1,i.steel);return this.box(e,.52,.07,.07,-.82,2.1,-1.28,i.orange),{doors:[r,a]}}lathe(e,t){let i=this.materials;this.box(e,3,.5,2.2,0,.3,0,i.dark),this.box(e,3,.58,2.2,0,.84,0,i.white),this.box(e,.8,1.15,2.1,-1.08,1.7,0,i.white),this.box(e,.75,1.15,2.1,1.1,1.7,0,i.white),this.box(e,3,.22,2.2,0,2.38,0,i.white),this.box(e,1.6,1.1,.12,0,1.71,1,i.pale);let s=this.cylinder(e,.34,.5,-.53,1.7,0,i.steel);s.rotation.z=Math.PI/2;let r=this.cylinder(e,.12,.9,.12,1.7,0,i.steel);r.rotation.z=Math.PI/2,this.parts.push({type:"chuck",mesh:s,asset:t});let a=this.box(e,1.52,1.03,.07,0,1.76,-1.07,i.glass);return this.box(e,.38,.75,.2,1.4,1.7,-1.1,i.white),this.box(e,.25,.3,.03,1.4,1.85,-1.22,i.black),{doors:[a]}}robot(e,t){let i=this.materials;this.box(e,2.6,.15,2.6,0,.09,0,i.pale),this.cylinder(e,.56,.3,0,.3,0,i.dark);let s=new dn;s.position.set(0,.48,0),e.add(s),this.cylinder(s,.33,.65,0,.3,0,i.orange),this.rod(s,[0,.55,0],[.65,1.55,0],.2,i.orange),this.cylinder(s,.25,.4,.65,1.55,0,i.dark).rotation.x=Math.PI/2,this.rod(s,[.65,1.55,0],[1.35,1.05,-.1],.16,i.orange),this.box(s,.25,.4,.25,1.35,.82,-.1,i.steel),this.box(s,.06,.25,.3,1.23,.56,-.1,i.dark),this.box(s,.06,.25,.3,1.47,.56,-.1,i.dark),this.parts.push({type:"robot",mesh:s,asset:t});for(let r of[-1.22,1.22])for(let a of[-1.22,1.22])this.box(e,.05,1.3,.05,r,.7,a,i.yellow);for(let r of[-1.22,1.22])this.box(e,2.5,.05,.05,0,1.33,r,i.yellow);return{doors:[]}}addEnvironment(e){let t=this.materials,i=new dn;i.position.set(0,.07,0),this.scene.add(i),this.box(i,e-4,.16,.82,0,.46,0,t.dark),this.box(i,e-4,.12,.07,0,.61,.48,t.steel),this.box(i,e-4,.12,.07,0,.61,-.48,t.steel);for(let a=-e/2+2.5;a<e/2-2;a+=.5){let o=this.cylinder(i,.07,.83,a,.59,0,t.steel);o.rotation.x=Math.PI/2}for(let a=-e/2+3;a<e/2-2;a+=4)this.box(i,.07,.47,.07,a,.23,.33,t.steel),this.box(i,.07,.47,.07,a,.23,-.33,t.steel),this.box(i,.42,.24,.42,a,.79,0,t.pale);let s=new dn;s.position.set(e/2-1.2,0,4.5),this.scene.add(s);for(let a of[-.6,.6])for(let o of[-1,1])this.box(s,.07,2.2,.07,a,1.1,o,t.dark);for(let a=.3;a<2;a+=.7){this.box(s,1.35,.09,2.1,0,a,0,t.orange);for(let o=-.65;o<=.65;o+=.65)this.box(s,.9,.42,.5,0,a+.26,o,t.pale)}let r=new dn;r.position.set(-e/2+1.4,0,-4),this.scene.add(r),this.robot(r,{status:"unknown"})}selectionMark(e,t=Qn.orange,i=1){let s=[[-1.7,.035,-1.6],[1.7,.035,-1.6],[1.7,.035,1.6],[-1.7,.035,1.6],[-1.7,.035,-1.6]].map(a=>new B(...a)),r=new zr(new Cn().setFromPoints(s),new Ys({color:t}));return r.scale.set(i,1,i),e.add(r),r.visible=!1,r}addLabel(e,t){let i=document.createElement("button");i.type="button",i.className="asset-label",i.textContent=e.code||e.id,i.setAttribute("aria-label",`\u9009\u62E9 ${e.name}\uFF0C${e.code||e.id}`),i.title=`${e.name} \xB7 ${e.source==="equipment_management_system"?"\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF \xB7 \u6BCF\u65E5\u540C\u6B65":e.source==="iot_node_red"?"Node-RED \u865A\u62DF\u8BBE\u5907\u65E5\u5FEB\u7167 \xB7 \u975E\u5B9E\u65F6":e.source==="factory_simulator"?"\u6A21\u62DF\u91C7\u96C6 \xB7 \u975E\u73B0\u573A":e.synthetic?"\u5408\u6210\u8BBE\u5907\u8BB0\u5F55":"\u8BBE\u5907\u6570\u636E\u6765\u6E90\u4EE5\u5DE5\u4F5C\u53F0\u4E3A\u51C6"}`,i.addEventListener("click",()=>{this.select(e.id),this.options.onSelect?.(e.id)}),this.labelLayer.append(i),this.labels.push({button:i,position:t,id:e.id})}resize(){if(!this.renderer||this.disposed)return;let e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1);this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}select(e){this.selected=e,this.nodes.forEach((t,i)=>{t.mark.visible=i===e,t.doors.forEach(s=>{s.visible=!(this.cutaway&&i===e)})}),this.labels.forEach(t=>{let i=this.nodes.get(t.id);t.button.classList.toggle("selected",t.id===e),t.button.classList.toggle("has-alert",!!(i?.asset.has_open_case||i?.asset.open_case_count||this.options.alertAssetIds?.includes(t.id))),t.button.setAttribute("aria-pressed",String(t.id===e))})}focus(e,t=!1){let i=this.nodes.get(e);if(!i||!this.camera)return;this.select(e);let s=i.group.position.clone().add(new B(0,1.05,0)),r=i.group.position.z<0?1:-1,a=s.clone().add(new B(4.7,4.3,6.1*r));t||!this.motion?(this.camera.position.copy(a),this.controls.target.copy(s)):this.targetCamera={camera:a,target:s}}reset(){this.camera&&(this.targetCamera={camera:(this.homeCamera||new B(23,21,27)).clone(),target:new B(0,.9,0)},this.motion||(this.camera.position.copy(this.targetCamera.camera),this.controls.target.copy(this.targetCamera.target),this.targetCamera=null))}setMotion(e){this.motion=e}setCutaway(e){this.cutaway=e,this.select(this.selected)}setLowQuality(e){this.renderer&&(this.renderer.shadowMap.enabled=!e,this.renderer.setPixelRatio(e?1:Math.min(devicePixelRatio||1,1.75)))}updateAssets(e,t=[]){if(this.disposed)return;this.assets=e,this.options.alertAssetIds=t;let i=new Map(e.map(s=>[s.id,s]));this.nodes.forEach((s,r)=>{let a=i.get(r);if(!a)return;s.asset=a;let o=this.statusColor(a.status);s.lamp.material.color.set(o),s.lamp.material.emissive.set(o),s.caseMark.visible=!!(a.has_open_case||a.open_case_count||t.includes(r))}),this.parts.forEach(s=>{i.has(s.asset.id)&&(s.asset=i.get(s.asset.id))}),this.labels.forEach(s=>{let r=i.get(s.id);r&&(s.button.title=`${r.name} \xB7 ${r.source==="equipment_management_system"?"\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF \xB7 \u6BCF\u65E5\u540C\u6B65":r.source==="iot_node_red"?r.connection_status==="iot_stale"?"IoT \u5386\u53F2\u65E5\u5FEB\u7167 \xB7 \u8FDE\u63A5\u6216\u6570\u636E\u5DF2\u8FC7\u671F":"Node-RED \u865A\u62DF\u8BBE\u5907\u65E5\u5FEB\u7167 \xB7 \u975E\u5B9E\u65F6":r.source==="factory_simulator"?r.connection_status==="simulation_paused"?"\u6A21\u62DF\u5DF2\u6682\u505C \xB7 \u975E\u73B0\u573A":"\u6A21\u62DF\u91C7\u96C6 \xB7 \u975E\u73B0\u573A":r.synthetic?"\u5408\u6210\u8BBE\u5907\u8BB0\u5F55":"\u8BBE\u5907\u6570\u636E\u6765\u6E90\u4EE5\u5DE5\u4F5C\u53F0\u4E3A\u51C6"}`)}),this.select(this.selected)}tick(){if(this.disposed||!this.renderer)return;this.frame=requestAnimationFrame(()=>this.tick());let e=performance.now(),t=Math.min((e-this.lastFrame)/1e3,.08);if(this.lastFrame=e,this.elapsed+=t,this.targetCamera){let r=1-Math.exp(-t*5.5);this.camera.position.lerp(this.targetCamera.camera,r),this.controls.target.lerp(this.targetCamera.target,r),this.camera.position.distanceTo(this.targetCamera.camera)<.015&&(this.targetCamera=null)}this.motion&&this.parts.forEach(r=>{["iot_node_red","equipment_management_system"].includes(r.asset.source)||op(r.asset.status)&&(r.type==="spindle"&&(r.mesh.position.y=r.base+Math.sin(this.elapsed*1.2)*.12),r.type==="chuck"&&(r.mesh.rotation.y+=t*1.6),r.type==="robot"&&(r.mesh.rotation.y=Math.sin(this.elapsed*.45)*.4))}),this.controls.update();let i=this.container.clientWidth,s=this.container.clientHeight;this.labels.forEach(r=>{let a=r.position.clone().project(this.camera),o=i<Math.ceil(this.assets.length/2)*70,l=r.id===this.selected||this.options.alertAssetIds?.includes(r.id),c=this.camera.position.distanceTo(r.position)<14,u=a.z<1&&a.z>-1&&Math.abs(a.x)<.98&&Math.abs(a.y)<.96&&(!o||l||c);r.button.hidden=!u,u&&(r.button.style.transform=`translate(${(a.x*.5+.5)*i}px,${(-a.y*.5+.5)*s}px) translate(-50%,-50%)`)}),this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver?.disconnect(),this.controls?.dispose(),this.renderer&&(this.renderer.domElement.removeEventListener("pointerdown",this.pointerDown),this.renderer.domElement.removeEventListener("pointerup",this.pointerUp),this.scene?.traverse(e=>{e.geometry?.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(t=>t.dispose())}),this.renderer.dispose())}};function Bx(n){return Array.isArray(n)?n:[]}var Ji=n=>n==null?"":String(n).trim();function ei(n){return Ji(n?.case_id)||Ji(n?.input?.case_id)||null}function ha(n,{caseId:e,role:t}={}){let i=Ji(e),s=Ji(t);if(!n||!i||!s)return!1;let r=Ji(n.case_id),a=Ji(n.input?.case_id),o=Ji(n.role),l=Ji(n.input?.role);return r&&a&&r!==a||o&&l&&o!==l?!1:(r||a)===i&&(o||l)===s}var zx=new Set(["efficiency_advisor","maintenance_advisor","maintenance_coordinator"]),$x=new Map([["\u7B49\u5F85\u6A21\u578B\u6267\u884C","\u5DF2\u6536\u5230\uFF0C\u6B63\u5728\u51C6\u5907\u5904\u7406\u3002"],["\u4EFB\u52A1\u5DF2\u6536\u5230\uFF0C\u7B49\u5F85\u6267\u884C","\u5DF2\u6536\u5230\uFF0C\u6B63\u5728\u51C6\u5907\u5904\u7406\u3002"],["\u6536\u5230\uFF0C\u6211\u6765\u529E\u7406","\u6536\u5230\uFF0C\u6211\u6765\u529E\u7406\u3002"],["\u987E\u95EE\u6B63\u5728\u8BFB\u53D6\u8BC1\u636E\u4E0E\u6307\u6807","\u6B63\u5728\u6838\u5BF9\u8BBE\u5907\u6570\u636E\u548C\u5DF2\u6709\u8BB0\u5F55\u3002"],["\u5458\u5DE5\u6B63\u5728\u8BFB\u53D6\u6279\u51C6\u8BB0\u5F55\uFF0C\u51C6\u5907\u8C03\u7528\u5DE5\u5355\u5DE5\u5177","\u6B63\u5728\u6309\u4F60\u786E\u8BA4\u7684\u65B9\u6848\u529E\u7406\u5DE5\u5355\u3002"],["\u5DE5\u5355\u5DF2\u6301\u4E45\u5316\uFF0C\u7B49\u5F85\u5458\u5DE5\u56DE\u8BFB\u786E\u8BA4","\u5DE5\u5355\u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u6838\u5BF9\u5185\u5BB9\u3002"]]),Zd=n=>JSON.stringify([n.case_id||"",n.author,n.turn_id||""]),lp=(n,e)=>JSON.stringify([n.case_id||"",n.author,"job",e]),Vx=n=>!zx.has(n.author)||!["received","progress"].includes(n.kind)||(n.artifacts||[]).some(e=>e.type!=="work_order")?null:$x.get(String(n.text||n.content||"").trim().replace(/[。.!！]+$/u,""))||null;function cp(n=[]){let e=new Map;for(let r of n)if(r.job_id&&r.turn_id){let a=Zd(r),o=e.get(a)||new Set;o.add(r.job_id),e.set(a,o)}let t=r=>{if(r.job_id)return lp(r,r.job_id);if(!r.turn_id)return null;let a=e.get(Zd(r));return a?.size===1?lp(r,[...a][0]):Zd(r)},i=new Set,s=new Map;return n.forEach((r,a)=>{let o=t(r);o&&(["delivery","result"].includes(r.kind)&&i.add(o),["received","progress"].includes(r.kind)&&s.set(o,a))}),n.flatMap((r,a)=>{let o=t(r),l=Vx(r);return!o||!l?[r]:i.has(o)||s.get(o)!==a?[]:[{...r,text:l}]})}var Xe=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Vt=n=>Array.isArray(n)?n:[],dt=n=>typeof n=="string"?n:"",fa=n=>String(n||"").toLowerCase(),Gx={folder:'<path d="M3 18V6a2 2 0 0 1 2-2h5l2 3h6a2 2 0 0 1 2 2v1"/><path d="M4 19h14a2 2 0 0 0 2-1.5l2-7.5H7a2 2 0 0 0-2 1.5L3 18a1 1 0 0 0 1 1Z"/>',plus:'<path d="M12 4v16M4 12h16"/>',chart:'<path d="M4 3v17h17M8 16v-4m5 4V7m5 9v-6"/>',clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1" fill="white"/><path d="M9 11h6m-6 4h6"/>',bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4Z"/>',inspect:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-14 4h5m-5 3h3"/>',send:'<path d="M12 20V4m-7 7 7-7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 4a3 3 0 0 1 0 6m1 5a5 5 0 0 1 3 4v2"/>',check:'<path d="m5 12 4 4L19 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h6"/>',alert:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v4m0 4h.01"/>',chat:'<path d="M21 11a8 8 0 0 1-8 8H6l-4 3V9a7 7 0 0 1 7-7h4a8 8 0 0 1 8 9Z"/><path d="M7 10h10m-10 4h6"/>'},Zi=(n,e=18)=>`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Gx[n]||""}</svg>`,Wl=[{id:"efficiency_advisor",name:oi.efficiency_advisor,description:"\u770B\u505C\u673A\u635F\u5931\uFF0C\u627E\u4F18\u5148\u5904\u7406\u7684\u95EE\u9898\u3002"},{id:"maintenance_advisor",name:oi.maintenance_advisor,description:"\u67E5\u53EF\u80FD\u539F\u56E0\uFF0C\u7ED9\u73B0\u573A\u68C0\u67E5\u5EFA\u8BAE\u3002"},{id:"maintenance_coordinator",name:oi.maintenance_coordinator,description:"\u6574\u7406\u65B9\u6848\uFF0C\u83B7\u6279\u540E\u5EFA\u5355\u5E76\u8DDF\u8FDB\u3002"}],ql=oi,Hx=new Set(Wl.map(n=>n.id));function ar(n){if(!n)return"";let e=new Date(n);return Number.isFinite(e.getTime())?e.toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}):""}function pp(n){return Vt(n).map((e,t)=>({turn:e,index:t,time:Date.parse(e.created_at)})).sort((e,t)=>Number.isFinite(e.time)&&Number.isFinite(t.time)&&e.time-t.time||e.index-t.index).map(e=>e.turn)}function Wx({turns:n=[],activeTurns:e=[],jobs:t=[],caseId:i=""}={}){let s=String(i||""),r=h=>String(h.case_id||"")===s,o=pp(n).filter(r).map(h=>({kind:"manager",id:`turn:${h.id}`,caseId:s,role:"manager",createdAt:h.created_at,turn:h}));if(!s)return o;let l=new Map,c=new Map,u=[];for(let h of[...Vt(n),...Vt(e)].filter(r)){h.proposal_analysis_id&&c.set(h.proposal_analysis_id,h.id);for(let d of Vt(h.child_job_ids))typeof d=="string"&&l.set(d,h.id);for(let d of Vt(h.child_jobs))d&&typeof d=="object"&&d.id&&(l.set(d.id,h.id),u.push(d))}let m=new Map;for(let h of[...u,...Vt(t)]){let d=String(h?.role||h?.input?.role||"");if(!h?.id||!Hx.has(d)||!ha(h,{caseId:s,role:d}))continue;let _=m.get(h.id),x=Date.parse(h.updated_at||h.finished_at||h.created_at),g=Date.parse(_?.updated_at||_?.finished_at||_?.created_at);(!_||!Number.isFinite(g)||!Number.isFinite(x)||x>=g)&&m.set(h.id,{..._,...h})}for(let h of m.values()){let d=h.analysis_id||h.result?.analysis_id||Xl(h)?.analysis_id,_=!l.has(h.id)&&c.has(d),x=l.get(h.id)||h.input?.manager_turn_id||h.input?.turn_id||c.get(d)||null;o.push({kind:"job",id:`job:${h.id}`,caseId:ei(h),role:h.role||h.input.role,createdAt:h.created_at,managed:!!x,reused:_,parentTurnId:x,job:h})}return o.map((h,d)=>({entry:h,index:d,time:Date.parse(h.createdAt)})).sort((h,d)=>Number.isFinite(h.time)&&Number.isFinite(d.time)&&h.time-d.time||h.index-d.index).map(h=>h.entry)}function qx(n=[],e="manager"){return Vt(n).filter(t=>e==="manager"?t.kind==="manager"||t.kind==="job"&&t.managed:t.kind==="job"&&t.role===e)}function Xl(n){let e=n?.result?.analysis||n?.result||n?.output||null;if(typeof e=="string")try{e=JSON.parse(e)}catch{return e}return e?.analysis||e}function mp(n){return dt(n)||dt(n?.summary)||dt(n?.conclusion)||dt(n?.answer)||dt(n?.content)||dt(n?.text)}function Xx(n){return jd(n)||dt(n?.id)||dt(n?.evidence_id)||dt(n?.source)||dt(n?.message)}function Yx(n,e){let{job:t}=n,i=Xl(t),s=mp(i),r=Vt(t.tool_receipts||i?.tool_receipts),o=[["\u4F9D\u636E",i?.evidence||i?.evidence_refs||i?.sources],["\u53EF\u80FD\u539F\u56E0",i?.hypotheses||i?.candidate_causes],["\u5EFA\u8BAE\u4E0B\u4E00\u6B65",i?.recommendations||i?.next_steps||i?.checks],["\u8FD8\u9700\u6838\u5B9E",i?.limitations||i?.missing_information||i?.uncertainties]].filter(([,u])=>Vt(u).length),l=dt(t.question)||dt(t.input?.question),c=`job:${t.id}:evidence`;return`<details class="team-job-evidence" data-manager-expand="${Xe(c)}" ${e[c]?"open":""}><summary>\u67E5\u770B\u4F9D\u636E\u4E0E\u529E\u7406\u56DE\u6267</summary>${n.managed&&l?`<section><h4>${n.reused?"\u539F\u63D0\u95EE":"\u603B\u7BA1\u4EA4\u529E\u7684\u5185\u5BB9"}</h4><p>${Xe(l)}</p></section>`:""}${s.length>360?`<section><h4>\u5B8C\u6574\u7ED3\u8BBA</h4><p>${Xe(s)}</p></section>`:""}${o.map(([u,m])=>`<section><h4>${u}</h4><ul>${m.map(h=>`<li>${Xe(Xx(h))}${h&&typeof h=="object"&&(h.reason||h.reasoning||h.explanation)?`<p>${Xe(h.reason||h.reasoning||h.explanation)}</p>`:""}</li>`).join("")}</ul></section>`).join("")}${r.length?`<section><h4>\u529E\u7406\u56DE\u6267</h4><ul>${r.map(u=>{let m={create_work_order:"\u521B\u5EFA\u7EF4\u4FEE\u5DE5\u5355",get_work_order:"\u8BFB\u53D6\u7EF4\u4FEE\u5DE5\u5355",read_work_order:"\u8BFB\u53D6\u7EF4\u4FEE\u5DE5\u5355"}[u.tool||u.name]||"\u4E1A\u52A1\u529E\u7406",h=u.entity_id||u.work_order_id||u.result?.work_order?.id||u.result?.id;return`<li><strong>${m}</strong> \xB7 ${u.error||u.isError?"\u672C\u6B21\u672A\u5B8C\u6210":"\u5DF2\u8FD4\u56DE\u8BB0\u5F55"}${h?` \xB7 ${Xe(h)}`:""}${u.summary||u.message?`<p>${Xe(u.summary||u.message)}</p>`:""}</li>`}).join("")}</ul></section>`:""}${!o.length&&!r.length&&s.length<=360?"<p>\u8FD9\u6B21\u8BB0\u5F55\u6CA1\u6709\u63D0\u4F9B\u66F4\u591A\u4F9D\u636E\u6216\u529E\u7406\u56DE\u6267\u3002</p>":""}<small>\u8BB0\u5F55\u7F16\u53F7\uFF1A${Xe(t.id)}${t.analysis_id?` \xB7 ${Xe(t.analysis_id)}`:""}</small></details>`}function gp(n){let e=Xl(n),t=mp(e),i=fa(n.status||n.state),s="\u8FD9\u6B21\u5C1A\u672A\u8FD4\u56DE\u7B54\u590D\u5185\u5BB9\u3002";t?s=t.length>360?t.slice(0,360)+"\u2026":t:["queued","running","running_job"].includes(i)?s="\u6B63\u5728\u5904\u7406\uFF0C\u56DE\u590D\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\u3002":i==="waiting_human"?s="\u6B63\u5728\u7B49\u73B0\u573A\u4EBA\u5458\u5904\u7406\u3002":e&&(s="\u7ED3\u679C\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u67E5\u770B\u8BE6\u7EC6\u8BB0\u5F55\u3002");let r=n.error?dt(n.error)||dt(n.error.message)||"\u8FD9\u6B21\u6CA1\u6709\u529E\u5B8C\uFF0C\u8BF7\u6838\u5BF9\u8BB0\u5F55\u540E\u91CD\u8BD5\u3002":"";return{body:s,error:r}}function dp(n,e,t){if(n.kind==="manager")return Jx([n.turn]);let{job:i,role:s,managed:r}=n,a=ql[s],o=Xl(i),l=fa(i.status||i.state),u={queued:"\u7B49\u5F85\u5904\u7406",running:"\u6B63\u5728\u5904\u7406",running_job:"\u6B63\u5728\u5904\u7406",succeeded:"\u5DF2\u8FD4\u56DE\u7ED3\u679C",success:"\u5DF2\u8FD4\u56DE\u7ED3\u679C",completed:"\u5DF2\u8FD4\u56DE\u7ED3\u679C",waiting_human:"\u7B49\u5F85\u73B0\u573A\u5904\u7406",waiting_input:"\u7B49\u5F85\u8865\u5145",failed:"\u672C\u6B21\u672A\u5B8C\u6210",cancelled:"\u5DF2\u505C\u6B62",timed_out:"\u672C\u6B21\u8D85\u65F6",timeout:"\u672C\u6B21\u8D85\u65F6"}[l]||"\u8FDB\u5EA6\u5F85\u6838\u5B9E",m=e.expanded||{},h=e.renderDirectJob||t.renderDirectJob,d=!r&&i.id===e.selectedJobId,_=d&&typeof h=="function"?h(i):"",{body:x,error:g}=gp(i);return`<article class="team-job${d?" selected":""}" data-team-job="${Xe(i.id)}"><div class="team-job-heading">${is(s,a)}<strong>${a}</strong><span class="team-job-status ${["failed","timeout","timed_out"].includes(l)?"failed":""}">${u}</span><small>${r?n.reused?"\u603B\u7BA1\u91C7\u7528":"\u603B\u7BA1\u5B89\u6392":"\u529E\u7406\u8BB0\u5F55"}</small>${ar(i.created_at)?`<time>${ar(i.created_at)}</time>`:""}</div>${_?`<div class="team-job-expanded">${_}</div>`:`<p class="manager-message-text">${Xe(x)}</p>${g?`<p class="team-job-error">${Xe(g)}</p>`:""}${Yx(n,m)}${!r&&typeof h=="function"?`<button type="button" class="text-button" data-chat-open-job="${Xe(i.id)}">${o?.proposal||o?.work_order_proposal||i.proposal?"\u67E5\u770B\u65B9\u6848\u4E0E\u529E\u7406":"\u67E5\u770B\u8BE6\u7EC6\u56DE\u590D"}${Zi("arrow",15)}</button>`:""}`}</article>`}function Jx(n){return n.length?n.map(e=>`<div class="manager-turn" data-manager-turn="${Xe(e.id)}">${dt(e.message)?`<article class="manager-message from-user"><div class="manager-message-by">${is("user")}<strong>\u4F60</strong>${ar(e.created_at)?`<time>${ar(e.created_at)}</time>`:""}</div><div class="manager-message-text">${Xe(e.message)}</div></article>`:""}${dt(e.reply)?`<article class="manager-message from-manager"><div class="manager-message-by">${is("manager")}<strong>\u5DE5\u5382\u603B\u7BA1</strong>${ar(e.updated_at||e.created_at)?`<time>${ar(e.updated_at||e.created_at)}</time>`:""}</div><div class="manager-message-text">${Xe(e.reply)}</div></article>`:""}${!e.reply&&["queued","thinking","running"].includes(fa(e.status))?'<p class="manager-thinking" role="status"><span class="spinner"></span>\u603B\u7BA1\u6B63\u5728\u770B\u8FD9\u4EF6\u4E8B\u2026</p>':""}${e.error?`<div class="manager-message-error"><strong>\u8FD9\u6B21\u6CA1\u6709\u529E\u5B8C</strong><p>${Xe(jd(e.error)||dt(e.error.message)||"\u8BF7\u67E5\u770B\u5F53\u524D\u8FDB\u5EA6\uFF0C\u5904\u7406\u540E\u518D\u7EE7\u7EED\u3002")}</p></div>`:""}</div>`).join(""):`<div class="manager-welcome"><span class="manager-welcome-icon">${Zi("chat",25)}</span><h3>\u8BBE\u5907\u6709\u95EE\u9898\uFF0C\u5148\u544A\u8BC9\u603B\u7BA1</h3><p>\u8BF4\u6E05\u662F\u54EA\u53F0\u8BBE\u5907\u3001\u9047\u5230\u4E86\u4EC0\u4E48\u95EE\u9898\u3002\u603B\u7BA1\u4F1A\u5B89\u6392\u540C\u4E8B\u5206\u6790\uFF0C\u8DDF\u8FDB\u5904\u7406\uFF0C\u6709\u9700\u8981\u4F60\u51B3\u5B9A\u7684\u4E8B\u518D\u8BF7\u4F60\u786E\u8BA4\u3002</p></div>`}function up(n,{busy:e,connected:t}){return n?.case_id||fa(n?.status)!=="blocked"||!n.id?"":`<div class="manager-run-status" role="status"><span>\u8FD9\u6761\u56DE\u590D\u4E2D\u65AD\u4E86</span> <button class="text-button" type="button" data-manager-resume="${Xe(n.id)}" ${e||!t?"disabled":""}>\u7EE7\u7EED\u56DE\u7B54</button></div>`}function hp(n,e){if(n?.status!=="awaiting_facts"||!n.field_question||!n.case_id)return"";let t=e.busy||e.sendingChat||!e.connected?"disabled":"",i=Vt(n.field_question.choices).filter(s=>dt(s?.label)&&dt(s.text));return`<div class="field-feedback-actions" aria-label="\u73B0\u573A\u60C5\u51B5\u53CD\u9988" data-field-question="${Xe(n.field_question.id)}">${i.map(s=>`<button type="button" class="text-button" data-field-turn="${Xe(n.id)}" data-field-text="${Xe(s.text)}" ${t}>${Xe(s.label)}</button>`).join("")}<button type="button" class="text-button" data-field-turn="${Xe(n.id)}" ${t}>\u8865\u5145\u73B0\u573A\u60C5\u51B5</button></div>`}var ti=n=>Date.parse(n?.at||n?.created_at)||0,fp=n=>["ack","received"].includes(n.kind)?0:["result","delivery"].includes(n.kind)?2:1;function Zx(n,e,t){let i=qx(e,t),s=cp(Cc(n.persistedMessages,{role:t,global:!0})),r=Cc(n.persistedMessages,{role:t,global:!0,includeCollaboration:!0}).filter(Ac),a=t==="manager"?Vu(n.conversationActions):[],o=new Set(s.flatMap(y=>Vt(y.artifacts).filter(I=>I.type==="conversation_action").map(I=>I.id))),l=a.filter(y=>!o.has(y.id)),c=Vt(n.outgoingMessages).filter(y=>y.author==="user"&&y.recipient===t),u=new Map,m=[],h=y=>t==="manager"&&y.turn_id?"turn:"+y.turn_id:y.job_id?"job:"+y.job_id:"",d=y=>h(y)||"outgoing:"+y.id,_=new Map;for(let y of c)for(let I of[y.message_id,y.received_id,y.delivery_id,y.replyMessage?.id])I&&_.set(I,d(y));let x=(y,I)=>{if(y&&u.has(y))return u.get(y);let A={time:I,rows:[],key:y};return m.push(A),y&&u.set(y,A),A},g=y=>y.author==="user"&&y.kind==="request";for(let y of s){let I=x(h(y)||_.get(y.id),ti(y));g(y)&&!I.question?(I.question=y,I.time=ti(y)):I.rows.push(y)}let p=0;for(let y of c){let I=x(d(y),ti(y));y.fact_turn_id?s.some(A=>A.id===y.message_id)||(I.fieldReplies||=[]).push(y):I.question||(I.question=y,I.time=ti(y),!h(y)&&!I.rows.length&&["sending","checking"].includes(y.deliveryState)&&(I.tailOrder=++p)),y.replyMessage?.id&&!s.some(A=>A.id===y.replyMessage.id)&&I.rows.push(y.replyMessage)}let M=ti(s.at(-1));for(let y of i){let I=y.kind==="manager",A=I?y.turn:y.job,L=Date.parse(y.createdAt)||0,N=u.get(y.id),q=!I&&t!=="manager"&&(A.chat_origin==="direct"||!!A.input?.explicit_request);if(!s.length&&!N&&(I||y.managed&&!q)){let H=x(y.id,L);H.entry=y;continue}let P=I&&(A.status==="awaiting_facts"||!A.case_id&&A.status==="blocked");if(s.length&&!N&&!q&&!P&&!(L>0&&L>=M)||!I&&!q&&y.managed)continue;let O=I?dt(A.message):dt(A.question)||dt(A.input?.question);if(!O&&!N&&s.length)continue;let X=N||x(y.id,L);if(!X.question&&O&&(X.question={id:y.id+"-request",author:"user",recipient:t,kind:"request",text:O,case_id:y.caseId,created_at:y.createdAt},X.time=L||X.time),I){X.turn=A;let H=A.status==="awaiting_facts"||X.fieldReplies?.length||Vt(A.field_facts).length;A.reply&&(!X.rows.length||A.status==="answered"&&!X.rows.some(te=>te.author==="manager"&&["result","delivery"].includes(te.kind))||H&&!X.rows.some(te=>te.author==="manager"&&te.text===A.reply))&&X.rows.push({id:y.id+"-reply",author:"manager",recipient:"user",kind:A.status==="answered"?"delivery":"progress",text:A.reply,created_at:A.updated_at||y.createdAt,case_id:A.case_id,artifacts:A.artifacts})}else X.rows.length||(X.extra=y)}for(let y of l)m.push({time:Date.parse(y.started_at||y.created_at||y.updated_at)||0,action:y});r.length&&m.push({time:ti(r.at(-1)),collaboration:r});let E=m.sort((y,I)=>(y.tailOrder||0)-(I.tailOrder||0)||y.time-I.time),w="",R={time:0,keys:[]},C=(y,I,A,L)=>{y&&(w=y,!(I==="user"||!L||!A||A<R.time)&&(A>R.time&&(R={time:A,keys:[]}),R.keys.includes(L)||R.keys.push(L)))};function v(y){if(y.kind==="manager"){let I=y.turn,A=Date.parse(I.updated_at||I.created_at)||0;C(dt(I.message),"user"),C(dt(I.error?.message)||dt(I.reply),"manager",A,y.id+"-"+I.status)}else{let I=y.job,A=fa(I.status||I.state),{body:L,error:N}=gp(I);C(N||L,y.role,Date.parse(I.finished_at||I.updated_at||I.created_at)||0,y.id+"-"+A)}}for(let y of E){if(y.collaboration)continue;if(y.entry){v(y.entry);continue}if(y.action){C(y.action.text||y.action.title,"manager",y.time,y.action.id);continue}for(let A of y.fieldReplies||[]){let L=A.fieldPrompt;L&&!y.rows.some(N=>N.author==="manager"&&N.text===L.text)&&y.rows.push(L)}y.rows.sort((A,L)=>ti(A)-ti(L)||fp(A)-fp(L));for(let A of y.fieldReplies||[]){let L=y.turn,N=L?.status==="awaiting_facts"&&(!A.fact_question_id||L.field_question?.id===A.fact_question_id),q=A.fieldPrompt?.text||(N?L.reply:""),P=q?y.rows.findLastIndex(te=>te.author==="manager"&&te.text===q):-1,O=!N&&L?.reply&&L.reply!==q?y.rows.findIndex(te=>te.author==="manager"&&te.text===L.reply):-1,X=P>=0?P+1:O>=0?O:y.rows.length,H=Date.parse(Vt(L?.field_facts).find(te=>te.id===A.message_id)?.at);if(Number.isFinite(H)){let te=y.rows.findIndex((Z,re)=>re>P&&ti(Z)>H);te>=0&&(X=O>=0?Math.min(te,O):te)}y.rows.splice(X,0,A)}y.question&&y.rows.unshift(y.question);for(let A of y.rows)C(dt(A.text)||dt(A.content),A.author,ti(A),A.id);y.extra&&v(y.extra);let I=dt(y.turn?.error?.message);I&&y.turn.status==="blocked"&&I!==w&&C(I,"manager",Date.parse(y.turn.updated_at)||y.time,y.key+"-blocked")}return{items:E,pending:a,preview:w||"\u8FD8\u6CA1\u6709\u5BF9\u8BDD",cursor:R,foldHistory:!s.length&&!l.length&&!r.length}}function jx({projection:n,data:e,options:t,profiles:i,welcome:s,loading:r,expanded:a,messageOptions:o}){let l=n.items.map(c=>{if(c.collaboration)return`<details class="employee-collaboration" data-manager-expand="collaboration" ${a.collaboration?"open":""}><summary>\u540C\u4E8B\u4E4B\u95F4\u7684\u534F\u4F5C \xB7 ${c.collaboration.length} \u6761\u4EA4\u63A5</summary>${Ha(c.collaboration,i,o)}</details>`;if(c.action)return za(c.action,{busy:o.busy});if(c.entry)return dp(c.entry,e,t)+(c.entry.turn?up(c.entry.turn,e)+hp(c.entry.turn,e):"");let u=c.rows,m=c.turn&&["queued","thinking"].includes(c.turn.status),h=dt(c.turn?.error?.message),d=h&&c.turn.status==="blocked"&&!u.some(_=>_.text===h)?`<p class="manager-message-error">${Xe(h)}</p>`:"";return Ha(u,i,o)+(c.extra?dp(c.extra,e,t):"")+(m?'<p class="manager-thinking" role="status"><span class="spinner"></span>\u603B\u7BA1\u6B63\u5728\u770B\u8FD9\u4EF6\u4E8B\u2026</p>':"")+d+up(c.turn,e)+hp(c.turn,e)});if(!l.length)return r?'<div class="manager-loading" role="status">\u6B63\u5728\u8BFB\u53D6\u4E4B\u524D\u7684\u5BF9\u8BDD\u2026</div>':s;if(l.length>6&&n.foldHistory){let c=l.slice(0,-6);return`<details class="manager-history" data-manager-expand="history" ${a.history?"open":""}><summary>\u66F4\u65E9\u7684\u5BF9\u8BDD\uFF08${c.length} \u6761\uFF09</summary>${c.join("")}</details>${l.slice(-6).join("")}`}return l.join("")}function jd(n){return typeof n=="string"?n:Array.isArray(n)?n.map(jd).filter(Boolean).join("\uFF1B"):n&&typeof n=="object"?dt(n.description)||dt(n.action)||dt(n.step)||dt(n.title)||dt(n.text):""}function _p(n={},e={}){let t=pp(n.turns),i=Vt(n.cases),s=n.connected===!0,r=n.busy===!0,a=n.loading===!0,o=Vt(n.profiles),l=O=>o.find(X=>X.id===O),c=o.length?o.map(O=>({...O,description:O.responsibilities})):Vt(n.roles).length?n.roles:Wl,u=new Set(["efficiency_advisor","maintenance_advisor","maintenance_coordinator"]),m=c.filter(O=>u.has(O.id)&&O.available!==!1&&(!Array.isArray(n.availableRoles)||n.availableRoles.includes(O.id))),h=m.some(O=>O.id===n.targetRole)?n.targetRole:"manager",d=l(h)?.name||ql[h],_=[{id:"manager",name:l("manager")?.name||ql.manager},...m.map(O=>({...O,name:O.name||ql[O.id]}))],x=s&&!r,g=x&&!n.sendingChat,p=n.replyContext||null,M=String(n.draft??e.draft??""),E=Ua(h,p?{asset_id:p.equipment_id}:null),w=n.expanded||{},R=s?dt(n.sourceNote)||"\u8BF4\u51FA\u8BBE\u5907\u548C\u9700\u8981\u529E\u7684\u4E8B\u3002\u6D89\u53CA\u786E\u8BA4\u6216\u73B0\u573A\u8BB0\u5F55\u65F6\uFF0C\u603B\u7BA1\u4F1A\u6765\u95EE\u4F60\u3002":"AI \u540C\u4E8B\u6682\u65F6\u65E0\u6CD5\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",C=new Set(["",...i.map(O=>O.id),...t.map(O=>O.case_id||""),...Vt(n.activeTurns).map(O=>O.case_id||""),...Vt(n.jobs).map(O=>ei(O)||"")]),v=[...new Map([...C].flatMap(O=>Wx({turns:t,activeTurns:n.activeTurns,jobs:n.jobs,caseId:O})).map(O=>[O.id,O])).values()].sort((O,X)=>(Date.parse(O.createdAt)||0)-(Date.parse(X.createdAt)||0)),y=new Map(_.map(O=>[O.id,Zx(n,v,O.id)])),I=y.get(h),A=I.pending,L={cases:i,conversationActions:n.conversationActions,busy:r},N=O=>is(O,l(O)?.name),q=_.map(O=>{let{preview:X,cursor:H}=y.get(O.id),te=n.isChatUnread?.(O.id,H);return`<button type="button" class="conversation-contact${O.id===h?" is-current":""}" data-chat-target="${Xe(O.id)}" aria-pressed="${O.id===h}" ${r?"disabled":""}>${N(O.id)}<span class="conversation-contact-copy"><strong>${Xe(O.name)}</strong><span>${Xe(X)}</span></span>${te?'<span class="contact-unread" role="img" aria-label="\u6709\u672A\u8BFB\u6D88\u606F"></span>':""}</button>`}).join(""),P=`<div class="manager-welcome"><span class="manager-welcome-icon">${Zi("chat",25)}</span><h3>${h==="manager"?"\u8BBE\u5907\u6709\u95EE\u9898\uFF0C\u5148\u544A\u8BC9\u603B\u7BA1":`\u76F4\u63A5\u95EE${Xe(d)}`}</h3><p>${h==="manager"?"\u4F60\u8BF4\u9700\u6C42\uFF0C\u6211\u5B89\u6392\u540C\u4E8B\u3002\u9700\u8981\u4F60\u786E\u8BA4\u6216\u8865\u5145\u73B0\u573A\u60C5\u51B5\u65F6\uFF0C\u6211\u4F1A\u5728\u8FD9\u91CC\u627E\u4F60\u3002":Xe(Wl.find(O=>O.id===h)?.description||"\u8FD9\u4F4D\u540C\u4E8B\u7684\u56DE\u590D\u4F1A\u7559\u5728\u5F53\u524D\u5BF9\u8BDD\u4E2D\u3002")}</p></div>`;return`<section class="manager-page" aria-label="\u5DE5\u5382\u540C\u4E8B\u5BF9\u8BDD"><div class="manager-layout"><nav class="conversation-list" aria-label="\u540C\u4E8B\u4F1A\u8BDD"><div class="conversation-list-heading"><h1>AI \u540C\u4E8B</h1><button type="button" class="text-button" data-peer-invite>\uFF0B \u9080\u8BF7 AI \u540C\u4E8B</button><p>\u6709\u4E8B\u5148\u627E\u603B\u7BA1\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u95EE\u540C\u4E8B\u3002</p></div><div class="conversation-contacts">${q}</div></nav><section class="manager-conversation" aria-label="\u4E0E${Xe(d)}\u7684\u5BF9\u8BDD">
    <header class="manager-conversation-header">${N(h)}<div><h2>${Xe(d)}</h2><p>${h==="manager"?"\u4F60\u8BF4\u9700\u6C42\uFF0C\u6211\u6765\u534F\u8C03\u3002":Xe(l(h)?.title||Wl.find(O=>O.id===h)?.description||"")}</p></div><span class="manager-connection ${s?"connected":""}"><i></i>${s?"\u53EF\u4EE5\u4EA4\u8C08":"\u6682\u65F6\u65E0\u6CD5\u4EA4\u8C08"}</span>${n.employeeToolbar||""}</header>
    ${A.length?`<button type="button" class="conversation-attention" data-conversation-focus="${Xe(A[0].id)}">\u6709 ${A.length} \u4EF6\u4E8B\u9700\u8981\u4F60\u786E\u8BA4\u6216\u8865\u5145 ${Zi("arrow",15)}</button>`:""}
    <div class="manager-messages" aria-label="\u4E0E${Xe(d)}\u7684\u804A\u5929\u8BB0\u5F55">${jx({projection:I,data:n,options:e,profiles:o,welcome:P,loading:a,expanded:w,messageOptions:L})}
    ${r?'<p class="manager-thinking" role="status"><span class="spinner"></span>\u6B63\u5728\u63D0\u4EA4\u8FD9\u6B21\u64CD\u4F5C\u2026</p>':""}
    ${n.retryReceipt?'<p class="employee-notice" role="status">\u5C1A\u672A\u67E5\u5230\u4E0A\u6B21\u63D0\u4EA4\u7684\u8BB0\u5F55\u3002\u53EF\u4EE5\u7528\u539F\u5185\u5BB9\u91CD\u8BD5\uFF0C\u7CFB\u7EDF\u4F1A\u6CBF\u7528\u540C\u4E00\u8BF7\u6C42\u7F16\u53F7\u3002 <button type="button" class="text-button" data-manager-refresh>\u518D\u67E5\u4E00\u6B21</button></p>':""}
    ${n.awaitingReceipt?'<p class="employee-notice" role="status">\u6B63\u5728\u6838\u5BF9\u4E0A\u6B21\u63D0\u4EA4\u7684\u56DE\u6267\uFF0C\u6536\u5230\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002 <button type="button" class="text-button" data-manager-refresh>\u6838\u5BF9\u7ED3\u679C</button></p>':""}
    ${n.readError?`<p class="manager-run-status" role="status">${Xe(n.readError.status===0||[408,502,503,504].includes(n.readError.status)?"\u6B63\u5728\u91CD\u65B0\u8FDE\u63A5\uFF0C\u7A0D\u540E\u4F1A\u81EA\u52A8\u66F4\u65B0\u3002":n.readError.message||"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u6700\u65B0\u8BB0\u5F55\u3002")} <button type="button" class="text-button" data-manager-refresh>\u91CD\u65B0\u8BFB\u53D6</button></p>`:""}
    ${n.employeeNotice?`<p class="employee-notice" role="status">${Xe(n.employeeNotice)}</p>`:""}
    ${n.error?`<div class="manager-error" role="alert"><strong>\u6682\u65F6\u6CA1\u80FD\u66F4\u65B0</strong><p>${Xe(typeof n.error=="string"?n.error:n.error.message||"\u8BF7\u91CD\u65B0\u8BFB\u53D6\uFF0C\u786E\u8BA4\u6700\u65B0\u8FDB\u5C55\u3002")}</p><button type="button" class="button small" data-manager-refresh ${r?"disabled":""}>\u91CD\u65B0\u8BFB\u53D6</button></div>`:""}
    </div>
    <form id="manager-form" class="manager-composer" data-send-locked="${!g}">
      ${p?`<div class="conversation-reply-context"><span>\u5173\u4E8E ${Xe(p.equipment_id||"\u8FD9\u4EF6\u4E8B")}\uFF1A${Xe(p.title||"\u8865\u5145\u8BF4\u660E")}</span><button type="button" class="text-button" data-chat-clear-context aria-label="\u53D6\u6D88\u8FD9\u6761\u56DE\u590D\u7684\u4E8B\u9879\u5173\u8054">\u53D6\u6D88\u5173\u8054</button></div>`:""}
      <div class="manager-project">${Zi("folder",18)}<span>\u6211\u7684\u5DE5\u5382</span></div>
      <div class="manager-prompts" role="group" aria-label="\u5FEB\u6377\u586B\u5165\uFF0C\u70B9\u51FB\u540E\u53EF\u7F16\u8F91">
        ${E.map(O=>`<button type="button" data-manager-prompt="${Xe(O.text)}" title="\u586B\u5165\uFF1A${Xe(O.text)}" ${x?"":"disabled"}>${Zi(O.icon,17)}<span>${Xe(O.label)}</span></button>`).join("")}
      </div>
      <div class="manager-input-card">
        <label class="sr-only" for="manager-message">\u53D1\u7ED9${Xe(d)}</label>
        <textarea id="manager-message" name="message" rows="2" maxlength="3000" placeholder="${Xe(E[0].text)}" aria-describedby="manager-input-note" aria-keyshortcuts="Tab" ${x?"":"disabled"} required>${Xe(M)}</textarea>
        <div class="manager-composer-toolbar">
          <button type="button" class="manager-invite" data-peer-invite aria-haspopup="dialog" aria-label="\u9080\u8BF7 AI \u540C\u4E8B" title="\u9080\u8BF7 AI \u540C\u4E8B">${Zi("plus",18)}</button>
          <span class="manager-recipient">${N(h)}<span>${Xe(d)}</span></span>
          <button type="button" class="manager-send" data-manager-send ${!g||!M.trim()?"disabled":""} aria-label="${n.sendingChat||r?"\u6B63\u5728\u53D1\u9001":"\u53D1\u9001\u6D88\u606F"}" title="\u53D1\u9001\u6D88\u606F">${n.sendingChat||r?'<span class="spinner" aria-hidden="true"></span>':Zi("send",20)}</button>
        </div>
        <span id="manager-input-note" class="sr-only">${Xe(R)}</span>
      </div>
    </form>
  </section></div>${n.employeePanel||""}</section>`}var Qd=n=>Number.isSafeInteger(n?.time)&&n.time>=0&&Array.isArray(n.keys);function Kd(n,e){if(!Qd(n)||e.time>n.time)return e;if(e.time<n.time)return n;let t=[...new Set([...n.keys,...e.keys])];return t.length===n.keys.length?n:{time:n.time,keys:t}}function yp(){let n="factory.chat-read.v1.";return{load(){let e={};for(let t of["manager","efficiency_advisor","maintenance_advisor","maintenance_coordinator"]){let i=JSON.parse(globalThis.localStorage.getItem(n+t));Qd(i)&&(e[t]=i)}return e},mark(e,t){let i=JSON.parse(globalThis.localStorage.getItem(n+e)),s=Kd(i,t);return globalThis.localStorage.setItem(n+e,JSON.stringify(s)),s}}}function vp(n){let e=new Map,t=new Set,i=new Set,s=!1,r;function a(l,c){Qd(c)&&e.set(l,Kd(e.get(l),c))}async function o(l){if(!(i.has(l)||!t.has(l))){i.add(l);try{for(;t.delete(l);)a(l,await n.mark(l,e.get(l)))}catch{t.add(l)}finally{i.delete(l)}}}return{refresh(){return r||(r=Promise.resolve().then(()=>n.load()).then(l=>{for(let[c,u]of Object.entries(l||{}))a(c,u)}).catch(()=>{}).finally(()=>{s=!0,r=null;for(let l of t)o(l)}),r)},unread(l,c,{complete:u,viewing:m}){if(!s||!u)return!1;let h=e.get(l),d=Kd(h,c);return!h||m?(d!==h&&(e.set(l,d),t.add(l),o(l)),!1):d!==h}}}var tu=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Ot=n=>typeof n=="string"?n.trim():"",ji=n=>Ot(n).toLowerCase(),eu=n=>Array.isArray(n)?n:[],Yl=n=>JSON.stringify(n,(e,t)=>tu(t)?Object.fromEntries(Object.keys(t).sort().map(i=>[i,t[i]])):t),xp=(n,e)=>!!e&&(n instanceof Set?n.has(e):eu(n).includes(e));function Kx(n){if(typeof n!="string")return n;try{return JSON.parse(n)}catch{return null}}function Sp(n){let e=Kx(n);return{root:e,result:tu(e?.analysis)?e.analysis:e}}function bp(n){let{root:e,result:t}=Sp(n);return t?.proposal??t?.work_order_proposal??e?.proposal??e?.work_order_proposal??null}function Jl(n,e){return e.every(t=>!Ot(t)||Ot(t)===n)}function Mp(n,e,{managedJobIds:t=[],managedAnalysisIds:i=[]}={}){let{root:s,result:r}=Sp(n?.result),a=bp(n?.result),o=Ot(r?.analysis_id)||Ot(s?.analysis_id)||Ot(n?.analysis_id)||null,l={proposal:a,analysisId:o,eligible:!1,approved:!1,reason:""},c=E=>({...l,reason:E});if(!tu(a)||!["title","description","assignee_id"].every(E=>Ot(a[E])))return c("\u8FD9\u6761\u8BB0\u5F55\u6CA1\u6709\u5B8C\u6574\u7684\u5904\u7F6E\u65B9\u6848\u3002");if(xp(t,n?.id)||xp(i,o))return c("\u8FD9\u4EFD\u65B9\u6848\u7531\u603B\u7BA1\u8DDF\u8FDB\uFF0C\u8BF7\u5728\u603B\u7BA1\u7684\u65B9\u6848\u5361\u7247\u786E\u8BA4\u3002");if(ji(n?.kind)!=="analysis"||ji(n?.role||n?.input?.role)!=="maintenance_coordinator"||!Jl("maintenance_coordinator",[n?.role,n?.input?.role]))return c("\u8FD9\u6761\u8BB0\u5F55\u4E0D\u662F\u7EF4\u4FEE\u8BA1\u5212\u5458\u7684\u5206\u6790\u65B9\u6848\u3002");if(!["succeeded","success","completed"].includes(ji(n?.status)))return c("\u8BF7\u7B49\u5F85\u8FD9\u6B21\u5206\u6790\u6210\u529F\u4FDD\u5B58\u540E\uFF0C\u518D\u786E\u8BA4\u65B9\u6848\u3002");let u=Ot(e?.id)||Ot(e?.case_id),m=Ot(n?.case_id)||Ot(n?.input?.case_id),h=Ot(e?.equipment_id)||Ot(e?.asset_id);if(!u||!m||u!==m||!h||!Jl(u,[e?.id,e?.case_id,n?.case_id,n?.input?.case_id,s?.case_id,r?.case_id,a.case_id])||!Jl(h,[e?.equipment_id,e?.asset_id,n?.equipment_id,n?.asset_id,n?.input?.equipment_id,n?.input?.asset_id,s?.equipment_id,s?.asset_id,r?.equipment_id,r?.asset_id,a.equipment_id,a.asset_id]))return c("\u65B9\u6848\u4E0E\u8FD9\u6BB5\u8BBE\u5907\u5904\u7406\u8BB0\u5F55\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u8BA9\u603B\u7BA1\u6838\u5BF9\u804A\u5929\u4E2D\u7684\u6700\u65B0\u65B9\u6848\u3002");if(!o||!Jl(o,[s?.analysis_id,r?.analysis_id,n?.analysis_id]))return c("\u5C1A\u672A\u6838\u5BF9\u5230\u8FD9\u4EFD\u65B9\u6848\u7684\u5DF2\u4FDD\u5B58\u5206\u6790\u8BB0\u5F55\u3002");let d=e.analysis_cycle,_=Ot(e.metrics?.snapshot_hash);if(!Number.isInteger(d)||d<0||!_||n.input?.expected_analysis_cycle!==void 0&&n.input.expected_analysis_cycle!==d||n.input?.expected_snapshot_hash!==void 0&&n.input.expected_snapshot_hash!==_)return c("\u8BBE\u5907\u6570\u636E\u6216\u5206\u6790\u8F6E\u6B21\u5DF2\u7ECF\u53D8\u5316\uFF0C\u8BF7\u8BA9\u603B\u7BA1\u6838\u5BF9\u6700\u65B0\u65B9\u6848\u3002");let g=eu(e.analyses).filter(E=>ji(E.kind)==="maintenance_coordinator"&&Ot(E.case_id)===u&&Ot(E.equipment_id)===h&&E.analysis_cycle===d&&E.baseline_snapshot_hash===_).reduce((E,w)=>!E||(w.created_at||"")>=(E.created_at||"")?w:E,null);if(!g||g.id!==o||Yl(bp(g.raw))!==Yl(a))return c("\u8FD9\u662F\u5386\u53F2\u65B9\u6848\uFF0C\u6216\u5DF2\u6709\u66F4\u65B0\u7684\u65B9\u6848\uFF1B\u8BF7\u67E5\u770B\u672C\u8F6E\u6700\u65B0\u7ED3\u679C\u3002");let p=ji(e.state||e.status);return e.state&&e.status&&ji(e.state)!==ji(e.status)?c("\u8FD9\u6BB5\u5904\u7406\u8BB0\u5F55\u7684\u72B6\u6001\u5C1A\u672A\u6838\u5BF9\u4E00\u81F4\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002"):eu(e.work_orders).some(E=>(!Ot(E.case_id)||Ot(E.case_id)===u)&&!["completed","cancelled"].includes(ji(E.state||E.status)))?c("\u5DF2\u6709\u529E\u7406\u4E2D\u7684\u5DE5\u5355\uFF0C\u8BF7\u8DDF\u8FDB\u73B0\u6709\u5DE5\u5355\u3002"):p==="waiting_decision"?{...l,eligible:!0}:p==="waiting_action"?Yl(e.approved_proposal)===Yl(a)&&e.approved_metrics_hash===_&&Ot(e.approved_by)&&Ot(e.approved_at)?{...l,approved:!0}:c("\u5F53\u524D\u6279\u51C6\u8BB0\u5F55\u4E0E\u8FD9\u4EFD\u65B9\u6848\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u786E\u8BA4\u3002"):c("\u8FD9\u4EFD\u65B9\u6848\u5DF2\u8FDB\u5165\u540E\u7EED\u6D41\u7A0B\uFF0C\u6216\u8FD9\u4EF6\u4E8B\u5C1A\u672A\u5230\u786E\u8BA4\u73AF\u8282\u3002")}var ni=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),pa=(n,e=1)=>n==null||n===""||!Number.isFinite(Number(n))?"\u672A\u63D0\u4F9B":new Intl.NumberFormat("zh-CN",{maximumFractionDigits:e}).format(Number(n)),Ki=n=>{if(!n)return"\u672A\u63D0\u4F9B";let e=new Date(n);return Number.isNaN(e.getTime())?"\u672A\u63D0\u4F9B":e.toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})},nu='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';function iu(n){return!!(n?.enabled!==!1&&n?.latest_batch&&(n.receipt?.persisted===!0||n.synced_at))}function su(n,{busy:e=!1,error:t=null,receiptOpen:i=!1}={}){let s=iu(n),r=s?n.latest_batch:null,a=s?n.receipt:null,o=n?.enabled!==!1&&n?.connection_verified===!0,l={connecting:"\u8FDE\u63A5\u4E2D",connected:o?"\u5E73\u53F0\u8FDE\u63A5\u5DF2\u9A8C\u8BC1":"\u5E73\u53F0\u8FDE\u63A5\u5F85\u9A8C\u8BC1",unavailable:"\u5E73\u53F0\u6682\u4E0D\u53EF\u8FBE",error:"\u63A5\u5165\u5F02\u5E38",not_configured:"\u5C1A\u672A\u914D\u7F6E"},c=n?.enabled===!1?"\u63A5\u5165\u5DF2\u505C\u7528":l[n?.state]||"\u6B63\u5728\u8BFB\u53D6",u=s&&n.data_fresh===!1,m=s?n?.detected_case_id||a?.detected_case_id:null,h=t?.message||(typeof n?.last_error=="string"?n.last_error:n?.last_error?.message);return`<section id="iot-panel" class="iot-panel" aria-labelledby="iot-heading"><div class="iot-heading"><div><div class="iot-title"><h2 id="iot-heading">IoT \u6570\u636E\u63A5\u5165</h2><span class="source-tag">\u865A\u62DF\u8BBE\u5907 \xB7 \u975E\u73B0\u573A</span></div><p>\u901A\u8FC7 Node-RED \u63A5\u6536\u4E0E\u6301\u4E45\u5316\uFF0C\u518D\u540C\u6B65\u5230\u5DE5\u5382\u4E1A\u52A1\u8BB0\u5F55\u3002</p></div><button type="button" class="button primary" data-action="sync-iot" ${e||!n||n.enabled===!1||n.state==="not_configured"?"disabled":""}>${e?"\u6B63\u5728\u540C\u6B65\u2026":"\u7ACB\u5373\u540C\u6B65"}</button></div><div class="iot-connection"><span class="status-badge ${o?"green":n?.state==="error"||n?.state==="unavailable"?"orange":"muted"}">${c}</span><span>${ni(n?.platform||"Node-RED")}${n?.platform_version?` ${ni(n.platform_version)}`:""}</span><span>\u8FDE\u63A5\u68C0\u67E5 ${Ki(n?.last_checked_at)}</span></div><div class="iot-chain" aria-label="\u6570\u636E\u63A5\u5165\u94FE\u8DEF"><div><strong>\u865A\u62DF\u8BBE\u5907</strong><span>${r?"\u5DF2\u6709\u8BBE\u5907\u65E5\u6279\u6B21":"\u7B49\u5F85\u65E5\u6279\u6B21"}</span></div>${nu}<div><strong>Node-RED</strong><span>${r?.received_at?"HTTP \u5DF2\u63A5\u6536\u5E76\u6301\u4E45\u5316":o?"HTTP \u5E73\u53F0\u5DF2\u8FDE\u63A5":"\u7B49\u5F85\u9A8C\u8BC1 HTTP \u5E73\u53F0"}</span></div>${nu}<div><strong>\u5DE5\u5382\u4E1A\u52A1\u670D\u52A1</strong><span>${a?.persisted?"\u5DF2\u540C\u6B65\u5E76\u6301\u4E45\u5316":"\u7B49\u5F85\u6709\u6548\u6279\u6B21\u540C\u6B65"}</span></div></div>${u?`<p class="iot-warning" role="status">\u65E5\u6279\u6B21\u903E\u671F\u672A\u66F4\u65B0\uFF0C\u7EE7\u7EED\u5C55\u793A\u4E0A\u4E00\u6B21\u5FEB\u7167\u3002\u9884\u8BA1\u4E0B\u4E00\u6279 ${Ki(n.next_batch_expected_at)}\uFF1B\u8FD9\u4E0D\u7B49\u540C\u4E8E\u8BBE\u5907\u5B9E\u65F6\u79BB\u7EBF\u3002</p>`:s&&!o?'<p class="iot-warning" role="status">\u5E73\u53F0\u8FDE\u63A5\u6682\u672A\u9A8C\u8BC1\uFF0C\u4FDD\u7559\u4E0A\u4E00\u6B21\u65E5\u5FEB\u7167\u53CA\u5176\u6E90\u65F6\u95F4\u3002</p>':""}<div class="iot-times"><div><span>\u8BBE\u5907\u6570\u636E\u4EA7\u751F</span><strong>${Ki(r?.produced_at)}</strong></div><div><span>\u5E73\u53F0\u63A5\u6536</span><strong>${Ki(r?.received_at)}</strong></div><div><span>\u5DE5\u5382\u540C\u6B65</span><strong>${Ki(a?.synced_at||n?.synced_at)}</strong></div></div><div class="iot-batch"><div><span>\u5FEB\u7167\u7A97\u53E3 \xB7 \u5317\u4EAC\u65F6\u95F4</span><strong>${r?.window?.start&&r?.window?.end?`${Ki(r.window.start)} \u81F3 ${Ki(r.window.end)}`:"\u5C1A\u65E0\u5DF2\u540C\u6B65\u5FEB\u7167"}</strong></div><div><span>\u5DF2\u63A5\u5165\u8BB0\u5F55</span><strong>${s?`${pa(n?.imported?.events??a?.events,0)} \u6761\u72B6\u6001\u4E8B\u4EF6 \xB7 ${pa(n?.imported?.production??a?.production,0)} \u6761\u751F\u4EA7\u8BB0\u5F55`:"\u7B49\u5F85\u5B9E\u9645\u540C\u6B65\u56DE\u6267"}</strong></div><div><span>\u6279\u6B21</span><strong class="iot-batch-id" title="${ni(r?.batch_id||"")}">${ni(r?.batch_id||"\u672A\u63D0\u4F9B")}</strong></div></div>${e?'<p class="iot-sync-message" role="status">\u6B63\u5728\u540C\u6B65\u5E73\u53F0\u5DF2\u6709\u6279\u6B21\uFF0C\u8BF7\u7A0D\u5019\u3002\u8BBE\u5907\u751F\u6210\u8BA1\u5212\u4FDD\u6301\u4E0D\u53D8\u3002</p>':""}${h?`<p class="iot-warning" role="status">${ni(h)} \u5DF2\u663E\u793A\u7684\u5FEB\u7167\u4FDD\u6301\u539F\u65F6\u95F4\uFF0C\u4E0D\u4EE3\u8868\u672C\u6B21\u540C\u6B65\u6210\u529F\u3002</p>`:""}<div class="iot-bottom"><p class="small-note">${ni(n?.timestamp_note||"\u8BBE\u5907\u65E5\u5FEB\u7167\u7684\u4E1A\u52A1\u65E5\u671F\u4E0E\u65F6\u95F4\u7A97\u53E3\u4EE5\u672C\u6279\u6B21\u8BB0\u5F55\u4E3A\u51C6\u3002")} \u5DE5\u5382\u6BCF ${pa(n?.sync_interval_seconds??60,0)} \u79D2\u68C0\u67E5\u65B0\u6279\u6B21\u3002\u754C\u9762\u5C55\u793A\u6700\u8FD1\u540C\u6B65\u8BB0\u5F55\uFF0C\u4E0D\u662F\u8BBE\u5907\u5F53\u524D\u5B9E\u65F6\u72B6\u6001\u3002</p>${m?`<button type="button" class="button" data-open-case="${ni(m)}">\u67E5\u770B\u672C\u6279\u6B21\u5F02\u5E38${nu}</button>`:""}</div>${a?`<details class="iot-receipt" data-iot-detail="receipt"${i?" open":""}><summary>\u67E5\u770B\u540C\u6B65\u51ED\u636E</summary><dl><div><dt>\u6279\u6B21\u7F16\u53F7</dt><dd>${ni(a.batch_id||r?.batch_id||"\u672A\u63D0\u4F9B")}</dd></div><div><dt>\u6570\u636E\u5305\u7F16\u53F7</dt><dd>${ni(r?.packet_id||"\u672A\u63D0\u4F9B")}</dd></div><div><dt>\u6301\u4E45\u5316\u56DE\u6267</dt><dd>${a.persisted===!0?"\u5DF2\u53D6\u5F97":"\u672A\u786E\u8BA4"}</dd></div><div><dt>\u65B0\u589E\u8BB0\u5F55</dt><dd>${typeof a.new_records=="boolean"?a.new_records?"\u672C\u6279\u6B21\u5305\u542B\u65B0\u589E\u8BB0\u5F55":"\u91CD\u590D\u6279\u6B21\uFF0C\u672A\u91CD\u590D\u5165\u5E93":typeof a.new_records=="number"?pa(a.new_records,0):"\u4EE5\u5165\u5E93\u56DE\u6267\u4E3A\u51C6"}</dd></div><div><dt>\u5185\u5BB9\u6458\u8981 SHA-256</dt><dd>${ni(r?.payload_sha256||"\u672A\u63D0\u4F9B")}</dd></div></dl></details>`:""}</section>`}function wp(n){if(n?.source!=="iot_node_red")return"";let e=n.telemetry||{},t=[["temp_c","\u6E29\u5EA6","\xB0C",1],["vibration_mm_s","\u632F\u52A8","mm/s",2],["current_a","\u7535\u6D41","A",1],["spindle_rpm","\u4E3B\u8F74\u8F6C\u901F","r/min",0],["air_pressure_bar","\u6C14\u538B","bar",2]];return`<section class="iot-telemetry" aria-label="IoT\u5FEB\u7167\u4F20\u611F\u5668\u8BFB\u6570"><div class="section-heading"><h2>\u4F20\u611F\u5668\u5FEB\u7167</h2><span>\u6E90\u65F6\u95F4 ${Ki(n.source_timestamp||n.last_seen_at)}\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09</span></div>${n.connection_status==="iot_stale"?'<p class="iot-telemetry-note">\u8FDE\u63A5\u6216\u65E5\u6279\u6B21\u5DF2\u8FC7\u671F\uFF0C\u4EE5\u4E0B\u4FDD\u7559\u4E0A\u6B21\u6E90\u6570\u636E\u3002</p>':""}<dl>${t.map(([i,s,r,a])=>`<div><dt>${s}</dt><dd><strong>${pa(e[i],a)}</strong>${e[i]===null||e[i]===void 0||e[i]===""?"":`<span>${r}</span>`}</dd></div>`).join("")}</dl><p class="small-note">\u6765\u6E90\uFF1ANode-RED \u865A\u62DF\u8BBE\u5907\u65E5\u5FEB\u7167 \xB7 \u4E0D\u4EE3\u8868\u73B0\u573A\u5B9E\u65F6\u6D4B\u91CF</p></section>`}var Fe=document.getElementById("app"),Np=!!globalThis.__FACTORY_FETCH__||location.protocol==="about:",Up=cc,Op=[{id:"efficiency_advisor",name:"\u751F\u4EA7\u635F\u5931\u5206\u6790\u5458",type:"\u987E\u95EE",initials:"\u635F",description:"\u89E3\u91CA\u635F\u5931\uFF0C\u627E\u51FA\u503C\u5F97\u4F18\u5148\u5904\u7406\u7684\u95EE\u9898\u3002"},{id:"maintenance_advisor",name:"\u8BBE\u5907\u8BCA\u65AD\u5458",type:"\u987E\u95EE",initials:"\u8BCA",description:"\u57FA\u4E8E\u8BC1\u636E\u5F62\u6210\u539F\u56E0\u5047\u8BBE\u548C\u73B0\u573A\u68C0\u67E5\u8DEF\u5F84\u3002"},{id:"maintenance_coordinator",name:"\u7EF4\u4FEE\u8BA1\u5212\u5458",type:"\u5458\u5DE5",initials:"\u8BA1",description:"\u5F62\u6210\u5904\u7F6E\u63D0\u6848\uFF0C\u83B7\u6279\u540E\u8C03\u7528\u5DE5\u5177\u5EFA\u5355\u5E76\u56DE\u8BFB\u3002"},{id:"operations_employee",name:"\u8FD0\u884C\u5DE1\u68C0\u5458",type:"\u5458\u5DE5",initials:"\u5DE1",description:"\u68C0\u67E5\u8FD0\u884C\u4E8B\u5B9E\u4E0E\u7F3A\u6570\uFF0C\u4EA4\u4ED8\u53EF\u8FFD\u6EAF\u5DE1\u68C0\u7ED3\u679C\u3002"},{id:"report_employee",name:"\u73ED\u62A5\u5458",type:"\u5458\u5DE5",initials:"\u62A5",description:"\u6C47\u603B\u5DF2\u6838\u9A8C\u7684\u8BBE\u5907\u3001\u5F02\u5E38\u4E0E\u5F85\u529E\u3002"}],Qx={running:"\u8FD0\u884C",run:"\u8FD0\u884C",stopped:"\u505C\u6B62",stop:"\u505C\u6B62",fault:"\u6545\u969C",idle:"\u5F85\u673A",maintenance:"\u7EF4\u62A4",unknown:"\u672A\u77E5",offline:"\u79BB\u7EBF",open:"\u5F85\u6838\u5B9E",detected:"\u5F85\u6838\u5B9E",pending_verification:"\u5F85\u6838\u5B9E",investigating:"\u5206\u6790\u4E2D",analyzing:"\u5206\u6790\u4E2D",awaiting_decision:"\u5F85\u51B3\u7B56",pending_decision:"\u5F85\u51B3\u7B56",awaiting_approval:"\u5F85\u6279\u51C6",pending_approval:"\u5F85\u6279\u51C6",approved:"\u5DF2\u6279\u51C6",awaiting_execution:"\u5F85\u6267\u884C",pending_execution:"\u5F85\u6267\u884C",assigned:"\u5F85\u63A5\u5355",dispatched:"\u5DF2\u4E0B\u53D1",accepted:"\u5DF2\u63A5\u5355",in_progress:"\u6267\u884C\u4E2D",executing:"\u6267\u884C\u4E2D",pending_review:"\u5F85\u590D\u6838",technical_review:"\u5F85\u6280\u672F\u590D\u6838",awaiting_acceptance:"\u5F85\u9A8C\u6536",pending_acceptance:"\u5F85\u9A8C\u6536",observing:"\u89C2\u5BDF\u4E2D",observation:"\u89C2\u5BDF\u4E2D",closed:"\u5DF2\u5173\u95ED",completed:"\u5DF2\u5B8C\u6210",rejected:"\u5DF2\u9000\u56DE",reopened:"\u5DF2\u91CD\u5F00",draft:"\u8349\u7A3F",queued:"\u6392\u961F\u4E2D",running_job:"\u8FD0\u884C\u4E2D",waiting_human:"\u7B49\u5F85\u4EBA\u5DE5",waiting_input:"\u7B49\u5F85\u8865\u5145",succeeded:"\u5DF2\u4EA4\u4ED8",success:"\u5DF2\u4EA4\u4ED8",failed:"\u5931\u8D25",cancelled:"\u5DF2\u53D6\u6D88",timeout:"\u8D85\u65F6",timed_out:"\u8D85\u65F6",blocked:"\u53D7\u963B",waiting_triage:"\u5F85\u6838\u5B9E",analysing:"\u5206\u6790\u4E2D",waiting_decision:"\u5F85\u51B3\u7B56",waiting_action:"\u5F85\u6D3E\u5DE5",waiting_execution:"\u5F85\u6267\u884C",waiting_acceptance:"\u5F85\u9A8C\u6536",waiting_tech_review:"\u5F85\u6280\u672F\u590D\u6838",issued:"\u5F85\u63A5\u5355",dismissed:"\u5DF2\u9A73\u56DE",no_data:"\u65E0\u6570\u636E",replay:"\u5386\u53F2\u8BB0\u5F55"},Fp={accept:"\u786E\u8BA4\u63A5\u5355",start:"\u5F00\u59CB\u6267\u884C",submit:"\u63D0\u4EA4\u73B0\u573A\u8BB0\u5F55",submit_review:"\u63D0\u4EA4\u6280\u672F\u590D\u6838",submit_for_review:"\u63D0\u4EA4\u6280\u672F\u590D\u6838",review:"\u901A\u8FC7\u6280\u672F\u590D\u6838",approve_review:"\u901A\u8FC7\u6280\u672F\u590D\u6838",accept_work:"\u9A8C\u6536\u901A\u8FC7",complete:"\u5B8C\u6210\u9A8C\u6536",approve:"\u6279\u51C6",reject:"\u9000\u56DE",start_observation:"\u5F00\u59CB\u6062\u590D\u89C2\u5BDF",observe:"\u63D0\u4EA4\u89C2\u5BDF\u7ED3\u8BBA",close:"\u786E\u8BA4\u6709\u6548\u5E76\u5173\u95ED",reopen:"\u91CD\u65B0\u8C03\u67E5",cancel:"\u53D6\u6D88\u4EFB\u52A1",verify:"\u786E\u8BA4\u5F02\u5E38",request_analysis:"\u8FDB\u5165\u5206\u6790",approve_plan:"\u6279\u51C6\u5904\u7F6E\u8BA1\u5212",submit_acceptance:"\u63D0\u4EA4\u9A8C\u6536",pass_acceptance:"\u9A8C\u6536\u901A\u8FC7",fail_acceptance:"\u9A8C\u6536\u4E0D\u901A\u8FC7",extend_observation:"\u5EF6\u957F\u89C2\u5BDF",record_observation:"\u63D0\u4EA4\u89C2\u5BDF\u8BB0\u5F55",close_effective:"\u786E\u8BA4\u6709\u6548\u5E76\u5173\u95ED",evaluate_observation:"\u6838\u9A8C\u6062\u590D\u89C2\u5BDF",complete_repair:"\u63D0\u4EA4\u7EF4\u4FEE\u7ED3\u679C",technical_review:"\u6280\u672F\u590D\u6838\u901A\u8FC7",return_repair:"\u9000\u56DE\u7EF4\u4FEE",accept_repair:"\u9A8C\u6536\u901A\u8FC7",reject_acceptance:"\u9A8C\u6536\u4E0D\u901A\u8FC7"},f={page:Na(location.hash),data:null,selectedId:null,detail:null,detailLoading:!1,detailError:null,selectedCaseId:null,caseDetail:null,caseError:null,aiMode:"manager",replyContext:null,chatTarget:"manager",chatDrafts:{},outgoingMessages:[],taskExpanded:{},managerTurns:[],managerActiveTurns:[],managerCaseId:void 0,managerCaseDetails:{},managerLoaded:!1,managerLoading:!1,managerBusy:!1,managerError:null,managerDraft:"",managerExpanded:{},role:"efficiency_advisor",jobs:[],selectedJobId:null,analysisSubmitting:!1,operationBusy:!1,approval:null,approvedProposal:null,taskFilter:"open",showList:!1,error:null,refreshing:!1,activeAssetTab:"evidence",actionDraft:null,proposalEdit:null,importDraft:"",importResult:null,importError:null,importBusy:!1,observationEditing:!1,observationBusy:!1,observationError:null,observationDraft:{},simulationScenario:null,simulationBusy:!1,simulationError:null,simulationPollError:null,workflowExpanded:{},workflowError:null,workflowView:"flow",workflowSelectedNodes:{},iotBusy:!1,iotError:null,iotReceiptOpen:!1,emsBusy:!1,emsError:null,emsDetailsOpen:!1},Gn=null,au=null,Ep=null,hr=0,ya=null,_s=null,ys=null,eb=null;var va=null,cr=null,ou,Mi,lu=typeof IntersectionObserver>"u";function tb(){return Mi||=vp(globalThis.__FACTORY_CHAT_READS__||yp()),Mi.refresh()}function cu(){return ou||=zu({journal:globalThis.__FACTORY_PENDING__||Fu(),lookup:n=>pt.receipt(n),newKey:Ci})}function Ta(n){return Object.assign(new Error(n),{outcomeUnknown:!0})}function xs(n,e,t,i,s=f.chatTarget){return cu().send(zp([n,e]),async r=>{let a=await t(r);if(!a||typeof a!="object"||!Object.keys(a).length)throw Ta("\u6B63\u5728\u6838\u5BF9\u8FD9\u6B21\u63D0\u4EA4\u7684\u56DE\u6267\u3002");return a},{scope:s,onReceipt:i})}var _t=lh({api:pt,sendWithReceipt:xs,getState:()=>f,afterRefresh:()=>{f.page==="ai"&&!cr&&ri()},onMessages:()=>{f.page==="ai"&&!_t.state.panel&&(ic(),At())},onChange:()=>{f.data&&f.page==="ai"&&At()},onChat:(n,e)=>vs(e,n),onCase:n=>{n?.id&&(f.selectedCaseId=n.id,f.caseDetail=n,f.managerCaseDetails[n.id]=n)},onClose:()=>{f.actionDraft=null,f.observationEditing=!1,f.observationAction=null},renderBusiness:gb,onReply:n=>{vs("manager",n.case_id,n),Fe.querySelector("#manager-message")?.focus()},onBusinessAction:(n,e)=>{f.selectedCaseId=e.case_id;let t={conversation_action_id:e.id,conversation_action_version:e.version};n.kind==="observation_plan"?(f.observationEditing=!0,f.observationDraft={},f.observationError=null,f.observationAction=t):f.actionDraft={action:n.action,label:n.label,kind:n.kind==="case"?"case":"order",id:n.object_id,requiresEvidence:n.requires_evidence_refs===!0,requiresNotes:n.requires_notes!==!1,actorRole:n.role,conversationAction:t}},renderReplay:(n,e)=>rh(n,{...xb(n),replayAt:e?.at})}),nb={normal:"\u6B63\u5E38\u751F\u4EA7",short_stops:"MC-07 \u53CD\u590D\u77ED\u505C",recovery:"\u6062\u590D\u8FD0\u884C",data_gap:"\u91C7\u96C6\u7F3A\u5931"},kp=()=>f.simulationScenario||(f.data?.simulation?.run_id?f.data.simulation.pending_scenario||f.data.simulation.scenario:null)||"short_stops",Q=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ql=n=>Qx[n]||n||"\u672A\u58F0\u660E",ii=n=>!["closed","completed","cancelled","rejected","dismissed"].includes(n.status),Aa=n=>n==null||n===""?null:Number.isFinite(Number(n))?Number(n):null,sn=n=>Aa(n)===null?"\u2014":new Intl.NumberFormat("zh-CN",{maximumFractionDigits:1}).format(Number(n)),du=n=>Aa(n)===null?"\u4E0D\u53EF\u8BA1\u7B97":`${Number(n).toFixed(1)}%`,fn=n=>{if(!n)return"\u65F6\u95F4\u672A\u63D0\u4F9B";let e=new Date(n);return Number.isNaN(e.getTime())?String(n):e.toLocaleString("zh-CN",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})},fu=()=>f.data?.assets.find(n=>n.id===f.selectedId),jl=()=>f.caseDetail?.id===f.selectedCaseId?f.caseDetail:f.data?.cases.find(n=>n.id===f.selectedCaseId),xa=n=>f.data?.cases.filter(e=>e.asset_id===n)||[];var ib=n=>n?.result?.analysis||n?.result||n?.output||null,ba=n=>["succeeded","success","completed","failed","cancelled","timeout","timed_out","waiting_human","blocked"].includes(n?.status),Bp=n=>!ba(n)||n.status==="waiting_human",sb=()=>{let n=f.data?.capabilities||{},e=n.supported_roles??n.roles;return Array.isArray(e)?e.filter(t=>typeof t=="string"||t&&t.supported!==!1&&t.available!==!1&&t.enabled!==!1).map(t=>typeof t=="string"?t:t?.id||t?.role).filter(Boolean):e&&typeof e=="object"?Object.entries(e).filter(([,t])=>t===!0||t?.supported===!0||t?.available===!0||t?.enabled===!0).map(([t])=>t):["efficiency_advisor","maintenance_advisor","maintenance_coordinator"]},ec=n=>sb().includes(n),zp=n=>JSON.stringify(n,(e,t)=>t&&typeof t=="object"&&!Array.isArray(t)?Object.fromEntries(Object.keys(t).sort().map(i=>[i,t[i]])):t);function Ft(n,e=20){let t={factory:'<path d="M3 21V9l6 3V7l6 3V3h4v18H3Z"/><path d="M6 16h2m3 0h2m3 0h2M6 19h2m3 0h2m3 0h2"/>',cube:'<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z"/><path d="m3 8 9 5 9-5m-9 5v9m-4-17 9 5"/>',tool:'<path d="m14 6 4 4 4-4a7 7 0 0 1-9 9l-6 6a3 3 0 0 1-4-4l6-6a7 7 0 0 1 9-9l-4 4Z"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 4v2"/>',tasks:'<rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 2h6v4H9zm0 9 1 1 3-3m-4 8 1 1 3-3m3-4h1m-1 6h1"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.2 6.2A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.8 5.8"/>',focus:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',send:'<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13l11-11"/>',alert:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v.01"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',file:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8"/>',link:'<path d="m10 13 4-4m-6 7-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m4 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(2 -1) scale(.9)"/>'};return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t[n]||t.cube}</svg>`}function wi(n,e=""){return`<span class="status-badge ${e||pu(n)}">${Q(Ql(n))}</span>`}function pu(n){return["running","run","succeeded","success","completed","closed"].includes(n)?"green":["failed","fault","rejected","timeout"].includes(n)?"red":["unknown","offline","cancelled"].includes(n)?"muted":"orange"}function fr(n,e,t=""){return`<div class="empty-state"><strong>${Q(n)}</strong><p>${Q(e)}</p>${t}</div>`}function pr(n,e=""){return`<div class="error-state" role="alert">${Ft("alert")}<div><strong>\u672C\u6B21\u8BF7\u6C42\u672A\u5B8C\u6210</strong><p>${Q(n?.message||n)}</p>${e}</div></div>`}function rn(n){let e=document.getElementById("toast");e.textContent=n,e.hidden=!1,clearTimeout(Ep),Ep=setTimeout(()=>{e.hidden=!0},5500)}function ma(){return hc(f.data?.ems)||iu(f.data?.iot)}function $p(){let n=f.data?.data_source;return f.data?.ems?.enabled!==!1&&(f.data?.ems||n?.source==="equipment_management_system")?f.data?.ems?.state==="error"?"\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF \xB7 \u540C\u6B65\u5F85\u5904\u7406":"\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF \xB7 \u6BCF\u65E5\u540C\u6B65":n?n.mode==="no_data"?"\u5C1A\u65E0\u751F\u4EA7\u8BB0\u5F55":n.mode==="imported"?"\u5BFC\u5165\u8BB0\u5F55 \xB7 \u975E\u5B9E\u65F6":"\u5DF2\u4FDD\u5B58\u7684\u4E1A\u52A1\u8BB0\u5F55":"\u6B63\u5728\u8BFB\u53D6\u6570\u636E\u6765\u6E90"}function tc(n){return n.source==="equipment_management_system"?"\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF \xB7 \u6BCF\u65E5\u540C\u6B65":n.connection_status==="no_data"?"\u5C1A\u65E0\u91C7\u96C6\u8BB0\u5F55":"\u5386\u53F2\u4E1A\u52A1\u8BB0\u5F55"}function vt(){let n=Fe.querySelector(".employee-drawer-body")?.scrollTop;if(Gn?.dispose(),Gn=null,!f.data){Fe.innerHTML=`<div class="initial-shell"><div class="brand">${Ft("factory",27)}<strong>\u6211\u7684\u5DE5\u5382</strong></div>${f.error?pr(f.error,'<button class="button primary" data-action="reload">\u91CD\u65B0\u8FDE\u63A5</button>'):'<div class="loading-state" role="status"><span class="spinner"></span>\u6B63\u5728\u8BFB\u53D6\u8BBE\u5907\u548C\u540C\u4E8B\u6D88\u606F\u2026</div>'}</div>`,Lp();return}let e=f.data.capabilities;Fe.innerHTML=`<div class="app-shell ${f.page==="ai"?"page-ai":""}">
    <aside class="sidebar"><a class="brand" href="#overview" aria-label="\u6211\u7684\u5DE5\u5382" title="\u6211\u7684\u5DE5\u5382">${Ft("factory",25)}<span>\u6211\u7684\u5DE5\u5382<small>\u8BBE\u5907\u8FD0\u8425\u4E0E\u667A\u80FD\u534F\u4F5C</small></span></a>
      <nav aria-label="\u4E3B\u8981\u5BFC\u822A">${Object.entries(Up).map(([i,s])=>`<button class="nav-item ${f.page===i?"active":""}" data-page="${i}" aria-label="${s}" title="${s}" aria-current="${f.page===i?"page":"false"}">${Ft({overview:"cube",asset:"tool",ai:"people"}[i])}<span>${s}</span></button>`).join("")}</nav>
      <div class="sidebar-foot"><div class="connection-dot ${e.model_verified?"online":""}"></div><span>${e.model_verified?"\u6A21\u578B\u8C03\u7528\u5DF2\u9A8C\u8BC1":e.ai_available?"\u6A21\u578B\u5DF2\u914D\u7F6E \xB7 \u5F85\u9A8C\u8BC1":"AI \u5C1A\u672A\u8FDE\u63A5"}<small>${Q(e.model||e.model_name||"\u8FDE\u63A5\u72B6\u6001\u7531\u670D\u52A1\u7AEF\u63D0\u4F9B")}</small></span></div>
    </aside>
    <div class="workspace"><header class="topbar"><div class="topbar-location"><span class="square-mark"></span><span>${Q(f.data.factory_name||"\u6211\u7684\u5DE5\u5382")}<span class="breadcrumb-sep">/</span><strong>${Q(f.data.line_name||"\u673A\u52A0\u5DE5\u4E00\u7EBF")}</strong></span></div><div class="topbar-right"><button class="source-tag source-button" data-action="show-iot" title="\u67E5\u770B\u6570\u636E\u63A5\u5165\u8BE6\u60C5">${Q($p())}</button><button class="icon-button" data-action="refresh" aria-label="\u5237\u65B0\u4E1A\u52A1\u6570\u636E" ${f.refreshing?"disabled":""}>${Ft("refresh",18)}</button></div></header>
    <main id="page-content" class="page-content">${f.error?`<div class="stale-notice">${Ft("alert",17)}<span>${Q(f.error.message)} \u5F53\u524D\u4FDD\u7559\u6700\u540E\u4E00\u6B21\u8BFB\u53D6\u7ED3\u679C\u3002</span></div>`:""}${rb()}</main>
    <footer class="app-footer"><span>${Q(f.data.capabilities.authorization_label||"\u5DE5\u5382\u4E1A\u52A1\u8BB0\u5F55\u4FDD\u6301\u72EC\u7ACB \xB7 AI \u7ED3\u8BBA\u9644\u5E26\u6765\u6E90")}</span><span>\u622A\u81F3 ${Q(fn(f.data.updated_at||f.data.generated_at||f.data.data_source.generated_at))}</span></footer></div>
  </div>`,Lp(),Tb();let t=Fe.querySelector(".employee-drawer-body");t&&n!==void 0&&(t.scrollTop=n)}function rb(){return f.page==="asset"?Gp():f.page==="ai"?pb():Vp()}function Vp(){let n=f.data.assets,e=f.data.cases.filter(ii),t=n.filter(i=>["running","run","\u8FD0\u884C"].includes(i.status)).length;return`<div class="page-heading"><div><h1>\u5DE5\u5382\u603B\u89C8</h1><p>\u4ECE\u4EA7\u7EBF\u5168\u666F\uFF0C\u8D70\u8FDB\u6BCF\u4E00\u53F0\u8BBE\u5907\u7684\u8FD0\u884C\u4E0E\u5904\u7F6E\u3002</p></div><div class="overview-heading-actions"><span class="plain-note">${n.length} \u53F0\u8BBE\u5907 \xB7 ${e.length} \u9879\u5F85\u95ED\u73AF</span><button class="button small" data-action="show-iot">\u6570\u636E\u63A5\u5165</button></div></div>
  <div class="overview-strip"><div><span class="small-dot green"></span><strong>${t}</strong><span>${ma()?"\u5FEB\u7167\u8FD0\u884C":"\u8FD0\u884C\u4E2D"}</span></div><div><span class="small-dot orange"></span><strong>${e.length}</strong><span>\u672A\u7ED3\u5F02\u5E38</span></div><div><span class="small-dot gray"></span><strong>${n.filter(i=>["unknown","offline"].includes(i.status)).length}</strong><span>\u672A\u77E5 / \u79BB\u7EBF</span></div><span class="strip-note">\u8FD0\u884C\u72B6\u6001\u4E0E\u5904\u7F6E\u9636\u6BB5\u5206\u522B\u5448\u73B0</span></div>
  <div class="overview-layout"><section class="plant-panel" aria-label="\u4EA7\u7EBF\u4E09\u7EF4\u89C6\u56FE"><div class="plant-toolbar"><div class="view-switch"><button class="${f.showList?"":"active"}" data-action="view-3d" aria-pressed="${!f.showList}">${Ft("cube",16)}\u4E09\u7EF4</button><button class="${f.showList?"active":""}" data-action="view-list" aria-pressed="${f.showList}">${Ft("list",16)}\u8BBE\u5907\u5217\u8868</button></div><div class="plant-actions"><button class="text-button" data-action="reset-view">\u5168\u666F</button><button class="text-button" data-action="focus-view">${Ft("focus",15)}\u805A\u7126</button></div></div>
    ${n.length?`<div id="factory-scene" class="factory-scene ${f.showList?"is-hidden":""}"></div><div class="scene-note ${f.showList?"is-hidden":""}"><span>\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u70B9\u51FB\u8BBE\u5907</span><label><input id="motion-toggle" type="checkbox" ${ma()?"disabled":matchMedia("(prefers-reduced-motion: reduce)").matches?"":"checked"} />${ma()?"\u65E5\u5FEB\u7167\uFF08\u9759\u6001\uFF09":"\u8FD0\u884C\u793A\u610F"}</label><label><input id="cutaway-toggle" type="checkbox" />\u67E5\u770B\u52A0\u5DE5\u4ED3</label></div><div class="asset-grid ${f.showList?"":"is-hidden"}">${n.map(i=>ob(i)).join("")}</div>`:fr("\u5148\u5EFA\u7ACB\u8BBE\u5907\u53F0\u8D26","\u63A5\u5165\u8BBE\u5907\u540E\uFF0C\u6A21\u578B\u3001\u6570\u636E\u548C\u4EFB\u52A1\u5C06\u5728\u8FD9\u91CC\u5EFA\u7ACB\u5173\u8054\u3002")}
    <div class="plant-caption"><span class="caption-line"></span><span>${ma()?"\u673A\u52A0\u5DE5\u5355\u5143 \xB7 \u65E5\u5FEB\u7167\u72B6\u6001\u4E0E\u51E0\u4F55\u6A21\u578B":"\u673A\u52A0\u5DE5\u5355\u5143 \xB7 \u51E0\u4F55\u6A21\u578B\u4E0E\u52A8\u4F5C\u793A\u610F"}</span><span class="small-dot orange"></span><span>\u672A\u7ED3\u5F02\u5E38</span></div>
  </section><aside class="overview-aside"><div id="selected-asset-panel">${mu()}</div><section class="attention-list"><div class="section-heading"><h2>\u9700\u8981\u5173\u6CE8</h2><span>${e.length}</span></div>${e.length?e.slice(0,5).map(i=>`<button class="attention-item ${i.asset_id===f.selectedId?"selected":""}" data-open-case="${Q(i.id)}"><div><span class="attention-id">${Q(i.asset_id)}</span>${wi(i.status)}</div><strong>${Q(i.title)}</strong><p>${Q(i.owner)}\u8D1F\u8D23 \xB7 \u627E\u603B\u7BA1\u4E86\u89E3</p></button>`).join(""):fr("\u6CA1\u6709\u672A\u7ED3\u5F02\u5E38","\u7EE7\u7EED\u5173\u6CE8\u6570\u636E\u8FDE\u63A5\u548C\u65E5\u5E38\u5DE1\u68C0\u3002")}</section></aside></div>
  ${f.data.ems?`${Lu(f.data.ems,{busy:f.emsBusy,error:f.emsError,detailsOpen:f.emsDetailsOpen})}<details class="historical-connections"><summary>\u5386\u53F2\u63A5\u5165\u8BB0\u5F55</summary>${su(f.data.iot,{busy:f.iotBusy,error:f.iotError,receiptOpen:f.iotReceiptOpen})}${Tp()}</details>`:`${su(f.data.iot,{busy:f.iotBusy,error:f.iotError,receiptOpen:f.iotReceiptOpen})}${Tp()}`}<section class="equipment-register"><div class="section-heading"><h2>\u8BBE\u5907\u4E00\u89C8</h2><span class="plain-note">\u9009\u62E9\u8BBE\u5907\u53EF\u5728\u4E09\u7EF4\u4E2D\u5B9A\u4F4D</span></div><div class="equipment-row">${n.map(i=>`<button class="equipment-chip ${i.id===f.selectedId?"active":""}" data-select-asset="${Q(i.id)}" title="${Q(tc(i))}"><span class="small-dot ${pu(i.status)}"></span><span>${Q(i.code)}</span><small>${Q(Ql(i.status))} \xB7 ${i.source==="equipment_management_system"?"\u6BCF\u65E5\u66F4\u65B0":"\u5386\u53F2\u8BB0\u5F55"}</small></button>`).join("")}</div></section>${ab()}`}function Tp(){let n=f.data.simulation;return`<details class="iot-legacy"><summary>\u65E7\u6A21\u62DF\u5668\uFF08\u5DF2\u505C\u7528\uFF09</summary><p>\u8BE5\u64CD\u4F5C\u5165\u53E3\u5DF2\u505C\u7528\uFF0C\u4EE5\u4E0B\u4EC5\u4FDD\u7559\u5386\u53F2\u8BB0\u5F55\u3002\u4E3B\u6570\u636E\u6E90\u89C1\u4E0A\u65B9\u6570\u636E\u63A5\u5165\u8BE6\u60C5\u3002</p><dl><div><dt>\u5386\u53F2\u91C7\u96C6\u72B6\u6001</dt><dd>${Q({running:"\u8FD0\u884C\u8BB0\u5F55",paused:"\u5DF2\u6682\u505C",stopped:"\u672A\u542F\u52A8",error:"\u5F02\u5E38\u8BB0\u5F55"}[n?.state]||"\u672A\u63D0\u4F9B")}</dd></div><div><dt>\u6700\u540E\u5165\u5E93\u65F6\u95F4</dt><dd>${Q(fn(n?.last_data_at))}</dd></div><div><dt>\u7D2F\u8BA1\u5DF2\u5165\u5E93</dt><dd>${sn(n?.generated_events)} \u6761\u72B6\u6001\u4E8B\u4EF6 \xB7 ${sn(n?.generated_production)} \u6761\u751F\u4EA7\u8BB0\u5F55</dd></div></dl></details>`}function Sa(){let n=Fe.querySelector("#simulation-panel");if(!n)return;let e=f.data?.simulation,t=e?.state==="running",i=kp(),s=t&&i!==(e.pending_scenario||e.scenario),r=(m,h)=>{let d=n.querySelector(`[data-sim-field="${m}"]`);d&&d.textContent!==h&&(d.textContent=h)};r("status",{running:"\u91C7\u96C6\u4E2D",paused:"\u5DF2\u6682\u505C",stopped:"\u672A\u542F\u52A8",error:"\u91C7\u96C6\u5F02\u5E38"}[e?.state]||"\u6B63\u5728\u8BFB\u53D6"),n.querySelector('[data-sim-field="status"]').className=`status-badge ${t?"green":e?.state==="error"?"orange":"muted"}`,r("message",f.simulationBusy&&f.simulationControlAction==="start"&&!e?.run_id?"\u6B63\u5728\u8865\u5165\u8FD1 30 \u5206\u949F\u5408\u6210\u5386\u53F2\uFF0C\u8BF7\u7A0D\u5019\u2026":e?.pending_scenario?`\u5DF2\u8BF7\u6C42\u5207\u6362\u4E3A\u300C${nb[e.pending_scenario]||e.pending_scenario}\u300D\uFF0C\u4E0B\u4E2A\u5B8C\u6574\u5206\u949F\u751F\u6548\u3002`:e?.message||(e?"\u9009\u62E9\u573A\u666F\u540E\uFF0C\u542F\u52A8\u540E\u53F0\u6A21\u62DF\u91C7\u96C6\u3002":"\u6B63\u5728\u8BFB\u53D6\u6A21\u62DF\u6570\u636E\u6E90\u72B6\u6001\u2026")),r("last-data",e?.last_data_at?fn(e.last_data_at):"\u5C1A\u65E0\u5DF2\u5165\u5E93\u6570\u636E"),r("last-tick",e?.last_tick_at?`\u6700\u8FD1\u5FC3\u8DF3 ${fn(e.last_tick_at)}`:"\u540E\u53F0\u5FC3\u8DF3\u5C1A\u672A\u8FD4\u56DE"),r("records",e?`${sn(e.generated_events)} \u6761\u72B6\u6001\u4E8B\u4EF6 \xB7 ${sn(e.generated_production)} \u6761\u751F\u4EA7\u8BB0\u5F55`:"\u7B49\u5F85\u670D\u52A1\u7AEF\u56DE\u8BFB"),r("expiry",t&&e.expires_at?`\u81EA\u52A8\u6682\u505C\u4E8E ${fn(e.expires_at)}`:"\u6682\u505C\u671F\u95F4\u4E0D\u8865\u9020\u751F\u4EA7\u8BB0\u5F55"),r("window",e?.window_start&&e?.window_end?`${fn(e.window_start)} \u81F3 ${fn(e.window_end)}`:"\u5C1A\u672A\u5F62\u6210\u5B8C\u6574\u5206\u949F\u7A97\u53E3");let a=f.simulationError?.message||f.simulationPollError?.message||"";r("error",a?`${a} \u5F53\u524D\u4FDD\u7559\u6700\u540E\u4E00\u6B21\u56DE\u8BFB\u7ED3\u679C\u3002`:""),n.querySelector('[data-sim-field="error"]').hidden=!a;let o=n.querySelector("#simulation-scenario");o.disabled=f.simulationBusy||!e,document.activeElement!==o&&o.value!==i&&(o.value=i);let l=n.querySelector('[data-simulation-action="start"]');l.disabled=f.simulationBusy||!e||t&&!s,l.textContent=f.simulationBusy?"\u6B63\u5728\u63D0\u4EA4\u2026":s?"\u5207\u6362\u573A\u666F":t?"\u6B63\u5728\u91C7\u96C6":e?.state==="paused"?"\u7EE7\u7EED\u6A21\u62DF\u91C7\u96C6":"\u542F\u52A8\u6A21\u62DF\u91C7\u96C6";let c=n.querySelector('[data-simulation-action="pause"]');c.hidden=!t,c.disabled=f.simulationBusy;let u=n.querySelector("[data-simulation-case]");u.hidden=!e?.detected_case_id,u.dataset.simulationCase=e?.detected_case_id||""}function ab(){return`<details class="import-panel" ${f.importResult||f.importError?"open":""}><summary>\u5BFC\u5165\u8BBE\u5907\u4E0E\u4E1A\u52A1\u8BB0\u5F55</summary><form id="import-form"><p>\u63D0\u4EA4\u5B8C\u6574 JSON \u6570\u636E\u5305\u3002\u8BB0\u5F55\u5FC5\u987B\u5F15\u7528\u73B0\u6709\u8BBE\u5907\u53F0\u8D26\u4E2D\u7684\u8BBE\u5907 ID\uFF1B\u6570\u636E\u4E0E\u5DF2\u6709\u8BB0\u5F55\u7684\u51B2\u7A81\u7531\u670D\u52A1\u7AEF\u6821\u9A8C\u3002</p><label for="import-file">\u4ECE\u6587\u4EF6\u8F7D\u5165 JSON</label><input id="import-file" type="file" accept="application/json,.json" /><label for="import-payload">\u6570\u636E\u5305</label><textarea id="import-payload" name="payload" rows="7" required spellcheck="false" placeholder='{"kind":"events","records":[],"detect":true,"equipment_id":"\u586B\u5199\u73B0\u6709\u8BBE\u5907ID","window_start":"\u2026","window_end":"\u2026"}'>${Q(f.importDraft)}</textarea><p class="small-note">kind \u4F7F\u7528 events\uFF08\u72B6\u6001\u4E8B\u4EF6\uFF09\u6216 production\uFF08\u751F\u4EA7\u8BB0\u5F55\uFF09\uFF0Crecords \u4E3A\u8BB0\u5F55\u6570\u7EC4\u3002\u9700\u8981\u68C0\u6D4B\u77ED\u505C\u65F6\uFF0C\u540C\u65F6\u63D0\u4F9B detect\u3001equipment_id \u548C\u5B8C\u6574\u65F6\u95F4\u7A97\u53E3\uFF1B\u8FD9\u91CC\u53EA\u63D0\u4EA4\u8F93\u5165\uFF0C\u4E0D\u9884\u8BBE\u68C0\u6D4B\u7ED3\u679C\u3002</p>${f.importError?pr(f.importError):""}<button type="button" data-form-submit aria-keyshortcuts="Control+Enter Meta+Enter" class="button primary" ${f.importBusy?"disabled":""}>${f.importBusy?'<span class="spinner"></span>\u6B63\u5728\u6821\u9A8C\u5E76\u5BFC\u5165':"\u63D0\u4EA4\u5BFC\u5165\u5E76\u6821\u9A8C"}</button>${f.importResult?`<div class="import-result"><h3>\u670D\u52A1\u7AEF\u5BFC\u5165\u56DE\u6267</h3>${f.importResult.detection_error?`<p class="data-warning">\u8BB0\u5F55\u5DF2\u5BFC\u5165\uFF0C\u5F02\u5E38\u68C0\u6D4B\u672A\u5B8C\u6210\uFF1A${Q(typeof f.importResult.detection_error=="string"?f.importResult.detection_error:f.importResult.detection_error.message||JSON.stringify(f.importResult.detection_error))}</p>`:""}<pre>${Q(JSON.stringify(f.importResult,null,2))}</pre></div>`:""}</form></details>`}function ob(n){return`<button class="asset-tile ${n.id===f.selectedId?"selected":""}" data-select-asset="${Q(n.id)}"><span>${Ft("tool",21)}<b>${Q(n.code)}</b>${wi(n.status)}</span><strong>${Q(n.name)}</strong><small>${Q(n.owner)} \xB7 ${Q(n.line)}</small><small>${Q(tc(n))}</small></button>`}function mu(){let n=fu();if(!n)return fr("\u9009\u62E9\u4E00\u53F0\u8BBE\u5907","\u5728\u573A\u666F\u6216\u8BBE\u5907\u5217\u8868\u4E2D\u9009\u62E9\u3002");let e=xa(n.id).filter(ii);return`<section class="selected-device"><div class="section-heading"><span class="asset-code">${Q(n.code)}</span>${wi(n.status)}</div><h2>${Q(n.name)}</h2><p>${Q(n.line)} \xB7 ${Q(n.owner)}</p><p class="small-note">${Q(tc(n))}</p><div class="selected-facts"><span>\u5F53\u524D\u5F02\u5E38<strong>${e.length?Q(e[0].title):"\u6682\u65E0\u672A\u7ED3\u5F02\u5E38"}</strong></span><span>${["iot_node_red","equipment_management_system"].includes(n.source)?"\u6E90\u6570\u636E\u65F6\u95F4":"\u6570\u636E\u66F4\u65B0\u65F6\u95F4"}<strong>${Q(fn(n.updated_at))}</strong></span></div>${f.detailLoading?'<p class="loading-inline"><span class="spinner"></span>\u6B63\u5728\u8BFB\u53D6\u8BBE\u5907\u8BC1\u636E</p>':f.detail?.id===n.id?`<div class="selected-metric"><span>\u6240\u9009\u7A97\u53E3 OEE</span><strong>${du(f.detail.metrics.oee)}</strong></div>`:""}<button class="button primary full" data-page="asset">\u8FDB\u5165\u8BBE\u5907\u5DE5\u4F5C\u53F0${Ft("arrow",17)}</button>${e.length?`<button class="button subtle full" data-open-case="${Q(e[0].id)}">\u627E\u603B\u7BA1\u4E86\u89E3</button>`:""}</section>`}function Gp(){let n=f.detail?.id===f.selectedId?f.detail:fu(),e=`<label class="asset-picker"><span class="sr-only">\u9009\u62E9\u8BBE\u5907</span><select id="asset-select">${f.data.assets.map(a=>`<option value="${Q(a.id)}" ${a.id===f.selectedId?"selected":""}>${Q(a.code)} \xB7 ${Q(a.name)}</option>`).join("")}</select></label>`;if(!n)return`${Ap("\u8BBE\u5907\u5DE5\u4F5C\u53F0","\u8BBE\u5907\u4E8B\u5B9E\u3001\u8FD0\u884C\u8BC1\u636E\u4E0E\u5904\u7F6E\u8BB0\u5F55\u3002",e)}${fr("\u6CA1\u6709\u53EF\u67E5\u770B\u7684\u8BBE\u5907","\u5EFA\u7ACB\u53F0\u8D26\u5E76\u7ED1\u5B9A\u91C7\u96C6\u6E90\u540E\u5F00\u59CB\u4F7F\u7528\u3002")}`;let t=f.detail?.id===f.selectedId?f.detail:null,i=xa(n.id),s=t?.metrics||{},r=t?.production_context||{};return`${Ap(n.name,`${n.code} \xB7 ${n.line} \xB7 ${n.owner}\u8D1F\u8D23`,e)}
  <div class="device-status-line">${wi(n.status)}<span>${Q(fn(n.updated_at))}</span><span>${Q(r.product_name||r.product||r.product_id||"\u4EA7\u54C1\u672A\u58F0\u660E")} / ${Q(r.operation_name||r.operation||r.operation_id||"\u5DE5\u5E8F\u672A\u58F0\u660E")}</span><span class="source-tag">${Q(tc(n))}</span></div>
  <div id="asset-telemetry">${wp(n)}</div><div class="live-detail-error">${f.detailError?pr(f.detailError,'<button class="button" data-action="retry-asset">\u91CD\u65B0\u8BFB\u53D6\u8BBE\u5907</button>'):""}</div>
  ${f.detailLoading?'<div class="loading-inline" role="status"><span class="spinner"></span>\u6B63\u5728\u8BFB\u53D6\u8BC1\u636E\u4E0E\u6307\u6807\u2026</div>':""}
  <div class="device-layout"><div class="device-main"><div class="device-top"><div class="device-model"><div id="device-scene" class="device-scene"></div><div class="model-caption">${["iot_node_red","equipment_management_system"].includes(n.source)?"\u8BBE\u5907\u51E0\u4F55\u6A21\u578B \xB7 \u65E5\u5FEB\u7167\u72B6\u6001":"\u8BBE\u5907\u51E0\u4F55\u6A21\u578B \xB7 \u52A8\u4F5C\u793A\u610F"}</div></div><section class="oee-panel"><div class="section-heading"><h2>\u8BBE\u5907\u6548\u7387</h2><span>${Q(s.window_label||f.detail?.window_label||"\u670D\u52A1\u7AEF\u6307\u6807\u7A97\u53E3")}</span></div><div class="oee-primary"><strong>${du(s.oee)}</strong><span>OEE</span></div><div class="oee-breakdown">${[["availability","\u53EF\u7528\u7387"],["performance","\u6027\u80FD"],["quality","\u8D28\u91CF"]].map(([a,o])=>`<div><span>${o}</span><strong>${du(s[a])}</strong><div class="metric-track"><span style="width:${Math.max(0,Math.min(100,Aa(s[a])||0))}%"></span></div></div>`).join("")}</div>${s.quality_flags?.length?`<p class="data-warning">${Ft("alert",15)}${Q(s.quality_flags.join("\uFF1B"))}</p>`:'<p class="small-note">\u7531\u4E1A\u52A1\u670D\u52A1\u6309\u751F\u4EA7\u6BB5\u8BA1\u7B97\uFF0C\u70B9\u51FB\u4E0B\u65B9\u8F93\u5165\u6838\u5BF9\u53E3\u5F84\u3002</p>'}</section></div>
  ${Du(n)}
  <div class="local-tabs" role="tablist" aria-label="\u8BBE\u5907\u8D44\u6599">${[["evidence","\u7A97\u53E3\u8BC1\u636E"],["history","\u5168\u90E8\u4E8B\u4EF6"],["metrics","\u6307\u6807\u8F93\u5165"],["registry","\u8BBE\u5907\u53F0\u8D26"]].map(([a,o])=>`<button role="tab" aria-selected="${f.activeAssetTab===a}" data-asset-tab="${a}" class="${f.activeAssetTab===a?"active":""}">${o}</button>`).join("")}</div>
  <section class="evidence-workspace">${f.activeAssetTab==="metrics"?cb(s,r):f.activeAssetTab==="registry"?db(n):lb(f.activeAssetTab==="history"?t?.events||[]:t?.window_events||[],f.activeAssetTab==="history"?"\u5168\u90E8\u5386\u53F2\u4E8B\u4EF6":`\u6307\u6807\u7A97\u53E3 ${s.window_label||""}`)}</section></div>
  <aside class="device-aside"><section class="context-panel"><div class="section-heading"><h2>\u5F53\u524D\u5904\u7F6E</h2><span>${i.filter(ii).length} \u9879\u672A\u7ED3</span></div>${i.length?i.map(a=>`<div class="case-context"><div>${wi(a.status)}<span class="object-id">${Q(a.id)}</span></div><h3>${Q(a.title)}</h3><dl><div><dt>\u4E1A\u52A1\u8D23\u4EFB\u4EBA</dt><dd title="${Q(a.owner_id||a.owner)}">${Q(a.owner)}</dd></div><div><dt>\u9A8C\u6536\u4EBA</dt><dd title="${Q(a.acceptor_id||a.acceptor)}">${Q(a.acceptor)}</dd></div></dl><button class="button full" data-open-case="${Q(a.id)}">\u627E\u603B\u7BA1\u4E86\u89E3${Ft("arrow",16)}</button></div>`).join(""):fr("\u6682\u65E0\u5F85\u5904\u7406\u4E8B\u9879","\u53EF\u4EE5\u5148\u54A8\u8BE2\u987E\u95EE\uFF0C\u6838\u5BF9\u662F\u5426\u9700\u8981\u53D1\u8D77\u5904\u7F6E\u3002")}</section><section class="consult-panel"><h2>\u4EA4\u7ED9\u603B\u7BA1\u534F\u8C03</h2><p>\u8BF4\u51FA\u9700\u6C42\uFF0C\u603B\u7BA1\u5B89\u6392\u987E\u95EE\u5206\u6790\uFF0C\u6309\u786E\u8BA4\u7684\u65B9\u6848\u7EE7\u7EED\u5904\u7406\u3002</p><button class="button primary full" data-consult="manager">\u4EA4\u7ED9\u603B\u7BA1${Ft("arrow",16)}</button><button class="button full" data-consult="efficiency_advisor">\u751F\u4EA7\u635F\u5931\u5206\u6790\u5458${Ft("arrow",16)}</button><button class="button full" data-consult="maintenance_advisor">\u8BBE\u5907\u8BCA\u65AD\u5458${Ft("arrow",16)}</button><div class="small-note">${f.data.capabilities.ai_available?"\u5C06\u8C03\u7528\u5F53\u524D\u8FDE\u63A5\u7684\u6A21\u578B\uFF0C\u4E0D\u751F\u6210\u9884\u8BBE\u56DE\u7B54\u3002":"AI \u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BBE\u5907\u8BC1\u636E\u4ECD\u53EF\u67E5\u770B\u3002"}</div></section></aside></div>`}function Ap(n,e,t=""){return`<div class="page-heading"><div><h1>${Q(n)}</h1><p>${Q(e)}</p></div>${t}</div>`}function lb(n,e="\u8FD0\u884C\u4E8B\u4EF6"){return n.length?`<div class="section-heading"><h2>${Q(e)}</h2><span>${n.length} \u6761\u8BB0\u5F55</span></div><div class="event-track" aria-label="\u4E8B\u4EF6\u987A\u5E8F\u793A\u610F\uFF0C\u4E0D\u4EE3\u8868\u7B49\u6BD4\u4F8B\u65F6\u957F">${n.slice(0,40).map(t=>`<span class="event-segment ${pu(t.state||t.status||(t.type==="short_stop"?"stopped":"unknown"))}" title="${Q(t.type||t.state||t.status)}"></span>`).join("")}</div><p class="small-note">\u4EE5\u4E0B\u662F\u670D\u52A1\u7AEF\u8FD4\u56DE\u7684\u4E8B\u4EF6\u8BB0\u5F55\uFF1B\u72B6\u6001\u5E8F\u5217\u53EA\u6807\u8BB0\u987A\u5E8F\uFF0C\u65F6\u95F4\u4E0E\u65F6\u957F\u4EE5\u8BB0\u5F55\u4E3A\u51C6\u3002</p><div class="table-wrap"><table><thead><tr><th>\u53D1\u751F\u65F6\u95F4</th><th>\u4E8B\u4EF6 / \u72B6\u6001</th><th>\u6301\u7EED\u65F6\u95F4</th><th>\u6765\u6E90 / \u8BC1\u636E</th></tr></thead><tbody>${n.map(t=>`<tr><td>${Q(fn(t.started_at||t.start||t.timestamp||t.occurred_at))}</td><td><strong>${Q(t.title||t.name||(t.type==="short_stop"?"\u77ED\u505C":Ql(t.state||t.status||t.type)))}</strong>${t.reason?`<small>${Q(t.reason)}</small>`:""}</td><td>${Aa(t.duration_seconds??t.duration_sec)!==null?`${sn(t.duration_seconds??t.duration_sec)} \u79D2`:t.duration_minutes!=null?`${sn(t.duration_minutes)} \u5206\u949F`:"\u672A\u63D0\u4F9B"}</td><td><span>${Q(t.source||t.source_id||"\u6765\u6E90\u672A\u58F0\u660E")}</span><small>${Q(t.evidence_id||t.id||"")}${t.quality?` \xB7 ${Q(t.quality)}`:""}</small></td></tr>`).join("")}</tbody></table></div>`:fr("\u5F53\u524D\u8BBE\u5907\u6CA1\u6709\u8FD0\u884C\u4E8B\u4EF6","\u91C7\u96C6\u4E8B\u4EF6\u5199\u5165\u540E\uFF0C\u53EF\u5728\u6B64\u6838\u5BF9\u72B6\u6001\u3001\u77ED\u505C\u65F6\u957F\u4E0E\u8BC1\u636E\u6765\u6E90\u3002")}function cb(n,e){return`<div class="section-heading"><h2>\u6307\u6807\u8F93\u5165\u4E0E\u53E3\u5F84</h2><span>${Q(n.version||n.formula_version||"\u7248\u672C\u672A\u63D0\u4F9B")}</span></div><dl class="fact-grid">${[["\u8BA1\u5212\u751F\u4EA7\u65F6\u95F4",`${sn(n.planned_minutes)} \u5206\u949F`],["\u8FD0\u884C\u65F6\u95F4",`${sn(n.run_minutes)} \u5206\u949F`],["\u7406\u60F3\u5355\u4EF6\u8282\u62CD",`${sn(n.ideal_cycle_seconds)} \u79D2`],["\u603B\u4EA7\u91CF",`${sn(n.total_count)} \u4EF6`],["\u4E00\u6B21\u5408\u683C\u91CF",`${sn(n.good_count)} \u4EF6`],["\u77ED\u505C\u6B21\u6570",`${sn(n.short_stop_count)} \u6B21`],["\u77ED\u505C\u7D2F\u8BA1",`${sn(n.short_stop_minutes)} \u5206\u949F`],["\u8282\u62CD\u7248\u672C",e.cycle_version||n.cycle_version||"\u672A\u63D0\u4F9B"]].map(([t,i])=>`<div><dt>${t}</dt><dd>${Q(i)}</dd></div>`).join("")}</dl><div class="method-note"><strong>\u53E3\u5F84\u8BF4\u660E</strong><p>${Q(n.method_note||"\u540C\u4EA7\u54C1\u5DE5\u5E8F\uFF1AOEE = \u7406\u60F3\u8282\u62CD \xD7 \u4E00\u6B21\u5408\u683C\u91CF \xF7 \u8BA1\u5212\u751F\u4EA7\u65F6\u95F4\u3002\u77ED\u505C\u5F52\u7C7B\u4EE5\u5F53\u524D\u89C4\u5219\u4E3A\u51C6\uFF0C\u4E0D\u91CD\u590D\u6263\u51CF\u53EF\u7528\u7387\u548C\u6027\u80FD\uFF1B\u6DF7\u4EA7\u54C1\u6309\u751F\u4EA7\u6BB5\u52A0\u6743\u3002\u7F3A\u5C11\u5FC5\u8981\u8F93\u5165\u65F6\uFF0C\u4E0D\u5C06\u7F3A\u6570\u5F53\u96F6\u3002")}</p></div>`}function db(n){return`<h2>\u8BBE\u5907\u53F0\u8D26</h2><dl class="fact-grid">${[["\u8BBE\u5907\u7F16\u53F7",n.code],["\u540D\u79F0",n.name],["\u8BBE\u5907\u7C7B\u522B",n.type],["\u578B\u53F7",n.model||"\u672A\u7EF4\u62A4"],["\u6240\u5C5E\u4EA7\u7EBF",n.line],["\u8D23\u4EFB\u4EBA",n.owner],["\u4F4D\u7F6E",n.location||"\u672A\u7EF4\u62A4"],["\u6570\u636E\u8FDE\u63A5",Ql(n.connection_status)]].map(([e,t])=>`<div><dt>${e}</dt><dd>${Q(t)}</dd></div>`).join("")}</dl><p class="small-note">\u8BBE\u5907\u7F16\u53F7\u540C\u65F6\u7ED1\u5B9A\u4E09\u7EF4\u5BF9\u8C61\u3001\u91C7\u96C6\u4E8B\u5B9E\u3001\u5206\u6790\u4E0E\u5DE5\u5355\u3002</p>`}function Ei(){return f.replyContext?.case_id||null}function ub(){let n=Ei();return n?f.managerCaseDetails[n]||[...f.managerActiveTurns,...f.managerTurns].reverse().find(e=>e.case&&(!n||e.case_id===n)&&e.status!=="answered")?.case||(n===f.selectedCaseId?jl():f.data.cases.find(e=>e.id===n)):null}async function hb(){try{if(!globalThis.__FACTORY_OPEN_PEERS__)throw new Error("\u8BF7\u5728 DeepWorks \u5DE5\u4F5C\u533A\u6253\u5F00\u300C\u6211\u7684 AI \u540C\u4E8B\u300D\u3002");await globalThis.__FACTORY_OPEN_PEERS__()}catch(n){rn(n.message)}}function Hp(n=!0){Mi||tb().then(()=>At());let e=ub(),t=f.data.assets.find(o=>o.id===(e?.asset_id||e?.equipment_id)),i=_t.managerData(),s=fb(i.persistedMessages||[]),r=f.managerLoaded&&_t.state.loaded&&!f.managerReadError&&!_t.state.readError;i.isChatUnread=(o,l)=>Mi?.unread(o,l,{complete:r,viewing:n&&o===f.chatTarget&&f.page==="ai"&&lu&&!document.hidden&&!_t.state.panel});let a=f.outgoingMessages.find(o=>o.recipient===f.chatTarget&&o.deliveryState==="sending");return _p({...i,...s,outgoingMessages:f.outgoingMessages,sendingChat:!!a,employeeEnabled:!0,employeeToolbar:_t.toolbar(Ei()),replyContext:f.replyContext,item:e,asset:t,targetRole:f.chatTarget,selectedJobId:f.selectedJobId,renderDirectJob:yb,cases:f.data.cases,selectedCaseId:Ei(),loading:f.managerLoading,error:f.managerError||!_t.state.panel&&_t.state.error!==_t.state.readError&&_t.state.error,readError:f.managerReadError||_t.state.readError,awaitingReceipt:ou?.unconfirmed(f.chatTarget),retryReceipt:ou?.retryAvailable(f.chatTarget),busy:f.managerBusy||f.operationBusy,connected:f.data.capabilities.ai_available,roles:Op.filter(o=>ec(o.id)),draft:f.managerDraft,expanded:f.managerExpanded,sourceNote:f.data.ems?"\u6570\u636E\u6765\u81EA\u8BBE\u5907\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u6BCF\u65E5\u540C\u6B65\u3002\u73B0\u573A\u5904\u7406\u7531\u4EBA\u5458\u786E\u8BA4\u3002":"\u6570\u636E\u4EE5\u5DF2\u4FDD\u5B58\u7684\u4E1A\u52A1\u8BB0\u5F55\u4E3A\u51C6\u3002"},{draft:f.managerDraft,expanded:f.managerExpanded})}function fb(n){let e={persistedMessages:n,turns:f.managerTurns,activeTurns:f.managerActiveTurns,jobs:f.jobs},t=f.outgoingMessages.filter(a=>a.recipient===f.chatTarget&&a.before);if(!t.length)return e;let i=new Set,s=new Set,r=new Set;for(let a of t)if(!a.fact_turn_id){for(let o of n)!a.message_id&&o.author==="user"&&o.kind==="request"&&o.recipient===a.recipient&&o.text===a.text&&!a.before.has(o.id)&&(r.add(o.id),o.turn_id&&i.add(o.turn_id));if(a.recipient==="manager")for(let o of[...e.turns,...e.activeTurns])o.message===a.text&&!a.before.has(o.id)&&i.add(o.id);else for(let o of e.jobs){if(a.requestKey&&o.input?.explicit_request?.idempotency_key===a.requestKey){a.job_id=o.id;continue}!o.input?.explicit_request&&o.role===a.recipient&&(o.question||o.input?.question)===a.text&&!a.before.has(o.id)&&!o.input?.turn_id&&!o.input?.manager_turn_id&&s.add(o.id)}}return{persistedMessages:n.filter(a=>!r.has(a.id)&&!i.has(a.turn_id)&&!s.has(a.job_id)),turns:e.turns.filter(a=>!i.has(a.id)),activeTurns:e.activeTurns.filter(a=>!i.has(a.id)),jobs:e.jobs.filter(a=>!s.has(a.id))}}function pb(){return`<div id="manager-surface">${Hp()}</div>`}function si(n=Ei(),e=f.chatTarget){return JSON.stringify([n||null,e])}function nc(){let n=Fe.querySelector("#manager-message");n&&(f.managerDraft=n.value),f.chatDrafts[si()]=f.managerDraft}function Cp(n){f.managerBusy||f.operationBusy||!(n==="manager"||ec(n))||(nc(),n!==f.chatTarget&&f.replyContext?.fact_turn_id&&(f.replyContext=null,f.managerCaseId=null,f.chatContextVersion=(f.chatContextVersion||0)+1),f.chatTarget=n,f.managerError=null,n!=="manager"&&(f.role=n),f.selectedJobId=null,f.approvedProposal=null,f.managerDraft=f.chatDrafts[si()]||"",At(!1,!0))}function mb(){let n=Fe.querySelector("#manager-message")?.value??f.managerDraft;nc(),f.replyContext=null,f.managerCaseId=null,f.chatContextVersion=(f.chatContextVersion||0)+1,f.managerDraft=n,f.chatDrafts[si()]=n,At(!1)}function vs(n="manager",e=null,t=null){f.chatContextVersion=(f.chatContextVersion||0)+1,nc(),f.aiMode="manager",f.chatTarget=n;let i=f.managerCaseDetails[e]||f.data.cases.find(r=>r.id===e),s=i?f.data.assets.find(r=>r.id===(i.asset_id||i.equipment_id)):fu();f.replyContext=e||s?{case_id:e||null,equipment_id:t?.equipment_id||i?.asset_id||i?.equipment_id||s?.id,title:t?.title||i?.title||"\u8BBE\u5907\u60C5\u51B5"}:null,f.managerCaseId=e||null,n!=="manager"&&(f.role=n),f.selectedCaseId=e||null,f.caseDetail=f.managerCaseDetails[e]||null,i&&(f.selectedId=i.asset_id||i.equipment_id),f.selectedJobId=null,f.approvedProposal=null,f.managerDraft=f.chatDrafts[si()]||(!e&&s?`\u8BF7\u5E2E\u6211\u4E86\u89E3 ${s.id} \u7684\u8BBE\u5907\u60C5\u51B5\u3002`:""),f.chatDrafts[si()]=f.managerDraft,wa("ai")}function gb(n){return f.actionDraft?`<div id="case-action-area">${Mb()}</div>`:f.observationEditing?Rp(n):`<details class="employee-business" data-employee-disclosure="${Q(n.id)}:orders" ${_t.state.disclosures[n.id+":orders"]?"open":""}><summary>\u5DE5\u5355\u4E0E\u73B0\u573A\u8BB0\u5F55</summary>${(n.work_orders||[]).map(e=>bb({...e,allowed_actions:[]})).join("")||'<p class="small-note">\u65B9\u6848\u786E\u8BA4\u540E\uFF0C\u603B\u7BA1\u4F1A\u7EE7\u7EED\u5B89\u6392\u5E76\u56DE\u8BFB\u5DE5\u5355\u3002</p>'}</details><details class="employee-business" data-employee-disclosure="${Q(n.id)}:observation" ${_t.state.disclosures[n.id+":observation"]?"open":""}><summary>\u89C2\u5BDF\u4E0E\u9A8C\u6536\u4F9D\u636E</summary>${Rp({...n,status:"closed"})}${qp(n)}</details>`}function _b(){let n=[...f.managerTurns,...f.managerActiveTurns];return{managedJobIds:n.flatMap(e=>[...e.child_job_ids||[],...(e.child_jobs||[]).map(t=>t.id)]),managedAnalysisIds:n.map(e=>e.proposal_analysis_id).filter(Boolean)}}function Ma(n){let e=ei(n),t=f.managerCaseDetails[e]||(jl()?.id===e?jl():f.data.cases.find(i=>i.id===e));return Mp(n,t,_b())}function yb(n){let e=ib(n),t=Op.find(r=>r.id===n.role),i=e?.proposal||e?.work_order_proposal||n.proposal,s=n.tool_receipts||e?.tool_receipts||[];return`<article class="job-record"><div class="job-title"><span>${t?.name||(n.kind==="employee"?"\u7EF4\u4FEE\u8BA1\u5212\u5458":"AI \u4F5C\u4E1A")}</span>${wi(n.status)}<small>${Q(fn(n.created_at))}</small></div>${n.question?`<div class="user-question">${Q(n.question)}</div>`:""}<div class="job-status"><span>${ba(n)?Ft(n.status==="failed"?"alert":"check",16):'<span class="spinner"></span>'}</span><p>${Q(n.progress_message||n.progress||n.message||(ba(n)?"\u672C\u6B21\u4F5C\u4E1A\u72B6\u6001\u5DF2\u7531\u670D\u52A1\u7AEF\u8FD4\u56DE\u3002":"\u4F5C\u4E1A\u6B63\u5728\u8FD0\u884C\uFF0C\u7B49\u5F85\u6A21\u578B\u4E0E\u5DE5\u5177\u8FD4\u56DE\u3002"))}</p></div>
  ${n.poll_error?pr(n.poll_error):""}${n.error?pr(typeof n.error=="string"?n.error:n.error.message||"\u672C\u6B21\u4F5C\u4E1A\u672A\u5B8C\u6210\uFF0C\u8BF7\u5C55\u5F00\u8C03\u7528\u8BCA\u65AD\u5E76\u63D0\u4F9B\u4F5C\u4E1A\u7F16\u53F7\u3002"):""}${n.error?.details&&typeof n.error.details=="object"?`<details class="job-diagnostics"><summary>\u8C03\u7528\u8BCA\u65AD</summary><pre class="result-json">${Q(JSON.stringify(n.error.details,null,2))}</pre></details>`:""}
  ${e?`<div class="analysis-result">${typeof e=="string"?`<div class="result-prose">${Q(e)}</div>`:`<div class="result-prose">${Q(e.summary||e.conclusion||e.answer||"\u8BF7\u5C55\u5F00\u67E5\u770B\u8FD9\u4F4D\u540C\u4E8B\u7684\u5206\u6790\u3002")}</div><details class="specialist-evidence"><summary>\u67E5\u770B\u4F9D\u636E\u548C\u8BE6\u7EC6\u8BF4\u660E</summary>${Wp({...e,summary:null,conclusion:null,answer:null,content:null,text:null})}</details>`}</div>`:""}
  ${i?vb(i,n):""}
  ${s.length?`<details class="tool-receipts"><summary>\u67E5\u770B\u529E\u7406\u56DE\u6267\uFF08${s.length}\uFF09</summary>${s.map(r=>`<div class="tool-receipt"><div><strong>${Q(r.tool||r.name||r.action||"\u4E1A\u52A1\u5DE5\u5177")}</strong>${wi(r.error||r.isError?"failed":r.status||(r.persisted===!0?"succeeded":"unknown"))}</div><p>${Q(r.summary||r.message||"")}</p><pre>${Q(JSON.stringify(r.result||r.output||r,null,2))}</pre></div>`).join("")}</details>`:""}
  ${n.role&&n.role!=="maintenance_coordinator"&&e&&!i&&["succeeded","success","completed"].includes(n.status)?`<button class="button" data-manager-coordinate="${Q(ei(n)||"")}">\u627E\u603B\u7BA1\u8DDF\u8FDB${Ft("arrow",16)}</button>`:""}<div class="job-id">\u4F5C\u4E1A ${Q(n.id)}${n.analysis_id?` \xB7 \u5206\u6790 ${Q(n.analysis_id)}`:""}</div></article>`}function Wp(n){let e=n.summary||n.conclusion||n.answer||n.content||n.text,t=n.hypotheses||n.candidate_causes||[],i=n.evidence||n.evidence_refs||n.sources||[],s=n.recommendations||n.next_steps||n.checks||[],r=n.limitations||n.missing_information||n.uncertainties||[],a=Array.isArray(t)?t:[];return`${e?`<div class="result-prose">${Q(typeof e=="string"?e:JSON.stringify(e,null,2))}</div>`:""}${a.length?`<section><h3>\u539F\u56E0\u5047\u8BBE</h3>${a.map((o,l)=>`<div class="hypothesis"><span>${l+1}</span><div><strong>${Q(typeof o=="string"?o:o.title||o.cause||o.hypothesis||o.name||"\u5F85\u6838\u5B9E\u5047\u8BBE")}</strong>${typeof o=="object"?`<p>${Q(o.reason||o.reasoning||o.explanation||o.basis||"")}</p>${o.evidence?`<small>\u4F9D\u636E\uFF1A${Q(Array.isArray(o.evidence)?o.evidence.join("\u3001"):o.evidence)}</small>`:""}${o.verification||o.validation?`<p>\u68C0\u67E5\uFF1A${Q(o.verification||o.validation)}</p>`:""}`:""}</div></div>`).join("")}</section>`:""}${Array.isArray(s)&&s.length?`<section><h3>\u5EFA\u8BAE\u4E0B\u4E00\u6B65</h3><ol class="result-list">${s.map(o=>`<li>${Q(typeof o=="string"?o:o.action||o.description||o.step||JSON.stringify(o))}</li>`).join("")}</ol></section>`:""}${Array.isArray(i)&&i.length?`<section><h3>\u8BC1\u636E\u5F15\u7528</h3><div class="evidence-refs">${i.map(o=>`<div>${Ft("file",15)}<span>${Q(typeof o=="string"?o:o.title||o.id||o.evidence_id||o.source||JSON.stringify(o))}${typeof o=="object"&&(o.description||o.detail)?`<small>${Q(o.description||o.detail)}</small>`:""}</span></div>`).join("")}</div></section>`:""}${Array.isArray(r)&&r.length?`<section class="limitations"><h3>\u4ECD\u9700\u6838\u5B9E</h3><ul>${r.map(o=>`<li>${Q(typeof o=="string"?o:JSON.stringify(o))}</li>`).join("")}</ul></section>`:""}${!e&&!a.length&&!s.length&&!i.length?`<pre class="result-json">${Q(JSON.stringify(n,null,2))}</pre>`:""}`}function vb(n,e){let t=Ma(e),i=t.approved,s=t.eligible,r=typeof n=="string"?n:n.description||n.scope||"";return`<section class="proposal-card"><h3>${Q(n.title||"\u5904\u7F6E\u65B9\u6848")}</h3><p class="result-prose">${Q(r)}</p>${n.steps?.length?`<ol>${n.steps.map(a=>`<li>${Q(typeof a=="string"?a:a.description||a.title)}</li>`).join("")}</ol>`:""}${n.acceptance_criteria?`<p>\u5B8C\u6210\u6761\u4EF6\uFF1A${Q(n.acceptance_criteria)}</p>`:""}${s?`<button type="button" class="button primary" data-chat-approve="${Q(e.id)}" ${f.operationBusy?"disabled":""}>\u6279\u51C6\u8FD9\u4EFD\u65B9\u6848</button>`:i?`<button type="button" class="button primary" data-chat-run="${Q(e.id)}" ${f.operationBusy?"disabled":""}>\u5B89\u6392\u5458\u5DE5\u521B\u5EFA\u5DE5\u5355</button>`:`<p class="small-note">${Q(t.reason||"\u8FD9\u4EFD\u65B9\u6848\u4FDD\u7559\u4F5C\u5386\u53F2\u8BB0\u5F55\u3002")}</p>`}<p class="small-note">\u73B0\u573A\u5904\u7406\u548C\u9A8C\u6536\u7531\u76F8\u5E94\u4EBA\u5458\u786E\u8BA4\u3002</p></section>`}function xb(n,e=!1){return{loading:e,expanded:f.workflowExpanded,error:f.workflowError,view:f.workflowView,selectedNodeId:f.workflowSelectedNodes[n?.id],renderAnalysis:Wp,renderObservation:qp}}function qp(n){let e=n.observation;if(!e)return"";let t=e.baseline||{},i=e.recovery||{},s=e.plan||{},r=(_,x="")=>Aa(_)===null?"\u672A\u63D0\u4F9B":`${new Intl.NumberFormat("zh-CN",{maximumFractionDigits:2}).format(Number(_))}${x}`,a=_=>{if(!_)return"\u672A\u63D0\u4F9B";let x=new Date(_);return Number.isNaN(x.getTime())?String(_):x.toLocaleString("zh-CN",{timeZone:"Asia/Shanghai",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})},o=_=>`${a(_.start)} \u81F3 ${a(_.end)}`,l=[["\u65F6\u95F4\u7A97\uFF08\u5317\u4EAC\u65F6\u95F4\uFF09",o(t),o(i)],...t.production_shift||i.production_shift?[["\u73ED\u6B21",t.production_shift||"\u5F85\u6838\u5B9E",i.production_shift||"\u5F85\u6838\u5B9E"]]:[],["\u8BA1\u5212\u751F\u4EA7\u65F6\u95F4",r(t.T," \u5206\u949F"),r(i.T," \u5206\u949F")],["\u77ED\u505C\u6B21\u6570",r(t.short_stop_count," \u6B21"),r(i.short_stop_count," \u6B21")],["\u77ED\u505C\u7D2F\u8BA1\u65F6\u957F",r(t.short_stop_minutes," \u5206\u949F"),r(i.short_stop_minutes," \u5206\u949F")],...t.short_stops_per_run_hour!=null||i.short_stops_per_run_hour!=null?[["\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u6B21\u6570",r(t.short_stops_per_run_hour," \u6B21"),r(i.short_stops_per_run_hour," \u6B21")],["\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u65F6\u957F",r(t.short_stop_minutes_per_run_hour," \u5206\u949F"),r(i.short_stop_minutes_per_run_hour," \u5206\u949F")]]:[],["OEE",r(t.OEE_pct,"%"),r(i.OEE_pct,"%")],["\u4EF6\u6570\u826F\u7387",r(t.Q_pct,"%"),r(i.Q_pct,"%")],["\u6570\u636E\u8986\u76D6\u7387",r(t.data_coverage_pct,"%"),r(i.data_coverage_pct,"%")]],c={incomplete_or_invalid_metrics:"\u6BD4\u8F83\u6307\u6807\u4E0D\u5B8C\u6574\u6216\u672A\u901A\u8FC7\u6570\u636E\u6821\u9A8C",product_operation_or_cycle_not_comparable:"\u4EA7\u54C1\u3001\u5DE5\u5E8F\u6216\u6807\u51C6\u8282\u62CD\u4E0D\u5177\u5907\u53EF\u6BD4\u6027",overlapping_comparison_windows:"\u57FA\u51C6\u4E0E\u6062\u590D\u65F6\u95F4\u7A97\u53E3\u91CD\u53E0",insufficient_or_unequal_planned_window:"\u89C2\u5BDF\u65F6\u957F\u4E0D\u8DB3\uFF0C\u6216\u4E24\u6BB5\u8BA1\u5212\u751F\u4EA7\u65F6\u95F4\u4E0D\u4E00\u81F4",shift_unknown_or_not_comparable:"\u9700\u8981\u76F8\u540C\u73ED\u6B21\u7684\u751F\u4EA7\u8BB0\u5F55",insufficient_planned_window:"\u53EF\u6BD4\u751F\u4EA7\u65F6\u95F4\u5C1A\u672A\u8FBE\u5230\u7EA6\u5B9A\u5206\u949F\u6570",no_planned_or_running_time:"\u7A97\u53E3\u5185\u7F3A\u5C11\u6392\u4EA7\u6216\u6709\u6548\u8FD0\u884C\u65F6\u95F4",short_stop_frequency_increased:"\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u6B21\u6570\u4ECD\u9AD8\u4E8E\u57FA\u7EBF",short_stops_not_improved:"\u77ED\u505C\u65F6\u957F\u964D\u4F4E\u5C1A\u672A\u8FBE\u5230\u7EA6\u5B9A\u95E8\u69DB",baseline_has_no_short_stops:"\u57FA\u51C6\u7A97\u53E3\u6CA1\u6709\u77ED\u505C\uFF0C\u65E0\u6CD5\u8BA1\u7B97\u964D\u4F4E\u5E45\u5EA6",quality_unavailable:"\u7F3A\u5C11\u53EF\u6BD4\u8F83\u7684\u8D28\u91CF\u6570\u636E",quality_below_agreed_tolerance:"\u6062\u590D\u826F\u7387\u4F4E\u4E8E\u7EA6\u5B9A\u8D28\u91CF\u5BB9\u5DEE"},u=Array.isArray(e.reasons)?e.reasons:e.reasons?[e.reasons]:[],m=e.passed===!0,h=e.passed===!1,d=e.synthetic===!0||t.synthetic===!0||i.synthetic===!0;return`<section class="task-section"><div class="section-heading"><h3>\u6062\u590D\u89C2\u5BDF</h3>${wi(m?"\u89C2\u5BDF\u6761\u4EF6\u901A\u8FC7":e.comparable===!1?"\u7B49\u5F85\u53EF\u6BD4\u73ED\u6B21":h?"\u89C2\u5BDF\u6761\u4EF6\u4E0D\u901A\u8FC7":"\u89C2\u5BDF\u7ED3\u679C\u672A\u77E5",m?"green":h?"orange":"muted")}</div><div class="table-wrap" tabindex="0" aria-label="\u57FA\u51C6\u4E0E\u6062\u590D\u89C2\u5BDF\u5BF9\u6BD4"><table><thead><tr><th scope="col">\u6BD4\u8F83\u9879\u76EE</th><th scope="col">\u57FA\u51C6</th><th scope="col">\u6062\u590D</th></tr></thead><tbody>${l.map(([_,x,g])=>`<tr><th scope="row">${Q(_)}</th><td>${Q(x)}</td><td>${Q(g)}</td></tr>`).join("")}</tbody></table></div><dl class="fact-grid"><div><dt>${s.comparison_basis==="per_run_hour"?"\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u65F6\u957F\u964D\u4F4E":"\u77ED\u505C\u7D2F\u8BA1\u65F6\u957F\u964D\u4F4E"}</dt><dd>${Q(r(e.short_stop_reduction_pct,"%"))}</dd></div><div><dt>\u7EA6\u5B9A\u964D\u4F4E\u76EE\u6807</dt><dd>${Q(r(s.short_stop_reduction_pct,"%"))}</dd></div><div><dt>\u6700\u5C11\u89C2\u5BDF\u65F6\u95F4</dt><dd>${Q(r(s.minimum_minutes," \u5206\u949F"))}</dd></div><div><dt>\u8D28\u91CF\u5BB9\u5DEE</dt><dd>${Q(r(s.quality_tolerance_pp," \u4E2A\u767E\u5206\u70B9"))}</dd></div></dl>${u.length?`<div class="limitations"><h4>\u4ECD\u672A\u6EE1\u8DB3\u7684\u6761\u4EF6</h4><ul>${u.map(_=>`<li>${Q(typeof _=="string"?c[_]||_:JSON.stringify(_))}</li>`).join("")}</ul></div>`:""}${e.note?`<p>${Q(e.note)}</p>`:""}<p class="small-note">\u6570\u636E\u89C2\u5BDF\u7528\u4E8E\u6838\u9A8C\u5904\u7F6E\u6548\u679C\uFF0C\u4E0D\u80FD\u66FF\u4EE3\u73B0\u573A\u4EBA\u5DE5\u9A8C\u6536\uFF1B\u662F\u5426\u5173\u95ED\u4EFB\u52A1\u4ECD\u7531\u6700\u7EC8\u9A8C\u6536\u4EBA\u51B3\u5B9A\u3002</p><details><summary>\u67E5\u770B\u89C2\u5BDF\u8BC1\u636E</summary>${d?'<p class="small-note">\u672C\u6B21\u6BD4\u8F83\u4F7F\u7528\u751F\u6210\u7684\u53C2\u8003\u6570\u636E\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u4E1A\u52A1\u6D41\u7A0B\u3002</p>':""}<pre class="result-json">${Q(JSON.stringify(e,null,2))}</pre></details></section>`}function Rp(n){let e=n.observation_plan,t=!["closed","cancelled","dismissed"].includes(n.status),i=f.observationDraft;return`<section class="task-section observation-plan"><div class="section-heading"><h3>\u6062\u590D\u89C2\u5BDF\u8BA1\u5212</h3>${t?`<button class="text-button" data-action="edit-observation">${e?"\u8C03\u6574\u8BA1\u5212":"\u8BBE\u7F6E\u89C2\u5BDF\u7A97\u53E3"}</button>`:""}</div>${e?`<p>${Q(fn(n.observation_start))} \u81F3 ${Q(fn(n.observation_end))}</p><p class="small-note">\u81F3\u5C11 ${sn(e.minimum_minutes)} \u5206\u949F \xB7 ${e.comparison_basis==="per_run_hour"?"\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u65F6\u957F\u964D\u4F4E":"\u7D2F\u8BA1\u77ED\u505C\u65F6\u957F\u964D\u4F4E"}\u4E0D\u5C11\u4E8E ${sn(e.short_stop_reduction_pct)}% \xB7 \u8D28\u91CF\u5BB9\u5DEE ${sn(e.quality_tolerance_pp)} \u4E2A\u767E\u5206\u70B9</p>`:"<p>\u5C1A\u672A\u914D\u7F6E\u3002\u73B0\u573A\u6700\u7EC8\u9A8C\u6536\u524D\uFF0C\u9700\u8981\u660E\u786E\u89C2\u5BDF\u65F6\u95F4\u3001\u53EF\u6BD4\u5DE5\u51B5\u4E0E\u901A\u8FC7\u95E8\u69DB\u3002</p>"}${f.observationEditing&&t?`<form id="observation-form"><p class="small-note">\u9009\u62E9\u540C\u4E00\u73ED\u6B21\u3001\u4EA7\u54C1\u548C\u5DE5\u5E8F\u3002\u6309\u6BCF\u8FD0\u884C\u5C0F\u65F6\u6BD4\u8F83\u77ED\u505C\u65F6\u957F\uFF0C\u6B21\u6570\u9891\u7387\u4E5F\u987B\u6301\u5E73\u6216\u4E0B\u964D\u3002\u65F6\u95F4\u4F7F\u7528\u5317\u4EAC\u65F6\u95F4\u3002</p><div class="observation-fields"><label>\u5F00\u59CB\u65F6\u95F4<input type="datetime-local" name="start" required value="${Q(i.start||"")}" /></label><label>\u7ED3\u675F\u65F6\u95F4<input type="datetime-local" name="end" required value="${Q(i.end||"")}" /></label><label>\u6700\u5C11\u89C2\u5BDF\u5206\u949F<input type="number" name="minimum_minutes" min="0.1" step="0.1" required value="${Q(i.minimum_minutes||"")}" /></label><label>\u6BCF\u8FD0\u884C\u5C0F\u65F6\u77ED\u505C\u65F6\u957F\u964D\u4F4E\u95E8\u69DB\uFF08%\uFF09<input type="number" name="short_stop_reduction_pct" min="0.01" max="100" step="0.01" required value="${Q(i.short_stop_reduction_pct||"")}" /></label><label>\u8D28\u91CF\u5BB9\u5DEE\uFF08\u767E\u5206\u70B9\uFF09<input type="number" name="quality_tolerance_pp" min="0" max="100" step="0.01" required value="${Q(i.quality_tolerance_pp??"")}" /></label></div><label class="observation-note">\u51B3\u5B9A\u4F9D\u636E\u4E0E\u53EF\u6BD4\u5DE5\u51B5<textarea name="notes" rows="3" required placeholder="\u8BF4\u660E\u4E3A\u4F55\u9009\u62E9\u8FD9\u4E9B\u65F6\u95F4\u4E0E\u95E8\u69DB\uFF0C\u4EE5\u53CA\u5982\u4F55\u786E\u8BA4\u5DE5\u51B5\u53EF\u6BD4">${Q(i.notes||"")}</textarea></label>${f.observationError?pr(f.observationError):""}<div class="action-wrap"><button type="button" data-form-submit aria-keyshortcuts="Control+Enter Meta+Enter" class="button primary" ${f.observationBusy?"disabled":""}>${f.observationBusy?"\u6B63\u5728\u4FDD\u5B58":"\u4FDD\u5B58\u89C2\u5BDF\u8BA1\u5212"}</button><button type="button" class="button" data-action="cancel-observation">\u53D6\u6D88</button></div></form>`:""}</section>`}function bb(n){return`<article class="work-order" id="work-order-${Q(n.id)}"><div class="section-heading"><strong>${Q(n.id)}</strong>${wi(n.status)}</div><h4>${Q(n.title)}</h4><p>${Q(n.description||n.proposal?.description||"")}</p><div class="work-order-meta"><span>\u6267\u884C\u4EBA\uFF1A${Q(n.assignee_name||n.assignee||"\u5F85\u63A5\u5355")}</span><span>${Q(fn(n.updated_at||n.created_at))}</span></div>${n.allowed_actions.length?`<div class="action-wrap">${n.allowed_actions.map(e=>Sb(e,"order",n.id)).join("")}</div>`:'<p class="small-note">\u5F53\u524D\u8EAB\u4EFD\u6216\u9636\u6BB5\u6CA1\u6709\u53EF\u6267\u884C\u52A8\u4F5C\u3002</p>'}${n.receipt?`<details><summary>\u67E5\u770B\u56DE\u6267</summary><pre>${Q(JSON.stringify(n.receipt,null,2))}</pre></details>`:""}</article>`}function Sb(n,e,t){let i=typeof n=="string"?n:n.action||n.id||n.name,s=typeof n=="object"&&n.label?n.label:Fp[i]||i;return`<button class="button small" data-transition="${Q(i)}" data-kind="${e}" data-object="${Q(t)}" data-evidence="${n.requires_evidence_refs===!0}" data-notes="${n.requires_notes!==!1}" data-actor-role="${Q(n.role||"")}" ${f.operationBusy?"disabled":""}>${Q(s)}</button>`}function Mb(){let n=f.actionDraft;return`<form id="transition-form" class="transition-form"><div class="section-heading"><h3>${Q(n.label||Fp[n.action]||n.action)}</h3><button class="icon-button" type="button" data-action="cancel-transition" aria-label="\u53D6\u6D88\u672C\u6B21\u7F16\u8F91">${Ft("close",16)}</button></div><p>\u76EE\u6807\uFF1A${Q(n.id)}\u3002${Q(f.data.capabilities.authorization_label||"\u670D\u52A1\u7AEF\u6309\u5F53\u524D\u8EAB\u4EFD\u6821\u9A8C\u6388\u6743")}\u3002</p><label for="transition-notes">\u64CD\u4F5C\u8BF4\u660E${n.requiresNotes?"\uFF08\u5FC5\u586B\uFF09":""}</label><textarea id="transition-notes" name="notes" rows="4" ${n.requiresNotes?'required minlength="3"':""} placeholder="\u5199\u660E\u5B9E\u9645\u53D1\u751F\u7684\u4E8B\u60C5\u3001\u4F9D\u636E\u548C\u672A\u5B8C\u6210\u4E8B\u9879"></textarea>${n.requiresEvidence?'<label for="evidence-refs">\u73B0\u573A\u8BC1\u636E\u5F15\u7528\uFF08\u5FC5\u586B\uFF09</label><textarea id="evidence-refs" name="evidence_refs" rows="2" required placeholder="\u586B\u5199\u672C\u6B21\u73B0\u573A\u8BB0\u5F55\u6216\u9644\u4EF6\u7684\u5F15\u7528\uFF0C\u6BCF\u884C\u4E00\u6761\u3002\u6A21\u578B\u5206\u6790\u4E0D\u80FD\u66FF\u4EE3\u73B0\u573A\u8BC1\u636E\u3002"></textarea>':""}<button class="button primary" type="button" data-form-submit aria-keyshortcuts="Control+Enter Meta+Enter" ${f.operationBusy?"disabled":""}>${f.operationBusy?'<span class="spinner"></span>\u63D0\u4EA4\u4E2D':"\u63D0\u4EA4\u5E76\u56DE\u8BFB\u72B6\u6001"}</button></form>`}function ga(n,e){let t=Fe.querySelector(`#${n}`),i=t?.querySelector("[data-form-submit]");if(!t||!i)return;let s=!1,r=async()=>{if(!(s||i.disabled||!t.reportValidity())){s=!0;try{await e({currentTarget:t,preventDefault(){}})}catch(a){rn(a?.message||"\u672C\u6B21\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u8F93\u5165\u540E\u91CD\u8BD5\u3002")}finally{s=!1}}};i.addEventListener("click",r),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("keydown",a=>{if(a.key!=="Enter"||a.isComposing||a.repeat||a.target?.isContentEditable)return;let o=a.target?.tagName;o!=="BUTTON"&&(o==="TEXTAREA"&&!a.ctrlKey&&!a.metaKey||(a.preventDefault(),r()))})}var Ip=new WeakSet;function Ca(n=Fe){Object.entries({"[data-page]":t=>{t.dataset.page==="ai"&&(f.aiMode="manager"),wa(t.dataset.page)},"[data-action]":t=>Ab(t.dataset.action),"[data-select-asset]":t=>Kl(t.dataset.selectAsset,!0),"[data-open-asset]":t=>{Kl(t.dataset.openAsset),wa("asset")},"[data-open-case]":t=>vs("manager",t.dataset.openCase),"[data-select-case]":t=>hu(t.dataset.selectCase),"[data-consult]":t=>vs(t.dataset.consult,f.selectedCaseId),"[data-manager-coordinate]":t=>{let i=t.dataset.managerCoordinate;vs("manager",i),i&&!f.managerDraft.trim()&&uu("\u8BF7\u8DDF\u8FDB\u8FD9\u6B21\u5F02\u5E38\uFF0C\u6CBF\u7528\u672C\u8F6E\u5DF2\u5B8C\u6210\u7684\u5206\u6790\u3002")},"[data-team-case]":t=>vs("manager",t.dataset.teamCase)}).forEach(([t,i])=>n.querySelectorAll(t).forEach(s=>{Ip.has(s)||(Ip.add(s),s.addEventListener("click",()=>i(s)))}))}var Pp=new WeakSet,ur=new WeakSet;function wb(){return Ua(f.chatTarget,f.replyContext?{asset_id:f.replyContext.equipment_id}:null)}function dr(n){let e=Fe.querySelector("[data-manager-send]");return e?(e.disabled=!n?.value.trim()||n.disabled||ur.has(n)||Fe.querySelector("#manager-form")?.dataset?.sendLocked==="true",!e.disabled):!1}function uu(n){f.managerDraft=n,f.chatDrafts[si()]=n;let e=Fe.querySelector("#manager-message");e&&(e.value=n,dr(e),e.focus(),e.setSelectionRange(n.length,n.length))}function Xp(n=Fe){let e=(s,r,a)=>n.querySelectorAll(s).forEach(o=>{Pp.has(o)||(Pp.add(o),o.addEventListener(r,a))}),t=s=>{s.preventDefault();let r=Fe.querySelector("#manager-form");dr(Fe.querySelector("#manager-message"))&&r?.reportValidity()&&ru(s)};e("#manager-form","submit",s=>s.preventDefault()),e("#manager-message","input",s=>{f.managerDraft=s.target.value,f.chatDrafts[si()]=s.target.value,dr(s.target)}),e("[data-chat-clear-context]","click",mb),e("[data-field-turn]","click",s=>{let{fieldTurn:r,fieldText:a}=s.currentTarget.dataset,o=[...f.managerTurns,...f.managerActiveTurns].find(u=>u.id===r&&u.status==="awaiting_facts");if(!o||f.chatTarget!=="manager")return;let l=s.currentTarget.closest("[data-field-question]").dataset.fieldQuestion;if(l!==o.field_question?.id)return;if(a){ru(s,null,{turn:o,questionId:l,text:a});return}let c=Fe.querySelector("#manager-message")?.value||"";f.replyContext={fact_turn_id:o.id,fact_question_id:l,case_id:o.case_id,equipment_id:o.equipment_id||o.case?.equipment_id,title:"\u8865\u5145\u8FD9\u6B21\u77ED\u505C\u7684\u73B0\u573A\u60C5\u51B5"},f.managerDraft=c,At(!1),Fe.querySelector("#manager-message")?.focus()}),e("[data-conversation-focus]","click",s=>{let r=Fe.querySelector(`[data-conversation-action="${CSS.escape(s.currentTarget.dataset.conversationFocus)}"]`);r?.scrollIntoView({block:"center",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}),r?.focus({preventScroll:!0})}),e("[data-manager-prompt]","click",s=>uu(s.currentTarget.dataset.managerPrompt)),e("[data-manager-send]","click",t),e("[data-chat-retry]","click",s=>{let r=f.outgoingMessages.find(a=>a.id===s.currentTarget.dataset.chatRetry);r&&r.recipient===f.chatTarget&&ru(s,r)}),e("[data-chat-target]","click",s=>Cp(s.currentTarget.dataset.chatTarget)),e("[data-peer-invite]","click",hb),e(".manager-messages","scroll",s=>{let r=s.currentTarget;r.scrollHeight-r.scrollTop-r.clientHeight<48&&Fe.querySelector(".conversation-contact.is-current .contact-unread")&&At()}),e("[data-chat-open-job]","click",s=>{if(f.managerBusy||f.operationBusy)return;let r=f.jobs.find(o=>o.id===s.currentTarget.dataset.chatOpenJob),a=r?.role||r?.input?.role;!r||!ec(a)||!ha(r,{caseId:Ei(),role:a})||(Cp(a),f.selectedJobId=r.id,At(!1))}),e("[data-chat-approve]","click",s=>Lb(s.currentTarget.dataset.chatApprove)),e("[data-chat-run]","click",s=>Nb(s.currentTarget.dataset.chatRun)),e("[data-manager-approve]","click",s=>Dp(s.currentTarget.dataset.managerApprove,"approve")),e("[data-manager-resume]","click",s=>Dp(s.currentTarget.dataset.managerResume,"resume")),e('[data-manager-refresh],[data-manager-action="refresh"]',"click",()=>ri({verifyNow:!0})),e("[data-manager-expand]","toggle",s=>{f.managerExpanded[s.currentTarget.dataset.managerExpand]=s.currentTarget.open});let i=n.querySelector("#manager-message");i&&(i.value=f.managerDraft,dr(i),i.oncompositionstart=()=>{ur.add(i),dr(i)},i.oncompositionend=()=>{ur.delete(i),dr(i)},i.onkeydown=s=>{let r=Ru(i.value,wb());if(Iu(s,i,r,ur.has(i))){s.preventDefault(),uu(r);return}s.key==="Enter"&&!s.shiftKey&&!s.altKey&&!s.isComposing&&s.keyCode!==229&&!ur.has(i)&&(s.preventDefault(),s.repeat||t(s))})}function At(n=!0,e=!1){let t=Fe.querySelector("#manager-surface");if(!t||!f.data)return;let i=t.querySelector("#manager-message"),s=document.activeElement===i,r=i?[i.selectionStart,i.selectionEnd]:null;if(i&&ur.has(i))return;i&&n&&(f.managerDraft=i.value);let a=t.querySelector(".manager-messages"),o=a?.scrollTop||0,l=t.dataset.transcriptContact!==f.chatTarget||!a||a.scrollHeight-o-a.clientHeight<48;t.dataset.transcriptContact=f.chatTarget;let c=document.createElement("template");c.innerHTML=Hp(l||e),t.firstElementChild?gu(t.firstElementChild,c.content.firstElementChild):t.append(c.content.firstElementChild.cloneNode(!0)),Xp(t),Ca(t),_t.bind(Fe),jp(t),Qp(t),ga("transition-form",em),ga("observation-form",tm);let u=t.querySelector("#manager-message");u&&(u.value=f.managerDraft,s&&(u.focus({preventScroll:!0}),r&&u.setSelectionRange(...r)));let m=t.querySelector(".manager-messages");m&&(m.scrollTop=e||l?m.scrollHeight:o)}function Yp(){clearTimeout(va),f.page==="ai"&&f.aiMode==="manager"&&(va=setTimeout(ri,5e3))}async function ri({verifyNow:n=!1}={}){if(cr)return n&&await cu().reconcile(!0),cr;clearTimeout(va),f.managerLoading=!f.managerLoaded;let e=Ei(),t=new Map(f.managerTurns.map(i=>[i.id,i]));return cr=(async()=>{Mi&&Mi.refresh();let i=pt.manager().then(a=>{let o=new Map((a.turns||[]).map(c=>[c.id,c]));for(let c of f.managerTurns){let u=o.get(c.id);t.get(c.id)!==c&&(!u||(Date.parse(c.updated_at)||0)>=(Date.parse(u.updated_at)||0))&&o.set(c.id,c)}f.managerTurns=[...o.values()],f.managerActiveTurns=a.active_turns||[];let l=new Map(f.jobs.map(c=>[c.id,c]));for(let c of[...f.managerActiveTurns,...f.managerTurns])for(let u of c.child_jobs||[])l.set(u.id,{...l.get(u.id),...u,question:u.question||u.input?.question,case_id:u.case_id||u.input?.case_id});f.jobs=[...l.values()],f.managerLoaded=!0,f.page==="ai"&&!_t.state?.panel&&f.managerTurns.some(c=>{let u=t.get(c.id);return!u||u.status!==c.status||u.reply!==c.reply})&&At()}),[s,r]=await Promise.allSettled([i,e?pt.case(e):null,_t.refresh({render:!1}),cu().reconcile(n)]);if(r.status==="fulfilled"&&r.value){let a=r.value;f.managerCaseDetails[e]=a,f.data.cases=f.data.cases.map(o=>o.id===a.id?{...o,...a}:o),a.id===f.selectedCaseId&&(f.caseDetail=a)}f.managerReadError=s.reason||(e===Ei()?r.reason:null)||null})().finally(()=>{cr=null,f.managerLoading=!1,ic(),At(),Yp()}),cr}function ic(){if(!f.outgoingMessages.length)return;let n=_t.state?.messages||[];f.outgoingMessages=f.outgoingMessages.filter(e=>e.deliveryState!=="sent"?!0:e.fact_turn_id?!n.some(t=>t.id===e.message_id):e.actionConfirmed?!_t.state?.messages||e.lastMessages===_t.state.messages:e.turn_id?!n.some(t=>t.turn_id===e.turn_id&&t.author==="user"&&t.kind==="request"):e.job_id?f.jobs.some(t=>t.id===e.job_id)?!1:(Jp(e),!0):!e.delivery_id||!n.some(t=>t.id===e.delivery_id))}async function Jp(n){if(!(n.loadingJob||f.jobs.some(e=>e.id===n.job_id))){n.loadingJob=!0;try{let e=await pt.job(n.job_id);if(e?.id!==n.job_id)return;f.jobs.some(t=>t.id===e.id)||f.jobs.push({...e,role:e.role||n.recipient,question:e.input?.question||n.text,chat_origin:"direct"}),Pa(),ic(),At()}catch{}finally{n.loadingJob=!1}}}async function ru(n,e=null,t=null){n.preventDefault();let i=f.chatTarget;if(e&&(!f.outgoingMessages.includes(e)||!["checking","failed"].includes(e.deliveryState))||f.managerBusy||f.operationBusy||f.outgoingMessages.some(x=>x.recipient===i&&x.deliveryState==="sending"))return;let s=Fe.querySelector("#manager-message"),r=e?.text??t?.text??s?.value.trim();if(!r)return;if(i!=="manager"&&!ec(i)){f.managerError=new Error("\u8FD9\u4F4D\u540C\u4E8B\u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u8054\u7CFB\u603B\u7BA1\u3002"),At();return}let a=Ei(),o=f.managerCaseDetails[a]||f.data.cases.find(x=>x.id===a),l=e?.fact_turn_id||t?.turn.id||!e&&i==="manager"&&f.replyContext?.fact_turn_id||null,c=l?e?.fact_question_id||t?.questionId||f.replyContext?.fact_question_id:null,u=e?e.case_id:l?t?.turn.case_id||a:Pu(r,o,f.data.assets),m={message:r,...u?{case_id:u}:{},...l?{fact_turn_id:l,fact_question_id:c}:{}},h=e||f.outgoingMessages.find(x=>x.deliveryState==="checking"&&x.recipient===i&&x.case_id===u&&x.text===r&&(x.fact_turn_id||null)===l&&(x.fact_question_id||null)===c);if(!h){if(h={id:"local-"+Ci(),author:"user",recipient:i,kind:l?"progress":"request",text:r,case_id:u,created_at:new Date().toISOString(),...l?{fact_turn_id:l,fact_question_id:c,turn_id:l}:{}},l){let x=t?.turn||[...f.managerTurns,...f.managerActiveTurns].find(g=>g.id===l&&g.field_question?.id===c);if(x?.reply){let g=(_t.state?.messages||[]).findLast(p=>p.turn_id===l&&p.author==="manager"&&p.text===x.reply);h.fieldPrompt=g||{id:"field-question:"+c,author:"manager",recipient:"user",kind:"progress",text:x.reply,created_at:x.updated_at||x.created_at}}}f.outgoingMessages.push(h)}h.deliveryState="sending",h.error=null,f.managerError=null,h.before||=new Set([...(_t.state?.messages||[]).flatMap(x=>[x.id,x.turn_id,x.job_id]),...f.managerTurns.map(x=>x.id),...f.managerActiveTurns.map(x=>x.id),...f.jobs.map(x=>x.id)]),!e&&!t&&(f.chatDrafts[si()]="",f.replyContext=null,f.managerCaseId=null,f.chatContextVersion=(f.chatContextVersion||0)+1,f.managerDraft=f.chatDrafts[si()]||"",s&&(s.value=f.managerDraft)),At(!1,!l),!e&&!t&&Fe.querySelector("#manager-message")?.focus?.({preventScroll:!0});let d=!l&&u&&/^(停|停下|停止|停一下|全部停止|停止相关工作|别做了)[。！!\s]*$/.test(r);function _(x){i==="manager"&&x.kind==="employee_message"&&(l||x.turn_id)&&(h.fact_turn_id=l||x.turn_id,h.turn_id=h.fact_turn_id,h.message_id=x.id,h.kind="progress"),x.kind==="turn"&&(h.turn_id=x.id),x.kind==="job"&&(h.job_id=x.id),x.kind==="employee_message"&&(h.delivery_id=x.id),x.kind==="action"&&(h.actionConfirmed=!0,h.lastMessages=_t.state?.messages),h.deliveryState="sent",h.before=null,x.case_id&&(h.case_id=x.case_id),h.job_id&&Jp(h),At()}try{let x=await xs(d?"stop-case":"chat-"+i,m,async p=>{if(h.requestKey=p,d)return pt.stopCase(u,{reason:r,idempotency_key:p});let M={...m,idempotency_key:p};l&&(h.message_id=await Bu(p)),i!=="manager"&&Object.assign(h,await ku(i,p));let E=i==="manager"?await pt.managerMessage(M):await pt.employeeMessage(i,M);if(i==="manager"?!E?.id:!(E?.handled?E.message?.id:E?.job?.id||E?.id))throw Ta("\u6B63\u5728\u6838\u5BF9\u540C\u4E8B\u7684\u6536\u4EF6\u8BB0\u5F55\u3002");return E},_,i);if(x.receipt)return;if(x.pending){h.deliveryState="checking";return}let g=x.value;if(d)_({kind:"action"});else if(i==="manager")f.managerTurns=[...f.managerTurns.filter(p=>p.id!==g.id),g],_(l||g.field_message_id?{kind:"employee_message",id:g.field_message_id||h.message_id,turn_id:g.id,case_id:g.case_id}:{kind:"turn",id:g.id,case_id:g.case_id});else if(g.handled)h.replyMessage=g.message,_({kind:"employee_message",id:g.message?.id});else{let p=g.job||g,M=f.managerCaseDetails[u]||f.data.cases.find(E=>E.id===u);f.jobs=[...f.jobs.filter(E=>E.id!==p.id),{...p,role:p.role||i,asset_id:p.asset_id||M?.asset_id||M?.equipment_id,case_id:ei(p)||u,question:r,chat_origin:"direct"}],_({kind:"job",id:p.id,case_id:ei(p)||u}),Pa()}}catch(x){h.deliveryState="failed",h.before=null,h.error=x.message||"\u8FD9\u6761\u6D88\u606F\u53D1\u9001\u5931\u8D25\u3002"}finally{ic(),At(),await ri()}}async function Dp(n,e){if(f.managerBusy)return;let t=f.managerTurns.find(s=>s.id===n)||f.managerActiveTurns.find(s=>s.id===n);if(!t||e==="approve"&&(t.status!=="awaiting_approval"||!t.proposal))return;let i=e==="approve"?{proposal:t.proposal}:{};f.managerBusy=!0,f.managerError=null,At();try{let s=await xs("turn-"+e,{id:n,...i},async r=>{let a={...i,idempotency_key:r},o=e==="approve"?await pt.managerApprove(n,a):await pt.managerResume(n,a);if(!o?.id)throw Ta("\u6B63\u5728\u6838\u5BF9\u8FD9\u6B21\u529E\u7406\u8BB0\u5F55\u3002");return o});s.value&&(f.managerTurns=f.managerTurns.map(r=>r.id===n?s.value:r),f.managerActiveTurns=f.managerActiveTurns.map(r=>r.id===n?s.value:r))}catch(s){f.managerError=s}finally{f.managerBusy=!1,At(),await ri()}}var or=new WeakSet,lr=new WeakSet;function Eb(n){n&&(n.open=!0,f.taskExpanded[n.dataset.taskExpand]=!0)}function Zp(n){let e=document.getElementById(n);if(!e)return;let t=e.parentElement;for(;t;)t.matches("details")&&(t.open=!0,t.dataset.taskExpand&&(f.taskExpanded[t.dataset.taskExpand]=!0),t.dataset.workflowExpand&&(f.workflowExpanded[t.dataset.workflowExpand]=!0)),t=t.parentElement;e.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"})}function jp(n=Fe){n.querySelectorAll("[data-task-expand]").forEach(e=>{lr.has(e)||(lr.add(e),e.addEventListener("toggle",()=>{f.taskExpanded[e.dataset.taskExpand]=e.open;let t=Fe.querySelector("[data-task-flow-details]");e.id==="task-flow"&&t&&t.setAttribute("aria-expanded",String(e.open))}))}),n.querySelectorAll("[data-task-flow-details]").forEach(e=>{lr.has(e)||(lr.add(e),e.addEventListener("click",()=>{Eb(Fe.querySelector("#task-flow")),e.setAttribute("aria-expanded","true"),Zp("task-flow")}))}),n.querySelectorAll("[data-transition]").forEach(e=>{lr.has(e)||(lr.add(e),e.addEventListener("click",()=>{f.actionDraft={action:e.dataset.transition,kind:e.dataset.kind,id:e.dataset.object,requiresEvidence:e.dataset.evidence==="true",requiresNotes:e.dataset.notes!=="false",actorRole:e.dataset.actorRole},vt(),Fe.querySelector("#transition-notes")?.focus()}))})}var Zl=new WeakSet;function Kp(n=Fe){n.querySelectorAll("[data-ems-detail]").forEach(e=>{Zl.has(e)||(Zl.add(e),e.addEventListener("toggle",()=>{f.emsDetailsOpen=e.open}))}),n.querySelectorAll('[data-iot-detail="receipt"]').forEach(e=>{Zl.has(e)||(Zl.add(e),e.addEventListener("toggle",()=>{f.iotReceiptOpen=e.open}))})}function Qp(n=Fe){n.querySelectorAll("[data-workflow-expand]").forEach(e=>{or.has(e)||(or.add(e),e.addEventListener("toggle",()=>{f.workflowExpanded[e.dataset.workflowExpand]=e.open}))}),n.querySelectorAll("[data-workflow-view],[data-workflow-node],[data-workflow-focus-current],[data-workflow-open-stage]").forEach(e=>{or.has(e)||(or.add(e),e.addEventListener("click",()=>{let t=jl();if(!t)return;if(e.hasAttribute("data-workflow-open-stage")){let r=e.dataset.workflowOpenStage,a=Fe.querySelector("[data-workflow-records]");a&&(a.open=!0,f.workflowExpanded[a.dataset.workflowExpand]=!0);let o=[...a?.querySelectorAll("[data-workflow-stage]")||[]].filter(l=>l.dataset.workflowStage===r);o.forEach(l=>{let c=l.querySelector("details");c&&(c.open=!0,f.workflowExpanded[c.dataset.workflowExpand]=!0)}),(o[0]||a)?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});return}let i;if(e.dataset.workflowView)f.workflowView=e.dataset.workflowView,i=`[data-workflow-view="${f.workflowView}"]`;else{let r=e.dataset.workflowNode||e.dataset.workflowFocusCurrent;if(!r)return;f.workflowSelectedNodes[t.id]=r,e.hasAttribute("data-workflow-focus-current")&&(f.workflowView="flow"),i=`[data-workflow-node="${CSS.escape(r)}"]`}Pb(t);let s=[...Fe.querySelectorAll(i)].find(r=>r.getClientRects().length);e.hasAttribute("data-workflow-focus-current")&&s?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"center"}),s?.focus({preventScroll:!0})}))}),n.querySelectorAll("[data-workflow-scroll]").forEach(e=>{or.has(e)||(or.add(e),e.addEventListener("click",()=>Zp(e.dataset.workflowScroll)))})}function Lp(){_t.bind(Fe),Ca(),Qp(),Kp(),Xp(),jp(),Yp(),Fe.querySelector("#simulation-scenario")?.addEventListener("change",n=>{f.simulationScenario=n.target.value,Sa()}),Fe.querySelectorAll("[data-simulation-action]").forEach(n=>n.addEventListener("click",()=>Cb(n.dataset.simulationAction))),Fe.querySelector("[data-simulation-case]")?.addEventListener("click",n=>{let e=n.currentTarget.dataset.simulationCase;e&&vs("manager",e)}),Sa(),Fe.querySelectorAll("[data-role]").forEach(n=>n.addEventListener("click",()=>{f.role=n.dataset.role,f.selectedJobId=null,vt()})),Fe.querySelectorAll("[data-job]").forEach(n=>n.addEventListener("click",()=>{let e=f.jobs.find(t=>t.id===n.dataset.job);ha(e,{caseId:f.selectedCaseId,role:f.role})&&(f.selectedJobId=n.dataset.job,vt())})),Fe.querySelector("#task-case-select")?.addEventListener("change",n=>{n.target.value&&hu(n.target.value)}),Fe.querySelectorAll("[data-filter]").forEach(n=>n.addEventListener("click",()=>{f.taskFilter=n.dataset.filter;let e=f.data.cases.filter(t=>f.taskFilter==="all"||(f.taskFilter==="closed"?!ii(t):ii(t)));e.length&&!e.some(t=>t.id===f.selectedCaseId)?hu(e[0].id):vt()})),Fe.querySelectorAll("[data-asset-tab]").forEach(n=>n.addEventListener("click",()=>{f.activeAssetTab=n.dataset.assetTab,vt()})),Fe.querySelector("#asset-select")?.addEventListener("change",n=>Kl(n.target.value)),Fe.querySelector("#motion-toggle")?.addEventListener("change",n=>Gn?.setMotion(n.target.checked)),Fe.querySelector("#cutaway-toggle")?.addEventListener("change",n=>Gn?.setCutaway(n.target.checked)),ga("transition-form",em),ga("import-form",Ub),ga("observation-form",tm),Fe.querySelector("#import-file")?.addEventListener("change",async n=>{let e=n.target.files?.[0];if(e){if(e.size>5*1024*1024){rn("\u8BF7\u4F7F\u7528\u4E0D\u8D85\u8FC75MB\u7684JSON\u6570\u636E\u5305\u3002");return}try{f.importDraft=await e.text();let t=Fe.querySelector("#import-payload");t&&(t.value=f.importDraft)}catch{rn("\u65E0\u6CD5\u8BFB\u53D6\u6587\u4EF6\uFF0C\u8BF7\u76F4\u63A5\u7C98\u8D34JSON\u6570\u636E\u5305\u3002")}}})}function Tb(){if(f.page==="overview"&&f.showList)return;let n=document.getElementById(f.page==="asset"?"device-scene":"factory-scene");if(!n||!f.data.assets.length)return;let e=f.page==="asset"?f.data.assets.filter(t=>t.id===f.selectedId):f.data.assets;Gn=new Hl(n,e,{selectedId:f.selectedId,focused:f.page==="asset",alertAssetIds:f.data.cases.filter(ii).map(t=>t.asset_id),onSelect:t=>Kl(t,!1),onError:()=>{rn("\u4E09\u7EF4\u6682\u4E0D\u53EF\u7528\uFF0C\u53EF\u4F7F\u7528\u8BBE\u5907\u5217\u8868\u7EE7\u7EED\u64CD\u4F5C\u3002")}})}async function Ab(n){if(n==="reload"||n==="refresh")return rc();if(n==="sync-iot")return Ib();if(n==="sync-ems")return Rb();if(n==="show-iot"||n==="show-simulation"){f.page!=="overview"&&wa("overview"),Fe.querySelector(f.data?.ems?"#ems-panel":"#iot-panel")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"center"});return}if(n==="retry-asset")return ac();if(n==="retry-case")return Ia();if(n==="view-3d"||n==="view-list"){f.showList=n==="view-list",vt();return}if(n==="reset-view")return Gn?.reset();if(n==="focus-view")return Gn?.focus(f.selectedId);if(n==="cancel-transition"){f.actionDraft=null,vt();return}if(n==="edit-observation"){f.observationEditing=!0,f.observationDraft={},f.observationError=null,vt();return}if(n==="cancel-observation"){f.observationEditing=!1,f.observationError=null,vt();return}}function wa(n){if(n=Na(n),!Up[n])return;let e=n!==f.page;if(f.page==="ai"&&n!=="ai"&&(nc(),clearTimeout(va)),n==="ai"){e&&(_u(),ys&&(++hr,ys.abort(),ys=null,f.detailLoading=!1)),f.managerCaseId=Ei(),f.selectedCaseId=f.managerCaseId,f.caseDetail=f.managerCaseDetails[f.managerCaseId]||null;let t=f.data?.cases.find(i=>i.id===f.managerCaseId);t&&(f.selectedId=t.asset_id||t.equipment_id),f.managerDraft=f.chatDrafts[si()]||""}if(f.page=n,!Np)try{location.hash!==`#${n}`&&history.replaceState(null,"",`#${n}`)}catch{}n==="ai"&&f.aiMode==="manager"&&ri(),e&&sc()&&(f.detail?.id!==f.selectedId&&(f.detail=null),Ra()),vt(),window.scrollTo({top:0,left:0,behavior:"instant"})}function Kl(n,e=!1){if(!f.data.assets.some(i=>i.id===n))return;let t=f.selectedId!==n;if(f.selectedId=n,f.selectedCaseId=xa(n).find(ii)?.id||xa(n)[0]?.id||null,t&&(f.caseDetail=null,f.detail=null,f.approvedProposal=null,f.selectedJobId=null),Gn?.select(n),e&&Gn?.focus(n),f.page==="overview"){let i=document.getElementById("selected-asset-panel");i&&(i.innerHTML=mu()),Fe.querySelectorAll("[data-select-asset]").forEach(s=>{s.classList.toggle("active",s.dataset.selectAsset===n),s.classList.toggle("selected",s.dataset.selectAsset===n)}),i&&Ca(i)}else vt();ac()}function gu(n,e){if(n.nodeType!==e.nodeType||n.nodeName!==e.nodeName){n.replaceWith(e.cloneNode(!0));return}if(n.nodeName==="BUTTON"&&JSON.stringify(n.dataset)!==JSON.stringify(e.dataset)){n.replaceWith(e.cloneNode(!0));return}if(n.nodeType===Node.TEXT_NODE){n.textContent!==e.textContent&&(n.textContent=e.textContent);return}if(n.nodeType!==Node.ELEMENT_NODE)return;for(let s of[...n.attributes])e.hasAttribute(s.name)||n.removeAttribute(s.name);for(let s of[...e.attributes])n.getAttribute(s.name)!==s.value&&n.setAttribute(s.name,s.value);let t=[...n.childNodes],i=[...e.childNodes];i.forEach((s,r)=>t[r]?gu(t[r],s):n.append(s.cloneNode(!0))),t.slice(i.length).forEach(s=>s.remove())}function Qi(){if(!f.data)return;let n=Fe.querySelector(".topbar-right .source-tag");n&&(n.textContent=$p()+(f.simulationPollError?" \xB7 \u5F85\u56DE\u8BFB":""));let e=Fe.querySelector(".app-footer>span:last-child");e&&(e.textContent=`\u622A\u81F3 ${fn(f.data.updated_at||f.data.generated_at||f.data.data_source.generated_at)}`),Sa();let t=Fe.querySelector("#motion-toggle");t&&ma()&&(t.disabled=!0,t.checked=!1);let i=f.page==="asset"?f.data.assets.filter(a=>a.id===f.selectedId):f.data.assets;if(Gn?.updateAssets(i,f.data.cases.filter(ii).map(a=>a.asset_id)),f.page!=="overview"&&f.page!=="asset")return;let s=document.createElement("template");s.innerHTML=f.page==="overview"?Vp():Gp(),(f.page==="overview"?[".overview-heading-actions .plain-note",".overview-strip","#selected-asset-panel",".attention-list",".asset-grid",".equipment-row","#ems-panel","#iot-panel",".plant-caption"]:[".device-status-line","#asset-telemetry","#ems-device-history",".live-detail-error",".oee-panel",".evidence-workspace",".device-aside .context-panel",".model-caption"]).forEach(a=>{let o=Fe.querySelector(a),l=s.content.querySelector(a);!o||!l||(gu(o,l),Ca(o),Kp(o))})}function sc(){return f.page==="overview"||f.page==="asset"}function _u(){clearTimeout(ya),_s?.abort(),_s=null}function Ea(){clearTimeout(ya),sc()&&f.data&&!_s&&(ya=setTimeout(Ra,5e3))}async function Ra(){if(!sc()||!f.data||f.refreshing||_s)return;if(f.simulationBusy){Ea();return}clearTimeout(ya);let n=new AbortController,e=f.selectedId,t=hr;_s=n;try{let[i,s]=await Promise.allSettled([pt.bootstrap(n.signal),e&&!f.detailLoading?pt.asset(e,n.signal):null]);if(n.signal.aborted)return;if(i.status==="rejected")throw i.reason;let r=i.value;if(!r.simulation&&!r.ems&&(r.simulation=await pt.simulation(n.signal)),n.signal.aborted)return;f.data=r,f.simulationPollError=null,e===f.selectedId&&t===hr&&(s.status==="fulfilled"&&s.value?(f.detail=s.value,f.detailError=null):s.status==="rejected"&&(f.detailError=s.reason)),Qi()}catch(i){n.signal.aborted||(f.simulationPollError=i,Qi())}finally{_s===n&&(_s=null,Ea())}}async function Cb(n){if(f.simulationBusy||!["start","pause"].includes(n))return;let e=kp(),t=`${n}:${e}`;f.simulationControlSignature!==t&&(f.simulationControlSignature=t,f.simulationControlKey=Ci()),f.simulationBusy=!0,f.simulationControlAction=n,f.simulationError=null,_u(),Sa();try{let i=await pt.controlSimulation({action:n,...n==="start"?{scenario:e,duration_minutes:60}:{},idempotency_key:f.simulationControlKey});if(!i||!["running","paused","stopped","error"].includes(i.state))throw new Error("\u670D\u52A1\u7AEF\u672A\u8FD4\u56DE\u6709\u6548\u91C7\u96C6\u72B6\u6001\uFF0C\u8BF7\u56DE\u8BFB\u6838\u5B9E\u540E\u91CD\u8BD5\u3002");f.data.simulation=i,f.simulationControlSignature=null,f.simulationControlKey=null,f.simulationPollError=null;let s=new Map((i.devices||[]).map(r=>[r.id,r]));f.data.assets=f.data.assets.map(r=>{let a=s.get(r.id);return a?{...r,status:String(a.state||"unknown").toLowerCase(),source:a.source,synthetic:a.synthetic,updated_at:a.last_seen_at,connection_status:i.state==="running"?"simulated":"simulation_paused"}:r}),f.simulationBusy=!1,Qi(),await Ra()}catch(i){f.simulationError=i,f.simulationBusy=!1,Sa(),Ea()}}async function Rb(){if(!f.emsBusy){f.emsBusy=!0,f.emsError=null,Qi();try{let n=await pt.syncEms();if(!n||typeof n!="object"||!n.state)throw new Error("\u672A\u53D6\u5F97\u540C\u6B65\u7ED3\u679C\uFF0C\u8BF7\u68C0\u67E5\u66F4\u65B0\u3002");f.data.ems=n,await Ra()}catch(n){f.emsError=n}finally{f.emsBusy=!1,Qi()}}}async function Ib(){if(!f.iotBusy){f.iotBusy=!0,f.iotError=null,Qi();try{let n=await pt.syncIot();if(!n||typeof n!="object"||!n.state)throw new Error("\u670D\u52A1\u7AEF\u672A\u8FD4\u56DEIoT\u540C\u6B65\u72B6\u6001\uFF0C\u8BF7\u56DE\u8BFB\u6838\u5B9E\u3002");f.data.iot=n,f.iotBusy=!1,Qi(),await Ra()}catch(n){f.iotBusy=!1,f.iotError=n,Qi()}}}async function rc(){_u(),f.refreshing=!0,f.data||vt();try{if(f.data=await pt.bootstrap(),f.error=null,f.data.jobs?.length){let n=new Map(f.jobs.map(e=>[e.id,e]));f.jobs=f.data.jobs.map(e=>({...n.get(e.id),...e}))}f.data.assets.some(n=>n.id===f.selectedId)||(f.selectedId=f.data.cases.find(ii)?.asset_id||f.data.assets[0]?.id||null),f.data.cases.some(n=>n.id===f.selectedCaseId)||(f.selectedCaseId=xa(f.selectedId).find(ii)?.id||f.data.cases[0]?.id||null),f.page==="ai"&&f.managerCaseId===void 0&&(f.managerCaseId=null),f.refreshing=!1,vt(),await Promise.all([sc()&&f.selectedId?ac():null,f.page==="ai"&&f.aiMode==="manager"?ri():null]),Pa(),Ea()}catch(n){f.error=n,f.refreshing=!1,vt(),Ea()}}async function ac(){if(!f.selectedId)return;ys?.abort();let n=new AbortController;ys=n;let e=++hr,t=f.selectedId;f.detailLoading=!0,f.detailError=null;try{let i=await pt.asset(t,n.signal);if(e!==hr)return;if(f.detail=i,f.detailLoading=!1,f.page==="overview"){let s=document.getElementById("selected-asset-panel");s&&(s.innerHTML=mu(),Ca(s))}else f.page==="asset"&&vt()}catch(i){if(e!==hr)return;f.detailLoading=!1,f.detailError=i,f.page==="asset"?vt():rn(i.message)}finally{ys===n&&(ys=null)}}async function hu(n){f.selectedCaseId=n,f.caseDetail=null,f.caseError=null,f.workflowError=null,f.actionDraft=null,f.observationEditing=!1,f.observationDraft={};let e=f.data.cases.find(t=>t.id===n);e&&f.selectedId!==e.asset_id&&(f.selectedId=e.asset_id,f.detail=null,f.selectedJobId=null,ac()),vt(),await Ia()}async function Ia(){let n=f.selectedCaseId;if(n)try{let e=await pt.case(n);if(f.managerCaseDetails[n]=e,n!==f.selectedCaseId)return;f.caseDetail=e,f.caseError=null,_t.state.detail?.case?.id===n&&(_t.state.detail.case=e),f.page==="ai"&&_a()}catch(e){if(n!==f.selectedCaseId)return;f.caseError=e,f.page==="ai"&&_a()}}function Pb(n){_t.state.detail?.case?.id===n.id&&(_t.state.detail.case=n,At())}function Pa(){clearTimeout(au),f.jobs.some(Bp)&&(au=setTimeout(Db,f.jobs.some(n=>!ba(n))?2e3:1e4))}function _a(){if(f.page==="ai"&&f.aiMode==="manager"){At();return}let n=Fe.querySelector("#question"),e=n?.value,t=document.activeElement===n,i=n?[n.selectionStart,n.selectionEnd]:null;vt();let s=Fe.querySelector("#question");s&&(e&&(s.value=e),t&&(s.focus({preventScroll:!0}),i&&s.setSelectionRange(...i)))}async function Db(){let n=f.jobs.filter(Bp),e=!1;for(let t of n)try{let i=t.status,s=await pt.job(t.id);Object.assign(t,s),t.poll_error=null,ba(t)&&i!==t.status&&(e=!0)}catch(i){t.poll_error=i.message}if(f.page==="ai"&&!e&&_a(),e)try{let t=await pt.bootstrap();f.data=t,f.selectedCaseId&&await Ia(),f.page==="ai"&&_a()}catch(t){f.error=t,f.page==="ai"&&_a()}Pa()}async function Lb(n){let e=f.jobs.find(s=>s.id===n),t=Ma(e);if(f.operationBusy||!t.eligible){rn(t.reason||"\u8FD9\u4EFD\u65B9\u6848\u5F53\u524D\u4E0D\u80FD\u6279\u51C6\u3002");return}let i=ei(e);f.operationBusy=!0,f.managerError=null,At();try{let s=await pt.case(i);f.managerCaseDetails[i]=s;let r=Ma(e);if(!r.eligible)throw new Error(r.reason||"\u65B9\u6848\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u67E5\u770B\u672C\u8F6E\u6700\u65B0\u7ED3\u679C\u3002");let a={case_id:i,proposal:t.proposal,analysis_id:t.analysisId};if((await xs("approve-proposal",a,async l=>{let c=await pt.approveProposal({...a,idempotency_key:l});if(!c?.approved&&!c?.id&&!c?.approval_id)throw Ta("\u6B63\u5728\u6838\u5BF9\u65B9\u6848\u6279\u51C6\u8BB0\u5F55\u3002");return c})).pending)return;f.managerCaseDetails[i]=await pt.case(i),f.selectedCaseId===i&&(f.caseDetail=f.managerCaseDetails[i]),rn("\u65B9\u6848\u5DF2\u786E\u8BA4\uFF0C\u53EF\u4EE5\u5B89\u6392\u5458\u5DE5\u521B\u5EFA\u5DE5\u5355\u3002")}catch(s){f.managerError=s}finally{f.operationBusy=!1,At(),ri()}}async function Nb(n){let e=f.jobs.find(s=>s.id===n),t=Ma(e);if(f.operationBusy||!t.approved){rn(t.reason||"\u8BF7\u5148\u786E\u8BA4\u5F53\u524D\u6709\u6548\u65B9\u6848\u3002");return}let i=ei(e);f.operationBusy=!0,f.managerError=null,At();try{let s=await pt.case(i);f.managerCaseDetails[i]=s;let r=Ma(e);if(!r.approved)throw new Error(r.reason||"\u6279\u51C6\u8BB0\u5F55\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u67E5\u770B\u3002");let a={case_id:i,proposal:t.proposal,analysis_id:t.analysisId},o=await xs("dispatch-employee",a,async l=>{let c=await pt.runEmployee({...a,idempotency_key:l});if(!c?.id)throw Ta("\u6B63\u5728\u6838\u5BF9\u5458\u5DE5\u529E\u7406\u8BB0\u5F55\u3002");return c});if(o.value){let l=o.value;f.jobs=[...f.jobs.filter(c=>c.id!==l.id),{...l,role:"maintenance_coordinator",kind:"employee",case_id:i}],Pa()}}catch(s){f.managerError=s}finally{f.operationBusy=!1,At(),ri()}}async function em(n){if(n.preventDefault(),!f.actionDraft||f.operationBusy)return;let e=new FormData(n.currentTarget),t=String(e.get("notes")||"").trim(),i=String(e.get("evidence_refs")||"").split(/[\n,，]/).map(r=>r.trim()).filter(Boolean),s=f.actionDraft;if(!(s.requiresNotes&&!t)){if(s.requiresEvidence&&!i.length){rn("\u8BF7\u63D0\u4F9B\u672C\u6B21\u73B0\u573A\u8BC1\u636E\u5F15\u7528\u3002");return}f.operationBusy=!0,vt();try{let r={action:s.action,notes:t,evidence_refs:i,...s.conversationAction},a=()=>{f.actionDraft===s&&_t.closePanel(),rn("\u5DF2\u6838\u5BF9\u8FD9\u6B21\u64CD\u4F5C\u7684\u4FDD\u5B58\u8BB0\u5F55\uFF0C\u603B\u7BA1\u4F1A\u7EE7\u7EED\u8DDF\u8FDB\u3002")},o=await xs("transition-"+s.kind,{id:s.id,...r},l=>s.kind==="case"?pt.transitionCase(s.id,{...r,idempotency_key:l}):pt.transitionOrder(s.id,{...r,idempotency_key:l}),a);if(f.operationBusy=!1,o.value&&a(),o.pending){vt();let l=Fe.querySelector("#transition-notes"),c=Fe.querySelector("#evidence-refs");l&&(l.value=t),c&&(c.value=i.join(`
`)),rn("\u6B63\u5728\u6838\u5BF9\u8FD9\u6B21\u63D0\u4EA4\u7684\u8BB0\u5F55\u3002")}else await rc(),f.selectedCaseId&&await Ia()}catch(r){f.operationBusy=!1,vt(),rn(r.message);let a=Fe.querySelector("#transition-notes");a&&(a.value=t);let o=Fe.querySelector("#evidence-refs");o&&(o.value=i.join(`
`))}}}async function Ub(n){if(n.preventDefault(),f.importBusy)return;f.importDraft=String(new FormData(n.currentTarget).get("payload")||"").trim();let e;try{if(e=JSON.parse(f.importDraft),!e||typeof e!="object"||Array.isArray(e)||!Array.isArray(e.records)||!e.kind)throw new Error("\u6570\u636E\u5305\u9700\u8981 kind \u548C records \u6570\u7EC4\u3002")}catch(t){f.importError=new Error(`JSON\u672A\u901A\u8FC7\u6821\u9A8C\uFF1A${t.message}`),vt();return}f.importBusy=!0,f.importError=null,f.importResult=null,vt();try{let t=zp(e);f.importSignature!==t&&(f.importSignature=t,f.importKey=Ci()),f.importResult=await pt.importRecords({...e,idempotency_key:e.idempotency_key||f.importKey}),f.importBusy=!1,await rc(),rn(f.importResult.detection_error?"\u8BB0\u5F55\u5DF2\u5BFC\u5165\uFF1B\u68C0\u6D4B\u672A\u5B8C\u6210\uFF0C\u8BF7\u68C0\u67E5\u56DE\u6267\u4E2D\u7684\u539F\u56E0\u3002":"\u5DF2\u53D6\u5F97\u670D\u52A1\u7AEF\u5BFC\u5165\u56DE\u6267\uFF0C\u8BBE\u5907\u8BB0\u5F55\u5DF2\u5237\u65B0\u3002")}catch(t){f.importBusy=!1,f.importError=t,vt()}}async function tm(n){if(n.preventDefault(),f.observationBusy||!f.selectedCaseId)return;let e=Object.fromEntries(new FormData(n.currentTarget));f.observationDraft=e;let t=`${e.start}:00+08:00`,i=`${e.end}:00+08:00`,s=(Date.parse(i)-Date.parse(t))/6e4;if(!Number.isFinite(s)||s<=0){f.observationError=new Error("\u7ED3\u675F\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u5F00\u59CB\u65F6\u95F4\u3002"),vt();return}if(Number(e.minimum_minutes)>s){f.observationError=new Error("\u6700\u5C11\u89C2\u5BDF\u5206\u949F\u4E0D\u80FD\u8D85\u8FC7\u6240\u9009\u65F6\u95F4\u7A97\u53E3\u3002"),vt();return}let r={start:t,end:i,plan:{minimum_minutes:Number(e.minimum_minutes),short_stop_reduction_pct:Number(e.short_stop_reduction_pct),quality_tolerance_pp:Number(e.quality_tolerance_pp),notes:e.notes.trim()}},a=f.selectedCaseId,o=f.observationAction,l={...r,...o};f.observationBusy=!0,f.observationError=null,vt();try{let c=()=>{f.selectedCaseId===a&&f.observationAction===o&&_t.closePanel(),rn("\u89C2\u5BDF\u8BA1\u5212\u5DF2\u4FDD\u5B58\uFF0C\u603B\u7BA1\u4F1A\u7EE7\u7EED\u6838\u5BF9\u6570\u636E\u3002")},u=await xs("observation-plan",{caseId:a,...l},m=>pt.observationPlan(a,{...l,idempotency_key:m}),c);f.observationBusy=!1,u.value&&c(),u.pending?(vt(),rn("\u6B63\u5728\u6838\u5BF9\u89C2\u5BDF\u8BA1\u5212\u7684\u4FDD\u5B58\u8BB0\u5F55\u3002")):(await Ia(),await ri())}catch(c){f.observationBusy=!1,f.observationError=c,vt()}}window.addEventListener("hashchange",()=>{if(Np)return;let n=Na(location.hash);n!==f.page&&wa(n)});document.addEventListener?.("visibilitychange",()=>{!document.hidden&&f.page==="ai"&&Mi&&Mi.refresh().then(()=>At())});typeof IntersectionObserver<"u"&&new IntersectionObserver(([n])=>{lu=n.isIntersecting,lu&&f.page==="ai"&&Mi&&At()}).observe(Fe);window.addEventListener("beforeunload",()=>{Gn?.dispose(),clearTimeout(au),clearTimeout(ya),clearTimeout(eb),clearTimeout(va),_t.dispose()});rc();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
