import React from 'react';
import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

// SSR: Generate metadata for each blog post (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title, excerpt, category }`,
    { slug }
  );

  if (!post) {
    return { title: 'Article Not Found | Recodey' };
  }

  return {
    title: `${post.title} | Recodey Insights`,
    description: post.excerpt || `${post.title} — Read this article from Recodey's engineering journal.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
    },
  };
}

// SSR: Pre-generate known blog slugs for static generation
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
  return posts.map((post) => ({ slug: post.slug }));
}

const formatDate = (dateString) => {
  if (!dateString) return 'RECENT';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
};

const portableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-display text-4xl md:text-5xl font-bold mt-16 mb-8 leading-tight text-ink">{children}</h1>,
    h2: ({ children }) => <h2 className="text-display text-3xl md:text-4xl font-bold mt-12 mb-6 leading-tight text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="text-display text-2xl md:text-3xl font-bold mt-10 mb-4 leading-tight text-ink">{children}</h3>,
    normal: ({ children }) => <p className="text-ink-muted text-lg md:text-xl leading-relaxed mb-8 font-sans">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-8 py-4 my-12 text-2xl md:text-3xl text-ink font-display font-medium leading-snug glow-text-subtle">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-8 space-y-4 text-lg md:text-xl text-ink-muted">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-8 space-y-4 text-lg md:text-xl text-ink-muted">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-accent underline decoration-accent/30 hover:decoration-accent transition-all">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
  },
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink p-6">
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <h1 className="text-display text-6xl font-bold mb-8 relative z-10">404</h1>
        <p className="text-mono text-[9px] uppercase tracking-[0.4em] mb-12 text-ink-muted relative z-10">Article Not Found</p>
        <Link href="/" className="px-8 py-4 border border-accent text-accent text-mono text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all relative z-10">
          Return to Base
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg relative selection:bg-accent selection:text-white pb-32">
      {/* HEADER / NAV */}
      <header className="fixed top-0 left-0 w-full z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-mono text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block text-ink-muted group-hover:text-accent transition-colors">Back to Archives</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 border border-accent/50 flex items-center justify-center">
              <span className="text-accent text-mono text-[9px] font-bold">R</span>
            </div>
            <span className="text-display text-lg font-bold tracking-tight text-ink hidden md:block">RECODEY</span>
          </Link>
          <div className="hidden md:block">
            <div className="text-mono text-[8px] uppercase tracking-[0.4em] text-ink-muted">INSIGHTS // {new Date().getFullYear()}</div>
          </div>
        </div>
      </header>

      <main className="pt-40 px-6 md:px-12 max-w-7xl mx-auto">
        {/* ARTICLE HEADER */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-8 text-mono text-[9px] uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2 text-accent">
              <Clock className="w-3 h-3" />
              <span>{formatDate(post.publishedAt || post._createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-ink-muted">
              <Tag className="w-3 h-3" />
              <span>{post.category || "GENERAL"}</span>
            </div>
          </div>

          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-extratight leading-[0.9] mb-12 uppercase text-ink">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl md:text-2xl text-ink-muted font-medium leading-relaxed border-t border-b border-border py-12">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* CONTENT */}
        <article className="max-w-3xl mx-auto relative">
          {/* Decorative side text */}
          <div className="absolute -left-24 top-0 text-mono text-[8px] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 opacity-10 tracking-[1em] hidden lg:block text-accent">
            RECODEY_LOG_SYSTEM_V.5
          </div>

          <div className="prose-custom">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>

          {/* End of article */}
          <div className="mt-32 pt-20 border-t border-border flex flex-col items-center">
            <div className="text-mono text-[9px] uppercase tracking-[0.5em] text-accent mb-8 font-bold">END_OF_ENTRY</div>
            <div className="flex items-center gap-2 mb-12">
              <div className="w-7 h-7 border border-accent/50 flex items-center justify-center">
                <span className="text-accent text-mono text-[9px] font-bold">R</span>
              </div>
              <span className="text-display text-2xl font-bold tracking-tight">RECODEY</span>
            </div>
            <Link href="/" className="group relative px-12 py-5 border border-accent text-accent text-mono text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-colors hover:text-white flex items-center gap-4">
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Return Home <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </article>
      </main>

      {/* Corner brackets */}
      <div className="fixed top-24 left-4 w-6 h-6 border-l border-t border-accent/10 pointer-events-none hidden lg:block" />
      <div className="fixed top-24 right-4 w-6 h-6 border-r border-t border-accent/10 pointer-events-none hidden lg:block" />
    </div>
  );
}
