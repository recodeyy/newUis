"use client";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Stats() {
  const [ref, visible] = useScrollReveal();

  const stats = [
    { value: "93+",  label: "Projects completed",    desc: "Successfully delivered across every industry vertical." },
    { value: "100%", label: "Client satisfaction",   desc: "Every client leaves with exactly what they envisioned." },
    { value: "3h",   label: "Saved per day",         desc: "Average time our AI automations give back per user." },
    { value: "$80k", label: "Saved per month",       desc: "Average cost reduction our clients unlock post-launch." },
  ];

  return (
    <section id="stats" ref={ref} className="py-28 bg-black border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4"
        >
          By the numbers
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[clamp(36px,6vw,64px)] font-bold text-white tracking-[-0.04em] leading-[1.05] mb-16"
        >
          Our <span className="text-blue-400">statistics</span>.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#080808] p-8 md:p-10 flex flex-col gap-4 group hover:bg-[#0d0d0d] transition-colors"
            >
              <div className="text-[clamp(40px,5vw,58px)] font-bold text-white tracking-[-0.03em] leading-none">
                {s.value}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white/80 mb-1">{s.label}</div>
                <div className="text-[13px] text-white/35 leading-[1.6]">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
