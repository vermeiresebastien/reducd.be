/**
 * VLAREM-rekentool — lead-gate + theoretische restwaarde aan de perceelsgrens.
 * Puntbronmodel: Lp = Lw − 20·log10(r) − 11 + 10·log10(Q) + Kbodem
 */
(function () {
  const UNLOCK_KEY = "reducd_vlarem_unlock";
  const UNLOCK_DAYS = 180;

  const AREAS = {
    woon: { label: "Woongebied", day: 45, eve: 40, night: 35 },
    landelijk: { label: "Landelijk / verblijfsrecreatie", day: 40, eve: 35, night: 30 },
    agrarisch: { label: "Agrarisch gebied", day: 45, eve: 40, night: 35 },
    recreatie: { label: "Recreatiegebied", day: 45, eve: 40, night: 35 },
    woon_industrie: { label: "Woongebied < 500 m van industrie", day: 50, eve: 45, night: 40 }
  };

  const PLACEMENT = {
    field: { label: "Vrij veld (geen muren dichtbij)", q: 2, extra: 0 },
    wall: { label: "Tegen één muur / gevel", q: 4, extra: 3 },
    corner: { label: "In een hoek (twee muren)", q: 8, extra: 6 },
    niche: { label: "Tussen drie vlakken / nis", q: 16, extra: 9 }
  };

  const GROUND = {
    soft: { label: "Zacht — gras, tuin, aarde", k: 0 },
    mixed: { label: "Gemengd — deels tegel, deels groen", k: 1.5 },
    hard: { label: "Hard — tegel, beton, klinkers, water", k: 3 }
  };

  function pumps() {
    return Array.isArray(window.REDUCD_VLAREM_PUMPS) ? window.REDUCD_VLAREM_PUMPS : [];
  }

  function brands() {
    return [...new Set(pumps().map((p) => p.brand))].sort((a, b) => a.localeCompare(b, "nl"));
  }

  function modelsFor(brand) {
    return pumps()
      .filter((p) => p.brand === brand)
      .sort((a, b) => a.model.localeCompare(b.model, "nl"));
  }

  function isUnlocked() {
    try {
      const raw = localStorage.getItem(UNLOCK_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.until || Date.now() > data.until) {
        localStorage.removeItem(UNLOCK_KEY);
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
        UNLOCK_KEY,
        JSON.stringify({
          until: Date.now() + UNLOCK_DAYS * 24 * 60 * 60 * 1000,
          name: meta.name || "",
          at: Date.now()
        })
      );
    } catch (e) {}
  }

  function toLw(mode, value) {
    if (value === "" || value == null) return null;
    const n = Number(value);
    if (!Number.isFinite(n) || n < 20 || n > 110) return null;
    if (mode === "lpa") return n + 8;
    return n;
  }

  function calc(input) {
    const r = Math.max(Number(input.distance) || 0, 0.5);
    const lw = toLw(input.sourceMode, input.sourceValue);
    if (lw == null) return null;
    const place = PLACEMENT[input.placement] || PLACEMENT.field;
    const ground = GROUND[input.ground] || GROUND.soft;
    const area = AREAS[input.area] || AREAS.woon;
    const distLoss = 20 * Math.log10(r);
    const qTerm = 10 * Math.log10(place.q);
    const lp = lw - distLoss - 11 + qTerm + ground.k;
    const enclosure = Number(input.enclosure) || 0;
    const lpEnc = lp - enclosure;
    return {
      r,
      lw: round1(lw),
      distLoss: round1(distLoss),
      qTerm: round1(qTerm),
      extra: place.extra,
      groundK: ground.k,
      lp: round1(lp),
      lpEnc: round1(lpEnc),
      enclosure,
      area,
      place,
      ground,
      checks: {
        bare: compare(lp, area),
        enc: enclosure ? compare(lpEnc, area) : null
      }
    };
  }

  function compare(lp, area) {
    return {
      day: { limit: area.day, margin: round1(area.day - lp), ok: lp <= area.day },
      eve: { limit: area.eve, margin: round1(area.eve - lp), ok: lp <= area.eve },
      night: { limit: area.night, margin: round1(area.night - lp), ok: lp <= area.night }
    };
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function el(id) {
    return document.getElementById(id);
  }

  function fillSelect(select, items, first) {
    select.innerHTML = "";
    const opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = first;
    select.appendChild(opt0);
    items.forEach((item) => {
      const opt = document.createElement("option");
      if (typeof item === "string") {
        opt.value = item;
        opt.textContent = item;
      } else {
        opt.value = item.value;
        opt.textContent = item.label;
      }
      select.appendChild(opt);
    });
  }

  function currentInput() {
    const sourceMode = document.querySelector('input[name="sourceMode"]:checked')?.value || "lwa";
    return {
      sourceMode,
      sourceValue: el("sourceValue").value,
      distance: el("distance").value,
      placement: el("placement").value,
      ground: el("ground").value,
      area: el("area").value,
      enclosure: el("withEnclosure").checked ? Number(el("enclosureDb").value) || 14 : 0
    };
  }

  function badge(ok) {
    return ok
      ? '<span class="vlarem-ok">Voldoet</span>'
      : '<span class="vlarem-fail">Overschrijdt</span>';
  }

  function periodRow(label, row) {
    const sign = row.margin >= 0 ? "+" : "";
    return (
      '<div class="vlarem-row">' +
      "<div><strong>" +
      label +
      '</strong><span class="vlarem-muted"> Richtwaarde ' +
      row.limit +
      " dB(A)</span></div>" +
      "<div>" +
      badge(row.ok) +
      ' <span class="vlarem-margin">' +
      sign +
      row.margin.toFixed(1) +
      " dB</span></div>" +
      "</div>"
    );
  }

  function renderResult(result) {
    const box = el("vlaremResult");
    if (!result) {
      box.innerHTML = '<p class="text-brand-navy/50 font-light">Vul bronsterkte en afstand in om te rekenen.</p>';
      return;
    }
    const nightOk = result.checks.bare.night.ok;
    const headline = nightOk
      ? "Theoretisch binnen de nachtrichtwaarde"
      : "Theoretisch boven de nachtrichtwaarde";
    let html =
      '<div class="vlarem-hero-result ' +
      (nightOk ? "is-ok" : "is-fail") +
      '">' +
      '<p class="vlarem-kicker">Restwaarde aan de perceelsgrens</p>' +
      '<p class="vlarem-lp">' +
      result.lp.toFixed(1).replace(".", ",") +
      ' <span>dB(A)</span></p>' +
      "<p>" +
      headline +
      " voor <strong>" +
      result.area.label +
      "</strong>.</p>" +
      "</div>" +
      '<div class="vlarem-periods">' +
      periodRow("Overdag 7–19u", result.checks.bare.day) +
      periodRow("Avond 19–22u", result.checks.bare.eve) +
      periodRow("Nacht 22–7u", result.checks.bare.night) +
      "</div>";

    if (result.checks.enc) {
      html +=
        '<div class="vlarem-enc">' +
        "<p><strong>Met REDUCD-omkasting (−" +
        result.enclosure +
        " dB)</strong> rest <strong>" +
        result.lpEnc.toFixed(1).replace(".", ",") +
        " dB(A)</strong> — nacht " +
        (result.checks.enc.night.ok ? "binnen" : "boven") +
        " de richtwaarde (" +
        (result.checks.enc.night.margin >= 0 ? "+" : "") +
        result.checks.enc.night.margin.toFixed(1) +
        " dB).</p>" +
        "</div>";
    }

    html +=
      '<dl class="vlarem-break">' +
      "<div><dt>Bron Lw</dt><dd>" +
      result.lw.toFixed(1) +
      " dB(A)</dd></div>" +
      "<div><dt>Afstandsdamping</dt><dd>−" +
      result.distLoss.toFixed(1) +
      " dB (" +
      result.r.toString().replace(".", ",") +
      " m)</dd></div>" +
      "<div><dt>Opstelling</dt><dd>+" +
      result.extra +
      " dB · " +
      result.place.label +
      "</dd></div>" +
      "<div><dt>Ondergrond</dt><dd>+" +
      result.groundK +
      " dB · " +
      result.ground.label +
      "</dd></div>" +
      "</dl>" +
      '<p class="vlarem-formula">Lp = Lw − 20·log₁₀(r) − 11 + 10·log₁₀(Q) + K<sub>bodem</sub></p>';

    box.innerHTML = html;
  }

  function refresh() {
    renderResult(calc(currentInput()));
  }

  function applyPump(pump) {
    if (!pump) return;
    el("sourceValue").value = pump.lwa;
    document.querySelector('input[name="sourceMode"][value="lwa"]').checked = true;
    el("sourceHint").textContent =
      "Uit de lijst: max. geluidsvermogen LwA " + pump.lwa + " dB(A) (indicatief, fiche EN 12102).";
    refresh();
  }

  function onBrandChange() {
    const brand = el("brand").value;
    const model = el("model");
    if (!brand) {
      fillSelect(model, [], "Eerst een merk kiezen");
      model.disabled = true;
      return;
    }
    const items = modelsFor(brand).map((p, i) => ({
      value: String(pumps().indexOf(p)),
      label: p.model + " · " + p.lwa + " dB(A)"
    }));
    items.push({ value: "manual", label: "Mijn type staat er niet bij — handmatig" });
    fillSelect(model, items, "Kies type / vermogen");
    model.disabled = false;
  }

  function onModelChange() {
    const v = el("model").value;
    if (v === "manual" || v === "") {
      el("sourceHint").textContent =
        "Vul het cijfer van de fiche in: geluidsvermogen (LwA) of geluidsdruk op 1 m (LpA).";
      refresh();
      return;
    }
    const pump = pumps()[Number(v)];
    applyPump(pump);
  }

  function setUnlockedUi() {
    el("vlaremGate").hidden = true;
    el("vlaremTool").hidden = false;
  }

  function bindGate() {
    const form = el("vlaremGateForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = "Even geduld…";
      btn.disabled = true;
      const data = Object.fromEntries(new FormData(form).entries());
      window.REDUCD?.trackLead?.({
        content_name: "vlarem_rekentool",
        lead_source: "vlarem_gate",
        customer_type: data.customerType || "particulier"
      });
      unlock({ name: data.name });
      setTimeout(() => {
        setUnlockedUi();
        el("vlaremTool").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
      }, 800);
    });
  }

  function init() {
    fillSelect(el("brand"), brands(), "Kies merk");
    fillSelect(el("model"), [], "Eerst een merk kiezen");
    el("model").disabled = true;
    fillSelect(
      el("placement"),
      Object.entries(PLACEMENT).map(([value, p]) => ({ value, label: p.label })),
      "Kies opstelling"
    );
    fillSelect(
      el("ground"),
      Object.entries(GROUND).map(([value, g]) => ({ value, label: g.label })),
      "Kies ondergrond"
    );
    fillSelect(
      el("area"),
      Object.entries(AREAS).map(([value, a]) => ({
        value,
        label: a.label + " · nacht " + a.night + " dB(A)"
      })),
      "Kies gebied"
    );
    el("placement").value = "field";
    el("ground").value = "soft";
    el("area").value = "woon";

    el("brand").addEventListener("change", onBrandChange);
    el("model").addEventListener("change", onModelChange);
    ["sourceValue", "distance", "placement", "ground", "area", "enclosureDb"].forEach((id) => {
      el(id)?.addEventListener("input", refresh);
      el(id)?.addEventListener("change", refresh);
    });
    document.querySelectorAll('input[name="sourceMode"]').forEach((r) => r.addEventListener("change", refresh));
    el("withEnclosure")?.addEventListener("change", () => {
      el("enclosureWrap").hidden = !el("withEnclosure").checked;
      refresh();
    });

    bindGate();
    if (isUnlocked()) setUnlockedUi();
    refresh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
