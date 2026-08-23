/**
 * REDUCD support assistant: keuzehulp, chat, weegwijzer.
 */
(function () {
  if (document.getElementById("sa-root")) return;

  function assetBase() {
    const s = document.querySelector('script[src*="support-assistant.js"]');
    const src = (s && s.getAttribute("src")) || "";
    if (src.indexOf("../../") === 0) return "../../";
    if (src.indexOf("../") === 0) return "../";
    return "";
  }

  const BASE = assetBase();
  const SEEN = "reducd_sa_seen";

  const state = {
    step: 1,
    setup: "",
    equipment: "",
    brand: "",
    height: "",
    width: "",
    depth: "",
    goal: "",
    distance: "",
    tab: "help",
    result: null,
    messages: []
  };

  function home(hash) {
    return BASE + "index.html" + (hash || "");
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function md(text) {
    let t = esc(text);
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/^[-•]\s+(.+)$/gm, "<li>$1</li>");
    t = t.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
    t = t.replace(/\n/g, "<br>");
    return t;
  }

  function apiUrls(path) {
    const list = [path];
    if (location.port === "8000") list.push("http://127.0.0.1:8787" + path);
    return list;
  }

  async function postJson(path, body) {
    const urls = apiUrls(path);
    let last = null;
    for (let i = 0; i < urls.length; i++) {
      try {
        const res = await fetch(urls[i], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        if (res.ok) return await res.json();
        last = new Error("HTTP " + res.status);
      } catch (e) { last = e; }
    }
    throw last || new Error("offline");
  }

  function calcLocal() {
    if (!window.REDUCD_FIT) return null;
    return window.REDUCD_FIT.summarize({
      setup: state.setup,
      height: state.height,
      width: state.width,
      depth: state.depth,
      brand: state.brand,
      equipment: state.equipment,
      goal: state.goal,
      distance: state.distance
    });
  }

  function sendToLead(summary) {
    if (window.REDUCD && window.REDUCD.saveCalcLead) {
      window.REDUCD.saveCalcLead({
        setup: summary.setup,
        height: summary.height,
        width: summary.width,
        depth: summary.depth,
        brand: summary.brand,
        model: summary.size,
        summary: summary.label + " · " + summary.height + "×" + summary.width + "×" + summary.depth + " mm"
      });
    }
    close();
    location.href = home("#lead-form");
  }

  function sendToCalc(summary) {
    close();
    location.href = BASE + "index.html?type=" + encodeURIComponent(summary.setup) +
      "&h=" + summary.height + "&w=" + summary.width + "&d=" + summary.depth + "#calculator";
  }

  function renderHelp() {
    if (state.step === 1) {
      return `
        <p class="sa-step">Stap 1 van 4 — plaatsing</p>
        <span class="sa-label">Opstelling</span>
        <div class="sa-cards">
          <button type="button" class="sa-card ${state.setup === "vrijstaand" ? "is-on" : ""}" data-set="setup:vrijstaand"><strong>Vrijstaand</strong><span>Tuin, gazon, oprit of platdak</span></button>
          <button type="button" class="sa-card ${state.setup === "wand" ? "is-on" : ""}" data-set="setup:wand"><strong>Wandmodel</strong><span>Rug tegen de gevel</span></button>
        </div>
        <span class="sa-label">Toestel</span>
        <div class="sa-cards" style="grid-template-columns:1fr 1fr 1fr">
          <button type="button" class="sa-card ${state.equipment === "monobloc" ? "is-on" : ""}" data-set="equipment:monobloc"><strong>Monobloc</strong><span>Alles buiten</span></button>
          <button type="button" class="sa-card ${state.equipment === "split" ? "is-on" : ""}" data-set="equipment:split"><strong>Split / airco</strong><span>Buitenunit</span></button>
          <button type="button" class="sa-card ${state.equipment === "hybride" ? "is-on" : ""}" data-set="equipment:hybride"><strong>Hybride</strong><span>WP + ketel</span></button>
        </div>
        <div class="sa-nav"><button type="button" class="sa-btn" data-next ${!state.setup ? "disabled" : ""}>Volgende</button></div>`;
    }
    if (state.step === 2) {
      return `
        <p class="sa-step">Stap 2 van 4 — maten</p>
        <label class="sa-label" for="sa-brand">Merk (optioneel)</label>
        <select id="sa-brand" class="sa-select" data-field="brand">
          <option value="">Ik meet zelf</option>
          <option ${state.brand === "Daikin" ? "selected" : ""}>Daikin</option>
          <option ${state.brand === "Vaillant" ? "selected" : ""}>Vaillant</option>
          <option ${state.brand === "NIBE" ? "selected" : ""}>NIBE</option>
          <option ${state.brand === "Mitsubishi Electric" ? "selected" : ""}>Mitsubishi Electric</option>
          <option ${state.brand === "Panasonic" ? "selected" : ""}>Panasonic</option>
          <option ${state.brand === "Bosch" ? "selected" : ""}>Bosch</option>
          <option ${state.brand === "Viessmann" ? "selected" : ""}>Viessmann</option>
        </select>
        <span class="sa-label">Buitenunit (mm)</span>
        <div class="sa-row">
          <input class="sa-input" data-field="height" inputmode="numeric" placeholder="H" value="${esc(state.height)}">
          <input class="sa-input" data-field="width" inputmode="numeric" placeholder="B" value="${esc(state.width)}">
          <input class="sa-input" data-field="depth" inputmode="numeric" placeholder="D" value="${esc(state.depth)}">
        </div>
        <p class="sa-hint"><strong>H</strong> inclusief trillingsdempers / big feet. <strong>B</strong> inclusief leidingbochten en servicekranen. <strong>D</strong> inclusief aanzuig- en ventilatorrooster. Service-speling zit niet in deze maat.</p>
        <div class="sa-nav">
          <button type="button" class="sa-btn sa-btn--ghost" data-prev>Terug</button>
          <button type="button" class="sa-btn" data-next>Volgende</button>
        </div>`;
    }
    if (state.step === 3) {
      return `
        <p class="sa-step">Stap 3 van 4 — doel</p>
        <span class="sa-label">Geluidsdoel</span>
        <div class="sa-cards" style="grid-template-columns:1fr">
          <button type="button" class="sa-card ${state.goal === "vlarem" ? "is-on" : ""}" data-set="goal:vlarem"><strong>VLAREM nachtrichtwaarde</strong><span>Theoretisch toetsen aan 35 dB(A) in woongebied</span></button>
          <button type="button" class="sa-card ${state.goal === "comfort" ? "is-on" : ""}" data-set="goal:comfort"><strong>Comfort slaapkamer / terras</strong><span>Minder last bij u of de buren</span></button>
          <button type="button" class="sa-card ${state.goal === "esthetiek" ? "is-on" : ""}" data-set="goal:esthetiek"><strong>Esthetiek + enige demping</strong><span>Unit uit het zicht, akoestiek meenemen</span></button>
        </div>
        <span class="sa-label">Afstand tot perceelsgrens</span>
        <div class="sa-cards" style="grid-template-columns:1fr 1fr 1fr">
          <button type="button" class="sa-card ${state.distance === "<2" ? "is-on" : ""}" data-set="distance:&lt;2"><strong>&lt; 2 m</strong></button>
          <button type="button" class="sa-card ${state.distance === "2-5" ? "is-on" : ""}" data-set="distance:2-5"><strong>2–5 m</strong></button>
          <button type="button" class="sa-card ${state.distance === ">5" ? "is-on" : ""}" data-set="distance:&gt;5"><strong>&gt; 5 m</strong></button>
        </div>
        <div class="sa-nav">
          <button type="button" class="sa-btn sa-btn--ghost" data-prev>Terug</button>
          <button type="button" class="sa-btn" data-next>Advies</button>
        </div>`;
    }
    const r = state.result;
    if (!r) return `<p class="sa-hint">Vul eerst de maten in.</p>`;
    return `
      <p class="sa-step">Stap 4 van 4 — advies</p>
      <div class="sa-result">
        <h3>${esc(r.label)}</h3>
        <p class="sa-hint">${esc(r.advisory)}</p>
        <dl>
          <dt>Pasvorm</dt><dd>${esc(r.fitNl)}</dd>
          <dt>Speling luchtweg</dt><dd>${r.gap == null ? "—" : r.gap + " mm"}</dd>
          <dt>Demping</dt><dd>${esc(r.db)}</dd>
          <dt>Prijs vanaf</dt><dd>${r.price === "op aanvraag" ? "op aanvraag" : "€ " + r.price}</dd>
        </dl>
      </div>
      <div class="sa-nav" style="flex-direction:column">
        <button type="button" class="sa-btn" data-to-calc>Naar de maatcalculator</button>
        <button type="button" class="sa-btn sa-btn--ghost" data-to-lead>Stuur naar situatiecheck</button>
        <button type="button" class="sa-btn sa-btn--ghost" data-prev>Maten aanpassen</button>
      </div>`;
  }

  function renderChat() {
    const msgs = state.messages.length ? state.messages : [{
      role: "assistant",
      content: "Vraag het in het Nederlands: maten, Peutz, VLAREM of prijs. Of gebruik de **Keuzehulp** voor een modeladvies."
    }];
    return `<div class="sa-chat">
      ${msgs.map((m) => `<div class="sa-msg sa-msg--${m.role === "user" ? "user" : "bot"} sa-md">${md(m.content)}</div>`).join("")}
      <form class="sa-compose" data-chat>
        <input class="sa-input" name="q" maxlength="500" placeholder="Typ uw vraag…" autocomplete="off">
        <button class="sa-btn" type="submit" style="flex:0 0 auto">Stuur</button>
      </form>
    </div>`;
  }

  function renderNav() {
    return `<div class="sa-links">
      <a href="${home("#calculator")}">Maatcalculator</a>
      <a href="${BASE}vlarem/">VLAREM-rekentool + PDF</a>
      <a href="${home("#producten")}">Producten &amp; maten</a>
      <a href="${BASE}geluid-warmtepomp-buren/">Burenoverlast-gids</a>
      <a href="${BASE}voor-installateurs/">HVAC / installateurs</a>
      <a href="${home("#lead-form")}">Offerte / situatiecheck</a>
    </div>`;
  }

  function paint() {
    const body = document.getElementById("sa-body");
    if (!body) return;
    if (state.tab === "chat") body.innerHTML = renderChat();
    else if (state.tab === "nav") body.innerHTML = renderNav();
    else body.innerHTML = renderHelp();
    document.querySelectorAll(".sa-tab").forEach((t) => t.classList.toggle("is-on", t.getAttribute("data-tab") === state.tab));
  }

  function open(tab) {
    if (tab) state.tab = tab;
    const panel = document.getElementById("sa-panel");
    const fab = document.getElementById("sa-fab");
    panel.classList.add("is-open");
    fab.classList.add("is-open");
    fab.setAttribute("aria-expanded", "true");
    try { sessionStorage.setItem(SEEN, "1"); } catch (e) {}
    const dot = fab.querySelector(".sa-dot");
    if (dot) dot.hidden = true;
    paint();
  }

  function close() {
    document.getElementById("sa-panel").classList.remove("is-open");
    const fab = document.getElementById("sa-fab");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-expanded", "false");
  }

  async function finish() {
    let rec = calcLocal();
    try {
      const remote = await postJson("/api/calculate-fit", {
        setup: state.setup,
        height: state.height,
        width: state.width,
        depth: state.depth,
        brand: state.brand,
        equipment: state.equipment,
        goal: state.goal,
        distance: state.distance
      });
      if (remote && remote.label) rec = remote;
    } catch (e) {}
    state.result = rec;
    state.step = 4;
    paint();
  }

  async function chatSubmit(q) {
    state.messages.push({ role: "user", content: q });
    paint();
    const fallback = window.REDUCD_ASSISTANT_FALLBACK ? window.REDUCD_ASSISTANT_FALLBACK(q) : "Stel uw vraag via info@reducd.be of +32 472 08 44 70.";
    try {
      const out = await postJson("/api/chat", {
        messages: state.messages,
        context: state.result || { setup: state.setup, goal: state.goal }
      });
      state.messages.push({ role: "assistant", content: (out && out.text) || fallback });
    } catch (e) {
      state.messages.push({ role: "assistant", content: fallback });
    }
    paint();
  }

  function mount() {
    const seen = (() => { try { return sessionStorage.getItem(SEEN); } catch (e) { return "1"; } })();
    const root = document.createElement("div");
    root.id = "sa-root";
    root.innerHTML = `
      <button type="button" class="sa-fab" id="sa-fab" aria-expanded="false" aria-controls="sa-panel" aria-label="Keuzehulp openen">
        <span class="sa-dot" ${seen ? "hidden" : ""}></span>
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.26-.94L3 20l.94-4.26A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      </button>
      <div class="sa-panel" id="sa-panel" role="dialog" aria-labelledby="sa-title">
        <div class="sa-head">
          <div>
            <h2 id="sa-title">REDUCD assistent</h2>
            <p>Keuzehulp · chat · wegwijzer</p>
          </div>
          <button type="button" class="sa-x" data-sa-close aria-label="Sluiten">×</button>
        </div>
        <div class="sa-tabs">
          <button type="button" class="sa-tab is-on" data-tab="help">Keuzehulp</button>
          <button type="button" class="sa-tab" data-tab="chat">Chat</button>
          <button type="button" class="sa-tab" data-tab="nav">Wegwijzer</button>
        </div>
        <div class="sa-body" id="sa-body"></div>
      </div>`;
    document.body.appendChild(root);

    document.getElementById("sa-fab").addEventListener("click", () => {
      const openNow = document.getElementById("sa-panel").classList.contains("is-open");
      if (openNow) close(); else open("help");
    });
    root.addEventListener("click", (e) => {
      if (e.target.closest("[data-sa-close]")) close();
      const tab = e.target.closest("[data-tab]");
      if (tab) { state.tab = tab.getAttribute("data-tab"); paint(); }
      const set = e.target.closest("[data-set]");
      if (set) {
        const parts = set.getAttribute("data-set").split(":");
        state[parts[0]] = parts.slice(1).join(":");
        paint();
      }
      if (e.target.closest("[data-next]")) {
        if (state.step === 3) finish();
        else { state.step = Math.min(4, state.step + 1); paint(); }
      }
      if (e.target.closest("[data-prev]")) { state.step = Math.max(1, state.step - 1); paint(); }
      if (e.target.closest("[data-to-calc]") && state.result) sendToCalc(state.result);
      if (e.target.closest("[data-to-lead]") && state.result) sendToLead(state.result);
    });
    root.addEventListener("change", (e) => {
      const f = e.target.getAttribute("data-field");
      if (f) state[f] = e.target.value;
    });
    root.addEventListener("input", (e) => {
      const f = e.target.getAttribute("data-field");
      if (f) state[f] = e.target.value;
    });
    root.addEventListener("submit", (e) => {
      const form = e.target.closest("[data-chat]");
      if (!form) return;
      e.preventDefault();
      const q = (form.q.value || "").trim();
      if (!q) return;
      form.q.value = "";
      chatSubmit(q);
    });

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-open-assistant]");
      if (!t) return;
      e.preventDefault();
      open(t.getAttribute("data-assistant-tab") || "help");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("sa-panel").classList.contains("is-open")) close();
    });
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = BASE + "css/support-assistant.css";
  document.head.appendChild(link);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();

  window.REDUCD = window.REDUCD || {};
  window.REDUCD.openAssistant = open;
})();
