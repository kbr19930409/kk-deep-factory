/** Real DSH runtime calls. This module neither reads credentials nor executes tools. */
let runtimeModule;
const runtime = () => runtimeModule ||= import('@deepseek-ai/dsh-llm');

const callTimeoutMs = options => Math.min(600000, Math.max(1000, Number.isFinite(options.timeoutMs) ? options.timeoutMs : 300000));

// An adapter's signal support is cooperative. Bound the actual await as well,
// so a stalled prepare/next cannot keep a business job in "thinking" forever.
async function awaitModelBoundary(promise, signal) {
  if (signal.aborted) {
    void Promise.resolve(promise).catch(() => {});
    signal.throwIfAborted();
  }
  let abort;
  try {
    return await Promise.race([promise, new Promise((_, reject) => {
      abort = () => reject(signal.reason);
      signal.addEventListener('abort', abort, {once:true});
    })]);
  } finally { signal.removeEventListener('abort', abort); }
}

export class FactoryModelError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'FactoryModelError';
    this.code = code;
    this.details = details;
  }
}

/** Read only route identifiers; never inspect provider configuration or credentials. */
export function getFactoryModelRoute(ctx, fallback) {
  const defaults = typeof ctx?.get === 'function' ? ctx.get('agentDefaultModel') : ctx?.agentDefaultModel;
  const selected = defaults?.currentSelection?.() || fallback;
  if (typeof selected?.provider !== 'string' || !selected.provider || typeof selected?.model !== 'string' || !selected.model) {
    throw new FactoryModelError('MODEL_ROUTE_REQUIRED', '平台未提供可用的默认模型选择。');
  }
  // Never silently choose the first provider or change the platform selection.
  if (typeof ctx?.llm?.listProviders === 'function' && !ctx.llm.listProviders().some(item => item.id === selected.provider)) {
    throw new FactoryModelError('MODEL_ROUTE_UNAVAILABLE', '平台默认模型提供方尚未就绪。');
  }
  return {provider: selected.provider, model: selected.model,
    ...(typeof selected.reasoningEffort === 'string' ? {reasoningEffort: selected.reasoningEffort} : {})};
}

/** Exported factory makes protocol handling testable without a running DSH Host. */
export function createFactoryModelBridge({BlockAssembler}, deadline) {
  return async function callFactoryModel(ctx, options) {
    const {system, messages, tools = [], provider, model, signal} = options;
    if (typeof ctx?.llm?.prepareCall !== 'function' && typeof ctx?.llm?.stream !== 'function') throw new FactoryModelError('MODEL_RUNTIME_UNAVAILABLE', 'DSH 模型运行时不可用。');
    if (typeof provider !== 'string' || !provider || typeof model !== 'string' || !model) {
      throw new FactoryModelError('MODEL_ROUTE_REQUIRED', '必须选择已配置的 DSH provider 和 model。');
    }
    if (!Array.isArray(messages) || !messages.length || !Array.isArray(tools)) throw new FactoryModelError('MODEL_INPUT_INVALID', '模型上下文格式不正确。');
    const maxTokens = Math.min(8192, Math.max(256, Number.isFinite(options.maxTokens) ? Math.floor(options.maxTokens) : 4096));
    // Finite total-call deadline for background jobs, including preparation and streaming.
    // This is not an idle timeout; an actively generating model still consumes this budget.
    const timeout = deadline?.timeout || AbortSignal.timeout(callTimeoutMs(options));
    const combined = deadline?.signal || (signal ? AbortSignal.any([signal, timeout]) : timeout);
    const assembler = new BlockAssembler();
    let finish;
    const startedAt = deadline?.startedAt ?? performance.now();
    let iterator, streamEnded = false;
    let phase = 'prepare_call';
    let firstChunkMs = null;
    let observedFinishKind = null;
    const chunkCounts = {};
    const chunkTypes = new Set(['block-start', 'text-delta', 'reasoning-delta', 'tool-call-delta', 'block-end', 'usage', 'finish']);
    const finishKinds = new Set(['stop', 'tool-calls', 'max-tokens', 'aborted', 'error']);
    // Deliberately exclude model text, prompt, tool arguments, URLs and raw provider errors.
    const diagnostics = () => ({phase, elapsed_ms: Math.round(performance.now() - startedAt), chunk_counts: {...chunkCounts}, first_chunk_ms: firstChunkMs, finish_kind: observedFinishKind});
    try {
      combined.throwIfAborted();
      const config = {provider, model, maxTokens, ...(options.reasoningEffort ? {reasoningEffort: options.reasoningEffort} : {})};
      const usesPreparedCall = typeof ctx.llm.prepareCall === 'function';
      const prepared = usesPreparedCall
        ? await awaitModelBoundary(ctx.llm.prepareCall(config, combined), combined)
        : {config, stream: request => ctx.llm.stream(request)};
      combined.throwIfAborted();
      phase = 'streaming';
      iterator = prepared.stream({...prepared.config, system, messages, tools, signal: combined})[Symbol.asyncIterator]();
      while (true) {
        const next = await awaitModelBoundary(iterator.next(), combined);
        if (next.done) { streamEnded = true; break; }
        const chunk = next.value;
        firstChunkMs ??= Math.round(performance.now() - startedAt);
        const chunkType = chunkTypes.has(chunk?.type) ? chunk.type : 'other';
        chunkCounts[chunkType] = (chunkCounts[chunkType] || 0) + 1;
        if (chunk?.type === 'finish') observedFinishKind = finishKinds.has(chunk.reason?.kind) ? chunk.reason.kind : 'other';
        combined.throwIfAborted();
        if (finish) throw new FactoryModelError('MODEL_PROTOCOL_INVALID', '模型终止后仍返回数据。');
        assembler.push(chunk);
        if (chunk.type === 'finish') { finish = chunk.reason; phase = 'awaiting_stream_end'; }
      }
      combined.throwIfAborted();
      phase = 'assembling';
      if (!finish) throw new FactoryModelError('MODEL_STREAM_INCOMPLETE', '模型连接结束，但未返回完成回执。');
      if (!['stop', 'tool-calls'].includes(finish.kind)) {
        throw new FactoryModelError(finish.kind === 'max-tokens' ? 'MODEL_TRUNCATED' : finish.kind === 'aborted' ? 'MODEL_ABORTED' : 'MODEL_FAILED',
          finish.kind === 'max-tokens' ? '模型达到输出限制，本次结果不能作为已完成操作。' : '模型调用未成功完成。', {finishReason: finish.kind});
      }
      const blocks = assembler.blocks();
      const toolCalls = blocks.filter(block => block.type === 'tool-call').map(({id, name, arguments: args}) => ({id, name, arguments: args}));
      const declared = new Set(tools.map(tool => tool.name));
      const seen = new Set();
      for (const call of toolCalls) {
        if (!call.id || seen.has(call.id) || !declared.has(call.name) || typeof call.arguments !== 'string') throw new FactoryModelError('MODEL_TOOL_INVALID', '模型请求了无效或未声明的工具。');
        seen.add(call.id);
        try {
          const parsed = JSON.parse(call.arguments);
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
        } catch { throw new FactoryModelError('MODEL_TOOL_ARGUMENTS_INVALID', '模型工具参数不是完整的 JSON 对象。'); }
      }
      if (finish.kind === 'tool-calls' && !toolCalls.length) throw new FactoryModelError('MODEL_TOOL_MISSING', '模型声明调用工具，但未返回工具调用。');
      const source = {provider, model, ...(assembler.replayState === undefined ? {} : {replayState: assembler.replayState})};
      return {
        text: blocks.filter(block => block.type === 'text').map(block => block.text).join('\n'),
        toolCalls,
        tool_calls: toolCalls.map(call => ({id: call.id, type: 'function', function: {name: call.name, arguments: call.arguments}})),
        // Server-only: preserve native message identity and replay metadata for the next model turn.
        message: assembler.message(source),
        usage: assembler.usage || null,
        finishReason: finish.kind,
        runtimeProtocol: usesPreparedCall ? 'prepareCall' : 'stream',
        provider, model,
      };
    } catch (error) {
      if (error instanceof FactoryModelError) { error.details = diagnostics(); throw error; }
      if (signal?.aborted) throw new FactoryModelError('MODEL_ABORTED', '模型任务已取消。', diagnostics());
      if (timeout.aborted) throw new FactoryModelError('MODEL_TIMEOUT', '模型调用超时，未确认完成。', diagnostics());
      // Provider errors can contain upstream URLs or headers. Never forward the raw message.
      throw new FactoryModelError('MODEL_FAILED', 'DSH 模型调用失败，请检查已配置的模型连接。', diagnostics());
    } finally {
      if (iterator && !streamEnded && typeof iterator.return === 'function') {
        // Give the native stream a chance to release resources, without waiting
        // on another cooperative method after the hard business deadline.
        try { void Promise.resolve(iterator.return()).catch(() => {}); } catch {}
      }
    }
  };
}

export async function callFactoryModel(ctx, options) {
  const startedAt = performance.now();
  const timeout = AbortSignal.timeout(callTimeoutMs(options));
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  try {
    const module = await awaitModelBoundary(runtime(), signal);
    return await createFactoryModelBridge(module, {startedAt,timeout,signal})(ctx, options);
  } catch (error) {
    if (error instanceof FactoryModelError) throw error;
    const details = {phase:'runtime_import',elapsed_ms:Math.round(performance.now()-startedAt),chunk_counts:{},first_chunk_ms:null,finish_kind:null};
    if (options.signal?.aborted) throw new FactoryModelError('MODEL_ABORTED', '模型任务已取消。', details);
    if (timeout.aborted) throw new FactoryModelError('MODEL_TIMEOUT', '模型调用超时，未确认完成。', details);
    throw new FactoryModelError('MODEL_RUNTIME_UNAVAILABLE', 'DSH 模型模块尚未就绪。', details);
  }
}

/** Identity-free DSH RequestUserInput; valid for an auxiliary model call. */
export function makeFactoryUserMessage(text) {
  if (typeof text !== 'string') throw new TypeError('User message must be text.');
  return {role: 'user', content: [{type: 'text', text}]};
}

export async function makeFactoryToolResult(callId, result, isError = false) {
  if (typeof callId !== 'string' || !callId) throw new TypeError('tool callId is required');
  const {createToolResultMessage} = await runtime();
  return createToolResultMessage({callId, isError, content: [{type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result)}]});
}
