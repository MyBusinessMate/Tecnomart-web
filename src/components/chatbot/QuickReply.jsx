"use client";

import React from 'react';
import {
  Laptop,
  RotateCw,
  ShoppingBag,
  Headphones,
  ChevronRight
} from 'lucide-react';

/**
 * QuickReply - Contextual suggestion chips & cards for TecnoMart Chatbot
 * Supports:
 * - 'grid': 2x2 action cards with icons & chevrons
 * - 'pills': clean horizontal pills with highlighted option
 */
export default function QuickReply({ options = [], layout = "pills", onSelect, selectedId }) {
  if (!options || options.length === 0) return null;

  // Grid layout (e.g. Find a Laptop, Browse Refurbished, Browse New Laptops, Talk to Support)
  if (layout === "grid") {
    return (
      <div className="grid grid-cols-2 gap-2.5 my-2 w-full select-none">
        {options.map((opt) => {
          const isPrimary = opt.isPrimary || opt.id === 'find-laptop' || opt.category === 'primary-yellow';

          // Choose appropriate icon
          let IconComponent = Laptop;
          if (opt.id === 'browse-refurbished' || opt.icon === 'RotateCw') IconComponent = RotateCw;
          if (opt.id === 'browse-new' || opt.icon === 'ShoppingBag') IconComponent = ShoppingBag;
          if (opt.id === 'talk-support' || opt.icon === 'Headphones') IconComponent = Headphones;

          return (
            <button
              key={opt.id || opt.label}
              type="button"
              onClick={() => onSelect(opt)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-[13px] font-bold transition-all cursor-pointer text-left active:scale-[0.98] ${
                isPrimary
                  ? "bg-[#F5B800] hover:bg-[#eab308] text-neutral-950 shadow-xs"
                  : "bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 shadow-2xs"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <IconComponent className={`w-5 h-5 shrink-0 ${isPrimary ? "stroke-[2.2]" : "stroke-[2] text-neutral-800"}`} />
                <span className="truncate">{opt.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 shrink-0 ${isPrimary ? "text-neutral-950" : "text-neutral-400"}`} />
            </button>
          );
        })}
      </div>
    );
  }

  // Horizontal pills layout (e.g. Study & Office, Coding, Design, Gaming, General Use)
  return (
    <div className="flex flex-wrap items-center gap-2 my-2 select-none" role="group" aria-label="Suggested quick replies">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id || opt.isSelected || opt.id === 'qc-study';

        return (
          <button
            key={opt.id || opt.label}
            type="button"
            onClick={() => onSelect(opt)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 ${
              isSelected
                ? "bg-[#FEF3C7] text-neutral-900 border border-[#F5B800] shadow-2xs"
                : "bg-white text-neutral-800 border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50 shadow-2xs"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
