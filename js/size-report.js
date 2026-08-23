/**
 * Client PDF for the homepage calculator: pasvorm + theoretische VLAREM-toets.
 * Standard Helvetica / WinAnsi — no extra libraries.
 */
(function (w) {
  w.REDUCD = w.REDUCD || {};

  const NAVY = [0.059, 0.165, 0.227];
  const MUTED = [0.35, 0.42, 0.46];
  const LINE = [0.88, 0.9, 0.91];
  const OK = [0.02, 0.45, 0.32];
  const FAIL = [0.72, 0.18, 0.18];
  const SOFT = [0.94, 0.96, 0.97];
  const WARN = [0.98, 0.95, 0.88];

  function pdfLit(str) {
    let out = "(";
    const bytes = winAnsi(String(str == null ? "" : str));
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if (b === 0x28 || b === 0x29 || b === 0x5c) out += "\\" + String.fromCharCode(b);
      else if (b < 32 || b > 126) out += "\\" + ("000" + b.toString(8)).slice(-3);
      else out += String.fromCharCode(b);
    }
    return out + ")";
  }

  function winAnsi(str) {
    const extra = {
      0x20ac: 128,
      0x201a: 130,
      0x0192: 131,
      0x201e: 132,
      0x2026: 133,
      0x2020: 134,
      0x2021: 135,
      0x02c6: 136,
      0x2030: 137,
      0x0160: 138,
      0x2039: 139,
      0x0152: 140,
      0x017d: 142,
      0x2018: 145,
      0x2019: 146,
      0x201c: 147,
      0x201d: 148,
      0x2022: 149,
      0x2013: 150,
      0x2014: 151,
      0x02dc: 152,
      0x2122: 153,
      0x0161: 154,
      0x203a: 155,
      0x0153: 156,
      0x017e: 158,
      0x0178: 159,
      0x2212: 45
    };
    const out = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c >= 32 && c <= 126) out.push(c);
      else if (c >= 160 && c <= 255) out.push(c);
      else if (extra[c] != null) out.push(extra[c]);
      else out.push(63);
    }
    return out;
  }

  function rgb(c) {
    return c[0].toFixed(3) + " " + c[1].toFixed(3) + " " + c[2].toFixed(3);
  }

  function wrap(text, maxW, size, bold) {
    const factor = bold ? 0.58 : 0.5;
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const trial = line ? line + " " + words[i] : words[i];
      if (trial.length * size * factor > maxW && line) {
        lines.push(line);
        line = words[i];
      } else line = trial;
    }
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  function Writer() {
    this.pages = [];
    this.ops = [];
    this.y = 742;
    this.w = 595;
    this.h = 842;
    this.m = 48;
  }

  Writer.prototype.flush = function () {
    this.pages.push(this.ops.join("\n"));
    this.ops = [];
    this.y = 742;
  };

  Writer.prototype.ensure = function (need) {
    if (this.y - need < 58) this.flush();
  };

  Writer.prototype.rect = function (x, y, w, h, fill, stroke) {
    let s = x.toFixed(1) + " " + y.toFixed(1) + " " + w.toFixed(1) + " " + h.toFixed(1) + " re";
    if (fill) s = rgb(fill) + " rg " + s + " f";
    if (stroke) s = rgb(stroke) + " RG " + s + (fill ? "" : " S");
    this.ops.push(s);
  };

  Writer.prototype.text = function (x, y, str, size, bold, color) {
    this.ops.push(
      "BT /" + (bold ? "F2" : "F1") + " " + size + " Tf " + rgb(color || NAVY) + " rg 1 0 0 1 " +
        x.toFixed(1) + " " + y.toFixed(1) + " Tm " + pdfLit(str) + " Tj ET"
    );
  };

  Writer.prototype.para = function (str, size, bold, color, leading) {
    const lines = wrap(str, this.w - this.m * 2, size, bold);
    const lh = leading || size + 3;
    this.ensure(lh * lines.length + 2);
    for (let i = 0; i < lines.length; i++) {
      this.text(this.m, this.y, lines[i], size, bold, color);
      this.y -= lh;
    }
  };

  Writer.prototype.rule = function () {
    this.ensure(10);
    this.ops.push(rgb(LINE) + " RG 0.6 w " + this.m + " " + this.y.toFixed(1) + " m " + (this.w - this.m) + " " + this.y.toFixed(1) + " l S");
    this.y -= 12;
  };

  Writer.prototype.kicker = function (label) {
    this.ensure(28);
    this.y -= 6;
    this.text(this.m, this.y, label.toUpperCase(), 8, true, MUTED);
    this.y -= 16;
  };

  function headerOps(page, total, dateLabel) {
    const ops = [];
    ops.push(rgb(NAVY) + " rg 0 790 595 52 re f");
    ops.push("BT /F2 16 Tf 1 1 1 rg 1 0 0 1 48 818 Tm " + pdfLit("REDUCD") + " Tj ET");
    ops.push("BT /F1 9 Tf 0.78 0.84 0.87 rg 1 0 0 1 48 804 Tm " + pdfLit("Adviesrapport  ·  pasvorm en theoretische VLAREM-toets") + " Tj ET");
    ops.push("BT /F1 8 Tf 0.78 0.84 0.87 rg 1 0 0 1 430 818 Tm " + pdfLit(dateLabel) + " Tj ET");
    ops.push("BT /F1 8 Tf 0.78 0.84 0.87 rg 1 0 0 1 430 806 Tm " + pdfLit("Pagina " + page + " / " + total) + " Tj ET");
    return ops.join("\n");
  }

  function footerOps() {
    return (
      rgb(LINE) + " RG 0.6 w 48 40 m 547 40 l S\n" +
      "BT /F1 7 Tf " + rgb(MUTED) + " rg 1 0 0 1 48 28 Tm " +
      pdfLit("REDUCD B.V.  ·  Elzerijs 6, 5561 VB Riethoven  ·  +32 472 08 44 70  ·  info@reducd.be  ·  www.reducd.be") +
      " Tj ET"
    );
  }

  function assemble(pageStreams) {
    const objs = [];
    function add(body) {
      objs.push(body);
      return objs.length;
    }
    const font1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const font2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const contentIds = pageStreams.map(function (s) {
      const payload = s + "\n";
      return add("<< /Length " + payload.length + " >>\nstream\n" + payload + "endstream");
    });
    const pageIds = contentIds.map(function (cid) {
      return add(
        "<< /Type /Page /Parent PAGES /MediaBox [0 0 595 842] /Resources << /Font << /F1 " +
          font1 + " 0 R /F2 " + font2 + " 0 R >> >> /Contents " + cid + " 0 R >>"
      );
    });
    const pagesId = add("<< /Type /Pages /Kids [" + pageIds.map(function (id) { return id + " 0 R"; }).join(" ") + "] /Count " + pageIds.length + " >>");
    const catalogId = add("<< /Type /Catalog /Pages " + pagesId + " 0 R >>");
    for (let i = 0; i < pageIds.length; i++) {
      objs[pageIds[i] - 1] = objs[pageIds[i] - 1].replace("/Parent PAGES", "/Parent " + pagesId + " 0 R");
    }

    const bytes = [];
    function ascii(s) {
      for (let i = 0; i < s.length; i++) bytes.push(s.charCodeAt(i) & 0xff);
    }
    ascii("%PDF-1.4\n%\x80\x81\x82\x83\n");
    const offsets = [0];
    for (let i = 0; i < objs.length; i++) {
      offsets.push(bytes.length);
      ascii(String(i + 1) + " 0 obj\n" + objs[i] + "\nendobj\n");
    }
    const xrefAt = bytes.length;
    ascii("xref\n0 " + (objs.length + 1) + "\n");
    ascii("0000000000 65535 f \n");
    for (let i = 1; i < offsets.length; i++) {
      ascii(("0000000000" + offsets[i]).slice(-10) + " 00000 n \n");
    }
    ascii(
      "trailer\n<< /Size " + (objs.length + 1) + " /Root " + catalogId + " 0 R >>\nstartxref\n" +
        xrefAt + "\n%%EOF\n"
    );
    return new Uint8Array(bytes);
  }

  function build(data) {
    const doc = new Writer();
    const db = data.db;
    const v = data.vlarem;

    doc.rect(doc.m, doc.y - 28, doc.w - doc.m * 2, 36, WARN);
    doc.y -= 14;
    doc.text(doc.m + 10, doc.y, "Indicatief — geen meting en geen juridisch advies.", 9, true, NAVY);
    doc.y -= 12;
    doc.text(doc.m + 10, doc.y, "Theoretische toets aan VLAREM II-richtwaarden. Vervangt geen erkend akoestisch onderzoek.", 8, false, MUTED);
    doc.y -= 28;

    doc.kicker("1. Buitenunit");
    doc.para(
      "Hoogte " + data.h + " mm  ·  breedte " + data.w + " mm  ·  diepte " + data.d + " mm  ·  opstelling " +
        (data.type === "wand" ? "wandmodel" : "vrijstaand") + ".",
      10, false, NAVY, 14
    );
    doc.y -= 6;

    doc.kicker("2. Aanbevolen omkasting");
    if (data.model) {
      const family = data.type === "wand" ? "Wandmodel " : "Vrijstaand ";
      doc.para(family + data.model.size + "  ·  " + data.fitLabel + (data.gap >= 0 ? "  ·  krapste speling " + Math.round(data.gap) + " mm" : ""), 12, true, NAVY, 16);
      doc.para(
        "Binnenmaat " + data.model.h + " × " + data.model.w + " × " + data.model.d + " mm. Buitenmaat " +
          data.model.outer.h + " × " + data.model.outer.w + " × " + data.model.outer.d + " mm. Vanaf EUR " +
          data.model.price + " (Magnelis, zonder installatie). Reductie " + data.model.db +
          (data.swapped ? " Voetafdruk gedraaid (breedte/diepte omgewisseld)." : ""),
        9, false, MUTED, 13
      );
    } else {
      doc.para("Maatwerk — de unit valt buiten de standaard binnenmaten.", 12, true, NAVY, 16);
      doc.para("Prijs op aanvraag. We tekenen de luchtweg na een gratis inmeting.", 9, false, MUTED, 13);
    }
    doc.y -= 4;
    doc.para(data.advisory, 9, false, NAVY, 13);
    if (data.nextSize) {
      doc.y -= 2;
      doc.para("Volgende standaardmaat ter overweging: " + data.nextSize + ".", 9, false, MUTED, 13);
    }
    doc.y -= 8;

    doc.kicker("3. Maatvergelijking");
    (data.compare || []).forEach(function (row) {
      doc.ensure(16);
      const mark = row.na ? "niet beschikbaar" : row.pick ? "aanbevolen" : row.fitLabel;
      doc.para(row.size + "  ·  " + mark + (row.na ? "" : "  ·  " + row.inner + "  ·  " + row.db), 9, !!row.pick, row.pick ? NAVY : MUTED, 13);
    });
    doc.y -= 8;

    doc.kicker("4. Geluidsscenario");
    doc.para(
      "LwA " + Math.round(db.lw) + " dB(A)  ·  afstand " + db.rLabel + " m tot de perceelsgrens  ·  " +
        db.placeLabel + "  ·  zachte bodem (K = 0)  ·  kast −" + db.enc + " dB  ·  " + v.areaLabel + ".",
      9, false, NAVY, 13
    );
    doc.y -= 8;
    const boxW = (doc.w - doc.m * 2 - 10) / 2;
    doc.ensure(52);
    doc.rect(doc.m, doc.y - 38, boxW, 46, SOFT);
    doc.rect(doc.m + boxW + 10, doc.y - 38, boxW, 46, [0.9, 0.96, 0.93]);
    doc.text(doc.m + 12, doc.y - 8, "Zonder kast", 8, true, MUTED);
    doc.text(doc.m + 12, doc.y - 28, db.lpLabel + " dB(A)", 16, true, NAVY);
    doc.text(doc.m + boxW + 22, doc.y - 8, "Met REDUCD", 8, true, OK);
    doc.text(doc.m + boxW + 22, doc.y - 28, db.lpEncLabel + " dB(A)", 16, true, OK);
    doc.y -= 56;

    doc.kicker("5. Theoretische VLAREM-toets");
    doc.para("Richtwaarden " + v.areaLabel + " (VLAREM II, bijlage 4.5.4 / 2.2.1). Marge = richtwaarde minus restwaarde met kast.", 8, false, MUTED, 12);
    doc.y -= 4;

    const cols = [doc.m, doc.m + 118, doc.m + 210, doc.m + 310, doc.m + 410];
    doc.ensure(22);
    doc.rect(doc.m, doc.y - 6, doc.w - doc.m * 2, 16, SOFT);
    ["Periode", "Richtwaarde", "Zonder kast", "Met REDUCD", "Marge (met)"].forEach(function (h, i) {
      doc.text(cols[i] + 4, doc.y, h, 7.5, true, MUTED);
    });
    doc.y -= 18;
    v.periods.forEach(function (p) {
      doc.ensure(16);
      doc.text(cols[0] + 4, doc.y, p.name, 9, false, NAVY);
      doc.text(cols[1] + 4, doc.y, p.limit + " dB(A)", 9, false, NAVY);
      doc.text(cols[2] + 4, doc.y, p.bareLabel + (p.bareOk ? "  OK" : "  boven"), 9, false, p.bareOk ? OK : FAIL);
      doc.text(cols[3] + 4, doc.y, p.encLabel + (p.encOk ? "  OK" : "  boven"), 9, true, p.encOk ? OK : FAIL);
      doc.text(cols[4] + 4, doc.y, p.marginLabel, 9, false, p.encOk ? OK : FAIL);
      doc.y -= 15;
    });
    doc.y -= 6;
    doc.para(v.conclusion, 10, true, NAVY, 14);
    doc.y -= 8;

    doc.kicker("6. Rekenmodel");
    doc.para(
      "Puntbron boven de bodem, zelfde model als de VLAREM-rekentool op reducd.be/vlarem/:  Lp = Lw − 20·log10(r) − 11 + 10·log10(Q).",
      8, false, MUTED, 12
    );
    doc.para(
      "Invulling: Lp = " + Math.round(db.lw) + " − " + db.distLossLabel + " − 11 + " + db.qTermLabel +
        " = " + db.lpLabel + " dB(A) zonder kast. Met kast " + db.lpEncLabel + " dB(A) (−" + db.enc + " dB). " +
        db.placeLabel + ". Zachte bodem, K = 0. Afstand minimaal 0,5 m in het model.",
      8, false, MUTED, 12
    );
    doc.y -= 8;
    doc.para(
        "Dit rapport is een momentopname van de calculator op reducd.be. Exacte kastkeuze na inmeting. Peutz-gemiddelde vrijstaand 14 dB(A); wandmodel 10-12 dB(A) (hier 11 dB in de toets). Vraag een situatiecheck: +32 472 08 44 70.",
      8, false, MUTED, 12
    );

    doc.flush();
    const n = doc.pages.length;
    const streams = doc.pages.map(function (body, i) {
      return headerOps(i + 1, n, data.dateLabel) + "\n" + body + "\n" + footerOps();
    });
    return assemble(streams);
  }

  function download(bytes, filename) {
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  w.REDUCD.buildSizeReportPdf = build;
  w.REDUCD.downloadSizeReport = function (data) {
    download(build(data), data.filename || "REDUCD-adviesrapport.pdf");
  };
})(window);
