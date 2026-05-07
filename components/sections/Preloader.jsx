"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { sounds } from '../sounds';

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
  const [logs, setLogs] = useState([]);
  const [skipped, setSkipped] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleText, setConsoleText] = useState('');

  const stableOnFinish = useCallback(onFinish, []);

  useEffect(() => {
    sounds?.playBoot();
  }, []);

  const logMessages = [
    { msg: "sys.kernel.init → booting neural interface...", type: "system" },
    { msg: "loading /recodey/core/engine_v5.2.1", type: "info" },
    { msg: "calibrating design_nodes... [OK]", type: "success" },
    { msg: "mounting architecture_layer_04", type: "info" },
    { msg: "sec_check: CRYPTOGRAPHIC_HANDSHAKE → PASSED", type: "success" },
    { msg: "connecting to node_grid_09... [3 nodes active]", type: "info" },
    { msg: "parsing aesthetic_weights → brutalist.core", type: "info" },
    { msg: "daylight_protocols: ████████████ ACTIVE", type: "accent" },
    { msg: "verifying identity → recodey.architectural.tech", type: "info" },
    { msg: "render_pipeline: INITIALIZED", type: "success" },
    { msg: "> activate console for access...", type: "command" },
  ];

  const consolePrompt = "initializing new session... access granted_";

  useEffect(() => {
    // Show ASCII logo first
    const logoTimer = setTimeout(() => setShowConsole(true), 300);

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, { ...logMessages[logIndex], time: new Date().toLocaleTimeString('en-US', { hour12: false }) }]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 180);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (typeof window !== 'undefined') sessionStorage.setItem(SKIP_KEY, 'true');
          // Type out console text
          let charIdx = 0;
          const typeInterval = setInterval(() => {
            if (charIdx < consolePrompt.length) {
              setConsoleText(consolePrompt.slice(0, charIdx + 1));
              charIdx++;
            } else {
              clearInterval(typeInterval);
              setTimeout(stableOnFinish, 800);
            }
          }, 40);
          return 100;
        }
        const step = prev > 85 ? 1 : prev > 60 ? 3 : Math.floor(Math.random() * 12) + 3;
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [stableOnFinish]);

  const handleSkip = () => {
    setSkipped(true);
    if (typeof window !== 'undefined') sessionStorage.setItem(SKIP_KEY, 'true');
    stableOnFinish();
  };

  if (skipped) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-bg p-8 md:p-12 flex flex-col justify-between overflow-hidden cursor-none"
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Animated scan line */}
      <motion.div
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-accent/40 z-[1]"
        style={{ boxShadow: '0 0 30px 10px rgba(255, 61, 0, 0.15)' }}
      />

      {/* Top bar — status info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-start relative z-10"
      >
        <div className="terminal-text text-ink-muted">
          <div>SYS_REF: RECODEY.CORE.V5</div>
          <div className="text-accent mt-1">NODE_STATUS: ONLINE</div>
        </div>
        <div className="terminal-text text-ink-muted text-right">
          <div>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
          <div className="mt-1 flex items-center justify-end gap-3">
            <HexStream />
            <span>SESSION_ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
        className="flex-1 flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-16 relative z-10 my-8"
      >
        {/* Left side — logs */}
        <div className="flex-1 w-full flex flex-col justify-end">
          {/* ASCII Logo */}
          <AnimatePresence>
            {showConsole && (
              <motion.pre
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-accent text-[5px] md:text-[8px] leading-tight mb-10 hidden md:block font-mono whitespace-pre select-none animate-[flicker_0.15s_infinite] drop-shadow-[0_0_8px_rgba(255,61,0,0.6)]"
              >
                {ASCII_LOGO}
              </motion.pre>
            )}
          </AnimatePresence>

          {/* Log stream */}
          <div className="text-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] space-y-1.5 h-44 overflow-hidden text-left relative">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <span className="text-ink-muted opacity-50 shrink-0">[{log.time}]</span>
                  <span className={
                    log.type === 'success' ? 'text-terminal-green' :
                    log.type === 'accent' ? 'text-accent' :
                    log.type === 'command' ? 'text-accent glow-text-subtle' :
                    'text-ink-muted'
                  }>
                    <DecryptText text={log.msg} />
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
          </div>

          {/* Console input line */}
          {count >= 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-mono text-[10px] text-accent tracking-wider"
            >
              <span className="text-terminal-green mr-2">❯</span>
              {consoleText}
              <span className="inline-block w-[6px] h-[12px] bg-accent ml-[2px] animate-[cursor-blink_1s_step-end_infinite]" />
            </motion.div>
          )}

          {/* Progress bar */}
          <div className="mt-6 h-[1px] w-full bg-border relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
              style={{ boxShadow: '0 0 15px rgba(255, 61, 0, 0.6)' }}
            />
          </div>

          {/* Skip */}
          <button
            onClick={handleSkip}
            className="mt-4 text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted hover:text-accent transition-colors w-fit"
          >
            SKIP →
          </button>
        </div>

        {/* Right side — counter */}
        <div className="flex flex-col items-end text-right shrink-0">
          <div className="text-ink text-display font-bold tracking-extratight leading-[0.75] relative drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
               style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
          >
            {/* Ghosting Effect */}
            <motion.span
              animate={{ x: [0, -4, 4, 0], opacity: [0, 0.1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
              className="absolute inset-0 text-accent pointer-events-none"
            >
              {String(count).padStart(3, '0')}
            </motion.span>
            
            <motion.span
              key={count}
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              className="tabular-nums inline-block relative z-10"
            >
              {String(count).padStart(3, '0')}
            </motion.span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-accent" />
            <div className="text-accent text-mono text-[9px] uppercase tracking-[0.3em] font-bold">
              System_Boot
            </div>
          </div>
          <div className="mt-2 text-mono text-[8px] text-ink-muted tracking-widest">
            PAGE 001
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-end relative z-10"
      >
        <div className="terminal-text text-ink-muted">
          RECODEY ARCHITECTURAL TECH STUDIO
        </div>
        <div className="terminal-text text-ink-muted flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
          SECURE_CONNECTION
        </div>
      </motion.div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-accent/20" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-accent/20" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-accent/20" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-accent/20" />
    </motion.div>
  );
}
