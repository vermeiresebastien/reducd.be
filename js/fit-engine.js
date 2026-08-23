/**
 * Shared maatkeuze: kleinste standaardkast, pasvorm krap/ideaal/ruim.
 * Geen garantie — waarschijnlijke pasvorm tot inmeting.
 */
(function (root) {
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

  const FIT_NL = { spacious: "ruim", perfect: "ideaal", tight: "krap", custom: "maatwerk" };

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
    const family = type === "wand" ? "wand" : "vrijstaand";
    const list = MODELS[family];
    for (let i = 0; i < list.length; i++) {
      const gaps = tryFit(list[i], h, w, d);
      if (gaps) {
        const gap = minGap(gaps);
        return { model: list[i], type: family, gaps, gap, fit: classify(gap), next: list[i + 1] || null };
      }
    }
    return { model: null, type: family, gaps: null, gap: -1, fit: "custom", next: null };
  }

  function summarize(input) {
    const type = input.setup === "wand" ? "wand" : "vrijstaand";
    const h = Number(input.height) || 0;
    const w = Number(input.width) || 0;
    const d = Number(input.depth) || 0;
    const rec = recommend(type, h, w, d);
    const family = type === "wand" ? "Wandmodel" : "Vrijstaand";
    const size = rec.model ? rec.model.size : "maatwerk";
    const label = family + (rec.model ? " " + rec.model.size : " maatwerk");
    return {
      setup: type,
      height: h,
      width: w,
      depth: d,
      brand: input.brand || "",
      equipment: input.equipment || "",
      goal: input.goal || "",
      distance: input.distance || "",
      label: label,
      size: size,
      family: family,
      fit: rec.fit,
      fitNl: FIT_NL[rec.fit] || rec.fit,
      gap: rec.model ? Math.round(rec.gap) : null,
      db: rec.model ? rec.model.db : (type === "wand" ? "10–12 dB(A)" : "± 14 dB(A)"),
      price: rec.model ? rec.model.price : "op aanvraag",
      material: rec.model ? rec.model.material : "maatwerk",
      advisory: rec.fit === "custom"
        ? "Buiten de standaard binnenmaten — waarschijnlijk maatwerk, na inmeting."
        : "Waarschijnlijk passende maat. Geen garantie; definitief na inmeting. Speling " + Math.round(rec.gap) + " mm."
    };
  }

  root.REDUCD_FIT = {
    MODELS: MODELS,
    FIT_NL: FIT_NL,
    tryFit: tryFit,
    classify: classify,
    recommend: recommend,
    summarize: summarize
  };
})(window);
