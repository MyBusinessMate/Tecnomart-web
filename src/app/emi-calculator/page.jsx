"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { ChevronRight, Smartphone, Laptop, Gamepad2, Headphones } from 'lucide-react';

const BANKS = [
  { name: "No Cost EMI", rate: 0, note: "0% interest, small processing fee may apply" },
  { name: "HDFC Bank", rate: 13, note: "Subject to HDFC credit card eligibility" },
  { name: "ICICI Bank", rate: 14, note: "Subject to ICICI credit card eligibility" },
  { name: "SBI Card", rate: 13.5, note: "Subject to SBI credit limit" },
  { name: "Axis Bank", rate: 15, note: "Subject to Axis credit eligibility" },
  { name: "Kotak Mahindra", rate: 14.5, note: "Subject to Kotak card eligibility" },
];

const TENURES = [3, 6, 9, 12, 18, 24];

const QUICK_EXAMPLES = [
  { label: "boAt Airdopes", price: 2499 },
  { label: "Sony WH-1000XM5", price: 24990 },
  { label: "iPhone 15", price: 79900 },
  { label: "MacBook Air M2", price: 114900 },
  { label: "Gaming PC RTX 4070", price: 174999 },
];

const CATEGORY_LINKS = [
  { name: "Smartphones", href: "/mobiles", icon: Smartphone },
  { name: "Laptops", href: "/laptops", icon: Laptop },
  { name: "Gaming PCs", href: "/gaming", icon: Gamepad2 },
  { name: "Accessories", href: "/accessories", icon: Headphones },
];

function calculateEMI(principal, annualRate, months) {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12 / 100;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function formatINRInput(n) {
  return n.toLocaleString('en-IN');
}

export default function EMICalculatorPage() {
  const [price, setPrice] = useState(79900);
  const [bankIndex, setBankIndex] = useState(0);
  const [tenure, setTenure] = useState(12);

  const selectedBank = BANKS[bankIndex];

  const emi = useMemo(() => calculateEMI(price, selectedBank.rate, tenure), [price, selectedBank.rate, tenure]);
  const total = useMemo(() => emi * tenure, [emi, tenure]);
  const totalInterest = useMemo(() => total - price, [total, price]);

  const allTenureData = useMemo(() => {
    return TENURES.map((t) => {
      const e = calculateEMI(price, selectedBank.rate, t);
      const tot = e * t;
      const interest = tot - price;
      return { tenure: t, emi: e, total: tot, interest };
    });
  }, [price, selectedBank.rate]);

  const handleSliderChange = (val) => {
    const n = Number(val);
    setPrice(n);
  };

  const handleInputChange = (val) => {
    const raw = val.replace(/[^0-9]/g, '');
    const n = Math.min(300000, Math.max(5000, Number(raw) || 5000));
    setPrice(n);
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'EMI Calculator', url: '/emi-calculator' },
  ]);

  return (
    <SmoothScrollProvider>
      <SEO
        title="No Cost EMI Calculator for Mobiles & Laptops | TecnoMart"
        description="Calculate monthly installments and No Cost EMI options on smartphones, MacBooks, and gaming PCs in Hyderabad with leading banks."
        canonicalUrl="https://tecnomart.in/emi-calculator"
        schema={breadcrumbSchema}
      />
      <ScrollProgress />
      <Header />
      <MobileBottomBar />

      <main className="min-h-screen bg-[#f7f8fa] pb-24 lg:pb-0">

        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-6">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800">EMI Calculator</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Know Your Monthly Cost
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-medium max-w-xl mx-auto">
                  Plan your purchase with ease. 0% No-Cost EMI available.
                </p>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-8">
          <BlurRevealBox delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">

              {/* Price Input */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Product Price</label>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-500 font-bold text-sm">₹</span>
                    <input
                      type="text"
                      value={formatINRInput(price)}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-28 text-right h-9 px-2 text-sm font-black text-neutral-950 bg-neutral-50 border border-neutral-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="300000"
                  step="500"
                  value={price}
                  onChange={(e) => handleSliderChange(e.target.value)}
                  className="w-full h-2 bg-neutral-100 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-neutral-400 font-medium mt-1">
                  <span>₹5,000</span>
                  <span>₹3,00,000</span>
                </div>
              </div>

              {/* Quick Examples */}
              <div className="mb-6">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Quick Examples</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_EXAMPLES.map((ex) => (
                    <button
                      key={ex.label}
                      type="button"
                      onClick={() => setPrice(ex.price)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        price === ex.price
                          ? 'bg-neutral-950 text-amber-400 border-neutral-950'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {ex.label} — {formatINR(ex.price)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Selector */}
              <div className="mb-6">
                <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-2 block">Bank / Scheme</label>
                <select
                  value={bankIndex}
                  onChange={(e) => setBankIndex(Number(e.target.value))}
                  className="w-full h-11 px-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                >
                  {BANKS.map((bank, i) => (
                    <option key={bank.name} value={i}>{bank.name} ({bank.rate}% p.a.)</option>
                  ))}
                </select>
                <p className="text-xs text-neutral-400 mt-1.5 font-medium">{selectedBank.note}</p>
              </div>

              {/* Tenure Pills */}
              <div className="mb-6">
                <p className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Tenure</p>
                <div className="flex flex-wrap gap-2">
                  {TENURES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTenure(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                        tenure === t
                          ? 'bg-neutral-950 text-amber-400 border-neutral-950'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {t} mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="border-t border-neutral-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Monthly EMI</p>
                    <p className="text-2xl sm:text-3xl font-black text-amber-600">{formatINR(emi)}<span className="text-sm font-semibold">/mo</span></p>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                    <p className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-2xl sm:text-3xl font-black text-neutral-950">{formatINR(total)}</p>
                  </div>
                  <div className={`text-center p-4 border rounded-2xl ${selectedBank.rate === 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedBank.rate === 0 ? 'text-emerald-700' : 'text-red-700'}`}>Total Interest</p>
                    <p className={`text-2xl sm:text-3xl font-black ${selectedBank.rate === 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatINR(totalInterest)}</p>
                  </div>
                </div>
                {selectedBank.rate === 0 && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <p className="text-sm font-semibold text-emerald-700">
                      No Cost EMI — You only pay the product price. Zero interest charges!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </BlurRevealBox>
        </section>

        {/* All Tenures Comparison Table */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-10">
          <BlurRevealBox delay={0.15}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100">
                <h2 className="text-base font-black text-neutral-950 uppercase tracking-tight">
                  Compare All Tenures — {selectedBank.name}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="text-left px-5 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Tenure</th>
                      <th className="text-right px-5 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Monthly EMI</th>
                      <th className="text-right px-5 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Amount</th>
                      <th className="text-right px-5 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTenureData.map((row) => (
                      <tr
                        key={row.tenure}
                        className={`border-b border-neutral-50 transition-colors ${row.tenure === tenure ? 'bg-amber-50' : 'hover:bg-neutral-50'}`}
                      >
                        <td className="px-5 py-3 font-bold text-neutral-950">
                          {row.tenure} months
                          {row.tenure === tenure && (
                            <span className="ml-2 text-[10px] bg-amber-500 text-neutral-950 px-1.5 py-0.5 rounded font-black uppercase">Selected</span>
                          )}
                        </td>
                        <td className={`px-5 py-3 text-right font-black ${row.tenure === tenure ? 'text-amber-600' : 'text-neutral-800'}`}>
                          {formatINR(row.emi)}/mo
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-neutral-700">{formatINR(row.total)}</td>
                        <td className={`px-5 py-3 text-right font-semibold ${row.interest <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {row.interest <= 0 ? '₹0' : formatINR(row.interest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        {/* Start Shopping - Clean Category Links */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16">
          <BlurRevealBox delay={0.2}>
            <div className="pt-2">
              <h2 className="text-base font-black text-neutral-950 uppercase tracking-tight mb-4">Start Shopping</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORY_LINKS.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-amber-50/60 border border-neutral-200/80 hover:border-amber-300 rounded-2xl shadow-xs transition-all group"
                    >
                      <Icon className="w-6 h-6 text-neutral-700 group-hover:text-amber-600 transition-colors" />
                      <span className="text-xs font-bold text-neutral-700 group-hover:text-amber-700">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </BlurRevealBox>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
