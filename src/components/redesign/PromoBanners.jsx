"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Wrench, Check } from 'lucide-react';
import { ASSETS } from '@/data/redesignAssets';
import { RefurbishedArrowsIcon, CrossedToolsIcon } from './Icons';
import { BlurRevealBox } from './BlurReveal';

const REPAIR_FALLBACKS = [
  "/assets/phone-repair-service.png",
  "/images/landing/smartphone-motherboard-repair-technician.png",
  "/images/landing/img-4.png",
  "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
];

const REFURB_FALLBACKS = [
  "/assets/refurbished-laptop-deal.png",
  "/images/refurbished/refurbished-apple-macbook-pro-14-m1-pro.png",
  "/images/landing/asus-zenbook-ultrabook-charcoal.png",
  "/bento-grid-images/mackbook.png",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
];

export default function PromoBanners({ onOpenRepairModal }) {
  const [repairImgIdx, setRepairImgIdx] = React.useState(0);
  const [refurbImgIdx, setRefurbImgIdx] = React.useState(0);

  return (
    <section id="services-spotlight" className="py-4 sm:py-6 bg-white">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1: Expert Repairs */}
          <BlurRevealBox duration={0.6} yOffset={20}>
            <div className="relative rounded-[22px] bg-[#F6EEE3] p-6 sm:p-8 border border-[#E8D5B7] shadow-xs overflow-hidden flex flex-col justify-between h-full group min-h-[240px]">
              
              <div className="relative z-10 max-w-[60%] sm:max-w-[62%] space-y-3">
                {/* Header Badge */}
                <div className="flex items-center gap-2.5">
                  <CrossedToolsIcon className="w-5 h-5 text-neutral-900" />
                  <span className="text-[11px] sm:text-xs font-black tracking-wider text-neutral-800 uppercase">
                    FAST. RELIABLE. AFFORDABLE.
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                  EXPERT REPAIRS
                </h3>

                {/* Key Features List */}
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-800 font-semibold pt-0.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Screen Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Battery Replacement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Software Issues &amp; More</span>
                  </li>
                </ul>

                {/* Solid Yellow Pill CTA Button */}
                <div className="pt-1.5 sm:pt-2">
                  <button
                    onClick={onOpenRepairModal}
                    className="btn-wipe-yellow inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold sm:font-black tracking-normal sm:tracking-wider active:scale-95 cursor-pointer shadow-xs sm:shadow-sm"
                  >
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current relative z-10" />
                    <span className="relative z-10">BOOK A REPAIR</span>
                  </button>
                </div>
              </div>

              {/* Hand Holding Smartphone Cutout Image on Right Side */}
              <div className="absolute right-0 bottom-0 top-0 w-[45%] sm:w-[42%] flex items-end justify-end pointer-events-none pr-1">
                <img
                  src={REPAIR_FALLBACKS[repairImgIdx]}
                  alt="Expert Phone Repair"
                  onError={() => {
                    if (repairImgIdx < REPAIR_FALLBACKS.length - 1) {
                      setRepairImgIdx((prev) => prev + 1);
                    }
                  }}
                  className="w-full max-h-[210px] sm:max-h-[240px] object-contain object-bottom group-hover:scale-105 transition-transform duration-500 filter drop-shadow-md"
                />
              </div>

            </div>
          </BlurRevealBox>

          {/* Card 2: Smarter Prices (Refurbished) */}
          <BlurRevealBox duration={0.6} delay={0.1} yOffset={20}>
            <div className="relative rounded-[22px] bg-[#F6EEE3] p-6 sm:p-8 border border-[#E8D5B7] shadow-xs overflow-hidden flex flex-col justify-between h-full group min-h-[240px]">
              
              <div className="relative z-10 max-w-[60%] sm:max-w-[62%] space-y-3">
                {/* Header Badge */}
                <div className="flex items-center gap-2.5">
                  <RefurbishedArrowsIcon className="w-5 h-5 text-neutral-900" />
                  <span className="text-[11px] sm:text-xs font-black tracking-wider text-neutral-800 uppercase">
                    SMART TECH.
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight">
                  <span className="text-[#F5B800]">SMARTER</span>{" "}
                  <span className="text-neutral-950">PRICES.</span>
                </h3>

                {/* Key Features List */}
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-800 font-semibold pt-0.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Quality Checked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Best Condition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                    <span>Budget Friendly</span>
                  </li>
                </ul>

                {/* Solid Yellow Pill CTA Button */}
                <div className="pt-1.5 sm:pt-2">
                  <Link
                    href="/refurbished"
                    className="btn-wipe-yellow inline-flex items-center gap-1 sm:gap-1.5 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold sm:font-black tracking-normal sm:tracking-wider active:scale-95 shadow-xs sm:shadow-sm"
                  >
                    <span className="relative z-10">EXPLORE REFURBISHED</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] relative z-10" />
                  </Link>
                </div>
              </div>

              {/* Laptop Cutout Image on Right Side */}
              <div className="absolute right-0 bottom-0 top-0 w-[45%] sm:w-[42%] flex items-center justify-end pointer-events-none pr-2">
                <img
                  src={REFURB_FALLBACKS[refurbImgIdx]}
                  alt="Refurbished Laptop Deals"
                  onError={() => {
                    if (refurbImgIdx < REFURB_FALLBACKS.length - 1) {
                      setRefurbImgIdx((prev) => prev + 1);
                    }
                  }}
                  className="w-full max-h-[180px] sm:max-h-[210px] object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-md"
                />
              </div>

            </div>
          </BlurRevealBox>

        </div>
      </div>
    </section>
  );
}
