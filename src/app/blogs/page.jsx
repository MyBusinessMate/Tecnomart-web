"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createBreadcrumbSchema, createItemListSchema } from '@/components/SEO';
import { adminDb } from '@/lib/admin/adminStore';
import { BookOpen, Calendar, Clock, User, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogsPage() {
  const blogs = adminDb.getBlogs() || [];
  const publishedBlogs = blogs.filter((b) => b.published !== false);

  const canonicalUrl = 'https://www.tecnomart.in/blogs';
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tech Insights & Guides', url: '/blogs' },
  ]);

  const blogItems = publishedBlogs.map((b) => ({
    name: b.title,
    slug: b.slug,
    url: `/blogs/${b.slug}`,
    image: b.image || '/webp/landing/img-1.webp',
    price: 0,
  }));
  const itemListSchema = createItemListSchema(blogItems, 'Tech Insights & Buying Guides', '/blogs');

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...(itemListSchema ? [itemListSchema] : []),
    ],
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Tech Insights, Buyer Guides & Device Care | TecnoMart Hyderabad"
        description="Read in-depth tech comparisons, smartphone buying guides, Apple accessory verification tips, and PC building advice from TecnoMart's certified engineers in Hyderabad."
        keywords="TecnoMart blog, tech guides Hyderabad, iPhone vs Samsung Hyderabad, spot fake apple accessories, PC building guides Hyderabad, electronics advice"
        canonicalUrl={canonicalUrl}
        schema={combinedSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <ScrollProgress />
        <Header />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Tech Insights</span>
            </nav>

            {/* Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-10 relative border border-midgrey-700/60 shadow-2xl p-7 sm:p-12 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase mb-3">
                  <BookOpen className="w-4 h-4" />
                  KNOWLEDGE HUB · EXPERT ADVICE
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-4">
                  Tech Insights & Buyer Guides
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
                  Clear, unbiased comparisons, maintenance tips, and authenticity checks written directly by certified hardware specialists at TecnoMart Hyderabad.
                </p>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {publishedBlogs.map((blog) => (
                <article
                  key={blog.id || blog.slug}
                  className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold mb-3">
                      <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full text-[11px]">
                        <Clock className="w-3 h-3" />
                        {blog.readTime || '5 min read'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.date || 'Recent'}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug mb-3">
                      <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 flex-1">
                      {blog.excerpt}
                    </p>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-bold text-neutral-700">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        {blog.author || 'TecnoMart Staff'}
                      </span>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1 font-black text-amber-500 hover:text-amber-600 uppercase tracking-wider text-[11px]"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
