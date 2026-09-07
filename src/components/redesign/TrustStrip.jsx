"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PriceTagIcon, ExpertEngineerIcon, GenuinePartsIcon, WarrantyBadgeIcon } from './Icons';

const items = [
  {
    title: "Best Prices",
    subtitle: "Guaranteed",
    icon: PriceTagIcon,
  },
  {
    title: "Expert Engineers",
    subtitle: "Certified Professionals",
    icon: ExpertEngineerIcon,
  },
  {
    title: "Genuine Parts",
    subtitle: "100% Original",
    icon: GenuinePartsIcon,
  },
  {
    title: "Warranty",
    subtitle: "Upto 2 Years",
    icon: WarrantyBadgeIcon,
  },
];

export default function TrustStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef(null);

  // Viewport detection via IntersectionObserver
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2-second automatic loop, strictly paused when outside viewport
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const CurrentIcon = items[activeIndex].icon;

  return (
    <section className="bg-transparent pt-0 pb-8 sm:pb-12 lg:pb-14">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* Blended trust strip container */}
        <div
          ref={carouselRef}
          className="bg-neutral-50/90 backdrop-blur-xs rounded-2xl border border-neutral-200/80 -mt-6 sm:-mt-10 lg:-mt-12 relative z-20 overflow-hidden shadow-xs transition-all duration-300"
        >
          {/* DESKTOP LAYOUT (4-COLUMN STATIC GRID UNCHANGED) */}
          <div className="hidden sm:grid sm:grid-cols-4 divide-x divide-neutral-200/60">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-neutral-50/60 transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500 flex items-center justify-center flex-shrink-0 bg-white group-hover:bg-amber-500/10 group-hover:scale-105 group-hover:border-amber-600 transition-all duration-300 shadow-xs">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-tight truncate group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium leading-tight truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE ONLY CAROUSEL (1 CARD AT A TIME, 2S LOOP, VIEWPORT DETECTED) */}
          <div className="block sm:hidden relative px-4 py-3.5">
            <div className="h-14 relative flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center gap-3.5 px-2"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-amber-500 flex items-center justify-center flex-shrink-0 bg-white shadow-xs">
                    <CurrentIcon className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-extrabold text-neutral-900 leading-tight">
                      {items[activeIndex].title}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium leading-tight">
                      {items[activeIndex].subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center justify-center gap-1 pt-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer p-1 focus:outline-none"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 block ${
                      activeIndex === i ? 'w-5 bg-amber-500' : 'w-1.5 bg-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
