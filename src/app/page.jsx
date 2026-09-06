"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import HeroSection from '@/components/redesign/HeroSection';
import TrustStrip from '@/components/redesign/TrustStrip';
import DealOfTheDay from '@/components/redesign/DealOfTheDay';
import CategoryGrid from '@/components/redesign/CategoryGrid';
import BudgetFinder from '@/components/redesign/BudgetFinder';
import WhyChooseUs from '@/components/redesign/WhyChooseUs';
import GamingBanner from '@/components/redesign/GamingBanner';
import PopularPicks from '@/components/redesign/PopularPicks';
import PromoBanners from '@/components/redesign/PromoBanners';
import ReviewsAndLocation from '@/components/redesign/ReviewsAndLocation';
import Footer from '@/components/redesign/Footer';
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
        title="TecnoMart | Authorized Mobiles, Laptops, Gaming PCs & Repairs Hyderabad"
        description="Authorized retailer in Jubilee Hills, Hyderabad. Browse latest Apple iPhones, MacBooks, gaming laptops, and certified repairs with same-day delivery."
        canonical="/"
        schema={[ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]}
      />
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        
        {/* Top Scroll Progress Indicator */}
        <ScrollProgress />

        {/* 1. Header Navigation */}
        <Header
        />

        <main className="flex-1">
          {/* 2. Hero Section */}
          <HeroSection
          />

          {/* 3. Trust Strip (4-Column Badges) */}
          <TrustStrip />

          {/* 4. Deal of the Day Flash Sale */}
          <DealOfTheDay />

          {/* 5. Category Grid ("WHAT DO YOU NEED?") */}
          <CategoryGrid />

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
        </main>

        {/* 12. Footer with Stay Updated Card & Socials */}
        <Footer />

        {/* Mobile Bottom Thumb Navigation */}
        <MobileBottomBar
        />
      </div>
    </SmoothScrollProvider>
  );
}
