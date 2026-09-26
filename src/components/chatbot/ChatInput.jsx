"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

/**
 * ChatInput - Bottom message composer with autofocus and clean separation
 */
export default function ChatInput({ onSendMessage, disabled = false, placeholder = "Type your message..." }) {
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
    <div className="p-3.5 bg-white border-t border-neutral-100 select-none shrink-0 rounded-b-[24px]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
        {/* Attachment icon button */}
        <button
          type="button"
          aria-label="Attach file or screenshot"
          title="Share laptop requirement or screenshot"
          onClick={() => {
            if (onSendMessage) {
              onSendMessage("I have a screenshot of the laptop I want. Can you check if it's available in your store?");
            }
          }}
          className="w-10 h-10 rounded-full text-neutral-800 hover:text-black hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <Paperclip className="w-5 h-5 -rotate-45 stroke-[2.2]" />
        </button>

        {/* Text Input Pill */}
        <div className="relative flex-1 flex items-center bg-neutral-50/90 hover:bg-neutral-100/80 focus-within:bg-white rounded-full border border-neutral-200/90 focus-within:border-[#F5B800] focus-within:ring-2 focus-within:ring-[#F5B800]/20 transition-all px-4 py-1.5">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            aria-label="Chat input message"
            className="w-full h-8 bg-transparent text-[13.5px] text-neutral-900 outline-none placeholder:text-neutral-400 font-sans"
          />

          {/* Smiley icon */}
          <button
            type="button"
            aria-label="Add emoji"
            className="text-neutral-500 hover:text-neutral-800 transition-colors p-1"
          >
            <Smile className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Circular Yellow Send Button with black arrow */}
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm ${
            text.trim() && !disabled
              ? "bg-[#F5B800] text-black hover:bg-[#eab308] active:scale-95"
              : "bg-[#F5B800] text-black/80 hover:bg-[#eab308]"
          }`}
        >
          <Send className="w-5 h-5 fill-black stroke-black translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
