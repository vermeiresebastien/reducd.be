/**
 * HTML documentation derived from REDUCD PDFs (BE contact, VLAREM i.p.v. NL-Bbl).
 * Original PDFs remain the downloadable source after the lead gate.
 */
(function () {
  const BE = {
    phone: "+32 472 08 44 70",
    tel: "+32472084470",
    mail: "info@reducd.be"
  };

  function contactBar() {
    return (
      '<div class="doc-note"><strong>België · vragen?</strong> ' +
      '<a href="tel:' + BE.tel + '">' + BE.phone + "</a> · " +
      '<a href="mailto:' + BE.mail + '">' + BE.mail + "</a>. " +
      "De originele PDF’s vermelden soms een Nederlands nummer; voor deze site geldt altijd het Belgische contact.</div>"
    );
  }

  function pdfNote(label) {
    return (
      '<p class="text-sm">De volledige layout, tekeningen en grafieken zitten in de originele PDF — download via de knop bovenaan (' +
      label +
      ").</p>"
    );
  }

  function octaveTable(values, avgLabel) {
    const hz = [125, 250, 500, 1000, 2000, 4000, 8000];
    const cells = hz.map((h, i) => "<tr><td>" + h + " Hz</td><td>" + values[i] + " dB</td></tr>").join("");
    return (
      '<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Octaafband</th><th>Invoegverlies</th></tr></thead><tbody>' +
      cells +
      '<tr><td>Gemiddelde (A-gewogen)</td><td><strong>' +
      avgLabel +
      "</strong></td></tr></tbody></table></div>"
    );
  }

  const html = {};

  html.brochure = function () {
    return (
      contactBar() +
      '<div class="doc-stats">' +
      "<div class=\"doc-stat\"><b>14 dB(A)</b><span>Vrijstaand · Peutz 2025</span></div>" +
      "<div class=\"doc-stat\"><b>10–12 dB(A)</b><span>Wandmodel</span></div>" +
      "<div class=\"doc-stat\"><b>5 maten</b><span>S / L / XL + wand S / L</span></div>" +
      "<div class=\"doc-stat\"><b>± 2 uur</b><span>Zelf monteren, of door ons</span></div>" +
      "</div>" +
      "<h2>Ervaar de rust</h2>" +
      "<p>REDUCD maakt duurzame, eenvoudig te installeren akoestische omkastingen voor (hybride) warmtepompen en airco’s. Vijf standaardmaten, plus maatwerk als de unit of de gevel dat vraagt.</p>" +
      '<div class="doc-callout"><p>In <strong>Vlaanderen</strong> toets je het specifieke geluid van een buitenunit aan de <strong>VLAREM-richtwaarden</strong> (woongebied 45 / 40 / 35 dB(A) dag · avond · nacht). De Nederlandse Bbl-norm van 45/40 dB op de perceelsgrens uit de papieren brochure 2025 geldt hier niet. Reken eerst met de <a href="../vlarem/" style="color:#fff">VLAREM-rekentool</a>, of plan een <a href="#" data-open-lead-popup style="color:#fff"><span class="accent-gratis">gratis</span> meting</a>.</p></div>' +
      "<h2>Hoe de omkasting dempt</h2>" +
      '<div class="doc-two">' +
      "<div class=\"doc-card\"><h3>Geluidsabsorptie</h3><p>Poreus, gerecycled PET aan de binnenzijde neemt geluidsenergie op. Bij elke reflectie in de kast verdwijnt een deel van het geluid.</p></div>" +
      "<div class=\"doc-card\"><h3>Geluidsisolatie</h3><p>De Magnelis®-behuizing is zwaar en luchtdicht. Samen met de 150 mm-demper (louvres) houdt ze het geluid binnen de kast, met behoud van luchtweg.</p></div>" +
      "</div>" +
      "<p>Elke 6 dB(A) reductie is een halvering van de geluidsdruk. 14 dB(A) is in de praktijk het grootste deel van het waargenomen geluid.</p>" +
      "<h2>Welk model?</h2>" +
      '<div class="doc-two">' +
      "<div class=\"doc-card\"><h3>Vrijstaand</h3><p>Unit in de tuin, oprit of plat dak, rondom vrij. Lucht <strong>achter in, voor uit</strong>. Gemiddeld <strong>14 dB(A)</strong>.</p></div>" +
      "<div class=\"doc-card\"><h3>Wandmodel</h3><p>Unit met de rug tegen de gevel. Lucht <strong>zij in, voor uit</strong>. Gemiddeld <strong>10 dB(A)</strong> (tot 12 dB(A) afhankelijk van de situatie). Optioneel akoestisch achterdeel.</p></div>" +
      "</div>" +
      "<h2>Afmetingen (mm) · binnen / buiten</h2>" +
      '<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Model</th><th>H</th><th>B</th><th>D</th><th>Gewicht</th></tr></thead><tbody>' +
      "<tr><td>Vrijstaand S</td><td>990 / 1060</td><td>1090 / 1220</td><td>650 / 950</td><td>160 kg</td></tr>" +
      "<tr><td>Vrijstaand L</td><td>1350 / 1450</td><td>1250 / 1410</td><td>650 / 950</td><td>250 kg</td></tr>" +
      "<tr><td>Vrijstaand XL</td><td>1670 / 1770</td><td>1250 / 1410</td><td>650 / 950</td><td>330 kg</td></tr>" +
      "<tr><td>Wand S</td><td>990 / 1050</td><td>1060 / 1360</td><td>650 / 805</td><td>160 kg</td></tr>" +
      "<tr><td>Wand L</td><td>1310 / 1370</td><td>1250 / 1550</td><td>800 / 955</td><td>250 kg</td></tr>" +
      "</tbody></table></div>" +
      "<p>Maten volgens de technische specificaties (maart 2026). De brochure 2025 noemt voor wand S een buitenhoogte van 1030 mm — de actuele specificatie is 1050 mm.</p>" +
      "<h2>Built to Last</h2>" +
      "<ul>" +
      "<li>Behuizing: Magnelis® — tot 10× corrosiebestendiger dan klassiek verzinkt staal, zelfherstellend op snijkanten, geschikt voor kust en agrarisch.</li>" +
      "<li>Bevestiging: RVS 316.</li>" +
      "<li>Akoestiek: gerecycled PET (circa 65–70 % recyclaat).</li>" +
      "<li>Standaard Magnelis-look; optioneel poedercoat in elke RAL, mat of zijdeglans.</li>" +
      "<li>Buy-back: bij een nieuwe buitenunit kan REDUCD de bestaande kast terugnemen (voorwaarden op aanvraag).</li>" +
      "</ul>" +
      "<h2>Plaatsing in het kort</h2>" +
      "<ul>" +
      "<li>Vrijstaand: min. 50 cm voor én achter, 10 cm opzij. Ondergrond stevig, waterpas, goede afwatering (grindkoffer aangeraden).</li>" +
      "<li>Wand: min. 50 cm voor én opzij; achterkant tegen de muur. Nooit rechtstreeks op dakleer.</li>" +
      "<li>Zelf monteren in circa 2 uur, of laten plaatsen. Standaardmaten vaak binnen een week.</li>" +
      "</ul>" +
      pdfNote("Brochure 2025")
    );
  };

  html.specsVrijstaand = function () {
    return (
      contactBar() +
      '<div class="doc-stats">' +
      "<div class=\"doc-stat\"><b>S · L · XL</b><span>+ maatwerk</span></div>" +
      "<div class=\"doc-stat\"><b>14 dB(A)</b><span>Peutz 23 juli 2025</span></div>" +
      "<div class=\"doc-stat\"><b>150 mm</b><span>Standaard demperdikte</span></div>" +
      "<div class=\"doc-stat\"><b>1,5–2 u</b><span>Eenvoudige montage</span></div>" +
      "</div>" +
      "<h2>Toepassing</h2>" +
      "<p>REDUCD vrijstaand model voor geluidsreductie van warmtepomp-buitenunits. Geschikt voor bestaande en nieuwe installaties. Plaatsing vrijstaand: tuin, oprit, plat dak.</p>" +
      "<p>Materialen: Magnelis®, absorptie van gerecycled PET, RVS 316.</p>" +
      "<h2>Afmetingen (mm)</h2>" +
      '<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th></th><th>S</th><th>L</th><th>XL</th></tr></thead><tbody>' +
      "<tr><td>Hoogte binnen / buiten</td><td>990 / 1060</td><td>1350 / 1450</td><td>1670 / 1770</td></tr>" +
      "<tr><td>Breedte binnen / buiten</td><td>1090 / 1220</td><td>1250 / 1410</td><td>1250 / 1410</td></tr>" +
      "<tr><td>Diepte binnen / buiten</td><td>650 / 950</td><td>650 / 950</td><td>650 / 950</td></tr>" +
      "<tr><td>Gewicht</td><td>160 kg</td><td>250 kg</td><td>330 kg</td></tr>" +
      "</tbody></table></div>" +
      "<p>Demperdikte standaard 150 mm. Maatwerk: diepte aanpasbaar, bijvoorbeeld een V-demper van 300 mm voor extra demping.</p>" +
      "<h2>Akoestiek — Peutz, 23 juli 2025</h2>" +
      "<p>Laboratorium voor Akoestiek, Mook. Conform ISO 3741:2010 en ISO 7235:2003. Gemiddelde reductie <strong>14 dB(A)</strong>. Exacte demping is situatie-afhankelijk (reflecties, omgeving, spectrum van de pomp).</p>" +
      octaveTable(["2,2", "8,0", "7,4", "10,3", "15,6", "17,2", "16,0"], "14 dB(A)") +
      "<h2>Luchtstroom</h2>" +
      "<ul>" +
      "<li>Aanvoer: louvre achteraan.</li>" +
      "<li>Uitblaas: louvre vooraan.</li>" +
      "<li>Anti-recirculatieplaat standaard meegeleverd — scheidt warme en koude lucht. Enkelstuks op maat tijdens montage; projecten voorbereid.</li>" +
      "</ul>" +
      "<p>Drukval hangt af van het luchtdebiet (m³/h). De grafiek per maat S / L&amp;XL staat in de PDF. Twijfel over luchtdoorlaat? Neem contact op.</p>" +
      "<h2>Vrije ruimte</h2>" +
      '<div class="doc-two">' +
      "<div class=\"doc-card\"><h3>Rondom de kast (buiten)</h3><ul><li>Voor: min. 50 cm</li><li>Achter: min. 50 cm</li><li>Zijkanten: min. 10 cm</li></ul></div>" +
      "<div class=\"doc-card\"><h3>Tussen unit en kast (binnen)</h3><ul><li>Voor, achter en zij: min. 5 cm</li></ul></div>" +
      "</div>" +
      "<p>Meerdere units (zij-aan-zij of rug-aan-rug): altijd overleg. Ondergrond stevig, waterpas, goede afwatering (grindkoffer aangeraden).</p>" +
      "<p>Geschikt voor alle <strong>horizontaal uitblazende, vrij opgestelde</strong> buitenunits.</p>" +
      "<h2>Leidingwerk &amp; onderhoud</h2>" +
      "<ul>" +
      "<li>Bij voorkeur leidingen via de grond, binnen de kast — dan geen uitsparing.</li>" +
      "<li>Anders: uitsparing in zijdeel of achterdemper tijdens montage.</li>" +
      "<li>Klein onderhoud unit: bovendeel, 4× M6.</li>" +
      "<li>Groter onderhoud: voor- of zijpaneel, 8× M6. Elk paneel los zonder de hele kast te slopen.</li>" +
      "<li>De omkasting zelf vraagt geen onderhoud. Houd planten kort zodat lucht vrij blijft.</li>" +
      "</ul>" +
      "<h2>Levering &amp; garantie</h2>" +
      "<ul>" +
      "<li>Montage door klant, installateur of REDUCD. Warmtepomp blijft in bedrijf; REDUCD wijzigt de technische installatie niet.</li>" +
      "<li>Standaardmaten uit voorraad, vaak binnen 1 week. Maatwerk 6–10 weken (spoed in overleg).</li>" +
      "<li>Montage door REDUCD vaak binnen 2–4 weken in te plannen. Levering 5 dagen/week, op pallet.</li>" +
      "<li>Garantie volgens de algemene voorwaarden. Verplaatsen van de pomp altijd via de installateur.</li>" +
      "</ul>" +
      pdfNote("Technische specificaties vrijstaand")
    );
  };

  html.specsWand = function () {
    return (
      contactBar() +
      '<div class="doc-stats">' +
      "<div class=\"doc-stat\"><b>S · L</b><span>+ maatwerk</span></div>" +
      "<div class=\"doc-stat\"><b>10 dB(A)</b><span>Peutz 23 juli 2025</span></div>" +
      "<div class=\"doc-stat\"><b>150 mm</b><span>Voor- én zijdermper</span></div>" +
      "<div class=\"doc-stat\"><b>6× M6</b><span>Servicepaneel</span></div>" +
      "</div>" +
      "<h2>Toepassing</h2>" +
      "<p>REDUCD wandmodel voor buitenunits die vlak bij een wand staan: voorgevel, zijgevel of plat dak met de rug naar de muur. Bestaande en nieuwe installaties.</p>" +
      "<p><strong>Optioneel akoestisch achterdeel</strong> — voor extra reductie, minder geluid naar binnen, of bij een oneffen / niet-massieve achterwand (houten schutting).</p>" +
      "<h2>Afmetingen (mm)</h2>" +
      '<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th></th><th>S</th><th>L</th></tr></thead><tbody>' +
      "<tr><td>Hoogte binnen / buiten</td><td>990 / 1050</td><td>1310 / 1370</td></tr>" +
      "<tr><td>Breedte binnen / buiten</td><td>1060 / 1360</td><td>1250 / 1550</td></tr>" +
      "<tr><td>Diepte binnen / buiten</td><td>650 / 805</td><td>800 / 955</td></tr>" +
      "<tr><td>Gewicht</td><td>160 kg</td><td>250 kg</td></tr>" +
      "</tbody></table></div>" +
      "<p>Voor- en zijdermper standaard 150 mm. Maatwerk: o.a. V-demper 300 mm.</p>" +
      "<h2>Akoestiek — Peutz, 23 juli 2025</h2>" +
      "<p>Zelfde lab en normen als het vrijstaand model. Gemiddelde reductie wandmodel: <strong>10 dB(A)</strong>.</p>" +
      octaveTable(["0,8", "4,8", "5,0", "7,4", "12,5", "15,7", "14,4"], "10 dB(A)") +
      "<h2>Luchtstroom</h2>" +
      "<ul>" +
      "<li>Aanvoer: louvres links én rechts.</li>" +
      "<li>Uitblaas: louvre vooraan.</li>" +
      "<li>Anti-recirculatieplaat standaard.</li>" +
      "</ul>" +
      "<p>Drukval: zie grafiek in de PDF. Bij twijfel over luchtdoorlaat: contact.</p>" +
      "<h2>Vrije ruimte</h2>" +
      '<div class="doc-two">' +
      "<div class=\"doc-card\"><h3>Rondom de kast</h3><ul><li>Voor: min. 50 cm</li><li>Achter: n.v.t. (tegen de muur)</li><li>Zijkanten: min. 50 cm</li></ul></div>" +
      "<div class=\"doc-card\"><h3>Tussen unit en kast</h3><ul><li>Voor: min. 5 cm</li><li>Achter: n.v.t.</li><li>Zijkanten: min. 5 cm</li></ul></div>" +
      "</div>" +
      "<p>Geschikt voor horizontaal uitblazende units met <strong>rug naar de muur</strong>. Ondergrond stevig, waterpas, grindkoffer aangeraden.</p>" +
      "<h2>Leidingwerk &amp; onderhoud</h2>" +
      "<ul>" +
      "<li>Bij voorkeur leidingen via grond of achtergevel, binnen de kast.</li>" +
      "<li>Via zijkant of bovenzijde: uitsparing tijdens montage, opvulmateriaal tegen de gevel.</li>" +
      "<li>Klein onderhoud: bovendeel, 4× M6.</li>" +
      "<li>Groter onderhoud: voor- of zijpanelen, <strong>6× M6</strong> (niet 8 zoals vrijstaand).</li>" +
      "</ul>" +
      "<h2>Montage op hoogte</h2>" +
      "<p>Op een plat dak moet de kast <strong>aan de muur bevestigd</strong> worden. Bevestigingsmateriaal (ankers, pluggen) is niet meegeleverd — kies wat bij de muur past. Nooit direct op dakleer.</p>" +
      "<h2>Levering</h2>" +
      "<p>Zelfde ritme als vrijstaand: voorraad ± 1 week, maatwerk 6–10 weken, montage 1,5–2 uur zonder uitsparing. Warmtepomp blijft in bedrijf.</p>" +
      pdfNote("Technische specificaties wandmodel")
    );
  };

  html.installVrijstaand = function (audience) {
    const extra =
      audience === "pro"
        ? "<p>Voor de werf: print of open deze pagina op de telefoon. De originele handleiding (QR naar video’s) zit in de PDF.</p>"
        : "<p>Je mag dit zelf doen. Geen specialistisch gereedschap, wel twee personen voor het bovendeel. Liever uitbesteden? REDUCD plaatst.</p>";
    return (
      contactBar() +
      extra +
      '<div class="doc-video"><iframe src="https://www.youtube.com/embed/8CJLvJUjWmk" title="REDUCD installatie vrijstaand" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>' +
      "<h2>Gereedschap</h2>" +
      "<ul><li>Dop- of steeksleutel M10</li><li>Metaalzaag of haakse slijper</li><li>Multitool / decoupeerzaag (metaal)</li><li>Waterpas, potlood</li><li>Veiligheidsbril en gehoorbescherming</li><li>Bij uitsparing in demper: popnagels en tang</li></ul>" +
      "<h2>Onderdelen (voorbeeld maat S)</h2>" +
      "<ul>" +
      "<li>20× M6 × 25 mm</li>" +
      "<li>2× zijdeel (op S: 990 × 995)</li>" +
      "<li>1× recirculatieplaat</li>" +
      "<li>1× bovendeel (op S: 1220 × 950)</li>" +
      "<li>2× demper (op S: 1060 × 990)</li>" +
      "<li>4×2 klittenband, 2× bevestigingshaakjes</li>" +
      "</ul>" +
      "<p>L / XL hebben grotere panelen; tel de onderdelen na bij levering.</p>" +
      "<h2>Stappen</h2>" +
      '<ol class="doc-steps">' +
      "<li><h3>Veiligheid</h3><p>PBM. Bij plaatsing op hoogte: bovendeel stevig verankeren met de 4 meegeleverde M6-boutjes.</p></li>" +
      "<li><h3>Uitsparing leidingwerk</h3><p>Via de bodem: geen uitsparing. Via de zijkant: uitsparing in het zijdeel. Via de achterkant: uitsparing in de achterdemper. Zie de video “uitsparing leidingwerk”.</p></li>" +
      "<li><h3>Plaats achterdemper</h3><p>Zet een demper achter de pomp op circa <strong>15 cm</strong>. Op een stevige, waterpas ondergrond blijft die zelfstandig staan.</p></li>" +
      "<li><h3>Plaats zijdelen</h3><p>Beide zijdelen tegen de achterdemper.</p></li>" +
      "<li><h3>Monteer zijdelen</h3><p>Vast met 8× M6 × 25 mm.</p></li>" +
      "<li><h3>Recirculatieplaat</h3><p>Zaag een uitsparing voor ventilator (rond/rechthoekig) en montagebalken. Bevestig met klittenband en haakjes aan de unit. Zie video “recirculatieplaat”.</p></li>" +
      "<li><h3>Voordempers</h3><p>Voordempers tussen de zijdelen, vast met de overige 8× M6 × 25 mm.</p></li>" +
      "<li><h3>Bovendeel</h3><p><strong>Twee personen.</strong> Uitsparingen gelijkmatig over de 4 pinnen van de zijdelen. Daarna 4× M6. Op hoogte: extra controleren of het deksel vastzit.</p></li>" +
      "</ol>" +
      '<div class="doc-callout"><p>REDUCD past de warmtepompinstallatie niet aan. Verplaatsen van de unit: altijd via de installateur.</p></div>' +
      pdfNote("Installatiehandleiding vrijstaand")
    );
  };

  html.installWand = function (audience) {
    const extra =
      audience === "pro"
        ? "<p>Maat S: 1 persoon. Maat L: 2 personen. Muurankers zelf voorzien.</p>"
        : "<p>Wandmodel S kun je alleen. L met twee. Op een dak: nooit op het dakleer, wél muurbevestiging.</p>";
    return (
      contactBar() +
      extra +
      "<h2>Gereedschap</h2>" +
      "<ul><li>Dop- of steeksleutel M10</li><li>Multitool / decoupeerzaag (metaal)</li><li>Waterpas, potlood</li><li>Veiligheidsbril en gehoorbescherming</li></ul>" +
      "<h2>Onderdelen</h2>" +
      "<ul>" +
      "<li>18× M6 × 25 mm + 8× M6-moeren</li>" +
      "<li>Zijdeel links, zijdeel rechts, voordempers, bovendeel</li>" +
      "<li>Recirculatieplaat, opvulmateriaal, 1× klittenband</li>" +
      "<li>Optioneel: akoestisch achterdeel (L/XL: twee achterpanelen)</li>" +
      "</ul>" +
      "<h2>Stappen</h2>" +
      '<ol class="doc-steps">' +
      "<li><h3>Veiligheid &amp; dak</h3><p>PBM. Nooit direct op dakleer — extra bescherming ertussen. Op hoogte: kast aan de muur, met ankers/pluggen die bij díe muur horen (niet meegeleverd).</p></li>" +
      "<li><h3>Locatie zijdelen</h3><p>Afstand tussen zijdelen: <strong>1,06 m (S)</strong> of <strong>1,25 m (L)</strong>. Ideaal: al het leidingwerk valt binnen de kast. Situatie 2/3: leidingen via zijkant of boven — ga naar opvulmateriaal.</p></li>" +
      "<li><h3>Opvulmateriaal (1A)</h3><p>Als leidingen de kast verlaten: randen tussen kast en gevel vullen tot er geen spleet meer is (nodig voor demping). Alleen een uitsparing voor de doorvoer.</p></li>" +
      "<li><h3>Akoestisch achterdeel (1B, optioneel)</h3><p>Eerst één zijpaneel los naast de pomp. Achterdeel tegen de gevel, steunend tegen dat zijpaneel. Bouten vast. Tweede zijpaneel. Bij twee achterpanelen (L/XL): moergat het verst van de rand = bovenkant. Panelen niet aan elkaar, elk aan de zijpanelen.</p></li>" +
      "<li><h3>Recirculatieplaat</h3><p>Uitsparing ventilator + montagebalken. Zo nodig hoogte/breedte op maat. Buiglijnen: 3 mm plaat, aan de voorzijde 1–1,5 mm insnijden (niet doorsnijden), dan buigen tot de plaat in de hoek tussen zijdelen en voordempers klem zit. Vast met klittenband.</p></li>" +
      "<li><h3>Voordempers</h3><p>Tussen de zijdelen, 6× M6 + moeren.</p></li>" +
      "<li><h3>Bovenzijde</h3><p>Vast met de overige 4× M6.</p></li>" +
      "<li><h3>Op hoogte</h3><p>Aan beide zijden een muuranker.</p></li>" +
      "</ol>" +
      pdfNote("Installatiehandleiding wandmodel")
    );
  };

  html.meetrapport = function () {
    return (
      contactBar() +
      '<div class="doc-stats">' +
      "<div class=\"doc-stat\"><b>A 4148-2-RA-001</b><span>Peutz · 26 jan 2022</span></div>" +
      "<div class=\"doc-stat\"><b>ISO 3741 / 7235</b><span>Nagalmkamer Mook</span></div>" +
      "<div class=\"doc-stat\"><b>14 dB(A)</b><span>Actueel vrijstaand · juli 2025</span></div>" +
      "<div class=\"doc-stat\"><b>10 dB(A)</b><span>Actueel wand · juli 2025</span></div>" +
      "</div>" +
      '<div class="doc-callout"><p>Het PDF-rapport is de <strong>labproef van 2022</strong> (invoegverlies met ruisbron). De <strong>productcijfers die we vandaag communiceren</strong> komen uit de Peutz-meting van <strong>23 juli 2025</strong> in de technische specificaties. Beide zijn onafhankelijk; de constructie is sindsdien doorontwikkeld (Magnelis, PET, 150 mm-demper).</p></div>' +
      "<h2>Wat is gemeten (2022)?</h2>" +
      "<p>Peutz bv, Laboratorium voor Akoestiek, Mook. Opdrachtgever REDUCD, Elzerijs, Riethoven. Verantwoordelijke R.T. Allan. RvA-erkend lab, EA MLA.</p>" +
      "<p>Beproefde kast destijds: circa 1210 × 990 × 950 mm, 1 mm staalplaat, 80 mm vlokkenschuim, coulissen 45° / diepte ± 240 mm. Resultaten gelden voor díe kast onder labomstandigheden — geen uitspraak over representativiteit van latere series.</p>" +
      "<h2>Methode</h2>" +
      "<p>Ruisbron vrij in de nagalmkamer versus in de omkasting. Invoegverlies D<sub>i</sub> = L<sub>w,vrij</sub> − L<sub>w,in kast</sub>, tertsen 50 Hz–10 kHz. Achtergrondcorrectie volgens ISO 3741. Reproduceerbaarheid o.a. 0,5 dB op L<sub>WA</sub> voor een relatief vlak spectrum.</p>" +
      "<h2>Invoegverlies 2022 (1/1 octaaf, ruisbron)</h2>" +
      '<div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Hz</th><th>dB</th></tr></thead><tbody>' +
      "<tr><td>63</td><td>−5,2</td></tr>" +
      "<tr><td>125</td><td>1,7</td></tr>" +
      "<tr><td>250</td><td>7,7</td></tr>" +
      "<tr><td>500</td><td>6,9</td></tr>" +
      "<tr><td>1000</td><td>11,5</td></tr>" +
      "<tr><td>2000</td><td>15,8</td></tr>" +
      "<tr><td>4000</td><td>15,9</td></tr>" +
      "<tr><td>8000</td><td>17,6</td></tr>" +
      "</tbody></table></div>" +
      "<p>Lage frequenties dempen minder — dat is normaal bij dit type omkasting. In de praktijk hoor je vooral het midden en hoog wegvallen.</p>" +
      "<h2>Actuele productdata (juli 2025)</h2>" +
      "<p>Vrijstaand gemiddeld <strong>14 dB(A)</strong> — octaven 2,2 / 8,0 / 7,4 / 10,3 / 15,6 / 17,2 / 16,0. Wandmodel gemiddeld <strong>10 dB(A)</strong> — 0,8 / 4,8 / 5,0 / 7,4 / 12,5 / 15,7 / 14,4.</p>" +
      "<p>Peutz: in de praktijk (ander geluidveld, andere inbouw) kunnen resultaten afwijken van het lab.</p>" +
      pdfNote("Meetrapport Peutz") +
      '<p>Na unlock kun je de originele 12 pagina’s + figuren downloaden. Voor een perceelsgrens-inschatting in Vlaanderen: <a href="../vlarem/">VLAREM-rekentool</a>.</p>'
    );
  };

  html.voorwaarden = function () {
    return (
      contactBar() +
      '<div class="doc-note"><strong>Bindende tekst:</strong> dit is een leesbare samenvatting. Alleen de PDF “Algemene voorwaarden REDUCD” is juridisch leidend. Belgische klanten: dezelfde voorwaarden van Reducd B.V.; voor dagelijks contact gebruik ' +
      BE.mail +
      " / " +
      BE.phone +
      ".</div>" +
      "<h2>Wie</h2>" +
      "<p>Reducd B.V., Elzerijs nr. 6, 5561 VB Riethoven (NL). KvK 85843075. “Wederpartij” / “koper” = de klant van Reducd B.V. Andere algemene voorwaarden zijn uitgesloten, tenzij Reducd schriftelijk anders bevestigt.</p>" +
      "<p>De voorwaarden bestaan uit I. algemene voorwaarden en II. aanvullingen voor de webshop (o.a. herroepingsrecht consument).</p>" +
      "<h2>Offertes</h2>" +
      "<ul>" +
      "<li>Aanbiedingen zijn vrijblijvend; voorraad onder voorbehoud van tussentijdse verkoop.</li>" +
      "<li>Offertes 30 dagen geldig, tenzij anders vermeld. Bindend na schriftelijke aanvaarding binnen die termijn én schriftelijke opdrachtbevestiging door Reducd (of de factuur bij directe levering).</li>" +
      "<li>Een samengestelde prijs verplicht niet tot deellevering tegen een evenredig deel.</li>" +
      "<li>Cataloguscijfers, tekeningen en maten zijn informatief tenzij uitdrukkelijk overeengekomen.</li>" +
      "</ul>" +
      "<h2>Prijzen</h2>" +
      "<ul>" +
      "<li>Tenzij anders aangegeven: af fabriek, exclusief verpakking, montage en inbedrijfstelling. Verpakking tegen kostprijs, geen terugname.</li>" +
      "<li>Zakelijk: prijzen excl. btw. Particulier: incl. btw, tenzij anders vermeld.</li>" +
      "<li>Reducd mag een stijging van kostprijsfactoren na sluiten van de overeenkomst doorberekenen; de koper kiest het moment van betaling van die stijging.</li>" +
      "</ul>" +
      "<h2>Levering, risico, betaling</h2>" +
      "<ul>" +
      "<li>Levertijden zijn bij benadering, geen fatale termijnen, tenzij uitdrukkelijk anders. Bij vertraging: schriftelijk in gebreke stellen.</li>" +
      "<li>Risico gaat over wanneer de eerste vervoerder de zaken in ontvangst neemt (ook bij deellevering), tenzij anders overeengekomen.</li>" +
      "<li>Betaling: zoals in opdrachtbevestiging / overeenkomst, anders <strong>binnen 14 dagen</strong> zonder aftrek op een rekening van Reducd.</li>" +
      "</ul>" +
      "<h2>Garantie</h2>" +
      "<ul>" +
      "<li>Nieuwe producten: <strong>24 maanden</strong> na levering (of na start opslag volgens art. 8). Gebruikt/gereviseerd: 3 maanden, tenzij schriftelijk anders.</li>" +
      "<li>Zichtbare gebreken: schriftelijk <strong>binnen 8 dagen</strong> na levering. Niet-zichtbare: onmiddellijk na ontdekking.</li>" +
      "<li>Herstel of vervanging naar keuze van Reducd. Retour naar Riethoven voor rekening van de koper tot de klacht gegrond is; herplaatsing blijft voor de koper.</li>" +
      "<li>Reducd wijzigt de warmtepompinstallatie niet.</li>" +
      "</ul>" +
      "<h2>Consument · webshop / herroeping</h2>" +
      "<p>Voor aankopen op afstand (webshop) gelden extra regels. Herroeping: binnen de wettelijke bedenktijd melden, o.a. per mail naar <strong>info@reducd.nl</strong> of schriftelijk naar Elzerijs nr. 4, 5561 VB Riethoven, en het product binnen 14 dagen terugzenden. Sommige overeenkomsten hebben geen herroepingsrecht (art. 6:230p BW) — zie PDF.</p>" +
      "<h2>Geschil &amp; recht</h2>" +
      "<p>Nederlands recht. Weens Koopverdrag uitgesloten. Bevoegde rechter in eerste aanleg: arrondissement <strong>Oost-Brabant</strong>. Gedeponeerd bij KvK Eindhoven; de versie geldt die van toepassing was bij de transactie.</p>" +
      pdfNote("Algemene voorwaarden") +
      '<p>PDF-weergave:</p><iframe class="doc-embed" title="Algemene voorwaarden PDF" src="../assets/docs/algemene-voorwaarden.pdf"></iframe>'
    );
  };

  window.REDUCD_DOCS = {
    brochure: {
      id: "brochure",
      title: "Brochure 2025",
      kicker: "Productoverzicht",
      summary: "Vijf standaardmaten, 14 dB(A) vrijstaand, Built to Last, plaatsing en VLAREM in België.",
      pdf: "../assets/docs/brochure-2025.pdf",
      html: html.brochure
    },
    "specs-vrijstaand": {
      id: "specs-vrijstaand",
      title: "Technische specificaties — vrijstaand",
      kicker: "S · L · XL",
      summary: "Maten, 14 dB(A) octaafdata (Peutz juli 2025), luchtweg, vrije ruimte, service en levering.",
      pdf: "../assets/docs/specs-vrijstaand.pdf",
      html: html.specsVrijstaand
    },
    "specs-wandmodel": {
      id: "specs-wandmodel",
      title: "Technische specificaties — wandmodel",
      kicker: "S · L",
      summary: "Wandmaten, 10 dB(A) octaafdata, zijdelingse aanzuig, achterdeel en dakmontage.",
      pdf: "../assets/docs/specs-wandmodel.pdf",
      html: html.specsWand
    },
    "installatie-vrijstaand": {
      id: "installatie-vrijstaand",
      title: "Installatiehandleiding — vrijstaand",
      kicker: "Stap voor stap",
      summary: "Gereedschap, onderdelen en montage in 8 stappen, plus instructievideo.",
      pdf: "../assets/docs/installatie-vrijstaand.pdf",
      html: html.installVrijstaand
    },
    "installatie-wandmodel": {
      id: "installatie-wandmodel",
      title: "Installatiehandleiding — wandmodel",
      kicker: "Stap voor stap",
      summary: "Zijdelen, opvulmateriaal, recirculatieplaat, voordempers en muurbevestiging.",
      pdf: "../assets/docs/installatie-wandmodel.pdf",
      html: html.installWand
    },
    meetrapport: {
      id: "meetrapport",
      title: "Meetrapport Peutz",
      kicker: "Onafhankelijke proof",
      summary: "Labrapport 2022 (invoegverlies) naast de actuele Peutz-cijfers van juli 2025.",
      pdf: "../assets/docs/meetrapport-peutz.pdf",
      html: html.meetrapport
    },
    voorwaarden: {
      id: "voorwaarden",
      title: "Algemene voorwaarden",
      kicker: "Juridisch",
      summary: "Offerte, betaling, garantie 24 maanden en herroeping — plus de originele PDF.",
      pdf: "../assets/docs/algemene-voorwaarden.pdf",
      html: html.voorwaarden
    }
  };
})();
