"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedText = React.forwardRef(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    const pathVariants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", props.className)}
      >
        <motion.div 
          className="relative group cursor-pointer"
          whileHover="hover"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={cn("text-4xl font-bold text-center transition-all duration-300", textClassName)}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            variants={{
              hover: { 
                scale: 1.05, 
                textShadow: "0 0 30px rgba(255,255,255,0.4)" 
              }
            }}
          >
            {text}
          </motion.h1>

          <motion.svg
            width="100%"
            height="20"
            viewBox="0 0 300 20"
            className={cn("absolute -bottom-2 left-0 w-full overflow-visible", underlineClassName)}
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
              whileHover={{
                d: underlineHoverPath,
                strokeWidth: 6,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                transition: { duration: 0.8 },
              }}
            />
          </motion.svg>
        </motion.div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
