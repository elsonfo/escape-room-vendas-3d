let THREE;

const PHASE_MS = 15 * 60 * 1000;
const TOTAL_SCORE = 21;
const PHASE_GOAL = 7;
const STATIC_MODE = location.hostname.endsWith("github.io");
const STATIC_STATE_KEY = "escape-room-vendas-3d-static-state";
const challenges = [
  {
    id: "op-1",
    level: "Leve",
    area: "Operacional",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Quiosque da Abordagem",
    prompt: "Um cliente parou diante da vitrine e olhou tres vezes para o mesmo produto. Qual acao operacional abre melhor a conversa?",
    correct: "Perguntar contexto de uso, necessidade e preferencia do cliente.",
    options: [
      "Perguntar contexto de uso, necessidade e preferencia do cliente.",
      "Oferecer desconto imediato, prazo curto e fechamento agora hoje.",
      "Entregar catalogo completo, observar silencio e esperar retorno depois."
    ],
    position: [-9, 0, 4.6],
    color: 0x2f8d64
  },
  {
    id: "op-2",
    level: "Leve",
    area: "Operacional",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Ilha do CRM",
    prompt: "Depois de uma conversa produtiva, qual registro ajuda a equipe a dar continuidade a venda?",
    correct: "Registrar necessidade, objecao, proximo passo, prazo e responsavel.",
    options: [
      "Registrar somente nome, telefone, produto e valor aproximado.",
      "Registrar necessidade, objecao, proximo passo, prazo e responsavel.",
      "Registrar humor, aparencia, pressa, roupas e opiniao pessoal."
    ],
    position: [-4.8, 0, -5.2],
    color: 0x315d9d
  },
  {
    id: "op-3",
    level: "Leve",
    area: "Operacional",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Caixa da Confirmacao",
    prompt: "Antes de fechar o pedido, o vendedor deve confirmar o que?",
    correct: "Confirmar produto, condicoes, prazo, pagamento e responsavel final.",
    options: [
      "Confirmar desconto, brinde, simpatia, pressa e humor final.",
      "Confirmar produto, condicoes, prazo, pagamento e responsavel final.",
      "Confirmar vitrine, uniforme, meta, script e comissao final."
    ],
    position: [0.2, 0, 5.4],
    color: 0xd89a27
  },
  {
    id: "ta-1",
    level: "Intermediario",
    area: "Tatico",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Escada do Funil",
    prompt: "A equipe tem muitos contatos e poucas propostas. Qual decisao tatica melhora a conversao?",
    correct: "Qualificar leads, priorizar fit e definir passagem entre etapas claras.",
    options: [
      "Aumentar contatos, manter script e cobrar volume diario sempre mais.",
      "Qualificar leads, priorizar fit e definir passagem entre etapas claras.",
      "Arquivar propostas, reduzir dados e acelerar funil sem analise previa."
    ],
    position: [5.2, 0, -4.8],
    color: 0xc9564a
  },
  {
    id: "ta-2",
    level: "Intermediario",
    area: "Tatico",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Praca das Objecoes",
    prompt: "Um cliente diz que o preco esta alto. Qual resposta tatica preserva valor e avanca a negociacao?",
    correct: "Investigar criterio, reforcar valor e negociar troca por contrapartida clara.",
    options: [
      "Aplicar desconto maximo, ignorar criterio e pedir assinatura imediata hoje.",
      "Encerrar conversa rapidamente, registrar perda e buscar cliente novo agora.",
      "Investigar criterio, reforcar valor e negociar troca por contrapartida clara."
    ],
    position: [9.4, 0, 2.8],
    color: 0x8d5bd1
  },
  {
    id: "el-1",
    level: "Elevado",
    area: "Estrategico",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Sala do Posicionamento",
    prompt: "A empresa quer vender mais sem competir so por preco. Qual escolha estrategica sustenta essa mudanca?",
    correct: "Definir segmento, proposta de valor, diferenciais e margem alvo.",
    options: [
      "Baixar preco, ampliar publico, prometer prazo e vender volume.",
      "Definir segmento, proposta de valor, diferenciais e margem alvo.",
      "Trocar vitrine, mudar slogan, pintar loja e aguardar movimento."
    ],
    position: [10.3, 0, -5.8],
    color: 0x138575
  },
  {
    id: "el-2",
    level: "Elevado",
    area: "Estrategico",
    phase: 1,
    type: "choice",
    points: 1,
    title: "Porta da Retencao",
    prompt: "Para aumentar receita recorrente, qual decisao estrategica conecta venda, pos-venda e fidelizacao?",
    correct: "Mapear jornada, criar sucesso do cliente e medir recompra recorrente.",
    options: [
      "Mapear jornada, criar sucesso do cliente e medir recompra recorrente.",
      "Premiar captacao agressiva, reduzir contato pos-venda e ignorar cancelamentos mensais.",
      "Enviar ofertas iguais, cobrar renovacao e esperar fidelidade automaticamente sempre."
    ],
    position: [0, 0, -7.2],
    color: 0x17202b
  },
  {
    id: "n2-1",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Cofre do Diagnostico",
    prompt: "Digite a metodologia de perguntas que explora situacao, problema, implicacao e necessidade de solucao.",
    correct: "spin",
    answerHint: "uma palavra",
    position: [-8.2, 0, -22.4],
    color: 0x2f8d64
  },
  {
    id: "n2-2",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Painel da Memoria Comercial",
    prompt: "Digite a sigla do sistema usado para registrar historico, oportunidades, contatos e proximas acoes.",
    correct: "crm",
    answerHint: "uma sigla",
    position: [-3.8, 0, -27.6],
    color: 0x315d9d
  },
  {
    id: "n2-3",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Mesa do Diferencial",
    prompt: "Digite o nome do elemento que explica por que o cliente deve escolher sua oferta.",
    correct: "proposta de valor",
    answerHint: "palavra composta",
    position: [1.2, 0, -22.8],
    color: 0xd89a27
  },
  {
    id: "n2-4",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Relogio do Retorno",
    prompt: "Digite o termo usado para o contato planejado apos proposta, reuniao ou demonstracao.",
    correct: "follow up",
    answerHint: "palavra composta",
    position: [5.9, 0, -27.2],
    color: 0xc9564a
  },
  {
    id: "n2-5",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Portal da Fidelizacao",
    prompt: "Digite a pratica que acompanha o cliente para gerar uso, valor, recompra e retencao.",
    correct: "sucesso do cliente",
    answerHint: "palavra composta",
    position: [9.4, 0, -22.5],
    color: 0x138575
  },
  {
    id: "n2-6",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Filtro do Potencial",
    prompt: "Digite o nome dado ao contato que tem perfil, necessidade e possibilidade real de compra.",
    correct: "lead qualificado",
    answerHint: "duas palavras",
    position: [-11.2, 0, -26.2],
    color: 0x8d5bd1
  },
  {
    id: "n2-7",
    level: "Nivel 2",
    area: "Alta performance",
    phase: 2,
    type: "text",
    points: 1,
    title: "Medidor do Funil",
    prompt: "Digite o indicador que mostra a proporcao de oportunidades que viram vendas.",
    correct: "taxa de conversao",
    answerHint: "tres palavras",
    position: [11.6, 0, -26.5],
    color: 0x17202b
  },
  {
    id: "n3-1",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 1: onde o cliente paga, procure o valor que cresce quando o mix melhora.",
    title: "Gaveta do Valor Medio",
    prompt: "Qual indicador mostra quanto, em media, cada venda entrega de receita?",
    correct: "ticket medio",
    answerHint: "duas palavras",
    position: [-10.8, 0, -41.8],
    color: 0xd89a27
  },
  {
    id: "n3-2",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 2: atras da vitrine mais bonita, nem todo faturamento vira ganho.",
    title: "Espelho da Rentabilidade",
    prompt: "Qual margem revela quanto sobra da venda depois dos custos variaveis?",
    correct: "margem de contribuicao",
    answerHint: "tres palavras",
    position: [-4.8, 0, -47.6],
    color: 0x2f8d64
  },
  {
    id: "n3-3",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 3: no relogio da relacao longa, o cliente vale alem da primeira compra.",
    title: "Relogio do Valor Vitalicio",
    prompt: "Digite o indicador que estima o valor total de um cliente ao longo do relacionamento.",
    correct: "ltv",
    answerHint: "sigla ou termo em ingles",
    position: [1.2, 0, -42.2],
    color: 0x315d9d
  },
  {
    id: "n3-4",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 4: perto da porta de saida, descubra o vazamento que rouba receita futura.",
    title: "Porta da Perda Silenciosa",
    prompt: "Qual indicador mede clientes que cancelam ou deixam de comprar em um periodo?",
    correct: "churn",
    answerHint: "uma palavra",
    position: [10.8, 0, -47.8],
    color: 0xc9564a
  },
  {
    id: "n3-5",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 5: na praca central, a voz do cliente diz se ele recomenda ou alerta.",
    title: "Bussola da Recomendacao",
    prompt: "Digite a sigla da pesquisa que mede promotores, neutros e detratores.",
    correct: "nps",
    answerHint: "uma sigla",
    position: [0, 0, -45.2],
    color: 0x138575
  },
  {
    id: "n3-6",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 6: na escada que sobe o carrinho, ofereca uma versao melhor sem perder contexto.",
    title: "Escada da Oferta Maior",
    prompt: "Qual tecnica aumenta o valor da venda ao migrar o cliente para uma oferta superior?",
    correct: "upsell",
    answerHint: "uma palavra em ingles",
    position: [6.2, 0, -40.6],
    color: 0x8d5bd1
  },
  {
    id: "n3-7",
    level: "Sala 3",
    area: "Enigma",
    phase: 3,
    type: "text",
    points: 1,
    hidden: true,
    riddle: "Pista 7: no painel final, vender bem tambem e enxergar receita antes dela chegar.",
    title: "Painel da Receita Futura",
    prompt: "Qual capacidade comercial permite estimar entradas futuras com base em funil, historico e recorrencia?",
    correct: "previsibilidade de receita",
    answerHint: "tres palavras",
    position: [11.4, 0, -42.0],
    color: 0x17202b
  }
];

const els = {
  joinScreen: document.querySelector("#joinScreen"),
  joinForm: document.querySelector("#joinForm"),
  playerName: document.querySelector("#playerName"),
  groupId: document.querySelector("#groupId"),
  avatarSelect: document.querySelector("#avatarSelect"),
  avatarColor: document.querySelector("#avatarColor"),
  joinBtn: document.querySelector("#joinBtn"),
  groupLabel: document.querySelector("#groupLabel"),
  scoreValue: document.querySelector("#scoreValue"),
  scoreMeter: document.querySelector("#scoreMeter"),
  statusText: document.querySelector("#statusText"),
  timerValue: document.querySelector("#timerValue"),
  resetGroupBtn: document.querySelector("#resetGroupBtn"),
  playersList: document.querySelector("#playersList"),
  challengeList: document.querySelector("#challengeList"),
  rankingList: document.querySelector("#rankingList"),
  sceneHost: document.querySelector("#sceneHost"),
  musicBtn: document.querySelector("#musicBtn"),
  cameraBtn: document.querySelector("#cameraBtn"),
  interactBtn: document.querySelector("#interactBtn"),
  dialog: document.querySelector("#challengeDialog"),
  challengeLevel: document.querySelector("#challengeLevel"),
  challengeTitle: document.querySelector("#challengeTitle"),
  challengePrompt: document.querySelector("#challengePrompt"),
  challengeOptions: document.querySelector("#challengeOptions"),
  toast: document.querySelector("#toast")
};

let playerId = sessionStorage.getItem("sv-player-id") || "";
let groupId = sessionStorage.getItem("sv-group-id") || "";
let groupState = null;
let remotePlayers = [];
let scene;
let camera;
let renderer;
let avatar;
let exitDoor;
let levelDoor;
let finalDoor;
let secondLevelGroup;
let thirdLevelGroup;
let mallObjects = [];
let phaseSigns = [];
let fireworks = [];
let remoteAvatarMeshes = new Map();
let keys = new Set();
let cameraMode = 0;
let musicOn = false;
let audioCtx = null;
let musicNodes = [];
let musicTimers = [];
let lastPresence = 0;
let lastRanking = [];
const local = { x: 0, z: 7.5, rot: 0, speed: 0.085 };

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}

async function api(path, options = {}) {
  if (STATIC_MODE) return staticApi(path, options);
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Falha de comunicacao.");
  return data;
}

async function staticApi(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const state = loadStaticState();

  if (method === "POST" && path === "/api/join") {
    const player = {
      id: crypto.randomUUID(),
      name: cleanText(body.name, 28) || "Aluno",
      groupId: normalizeGroupId(body.groupId || "grupo-1"),
      avatar: cleanText(body.avatar, 24) || "consultor",
      color: cleanText(body.color, 16) || "#26b7a0",
      x: 0,
      z: 7.5,
      rot: 0,
      lastSeen: Date.now()
    };
    state.groups[player.groupId] ||= freshStaticGroup(player.groupId);
    state.players[player.id] = player;
    saveStaticState(state);
    return publicStaticState(state, player.groupId, player.id);
  }

  if (method === "POST" && path === "/api/presence") {
    const player = state.players[body.playerId];
    if (!player) throw new Error("Jogador nao encontrado. Entre novamente.");
    player.x = clamp(Number(body.x), -13.5, 13.5);
    player.z = clamp(Number(body.z), -52, 8.8);
    player.rot = clamp(Number(body.rot), -Math.PI * 2, Math.PI * 2);
    player.lastSeen = Date.now();
    saveStaticState(state);
    return publicStaticState(state, player.groupId, player.id);
  }

  if (method === "POST" && path === "/api/answer") {
    const player = state.players[body.playerId];
    if (!player) throw new Error("Jogador nao encontrado. Entre novamente.");
    const group = state.groups[player.groupId] ||= freshStaticGroup(player.groupId);
    updateStaticClock(group);
    if (group.failed) return publicStaticState(state, player.groupId, player.id, "Tempo esgotado. O grupo precisa recomecar.");
    const challenge = challenges.find((item) => item.id === body.challengeId);
    if (!challenge) throw new Error("Desafio invalido.");
    if (challenge.phase !== group.phase) return publicStaticState(state, player.groupId, player.id, "Este desafio pertence a outra fase.");
    const submitted = cleanText(body.answer, 80);
    const correct = normalizeAnswer(submitted) === normalizeAnswer(challenge.correct);
    if (!group.answers[challenge.id]) {
      group.answers[challenge.id] = {
        correct,
        answeredBy: player.name,
        answeredAt: new Date().toISOString(),
        answer: submitted,
        points: correct ? challenge.points : 0,
        phase: challenge.phase
      };
      recalcStaticGroup(group);
      saveStaticState(state);
    }
    return publicStaticState(state, player.groupId, player.id);
  }

  if (method === "POST" && path === "/api/reset-group") {
    const player = state.players[body.playerId];
    if (!player) throw new Error("Jogador nao encontrado. Entre novamente.");
    state.groups[player.groupId] = freshStaticGroup(player.groupId);
    saveStaticState(state);
    return publicStaticState(state, player.groupId, player.id, "Grupo reiniciado do zero.");
  }

  if (method === "POST" && path === "/api/reset-all") {
    localStorage.removeItem(STATIC_STATE_KEY);
    return { ok: true };
  }

  if (method === "GET" && path.startsWith("/api/state")) {
    const url = new URL(path, location.href);
    const groupId = normalizeGroupId(url.searchParams.get("groupId") || "grupo-1");
    state.groups[groupId] ||= freshStaticGroup(groupId);
    saveStaticState(state);
    return publicStaticState(state, groupId, url.searchParams.get("playerId") || "");
  }

  throw new Error("Rota nao encontrada no modo estatico.");
}

function loadStaticState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STATIC_STATE_KEY) || "{}");
    return { groups: parsed.groups || {}, players: parsed.players || {} };
  } catch {
    return { groups: {}, players: {} };
  }
}

function saveStaticState(state) {
  localStorage.setItem(STATIC_STATE_KEY, JSON.stringify(state));
}

function freshStaticGroup(groupId) {
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

function updateStaticClock(group) {
  const targets = { 1: 7, 2: 14, 3: 21 };
  const elapsed = Date.now() - Number(group.phaseStartedAt || Date.now());
  if (!group.escaped && elapsed >= PHASE_MS && Number(group.score || 0) < targets[group.phase]) {
    group.failed = true;
    group.finishedAt ||= new Date().toISOString();
  }
}

function recalcStaticGroup(group) {
  group.phase1Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 1).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  group.phase2Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 2).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  group.phase3Score = Math.min(PHASE_GOAL, Object.values(group.answers).filter((answer) => answer.phase === 3).reduce((sum, answer) => sum + Number(answer.points || 0), 0));
  const previousPhase = group.phase;
  group.score = Math.min(TOTAL_SCORE, group.phase1Score + group.phase2Score + group.phase3Score);
  if (group.phase === 1 && group.phase1Score >= PHASE_GOAL) group.phase = 2;
  if (group.phase === 2 && group.phase1Score + group.phase2Score >= PHASE_GOAL * 2) group.phase = 3;
  if (previousPhase !== group.phase) {
    group.phaseStartedAt = Date.now();
    group.failed = false;
  }
  group.escaped = group.score >= TOTAL_SCORE;
  if (group.escaped) group.finishedAt ||= new Date().toISOString();
}

function publicStaticState(state, groupId, activePlayerId = "", message = "") {
  const group = state.groups[groupId] ||= freshStaticGroup(groupId);
  updateStaticClock(group);
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
  saveStaticState(state);
  return { group, players, playerId: activePlayerId, ranking, message, serverTime: Date.now() };
}

function normalizeGroupId(value) {
  return cleanText(value, 32).toLowerCase().replace(/\s+/g, "-") || "grupo-1";
}

function cleanText(value, max) {
  return String(value || "").trim().slice(0, max);
}

async function join(event) {
  event.preventDefault();
  if (location.protocol === "file:") {
    showToast("Abra pelo endereco http://localhost:3200, nao pelo arquivo HTML direto.");
    return;
  }
  const name = els.playerName.value.trim();
  const group = els.groupId.value.trim();
  if (!name || !group) {
    showToast("Preencha o nome do aluno e o grupo antes de entrar.");
    return;
  }
  els.joinBtn.disabled = true;
  els.joinBtn.textContent = "Entrando...";
  const payload = {
    name,
    groupId: group,
    avatar: els.avatarSelect.value,
    color: els.avatarColor.value
  };
  try {
    const data = await api("/api/join", { method: "POST", body: JSON.stringify(payload) });
    playerId = data.playerId;
    groupId = data.group.id;
    sessionStorage.setItem("sv-player-id", playerId);
    sessionStorage.setItem("sv-group-id", groupId);
    els.joinScreen.classList.add("hidden");
    applyState(data);
    showToast("Voce entrou na ala do shopping. Procure os totens luminosos.");
  } catch (error) {
    showToast(`Nao foi possivel entrar: ${error.message}`);
  } finally {
    els.joinBtn.disabled = false;
    els.joinBtn.textContent = "Entrar no shopping";
  }
}

function applyState(data) {
  const wasEscaped = Boolean(groupState?.escaped);
  groupState = data.group;
  remotePlayers = data.players || [];
  if (data.message) showToast(data.message);
  lastRanking = data.ranking || lastRanking;
  renderHud(data.ranking || []);
  updateRemoteAvatars();
  if (!wasEscaped && groupState.escaped) startVictory();
}

function renderHud(ranking) {
  if (!groupState) return;
  if (!ranking.length) ranking = lastRanking;
  const score = Number(groupState.score || 0);
  const phase = Number(groupState.phase || 1);
  const elapsed = Date.now() - Number(groupState.phaseStartedAt || Date.now());
  const left = Math.max(0, PHASE_MS - elapsed);
  els.groupLabel.textContent = `${groupState.id} | Fase ${phase}`;
  els.scoreValue.textContent = score;
  els.scoreMeter.style.width = `${Math.round((score / TOTAL_SCORE) * 100)}%`;
  els.timerValue.textContent = formatTime(left);
  if (groupState.escaped) els.statusText.textContent = "Vitoria liberada. A equipe concluiu as tres fases.";
  else if (groupState.failed) els.statusText.textContent = "Tempo esgotado. Reinicie para tentar novamente.";
  else if (phase === 1) els.statusText.textContent = "Fase 1: alcance 7 pontos em 15 minutos para abrir a porta.";
  else if (phase === 2) els.statusText.textContent = "Fase 2: conquiste mais 7 pontos em 15 minutos para liberar a sala final.";
  else els.statusText.textContent = "Fase 3: decifre as pistas, encontre perguntas escondidas e some os 21 pontos.";

  els.playersList.innerHTML = remotePlayers.map((player) => `<li><span>${escapeHtml(player.name)}</span><b>${escapeHtml(player.avatar)}</b></li>`).join("");
  els.challengeList.innerHTML = challenges.filter((challenge) => challenge.phase === phase).map((challenge) => {
    const done = groupState.answers?.[challenge.id];
    const mode = challenge.type === "text" ? "texto" : "multipla";
    const label = challenge.hidden && !done?.correct ? challenge.riddle : `${challenge.area}: ${challenge.title}`;
    const hint = challenge.hidden && !done?.correct ? "pista escondida" : mode;
    return `<li class="${done?.correct ? "done" : ""}"><span>${escapeHtml(label)}<small>${hint}</small></span><b>${done?.correct ? "+" + challenge.points : challenge.points}</b></li>`;
  }).join("");
  els.rankingList.innerHTML = ranking.slice(0, 6).map((item) => `<li><span>${escapeHtml(item.id)}</span><b>${item.score}/${TOTAL_SCORE}</b></li>`).join("");
  updatePhaseVisuals();
}

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
}

function updatePhaseVisuals() {
  const phase = Number(groupState?.phase || 1);
  mallObjects.forEach((object) => {
    object.visible = Number(object.userData.phase || 1) === phase;
  });
  phaseSigns.forEach((sign) => {
    sign.visible = Number(sign.userData.phase || 1) === phase || Boolean(groupState?.escaped);
  });
  if (secondLevelGroup) secondLevelGroup.visible = phase >= 2 || Boolean(groupState?.escaped);
  if (thirdLevelGroup) thirdLevelGroup.visible = phase === 3 || Boolean(groupState?.escaped);
  if (exitDoor) {
    const open = phase >= 2 || Number(groupState?.phase1Score || 0) >= PHASE_GOAL;
    exitDoor.material.color.set(open ? 0x2f8d64 : 0x6e2f35);
    exitDoor.material.emissive.set(open ? 0x0f3c2c : 0x150000);
  }
  if (levelDoor) {
    const open = phase >= 3 || Number(groupState?.phase1Score || 0) + Number(groupState?.phase2Score || 0) >= PHASE_GOAL * 2;
    levelDoor.material.color.set(open ? 0x2f8d64 : 0x6e2f35);
    levelDoor.material.emissive.set(open ? 0x0f3c2c : 0x150000);
  }
  if (finalDoor) {
    finalDoor.material.color.set(groupState?.escaped ? 0x2f8d64 : 0x6e2f35);
    finalDoor.material.emissive.set(groupState?.escaped ? 0x0f3c2c : 0x150000);
  }
}

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfe8ee);
  camera = new THREE.PerspectiveCamera(58, 1, 0.1, 120);
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  els.sceneHost.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8ea1aa, 1.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.75);
  sun.position.set(2, 8, 5);
  sun.castShadow = true;
  scene.add(sun);

  buildMall();
  avatar = createAvatar("#26b7a0", "voce");
  avatar.position.set(local.x, 0, local.z);
  scene.add(avatar);
  resize();
  animate();
}

function buildMall() {
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.25, 20),
    new THREE.MeshStandardMaterial({ color: 0xcdd9df, roughness: 0.74 })
  );
  floor.receiveShadow = true;
  floor.position.y = -0.15;
  scene.add(floor);

  addWall(0, -10, 30, 0.35, 0x465865);
  addWall(0, 10, 30, 0.35, 0x465865);
  addWall(-15, 0, 0.35, 20, 0x465865);
  addWall(15, 0, 0.35, 20, 0x465865);

  const atrium = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.2, 0.16, 48),
    new THREE.MeshStandardMaterial({ color: 0x9ec9d4, roughness: 0.45, metalness: 0.08 })
  );
  atrium.position.set(0, 0.02, 0);
  scene.add(atrium);
  addSign("PONTO DE ENCONTRO", 0, 0.16, 0, 0x17202b);

  challenges.forEach(addChallengeStation);
  addDecorStore(-11.8, -2.2, "VITRINE", 0x315d9d);
  addDecorStore(-7.2, 7.7, "CAFE", 0xd89a27);
  addDecorStore(6.8, 7.7, "TECH", 0x138575);
  addDecorStore(12.2, -1.8, "MODA", 0xc9564a);

  buildSecondLevel();
  buildThirdLevel();

  exitDoor = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 3.1, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x6e2f35, roughness: 0.5, emissive: 0x150000 })
  );
  exitDoor.position.set(0, 1.45, -9.84);
  exitDoor.name = "Porta do Nivel 2";
  scene.add(exitDoor);

  levelDoor = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 3.2, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x6e2f35, roughness: 0.45, emissive: 0x150000 })
  );
  levelDoor.position.set(0, 1.5, -31.2);
  levelDoor.name = "Porta da Sala 3";
  scene.add(levelDoor);

  finalDoor = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 3.2, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x6e2f35, roughness: 0.45, emissive: 0x150000 })
  );
  finalDoor.position.set(0, 1.5, -52.2);
  finalDoor.name = "Portal da Vitoria";
  scene.add(finalDoor);
}

function buildSecondLevel() {
  secondLevelGroup = new THREE.Group();
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.25, 18),
    new THREE.MeshStandardMaterial({ color: 0xbecbd6, roughness: 0.72 })
  );
  floor.receiveShadow = true;
  floor.position.set(0, -0.13, -24);
  secondLevelGroup.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x263d4c, roughness: 0.75 });
  [
    [0, 1.5, -33, 30, 3.2, 0.35],
    [-15, 1.5, -24, 0.35, 3.2, 18],
    [15, 1.5, -24, 0.35, 3.2, 18]
  ].forEach(([x, y, z, w, h, d]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    wall.position.set(x, y, z);
    secondLevelGroup.add(wall);
  });

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.08, 12, 64),
    new THREE.MeshStandardMaterial({ color: 0xd89a27, emissive: 0x7a4b07, emissiveIntensity: 0.25 })
  );
  ring.position.set(0, 0.12, -25);
  ring.rotation.x = Math.PI / 2;
  secondLevelGroup.add(ring);

  addSign("NIVEL 2", 0, 2.7, -20.1, 0xd89a27, 2);
  scene.add(secondLevelGroup);
}

function buildThirdLevel() {
  thirdLevelGroup = new THREE.Group();
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.25, 18),
    new THREE.MeshStandardMaterial({ color: 0xd2d0c5, roughness: 0.78 })
  );
  floor.receiveShadow = true;
  floor.position.set(0, -0.14, -43.5);
  thirdLevelGroup.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x3d3338, roughness: 0.78 });
  [
    [0, 1.5, -52.5, 30, 3.2, 0.35],
    [-15, 1.5, -43.5, 0.35, 3.2, 18],
    [15, 1.5, -43.5, 0.35, 3.2, 18]
  ].forEach(([x, y, z, w, h, d]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    wall.position.set(x, y, z);
    thirdLevelGroup.add(wall);
  });

  const clueRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.08, 12, 72),
    new THREE.MeshStandardMaterial({ color: 0x8d5bd1, emissive: 0x3d1c66, emissiveIntensity: 0.22 })
  );
  clueRing.position.set(0, 0.12, -45);
  clueRing.rotation.x = Math.PI / 2;
  thirdLevelGroup.add(clueRing);

  addSign("SALA 3", 0, 2.7, -35.5, 0x8d5bd1, 3);
  addSign("PISTAS NO PAINEL", 0, 1.0, -45, 0x17202b, 3);
  scene.add(thirdLevelGroup);
}

function addWall(x, z, w, d, color) {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(w, 3.2, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
  );
  wall.position.set(x, 1.5, z);
  wall.receiveShadow = true;
  wall.castShadow = true;
  scene.add(wall);
}

function addDecorStore(x, z, label, color) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 1.0), new THREE.MeshStandardMaterial({ color: 0xf7fafc, roughness: 0.6 }));
  body.position.y = 1.1;
  const awning = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.3, 1.15), new THREE.MeshStandardMaterial({ color, roughness: 0.45 }));
  awning.position.y = 2.25;
  group.add(body, awning);
  group.position.set(x, 0, z);
  scene.add(group);
  addSign(label, x, 2.48, z + 0.58, color);
}

function addChallengeStation(challenge) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: challenge.hidden ? 0x2b2f35 : challenge.color,
    roughness: 0.42,
    emissive: challenge.color,
    emissiveIntensity: challenge.hidden ? 0.05 : 0.12
  });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(challenge.hidden ? 0.52 : 0.7, challenge.hidden ? 0.64 : 0.82, 0.35, 24), mat);
  base.position.y = 0.18;
  const topGeometry = challenge.hidden ? new THREE.DodecahedronGeometry(0.58) : new THREE.BoxGeometry(1.15, 1.5, 0.22);
  const top = new THREE.Mesh(topGeometry, mat);
  top.position.y = challenge.hidden ? 1.05 : 1.1;
  const glow = new THREE.Mesh(new THREE.SphereGeometry(challenge.hidden ? 0.16 : 0.24, 18, 18), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: challenge.color, emissiveIntensity: challenge.hidden ? 0.45 : 0.9 }));
  glow.position.y = challenge.hidden ? 1.76 : 2.02;
  group.add(base, top, glow);
  group.position.set(challenge.position[0], 0, challenge.position[2]);
  group.userData.challengeId = challenge.id;
  group.userData.phase = challenge.phase;
  group.userData.hidden = Boolean(challenge.hidden);
  mallObjects.push(group);
  scene.add(group);
  if (!challenge.hidden) addSign(challenge.area, challenge.position[0], 2.45, challenge.position[2], challenge.color, challenge.phase);
}

function addSign(text, x, y, z, color, phase = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  ctx.fillRect(0, 0, canvas.width, 18);
  ctx.fillStyle = "#13202a";
  ctx.font = "bold 42px Segoe UI, Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 72);
  const texture = new THREE.CanvasTexture(canvas);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.58), new THREE.MeshBasicMaterial({ map: texture }));
  sign.position.set(x, y, z);
  sign.rotation.x = -0.08;
  sign.userData.phase = phase;
  if (phase) phaseSigns.push(sign);
  scene.add(sign);
  return sign;
}

function createAvatar(color, label) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: 0.45 });
  const headMat = new THREE.MeshStandardMaterial({ color: 0xf1c9a5, roughness: 0.55 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.72, 8, 18), bodyMat);
  body.position.y = 0.76;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 18), headMat);
  head.position.y = 1.42;
  const pointer = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 16), bodyMat);
  pointer.rotation.x = Math.PI / 2;
  pointer.position.set(0, 1.0, -0.34);
  group.add(body, head, pointer);
  group.userData.label = label;
  return group;
}

function updateRemoteAvatars() {
  if (!scene) return;
  const liveIds = new Set();
  remotePlayers.forEach((player) => {
    if (player.id === playerId) return;
    liveIds.add(player.id);
    if (!remoteAvatarMeshes.has(player.id)) {
      const mesh = createAvatar(player.color, player.name);
      remoteAvatarMeshes.set(player.id, mesh);
      scene.add(mesh);
    }
    const mesh = remoteAvatarMeshes.get(player.id);
    mesh.position.set(player.x || 0, 0, player.z || 0);
    mesh.rotation.y = player.rot || 0;
  });
  remoteAvatarMeshes.forEach((mesh, id) => {
    if (!liveIds.has(id)) {
      scene.remove(mesh);
      remoteAvatarMeshes.delete(id);
    }
  });
}

function moveLocal() {
  let dx = 0;
  let dz = 0;
  if (keys.has("w") || keys.has("arrowup")) dz -= local.speed;
  if (keys.has("s") || keys.has("arrowdown")) dz += local.speed;
  if (keys.has("a") || keys.has("arrowleft")) dx -= local.speed;
  if (keys.has("d") || keys.has("arrowright")) dx += local.speed;
  if (!dx && !dz) return;
  const phase = Number(groupState?.phase || 1);
  const minZ = phase >= 3 ? -51.4 : phase === 2 ? -31.4 : -8.7;
  local.x = clamp(local.x + dx, -13.4, 13.4);
  local.z = clamp(local.z + dz, minZ, 8.7);
  local.rot = Math.atan2(dx, dz);
  avatar.position.set(local.x, 0, local.z);
  avatar.rotation.y = local.rot;
}

function nearestChallenge() {
  let nearest = null;
  let best = Infinity;
  const phase = Number(groupState?.phase || 1);
  for (const challenge of challenges) {
    if (challenge.phase !== phase) continue;
    const distance = Math.hypot(local.x - challenge.position[0], local.z - challenge.position[2]);
    if (distance < best) {
      best = distance;
      nearest = challenge;
    }
  }
  return best < 2.2 ? nearest : null;
}

function interact() {
  if (!groupState) return showToast("Entre no jogo primeiro.");
  if (groupState.failed) return showToast("O tempo acabou. Recomecem do zero para liberar a sala.");
  const challenge = nearestChallenge();
  if (!challenge) {
    if (local.z < -8.0 && local.z > -12.0 && Math.abs(local.x) < 2.2) {
      if (Number(groupState.phase || 1) >= 2) return showToast("Voce ja passou da primeira porta. Continue avancando.");
      if (Number(groupState.phase1Score || 0) >= PHASE_GOAL) {
        local.x = 0;
        local.z = -20.5;
        avatar.position.set(local.x, 0, local.z);
        syncPresence(true);
        return showToast("Porta aberta. Bem-vindos ao nivel 2.");
      }
      return showToast("A porta exige 7 pontos na primeira fase.");
    }
    if (local.z < -30.4 && local.z > -34.0 && Math.abs(local.x) < 2.6) {
      if (groupState.escaped) return showToast("Portal final aberto. Vitoria concluida!");
      if (Number(groupState.phase || 1) === 2 && Number(groupState.phase1Score || 0) + Number(groupState.phase2Score || 0) >= PHASE_GOAL * 2) {
        local.x = 0;
        local.z = -38.4;
        avatar.position.set(local.x, 0, local.z);
        syncPresence(true);
        return showToast("Sala 3 liberada. Use as pistas do painel para achar as perguntas.");
      }
      if (Number(groupState.phase || 1) >= 3) return showToast("Voce ja esta na sala final. Procure as perguntas escondidas.");
      return showToast("A porta da Sala 3 exige 14 pontos.");
    }
    if (local.z < -51.0 && Math.abs(local.x) < 2.6) {
      return showToast(groupState.escaped ? "Vitoria! A equipe conquistou os 21 pontos." : "O portal final exige 21 pontos.");
    }
    return showToast(Number(groupState.phase || 1) === 3 ? "Decifre uma pista e aproxime-se do ponto escondido." : "Aproxime-se de um totem luminoso para responder.");
  }
  openChallenge(challenge);
}

function openChallenge(challenge) {
  const answered = groupState.answers?.[challenge.id];
  els.challengeLevel.textContent = `${challenge.level} | ${challenge.area} | ${challenge.points} pts`;
  els.challengeTitle.textContent = challenge.title;
  els.challengePrompt.textContent = answered?.correct ? "Este desafio ja foi resolvido pela equipe." : challenge.prompt;
  els.challengeOptions.innerHTML = "";
  if (challenge.type === "text") {
    const label = document.createElement("label");
    label.className = "answer-label";
    label.textContent = `Resposta (${challenge.answerHint || "texto curto"})`;
    const input = document.createElement("input");
    input.className = "answer-input";
    input.maxLength = 42;
    input.placeholder = "Digite a resposta";
    input.disabled = Boolean(answered);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answered ? "Respondido" : "Enviar resposta";
    button.disabled = Boolean(answered);
    button.addEventListener("click", () => answerChallenge(challenge, input.value));
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        answerChallenge(challenge, input.value);
      }
    });
    label.appendChild(input);
    els.challengeOptions.append(label, button);
  } else {
    challenge.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option;
      button.disabled = Boolean(answered);
      button.addEventListener("click", () => answerChallenge(challenge, option));
      els.challengeOptions.appendChild(button);
    });
  }
  els.dialog.showModal();
}

async function answerChallenge(challenge, answer) {
  const submitted = String(answer || "").trim();
  if (!submitted) return showToast("Digite ou selecione uma resposta.");
  const data = await api("/api/answer", {
    method: "POST",
    body: JSON.stringify({ playerId, challengeId: challenge.id, answer: submitted })
  });
  const result = data.group.answers?.[challenge.id];
  applyState(data);
  els.dialog.close();
  showToast(result?.correct ? `Correto. +${challenge.points} pontos para o grupo.` : "Resposta incorreta. O desafio ficou sem pontos nesta rodada.");
}

async function syncPresence(force = false) {
  if (!playerId) return;
  const now = performance.now();
  if (!force && now - lastPresence < 850) return;
  lastPresence = now;
  try {
    const data = await api("/api/presence", {
      method: "POST",
      body: JSON.stringify({ playerId, x: local.x, z: local.z, rot: local.rot })
    });
    applyState(data);
  } catch (error) {
    showToast(error.message);
    playerId = "";
    sessionStorage.removeItem("sv-player-id");
    els.joinScreen.classList.remove("hidden");
  }
}

function animate() {
  requestAnimationFrame(animate);
  moveLocal();
  syncPresence();
  updateCamera();
  pulseStations();
  animateFireworks();
  renderer.render(scene, camera);
}

function pulseStations() {
  const time = performance.now() * 0.003;
  mallObjects.forEach((object, index) => {
    const baseY = object.userData.hidden ? 1.76 : 2.02;
    object.children[2].position.y = baseY + Math.sin(time + index) * 0.08;
    const solved = groupState?.answers?.[object.userData.challengeId]?.correct;
    object.children[2].visible = !solved || Math.sin(time * 3) > 0;
  });
}

function startVictory() {
  showToast("Vitoria! 21 pontos conquistados. Fogos liberados!");
  startVictoryMusic();
  createFireworks();
}

function createFireworks() {
  if (!THREE || fireworks.length) return;
  const colors = [0xffd166, 0x06d6a0, 0x4cc9f0, 0xef476f, 0xffffff];
  for (let burst = 0; burst < 5; burst += 1) {
    const origin = new THREE.Vector3(-7 + burst * 3.5, 4 + Math.random() * 1.5, -43 - Math.random() * 7);
    for (let i = 0; i < 28; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 8),
        new THREE.MeshBasicMaterial({ color: colors[(i + burst) % colors.length] })
      );
      mesh.position.copy(origin);
      const angle = (Math.PI * 2 * i) / 28;
      const speed = 0.025 + Math.random() * 0.055;
      mesh.userData.velocity = new THREE.Vector3(Math.cos(angle) * speed, (Math.random() - 0.1) * speed, Math.sin(angle) * speed);
      mesh.userData.life = 170;
      fireworks.push(mesh);
      scene.add(mesh);
    }
  }
}

function animateFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i -= 1) {
    const mesh = fireworks[i];
    mesh.position.add(mesh.userData.velocity);
    mesh.userData.velocity.y -= 0.0007;
    mesh.userData.life -= 1;
    mesh.material.opacity = Math.max(0, mesh.userData.life / 170);
    mesh.material.transparent = true;
    if (mesh.userData.life <= 0) {
      scene.remove(mesh);
      fireworks.splice(i, 1);
    }
  }
  if (groupState?.escaped && fireworks.length === 0) createFireworks();
}

function updateCamera() {
  const presets = [
    [local.x, 8.8, local.z + 9.5, local.x, 0.8, local.z - 1.8],
    [local.x + 7.2, 6.3, local.z + 7.2, local.x, 0.9, local.z],
    [0, 15.8, 10.4, local.x, 0, local.z]
  ];
  const p = presets[cameraMode % presets.length];
  camera.position.lerp(new THREE.Vector3(p[0], p[1], p[2]), 0.08);
  camera.lookAt(p[3], p[4], p[5]);
}

function resize() {
  const rect = els.sceneHost.getBoundingClientRect();
  renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
  camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
  camera.updateProjectionMatrix();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toggleMusic() {
  musicOn = !musicOn;
  els.musicBtn.textContent = musicOn ? "Pausar" : "Musica";
  if (musicOn) startMusic();
  else stopMusic();
}

function startMusic() {
  audioCtx ||= new AudioContext();
  stopMusic();
  const master = audioCtx.createGain();
  master.gain.value = 0.12;
  master.connect(audioCtx.destination);
  musicNodes.push(master);

  const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 783.99];
  const bass = [130.81, 130.81, 174.61, 196];
  let step = 0;

  const playTone = (frequency, start, duration, type, volume) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  };

  const playBeat = () => {
    const now = audioCtx.currentTime;
    playTone(melody[step % melody.length], now, 0.16, "triangle", 0.18);
    if (step % 2 === 0) playTone(bass[Math.floor(step / 2) % bass.length], now, 0.2, "sine", 0.2);
    if (step % 4 === 2) playTone(1046.5, now, 0.045, "square", 0.05);
    step += 1;
  };

  playBeat();
  musicTimers.push(window.setInterval(playBeat, 230));
}

function startVictoryMusic() {
  audioCtx ||= new AudioContext();
  stopMusic();
  els.musicBtn.textContent = "Vitoria";
  musicOn = true;
  const master = audioCtx.createGain();
  master.gain.value = 0.16;
  master.connect(audioCtx.destination);
  musicNodes.push(master);

  const fanfare = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.51];
  fanfare.forEach((frequency, index) => {
    const start = audioCtx.currentTime + index * 0.16;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.24, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.25);
  });

  const loop = () => {
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      const start = now + index * 0.11;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
      osc.connect(gain);
      gain.connect(master);
      osc.start(start);
      osc.stop(start + 0.18);
    });
  };
  loop();
  musicTimers.push(window.setInterval(loop, 900));
}

function stopMusic() {
  musicTimers.forEach((timer) => window.clearInterval(timer));
  musicTimers = [];
  musicNodes.forEach((node) => {
    if (node.stop) {
      try { node.stop(); } catch {}
    }
    if (node.disconnect) node.disconnect();
  });
  musicNodes = [];
}

async function resetGroup() {
  if (!playerId) return;
  const data = await api("/api/reset-group", { method: "POST", body: JSON.stringify({ playerId }) });
  applyState(data);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => keys.add(event.key.toLowerCase()));
window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
document.querySelectorAll("[data-move]").forEach((button) => {
  const map = { forward: "w", left: "a", back: "s", right: "d" };
  button.addEventListener("pointerdown", () => keys.add(map[button.dataset.move]));
  button.addEventListener("pointerup", () => keys.delete(map[button.dataset.move]));
  button.addEventListener("pointerleave", () => keys.delete(map[button.dataset.move]));
});

els.joinForm.addEventListener("submit", join);
els.interactBtn.addEventListener("click", interact);
els.resetGroupBtn.addEventListener("click", resetGroup);
els.musicBtn.addEventListener("click", toggleMusic);
els.cameraBtn.addEventListener("click", () => {
  cameraMode += 1;
});

setInterval(() => {
  if (groupState) renderHud([]);
}, 500);

async function boot() {
  if (location.protocol === "file:") {
    document.body.innerHTML = "<div class=\"join-screen\"><div class=\"join-panel\"><div class=\"brand-line\"><span class=\"brand-mark\">ER</span><div><strong>Abrindo servidor local</strong><small>O jogo multiusuario precisa rodar por localhost.</small></div></div><p>Redirecionando para http://localhost:3200...</p></div></div>";
    window.setTimeout(() => {
      window.location.href = "http://localhost:3200";
    }, 900);
    return;
  }
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js");
    initScene();
  } catch (error) {
    console.error(error);
    els.sceneHost.innerHTML = "<div class=\"scene-error\">Nao foi possivel carregar a biblioteca 3D. Verifique a conexao com a internet e recarregue a pagina.</div>";
    showToast("Biblioteca 3D indisponivel. A pagina carregou, mas a cena precisa de Three.js.");
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("demo") === "1") {
    els.playerName.value = params.get("name") || "Aluno Demo";
    els.groupId.value = params.get("group") || "Grupo Demo";
    els.avatarColor.value = params.get("color") || "#26b7a0";
    await join(new Event("submit"));
  }
}

boot();
