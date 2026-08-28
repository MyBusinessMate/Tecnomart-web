"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { POPULAR_PRODUCTS } from '@/data/redesignAssets';

export default function PopularPicks({ onAddToCart, addedItems = {} }) {
  const scrollRef = useRef(null);

  const getBadgeStyle = (badgeType) => {
    switch (badgeType) {
      case 'red':
        return 'bg-red-500 text-white';
      case 'green':
        return 'bg-emerald-600 text-white';
      case 'gold':
        return 'bg-amber-500 text-neutral-950';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  const getProductHref = (prod) => {
    if (prod.id === 'p1') return '/accessories';
    if (prod.id === 'p2') return '/accessories';
    if (prod.id === 'p3') return '/laptops/asus-rog-zephyrus-g16-2025';
    if (prod.id === 'p4') return '/laptops/asus-rog-zephyrus-g16-2025';
    if (prod.id === 'p5') return '/mobiles/iphone-15';
    return '/mobiles';
  };

  // Exact order from screenshot: iPhone 15, Asus TUF F15, Zotac RTX 4060, Sony XM5, boAt Wave Ultima
  const orderedProducts = [
    POPULAR_PRODUCTS.find(p => p.id === 'p5') || POPULAR_PRODUCTS[4],
    POPULAR_PRODUCTS.find(p => p.id === 'p4') || POPULAR_PRODUCTS[3],
    POPULAR_PRODUCTS.find(p => p.id === 'p3') || POPULAR_PRODUCTS[2],
    POPULAR_PRODUCTS.find(p => p.id === 'p2') || POPULAR_PRODUCTS[1],
    POPULAR_PRODUCTS.find(p => p.id === 'p1') || POPULAR_PRODUCTS[0],
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="popular" className="py-8 sm:py-14 bg-white border-b border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* Section Header with Emblem Divider */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex-1 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight inline-block">
              POPULAR PICKS
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
              {/* Decorative divider — hidden from screen readers */}
              <img src="/logo.png" alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
              <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
            </div>
          </div>

          <Link
            href="/mobiles"
            className="text-xs font-black text-neutral-800 hover:text-amber-600 border border-neutral-300 px-3.5 py-1.5 rounded-lg transition-colors uppercase tracking-wider flex-shrink-0"
          >
            View All
          </Link>
        </div>

        {/* Carousel Wrapper with Side Arrows */}
        <div className="relative flex items-center gap-2">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-amber-500 hover:border-amber-500 hover:text-neutral-950 items-center justify-center text-neutral-700 shadow-sm transition-all active:scale-95 cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Product Grid */}
          <div
            ref={scrollRef}
            className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible no-scrollbar"
          >
            {orderedProducts.map((prod, idx) => {
              const href = getProductHref(prod);
              const isAdded = !!addedItems[prod.id];

              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-w-[150px]"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-start mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black tracking-wider uppercase ${getBadgeStyle(prod.badgeType)}`}
                      >
                        {prod.badge}
                      </span>
                    </div>

                    {/* Product Image */}
                    <Link href={href} className="block">
                      <div className="w-full aspect-square bg-neutral-50 rounded-xl flex items-center justify-center p-2 mb-2.5 overflow-hidden group-hover:bg-amber-50/40 transition-colors">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Name & Subtitle */}
                    <Link href={href} className="block space-y-0.5 text-center">
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-neutral-500 font-medium line-clamp-1">
                        {prod.subtitle}
                      </p>
                    </Link>
                  </div>

                  {/* Price & Yellow Outline Cart Button */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-100">
                    <span className="text-xs sm:text-sm font-black text-neutral-950">
                      {prod.price}
                    </span>
                    <button
                      onClick={() => onAddToCart && onAddToCart(prod)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs ${
                        isAdded
                          ? 'bg-amber-500 border-amber-500 text-neutral-950'
                          : 'bg-amber-50/60 border-amber-400 text-amber-600 hover:bg-amber-500 hover:border-amber-500 hover:text-neutral-950'
                      }`}
                      aria-label={`Add ${prod.name} to cart`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-amber-500 hover:border-amber-500 hover:text-neutral-950 items-center justify-center text-neutral-700 shadow-sm transition-all active:scale-95 cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
