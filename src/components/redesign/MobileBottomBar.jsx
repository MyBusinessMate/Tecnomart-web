"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Wrench, ShoppingBag, Home, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';

export default function MobileBottomBar() {
  const { setIsRepairOpen } = useShop();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show near top or when scrolling up
      if (currentScrollY < 100 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/90 px-3 py-2 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
          style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
            
            {/* Home Link */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] text-neutral-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs font-bold tracking-tight mt-1">Home</span>
            </Link>

            {/* PC Builder / Categories */}
            <Link
              href="/pc-builds"
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] text-neutral-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Layers className="w-5 h-5" />
              <span className="text-xs font-bold tracking-tight mt-1">Builder</span>
            </Link>

            {/* Primary Action FAB: Book Repair */}
            <button
              onClick={() => setIsRepairOpen(true)}
              className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 min-w-[62px] min-h-[62px] rounded-full shadow-[0_4px_20px_rgba(245,158,11,0.5)] border-2 border-neutral-950 active:scale-90 transition-transform cursor-pointer"
              aria-label="Book a repair"
            >
              <Wrench className="w-6 h-6 stroke-[2.5]" />
              <span className="text-[10px] font-black uppercase tracking-wider -mt-0.5">Repair</span>
            </button>

            {/* WhatsApp Support */}
            <a
              href="https://wa.me/919010667726?text=Hi%20TecnoMart!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] text-neutral-400 hover:text-[#25D366] active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="text-xs font-bold tracking-tight mt-1">Chat</span>
            </a>

            {/* Direct Call */}
            <a
              href="tel:+919010667726"
              className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] text-neutral-400 hover:text-amber-400 active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span className="text-xs font-bold tracking-tight mt-1">Call</span>
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
