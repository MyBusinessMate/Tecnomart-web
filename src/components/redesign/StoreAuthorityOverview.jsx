"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Wrench, Laptop, Smartphone, Cpu, Award, ArrowRight } from 'lucide-react';

export default function StoreAuthorityOverview() {
  return (
    <section className="py-12 sm:py-16 bg-neutral-50/70 border-t border-neutral-100 text-neutral-900">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-black uppercase tracking-widest text-amber-700 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Tolichowki, Hyderabad Flagship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950">
            About TecnoMart — Hyderabad's Authorized Tech Retailer & Service Center
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            TecnoMart is an authorized multi-brand technology showroom and certified chip-level service center headquartered on 7 Tombs Road, Tolichowki, Hyderabad. We specialize in genuine retail smartphones, professional creator laptops, custom liquid-cooled gaming rigs, certified refurbished electronics, and same-day certified hardware repairs with manufacturer-backed warranty.
          </p>
        </div>

        {/* 3 Core Topical Authority Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          
          {/* Pillar 1: Genuine Hardware & Retail */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-neutral-950 mb-2">
                Flagship Mobiles & Laptops
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discover the latest Apple iPhone 16 series, Samsung Galaxy S24 Ultra, MacBook Pro M3, and Asus ROG laptops. Every unit is brand-sealed, sourced directly from authorized national distributors, and comes with an official GST invoice and valid manufacturer warranty.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-3 text-xs font-bold text-amber-700">
              <Link href="/mobiles" className="hover:underline flex items-center gap-1">Explore Mobiles <ArrowRight className="w-3.5 h-3.5" /></Link>
              <span className="text-neutral-300">•</span>
              <Link href="/laptops" className="hover:underline flex items-center gap-1">Explore Laptops <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>

          {/* Pillar 2: Same-Day Certified Repairs */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-neutral-950 mb-2">
                Certified Hardware Repairs
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Our Tolichowki lab is equipped for precision micro-soldering, OLED display restorations, high-density battery replacements, and liquid-damage motherboard recoveries. Most standard screen and battery fixes are completed within 45 to 90 minutes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-3 text-xs font-bold text-blue-700">
              <Link href="/repairs" className="hover:underline flex items-center gap-1">View Repair Pricing <ArrowRight className="w-3.5 h-3.5" /></Link>
              <span className="text-neutral-300">•</span>
              <a href="tel:+919866388870" className="hover:underline flex items-center gap-1">Call Technician <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>

          {/* Pillar 3: Custom PCs & Refurbished Units */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-neutral-950 mb-2">
                Custom PCs & Refurbished Devices
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Build high-FPS esports rigs and CAD workstations with our custom PC configurator. For budget-conscious professionals and students, our Grade-A+ refurbished MacBooks and laptops pass a 32-point inspection with an authentic 1-year store warranty.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-3 text-xs font-bold text-purple-700">
              <Link href="/pc-builds" className="hover:underline flex items-center gap-1">PC Configurator <ArrowRight className="w-3.5 h-3.5" /></Link>
              <span className="text-neutral-300">•</span>
              <Link href="/refurbished" className="hover:underline flex items-center gap-1">Refurbished Stock <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>

        </div>

        {/* Structured Buying & Store Facts Table (GEO & Entity Grounding) */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-950 mb-4">
            TecnoMart Store & Purchase Specifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-neutral-700 border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-900 font-bold">
                  <th className="py-2.5 pr-4">Service Feature</th>
                  <th className="py-2.5 px-4">Standard Policy & Specification</th>
                  <th className="py-2.5 pl-4">Coverage in Hyderabad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Store Location</td>
                  <td className="py-3 px-4">7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad, 500008</td>
                  <td className="py-3 pl-4">Central Hyderabad & HITEC City Corridor</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Operating Hours</td>
                  <td className="py-3 px-4">Monday through Sunday: 10:00 AM – 09:30 PM</td>
                  <td className="py-3 pl-4">Open 7 days a week</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Contact & Support</td>
                  <td className="py-3 px-4">+91 98663 88870 | support@tecnomart.in</td>
                  <td className="py-3 pl-4">Phone, WhatsApp & In-Store Assistance</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Delivery SLA</td>
                  <td className="py-3 px-4">Same-day 3-hour doorstep delivery for confirmed orders</td>
                  <td className="py-3 pl-4">Hyderabad & Secunderabad limits</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Warranty Support</td>
                  <td className="py-3 px-4">1-Year Official Brand Warranty (New) / 1-Year TecnoMart Warranty (Refurbished)</td>
                  <td className="py-3 pl-4">Authorized Brand Centers + Store Counter</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-neutral-950">Payment & Financing</td>
                  <td className="py-3 px-4">UPI, Credit/Debit Cards, Net Banking, Cash & 0% No-Cost EMI options</td>
                  <td className="py-3 pl-4">All major Indian banks supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
