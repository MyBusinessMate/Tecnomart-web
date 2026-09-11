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
import { LAPTOPS_DATA } from '@/data/products';
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
  ShoppingBag, Check, Cpu, ChevronRight, SlidersHorizontal,
  Star, ShieldCheck, Truck, RotateCcw, CreditCard,
} from 'lucide-react';
import Link from 'next/link';

export default function LaptopsPage() {
  const { addToCart } = useShop();
  const location = useLocation();
  const sourceLaptops = LAPTOPS_DATA;

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
    const set = new Set(sourceLaptops.map((l) => l.brand).filter(Boolean));
    return Array.from(set);
  }, [sourceLaptops]);
  const brands = dynamicBrands.length > 0 ? dynamicBrands : ['Apple', 'ASUS', 'Dell', 'Lenovo', 'HP'];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Laptops', url: '/laptops' },
  ]);

  const filteredAndSortedLaptops = useMemo(() => {
    let list = [...sourceLaptops];

    // 1. Filter by Choice: refurbished, new, best, popular
    if (selectedChoice !== 'all') {
      const choice = selectedChoice.toLowerCase();
      if (choice === 'refurbished') {
        list = list.filter((l) =>
          l.tags?.includes('refurbished') ||
          l.category?.toLowerCase().includes('refurbished') ||
          l.name.toLowerCase().includes('refurbished') ||
          l.badge?.toLowerCase().includes('refurbished')
        );
      } else if (choice === 'new') {
        list = list.filter((l) =>
          l.tags?.includes('new') ||
          (l.badge && l.badge.toLowerCase().includes('new')) ||
          (!l.tags?.includes('refurbished') && !l.name.toLowerCase().includes('refurbished'))
        );
      } else if (choice === 'best') {
        list = list.filter((l) =>
          l.tags?.includes('best') ||
          (l.rating && l.rating >= 4.8) ||
          (l.badge && (l.badge.toLowerCase().includes('top') || l.badge.toLowerCase().includes('flagship') || l.badge.toLowerCase().includes('best')))
        );
      } else if (choice === 'popular') {
        list = list.filter((l) =>
          l.tags?.includes('popular') ||
          (l.reviewCount && l.reviewCount >= 100) ||
          (l.badge && l.badge.toLowerCase().includes('popular'))
        );
      }
    }

    // 2. Filter by Price
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        list = list.filter((l) => l.rawPrice >= range.min && (range.max === Infinity ? true : l.rawPrice <= range.max));
      }
    }

    // 3. Filter by Brand
    if (selectedBrand !== 'All') {
      list = list.filter((l) => l.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // 4. Filter by Ratings
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating)) {
        list = list.filter((l) => (l.rating || 0) >= minRating);
      }
    }

    // 5. Filter by RAM
    if (selectedRam !== 'All') {
      list = list.filter((l) => productMatchesRam(l, selectedRam));
    }

    // 6. Filter by Storage
    if (selectedStorage !== 'All') {
      list = list.filter((l) => productMatchesStorage(l, selectedStorage));
    }

    // 7. Filter by Color
    if (selectedColor !== 'All') {
      list = list.filter((l) => productMatchesColor(l, selectedColor));
    }

    // Sorting
    if (sortBy === 'price-low') list.sort((a, b) => a.rawPrice - b.rawPrice);
    else if (sortBy === 'price-high') list.sort((a, b) => b.rawPrice - a.rawPrice);
    else if (sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return list;
  }, [sourceLaptops, selectedChoice, selectedPriceRange, selectedBrand, selectedRating, selectedRam, selectedStorage, selectedColor, sortBy]);

  const handleClearAllFilters = () => {
    setSelectedChoice('all');
    setSelectedBrand('All');
    setSelectedPriceRange('all');
    setSelectedRating('all');
    setSelectedRam('All');
    setSelectedStorage('All');
    setSelectedColor('All');
  };

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
      `Hi TecnoMart! 💻 I am interested in ${product.name} priced at ${product.price}. Please share availability, offers, and warranty details.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Best Laptop Store in Hyderabad | Buy MacBooks, Gaming & Creator Laptops"
        description="Looking for the best laptop store in Hyderabad? TecnoMart Tolichowki features Apple MacBook Pro M3, ASUS ROG Zephyrus, Dell XPS, Lenovo Legion, and HP Spectre with 0% No-Cost EMI and same-day delivery."
        keywords="best laptop store in Hyderabad, best laptop showroom Hyderabad, buy MacBook Pro Hyderabad, gaming laptops Hyderabad, ASUS ROG showroom Hyderabad, Dell XPS Hyderabad, Lenovo Legion Hyderabad, creator laptops Tolichowki"
        canonicalUrl="https://tecnomart.in/laptops"
        ogImageAlt="Best Laptop Store in Hyderabad — TecnoMart Laptops & MacBooks"
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
              <span className="text-neutral-900 font-bold">Laptops</span>
            </nav>

            {/* Sleek Modern Laptops Header Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                  Premium Laptops &amp; MacBooks
                </h1>
                
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed max-w-2xl font-medium">
                  Authorized laptops with official brand warranty. Free doorstep onsite setup &amp; OS installation in Hyderabad, custom RAM/SSD upgrades on request, and 0% No-Cost EMI options.
                </p>

                {/* Integrated Trust & Delivery Perks */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-neutral-800/80 text-xs font-semibold text-neutral-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Sealed Box with GST Tax Bill</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Free Same-Day Setup in Hyderabad</span>
                  </div>
                  <span className="hidden sm:inline text-neutral-700">•</span>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Custom RAM &amp; SSD Upgrades</span>
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
              totalResultsCount={filteredAndSortedLaptops.length}
            />

            {/* Empty State */}
            {filteredAndSortedLaptops.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200 shadow-sm space-y-4 my-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-neutral-900">No Laptops match your selected filters</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your choice, brand, RAM, storage, or price range filters to find matching laptops.
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
                {filteredAndSortedLaptops.map((laptop, index) => {
                  const isAdded = !!addedItems[laptop.id];
                  const primaryImage = laptop.images?.[0] || '/webp/laptops/apple-macbook-pro-16-m3-space-black.webp';

                  return (
                    <BlurRevealBox key={laptop.id} delay={Math.min(index * 0.03, 0.3)}>
                      <div className="group relative bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                        
                        {/* Corner Ribbon or Badge */}
                        {laptop.badge && (
                          <div className="absolute top-2.5 left-2.5 z-10">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${laptop.badgeColor || 'bg-neutral-900 text-white'}`}>
                              {laptop.badge}
                            </span>
                          </div>
                        )}

                        <div>
                          {/* Image */}
                          <Link href={`/laptops/${laptop.slug || laptop.id}`} className="block relative aspect-square bg-neutral-50 rounded-xl p-2.5 mb-3 overflow-hidden group-hover:bg-amber-50/30 transition-colors">
                            <img
                              src={primaryImage}
                              alt={laptop.name}
                              className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </Link>

                          {/* Brand & Name */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                              {laptop.brand}
                            </span>
                            <Link href={`/laptops/${laptop.slug || laptop.id}`} className="block">
                              <h3 className="text-xs font-bold text-neutral-950 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                                {laptop.name}
                              </h3>
                            </Link>
                          </div>

                          {/* Specs summary */}
                          <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-neutral-600">
                            {laptop.ram && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{laptop.ram}</span>
                            )}
                            {laptop.storage && (
                              <span className="px-1.5 py-0.5 bg-neutral-100 rounded font-semibold">{laptop.storage}</span>
                            )}
                          </div>
                        </div>

                        {/* Pricing & Cart Action */}
                        <div className="pt-3 mt-3 border-t border-neutral-100 flex flex-col gap-2">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-sm font-black text-neutral-950">{laptop.price}</span>
                              {laptop.originalPrice && (
                                <span className="text-[10px] text-neutral-400 line-through ml-1.5 font-bold">
                                  {laptop.originalPrice}
                                </span>
                              )}
                            </div>
                            {laptop.rating && (
                              <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{laptop.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(laptop, e)}
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
                              onClick={(e) => handleWhatsAppQuote(laptop, e)}
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
