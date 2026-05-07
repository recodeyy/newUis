"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "ALEX CHEN", role: "HEAD OF ENGINEERING", bio: "Former systems architect scaling infrastructure for high-growth tech platforms. Obsessed with elegant, unyielding code structures.", seed: "Felix", num: "001" },
  { name: "SARAH MILLER", role: "DESIGN DIRECTOR", bio: "Pioneering the intersection of cinematic motion and brutalist UI. She ensures every interface feels like a precision instrument.", seed: "Aneka", num: "002" },
  { name: "JAMES WILSON", role: "AI STRATEGY LEAD", bio: "Bridging the gap between bleeding-edge LLM capabilities and practical, high-ROI business applications.", seed: "Max", num: "003" },
];

export default function Story() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const quoteRef = useRef(null);
  const teamRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

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
        const words = headingRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(words,
          { y: 70, opacity: 0, rotateX: -30 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.4, stagger: 0.08, ease: 'power4.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Body paragraphs
      const paras = sectionRef.current?.querySelectorAll('[data-para]');
      if (paras) {
        gsap.fromTo(paras,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: paras[0], start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Quote reveal
      if (quoteRef.current) {
        const quoteLine = quoteRef.current.querySelector('[data-quote-line]');
        gsap.fromTo(quoteRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
        if (quoteLine) {
          gsap.fromTo(quoteLine, { scaleY: 0 }, {
            scaleY: 1, duration: 1, ease: 'power4.inOut', transformOrigin: 'top',
            scrollTrigger: { trigger: quoteLine, start: 'top 90%', toggleActions: 'play none none none' },
          });
        }
      }

      // Image clip-path reveal
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.8, ease: 'power4.inOut',
            scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Team cards stagger
      if (teamRef.current) {
        const cards = teamRef.current.querySelectorAll('[data-team-card]');
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: teamRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Team heading
      const teamHeading = sectionRef.current?.querySelector('[data-team-heading]');
      if (teamHeading) {
        gsap.fromTo(teamHeading,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: teamHeading, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = "BORN FROM FRUSTRATION.".split(' ');

  return (
    <section ref={sectionRef} id="story" data-section className="px-6 md:px-12 lg:px-20 py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-surface" />
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="absolute -right-64 top-0 h-full w-[800px] pointer-events-none opacity-[0.015]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-accent"><path d="M0 100 L50 0 L100 100 Z" /></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          <div className="lg:col-span-5">
            <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">003 / Our Origin</span>
            </div>
            <h2 ref={headingRef} className="text-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-extratight leading-[0.95] mb-10" style={{ perspective: '800px' }}>
              {headingWords.map((word, i) => (
                <span key={i} data-word className={`inline-block mr-[0.3em] opacity-0 origin-bottom ${word === 'FRUSTRATION.' ? 'text-accent glow-text-subtle' : ''}`}>
                  {word}
                </span>
              ))}
            </h2>
            <div className="space-y-6 text-base md:text-lg leading-relaxed font-sans">
              <p data-para className="text-ink-muted opacity-0">
                Recodey wasn't started in a boardroom. It was founded by engineers and designers tired of watching enterprises settle for bloated, generic software.
              </p>
              <p data-para className="text-ink/30 opacity-0">
                We saw a digital landscape filled with "good enough" solutions—platforms that looked the same, ran slowly, and broke under pressure.
              </p>
              <div ref={quoteRef} className="opacity-0 relative pl-6 py-2">
                <div data-quote-line className="absolute left-0 top-0 w-[2px] h-full bg-accent/40 origin-top" />
                <p className="text-ink text-xl md:text-2xl font-display italic glow-text-subtle">
                  "We don't build websites. We engineer digital authority."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div ref={imageRef} className="relative h-[500px] md:h-[600px] w-full overflow-hidden border border-border">
              <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-accent/30 z-20" />
              <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-accent/30 z-20" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-accent/30 z-20" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-accent/30 z-20" />

              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 w-full h-full">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 brightness-50" />
              </motion.div>

              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[1px] bg-accent/20 z-20"
              />

              <div className="absolute bottom-4 left-4 z-20 bg-bg/80 backdrop-blur-sm text-ink px-4 py-2 border border-border">
                <span className="text-mono text-[9px] uppercase tracking-[0.3em] text-accent">HQ // THE STUDIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 data-team-heading className="text-display text-3xl md:text-4xl font-bold tracking-extratight mb-16 opacity-0">
            CORE <span className="text-accent">OPERATORS</span>
          </h3>

          <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div key={i} data-team-card className="group border border-border p-6 md:p-8 relative overflow-hidden hover:border-accent/30 transition-colors duration-500 opacity-0" data-cursor-hover>
                <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-mono text-[9px] text-accent/40 tracking-[0.3em] mb-6">{member.num}</div>
                <div className="w-16 h-16 border border-border mb-6 relative overflow-hidden group-hover:border-accent transition-colors duration-500">
                  <Image
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}&backgroundColor=transparent`}
                    alt={member.name} fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 invert"
                  />
                </div>
                <h4 className="text-display text-xl md:text-2xl font-bold tracking-extratight mb-1 group-hover:text-accent transition-colors">{member.name}</h4>
                <div className="text-mono text-[9px] text-accent tracking-[0.2em] mb-6">{member.role}</div>
                <p className="text-ink-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
