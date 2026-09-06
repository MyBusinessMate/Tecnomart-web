"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { useShop } from '@/context/ShopContext';
import { 
  ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, 
  ShieldCheck, Truck, Check, ArrowLeft, RotateCcw, AlertCircle, Sparkles
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
  const [celebrationBanner, setCelebrationBanner] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCelebrationBanner(true);
      setTimeout(() => {
        setCelebrationBanner(false);
      }, 5000);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCelebrationBanner(false);
    setCouponFeedback({ success: false, message: 'Coupon removed' });
  };

  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Show only 5 items initially; rest accessible via 'View More' toggle
  const visibleItems = showAllItems ? cart : cart.slice(0, 5);
  const hasMoreItems = cart.length > 5;

  return (
    <SmoothScrollProvider>
      <SEO
        title="Your Cart | TecnoMart"
        description="Review items selected for enquiry at TecnoMart Jubilee Hills, Hyderabad."
        canonicalUrl="https://tecnomart.in/cart"
        robots="noindex, nofollow"
      />
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col selection:bg-amber-400 selection:text-neutral-950 font-sans antialiased text-neutral-900 pb-20 lg:pb-0">
        <ScrollProgress />
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-6">
            <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 font-bold">Shopping Cart</span>
          </nav>

          {/* Celebration Banner when Coupon Applied */}
          {(celebrationBanner || appliedCoupon) && (
            <div className="mb-6 rounded-2xl bg-[#047857] text-white px-5 py-3.5 flex items-center justify-between shadow-lg overflow-hidden relative animate-[fadeIn_0.3s_ease]">
              <div className="flex items-center gap-2.5 z-10">
                <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span className="text-sm font-black tracking-wide animate-[couponCelebrationSlide_1.2s_ease-out]">
                  Coupon code applied on this order
                </span>
                <span className="bg-emerald-800/80 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                  {appliedCoupon?.code || 'ACTIVE'}
                </span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-xs font-bold text-white/80 hover:text-white underline ml-3 z-10 cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Cart Title & Item Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-amber-500" />
                <span>Your Shopping Cart</span>
                <span className="text-lg font-bold text-neutral-400">({cartCount} items)</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Review your selected items, apply promotional discount codes, and proceed to secure checkout.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-amber-600 self-start sm:self-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 mb-2">Your cart is currently empty</h2>
              <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8 font-medium">
                Looks like you haven't added any tech, laptops, or mobile devices to your cart yet. Explore our latest deals and flagship arrivals!
              </p>
              <Link
                href="/"
                className="btn-wipe-yellow px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span className="relative z-10">Start Shopping</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          ) : (
            /* Active Full Cart Layout: 2 Columns */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8">
              
              {/* Left Column: Cart Items List (col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Free Shipping Progress Card */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-2 text-neutral-700">
                      <Truck className="w-4 h-4 text-amber-500" />
                      {amountNeededForFreeShipping === 0 ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          FREE Express Hyderabad Delivery Unlocked!
                        </span>
                      ) : (
                        `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Express Delivery`
                      )}
                    </span>
                    <span className="font-extrabold text-neutral-900">{progressToFreeShipping}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items Container */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
                      Products in Cart ({cart.length})
                    </span>
                    <span className="text-xs font-bold text-neutral-400">
                      Adjust quantities or remove items
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {visibleItems.map((item) => {
                      const itemName = item.name || item.product?.name || 'Selected Tech Product';
                      const itemImg = item.image || item.product?.images?.[0] || item.product?.image || item.product?.images || '/bento-grid-images/mackbook.png';
                      const unitPrice = typeof item.price === 'number' && !isNaN(item.price) && item.price > 0
                        ? item.price
                        : (typeof item.unitPrice === 'number' && !isNaN(item.unitPrice) && item.unitPrice > 0
                          ? item.unitPrice
                          : (item.product?.rawPrice || (parseInt(String(item.product?.price || '0').replace(/[^0-9]/g, ''), 10) || 0)));
                      const itemQty = item.quantity || 1;

                      return (
                        <div
                          key={item.cartItemId || item.id || Math.random()}
                          className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                        >
                          {/* Thumbnail & Title */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-20 h-20 sm:w-22 sm:h-22 bg-neutral-50 border border-neutral-200/80 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                              <img
                                src={itemImg}
                                alt={itemName}
                                className="w-full h-full object-contain mix-blend-multiply"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-base text-neutral-950 truncate hover:text-amber-600 transition-colors">
                                {itemName}
                              </h3>
                            
                            {/* Selected configuration or color */}
                            {(item.selectedConfig || item.selectedColor) && (
                              <p className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-2">
                                {item.selectedConfig && (
                                  <span className="bg-neutral-100 px-2 py-0.5 rounded font-medium">
                                    {item.selectedConfig.name}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="bg-neutral-100 px-2 py-0.5 rounded font-medium">
                                    Color: {item.selectedColor.name}
                                  </span>
                                )}
                              </p>
                            )}

                            <div className="text-xs font-bold text-neutral-400 mt-1 sm:hidden">
                              Unit Price: ₹{unitPrice.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        {/* Controls: Quantity + Price + Delete */}
                        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5">
                          {/* Stepper (+ / -) */}
                          <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50/80 p-1">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, itemQty - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center font-black text-sm text-neutral-950">
                              {itemQty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, itemQty + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[100px]">
                            <div className="font-extrabold text-base text-neutral-950">
                              ₹{(unitPrice * itemQty).toLocaleString('en-IN')}
                            </div>
                            {itemQty > 1 && (
                              <div className="text-[11px] text-neutral-400 font-semibold">
                                ₹{unitPrice.toLocaleString('en-IN')} each
                              </div>
                            )}
                          </div>

                          {/* Trash / Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="Remove from Cart"
                            aria-label={`Remove ${itemName} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  </div>

                  {/* View More / Fewer Items Toggle if > 5 items */}
                  {hasMoreItems && (
                    <div className="pt-6 mt-4 border-t border-neutral-100 text-center">
                      <button
                        onClick={() => setShowAllItems(!showAllItems)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        {showAllItems ? (
                          <>Show Fewer Items</>
                        ) : (
                          <>View {cart.length - 5} More Items in Cart</>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white border border-neutral-200/60 rounded-xl p-4 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-neutral-900">100% Genuine Sealed</h4>
                      <p className="text-[11px] text-neutral-500 font-medium">Official Brand India Warranty</p>
                    </div>
                  </div>
                  <div className="bg-white border border-neutral-200/60 rounded-xl p-4 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-neutral-900">4-Hour Express Delivery</h4>
                      <p className="text-[11px] text-neutral-500 font-medium">Anywhere across Hyderabad</p>
                    </div>
                  </div>
                  <div className="bg-white border border-neutral-200/60 rounded-xl p-4 flex items-center gap-3">
                    <RotateCcw className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-neutral-900">Easy 7-Day Exchange</h4>
                      <p className="text-[11px] text-neutral-500 font-medium">Hassle-free replacement policy</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Coupon & Order Summary (col-span-4) */}
              <div className="lg:col-span-4 space-y-6">

                {/* Discount Coupon Box */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-500" />
                    <span>Apply Promotional Coupon</span>
                  </h3>

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Try TECNOMART10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full text-xs font-bold uppercase tracking-wider bg-neutral-50 border border-neutral-200 rounded-xl pl-3 pr-2 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-neutral-950 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Coupon feedback / messages */}
                  {couponFeedback && (
                    <div className={`mt-3 text-xs font-bold flex items-center gap-1.5 ${
                      couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}>
                      {couponFeedback.success ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                      )}
                      <span>{couponFeedback.message}</span>
                    </div>
                  )}

                  {/* Active coupon tag with Remove button */}
                  {appliedCoupon && (
                    <div className="mt-3 flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>{appliedCoupon.code} applied ({appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}% OFF` : appliedCoupon.description})</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs font-black text-emerald-700 hover:text-red-600 px-2 py-1 rounded hover:bg-white transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold">
                    <span>Available coupon:</span>
                    <button
                      type="button"
                      onClick={() => setCouponInput('TECNOMART10')}
                      className="text-amber-600 hover:underline font-bold"
                    >
                      TECNOMART10 (10% OFF)
                    </button>
                  </div>
                </div>

                {/* Price Breakdown / Order Summary */}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-xs font-medium text-neutral-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal ({cartCount} units)</span>
                      <span className="font-bold text-neutral-900">
                        ₹{cartSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between font-bold text-emerald-700">
                        <span>Coupon Discount</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-semibold">
                      <span>Express Hyderabad Shipping</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 font-black">FREE</span>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-black text-neutral-950 pt-4 border-t border-neutral-200">
                      <span>Total Payable</span>
                      <span className="text-amber-600 text-xl font-black">
                        ₹{totalPayable.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* GST Invoice Note */}
                  <div className="bg-neutral-50 rounded-xl p-3 text-[11px] font-semibold text-neutral-500 text-center">
                    All prices inclusive of 18% GST • Official Tax Invoice Provided
                  </div>

                  {/* Primary Checkout Button */}
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="btn-wipe-yellow w-full min-h-[52px] font-black text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span className="relative z-10">Proceed to Checkout (₹{totalPayable.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[11px] text-neutral-400 font-bold inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Guaranteed Safe &amp; Encrypted Checkout</span>
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
