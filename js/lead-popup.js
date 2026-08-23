/**
 * Lead capture popup — layout inspired by live REDUCD offer popup,
 * styled in brand navy (#0F2A3A) + white. Hooks: timer / scroll / exit-intent.
 */
(function () {
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
    return /\/(pro|vlarem|docs)(\/|$)/i.test(location.pathname);
  }

  function isCoolingDown(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const until = parseInt(raw, 10);
      if (Number.isFinite(until) && Date.now() < until) return true;
      localStorage.removeItem(key);
      return false;
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
    if (/\/pro\/docs(\/|$)/i.test(location.pathname)) return "../../";
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
        <button type="button" class="lead-popup__close" data-lead-popup-close aria-label="Sluiten">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="lead-popup__top">
          <h2 id="leadPopupTitle" class="lead-popup__title">Wij komen bij u langs</h2>
          <p class="lead-popup__sub">
            voor een geluidsadvies bij u thuis — geheel vrijblijvend &amp; kosteloos,
            incl. professionele geluidsmeting
          </p>
          <p class="lead-popup__value">t.w.v. €&nbsp;325</p>
          <div class="lead-popup__hero">
            <img src="${heroSrc()}" alt="REDUCD team bij akoestische omkasting" width="640" height="400" loading="lazy">
          </div>
        </div>

        <div class="lead-popup__bottom">
          <p class="lead-popup__prompt">
            Laat uw gegevens achter en wij nemen binnen 48u contact met u op
            om uw geluidsadvies <span class="lead-popup__underline">op locatie</span> in te plannen.
          </p>
          <form id="leadPopupForm" class="lead-popup__form" novalidate>
            <input type="text" name="name" class="lead-popup__input" placeholder="Naam" required autocomplete="name">
            <input type="email" name="email" class="lead-popup__input" placeholder="E-mail" required autocomplete="email">
            <input type="tel" name="phone" class="lead-popup__input" placeholder="Telefoonnummer" required autocomplete="tel">
            <button type="submit" class="lead-popup__submit">Plan <span class="accent-gratis">gratis</span> meting</button>
            <p class="lead-popup__legal">
              Door te versturen ga je akkoord met ons
              <a href="${privacyHref()}" data-privacy-link>privacybeleid</a>.
            </p>
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
        display: none; align-items: center; justify-content: center;
        padding: 1rem;
      }
      .lead-popup.is-open { display: flex; }
      .lead-popup__backdrop {
        position: absolute; inset: 0;
        background: rgba(15,42,58,.78);
        backdrop-filter: blur(2px);
      }
      .lead-popup__panel {
        position: relative;
        width: min(100%, 26.5rem);
        max-height: min(94vh, 52rem);
        overflow: auto;
        background: #fff;
        color: #0F2A3A;
        border-radius: 1.25rem;
        box-shadow: 0 28px 80px rgba(15,42,58,.35);
        font-family: Inter, system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .lead-popup__close {
        position: absolute; top: .85rem; right: .85rem; z-index: 2;
        width: 2.25rem; height: 2.25rem; border: 0; border-radius: 999px;
        background: rgba(15,42,58,.06); color: #0F2A3A;
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background .2s;
      }
      .lead-popup__close:hover { background: rgba(15,42,58,.12); }

      .lead-popup__top {
        padding: 2rem 1.6rem 0.25rem;
        text-align: center;
      }
      .lead-popup__title {
        margin: 0 1.5rem .65rem;
        font-size: clamp(1.45rem, 4.5vw, 1.85rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.12;
        text-transform: uppercase;
        color: #0F2A3A;
      }
      .lead-popup__sub {
        margin: 0 auto .85rem;
        max-width: 22rem;
        font-size: .82rem;
        line-height: 1.5;
        font-weight: 400;
        color: rgba(15,42,58,.62);
      }
      .lead-popup__value {
        margin: 0 0 1rem;
        font-size: 1.05rem;
        font-weight: 700;
        color: #0F2A3A;
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-thickness: 1.5px;
      }
      .lead-popup__hero {
        margin: 0 -0.15rem;
        border-radius: .75rem .75rem 0 0;
        overflow: hidden;
        aspect-ratio: 16 / 11;
        background: rgba(15,42,58,.04);
      }
      .lead-popup__hero img {
        display: block; width: 100%; height: 100%;
        object-fit: cover; object-position: center top;
      }

      .lead-popup__bottom {
        background: #0F2A3A;
        color: #fff;
        padding: 1.35rem 1.5rem 1.5rem;
        border-radius: 0 0 1.25rem 1.25rem;
      }
      .lead-popup__prompt {
        margin: 0 0 1rem;
        font-size: .84rem;
        font-weight: 600;
        line-height: 1.45;
        text-align: center;
      }
      .lead-popup__underline {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .lead-popup__form {
        display: flex; flex-direction: column; gap: .55rem;
      }
      .lead-popup__input {
        width: 100%;
        padding: .85rem 1rem;
        border: 0;
        border-radius: .55rem;
        background: #fff;
        color: #0F2A3A;
        font-size: .9rem;
        font-family: inherit;
      }
      .lead-popup__input::placeholder { color: rgba(15,42,58,.4); }
      .lead-popup__input:focus {
        outline: 2px solid rgba(255,255,255,.55);
        outline-offset: 1px;
      }
      .lead-popup__submit .accent-gratis { color: #D49A12; }
      .lead-popup__submit {
        width: 100%;
        margin-top: .2rem;
        padding: 1rem 1.1rem;
        border: 0;
        border-radius: .55rem;
        background: #fff;
        color: #0F2A3A;
        font-size: .72rem;
        font-weight: 800;
        letter-spacing: .1em;
        text-transform: uppercase;
        font-family: inherit;
        cursor: pointer;
        transition: transform .2s, background .2s;
      }
      .lead-popup__submit:hover { background: #f3f6f8; transform: translateY(-1px); }
      .lead-popup__submit:disabled { opacity: .7; cursor: wait; transform: none; }
      .lead-popup__legal {
        margin: .45rem 0 0;
        font-size: .62rem;
        line-height: 1.4;
        text-align: center;
        color: rgba(255,255,255,.45);
      }
      .lead-popup__legal a {
        color: inherit;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .lead-popup__success {
        margin: 0;
        padding: 1.5rem 0 .5rem;
        text-align: center;
        font-size: .95rem;
        font-weight: 600;
      }

      @media (max-width: 420px) {
        .lead-popup__top { padding: 1.65rem 1.15rem 0; }
        .lead-popup__bottom { padding: 1.15rem 1.15rem 1.25rem; }
        .lead-popup__hero { aspect-ratio: 16 / 12; }
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

    function resetForm() {
      if (!form) return;
      form.hidden = false;
      form.reset();
      const prompt = modal.querySelector(".lead-popup__prompt");
      if (prompt) prompt.hidden = false;
      const ok = modal.querySelector(".lead-popup__success");
      if (ok) ok.hidden = true;
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Plan <span class="accent-gratis">gratis</span> meting';
      }
    }

    function open(trigger, opts) {
      const manual = !!(opts && opts.manual);
      if (modal.classList.contains("is-open")) return;
      if (!manual && autoUsed) return;
      if (!manual) autoUsed = true;
      resetForm();
      document.getElementById("mobileMenu")?.classList.add("translate-x-full");
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      window.REDUCD?.trackEvent?.("popup_open", {
        trigger: trigger || "unknown",
        content_name: "lead_popup"
      });
      modal.querySelector('input[name="name"]')?.focus();
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
        const prompt = modal.querySelector(".lead-popup__prompt");
        if (prompt) prompt.hidden = true;
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
