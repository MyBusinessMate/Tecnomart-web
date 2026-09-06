"use client";

import React, { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCleanedUp = false;

    // Respect the user's OS-level motion preference.
    // Users with vestibular disorders or motion sensitivity should never
    // experience momentum scrolling they didn't opt into.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Dynamically import Lenis to prevent SSR hydration mismatches
    import('lenis').then((lenisModule) => {
      if (isCleanedUp) return;

      const Lenis = lenisModule.default || lenisModule;

      // 1. Initialize Lenis with exact Ballance lerp math & mobile safety
      const lenis = new Lenis({
        lerp: 0.1, // Exact Ballance linear interpolation rate (10% distance per frame)
        smoothWheel: true,
        syncTouch: false, // MANDATORY: Never hijack mobile touch to preserve native 120Hz iOS/Android physics
        wheelMultiplier: 1,
        touchInertiaMultiplier: 35,
      });

      lenisRef.current = lenis;

      // Expose globally for modals or programmatic scrolling
      if (typeof window !== 'undefined') {
        window.__lenis = lenis;
      }

      // 2. High-performance RAF loop (decouples visual render from DOM scroll)
      function raf(time) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);

      // 3. Anchor Link Interception with Document Delegation (Ballance physics for all links, static & dynamic)
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
              offset: -40, // Account for sticky navbar height
              lerp: 0.1,   // Buttery smooth deceleration
              duration: 1.2,
            });
          }
        } catch (err) {
          // Selector fallback
        }
      };

      document.addEventListener('click', handleGlobalClick, { passive: false });

      return () => {
        document.removeEventListener('click', handleGlobalClick);
      };
    });

    return () => {
      isCleanedUp = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
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
    // reducedMotion="user" reads the OS prefers-reduced-motion setting and
    // disables all Framer Motion animations automatically when it is set.
    // Lenis CSS overrides live in globals.css — no inline <style> needed.
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
