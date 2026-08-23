/**
 * Vlaamse SEO-artikelen: NL-onderwerpen herschreven voor België / Vlaanderen.
 * Direct antwoord eerst (AI-vindbaarheid), VLAREM i.p.v. Bouwbesluit, BE-contact.
 */

const CTA =
  '<p>Twijfel je over jouw buitenunit in Vlaanderen, Brussel of Wallonië? Reken eerst met de <a href="../vlarem/">VLAREM-rekentool</a> of plan een <a data-open-lead-popup href="../index.html#contact"><span class="accent-gratis">gratis</span> meting</a> via info@reducd.be of +32 472 08 44 70.</p>';

function be(partial) {
  return {
    authorName: "REDUCD",
    status: "published",
    featured: false,
    series: "vlaanderen",
    ...partial
  };
}

export const BE_BLOG_POSTS = [
  be({
    slug: "geluidsoverlast-mitsubishi-warmtepomp-omkasting",
    title: "Geluidsoverlast van uw Mitsubishi warmtepomp? REDUCD biedt de oplossing",
    metaTitle: "Mitsubishi warmtepomp te luid in Vlaanderen? | REDUCD",
    metaDescription:
      "Mitsubishi Ecodan of Zubadan te hoorbaar bij de perceelgrens? Wat VLAREM vraagt in Vlaanderen en hoe een akoestische omkasting gemiddeld 14 dB(A) reduceert.",
    excerpt:
      "Een Mitsubishi-buitenunit is betrouwbaar, maar in een Vlaamse rijwoning of zijtuin vaak te hoorbaar. Wat je meet, wat VLAREM toetst, en wat écht dempt.",
    coverImage: "assets/images/google/photo-03.jpg",
    publishedAt: "2026-08-22",
    keywords: ["Mitsubishi warmtepomp geluid", "Ecodan omkasting", "VLAREM warmtepomp", "akoestische omkasting Vlaanderen"],
    faq: [
      {
        q: "Hoeveel geluid maakt een Mitsubishi-warmtepomp?",
        a: "Afhankelijk van type en toerental meestal 45–65 dB(A) bij de unit. Bij de perceelgrens telt afstand, weerkaatsing en nachtregime. VLAREM kijkt naar het specifiek geluid in jouw gebied, niet alleen naar het cataloguscijfer."
      },
      {
        q: "Helpt een sierkap rond een Mitsubishi Ecodan?",
        a: "Zelden. Een sierkap verbergt de unit maar dempt nauwelijks. Een geteste akoestische omkasting met luchtweg en absorptie haalt gemiddeld 14 dB(A) reductie."
      },
      {
        q: "Geldt VLAREM voor een residentiële Mitsubishi in de tuin?",
        a: "In Vlaanderen toets je het specifiek geluid van de installatie aan de richtwaarden van het gebied (vaak 45 / 40 / 35 dB(A) overdag / ’s avonds / ’s nachts in woongebied). Gemeente en burenhinder komen daar nog bij."
      }
    ],
    content: `
      <p><strong>Ja: een Mitsubishi-warmtepomp die te luid is in een Vlaamse tuin, zijstrook of tegen de gevel, los je structureel op met plaatsing, trillingsdemping en een geteste akoestische omkasting — niet met een houten scherm.</strong> Mitsubishi Ecodan- en Zubadan-units staan in Vlaanderen vaak dicht bij de perceelgrens. Het cataloguscijfer op 1 meter zegt weinig over wat de buren ’s nachts horen.</p>

      <h2>Waarom net Mitsubishi zo hoorbaar kan zijn</h2>
      <p>Mitsubishi maakt sterke lucht/water-units. Bij hoge warmtevraag of ontdooien stijgt het toerental. In een smalle Gentse, Antwerpse of Leuvense zijtuin kaatst dat geluid tussen twee muren. Dan hoor je een lage zoem plus ventilator, precies wanneer de buurt stiller wordt. Dat is geen defect; het is akoestiek plus opstelling.</p>
      <p>Wie alleen naar “dB van de folder” kijkt, mist weerkaatsing, ondergrond en de nachtwaarde. In Vlaanderen toetst VLAREM het <em>specifiek geluid</em> van de inrichting. Onze <a href="./post.html?slug=warmtepomp-geluid-vlarem-berekenen">VLAREM-uitleg</a> en de <a href="../vlarem/">rekentool</a> maken dat concreet.</p>

      <h2>Wat wél werkt bij Ecodan of Zubadan</h2>
      <ul>
        <li>Zet de unit niet in een akoestische hoek, en hou de luchtweg vrij — zie <a href="./post.html?slug=waar-plaats-je-een-warmtepomp-vlaanderen">plaatsingstips</a>.</li>
        <li>Beperk structuurgeluid met een vlakke, gedempte sokkel.</li>
        <li>Kies een <a href="./post.html?slug=akoestische-omkasting-vs-suskast">akoestische omkasting</a>, geen sierkap. REDUCD haalt gemiddeld 14 dB(A) (Peutz, ISO 3741 en ISO 7235).</li>
        <li>Kies <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">vrijstaand of wandmodel</a> op basis van de gevel, niet op smaak alleen.</li>
      </ul>
      <p>Mitsubishi zelf schrijft vrije ruimte voor. Een kast die de unit verstikt, maakt haar luider. Daarom zijn louvres en een 150 mm demper geen details. Meer in de <a href="../docs/">documentatie</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "geluidsoverlast-daikin-altherma-hybride-warmtepomp",
    title: "Geluidsoverlast van je Daikin Altherma Hybride warmtepomp?",
    metaTitle: "Daikin Altherma Hybride te luid? Omkasting Vlaanderen | REDUCD",
    metaDescription:
      "Daikin Altherma Hybride hoorbaar in de tuin of bij de buren in Vlaanderen? Hybride-gedrag, VLAREM-nachtwaarde en wanneer een omkasting nodig is.",
    excerpt:
      "De Altherma Hybride schakelt tussen warmtepomp en ketel. Net die wissel maakt pieken. Wat je in Vlaanderen kunt doen zonder de unit te verstikken.",
    coverImage: "assets/images/google/photo-07.jpg",
    publishedAt: "2026-08-21",
    keywords: ["Daikin Altherma Hybride geluid", "Daikin omkasting België", "hybride warmtepomp Vlaanderen"],
    faq: [
      {
        q: "Maakt een Daikin Altherma Hybride meer lawaai dan een full-electric?",
        a: "Niet per se het toestel, wel het gedrag: bij kou of tapwater springt de compressor harder, of de ketel neemt over. De hoorbare piek zit vaak in die overgang, ’s avonds of in de vroege ochtend."
      },
      {
        q: "Moet elke Daikin in Vlaanderen een omkasting?",
        a: "Nee. Als afstand, opstelling en VLAREM-restwaarde kloppen, volstaat een goede plaatsing. Staat de unit in een nis of bij een slaapkamerraam, dan is een geteste omkasting vaak de kortste weg."
      }
    ],
    content: `
      <p><strong>Een Daikin Altherma Hybride wordt storend als de buitenunit in een hoek, nis of tegen de erfgrens staat — vooral bij de overgang naar hoger toerental.</strong> In Vlaanderen is dit een van de meest geplaatste hybrides: warmtepomp plus gasketel. Overdag valt het weg. ’s Avonds, als de ketel én de ventilator schakelen, hoor je hem tot in de woonkamer of bij de buren.</p>

      <h2>Hybride betekent wisselend geluid</h2>
      <p>De Altherma-buitenunit is geen constante brom. Bij milde dagen draait ze rustig. Bij vrieskou, defrost of een badvraag stijgt het toerental. Dat is normaal, maar in een rijwoning in Vlaams-Brabant of een tuin met twee muren klinkt het harder dan het labocijfer. Lees ook <a href="./post.html?slug=warmtepomp-vrieskou-meer-geluid">waarom kou het geluid opdrijft</a>.</p>
      <p>VLAREM kijkt niet naar “Daikin” of “hybride”, wel naar het specifiek geluid in jouw gebied. Woongebied: vaak 45 dB(A) overdag, 40 ’s avonds, 35 ’s nachts. Reken het met de <a href="../vlarem/">VLAREM-tool</a>.</p>

      <h2>Oplossing zonder de hybride te breken</h2>
      <p>Een sierkap of dichte houten box is riskant: Daikin eist lucht. Een <a href="./post.html?slug=daikin-warmtepomp-ombouw-nodig">akoestische ombouw</a> met berekende in- en uitlaat dempt gemiddeld 14 dB(A) en laat de unit ademen. Wandmodel als de unit tegen de gevel hangt; vrijstaand als ze los in de tuin staat.</p>
      <p>Check ook of de overlast écht de buitenunit is, of trilling via de muur. Dan helpt een sokkel eerst. Praktische stappen: <a href="./post.html?slug=warmtepomp-geluid-dempen-vlaanderen">geluid dempen</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "zwembadwarmtepomp-omkasten-tuin",
    title: "Zwembadwarmtepomp omkasten? Zorgeloos genieten in eigen tuin",
    metaTitle: "Zwembadwarmtepomp omkasten in Vlaanderen | REDUCD",
    metaDescription:
      "Zwembadwarmtepomp te luid voor tuin of buren? In Vlaanderen telt VLAREM ook ’s avonds. Zo omkast je de unit zonder het badwater koud te zetten.",
    excerpt:
      "Een pool-unit draait net wanneer je in de tuin zit. Wat je in Vlaanderen mag verwachten, en hoe een omkasting de zomer stil houdt.",
    coverImage: "assets/images/editorial-feature.jpg",
    publishedAt: "2026-08-20",
    keywords: ["zwembadwarmtepomp omkasting", "pool heat pump geluid", "zwembad warmtepomp buren"],
    faq: [
      {
        q: "Mag een zwembadwarmtepomp ’s avonds blijven draaien in Vlaanderen?",
        a: "Technisch vaak wel, akoestisch niet altijd. ’s Avonds en ’s nachts liggen de VLAREM-richtwaarden lager. Een unit die overdag “net kan”, valt ’s avonds bij de perceelgrens door de mand."
      },
      {
        q: "Verliest de zwembadpomp vermogen in een omkasting?",
        a: "Niet als de luchtweg berekend is. Een dichte box wel. REDUCD-kasten zijn ontworpen om te dempen én te ventileren."
      }
    ],
    content: `
      <p><strong>Ja, een zwembadwarmtepomp in Vlaanderen kun je omkasten — en dat is vaak de enige manier om ’s avonds in de tuin te zitten zonder de buren te storen.</strong> Pool-units staan naast het bad, blazen warmte uit en draaien net in de nazomeravond. Precies het moment waarop VLAREM strenger wordt en stemmen in de tuin stiller.</p>

      <h2>Waarom een pool-unit luider voelt</h2>
      <p>Zwembadwarmtepompen zijn gebouwd op debiet, niet op fluisterstilte. Ze staan op een terras, tegen een haag of in een hoek van de tuin. Water plus harde klinkers kaatst geluid. In verkavelingen in Limburg of de Kempen ligt de perceelgrens soms op zes meter. Dan is “de folder zegt 50 dB” geen argument meer.</p>

      <h2>Omkasten zonder koud water</h2>
      <p>Houd de uitblaas vrij, kies het juiste <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">model</a> en laat genoeg <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">service-ruimte</a>. Een Magnelis-kast blijft buiten staan, ook nat en chloorhoudend in de buurt van het bad. Meer over materiaal: <a href="./post.html?slug=magnelis-omkasting-duurzaam-materiaal">Magnelis en Built to Last</a>.</p>
      <p>Gemeentelijke politieverordeningen kunnen extra stille uren opleggen. Check dat bij je gemeente; VLAREM alleen is niet het hele verhaal. Zie <a href="./post.html?slug=regels-buitenunit-warmtepomp-airco-vlaanderen">regels voor buitenunits</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "hoe-werkt-warmtepomp-buitenunit",
    title: "Hoe werkt een warmtepomp buitenunit?",
    metaTitle: "Hoe werkt een warmtepomp buitenunit? | REDUCD België",
    metaDescription:
      "Compressor, ventilator, koudemiddel en ontdooien: zo werkt de buitenunit. Waarom je hem hoort in Vlaanderen, en wat je niet mag afsluiten.",
    excerpt:
      "De buitenunit is geen “doos die lawaai maakt”. Begrijp lucht, compressor en defrost — dan snap je ook waarom een omkasting lucht nodig heeft.",
    coverImage: "assets/images/detail-airflow.jpg",
    publishedAt: "2026-08-19",
    keywords: ["hoe werkt warmtepomp buitenunit", "buitenunit werking", "warmtepomp ventilator"],
    faq: [
      {
        q: "Waarom moet een buitenunit zoveel lucht hebben?",
        a: "Ze onttrekt warmte aan buitenlucht. Blokkeer je de in- of uitlaat, dan stijgt het toerental, het geluid en het storingrisico. Daarom is een dichte sierbox een slecht idee."
      },
      {
        q: "Wat hoor je bij ontdooien?",
        a: "Een tijdelijk ander toerental, soms een gorgel of een kortere piek. Dat is normaal bij vrieskou. Structureel te luid blijft het als de opstelling of de kast fout is."
      }
    ],
    content: `
      <p><strong>Een warmtepomp-buitenunit onttrekt warmte aan de lucht: een ventilator jaagt lucht over een wisselaar, een compressor pompt koudemiddel, en binnenin wordt die warmte afgegeven aan water of lucht.</strong> Wat je hoort, is vooral ventilator plus compressor — en bij kou het ontdooien. Wie dat snapt, stopt met “gewoon een doos eromheen”.</p>

      <h2>De drie geluidsbronnen</h2>
      <p>De ventilator maakt breedbandig geruis. De compressor geeft een lagere toon, soms tonaal. Leidingen en de sokkel geven trilling door naar de gevel. In Vlaamse rijwoningen is die laatste bron onderschat: je hoort de unit “in huis” terwijl de tuin meevalt. Zie <a href="./post.html?slug=buitenunit-warmtepomp-waarom-lawaai">waarom een buitenunit lawaai maakt</a>.</p>

      <h2>Wat je niet mag afsluiten</h2>
      <p>Inlaat, uitlaat en servicezijde blijven vrij. Een <a href="./post.html?slug=akoestische-omkasting-vs-suskast">akoestische omkasting</a> leidt lucht langs absorptie; een schutting of steenbak doet dat niet. Daarom staat bij REDUCD een 150 mm demper en louvres — geen dichte wand.</p>
      <p>Wil je het geluid bij de perceelgrens inschatten? <a href="./post.html?slug=warmtepomp-geluid-vlarem-berekenen">Bereken het à la VLAREM</a>, of meet op locatie.</p>
      ${CTA}
    `
  }),

  be({
    slug: "geluidsoverlast-technische-installaties-horeca",
    title: "Geluidsoverlast door technische installaties in de horeca",
    metaTitle: "Horeca: geluid van koelgroepen en airco | REDUCD België",
    metaDescription:
      "Koelgroep, afzuiging of airco te luid bij een café of restaurant in Vlaanderen? VLAREM, terras en praktijk: wat een akoestische omkasting wél oplost.",
    excerpt:
      "Achter een keuken of op een dak staan units die tot in de woonstraat hoorbaar zijn. Wat VLAREM van horeca verwacht, en wat wij in de praktijk zien.",
    coverImage: "assets/images/google/photo-18.jpg",
    publishedAt: "2026-08-18",
    keywords: ["horeca geluidsoverlast", "koelgroep omkasting", "VLAREM horeca"],
    faq: [
      {
        q: "Valt een café-koelgroep onder VLAREM?",
        a: "Vaak wel, als inrichting. De klasse en de richtwaarden hangen af van de activiteit en de ligging. Wonen boven of naast de zaak maakt de toetsing strenger, vooral ’s nachts."
      },
      {
        q: "Lost een omkasting een hele horecazaak op?",
        a: "Alleen het deel van de buitenunit. Afzuiging, muziek en terras zijn andere bronnen. We zeggen dat eerlijk bij de intake."
      }
    ],
    content: `
      <p><strong>Bij horeca in Vlaanderen komt overlast zelden van “één ventilator”: het is de stapeling van koelgroep, keukenafzuiging en airco, getoetst aan VLAREM én aan de buren boven de zaak.</strong> In stadscentra — Gent, Antwerpen, Brugge, Leuven — staat de techniek op het dak of in een steeg. ’s Nachts, als de zaak sluit, blijft de koelgroep draaien.</p>

      <h2>Wat we in de praktijk zien</h2>
      <p>Een unit zonder demping, tegen een schacht, met reflectie naar slaapkamers. Klachten komen via de gemeente of rechtstreeks van bewoners. Een sierrooster lost niets op. Een geteste omkasting op de juiste unit wel — gemiddeld 14 dB(A) op die bron.</p>
      <p>Horeca heeft vaak maatwerk nodig: grotere units, leidingen, service. Zie <a href="./post.html?slug=geluiddempende-omkasting-maatwerk">maatwerk</a> en de <a href="../pro/">pro-pagina</a>.</p>

      <h2>Niet alles is een kast</h2>
      <p>Trillingen naar de woonlaag, een open keukendeur of een terrasvergunning met uren: dat lost geen omkasting. We meten eerst, wijzen de dominante bron aan, en zeggen als een kast niet de eerste stap is. Dat is goedkoper dan drie keer verplaatsen.</p>
      ${CTA}
    `
  }),

  be({
    slug: "voordelen-nadelen-warmtepomp-vlaanderen",
    title: "De voordelen en nadelen van een warmtepomp in Vlaanderen",
    metaTitle: "Voor- en nadelen warmtepomp Vlaanderen 2026 | REDUCD",
    metaDescription:
      "Warmtepomp in Vlaanderen: besparing, Mijn VerbouwPremie, comfort — en geluid, elektriciteitsprijs en plaatsing. Nuchter, zonder verkooppraat.",
    excerpt:
      "Een warmtepomp is logisch in Vlaanderen, maar niet gratis stil. De echte plus- en minpunten, inclusief geluid bij de perceelgrens.",
    coverImage: "assets/images/hero-modern-home.jpg",
    publishedAt: "2026-08-17",
    keywords: ["voordelen nadelen warmtepomp", "warmtepomp Vlaanderen", "Mijn VerbouwPremie"],
    faq: [
      {
        q: "Is een warmtepomp in Vlaanderen altijd voordelig?",
        a: "Bij een goed geïsoleerde woning en een passend afgiftesysteem meestal wel, zeker met premie. Bij een tochtige woning of een te kleine unit betaal je elektriciteit én hoor je haar harder werken."
      },
      {
        q: "Is geluid een nadeel van de warmtepomp zelf?",
        a: "Van de buitenunit, ja — niet van het principe. Plaatsing en een akoestische omkasting maken het verschil tussen “bijna onhoorbaar” en “burenconflict”."
      }
    ],
    content: `
      <p><strong>Het grote voordeel van een warmtepomp in Vlaanderen is zuinig verwarmen zonder stookolie; het grote nadeel dat mensen onderschatten is het buitengeluid bij een krappe perceelgrens.</strong> Premies (Mijn VerbouwPremie) en een lager EPC trekken de rekensom. De nachtrust van de buren staat zelden in de offerte.</p>

      <h2>Voordelen die wél kloppen</h2>
      <ul>
        <li>Lagere fossiele factuur en beter EPC-label, relevant bij verkoop.</li>
        <li>Koelen kan bij veel lucht/water-units — handig in warme zomers.</li>
        <li>Premies zitten op de <em>installatie</em>, niet op een omkasting. Zie <a href="./post.html?slug=subsidies-warmtepomp-omkasting-vlaanderen">subsidies voor omkastingen</a>.</li>
      </ul>

      <h2>Nadelen die je vooraf plant</h2>
      <p>Elektriciteitsprijs, een te kleine unit die hard draait, en geluid. In een rijwoning is de zijstrook vaak de enige plek — en de slechtste akoestisch. Lees <a href="./post.html?slug=welk-type-warmtepomp-minste-geluid">welk type het stilste is</a> en <a href="./post.html?slug=warmtepomp-geluid-buren-overlast-vlaanderen">wat te doen bij buren</a>.</p>
      <p>Een omkasting maakt van het nadeel “geluid” geen argument meer tegen de warmtepomp. Dat is de enige reden waarom wij dit artikel schrijven.</p>
      ${CTA}
    `
  }),

  be({
    slug: "welk-type-warmtepomp-minste-geluid",
    title: "Welk type warmtepomp maakt het minste geluid?",
    metaTitle: "Stilste type warmtepomp in Vlaanderen | REDUCD",
    metaDescription:
      "Bodem, lucht/water, hybride of ventilatielucht: welk type is het stilste in Vlaanderen? Praktijk, geen folder, plus wat je met een omkasting wint.",
    excerpt:
      "Een bodem/water is bijna stil buiten. Lucht/water hoor je. Het type bepaalt de bron — de opstelling bepaalt of je er last van hebt.",
    coverImage: "assets/images/google/photo-11.jpg",
    publishedAt: "2026-08-16",
    keywords: ["stilste warmtepomp", "type warmtepomp geluid", "bodemwarmtepomp geluid"],
    faq: [
      {
        q: "Is een geothermische warmtepomp stil?",
        a: "Buiten ja: er is geen grote ventilatorunit. De compressor staat meestal binnen of in een technische ruimte. Het nadeel is prijs en boring, niet decibels in de tuin."
      },
      {
        q: "Is de stilste lucht/water-unit genoeg bij de buren?",
        a: "Niet als ze in een hoek staat. Een stille folder plus slechte plaatsing verliest van een gewone unit met omkasting en afstand."
      }
    ],
    content: `
      <p><strong>Het stilste type in de tuin is een bodem/water-warmtepomp: er staat geen grote buitenventilator.</strong> In Vlaanderen kiest het merendeel toch lucht/water of hybride, omdat boring duurder is. Dan is “het stilste type” een stille lucht/water-unit <em>plus</em> plaatsing en desnoods een omkasting.</p>

      <h2>Types op een rij</h2>
      <ul>
        <li><strong>Bodem/water</strong> — nauwelijks buitengeluid, hoge investering.</li>
        <li><strong>Lucht/water</strong> — de klassieker; ventilator + compressor buiten.</li>
        <li><strong>Hybride</strong> — dezelfde buitenunit, wisselend toerental. Zie <a href="./post.html?slug=geluidsoverlast-daikin-altherma-hybride-warmtepomp">Altherma Hybride</a>.</li>
        <li><strong>Lucht/lucht (airco)</strong> — vaak luider per kW comfort, meerdere units. Zie <a href="./post.html?slug=airco-ombouw-goed-idee">airco-ombouw</a>.</li>
      </ul>

      <h2>Wat je in de praktijk hoort</h2>
      <p>Foldercijfers liggen dichter bij elkaar dan de tuinen. Een “stille” 45 dB-unit in een nis klinkt harder dan een 52 dB-unit vrij in het gras. Daarom meten we op locatie en rekenen we VLAREM, niet alleen het merk. Meer: <a href="./post.html?slug=stilste-warmtepomp-praktijk">stilste warmtepomp in de praktijk</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "intergas-xtend-geluid-omkasting",
    title: "Intergas Xtend: hoeveel geluid maakt deze warmtepomp en wat kun je doen?",
    metaTitle: "Intergas Xtend geluid en omkasting | REDUCD België",
    metaDescription:
      "Intergas Xtend te horen in Vlaanderen? Typisch hybride-gedrag, VLAREM-nachtwaarde en wanneer een REDUCD-omkasting zinvol is.",
    excerpt:
      "De Xtend is een hybride: ketel binnen, unit buiten. Hoe hard die buitenunit klinkt, hangt af van jouw tuin — niet alleen van Intergas.",
    coverImage: "assets/images/google/photo-05.jpg",
    publishedAt: "2026-08-15",
    keywords: ["Intergas Xtend geluid", "Intergas warmtepomp omkasting", "hybride Xtend Vlaanderen"],
    faq: [
      {
        q: "Hoeveel dB maakt een Intergas Xtend?",
        a: "Dat staat op het typeplaatje en in de fiche van jouw vermogen. Reken daarna naar de perceelgrens: afstand min 6 dB per verdubbeling, plus pluspunten voor muren. De VLAREM-tool doet die eerste inschatting."
      },
      {
        q: "Past een REDUCD-kast op een Xtend?",
        a: "Als de buitenmaten binnen S, L, XL of maatwerk vallen, ja. Stuur typeplaatje en foto’s mee bij de intake."
      }
    ],
    content: `
      <p><strong>Een Intergas Xtend maakt het geluid van haar buitenunit: typisch een compacte lucht/water-module die harder draait als de hybride meer warmte vraagt.</strong> In Vlaanderen zie je de Xtend bij installateurs die ketel en pomp als één verhaal verkopen. Het geluid zit buiten, de ketel binnen — buren horen alleen de unit.</p>

      <h2>Wat je mag verwachten</h2>
      <p>Geen constante brom, wel wisselende niveaus. Bij zachte dagen is de overlast klein. Bij kou of veel tapwater hoor je haar. In een halfopen bebouwing met de unit op 3 meter van de erfgrens is dat een VLAREM-risico ’s nachts (vaak 35 dB(A) specifiek geluid in woongebied).</p>

      <h2>Wat je eraan doet</h2>
      <p>Plaatsing eerst, dan <a href="./post.html?slug=warmtepomp-geluid-dempen-vlaanderen">demping</a>. Een geteste omkasting haalt gemiddeld 14 dB(A) zonder de luchtweg te dichten. Zelfde logica als bij <a href="./post.html?slug=remeha-elga-ace-geluid-omkasting">Remeha Elga Ace</a> en <a href="./post.html?slug=nibe-f2040-geluid-omkasting">NIBE F2040</a>: het merk is de bron, de kast is de maatregel.</p>
      ${CTA}
    `
  }),

  be({
    slug: "remeha-elga-ace-geluid-omkasting",
    title: "Remeha Elga Ace: hoeveel geluid maakt deze warmtepomp en wat kun je doen?",
    metaTitle: "Remeha Elga Ace geluid | omkasting Vlaanderen | REDUCD",
    metaDescription:
      "Remeha Elga Ace te luid bij de perceelgrens in Vlaanderen? Hybride-buitenunit, VLAREM en een akoestische omkasting die de unit laat ademen.",
    excerpt:
      "De Elga Ace is populair als hybride-opwaardering. De buitenunit blijft een ventilator. Zo hou je haar stil in een Vlaamse tuin.",
    coverImage: "assets/images/google/photo-08.jpg",
    publishedAt: "2026-08-14",
    keywords: ["Remeha Elga Ace geluid", "Elga Ace omkasting", "Remeha warmtepomp België"],
    faq: [
      {
        q: "Is de Elga Ace stiller dan andere hybrides?",
        a: "In de fiche soms, in jouw tuin niet automatisch. Reflectie en afstand winnen van een paar dB op papier."
      },
      {
        q: "Mag ik de Elga Ace volledig inbouwen?",
        a: "Niet zonder berekende luchtweg. Remeha eist vrije in- en uitblaas. Een akoestische omkasting respecteert dat; een gesloten houten kist niet."
      }
    ],
    content: `
      <p><strong>De Remeha Elga Ace maakt het geluid van een compacte hybride-buitenunit: aanvaardbaar vrij in het veld, vaak te veel in een Vlaamse zijtuin of tegen de gevel.</strong> Veel gezinnen plaatsen haar bij een bestaande ketel. De unit komt waar er nog plek is — zelden waar het akoestisch het slimst is.</p>

      <h2>Elga Ace en VLAREM</h2>
      <p>Vul het bronvermogen in de <a href="../vlarem/">rekentool</a> in, plus afstand en muren. Land je ’s nachts boven de richtwaarde, dan is verplaatsen of omkasten goedkoper dan een conflict. Geen juridisch advies: wel een technische restwaarde.</p>

      <h2>Oplossing</h2>
      <p>Trillingsdempers, geen hoek, en een REDUCD-kast op maat van de unit. Wandmodel als ze tegen de muur staat. Details: <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">vrije ruimte</a> en <a href="./post.html?slug=installatiegemak-12-boutjes">installatie in ongeveer 1,5 uur</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "nibe-f2040-geluid-omkasting",
    title: "NIBE F2040: hoeveel geluid maakt deze warmtepomp en wat kun je doen?",
    metaTitle: "NIBE F2040 geluid en omkasting in België | REDUCD",
    metaDescription:
      "NIBE F2040 te horen in Vlaanderen of Brussel? Typische niveaus, defrost en een omkasting die de F2040 niet verstikt.",
    excerpt:
      "De F2040 is een werkpaard. In een krappe Vlaamse tuin hoor je dat. Wat je meet, en hoe je dempt zonder rendement te slopen.",
    coverImage: "assets/images/google/photo-12.jpg",
    publishedAt: "2026-08-13",
    keywords: ["NIBE F2040 geluid", "NIBE omkasting", "NIBE warmtepomp Vlaanderen"],
    faq: [
      {
        q: "Is de NIBE F2040 luid?",
        a: "Voor haar vermogen normaal. Grotere F2040-types blazen meer lucht en klinken voller. Bij kou en ontdooien hoor je een duidelijke piek."
      },
      {
        q: "Past een standaard REDUCD-maat op een F2040?",
        a: "Vaak de L of XL, soms maatwerk. Meet de unit inclusief aansluitingen, niet alleen de folderbreedte."
      }
    ],
    content: `
      <p><strong>Een NIBE F2040 klinkt als een volle lucht/water-unit: breedbandig geruis plus compressor, met pieken bij vorst en ontdooien.</strong> In België staat ze in nieuwbouw én renovatie. Het probleem is zelden “NIBE is fout”; het is de combinatie van vermogen, afstand tot de perceelgrens en twee gevels.</p>

      <h2>Wat je hoort</h2>
      <p>Overdag in een verkaveling valt ze weg. ’s Avonds in een stille wijk in West-Vlaanderen of de rand rond Brussel niet. Lees <a href="./post.html?slug=warmtepomp-vrieskou-meer-geluid">geluid bij vrieskou</a> als de klacht seizoensgebonden is.</p>

      <h2>Wat je doet</h2>
      <p>NIBE wil vrije aanzuig. Een omkasting moet die lucht organiseren, niet smoren. REDUCD doet dat met louvres en 150 mm absorptie, getest door Peutz. Start bij de <a href="../index.html#specs">maattabel</a> of stuur een foto naar de intake.</p>
      ${CTA}
    `
  }),

  be({
    slug: "subsidies-warmtepomp-omkasting-vlaanderen",
    title: "Zijn er subsidies voor warmtepompomkastingen in Vlaanderen?",
    metaTitle: "Subsidie omkasting warmtepomp Vlaanderen? | REDUCD",
    metaDescription:
      "Geen aparte premie voor een akoestische omkasting in Vlaanderen. Wel Mijn VerbouwPremie voor de warmtepomp zelf. Wat wél en niet terugkomt.",
    excerpt:
      "De omkasting zelf zit zelden in een premie. De warmtepomp wel. Zo voorkom je een verkeerde aanvraag bij Fluvius of je gemeente.",
    coverImage: "assets/images/google/photo-02.jpg",
    publishedAt: "2026-08-11",
    keywords: ["subsidie omkasting warmtepomp", "Mijn VerbouwPremie omkasting", "premie suskast Vlaanderen"],
    faq: [
      {
        q: "Krijg ik Mijn VerbouwPremie voor een REDUCD-kast?",
        a: "In de regel niet: de premie betreft de warmtepompinstallatie, niet een akoestische omkasting als aparte maatregel. Check altijd de actuele voorwaarden op de Vlaamse premieloket-sites."
      },
      {
        q: "En in Brussel of Wallonië?",
        a: "Eigen stelsels, dezelfde logica: steun zit op de installatie of renovatie, zelden op een geluidskast. Vraag het na bij Leefmilieu Brussel of de Waalse energiepremies."
      }
    ],
    content: `
      <p><strong>Neen: in Vlaanderen bestaat er doorgaans geen aparte subsidie voor een akoestische omkasting of suskast.</strong> Mijn VerbouwPremie en verwante steun zitten op de warmtepomp, isolatie of het EPC — niet op de kast die het geluid dempt. Wie “subsidie omkasting” googlet, zoekt dus het verkeerde loket.</p>

      <h2>Wat wél premie kan krijgen</h2>
      <p>De warmtepomp zelf, onder voorwaarden (aannemer, factuur, type, soms inkomen). Fluvius handelt veel Vlaamse premies af, maar de regels wijzigen. Dit is geen premieadvies; het is een waarschuwing om de omkasting niet in dezelfde lijn te zetten als de unit.</p>

      <h2>Waarom de kast toch rendabel is</h2>
      <p>Een burenconflict, een gemeentelijke aanmaning of een unit die je moet verplaatsen kost meer dan een kast vanaf € 2.335. De omkasting beschermt de investering waar wél premie op zat. Zie <a href="./post.html?slug=warmtepomp-geluid-buren-regelgeving-belgie-nederland">regels bij de buren</a> en <a href="./post.html?slug=jurisprudentie-geluidsoverlast-warmtepomp-belgie">jurisprudentie in België</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "tonaaltoeslag-k1-vlaanderen",
    title: "Tonaaltoeslag K1: wat is dat, en geldt het in Vlaanderen?",
    metaTitle: "Tonaaltoeslag K1 vs VLAREM in Vlaanderen | REDUCD",
    metaDescription:
      "K1-toeslag komt uit de Nederlandse beoordeling. In Vlaanderen werkt VLAREM anders, maar een tonaal gezoem telt wél zwaarder. Wat je ermee moet.",
    excerpt:
      "K1 is geen Vlaamse formule. Een tonaal gezoem van compressor of ventilator is hier wél relevant — omdat het storender is dan breedbandig geruis.",
    coverImage: "assets/images/geluidsmeting.webp",
    publishedAt: "2026-08-10",
    keywords: ["tonaaltoeslag K1", "tonaal geluid warmtepomp", "VLAREM tonaal"],
    faq: [
      {
        q: "Moet ik in Vlaanderen een K1-toeslag rekenen?",
        a: "Niet volgens de Nederlandse RIVM-rekentool. VLAREM beoordeelt specifiek geluid en hinderkenmerken anders. Een tonaal karakter maakt een klacht wel geloofwaardiger."
      },
      {
        q: "Wat doe ik als ik een pieptoon hoor?",
        a: "Dat is vaak de compressor of een resonantie. Een akoestische omkasting met absorptie helpt beter tegen tonen dan een houten scherm. Laat meten als de buren het ook horen."
      }
    ],
    content: `
      <p><strong>K1-tonaaltoeslag is een Nederlandse beoordelingsterm; in Vlaanderen reken je niet met diezelfde K1-formule, maar een tonaal gezoem is wél storender dan gewoon geruis.</strong> Wie Nederlandse blogs leest, ziet “+5 dB toeslag”. Kopieer dat niet blind in een VLAREM-dossier.</p>

      <h2>Wat K1 bedoelde</h2>
      <p>Een zuivere toon (fluit, brom op één frequentie) valt meer op dan ruis van dezelfde dB(A). De Nederlandse methodiek telt daar een toeslag voor. Dat inzicht is universeel. De rekenregel is dat niet.</p>

      <h2>Wat VLAREM wél doet</h2>
      <p>Vlaanderen toetst specifiek geluid aan richtwaarden per gebied en periode. Hinder, tonaliteit en herhaling wegen in de beoordeling en bij de vrederechter, niet als een vast +5 op elke fiche. Gebruik de <a href="../vlarem/">Vlaamse rekentool</a>, geen Nederlandse overheidsrekentool. Uitleg: <a href="./post.html?slug=warmtepomp-geluid-vlarem-berekenen">geluid berekenen in Vlaanderen</a>.</p>
      <p>Praktisch: hoor je een zingende toon, behandel het als een serieuzer probleem. Absorptie in een kast pakt tonen beter dan massa alleen.</p>
      ${CTA}
    `
  }),

  be({
    slug: "daikin-warmtepomp-ombouw-nodig",
    title: "Daikin warmtepomp: is een ombouw noodzakelijk?",
    metaTitle: "Daikin ombouw nodig in Vlaanderen? | REDUCD",
    metaDescription:
      "Niet elke Daikin heeft een omkasting nodig. Wel als VLAREM, de buren of de plaatsing knellen. Hoe je dat in Vlaanderen beslist.",
    excerpt:
      "Een Daikin is geen reden op zich voor een kast. De perceelgrens, de nis en de nachtwaarde wel. Zo beslis je zonder overkill.",
    coverImage: "assets/images/google/photo-14.jpg",
    publishedAt: "2026-08-09",
    keywords: ["Daikin ombouw", "Daikin omkasting nodig", "Daikin Altherma geluid"],
    faq: [
      {
        q: "Eist Daikin een omkasting?",
        a: "Nee. Daikin eist vrije ruimte en lucht. De omkasting is een akoestische maatregel, geen verplicht accessoire van het merk."
      },
      {
        q: "Wanneer is ze wél nodig?",
        a: "Als de restwaarde bij de perceelgrens de VLAREM-richtwaarde nadert, als er al een klacht is, of als de unit in een hoek of nis staat die je niet kunt wijzigen."
      }
    ],
    content: `
      <p><strong>Een ombouw is niet automatisch nodig bij elke Daikin in Vlaanderen; wél als de unit te dicht bij de perceelgrens, een slaapkamervenster of een akoestische hoek staat.</strong> Altherma, Emura-buitenunits en hybrides verschillen in dB, niet in de logica.</p>

      <h2>Beslis in drie stappen</h2>
      <ol>
        <li>Lees het geluidsvermogen op de fiche, niet alleen “stille modus”.</li>
        <li>Reken naar de erfgrens met de <a href="../vlarem/">VLAREM-tool</a>.</li>
        <li>Kijk of je kunt verplaatsen. Zo niet: <a href="./post.html?slug=akoestische-omkasting-vs-suskast">akoestische omkasting</a>, geen sierkap.</li>
      </ol>
      <p>Specifiek hybride: <a href="./post.html?slug=geluidsoverlast-daikin-altherma-hybride-warmtepomp">Altherma Hybride</a>. Mitsubishi-vergelijk: <a href="./post.html?slug=geluidsoverlast-mitsubishi-warmtepomp-omkasting">Mitsubishi</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "hoeveel-geluid-maakt-een-warmtepomp-vlaanderen",
    title: "Hoeveel geluid maakt een warmtepomp?",
    metaTitle: "Hoeveel geluid maakt een warmtepomp? dB in Vlaanderen | REDUCD",
    metaDescription:
      "Typisch 45–65 dB(A) bij de unit. Bij de perceelgrens telt VLAREM: 45 / 40 / 35 dB(A) in veel woongebieden. Zo lees je de cijfers.",
    excerpt:
      "Het foldergetal is niet wat de buren horen. Wat decibels betekenen in een Vlaamse tuin, en wanneer 14 dB reductie het verschil maakt.",
    coverImage: "assets/images/installs/install-patio-olijf.webp",
    publishedAt: "2026-08-08",
    keywords: ["hoeveel geluid warmtepomp", "warmtepomp dB", "warmtepomp decibel Vlaanderen"],
    faq: [
      {
        q: "Is 50 dB(A) veel voor een warmtepomp?",
        a: "Bij de unit is het gewoon. Op 3 meter, tussen twee muren, ’s nachts, kan het te veel zijn tegenover 35 dB(A) specifiek geluid in woongebied."
      },
      {
        q: "Wat doet 14 dB(A) reductie?",
        a: "Ongeveer een halvering tot driekwart stiller voor het oor (logaritmisch). Gemiddelde Peutz-waarde van het REDUCD vrijstaand model."
      }
    ],
    content: `
      <p><strong>Een residentiële lucht/water-warmtepomp maakt meestal 45 tot 65 dB(A) bij de buitenunit; wat telt in Vlaanderen is het specifiek geluid bij de beoordelingspunten, vaak de perceelgrens.</strong> 10 dB verschil voelt als ongeveer half zo luid. Daarom is “een beetje dempen” zelden genoeg.</p>

      <h2>Folder versus tuin</h2>
      <p>Fabrikanten meten in het lab, op een vaste afstand, zonder jouw muren. In een Lierse of Kortrijkse zijtuin komt er 3 tot 6 dB bij door reflectie. Zie ook <a href="./post.html?slug=hoeveel-geluid-warmtepomp-per-soort">geluid per soort</a>.</p>

      <h2>VLAREM-anker</h2>
      <p>Woongebied: vaak 45 / 40 / 35 dB(A) (dag / avond / nacht) als richtwaarde voor specifiek geluid. Jouw gemeente of een speciale zone kan afwijken. Reken: <a href="../vlarem/">vlarem-tool</a>. Uitgebreid: <a href="./post.html?slug=warmtepomp-geluidsoverlast-verminderen">geluidsoverlast verminderen</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "airco-ombouw-goed-idee",
    title: "Airco-ombouw: is dat een goed idee?",
    metaTitle: "Airco ombouw of omkasting in Vlaanderen | REDUCD",
    metaDescription:
      "Een airco-buitenunit omkasten kan, als de kast akoestisch is en lucht doorlaat. Een dichte sierombouw is een slecht idee. Zo zit dat in Vlaanderen.",
    excerpt:
      "Steeds meer airco’s in Vlaamse gevels, steeds meer klachten. Ombouwen mag — verstikken niet. Het verschil zit in de luchtweg.",
    coverImage: "assets/images/detail-louver.jpg",
    publishedAt: "2026-08-07",
    keywords: ["airco ombouw", "airco omkasting", "airco geluid dempen Vlaanderen"],
    faq: [
      {
        q: "Mag ik mijn airco volledig inbouwen in de gevel?",
        a: "Enkel als lucht en service blijven kloppen en de fabrikant dat toelaat. Een dicht steen- of houtvolume is vragen om storingen en meer lawaai."
      },
      {
        q: "Werkt een REDUCD-kast op airco?",
        a: "Ja. De kast volgt de buitenunit, niet of het een warmtepomp of airco is."
      }
    ],
    content: `
      <p><strong>Ja, een airco-ombouw is een goed idee als het een akoestische omkasting is; nee, als het een dichte sierbox is die de condensor verstikt.</strong> In Vlaanderen komen multi-splits aan de gevel van rijwoningen. Overdag accepteert men het. ’s Nachts, in slaapmodus die toch blaast, niet.</p>

      <h2>Airco versus warmtepomp</h2>
      <p>Zelfde fysica: ventilator + compressor buiten. Airco’s hangen vaker hoger en dichter bij slaapkamers. Daarom is de <a href="./post.html?slug=airco-geluid-dempen-vlaanderen">airco-demping</a> vaak urgenter dan bij een unit in de achtertuin.</p>

      <h2>Wat een goede ombouw doet</h2>
      <p>Absorptie, louvres, service-luik, Magnelis of RAL. Geen palletwand, geen klimop als “oplossing”. Producten: <a href="../index.html#producten">vrijstaand en wand</a>. Meer overlast-context: <a href="./post.html?slug=geluidsoverlast-warmtepomp-airco-oplossingen">oplossingen voor WP en airco</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "stilste-warmtepomp-praktijk",
    title: "Welke warmtepomp is het stilste? Praktijk in Vlaanderen",
    metaTitle: "Stilste warmtepomp 2026 in Vlaanderen | REDUCD",
    metaDescription:
      "De stilste warmtepomp op papier is zelden de stilste in een Vlaamse tuin. Praktijkcijfers, plaatsing en omkasting wegen zwaarder dan het merk.",
    excerpt:
      "Folders beloven fluisterstil. In de praktijk wint opstelling van 3 dB op de fiche. Wat we in Vlaanderen echt horen.",
    coverImage: "assets/images/google/photo-16.jpg",
    publishedAt: "2026-08-06",
    keywords: ["stilste warmtepomp 2026", "stilste warmtepomp Vlaanderen", "warmtepomp praktijk geluid"],
    faq: [
      {
        q: "Welk merk is het stilste?",
        a: "Er is geen blijvende winnaar. Mitsubishi, Daikin, NIBE, Vaillant, Viessmann en Remeha hebben stille en minder stille types. Het vermogen en de opstelling beslissen."
      },
      {
        q: "Helpt de ‘silent mode’?",
        a: "Vaak verlaagt die het toerental en dus de capaciteit. Bij vrieskou slaat de unit die modus af. Reken er niet op als nachtoplossing."
      }
    ],
    content: `
      <p><strong>De stilste warmtepomp in Vlaanderen is de unit die vrij staat, niet te groot is gedimensioneerd, en zo nodig een geteste omkasting heeft — niet het merk met de laagste brochure-dB.</strong> In 2025–2026 blijven fabrikanten “whisper” beloven. Op locatie meten we iets anders: reflectie, defrost en een unit die te klein is en daardoor hard draait.</p>

      <h2>Wat de praktijk wél toont</h2>
      <p>Een iets luider type vrij in het gras verslaat een “stille” unit in een nis. Bodem/water blijft de stilste tuin, maar is een ander budget. Zie <a href="./post.html?slug=welk-type-warmtepomp-minste-geluid">types vergeleken</a> en <a href="./post.html?slug=hoeveel-geluid-warmtepomp-per-soort">dB per soort</a>.</p>

      <h2>Hoe je de stilste situatie koopt</h2>
      <p>Laat dimensioneren op de woning, niet op de kleinste unit. Vraag het geluidsvermogen (LwA), niet alleen druk op 1 m. Reken VLAREM. Plan de kast mee als de erfgrens krap is — dat is goedkoper dan achteraf verplaatsen.</p>
      ${CTA}
    `
  }),

  be({
    slug: "warmtepomp-vrieskou-meer-geluid",
    title: "Warmtepomp bij vrieskou maakt meer geluid",
    metaTitle: "Warmtepomp bij vrieskou luider | REDUCD Vlaanderen",
    metaDescription:
      "Bij vrieskou draait de buitenunit harder en ontdooit ze. Daarom hoor je haar ’s nachts in Vlaanderen. Wat normaal is, en wat je dempt.",
    excerpt:
      "In januari klinkt dezelfde unit anders dan in april. Defrost, toerental en een stille wijk: waarom kou de klacht triggert.",
    coverImage: "assets/images/editorial-scale.jpg",
    publishedAt: "2026-08-05",
    keywords: ["warmtepomp vrieskou geluid", "warmtepomp ontdooien lawaai", "defrost geluid"],
    faq: [
      {
        q: "Is extra lawaai bij vorst een defect?",
        a: "Meestal niet. De ventilator draait sneller en de unit ontdooit. Wordt het een gierende toon of een slag, laat de installateur nakijken."
      },
      {
        q: "Lost een omkasting winterpieken op?",
        a: "Ze verlaagt het niveau structureel, ook bij hoger toerental. Ze zet de fysica van ontdooien niet uit."
      }
    ],
    content: `
      <p><strong>Ja: bij vrieskou maakt een lucht/water-warmtepomp meer geluid, omdat de ventilator harder draait en de unit periodiek ontdooit.</strong> In Vlaanderen vallen de koudste nachten samen met de strengste VLAREM-periode (nachtwaarde). Daarom komen klachten in januari, niet in mei.</p>

      <h2>Wat je hoort</h2>
      <p>Hoger toerental (voller geruis), een kort ander regime bij defrost, soms gorgelend koudemiddel. Dat is werking, geen “kapotte pomp”. Uitleg van de unit: <a href="./post.html?slug=hoe-werkt-warmtepomp-buitenunit">hoe de buitenunit werkt</a>.</p>

      <h2>Wat je plant vóór de winter</h2>
      <p>Plaatsing uit de hoek, geen sneeuw tegen de uitblaas, en een kast die lucht houdt. Zeesneeuw aan de kust of een plat dak in Brussel: houd de inlaat vrij. <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">Vrije ruimte</a> is in de winter nog kritischer.</p>
      ${CTA}
    `
  }),

  be({
    slug: "warmtepomp-geluid-buren-overlast-vlaanderen",
    title: "Warmtepompgeluid en burenoverlast: wat te doen in Vlaanderen?",
    metaTitle: "Warmtepomp geluid buren Vlaanderen | wat te doen | REDUCD",
    metaDescription:
      "Buren klagen over je warmtepomp in Vlaanderen? Meet, reken VLAREM, praat, demp. Geen juridisch advies — wel de volgorde die werkt.",
    excerpt:
      "Eerst meten en praten, dan dempen. Een klacht bij de gemeente is duurder dan een kast. De volgorde voor Vlaamse perceelgrenzen.",
    coverImage: "assets/images/google/photo-09.jpg",
    publishedAt: "2026-08-04",
    keywords: ["warmtepomp buren overlast", "geluidsoverlast buren warmtepomp", "VLAREM buren"],
    faq: [
      {
        q: "Wie heeft gelijk: ik of de buren?",
        a: "Dat beslist geen blog. VLAREM, de gemeente en uiteindelijk de vrederechter kijken naar niveau, tijdstip en hinder. Jij kunt wél meten en dempen vóór het zover komt."
      },
      {
        q: "Moet ik de unit uitzetten ’s nachts?",
        a: "Soms als tussenoplossing, maar dan verlies je comfort. Structureel is plaatsing of een omkasting slimmer."
      }
    ],
    content: `
      <p><strong>Bij burenoverlast in Vlaanderen: erken de hinder, meet het niveau, reken de VLAREM-restwaarde en demp of verplaats — wacht niet op een aanmaning van de gemeente.</strong> Dit is geen juridisch advies. Het is de volgorde die relaties en dossiers spaart.</p>

      <h2>Doe dit in de eerste week</h2>
      <ul>
        <li>Praat met de buren: tijdstip, slaapkamerzijde, wat ze horen (zoem of toon).</li>
        <li>Laat een indicatie rekenen: <a href="../vlarem/">VLAREM-tool</a>.</li>
        <li>Plan een <a href="../index.html#contact">meting op locatie</a> — gratis bij REDUCD.</li>
      </ul>
      <p>Kader van de regels: <a href="./post.html?slug=warmtepomp-geluid-buren-regelgeving-belgie-nederland">Belgisch kader</a>. Als het escaleert: <a href="./post.html?slug=jurisprudentie-geluidsoverlast-warmtepomp-belgie">jurisprudentie</a>.</p>

      <h2>Technische hefbomen</h2>
      <p>Afstand, geen hoek, trillingsdempers, akoestische omkasting (gemiddeld 14 dB(A)). Een schutting van planken is geen maatregel. <a href="./post.html?slug=warmtepomp-geluid-dempen-vlaanderen">Hoe dempen</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "geluidsoverlast-warmtepomp-airco-oplossingen",
    title: "Geluidsoverlast van warmtepomp of airco: oplossingen",
    metaTitle: "Oplossingen geluid warmtepomp en airco | REDUCD België",
    metaDescription:
      "Van plaatsing tot Peutz-geteste omkasting: de oplossingen voor een te luide warmtepomp of airco in Vlaanderen, zonder de unit te smoren.",
    excerpt:
      "Vier niveaus: gedrag, plaatsing, demping, kast. De meeste Vlaamse tuinen hebben de laatste twee nodig — niet een nieuwe unit.",
    coverImage: "assets/images/google/photo-20.jpg",
    publishedAt: "2026-08-03",
    keywords: ["oplossing geluid warmtepomp", "airco geluidsoverlast oplossing", "suskast Vlaanderen"],
    faq: [
      {
        q: "Moet ik een stillere unit kopen?",
        a: "Zelden de eerste stap. Verplaatsen of omkasten is goedkoper dan een nieuwe buitenunit, en je houdt het merk dat je installateur kent."
      },
      {
        q: "Helpt een haag?",
        a: "Visueel ja, akoestisch nauwelijks. Bladeren dempen hoge tonen een beetje, geen 14 dB."
      }
    ],
    content: `
      <p><strong>De werkende oplossingen voor een te luide warmtepomp of airco in Vlaanderen zijn: slimmer plaatsen, trillingen breken, en een geteste akoestische omkasting — in die volgorde.</strong> Een nieuwe “stille” unit in dezelfde nis herhaalt het probleem.</p>

      <h2>De ladder</h2>
      <ol>
        <li>Nachtregime of te hoge stooklijn verlagen (comfort checken).</li>
        <li>Unit uit de hoek, vrije <a href="./post.html?slug=waar-plaats-je-een-warmtepomp-vlaanderen">plaatsing</a>.</li>
        <li>Sokkel en dempers tegen structuurgeluid.</li>
        <li><a href="./post.html?slug=akoestische-omkasting-vs-suskast">Akoestische omkasting</a> of <a href="./post.html?slug=airco-ombouw-goed-idee">airco-ombouw</a>.</li>
      </ol>
      <p>Merkdossiers: <a href="./post.html?slug=geluidsoverlast-mitsubishi-warmtepomp-omkasting">Mitsubishi</a>, <a href="./post.html?slug=daikin-warmtepomp-ombouw-nodig">Daikin</a>, <a href="./post.html?slug=nibe-f2040-geluid-omkasting">NIBE</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "warmtepomp-geluid-dempen-vlaanderen",
    title: "Warmtepompgeluid dempen: hoe doe je dat in Vlaanderen?",
    metaTitle: "Warmtepomp geluid dempen in Vlaanderen | REDUCD",
    metaDescription:
      "Dempen is absorptie + luchtweg + plaatsing. Geen matras tegen de unit. Hoe je in Vlaanderen structureel 10 tot 14 dB wint.",
    excerpt:
      "Wie dempt met een deken of schutting, maakt het vaak erger. De juiste volgorde: lucht, massa, absorptie, kast.",
    coverImage: "assets/images/detail-material.jpg",
    publishedAt: "2026-08-02",
    keywords: ["warmtepomp geluid dempen", "warmtepomp dempen", "akoestiek buitenunit"],
    faq: [
      {
        q: "Helpt isolatiewol rond de unit?",
        a: "Niet als je de lucht afsluit. Wol die nat wordt en inzakt, is afval. Gebruik een kast met buitenwaardige absorptie (bij ons gerecycled PET)."
      },
      {
        q: "Hoeveel dB kan ik winnen?",
        a: "Met alleen plaatsing enkele dB. Met een geteste REDUCD-kast gemiddeld 14 dB(A) extra op de bron."
      }
    ],
    content: `
      <p><strong>Warmtepompgeluid dempen in Vlaanderen doe je met vrije lucht, een trillingsarme sokkel en een akoestische omkasting — niet met een schutting, matras of steenbak tegen de rooster.</strong> Wie de uitblaas dichtdoet, krijgt een luidere ventilator.</p>

      <h2>Drie lagen</h2>
      <ul>
        <li><strong>Bron</strong> — toerental, vermogen, onderhoud (loshangende panelen rammelen).</li>
        <li><strong>Weg</strong> — afstand, geen hoek, geen kale muur als klankbord.</li>
        <li><strong>Maatregel</strong> — kast met 150 mm demper, Peutz-getest.</li>
      </ul>
      <p>Materiaal dat buiten blijft: <a href="./post.html?slug=magnelis-omkasting-duurzaam-materiaal">Magnelis</a>. Reken daarna de restwaarde: <a href="./post.html?slug=warmtepomp-geluid-vlarem-berekenen">VLAREM berekenen</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "warmtepomp-geluid-vlarem-berekenen",
    title: "Warmtepompgeluid berekenen: de VLAREM-rekentool",
    metaTitle: "Warmtepomp geluid berekenen VLAREM | REDUCD",
    metaDescription:
      "Geen Nederlandse overheidsrekentool: in Vlaanderen reken je VLAREM. Bron-dB, afstand, muren en nachtwaarde. Zo gebruik je onze tool.",
    excerpt:
      "Nederland heeft een RIVM-rekentool. Vlaanderen heeft VLAREM. Hier hoe je zelf een restwaarde schat — en wat de tool niet is.",
    coverImage: "assets/images/google/photo-04.jpg",
    publishedAt: "2026-08-01",
    keywords: ["warmtepomp geluid berekenen", "VLAREM rekentool", "overheidsrekentool warmtepomp Vlaanderen"],
    faq: [
      {
        q: "Kan ik de Nederlandse rekentool voor Vlaanderen gebruiken?",
        a: "Niet als bewijs. De methodiek en de grenswaarden verschillen. Gebruik een VLAREM-benadering en lokale toetsing."
      },
      {
        q: "Vervangt de tool een meting?",
        a: "Nee. Het is een theoretische restwaarde. Reflecties, tonaliteit en een tweede bron meet je op locatie."
      }
    ],
    content: `
      <p><strong>In Vlaanderen bereken je het geluid van een warmtepomp of airco via VLAREM: bronvermogen, afstand tot het beoordelingspunt, richtings- en reflectiefactoren — niet via de Nederlandse overheidsrekentool.</strong> Onze <a href="../vlarem/">VLAREM-rekentool</a> doet die eerste som: merk/type of handmatige dB, afstand, vrij veld of tussen muren.</p>

      <h2>Wat je invult</h2>
      <ul>
        <li>Geluidsvermogen (LwA) van de fiche, of een drukniveau met de juiste afstand.</li>
        <li>Afstand tot perceelgrens of raam van de buren.</li>
        <li>Vrij veld versus hoek/nis (extra dB).</li>
      </ul>
      <p>Toets het resultaat aan de richtwaarde van het gebied. Woongebied: vaak 45 / 40 / 35 dB(A). Uitleg bij <a href="./post.html?slug=hoeveel-geluid-maakt-een-warmtepomp-vlaanderen">hoeveel geluid een warmtepomp maakt</a>.</p>

      <h2>Wat de tool niet is</h2>
      <p>Geen vergunning, geen juridisch advies, geen vervanging van een erkend deskundige. Wél een manier om te zien of je “op het randje” zit vóór je een kast of een verplaatsing plant. Tonaal karakter: <a href="./post.html?slug=tonaaltoeslag-k1-vlaanderen">K1 versus VLAREM</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "buitenunit-warmtepomp-waarom-lawaai",
    title: "Buitenunit warmtepomp: waarom maakt hij lawaai?",
    metaTitle: "Waarom maakt een buitenunit lawaai? | REDUCD België",
    metaDescription:
      "Ventilator, compressor, trilling en weerkaatsing: waarom een buitenunit lawaai maakt — en welke oorzaak je in Vlaanderen eerst aanpakt.",
    excerpt:
      "Lawaai is geen karaktertrek van het merk. Het is lucht, metaal en een muur die terugkaatst. Vier oorzaken, vier maatregelen.",
    coverImage: "assets/images/google/photo-06.jpg",
    publishedAt: "2026-07-30",
    keywords: ["buitenunit lawaai", "waarom maakt warmtepomp geluid", "ventilator warmtepomp"],
    faq: [
      {
        q: "Is een zoem altijd de compressor?",
        a: "Vaak wel de lage toon. Breedbandig geruis is de ventilator. Rammelen is een paneel of te slappe bevestiging."
      },
      {
        q: "Kan ik de ventilator trager zetten?",
        a: "Via stille modus of een lagere stooklijn, tot de unit de warmte niet meer haalt. Dan draait ze weer harder."
      }
    ],
    content: `
      <p><strong>Een buitenunit maakt lawaai omdat ze lucht verplaatst en een compressor laat draaien; muren, de sokkel en een te krappe nis maken dat lawaai groter dan het labocijfer.</strong> “Hij is luid” is dus vier vragen: ventilator, compressor, trilling, reflectie.</p>

      <h2>De vier oorzaken</h2>
      <ol>
        <li>Ventilator — volume lucht, toerental, vuile lamellen.</li>
        <li>Compressor — lager, soms tonaal. Zie <a href="./post.html?slug=tonaaltoeslag-k1-vlaanderen">tonaal geluid</a>.</li>
        <li>Trilling — de gevel zingt mee, vooral bij wandmontage.</li>
        <li>Reflectie — twee muren + haag = hoorn.</li>
      </ol>
      <p>Werking van het toestel: <a href="./post.html?slug=hoe-werkt-warmtepomp-buitenunit">hoe de buitenunit werkt</a>. Maatregelen: <a href="./post.html?slug=warmtepomp-geluid-dempen-vlaanderen">dempen</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "hoeveel-geluid-warmtepomp-per-soort",
    title: "Hoeveel geluid maakt een warmtepomp? Per soort",
    metaTitle: "Geluid per type warmtepomp | dB-overzicht | REDUCD",
    metaDescription:
      "Lucht/water, hybride, bodem, lucht/lucht en zwembad: typische dB-ranges en wat VLAREM daarvan vindt in een Vlaamse tuin.",
    excerpt:
      "Niet elk type speelt in dezelfde dB-klasse. Een overzicht om folders te lezen — en om niet appels met peren te vergelijken.",
    coverImage: "assets/images/google/photo-10.jpg",
    publishedAt: "2026-07-28",
    keywords: ["warmtepomp geluid per type", "lucht water dB", "hybride warmtepomp dB"],
    faq: [
      {
        q: "Welk cijfer moet ik vergelijken?",
        a: "Geluidsvermogen LwA in dB(A), het liefst hetzelfde normblad. Druk op 1 m zonder afstand is marketing."
      },
      {
        q: "Valt een zwembadpomp in dezelfde klasse?",
        a: "Vaak luider en langer in de avond. Apart beoordelen. Zie het artikel over zwembadunits."
      }
    ],
    content: `
      <p><strong>Richtorders, geen garantie: bodem/water is buiten bijna stil; lucht/water en hybride zitten typisch 45–65 dB(A) bij de unit; lucht/lucht en zwembadunits zitten vaak aan de hoge kant van die band of erboven.</strong> Jouw perceel bepaalt of dat VLAREM-haalbaar is.</p>

      <h2>Per soort</h2>
      <ul>
        <li><strong>Bodem/water</strong> — compressor binnen of ingepakt; tuin stil.</li>
        <li><strong>Lucht/water</strong> — de standaard in Vlaanderen; ventilator buiten.</li>
        <li><strong>Hybride</strong> — zelfde buitenunit, wisselend toerental.</li>
        <li><strong>Lucht/lucht</strong> — per kop extra een buitenunit mogelijk.</li>
        <li><strong>Zwembad</strong> — debiet boven fluister; zie <a href="./post.html?slug=zwembadwarmtepomp-omkasten-tuin">omkasten</a>.</li>
      </ul>
      <p>Meer context: <a href="./post.html?slug=welk-type-warmtepomp-minste-geluid">welk type het minste geluid maakt</a> en <a href="./post.html?slug=hoeveel-geluid-maakt-een-warmtepomp-vlaanderen">algemene dB-uitleg</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "geluid-warmtepomp-ervaringen-horen",
    title: "Geluid warmtepomp ervaringen: waarom hoort mijn man de pomp niet en ik wel?",
    metaTitle: "Waarom hoor jij de warmtepomp wel? | REDUCD België",
    metaDescription:
      "Geen inbeelding: toonhoogte, slaapkamerzijde en gehoor verschillen. Waarom de ene partner de warmtepomp hoort en de andere niet.",
    excerpt:
      "Lage zoem versus hoge fluit, links versus rechts van het bed. Ervaringen uit Vlaamse woningen — en wat je eraan doet.",
    coverImage: "assets/images/google/photo-15.jpg",
    publishedAt: "2026-07-26",
    keywords: ["warmtepomp ervaringen geluid", "hoor ik de warmtepomp", "laagfrequent geluid warmtepomp"],
    faq: [
      {
        q: "Is het psychisch als alleen ik het hoor?",
        a: "Meestal niet. Gevoeligheid voor lage tonen en slaapkwaliteit verschilt. Meet liever dan te discussiëren."
      },
      {
        q: "Helpt oordoppen?",
        a: "Als nood, niet als oplossing. De unit blijft een bron bij de buren en in huis via de gevel."
      }
    ],
    content: `
      <p><strong>Je hoort de warmtepomp wél en je partner niet, omdat laagfrequent geluid en tonen ongelijk worden waargenomen — en omdat jouw slaapplek dichter bij de gevel of het raam kan liggen.</strong> Dat is een klassieke ervaring in Vlaamse woningen, geen ruzie over “aanstellen”.</p>

      <h2>Waarom de oren verschillen</h2>
      <p>Mannen verliezen gemiddeld eerder hoge tonen; lage zoem blijft. Wie licht slaapt, hoort de defrost-cyclus. Wie met het hoofd naar de zijgevel ligt, hoort structuurgeluid. Tonaal geluid valt extra op: <a href="./post.html?slug=tonaaltoeslag-k1-vlaanderen">tonaliteit</a>.</p>

      <h2>Maak het meetbaar</h2>
      <p>Een dB(A)-meting ’s nachts bij het kussen en bij de perceelgrens stopt de discussie. Daarna dempen of omkasten. Buren dezelfde ervaring? Dan is het geen “gevoeligheid” meer maar een <a href="./post.html?slug=warmtepomp-geluid-buren-overlast-vlaanderen">overlastdossier</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "geluiddempende-omkasting-maatwerk",
    title: "Geluiddempende omkasting voor je warmtepomp: ook in maatwerk",
    metaTitle: "Maatwerk akoestische omkasting | REDUCD België",
    metaDescription:
      "Standaardmaten dekken veel units; maatwerk als de buitenunit, leidingen of de gevel in Vlaanderen niet in S/L/XL passen.",
    excerpt:
      "Twaalf bouten op een standaardkast is het ideaal. Past het niet, dan tekenen we de kast rond jouw unit — zelfde akoestiek, andere contour.",
    coverImage: "assets/images/google/photo-21.jpg",
    publishedAt: "2026-07-24",
    keywords: ["maatwerk omkasting warmtepomp", "geluiddempende omkasting", "custom suskast"],
    faq: [
      {
        q: "Wanneer is maatwerk nodig?",
        a: "Bij afwijkende hoogte, zijdelingse leidingen, een nis, horeca-units of een gevel die geen standaard wandmodel toelaat."
      },
      {
        q: "Blijft de 14 dB(A) gelden?",
        a: "Het principe (demper, absorptie, luchtweg) blijft. De exacte waarde hangt af van de geometrie. We zeggen dat vooraf."
      }
    ],
    content: `
      <p><strong>Een geluiddempende omkasting is bij REDUCD eerst een standaardmaat; maatwerk als jouw buitenunit, leidingen of Vlaamse gevel niet in S, L of XL past.</strong> Maatwerk is geen excuus voor een dichte doos. Dezelfde Magnelis, PET-absorptie en luchtlogica.</p>

      <h2>Standaard versus tekenen</h2>
      <p>Standaard is sneller (vaak binnen een week) en scherper in prijs vanaf € 2.335. Maatwerk volgt na intake met foto’s en maten. Installateurs: <a href="../pro/">pro</a> en <a href="../pro/docs/">pro-docs</a>.</p>

      <h2>Wat niet onderhandelbaar is</h2>
      <p>Service-toegang, vrije in- en uitlaat, RVS 316 bevestiging. Lees <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">modelkeuze</a> en <a href="./post.html?slug=installatiegemak-12-boutjes">installatiegemak</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "jurisprudentie-geluidsoverlast-warmtepomp-belgie",
    title: "Jurisprudentie geluidsoverlast warmtepomp in België",
    metaTitle: "Jurisprudentie warmtepomp geluid België | REDUCD",
    metaDescription:
      "Geen NL-uitspraken plakken op Vlaanderen. In België telt bovenmatige hinder en VLAREM. Wat rechters wél bekijken — geen juridisch advies.",
    excerpt:
      "Nederlandse vonnissen gelden hier niet. De vrederechter kijkt naar hinder, tijdstip en wat je al deed. Hoog-over, geen advies.",
    coverImage: "assets/images/google/photo-19.jpg",
    publishedAt: "2026-07-22",
    keywords: ["jurisprudentie warmtepomp", "bovenmatige hinder warmtepomp", "vrederechter geluid"],
    faq: [
      {
        q: "Is dit juridisch advies?",
        a: "Nee. Voor een procedure heb je een advocaat of een deskundige nodig. Dit artikel schetst alleen het kader."
      },
      {
        q: "Telt een Peutz-rapport in een dossier?",
        a: "Testdata van de maatregel helpen om aannemelijk te maken dat je dempt. Ze vervangen geen meting op jouw perceel."
      }
    ],
    content: `
      <p><strong>Belgische geschillen over warmtepompgeluid lopen via bovenmatige burenhinder en (in Vlaanderen) VLAREM — niet via Nederlandse Bouwbesluit-jurisprudentie.</strong> Plak geen Rotterdamse uitspraak op een perceel in Aalst. Dit is <strong>geen juridisch advies</strong>.</p>

      <h2>Wat het kader wél is</h2>
      <p>Boek 3 van het Burgerlijk Wetboek (burenhinder) laat de rechter kijken naar overmatige hinder: intensiteit, tijdstip, omgeving, wat gebruikelijk is in de wijk. VLAREM geeft milieunormen voor specifiek geluid. De gemeente kan bemiddelen of aanmanen. De vrederechter is vaak de eerste rechter.</p>

      <h2>Wat helpt in de feiten</h2>
      <p>Gedocumenteerde meting, een poging tot overleg, en een maatregel (verplaatsing of geteste omkasting). Wie niets doet na een klacht, staat zwakker. Zie <a href="./post.html?slug=warmtepomp-geluid-buren-overlast-vlaanderen">wat te doen</a> en <a href="./post.html?slug=regels-buitenunit-warmtepomp-airco-vlaanderen">plaatsingsregels</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "regels-buitenunit-warmtepomp-airco-vlaanderen",
    title: "Regels voor het plaatsen van een buitenunit in Vlaanderen",
    metaTitle: "Regels buitenunit warmtepomp en airco Vlaanderen | REDUCD",
    metaDescription:
      "Vergunning, vrijstelling, VLAREM en politiereglement: de regels om een buitenunit in Vlaanderen te plaatsen. Hoog-over, check je gemeente.",
    excerpt:
      "Niet elke unit mag zomaar tegen de voorgevel. Vergunning, erfgrens en geluid lopen langs gemeente én gewest. Een checklist.",
    coverImage: "assets/images/google/photo-17.jpg",
    publishedAt: "2026-07-20",
    keywords: ["regels buitenunit warmtepomp", "vergunning airco gevel", "omgevingsvergunning warmtepomp"],
    faq: [
      {
        q: "Heb ik een omgevingsvergunning nodig?",
        a: "Soms vrijgesteld, soms niet — afhankelijk van zichtbaarheid, volume, mede-eigendom en gemeentelijke stedenbouw. Vraag het bij je gemeente of syndicus, niet alleen bij de installateur."
      },
      {
        q: "Geldt VLAREM ook zonder vergunning?",
        a: "Het milieukader verdwijnt niet omdat de plaatsing vrijgesteld is. Geluid kun je nog steeds toetsen."
      }
    ],
    content: `
      <p><strong>Een buitenunit in Vlaanderen toets je aan stedenbouw (vergunning of vrijstelling), mede-eigendom, het politiereglement én VLAREM — niet aan één landelijke “mag op 1 meter”-regel.</strong> Dit is geen juridisch of stedenbouwkundig advies. Het is de checklist die we bij intakes afgaan.</p>

      <h2>Vier loketten</h2>
      <ol>
        <li><strong>Gemeente / omgevingsloket</strong> — zicht vanaf de straat, volume, erfgoed.</li>
        <li><strong>Syndicus / VME</strong> — appartementen en gevels.</li>
        <li><strong>VLAREM</strong> — specifiek geluid, gebiedstype.</li>
        <li><strong>Buren</strong> — hinderrecht, ook als de vergunning klopt.</li>
      </ol>
      <p>Brussel en Wallonië hebben eigen milieuregels. Plaatsingstips: <a href="./post.html?slug=waar-plaats-je-een-warmtepomp-vlaanderen">waar je de unit zet</a>. Geluidskader: <a href="./post.html?slug=warmtepomp-geluid-buren-regelgeving-belgie-nederland">regels bij de buren</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "airco-geluid-dempen-vlaanderen",
    title: "Airco-geluid dempen: overlast door de toename van units",
    metaTitle: "Airco geluid dempen in Vlaanderen | REDUCD",
    metaDescription:
      "Meer airco’s aan Vlaamse gevels, meer nachtklachten. Hoe je een buitenunit dempt zonder de koeling te smoren.",
    excerpt:
      "Eén extra split aan de zijgevel lijkt onschuldig. Stapelen buren hetzelfde, hoor je een straat vol condensors. Dempen kan per unit.",
    coverImage: "assets/images/google/photo-13.jpg",
    publishedAt: "2026-07-18",
    keywords: ["airco geluid dempen", "airco overlast buren", "split airco omkasting"],
    faq: [
      {
        q: "Mag de buur ook een airco hangen als ik de mijne omkast?",
        a: "Ja. Jouw kast lost zijn unit niet op. Wel toon je dat dempen kan — nuttig in een VME of een straatoverleg."
      },
      {
        q: "Is nachtmodus genoeg?",
        a: "Soms overdag. ’s Nachts blijft een condensor hoorbaar bij een open raam op 4 meter."
      }
    ],
    content: `
      <p><strong>Airco-geluid dempen in Vlaanderen is urgent geworden omdat het aantal buitenunits aan gevels sneller groeit dan de afstand tot slaapkamers.</strong> Elke extra split is een extra ventilator. In een Gentse of Mechelse rij is dat stapeling, geen incident.</p>

      <h2>Waarom airco anders voelt</h2>
      <p>Units hangen hoog, blazen naar de steeg, draaien in hittegolven ’s nachts. Warmtepompen staan vaker in de tuin. Daarom is <a href="./post.html?slug=airco-ombouw-goed-idee">ombouw</a> hier geen luxe. Wandmodellen zijn gemaakt voor die gevelsituatie.</p>

      <h2>Per unit dempen</h2>
      <p>Zelfde akoestiek: absorptie, lucht, service. Geen steen eromheen “voor het zicht”. VLAREM kijkt naar de inrichting; meerdere units tellen op. Reken en meet, dan kast. <a href="./post.html?slug=geluidsoverlast-warmtepomp-airco-oplossingen">Oplossingen-overzicht</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "waar-plaats-je-een-warmtepomp-vlaanderen",
    title: "Waar plaats je een warmtepomp? Tips voor Vlaanderen",
    metaTitle: "Waar plaats je een warmtepomp in Vlaanderen? | REDUCD",
    metaDescription:
      "Zijtuin, achtergevel, plat dak of oprit: waar een buitenunit in Vlaanderen het minst stoort. Afstand, hoek, VLAREM en service.",
    excerpt:
      "De enige vrije strook is zelden de beste. Vijf plekken, wat ze akoestisch doen, en wanneer een wandmodel de gevel redt.",
    coverImage: "assets/images/google/photo-01.jpg",
    publishedAt: "2026-07-16",
    keywords: ["waar plaats je een warmtepomp", "plaatsing buitenunit", "warmtepomp zijtuin"],
    faq: [
      {
        q: "Is de zijstrook van een rijwoning altijd fout?",
        a: "Niet altijd, wél risicovol: twee muren, kleine afstand tot de buren. Dan is een omkasting bijna standaard."
      },
      {
        q: "Mag het op het plat dak?",
        a: "Vaak akoestisch beter (minder hoek), let op gewicht, trilling naar de woning en wind. Check constructie en vergunning."
      }
    ],
    content: `
      <p><strong>Plaats een buitenunit in Vlaanderen bij voorkeur vrij, uit de hoek, zo ver mogelijk van slaapkamers en de perceelgrens — en hou de lucht- en servicezijde open.</strong> De “enige plek die overblijft” is de meest onderschatte fout.</p>

      <h2>Vijf plekken</h2>
      <ul>
        <li><strong>Achtertuin, vrij</strong> — meestal het stilste voor de buren.</li>
        <li><strong>Zijstrook</strong> — hoorn-effect; plan een kast mee.</li>
        <li><strong>Tegen de gevel</strong> — <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">wandmodel</a>, let op trilling.</li>
        <li><strong>Oprit</strong> — auto’s als scherm, maar uitlaat vrijhouden.</li>
        <li><strong>Plat dak</strong> — afstand wint, constructie moet het gewicht aankunnen (XL weegt zwaar).</li>
      </ul>
      <p>Regels: <a href="./post.html?slug=regels-buitenunit-warmtepomp-airco-vlaanderen">plaatsingsregels</a>. Maten: <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">vrije ruimte</a>.</p>
      ${CTA}
    `
  }),

  be({
    slug: "installatiegemak-12-boutjes",
    title: "Installatiegemak: een REDUCD-omkasting met 12 boutjes in ± 1,5 uur",
    metaTitle: "Omkasting installeren in 1,5 uur | 12 boutjes | REDUCD",
    metaDescription:
      "Een standaard REDUCD-omkasting zet je met ongeveer 12 bouten, vaak binnen 1,5 uur, als de ondergrond en maten kloppen. Zo verloopt de plaatsing in België.",
    excerpt:
      "Geen dag breekwerk. Wel: juiste maat, vlakke sokkel, luchtweg. Daarna twaalf bouten en de unit ademt weer — stiller.",
    coverImage: "assets/images/google/photo-22.jpg",
    publishedAt: "2026-07-14",
    keywords: ["omkasting installeren", "12 boutjes", "warmtepomp omkasting plaatsen"],
    faq: [
      {
        q: "Kan ik zelf installeren?",
        a: "Ja, als je de handleiding volgt en de unit mag blijven staan. Liever laten doen? Het REDUCD-team plaatst in België."
      },
      {
        q: "Is 1,5 uur inclusief meting?",
        a: "Nee. De 1,5 uur is montage van een standaardkast op een voorbereide plek. Intake en eventuele meting zitten daarvoor."
      }
    ],
    content: `
      <p><strong>Een standaard REDUCD-omkasting installeer je met ongeveer twaalf bouten, vaak binnen anderhalf uur, op voorwaarde dat de maat klopt en de ondergrond vlak en draagkrachtig is.</strong> Dat is het installatiegemak waar installateurs in Vlaanderen om vragen: geen laswerk op locatie, geen dag steigers.</p>

      <h2>Wat “snel” vooronderstelt</h2>
      <ul>
        <li>De juiste <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">maat en het juiste model</a>.</li>
        <li>Vrije zone rondom — <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">50 cm als richtlijn</a>, of strenger als de fabrikant dat vraagt.</li>
        <li>Leidingen die de deuren niet blokkeren. Anders: <a href="./post.html?slug=geluiddempende-omkasting-maatwerk">maatwerk</a>.</li>
      </ul>
      <p>Handleidingen en specs staan achter de documentatiepoort: <a href="../docs/">docs voor particulieren</a> en <a href="../pro/docs/">docs voor installateurs</a>.</p>

      <h2>Na de bouten</h2>
      <p>Controleer lucht, sluiting van panelen en of er niets rammelt. Dan pas is de 14 dB(A) die Peutz mat, ook jóuw 14 dB. Vragen vooraf? info@reducd.be of +32 472 08 44 70.</p>
      ${CTA}
    `
  })
];

