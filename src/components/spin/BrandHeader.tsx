"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SoundToggle } from "./SoundProvider";

export function BrandHeader() {
  return (
    <header className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between">
      {/* Brand Identity */}
      <Link to="/" className="flex flex-col group cursor-pointer select-none">
        <div className="flex items-baseline space-x-1.5 font-heading">
          <span className="text-xl sm:text-2xl font-black tracking-[0.18em] text-neutral-950 uppercase">
            TECNO
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-[0.18em] text-[#F5B800] uppercase">
            MART
          </span>
        </div>
        {/* Sleek Golden Baseline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#F5B800] via-[#FFD21C] to-transparent mt-0.5 shadow-[0_0_10px_rgba(245,184,0,0.4)]" />
      </Link>

      {/* Right Controls: Back to Store + Sound Synthesizer */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5">
        <Link
          to="/"
          className="text-xs font-mono font-bold text-neutral-800 hover:text-black transition-colors flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-neutral-100 whitespace-nowrap shadow-xs"
          title="Back to Store"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">BACK TO STORE</span>
        </Link>
        <SoundToggle />
      </div>
    </header>
  );
}
