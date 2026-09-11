"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import HeroSection from '@/components/redesign/HeroSection';
import TrustStrip from '@/components/redesign/TrustStrip';
import DealOfTheDay from '@/components/redesign/DealOfTheDay';
import CategoryGrid from '@/components/redesign/CategoryGrid';
const BudgetFinder = React.lazy(() => import('@/components/redesign/BudgetFinder'));
const WhyChooseUs = React.lazy(() => import('@/components/redesign/WhyChooseUs'));
const GamingBanner = React.lazy(() => import('@/components/redesign/GamingBanner'));
const SpinBannerSection = React.lazy(() => import('@/components/redesign/SpinBannerSection'));
const PopularPicks = React.lazy(() => import('@/components/redesign/PopularPicks'));
const PromoBanners = React.lazy(() => import('@/components/redesign/PromoBanners'));
const ReviewsAndLocation = React.lazy(() => import('@/components/redesign/ReviewsAndLocation'));
const Footer = React.lazy(() => import('@/components/redesign/Footer'));
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA } from '@/components/SEO';
import { useShop } from '@/context/ShopContext';

export default function Page() {
  const { addToCart } = useShop();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({
      ...prev,
      [product.id]: true,
    }));
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Best Tech Store in Hyderabad | Mobiles, Laptops, Gaming PCs & Same-Day Repairs"
        description="TecnoMart is Hyderabad's best tech store and authorized showroom in Tolichowki. Best prices on Apple iPhones, MacBooks, gaming laptops, custom liquid-cooled PCs, and certified repairs with same-day delivery."
        keywords="best tech store in Hyderabad, best mobile shop in Hyderabad, best laptop showroom Hyderabad, best gaming PC builders Hyderabad, best computer repair Tolichowki, buy iPhone 16 Pro Max Hyderabad, buy MacBook Pro Hyderabad, certified refurbished laptops Hyderabad"
        canonical="/"
        schema={[ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]}
      />
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-[#FFD21C] selection:text-neutral-950">
        
        {/* Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* 1. Header Navigation */}
        <Header
        />

        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {/* 2. Hero Section */}
          <HeroSection
          />

          {/* 3. Trust Strip (4-Column Badges) */}
          <TrustStrip />

          {/* 4. Deal of the Day Flash Sale */}
          <div className="section-contain">
            <DealOfTheDay />
          </div>

          {/* 5. Category Grid ("WHAT DO YOU NEED?") */}
          <div className="section-contain">
            <CategoryGrid />
          </div>

          {/* Below-the-fold content code-split with Suspense boundary */}
          <React.Suspense fallback={<div className="min-h-[200px]" />}>
            {/* 6. Budget Banner ("BUDGET BATAO. BEST OPTION PAO.") */}
            <div className="section-contain">
              <BudgetFinder />
            </div>

            {/* 7. Why Choose Us (6 Features) */}
            <div className="section-contain">
              <WhyChooseUs />
            </div>

            {/* 8. Gaming PC Banner ("BUILT FOR VICTORY.") */}
            <div className="section-contain">
              <GamingBanner />
            </div>

            {/* 8b. Spin & Win Reward Machine Banner ("GET A LUCKY CHANCE TO WIN") */}
            <div className="section-contain">
              <SpinBannerSection />
            </div>

            {/* 9. Popular Picks Carousel */}
            <div className="section-contain">
              <PopularPicks
                onAddToCart={handleAddToCart}
                addedItems={addedItems}
              />
            </div>

            {/* 10. Highlight Cards (Expert Repairs & Smarter Prices) */}
            <div className="section-contain">
              <PromoBanners />
            </div>

            {/* 11. Visit Our Store & Google Reviews */}
            <div className="section-contain">
              <ReviewsAndLocation />
            </div>
          </React.Suspense>
        </main>

        {/* 12. Footer with Stay Updated Card & Socials */}
        <React.Suspense fallback={null}>
          <div className="section-contain">
            <Footer />
          </div>
        </React.Suspense>

        {/* Mobile Bottom Thumb Navigation */}
        <MobileBottomBar
        />
      </div>
    </SmoothScrollProvider>
  );
}
