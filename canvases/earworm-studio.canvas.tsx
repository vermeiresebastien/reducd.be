import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Text,
  useCanvasState,
  useEffect,
  useHostTheme,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "cursor/canvas";

type Bank = "Drums" | "Bass" | "Synth" | "Strings" | "Drop" | "Vocal";
type Wave = OscillatorType;
type Voice =
  | { kind: "kick"; start: number; end: number }
  | { kind: "noise"; decay: number; hp?: number; bp?: number; q?: number }
  | {
      kind: "osc";
      wave: Wave;
      freq: number;
      decay: number;
      filter?: number;
      slide?: number;
      attack?: number;
    }
  | { kind: "fm"; car: number; mod: number; index: number; decay: number }
  | { kind: "formant"; vowel: "a" | "e" | "i" | "o" | "u"; freq: number; decay: number }
  | { kind: "rise"; from: number; to: number };

type Pad = { id: string; bank: Bank; name: string; voice: Voice };
type Hit = { padId: string; step: number; tune?: number };

const BANKS: Bank[] = ["Drums", "Bass", "Synth", "Strings", "Drop", "Vocal"];
const STEPS = 16;
const TUNE_MIN = -24;
const TUNE_MAX = 24;
const TUNE_STEP = 0.5;

const PADS: Pad[] = [
  { id: "d-kick", bank: "Drums", name: "Kick", voice: { kind: "kick", start: 140, end: 42 } },
  { id: "d-snare", bank: "Drums", name: "Snare", voice: { kind: "noise", decay: 0.22, bp: 1800, q: 0.7 } },
  { id: "d-clap", bank: "Drums", name: "Clap", voice: { kind: "noise", decay: 0.18, bp: 2200, q: 1.2 } },
  { id: "d-hat", bank: "Drums", name: "Hat", voice: { kind: "noise", decay: 0.05, hp: 7000 } },
  { id: "d-ohat", bank: "Drums", name: "Open", voice: { kind: "noise", decay: 0.32, hp: 5000 } },
  { id: "d-tom", bank: "Drums", name: "Tom", voice: { kind: "kick", start: 220, end: 90 } },
  { id: "d-rim", bank: "Drums", name: "Rim", voice: { kind: "osc", wave: "square", freq: 880, decay: 0.06 } },
  { id: "d-perc", bank: "Drums", name: "Perc", voice: { kind: "fm", car: 520, mod: 1040, index: 12, decay: 0.12 } },
  { id: "b-sub", bank: "Bass", name: "Sub", voice: { kind: "osc", wave: "sine", freq: 49, decay: 0.55, filter: 180 } },
  { id: "b-round", bank: "Bass", name: "Round", voice: { kind: "osc", wave: "triangle", freq: 65, decay: 0.4, filter: 420 } },
  { id: "b-pluck", bank: "Bass", name: "Pluck", voice: { kind: "osc", wave: "sawtooth", freq: 82, decay: 0.22, filter: 900 } },
  { id: "b-slide", bank: "Bass", name: "Slide", voice: { kind: "osc", wave: "sawtooth", freq: 98, decay: 0.45, slide: 62, filter: 700 } },
  { id: "b-fifth", bank: "Bass", name: "Fifth", voice: { kind: "osc", wave: "square", freq: 73, decay: 0.35, filter: 640 } },
  { id: "b-growl", bank: "Bass", name: "Growl", voice: { kind: "fm", car: 55, mod: 55, index: 28, decay: 0.4 } },
  { id: "b-drop", bank: "Bass", name: "Drop", voice: { kind: "osc", wave: "sine", freq: 110, decay: 0.7, slide: 36 } },
  { id: "b-pulse", bank: "Bass", name: "Pulse", voice: { kind: "osc", wave: "square", freq: 49, decay: 0.18, filter: 500 } },
  { id: "s-lead", bank: "Synth", name: "Lead", voice: { kind: "osc", wave: "sawtooth", freq: 392, decay: 0.35, filter: 2400 } },
  { id: "s-fifth", bank: "Synth", name: "Fifth", voice: { kind: "osc", wave: "sawtooth", freq: 587, decay: 0.28, filter: 2200 } },
  { id: "s-arp", bank: "Synth", name: "Arp", voice: { kind: "osc", wave: "square", freq: 523, decay: 0.12, filter: 1800 } },
  { id: "s-stab", bank: "Synth", name: "Stab", voice: { kind: "osc", wave: "sawtooth", freq: 262, decay: 0.2, filter: 1600 } },
  { id: "s-bell", bank: "Synth", name: "Bell", voice: { kind: "fm", car: 784, mod: 1176, index: 4, decay: 0.5 } },
  { id: "s-sweep", bank: "Synth", name: "Sweep", voice: { kind: "rise", from: 180, to: 1400 } },
  { id: "s-chord", bank: "Synth", name: "Chord", voice: { kind: "osc", wave: "triangle", freq: 330, decay: 0.6, filter: 1400, attack: 0.04 } },
  { id: "s-spark", bank: "Synth", name: "Spark", voice: { kind: "osc", wave: "square", freq: 1046, decay: 0.08, filter: 4200 } },
  { id: "str-ens", bank: "Strings", name: "Ensemble", voice: { kind: "osc", wave: "sawtooth", freq: 196, decay: 0.9, filter: 1200, attack: 0.08 } },
  { id: "str-cello", bank: "Strings", name: "Cello", voice: { kind: "osc", wave: "triangle", freq: 98, decay: 0.8, filter: 700, attack: 0.06 } },
  { id: "str-pizz", bank: "Strings", name: "Pizz", voice: { kind: "osc", wave: "triangle", freq: 294, decay: 0.16, filter: 1800 } },
  { id: "str-swell", bank: "Strings", name: "Swell", voice: { kind: "osc", wave: "sawtooth", freq: 220, decay: 1.1, filter: 900, attack: 0.18 } },
  { id: "str-trem", bank: "Strings", name: "Trem", voice: { kind: "fm", car: 247, mod: 6, index: 18, decay: 0.45 } },
  { id: "str-harm", bank: "Strings", name: "Harm", voice: { kind: "osc", wave: "sine", freq: 659, decay: 0.7, attack: 0.05 } },
  { id: "str-stac", bank: "Strings", name: "Stacc", voice: { kind: "osc", wave: "triangle", freq: 349, decay: 0.12, filter: 1600 } },
  { id: "str-pad", bank: "Strings", name: "Pad", voice: { kind: "osc", wave: "sawtooth", freq: 165, decay: 1.2, filter: 800, attack: 0.12 } },
  { id: "dr-impact", bank: "Drop", name: "Impact", voice: { kind: "kick", start: 90, end: 28 } },
  { id: "dr-rise", bank: "Drop", name: "Rise", voice: { kind: "rise", from: 80, to: 1600 } },
  { id: "dr-brass", bank: "Drop", name: "Brass", voice: { kind: "osc", wave: "sawtooth", freq: 175, decay: 0.5, filter: 1100 } },
  { id: "dr-wobble", bank: "Drop", name: "Wobble", voice: { kind: "fm", car: 73, mod: 8, index: 40, decay: 0.55 } },
  { id: "dr-laser", bank: "Drop", name: "Laser", voice: { kind: "osc", wave: "square", freq: 1480, decay: 0.28, slide: 220 } },
  { id: "dr-boom", bank: "Drop", name: "Boom", voice: { kind: "osc", wave: "sine", freq: 40, decay: 0.85 } },
  { id: "dr-rev", bank: "Drop", name: "Reverse", voice: { kind: "rise", from: 40, to: 900 } },
  { id: "dr-hit", bank: "Drop", name: "Hit", voice: { kind: "noise", decay: 0.12, bp: 900, q: 2 } },
  { id: "v-ah", bank: "Vocal", name: "Ah", voice: { kind: "formant", vowel: "a", freq: 220, decay: 0.45 } },
  { id: "v-oh", bank: "Vocal", name: "Oh", voice: { kind: "formant", vowel: "o", freq: 185, decay: 0.5 } },
  { id: "v-yeah", bank: "Vocal", name: "Yeah", voice: { kind: "formant", vowel: "e", freq: 247, decay: 0.28 } },
  { id: "v-chop", bank: "Vocal", name: "Chop", voice: { kind: "formant", vowel: "i", freq: 330, decay: 0.1 } },
  { id: "v-breath", bank: "Vocal", name: "Breath", voice: { kind: "noise", decay: 0.2, hp: 1200 } },
  { id: "v-hook", bank: "Vocal", name: "Hook", voice: { kind: "formant", vowel: "a", freq: 294, decay: 0.35 } },
  { id: "v-whisp", bank: "Vocal", name: "Whisper", voice: { kind: "formant", vowel: "u", freq: 175, decay: 0.4 } },
  { id: "v-fall", bank: "Vocal", name: "Fall", voice: { kind: "osc", wave: "triangle", freq: 392, decay: 0.55, slide: 196, attack: 0.02 } },
];

const PAD_MAP = new Map(PADS.map((pad) => [pad.id, pad]));

const DEMO: Hit[] = [
  { padId: "d-kick", step: 0 },
  { padId: "d-kick", step: 8 },
  { padId: "d-snare", step: 4 },
  { padId: "d-snare", step: 12 },
  { padId: "d-hat", step: 2 },
  { padId: "d-hat", step: 6 },
  { padId: "d-hat", step: 10 },
  { padId: "d-hat", step: 14 },
  { padId: "d-clap", step: 12 },
  { padId: "b-sub", step: 0 },
  { padId: "b-round", step: 3 },
  { padId: "b-pluck", step: 8 },
  { padId: "b-fifth", step: 11 },
  { padId: "s-lead", step: 0 },
  { padId: "s-fifth", step: 4 },
  { padId: "s-arp", step: 8 },
  { padId: "s-bell", step: 12 },
  { padId: "str-ens", step: 0 },
  { padId: "str-swell", step: 8 },
  { padId: "v-ah", step: 4 },
  { padId: "v-yeah", step: 12 },
  { padId: "dr-impact", step: 0 },
];

const FORMANTS: Record<"a" | "e" | "i" | "o" | "u", [number, number]> = {
  a: [800, 1200],
  e: [400, 2200],
  i: [270, 2700],
  o: [500, 900],
  u: [350, 750],
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function snapTune(n: number) {
  return clamp(Math.round(n / TUNE_STEP) * TUNE_STEP, TUNE_MIN, TUNE_MAX);
}

function hitTune(hit: Hit | undefined) {
  return snapTune(hit?.tune ?? 0);
}

function pitchRatio(semitones: number) {
  return Math.pow(2, snapTune(semitones) / 12);
}

function pitched(freq: number, ratio: number, min = 20) {
  return Math.max(min, freq * ratio);
}

function formatTune(semitones: number) {
  const value = snapTune(semitones);
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)} st`;
}

function noiseBuffer(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function envGain(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  duration: number,
  attack: number,
  peak: number,
) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + Math.max(0.005, attack));
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  gain.connect(dest);
  return gain;
}

function playVoice(
  ctx: AudioContext,
  master: GainNode,
  noise: AudioBuffer,
  voice: Voice,
  time: number,
  durationScale: number,
  level: number,
  semitones: number,
) {
  const ratio = pitchRatio(semitones);
  const dur = (voice.kind === "rise" ? 1.2 : 0.12) * durationScale;
  if (voice.kind === "kick") {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitched(voice.start, ratio), time);
    osc.frequency.exponentialRampToValueAtTime(pitched(voice.end, ratio), time + 0.12 * durationScale);
    const gain = envGain(ctx, master, time, 0.35 * durationScale, 0.005, 0.9 * level);
    osc.connect(gain);
    osc.start(time);
    osc.stop(time + 0.4 * durationScale);
    return;
  }
  if (voice.kind === "noise") {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = ratio;
    const filter = ctx.createBiquadFilter();
    if (voice.hp) {
      filter.type = "highpass";
      filter.frequency.value = pitched(voice.hp, ratio, 40);
    } else {
      filter.type = "bandpass";
      filter.frequency.value = pitched(voice.bp ?? 1800, ratio, 80);
      filter.Q.value = voice.q ?? 0.8;
    }
    const length = voice.decay * durationScale;
    const gain = envGain(ctx, master, time, length, 0.004, 0.45 * level);
    src.connect(filter);
    filter.connect(gain);
    src.start(time);
    src.stop(time + length + 0.05);
    return;
  }
  if (voice.kind === "osc") {
    const osc = ctx.createOscillator();
    osc.type = voice.wave;
    osc.frequency.setValueAtTime(pitched(voice.freq, ratio), time);
    if (voice.slide) {
      osc.frequency.exponentialRampToValueAtTime(
        pitched(voice.slide, ratio),
        time + voice.decay * durationScale,
      );
    }
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = pitched(voice.filter ?? 5000, ratio, 80);
    const length = voice.decay * durationScale;
    const gain = envGain(ctx, master, time, length, voice.attack ?? 0.008, 0.28 * level);
    osc.connect(filter);
    filter.connect(gain);
    osc.start(time);
    osc.stop(time + length + 0.05);
    return;
  }
  if (voice.kind === "fm") {
    const car = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    car.frequency.value = pitched(voice.car, ratio);
    mod.frequency.value = voice.mod >= 20 ? pitched(voice.mod, ratio) : voice.mod;
    modGain.gain.value = voice.index * 20 * (voice.mod >= 20 ? ratio : 1);
    mod.connect(modGain);
    modGain.connect(car.frequency);
    const length = voice.decay * durationScale;
    const gain = envGain(ctx, master, time, length, 0.01, 0.22 * level);
    car.connect(gain);
    car.start(time);
    mod.start(time);
    car.stop(time + length + 0.05);
    mod.stop(time + length + 0.05);
    return;
  }
  if (voice.kind === "formant") {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = pitched(voice.freq, ratio);
    const [f1, f2] = FORMANTS[voice.vowel];
    const p1 = ctx.createBiquadFilter();
    const p2 = ctx.createBiquadFilter();
    p1.type = "bandpass";
    p2.type = "bandpass";
    p1.frequency.value = pitched(f1, ratio, 80);
    p2.frequency.value = pitched(f2, ratio, 80);
    p1.Q.value = 6;
    p2.Q.value = 8;
    const length = voice.decay * durationScale;
    const gain = envGain(ctx, master, time, length, 0.02, 0.2 * level);
    osc.connect(p1);
    p1.connect(p2);
    p2.connect(gain);
    osc.start(time);
    osc.stop(time + length + 0.05);
    return;
  }
  const osc = ctx.createOscillator();
  const src = ctx.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = ratio;
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(pitched(voice.from, ratio), time);
  osc.frequency.exponentialRampToValueAtTime(pitched(voice.to, ratio, 30), time + dur);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(pitched(200, ratio, 40), time);
  hp.frequency.exponentialRampToValueAtTime(pitched(4000, ratio, 80), time + dur);
  const gain = envGain(ctx, master, time, dur, 0.04, 0.18 * level);
  osc.connect(gain);
  src.connect(hp);
  hp.connect(gain);
  osc.start(time);
  src.start(time);
  osc.stop(time + dur + 0.05);
  src.stop(time + dur + 0.05);
}

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  noise: AudioBuffer;
};

function createEngine(): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.8;
  master.connect(ctx.destination);
  return { ctx, master, noise: noiseBuffer(ctx) };
}

function hitKey(hit: Hit) {
  return `${hit.padId}:${hit.step}`;
}

function toggleHit(hits: Hit[], padId: string, step: number, tune = 0): Hit[] {
  const key = `${padId}:${step}`;
  const exists = hits.some((hit) => hitKey(hit) === key);
  if (exists) return hits.filter((hit) => hitKey(hit) !== key);
  return [...hits, { padId, step, tune: snapTune(tune) }];
}

function retuneHit(hits: Hit[], padId: string, step: number, tune: number): Hit[] {
  const next = snapTune(tune);
  let found = false;
  const updated = hits.map((hit) => {
    if (hit.padId !== padId || hit.step !== step) return hit;
    found = true;
    return { ...hit, tune: next };
  });
  return found ? updated : [...hits, { padId, step, tune: next }];
}

function sliderStyle(accent: string, track: string): CSSProperties {
  return {
    width: "100%",
    accentColor: accent,
    background: track,
    height: 4,
    cursor: "pointer",
  };
}

export default function EarwormStudio() {
  const theme = useHostTheme();
  const [bank, setBank] = useCanvasState<Bank>("bank", "Drums");
  const [volume, setVolume] = useCanvasState("volume", 45);
  const [duration, setDuration] = useCanvasState("duration", 1.2);
  const [tempo, setTempo] = useCanvasState("tempo", 70);
  const [hits, setHits] = useCanvasState<Hit[]>("hits", []);
  const [playing, setPlaying] = useCanvasState("playing", false);
  const [selectedPad, setSelectedPad] = useCanvasState("selectedPad", "d-kick");
  const [selectedStep, setSelectedStep] = useCanvasState("selectedStep", 0);
  const [draftTune, setDraftTune] = useCanvasState("draftTune", 0);
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  const engineRef = useRef<Engine | null>(null);
  const hitsRef = useRef(hits);
  const tempoRef = useRef(tempo);
  const volumeRef = useRef(volume);
  const durationRef = useRef(duration);
  const playingRef = useRef(playing);
  const stepRef = useRef(0);
  const nextTimeRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const playheadRef = useRef(0);
  const draftTuneRef = useRef(0);

  hitsRef.current = hits;
  tempoRef.current = tempo;
  volumeRef.current = volume;
  durationRef.current = duration;
  playingRef.current = playing;
  draftTuneRef.current = draftTune;

  const pads = useMemo(() => PADS.filter((pad) => pad.bank === bank), [bank]);
  const armed = useMemo(() => {
    const counts = new Map<string, number>();
    for (const hit of hits) counts.set(hit.padId, (counts.get(hit.padId) ?? 0) + 1);
    return counts;
  }, [hits]);

  function engine() {
    if (!engineRef.current) engineRef.current = createEngine();
    return engineRef.current;
  }

  function trigger(padId: string, when?: number, semitones = 0) {
    const pad = PAD_MAP.get(padId);
    if (!pad) return;
    const audio = engine();
    void audio.ctx.resume();
    playVoice(
      audio.ctx,
      audio.master,
      audio.noise,
      pad.voice,
      when ?? audio.ctx.currentTime,
      durationRef.current,
      volumeRef.current / 100,
      semitones,
    );
    if (when == null) {
      setFlash(padId);
      window.setTimeout(() => setFlash((id) => (id === padId ? null : id)), 90);
    }
  }

  function schedule() {
    const audio = engineRef.current;
    if (!audio || !playingRef.current) return;
    const stepLen = 60 / tempoRef.current / 4;
    while (nextTimeRef.current < audio.ctx.currentTime + 0.12) {
      const current = stepRef.current;
      playheadRef.current = current;
      setStep(current);
      for (const hit of hitsRef.current) {
        if (hit.step === current) trigger(hit.padId, nextTimeRef.current, hitTune(hit));
      }
      nextTimeRef.current += stepLen;
      stepRef.current = (current + 1) % STEPS;
    }
  }

  function armScheduler() {
    const audio = engine();
    void audio.ctx.resume();
    nextTimeRef.current = audio.ctx.currentTime + 0.05;
    if (timerRef.current != null) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(schedule, 25);
    schedule();
  }

  function playPlayback() {
    if (playingRef.current) return;
    setPlaying(true);
    playingRef.current = true;
    armScheduler();
  }

  function pausePlayback() {
    if (!playingRef.current) return;
    setPlaying(false);
    playingRef.current = false;
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stepRef.current = playheadRef.current;
    setStep(playheadRef.current);
  }

  function stopPlayback() {
    setPlaying(false);
    playingRef.current = false;
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stepRef.current = 0;
    playheadRef.current = 0;
    setStep(0);
  }

  function rewindPlayback() {
    stepRef.current = 0;
    playheadRef.current = 0;
    setStep(0);
    if (playingRef.current) {
      const audio = engineRef.current;
      if (audio) nextTimeRef.current = audio.ctx.currentTime + 0.05;
    }
  }

  useEffect(() => {
    if (playing) playPlayback();
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current);
    };
    // Resume scheduler on mount only if a previous session left playback on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyTune(next: number) {
    const snapped = snapTune(next);
    setDraftTune(snapped);
    draftTuneRef.current = snapped;
    const existing = hits.find((hit) => hit.padId === selectedPad && hit.step === selectedStep);
    if (existing) {
      setHits((current) => retuneHit(current, selectedPad, selectedStep, snapped));
      trigger(selectedPad, undefined, snapped);
    }
  }

  function onPad(pad: Pad) {
    setSelectedPad(pad.id);
    const tune = snapTune(draftTuneRef.current);
    trigger(pad.id, undefined, tune);
    if (playingRef.current) {
      const latchStep = playheadRef.current;
      setSelectedStep(latchStep);
      setHits((current) => toggleHit(current, pad.id, latchStep, tune));
    }
  }

  function onStep(index: number) {
    if (!selectedPad) return;
    const existing = hits.find((hit) => hit.padId === selectedPad && hit.step === index);
    setSelectedStep(index);
    if (!existing) {
      const tune = snapTune(draftTuneRef.current);
      setHits((current) => toggleHit(current, selectedPad, index, tune));
      trigger(selectedPad, undefined, tune);
      return;
    }
    if (selectedStep === index) {
      setHits((current) => toggleHit(current, selectedPad, index));
      return;
    }
    setDraftTune(hitTune(existing));
  }

  const selectedHit = hits.find((hit) => hit.padId === selectedPad && hit.step === selectedStep);
  const currentTune = selectedHit ? hitTune(selectedHit) : snapTune(draftTune);
  const selectedHits = hits.filter((hit) => hit.padId === selectedPad);
  const selected = PAD_MAP.get(selectedPad);
  const transportLabel = playing ? "playing" : step === 0 ? "stopped" : "paused";

  return (
    <Stack gap={20}>
      <Row align="end" justify="space-between" wrap>
        <Stack gap={4}>
          <Text tone="tertiary" size="small" weight="medium">
            earworm
          </Text>
          <H1>Studio</H1>
        </Stack>
        <Row gap={16}>
          <Stat value={`${volume}%`} label="Volume" />
          <Stat value={`${duration.toFixed(2)}s`} label="Duration" />
          <Stat value={`${tempo}`} label="Tempo" />
        </Row>
      </Row>

      <Row gap={8} wrap>
        {BANKS.map((item) => (
          <Pill key={item} active={item === bank} onClick={() => setBank(item)}>
            {item}
          </Pill>
        ))}
      </Row>

      <Grid columns={4} gap={8}>
        {pads.map((pad) => {
          const live = flash === pad.id;
          const count = armed.get(pad.id) ?? 0;
          const on = selectedPad === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => onPad(pad)}
              style={{
                minHeight: 64,
                padding: 10,
                borderRadius: 8,
                cursor: "pointer",
                textAlign: "left",
                background: live || on ? theme.fill.primary : theme.fill.tertiary,
                border: `1px solid ${on ? theme.accent.primary : theme.stroke.primary}`,
                color: theme.text.primary,
              }}
            >
              <Stack gap={4}>
                <Text weight="medium">{pad.name}</Text>
                <Text tone="tertiary" size="small">
                  {count > 0 ? `${count} in loop` : pad.bank}
                </Text>
              </Stack>
            </button>
          );
        })}
      </Grid>

      <Stack gap={8}>
        <Row align="center">
          <Text weight="medium">Loop</Text>
          <Spacer />
          <Text tone="secondary" size="small">
            {selected ? `${selected.bank} / ${selected.name}` : "Select a pad"}
            {` · ${transportLabel} · step ${step + 1}`}
          </Text>
        </Row>
        <Row gap={4}>
          {Array.from({ length: STEPS }, (_, index) => {
            const hit = selectedHits.find((item) => item.step === index);
            const active = Boolean(hit);
            const now = index === step;
            const chosen = index === selectedStep;
            const tune = hit ? hitTune(hit) : 0;
            return (
              <button
                key={index}
                onClick={() => onStep(index)}
                title={active ? `Step ${index + 1} · ${formatTune(tune)}` : `Step ${index + 1}`}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 4,
                  cursor: "pointer",
                  background: active ? theme.accent.primary : now ? theme.fill.primary : theme.fill.tertiary,
                  border: `1px solid ${chosen ? theme.stroke.focused : now ? theme.accent.primary : theme.stroke.secondary}`,
                  color: active ? theme.text.onAccent : theme.text.tertiary,
                  fontSize: 10,
                }}
              >
                {active && tune !== 0 ? formatTune(tune).replace(" st", "") : index + 1}
              </button>
            );
          })}
        </Row>
        <Stack gap={6}>
          <Row align="center" gap={8}>
            <Text weight="medium">Tune</Text>
            <Text tone="secondary" size="small">
              {selectedHit
                ? `${selected?.name ?? "Hit"} on step ${selectedStep + 1}`
                : "Next hit / pad preview"}
            </Text>
            <Spacer />
            <Text weight="medium">{formatTune(currentTune)}</Text>
          </Row>
          <Row align="center" gap={8}>
            <Button variant="ghost" onClick={() => applyTune(currentTune - TUNE_STEP)}>
              -
            </Button>
            <input
              type="range"
              min={TUNE_MIN}
              max={TUNE_MAX}
              step={TUNE_STEP}
              value={currentTune}
              onChange={(event) => applyTune(Number(event.target.value))}
              style={sliderStyle(theme.accent.primary, theme.fill.tertiary)}
            />
            <Button variant="ghost" onClick={() => applyTune(currentTune + TUNE_STEP)}>
              +
            </Button>
          </Row>
          <Text tone="tertiary" size="small">
            {TUNE_MIN} to +{TUNE_MAX} semitones, {TUNE_STEP} st steps. Each hit keeps its own pitch.
          </Text>
        </Stack>
      </Stack>

      <Card>
        <CardHeader trailing={<Text tone="tertiary" size="small">{hits.length} hits</Text>}>
          Transport
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Row gap={16} wrap>
              <Stack gap={6} style={{ flex: 1, minWidth: 160 }}>
                <Text tone="secondary" size="small">
                  Volume {volume}%
                </Text>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  style={sliderStyle(theme.accent.primary, theme.fill.tertiary)}
                />
              </Stack>
              <Stack gap={6} style={{ flex: 1, minWidth: 160 }}>
                <Text tone="secondary" size="small">
                  Duration {duration.toFixed(2)}s
                </Text>
                <input
                  type="range"
                  min={20}
                  max={240}
                  value={Math.round(duration * 100)}
                  onChange={(event) => setDuration(Number(event.target.value) / 100)}
                  style={sliderStyle(theme.accent.primary, theme.fill.tertiary)}
                />
              </Stack>
            </Row>
            <Row align="center" justify="space-between" wrap gap={12}>
              <Row gap={8} wrap>
                <Button variant="primary" onClick={playPlayback} disabled={playing}>
                  Play
                </Button>
                <Button variant="secondary" onClick={pausePlayback} disabled={!playing}>
                  Pause
                </Button>
                <Button variant="secondary" onClick={stopPlayback}>
                  Stop
                </Button>
                <Button variant="ghost" onClick={rewindPlayback}>
                  Rewind
                </Button>
                <Button variant="ghost" onClick={() => setHits([])}>
                  Clear
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    hitsRef.current = DEMO;
                    setHits(DEMO);
                    rewindPlayback();
                    playPlayback();
                  }}
                >
                  Demo
                </Button>
              </Row>
              <Row gap={8} align="center">
                <Button variant="ghost" onClick={() => setTempo((bpm) => clamp(bpm - 5, 40, 180))}>
                  -
                </Button>
                <Text weight="medium">{tempo}</Text>
                <Button variant="ghost" onClick={() => setTempo((bpm) => clamp(bpm + 5, 40, 180))}>
                  +
                </Button>
                <Text tone="tertiary" size="small">
                  Tempo
                </Text>
              </Row>
            </Row>
            <Text tone="tertiary" size="small">
              Play resumes from the playhead. Pause freezes the step. Stop resets to 1. Rewind jumps
              to the start. Click a pad to preview at the current tune. Paint steps for the selected
              pad; click a filled step once to select it, again to remove it.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
