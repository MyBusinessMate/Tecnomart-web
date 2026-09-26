"use client";

import React from 'react';
import { AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

/**
 * ErrorState - Friendly fallback state when connection or response fails
 */
export default function ErrorState({ onRetry, onEscalateSupport }) {
  return (
    <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 my-3 text-center font-sans shadow-2xs">
      <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h4 className="text-xs font-bold text-neutral-900 mb-1">
        Connection Interrupted
      </h4>
      <p className="text-[11px] text-neutral-600 leading-relaxed mb-3">
        Looks like we're having trouble connecting right now. Please try again or contact TecnoMart support directly.
      </p>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Try Again</span>
        </button>

        <button
          type="button"
          onClick={onEscalateSupport}
          className="px-3 py-1.5 rounded-lg bg-[#0f141d] hover:bg-[#1a202c] text-[#FFD21C] text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
        >
          <MessageSquare className="w-3 h-3" />
          <span>WhatsApp Support</span>
        </button>
      </div>
    </div>
  );
}
