"use client";
import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load WebGL to avoid SSR issues
const WebGLBackground = dynamic(() => import('../WebGLBackground'), {
  ssr: false,
  loading: () => null,
});

// Particle canvas background
const ParticleField = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip particles entirely for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Adaptive particle count based on device
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 40 : 80;
    const CONNECTION_DIST = isMobile ? 100 : 140;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) window.addEventListener('mousemove', handleMouse);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      // Spatial grid for O(n) connection lookups
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
        // Mouse repulsion (desktop only)
        if (!isMobile) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.pulse += 0.02;
        const pulsedOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 61, 0, ${pulsedOpacity})`;
        ctx.fill();

        // Connections via spatial grid (check only neighboring cells)
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighbors = grid[`${cx + dx},${cy + dy}`];
            if (!neighbors) continue;
            for (const j of neighbors) {
              if (j <= i) continue;
              const p2 = particles[j];
              const cdx = p.x - p2.x;
              const cdy = p.y - p2.y;
              const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
              if (cdist < CONNECTION_DIST) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 61, 0, ${0.06 * (1 - cdist / CONNECTION_DIST)})`;
                ctx.lineWidth = 0.5;
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

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.7 }} />
  );
};

// Floating code fragments
const CodeFragment = ({ text, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: [0, 0.12, 0.08, 0.15, 0.08], y: [20, 0, -10, 0] }}
    transition={{ delay, duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute text-mono text-[8px] text-accent tracking-widest pointer-events-none whitespace-nowrap hidden lg:block"
    style={{ left: x, top: y }}
  >
    {text}
  </motion.div>
);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const DecryptText = ({ text, delay = 0, trigger = true }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!trigger) return;
    let timeout;
    let frame = 0;
    const maxFrames = 15;

    const animate = () => {
      if (frame < maxFrames) {
        let random = "";
        for (let i = 0; i < text.length; i++) {
          random += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplayText(random);
        frame++;
        timeout = setTimeout(animate, 40);
      } else {
        setDisplayText(text);
      }
    };

    const startTimeout = setTimeout(animate, delay);
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay, trigger]);

  return <span>{displayText || text}</span>;
};

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const [startScramble, setStartScramble] = useState(false);

  useEffect(() => {
    // Delay scramble to align with GSAP entrance
    const timer = setTimeout(() => setStartScramble(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

  // GSAP-powered entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label
      if (labelRef.current) {
        tl.fromTo(labelRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
          0.2
        );
      }

      // Title — split each word's letters
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('[data-word]');
        words.forEach((word, wi) => {
          const chars = word.querySelectorAll('[data-char]');
          tl.fromTo(chars,
            { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              duration: 1.6,
              stagger: 0.04,
              ease: 'power4.out',
            },
            0.5 + wi * 0.3
          );
        });
      }

      // Accent line
      if (lineRef.current) {
        tl.fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: 'power4.inOut' },
          1.6
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' },
          1.8
        );
      }

      // CTA
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
          2.2
        );
      }

      // Parallax scroll for the whole hero content
      gsap.to(titleRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
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
      {/* Background layers */}
      <div className="absolute inset-0">
        <motion.div
          style={{ scale: bgScale, rotate: bgRotate }}
          className="absolute inset-0 bg-gradient-to-br from-bg via-bg-elevated to-bg origin-center"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/[0.03] rounded-full blur-[250px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-code-purple/[0.02] rounded-full blur-[180px]" />
        {/* WebGL shader terrain */}
        <WebGLBackground />
        {/* Particles as overlay on top of WebGL */}
        <ParticleField />
      </div>

      {/* Floating code fragments */}
      <CodeFragment text="const engine = new RecodeyCore();" x="8%" y="20%" delay={1} />
      <CodeFragment text="await deploy({ target: 'production' })" x="72%" y="15%" delay={2.5} />
      <CodeFragment text="// daylight_protocol.activate()" x="5%" y="75%" delay={1.8} />
      <CodeFragment text="interface.render({ mode: 'cinematic' })" x="68%" y="80%" delay={3.2} />
      <CodeFragment text="neural.calibrate(weights)" x="15%" y="50%" delay={2} />
      <CodeFragment text="export default Architecture;" x="78%" y="55%" delay={3.8} />

      {/* HUD corners — Repositioned to avoid Logo overlap */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-20 left-6 right-6 md:bottom-12 md:left-20 flex flex-row md:flex-col justify-between md:justify-start gap-4 text-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-ink-muted z-10"
      >
        <div>REF_SEC: 04.0.1</div>
        <div className="text-right md:text-left">BOOT_LEVEL: <span className="text-accent">PRIME</span></div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20"
      >
        {/* Label */}
        <div ref={labelRef} className="mb-12 opacity-0">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-[1px] bg-accent/50" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent">
              Architectural Tech Studio
            </span>
            <div className="w-12 h-[1px] bg-accent/50" />
          </div>
        </div>

        {/* Title */}
        <div ref={titleRef} className="mb-8" style={{ perspective: '1000px' }}>
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden" data-word>
              <h1
                className="text-display font-bold tracking-extratight leading-[0.9]"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
              >
                <DecryptText text={word} delay={wi * 400 + 800} trigger={startScramble} />
              </h1>
            </div>
          ))}
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-32 h-[2px] bg-accent origin-center mb-12 scale-x-0"
          style={{ boxShadow: '0 0 20px rgba(255, 61, 0, 0.4)' }}
        />

        {/* Subtitle */}
        <p ref={subtitleRef} className="max-w-lg text-ink-muted text-base md:text-lg leading-relaxed text-center font-sans mb-16 opacity-0">
          Forging deep-state software and cinematic identity
          for the next industrial era.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted hover:text-accent transition-colors"
            data-cursor-hover
          >
            <span>Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" className="text-accent">
                <path d="M6 0L6 22M6 22L1 17M6 22L11 17" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Scroll progress line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left z-20"
        style={{
          scaleX: scrollYProgress,
          boxShadow: '0 0 10px rgba(255, 61, 0, 0.5)',
          width: '100%',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-accent/10 pointer-events-none" />
      <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-accent/10 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-accent/10 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-accent/10 pointer-events-none" />
    </section>
  );
}
