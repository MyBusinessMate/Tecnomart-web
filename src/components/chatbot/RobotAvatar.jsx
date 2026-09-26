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
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_6px_rgba(245,184,0,0.35)]"
      >
        {/* Antenna rod */}
        <rect x="47" y="6" width="6" height="12" rx="3" fill="#D99B00" />
        {/* Antenna top sphere */}
        <circle cx="50" cy="8" r="6" fill="#FFD21C" stroke="#D99B00" strokeWidth="2" />

        {/* Ear knobs (Left & Right) */}
        <rect x="8" y="42" width="8" height="18" rx="4" fill="#D99B00" />
        <rect x="10" y="44" width="5" height="14" rx="2.5" fill="#FFD21C" />

        <rect x="84" y="42" width="8" height="18" rx="4" fill="#D99B00" />
        <rect x="85" y="44" width="5" height="14" rx="2.5" fill="#FFD21C" />

        {/* Robot Head Body (Soft rounded gold/amber shape) */}
        <rect
          x="14"
          y="18"
          width="72"
          height="66"
          rx="26"
          fill="url(#goldGradient)"
          stroke="#E0A300"
          strokeWidth="2"
        />

        {/* Head highlight gloss at top edge */}
        <path
          d="M26 24C32 21 44 20 50 20C56 20 68 21 74 24"
          stroke="#FFF2A3"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Inner Black Screen Mask */}
        <rect
          x="24"
          y="32"
          width="52"
          height="40"
          rx="16"
          fill="#111317"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* Robot White Eyes */}
        <ellipse cx="40" cy="50" rx="4.5" ry="6" fill="#FFFFFF" />
        <ellipse cx="60" cy="50" rx="4.5" ry="6" fill="#FFFFFF" />

        {/* Cute Smile */}
        <path
          d="M43 61C46 64 54 64 57 61"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Subtle Cheek Blushes */}
        <circle cx="31" cy="58" r="3" fill="#FFD21C" opacity="0.4" />
        <circle cx="69" cy="58" r="3" fill="#FFD21C" opacity="0.4" />

        <defs>
          <linearGradient id="goldGradient" x1="50" y1="18" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD21C" />
            <stop offset="1" stopColor="#F5B800" />
          </linearGradient>
        </defs>
      </svg>

      {/* Online indicator ping */}
      {isOnline && (
        <span className="absolute bottom-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-900" />
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
