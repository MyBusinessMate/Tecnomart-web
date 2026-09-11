"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { MOBILES_DATA, LAPTOPS_DATA } from '@/data/products';
import { ChevronRight, X, Star, Search, GitCompare, Smartphone, Laptop, Plus, Check } from 'lucide-react';

function formatINR(n) {
  return typeof n === 'number' ? '₹' + n.toLocaleString('en-IN') : n;
}

function WABuyButton({ product }) {
  const handleClick = () => {
    const msg = encodeURIComponent(
      `Hi TecnoMart! 📱 I am comparing devices and interested in: ${product.name} (${product.price}). Please share availability, best price and Hyderabad delivery time.`
    );
    window.open(`https://wa.me/919010667726?text=${msg}`, '_blank');
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full min-w-[140px] h-9 px-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wide rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>WhatsApp Deal</span>
    </button>
  );
}

export default function ComparePage() {
  const [category, setCategory] = useState('mobiles');
  const [selectedIds, setSelectedIds] = useState(['m1', 'm2']); // Default 2 products so user sees comparison immediately
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = category === 'mobiles' ? MOBILES_DATA : LAPTOPS_DATA;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }, [allProducts, searchQuery]);

  const selectedProducts = useMemo(
    () => allProducts.filter((p) => selectedIds.includes(p.id)),
    [allProducts, selectedIds]
  );

  const toggleProduct = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev; // Locked to 3 max
      return [...prev, id];
    });
  };

  const removeProduct = (id) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleCategorySwitch = (cat) => {
    setCategory(cat);
    // Preset 2 default items in the new category
    if (cat === 'mobiles') {
      setSelectedIds(['m1', 'm2']);
    } else {
      setSelectedIds(['l1', 'l2']);
    }
    setSearchQuery('');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare Products', url: '/compare' },
  ]);

  // Comparison feature definitions across the X-axis (Columns)
  const comparisonColumns = [
    {
      id: 'device',
      label: 'Device & Model',
      minWidth: 'min-w-[220px] sm:min-w-[260px]',
      isSticky: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => removeProduct(p.id)}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-neutral-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label={`Remove ${p.name}`}
              title="Remove from comparison"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-xl overflow-hidden p-1 flex items-center justify-center border border-neutral-200/80">
              {p.images && p.images[0] ? (
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
              ) : (
                <div className="text-neutral-400">
                  {category === 'mobiles' ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                </div>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-mono">
              {p.brand}
            </span>
            <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug line-clamp-2">
              {p.name}
            </p>
            <p className="text-xs sm:text-sm font-black text-amber-600 mt-0.5">
              {p.price}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'price',
      label: 'Price & EMI',
      minWidth: 'min-w-[160px]',
      render: (p) => (
        <div>
          <div className="font-black text-sm text-neutral-950">{p.price}</div>
          {p.originalPrice && (
            <div className="text-xs text-neutral-400 line-through font-semibold">{p.originalPrice}</div>
          )}
          <div className="text-[11px] text-emerald-600 font-bold mt-1 leading-tight">
            {p.emiText || 'No-cost EMI available'}
          </div>
        </div>
      )
    },
    {
      id: 'rating',
      label: 'Rating & Badge',
      minWidth: 'min-w-[140px]',
      render: (p) => (
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-800">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{p.rating || 4.8} / 5</span>
            <span className="text-[10px] text-neutral-400">({p.reviewCount || 100}+)</span>
          </div>
          {p.badge && (
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${p.badgeColor || 'bg-neutral-900 text-white'}`}>
                {p.badge}
              </span>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'display',
      label: 'Display & Screen',
      minWidth: 'min-w-[200px]',
      render: (p) => (
        <span className="text-xs text-neutral-800 font-medium leading-relaxed">
          {p.specs?.Display || p.specs?.['Display & Resolution'] || p.specs?.Screen || 'Super Retina / OLED 120Hz'}
        </span>
      )
    },
    {
      id: 'processor',
      label: 'Processor / Chip',
      minWidth: 'min-w-[190px]',
      render: (p) => (
        <span className="text-xs font-bold text-neutral-900 leading-relaxed">
          {p.specs?.Processor || p.specs?.Chip || p.specs?.CPU || 'High Performance Flagship Chipset'}
        </span>
      )
    },
    {
      id: 'ram',
      label: 'RAM & Memory',
      minWidth: 'min-w-[130px]',
      render: (p) => (
        <span className="inline-block px-2 py-1 bg-neutral-100 rounded-lg text-xs font-black text-neutral-800">
          {p.ram || p.specs?.RAM || p.specs?.['RAM Memory'] || '8GB Unified'}
        </span>
      )
    },
    {
      id: 'storage',
      label: 'Internal Storage',
      minWidth: 'min-w-[130px]',
      render: (p) => (
        <span className="inline-block px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-lg text-xs font-black">
          {p.storage || p.specs?.Storage || p.specs?.['SSD Storage'] || '256GB SSD'}
        </span>
      )
    },
    {
      id: 'cameras',
      label: category === 'mobiles' ? 'Cameras' : 'Graphics / GPU',
      minWidth: 'min-w-[190px]',
      render: (p) => (
        <span className="text-xs text-neutral-700 font-medium leading-relaxed">
          {category === 'mobiles'
            ? (p.specs?.['Main Cameras'] || p.specs?.Cameras || '48MP Dual / Triple Camera Setup with OIS')
            : (p.specs?.Graphics || p.specs?.GPU || 'Integrated Metal 3 / Dedicated RTX')}
        </span>
      )
    },
    {
      id: 'battery',
      label: 'Battery & Charging',
      minWidth: 'min-w-[170px]',
      render: (p) => (
        <span className="text-xs text-neutral-700 font-medium leading-relaxed">
          {p.specs?.['Battery & Port'] || p.specs?.Battery || 'All-Day Fast Charging Battery'}
        </span>
      )
    },
    {
      id: 'warranty',
      label: 'Warranty & Support',
      minWidth: 'min-w-[170px]',
      render: (p) => (
        <div className="text-xs text-neutral-700 space-y-0.5">
          <p className="font-bold text-neutral-900">{p.warrantyPeriod || '1 Year Official Warranty'}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">{p.deliveryTime || 'Free Doorstep Setup Hyderabad'}</p>
        </div>
      )
    },
    {
      id: 'action',
      label: 'Buy / Enquire',
      minWidth: 'min-w-[160px]',
      render: (p) => (
        <WABuyButton product={p} />
      )
    }
  ];

  return (
    <SmoothScrollProvider>
      <SEO
        title="Best Tech Comparison Tool in Hyderabad | Compare Mobiles, Laptops & Specs Side by Side"
        description="Compare flagship smartphones, MacBooks, and gaming laptops side-by-side. Benchmark processors, battery life, camera sensors, and Indian prices with TecnoMart Hyderabad's comparison tool."
        keywords="compare smartphones Hyderabad, compare MacBooks vs Windows, iPhone 16 Pro Max vs S24 Ultra, tech specs comparison, best laptop comparison tool India"
        canonicalUrl="https://tecnomart.in/compare"
        ogImageAlt="Best Tech Comparison Tool in Hyderabad — TecnoMart"
        schema={breadcrumbSchema}
      />
      <ScrollProgress />
      <Header />
      <MobileBottomBar />

      <main className="min-h-screen bg-[#f7f8fa] pb-24 lg:pb-16 font-sans">

        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-6 max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-5">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 font-bold">Compare Products</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-midgrey-900 rounded-3xl border border-midgrey-700/60 p-6 sm:p-10 relative overflow-hidden text-white">
              <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>Real-Time Hardware Benchmarking</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                    Side-by-Side Comparison
                  </h1>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
                    Compare up to 3 devices across display, processor, cameras, and prices. Optimized for mobile and desktop screens.
                  </p>
                </div>

                {/* Category Switcher Tabs */}
                <div className="flex bg-midgrey-800/90 p-1.5 rounded-2xl border border-midgrey-700/80 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCategorySwitch('mobiles')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      category === 'mobiles'
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Smartphones</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategorySwitch('laptops')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      category === 'laptops'
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Laptops</span>
                  </button>
                </div>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">

          {/* Product Picker Drawer / Panel */}
          <BlurRevealBox delay={0.05}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                    {selectedIds.length}/3
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-neutral-950 uppercase tracking-tight">
                      Add Devices to Compare (Max 3)
                    </h2>
                    <p className="text-[11px] text-neutral-500">
                      {selectedIds.length === 3
                        ? 'Maximum 3 products selected. Remove one to add another.'
                        : `Click any product below to add it to your comparison matrix.`}
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder={`Search ${category === 'mobiles' ? 'phones' : 'laptops'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-8 pl-8 pr-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-amber-500 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Horizontal Scrollable Product Selector Chips */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                {filtered.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const isDisabled = !isSelected && selectedIds.length >= 3;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => toggleProduct(product.id)}
                      className={`flex-shrink-0 w-44 sm:w-52 p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400'
                          : isDisabled
                          ? 'opacity-40 cursor-not-allowed bg-neutral-50 border-neutral-100'
                          : 'bg-neutral-50 hover:bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 flex-shrink-0 border border-neutral-200/60 overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-neutral-900 truncate leading-snug">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-black text-amber-600 mt-0.5">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-neutral-300 text-neutral-400 flex items-center justify-center hover:border-neutral-600">
                            <Plus className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </BlurRevealBox>

          {/* MAIN COMPARISON MATRIX: Y-Axis Products, X-Axis Features */}
          {selectedProducts.length === 0 ? (
            <BlurRevealBox delay={0.1}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-3 shadow-sm">
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
                  <GitCompare className="w-7 h-7" />
                </div>
                <h3 className="text-base font-black text-neutral-900 uppercase">No products selected for comparison</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Select at least 1 or up to 3 {category === 'mobiles' ? 'smartphones' : 'laptops'} from the list above to inspect technical specifications side by side.
                </p>
              </div>
            </BlurRevealBox>
          ) : (
            <BlurRevealBox delay={0.1}>
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-neutral-950">
                      Comparing {selectedProducts.length} Product{selectedProducts.length > 1 ? 's' : ''} (Y-Axis Devices • X-Axis Features)
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-semibold hidden sm:inline">
                    ← Swipe horizontally to explore full specs →
                  </span>
                </div>

                {/* Responsive Horizontal Scroll Table */}
                <div className="overflow-x-auto relative">
                  <table className="w-full text-left border-collapse">
                    
                    {/* Table Header: Features along X-Axis */}
                    <thead>
                      <tr className="bg-neutral-100/90 border-b border-neutral-200 text-neutral-600 text-[11px] font-black uppercase tracking-wider">
                        {comparisonColumns.map((col) => (
                          <th
                            key={col.id}
                            className={`py-3 px-4 ${col.minWidth} ${
                              col.isSticky
                                ? 'sticky left-0 bg-neutral-100 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]'
                                : ''
                            }`}
                          >
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Table Body: Products along Y-Axis (One Row Per Product) */}
                    <tbody className="divide-y divide-neutral-200/80">
                      {selectedProducts.map((product, index) => (
                        <tr
                          key={product.id}
                          className="hover:bg-amber-50/20 transition-colors group"
                        >
                          {comparisonColumns.map((col) => (
                            <td
                              key={col.id}
                              className={`py-4 px-4 align-middle ${col.minWidth} ${
                                col.isSticky
                                  ? 'sticky left-0 bg-white group-hover:bg-[#FAF9F5] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]'
                                  : ''
                              }`}
                            >
                              {col.render(product)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                {/* Footer hint */}
                <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Showing exactly {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''}. Zero blank space rendered.</span>
                  {selectedProducts.length < 3 && (
                    <span className="text-amber-700 font-bold">
                      + You can add {3 - selectedProducts.length} more product{3 - selectedProducts.length > 1 ? 's' : ''} from the selector above
                    </span>
                  )}
                </div>

              </div>
            </BlurRevealBox>
          )}

        </div>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
