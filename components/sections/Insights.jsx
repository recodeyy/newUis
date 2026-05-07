"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const formatDate = (ds) => {
  if (!ds) return "RECENT";
  return new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
};

const FALLBACK = [
  { date: "OCT 12, 2024", category: "ENGINEERING", title: "Brutalist Digitalism: The architecture of speed.", excerpt: "Why we reject decorative abstraction for raw performance." },
  { date: "SEP 28, 2024", category: "IDENTITY", title: "Cinematic Product Strategy: Beyond SaaS.", excerpt: "Software that feels like a precision instrument." },
  { date: "AUG 04, 2024", category: "RESEARCH", title: "Calibrating Light: Interface physics.", excerpt: "Our Daylight protocols for accessibility and rhythm." },
  { date: "JUL 19, 2024", category: "CRAFT", title: "The Obsession Manifesto.", excerpt: "On technical perfectionism in MVP-driven mediocrity." }
];

export default function Insights({ posts = [], onViewAll }) {
  const ref = useRef(null);
  const hRef = useRef(null);
  const pRef = useRef(null);
  const dp = posts.length > 0 ? posts.slice(0, 4) : FALLBACK;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = ref.current?.querySelector('[data-label]');
      if (label) gsap.fromTo(label, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: label, start: 'top 90%' } });

      if (hRef.current) {
        const chars = hRef.current.querySelectorAll('[data-char]');
        gsap.fromTo(chars, { y: 80, opacity: 0, rotateX: -50 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.04, ease: 'power4.out', scrollTrigger: { trigger: hRef.current, start: 'top 85%' } });
      }

      if (pRef.current) {
        const els = pRef.current.querySelectorAll('[data-post]');
        gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: pRef.current, start: 'top 80%' } });
        const lines = pRef.current.querySelectorAll('[data-post-line]');
        gsap.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 1.2, stagger: 0.12, ease: 'power4.inOut', transformOrigin: 'left', scrollTrigger: { trigger: pRef.current, start: 'top 80%' } });
      }

      const va = ref.current?.querySelector('[data-view-all]');
      if (va) gsap.fromTo(va, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: va, start: 'top 92%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="insights" data-section className="px-6 md:px-12 lg:px-20 py-32 relative">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div data-label className="inline-flex items-center gap-4 mb-10 opacity-0">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent font-bold">004 / Journal</span>
            </div>
            <h2 ref={hRef} className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-extratight leading-none" style={{ perspective: '800px' }}>
              {"INSIGHTS".split("").map((c, i) => <span key={i} data-char className="inline-block origin-bottom opacity-0 text-accent glow-text-subtle">{c}</span>)}
            </h2>
          </div>
          <div data-view-all className="opacity-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onViewAll?.(); }} className="flex items-center gap-4 group cursor-pointer" data-cursor-hover>
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-all duration-300">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-ink-muted group-hover:text-accent" />
              </div>
              <span className="text-mono text-[9px] uppercase tracking-[0.3em] text-ink-muted group-hover:text-accent transition-all duration-300">View All</span>
            </a>
          </div>
        </div>
        <div ref={pRef} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {dp.map((post, i) => (
            <div key={i} data-post className="opacity-0">
              <Link href={post.slug?.current ? `/insights/${post.slug.current}` : "#"} className="group block" data-cursor-hover>
                <div data-post-line className="h-[1px] w-full bg-border group-hover:bg-accent/40 transition-colors duration-500 mb-8 origin-left" />
                <div className="flex items-center gap-6 mb-5 text-mono text-[9px] uppercase tracking-[0.3em]">
                  <span className="text-accent">{post.publishedAt ? formatDate(post.publishedAt) : (post._createdAt ? formatDate(post._createdAt) : post.date)}</span>
                  <span className="text-ink-muted">{post.category}</span>
                </div>
                <h3 className="text-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-extratight leading-[1.1] mb-5 group-hover:text-accent transition-colors duration-500">{post.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed max-w-xl">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-mono text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 text-accent translate-y-2 group-hover:translate-y-0">
                  <span>Read Entry</span><ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div data-line className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
    </section>
  );
}
