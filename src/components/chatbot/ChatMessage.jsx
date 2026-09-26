"use client";

import React from 'react';
import { CheckCheck } from 'lucide-react';
import ProductRecommendationCard from './ProductRecommendationCard';
import QuickReply from './QuickReply';
import SupportEscalation from './SupportEscalation';
import { RobotAssistantAvatar, UserProfileAvatar } from './RobotAvatar';

/**
 * ChatMessage - Individual message bubble supporting text, quick replies, product cards, or support escalations
 */
export default function ChatMessage({
  message,
  onSelectQuickReply,
  onSelectProduct,
  onWhatsAppQuote,
  onWhatsAppSupport,
  onPhoneCall
}) {
  const isBot = message.sender === 'bot' || message.sender === 'assistant';

  return (
    <div
      className={`flex flex-col my-2.5 select-text ${
        isBot ? "items-start" : "items-end"
      }`}
    >
      <div className={`flex items-start gap-2.5 max-w-[88%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        {/* Assistant Robot Avatar or User Profile Avatar */}
        {isBot ? (
          <RobotAssistantAvatar className="w-8 h-8 shrink-0 mt-0.5" isOnline={false} />
        ) : null}

        {/* Message Content Container */}
        <div className="flex flex-col">
          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed font-sans whitespace-pre-line ${
              isBot
                ? "bg-[#F3F4F6] text-neutral-900 rounded-tl-xs"
                : "bg-[#F5B800] text-neutral-950 font-medium rounded-tr-xs"
            }`}
          >
            {message.title && (
              <div className="font-bold text-[14px] text-neutral-950 mb-1 flex items-center gap-1.5">
                <span>{message.title}</span>
                {message.emoji && <span>{message.emoji}</span>}
              </div>
            )}
            <div>{message.text}</div>
          </div>

          {/* Timestamp and delivery status */}
          {message.time && (
            <div
              className={`text-[11px] text-neutral-400 font-medium mt-1 flex items-center gap-1 ${
                isBot ? "justify-start pl-1" : "justify-end pr-1 text-neutral-500"
              }`}
            >
              <span>{message.time}</span>
              {!isBot && (
                <CheckCheck className="w-3.5 h-3.5 text-[#eab308] stroke-[2.5]" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Embedded Product Card if provided */}
      {message.product && (
        <div className="ml-10.5 mt-2 w-full max-w-[340px]">
          <ProductRecommendationCard
            laptop={message.product}
            onSelectProduct={onSelectProduct}
            onWhatsAppQuote={onWhatsAppQuote}
          />
        </div>
      )}

      {/* Embedded Human Support Card if flagged */}
      {message.isSupportEscalation && (
        <div className="ml-10.5 mt-2 w-full max-w-[340px]">
          <SupportEscalation
            onWhatsAppConnect={onWhatsAppSupport}
            onPhoneCall={onPhoneCall}
          />
        </div>
      )}

      {/* Embedded Quick Replies / Action Cards if provided on this message */}
      {message.quickReplies && message.quickReplies.length > 0 && (
        <div className={`${isBot ? "ml-10.5" : ""} mt-2 w-full max-w-[420px]`}>
          <QuickReply
            options={message.quickReplies}
            layout={message.quickRepliesLayout || "pills"}
            onSelect={onSelectQuickReply}
          />
        </div>
      )}
    </div>
  );
}
