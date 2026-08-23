import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const SHOTS = [
  {
    id: "1",
    time: "0:00–0:06",
    vo: "Intro Sten / REDUCD",
    beeld: "Talking head Sten (echte take)",
    kf: "—",
  },
  {
    id: "2",
    time: "0:06–0:18",
    vo: "Drie situaties / erfgrens",
    beeld: "Buitenunit bij hek, avondlicht",
    kf: "kf-01",
  },
  {
    id: "3",
    time: "0:18–0:28",
    vo: "Cover vs akoestisch",
    beeld: "Split: sierkap ↔ omkasting",
    kf: "kf-04",
  },
  {
    id: "4",
    time: "0:28–0:42",
    vo: "Wij dempen: demper + luchtweg",
    beeld: "Product hero vrijstaand",
    kf: "kf-02",
  },
  {
    id: "5",
    time: "0:42–0:55",
    vo: "14 dB · Peutz · maten · RAL",
    beeld: "Macro louvers / Magnelis",
    kf: "kf-03",
  },
  {
    id: "6",
    time: "0:55–1:08",
    vo: "Built to Last · buy-back",
    beeld: "Materiaal → rustige wide",
    kf: "kf-03 → kf-02",
  },
  {
    id: "7",
    time: "1:08–1:28",
    vo: "12 boutjes · ≤ 1 uur",
    beeld: "Montage inserts",
    kf: "kf-05",
  },
  {
    id: "8",
    time: "1:28–1:45",
    vo: "CTA meting / reducd.be",
    beeld: "Wandmodel + endcard",
    kf: "kf-06",
  },
];

export default function VideoRemakeCanvas() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Video remake — Hoe werkt het</H1>
        <Text tone="secondary">
          Remake van youtu.be/8CJLvJUjWmk · ~105 s · 16:9 · navy brand grade
        </Text>
        <Row gap={8} style={{ flexWrap: "wrap" }}>
          <Pill tone="info">VO script</Pill>
          <Pill tone="info">Shotlist</Pill>
          <Pill tone="info">6 keyframes</Pill>
          <Pill tone="info">Kling / Runway / Veo</Pill>
        </Row>
      </Stack>

      <Row gap={12} style={{ flexWrap: "wrap" }}>
        <Stat value="~105s" label="Doelduur" />
        <Stat value="8" label="Shots" />
        <Stat value="6" label="AI keyframes" />
        <Stat value="14 dB" label="Kernclaim" />
      </Row>

      <Callout tone="info" title="Bestanden">
        Volledige pack: docs/video-remake-hoe-werkt-het.md · Keyframes:
        assets/images/video-keyframes/
      </Callout>

      <Card>
        <CardHeader>Voice-over (NL)</CardHeader>
        <CardBody>
          <Stack gap={12}>
            <Text weight="semibold">Spreker: Sten · rustig tempo</Text>
            <Text>
              Hoi, ik ben Sten van REDUCD. In iets meer dan een minuut leg ik
              uit waarom een akoestische omkasting wél helpt bij geluidsoverlast
              van warmtepompen of airco’s.
            </Text>
            <Text>
              We zien drie situaties. Jij hebt last van je eigen buitenunit. Of
              je buren hebben last van jou. Of de unit staat vlak bij de
              erfgrens — en dan is het een probleem voor iedereen.
            </Text>
            <Text>
              Een esthetische cover maakt de unit mooier. Een akoestische
              omkasting maakt hem stiller. Wij bouwen die tweede: met demper,
              doordachte luchtweg, en materialen die lang meegaan.
            </Text>
            <Text>
              Gemiddeld veertien decibel reductie — tot vijfenzeventig procent
              stiller waargenomen. Onafhankelijk getest door Peutz. Vijf
              standaardmaten, vaak binnen een week, of volledig maatwerk.
              Magnelis standaard, of poedercoating in elke RAL-kleur.
            </Text>
            <Text>
              Built to Last betekent: productie in Nederland, circulaire
              keuzes, en een buy-back als je de kast niet meer nodig hebt.
              Montage is bewust eenvoudig. Twaalf boutjes. Meestal binnen een
              uur — zelf, via je installateur, of door ons team.
            </Text>
            <Text weight="semibold">
              Klaar met herrie? Bezoek reducd.be, of plan direct een gratis
              geluidsmeting.
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Stack gap={8}>
        <H2>Shotlist</H2>
        <Table
          headers={["#", "Tijd", "VO", "Beeld", "Keyframe"]}
          columnAlign={["left", "left", "left", "left", "left"]}
          rows={SHOTS.map((s) => [s.id, s.time, s.vo, s.beeld, s.kf])}
        />
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Prompt-pack (kort)</H2>
        <H3>Global style lock</H3>
        <Text tone="secondary">
          REDUCD brand film, 16:9, photoreal architectural product
          cinematography, navy #0F2A3A shadows, Magnelis acoustic enclosure with
          louvers, European garden, no on-screen text, no watermarks, 24fps.
        </Text>
        <H3>Workflow</H3>
        <Text>
          Image-to-video per keyframe (Kling motion 3–5 / Runway low motion /
          Veo start frame). Sten talking-head en endcard niet AI. VO is master
          voor sync.
        </Text>
        <Callout tone="neutral" title="Niet AI-en">
          Stens gezicht · Peutz-grafiek · logo endcard (logo-reducd-white.png
          op navy)
        </Callout>
      </Stack>
    </Stack>
  );
}
