import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Recodey privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
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
            PRIVACY <span className="text-accent glow-text-subtle">POLICY</span>
          </h1>
          <p className="text-ink-muted text-mono text-[9px] uppercase tracking-[0.3em]">Last updated: January {currentYear}</p>
        </div>

        <div className="space-y-12 text-ink-muted text-lg leading-relaxed">
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Information We Collect</h2>
            <p>When you use our contact form, we collect your name, email address, and the message content you submit. We use this information solely to respond to your inquiry and communicate about potential projects.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">How We Use Your Data</h2>
            <p>Your personal information is used exclusively for business communication purposes. We do not sell, trade, or share your personal information with third parties. Contact form submissions are processed via our internal email system.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Cookies &amp; Analytics</h2>
            <p>This website may use minimal analytics to understand traffic patterns. We do not use tracking cookies for advertising purposes. Any analytics data collected is anonymized and used solely to improve the website experience.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Data Retention</h2>
            <p>We retain your contact information only as long as necessary to fulfill the purpose for which it was collected. You may request deletion of your data at any time by contacting us at recodeyy@gmail.com.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Your Rights</h2>
            <p>You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, please contact us directly.</p>
          </section>
          <section>
            <h2 className="text-display text-2xl font-bold mb-4 text-ink">Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:recodeyy@gmail.com" className="text-accent hover:underline">recodeyy@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      <div className="fixed top-24 left-4 w-6 h-6 border-l border-t border-accent/10 pointer-events-none hidden lg:block" />
      <div className="fixed top-24 right-4 w-6 h-6 border-r border-t border-accent/10 pointer-events-none hidden lg:block" />
    </div>
  );
}
