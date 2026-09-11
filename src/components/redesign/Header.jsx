"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TecnoMartLogo } from './Icons';
import { useShop } from '@/context/ShopContext';
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
  FileText,
  Heart
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

  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() && searchProducts.length === 0) {
      import('@/data/products').then((m) => {
        setSearchProducts(m.ALL_PRODUCTS || []);
      });
    }
  }, [searchQuery, searchProducts.length]);

  // Filter search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchProducts.length === 0) return [];
    const q = searchQuery.toLowerCase();
    return searchProducts.filter((p) => {
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
  }, [searchQuery, searchCategory, searchProducts]);

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
      className="sticky top-0 z-50 select-none shadow-lg font-sans w-full bg-[#0f141d]"
    >
      {/* =========================================================================
          TOP NAVIGATION BAR
          Left: Logo + Slogan | Deliver to Location
          Center: Search bar ("All Categories" dropdown + Input + Yellow Search Button)
          Right: "Hello, Sign In / Account & Orders" | "Wishlist" | "0 CART"
          ========================================================================= */}
      <div className="max-w-[1460px] mx-auto px-3 sm:px-4 lg:px-6 h-[64px] sm:h-[70px] flex items-center justify-between gap-3 lg:gap-5">
        
        {/* Left Section: Logo + Deliver To Location */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* TecnoMart Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            {/* Bright Yellow 'T' Logo matching image */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                <path d="M3 7h30l-4.5 7H22v16h-8V14H7.5L3 7z" fill="#FFD21C" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-[21px] tracking-tight text-white leading-none uppercase">
                TECNOMART
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.14em] text-[#F5B800] uppercase mt-1 leading-none">
                YOUR TRUSTED TECH PARTNER
              </span>
            </div>
          </Link>

          {/* Deliver To Location Widget */}
          <button
            type="button"
            onClick={() => setPincodeModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-left transition-all"
            title="Change Delivery Pincode"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#F5B800]">
              <MapPin className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] text-neutral-400 font-medium">Deliver to</span>
              <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                Hyderabad {locationPincode || '500033'}
              </span>
            </div>
          </button>
        </div>

        {/* Center Section: Search Bar with "All Categories" dropdown */}
        <div className="flex-1 max-w-2xl relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
            className="flex items-center rounded-md bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#F59E0B]"
          >
            {/* Category Dropdown Pill */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="bg-[#f3f4f6] hover:bg-[#e5e7eb] text-neutral-800 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-2.5 flex items-center gap-1.5 border-r border-neutral-300 shrink-0 transition-colors cursor-pointer"
            >
              <span className="whitespace-nowrap">{searchCategory === 'All' ? 'All Categories' : searchCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
            </button>

            {/* Input field */}
            <input
              type="text"
              placeholder="Search TecnoMart for MacBooks, iPhones, R..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setSearchOpen(true);
                if (searchProducts.length === 0) {
                  import('@/data/products').then((m) => setSearchProducts(m.ALL_PRODUCTS || []));
                }
              }}
              className="w-full h-10 px-3 text-xs sm:text-sm text-neutral-900 bg-white placeholder-neutral-500 outline-none"
            />

            {/* Orange-Yellow Search Button */}
            <button
              type="submit"
              aria-label="Search"
              className="bg-[#F59E0B] hover:bg-[#D97706] text-neutral-950 px-4 h-10 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>

          {/* Instant Search Results Dropdown */}
          {searchQuery.trim() && searchOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 p-2 text-neutral-900">
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
                  {searchResults.slice(0, 8).map((item) => (
                    <Link
                      key={item.id}
                      href={item.type === 'mobiles' ? `/mobiles/${item.slug || item.id}` : (item.type === 'laptops' ? `/laptops/${item.slug || item.id}` : `/products/${item.id}`)}
                      onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-lg transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center p-1 shrink-0">
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
                      <span className="text-xs font-black text-neutral-900 shrink-0">
                        ₹{(item.rawPrice || item.priceINR)?.toLocaleString('en-IN') || item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Account | Wishlist | Cart */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          
          {/* Account & Orders */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="hidden sm:flex flex-col text-left px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer transition-all"
            >
              <span className="text-[11px] text-neutral-400 font-medium leading-tight">Hello, Sign In</span>
              <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1 leading-tight">
                Account &amp; Orders
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </span>
            </button>

            {/* Account dropdown */}
            {accountDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-neutral-900">
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-bold text-neutral-900">My Account</p>
                  <p className="text-[11px] text-neutral-500 truncate">user@tecnomart.in</p>
                </div>
                <div className="space-y-0.5 text-xs font-medium text-neutral-700">
                  <Link
                    href="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"
                  >
                    Your Profile &amp; Settings
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-50 text-left cursor-pointer"
                  >
                    <span>Your Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setPincodeModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 text-left cursor-pointer"
                  >
                    <span>Delivery Location ({locationPincode})</span>
                  </button>
                  <div className="pt-1 mt-1 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        setSignInAlert(true);
                        setTimeout(() => setSignInAlert(false), 3000);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-left font-semibold cursor-pointer"
                    >
                      Sign In / Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-white transition-all"
            title="View Wishlist"
          >
            <Heart className="w-5 h-5 text-white stroke-[2]" />
            <span className="hidden md:inline text-xs sm:text-sm font-bold text-white">Wishlist</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-white transition-all"
            title="Shopping Cart"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#FFD21C] stroke-[2]" />
              <span className="absolute -top-1 -right-1 bg-[#FFD21C] text-neutral-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
              CART
            </span>
          </button>

        </div>
      </div>

      {/* =========================================================================
          SUB-NAVIGATION BAR (Bottom Tier)
          Left: Hamburger + "ALL CATEGORIES" (Clicks to open Sidebar!)
          Center: Mobiles | Laptops | Gaming PCs | Accessories | PC Builder | Refurbished | Trade-In | EMI Calc | Repairs | Corporate | Students
          Right: Sparkles + "HYDERABAD EXPRESS 4-HOUR DELIVERY ACTIVE"
          ========================================================================= */}
      <div className="bg-[#131922] border-t border-[#232f3e] h-10 sm:h-11">
        <div className="max-w-[1460px] mx-auto px-3 sm:px-4 lg:px-6 h-full flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          
          {/* Left: ALL CATEGORIES (Sidebar Trigger) */}
          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 text-white hover:text-amber-400 px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all shrink-0 cursor-pointer group"
          >
            <Menu className="w-4 h-4 stroke-[2.5] text-white group-hover:text-amber-400" />
            <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-white group-hover:text-amber-400 whitespace-nowrap">
              ALL CATEGORIES
            </span>
          </button>

          {/* Center: Navigation Links */}
          <nav aria-label="Quick Categories" className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-white whitespace-nowrap overflow-x-auto scrollbar-none">
            <Link href="/mobiles" className="hover:text-amber-400 transition-colors">Mobiles</Link>
            <Link href="/laptops" className="hover:text-amber-400 transition-colors">Laptops</Link>
            <Link href="/gaming" className="hover:text-amber-400 transition-colors">Gaming PCs</Link>
            <Link href="/accessories" className="hover:text-amber-400 transition-colors">Accessories</Link>
            <Link href="/pc-builds" className="hover:text-amber-400 transition-colors">PC Builder</Link>
            <Link href="/refurbished" className="hover:text-amber-400 transition-colors">Refurbished</Link>
            <Link href="/exchange" className="hover:text-amber-400 transition-colors">Trade-In</Link>
            <Link href="/emi-calculator" className="hover:text-amber-400 transition-colors">EMI Calc</Link>
            <Link href="/repairs" className="hover:text-amber-400 transition-colors">Repairs</Link>
            <Link href="/corporate" className="hover:text-amber-400 transition-colors">Corporate</Link>
            <Link href="/students" className="hover:text-amber-400 transition-colors">Students</Link>
          </nav>

          {/* Right: Express Delivery Banner */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0 text-[#FFD21C] font-black text-xs tracking-wide">
            <Sparkles className="w-4 h-4 text-[#FFD21C] shrink-0" />
            <span className="whitespace-nowrap">HYDERABAD EXPRESS 4–HOUR DELIVERY ACTIVE</span>
          </div>

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
