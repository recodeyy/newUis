"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, Pill, Shield, Package, Activity, Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// ─── Animated background grid ─────────────────────────────────────────────────
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-bg" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-code-purple/[0.05] rounded-full blur-[150px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
    {/* Horizontal lines */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="absolute w-full h-[1px] bg-accent/[0.04]" style={{ top: `${i * 14}%` }} />
    ))}
    {/* Vertical lines */}
    {[...Array(6)].map((_, i) => (
      <div key={i} className="absolute h-full w-[1px] bg-accent/[0.04]" style={{ left: `${i * 20}%` }} />
    ))}
  </div>
);

// ─── Feature card ─────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group border border-border/30 hover:border-accent/30 p-6 transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-10 h-10 border border-border/40 group-hover:border-accent/40 flex items-center justify-center mb-4 transition-colors duration-500">
        <Icon className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors duration-500 stroke-[1.5]" />
      </div>
      <div className="text-display text-base font-bold tracking-tight mb-2">{title}</div>
      <div className="text-mono text-[10px] text-ink-muted/60 leading-relaxed">{desc}</div>
    </div>
  </motion.div>
);

// ─── Download button ──────────────────────────────────────────────────────────
const DownloadButton = () => {
  const [state, setState] = useState('idle'); // idle | loading | done

  const handleDownload = () => {
    setState('loading');
    setTimeout(() => {
      setState('done');
      const a = document.createElement('a');
      a.href = 'https://github.com/omsingh10/omscare/archive/refs/heads/master.zip';
      a.download = 'OmsCare.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => setState('idle'), 3000);
    }, 1800);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'loading'}
      className="group relative flex items-center gap-3 bg-accent text-white text-mono text-[11px] uppercase tracking-[0.3em] px-8 py-4 overflow-hidden hover:shadow-[0_0_40px_rgba(255,61,0,0.4)] transition-all duration-300 disabled:opacity-70"
    >
      {/* Shine sweep */}
      <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-500" />

      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border border-white/40 border-t-white rounded-full" />
            <span>Preparing Download...</span>
          </motion.div>
        )}
        {state === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 relative">
            <CheckCircle className="w-4 h-4" />
            <span>Downloaded!</span>
          </motion.div>
        )}
        {state === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 relative">
            <Download className="w-4 h-4" />
            <span>Download OmsCare</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OmsCarePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const features = [
    { icon: Package, title: "Inventory Management", desc: "Real-time stock tracking with low-stock alerts and reorder management." },
    { icon: FileText, title: "Billing System", desc: "Fast invoice generation with tax calculations and payment tracking." },
    { icon: Users, title: "Patient Records", desc: "Secure patient history, prescriptions, and visit logs in one place." },
    { icon: AlertCircle, title: "Stock Alerts", desc: "Automated alerts for expiring medicines and low inventory levels." },
    { icon: Activity, title: "Sales Analytics", desc: "Daily, weekly, and monthly sales reports with visual dashboards." },
    { icon: Shield, title: "Secure & Reliable", desc: "Role-based access control with encrypted data storage." },
  ];

  return (
    <div className="min-h-screen bg-bg relative">
      <GridBackground />

      {/* ── Navbar ── */}
      <nav className="relative z-10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between border-b border-border/20">
        <Link href="/" className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted hover:text-accent transition-colors duration-300">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Recodey</span>
        </Link>
        <div className="text-display text-lg font-bold tracking-extratight">
          RECODEY<span className="text-accent">.</span>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 lg:px-20 py-20 max-w-7xl mx-auto">

        {/* ── Hero section ── */}
        <div className="mb-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent">SYS_08 / Healthcare</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 border border-accent/30 bg-accent/5 flex items-center justify-center">
                    <Pill className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-mono text-[8px] uppercase tracking-[0.3em] text-accent/50 mb-1">Pharmacy Management</div>
                    <h1 className="text-display text-5xl md:text-7xl font-bold tracking-extratight leading-none">OmsCare</h1>
                  </div>
                </div>

                <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  A full-featured pharmacy management system built with Flutter —
                  handling <span className="text-accent/80">inventory</span>, billing,
                  patient records, and stock alerts with a clean cross-platform interface.
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  {["Flutter", "Dart", "Firebase", "Cross-Platform"].map((t) => (
                    <span key={t} className="text-mono text-[9px] uppercase tracking-[0.2em] border border-border/40 px-3 py-1.5 text-ink-muted">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Download + GitHub */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <DownloadButton />
                  <a
                    href="https://github.com/omsingh10/omscare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted border border-border/30 px-6 py-4 hover:border-accent/40 hover:text-accent transition-all duration-300"
                  >
                    <span>View on GitHub</span>
                    <ArrowLeft className="w-3 h-3 rotate-[135deg] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right — Animated mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative border border-accent/20 bg-bg-elevated p-8 overflow-hidden">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-accent/40" />
                <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-accent/40" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-accent/40" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-accent/40" />

                {/* Fake dashboard UI */}
                <div className="text-mono text-[9px] uppercase tracking-[0.3em] text-accent/50 mb-6">DASHBOARD_PREVIEW</div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total Stock", value: "2,847" },
                    { label: "Today Sales", value: "₹12,450" },
                    { label: "Low Stock", value: "14" },
                  ].map((s) => (
                    <div key={s.label} className="border border-border/20 p-3">
                      <div className="text-mono text-[8px] text-ink-muted/50 uppercase tracking-[0.2em] mb-1">{s.label}</div>
                      <div className="text-display text-xl font-bold text-accent">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Fake table */}
                <div className="border border-border/20">
                  <div className="grid grid-cols-3 border-b border-border/20 px-4 py-2 bg-bg-surface">
                    {["Medicine", "Stock", "Status"].map((h) => (
                      <span key={h} className="text-mono text-[8px] uppercase tracking-[0.2em] text-ink-muted/50">{h}</span>
                    ))}
                  </div>
                  {[
                    { name: "Paracetamol", stock: "450", status: "OK" },
                    { name: "Amoxicillin", stock: "12", status: "LOW" },
                    { name: "Ibuprofen", stock: "230", status: "OK" },
                    { name: "Cetirizine", stock: "5", status: "CRITICAL" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="grid grid-cols-3 px-4 py-2.5 border-b border-border/10 last:border-0"
                    >
                      <span className="text-mono text-[9px] text-ink-muted">{row.name}</span>
                      <span className="text-mono text-[9px] text-ink-muted">{row.stock}</span>
                      <span className={`text-mono text-[8px] font-bold ${row.status === 'OK' ? 'text-terminal-green' : row.status === 'LOW' ? 'text-accent' : 'text-red-400'}`}>
                        {row.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Features grid ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent">Core Features</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={0.5 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="border border-border/20 p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-code-purple/[0.03] to-accent/[0.02]" />
          <div className="relative z-10">
            <div className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent/60 mb-4">Ready to use?</div>
            <h2 className="text-display text-3xl md:text-5xl font-bold tracking-extratight mb-4">
              Download OmsCare<span className="text-accent">.</span>
            </h2>
            <p className="text-ink-muted text-sm mb-8 max-w-md mx-auto">
              Free and open source. Download the source code and set it up for your pharmacy.
            </p>
            <DownloadButton />
          </div>
        </motion.div>

      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-20 py-8 border-t border-border/20 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="text-mono text-[8px] uppercase tracking-[0.3em] text-ink-muted/40">
            OmsCare — Built by Recodey
          </div>
          <Link href="/" className="text-mono text-[8px] uppercase tracking-[0.3em] text-ink-muted/40 hover:text-accent transition-colors duration-300">
            ← Back to Recodey
          </Link>
        </div>
      </footer>
    </div>
  );
}