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

            {/* Action CTA */}
            <div className="flex items-center pt-2">
              <a
                href="/spin"
                className="btn-wipe-yellow inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-space font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,210,28,0.4)] hover:shadow-[0_0_45px_rgba(255,210,28,0.6)] active:scale-98 transition-all group/btn cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 2.5v19M2.5 12h19M5.29 5.29l13.42 13.42M5.29 18.71l13.42-13.42" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
                <span className="relative z-10">SPIN THE WHEEL NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Teaser Wheel Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Spinning Visual Machine Teaser Container */}
            <a
              href="/spin"
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group/wheel cursor-pointer"
              title="Click to Open Spin & Win Machine"
            >
              {/* Outer Golden Glow Ring */}
              <div className="absolute inset-0 rounded-full border border-[#FFD21C]/40 group-hover/wheel:border-[#FFD21C] shadow-[0_0_40px_rgba(255,210,28,0.25)] group-hover/wheel:shadow-[0_0_60px_rgba(255,210,28,0.45)] transition-all animate-[spin_40s_linear_infinite]" />

              {/* Decorative Wheel Frame with Segment Accents */}
              <div className="w-[90%] h-[90%] rounded-full bg-[#111111] border-4 border-[#FFD21C] p-2 shadow-2xl relative overflow-hidden flex items-center justify-center group-hover/wheel:scale-105 transition-transform duration-500">
                {/* Wheel SVG Dial */}
                <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full animate-[spin_25s_linear_infinite]">
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
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5] mb-0.5" />
                  <span>SPIN</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
