/**
 * TecnoMart Centralized Reactive Admin Store & Repository
 * Synchronizes with localStorage ('tecnomart_db_v1') and provides full CRUD
 * for Products, Pricing, Categories, Blogs, Repairs, PC Parts, Spin Settings, Store Info, Legal & Users.
 */

import {
  MOBILES_DATA,
  LAPTOPS_DATA,
  GAMING_DATA,
  ACCESSORIES_DATA,
  REFURBISHED_DATA
} from '@/data/products';
import React, { useState, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'tecnomart_db_v1';

// Initial Seed Data Builder
function createDefaultDb() {
  const initialProducts = [
    ...MOBILES_DATA.map((p) => ({ ...p, type: 'mobiles', category: p.category || 'Smartphones' })),
    ...LAPTOPS_DATA.map((p) => ({ ...p, type: 'laptops', category: p.category || 'Creator Laptops' })),
    ...GAMING_DATA.map((p) => ({ ...p, type: 'gaming', category: p.category || 'Gaming Desktops' })),
    ...ACCESSORIES_DATA.map((p) => ({ ...p, type: 'accessories', category: p.category || 'Tech Gear' })),
    ...REFURBISHED_DATA.map((p) => ({ ...p, type: 'refurbished', category: p.category || 'Certified Refurbished' })),
  ];

  return {
    version: 1,
    dealOfTheDayProductId: 'laptop-1',
    products: initialProducts,
    categories: [
      { id: 'cat-1', name: 'Smartphones', slug: 'mobiles', type: 'mobiles', description: 'Brand-new sealed flagship phones with official warranty' },
      { id: 'cat-2', name: 'Laptops', slug: 'laptops', type: 'laptops', description: 'Creator, ultrabook, and workstation laptops' },
      { id: 'cat-3', name: 'Gaming Rigs', slug: 'gaming', type: 'gaming', description: 'Custom-built RTX 40/50 series liquid-cooled gaming PCs' },
      { id: 'cat-4', name: 'Accessories', slug: 'accessories', type: 'accessories', description: 'Audiophile audio, mechanical keyboards, monitors & GaN chargers' },
      { id: 'cat-5', name: 'Refurbished', slug: 'refurbished', type: 'refurbished', description: 'Certified pre-owned devices with 6 to 12 months direct store warranty' },
    ],
    repairs: [
      { id: 'rep-1', serviceName: 'Original OLED Screen Replacement', deviceType: 'iPhone', turnaroundTime: '30 Minutes', estimatedPrice: '₹4,999 - ₹18,999', rawPrice: 4999, warrantyMonths: 12, status: 'Active' },
      { id: 'rep-2', serviceName: 'Genuine Battery Replacement', deviceType: 'iPhone', turnaroundTime: '25 Minutes', estimatedPrice: '₹2,499 - ₹6,499', rawPrice: 2499, warrantyMonths: 6, status: 'Active' },
      { id: 'rep-3', serviceName: 'MacBook Logic Board Micro-Soldering', deviceType: 'MacBook', turnaroundTime: '24 Hours', estimatedPrice: '₹5,999 - ₹16,999', rawPrice: 5999, warrantyMonths: 6, status: 'High Demand' },
      { id: 'rep-4', serviceName: 'Samsung AMOLED Display Replacement', deviceType: 'Samsung', turnaroundTime: '45 Minutes', estimatedPrice: '₹4,499 - ₹19,999', rawPrice: 4499, warrantyMonths: 6, status: 'Active' },
      { id: 'rep-5', serviceName: 'Liquid Damage Ultrasonic Cleaning', deviceType: 'Laptop', turnaroundTime: '2 - 4 Hours', estimatedPrice: '₹1,999 - ₹4,999', rawPrice: 1999, warrantyMonths: 3, status: 'Active' },
      { id: 'rep-6', serviceName: 'Gaming PC Thermal Repaste & Dust Purge', deviceType: 'Console', turnaroundTime: '1 Hour', estimatedPrice: '₹1,299', rawPrice: 1299, warrantyMonths: 3, status: 'Active' },
    ],
    pcParts: [
      { id: 'part-1', category: 'cpu', name: 'AMD Ryzen 9 9950X (16 Cores, 32 Threads)', brand: 'AMD', price: 58999, specs: 'Up to 5.7GHz, AM5 Socket, 80MB Cache', inStock: true },
      { id: 'part-2', category: 'cpu', name: 'Intel Core i9-14900KS Flagship', brand: 'Intel', price: 62999, specs: '24 Cores (8P + 16E), Up to 6.2GHz', inStock: true },
      { id: 'part-3', category: 'cpu', name: 'AMD Ryzen 7 7800X3D (Gaming Champion)', brand: 'AMD', price: 38999, specs: '8 Cores / 16 Threads with 3D V-Cache', inStock: true },
      { id: 'part-4', category: 'gpu', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', brand: 'NVIDIA', price: 189999, specs: 'Ada Lovelace, DLSS 3.5, 4K Ultra Beast', inStock: true },
      { id: 'part-5', category: 'gpu', name: 'NVIDIA GeForce RTX 4080 Super 16GB', brand: 'NVIDIA', price: 104999, specs: '10,240 CUDA Cores, 256-bit Memory', inStock: true },
      { id: 'part-6', category: 'gpu', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', brand: 'NVIDIA', price: 79999, specs: 'High refresh 1440p / 4K gaming', inStock: true },
      { id: 'part-7', category: 'ram', name: 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6000MHz', brand: 'G.Skill', price: 19999, specs: 'CL30 Low Latency, Intel XMP & AMD EXPO', inStock: true },
      { id: 'part-8', category: 'ram', name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', brand: 'Corsair', price: 10499, specs: 'iCUE Compatible, Aluminum Heatspreader', inStock: true },
      { id: 'part-9', category: 'storage', name: 'Samsung 990 PRO 2TB NVMe PCIe 4.0 SSD', brand: 'Samsung', price: 18499, specs: 'Up to 7,450 MB/s Read Speed with Heatsink', inStock: true },
      { id: 'part-10', category: 'storage', name: 'Crucial T700 1TB PCIe 5.0 NVMe SSD', brand: 'Crucial', price: 15999, specs: 'Blazing 11,700 MB/s Gen5 Speeds', inStock: true },
      { id: 'part-11', category: 'motherboard', name: 'ASUS ROG Strix X670E-F Gaming WiFi', brand: 'ASUS', price: 39999, specs: 'PCIe 5.0, WiFi 6E, 16+2 Power Stages', inStock: true },
      { id: 'part-12', category: 'psu', name: 'Corsair RM1000x 1000W 80+ Gold Fully Modular', brand: 'Corsair', price: 17499, specs: 'ATX 3.0 & PCIe 5.0 Ready, Zero RPM Fan', inStock: true },
      { id: 'part-13', category: 'cabinet', name: 'Lian Li O11 Dynamic EVO RGB (Black)', brand: 'Lian Li', price: 16999, specs: 'Dual Chamber, Dual 360mm Radiator Support', inStock: true },
    ],
    spinSettings: {
      prizes: [
        { id: 'p1', sliceIndex: 0, label: '₹1,000 Off Voucher', type: 'voucher', value: 1000, couponCode: 'SPIN1000', weight: 15, active: true },
        { id: 'p2', sliceIndex: 1, label: 'Free Screen Guard', type: 'accessory', value: 499, couponCode: 'SPINGUARD', weight: 25, active: true },
        { id: 'p3', sliceIndex: 2, label: '₹500 Instant Cash', type: 'discount', value: 500, couponCode: 'SPIN500', weight: 20, active: true },
        { id: 'p4', sliceIndex: 3, label: '₹2,000 Mega Off', type: 'voucher', value: 2000, couponCode: 'SPIN2000', weight: 5, active: true },
        { id: 'p5', sliceIndex: 4, label: 'Braided Fast Cable', type: 'accessory', value: 699, couponCode: 'SPINCABLE', weight: 15, active: true },
        { id: 'p6', sliceIndex: 5, label: '15-Min Data Transfer', type: 'service', value: 500, couponCode: 'SPINDATA', weight: 10, active: true },
        { id: 'p7', sliceIndex: 6, label: '₹250 Flat Discount', type: 'discount', value: 250, couponCode: 'SPIN250', weight: 5, active: true },
        { id: 'p8', sliceIndex: 7, label: 'Premium Tech Kit', type: 'accessory', value: 899, couponCode: 'SPINKIT', weight: 5, active: true },
      ],
      recentLogs: [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600000).toISOString(), prize: '₹1,000 Off Voucher', code: 'SPIN1000-8A72', verified: true },
        { id: 'log-2', timestamp: new Date(Date.now() - 10800000).toISOString(), prize: 'Free Screen Guard', code: 'SPINGUARD-9F11', verified: true },
        { id: 'log-3', timestamp: new Date(Date.now() - 86400000).toISOString(), prize: '₹500 Instant Cash', code: 'SPIN500-4C30', verified: false },
      ]
    },
    blogs: [
      {
        id: "b1",
        slug: "iphone-16-pro-vs-galaxy-s24-ultra-hyderabad",
        title: "iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra: Which Flagship to Pick in Hyderabad?",
        excerpt: "A practical real-world comparison of camera optics, battery longevity under harsh Hyderabad summers, and resale values.",
        author: "Mohammed Asif (Lead Tech Specialist)",
        date: "September 2026",
        readTime: "6 min read",
        published: true,
        content: `Choosing between Apple's Grade 5 Titanium iPhone 16 Pro Max and Samsung's flat-screen Galaxy S24 Ultra comes down to camera workflows and display usability. In Hyderabad's strong outdoor sun, the anti-reflective coating on the S24 Ultra is unmatched for glare reduction. However, for 4K 120fps video capture and seamless long-term resale at our Tolichowki store, the iPhone 16 Pro Max remains the undisputed choice.`
      },
      {
        id: "b2",
        slug: "how-to-spot-fake-apple-accessories",
        title: "How to Spot Counterfeit Apple Chargers and Accessories in India",
        excerpt: "Learn the 5 critical checks to verify genuine Apple 20W adapters, MagSafe pucks, and braided USB-C cables before buying.",
        author: "Kiran Kumar (Quality Assurance)",
        date: "August 2026",
        readTime: "4 min read",
        published: true,
        content: `Counterfeit Apple chargers not only fail within weeks but can severely degrade your device's battery controller IC. Always check for genuine BIS registration marks, crisp laser font alignment, and serial numbers that register with Apple India warranty records.`
      }
    ],
    storeInfo: {
      storeName: "TecnoMart Flagship Tech Hub",
      addressLine1: "Shop #4 & 5, Near Tolichowki Flyover, Main Road",
      addressLine2: "Jubilee Hills Road No. 36 Express Branch",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500008",
      phonePrimary: "+91 90106 67726",
      phoneSecondary: "+91 80080 12345",
      whatsappNumber: "919010667726",
      supportEmail: "support@tecnomart.in",
      workingHoursWeekday: "Monday – Saturday: 10:30 AM – 10:00 PM",
      workingHoursWeekend: "Sunday: 11:00 AM – 9:30 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Tolichowki+Hyderabad"
    },
    legalContent: {
      termsOfService: `Welcome to TecnoMart. All brand-new electronic products sold via our platform and physical outlets carry official manufacturer warranty with sealed Indian retail tax invoices. Same-day deliveries within Hyderabad are dispatched within 3 hours upon confirmation. Refurbished devices come backed with 6 to 12 months direct TecnoMart repair and replacement guarantees.`,
      privacyPolicy: `At TecnoMart, your privacy is strictly protected. Customer phone numbers and addresses collected during order booking and spin-wheel redemptions are solely used for order dispatch, GST invoice generation, and customer verification. We never sell or share customer data with third-party advertising networks.`,
      returnAndWarranty: `All sealed products carry 7-day replacement for technical defects directly verified at our Tolichowki service counter or via authorized brand service centers across Hyderabad. Certified refurbished devices carry our comprehensive replacement warranty.`
    },
    staffUsers: [
      { id: "u1", name: "Executive Superadmin", email: "admin@tecnomart.in", role: "superadmin", department: "Executive", lastActive: "Active Now" },
      { id: "u2", name: "Hyderabad Store Manager", email: "manager@tecnomart.in", role: "manager", department: "Operations", lastActive: "2 hours ago" },
      { id: "u3", name: "Catalog Content Editor", email: "editor@tecnomart.in", role: "editor", department: "Catalog", lastActive: "Yesterday" },
      { id: "u4", name: "Cashier Desk Support", email: "viewer@tecnomart.in", role: "viewer", department: "Support", lastActive: "3 days ago" }
    ]
  };
}

// In-Memory Repository
let dbInstance = null;
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getAdminDb() {
  if (!dbInstance) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dbInstance = JSON.parse(stored);
      } else {
        dbInstance = createDefaultDb();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbInstance));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or parse error, using default DB:', e);
      dbInstance = createDefaultDb();
    }
  }
  return dbInstance;
}

function saveDb(updated) {
  dbInstance = { ...updated };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dbInstance));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
  notifyListeners();
  return dbInstance;
}

export const adminDb = {
  get: getAdminDb,

  // Reset to factory seed
  resetToFactory: () => {
    const fresh = createDefaultDb();
    return saveDb(fresh);
  },

  // PRODUCTS CRUD
  getProducts: () => getAdminDb().products,
  getProductById: (id) => getAdminDb().products.find((p) => p.id === id),
  getDealOfTheDay: () => {
    const db = getAdminDb();
    const id = db.dealOfTheDayProductId;
    if (id) {
      const found = db.products.find((p) => p.id === id);
      if (found) return found;
    }
    return db.products.find((p) => p.type === 'laptops') || db.products[0];
  },
  setDealOfTheDay: (productId) => {
    const db = getAdminDb();
    return saveDb({ ...db, dealOfTheDayProductId: productId });
  },
  saveProduct: (productData) => {
    const db = getAdminDb();
    let updatedProducts = [...db.products];
    const index = updatedProducts.findIndex((p) => p.id === productData.id);

    if (index >= 0) {
      updatedProducts[index] = { ...updatedProducts[index], ...productData };
    } else {
      // Enforce 25 items limit per category
      const targetType = productData.type || 'mobiles';
      if (['laptops', 'mobiles', 'accessories'].includes(targetType)) {
        const count = updatedProducts.filter((p) => p.type === targetType).length;
        if (count >= 25) {
          throw new Error(`Category quota reached: Maximum 25 items allowed in ${targetType.toUpperCase()}. Please edit or remove an existing item.`);
        }
      }

      const newProduct = {
        ...productData,
        id: productData.id || `prod_${Date.now()}`,
        slug: productData.slug || (productData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
      updatedProducts = [newProduct, ...updatedProducts];
    }
    return saveDb({ ...db, products: updatedProducts });
  },
  deleteProduct: (id) => {
    const db = getAdminDb();
    const updatedProducts = db.products.filter((p) => p.id !== id);
    return saveDb({ ...db, products: updatedProducts });
  },

  // CATEGORIES CRUD
  getCategories: () => getAdminDb().categories,
  saveCategory: (categoryData) => {
    const db = getAdminDb();
    let updated = [...db.categories];
    const index = updated.findIndex((c) => c.id === categoryData.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], ...categoryData };
    } else {
      updated.push({
        ...categoryData,
        id: categoryData.id || `cat_${Date.now()}`,
        slug: categoryData.slug || (categoryData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    return saveDb({ ...db, categories: updated });
  },
  deleteCategory: (id) => {
    const db = getAdminDb();
    return saveDb({ ...db, categories: db.categories.filter((c) => c.id !== id) });
  },

  // REPAIRS CRUD
  getRepairs: () => getAdminDb().repairs,
  saveRepair: (repairData) => {
    const db = getAdminDb();
    let updated = [...db.repairs];
    const index = updated.findIndex((r) => r.id === repairData.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], ...repairData };
    } else {
      updated.push({ ...repairData, id: repairData.id || `rep_${Date.now()}` });
    }
    return saveDb({ ...db, repairs: updated });
  },
  deleteRepair: (id) => {
    const db = getAdminDb();
    return saveDb({ ...db, repairs: db.repairs.filter((r) => r.id !== id) });
  },

  // PC CONFIGURATOR PARTS CRUD
  getPcParts: () => getAdminDb().pcParts,
  savePcPart: (partData) => {
    const db = getAdminDb();
    let updated = [...db.pcParts];
    const index = updated.findIndex((p) => p.id === partData.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], ...partData };
    } else {
      updated.push({ ...partData, id: partData.id || `part_${Date.now()}` });
    }
    return saveDb({ ...db, pcParts: updated });
  },
  deletePcPart: (id) => {
    const db = getAdminDb();
    return saveDb({ ...db, pcParts: db.pcParts.filter((p) => p.id !== id) });
  },

  // SPIN SETTINGS CRUD
  getSpinSettings: () => getAdminDb().spinSettings,
  saveSpinPrize: (prizeData) => {
    const db = getAdminDb();
    const currentSettings = db.spinSettings || { prizes: [], recentLogs: [] };
    let updatedPrizes = [...(currentSettings.prizes || [])];
    const index = updatedPrizes.findIndex((p) => p.id === prizeData.id);
    if (index >= 0) {
      updatedPrizes[index] = { ...updatedPrizes[index], ...prizeData };
    } else {
      if (updatedPrizes.length >= 8) {
        throw new Error("The spin machine is strictly locked to 8 prize slices. You can only edit the existing 8 slices.");
      }
      updatedPrizes.push({ ...prizeData, id: prizeData.id || `p_${Date.now()}` });
    }
    return saveDb({
      ...db,
      spinSettings: { ...currentSettings, prizes: updatedPrizes }
    });
  },
  deleteSpinPrize: (id) => {
    const db = getAdminDb();
    const currentSettings = db.spinSettings || { prizes: [], recentLogs: [] };
    if (currentSettings.prizes && currentSettings.prizes.length <= 8) {
      throw new Error("Cannot delete slice: The wheel geometry is locked to 8 sectors. You can edit this slice instead.");
    }
    return saveDb({
      ...db,
      spinSettings: { ...currentSettings, prizes: currentSettings.prizes.filter((p) => p.id !== id) }
    });
  },
  addSpinLog: (log) => {
    const db = getAdminDb();
    const currentSettings = db.spinSettings || { prizes: [], recentLogs: [] };
    const updatedLogs = [{ ...log, id: `log_${Date.now()}` }, ...(currentSettings.recentLogs || [])];
    return saveDb({
      ...db,
      spinSettings: { ...currentSettings, recentLogs: updatedLogs.slice(0, 50) }
    });
  },

  // BLOGS CRUD
  getBlogs: () => getAdminDb().blogs,
  saveBlog: (blogData) => {
    const db = getAdminDb();
    let updated = [...db.blogs];
    const index = updated.findIndex((b) => b.id === blogData.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], ...blogData };
    } else {
      updated.unshift({
        ...blogData,
        id: blogData.id || `b_${Date.now()}`,
        slug: blogData.slug || (blogData.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    return saveDb({ ...db, blogs: updated });
  },
  deleteBlog: (id) => {
    const db = getAdminDb();
    return saveDb({ ...db, blogs: db.blogs.filter((b) => b.id !== id) });
  },

  // STORE INFO
  getStoreInfo: () => getAdminDb().storeInfo,
  saveStoreInfo: (info) => {
    const db = getAdminDb();
    return saveDb({ ...db, storeInfo: { ...db.storeInfo, ...info } });
  },

  // LEGAL POLICIES
  getLegalContent: () => getAdminDb().legalContent,
  saveLegalContent: (legal) => {
    const db = getAdminDb();
    return saveDb({ ...db, legalContent: { ...db.legalContent, ...legal, updatedAt: new Date().toISOString() } });
  },

  // STAFF USERS CRUD
  getStaffUsers: () => getAdminDb().staffUsers,
  saveStaffUser: (userData) => {
    const db = getAdminDb();
    let updated = [...db.staffUsers];
    const index = updated.findIndex((u) => u.id === userData.id);
    if (index >= 0) {
      updated[index] = { ...updated[index], ...userData };
    } else {
      updated.push({
        ...userData,
        id: userData.id || `u_${Date.now()}`,
        lastActive: 'Just added'
      });
    }
    return saveDb({ ...db, staffUsers: updated });
  },
  deleteStaffUser: (id) => {
    const db = getAdminDb();
    return saveDb({ ...db, staffUsers: db.staffUsers.filter((u) => u.id !== id) });
  }
};

/**
 * Custom React Hook to subscribe to adminStore changes
 */
export function useAdminStore(selector = (state) => state) {
  const subscribe = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const getSnapshot = () => getAdminDb();

  const state = useSyncExternalStore(subscribe, getSnapshot);
  return selector(state);
}
