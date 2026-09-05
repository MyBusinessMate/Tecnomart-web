"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Wrench, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Load the 3D canvas only on the client — WebGL cannot run on the server
const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin" />
    </div>
  ),
});

const TYPEWRITER_WORDS = [
  'CHOICE.',
  'MOBILE.',
  'LAPTOP.',
  'SETUP.'
];

export default function HeroSection({ onOpenRepairModal }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullWord = TYPEWRITER_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullWord.length) {
          // Pause 2 seconds at the complete word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

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
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6 text-left">

            {/* Hero Headline — single h1 with pure yellow typewriter */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.06] uppercase space-y-1">
              <span className="block text-neutral-950 drop-shadow-xs">YOUR TECH.</span>
              <span className="block text-neutral-950 drop-shadow-xs">YOUR BUDGET.</span>
              <span className="block text-[#F5B800] min-h-[1.15em] flex items-center flex-wrap">
                <span className="mr-2">YOUR RIGHT</span>
                <span className="inline-block text-[#F5B800]">
                  {displayText}
                  <span className="inline-block w-1 h-[0.9em] bg-[#F5B800] ml-1 animate-pulse align-middle" />
                </span>
              </span>
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
                className="btn-wipe-yellow min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current relative z-10" />
                <span className="relative z-10">Tell Us Your Budget</span>
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
