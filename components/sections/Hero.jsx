// 



"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
 
gsap.registerPlugin(ScrollTrigger);
 
const WebGLBackground = dynamic(() => import('../WebGLBackground'), {
  ssr: false,
  loading: () => null,
});
 
// ─── Particle Field ───────────────────────────────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 
    const ctx = canvas.getContext('2d');
    let animationId;
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 30 : 70;
    const CONNECTION_DIST = isMobile ? 90 : 130;
 
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
 
    const handleMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    if (!isMobile) window.addEventListener('mousemove', handleMouse);
 
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.35 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    }));
 
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const cellSize = CONNECTION_DIST;
      const grid = {};
 
      particles.forEach((p, i) => {
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        const key = `${cx},${cy}`;
        if (!grid[key]) grid[key] = [];
        grid[key].push(i);
      });
 
      particles.forEach((p, i) => {
        if (!isMobile) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.vx += (dx / dist) * force * 0.25;
            p.vy += (dy / dist) * force * 0.25;
          }
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        p.pulse += 0.018;
        const op = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 61, 0, ${op})`;
        ctx.fill();
 
        const cx = Math.floor(p.x / cellSize), cy = Math.floor(p.y / cellSize);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighbors = grid[`${cx + dx},${cy + dy}`];
            if (!neighbors) continue;
            for (const j of neighbors) {
              if (j <= i) continue;
              const p2 = particles[j];
              const cdx = p.x - p2.x, cdy = p.y - p2.y;
              const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
              if (cdist < CONNECTION_DIST) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 61, 0, ${0.05 * (1 - cdist / CONNECTION_DIST)})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
              }
            }
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
 
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (!isMobile) window.removeEventListener('mousemove', handleMouse);
    };
  }, []);
 
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.65 }} />;
};
 
// ─── Decrypt Text ─────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
 
const DecryptText = ({ text, delay = 0, trigger = true }) => {
  const [display, setDisplay] = useState(text);
 
  useEffect(() => {
    if (!trigger) return;
    let timeout, frame = 0;
    const maxFrames = 18;
    const run = () => {
      if (frame < maxFrames) {
        setDisplay(text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
        frame++;
        timeout = setTimeout(run, 38);
      } else {
        setDisplay(text);
      }
    };
    const start = setTimeout(run, delay);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, [text, delay, trigger]);
 
  return <span>{display}</span>;
};
 
// ─── Floating Code Fragments (improved — visible on tablet too) ───────────────
const CodeFragment = ({ text, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: [0, 0.1, 0.07, 0.13, 0.07], y: [16, 0, -8, 0] }}
    transition={{ delay, duration: 9, repeat: Infinity, ease: "easeInOut" }}
    className="absolute text-mono text-[7px] md:text-[8px] text-accent tracking-widest pointer-events-none whitespace-nowrap hidden md:block"
    style={{ left: x, top: y }}
  >
    {text}
  </motion.div>
);
 
// ─── NEW: Mobile ambient orbs (replaces hidden code fragments on mobile) ──────
const MobileOrbs = () => (
  <div className="absolute inset-0 pointer-events-none md:hidden overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-accent blur-[80px]"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full bg-accent blur-[100px]"
    />
  </div>
);
 
// ─── NEW: Animated counter stat ───────────────────────────────────────────────
const StatItem = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
 
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, value]);
 
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center md:items-start gap-1"
    >
      <div className="text-mono text-2xl md:text-3xl font-bold text-accent tabular-nums">
        {count}<span className="text-accent/60">+</span>
      </div>
      <div className="text-mono text-[8px] uppercase tracking-[0.3em] text-ink-muted">{label}</div>
    </motion.div>
  );
};
 
// ─── NEW: Glitch badge ────────────────────────────────────────────────────────
const GlitchBadge = ({ children }) => {
  const [glitch, setGlitch] = useState(false);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="relative inline-flex items-center gap-3 group">
      <motion.div
        animate={glitch ? { x: [-2, 2, -1, 0], opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 0.15 }}
        className="inline-flex items-center gap-3"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-mono text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-accent">
          {children}
        </span>
      </motion.div>
      {/* Side lines */}
      <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-accent/60 to-transparent" />
    </div>
  );
};
 
// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const statsRef = useRef(null);
  const [startScramble, setStartScramble] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => setStartScramble(true), 500);
    return () => clearTimeout(timer);
  }, []);
 
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
 
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, -120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
 
      if (labelRef.current)
        tl.fromTo(labelRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' }, 0.2);
 
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('[data-word]');
        words.forEach((word, wi) => {
          const chars = word.querySelectorAll('[data-char]');
          tl.fromTo(chars,
            { y: 100, opacity: 0, rotateX: -80 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.035, ease: 'power4.out' },
            0.4 + wi * 0.25
          );
        });
      }
 
      if (lineRef.current)
        tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power4.inOut' }, 1.4);
 
      if (subtitleRef.current)
        tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 1.6);
 
      if (ctaRef.current)
        tl.fromTo(ctaRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 2.0);
 
      if (statsRef.current)
        tl.fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 2.3);
 
      // Parallax
      gsap.to(titleRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
    }, heroRef);
 
    return () => ctx.revert();
  }, []);
 
  const words = ["ENGINEERING", "DAYLIGHT"];
 
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 bg-gradient-to-br from-bg via-bg-elevated to-bg origin-center"
        />
        {/* Primary glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[200px]" />
        {/* Secondary glow — offset for asymmetry */}
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-code-purple/[0.025] rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-accent/[0.02] rounded-full blur-[120px]" />
        <WebGLBackground />
        <ParticleField />
      </div>
 
      {/* ── Mobile ambient orbs ── */}
      <MobileOrbs />
 
      {/* ── Floating code fragments (md+) ── */}
      <CodeFragment text="const engine = new RecodeyCore();" x="7%" y="18%" delay={1} />
      <CodeFragment text="await deploy({ target: 'production' })" x="70%" y="14%" delay={2.5} />
      <CodeFragment text="// daylight_protocol.activate()" x="4%" y="72%" delay={1.8} />
      <CodeFragment text="interface.render({ mode: 'cinematic' })" x="66%" y="78%" delay={3.2} />
      <CodeFragment text="neural.calibrate(weights)" x="14%" y="48%" delay={2} />
      <CodeFragment text="export default Architecture;" x="75%" y="52%" delay={3.8} />
 
      {/* ── Corner HUD ── */}
      <motion.div style={{ opacity: textOpacity }} className="absolute bottom-16 left-5 md:bottom-12 md:left-16 z-10 pointer-events-none">
        <div className="flex flex-col gap-1 text-mono text-[7px] uppercase tracking-[0.3em] text-ink-muted">
          <div>REF_SEC: 04.0.1</div>
          <div>BOOT_LEVEL: <span className="text-accent">PRIME</span></div>
        </div>
      </motion.div>
 
      {/* ── NEW: Top-right system status ── */}
      <motion.div style={{ opacity: textOpacity }} className="absolute top-24 right-6 md:right-16 z-10 pointer-events-none hidden md:flex flex-col items-end gap-1">
        <div className="text-mono text-[7px] uppercase tracking-[0.3em] text-ink-muted/50">SYS_STATUS</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <div className="text-mono text-[7px] uppercase tracking-[0.3em] text-accent">ONLINE</div>
        </div>
      </motion.div>
 
      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 py-24 w-full max-w-6xl mx-auto"
      >
        {/* Label */}
        <div ref={labelRef} className="mb-10 opacity-0">
          <GlitchBadge>Architectural Tech Studio</GlitchBadge>
        </div>
 
        {/* Title */}
        <h1 className="sr-only">Engineering Daylight</h1>
        <div ref={titleRef} className="mb-6 w-full" style={{ perspective: '1000px' }} aria-hidden="true">
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden" data-word>
              <div
                className="font-bold tracking-[-0.04em] leading-[0.88] flex flex-wrap justify-center"
                style={{ fontSize: 'clamp(3rem, 13vw, 10.5rem)' }}
              >
                {word.split('').map((char, ci) => (
                  <span key={ci} data-char className="inline-block">
                    {startScramble
                      ? <DecryptText text={char} delay={wi * 350 + ci * 45 + 700} trigger={startScramble} />
                      : char}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
 
        {/* Accent line — wider + glow */}
        <div
          ref={lineRef}
          className="w-24 md:w-40 h-[2px] bg-accent origin-left mb-10 scale-x-0"
          style={{ boxShadow: '0 0 24px rgba(255, 61, 0, 0.5), 0 0 60px rgba(255, 61, 0, 0.15)' }}
        />
 
        {/* Subtitle — improved copy */}
        <p ref={subtitleRef} className="max-w-xl text-ink-muted text-sm md:text-base lg:text-lg leading-relaxed text-center font-sans mb-10 opacity-0 px-2">
          We forge <span className="text-accent/80">deep-state software</span> and cinematic digital identity
          for companies building the next industrial era.
        </p>
 
        {/* CTA row */}
        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-16 sm:mb-20">
          {/* Primary CTA */}
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View Our Work"
            data-cursor-hover
            className="group relative flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.3em] bg-accent text-white px-7 py-3.5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,61,0,0.4)]"
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-500 ease-out" />
            <span className="relative">View Our Work</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="relative" aria-hidden="true">
              <path d="M0 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
 
          {/* Secondary CTA */}
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Learn about Recodey"
            data-cursor-hover
            className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted border border-ink-muted/20 px-7 py-3.5 hover:border-accent/50 hover:text-accent transition-all duration-300"
          >
            <span>Our Story</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden="true">
                <path d="M5 0L5 18M5 18L1 14M5 18L9 14" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.div>
          </button>
        </div>
 
        {/* ── NEW: Stats row ── */}
        <div ref={statsRef} className="opacity-0 w-full max-w-lg">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-accent/10" />
            <div className="text-mono text-[7px] uppercase tracking-[0.4em] text-ink-muted/40">metrics</div>
            <div className="flex-1 h-[1px] bg-accent/10" />
          </div>
 
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <StatItem value="48" label="Projects Built" delay={2.4} />
            <StatItem value="12" label="Industries" delay={2.6} />
            <StatItem value="99" label="Uptime %" delay={2.8} />
          </div>
        </div>
      </motion.div>
 
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left z-20"
        style={{ scaleX: scrollYProgress, boxShadow: '0 0 12px rgba(255,61,0,0.5)', width: '100%' }}
      />
 
      {/* ── Corner brackets ── */}
      <div className="absolute top-5 left-5 w-8 h-8 md:w-10 md:h-10 border-l border-t border-accent/15 pointer-events-none" />
      <div className="absolute top-5 right-5 w-8 h-8 md:w-10 md:h-10 border-r border-t border-accent/15 pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-8 h-8 md:w-10 md:h-10 border-l border-b border-accent/15 pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-8 h-8 md:w-10 md:h-10 border-r border-b border-accent/15 pointer-events-none" />
    </section>
  );
}
