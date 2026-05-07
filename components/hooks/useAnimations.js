"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: Scroll-triggered text line reveal
 * Splits text into lines and animates them in with stagger
 */
export function useTextReveal(containerRef, options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const targets = el.querySelectorAll('[data-reveal]');
    
    targets.forEach((target) => {
      gsap.fromTo(target, 
        { 
          y: 60, 
          opacity: 0,
          rotateX: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none none',
            ...options,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [containerRef, options]);
}

/**
 * Hook: Parallax effect on an element
 */
export function useParallax(ref, speed = 50) {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.to(ref.current, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => tl.kill();
  }, [ref, speed]);
}

/**
 * Hook: Horizontal scroll section
 */
export function useHorizontalScroll(containerRef, scrollRef) {
  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const totalWidth = scrollRef.current.scrollWidth - window.innerWidth;

    const tl = gsap.to(scrollRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => tl.kill();
  }, [containerRef, scrollRef]);
}

/**
 * Hook: Scale + fade reveal on scroll
 */
export function useScaleReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.fromTo(ref.current,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => tl.kill();
  }, [ref]);
}

/**
 * Hook: Staggered children reveal
 */
export function useStaggerReveal(containerRef, selector = '[data-stagger]') {
  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll(selector);
    if (!children.length) return;

    gsap.fromTo(children,
      { y: 80, opacity: 0, rotateX: -10 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [containerRef, selector]);
}

/**
 * Hook: Line draw animation
 */
export function useLineReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [ref]);
}
