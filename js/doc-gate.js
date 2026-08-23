/**
 * Shared lead-gate for REDUCD documentation pages.
 * Per document unlock (localStorage), tracks generate_lead.
 */
(function () {
  const DAYS = 180;
  const params = new URLSearchParams(location.search);
  const docId = params.get("id") || "";
  const audience = params.get("for") === "pro" ? "pro" : "particulier";

  function key() {
    return "reducd_doc_unlock_" + audience + "_" + docId;
  }

  function isUnlocked() {
    try {
      const raw = localStorage.getItem(key());
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.until || Date.now() > data.until) {
        localStorage.removeItem(key());
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function unlock(meta) {
    try {
      localStorage.setItem(
        key(),
        JSON.stringify({
          until: Date.now() + DAYS * 24 * 60 * 60 * 1000,
          name: meta.name || "",
          at: Date.now()
        })
      );
    } catch (e) {}
  }

  function setUi(unlocked) {
    const gate = document.getElementById("docGate");
    const body = document.getElementById("docBody");
    if (gate) gate.hidden = unlocked;
    if (body) body.hidden = !unlocked;
  }

  function bind() {
    const form = document.getElementById("docGateForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = "Even geduld…";
      btn.disabled = true;
      const data = Object.fromEntries(new FormData(form).entries());
      window.REDUCD?.trackLead?.({
        content_name: "docs_" + docId,
        lead_source: "docs_gate",
        customer_type: audience === "pro" ? "installateur" : data.customerType || "particulier"
      });
      unlock({ name: data.name });
      setTimeout(() => {
        setUi(true);
        document.getElementById("docBody")?.scrollIntoView({ behavior: "smooth", block: "start" });
        btn.textContent = orig;
        btn.disabled = false;
      }, 350);
    });
  }

  window.REDUCD_DOC_GATE = { docId, audience, isUnlocked, setUi };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bind();
      setUi(isUnlocked());
    });
  } else {
    bind();
    setUi(isUnlocked());
  }
})();
