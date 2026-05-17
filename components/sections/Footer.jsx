

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SOCIALS = [
  // { label: "Instagram", href: "https://instagram.com/recodeyy", handle: "@recodeyy" },
  // { label: "X / Twitter", href: "https://x.com/recodeyy", handle: "@recodeyy" },
  { label: "LinkedIn", href: "https://linkedin.com/company/recodey", handle: "recodey" },
  { label: "Github", href: "https://github.com/recodeyy", handle: "recodeyy" },
];

const NAV_LINKS = ['Hero', 'About', 'Services', 'Products', 'Story', 'Insights'];

// ─── Newsletter input ─────────────────────────────────────────────────────────
const NewsletterInput = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-6">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-mono text-[9px] uppercase tracking-[0.3em] text-accent"
        >
          ✦ Transmission received
        </motion.div>
      ) : (
        <div className="flex items-stretch border border-border/30 hover:border-accent/30 transition-colors duration-300 max-w-xs">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="your@email.com"
            className="flex-1 bg-transparent text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted placeholder:text-ink-muted/30 px-4 py-3 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="px-4 border-l border-border/30 text-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20 pt-24 pb-10 relative overflow-hidden border-t border-border/30">

      {/* Background logo watermark */}
      <div className="absolute bottom-[-8%] right-[-3%] text-[18vw] font-bold text-accent/[0.025] pointer-events-none select-none tracking-tighter leading-none z-0">
        RECODEY
      </div>

      {/* Top accent line glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── NEW: Big CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 pb-20 border-b border-border/20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent/60 mb-4">Ready to build?</div>
            <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-extratight leading-[0.9]">
              Let's engineer<br />
              <span className="text-accent">something real.</span>
            </h2>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex-shrink-0 flex items-center gap-4 text-mono text-[10px] uppercase tracking-[0.3em] bg-accent text-white px-8 py-4 relative overflow-hidden hover:shadow-[0_0_30px_rgba(255,61,0,0.35)] transition-shadow duration-300"
            data-cursor-hover
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-500 ease-out" />
            <span className="relative">Start a Project</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="relative">
              <path d="M0 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-4">
            <div className="text-display text-2xl font-bold mb-5 tracking-extratight">
              RECODEY<span className="text-accent">.</span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed max-w-xs mb-6 font-sans">
              Forging the next industrial era through architectural tech and cinematic digital experiences.
            </p>
            {/* Status */}
            <div className="inline-flex items-center gap-3 border border-border/20 px-3 py-2 mb-6">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-terminal-green" />
              </div>
              <span className="text-mono text-[8px] uppercase tracking-[0.3em] text-terminal-green/70">All Systems Operational</span>
            </div>

            {/* NEW: Newsletter */}
            <div className="text-mono text-[8px] uppercase tracking-[0.35em] text-ink-muted/50 mb-2">
              Signal Feed →
            </div>
            <NewsletterInput />
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <div className="text-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold mb-8">Navigation</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 h-[1px] bg-accent group-hover:w-4 transition-all duration-300" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4 md:col-start-9">
            <div className="text-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold mb-8">Terminal_Access</div>
            <div className="space-y-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-ink-muted hover:text-accent transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-border group-hover:bg-accent transition-colors duration-300" />
                    <span className="text-mono text-[10px] uppercase tracking-[0.2em]">{s.label}</span>
                  </div>
                  {/* NEW: handle */}
                  <span className="text-mono text-[8px] tracking-[0.1em] text-ink-muted/30 group-hover:text-accent/40 transition-colors duration-300">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>

            {/* NEW: Location + timezone */}
            <div className="mt-8 pt-8 border-t border-border/15">
              <div className="text-mono text-[8px] uppercase tracking-[0.3em] text-ink-muted/40 mb-1">Base of Operations</div>
              <div className="text-mono text-[9px] text-ink-muted/60">Remote-First · GMT+5:30</div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/10">
          <div className="text-mono text-[8px] uppercase tracking-[0.25em] text-ink-muted/40">
            © {currentYear} Recodey Architectural Tech Studio — All Rights Reserved
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted/40 hover:text-accent transition-colors duration-300">
              Privacy_Protocol
            </Link>
            <span className="text-accent/20">·</span>
            <Link href="/terms" className="text-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted/40 hover:text-accent transition-colors duration-300">
              Service_Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}