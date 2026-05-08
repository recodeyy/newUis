"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden border-t border-border/40">
      {/* Massive Background Logo Accent */}
      <div className="absolute bottom-[-10%] right-[-5%] text-[20vw] font-bold text-accent/[0.03] pointer-events-none select-none tracking-tighter leading-none z-0">
        RECODEY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="text-display text-2xl font-bold mb-6 tracking-extratight">
              RECODEY<span className="text-accent">.</span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed max-w-xs mb-8">
              Forging the next industrial era through architectural tech and cinematic digital experiences.
            </p>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="text-mono text-[8px] uppercase tracking-[0.3em] text-terminal-green/60">System_Status: Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold mb-8">Navigation</div>
            <ul className="space-y-4">
              {['Hero', 'About', 'Services', 'Products', 'Story'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <div className="text-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold mb-8">Terminal_Access</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Instagram", href: "https://instagram.com/recodeyy" },
                { label: "X_Twitter", href: "https://x.com/recodeyy" },
                { label: "LinkedIn", href: "https://linkedin.com/company/recodey" },
                { label: "Github", href: "https://github.com/recodey" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors"
                >
                  <span className="w-1 h-1 bg-border group-hover:bg-accent transition-colors" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-border/10">
          <div className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted/60">
            &copy; {currentYear} RECODEY ARCHITECTURAL TECH STUDIO. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted/60 hover:text-accent transition-colors">
              Privacy_Protocol
            </Link>
            <Link href="/terms" className="text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted/60 hover:text-accent transition-colors">
              Service_Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
