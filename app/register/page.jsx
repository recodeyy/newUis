"use client";
import React, { useState } from "react";
import AnoAI from "@/components/ui/animated-shader-background";
import { ArrowRight, Lock, Mail, User, Shield, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => window.location.href = "/", 1500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-['Inter'] text-white">
      {/* 3D Animated Shader Background */}
      <AnoAI />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[460px] px-6">
        
        <m.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#090b11]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_0_80px_rgba(16,185,129,0.1)]"
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-10 px-4">
             {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border ${step >= i ? 'bg-[#b4f481] text-black border-[#b4f481]' : 'bg-transparent text-white/40 border-white/10'} transition-all duration-300`}>
                    {step > i ? <CheckCircle2 size={16} /> : i}
                  </div>
                  {i < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded-full ${step > i ? 'bg-[#b4f481]/50' : 'bg-white/5'} transition-all`} />
                  )}
                </div>
             ))}
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-inner">
               <Shield className="w-6 h-6 text-[#b4f481]" />
            </div>
            <h1 className="text-[28px] font-bold tracking-tight mb-2">
              {step === 1 ? "Create Account." : step === 2 ? "Company Details." : "Secure Password."}
            </h1>
            <p className="text-white/50 text-[14px] text-center max-w-[280px]">
               {step === 1 ? "Let's get you set up with your new workspace profile." : step === 2 ? "Tell us a bit about your organization." : "Your password must be at least 8 characters long."}
            </p>
          </div>

          <form onSubmit={handleNext} className="flex flex-col gap-4">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <m.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="relative w-full">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input type="text" required placeholder="First name" className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                    </div>
                    <div className="relative w-full">
                      <input type="text" required placeholder="Last name" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                    </div>
                  </div>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input type="email" required placeholder="name@company.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                  </div>
                </m.div>
              )}

              {step === 2 && (
                <m.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-4">
                  <div className="relative">
                    <BriefcaseBusiness className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input type="text" required placeholder="Company Name" className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                  </div>
                  <div className="relative mt-2">
                    <select required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-[15px] font-medium text-white/70 appearance-none focus:outline-none focus:border-[#b4f481]/50 transition-colors cursor-pointer">
                       <option value="" disabled selected>Company Size</option>
                       <option value="1-10">1 - 10 employees</option>
                       <option value="11-50">11 - 50 employees</option>
                       <option value="51-200">51 - 200 employees</option>
                       <option value="200+">200+ employees</option>
                    </select>
                  </div>
                </m.div>
              )}

              {step === 3 && (
                <m.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-4">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input type="password" required placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input type="password" required placeholder="Confirm password" className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-3.5 text-[15px] font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#b4f481]/50 transition-colors" />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <button 
              disabled={loading}
              className={`flex items-center justify-center gap-2 w-full mt-4 py-3.5 ${step === 3 ? 'bg-[#b4f481] hover:bg-[#a3e370] text-black' : 'bg-white hover:bg-white/90 text-black'} text-[15px] font-semibold rounded-xl transition-all duration-200`}
            >
               {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
               ) : (
                  <>
                    {step === 3 ? "Complete Registration" : "Continue"} 
                    {step !== 3 && <ArrowRight size={18} />}
                  </>
               )}
            </button>
            
          </form>

          <p className="text-center text-[14px] text-white/50 mt-8">
            Already have an account? <a href="/login" className="text-white hover:text-[#b4f481] font-medium">Log in</a>
          </p>

        </m.div>
      </div>
    </div>
  );
}