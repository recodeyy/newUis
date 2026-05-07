"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortraitWarning() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 1024;
      const landscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isMobile && landscape);
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLandscape && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[12000] bg-bg flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
          {/* Rotating device icon */}
          <motion.div
            animate={{ rotate: [0, -90, -90, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
            className="mb-8 relative z-10"
          >
            <svg width="48" height="64" viewBox="0 0 48 64" fill="none" className="text-accent">
              <rect x="2" y="2" width="44" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
              <circle cx="24" cy="54" r="3" stroke="currentColor" strokeWidth="1.5" />
              <rect x="16" y="6" width="16" height="2" rx="1" fill="currentColor" opacity="0.3" />
            </svg>
          </motion.div>
          <h2 className="text-display text-2xl font-bold tracking-extratight mb-3 relative z-10">
            Please rotate your device
          </h2>
          <p className="text-mono text-[9px] uppercase tracking-[0.4em] text-ink-muted relative z-10">
            Portrait mode required for optimal experience
          </p>
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-accent/20" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-accent/20" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-accent/20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-accent/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
