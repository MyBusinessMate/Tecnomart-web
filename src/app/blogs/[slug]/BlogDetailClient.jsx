"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createBreadcrumbSchema, createArticleSchema } from '@/components/SEO';
import { adminDb } from '@/lib/admin/adminStore';
import NotFoundPage from '@/app/not-found/page';
import { Calendar, Clock, User, ChevronRight, Share2, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailClient({ slug }) {
  const blogs = adminDb.getBlogs() || [];
  const article = blogs.find((b) => b.slug === slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const canonicalUrl = `https://www.tecnomart.in/blogs/${article.slug}`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tech Insights', url: '/blogs' },
    { name: article.title, url: `/blogs/${article.slug}` },
  ]);
  const articleSchema = createArticleSchema(article);

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...(articleSchema ? [articleSchema] : []),
    ],
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hi TecnoMart! 📖 I just read your article "${article.title}" and had a quick question about tech recommendations in Hyderabad.`
    );
    window.open(`https://wa.me/919866388870?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title={`${article.title} | TecnoMart Insights`}
        description={article.excerpt}
        canonicalUrl={canonicalUrl}
        ogImageAlt={article.title}
        schema={combinedSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <ScrollProgress />
        <Header />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-6 flex-wrap">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <Link href="/blogs" className="hover:text-neutral-900 transition-colors">Tech Insights</Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="text-neutral-900 font-bold truncate max-w-[280px] sm:max-w-md">{article.title}</span>
            </nav>

            <article className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-12 shadow-sm mb-12">
              {/* Header Badges */}
              <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-500/10 px-3 py-1 rounded-full text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime || '5 min read'}
                </span>
                <span className="inline-flex items-center gap-1 text-neutral-600">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date || 'Recent'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-950 uppercase tracking-tight leading-tight mb-6">
                {article.title}
              </h1>

              {/* Excerpt Lead */}
              <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed border-l-4 border-amber-500 pl-4 mb-8 italic">
                {article.excerpt}
              </p>

              {/* Author & Share Bar */}
              <div className="flex items-center justify-between py-4 border-y border-neutral-100 mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">{article.author || 'TecnoMart Specialist'}</span>
                    <span className="text-[11px] text-neutral-500">Verified Technical Contributor</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppConsult}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Consult on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Body Content */}
              <div className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4">
                {article.content ? (
                  article.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))
                ) : (
                  <p>Content for this article is being updated by our editorial team.</p>
                )}
              </div>

              {/* Article Footer & Callout */}
              <div className="mt-12 pt-8 border-t border-neutral-100 bg-amber-50/60 rounded-2xl p-6 border border-amber-200/60">
                <h3 className="text-base font-black text-neutral-950 uppercase tracking-tight mb-2">
                  Have Questions About Devices or Repairs?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  Visit our flagship store at 7 Tombs Rd, Tolichowki, Hyderabad or chat directly with our hardware engineers for instant quotes and product advice.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-950"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Articles</span>
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
