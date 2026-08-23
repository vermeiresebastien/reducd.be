/**
 * Lead capture popup — mobile-first sheet, brand navy (#0F2A3A) + white.
 * Hooks: timer / scroll / exit-intent. Submit: generate_lead / conversion.
 */
(function () {
  const SUBMIT_LABEL = "Plan nu uw meting";
  const DEFAULTS = {
    enabled: true,
    delayMs: 45000,
    scrollPercent: 55,
    exitIntent: true,
    storageKey: "reducd_lead_popup_dismissed",
    cooldownDays: 7
  };

  function popupCfg() {
    return Object.assign({}, DEFAULTS, (window.REDUCD_TRACKING && window.REDUCD_TRACKING.popup) || {});
  }

  function isProPage() {
    return /\/(pro|vlarem|docs|platform)(\/|$)/i.test(location.pathname);
  }

  function isCoolingDown(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const until = parseInt(raw, 10);
      if (Number.isFinite(until) && Date.now() < until) return true;
      localStorage.removeItem(key);
    } catch (e) {
      return false;
    }
  }

  function setCooldown(key, days) {
    try {
      const ms = Math.max(1, days) * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, String(Date.now() + ms));
    } catch (e) {}
  }

  function assetBase() {
    if (/\/pro\/(docs|platform)(\/|$)/i.test(location.pathname)) return "../../";
    return /\/(blog|admin|pro|vlarem|docs)(\/|$)/i.test(location.pathname) ? "../" : "";
  }

  function privacyHref() {
    return assetBase() + "privacy.html";
  }

  function heroSrc() {
    return assetBase() + "assets/images/hero-homepage.jpg";
  }

  function buildModal() {
    const wrap = document.createElement("div");
    wrap.id = "leadPopup";
    wrap.className = "lead-popup";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "leadPopupTitle");
    wrap.hidden = true;
    wrap.innerHTML = `
      <div class="lead-popup__backdrop" data-lead-popup-close></div>
      <div class="lead-popup__panel">
        <div class="lead-popup__media" aria-hidden="true">
          <img src="${heroSrc()}" alt="" width="640" height="800" loading="lazy">
        </div>

        <div class="lead-popup__main">
          <div class="lead-popup__bar">
            <p class="lead-popup__eyebrow">Advies op locatie</p>
            <button type="button" class="lead-popup__close" data-lead-popup-close aria-label="Sluiten">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form id="leadPopupForm" class="lead-popup__form" novalidate>
            <div class="lead-popup__scroll">
              <h2 id="leadPopupTitle" class="lead-popup__title">Wij komen bij u langs</h2>
              <p class="lead-popup__sub">
                Geluidsadvies bij u thuis — vrijblijvend en kosteloos, inclusief professionele meting.
              </p>
              <p class="lead-popup__value"><span>t.w.v. €&nbsp;325</span></p>
              <p class="lead-popup__prompt">
                We nemen binnen 48 uur contact op om de meting in te plannen.
              </p>

              <label class="lead-popup__field">
                <span class="lead-popup__label">Naam</span>
                <input type="text" name="name" class="lead-popup__input" autocomplete="name" autocapitalize="words" spellcheck="false" enterkeyhint="next" required>
              </label>
              <label class="lead-popup__field">
                <span class="lead-popup__label">E-mail</span>
                <input type="email" name="email" class="lead-popup__input" autocomplete="email" inputmode="email" spellcheck="false" enterkeyhint="next" required>
              </label>
              <label class="lead-popup__field">
                <span class="lead-popup__label">Telefoonnummer</span>
                <input type="tel" name="phone" class="lead-popup__input" autocomplete="tel" inputmode="tel" enterkeyhint="send" required>
              </label>
            </div>

            <div class="lead-popup__actions">
              <button type="submit" class="lead-popup__submit">${SUBMIT_LABEL}</button>
              <p class="lead-popup__legal">
                Door te versturen ga je akkoord met ons
                <a href="${privacyHref()}" data-privacy-link>privacybeleid</a>.
              </p>
            </div>
          </form>
          <p class="lead-popup__success" hidden>Bedankt — we plannen spoedig uw advies op locatie.</p>
        </div>
      </div>`;
    return wrap;
  }

  function injectStyles() {
    if (document.getElementById("lead-popup-styles")) return;
    const s = document.createElement("style");
    s.id = "lead-popup-styles";
    s.textContent = `
      .lead-popup {
        position: fixed; inset: 0; z-index: 95;
        display: none; align-items: flex-end; justify-content: center;
        padding: 0;
        --lead-navy: #0F2A3A;
        --lead-muted: rgba(15,42,58,.58);
        --lead-line: rgba(15,42,58,.1);
      }
      .lead-popup.is-open { display: flex; }
      .lead-popup__backdrop {
        position: absolute; inset: 0;
        background: rgba(15,42,58,.72);
        backdrop-filter: blur(4px);
      }
      .lead-popup__panel {
        position: relative;
        display: flex; flex-direction: column;
        width: 100%;
        max-width: 26.5rem;
        max-height: min(92dvh, calc(var(--lead-vvh, 100dvh) - 0.5rem));
        background: #fff;
        color: var(--lead-navy);
        border-radius: 1.35rem 1.35rem 0 0;
        box-shadow: 0 24px 72px rgba(15,42,58,.32);
        font-family: Inter, system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      .lead-popup__main {
        display: flex; flex-direction: column;
        flex: 1; min-height: 0; min-width: 0;
        background: #fff;
        position: relative;
      }
      .lead-popup__bar {
        display: flex; justify-content: space-between; align-items: center;
        gap: .75rem;
        flex-shrink: 0;
        padding: .45rem .55rem .15rem 1.25rem;
      }
      .lead-popup__eyebrow {
        margin: 0;
        font-size: .68rem;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: rgba(15,42,58,.45);
      }
      .lead-popup__close {
        width: 2.75rem; height: 2.75rem; min-width: 44px; min-height: 44px;
        border: 1px solid rgba(15,42,58,.1); border-radius: 999px;
        background: rgba(15,42,58,.06); color: var(--lead-navy);
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background .2s;
      }
      .lead-popup__close:hover { background: rgba(15,42,58,.12); }
      .lead-popup__close:focus-visible {
        outline: 2px solid var(--lead-navy); outline-offset: 2px;
      }

      .lead-popup__media { display: none; }
      .lead-popup__media img {
        display: block; width: 100%; height: 100%;
        object-fit: cover; object-position: center 18%;
      }

      .lead-popup__form {
        display: flex; flex-direction: column;
        flex: 1; min-height: 0;
      }
      .lead-popup__scroll {
        flex: 1; min-height: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        padding: .15rem 1.25rem .35rem;
      }
      .lead-popup__title {
        margin: 0 0 .55rem;
        font-size: 1.38rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.18;
        color: var(--lead-navy);
      }
      .lead-popup__sub {
        margin: 0 0 .75rem;
        font-size: .9rem;
        line-height: 1.45;
        font-weight: 400;
        color: var(--lead-muted);
      }
      .lead-popup__value {
        margin: 0 0 1rem;
      }
      .lead-popup__value span {
        display: inline-block;
        padding: .22rem .6rem;
        border-radius: 999px;
        background: rgba(15,42,58,.05);
        font-size: .75rem;
        font-weight: 600;
        letter-spacing: .01em;
        color: var(--lead-navy);
      }
      .lead-popup__prompt {
        margin: 0 0 1rem;
        font-size: .82rem;
        line-height: 1.45;
        color: var(--lead-muted);
      }
      .lead-popup__field {
        display: block;
        margin: 0 0 .7rem;
      }
      .lead-popup__label {
        display: block;
        margin: 0 0 .28rem .1rem;
        font-size: .75rem;
        font-weight: 600;
        color: var(--lead-navy);
      }
      .lead-popup__input {
        width: 100%;
        min-height: 44px;
        padding: .75rem .95rem;
        border: 1px solid var(--lead-line);
        border-radius: .7rem;
        background: #f7f9fb;
        color: var(--lead-navy);
        font-size: 16px;
        line-height: 1.3;
        font-family: inherit;
      }
      .lead-popup__input:focus {
        outline: none;
        background: #fff;
        border-color: var(--lead-navy);
        box-shadow: 0 0 0 3px rgba(15,42,58,.1);
      }

      .lead-popup__actions {
        flex-shrink: 0;
        padding: .75rem 1.25rem calc(.95rem + env(safe-area-inset-bottom, 0px));
        background: #fff;
        border-top: 1px solid var(--lead-line);
        box-shadow: 0 -10px 24px rgba(15,42,58,.04);
      }
      .lead-popup__submit {
        width: 100%;
        min-height: 48px;
        padding: .9rem 1.15rem;
        border: 0;
        border-radius: 999px;
        background: var(--lead-navy);
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        font-family: inherit;
        cursor: pointer;
        transition: background .2s, transform .2s;
      }
      .lead-popup__submit:hover { background: #1a3f54; transform: translateY(-1px); }
      .lead-popup__submit:focus-visible {
        outline: 2px solid var(--lead-navy); outline-offset: 3px;
      }
      .lead-popup__submit:disabled { opacity: .7; cursor: wait; transform: none; }
      .lead-popup__legal {
        margin: .55rem 0 0;
        font-size: .68rem;
        line-height: 1.4;
        text-align: center;
        color: rgba(15,42,58,.42);
      }
      .lead-popup__legal a {
        color: inherit;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .lead-popup__success {
        margin: 0;
        padding: 2.5rem 1.5rem 2rem;
        text-align: center;
        font-size: .95rem;
        font-weight: 600;
        line-height: 1.45;
      }

      @media (min-width: 800px) and (min-height: 640px) {
        .lead-popup { align-items: center; padding: 1.5rem; }
        .lead-popup__panel {
          flex-direction: row;
          width: min(100%, 42rem);
          max-width: 42rem;
          max-height: min(86dvh, 40rem);
          min-height: 28rem;
          border-radius: 1.35rem;
        }
        .lead-popup__media {
          display: block;
          width: 16rem;
          height: auto;
          align-self: stretch;
          flex-shrink: 0;
        }
        .lead-popup__media img { object-position: center 12%; }
        .lead-popup__main { min-width: 0; min-height: 0; flex: 1; }
        .lead-popup__bar { padding: .55rem .7rem .1rem 1.6rem; }
        .lead-popup__scroll { padding: .15rem 1.6rem .5rem; }
        .lead-popup__title { font-size: 1.55rem; }
        .lead-popup__actions {
          padding: .85rem 1.6rem 1.2rem;
          box-shadow: none;
        }
      }
    `;
    document.head.appendChild(s);
  }

  function visibleText(el) {
    return (el && el.textContent ? el.textContent : "").replace(/\s+/g, " ").trim();
  }

  function isMetingCta(el) {
    if (!el || el.closest(".lead-popup")) return false;
    if (el.hasAttribute("data-open-lead-popup")) return true;
    const href = (el.getAttribute("href") || "").toLowerCase();
    if (href.includes("#lead-form")) return true;
    const text = visibleText(el).toLowerCase();
    if (/\bgratis\b/.test(text) && /\bmeting\b/.test(text)) return true;
    return false;
  }

  function findMetingCta(target) {
    if (!target || !target.closest) return null;
    if (target.closest(".lead-popup")) return null;
    const marked = target.closest("[data-open-lead-popup]");
    if (marked) return marked;
    const clickable = target.closest("a, button");
    if (clickable && isMetingCta(clickable)) return clickable;
    return null;
  }

  function init() {
    const cfg = popupCfg();
    const skipAuto = isProPage() || !cfg.enabled || isCoolingDown(cfg.storageKey);

    injectStyles();
    const modal = document.getElementById("leadPopup") || buildModal();
    if (!modal.isConnected) document.body.appendChild(modal);

    let autoUsed = false;

    const form = modal.querySelector("#leadPopupForm");

    function syncViewport() {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      modal.style.setProperty("--lead-vvh", h + "px");
    }

    function resetForm() {
      if (!form) return;
      form.hidden = false;
      form.reset();
      const ok = modal.querySelector(".lead-popup__success");
      if (ok) ok.hidden = true;
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = false;
        btn.textContent = SUBMIT_LABEL;
      }
    }

    function open(trigger, opts) {
      const manual = !!(opts && opts.manual);
      if (modal.classList.contains("is-open")) return;
      if (!manual && autoUsed) return;
      if (!manual) autoUsed = true;
      resetForm();
      syncViewport();
      document.getElementById("mobileMenu")?.classList.add("translate-x-full");
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      window.REDUCD?.trackEvent?.("popup_open", {
        trigger: trigger || "unknown",
        content_name: "lead_popup"
      });
      if (window.matchMedia("(min-width: 640px)").matches) {
        modal.querySelector('input[name="name"]')?.focus();
      }
    }

    function close(persist) {
      modal.classList.remove("is-open");
      modal.hidden = true;
      document.body.style.overflow = "";
      if (persist !== false) {
        setCooldown(cfg.storageKey, cfg.cooldownDays);
        autoUsed = true;
      }
    }

    modal.querySelectorAll("[data-lead-popup-close]").forEach((el) => {
      el.addEventListener("click", () => close(true));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close(true);
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", syncViewport);
      window.visualViewport.addEventListener("scroll", syncViewport);
    }
    window.addEventListener("resize", syncViewport);

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Verzenden…";
      }
      window.REDUCD?.trackLead?.({
        content_name: "popup_advies",
        lead_source: "popup",
        customer_type: "particulier"
      });
      setTimeout(() => {
        form.hidden = true;
        const ok = modal.querySelector(".lead-popup__success");
        if (ok) ok.hidden = false;
        setCooldown(cfg.storageKey, cfg.cooldownDays);
        autoUsed = true;
        setTimeout(() => close(true), 2000);
      }, 700);
    });

    if (!skipAuto) {
      if (cfg.delayMs > 0) {
        setTimeout(() => open("timer"), cfg.delayMs);
      }

      if (cfg.scrollPercent > 0) {
        const onScroll = () => {
          const doc = document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          if (max <= 0) return;
          const pct = (window.scrollY / max) * 100;
          if (pct >= cfg.scrollPercent) {
            open("scroll");
            window.removeEventListener("scroll", onScroll);
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
      }

      if (cfg.exitIntent) {
        const onExit = (e) => {
          if (e.clientY > 8) return;
          open("exit_intent");
          document.removeEventListener("mouseout", onExit);
        };
        document.addEventListener("mouseout", onExit);
      }
    }

    document.addEventListener(
      "click",
      (e) => {
        const cta = findMetingCta(e.target);
        if (!cta) return;
        e.preventDefault();
        e.stopPropagation();
        open("manual", { manual: true });
      },
      true
    );

    window.REDUCD = window.REDUCD || {};
    window.REDUCD.openLeadPopup = function (trigger) {
      open(trigger || "manual", { manual: true });
    };

    // Dev helper: ?popup=1 forces open (ignores cooldown once)
    if (/[?&]popup=1(?:&|$)/.test(location.search)) {
      try { localStorage.removeItem(cfg.storageKey); } catch (e) {}
      autoUsed = false;
      open("query", { manual: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
