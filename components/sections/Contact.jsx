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
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Terminal UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#08080E] border border-accent/20 z-10 overflow-hidden shadow-[0_0_50px_rgba(255,61,0,0.1)]"
          >
            {/* Terminal Header */}
            <div className="bg-accent/5 border-b border-accent/20 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent/20" />
                  <div className="w-2 h-2 rounded-full bg-accent/20" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="text-mono text-[8px] md:text-[9px] text-accent tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold truncate max-w-[180px] md:max-w-none">
                  SECURE_COMMS // RC_882
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-accent/40 hover:text-accent transition-colors p-1"
                data-cursor-snap
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-12 relative">
              {/* Technical Overlay */}
              <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 pointer-events-none hidden sm:block">
                <div className="text-mono text-[7px] text-accent text-right leading-relaxed">
                  LAT: 35.6895° N<br />
                  LON: 139.6917° E<br />
                  ENC_STATUS: ACTIVE
                </div>
              </div>

              {/* Terminal Greeting */}
              <div className="mb-10 md:mb-12">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-1.5 h-5 md:h-6 bg-accent" />
                  <h2 className="text-display text-3xl md:text-6xl font-black tracking-extratight leading-none uppercase">
                    INITIATE <span className="text-accent">PROJECT</span>
                  </h2>
                </div>
                <div className="text-mono text-[9px] md:text-[10px] text-accent/40 tracking-[0.2em] uppercase">
                  establishing uplink... awaiting parameters
                </div>
              </div>

              {/* Command Input Form */}
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                  <div className="group relative">
                    <label className="text-mono text-[8px] text-accent/60 uppercase tracking-[0.4em] block mb-2 md:mb-3 group-focus-within:text-accent transition-colors">
                      [01] CLIENT_IDENTITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-accent/10 focus:border-accent outline-none py-2 text-sm text-ink font-mono tracking-widest transition-all"
                      placeholder="ENTER_NAME_"
                    />
                  </div>

                  <div className="group relative">
                    <label className="text-mono text-[8px] text-accent/60 uppercase tracking-[0.4em] block mb-2 md:mb-3 group-focus-within:text-accent transition-colors">
                      [02] UPLINK_ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-accent/10 focus:border-accent outline-none py-2 text-sm text-ink font-mono tracking-widest transition-all"
                      placeholder="ENTER_EMAIL_"
                    />
                  </div>

                  <div className="md:col-span-2 group relative">
                    <label className="text-mono text-[8px] text-accent/60 uppercase tracking-[0.4em] block mb-2 md:mb-3 group-focus-within:text-accent transition-colors">
                      [03] OBJECTIVE_SCOPE
                    </label>
                    <input
                      type="text"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      className="w-full bg-transparent border-b border-accent/10 focus:border-accent outline-none py-2 text-sm text-ink font-mono tracking-widest transition-all"
                      placeholder="WEB_SYSTEMS / BRAND_ARCHITECTURE_"
                    />
                  </div>

                  <div className="md:col-span-2 group relative">
                    <label className="text-mono text-[8px] text-accent/60 uppercase tracking-[0.4em] block mb-2 md:mb-3 group-focus-within:text-accent transition-colors">
                      [04] TRANSMISSION_CONTENT
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-accent/10 focus:border-accent outline-none py-2 text-sm text-ink font-mono tracking-widest transition-all resize-none"
                      placeholder="DESCRIBE_OBJECTIVE_"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-accent/10">
                  <div className="text-mono text-[8px] tracking-[0.3em] md:tracking-[0.4em] flex items-center gap-4">
                    {status === 'sent' && <span className="text-[#00FF00]">✓ TRANSMISSION_SUCCESSFUL</span>}
                    {status === 'error' && <span className="text-red-500">✗ ERROR_UPLINK_FAILED</span>}
                    {status === 'sending' && (
                      <div className="flex items-center gap-2 text-accent">
                        <div className="w-2 h-2 bg-accent animate-ping" />
                        <span>TRANSMITTING...</span>
                      </div>
                    )}
                    {status === 'idle' && <span className="text-accent/20">AWAITING_INPUT_EXECUTION_</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full md:w-auto group relative px-8 md:px-12 py-4 bg-accent text-bg font-black text-mono text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase overflow-hidden hover:shadow-[0_0_20px_rgba(255,61,0,0.4)] transition-shadow disabled:opacity-50"
                    data-cursor-snap
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    <span className="relative z-10">EXECUTE_TRANSMISSION</span>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Bottom Footer Telemetry */}
            <div className="bg-accent/5 px-8 py-3 border-t border-accent/10 flex justify-between">
              <div className="text-mono text-[6px] text-accent/30 tracking-widest">
                RC_SYSTEM_V.5.2.1 // KPR_CORE_ACTIVE
              </div>
              <div className="text-mono text-[6px] text-accent/30 tracking-widest uppercase">
                packet_encryption_level_high
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
