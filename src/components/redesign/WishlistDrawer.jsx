"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, HeartOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { ALL_PRODUCTS } from '@/data/products';

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useShop();

  const wishedProducts = wishlist
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            key="wishlist-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="text-base font-black text-neutral-950 uppercase tracking-tight">
                  Wishlist
                </h2>
                {wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {wishedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <HeartOff className="w-14 h-14 text-neutral-200" />
                  <div>
                    <p className="text-base font-black text-neutral-900 uppercase tracking-tight">
                      Your wishlist is empty
                    </p>
                    <p className="text-sm text-neutral-500 font-medium mt-1">
                      Save items you love by tapping the heart icon on any product.
                    </p>
                  </div>
                  <Link
                    href="/mobiles"
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100 px-4 py-3 space-y-1">
                  {wishedProducts.map((product) => (
                    <li key={product.id} className="py-3 flex items-start gap-3">
                      {/* Image */}
                      <Link
                        href={`/${product.category?.toLowerCase() || 'mobiles'}/${product.slug}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="flex-shrink-0 w-16 h-16 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100 flex items-center justify-center p-1.5"
                      >
                        <Image
                          src={Array.isArray(product.images) ? product.images[0] : (product.image || '/logo.png')}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/${product.category?.toLowerCase() || 'mobiles'}/${product.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="text-sm font-bold text-neutral-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm font-black text-neutral-950 mt-0.5">{product.price}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-neutral-400 line-through">{product.originalPrice}</p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product);
                              setIsWishlistOpen(false);
                            }}
                            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[11px] font-black uppercase tracking-wide px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors cursor-pointer border border-neutral-200"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {wishedProducts.length > 0 && (
              <div className="px-5 py-4 border-t border-neutral-100 space-y-2">
                <button
                  onClick={() => {
                    wishedProducts.forEach((p) => addToCart(p));
                    setIsWishlistOpen(false);
                  }}
                  className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add All to Cart ({wishedProducts.length})
                </button>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full h-10 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
