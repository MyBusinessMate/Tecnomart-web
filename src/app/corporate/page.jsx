"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { Building2, ShieldCheck, FileText, ChevronRight, Star, Users } from 'lucide-react';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import Link from 'next/link';

export default function CorporatePage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('Bulk Laptops (10+ units)');

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Corporate & B2B', url: '/corporate' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello TecnoMart Corporate Sales! 🏢\n- Company: ${companyName}\n- Contact: ${contactPerson}\n- Email: ${email}\n- Requirement: ${requirement}\n\nPlease share B2B corporate quotation with GST tax invoice.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title="Corporate Tech Procurement & Bulk IT in Hyderabad | TecnoMart"
        description="B2B IT hardware procurement, volume MacBook discounts, workstations, and GST invoicing for startups and enterprises in Hyderabad."
        canonicalUrl="https://tecnomart.in/corporate"
        schema={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Corporate &amp; B2B</span>
            </nav>

            {/* Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10 lg:py-12">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  B2B · BULK PROCUREMENT · IT INFRASTRUCTURE
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  TecnoMart for Business
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Equip your startup or enterprise with volume discounts on MacBooks, ThinkPads, Custom Workstations, and dedicated IT fleet maintenance in Hyderabad.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Users className="w-3.5 h-3.5" /> 150+ IT Studios Trust Us
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>GST Tax Credit Invoices</span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-amber-400">Volume Tiered Pricing</span>
                </div>
              </div>
            </div>

            {/* Corporate Banner & Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

              {/* Left Info Column */}
              <div className="lg:col-span-7 bg-midgrey-900 text-white rounded-3xl p-6 sm:p-10 border border-midgrey-700/60 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
                    WHY CORPORATES TRUST TECNOMART
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-white leading-tight uppercase">
                    Enterprise IT Sourcing Made Seamless
                  </h2>

                  <div className="space-y-4 text-xs sm:text-sm text-neutral-300 pt-2">
                    {[
                      {
                        icon: <FileText className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />,
                        title: "18% GST Input Tax Credit (ITC)",
                        desc: "Valid GST compliant invoices to maximize your company tax savings.",
                      },
                      {
                        icon: <Building2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />,
                        title: "Volume Tiered Pricing",
                        desc: "Direct tier discounts for orders above 5, 20, and 50+ units.",
                      },
                      {
                        icon: <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />,
                        title: "Priority Corporate AMC & Support",
                        desc: "4-hour turnaround on hardware repairs and loaner replacement laptops.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3.5">
                        {item.icon}
                        <div>
                          <strong className="text-white block font-bold mb-0.5">{item.title}</strong>
                          <span className="text-neutral-400 leading-relaxed font-normal">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 mt-6 relative z-10">
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    Trusted by 150+ IT Studios
                  </span>
                  <span className="font-bold text-amber-400">Jubilee Hills Hub</span>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
                <h3 className="text-base sm:text-lg font-black text-neutral-950 uppercase mb-1">
                  Request Corporate RFQ
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  Our corporate account manager will send a quotation within 2 business hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-black text-neutral-600 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Technologies Pvt Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white font-medium transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-neutral-600 uppercase tracking-wider mb-1.5">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white font-medium transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-neutral-600 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white font-medium transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-neutral-600 uppercase tracking-wider mb-1.5">
                      Procurement Requirement
                    </label>
                    <select
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white font-medium transition-colors cursor-pointer"
                    >
                      <option value="Bulk Laptops (10+ units)">Bulk Laptops (10+ units)</option>
                      <option value="MacBook Fleet for Developers">MacBook Fleet for Developers</option>
                      <option value="AI / 3D Render Workstations">AI / 3D Render Workstations</option>
                      <option value="Monitors & Ergonomic Accessories">Monitors &amp; Ergonomic Accessories</option>
                      <option value="Corporate Device AMC & Repairs">Corporate Device AMC &amp; Repairs</option>
                    </select>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full min-h-[50px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Send RFQ on WhatsApp</span>
                    </button>
                  </div>
                </form>
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
