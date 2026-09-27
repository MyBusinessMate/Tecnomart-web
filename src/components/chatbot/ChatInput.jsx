"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

/**
 * ChatInput - Bottom message composer with autofocus and clean separation
 */
export default function ChatInput({ onSendMessage, disabled = false, placeholder = "Type your message...", isFullscreen = false }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`p-3.5 bg-white border-t border-neutral-100 select-none shrink-0 ${
      isFullscreen ? "rounded-none" : "rounded-b-[24px]"
    }`}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
        {/* Clean Text Input Pill without emojis/attachments */}
        <div className="relative flex-1 flex items-center bg-neutral-50 hover:bg-neutral-100/70 focus-within:bg-white rounded-full border border-neutral-200/90 focus-within:border-[#F5B800] focus-within:ring-2 focus-within:ring-[#F5B800]/20 transition-all px-4.5 py-2">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            aria-label="Chat input message"
            className="w-full h-7 bg-transparent text-[13.5px] text-neutral-900 outline-none placeholder:text-neutral-400 font-sans"
          />
        </div>

        {/* Circular Yellow Send Button with perfectly centered black arrow */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm ${
            text.trim() && !disabled
              ? "bg-[#F5B800] text-black hover:bg-[#eab308] active:scale-95"
              : "bg-[#F5B800] text-black/75 hover:bg-[#eab308]"
          }`}
        >
          <Send className="w-4.5 h-4.5 fill-black stroke-black block" />
        </button>
      </form>
    </div>
  );
}
