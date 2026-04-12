"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function Contact() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) return;
    setSent(true);
  };

  return (
    <>
      {/* Contact — centered like wireframe */}
      <section id="contact" ref={ref} className="py-28 bg-black border-t border-white/5">
        <div className="max-w-[560px] mx-auto px-6 md:px-10 text-center">

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4"
          >
            Get in touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(32px,5vw,52px)] font-bold text-white tracking-[-0.04em] leading-[1.1] mb-3"
          >
            Contact Us.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] text-white/35 mb-12"
          >
            We reply within 24 hours.
          </motion.p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="text-[40px] mb-4">✓</div>
              <div className="text-[18px] font-semibold text-white mb-2">Message sent!</div>
              <div className="text-[14px] text-white/40">We'll be in touch soon.</div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={handleSend}
              className="flex flex-col gap-3 text-left"
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" placeholder="First name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                />
                <input
                  type="email" placeholder="Email address"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <input
                type="text" placeholder="Subject"
                className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
              />
              <textarea
                rows={5} placeholder="What can we help you with?"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
              />
              <HoverBorderGradient
                as="button"
                containerClassName="rounded-xl w-full mt-1"
                className="w-full flex items-center justify-center gap-2 bg-white text-black text-[14px] font-semibold py-3.5 rounded-xl"
                duration={2}
              >
                Send message <ArrowRight size={15} />
              </HoverBorderGradient>
            </motion.form>
          )}
        </div>
      </section>

      {/* Newsletter — centered like wireframe */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-[480px] mx-auto px-6 text-center">
          <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">Stay informed</p>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-white tracking-[-0.04em] mb-3">
            Get updates.
          </h2>
          <p className="text-[14px] text-white/35 mb-8">
            Design moves. Get them in your inbox.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="email" placeholder="name@email.com"
              className="flex-grow bg-[#0d0d0d] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
            />
            <button className="bg-white text-black text-[13px] font-semibold px-5 py-3 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
