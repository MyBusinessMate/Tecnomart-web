"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { Wrench, ShieldCheck, Clock, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';

const REPAIR_SERVICES = [
  {
    title: "Screen & OLED Display Replacement",
    description: "Original Super Retina, AMOLED & IPS display replacements with TrueTone restoration and 100% touch sensitivity.",
    duration: "45 – 60 Minutes",
    warranty: "90 Days Warranty",
    iconColor: "bg-blue-100 text-blue-700",
    estCost: "From ₹1,499",
    category: "Most Popular",
    categoryColor: "bg-blue-600 text-white",
  },
  {
    title: "Battery Replacement (100% Health)",
    description: "High-density certified Li-ion batteries with official battery health percentage reading and zero-drain calibration.",
    duration: "30 Minutes",
    warranty: "6 Months Warranty",
    iconColor: "bg-emerald-100 text-emerald-700",
    estCost: "From ₹999",
    category: "Quick Fix",
    categoryColor: "bg-emerald-600 text-white",
  },
  {
    title: "Motherboard & Chip-Level IC Repair",
    description: "Advanced microscope micro-soldering, short-circuit diagnostics, PMIC replacement, and no-power resurrection.",
    duration: "24 – 48 Hours",
    warranty: "90 Days Warranty",
    iconColor: "bg-purple-100 text-purple-700",
    estCost: "From ₹2,499",
    category: "Expert Level",
    categoryColor: "bg-purple-600 text-white",
  },
  {
    title: "Water / Liquid Damage Treatment",
    description: "Ultrasonic chemical cleaning, corrosion neutralization, and component level tracing to save your critical data.",
    duration: "Same Day / 24h",
    warranty: "Tested Safe",
    iconColor: "bg-cyan-100 text-cyan-700",
    estCost: "From ₹1,299",
    category: "Emergency",
    categoryColor: "bg-cyan-600 text-white",
  },
  {
    title: "Laptop Keyboard & Trackpad Repair",
    description: "MacBook butterfly/scissor switches, backlit gaming keyboards, and multi-touch trackpad replacements.",
    duration: "2 – 4 Hours",
    warranty: "6 Months Warranty",
    iconColor: "bg-amber-100 text-amber-700",
    estCost: "From ₹1,499",
    category: "Same Day",
    categoryColor: "bg-amber-600 text-white",
  },
  {
    title: "Data Recovery & OS Re-installation",
    description: "Corrupted NVMe/SSD data retrieval, macOS & Windows 11 clean installations, driver optimization, and malware cleanup.",
    duration: "2 – 3 Hours",
    warranty: "Data Safe",
    iconColor: "bg-rose-100 text-rose-700",
    estCost: "From ₹799",
    category: "Data Safe",
    categoryColor: "bg-rose-600 text-white",
  },
];

export default function RepairsPage() {
  const { setIsRepairOpen } = useShop();

  const handleWhatsAppBooking = (serviceName) => {
    const text = encodeURIComponent(
      `Hello TecnoMart Service Center! 🔧 I need assistance with "${serviceName}" for my device. Please share repair estimate and booking slot.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Repair Services</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  HYDERABAD'S PREMIER TECH SERVICE HUB
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Fast. Reliable. Expert Repairs.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Certified hardware engineers, ESD-safe cleanroom laboratory, genuine original parts, and transparent upfront pricing in Jubilee Hills, Hyderabad.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9★ Service Rating
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>18,000+ Devices Fixed</span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> 45-Min Express Repair
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-amber-400">No Fix · No Fee</span>
                </div>
              </div>
            </div>

            {/* Quick Booking CTA Card */}
            <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm overflow-hidden mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-8 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-neutral-100">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest">
                    FREE DIAGNOSIS · DOORSTEP PICKUP · LIVE STATUS TRACKING
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950 uppercase mt-2">
                    Book a Repair Slot or Free Pickup
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-2">
                    Get an instant estimate, doorstep device pickup across Hyderabad, and track your repair status live via WhatsApp.
                  </p>
                </div>
                <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col gap-3 justify-center">
                  <button
                    onClick={() => setIsRepairOpen(true)}
                    className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Book Repair Slot</span>
                  </button>
                  <a
                    href="https://wa.me/919010667726?text=Hi%20TecnoMart!%20I%20want%20to%20get%20a%20repair%20quote%20for%20my%20device."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[48px] bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-neutral-200 flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-600" />
                    <span>Get Instant Quote</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Repair Services Grid */}
            <h2 className="text-sm font-black uppercase text-neutral-500 tracking-wider mb-5">All Repair Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {REPAIR_SERVICES.map((srv, idx) => (
                <BlurRevealBox key={srv.title} delay={idx * 0.06} yOffset={16}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Top Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${srv.iconColor}`}>
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${srv.categoryColor}`}>
                            {srv.category}
                          </span>
                          <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                            {srv.estCost}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
                        {srv.title}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-medium leading-relaxed flex-1">
                        {srv.description}
                      </p>

                      <div className="pt-4 border-t border-neutral-100 mt-4">
                        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            {srv.duration}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-600">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {srv.warranty}
                          </span>
                        </div>

                        <button
                          onClick={() => handleWhatsAppBooking(srv.title)}
                          className="w-full min-h-[42px] rounded-xl bg-neutral-100 hover:bg-amber-500 hover:text-neutral-950 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer border border-neutral-200 hover:border-amber-500"
                        >
                          <span>Book This Service</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </BlurRevealBox>
              ))}
            </div>

            {/* Service Center Promise */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 uppercase mb-6 text-center tracking-tight">
                Our Service Center Promise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {[
                  { title: "100% Genuine Parts", desc: "Direct OEM components matching factory specifications." },
                  { title: "Zero Data Loss", desc: "Safe privacy protocols guaranteeing complete data secrecy." },
                  { title: "No Fix, No Fee", desc: "If we cannot fix your device issue, you pay ₹0 diagnosis charge." },
                  { title: "90-Day Warranty", desc: "Hassle-free replacement warranty on all replaced hardware parts." },
                ].map((p) => (
                  <div key={p.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-1">{p.title}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar cartCount={0} />
      </div>
    </SmoothScrollProvider>
  );
}
