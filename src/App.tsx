import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';

// Global Overlays & Modals - Lazy load to eliminate unused JS on initial render
const CartDrawer = React.lazy(() => import('./components/redesign/CartDrawer'));
const CheckoutModal = React.lazy(() => import('./components/redesign/CheckoutModal'));
const RepairModal = React.lazy(() => import('./components/redesign/RepairModal'));
const WishlistDrawer = React.lazy(() => import('./components/redesign/WishlistDrawer'));
const LuckyWheelModal = React.lazy(() => import('./components/redesign/LuckyWheelModal'));
const WhatsAppWidget = React.lazy(() => import('./components/redesign/WhatsAppWidget'));
const BottomDock = React.lazy(() => import('./components/redesign/BottomDock'));
const TimedSpinPopup = React.lazy(() => import('./components/redesign/TimedSpinPopup'));

// Pages - Eagerly load primary storefront home
import Page from './app/page';

// Code-split secondary storefront routes for ultra-fast initial load & 90+ Lighthouse score
const LaptopsPage = React.lazy(() => import('./app/laptops/page'));
const MobilesPage = React.lazy(() => import('./app/mobiles/page'));
const AccessoriesPage = React.lazy(() => import('./app/accessories/page'));
const GamingPage = React.lazy(() => import('./app/gaming/page'));
const RepairsPage = React.lazy(() => import('./app/repairs/page'));
const RefurbishedPage = React.lazy(() => import('./app/refurbished/page'));
const PcBuildsPage = React.lazy(() => import('./app/pc-builds/page'));
const DealsPage = React.lazy(() => import('./app/deals/page'));
const AboutPage = React.lazy(() => import('./app/about/page'));
const ContactPage = React.lazy(() => import('./app/contact/page'));
const PrivacyPage = React.lazy(() => import('./app/privacy/page'));
const TermsPage = React.lazy(() => import('./app/terms/page'));
const ComparePage = React.lazy(() => import('./app/compare/page'));
const EmiCalculatorPage = React.lazy(() => import('./app/emi-calculator/page'));
const ExchangePage = React.lazy(() => import('./app/exchange/page'));
const CorporatePage = React.lazy(() => import('./app/corporate/page'));
const StudentsPage = React.lazy(() => import('./app/students/page'));
const CartPage = React.lazy(() => import('./app/cart/page'));
const SpinPage = React.lazy(() => import('./app/spin/page'));
const ScanPage = React.lazy(() => import('./pages/ScanPage'));
const NotFoundPage = React.lazy(() => import('./app/not-found/page'));

// Product detail dynamic routing
const LaptopDetailClient = React.lazy(() => import('./app/laptops/[slug]/LaptopDetailClient'));
const MobileDetailClient = React.lazy(() => import('./app/mobiles/[slug]/MobileDetailClient'));
const AccessoryDetailClient = React.lazy(() => import('./app/accessories/[slug]/AccessoryDetailClient'));
const GamingDetailClient = React.lazy(() => import('./app/gaming/[slug]/GamingDetailClient'));
const RefurbishedDetailClient = React.lazy(() => import('./app/refurbished/[slug]/RefurbishedDetailClient'));
const SitemapPage = React.lazy(() => import('./app/sitemap/page'));

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

function GlobalOverlays() {
  const { isCheckoutOpen, isWishlistOpen, isCartOpen, isRepairOpen } = useShop();
  const [isSpinOpen, setIsSpinOpen] = React.useState(false);
  const location = useLocation();

  // Keep /scan and /myadmin completely free of storefront popups, docks and cart drawers
  if (location.pathname === '/scan' || location.pathname.startsWith('/myadmin')) {
    return null;
  }

  return (
    <React.Suspense fallback={null}>
      {isCartOpen && <CartDrawer />}
      {isCheckoutOpen && <CheckoutModal />}
      {isRepairOpen && <RepairModal />}
      {isWishlistOpen && <WishlistDrawer />}
      <WhatsAppWidget />
      <BottomDock onOpenSpin={() => setIsSpinOpen(true)} />
      {isSpinOpen && <LuckyWheelModal isOpen={isSpinOpen} onClose={() => setIsSpinOpen(false)} />}
      <TimedSpinPopup />
    </React.Suspense>
  );
}

export default function App() {
  const onSpinSubdomain = isSpinSubdomain();
  const onScanSubdomain = isScanSubdomain();

  // Dedicated lightweight Linktree experience when accessed via scan.tecnomart.in
  if (onScanSubdomain) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
            <Route path="/" element={<ScanPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="*" element={<ScanPage />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    );
  }

  // Dedicated lightweight experience when accessed via spin.tecnomart.in
  if (onSpinSubdomain) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes>
            <Route path="/" element={<SpinPage />} />
            <Route path="/spin" element={<SpinPage />} />
            <Route path="/supertechie" element={<SpinPage forceSuperMode={true} />} />
            <Route path="*" element={<SpinPage />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    );
  }

  // Standard E-commerce Storefront on tecnomart.in
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ShopProvider>
        {/* Main Content Router */}
        <React.Suspense fallback={null}>
          <Routes>
            {/* Primary Storefront Landing Page */}
            <Route path="/" element={<Page />} />
            
            {/* Category Storefront Routes */}
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
            <Route path="/myadmin/login" element={<AdminLoginPage />} />
            <Route path="/myadmin" element={<AdminDashboardPage />} />
            <Route path="/myadmin/products" element={<AdminProductsPage />} />
            <Route path="/myadmin/categories" element={<AdminCategoriesPage />} />
            <Route path="/myadmin/repairs" element={<AdminRepairsPage />} />
            <Route path="/myadmin/configurator" element={<AdminConfiguratorPage />} />
            <Route path="/myadmin/spin" element={<AdminSpinPage />} />
            <Route path="/myadmin/blogs" element={<AdminBlogsPage />} />
            <Route path="/myadmin/store-info" element={<AdminStoreInfoPage />} />
            <Route path="/myadmin/copy-content" element={<AdminCopyContentPage />} />
            <Route path="/myadmin/users" element={<AdminUsersPage />} />

            {/* 404 Page */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>

        {/* Global Overlays & Widgets (Guarded & Lazy-loaded) */}
        <GlobalOverlays />
      </ShopProvider>
    </BrowserRouter>
  );
}
