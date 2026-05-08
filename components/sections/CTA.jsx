"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function CTA({ onOpenContact }) {
  const ref = useRef(null);
  const hRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = ref.current?.querySelector('[data-label]');
      if (label) gsap.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 90%' } });

      if (hRef.current) {
        const words = hRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(words, { y: 100, opacity: 0, rotateX: -40, scale: 0.9 }, {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 1.6, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: hRef.current, start: 'top 85%' },
        });
      }

      const actions = ref.current?.querySelector('[data-actions]');
      if (actions) gsap.fromTo(actions, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: actions, start: 'top 90%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const heading = ["ESTABLISH", "NEW DEFAULTS."];

  return (
    <section ref={ref} id="contact-section" data-section className="min-h-screen px-6 md:px-12 lg:px-20 py-32 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-bg-elevated" />
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/[0.02] skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div data-label className="inline-flex items-center gap-4 mb-12 opacity-0">
          <div className="w-8 h-[1px] bg-accent/50" />
          <span className="text-mono text-[9px] text-accent tracking-[0.5em] uppercase">Ready to Start?</span>
          <div className="w-8 h-[1px] bg-accent/50" />
        </div>

        <div ref={hRef} className="mb-16" style={{ perspective: '1000px' }}>
          {["TRANSFORM", "YOUR PRESENCE."].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <h2 data-word className="text-display font-bold tracking-extratight leading-[0.85] opacity-0 origin-bottom" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}>
                {i === 1 ? <span className="text-accent glow-text">{word}</span> : word}
              </h2>
            </div>
          ))}
        </div>

        <div data-actions className="flex flex-col md:flex-row gap-8 justify-center items-center opacity-0">
          <MagneticButton strength={0.35}>
            <motion.button
              onClick={onOpenContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Book a Discovery Call"
              className="relative group border border-accent text-accent px-12 py-5 text-mono text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-colors hover:text-white"
              data-cursor-hover
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Book A Call</span>
            </motion.button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <a href="mailto:recodeyy@gmail.com" aria-label="Email Recodey at recodeyy@gmail.com" className="text-display text-2xl md:text-3xl font-bold text-ink-muted hover:text-accent transition-colors duration-500 relative group" data-cursor-hover>
              recodeyy@gmail.com
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-accent/10 pointer-events-none" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-accent/10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-accent/10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-accent/10 pointer-events-none" />
    </section>
  );
}
