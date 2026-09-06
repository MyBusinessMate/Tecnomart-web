"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: "1. Product Authenticity & Manufacturer Warranty",
    body: "All brand-new retail products (smartphones, laptops, components, peripherals) sold by TecnoMart are genuine, sealed units backed by direct brand authorized warranty across India. Warranty terms and durations are governed by the respective manufacturer (Apple, Samsung, ASUS, NVIDIA, Dell, Lenovo, etc.).",
  },
  {
    title: "2. Certified Refurbished Warranty & Replacement",
    body: "Refurbished hardware items carry a 1-Year TecnoMart Hardware Warranty and an initial 7-Day Replacement Guarantee for functional defects. Warranty excludes accidental drops, liquid spills, unauthorized third-party tampering, or intentional physical breakage occurring after delivery.",
  },
  {
    title: "3. Repair Service SLA & 90-Day Coverage",
    body: "Screens, batteries, charging ports, and micro-soldered IC replacements performed at our Jubilee Hills service center include a 90-Day Functional Warranty on the replaced component. In the rare event a replaced component fails under normal usage within 90 days, we repair or replace the part at zero cost.",
  },
  {
    title: "4. Custom PC Builds & Stress Testing",
    body: "All custom rigs are subject to 12 hours of thermal and memory stress testing prior to dispatch. Individual components retain their respective manufacturer warranties (typically 3 to 10 years). TecnoMart provides complimentary lifetime assembly and cable troubleshooting support.",
  },
  {
    title: "5. Return & Cancellation Policy",
    body: "Orders can be cancelled before physical dispatch or component unsealing. For delivered goods, returns are accepted within 7 days in original sealed condition. Custom-built PC systems with opened seal components are eligible for technical component replacement under warranty rather than full cancellation once assembled.",
  },
];

export default function TermsPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Terms &amp; Conditions</span>
            </nav>

            {/* Page Header - Seamless Editorial Style */}
            <div className="mb-10 pb-6 border-b border-neutral-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest block">LEGAL &amp; WARRANTY</span>
                <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight mt-1">
                  Terms &amp; Conditions
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium">
                  Warranty Policy, Service SLA &amp; Return Guidelines · Tecno Mart
                </p>
              </div>
            </div>

            {/* Content - Clean Cardless Text Flow */}
            <div className="space-y-8 max-w-3xl">
              {sections.map((s) => (
                <section key={s.title} className="space-y-2">
                  <h2 className="text-base sm:text-lg font-black text-neutral-950 tracking-tight">
                    {s.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">{s.body}</p>
                </section>
              ))}
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar cartCount={0} />
      </div>
    </SmoothScrollProvider>
  );
}
