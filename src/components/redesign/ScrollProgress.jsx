"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Gold Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-midgrey-900/90 text-amber-400 border border-midgrey-700 shadow-xl flex items-center justify-center backdrop-blur-sm hover:bg-amber-500 hover:text-midgrey-950 transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
