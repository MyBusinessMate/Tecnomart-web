"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { MOBILES_DATA, LAPTOPS_DATA } from '@/data/products';
import { ChevronRight, X, Star, Search, GitCompare, Smartphone, Laptop } from 'lucide-react';

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function WABuyButton({ product }) {
  const handleClick = () => {
    const msg = encodeURIComponent(
      `Hi TecnoMart! I want to buy: ${product.name} at ${product.price}. Is it available?`
    );
    window.open(`https://wa.me/919010667726?text=${msg}`, '_blank');
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full h-9 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs uppercase tracking-wide rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
      Buy on WhatsApp
    </button>
  );
}

export default function ComparePage() {
  const [category, setCategory] = useState('mobiles');
  const [selectedIds, setSelectedIds] = useState([]);
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
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const removeProduct = (id) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleCategorySwitch = (cat) => {
    setCategory(cat);
    setSelectedIds([]);
    setSearchQuery('');
  };

  // Collect all spec keys from selected products
  const allSpecKeys = useMemo(() => {
    const keys = new Set();
    selectedProducts.forEach((p) => {
      if (p.specs) Object.keys(p.specs).forEach((k) => keys.add(k));
    });
    return Array.from(keys);
  }, [selectedProducts]);

  const topFields = [
    { key: 'price', label: 'Price', render: (p) => p.price },
    { key: 'brand', label: 'Brand', render: (p) => p.brand || '—' },
    { key: 'rating', label: 'Rating', render: (p) => p.rating ? `${p.rating} / 5` : '—' },
    { key: 'badge', label: 'Badge', render: (p) => p.badge || '—' },
    ...(category === 'laptops' ? [{ key: 'category', label: 'Category', render: (p) => p.category || '—' }] : []),
    { key: 'tagline', label: 'Tagline', render: (p) => p.tagline || '—' },
  ];

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Header />
      <MobileBottomBar />

      <main className="min-h-screen bg-[#f7f8fa] pb-24 lg:pb-0">

        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-6">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800">Compare Products</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <GitCompare className="w-3.5 h-3.5" />
                  Compare
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Compare Products Side by Side
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-medium max-w-xl mx-auto">
                  Select up to 3 products to compare specs and find your perfect match.
                </p>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 pb-16">

          {/* Category Toggle */}
          <BlurRevealBox delay={0.05}>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleCategorySwitch('mobiles')}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-sm font-black transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                  category === 'mobiles'
                    ? 'bg-neutral-950 text-amber-400 border-neutral-950'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Smartphones</span>
              </button>
              <button
                type="button"
                onClick={() => handleCategorySwitch('laptops')}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl text-sm font-black transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                  category === 'laptops'
                    ? 'bg-neutral-950 text-amber-400 border-neutral-950'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>Laptops</span>
              </button>
            </div>
          </BlurRevealBox>

          {/* Product Picker */}
          <BlurRevealBox delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-black text-neutral-950 uppercase tracking-tight">
                  Select Products
                </h2>
                <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                  {selectedIds.length}/3 selected
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder={`Search ${category === 'mobiles' ? 'smartphones' : 'laptops'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
                {filtered.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const isDisabled = !isSelected && selectedIds.length >= 3;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => toggleProduct(product.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400'
                          : isDisabled
                          ? 'opacity-40 cursor-not-allowed bg-neutral-50 border-neutral-100'
                          : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="w-full h-20 bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            {category === 'mobiles' ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <p className="text-[11px] font-bold text-neutral-800 leading-snug line-clamp-2">{product.name}</p>
                        <p className="text-[11px] font-black text-amber-600 mt-0.5">{product.price}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-8 text-neutral-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">No products found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </BlurRevealBox>

          {/* Comparison Table */}
          {selectedProducts.length === 0 ? (
            <BlurRevealBox delay={0.15}>
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-12 text-center">
                <GitCompare className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                <p className="text-neutral-500 font-semibold text-base">Select products above to compare</p>
                <p className="text-neutral-400 text-sm mt-1">Choose up to 3 products from the picker above</p>
              </div>
            </BlurRevealBox>
          ) : (
            <BlurRevealBox delay={0.15}>
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-100">
                  <h2 className="text-base font-black text-neutral-950 uppercase tracking-tight">Comparison</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-neutral-100">
                        {/* Spec label col */}
                        <th className="w-36 px-4 py-3 text-left text-xs font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50 sticky left-0 z-10">Spec</th>
                        {/* Product columns */}
                        {selectedProducts.map((p) => (
                          <th key={p.id} className="px-4 py-3 text-center min-w-[180px]">
                            <div className="flex flex-col items-center gap-2">
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => removeProduct(p.id)}
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-200 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center text-neutral-600 transition-all cursor-pointer"
                                  aria-label={`Remove ${p.name}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                                <div className="w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden">
                                  {p.images && p.images[0] ? (
                                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                      {category === 'mobiles' ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-neutral-800 line-clamp-2 text-center leading-snug">{p.name}</p>
                                <p className="text-sm font-black text-amber-500 mt-0.5">{p.price}</p>
                              </div>
                            </div>
                          </th>
                        ))}
                        {/* Empty cols for remaining slots */}
                        {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                          <th key={`empty-${i}`} className="px-4 py-3 min-w-[180px]">
                            <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-300 text-xs font-medium">
                              + Add product
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Top fields */}
                      {topFields.map((field) => (
                        <tr key={field.key} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50 sticky left-0 z-10">{field.label}</td>
                          {selectedProducts.map((p) => (
                            <td key={p.id} className="px-4 py-3 text-center text-sm text-neutral-700 font-medium">
                              {field.key === 'rating' ? (
                                <span className="flex items-center justify-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  {p.rating} / 5
                                </span>
                              ) : field.key === 'badge' && p.badge ? (
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${p.badgeColor}`}>
                                  {p.badge}
                                </span>
                              ) : (
                                field.render(p)
                              )}
                            </td>
                          ))}
                          {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                            <td key={`empty-${i}`} className="px-4 py-3" />
                          ))}
                        </tr>
                      ))}
                      {/* Spec rows */}
                      {allSpecKeys.map((specKey) => (
                        <tr key={specKey} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50 sticky left-0 z-10 whitespace-nowrap">{specKey}</td>
                          {selectedProducts.map((p) => (
                            <td key={p.id} className="px-4 py-3 text-center text-sm text-neutral-700 font-medium">
                              {p.specs && p.specs[specKey] ? p.specs[specKey] : <span className="text-neutral-300">—</span>}
                            </td>
                          ))}
                          {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                            <td key={`empty-${i}`} className="px-4 py-3" />
                          ))}
                        </tr>
                      ))}
                      {/* Buy row */}
                      <tr>
                        <td className="px-4 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50 sticky left-0 z-10">Buy</td>
                        {selectedProducts.map((p) => (
                          <td key={p.id} className="px-4 py-4 text-center">
                            <WABuyButton product={p} />
                          </td>
                        ))}
                        {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                          <td key={`empty-${i}`} className="px-4 py-4" />
                        ))}
                      </tr>
                    </tbody>
                  </table>
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
