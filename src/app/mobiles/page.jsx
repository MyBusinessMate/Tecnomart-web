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

            {/* Sleek Modern Category Header Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-bold tracking-wider uppercase mb-3">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Flagship &amp; Value Smartphones</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  Find Your Next Smartphone
                </h1>
                
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed max-w-2xl font-medium">
                  100% genuine sealed Indian retail units with official brand warranty. Enjoy same-day 3-hour doorstep express delivery in Hyderabad and 0% No-Cost EMI on all major cards.
                </p>

                {/* Seamlessly blended trust pills (no extra separate cards) */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-6 pt-5 border-t border-neutral-800/80 text-xs font-semibold text-neutral-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Sealed Box GST Tax Invoice</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Free 3-Hour Hyderabad Delivery</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Free 15-Min Phone Data Transfer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Category & Filter Strip */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
              
              {/* Category Segment Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                <span className="text-[11px] font-black text-neutral-400 uppercase tracking-wider mr-1 flex-shrink-0">Filter:</span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => { setSelectedBrand(brand); setVisibleCount(8); }}
                    className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-neutral-950 text-amber-400 shadow-sm'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80 hover:text-neutral-900'
                    }`}
                  >
                    {brand === 'All' ? 'All Phones' : brand}
                  </button>
                ))}
              </div>

              {/* Sort & Count Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                <span className="text-xs font-semibold text-neutral-500">
                  <strong className="text-neutral-900">{filteredAndSortedMobiles.length}</strong> devices found
                </span>
                
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200/80 rounded-xl px-2.5 py-1 shadow-2xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products"
                    className="h-8 text-xs font-bold bg-transparent outline-none text-neutral-800 cursor-pointer pr-1"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
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
