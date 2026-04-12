"use client";
import { useState, useEffect, useRef } from "react";
import { saveWaitlistEmail } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("../ui/SplineWrapper"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

const STATS = [
  { value: "93+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
  { value: "3hrs", label: "Saved / day" },
  { value: "$80k", label: "Saved / mo." },
];

export function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const splineContainerRef = useRef(null);

  useEffect(() => {
    const el = splineContainerRef.current;
    if (!el) return;
    const block = (e) => e.stopPropagation();
    el.addEventListener("wheel", block, { capture: true, passive: false });
    el.addEventListener("mousedown", block, { capture: true });
    el.addEventListener("touchstart", block, { capture: true });
    return () => {
      el.removeEventListener("wheel", block, { capture: true });
      el.removeEventListener("mousedown", block, { capture: true });
      el.removeEventListener("touchstart", block, { capture: true });
    };
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    setStatus("loading");
    const result = await saveWaitlistEmail(email, "hero-section");
    setStatus(result.success ? "success" : "error");
    if (result.success) setEmail("");
  };

  return (
    <section className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-black">

      {/* Spline 3D Background */}
      <div
        ref={splineContainerRef}
        className="absolute inset-0 z-0 pointer-events-auto overflow-hidden flex items-center justify-center"
      >
        <div
          className="flex-none -translate-x-[8%]"
          style={{ width: "160vw", height: "130vh", minWidth: "160vw", minHeight: "130vh" }}
        >
          <Spline scene="https://prod.spline.design/SIlM6P8qATwxscyl/scene.splinecode" />
        </div>
      </div>

      {/* Content — centered layout */}
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10 flex flex-col flex-grow justify-center items-center text-center pt-28 pb-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-[13px] font-medium text-white/40 tracking-widest uppercase mb-6"
        >
          Build smarter products
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[clamp(48px,8vw,100px)] font-bold text-white leading-[1.0] tracking-[-0.04em] mb-6 pointer-events-none"
        >
          Recody
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[16px] text-white/50 max-w-[440px] leading-[1.7] mb-10 pointer-events-none"
        >
          We develop custom management systems and automation solutions — and we're launching 2 new products soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 bg-white text-black text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
          >
            Get started <ArrowRight size={15} />
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 text-white/60 hover:text-white text-[14px] font-medium px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            See our work
          </a>
        </motion.div>
      </div>

      {/* Bottom: horizontal stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 pb-10 px-6 md:px-10 flex justify-center"
      >
        <div className="flex items-stretch gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div key={i} className="bg-black/60 px-8 py-5 flex flex-col gap-1 min-w-[120px] text-center">
              <div className="text-[28px] font-bold text-white tracking-[-0.03em] leading-none">{s.value}</div>
              <div className="text-[12px] text-white/35 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
