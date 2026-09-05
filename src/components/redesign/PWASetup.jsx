"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const DISMISSED_KEY = 'tecnomart-pwa-banner-dismissed';

export default function PWASetup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('[PWA] Service worker registration failed:', err);
      });
    }

    // Check if user already dismissed the banner
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted' || outcome === 'dismissed') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(DISMISSED_KEY, '1');
  };

  if (!showBanner || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 lg:hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 bg-midgrey-900 text-white rounded-2xl px-4 py-3 shadow-2xl border border-midgrey-700/60">
        <div className="flex-shrink-0">
          <Image
            src="/icon-maskable-192.png"
            alt="TecnoMart"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-cover"
          />
        </div>
        <p className="flex-1 text-sm font-semibold leading-tight">
          Add TecnoMart to Home Screen
        </p>
        <button
          onClick={handleInstall}
          className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 text-xs font-black uppercase tracking-wide px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
