"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import RepairModal from '@/components/redesign/RepairModal';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { LAPTOPS_DATA, getLaptopBySlug } from '@/data/products';
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
} from 'lucide-react';

export default function LaptopDetailClient({ slug }) {
  const laptop = getLaptopBySlug(slug);
  const { addToCart, locationPincode, isRepairOpen, setIsRepairOpen } = useShop();

  const [selectedImage, setSelectedImage] = useState(laptop.images[0] || laptop.images);
  const [selectedColor, setSelectedColor] = useState(laptop.colors?.[0] || { name: 'Default', hex: '#333' });
  const [selectedConfig, setSelectedConfig] = useState(laptop.configs?.[0] || { name: 'Standard', price: laptop.price, rawPrice: laptop.rawPrice });
  const [pincode, setPincode] = useState(locationPincode || '');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const activePrice = selectedConfig?.price || laptop.price;

  const handleAddToCart = () => {
    addToCart(laptop, 1, selectedConfig, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Hello TecnoMart! 💻 I want to purchase the *${laptop.name}* (${selectedColor.name}, ${selectedConfig.name}) at ${activePrice}.\n\nPlease confirm availability and delivery schedule in Hyderabad.`
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
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-20 lg:pb-0">
        <ScrollProgress />
        <Header onOpenRepairModal={() => setIsRepairOpen(true)} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-neutral-900 transition-colors flex-shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link href="/laptops" className="hover:text-neutral-900 transition-colors flex-shrink-0">Laptops</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-neutral-900 font-bold truncate">{laptop.name}</span>
            </div>

            {/* Product Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
              
              {/* Left Column: Image Gallery (Col 6) */}
              <div className="lg:col-span-6 space-y-4 sticky top-24">
                
                {/* Main Large Image */}
                <div className="w-full aspect-[4/3] max-h-[500px] bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 flex items-center justify-center relative overflow-hidden group shadow-xs">
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${laptop.badgeColor}`}>
                    {laptop.badge}
                  </span>

                  <img
                    src={selectedImage}
                    alt={laptop.name}
                    className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Thumbnails Row */}
                {laptop.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {laptop.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-24 h-20 rounded-2xl border-2 p-2 bg-neutral-50 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                          selectedImage === img
                            ? 'border-amber-500 shadow-md bg-amber-50/20'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Assurance Badges */}
                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-[11px] font-bold text-neutral-700">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Brand Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>Same-Day Setup</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-amber-500" />
                    <span>Free OS &amp; Office</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Product Info, Options & Pricing (Col 6) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Brand & Title */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                      {laptop.brand} {laptop.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{laptop.rating}</span>
                      <span className="text-neutral-400">({laptop.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                    {laptop.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                    {laptop.tagline}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                      {activePrice}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      {laptop.originalPrice}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {laptop.discountPercent}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-medium">
                    Inclusive of GST (Input Tax Credit eligible) • Free doorstep setup in Hyderabad
                  </p>

                  <div className="pt-2 border-t border-neutral-200 flex items-center gap-2 text-xs font-bold text-neutral-800">
                    <CreditCard className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{laptop.emiText}</span>
                  </div>
                </div>

                {/* Color Variants */}
                {laptop.colors && laptop.colors.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-neutral-700 uppercase">Chassis Finish:</span>
                      <span className="text-neutral-950 font-black">{selectedColor.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {laptop.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                            selectedColor.name === c.name
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-xs font-bold">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hardware Configurations */}
                {laptop.configs && laptop.configs.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-neutral-700 uppercase">Hardware Specification:</span>
                      <span className="text-neutral-950 font-black">{selectedConfig.name}</span>
                    </div>

                    <div className="space-y-2">
                      {laptop.configs.map((cfg) => (
                        <button
                          key={cfg.name}
                          onClick={() => setSelectedConfig(cfg)}
                          className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            selectedConfig.name === cfg.name
                              ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white'
                          }`}
                        >
                          <div className="text-left">
                            <span className="text-xs sm:text-sm font-black text-neutral-950 block">
                              {cfg.name}
                            </span>
                          </div>
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      Check Delivery &amp; Setup in Hyderabad
                    </span>
                  </div>

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
                      className="px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeChecked && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
                      <Check className="w-4 h-4" />
                      <span>Same-Day Doorstep Delivery &amp; Onsite Setup Available in {pincode}!</span>
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
                      <span>Buy on WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-neutral-500 font-medium">
                    {laptop.warrantyPeriod}
                  </p>
                </div>

              </div>

            </div>

            {/* Highlights & In The Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
              <div className="lg:col-span-8 bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200 space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase">
                  Engineered For Peak Performance
                </h3>

                <div className="space-y-3">
                  {laptop.keyHighlights?.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-950 font-black text-base uppercase">
                  <Package className="w-5 h-5 text-amber-500" />
                  <h4>In The Box</h4>
                </div>

                <ul className="space-y-2 text-xs text-neutral-600">
                  {laptop.inTheBox?.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 py-1 border-b border-neutral-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 mb-16 shadow-xs">
              <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase mb-6">
                Technical Specifications
              </h3>

              <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {Object.entries(laptop.specs || {}).map(([key, val]) => (
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

            {/* Other Laptops Recommendation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase">
                  Similar Laptops &amp; Workstations
                </h3>
                <Link href="/laptops" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {LAPTOPS_DATA.filter((l) => l.slug !== laptop.slug).slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/laptops/${item.slug}`}
                    className="group bg-white p-5 rounded-3xl border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full aspect-[4/3] bg-neutral-50 rounded-2xl p-3 mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">{item.brand}</span>
                      <h4 className="text-sm font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug">
                        {item.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-3">
                      <span className="text-sm font-black text-neutral-950">{item.price}</span>
                      <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                        View Specs →
                      </span>
                    </div>
                  </Link>
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
