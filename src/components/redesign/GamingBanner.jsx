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
              backgroundImage: `url('/images/landing/img-1.png')`,
            }}
          />

          {/* Dark Overlay (Left dark → Right dark) */}
          <div className="absolute inset-0 bg-gradient-to-r from-midgrey-950 via-midgrey-900/90 to-midgrey-800/90" />

          {/* Left Side Gold Chevron Geometric Accents */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 flex items-center justify-start pl-3 pointer-events-none select-none opacity-80">
            <svg viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full max-h-[260px]">
              <path d="M90 10 L10 140 L90 270" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M55 50 L10 140 L55 230" stroke="#F5B800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
          </div>

          {/* Right Side Gold Chevron Geometric Accents */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 flex items-center justify-end pr-3 pointer-events-none select-none opacity-80">
            <svg viewBox="0 0 120 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full max-h-[260px]">
              <path d="M30 10 L110 140 L30 270" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M65 50 L110 140 L65 230" stroke="#F5B800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
          </div>

          {/* Banner Main Grid: Centered Left Setup Graphic & Centered Right Text Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 px-6 sm:px-10 py-10">
            
            {/* Left Column: Gaming Setup with Logo Emblem Watermark */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm aspect-[16/10] rounded-2xl overflow-hidden border border-midgrey-700/60 shadow-2xl bg-midgrey-800 flex items-center justify-center p-2">
                <img
                  src="/images/landing/img-1.png"
                  alt="Gold ARGB Gaming Rig"
                  className="w-full h-full object-contain rounded-xl opacity-95"
                />
                {/* Logo Emblem Watermark on Monitor Screen */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img src="/logo.png" alt="Emblem" className="w-16 h-16 object-contain opacity-70 filter drop-shadow-lg" />
                </div>
              </div>
            </div>

            {/* Right Column: Text Content Centered Vertically and Horizontally Balanced */}
            <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
              
              <p className="text-white font-extrabold text-sm sm:text-lg tracking-[0.15em] uppercase">
                BUILT FOR VICTORY.
              </p>

              <h2 className="text-[#F5B800] font-black text-3xl sm:text-5xl uppercase tracking-tight leading-none">
                GAMING PCs
              </h2>

              <div className="space-y-1 text-white">
                <p className="text-sm sm:text-base font-medium">
                  High Performance. Ultimate Experience.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-300">
                  Custom Builds <span className="text-[#F5B800] mx-2">|</span> Best Prices <span className="text-[#F5B800] mx-2">|</span> Expert Support
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/gaming"
                  className="btn-wipe-yellow inline-flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
                >
                  <span className="relative z-10">EXPLORE GAMING PCS</span>
                  <ChevronRight className="w-4 h-4 stroke-[3] relative z-10" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
