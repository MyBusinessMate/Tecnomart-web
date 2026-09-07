"use client";

import React from 'react';
import Link from 'next/link';
import { Cpu, Wrench, ArrowLeftRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useShop } from '@/context/ShopContext';

export default function BottomDock({ onOpenSpin }) {
  const { setIsRepairOpen } = useShop();

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hi TecnoMart! 👋 I would like to enquire about products, repairs, or offers.");
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const handleRepair = () => {
    if (setIsRepairOpen) {
      setIsRepairOpen(true);
    }
  };

  return (
    <div
      data-dock="true"
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-auto"
    >
      <nav
        aria-label="Quick Actions Dock"
        className="relative bg-neutral-950/95 backdrop-blur-xl border border-neutral-800/90 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-6 shadow-2xl shadow-black/80"
      >
        {/* 1. Spin Lucky Wheel */}
        <button
          type="button"
          onClick={onOpenSpin}
          aria-label="Spin & Win Lucky Wheel"
          className="group flex flex-col items-center justify-center p-1 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-amber-400"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Spin
          </span>
        </button>

        {/* 2. PC Builder */}
        <Link
          href="/pc-builds"
          aria-label="PC Builder Configurator"
          className="group flex flex-col items-center justify-center p-1 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-white"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 group-hover:bg-white/15 flex items-center justify-center transition-colors">
            <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-300 group-hover:text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            PC Builder
          </span>
        </Link>

        {/* 3. REPAIR (Prominent / Focused Center Item) */}
        <div className="relative -mt-5 sm:-mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleRepair}
            aria-label="Book a Repair Appointment"
            className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-neutral-950 ring-4 ring-neutral-950 shadow-xl shadow-amber-500/40 flex items-center justify-center transition-transform active:scale-90 hover:scale-105 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse pointer-events-none" />
            <Wrench className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2.5] text-neutral-950 group-hover:rotate-45 transition-transform" />
          </button>
          <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-amber-400 uppercase mt-1 drop-shadow-sm whitespace-nowrap">
            Repair
          </span>
        </div>

        {/* 4. WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="Chat with TecnoMart on WhatsApp"
          className="group flex flex-col items-center justify-center p-1 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-emerald-400"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
            <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            WhatsApp
          </span>
        </button>

        {/* 5. Exchange */}
        <Link
          href="/exchange"
          aria-label="Trade-In & Exchange Options"
          className="group flex flex-col items-center justify-center p-1 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-white"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 group-hover:bg-white/15 flex items-center justify-center transition-colors">
            <ArrowLeftRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-300 group-hover:text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Exchange
          </span>
        </Link>
      </nav>
    </div>
  );
}
