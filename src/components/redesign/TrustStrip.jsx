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
    <section className="bg-transparent pt-0 pb-8 sm:pb-12 lg:pb-14">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* White card with shadow matching reference image */}
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)] border border-neutral-200/80 -mt-6 sm:-mt-10 lg:-mt-12 relative z-20 overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-neutral-100">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-neutral-50/60 transition-colors duration-200"
                >
                  {/* Gold outline icon circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500 flex items-center justify-center flex-shrink-0 bg-white group-hover:bg-amber-500/10 group-hover:scale-105 group-hover:border-amber-600 transition-all duration-300 shadow-xs">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-tight truncate group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium leading-tight truncate">
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
