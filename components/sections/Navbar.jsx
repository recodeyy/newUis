"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

import Image from 'next/image';
import MagneticButton from '../MagneticButton';

export default function Nav({ onOpenContact, onLogoClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const handleClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: "#hero", label: "Story", num: "001" },
    { href: "#about", label: "Protocol", num: "002" },
    { href: "#projects", label: "Systems", num: "003" },
    { href: "#services", label: "Capabilities", num: "004" },
    { href: "#story", label: "Origin", num: "005" },
    { href: "#insights", label: "Journal", num: "006" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPage = navLinks.find(l => l.href === `#${activeSection}`);

  return (
    <>
      {/* Logo — top left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-[5000] pointer-events-auto"
      >
        <MagneticButton strength={0.2}>
          <a href="/" aria-label="Recodey home" className="flex items-center" data-cursor-snap>
            <Image
              src="/assets/recodey-logo.png"
              alt="Recodey logo"
              width={220}
              height={60}
              priority
              className="h-10 w-auto object-contain md:h-12"
            />
          </a>
        </MagneticButton>
      </motion.div>

      {/* Top-Right Utility Bar — High Visibility */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[5000] flex items-center gap-10 pointer-events-auto hidden md:flex"
      >
        {/* Satellite Uplink — Socials */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[7px] text-mono text-accent/30 uppercase tracking-[0.4em]">SATELLITE_UPLINK</span>
            <div className="w-6 h-[1px] bg-accent/20" />
          </div>
          {[
            { label: "Twitter", href: "https://x.com/recodeyy" },
            { label: "LinkedIn", href: "https://linkedin.com/company/recodey" },
            { label: "Archive", href: "/gallery" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-mono text-[9px] text-ink-muted hover:text-accent transition-all hover:tracking-[0.2em] uppercase font-bold border-b border-transparent hover:border-accent pb-0.5"
              data-cursor-snap
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Secure Access — Action */}
        <div className="relative group">
          <div className="absolute inset-0 bg-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={onOpenContact}
            className="relative flex items-center gap-4 px-6 py-2 border border-accent/20 group-hover:border-accent transition-all duration-500 overflow-hidden bg-bg/40 backdrop-blur-sm"
            data-cursor-snap
          >
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-accent" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-accent" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-accent" />
            
            <div className="text-mono text-[9px] tracking-[0.4em] uppercase text-accent font-black">
              Initiate_Transmission
            </div>
          </button>
        </div>
      </motion.div>

      {/* Elite Side Navigation HUD */}
      <motion.nav
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[5000] hidden md:flex flex-col items-end gap-0 pointer-events-auto"
      >
        {/* Background Vertical Beam */}
        <div className="absolute right-0 top-[-10%] bottom-[-10%] w-[1px] bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none" />

        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <MagneticButton key={link.href} strength={0.12}>
              <motion.a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`group relative flex items-center justify-end gap-8 py-4 transition-all duration-500`}
                data-cursor-snap
              >
                {/* Active Status Metadata */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute right-full mr-8 flex items-center gap-3 pointer-events-none"
                    >
                      <div className="text-[6px] text-mono text-accent/40 uppercase tracking-[0.4em] whitespace-nowrap">
                        ESTABLISHING_LINK... [OK]
                      </div>
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(255,61,0,0.8)]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4">
                  <span className={`text-mono text-[8px] font-bold tracking-widest transition-all duration-500 ${
                    isActive ? 'text-accent' : 'text-accent/30 group-hover:text-accent/60'
                  }`}>
                    {link.num}
                  </span>
                  <span className={`text-display transition-all duration-500 uppercase ${
                    isActive 
                      ? 'text-accent text-lg md:text-xl tracking-[0.3em] font-black' 
                      : 'text-ink-muted group-hover:text-ink text-xs md:text-sm tracking-[0.2em] font-bold'
                  }`}>
                    {link.label}
                  </span>
                </div>
                
                {/* HUD Indicator Bar */}
                <div className="relative w-6 h-[1px] flex items-center justify-end">
                  <div className={`h-[1px] bg-border transition-all duration-700 ${isActive ? 'w-10 bg-accent shadow-[0_0_10px_rgba(255,61,0,0.5)]' : 'w-4'}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="navDot"
                      className="absolute -right-1 w-1.5 h-1.5 bg-accent rotate-45 shadow-[0_0_10px_rgba(255,61,0,1)]"
                    />
                  )}
                </div>
              </motion.a>
            </MagneticButton>
          );
        })}

        {/* Telemetry — Progress Indicator */}
        <div className="mt-8 w-full flex flex-col items-end">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-mono text-[6px] text-accent/30 uppercase tracking-[0.5em]">MISSION_SYNC</span>
            <div className="w-12 h-[1px] bg-accent/10" />
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-display text-5xl font-black text-accent leading-none drop-shadow-[0_0_15px_rgba(255,61,0,0.3)]">
              {currentPage?.num || '001'}
            </span>
            <span className="text-mono text-[10px] text-accent/40 font-bold">/ 006</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-1 mt-4">
            {navLinks.map((_, i) => {
              const activeIdx = navLinks.findIndex(l => l.href === `#${activeSection}`);
              return (
                <div 
                  key={i}
                  className={`w-6 h-[2px] transition-all duration-500 ${
                    i <= activeIdx ? 'bg-accent shadow-[0_0_8px_rgba(255,61,0,0.5)]' : 'bg-border/30'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile HUD — Floating Dynamic Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full p-4 z-[5000] md:hidden block pointer-events-none"
      >
        <div className="bg-bg/80 backdrop-blur-md border border-accent/20 p-4 flex items-center justify-between pointer-events-auto">
          <div className="flex flex-col gap-1">
            <div className="text-mono text-[6px] text-accent/40 uppercase tracking-[0.3em]">SEC_CURRENT_COORD</div>
            <div className="text-display text-lg font-black text-accent tracking-tighter uppercase leading-none">
              {currentPage?.label || 'RECODEY'}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-mono text-[7px] text-accent/30 uppercase tracking-widest">MISSION_SYNC</span>
            <span className="text-display text-2xl font-black text-accent">{currentPage?.num || '001'}</span>
            <span className="text-mono text-[8px] text-accent/40">/ 006</span>
          </div>
        </div>
      </motion.div>

      {/* Mobile hamburger */}
      <div className="fixed top-6 right-6 z-[5001] block md:hidden pointer-events-auto">
        <button
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 border border-accent/30 flex items-center justify-center bg-bg/80 backdrop-blur-sm"
          data-cursor-snap
        >
          {mobileOpen ? <X className="w-4 h-4 text-accent" /> : <Menu className="w-4 h-4 text-ink" />}
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[5000] bg-bg flex flex-col items-center justify-center gap-6"
          >
            {/* Background grid */}
            <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
            
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-6 relative"
              >
                <span className="text-mono text-[9px] text-accent/40 tracking-widest">{link.num}</span>
                <span className="text-display text-4xl font-bold tracking-tight text-ink hover:text-accent transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
            >
              INITIATE TRANSMISSION
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
