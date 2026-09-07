"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { MOBILES_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import ProductFilters, {
  PRICE_RANGES,
  productMatchesRam,
  productMatchesStorage,
  productMatchesColor,
} from '@/components/redesign/ProductFilters';
import {
  ShoppingBag, Check, ShieldCheck, Truck, RotateCcw,
  ChevronRight, SlidersHorizontal, Star, CreditCard,
} from 'lucide-react';
import Link from 'next/link';

export default function MobilesPage() {
  const { addToCart } = useShop();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});

  const brands = ['Apple', 'Samsung', 'OnePlus', 'Google'];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Smartphones', url: '/mobiles' },
  ]);

  const filteredAndSortedMobiles = useMemo(() => {
    let list = [...MOBILES_DATA];

    // 1. Filter by Brand
    if (selectedBrand !== 'All') {
      list = list.filter((m) => m.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // 2. Filter by Price
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        list = list.filter((m) => m.rawPrice >= range.min && m.rawPrice < range.max);
      }
    }

    // 3. Filter by RAM
    if (selectedRam !== 'All') {
      list = list.filter((m) => productMatchesRam(m, selectedRam));
    }

    // 4. Filter by Storage
    if (selectedStorage !== 'All') {
      list = list.filter((m) => productMatchesStorage(m, selectedStorage));
    }

    // 5. Filter by Color
    if (selectedColor !== 'All') {
      list = list.filter((m) => productMatchesColor(m, selectedColor));
    }

    // Sorting
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedBrand, selectedPriceRange, selectedRam, selectedStorage, selectedColor, sortBy]);

  const handleClearAllFilters = () => {
    setSelectedBrand('All');
    setSelectedPriceRange('all');
    setSelectedRam('All');
    setSelectedStorage('All');
    setSelectedColor('All');
  };

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
      `Hi TecnoMart! 📱 I am interested in ${product.name} (${product.price}). Please confirm stock availability, offers, and delivery in Hyderabad.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Smartphones & Mobiles in Hyderabad | TecnoMart"
        description="Explore the latest Apple iPhone, Samsung Galaxy, Google Pixel, and OnePlus smartphones at TecnoMart Jubilee Hills, Hyderabad. Sealed GST invoice with same-day express delivery."
        canonicalUrl="https://tecnomart.in/mobiles"
        schema={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
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

            {/* Product Filters + Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Product Filters (Desktop Sidebar & Mobile Drawer) */}
              <ProductFilters
                availableBrands={brands}
                selectedBrand={selectedBrand}
                onSelectBrand={setSelectedBrand}
                selectedPriceRange={selectedPriceRange}
                onSelectPriceRange={setSelectedPriceRange}
                selectedRam={selectedRam}
                onSelectRam={setSelectedRam}
                selectedStorage={selectedStorage}
                onSelectStorage={setSelectedStorage}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                onClearAll={handleClearAllFilters}
                totalResultsCount={filteredAndSortedMobiles.length}
              />

              {/* Right Products Grid */}
              <div className="lg:col-span-9 space-y-5">

                {/* Sort Bar & Count */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                  <span className="text-xs font-bold text-neutral-600">
                    <strong className="text-neutral-950">{filteredAndSortedMobiles.length}</strong> devices found
                    {selectedBrand !== 'All' && <span className="text-neutral-500"> by {selectedBrand}</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-neutral-500">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort products"
                      className="h-8 px-2.5 text-[11px] font-bold bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-amber-500 text-neutral-900 cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Empty State */}
                {filteredAndSortedMobiles.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200 shadow-sm space-y-4 my-6">
                    <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <SlidersHorizontal className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-neutral-900">No Smartphones match your selected filters</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Try adjusting your brand, RAM, storage, or price range filters to discover available phones.
                    </p>
                    <button
                      onClick={handleClearAllFilters}
                      className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  /* Products Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {filteredAndSortedMobiles.map((item, idx) => {
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
                              Enquire on WA
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </BlurRevealBox>
                );
              })}
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
