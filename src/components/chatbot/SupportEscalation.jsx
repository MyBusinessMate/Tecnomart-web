"use client";

import React from 'react';
import { PhoneCall, MessageSquare, Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { TECNOMART_CHATBOT_INFO } from './chatbotData';

/**
 * SupportEscalation - Connect directly with a human executive at Tolichowki store
 */
export default function SupportEscalation({ onWhatsAppConnect, onPhoneCall }) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello TecnoMart Support! 👋 I need assistance choosing a laptop from your store.");
    const url = `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${text}`;
    if (onWhatsAppConnect) {
      onWhatsAppConnect(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    if (onPhoneCall) {
      onPhoneCall();
    } else {
      window.location.href = `tel:${TECNOMART_CHATBOT_INFO.phone}`;
    }
  };

  return (
    <div className="w-full max-w-[340px] bg-white rounded-xl border border-neutral-200 shadow-xs p-3.5 my-2 text-neutral-900 font-sans">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <PhoneCall className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-tight text-neutral-950">
            Talk to TecnoMart Support
          </h4>
          <p className="text-[10px] text-neutral-500 font-medium">
            Tolichowki Flagship Store • Hyderabad
          </p>
        </div>
      </div>

      {/* Support Hub Links Matching Reference Image */}
      <div className="space-y-1.5 my-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100/80 transition-colors text-[11px] text-neutral-800 font-semibold cursor-pointer" onClick={handleWhatsApp}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <div>
              <p className="leading-tight">Talk to a Support Executive</p>
              <p className="text-[9.5px] font-normal text-neutral-500">Get live help from our Tolichowki team</p>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-neutral-400" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100/80 transition-colors text-[11px] text-neutral-800 font-semibold cursor-pointer" onClick={() => window.open('https://wa.me/919866388870?text=Hi!%20I%20want%20to%20track%20my%20order', '_blank')}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div>
              <p className="leading-tight">Check Order Status</p>
              <p className="text-[9.5px] font-normal text-neutral-500">Track your order or delivery</p>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-neutral-400" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100/80 transition-colors text-[11px] text-neutral-800 font-semibold cursor-pointer" onClick={() => window.location.href = '/terms'}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <div>
              <p className="leading-tight">Warranty &amp; Returns</p>
              <p className="text-[9.5px] font-normal text-neutral-500">Know our 1-Year store guarantee</p>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-neutral-400" />
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100/80 transition-colors text-[11px] text-neutral-800 font-semibold cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/8ZeEuSuASBZwx1Ci7', '_blank')}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div>
              <p className="leading-tight">Store Location &amp; Hours</p>
              <p className="text-[9.5px] font-normal text-neutral-500">7 Tombs Rd, Tolichowki (10:30 AM - 9:30 PM)</p>
            </div>
          </div>
          <ArrowRight className="w-3 h-3 text-neutral-400" />
        </div>
      </div>

      <div className="space-y-1 text-[10px] text-neutral-500 mb-2.5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
          <span>Our team is available daily from 10:30 AM to 9:30 PM</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer shadow-xs"
        >
          <span>WhatsApp</span>
          <ArrowRight className="w-3 h-3 stroke-[2.4]" />
        </button>

        <button
          type="button"
          onClick={handleCall}
          className="w-full py-2 px-2.5 bg-neutral-950 hover:bg-neutral-800 text-amber-400 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer"
        >
          <span>Call Store</span>
        </button>
      </div>
    </div>
  );
}
