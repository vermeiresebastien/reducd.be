import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Select,
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
type ScaleId = "pent" | "minor" | "major" | "chrom";
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

type SynthParams = {
  osc1Wave: Wave;
  osc2Wave: Wave;
  osc1Oct: number;
  osc1Detune: number;
  osc2Mix: number;
  osc2Detune: number;
  cutoff: number;
  res: number;
  filtEnv: number;
  lfoAmt: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  delayTime: number;
  feedback: number;
  delayMix: number;
  lfoRate: number;
  gate: number;
  bassWave: Wave;
  bassSub: number;
  bassCutoff: number;
  bassDecay: number;
  bassLevel: number;
  scale: ScaleId;
  swing: number;
};

const BANKS: Bank[] = ["Drums", "Bass", "Synth", "Strings", "Drop", "Vocal"];
const STEPS = 16;
const TUNE_MIN = -24;
const TUNE_MAX = 24;
const TUNE_STEP = 0.5;
const ROOT_MIDI = 48;
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALES: Record<ScaleId, number[]> = {
  pent: [0, 3, 5, 7, 10, 12, 15, 17],
  minor: [0, 2, 3, 5, 7, 8, 10, 12],
  major: [0, 2, 4, 5, 7, 9, 11, 12],
  chrom: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};
const WAVE_OPTIONS = [
  { value: "sawtooth", label: "Saw" },
  { value: "square", label: "Square" },
  { value: "triangle", label: "Triangle" },
  { value: "sine", label: "Sine" },
];
const SCALE_OPTIONS = [
  { value: "pent", label: "Minor pent" },
  { value: "minor", label: "Natural minor" },
  { value: "major", label: "Major" },
  { value: "chrom", label: "Chromatic" },
];
const WHITE_KEYS = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72];
const BLACK_AFTER = [49, 51, null, 54, 56, 58, null, 61, 63, null, 66, 68, 70];

const DEFAULT_SYNTH: SynthParams = {
  osc1Wave: "sawtooth",
  osc2Wave: "sawtooth",
  osc1Oct: 0,
  osc1Detune: 0,
  osc2Mix: 35,
  osc2Detune: 7,
  cutoff: 1800,
  res: 4,
  filtEnv: 1200,
  lfoAmt: 0,
  attack: 0.01,
  decay: 0.18,
  sustain: 0.45,
  release: 0.28,
  delayTime: 0.22,
  feedback: 0.28,
  delayMix: 0.22,
  lfoRate: 3.2,
  gate: 0.55,
  bassWave: "square",
  bassSub: 0.55,
  bassCutoff: 420,
  bassDecay: 0.32,
  bassLevel: 0.7,
  scale: "pent",
  swing: 0.08,
};

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

function midiToHz(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function midiName(midi: number) {
  return NOTE_NAMES[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
}

function freqToMidi(freq: number) {
  return 69 + 12 * Math.log2(Math.max(20, freq) / 440);
}

function voiceFreq(voice: Voice) {
  if (voice.kind === "kick") return voice.start;
  if (voice.kind === "osc") return voice.freq;
  if (voice.kind === "fm") return voice.car;
  if (voice.kind === "formant") return voice.freq;
  if (voice.kind === "rise") return voice.from;
  return 440;
}

function analogNotes(pad: Pad, midi: number) {
  if (pad.id === "s-fifth") return [midi, midi + 7];
  if (pad.id === "s-chord") return [midi, midi + 4, midi + 7];
  return [midi];
}

function inScale(midi: number, scale: ScaleId) {
  const iv = ((midi - ROOT_MIDI) % 12 + 12) % 12;
  return SCALES[scale].some((step) => step % 12 === iv);
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
  filter: BiquadFilterNode;
  delay: DelayNode;
  feedback: GainNode;
  delayGain: GainNode;
  dry: GainNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

function createEngine(): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.8;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = DEFAULT_SYNTH.cutoff;
  filter.Q.value = DEFAULT_SYNTH.res;

  const dry = ctx.createGain();
  dry.gain.value = 1;
  const delay = ctx.createDelay(1);
  delay.delayTime.value = DEFAULT_SYNTH.delayTime;
  const feedback = ctx.createGain();
  feedback.gain.value = DEFAULT_SYNTH.feedback;
  const delayGain = ctx.createGain();
  delayGain.gain.value = DEFAULT_SYNTH.delayMix;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = DEFAULT_SYNTH.lfoRate;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = DEFAULT_SYNTH.lfoAmt;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  filter.connect(dry);
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(delayGain);
  dry.connect(master);
  delayGain.connect(master);
  master.connect(ctx.destination);

  return {
    ctx,
    master,
    noise: noiseBuffer(ctx),
    filter,
    delay,
    feedback,
    delayGain,
    dry,
    lfo,
    lfoGain,
  };
}

function applySynthGraph(engine: Engine, params: SynthParams) {
  const now = engine.ctx.currentTime;
  engine.filter.frequency.setTargetAtTime(params.cutoff, now, 0.03);
  engine.filter.Q.setTargetAtTime(params.res, now, 0.03);
  engine.delay.delayTime.setTargetAtTime(params.delayTime, now, 0.03);
  engine.feedback.gain.setTargetAtTime(params.feedback, now, 0.03);
  engine.delayGain.gain.setTargetAtTime(params.delayMix, now, 0.03);
  engine.lfo.frequency.setTargetAtTime(params.lfoRate, now, 0.03);
  engine.lfoGain.gain.setTargetAtTime(params.lfoAmt, now, 0.03);
}

function analogVoice(engine: Engine, params: SynthParams, midi: number, time: number, dur: number, level: number) {
  const { ctx, filter } = engine;
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const mix1 = ctx.createGain();
  const mix2 = ctx.createGain();
  const env = ctx.createGain();
  const hz = midiToHz(midi + params.osc1Oct * 12);
  o1.type = params.osc1Wave;
  o2.type = params.osc2Wave;
  o1.frequency.setValueAtTime(hz, time);
  o2.frequency.setValueAtTime(hz, time);
  o1.detune.setValueAtTime(params.osc1Detune, time);
  o2.detune.setValueAtTime(params.osc2Detune, time);
  mix1.gain.value = 0.55 * level;
  mix2.gain.value = (params.osc2Mix / 100) * 0.5 * level;
  const attack = params.attack;
  const decay = params.decay;
  const sustain = Math.max(0.0001, params.sustain);
  const release = params.release;
  env.gain.setValueAtTime(0.0001, time);
  env.gain.exponentialRampToValueAtTime(1, time + attack);
  env.gain.exponentialRampToValueAtTime(sustain, time + attack + decay);
  env.gain.setValueAtTime(sustain, time + dur);
  env.gain.exponentialRampToValueAtTime(0.0001, time + dur + release);
  const peak = params.cutoff + params.filtEnv;
  filter.frequency.cancelScheduledValues(time);
  filter.frequency.setValueAtTime(params.cutoff, time);
  filter.frequency.linearRampToValueAtTime(peak, time + attack);
  filter.frequency.linearRampToValueAtTime(params.cutoff, time + attack + decay + 0.05);
  o1.connect(mix1);
  o2.connect(mix2);
  mix1.connect(env);
  mix2.connect(env);
  env.connect(filter);
  o1.start(time);
  o2.start(time);
  o1.stop(time + dur + release + 0.02);
  o2.stop(time + dur + release + 0.02);
}

function analogBass(engine: Engine, params: SynthParams, midi: number, time: number, dur: number, level: number) {
  const { ctx, master } = engine;
  const sub = ctx.createOscillator();
  const osc = ctx.createOscillator();
  const subG = ctx.createGain();
  const oscG = ctx.createGain();
  const filt = ctx.createBiquadFilter();
  const env = ctx.createGain();
  const hz = midiToHz(midi);
  sub.type = "sine";
  osc.type = params.bassWave;
  sub.frequency.setValueAtTime(hz, time);
  osc.frequency.setValueAtTime(hz, time);
  osc.detune.setValueAtTime(-8, time);
  subG.gain.value = params.bassSub * 0.75 * level;
  oscG.gain.value = 0.42 * level;
  filt.type = "lowpass";
  filt.Q.value = 7;
  filt.frequency.setValueAtTime(Math.max(80, params.bassCutoff * 2.4), time);
  filt.frequency.exponentialRampToValueAtTime(Math.max(60, params.bassCutoff), time + 0.09);
  const peak = Math.max(0.0001, params.bassLevel);
  env.gain.setValueAtTime(0.0001, time);
  env.gain.exponentialRampToValueAtTime(peak, time + 0.008);
  env.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.42), time + 0.07);
  env.gain.setValueAtTime(Math.max(0.0001, peak * 0.42), time + dur);
  env.gain.exponentialRampToValueAtTime(0.0001, time + dur + params.bassDecay);
  sub.connect(subG);
  osc.connect(oscG);
  subG.connect(filt);
  oscG.connect(filt);
  filt.connect(env);
  env.connect(master);
  sub.start(time);
  osc.start(time);
  sub.stop(time + dur + params.bassDecay + 0.02);
  osc.stop(time + dur + params.bassDecay + 0.02);
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

function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (n: number) => string;
  onChange: (n: number) => void;
}) {
  const theme = useHostTheme();
  const digits = step < 1 ? (step < 0.01 ? 3 : 2) : 0;
  return (
    <Stack gap={6}>
      <Row align="center">
        <Text tone="secondary" size="small">
          {label}
        </Text>
        <Spacer />
        <Text size="small">{format ? format(value) : Number(value).toFixed(digits)}</Text>
      </Row>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={sliderStyle(theme.accent.primary, theme.fill.tertiary)}
      />
    </Stack>
  );
}

function Keybed({
  bank,
  scale,
  held,
  onDown,
  onUp,
}: {
  bank: Bank;
  scale: ScaleId;
  held: number | null;
  onDown: (midi: number) => void;
  onUp: () => void;
}) {
  const theme = useHostTheme();
  return (
    <Stack gap={8}>
      <Row align="center">
        <Text weight="medium">{bank === "Bass" ? "Bass keys" : "Lead keys"}</Text>
        <Spacer />
        <Text tone="tertiary" size="small">
          Live analog voice · scale notes marked
        </Text>
      </Row>
      <Row gap={3} align="end">
        {WHITE_KEYS.map((midi, index) => {
          const black = BLACK_AFTER[index];
          const scaled = inScale(midi, scale);
          const down = held === midi;
          return (
            <div key={midi} style={{ flex: 1, position: "relative", height: 72 }}>
              <button
                onPointerDown={() => onDown(midi)}
                onPointerUp={onUp}
                onPointerLeave={onUp}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  cursor: "pointer",
                  background: down ? theme.accent.primary : scaled ? theme.fill.primary : theme.fill.tertiary,
                  border: `1px solid ${down ? theme.accent.primary : theme.stroke.primary}`,
                  color: down ? theme.text.onAccent : theme.text.tertiary,
                  fontSize: 10,
                }}
              >
                {midiName(midi)}
              </button>
              {black != null ? (
                <button
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    onDown(black);
                  }}
                  onPointerUp={onUp}
                  onPointerLeave={onUp}
                  style={{
                    position: "absolute",
                    left: "58%",
                    top: 0,
                    width: "70%",
                    height: "58%",
                    borderRadius: 4,
                    cursor: "pointer",
                    zIndex: 1,
                    background: held === black ? theme.accent.primary : theme.fill.secondary,
                    border: `1px solid ${theme.stroke.primary}`,
                    color: held === black ? theme.text.onAccent : theme.text.secondary,
                    fontSize: 9,
                  }}
                >
                  {midiName(black)}
                </button>
              ) : null}
            </div>
          );
        })}
      </Row>
    </Stack>
  );
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
  const [synth, setSynth] = useCanvasState<SynthParams>("synth", DEFAULT_SYNTH);
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [heldKey, setHeldKey] = useState<number | null>(null);
  const [engineOn, setEngineOn] = useState(false);

  const engineRef = useRef<Engine | null>(null);
  const hitsRef = useRef(hits);
  const tempoRef = useRef(tempo);
  const volumeRef = useRef(volume);
  const durationRef = useRef(duration);
  const playingRef = useRef(playing);
  const synthRef = useRef(synth);
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
  synthRef.current = synth;
  draftTuneRef.current = draftTune;

  const pads = useMemo(() => PADS.filter((pad) => pad.bank === bank), [bank]);
  const armed = useMemo(() => {
    const counts = new Map<string, number>();
    for (const hit of hits) counts.set(hit.padId, (counts.get(hit.padId) ?? 0) + 1);
    return counts;
  }, [hits]);

  function engine() {
    if (!engineRef.current) {
      engineRef.current = createEngine();
      applySynthGraph(engineRef.current, synthRef.current);
      setEngineOn(true);
    }
    return engineRef.current;
  }

  function holdFor(preview: boolean, extra = 0) {
    const stepLen = 60 / tempoRef.current / 4;
    const base = preview ? 0.32 : stepLen;
    return Math.max(0.04, base * (synthRef.current.gate + extra) * (durationRef.current / 1.2));
  }

  function trigger(padId: string, when?: number, semitones = 0) {
    const pad = PAD_MAP.get(padId);
    if (!pad) return;
    const audio = engine();
    void audio.ctx.resume();
    applySynthGraph(audio, synthRef.current);
    const time = when ?? audio.ctx.currentTime;
    const level = volumeRef.current / 100;
    const params = synthRef.current;
    if (pad.bank === "Synth") {
      const midi = freqToMidi(voiceFreq(pad.voice)) + semitones;
      const dur = holdFor(when == null);
      for (const note of analogNotes(pad, midi)) analogVoice(audio, params, note, time, dur, level);
    } else if (pad.bank === "Bass") {
      analogBass(
        audio,
        params,
        freqToMidi(voiceFreq(pad.voice)) + semitones,
        time,
        holdFor(when == null, 0.15),
        level,
      );
    } else {
      playVoice(audio.ctx, audio.master, audio.noise, pad.voice, time, durationRef.current, level, semitones);
    }
    if (when == null) {
      setFlash(padId);
      window.setTimeout(() => setFlash((id) => (id === padId ? null : id)), 90);
    }
  }

  function playKey(midi: number) {
    const audio = engine();
    void audio.ctx.resume();
    applySynthGraph(audio, synthRef.current);
    const time = audio.ctx.currentTime;
    const level = volumeRef.current / 100;
    const params = synthRef.current;
    const pitchedMidi = midi + snapTune(draftTuneRef.current);
    setHeldKey(midi);
    if (bank === "Bass") analogBass(audio, params, pitchedMidi - 12, time, 0.32, level);
    else analogVoice(audio, params, pitchedMidi, time, 0.35, level);
  }

  function schedule() {
    const audio = engineRef.current;
    if (!audio || !playingRef.current) return;
    const stepLen = 60 / tempoRef.current / 4;
    while (nextTimeRef.current < audio.ctx.currentTime + 0.12) {
      const current = stepRef.current;
      const swing = current % 2 === 1 ? stepLen * synthRef.current.swing : 0;
      const when = nextTimeRef.current + swing;
      playheadRef.current = current;
      setStep(current);
      for (const hit of hitsRef.current) {
        if (hit.step === current) trigger(hit.padId, when, hitTune(hit));
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

  useEffect(() => {
    if (engineRef.current) applySynthGraph(engineRef.current, synth);
  }, [synth]);

  function patchSynth<K extends keyof SynthParams>(key: K, value: SynthParams[K]) {
    setSynth((current) => ({ ...current, [key]: value }));
  }

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
  const analogBank = bank === "Synth" || bank === "Bass";

  return (
    <Stack gap={20}>
      <Row align="end" justify="space-between" wrap>
        <Stack gap={4}>
          <Text tone="tertiary" size="small" weight="medium">
            earworm
          </Text>
          <H1>Studio</H1>
          <Text tone="tertiary" size="small">
            {engineOn ? "Audio unlocked" : "Click Play or a pad to unlock audio"}
            {" · pads + analog"}
          </Text>
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
                  {count > 0 ? `${count} in loop` : pad.bank === "Synth" || pad.bank === "Bass" ? "Analog" : pad.bank}
                </Text>
              </Stack>
            </button>
          );
        })}
      </Grid>

      {bank === "Synth" ? (
        <Stack gap={12}>
          <Row align="center">
            <H2>Analog lead</H2>
            <Spacer />
            <Text tone="tertiary" size="small">
              Dual osc · filter · delay · shapes every Synth pad
            </Text>
          </Row>
          <Grid columns={3} gap={14}>
            <Stack gap={10}>
              <Text weight="medium">Osc 1</Text>
              <Select
                value={synth.osc1Wave}
                onChange={(value) => patchSynth("osc1Wave", value as Wave)}
                options={WAVE_OPTIONS}
              />
              <ParamSlider
                label="Octave"
                value={synth.osc1Oct}
                min={-2}
                max={2}
                step={1}
                onChange={(value) => patchSynth("osc1Oct", value)}
              />
              <ParamSlider
                label="Detune"
                value={synth.osc1Detune}
                min={-50}
                max={50}
                step={1}
                onChange={(value) => patchSynth("osc1Detune", value)}
              />
            </Stack>
            <Stack gap={10}>
              <Text weight="medium">Osc 2</Text>
              <Select
                value={synth.osc2Wave}
                onChange={(value) => patchSynth("osc2Wave", value as Wave)}
                options={WAVE_OPTIONS}
              />
              <ParamSlider
                label="Mix"
                value={synth.osc2Mix}
                min={0}
                max={100}
                step={1}
                onChange={(value) => patchSynth("osc2Mix", value)}
              />
              <ParamSlider
                label="Detune"
                value={synth.osc2Detune}
                min={-50}
                max={50}
                step={1}
                onChange={(value) => patchSynth("osc2Detune", value)}
              />
            </Stack>
            <Stack gap={10}>
              <Text weight="medium">Filter</Text>
              <ParamSlider
                label="Cutoff"
                value={synth.cutoff}
                min={80}
                max={8000}
                step={1}
                onChange={(value) => patchSynth("cutoff", value)}
              />
              <ParamSlider
                label="Res"
                value={synth.res}
                min={0.1}
                max={18}
                step={0.1}
                onChange={(value) => patchSynth("res", value)}
              />
              <ParamSlider
                label="Env"
                value={synth.filtEnv}
                min={0}
                max={5000}
                step={1}
                onChange={(value) => patchSynth("filtEnv", value)}
              />
              <ParamSlider
                label="LFO"
                value={synth.lfoAmt}
                min={0}
                max={2000}
                step={1}
                onChange={(value) => patchSynth("lfoAmt", value)}
              />
            </Stack>
            <Stack gap={10}>
              <Text weight="medium">Envelope</Text>
              <ParamSlider
                label="Attack"
                value={synth.attack}
                min={0.001}
                max={1.5}
                step={0.001}
                onChange={(value) => patchSynth("attack", value)}
              />
              <ParamSlider
                label="Decay"
                value={synth.decay}
                min={0.01}
                max={1.8}
                step={0.01}
                onChange={(value) => patchSynth("decay", value)}
              />
              <ParamSlider
                label="Sustain"
                value={synth.sustain}
                min={0}
                max={1}
                step={0.01}
                onChange={(value) => patchSynth("sustain", value)}
              />
              <ParamSlider
                label="Release"
                value={synth.release}
                min={0.02}
                max={2.5}
                step={0.01}
                onChange={(value) => patchSynth("release", value)}
              />
            </Stack>
            <Stack gap={10}>
              <Text weight="medium">Delay / LFO</Text>
              <ParamSlider
                label="Time"
                value={synth.delayTime}
                min={0.05}
                max={0.75}
                step={0.01}
                onChange={(value) => patchSynth("delayTime", value)}
              />
              <ParamSlider
                label="Fbk"
                value={synth.feedback}
                min={0}
                max={0.85}
                step={0.01}
                onChange={(value) => patchSynth("feedback", value)}
              />
              <ParamSlider
                label="Mix"
                value={synth.delayMix}
                min={0}
                max={0.7}
                step={0.01}
                onChange={(value) => patchSynth("delayMix", value)}
              />
              <ParamSlider
                label="Rate"
                value={synth.lfoRate}
                min={0.1}
                max={12}
                step={0.1}
                onChange={(value) => patchSynth("lfoRate", value)}
              />
            </Stack>
            <Stack gap={10}>
              <Text weight="medium">Voice</Text>
              <Select
                value={synth.scale}
                onChange={(value) => patchSynth("scale", value as ScaleId)}
                options={SCALE_OPTIONS}
              />
              <ParamSlider
                label="Gate"
                value={synth.gate}
                min={0.08}
                max={0.98}
                step={0.01}
                onChange={(value) => patchSynth("gate", value)}
              />
              <ParamSlider
                label="Swing"
                value={Math.round(synth.swing * 100)}
                min={0}
                max={60}
                step={1}
                format={(value) => `${value}%`}
                onChange={(value) => patchSynth("swing", value / 100)}
              />
            </Stack>
          </Grid>
        </Stack>
      ) : null}

      {bank === "Bass" ? (
        <Stack gap={12}>
          <Row align="center">
            <H2>Analog bass</H2>
            <Spacer />
            <Text tone="tertiary" size="small">
              Sub + osc · shapes every Bass pad
            </Text>
          </Row>
          <Grid columns={5} gap={14}>
            <Stack gap={10}>
              <Text weight="medium">Wave</Text>
              <Select
                value={synth.bassWave}
                onChange={(value) => patchSynth("bassWave", value as Wave)}
                options={WAVE_OPTIONS}
              />
            </Stack>
            <ParamSlider
              label="Sub"
              value={synth.bassSub}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) => patchSynth("bassSub", value)}
            />
            <ParamSlider
              label="Cutoff"
              value={synth.bassCutoff}
              min={80}
              max={1200}
              step={1}
              onChange={(value) => patchSynth("bassCutoff", value)}
            />
            <ParamSlider
              label="Decay"
              value={synth.bassDecay}
              min={0.08}
              max={1.2}
              step={0.01}
              onChange={(value) => patchSynth("bassDecay", value)}
            />
            <ParamSlider
              label="Level"
              value={synth.bassLevel}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) => patchSynth("bassLevel", value)}
            />
          </Grid>
          <Row gap={16} wrap>
            <Stack gap={6} style={{ flex: 1, minWidth: 160 }}>
              <Text tone="secondary" size="small">
                Scale
              </Text>
              <Select
                value={synth.scale}
                onChange={(value) => patchSynth("scale", value as ScaleId)}
                options={SCALE_OPTIONS}
              />
            </Stack>
            <Stack gap={6} style={{ flex: 1, minWidth: 160 }}>
              <ParamSlider
                label="Gate"
                value={synth.gate}
                min={0.08}
                max={0.98}
                step={0.01}
                onChange={(value) => patchSynth("gate", value)}
              />
            </Stack>
            <Stack gap={6} style={{ flex: 1, minWidth: 160 }}>
              <ParamSlider
                label="Swing"
                value={Math.round(synth.swing * 100)}
                min={0}
                max={60}
                step={1}
                format={(value) => `${value}%`}
                onChange={(value) => patchSynth("swing", value / 100)}
              />
            </Stack>
          </Row>
        </Stack>
      ) : null}

      {analogBank ? (
        <Keybed
          bank={bank}
          scale={synth.scale}
          held={heldKey}
          onDown={playKey}
          onUp={() => setHeldKey(null)}
        />
      ) : null}

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
              Click Play or a pad once to unlock audio. Play resumes from the playhead. Pause freezes
              the step. Stop resets to 1. Rewind jumps to the start. Synth and Bass pads use the analog
              voice; other banks stay one-shot. Paint steps for the selected pad; click a filled step
              once to select it, again to remove it.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}
