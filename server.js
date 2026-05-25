import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3200);
const DATA_DIR = path.join(__dirname, "data");
const STATE_PATH = path.join(DATA_DIR, "state.json");
const PHASE_MS = 15 * 60 * 1000;
const TOTAL_SCORE = 21;
const PHASE_GOAL = 7;
const PHASE_TARGETS = { 1: 7, 2: 14, 3: 21 };

const files = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/app.js", "app.js"]
]);

const challengeMeta = new Map([
  ["op-1", { phase: 1, points: 1, answers: ["perguntar contexto de uso necessidade e preferencia do cliente"] }],
  ["op-2", { phase: 1, points: 1, answers: ["registrar necessidade objecao proximo passo prazo e responsavel"] }],
  ["op-3", { phase: 1, points: 1, answers: ["confirmar produto condicoes prazo pagamento e responsavel final"] }],
  ["ta-1", { phase: 1, points: 1, answers: ["qualificar leads priorizar fit e definir passagem entre etapas claras"] }],
  ["ta-2", { phase: 1, points: 1, answers: ["investigar criterio reforcar valor e negociar troca por contrapartida clara"] }],
  ["el-1", { phase: 1, points: 1, answers: ["definir segmento proposta de valor diferenciais e margem alvo"] }],
  ["el-2", { phase: 1, points: 1, answers: ["mapear jornada criar sucesso do cliente e medir recompra recorrente"] }],
  ["n2-1", { phase: 2, points: 1, answers: ["spin"] }],
  ["n2-2", { phase: 2, points: 1, answers: ["crm"] }],
  ["n2-3", { phase: 2, points: 1, answers: ["proposta de valor"] }],
  ["n2-4", { phase: 2, points: 1, answers: ["follow up", "followup"] }],
  ["n2-5", { phase: 2, points: 1, answers: ["sucesso do cliente"] }],
  ["n2-6", { phase: 2, points: 1, answers: ["lead qualificado"] }],
  ["n2-7", { phase: 2, points: 1, answers: ["taxa de conversao"] }],
  ["n3-1", { phase: 3, points: 1, answers: ["ticket medio"] }],
  ["n3-2", { phase: 3, points: 1, answers: ["margem de contribuicao"] }],
  ["n3-3", { phase: 3, points: 1, answers: ["lifetime value", "ltv"] }],
  ["n3-4", { phase: 3, points: 1, answers: ["churn"] }],
  ["n3-5", { phase: 3, points: 1, answers: ["nps"] }],
  ["n3-6", { phase: 3, points: 1, answers: ["upsell"] }],
  ["n3-7", { phase: 3, points: 1, answers: ["previsibilidade de receita"] }]
]);

await mkdir(DATA_DIR, { recursive: true });
let state = await loadState();

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    return await serveStatic(res, url.pathname);
  } catch (error) {
    console.error(error);
    json(res, 500, { error: "Erro interno do servidor." });
  }
});

async function handleApi(req, res, url) {
  prunePresence();

  if (req.method === "POST" && url.pathname === "/api/join") {
    const body = await readJson(req);
    const player = {
      id: randomUUID(),
      name: clean(body.name, 28) || "Aluno",
      groupId: normalizeGroup(body.groupId || "grupo-1"),
      avatar: clean(body.avatar, 24) || "consultor",
      color: clean(body.color, 16) || "#26b7a0",
      x: 0,
      z: 7.5,
      rot: 0,
      joinedAt: now()
    };
    ensureGroup(player.groupId);
    state.players[player.id] = player;
    touchPlayer(player.id);
    await persist();
    return json(res, 200, publicState(player.groupId, player.id));
  }

  if (req.method === "POST" && url.pathname === "/api/presence") {
    const body = await readJson(req);
    const player = state.players[body.playerId];
    if (!player) return json(res, 404, { error: "Jogador nao encontrado. Entre novamente." });
    player.x = clamp(Number(body.x), -13.5, 13.5);
    player.z = clamp(Number(body.z), -8.8, 8.8);
    player.rot = clamp(Number(body.rot), -Math.PI * 2, Math.PI * 2);
    player.lastSeen = Date.now();
    return json(res, 200, publicState(player.groupId, player.id));
  }

  if (req.method === "POST" && url.pathname === "/api/answer") {
    const body = await readJson(req);
    const player = state.players[body.playerId];
    if (!player) return json(res, 404, { error: "Jogador nao encontrado. Entre novamente." });
    const group = ensureGroup(player.groupId);
    updateClock(group);
    if (group.failed) return json(res, 409, publicState(player.groupId, player.id, "Tempo esgotado. O grupo precisa recomecar."));
    const challengeId = String(body.challengeId || "");
    const meta = challengeMeta.get(challengeId);
    if (!meta) return json(res, 400, { error: "Desafio invalido." });
    if (meta.phase !== group.phase) return json(res, 409, publicState(player.groupId, player.id, "Este desafio pertence a outra fase."));
    const normalizedAnswer = normalizeAnswer(body.answer || "");
    const correct = meta.answers.includes(normalizedAnswer);
    if (!group.answers[challengeId]) {
      group.answers[challengeId] = {
        correct,
        answeredBy: player.name,
        answeredAt: now(),
        answer: clean(body.answer, 80),
        points: correct ? meta.points : 0,
        phase: meta.phase
      };
      recalcGroup(group);
      await persist();
    }
    return json(res, 200, publicState(player.groupId, player.id));
  }

  if (req.method === "POST" && url.pathname === "/api/reset-group") {
    const body = await readJson(req);
    const player = state.players[body.playerId];
    if (!player) return json(res, 404, { error: "Jogador nao encontrado. Entre novamente." });
    state.groups[player.groupId] = freshGroup(player.groupId);
    await persist();
    return json(res, 200, publicState(player.groupId, player.id, "Grupo reiniciado do zero."));
  }

  if (req.method === "POST" && url.pathname === "/api/reset-all") {
    state.groups = {};
    state.players = {};
    await persist();
    return json(res, 200, { ok: true });
  }

  if (req.method === "GET" && url.pathname === "/api/state") {
    const groupId = normalizeGroup(url.searchParams.get("groupId") || "grupo-1");
    const playerId = url.searchParams.get("playerId") || "";
    ensureGroup(groupId);
    return json(res, 200, publicState(groupId, playerId));
  }

  json(res, 404, { error: "Rota nao encontrada." });
}

function ensureGroup(groupId) {
  state.groups[groupId] ||= freshGroup(groupId);
  normalizeGroupState(state.groups[groupId]);
  updateClock(state.groups[groupId]);
  return state.groups[groupId];
}

function freshGroup(groupId) {
  return {
    id: groupId,
    startedAt: Date.now(),
    phase: 1,
    phaseStartedAt: Date.now(),
    timeLimitMs: PHASE_MS,
    answers: {},
    score: 0,
    phase1Score: 0,
    phase2Score: 0,
    phase3Score: 0,
    escaped: false,
    failed: false,
    finishedAt: null
  };
}

function normalizeGroupState(group) {
  group.phase ||= 1;
  group.phaseStartedAt ||= group.startedAt || Date.now();
  group.timeLimitMs = PHASE_MS;
  group.answers ||= {};
  group.phase1Score ||= 0;
  group.phase2Score ||= 0;
  group.phase3Score ||= 0;
  group.score ||= 0;
  group.failed ||= false;
  group.escaped ||= false;
}

function updateClock(group) {
  const elapsed = Date.now() - group.phaseStartedAt;
  const target = PHASE_TARGETS[group.phase] || TOTAL_SCORE;
  if (!group.escaped && elapsed >= group.timeLimitMs && group.score < target) {
    group.failed = true;
    group.finishedAt ||= now();
  }
}

function recalcGroup(group) {
  group.phase1Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 1).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  group.phase2Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 2).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  group.phase3Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 3).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  const previousPhase = group.phase;
  group.score = Math.min(TOTAL_SCORE, group.phase1Score + group.phase2Score + group.phase3Score);
  if (group.phase === 1 && group.phase1Score >= PHASE_GOAL) {
    group.phase = 2;
    group.phaseStartedAt = Date.now();
    group.failed = false;
  }
  if (group.phase === 2 && group.phase1Score + group.phase2Score >= PHASE_TARGETS[2]) {
    group.phase = 3;
    group.phaseStartedAt = Date.now();
    group.failed = false;
  }
  group.escaped = group.score >= TOTAL_SCORE;
  if (group.escaped) group.finishedAt ||= now();
  if (previousPhase !== group.phase) group.phaseUnlockedAt = now();
}

function publicState(groupId, playerId = "", message = "") {
  const group = ensureGroup(groupId);
  const players = Object.values(state.players)
    .filter((player) => player.groupId === groupId && Date.now() - Number(player.lastSeen || 0) < 10000)
    .map(({ id, name, avatar, color, x, z, rot }) => ({ id, name, avatar, color, x, z, rot }));
  const ranking = Object.values(state.groups)
    .map((groupItem) => ({
      id: groupItem.id,
      score: groupItem.score,
      phase: groupItem.phase || 1,
      escaped: groupItem.escaped,
      failed: groupItem.failed,
      seconds: Math.max(0, Math.round((Number(groupItem.finishedAt ? Date.parse(groupItem.finishedAt) : Date.now()) - groupItem.startedAt) / 1000))
    }))
    .sort((a, b) => b.score - a.score || a.seconds - b.seconds);
  return { group, players, playerId, ranking, message, serverTime: Date.now() };
}

function touchPlayer(playerId) {
  if (state.players[playerId]) state.players[playerId].lastSeen = Date.now();
}

function prunePresence() {
  const cutoff = Date.now() - 60000;
  for (const [id, player] of Object.entries(state.players)) {
    if (Number(player.lastSeen || 0) < cutoff) delete state.players[id];
  }
}

async function loadState() {
  if (!existsSync(STATE_PATH)) return { groups: {}, players: {} };
  try {
    const parsed = JSON.parse(await readFile(STATE_PATH, "utf8"));
    return { groups: parsed.groups || {}, players: {} };
  } catch {
    return { groups: {}, players: {} };
  }
}

async function persist() {
  await writeFile(STATE_PATH, JSON.stringify({ groups: state.groups }, null, 2));
}

async function serveStatic(res, pathname) {
  const fileName = files.get(pathname);
  if (!fileName) return json(res, 404, { error: "Arquivo nao encontrado." });
  const filePath = path.join(__dirname, fileName);
  if (!existsSync(filePath)) return json(res, 404, { error: "Arquivo nao encontrado." });
  const ext = path.extname(filePath);
  const types = {
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".html": "text/html; charset=utf-8"
  };
  res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream", "Cache-Control": "no-store" });
  res.end(await readFile(filePath));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

function normalizeGroup(value) {
  return clean(value, 32).toLowerCase().replace(/\s+/g, "-") || "grupo-1";
}

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

function normalizeAnswer(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(min, Math.min(max, value));
}

function now() {
  return new Date().toISOString();
}

server.listen(PORT, () => {
  console.log(`Escape Room de Vendas 3D rodando em http://localhost:${PORT}`);
});
