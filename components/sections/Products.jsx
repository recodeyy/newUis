"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Building2, Activity, GraduationCap, Music, TestTube, Brain, Cpu } from 'lucide-react';
import MagneticButton from '../MagneticButton';
import { useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const DecryptText = ({ text, delay = 0, trigger = true }) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    if (!trigger) return;
    let timeout;
    let frame = 0;
    const animate = () => {
      if (frame < 15) {
        let random = "";
        for (let i = 0; i < text.length; i++) random += CHARS[Math.floor(Math.random() * CHARS.length)];
        setDisplayText(random);
        frame++;
        timeout = setTimeout(animate, 40);
      } else setDisplayText(text);
    };
    const startTimeout = setTimeout(animate, delay);
    return () => { clearTimeout(startTimeout); clearTimeout(timeout); };
  }, [text, delay, trigger]);
  return <span>{displayText || text}</span>;
};

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { num: "SYS_01", icon: Building2, title: "Sero", desc: "A comprehensive society management system featuring an AI-integrated backend, finance modules, and a high-performance cross-platform mobile application.", tag: "SOCIETY OS", color: "from-accent/10 to-transparent" },
  { num: "SYS_02", icon: Activity, title: "Zcare", desc: "Next-generation healthcare platform designed to streamline clinic operations, patient care tracking, and secure medical data management.", tag: "HEALTHCARE", color: "from-code-purple/10 to-transparent" },
  { num: "SYS_03", icon: GraduationCap, title: "School OS", desc: "An advanced school management system integrating a production-grade AI module for administrative and educational workflows with robust role-based access.", tag: "EDUCATION", color: "from-terminal-green/10 to-transparent" },
  { num: "SYS_04", icon: Music, title: "AI Music", desc: "A sophisticated AI music generation pipeline utilizing RVC and Faster-Whisper, optimized for resource-efficient processing.", tag: "AUDIO AI", color: "from-accent/10 to-transparent" },
  { num: "SYS_05", icon: TestTube, title: "AI Testing", desc: "Automated validation and testing infrastructure powered by AI to ensure architectural stability and continuous integration.", tag: "DEVTOOLS", color: "from-code-purple/10 to-transparent" },
  { num: "SYS_06", icon: Brain, title: "CRAG", desc: "Cognitive Retrieval-Augmented Generation systems engineered for deep-state knowledge retrieval and intelligent context synthesis.", tag: "INTELLIGENCE", color: "from-terminal-green/10 to-transparent" },
  { num: "SYS_07", icon: Cpu, title: "NeuroStack", desc: "Also known as PocketEngineer. An advanced architectural toolkit and deep-state software assistant tailored for complex engineering pipelines.", tag: "ENGINEERING", color: "from-accent/10 to-transparent" },
];

const ProductCard = ({ title, desc, tag, icon: Icon, num, color }) => (
  <div
    data-card
    className="group relative bg-bg-elevated border border-border flex-shrink-0 w-[380px] md:w-[440px] h-[480px] cursor-pointer hover:border-accent/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
    data-cursor-hover
  >
    {/* Gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-5 h-5 border-l border-t border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
    <div className="absolute top-0 right-0 w-5 h-5 border-r border-t border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
    <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
    <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b border-accent/0 group-hover:border-accent/40 transition-all duration-500" />

    <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <span className="text-mono text-[9px] text-ink-muted tracking-[0.3em]">{num}</span>
        <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
          <Icon className="w-5 h-5 stroke-[1.5] text-ink-muted group-hover:text-accent transition-colors duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-display text-3xl md:text-4xl font-bold tracking-extratight mb-5 group-hover:text-accent transition-colors duration-500 leading-[1]">{title}</h3>
        <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border group-hover:border-accent/20 transition-colors">
        <span className="text-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold">{tag}</span>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-ink-muted group-hover:text-accent transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  </div>
);

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label slide in
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 90%' },
        });
      }

      // Heading chars
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('[data-char]');
        gsap.fromTo(chars,
          { y: 100, opacity: 0, rotateX: -60 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.4, stagger: 0.03, ease: 'power4.out',
            scrollTrigger: { 
              trigger: headingRef.current, 
              start: 'top 85%',
              onEnter: () => setIsRevealed(true)
            },
          }
        );
      }

      // Desc
      const desc = sectionRef.current?.querySelector('[data-desc]');
      if (desc) {
        gsap.fromTo(desc, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: desc, start: 'top 90%' },
        });
      }

      // Horizontal scroll — pin section and scrub cards
      if (trackRef.current && scrollContainerRef.current) {
        const isMobile = window.innerWidth < 1024;
        const cards = trackRef.current.querySelectorAll('[data-card]');
        const totalWidth = trackRef.current.scrollWidth - scrollContainerRef.current.offsetWidth;

        // Fade cards in on entry
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: scrollContainerRef.current, start: 'top 80%' },
          }
        );

        if (!isMobile) {
          // Desktop Horizontal scroll with Pinning
          gsap.to(trackRef.current, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: 'top 15%',
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        } else {
          // Mobile natural scroll (no pinning)
          trackRef.current.style.overflowX = 'auto';
          trackRef.current.style.scrollSnapType = 'x mandatory';
          cards.forEach(card => card.style.scrollSnapAlign = 'start');
        }
      }

      // Progress bar
      const progressBar = sectionRef.current?.querySelector('[data-progress]');
      if (progressBar && scrollContainerRef.current) {
        gsap.fromTo(progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: 'top 15%',
              end: () => `+=${trackRef.current?.scrollWidth - scrollContainerRef.current?.offsetWidth}`,
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "THE FORGE";

  return (
    <section ref={sectionRef} id="projects" data-section className="relative">
      <div className="absolute inset-0 bg-bg-surface" />
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 pt-32 pb-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">001 / What We Deliver</span>
              </div>
              <h2
                ref={headingRef}
                className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-extratight leading-none"
                style={{ perspective: '800px' }}
              >
                <DecryptText text="THE FORGE" delay={200} trigger={isRevealed} />
              </h2>
            </div>
            <div data-desc className="opacity-0">
              <p className="text-mono text-[10px] uppercase tracking-[0.2em] max-w-[280px] leading-loose text-ink-muted md:text-right">
                End-to-end digital solutions built with precision. Scroll horizontally →
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div ref={scrollContainerRef} className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6 pl-6 md:pl-12 lg:pl-20 pr-20 py-8">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="px-6 md:px-12 lg:px-20 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="h-[1px] bg-border relative">
              <div data-progress className="absolute inset-y-0 left-0 w-full bg-accent origin-left" style={{ transformOrigin: 'left' }} />
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-mono text-[8px] text-ink-muted tracking-[0.3em]">001</span>
              <span className="text-mono text-[8px] text-ink-muted tracking-[0.3em]">007</span>
            </div>
          </div>
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
