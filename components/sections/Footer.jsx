"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 relative">
      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-border" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted">
          &copy; {currentYear} <span className="text-accent">RECODEY</span> ARCHITECTURAL TECH
        </div>
        
        <div className="flex gap-8">
          {[
            { label: "Instagram", href: "https://instagram.com/recodeyy" },
            { label: "X_Twitter", href: "https://x.com/recodeyy" },
            { label: "LinkedIn", href: "https://linkedin.com/company/recodey" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors duration-300"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="flex gap-6">
          <Link href="/privacy" className="text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors duration-300">
            Privacy
          </Link>
          <Link href="/terms" className="text-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent transition-colors duration-300">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
