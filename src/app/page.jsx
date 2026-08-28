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
          <BudgetFinder />

          {/* 7. Why Choose Us (6 Features) */}
          <WhyChooseUs />

          {/* 8. Gaming PC Banner ("BUILT FOR VICTORY.") */}
          <GamingBanner />

          {/* 9. Popular Picks Carousel */}
          <PopularPicks
            onAddToCart={handleAddToCart}
            addedItems={addedItems}
          />

          {/* 10. Highlight Cards (Expert Repairs & Smarter Prices) */}
          <PromoBanners
          />

          {/* 11. Visit Our Store & Google Reviews */}
          <ReviewsAndLocation />
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
