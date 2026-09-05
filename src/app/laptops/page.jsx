"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { LAPTOPS_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag, Check, Cpu, ChevronRight, SlidersHorizontal,
  Star, ShieldCheck, Truck, RotateCcw, CreditCard,
} from 'lucide-react';
import Link from 'next/link';

export default function LaptopsPage() {
  const { addToCart } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});

  const categories = ['All', 'Gaming', 'Creator', 'Ultrabook', 'Budget'];
  const brands = ['All', 'Apple', 'ASUS', 'Dell', 'Lenovo', 'HP'];

  const filteredAndSortedLaptops = useMemo(() => {
    let list = [...LAPTOPS_DATA];
    if (selectedCategory !== 'All') list = list.filter((l) => l.category === selectedCategory);
    if (selectedBrand !== 'All') list = list.filter((l) => l.brand.toLowerCase() === selectedBrand.toLowerCase());
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCategory, selectedBrand, sortBy]);

  const handleAddToCart = (laptop, e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(laptop);
    setAddedItems((prev) => ({ ...prev, [laptop.id]: true }));
  };

  const handleWhatsAppQuote = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi TecnoMart! 💻 I am interested in ${product.name} priced at ${product.price}. Please share availability and current offers.`
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
              <span className="text-neutral-900 font-bold">Laptops</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  MACBOOKS · GAMING RIGS · WORKSTATIONS · ULTRABOOKS
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Premium Laptops
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Authorized laptops with official brand warranty · Free setup &amp; OS installation · RAM/SSD upgrades on request · 0% No-Cost EMI options.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.8★ Rated
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>50+ Models In Stock</span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Free Same-Day Setup
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Brand Authorized
                  </span>
                </div>
              </div>
            </div>

            {/* Value Pillars Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 p-3.5 sm:p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm text-xs font-bold text-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Brand New Sealed with GST Tax Bill</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Free Same-Day Setup in Hyderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Custom RAM &amp; SSD Upgrades Available</span>
              </div>
            </div>

            {/* Amazon-Style Sidebar + Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Filter Sidebar */}
              <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="text-sm font-black uppercase text-neutral-950 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                    Filters
                  </h3>
                  <button
                    onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); }}
                    className="text-[11px] font-bold text-amber-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">Use Case</span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-neutral-950 text-amber-400'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {/* Brand Filter */}
                <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider block">Brand</span>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedBrand === b
                          ? 'bg-neutral-950 text-amber-400'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{b}</span>
                      {selectedBrand === b && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Products Grid */}
              <div className="lg:col-span-9 space-y-5">

                {/* Sort Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                  <span className="text-xs font-bold text-neutral-600">
                    <strong className="text-neutral-950">{filteredAndSortedLaptops.length}</strong> results
                    {selectedCategory !== 'All' && <span className="text-neutral-500"> for "{selectedCategory}"</span>}
                    {selectedBrand !== 'All' && <span className="text-neutral-500"> by {selectedBrand}</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-neutral-500">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-8 px-2.5 text-[11px] font-bold bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-amber-500 text-neutral-900 cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                </div>

                {/* Laptop Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredAndSortedLaptops.map((laptop, idx) => {
                    const isAdded = !!addedItems[laptop.id];
                    const emi = laptop.rawPrice > 9999 ? `₹${Math.round(laptop.rawPrice / 12).toLocaleString('en-IN')}/mo` : null;

                    return (
                      <BlurRevealBox key={laptop.id} delay={idx * 0.04} yOffset={16}>
                        <Link
                          href={`/laptops/${laptop.slug}`}
                          className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden block"
                        >
                          {/* Image */}
                          <div className="w-full aspect-[4/3] bg-neutral-50 flex items-center justify-center p-4 group-hover:bg-amber-50/30 transition-colors relative">
                            <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${laptop.badgeColor}`}>
                              {laptop.badge}
                            </span>
                            <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-white border border-amber-200 px-2 py-0.5 rounded-full shadow-sm">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{laptop.rating}</span>
                            </div>
                            <img
                              src={laptop.images[0]}
                              alt={laptop.name}
                              className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="p-4 flex flex-col flex-1 justify-between">
                            <div>
                              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">{laptop.brand} · {laptop.category}</span>
                              <h3 className="text-sm font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug mt-0.5 line-clamp-2">
                                {laptop.name}
                              </h3>

                              {/* Specs Highlights */}
                              <div className="mt-2 space-y-0.5 bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
                                {laptop.keyHighlights?.slice(0, 2).map((s, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-600 truncate">
                                    <Cpu className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                    <span className="truncate">{s}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-700">
                                <Truck className="w-3 h-3 flex-shrink-0" />
                                <span>Free Same-Day Setup · Hyderabad</span>
                              </div>
                            </div>

                            <div className="mt-3.5 pt-3 border-t border-neutral-100">
                              <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-base font-black text-neutral-950">{laptop.price}</span>
                                <span className="text-xs text-neutral-400 line-through">{laptop.originalPrice}</span>
                              </div>
                              {emi && (
                                <p className="text-[10px] text-neutral-500 font-semibold flex items-center gap-1 mb-2.5">
                                  <CreditCard className="w-3 h-3 text-amber-500" />
                                  No Cost EMI from {emi}
                                </p>
                              )}

                              <div className="grid grid-cols-2 gap-1.5">
                                <button
                                  onClick={(e) => handleAddToCart(laptop, e)}
                                  className={`min-h-[38px] rounded-lg flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer ${
                                    isAdded
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200'
                                  }`}
                                >
                                  {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                                  <span>{isAdded ? 'Added' : 'Add Cart'}</span>
                                </button>

                                <button
                                  onClick={(e) => handleWhatsAppQuote(laptop, e)}
                                  className="min-h-[38px] rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center text-[11px] font-black uppercase tracking-wide shadow-sm cursor-pointer"
                                >
                                  WhatsApp
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </BlurRevealBox>
                    );
                  })}
                </div>

                {filteredAndSortedLaptops.length === 0 && (
                  <div className="text-center py-20 text-neutral-400 font-bold">
                    No laptops match your current filters. Try resetting.
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
