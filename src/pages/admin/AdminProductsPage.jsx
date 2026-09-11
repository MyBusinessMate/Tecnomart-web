"use client";

import React, { useState, useMemo } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronDown,
  ArrowUpDown,
  Tag,
  Eye,
  Flame,
  Star,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AdminProductsPage() {
  const { showToast } = useAdminToast();
  const products = useAdminStore((s) => s.products || []);
  const categories = useAdminStore((s) => s.categories || []);
  const dealOfTheDayProductId = useAdminStore((s) => s.dealOfTheDayProductId);

  // Category counts (Enforce max 25 quota)
  const laptopCount = useMemo(() => products.filter((p) => p.type === 'laptops').length, [products]);
  const mobileCount = useMemo(() => products.filter((p) => p.type === 'mobiles').length, [products]);
  const accessoryCount = useMemo(() => products.filter((p) => p.type === 'accessories').length, [products]);

  // Current active Deal of the Day
  const currentDeal = useMemo(() => {
    return products.find((p) => p.id === dealOfTheDayProductId) || products.find((p) => p.type === 'laptops') || products[0];
  }, [products, dealOfTheDayProductId]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [displayLimit, setDisplayLimit] = useState(15);

  // Modal states
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form states for Add / Edit
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    type: 'mobiles',
    category: 'Smartphones',
    price: '',
    originalPrice: '',
    rawPrice: 0,
    discountPercent: '',
    ram: '',
    storage: '',
    tagline: '',
    stockStatus: 'In Stock at Tolichowki Store',
    badge: '',
    warrantyPeriod: '1 Year Official Warranty',
    image: '',
    tags: ['new'],
    color: '',
  });

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    if (selectedType !== 'all') {
      list = list.filter((p) => p.type === selectedType);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.rawPrice || 0) - (b.rawPrice || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.rawPrice || 0) - (a.rawPrice || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return list;
  }, [products, searchQuery, selectedType, sortBy]);

  const visibleProducts = filteredProducts.slice(0, displayLimit);

  // Open Edit Modal
  const handleOpenEdit = (prod) => {
    setFormData({
      id: prod.id,
      name: prod.name || '',
      brand: prod.brand || '',
      type: prod.type || 'mobiles',
      category: prod.category || 'Smartphones',
      price: prod.price || '',
      originalPrice: prod.originalPrice || '',
      rawPrice: prod.rawPrice || 0,
      discountPercent: prod.discountPercent || '',
      ram: prod.ram || '',
      storage: prod.storage || '',
      tagline: prod.tagline || '',
      stockStatus: prod.stockStatus || 'In Stock',
      badge: prod.badge || '',
      warrantyPeriod: prod.warrantyPeriod || '1 Year Official Warranty',
      image: (prod.images && prod.images[0]) || prod.image || '',
      tags: Array.isArray(prod.tags) ? prod.tags : (prod.choice ? [prod.choice] : ['new']),
      color: prod.color || '',
    });
    setEditingProduct(prod);
    setIsCreating(false);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      id: `prod_${Date.now()}`,
      name: '',
      brand: 'Apple',
      type: 'mobiles',
      category: 'Smartphones',
      price: '₹99,999',
      originalPrice: '₹1,09,999',
      rawPrice: 99999,
      discountPercent: '9% OFF',
      ram: '8GB',
      storage: '256GB',
      tagline: 'Brand-new sealed Indian retail unit with official warranty.',
      stockStatus: 'In Stock at Tolichowki Store',
      badge: 'NEW ARRIVAL',
      warrantyPeriod: '1 Year Official Manufacturer Warranty',
      image: '/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp',
      tags: ['new', 'best'],
      color: 'Black',
    });
    setEditingProduct(null);
    setIsCreating(true);
  };

  // Toggle tag in form
  const toggleTag = (tag) => {
    const currentTags = formData.tags || [];
    if (currentTags.includes(tag)) {
      setFormData({ ...formData, tags: currentTags.filter((t) => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...currentTags, tag] });
    }
  };

  // Set active Deal of the Day
  const handleSetDealOfTheDay = (productId) => {
    adminDb.setDealOfTheDay(productId);
    const target = products.find((p) => p.id === productId);
    showToast(`"Deal of the Day" updated to ${target ? target.name : productId}!`);
  };

  // Save product (Add or Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Enforce 25 items quota for laptops, mobiles, accessories
    if (isCreating && ['laptops', 'mobiles', 'accessories'].includes(formData.type)) {
      const currentCount = products.filter((p) => p.type === formData.type).length;
      if (currentCount >= 25) {
        showToast(`Limit reached: Maximum 25 items allowed in ${formData.type.toUpperCase()}. Delete or edit existing items.`, 'error');
        return;
      }
    }

    const raw = parseInt(formData.rawPrice || (formData.price || '').replace(/[^0-9]/g, ''), 10) || 0;
    const formattedPrice = formData.price.startsWith('₹') ? formData.price : `₹${Number(raw).toLocaleString('en-IN')}`;

    const payload = {
      ...formData,
      rawPrice: raw,
      price: formattedPrice,
      images: [formData.image || '/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp'],
    };

    try {
      adminDb.saveProduct(payload);
      showToast(isCreating ? "Product added successfully!" : "Product updated successfully!");
      setIsCreating(false);
      setEditingProduct(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Execute confirmed deletion
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deleteProduct(deleteTarget.id);
    showToast(`Deleted "${deleteTarget.name}" successfully.`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout activeTab="products">
      <div className="space-y-5">
        
        {/* Header and Add Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Products & Live Pricing
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Manage inventory, live retail rates, badges, stock availability, and specs.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Category Quotas & Inventory Limits (Max 25 Per Category) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Laptops Catalog Limit</div>
              <div className="text-base font-black text-neutral-900 mt-0.5">{laptopCount} <span className="text-neutral-400 text-xs font-normal">/ 25 Max</span></div>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${laptopCount >= 25 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              {laptopCount >= 25 ? 'MAX CAP (25/25)' : `${25 - laptopCount} SLOTS OPEN`}
            </div>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Mobiles Catalog Limit</div>
              <div className="text-base font-black text-neutral-900 mt-0.5">{mobileCount} <span className="text-neutral-400 text-xs font-normal">/ 25 Max</span></div>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${mobileCount >= 25 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              {mobileCount >= 25 ? 'MAX CAP (25/25)' : `${25 - mobileCount} SLOTS OPEN`}
            </div>
          </div>
          <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Accessories Catalog Limit</div>
              <div className="text-base font-black text-neutral-900 mt-0.5">{accessoryCount} <span className="text-neutral-400 text-xs font-normal">/ 25 Max</span></div>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${accessoryCount >= 25 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              {accessoryCount >= 25 ? 'MAX CAP (25/25)' : `${25 - accessoryCount} SLOTS OPEN`}
            </div>
          </div>
        </div>

        {/* Deal of the Day Live Controller Card */}
        {currentDeal && (
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-2xl p-4 sm:p-5 border border-amber-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-neutral-800 border border-neutral-700 p-1 flex items-center justify-center flex-shrink-0">
                <img
                  src={(currentDeal.images && currentDeal.images[0]) || currentDeal.image || '/webp/landing/apple-macbook-pro-16-space-black-glow.webp'}
                  alt={currentDeal.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>Live Deal of the Day</span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{currentDeal.brand}</span>
                </div>
                <h2 className="text-sm sm:text-base font-black text-white mt-1">{currentDeal.name}</h2>
                <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                  {currentDeal.price} <span className="text-neutral-400 line-through text-[11px] font-normal">{currentDeal.originalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-neutral-300 font-medium whitespace-nowrap">Change Deal:</span>
              <select
                value={currentDeal.id}
                onChange={(e) => handleSetDealOfTheDay(e.target.value)}
                className="bg-neutral-800 text-white border border-neutral-700 rounded-lg text-xs font-semibold px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer max-w-xs truncate"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.type?.toUpperCase()}] {p.name} ({p.price})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs flex flex-col md:flex-row md:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name, brand, or specs..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold px-3 py-2 text-neutral-900 focus:outline-none cursor-pointer"
            >
              <option value="all">All Departments ({products.length})</option>
              <option value="mobiles">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="gaming">Gaming Rigs</option>
              <option value="accessories">Accessories</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold px-3 py-2 text-neutral-900 focus:outline-none cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-4">Product Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Specs (RAM / Store)</th>
                  <th className="py-3 px-4">Live Retail Price</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {visibleProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-neutral-400">
                      No matching products found. Try adjusting your search or category filter.
                    </td>
                  </tr>
                ) : (
                  visibleProducts.map((p) => {
                    const img = (p.images && p.images[0]) || p.image || '/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp';
                    return (
                      <tr key={p.id} className="hover:bg-neutral-50/60 transition-colors">
                        {/* Title & Brand */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200/80 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              <img
                                src={img}
                                alt={p.name}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                            <div className="max-w-xs">
                              <div className="font-bold text-neutral-950 truncate">{p.name}</div>
                              <div className="text-[11px] text-neutral-500">{p.brand}</div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 font-mono text-[11px] uppercase text-neutral-600">
                          {p.category || p.type}
                        </td>

                        {/* Specs */}
                        <td className="py-3 px-4 text-neutral-700">
                          <div className="font-mono text-[11px]">
                            {p.ram ? `RAM: ${p.ram}` : '—'}
                          </div>
                          <div className="font-mono text-[11px] text-neutral-500">
                            {p.storage ? `Storage: ${p.storage}` : '—'}
                          </div>
                        </td>

                        {/* Live Price & MRP */}
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-neutral-950 text-xs">
                            {p.price}
                          </div>
                          {p.originalPrice && (
                            <div className="font-mono text-[11px] text-neutral-400 line-through">
                              {p.originalPrice}
                            </div>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#EDF3EC] text-[#346538]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#346538]" />
                            <span>IN STOCK</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleSetDealOfTheDay(p.id)}
                              title={p.id === currentDeal?.id ? "Active Deal of the Day" : "Promote to Deal of the Day"}
                              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                                p.id === currentDeal?.id
                                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                                  : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100'
                              }`}
                            >
                              <Flame className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              title="Edit product details & pricing"
                              className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(p)}
                              title="Delete product record"
                              className="p-1.5 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* View More Pagination */}
          {visibleProducts.length < filteredProducts.length && (
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
              <button
                onClick={() => setDisplayLimit((prev) => prev + 15)}
                className="px-4 py-2 text-xs font-bold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer shadow-2xs"
              >
                View More Items ({filteredProducts.length - visibleProducts.length} remaining)
              </button>
            </div>
          )}
        </div>

        {/* ADD / EDIT PRODUCT MODAL */}
        {(isCreating || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Add New Product" : `Edit Product: ${formData.name}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Apple iPhone 16 Pro Max"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Apple, Samsung, ASUS"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['Apple', 'Samsung', 'ASUS', 'Lenovo', 'Dell', 'HP', 'OnePlus', 'Sony', 'Logitech', 'Anker'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, brand: b })}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                            formData.brand?.toLowerCase() === b.toLowerCase() ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Department / Section *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    >
                      <option value="mobiles">Smartphones ({mobileCount}/25)</option>
                      <option value="laptops">Laptops & MacBooks ({laptopCount}/25)</option>
                      <option value="accessories">Accessories ({accessoryCount}/25)</option>
                      <option value="gaming">Gaming Rigs</option>
                      <option value="refurbished">Certified Refurbished</option>
                    </select>
                  </div>

                  {/* Category Title */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Category Display Label
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Creator Laptops, Flagships"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Filter Choice Tags (refurbished, new, best, popular) */}
                  <div className="sm:col-span-2 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[11px] font-mono font-bold uppercase text-neutral-800">
                        Filter Choice Tags (Storefront Connection)
                      </label>
                      <span className="text-[10px] text-amber-600 font-mono font-bold">Matches "Filter by Choice"</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'new', label: 'New Arrival' },
                        { id: 'refurbished', label: 'Refurbished' },
                        { id: 'best', label: 'Best Seller' },
                        { id: 'popular', label: 'Popular Pick' },
                      ].map((t) => {
                        const isChecked = (formData.tags || []).includes(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => toggleTag(t.id)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border flex items-center justify-between transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                            }`}
                          >
                            <span>{t.label}</span>
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isChecked ? 'bg-amber-400 text-neutral-950 font-black' : 'border border-neutral-300'}`}>
                              {isChecked ? '✓' : ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Price */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Live Retail Price (₹) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="₹1,44,900"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Raw Price Numeric */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Raw Numeric Price (for sorting) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.rawPrice}
                      onChange={(e) => setFormData({ ...formData, rawPrice: parseInt(e.target.value, 10) || 0 })}
                      placeholder="144900"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Original MRP */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Original MRP (₹)
                    </label>
                    <input
                      type="text"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="₹1,49,900"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Discount text */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Discount Badge Tag
                    </label>
                    <input
                      type="text"
                      value={formData.discountPercent}
                      onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                      placeholder="3% OFF"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* RAM Filter Value */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      RAM Filter Value
                    </label>
                    <input
                      type="text"
                      value={formData.ram}
                      onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                      placeholder="e.g. 8GB, 12GB, 16GB, 32GB"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Storage Filter Value */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Storage Filter Value
                    </label>
                    <input
                      type="text"
                      value={formData.storage}
                      onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                      placeholder="e.g. 128GB, 256GB, 512GB, 1TB"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>

                  {/* Color Variant */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Color Variant
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="e.g. Black, Silver, Titanium, Space Grey"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Short Product Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Grade 5 Titanium body. 4K 120fps video recording."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                {/* Image Path */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Image Asset Path or WebP URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none font-mono"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Create & Publish" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION SAFETY MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Confirm Product Deletion"
          message="Are you sure you want to permanently delete this product? It will immediately disappear from the live storefront."
          itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.price})` : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
