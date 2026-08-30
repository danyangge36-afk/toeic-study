/* TOEIC 高分学习助手 - 主程序 */
"use strict";

/* ============ 工具 ============ */
const $ = (sel, el) => (el || document).querySelector(sel);
const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad2 = (n) => String(n).padStart(2, "0");
const todayStr = () => { const d = new Date(); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); };
const fmtDate = (ts) => { const d = new Date(ts); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); };
const LETTERS = ["A", "B", "C", "D"];

/* ============ 状态与存储 ============ */
const STORE_KEY = "toeic_app_v1";
let state = {
  settings: { rate: 0.95, voiceURI: "", examDate: "", goal: 730, autoSpeak: true, darkMode: false },
  stats: { answered: 0, correct: 0, days: {} },
  vocab: {},            // "catId:idx" -> {box, ts}
  wrongbook: [],        // {pool, idx, qIdx, ts}
  mockHistory: [],
  planChecks: {},       // 30 天计划勾选 "w周t任务" -> true
  poolStats: {},        // 各题库作答统计 {pool: {a, c}}
  challengeLog: {}      // 每日挑战完成记录 {"YYYY-MM-DD": true}
};
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* file:// 或隐私模式 */ }
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) state = Object.assign(state, JSON.parse(raw));
  } catch (e) { }
}
loadState();
state.planChecks = state.planChecks || {};   // 兼容旧存档
state.stats.days = state.stats.days || {};
state.poolStats = state.poolStats || {};
state.challengeLog = state.challengeLog || {};
state.wrongbook.forEach((e) => { if (e.box === undefined) { e.box = 0; e.next = 0; } });

const POOL_LABEL = { p1: "Part 1 照片", p2: "Part 2 问答", p3: "Part 3 对话", p4: "Part 4 短文", p5: "Part 5 填空", p6: "Part 6 长文", p7: "Part 7 阅读", dict: "听写" };
const ALL_POOLS = { p1: P1_DATA, p2: P2_DATA, p3: P3_DATA, p4: P4_DATA, p5: P5_DATA, p6: P6_DATA, p7: P7_DATA };

function getQuestion(pool, idx, qIdx) {
  const d = ALL_POOLS[pool][idx];
  if (pool === "p6") return d.blanks[qIdx];
  if (pool === "p3" || pool === "p4" || pool === "p7") return d.questions[qIdx];
  return d; // p1 / p2 / p5 数据本身就是一题
}
function getQuestionText(pool, idx, qIdx) {
  const d = ALL_POOLS[pool][idx];
  if (pool === "p5") return d.q;
  if (pool === "p6") return "（第 " + (qIdx + 1) + " 空）" + d.title;
  return d.questions[qIdx].q;
}

/* 记录一次作答 */
function recordAnswer(isCorrect, wrongEntry, pool) {
  state.stats.answered++;
  if (isCorrect) state.stats.correct++;
  const t = todayStr();
  state.stats.days[t] = (state.stats.days[t] || 0) + 1;
  if (pool) {
    if (!state.poolStats[pool]) state.poolStats[pool] = { a: 0, c: 0 };
    state.poolStats[pool].a++;
    if (isCorrect) state.poolStats[pool].c++;
  }
  if (!isCorrect && wrongEntry) addWrong(wrongEntry);
  saveState();
}
function addWrong(entry) {
  const key = (e) => e.pool + ":" + e.idx + ":" + e.qIdx;
  if (!state.wrongbook.some((e) => key(e) === key(entry))) {
    state.wrongbook.push(Object.assign({ ts: Date.now(), box: 0, next: 0 }, entry));
  }
}

/* ============ 打卡/统计 ============ */
function calcStreak() {
  let streak = 0;
  const d = new Date();
  if (!state.stats.days[todayStr()]) d.setDate(d.getDate() - 1); // 今天还没练则从昨天起算
  while (state.stats.days[fmtDate(d)]) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}
function masteredCount() {
  return Object.values(state.vocab).filter((v) => v.box >= 4).length;
}
const TOTAL_WORDS = VOCAB_DATA.reduce((n, c) => n + c.words.length, 0);

/* ============ TTS 朗读 ============ */
let VOICES = [];
function initVoices() {
  if (!("speechSynthesis" in window)) return;
  const fill = () => {
    VOICES = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
    const sel = $("#voiceSelect");
    if (sel) {
      sel.innerHTML = VOICES.map((v) => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${esc(v.lang)})</option>`).join("") || "<option>（未找到英语语音）</option>";
      if (state.settings.voiceURI) sel.value = state.settings.voiceURI;
    }
  };
  fill();
  speechSynthesis.onvoiceschanged = fill;
}
function speakList(items) {
  // items: [{text, onstart?}]
  if (!("speechSynthesis" in window)) { alert("当前浏览器不支持语音朗读，请使用 Chrome / Edge / Safari"); return; }
  speechSynthesis.cancel();
  const voice = VOICES.find((v) => v.voiceURI === state.settings.voiceURI);
  items.forEach((it) => {
    const u = new SpeechSynthesisUtterance(it.text);
    u.lang = "en-US";
    u.rate = state.settings.rate;
    if (voice) u.voice = voice;
    if (it.onstart) u.onstart = it.onstart;
    speechSynthesis.speak(u);
  });
}
function stopSpeak() { try { speechSynthesis.cancel(); } catch (e) { } }

/* ============ 词汇 SRS ============ */
const SRS_DAYS = [0, 1, 2, 4, 8, 15]; // box 0-5 对应间隔天数
function vKey(catId, i) { return catId + ":" + i; }
function isDue(rec) {
  if (!rec) return true;
  return Date.now() - rec.ts >= SRS_DAYS[Math.min(rec.box, 5)] * 86400000;
}
function dueWords(catId) {
  const out = [];
  VOCAB_DATA.forEach((cat) => {
    if (catId && catId !== "all" && cat.id !== catId) return;
    cat.words.forEach((w, i) => {
      if (isDue(state.vocab[vKey(cat.id, i)])) out.push({ cat: cat, i: i, w: w });
    });
  });
  return out;
}
function updateVocab(catId, i, correct) {
  const k = vKey(catId, i);
  const rec = state.vocab[k] || { box: 0, ts: 0 };
  rec.box = correct ? Math.min(rec.box + 1, 5) : 0;
  rec.ts = Date.now();
  state.vocab[k] = rec;
  recordAnswer(correct);
}

/* ============ 路由 ============ */
const NAV = [
  ["dashboard", "🏠 首页"],
  ["vocab", "📖 词汇"],
  ["listening", "🎧 听力"],
  ["dictation", "👂 听写"],
  ["reading", "📖 阅读"],
  ["mock", "⏱️ 模拟考试"],
  ["wrong", "❌ 错题本"],
  ["guide", "📌 备考指南"]
];
let currentView = "dashboard";
function go(view) {
  stopSpeak();
  currentView = view;
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  const fn = { dashboard: renderDashboard, vocab: renderVocab, listening: renderListening, dictation: renderDictation, reading: renderReading, mock: renderMock, wrong: renderWrong, guide: renderGuide, challenge: renderChallenge }[view];
  $("#view").innerHTML = "";
  fn($("#view"));
  window.scrollTo(0, 0);
}

function isDark() { return document.documentElement.classList.contains("dark"); }
function rateChipsHTML(id) {
  return `<label class="lbl" style="margin-top:10px">朗读速度（即点即用）</label><div class="chips" id="${id}">${[0.75, 0.9, 0.95, 1, 1.1].map((r) => `<button class="chip ${Math.abs(state.settings.rate - r) < 0.01 ? "active" : ""}" data-rate="${r}">${r}x</button>`).join("")}</div>`;
}
function bindRateChips(id) {
  $$("#" + id + " .chip").forEach((ch) => ch.addEventListener("click", () => {
    state.settings.rate = parseFloat(ch.dataset.rate); saveState();
    $$("#" + id + " .chip").forEach((x) => x.classList.toggle("active", x === ch));
  }));
}
function applyTheme() {
  document.documentElement.classList.toggle("dark", !!state.settings.darkMode);
  const b = $("#themeBtn");
  if (b) b.textContent = state.settings.darkMode ? "☀️" : "🌙";
}

/* ============ 首页 ============ */
function renderDashboard(root) {
  const s = state.stats;
  const acc = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;
  const daysLeft = state.settings.examDate ? Math.ceil((new Date(state.settings.examDate + "T09:00:00") - new Date()) / 86400000) : null;
  const rec = getRecommendation();
  root.innerHTML = `
  <div class="hero">
    <h1>TOEIC 高分学习助手</h1>
    <p>词汇 · 听力 · 听写 · 阅读 · 模考 · 错题本 —— 系统训练，目标高分</p>
  </div>
  <div class="card" style="border:1.5px solid #c9d1ff; background:linear-gradient(135deg, var(--brand-soft), transparent)">
    <div class="challenge-flex">
      <div>
        <h3 style="margin-bottom:6px">🗓️ 今日挑战</h3>
        <p>每天一组固定混合题：4 个单词 + 4 道题（优先弱项）+ 2 道错题，完成即点亮今天。</p>
      </div>
      ${challengeDoneToday() ? `<button class="btn" id="chStart">✅ 已完成 · 再练一轮</button>` : `<button class="btn primary" id="chStart" style="padding:12px 24px;white-space:nowrap">开始今日挑战</button>`}
    </div>
  </div>
  <div class="grid grid-3">
    <div class="card">
      <h3>🎯 考试信息</h3>
      <label class="lbl">考试日期</label>
      <input type="date" id="examDate" value="${esc(state.settings.examDate)}">
      <label class="lbl">目标分数</label>
      <select id="goalSel">${[600, 730, 785, 860, 900].map((g) => `<option value="${g}" ${state.settings.goal == g ? "selected" : ""}>${g} 分</option>`).join("")}</select>
      <div class="countdown ${daysLeft !== null && daysLeft < 0 ? "over" : ""}">${daysLeft === null ? "设置日期开始倒计时" : daysLeft >= 0 ? "距离考试还有 <b>" + daysLeft + "</b> 天" : "考试已结束，设置新目标吧"}</div>
      ${daysLeft !== null && daysLeft >= 0 ? `<div class="muted">目标 ${state.settings.goal} 分 ≈ 200 题中需答对约 ${Math.round(state.settings.goal / 990 * 200)} 题（官方换算为非线性，仅供参考）</div>` : ""}
    </div>
    <div class="card">
      <h3>📊 学习进度</h3>
      <div class="stat-row"><span>今日已练</span><b>${s.days[todayStr()] || 0} 题</b></div>
      <div class="stat-row"><span>连续打卡</span><b>${calcStreak()} 天</b></div>
      <div class="stat-row"><span>累计正确率</span><b>${acc}%</b> <span class="muted">(${s.correct}/${s.answered})</span></div>
      <div class="stat-row"><span>已掌握词汇</span><b>${masteredCount()} / ${TOTAL_WORDS}</b></div>
      <div class="progress"><div style="width:${Math.round(masteredCount() / TOTAL_WORDS * 100)}%"></div></div>
    </div>
    <div class="card">
      <h3>⚡ 今日推荐</h3>
      <div class="reco">📌 ${esc(rec.text)}</div>
      <button class="btn big primary" data-go="${rec.go}" style="margin-top:10px">立即去做 →</button>
      <button class="btn big" data-go="vocab">背今天到期的单词（${dueWords("all").length} 个）</button>
      <button class="btn big" data-go="mock">做一次快速模考</button>
    </div>
  </div>
  ${state.stats.answered ? `<div class="card"><h3>📊 各 Part 正确率</h3>${partAnalysisHTML()}<p class="muted">作答不足 8 题的部分暂不参与弱项判定。红色 = 低于 60%，黄色 = 60-79%。</p></div>` : ""}
  <div class="card">
    <h3>🏆 模考记录</h3>
    ${state.mockHistory.length ? `<table class="tbl"><tr><th>日期</th><th>类型</th><th>听力</th><th>阅读</th><th>合计（估算）</th></tr>
      ${state.mockHistory.slice(-5).reverse().map((m) => `<tr><td>${m.date}</td><td>${m.kind ? (MOCK_LABEL[m.kind] || m.kind) : "—"}</td><td>${m.lC}/${m.lT}</td><td>${m.rC}/${m.rT}</td><td><b>${scoreEst(m.lC, m.lT) + scoreEst(m.rC, m.rT)}</b></td></tr>`).join("")}
    </table>` : `<p class="muted">还没有模考记录。建议每周做 1-2 次快速模考检验进度。</p>`}
  </div>
  ${state.mockHistory.length ? `<div class="card"><h3>📈 分数曲线（估算分趋势）</h3>${scoreChartSVG()}<p class="muted">悬停圆点可查看每场详情。分数为按正确率折算的估算，趋势比单次分数更有意义。</p></div>` : ""}
  <div class="card"><h3>🔥 最近 30 天练习量</h3>${practiceChartSVG()}<p class="muted">统计所有作答（词汇 + 题目 + 模考）。目标：每天至少点亮一根柱子。</p></div>
  <div class="card"><h3>🏅 成就</h3>${badgesHTML()}</div>
  <div class="card">
    <h3>⚙️ 设置与数据</h3>
    <label class="lbl">朗读速度 <span id="rateVal">${state.settings.rate}</span> 倍</label>
    <input type="range" id="rateRange" min="0.6" max="1.2" step="0.05" value="${state.settings.rate}">
    <label class="lbl">英语语音</label>
    <select id="voiceSelect"></select>
    <label class="lbl" style="display:flex;align-items:center;gap:8px;margin-top:10px"><input type="checkbox" id="autoSpeakChk" style="width:auto" ${state.settings.autoSpeak !== false ? "checked" : ""}> 进入词汇卡片时自动朗读单词</label>
    <p class="muted">听力练习使用浏览器自带语音合成（TTS）朗读，无需音频文件。建议选用 en-US 英式/美式人声。</p>
    <button class="btn" id="testSpeakBtn">试听：TOEIC test, Part Three. Listen to the conversation.</button>
    <button class="btn" id="exportBtn" style="margin-left:8px">⬇️ 导出学习数据</button>
    <button class="btn" id="importBtn">⬆️ 导入备份</button>
    <input type="file" id="importFile" accept="application/json,.json" style="display:none">
    <button class="btn danger" id="resetBtn" style="margin-left:8px">清空全部学习数据</button>
  </div>
  <div class="card note">
    <h3>💡 小贴士：托业（TOEIC）≠ 托福（TOEFL）</h3>
    <p>TOEIC 考察<b>职场与商务英语</b>（日本求职・晋升最常用，满分 990）；TOEFL 考察<b>学术英语</b>（留学用，满分 120）。本软件按你「在日本考托业」的情况定制。如果之后也要考托福，可以在此基础上扩展。</p>
  </div>`;
  $("#examDate").addEventListener("change", (e) => { state.settings.examDate = e.target.value; saveState(); renderDashboard(root); });
  $("#goalSel").addEventListener("change", (e) => { state.settings.goal = +e.target.value; saveState(); renderDashboard(root); });
  $("#rateRange").addEventListener("input", (e) => { state.settings.rate = +e.target.value; $("#rateVal").textContent = e.target.value; saveState(); });
  $("#voiceSelect").addEventListener("change", (e) => { state.settings.voiceURI = e.target.value; saveState(); });
  $("#autoSpeakChk").addEventListener("change", (e) => { state.settings.autoSpeak = e.target.checked; saveState(); });
  $("#testSpeakBtn").addEventListener("click", () => speakList([{ text: "TOEIC test, Part Three. Listen to the conversation. Then, choose the best answer to each question." }]));
  $("#exportBtn").addEventListener("click", exportData);
  $("#importBtn").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { alert(importData(String(r.result)) === "ok" ? "导入成功！学习记录已恢复。" : "文件格式不正确，导入失败"); };
    r.readAsText(f);
  });
  $("#resetBtn").addEventListener("click", () => {
    if (confirm("确定清空所有学习记录吗？此操作不可恢复。")) { state = { settings: state.settings, stats: { answered: 0, correct: 0, days: {} }, vocab: {}, wrongbook: [], mockHistory: [], planChecks: {}, poolStats: {} }; saveState(); renderDashboard(root); }
  });
  $$("[data-go]", root).forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  const ch = $("#chStart"); if (ch) ch.addEventListener("click", () => go("challenge"));
  initVoices();
}
function getRecommendation() {
  if (!state.stats.answered) return { text: "先做一次快速模考摸底，看看当前水平和弱项", go: "mock" };
  if (state.wrongbook.length >= 10) return { text: "错题本已积累 " + state.wrongbook.length + " 题，清一遍错题本效果最好", go: "wrong" };
  let weakest = null;
  Object.keys(state.poolStats).forEach((k) => {
    const s = state.poolStats[k];
    if (k !== "dict" && s.a >= 8) { const acc = s.c / s.a; if (!weakest || acc < weakest.acc) weakest = { k: k, acc: acc }; }
  });
  if (weakest && weakest.acc < 0.75) {
    const view = ["p5", "p6", "p7"].includes(weakest.k) ? "reading" : "listening";
    return { text: "加强 " + POOL_LABEL[weakest.k] + "（正确率仅 " + Math.round(weakest.acc * 100) + "%，作答 " + state.poolStats[weakest.k].a + " 题）", go: view };
  }
  const due = dueWords("all").length;
  if (due > 0) return { text: "背今天到期的 " + due + " 个单词（SRS 已排好）", go: "vocab" };
  return { text: "做一次听写训练磨耳朵，保持听力手感", go: "dictation" };
}
function partAnalysisHTML() {
  const keys = Object.keys(POOL_LABEL).filter((k) => state.poolStats[k] && state.poolStats[k].a);
  if (!keys.length) return `<p class="muted">暂无数据</p>`;
  return keys.map((k) => {
    const s = state.poolStats[k], pct = Math.round(s.c / s.a * 100);
    const color = pct >= 80 ? "var(--good)" : pct >= 60 ? "#f59e0b" : "var(--bad)";
    return `<div class="stat-row"><span style="width:92px">${POOL_LABEL[k]}</span><span class="mini-bar"><i style="width:${pct}%;background:${color}"></i></span><span style="width:96px;text-align:right"><b>${pct}%</b> <span class="muted">(${s.c}/${s.a})</span></span></div>`;
  }).join("");
}
function badgesHTML() {
  const streak = calcStreak(), mastered = masteredCount(), ps = state.poolStats;
  const listenAns = ["p1", "p2", "p3", "p4"].reduce((n, k) => n + (ps[k] ? ps[k].a : 0), 0);
  const bestMock = state.mockHistory.reduce((m, h) => Math.max(m, scoreEst(h.lC, h.lT) + scoreEst(h.rC, h.rT)), 0);
  const list = [
    ["🎯", "初试身手", "完成第一题", state.stats.answered >= 1],
    ["⚡", "百题斩", "累计作答 100 题", state.stats.answered >= 100],
    ["🏹", "千题斩", "累计作答 1000 题", state.stats.answered >= 1000],
    ["📚", "词汇新手", "掌握 50 词", mastered >= 50],
    ["📖", "词汇大师", "掌握 300 词", mastered >= 300],
    ["🔥", "七日之约", "连续打卡 7 天", streak >= 7],
    ["🎧", "磨耳朵", "听力作答 50 题", listenAns >= 50],
    ["📊", "首战模考", "完成一次模考", state.mockHistory.length >= 1],
    ["🏆", "达标冲刺", "模考估算分达到目标线", !!state.settings.goal && bestMock > 0 && bestMock >= state.settings.goal]
  ];
  return `<div class="badge-grid">${list.map((b) => `<div class="badge ${b[3] ? "on" : ""}" title="${esc(b[2])}"><span>${b[0]}</span><small>${b[1]}</small></div>`).join("")}</div>`;
}
function exportData() {
  const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "toeic-backup-" + todayStr().replace(/-/g, "") + ".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}
function importData(text) {
  try {
    const obj = JSON.parse(text);
    if (!obj || typeof obj !== "object" || !obj.stats || !obj.settings) return "invalid";
    state = Object.assign(JSON.parse(JSON.stringify(state)), obj);
    state.planChecks = state.planChecks || {}; state.stats.days = state.stats.days || {}; state.poolStats = state.poolStats || {};
    saveState(); go(currentView); return "ok";
  } catch (e) { return "invalid"; }
}
function scoreEst(c, t) { return t ? Math.round(c / t * 495 / 5) * 5 : 0; }

/* ============ 图表（纯 SVG，无依赖） ============ */
function scoreChartSVG() {
  const list = state.mockHistory.slice(-20);
  const W = 640, H = 250, pl = 42, pr = 12, pt = 16, pb = 30;
  const y = (s) => pt + (H - pt - pb) * (1 - s / 1000);
  const n = list.length;
  const x = (i) => (n === 1 ? (pl + (W - pl - pr) / 2) : pl + (W - pl - pr) * i / (n - 1));
  const pts = (key) => list.map((m, i) => x(i) + "," + y(key(m))).join(" ");
  const grid = [0, 250, 500, 750, 1000].map((v) => `<line x1="${pl}" y1="${y(v)}" x2="${W - pr}" y2="${y(v)}" stroke="${isDark() ? "#2a3346" : "#e5e9f2"}"/><text x="${pl - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10" fill="#9aa3b2">${v}</text>`).join("");
  const goal = state.settings.goal ? `<line x1="${pl}" y1="${y(state.settings.goal)}" x2="${W - pr}" y2="${y(state.settings.goal)}" stroke="#dc2626" stroke-dasharray="5 4" stroke-width="1.2"/><text x="${W - pr}" y="${y(state.settings.goal) - 4}" text-anchor="end" font-size="10" fill="#dc2626">目标 ${state.settings.goal}</text>` : "";
  const dots = list.map((m, i) => {
    const t = scoreEst(m.lC, m.lT) + scoreEst(m.rC, m.rT);
    const label = (MOCK_LABEL[m.kind] || "模考") + " " + t + " 分（听 " + scoreEst(m.lC, m.lT) + " / 读 " + scoreEst(m.rC, m.rT) + "）";
    return `<circle cx="${x(i)}" cy="${y(t)}" r="4" fill="#3552e0"><title>${m.date} ${esc(label)}</title></circle>`;
  }).join("");
  const xlabels = list.map((m, i) => (n <= 8 || i === 0 || i === n - 1) ? `<text x="${x(i)}" y="${H - 8}" text-anchor="${i === n - 1 ? "end" : "middle"}" font-size="10" fill="#9aa3b2">${m.date.slice(5)}</text>` : "").join("");
  return `<svg viewBox="0 0 ${W} ${H}" class="chart">${grid}${goal}
    <polyline points="${pts((m) => scoreEst(m.lC, m.lT))}" fill="none" stroke="#60a5fa" stroke-width="1.6" opacity=".85"/>
    <polyline points="${pts((m) => scoreEst(m.rC, m.rT))}" fill="none" stroke="#9333ea" stroke-width="1.6" opacity=".85"/>
    <polyline points="${pts((m) => scoreEst(m.lC, m.lT) + scoreEst(m.rC, m.rT))}" fill="none" stroke="#3552e0" stroke-width="2.4"/>
    ${dots}${xlabels}</svg>
    <div class="legend"><span class="lg"><i style="background:#3552e0"></i>总分估算</span><span class="lg"><i style="background:#60a5fa"></i>听力</span><span class="lg"><i style="background:#9333ea"></i>阅读</span><span class="lg"><i style="background:#dc2626"></i>目标线</span></div>`;
}
function practiceChartSVG() {
  const W = 640, H = 150, pl = 30, pr = 10, pt = 12, pb = 26;
  const days = [];
  const d = new Date(); d.setDate(d.getDate() - 29);
  for (let i = 0; i < 30; i++) { days.push({ key: fmtDate(d), v: state.stats.days[fmtDate(d)] || 0 }); d.setDate(d.getDate() + 1); }
  const max = Math.max(10, ...days.map((x) => x.v));
  const bw = (W - pl - pr) / 30;
  const bars = days.map((x, i) => {
    const h = (H - pt - pb) * x.v / max;
    return `<rect x="${pl + i * bw + 1.5}" y="${H - pb - h}" width="${bw - 3}" height="${h}" rx="2" fill="${x.key === todayStr() ? "#3552e0" : "#93a5f5"}"><title>${x.key}：${x.v} 题</title></rect>` +
      ((i % 5 === 0 || i === 29) ? `<text x="${pl + i * bw + bw / 2}" y="${H - 8}" text-anchor="middle" font-size="9.5" fill="#9aa3b2">${x.key.slice(5)}</text>` : "");
  }).join("");
  const grid = [max, Math.round(max / 2), 0].map((v) => { const yy = H - pb - (H - pt - pb) * v / max; return `<line x1="${pl}" y1="${yy}" x2="${W - pr}" y2="${yy}" stroke="${isDark() ? "#242c40" : "#eef1f6"}"/><text x="${pl - 5}" y="${yy + 4}" text-anchor="end" font-size="10" fill="#9aa3b2">${v}</text>`; }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" class="chart">${grid}${bars}</svg>`;
}

/* ============ 词汇页 ============ */
let vocabSession = null; // {mode, list, i, correctCount}
function renderVocab(root) {
  root.innerHTML = `
  <div class="page-head"><h1>📖 词汇训练</h1><p class="muted">基于间隔重复算法（SRS）：记住的词间隔变长，忘记的词很快再现。共 ${TOTAL_WORDS} 词。</p></div>
  <div class="card">
    <label class="lbl">选择分类</label>
    <div class="chips" id="catChips">
      ${[`<button class="chip active" data-cat="all">全部（${dueWords("all").length} 到期）</button>`].concat(VOCAB_DATA.map((c) => `<button class="chip" data-cat="${c.id}">${c.icon} ${c.name}（${dueWords(c.id).length}）</button>`)).join("")}
    </div>
    <div style="margin-top:12px">
      <button class="btn big" id="learnBtn">📇 闪卡学习</button>
      <button class="btn big" id="quizBtn">✅ 选择测验</button>
      <button class="btn" id="csvBtn">⬇️ 导出 Anki / CSV 词表</button>
      <span class="muted" style="margin-left:8px">建议先闪卡再测验，每次 10 词</span>
    </div>
  </div>
  <div id="vocabArea"></div>`;
  let catId = "all";
  $$("#catChips .chip", root).forEach((ch) => ch.addEventListener("click", () => {
    $$("#catChips .chip", root).forEach((c) => c.classList.remove("active"));
    ch.classList.add("active"); catId = ch.dataset.cat;
  }));
  $("#learnBtn").addEventListener("click", () => startVocab("learn", catId));
  $("#quizBtn").addEventListener("click", () => startVocab("quiz", catId));
  $("#csvBtn").addEventListener("click", () => {
    const rows = [["word", "meaning", "example", "category"]];
    VOCAB_DATA.forEach((c) => c.words.forEach((w) => rows.push([w.w, w.zh, w.ex, c.name].map((x) => '"' + String(x).replace(/"/g, '""') + '"'))));
    const blob = new Blob(["\ufeff" + rows.map((r) => r.join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "toeic-words.csv";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  });
}
function startVocab(mode, catId) {
  let list = dueWords(catId);
  if (!list.length) { $("#vocabArea").innerHTML = `<div class="card note">🎉 该分类当前没有到期词汇！可以切换其他分类，或明天再来复习（SRS 会安排间隔复习）。</div>`; return; }
  list = shuffle(list).slice(0, 10);
  vocabSession = { mode: mode, list: list, i: 0, correct: 0 };
  nextVocabCard();
}
function nextVocabCard() {
  const sess = vocabSession, area = $("#vocabArea");
  if (sess.i >= sess.list.length) {
    area.innerHTML = `<div class="card"><h3>${sess.mode === "quiz" ? "✅" : "📇"} 本轮完成！</h3>
      <p>正确 ${sess.correct} / ${sess.list.length}。记住的词下次复习间隔会变长，忘记的词会很快重现。</p>
      <button class="btn" onclick="startVocab('${sess.mode}','all')">再来一轮</button></div>`;
    return;
  }
  const item = sess.list[sess.i];
  const catName = item.cat.name;
  const autoS = state.settings.autoSpeak !== false;
  if (sess.mode === "learn") {
    area.innerHTML = `
    <div class="card flashcard">
      <div class="fc-meta">${catName} · 第 ${sess.i + 1} / ${sess.list.length} 个</div>
      <div class="fc-word">${esc(item.w.w)} <button class="icon-btn" id="fcSpeak">🔊</button> <span class="fc-pos">${esc(item.w.p)}</span></div>
      <div class="fc-meaning" id="fcMeaning" style="visibility:hidden">
        <div class="fc-zh">${esc(item.w.zh)}</div>
        <div class="fc-ex">${esc(item.w.ex)}</div>
      </div>
      <div class="btn-row">
        <button class="btn" id="fcShow">显示释义</button>
        <button class="btn good" id="fcYes" disabled>😀 记住了</button>
        <button class="btn bad" id="fcNo" disabled>😥 没记住</button>
      </div>
    </div>`;
    if (autoS) setTimeout(() => speakList([{ text: item.w.w }]), 350);
    $("#fcSpeak").addEventListener("click", () => speakList([{ text: item.w.w }]));
    $("#fcShow").addEventListener("click", () => { $("#fcMeaning").style.visibility = "visible"; $("#fcShow").disabled = true; $("#fcYes").disabled = false; $("#fcNo").disabled = false; speakList([{ text: item.w.w + ". " + item.w.ex }]); });
    $("#fcYes").addEventListener("click", () => { updateVocab(item.cat.id, item.i, true); sess.correct++; sess.i++; nextVocabCard(); });
    $("#fcNo").addEventListener("click", () => { updateVocab(item.cat.id, item.i, false); sess.i++; nextVocabCard(); });
  } else {
    const wrongPool = shuffle(VOCAB_DATA.reduce((a, c) => a.concat(c.words.filter((w) => w.zh !== item.w.zh && w.w.toLowerCase() !== item.w.w.toLowerCase())), [])).slice(0, 3).map((w) => w.zh);
    const opts = shuffle([item.w.zh].concat(wrongPool));
    area.innerHTML = `
    <div class="card flashcard">
      <div class="fc-meta">${catName} · 第 ${sess.i + 1} / ${sess.list.length} 题</div>
      <div class="fc-word">${esc(item.w.w)} <button class="icon-btn" id="qSpeak">🔊</button></div>
      <div id="qOpts">${opts.map((o, k) => `<button class="opt" data-ok="${o === item.w.zh ? 1 : 0}">${esc(o)}</button>`).join("")}</div>
      <div id="qFeed"></div>
      <button class="btn" id="qNext" style="display:none">下一题 →</button>
    </div>`;
    $("#qSpeak").addEventListener("click", () => speakList([{ text: item.w.w }]));
    if (autoS) setTimeout(() => speakList([{ text: item.w.w }]), 350);
    $$("#qOpts .opt").forEach((b) => b.addEventListener("click", () => {
      const ok = b.dataset.ok === "1";
      $$("#qOpts .opt").forEach((x, k) => { x.disabled = true; if (x.dataset.ok === "1") x.classList.add("correct"); });
      if (!ok) b.classList.add("wrong"); else sess.correct++;
      $("#qFeed").innerHTML = `<div class="explain"><b>${esc(item.w.zh)}</b><br>${esc(item.w.ex)}</div><button class="btn sm" id="qfSpeak">🔊 听例句</button>`;
      $("#qfSpeak").addEventListener("click", () => speakList([{ text: item.w.ex }]));
      $("#qNext").style.display = "inline-block";
      updateVocab(item.cat.id, item.i, ok);
    }));
    $("#qNext").addEventListener("click", () => { sess.i++; nextVocabCard(); });
  }
}

/* ============ 听力页 ============ */
let listenSession = null;
const LISTEN_PARTS = [
  ["p1", "Part 1 · 照片描述", "12 题", "听 4 句描述选最符合的"],
  ["p2", "Part 2 · 应答", "40 题", "听问题选最佳回应（3 选 1）"],
  ["p3", "Part 3 · 对话", "16 组 × 3 题", "先读题再听对话"],
  ["p4", "Part 4 · 短文", "12 篇 × 3 题", "广播、留言、广告等独白"]
];
function renderListening(root) {
  root.innerHTML = `
  <div class="page-head"><h1>🎧 听力训练</h1><p class="muted">用 TTS 朗读题目，请先看题再点播放（贴近真实考试节奏）。Part 3/4 的原文在答完 3 题后显示。</p></div>
  <div class="card">
    <div class="chips" id="lParts">${LISTEN_PARTS.map((p, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-part="${p[0]}">${p[1]}（${p[2]}）</button>`).join("")}</div>
    <p class="muted" id="lPartDesc"></p>
    ${rateChipsHTML("lRate")}
    <button class="btn big primary" id="lStart">开始练习</button>
  </div>
  <div id="lArea"></div>`;
  let part = "p1";
  const desc = () => $("#lPartDesc").textContent = LISTEN_PARTS.find((p) => p[0] === part)[3];
  desc();
  $$("#lParts .chip", root).forEach((ch) => ch.addEventListener("click", () => { $$("#lParts .chip", root).forEach((c) => c.classList.remove("active")); ch.classList.add("active"); part = ch.dataset.part; desc(); }));
  bindRateChips("lRate");
  $("#lStart").addEventListener("click", () => startListening(part));
}
function startListening(part) {
  let items;
  if (part === "p1" || part === "p2") items = shuffle(ALL_POOLS[part].map((d, i) => ({ pool: part, idx: i })));
  else items = shuffle(ALL_POOLS[part].map((d, i) => ({ pool: part, idx: i }))).slice(0, 4); // P3/P4 每次练 4 组
  listenSession = { part: part, items: items, i: 0 };
  renderListenItem();
}
function renderListenItem() {
  const sess = listenSession, area = $("#lArea");
  if (sess.i >= sess.items.length) { area.innerHTML = `<div class="card"><h3>🎉 本组练习完成！</h3><button class="btn" onclick="startListening('${sess.part}')">再来一组</button></div>`; return; }
  const it = sess.items[sess.i], d = ALL_POOLS[sess.part][it.idx];
  if (sess.part === "p1") {
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">Part 1 · 第 ${sess.i + 1} / ${sess.items.length} 题 <button class="btn sm" id="lpPlay">🔊 播放四个选项</button></div>
      <div class="photo-box">📷 照片场景：${esc(d.scene)}</div>
      <div id="lpChoices">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <div id="lpFeed"></div>
    </div>`;
    $("#lpPlay").addEventListener("click", () => speakList(d.choices.map((c, k) => ({ text: c, onstart: () => { $$("#lpChoices .opt").forEach((x, j) => x.classList.toggle("speaking", j === k)); } }))));
    $$("#lpChoices .opt").forEach((b) => b.addEventListener("click", () => answerChoice("p1", it.idx, null, +b.dataset.k, b, "lpChoices", "lpFeed", () => { })));
  } else if (sess.part === "p2") {
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">Part 2 · 第 ${sess.i + 1} / ${sess.items.length} 题 <button class="btn sm" id="lpPlay">🔊 播放问题</button></div>
      <div id="lpChoices">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <div id="lpFeed"></div>
    </div>`;
    $("#lpPlay").addEventListener("click", () => speakList([{ text: d.q }]));
    $$("#lpChoices .opt").forEach((b) => b.addEventListener("click", () => answerChoice("p2", it.idx, null, +b.dataset.k, b, "lpChoices", "lpFeed", () => { })));
  } else {
    const qs = d.questions;
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">${esc(d.title)} · 第 ${sess.i + 1} / ${sess.items.length} 组 <button class="btn sm" id="lpPlay">🔊 播放${sess.part === "p3" ? "对话" : "短文"}</button></div>
      <p class="muted">先快速阅读下面 3 个问题和选项，再点播放（只播一遍，模拟考场）。</p>
      <div id="lpQs">${qs.map((q, qi) => `
        <div class="q-block">
          <div class="q-text">${(sess.part === "p3" ? 32 : 71) + sess.i * 3 + qi}. ${esc(q.q)}</div>
          <div class="q-choices" id="qc${qi}">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
          <div class="q-feed" id="qf${qi}"></div>
        </div>`).join("")}</div>
      <div id="lpTranscript" style="display:none" class="transcript">${d.script.map((l) => "<p>" + esc(l) + "</p>").join("")}</div>
    </div>`;
    $("#lpPlay").addEventListener("click", () => speakList(d.script.map((l) => ({ text: l }))));
    let answered = 0;
    qs.forEach((q, qi) => {
      $$("#qc" + qi + " .opt").forEach((b) => b.addEventListener("click", () => {
        if (b.disabled) return;
        answerChoice(sess.part, it.idx, qi, +b.dataset.k, b, "qc" + qi, "qf" + qi, null);
        answered++;
        if (answered === qs.length) $("#lpTranscript").style.display = "block";
      }));
    });
  }
  const navRow = document.createElement("div");
  navRow.className = "btn-row"; navRow.style.marginTop = "10px";
  navRow.innerHTML = `<button class="btn" id="lNext">${sess.i + 1 >= sess.items.length ? "完成 →" : "下一题 →"}</button>`;
  area.firstElementChild.appendChild(navRow);
  $("#lNext").addEventListener("click", () => { sess.i++; renderListenItem(); });
}
/* 通用判题（P1/P2/P5 或 P3/P4/P6/P7 的子题） */
function answerChoice(pool, idx, qIdx, choice, btn, choicesSel, feedSel, onDone) {
  const q = getQuestion(pool, idx, qIdx);
  const ok = choice === q.answer;
  $$("#" + choicesSel + " .opt").forEach((x, k) => {
    x.disabled = true;
    if (k === q.answer) x.classList.add("correct");
  });
  if (!ok) btn.classList.add("wrong");
  $("#" + feedSel).innerHTML = `<div class="explain">${ok ? "✅ 正确！" : "❌ 正确答案：" + LETTERS[q.answer] + "。"} ${esc(q.explain || "")}</div>`;
  recordAnswer(ok, ok ? null : { pool: pool, idx: idx, qIdx: qIdx === null ? 0 : qIdx }, pool);
  if (onDone) onDone(ok);
}

/* ============ 阅读页 ============ */
let readSession = null;
const READ_PARTS = [
  ["p5", "Part 5 · 短文填空", "80 题", "语法与词汇，目标 20-30 秒/题"],
  ["p6", "Part 6 · 长文填空", "10 篇 × 4 空", "结合上下文选词"],
  ["p7", "Part 7 · 阅读理解", "10 单篇 + 10 双篇", "先读题干再回原文定位"]
];
function renderReading(root) {
  root.innerHTML = `
  <div class="page-head"><h1>📖 阅读训练</h1><p class="muted">做题时留意每题的语法考点标签，错题自动进入错题本。</p></div>
  <div class="card">
    <div class="chips" id="rParts">${READ_PARTS.map((p, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-part="${p[0]}">${p[1]}（${p[2]}）</button>`).join("")}</div>
    <p class="muted" id="rPartDesc"></p>
    ${rateChipsHTML("rRate")}
    <button class="btn big primary" id="rStart">开始练习</button>
  </div>
  <div id="rArea"></div>`;
  let part = "p5";
  const desc = () => $("#rPartDesc").textContent = READ_PARTS.find((p) => p[0] === part)[3];
  desc();
  $$("#rParts .chip", root).forEach((ch) => ch.addEventListener("click", () => { $$("#rParts .chip", root).forEach((c) => c.classList.remove("active")); ch.classList.add("active"); part = ch.dataset.part; desc(); }));
  bindRateChips("rRate");
  $("#rStart").addEventListener("click", () => startReading(part));
}
function startReading(part) {
  const items = part === "p5" ? shuffle(ALL_POOLS.p5.map((d, i) => ({ pool: "p5", idx: i }))).slice(0, 10)
    : shuffle(ALL_POOLS[part].map((d, i) => ({ pool: part, idx: i }))).slice(0, 2);
  readSession = { part: part, items: items, i: 0 };
  renderReadItem();
}
function renderReadItem() {
  const sess = readSession, area = $("#rArea");
  if (sess.i >= sess.items.length) { area.innerHTML = `<div class="card"><h3>🎉 本组练习完成！</h3><button class="btn" onclick="startReading('${sess.part}')">再来一组</button></div>`; return; }
  const it = sess.items[sess.i], d = ALL_POOLS[sess.part][it.idx];
  if (sess.part === "p5") {
    if (readSession.timer) clearInterval(readSession.timer);
    const t0 = Date.now();
    readSession.timer = setInterval(() => {
      const el = $("#qt");
      if (!el) { clearInterval(readSession.timer); return; }
      const sec = Math.floor((Date.now() - t0) / 1000);
      el.textContent = "⏱ " + sec + "s / 目标 30s";
      el.style.color = sec > 30 ? "var(--bad)" : sec > 20 ? "#f59e0b" : "var(--good)";
    }, 500);
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">Part 5 · 第 ${sess.i + 1} / ${sess.items.length} 题 <span id="qt" style="float:right">⏱ 0s / 目标 30s</span></div>
      <div class="q-text">${esc(d.q)}</div>
      <div id="rpChoices">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <div id="rpFeed"></div>
      <div class="btn-row" style="margin-top:10px"><button class="btn" id="rNext">${sess.i + 1 >= sess.items.length ? "完成 →" : "下一题 →"}</button></div>
    </div>`;
    $$("#rpChoices .opt").forEach((b) => b.addEventListener("click", () => { if (readSession.timer) clearInterval(readSession.timer); answerChoice("p5", it.idx, null, +b.dataset.k, b, "rpChoices", "rpFeed", null); }));
  } else if (sess.part === "p6") {
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">Part 6 · ${esc(d.title)}（第 ${sess.i + 1} / ${sess.items.length} 篇）</div>
      <div class="passage">${d.lines.map((l) => (l ? "<p>" + esc(l) + "</p>" : "<p>&nbsp;</p>")).join("")}</div>
      <div id="rpBlanks">${d.blanks.map((b, bi) => `
        <div class="q-block"><div class="q-text">第 ${bi + 1} 空</div>
        <div class="q-choices" id="pc${bi}">${b.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
        <div class="q-feed" id="pf${bi}"></div></div>`).join("")}</div>
      <div class="btn-row" style="margin-top:10px"><button class="btn" id="rNext">${sess.i + 1 >= sess.items.length ? "完成 →" : "下一篇 →"}</button></div>
    </div>`;
    d.blanks.forEach((b, bi) => $$("#pc" + bi + " .opt").forEach((btn) => btn.addEventListener("click", () => answerChoice("p6", it.idx, bi, +btn.dataset.k, btn, "pc" + bi, "pf" + bi, null))));
  } else {
    area.innerHTML = `
    <div class="card">
      <div class="fc-meta">Part 7 · ${esc(d.title)}（第 ${sess.i + 1} / ${sess.items.length} 篇）</div>
      <div class="passage">${d.passages.map((p) => "<p>" + esc(p).replace(/\n/g, "<br>") + "</p><hr>").join("")}</div>
      <div id="rpQs">${d.questions.map((q, qi) => `
        <div class="q-block"><div class="q-text">${esc(q.q)}</div>
        <div class="q-choices" id="tc${qi}">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
        <div class="q-feed" id="tf${qi}"></div></div>`).join("")}</div>
      <div class="btn-row" style="margin-top:10px"><button class="btn" id="rNext">${sess.i + 1 >= sess.items.length ? "完成 →" : "下一篇 →"}</button></div>
    </div>`;
    d.questions.forEach((q, qi) => $$("#tc" + qi + " .opt").forEach((btn) => btn.addEventListener("click", () => answerChoice("p7", it.idx, qi, +btn.dataset.k, btn, "tc" + qi, "tf" + qi, null))));
  }
  $("#rNext").addEventListener("click", () => { sess.i++; renderReadItem(); });
}

/* ============ 听写训练 ============ */
let dict = null;
function dictationSentences() {
  const out = [];
  P2_DATA.forEach((d) => out.push({ t: d.q, src: "Part 2 问答" }));
  P3_DATA.forEach((g) => g.script.forEach((l) => out.push({ t: l.replace(/^[MWF]:\s*/, ""), src: "Part 3 对话" })));
  P4_DATA.forEach((g) => {
    g.script.replace(/([.?!])\s+/g, "$1|").split("|").forEach((s) => {
      const t = s.trim();
      if (t.split(/\s+/).length >= 6) out.push({ t: t, src: "Part 4 短文" });
    });
  });
  return out;
}
function normWord(w) { return w.toLowerCase().replace(/[^a-z0-9']/g, ""); }
function diffDictation(orig, typed) {
  const O = orig.split(/\s+/).map(normWord).filter(Boolean);
  const T = typed.split(/\s+/).map(normWord).filter(Boolean);
  const m = O.length, n = T.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = O[i - 1] === T[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  const out = []; let i = m, j = n, matched = 0;
  while (i > 0 && j > 0) {
    if (O[i - 1] === T[j - 1]) { out.unshift({ w: O[i - 1], ok: true }); matched++; i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) { out.unshift({ w: O[i - 1], ok: false, type: "miss" }); i--; }
    else { out.unshift({ w: T[j - 1], ok: false, type: "extra" }); j--; }
  }
  while (i > 0) { out.unshift({ w: O[i - 1], ok: false, type: "miss" }); i--; }
  while (j > 0) { out.unshift({ w: T[j - 1], ok: false, type: "extra" }); j--; }
  return { words: out, matched: matched, total: O.length };
}
function renderDictation(root) {
  root.innerHTML = `
  <div class="page-head"><h1>👂 听写训练</h1><p class="muted">最硬核的听力训练：听一句、写一句，系统逐词批改（大小写和标点不计）。先播一遍完整句子，写不出再重播。快捷键：数字 1-4 可用于选择题页，Enter 进入下一题。</p></div>
  <div class="card">
    <button class="btn big primary" id="dtStart">开始听写（每次 5 句）</button>
    ${rateChipsHTML("dtRate")}
    <p class="muted">句子来自 Part 2-4 题库，随机抽取（共 ${dictationSentences().length} 句）。建议 0.75 倍速起步，逐步提速。</p>
  </div>
  <div id="dtArea"></div>`;
  $("#dtStart").addEventListener("click", startDictation);
  bindRateChips("dtRate");
}
function startDictation() {
  dict = { list: shuffle(dictationSentences()).slice(0, 5), i: 0 };
  renderDictItem();
}
function renderDictItem() {
  const area = $("#dtArea");
  if (dict.i >= dict.list.length) {
    area.innerHTML = `<div class="card"><h3>🎉 本轮听写完成！</h3><button class="btn" onclick="startDictation()">再来一组</button></div>`;
    return;
  }
  const it = dict.list[dict.i];
  area.innerHTML = `
  <div class="card flashcard">
    <div class="fc-meta">${esc(it.src)} · 第 ${dict.i + 1} / ${dict.list.length} 句 <button class="btn sm" id="dtPlay">🔊 播放（可反复）</button></div>
    <textarea id="dtInput" rows="3" placeholder="把听到的句子打在这里…" style="width:100%;margin-top:8px"></textarea>
    <div class="btn-row">
      <button class="btn good" id="dtCheck">对答案</button>
      <button class="btn" id="dtNext" style="display:none">下一句 →</button>
    </div>
    <div id="dtFeed"></div>
  </div>`;
  setTimeout(() => { const el = $("#dtInput"); if (el) { el.focus(); speakList([{ text: it.t }]); } }, 350);
  $("#dtPlay").addEventListener("click", () => speakList([{ text: it.t }]));
  $("#dtCheck").addEventListener("click", () => {
    const typed = $("#dtInput").value;
    if (!typed.trim()) return;
    const res = diffDictation(it.t, typed);
    const acc = Math.round(res.matched / Math.max(1, res.total) * 100);
    const html = res.words.map((w) => !w.ok ? (w.type === "extra" ? `<span class="w-extra">${esc(w.w)}</span>` : `<span class="w-miss">${esc(w.w)}</span>`) : esc(w.w)).join(" ");
    $("#dtFeed").innerHTML = `<div class="explain"><b>正确率 ${acc}%</b>（原文 ${res.total} 词，写对 ${res.matched} 词）<br><div class="dict-diff">${html}</div><div class="muted" style="margin-top:6px">原句：${esc(it.t)}</div></div>`;
    $("#dtCheck").disabled = true;
    $("#dtInput").disabled = true;
    $("#dtNext").style.display = "inline-block";
    recordAnswer(acc >= 90, null, "dict");
  });
  $("#dtNext").addEventListener("click", () => { dict.i++; renderDictItem(); });
}

/* ============ 每日挑战 ============ */
let challenge = null;
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function seededShuffle(arr, seed) {
  let t = seed >>> 0;
  const rnd = () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function challengeDoneToday() { return !!(state.challengeLog && state.challengeLog[todayStr()]); }
function buildDailyChallenge() {
  const seed = hashStr(todayStr());
  const items = [];
  const due = dueWords("all");
  const allV = VOCAB_DATA.reduce((a, c) => a.concat(c.words.map((w, i) => ({ cat: c, i: i, w: w }))), []);
  const vpool = due.length >= 4 ? due : allV;
  seededShuffle(vpool, seed).slice(0, 4).forEach((v) => items.push({ type: "v", v: v }));
  const pools = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
  let weakPool = null;
  Object.keys(state.poolStats).forEach((k) => {
    const s = state.poolStats[k];
    if (pools.includes(k) && s.a >= 4) { const acc = s.c / s.a; if (!weakPool || acc < weakPool.acc) weakPool = { k: k, acc: acc }; }
  });
  const pickQ = (pool, salt) => {
    const d = ALL_POOLS[pool];
    const idx = seededShuffle(d.map((_, i) => i), seed + hashStr(pool) + salt)[0];
    const qn = pool === "p6" ? 4 : (d[idx].questions ? d[idx].questions.length : 1);
    const qIdx = seededShuffle([0, 1, 2, 3].slice(0, qn), seed + hashStr(pool) + salt + 11)[0];
    return { type: "q", pool: pool, idx: idx, qIdx: qIdx };
  };
  if (weakPool) items.push(pickQ(weakPool.k, 1));
  items.push(pickQ(seededShuffle(pools, seed)[0], 2));
  items.push(pickQ(seededShuffle(pools, seed + 7)[0], 3));
  if (weakPool) items.push(pickQ(weakPool.k, 4));
  seededShuffle(state.wrongbook, seed).slice(0, 2).forEach((e) => items.push({ type: "w", e: e }));
  return items;
}
function renderChallenge(root) {
  const done = challengeDoneToday();
  root.innerHTML = `
  <div class="page-head"><h1>🗓️ 今日挑战</h1><p class="muted">每天一组固定混合题（当天不变）：4 个单词 + 4 道题（优先你的弱项）+ 2 道错题。完成即点亮今天。</p></div>
  <div class="card center">
    ${done ? `<p style="font-size:18px">✅ <b>今天的挑战已完成</b>，连续点亮每一天！</p>` : `<p style="font-size:16px">准备好了吗？一共 6-10 项，约 8 分钟。</p>`}
    <button class="btn big primary" id="chGo" style="text-align:center">${done ? "再练一轮（不再重复点亮）" : "开始今日挑战"}</button>
  </div>`;
  $("#chGo").addEventListener("click", startChallenge);
}
function startChallenge() {
  challenge = { list: buildDailyChallenge(), i: 0, correct: 0 };
  renderChallengeItem();
}
function renderChallengeItem() {
  const area = $("#view");
  if (challenge.i >= challenge.list.length) {
    state.challengeLog[todayStr()] = true;
    saveState();
    area.innerHTML = `<div class="card center flashcard"><h1 style="margin:6px 0">🎉</h1><h3>今日挑战完成！答对 ${challenge.correct} / ${challenge.list.length}</h3><p class="muted">已点亮 ${todayStr()}。明天会刷新一组新题目。</p><button class="btn big" onclick="go('dashboard')" style="text-align:center">回首页</button></div>`;
    challenge = null;
    return;
  }
  const it = challenge.list[challenge.i];
  let body = "", bind = null;
  if (it.type === "v") {
    const item = it.v;
    const wrongPool = shuffle(VOCAB_DATA.reduce((a, c) => a.concat(c.words.filter((w) => w.zh !== item.w.zh && w.w.toLowerCase() !== item.w.w.toLowerCase())), [])).slice(0, 3).map((w) => w.zh);
    const opts = shuffle([item.w.zh].concat(wrongPool));
    body = `<div class="fc-meta">词汇 · ${esc(item.cat.name)}</div><div class="fc-word">${esc(item.w.w)} <button class="icon-btn" id="chSpeak">🔊</button></div>
      <div id="chOpts">${opts.map((o) => `<button class="opt" data-ok="${o === item.w.zh ? 1 : 0}">${esc(o)}</button>`).join("")}</div><div id="chFeed"></div>`;
    bind = () => {
      $("#chSpeak").addEventListener("click", () => speakList([{ text: item.w.w }]));
      if (state.settings.autoSpeak !== false) setTimeout(() => speakList([{ text: item.w.w }]), 350);
      $$("#chOpts .opt").forEach((b) => b.addEventListener("click", () => {
        const ok = b.dataset.ok === "1";
        $$("#chOpts .opt").forEach((x) => { x.disabled = true; if (x.dataset.ok === "1") x.classList.add("correct"); });
        if (!ok) b.classList.add("wrong"); else challenge.correct++;
        $("#chFeed").innerHTML = `<div class="explain"><b>${esc(item.w.zh)}</b><br>${esc(item.w.ex)}</div>`;
        $("#chNext").style.display = "inline-block";
        updateVocab(item.cat.id, item.i, ok);
      }));
    };
  } else if (it.type === "q") {
    const q = getQuestion(it.pool, it.idx, it.qIdx);
    body = `<div class="fc-meta">题目 · ${POOL_LABEL[it.pool]}</div><div class="q-text">${esc(q.q)}</div>
      <div id="chOpts">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div><div id="chFeed"></div>`;
    bind = () => {
      $$("#chOpts .opt").forEach((b) => b.addEventListener("click", () => {
        const k = +b.dataset.k, ok = k === q.answer;
        $$("#chOpts .opt").forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("correct"); });
        if (!ok) b.classList.add("wrong"); else challenge.correct++;
        $("#chFeed").innerHTML = `<div class="explain">${ok ? "✅ 正确！" : "❌ 正确答案：" + LETTERS[q.answer] + "。"} ${esc(q.explain || "")}</div>`;
        $("#chNext").style.display = "inline-block";
        recordAnswer(ok, ok ? null : { pool: it.pool, idx: it.idx, qIdx: it.qIdx }, it.pool);
      }));
    };
  } else {
    const q = getQuestion(it.e.pool, it.e.idx, it.e.qIdx);
    body = `<div class="fc-meta">错题重做 · ${POOL_LABEL[it.e.pool]}</div><div class="q-text">${esc(q.q)}</div>
      <div id="chOpts">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div><div id="chFeed"></div>`;
    bind = () => {
      $$("#chOpts .opt").forEach((b) => b.addEventListener("click", () => {
        const k = +b.dataset.k, ok = k === q.answer;
        $$("#chOpts .opt").forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("correct"); });
        if (!ok) b.classList.add("wrong"); else challenge.correct++;
        $("#chFeed").innerHTML = `<div class="explain">${ok ? "✅ 这次答对了！" : "❌ 正确答案：" + LETTERS[q.answer] + "。"} ${esc(q.explain || "")}</div>`;
        $("#chNext").style.display = "inline-block";
        recordAnswer(ok, null, it.e.pool);
        if (ok) { state.wrongbook = state.wrongbook.filter((x) => !(x.pool === it.e.pool && x.idx === it.e.idx && x.qIdx === it.e.qIdx)); saveState(); }
      }));
    };
  }
  area.innerHTML = `<div class="card flashcard"><div class="fc-meta" style="display:flex;justify-content:space-between"><span>第 ${challenge.i + 1} / ${challenge.list.length} 项</span><span>答对 ${challenge.correct}</span></div>${body}<div class="btn-row"><button class="btn" id="chNext" style="display:none">下一项 →</button></div></div>`;
  bind();
  $("#chNext").addEventListener("click", () => { challenge.i++; renderChallengeItem(); });
}

/* ============ 模拟考试 ============ */
let mock = null;
const MOCK_LABEL = { full: "全真模考", quick: "快速模考", listen: "听力专项", read: "阅读专项" };
const mockMinutes = (kind) => ({ full: 120, quick: 45, listen: 25, read: 30 }[kind] || 45);
function renderMock(root) {
  root.innerHTML = `
  <div class="page-head"><h1>⏱️ 模拟考试</h1><p class="muted">从题库随机抽题组卷，严格计时。成绩为按比例折算的<b>估算分</b>，仅供参考趋势。</p></div>
  <div class="grid grid-2">
    <div class="card" style="border:1.5px solid #c9d1ff; background:linear-gradient(135deg, var(--brand-soft), transparent)"><h3>🏆 全真模考</h3><p>听力 100 题（P1×6 / P2×25 / P3×13 组 / P4×10 篇）+ 阅读 100 题（P5×30 / P6×4 篇 / P7 单篇全量 + 双篇精选 6 组）<br><b>标准 200 题 · 限时 120 分钟</b>（真实考试 45+75 节奏，听转读时有提示）</p><button class="btn big primary" data-m="full">开始</button></div>
    <div class="card"><h3>🎯 快速模考</h3><p>听力 22 题 + 阅读 26 题<br>限时 45 分钟</p><button class="btn big" data-m="quick">开始</button></div>
    <div class="card"><h3>🎧 听力专项</h3><p>Part 1-4 共 22 题<br>限时 25 分钟</p><button class="btn big" data-m="listen">开始</button></div>
    <div class="card"><h3>📖 阅读专项</h3><p>Part 5-7 共 26 题<br>限时 30 分钟</p><button class="btn big" data-m="read">开始</button></div>
    <div class="card note"><h3>ℹ️ 说明</h3><p>· 每部分从题库随机抽取，多刷几套覆盖面更广<br>· 听力每段只播一遍（可点重播按钮）<br>· 全真模考 P7 单篇双篇全部使用，最接近真实考试<br>· 估算分 = 正确率 × 495（实际官方换算为非线性）</p></div>
  </div>`;
  $$("[data-m]", root).forEach((b) => b.addEventListener("click", () => startMock(b.dataset.m)));
}
function buildMockItems(kind) {
  const pick = (pool, n) => shuffle(ALL_POOLS[pool].map((_, i) => ({ pool: pool, idx: i }))).slice(0, n);
  let L = [], R = [];
  if (kind === "full") {
    L = [].concat(pick("p1", Math.min(6, ALL_POOLS.p1.length)), pick("p2", Math.min(25, ALL_POOLS.p2.length)),
      shuffle(ALL_POOLS.p3.map((_, i) => ({ pool: "p3", idx: i }))).slice(0, 13), shuffle(ALL_POOLS.p4.map((_, i) => ({ pool: "p4", idx: i }))).slice(0, 10));
    const singles = ALL_POOLS.p7.map((d, i) => ({ pool: "p7", idx: i })).filter((x) => !ALL_POOLS.p7[x.idx].double);
    const doubles = ALL_POOLS.p7.map((d, i) => ({ pool: "p7", idx: i })).filter((x) => ALL_POOLS.p7[x.idx].double);
    R = [].concat(pick("p5", Math.min(30, ALL_POOLS.p5.length)), shuffle(ALL_POOLS.p6.map((_, i) => ({ pool: "p6", idx: i }))).slice(0, 4), shuffle(singles), shuffle(doubles).slice(0, 6));
    return { L: L, R: R, minutes: 120 };
  }
  if (kind !== "read") { L = [].concat(pick("p1", 2), pick("p2", 8), pick("p3", 2), pick("p4", 2)); }
  if (kind !== "listen") {
    const singles = ALL_POOLS.p7.map((d, i) => ({ pool: "p7", idx: i })).filter((x) => !ALL_POOLS.p7[x.idx].double);
    const doubles = ALL_POOLS.p7.map((d, i) => ({ pool: "p7", idx: i })).filter((x) => ALL_POOLS.p7[x.idx].double);
    R = [].concat(pick("p5", 15), pick("p6", 1), shuffle(singles).slice(0, 1), shuffle(doubles).slice(0, 1));
  }
  return { L: L, R: R, minutes: mockMinutes(kind) };
}
function startMock(kind) {
  if (kind === "full" && !confirm("全真模考约需 2 小时（听力 97 题 + 阅读 100 题，限时 120 分钟），建议找个完整时间段。确定开始？")) return;
  const built = buildMockItems(kind);
  mock = { kind: kind, L: built.L, R: built.R, i: 0, answers: {}, endAt: Date.now() + built.minutes * 60000, list: [].concat(built.L, built.R) };
  renderMockItem();
  mock.timer = setInterval(() => {
    const left = mock.endAt - Date.now();
    const el = $("#mockTimer");
    if (!el) return clearInterval(mock.timer);
    if (left <= 0) { clearInterval(mock.timer); alert("时间到！自动交卷"); finishMock(); return; }
    el.textContent = pad2(Math.floor(left / 60000)) + ":" + pad2(Math.floor(left % 60000 / 1000));
  }, 500);
}
function mockGroupQCount(it) {
  const d = ALL_POOLS[it.pool][it.idx];
  if (it.pool === "p1" || it.pool === "p2" || it.pool === "p5") return 1;
  if (it.pool === "p6") return 4;
  return d.questions.length;
}
function renderMockItem() {
  const area = $("#view");
  if (mock.i >= mock.list.length) return finishMock();
  stopSpeak();
  const it = mock.list[mock.i];
  const isListen = mock.i < mock.L.length;
  const d = ALL_POOLS[it.pool][it.idx];
  let body = "";
  if (it.pool === "p1") {
    body = `<div class="photo-box">📷 照片场景：${esc(d.scene)}</div>
      <div id="mkc0">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <button class="btn sm" id="mkPlay" style="margin-top:8px">🔊 播放选项</button>`;
  } else if (it.pool === "p2") {
    body = `<div id="mkc0">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <button class="btn sm" id="mkPlay" style="margin-top:8px">🔊 播放问题</button>`;
  } else if (it.pool === "p5") {
    body = `<div class="q-text">${esc(d.q)}</div>
      <div id="mkc0">${d.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>`;
  } else if (it.pool === "p6") {
    body = `<div class="passage">${d.lines.map((l) => (l ? "<p>" + esc(l) + "</p>" : "")).join("")}</div>
      ${d.blanks.map((b, bi) => `<div class="q-block"><div class="q-text">第 ${bi + 1} 空</div><div class="q-choices" id="mkc${bi}">${b.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div></div>`).join("")}`;
  } else {
    body = `${it.pool === "p7" ? `<div class="passage">${d.passages.map((p) => "<p>" + esc(p).replace(/\n/g, "<br>") + "</p><hr>").join("")}</div>` : ""}
      <div class="fc-meta">${esc(d.title || "")}</div>
      ${d.questions.map((q, qi) => `<div class="q-block"><div class="q-text">${esc(q.q)}</div><div class="q-choices" id="mkc${qi}">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div></div>`).join("")}
      ${it.pool === "p3" || it.pool === "p4" ? `<div class="transcript" style="display:none" id="mkScript">${d.script.map((l) => "<p>" + esc(l) + "</p>").join("")}</div><button class="btn sm" id="mkPlay" style="margin-top:8px">🔊 播放${it.pool === "p3" ? "对话" : "短文"}</button>` : ""}`;
  }
  area.innerHTML = `
  <div class="mock-bar">
    <span>${isListen ? "🎧 听力" : "📖 阅读"} · 第 ${mock.i + 1} / ${mock.list.length} 组</span>
    <span class="timer" id="mockTimer">--:--</span>
    <button class="btn sm" id="mkSubmit">交卷</button>
  </div>
  ${mock.kind === "full" && mock.i === mock.L.length ? `<div class="card note">🎧 <b>听力部分结束！</b>现在进入阅读部分（建议 75 分钟内完成，总倒计时已包含）。点击「下一组」开始 Part 5。</div>` : ""}
  <div class="card">${body}
    <div class="btn-row" style="margin-top:14px">
      ${mock.i > 0 ? `<button class="btn" id="mkPrev">← 上一组</button>` : ""}
      <button class="btn" id="mkNext">${mock.i + 1 >= mock.list.length ? "交卷" : "下一组 →"}</button>
    </div>
  </div>`;
  // 播放
  const playBtn = $("#mkPlay");
  if (playBtn) playBtn.addEventListener("click", () => {
    if (it.pool === "p1") speakList(d.choices.map((c) => ({ text: c })));
    else if (it.pool === "p2") speakList([{ text: d.q }]);
    else speakList(d.script.map((l) => ({ text: l })));
  });
  if (isListen && it.pool === "p1") setTimeout(() => playBtn && playBtn.click(), 300);
  if (isListen && it.pool === "p2") setTimeout(() => playBtn && playBtn.click(), 300);
  if (isListen && (it.pool === "p3" || it.pool === "p4")) setTimeout(() => playBtn && playBtn.click(), 300);
  // 作答
  const nQ = mockGroupQCount(it);
  for (let qi = 0; qi < nQ; qi++) {
    $$("#mkc" + qi + " .opt").forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.k;
      $$("#mkc" + qi + " .opt").forEach((x, j) => x.classList.toggle("picked", j === k));
      mock.answers[it.pool + ":" + it.idx + ":" + qi] = k;
      if (it.pool === "p3" || it.pool === "p4") { const sc = $("#mkScript"); if (sc) sc.style.display = "block"; }
    }));
    if (mock.answers[it.pool + ":" + it.idx + ":" + qi] !== undefined) {
      $$("#mkc" + qi + " .opt")[mock.answers[it.pool + ":" + it.idx + ":" + qi]].classList.add("picked");
    }
  }
  $("#mkNext").addEventListener("click", () => { mock.i++; renderMockItem(); });
  const prev = $("#mkPrev"); if (prev) prev.addEventListener("click", () => { mock.i--; renderMockItem(); });
  $("#mkSubmit").addEventListener("click", () => { if (confirm("确定交卷？")) finishMock(); });
}
function finishMock() {
  if (!mock) return;
  clearInterval(mock.timer);
  stopSpeak();
  let lC = 0, lT = 0, rC = 0, rT = 0;
  mock.L.forEach((it) => { lT += mockGroupQCount(it); });
  mock.R.forEach((it) => { rT += mockGroupQCount(it); });
  Object.keys(mock.answers).forEach((key) => {
    const parts = key.split(":");
    const pool = parts[0], idx = +parts[1], qi = +parts[2];
    const q = getQuestion(pool, idx, qi);
    const correct = mock.answers[key] === q.answer;
    const isL = ["p1", "p2", "p3", "p4"].includes(pool);
    if (correct) { isL ? lC++ : rC++; }
    recordAnswer(correct, correct ? null : { pool: pool, idx: idx, qIdx: qi }, pool);
  });
  state.mockHistory.push({ date: todayStr(), kind: mock.kind, lC: lC, lT: lT, rC: rC, rT: rT });
  saveState();
  const lS = scoreEst(lC, lT), rS = scoreEst(rC, rT);
  const kindLabel = MOCK_LABEL[mock.kind] || "模考";
  const usedMin = Math.max(1, Math.round((Date.now() - (mock.endAt - mockMinutes(mock.kind) * 60000)) / 60000));
  $("#view").innerHTML = `
  <div class="page-head"><h1>📊 ${kindLabel}成绩</h1><p class="muted">${todayStr()} · 用时 ${usedMin} 分钟（估算分，按正确率折算）</p></div>
  <div class="grid grid-3">
    <div class="card center"><div class="score-num">${lS}</div><div class="muted">听力估算（${lC}/${lT}）</div></div>
    <div class="card center"><div class="score-num">${rS}</div><div class="muted">阅读估算（${rC}/${rT}）</div></div>
    <div class="card center"><div class="score-num total">${lS + rS}</div><div class="muted">总分估算 / 990</div></div>
  </div>
  <div class="card"><h3>错题回顾</h3>
    ${Object.keys(mock.answers).filter((k) => { const p = k.split(":"); return mock.answers[k] !== getQuestion(p[0], +p[1], +p[2]).answer; }).map((k) => {
    const p = k.split(":"); const q = getQuestion(p[0], +p[1], +p[2]);
    return `<div class="q-block"><div class="q-text">【${POOL_LABEL[p[0]]}】${esc(q.q || "")}</div>
      <div class="explain">你的答案：${LETTERS[mock.answers[k]]} · 正确答案：<b>${LETTERS[q.answer]}</b><br>${esc(q.explain || "")}</div></div>`;
  }).join("") || `<p class="muted">🎉 全部正确！</p>`}
  </div>
  <button class="btn big" onclick="go('mock')">再来一套</button>`;
  mock = null;
  window.scrollTo(0, 0);
}

/* ============ 错题本 ============ */
function renderWrong(root) {
  const now = Date.now();
  const due = state.wrongbook.filter((e) => (e.next || 0) <= now);
  root.innerHTML = `
  <div class="page-head"><h1>❌ 错题本</h1><p class="muted">错题按遗忘曲线安排复习：重练答对 → 1 天后重现 → 再对 → 3 天后 → 再对 → 7 天后 → 第四次答对才移出。答错则从头再来。</p></div>
  <div class="card">
    <div class="stat-row"><span>待复习（已到期）</span><b>${due.length} 题</b></div>
    <div class="stat-row"><span>错题本总数</span><b>${state.wrongbook.length} 题</b></div>
    <button class="btn big primary" id="wPractice" ${state.wrongbook.length ? "" : "disabled"}>${due.length ? "开始重练（先复习到期的 " + Math.min(15, due.length) + " 题）" : "开始重练（全部 " + state.wrongbook.length + " 题）"}</button>
    <button class="btn danger" id="wClear" ${state.wrongbook.length ? "" : "disabled"}>清空错题本</button>
  </div>
  <div id="wArea">
    ${state.wrongbook.length ? `<div class="card">${state.wrongbook.slice().reverse().map((e) => {
    const q = getQuestion(e.pool, e.idx, e.qIdx);
    const d = ALL_POOLS[e.pool][e.idx];
    const nextTxt = (e.next || 0) > now ? " · 下次复习 " + fmtDate(e.next) : " · <b>已到期</b>";
    return `<details class="wrong-item"><summary>【${POOL_LABEL[e.pool]}】${esc((q.q || d.title || "").slice(0, 60))}<span class="muted">${nextTxt}</span></summary>
        <div class="explain">题目：${esc(q.q || "")}<br>正确答案：<b>${LETTERS[q.answer]}. ${esc(q.choices[q.answer])}</b><br>${esc(q.explain || "")}</div></details>`;
  }).join("")}</div>` : `<div class="card note">错题本是空的，去刷题吧！错题会自动收录在这里。</div>`}
  </div>`;
  if (state.wrongbook.length) {
    $("#wClear").addEventListener("click", () => { if (confirm("确定清空错题本？")) { state.wrongbook = []; saveState(); renderWrong(root); } });
    $("#wPractice").addEventListener("click", () => renderWrongPractice(root));
  }
}
function renderWrongPractice(root) {
  const now = Date.now();
  const due = state.wrongbook.filter((e) => (e.next || 0) <= now);
  const list = shuffle(due.length ? due : state.wrongbook).slice(0, 15);
  let i = 0, passed = 0, cleared = 0;
  const next = () => {
    if (i >= list.length) {
      saveState();
      $("#wArea").innerHTML = `<div class="card"><h3>🎉 重练完成！</h3><p>本轮答对 ${passed} / ${list.length}。答对的题进入更长复习间隔，连续答对三次的题已移出错题本（本轮移出 ${cleared} 题）。</p><button class="btn" onclick="go('wrong')">返回错题本</button></div>`;
      return;
    }
    const e = list[i], q = getQuestion(e.pool, e.idx, e.qIdx);
    $("#wArea").innerHTML = `
    <div class="card flashcard">
      <div class="fc-meta">【${POOL_LABEL[e.pool]}】第 ${i + 1} / ${list.length} 题</div>
      <div class="q-text">${esc(q.q)}</div>
      <div id="wOpts">${q.choices.map((c, k) => `<button class="opt" data-k="${k}"><b>${LETTERS[k]}.</b> ${esc(c)}</button>`).join("")}</div>
      <div id="wFeed"></div>
      <div class="btn-row"><button class="btn" id="wNext" style="display:none">下一题 →</button></div>
    </div>`;
    $$("#wOpts .opt").forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.k, ok = k === q.answer;
      $$("#wOpts .opt").forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add("correct"); });
      if (!ok) b.classList.add("wrong");
      $("#wFeed").innerHTML = `<div class="explain">${ok ? "✅ 答对了！" : "❌ 再看看解析"}<br>${esc(q.explain || "")}</div>`;
      if (ok) {
        passed++;
        if ((e.box || 0) >= 2) { state.wrongbook = state.wrongbook.filter((x) => !(x.pool === e.pool && x.idx === e.idx && x.qIdx === e.qIdx)); cleared++; }
        else { e.box = (e.box || 0) + 1; e.next = Date.now() + [1, 3, 7][e.box] * 86400000; }
      } else { e.box = 0; e.next = 0; recordAnswer(false, null, e.pool); }
      $("#wNext").style.display = "inline-block";
    }));
    $("#wNext").addEventListener("click", () => { i++; next(); });
  };
  next();
}

/* ============ 备考指南 ============ */
function updatePlanProgress() {
  let total = 0, done = 0;
  STUDY_PLAN.forEach((w, wi) => {
    const d = w.tasks.filter((t, ti) => state.planChecks["w" + wi + "t" + ti]).length;
    done += d; total += w.tasks.length;
    const el = $("#wc" + wi); if (el) el.textContent = " · 已完成 " + d + "/" + w.tasks.length;
  });
  const pt = $("#planTotal"); if (pt) pt.textContent = done + " / " + total + " 项";
  const pb = $("#planBar"); if (pb) pb.style.width = Math.round(done / total * 100) + "%";
}
function renderGuide(root) {
  const E = EXAM_STRUCTURE;
  root.innerHTML = `
  <div class="page-head"><h1>📌 备考指南与资料库</h1><p class="muted">考试结构 · 评分标准 · 各 Part 策略 · 30 天计划 · 精选资源（日本）</p></div>

  <div class="card"><h3>📋 考试结构（TOEIC L&R，共 2 小时 · 200 题 · 990 分）</h3>
    ${E.sections.map((sec) => `<h4>${sec.name}（${sec.time} · ${sec.count} · ${sec.score}）</h4>
      <table class="tbl"><tr><th>Part</th><th>题量</th><th>内容</th><th>要点</th></tr>
      ${sec.parts.map((p) => `<tr><td><b>${p.p}</b></td><td>${p.n}</td><td>${p.d}</td><td class="tip-cell">${p.tip}</td></tr>`).join("")}</table>`).join("")}
  </div>

  <div class="card"><h3>🎚️ 分数段参考</h3>
    <table class="tbl"><tr><th>分数</th><th>水平</th><th>说明</th></tr>
    ${E.scoring.map((s) => `<tr><td><b>${s.band}</b></td><td>${s.level}</td><td>${s.note}</td></tr>`).join("")}</table>
    <p class="muted">日本企业常见门槛：500（新卒最低线）・600（日常业务）・730（海外部署候补）・860（管理岗）。官方换算为非线性，本软件估算仅供参考。</p>
  </div>

  <div class="card"><h3>🇯🇵 日本报考信息</h3>
    <table class="tbl">${JAPAN_INFO.map((r) => `<tr><th style="width:90px">${r.k}</th><td>${r.v}</td></tr>`).join("")}</table>
  </div>

  <div class="card"><h3>🎯 Part 5 语法考点速查（做题前扫一遍）</h3>
    <table class="tbl"><tr><th style="width:120px">考点</th><th>判断方法</th><th style="width:230px">示例</th></tr>
    ${GRAMMAR_CHEATSHEET.map((g) => `<tr><td><b>${g.point}</b></td><td>${g.signal}</td><td class="tip-cell">${g.demo}</td></tr>`).join("")}</table>
  </div>

  <div class="card"><h3>🏆 各 Part 高分策略</h3>
    ${STRATEGIES.map((s) => `<details class="strategy"><summary>${s.icon} ${s.part}</summary><ul>${s.points.map((p) => "<li>" + p + "</li>").join("")}</ul></details>`).join("")}
  </div>

  <div class="card"><h3>🗓️ 30 天冲刺计划（勾选打卡）</h3>
    <div class="stat-row"><span>总进度</span><b id="planTotal"></b></div>
    <div class="progress" style="margin:8px 0 10px"><div id="planBar" style="width:0%"></div></div>
    ${STUDY_PLAN.map((w, wi) => {
    const done = w.tasks.filter((t, ti) => state.planChecks["w" + wi + "t" + ti]).length;
    return `<details class="strategy" ${wi === 0 ? "open" : ""}><summary><b>${w.week}</b>（${w.days}）<span class="muted" id="wc${wi}"> · 已完成 ${done}/${w.tasks.length}</span></summary>
      <div>${w.tasks.map((t, ti) => `<label class="plan-item"><input type="checkbox" data-k="w${wi}t${ti}" ${state.planChecks["w" + wi + "t" + ti] ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div></details>`;
  }).join("")}
  </div>

  <div class="card"><h3>🔗 精选备考资源</h3>
    ${RESOURCES.map((c) => `<h4>${c.icon} ${c.cat}</h4><ul class="res-list">${c.items.map((it) => `<li><a href="${it.url}" target="_blank" rel="noopener">${esc(it.name)}</a><br><span class="muted">${esc(it.desc)}</span></li>`).join("")}</ul>`).join("")}
    <p class="muted">提示：链接在浏览器中打开；日本官方教材可在 Amazon.co.jp 或纪伊国屋购买，二手书也非常划算。</p>
  </div>`;
  updatePlanProgress();
  $$("input[data-k]", root).forEach((cb) => cb.addEventListener("change", (e) => {
    const k = e.target.dataset.k;
    if (e.target.checked) state.planChecks[k] = true; else delete state.planChecks[k];
    saveState(); updatePlanProgress();
  }));
}

/* ============ 启动 ============ */
function buildNav() {
  $("#nav").innerHTML = NAV.map(([id, label]) => `<button class="nav-btn" data-view="${id}">${label}</button>`).join("");
  $$(".nav-btn").forEach((b) => { if (!b.dataset.view) return; b.addEventListener("click", () => go(b.dataset.view)); });
  $("#themeBtn").addEventListener("click", () => {
    state.settings.darkMode = !state.settings.darkMode;
    saveState(); applyTheme(); go(currentView);
  });
}
document.addEventListener("keydown", (e) => {
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Enter") {
    const btn = ["#lNext", "#rNext", "#qNext", "#wNext", "#dtNext", "#chNext"].map((s) => $(s)).find((b) => b && b.style.display !== "none" && !b.disabled);
    if (btn) { e.preventDefault(); btn.click(); }
    return;
  }
  if (["1", "2", "3", "4"].includes(e.key)) {
    const containers = $$("#qOpts, #lpChoices, #rpChoices, #mkc0, #mkc1, #mkc2, #mkc3, .q-choices");
    for (const c of containers) {
      const opts = $$(".opt:not(:disabled)", c);
      if (opts.length) { const o = opts[+e.key - 1]; if (o) { e.preventDefault(); o.click(); } break; }
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  applyTheme();
  initVoices();
  go("dashboard");
});
