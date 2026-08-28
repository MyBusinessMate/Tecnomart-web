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

  const addToCart = (product, quantity = 1, selectedConfig = null, selectedColor = null) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${selectedConfig?.name || 'default'}-${selectedColor?.name || 'default'}`;
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const priceToUse = selectedConfig?.rawPrice || product.rawPrice || 0;
        const displayPrice = selectedConfig?.price || product.price || '₹0';
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            quantity,
            selectedConfig,
            selectedColor,
            unitPrice: priceToUse,
            displayPrice,
          },
        ];
      }
    });
    showToast(`Added "${product.name}" to cart! 🛒`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
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
        showToast(`Saved to Wishlist ❤️`);
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
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
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedCoupon?.discountPercent
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const shippingFee = cartSubtotal > 49999 || appliedCoupon?.freeDelivery ? 0 : 499;
  const totalPayable = Math.max(0, cartSubtotal - discountAmount + (cartSubtotal > 0 ? shippingFee : 0));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-amber-400 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-2 animate-bounce">
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
