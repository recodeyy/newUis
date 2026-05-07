"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return "RECENT INSIGHT";
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
};

export default function BlogsModal({ isOpen, onClose, blogs }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-bg/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-bg-elevated border border-border w-full max-w-4xl h-[80vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-accent/30 z-20" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-accent/30 z-20" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-accent/30 z-20" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-accent/30 z-20" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close blogs modal"
              className="absolute top-6 right-6 lg:top-8 lg:right-8 w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors z-20 group"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Header */}
            <div className="p-8 lg:p-12 border-b border-border relative z-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-6 h-[1px] bg-accent" />
                <span className="text-accent text-mono text-[9px] tracking-[0.5em] font-bold">ARCHIVES</span>
              </div>
              <h2 className="text-display text-3xl md:text-5xl font-bold tracking-extratight leading-none">
                ALL <span className="text-accent">INSIGHTS</span>
              </h2>
            </div>

            {/* Posts list */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 no-scrollbar relative z-10">
              {blogs.map((post, i) => (
                <Link
                  key={i}
                  href={post.slug?.current ? `/insights/${post.slug.current}` : "#"}
                  className="group block cursor-pointer border-b border-border pb-10 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-6 mb-4 text-mono text-[9px] uppercase tracking-[0.3em]">
                    <span className="text-accent">{post.publishedAt ? formatDate(post.publishedAt) : (post._createdAt ? formatDate(post._createdAt) : post.date)}</span>
                    <span className="text-ink-muted">{post.category}</span>
                  </div>
                  <h3 className="text-display text-xl md:text-3xl font-bold tracking-extratight leading-[1.1] group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-ink-muted text-sm mt-3 max-w-xl">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
