"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Recodey didn't just build our platform; they redefined our digital architecture. The performance gains were immediate, and the cinematic identity elevated our brand beyond the competition.",
    author: "Elena Rostova",
    role: "CTO, NextGen Logistics",
    company: "NextGen"
  },
  {
    quote: "The seamless integration of AI into our workflows transformed how we operate. Their engineering precision is unmatched.",
    author: "Marcus Vance",
    role: "Founder, Apex AI",
    company: "Apex"
  },
  {
    quote: "A rare combination of brutalist aesthetics and hyper-optimized code. They delivered a product that looks like the future and runs perfectly.",
    author: "Sarah Jenks",
    role: "Head of Product, Solara",
    company: "Solara"
  }
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      const label = sectionRef.current?.querySelector('[data-label]');
      if (label) {
        gsap.fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 90%' } });
      }

      // Cards animation
      const cards = sectionRef.current?.querySelectorAll('[data-testimonial]');
      if (cards) {
        gsap.fromTo(cards, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 bg-bg overflow-hidden border-t border-border">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <div data-label className="mb-20 text-center flex flex-col items-center opacity-0">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent/50" />
            <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">Client Validation</span>
            <div className="w-8 h-[1px] bg-accent/50" />
          </div>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-extratight uppercase">
            Proven <span className="text-accent glow-text">Impact</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={trackRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div 
              key={i} 
              data-testimonial
              className="group relative bg-bg-surface border border-border p-8 md:p-10 hover:border-accent/30 transition-colors duration-500 flex flex-col justify-between opacity-0"
              data-cursor-hover
            >
              {/* Decorative brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-accent/0 group-hover:border-accent/40 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-accent/0 group-hover:border-accent/40 transition-all duration-500" />

              <Quote className="w-8 h-8 text-accent/20 mb-8 group-hover:text-accent/50 transition-colors duration-500" aria-hidden="true" />
              
              <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-10 flex-1">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between border-t border-border/50 pt-6">
                <div>
                  <div className="text-white font-bold tracking-tight mb-1">{testimonial.author}</div>
                  <div className="text-mono text-[9px] uppercase tracking-[0.2em] text-accent">{testimonial.role}</div>
                </div>
                <div className="text-mono text-[10px] text-ink-muted/30 uppercase tracking-widest hidden lg:block">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
