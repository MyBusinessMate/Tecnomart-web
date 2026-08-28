"use client";

import React from 'react';
import { PriceTagIcon, ExpertEngineerIcon, GenuinePartsIcon, WarrantyBadgeIcon } from './Icons';

const items = [
  {
    title: "Best Prices",
    subtitle: "Guaranteed",
    icon: PriceTagIcon,
  },
  {
    title: "Expert Engineers",
    subtitle: "Certified Professionals",
    icon: ExpertEngineerIcon,
  },
  {
    title: "Genuine Parts",
    subtitle: "100% Original",
    icon: GenuinePartsIcon,
  },
  {
    title: "Warranty",
    subtitle: "Upto 2 Years",
    icon: WarrantyBadgeIcon,
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-white py-0 border-b border-[#ECECEC]">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* White card with shadow matching reference image */}
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#ECECEC] -mt-0 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#ECECEC]">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5"
                >
                  {/* Gold outline icon circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500 flex items-center justify-center flex-shrink-0 bg-white">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#1A1A1A] leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#6B6B6B] font-medium leading-tight truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
