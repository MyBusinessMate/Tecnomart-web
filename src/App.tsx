import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import CartDrawer from './components/redesign/CartDrawer';
import CheckoutModal from './components/redesign/CheckoutModal';
import RepairModal from './components/redesign/RepairModal';
import WishlistDrawer from './components/redesign/WishlistDrawer';
import WhatsAppWidget from './components/redesign/WhatsAppWidget';
import BottomDock from './components/redesign/BottomDock';
import LuckyWheelModal from './components/redesign/LuckyWheelModal';
import TimedSpinPopup from './components/redesign/TimedSpinPopup';

// Pages
import Page from './app/page';
import LaptopsPage from './app/laptops/page';
import MobilesPage from './app/mobiles/page';
import AccessoriesPage from './app/accessories/page';
import GamingPage from './app/gaming/page';
import RepairsPage from './app/repairs/page';
import RefurbishedPage from './app/refurbished/page';
import PcBuildsPage from './app/pc-builds/page';
import DealsPage from './app/deals/page';
import AboutPage from './app/about/page';
import ContactPage from './app/contact/page';
import PrivacyPage from './app/privacy/page';
import TermsPage from './app/terms/page';
import ComparePage from './app/compare/page';
import EmiCalculatorPage from './app/emi-calculator/page';
import ExchangePage from './app/exchange/page';
import CorporatePage from './app/corporate/page';
import StudentsPage from './app/students/page';
import CartPage from './app/cart/page';
import SpinPage from './app/spin/page';
import ScanPage from './pages/ScanPage';
import NotFoundPage from './app/not-found/page';

// Product detail dynamic routing
import LaptopDetailClient from './app/laptops/[slug]/LaptopDetailClient';
import MobileDetailClient from './app/mobiles/[slug]/MobileDetailClient';
import AccessoryDetailClient from './app/accessories/[slug]/AccessoryDetailClient';
import GamingDetailClient from './app/gaming/[slug]/GamingDetailClient';
import RefurbishedDetailClient from './app/refurbished/[slug]/RefurbishedDetailClient';
import SitemapPage from './app/sitemap/page';

// Admin Pages (Loaded for Local Testing)
const AdminLoginPage = React.lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = React.lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminCategoriesPage = React.lazy(() => import('./pages/admin/AdminCategoriesPage'));
const AdminRepairsPage = React.lazy(() => import('./pages/admin/AdminRepairsPage'));
const AdminConfiguratorPage = React.lazy(() => import('./pages/admin/AdminConfiguratorPage'));
const AdminSpinPage = React.lazy(() => import('./pages/admin/AdminSpinPage'));
const AdminBlogsPage = React.lazy(() => import('./pages/admin/AdminBlogsPage'));
const AdminStoreInfoPage = React.lazy(() => import('./pages/admin/AdminStoreInfoPage'));
const AdminCopyContentPage = React.lazy(() => import('./pages/admin/AdminCopyContentPage'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/AdminUsersPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LaptopDetailPage() {
  const path = window.location.pathname;
  const slug = path.split('/').filter(Boolean).pop() || '';
  return <LaptopDetailClient slug={slug} />;
}

function MobileDetailPage() {
  const path = window.location.pathname;
  const slug = path.split('/').filter(Boolean).pop() || '';
  return <MobileDetailClient slug={slug} />;
}

function AccessoryDetailPage() {
  const path = window.location.pathname;
  const slug = path.split('/').filter(Boolean).pop() || '';
  return <AccessoryDetailClient slug={slug} />;
}

function GamingDetailPage() {
  const path = window.location.pathname;
  const slug = path.split('/').filter(Boolean).pop() || '';
  return <GamingDetailClient slug={slug} />;
}

function RefurbishedDetailPage() {
  const path = window.location.pathname;
  const slug = path.split('/').filter(Boolean).pop() || '';
  return <RefurbishedDetailClient slug={slug} />;
}

import { isSpinSubdomain, isScanSubdomain, isProductionDomain } from './lib/domain';

function SpinRedirect({ superMode = false }: { superMode?: boolean }) {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const target = superMode ? 'https://spin.tecnomart.in/supertechie' : 'https://spin.tecnomart.in';
      if (isProductionDomain()) {
        window.location.replace(target);
      }
    }
  }, [superMode]);

  // In local development when not on production domain, render SpinPage directly
  if (!isProductionDomain()) {
    return <SpinPage forceSuperMode={superMode} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-2xl border-2 border-[#F5B800] border-t-transparent animate-spin" />
        <p className="text-sm font-mono text-neutral-800 font-bold tracking-wide">
          REDIRECTING TO SPIN.TECNOMART.IN...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [isSpinOpen, setIsSpinOpen] = React.useState(false);
  const onSpinSubdomain = isSpinSubdomain();
  const onScanSubdomain = isScanSubdomain();

  // Dedicated lightweight Linktree experience when accessed via scan.tecnomart.in
  if (onScanSubdomain) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ScanPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="*" element={<ScanPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Dedicated lightweight experience when accessed via spin.tecnomart.in
  if (onSpinSubdomain) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SpinPage />} />
          <Route path="/spin" element={<SpinPage />} />
          <Route path="/supertechie" element={<SpinPage forceSuperMode={true} />} />
          <Route path="*" element={<SpinPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Standard E-commerce Storefront on tecnomart.in
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ShopProvider>
        <Routes>
          <Route path="/" element={<Page />} />
          
          {/* Category catalog and product pages */}
          <Route path="/laptops" element={<LaptopsPage />} />
          <Route path="/laptops/:slug" element={<LaptopDetailPage />} />

          <Route path="/mobiles" element={<MobilesPage />} />
          <Route path="/mobiles/:slug" element={<MobileDetailPage />} />

          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:slug" element={<AccessoryDetailPage />} />

          <Route path="/gaming" element={<GamingPage />} />
          <Route path="/gaming/:slug" element={<GamingDetailPage />} />

          <Route path="/refurbished" element={<RefurbishedPage />} />
          <Route path="/refurbished/:slug" element={<RefurbishedDetailPage />} />

          <Route path="/repairs" element={<RepairsPage />} />
          <Route path="/pc-builds" element={<PcBuildsPage />} />
          <Route path="/build-your-setup" element={<PcBuildsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/spin" element={<SpinRedirect />} />
          <Route path="/supertechie" element={<SpinRedirect superMode={true} />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* Super Admin Routes (Local Testing) */}
          <Route path="/myadmin/login" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminLoginPage /></React.Suspense>} />
          <Route path="/myadmin" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminDashboardPage /></React.Suspense>} />
          <Route path="/myadmin/products" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminProductsPage /></React.Suspense>} />
          <Route path="/myadmin/categories" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminCategoriesPage /></React.Suspense>} />
          <Route path="/myadmin/repairs" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminRepairsPage /></React.Suspense>} />
          <Route path="/myadmin/configurator" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminConfiguratorPage /></React.Suspense>} />
          <Route path="/myadmin/spin" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminSpinPage /></React.Suspense>} />
          <Route path="/myadmin/blogs" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminBlogsPage /></React.Suspense>} />
          <Route path="/myadmin/store-info" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminStoreInfoPage /></React.Suspense>} />
          <Route path="/myadmin/copy-content" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminCopyContentPage /></React.Suspense>} />
          <Route path="/myadmin/users" element={<React.Suspense fallback={<div className="p-8 font-mono text-sm text-neutral-500">Loading Admin...</div>}><AdminUsersPage /></React.Suspense>} />

          {/* 404 Page */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Overlays & Widgets */}
        <CheckoutModal />
        <RepairModal />
        <WishlistDrawer />
        <WhatsAppWidget />
        <BottomDock onOpenSpin={() => setIsSpinOpen(true)} />
        <LuckyWheelModal isOpen={isSpinOpen} onClose={() => setIsSpinOpen(false)} />
        <TimedSpinPopup />
      </ShopProvider>
    </BrowserRouter>
  );
}
