"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  Star,
  Check,
  Tag,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const CHOICE_OPTIONS = [
  { id: 'all', label: 'All Items' },
  { id: 'new', label: 'New', icon: Sparkles },
  { id: 'refurbished', label: 'Refurbished', icon: RotateCcw },
  { id: 'best', label: 'Best', icon: Zap },
  { id: 'popular', label: 'Popular', icon: TrendingUp },
];

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-30k', label: 'Under ₹30,000', min: 0, max: 30000 },
  { id: '30k-60k', label: '₹30,000 – ₹60,000', min: 30000, max: 60000 },
  { id: '60k-100k', label: '₹60,000 – ₹1,00,000', min: 60000, max: 100000 },
  { id: '100k-150k', label: '₹1,00,000 – ₹1,50,000', min: 100000, max: 150000 },
  { id: 'above-150k', label: 'Above ₹1,50,000', min: 150000, max: Infinity },
];

export const RATING_OPTIONS = [
  { id: 'all', label: 'All Ratings', min: 0 },
  { id: '4.8', label: '4.8★ & Above', min: 4.8 },
  { id: '4.5', label: '4.5★ & Above', min: 4.5 },
  { id: '4.0', label: '4.0★ & Above', min: 4.0 },
];

export const RAM_OPTIONS = ['8GB', '12GB', '16GB', '24GB', '32GB', '36GB', '64GB+'];
export const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB', '2TB+'];
export const COLOR_OPTIONS = [
  { id: 'black', label: 'Black / Dark', hex: '#222222' },
  { id: 'silver', label: 'Silver / White', hex: '#E5E7EB' },
  { id: 'titanium', label: 'Space Grey / Titanium', hex: '#8B8C89' },
  { id: 'blue', label: 'Blue / Navy', hex: '#2563EB' },
  { id: 'gold', label: 'Gold / Desert / Beige', hex: '#D4AF37' },
];

export default function HorizontalFilterBar({
  availableBrands = [],
  selectedChoice = 'all',
  onSelectChoice,
  selectedPriceRange = 'all',
  onSelectPriceRange,
  selectedBrand = 'All',
  onSelectBrand,
  selectedRating = 'all',
  onSelectRating,
  selectedRam = 'All',
  onSelectRam,
  selectedStorage = 'All',
  onSelectStorage,
  selectedColor = 'All',
  onSelectColor,
  sortBy = 'featured',
  onSelectSort,
  onClearAll,
  totalResultsCount = 0,
}) {
  const [openDropdown, setOpenDropdown] = useState(null); // 'price' | 'brand' | 'ratings' | 'ram' | 'storage' | 'color' | null
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const hasActiveFilters =
    selectedChoice !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedBrand !== 'All' ||
    selectedRating !== 'all' ||
    selectedRam !== 'All' ||
    selectedStorage !== 'All' ||
    selectedColor !== 'All';

  return (
    <div ref={containerRef} className="w-full space-y-3 mb-6">
      
      {/* Primary Filter Bar (Horizontal X-Axis Layout) */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-3 sm:p-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          
          {/* 1. Filter by Choice: Direct Quick-Click Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 flex-shrink-0 flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Choice:</span>
            </span>
            {CHOICE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedChoice.toLowerCase() === opt.id.toLowerCase();
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectChoice(opt.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-neutral-950 text-amber-400 border-neutral-950 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3 text-amber-400" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results count & Sort */}
          <div className="flex items-center justify-between lg:justify-end gap-3 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
            <span className="text-xs font-bold text-neutral-600">
              <strong className="text-neutral-950 font-black">{totalResultsCount}</strong> products found
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-neutral-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSelectSort && onSelectSort(e.target.value)}
                className="h-8 px-2.5 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-950 text-neutral-900 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

        </div>

        {/* 2. Secondary Filter Dropdown Pills (Price, Brand, Ratings, RAM, Storage, Color) */}
        <div className="flex flex-wrap items-center gap-2 pt-3">
          
          {/* Brand Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('brand')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedBrand !== 'All'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span>Brand: {selectedBrand !== 'All' ? selectedBrand : 'All'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'brand' && (
              <div className="absolute left-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1">
                <button
                  type="button"
                  onClick={() => { onSelectBrand('All'); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    selectedBrand === 'All' ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span>All Brands</span>
                  {selectedBrand === 'All' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => { onSelectBrand(b); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedBrand === b ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{b}</span>
                    {selectedBrand === b && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('price')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedPriceRange !== 'all'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span>Price: {PRICE_RANGES.find((r) => r.id === selectedPriceRange)?.label || 'All'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1">
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { onSelectPriceRange(r.id); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedPriceRange === r.id ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    {selectedPriceRange === r.id && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ratings Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('ratings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedRating !== 'all'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Rating: {RATING_OPTIONS.find((r) => r.id === selectedRating)?.label || 'All'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'ratings' && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1">
                {RATING_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { onSelectRating(r.id); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedRating === r.id ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    {selectedRating === r.id && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RAM Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('ram')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedRam !== 'All'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span>RAM: {selectedRam}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'ram' && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1 max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => { onSelectRam('All'); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    selectedRam === 'All' ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span>All RAM Sizes</span>
                  {selectedRam === 'All' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                {RAM_OPTIONS.map((ram) => (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => { onSelectRam(ram); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedRam === ram ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{ram}</span>
                    {selectedRam === ram && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Storage Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('storage')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedStorage !== 'All'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span>Storage: {selectedStorage}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'storage' && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1">
                <button
                  type="button"
                  onClick={() => { onSelectStorage('All'); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    selectedStorage === 'All' ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span>All Storage</span>
                  {selectedStorage === 'All' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                {STORAGE_OPTIONS.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => { onSelectStorage(st); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedStorage === st ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span>{st}</span>
                    {selectedStorage === st && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('color')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                selectedColor !== 'All'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <span>Color: {COLOR_OPTIONS.find((c) => c.id === selectedColor)?.label || selectedColor}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            {openDropdown === 'color' && (
              <div className="absolute left-0 top-full mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-40 space-y-1">
                <button
                  type="button"
                  onClick={() => { onSelectColor('All'); setOpenDropdown(null); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    selectedColor === 'All' ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span>All Colors</span>
                  {selectedColor === 'All' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => { onSelectColor(col.id); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedColor === col.id ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-neutral-300 inline-block flex-shrink-0" style={{ backgroundColor: col.hex }} />
                      <span>{col.label}</span>
                    </div>
                    {selectedColor === col.id && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset / Clear All Action */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}

        </div>

      </div>

      {/* 3. Active Filters Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-neutral-500">Active filters:</span>
          {selectedChoice !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 text-amber-400 font-bold text-[11px]">
              <span>Choice: {CHOICE_OPTIONS.find((c) => c.id === selectedChoice)?.label}</span>
              <button onClick={() => onSelectChoice('all')} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedBrand !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[11px]">
              <span>Brand: {selectedBrand}</span>
              <button onClick={() => onSelectBrand('All')} className="hover:text-amber-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedPriceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
              <span>Price: {PRICE_RANGES.find((r) => r.id === selectedPriceRange)?.label}</span>
              <button onClick={() => onSelectPriceRange('all')} className="hover:text-neutral-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedRating !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
              <span>Rating: {RATING_OPTIONS.find((r) => r.id === selectedRating)?.label}</span>
              <button onClick={() => onSelectRating('all')} className="hover:text-neutral-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedRam !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
              <span>RAM: {selectedRam}</span>
              <button onClick={() => onSelectRam('All')} className="hover:text-neutral-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedStorage !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
              <span>Storage: {selectedStorage}</span>
              <button onClick={() => onSelectStorage('All')} className="hover:text-neutral-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedColor !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
              <span>Color: {COLOR_OPTIONS.find((c) => c.id === selectedColor)?.label || selectedColor}</span>
              <button onClick={() => onSelectColor('All')} className="hover:text-neutral-950 cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

    </div>
  );
}
