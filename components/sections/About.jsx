// "use client";
// import React, { useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function About() {
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const bodyRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Heading word-by-word reveal
//       if (headingRef.current) {
//         const words = headingRef.current.querySelectorAll('[data-word]');
//         gsap.fromTo(words,
//           { y: 80, opacity: 0, rotateX: -40 },
//           {
//             y: 0, opacity: 1, rotateX: 0,
//             duration: 1.4,
//             stagger: 0.08,
//             ease: 'power4.out',
//             scrollTrigger: {
//               trigger: headingRef.current,
//               start: 'top 85%',
//               toggleActions: 'play none none none',
//             },
//           }
//         );
//       }

//       // Body paragraphs slide in
//       if (bodyRef.current) {
//         const paras = bodyRef.current.querySelectorAll('[data-para]');
//         gsap.fromTo(paras,
//           { y: 50, opacity: 0 },
//           {
//             y: 0, opacity: 1,
//             duration: 1.2,
//             stagger: 0.2,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: bodyRef.current,
//               start: 'top 80%',
//               toggleActions: 'play none none none',
//             },
//           }
//         );
//       }

//       // Stats counter animation
//       if (statsRef.current) {
//         const statEls = statsRef.current.querySelectorAll('[data-stat]');
//         statEls.forEach((el) => {
//           const target = el.getAttribute('data-stat-value');
//           gsap.fromTo(el,
//             { y: 40, opacity: 0 },
//             {
//               y: 0, opacity: 1,
//               duration: 1,
//               ease: 'power3.out',
//               scrollTrigger: {
//                 trigger: el,
//                 start: 'top 90%',
//                 toggleActions: 'play none none none',
//               },
//             }
//           );
//         });

//         // Animate the stat lines
//         const lines = statsRef.current.querySelectorAll('[data-stat-line]');
//         gsap.fromTo(lines,
//           { scaleY: 0 },
//           {
//             scaleY: 1,
//             duration: 1,
//             stagger: 0.2,
//             ease: 'power4.inOut',
//             transformOrigin: 'top',
//             scrollTrigger: {
//               trigger: statsRef.current,
//               start: 'top 85%',
//               toggleActions: 'play none none none',
//             },
//           }
//         );
//       }

//       // Section label slide in
//       const label = sectionRef.current?.querySelector('[data-label]');
//       if (label) {
//         gsap.fromTo(label,
//           { x: -30, opacity: 0 },
//           {
//             x: 0, opacity: 1,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: label,
//               start: 'top 90%',
//               toggleActions: 'play none none none',
//             },
//           }
//         );
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const headingText = "We don't build features. We build foundations.";
//   const headingWords = headingText.split(' ');

//   return (
//     <section ref={sectionRef} id="about" data-section className="min-h-screen px-6 md:px-12 lg:px-20 py-32 relative flex items-center">
//       <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
//       <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/[0.02] skew-x-12 translate-x-1/4 pointer-events-none" />

//       <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
//         <div>
//           <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
//             <div className="w-8 h-[1px] bg-accent" />
//             <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">Protocol</span>
//           </div>
//           <h2
//             ref={headingRef}
//             className="text-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-extratight leading-[0.95] mb-4"
//             style={{ perspective: '800px' }}
//           >
//             {headingWords.map((word, i) => (
//               <span key={i} data-word className="inline-block mr-[0.3em] opacity-0 origin-bottom" style={{ willChange: 'transform' }}>
//                 {word === 'foundations.' ? (
//                   <span className="text-accent glow-text-subtle">{word}</span>
//                 ) : word}
//               </span>
//             ))}
//           </h2>
//         </div>

//         <div ref={bodyRef}>
//           <div className="space-y-8 text-base md:text-lg leading-relaxed font-sans">
//             <p data-para className="text-ink-muted opacity-0">
//               In an era defined by ephemeral design cycles, Recodey prioritizes the structural.
//               We operate as a technical strike-team for organizations that demand
//               uncompromising performance and architectural permanence.
//             </p>
//             <p data-para className="text-ink/30 text-sm opacity-0">
//               Our methodology rejects the superficial. We engineer systems that are not only
//               visually commanding but mathematically optimized for high-concurrency environments
//               and enterprise-grade scaling.
//             </p>

//             <div ref={statsRef} className="pt-8 grid grid-cols-2 gap-8">
//               <div data-stat className="opacity-0">
//                 <div data-stat-line className="w-[1px] h-12 bg-accent/30 mb-4 origin-top" />
//                 <div className="text-display text-5xl md:text-6xl font-bold tracking-extratight text-accent glow-text-subtle" data-stat-value="15">15+</div>
//                 <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Projects Deployed</div>
//               </div>
//               <div data-stat className="opacity-0">
//                 <div data-stat-line className="w-[1px] h-12 bg-accent/30 mb-4 origin-top" />
//                 <div className="text-display text-5xl md:text-6xl font-bold tracking-extratight text-accent glow-text-subtle" data-stat-value="99.9">99.9%</div>
//                 <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Uptime Guarantee</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
//     </section>
//   );
// }


"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── NEW: Marquee strip ───────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const items = ["Architectural Precision", "Systems Thinking", "Zero Compromise", "Industrial Craft", "Deep-State Engineering", "Cinematic Identity"];
  return (
    <div className="overflow-hidden border-y border-accent/10 py-3 mb-16 -mx-6 md:-mx-12 lg:-mx-20">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-mono text-[9px] uppercase tracking-[0.4em] text-ink-muted/40 flex items-center gap-12">
            {item}
            <span className="text-accent/30">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── NEW: Principle card ──────────────────────────────────────────────────────
const PrincipleCard = ({ num, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="group border border-border/30 hover:border-accent/30 p-6 transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="text-mono text-[8px] text-accent/40 tracking-[0.4em] mb-4">{num}</div>
      <div className="text-display text-lg font-bold tracking-tight mb-2">{title}</div>
      <div className="text-mono text-[10px] text-ink-muted/60 leading-relaxed">{desc}</div>
    </div>
  </motion.div>
);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1.4, stagger: 0.08, ease: 'power4.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('[data-para]');
        gsap.fromTo(paras,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.2, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: bodyRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll('[data-stat]');
        gsap.fromTo(statEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
        const lines = statsRef.current.querySelectorAll('[data-stat-line]');
        gsap.fromTo(lines,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 1, stagger: 0.2, ease: 'power4.inOut', transformOrigin: 'top',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "We don't build features. We build foundations.";
  const headingWords = headingText.split(' ');

  return (
    <section ref={sectionRef} id="about" data-section className="min-h-screen px-6 md:px-12 lg:px-20 py-32 relative flex flex-col justify-center">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      {/* Accent skew bg */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/[0.02] skew-x-12 translate-x-1/4 pointer-events-none" />
      {/* NEW: Bottom-left glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* ── Marquee ── */}
        <MarqueeStrip />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">

          {/* Left */}
          <div>
            <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">001 / Protocol</span>
            </div>
            <h2
              ref={headingRef}
              className="text-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-extratight leading-[0.95] mb-8"
              style={{ perspective: '800px' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} data-word className="inline-block mr-[0.3em] opacity-0 origin-bottom" style={{ willChange: 'transform' }}>
                  {word === 'foundations.' ? <span className="text-accent">{word}</span> : word}
                </span>
              ))}
            </h2>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-8 border-t border-border/20">
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-10 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-4xl md:text-5xl font-bold tracking-extratight text-accent">15+</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Projects Deployed</div>
              </div>
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-10 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-4xl md:text-5xl font-bold tracking-extratight text-accent">99.9%</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Uptime Guarantee</div>
              </div>
              {/* NEW: Two more stats */}
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-10 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-4xl md:text-5xl font-bold tracking-extratight text-accent">5+</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Years Active</div>
              </div>
              <div data-stat className="opacity-0">
                <div data-stat-line className="w-[1px] h-10 bg-accent/30 mb-4 origin-top" />
                <div className="text-display text-4xl md:text-5xl font-bold tracking-extratight text-accent">12+</div>
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] mt-2 text-ink-muted">Industries Served</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div ref={bodyRef}>
            <div className="space-y-6 text-base md:text-lg leading-relaxed font-sans mb-12">
              <p data-para className="text-ink-muted opacity-0">
                In an era defined by ephemeral design cycles, Recodey prioritizes the structural.
                We operate as a <span className="text-accent/80">technical strike-team</span> for organizations that demand
                uncompromising performance and architectural permanence.
              </p>
              <p data-para className="text-ink/50 text-sm opacity-0">
                Our methodology rejects the superficial. We engineer systems that are not only
                visually commanding but mathematically optimized for high-concurrency environments
                and enterprise-grade scaling.
              </p>
              {/* NEW: Third para */}
              <p data-para className="text-ink/40 text-sm opacity-0">
                Every line of code we ship is a contract with the future — built to outlast trends,
                outlast frameworks, and outlast the companies that commission them.
              </p>
            </div>

            {/* NEW: CTA link */}
            <motion.button
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.35em] text-accent border-b border-accent/30 pb-1 hover:border-accent transition-colors duration-300"
            >
              <span>See What We Build</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M0 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* ── NEW: Principles row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PrincipleCard num="P_01" title="Structural First" desc="Architecture before aesthetics. Systems before surfaces." delay={0.1} />
          <PrincipleCard num="P_02" title="Zero Compromise" desc="Performance, security, and scale are non-negotiable." delay={0.2} />
          <PrincipleCard num="P_03" title="Cinematic Craft" desc="Every interface deserves the attention of a film set." delay={0.3} />
        </div>
      </div>

      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
