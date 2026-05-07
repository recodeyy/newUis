import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Recodey terms of service — engagement terms and conditions.',
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      <header className="fixed top-0 left-0 w-full z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-mono text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block text-ink-muted group-hover:text-accent transition-colors">Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 border border-accent/50 flex items-center justify-center">
              <span className="text-accent text-mono text-[9px] font-bold">R</span>
            </div>
            <span className="text-display text-lg font-bold tracking-tight text-ink hidden md:block">RECODEY</span>
          </Link>
          <div className="w-[120px]" />
        </div>
      </header>

      <main className="pt-40 px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="text-accent text-mono text-[9px] tracking-[0.5em] font-bold">LEGAL</span>
          </div>
          <h1 className="text-display text-5xl md:text-7xl font-bold tracking-extratight leading-[0.9] mb-8">
            TERMS OF <span className="text-accent glow-text-subtle">SERVICE</span>
          </h1>
          <p className="text-ink-muted text-mono text-[9px] uppercase tracking-[0.3em]">Last updated: January {currentYear}</p>
        </div>

        <div className="space-y-12 text-ink-muted text-lg leading-relaxed">
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Agreement to Terms</h2>
            <p>By accessing or using the Recodey website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Services</h2>
            <p>Recodey provides web development, brand identity design, AI integration, and digital consulting services. All project engagements are governed by individual project agreements that may supplement these general terms.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Intellectual Property</h2>
            <p>The content, design, and code of this website are the intellectual property of Recodey. Client deliverables are transferred to the client upon full payment as specified in individual project agreements.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Project Engagements</h2>
            <p>All project timelines, deliverables, and pricing are defined in individual project proposals and statements of work. Changes to scope may affect timelines and pricing, which will be communicated in advance.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Limitation of Liability</h2>
            <p>Recodey shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or this website.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:recodeyy@gmail.com" className="text-accent hover:underline">recodeyy@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      <div className="fixed top-24 left-4 w-6 h-6 border-l border-t border-accent/10 pointer-events-none hidden lg:block" />
      <div className="fixed top-24 right-4 w-6 h-6 border-r border-t border-accent/10 pointer-events-none hidden lg:block" />
    </div>
  );
}
