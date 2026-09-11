"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import {
  Package,
  Layers,
  Wrench,
  Cpu,
  Sparkles,
  BookOpen,
  MapPin,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { showToast } = useAdminToast();
  const products = useAdminStore((s) => s.products || []);
  const categories = useAdminStore((s) => s.categories || []);
  const repairs = useAdminStore((s) => s.repairs || []);
  const pcParts = useAdminStore((s) => s.pcParts || []);
  const spinSettings = useAdminStore((s) => s.spinSettings || { prizes: [], recentLogs: [] });
  const blogs = useAdminStore((s) => s.blogs || []);
  const storeInfo = useAdminStore((s) => s.storeInfo || {});

  const totalValuation = products.reduce((sum, p) => sum + (p.rawPrice || 0), 0);

  const handleResetDefaults = () => {
    if (window.confirm("Restore factory default fixtures for products, repairs, and pricing? Any custom test additions will be reset.")) {
      adminDb.resetToFactory();
      showToast("Store catalog reset to default factory state.");
    }
  };

  return (
    <AdminLayout activeTab="dashboard">
      <div className="space-y-6">
        
        {/* Header Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Operations Overview
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Real-time synchronization across {products.length} products and {categories.length} department categories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reset Factory Data</span>
            </button>
            <Link
              to="/myadmin/products"
              className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#111111] hover:bg-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Manage Products</span>
            </Link>
          </div>
        </div>

        {/* BENTO STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Total Products */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Catalog Items</span>
              <Package className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-neutral-950 tracking-tight font-mono">
                {products.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
                <span>Total Value:</span>
                <span className="font-mono font-bold text-neutral-800">
                  ₹{totalValuation.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link to="/myadmin/products" className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                <span>View Products</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDF3EC] text-[#346538] font-bold">LIVE</span>
            </div>
          </div>

          {/* 2. Categories */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Categories</span>
              <Layers className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-neutral-950 tracking-tight font-mono">
                {categories.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                Mobiles, Laptops, Gaming, Audio & Refurbished
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link to="/myadmin/categories" className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                <span>Edit Taxonomy</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E1F3FE] text-[#1F6C9F] font-bold">5 ACTIVE</span>
            </div>
          </div>

          {/* 3. Repair Services */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Repair Catalog</span>
              <Wrench className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-neutral-950 tracking-tight font-mono">
                {repairs.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                Screens, Batteries, Liquid Damage & Soldering
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link to="/myadmin/repairs" className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                <span>Manage Timings</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FBF3DB] text-[#956400] font-bold">30-MIN AVG</span>
            </div>
          </div>

          {/* 4. Spin Machine Rewards */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Spin Engine</span>
              <Sparkles className="w-4 h-4 text-neutral-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-neutral-950 tracking-tight font-mono">
                {(spinSettings.prizes || []).length} Slices
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                {(spinSettings.recentLogs || []).length} Verified claims logged
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <Link to="/myadmin/spin" className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                <span>Prize Weights</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDF3EC] text-[#346538] font-bold">ACTIVE</span>
            </div>
          </div>

        </div>

        {/* QUICK SHORTCUTS & SYSTEM HEALTH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Quick Action Bento */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Quick Management Tasks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/myadmin/products"
                className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100/80 transition-colors group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-neutral-950 flex items-center gap-1">
                    <span>Add / Edit Products</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Update prices, discounts, stock levels, and specs.
                  </div>
                </div>
              </Link>

              <Link
                to="/myadmin/repairs"
                className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100/80 transition-colors group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-neutral-950 flex items-center gap-1">
                    <span>Repair Rates & Timings</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Change screen replacement and battery pricing.
                  </div>
                </div>
              </Link>

              <Link
                to="/myadmin/configurator"
                className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100/80 transition-colors group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-neutral-950 flex items-center gap-1">
                    <span>PC Configurator Parts</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Update GPU, CPU, RAM & SSD component rates.
                  </div>
                </div>
              </Link>

              <Link
                to="/myadmin/spin"
                className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/60 hover:bg-neutral-100/80 transition-colors group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-neutral-950 flex items-center gap-1">
                    <span>Spin & Win Machine</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Set wheel prize probability weights and codes.
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Store Info & Location Status */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Store Coordinates
                </span>
                <MapPin className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-sm font-bold text-neutral-900">
                {storeInfo.storeName || "TecnoMart Hyderabad"}
              </div>
              <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {storeInfo.addressLine1}<br />
                {storeInfo.city}, {storeInfo.state} - {storeInfo.pincode}
              </div>
              <div className="mt-3 text-xs font-mono text-neutral-700">
                <div>Phone: <span className="font-bold">{storeInfo.phonePrimary}</span></div>
                <div>WhatsApp: <span className="font-bold">{storeInfo.whatsappNumber}</span></div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <Link
                to="/myadmin/store-info"
                className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
              >
                <span>Edit Contact Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDF3EC] text-[#346538] font-bold">OPEN</span>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
