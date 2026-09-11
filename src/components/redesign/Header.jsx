"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TecnoMartLogo } from './Icons';
import { useShop } from '@/context/ShopContext';
import { ALL_PRODUCTS } from '@/data/products';
import {
  Search,
  ShoppingBag,
  Wrench,
  Menu,
  X,
  ChevronRight,
  MapPin,
  User,
  ChevronDown,
  Sparkles,
  Cpu,
  Headphones,
  Smartphone,
  Laptop,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Layers,
  PhoneCall,
  BadgePercent,
  CircleHelp,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    locationPincode,
    changePincode,
    setIsRepairOpen,
  } = useShop();

  const [searchCategory, setSearchCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [pincodeModalOpen, setPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(locationPincode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [activeNavDropdown, setActiveNavDropdown] = useState(null); // 'laptops' | 'mobiles' | 'accessories' | 'support' | null
  const [signInAlert, setSignInAlert] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    laptops: false,
    mobiles: false,
    gaming: false,
    accessories: false,
    repairs: false,
    support: false,
  });

  const toggleCategoryDropdown = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Refs for focus and dismissal
  const hamburgerBtnRef = useRef(null);
  const deliverToBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const pincodeModalRef = useRef(null);
  const accountBtnRef = useRef(null);

  const pathname = usePathname();

  // Non-sticky navbar: hides while scrolling, reveals 0.5s after scroll stops
  const [navVisible, setNavVisible] = useState(true);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show immediately when at the very top of the page
      if (currentScrollY <= 15) {
        setNavVisible(true);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        return;
      }

      // Hide while actively scrolling (non-sticky behavior)
      setNavVisible(false);

      // Re-appear smoothly 0.5s (500ms) after user stops scrolling
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setNavVisible(true);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setSearchOpen(false);
    setAccountDropdownOpen(false);
    setActiveNavDropdown(null);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  // Focus trap and ESC key for drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusables = () =>
      Array.from(drawer.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));

    const first = getFocusables()[0];
    first?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        hamburgerBtnRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === focusables[0]) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        focusables[0].focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [drawerOpen]);

  // Close account dropdown on outside click or Escape
  useEffect(() => {
    if (!accountDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (accountBtnRef.current && !accountBtnRef.current.closest('[data-account-menu]')?.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setAccountDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [accountDropdownOpen]);

  // Filter search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const matchesCategory =
        searchCategory === 'All' ||
        (searchCategory === 'Mobiles' && p.type === 'mobiles') ||
        (searchCategory === 'Laptops' && p.type === 'laptops') ||
        (searchCategory === 'Gaming' && p.type === 'gaming') ||
        (searchCategory === 'Accessories' && p.type === 'accessories');

      const matchesQuery =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    }).slice(0, 6);
  }, [searchQuery, searchCategory]);

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const cleanDigits = tempPincode.replace(/\D/g, '');
    if (cleanDigits.length === 6) {
      changePincode(cleanDigits);
      setPincodeModalOpen(false);
    }
  };

  const repairTriggerHandler = () => setIsRepairOpen(true);

  // Dropdown categories data for desktop navigation
  const navDropdownData = {
    laptops: [
      { name: 'MacBooks & Ultrabooks', href: '/laptops?brand=Apple' },
      { name: 'Gaming Laptops', href: '/laptops?choice=popular' },
      { name: 'Creator Laptops', href: '/laptops?choice=best' },
      { name: 'Refurbished Laptops', href: '/laptops?choice=refurbished' },
      { name: 'Dell & Lenovo Laptops', href: '/laptops?brand=Dell' },
      { name: 'View All Laptops', href: '/laptops', isAll: true },
    ],
    mobiles: [
      { name: 'Apple iPhones', href: '/mobiles?brand=Apple' },
      { name: 'Samsung Galaxy Series', href: '/mobiles?brand=Samsung' },
      { name: 'Flagship Smartphones', href: '/mobiles?choice=best' },
      { name: 'Refurbished Mobiles', href: '/mobiles?choice=refurbished' },
      { name: 'OnePlus & Google Pixel', href: '/mobiles?brand=OnePlus' },
      { name: 'View All Mobiles', href: '/mobiles', isAll: true },
    ],
    accessories: [
      { name: 'Fast Chargers & GaN Plugs', href: '/accessories?brand=Anker' },
      { name: 'Audio & ANC Headphones', href: '/accessories?brand=Sony' },
      { name: 'Mechanical Keyboards & Mice', href: '/accessories?brand=Logitech' },
      { name: 'Apple Accessories', href: '/accessories?brand=Apple' },
      { name: 'Trending & Popular Tech', href: '/accessories?choice=popular' },
      { name: 'View All Accessories', href: '/accessories', isAll: true },
    ],
    support: [
      { name: 'PC Builder & Configurator', href: '/pc-builds', isHighlight: true, desc: 'Build your custom rig with live pricing' },
      { name: 'Certified Repairs & Service', href: '/repairs', desc: 'Doorstep pickup & expert diagnostics' },
      { name: 'EMI Calculator', href: '/emi-calculator', desc: 'Calculate No-Cost & Low-Cost EMIs' },
      { name: 'Compare Devices', href: '/compare', desc: 'Side-by-side specs comparison' },
      { name: 'Store Location & Contact', href: '/contact', desc: '7 Tombs Rd, Tolichowki store' },
    ],
  };

  // Full departments list for the All Categories Drawer
  const drawerDepartments = [
    {
      id: 'laptops',
      title: 'Laptops & MacBooks',
      href: '/laptops',
      icon: Laptop,
      items: [
        { name: 'All Laptops', href: '/laptops' },
        { name: 'Apple MacBooks (M3 / Pro / Air)', href: '/laptops?brand=Apple' },
        { name: 'High-End Gaming Laptops', href: '/laptops?choice=popular' },
        { name: 'Creator & Workstation Laptops', href: '/laptops?choice=best' },
        { name: 'Certified Refurbished Laptops', href: '/laptops?choice=refurbished' },
      ],
    },
    {
      id: 'mobiles',
      title: 'Mobiles & Smartphones',
      href: '/mobiles',
      icon: Smartphone,
      items: [
        { name: 'All Mobiles', href: '/mobiles' },
        { name: 'Apple iPhones (16 Pro / 15 Series)', href: '/mobiles?brand=Apple' },
        { name: 'Samsung Galaxy Flagships', href: '/mobiles?brand=Samsung' },
        { name: 'Refurbished Mobiles with Warranty', href: '/mobiles?choice=refurbished' },
        { name: 'Top Rated Flagships', href: '/mobiles?choice=best' },
      ],
    },
    {
      id: 'gaming',
      title: 'PC Builder & Gaming',
      href: '/pc-builds',
      icon: Cpu,
      items: [
        { name: 'Custom PC Builder & Configurator', href: '/pc-builds' },
        { name: 'Pre-Built Gaming Rigs', href: '/gaming' },
        { name: 'Custom Liquid Cooled PCs', href: '/pc-builds' },
        { name: 'Gaming Accessories', href: '/accessories' },
      ],
    },
    {
      id: 'accessories',
      title: 'Accessories & Audio',
      href: '/accessories',
      icon: Headphones,
      items: [
        { name: 'All Accessories', href: '/accessories' },
        { name: 'Fast Chargers, Adapters & Cables', href: '/accessories' },
        { name: 'ANC Headphones & True Wireless Audio', href: '/accessories' },
        { name: 'Mechanical Keyboards & Gaming Mice', href: '/accessories' },
        { name: 'Laptop Stands, Sleeves & Mats', href: '/accessories' },
      ],
    },
    {
      id: 'repairs',
      title: 'Repairs & Services',
      href: '/repairs',
      icon: Wrench,
      items: [
        { name: 'Screen Replacement', href: '/repairs' },
        { name: 'Battery Replacement', href: '/repairs' },
        { name: 'SSD & RAM Upgrades', href: '/repairs' },
        { name: 'OS & Software Diagnostics', href: '/repairs' },
        { name: 'Motherboard Chip-Level Repair', href: '/repairs' },
      ],
    },
    {
      id: 'support',
      title: 'Customer Services & Tools',
      href: '/contact',
      icon: Layers,
      items: [
        { name: 'PC Builder Configurator', href: '/pc-builds' },
        { name: 'EMI Calculator', href: '/emi-calculator' },
        { name: 'Device Comparison Tool', href: '/compare' },
        { name: 'Student Discount Program', href: '/students' },
        { name: 'Corporate & Bulk Enquiries', href: '/corporate' },
        { name: 'Contact Us & Store Timings', href: '/contact' },
      ],
    },
  ];

  const isNavRevealed = navVisible || drawerOpen || searchOpen || accountDropdownOpen || activeNavDropdown !== null;

  return (
    <>
    <header
      role="banner"
      className={`sticky top-0 z-50 select-none shadow-md font-sans bg-[#0a0a0a] ${
        isNavRevealed ? 'translate-y-0' : 'max-lg:translate-y-0 lg:-translate-y-full lg:pointer-events-none'
      } lg:transition-transform lg:duration-300 lg:ease-in-out`}
    >
      
      {/* =========================================================================
          1. DESKTOP NAVIGATION BAR (>= 1024px)
          Order: Hamburger (☰) → TecnoMart Logo → Laptops → Mobiles → Accessories → Support (with PC Builder) → Search → Account → Cart
          ========================================================================= */}
      <div className="hidden lg:flex max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between gap-4 xl:gap-6">
        
        {/* Left Section: Hamburger + Brand Logo */}
        <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
          {/* Hamburger Menu Icon (☰) to open All Categories Drawer */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open All Categories Menu"
            aria-expanded={drawerOpen}
            className="p-2 text-white hover:text-amber-400 hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            title="All Categories"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* TecnoMart Logo & Branding */}
          <Link href="/" className="inline-block">
            <TecnoMartLogo textClass="text-white font-black" subtitleClass="text-neutral-200 font-semibold" />
          </Link>
        </div>

        {/* Primary Desktop Nav Links (Laptops, Mobiles, Accessories, Support with PC Builder) */}
        <nav aria-label="Main Navigation" className="flex items-center gap-4 xl:gap-6 text-sm font-semibold text-white">
          
          {/* Laptops Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveNavDropdown('laptops')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <Link
              href="/laptops"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium"
            >
              <span>Laptops</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
            </Link>

            {activeNavDropdown === 'laptops' && (
              <div className="absolute left-0 top-full mt-1 w-60 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.laptops.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      item.isAll
                        ? 'text-amber-600 hover:bg-amber-50 font-bold border-t border-neutral-100 mt-1 pt-2'
                        : 'text-neutral-700 hover:text-amber-600 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobiles Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveNavDropdown('mobiles')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <Link
              href="/mobiles"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium"
            >
              <span>Mobiles</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
            </Link>

            {activeNavDropdown === 'mobiles' && (
              <div className="absolute left-0 top-full mt-1 w-60 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.mobiles.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      item.isAll
                        ? 'text-amber-600 hover:bg-amber-50 font-bold border-t border-neutral-100 mt-1 pt-2'
                        : 'text-neutral-700 hover:text-amber-600 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Accessories Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveNavDropdown('accessories')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <Link
              href="/accessories"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium"
            >
              <span>Accessories</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
            </Link>

            {activeNavDropdown === 'accessories' && (
              <div className="absolute left-0 top-full mt-1 w-60 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.accessories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      item.isAll
                        ? 'text-amber-600 hover:bg-amber-50 font-bold border-t border-neutral-100 mt-1 pt-2'
                        : 'text-neutral-700 hover:text-amber-600 hover:bg-neutral-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Support Dropdown (Contains PC Builder per Req 13) */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveNavDropdown('support')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={activeNavDropdown === 'support'}
              aria-controls="support-dropdown-menu"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium text-white"
            >
              <span>Support</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
            </button>

            {activeNavDropdown === 'support' && (
              <div id="support-dropdown-menu" aria-label="Support & tools menu" className="absolute left-0 top-full mt-1 w-72 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {/* Highlighted PC Builder Item */}
                <Link
                  href="/pc-builds"
                  className="flex items-start gap-2.5 px-3 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl transition-all border border-amber-400/30 group"
                >
                  <Cpu className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-black text-neutral-950 group-hover:text-amber-600">
                      PC Builder
                    </p>
                    <p className="text-[10px] text-neutral-600">
                      Custom PC Configurator &amp; Live Estimator
                    </p>
                  </div>
                </Link>

                {navDropdownData.support.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 rounded-xl transition-all"
                  >
                    <p className="font-bold text-neutral-900">{item.name}</p>
                    {item.desc && <p className="text-[10px] text-neutral-400 font-normal">{item.desc}</p>}
                  </Link>
                ))}
              </div>
            )}
          </div>

        </nav>

        {/* Center-Right Search Bar */}
        <div className="flex-1 max-w-sm xl:max-w-md relative">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-neutral-500">
              <Search className="w-4 h-4 stroke-[2]" />
            </div>
            <label htmlFor="search-desktop" className="sr-only">
              Search TecnoMart
            </label>
            <input
              id="search-desktop"
              type="search"
              placeholder="Search for MacBooks, iPhones, laptops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="w-full h-11 pl-11 pr-4 bg-white/95 focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-500 rounded-full border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all font-medium shadow-inner"
            />
          </div>

          {/* Instant Search Results Dropdown */}
          {searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 overflow-hidden z-50 p-2 text-neutral-900">
              <div className="px-3 py-1.5 text-[10px] font-black uppercase text-neutral-400 border-b border-neutral-100 flex justify-between">
                <span>Matching Products</span>
                <span>{searchResults.length} Found</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-500">
                  No matching products found for "{searchQuery}"
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={item.type === 'mobiles' ? `/mobiles/${item.slug || item.id}` : (item.type === 'laptops' ? `/laptops/${item.slug || item.id}` : `/products/${item.id}`)}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-xl transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center p-1 flex-shrink-0">
                        <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-600 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {item.tagline || item.brand}
                        </p>
                      </div>
                      <span className="text-xs font-black text-neutral-900 flex-shrink-0">
                        ₹{(item.rawPrice || item.priceINR)?.toLocaleString('en-IN') || item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Account Dropdown & Cart */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* USER ACCOUNT DROPDOWN */}
          <div className="relative" data-account-menu>
            <button
              ref={accountBtnRef}
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors p-1.5 rounded-xl hover:bg-white/10 cursor-pointer"
              aria-label="User Account"
              aria-haspopup="true"
              aria-expanded={accountDropdownOpen}
              aria-controls="desktop-account-menu"
            >
              <User className="w-5 h-5 text-white" />
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300" />
            </button>

            {accountDropdownOpen && (
              <div id="desktop-account-menu" aria-label="User Account Menu" className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-bold text-neutral-900">My Account</p>
                  <p className="text-[11px] text-neutral-600 truncate">user@tecnomart.in</p>
                </div>

                <div className="space-y-0.5 text-xs font-medium text-neutral-700">
                  <Link
                    href="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
                  >
                    <span>Edit Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    <span>Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>

                  <Link
                    href="/orders"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
                  >
                    <span>My Orders</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setPincodeModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    <span>Saved Addresses ({locationPincode})</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        setSignInAlert(true);
                        setTimeout(() => setSignInAlert(false), 3000);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <span>Sign In / Sign Out</span>
                    </button>
                  </div>
                </div>

                {signInAlert && (
                  <p role="status" className="text-[10px] text-emerald-600 text-center py-1 font-semibold">
                    Auth session updated!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CART BUTTON WITH BADGE */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-white group cursor-pointer"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <div className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
              Cart
            </span>
          </Link>

        </div>
      </div>

      {/* =========================================================================
          2. MOBILE NAVIGATION HEADER (< 1024px)
          Exact Layout from Req 14 & Reference Image:
          - Left: Hamburger Menu (☰) + Account Icon
          - Center: TecnoMart Logo & Branding (Visually centered, no account/cart flanking it)
          - Right: Cart Icon
          ========================================================================= */}
      <div className="lg:hidden relative flex items-center justify-between h-11 sm:h-12 px-3 sm:px-4">
        
        {/* Left Side: Hamburger Menu + Account */}
        <div className="flex items-center gap-1 z-10 min-w-[60px]">
          {/* Hamburger Menu button */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center text-white hover:text-amber-400 active:scale-95 cursor-pointer rounded-lg"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Account button */}
          <button
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            aria-label="User Account"
            aria-haspopup="dialog"
            aria-expanded={accountDropdownOpen}
            aria-controls="mobile-account-popover"
            className="w-10 h-10 flex items-center justify-center text-white hover:text-amber-400 active:scale-95 cursor-pointer rounded-lg"
          >
            <User className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Center: TecnoMart Branding strictly centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
          <Link href="/" className="flex flex-col items-center justify-center">
            <TecnoMartLogo className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5" textClass="text-white font-black text-xs sm:text-sm" subtitleClass="text-neutral-200 font-semibold text-[6.5px] sm:text-[7.5px]" />
          </Link>
        </div>

        {/* Right Side: Cart with item badge */}
        <div className="flex items-center justify-end z-10 min-w-[60px]">
          <Link
            href="/cart"
            className="w-10 h-10 flex items-center justify-center text-white hover:text-amber-300 active:scale-95 relative cursor-pointer"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Account Popover when clicked on mobile */}
      {accountDropdownOpen && (
        <div
          id="mobile-account-popover"
          role="dialog"
          aria-label="User Account Settings"
          className="lg:hidden bg-white text-neutral-900 border-t border-neutral-200 px-4 py-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div>
              <p className="text-xs font-bold text-neutral-900">Signed In Account</p>
              <p className="text-[11px] text-neutral-500">user@tecnomart.in</p>
            </div>
            <button
              onClick={() => setAccountDropdownOpen(false)}
              aria-label="Close account menu"
              className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
            <Link
              href="/orders"
              onClick={() => setAccountDropdownOpen(false)}
              className="p-2 bg-neutral-50 rounded-lg text-neutral-800 hover:bg-neutral-100"
            >
              My Orders
            </Link>
            <button
              onClick={() => {
                setAccountDropdownOpen(false);
                setIsWishlistOpen(true);
              }}
              className="p-2 bg-neutral-50 rounded-lg text-neutral-800 hover:bg-neutral-100 text-left"
            >
              Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => {
                setAccountDropdownOpen(false);
                setPincodeModalOpen(true);
              }}
              className="p-2 bg-neutral-50 rounded-lg text-neutral-800 hover:bg-neutral-100 text-left"
            >
              Pin ({locationPincode})
            </button>
            <button
              onClick={() => {
                setAccountDropdownOpen(false);
                setSignInAlert(true);
                setTimeout(() => setSignInAlert(false), 3000);
              }}
              className="p-2 bg-red-50 text-red-600 rounded-lg text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Mobile Search Bar below mobile header */}
      <div className="lg:hidden px-3 py-1.5 bg-[#141414]">
        <div className="relative flex items-center">
          <div className="absolute left-3 pointer-events-none text-neutral-400">
            <Search className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <label htmlFor="search-mobile" className="sr-only">Search TecnoMart</label>
          <input
            id="search-mobile"
            type="search"
            placeholder="Search for MacBooks, iPhones, laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-8.5 pr-3 bg-white/95 focus:bg-white text-[11px] sm:text-xs text-neutral-900 rounded-full border border-white/20 outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>
    </header>

    {/* =========================================================================
        3. ALL CATEGORIES NAVIGATION DRAWER (Rendered in Portal directly on body)
        Mounted outside <header> so CSS transforms never trap or cut off drawer
        ========================================================================= */}
    {mounted && typeof document !== 'undefined' && createPortal(
      <>
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-neutral-950/75 backdrop-blur-xs flex justify-start"
              onClick={() => setDrawerOpen(false)}
            >
            <motion.div
              ref={drawerRef}
              data-lenis-prevent="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="All Categories & Services"
              className="w-full max-w-[380px] sm:max-w-[400px] bg-white text-neutral-900 h-full shadow-2xl flex flex-col justify-between overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 overscroll-contain">
                
                {/* Drawer Header (Solid Black, Clean Branding + Close X) */}
                <div className="bg-black text-white px-5 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
                  <div className="flex items-center gap-2">
                    <TecnoMartLogo
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      textClass="text-white font-black text-sm sm:text-base tracking-wider"
                      subtitleClass="text-neutral-400 font-bold text-[8px] sm:text-[8.5px] tracking-[0.16em]"
                      highlightClass="text-amber-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      hamburgerBtnRef.current?.focus();
                    }}
                    aria-label="Close menu"
                    className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Delivery Location Strip */}
                <div className="px-5 py-3.5 bg-white border-b border-neutral-100 flex items-center justify-between">
                  <div
                    onClick={() => {
                      setDrawerOpen(false);
                      setPincodeModalOpen(true);
                    }}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <MapPin className="w-5 h-5 text-amber-500 fill-amber-500/15 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        DELIVER TO
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                        Hyderabad {locationPincode}
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-600" />
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-6 w-px bg-neutral-200 mx-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerOpen(false);
                        setPincodeModalOpen(true);
                      }}
                      className="text-xs sm:text-sm font-bold text-amber-500 hover:text-amber-600 cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Section 1: SHOP DEPARTMENTS & SERVICES (Clean Flat List Rows - No Cards!) */}
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
                      SHOP DEPARTMENTS &amp; SERVICES
                    </span>
                    <div className="h-px bg-neutral-200 flex-1" />
                  </div>

                  <div className="space-y-0.5">
                    {drawerDepartments.map((dept) => {
                      const isExpanded = !!expandedCategories[dept.id];
                      const DeptIcon = dept.icon;

                      return (
                        <div key={dept.id} className="border-b border-transparent">
                          <div className="flex items-center justify-between py-3 hover:bg-neutral-50 px-1 rounded-lg transition-colors group">
                            <Link
                              href={dept.href}
                              onClick={() => setDrawerOpen(false)}
                              className="flex items-center gap-3.5 flex-1 min-w-0"
                            >
                              <DeptIcon className="w-5 h-5 text-amber-500 stroke-[2] flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="text-xs sm:text-sm font-black text-neutral-900 uppercase tracking-wide truncate group-hover:text-amber-600 transition-colors">
                                {dept.title}
                              </span>
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategoryDropdown(dept.id);
                              }}
                              aria-label={`Toggle ${dept.title} subcategories`}
                              aria-expanded={isExpanded}
                              className="p-1 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-transform"
                            >
                              <ChevronRight
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90 text-amber-500' : 'text-neutral-400'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Clean indented sub-items if expanded */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="overflow-hidden pl-9 pr-2 pb-2 space-y-1"
                              >
                                {dept.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center justify-between py-1.5 px-2 text-xs font-semibold text-neutral-600 hover:text-amber-600 hover:bg-neutral-50 rounded-md transition-colors"
                                  >
                                    <span>{subItem.name}</span>
                                    <ChevronRight className="w-3 h-3 text-neutral-300" />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section Divider */}
                <div className="w-full px-5 py-1">
                  <div className="w-full h-px bg-neutral-200" />
                </div>

                {/* Section 2: Secondary Navigation Items */}
                <div className="px-5 py-2 space-y-0.5">
                  {/* Offers & Deals */}
                  <Link
                    href="/deals"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2.5 px-1 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <BadgePercent className="w-4.5 h-4.5 text-neutral-600 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                        Offers &amp; Deals
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {/* Help & Support */}
                  <Link
                    href="/contact"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2.5 px-1 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <CircleHelp className="w-4.5 h-4.5 text-neutral-600 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                        Help &amp; Support
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {/* Track Order */}
                  <Link
                    href="/cart"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2.5 px-1 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <FileText className="w-4.5 h-4.5 text-neutral-600 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                        Track Order
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {/* My Account */}
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      setAccountDropdownOpen(true);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-1 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <User className="w-4.5 h-4.5 text-neutral-600 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                        My Account
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

              </div>

              {/* Drawer Bottom Actions: Yellow Book a Repair Appointment Button with Watermark */}
              <div className="p-4 sm:p-5 bg-white relative overflow-hidden border-t border-neutral-100 flex-shrink-0">
                {/* Subtle brand watermark graphic in bottom-right corner matching screenshot */}
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.06] translate-x-3 translate-y-3">
                  <svg width="130" height="130" viewBox="0 0 100 100" fill="currentColor" className="text-amber-500">
                    <path d="M15 15 H85 V38 H58 V85 H42 V38 H15 Z" />
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    repairTriggerHandler();
                  }}
                  className="w-full h-12 sm:h-13 bg-[#FDB813] hover:bg-[#F5A800] active:bg-[#F5A800] text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md shadow-amber-400/20 flex items-center justify-between px-4 sm:px-5 transition-all cursor-pointer relative z-10 active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <Wrench className="w-4.5 h-4.5 text-neutral-950 stroke-[2.2] flex-shrink-0" />
                    <div className="h-5 w-px bg-neutral-950/20" />
                    <span className="font-black tracking-wide truncate">BOOK A REPAIR APPOINTMENT</span>
                  </div>
                  <ArrowRight className="w-4.5 h-4.5 text-neutral-950 stroke-[2.5] flex-shrink-0" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pincode Modal */}
      <AnimatePresence>
        {pincodeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-4 text-neutral-900"
            onClick={() => setPincodeModalOpen(false)}
          >
            <motion.div
              ref={pincodeModalRef}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pincode-modal-title"
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 id="pincode-modal-title" className="text-base font-black uppercase text-neutral-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  Delivery Location Pincode
                </h3>
                <button
                  onClick={() => { setPincodeModalOpen(false); deliverToBtnRef.current?.focus(); }}
                  aria-label="Close pincode dialog"
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600 font-medium">
                Enter your 6-digit Hyderabad pincode to see live doorstep delivery &amp; onsite setup slots.
              </p>

              <form onSubmit={handlePincodeSubmit} className="space-y-3">
                <label htmlFor="pincode-input" className="sr-only">
                  Hyderabad Pincode
                </label>
                <input
                  id="pincode-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="e.g. 500008"
                  className="w-full h-11 px-3.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-bold text-sm"
                />
                <button
                  type="submit"
                  disabled={tempPincode.replace(/\D/g, '').length !== 6}
                  className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-amber-400 font-black text-xs uppercase rounded-xl shadow-md transition-all"
                >
                  Update Pincode
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </>,
      document.body
    )}
    </>
  );
}
