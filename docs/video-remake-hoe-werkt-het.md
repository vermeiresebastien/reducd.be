# Video remake — Hoe werkt een akoestische omkasting

Bron: [youtu.be/8CJLvJUjWmk](https://youtu.be/8CJLvJUjWmk)  
Doelduur: **~105 seconden** · Formaat: **16:9** · Tone: rustig, deskundig, Sten/REDUCD

Keyframes: `assets/images/video-keyframes/`

**Audio + slideshow**
- Audio: `assets/audio/hoe-werkt-het.m4a` (uit youtu.be/8CJLvJUjWmk)
- Video: `assets/video/hoe-werkt-het-keyframes.mp4` (originele audio + 6 keyframes)
- Preview: `docs/audio-keyframes-preview.html` (audio boven, keyframes eronder, sync)

---

## 1. Voice-over script (NL)

**Spreker:** Sten · **Tempo:** rustig (~145 wpm) · **Geschatte duur:** 100–110 s

---

Hoi, ik ben Sten van REDUCD.

In iets meer dan een minuut leg ik uit waarom een akoestische omkasting wél helpt bij geluidsoverlast van warmtepompen of airco’s.

We zien drie situaties. Jij hebt last van je eigen buitenunit. Of je buren hebben last van jou. Of de unit staat vlak bij de erfgrens — en dan is het een probleem voor iedereen.

Een esthetische cover maakt de unit mooier. Een akoestische omkasting maakt hem stiller. Wij bouwen die tweede: met demper, doordachte luchtweg, en materialen die lang meegaan.

Gemiddeld veertien decibel reductie — tot vijfenzeventig procent stiller waargenomen. Onafhankelijk getest door Peutz. Vijf standaardmaten, vaak binnen een week, of volledig maatwerk. Magnelis standaard, of poedercoating in elke RAL-kleur.

Built to Last betekent: productie in Nederland, circulaire keuzes, en een buy-back als je de kast niet meer nodig hebt.

Montage is bewust eenvoudig. Twaalf boutjes. Meestal binnen een uur — zelf, via je installateur, of door ons team.

Klaar met herrie? Bezoek reducd.be, of plan direct een gratis geluidsmeting.

---

### Teleprompter (één blok)

```
Hoi, ik ben Sten van REDUCD. In iets meer dan een minuut leg ik uit waarom een akoestische omkasting wél helpt bij geluidsoverlast van warmtepompen of airco’s. We zien drie situaties. Jij hebt last van je eigen buitenunit. Of je buren hebben last van jou. Of de unit staat vlak bij de erfgrens — en dan is het een probleem voor iedereen. Een esthetische cover maakt de unit mooier. Een akoestische omkasting maakt hem stiller. Wij bouwen die tweede: met demper, doordachte luchtweg, en materialen die lang meegaan. Gemiddeld veertien decibel reductie — tot vijfenzeventig procent stiller waargenomen. Onafhankelijk getest door Peutz. Vijf standaardmaten, vaak binnen een week, of volledig maatwerk. Magnelis standaard, of poedercoating in elke RAL-kleur. Built to Last betekent: productie in Nederland, circulaire keuzes, en een buy-back als je de kast niet meer nodig hebt. Montage is bewust eenvoudig. Twaalf boutjes. Meestal binnen een uur — zelf, via je installateur, of door ons team. Klaar met herrie? Bezoek reducd.be, of plan direct een gratis geluidsmeting.
```

---

## 2. Shotlist / storyboard

| # | Tijd | VO (kern) | Beeld | Keyframe | Camera / beweging |
|---|------|-----------|-------|----------|-------------------|
| 1 | 0:00–0:06 | Intro Sten / REDUCD | Sten medium close-up, navy/wit merksetting of studio | — (echte take Sten) | Slow push-in |
| 2 | 0:06–0:18 | Drie situaties | Buitenunit bij erfgrens / hek, avondlicht | `kf-01-erfgrens-overlast.png` | Slow pan fence → unit |
| 3 | 0:18–0:28 | Cover vs akoestisch | Split of wipe: flinterdunne cover ↔ solide omkasting | `kf-04-cover-vs-akoestisch.png` | Hard cut / wipe |
| 4 | 0:28–0:42 | Wij dempen: demper + luchtweg | Product hero vrijstaand in tuin | `kf-02-product-hero.png` | Orbit / slow dolly |
| 5 | 0:42–0:55 | 14 dB · Peutz · maten · RAL | Macro louvers / Magnelis / PET | `kf-03-materiaal-detail.png` | Macro push |
| 6 | 0:55–1:08 | Built to Last · buy-back | Detail materiaal + wide rustige tuin | `kf-03` → `kf-02` | Match cut |
| 7 | 1:08–1:28 | 12 boutjes · ≤ 1 uur | Montage close-up bouten / panelen | `kf-05-installatie.png` | Handheld light / insert cuts |
| 8 | 1:28–1:45 | CTA meting / reducd.be | Wandmodel gevel, stilte, end card | `kf-06-cta-stilte.png` | Hold + fade to endcard |

**End card (post):** logo wit op navy `#0F2A3A` · `reducd.be` · “Plan gratis geluidsmeting” · tel NL/BE.

**Audio:** VO dry + lichte room · soft bed ambient (tuin) onder shots 2–4 · stilte-drop na “stillere” · CTA zonder muziekpiek.

---

## 3. Keyframe-stills

Map: `assets/images/video-keyframes/`

| Bestand | Gebruik |
|---------|---------|
| `kf-01-erfgrens-overlast.png` | Probleem / erfgrens |
| `kf-02-product-hero.png` | Product reveal |
| `kf-03-materiaal-detail.png` | Built to Last / specs |
| `kf-04-cover-vs-akoestisch.png` | Differentiatie |
| `kf-05-installatie.png` | Montage |
| `kf-06-cta-stilte.png` | Slot / CTA |

Referenties gebruikt: `hero-enclosure`, `hero-modern-home`, `product-urban`, `product-heritage`, `detail-louver`, `detail-material`, `detail-airflow`, `founder-outdoor`.

---

## 4. Prompt-pack (Kling / Runway / Veo)

### Global style lock (plak boven elke shot)

```
REDUCD brand film, 16:9, photoreal architectural product cinematography,
color grade navy #0F2A3A shadows and clean white highlights, Magnelis metal acoustic
heat-pump enclosure with horizontal louvers, European garden/modern home context,
no on-screen text, no watermarks, no fake logos, natural lighting, shallow depth of field,
premium commercial, 24fps cinematic.
```

### Negative (gedeeld)

```
cartoon, CGI plastic, warped metal, extra bolts, unreadable text, subtitles,
stock smile faces, purple neon, heavy vignette, logo hallucination, wrong proportions
```

### Per shot — image-to-video (aanbevolen)

Gebruik de keyframe als **start frame** (Kling Elements / Runway Image-to-Video / Veo frame).

**Shot 2 — Erfgrens**  
Start: `kf-01-erfgrens-overlast.png`  
```
Slow cinematic pan from garden fence to outdoor heat pump near property line at dusk,
subtle leaf movement, quiet tension, 4 seconds, locked exposure, no people.
```

**Shot 3 — Cover vs akoestisch**  
Start: `kf-04-cover-vs-akoestisch.png`  
```
Camera slowly pushes toward the solid acoustic enclosure on the right; left decorative
cover stays static; gentle parallax; 3 seconds; photoreal.
```

**Shot 4 — Product hero**  
Start: `kf-02-product-hero.png`  
```
Slow orbital move around freestanding Magnelis acoustic enclosure in modern garden,
louvers catch soft daylight, calm premium product hero, 5 seconds.
```

**Shot 5 — Materiaal**  
Start: `kf-03-materiaal-detail.png`  
```
Macro push into metal louvers and acoustic material texture, crisp detail,
industrial craftsmanship, 3 seconds.
```

**Shot 7 — Installatie**  
Start: `kf-05-installatie.png`  
```
Hands tighten stainless bolts on acoustic enclosure base panels, practical documentary
pace, natural daylight, 4 seconds, faces out of frame.
```

**Shot 8 — CTA**  
Start: `kf-06-cta-stilte.png`  
```
Hold on finished wall-mounted acoustic enclosure against modern facade, slight breeze
in plants, peaceful ending, 4 seconds, then fade to navy.
```

### Text-to-video fallback (als geen startframe)

```
[GLOBAL STYLE LOCK]

Scene: freestanding REDUCD-style Magnelis acoustic heat pump enclosure with deep
horizontal louvers in a Belgian modern garden, slow dolly-in, golden hour soft light,
photoreal, no text.
```

### Tool tips

| Tool | Setting |
|------|---------|
| **Kling** | Image-to-Video · 5s · motion 3–5 · keep product locked |
| **Runway Gen-3** | Image-to-Video · motion low · camera only |
| **Veo** | Start/end frame waar mogelijk · “photoreal commercial” |
| **Edit** | CapCut / Premiere · VO eerst syncen · B-roll op ademhalingen |

### Wat je níet AI moet laten doen

- Stens gezicht (echte take of stil foto + lichte push)
- Exacte Peutz-grafiek (echte slide of plain type in post)
- Logo endcard (exporteer uit `logo-reducd-white.png` op navy)

---

## Volgende stap (productie)

1. Sten neemt VO + talking-head (shot 1) op.  
2. Image-to-video op kf-01…06.  
3. Snij in volgorde shotlist; VO is master.  
4. Endcard + soft CTA-sfx.  
5. Upload YouTube → vervang embed `8CJLvJUjWmk` op de site.
