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
    <section className="relative overflow-hidden bg-white pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16 border-b border-neutral-100">
      
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
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-6 text-left">
            
            {/* Hero Headline — single h1 for correct document outline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] uppercase space-y-1">
              <span className="block text-neutral-950">YOUR TECH.</span>
              <span className="block text-neutral-950">YOUR BUDGET.</span>
              <span className="block text-[#D97706] sm:text-amber-500">YOUR RIGHT CHOICE.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-lg">
              Mobiles, Laptops, Gaming PCs &amp; Expert Repairs – <br className="hidden sm:inline" />
              All under one roof.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={scrollToBudget}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Tell Us Your Budget</span>
              </button>

              <button
                onClick={onOpenRepairModal}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-950 border-2 border-neutral-900 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all active:scale-98 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Repair</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive 3D Model */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[560px] aspect-[4/3]"
            >
              <HeroModel />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
