"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import RepairModal from '@/components/redesign/RepairModal';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { REFURBISHED_DATA, getRefurbishedBySlug } from '@/data/products';
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
  Award,
} from 'lucide-react';

export default function RefurbishedDetailClient({ slug }) {
  const item = getRefurbishedBySlug(slug);
  const { addToCart, locationPincode, isRepairOpen, setIsRepairOpen } = useShop();

  const [selectedImage, setSelectedImage] = useState(item.images[0] || item.images);
  const [pincode, setPincode] = useState(locationPincode || '');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Hello TecnoMart! ♻️ I want to purchase Certified Refurbished *${item.name}* at ${item.price}.\n\nPlease confirm availability and warranty details.`
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
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-neutral-900 transition-colors flex-shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link href="/refurbished" className="hover:text-neutral-900 transition-colors flex-shrink-0">Refurbished</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-neutral-900 font-bold truncate">{item.name}</span>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
              
              {/* Left Column: Image (Col 6) */}
              <div className="lg:col-span-6 space-y-4 sticky top-24">
                <div className="w-full aspect-square max-h-[500px] bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 flex items-center justify-center relative overflow-hidden group shadow-xs">
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${item.badgeColor}`}>
                    {item.badge}
                  </span>

                  <img
                    src={selectedImage}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-center text-[11px] font-bold text-emerald-900">
                  <div className="flex flex-col items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>50-Point QA Passed</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>6-Month Store Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-emerald-600" />
                    <span>7-Day Return Trial</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Info */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-black tracking-widest text-emerald-700 uppercase flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      CERTIFIED REFURBISHED GRADE A+
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                      <span className="text-neutral-400">({item.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                    {item.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                    {item.tagline}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                      {item.price}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      {item.originalPrice}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {item.discountPercent}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 font-medium">
                    Includes GST Invoice • Save big compared to brand new retail!
                  </p>

                  <div className="pt-2 border-t border-neutral-200 flex items-center gap-2 text-xs font-bold text-neutral-800">
                    <CreditCard className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{item.emiText}</span>
                  </div>
                </div>

                {/* Pincode */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                  <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    Check Doorstep Delivery in Hyderabad
                  </span>

                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter Pincode (e.g. 500033)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 h-10 px-3.5 text-xs bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                    />
                    <button type="submit" className="px-4 bg-neutral-950 text-white text-xs font-bold uppercase rounded-xl cursor-pointer">
                      Check
                    </button>
                  </form>

                  {pincodeChecked && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
                      <Check className="w-4 h-4" />
                      <span>Ready for Same-Day Doorstep Pickup/Delivery in {pincode}!</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`min-h-[48px] rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isAdded ? 'bg-emerald-500 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                    }`}
                  >
                    {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleWhatsAppBuy}
                    className="min-h-[48px] bg-amber-500 hover:bg-amber-600 text-neutral-950 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Buy on WhatsApp</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 mb-16">
              <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase mb-6">
                Technical Specifications &amp; Quality Inspection
              </h3>

              <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {Object.entries(item.specs || {}).map(([key, val]) => (
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
