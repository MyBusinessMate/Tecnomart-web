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
import { Send, Check } from 'lucide-react';

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
    { label: '⚡ Flash Deals', href: '/deals' },
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
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Stores', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Corporate Sales', href: '/corporate' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="relative overflow-hidden bg-midgrey-900 text-neutral-300 border-t border-midgrey-700/60">
      
      {/* Huge Subtle Emblem Watermark on Far-Right Background matching reference image */}
      <div className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 flex items-center justify-end pr-4 pointer-events-none select-none opacity-15">
        <img src="/logo.png" alt="TecnoMart Watermark" className="w-full h-auto object-contain filter drop-shadow-2xl" />
      </div>

      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">

        {/* Footer Grid: Brand (full width) | Shop (col 1) | Help (col 2) | Company (col 1) | Stay Updated (full width) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6 pb-10 border-b border-midgrey-700/60">

          {/* Column 1: Brand + Description + Social Icons */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/">
              <TecnoMartLogo textClass="text-white" subtitleClass="text-neutral-500" />
            </Link>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-sm">
              Your one-stop destination for the best tech products, expert repairs and unmatched support.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-neutral-700 hover:border-amber-500 hover:bg-amber-500 flex items-center justify-center transition-colors text-neutral-300 hover:text-neutral-950"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/tecnomart_hyd"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-neutral-700 hover:border-amber-500 hover:bg-amber-500 flex items-center justify-center transition-colors text-neutral-300 hover:text-neutral-950"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-neutral-700 hover:border-amber-500 hover:bg-amber-500 flex items-center justify-center transition-colors text-neutral-300 hover:text-neutral-950"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/919010667726"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-neutral-700 hover:border-emerald-500 hover:bg-emerald-500 flex items-center justify-center transition-colors text-neutral-300 hover:text-white"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="col-span-1 space-y-3">
            <h5 className="text-xs font-black tracking-wider text-amber-500 uppercase">
              SHOP
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: HELP & SUPPORT */}
          <div className="col-span-1 space-y-3">
            <h5 className="text-xs font-black tracking-wider text-amber-500 uppercase">
              HELP &amp; SUPPORT
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="col-span-1 space-y-3">
            <h5 className="text-xs font-black tracking-wider text-amber-500 uppercase">
              COMPANY
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: STAY UPDATED */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-3">
            <h5 className="text-xs font-black tracking-wider text-amber-500 uppercase">
              STAY UPDATED
            </h5>
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              Subscribe to get exclusive offers, new arrivals and tech updates.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="relative flex items-center overflow-hidden rounded-xl bg-white p-0.5 border border-neutral-700">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-neutral-900 text-xs px-3 py-2.5 outline-none font-bold placeholder-neutral-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 font-black flex items-center justify-center transition-colors cursor-pointer rounded-lg flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold mt-1.5">
                  <Check className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© 2025 Tecno Mart. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">Secure Payments</span>
            <PaymentMethodsRow />
          </div>
        </div>

      </div>
    </footer>
  );
}
