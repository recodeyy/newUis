"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

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

const PROJECTS = [
  { id: 1, title: "NEXUS PLATFORM", category: "WEB APP", year: "2024", desc: "Enterprise SaaS dashboard with real-time analytics, built on Next.js and serverless architecture.", color: "#FF3D00", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" },
  { id: 2, title: "VOID IDENTITY", category: "BRANDING", year: "2024", desc: "Complete visual identity system for a cybersecurity startup — logo, type system, motion guidelines.", color: "#A78BFA", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
  { id: 3, title: "NEURAL SYNC", category: "AI / ML", year: "2024", desc: "AI-powered content pipeline with custom LLM fine-tuning and real-time inference APIs.", color: "#00FF88", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
  { id: 4, title: "CARBON UI", category: "DESIGN SYSTEM", year: "2023", desc: "Production-grade component library with 120+ primitives, dark mode, and motion tokens.", color: "#FF3D00", img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80" },
  { id: 5, title: "DRIFT ENGINE", category: "INTERACTIVE", year: "2023", desc: "WebGL-powered product configurator with real-time 3D rendering and physics simulation.", color: "#A78BFA", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
  { id: 6, title: "PRISM ANALYTICS", category: "DASHBOARD", year: "2023", desc: "Real-time data visualization platform processing 10M+ events/day with sub-100ms rendering.", color: "#00FF88", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
];

function Lightbox({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[8000] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative max-w-5xl w-full bg-bg-elevated border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 border border-border flex items-center justify-center hover:border-accent transition-colors" data-cursor-hover>
          <X className="w-4 h-4 text-ink-muted hover:text-accent" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.img})`, filter: 'grayscale(60%) contrast(1.2) brightness(0.5)' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-elevated/50" />
            <div className="absolute top-4 left-4 w-5 h-5 border-l border-t" style={{ borderColor: project.color + '40' }} />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b" style={{ borderColor: project.color + '40' }} />
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8 text-mono text-[9px] tracking-[0.3em]">
                <span style={{ color: project.color }}>{project.category}</span>
                <span className="text-ink-muted">{project.year}</span>
              </div>
              <h2 className="text-display text-4xl md:text-5xl font-bold tracking-extratight leading-[0.95] mb-6">{project.title}</h2>
              <p className="text-ink-muted text-base leading-relaxed">{project.desc}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-mono text-[8px] text-ink-muted tracking-[0.3em]">PROJECT_{String(project.id).padStart(3, '0')}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeProject, setActiveProject] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', ...new Set(PROJECTS.map(p => p.category))];
  const filtered = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('[data-char]');
        gsap.fromTo(chars,
          { y: 100, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.05,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              onEnter: () => setIsRevealed(true)
            },
          }
        );
      }

      // Label
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) gsap.fromTo(label, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });

      // Filters
      const filters = sectionRef.current?.querySelector('[data-filters]');
      if (filters) gsap.fromTo(filters, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 });

      // Grid items
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('[data-item]');
        gsap.fromTo(items,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none fixed" />

      {/* Nav */}
      <header className="fixed top-0 left-0 w-full z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-mono text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block text-ink-muted group-hover:text-accent transition-colors">Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 border border-accent/50 flex items-center justify-center">
              <span className="text-accent text-mono text-[9px] font-bold">R</span>
            </div>
            <span className="text-display text-lg font-bold tracking-tight text-ink hidden md:block">RECODEY</span>
          </Link>
          <div className="text-mono text-[8px] uppercase tracking-[0.4em] text-ink-muted hidden md:block">GALLERY // {new Date().getFullYear()}</div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-36 px-6 md:px-12 lg:px-20 pb-32 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">Visual Archive</span>
          </div>
          <h1 ref={headingRef} className="text-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-extratight leading-none mb-8" style={{ perspective: '800px' }}>
            <DecryptText text="GALLERY" delay={400} trigger={isRevealed} />
          </h1>
          <p className="text-ink-muted text-lg max-w-xl">Selected work from our portfolio — engineered products, cinematic identities, and intelligent systems.</p>
        </div>

        {/* Category filters */}
        <div data-filters className="flex flex-wrap gap-3 mb-16 opacity-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 border text-mono text-[9px] uppercase tracking-[0.3em] transition-all duration-300 ${filter === cat ? 'border-accent text-accent bg-accent/5' : 'border-border text-ink-muted hover:border-accent/30 hover:text-ink'}`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                data-item
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer relative overflow-hidden border border-border hover:border-accent/30 transition-colors duration-500"
                data-cursor-hover
              >
                {/* Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.img})`, filter: 'grayscale(70%) contrast(1.2) brightness(0.4)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-accent/0 group-hover:border-accent/40 transition-all duration-500" />

                  {/* Number */}
                  <div className="absolute top-4 right-4 text-mono text-[8px] tracking-[0.3em] text-ink-muted">
                    {String(project.id).padStart(3, '0')}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-mono text-[8px] tracking-[0.3em]">
                    <span style={{ color: project.color }}>{project.category}</span>
                    <span className="text-ink-muted">{project.year}</span>
                  </div>
                  <h3 className="text-display text-xl font-bold tracking-extratight group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <p className="text-ink-muted text-sm mb-8">Interested in working together?</p>
          <MagneticButton strength={0.3}>
            <Link href="/" className="relative group inline-block border border-accent text-accent px-10 py-4 text-mono text-[10px] tracking-[0.3em] uppercase overflow-hidden hover:text-white transition-colors" data-cursor-hover>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </MagneticButton>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {activeProject && <Lightbox project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

      {/* Corner brackets */}
      <div className="fixed top-24 left-4 w-6 h-6 border-l border-t border-accent/10 pointer-events-none hidden lg:block" />
      <div className="fixed top-24 right-4 w-6 h-6 border-r border-t border-accent/10 pointer-events-none hidden lg:block" />
    </div>
  );
}
