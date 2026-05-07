"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  const pageMap = {
    '/': '001',
    '/insights': '002',
    '/gallery': '003',
    '/privacy': '004',
    '/terms': '005',
  };

  useEffect(() => {
    if (pathname !== displayPath) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayPath(pathname);
        setIsTransitioning(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  const pageNum = pageMap[pathname] || '···';

  return (
    <>
      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[9000] bg-bg flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent mb-2 animate-pulse">
                Accessing
              </div>
              <div className="text-display text-6xl font-bold text-ink tracking-extratight">
                {pageNum}
              </div>
            </div>
            {/* Corner brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-accent/20" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-accent/20" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-accent/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-accent/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
