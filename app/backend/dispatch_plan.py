"""Choose the next workshop responsibility from scoped records and operator observations."""
import re
from collections import Counter


LOSS = 'efficiency_advisor'
DIAGNOSIS = 'maintenance_advisor'
LEGACY_ROLES = (LOSS, DIAGNOSIS)


def required_roles(case, snapshot_hash=None):
    plan = case.get('analysis_plan') or {}
    if plan and plan.get('analysis_cycle') == case.get('analysis_cycle') and plan.get('snapshot_hash') != (snapshot_hash or case.get('metrics', {}).get('snapshot_hash')):
        return ()
    if plan and plan.get('analysis_cycle') == case.get('analysis_cycle') and plan.get('snapshot_hash') == (snapshot_hash or case.get('metrics', {}).get('snapshot_hash')):
        return tuple(plan['roles'])
    return LEGACY_ROLES


def field_question(kind, reply, labels):
    return {'route': 'field', 'roles': [], 'reason': reply,
            'question': {'kind': kind, 'choices': [{'label': label, 'text': label} for label in labels]}}


def plan_for_case(case, event_rows, turn):
    metrics = case['metrics']
    facts = turn.get('field_facts') or []
    observations = [f for f in facts if f.get('kind') != 'window' or not re.fullmatch(r'(?:现场反馈[：:]\s*)?(?:已补录，请重新核对|记录暂时不全)[。！\s]*',f['text'])]
    observed = observations[-1]['text'] if observations else turn.get('message', '')
    # Questions and explicitly uncertain or negated observations cannot substantiate a cause.
    statements = [s.strip() for s in re.split(r'[，,。；;！!、\n]', observed) if s.strip()]
    statements = [s for s in statements if not re.search(r'是否|有没有|可能|好像|似乎|不确定|待核实|未确认|查一查|[?？]|[吗么呢]$', s)]
    def affirmative(pattern):
        negative = r'(?:不(?:是|在|再|存在)?|无|未(?:见|有|发生|出现|发现)?|排除|并非|没(?:有)?)(?:设备|任何|在|这类|同类|明显|再次|出现|伴随)?$'
        return any(not re.search(negative,s[:hit.start()].rstrip()) for s in statements for hit in re.finditer(pattern,s))
    material = r'待料|等料|缺料|供料不足|等上游|下游堵塞|来料问题'
    process = r'换型|换刀|工艺参数|程序切换|等待首检|首件确认|工艺调整'
    alarm = r'报警|告警|故障码|故障代码|异常振动|异常噪声|设备异响'
    # Only event rows from this equipment, source and frozen production window enter this function.
    stops = [r for r in event_rows if r.get('state') == 'STOPPED' and r.get('quality') == 'GOOD']
    def alarm_signature(row):
        code = str(row.get('alarm_code') or row.get('fault_code') or '').strip()
        if code and code.lower() not in ('none','unknown','0','无'): return code
        match = re.search(r'(?:报警|故障码|告警)\s*[:：#]?\s*([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)', str(row.get('reason') or ''))
        return match.group(1) if match else None
    counts = Counter(code for r in stops if (code := alarm_signature(r)))
    repeated = {code for code, count in counts.items() if count >= 2}
    recorded_process = [r for r in stops if re.search(material+'|'+process, str(r.get('reason') or ''))
                        and not re.search(r'待核实|疑似|可能|排除', str(r.get('reason') or ''))]
    field_ids = [f['id'] for f in facts]
    process_reply = bool(facts and facts[-1].get('kind') == 'process')
    if process_reply and affirmative(r'运行正常|已恢复正常|没有再停|未再短停') and not affirmative(alarm):
        return {'route':'process_followup','roles':[],'reason':'已记录班组反馈：现场条件恢复后运行正常。请班组保留交接记录，后续继续查看同班次短停是否再发。'}
    if (affirmative(material+'|'+process) or recorded_process or process_reply) and not affirmative(alarm) and not repeated:
        return field_question('process', '请当班班组和工艺人员核实供料、换型或工序衔接：恢复供料或完成切换后，设备是否仍短停？',
                              ['恢复后运行正常','恢复后仍停，有设备报警','尚未核实'])
    if metrics.get('status') != 'valid' or not metrics.get('record_ids'):
        return field_question('window', '这个班次的生产记录或数据覆盖不完整。请班组核对发生时段，并补录相应的停机和产量记录，再沿本事项核查。',
                              ['已补录，请重新核对','记录暂时不全'])
    if repeated or affirmative(alarm):
        ids = [r['id'] for r in stops if alarm_signature(r) in repeated] + field_ids
        slow = [r for r in event_rows if r.get('quality')=='GOOD' and re.search(r'降速运行|节拍下降',str(r.get('reason') or ''))]
        ids.extend(r['id'] for r in slow)
        need_loss = bool(slow or re.search(r'量化|损失多少|损失最大|区分.{0,6}损失|短停.{0,8}(?:影响|占比)|核对.{0,8}OEE', turn.get('message',''), re.I))
        reason = ('班次内多条停机记录出现同一报警（'+'、'.join(sorted(repeated))+'）' if repeated else '班组报告了设备异常现象，原因尚需核实')
        return {'route':'diagnosis','roles':[DIAGNOSIS]+([LOSS] if need_loss else []),'reason':reason,'evidence_ids':ids}
    if not facts and re.search(r'量化|核算|损失多少|损失最大|主要损失|区分.{0,6}损失|短停.{0,8}(影响|占比)',turn.get('message','')):
        return {'route':'loss','roles':[LOSS],'reason':'这次先核对同班次损失构成和短停占比，数据只支持量化影响。','evidence_ids':metrics.get('record_ids',[])}
    return field_question('shopfloor', '最近一次停下来时，有报警、在等料，还是其他情况？请当班人员补充看到的现象。', ['有设备报警','在等料','换型或工艺调整','现场还不清楚'])
