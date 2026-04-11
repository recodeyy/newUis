"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Plus, Minus } from "lucide-react";

const REVIEWS = [
  { text: "Recody's AI solutions save us a ton of money on a monthly basis. Highly recommend working with them.", name: "David Williams", role: "CTO", company: "Wave" },
  { text: "Recody has significantly enhanced our efficiency, resulting in the completion of more work every day.", name: "Jessica Miller", role: "CCO", company: "Kama Inc." },
  { text: "Highly recommended Recody's AI consultancy for any data-intensive business.", name: "Michael Anderson", role: "CEO", company: "Verdant Inc." },
  { text: "A game-changer for any company looking to leverage AI in a meaningful way.", name: "Olivia Johnson", role: "CPO", company: "Nova Innovations" },
];

const FAQS = [
  { q: "Is my company a good fit for Recody?", a: "Yes. Our bespoke AI solutions cater to a wide range of industries including fintech, healthcare, and retail." },
  { q: "How long does implementation take?", a: "Depending on complexity, standard implementations take 2–4 weeks. Dedicated LLM models may take longer." },
  { q: "Are your solutions secure?", a: "Absolutely. We enforce SOC-2 compliance across all environments." },
  { q: "Can I get more than 3 developers?", a: "Yes, you can scale your dedicated team on-demand through our enterprise plan." },
  { q: "Do you offer continuous support?", a: "We provide 24/7 SLA-backed support for all deployed production environments." },
  { q: "Can I cancel my subscription at any time?", a: "Yes, our retainers operate on a rolling monthly basis with no lock-ins." },
];

export function CTA() {
  const [ref, visible] = useScrollReveal();
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <>
      {/* ── Reviews ── */}
      <section id="reviews" ref={ref} className="py-28 bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4 text-center"
          >
            What clients say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[clamp(36px,6vw,64px)] font-bold text-white tracking-[-0.04em] leading-[1.05] mb-16 text-center"
          >
            Trusted by <span className="text-blue-400">innovators</span>.
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-6 flex flex-col justify-between min-h-[240px] hover:border-white/[0.12] transition-colors"
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#b4f481"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-[13.5px] text-white/55 leading-[1.7]">"{r.text}"</p>
                </div>
                {/* Person */}
                <div className="flex items-center gap-3 pt-5 border-t border-white/5 mt-5">
                  <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${r.name}`} alt={r.name} className="w-full h-full object-cover opacity-70" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{r.name}</div>
                    <div className="text-[11px] text-white/30">{r.role} · {r.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 bg-black border-t border-white/5">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">

          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">Got questions?</p>
            <h2 className="text-[clamp(36px,6vw,64px)] font-bold text-white tracking-[-0.04em] leading-[1.05]">
              Answers<span className="text-blue-400">.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors text-left">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[13.5px] font-medium text-white/80 leading-snug">{f.q}</span>
                  <span className="text-white/30 shrink-0">
                    {openFAQ === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-5 pb-5 text-[13px] text-white/40 leading-[1.7]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
