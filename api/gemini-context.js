/** Domain facts for the support assistant (server + client fallback). */
const REDUCD_SYSTEM = `Je bent de REDUCD-assistent voor akoestische omkastingen van warmtepompen en airco in België (Vlaanderen, Brussel, Wallonië).

Feiten (niet verzinnen, niet garanderen):
- Vrijstaand S/L/XL: gemiddeld ± 14 dB(A) reductie (Peutz, juli 2025, ISO 3741:2010 en ISO 7235:2003).
- Wandmodel S/L: 10–12 dB(A). Geen XL-wandmodel.
- “75% stiller” = waargenomen luidheid, niet geluidsenergie, geen garantie voor elke situatie.
- Prijzen Magnelis zonder installatie: S € 2.335, L € 2.865, XL € 3.365.
- Binnenmaten vrijstaand (H×B×D mm): S 990×1090×650, L 1350×1250×650, XL 1670×1250×650.
- Wand: S 990×1060×650, L 1310×1250×800.
- Pasvorm: krap < 40 mm, ideaal 40–99 mm, ruim ≥ 100 mm speling. W en D mogen gedraaid.
- Maatkeuze is waarschijnlijk tot inmeting.
- VLAREM woongebied nachtrichtwaarde 35 dB(A). Rekentool is theoretisch, geen meting.
- Intake: eerst situatiecheck, reactie binnen 24 uur. Meting op locatie alleen als de case dat vraagt.
- Contact: +32 472 08 44 70, info@reducd.be, https://www.reducd.be/#lead-form
- Diepe links: calculator https://www.reducd.be/#calculator — VLAREM https://www.reducd.be/vlarem/ — producten https://www.reducd.be/#producten — blog buren https://www.reducd.be/geluid-warmtepomp-buren/ — pro https://www.reducd.be/pro/ of https://www.reducd.be/voor-installateurs/

Stijl: Nederlands (BE), kort, Markdown, bullets, diepe links. Geen juridisch advies. Geen extra dB- of prijzen verzinnen.`;

const FALLBACKS = [
  { test: /vlarem|35\s*dB|perceel|nacht/i, text: "In **Vlaanderen** toets je het specifieke geluid vaak aan VLAREM (woongebied **45 / 40 / 35 dB(A)** dag · avond · nacht). Dat is theoretisch tot je meet.\n\n- [VLAREM-rekentool](/vlarem/)\n- [Situatiecheck](/#lead-form)" },
  { test: /prijs|kost|€|euro/i, text: "Standaardmaten **Magnelis, zonder installatie**:\n- S vanaf **€ 2.335**\n- L vanaf **€ 2.865**\n- XL vanaf **€ 3.365** (alleen vrijstaand)\n\nPoedercoating en montage zijn extra. [Vraag een situatiecheck](/#lead-form)." },
  { test: /peutz|14\s*dB|75\s*%|certif/i, text: "Vrijstaand: gemiddeld **± 14 dB(A)** (Peutz, juli 2025). Wandmodel: **10–12 dB(A)**.\n\n“75% stiller” is **waargenomen luidheid**, geen geluidsenergie en geen garantie. [Documentatie](/docs/)." },
  { test: /maat|pas|s\b|xl|wand|vrijstaand|calculator/i, text: "Meet de buitenunit in mm, inclusief voeten, beugels en leidingbochten. We kiezen de kleinste kast: **krap / ideaal / ruim**.\n\n- [Maatcalculator](/#calculator)\n- Of open de **Keuzehulp** in deze assistent." },
  { test: /install|pro|aannemer|tarief/i, text: "Installateurs: [voor-installateurs](/voor-installateurs/) en het [Pro-portaal](/pro/). Montage vaak ± 1 uur (12 boutjes)." },
  { test: /buren|overlast|klacht/i, text: "Burenoverlast loopt via gewest, gemeente én hinderrecht. Start met demping + afstand, niet met een brochurecijfer.\n\n- [Gids: geluid & buren](/geluid-warmtepomp-buren/)\n- [Situatiecheck](/#lead-form)" }
];

function fallbackAnswer(question) {
  const q = String(question || "");
  for (let i = 0; i < FALLBACKS.length; i++) {
    if (FALLBACKS[i].test.test(q)) return FALLBACKS[i].text;
  }
  return "Ik help met maten, VLAREM, Peutz-cijfers en prijzen van REDUCD-omkastingen.\n\n- [Maatcalculator](/#calculator)\n- [VLAREM-tool](/vlarem/)\n- [Situatiecheck](/#lead-form)\n\nOf stel een concrete vraag over hoogte, plaatsing of buren.";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { REDUCD_SYSTEM, fallbackAnswer };
}
if (typeof window !== "undefined") {
  window.REDUCD_ASSISTANT_FALLBACK = fallbackAnswer;
}
