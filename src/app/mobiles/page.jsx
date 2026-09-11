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
import { MOBILES_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import HorizontalFilterBar, {
  PRICE_RANGES,
  RATING_OPTIONS
} from '@/components/redesign/HorizontalFilterBar';
import {
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
  const location = useLocation();
  const sourceMobiles = MOBILES_DATA;

  // The 7 Confirmed Filters
  const [selectedChoice, setSelectedChoice] = useState('all'); // 'all' | 'new' | 'refurbished' | 'best' | 'popular'
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});

  // Reactive URL search parameter parsing for navbar and external links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brandParam = params.get('brand');
    const choiceParam = params.get('choice');
    const priceParam = params.get('price');

    if (brandParam) {
      setSelectedBrand(brandParam);
    }
    if (choiceParam) {
      setSelectedChoice(choiceParam.toLowerCase());
    }
    if (priceParam) {
      setSelectedPriceRange(priceParam);
    }
  }, [location.search]);

  const dynamicBrands = useMemo(() => {
    const set = new Set(sourceMobiles.map((m) => m.brand).filter(Boolean));
    return Array.from(set);
  }, [sourceMobiles]);
  const brands = dynamicBrands.length > 0 ? dynamicBrands : ['Apple', 'Samsung', 'OnePlus', 'Google'];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Smartphones', url: '/mobiles' },
  ]);

  const filteredAndSortedMobiles = useMemo(() => {
    let list = [...sourceMobiles];

    // 1. Filter by Choice: refurbished, new, best, popular
    if (selectedChoice !== 'all') {
      const choice = selectedChoice.toLowerCase();
      if (choice === 'refurbished') {
        list = list.filter((m) =>
          m.tags?.includes('refurbished') ||
          m.category?.toLowerCase().includes('refurbished') ||
          m.name.toLowerCase().includes('refurbished') ||
          m.badge?.toLowerCase().includes('refurbished')
        );
      } else if (choice === 'new') {
        list = list.filter((m) =>
          m.tags?.includes('new') ||
          (m.badge && m.badge.toLowerCase().includes('new')) ||
          (!m.tags?.includes('refurbished') && !m.name.toLowerCase().includes('refurbished'))
        );
      } else if (choice === 'best') {
        list = list.filter((m) =>
          m.tags?.includes('best') ||
          (m.rating && m.rating >= 4.8) ||
          (m.badge && (m.badge.toLowerCase().includes('top') || m.badge.toLowerCase().includes('ai') || m.badge.toLowerCase().includes('best')))
        );
      } else if (choice === 'popular') {
        list = list.filter((m) =>
          m.tags?.includes('popular') ||
          (m.reviewCount && m.reviewCount >= 100) ||
          (m.badge && m.badge.toLowerCase().includes('popular'))
        );
      }
    }

    // 2. Filter by Price
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        list = list.filter((m) => m.rawPrice >= range.min && (range.max === Infinity ? true : m.rawPrice <= range.max));
      }
    }

    // 3. Filter by Brand
    if (selectedBrand !== 'All') {
      list = list.filter((m) => m.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // 4. Filter by Ratings
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating)) {
        list = list.filter((m) => (m.rating || 0) >= minRating);
      }
    }

    // 5. Filter by RAM
    if (selectedRam !== 'All') {
      list = list.filter((m) => productMatchesRam(m, selectedRam));
    }

    // 6. Filter by Storage
    if (selectedStorage !== 'All') {
      list = list.filter((m) => productMatchesStorage(m, selectedStorage));
    }

    // 7. Filter by Color
    if (selectedColor !== 'All') {
      list = list.filter((m) => productMatchesColor(m, selectedColor));
    }

    // Sorting
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [sourceMobiles, selectedChoice, selectedPriceRange, selectedBrand, selectedRating, selectedRam, selectedStorage, selectedColor, sortBy]);

  const handleClearAllFilters = () => {
    setSelectedChoice('all');
    setSelectedBrand('All');
    setSelectedPriceRange('all');
    setSelectedRating('all');
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

  const handleWhatsAppQuote = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi TecnoMart! 📱 I am interested in ${product.name} priced at ${product.price}. Please share current availability, card offers, and delivery time.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Best Mobile Shop in Hyderabad | Buy iPhones, Samsung Galaxy & Flagship Phones"
        description="Looking for the best mobile shop in Hyderabad? TecnoMart in Tolichowki offers the best prices on iPhone 16 Pro Max, Samsung S24 Ultra, OnePlus 12, and Google Pixel with official warranty and 3-hour doorstep delivery."
        keywords="best mobile shop in Hyderabad, best mobile showroom Hyderabad, mobile shop in Tolichowki, buy iPhone in Hyderabad, buy Samsung in Hyderabad, OnePlus store Hyderabad, Google Pixel Hyderabad"
        canonicalUrl="https://tecnomart.in/mobiles"
        ogImageAlt="Best Mobile Shop in Hyderabad — TecnoMart Smartphones"
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
              <span className="text-neutral-900 font-bold">Smartphones</span>
            </nav>

            {/* Sleek Modern Header Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  Flagship Smartphones &amp; Devices
                </h1>

                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed max-w-2xl font-medium">
                  100% Indian retail units with sealed brand boxes, official GST invoices, instant data transfer at our Tolichowki store, and 3-hour express doorstep delivery across Hyderabad.
                </p>

                {/* Integrated Trust & Delivery Perks */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-neutral-800/80 text-xs font-semibold text-neutral-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Official Manufacturer Warranty</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>3-Hour Express Doorstep Delivery</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Instant Phone Exchange &amp; Data Transfer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal (X-Axis) Filter Bar */}
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
              totalResultsCount={filteredAndSortedMobiles.length}
            />

            {/* Empty State */}
            {filteredAndSortedMobiles.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200 shadow-sm space-y-4 my-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-neutral-900">No Smartphones match your selected filters</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your choice, brand, RAM, storage, or price range filters to discover matching phones.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-5 py-2.5 bg-neutral-950 text-amber-400 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Full-Width 5-Per-Line Products Grid (5 per row on desktop) */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {filteredAndSortedMobiles.map((product, index) => {
                  const isAdded = !!addedItems[product.id];
                  const primaryImage = product.images?.[0] || '/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp';

                  return (
                    <BlurRevealBox key={product.id} delay={Math.min(index * 0.03, 0.3)}>
                      <div className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                        
                        {/* Corner Ribbon or Badge */}
                        {product.badge && (
                          <div className="absolute top-2.5 left-2.5 z-10">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${product.badgeColor || 'bg-neutral-900 text-white'}`}>
                              {product.badge}
                            </span>
                          </div>
                        )}

                        <div>
                          {/* Image */}
                          <Link href={`/mobiles/${product.slug || product.id}`} className="block relative aspect-square bg-neutral-50 rounded-xl p-2.5 mb-3 overflow-hidden group-hover:bg-amber-50/30 transition-colors">
                            <img
                              src={primaryImage}
                              alt={product.name}
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </Link>

                          {/* Brand & Name */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                              {product.brand}
                            </span>
                            <Link href={`/mobiles/${product.slug || product.id}`} className="block">
                              <h3 className="text-xs font-bold text-neutral-950 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          {/* Specs summary */}
                          <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-neutral-600">
                            {product.ram && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{product.ram}</span>
                            )}
                            {product.storage && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{product.storage}</span>
                            )}
                          </div>
                        </div>

                        {/* Pricing & Cart Action */}
                        <div className="pt-3 mt-3 border-t border-neutral-100 flex flex-col gap-2">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-sm font-black text-neutral-950">{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-[10px] text-neutral-400 line-through ml-1.5 font-bold">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            {product.rating && (
                              <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{product.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(product, e)}
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
                              onClick={(e) => handleWhatsAppQuote(product, e)}
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
