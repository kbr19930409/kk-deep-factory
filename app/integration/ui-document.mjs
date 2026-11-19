/** This function is serialized into an opaque iframe; it has no Host imports. */
function frameBootstrap(nonce) {
  const pending = new Map();
  let port;
  let journalSupported = false;
  let sequence = 0;
  let resolveReady;
  const ready = new Promise(resolve => { resolveReady = resolve; });
  addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'factory-init' || event.data.nonce !== nonce || !event.ports[0] || port) return;
    port = event.ports[0];
    journalSupported = event.data.pendingJournal === true;
    port.onmessage = event => {
      const data = event.data;
      const item = pending.get(data?.id);
      if (!item) return;
      pending.delete(data.id);
      clearTimeout(item.timer);
      item.detach();
      if (data.error) item.reject(Object.assign(new Error(data.error), { beforeDispatch: data.beforeDispatch === true, status: data.status }));
      else if (item.journal) item.resolve(data.value);
      else item.resolve(new Response(data.bodyText ?? '', {status: data.status, headers: {'content-type': data.contentType || 'application/json'}}));
    };
    port.start();
    resolveReady();
  });
  async function send(message, signal) {
    signal?.throwIfAborted();
    let readyTimer;
    await Promise.race([ready, new Promise((_, reject) => {
      readyTimer = setTimeout(() => reject(Object.assign(new Error('工厂主机未连接。'), {beforeDispatch: true})), 15000);
    })]).finally(() => clearTimeout(readyTimer));
    if (signal?.aborted) throw Object.assign(new Error('请求已在提交前取消。'), {beforeDispatch: true});
    const journal = ['pending-request','chat-read','open-peer-directory'].includes(message.type);
    if (message.type === 'pending-request' && !journalSupported) throw new Error('请重新打开工作区，以读取待核对的提交记录。');
    const id = ++sequence;
    return new Promise((resolve, reject) => {
      const cancel = () => {
        const item = pending.get(id);
        if (!item) return;
        pending.delete(id);
        clearTimeout(item.timer);
        item.detach();
        if (!journal) port.postMessage({type: 'cancel', id});
        reject(new DOMException('工厂请求未收到回执。', 'AbortError'));
      };
      const timer = setTimeout(cancel, journal ? 5000 : 300000);
      const detach = () => signal?.removeEventListener('abort', cancel);
      pending.set(id, {resolve, reject, timer, detach, journal});
      signal?.addEventListener('abort', cancel, {once: true});
      port.postMessage({...message, id});
    });
  }
  window.__FACTORY_FETCH__ = (path, init = {}) => {
    if (typeof path !== 'string' || !path.startsWith('/api/')) throw new TypeError('不支持的工厂请求地址。');
    const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
    return send({type: 'fetch', path, method: (init.method || 'GET').toUpperCase(), ...(body == null ? {} : {body})}, init.signal);
  };
  window.__FACTORY_PENDING__ = {
    get: () => send({type: 'pending-request', action: 'get'}),
    put: (signature, key) => send({type: 'pending-request', action: 'put', signature, key}),
    setPaused: (signature, key, paused) => send({type: 'pending-request', action: 'set-paused', signature, key, paused}),
    remove: (signature, key) => send({type: 'pending-request', action: 'remove', signature, key}),
  };
  window.__FACTORY_CHAT_READS__ = {
    load:()=>send({type:'chat-read',action:'load'}),
    mark:(role,cursor)=>send({type:'chat-read',action:'mark',role,cursor}),
  };
  window.__FACTORY_OPEN_PEERS__ = () => send({type:'open-peer-directory'});
  parent.postMessage({type: 'factory-ready', nonce}, '*');
}

export function buildFactoryUiHtml({html, js, css}) {
  const policy = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; worker-src blob:; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'";
  const escapeScript = text => text.replace(/<\/script/gi, '<\\/script');
  const bootstrap = `(${frameBootstrap.toString()})("__FACTORY_BRIDGE_NONCE__");`;
  const head = `<meta http-equiv="Content-Security-Policy" content="${policy}"><script>${escapeScript(bootstrap)}</script><style>${css.replace(/<\/style/gi, '<\\/style')}</style>`;
  const inline = html.replace(/<script\b[^>]*\bsrc=["'](?:\.\/|\/)?main\.js["'][^>]*>\s*<\/script>/i, () => `<script type="module">${escapeScript(js)}</script>`);
  if (inline === html) throw new Error('Built index.html must reference /main.js exactly once.');
  return inline.replace(/<head\b[^>]*>/i, match => match + head).replace(/<link\b[^>]*href=["'](?:\.\/|\/)?styles\.css["'][^>]*>/gi, '');
}
