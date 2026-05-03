"use client";
import React, { useState } from "react";
import AnoAI from "@/components/ui/animated-shader-background";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { m } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-['Inter'] text-white">
      {/* 3D Animated Shader Background */}
      <AnoAI />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#090b11]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(37,99,235,0.15)]"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-inner">
               <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-[28px] font-bold tracking-tight mb-2">Welcome Back.</h1>
            <p className="text-white/50 text-[14px]">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input 
                type="email" 
                required
                placeholder="name@company.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

             <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input 
                type="password"
                required 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-[13px] pt-1 pb-3">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0" />
                  <span className="text-white/60">Remember me</span>
               </label>
               <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Forgot password?</a>
            </div>

            <button 
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black text-[15px] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200"
            >
              {loading ? (
                 <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                 <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
            
          </form>

          {/* Separation */}
          <div className="my-6 flex items-center gap-4">
             <div className="h-[1px] w-full bg-white/10" />
             <span className="text-[12px] font-medium text-white/40 uppercase tracking-widest">Or</span>
             <div className="h-[1px] w-full bg-white/10" />
          </div>

          <button className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#111111]/50 border border-white/10 text-white/90 text-[14px] font-medium rounded-xl hover:bg-white/5 transition-colors">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg> Continue with GitHub
          </button>

          <p className="text-center text-[14px] text-white/50 mt-8">
            Don't have an account? <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium">Sign up</a>
          </p>

        </m.div>
      </div>
    </div>
  );
}