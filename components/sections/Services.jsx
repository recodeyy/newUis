"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Code, Monitor, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Service data with added tags ────────────────────────────────────────────
const SERVICES = [
  {
    num: "01", title: "Digital Infrastructure", icon: Layers,
    desc: "Scalable backends & cloud architecture",
    tags: ["AWS", "Kubernetes", "PostgreSQL"],
  },
  {
    num: "02", title: "Product Engineering", icon: Code,
    desc: "Full-stack application development",
    tags: ["Next.js", "Node.js", "TypeScript"],
  },
  {
    num: "03", title: "Interface Design", icon: Monitor,
    desc: "Premium UI/UX experiences",
    tags: ["Figma", "Framer", "GSAP"],
  },
  {
    num: "04", title: "AI Integration", icon: Zap,
    desc: "LLM & automation pipelines",
    tags: ["GPT-4", "LangChain", "Vector DB"],
  },
  {
    num: "05", title: "Interactive Motion", icon: Globe,
    desc: "WebGL, 3D & animation systems",
    tags: ["Three.js", "WebGL", "GLSL"],
  },
];

// ─── Service Row ──────────────────────────────────────────────────────────────
const ServiceRow = ({ num, title, icon: Icon, desc, tags, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      data-service
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-b border-border/40 py-7 md:py-9 flex flex-col md:flex-row md:items-center justify-between cursor-pointer relative overflow-hidden opacity-0"
      data-cursor-hover
    >
      {/* Hover bg sweep */}
      <div className="absolute inset-0 bg-accent/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-600 ease-out" />
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 w-[2px] h-full bg-accent origin-top"
      />

      {/* Left side */}
      <div className="flex items-center gap-5 md:gap-10 relative z-10 pl-4 md:pl-6">
        <span className="text-mono text-[9px] text-accent/30 tracking-[0.3em] group-hover:text-accent transition-colors duration-500 w-6">{num}</span>
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 border border-border/30 group-hover:border-accent/40 flex items-center justify-center transition-colors duration-500">
            <Icon className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors duration-500 stroke-[1.5]" />
          </div>
          <h3 className="text-display text-xl md:text-3xl lg:text-4xl font-bold tracking-extratight group-hover:text-accent transition-colors duration-500">
            {title}
          </h3>
        </div>
      </div>

      {/* Right side */}
      <div className="relative z-10 mt-4 md:mt-0 pl-[4.5rem] md:pl-0 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        {/* NEW: Tech tags */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="hidden md:flex items-center gap-2"
            >
              {tags.map((tag) => (
                <span key={tag} className="text-mono text-[8px] uppercase tracking-[0.2em] text-accent/60 border border-accent/20 px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desc — always visible on mobile */}
        <span className="text-mono text-[10px] text-ink-muted md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:max-w-[220px] md:text-right md:translate-x-4 md:group-hover:translate-x-0">
          {desc}
        </span>

        {/* Arrow box */}
        <div className="w-8 h-8 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-accent transition-all duration-500 translate-x-4 group-hover:translate-x-0 hidden md:flex">
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-accent">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }

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
      {/* NEW: Top-right glow */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-accent/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
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
                  key={i} data-char
                  className={`inline-block origin-bottom opacity-0 ${char === ' ' ? 'mr-4' : ''} ${i >= 11 ? 'text-accent' : ''}`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>

          {/* NEW: Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-ink-muted/60 text-sm max-w-xs text-right hidden md:block font-sans"
          >
            Five disciplines. One unified approach.<br />
            Built to outlast every trend.
          </motion.p>
        </div>

        {/* Service list */}
        <div ref={listRef} className="border-t border-border/40">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} {...s} index={i} />
          ))}
        </div>

        {/* NEW: Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-border/20"
        >
          <div className="text-mono text-[9px] uppercase tracking-[0.35em] text-ink-muted/40">
            All services include dedicated support & documentation
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.3em] text-accent hover:gap-5 transition-all duration-300"
            data-cursor-hover
          >
            <span>Start a Project</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </motion.div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}