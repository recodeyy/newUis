"use client";
import { useState, useEffect } from "react";
import { m } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <section className="min-h-[100dvh] flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Decorative Blur Element */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!isMobile && <Spline scene="https://prod.spline.design/0idJjep310m2C2F2/scene.splinecode" />}
        {!isMobile && <div className="absolute bottom-0 right-0 w-[200px] h-[60px] bg-[#050505] z-[100] pointer-events-none" />}
        {isMobile && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/15 via-black to-[#050505] opacity-40" />
        )}
      </div>

      {/* Content */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] w-full mx-auto px-6 md:px-10 relative z-10 flex flex-col flex-grow justify-center items-center text-center pt-28 pb-10 pointer-events-none"
      >
        <m.p variants={itemVariants} className="text-[12px] font-bold text-white/20 tracking-[0.3em] uppercase mb-10">
          The new standard of AI
        </m.p>

        <m.div variants={itemVariants} className="pointer-events-auto">
          <AnimatedText
            text="Recodey"
            className="z-20 mb-10 font-outfit"
            textClassName="text-[clamp(64px,11vw,140px)] font-bold text-white leading-[0.8] tracking-[-0.06em]"
            underlineClassName="text-blue-500/40"
          />
        </m.div>

        <m.p
          variants={itemVariants}
          className="text-[18px] md:text-[21px] text-white/35 max-w-[500px] leading-[1.6] mb-14 font-medium pointer-events-none tracking-tight"
        >
          Specialized AI management systems and high-end automation tailored for modern boutique enterprises.
        </m.p>

        <m.div variants={itemVariants} className="flex items-center gap-7 pointer-events-auto">
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-xl cursor-pointer"
            className="rounded-xl px-0 py-0"
            duration={1.5}
          >
            <a
              href="#contact"
              className="flex items-center gap-2 bg-white text-black text-[15px] font-bold px-10 py-4.5 rounded-xl transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Get started <ArrowRight size={16} />
            </a>
          </HoverBorderGradient>

          <a
            href="#services"
            className="text-white/40 text-[14px] font-bold tracking-tight hover:text-white transition-colors px-6 py-4"
          >
            See services
          </a>
        </m.div>
      </m.div>

      {/* Bottom: horizontal stats bar */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="relative z-10 pb-10 px-6 md:px-10 flex justify-center"
      >
        <div className="flex items-stretch gap-px bg-white/[0.04] border border-white/[0.04] rounded-[36px] overflow-hidden backdrop-blur-2xl">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-black/30 px-12 py-8 flex flex-col gap-1.5 min-w-[160px] text-center border-r border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-[36px] font-extrabold text-white tracking-tighter leading-none">{s.value}</div>
              <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.25em]">{s.label}</div>
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
