"use client";

import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export default function BudgetFinder() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [usage, setUsage] = useState('');

  const categories = [
    'Mobiles / Smartphones',
    'Laptops / MacBooks',
    'Gaming PCs',
    'Custom PC Build',
    'Refurbished Devices',
    'Device Repairs',
    'Accessories & Audio',
  ];

  const budgets = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,00,000',
    'Above ₹2,00,000',
  ];

  const usages = [
    'Gaming & Esports',
    'Coding & Development',
    'Office & Productivity',
    'Content Creation & 4K Video',
    'Student & Everyday Use',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = '919010667726';
    const text = encodeURIComponent(
      `Hello TecnoMart! 🚀\nBudget recommendation request:\n- Category: ${category || 'Not specified'}\n- Budget: ${budget || 'Flexible'}\n- Usage: ${usage || 'General'}\n\nPlease suggest the best options!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="budget-finder" className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

        {/* Solid Mid Grey Card container matching reference theme */}
        <div className="bg-midgrey-900 rounded-3xl px-6 py-8 sm:px-10 sm:py-10 shadow-2xl border border-midgrey-700/60">

          {/* Title: BUDGET BATAO. BEST OPTION PAO. */}
          <div className="text-center mb-7 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight inline-flex flex-wrap items-center justify-center gap-x-2">
              <span className="text-amber-500">BUDGET</span>
              <span className="text-white">BATAO.</span>
              <span className="text-amber-500">BEST OPTION</span>
              <span className="text-white">PAO.</span>
            </h2>
          </div>

          {/* Form: 3 Dropdowns + Yellow WhatsApp CTA Button */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch lg:items-center">

              {/* Select Category Dropdown */}
              <div className="relative flex-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 bg-white text-neutral-900 text-sm font-bold pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer shadow-xs"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              {/* Budget Dropdown */}
              <div className="relative flex-1">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-12 bg-white text-neutral-900 text-sm font-bold pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer shadow-xs"
                >
                  <option value="">Your Budget (₹)</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              {/* Usage Dropdown */}
              <div className="relative flex-1">
                <select
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  className="w-full h-12 bg-white text-neutral-900 text-sm font-bold pl-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer shadow-xs"
                >
                  <option value="">Usage</option>
                  {usages.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              {/* Yellow WhatsApp Submit Button */}
              <button
                type="submit"
                className="flex-shrink-0 h-12 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl px-6 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-98 whitespace-nowrap shadow-lg shadow-amber-500/20"
              >
                <div className="w-5 h-5 rounded-full bg-midgrey-950 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>TELL US ON WHATSAPP</span>
              </button>

            </div>

            {/* Subnote with WhatsApp Icon */}
            <p className="text-center text-xs text-neutral-400 font-medium pt-2 flex items-center justify-center gap-2">
              <span className="text-emerald-500 text-base">💬</span>
              <span>Our experts will suggest the best options within your budget.</span>
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}
