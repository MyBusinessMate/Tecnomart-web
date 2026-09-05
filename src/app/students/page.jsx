"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import { ChevronRight, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

const BENEFITS = [
  { icon: "🎓", title: "Extra 5% Off Laptops", desc: "Exclusive laptop discounts for college students buying their study companion.", color: "bg-blue-50 border-blue-200" },
  { icon: "📱", title: "Extra 2% Off All Products", desc: "Stacked on top of any ongoing offers. Cannot be combined with other coupons.", color: "bg-amber-50 border-amber-200" },
  { icon: "⚡", title: "Free Setup & Data Transfer", desc: "Free 30-min laptop OS setup (worth ₹500) and phone data migration on every purchase.", color: "bg-emerald-50 border-emerald-200" },
  { icon: "🛡️", title: "Priority Repair (24h SLA)", desc: "Your repair slot is guaranteed within 24 hours. Extended 9-month repair warranty.", color: "bg-purple-50 border-purple-200" },
];

const STEPS = [
  { step: "01", title: "Walk In or WhatsApp", desc: "Visit our Jubilee Hills store or send your college ID photo on WhatsApp." },
  { step: "02", title: "Verified in 5 Minutes", desc: "Our team verifies your enrollment. Any recognized college/university ID accepted." },
  { step: "03", title: "Discount Applied Instantly", desc: "Discount applied on the spot. Valid for the entire academic year." },
];

const COLLEGES = [
  "IIIT Hyderabad", "IIT Hyderabad", "Osmania University", "JNTU Hyderabad",
  "BITS Pilani Hyderabad", "University of Hyderabad", "Nizam College",
  "SR Engineering College", "VNR Vignana Jyothi", "Malla Reddy University",
  "Woxsen University", "Mahindra University", "Gitam University Hyderabad",
  "Any Recognized College / University",
];

const ELIGIBLE_CATEGORIES = [
  { name: "Laptops (5% Extra Off)", desc: "MacBooks, Gaming, Ultrabooks, Budget", href: "/laptops", icon: "💻" },
  { name: "Smartphones (2% Extra Off)", desc: "Apple, Samsung, OnePlus, Google", href: "/mobiles", icon: "📱" },
  { name: "Accessories (2% Extra Off)", desc: "Headphones, Keyboards, Monitors", href: "/accessories", icon: "🎧" },
  { name: "PC Builds (Special Pricing)", desc: "Custom gaming and workstation rigs", href: "/gaming", icon: "🖥️" },
];

const SHOW_INITIALLY = 8;

export default function StudentsPage() {
  const [showAllColleges, setShowAllColleges] = useState(false);

  const visibleColleges = showAllColleges ? COLLEGES : COLLEGES.slice(0, SHOW_INITIALLY);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi TecnoMart! I'm a student and want to claim my student discount. My college: [college name]. Please guide me on the next steps.`
    );
    window.open(`https://wa.me/919010667726?text=${msg}`, '_blank');
  };

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
            <span className="text-neutral-800">Student Discount</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-midgrey-900 rounded-3xl border border-midgrey-700/60 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student Discount Program
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Students Get More<br className="hidden sm:block" /> at TecnoMart
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-medium mb-8">
                  Show your college ID. Save more. Learn better.
                </p>
                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                  {[
                    { val: "45,000+", label: "students served" },
                    { val: "5% off", label: "on laptops" },
                    { val: "2% off", label: "on all products" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.val}</div>
                      <div className="text-neutral-500 text-xs font-medium mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        {/* Benefits Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
          <BlurRevealBox delay={0.05}>
            <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight mb-5">
              What You Get
            </h2>
          </BlurRevealBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <BlurRevealBox key={b.title} delay={i * 0.05 + 0.1}>
                <div className={`flex gap-4 p-6 rounded-2xl border ${b.color}`}>
                  <span className="text-4xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <h3 className="text-base font-black text-neutral-950 mb-1">{b.title}</h3>
                    <p className="text-sm text-neutral-600 font-medium leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </BlurRevealBox>
            ))}
          </div>
        </section>

        {/* How to Claim */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
          <BlurRevealBox delay={0.05}>
            <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight mb-5">
              How to Claim
            </h2>
          </BlurRevealBox>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map((step, i) => (
              <BlurRevealBox key={step.step} delay={i * 0.07 + 0.1}>
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 relative">
                  <div className="text-5xl font-black text-neutral-100 mb-3 leading-none">{step.step}</div>
                  <h3 className="text-base font-black text-neutral-950 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 font-medium leading-relaxed">{step.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full z-10" />
                  )}
                </div>
              </BlurRevealBox>
            ))}
          </div>
        </section>

        {/* Eligible Categories */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
          <BlurRevealBox delay={0.05}>
            <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight mb-5">
              Eligible Categories
            </h2>
          </BlurRevealBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ELIGIBLE_CATEGORIES.map((cat, i) => (
              <BlurRevealBox key={cat.name} delay={i * 0.05 + 0.1}>
                <Link
                  href={cat.href}
                  className="group flex flex-col gap-3 p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-black text-neutral-950 group-hover:text-amber-600 transition-colors leading-snug">{cat.name}</h3>
                    <p className="text-xs text-neutral-500 font-medium mt-1">{cat.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-amber-500 transition-colors mt-auto" />
                </Link>
              </BlurRevealBox>
            ))}
          </div>
        </section>

        {/* Colleges List */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
          <BlurRevealBox delay={0.05}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight mb-5">
                Accepted Colleges & Universities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleColleges.map((college) => (
                  <div
                    key={college}
                    className="flex items-center gap-2.5 p-3 bg-neutral-50 border border-neutral-100 rounded-xl"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-neutral-700">{college}</span>
                  </div>
                ))}
              </div>
              {COLLEGES.length > SHOW_INITIALLY && (
                <button
                  type="button"
                  onClick={() => setShowAllColleges(!showAllColleges)}
                  className="mt-4 flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 cursor-pointer transition-colors"
                >
                  {showAllColleges ? (
                    <>Show Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Show All {COLLEGES.length} Colleges <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>
          </BlurRevealBox>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
          <BlurRevealBox delay={0.1}>
            <div className="bg-midgrey-900 rounded-2xl border border-midgrey-700/60 p-8 sm:p-10 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">🎓</div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Ready to Claim Your Student Discount?
                </h2>
                <p className="text-neutral-400 font-medium mb-6 max-w-lg mx-auto">
                  Walk in to our Jubilee Hills store or WhatsApp us your college ID. Verification takes just 5 minutes.
                </p>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition-all cursor-pointer uppercase tracking-wide"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  Claim My Student Discount
                </button>
              </div>
            </div>
          </BlurRevealBox>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
