// Web Audio API Retro Arcade Synthesizer
let audioCtx = null;
let isAudioEnabled = true;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const RetroAudio = {
  setEnabled: (enabled) => {
    isAudioEnabled = enabled;
    if (enabled) {
      initAudio();
    }
  },

  isEnabled: () => isAudioEnabled,

  playClick: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  },

  playCoin: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      
      // Coin is usually a double beep: first short note, second higher pitch longer note
      const playBeep = (freq, start, duration, vol) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(vol, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playBeep(987.77, now, 0.08, 0.05); // B5
      playBeep(1318.51, now + 0.08, 0.25, 0.05); // E6
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  },

  playLaser: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  },

  playExplode: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const duration = 0.4;
      const now = audioCtx.currentTime;

      // Synthesize noise or deep rumbles
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(40, now + duration);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      // Add a lowpass filter to make it sound muffled/boomy
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.linearRampToValueAtTime(50, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  },

  playVictory: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      const notes = [
        { f: 523.25, d: 0.1 }, // C5
        { f: 659.25, d: 0.1 }, // E5
        { f: 783.99, d: 0.1 }, // G5
        { f: 1046.50, d: 0.3 } // C6
      ];

      notes.forEach((note, index) => {
        const startTime = now + index * 0.1;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.005, startTime + note.d);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);
      });
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  },

  playDefeat: () => {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      const notes = [
        { f: 392.00, d: 0.12 }, // G4
        { f: 349.23, d: 0.12 }, // F4
        { f: 311.13, d: 0.12 }, // Eb4
        { f: 246.94, d: 0.4 }  // B3 (sad resolved tone)
      ];

      notes.forEach((note, index) => {
        const startTime = now + index * 0.13;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.005, startTime + note.d);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);
      });
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  }
};
