"use client";

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Wrench,
  Cpu,
  Sparkles,
  BookOpen,
  MapPin,
  FileText,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '@/lib/admin/adminAuth';

export const ToastContext = React.createContext({
  showToast: (msg, type) => {},
});

export function useAdminToast() {
  return React.useContext(ToastContext);
}

export default function AdminLayout({ children, activeTab = 'dashboard' }) {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/myadmin', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Pricing', path: '/myadmin/products', icon: Package },
    { id: 'categories', label: 'Categories', path: '/myadmin/categories', icon: Layers },
    { id: 'repairs', label: 'Repairs & Timings', path: '/myadmin/repairs', icon: Wrench },
    { id: 'configurator', label: 'PC Configurator', path: '/myadmin/configurator', icon: Cpu },
    { id: 'spin', label: 'Spin Machine', path: '/myadmin/spin', icon: Sparkles },
    { id: 'blogs', label: 'Blogs & Guides', path: '/myadmin/blogs', icon: BookOpen },
    { id: 'store-info', label: 'Store Contact & Info', path: '/myadmin/store-info', icon: MapPin },
    { id: 'copy-content', label: 'Copy & Legal Pages', path: '/myadmin/copy-content', icon: FileText },
    { id: 'users', label: 'Staff Management', path: '/myadmin/users', icon: Users },
  ];

  // Hide blogs & guides, dashboard, and staff management sections from admin sidebar without deleting
  const navItems = allNavItems.filter(
    (item) => !['dashboard', 'blogs', 'users'].includes(item.id)
  );

  const handleLogout = () => {
    logout();
    navigate('/myadmin/login');
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-[#F7F6F3] text-neutral-900 font-sans flex flex-col antialiased">
        
        {/* TOP MOBILE BAR */}
        <header className="lg:hidden h-14 bg-white border-b border-neutral-200 px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-mono font-bold text-sm tracking-tight text-neutral-950">
              TECNOMART / ADMIN
            </span>
          </div>
          <Link
            to="/"
            target="_blank"
            className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </header>

        <div className="flex-1 flex">
          
          {/* DESKTOP SIDEBAR */}
          <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-200
            lg:translate-x-0 lg:static lg:w-64
            ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          `}>
            {/* Brand Header */}
            <div>
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-mono font-black text-sm tracking-tight text-neutral-950 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    <span>TECNOMART</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-0.5">
                    Operations Center
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="lg:hidden p-1 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="p-3 space-y-0.5">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Store Modules
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.id === 'dashboard' && location.pathname === '/myadmin');
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors
                        ${isActive
                          ? 'bg-[#111111] text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Session & Logout Footer */}
            <div className="p-3 border-t border-neutral-200 bg-neutral-50/50">
              <div className="p-2.5 rounded-lg bg-white border border-neutral-200/80 mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900 truncate max-w-[140px]">
                    {user?.name || "Staff Admin"}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EDF3EC] text-[#346538] font-bold">
                    {user?.role || "superadmin"}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 truncate font-mono">
                  {user?.email || "admin@tecnomart.in"}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  to="/"
                  target="_blank"
                  className="flex-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 flex items-center justify-center gap-1"
                >
                  <span>Storefront</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium text-red-700 hover:bg-red-50 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT WORKSPACE */}
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Desktop Top Header */}
            <header className="hidden lg:flex h-14 bg-white border-b border-neutral-200 px-8 items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Admin System /
                </span>
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {navItems.find((n) => n.id === activeTab)?.label || 'Overview'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-neutral-600">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDF3EC] text-[#346538] font-mono text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#346538] animate-pulse" />
                  <span>Live Storefront Reactive Sync</span>
                </span>
                <Link
                  to="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 font-semibold text-neutral-800 hover:text-neutral-950 hover:underline"
                >
                  <span>Visit Customer Store</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </header>

            {/* Page Body */}
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* FLOATING TOAST NOTIFICATIONS */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
                pointer-events-auto p-3.5 rounded-xl border shadow-lg text-xs font-semibold flex items-center gap-2.5 transition-all
                ${toast.type === 'error'
                  ? 'bg-[#FDEBEC] text-[#9F2F2D] border-[#FDEBEC]'
                  : 'bg-[#111111] text-white border-neutral-800'
                }
              `}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              )}
              <span className="flex-1 leading-snug">{toast.message}</span>
            </div>
          ))}
        </div>

      </div>
    </ToastContext.Provider>
  );
}
