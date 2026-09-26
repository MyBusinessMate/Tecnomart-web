"use client";

import React from 'react';
import { Minus, X, ShieldCheck, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { RobotAssistantAvatar } from './RobotAvatar';

/**
 * ChatHeader - Premium compact header matching reference image with Robot Assistant Avatar & Fullscreen Toggle
 */
export default function ChatHeader({ onMinimize, onClose, onReset, isFullscreen, onToggleFullscreen }) {
  return (
    <header className="relative bg-[#0f141d] text-white px-4 py-3.5 flex items-center justify-between select-none shrink-0 border-b border-neutral-800/80 rounded-t-[24px]">
      {/* Brand & Assistant Identity */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Robot Assistant Avatar matching reference image */}
        <RobotAssistantAvatar className="w-10 h-10" isOnline={true} />

        {/* Identity Details */}
        <div className="flex flex-col min-w-0 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold tracking-tight text-white whitespace-nowrap">
              TecnoMart
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5B800] text-neutral-950 text-[10px] font-black tracking-wide shadow-2xs">
              <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
              Verified
            </span>
          </div>
          <div className="text-[12px] text-neutral-300 font-medium truncate flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0 inline-block" />
            <span className="text-neutral-300">Online • Usually replies instantly</span>
          </div>
        </div>
      </div>

      {/* Window Controls matching top right */}
      <div className="flex items-center gap-2.5 shrink-0 text-neutral-300">
        {/* Fullscreen / Expand Button */}
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit full screen" : "Expand to full screen"}
            aria-label={isFullscreen ? "Exit full screen" : "Expand to full screen"}
            className="w-7 h-7 rounded-lg hover:text-white hover:bg-neutral-800/80 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 stroke-[2]" />
            ) : (
              <Maximize2 className="w-4 h-4 stroke-[2]" />
            )}
          </button>
        )}

        {/* Minimize Button */}
        <button
          type="button"
          onClick={onMinimize}
          title="Minimize chat"
          aria-label="Minimize chat"
          className="w-7 h-7 rounded-lg hover:text-white hover:bg-neutral-800/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          title="Close chat"
          aria-label="Close chat"
          className="w-7 h-7 rounded-lg hover:text-white hover:bg-neutral-800/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </header>
  );
}
