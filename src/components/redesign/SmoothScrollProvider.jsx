"use client";

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's OS reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile / Touch detection: Never hijack touch gestures to preserve native 120Hz OS inertia
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Snappy, lag-free smooth wheel configuration
    const lenis = new Lenis({
      duration: 0.75, // Quick, responsive deceleration (eliminates sluggish float lag)
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.05,
      autoRaf: true, // Native internal RAF handling
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Global Anchor Link Delegation
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetHref = anchor.getAttribute('href');
      if (!targetHref || targetHref === '#' || targetHref.length <= 1) return;

      try {
        const targetElem = document.querySelector(targetHref);
        if (targetElem) {
          e.preventDefault();
          lenis.scrollTo(targetElem, {
            offset: -40,
            duration: 0.8,
          });
        }
      } catch (_err) {
        // Fallback
      }
    };

    document.addEventListener('click', handleGlobalClick, { passive: false });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (typeof window !== 'undefined' && window.__lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
