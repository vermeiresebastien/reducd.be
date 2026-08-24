(() => {
  "use strict";

  const STEPS = 16;
  const NOTES = 14;
  const ROWS = 2;
  const COLS = 7;
  const SYNTHS = 4;

  const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const KEYS = NOTE_NAMES.map((n, i) => ({ value: String(i), label: n }));
  const MODES = {
    major: { label: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
    minor: { label: "Natural minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
    dorian: { label: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
    mixolydian: { label: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
    pentMinor: { label: "Minor pent", intervals: [0, 3, 5, 7, 10, 12, 15] },
    pentMajor: { label: "Major pent", intervals: [0, 2, 4, 7, 9, 12, 14] },
  };

  const FX_ORDERS = [
    { id: "fm-filter-dist", label: "FM → Filter → Distortion" },
    { id: "fm-dist-filter", label: "FM → Distortion → Filter" },
    { id: "filter-fm-dist", label: "Filter → FM → Distortion" },
    { id: "dist-filter-fm", label: "Distortion → Filter → FM" },
  ];

  const DEFAULT_PATTERNS = [
    // synth 0 — rising motif
    seedPattern([
      [0, 0], [2, 4], [4, 7], [6, 4], [8, 9], [10, 7], [12, 11], [14, 9],
    ]),
    // synth 1 — offbeat chords-ish
    seedPattern([
      [1, 2], [1, 4], [5, 5], [5, 7], [9, 2], [9, 9], [13, 4], [13, 11],
    ]),
    // synth 2 — sparse high
    seedPattern([
      [3, 10], [7, 12], [11, 13], [15, 10],
    ]),
    // synth 3 — bass-ish lower row accents
    seedPattern([
      [0, 0], [4, 3], [8, 0], [12, 5],
    ]),
  ];

  function seedPattern(hits) {
    const grid = Array.from({ length: NOTES }, () => Array(STEPS).fill(false));
    for (const [step, note] of hits) {
      if (note >= 0 && note < NOTES && step >= 0 && step < STEPS) grid[note][step] = true;
    }
    return grid;
  }

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function midiName(midi) {
    const n = NOTE_NAMES[((midi % 12) + 12) % 12];
    const oct = Math.floor(midi / 12) - 1;
    return `${n}${oct}`;
  }

  function scaleDegrees(modeId) {
    const mode = MODES[modeId] || MODES.minor;
    const base = mode.intervals.slice(0, 7);
    // 14 notes = 2 rows of 7 scale degrees across two octaves
    const degrees = [];
    for (let row = 0; row < ROWS; row++) {
      for (let i = 0; i < COLS; i++) {
        const iv = base[i % base.length];
        const oct = row + Math.floor(i / base.length);
        degrees.push(iv + 12 * oct);
      }
    }
    return degrees;
  }

  function makeDistortionCurve(amount) {
    const n = 2048;
    const curve = new Float32Array(n);
    const k = Math.max(0, amount) * 100;
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  /** @type {AudioContext | null} */
  let ctx = null;
  /** @type {GainNode | null} */
  let master = null;
  let playing = false;
  let currentStep = 0;
  let timerId = null;
  let nextNoteTime = 0;
  const scheduleAhead = 0.08;
  const lookahead = 25;

  const state = {
    bpm: 112,
    key: 0, // C
    mode: "minor",
    transpose: 0, // semitones applied to all sequence pitches
    rootOctave: 3,
    kick: Array(STEPS).fill(false).map((_, i) => i % 4 === 0),
    kickPitch: 48,
    kickDecay: 0.28,
    kickLevel: 0.85,
    synths: Array.from({ length: SYNTHS }, (_, i) => ({
      grid: DEFAULT_PATTERNS[i].map((row) => row.slice()),
      wave: i === 3 ? "square" : i === 2 ? "triangle" : "sawtooth",
      level: i === 3 ? 0.55 : 0.4,
      attack: 0.01,
      decay: 0.22,
      sustain: 0.35,
      release: 0.18,
      cutoff: 1800 - i * 280,
      resonance: 4 + i,
      drive: 0.25 + i * 0.08,
      fmRatio: 2,
      fmIndex: 6 + i * 3,
      fxBypass: false,
      muted: false,
    })),
  };

  const el = {
    app: document.getElementById("app"),
    playBtn: document.getElementById("playBtn"),
    bpm: document.getElementById("bpm"),
    key: document.getElementById("key"),
    mode: document.getElementById("mode"),
    transposeLabel: document.getElementById("transposeLabel"),
    kickGrid: document.getElementById("kickGrid"),
    kickPitch: document.getElementById("kickPitch"),
    kickDecay: document.getElementById("kickDecay"),
    kickLevel: document.getElementById("kickLevel"),
    synths: document.getElementById("synths"),
  };

  function ensureAudio() {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = 0.7;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noteMidi(noteIndex) {
    const degrees = scaleDegrees(state.mode);
    const base = 12 * (state.rootOctave + 1) + state.key;
    return base + degrees[noteIndex] + state.transpose;
  }

  function noteLabels() {
    return Array.from({ length: NOTES }, (_, i) => midiName(noteMidi(i)));
  }

  function rotateGrid(grid, dir) {
    // dir > 0 = forward (right), dir < 0 = backward (left)
    const steps = ((dir % STEPS) + STEPS) % STEPS;
    return grid.map((row) => {
      const out = row.slice();
      for (let s = 0; s < STEPS; s++) out[(s + steps) % STEPS] = row[s];
      return out;
    });
  }

  function playKick(time) {
    const audio = ensureAudio();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, time);
    osc.type = "sine";
    const startF = midiToFreq(state.kickPitch + 12);
    const endF = midiToFreq(state.kickPitch - 24);
    osc.frequency.setValueAtTime(startF, time);
    osc.frequency.exponentialRampToValueAtTime(Math.max(30, endF), time + state.kickDecay);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, state.kickLevel), time + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + state.kickDecay);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + state.kickDecay + 0.05);
  }

  function createVoiceGraph(synth, audio, time, freq) {
    const order = FX_ORDERS[synth.index % FX_ORDERS.length].id;
    const carrier = audio.createOscillator();
    const modulator = audio.createOscillator();
    const modGain = audio.createGain();
    const filter = audio.createBiquadFilter();
    const dist = audio.createWaveShaper();
    const env = audio.createGain();
    const out = audio.createGain();

    carrier.type = synth.wave;
    modulator.type = "sine";
    carrier.frequency.setValueAtTime(freq, time);
    modulator.frequency.setValueAtTime(Math.max(20, freq * synth.fmRatio), time);

    const fmDepth = synth.fxBypass ? 0 : freq * (synth.fmIndex / 10);
    modGain.gain.setValueAtTime(fmDepth, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(synth.fxBypass ? 18000 : synth.cutoff, time);
    filter.Q.setValueAtTime(synth.fxBypass ? 0.7 : synth.resonance, time);
    dist.curve = makeDistortionCurve(synth.fxBypass ? 0 : synth.drive);
    dist.oversample = "2x";
    out.gain.value = synth.level;

    const a = Math.max(0.005, synth.attack);
    const d = Math.max(0.01, synth.decay);
    const s = Math.max(0.001, synth.sustain);
    const r = Math.max(0.02, synth.release);
    const dur = a + d + r;
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(1, time + a);
    env.gain.exponentialRampToValueAtTime(s, time + a + d);
    env.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    function chain(nodes) {
      for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
    }

    modulator.connect(modGain);

    if (synth.fxBypass) {
      // Dry: carrier only, no FM / filter / distortion coloration
      carrier.connect(env);
      env.connect(out);
      out.connect(master);
    } else if (order === "fm-filter-dist") {
      modGain.connect(carrier.frequency);
      chain([carrier, filter, dist, env, out]);
      out.connect(master);
    } else if (order === "fm-dist-filter") {
      modGain.connect(carrier.frequency);
      chain([carrier, dist, filter, env, out]);
      out.connect(master);
    } else if (order === "filter-fm-dist") {
      // Filter the raw oscillator, then FM a second carrier from that motion via audio-rate sidechain-ish depth,
      // then distort. Practically: filtered audio amplitude-modulates an FM voice.
      const fmCar = audio.createOscillator();
      const fmMod = audio.createOscillator();
      const fmModGain = audio.createGain();
      const filterEnv = audio.createGain();
      fmCar.type = synth.wave;
      fmMod.type = "sine";
      fmCar.frequency.setValueAtTime(freq, time);
      fmMod.frequency.setValueAtTime(Math.max(20, freq * synth.fmRatio), time);
      fmModGain.gain.setValueAtTime(fmDepth, time);
      fmMod.connect(fmModGain);
      fmModGain.connect(fmCar.frequency);
      carrier.connect(filter);
      filter.connect(filterEnv);
      filterEnv.gain.value = 0.5;
      chain([fmCar, dist, env, out]);
      filterEnv.connect(out);
      out.connect(master);
      fmCar.start(time);
      fmMod.start(time);
      fmCar.stop(time + dur + 0.05);
      fmMod.stop(time + dur + 0.05);
    } else {
      // dist-filter-fm: distort & filter first, then use that as the modulator depth into a clean carrier
      const postCar = audio.createOscillator();
      const depth = audio.createGain();
      postCar.type = "sine";
      postCar.frequency.setValueAtTime(freq, time);
      depth.gain.value = 0;
      depth.gain.setValueAtTime(freq * (synth.fmIndex / 12), time);
      carrier.connect(dist);
      dist.connect(filter);
      filter.connect(depth);
      depth.connect(postCar.frequency);
      chain([postCar, env, out]);
      // blend a little filtered body
      const body = audio.createGain();
      body.gain.value = 0.25;
      filter.connect(body);
      body.connect(out);
      out.connect(master);
      postCar.start(time);
      postCar.stop(time + dur + 0.05);
    }

    carrier.start(time);
    modulator.start(time);
    carrier.stop(time + dur + 0.05);
    modulator.stop(time + dur + 0.05);
  }

  function playSynthNote(synthIndex, noteIndex, time) {
    const synth = state.synths[synthIndex];
    if (synth.muted) return;
    const audio = ensureAudio();
    const freq = midiToFreq(noteMidi(noteIndex));
    createVoiceGraph({ ...synth, index: synthIndex }, audio, time, freq);
  }

  function scheduleStep(step, time) {
    if (state.kick[step]) playKick(time);
    for (let s = 0; s < SYNTHS; s++) {
      for (let n = 0; n < NOTES; n++) {
        if (state.synths[s].grid[n][step]) playSynthNote(s, n, time);
      }
    }
  }

  function scheduler() {
    if (!playing || !ctx) return;
    const secondsPerStep = 60 / state.bpm / 4;
    while (nextNoteTime < ctx.currentTime + scheduleAhead) {
      scheduleStep(currentStep, nextNoteTime);
      paintPlayhead(currentStep);
      nextNoteTime += secondsPerStep;
      currentStep = (currentStep + 1) % STEPS;
    }
    timerId = window.setTimeout(scheduler, lookahead);
  }

  function start() {
    ensureAudio();
    playing = true;
    currentStep = 0;
    nextNoteTime = ctx.currentTime + 0.06;
    el.playBtn.textContent = "Stop";
    el.playBtn.classList.add("playing");
    scheduler();
  }

  function stop() {
    playing = false;
    if (timerId) window.clearTimeout(timerId);
    timerId = null;
    el.playBtn.textContent = "Play";
    el.playBtn.classList.remove("playing");
    paintPlayhead(-1);
  }

  function paintPlayhead(step) {
    document.querySelectorAll(".cell.playhead").forEach((c) => c.classList.remove("playhead"));
    if (step < 0) return;
    document.querySelectorAll(`.cell[data-step="${step}"]`).forEach((c) => c.classList.add("playhead"));
  }

  function renderKick() {
    const headers = `<div class="step-headers"><span></span>${Array.from({ length: STEPS }, (_, i) => `<span>${i + 1}</span>`).join("")}</div>`;
    const cells = state.kick
      .map(
        (on, step) =>
          `<button type="button" class="cell kick${on ? " on" : ""}" data-step="${step}" data-kick="1" aria-label="Kick step ${step + 1}"></button>`
      )
      .join("");
    el.kickGrid.innerHTML = `${headers}<div class="step-row"><div class="lab">Kick</div>${cells}</div>`;
  }

  function renderSynths() {
    const labels = noteLabels();
    el.synths.innerHTML = state.synths
      .map((synth, si) => {
        const order = FX_ORDERS[si];
        const rows = Array.from({ length: NOTES }, (_, ni) => {
          const cells = Array.from({ length: STEPS }, (_, step) => {
            const on = synth.grid[ni][step];
            return `<button type="button" class="cell${on ? " on" : ""}" data-synth="${si}" data-note="${ni}" data-step="${step}" aria-label="${labels[ni]} step ${step + 1}"></button>`;
          }).join("");
          return `<div class="step-row"><div class="lab">${labels[ni]}</div>${cells}</div>`;
        }).join("");

        return `
          <section class="panel synth" data-synth="${si}">
            <div class="panel-head">
              <div class="panel-title">Synth ${si + 1}</div>
              <div class="row-controls">
                <button type="button" class="btn tiny" data-shift="${si}" data-dir="-1" title="Shift pattern backward">⟵ Shift</button>
                <button type="button" class="btn tiny" data-shift="${si}" data-dir="1" title="Shift pattern forward">Shift ⟶</button>
                <button type="button" class="btn tiny ghost${synth.fxBypass ? " active" : ""}" data-bypass="${si}">FX ${synth.fxBypass ? "Bypassed" : "On"}</button>
                <button type="button" class="btn tiny ghost${synth.muted ? " active" : ""}" data-mute="${si}">${synth.muted ? "Muted" : "Mute"}</button>
                <label class="ctrl">Wave
                  <select data-param="wave" data-synth="${si}">
                    <option value="sawtooth"${synth.wave === "sawtooth" ? " selected" : ""}>Saw</option>
                    <option value="square"${synth.wave === "square" ? " selected" : ""}>Square</option>
                    <option value="triangle"${synth.wave === "triangle" ? " selected" : ""}>Triangle</option>
                    <option value="sine"${synth.wave === "sine" ? " selected" : ""}>Sine</option>
                  </select>
                </label>
              </div>
            </div>
            <div class="step-headers"><span></span>${Array.from({ length: STEPS }, (_, i) => `<span>${i + 1}</span>`).join("")}</div>
            <div class="note-grid">${rows}</div>
            <div class="fx${synth.fxBypass ? " bypassed" : ""}" data-fx="${si}">
              <div class="fx-order">Processing order: <strong style="color:var(--text)">${order.label}</strong></div>
              <label class="ctrl">Cutoff <span class="val" data-readout="cutoff-${si}">${Math.round(synth.cutoff)}</span>
                <input type="range" min="120" max="8000" step="10" value="${synth.cutoff}" data-param="cutoff" data-synth="${si}">
              </label>
              <label class="ctrl">Resonance <span class="val" data-readout="resonance-${si}">${synth.resonance.toFixed(1)}</span>
                <input type="range" min="0.2" max="18" step="0.1" value="${synth.resonance}" data-param="resonance" data-synth="${si}">
              </label>
              <label class="ctrl">Drive <span class="val" data-readout="drive-${si}">${synth.drive.toFixed(2)}</span>
                <input type="range" min="0" max="1" step="0.01" value="${synth.drive}" data-param="drive" data-synth="${si}">
              </label>
              <label class="ctrl">FM ratio <span class="val" data-readout="fmRatio-${si}">${synth.fmRatio.toFixed(2)}</span>
                <input type="range" min="0.25" max="8" step="0.25" value="${synth.fmRatio}" data-param="fmRatio" data-synth="${si}">
              </label>
              <label class="ctrl">FM index <span class="val" data-readout="fmIndex-${si}">${synth.fmIndex.toFixed(1)}</span>
                <input type="range" min="0" max="40" step="0.5" value="${synth.fmIndex}" data-param="fmIndex" data-synth="${si}">
              </label>
              <label class="ctrl">Level <span class="val" data-readout="level-${si}">${synth.level.toFixed(2)}</span>
                <input type="range" min="0" max="1" step="0.01" value="${synth.level}" data-param="level" data-synth="${si}">
              </label>
              <label class="ctrl">Decay <span class="val" data-readout="decay-${si}">${synth.decay.toFixed(2)}</span>
                <input type="range" min="0.05" max="1.2" step="0.01" value="${synth.decay}" data-param="decay" data-synth="${si}">
              </label>
            </div>
          </section>`;
      })
      .join("");
  }

  function updateTransposeLabel() {
    const sign = state.transpose > 0 ? "+" : "";
    el.transposeLabel.textContent = `${sign}${state.transpose} st`;
  }

  function refreshNoteLabelsOnly() {
    const labels = noteLabels();
    document.querySelectorAll(".synth").forEach((section) => {
      section.querySelectorAll(".step-row .lab").forEach((lab, i) => {
        lab.textContent = labels[i];
      });
    });
  }

  function fillSelects() {
    el.key.innerHTML = KEYS.map((k) => `<option value="${k.value}"${Number(k.value) === state.key ? " selected" : ""}>${k.label}</option>`).join("");
    el.mode.innerHTML = Object.entries(MODES)
      .map(([id, m]) => `<option value="${id}"${id === state.mode ? " selected" : ""}>${m.label}</option>`)
      .join("");
    el.bpm.value = String(state.bpm);
    el.kickPitch.value = String(state.kickPitch);
    el.kickDecay.value = String(state.kickDecay);
    el.kickLevel.value = String(state.kickLevel);
  }

  function bind() {
    el.playBtn.addEventListener("click", () => {
      ensureAudio();
      if (playing) stop();
      else start();
    });

    el.bpm.addEventListener("change", () => {
      state.bpm = Math.min(200, Math.max(40, Number(el.bpm.value) || 112));
      el.bpm.value = String(state.bpm);
    });

    el.key.addEventListener("change", () => {
      state.key = Number(el.key.value);
      refreshNoteLabelsOnly();
    });

    el.mode.addEventListener("change", () => {
      state.mode = el.mode.value;
      refreshNoteLabelsOnly();
    });

    document.getElementById("semiDown").addEventListener("click", () => {
      state.transpose -= 1;
      updateTransposeLabel();
      refreshNoteLabelsOnly();
    });
    document.getElementById("semiUp").addEventListener("click", () => {
      state.transpose += 1;
      updateTransposeLabel();
      refreshNoteLabelsOnly();
    });
    document.getElementById("octDown").addEventListener("click", () => {
      state.transpose -= 12;
      updateTransposeLabel();
      refreshNoteLabelsOnly();
    });
    document.getElementById("octUp").addEventListener("click", () => {
      state.transpose += 12;
      updateTransposeLabel();
      refreshNoteLabelsOnly();
    });
    document.getElementById("transposeReset").addEventListener("click", () => {
      state.transpose = 0;
      updateTransposeLabel();
      refreshNoteLabelsOnly();
    });

    el.kickPitch.addEventListener("input", () => {
      state.kickPitch = Number(el.kickPitch.value);
      document.querySelector('[data-readout="kickPitch"]').textContent = String(state.kickPitch);
    });
    el.kickDecay.addEventListener("input", () => {
      state.kickDecay = Number(el.kickDecay.value);
      document.querySelector('[data-readout="kickDecay"]').textContent = state.kickDecay.toFixed(2);
    });
    el.kickLevel.addEventListener("input", () => {
      state.kickLevel = Number(el.kickLevel.value);
      document.querySelector('[data-readout="kickLevel"]').textContent = state.kickLevel.toFixed(2);
    });

    el.kickGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("button.cell[data-kick]");
      if (!btn) return;
      const step = Number(btn.dataset.step);
      state.kick[step] = !state.kick[step];
      btn.classList.toggle("on", state.kick[step]);
      ensureAudio();
      if (state.kick[step] && !playing) playKick(ctx.currentTime);
    });

    el.synths.addEventListener("click", (e) => {
      const shiftBtn = e.target.closest("[data-shift]");
      if (shiftBtn) {
        const si = Number(shiftBtn.dataset.shift);
        const dir = Number(shiftBtn.dataset.dir);
        state.synths[si].grid = rotateGrid(state.synths[si].grid, dir);
        renderSynths();
        return;
      }

      const bypassBtn = e.target.closest("[data-bypass]");
      if (bypassBtn) {
        const si = Number(bypassBtn.dataset.bypass);
        state.synths[si].fxBypass = !state.synths[si].fxBypass;
        renderSynths();
        return;
      }

      const muteBtn = e.target.closest("[data-mute]");
      if (muteBtn) {
        const si = Number(muteBtn.dataset.mute);
        state.synths[si].muted = !state.synths[si].muted;
        renderSynths();
        return;
      }

      const cell = e.target.closest("button.cell[data-synth]");
      if (!cell) return;
      const si = Number(cell.dataset.synth);
      const ni = Number(cell.dataset.note);
      const step = Number(cell.dataset.step);
      state.synths[si].grid[ni][step] = !state.synths[si].grid[ni][step];
      cell.classList.toggle("on", state.synths[si].grid[ni][step]);
      ensureAudio();
      if (state.synths[si].grid[ni][step] && !playing) {
        playSynthNote(si, ni, ctx.currentTime);
      }
    });

    el.synths.addEventListener("input", (e) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLSelectElement)) return;
      if (input.dataset.param == null || input.dataset.synth == null) return;
      const si = Number(input.dataset.synth);
      const param = input.dataset.param;
      const synth = state.synths[si];
      if (param === "wave") {
        synth.wave = input.value;
        return;
      }
      synth[param] = Number(input.value);
      const readout = document.querySelector(`[data-readout="${param}-${si}"]`);
      if (!readout) return;
      const v = synth[param];
      if (param === "cutoff") readout.textContent = String(Math.round(v));
      else if (param === "resonance" || param === "fmIndex") readout.textContent = Number(v).toFixed(1);
      else readout.textContent = Number(v).toFixed(2);
    });

    el.synths.addEventListener("change", (e) => {
      const input = e.target;
      if (!(input instanceof HTMLSelectElement)) return;
      if (input.dataset.param === "wave") {
        state.synths[Number(input.dataset.synth)].wave = input.value;
      }
    });
  }

  function init() {
    fillSelects();
    updateTransposeLabel();
    renderKick();
    renderSynths();
    bind();
    document.querySelector('[data-readout="kickPitch"]').textContent = String(state.kickPitch);
    document.querySelector('[data-readout="kickDecay"]').textContent = state.kickDecay.toFixed(2);
    document.querySelector('[data-readout="kickLevel"]').textContent = state.kickLevel.toFixed(2);
  }

  init();
})();
