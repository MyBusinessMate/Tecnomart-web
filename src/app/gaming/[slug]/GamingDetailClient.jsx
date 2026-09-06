"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import RepairModal from '@/components/redesign/RepairModal';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createProductSchema, createBreadcrumbSchema } from '@/components/SEO';
import { GAMING_DATA, getGamingBySlug } from '@/data/products';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Check,
  ChevronRight,
  MapPin,
  Sparkles,
  CreditCard,
  Package,
  Gamepad2,
  Cpu,
  Zap,
} from 'lucide-react';

export default function GamingDetailClient({ slug }) {
  const rig = getGamingBySlug(slug);
  const { addToCart, locationPincode, isRepairOpen, setIsRepairOpen } = useShop();

  const [selectedImage, setSelectedImage] = useState(rig.images[0] || rig.images);
  const [selectedConfig, setSelectedConfig] = useState(rig.configs?.[0] || { name: 'Standard', price: rig.price, rawPrice: rig.rawPrice });
  const [pincode, setPincode] = useState(locationPincode || '');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const activePrice = selectedConfig?.price || rig.price;

  const canonicalUrl = `https://tecnomart.in/gaming/${rig.slug}`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gaming PCs', url: '/gaming' },
    { name: rig.name, url: `/gaming/${rig.slug}` },
  ]);
  const productSchema = createProductSchema(rig, canonicalUrl);
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...(productSchema ? [productSchema] : []),
    ],
  };

  const handleAddToCart = () => {
    addToCart(rig, 1, selectedConfig);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Hello TecnoMart! 🎮 I am interested in the *${rig.name}* (${selectedConfig.name}) at ${activePrice}.\n\nPlease share customization options and delivery schedule in Hyderabad.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeChecked(true);
    }
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title={`${rig.name} Gaming PC Price in Hyderabad | TecnoMart`}
        description={rig.tagline || `Handcrafted, benchmarked ${rig.name} custom gaming PC in Jubilee Hills, Hyderabad. 3-year warranty and same-day delivery.`}
        canonicalUrl={canonicalUrl}
        ogImage={rig.images?.[0]}
        schema={combinedSchema}
      />
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-20 lg:pb-0">
        <ScrollProgress />
        <Header onOpenRepairModal={() => setIsRepairOpen(true)} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-neutral-900 transition-colors flex-shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link href="/gaming" className="hover:text-neutral-900 transition-colors flex-shrink-0">Gaming PCs</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-neutral-900 font-bold truncate">{rig.name}</span>
            </div>

            {/* Product Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
              
              {/* Left Column: Image Gallery (Col 6) */}
              <div className="lg:col-span-6 space-y-4 sticky top-24">
                <div className="w-full aspect-square max-h-[500px] bg-neutral-950 rounded-3xl p-6 sm:p-10 border border-neutral-800 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${rig.badgeColor}`}>
                    {rig.badge}
                  </span>

                  <img
                    src={selectedImage}
                    alt={rig.name}
                    className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Assurance Badges Strip */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-[11px] font-bold text-neutral-700">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>3-Year Hardware Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>Onsite Engineer Setup</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-amber-500" />
                    <span>24-Hour Stress Tested</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Product Info & Pricing (Col 6) */}
              <div className="lg:col-span-6 space-y-6">
                
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-black tracking-widest text-amber-500 uppercase flex items-center gap-1">
                      <Gamepad2 className="w-4 h-4" />
                      {rig.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{rig.rating}</span>
                      <span className="text-neutral-400">({rig.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                    {rig.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                    {rig.tagline}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                      {activePrice}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      {rig.originalPrice}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {rig.discountPercent}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-medium">
                    Inclusive of 18% GST (Input Tax Credit invoice) • Free engineer setup in Hyderabad
                  </p>

                  <div className="pt-2 border-t border-neutral-200 flex items-center gap-2 text-xs font-bold text-neutral-800">
                    <CreditCard className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{rig.emiText}</span>
                  </div>
                </div>

                {/* FPS Benchmark Grid */}
                {rig.fpsBenchmarks && (
                  <div className="p-4 bg-neutral-950 text-white rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-black text-amber-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400 fill-current" />
                        Gaming FPS Performance Benchmarks
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {rig.fpsBenchmarks.map((b, i) => (
                        <div key={i} className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                          <span className="text-neutral-400 text-[10px] block font-bold truncate">{b.game}</span>
                          <span className="text-amber-400 font-black text-sm">{b.fps}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Configurations */}
                {rig.configs && rig.configs.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-neutral-700 uppercase">Hardware Tier:</span>
                      <span className="text-neutral-950 font-black">{selectedConfig.name}</span>
                    </div>

                    <div className="space-y-2">
                      {rig.configs.map((cfg) => (
                        <button
                          key={cfg.name}
                          onClick={() => setSelectedConfig(cfg)}
                          className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            selectedConfig.name === cfg.name
                              ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-black text-neutral-950">
                            {cfg.name}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-amber-600 pl-2">
                            {cfg.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pincode & Delivery Checker */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                  <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    Check Onsite Delivery &amp; Setup in Hyderabad
                  </span>

                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode (e.g. 500033)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 h-10 px-3.5 text-base sm:text-xs bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase rounded-xl cursor-pointer"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeChecked && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
                      <Check className="w-4 h-4" />
                      <span>Ready for Same-Day Onsite Engineer Setup in {pincode}!</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`min-h-[48px] rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all active:scale-98 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                      }`}
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppBuy}
                      className="min-h-[48px] bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 mb-16 shadow-xs">
              <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase mb-6">
                Complete Component Breakdown
              </h3>

              <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {Object.entries(rig.specs || {}).map(([key, val]) => (
                  <div key={key} className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                    <span className="sm:col-span-4 font-bold text-neutral-500 uppercase tracking-wider text-[11px] sm:text-xs">
                      {key}
                    </span>
                    <span className="sm:col-span-8 font-semibold text-neutral-900">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar onOpenRepairModal={() => setIsRepairOpen(true)} />
        <RepairModal isOpen={isRepairOpen} onClose={() => setIsRepairOpen(false)} />
      </div>
    </SmoothScrollProvider>
  );
}
