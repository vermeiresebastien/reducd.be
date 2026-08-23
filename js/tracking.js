/**
 * Consent-gated Meta Pixel + GA4 + Google Ads helpers for REDUCD.
 * Requires js/tracking-config.js loaded first.
 */
(function () {
  const CONSENT_KEY = "reducd_cookie_consent";
  const cfg = () => window.REDUCD_TRACKING || {};

  function hasConsent() {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  }

  function isMetaReady() {
    const id = cfg().metaPixelId;
    return id && id !== "PLACEHOLDER" && !String(id).startsWith("YOUR_");
  }

  function isGa4Ready() {
    const id = cfg().ga4MeasurementId;
    return id && id !== "PLACEHOLDER" && !String(id).startsWith("YOUR_");
  }

  function isAdsReady() {
    const id = cfg().googleAdsId;
    return id && id !== "PLACEHOLDER" && !String(id).startsWith("YOUR_") && String(id).startsWith("AW-");
  }

  function adsLabel(key) {
    const label = cfg()[key];
    return label && label !== "PLACEHOLDER" && !String(label).startsWith("YOUR_") ? label : null;
  }

  function adsSendTo(kind) {
    const id = cfg().googleAdsId;
    if (!isAdsReady()) return null;
    let label = adsLabel("googleAdsConversionLabel");
    if (kind === "popup") label = adsLabel("googleAdsPopupConversionLabel");
    if (kind === "phone") label = adsLabel("googleAdsPhoneConversionLabel");
    if (kind === "calculator") label = adsLabel("googleAdsCalculatorConversionLabel");
    if (!label) return null;
    return id + "/" + label;
  }

  function ensureGtag() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

  function consentDenied() {
    return {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    };
  }

  function applyDefaultConsent() {
    ensureGtag();
    window.gtag("consent", "default", Object.assign({ wait_for_update: 500 }, consentDenied()));
  }

  applyDefaultConsent();

  function loadMetaPixel(id) {
    if (window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  function loadGoogleTags() {
    ensureGtag();
    const ga4 = cfg().ga4MeasurementId;
    const ads = cfg().googleAdsId;
    if (!document.getElementById("ga4-script")) {
      const primary = isGa4Ready() ? ga4 : isAdsReady() ? ads : null;
      if (!primary) return;
      const s = document.createElement("script");
      s.id = "ga4-script";
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(primary);
      document.head.appendChild(s);
      window.gtag("js", new Date());
    }
    if (isGa4Ready()) {
      window.gtag("config", ga4, { anonymize_ip: true });
    }
    if (isAdsReady()) {
      window.gtag("config", ads);
    }
  }

  function startTracking() {
    if (!hasConsent()) return;
    if (isMetaReady()) loadMetaPixel(cfg().metaPixelId);
    if (isGa4Ready() || isAdsReady()) loadGoogleTags();
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.remove();
    ensureGtag();
    if (value === "accepted") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted"
      });
      startTracking();
    } else {
      window.gtag("consent", "update", consentDenied());
    }
  }

  /** Primary lead conversion: only after a successful form submit, never on CTA click. */
  function trackLead(extra) {
    if (!hasConsent()) return;
    const payload = Object.assign({ event_category: "lead" }, extra || {});
    if (window.fbq && isMetaReady()) {
      window.fbq("track", "Lead", payload);
    }
    if (window.gtag && (isGa4Ready() || isAdsReady())) {
      if (isGa4Ready()) {
        window.gtag("event", "generate_lead", payload);
      }
      const kind = payload.lead_source === "popup" ? "popup" : "form";
      const sendTo = adsSendTo(kind);
      if (sendTo) {
        window.gtag("event", "conversion", {
          send_to: sendTo,
          event_callback: function () {}
        });
      }
    }
  }

  function trackContact(method) {
    if (!hasConsent()) return;
    if (window.fbq && isMetaReady()) {
      window.fbq("track", "Contact", { method: method || "unknown" });
    }
    if (window.gtag && isGa4Ready()) {
      window.gtag("event", "contact", { method: method || "unknown" });
    }
    if (/phone/i.test(String(method || ""))) {
      const sendTo = adsSendTo("phone");
      if (window.gtag && sendTo) {
        window.gtag("event", "conversion", { send_to: sendTo });
      }
    }
  }

  function trackCalculatorComplete(params) {
    if (!hasConsent()) return;
    if (window.gtag && isGa4Ready()) {
      window.gtag("event", "calculator_complete", params || {});
    }
    const sendTo = adsSendTo("calculator");
    if (window.gtag && sendTo) {
      window.gtag("event", "conversion", { send_to: sendTo });
    }
  }

  function trackEvent(name, params) {
    if (!hasConsent()) return;
    if (window.gtag && isGa4Ready()) {
      window.gtag("event", name, params || {});
    }
    if (window.fbq && isMetaReady() && name === "popup_open") {
      window.fbq("trackCustom", "PopupOpen", params || {});
    }
  }

  function renderBanner() {
    if (localStorage.getItem(CONSENT_KEY)) return;
    if (document.getElementById("cookie-banner")) return;
    const el = document.createElement("div");
    el.id = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Cookievoorkeuren");
    el.innerHTML = `
      <style>
        #cookie-banner .cookie-inner { position:fixed;bottom:1rem;right:1rem;left:auto;z-index:80;padding:0;pointer-events:none;width:min(20.5rem,calc(100vw - 1.5rem)); }
        #cookie-banner .cookie-panel { pointer-events:auto;background:#0F2A3A;color:#fff;border-radius:1rem;padding:.85rem 1rem;box-shadow:0 16px 40px rgba(15,42,58,.32);font-family:Inter,system-ui,sans-serif; }
        #cookie-banner .cookie-actions { display:flex;flex-wrap:wrap;gap:.4rem; }
        @media (max-width: 640px) {
          #cookie-banner .cookie-inner { left:.75rem;right:.75rem;bottom:.75rem;width:auto; }
          #cookie-banner .cookie-panel { padding:.75rem .85rem; }
          #cookie-banner .cookie-copy { font-size:.75rem; margin-bottom:.6rem !important; }
          #cookie-banner .cookie-actions button { flex:1; text-align:center; padding:.55rem .7rem !important; font-size:.68rem !important; }
        }
      </style>
      <div class="cookie-inner">
        <div class="cookie-panel">
          <p class="cookie-copy" style="font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.75);margin:0 0 1rem;">
            Cookies voor statistieken en advertenties.
            <a href="privacy.html" data-privacy-link style="color:#fff;text-decoration:underline;text-underline-offset:2px;">Privacybeleid</a>
          </p>
          <div class="cookie-actions">
            <button type="button" data-consent="accepted" style="background:#fff;color:#0F2A3A;border:0;border-radius:999px;padding:.65rem 1.1rem;font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;">Alles accepteren</button>
            <button type="button" data-consent="rejected" style="background:transparent;color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:.65rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;">Alleen noodzakelijk</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelectorAll("[data-consent]").forEach((btn) => {
      btn.addEventListener("click", () => setConsent(btn.getAttribute("data-consent")));
    });
  }

  function fixPrivacyHref() {
    const path = location.pathname;
    let prefix = "";
    if (/\/pro\/docs(\/|$)/i.test(path)) prefix = "../../";
    else if (/\/(blog|admin|pro|vlarem|docs|projecten|geluid-warmtepomp-buren|akoestische-omkasting-warmtepomp|voor-installateurs)(\/|$)/i.test(path)) prefix = "../";
    document.querySelectorAll("[data-privacy-link]").forEach((link) => {
      link.setAttribute("href", prefix + "privacy.html");
    });
  }

  window.REDUCD = window.REDUCD || {};
  window.REDUCD.hasConsent = hasConsent;
  window.REDUCD.setConsent = setConsent;
  window.REDUCD.trackLead = trackLead;
  window.REDUCD.trackContact = trackContact;
  window.REDUCD.trackEvent = trackEvent;
  window.REDUCD.trackCalculatorComplete = trackCalculatorComplete;
  window.REDUCD.startTracking = startTracking;

  document.addEventListener("DOMContentLoaded", () => {
    if (hasConsent()) {
      ensureGtag();
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted"
      });
      startTracking();
    } else renderBanner();
    setTimeout(fixPrivacyHref, 0);
    document.addEventListener("click", (e) => {
      const contact = e.target.closest && e.target.closest("[data-track-contact]");
      if (contact) window.REDUCD.trackContact(contact.getAttribute("data-track-contact"));
      document.querySelectorAll("details.nav-dd[open]").forEach((d) => {
        if (!d.contains(e.target)) d.removeAttribute("open");
      });
    });
  });
})();
