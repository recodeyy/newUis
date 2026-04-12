"use client";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DEFAULT_MEMBERS = [
  // Founders
  {
    id: '1',
    name: 'Om Singh',
    role: 'FOUNDER',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=OmSingh',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '2',
    name: 'Vaishnavi Tripathi',
    role: 'FOUNDER',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vaishnavi',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '3',
    name: 'Kruturaj Padwal',
    role: 'FOUNDER',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kruturaj',
    social: { twitter: '#', linkedin: '#' },
  },
  // Core Team
  {
    id: '4',
    name: 'Shivam Singh',
    role: 'CORE TEAM',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Shivam',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Vishakha Roy',
    role: 'CORE TEAM',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vishakha',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '6',
    name: 'Siddhesh Tripathi',
    role: 'CORE TEAM',
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Siddhesh',
    social: { twitter: '#', linkedin: '#' },
  },
];

export function TeamShowcase({ members = DEFAULT_MEMBERS }) {
  const [ref, visible] = useScrollReveal();
  const [hoveredId, setHoveredId] = useState(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <section id="team" ref={ref} className="py-28 bg-black border-t border-white/5 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-4 text-center"
        >
          The minds behind Recodey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[clamp(36px,6vw,64px)] font-bold text-white tracking-[-0.04em] leading-[1.05] mb-20 text-center"
        >
          Meet our <span className="text-blue-400">Team</span>.
        </motion.h2>

        <motion.div 
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-12 select-none w-full bg-[#0a0a0a] border border-white/[0.07] rounded-[32px] p-8 md:p-12"
        >
          {/* ── Left: photo grid ── */}
          <div className="flex gap-3 flex-shrink-0 justify-center w-full md:w-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              {col1.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="w-[100px] h-[110px] sm:w-[130px] sm:h-[140px] md:w-[140px] md:h-[150px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 mt-8 sm:mt-12">
              {col2.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="w-[110px] h-[120px] sm:w-[145px] sm:h-[155px] md:w-[155px] md:h-[165px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3 mt-4 sm:mt-6">
              {col3.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="w-[105px] h-[115px] sm:w-[136px] sm:h-[146px] md:w-[145px] md:h-[155px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </div>

          {/* ── Right: member name list*/}
          <div className="flex flex-col gap-5 flex-1 w-full mt-4 md:mt-0 justify-center h-full">
            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                hoveredId={hoveredId}
                onHover={setHoveredId}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-opacity duration-300 relative bg-white/5 border border-white/10',
        className,
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter,transform] duration-500 p-2"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1.2)' : 'grayscale(1) brightness(0.6)',
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 py-1',
        isDimmed ? 'opacity-30 translate-x-0' : 'opacity-100',
        isActive ? 'translate-x-2' : 'translate-x-0'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'h-2 rounded-full flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-[#b4f481] w-6' : 'bg-white/20 w-3',
          )}
        />
        <span
          className={cn(
            'text-[20px] md:text-[24px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-white' : 'text-white/60 hover:text-white/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-2 transition-all duration-300',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a href={member.social.twitter} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            )}
            {member.social?.linkedin && (
              <a href={member.social.linkedin} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            )}
            {member.social?.instagram && (
              <a href={member.social.instagram} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-2 pl-6 md:pl-9 text-[11px] font-bold uppercase tracking-[0.25em] text-white/30">
        {member.role}
      </p>
    </div>
  );
}
