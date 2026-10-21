/* =========================
   VIDA FIBRO 3.0 — LÓGICA UNIFICADA (app.js)
   Integra Hoje + Casa (3 níveis e etapas) + Exercícios + Cardápio + Estoque + Monitor de Remédios
========================= */

const APP_STORAGE_KEY = "VIDA_FIBRO_V3_STATE";

// Utilitários de data e texto
function isoToday() {
  const d = new Date();
  const tzOff = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOff).toISOString().slice(0, 10);
}

function parseISODate(iso) {
  if (!iso || typeof iso !== "string") return new Date();
  const [y, m, d] = iso.split("-").map(n => parseInt(n, 10));
  return new Date(y, (m || 1) - 1, d || 1);
}

function diffDays(aISO, bISO) {
  const a = parseISODate(aISO);
  const b = parseISODate(bISO);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function getLastThursdayISO() {
  const d = new Date();
  const dayOfWeek = d.getDay(); // 0=Dom, 4=Qui
  const diff = (dayOfWeek >= 4) ? (dayOfWeek - 4) : (dayOfWeek + 3);
  d.setDate(d.getDate() - diff);
  const tzOff = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOff).toISOString().slice(0, 10);
}

function getWeekdayShort(cycleDay) {
  const labels = ["5ª", "6ª", "Sáb", "Dom", "2ª", "3ª", "4ª"];
  return labels[(cycleDay - 1) % 7];
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function blankMenuDay() {
  const d = {};
  SLOT_DEFS.forEach(s => d[s.key] = []);
  return d;
}

// Calcula automaticamente em qual dia do ciclo (1 a 14) estamos hoje a partir da quinta-feira âncora
function computeAutoCycleDay(anchorThursdayISO) {
  const anchor = anchorThursdayISO || getLastThursdayISO();
  const daysElapsed = diffDays(anchor, isoToday());
  const mod = ((daysElapsed % 14) + 14) % 14;
  return mod + 1; // 1 a 14
}

// Inicialização e Migração de Estado
function createDefaultState() {
  const todayISO = isoToday();
  const anchorISO = getLastThursdayISO();
  const inv = deepClone(SEED_INVENTORY);

  // Marca a data base de referência nos remédios monitorados
  (inv.remedios || []).forEach(med => {
    if (med.tracked) {
      med.lastRefDate = todayISO;
      med.baseQty = med.qty;
    }
  });

  const energyLog = {};
  for (let d = 1; d <= 14; d++) energyLog[d] = "alta";

  return {
    version: 3,
    anchorThursday: anchorISO,
    selectedDay: computeAutoCycleDay(anchorISO),
    energyLog, // registro de energia por dia (sem esconder tarefas!)
    exViewCtx: "casa",     // filtro visual na aba Exercícios ("casa" | "viagem")
    exViewEnergy: "alta",  // filtro visual na aba Exercícios ("alta" | "baixa")
    casaLevelFilter: "all",
    domesticTasksByDay: deepClone(SEED_DOMESTIC_14),
    domesticDoneSteps: {}, // { "d1_1": { "0": true, "1": false }, ... }
    domesticDoneTasks: {}, // { "d1_1": true }
    flexList: [],
    exercisesByDay: deepClone(SEED_EXERCISES_14),
    exDone: {}, // { "1__d1_1": true }
    recipes: deepClone(SEED_RECIPES),
    menuPlan14: Array.from({ length: 14 }, blankMenuDay),
    inventory: inv,
    cycleHistory: []
  };
}

let state = loadAppState();

function loadAppState() {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    const def = createDefaultState();
    const merged = Object.assign(def, parsed);

    // Garante todas as 7 categorias do estoque
    INVENTORY_ENVS.forEach(env => {
      if (!Array.isArray(merged.inventory?.[env.id])) {
        merged.inventory[env.id] = deepClone(SEED_INVENTORY[env.id] || []);
      }
    });

    // Atualiza o dia selecionado para o dia real do ciclo ao abrir hoje
    if (merged.anchorThursday) {
      merged.selectedDay = computeAutoCycleDay(merged.anchorThursday);
    }

    return merged;
  } catch (e) {
    console.warn("Usando estado inicial:", e);
    return createDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Erro ao salvar estado:", e);
  }
}

/* =========================
   CÁLCULO INTELIGENTE DE REMÉDIOS
   Desconta automaticamente conforme os dias passados desde a última conferência/reposição
========================= */
function getMedLiveInfo(med) {
  if (!med.tracked) {
    return {
      currentQty: med.qty || 0,
      daysLeft: null,
      status: med.status || "ok",
      dailyRate: 0
    };
  }

  const today = isoToday();
  const refDate = med.lastRefDate || today;
  const baseQty = (typeof med.baseQty === "number") ? med.baseQty : (med.qty || 0);
  const elapsedDays = Math.max(0, diffDays(refDate, today));

  const dose = parseFloat(med.dose) || 1;
  const dailyRate = (med.period === "semana") ? (dose / 7) : dose;
  const consumed = elapsedDays * dailyRate;
  const rawRemaining = Math.max(0, baseQty - consumed);
  // Arredonda para 1 casa se semanal ou inteiro se diário
  const currentQty = (med.period === "semana")
    ? Math.floor(baseQty - Math.floor(elapsedDays / 7) * dose)
    : Math.max(0, Math.round((baseQty - consumed) * 10) / 10);

  const daysLeft = dailyRate > 0 ? Math.floor(currentQty / dailyRate) : 999;
  const alertLimit = med.alertDays || 7;

  let status = "ok";
  if (currentQty <= 0 || daysLeft <= 2) {
    status = "out";
  } else if (daysLeft <= alertLimit) {
    status = "low";
  }

  // Sincroniza status automático com a lista de compras
  med.status = status;
  med.qty = Math.max(0, currentQty);

  return {
    currentQty: Math.max(0, currentQty),
    daysLeft: Math.max(0, daysLeft),
    status,
    dailyRate,
    alertLimit
  };
}

function refreshAllMedsStatus() {
  const meds = state.inventory?.remedios || [];
  let alerts = [];
  meds.forEach(med => {
    const info = getMedLiveInfo(med);
    if (med.tracked && (info.status === "low" || info.status === "out")) {
      alerts.push({ med, info });
    }
  });
  return alerts;
}

function setMedNewQty(medId, newQty) {
  const meds = state.inventory?.remedios || [];
  const med = meds.find(m => m.id === medId);
  if (!med) return;
  med.qty = Math.max(0, newQty);
  med.baseQty = med.qty;
  med.lastRefDate = isoToday();
  getMedLiveInfo(med);
  saveState();
  renderAll();
}

/* =========================
   NAVEGAÇÃO GLOBAL E CABEÇALHO
========================= */
let currentMainView = "hoje";
let currentInvEnv = "despensa";
let currentShopFilter = "all";

function switchMainView(viewName) {
  currentMainView = viewName;
  document.querySelectorAll(".main-view").forEach(el => {
    el.classList.toggle("active", el.id === `view-${viewName}`);
  });
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-nav") === viewName);
  });

  // Atualiza título no topo
  const viewTitles = {
    hoje: "Rotina 3.0",
    casa: "🏡 Casa (14d)",
    exercicios: "🧘‍♀️ Exercícios",
    cardapio: "🍽️ Cardápio",
    estoque: "📦 Estoque"
  };
  const topTitleEl = document.getElementById("topViewTitle");
  if (topTitleEl) topTitleEl.textContent = viewTitles[viewName] || "Rotina 3.0";

  // A barra de dia do ciclo aparece em Hoje, Casa, Exercícios e Cardápio
  const cycleBar = document.getElementById("sharedCycleBar");
  if (cycleBar) {
    cycleBar.style.display = (viewName === "estoque") ? "none" : "flex";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAll();
}

function renderTopHeaderAndCycleBar() {
  const d = state.selectedDay || 1;
  const wk = getWeekdayShort(d);
  const autoToday = computeAutoCycleDay(state.anchorThursday);

  const topBadge = document.getElementById("topCycleBadge");
  if (topBadge) {
    topBadge.textContent = `D${d} (${wk})`;
  }

  const sel = document.getElementById("globalDaySelect");
  if (sel) {
    sel.innerHTML = "";
    for (let i = 1; i <= 14; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      const isTodayTag = (i === autoToday) ? " ⭐ HOJE" : "";
      const diaristaTag = (i === 1) ? " • Diarista" : (i === 14 ? " • Véspera" : "");
      opt.textContent = `Dia ${i} (${getWeekdayShort(i)}) • ${i <= 7 ? "Sem 1" : "Sem 2"}${diaristaTag}${isTodayTag}`;
      sel.appendChild(opt);
    }
    sel.value = String(d);
  }

  const curEnergy = state.energyLog?.[d] || "alta";
  const btnAlta = document.getElementById("btnEnergyAlta");
  const btnBaixa = document.getElementById("btnEnergyBaixa");
  if (btnAlta && btnBaixa) {
    btnAlta.className = `btn btn-sm ${curEnergy === "alta" ? "primary" : ""}`;
    btnBaixa.className = `btn btn-sm ${curEnergy === "baixa" ? "primary" : ""}`;
  }

  // Badge de alerta na barra inferior
  const medAlerts = refreshAllMedsStatus();
  const navAlert = document.getElementById("navAlertBadge");
  if (navAlert) {
    if (medAlerts.length > 0) {
      navAlert.style.display = "inline-block";
      navAlert.textContent = String(medAlerts.length);
    } else {
      navAlert.style.display = "none";
    }
  }
}

/* =========================
   ABA 1: ☀️ VISÃO DE HOJE
========================= */
function renderTodayView() {
  const day = state.selectedDay || 1;
  const medAlerts = refreshAllMedsStatus();

  // 1. Alertas de remédios acabando
  const alertsEl = document.getElementById("todayMedAlerts");
  if (alertsEl) {
    if (!medAlerts.length) {
      alertsEl.innerHTML = "";
    } else {
      alertsEl.innerHTML = medAlerts.map(({ med, info }) => {
        const urgent = info.daysLeft <= 2 || info.currentQty <= 0;
        return `
          <div class="med-alert-banner ${urgent ? "urgent" : ""}">
            <div>
              <strong>${urgent ? "🔴 Urgente:" : "⚠️ Atenção Farmácia:"} ${escapeHtml(med.name)}</strong>
              <div class="muted" style="color:#1f2937;">
                Restam <b>${info.currentQty} ${escapeHtml(med.unit || "comp")}</b> (dá para ~<b>${info.daysLeft} dia(s)</b> na dose de ${med.dose}/${med.period}). Já incluído na Lista de Compras!
              </div>
            </div>
            <button type="button" class="btn btn-sm primary" data-quick-repor="${escapeHtml(med.id)}">
              + Repor Caixa
            </button>
          </div>
        `;
      }).join("");

      alertsEl.querySelectorAll("[data-quick-repor]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-quick-repor");
          const med = (state.inventory.remedios || []).find(m => m.id === id);
          if (!med) return;
          const addBox = (med.boxSizes && med.boxSizes[0]) ? med.boxSizes[0] : 30;
          const info = getMedLiveInfo(med);
          setMedNewQty(id, info.currentQty + addBox);
        });
      });
    }
  }

  // 2. Tarefas de Hoje (Resumo rápido)
  const dayObj = state.domesticTasksByDay?.[day] || { title: `Dia ${day}`, tasks: [] };
  const subEl = document.getElementById("todayDomesticSubtitle");
  if (subEl) subEl.textContent = dayObj.title || `Dia ${day} (${getWeekdayShort(day)})`;

  const domSummaryEl = document.getElementById("todayDomesticSummary");
  if (domSummaryEl) {
    const tasks = dayObj.tasks || [];
    const indisp = tasks.filter(t => t.nivel === "indispensavel");
    const desej = tasks.filter(t => t.nivel === "desejavel");
    const podeEsp = tasks.filter(t => t.nivel === "pode_esperar");

    const countDone = (arr) => arr.filter(t => isTaskFullyDone(t)).length;

    let html = `
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
        <span class="badge primary">🚨 Indispensáveis: ${countDone(indisp)}/${indisp.length}</span>
        <span class="badge">✨ Desejáveis: ${countDone(desej)}/${desej.length}</span>
        <span class="badge">⏳ Pode esperar: ${countDone(podeEsp)}/${podeEsp.length}</span>
      </div>
    `;

    // Lista as indispensáveis direto aqui com suas micro-etapas para facilitar
    html += indisp.map(t => renderTaskCardHTML(day, t, true)).join("");
    if (desej.length) {
      html += `<div class="group-heading">✨ Desejáveis de Hoje (${countDone(desej)}/${desej.length})</div>`;
      html += desej.map(t => renderTaskCardHTML(day, t, true)).join("");
    }

    domSummaryEl.innerHTML = html;
    wireTaskCardEvents(domSummaryEl, day);
  }

  // 3. Exercícios de Hoje (Resumo rápido na energia selecionada)
  const exSumEl = document.getElementById("todayExerciseSummary");
  if (exSumEl) {
    const curEnergy = state.energyLog?.[day] || "alta";
    const exList = (state.exercisesByDay?.[day] || []).filter(
      ex => ex.contexto === "casa" && ex.energia === curEnergy
    );

    if (!exList.length) {
      exSumEl.innerHTML = `<div class="muted">Nenhum exercício para esta combinação.</div>`;
    } else {
      exSumEl.innerHTML = `
        <div class="muted" style="margin-bottom:8px;">Mostrando série <b>${curEnergy === "alta" ? "🔋 Completa (Alta)" : "🪫 Leve (Baixa)"}</b> em Casa:</div>
        ${exList.map(ex => {
          const done = !!state.exDone?.[`${day}__${ex.id}`];
          return `
            <div class="task-card ${done ? "done-all" : ""}" style="padding:8px 10px;">
              <label class="task-main-check" style="cursor:pointer;">
                <input type="checkbox" data-today-ex="${escapeHtml(ex.id)}" ${done ? "checked" : ""} />
                <div>
                  <div class="task-name">${escapeHtml(ex.nome)}</div>
                  <div class="muted">${escapeHtml(ex.equipamento || "Sem equipamento")}</div>
                </div>
              </label>
            </div>
          `;
        }).join("")}
      `;
      exSumEl.querySelectorAll("[data-today-ex]").forEach(cb => {
        cb.addEventListener("change", () => {
          const exId = cb.getAttribute("data-today-ex");
          state.exDone[`${day}__${exId}`] = cb.checked;
          saveState();
          renderAll();
        });
      });
    }
  }

  // 4. Cardápio de Hoje
  const menuSumEl = document.getElementById("todayMenuSummary");
  if (menuSumEl) {
    const dayMenu = state.menuPlan14?.[day - 1] || blankMenuDay();
    const filledSlots = SLOT_DEFS.filter(s => (dayMenu[s.key] || []).length > 0);

    if (!filledSlots.length) {
      menuSumEl.innerHTML = `
        <div class="muted">Nenhuma refeição planejada para o Dia ${day} ainda.</div>
      `;
    } else {
      menuSumEl.innerHTML = filledSlots.map(s => {
        const names = (dayMenu[s.key] || []).map(rid => {
          const r = state.recipes.find(x => x.id === rid);
          return r ? escapeHtml(r.name) : "";
        }).filter(Boolean).join(" • ");
        return `
          <div style="padding:6px 0;border-bottom:1px dashed var(--border);font-size:0.86rem;">
            <strong>${s.emoji} ${s.label}:</strong> ${names}
          </div>
        `;
      }).join("");
    }
  }

  // 5. Prontos no Freezer (Salva-vidas)
  const frzEl = document.getElementById("todayFreezerSummary");
  if (frzEl) {
    const readyItems = (state.inventory?.freezer || []).filter(
      it => (it.group || "").includes("Comida Pronta")
    );
    frzEl.innerHTML = readyItems.map(it => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px dashed var(--border);font-size:0.86rem;">
        <span>${escapeHtml(it.name)}</span>
        <div class="qty-controls">
          <button type="button" class="qty-btn" data-frz-adj="${escapeHtml(it.id)}" data-delta="-1">−</button>
          <span style="min-width:48px;text-align:center;font-weight:700;">${it.qty || 0} ${escapeHtml(it.unit || "UN")}</span>
          <button type="button" class="qty-btn" data-frz-adj="${escapeHtml(it.id)}" data-delta="1">+</button>
        </div>
      </div>
    `).join("");

    frzEl.querySelectorAll("[data-frz-adj]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-frz-adj");
        const delta = parseInt(btn.getAttribute("data-delta"), 10);
        const item = (state.inventory.freezer || []).find(x => x.id === id);
        if (!item) return;
        item.qty = Math.max(0, (item.qty || 0) + delta);
        saveState();
        renderAll();
      });
    });
  }
}

/* =========================
   ABA 2: 🏡 CASA (3 NÍVEIS + MICRO-ETAPAS + ESFORÇO)
========================= */
function isTaskFullyDone(task) {
  const steps = task.steps || [];
  if (!steps.length) {
    return !!state.domesticDoneTasks?.[task.id];
  }
  const map = state.domesticDoneSteps?.[task.id] || {};
  return steps.every((_, idx) => !!map[idx]);
}

function getTaskProgress(task) {
  const steps = task.steps || [];
  if (!steps.length) {
    const d = !!state.domesticDoneTasks?.[task.id];
    return { doneCount: d ? 1 : 0, total: 1 };
  }
  const map = state.domesticDoneSteps?.[task.id] || {};
  let c = 0;
  steps.forEach((_, idx) => { if (map[idx]) c++; });
  return { doneCount: c, total: steps.length };
}

function toggleTaskAllSteps(task, checked) {
  const steps = task.steps || [];
  state.domesticDoneTasks[task.id] = checked;
  if (steps.length) {
    if (!state.domesticDoneSteps[task.id]) state.domesticDoneSteps[task.id] = {};
    steps.forEach((_, idx) => {
      state.domesticDoneSteps[task.id][idx] = checked;
    });
  }
  saveState();
  renderAll();
}

function toggleSingleStep(task, stepIdx, checked) {
  if (!state.domesticDoneSteps[task.id]) state.domesticDoneSteps[task.id] = {};
  state.domesticDoneSteps[task.id][stepIdx] = checked;
  const steps = task.steps || [];
  state.domesticDoneTasks[task.id] = steps.every((_, i) => !!state.domesticDoneSteps[task.id][i]);
  saveState();
  renderAll();
}

function renderTaskCardHTML(day, task, compact = false) {
  const fullyDone = isTaskFullyDone(task);
  const prog = getTaskProgress(task);
  const steps = task.steps || [];

  const esforcoLabel = task.esforco === "pesado" ? "🔴 Pesado"
                     : task.esforco === "medio" ? "🟡 Médio"
                     : "🟢 Leve";
  const esforcoClass = `esforco-${task.esforco || "leve"}`;

  const stepsHTML = steps.length ? `
    <div class="task-steps">
      ${steps.map((st, idx) => {
        const stDone = !!(state.domesticDoneSteps?.[task.id]?.[idx] || state.domesticDoneTasks?.[task.id]);
        return `
          <label class="step-row ${stDone ? "step-done" : ""}">
            <input type="checkbox" data-step-task="${escapeHtml(task.id)}" data-step-idx="${idx}" ${stDone ? "checked" : ""} />
            <span>${escapeHtml(st)}</span>
          </label>
        `;
      }).join("")}
    </div>
  ` : "";

  return `
    <div class="task-card ${fullyDone ? "done-all" : ""}">
      <div class="task-top">
        <div class="task-main-check">
          <input type="checkbox" data-main-task="${escapeHtml(task.id)}" ${fullyDone ? "checked" : ""} />
          <div>
            <div class="task-name">${escapeHtml(task.nome)}</div>
            <div class="task-meta-row">
              <span class="badge ${esforcoClass}">${esforcoLabel}</span>
              ${steps.length > 1 ? `<span class="badge">${prog.doneCount}/${prog.total} etapas</span>` : ""}
            </div>
          </div>
        </div>
        ${!compact ? `
          <div style="display:flex;gap:2px;">
            <button type="button" class="icon-btn" title="Reagendar tarefa (ou etapas restantes)" data-reag-task="${escapeHtml(task.id)}">↺</button>
            <button type="button" class="icon-btn" title="Editar tarefa e etapas" data-edit-task="${escapeHtml(task.id)}">✏️</button>
          </div>
        ` : ""}
      </div>
      ${stepsHTML}
    </div>
  `;
}

function wireTaskCardEvents(container, day) {
  const dayTasks = state.domesticTasksByDay?.[day]?.tasks || [];

  container.querySelectorAll("[data-main-task]").forEach(cb => {
    cb.addEventListener("change", () => {
      const tid = cb.getAttribute("data-main-task");
      const task = dayTasks.find(t => t.id === tid);
      if (task) toggleTaskAllSteps(task, cb.checked);
    });
  });

  container.querySelectorAll("[data-step-task]").forEach(cb => {
    cb.addEventListener("change", () => {
      const tid = cb.getAttribute("data-step-task");
      const idx = parseInt(cb.getAttribute("data-step-idx"), 10);
      const task = dayTasks.find(t => t.id === tid);
      if (task) toggleSingleStep(task, idx, cb.checked);
    });
  });

  container.querySelectorAll("[data-reag-task]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tid = btn.getAttribute("data-reag-task");
      const task = dayTasks.find(t => t.id === tid);
      if (!task) return;
      // Pega apenas as etapas que ainda não foram feitas!
      const remainingSteps = (task.steps || []).filter((_, idx) => !(state.domesticDoneSteps?.[task.id]?.[idx]));
      state.flexList.push({
        id: `flex_${Date.now()}`,
        fromDay: day,
        originalId: task.id,
        nome: task.nome,
        esforco: task.esforco || "leve",
        steps: remainingSteps.length ? remainingSteps : (task.steps || [])
      });
      saveState();
      renderAll();
    });
  });

  container.querySelectorAll("[data-edit-task]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tid = btn.getAttribute("data-edit-task");
      openTaskModal(day, tid);
    });
  });
}

function renderCasaView() {
  const day = state.selectedDay || 1;
  const dayObj = state.domesticTasksByDay?.[day] || { title: `Dia ${day}`, tasks: [] };

  const titleEl = document.getElementById("casaDayTitle");
  if (titleEl) titleEl.textContent = `🏡 ${dayObj.title || `Dia ${day} (${getWeekdayShort(day)})`}`;

  const tiersContainer = document.getElementById("domesticTiersContainer");
  if (tiersContainer) {
    const tasks = dayObj.tasks || [];
    const tierDefs = [
      { key: "indispensavel", title: "🚨 Nível 1: Indispensável", sub: "Manutenção mínima essencial do dia" },
      { key: "desejavel", title: "✨ Nível 2: Desejável", sub: "Mantém o ritmo da quinzena (faça por etapas)" },
      { key: "pode_esperar", title: "⏳ Nível 3: Pode Esperar", sub: "Zero problema se ficar para depois" }
    ];

    const activeFilter = state.casaLevelFilter || "all";
    const visibleTiers = tierDefs.filter(td => activeFilter === "all" || activeFilter === td.key);

    tiersContainer.innerHTML = visibleTiers.map(td => {
      const list = tasks.filter(t => t.nivel === td.key);
      const doneCount = list.filter(t => isTaskFullyDone(t)).length;
      return `
        <div class="tier-block ${td.key}">
          <div class="tier-header">
            <div>
              <div class="tier-title">${td.title}</div>
              <div class="tier-sub">${td.sub}</div>
            </div>
            <span class="badge">${doneCount}/${list.length} concluídas</span>
          </div>
          ${list.length
            ? list.map(t => renderTaskCardHTML(day, t, false)).join("")
            : `<div class="muted" style="padding:6px 2px;">Nenhuma tarefa neste nível hoje.</div>`
          }
        </div>
      `;
    }).join("");

    wireTaskCardEvents(tiersContainer, day);
  }

  // Render Flex (Reagendadas)
  const flexBadge = document.getElementById("flexCountBadge");
  const flexBox = document.getElementById("flexListContainer");
  if (flexBadge) flexBadge.textContent = String((state.flexList || []).length);
  if (flexBox) {
    if (!state.flexList?.length) {
      flexBox.innerHTML = `<div class="muted">Nenhuma tarefa reagendada no momento.</div>`;
    } else {
      flexBox.innerHTML = state.flexList.map((f, idx) => `
        <div class="task-card" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <label class="task-main-check" style="cursor:pointer;">
            <input type="checkbox" data-flex-done="${idx}" />
            <div>
              <div class="task-name">${escapeHtml(f.nome)} <span class="muted">(do Dia ${f.fromDay})</span></div>
              ${f.steps?.length ? `<div class="muted">${escapeHtml(f.steps.join(" • "))}</div>` : ""}
            </div>
          </label>
          <button type="button" class="icon-btn" data-flex-del="${idx}" title="Remover">🗑️</button>
        </div>
      `).join("");

      flexBox.querySelectorAll("[data-flex-done]").forEach(cb => {
        cb.addEventListener("change", () => {
          const idx = parseInt(cb.getAttribute("data-flex-done"), 10);
          const item = state.flexList[idx];
          if (item && item.fromDay && item.originalId) {
            const origTasks = state.domesticTasksByDay?.[item.fromDay]?.tasks || [];
            const orig = origTasks.find(t => t.id === item.originalId);
            if (orig) toggleTaskAllSteps(orig, true);
          }
          state.flexList.splice(idx, 1);
          saveState();
          renderAll();
        });
      });

      flexBox.querySelectorAll("[data-flex-del]").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-flex-del"), 10);
          state.flexList.splice(idx, 1);
          saveState();
          renderAll();
        });
      });
    }
  }

  // Estatísticas da Casa (14 dias)
  renderCasaCycleStats();
  renderCycleHistoryList();
}

function computeCasaCycleStats() {
  let counts = {
    indispensavel: { done: 0, total: 0 },
    desejavel: { done: 0, total: 0 },
    pode_esperar: { done: 0, total: 0 },
    stepsDone: 0,
    stepsTotal: 0
  };

  for (let d = 1; d <= 14; d++) {
    const tasks = state.domesticTasksByDay?.[d]?.tasks || [];
    tasks.forEach(t => {
      const nv = counts[t.nivel] ? t.nivel : "desejavel";
      counts[nv].total++;
      if (isTaskFullyDone(t)) counts[nv].done++;

      const prog = getTaskProgress(t);
      counts.stepsDone += prog.doneCount;
      counts.stepsTotal += prog.total;
    });
  }

  const pct = (a, b) => b ? Math.round((a / b) * 100) : 0;
  return {
    counts,
    pctSteps: pct(counts.stepsDone, counts.stepsTotal),
    pctInd: pct(counts.indispensavel.done, counts.indispensavel.total),
    pctDes: pct(counts.desejavel.done, counts.desejavel.total),
    pctEsp: pct(counts.pode_esperar.done, counts.pode_esperar.total)
  };
}

function renderCasaCycleStats() {
  const st = computeCasaCycleStats();
  const badge = document.getElementById("casaCyclePctBadge");
  if (badge) badge.textContent = `${st.pctSteps}% das etapas`;

  const box = document.getElementById("casaStatsBox");
  if (!box) return;

  box.innerHTML = `
    <div class="muted">Micro-etapas concluídas na quinzena: <b>${st.counts.stepsDone}/${st.counts.stepsTotal} (${st.pctSteps}%)</b></div>
    <div class="bar"><div class="bar-fill" style="width:${st.pctSteps}%"></div></div>

    <div class="muted" style="margin-top:10px;">🚨 Indispensáveis: <b>${st.counts.indispensavel.done}/${st.counts.indispensavel.total} (${st.pctInd}%)</b></div>
    <div class="bar"><div class="bar-fill" style="width:${st.pctInd}%"></div></div>

    <div class="muted" style="margin-top:10px;">✨ Desejáveis: <b>${st.counts.desejavel.done}/${st.counts.desejavel.total} (${st.pctDes}%)</b></div>
    <div class="bar"><div class="bar-fill" style="width:${st.pctDes}%"></div></div>

    <div class="muted" style="margin-top:10px;">⏳ Pode Esperar: <b>${st.counts.pode_esperar.done}/${st.counts.pode_esperar.total} (${st.pctEsp}%)</b></div>
    <div class="bar"><div class="bar-fill" style="width:${st.pctEsp}%"></div></div>
  `;
}

function renderCycleHistoryList() {
  const box = document.getElementById("cycleHistoryBox");
  if (!box) return;
  const hist = state.cycleHistory || [];
  if (!hist.length) {
    box.innerHTML = `<div class="muted">Nenhum ciclo arquivado ainda. Ao clicar em "Iniciar Nova Quinzena" na quinta-feira da diarista, o resumo fica salvo aqui!</div>`;
    return;
  }

  box.innerHTML = hist.slice().reverse().map((h, i) => `
    <div style="padding:8px 0;border-bottom:1px dashed var(--border);font-size:0.83rem;">
      <strong>Quinzena #${hist.length - i}</strong> <span class="muted">(${escapeHtml(h.dateLabel)})</span>
      <div class="muted">
        🚨 Indisp: ${h.pctInd}% • ✨ Desej: ${h.pctDes}% • 🧘‍♀️ Movimento: ${h.daysMove}/14 dias
      </div>
    </div>
  `).join("");
}

/* =========================
   ABA 3: 🧘‍♀️ EXERCÍCIOS
========================= */
function renderExercisesView() {
  const day = state.selectedDay || 1;
  const ctx = state.exViewCtx || "casa";
  const energy = state.exViewEnergy || "alta";

  document.querySelectorAll("[data-ex-ctx]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-ex-ctx") === ctx);
  });
  document.querySelectorAll("[data-ex-energy]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-ex-energy") === energy);
  });

  const listContainer = document.getElementById("exercisesListContainer");
  if (listContainer) {
    const allDay = state.exercisesByDay?.[day] || [];
    const filtered = allDay.filter(ex => ex.contexto === ctx && ex.energia === energy);

    if (!filtered.length) {
      listContainer.innerHTML = `<div class="muted">Sem exercícios cadastrados para este filtro. Clique em "➕ Novo Exercício" se quiser incluir.</div>`;
    } else {
      // Agrupa por equipamento
      const byEquip = {};
      filtered.forEach(ex => {
        const eq = (ex.equipamento || "Sem equipamento").trim();
        if (!byEquip[eq]) byEquip[eq] = [];
        byEquip[eq].push(ex);
      });

      const equipKeys = Object.keys(byEquip).sort((a, b) => {
        if (a.toLowerCase().includes("esteira")) return -1;
        if (b.toLowerCase().includes("esteira")) return 1;
        return a.localeCompare(b, "pt-BR");
      });

      listContainer.innerHTML = equipKeys.map(eq => `
        <div class="tier-block indispensavel" style="margin-bottom:10px;">
          <div class="tier-title" style="margin-bottom:8px;">🧩 ${escapeHtml(eq)}</div>
          ${byEquip[eq].map(ex => {
            const done = !!state.exDone?.[`${day}__${ex.id}`];
            return `
              <div class="task-card ${done ? "done-all" : ""}">
                <div class="task-top">
                  <label class="task-main-check" style="cursor:pointer;">
                    <input type="checkbox" data-ex-check="${escapeHtml(ex.id)}" ${done ? "checked" : ""} />
                    <div>
                      <div class="task-name">${escapeHtml(ex.nome)}</div>
                      ${ex.instrucao ? `<div class="muted" style="margin-top:4px;line-height:1.35;">${escapeHtml(ex.instrucao)}</div>` : ""}
                    </div>
                  </label>
                  <div style="display:flex;gap:2px;">
                    <button type="button" class="icon-btn" data-ex-edit="${escapeHtml(ex.id)}">✏️</button>
                    <button type="button" class="icon-btn" data-ex-del="${escapeHtml(ex.id)}">🗑️</button>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `).join("");

      listContainer.querySelectorAll("[data-ex-check]").forEach(cb => {
        cb.addEventListener("change", () => {
          const exId = cb.getAttribute("data-ex-check");
          state.exDone[`${day}__${exId}`] = cb.checked;
          saveState();
          renderAll();
        });
      });

      listContainer.querySelectorAll("[data-ex-edit]").forEach(btn => {
        btn.addEventListener("click", () => {
          openExerciseModal(day, btn.getAttribute("data-ex-edit"));
        });
      });

      listContainer.querySelectorAll("[data-ex-del]").forEach(btn => {
        btn.addEventListener("click", () => {
          const exId = btn.getAttribute("data-ex-del");
          if (!confirm("Excluir este exercício?")) return;
          state.exercisesByDay[day] = (state.exercisesByDay[day] || []).filter(x => x.id !== exId);
          delete state.exDone[`${day}__${exId}`];
          saveState();
          renderAll();
        });
      });
    }
  }

  // Estatísticas de Exercícios (14 dias)
  renderExerciseCycleStats();
}

function computeExerciseStats() {
  let daysWithMove = 0;
  let totalSessions = 0;
  let highEnergyDays = 0;
  let lowEnergyDays = 0;

  for (let d = 1; d <= 14; d++) {
    const list = state.exercisesByDay?.[d] || [];
    const doneInDay = list.filter(ex => !!state.exDone?.[`${d}__${ex.id}`]);
    if (doneInDay.length > 0) {
      daysWithMove++;
      totalSessions += doneInDay.length;
    }
    if ((state.energyLog?.[d] || "alta") === "baixa") lowEnergyDays++;
    else highEnergyDays++;
  }

  const pct = Math.round((daysWithMove / 14) * 100);
  return { daysWithMove, totalSessions, pct, highEnergyDays, lowEnergyDays };
}

function renderExerciseCycleStats() {
  const st = computeExerciseStats();
  const badge = document.getElementById("exStatsBadge");
  if (badge) badge.textContent = `${st.daysWithMove}/14 dias (${st.pct}%)`;

  const box = document.getElementById("exerciseStatsContainer");
  if (!box) return;

  box.innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
      <span class="badge primary">Dias com movimento: ${st.daysWithMove}/14 (${st.pct}%)</span>
      <span class="badge">Exercícios feitos: ${st.totalSessions}</span>
      <span class="badge">Monitor de energia: 🔋 ${st.highEnergyDays}d Alta • 🪫 ${st.lowEnergyDays}d Baixa</span>
    </div>
    <div class="bar"><div class="bar-fill" style="width:${st.pct}%"></div></div>
  `;
}

/* =========================
   ABA 4: 🍽️ CARDÁPIO & RECEITAS
========================= */
let currentPickSlotKey = "almoco";
let editingRecipeId = null;

function renderCardapioView() {
  const day = state.selectedDay || 1;
  const dayIdx = day - 1;
  if (!Array.isArray(state.menuPlan14)) state.menuPlan14 = Array.from({ length: 14 }, blankMenuDay);
  const dayPlan = state.menuPlan14[dayIdx] || (state.menuPlan14[dayIdx] = blankMenuDay());

  const titleEl = document.getElementById("menuDayHeaderTitle");
  if (titleEl) titleEl.textContent = `🗓️ Cardápio do Dia ${day} (${getWeekdayShort(day)})`;

  const slotsEl = document.getElementById("menuDaySlotsContainer");
  if (slotsEl) {
    slotsEl.innerHTML = SLOT_DEFS.map(s => {
      const rids = dayPlan[s.key] || [];
      const cardsHtml = rids.map((rid, idx) => {
        const r = state.recipes.find(x => x.id === rid);
        if (!r) return "";
        return `
          <div class="task-card" style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;">
            <div>
              <div class="task-name">${escapeHtml(r.name)}</div>
              <div class="muted">${escapeHtml(r.mealType)} • ${escapeHtml(r.protein)}</div>
            </div>
            <button type="button" class="btn btn-sm danger" data-rm-slot="${s.key}" data-rm-idx="${idx}">Remover</button>
          </div>
        `;
      }).join("");

      return `
        <div class="tier-block desejavel" style="margin-bottom:10px;">
          <div class="tier-header">
            <div class="tier-title">${s.emoji} ${s.label}</div>
            <button type="button" class="btn btn-sm soft" data-open-pick="${s.key}">+ Adicionar receita</button>
          </div>
          ${cardsHtml || `<div class="muted">Nenhuma receita selecionada.</div>`}
        </div>
      `;
    }).join("");

    slotsEl.querySelectorAll("[data-open-pick]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentPickSlotKey = btn.getAttribute("data-open-pick");
        openPickRecipeModal();
      });
    });

    slotsEl.querySelectorAll("[data-rm-slot]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sk = btn.getAttribute("data-rm-slot");
        const idx = parseInt(btn.getAttribute("data-rm-idx"), 10);
        state.menuPlan14[dayIdx][sk].splice(idx, 1);
        saveState();
        renderAll();
      });
    });
  }

  renderRecipesDatabaseList();
  renderMenuPlanShoppingIngredients();
}

function getFilteredRecipes() {
  const q = (document.getElementById("recSearch")?.value || "").trim().toLowerCase();
  const meal = document.getElementById("recFilterMeal")?.value || "tanto";
  const prot = document.getElementById("recFilterProtein")?.value || "tanto";
  const kind = document.getElementById("recFilterKind")?.value || "tanto";
  const onlyFav = !!document.getElementById("recFilterFav")?.checked;

  return (state.recipes || []).filter(r => {
    if (onlyFav && !r.favorite) return false;
    if (meal !== "tanto" && r.mealType !== meal) return false;
    if (prot !== "tanto" && r.protein !== prot) return false;
    if (kind !== "tanto" && r.kind !== kind) return false;
    if (q) {
      const hay = `${r.name} ${(r.ingredients || []).join(" ")} ${r.instructions || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderRecipesDatabaseList() {
  const listEl = document.getElementById("recipesListContainer");
  const countBadge = document.getElementById("recCountBadge");
  if (!listEl) return;

  const filtered = getFilteredRecipes();
  if (countBadge) countBadge.textContent = `${filtered.length} receita(s)`;

  if (!filtered.length) {
    listEl.innerHTML = `<div class="muted">Nenhuma receita encontrada com esses filtros.</div>`;
    return;
  }

  listEl.innerHTML = filtered.map(r => `
    <div class="task-card">
      <div class="task-top">
        <div>
          <div class="task-name">${escapeHtml(r.name)}</div>
          <div class="task-meta-row">
            <span class="badge primary">🍽️ ${escapeHtml(r.mealType)}</span>
            <span class="badge">🥩 ${escapeHtml(r.protein)}</span>
            <span class="badge">🏷️ ${escapeHtml(r.kind)}</span>
          </div>
        </div>
        <div style="display:flex;gap:4px;align-items:center;">
          <button type="button" class="icon-btn" data-fav-rec="${escapeHtml(r.id)}" title="Favoritar">${r.favorite ? "⭐" : "☆"}</button>
          <button type="button" class="icon-btn" data-edit-rec="${escapeHtml(r.id)}" title="Editar">✏️</button>
          <button type="button" class="icon-btn" data-del-rec="${escapeHtml(r.id)}" title="Excluir">🗑️</button>
        </div>
      </div>
      <div class="muted" style="margin-top:6px;">
        <strong>Ingredientes:</strong> ${(r.ingredients || []).map(escapeHtml).join(" • ")}
      </div>
      ${r.instructions ? `<div class="muted" style="margin-top:4px;white-space:pre-line;"><strong>Modo:</strong> ${escapeHtml(r.instructions)}</div>` : ""}
      ${r.link ? `<div style="margin-top:4px;"><a href="${escapeHtml(r.link)}" target="_blank" rel="noopener" style="font-size:0.8rem;color:var(--primary);">🔗 Abrir link da receita</a></div>` : ""}
    </div>
  `).join("");

  listEl.querySelectorAll("[data-fav-rec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const rec = state.recipes.find(x => x.id === btn.getAttribute("data-fav-rec"));
      if (rec) {
        rec.favorite = !rec.favorite;
        saveState();
        renderRecipesDatabaseList();
      }
    });
  });

  listEl.querySelectorAll("[data-edit-rec]").forEach(btn => {
    btn.addEventListener("click", () => {
      openRecipeEditModal(btn.getAttribute("data-edit-rec"));
    });
  });

  listEl.querySelectorAll("[data-del-rec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-del-rec");
      if (!confirm("Excluir esta receita?")) return;
      state.recipes = state.recipes.filter(x => x.id !== id);
      saveState();
      renderAll();
    });
  });
}

function renderMenuPlanShoppingIngredients() {
  const box = document.getElementById("menuGeneratedShopContainer");
  if (!box) return;

  const counts = new Map();
  (state.menuPlan14 || []).forEach(day => {
    SLOT_DEFS.forEach(s => {
      (day[s.key] || []).forEach(rid => {
        const r = state.recipes.find(x => x.id === rid);
        (r?.ingredients || []).forEach(ing => {
          const clean = ing.trim();
          if (!clean || clean.startsWith("#")) return;
          counts.set(clean, (counts.get(clean) || 0) + 1);
        });
      });
    });
  });

  const entries = Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  if (!entries.length) {
    box.innerHTML = `<div class="muted">Adicione receitas no planejador dos dias para gerar a soma de ingredientes aqui.</div>`;
    return;
  }

  box.innerHTML = entries.map(([ing, qtd]) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px dashed var(--border);font-size:0.86rem;">
      <span>${escapeHtml(ing)} ${qtd > 1 ? `<b>(×${qtd})</b>` : ""}</span>
      <button type="button" class="btn btn-sm soft" data-send-ing-shop="${escapeHtml(ing)}">🛒 Enviar p/ Compras</button>
    </div>
  `).join("");

  box.querySelectorAll("[data-send-ing-shop]").forEach(btn => {
    btn.addEventListener("click", () => {
      const ingName = btn.getAttribute("data-send-ing-shop");
      addQuickShoppingItem(ingName);
      btn.textContent = "✅ Enviado!";
    });
  });
}

/* =========================
   ABA 5: 📦 ESTOQUE, MONITOR DE REMÉDIOS & LISTA DE COMPRAS
========================= */
function renderEstoqueView() {
  refreshAllMedsStatus();

  // Botões das 7 categorias
  const envBar = document.getElementById("invEnvButtonsBar");
  if (envBar) {
    envBar.innerHTML = INVENTORY_ENVS.map(env => `
      <button type="button" class="seg-btn ${currentInvEnv === env.id ? "active" : ""}" data-select-env="${env.id}">
        ${env.label}
      </button>
    `).join("");

    envBar.querySelectorAll("[data-select-env]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentInvEnv = btn.getAttribute("data-select-env");
        renderEstoqueView();
      });
    });
  }

  const envMeta = INVENTORY_ENVS.find(e => e.id === currentInvEnv) || INVENTORY_ENVS[0];
  const titleEl = document.getElementById("invCurrentEnvTitle");
  if (titleEl) titleEl.textContent = envMeta.label;

  const items = state.inventory?.[currentInvEnv] || [];
  const q = (document.getElementById("invSearchInput")?.value || "").trim().toLowerCase();
  const filtered = items.filter(it => !q || it.name.toLowerCase().includes(q) || (it.group || "").toLowerCase().includes(q));

  let okC = 0, lowC = 0, outC = 0;
  items.forEach(it => {
    if (it.status === "out") outC++;
    else if (it.status === "low") lowC++;
    else okC++;
  });

  const counterEl = document.getElementById("invSummaryCounters");
  if (counterEl) {
    counterEl.textContent = `Total: ${items.length} • 🟢 OK: ${okC} • 🟡 Acabando: ${lowC} • 🔴 Acabou: ${outC}`;
  }

  const listEl = document.getElementById("inventoryItemsContainer");
  if (listEl) {
    const sorted = [...filtered].sort((a, b) => {
      const ga = a.group || "";
      const gb = b.group || "";
      if (ga !== gb) return ga.localeCompare(gb, "pt-BR");
      return a.name.localeCompare(b.name, "pt-BR");
    });

    let curGroup = null;
    let html = "";

    sorted.forEach(item => {
      if ((item.group || "Geral") !== curGroup) {
        curGroup = item.group || "Geral";
        html += `<div class="group-heading">${escapeHtml(curGroup)}</div>`;
      }

      const medInfo = (currentInvEnv === "remedios" && item.tracked) ? getMedLiveInfo(item) : null;
      const st = item.status || "ok";

      html += `
        <div class="inv-card">
          <div class="inv-row-top">
            <div>
              <div class="inv-name">${escapeHtml(item.name)}</div>
              ${medInfo ? `
                <div class="muted" style="color:${medInfo.daysLeft <= medInfo.alertLimit ? "var(--danger)" : "var(--text-muted)"};font-weight:600;">
                  ⏰ Dose: ${item.dose}/${item.period} • Dura ~<b>${medInfo.daysLeft} dia(s)</b>
                </div>
              ` : ""}
            </div>

            <div class="qty-controls">
              <button type="button" class="qty-btn" data-inv-qty="${escapeHtml(item.id)}" data-delta="-1">−</button>
              <span style="min-width:62px;text-align:center;font-size:0.85rem;font-weight:700;">
                ${item.qty || 0} ${escapeHtml(item.unit || "UN")}
              </span>
              <button type="button" class="qty-btn" data-inv-qty="${escapeHtml(item.id)}" data-delta="1">+</button>
            </div>
          </div>

          <div class="inv-row-top" style="margin-top:2px;">
            <div class="status-pills">
              <button type="button" class="status-pill ok ${st === "ok" ? "active" : ""}" data-inv-st="${escapeHtml(item.id)}" data-val="ok">🟢 OK</button>
              <button type="button" class="status-pill low ${st === "low" ? "active" : ""}" data-inv-st="${escapeHtml(item.id)}" data-val="low">🟡 Acabando</button>
              <button type="button" class="status-pill out ${st === "out" ? "active" : ""}" data-inv-st="${escapeHtml(item.id)}" data-val="out">🔴 Acabou</button>
            </div>

            <div style="display:flex;gap:4px;">
              <button type="button" class="icon-btn" data-inv-edit="${escapeHtml(item.id)}" title="Editar">✏️</button>
              <button type="button" class="icon-btn" data-inv-del="${escapeHtml(item.id)}" title="Excluir">🗑️</button>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html || `<div class="muted">Nenhum item encontrado.</div>`;

    listEl.querySelectorAll("[data-inv-qty]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-inv-qty");
        const delta = parseInt(btn.getAttribute("data-delta"), 10);
        const item = (state.inventory[currentInvEnv] || []).find(x => x.id === id);
        if (!item) return;
        const nextQty = Math.max(0, (item.qty || 0) + delta);
        if (currentInvEnv === "remedios" && item.tracked) {
          setMedNewQty(id, nextQty);
        } else {
          item.qty = nextQty;
          saveState();
          renderEstoqueView();
        }
      });
    });

    listEl.querySelectorAll("[data-inv-st]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-inv-st");
        const val = btn.getAttribute("data-val");
        const item = (state.inventory[currentInvEnv] || []).find(x => x.id === id);
        if (!item) return;
        item.status = val;
        saveState();
        renderAll();
      });
    });

    listEl.querySelectorAll("[data-inv-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        openInvItemModal(currentInvEnv, btn.getAttribute("data-inv-edit"));
      });
    });

    listEl.querySelectorAll("[data-inv-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-inv-del");
        if (!confirm("Excluir este item do estoque?")) return;
        state.inventory[currentInvEnv] = (state.inventory[currentInvEnv] || []).filter(x => x.id !== id);
        saveState();
        renderAll();
      });
    });
  }

  renderMedMonitorSubTab();
  renderShoppingListSubTab();
}

function renderMedMonitorSubTab() {
  const box = document.getElementById("medMonitorContainer");
  if (!box) return;

  const meds = state.inventory?.remedios || [];
  const tracked = meds.filter(m => m.tracked);
  const sporadic = meds.filter(m => !m.tracked);

  let html = `<div class="group-heading">⏰ Uso Contínuo (Desconto Diário/Semanal Automático)</div>`;
  html += tracked.map(med => {
    const info = getMedLiveInfo(med);
    const badgeClass = info.status === "out" ? "esforco-pesado"
                     : info.status === "low" ? "esforco-medio"
                     : "esforco-leve";
    const statusLabel = info.status === "out" ? `🔴 URGENTE (${info.daysLeft}d)`
                      : info.status === "low" ? `🟡 Acabando (${info.daysLeft}d)`
                      : `🟢 Cobertura: ${info.daysLeft} dias`;

    const boxBtns = (med.boxSizes || [30]).map(sz => `
      <button type="button" class="btn btn-sm soft" data-med-box="${escapeHtml(med.id)}" data-box-sz="${sz}">+${sz} ${escapeHtml(med.unit || "comp")}</button>
    `).join("");

    return `
      <div class="inv-card">
        <div class="inv-row-top">
          <div>
            <div class="inv-name">${escapeHtml(med.name)}</div>
            <div class="muted">
              Posologia: <b>${med.dose} ${escapeHtml(med.unit || "comp")} / ${med.period}</b> • Alerta com ≤ ${info.alertLimit} dias
            </div>
          </div>
          <span class="badge ${badgeClass}">${statusLabel}</span>
        </div>

        <div class="inv-row-top" style="margin-top:4px;">
          <div class="qty-controls">
            <span class="muted">Restam hoje:</span>
            <button type="button" class="qty-btn" data-med-adj="${escapeHtml(med.id)}" data-delta="-1">−</button>
            <strong style="min-width:65px;text-align:center;">${info.currentQty} ${escapeHtml(med.unit || "comp")}</strong>
            <button type="button" class="qty-btn" data-med-adj="${escapeHtml(med.id)}" data-delta="1">+</button>
          </div>

          <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            ${boxBtns}
            <button type="button" class="icon-btn" data-med-edit="${escapeHtml(med.id)}" title="Configurar dose/quantidade">✏️</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (sporadic.length) {
    html += `<div class="group-heading" style="margin-top:16px;">🆘 Uso Esporádico (Sem contagem diária)</div>`;
    html += sporadic.map(med => `
      <div class="inv-card">
        <div class="inv-row-top">
          <div class="inv-name">${escapeHtml(med.name)}</div>
          <div class="status-pills">
            <button type="button" class="status-pill ok ${med.status === "ok" ? "active" : ""}" data-spor-st="${escapeHtml(med.id)}" data-val="ok">🟢 Tem em casa</button>
            <button type="button" class="status-pill low ${med.status === "low" ? "active" : ""}" data-spor-st="${escapeHtml(med.id)}" data-val="low">🟡 Acabando</button>
            <button type="button" class="status-pill out ${med.status === "out" ? "active" : ""}" data-spor-st="${escapeHtml(med.id)}" data-val="out">🔴 Acabou</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  box.innerHTML = html;

  box.querySelectorAll("[data-med-adj]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-med-adj");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      const med = meds.find(m => m.id === id);
      if (!med) return;
      const info = getMedLiveInfo(med);
      setMedNewQty(id, info.currentQty + delta);
    });
  });

  box.querySelectorAll("[data-med-box]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-med-box");
      const sz = parseInt(btn.getAttribute("data-box-sz"), 10);
      const med = meds.find(m => m.id === id);
      if (!med) return;
      const info = getMedLiveInfo(med);
      setMedNewQty(id, info.currentQty + sz);
    });
  });

  box.querySelectorAll("[data-med-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      openInvItemModal("remedios", btn.getAttribute("data-med-edit"));
    });
  });

  box.querySelectorAll("[data-spor-st]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-spor-st");
      const val = btn.getAttribute("data-val");
      const med = meds.find(m => m.id === id);
      if (med) {
        med.status = val;
        saveState();
        renderAll();
      }
    });
  });
}

function renderShoppingListSubTab() {
  const box = document.getElementById("shoppingListContainer");
  const tabCountEl = document.getElementById("shopTabCount");
  if (!box) return;

  let totalMissing = 0;
  let groupsHTML = "";

  INVENTORY_ENVS.forEach(env => {
    const allItems = state.inventory?.[env.id] || [];
    const missing = allItems.filter(it => it.status === "low" || it.status === "out");
    totalMissing += missing.length;

    const filtered = missing.filter(it => {
      if (currentShopFilter === "hoje") return !!it.shoppingToday;
      if (currentShopFilter === "feira") return env.shopGroup === "feira";
      if (currentShopFilter === "mercado") return env.shopGroup === "mercado";
      if (currentShopFilter === "farmacia") return env.shopGroup === "farmacia";
      return true;
    });

    if (!filtered.length) return;

    groupsHTML += `<div class="group-heading">${env.label}</div>`;
    filtered.forEach(it => {
      const stLabel = it.status === "out" ? "🔴 Acabou" : "🟡 Acabando";
      groupsHTML += `
        <div class="task-card" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;">
          <label class="task-main-check" style="cursor:pointer;">
            <input type="checkbox" data-shop-bought="${escapeHtml(it.id)}" data-shop-env="${env.id}" />
            <div>
              <div class="task-name">${escapeHtml(it.name)}</div>
              <div class="muted">${stLabel} • Estoque: ${it.qty || 0} ${escapeHtml(it.unit || "UN")}</div>
            </div>
          </label>
          <button type="button" class="btn btn-sm ${it.shoppingToday ? "primary" : "soft"}" data-shop-today="${escapeHtml(it.id)}" data-shop-env="${env.id}">
            ${it.shoppingToday ? "🛒 Na Compra do Dia" : "+ Compra do Dia"}
          </button>
        </div>
      `;
    });
  });

  if (tabCountEl) tabCountEl.textContent = String(totalMissing);

  box.innerHTML = groupsHTML || `<div class="muted">Nenhum item pendente para este filtro! 🎉</div>`;

  box.querySelectorAll("[data-shop-bought]").forEach(cb => {
    cb.addEventListener("change", () => {
      if (!cb.checked) return;
      const id = cb.getAttribute("data-shop-bought");
      const envId = cb.getAttribute("data-shop-env");
      const item = (state.inventory[envId] || []).find(x => x.id === id);
      if (!item) return;

      item.status = "ok";
      item.shoppingToday = false;
      if (envId === "remedios" && item.tracked) {
        const boxSz = (item.boxSizes && item.boxSizes[0]) ? item.boxSizes[0] : 30;
        const info = getMedLiveInfo(item);
        setMedNewQty(id, info.currentQty + boxSz);
      } else {
        saveState();
        renderAll();
      }
    });
  });

  box.querySelectorAll("[data-shop-today]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-shop-today");
      const envId = btn.getAttribute("data-shop-env");
      const item = (state.inventory[envId] || []).find(x => x.id === id);
      if (!item) return;
      item.shoppingToday = !item.shoppingToday;
      saveState();
      renderShoppingListSubTab();
    });
  });
}

function addQuickShoppingItem(rawName) {
  const name = (rawName || "").trim();
  if (!name) return;

  // Verifica se já existe em algum ambiente
  for (const env of INVENTORY_ENVS) {
    const found = (state.inventory[env.id] || []).find(x => x.name.toLowerCase() === name.toLowerCase());
    if (found) {
      found.status = "low";
      found.shoppingToday = true;
      saveState();
      renderAll();
      return;
    }
  }

  // Se não existir, cria em Despensa marcado para comprar
  state.inventory.despensa.push({
    id: `shop_${Date.now()}`,
    name,
    group: "Adicionados pela Lista",
    status: "out",
    qty: 0,
    unit: "UN",
    shoppingToday: true
  });
  saveState();
  renderAll();
}

/* =========================
   MODAIS E AÇÕES DE EDIÇÃO
========================= */
let editingTaskCtx = null;
function openTaskModal(day, taskId = null) {
  const modal = document.getElementById("modalTaskEdit");
  const delBtn = document.getElementById("btnDeleteTaskModal");
  const dayTasks = state.domesticTasksByDay?.[day]?.tasks || [];
  const existing = taskId ? dayTasks.find(t => t.id === taskId) : null;

  editingTaskCtx = { day, taskId };

  document.getElementById("modalTaskTitle").textContent = existing ? "✏️ Editar Tarefa" : "➕ Nova Tarefa no Dia " + day;
  document.getElementById("taskEditName").value = existing ? existing.nome : "";
  document.getElementById("taskEditNivel").value = existing ? existing.nivel : "desejavel";
  document.getElementById("taskEditEsforco").value = existing ? (existing.esforco || "leve") : "leve";
  document.getElementById("taskEditSteps").value = existing ? (existing.steps || []).join("\n") : "";
  if (delBtn) delBtn.style.display = existing ? "inline-flex" : "none";

  modal.classList.add("open");
}

let editingExCtx = null;
function openExerciseModal(day, exId = null) {
  const modal = document.getElementById("modalExEdit");
  const list = state.exercisesByDay?.[day] || [];
  const existing = exId ? list.find(x => x.id === exId) : null;

  editingExCtx = { day, exId };

  document.getElementById("modalExTitle").textContent = existing ? "✏️ Editar Exercício" : "➕ Novo Exercício (Dia " + day + ")";
  document.getElementById("exEditName").value = existing ? existing.nome : "";
  document.getElementById("exEditEquip").value = existing ? (existing.equipamento || "Sem equipamento") : "Tapete";
  document.getElementById("exEditCtx").value = existing ? existing.contexto : (state.exViewCtx || "casa");
  document.getElementById("exEditEnergy").value = existing ? existing.energia : (state.exViewEnergy || "alta");
  document.getElementById("exEditCat").value = existing ? (existing.categoria || "mobilidade") : "mobilidade";
  document.getElementById("exEditInstr").value = existing ? (existing.instrucao || "") : "";

  modal.classList.add("open");
}

function openPickRecipeModal() {
  const modal = document.getElementById("modalPickRecipe");
  const slotObj = SLOT_DEFS.find(s => s.key === currentPickSlotKey);
  document.getElementById("pickModalTitle").textContent = `Adicionar em ${slotObj ? slotObj.label : "Refeição"}`;
  renderPickRecipeList();
  modal.classList.add("open");
}

function renderPickRecipeList() {
  const q = (document.getElementById("pickSearchInput")?.value || "").trim().toLowerCase();
  const meal = document.getElementById("pickMealFilter")?.value || "tanto";
  const box = document.getElementById("pickRecipeList");
  if (!box) return;

  const list = (state.recipes || []).filter(r => {
    if (meal !== "tanto" && r.mealType !== meal) return false;
    if (q) {
      const hay = `${r.name} ${(r.ingredients || []).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  box.innerHTML = list.map(r => `
    <div class="task-card" style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
      <div>
        <div class="task-name">${escapeHtml(r.name)}</div>
        <div class="muted">${escapeHtml(r.mealType)} • ${escapeHtml(r.protein)}</div>
      </div>
      <button type="button" class="btn btn-sm primary" data-pick-add="${escapeHtml(r.id)}">+ Incluir</button>
    </div>
  `).join("") || `<div class="muted">Nenhuma receita encontrada.</div>`;

  box.querySelectorAll("[data-pick-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const rid = btn.getAttribute("data-pick-add");
      const dayIdx = (state.selectedDay || 1) - 1;
      const arr = state.menuPlan14[dayIdx][currentPickSlotKey];
      if (!arr.includes(rid)) arr.push(rid);
      saveState();
      renderAll();
      btn.textContent = "✅ Adicionada";
    });
  });
}

function openRecipeEditModal(recId = null) {
  editingRecipeId = recId;
  const r = recId ? state.recipes.find(x => x.id === recId) : null;
  document.getElementById("modalRecipeTitle").textContent = r ? "✏️ Editar Receita" : "➕ Nova Receita";
  document.getElementById("nrName").value = r ? r.name : "";
  document.getElementById("nrMeal").value = r ? r.mealType : "lanche";
  document.getElementById("nrProtein").value = r ? r.protein : "veg";
  document.getElementById("nrKind").value = r ? r.kind : "salgado";
  document.getElementById("nrIngredients").value = r ? (r.ingredients || []).join("\n") : "";
  document.getElementById("nrInstructions").value = r ? (r.instructions || "") : "";
  document.getElementById("nrLink").value = r ? (r.link || "") : "";
  document.getElementById("modalRecipeEdit").classList.add("open");
}

let editingInvCtx = null;
function openInvItemModal(envId, itemId = null) {
  editingInvCtx = { envId, itemId };
  const list = state.inventory?.[envId] || [];
  const item = itemId ? list.find(x => x.id === itemId) : null;

  document.getElementById("modalInvTitle").textContent = item ? "✏️ Editar Item" : "➕ Novo Item";
  document.getElementById("invItemName").value = item ? item.name : "";
  document.getElementById("invItemEnv").value = envId;
  document.getElementById("invItemGroup").value = item ? (item.group || "") : "";
  document.getElementById("invItemQty").value = item ? (item.qty || 0) : 0;
  document.getElementById("invItemUnit").value = item ? (item.unit || (envId === "remedios" ? "comp" : "UN")) : (envId === "remedios" ? "comp" : "UN");

  const medFields = document.getElementById("medExtraFields");
  const updateMedFieldsVis = () => {
    const selEnv = document.getElementById("invItemEnv").value;
    medFields.style.display = (selEnv === "remedios") ? "block" : "none";
  };
  updateMedFieldsVis();
  document.getElementById("invItemEnv").onchange = updateMedFieldsVis;

  document.getElementById("invMedTracked").checked = item ? !!item.tracked : (envId === "remedios");
  document.getElementById("invMedDose").value = item?.dose || 1;
  document.getElementById("invMedPeriod").value = item?.period || "dia";
  document.getElementById("invMedAlertDays").value = item?.alertDays || 7;

  document.getElementById("modalInvItem").classList.add("open");
}

/* =========================
   RENDER GERAL E EVENTOS
========================= */
function renderAll() {
  renderTopHeaderAndCycleBar();
  if (currentMainView === "hoje") renderTodayView();
  if (currentMainView === "casa") renderCasaView();
  if (currentMainView === "exercicios") renderExercisesView();
  if (currentMainView === "cardapio") renderCardapioView();
  if (currentMainView === "estoque") renderEstoqueView();
}

document.addEventListener("DOMContentLoaded", () => {
  // Preenche selects de receitas e estoque
  const fillSelect = (id, arr) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = arr.map(x => `<option value="${x.id}">${escapeHtml(x.label)}</option>`).join("");
  };
  fillSelect("recFilterMeal", MEALS);
  fillSelect("recFilterProtein", PROTEINS);
  fillSelect("recFilterKind", KINDS);
  fillSelect("pickMealFilter", MEALS);
  fillSelect("nrMeal", MEALS.filter(x => x.id !== "tanto"));
  fillSelect("nrProtein", PROTEINS.filter(x => x.id !== "tanto"));
  fillSelect("nrKind", KINDS.filter(x => x.id !== "tanto"));
  fillSelect("invItemEnv", INVENTORY_ENVS);

  // Botão 🏠 Início fixo no topo
  document.getElementById("btnTopHome")?.addEventListener("click", () => switchMainView("hoje"));

  // Navegação inferior
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => switchMainView(btn.getAttribute("data-nav")));
  });

  // Atalhos na tela Hoje
  document.querySelectorAll("[data-JumpView]").forEach(btn => {
    btn.addEventListener("click", () => switchMainView(btn.getAttribute("data-JumpView")));
  });

  // Seletor de dia do ciclo e botão "Hoje"
  document.getElementById("globalDaySelect")?.addEventListener("change", (e) => {
    state.selectedDay = parseInt(e.target.value, 10) || 1;
    saveState();
    renderAll();
  });

  document.getElementById("btnGoTodayCycle")?.addEventListener("click", () => {
    state.selectedDay = computeAutoCycleDay(state.anchorThursday);
    saveState();
    renderAll();
  });

  // Botões de Energia do dia
  document.querySelectorAll("[data-energy-set]").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-energy-set");
      const d = state.selectedDay || 1;
      state.energyLog[d] = val;
      state.exViewEnergy = val; // sincroniza sugestão de série nos exercícios
      saveState();
      renderAll();
    });
  });

  // Filtro de Nível na aba Casa
  document.querySelectorAll("[data-level-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.casaLevelFilter = btn.getAttribute("data-level-filter");
      document.querySelectorAll("[data-level-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCasaView();
    });
  });

  // Sub-filtros na aba Exercícios (Casa/Viagem e Alta/Baixa)
  document.querySelectorAll("[data-ex-ctx]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.exViewCtx = btn.getAttribute("data-ex-ctx");
      saveState();
      renderExercisesView();
    });
  });

  document.querySelectorAll("[data-ex-energy]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.exViewEnergy = btn.getAttribute("data-ex-energy");
      saveState();
      renderExercisesView();
    });
  });

  // Sub-abas do Cardápio
  document.querySelectorAll("[data-menu-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      const sub = btn.getAttribute("data-menu-sub");
      document.querySelectorAll("[data-menu-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      ["planejar", "receitas", "ingredientes"].forEach(k => {
        const el = document.getElementById(`menuSub-${k}`);
        if (el) el.style.display = (k === sub) ? "block" : "none";
      });
      renderCardapioView();
    });
  });

  // Sub-abas do Estoque
  document.querySelectorAll("[data-inv-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      const sub = btn.getAttribute("data-inv-sub");
      document.querySelectorAll("[data-inv-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      ["estoque", "remedios", "compras"].forEach(k => {
        const el = document.getElementById(`invSub-${k}`);
        if (el) el.style.display = (k === sub) ? "block" : "none";
      });
      renderEstoqueView();
    });
  });

  // Filtros de Compras
  document.querySelectorAll("[data-shop-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentShopFilter = btn.getAttribute("data-shop-filter");
      document.querySelectorAll("[data-shop-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderShoppingListSubTab();
    });
  });

  // Fechar modais
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.getAttribute("data-close-modal"))?.classList.remove("open");
    });
  });

  // Modal de configurar quinta-feira da diarista
  document.getElementById("btnOpenCycleSetup")?.addEventListener("click", () => {
    document.getElementById("inputAnchorThursday").value = state.anchorThursday || getLastThursdayISO();
    document.getElementById("modalCycleSetup").classList.add("open");
  });

  document.getElementById("btnSaveCycleAnchor")?.addEventListener("click", () => {
    const val = document.getElementById("inputAnchorThursday").value;
    if (val) {
      state.anchorThursday = val;
      state.selectedDay = computeAutoCycleDay(val);
      saveState();
      renderAll();
    }
    document.getElementById("modalCycleSetup").classList.remove("open");
  });

  // Salvar/Excluir Tarefa Doméstica
  document.getElementById("btnNewTask")?.addEventListener("click", () => openTaskModal(state.selectedDay || 1, null));

  document.getElementById("btnSaveTaskModal")?.addEventListener("click", () => {
    if (!editingTaskCtx) return;
    const nome = document.getElementById("taskEditName").value.trim();
    if (!nome) { alert("Informe o nome da tarefa."); return; }
    const nivel = document.getElementById("taskEditNivel").value;
    const esforco = document.getElementById("taskEditEsforco").value;
    const steps = document.getElementById("taskEditSteps").value.split("\n").map(s => s.trim()).filter(Boolean);

    const { day, taskId } = editingTaskCtx;
    if (!state.domesticTasksByDay[day]) state.domesticTasksByDay[day] = { title: `Dia ${day}`, tasks: [] };
    const list = state.domesticTasksByDay[day].tasks;

    if (taskId) {
      const t = list.find(x => x.id === taskId);
      if (t) {
        t.nome = nome;
        t.nivel = nivel;
        t.esforco = esforco;
        t.steps = steps;
      }
    } else {
      list.push({
        id: `d${day}_t_${Date.now()}`,
        nome,
        nivel,
        esforco,
        steps
      });
    }

    saveState();
    document.getElementById("modalTaskEdit").classList.remove("open");
    renderAll();
  });

  document.getElementById("btnDeleteTaskModal")?.addEventListener("click", () => {
    if (!editingTaskCtx || !editingTaskCtx.taskId) return;
    if (!confirm("Excluir esta tarefa?")) return;
    const { day, taskId } = editingTaskCtx;
    state.domesticTasksByDay[day].tasks = (state.domesticTasksByDay[day].tasks || []).filter(x => x.id !== taskId);
    saveState();
    document.getElementById("modalTaskEdit").classList.remove("open");
    renderAll();
  });

  // Limpar Reagendadas & Reiniciar Quinzena
  document.getElementById("btnClearFlex")?.addEventListener("click", () => {
    if (!state.flexList?.length) return;
    if (!confirm("Limpar lista de tarefas reagendadas?")) return;
    state.flexList = [];
    saveState();
    renderAll();
  });

  document.getElementById("btnRestartCycle")?.addEventListener("click", () => {
    if (!confirm("Encerrar esta quinzena, salvar resumo no histórico e limpar as marcações para começar um novo ciclo de 14 dias?")) return;
    const casaSt = computeCasaCycleStats();
    const exSt = computeExerciseStats();
    state.cycleHistory.push({
      dateLabel: new Date().toLocaleDateString("pt-BR"),
      pctInd: casaSt.pctInd,
      pctDes: casaSt.pctDes,
      pctSteps: casaSt.pctSteps,
      daysMove: exSt.daysWithMove
    });
    state.domesticDoneSteps = {};
    state.domesticDoneTasks = {};
    state.exDone = {};
    state.flexList = [];
    state.anchorThursday = getLastThursdayISO();
    state.selectedDay = computeAutoCycleDay(state.anchorThursday);
    saveState();
    renderAll();
  });

  document.getElementById("btnDownloadHistoryTxt")?.addEventListener("click", () => {
    const lines = ["=== HISTÓRICO DE QUINZENAS — VIDA FIBRO ==="];
    (state.cycleHistory || []).forEach((h, i) => {
      lines.push(`Quinzena #${i + 1} (${h.dateLabel}): Indispensáveis ${h.pctInd}% | Desejáveis ${h.pctDes}% | Etapas ${h.pctSteps}% | Movimento ${h.daysMove}/14 dias`);
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "historico-quinzenas-fibro.txt";
    a.click();
  });

  // Salvar Exercício
  document.getElementById("btnNewExercise")?.addEventListener("click", () => openExerciseModal(state.selectedDay || 1, null));

  document.getElementById("btnSaveExModal")?.addEventListener("click", () => {
    if (!editingExCtx) return;
    const nome = document.getElementById("exEditName").value.trim();
    if (!nome) { alert("Informe o nome do exercício."); return; }
    const { day, exId } = editingExCtx;
    if (!state.exercisesByDay[day]) state.exercisesByDay[day] = [];

    const payload = {
      nome,
      equipamento: document.getElementById("exEditEquip").value.trim() || "Sem equipamento",
      contexto: document.getElementById("exEditCtx").value,
      energia: document.getElementById("exEditEnergy").value,
      categoria: document.getElementById("exEditCat").value,
      instrucao: document.getElementById("exEditInstr").value.trim()
    };

    if (exId) {
      const ex = state.exercisesByDay[day].find(x => x.id === exId);
      if (ex) Object.assign(ex, payload);
    } else {
      state.exercisesByDay[day].push(Object.assign({ id: `ex_${Date.now()}` }, payload));
    }

    saveState();
    document.getElementById("modalExEdit").classList.remove("open");
    renderAll();
  });

  // Filtros e Ações de Receitas
  ["recSearch", "recFilterMeal", "recFilterProtein", "recFilterKind", "recFilterFav"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", renderRecipesDatabaseList);
    document.getElementById(id)?.addEventListener("change", renderRecipesDatabaseList);
  });

  document.getElementById("btnResetRecFilters")?.addEventListener("click", () => {
    document.getElementById("recSearch").value = "";
    document.getElementById("recFilterMeal").value = "tanto";
    document.getElementById("recFilterProtein").value = "tanto";
    document.getElementById("recFilterKind").value = "tanto";
    document.getElementById("recFilterFav").checked = false;
    renderRecipesDatabaseList();
  });

  document.getElementById("pickSearchInput")?.addEventListener("input", renderPickRecipeList);
  document.getElementById("pickMealFilter")?.addEventListener("change", renderPickRecipeList);

  document.getElementById("btnClearMenuDay")?.addEventListener("click", () => {
    const dayIdx = (state.selectedDay || 1) - 1;
    state.menuPlan14[dayIdx] = blankMenuDay();
    saveState();
    renderAll();
  });

  document.getElementById("btnOpenNewRecipe")?.addEventListener("click", () => openRecipeEditModal(null));

  document.getElementById("btnSaveRecipeModal")?.addEventListener("click", () => {
    const name = document.getElementById("nrName").value.trim();
    if (!name) { alert("Digite o nome da receita."); return; }

    const payload = {
      name,
      mealType: document.getElementById("nrMeal").value,
      protein: document.getElementById("nrProtein").value,
      kind: document.getElementById("nrKind").value,
      ingredients: document.getElementById("nrIngredients").value.split("\n").map(s => s.trim()).filter(Boolean),
      instructions: document.getElementById("nrInstructions").value.trim(),
      link: document.getElementById("nrLink").value.trim()
    };

    if (editingRecipeId) {
      const r = state.recipes.find(x => x.id === editingRecipeId);
      if (r) Object.assign(r, payload);
    } else {
      state.recipes.unshift(Object.assign({ id: `r_${Date.now()}`, favorite: false, photo: "" }, payload));
    }

    saveState();
    document.getElementById("modalRecipeEdit").classList.remove("open");
    renderAll();
  });

  document.getElementById("btnImportRecipesJson")?.addEventListener("click", () => {
    const txt = prompt("Cole aqui um array JSON de receitas:");
    if (!txt) return;
    try {
      const arr = JSON.parse(txt);
      if (!Array.isArray(arr)) throw new Error("Precisa ser uma lista JSON.");
      arr.forEach(r => {
        state.recipes.push({
          id: r.id || `r_${Math.random().toString(16).slice(2, 7)}`,
          name: r.name || "Receita",
          kind: r.kind || r.receita || "salgado",
          mealType: r.mealType || r.refeicao || "lanche",
          protein: r.protein || r.proteina || "veg",
          ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
          instructions: r.instructions || "",
          favorite: !!r.favorite,
          link: r.link || ""
        });
      });
      saveState();
      renderAll();
      alert(`Importadas ${arr.length} receitas com sucesso!`);
    } catch (e) {
      alert("Erro no JSON: " + e.message);
    }
  });

  // Estoque e Remédios
  document.getElementById("invSearchInput")?.addEventListener("input", renderEstoqueView);
  document.getElementById("btnOpenAddInvItem")?.addEventListener("click", () => openInvItemModal(currentInvEnv, null));
  document.getElementById("btnAddNewMed")?.addEventListener("click", () => openInvItemModal("remedios", null));

  document.getElementById("btnSaveInvItem")?.addEventListener("click", () => {
    const name = document.getElementById("invItemName").value.trim();
    if (!name) { alert("Informe o nome do item."); return; }

    const targetEnv = document.getElementById("invItemEnv").value;
    const group = document.getElementById("invItemGroup").value.trim() || "Geral";
    const qty = Math.max(0, parseFloat(document.getElementById("invItemQty").value) || 0);
    const unit = document.getElementById("invItemUnit").value;
    const tracked = (targetEnv === "remedios") && document.getElementById("invMedTracked").checked;
    const dose = parseFloat(document.getElementById("invMedDose").value) || 1;
    const period = document.getElementById("invMedPeriod").value || "dia";
    const alertDays = parseInt(document.getElementById("invMedAlertDays").value, 10) || 7;

    if (editingInvCtx && editingInvCtx.itemId) {
      const oldList = state.inventory[editingInvCtx.envId] || [];
      const idx = oldList.findIndex(x => x.id === editingInvCtx.itemId);
      if (idx !== -1) {
        const obj = oldList[idx];
        obj.name = name;
        obj.group = group;
        obj.qty = qty;
        obj.unit = unit;
        if (targetEnv === "remedios") {
          obj.tracked = tracked;
          obj.dose = dose;
          obj.period = period;
          obj.alertDays = alertDays;
          obj.baseQty = qty;
          obj.lastRefDate = isoToday();
        }
        if (editingInvCtx.envId !== targetEnv) {
          oldList.splice(idx, 1);
          state.inventory[targetEnv].push(obj);
        }
      }
    } else {
      state.inventory[targetEnv].push({
        id: `inv_${Date.now()}`,
        name,
        group,
        status: "ok",
        qty,
        baseQty: qty,
        lastRefDate: isoToday(),
        unit,
        shoppingToday: false,
        tracked,
        dose,
        period,
        alertDays,
        boxSizes: [30, 60]
      });
    }

    saveState();
    document.getElementById("modalInvItem").classList.remove("open");
    renderAll();
  });

  // Adicionar rápido na compra e copiar lista
  document.getElementById("btnQuickShopAdd")?.addEventListener("click", () => {
    const inp = document.getElementById("quickShopInput");
    if (!inp || !inp.value.trim()) return;
    addQuickShoppingItem(inp.value);
    inp.value = "";
  });

  document.getElementById("btnCopyShoppingList")?.addEventListener("click", async () => {
    const lines = [];
    INVENTORY_ENVS.forEach(env => {
      const missing = (state.inventory[env.id] || []).filter(it => it.status === "low" || it.status === "out");
      if (missing.length) {
        lines.push(`\n${env.label}:`);
        missing.forEach(m => lines.push(`- ${m.name}`));
      }
    });
    const text = lines.join("\n").trim() || "Lista vazia!";
    try {
      await navigator.clipboard.writeText(text);
      alert("Lista de compras copiada! 📋");
    } catch {
      alert(text);
    }
  });

  // Backup e Restauração Unificados (Salva tudo em 1 único arquivo JSON, mas também aceita backups antigos!)
  document.getElementById("btnGlobalBackup")?.addEventListener("click", () => {
    saveState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vida-fibro-backup-${isoToday()}.json`;
    a.click();
  });

  const restInput = document.getElementById("globalRestoreInput");
  document.getElementById("btnGlobalRestore")?.addEventListener("click", () => restInput?.click());
  restInput?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed.version === 3) {
        state = parsed;
      } else if (parsed.recipes && parsed.plan14) {
        // Compatibilidade com backup antigo do Cardápio
        state.recipes = parsed.recipes;
        state.menuPlan14 = parsed.plan14;
      }
      saveState();
      renderAll();
      alert("Backup restaurado com sucesso! ✅");
    } catch (err) {
      alert("Arquivo de backup inválido.");
    }
  });

  // Registro do Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
    });
  }

  renderAll();
});
