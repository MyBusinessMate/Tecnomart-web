"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { 
  ChevronRight, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Headphones, 
  RefreshCw, 
  Wrench, 
  Calculator, 
  Repeat, 
  Scale, 
  Sparkles, 
  Tag, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { 
  MOBILES_DATA, 
  LAPTOPS_DATA, 
  GAMING_DATA, 
  ACCESSORIES_DATA, 
  REFURBISHED_DATA 
} from '@/data/products';

export default function SitemapPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'HTML Sitemap', url: '/sitemap' },
  ]);

  const mainSections = [
    {
      title: "Core Departments & Catalogs",
      icon: Smartphone,
      description: "Browse flagship smartphones, creator laptops, gaming rigs, certified refurbished hardware, and authentic accessories.",
      links: [
        { name: "Smartphones & Flagships", url: "/mobiles", badge: `${MOBILES_DATA.length} Models` },
        { name: "Laptops & Ultrabooks", url: "/laptops", badge: `${LAPTOPS_DATA.length} Models` },
        { name: "Custom Gaming PCs", url: "/gaming", badge: `${GAMING_DATA.length} Systems` },
        { name: "Certified Refurbished Hardware", url: "/refurbished", badge: `${REFURBISHED_DATA.length} Certified` },
        { name: "Genuine Accessories & Peripherals", url: "/accessories", badge: `${ACCESSORIES_DATA.length} Items` },
        { name: "Deals & Limited-Time Discounts", url: "/deals", badge: "Exclusive Offers" },
      ]
    },
    {
      title: "Services, Interactive Tools & Calculators",
      icon: Wrench,
      description: "Book same-day certified doorstep repairs, build a custom gaming setup, estimate trade-in values, or calculate low-cost monthly EMI.",
      links: [
        { name: "Certified Repair & Diagnostic Services", url: "/repairs", badge: "Same-Day Service" },
        { name: "Custom PC Configurator & Wattage Builder", url: "/pc-builds", badge: "Interactive Rig Builder" },
        { name: "Build Your Setup", url: "/build-your-setup", badge: "Workspace Customizer" },
        { name: "Instant Trade-In & Exchange Calculator", url: "/exchange", badge: "Best Value Guarantee" },
        { name: "Bank EMI & Monthly Finance Calculator", url: "/emi-calculator", badge: "0% Interest Options" },
        { name: "Side-by-Side Product Comparison Engine", url: "/compare", badge: "Spec vs Spec" },
        { name: "Spin & Win Daily Reward Machine", url: "/spin", badge: "Guaranteed Perks" },
      ]
    },
    {
      title: "Corporate & Educational Programs",
      icon: Building2,
      description: "Enterprise bulk hardware leasing, company workstation rollouts, GST tax invoicing, and verified university student discounts.",
      links: [
        { name: "Corporate B2B & Enterprise Procurement", url: "/corporate", badge: "GST Invoicing" },
        { name: "Student & Faculty Education Program", url: "/students", badge: "Special Discounts" },
      ]
    },
    {
      title: "Company, Store & Legal Guidelines",
      icon: ShieldCheck,
      description: "Flagship showroom location in Jubilee Hills, customer support hotline, comprehensive privacy policies, and service warranty terms.",
      links: [
        { name: "About TecnoMart Hyderabad", url: "/about", badge: "Our Story" },
        { name: "Contact & Jubilee Hills Store Directions", url: "/contact", badge: "Open Daily 10 AM - 9:30 PM" },
        { name: "Privacy Policy & Device Data Protection", url: "/privacy", badge: "Data Secrecy" },
        { name: "Terms & Conditions & Warranty Policy", url: "/terms", badge: "Customer Terms" },
        { name: "Shopping Cart & Direct Ordering", url: "/cart", badge: "Checkout" },
        { name: "Machine-Readable XML Sitemap", url: "/sitemap.xml", badge: "Search Engine Index" },
      ]
    }
  ];

  return (
    <SmoothScrollProvider>
      <SEO
        title="HTML Sitemap | Best Products, Repairs & Tech Services Directory | TecnoMart Hyderabad"
        description="Complete HTML sitemap and directory for TecnoMart Hyderabad. Fast direct links to all flagship smartphones, MacBooks, gaming laptops, custom PCs, repair services, and tools."
        keywords="TecnoMart sitemap, electronics directory Hyderabad, mobile models list Hyderabad, laptop directory Hyderabad, PC builder tools"
        canonicalUrl="https://tecnomart.in/sitemap"
        ogImageAlt="TecnoMart HTML Sitemap & Directory"
        schema={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-6">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-neutral-900 font-bold">HTML Sitemap</span>
            </nav>

            {/* Header Banner */}
            <div className="mb-10 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  SITE DIRECTORY
                </span>
                <span className="text-xs text-neutral-400 font-medium">Updated September 2026</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight">
                TecnoMart HTML Sitemap
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-2xl font-normal leading-relaxed">
                A structured, fast-navigating directory of every product category, individual device, certified repair service, and interactive customer tool available at TecnoMart Hyderabad.
              </p>
            </div>

            {/* Primary Section Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {mainSections.map((sec, idx) => {
                const IconComponent = sec.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-amber-400/50 transition-all duration-200 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-black text-neutral-950 tracking-tight">
                        {sec.title}
                      </h2>
                    </div>
                    <p className="text-xs text-neutral-500 mb-4 leading-relaxed font-normal">
                      {sec.description}
                    </p>
                    <ul className="space-y-2 mt-auto divide-y divide-neutral-100">
                      {sec.links.map((link, linkIdx) => (
                        <li key={linkIdx} className="pt-2 first:pt-0">
                          <Link 
                            href={link.url}
                            className="group flex items-center justify-between py-1 text-sm font-semibold text-neutral-800 hover:text-amber-600 transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-amber-500 transition-colors" />
                              {link.name}
                            </span>
                            {link.badge && (
                              <span className="text-[11px] font-medium text-neutral-400 group-hover:text-amber-600 transition-colors">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Comprehensive Product Index Section */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-12">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-black text-neutral-950 uppercase tracking-tight">
                    Complete Direct Product Index
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Direct landing pages for all 28 in-stock devices, workstations, and audio gear.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700">
                  28 Live Products
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Mobiles */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    Flagship Smartphones ({MOBILES_DATA.length})
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {MOBILES_DATA.map((p) => (
                      <li key={p.id}>
                        <Link 
                          href={`/mobiles/${p.slug}`}
                          className="text-neutral-700 hover:text-amber-600 transition-colors block py-0.5"
                        >
                          {p.name}
                          <span className="text-[10px] text-neutral-400 ml-1.5">{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Laptops */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5" />
                    Laptops &amp; MacBooks ({LAPTOPS_DATA.length})
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {LAPTOPS_DATA.map((p) => (
                      <li key={p.id}>
                        <Link 
                          href={`/laptops/${p.slug}`}
                          className="text-neutral-700 hover:text-amber-600 transition-colors block py-0.5"
                        >
                          {p.name}
                          <span className="text-[10px] text-neutral-400 ml-1.5">{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaming PCs */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    Custom Gaming PCs ({GAMING_DATA.length})
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {GAMING_DATA.map((p) => (
                      <li key={p.id}>
                        <Link 
                          href={`/gaming/${p.slug}`}
                          className="text-neutral-700 hover:text-amber-600 transition-colors block py-0.5"
                        >
                          {p.name}
                          <span className="text-[10px] text-neutral-400 ml-1.5">{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accessories */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    Audio &amp; Peripherals ({ACCESSORIES_DATA.length})
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {ACCESSORIES_DATA.map((p) => (
                      <li key={p.id}>
                        <Link 
                          href={`/accessories/${p.slug}`}
                          className="text-neutral-700 hover:text-amber-600 transition-colors block py-0.5"
                        >
                          {p.name}
                          <span className="text-[10px] text-neutral-400 ml-1.5">{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Refurbished */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Certified Refurbished ({REFURBISHED_DATA.length})
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {REFURBISHED_DATA.map((p) => (
                      <li key={p.id}>
                        <Link 
                          href={`/refurbished/${p.slug}`}
                          className="text-neutral-700 hover:text-amber-600 transition-colors block py-0.5"
                        >
                          {p.name}
                          <span className="text-[10px] text-neutral-400 ml-1.5">{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Info & Store Verification */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    Store Verification
                  </h3>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    All listed products are physically stocked at our Jubilee Hills showroom with official manufacturer warranty cards and GST tax billing.
                  </p>
                  <div className="mt-3 pt-3 border-t border-neutral-200 text-[11px]">
                    <span className="font-bold text-neutral-900 block">Jubilee Hills Store</span>
                    <span className="text-neutral-500">Road No. 36, Hyderabad</span>
                    <a 
                      href="https://wa.me/919010667726" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700"
                    >
                      WhatsApp Us <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar />
      </div>
    </SmoothScrollProvider>
  );
}
