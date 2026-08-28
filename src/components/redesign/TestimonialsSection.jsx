"use client";

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurRevealText, BlurRevealBox } from './BlurReveal';

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aditya Verma",
    role: "Fullstack Developer & Gamer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    purchase: "Custom Liquid Cooled RTX 4080 Build",
    review: "TecnoMart built my dream workstation PC within 24 hours. Cable management is art, temperatures stay below 60°C under heavy compilation and 4K gaming, and their pricing was lower than buying parts individually online!",
    date: "February 2025",
  },
  {
    id: 2,
    name: "Pooja Reddy",
    role: "Architect & 3D Visualizer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    purchase: "MacBook Pro M3 Max & 4K Monitor",
    review: "Got an open-box MacBook Pro at an incredible discount with full Apple warranty. Their team in Tolichowki explained all specs patiently and transferred all my project files seamlessly.",
    date: "January 2025",
  },
  {
    id: 3,
    name: "Dr. K. Srinivas",
    role: "Medical Consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    purchase: "iPhone 15 Pro Max Screen & Battery Repair",
    review: "Shattered my iPhone screen during emergency rounds. TecnoMart's technician replaced it with a 100% genuine OLED display and battery in just 45 minutes with TrueTone intact. Outstanding reliability!",
    date: "February 2025",
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    role: "Founder, Zenith Studios",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    purchase: "8x Corporate Workstation Setup",
    review: "We outfitted our entire animation studio with custom RTX 4070 Ti rigs through TecnoMart Corporate. GST invoicing was prompt, delivery was on-schedule, and their post-sale support is unmatched.",
    date: "December 2024",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-14 sm:py-20 bg-neutral-50/70 border-b border-neutral-100 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-500 uppercase">
            REAL STORIES • REAL TRUST
          </span>
          <div className="mt-1">
            <BlurRevealText
              text="WHAT OUR CUSTOMERS SAY"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight justify-center"
              delay={0.1}
            />
          </div>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Testimonials Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <BlurRevealBox key={t.id} delay={idx * 0.1} yOffset={25}>
              <div className="h-full bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  {/* Top Quote & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-[1.5]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-amber-300/60 group-hover:text-amber-500 transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium mb-5 line-clamp-5">
                    "{t.review}"
                  </p>
                </div>

                {/* Customer Profile & Purchase Tag */}
                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-3 mb-2.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-100"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{t.purchase}</span>
                  </div>
                </div>
              </div>
            </BlurRevealBox>
          ))}
        </div>

      </div>
    </section>
  );
}
