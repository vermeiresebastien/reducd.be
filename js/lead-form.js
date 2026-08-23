/**
 * Qualified intake on #lead-form: short mobile fields, address suggest, extras.
 */
(function () {
  const KEY = "reducd_calc_lead";

  function form() {
    return document.getElementById("lead-form");
  }

  function readCalc() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setVal(el, value) {
    if (!el || value == null || value === "") return;
    el.value = String(value);
  }

  function applyJourney(root, type) {
    const journey = type || "particulier";
    root.setAttribute("data-journey", journey);
    const company = root.querySelector('[name="company"]');
    if (company) company.required = journey !== "particulier";
    const hint = root.querySelector("[data-journey-hint]");
    if (!hint) return;
    if (journey === "installateur") {
      hint.textContent = "Voor installateurs: we reageren binnen 24 uur. Een meting volgt alleen als het project dat vraagt.";
    } else if (journey === "bedrijf") {
      hint.textContent = "Voor bedrijven: stuur adres en eventueel extra info. Eerst een situatiecheck, reactie binnen 24 uur.";
    } else {
      hint.textContent = "Vier velden volstaan. Extra info is optioneel. Reactie binnen 24 uur.";
    }
  }

  function openExtras(root) {
    const extras = root.querySelector("[data-lead-extras]");
    if (extras) extras.open = true;
  }

  function prefill(root) {
    const data = readCalc();
    if (!data) return;
    setVal(root.querySelector('[name="height"]'), data.height);
    setVal(root.querySelector('[name="width"]'), data.width);
    setVal(root.querySelector('[name="depth"]'), data.depth);
    setVal(root.querySelector('[name="brand"]'), data.brand);
    setVal(root.querySelector('[name="model"]'), data.model);
    if (data.setup) {
      const radio = root.querySelector('input[name="setup"][value="' + data.setup + '"]');
      if (radio) radio.checked = true;
    }
    const msg = root.querySelector('[name="message"]');
    if (msg && data.summary && !msg.value) msg.value = data.summary;
    const banner = root.querySelector("[data-calc-prefill]");
    if (banner && data.summary) {
      banner.hidden = false;
      banner.textContent = "Calculator meegenomen: " + data.summary;
    }
    openExtras(root);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function splitStreetNumber(text) {
    const s = String(text || "").trim();
    const m = s.match(/^(.*?)[\s,]+(\d+[a-zA-Z]?(?:\s*[-/]\s*\d+[a-zA-Z]?)?(?:\s*(?:bus|bt|box)\s*\w+)?)\s*$/i);
    if (m) return { street: m[1].replace(/,$/, "").trim(), number: m[2].replace(/\s+/g, " ").trim() };
    return { street: s, number: "" };
  }

  function parseGeopunt(json) {
    return (json.SuggestionResult || []).map(function (label) {
      const m = String(label).match(/,\s*(\d{4})\s+(.+)$/);
      const head = String(label).split(",")[0].trim();
      const parts = splitStreetNumber(head);
      return {
        label: label,
        postcode: m ? m[1] : "",
        city: m ? m[2] : "",
        street: parts.street || head,
        number: parts.number
      };
    });
  }

  function parsePhoton(json) {
    return (json.features || []).map(function (f) {
      const p = f.properties || {};
      const city = p.city || p.town || p.village || p.municipality || "";
      const number = p.housenumber || "";
      const streetName = p.street || p.name || "";
      const street = [streetName, number].filter(Boolean).join(" ");
      const postcode = p.postcode || "";
      const label = [street, [postcode, city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
      return { label: label, postcode: postcode, city: city, street: streetName || street, number: number };
    }).filter(function (r) { return r.label; });
  }

  function initAddress(root) {
    const input = root.querySelector("#lead-address");
    const list = root.querySelector("#lead-address-list");
    const postcode = root.querySelector('[name="postcode"]');
    const city = root.querySelector('[name="city"]');
    const numberEl = root.querySelector('[name="houseNumber"]');
    const wrap = root.querySelector(".addr-wrap");
    if (!input || !list) return;

    let items = [];
    let active = -1;
    let timer;
    let seq = 0;

    function hide() {
      list.hidden = true;
      list.innerHTML = "";
      items = [];
      active = -1;
      input.setAttribute("aria-expanded", "false");
    }

    function paint() {
      list.querySelectorAll(".addr-opt").forEach(function (btn, i) {
        btn.setAttribute("aria-selected", i === active ? "true" : "false");
      });
    }

    function pick(i) {
      const row = items[i];
      if (!row) return;
      input.value = row.street || splitStreetNumber(row.label.split(",")[0] || "").street || row.label;
      if (numberEl && row.number) numberEl.value = row.number;
      if (postcode) postcode.value = row.postcode || "";
      if (city) city.value = row.city || "";
      if (numberEl) numberEl.setCustomValidity("");
      hide();
      if (numberEl && !row.number) numberEl.focus();
    }

    function show(rows) {
      items = rows.slice(0, 6);
      active = items.length ? 0 : -1;
      list.innerHTML = items.map(function (r, i) {
        return '<li><button type="button" class="addr-opt" role="option" id="addr-opt-' + i + '" aria-selected="' + (i === 0 ? "true" : "false") + '">' + escapeHtml(r.label) + "</button></li>";
      }).join("");
      list.hidden = !items.length;
      input.setAttribute("aria-expanded", items.length ? "true" : "false");
      list.querySelectorAll(".addr-opt").forEach(function (btn, i) {
        btn.addEventListener("mousedown", function (e) {
          e.preventDefault();
          pick(i);
        });
      });
    }

    async function search(q) {
      const id = ++seq;
      try {
        const geoRes = await fetch("https://geo.api.vlaanderen.be/geolocation/v4/Suggestion?c=6&q=" + encodeURIComponent(q));
        if (id !== seq) return;
        if (geoRes.ok) {
          const geo = parseGeopunt(await geoRes.json());
          if (geo.length) {
            show(geo);
            return;
          }
        }
      } catch (e) {}
      try {
        const url = "https://photon.komoot.io/api/?lang=nl&limit=6&lat=50.85&lon=4.35&q=" + encodeURIComponent(q);
        const res = await fetch(url);
        if (id !== seq) return;
        show(parsePhoton(await res.json()));
      } catch (e) {
        if (id !== seq) return;
        hide();
      }
    }

    input.addEventListener("input", function () {
      if (postcode) postcode.value = "";
      if (city) city.value = "";
      const q = input.value.trim();
      clearTimeout(timer);
      if (q.length < 3) {
        hide();
        return;
      }
      timer = setTimeout(function () { search(q); }, 280);
    });

    input.addEventListener("keydown", function (e) {
      if (list.hidden || !items.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = Math.min(active + 1, items.length - 1);
        paint();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = Math.max(active - 1, 0);
        paint();
      } else if (e.key === "Enter" && active >= 0) {
        e.preventDefault();
        pick(active);
      } else if (e.key === "Escape") {
        hide();
      }
    });

    document.addEventListener("click", function (e) {
      if (wrap && !wrap.contains(e.target)) hide();
    });

    if (numberEl) {
      numberEl.addEventListener("input", function () {
        numberEl.setCustomValidity(/\d/.test(numberEl.value.trim()) ? "" : "Vul een huisnummer in.");
      });
    }
  }

  function requireHouseNumber(root) {
    const nr = root.querySelector('[name="houseNumber"]');
    if (!nr) return true;
    const val = nr.value.trim();
    if (!/\d/.test(val)) {
      nr.setCustomValidity("Vul een huisnummer in.");
      nr.reportValidity();
      nr.focus();
      return false;
    }
    nr.setCustomValidity("");
    return true;
  }

  function init() {
    const root = form();
    if (!root) return;
    const typeSel = root.querySelector('[name="customerType"]');
    applyJourney(root, typeSel && typeSel.value);
    typeSel?.addEventListener("change", () => applyJourney(root, typeSel.value));
    prefill(root);
    initAddress(root);

    root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!requireHouseNumber(root) || !root.checkValidity()) {
        root.reportValidity();
        return;
      }
      const btn = root.querySelector('button[type="submit"]');
      const orig = btn ? btn.textContent : "";
      if (btn) {
        btn.textContent = "Verzenden…";
        btn.disabled = true;
      }
      const type = (typeSel && typeSel.value) || "particulier";
      window.REDUCD?.trackLead?.({
        content_name: "situatiecheck",
        customer_type: type,
        lead_source: readCalc() ? "calculator_form" : "contact_form"
      });
      setTimeout(() => {
        if (btn) btn.textContent = "✓ Verstuurd";
        try { sessionStorage.removeItem(KEY); } catch (err) {}
        setTimeout(() => {
          root.reset();
          applyJourney(root, "particulier");
          const extras = root.querySelector("[data-lead-extras]");
          if (extras) extras.open = false;
          const banner = root.querySelector("[data-calc-prefill]");
          if (banner) banner.hidden = true;
          if (btn) {
            btn.textContent = orig;
            btn.disabled = false;
          }
        }, 2200);
      }, 900);
    });
  }

  window.REDUCD = window.REDUCD || {};
  window.REDUCD.saveCalcLead = function (data) {
    try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  };
  window.REDUCD.loadCalcLead = readCalc;
  window.REDUCD.openLeadExtras = function () {
    const root = form();
    if (root) openExtras(root);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
