"use client";

export function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16">
          
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span className="text-[18px] font-bold text-white tracking-tight ml-1">Recodey</span>
            </div>
          </div>

          <div>
             <div className="text-[12px] font-medium text-[#93c5fd] underline underline-offset-4 decoration-white/20 mb-6">Socials</div>
             <div className="flex flex-col gap-3">
               {["Instagram", "Twitter", "LinkedIn", "Facebook"].map((s) => (
                  <a href="#" key={s} className="text-[13px] text-white/50 hover:text-white transition-colors">{s}</a>
               ))}
             </div>
          </div>

          <div>
             <div className="text-[12px] font-medium text-[#93c5fd] underline underline-offset-4 decoration-white/20 mb-6">Links</div>
             <div className="flex flex-col gap-3">
               {["Services", "Process", "Team", "Pricing", "FAQ", "Contact", "Terms & conditions", "Privacy policy", "404"].map((s) => (
                  <a href="#" key={s} className="text-[13px] text-white/50 hover:text-white transition-colors">{s}</a>
               ))}
             </div>
          </div>

          <div>
             <div className="text-[12px] font-medium text-[#93c5fd] underline underline-offset-4 decoration-white/20 mb-6">Contact</div>
             <div className="text-[13px] text-white/50 leading-[1.6] flex flex-col gap-2">
               <a href="mailto:recodeyy@gmail.com" className="hover:text-white transition-colors">
                 recodeyy@gmail.com
               </a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
