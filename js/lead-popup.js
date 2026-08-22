/**
 * Lead capture popup with time / scroll / exit-intent hooks.
 * Fires REDUCD.trackLead + trackEvent on open/submit. Consent-aware for tracking only;
 * popup itself can show without consent (form is first-party).
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
    return /\/pro(\/|$)/i.test(location.pathname);
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

  function privacyHref() {
    return /\/(blog|admin|pro)(\/|$)/i.test(location.pathname) ? "../privacy.html" : "privacy.html";
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
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <p class="lead-popup__eyebrow">Gratis advies</p>
        <h2 id="leadPopupTitle" class="lead-popup__title">Warmtepomp te luid?</h2>
        <p class="lead-popup__text">Laat je gegevens achter. We plannen een vrijblijvende geluidsmeting of adviesgesprek — in België én Nederland.</p>
        <form id="leadPopupForm" class="lead-popup__form" novalidate>
          <input type="text" name="name" class="form-field" placeholder="Naam" required autocomplete="name">
          <input type="email" name="email" class="form-field" placeholder="E-mail" required autocomplete="email">
          <input type="tel" name="phone" class="form-field" placeholder="Telefoon" required autocomplete="tel">
          <button type="submit" class="btn-primary lead-popup__submit">Plan adviesgesprek →</button>
          <p class="lead-popup__legal">Door te versturen ga je akkoord met ons <a href="${privacyHref()}" data-privacy-link>privacybeleid</a>.</p>
        </form>
        <p class="lead-popup__success" hidden>Bedankt — we nemen snel contact op.</p>
      </div>`;
    return wrap;
  }

  function injectStyles() {
    if (document.getElementById("lead-popup-styles")) return;
    const s = document.createElement("style");
    s.id = "lead-popup-styles";
    s.textContent = `
      .lead-popup { position: fixed; inset: 0; z-index: 95; display: none; align-items: center; justify-content: center; padding: 1.25rem; }
      .lead-popup.is-open { display: flex; }
      .lead-popup__backdrop { position: absolute; inset: 0; background: rgba(15,42,58,.72); }
      .lead-popup__panel { position: relative; width: min(100%, 26rem); background: #fff; color: #0F2A3A; border-radius: 1.25rem; padding: 2rem 1.75rem 1.75rem; box-shadow: 0 24px 64px rgba(15,42,58,.28); font-family: Inter, system-ui, sans-serif; }
      .lead-popup__close { position: absolute; top: 1rem; right: 1rem; width: 2.25rem; height: 2.25rem; border: 0; border-radius: 999px; background: rgba(15,42,58,.06); color: #0F2A3A; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
      .lead-popup__eyebrow { margin: 0 0 .5rem; font-size: .625rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(15,42,58,.4); }
      .lead-popup__title { margin: 0 0 .75rem; font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }
      .lead-popup__text { margin: 0 0 1.25rem; font-size: .9rem; line-height: 1.55; color: rgba(15,42,58,.55); font-weight: 300; }
      .lead-popup__form { display: flex; flex-direction: column; gap: .65rem; }
      .lead-popup__submit { width: 100%; padding: .95rem 1.25rem; border-radius: .75rem; font-size: .8rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; border: 0; cursor: pointer; margin-top: .25rem; }
      .lead-popup__legal { margin: .35rem 0 0; font-size: .65rem; line-height: 1.45; color: rgba(15,42,58,.4); }
      .lead-popup__legal a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
      .lead-popup__success { margin: 0; font-size: .95rem; font-weight: 600; color: #0F2A3A; }
    `;
    document.head.appendChild(s);
  }

  function init() {
    const cfg = popupCfg();
    if (!cfg.enabled || isProPage()) return;
    if (isCoolingDown(cfg.storageKey)) return;

    injectStyles();
    const modal = buildModal();
    document.body.appendChild(modal);

    let opened = false;
    let locked = false;

    function open(trigger) {
      if (opened || locked) return;
      opened = true;
      locked = true;
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      window.REDUCD?.trackEvent?.("popup_open", { trigger: trigger || "unknown", content_name: "lead_popup" });
      modal.querySelector('input[name="name"]')?.focus();
    }

    function close(persist) {
      modal.classList.remove("is-open");
      modal.hidden = true;
      document.body.style.overflow = "";
      if (persist !== false) setCooldown(cfg.storageKey, cfg.cooldownDays);
      locked = true;
    }

    modal.querySelectorAll("[data-lead-popup-close]").forEach((el) => {
      el.addEventListener("click", () => close(true));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close(true);
    });

    const form = modal.querySelector("#leadPopupForm");
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
        setTimeout(() => close(true), 1800);
      }, 700);
    });

    // Hooks
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

    // Manual open: any [data-open-lead-popup]
    document.querySelectorAll("[data-open-lead-popup]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        locked = false;
        opened = false;
        open("manual");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
