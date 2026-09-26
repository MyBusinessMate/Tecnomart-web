"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import ChatbotWindow from '@/components/chatbot/ChatbotWindow';
import { ArrowLeft, MessageSquare, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import Link from 'next/link';

/**
 * Dedicated Full-Page Chat Experience: /chat
 * Gives users an entire dedicated full-page screen for deep laptop consultations,
 * side-by-side spec comparisons, and seamless customer assistance.
 */
export default function ChatPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'AI Laptop Assistant', url: '/chat' },
  ]);

  return (
    <SmoothScrollProvider>
      <SEO
        title="TecnoMart Assistant | Live Laptop Shopping & Support Chat"
        description="Chat directly with TecnoMart's smart laptop assistant in Hyderabad. Get personalized recommendations for refurbished and new laptops based on your budget, college, coding, or gaming requirements."
        canonicalUrl="https://www.tecnomart.in/chat"
        schema={breadcrumbSchema}
      />

      <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col h-[82vh] max-h-[850px] relative">
            {/* Top Bar with back link */}
            <div className="bg-[#0f141d] px-4 py-2 text-white flex items-center justify-between border-b border-neutral-800 text-xs">
              <Link
                href="/laptops"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Store</span>
              </Link>
              <div className="flex items-center gap-2 text-[11px] text-[#F5B800] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Full-Screen Dedicated Assistant</span>
              </div>
            </div>

            {/* Embedded Full Window */}
            <div className="flex-1 relative overflow-hidden">
              <ChatbotWindow
                isOpen={true}
                onClose={() => window.history.back()}
                onMinimize={() => window.history.back()}
                initialFullscreen={true}
              />
            </div>
          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
