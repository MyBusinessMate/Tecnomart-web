"use client";

import React from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { ShieldCheck, Award, HeartHandshake, Sparkles, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { number: "2016", label: "Founded in Hyderabad" },
    { number: "45,000+", label: "Happy Customers" },
    { number: "18,000+", label: "Devices Repaired" },
    { number: "4.8 / 5", label: "Google Star Rating" },
  ];

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">About Us</span>
            </nav>

            {/* Hero Banner */}
            <div className="rounded-3xl bg-neutral-950 overflow-hidden mb-8 relative border border-neutral-800 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  OUR JOURNEY · OUR VALUES · OUR PASSION
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  About TecnoMart
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-2xl leading-relaxed">
                  Hyderabad's trusted destination for genuine smartphones, high-performance custom PCs, certified refurbished tech, and surgical repairs since 2016.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.8★ Google Rated
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>Est. 2016</span>
                  <span className="text-neutral-700">|</span>
                  <span>Jubilee Hills, Hyderabad</span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-amber-400">45,000+ Customers Served</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
              {stats.map((s, idx) => (
                <BlurRevealBox key={s.label} delay={idx * 0.06} yOffset={16}>
                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 text-center hover:border-amber-400 hover:shadow-lg transition-all">
                    <span className="text-2xl sm:text-4xl font-black text-neutral-950 block mb-1">
                      {s.number}
                    </span>
                    <span className="text-[11px] sm:text-sm font-bold text-neutral-500">
                      {s.label}
                    </span>
                  </div>
                </BlurRevealBox>
              ))}
            </div>

            {/* Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-10">
              <div className="lg:col-span-6 space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
                <span className="text-[11px] font-black tracking-widest text-amber-500 uppercase">
                  HOW WE STARTED
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase leading-tight">
                  From Passionate PC Enthusiasts to Hyderabad's Trusted Tech Store
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  TecnoMart began with a simple observation in 2016: finding authentic tech products, fair pricing, and trustworthy repair engineers under one roof was nearly impossible in the local retail market. Customers were forced to choose between overpriced showroom markups and unreliable grey-market repairs.
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  We established our flagship store at Road No. 36, Jubilee Hills, Hyderabad, with an uncompromising commitment: <strong className="text-neutral-900">100% genuine parts, transparent diagnostics with upfront pricing, and personalized advice tailored to every customer's budget.</strong>
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Today, over 45,000 students, developers, creative professionals, and esports gamers trust TecnoMart for their hardware upgrades and critical repairs.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
                    alt="TecnoMart Hardware Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 sm:p-6">
                    <div>
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">Our Flagship Store</span>
                      <span className="text-xs font-semibold text-white">
                        H.No. B-2-293/82/A/1287, Road No. 36, Jubilee Hills, Hyderabad – 500033
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="p-6 sm:p-10 rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-xl">
              <h3 className="text-base sm:text-xl font-black text-center uppercase tracking-tight text-white mb-7">
                Our 4 Pillar Guarantee
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {[
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
                    title: "Authenticity Only",
                    desc: "No clones, no duplicates. Sourced strictly through authorized distributors.",
                  },
                  {
                    icon: <Award className="w-5 h-5 text-amber-400" />,
                    title: "Certified Engineers",
                    desc: "IPC-certified micro-soldering and Apple/Windows hardware specialists.",
                  },
                  {
                    icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
                    title: "Honest Pricing",
                    desc: "Zero hidden charges. Complete price transparency before touching any device.",
                  },
                  {
                    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
                    title: "Same-Day Action",
                    desc: "Fast screen replacements and PC assembly completed within hours.",
                  },
                ].map((p) => (
                  <div key={p.title} className="space-y-2">
                    {p.icon}
                    <h4 className="font-bold text-white text-sm">{p.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar cartCount={0} />
      </div>
    </SmoothScrollProvider>
  );
}
