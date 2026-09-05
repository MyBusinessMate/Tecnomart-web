"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { useShop } from '@/context/ShopContext';
import { Gauge, ShoppingBag, Check, ChevronRight, Star, Cpu, MemoryStick, HardDrive, Zap } from 'lucide-react';
import Link from 'next/link';

const GAMING_RIGS = [
  {
    id: "g1",
    name: "TITAN APEX RTX 4090",
    tier: "4K ULTRA / AI",
    fps: "180+ FPS at 4K Ultra",
    specs: {
      cpu: "Intel Core i9-14900KS / AMD Ryzen 9 7950X3D",
      gpu: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
      ram: "64GB DDR5 6400MHz RGB",
      storage: "4TB Gen4 NVMe SSD (7400MB/s)",
      cooling: "360mm ARGB LCD Liquid Cooler",
      psu: "1200W 80+ Platinum ATX 3.0",
    },
    price: "₹3,89,999",
    rawPrice: 389999,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80",
    badge: "FLAGSHIP BEAST",
    badgeColor: "bg-amber-500 text-neutral-950",
    accentColor: "from-amber-500/20",
  },
  {
    id: "g2",
    name: "CYBERPULSE RTX 4080 SUPER",
    tier: "4K GAMING / STREAMING",
    fps: "144+ FPS at 4K High",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D (Gaming King)",
      gpu: "NVIDIA GeForce RTX 4080 Super 16GB",
      ram: "32GB DDR5 6000MHz RGB",
      storage: "2TB Gen4 NVMe SSD",
      cooling: "360mm Deepcool / NZXT Liquid Cooler",
      psu: "850W 80+ Gold Fully Modular",
    },
    price: "₹2,49,999",
    rawPrice: 249999,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=700&q=80",
    badge: "PRO GAMER PICK",
    badgeColor: "bg-red-600 text-white",
    accentColor: "from-red-500/20",
  },
  {
    id: "g3",
    name: "VALIANT VANGUARD RTX 4070 Ti SUPER",
    tier: "1440P HIGH REFRESH",
    fps: "165+ FPS at 1440p Max",
    specs: {
      cpu: "Intel Core i7-14700K 20-Core",
      gpu: "NVIDIA GeForce RTX 4070 Ti Super 16GB",
      ram: "32GB DDR5 5600MHz RGB",
      storage: "1TB Gen4 NVMe SSD",
      cooling: "240mm ARGB Liquid Cooler",
      psu: "750W 80+ Gold Modular",
    },
    price: "₹1,74,999",
    rawPrice: 174999,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80",
    badge: "BESTSELLER",
    badgeColor: "bg-amber-500 text-neutral-950",
    accentColor: "from-amber-500/20",
  },
  {
    id: "g4",
    name: "SHADOW STRIKER RTX 4060",
    tier: "1080P ESPORTS CHAMPION",
    fps: "240+ FPS Esports / 100+ AAA",
    specs: {
      cpu: "Intel Core i5-13400F / Ryzen 5 7600",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 5200MHz",
      storage: "1TB NVMe SSD",
      cooling: "Tower ARGB Air Cooler",
      psu: "650W 80+ Bronze Certified",
    },
    price: "₹74,999",
    rawPrice: 74999,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80",
    badge: "BUDGET CHAMPION",
    badgeColor: "bg-emerald-600 text-white",
    accentColor: "from-emerald-500/20",
  },
];

export default function GamingPage() {
  const { addToCart } = useShop();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
  };

  const handleCustomQuote = (rig) => {
    const text = encodeURIComponent(
      `Hello TecnoMart Gaming! 🎮 I'm interested in the "${rig.name}" custom rig priced at ${rig.price}. Please share component customization options and same-day delivery details.`
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
              <span className="text-neutral-900 font-bold">Gaming PCs</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  CUSTOM BUILDS · LIQUID COOLED · BENCHMARKED · 3-YEAR WARRANTY
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Built for Victory
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-2xl leading-relaxed">
                  Every custom gaming rig is handcrafted by veteran engineers in Hyderabad, stress-tested with Cinebench &amp; 3DMark, and comes with a 3-Year Onsite Component Warranty.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9★ Build Quality
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>1,200+ Custom PCs Built</span>
                  <span className="text-neutral-700">|</span>
                  <span>48-Hour Assembly &amp; Delivery</span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-amber-400">3-Year Onsite Warranty</span>
                </div>
                <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/pc-builds"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 px-7 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all active:scale-95"
                  >
                    <span>Open PC Configurator</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                  <a
                    href="https://wa.me/919010667726?text=Hi%20TecnoMart!%20I%20want%20a%20custom%20gaming%20PC%20recommendation."
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border border-white/20 active:scale-95"
                  >
                    Talk to PC Specialist
                  </a>
                </div>
              </div>
            </div>

            {/* Gaming Rigs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {GAMING_RIGS.map((rig, idx) => {
                const isAdded = !!addedItems[rig.id];
                const emi = `₹${Math.round(rig.rawPrice / 12).toLocaleString('en-IN')}/mo`;

                return (
                  <BlurRevealBox key={rig.id} delay={idx * 0.08} yOffset={20}>
                    <div className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">

                      {/* Image with dark overlay */}
                      <div className="w-full aspect-[16/9] bg-midgrey-900 flex items-center justify-center p-4 overflow-hidden relative">
                        <img
                          src={rig.image}
                          alt={rig.name}
                          className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${rig.badgeColor}`}>
                            {rig.badge}
                          </span>
                          <span className="text-[11px] font-bold text-amber-400 bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5" />
                            {rig.fps}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">{rig.tier}</span>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        <h3 className="text-lg sm:text-xl font-black text-neutral-950 group-hover:text-amber-600 transition-colors mb-4">
                          {rig.name}
                        </h3>

                        {/* Spec Grid */}
                        <div className="grid grid-cols-2 gap-2 mb-5 text-xs">
                          <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <Cpu className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase block">CPU</span>
                              <span className="font-bold text-neutral-800 leading-tight line-clamp-2">{rig.specs.cpu.split('/')[0].trim()}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase block">GPU</span>
                              <span className="font-bold text-neutral-800 leading-tight line-clamp-2">{rig.specs.gpu.replace('NVIDIA GeForce ', '')}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <MemoryStick className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase block">RAM</span>
                              <span className="font-bold text-neutral-800 leading-tight">{rig.specs.ram}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <HardDrive className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Storage</span>
                              <span className="font-bold text-neutral-800 leading-tight">{rig.specs.storage}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Buttons */}
                        <div className="pt-4 border-t border-neutral-100 mt-auto">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-[10px] text-neutral-400 uppercase font-bold block">Starting From</span>
                              <span className="text-2xl font-black text-neutral-950">{rig.price}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold text-neutral-400 block">No Cost EMI</span>
                              <span className="text-sm font-black text-amber-600">{emi}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 mb-4">
                            <Check className="w-3.5 h-3.5" />
                            <span>Plug &amp; Play · 12-Hour Stress Tested · 3-Year Warranty</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleAddToCart(rig)}
                              className={`min-h-[44px] rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200'
                              }`}
                            >
                              {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                              <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                            </button>

                            <button
                              onClick={() => handleCustomQuote(rig)}
                              className="min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center text-xs font-black uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
                            >
                              Customize on WA
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
