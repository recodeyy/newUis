"use client";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

function BlurCard({ children, gradient = "from-blue-600 via-indigo-600 to-purple-700", className = "" }) {
  return (
    <HoverBorderGradient
      as="div"
      containerClassName={`rounded-2xl w-full ${className}`}
      className="rounded-2xl bg-[#0a0a0a] w-full p-0"
      duration={3}
    >
      <div className="relative z-10">{children}</div>
    </HoverBorderGradient>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Analyze",
    desc: "A thorough analysis of your current workflows to identify how AI can improve your processes and unlock new efficiencies.",
    detail: "Discovery call → Workflow mapping → Opportunity matrix",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    num: "02",
    title: "Build & Implement",
    desc: "Our developers craft custom AI solutions for your company, continuously prioritising quality, safety, and scalability from day one.",
    detail: "Prototype → Iteration → QA → Production deploy",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
  },
  {
    num: "03",
    title: "Maintain & Improve",
    desc: "After deployment our team keeps working hard, providing ongoing support and continuously improving the implemented solutions.",
    detail: "Monitoring → Monthly reports → Ongoing updates",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
  },
];

export function Platform() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="process" ref={ref} className="py-28 bg-black border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[clamp(36px,6vw,64px)] font-bold text-white tracking-[-0.04em] leading-[1.05] mb-16"
        >
          The <span className="text-blue-400">process</span>.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <BlurCard gradient={s.gradient} className="h-full">
                <div className="p-7 flex flex-col gap-4 min-h-[280px]">
                  {/* Giant watermark number */}
                  <div className="absolute top-4 right-6 text-[80px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                    {s.num}
                  </div>

                  {/* Step pill */}
                  <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Step {s.num}
                  </div>

                  <h3 className="text-[21px] font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-white/45 leading-[1.7] flex-grow">{s.desc}</p>

                  <div className="border-t border-white/5 pt-4 text-[11px] text-white/20 font-mono leading-[1.8]">
                    {s.detail}
                  </div>
                </div>
              </BlurCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
