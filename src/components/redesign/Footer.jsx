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
import {
  Send,
  Check,
  Truck,
  ShieldCheck,
  IndianRupee,
  ChevronDown,
  ArrowUp,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({
    shop: false,
    help: false,
    company: false,
    more: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const moreLinks = [
    { label: 'PC Builder', href: '/pc-builds' },
    { label: 'Refurbished Store', href: '/refurbished' },
    { label: 'Trade-In / Exchange', href: '/exchange' },
    { label: 'Repair Services', href: '/repairs' },
    { label: 'EMI Calculator', href: '/emi-calculator' },
    { label: 'Compare Products', href: '/compare' },
    { label: 'Student Discounts', href: '/students' },
  ];

  return (
    <footer className="w-full select-none">
      
      {/* =========================================================================
          DESKTOP & TABLET VIEW (md:block hidden)
          Matches desktop reference exactly: Clean cream upper, black statement banner,
          proper centered divider line, and zero dead space.
          ========================================================================= */}
      <div className="hidden md:block">
        
        {/* Upper Cream Section */}
        <div className="bg-[#F7F5F0] text-neutral-900 border-t border-neutral-200/80 pt-12 lg:pt-14 pb-12 lg:pb-14 relative overflow-hidden">
          
          {/* Top-Right Decorative Brand Corner Motif (Visible only on 2xl where ample margin exists to prevent text collision) */}
          <div className="absolute top-0 right-8 hidden 2xl:flex items-start gap-3 pointer-events-none select-none z-10 pt-4">
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

          <div className="max-w-[1480px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
              
              {/* Col 1: Brand Info */}
              <div className="col-span-4 lg:col-span-3 space-y-4">
                <Link href="/" className="inline-block">
                  <TecnoMartLogo textClass="text-neutral-950 font-black text-xl" subtitleClass="text-neutral-500 font-bold text-[8.5px]" />
                </Link>

                <div className="space-y-1.5 pt-1">
                  <h3 className="text-3xl font-black text-neutral-950 tracking-tight leading-[1.08]">
                    Better Tech<br />
                    for a Brighter<br />
                    <span className="font-serif italic font-normal text-neutral-900">Tomorrow.</span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-600 font-medium leading-relaxed max-w-xs pt-1">
                    Premium tech, expert support and unmatched value — all in one place.
                  </p>
                </div>

                {/* Social Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://instagram.com/tecnomart_hyd"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full border border-neutral-300 bg-white/80 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full border border-neutral-300 bg-white/80 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-full border border-neutral-300 bg-white/80 hover:border-amber-500 hover:bg-amber-500 text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all shadow-2xs"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/919010667726"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="w-10 h-10 rounded-full border border-neutral-300 bg-white/80 hover:border-emerald-500 hover:bg-emerald-500 text-neutral-800 hover:text-white flex items-center justify-center transition-all shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Col 2: SHOP */}
              <div className="col-span-2 space-y-3">
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

              {/* Col 3: HELP & SUPPORT */}
              <div className="col-span-2 space-y-3">
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

              {/* Col 4: COMPANY */}
              <div className="col-span-2 space-y-3">
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

              {/* Col 5: STAY UPDATED */}
              <div className="col-span-12 lg:col-span-3 space-y-4 lg:border-l lg:border-neutral-300/70 lg:pl-6 xl:pl-8">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-black tracking-widest text-neutral-900 uppercase">
                    STAY UPDATED
                  </p>
                  <h4 className="text-2xl font-black text-neutral-950 tracking-tight leading-tight mt-1">
                    New Tech.<br />
                    Better Deals<span className="text-amber-500">.</span>
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed pt-1">
                    Subscribe to get exclusive offers, new arrivals and tech insights.
                  </p>
                </div>

                {/* Email Input Pill */}
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
                      className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-black flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-xs"
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

                {/* 3 Trust Badges in a Row */}
                <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-bold text-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span className="whitespace-nowrap">Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span className="whitespace-nowrap">Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-neutral-900 flex-shrink-0" />
                    <span className="whitespace-nowrap">Best Value</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Middle Giant Statement Banner */}
        <div className="w-full bg-[#0a0a0a] text-white border-t border-neutral-900 overflow-hidden relative select-none">
          <div className="max-w-[1480px] mx-auto px-6 lg:px-8 py-5 sm:py-7 flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-6">
              <div className="flex items-baseline">
                <span className="font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[-0.03em] text-white uppercase font-sans leading-none">
                  TECNOMART
                </span>
                <span className="text-xl sm:text-2xl text-neutral-400 font-bold ml-1 self-start pt-1">
                  ®
                </span>
              </div>

              <div className="relative rotate-[-4deg] -mt-2">
                <div className="font-serif italic font-black text-amber-400 text-2xl lg:text-3xl leading-[1.05] drop-shadow-sm tracking-wide">
                  Tech<br />Lives Here
                </div>
                <div className="w-full space-y-0.5 mt-1">
                  <div className="h-[2.5px] bg-amber-400 rounded-full w-full" />
                  <div className="h-[2px] bg-amber-400/85 rounded-full w-4/5" />
                </div>
              </div>
            </div>

            <div className="text-right text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-neutral-400 space-y-1 flex-shrink-0">
              <p>PEOPLE</p>
              <p>PRODUCTS</p>
              <p>POSSIBILITIES</p>
              <div className="w-12 h-[1px] bg-neutral-700 ml-auto mt-2" />
            </div>

          </div>
        </div>

        {/* Desktop Bottom Bar (Proper level line, zero dead space, no dock) */}
        <div className="w-full bg-[#000000] text-neutral-400 border-t border-neutral-900/90 py-5">
          <div className="max-w-[1480px] mx-auto px-6 lg:px-8 flex items-center justify-between text-xs">
            <p className="text-neutral-400 font-medium whitespace-nowrap">
              © 2025 Tecno Mart. All Rights Reserved.
            </p>

            {/* Straight level horizontal divider connecting copyright to payments */}
            <div className="flex-1 h-[1px] bg-neutral-800/90 mx-6 self-center" />

            <div className="flex items-center gap-3 whitespace-nowrap flex-shrink-0">
              <span className="text-neutral-300 font-semibold text-xs">
                Secure Payments
              </span>
              <PaymentMethodsRow />
            </div>
          </div>
        </div>

      </div>


      {/* =========================================================================
          MOBILE VIEW (md:hidden block)
          Matches user uploaded Screenshot 3 pixel-for-pixel:
          - Cream upper container with curved yellow line in top-right
          - Brand + "Better Tech for a Brighter Tomorrow." + socials
          - STAY UPDATED section + email pill input
          - 3 trust badges in 3 columns divided by vertical lines
          - 4 clean accordions: SHOP, HELP & SUPPORT, COMPANY, MORE FROM TECNOMART
          - Giant TECNOMART® brand watermark in charcoal on cream background
          - Clean black bottom bar with copyright, vertical bar, payment cards,
            policy links, and round up-arrow scroll-to-top button.
          ========================================================================= */}
      <div className="block md:hidden">
        
        {/* Mobile Upper Cream Container */}
        <div className="bg-[#F7F5F0] text-neutral-900 border-t border-neutral-200/80 pt-8 pb-4 relative overflow-hidden px-5">
          
          {/* Top-Right Decorative Yellow Curve (Matching Screenshot 3) */}
          <div className="absolute top-0 right-0 pointer-events-none select-none w-32 h-56 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
              <path
                d="M 95,0 C 20,40 20,120 100,180"
                stroke="#F5B800"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Brand Logo */}
          <div className="relative z-10 space-y-3">
            <Link href="/" className="inline-block">
              <TecnoMartLogo
                textClass="text-neutral-950 font-black text-xl"
                subtitleClass="text-neutral-500 font-bold text-[8.5px]"
              />
            </Link>

            {/* Heading */}
            <div className="space-y-1 pt-1">
              <h3 className="text-3xl font-black text-neutral-950 tracking-tight leading-[1.12]">
                Better Tech<br />
                for a Brighter<br />
                <span className="font-serif italic font-normal text-neutral-900">Tomorrow.</span>
              </h3>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed pt-1 max-w-[280px]">
                Premium tech, expert support and unmatched value — all in one place.
              </p>
            </div>

            {/* 4 Circular Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/tecnomart_hyd"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-neutral-300 bg-white text-neutral-800 flex items-center justify-center shadow-xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-neutral-300 bg-white text-neutral-800 flex items-center justify-center shadow-xs"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-neutral-300 bg-white text-neutral-800 flex items-center justify-center shadow-xs"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919010667726"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-neutral-300 bg-white text-neutral-800 flex items-center justify-center shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* STAY UPDATED Section on Mobile (Directly beneath socials) */}
          <div className="mt-8 space-y-2">
            <p className="text-[10px] font-black tracking-widest text-neutral-900 uppercase">
              STAY UPDATED
            </p>
            <h4 className="text-2xl font-black text-neutral-950 tracking-tight leading-tight">
              New Tech. Better Deals<span className="text-amber-500">.</span>
            </h4>
            <p className="text-xs text-neutral-600 font-medium leading-relaxed">
              Subscribe to get exclusive offers, new arrivals and tech insights.
            </p>

            {/* Email Input Pill */}
            <form onSubmit={handleSubscribe} className="pt-2 w-full">
              <div className="relative flex items-center bg-white rounded-full border border-neutral-300 shadow-xs p-1 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-neutral-900 text-xs px-3.5 py-2 outline-none font-medium placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-black flex items-center justify-center flex-shrink-0 shadow-xs"
                >
                  {subscribed ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Send className="w-4 h-4 stroke-[2.2]" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold mt-1">
                  <Check className="w-3 h-3" /> Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

          {/* 3 Trust Badges with 2 Vertical Divider Lines (Matching Screenshot 3) */}
          <div className="grid grid-cols-3 border-y border-neutral-200/90 py-4 my-7 text-center divide-x divide-neutral-200/90">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-1">
              <Truck className="w-5 h-5 text-neutral-900 flex-shrink-0" />
              <div className="text-[11px] font-bold text-neutral-900 leading-tight">
                Official<br />Warranty
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-1">
              <ShieldCheck className="w-5 h-5 text-neutral-900 flex-shrink-0" />
              <div className="text-[11px] font-bold text-neutral-900 leading-tight">
                Secure<br />Payments
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-1">
              <IndianRupee className="w-5 h-5 text-neutral-900 flex-shrink-0" />
              <div className="text-[11px] font-bold text-neutral-900 leading-tight">
                Best<br />Value
              </div>
            </div>
          </div>

          {/* 4 Clean Accordions: SHOP, HELP & SUPPORT, COMPANY, MORE FROM TECNOMART */}
          <div className="divide-y divide-neutral-200/90 border-b border-neutral-200/90">
            
            {/* Accordion 1: SHOP */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('shop')}
                className="w-full flex items-center justify-between py-3.5 text-left text-xs font-black tracking-wider text-neutral-950 uppercase cursor-pointer"
              >
                <span>SHOP</span>
                <ChevronDown className={`w-4 h-4 text-neutral-800 transition-transform duration-200 ${openAccordions.shop ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.shop && (
                <ul className="pb-3.5 space-y-2 text-xs font-medium text-neutral-600 pl-1">
                  {shopLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-amber-600 transition-colors block py-0.5">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accordion 2: HELP & SUPPORT */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('help')}
                className="w-full flex items-center justify-between py-3.5 text-left text-xs font-black tracking-wider text-neutral-950 uppercase cursor-pointer"
              >
                <span>HELP &amp; SUPPORT</span>
                <ChevronDown className={`w-4 h-4 text-neutral-800 transition-transform duration-200 ${openAccordions.help ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.help && (
                <ul className="pb-3.5 space-y-2 text-xs font-medium text-neutral-600 pl-1">
                  {helpLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-amber-600 transition-colors block py-0.5">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accordion 3: COMPANY */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('company')}
                className="w-full flex items-center justify-between py-3.5 text-left text-xs font-black tracking-wider text-neutral-950 uppercase cursor-pointer"
              >
                <span>COMPANY</span>
                <ChevronDown className={`w-4 h-4 text-neutral-800 transition-transform duration-200 ${openAccordions.company ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.company && (
                <ul className="pb-3.5 space-y-2 text-xs font-medium text-neutral-600 pl-1">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-amber-600 transition-colors block py-0.5">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Accordion 4: MORE FROM TECNOMART */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('more')}
                className="w-full flex items-center justify-between py-3.5 text-left text-xs font-black tracking-wider text-neutral-950 uppercase cursor-pointer"
              >
                <span>MORE FROM TECNOMART</span>
                <ChevronDown className={`w-4 h-4 text-neutral-800 transition-transform duration-200 ${openAccordions.more ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.more && (
                <ul className="pb-3.5 space-y-2 text-xs font-medium text-neutral-600 pl-1">
                  {moreLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-amber-600 transition-colors block py-0.5">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* Giant TECNOMART® Text in Charcoal on Cream with Yellow "Tech Lives Here" Script (Matching Screenshot 3) */}
          <div className="relative pt-16 pb-0 select-none overflow-hidden">
            {/* Handwritten Yellow "Tech Lives Here" script nicely perched above the right side of TECNOMART */}
            <div className="absolute top-2 right-1 rotate-[-7deg] z-10 pointer-events-none">
              <div className="font-['Caveat',cursive] font-bold text-amber-500 text-[26px] leading-[0.92] drop-shadow-xs text-right tracking-wide">
                Tech<br />Lives Here
              </div>
              <div className="w-full space-y-0.5 mt-0.5 flex flex-col items-end">
                <div className="h-[2px] bg-amber-500 rounded-full w-[90%]" />
                <div className="h-[1.5px] bg-amber-500/80 rounded-full w-[75%]" />
              </div>
            </div>

            <div className="relative flex items-baseline">
              <span className="font-black text-[13.5vw] tracking-[-0.04em] text-neutral-800/90 uppercase font-sans leading-none block w-full whitespace-nowrap">
                TECNOMART
              </span>
              <span className="text-xs text-neutral-600 font-bold ml-0.5 self-start">
                ®
              </span>
            </div>
          </div>

        </div>

        {/* Mobile Black Bottom Bar (Matching Screenshot 3) */}
        <div className="bg-[#0e0f12] text-neutral-400 border-t border-neutral-900 pt-5 pb-20 px-5 space-y-4">
          
          {/* Row 1: Copyright, Vertical Bar, Secure Payments & Cards */}
          <div className="flex items-center justify-between text-xs">
            <div className="text-[11px] text-neutral-400 font-medium leading-tight">
              <p>© 2025 Tecno Mart.</p>
              <p>All Rights Reserved.</p>
            </div>

            {/* Vertical dividing line */}
            <div className="h-7 w-[1px] bg-neutral-700/80 mx-2 flex-shrink-0" />

            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-neutral-300 font-semibold whitespace-nowrap">
                Secure Payments
              </span>
              <PaymentMethodsRow />
            </div>
          </div>

          {/* Row 2: Policy Links and Circular Up-Arrow Button */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400 border-t border-neutral-900/80">
            <div className="flex items-center gap-2 font-medium">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>

            {/* Up-Arrow Scroll-to-Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

        </div>

      </div>

    </footer>
  );
}
