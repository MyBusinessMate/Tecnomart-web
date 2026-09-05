"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { Flame, Clock, ShoppingBag, Check, Zap, Star, ShieldCheck } from 'lucide-react';
import { LAPTOPS_DATA } from '@/data/products';

export default function DealOfTheDay() {
  const { addToCart, setIsCartOpen } = useShop();
  const dealProduct = LAPTOPS_DATA[0]; // MacBook Pro 16" M3 Max

  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 bg-midgrey-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Header with aligned flex items */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-midgrey-700/60">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-current text-red-500 animate-pulse" />
              <span>FLASH SALE • TODAY ONLY</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              DEAL OF THE DAY
            </h2>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-3 bg-midgrey-800/90 border border-amber-500/30 px-5 py-3 rounded-2xl shadow-lg">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 animate-spin-slow" aria-hidden="true" />
            <span className="text-xs font-extrabold text-neutral-300 uppercase tracking-wider">Ends in:</span>
            <div
              aria-live="polite"
              aria-atomic="true"
              aria-label={`${String(timeLeft.hours).padStart(2, '0')} hours ${String(timeLeft.minutes).padStart(2, '0')} minutes ${String(timeLeft.seconds).padStart(2, '0')} seconds remaining`}
              className="flex items-center gap-1.5 font-black text-amber-400 text-lg sm:text-xl"
            >
              <span aria-hidden="true" className="bg-midgrey-900 px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 font-mono shadow-inner">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-amber-500 animate-pulse">:</span>
              <span aria-hidden="true" className="bg-midgrey-900 px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 font-mono shadow-inner">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-amber-500 animate-pulse">:</span>
              <span aria-hidden="true" className="bg-midgrey-900 px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 font-mono shadow-inner">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Deal Card */}
        <div className="bg-midgrey-800/90 border border-midgrey-700/60 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-2xl">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full z-10 uppercase tracking-wider shadow-md">
              {dealProduct.discountPercent}
            </div>

            <div className="relative w-full aspect-[4/3] bg-midgrey-900 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-midgrey-700/60 shadow-inner">
              <Image
                src="/images/landing/img-20.png"
                alt={dealProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-4 group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Product Info & Buy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span>{dealProduct.rating}</span>
              <span className="text-neutral-400">({dealProduct.reviewCount} verified reviews)</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
              {dealProduct.name}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
              {dealProduct.tagline}
            </p>

            {/* Price & Savings */}
            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-5xl font-black text-amber-400">
                {dealProduct.price}
              </span>
              <span className="text-base sm:text-xl text-neutral-500 line-through font-semibold">
                {dealProduct.originalPrice}
              </span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                Save ₹50,000 Today
              </span>
            </div>

            {/* Stock Claim Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-black">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-current text-amber-400" />
                  84% Claimed (Only 2 units remaining at this price)
                </span>
                <span className="text-neutral-400 uppercase">Limited Stock</span>
              </div>
              <div className="w-full h-3 bg-midgrey-900 rounded-full overflow-hidden border border-midgrey-700/60">
                <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 rounded-full w-[84%]" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <button
                onClick={() => addToCart(dealProduct)}
                className="min-h-[52px] bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>CLAIM DEAL NOW</span>
              </button>

              <button
                onClick={() => {
                  addToCart(dealProduct);
                  setIsCartOpen(true);
                }}
                className="min-h-[52px] bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-amber-500/60 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>INSTANT QUICK BUY</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 pt-3 border-t border-neutral-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Official Apple India Warranty</span>
              </div>
              <div>•</div>
              <div>Free Doorstep Delivery in Hyderabad</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
