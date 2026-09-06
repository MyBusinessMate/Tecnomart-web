import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // 1. Initialize Lenis with exact Ballance lerp math & mobile touch safety
    const lenis = new Lenis({
      lerp: 0.1, // Exact Ballance linear interpolation rate (10% distance per frame)
      smoothWheel: true,
      syncTouch: false, // MANDATORY: Never hijack mobile touch to preserve native 120Hz physics
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // 2. High-performance RAF loop (decouples visual render from DOM scroll)
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // 3. Anchor Link Interception Loop (Ballance physics for internal navigation)
    const handleAnchorClick = (e: MouseEvent, targetHref: string) => {
      if (!targetHref || targetHref === '#') return;
      try {
        const targetElem = document.querySelector(targetHref);
        if (targetElem) {
          e.preventDefault();
          lenis.scrollTo(targetElem as HTMLElement, {
            offset: -40,
            lerp: 0.1,
            duration: 1.2,
          });
        }
      } catch (err) {
        // fallback
      }
    };

    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    const listeners: { anchor: Element; listener: (e: MouseEvent) => void }[] = [];

    anchorLinks.forEach((anchor) => {
      const targetHref = anchor.getAttribute('href');
      if (targetHref && targetHref !== '#') {
        const listener = (e: Event) => handleAnchorClick(e as MouseEvent, targetHref);
        anchor.addEventListener('click', listener);
        listeners.push({ anchor, listener });
      }
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if ((window as any).__lenis) {
        delete (window as any).__lenis;
      }
      listeners.forEach(({ anchor, listener }) => {
        anchor.removeEventListener('click', listener);
      });
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
