"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: "1. Information We Collect",
    body: "At TecnoMart, we collect personal information that you provide to us when booking a repair, placing an order for smartphones, custom PCs, refurbished hardware, or requesting corporate quotations. This includes your name, phone number, email address, physical delivery address, and device diagnostic logs.",
  },
  {
    title: "2. Device Data Secrecy During Repairs",
    body: "We adhere to strict data privacy protocols. Our certified engineers never access, copy, or browse personal files, photos, messages, or sensitive information on customer devices submitted for hardware repair, screen replacement, or battery upgrades. Customers are encouraged to backup data prior to servicing where possible.",
  },
  {
    title: "3. How We Use Your Information",
    body: "Your information is utilized solely to process your orders, schedule doorstep pickup/delivery, update repair status via WhatsApp/SMS notifications, issue GST tax invoices, and facilitate manufacturer warranty claims. We do not sell or rent your personal data to third parties.",
  },
  {
    title: "4. Payment Security",
    body: "All online payments, UPI transactions, and credit card processing are routed through RBI-authorized payment gateways featuring 256-bit SSL encryption. TecnoMart does not store sensitive credit card numbers or CVVs on our servers.",
  },
  {
    title: "5. Contact Our Privacy Officer",
    body: null,
    custom: (
      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
        For any privacy inquiries or to request deletion of your account records, please contact us at{' '}
        <a href="mailto:privacy@tecnomart.in" className="text-amber-600 font-bold underline hover:text-amber-700">
          privacy@tecnomart.in
        </a>{' '}
        or visit our store at Road No. 36, Jubilee Hills, Hyderabad.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Privacy Policy</span>
            </nav>

            {/* Page Header - Seamless Editorial Style */}
            <div className="mb-10 pb-6 border-b border-neutral-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest block">LEGAL &amp; COMPLIANCE</span>
                <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight mt-1">
                  Privacy Policy
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-medium">
                  Last updated: February 2025 · Tecno Mart Technologies Pvt Ltd
                </p>
              </div>
            </div>

            {/* Content - Clean Cardless Text Flow */}
            <div className="space-y-8 max-w-3xl">
              {sections.map((s) => (
                <section key={s.title} className="space-y-2">
                  <h2 className="text-base sm:text-lg font-black text-neutral-950 tracking-tight">
                    {s.title}
                  </h2>
                  {s.custom || (
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {s.body}
                    </p>
                  )}
                </section>
              ))}
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar cartCount={0} />
      </div>
    </SmoothScrollProvider>
  );
}
