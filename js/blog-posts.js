/**
 * Statische SEO-artikelen voor de REDUCD-blog.
 * Fallback wanneer Firebase niet is geconfigureerd of geen gepubliceerde posts teruggeeft.
 * Firebase-posts met dezelfde slug krijgen voorrang.
 */

import { BE_BLOG_POSTS } from "./blog-be-posts.js";

export const STATIC_BLOG_POSTS = [
  {
    slug: "warmtepomp-geluidsoverlast-verminderen",
    title: "Warmtepomp te luid? Zo verminder je geluidsoverlast",
    metaTitle: "Warmtepomp geluidsoverlast verminderen | REDUCD",
    metaDescription:
      "Waarom een warmtepomp hoorbaar is, wat decibels betekenen en hoe een akoestische omkasting gemiddeld 14 dB(A) reduceert. Praktisch voor België.",
    excerpt:
      "Een warmtepomp is zuinig, maar het buitengeluid kan storend zijn. Wat decibels écht betekenen, en hoe je het geluid structureel terugbrengt.",
    coverImage: "assets/images/installs/install-patio-olijf.webp",
    publishedAt: "2026-08-12",
    authorName: "REDUCD",
    status: "published",
    featured: true,
    faq: [
      {
        q: "Hoeveel geluid reduceert een REDUCD-omkasting?",
        a: "Gemiddeld 14 dB(A) bij het vrijstaand model (tot 75% stiller waargenomen), getest door Peutz in juli 2025 conform ISO 3741:2010 en ISO 7235:2003. Het wandmodel reduceert typisch 10–12 dB(A)."
      },
      {
        q: "Helpt een sierkap tegen warmtepompgeluid?",
        a: "Zelden. Een sierkap verbergt de unit maar dempt nauwelijks en kan de luchtweg verstikken. Een akoestische omkasting heeft een demper, absorptie en berekende luchtweg."
      },
      {
        q: "Wat kun je in België doen bij geluidsoverlast?",
        a: "Begin bij plaatsing en vrije ruimte, reken een indicatie met de VLAREM-rekentool in Vlaanderen, en plan een gratis geluidsmeting. België kent geen één landelijke erfgrensnorm."
      }
    ],
    content: `
      <p><strong>Ja: geluidsoverlast van een warmtepomp verminder je structureel met plaatsing, trillingsdemping en een geteste akoestische omkasting — bij REDUCD gemiddeld 14 dB(A) (Peutz, juli 2025) — niet met een sierkap.</strong></p>
      <p>Een warmtepomp is een van de meest logische keuzes voor duurzaam verwarmen. Toch merken veel gezinnen hetzelfde: zodra de buitenunit aanslaat, hoor je een lage zoem, een ventilator of een periodieke piek. Overdag valt dat soms weg in het omgevingsgeluid. ’s Avonds, in de tuin of bij een open raam, wordt het een constante aanwezigheid.</p>
      <p>Dat is geen reden om de warmtepomp weg te denken. Het is wel een reden om het geluid als ontwerpvraag te behandelen — net als de kleur van de gevel of de plaats van het terras.</p>

      <h2>Wat je hoort, is zelden “gewoon 50 dB”</h2>
      <p>Fabrikanten vermelden het geluidsvermogen of het geluidsdrukniveau van de buitenunit. Die cijfers zijn nuttig, maar ze vertellen niet het hele verhaal. Het waargenomen geluid hangt af van afstand, reflecties tegen muren, de ondergrond, de draaisnelheid van de ventilator en het tijdstip. Twee identieke units klinken anders: één vrij in de tuin, één in een hoek tussen twee gevels.</p>
      <p>Decibel is een logaritmische schaal. Ruwweg geldt:</p>
      <ul>
        <li>3 dB verschil is akoestisch meetbaar, maar voor het oor vaak nog subtiel;</li>
        <li>10 dB klinkt als ongeveer een halvering of verdubbeling van de luidheid;</li>
        <li>een reductie van gemiddeld <strong>14 dB(A)</strong> wordt daardoor ervaren als tot zo’n <strong>75% stiller</strong>.</li>
      </ul>
      <p>Precies daarom is “een beetje dempen” zelden genoeg. Wie structureel rust wil, heeft een oplossing nodig die het geluid absorbeert én de luchtstroom van de unit respecteert.</p>

      <h2>Drie oorzaken van warmtepompgeluid</h2>
      <p>Meestal speelt een combinatie. De compressor en ventilator maken het bron-geluid. Harde vlakken in de buurt kaatsen dat terug, zodat het op de erfgrens of in de woonkamer harder aankomt dan het labocijfer suggereert. En bij koud weer of hoge warmtevraag draait de unit langer en soms op een hoger toerental — net op de momenten dat de buurt stiller is.</p>
      <p>Een sieromkasting van hout of staal zonder akoestische kern kan het toestel mooier maken, maar het geluid nauwelijks verlagen. Soms weerkaatst ze het zelfs. Een <a href="./post.html?slug=akoestische-omkasting-vs-suskast">echte akoestische omkasting</a> is anders opgebouwd: dempend materiaal, doordachte luchtinlaat en -uitlaat, en een behuizing die buiten blijft staan.</p>

      <h2>Wat wél werkt</h2>
      <p>Begin bij de plaatsing. Voldoende vrije ruimte, geen ingesloten hoek en een trillingsarme opstelling verminderen al een deel van de overlast. Zie ook onze gids over <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">ruimte rond de warmtepomp</a>. Daarna komt de omkasting: REDUCD-kasten zijn getest (Peutz, ISO 3741 en ISO 7235) en halen gemiddeld 14 dB(A) reductie, zonder de unit “dicht te zetten”.</p>
      <p>Dat laatste is essentieel. Een warmtepomp heeft lucht nodig. Wie de unit inbouwt zonder berekende luchtweg, riskeert een lager rendement of storingen. Een goede kast is dus geen doos, maar een akoestisch en thermisch doordacht product. Bekijk de <a href="../index.html#producten">vrijstaande en wandmodellen</a> en de <a href="../index.html#specs">technische specificaties</a>.</p>

      <h2>Stil, zonder het uitzicht te verliezen</h2>
      <p>Geluid oplossen mag het beeld van de tuin of gevel niet bederven. Magnelis® als standaardafwerking, of een poedercoating in elke RAL-kleur, maakt dat de kast meewerkt met de architectuur in plaats van ernaast te staan. Stil én stijlvol is geen extra optie — het is de enige combinatie die lang meegaat bij de buren én bij jezelf.</p>
      <p>Twijfel je of geluid bij jou het probleem is, of eerder de plaatsing? Reken eerst een indicatie met de <a href="../vlarem/">VLAREM-rekentool</a>, of plan een <a data-open-lead-popup href="../index.html#contact">vrijblijvend adviesgesprek</a>. Op locatie meten zegt meer dan een brochurecijfer.</p>
    `
  },
  {
    slug: "akoestische-omkasting-vs-suskast",
    title: "Akoestische omkasting of suskast: wat is het verschil?",
    metaTitle: "Akoestische omkasting vs suskast | REDUCD",
    metaDescription:
      "Suskast, geluidskast of akoestische omkasting? Wat het verschil is, waarom sierkappen zelden volstaan en waar je op let bij een warmtepompcover.",
    excerpt:
      "Suskast, geluidskast, omkasting: drie woorden, niet altijd hetzelfde product. Waarom een sierkap het geluid zelden oplost.",
    coverImage: "assets/images/google/photo-14.jpg",
    publishedAt: "2026-07-08",
    authorName: "REDUCD",
    status: "published",
    featured: true,
    faq: [
      {
        q: "Wat is het verschil tussen een suskast en een akoestische omkasting?",
        a: "Suskast is een vage term uit de ventilatiewereld. Een akoestische omkasting van REDUCD is een geteste geluidskast: Magnelis-behuizing, 150 mm demper, gerecycled PET en gemiddeld 14 dB(A) reductie (Peutz)."
      },
      {
        q: "Dempt een esthetische cover het geluid?",
        a: "Nauwelijks. Gladde binnenwanden kaatsen geluid terug. Te krappe openingen laten de ventilator harder werken. Het resultaat is dezelfde of soms meer overlast."
      }
    ],
    content: `
      <p><strong>Een sierkap of “suskast” zonder testdata is geen akoestische omkasting.</strong> REDUCD bouwt kasten met demper, luchtweg en Peutz-meting (gemiddeld 14 dB(A) vrijstaand). Wie online zoekt naar een oplossing voor een hoorbare warmtepomp, komt al snel drie termen tegen: suskast, geluidskast en akoestische omkasting. In de volksmond worden ze door elkaar gebruikt. Technisch is het verschil groot — en dat verschil hoor je.</p>
      <p>REDUCD bouwt akoestische omkastingen. We leggen hier uit wat dat betekent, zodat je geen sierkap koopt als je rust nodig hebt, en geen overgedimensioneerde box als een slanker wandmodel volstaat.</p>

      <h2>Suskast: een bekend woord, een vage belofte</h2>
      <p>“Suskast” komt oorspronkelijk uit de ventilatiewereld: een kast of kanaalstuk dat lucht doorlaat en geluid dempt. Het woord is ingeburgerd geraakt voor zowat alles wat rond een buitenunit past. Handig in een zoekopdracht, minder handig als productdefinitie. Achter dezelfde naam schuilen zowel houten schermen als geteste, metalen kasten met absorptiemateriaal.</p>
      <p>Vraag daarom altijd naar de gemeten reductie, de testdocumentatie en hoe de lucht door de kast stroomt. Zonder die drie punten is “suskast” vooral marketing.</p>

      <h2>Sieromkasting versus akoestische omkasting</h2>
      <p>Een sieromkasting (of cover) verbergt de unit. Ze kan van hout, composiet of plaatstaal zijn en oogt vaak netjes. Akoestisch doet ze weinig, tenzij toevallig. Gladde binnenwanden kaatsen geluid terug. Te krappe openingen laten de ventilator harder werken. Het resultaat: dezelfde of soms meer overlast, plus een warmer toestel.</p>
      <p>Een akoestische omkasting is ontworpen als geluidsmaatregel. Bij REDUCD betekent dat onder meer:</p>
      <ul>
        <li>een Magnelis®-behuizing die buiten blijft staan, ook aan de kust;</li>
        <li>absorptie met gerecycled PET en een demper van 150 mm;</li>
        <li>louvres en luchtwegen die de unit laten ademen;</li>
        <li>een gemiddelde reductie van 14 dB(A), getest door Peutz conform ISO 3741:2010 en ISO 7235:2003.</li>
      </ul>
      <p>Dat is het verschil tussen “er iets omheen zetten” en <strong>stil, stijlvol, duurzaam</strong> ontwerpen. Meer over het materiaal lees je in <a href="./post.html?slug=magnelis-omkasting-duurzaam-materiaal">Magnelis en Built to Last</a>.</p>

      <h2>Waar je op let bij de keuze</h2>
      <p>Past de kast bij jouw unit — vrijstaand in de tuin of een <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">wandmodel tegen de gevel</a>? Blijft er genoeg ruimte voor service en lucht (zie <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">installatie en vrije ruimte</a>)? En sluit de afwerking aan bij kozijnen of gevel, in Magnelis of elke RAL-kleur?</p>
      <p>Wie alleen naar de laagste prijs kijkt, koopt vaak een kap. Wie naar decibels, lucht en levensduur kijkt, koopt een omkasting. De <a href="../index.html#producten">producten</a> en <a href="../index.html#specs">specificaties</a> maken dat onderscheid concreet.</p>
      <p>Twijfel je welke term je nodig hebt voor jouw situatie? Beschrijf de opstelling via <a href="../index.html#contact">contact</a>. Wij zeggen eerlijk of een standaardmaat volstaat, of maatwerk slimmer is.</p>
    `
  },
  {
    slug: "warmtepomp-geluid-buren-regelgeving-belgie-nederland",
    title: "Warmtepomp naast de buren: wat zeggen de regels in België?",
    metaTitle: "Warmtepomp geluid buren: regels in België | REDUCD",
    metaDescription:
      "Hoog-over: hoe België geluid van buitenunits via gewest, gemeente en hinderrecht benadert. Geen juridisch advies, wel een helder kader.",
    excerpt:
      "België werkt via gewest, gemeente en hinderrecht. Wat je wél kunt plannen — zonder juridisch advies.",
    coverImage: "assets/images/google/photo-09.jpg",
    publishedAt: "2026-06-10",
    authorName: "REDUCD",
    status: "published",
    featured: true,
    faq: [
      {
        q: "Is er in België één landelijke decibelnorm voor een warmtepomp?",
        a: "Nee. Geluid loopt via gewestelijke milieuregels, gemeentelijke verordeningen en burenhinder. In Vlaanderen toets je het specifieke geluid aan VLAREM-richtwaarden (woongebied 45 / 40 / 35 dB(A))."
      },
      {
        q: "Vervangt deze uitleg juridisch advies?",
        a: "Nee. Het is een hoog-over kader om het gesprek voor te bereiden, geen procedurestuk en geen volledige weergave van elke uitzondering."
      }
    ],
    content: `
      <p><strong>België kent geen één landelijke erfgrensnorm voor elke residentiële buitenunit.</strong> Geluid loopt via gewest, gemeente en hinderrecht. In Vlaanderen toets je onder meer aan VLAREM (woongebied 45 / 40 / 35 dB(A)). Dit artikel is geen juridisch advies.</p>
      <p>Een warmtepomp staat zelden midden op een perceel. Vaak staat ze langs de zijgevel, bij de erfgrens of in een smalle zijtuin — precies waar de buren hun terras, slaapkamerraam of kinderkamer hebben. Dan is geluid geen alleen-jouw-probleem meer. Het wordt een burenvraag, en soms een vergunnings- of milieuvraag.</p>
      <p>Hieronder een hoog-over kader voor België. Het is <strong>geen juridisch advies</strong> en geen volledige weergave van elke uitzondering. Regels wijzigen, en lokale toetsing blijft nodig. Gebruik dit om het gesprek voor te bereiden, niet om een procedure te winnen.</p>

      <h2>België: gewest, gemeente en bovenmatige hinder</h2>
      <p>België kent geen één landelijke decibelnorm voor elke residentiële buitenunit. Geluid loopt via drie sporen. Gewestelijke milieuregels (in Vlaanderen onder meer VLAREM-kaders), gemeentelijke politieverordeningen, en het burgerlijk recht: bovenmatige hinder jegens buren. Brussel en Wallonië hebben eigen kaders.</p>
      <p>Gevolg: twee straten verderop kan de toetsing anders voelen. Sommige gemeenten zijn streng bij klachten, andere kijken eerst naar bemiddeling. Wat wél overal geldt: een unit die ’s nachts duidelijk hoorbaar is in de slaapkamer van de buren, is een risico — menselijk én juridisch. Wachten tot er een klacht is, is duurder dan vooraf meten en dempen.</p>
      <p>Een fabrikantcijfer op 1 meter afstand is niet hetzelfde als wat je bij de perceelgrens of het raam van de buren hoort. Reflectie tegen twee muren kan het niveau merkelijk verhogen. Wie dat risico wilt beperken, heeft drie hefbomen: afstand, opstelling (geen hoek, trillingen beperken) en een geteste <a href="./post.html?slug=akoestische-omkasting-vs-suskast">akoestische omkasting</a>. Een gemiddelde reductie van 14 dB(A) is in veel tuinen het verschil tussen “net te veel” en “rustig genoeg om het gesprek te sluiten”.</p>

      <h2>Wat je wél kunt doen, vandaag</h2>
      <ul>
        <li>Vraag de installateur naar het verwachte niveau bij de perceelgrens, niet alleen het cataloguscijfer.</li>
        <li>Kijk naar plaatsing: afstand, geen akoestische hoek, vrije <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">lucht en service-ruimte</a>.</li>
        <li>Overweeg een omkasting met testdata, geen sierkap. Zie <a href="../index.html#producten">producten</a> en <a href="../index.html#specs">specs</a>.</li>
        <li>Informeer bij gemeente of een milieudienst, en documenteer je maatregelen.</li>
      </ul>
      <p>Goede burenrelaties beginnen bij voorspelbaar, lager geluid — niet bij een discussie over wie “eerst” de tuin had. Een stille, stijlvolle kast maakt de unit minder tot onderwerp.</p>
      <p>Wil je eerst zelf rekenen? Open de <a href="../vlarem/">VLAREM-rekentool</a>: merk en type kiezen, of dB handmatig, plus afstand en muren. Dat blijft een theoretische restwaarde. Voor een inschatting op jouw perceel: <a data-open-lead-popup href="../index.html#contact">vraag een adviesgesprek</a> met meting op locatie. Wij geven geen juridisch advies; wél een realistisch beeld van wat een omkasting akoestisch kan doen.</p>
    `
  },
  {
    slug: "magnelis-omkasting-duurzaam-materiaal",
    title: "Magnelis® en Built to Last: waarom het materiaal telt",
    metaTitle: "Magnelis omkasting: duurzaam materiaal | REDUCD",
    metaDescription:
      "Wat Magnelis® is, waarom het beter bestand is tegen weer en kustklimaat dan standaardverzinkt staal, en hoe Built to Last bij REDUCD in elkaar zit.",
    excerpt:
      "Een omkasting staat 365 dagen buiten. Magnelis®, RVS 316 en gerecycled PET zijn geen details — ze bepalen of de kast over tien jaar nog stil én mooi is.",
    coverImage: "assets/images/detail-material.jpg",
    publishedAt: "2026-05-22",
    authorName: "REDUCD",
    status: "published",
    featured: true,
    faq: [
      {
        q: "Waarom gebruikt REDUCD Magnelis?",
        a: "Magnelis is een staalcoating van zink, aluminium en magnesium (ArcelorMittal) die beter bestand is tegen corrosie dan klassiek verzinkt plaatstaal, ook aan de kust. Afwerking kan Magnelis blijven of RAL-poedercoating."
      },
      {
        q: "Welke materialen zitten in een REDUCD-omkasting?",
        a: "Magnelis-behuizing, RVS 316-bevestiging, gerecycled PET-absorptie en een demper van 150 mm. De gemiddelde reductie van 14 dB(A) komt uit die akoestische kern."
      }
    ],
    content: `
      <p><strong>REDUCD bouwt omkastingen volgens Built to Last: Magnelis-behuizing, RVS 316 en gerecycled PET — bedoeld voor het klimaat van de Lage Landen, inclusief zilte lucht.</strong></p>
      <p>Geluid is de reden waarom je een omkasting overweegt. Toch faalt een kast zelden op decibels alleen. Ze faalt op roest bij de schroeven, een deur die kromtrekt, of isolatie die na twee winters inzakt. Daarom is materiaal geen nabeschouwing. Het is het product.</p>
      <p>REDUCD bouwt volgens het principe <strong>Built to Last</strong>: lokaal geproduceerd, bedoeld voor het klimaat van de Lage Landen, inclusief zilte lucht aan de kust. Drie keuzes maken dat waar: Magnelis® voor de behuizing, RVS 316 voor de bevestiging, en gerecycled PET voor de absorptie.</p>

      <h2>Wat Magnelis® anders maakt</h2>
      <p>Magnelis® is een staalcoating van zink, aluminium en magnesium (ArcelorMittal). Vergeleken met klassiek thermisch verzinkt plaatstaal biedt die legering een hogere weerstand tegen corrosie, ook op snijkanten en in krassen. Voor een kast die jarenlang regen, condens en strooizout ziet, is dat het verschil tussen “nog net acceptabel” en “nog steeds strak”.</p>
      <p>Standaard leveren we Magnelis in zijn eigen, technische uitstraling. Wie de kast wil laten meegaan met kozijnen of gevel, kiest een poedercoating in <strong>elke RAL-kleur</strong>. De ondergrond blijft dezelfde: een coating die eerst het metaal beschermt, daarna eventueel de kleur draagt. Zo blijft stijlvol geen laagje verf op een zwakke basis.</p>

      <h2>Bevestiging en absorptie horen erbij</h2>
      <p>RVS 316 is de kwaliteit die je aan zee verwacht: beter bestand tegen chloriden dan gangbaar RVS 304. Bouten en bevestigingen zijn kleine onderdelen tot ze oranje randen trekken. Dan zie je ze overal. Wij kiezen 316 zodat de kast als geheel veroudert, niet als een lappendeken van vlekken.</p>
      <p>Binnenin zit de akoestiek: gerecycled PET als absorptiemateriaal en een demper van 150 mm. PET is vezelvast, bestand tegen vocht beter dan veel klassieke minerale vullingen in deze toepassing, en past bij lokaal en circulair denken. De reductie — gemiddeld 14 dB(A) — komt uit die kern, niet uit de glans van de plaat. De testdata (Peutz, ISO 3741 en ISO 7235) staan bij de <a href="../index.html#specs">specificaties</a>.</p>

      <h2>Duurzaam is lokaal én lang meegaan</h2>
      <p>Duurzaamheid is hier geen slogan op een sticker. Lokaal produceren verkort transport en maakt maatwerk haalbaar. Gerecyclede materialen verlagen de impact van de vulling. En een kast die vijftien jaar blijft staan, vermijdt de grootste verspilling: opnieuw kopen omdat de eerste “goedkoop” was.</p>
      <p>Dat is Built to Last in één zin: stil vandaag, stijlvol over vijf jaar, nog steeds functioneel als de warmtepomp aan vervanging toe is. Bekijk de <a href="../index.html#producten">modellen</a> of lees hoe je <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">vrijstaand of wand</a> kiest. Vragen over afwerking aan de kust of een RAL-match? <a href="../index.html#contact">Neem contact op</a>.</p>
    `
  },
  {
    slug: "vrijstaand-of-wandmodel-warmtepomp-omkasting",
    title: "Vrijstaand of wandmodel: welke omkasting past bij jouw unit?",
    metaTitle: "Vrijstaand of wandmodel warmtepompomkasting | REDUCD",
    metaDescription:
      "Tuin, oprit, platdak of unit tegen de gevel? Zo kies je tussen het vrijstaande REDUCD-model en het compacte wandmodel — met maten en lucht in gedachten.",
    excerpt:
      "Vrijstaand voor tuin, oprit of dak; wandmodel als de unit dicht bij de muur staat. Geen esthetische keuze alleen — het bepaalt lucht, service en geluid.",
    coverImage: "assets/images/hero-modern-home.jpg",
    publishedAt: "2026-04-18",
    authorName: "REDUCD",
    status: "published",
    featured: false,
    faq: [
      {
        q: "Wanneer kies je het vrijstaand model?",
        a: "Als de unit vrij in de tuin, op de oprit of op een platdak staat, je maximale demping wilt (± 14 dB(A)) en er ± 50 cm vrije ruimte voor/achter is. Maten: S, L en XL."
      },
      {
        q: "Wanneer kies je het wandmodel?",
        a: "Als de unit met de rug tegen de gevel staat of de diepte tot pad of perceelgrens beperkt is. Maten S en L; typisch 10–12 dB(A) reductie."
      }
    ],
    content: `
      <p><strong>Kies vrijstaand (S/L/XL, ± 14 dB(A)) als de unit los staat; kies het wandmodel (S/L, 10–12 dB(A)) als de gevel de vierde wand is.</strong> REDUCD heeft twee families. De namen klinken als een kwestie van smaak. In werkelijkheid dicteert de opstelling van de buitenunit de keuze. Kies je verkeerd, dan knel je de luchtstroom, blokkeer je onderhoud of laat je geluid langs de open zijde ontsnappen.</p>
      <p>Hieronder een nuchtere vergelijking, zodat je naar de <a href="../index.html#producten">productpagina</a> kunt kijken met een voorkeur — of met de juiste vragen voor het adviesgesprek.</p>

      <h2>Vrijstaand: tuin, oprit, platdak</h2>
      <p>Staat de unit vrij, of minstens met ruimte aan meerdere zijden, dan is het vrijstaande model de standaard. Het omsluit de unit volledig, met gecontroleerde in- en uitlaat. Typische plekken: zijtuin, achter de woning, op een plat dak, naast de oprit. Vijf standaardmaten dekken de meeste residentiële units; daarbuiten is maatwerk mogelijk.</p>
      <p>Reken op vrije ruimte rond de kast — bij REDUCD communiceren we onder meer <strong>50 cm</strong> als praktische richtlijn, zodat lucht en service mogelijk blijven. Exacte inname (buitenmaat versus binnenmaat) staat in de <a href="../index.html#specs">maattabel</a>: S, L en XL verschillen sterk in hoogte en gewicht. Een L van 250 kg til je niet even “eroverheen”; planning van levering hoort bij de keuze.</p>

      <h2>Wandmodel: compact, dicht bij de muur</h2>
      <p>Veel units hangen of staan tegen de gevel, met weinig diepte tot het pad of de erfgrens. Een volle vrijstaande kast past daar niet, of dwingt de unit te ver naar voren. Het wandmodel is daarvoor gemaakt: het dempt waar het moet, blijft slanker, en laat de gevelzijde als gegeven. Installateurs zoals in onze projecten vragen er vaak naar bij stedelijke rijwoningen.</p>
      <p>Let op: “dicht bij de muur” is niet hetzelfde als “ingeheind in een nis”. Twee muren plus een kast zonder berekende luchtweg maken een oven. Het wandmodel veronderstelt nog altijd de <a href="./post.html?slug=installatie-ruimte-rond-warmtepomp-omkasting">vrije zones</a> die de unit en de fabrikant vragen.</p>

      <h2>Hoe je beslist</h2>
      <ul>
        <li>Meet de unit én de vrije contour: hoogte, breedte, diepte, afstand tot muur en erfgrens.</li>
        <li>Bekijk waar de lucht in- en uitgaat. Die zijden mag je niet dichtzetten.</li>
        <li>Kies vrijstaand als de unit los staat; wand als de gevel de vierde wand is.</li>
        <li>Stem afwerking af op de plek — Magnelis of RAL, zie <a href="./post.html?slug=magnelis-omkasting-duurzaam-materiaal">materiaal</a>.</li>
      </ul>
      <p>Geluid volgt de zwakste zijde. Een open achterkant naar de buren ondermijnt een mooie voorkant. Daarom is het model geen catalogusplaatje maar een akoestisch plan. Lees ook hoe <a href="./post.html?slug=warmtepomp-geluid-buren-regelgeving-belgie-nederland">regels in België</a> naar geluid bij de perceelgrens kijken.</p>
      <p>Onzeker? Stuur foto’s en maten via <a href="../index.html#contact">contact</a>. Wij zeggen welk model past — of wanneer maatwerk stiller en netter is dan een compromis.</p>
    `
  },
  {
    slug: "installatie-ruimte-rond-warmtepomp-omkasting",
    title: "Installatie en vrije ruimte rond je warmtepomp",
    metaTitle: "Ruimte rond de warmtepomp en omkasting | REDUCD",
    metaDescription:
      "Hoeveel ruimte je nodig hebt voor lucht, service en een akoestische omkasting. Praktische plaatsingstips, zonder de unit te verstikken.",
    excerpt:
      "Te weinig ruimte is de meest onderschatte fout: de unit wordt warmer, luider en moeilijker te onderhouden. Wat je wél vrij moet laten.",
    coverImage: "assets/images/detail-airflow.jpg",
    publishedAt: "2026-03-04",
    authorName: "REDUCD",
    status: "published",
    featured: false,
    faq: [
      {
        q: "Hoeveel vrije ruimte heeft een REDUCD-omkasting nodig?",
        a: "Richtlijn vrijstaand: minstens 50 cm voor/achter en 10 cm opzij, plus 5 cm tussen unit en kast. Wandmodel: minstens 50 cm voor/zij, achterkant tegen de muur. De strengste eis van kast of unitfabrikant wint."
      },
      {
        q: "Hoe lang duurt de montage?",
        a: "Doorgaans ongeveer een uur met twaalf boutjes, zelf of door het REDUCD-team, als ondergrond en maten kloppen."
      }
    ],
    content: `
      <p><strong>Te weinig vrije ruimte maakt een warmtepomp warmer, luider en lastiger te onderhouden.</strong> REDUCD hanteert onder meer 50 cm als praktische zone rond de kast, bovenop wat de unitfabrikant voorschrijft. De beste omkasting faalt als ze te krap om de unit wordt gezet, of als de unit zelf al in een hoek stikt.</p>
      <p>REDUCD levert en plaatst, of je installeert zelf: twaalf bouten, vaak binnen het uur, als de ondergrond en de maten kloppen. Die “als” verdient meer aandacht dan de bouten.</p>

      <h2>Lucht is geen detail</h2>
      <p>Een lucht/water-warmtepomp wisselt warmte met buitenlucht. De ventilator moet kunnen aanzuigen en uitblazen. Blokkeer je die weg met een schutting, een te dichte sierwand of een kast zonder ontworpen louvres, dan stijgt het toerental, het geluid en soms het storingrisico. De <a href="../index.html#specs">lucht- en louverdetails</a> van een REDUCD-kast zijn daarvoor getekend, niet decoratief.</p>
      <p>Richtlijn bij het vrijstaande model: houd rond de kast voldoende vrije zone — wij hanteren onder meer <strong>50 cm</strong> als praktische maat, bovenop wat de unitfabrikant zelf voorschrijft. De strengste van de twee wint. Op een plat dak of in een nis meet je ook de hoogte: sneeuw, valbeveiliging en servicepaden tellen mee.</p>

      <h2>Ondergrond, trillingen en service</h2>
      <p>Zet de unit (en de kast) op een vlakke, draagkrachtige basis. Rubber of dempers helpen tegen structuurgeluid naar de woning, vooral bij plaatsing tegen de gevel of op een dak. Controleer het gewicht: een XL-kast van honderden kilo’s vraagt een andere vloer dan een S in de tuin. De maattabel staat bij <a href="../index.html#specs">specificaties</a>.</p>
      <p>Laat een zijde of luik bereikbaar voor de installateur. Filters, afsluiters en elektrische aansluitingen mogen niet achter een onverplaatsbare wand verdwijnen. Een kast die je niet kunt openen, wordt vroeg of laat verwijderd — en dan is de investering weg.</p>

      <h2>Plaatsing in vier checks</h2>
      <ul>
        <li>Past het <a href="./post.html?slug=vrijstaand-of-wandmodel-warmtepomp-omkasting">juiste model</a> bij de afstand tot de muur?</li>
        <li>Blijft de perceelgrens akoestisch haalbaar? Zie <a href="./post.html?slug=warmtepomp-geluid-buren-regelgeving-belgie-nederland">het Belgische kader</a> of de <a href="../vlarem/">VLAREM-rekentool</a>.</li>
        <li>Is de luchtweg van de unit gelijk aan die van de kast?</li>
        <li>Kan iemand volgend jaar nog een onderhoud uitvoeren?</li>
      </ul>
      <p>Wie die checks afvinkt, krijgt wat de kast belooft: gemiddeld 14 dB(A) minder, een unit die mag blijven presteren, en een beeld dat bij de woning past. Standaardmaten zijn vaak binnen een week leverbaar; de intake met meting op locatie voorkomt dat die snelheid ten koste gaat van de pasvorm.</p>
      <p>Klaar om te meten in plaats van te gissen? <a data-open-lead-popup href="../index.html#contact">Plan een <span class="accent-gratis">gratis</span> meting</a> — telefonisch of op locatie, in België.</p>
    `
  },
  ...BE_BLOG_POSTS
];

export function postTimestamp(post) {
  const ts = post?.publishedAt;
  if (!ts) return 0;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (typeof ts.seconds === "number") return ts.seconds * 1000;
  const n = new Date(ts).getTime();
  return Number.isNaN(n) ? 0 : n;
}

export function mergePublishedPosts(remotePosts = [], max = 80) {
  const bySlug = new Map();
  for (const post of STATIC_BLOG_POSTS) {
    if (post.status === "published" && post.slug) {
      bySlug.set(post.slug, { ...post, source: "static" });
    }
  }
  for (const post of remotePosts || []) {
    if (!post?.slug) continue;
    if (post.status && post.status !== "published") continue;
    bySlug.set(post.slug, { ...post, source: "firebase" });
  }
  const list = Array.from(bySlug.values()).sort((a, b) => postTimestamp(b) - postTimestamp(a));
  return list.slice(0, max);
}

export function getStaticPostBySlug(slug) {
  if (!slug) return null;
  return STATIC_BLOG_POSTS.find((p) => p.slug === slug && p.status === "published") || null;
}

export function getFeaturedPosts(posts, count = 4) {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}

export function getSeriesPosts(posts, series = "vlaanderen") {
  return (posts || [])
    .filter((p) => p.series === series)
    .sort((a, b) => postTimestamp(b) - postTimestamp(a));
}

export function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function resolveCoverPath(path, from = "root") {
  const fallback = "assets/images/detail-material.jpg";
  const value = path || fallback;
  if (value.startsWith("http") || value.startsWith("//") || value.startsWith("/")) return value;
  if (from === "blog") {
    if (value.startsWith("../")) return value;
    return `../${value.replace(/^\//, "")}`;
  }
  return value.replace(/^\.\.\//, "");
}

export function formatBlogDate(ts) {
  if (!ts) return "";
  const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("nl-BE", { year: "numeric", month: "long", day: "numeric" });
}

export function isHtmlContent(content) {
  return /<[a-z][\s\S]*>/i.test(String(content || ""));
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.reducd.be/#business",
    name: "REDUCD",
    legalName: "REDUCD B.V.",
    url: "https://www.reducd.be/",
    logo: "https://www.reducd.be/assets/images/logo-reducd.png",
    email: "info@reducd.be",
    telephone: "+32472084470",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Elzerijs nr. 6",
      addressLocality: "Riethoven",
      postalCode: "5561 VB",
      addressCountry: "NL"
    },
    areaServed: ["BE"],
    description: "REDUCD maakt akoestische omkastingen voor warmtepompen en airco in België."
  };
}

export function blogPostingJsonLd(post, pageUrl, imageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    image: imageUrl || undefined,
    inLanguage: "nl-BE",
    datePublished: typeof post.publishedAt === "string" ? post.publishedAt : undefined,
    keywords: Array.isArray(post.keywords) ? post.keywords.join(", ") : undefined,
    about: (post.keywords || []).map((name) => ({ "@type": "Thing", name })),
    author: { "@type": "Organization", name: post.authorName || "REDUCD" },
    publisher: {
      "@type": "Organization",
      name: "REDUCD",
      logo: { "@type": "ImageObject", url: "https://www.reducd.be/assets/images/logo-reducd.png" }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    isAccessibleForFree: true,
    spatialCoverage: { "@type": "Place", name: "België", address: { "@type": "PostalAddress", addressCountry: "BE" } }
  };
}

export function faqPageJsonLd(faq) {
  if (!Array.isArray(faq) || !faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: String(item.a || "").replace(/<[^>]+>/g, "") }
    }))
  };
}

export function renderFaqHtml(faq) {
  if (!Array.isArray(faq) || !faq.length) return "";
  return (
    `<h2>Veelgestelde vragen</h2>` +
    faq
      .map(
        (item) =>
          `<details class="post-faq"><summary>${item.q}</summary><p>${item.a}</p></details>`
      )
      .join("")
  );
}

export function blogIndexJsonLd(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "REDUCD Blog",
    inLanguage: "nl-BE",
    description: "Inzichten over warmtepompgeluid, VLAREM, omkastingen en stil wonen in België.",
    url: "https://www.reducd.be/blog/",
    publisher: { "@type": "Organization", name: "REDUCD", url: "https://www.reducd.be" },
    blogPost: (posts || []).slice(0, 40).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://www.reducd.be/blog/post.html?slug=${encodeURIComponent(p.slug)}`,
      datePublished: typeof p.publishedAt === "string" ? p.publishedAt : undefined
    }))
  };
}

export function breadcrumbJsonLd(post, pageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.reducd.be/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.reducd.be/blog/" },
      { "@type": "ListItem", position: 3, name: post.title || "Artikel", item: pageUrl }
    ]
  };
}

export function injectJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function renderPostCards(posts, { from = "root", heading = "h3" } = {}) {
  const postHref = from === "blog" ? "./post.html" : "blog/post.html";
  return posts
    .map((p, i) => {
      const delay = i ? `reveal-delay-${Math.min(i, 3)}` : "";
      const cover = resolveCoverPath(p.coverImage, from);
      return `
        <a href="${postHref}?slug=${encodeURIComponent(p.slug)}" class="reveal ${delay} visible bento block rounded-2xl overflow-hidden ring-1 ring-brand-navy/8 bg-white">
          <div class="aspect-[16/10] overflow-hidden bg-brand-navy/[0.04]">
            <img src="${escapeHtml(cover)}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover">
          </div>
          <div class="p-6">
            <div class="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2">${escapeHtml(formatBlogDate(p.publishedAt))}</div>
            <${heading} class="font-bold text-lg text-brand-navy tracking-tight mb-2">${escapeHtml(p.title)}</${heading}>
            <p class="text-sm text-brand-navy/55 font-light line-clamp-3">${escapeHtml(p.excerpt || "")}</p>
          </div>
        </a>`;
    })
    .join("");
}

export function renderTaperCards(posts, { from = "root" } = {}) {
  const postHref = from === "blog" ? "./post.html" : "blog/post.html";
  const n = Math.max(posts.length - 1, 1);
  return posts
    .map((p, i) => {
      const t = (i / n).toFixed(3);
      const cover = resolveCoverPath(p.coverImage, from);
      const hideImg = i > 5 ? " blog-taper-card--text" : "";
      return `
        <a href="${postHref}?slug=${encodeURIComponent(p.slug)}" class="blog-taper-card${hideImg}" style="--t:${t}">
          <div class="blog-taper-media">
            <img src="${escapeHtml(cover)}" alt="" class="blog-taper-img">
          </div>
          <div class="blog-taper-copy">
            <div class="blog-taper-date">${escapeHtml(formatBlogDate(p.publishedAt))}</div>
            <h3 class="blog-taper-title">${escapeHtml(p.title)}</h3>
            <p class="blog-taper-excerpt">${escapeHtml(p.excerpt || "")}</p>
          </div>
        </a>`;
    })
    .join("");
}
