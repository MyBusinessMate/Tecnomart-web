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
  Phone,
  MessageCircle,
  ChevronRight,
  Heart,
  MapPin,
  User,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [signInAlert, setSignInAlert] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({}); // { [id]: boolean }

  const toggleCategoryDropdown = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Refs for focus management and focus trapping
  const hamburgerBtnRef = useRef(null);
  const deliverToBtnRef = useRef(null);
  const mobileMenuDrawerRef = useRef(null);
  const pincodeModalRef = useRef(null);
  const accountBtnRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const drawer = mobileMenuDrawerRef.current;
    if (!drawer) return;

    const getFocusables = () =>
      Array.from(drawer.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));

    // Move focus into drawer on open
    const first = getFocusables()[0];
    first?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
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
  }, [mobileMenuOpen]);

  // Focus trap for pincode modal
  useEffect(() => {
    if (!pincodeModalOpen) return;
    const modal = pincodeModalRef.current;
    if (!modal) return;

    const getFocusables = () =>
      Array.from(modal.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));

    const first = getFocusables()[0];
    first?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setPincodeModalOpen(false);
        deliverToBtnRef.current?.focus();
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
  }, [pincodeModalOpen]);

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
        p.tagline.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    }).slice(0, 6);
  }, [searchQuery, searchCategory]);

  const subHeaderLinks = [
    { label: 'All Categories', href: '#categories' },
    { label: 'Mobiles', href: '/mobiles' },
    { label: 'Laptops', href: '/laptops' },
    { label: 'PC Builder', href: '/pc-builds' },
    { label: 'Gaming', href: '/gaming' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Repair', href: '/repairs' },
    { label: 'Trade-In', href: '/exchange' },
  ];

  const sidebarCategories = [
    {
      id: 'mobiles',
      title: 'Mobiles',
      href: '/mobiles',
      items: [
        { name: 'Refurbished Mobiles', href: '/refurbished' },
        { name: 'New Mobiles', href: '/mobiles' },
        { name: 'Trade-In Mobile', href: '/exchange' },
        { name: 'Mobile Covers & Cases', href: '/accessories' },
      ],
    },
    {
      id: 'laptops',
      title: 'Laptops',
      href: '/laptops',
      items: [
        { name: 'Gaming Laptops', href: '/laptops' },
        { name: 'MacBooks & Ultrabooks', href: '/laptops' },
        { name: 'Refurbished Laptops', href: '/refurbished' },
        { name: 'Laptop Bags & Skins', href: '/accessories' },
      ],
    },
    {
      id: 'gaming-pcs',
      title: 'Gaming & PC Builds',
      href: '/gaming',
      items: [
        { name: 'Custom PC Builder & Configurator', href: '/pc-builds' },
        { name: 'Pre-Built Gaming Rigs', href: '/gaming' },
        { name: 'Gaming Laptops', href: '/laptops' },
        { name: 'Gaming Accessories', href: '/accessories' },
      ],
    },
    {
      id: 'accessories',
      title: 'Accessories',
      href: '/accessories',
      items: [
        { name: 'Chargers & Fast Cables', href: '/accessories' },
        { name: 'Audio & ANC Headphones', href: '/accessories' },
        { name: 'Mechanical Keyboards & Mice', href: '/accessories' },
        { name: 'Desk Mats & Stands', href: '/accessories' },
      ],
    },
    {
      id: 'repairs',
      title: 'Repairs & Services',
      href: '/repairs',
      items: [
        { name: 'Display Flickering', href: '/repairs' },
        { name: 'Display Cracked / Glass Replacement', href: '/repairs' },
        { name: 'OS & Software Issues', href: '/repairs' },
        { name: 'Disk & SSD Upgrades / Issues', href: '/repairs' },
        { name: 'Battery Replacement', href: '/repairs' },
      ],
    },
    {
      id: 'others',
      title: 'Services & Perks',
      href: '/corporate',
      items: [
        { name: 'Corporate Bulk Orders', href: '/corporate' },
        { name: 'Student Discounts', href: '/students' },
        { name: 'EMI Calculator', href: '/emi-calculator' },
        { name: 'Trade-In / Exchange', href: '/exchange' },
      ],
    },
  ];

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const cleanDigits = tempPincode.replace(/\D/g, '');
    if (cleanDigits.length === 6) {
      changePincode(cleanDigits);
      setPincodeModalOpen(false);
    }
  };

  const repairTriggerHandler = () => setIsRepairOpen(true);
  const [activeNavDropdown, setActiveNavDropdown] = useState(null); // 'laptops' | 'mobiles' | 'accessories' | null

  // Dropdown categories data for desktop nav
  const navDropdownData = {
    laptops: [
      { name: 'MacBooks & Ultrabooks', href: '/laptops' },
      { name: 'Gaming Laptops', href: '/laptops' },
      { name: 'Refurbished Laptops', href: '/refurbished' },
      { name: 'Laptop Bags & Sleeves', href: '/accessories' },
    ],
    mobiles: [
      { name: 'New Mobiles', href: '/mobiles' },
      { name: 'Refurbished Mobiles', href: '/refurbished' },
      { name: 'Trade-In / Exchange', href: '/exchange' },
      { name: 'Cases & Screen Guards', href: '/accessories' },
    ],
    accessories: [
      { name: 'Fast Chargers & Cables', href: '/accessories' },
      { name: 'Audio & ANC Headphones', href: '/accessories' },
      { name: 'Keyboards & Mice', href: '/accessories' },
      { name: 'Desk Mats & Stands', href: '/accessories' },
    ],
  };

  return (
    <header className="sticky top-0 z-50 select-none shadow-md font-sans bg-[#727377] border-b border-[#5f6064]">
      
      {/* MINIMALIST GREY NAVBAR (#727377) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-6">
        
        {/* 1. BRAND LOGO */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="inline-block" aria-label="TecnoMart Home">
            <TecnoMartLogo textClass="text-white font-black" subtitleClass="text-neutral-200 font-semibold" />
          </Link>
        </div>

        {/* 2. PRIMARY NAV LINKS (Laptops ⌵, Mobiles ⌵, Accessories ⌵, Support) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-white">
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
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300 group-hover:text-amber-400" />
            </Link>

            {activeNavDropdown === 'laptops' && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.laptops.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 rounded-xl transition-all"
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
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300 group-hover:text-amber-400" />
            </Link>

            {activeNavDropdown === 'mobiles' && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.mobiles.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 rounded-xl transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* PC Builder Link */}
          <Link
            href="/pc-builds"
            className="hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium"
          >
            PC Builder
          </Link>

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
              <ChevronDown className="w-3.5 h-3.5 text-neutral-300 group-hover:text-amber-400" />
            </Link>

            {activeNavDropdown === 'accessories' && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 z-50 space-y-1">
                {navDropdownData.accessories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 rounded-xl transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Support Link */}
          <Link
            href="/contact"
            className="hover:text-amber-400 transition-colors py-1 cursor-pointer font-medium"
          >
            Support
          </Link>
        </nav>

        {/* 3. CENTER PILL-SHAPED SEARCH BAR */}
        <div className="flex-1 max-w-xl relative hidden md:block">
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

          {/* Instant Search Dropdown Results */}
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
                      href={`/products/${item.id}`}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-xl transition-colors group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center p-1 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
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
                        ₹{item.priceINR?.toLocaleString('en-IN') || item.price}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. RIGHT ACTIONS (ACCOUNT, PIN LOCATION, CART) */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          
          {/* USER ACCOUNT DROPDOWN */}
          <div className="relative" data-account-menu>
            <button
              ref={accountBtnRef}
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors p-1.5 rounded-lg cursor-pointer"
              aria-label="User Account"
            >
              <User className="w-5 h-5 text-white" />
              <ChevronDown className="w-3 h-3 text-neutral-300" />
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-bold text-neutral-900">My Account</p>
                  <p className="text-[11px] text-neutral-400 truncate">user@tecnomart.in</p>
                </div>

                <div className="space-y-0.5 text-xs font-medium text-neutral-700">
                  {/* 1. Edit Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
                  >
                    <span>Edit Profile</span>
                  </Link>

                  {/* 2. Wishlist */}
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

                  {/* 3. My Orders */}
                  <Link
                    href="/orders"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
                  >
                    <span>My Orders</span>
                  </Link>

                  {/* 4. Saved Addresses */}
                  <button
                    type="button"
                    onClick={() => {
                      setAccountDropdownOpen(false);
                      setPincodeModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-50 hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    <span>Saved Addresses</span>
                  </button>

                  {/* 5. Sign In / Logout */}
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
                    Auth updated!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* PIN LOCATION BUTTON */}
          <button
            ref={deliverToBtnRef}
            onClick={() => setPincodeModalOpen(true)}
            className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors p-1.5 rounded-lg cursor-pointer text-left"
            aria-label={`Delivery location: Hyderabad ${locationPincode}`}
          >
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="hidden sm:block leading-tight">
              <span className="text-[10px] text-neutral-200 block font-medium">Pin Location</span>
              <span className="text-xs font-bold text-white block">
                Hyderabad {locationPincode}
              </span>
            </div>
          </button>

          {/* CART BUTTON WITH CIRCLE BADGE */}
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
            <span className="hidden sm:inline text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
              Cart
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 text-white hover:text-amber-300 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </div>

      {/* CATEGORY SUB-HEADER STRIP */}
      <div className="border-t border-[#626367] bg-[#68696d]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar text-xs font-semibold text-neutral-100">
            {subHeaderLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-amber-300 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (rendered below on small screens) */}
      <div className="md:hidden px-4 py-2.5 bg-[#68696d] border-t border-[#5f6064]">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 stroke-[2]" />
          </div>
          <label htmlFor="search-mobile" className="sr-only">Search TecnoMart</label>
          <input
            id="search-mobile"
            type="search"
            placeholder="Search for MacBooks, iPhones, laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-white/95 focus:bg-white text-xs text-neutral-900 rounded-full border border-white/20 outline-none focus:border-amber-400 font-medium"
          />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midgrey-950/75 backdrop-blur-xs flex justify-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              ref={mobileMenuDrawerRef}
              data-lenis-prevent="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="w-full max-w-sm bg-white text-neutral-900 h-full shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <div data-lenis-prevent="true" className="overflow-y-auto flex-1 overscroll-contain">
                <div className="bg-midgrey-900 text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-400" />
                    <span className="font-black text-sm uppercase">Shop Categories</span>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); hamburgerBtnRef.current?.focus(); }}
                    aria-label="Close menu"
                    className="p-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 space-y-3 border-b border-neutral-100">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">
                    Deliver To Location
                  </span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setPincodeModalOpen(true);
                    }}
                    className="w-full p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-2 text-xs font-bold text-neutral-900"
                  >
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Hyderabad {locationPincode} (Change)</span>
                  </button>
                </div>

                {/* 5 Minimal & Clean Main Departments with Smooth Accordion Dropdowns */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-3">
                    Main Departments
                  </span>

                  {sidebarCategories.map((cat) => {
                    const isExpanded = !!expandedCategories[cat.id];
                    return (
                      <div
                        key={cat.id}
                        className="rounded-2xl border border-neutral-100 overflow-hidden transition-all bg-neutral-50/50 hover:border-neutral-200"
                      >
                        {/* Header Row: Clicking triggers smooth dropdown */}
                        <div className="flex items-center justify-between p-3.5 hover:bg-neutral-100/60 transition-colors">
                          <Link
                            href={cat.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-black text-xs uppercase tracking-wider text-neutral-950 hover:text-amber-600 transition-colors flex-1"
                          >
                            {cat.title}
                          </Link>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleCategoryDropdown(cat.id);
                            }}
                            className="p-1.5 rounded-xl hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition-all cursor-pointer flex items-center justify-center"
                            aria-label={`Toggle ${cat.title} subcategories`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ease-out ${
                                isExpanded ? 'rotate-180 text-amber-500' : 'rotate-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Smooth Dropdown Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden bg-white border-t border-neutral-100"
                            >
                              <div className="p-3 space-y-1 pl-4">
                                {cat.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between text-xs font-semibold text-neutral-600 hover:text-amber-600 hover:translate-x-1.5 py-2 px-2.5 rounded-lg hover:bg-neutral-50 transition-all"
                                  >
                                    <span>{subItem.name}</span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-2 sticky bottom-0 z-20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    repairTriggerHandler();
                  }}
                  className="btn-wipe-yellow w-full py-3 text-neutral-950 font-black text-xs uppercase rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Book Repair Appointment</span>
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
            className="fixed inset-0 z-50 bg-midgrey-950/75 backdrop-blur-xs flex items-center justify-center p-4 text-neutral-900"
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
                  Choose Delivery Pincode
                </h3>
                <button
                  onClick={() => { setPincodeModalOpen(false); deliverToBtnRef.current?.focus(); }}
                  aria-label="Close pincode dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600 font-medium">
                Enter your 6-digit Hyderabad pincode to see live doorstep delivery &amp; onsite setup slots.
              </p>

              <form onSubmit={handlePincodeSubmit} className="space-y-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="e.g. 500033"
                  className="w-full h-11 px-3.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-bold text-sm"
                />
                <button
                  type="submit"
                  disabled={tempPincode.replace(/\D/g, '').length !== 6}
                  className="w-full h-11 bg-midgrey-900 hover:bg-midgrey-800 disabled:opacity-50 disabled:cursor-not-allowed text-amber-400 font-black text-xs uppercase rounded-xl shadow-md transition-all"
                >
                  Update Pincode
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
