"use client";

import React from 'react';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { RobotAssistantAvatar } from './RobotAvatar';

/**
 * ChatbotLauncher - Floating bottom-right trigger for TecnoMart Assistant
 * Adheres to TecnoMart brand system (#F5B800 / #0f141d) and minimal, uncluttered micro-interactions.
 */
export default function ChatbotLauncher({ isOpen, unreadCount = 0, onClick }) {
  return (
    <div className="relative">
      <button
        type="button"
        id="tecnomart-chatbot-launcher"
        onClick={onClick}
        aria-label={isOpen ? "Close TecnoMart Assistant" : "Open TecnoMart Assistant chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`relative flex items-center gap-2.5 h-13 px-4 sm:px-4.5 rounded-full font-sans shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] focus-visible:ring-offset-2 select-none group cursor-pointer ${
          isOpen
            ? "bg-[#0f141d] text-white border border-neutral-700/80 hover:bg-[#1a202c]"
            : "bg-[#0f141d] text-white border border-[#F5B800]/40 hover:border-[#F5B800] hover:shadow-[0_8px_25px_rgba(245,184,0,0.22)] active:scale-95"
        }`}
      >
        {/* Animated Brand Robot Avatar */}
        <div className="relative shrink-0">
          {isOpen ? (
            <div className="w-8 h-8 rounded-full bg-[#1c2331] text-[#F5B800] flex items-center justify-center">
              <X className="w-4.5 h-4.5 stroke-[2.4] transition-transform duration-200 group-hover:rotate-90" />
            </div>
          ) : (
            <RobotAssistantAvatar className="w-8.5 h-8.5" isOnline={true} />
          )}
        </div>

        {/* Text Label: visible on desktop, compact on mobile */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[12px] font-black uppercase tracking-wider text-white leading-tight flex items-center gap-1.5">
            {isOpen ? "Close" : "Chat with Us"}
            {!isOpen && (
              <span className="inline-block px-1.5 py-0.2 bg-[#F5B800] text-neutral-950 text-[9px] font-black rounded uppercase tracking-wider">
                LIVE
              </span>
            )}
          </span>
          {!isOpen && (
            <span className="text-[10px] text-neutral-400 font-medium tracking-tight">
              Laptop Expert Online
            </span>
          )}
        </div>

        {/* Unread Message Notification Bubble */}
        {!isOpen && unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} unread message`}
            className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#F5B800] text-neutral-950 text-[10px] font-black flex items-center justify-center shadow-md animate-bounce border-2 border-white"
          >
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
