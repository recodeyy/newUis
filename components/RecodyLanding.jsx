"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client } from '../sanity/lib/client';
import SmoothScroll from './SmoothScroll';

// Section components
import Nav from './sections/Navbar';
import Hero from './sections/Hero';
import Ticker from './sections/Ticker';
import About from './sections/About';
import Projects from './sections/Products';
import Services from './sections/Services';
import Story from './sections/Story';
import Insights from './sections/Insights';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ContactModal from './sections/Contact';
import BlogsModal from './sections/BlogsModal';
import Preloader from './sections/Preloader';

gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
const CustomCursor = () => {
  const ringX = useSpring(0, { damping: 20, stiffness: 300 });
  const ringY = useSpring(0, { damping: 20, stiffness: 300 });
  const dotX = useSpring(0, { damping: 40, stiffness: 500 });
  const dotY = useSpring(0, { damping: 40, stiffness: 500 });
  const ringScale = useSpring(1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => ringScale.set(0.8);
    const handleMouseUp = () => ringScale.set(1);

    // Expand cursor on hoverable elements
    const handleMouseEnter = () => ringScale.set(1.8);
    const handleMouseLeave = () => ringScale.set(1);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover detection for interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [ringX, ringY, dotX, dotY, ringScale]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-accent/30 rounded-full pointer-events-none z-[10000] hidden md:block mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: ringScale, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-accent rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

// --- Main Content ---
const MainContent = ({ onReboot }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const mainRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc) { title, slug, category, publishedAt, _createdAt, excerpt }`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Global GSAP scroll-triggered section reveals
  useEffect(() => {
    if (!mainRef.current) return;

    // Skip GSAP animations for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const sections = mainRef.current.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const lines = section.querySelectorAll('[data-line]');
        lines.forEach((line) => {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.8,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={mainRef} className="min-h-screen bg-bg selection:bg-accent selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-accent focus:text-white focus:px-4 focus:py-2">
          Skip to main content
        </a>

        <Nav onOpenContact={() => setIsContactOpen(true)} onLogoClick={onReboot} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <BlogsModal isOpen={isBlogsOpen} onClose={() => setIsBlogsOpen(false)} blogs={posts} />

        <main id="main-content">
          <Hero />
          <Ticker />
          <About />
          <Projects />
          <Services />
          <Story />
          <Insights posts={posts} onViewAll={() => setIsBlogsOpen(true)} />
          <CTA onOpenContact={() => setIsContactOpen(true)} />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

import ConsoleEasterEggs from './ConsoleEasterEggs';

// --- App Entry ---
export default function App() {
  const [loading, setLoading] = useState(true);

  const handleReboot = () => {
    setLoading(true);
  };

  return (
    <>
      <ConsoleEasterEggs />
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MainContent onReboot={handleReboot} />
          </motion.div>
        )}
      </AnimatePresence>
      <CustomCursor />
    </>
  );
}
