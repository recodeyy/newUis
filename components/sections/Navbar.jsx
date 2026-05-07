"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

import MagneticButton from '../MagneticButton';

import { sounds } from '../sounds';

export default function Nav({ onOpenContact, onLogoClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const handleClick = (e, href) => {
    sounds?.playSelect();
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
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={(e) => {
              sounds?.playSelect();
              if (onLogoClick) {
                onLogoClick();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-8 h-8 border border-accent/50 flex items-center justify-center relative group-hover:border-accent transition-colors">
              <span className="text-accent text-mono text-[10px] font-bold">R</span>
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-display font-bold text-sm tracking-tight text-ink hidden md:block group-hover:text-accent transition-colors">
              RECODEY
            </span>
          </div>
        </MagneticButton>
      </motion.div>

      {/* Side navigation — right side (desktop) */}
      <motion.nav
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-[5000] hidden md:flex flex-col items-end gap-1 pointer-events-auto"
      >
        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <MagneticButton key={link.href} strength={0.15}>
              <motion.a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className={`group flex items-center gap-3 py-1.5 transition-all duration-300 ${
                  isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
                }`}
              >
                <span className={`text-mono text-[8px] tracking-[0.3em] uppercase transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {link.num}
                </span>
                <span className="text-mono text-[10px] tracking-[0.15em] uppercase">
                  {link.label}
                </span>
                <div className={`h-[1px] transition-all duration-500 ${
                  isActive ? 'w-6 bg-accent' : 'w-0 group-hover:w-3 bg-ink-muted'
                }`} />
              </motion.a>
            </MagneticButton>
          );
        })}

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border my-2" />

        {/* Social links */}
        {[
          { label: "Twitter", href: "https://x.com/recodeyy" },
          { label: "LinkedIn", href: "https://linkedin.com/company/recodey" },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono text-[8px] tracking-[0.15em] uppercase text-ink-muted hover:text-accent transition-colors py-0.5"
          >
            {social.label}
          </a>
        ))}

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border my-2" />

        {/* Gallery link */}
        <a
          href="/gallery"
          className="text-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted hover:text-accent transition-colors py-0.5"
        >
          Gallery
        </a>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border my-2" />

        {/* Contact */}
        <button
          onClick={onOpenContact}
          className="text-mono text-[9px] tracking-[0.2em] uppercase text-accent hover:text-accent-secondary transition-colors py-1 glow-text-subtle"
        >
          Connect
        </button>

        {/* Page indicator */}
        <div className="mt-4 text-right">
          <div className="text-mono text-[8px] tracking-[0.3em] uppercase text-ink-muted">PAGE</div>
          <div className="text-display text-2xl font-bold text-accent leading-none mt-1">
            {currentPage?.num || '001'}
          </div>
        </div>
      </motion.nav>

      {/* Mobile hamburger */}
      <div className="fixed top-6 right-6 z-[5001] block md:hidden pointer-events-auto">
        <button
          aria-label="Toggle mobile menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 border border-accent/30 flex items-center justify-center bg-bg/80 backdrop-blur-sm"
        >
          {mobileOpen ? <X className="w-4 h-4 text-accent" /> : <Menu className="w-4 h-4 text-ink" />}
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                <span className="text-display text-3xl font-bold tracking-tight text-ink hover:text-accent transition-colors">
                  {link.label}
                </span>
              </motion.a>
            ))}

            <motion.a
              href="/gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.5 }}
              onClick={() => {
                sounds?.playSelect();
                setMobileOpen(false);
              }}
              className="group flex items-center gap-6 relative"
            >
              <span className="text-mono text-[9px] text-accent/40 tracking-widest">007</span>
              <span className="text-display text-3xl font-bold tracking-tight text-accent hover:text-accent-secondary transition-colors">
                GALLERY
              </span>
            </motion.a>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => { setMobileOpen(false); onOpenContact(); }}
              className="mt-8 border border-accent text-accent px-10 py-3 text-mono text-[10px] font-bold tracking-widest hover:bg-accent hover:text-white transition-all"
            >
              INITIATE TRANSMISSION
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
