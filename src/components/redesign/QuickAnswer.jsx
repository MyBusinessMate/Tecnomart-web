"use client";

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function QuickAnswer({
  title = "Quick Answer: What is TecnoMart?",
  answer = "TecnoMart is an authorized electronics retailer and certified hardware service center located on 7 Tombs Road, Tolichowki, Hyderabad. TecnoMart provides brand-new Apple iPhones, MacBooks, Windows gaming laptops, custom liquid-cooled PC configurations, certified refurbished devices with a 1-year warranty, and same-day certified screen and motherboard repairs with official manufacturer guarantees.",
  highlights = [
    "Authorized Store: 7 Tombs Rd, Tolichowki, Hyderabad",
    "Products: Smartphones, MacBooks, Laptops & Gaming PCs",
    "Repairs: Same-day certified screen, battery & chip-level repair",
    "Official Support & Hotline: +91 98663 88870"
  ],
  className = ""
}) {
  return (
    <section className={`py-6 sm:py-8 bg-amber-50/40 border-y border-amber-200/60 ${className}`}>
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-300/80 shadow-sm space-y-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 block">
                Direct Answer · AEO Summary
              </span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-950 uppercase tracking-tight">
                {title}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
            {answer}
          </p>

          {highlights && highlights.length > 0 && (
            <div className="pt-2 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
