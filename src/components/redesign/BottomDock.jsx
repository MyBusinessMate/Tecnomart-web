"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, RefreshCw } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useShop } from '@/context/ShopContext';

// 4-pointed sparkle diamond icon matching Image 4
function SpinDiamondIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

// 3 isometric cubes icon matching Image 4
function PcBuilderCubesIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Top cube */}
      <path d="M12 2L16 4.5V9L12 11.5L8 9V4.5L12 2Z" />
      <path d="M12 11.5V6.8" />
      <path d="M16 4.5L12 6.8L8 4.5" />
      {/* Bottom left cube */}
      <path d="M7 11.5L11 14V18.5L7 21L3 18.5V14L7 11.5Z" />
      <path d="M7 21V16.3" />
      <path d="M11 14L7 16.3L3 14" />
      {/* Bottom right cube */}
      <path d="M17 11.5L21 14V18.5L17 21L13 18.5V14L17 11.5Z" />
      <path d="M17 21V16.3" />
      <path d="M21 14L17 16.3L13 14" />
    </svg>
  );
}

export default function BottomDock({ onOpenSpin }) {
  const { setIsRepairOpen } = useShop();
  const [activeTab, setActiveTab] = useState('repair'); // Default active on repair as shown in Image 4

  const handleWhatsApp = () => {
    setActiveTab('whatsapp');
    const text = encodeURIComponent("Hi TecnoMart! 👋 I would like to enquire about products, repairs, or offers.");
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const handleRepair = () => {
    setActiveTab('repair');
    if (setIsRepairOpen) {
      setIsRepairOpen(true);
    }
  };

  const handleSpin = () => {
    setActiveTab('spin');
    if (onOpenSpin) {
      onOpenSpin();
    }
  };

  return (
    <div
      data-dock="true"
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] pointer-events-auto md:hidden"
    >
      <nav
        aria-label="Quick Actions Mobile Dock"
        className="relative bg-white border border-neutral-200/90 rounded-2xl px-1.5 py-1.5 flex items-center justify-between shadow-xl shadow-neutral-900/10"
      >
        {/* 1. Spin */}
        <button
          type="button"
          onClick={handleSpin}
          aria-label="Spin & Win"
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'spin'
              ? 'bg-[#F5B800] text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-900 hover:text-amber-500'
          }`}
        >
          <SpinDiamondIcon className="w-4.5 h-4.5 stroke-[2.2]" />
          <span className="text-[9.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Spin
          </span>
        </button>

        {/* Divider 1 */}
        <div className="h-6 w-[1px] bg-neutral-200/90 self-center" />

        {/* 2. PC Builder */}
        <Link
          href="/pc-builds"
          onClick={() => setActiveTab('pc-builder')}
          aria-label="PC Builder"
          className={`flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'pc-builder'
              ? 'bg-[#F5B800] text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-900 hover:text-amber-500'
          }`}
        >
          <PcBuilderCubesIcon className="w-4.5 h-4.5" />
          <span className="text-[9.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Pc Builder
          </span>
        </Link>

        {/* Divider 2 */}
        <div className="h-6 w-[1px] bg-neutral-200/90 self-center" />

        {/* 3. Repair (Active Default per Image 4) */}
        <button
          type="button"
          onClick={handleRepair}
          aria-label="Book a Repair Appointment"
          className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'repair'
              ? 'bg-[#F5B800] text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-900 hover:text-amber-500'
          }`}
        >
          <Wrench className="w-4.5 h-4.5 stroke-[2.5]" />
          <span className="text-[9.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Repair
          </span>
        </button>

        {/* Divider 3 */}
        <div className="h-6 w-[1px] bg-neutral-200/90 self-center" />

        {/* 4. WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="WhatsApp Chat"
          className={`flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'whatsapp'
              ? 'bg-[#F5B800] text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-900 hover:text-amber-500'
          }`}
        >
          <WhatsAppIcon className="w-4.5 h-4.5" />
          <span className="text-[9.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            WhatsApp
          </span>
        </button>

        {/* Divider 4 */}
        <div className="h-6 w-[1px] bg-neutral-200/90 self-center" />

        {/* 5. Exchange */}
        <Link
          href="/exchange"
          onClick={() => setActiveTab('exchange')}
          aria-label="Trade-In and Exchange"
          className={`flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === 'exchange'
              ? 'bg-[#F5B800] text-neutral-950 font-bold shadow-xs'
              : 'text-neutral-900 hover:text-amber-500'
          }`}
        >
          <RefreshCw className="w-4 h-4 stroke-[2.4]" />
          <span className="text-[9.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Exchange
          </span>
        </Link>
      </nav>
    </div>
  );
}
