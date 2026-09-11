"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { LAPTOPS_DATA, MOBILES_DATA } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import HorizontalFilterBar, { PRICE_RANGES } from '@/components/redesign/HorizontalFilterBar';
import {
  ShoppingBag, Check, ShieldCheck, Truck, RotateCcw,
  ChevronRight, SlidersHorizontal, Star, Laptop, Smartphone
} from 'lucide-react';
import Link from 'next/link';

export default function RefurbishedPage() {
  const { addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState('laptops'); // 'laptops' | 'mobiles'

  // The 7 Filters for Refurbished Devices
  const [selectedChoice, setSelectedChoice] = useState('refurbished');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedRam, setSelectedRam] = useState('All');
  const [selectedStorage, setSelectedStorage] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedItems, setAddedItems] = useState({});

  const sourceProducts = activeCategory === 'laptops' ? LAPTOPS_DATA : MOBILES_DATA;

  // Filter specifically for refurbished items
  const refurbishedItems = useMemo(() => {
    return sourceProducts.filter((p) =>
      p.tags?.includes('refurbished') ||
      p.category?.toLowerCase().includes('refurbished') ||
      p.name.toLowerCase().includes('refurbished') ||
      p.badge?.toLowerCase().includes('refurbished')
    );
  }, [sourceProducts]);

  const dynamicBrands = useMemo(() => {
    const set = new Set(refurbishedItems.map((p) => p.brand).filter(Boolean));
    return Array.from(set);
  }, [refurbishedItems]);

  const filteredAndSorted = useMemo(() => {
    let list = [...refurbishedItems];

    // Filter by Price
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        list = list.filter((p) => p.rawPrice >= range.min && (range.max === Infinity ? true : p.rawPrice <= range.max));
      }
    }

    // Filter by Brand
    if (selectedBrand !== 'All') {
      list = list.filter((p) => p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Filter by Rating
    if (selectedRating !== 'all') {
      const min = parseFloat(selectedRating);
      if (!isNaN(min)) {
        list = list.filter((p) => (parseFloat(p.rating) || 0) >= min);
      }
    }

    // Sorting
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));

    return list;
  }, [refurbishedItems, selectedPriceRange, selectedBrand, selectedRating, sortBy]);

  const handleClearAllFilters = () => {
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
      `Hi TecnoMart! 🔄 I am interested in Certified Refurbished ${product.name} priced at ${product.price}. Please confirm warranty status and battery health.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Certified Refurbished', url: '/refurbished' },
  ]);

  return (
    <SmoothScrollProvider>
      <SEO
        title="Certified Refurbished Laptops & iPhones Hyderabad | 1-Year Warranty — TecnoMart"
        description="Buy certified refurbished MacBooks, Dell XPS laptops, and iPhones in Hyderabad. 100% QA inspected, 6 to 12 months direct store warranty, and same-day delivery."
        keywords="refurbished MacBooks Hyderabad, refurbished iPhone Hyderabad, second hand laptops Tolichowki, certified refurbished phones India"
        canonicalUrl="https://tecnomart.in/refurbished"
        ogImageAlt="Certified Refurbished Devices — TecnoMart"
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
              <span className="text-neutral-900 font-bold">Certified Refurbished</span>
            </nav>

            {/* Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Grade A+ Like-New Devices</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                    Certified Refurbished
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-medium">
                    Up to 60% off original retail price. 55-point technical inspection, battery health guaranteed 90%+, original accessories included, backed by 6 to 12 months direct store warranty.
                  </p>
                </div>

                {/* Subcategory Switcher: Laptops or Mobiles */}
                <div className="flex bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => { setActiveCategory('laptops'); handleClearAllFilters(); }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      activeCategory === 'laptops'
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Laptops ({LAPTOPS_DATA.filter((l) => l.tags?.includes('refurbished') || l.category?.includes('Refurbished')).length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveCategory('mobiles'); handleClearAllFilters(); }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      activeCategory === 'mobiles'
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Mobiles ({MOBILES_DATA.filter((m) => m.tags?.includes('refurbished')).length})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Filter Bar */}
            <HorizontalFilterBar
              availableBrands={dynamicBrands}
              selectedChoice="refurbished"
              onSelectChoice={(c) => {
                if (c === 'all') window.location.href = `/${activeCategory}`;
                else window.location.href = `/${activeCategory}?choice=${c}`;
              }}
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
                <h3 className="text-lg font-black text-neutral-900">No refurbished items match your filters</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your brand or price filter, or switch categories above.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-5 py-2.5 bg-neutral-950 text-amber-400 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {filteredAndSorted.map((product, index) => {
                  const isAdded = !!addedItems[product.id];
                  const primaryImage = product.images?.[0] || '/webp/refurbished/refurbished-dell-xps-13-plus.webp';
                  const detailUrl = activeCategory === 'laptops'
                    ? `/laptops/${product.slug || product.id}`
                    : `/mobiles/${product.slug || product.id}`;

                  return (
                    <BlurRevealBox key={product.id} delay={Math.min(index * 0.03, 0.3)}>
                      <div className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                        
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-amber-600 text-white">
                            REFURBISHED
                          </span>
                        </div>

                        <div>
                          <Link href={detailUrl} className="block relative aspect-square bg-neutral-50 rounded-xl p-2.5 mb-3 overflow-hidden group-hover:bg-amber-50/30 transition-colors">
                            <img
                              src={primaryImage}
                              alt={product.name}
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </Link>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                              {product.brand}
                            </span>
                            <Link href={detailUrl} className="block">
                              <h3 className="text-xs font-bold text-neutral-950 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-neutral-600">
                            {product.ram && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{product.ram}</span>
                            )}
                            {product.storage && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{product.storage}</span>
                            )}
                          </div>
                        </div>

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
