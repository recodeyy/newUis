"use client";
import { motion } from "framer-motion";

export function LoadingScreen({ done }) {
  return (
    <div 
      className={`fixed inset-0 bg-[#08090E] flex flex-col items-center justify-center z-[200] transition-opacity duration-800 ease-in-out ${done ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
    >
      <div className="w-[70px] h-[70px] bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[18px] flex items-center justify-center animate-[loadingPulse_1.2s_ease-in-out_infinite] shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-7">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      <div className="w-[180px] h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 animate-[loadingBar_1.8s_cubic-bezier(0.65,0,0.35,1)_forwards]" />
      </div>
    </div>
  );
}
