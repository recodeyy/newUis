"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus, Monitor, Code, Zap, Globe, Layers, Circle, X } from 'lucide-react';
import { client } from '../sanity/lib/client';

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
};

// --- COMPONENTS ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ringX = useSpring(0, { damping: 25, stiffness: 250 });
  const ringY = useSpring(0, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ringX, ringY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[32px] h-[32px] border border-ink/20 rounded-full pointer-events-none z-[10000]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

const Preloader = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const logMessages = [
    "Initializing neural kernel...",
    "Calibrating nodes...",
    "Mounting interface_v4.0.1...",
    "Security_check: PASSED",
    "Connecting to node_09...",
    "Parsing aesthetic weights...",
    "Daylight_protocols: ACTIVE",
    "Finalizing_session..."
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, { msg: logMessages[logIndex], time: new Date().toLocaleTimeString() }]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1000);
          return 100;
        }
        const step = prev > 80 ? 1 : Math.floor(Math.random() * 12) + 2;
        return Math.min(prev + step, 100);
      });
    }, 40);
    
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onFinish]);

  return (
    <motion.div
      exit={{ 
        y: '-100%',
        transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1], staggerChildren: 0.1 } 
      }}
      className="fixed inset-0 bg-ink z-[11000] flex items-center justify-center p-6 overflow-hidden"
    >
      <motion.div 
        exit={{ opacity: 0, y: -20, transition: { duration: 0.8 } }}
        className="w-full max-w-5xl flex flex-col md:flex-row items-end justify-between gap-12 relative z-10"
      >
        <div className="flex-1 w-full">
          <div className="text-white text-mono text-[9px] uppercase tracking-[0.2em] space-y-2 h-48 overflow-hidden text-left relative">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4"
                >
                  <span className="text-accent opacity-60">[{log.time}]</span> {log.msg}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
          </div>
          
          <div className="mt-12 h-[1px] w-full bg-white/10 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(255,61,0,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        <div className="flex flex-col items-end text-right">
          <div className="text-white text-display text-[10rem] md:text-[18rem] font-black italic tracking-tightest leading-[0.75] relative">
            {count}
            <span className="text-accent text-3xl absolute -right-8 top-12">%</span>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-accent" />
            <div className="text-accent text-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              System_Integrity_Check
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Scanning Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-accent/30 z-[1] shadow-[0_0_10px_rgba(255,61,0,0.5)]"
      />
    </motion.div>
  );
};

const TechnicalBackground = ({ scrollYProgress }) => {
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const hudY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
      <motion.div 
        style={{ y: gridY }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" 
      />
      
      {/* Moving Scanner Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-accent/20 blur-sm"
      />

      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-ink/20" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-ink/20" />
      <div className="absolute top-0 left-3/4 w-[1px] h-full bg-ink/20" />
      
      {/* Floating HUD Elements */}
      <motion.div 
        style={{ y: hudY }}
        className="absolute top-12 left-12 text-mono text-[8px] uppercase tracking-widest space-y-1"
      >
        <div>LAT: 37.7749 / LON: -122.4194</div>
        <div>CORE_TEMP: 32Â°C / UPTIME: 3.2K_HRS</div>
      </motion.div>
      
      <motion.div 
        style={{ y: hudY }}
        className="absolute bottom-12 right-12 text-mono text-[8px] uppercase tracking-widest text-right space-y-1"
      >
        <div>REF_SEC: 04.0.1 / BOOT_LEVEL: PRIME</div>
        <div className="flex justify-end gap-2">
          <div>NETWORK_STABLE</div>
        </div>
      </motion.div>
  
      {/* Subtle Perspective Lines */}
      <div className="absolute inset-0 [perspective:1000px]">
        <motion.div 
          style={{ opacity: lineOpacity }}
          className="absolute inset-0 [transform:rotateX(60deg)]"
        >
          <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] [background-size:100%_40px]" />
        </motion.div>
      </div>
    </div>
  );
};

const Ticker = () => {
  const items = ["ARCHITECTURE", "●", "ENGINEERING", "●", "EXPERIENCE", "●", "STRATEGY", "●", "MOTION", "●"];
  return (
    <div className="bg-ink text-white py-6 overflow-hidden whitespace-nowrap border-y border-white/10 uppercase font-mono text-[11px] tracking-[0.3em]">
      <div className="animate-ticker flex items-center">
        {[...Array(8)].map((_, idx) => (
          items.map((item, i) => (
            <span key={`${idx}-${i}`} className={`mx-8 ${item === '●' ? 'text-accent' : 'opacity-60'}`}>
              {item}
            </span>
          ))
        ))}
      </div>
    </div>
  );
};

const NavItem = ({ href, children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="hover:text-accent transition-colors py-2 px-1"
    >
      {children}
    </motion.a>
  );
};

const Nav = ({ onOpenContact }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-[5000] px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-10 h-10 bg-accent flex items-center justify-center hard-shadow transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
          <Zap className="text-white w-5 h-5 fill-current" />
        </div>
        <span className="text-display font-black text-2xl italic tracking-extratight glitch-text" data-text="RECODEY">RECODEY</span>
      </div>
      
      <div className="hidden md:flex gap-10 text-mono text-[10px] items-center pointer-events-auto bg-bg py-2 px-8 border border-ink shadow-sm">
        <NavItem href="#about">EST. 2024</NavItem>
        <NavItem href="#projects">PROJECTS</NavItem>
        <NavItem href="#services">SERVICES</NavItem>
        <NavItem href="#insights">INSIGHTS</NavItem>
        <motion.button 
          onClick={onOpenContact}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-ink text-white px-4 py-1 hover:bg-accent transition-colors"
        >
          CONNECT
        </motion.button>
      </div>

      <div className="pointer-events-auto block md:hidden" onClick={onOpenContact}>
        <div className="w-10 h-10 border border-ink flex items-center justify-center bg-white hard-shadow-accent">
          <Plus className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ title, desc, tag, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ 
      duration: 1.2,
      delay, 
      ease: [0.16, 1, 0.3, 1] 
    }}
    whileHover={{ y: -8 }}
    className="group bg-white border-2 border-ink p-8 hard-shadow-accent transition-all duration-500 flex flex-col justify-between min-h-[360px] cursor-pointer"
  >
    <div>
      <div className="w-12 h-12 bg-bg border border-ink mb-8 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-500">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-display text-3xl font-bold italic tracking-extratight mb-4 group-hover:text-accent transition-colors duration-500">{title}</h3>
      <p className="text-ink/60 text-sm leading-relaxed mb-6 group-hover:text-ink transition-colors">{desc}</p>
    </div>
    <div className="flex items-center justify-between py-4 border-t border-ink/10">
      <span className="text-mono text-[10px] uppercase tracking-widest text-accent font-bold">{tag}</span>
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUpRight className="w-4 h-4" />
      </motion.div>
    </div>
  </motion.div>
);

const ServiceRow = ({ num, title, icon: Icon }) => (
  <div className="group border-b border-ink/10 py-12 flex flex-col md:flex-row md:items-center justify-between hover:px-6 transition-all duration-500 cursor-pointer bg-transparent hover:bg-accent hover:text-white">
    <div className="flex items-center gap-10">
      <span className="text-mono text-xs opacity-40 group-hover:opacity-100 group-hover:text-white">{num}</span>
      <h3 className="text-display text-4xl md:text-6xl font-black italic tracking-extratight">{title}</h3>
    </div>
    <div className="mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <Icon className="w-12 h-12 stroke-[1]" />
    </div>
  </div>
);

const SectionLabel = ({ text }) => (
  <div className="inline-flex items-center gap-3 mb-8 reveal-on-scroll">
    <div className="w-10 h-[1px] bg-accent" />
    <span className="text-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold">{text}</span>
  </div>
);

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

const HUD = () => (
  <div className="fixed inset-0 pointer-events-none z-[6000] p-6 text-mono text-[8px] uppercase tracking-[0.2em] opacity-40 flex flex-col justify-between items-start">
    <div className="w-full flex justify-between items-start">
      <div className="space-y-1"></div>
      <div className="text-right">
        <div>CALIBRATION: 100%</div>
        <div>SYNCING_WITH_NODE_09</div>
      </div>
    </div>
    <div className="w-full flex justify-between items-end">
      <div className="flex gap-4">
        <div className="flex items-center gap-1"><Circle className="w-1.5 h-1.5 fill-current text-accent" /> LIVE</div>
        <div>PROTO_BETA</div>
      </div>
      <div>Â©2024_RECODEY</div>
    </div>
  </div>
);

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-ink/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 lg:top-8 lg:right-8 w-12 h-12 border border-ink flex items-center justify-center hover:bg-accent hover:text-white transition-colors z-20 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Editorial Side */}
            <div className="bg-ink p-12 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>
              
              <div className="relative z-10">
                <div className="text-accent text-mono text-[10px] tracking-[0.5em] mb-8 font-bold">ESTABLISH CONTACT</div>
                <h2 className="text-display text-5xl font-black italic tracking-extratight leading-none mb-12">
                  START A <br /> NEW DEFAULT.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-xs">
                  Selective partnerships for organizations that demand uncompromising performance.
                </p>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="text-mono text-[8px] opacity-40 uppercase tracking-widest">Direct Access</div>
                <div className="text-display text-2xl italic font-bold">v1@recodey.studio</div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 lg:p-16 pt-24 lg:pt-16">
               <form className="space-y-8 lg:space-y-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <label className="text-mono text-[10px] uppercase font-bold tracking-widest block opacity-40">Identity</label>
                    <input 
                      type="text" 
                      placeholder="NAME / ORGANIZATION" 
                      className="w-full bg-transparent border-b border-ink/20 py-4 text-display text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-mono text-[10px] uppercase font-bold tracking-widest block opacity-40">Protocol</label>
                    <input 
                      type="email" 
                      placeholder="EMAIL_ADDRESS" 
                      className="w-full bg-transparent border-b border-ink/20 py-4 text-display text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-mono text-[10px] uppercase font-bold tracking-widest block opacity-40">Brief</label>
                    <textarea 
                      rows={2}
                      placeholder="PROJECT SCOPE" 
                      className="w-full bg-transparent border-b border-ink/20 py-4 text-display text-2xl focus:outline-none focus:border-accent transition-colors placeholder:opacity-20 resize-none"
                    />
                  </div>

                  <button className="w-full bg-ink text-white py-6 lg:py-8 text-mono text-sm font-black tracking-widest hover:bg-accent hover:-translate-y-1 transition-all hard-shadow-accent">
                    SUBMIT BRIEF
                  </button>
               </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const BlogsModal = ({ isOpen, onClose, blogs }) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-ink/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-4xl h-[80vh] overflow-hidden relative shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 lg:top-8 lg:right-8 w-12 h-12 border border-ink flex items-center justify-center hover:bg-accent hover:text-white transition-colors z-20 group bg-white"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="p-8 lg:p-12 border-b border-ink/10 relative z-10 bg-white">
               <div className="text-accent text-mono text-[10px] tracking-[0.5em] mb-4 font-bold">ARCHIVES</div>
               <h2 className="text-display text-4xl md:text-5xl font-black italic tracking-extratight leading-none">
                 ALL INSIGHTS
               </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
              {blogs.map((post, i) => (
                <div key={i} className="group cursor-pointer border-b border-ink/5 pb-12 last:border-0 last:pb-0">
                  <div className="flex items-center gap-6 mb-4 text-mono text-[10px] uppercase font-bold tracking-widest text-accent">
                    <span>{post.publishedAt ? formatDate(post.publishedAt) : post.date}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-ink/20 group-hover:bg-accent transition-colors" />
                    <span className="text-ink/40">{post.category}</span>
                  </div>
                  <h3 className="text-display text-2xl md:text-4xl font-bold italic tracking-extratight leading-[1.1] group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainContent = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const coreParallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const coreRotateY = useTransform(scrollYProgress, [0, 1], [5, 25]);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Nav onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <BlogsModal isOpen={isBlogsOpen} onClose={() => setIsBlogsOpen(false)} blogs={posts} />

      <main className="pt-32">
        
        {/* HERO */}
        <section ref={heroRef} className="relative px-6 md:px-12 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <TechnicalBackground scrollYProgress={scrollYProgress} />

          <div className="lg:col-span-7 relative z-10">
            <div className="overflow-hidden mb-12">
              <motion.h1 
                className="text-display text-7xl md:text-[8rem] lg:text-[10rem] font-black italic tracking-extratight leading-[0.85]"
              >
                {"ENGINEERING".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', rotateX: -45, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.05 }}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                {"DAYLIGHT".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', rotateX: -45, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 + i * 0.05 }}
                    className="inline-block origin-bottom"
                  >
                    {char}
                    {char === 'T' && i === 6 && (
                       <motion.span 
                         initial={{ scaleX: 0 }}
                         animate={{ scaleX: 1 }}
                         transition={{ delay: 1.5, duration: 1 }}
                         className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-8 md:h-20 bg-accent -z-10 opacity-20 origin-left" 
                       />
                    )}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <Reveal delay={1.6}>
              <div className="max-w-xl flex flex-col md:flex-row gap-8 items-start">
                <p className="text-ink/60 text-lg leading-snug font-medium border-l-2 border-accent pl-6">
                  Recodey is an architectural tech studio forging deep-state software 
                  and cinematic identity for the next industrial era.
                </p>
                <button className="flex-shrink-0 bg-ink text-white px-8 py-4 rounded-none hard-shadow-accent hover:-translate-y-1 transition-all flex items-center gap-3 group">
                  <span className="text-mono text-xs font-bold tracking-widest">START PROJECT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 hidden lg:block relative h-full min-h-[600px]">
            <div className="relative w-full h-full [perspective:2000px] flex items-center justify-center">
              <motion.div 
                style={{ y: coreParallaxY, rotateY: coreRotateY, rotateX: 5 }}
                className="relative w-[360px] h-[540px] [transform-style:preserve-3d]"
              >
                {/* THE CORE SCHEMATIC */}
                <div className="absolute inset-x-0 bottom-0 top-0 border-x border-ink/5 flex items-center justify-center">
                  
                  {/* Rotating Structural Rings (Architecture) */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        rotateZ: i % 2 === 0 ? 360 : -360,
                        rotateX: [60, 70, 60],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{ 
                        rotateZ: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                        rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute border border-ink/20 rounded-full h-full aspect-square"
                      style={{ 
                        width: `${100 + i * 25}%`,
                        transform: `rotateX(65deg)`
                      }}
                    />
                  ))}

                  {/* Central Monolith (Engineering) */}
                  <motion.div 
                    animate={{ 
                      y: [0, -20, 0],
                      boxShadow: [
                        "0 0 30px rgba(255,61,0,0.1)", 
                        "0 0 100px rgba(255,61,0,0.4)", 
                        "0 0 30px rgba(255,61,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-64 h-[400px] bg-white border-2 border-ink relative z-20 flex flex-col items-center justify-center hard-shadow-accent"
                  >
                    {/* Interior Wireframe */}
                    <div className="absolute inset-6 border border-ink/5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-6">
                      <Zap className="text-accent w-14 h-14 fill-current" />
                      <div className="text-display text-4xl font-black italic tracking-extratight leading-none opacity-20">BUILD</div>
                    </div>

                    {/* Scanning Laser */}
                    <motion.div 
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-x-[-25%] h-[3px] bg-accent blur-[1px] z-30 shadow-[0_0_15px_rgba(255,61,0,0.8)]"
                    />
                  </motion.div>

                  {/* Floating Pillar Tags (Experience) */}
                  {[
                    { label: "01_ARCHITECTURE", x: -260, y: -200, icon: Layers },
                    { label: "02_ENGINEERING", x: 260, y: -40, icon: Code },
                    { label: "03_EXPERIENCE", x: -240, y: 180, icon: Monitor }
                  ].map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: tag.x, y: tag.y }}
                      transition={{ delay: 1 + i * 0.3, type: "spring", stiffness: 50 }}
                      className="absolute pointer-events-auto group z-50"
                    >
                      <div className={`flex items-center gap-6 ${tag.x < 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-12 h-[1px] bg-accent group-hover:w-20 transition-all duration-500" />
                        <div className="bg-ink text-white p-5 hard-shadow-accent flex flex-col gap-1 min-w-[180px]">
                          <div className="flex justify-between items-center mb-2">
                            <tag.icon className="w-4 h-4 text-accent" />
                          </div>
                          <div className="text-mono text-[10px] font-black tracking-[0.2em]">{tag.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Perspective Guide Lines */}
                <svg className="absolute inset-[-100%] w-[300%] h-[300%] pointer-events-none opacity-5 -z-20" viewBox="0 0 1200 1200">
                  <path d="M 600 600 L 0 0 M 600 600 L 1200 0 M 600 600 L 1200 1200 M 600 600 L 0 1200" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>
            </div>
            
            {/* Ambient System Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[180px] -z-10" />
          </div>

        </section>

        <Ticker />

        {/* ABOUT */}
        <section id="about" className="px-6 md:px-12 py-32 border-b border-ink/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <Reveal>
              <SectionLabel text="STRENGTH IN CODE" />
              <h2 
                className="text-display text-5xl md:text-7xl font-bold italic tracking-extratight leading-none max-w-lg glitch-text interactive cursor-default"
                data-text="We don't build features. We build foundations."
              >
                We don't build features. We build foundations.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-10 text-xl text-ink/80 leading-relaxed font-sans mt-0 md:mt-24">
                <p>
                  In an era defined by ephemeral design cycles, Recodey prioritizes the structural. 
                  We operate as a technical strike-team for organizations that demand 
                  uncompromising performance and architectural permanence in their digital infrastructure.
                </p>
                <p className="text-ink/40 text-lg">
                  Our methodology rejects the superficial. We engineer systems that are not only 
                  visually commanding but mathematically optimized for high-concurrency environments 
                  and enterprise-grade scaling.
                </p>
                <div className="pt-12 grid grid-cols-2 gap-12">
                  <div>
                    <div className="text-display text-6xl font-black italic tracking-extratight text-accent">320+</div>
                    <div className="text-mono text-[10px] uppercase tracking-widest mt-2 font-bold">Successful Deploys</div>
                  </div>
                  <div>
                    <div className="text-display text-6xl font-black italic tracking-extratight text-accent">08ms</div>
                    <div className="text-mono text-[10px] uppercase tracking-widest mt-2 font-bold">Avg. Core Latency</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="px-6 md:px-12 py-32 bg-[#FAF9F5]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <Reveal>
              <SectionLabel text="001 / PRODUCT LAB" />
              <h2 
                className="text-display text-6xl md:text-8xl font-black italic tracking-extratight leading-none glitch-text interactive cursor-default"
                data-text="THE FORGE"
              >
                THE FORGE
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="md:text-right">
                <p className="text-mono text-xs uppercase tracking-widest max-w-[280px] leading-loose opacity-60 font-bold">
                  Internal software solutions built with obsession. Available for enterprise integration.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard 
              delay={0.1}
              icon={Layers}
              title="Strata DB"
              desc="High-concurrency document store for distributed real-time environments."
              tag="INFRASTRUCTURE"
            />
            <ProductCard 
              delay={0.2}
              icon={Monitor}
              title="Obsidian UI"
              desc="A brutalist framework for industrial control panels and data science."
              tag="FRONTEND CORE"
            />
            <ProductCard 
              delay={0.3}
              icon={Zap}
              title="Ignite Sync"
              desc="Zero-lag synchronization protocol for peer-to-peer enterprise apps."
              tag="NETWORKING"
            />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="px-6 md:px-12 py-32">
          <div className="mb-24">
            <Reveal>
              <SectionLabel text="002 / AGENCY ARM" />
              <h2 
                className="text-display text-6xl md:text-8xl font-black italic tracking-extratight glitch-text interactive cursor-default"
                data-text="SYSTEMS WE BUILD"
              >
                SYSTEMS WE BUILD
              </h2>
            </Reveal>
          </div>

          <div>
            <ServiceRow num="01" title="Digital Infrastructure" icon={Layers} />
            <ServiceRow num="02" title="Product Engineering" icon={Code} />
            <ServiceRow num="03" title="Interface Design" icon={Monitor} />
            <ServiceRow num="04" title="AI Integration" icon={Zap} />
            <ServiceRow num="05" title="Interactive Motion" icon={Globe} />
          </div>
        </section>

        {/* INSIGHTS / BLOG */}
        <section id="insights" className="px-6 md:px-12 py-32 border-t border-ink/5 bg-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <Reveal>
              <SectionLabel text="004 / JOURNAL" />
              <h2 
                className="text-display text-6xl md:text-8xl font-black italic tracking-extratight leading-none glitch-text interactive cursor-default"
                data-text="INSIGHTS"
              >
                INSIGHTS
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsBlogsOpen(true); }} className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-12 h-12 rounded-full border border-ink flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                 </div>
                 <span className="text-mono text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">VIEW ALL POSTS</span>
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
            {(posts.length > 0 ? posts.slice(0, 4) : [
              { date: "OCT 12, 2024", category: "ENGINEERING", title: "Brutalist Digitalism: The architecture of speed.", excerpt: "An exploration into why we reject layers of decorative abstraction in favor of raw, high-concurrency performance." },
              { date: "SEP 28, 2024", category: "IDENTITY", title: "Cinematic Product Strategy: Beyond the standard SaaS.", excerpt: "Leveraging depth, motion, and shadow to create software that feels like a precision instrument." },
              { date: "AUG 04, 2024", category: "RESEARCH", title: "Calibrating Light: The physics of interface design.", excerpt: "A technical deep-dive into our internal 'Daylight' protocols for accessibility and visual rhythm." },
              { date: "JUL 19, 2024", category: "CRAFT", title: "The Obsession Manifesto: Why 98% isn't enough.", excerpt: "On the necessity of technical perfectionism in a world of MVP-driven mediocrity." }
            ]).map((post, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-6 mb-6 text-mono text-[10px] uppercase font-bold tracking-widest text-accent">
                    <span>{post.publishedAt ? formatDate(post.publishedAt) : post.date}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-ink/20 group-hover:bg-accent transition-colors" />
                    <span className="text-ink/40">{post.category}</span>
                  </div>
                  <h3 className="text-display text-3xl md:text-5xl font-bold italic tracking-extratight leading-[1.1] mb-6 group-hover:underline underline-offset-8 decoration-accent decoration-2">
                    {post.title}
                  </h3>
                  <p className="text-ink/60 text-lg leading-relaxed max-w-xl group-hover:text-ink transition-colors">
                    {post.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-mono text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:text-accent">
                    <span className="relative pb-1 overflow-hidden">
                      Read Entry
                      <span className="absolute bottom-0 left-1/2 w-full h-[1px] bg-accent -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    </span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-3 h-3 translate-y-[1px]" />
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-40 bg-ink text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 skew-x-12 translate-x-1/2" />
          
          <Reveal>
            <div className="relative z-10 text-center max-w-5xl mx-auto">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-mono text-accent text-xs font-bold tracking-[0.5em] uppercase mb-12 block"
              >
                ARE YOU READY?
              </motion.span>
              <h2 className="text-display text-6xl md:text-[10rem] font-black italic tracking-extratight leading-[0.8] mb-20">
                ESTABLISH <br /> NEW DEFAULTS.
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="bg-accent text-white px-16 py-6 text-mono text-sm font-black tracking-widest hard-shadow-accent hover:-translate-y-2 transition-all"
                >
                  START A PROJECT
                </button>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="text-display text-4xl italic font-bold hover:text-accent transition-colors underline underline-offset-8"
                >
                  v1@recodey.studio
                </button>
              </div>
            </div>
          </Reveal>
        </section>

      </main>

      <footer className="px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between border-t border-ink/10 text-mono text-[10px] uppercase tracking-widest opacity-40">
        <div>&copy; 2024 RECODEY ARCHITECTURAL TECH</div>
        <div className="flex gap-10 mt-6 md:mt-0">
          <a href="#" className="hover:text-accent">Dribbble</a>
          <a href="#" className="hover:text-accent">X_Twitter</a>
          <a href="#" className="hover:text-accent">LinkedIn</a>
        </div>
        <div className="mt-6 md:mt-0">Built on daylight.</div>
      </footer>

    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <MainContent />
          </motion.div>
        )}
      </AnimatePresence>
      <CustomCursor />
    </>
  );
}

