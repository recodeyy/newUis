"use client";
import React from 'react';

export default function Ticker() {
  const items = [
    "ENGINEERING",
    "◆",
    "ARCHITECTURE",
    "◆",
    "AI SYSTEMS",
    "◆",
    "DESIGN",
    "◆",
    "INFRASTRUCTURE",
    "◆",
    "DAYLIGHT PROTOCOLS",
    "◆",
  ];

  return (
    <div className="py-6 border-y border-border overflow-hidden relative bg-bg-elevated/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      
      <div className="animate-ticker flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`mx-6 text-mono text-[10px] tracking-[0.4em] uppercase ${
              item === '◆' ? 'text-accent text-[6px]' : 'text-ink-muted'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
