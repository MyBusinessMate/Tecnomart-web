"use client";

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ShieldCheck, Truck, Check, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    totalPayable,
    appliedCoupon,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const [celebrationBanner, setCelebrationBanner] = useState(false);

  const couponSectionRef = React.useRef(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCelebrationBanner(true);
      // Automatically keep the celebration banner active for 5 seconds
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

  const scrollToCheckoutArea = () => {
    if (couponSectionRef.current) {
      couponSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-midgrey-950/75 backdrop-blur-xs flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            data-lenis-prevent="true"
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden relative overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Celebration Green Slider Banner when coupon is applied */}
            {(celebrationBanner || appliedCoupon) && (
              <div className="bg-[#15803d] text-white px-4 py-2 text-xs font-black tracking-wide overflow-hidden relative z-30 shadow-md flex items-center justify-between border-b border-emerald-400/40">
                <div
                  className="flex items-center gap-2 whitespace-nowrap"
                  style={{ animation: 'couponCelebrationSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                >
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>Coupon code applied on this order</span>
                </div>
                <button
                  onClick={() => setCelebrationBanner(false)}
                  className="text-white/80 hover:text-white text-xs cursor-pointer ml-2"
                  aria-label="Dismiss banner"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-midgrey-900 text-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider">
                  Your Cart ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 text-xs flex-shrink-0">
              <div className="flex items-center justify-between font-bold mb-1.5 text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-500" />
                  {amountNeededForFreeShipping === 0 || appliedCoupon?.freeDelivery ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      FREE Express Hyderabad Delivery Unlocked!
                    </span>
                  ) : (
                    `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for Free Delivery`
                  )}
                </span>
                <span className="text-amber-600 font-extrabold">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Unified Cart Items & Checkout Scroll Container (Everything in one screen, seamless view) */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-neutral-100 overscroll-contain"
            >
              {cart.length === 0 ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 text-neutral-500">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-black text-neutral-900 uppercase">Your Cart is Empty</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Explore our MacBooks, Gaming PCs, Mobiles &amp; Accessories to add items.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-midgrey-900 text-amber-400 font-black text-xs uppercase rounded-xl shadow-md hover:bg-midgrey-800 transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items Limited to 5 Initially */}
                  <div className="space-y-3 divide-y divide-neutral-100">
                    {visibleItems.map((item) => (
                      <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 items-center">
                        {/* Item Image */}
                        <div className="w-18 h-18 bg-neutral-50 rounded-2xl border border-neutral-200 p-2 flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.product.images?.[0] || item.product.images || '/bento-grid-images/mackbook.png'}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-black text-neutral-950 truncate leading-tight">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                            {item.selectedConfig?.name || item.selectedColor?.name || item.product.brand}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Buttons */}
                            <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-black text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price & Delete */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-black text-neutral-950">
                                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View More / View Less Toggle Button for Cart list limit of 5 */}
                  {hasMoreItems && (
                    <div className="pt-2 text-center">
                      <button
                        onClick={() => setShowAllItems(!showAllItems)}
                        className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {showAllItems ? '▲ Show Less Items' : `▼ View ${cart.length - 5} More Items`}
                      </button>
                    </div>
                  )}

                  {/* Coupon & Totals Section seamlessly integrated in scroll flow */}
                  <div ref={couponSectionRef} className="pt-5 border-t border-neutral-200 space-y-4">
                    
                    {/* Coupon Code Section */}
                    <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 block">
                        Apply Discount Coupon
                      </span>
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <div className="flex gap-2">
                          <div className="flex-1 relative">
                            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                              type="text"
                              placeholder="Coupon (e.g. TECNOMART10)"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value)}
                              className="w-full h-9 pl-9 pr-3 text-xs uppercase font-bold bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-4 h-9 bg-midgrey-900 hover:bg-midgrey-800 text-amber-400 font-bold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>

                        {couponFeedback && (
                          <p
                            className={`text-[11px] font-bold ${
                              couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                            }`}
                          >
                            {couponFeedback.message}
                          </p>
                        )}

                        {appliedCoupon && (
                          <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-300 font-bold">
                            <span className="flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span>{appliedCoupon.code} applied ({appliedCoupon.description})</span>
                            </span>
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              className="text-red-600 hover:underline text-xs font-black cursor-pointer ml-2 px-1.5 py-0.5 bg-red-50 rounded"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </form>
                    </div>

                    {/* Subtotal Calculations */}
                    <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                      <div className="flex justify-between font-semibold">
                        <span>Subtotal</span>
                        <span className="font-bold text-neutral-900">
                          ₹{cartSubtotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between font-bold text-emerald-700">
                          <span>Promo Discount</span>
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

                      <div className="flex justify-between text-sm font-black text-neutral-950 pt-2 border-t border-neutral-200">
                        <span>Total Payable</span>
                        <span className="text-amber-600 text-base">
                          ₹{totalPayable.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Assurance */}
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-neutral-500 py-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>GST Tax Invoice Included • 100% Genuine Sealed Units</span>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Sticky Bottom Action Button */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex-shrink-0">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="btn-wipe-yellow w-full min-h-[48px] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="relative z-10">Proceed to Checkout (₹{totalPayable.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
