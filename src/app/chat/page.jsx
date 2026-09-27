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

      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />

        <main className="flex-1 w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-112px)] relative overflow-hidden flex flex-col">
          {/* Embedded Full-Screen Window Edge-to-Edge */}
          <div className="flex-1 w-full h-full relative overflow-hidden">
            <ChatbotWindow
              isOpen={true}
              onClose={() => window.history.back()}
              onMinimize={() => window.history.back()}
              initialFullscreen={true}
              isDedicatedPage={true}
            />
          </div>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
