"use client";

import React from 'react';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { RobotAssistantAvatar } from './RobotAvatar';

/**
 * ChatbotLauncher - Floating bottom-right trigger for TecnoMart Assistant
 * Adheres to TecnoMart brand system (#F5B800 / #0f141d) and minimal, uncluttered micro-interactions.
 */
export default function ChatbotLauncher({ isOpen, unreadCount = 0, onClick }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        id="tecnomart-chatbot-launcher"
        onClick={onClick}
        aria-label={isOpen ? "Close Teco TecnoMart Assistant" : "Chat with Teco TecnoMart Assistant"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`relative flex items-center h-14 rounded-full font-sans shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] focus-visible:ring-offset-2 cursor-pointer border overflow-hidden ${
          isOpen
            ? "w-14 justify-center bg-[#0f141d] text-white border-neutral-700/80 hover:bg-[#1a202c]"
            : isHovered
            ? "w-[240px] px-3.5 bg-[#0f141d] text-white border-[#F5B800] shadow-[0_10px_30px_rgba(245,184,0,0.25)]"
            : "w-14 justify-center bg-[#0f141d] text-white border-[#F5B800]/50 hover:border-[#F5B800]"
        }`}
      >
        {/* Avatar or Close Icon */}
        <div className="relative shrink-0 flex items-center justify-center">
          {isOpen ? (
            <div className="w-9 h-9 rounded-full bg-[#1c2331] text-[#F5B800] flex items-center justify-center">
              <X className="w-5 h-5 stroke-[2.4] transition-transform duration-200 group-hover:rotate-90" />
            </div>
          ) : (
            <RobotAssistantAvatar className="w-10 h-10" isOnline={true} />
          )}
        </div>

        {/* Long Width Expandable String Label on Hover */}
        {!isOpen && (
          <div
            className={`flex flex-col text-left pl-2.5 transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isHovered ? "opacity-100 max-w-[170px]" : "opacity-0 max-w-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[12.5px] font-black uppercase tracking-wider text-white leading-none">
                CHAT WITH US
              </span>
              <span className="inline-block px-1.5 py-0.5 bg-[#F5B800] text-neutral-950 text-[9px] font-black rounded uppercase tracking-wider leading-none">
                LIVE
              </span>
            </div>
            <span className="text-[10px] text-neutral-300 font-medium tracking-tight mt-1 leading-none">
              Teco • Online Expert
            </span>
          </div>
        )}

        {/* Unread Message Notification Bubble */}
        {!isOpen && unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} unread message`}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[#F5B800] text-neutral-950 text-[10px] font-black flex items-center justify-center shadow-md animate-bounce border-2 border-white"
          >
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
