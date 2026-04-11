"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  
  // Interactive Flame/Glow Logic
  // This replaces CanvasFlame/Lighting cursor with native Framer Motion
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
     return null;
  }

  return (
    <>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0 : 1,  // The inner dot disappears on hover
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full h-full bg-blue-500/80 rounded-full blur-[2px]" />
      </motion.div>
      
      {/* Outer Glow Ring (Lighting Cursor inspired) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] rounded-full"
        animate={{
          scale: isHovering ? 3 : 1.5,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      >
         <div className="w-full h-full border border-emerald-400 rounded-full bg-emerald-500/10 backdrop-blur-sm" />
      </motion.div>
    </>
  );
}
