"use client";

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ArrowLeft,
  Lock,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import SEO from '@/components/SEO';

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    totalPayable,
    appliedCoupon,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [couponAccordionOpen, setCouponAccordionOpen] = useState(true);

  // Fallback demo product matching Images 2 & 3 if user cart is empty
  const isDemo = cart.length === 0;
  const demoItem = {
    id: 'zotac-rtx-4060',
    name: 'Zotac Gaming RTX 4060',
    subtitle: 'High-performance graphics for next-level gaming.',
    price: 32999,
    unitPrice: 32999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    warranty: '3 Years Warranty',
    inStock: true,
  };

  const activeItems = isDemo ? [demoItem] : cart;
  const activeCount = isDemo ? 1 : cartCount;
  const subtotal = isDemo ? 32999 : cartSubtotal;
  const shipping = isDemo ? 499 : shippingFee;
  const discount = isDemo
    ? (appliedCoupon?.discountPercent ? Math.round((32999 * appliedCoupon.discountPercent) / 100) : 0)
    : discountAmount;
  const finalTotal = isDemo ? 32999 + shipping - discount : totalPayable;

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponFeedback(res);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback({ success: false, message: 'Coupon removed' });
  };

  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans antialiased text-neutral-900 selection:bg-amber-400 selection:text-neutral-950">
      <SEO
        title="Your Cart | TecnoMart"
        description="Review items in your cart and proceed to secure checkout with official warranty."
        canonicalUrl="https://tecnomart.in/cart"
        robots="noindex, nofollow"
      />

      {/* =====================================================================
          TOP HEADER: Matches Images 2 & 3
          - Desktop: TecnoMart | TECH FOR A BRIGHTER YOU, ← Continue Shopping
          - Mobile: ←, TecnoMart | TECH FOR A BRIGHTER YOU, Cart badge [1]
          ===================================================================== */}
      <header className="w-full bg-white border-b border-neutral-200/80 sticky top-0 z-40">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Mobile Back Button */}
          <div className="flex md:hidden items-center">
            <Link
              href="/"
              aria-label="Back to store"
              className="p-1.5 text-neutral-800 hover:text-amber-500 rounded-lg active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Brand & Tagline */}
          <div className="flex items-center gap-2.5 select-none">
            <Link href="/" className="font-black tracking-tight text-base sm:text-lg text-neutral-950">
              Tecno<span className="text-[#F5B800]">Mart</span>
            </Link>
            <span className="text-neutral-300 font-light">|</span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-bold text-neutral-400 uppercase">
              Tech For A Brighter You
            </span>
          </div>

          {/* Right Action */}
          <div className="flex items-center">
            {/* Desktop: Continue Shopping Link */}
            <Link
              href="/"
              className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>

            {/* Mobile: Cart Bag with Counter */}
            <div className="flex md:hidden relative p-1.5 text-neutral-900">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#F5B800] text-neutral-950 font-black text-[9.5px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {activeCount}
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* =====================================================================
          MAIN CART VIEW: Matches Images 2 & 3
          ===================================================================== */}
      <main className="flex-1 max-w-[1380px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-28 sm:py-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F5B800] block">
              YOUR CART
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight">
              <span className="md:inline hidden">Almost Yours!</span>
              <span className="md:hidden inline">
                Your <span className="text-[#F5B800]">Cart</span>
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Review your items, apply offers and proceed to checkout.
            </p>
          </div>

          {/* Desktop Right Brand Tag */}
          <div className="hidden md:flex items-center gap-3 bg-white border border-neutral-200/80 rounded-2xl px-4 py-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 leading-tight">
                Great Tech Choices!
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                Same Passion, Bigger Possibilities.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Delivery Progress, Cart Items, Trust Badges (Span 7) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Free Express Delivery Progress Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-neutral-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>
                    {neededForFreeShipping > 0
                      ? `Add ₹${neededForFreeShipping.toLocaleString('en-IN')} more for FREE Express Delivery`
                      : `🎉 You have unlocked FREE Express Delivery!`}
                  </span>
                </div>
                <span className="text-neutral-500 text-xs font-semibold whitespace-nowrap">
                  {progressPercent}% complete
                </span>
              </div>

              {/* Progress Track with Smooth Yellow Fill */}
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#F5B800] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* 2. Cart Items List */}
            <div className="space-y-4">
              {activeItems.map((item) => {
                const itemPrice = typeof item.price === 'number'
                  ? item.price
                  : (typeof item.unitPrice === 'number'
                    ? item.unitPrice
                    : (parseInt(String(item.product?.price || '32999').replace(/[^0-9]/g, ''), 10) || 32999));
                const itemQty = item.quantity || 1;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative"
                  >
                    {/* Top Right Mobile Trash Icon */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="absolute top-4 right-4 sm:hidden text-neutral-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0 pr-8 sm:pr-0">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 bg-neutral-50 rounded-xl border border-neutral-200/80 p-1.5 flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.image || item.product?.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80'}
                          alt={item.name || item.product?.name || 'Product'}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-base text-neutral-950 truncate leading-snug">
                          {item.name || item.product?.name || 'Zotac Gaming RTX 4060'}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-neutral-500 font-medium line-clamp-1">
                          {item.subtitle || item.product?.specs || 'High-performance graphics for next-level gaming.'}
                        </p>

                        {/* Status Badges */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[2.5]" /> In Stock
                          </span>
                          <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3 stroke-[2]" /> 3 Years Warranty
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stepper & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50/50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, itemQty - 1))}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200/80 active:scale-95 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-neutral-950">
                          {itemQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, itemQty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200/80 active:scale-95 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-neutral-950 whitespace-nowrap">
                          ₹{(itemPrice * itemQty).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Desktop Trash Icon */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="hidden sm:flex text-neutral-400 hover:text-red-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Mobile-Only Coupon Accordion (Matches Image 3) */}
            <div className="block lg:hidden bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
              <button
                type="button"
                onClick={() => setCouponAccordionOpen(!couponAccordionOpen)}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Apply Promotional Coupon</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${couponAccordionOpen ? 'rotate-180' : ''}`} />
              </button>

              {couponAccordionOpen && (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="TRY TECNOMART10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs uppercase font-bold outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="bg-[#F5B800] hover:bg-amber-500 active:scale-95 text-neutral-950 font-black text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Suggestion Pill */}
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon('TECNOMART10')}
                    className="w-full bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] font-bold text-amber-700 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      TECNOMART10 (10% OFF)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg">
                      <span>✓ Applied: {appliedCoupon.code}</span>
                      <button onClick={handleRemoveCoupon} className="text-red-500 text-[11px] hover:underline">Remove</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3 Trust Badges (Matches Images 2 & 3) */}
            <div className="grid grid-cols-3 bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-2xs text-center divide-x divide-neutral-100">
              <div className="flex flex-col items-center justify-center gap-1 px-1">
                <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  100% Genuine Sealed
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium hidden sm:block">
                  Official Brand India Warranty
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 px-1">
                <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  4-Hour Express Delivery
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium hidden sm:block">
                  Anywhere across Hyderabad
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 px-1">
                <RotateCcw className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  Easy 7-Day Exchange
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium hidden sm:block">
                  Hassle-free replacement policy
                </p>
              </div>
            </div>

            {/* Desktop Bottom Tag */}
            <div className="hidden lg:block text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase pt-2">
              UPGRADE • GAME • CREATE • REPEAT
            </div>

          </div>


          {/* Right Column: Order Summary (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Desktop Dark Order Summary Card (Matches Image 2) */}
            <div className="hidden lg:block bg-neutral-900 text-white rounded-3xl p-6 shadow-2xl space-y-5 border border-neutral-800">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Order Summary
                </h2>
                <span className="text-xs font-bold text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full">
                  {activeCount} {activeCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs sm:text-sm font-medium">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Express Hyderabad Shipping</span>
                  <span className="font-bold text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>Discount Applied</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="h-[1px] bg-neutral-800" />

              {/* Total Payable (Large Yellow Accent) */}
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-white">Total Payable</span>
                <span className="text-2xl font-black text-[#F5B800] tracking-tight">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Coupon Field on Desktop */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 bg-neutral-800/80 rounded-2xl p-1 border border-neutral-700">
                  <Tag className="w-4 h-4 text-[#F5B800] ml-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="TRY TECNOMART10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-transparent text-white text-xs px-2 py-1.5 outline-none font-bold placeholder:text-neutral-500 uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="bg-[#F5B800] hover:bg-amber-500 active:scale-95 text-neutral-950 font-black text-xs px-5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Coupon Suggestion Pill */}
                <button
                  type="button"
                  onClick={() => handleApplyCoupon('TECNOMART10')}
                  className="w-full bg-neutral-800/50 hover:bg-neutral-800 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-[#F5B800] cursor-pointer transition-colors"
                >
                  <span>% TECNOMART10 (10% OFF)</span>
                  <span className="text-[10px] text-neutral-400 uppercase">Click to apply</span>
                </button>
              </div>

              {/* Proceed to Checkout CTA (Yellow with Black Text per user request) */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 bg-[#F5B800] hover:bg-amber-500 active:scale-98 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <p className="text-[11px] text-neutral-400 font-semibold flex items-center justify-center gap-1.5 text-center">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Secure &amp; Encrypted Checkout</span>
              </p>
            </div>

            {/* Mobile Order Summary Card (Matches Image 3) */}
            <div className="block lg:hidden bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                <div className="w-5 h-5 rounded bg-amber-500/15 text-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <span>Order Summary</span>
              </div>

              <div className="space-y-2 text-xs font-medium text-neutral-600">
                <div className="flex items-center justify-between">
                  <span>Items Subtotal ({activeCount} item)</span>
                  <span className="font-bold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Express Hyderabad Shipping</span>
                  <span className="font-bold text-neutral-900">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="h-[1px] bg-neutral-100" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-neutral-950">Total Payable</span>
                <span className="text-xl font-black text-[#F5B800]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-neutral-50 rounded-xl p-2.5 text-center text-[10px] text-neutral-500 font-medium">
                All prices inclusive of 18% GST • Official Tax Invoice Provided
              </div>

              {/* Mobile CTA Button */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 bg-[#F5B800] hover:bg-amber-500 active:scale-98 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <p className="text-[10px] text-neutral-400 font-semibold flex items-center justify-center gap-1 text-center">
                <Lock className="w-3 h-3 text-neutral-400" />
                <span>Secure &amp; Encrypted Checkout</span>
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
