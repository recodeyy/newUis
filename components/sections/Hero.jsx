"use client";
import { useState } from "react";
import { saveWaitlistEmail } from "@/lib/firebase";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedText } from "../ui/animated-underline-text-one";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

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

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    setStatus("loading");
    const result = await saveWaitlistEmail(email, "hero-section");
    setStatus(result.success ? "success" : "error");
    if (result.success) setEmail("");
  };

  return (
    <section className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-black">

      {/* Spline 3D Background — interactive with cursor */}
      <div className="absolute inset-0 z-0 overflow-hidden [&>div>canvas]{pointer-events:auto}">
        <Spline scene="https://prod.spline.design/0idJjep310m2C2F2/scene.splinecode" />
        {/* Physical mask to hide the Spline watermark (which is rendered in Shadow DOM) */}
        <div className="absolute bottom-0 right-0 w-[200px] h-[60px] bg-black z-[100] pointer-events-none" />
      </div>

      {/* Content — centered layout, pointer-events pass through to Spline */}
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10 flex flex-col flex-grow justify-center items-center text-center pt-28 pb-10 pointer-events-none">

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-[13px] font-medium text-white/40 tracking-widest uppercase mb-6"
        >
          Build smarter products
        </motion.p>

        <AnimatedText
          text="Recodey"
          className="pointer-events-auto z-20 mb-6 mt-[-10px]"
          textClassName="text-[clamp(48px,8vw,100px)] font-bold text-white leading-[1.0] tracking-[-0.04em]"
          underlineClassName="text-white/80"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[16px] md:text-[18px] text-white/50 max-w-[440px] leading-[1.7] mb-10 pointer-events-none"
        >
          Bespoke management systems and intelligent automation for modern enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl cursor-pointer"
            className="rounded-xl px-0 py-0"
            duration={1.5}
          >
            <a href="#contact" className="flex items-center gap-2 bg-white text-black text-[14px] font-semibold px-6 py-3 rounded-xl">
              Get started <ArrowRight size={15} />
            </a>
          </HoverBorderGradient>

          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl cursor-pointer"
            className="rounded-xl px-0 py-0"
            duration={2}
          >
            <a href="#services" className="flex items-center gap-2 bg-black text-white/70 text-[14px] font-medium px-5 py-3 rounded-xl">
              See our work
            </a>
          </HoverBorderGradient>
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
