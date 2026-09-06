"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, ShieldCheck, Sparkles, ShoppingBag, Check, ChevronRight, Star, Truck, Tag, CreditCard } from 'lucide-react';
import Link from 'next/link';

const REFURBISHED_ITEMS = [
  {
    id: "rf-1",
    name: "Apple MacBook Pro 14\" M1 Pro",
    grade: "Grade A+",
    gradeLabel: "Like New",
    specs: "16GB RAM / 512GB SSD / 100% Battery Health",
    price: "₹92,990",
    rawPrice: 92990,
    originalPrice: "₹1,94,900",
    save: "Save ₹1,01,910",
    savePct: "52%",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
  {
    id: "rf-2",
    name: "iPhone 14 Pro Max 128GB",
    grade: "Grade A+",
    gradeLabel: "Mint Condition",
    specs: "Deep Purple / 96% Battery / Flawless OLED",
    price: "₹74,990",
    rawPrice: 74990,
    originalPrice: "₹1,39,900",
    save: "Save ₹64,910",
    savePct: "46%",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
  {
    id: "rf-3",
    name: "Dell XPS 13 9310 (i7 11th Gen)",
    grade: "Grade A",
    gradeLabel: "Excellent",
    specs: "16GB RAM / 512GB SSD / 4K UHD+ Touch",
    price: "₹49,990",
    rawPrice: 49990,
    originalPrice: "₹1,24,900",
    save: "Save ₹74,910",
    savePct: "60%",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
  {
    id: "rf-4",
    name: "Samsung Galaxy S23 Ultra 256GB",
    grade: "Grade A+",
    gradeLabel: "Mint",
    specs: "Phantom Black / 100% Battery / S-Pen Included",
    price: "₹68,990",
    rawPrice: 68990,
    originalPrice: "₹1,24,999",
    save: "Save ₹56,009",
    savePct: "45%",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
  {
    id: "rf-5",
    name: "iPad Pro 11\" M2 (128GB WiFi)",
    grade: "Grade A+",
    gradeLabel: "Open Box",
    specs: "Space Gray / Liquid Retina / Apple Pencil 2 Compatible",
    price: "₹52,990",
    rawPrice: 52990,
    originalPrice: "₹81,900",
    save: "Save ₹28,910",
    savePct: "35%",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
  {
    id: "rf-6",
    name: "Lenovo ThinkPad T14s Gen 3 (Ryzen 7 Pro)",
    grade: "Grade A",
    gradeLabel: "Corporate Return",
    specs: "16GB RAM / 512GB SSD / 14\" FHD IPS / Magnesium Body",
    price: "₹44,990",
    rawPrice: 44990,
    originalPrice: "₹99,990",
    save: "Save ₹55,000",
    savePct: "55%",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    warranty: "1-Year TecnoMart Warranty",
  },
];

export default function RefurbishedPage() {
  const { addToCart } = useShop();
  const [addedItems, setAddedItems] = useState({});
  const [selectedGrade, setSelectedGrade] = useState('All');

  const grades = ['All', 'Grade A+', 'Grade A'];

  const filteredItems = selectedGrade === 'All'
    ? REFURBISHED_ITEMS
    : REFURBISHED_ITEMS.filter((i) => i.grade === selectedGrade);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Certified Refurbished', url: '/refurbished' },
  ]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleWhatsAppEnquiry = (item) => {
    const text = encodeURIComponent(
      `Hello TecnoMart! 🔄 I'm interested in the Certified Refurbished ${item.name} (${item.price}). Please share actual unit photos and condition verification.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Certified Refurbished Apple & Tech in Hyderabad | TecnoMart"
        description="Buy certified refurbished MacBooks, iPhones, and premium laptops in Hyderabad. 40-point diagnostic tested, 100% genuine parts, and 1-year TecnoMart warranty."
        canonicalUrl="https://tecnomart.in/refurbished"
        schema={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Certified Refurbished</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-emerald-400 uppercase">
                  CERTIFIED PRE-OWNED &amp; OPEN-BOX TECH
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Smart Tech. Smarter Savings.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Up to 60% off original retail prices. 40+ point quality certified, 100% genuine parts, and 1-Year TecnoMart Warranty on every device.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Tag className="w-3.5 h-3.5" /> Up to 60% Off
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>40-Point Certified</span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> 1-Year Warranty
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>7-Day Replacement</span>
                </div>
              </div>
            </div>

            {/* Quality Standards Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 p-4 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl border border-emerald-200/60 shadow-sm text-xs font-bold text-neutral-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>40-Point Hardware &amp; Battery Diagnostic</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>1-Year Comprehensive Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>7-Day No-Questions Replacement</span>
              </div>
            </div>

            {/* Grade Filter + Count */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-neutral-400 uppercase tracking-wider">Grade:</span>
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`min-h-[34px] px-4 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                      selectedGrade === g
                        ? 'bg-midgrey-900 text-amber-400'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-500 hidden sm:block">
                <strong className="text-neutral-900">{filteredItems.length}</strong> devices available
              </span>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item, idx) => {
                const isAdded = !!addedItems[item.id];
                const emi = item.rawPrice > 9999 ? `₹${Math.round(item.rawPrice / 12).toLocaleString('en-IN')}/mo` : null;

                return (
                  <BlurRevealBox key={item.id} delay={idx * 0.06} yOffset={16}>
                    <div className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">

                      {/* Image */}
                      <div className="w-full aspect-[4/3] bg-neutral-50 flex items-center justify-center p-5 group-hover:bg-emerald-50/30 transition-colors relative">
                        {/* Grade Badge */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white">
                            {item.grade} · {item.gradeLabel}
                          </span>
                        </div>
                        {/* Save badge */}
                        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                          <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500 text-neutral-950">
                            -{item.savePct}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-white border border-amber-200 px-1.5 py-0.5 rounded-full">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-sm font-black text-neutral-950 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-neutral-500 font-medium mt-1.5">
                            {item.specs}
                          </p>

                          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-neutral-700 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-100 w-fit">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>{item.warranty}</span>
                          </div>

                          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-700">
                            <Truck className="w-3 h-3 flex-shrink-0" />
                            <span>Free Delivery · In Stock</span>
                          </div>
                        </div>

                        <div className="mt-3.5 pt-3 border-t border-neutral-100">
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="text-base font-black text-neutral-950">{item.price}</span>
                            <span className="text-xs text-neutral-400 line-through">{item.originalPrice}</span>
                          </div>
                          <p className="text-[10px] font-bold text-emerald-600 mb-0.5">{item.save}</p>
                          {emi && (
                            <p className="text-[10px] text-neutral-500 font-semibold flex items-center gap-1 mb-2.5">
                              <CreditCard className="w-3 h-3 text-amber-500" />
                              No Cost EMI from {emi}
                            </p>
                          )}

                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className={`min-h-[38px] rounded-lg flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide transition-all active:scale-95 cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200'
                              }`}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                              <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                            </button>

                            <button
                              onClick={() => handleWhatsAppEnquiry(item)}
                              className="min-h-[38px] rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center text-[11px] font-black uppercase tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                            >
                              Inspect on WA
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurRevealBox>
                );
              })}
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
