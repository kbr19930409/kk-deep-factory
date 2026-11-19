import {isAbsolute, join} from 'node:path';
import {readFile} from 'node:fs/promises';
import {createFactoryHandler} from './APIorchestrator.mjs';
import {callFactoryModel} from './model-bridge.mjs';
import {MAX_BRIDGE_BYTES, validateBridgeEnvelope} from './bridge-policy.mjs';
import {buildFactoryUiHtml} from './ui-document.mjs';

export const name = 'kk-deep-factory';
export const inject = ['connection', 'llm'];

export function apply(ctx) {
  const profileDir = ctx.get?.('profileContext')?.dir || process.env.DSH_PROFILE_DIR;
  const dataDir = process.env.KK_DEEP_FACTORY_DATA_DIR || (profileDir && join(profileDir, 'data', 'kk-deep-factory'));
  if (!dataDir || !isAbsolute(dataDir)) {
    throw new Error('工厂插件需要 DSH 配置档路径或绝对路径 KK_DEEP_FACTORY_DATA_DIR。');
  }
  const handler = createFactoryHandler(ctx, callFactoryModel, {
    database: join(dataDir, 'factory.sqlite'),
    legacyIoT: false,
  });
  const lifetime = new AbortController();
  const pending = new Set();
  ctx.effect(() => async () => {
    lifetime.abort();
    await Promise.allSettled([...pending]);
  });
  // Connection's registered exact routes reject all principals except owner.
  // No WebServer bypass and no client-supplied actor/role grants are used.
  ctx.connection.fetch.register({
    path: '/api/kk-deep-factory/ui', methods: ['GET'], requestBody: 'buffered',
    fetch: async () => {
      try {
        const [html, js, css] = await Promise.all(['index.html', 'main.js', 'styles.css'].map(file => readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8')));
        return new Response(buildFactoryUiHtml({html, js, css}), {headers: {'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff'}});
      } catch (error) {
        const code = typeof error?.code === 'string' && /^[A-Z0-9_]+$/.test(error.code) ? error.code : 'UNKNOWN';
        const category = error?.message === 'Built index.html must reference /main.js exactly once.'
          ? 'UI_DOCUMENT_SCRIPT_MISMATCH'
          : code !== 'UNKNOWN' ? `DIST_FILE_READ_${code}` : 'UI_DOCUMENT_BUILD_FAILED';
        console.error(`[kk-deep-factory] ui_unavailable category=${category}`);
        return Response.json({error: {code: 'FACTORY_UI_UNAVAILABLE', message: '工厂页面尚未完成构建。'}}, {status: 503});
      }
    },
  });
  ctx.connection.fetch.register({
    path: '/api/kk-deep-factory/bridge', methods: ['POST'], requestBody: 'buffered',
    fetch: request => {
      const task = bridge(request, handler, lifetime.signal);
      pending.add(task);
      void task.then(() => pending.delete(task), () => pending.delete(task));
      return task;
    },
  });
}

async function bridge(request, handler, lifetime) {
  try {
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return Response.json({error: {code: 'JSON_REQUIRED', message: '仅支持 JSON 请求。'}}, {status: 415});
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BRIDGE_BYTES) return Response.json({error: {code: 'PAYLOAD_TOO_LARGE'}}, {status: 413});
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > MAX_BRIDGE_BYTES) return Response.json({error: {code: 'PAYLOAD_TOO_LARGE'}}, {status: 413});
    let envelope;
    try { envelope = validateBridgeEnvelope(JSON.parse(raw)); }
    catch (error) { return Response.json({error: {code: 'REQUEST_NOT_ALLOWED', message: error.message}}, {status: 400}); }
    const headers = {'content-type': 'application/json', 'x-factory-actor-source': 'authenticated-dsh-owner'};
    const internalRequest = new Request(`http://factory.internal${envelope.path}`, {
      method: envelope.method, headers,
      ...(envelope.method === 'GET' || envelope.body == null ? {} : {body: JSON.stringify(envelope.body)}),
      signal: AbortSignal.any([request.signal, lifetime]),
    });
    const result = await handler(internalRequest);
    const response = new Response(result.body, {status: result.status, headers: {'content-type': result.headers.get('content-type') || 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff'}});
    return response;
  } catch {
    return Response.json({error: {code: 'FACTORY_BRIDGE_FAILED', message: '工厂服务连接失败，请读取任务状态确认结果后重试。'}}, {status: 502});
  }
}
