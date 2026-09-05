import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import CartDrawer from './components/redesign/CartDrawer';
import CheckoutModal from './components/redesign/CheckoutModal';
import RepairModal from './components/redesign/RepairModal';
import WishlistDrawer from './components/redesign/WishlistDrawer';
import WhatsAppWidget from './components/redesign/WhatsAppWidget';

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

// Product detail dynamic routing
import LaptopDetailClient from './app/laptops/[slug]/LaptopDetailClient';
import MobileDetailClient from './app/mobiles/[slug]/MobileDetailClient';
import AccessoryDetailClient from './app/accessories/[slug]/AccessoryDetailClient';
import GamingDetailClient from './app/gaming/[slug]/GamingDetailClient';
import RefurbishedDetailClient from './app/refurbished/[slug]/RefurbishedDetailClient';

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

export default function App() {
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

          {/* Catch-all to Home */}
          <Route path="*" element={<Page />} />
        </Routes>

        {/* Global Overlays & Widgets */}
        <CheckoutModal />
        <RepairModal />
        <WishlistDrawer />
        <WhatsAppWidget />
      </ShopProvider>
    </BrowserRouter>
  );
}
