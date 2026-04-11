"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FloatingElement({ children, depth = 1 }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * depth, -100 * depth]);
    const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div ref={ref} style={{ y: springY }} className="relative z-10 w-fit">
            {children}
            {/* Soft inner glow inspired by Nova-Glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-[30px] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
        </motion.div>
    );
}
