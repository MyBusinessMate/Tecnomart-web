"use client";

import React from 'react';
import Image from 'next/image';
import { Wrench, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/data/redesignAssets';

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

          {/* Right Column: 3D Stage Pedestal with Phone, Laptop & RGB PC */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center"
            >
              
              {/* Pedestal Platform (2-tier white pedestal stage with gold logo emblem on front) */}
              <div className="absolute bottom-2 w-[94%] h-20 sm:h-28 bg-gradient-to-b from-white via-neutral-100 to-neutral-300 rounded-[100%] shadow-[0_25px_50px_rgba(0,0,0,0.15)] border-t border-white flex flex-col items-center justify-center z-0">
                <div className="w-[96%] h-[80%] rounded-[100%] bg-gradient-to-b from-neutral-50 to-neutral-200 shadow-inner flex items-center justify-center relative">
                  {/* Gold Emblem on front edge */}
                  <div className="absolute bottom-1 bg-white px-3 py-1 rounded-full shadow-xs border border-amber-300 flex items-center gap-1">
                    <img src="/logo.png" alt="" aria-hidden="true" className="w-4 h-4 object-contain" />
                  </div>
                </div>
              </div>

              {/* Product 1: Smartphone (Left) */}
              <div className="absolute left-[2%] bottom-8 sm:bottom-12 w-[26%] z-20">
                <Image
                  src={ASSETS.heroPhone}
                  alt="Flagship Smartphone"
                  width={200}
                  height={400}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-xl"
                />
              </div>

              {/* Product 2: Laptop (Center) */}
              <div className="absolute left-[24%] bottom-10 sm:bottom-14 w-[50%] z-15">
                <Image
                  src={ASSETS.heroLaptop}
                  alt="Ultra Slim Laptop"
                  width={500}
                  height={320}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-2xl"
                />
              </div>

              {/* Product 3: RGB Gaming PC Tower (Right) */}
              <div className="absolute right-[1%] bottom-8 sm:bottom-12 w-[44%] z-25">
                <Image
                  src={ASSETS.heroPc}
                  alt="Gold RGB Gaming PC"
                  width={350}
                  height={420}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-2xl"
                />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
