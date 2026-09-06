"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import SEO from '@/components/SEO';
import { Home, Search, Smartphone, Laptop, Wrench, Headphones, MessageCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hi TecnoMart! I was looking for a page on your website that couldn't be found. Can you help me find what I'm looking for?");
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Page Not Found (404) | TecnoMart Hyderabad"
        description="The page you are looking for does not exist or has moved. Explore our latest mobiles, laptops, accessories and repair services in Hyderabad."
        canonicalUrl="https://tecnomart.in/404"
        robots="noindex, nofollow"
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <Header />

        <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="max-w-xl w-full text-center">
            {/* 404 Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 font-black text-xl mb-6 border border-amber-500/20">
              404
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight mb-3">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-medium mb-8 leading-relaxed max-w-md mx-auto">
              The page or device you're looking for might have been moved, renamed, or is temporarily unavailable.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-midgrey-900 hover:bg-midgrey-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-98"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>Back to Homepage</span>
              </Link>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Ask on WhatsApp</span>
              </button>
            </div>

            {/* Helpful Category Navigation */}
            <div className="border-t border-neutral-200/80 pt-8">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                Popular Destinations
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <Link
                  href="/mobiles"
                  className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center gap-1.5 transition-colors group"
                >
                  <Smartphone className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-xs font-bold text-neutral-800">Mobiles</span>
                </Link>
                <Link
                  href="/laptops"
                  className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center gap-1.5 transition-colors group"
                >
                  <Laptop className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-xs font-bold text-neutral-800">Laptops</span>
                </Link>
                <Link
                  href="/accessories"
                  className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center gap-1.5 transition-colors group"
                >
                  <Headphones className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-xs font-bold text-neutral-800">Accessories</span>
                </Link>
                <Link
                  href="/repairs"
                  className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center gap-1.5 transition-colors group"
                >
                  <Wrench className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-xs font-bold text-neutral-800">Repairs</span>
                </Link>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
