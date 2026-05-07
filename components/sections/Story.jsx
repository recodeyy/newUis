"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
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

        {/* Secure Personnel Archive Terminal */}
        <div className="pt-20 border-t border-accent/10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <h3 data-team-heading className="text-display text-3xl md:text-5xl font-black tracking-extratight opacity-0">
              SECURE <span className="text-accent">PERSONNEL</span> ARCHIVE
            </h3>
            <div className="flex items-center gap-4 text-mono text-[9px] text-accent/40 tracking-[0.4em] uppercase font-bold">
              <div className="w-2 h-2 bg-accent animate-pulse" />
              CLEARANCE_LEVEL: TOP_SECRET
            </div>
          </div>

          <div ref={teamRef} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-accent/10 bg-black/40 backdrop-blur-md relative overflow-hidden">
            {/* Terminal Background Elements */}
            <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
              <div className="text-mono text-[50px] font-black text-accent absolute -bottom-10 -right-10 leading-none">CLASSIFIED</div>
            </div>

            {/* Operator Selection List */}
            <div className="lg:col-span-4 border-r border-accent/10">
              {TEAM.map((member, i) => (
                <div 
                  key={i} 
                  data-team-card
                  className="group relative border-b border-accent/10 p-8 cursor-pointer overflow-hidden opacity-0"
                  onMouseEnter={() => {
                    const dossier = document.getElementById(`dossier-${i}`);
                    document.querySelectorAll('[id^="dossier-"]').forEach(d => d.style.opacity = 0);
                    if (dossier) dossier.style.opacity = 1;
                  }}
                  data-cursor-snap
                >
                  <div className="absolute inset-0 bg-accent/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-mono text-[9px] text-accent/40 tracking-[0.3em] uppercase">RC_OPERATOR_{member.num}</span>
                      <span className="text-display text-2xl font-black text-ink group-hover:text-accent transition-colors tracking-tighter">
                        {member.name.split(' ')[0]}
                      </span>
                    </div>
                    <div className="w-10 h-10 border border-accent/20 flex items-center justify-center group-hover:border-accent transition-colors">
                      <ArrowRight className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-8 text-mono text-[7px] text-accent/20 tracking-widest uppercase">
                AWAITING_SELECTION...
              </div>
            </div>

            {/* Dossier Display Area */}
            <div className="lg:col-span-8 relative min-h-[500px] lg:min-h-[600px] bg-bg/20">
              {TEAM.map((member, i) => (
                <div 
                  key={i} 
                  id={`dossier-${i}`}
                  className={`relative lg:absolute inset-0 p-6 md:p-10 lg:p-16 transition-opacity duration-700 flex flex-col md:flex-row lg:flex-row gap-8 md:gap-12 ${i === 0 ? 'opacity-100' : 'opacity-0 lg:opacity-0 hidden lg:flex'}`}
                  style={{ display: i === 0 ? 'flex' : undefined }}
                >
                  {/* Operator Portrait */}
                  <div className="w-full md:w-1/3 lg:w-1/3">
                    <div className="aspect-square border border-accent/20 relative group overflow-hidden bg-accent/5">
                      <Image
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}&backgroundColor=transparent`}
                        alt={member.name} fill
                        className="object-cover opacity-80 contrast-125 brightness-75 invert grayscale transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
                      
                      {/* Scanning Line */}
                      <motion.div 
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-[2px] bg-accent/30 shadow-[0_0_10px_rgba(255,61,0,0.5)] z-20"
                      />
                      
                      <div className="absolute bottom-4 left-4 z-20 text-mono text-[8px] text-accent bg-bg/80 px-2 py-1 border border-accent/20">
                        OP_ARCHIVE_{member.num}
                      </div>
                    </div>
                  </div>

                  {/* Operator Bio / Metadata */}
                  <div className="flex-1">
                    <div className="mb-6 lg:mb-8">
                      <div className="text-mono text-[9px] md:text-[10px] text-accent tracking-[0.4em] uppercase mb-2">Subject_Profile</div>
                      <h4 className="text-display text-3xl md:text-5xl lg:text-5xl font-black text-ink mb-1 uppercase tracking-tighter leading-tight">
                        {member.name}
                      </h4>
                      <div className="text-mono text-[10px] md:text-[11px] text-accent/60 tracking-[0.2em] font-bold uppercase">
                        {member.role}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 border border-accent/10 bg-accent/[0.02]">
                        <div className="text-mono text-[8px] text-accent/40 uppercase tracking-[0.3em] mb-3">Operational_Dossier</div>
                        <p className="text-xs md:text-sm leading-relaxed text-ink-muted font-sans relative">
                          {member.bio}
                          <span className="inline-block ml-1 w-12 h-3 md:w-20 md:h-4 bg-ink/90 align-middle ml-2" />
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 lg:gap-8">
                        <div>
                          <div className="text-mono text-[7px] md:text-[8px] text-accent/30 uppercase tracking-[0.3em] mb-1">Status</div>
                          <div className="text-mono text-[9px] md:text-[10px] text-[#00FF00] font-bold">ACTIVE_DUTY</div>
                        </div>
                        <div>
                          <div className="text-mono text-[7px] md:text-[8px] text-accent/30 uppercase tracking-[0.3em] mb-1">Sector</div>
                          <div className="text-mono text-[9px] md:text-[10px] text-ink font-bold uppercase tracking-widest">{member.role.split(' ')[0]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
