"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarBadgeIcon,
  PriceTagIcon,
  DeliveryBoxIcon,
  ReturnArrowIcon,
  SecureLockIcon,
  SupportHeadsetIcon,
} from './Icons';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef(null);

  const pillars = [
    {
      title: "Trusted Since 2016",
      subtitle: "Serving Thousands of Happy Customers",
      icon: <StarBadgeIcon className="w-7 h-7 text-amber-500" />,
    },
    {
      title: "Affordable Pricing",
      subtitle: "Best Value for Your Money",
      icon: <PriceTagIcon className="w-7 h-7 text-amber-500" />,
    },
    {
      title: "Fast Delivery",
      subtitle: "Pan India Safe & Secure",
      icon: <DeliveryBoxIcon className="w-7 h-7 text-amber-500" />,
    },
    {
      title: "Easy Returns",
      subtitle: "Hassle-Free Experience",
      icon: <ReturnArrowIcon className="w-7 h-7 text-amber-500" />,
    },
    {
      title: "Secure Payments",
      subtitle: "100% Safe Transactions",
      icon: <SecureLockIcon className="w-7 h-7 text-amber-500" />,
    },
    {
      title: "After Sales Support",
      subtitle: "We're Here For You",
      icon: <SupportHeadsetIcon className="w-7 h-7 text-amber-500" />,
    },
  ];

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

  // 2.5-second automatic loop, paused when outside viewport
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pillars.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isVisible, pillars.length]);

  return (
    <section ref={carouselRef} className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Emblem Divider */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight leading-tight sm:leading-normal">
            <span className="block sm:inline">Why choose</span>{" "}
            <span className="block sm:inline">TecnoMart</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
            <img src="/webp/logo.webp" alt="Emblem" width={20} height={20} className="w-5 h-5 object-contain" />
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
          </div>
        </div>

        {/* DESKTOP: 6 Pillars Horizontal Grid (Seamless, Blended) */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 text-center">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center group p-3 rounded-2xl transition-colors cursor-default"
            >
              {/* Circular gold icon container */}
              <div className="w-13 h-13 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 group-hover:scale-105 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug mb-1 group-hover:text-amber-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MOBILE ONLY CAROUSEL (1 AT A TIME, 2.5S LOOP, SAME AS 4 OPTIONS ABOVE) */}
        <div className="block sm:hidden relative px-4 py-2">
          <div className="h-16 relative flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center gap-3.5 px-2"
              >
                <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  {pillars[activeIndex].icon}
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-extrabold text-neutral-900 leading-tight">
                    {pillars[activeIndex].title}
                  </p>
                  <p className="text-xs text-neutral-500 font-medium leading-tight mt-0.5">
                    {pillars[activeIndex].subtitle}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {pillars.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to feature ${i + 1}`}
                className="min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer p-1 focus:outline-none"
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
    </section>
  );
}
