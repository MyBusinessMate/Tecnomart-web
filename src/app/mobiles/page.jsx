"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { MOBILES_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag, Check, ShieldCheck, Truck, RotateCcw,
  ChevronRight, SlidersHorizontal, Star, CreditCard,
} from 'lucide-react';
import Link from 'next/link';

export default function MobilesPage() {
  const { addToCart } = useShop();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(8);
  const [addedItems, setAddedItems] = useState({});

  const brands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Google'];

  const filteredAndSortedMobiles = useMemo(() => {
    let list = selectedBrand === 'All'
      ? [...MOBILES_DATA]
      : MOBILES_DATA.filter((m) => m.brand === selectedBrand);

    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedBrand, sortBy]);

  const displayedMobiles = filteredAndSortedMobiles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedMobiles.length;

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
  };

  const handleWhatsAppBuy = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi TecnoMart! 📱 I want to purchase the ${product.name} (${product.price}). Please confirm stock and delivery in Hyderabad.`
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
              <span className="text-neutral-900 font-bold">Smartphones</span>
            </nav>

            {/* Department Hero Banner */}
            <div className="rounded-3xl bg-neutral-950 overflow-hidden mb-8 relative border border-neutral-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  FLAGSHIP &amp; VALUE SMARTPHONES
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Find Your Next Phone
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  100% genuine sealed Indian units · Official brand warranty · No-cost EMI · 3-hour doorstep delivery across Hyderabad.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.8★ Store Rating
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>500+ Models Sold</span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> Free 3-Hour Delivery
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> GST Tax Invoice
                  </span>
                </div>
              </div>
            </div>

            {/* Value Pillars Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7 p-3.5 sm:p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm text-xs font-bold text-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Sealed Box with GST Tax Invoice</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>3-Hour Delivery across Hyderabad</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Free 15-Min Phone Data Transfer</span>
              </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-7 px-3.5 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                <span className="text-[11px] font-black text-neutral-400 uppercase tracking-wider flex-shrink-0 mr-1">Brand:</span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => { setSelectedBrand(brand); setVisibleCount(8); }}
                    className={`min-h-[34px] px-4 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all flex-shrink-0 active:scale-95 cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-neutral-950 text-amber-400'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 border border-neutral-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0 border-t md:border-t-0 border-neutral-100 pt-2.5 md:pt-0">
                <span className="text-[11px] text-neutral-500 font-bold">
                  Showing <strong className="text-neutral-900">{filteredAndSortedMobiles.length}</strong> results
                </span>
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
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
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {displayedMobiles.map((item, idx) => {
                const isAdded = !!addedItems[item.id];
                const emi = item.rawPrice > 4999 ? `₹${Math.round(item.rawPrice / 12).toLocaleString('en-IN')}/mo` : null;

                return (
                  <BlurRevealBox key={item.id} delay={idx * 0.04} yOffset={16}>
                    <Link
                      href={`/mobiles/${item.slug}`}
                      className="group h-full bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden block"
                    >
                      {/* Image Area */}
                      <div className="w-full aspect-square bg-neutral-50 flex items-center justify-center p-5 group-hover:bg-amber-50/30 transition-colors relative">
                        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-white border border-amber-200 px-2 py-0.5 rounded-full shadow-sm">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300 max-h-[180px]"
                        />
                      </div>

                      {/* Details */}
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">{item.brand}</span>
                          <h3 className="text-sm font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug mt-0.5 line-clamp-2">
                            {item.name}
                          </h3>

                          {/* Key Highlights */}
                          <div className="mt-2 space-y-0.5">
                            {item.keyHighlights?.slice(0, 2).map((h, i) => (
                              <p key={i} className="text-[11px] text-neutral-500 line-clamp-1">• {h}</p>
                            ))}
                          </div>

                          {/* Delivery Info */}
                          <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-emerald-700">
                            <Truck className="w-3 h-3 flex-shrink-0" />
                            <span>Free 3-Hour Delivery · Hyderabad</span>
                          </div>
                        </div>

                        {/* Pricing & Buttons */}
                        <div className="mt-3.5 pt-3 border-t border-neutral-100">
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="text-base font-black text-neutral-950">{item.price}</span>
                            <span className="text-xs text-neutral-400 line-through">{item.originalPrice}</span>
                          </div>
                          {emi && (
                            <p className="text-[10px] text-neutral-500 font-semibold flex items-center gap-1 mb-2.5">
                              <CreditCard className="w-3 h-3 text-amber-500" />
                              No Cost EMI from {emi}
                            </p>
                          )}

                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={(e) => handleAddToCart(item, e)}
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
                              onClick={(e) => handleWhatsAppBuy(item, e)}
                              className="min-h-[38px] rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 flex items-center justify-center text-[11px] font-black uppercase tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                            >
                              Buy on WA
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </BlurRevealBox>
                );
              })}
            </div>

            {/* View More */}
            {hasMore && (
              <div className="text-center pt-2 pb-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="min-h-[46px] px-10 bg-neutral-950 hover:bg-neutral-800 text-amber-400 text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border border-neutral-800"
                >
                  View More Phones ({filteredAndSortedMobiles.length - visibleCount} remaining)
                </button>
              </div>
            )}

          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
