/**
 * Standalone Decibelmeter — same point-source model as the VLAREM tool.
 * Mounts on [data-db-meter].
 */
(function () {
  const root = document.querySelector("[data-db-meter]");
  if (!root) return;

  const dbLw = root.querySelector("#db-lw");
  const dbDist = root.querySelector("#db-dist");
  const dbType = root.querySelector("#db-type");
  const dbLwOut = root.querySelector("[data-db-lw-out]");
  const dbDistOut = root.querySelector("[data-db-dist-out]");
  const dbBare = root.querySelector("[data-db-bare]");
  const dbEnc = root.querySelector("[data-db-enc]");
  const dbFormula = root.querySelector("[data-db-formula]");
  const needleBare = root.querySelector("[data-db-needle-bare]");
  const needleEnc = root.querySelector("[data-db-needle-enc]");

  const PLACE_Q = { field: 2, wall: 4, corner: 8, niche: 16 };
  const PLACE_NL = {
    field: "vrij veld, Q=2",
    wall: "1 muur, Q=4 (+3 dB)",
    corner: "2 muren, Q=8 (+6 dB)",
    niche: "nis, Q=16 (+9 dB)"
  };

  function fmtNl(n) {
    return (Math.round(n * 10) / 10).toFixed(1).replace(".", ",");
  }

  function enclosureDb(type) {
    return type === "wand" ? 11 : 14;
  }

  function needleDeg(lp) {
    const clamped = Math.max(25, Math.min(65, lp));
    return ((clamped - 25) / 40) * 180 - 90;
  }

  function setNeedle(el, lp) {
    if (!el) return;
    el.style.transform = "rotate(" + needleDeg(lp) + "deg)";
  }

  function render() {
    if (!dbLw || !dbDist) return;
    const type = (dbType && dbType.value) || "vrijstaand";
    const lw = Number(dbLw.value);
    const r = Math.max(Number(dbDist.value) || 0, 0.5);
    const placeEl = root.querySelector('input[name="db-place"]:checked');
    const place = (placeEl && placeEl.value) || "field";
    const q = PLACE_Q[place] || 2;
    const enc = enclosureDb(type);
    const distLoss = 20 * Math.log10(r);
    const qTerm = 10 * Math.log10(q);
    const lp = lw - distLoss - 11 + qTerm;
    const lpEnc = lp - enc;
    const distLabel = Number.isInteger(r) ? String(r) : String(r).replace(".", ",");
    if (dbLwOut) dbLwOut.textContent = Math.round(lw) + " dB";
    if (dbDistOut) dbDistOut.textContent = distLabel + " m";
    if (dbBare) dbBare.textContent = fmtNl(lp) + " dB(A)";
    if (dbEnc) dbEnc.textContent = fmtNl(lpEnc) + " dB(A)";
    if (dbFormula) {
      const kast = type === "wand" ? "wand −11 dB" : "vrijstaand −14 dB";
      dbFormula.textContent =
        "Lp = " + Math.round(lw) + " − " + fmtNl(distLoss) + " − 11 + " + fmtNl(qTerm) +
        " = " + fmtNl(lp) + " dB(A) zonder kast · met kast " + fmtNl(lpEnc) +
        " dB(A) (" + kast + ") · " + (PLACE_NL[place] || "") + " · zachte bodem.";
    }
    setNeedle(needleBare, lp);
    setNeedle(needleEnc, lpEnc);
  }

  root.addEventListener("input", render);
  root.addEventListener("change", render);
  render();
})();
