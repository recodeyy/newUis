"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Send } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', project: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '', project: '' });
        setTimeout(() => { setStatus('idle'); onClose(); }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[6000] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-bg-elevated border border-border p-8 md:p-12 z-10"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
            
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-accent/30" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-accent/30" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-accent/30" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-accent/30" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10">
              {/* Header */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-accent" />
                <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent">Initiate Contact</span>
              </div>
              <h2 className="text-display text-3xl md:text-5xl font-bold tracking-extratight mb-2">
                LET&apos;S <span className="text-accent">BUILD.</span>
              </h2>
              <p className="text-ink-muted text-sm mb-10">
                Transmit your project details. We&apos;ll respond within 24 hours.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-ink transition-colors placeholder:text-ink-muted"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-ink transition-colors placeholder:text-ink-muted"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted block mb-2">Project Type</label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-ink transition-colors placeholder:text-ink-muted"
                    placeholder="Web Platform / Brand Identity / AI Integration"
                  />
                </div>

                <div>
                  <label className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted block mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm text-ink transition-colors resize-none placeholder:text-ink-muted"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-mono text-[9px] text-ink-muted tracking-widest">
                    {status === 'sent' && <span className="text-terminal-green">✓ TRANSMISSION SENT</span>}
                    {status === 'error' && <span className="text-red-400">✗ TRANSMISSION FAILED</span>}
                    {status === 'sending' && <span className="text-accent animate-pulse">TRANSMITTING...</span>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative border border-accent text-accent px-8 py-3 text-mono text-[10px] tracking-[0.3em] uppercase overflow-hidden hover:text-white transition-colors disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      Transmit
                      <Send className="w-3 h-3" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
