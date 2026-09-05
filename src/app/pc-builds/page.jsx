"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import Configurator from '@/components/redesign/Configurator';
import { ChevronRight, Star, Cpu, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PCBuildsConfiguratorPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-20 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/gaming" className="hover:text-neutral-900 transition-colors">Gaming PCs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">PC Configurator</span>
            </nav>

            {/* Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  SMART RIG CONFIGURATOR &amp; RECOMMENDATION ENGINE
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Build Your Dream PC
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Click your use case and performance tier to automatically generate a 100% compatible, balanced build with instant WhatsApp quotation and live platform toggling.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Cpu className="w-3.5 h-3.5" /> Auto-Compatible Builds
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" /> Expert Curated
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant WA Quote
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 3-Year Warranty
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Configurator */}
            <Configurator />

          </div>
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
