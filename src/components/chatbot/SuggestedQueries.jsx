"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Sparkles, MessageCircleQuestion, ArrowUpRight } from 'lucide-react';

export const SUGGESTED_QUERIES_DATA = [
  {
    id: "q1",
    question: "Do refurbished laptops come with a genuine warranty?",
    answer: "Yes! Every refurbished laptop at TecnoMart undergoes a comprehensive 32-point hardware and thermal inspection and comes with a 6 to 12 months direct store warranty and official GST tax invoice.",
    tag: "Warranty"
  },
  {
    id: "q2",
    question: "Can I inspect the laptop over video call before ordering?",
    answer: "Absolutely! Our Tolichowki store team provides live WhatsApp video calls to show you the exact physical condition, screen quality, battery cycle count, and performance benchmark.",
    tag: "Inspection"
  },
  {
    id: "q3",
    question: "How fast is delivery in Hyderabad?",
    answer: "We offer express same-day doorstep delivery within 4 hours across Hyderabad and Secunderabad, along with complimentary setup assistance.",
    tag: "Delivery"
  },
  {
    id: "q4",
    question: "Can I upgrade the RAM and SSD before purchase?",
    answer: "Yes! Our certified engineers can upgrade your RAM up to 32GB/64GB and install blazing-fast NVMe SSDs before dispatch or at our showroom.",
    tag: "Upgrades"
  },
  {
    id: "q5",
    question: "What is the return and replacement policy?",
    answer: "We offer a 7-day replacement guarantee if any hardware defect arises, backed by direct store service support without lengthy service center delays.",
    tag: "Returns"
  }
];

/**
 * SuggestedQueries
 * "People Also Ask" FAQ accordion & query pill suggestions matching reference image.
 */
export default function SuggestedQueries({ onSelectQuestion }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id, e) => {
    e?.stopPropagation();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full my-2.5 bg-white rounded-2xl border border-neutral-200/90 shadow-2xs p-3 font-sans select-none">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
        <div className="flex items-center gap-1.5">
          <MessageCircleQuestion className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-neutral-900 tracking-tight">
            People Also Ask
          </span>
        </div>
        <span className="text-[10px] text-neutral-400 font-mono">Frequently Asked</span>
      </div>

      <div className="space-y-1.5">
        {SUGGESTED_QUERIES_DATA.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-100 hover:border-neutral-300 transition-colors overflow-hidden bg-neutral-50/60"
            >
              <button
                type="button"
                onClick={(e) => toggleExpand(item.id, e)}
                className="w-full px-3 py-2 text-left flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider shrink-0">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-800 truncate">
                    {item.question}
                  </span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    isExpanded ? "rotate-90 text-blue-600" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-3 pb-2.5 pt-1 text-[11px] text-neutral-600 leading-relaxed border-t border-neutral-100 bg-white">
                  <p>{item.answer}</p>
                  {onSelectQuestion && (
                    <button
                      type="button"
                      onClick={() => onSelectQuestion(item.question)}
                      className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask in chat</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
