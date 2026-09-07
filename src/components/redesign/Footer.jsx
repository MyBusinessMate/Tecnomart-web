"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TecnoMartLogo,
  PaymentMethodsRow,
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from './Icons';
import { Send, Check, Truck, ShieldCheck, IndianRupee } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const shopLinks = [
    { label: 'Flash Deals', href: '/deals' },
    { label: 'Mobiles', href: '/mobiles' },
    { label: 'Laptops', href: '/laptops' },
    { label: 'Gaming PCs', href: '/gaming' },
    { label: 'PC Builder', href: '/pc-builds' },
    { label: 'Refurbished', href: '/refurbished' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Trade-In / Exchange', href: '/exchange' },
  ];

  const helpLinks = [
    { label: 'Repairs', href: '/repairs' },
    { label: 'EMI Calculator', href: '/emi-calculator' },
    { label: 'Compare Products', href: '/compare' },
    { label: 'Student Discount', href: '/students' },
    { label: 'Returns & Refunds', href: '/terms' },
    { label: 'Warranty Info', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Help Centre', href: '/contact' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Stores', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Corporate Sales', href: '/corporate' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Blog', href: '/deals' },
    { label: 'Store Locator', href: '/contact' },
  ];

  return (
    <footer className="w-full select-none">
      
      {/* =========================================================================
          TOP SECTION: WARM CREAM / OFF-WHITE BACKGROUND MATCHING REFERENCE IMAGE
          ========================================================================= */}
      <div className="bg-[#F7F5F0] text-neutral-900 border-t border-neutral-200/80 pt-12 sm:pt-14 pb-12 sm:pb-14 relative overflow-hidden">
        
        {/* Top-Right Decorative Brand Corner Motif (matches reference image exactly) */}
        <div className="absolute top-0 right-4 sm:right-8 lg:right-12 hidden xl:flex items-start gap-3 pointer-events-none select-none z-10 pt-4">
          <svg className="w-16 h-28 text-amber-500 stroke-current fill-none stroke-[2.5]" viewBox="0 0 60 110">
            <path d="M 55,0 C 10,20 10,60 55,100" />
          </svg>
          <div className="text-left text-[9px] font-black uppercase tracking-[0.22em] text-neutral-800 space-y-0.5 pt-3">
            <p>SHOP</p>
            <p>REPAIR</p>
            <p>UPGRADE</p>
            <p>REPEAT</p>
            <div className="w-6 h-[1.5px] bg-neutral-500 mt-1.5" />
          </div>
        </div>

        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8">

            {/* Col 1: Brand + Headline + Description + Socials (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <Link href="/" className="inline-block">
                <TecnoMartLogo textClass="text-neutral-950 font-black text-xl" subtitleClass="text-neutral-500 font-bold text-[8.5px]" />
              </Link>

              <div className="space-y-1.5 pt-1">
                <h3 className="text-3xl sm:text-[34px] font-black text-neutral-950 tracking-tight leading-[1.08]">
                  Better Tech<br />
                  for a Brighter<br />
                  <span className="font-serif italic font-normal text-neutral-900">Tomorrow.</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 font-medium leading-relaxed max-w-xs pt-1">
                  Premium tech, expert support and unmatched value — all in one place.
                </p>
              </div>

              {/* Social Icons (Outlined Round Buttons) */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/tecnomart_hyd"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919010667726"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-neutral-300 bg-white/70 hover:border-emerald-500 hover:bg-emerald-500 text-neutral-800 hover:text-white flex items-center justify-center transition-all shadow-2xs"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: SHOP (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <h4 className="text-xs font-black tracking-wider text-neutral-950 uppercase">
                  SHOP
                </h4>
                <div className="w-8 h-[2.5px] bg-amber-500 rounded-full mt-1 mb-3" />
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-neutral-600">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-amber-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: HELP & SUPPORT (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <h4 className="text-xs font-black tracking-wider text-neutral-950 uppercase">
                  HELP &amp; SUPPORT
                </h4>
                <div className="w-8 h-[2.5px] bg-amber-500 rounded-full mt-1 mb-3" />
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-neutral-600">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-amber-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: COMPANY (Span 2) */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <h4 className="text-xs font-black tracking-wider text-neutral-950 uppercase">
                  COMPANY
                </h4>
                <div className="w-8 h-[2.5px] bg-amber-500 rounded-full mt-1 mb-3" />
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-neutral-600">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-amber-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: STAY UPDATED (Span 3 with subtle vertical divider) */}
            <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-neutral-300/70 lg:pl-6 xl:pl-8">
              <div>
                <p className="text-[10px] sm:text-[11px] font-black tracking-widest text-neutral-900 uppercase">
                  STAY UPDATED
                </p>
                <h4 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight leading-tight mt-1">
                  New Tech.<br />
                  Better Deals<span className="text-amber-500">.</span>
                </h4>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed pt-1">
                  Subscribe to get exclusive offers, new arrivals and tech insights.
                </p>
              </div>

              {/* White Pill Subscription Bar */}
              <form onSubmit={handleSubscribe} className="w-full">
                <div className="relative flex items-center bg-white rounded-full border border-neutral-300 shadow-xs p-1 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-w-0 bg-transparent text-neutral-900 text-xs sm:text-sm px-3.5 py-2 outline-none font-medium placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-black flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-xs"
                  >
                    {subscribed ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Send className="w-4 h-4 stroke-[2.2]" />}
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold mt-1.5">
                    <Check className="w-3 h-3" /> Thank you for subscribing!
                  </p>
                )}
              </form>

              {/* 3 Trust Indicator Badges */}
              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 text-[11px] font-bold text-neutral-800">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                  <span className="whitespace-nowrap">Official Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                  <span className="whitespace-nowrap">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                  <span className="whitespace-nowrap">Best Value</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          MIDDLE GIANT STATEMENT BANNER (BLACK BACKGROUND)
          ========================================================================= */}
      <div className="w-full bg-[#0a0a0a] text-white border-t border-neutral-900 overflow-hidden relative select-none">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left/Center: Huge TECNOMART® with yellow handwritten script */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
            <div className="flex items-baseline">
              <span className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.03em] text-white uppercase font-sans leading-none">
                TECNOMART
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl text-neutral-400 font-bold ml-1 self-start pt-1">
                ®
              </span>
            </div>

            {/* Yellow handwritten brush script "Tech Lives Here" */}
            <div className="relative rotate-[-4deg] -mt-1 sm:-mt-2">
              <div className="font-serif italic font-black text-amber-400 text-2xl sm:text-3xl md:text-4xl leading-[1.05] drop-shadow-sm tracking-wide">
                Tech<br />Lives Here
              </div>
              {/* Underline brush strokes */}
              <div className="w-full space-y-0.5 mt-1">
                <div className="h-[2.5px] bg-amber-400 rounded-full w-full" />
                <div className="h-[2px] bg-amber-400/85 rounded-full w-4/5" />
              </div>
            </div>
          </div>

          {/* Right: PEOPLE PRODUCTS POSSIBILITIES */}
          <div className="text-center md:text-right text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-neutral-400 space-y-1 flex-shrink-0">
            <p>PEOPLE</p>
            <p>PRODUCTS</p>
            <p>POSSIBILITIES</p>
            <div className="w-12 h-[1px] bg-neutral-700 ml-auto hidden md:block mt-2" />
          </div>

        </div>
      </div>

      {/* =========================================================================
          BOTTOM BAR: PURE BLACK BACKGROUND, COPYRIGHT, DIVIDER & PAYMENT BADGES
          ========================================================================= */}
      <div className="w-full bg-[#000000] text-neutral-400 border-t border-neutral-900/90 pt-5 pb-20 sm:pb-24">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <p className="text-neutral-400 font-medium whitespace-nowrap">
            © 2025 Tecno Mart. All Rights Reserved.
          </p>

          {/* Thin horizontal divider line */}
          <div className="hidden md:block flex-1 h-[1px] bg-neutral-800/90 mx-6" />

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-300 font-semibold text-xs whitespace-nowrap">
              Secure Payments
            </span>
            <PaymentMethodsRow />
          </div>

        </div>
      </div>

    </footer>
  );
}
