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
import { useShop } from '@/context/ShopContext';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import {
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  AlertTriangle,
  Wrench,
  Award,
  Smartphone,
  Laptop
} from 'lucide-react';

const CATEGORIZED_TRADE_IN_DATA = {
  mobile: {
    label: "Smartphone / Mobile",
    icon: Smartphone,
    brands: {
      Apple: {
        "iPhone 15 Pro Max": { "256GB": 72000, "512GB": 78000, "1TB": 85000 },
        "iPhone 15 Pro": { "128GB": 58000, "256GB": 63000, "512GB": 70000 },
        "iPhone 15": { "128GB": 42000, "256GB": 48000 },
        "iPhone 14 Pro Max": { "128GB": 48000, "256GB": 55000, "512GB": 60000 },
        "iPhone 14 Pro": { "128GB": 38000, "256GB": 44000 },
        "iPhone 14": { "128GB": 28000, "256GB": 34000 },
        "iPhone 13": { "128GB": 22000, "256GB": 27000 },
        "iPhone 12": { "64GB": 14000, "128GB": 17000 },
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
    },
  },
  laptop: {
    label: "Laptop / MacBook",
    icon: Laptop,
    brands: {
      Apple: {
        "MacBook Air M2": { "8GB/256GB": 55000, "8GB/512GB": 65000, "16GB/512GB": 72000 },
        "MacBook Air M1": { "8GB/256GB": 42000, "8GB/512GB": 50000 },
        'MacBook Pro 14" M2': { "16GB/512GB": 82000, "16GB/1TB": 92000 },
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
      HP: {
        "Spectre x360 14 (i7)": { "16GB/512GB": 58000, "16GB/1TB": 68000 },
        "Pavilion 15 (i5 13th Gen)": { "16GB/512GB": 32000 },
        "Victus 15 (RTX 3050)": { "16GB/512GB": 36000 },
      },
      ASUS: {
        "ROG Zephyrus G14 (RTX 4060)": { "16GB/512GB": 70000, "16GB/1TB": 80000 },
        "TUF Gaming A15": { "16GB/512GB": 42000 },
        "ZenBook 14 OLED": { "16GB/512GB": 48000 },
      },
    },
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
  const { confirmWhatsApp } = useShop();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('mobile'); // 'mobile' or 'laptop'
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [storage, setStorage] = useState('');
  const [condition, setCondition] = useState(null);
  const [result, setResult] = useState(null);

  const activeCategoryData = CATEGORIZED_TRADE_IN_DATA[category] || CATEGORIZED_TRADE_IN_DATA.mobile;
  const brands = Object.keys(activeCategoryData.brands);
  const models = brand && activeCategoryData.brands[brand] ? Object.keys(activeCategoryData.brands[brand]) : [];
  const storages = brand && model && activeCategoryData.brands[brand]?.[model] ? Object.keys(activeCategoryData.brands[brand][model]) : [];

  const handleCategorySelect = (catKey) => {
    if (catKey !== category) {
      setCategory(catKey);
      setBrand('');
      setModel('');
      setStorage('');
      setCondition(null);
      setResult(null);
    }
  };

  const handleBrandSelect = (b) => {
    setBrand(b);
    setModel('');
    setStorage('');
  };

  const handleNext1 = () => {
    if (category && brand && model) setStep(2);
  };

  const handleCalculate = () => {
    if (!storage || !condition) return;
    const baseValue = activeCategoryData.brands[brand]?.[model]?.[storage];
    if (!baseValue) return;

    const selectedCondition = CONDITIONS.find((c) => c.key === condition);
    const estimate = baseValue * selectedCondition.multiplier;
    const low = Math.round((estimate * 0.95) / 500) * 500;
    const high = Math.round((estimate * 1.05) / 500) * 500;
    setResult({ low, high, condition: selectedCondition });
    setStep(3);
  };

  const handleStartOver = () => {
    setCategory('mobile');
    setBrand('');
    setModel('');
    setStorage('');
    setCondition(null);
    setResult(null);
    setStep(1);
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const catTitle = activeCategoryData.label;
    const msg = encodeURIComponent(
      `Hi TecnoMart! I want to get an exact trade-in quote.\n- Category: ${catTitle}\n- Device: ${brand} ${model}\n- Storage: ${storage}\n- Condition: ${result.condition.label}\n- Estimated Valuation: ${formatINR(result.low)} – ${formatINR(result.high)}\nPlease confirm the actual value.`
    );
    const url = `https://wa.me/919010667726?text=${msg}`;
    if (confirmWhatsApp) {
      confirmWhatsApp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Trade-In & Exchange', url: '/exchange' },
  ]);

  return (
    <SmoothScrollProvider>
      <SEO
        title="Best Mobile & Laptop Trade-In Exchange in Hyderabad | Instant Cash & Store Credit"
        description="Get the best trade-in exchange value for your old smartphone, iPhone, MacBook, or Windows laptop in Hyderabad. Instant valuation, zero deduction on minor scratches, and same-day exchange credit at TecnoMart Tolichowki."
        keywords="best exchange value old phone Hyderabad, trade in laptop Hyderabad, sell old MacBook Hyderabad, mobile exchange offer Tolichowki, laptop upgrade scheme Telangana"
        canonicalUrl="https://tecnomart.in/exchange"
        ogImageAlt="Best Mobile & Laptop Trade-In Exchange in Hyderabad — TecnoMart"
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

        {/* Valuation Calculator */}
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
                  {step === 1 && 'Choose device & brand'}
                  {step === 2 && 'Storage & condition'}
                  {step === 3 && 'Instant valuation'}
                </div>
              </div>

              {/* Step 1: Category, Brand & Model */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Category Selector */}
                  <div>
                    <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
                      1. What do you want to exchange?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('mobile')}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all cursor-pointer ${
                          category === 'mobile'
                            ? 'bg-amber-500/10 text-amber-900 border-amber-500 shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Smartphone className="w-5 h-5 text-amber-600" />
                        <span>Smartphone / Mobile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategorySelect('laptop')}
                        className={`p-3.5 rounded-xl border-2 flex items-center justify-center gap-2.5 font-bold text-sm transition-all cursor-pointer ${
                          category === 'laptop'
                            ? 'bg-amber-500/10 text-amber-900 border-amber-500 shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Laptop className="w-5 h-5 text-amber-600" />
                        <span>Laptop / MacBook</span>
                      </button>
                    </div>
                  </div>

                  {/* Brand Selector (Buttons + Dropdown for Maximum Ergonomics) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        2. Select Brand
                      </p>
                      <span className="text-[11px] text-neutral-400 font-medium">Or choose from dropdown below</span>
                    </div>

                    {/* Brand Quick-Tap Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                      {brands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleBrandSelect(b)}
                          className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                            brand === b
                              ? 'bg-midgrey-900 text-amber-400 border-midgrey-700/60 shadow-xs'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {/* Brand Dropdown */}
                    <select
                      aria-label="Select Brand Dropdown"
                      value={brand}
                      onChange={(e) => handleBrandSelect(e.target.value)}
                      className="w-full h-11 px-3 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    >
                      <option value="">Choose brand from dropdown...</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Model Dropdown Selector */}
                  {brand && (
                    <div>
                      <label htmlFor="exchange-model-select" className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 block">
                        3. Select {brand} Model
                      </label>
                      <select
                        id="exchange-model-select"
                        value={model}
                        onChange={(e) => { setModel(e.target.value); setStorage(''); }}
                        className="w-full h-11 px-3 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                      >
                        <option value="">Choose {brand} model...</option>
                        {models.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!category || !brand || !model}
                    onClick={handleNext1}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <span>Continue to Storage &amp; Condition</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Storage & Condition */}
              {step === 2 && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-neutral-500 hover:text-neutral-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    ← Back to Device Selection
                  </button>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Selected Device</p>
                    <p className="text-base sm:text-lg font-black text-neutral-950">{brand} {model}</p>
                    <p className="text-[11px] text-amber-600 font-bold uppercase">{activeCategoryData.label}</p>
                  </div>

                  <div>
                    <label htmlFor="exchange-storage-select" className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 block">
                      Storage / Spec Variant
                    </label>
                    <select
                      id="exchange-storage-select"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-full h-11 px-3 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    >
                      <option value="">Choose storage/spec variant...</option>
                      {storages.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">Device Condition</p>
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
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Calculate Value</span>
                  </button>
                </div>
              )}

              {/* Step 3: Valuation Result & WhatsApp Action */}
              {step === 3 && result && (
                <div className="space-y-6">
                  <div className="text-center px-2">
                    <p className="text-xs sm:text-sm text-neutral-500 mb-1">
                      Your {brand} {model} ({storage}) is estimated at
                    </p>

                    {/* Single-line mobile-friendly price quote (will NOT wrap to second line) */}
                    <div className="py-2">
                      <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-amber-500 leading-tight whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
                        {formatINR(result.low)} – {formatINR(result.high)}
                      </p>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-bold border ${result.condition.color}`}>
                      <result.condition.icon className="w-3.5 h-3.5" />
                      <span>{result.condition.label} Condition</span>
                    </div>
                  </div>

                  {/* Non-overflowing WhatsApp CTA Button */}
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full min-h-[48px] py-3 px-3 sm:px-4 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-black font-black text-xs sm:text-sm uppercase tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                  >
                    <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-black flex-shrink-0" />
                    <span className="truncate">Get Exact Quote on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="w-full h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-98"
                  >
                    Start Over / Check Another Device
                  </button>

                  <p className="text-center text-[11px] text-neutral-400 leading-relaxed">
                    Actual trade-in value confirmed after in-store inspection in Tolichowki, Hyderabad. Price estimate valid for 7 days.
                  </p>
                </div>
              )}
            </div>
          </BlurRevealBox>
        </section>

        {/* Why Trade-in at TecnoMart */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
          <BlurRevealBox delay={0.15}>
            <div className="py-4">
              <h2 className="text-lg sm:text-xl font-black text-neutral-950 uppercase tracking-tight mb-6 text-center">
                Why Trade-In at TecnoMart?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {WHY_BENEFITS.map((b) => (
                  <div key={b.title} className="flex flex-col items-center text-center gap-2.5 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
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
