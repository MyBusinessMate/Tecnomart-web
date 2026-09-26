"use client";

import React from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * ProductRecommendationCard
 * Realistic, compact product recommendation card inside chatbot conversations.
 * Fits naturally into the stream without appearing like an oversized page.
 */
export default function ProductRecommendationCard({ laptop, onSelectProduct, onWhatsAppQuote }) {
  if (!laptop) return null;

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(laptop);
    }
  };

  const handleQuoteClick = (e) => {
    e.stopPropagation();
    if (onWhatsAppQuote) {
      onWhatsAppQuote(laptop);
    }
  };

  return (
    <div className="w-full max-w-[340px] bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:border-[#F5B800] hover:shadow-md transition-all duration-200 overflow-hidden text-neutral-900 font-sans my-2 select-none group">
      {/* Top Banner Ribbon */}
      <div className="bg-neutral-900 text-white px-3 py-1 flex items-center justify-between text-[10px] font-bold">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
          <span className="uppercase tracking-wider text-[#FFD21C] font-black">
            {laptop.conditionBadge || "Refurbished"}
          </span>
        </div>
        <span className="text-neutral-400 text-[9px] font-mono">
          {laptop.availability || "In Stock"}
        </span>
      </div>

      <div className="p-3">
        {/* Upper row: Thumbnail + Details */}
        <div className="flex items-start gap-3">
          {/* Product Thumbnail */}
          <div className="relative w-20 h-20 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover:bg-amber-50/30 transition-colors">
            <img
              src={laptop.image || "/webp/landing/apple-macbook-air-silver-open.webp"}
              alt={laptop.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 truncate">
              {laptop.brand}
            </div>
            <h4 className="text-xs font-bold text-neutral-950 leading-snug line-clamp-2">
              {laptop.name}
            </h4>

            {/* Price section */}
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-sm font-black text-neutral-950">
                {laptop.price}
              </span>
              {laptop.originalPrice && (
                <span className="text-[10px] text-neutral-400 line-through font-medium">
                  {laptop.originalPrice}
                </span>
              )}
              {laptop.discount && (
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                  {laptop.discount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Specs Pills List */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100 grid grid-cols-2 gap-1 text-[10px] text-neutral-700 font-medium">
          <div className="flex items-center gap-1 truncate bg-neutral-50 px-2 py-0.8 rounded">
            <Zap className="w-2.5 h-2.5 text-[#F5B800] shrink-0" />
            <span className="truncate">{laptop.processor}</span>
          </div>
          <div className="flex items-center gap-1 truncate bg-neutral-50 px-2 py-0.8 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
            <span className="truncate">{laptop.ram} • {laptop.storage}</span>
          </div>
        </div>

        {/* Warranty Tag */}
        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50/70 px-2 py-1 rounded">
          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate">{laptop.warranty || "1 Year TecnoMart Warranty"}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {/* View Details Link */}
          <Link
            href={`/laptops/${laptop.slug || 'refurbished'}`}
            onClick={handleCardClick}
            className="w-full py-1.5 px-2 bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-black uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer text-center"
          >
            <span>View Laptop</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>

          {/* Quick WhatsApp Quote / Check Availability */}
          <button
            type="button"
            onClick={handleQuoteClick}
            className="w-full py-1.5 px-2 bg-[#F5B800] hover:bg-[#e0a700] text-neutral-950 text-[11px] font-black uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer shadow-xs"
          >
            <span>Check Unit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
