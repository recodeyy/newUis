"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Code, Monitor, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServiceRow = ({ num, title, icon: Icon, desc }) => (
  <div
    data-service
    className="group border-b border-border py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-all duration-500 hover:pl-6 relative overflow-hidden opacity-0"
    data-cursor-hover
  >
    <div className="absolute inset-0 bg-accent/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

    <div className="flex items-center gap-6 md:gap-10 relative z-10">
      <span className="text-mono text-[10px] text-accent/30 tracking-[0.3em] group-hover:text-accent transition-colors duration-500">{num}</span>
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-ink-muted group-hover:text-accent transition-colors duration-500 stroke-[1.5]" />
        <h3 className="text-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-extratight group-hover:text-accent transition-colors duration-500">{title}</h3>
      </div>
    </div>

    <div className="relative z-10 mt-4 md:mt-0 flex items-center gap-6">
      <span className="text-sm text-ink-muted opacity-0 group-hover:opacity-100 transition-all duration-500 max-w-[250px] text-right hidden lg:block translate-x-4 group-hover:translate-x-0">
        {desc}
      </span>
      <div className="w-8 h-8 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-accent transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-accent">
          <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  </div>
);

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }

      // Heading
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('[data-char]');
        gsap.fromTo(chars,
          { y: 100, opacity: 0, rotateX: -60 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.4, stagger: 0.025, ease: 'power4.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Service rows stagger
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll('[data-service]');
        gsap.fromTo(rows,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "SYSTEMS WE BUILD";

  return (
    <section ref={sectionRef} id="services" data-section className="min-h-screen px-6 md:px-12 lg:px-20 py-32 relative">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">002 / Capabilities</span>
          </div>
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-extratight"
            style={{ perspective: '800px' }}
          >
            {title.split("").map((char, i) => (
              <span
                key={i}
                data-char
                className={`inline-block origin-bottom opacity-0 ${char === ' ' ? 'mr-4' : ''} ${i >= 11 ? 'text-accent glow-text-subtle' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        <div ref={listRef} className="border-t border-border">
          <ServiceRow num="01" title="Digital Infrastructure" icon={Layers} desc="Scalable backends & cloud architecture" />
          <ServiceRow num="02" title="Product Engineering" icon={Code} desc="Full-stack application development" />
          <ServiceRow num="03" title="Interface Design" icon={Monitor} desc="Premium UI/UX experiences" />
          <ServiceRow num="04" title="AI Integration" icon={Zap} desc="LLM & automation pipelines" />
          <ServiceRow num="05" title="Interactive Motion" icon={Globe} desc="WebGL, 3D & animation systems" />
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
