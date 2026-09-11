"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppConfirmModal from '@/components/redesign/WhatsAppConfirmModal';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRepairOpen, setIsRepairOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [locationPincode, setLocationPincode] = useState('500008');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // WhatsApp Confirmation Modal state to prevent accidental redirects
  const [whatsAppModalUrl, setWhatsAppModalUrl] = useState(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const confirmWhatsApp = (url) => {
    setWhatsAppModalUrl(url);
    setIsWhatsAppModalOpen(true);
  };

  const handleConfirmWhatsApp = () => {
    if (whatsAppModalUrl) {
      window.open(whatsAppModalUrl, '_blank', 'noopener,noreferrer');
    }
    setIsWhatsAppModalOpen(false);
    setWhatsAppModalUrl(null);
  };

  const handleCancelWhatsApp = () => {
    setIsWhatsAppModalOpen(false);
    setWhatsAppModalUrl(null);
  };

  // Intercept direct clicks on WhatsApp links site-wide (especially on mobile)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      const link = target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (link && link.href) {
        e.preventDefault();
        e.stopPropagation();
        confirmWhatsApp(link.href);
      }
    };
    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tecnomart_cart');
      const savedWishlist = localStorage.getItem('tecnomart_wishlist');
      const savedPincode = localStorage.getItem('tecnomart_pincode');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedPincode) setLocationPincode(savedPincode);
    } catch (e) {
      console.error("Failed to load shop state", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tecnomart_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tecnomart_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [cartPopup, setCartPopup] = useState(null); // { message: string, productName?: string, visible: boolean }
  const cartPopupTimerRef = useRef(null);

  const showCartPopup = (productName) => {
    if (cartPopupTimerRef.current) clearTimeout(cartPopupTimerRef.current);
    setCartPopup({ message: `1 item added to cart`, productName, visible: true });
    cartPopupTimerRef.current = setTimeout(() => {
      setCartPopup(null);
    }, 4000);
  };

  const addToCart = (product, quantity = 1, selectedConfig = null, selectedColor = null) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${selectedConfig?.name || 'default'}-${selectedColor?.name || 'default'}`;
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        // Item is already in cart. Multiple products of the same product must be adjusted via the cart section
        return prevCart;
      } else {
        const priceToUse = selectedConfig?.rawPrice || product.rawPrice || (typeof product.price === 'number' ? product.price : (parseInt(String(product.price || '0').replace(/[^0-9]/g, ''), 10) || 0));
        const displayPrice = selectedConfig?.price || product.price || `₹${priceToUse.toLocaleString('en-IN')}`;
        const itemImage = product.images?.[0] || product.image || product.images || '/webp/bento-grid-images/mackbook.webp';
        const itemName = product.name || 'Product';

        return [
          ...prevCart,
          {
            cartItemId,
            product,
            name: itemName,
            image: itemImage,
            price: priceToUse,
            quantity: 1, // Only 1 item added initially; multiple quantities can be changed via cart section via + option
            selectedConfig,
            selectedColor,
            unitPrice: priceToUse,
            displayPrice,
          },
        ];
      }
    });
    showCartPopup(product.name);
    // Note: Do NOT open side drawer automatically. User will see green slide-up bottom popup.
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    // Cap at 10 items per product to prevent inventory / calculation exploits
    const safeQty = Math.min(10, Math.max(1, qty));
    if (qty > 10) {
      showToast('Maximum 10 units allowed per customer');
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: safeQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed item from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  // Rate-limiting for coupon attempts (prevents brute forcing)
  const couponAttemptsRef = React.useRef([]);

  const applyCoupon = (code) => {
    if (!code || typeof code !== 'string') {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    // Rate-limiting: Max 5 attempts per 30 seconds
    const now = Date.now();
    couponAttemptsRef.current = couponAttemptsRef.current.filter((time) => now - time < 30000);
    if (couponAttemptsRef.current.length >= 5) {
      return { success: false, message: 'Too many attempts. Please wait 30 seconds.' };
    }
    couponAttemptsRef.current.push(now);

    // Sanitize to alphanumeric max 20 chars
    const cleanCode = code.replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase().slice(0, 20);
    if (cleanCode.length < 3) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (cleanCode === 'TECNOMART10' || cleanCode === 'TECNO10') {
      setAppliedCoupon({ code: 'TECNOMART10', discountPercent: 10, description: '10% Instant Discount' });
      showToast('Coupon TECNOMART10 Applied! 10% Discount');
      return { success: true, message: '10% Instant discount applied!' };
    } else if (cleanCode === 'HYDEXPRESS') {
      setAppliedCoupon({ code: 'HYDEXPRESS', freeDelivery: true, description: 'Free Same-Day Delivery' });
      showToast('Coupon HYDEXPRESS Applied! Free Delivery');
      return { success: true, message: 'Free Same-Day Delivery unlocked!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try TECNOMART10 or HYDEXPRESS' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const changePincode = (pin) => {
    setLocationPincode(pin);
    try {
      localStorage.setItem('tecnomart_pincode', pin);
    } catch (e) {}
    showToast(`Delivery location set to ${pin} (Hyderabad Zone)`);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const price = typeof item.price === 'number' && !isNaN(item.price) && item.price > 0
      ? item.price
      : (typeof item.unitPrice === 'number' && !isNaN(item.unitPrice) && item.unitPrice > 0
        ? item.unitPrice
        : (item.product?.rawPrice || (parseInt(String(item.product?.price || '0').replace(/[^0-9]/g, ''), 10) || 0)));
    const qty = item.quantity || 1;
    return acc + price * qty;
  }, 0);
  const discountAmount = appliedCoupon?.discountPercent
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const shippingFee = cartSubtotal > 49999 || appliedCoupon?.freeDelivery ? 0 : 499;
  const totalPayable = Math.max(0, cartSubtotal - discountAmount + (cartSubtotal > 0 ? shippingFee : 0));
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        totalPayable,
        appliedCoupon,
        cartPopup,
        showCartPopup,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isRepairOpen,
        setIsRepairOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        locationPincode,
        changePincode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        showToast,
        confirmWhatsApp,
      }}
    >
      {children}

      {/* Floating Bottom Add-to-Cart Toast (Matching Reference Image) */}
      <AnimatePresence>
        {cartPopup && (
          <motion.div
            key="cart-popup-toast"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] max-w-[95vw] pointer-events-auto"
            onMouseEnter={() => {
              if (cartPopupTimerRef.current) clearTimeout(cartPopupTimerRef.current);
            }}
            onMouseLeave={() => {
              cartPopupTimerRef.current = setTimeout(() => setCartPopup(null), 3000);
            }}
          >
            <div className="bg-[#10a352] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xl shadow-emerald-950/40 border border-emerald-400/40 flex items-center gap-2.5 sm:gap-3.5">
              
              {/* Glowing Cart Icon Bubble with Sparks & Badge */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-400/25 flex items-center justify-center flex-shrink-0 shadow-inner">
                {/* 3 tiny spark rays on top-left matching reference image */}
                <span className="absolute -top-0.5 -left-0.5 w-1.5 h-0.5 bg-white/90 rounded-full -rotate-45" />
                <span className="absolute -top-1 left-2 w-1.5 h-0.5 bg-white/90 rounded-full -rotate-12" />
                <span className="absolute top-2 -left-1 w-1.5 h-0.5 bg-white/90 rounded-full rotate-12" />

                {/* Shopping Cart SVG */}
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>

                {/* White circular badge with green '1' */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-white text-[#10a352] flex items-center justify-center font-black text-[10px] shadow-xs leading-none">
                  1
                </div>
              </div>

              {/* Message */}
              <span className="font-bold text-xs sm:text-sm text-white tracking-wide whitespace-nowrap">
                {cartPopup.message || '1 item added to cart'}
              </span>

              {/* White Pill 'View Cart →' Button */}
              <button
                onClick={() => {
                  setCartPopup(null);
                  setIsCartOpen(true);
                }}
                className="bg-white hover:bg-neutral-50 active:scale-95 text-[#10a352] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-transform cursor-pointer whitespace-nowrap ml-1"
              >
                <span>View Cart</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* Dismiss 'X' Button */}
              <button
                onClick={() => setCartPopup(null)}
                aria-label="Close notification"
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-midgrey-900 text-amber-400 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* WhatsApp Confirmation Modal to prevent accidental redirects */}
      <WhatsAppConfirmModal
        isOpen={isWhatsAppModalOpen}
        onConfirm={handleConfirmWhatsApp}
        onCancel={handleCancelWhatsApp}
      />
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
