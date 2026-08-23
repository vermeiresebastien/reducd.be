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

  function adsSendTo() {
    const id = cfg().googleAdsId;
    const label = cfg().googleAdsConversionLabel;
    if (!isAdsReady()) return null;
    if (label && label !== "PLACEHOLDER" && !String(label).startsWith("YOUR_")) {
      return id + "/" + label;
    }
    return null;
  }

  function ensureGtag() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

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
    if (value === "accepted") startTracking();
  }

  /** Primary lead conversion: GA4 generate_lead + Ads conversion + Meta Lead */
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
      const sendTo = adsSendTo();
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
        #cookie-banner .cookie-inner { position:fixed;bottom:0;left:0;right:0;z-index:80;padding:1rem;pointer-events:none; }
        #cookie-banner .cookie-panel { max-width:42rem;margin:0 auto;pointer-events:auto;background:#0F2A3A;color:#fff;border-radius:1rem;padding:1.25rem 1.5rem;box-shadow:0 16px 48px rgba(15,42,58,.35);font-family:Inter,system-ui,sans-serif; }
        #cookie-banner .cookie-actions { display:flex;flex-wrap:wrap;gap:.5rem; }
        @media (max-width: 480px) {
          #cookie-banner .cookie-inner { padding:.75rem; }
          #cookie-banner .cookie-panel { padding:1rem 1.1rem; }
          #cookie-banner .cookie-copy { font-size:.8rem; margin-bottom:.75rem !important; }
          #cookie-banner .cookie-actions { flex-direction:column; }
          #cookie-banner .cookie-actions button { width:100%; text-align:center; }
        }
      </style>
      <div class="cookie-inner">
        <div class="cookie-panel">
          <p class="cookie-copy" style="font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.75);margin:0 0 1rem;">
            We gebruiken cookies voor statistieken en advertenties (Meta / Google), zodat we onze site en campagnes kunnen verbeteren.
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
    else if (/\/(blog|admin|pro|vlarem|docs)(\/|$)/i.test(path)) prefix = "../";
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
  window.REDUCD.startTracking = startTracking;

  document.addEventListener("DOMContentLoaded", () => {
    if (hasConsent()) startTracking();
    else renderBanner();
    setTimeout(fixPrivacyHref, 0);
  });
})();
