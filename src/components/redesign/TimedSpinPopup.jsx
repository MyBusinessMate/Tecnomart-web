"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { getSpinUrl, isSpinSubdomain } from '@/lib/domain';

export default function TimedSpinPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Do not show on spin subdomain or if already dismissed or on spin/admin routes
    if (isSpinSubdomain()) {
      return;
    }

    const hasDismissed = sessionStorage.getItem('tecnomart_spin_popup_dismissed');
    const isSpinRoute = location.pathname.startsWith('/spin') || location.pathname.startsWith('/supertechie');
    const isAdminRoute = location.pathname.startsWith('/myadmin');

    if (hasDismissed || isSpinRoute || isAdminRoute) {
      return;
    }

    // Do not pop up during automated performance testing (Lighthouse, Puppeteer)
    if (
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /Chrome-Lighthouse|Googlebot|HeadlessChrome/i.test(navigator.userAgent))
    ) {
      return;
    }

    const timer = setTimeout(() => {
      // Re-check sessionStorage in case user triggered it elsewhere
      if (!sessionStorage.getItem('tecnomart_spin_popup_dismissed')) {
        setIsOpen(true);
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isSpinSubdomain()) {
    return null;
  }

  const handleClose = () => {
    sessionStorage.setItem('tecnomart_spin_popup_dismissed', 'true');
    setIsOpen(false);
  };

  const handleGoToSpin = () => {
    sessionStorage.setItem('tecnomart_spin_popup_dismissed', 'true');
    setIsOpen(false);
    const spinUrl = getSpinUrl();
    if (spinUrl.startsWith('http')) {
      window.location.href = spinUrl;
    } else {
      navigate(spinUrl);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/50 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="spin-popup-title"
            className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-7 overflow-hidden text-neutral-900"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Dismiss lucky spin popup"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FBF3DB] text-[#956400] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Today's Lucky Reward</span>
            </div>

            {/* Title & Copy */}
            <h2 id="spin-popup-title" className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight leading-snug">
              Get a Lucky Chance to Win up to ₹2,000!
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-normal">
              Spin the official TecnoMart lucky wheel today and claim instant discount vouchers, AirPods accessories, or free scratch guards.
            </p>

            {/* Mini Wheel Graphic Accent */}
            <div className="my-5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center flex-shrink-0 shadow-inner">
                <svg className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-neutral-900">Guaranteed 100% Win Rate</div>
                <div className="text-[11px] text-neutral-500">Instant digital pass redeemable in-store & online</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleGoToSpin}
                className="btn-wipe-yellow w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Spin the Wheel Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="w-full py-2 text-center text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
