"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GamingBanner() {
  return (
    <section id="gaming" className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* Solid Dark Banner Container matching reference screenshot */}
        <div className="relative rounded-3xl overflow-hidden bg-midgrey-900 min-h-[280px] sm:min-h-[320px] flex items-center shadow-2xl border border-midgrey-700/60">
          
          {/* Background Gaming Setup Image */}
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{
              backgroundImage: `url('/webp/landing/img-1.webp')`,
            }}
          />

          {/* Dark Overlay (Left dark → Right dark) */}
          <div className="absolute inset-0 bg-gradient-to-r from-midgrey-950 via-midgrey-900/90 to-midgrey-800/90" />

          {/* Subtle Ambient Gaming Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#F5B800]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Banner Main Grid: Centered Left Setup Graphic & Centered Right Text Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-12 px-5 sm:px-10 py-8 sm:py-10">
            
            {/* Left Column: Gaming Setup Rig */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
                <picture>
                  <source srcSet="/webp/gaming-pc.webp" type="image/webp" />
                  <img
                    src="/webp/gaming-pc.webp"
                    alt="TecnoMart Custom Gaming PC"
                    width={600}
                    height={375}
                    className="w-full max-h-[220px] sm:max-h-[280px] object-contain rounded-2xl transition-transform duration-500 hover:scale-105 filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>

            {/* Right Column: Text Content Centered Vertically and Horizontally Balanced */}
            <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
              
              <p className="text-white/90 font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase">
                BUILT FOR VICTORY.
              </p>

              <h2 className="text-[#FFD21C] font-black text-3xl sm:text-5xl uppercase tracking-tight leading-none drop-shadow-[0_0_20px_rgba(255,210,28,0.25)]">
                GAMING PCs
              </h2>

              <div className="space-y-1.5 text-white">
                <p className="text-sm sm:text-base font-medium text-neutral-200">
                  High Performance. Ultimate Experience.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold text-neutral-300">
                  <span>Custom Builds</span>
                  <span className="text-[#F5B800]">•</span>
                  <span>Best Prices</span>
                  <span className="text-[#F5B800]">•</span>
                  <span>Expert Support</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
                <Link
                  href="/pc-builds"
                  className="btn-wipe-yellow inline-flex items-center justify-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer w-full sm:w-auto"
                >
                  <span className="relative z-10">CUSTOM PC BUILDER</span>
                  <ChevronRight className="w-4 h-4 stroke-[3] relative z-10" />
                </Link>

                <Link
                  href="/gaming"
                  className="inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-98 cursor-pointer w-full sm:w-auto"
                >
                  <span>Explore Rigs</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
