"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '@/data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRepairOpen, setIsRepairOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [locationPincode, setLocationPincode] = useState('500033');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

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

  const [cartPopup, setCartPopup] = useState(null); // { message: string, visible: boolean }

  const showCartPopup = (productName) => {
    setCartPopup({ message: `1 item added to cart`, productName, visible: true });
    setTimeout(() => {
      setCartPopup(null);
    }, 1600);
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
        const itemImage = product.images?.[0] || product.image || product.images || '/bento-grid-images/mackbook.png';
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
      }}
    >
      {children}

      {/* Floating Bottom Green Popup ("X item added to cart") */}
      {cartPopup && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none"
          style={{ animation: 'slideUpAndDown 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="bg-[#15803d] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/40 pointer-events-auto">
            <div className="w-5 h-5 rounded-full bg-white text-[#15803d] flex items-center justify-center font-black text-xs shadow-xs">
              ✓
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-wide">
                {cartPopup.message}
              </span>
              {cartPopup.productName && (
                <span className="text-emerald-100 text-xs font-semibold max-w-[200px] truncate hidden sm:inline">
                  ({cartPopup.productName})
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-midgrey-900 text-amber-400 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
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
