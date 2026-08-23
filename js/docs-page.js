/**
 * Fills a gated documentation page from REDUCD_DOCS + URL ?id=&for=
 */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || "";
    const audience = params.get("for") === "pro" ? "pro" : "particulier";
    const catalog = window.REDUCD_DOCS || {};
    const doc = catalog[id];

    const gate = document.getElementById("docGate");
    const body = document.getElementById("docBody");
    const article = document.getElementById("docArticle");
    const pdfLink = document.getElementById("docPdf");
    const titleEls = document.querySelectorAll("[data-doc-title]");
    const kickerEls = document.querySelectorAll("[data-doc-kicker]");
    const summaryEls = document.querySelectorAll("[data-doc-summary]");
    const hubLink = document.getElementById("docHubLink");
    const companyWrap = document.getElementById("docCompanyWrap");
    const typeWrap = document.getElementById("docTypeWrap");

    if (hubLink) {
      hubLink.href = audience === "pro" ? "../pro/docs/" : "./";
      hubLink.textContent = audience === "pro" ? "← Pro-documentatie" : "← Documentatie";
    }

    if (!doc) {
      document.title = "Document niet gevonden | REDUCD";
      titleEls.forEach((el) => { el.textContent = "Dit document bestaat niet"; });
      summaryEls.forEach((el) => {
        el.textContent = "Kies een document via de documentatiehub.";
      });
      if (gate) gate.hidden = true;
      if (body) {
        body.hidden = false;
        if (article) {
          article.innerHTML = '<p>Ga terug naar de <a href="./">documentatie voor particulieren</a> of de <a href="../pro/docs/">hub voor installateurs</a>.</p>';
        }
      }
      return;
    }

    const title = doc.title;
    const pageTitle = title + " | REDUCD";
    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", doc.summary);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://www.reducd.be/docs/view.html?id=" + encodeURIComponent(id) + "&for=" + audience);
    }

    titleEls.forEach((el) => { el.textContent = title; });
    kickerEls.forEach((el) => { el.textContent = doc.kicker || (audience === "pro" ? "Installateurs" : "Particulieren"); });
    summaryEls.forEach((el) => { el.textContent = doc.summary; });

    if (companyWrap) companyWrap.hidden = audience !== "pro";
    if (typeWrap) typeWrap.hidden = audience === "pro";
    const company = document.getElementById("docCompany");
    if (company) company.required = audience === "pro";

    if (article) article.innerHTML = typeof doc.html === "function" ? doc.html(audience) : (doc.html || "");
    if (pdfLink && doc.pdf) {
      pdfLink.href = doc.pdf;
      pdfLink.download = "";
      pdfLink.setAttribute("target", "_blank");
      pdfLink.setAttribute("rel", "noopener");
    }
  });
})();
