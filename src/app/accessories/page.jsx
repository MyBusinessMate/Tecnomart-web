"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Check, ChevronRight, Star, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

const ACCESSORIES_DATA = [
  {
    id: "acc-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    specs: "Industry Leading Noise Canceling • 30h Battery • Auto NC Optimizer",
    price: "₹24,990",
    rawPrice: 24990,
    badge: "TOP PICK",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-2",
    name: "Keychron Q1 Pro Wireless Custom Keyboard",
    category: "Keyboards",
    specs: "CNC Aluminum Body • Hot-Swappable RGB • Gateron Jupiter Switches",
    price: "₹18,999",
    rawPrice: 18999,
    badge: "ENTHUSIAST",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-3",
    name: "Logitech G Pro X Superlight 2 Mouse",
    category: "Mice",
    specs: "60g Ultralight • HERO 2 32K Sensor • 4K Polling Rate",
    price: "₹14,995",
    rawPrice: 14995,
    badge: "ESPORTS READY",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-4",
    name: 'LG UltraGear 27" OLED 240Hz 0.03ms Monitor',
    category: "Monitors",
    specs: "QHD OLED • HDR True Black 400 • G-SYNC & FreeSync Premium",
    price: "₹69,990",
    rawPrice: 69990,
    badge: "240HZ OLED",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-5",
    name: "Anker 737 GaNPrime 140W Power Bank",
    category: "Power",
    specs: "24,000mAh • Smart Digital Display • 140W Two-Way Fast Charge",
    price: "₹12,999",
    rawPrice: 12999,
    badge: "140W GAN",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-6",
    name: "boAt Wave Ultima Smartwatch",
    category: "Wearables",
    specs: "HD Display • Bluetooth Calling • 100+ Sports Modes",
    price: "₹1,499",
    rawPrice: 1499,
    badge: "HOT DEAL",
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-7",
    name: "Samsung 49\" Odyssey OLED G9 Monitor",
    category: "Monitors",
    specs: "Dual QHD • 240Hz • 0.03ms OLED • 1800R Curved",
    price: "₹1,34,990",
    rawPrice: 134990,
    badge: "ULTRA-WIDE",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "acc-8",
    name: "Apple AirPods Pro 2nd Gen (USB-C)",
    category: "Audio",
    specs: "H2 Chip • Adaptive Transparency • 30h Total Battery • MagSafe",
    price: "₹24,900",
    rawPrice: 24900,
    badge: "APPLE OFFICIAL",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1588423771073-b8903febb85b?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AccessoriesPage() {
  const { addToCart } = useShop();
  const [selectedCat, setSelectedCat] = useState('All');
  const [addedItems, setAddedItems] = useState({});

  const categories = ['All', 'Audio', 'Keyboards', 'Mice', 'Monitors', 'Power', 'Wearables'];

  const filteredItems = selectedCat === 'All'
    ? ACCESSORIES_DATA
    : ACCESSORIES_DATA.filter((a) => a.category === selectedCat);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleWhatsAppOrder = (item) => {
    const text = encodeURIComponent(
      `Hi TecnoMart! 🎧 I want to purchase the ${item.name} (${item.price}). Please share availability and payment link.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Accessories</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-neutral-950 overflow-hidden mb-8 relative border border-neutral-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  AUDIO · PERIPHERALS · MONITORS · WEARABLES · POWER
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Complete Your Tech Setup
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Official audio, peripherals, fast chargers, cables, and OLED gaming monitors with original brand warranty. 200+ accessories in stock.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine OEM
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>200+ Accessories</span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Same-Day Delivery
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>Brand Warranty Included</span>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-7 no-scrollbar">
              <span className="text-[11px] font-black text-neutral-400 uppercase tracking-wider flex-shrink-0">Category:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  className={`min-h-[36px] px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all flex-shrink-0 active:scale-95 cursor-pointer ${
                    selectedCat === c
                      ? 'bg-neutral-950 text-amber-400 shadow-sm'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-xs font-bold text-neutral-500 mb-5">
              Showing <strong className="text-neutral-900">{filteredItems.length}</strong> accessories
              {selectedCat !== 'All' && <span> in <strong className="text-amber-600">{selectedCat}</strong></span>}
            </p>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, idx) => {
                const isAdded = !!addedItems[item.id];
                const emi = item.rawPrice > 4999 ? `₹${Math.round(item.rawPrice / 12).toLocaleString('en-IN')}/mo` : null;

                return (
                  <BlurRevealBox key={item.id} delay={idx * 0.05} yOffset={16}>
                    <div className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">

                      {/* Image */}
                      <div className="w-full aspect-square bg-neutral-50 flex items-center justify-center p-5 group-hover:bg-amber-50/30 transition-colors relative">
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950">
                          {item.badge}
                        </span>
                        <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-white border border-amber-200 px-2 py-0.5 rounded-full shadow-sm">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300 max-h-[160px]"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">{item.category}</span>
                          <h3 className="text-sm font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug mt-0.5 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-neutral-500 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                            {item.specs}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-700">
                            <Truck className="w-3 h-3 flex-shrink-0" />
                            <span>Free Delivery · In Stock</span>
                          </div>
                        </div>

                        <div className="mt-3.5 pt-3 border-t border-neutral-100">
                          <div className="flex items-baseline justify-between mb-0.5">
                            <span className="text-base font-black text-neutral-950">{item.price}</span>
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Genuine OEM
                            </span>
                          </div>
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
                              onClick={() => handleWhatsAppOrder(item)}
                              className="min-h-[38px] rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center text-[11px] font-black uppercase tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                            >
                              Buy on WA
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
