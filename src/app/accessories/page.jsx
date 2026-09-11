"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { ACCESSORIES_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import HorizontalFilterBar, {
  PRICE_RANGES,
  RATING_OPTIONS
} from '@/components/redesign/HorizontalFilterBar';
import {
  ShoppingBag, Check, ChevronRight, Star, Truck, ShieldCheck, CreditCard, SlidersHorizontal, Headphones
} from 'lucide-react';
import Link from 'next/link';

export default function AccessoriesPage() {
  const { addToCart } = useShop();
  const location = useLocation();
  const sourceAccessories = ACCESSORIES_DATA;

  // The 7 Confirmed Filters
  const [selectedChoice, setSelectedChoice] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brandParam = params.get('brand');
    const choiceParam = params.get('choice');
    if (brandParam) setSelectedBrand(brandParam);
    if (choiceParam) setSelectedChoice(choiceParam.toLowerCase());
  }, [location.search]);

  const dynamicBrands = useMemo(() => {
    const set = new Set(sourceAccessories.map((a) => a.brand).filter(Boolean));
    return Array.from(set);
  }, [sourceAccessories]);
  const brands = dynamicBrands.length > 0 ? dynamicBrands : ['Apple', 'Sony', 'Anker', 'Logitech', 'Keychron'];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Accessories', url: '/accessories' },
  ]);

  const filteredAndSorted = useMemo(() => {
    let list = [...sourceAccessories];

    // 1. Choice
    if (selectedChoice !== 'all') {
      const choice = selectedChoice.toLowerCase();
      if (choice === 'refurbished') {
        list = list.filter((a) =>
          a.tags?.includes('refurbished') ||
          a.name.toLowerCase().includes('refurbished') ||
          a.badge?.toLowerCase().includes('refurbished')
        );
      } else if (choice === 'new') {
        list = list.filter((a) =>
          a.tags?.includes('new') ||
          !a.name.toLowerCase().includes('refurbished')
        );
      } else if (choice === 'best') {
        list = list.filter((a) =>
          a.tags?.includes('best') ||
          (a.rating && a.rating >= 4.8)
        );
      } else if (choice === 'popular') {
        list = list.filter((a) =>
          a.tags?.includes('popular') ||
          (a.reviewCount && a.reviewCount >= 100)
        );
      }
    }

    // 2. Price
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        list = list.filter((a) => a.rawPrice >= range.min && (range.max === Infinity ? true : a.rawPrice <= range.max));
      }
    }

    // 3. Brand
    if (selectedBrand !== 'All') {
      list = list.filter((a) => a.brand && a.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // 4. Rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating)) {
        list = list.filter((a) => (parseFloat(a.rating) || 0) >= minRating);
      }
    }

    // Sorting
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));

    return list;
  }, [sourceAccessories, selectedChoice, selectedPriceRange, selectedBrand, selectedRating, sortBy]);

  const handleClearAllFilters = () => {
    setSelectedChoice('all');
    setSelectedBrand('All');
    setSelectedPriceRange('all');
    setSelectedRating('all');
    setSelectedRam('All');
    setSelectedStorage('All');
    setSelectedColor('All');
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleWhatsAppQuote = (item, e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi TecnoMart! 🎧 I want to purchase ${item.name} priced at ${item.price}. Please confirm stock availability.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Premium Tech Accessories Hyderabad | AirPods, Keyboards, Audio & GaN Chargers"
        description="Shop genuine Apple accessories, Sony WH-1000XM5 headphones, Keychron custom mechanical keyboards, and 140W GaN chargers at TecnoMart Tolichowki Hyderabad."
        keywords="AirPods Pro Hyderabad, Sony XM5 Hyderabad, Keychron keyboard Hyderabad, Apple 20W charger genuine, GaN charger India"
        canonicalUrl="https://tecnomart.in/accessories"
        ogImageAlt="Tech Accessories — TecnoMart"
        schema={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <ScrollProgress />
        <Header />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Accessories</span>
            </nav>

            {/* Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  Audio, Gear &amp; Accessories
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed max-w-2xl font-medium">
                  Official authentic tech gear. Audiophile noise-canceling audio, custom mechanical keyboards, high-wattage GaN charging bricks, and rugged protection.
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-neutral-800/80 text-xs font-semibold text-neutral-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>100% Genuine Sealed Units</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Same-Day Hyderabad Dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Filter Bar */}
            <HorizontalFilterBar
              availableBrands={brands}
              selectedChoice={selectedChoice}
              onSelectChoice={setSelectedChoice}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={setSelectedPriceRange}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              selectedRating={selectedRating}
              onSelectRating={setSelectedRating}
              selectedRam={selectedRam}
              onSelectRam={setSelectedRam}
              selectedStorage={selectedStorage}
              onSelectStorage={setSelectedStorage}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              sortBy={sortBy}
              onSelectSort={setSortBy}
              onClearAll={handleClearAllFilters}
              totalResultsCount={filteredAndSorted.length}
            />

            {/* Products Grid: 5 per row */}
            {filteredAndSorted.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200 shadow-sm space-y-4 my-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-neutral-900">No Accessories match your selected filters</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try clearing or adjusting your brand and price range filters.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-5 py-2.5 bg-neutral-950 text-amber-400 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {filteredAndSorted.map((item, index) => {
                  const isAdded = !!addedItems[item.id];
                  const primaryImage = item.images?.[0] || item.image || '/webp/accessories/apple-airpods-pro-2-case-open.webp';

                  return (
                    <BlurRevealBox key={item.id} delay={Math.min(index * 0.03, 0.3)}>
                      <div className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                        
                        {item.badge && (
                          <div className="absolute top-2.5 left-2.5 z-10">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${item.badgeColor || 'bg-neutral-900 text-white'}`}>
                              {item.badge}
                            </span>
                          </div>
                        )}

                        <div>
                          <Link href={`/accessories/${item.slug || item.id}`} className="block relative aspect-square bg-neutral-50 rounded-xl p-2.5 mb-3 overflow-hidden group-hover:bg-amber-50/30 transition-colors">
                            <img
                              src={primaryImage}
                              alt={item.name}
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </Link>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                              {item.brand || 'Original'}
                            </span>
                            <Link href={`/accessories/${item.slug || item.id}`} className="block">
                              <h3 className="text-xs font-bold text-neutral-950 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                                {item.name}
                              </h3>
                            </Link>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-neutral-100 flex flex-col gap-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-black text-neutral-950">{item.price}</span>
                            {item.rating && (
                              <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{item.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(item, e)}
                              className={`py-2 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                isAdded
                                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                                  : 'bg-neutral-950 hover:bg-neutral-800 text-white'
                              }`}
                            >
                              {isAdded ? <Check className="w-3 h-3 stroke-[3]" /> : <ShoppingBag className="w-3 h-3" />}
                              <span>{isAdded ? 'Added' : 'Add'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleWhatsAppQuote(item, e)}
                              className="py-2 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <span>Quote</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </BlurRevealBox>
                  );
                })}
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
