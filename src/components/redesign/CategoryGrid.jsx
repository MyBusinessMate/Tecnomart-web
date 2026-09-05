"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/data/redesignAssets';
import { RefurbishedArrowsIcon, CrossedToolsIcon } from './Icons';

export default function CategoryGrid() {
  const getCategoryRoute = (catId) => {
    switch (catId) {
      case 'mobiles': return '/mobiles';
      case 'laptops': return '/laptops';
      case 'gaming-pcs': return '/gaming';
      case 'refurbished': return '/refurbished';
      case 'repairs': return '/repairs';
      case 'accessories': return '/accessories';
      default: return `/${catId}`;
    }
  };

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Heading with Wings Logo Emblem Divider */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight">
            WHAT DO YOU NEED?
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
            <img src="/logo.png" alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
          </div>
        </div>

        {/* 6 Category Cards Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {CATEGORIES.map((cat, idx) => {
            const route = getCategoryRoute(cat.id);

            return (
              <Link key={cat.id} href={route} className="block w-full h-full">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="h-full group cursor-pointer bg-transparent hover:bg-neutral-50/70 rounded-2xl p-3 sm:p-4 border border-transparent hover:border-neutral-200 transition-all duration-300 flex flex-col items-center text-center justify-between"
                >
                  {/* Card Visual / Icon Container */}
                  <div className="w-full aspect-square max-w-[100px] sm:max-w-[120px] rounded-xl bg-neutral-50 group-hover:bg-amber-50/50 flex items-center justify-center p-2 mb-3 transition-colors overflow-hidden">
                    {cat.isImage ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : cat.iconType === 'refurbished' ? (
                      <div className="p-3 bg-amber-100/60 rounded-full group-hover:bg-amber-200/70 transition-colors">
                        <RefurbishedArrowsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 group-hover:rotate-180 transition-transform duration-700" />
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-100/60 rounded-full group-hover:bg-amber-200/70 transition-colors">
                        <CrossedToolsIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 mt-auto">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-amber-600 transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-medium leading-tight line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
