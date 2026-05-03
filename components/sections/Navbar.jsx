"use client";
import { useState, useEffect } from "react";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("services");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 20 && scrolled) {
      setScrolled(false);
    }
  });

  // Auto-highlight active section based on IntersectionObserver
  useEffect(() => {
    const sections = ["services", "process", "reviews", "faq", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "Reviews", id: "reviews" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`fixed top-8 left-0 w-full z-[100] pointer-events-none transition-transform duration-500 ease-out ${scrolled ? "-translate-y-4" : "translate-y-0"}`}>
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 md:px-10">

        {/* ── Logo ── */}
        <div className="pointer-events-auto flex items-center gap-2 cursor-pointer z-50 shrink-0 md:w-[240px]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="text-white font-semibold text-[18px] tracking-tight">Recodey</span>
        </div>

        {/* ── Floating Center Pill ── */}
        <div className="hidden lg:flex flex-1 justify-center items-center overflow-hidden">
          <div className="pointer-events-auto flex items-center gap-1 xl:gap-2 bg-[#0e0e0e]/95 backdrop-blur-xl border border-white/[0.07] rounded-full p-1.5 xl:p-2 w-max shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_40px_rgba(0,0,0,0.7)] flex-nowrap">
            {links.map(({ label, id }) => (
              <div key={id} className="relative z-10 flex shrink-0">
                <a
                  href={`#${id}`}
                  onClick={() => setActive(id)}
                  className={`relative flex items-center justify-center px-4 xl:px-6 py-2 xl:py-2.5 text-[14px] xl:text-[16px] font-medium rounded-full transition-colors duration-200 whitespace-nowrap z-10 ${active === id
                      ? "text-black"
                      : "text-white/60 hover:text-white"
                    }`}
                >
                  {label}
                </a>
                {active === id && (
                  <m.div
                    layoutId="pill-active"
                    className="absolute inset-0 bg-[#b4f481] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right CTAs ── */}
        <div className="pointer-events-auto hidden md:flex items-center justify-end gap-2 xl:gap-4 z-50 shrink-0 md:w-[240px]">
          <a href="/login" className="flex items-center justify-center px-4 xl:px-6 py-2 xl:py-2.5 text-white/60 hover:text-white text-[14px] xl:text-[16px] font-medium rounded-full transition-colors whitespace-nowrap">
            Log in
          </a>
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-full cursor-pointer"
            className="rounded-full px-0 py-0"
            duration={2}
          >
            <a href="/register" className="flex items-center justify-center px-5 xl:px-8 py-2 xl:py-2.5 bg-black text-[#b4f481] text-[14px] xl:text-[16px] font-medium rounded-full whitespace-nowrap">Get started</a>
          </HoverBorderGradient>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          aria-label="Toggle Menu"
          className="pointer-events-auto md:hidden text-white/60 hover:text-white z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto md:hidden absolute top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-xl z-40 flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-2">
              {links.map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => { setActive(id); setMobileOpen(false); }}
                  className={`py-3 text-xl font-medium transition-colors border-b border-white/5 ${active === id ? "text-[#b4f481]" : "text-white/50 hover:text-white"
                    }`}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <button className="w-full py-3 text-white/80 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
                Log in
              </button>
              <button className="w-full py-3 border border-[#b4f481] text-[#b4f481] rounded-xl text-sm font-medium hover:bg-[#b4f481]/10 transition-colors">
                Get started
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
