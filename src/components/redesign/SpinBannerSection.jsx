"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Trophy, Gift, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function SpinBannerSection() {
  return (
    <section className="relative w-full overflow-hidden my-8 sm:my-12">
      {/* Outer Card Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#141414] via-[#0D0D0D] to-[#080808] border border-white/[0.12] shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden group">
        {/* Ambient Gold Showroom Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#FFD21C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#FFD21C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,210,28,0.06),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Header Tag (Strictly Rectangular/Rounded-lg, NO pill badges) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFD21C]/10 border border-[#FFD21C]/40 text-[#FFD21C] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-[#FFD21C]" />
              <span>100% Guaranteed Prize • Daily Lucky Spin</span>
            </div>

            {/* Main Punchy Heading */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-space tracking-tight text-white uppercase leading-[1.1]">
                GET A LUCKY CHANCE TO WIN{" "}
                <span className="text-[#FFD21C] drop-shadow-[0_0_25px_rgba(255,210,28,0.35)] block sm:inline">
                  GADGETS, HEADPHONES &amp; MEGA DISCOUNTS!
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base font-sans text-neutral-300 leading-relaxed max-w-xl">
              Every TecnoMart customer gets 1 official spin on our interactive reward machine!
              Unlock wireless headphones, ₹1,000 store vouchers, RGB gaming accessories, or free premium service passes.
              Claim your digital pass with verified QR code instantly.
            </p>

            {/* Feature Cards / Benefits (Zero pill badges) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-lg bg-[#FFD21C]/10 border border-[#FFD21C]/30 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4 text-[#FFD21C]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white uppercase font-space">8 Top Prizes</p>
                  <p className="text-[10px] text-neutral-400">Guaranteed win</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-lg bg-[#FFD21C]/10 border border-[#FFD21C]/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#FFD21C]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white uppercase font-space">Zero Purchase</p>
                  <p className="text-[10px] text-neutral-400">100% Free to spin</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-lg bg-[#FFD21C]/10 border border-[#FFD21C]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-white uppercase font-space">In-Store QR Pass</p>
                  <p className="text-[10px] text-neutral-400">Valid for 30 days</p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="/spin"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#FFD21C] hover:bg-[#F5B800] text-black font-space font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,210,28,0.4)] hover:shadow-[0_0_45px_rgba(255,210,28,0.6)] active:scale-98 transition-all group/btn"
              >
                <Gift className="w-5 h-5 fill-black" />
                <span>SPIN THE WHEEL NOW</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <a
                href="/spin?mode=super"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] text-white/90 font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>⚡ TEST UNLIMITED SPINS</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Teaser Wheel Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Spinning Visual Machine Teaser Container */}
            <a
              href="/spin"
              aria-label="SPIN - Open Spin & Win Machine to claim rewards"
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group/wheel cursor-pointer"
              title="Click to Open Spin & Win Machine"
            >
              {/* Outer Golden Glow Ring */}
              <div className="absolute inset-0 rounded-full border border-[#FFD21C]/40 group-hover/wheel:border-[#FFD21C] shadow-[0_0_40px_rgba(255,210,28,0.25)] group-hover/wheel:shadow-[0_0_60px_rgba(255,210,28,0.45)] transition-all animate-[spin_40s_linear_infinite]" />

              {/* Decorative Wheel Frame with Segment Accents */}
              <div className="w-[90%] h-[90%] rounded-full bg-[#111111] border-4 border-[#FFD21C] p-2 shadow-2xl relative overflow-hidden flex items-center justify-center group-hover/wheel:scale-105 transition-transform duration-500">
                {/* Wheel SVG Dial */}
                <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_25s_linear_infinite]">
                  <defs>
                    <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFD21C" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 8 Segments */}
                  {[
                    { label: "₹1,000 OFF", bg: "#1F1F1F" },
                    { label: "HEADPHONES", bg: "#161616" },
                    { label: "₹500 OFF", bg: "#1F1F1F" },
                    { label: "TEMPERED", bg: "#161616" },
                    { label: "₹250 OFF", bg: "#1F1F1F" },
                    { label: "RGB MOUSE", bg: "#161616" },
                    { label: "10% OFF", bg: "#1F1F1F" },
                    { label: "FREE SVC", bg: "#161616" },
                  ].map((seg, i) => {
                    const startAngle = (i * 45 * Math.PI) / 180;
                    const endAngle = ((i + 1) * 45 * Math.PI) / 180;
                    const x1 = 100 + 95 * Math.cos(startAngle);
                    const y1 = 100 + 95 * Math.sin(startAngle);
                    const x2 = 100 + 95 * Math.cos(endAngle);
                    const y2 = 100 + 95 * Math.sin(endAngle);

                    const textAngle = i * 45 + 22.5;
                    const textRad = (textAngle * Math.PI) / 180;
                    const tx = 100 + 64 * Math.cos(textRad);
                    const ty = 100 + 64 * Math.sin(textRad);

                    return (
                      <g key={i}>
                        <path
                          d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`}
                          fill={seg.bg}
                          stroke="#2D2D2D"
                          strokeWidth="1"
                        />
                        <circle cx={x1} cy={y1} r="2.5" fill="#FFD21C" />
                        <text
                          x={tx}
                          y={ty}
                          fill="#FFFFFF"
                          fontSize="6.5"
                          fontWeight="800"
                          fontFamily="monospace"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                        >
                          {seg.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Hub */}
                  <circle cx="100" cy="100" r="28" fill="#0A0A0A" stroke="#FFD21C" strokeWidth="2.5" />
                  <circle cx="100" cy="100" r="24" fill="url(#hubGlow)" />
                </svg>

                {/* Top Gold Fixed Pointer Indicator */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-[#FFD21C] drop-shadow-[0_0_8px_#FFD21C]" />
                </div>

                {/* Center Spin Action Button */}
                <div className="absolute z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFD21C] text-black font-space font-extrabold text-[11px] uppercase tracking-wider flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,210,28,0.6)] group-hover/wheel:scale-110 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 fill-black mb-0.5" />
                  <span>SPIN</span>
                </div>
              </div>

              {/* Floating Highlight Chips around the wheel */}
              <div className="absolute -top-3 -right-2 px-3 py-1 rounded-xl bg-black/90 border border-[#FFD21C]/60 text-[#FFD21C] text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg backdrop-blur-md hidden sm:block">
                🎧 Wireless Headphones
              </div>

              <div className="absolute -bottom-3 -left-2 px-3 py-1 rounded-xl bg-black/90 border border-[#FFD21C]/60 text-[#FFD21C] text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg backdrop-blur-md hidden sm:block">
                🎟 ₹1,000 Off Voucher
              </div>
            </a>

            <p className="mt-3 text-xs font-mono text-neutral-400 uppercase tracking-widest text-center">
              Click wheel to claim your spin →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
