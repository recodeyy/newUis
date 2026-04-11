"use client";
import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function GlitchText({ text, as: Component = "span", className = "", stagger = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  
  // Scramble effect
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      let iteration = 0;
      intervalId = setInterval(() => {
        setDisplayText((prev) =>
          prev.split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }

        iteration += 1 / 3; 
      }, 30);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, text]);

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ whiteSpace: "nowrap" }}
    >
      <span className="invisible">{text}</span> {/* Placeholder for width */}
      <span className="absolute top-0 left-0">
        {displayText}
      </span>
      {/* Ghosting GLitch layer */}
      {isHovered && (
        <motion.span 
          initial={{ opacity: 0, x: -2 }}
          animate={{ opacity: [0, 0.8, 0], x: [-2, 2, -2] }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 text-emerald-400 mix-blend-screen opacity-50"
        >
          {displayText}
        </motion.span>
      )}
       {isHovered && (
        <motion.span 
          initial={{ opacity: 0, x: 2 }}
          animate={{ opacity: [0, 0.8, 0], x: [2, -2, 2] }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "linear", delay: 0.1 }}
          className="absolute top-0 left-0 text-blue-500 mix-blend-screen opacity-50"
        >
          {displayText}
        </motion.span>
      )}
    </Component>
  );
}
