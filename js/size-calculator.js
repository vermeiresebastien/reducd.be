/**
 * Homepage maatcalculator: kleinste standaardkast waarin de unit past,
 * plus pasvormklasse (ruim / ideaal / nauw / maatwerk).
 * Binnenmaten = mm uit de maattabel. Drempels: nauw < 40 mm, ideaal 40–99 mm, ruim ≥ 100 mm.
 */
(function () {
  const MODELS = {
    vrijstaand: [
      { size: "S", h: 990, w: 1090, d: 650, price: "2.335", db: "± 14 dB(A)", material: "Magnelis®", outer: { h: 1060, w: 1220, d: 950 } },
      { size: "L", h: 1350, w: 1250, d: 650, price: "2.865", db: "± 14 dB(A)", material: "Magnelis®", outer: { h: 1450, w: 1410, d: 950 } },
      { size: "XL", h: 1670, w: 1250, d: 650, price: "3.365", db: "± 14 dB(A)", material: "Magnelis®", outer: { h: 1770, w: 1410, d: 950 } }
    ],
    wand: [
      { size: "S", h: 990, w: 1060, d: 650, price: "2.335", db: "10–12 dB(A)", material: "Magnelis®", outer: { h: 1050, w: 1360, d: 805 } },
      { size: "L", h: 1310, w: 1250, d: 800, price: "2.865", db: "10–12 dB(A)", material: "Magnelis®", outer: { h: 1370, w: 1550, d: 955 } }
    ]
  };

  const COPY = {
    spacious: {
      label: "Ruim",
      kicker: "Ruim",
      advisory:
        "Er blijft ruim speling over. Dat is gunstig voor COP en luchtweg, en maakt service rond de unit eenvoudig. De buitenkant van de kast is iets groter dan strikt nodig. Dit is het waarschijnlijk passende model — definitief na inmeting."
    },
    perfect: {
      label: "Ideaal",
      kicker: "Ideaal",
      advisory:
        "De speling is in balans: compacte buitenzijde én genoeg ruimte voor akoestiek. Dit is het waarschijnlijk passende model dat we het vaakst adviseren, in afwachting van een finale check op locatie."
    },
    tight: {
      label: "Krap",
      kicker: "Krap",
      advisory:
        "De speling is krap. Controleer leidingbochten, antivibratievoeten en vrije hoogte. Overweeg de volgende maat of een korte check op locatie. De kastkeuze is waarschijnlijk, niet gegarandeerd."
    },
    custom: {
      label: "Maatwerk",
      kicker: "Maatwerk",
      advisory:
        "Deze unit valt buiten de standaard binnenmaten. We maken de kast op maat — vraag een situatiecheck aan, dan tekenen we de luchtweg correct."
    },
    idle: {
      label: "Vul je maten in",
      kicker: "Calculator",
      advisory:
        "Meet de buitenunit (hoogte × breedte × diepte, mm). Kies een catalogusmodel of vul zelf in. Tel voeten en leidingen ernaast/erachter mee via de opties — die zitten niet in de catalogusmaat."
    }
  };

  const root = document.getElementById("calculator");
  if (!root) return;

  const form = root.querySelector("[data-size-form]");
  const result = root.querySelector("[data-size-result]");
  const gaugeFill = root.querySelector("[data-fit-gauge-fill]");
  const gaugeMark = root.querySelector("[data-fit-gauge-mark]");
  const statusKicker = root.querySelector("[data-fit-kicker]");
  const statusLabel = root.querySelector("[data-fit-label]");
  const statusModel = root.querySelector("[data-fit-model]");
  const statusMeta = root.querySelector("[data-fit-meta]");
  const statusAdvisory = root.querySelector("[data-fit-advisory]");
  const unitRect = root.querySelector("[data-svg-unit]");
  const encBox = root.querySelector("[data-svg-enc-box]");
  const encTop = root.querySelector("[data-svg-enc-top]");
  const encSide = root.querySelector("[data-svg-enc-side]");
  const unitSide = root.querySelector("[data-svg-unit-side]");
  const cavity = root.querySelector("[data-svg-cavity]");
  const gapTop = root.querySelector("[data-svg-gap-top]");
  const gapSide = root.querySelector("[data-svg-gap-side]");
  const gapSideR = root.querySelector("[data-svg-gap-side-r]");
  const dimH = root.querySelector("[data-svg-dim-h]");
  const dimB = root.querySelector("[data-svg-dim-b]");
  const dimD = root.querySelector("[data-svg-dim-d]");
  const gapLabelH = root.querySelector("[data-svg-label-h]");
  const gapLabelB = root.querySelector("[data-svg-label-b]");
  const gapLabelD = root.querySelector("[data-svg-label-d]");
  const encLabel = root.querySelector("[data-svg-enc]");
  const cta = root.querySelector("[data-fit-cta]");
  const pdfBtn = root.querySelector("[data-fit-pdf]");
  const compareLede = root.querySelector("[data-compare-lede]");
  const compareCards = root.querySelectorAll("[data-compare-card]");
  const PLACE_Q = { field: 2, wall: 4, corner: 8, niche: 16 };
  const PLACE_PDF = {
    field: "vrij veld (Q=2)",
    wall: "1 muur (Q=4, +3 dB)",
    corner: "2 muren (Q=8, +6 dB)",
    niche: "nis (Q=16, +9 dB)"
  };
  const AREAS = {
    woon: { label: "woongebied", day: 45, eve: 40, night: 35 },
    landelijk: { label: "landelijk / verblijfsrecreatie", day: 40, eve: 35, night: 30 },
    agrarisch: { label: "agrarisch gebied", day: 45, eve: 40, night: 35 },
    recreatie: { label: "recreatiegebied", day: 45, eve: 40, night: 35 },
    woon_industrie: { label: "woongebied < 500 m van industrie", day: 50, eve: 45, night: 40 }
  };

  let previewSize = "";
  let lastType = "vrijstaand";
  let lastSnapshot = null;

  const DRAW = { x: 86, y: 40, w: 248, h: 228 };
  let svgPrev = null;
  let svgRaf = 0;

  function overflowTips(type, h, w, d) {
    const list = MODELS[type] || MODELS.vrijstaand;
    const maxH = Math.max.apply(null, list.map(function (m) { return m.h; }));
    const maxLong = Math.max.apply(null, list.map(function (m) { return Math.max(m.w, m.d); }));
    const maxShort = Math.max.apply(null, list.map(function (m) { return Math.min(m.w, m.d); }));
    const label = type === "wand" ? "wand L" : "vrijstaand XL";
    const tips = { height: "", width: "", depth: "" };
    if (h > maxH) {
      tips.height = "Max. " + maxH + " mm bij " + label + ". Deze hoogte past niet in een standaardkast.";
    }
    if (w > maxLong) {
      tips.width = "Max. " + maxLong + " mm bij " + label + ". Deze breedte past niet in een standaardkast.";
    }
    if (d > maxLong) {
      tips.depth = "Max. " + maxLong + " mm bij " + label + ". Deze diepte past niet in een standaardkast.";
    }
    if (w > 0 && d > 0 && !tips.width && !tips.depth && Math.min(w, d) > maxShort) {
      const pair = "Korte zijde max. " + maxShort + " mm bij " + label + ", ook gedraaid. Dit wordt maatwerk.";
      if (w > maxShort) tips.width = pair;
      if (d > maxShort) tips.depth = pair;
    }
    return tips;
  }

  function applyFieldTips(type, h, w, d) {
    const tips = overflowTips(type, h, w, d);
    ["height", "width", "depth"].forEach(function (name) {
      const input = form.elements[name];
      if (!input) return;
      const wrap = input.closest(".size-field");
      const tip = wrap && wrap.querySelector("[data-size-tip]");
      const msg = tips[name] || "";
      if (wrap) wrap.classList.toggle("is-over", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (tip) tip.textContent = msg;
    });
  }

  function num(el) {
    if (!el) return NaN;
    const v = parseFloat(String(el.value).replace(",", "."));
    return Number.isFinite(v) ? v : NaN;
  }

  function extraMm(selectName, moreName, fallbackMeerCm) {
    const sel = form.elements[selectName];
    if (!sel || sel.value === "" || sel.value === "0") return 0;
    if (sel.value === "meer") {
      const cm = num(form.elements[moreName]);
      return Math.round((Number.isFinite(cm) && cm > 0 ? cm : fallbackMeerCm) * 10);
    }
    return Math.round(Number(sel.value) * 10);
  }

  function measured() {
    const bodyH = num(form.elements.height);
    const bodyW = num(form.elements.width);
    const bodyD = num(form.elements.depth);
    const pipeSide = extraMm("pipeSide", "pipeSideMore", 50);
    const pipeBack = extraMm("pipeBack", "pipeBackMore", 50);
    const feet = form.elements.feetOn && form.elements.feetOn.checked
      ? extraMm("feetCm", "feetMore", 40)
      : 0;
    return {
      h: bodyH + (Number.isFinite(bodyH) ? feet : 0),
      w: bodyW + (Number.isFinite(bodyW) ? pipeSide : 0),
      d: bodyD + (Number.isFinite(bodyD) ? pipeBack : 0),
      bodyH: bodyH,
      bodyW: bodyW,
      bodyD: bodyD,
      pipeSide: pipeSide,
      pipeBack: pipeBack,
      feet: feet
    };
  }

  function syncExtraUi() {
    const side = form.elements.pipeSide && form.elements.pipeSide.value === "meer";
    const back = form.elements.pipeBack && form.elements.pipeBack.value === "meer";
    const feetOn = form.elements.feetOn && form.elements.feetOn.checked;
    const feetMeer = form.elements.feetCm && form.elements.feetCm.value === "meer";
    const wrapSide = form.querySelector('[data-more-wrap="pipeSide"]');
    const wrapBack = form.querySelector('[data-more-wrap="pipeBack"]');
    const wrapFeet = form.querySelector('[data-more-wrap="feetCm"]');
    const feetFields = form.querySelector("[data-feet-fields]");
    if (wrapSide) wrapSide.hidden = !side;
    if (wrapBack) wrapBack.hidden = !back;
    if (feetFields) feetFields.hidden = !feetOn;
    if (wrapFeet) wrapFeet.hidden = !(feetOn && feetMeer);
    const confirm = (form.querySelector('input[name="size-confirm"]:checked') || {}).value;
    const lock = confirm === "yes";
    ["height", "width", "depth"].forEach(function (name) {
      const input = form.elements[name];
      if (input) input.readOnly = lock;
    });
  }

  function updateTotalLine(m) {
    const el = form.querySelector("[data-size-total]");
    if (!el) return;
    if (!(m.bodyH > 0 && m.bodyW > 0 && m.bodyD > 0)) {
      el.textContent = "";
      return;
    }
    const bits = [];
    if (m.feet) bits.push("+" + m.feet + " mm voetjes op de hoogte");
    if (m.pipeSide) bits.push("+" + m.pipeSide + " mm leiding naast (breedte)");
    if (m.pipeBack) bits.push("+" + m.pipeBack + " mm leiding achter (diepte)");
    el.textContent = bits.length
      ? "Rekenmaat voor de kast: " + Math.round(m.h) + " × " + Math.round(m.w) + " × " + Math.round(m.d) + " mm (" + bits.join(", ") + ")."
      : "Rekenmaat = catalogus-/invoermaat, zonder extra voeten of leidingen.";
  }

  function units() {
    return window.REDUCD_UNIT_SIZES || [];
  }

  function fillUnitSelects() {
    const brandSel = form.elements.unitBrand;
    const modelSel = form.elements.unitModel;
    if (!brandSel || !modelSel) return;
    const list = units();
    const brands = [];
    list.forEach(function (u) {
      if (brands.indexOf(u.brand) === -1) brands.push(u.brand);
    });
    brands.sort();
    brands.forEach(function (b) {
      const opt = document.createElement("option");
      opt.value = b;
      opt.textContent = b;
      brandSel.appendChild(opt);
    });
    brandSel.addEventListener("change", function () {
      const brand = brandSel.value;
      modelSel.innerHTML = "";
      const first = document.createElement("option");
      first.value = "";
      first.textContent = brand ? "Kies type" : "Kies eerst een merk";
      modelSel.appendChild(first);
      modelSel.disabled = !brand;
      if (!brand) {
        const box = form.querySelector("[data-size-confirm]");
        if (box) box.hidden = true;
        return;
      }
      list.filter(function (u) { return u.brand === brand; }).forEach(function (u) {
        const opt = document.createElement("option");
        opt.value = u.model;
        opt.textContent = u.model;
        modelSel.appendChild(opt);
      });
    });
    modelSel.addEventListener("change", function () {
      const brand = brandSel.value;
      const model = modelSel.value;
      const hit = list.find(function (u) { return u.brand === brand && u.model === model; });
      const box = form.querySelector("[data-size-confirm]");
      if (!hit) {
        if (box) box.hidden = true;
        return;
      }
      if (form.elements.height) form.elements.height.value = String(hit.h);
      if (form.elements.width) form.elements.width.value = String(hit.w);
      if (form.elements.depth) form.elements.depth.value = String(hit.d);
      if (box) {
        box.hidden = false;
        const yes = form.querySelector('input[name="size-confirm"][value="yes"]');
        const no = form.querySelector('input[name="size-confirm"][value="no"]');
        if (yes) yes.checked = false;
        if (no) no.checked = false;
      }
      render();
    });
  }

  function minGap(g) {
    return Math.min(g.gh, g.gw, g.gd);
  }

  function tryFit(model, h, w, d) {
    const normal = { gh: model.h - h, gw: model.w - w, gd: model.d - d, swapped: false };
    const swapped = { gh: model.h - h, gw: model.w - d, gd: model.d - w, swapped: true };
    const okN = normal.gh >= 0 && normal.gw >= 0 && normal.gd >= 0;
    const okS = swapped.gh >= 0 && swapped.gw >= 0 && swapped.gd >= 0;
    if (okN && okS) return minGap(normal) >= minGap(swapped) ? normal : swapped;
    if (okN) return normal;
    if (okS) return swapped;
    return null;
  }

  function classify(gap) {
    if (gap < 40) return "tight";
    if (gap < 100) return "perfect";
    return "spacious";
  }

  function recommend(type, h, w, d) {
    const list = MODELS[type] || MODELS.vrijstaand;
    for (let i = 0; i < list.length; i++) {
      const gaps = tryFit(list[i], h, w, d);
      if (gaps) {
        const gap = minGap(gaps);
        return { model: list[i], type, gaps, gap, fit: classify(gap), next: list[i + 1] || null };
      }
    }
    return { model: null, type, gaps: null, gap: -1, fit: "custom", next: null };
  }

  function sceneScale(type) {
    const list = MODELS[type] || MODELS.vrijstaand;
    let maxH = 0;
    let maxW = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].h > maxH) maxH = list[i].h;
      if (list[i].w > maxW) maxW = list[i].w;
    }
    return Math.min(DRAW.h / maxH, DRAW.w / maxW);
  }

  function iso(dep) {
    return { ox: dep * 0.7, oy: -dep * 0.36 };
  }

  function polyRight(x, y, w, h, dep) {
    const o = iso(dep);
    return (x + w) + "," + y + " " + (x + w + o.ox) + "," + (y + o.oy) + " " + (x + w + o.ox) + "," + (y + h + o.oy) + " " + (x + w) + "," + (y + h);
  }

  function polyTop(x, y, w, dep) {
    const o = iso(dep);
    return x + "," + y + " " + (x + o.ox) + "," + (y + o.oy) + " " + (x + w + o.ox) + "," + (y + o.oy) + " " + (x + w) + "," + y;
  }

  function arrowPathV(x, y1, y2) {
    const a = 4;
    x = Math.round(x * 10) / 10;
    const top = Math.round(Math.min(y1, y2) * 10) / 10;
    const bot = Math.round(Math.max(y1, y2) * 10) / 10;
    if (bot - top < 6) return "";
    return (
      "M" + x + " " + top + " L" + x + " " + bot +
      " M" + (x - a) + " " + (top + a) + " L" + x + " " + top + " L" + (x + a) + " " + (top + a) +
      " M" + (x - a) + " " + (bot - a) + " L" + x + " " + bot + " L" + (x + a) + " " + (bot - a)
    );
  }

  function arrowPathH(x1, x2, y) {
    const a = 4;
    y = Math.round(y * 10) / 10;
    const left = Math.round(Math.min(x1, x2) * 10) / 10;
    const right = Math.round(Math.max(x1, x2) * 10) / 10;
    if (right - left < 6) return "";
    return (
      "M" + left + " " + y + " L" + right + " " + y +
      " M" + (left + a) + " " + (y - a) + " L" + left + " " + y + " L" + (left + a) + " " + (y + a) +
      " M" + (right - a) + " " + (y - a) + " L" + right + " " + y + " L" + (right - a) + " " + (y + a)
    );
  }

  function mixNum(a, b, t) {
    if (typeof b !== "number") return b;
    if (typeof a !== "number") return b;
    return a + (b - a) * t;
  }

  function mixGeom(a, b, t) {
    const o = {};
    Object.keys(b).forEach(function (k) {
      o[k] = mixNum(a && a[k], b[k], t);
    });
    return o;
  }

  function setRect(el, x, y, w, h) {
    if (!el) return;
    el.setAttribute("x", x.toFixed(1));
    el.setAttribute("y", y.toFixed(1));
    el.setAttribute("width", Math.max(0, w).toFixed(1));
    el.setAttribute("height", Math.max(0, h).toFixed(1));
  }

  function applyGeom(g) {
    setRect(encBox, g.encX, g.encY, g.encW, g.encH);
    setRect(cavity, g.cavX, g.cavY, g.cavW, g.cavH);
    setRect(unitRect, g.unitX, g.unitY, g.unitW, g.unitH);
    setRect(gapTop, g.unitX, g.cavY, g.unitW, Math.max(0, g.unitY - g.cavY));
    setRect(gapSide, g.cavX, g.unitY, Math.max(0, g.unitX - g.cavX), g.unitH);
    setRect(gapSideR, g.unitX + g.unitW, g.unitY, Math.max(0, g.cavX + g.cavW - g.unitX - g.unitW), g.unitH);
    if (encTop) encTop.setAttribute("points", polyTop(g.encX, g.encY, g.encW, g.depEnc));
    if (encSide) encSide.setAttribute("points", polyRight(g.encX, g.encY, g.encW, g.encH, g.depEnc));
    if (unitSide) unitSide.setAttribute("points", polyRight(g.unitX, g.unitY, g.unitW, g.unitH, g.depUnit));
    const hX = g.encX - 18;
    if (dimH) dimH.setAttribute("d", arrowPathV(hX, g.encY, g.encY + g.encH));
    if (dimB) dimB.setAttribute("d", arrowPathH(g.encX, g.encX + g.encW, g.encY + g.encH + 16));
    const o = iso(g.depEnc);
    if (dimD) dimD.setAttribute("d", arrowPathH(g.encX + g.encW + 8, g.encX + g.encW + o.ox + 8, g.encY + g.encH / 2));
    if (gapLabelH) {
      gapLabelH.setAttribute("text-anchor", "end");
      gapLabelH.setAttribute("x", String((hX - 8).toFixed(1)));
      gapLabelH.setAttribute("y", String((g.encY + g.encH / 2).toFixed(1)));
    }
    if (gapLabelB) {
      gapLabelB.setAttribute("x", String(g.encX + g.encW / 2));
      gapLabelB.setAttribute("y", String(g.encY + g.encH + 32));
    }
    if (gapLabelD) {
      gapLabelD.setAttribute("x", String(g.encX + g.encW + o.ox + 14));
      gapLabelD.setAttribute("y", String(g.encY + g.encH / 2 + 4));
    }
  }

  function applyLabels(lab) {
    if (encLabel) encLabel.textContent = lab.title;
    if (gapLabelH) gapLabelH.textContent = lab.h;
    if (gapLabelB) gapLabelB.textContent = lab.b;
    if (gapLabelD) gapLabelD.textContent = lab.d;
  }

  function layoutFromMm(type, encH, encW, encD, unitH, unitW, unitD, overflow) {
    const s = sceneScale(type);
    let eH = encH * s;
    let eW = encW * s;
    let uH = Math.max(18, unitH * s);
    let uW = Math.max(18, unitW * s);
    let dE = Math.max(10, encD * s * 0.42);
    let dU = Math.max(8, unitD * s * 0.42);
    if (overflow) {
      uH = eH + 12;
      uW = eW + 10;
      dU = dE + 6;
    }
    const encX = DRAW.x + (DRAW.w - eW) / 2;
    const encY = DRAW.y + DRAW.h - eH;
    const inset = 7;
    const cavX = encX + inset;
    const cavY = encY + inset;
    const cavW = Math.max(12, eW - inset * 2);
    const cavH = Math.max(12, eH - inset * 2);
    const unitWpx = overflow ? uW : Math.min(cavW - 4, uW);
    const unitHpx = overflow ? uH : Math.min(cavH - 2, uH);
    const unitX = overflow ? encX - 5 : cavX + (cavW - unitWpx) / 2;
    const unitY = overflow ? encY - 6 : cavY + cavH - unitHpx;
    return {
      encX: encX, encY: encY, encW: eW, encH: eH,
      cavX: cavX, cavY: cavY, cavW: cavW, cavH: cavH,
      unitX: unitX, unitY: unitY, unitW: unitWpx, unitH: unitHpx,
      depEnc: dE, depUnit: overflow ? dU : Math.min(dE - 2, dU)
    };
  }

  function computeLayout(rec, h, w, d) {
    const type = rec.type || lastType || "vrijstaand";
    const idle = !(h > 0 && w > 0 && d > 0) || !rec.model;
    if (idle && rec.fit !== "custom") {
      const m = MODELS[type][0];
      return {
        geom: layoutFromMm(type, m.h, m.w, m.d, m.h * 0.72, m.w * 0.7, m.d * 0.7, false),
        labels: { title: "Standaardkast", h: "H —", b: "B —", d: "D —" }
      };
    }
    if (rec.fit === "custom" || !rec.model) {
      const list = MODELS[type] || MODELS.vrijstaand;
      const m = list[list.length - 1];
      return {
        geom: layoutFromMm(type, m.h, m.w, m.d, h || m.h, w || m.w, d || m.d, true),
        labels: {
          title: "Maatwerk",
          h: "H " + Math.round(h || 0) + " / " + m.h + " mm",
          b: "B " + Math.round(w || 0) + " / " + m.w + " mm",
          d: "D " + Math.round(d || 0) + " / " + m.d + " mm"
        }
      };
    }
    const m = rec.model;
    const useW = rec.gaps.swapped ? d : w;
    const useD = rec.gaps.swapped ? w : d;
    const turn = rec.gaps.swapped ? " · gedraaid" : "";
    return {
      geom: layoutFromMm(type, m.h, m.w, m.d, h, useW, useD, false),
      labels: {
        title: (type === "wand" ? "Wand " : "Vrijstaand ") + m.size,
        h: "H " + Math.round(h) + " / " + m.h + " mm",
        b: "B " + Math.round(useW) + " / " + m.w + " mm" + turn,
        d: "D " + Math.round(useD) + " / " + m.d + " mm"
      }
    };
  }

  function setSvg(rec, h, w, d) {
    if (!unitRect || !encBox) return;
    const next = computeLayout(rec, h, w, d);
    applyLabels(next.labels);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !svgPrev) {
      applyGeom(next.geom);
      svgPrev = next.geom;
      return;
    }
    if (svgRaf) cancelAnimationFrame(svgRaf);
    const from = svgPrev;
    const t0 = performance.now();
    const dur = 560;
    function tick(now) {
      const t = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      const cur = mixGeom(from, next.geom, e);
      applyGeom(cur);
      svgPrev = cur;
      if (t < 1) svgRaf = requestAnimationFrame(tick);
      else {
        applyGeom(next.geom);
        svgPrev = next.geom;
        svgRaf = 0;
      }
    }
    svgRaf = requestAnimationFrame(tick);
  }

  function setGauge(fit, gap) {
    const map = { tight: 22, perfect: 55, spacious: 86, custom: 8, idle: 0 };
    const pct = fit === "perfect" || fit === "spacious" || fit === "tight"
      ? Math.max(8, Math.min(94, 12 + (Math.max(0, Math.min(160, gap)) / 160) * 80))
      : map[fit] || 0;
    if (gaugeFill) gaugeFill.style.width = pct + "%";
    if (gaugeMark) gaugeMark.style.left = pct + "%";
  }

  function highlightTable(type, size) {
    document.querySelectorAll("[data-size-row]").forEach((row) => {
      row.classList.toggle("is-size-hit", size && row.getAttribute("data-size-row") === type + "-" + size);
    });
  }

  function dimLine(m) {
    return m.h + " × " + m.w + " × " + m.d + " mm";
  }

  function viewFor(type, h, w, d, rec) {
    if (!previewSize || !rec || !(h > 0)) return rec;
    const model = (MODELS[type] || []).find((m) => m.size === previewSize);
    if (!model) return rec;
    const gaps = tryFit(model, h, w, d);
    if (!gaps) return rec;
    const gap = minGap(gaps);
    return { model, type, gaps, gap, fit: classify(gap), next: rec.next };
  }

  function renderCompare(type, rec, h, w, d) {
    const list = MODELS[type] || MODELS.vrijstaand;
    const hasDims = h > 0 && w > 0 && d > 0;
    const recommended = rec && rec.model ? rec.model.size : "";
    const family = type === "wand" ? "Wandmodel" : "Vrijstaand";
    if (compareLede) {
      compareLede.textContent = hasDims
        ? family + " · tik een maat om dB, Magnelis® en maten te vergelijken in het schema."
        : family + " · reductie, Magnelis® en maten naast elkaar. Tik een maat om hem in het schema te bekijken.";
    }
    compareCards.forEach((card) => {
      const size = card.getAttribute("data-compare-card");
      const model = list.find((m) => m.size === size);
      const badge = card.querySelector("[data-compare-badge]");
      const dbEl = card.querySelector("[data-compare-db]");
      const matEl = card.querySelector("[data-compare-mat]");
      const innerEl = card.querySelector("[data-compare-inner]");
      const outerEl = card.querySelector("[data-compare-outer]");
      const fitEl = card.querySelector("[data-compare-fit]");
      card.classList.remove("is-pick", "is-view", "is-na");
      card.removeAttribute("data-card-fit");
      if (!model) {
        card.classList.add("is-na");
        card.disabled = true;
        card.setAttribute("aria-pressed", "false");
        if (badge) badge.textContent = "Niet beschikbaar";
        if (dbEl) dbEl.textContent = "—";
        if (matEl) matEl.textContent = "—";
        if (innerEl) innerEl.textContent = "Geen wand-XL";
        if (outerEl) outerEl.textContent = "Kies vrijstaand of maatwerk";
        if (fitEl) fitEl.textContent = "—";
        return;
      }
      card.disabled = false;
      if (dbEl) dbEl.textContent = model.db;
      if (matEl) matEl.textContent = model.material;
      if (innerEl) innerEl.textContent = dimLine(model);
      if (outerEl) outerEl.textContent = dimLine(model.outer);
      let fitKey = "idle";
      let fitText = "Vul maten in";
      if (hasDims) {
        const gaps = tryFit(model, h, w, d);
        if (!gaps) {
          fitKey = "nofit";
          fitText = "Past niet";
        } else {
          const gap = minGap(gaps);
          fitKey = classify(gap);
          fitText = COPY[fitKey].label + " · +" + Math.round(gap) + " mm";
        }
      }
      card.setAttribute("data-card-fit", fitKey);
      if (fitEl) fitEl.textContent = fitText;
      const isPick = recommended === size;
      const isView = previewSize === size;
      card.classList.toggle("is-pick", isPick);
      card.classList.toggle("is-view", isView && !isPick);
      card.setAttribute("aria-pressed", isView || isPick ? "true" : "false");
      if (badge) {
        if (isPick) badge.textContent = "Aanbevolen";
        else if (isView) badge.textContent = "Bekijken";
        else if (fitKey === "nofit") badge.textContent = "Te klein";
        else badge.textContent = family;
      }
    });
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function fmtNl(n) {
    return String(round1(n)).replace(".", ",");
  }

  function enclosureDb(type) {
    return type === "wand" ? 11 : 14;
  }

  function collectDb(type) {
    const t = type || (form.querySelector('input[name="size-type"]:checked') || {}).value || "vrijstaand";
    const lw = 60;
    const r = 5;
    const place = "field";
    const q = PLACE_Q[place] || 2;
    const enc = enclosureDb(t);
    const distLoss = 20 * Math.log10(r);
    const qTerm = 10 * Math.log10(q);
    const lp = lw - distLoss - 11 + qTerm;
    const lpEnc = lp - enc;
    return {
      type: t,
      lw: lw,
      r: r,
      rLabel: "5",
      place: place,
      placeLabel: PLACE_PDF[place] || place,
      q: q,
      enc: enc,
      distLoss: distLoss,
      distLossLabel: fmtNl(distLoss),
      qTerm: qTerm,
      qTermLabel: fmtNl(qTerm),
      lp: lp,
      lpEnc: lpEnc,
      lpLabel: fmtNl(lp),
      lpEncLabel: fmtNl(lpEnc),
      areaKey: "woon"
    };
  }

  function signedDb(n) {
    const v = round1(n);
    const core = fmtNl(Math.abs(v));
    return (v > 0 ? "+" : v < 0 ? "−" : "") + core + " dB";
  }

  function dateLabel() {
    const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    const d = new Date();
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  function isoDate() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function vlaremBlock(db) {
    const area = AREAS[db.areaKey] || AREAS.woon;
    const rows = [
      { key: "day", name: "Dag (7-19u)" },
      { key: "eve", name: "Avond (19-22u)" },
      { key: "night", name: "Nacht (22-7u)" }
    ];
    const periods = rows.map(function (row) {
      const limit = area[row.key];
      const bareOk = db.lp <= limit;
      const encOk = db.lpEnc <= limit;
      const margin = round1(limit - db.lpEnc);
      return {
        name: row.name,
        limit: limit,
        bareLabel: db.lpLabel,
        encLabel: db.lpEncLabel,
        bareOk: bareOk,
        encOk: encOk,
        marginLabel: signedDb(margin)
      };
    });
    const bareAll = periods.every(function (p) { return p.bareOk; });
    const encAll = periods.every(function (p) { return p.encOk; });
    const night = periods[2];
    let conclusion;
    if (encAll && !bareAll) {
      conclusion = "Zonder kast overschrijdt de theoretische restwaarde minstens één richtwaarde. Met REDUCD blijft de toets binnen de richtwaarden voor " + area.label + ".";
    } else if (encAll) {
      conclusion = "Met én zonder kast blijft de theoretische restwaarde onder de VLAREM-richtwaarden voor " + area.label + ".";
    } else if (night.encOk) {
      conclusion = "Niet alle perioden vallen binnen de richtwaarden. Nacht met kast blijft onder " + night.limit + " dB(A); controleer de overige perioden of plan een meting.";
    } else {
      conclusion = "Ook met kast overschrijdt de theoretische nachtrichtwaarde (" + night.limit + " dB(A)). Vergroot de afstand, kies een stillere unit, of vraag een situatiecheck.";
    }
    return { areaLabel: area.label, periods: periods, conclusion: conclusion };
  }

  function compareRows(type, rec, h, w, d) {
    const list = MODELS[type] || MODELS.vrijstaand;
    const sizes = type === "wand" ? ["S", "L", "XL"] : ["S", "L", "XL"];
    return sizes.map(function (size) {
      const model = list.find(function (m) { return m.size === size; });
      if (!model) {
        return { size: size, na: true, pick: false, fitLabel: "—", inner: "geen wand-XL", db: "—" };
      }
      const gaps = tryFit(model, h, w, d);
      let fitLabel = "vult maten in";
      if (gaps) {
        const gap = minGap(gaps);
        fitLabel = COPY[classify(gap)].label.toLowerCase() + " · +" + Math.round(gap) + " mm";
      } else {
        fitLabel = "past niet";
      }
      return {
        size: size,
        na: false,
        pick: !!(rec.model && rec.model.size === size),
        fitLabel: fitLabel,
        inner: model.h + " × " + model.w + " × " + model.d + " mm",
        db: model.db
      };
    });
  }

  function buildSnapshot(type, rec, h, w, d, advisory) {
    const db = collectDb(type);
    const fileSize = rec.model ? rec.model.size : "maatwerk";
    return {
      dateLabel: dateLabel(),
      filename: "REDUCD-advies-" + type + "-" + fileSize + "-" + isoDate() + ".pdf",
      type: type,
      h: Math.round(h),
      w: Math.round(w),
      d: Math.round(d),
      fit: rec.fit,
      fitLabel: COPY[rec.fit] ? COPY[rec.fit].label : rec.fit,
      advisory: advisory,
      swapped: !!(rec.gaps && rec.gaps.swapped),
      gap: rec.gap,
      model: rec.model,
      nextSize: rec.next ? rec.next.size : null,
      compare: compareRows(type, rec, h, w, d),
      db: db,
      vlarem: vlaremBlock(db)
    };
  }

  function setResultActions(on) {
    if (cta) cta.hidden = !on;
    if (pdfBtn) pdfBtn.hidden = !on;
  }

  function downloadReport() {
    if (!lastSnapshot) return;
    lastSnapshot.db = collectDb(lastSnapshot.type);
    lastSnapshot.vlarem = vlaremBlock(lastSnapshot.db);
    lastSnapshot.dateLabel = dateLabel();
    if (typeof window.REDUCD === "undefined" || !window.REDUCD.downloadSizeReport) {
      pdfBtn.textContent = "PDF niet geladen";
      return;
    }
    window.REDUCD.downloadSizeReport(lastSnapshot);
  }

  function renderIdle() {
    const type = (form.querySelector('input[name="size-type"]:checked') || {}).value || "vrijstaand";
    if (type !== lastType) {
      previewSize = "";
      lastType = type;
    }
    root.dataset.fit = "idle";
    result.hidden = false;
    const c = COPY.idle;
    if (statusKicker) statusKicker.textContent = c.kicker;
    if (statusLabel) statusLabel.textContent = c.label;
    if (statusModel) statusModel.textContent = type === "wand" ? "S · L" : "S · L · XL";
    if (statusMeta) statusMeta.textContent = "Binnenmaten van de kast, in mm.";
    if (statusAdvisory) statusAdvisory.textContent = c.advisory;
    lastSnapshot = null;
    setResultActions(false);
    syncExtraUi();
    updateTotalLine(measured());
    setGauge("idle", 0);
    setSvg({ fit: "idle", model: null, gaps: null, type }, 0, 0, 0);
    highlightTable("", "");
    renderCompare(type, { model: null, type, fit: "idle" }, 0, 0, 0);
    applyFieldTips(type, num(form.elements.height), num(form.elements.width), num(form.elements.depth));
  }

  function render() {
    const type = (form.querySelector('input[name="size-type"]:checked') || {}).value || "vrijstaand";
    if (type !== lastType) {
      previewSize = "";
      lastType = type;
    }
    const m = measured();
    const h = m.h;
    const w = m.w;
    const d = m.d;
    syncExtraUi();
    updateTotalLine(m);
    if (!(m.bodyH > 0 && m.bodyW > 0 && m.bodyD > 0)) {
      renderIdle();
      return;
    }
    const rec = recommend(type, h, w, d);
    const shown = viewFor(type, h, w, d, rec);
    root.dataset.fit = rec.fit;
    const c = COPY[rec.fit];
    if (statusKicker) statusKicker.textContent = c.kicker;
    if (statusLabel) statusLabel.textContent = c.label;
    if (rec.model) {
      const orient = rec.gaps.swapped ? " · voetafdruk gedraaid" : "";
      if (statusModel) statusModel.textContent = (type === "wand" ? "Wandmodel " : "Vrijstaand ") + rec.model.size;
      if (statusMeta) {
        statusMeta.textContent =
          "Vanaf € " + rec.model.price + " · " + rec.model.db + " · speling " + Math.round(rec.gap) + " mm" + orient;
      }
      if (cta) {
        cta.textContent = rec.fit === "tight" && rec.next
          ? "Toch " + rec.next.size + " sturen?"
          : "Stuur dit resultaat naar REDUCD";
        cta.removeAttribute("data-open-lead-popup");
        cta.setAttribute("href", "#lead-form");
      }
      highlightTable(type, rec.model.size);
    } else {
      if (statusModel) statusModel.textContent = "Maatwerk";
      if (statusMeta) {
        statusMeta.textContent =
          type === "wand" ? "Buiten wand S / L · prijs op aanvraag" : "Buiten S / L / XL · prijs op aanvraag";
      }
      if (cta) {
        cta.textContent = "Stuur dit resultaat naar REDUCD";
        cta.removeAttribute("data-open-lead-popup");
        cta.setAttribute("href", "#lead-form");
      }
      highlightTable("", "");
    }
    let advisory = c.advisory;
    if (rec.fit === "tight" && rec.next) {
      advisory += " Volgende standaardmaat: " + rec.next.size + ".";
    }
    if (shown.model && previewSize && rec.model && shown.model.size !== rec.model.size) {
      advisory += " Je bekijkt " + shown.model.size + " (" + COPY[shown.fit].label.toLowerCase() + ", +" + Math.round(shown.gap) + " mm).";
    }
    if (statusAdvisory) statusAdvisory.textContent = advisory;
    lastSnapshot = buildSnapshot(type, rec, h, w, d, advisory);
    setResultActions(true);
    try {
      sessionStorage.setItem("reducd_calc_engaged", "1");
    } catch (e) {}
    const calcKey = type + "|" + Math.round(h) + "|" + Math.round(w) + "|" + Math.round(d) + "|" + rec.fit;
    if (calcKey !== root.dataset.calcTracked) {
      root.dataset.calcTracked = calcKey;
      window.REDUCD?.trackCalculatorComplete?.({
        event_category: "calculator",
        setup: type,
        fit: rec.fit
      });
    }
    if (window.REDUCD && window.REDUCD.saveCalcLead) {
      const fam = type === "wand" ? "wandmodel" : "vrijstaand";
      const size = rec.model ? rec.model.size : "maatwerk";
      window.REDUCD.saveCalcLead({
        setup: type,
        height: Math.round(h),
        width: Math.round(w),
        depth: Math.round(d),
        model: size,
        summary:
          fam + " " + size + " · " + Math.round(h) + "×" + Math.round(w) + "×" + Math.round(d) +
          " mm · " + (COPY[rec.fit] ? COPY[rec.fit].label.toLowerCase() : rec.fit)
      });
    }
    setGauge(rec.fit, rec.gap);
    setSvg(shown, h, w, d);
    renderCompare(type, rec, h, w, d);
    applyFieldTips(type, h, w, d);
  }

  compareCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.disabled) return;
      const size = card.getAttribute("data-compare-card");
      previewSize = previewSize === size ? "" : size;
      render();
    });
  });

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    render();
  });
  if (cta) {
    cta.addEventListener("click", function (e) {
      if (!lastSnapshot) return;
      e.preventDefault();
      const el = document.getElementById("lead-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      const formEl = document.getElementById("lead-form");
      if (formEl) {
        const data = lastSnapshot;
        const setup = formEl.querySelector('input[name="setup"][value="' + data.type + '"]');
        if (setup) setup.checked = true;
        const hEl = formEl.querySelector('[name="height"]');
        const wEl = formEl.querySelector('[name="width"]');
        const dEl = formEl.querySelector('[name="depth"]');
        if (hEl) hEl.value = data.h;
        if (wEl) wEl.value = data.w;
        if (dEl) dEl.value = data.d;
        const banner = formEl.querySelector("[data-calc-prefill]");
        if (banner) {
          banner.hidden = false;
          banner.textContent = "Calculator meegenomen: " + (data.fitLabel || "") + (data.model ? " · " + data.model.size : " · maatwerk");
        }
        if (window.REDUCD && window.REDUCD.openLeadExtras) window.REDUCD.openLeadExtras();
      }
    });
  }
  if (pdfBtn) {
    pdfBtn.addEventListener("click", downloadReport);
  }
  (function prefillFromQuery() {
    const q = new URLSearchParams(location.search);
    const t = q.get("type");
    const h = q.get("h");
    const w = q.get("w");
    const d = q.get("d");
    if (t) {
      const radio = form.querySelector('input[name="size-type"][value="' + t + '"]');
      if (radio) radio.checked = true;
    }
    if (h && form.elements.height) form.elements.height.value = h;
    if (w && form.elements.width) form.elements.width.value = w;
    if (d && form.elements.depth) form.elements.depth.value = d;
  })();
  fillUnitSelects();
  renderIdle();
})();
