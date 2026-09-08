"use client";

import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Check,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-50k', label: 'Under ₹50,000', min: 0, max: 50000 },
  { id: '50k-100k', label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { id: '100k-200k', label: '₹1,00,000 – ₹2,00,000', min: 100000, max: 200000 },
  { id: 'above-200k', label: 'Above ₹2,00,000', min: 200000, max: Infinity },
];

export const RAM_OPTIONS = ['8GB', '12GB', '16GB', '24GB', '32GB', '36GB', '48GB', '64GB+'];
export const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB', '2TB+'];

// Helper to check if a product matches a given RAM filter
export function productMatchesRam(product, ram) {
  if (!ram || ram === 'All') return true;
  const ramNum = parseInt(ram, 10);
  const searchStr = JSON.stringify(product).toLowerCase();
  
  if (ram === '64GB+') {
    return (
      searchStr.includes('64gb') ||
      searchStr.includes('96gb') ||
      searchStr.includes('128gb ram') ||
      searchStr.includes('128gb unified')
    );
  }

  // Look for exact ram match in configs, specs, name
  const regex = new RegExp(`\\b${ramNum}gb\\b`, 'i');
  return regex.test(searchStr);
}

// Helper to check if a product matches a given Storage filter
export function productMatchesStorage(product, storage) {
  if (!storage || storage === 'All') return true;
  const searchStr = JSON.stringify(product).toLowerCase();

  if (storage === '2TB+') {
    return (
      searchStr.includes('2tb') ||
      searchStr.includes('4tb') ||
      searchStr.includes('8tb')
    );
  }

  const clean = storage.toLowerCase();
  // match e.g. "512gb", "1tb", "256gb"
  return searchStr.includes(clean);
}

// Helper to check if a product matches a given Color filter
export function productMatchesColor(product, colorName) {
  if (!colorName || colorName === 'All') return true;
  if (!product.colors || !Array.isArray(product.colors)) return false;
  
  const target = colorName.toLowerCase();
  return product.colors.some((c) => {
    const cName = (c.name || '').toLowerCase();
    if (target === 'black' || target === 'dark') {
      return cName.includes('black') || cName.includes('dark') || cName.includes('midnight') || cName.includes('graphite');
    }
    if (target === 'silver' || target === 'white') {
      return cName.includes('silver') || cName.includes('white') || cName.includes('starlight') || cName.includes('platinum');
    }
    if (target === 'titanium' || target === 'gray') {
      return cName.includes('titanium') || cName.includes('gray') || cName.includes('grey') || cName.includes('space');
    }
    if (target === 'blue') {
      return cName.includes('blue') || cName.includes('indigo') || cName.includes('pacific');
    }
    if (target === 'gold' || target === 'amber') {
      return cName.includes('gold') || cName.includes('amber') || cName.includes('desert') || cName.includes('yellow');
    }
    return cName.includes(target);
  });
}

export default function ProductFilters({
  availableBrands = [],
  selectedBrand,
  onSelectBrand,
  selectedPriceRange,
  onSelectPriceRange,
  selectedRam,
  onSelectRam,
  selectedStorage,
  onSelectStorage,
  selectedColor,
  onSelectColor,
  onClearAll,
  totalResultsCount = 0,
}) {
  const [mobileFilterDrawerOpen, setMobileFilterDrawerOpen] = useState(false);

  // Active filter count
  const activeFilterCount = [
    selectedBrand !== 'All' ? 1 : 0,
    selectedPriceRange !== 'all' ? 1 : 0,
    selectedRam !== 'All' ? 1 : 0,
    selectedStorage !== 'All' ? 1 : 0,
    selectedColor !== 'All' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const COLOR_SWATCHES = [
    { name: 'Black', hex: '#1c1917', label: 'Black / Dark' },
    { name: 'Titanium', hex: '#78716c', label: 'Titanium / Gray' },
    { name: 'Silver', hex: '#e2e8f0', label: 'Silver / White' },
    { name: 'Blue', hex: '#2563eb', label: 'Blue / Indigo' },
    { name: 'Gold', hex: '#F5B800', label: 'Gold / Yellow' },
  ];

  const filterContent = (
    <div className="space-y-6">
      
      {/* Header & Clear All */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-black uppercase text-neutral-950 tracking-wider">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-black text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedBrand !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-900 text-white">
              <span>Brand: {selectedBrand}</span>
              <button onClick={() => onSelectBrand('All')} aria-label={`Remove brand filter: ${selectedBrand}`} className="hover:text-amber-400 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedPriceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-900 text-white">
              <span>{PRICE_RANGES.find((r) => r.id === selectedPriceRange)?.label}</span>
              <button onClick={() => onSelectPriceRange('all')} aria-label="Remove price filter" className="hover:text-amber-400 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedRam !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-900 text-white">
              <span>RAM: {selectedRam}</span>
              <button onClick={() => onSelectRam('All')} aria-label={`Remove RAM filter: ${selectedRam}`} className="hover:text-amber-400 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedStorage !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-900 text-white">
              <span>Storage: {selectedStorage}</span>
              <button onClick={() => onSelectStorage('All')} aria-label={`Remove storage filter: ${selectedStorage}`} className="hover:text-amber-400 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColor !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-900 text-white">
              <span>Color: {selectedColor}</span>
              <button onClick={() => onSelectColor('All')} aria-label={`Remove color filter: ${selectedColor}`} className="hover:text-amber-400 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* 1. FILTER BY BRAND */}
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-neutral-700 tracking-wider block">
          Filter by Brand
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {availableBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand === selectedBrand ? 'All' : brand)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-neutral-900 text-amber-400 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-200/60'
              }`}
            >
              <span className="truncate">{brand}</span>
              {selectedBrand === brand && <Check className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. FILTER BY PRICE */}
      <div className="space-y-2 pt-3 border-t border-neutral-100">
        <label className="text-[11px] font-black uppercase text-neutral-700 tracking-wider block">
          Filter by Price
        </label>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => onSelectPriceRange(range.id)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedPriceRange === range.id
                  ? 'bg-neutral-900 text-amber-400 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-200/60'
              }`}
            >
              <span>{range.label}</span>
              {selectedPriceRange === range.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FILTER BY RAM */}
      <div className="space-y-2 pt-3 border-t border-neutral-100">
        <label className="text-[11px] font-black uppercase text-neutral-700 tracking-wider block">
          Filter by RAM
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {RAM_OPTIONS.map((ram) => (
            <button
              key={ram}
              onClick={() => onSelectRam(ram === selectedRam ? 'All' : ram)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRam === ram
                  ? 'bg-neutral-900 text-amber-400 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              {ram}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FILTER BY STORAGE */}
      <div className="space-y-2 pt-3 border-t border-neutral-100">
        <label className="text-[11px] font-black uppercase text-neutral-700 tracking-wider block">
          Filter by Storage
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {STORAGE_OPTIONS.map((storage) => (
            <button
              key={storage}
              onClick={() => onSelectStorage(storage === selectedStorage ? 'All' : storage)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStorage === storage
                  ? 'bg-neutral-900 text-amber-400 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      {/* 5. FILTER BY COLOR */}
      <div className="space-y-2 pt-3 border-t border-neutral-100">
        <label className="text-[11px] font-black uppercase text-neutral-700 tracking-wider block">
          Filter by Color
        </label>
        <div className="space-y-1.5">
          {COLOR_SWATCHES.map((color) => (
            <button
              key={color.name}
              onClick={() => onSelectColor(color.name === selectedColor ? 'All' : color.name)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                selectedColor === color.name
                  ? 'bg-neutral-900 text-amber-400 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-4 h-4 rounded-full border border-neutral-300 shadow-2xs flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.label}</span>
              </div>
              {selectedColor === color.name && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR FILTER CONTAINER */}
      <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-sm sticky top-24">
        {filterContent}
      </aside>

      {/* MOBILE FILTER BUTTON TRIGGER */}
      <div className="lg:hidden flex items-center justify-between gap-3 w-full">
        <button
          onClick={() => setMobileFilterDrawerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 shadow-xs active:bg-neutral-50 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-black text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      <AnimatePresence>
        {mobileFilterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex justify-end lg:hidden"
            onClick={() => setMobileFilterDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="filter-drawer-title"
              className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-4 bg-[#0a0a0a] text-white flex items-center justify-between sticky top-0 z-10 shadow-xs">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <h3 id="filter-drawer-title" className="font-black text-sm uppercase">
                    Filter Products
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black">
                      {activeFilterCount} Active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setMobileFilterDrawerOpen(false)}
                  aria-label="Close filters"
                  className="p-1 text-neutral-200 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-5 flex-1 overflow-y-auto">
                {filterContent}
              </div>

              {/* Drawer Footer Buttons */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center gap-3 sticky bottom-0 z-10">
                <button
                  onClick={onClearAll}
                  className="flex-1 py-3 text-xs font-black uppercase text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterDrawerOpen(false)}
                  className="btn-wipe-yellow flex-1 py-3 text-xs font-black uppercase rounded-xl shadow-md cursor-pointer"
                >
                  Apply ({totalResultsCount})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
