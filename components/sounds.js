"use client";

// Simple Web Audio API sound generator for UI interactions
class UISoundSystem {
  constructor() {
    this.context = null;
  }

  init() {
    if (this.context) return;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  playClick() {
    this.init();
    if (!this.context) return;
    
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.context.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.context.destination);
    
    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  playBoot() {
    this.init();
    if (!this.context) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(40, this.context.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.context.currentTime + 1);

    gain.gain.setValueAtTime(0, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 1);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 1);
  }

  playSelect() {
    this.init();
    if (!this.context) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.context.currentTime);
    
    gain.gain.setValueAtTime(0.03, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }

  startAmbientDrone() {
    this.init();
    if (!this.context || this.droneOsc1) return;

    // Create sub-bass drone
    this.droneOsc1 = this.context.createOscillator();
    this.droneOsc2 = this.context.createOscillator();
    this.droneGain = this.context.createGain();
    this.droneFilter = this.context.createBiquadFilter();

    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(50, this.context.currentTime);
    
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(50.5, this.context.currentTime); // Slight detune for phasing

    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(200, this.context.currentTime);

    this.droneGain.gain.setValueAtTime(0, this.context.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.015, this.context.currentTime + 4); // Slow fade in

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.context.destination);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Subtle breathing modulation
    const mod = () => {
      if (!this.droneGain) return;
      const now = this.context.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.01 + Math.random() * 0.01, now + 3);
      setTimeout(mod, 3000);
    };
    mod();
  }

  stopAmbientDrone() {
    if (this.droneGain) {
      this.droneGain.gain.linearRampToValueAtTime(0, this.context.currentTime + 2);
      setTimeout(() => {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
      }, 2000);
    }
  }
}

export const sounds = typeof window !== 'undefined' ? new UISoundSystem() : null;
