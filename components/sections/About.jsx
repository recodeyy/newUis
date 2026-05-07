"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.4,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Body paragraphs slide in
      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('[data-para]');
        gsap.fromTo(paras,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll('[data-stat]');
        statEls.forEach((el) => {
          const target = el.getAttribute('data-stat-value');
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Animate the stat lines
        const lines = statsRef.current.querySelectorAll('[data-stat-line]');
        gsap.fromTo(lines,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.inOut',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Section label slide in
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "We don't build features. We build foundations.";
  const headingWords = headingText.split(' ');

  return (
    <section ref={sectionRef} id="about" data-section className="min-h-screen px-6 md:px-12 lg:px-20 py-32 relative flex items-center">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/[0.02] skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">Protocol</span>
          </div>
          <h2
            ref={headingRef}
            className="text-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-extratight leading-[0.95] mb-4"
            style={{ perspective: '800px' }}
          >
            {headingWords.map((word, i) => (
              <span key={i} data-word className="inline-block mr-[0.3em] opacity-0 origin-bottom" style={{ willChange: 'transform' }}>
                {word === 'foundations.' ? (
                  <span className="text-accent glow-text-subtle">{word}</span>
                ) : word}
              </span>
            ))}
          </h2>
        </div>

        <div ref={bodyRef}>
          <div className="space-y-8 text-base md:text-lg leading-relaxed font-sans">
            <p data-para className="text-ink-muted opacity-0">
              In an era defined by ephemeral design cycles, Recodey prioritizes the structural.
              We operate as a technical strike-team for organizations that demand
              uncompromising performance and architectural permanence.
            </p>
            <p data-para className="text-ink/30 text-sm opacity-0">
              Our methodology rejects the superficial. We engineer systems that are not only
              visually commanding but mathematically optimized for high-concurrency environments
              and enterprise-grade scaling.
            </p>

            <div ref={statsRef} className="pt-8 grid grid-cols-2 gap-8">
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-12 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-5xl md:text-6xl font-bold tracking-extratight text-accent glow-text-subtle" data-stat-value="15">15+</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Projects Deployed</div>
              </div>
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-12 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-5xl md:text-6xl font-bold tracking-extratight text-accent glow-text-subtle" data-stat-value="99.9">99.9%</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
