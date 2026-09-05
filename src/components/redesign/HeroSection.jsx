"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Wrench, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Load the 3D canvas only on the client — WebGL cannot run on the server
const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
    </div>
  ),
});

export default function HeroSection({ onOpenRepairModal }) {
  const scrollToBudget = () => {
    const el = document.getElementById('budget-finder');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -40, lerp: 0.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-2 pb-1 sm:pt-3 sm:pb-2 lg:pt-3 lg:pb-2">
      
      {/* Golden Background Geometric Watermark Lines (Left & Right) */}
      <div className="absolute top-0 left-0 bottom-0 w-48 sm:w-72 pointer-events-none select-none opacity-30">
        <svg viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M-100 100L150 300L-100 500" stroke="#F5B800" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M-50 50L200 300L-50 550" stroke="#F5B800" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-48 sm:w-72 pointer-events-none select-none opacity-30">
        <svg viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M400 100L150 300L400 500" stroke="#F5B800" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M350 50L100 300L350 550" stroke="#F5B800" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Subtitle */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-5 text-left">
            
            {/* Premium Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[11px] sm:text-xs font-bold tracking-wider uppercase max-w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Hyderabad's #1 Rated Tech &amp; Gaming Hub</span>
            </div>

            {/* Hero Headline — single h1 for correct document outline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.06] uppercase space-y-1">
              <span className="block text-neutral-950 drop-shadow-xs">YOUR TECH.</span>
              <span className="block text-neutral-950 drop-shadow-xs">YOUR BUDGET.</span>
              <span className="block bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">YOUR RIGHT CHOICE.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-700 font-medium leading-relaxed max-w-lg">
              Mobiles, Laptops, Gaming PCs &amp; Expert Repairs – <br className="hidden sm:inline" />
              All under one roof with official warranty.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={scrollToBudget}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:from-amber-600 text-neutral-950 px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 transition-all active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Tell Us Your Budget</span>
              </button>

              <button
                onClick={onOpenRepairModal}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white hover:bg-midgrey-900 hover:text-white text-neutral-950 border-2 border-midgrey-900 px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Repair</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive 3D Model */}
          <div className="lg:col-span-7 relative flex items-center justify-center -mt-4 sm:-mt-8 lg:-mt-12 py-1 sm:py-2">
            
            {/* Ambient Radial Backlight Glow */}
            <div className="absolute w-96 h-96 sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-amber-500/25 via-amber-400/10 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none -z-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[1100px] h-[440px] xs:h-[500px] sm:h-[600px] lg:h-[680px] flex items-center justify-center z-10"
            >
              <HeroModel />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
