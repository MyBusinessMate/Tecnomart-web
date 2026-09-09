"use client";

import React, { Suspense } from "react";
import SEO from "@/components/SEO";
import { SoundProvider } from "@/components/spin/SoundProvider";
import { AtmosphericBackground } from "@/components/spin/AtmosphericBackground";
import { RewardExperienceApp } from "@/components/spin/RewardExperienceApp";

export default function SpinPage({ forceSuperMode = false }) {
  return (
    <SoundProvider>
      <SEO
        title="Spin & Win Daily Tech Rewards & Discount Coupons | TecnoMart Hyderabad"
        description="Spin the TecnoMart reward wheel to win instant discounts, free tempered glass, cleaning kits, and store vouchers on smartphones, MacBooks, and repairs in Hyderabad."
        keywords="spin and win Hyderabad, electronics lucky draw Hyderabad, tech discount coupons, win iPhone discount Hyderabad, TecnoMart lucky spin"
        canonicalUrl="https://tecnomart.in/spin"
        ogImageAlt="Spin & Win Daily Tech Rewards — TecnoMart Hyderabad"
      />
      <div className="relative min-h-screen bg-white text-neutral-900 selection:bg-[#FFD21C] selection:text-black overflow-x-hidden">
        {/* Dynamic Canvas Ambient Particles & Showroom Lighting */}
        <AtmosphericBackground />

        {/* Core Spin Wheel Experience Router */}
        <Suspense
          fallback={
            <div className="w-full min-h-screen bg-white flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl border-2 border-[#F5B800] border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-neutral-900 font-bold tracking-widest uppercase">
                  INITIALIZING REWARD ENGINE...
                </span>
              </div>
            </div>
          }
        >
          <RewardExperienceApp forceSuperMode={forceSuperMode} />
        </Suspense>
      </div>
    </SoundProvider>
  );
}
