"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { BlurRevealBox } from '@/components/redesign/BlurReveal';
import SEO, { createBreadcrumbSchema } from '@/components/SEO';
import { ChevronRight, RefreshCw, CheckCircle2, Zap, ArrowRight, Sparkles, ThumbsUp, AlertTriangle, Wrench, Award } from 'lucide-react';

const TRADE_IN_DATA = {
  Apple: {
    "iPhone 15 Pro Max": { "256GB": 72000, "512GB": 78000, "1TB": 85000 },
    "iPhone 15 Pro": { "128GB": 58000, "256GB": 63000, "512GB": 70000 },
    "iPhone 15": { "128GB": 42000, "256GB": 48000 },
    "iPhone 14 Pro Max": { "128GB": 48000, "256GB": 55000, "512GB": 60000 },
    "iPhone 14 Pro": { "128GB": 38000, "256GB": 44000 },
    "iPhone 14": { "128GB": 28000, "256GB": 34000 },
    "iPhone 13": { "128GB": 22000, "256GB": 27000 },
    "iPhone 12": { "64GB": 14000, "128GB": 17000 },
    "MacBook Air M2": { "8GB/256GB": 55000, "8GB/512GB": 65000, "16GB/512GB": 72000 },
    "MacBook Air M1": { "8GB/256GB": 42000, "8GB/512GB": 50000 },
    'MacBook Pro 14" M2': { "16GB/512GB": 82000, "16GB/1TB": 92000 },
  },
  Samsung: {
    "Galaxy S24 Ultra": { "256GB": 68000, "512GB": 75000 },
    "Galaxy S24+": { "256GB": 48000, "512GB": 55000 },
    "Galaxy S24": { "128GB": 35000, "256GB": 40000 },
    "Galaxy S23 Ultra": { "256GB": 48000, "512GB": 55000 },
    "Galaxy S23": { "128GB": 25000, "256GB": 30000 },
    "Galaxy Z Fold 5": { "256GB": 80000, "512GB": 90000 },
    "Galaxy Z Flip 5": { "256GB": 45000, "512GB": 52000 },
    "Galaxy S22 Ultra": { "128GB": 30000, "256GB": 36000 },
  },
  OnePlus: {
    "OnePlus 12": { "256GB": 32000, "512GB": 38000 },
    "OnePlus 11": { "128GB": 22000, "256GB": 28000 },
    "OnePlus 12R": { "128GB": 20000, "256GB": 25000 },
    "OnePlus Nord 3": { "128GB": 15000, "256GB": 18000 },
  },
  Google: {
    "Pixel 8 Pro": { "128GB": 38000, "256GB": 45000 },
    "Pixel 8": { "128GB": 28000, "256GB": 34000 },
    "Pixel 7 Pro": { "128GB": 28000, "256GB": 34000 },
    "Pixel 7a": { "128GB": 18000 },
  },
  Dell: {
    "XPS 15 (2023, i7)": { "16GB/512GB": 75000, "32GB/1TB": 90000 },
    "XPS 13 (2023)": { "16GB/512GB": 55000 },
    "Inspiron 15 (i7 13th Gen)": { "16GB/512GB": 38000 },
  },
  Lenovo: {
    "ThinkPad X1 Carbon": { "16GB/512GB": 65000, "32GB/1TB": 78000 },
    "Legion 5 Pro (RTX 4060)": { "16GB/512GB": 68000 },
    "IdeaPad Slim 5 (i7)": { "16GB/512GB": 35000 },
  },
};

const CONDITIONS = [
  { key: "like-new", label: "Like New", desc: "No scratches, 95%+ battery", multiplier: 0.90, color: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: Sparkles },
  { key: "good", label: "Good", desc: "Minor scratches, 85%+ battery", multiplier: 0.75, color: "bg-blue-100 text-blue-800 border-blue-300", icon: ThumbsUp },
  { key: "fair", label: "Fair", desc: "Visible wear, 75%+ battery", multiplier: 0.60, color: "bg-amber-100 text-amber-800 border-amber-300", icon: AlertTriangle },
  { key: "poor", label: "Poor", desc: "Cracked/damaged, functional", multiplier: 0.40, color: "bg-red-100 text-red-800 border-red-300", icon: Wrench },
];

const WHY_BENEFITS = [
  { icon: Zap, title: "Instant same-day payment" },
  { icon: CheckCircle2, title: "No hidden deductions" },
  { icon: Award, title: "Best rates in Hyderabad" },
  { icon: RefreshCw, title: "Direct upgrade option" },
];

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function ExchangePage() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [storage, setStorage] = useState('');
  const [condition, setCondition] = useState(null);
  const [result, setResult] = useState(null);

  const brands = Object.keys(TRADE_IN_DATA);
  const models = brand ? Object.keys(TRADE_IN_DATA[brand]) : [];
  const storages = brand && model ? Object.keys(TRADE_IN_DATA[brand][model]) : [];

  const handleBrandSelect = (b) => {
    setBrand(b);
    setModel('');
    setStorage('');
  };

  const handleNext1 = () => {
    if (brand && model) setStep(2);
  };

  const handleCalculate = () => {
    if (!storage || !condition) return;
    const baseValue = TRADE_IN_DATA[brand][model][storage];
    const selectedCondition = CONDITIONS.find((c) => c.key === condition);
    const estimate = baseValue * selectedCondition.multiplier;
    const low = Math.round((estimate * 0.95) / 500) * 500;
    const high = Math.round((estimate * 1.05) / 500) * 500;
    setResult({ low, high, condition: selectedCondition });
    setStep(3);
  };

  const handleStartOver = () => {
    setBrand('');
    setModel('');
    setStorage('');
    setCondition(null);
    setResult(null);
    setStep(1);
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const msg = encodeURIComponent(
      `Hi TecnoMart! I want to get an exact trade-in quote.\n- Device: ${brand} ${model}\n- Storage: ${storage}\n- Condition: ${result.condition.label}\n- My estimate: ${formatINR(result.low)} – ${formatINR(result.high)}\nPlease confirm the actual value.`
    );
    window.open(`https://wa.me/919010667726?text=${msg}`, '_blank');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Trade-In & Exchange', url: '/exchange' },
  ]);

  return (
    <SmoothScrollProvider>
      <SEO
        title="Device Exchange & Trade-In Valuation in Hyderabad | TecnoMart"
        description="Get instant trade-in valuation for your old smartphone, MacBook, or laptop. Upgrade to new tech with doorstep exchange in Hyderabad."
        canonicalUrl="https://tecnomart.in/exchange"
        schema={breadcrumbSchema}
      />
      <ScrollProgress />
      <Header />
      <MobileBottomBar />

      <main className="min-h-screen bg-[#f7f8fa] pb-24 lg:pb-0">

        {/* Hero Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium mb-6">
            <Link href="/" className="hover:text-neutral-800 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-800">Trade-In &amp; Exchange</span>
          </nav>

          <BlurRevealBox>
            <div className="bg-midgrey-900 rounded-3xl border border-midgrey-700/60 p-8 sm:p-12 relative overflow-hidden">
              {/* Radial glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  Get the Best Value for<br className="hidden sm:block" /> Your Old Tech
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg font-medium max-w-xl mx-auto">
                  Instant trade-in estimates. Upgrade today, get paid today.
                </p>
              </div>
            </div>
          </BlurRevealBox>
        </section>

        {/* Calculator */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-10">
          <BlurRevealBox delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">

              {/* Step Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step >= s ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-100 text-neutral-400'
                    }`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`h-0.5 w-12 sm:w-20 rounded-full transition-all ${step > s ? 'bg-amber-500' : 'bg-neutral-100'}`} />
                    )}
                  </div>
                ))}
                <div className="ml-2 text-xs text-neutral-500 font-medium">
                  {step === 1 && 'Choose your device'}
                  {step === 2 && 'Storage & condition'}
                  {step === 3 && 'Your estimate'}
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Select Brand</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {brands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleBrandSelect(b)}
                          className={`p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                            brand === b
                              ? 'bg-midgrey-900 text-amber-400 border-midgrey-700/60'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {brand && (
                    <div>
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-2 block">
                        Select Model
                      </label>
                      <select
                        value={model}
                        onChange={(e) => { setModel(e.target.value); setStorage(''); }}
                        className="w-full h-11 px-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                      >
                        <option value="">Choose model...</option>
                        {models.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!brand || !model}
                    onClick={handleNext1}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-neutral-500 hover:text-neutral-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-neutral-500">Selected device:</p>
                    <p className="text-lg font-black text-neutral-950">{brand} {model}</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-2 block">
                      Storage / Config
                    </label>
                    <select
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-full h-11 px-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="">Choose storage...</option>
                      {storages.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Device Condition</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CONDITIONS.map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setCondition(c.key)}
                          className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            condition === c.key
                              ? `${c.color} border-current shadow-md`
                              : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="mb-2 flex items-center">
                            <c.icon className="w-6 h-6 text-current" />
                          </div>
                          <div className="font-black text-sm">{c.label}</div>
                          <div className="text-xs mt-0.5 opacity-75">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!storage || !condition}
                    onClick={handleCalculate}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    Calculate Value
                  </button>
                </div>
              )}

              {/* Step 3 — Result */}
              {step === 3 && result && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-1">Your {brand} {model} is estimated at</p>
                    <p className="text-4xl sm:text-5xl font-black text-amber-500 leading-tight">
                      {formatINR(result.low)} – {formatINR(result.high)}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-bold border ${result.condition.color}`}>
                      <result.condition.icon className="w-3.5 h-3.5" /> {result.condition.label} Condition
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    Get Exact Quote on WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="w-full h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Start Over
                  </button>

                  <p className="text-center text-[11px] text-neutral-400 leading-relaxed">
                    Actual value confirmed after in-store inspection. Price valid for 7 days.
                  </p>
                </div>
              )}
            </div>
          </BlurRevealBox>
        </section>

        {/* Why Trade-in at TecnoMart - Seamless Surface */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
          <BlurRevealBox delay={0.15}>
            <div className="py-4">
              <h2 className="text-lg sm:text-xl font-black text-neutral-950 uppercase tracking-tight mb-6 text-center">
                Why Trade-In at TecnoMart?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {WHY_BENEFITS.map((b) => (
                  <div key={b.title} className="flex flex-col items-center text-center gap-2.5 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-neutral-800 leading-snug">{b.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurRevealBox>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
