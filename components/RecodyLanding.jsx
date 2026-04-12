"use client";
import { useState, useEffect } from "react";
import { Navbar }       from "./sections/Navbar";
import { Hero }         from "./sections/Hero";
import { Products }     from "./sections/Products";
import { Platform }     from "./sections/Platform";
import { CTA }          from "./sections/CTA";
import { Contact }      from "./sections/Contact";
import { Footer }       from "./sections/Footer";
import { LoadingScreen } from "./ui/LoadingScreen";


export default function RecodyLanding() {
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <LoadingScreen done={!loading} />
      <Navbar scrollY={scrollY} />

      <main>
        <Hero />
        <Products />
        <Platform />

        <CTA />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
