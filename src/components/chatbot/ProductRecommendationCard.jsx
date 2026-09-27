"use client";

import React from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * ProductRecommendationCard
 * Realistic, compact product recommendation card inside chatbot conversations.
 * Fits naturally into the stream without appearing like an oversized page.
 */
export default function ProductRecommendationCard({
  laptop,
  onSelectProduct,
  onWhatsAppQuote,
  onShowOther
}) {
  if (!laptop) return null;

  const [showSpecs, setShowSpecs] = React.useState(false);

  const handleDetailsClick = (e) => {
    e?.stopPropagation();
    setShowSpecs((prev) => !prev);
    if (onSelectProduct) {
      onSelectProduct(laptop);
    }
  };

  const handleCardClick = () => {
    setShowSpecs((prev) => !prev);
  };

  const handleQuoteClick = (e) => {
    e?.stopPropagation();
    if (onWhatsAppQuote) {
      onWhatsAppQuote(laptop);
    }
  };

  const handleShowOtherClick = (e) => {
    e?.stopPropagation();
    if (onShowOther) {
      onShowOther();
    }
  };

  return (
    <div className="w-full max-w-[340px] bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden text-neutral-900 font-sans my-2 select-none">
      {/* 1. Laptop Image */}
      <div
        onClick={handleCardClick}
        className="w-full h-44 bg-neutral-50 p-4 flex items-center justify-center cursor-pointer overflow-hidden border-b border-neutral-100 group"
      >
        <img
          src={laptop.image || (Array.isArray(laptop.images) ? laptop.images[0] : "/webp/landing/apple-macbook-air-silver-open.webp")}
          alt={laptop.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* 2. Laptop Name & Price */}
      <div className="p-4 flex flex-col">
        <h4
          onClick={handleCardClick}
          className="text-[14px] font-bold text-neutral-950 leading-snug line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer"
        >
          {laptop.name}
        </h4>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[17px] font-black text-neutral-950">
            {laptop.price}
          </span>
          {laptop.originalPrice && (
            <span className="text-xs text-neutral-400 line-through font-medium">
              {laptop.originalPrice}
            </span>
          )}
          {laptop.discountPercent && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              {laptop.discountPercent}
            </span>
          )}
        </div>

        {/* Inline Expandable Full Specs Detail Box */}
        {showSpecs && (
          <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-[12px] space-y-1.5 text-neutral-700 animate-fadeIn">
            {laptop.processor && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Processor:</span>
                <span className="font-semibold text-neutral-900 text-right">{laptop.processor}</span>
              </div>
            )}
            {laptop.ram && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">RAM:</span>
                <span className="font-semibold text-neutral-900">{laptop.ram}</span>
              </div>
            )}
            {laptop.storage && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Storage:</span>
                <span className="font-semibold text-neutral-900">{laptop.storage}</span>
              </div>
            )}
            {laptop.display && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Display:</span>
                <span className="font-semibold text-neutral-900">{laptop.display}</span>
              </div>
            )}
            {laptop.battery && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Battery:</span>
                <span className="font-semibold text-neutral-900">{laptop.battery}</span>
              </div>
            )}
            {laptop.warranty && (
              <div className="flex justify-between pt-1 border-t border-neutral-200">
                <span className="text-neutral-500 font-medium">Warranty:</span>
                <span className="font-bold text-emerald-700">{laptop.warranty}</span>
              </div>
            )}
            {laptop.condition && (
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Condition:</span>
                <span className="font-semibold text-neutral-900">{laptop.condition}</span>
              </div>
            )}
          </div>
        )}

        {/* 3. Action Links: See Full Details ↑ | Show Other ↑ */}
        <div className="mt-3.5 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDetailsClick}
            className={`py-2 px-2.5 rounded-xl border text-[12px] font-bold flex items-center justify-center gap-1 transition-colors text-center cursor-pointer ${
              showSpecs
                ? "border-amber-400 bg-amber-50 text-neutral-950"
                : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800"
            }`}
          >
            <span>{showSpecs ? "Hide Details" : "See Full Details"}</span>
            <span className="text-[14px] leading-none font-bold">↑</span>
          </button>

          <button
            type="button"
            onClick={handleShowOtherClick}
            className="py-2 px-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-[12px] font-bold text-neutral-800 flex items-center justify-center gap-1 transition-colors text-center cursor-pointer"
          >
            <span>Show Other</span>
            <span className="text-[14px] leading-none font-bold">↑</span>
          </button>
        </div>

        {/* 4. Large Primary Contact on WhatsApp CTA */}
        <button
          type="button"
          onClick={handleQuoteClick}
          className="mt-2.5 w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13px] font-black tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-xs"
        >
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.554 4.125 1.523 5.865l-1.616 5.908 6.07-1.593c1.674.912 3.593 1.42 5.631 1.42 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.848 0-3.575-.506-5.061-1.39l-.363-.216-3.766.988.995-3.642-.236-.376c-.958-1.528-1.469-3.3-1.469-5.164 0-5.404 4.397-9.8 9.8-9.8 5.403 0 9.8 4.396 9.8 9.8 0 5.404-4.397 9.8-9.8 9.8z" />
          </svg>
          <span>Contact on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
