"use client";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ArrowUpRight, MessageSquare, Sparkles, Workflow, LineChart, Image as ImageIcon } from "lucide-react";

function BlurCard({ children, gradient = "from-blue-600 via-indigo-600 to-purple-700", className = "" }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 blur-3xl scale-110 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-[#0a0a0a] group-hover:bg-[#0d0d0d] transition-colors duration-300" />
      <div className="absolute inset-0 rounded-2xl border border-white/[0.07] group-hover:border-white/[0.12] transition-colors duration-300" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Products() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="services" ref={ref} className="py-28 bg-black border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Left-aligned header like wireframe */}
        <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4"
            >
              What we offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[clamp(36px,6vw,60px)] font-bold text-white tracking-[-0.04em] leading-[1.05]"
            >
              What <span className="text-blue-400">we do</span>.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[15px] text-white/40 leading-[1.7]"
          >
            From conversational AI to full-scale LLM development, we build bespoke solutions that transform how your company operates.
          </motion.p>
        </div>

        {/* Bento Grid — matching wireframe layout */}
        {/* Row 1: big left (2/3) + tall right (1/3) */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">

          {/* Big feature card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="md:col-span-2"
          >
            <BlurCard gradient="from-blue-500 via-cyan-500 to-indigo-600" className="h-full">
              <div className="p-8">
                <div className="h-[220px] rounded-xl bg-black/50 border border-white/5 mb-8 flex items-center justify-center p-6">
                  {/* Chat preview */}
                  <div className="flex flex-col gap-3 w-full max-w-[340px]">
                    <div className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl p-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 shrink-0 flex items-center justify-center">
                        <MessageSquare size={12} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[11px] text-white/30 mb-1">AI Assistant · now</div>
                        <div className="text-[13px] text-white/70">I've successfully scheduled a Google meeting.</div>
                      </div>
                    </div>
                    <div className="self-end bg-blue-500/15 border border-blue-500/10 rounded-xl p-3 max-w-[200px]">
                      <div className="text-[13px] text-blue-300">Send the calendar invite too.</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-white/35 text-[11px] uppercase tracking-wider font-semibold">
                    <MessageSquare size={13} /> Conversational AI
                  </div>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-tight mb-2">Collaborate fast.</h3>
                <p className="text-[13px] text-white/40 leading-[1.7] max-w-[460px]">
                  Design together in real time with your team, with AI-powered tools that streamline every interaction.
                </p>
              </div>
            </BlurCard>
          </motion.div>

          {/* Tall narrow card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BlurCard gradient="from-purple-500 via-pink-500 to-rose-500" className="h-full">
              <div className="p-8 flex flex-col h-full min-h-[380px]">
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-400/20 flex items-center justify-center">
                    <Sparkles size={28} className="text-purple-300" />
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-[11px] text-white/30 uppercase tracking-wider font-semibold mb-2">Generative AI</div>
                  <h3 className="text-[20px] font-bold text-white tracking-tight mb-2">Content Creation.</h3>
                  <p className="text-[13px] text-white/40 leading-[1.7]">
                    Generate on-brand content at scale, effortlessly.
                  </p>
                </div>
              </div>
            </BlurCard>
          </motion.div>
        </div>

        {/* Row 2: image left (1/3) + feature (1/3) + image (1/3) */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">

          {/* Image/preview card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <BlurCard gradient="from-emerald-500 via-teal-500 to-cyan-600" className="h-full min-h-[300px]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow flex items-center justify-center">
                  {/* Workflow preview */}
                  <div className="flex flex-col gap-2 w-full">
                    {["Trigger → API Call", "Filter → Condition", "Action → Email"].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-white/40 bg-white/5 border border-white/5 rounded-lg px-3 py-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-emerald-400" : i === 1 ? "bg-blue-400" : "bg-purple-400"}`} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-[18px] font-bold text-white tracking-tight mb-1">Effortless feedback.</h3>
                  <p className="text-[12px] text-white/40 leading-[1.6]">Automated workflows that remove friction at every step.</p>
                </div>
              </div>
            </BlurCard>
          </motion.div>

          {/* Center feature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BlurCard gradient="from-orange-500 via-amber-500 to-yellow-500" className="h-full min-h-[300px]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow flex items-center justify-center">
                  <div className="font-mono text-[12px] text-white/30 leading-[1.9] w-full">
                    <span className="text-blue-400">model</span> = <span className="text-emerald-400">LLM</span>.train(<br />
                    &nbsp;&nbsp;data=<span className="text-yellow-400">"docs"</span>,<br />
                    &nbsp;&nbsp;epochs=<span className="text-orange-400">12</span><br />
                    )<br />
                    model.<span className="text-blue-300">deploy</span>()
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-[18px] font-bold text-white tracking-tight mb-1">LLM Development.</h3>
                  <p className="text-[12px] text-white/40 leading-[1.6]">Custom large-language models trained on your data.</p>
                </div>
              </div>
            </BlurCard>
          </motion.div>

          {/* Right feature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <BlurCard gradient="from-sky-500 via-blue-500 to-indigo-600" className="h-full min-h-[300px]">
              <div className="p-8 flex flex-col h-full">
                <div className="flex-grow flex items-end justify-center">
                  {/* Bar chart */}
                  <div className="flex items-end gap-1.5 h-20 w-full">
                    {[35, 52, 44, 68, 60, 80, 92].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500/50 to-blue-400/20 border-t border-blue-400/30" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-[18px] font-bold text-white tracking-tight mb-1">Launch-ready files.</h3>
                  <p className="text-[12px] text-white/40 leading-[1.6]">AI delivers production-ready output with a 95x guarantee.</p>
                </div>
              </div>
            </BlurCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
