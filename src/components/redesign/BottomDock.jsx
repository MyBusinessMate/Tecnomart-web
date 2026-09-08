"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

// 1. Spin sparkle icon matching screenshot
function SpinSparkleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {/* Primary sparkle star */}
      <path d="M12 2.5C12 7 14 9 18.5 9C14 9 12 11 12 15.5C12 11 10 9 5.5 9C10 9 12 7 12 2.5Z" />
      {/* Secondary accent sparkle */}
      <path d="M18.5 15C18.5 17 19.3 17.8 21.2 17.8C19.3 17.8 18.5 18.6 18.5 20.6C18.5 18.6 17.7 17.8 15.8 17.8C17.7 17.8 18.5 17 18.5 15Z" />
    </svg>
  );
}

// 2. 3 connected hexagons icon for PC Builder matching screenshot
function PcBuilderHexagonsIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Top hexagon */}
      <path d="M12 2.8L15.6 4.9V9.1L12 11.2L8.4 9.1V4.9L12 2.8Z" />
      {/* Bottom-left hexagon with internal check */}
      <path d="M8.4 10.8L12 12.9V17.1L8.4 19.2L4.8 17.1V12.9L8.4 10.8Z" />
      <path d="M7 15L8.2 16.2L10.2 13.8" strokeWidth="1.8" />
      {/* Bottom-right hexagon */}
      <path d="M15.6 10.8L19.2 12.9V17.1L15.6 19.2L12 17.1V12.9L15.6 10.8Z" />
    </svg>
  );
}

// 4. Contact speech bubble with telephone handset matching screenshot
function ContactPhoneBubbleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9.2c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.3l.6 1.4c.1.2.1.4-.1.6l-.3.4c.3.5.7.9 1.2 1.2l.4-.3c.2-.2.4-.2.6-.1l1.4.6c.2.1.3.2.3.4v.5c0 .3 0 .5-.4.7-.5.3-1.6.2-3-1.2-1.4-1.4-1.5-2.5-1.2-3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 5. Circular exchange / refresh arrows matching screenshot
function ExchangeArrowsIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M21 21v-5h-5" />
    </svg>
  );
}

export default function BottomDock({ onOpenSpin }) {
  const { setIsRepairOpen, confirmWhatsApp } = useShop();
  const [activeTab, setActiveTab] = useState('repair'); // Default active on repair as shown in user reference

  const handleWhatsApp = () => {
    setActiveTab('contact');
    const text = encodeURIComponent("Hi TecnoMart! 👋 I would like to enquire about products, repairs, or offers.");
    const url = `https://wa.me/919010667726?text=${text}`;
    if (confirmWhatsApp) {
      confirmWhatsApp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleRepair = () => {
    setActiveTab('repair');
    if (setIsRepairOpen) {
      setIsRepairOpen(true);
    }
  };

  const handleSpin = () => {
    setActiveTab('spin');
    window.location.href = '/spin';
  };

  return (
    <div
      data-dock="true"
      className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pointer-events-auto md:hidden pb-[max(env(safe-area-inset-bottom,0px),0.25rem)]"
    >
      <nav
        aria-label="Quick Actions Mobile Navigation"
        className="w-full flex items-center justify-between px-1 py-1"
      >
        {/* 1. Spin */}
        <button
          type="button"
          onClick={handleSpin}
          aria-label="Spin & Win"
          className="flex-1 min-h-[52px] flex flex-col items-center justify-center py-1 cursor-pointer transition-all duration-200 focus:outline-none group"
        >
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === 'spin'
                ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                : 'text-neutral-800 group-hover:text-neutral-950'
            }`}
          >
            <SpinSparkleIcon className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
              activeTab === 'spin'
                ? 'font-bold text-[#854D0E]'
                : 'font-medium text-neutral-600 group-hover:text-neutral-900'
            }`}
          >
            Spin
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mt-0.5 ${
              activeTab === 'spin'
                ? 'bg-[#F5B800] opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          />
        </button>

        {/* Divider 1 */}
        <div className="h-7 w-[1px] bg-neutral-200/80 self-center flex-shrink-0" />

        {/* 2. PC Builder */}
        <Link
          href="/pc-builds"
          onClick={() => setActiveTab('pc-builder')}
          aria-label="PC Builder"
          className="flex-1 min-h-[52px] flex flex-col items-center justify-center py-1 cursor-pointer transition-all duration-200 focus:outline-none group"
        >
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === 'pc-builder'
                ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                : 'text-neutral-800 group-hover:text-neutral-950'
            }`}
          >
            <PcBuilderHexagonsIcon className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
              activeTab === 'pc-builder'
                ? 'font-bold text-[#854D0E]'
                : 'font-medium text-neutral-600 group-hover:text-neutral-900'
            }`}
          >
            Pc Builder
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mt-0.5 ${
              activeTab === 'pc-builder'
                ? 'bg-[#F5B800] opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          />
        </Link>

        {/* Divider 2 */}
        <div className="h-7 w-[1px] bg-neutral-200/80 self-center flex-shrink-0" />

        {/* 3. Repair (Active Default per screenshot) */}
        <button
          type="button"
          onClick={handleRepair}
          aria-label="Book a Repair Appointment"
          className="flex-1 min-h-[52px] flex flex-col items-center justify-center py-1 cursor-pointer transition-all duration-200 focus:outline-none group"
        >
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === 'repair'
                ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                : 'text-neutral-800 group-hover:text-neutral-950'
            }`}
          >
            <Wrench className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
              activeTab === 'repair'
                ? 'font-bold text-[#854D0E]'
                : 'font-medium text-neutral-600 group-hover:text-neutral-900'
            }`}
          >
            Repair
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mt-0.5 ${
              activeTab === 'repair'
                ? 'bg-[#F5B800] opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          />
        </button>

        {/* Divider 3 */}
        <div className="h-7 w-[1px] bg-neutral-200/80 self-center flex-shrink-0" />

        {/* 4. Contact */}
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="Contact Us on WhatsApp"
          className="flex-1 min-h-[52px] flex flex-col items-center justify-center py-1 cursor-pointer transition-all duration-200 focus:outline-none group"
        >
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === 'contact'
                ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                : 'text-neutral-800 group-hover:text-neutral-950'
            }`}
          >
            <ContactPhoneBubbleIcon className="w-5 h-5" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
              activeTab === 'contact'
                ? 'font-bold text-[#854D0E]'
                : 'font-medium text-neutral-600 group-hover:text-neutral-900'
            }`}
          >
            Contact
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mt-0.5 ${
              activeTab === 'contact'
                ? 'bg-[#F5B800] opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          />
        </button>

        {/* Divider 4 */}
        <div className="h-7 w-[1px] bg-neutral-200/80 self-center flex-shrink-0" />

        {/* 5. Exchange */}
        <Link
          href="/exchange"
          onClick={() => setActiveTab('exchange')}
          aria-label="Trade-In and Exchange"
          className="flex-1 min-h-[52px] flex flex-col items-center justify-center py-1 cursor-pointer transition-all duration-200 focus:outline-none group"
        >
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
              activeTab === 'exchange'
                ? 'bg-[#F5B800] text-neutral-950 shadow-xs'
                : 'text-neutral-800 group-hover:text-neutral-950'
            }`}
          >
            <ExchangeArrowsIcon className="w-4.5 h-4.5" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors duration-200 ${
              activeTab === 'exchange'
                ? 'font-bold text-[#854D0E]'
                : 'font-medium text-neutral-600 group-hover:text-neutral-900'
            }`}
          >
            Exchange
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mt-0.5 ${
              activeTab === 'exchange'
                ? 'bg-[#F5B800] opacity-100 scale-100'
                : 'opacity-0 scale-50'
            }`}
          />
        </Link>
      </nav>
    </div>
  );
}

