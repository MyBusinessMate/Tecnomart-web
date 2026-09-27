"use client";

import React from 'react';

/**
 * RobotAssistantAvatar
 * Recreates the exact robotic avatar shown in the user's reference screenshots:
 * - Bright yellow/gold body chassis (#F5B800) with soft drop shadow
 * - Top antenna with circular head
 * - Black face screen with rounded rectangle
 * - Twin glowing white oval eyes with slight tilt/curved cuteness
 * - White smile mouth
 * - Left & right yellow cylindrical ear knobs
 * - Optional online badge indicator (emerald green dot)
 */
export function RobotAssistantAvatar({ className = "w-10 h-10", isOnline = true, size = 40 }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
      {/* TecnoMart Official Logo with subtle dark container */}
      <div className="w-full h-full rounded-full bg-[#161a22] border border-[#F5B800]/40 flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
        <img
          src="/webp/logo.webp"
          alt="Teco TecnoMart Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain filter drop-shadow-[0_1px_4px_rgba(245,184,0,0.4)]"
          loading="eager"
        />
      </div>

      {/* Online indicator green dot */}
      {isOnline && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0f141d]" />
        </span>
      )}
    </div>
  );
}

/**
 * UserProfileAvatar
 * Clean, subtle user profile icon for human customer messages.
 */
export function UserProfileAvatar({ className = "w-7 h-7" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-amber-500/10 text-neutral-800 border border-amber-500/30 shrink-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5 text-neutral-700 mt-1"
      >
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
    </div>
  );
}
