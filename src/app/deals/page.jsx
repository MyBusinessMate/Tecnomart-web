"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { ChevronRight, Star, Zap } from 'lucide-react';

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight - now;
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

const FLASH_DEALS = [
  { id: "fd-1", name: "Apple iPhone 15 128GB", cat: "Smartphones", orig: 79900, deal: 72990, img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80", badge: "LIGHTNING DEAL", badgeColor: "bg-red-600 text-white", claimed: 67, total: 100, rating: "4.8", highlight: "Official Apple India Warranty · Sealed Box", featured: true },
  { id: "fd-2", name: "Samsung Galaxy S24 256GB", cat: "Smartphones", orig: 74999, deal: 62999, img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80", badge: "HOT DEAL", badgeColor: "bg-amber-500 text-neutral-950", claimed: 43, total: 80, rating: "4.7", highlight: "Official Samsung Warranty · 5000mAh · 45W" },
  { id: "fd-3", name: "MacBook Air M2 8GB/256GB", cat: "Laptops", orig: 114900, deal: 98990, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", badge: "BEST SELLER", badgeColor: "bg-neutral-900 text-amber-400", claimed: 22, total: 30, rating: "4.9", highlight: "Apple M2 Chip · 18hr Battery · Sealed" },
  { id: "fd-4", name: "Sony WH-1000XM5 Headphones", cat: "Audio", orig: 34990, deal: 24990, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", badge: "28% OFF", badgeColor: "bg-emerald-600 text-white", claimed: 88, total: 120, rating: "4.8", highlight: "Industry Best ANC · 30hr Battery" },
  { id: "fd-5", name: 'iPad Pro 11" M2 WiFi 128GB', cat: "Tablets", orig: 81900, deal: 69990, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80", badge: "14% OFF", badgeColor: "bg-blue-600 text-white", claimed: 15, total: 25, rating: "4.8", highlight: "M2 Chip · ProMotion 120Hz · USB-C" },
  { id: "fd-6", name: "ASUS ROG Zephyrus G14 (RTX 4060)", cat: "Laptops", orig: 124990, deal: 105990, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80", badge: "15% OFF", badgeColor: "bg-purple-600 text-white", claimed: 9, total: 15, rating: "4.7", highlight: "Ryzen 9 · RTX 4060 · 16GB DDR5" },
  { id: "fd-7", name: "iPhone 14 Pro Max 128GB (Refurb A+)", cat: "Refurbished", orig: 139900, deal: 74990, img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80", badge: "CERTIFIED REFURB", badgeColor: "bg-emerald-700 text-white", claimed: 31, total: 40, rating: "4.8", highlight: "Grade A+ · 1-Year TecnoMart Warranty" },
  { id: "fd-8", name: "Logitech Gaming Bundle (Keyboard + Mouse + Headset)", cat: "Gaming Gear", orig: 18990, deal: 13499, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", badge: "BUNDLE DEAL", badgeColor: "bg-red-700 text-white", claimed: 56, total: 75, rating: "4.6", highlight: "G Pro X Keyboard + G502 Mouse + G435 Headset" },
];

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function discountPct(orig, deal) {
  return Math.round(((orig - deal) / orig) * 100);
}

function ClaimedBar({ claimed, total }) {
  const pct = Math.round((claimed / total) * 100);
  return (
    <div>
      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-neutral-500 font-medium mt-1">{claimed} of {total} claimed</p>
    </div>
  );
}

function WABuyButton({ deal }) {
  const handleClick = () => {
    const msg = encodeURIComponent(
      `Hi TecnoMart! I want to buy: ${deal.name} at the flash deal price of ${formatINR(deal.deal)}. Is it still available?`
    );
    window.open(`https://wa.me/919010667726?text=${msg}`, '_blank');
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs uppercase tracking-wide rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
      Buy Now
    </button>
  );
}

function CountdownBox({ value, label }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 py-3 min-w-[64px] text-center">
        <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">{padded}</span>
      </div>
      <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">{label}</span>
    </div>
  );
}

export default function DealsPage() {
  const timeLeft = useCountdown();
  const featured = FLASH_DEALS.find((d) => d.featured);
  const rest = FLASH_DEALS.filter((d) => !d.featured);

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Header />
      <MobileBottomBar />

      <main className="min-h-screen bg-[#f7f8fa] pb-24 lg:pb-0">

        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-6">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800">Flash Deals</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <Zap className="w-3.5 h-3.5" />
                  Flash Deals
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 flex items-center justify-center gap-3">
                  <Zap className="w-8 h-8 text-amber-400" />
                  <span>Flash Deals</span>
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-medium mb-8">
                  Prices drop. Stock vanishes. Today only.
                </p>
                {/* Countdown */}
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <CountdownBox value={timeLeft.h} label="HRS" />
                  <span className="text-3xl font-black text-amber-500 mb-5">:</span>
                  <CountdownBox value={timeLeft.m} label="MIN" />
                  <span className="text-3xl font-black text-amber-500 mb-5">:</span>
                  <CountdownBox value={timeLeft.s} label="SEC" />
                </div>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        {/* Featured Deal */}
        {featured && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
            <BlurRevealBox delay={0.1}>
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-2/5 bg-neutral-50 flex items-center justify-center p-6 min-h-[250px] lg:min-h-[340px]">
                    <img
                      src={featured.img}
                      alt={featured.name}
                      className="w-full h-60 lg:h-72 object-cover rounded-xl"
                      loading="eager"
                    />
                  </div>
                  {/* Details */}
                  <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${featured.badgeColor}`}>
                        {featured.badge}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">{featured.cat}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-950 leading-tight">{featured.name}</h2>
                    <p className="text-sm text-neutral-600 font-medium">{featured.highlight}</p>
                    <ClaimedBar claimed={featured.claimed} total={featured.total} />
                    <div className="flex items-end gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-amber-500">{formatINR(featured.deal)}</span>
                      <span className="text-base text-neutral-400 line-through mb-1">{formatINR(featured.orig)}</span>
                      <span className="text-sm font-bold text-emerald-600 mb-1">-{discountPct(featured.orig, featured.deal)}%</span>
                    </div>
                    <WABuyButton deal={featured} />
                  </div>
                </div>
              </div>
            </BlurRevealBox>
          </section>
        )}

        {/* All Deals Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight">
              All Deals <span className="text-neutral-400 font-semibold text-base normal-case">({rest.length} offers)</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <Zap className="w-4 h-4 text-amber-500" />
              Ends in {String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map((deal, i) => (
              <BlurRevealBox key={deal.id} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="relative bg-neutral-50 h-44 flex items-center justify-center overflow-hidden">
                    <img
                      src={deal.img}
                      alt={deal.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${deal.badgeColor}`}>
                      {deal.badge}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2.5 flex-1">
                    <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-neutral-700 font-bold">{deal.rating}</span>
                      <span className="text-neutral-300">·</span>
                      <span>{deal.cat}</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-950 leading-snug line-clamp-2">{deal.name}</h3>
                    <p className="text-[11px] text-neutral-500 leading-snug line-clamp-1">{deal.highlight}</p>
                    <ClaimedBar claimed={deal.claimed} total={deal.total} />
                    <div className="flex items-end gap-2 mt-auto">
                      <span className="text-xl font-black text-amber-500">{formatINR(deal.deal)}</span>
                      <span className="text-xs text-neutral-400 line-through mb-0.5">{formatINR(deal.orig)}</span>
                    </div>
                    <WABuyButton deal={deal} />
                  </div>
                </div>
              </BlurRevealBox>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
          <BlurRevealBox delay={0.2}>
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
              <div className="relative z-10 text-center sm:text-left">
                <p className="text-white font-black text-lg">Get Daily Deals on WhatsApp</p>
                <p className="text-neutral-400 text-sm font-medium mt-1">Be the first to know about flash sales & exclusive offers.</p>
              </div>
              <button
                type="button"
                onClick={() => window.open('https://wa.me/919010667726?text=Hi%20TecnoMart!%20Please%20add%20me%20to%20your%20daily%20deals%20list.', '_blank')}
                className="relative z-10 flex-shrink-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Subscribe to Deals
              </button>
            </div>
          </BlurRevealBox>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
