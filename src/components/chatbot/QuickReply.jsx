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

  // Grid layout (e.g. Teco 4 action options)
  if (layout === "grid") {
    return (
      <div className="grid grid-cols-2 gap-2.5 my-2 w-full select-none">
        {options.map((opt) => {
          const isPrimary = opt.isPrimary || opt.id === 'opt-laptop' || opt.id === 'find-laptop' || opt.category === 'primary-yellow';

          // Choose appropriate icon based on ID
          let IconComponent = Laptop;
          if (opt.id === 'opt-pc-build' || opt.id === 'browse-refurbished' || opt.icon === 'RotateCw' || opt.icon === 'Cpu') IconComponent = RotateCw;
          if (opt.id === 'opt-products' || opt.id === 'browse-new' || opt.icon === 'ShoppingBag') IconComponent = ShoppingBag;
          if (opt.id === 'opt-store-location' || opt.id === 'talk-support' || opt.icon === 'Headphones' || opt.icon === 'MapPin') IconComponent = Headphones;

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

  // Horizontal pills layout (e.g. Study & Office, Coding, Design, Gaming, General Use, Budget choices)
  return (
    <div className="flex flex-wrap items-center gap-2 my-2 select-none" role="group" aria-label="Suggested quick replies">
      {options.map((opt) => {
        const isSelected = selectedId === opt.id || opt.isSelected;
        const isCta = opt.isCta || opt.id === 'check-products';
        const isWhatsApp = opt.isWhatsApp || opt.id === 'pc-whatsapp-cta';
        const isSecondary = opt.isSecondary || opt.id === 'update-budget';

        if (isCta) {
          return (
            <button
              key={opt.id || opt.label}
              type="button"
              onClick={() => onSelect(opt)}
              className="w-full py-3 px-4 bg-[#F5B800] hover:bg-[#eab308] text-neutral-950 text-[13.5px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm mt-1"
            >
              <span>{opt.label}</span>
              <span className="text-[16px]">→</span>
            </button>
          );
        }

        if (isWhatsApp) {
          return (
            <button
              key={opt.id || opt.label}
              type="button"
              onClick={() => onSelect(opt)}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[13.5px] font-black tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm mt-1"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.554 4.125 1.523 5.865l-1.616 5.908 6.07-1.593c1.674.912 3.593 1.42 5.631 1.42 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.848 0-3.575-.506-5.061-1.39l-.363-.216-3.766.988.995-3.642-.236-.376c-.958-1.528-1.469-3.3-1.469-5.164 0-5.404 4.397-9.8 9.8-9.8 5.403 0 9.8 4.396 9.8 9.8 0 5.404-4.397 9.8-9.8 9.8z" />
              </svg>
              <span>{opt.label}</span>
            </button>
          );
        }

        if (isSecondary) {
          return (
            <button
              key={opt.id || opt.label}
              type="button"
              onClick={() => onSelect(opt)}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-500 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11.5px] font-semibold transition-all cursor-pointer active:scale-95"
            >
              <span>{opt.label}</span>
            </button>
          );
        }

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
