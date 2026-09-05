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
      title: 'Others & Custom',
      href: '/gaming',
      items: [
        { name: 'Gaming PC Custom Builds', href: '/gaming' },
        { name: 'Corporate Bulk Orders', href: '/corporate' },
        { name: 'Student Discounts', href: '/students' },
        { name: 'EMI Calculator', href: '/emi-calculator' },
      ],
    },
  ];

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (tempPincode.length >= 6) {
      changePincode(tempPincode);
      setPincodeModalOpen(false);
    }
  };

  const repairTriggerHandler = () => setIsRepairOpen(true);

  return (
    <header className="sticky top-0 z-50 select-none shadow-md font-sans">
      
      {/* 1. TOP AMAZON-STYLE DARK NAVY BAR (#131921) */}
      <div className="bg-[#131921] text-white py-2 px-3 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-block flex-shrink-0" aria-label="TecnoMart Home">
              <TecnoMartLogo textClass="text-white" subtitleClass="text-amber-400 font-extrabold" />
            </Link>

            {/* Deliver To Location Selector Button (Amazon Style) */}
            <button
              ref={deliverToBtnRef}
              onClick={() => setPincodeModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-left cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block leading-tight">Deliver to</span>
                <span className="text-xs font-black text-white block leading-tight">
                  Hyderabad {locationPincode}
                </span>
              </div>
            </button>
          </div>

          {/* AMAZON / FLIPKART STYLE MEGA SEARCH BAR */}
          <div className="flex-1 max-w-3xl relative hidden md:block">
            <div className="flex items-center bg-white rounded-md overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-amber-500">
              
              {/* Search Category Dropdown */}
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="h-10 px-3 bg-neutral-100 border-r border-neutral-300 text-xs font-bold text-neutral-800 outline-none cursor-pointer hover:bg-neutral-200"
              >
                <option value="All">All Categories</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Laptops">Laptops</option>
                <option value="Gaming">Gaming PCs</option>
                <option value="Accessories">Accessories</option>
              </select>

              {/* Search Input — sr-only label satisfies WCAG 1.3.1 */}
              <label htmlFor="search-desktop" className="sr-only">
                Search TecnoMart
              </label>
              <input
                id="search-desktop"
                type="search"
                placeholder="Search TecnoMart for MacBooks, iPhones, RTX GPUs, Repairs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="flex-1 h-10 px-3 text-xs sm:text-sm text-neutral-900 outline-none font-medium placeholder-neutral-500"
              />

              {/* Gold Search Button */}
              <button
                type="button"
                className="w-12 h-10 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Submit search"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Instant Search Dropdown Results */}
            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-neutral-300 overflow-hidden z-50 p-2 text-neutral-900">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase text-neutral-400 border-b border-neutral-100 flex justify-between">
                  <span>Matching Products in {searchCategory}</span>
                  <span>{searchResults.length} Found</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-neutral-500">
                    No results for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.type}/${item.slug}`}
                        onClick={() => setSearchQuery('')}
                        className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-neutral-100 rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={item.images?.[0] || item.images}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-neutral-950 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-amber-600 font-bold">
                            {item.price} • <span className="text-neutral-500 font-normal">{item.brand}</span>
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Account & Lists Dropdown (Amazon Style) */}
            <div className="relative hidden lg:block" data-account-menu>
              <button
                ref={accountBtnRef}
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                aria-expanded={accountDropdownOpen}
                aria-haspopup="menu"
                aria-label="Account and orders menu"
                className="flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-left cursor-pointer"
              >
                <div>
                  <span className="text-[10px] text-neutral-400 block leading-tight">Hello, Sign In</span>
                  <span className="text-xs font-black text-white flex items-center gap-0.5 leading-tight">
                    Account &amp; Orders <ChevronDown className="w-3 h-3 text-neutral-400" />
                  </span>
                </div>
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-200 p-3 z-50 text-neutral-900 space-y-2">
                  <div className="pb-2 border-b border-neutral-100">
                    <button
                      onClick={() => {
                        setSignInAlert(true);
                        setTimeout(() => setSignInAlert(false), 3000);
                      }}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase rounded-lg shadow-sm"
                    >
                      Sign In
                    </button>
                    {signInAlert ? (
                      <p role="status" className="text-[10px] text-emerald-600 text-center mt-1 font-semibold">
                        Sign-in coming soon!
                      </p>
                    ) : (
                      <p className="text-[10px] text-neutral-500 text-center mt-1">New Customer? Start here.</p>
                    )}
                  </div>
                  <div className="space-y-1 text-xs font-semibold text-neutral-700">
                    <Link href="/#popular" className="block py-1 hover:text-amber-600">Your Orders</Link>
                    <Link href="/build-your-setup" className="block py-1 hover:text-amber-600">Your Custom Builds</Link>
                    <Link href="/contact" className="block py-1 hover:text-amber-600">Help &amp; Customer Service</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 rounded hover:ring-1 hover:ring-white text-white flex items-center gap-1 relative cursor-pointer"
              aria-label={`Wishlist, ${wishlist.length} saved item${wishlist.length !== 1 ? 's' : ''}`}
            >
              <Heart className="w-5 h-5 text-amber-400" />
              <span className="hidden xl:inline text-xs font-black">Wishlist</span>
              {wishlist.length > 0 && (
                <span aria-hidden="true" className="bg-red-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Link with Badge */}
            <Link
              href="/cart"
              className="p-1.5 rounded hover:ring-1 hover:ring-white text-white flex items-center gap-2 relative cursor-pointer"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-amber-400" />
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-neutral-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-black uppercase">Cart</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              ref={hamburgerBtnRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-white hover:text-amber-400 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>

        {/* Mobile Search Bar (rendered on small screens) */}
        <div className="mt-2 md:hidden">
          <div className="flex items-center bg-white rounded-md overflow-hidden shadow-inner">
            <label htmlFor="search-mobile" className="sr-only">Search TecnoMart</label>
            <input
              id="search-mobile"
              type="search"
              placeholder="Search MacBooks, iPhones, GPUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-9 px-3 text-xs text-neutral-900 outline-none font-medium placeholder-neutral-500"
            />
            <button
              className="w-10 h-9 bg-amber-500 text-neutral-950 flex items-center justify-center"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>

      {/* 2. SECOND AMAZON-STYLE DARK SUB-HEADER STRIP (#232F3E) */}
      <div className="bg-[#232f3e] text-white text-xs font-bold py-1.5 px-3 sm:px-6 overflow-x-auto no-scrollbar border-t border-neutral-800">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4 sm:space-x-8 flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-black uppercase tracking-wider text-[11px] cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>All Categories</span>
            </button>

            {subHeaderLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors tracking-tight text-[12px] font-bold whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

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
                  maxLength={6}
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value)}
                  placeholder="e.g. 500033"
                  className="w-full h-11 px-3.5 bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-bold text-sm"
                />
                <button
                  type="submit"
                  className="w-full h-11 bg-midgrey-900 hover:bg-midgrey-800 text-amber-400 font-black text-xs uppercase rounded-xl shadow-md"
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
