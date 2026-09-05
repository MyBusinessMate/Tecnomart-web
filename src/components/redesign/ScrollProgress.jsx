import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100/50 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
