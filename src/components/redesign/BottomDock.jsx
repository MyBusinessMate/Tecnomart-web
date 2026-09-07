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
      className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] pointer-events-auto md:hidden"
    >
      <nav
        aria-label="Quick Actions Dock"
        className="relative bg-neutral-950/95 backdrop-blur-xl border border-neutral-800/90 rounded-xl px-3 py-1.5 flex items-center justify-between gap-3.5 shadow-2xl shadow-black/90"
      >
        {/* 1. Spin Lucky Wheel */}
        <button
          type="button"
          onClick={onOpenSpin}
          aria-label="Spin & Win Lucky Wheel"
          className="group flex flex-col items-center justify-center p-0.5 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-amber-400"
        >
          <div className="relative w-7 h-7 rounded-lg bg-neutral-900 group-hover:bg-amber-500/20 flex items-center justify-center transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <span className="text-[8.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Spin
          </span>
        </button>

        {/* 2. PC Builder */}
        <Link
          href="/pc-builds"
          aria-label="PC Builder Configurator"
          className="group flex flex-col items-center justify-center p-0.5 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-white"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 group-hover:bg-white/15 flex items-center justify-center transition-colors">
            <Cpu className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white" />
          </div>
          <span className="text-[8.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            PC Builder
          </span>
        </Link>

        {/* 3. REPAIR (Priority / Focus Center Item with minimum rounded corners) */}
        <div className="relative -mt-3.5 flex flex-col items-center">
          <button
            type="button"
            onClick={handleRepair}
            aria-label="Book a Repair Appointment"
            className="group relative w-10.5 h-10.5 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-neutral-950 ring-2 ring-neutral-950 shadow-lg shadow-amber-500/40 flex items-center justify-center transition-transform active:scale-90 hover:scale-105 cursor-pointer"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse pointer-events-none" />
            <Wrench className="w-5 h-5 stroke-[2.5] text-neutral-950 group-hover:rotate-45 transition-transform" />
          </button>
          <span className="text-[9px] font-black tracking-tight text-amber-400 uppercase mt-0.5 drop-shadow-sm whitespace-nowrap">
            Repair
          </span>
        </div>

        {/* 4. WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="Chat with TecnoMart on WhatsApp"
          className="group flex flex-col items-center justify-center p-0.5 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-emerald-400"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
            <WhatsAppIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[8.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            WhatsApp
          </span>
        </button>

        {/* 5. Exchange */}
        <Link
          href="/exchange"
          aria-label="Trade-In & Exchange Options"
          className="group flex flex-col items-center justify-center p-0.5 cursor-pointer transition-transform active:scale-95 text-neutral-400 hover:text-white"
        >
          <div className="w-7 h-7 rounded-lg bg-neutral-900 group-hover:bg-white/15 flex items-center justify-center transition-colors">
            <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white" />
          </div>
          <span className="text-[8.5px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
            Exchange
          </span>
        </Link>
      </nav>
    </div>
  );
}
