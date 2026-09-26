"use client";

import React from 'react';
import { RobotAssistantAvatar } from './RobotAvatar';

/**
 * TypingIndicator - Subtle pulsing assistant typing state
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1.5 px-3 select-none ml-10">
      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: '0ms' }} />
      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: '200ms' }} />
      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 animate-pulse" style={{ animationDelay: '400ms' }} />
    </div>
  );
}
