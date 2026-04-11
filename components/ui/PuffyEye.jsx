"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function PuffyEye({ size = 120 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef(null);
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Calculate eye center position
    const calculateCenter = () => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        setEyeCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    calculateCenter();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", calculateCenter);
    window.addEventListener("resize", calculateCenter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", calculateCenter);
      window.removeEventListener("resize", calculateCenter);
    };
  }, []);

  const dx = mousePosition.x - eyeCenter.x;
  const dy = mousePosition.y - eyeCenter.y;
  const angle = Math.atan2(dy, dx);
  
  const maxDistance = size * 0.2; 
  const distance = Math.min(Math.sqrt(dx*dx + dy*dy) * 0.15, maxDistance);

  const pupilX = eyeCenter.x === 0 ? 0 : Math.cos(angle) * distance;
  const pupilY = eyeCenter.y === 0 ? 0 : Math.sin(angle) * distance;

  const springX = useSpring(pupilX, { stiffness: 400, damping: 30 });
  const springY = useSpring(pupilY, { stiffness: 400, damping: 30 });

  return (
    <div 
      className="relative rounded-full bg-white flex items-center justify-center overflow-hidden" 
      style={{ 
        width: size, 
        height: size, 
        boxShadow: 'inset 0px -6px 15px rgba(0,0,0,0.15), 0 4px 20px rgba(255,255,255,0.03)' 
      }}
    >
       <motion.div 
         ref={eyeRef}
         className="absolute bg-[#090b11] rounded-full flex items-center justify-center" 
         style={{ 
           width: size * 0.45, 
           height: size * 0.45,
           x: springX,
           y: springY
         }}
       >
          <div className="w-[30%] h-[30%] bg-white/30 rounded-full translate-x-[-30%] translate-y-[-30%]" />
       </motion.div>
    </div>
  );
}
