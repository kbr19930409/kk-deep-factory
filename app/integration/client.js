// DSH browser artifacts use this loader wrapper, not a plain ESM script tag.
window.__ModuleLoader__.load({id: 'kk-deep-factory', factory: require => {
  const React = require('react');
  const h = React.createElement;
  const NS = 'kk-deep-factory';
  const PANEL = 'kk-deep-factory';
  // Opaque child frames cannot access localStorage. Expose only per-contact
  // read positions, scoped to this authenticated workspace mount.
  async function handleChatReads(data) {
    const roles=['manager','efficiency_advisor','maintenance_advisor','maintenance_coordinator'];
    const prefix='kk-deep-factory:chat-read:v1:'+location.pathname.replace(/\/$/,'')+':';
    const valid=cursor=>Number.isSafeInteger(cursor?.time)&&cursor.time>=0&&Array.isArray(cursor.keys)
      &&cursor.keys.length<=1024&&cursor.keys.every(key=>typeof key==='string'&&/^[a-zA-Z0-9_:-]{1,192}$/.test(key));
    const read=role=>{
      try{const cursor=JSON.parse(localStorage.getItem(prefix+role));return valid(cursor)?cursor:null;}
      catch{return null;}
    };
    if(data.action==='load')return Object.fromEntries(roles.map(role=>[role,read(role)]).filter(([,cursor])=>cursor));
    if(data.action!=='mark'||!roles.includes(data.role)||!valid(data.cursor))throw new Error('无效的会话阅读位置。');
    const commit=()=>{
      const stored=read(data.role);
      if(stored&&stored.time>data.cursor.time)return stored;
      const keys=stored?.time===data.cursor.time?[...new Set([...stored.keys,...data.cursor.keys])]:data.cursor.keys;
      const cursor={time:data.cursor.time,keys};
      localStorage.setItem(prefix+data.role,JSON.stringify(cursor));
      return cursor;
    };
    return globalThis.navigator?.locks?globalThis.navigator.locks.request(prefix+data.role,commit):commit();
  }
  // The opaque product iframe cannot use storage. Keep only hashed intent
  // signatures and opaque request IDs, inside this runtime's tab session.
  function handlePendingRequest(data) {
    const storageKey = 'kk-deep-factory:pending-requests:v1';
    const validSignature = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
    const validKey = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value);
    const entries = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(entries) || !entries.every(entry => validSignature(entry?.signature) && validKey(entry?.key))) {
      throw new Error('待核对的提交记录暂时无法读取。');
    }
    if (data.action === 'get') return entries.map(({signature, key, paused}) => ({signature, key, ...(paused===true?{paused:true}:{})}));
    if (!validSignature(data.signature) || !validKey(data.key)) throw new Error('提交记录编号无效。');
    const existing = entries.find(entry => entry.signature === data.signature);
    if (data.action === 'set-paused') {
      if (typeof data.paused !== 'boolean') throw new Error('待核对状态无效。');
      if (existing?.key === data.key) {
        if (data.paused) existing.paused=true; else delete existing.paused;
        sessionStorage.setItem(storageKey, JSON.stringify(entries));
      }
      return;
    }
    if (data.action === 'put') {
      if (existing) return existing.key;
      entries.push({signature: data.signature, key: data.key});
      sessionStorage.setItem(storageKey, JSON.stringify(entries));
      return data.key;
    }
    if (data.action !== 'remove') throw new Error('不支持的提交记录操作。');
    if (existing?.key === data.key) {
      const remaining = entries.filter(entry => entry !== existing);
      if (remaining.length) sessionStorage.setItem(storageKey, JSON.stringify(remaining));
      else sessionStorage.removeItem(storageKey);
    }
  }
  const allowed = (path, method) => typeof path === 'string' && (
    method === 'GET' && (/^\/api\/(bootstrap|simulation|iot|ems|ems\/metrics|manager|employees|memories|messages|skills|routines|task-board|conversation-actions)$/.test(path) || /^\/api\/(assets|cases|work-orders|jobs|artifacts|receipts)\/[A-Za-z0-9_-]{1,128}$/.test(path) || /^\/api\/manager\/turns\/[A-Za-z0-9_-]{1,128}$/.test(path) || /^\/api\/employees\/[A-Za-z0-9_-]{1,128}\/context$/.test(path) || /^\/api\/tasks\/[A-Za-z0-9_-]{1,128}\/detail$/.test(path))
    || method === 'POST' && (/^\/api\/(analyses|proposals\/approve|employee-runs|import|detections|simulation\/control|iot\/sync|ems\/sync|manager\/messages|memories|skills|routines|conversations\/search)$/.test(path) || /^\/api\/(work-orders|cases)\/[A-Za-z0-9_-]{1,128}\/transition$/.test(path) || /^\/api\/cases\/[A-Za-z0-9_-]{1,128}\/(observation-plan|stop|remind)$/.test(path) || /^\/api\/manager\/turns\/[A-Za-z0-9_-]{1,128}\/(approve|resume|decision|stop)$/.test(path) || /^\/api\/(employees|memories|skills|routines)\/[A-Za-z0-9_-]{1,128}$/.test(path) || /^\/api\/employees\/[A-Za-z0-9_-]{1,128}\/messages$/.test(path) || /^\/api\/memories\/[A-Za-z0-9_-]{1,128}\/delete$/.test(path) || /^\/api\/routines\/[A-Za-z0-9_-]{1,128}\/(run|pause|resume|delete)$/.test(path))
  );

  function FactoryPanel() {
    const frame = React.useRef(null);
    const [html, setHtml] = React.useState('');
    const [error, setError] = React.useState('');
    const [attempt, setAttempt] = React.useState(0);
    React.useEffect(() => {
      let disposed = false;
      let port;
      const jobs = new Map();
      const lifetime = new AbortController();
      const nonce = crypto.randomUUID();
      setHtml(''); setError('');
      const listener = event => {
        if (event.source !== frame.current?.contentWindow || event.data?.type !== 'factory-ready' || event.data.nonce !== nonce || port) return;
        const channel = new MessageChannel();
        port = channel.port1;
        port.onmessage = async event => {
          const data = event.data;
          if (data?.type === 'cancel') { jobs.get(data.id)?.abort(); return; }
          if (!Number.isSafeInteger(data?.id) || jobs.has(data.id)) return;
          if (data.type === 'open-peer-directory') {
            // The native picker owns directory permissions, search and the current login.
            const entry = document.querySelector('button[aria-label="我的AI同事"],button[aria-label="我的 AI 同事"]');
            if (!entry || entry.disabled) {
              port.postMessage({id:data.id,error:'当前工作区的「我的 AI 同事」入口暂不可用。'});
              return;
            }
            if (entry.getAttribute('aria-pressed') !== 'true') entry.click();
            port.postMessage({id:data.id,value:true});
            return;
          }
          if (data.type === 'chat-read') {
            try { port.postMessage({id:data.id,value:await handleChatReads(data)}); }
            catch { port.postMessage({id:data.id,error:'会话阅读位置暂时无法保存。'}); }
            return;
          }
          if (data.type === 'pending-request') {
            try { port.postMessage({id: data.id, value: handlePendingRequest(data)}); }
            catch { port.postMessage({id: data.id, error: '无法读写当前工作区的待核对提交记录。'}); }
            return;
          }
          if (data.type !== 'fetch') return;
          if (!allowed(data.path, data.method)) { port.postMessage({id: data.id, error: '该工厂请求未被授权。', beforeDispatch: true, status: 403}); return; }
          if (jobs.size >= 24) { port.postMessage({id: data.id, error: '请求过多，请稍后重试。', beforeDispatch: true, status: 429}); return; }
          const controller = new AbortController();
          jobs.set(data.id, controller);
          try {
            const body = JSON.stringify({path: data.path, method: data.method, ...(data.body == null ? {} : {body: data.body})});
            if (new TextEncoder().encode(body).byteLength > 2 * 1024 * 1024) {
              port.postMessage({id: data.id, error: '导入数据过大，请分批提交。', beforeDispatch: true, status: 413}); return;
            }
            // Document-relative URL retains the Host's reverse-proxy mount prefix.
            const response = await fetch('api/kk-deep-factory/bridge', {method: 'POST', credentials: 'same-origin', headers: {'content-type': 'application/json'}, body, signal: AbortSignal.any([lifetime.signal, controller.signal])});
            const bodyText = await response.text();
            if (!disposed) port.postMessage({id: data.id, status: response.status, contentType: response.headers.get('content-type'), bodyText});
          } catch (error) {
            if (!disposed) port.postMessage({id: data.id, error: error.name === 'AbortError' ? '请求已取消，请刷新任务确认状态。' : '工厂服务连接失败，请刷新任务确认状态。'});
          } finally { jobs.delete(data.id); }
        };
        port.start();
        event.source.postMessage({type: 'factory-init', nonce, pendingJournal: true}, '*', [channel.port2]);
      };
      addEventListener('message', listener);
      fetch('api/kk-deep-factory/ui', {credentials: 'same-origin', signal: lifetime.signal}).then(async response => {
        if (!response.ok) throw new Error(`工厂页面暂不可用（${response.status}）。`);
        const source = await response.text();
        if (!disposed) setHtml(source.replaceAll('__FACTORY_BRIDGE_NONCE__', nonce));
      }).catch(error => { if (!disposed) setError(error.message); });
      return () => { disposed = true; lifetime.abort(); port?.close(); removeEventListener('message', listener); };
    }, [attempt]);
    if (error) return h('div', {role: 'alert', style: {padding: 32, color: 'inherit'}}, h('p', null, error), h('button', {type: 'button', onClick: () => setAttempt(value => value + 1)}, '重试连接'));
    if (!html) return h('div', {role: 'status', style: {padding: 32}}, '正在打开我的工厂…');
    return h('iframe', {ref: frame, title: '我的工厂', srcDoc: html, sandbox: 'allow-scripts', referrerPolicy: 'no-referrer', style: {display: 'block', width: '100%', height: '100%', minHeight: 480, border: 0, flex: 1}});
  }

  function FactoryIcon() {
    return h('svg', {viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, 'aria-hidden': true},
      h('path', {d: 'M3 21V10l6 3V8l6 3V3h4l2 18H3Z'}),
      h('path', {d: 'M7 17h2m4 0h2m3 0h1'}));
  }

  return {
    name: 'kk-deep-factory-client',
    inject: ['slots', 'locale'],
    apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, {zh: {panel: '我的工厂'}, en: {panel: 'My Factory'}}));
      ctx.effect(function* () {
        yield ctx.slots.inject('main', () => ctx.slots.register({name: 'main', key: PANEL, locale: NS}, FactoryPanel));
        yield ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({name: 'sidebar.panellist', id: PANEL, order: 15, locale: NS, label: () => '我的工厂'}, FactoryIcon));
      });
    },
  };
}});
