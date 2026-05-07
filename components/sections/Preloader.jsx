"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKIP_KEY = 'recodey_preloader_seen';

const ASCII_LOGO = `
██████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝╚██╗ ██╔╝
██████╔╝█████╗  ██║     ██║   ██║██║  ██║█████╗   ╚████╔╝ 
██╔══██╗██╔══╝  ██║     ██║   ██║██║  ██║██╔══╝    ╚██╔╝  
██║  ██║███████╗╚██████╗╚██████╔╝██████╔╝███████╗   ██║   
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝   
`;

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const DecryptText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let timeout;
    let frame = 0;
    const maxFrames = 10;
    
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
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const HexStream = () => {
  const [hex, setHex] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      let h = "";
      for (let i = 0; i < 8; i++) h += Math.floor(Math.random() * 16).toString(16).toUpperCase();
      setHex(h);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-mono text-[8px] text-accent/30 tabular-nums">0x{hex}</span>;
};

export default function Preloader({ onFinish }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const stableOnFinish = useCallback(onFinish, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(stableOnFinish, 600);
          return 100;
        }
        const step = prev > 90 ? 1 : Math.floor(Math.random() * 10) + 2;
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [stableOnFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#08080E] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-[400px] px-8 relative">
        {/* Percentage Readout */}
        <div className="mb-4 flex items-end justify-between">
          <div className="text-mono text-[9px] text-accent/40 uppercase tracking-[0.5em]">
            Initializing_System
          </div>
          <div className="text-mono text-3xl font-bold text-accent tabular-nums tracking-tighter">
            {count}%
          </div>
        </div>

        {/* Minimal Progress Line */}
        <div className="h-[1px] w-full bg-accent/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
            style={{ boxShadow: '0 0 10px rgba(255, 61, 0, 0.3)' }}
          />
        </div>

        {/* Dynamic Telemetry Subtext */}
        <div className="mt-4 flex justify-between items-start">
          <div className="text-mono text-[7px] text-accent/20 uppercase tracking-[0.3em] leading-relaxed">
            RECODEY_STUDIO<br />
            ARCH_V.04_CORE
          </div>
          <div className="text-mono text-[7px] text-accent/20 uppercase tracking-[0.3em] text-right">
            {mounted ? new Date().toLocaleTimeString() : '00:00:00'}<br />
            SECURE_LINK
          </div>
        </div>
      </div>

      {/* Subtle Scan Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
    </motion.div>
  );
}
