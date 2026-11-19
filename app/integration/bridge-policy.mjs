// This is an application allowlist, not a claim that DSH implements these APIs.
export const MAX_BRIDGE_BYTES = 2 * 1024 * 1024;
export const FACTORY_ROUTES = Object.freeze({
  GET: [
    /^\/api\/bootstrap$/,
    /^\/api\/simulation$/,
    /^\/api\/iot$/,
    /^\/api\/ems(?:\/metrics)?$/,
    /^\/api\/manager$/,
    /^\/api\/receipts\/[A-Za-z0-9_-]{1,250}$/,
    /^\/api\/(?:employees|memories|messages|skills|routines|task-board|conversation-actions)$/,
    /^\/api\/employees\/[A-Za-z0-9_-]{1,128}\/context$/,
    /^\/api\/tasks\/[A-Za-z0-9_-]{1,128}\/detail$/,
    /^\/api\/artifacts\/[A-Za-z0-9_-]{1,128}$/,
    /^\/api\/manager\/turns\/[A-Za-z0-9_-]{1,128}$/,
    /^\/api\/(?:assets|cases|work-orders|jobs)\/[A-Za-z0-9_-]{1,128}$/,
  ],
  POST: [
    /^\/api\/(?:analyses|proposals\/approve|employee-runs|import|detections)$/,
    /^\/api\/simulation\/control$/,
    /^\/api\/iot\/sync$/,
    /^\/api\/ems\/sync$/,
    /^\/api\/manager\/messages$/,
    /^\/api\/manager\/turns\/[A-Za-z0-9_-]{1,128}\/(?:approve|resume|decision|stop)$/,
    /^\/api\/(?:memories|skills|routines)$/,
    /^\/api\/conversations\/search$/,
    /^\/api\/(?:employees|memories|skills|routines)\/[A-Za-z0-9_-]{1,128}$/,
    /^\/api\/employees\/[A-Za-z0-9_-]{1,128}\/messages$/,
    /^\/api\/memories\/[A-Za-z0-9_-]{1,128}\/delete$/,
    /^\/api\/routines\/[A-Za-z0-9_-]{1,128}\/(?:run|pause|resume|delete)$/,
    /^\/api\/cases\/[A-Za-z0-9_-]{1,128}\/(?:stop|remind)$/,
    /^\/api\/(?:work-orders|cases)\/[A-Za-z0-9_-]{1,128}\/transition$/,
    /^\/api\/cases\/[A-Za-z0-9_-]{1,128}\/observation-plan$/,
  ],
});

export function isAllowedFactoryRequest(path, method = 'GET') {
  // Encoded characters, queries and fragments are deliberately unsupported.
  // No normalization may turn an unapproved path into an approved one.
  return typeof path === 'string' && typeof method === 'string'
    && !!FACTORY_ROUTES[method]?.some(pattern => pattern.test(path));
}

export function validateBridgeEnvelope(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('请求格式不正确。');
  const method = value.method || 'GET';
  if (!isAllowedFactoryRequest(value.path, method)) throw new TypeError('该工厂操作不在允许范围内。');
  if (Object.keys(value).some(key => !['path', 'method', 'body'].includes(key))) throw new TypeError('请求包含不支持的字段。');
  if (method === 'GET' && value.body !== undefined && value.body !== null) throw new TypeError('读取请求不能携带正文。');
  if (value.body !== undefined && value.body !== null && (typeof value.body !== 'object' || Array.isArray(value.body))) throw new TypeError('请求正文必须是 JSON 对象。');
  return {path: value.path, method, body: value.body};
}
