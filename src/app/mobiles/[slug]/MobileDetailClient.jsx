import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import RepairModal from '@/components/redesign/RepairModal';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { MOBILES_DATA, getMobileBySlug } from '@/data/products';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
  ShoppingBag,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  CreditCard,
  Package,
  ArrowUpRight,
  Award,
} from 'lucide-react';

export default function MobileDetailClient({ slug }) {
  const product = getMobileBySlug(slug) || MOBILES_DATA[0];
  const { addToCart, locationPincode, isRepairOpen, setIsRepairOpen } = useShop();

  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Default', hex: '#333' });
  const [selectedStorage, setSelectedStorage] = useState(product.storages?.[0] || { size: 'Standard', price: product.price });
  const [pincode, setPincode] = useState(locationPincode || '');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('specs');

  const images = product.images?.length ? product.images : ['/images/landing/img-1.png'];
  const activePrice = selectedStorage?.price || product.price;

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addToCart(product, 1, selectedStorage, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `Hello TecnoMart! 📱 I want to purchase the *${product.name}* (${selectedColor.name}, ${selectedStorage.size}) at ${activePrice}.\n\nPlease confirm availability and delivery schedule in Hyderabad.`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      setPincodeChecked(true);
    }
  };

  const similarProducts = MOBILES_DATA.filter((m) => m.slug !== product.slug).slice(0, 3);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#111111] font-sans selection:bg-amber-500 selection:text-neutral-950 pb-20 lg:pb-0">
        <ScrollProgress />
        <Header onOpenRepairModal={() => setIsRepairOpen(true)} />

        <main className="flex-1">
          {/* Breadcrumb Bar */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-400">
            <Link href="/" className="hover:text-neutral-900 transition-colors">HOME</Link>
            <span className="mx-2 text-neutral-300">/</span>
            <Link href="/mobiles" className="hover:text-neutral-900 transition-colors">MOBILES</Link>
            <span className="mx-2 text-neutral-300">/</span>
            <span className="text-neutral-950">{product.name}</span>
          </div>

          {/* Clean Ecom Product Section (Recosto Design Philosophy: No boxed heavy containers) */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
              
              {/* Left Column: Image Viewer */}
              <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                <div className="bg-white/80 rounded-2xl p-8 sm:p-14 relative flex items-center justify-center aspect-[4/3] sm:aspect-square overflow-hidden border border-neutral-200/60 shadow-2xs">
                  {product.badge && (
                    <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#FBF3DB] text-[#956400] border border-amber-200/60">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={images[currentImg] || images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImg(idx)}
                        className={`w-20 h-16 rounded-xl border transition-all cursor-pointer p-1.5 bg-white flex items-center justify-center flex-shrink-0 ${
                          currentImg === idx
                            ? 'border-neutral-950 shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Clean Editorial Product Details (Recosto Style) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                
                {/* Badges */}
                <div className="flex gap-2">
                  <span className="bg-[#EDF3EC] text-[#346538] text-[9px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border border-emerald-200/60">
                    Official Brand Warranty
                  </span>
                  <span className="bg-[#FBF3DB] text-[#956400] text-[9px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border border-amber-200/60">
                    Same-Day Delivery
                  </span>
                </div>

                {/* Title & Brand */}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-1">
                    {product.brand}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-[1.1] text-[#111111]">
                    {product.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewCount} verified buyer reviews)</span>
                </div>

                {/* Pricing Block - Clean Minimal Editorial (No harsh box) */}
                <div className="py-4 border-y border-neutral-200/80 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400 mb-0.5">Offer Price</div>
                    <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#111111]">
                      {activePrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400 mb-0.5">Original MRP</div>
                    <div className="text-base font-mono line-through text-neutral-400">
                      {product.originalPrice}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {product.discountPercent}
                    </span>
                  </div>
                </div>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
                      Color Finish: <span className="text-neutral-900 font-black">{selectedColor.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            selectedColor.name === c.name
                              ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                              : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Storage Options */}
                {product.storages && product.storages.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
                      Storage Capacity: <span className="text-neutral-900 font-black">{selectedStorage.size}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {product.storages.map((stg) => (
                        <button
                          key={stg.size}
                          onClick={() => setSelectedStorage(stg)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            selectedStorage.size === stg.size
                              ? 'border-neutral-950 bg-neutral-950 text-white'
                              : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
                          }`}
                        >
                          <div className="text-xs font-black">{stg.size}</div>
                          <div className={`text-xs font-mono mt-0.5 ${selectedStorage.size === stg.size ? 'text-amber-400' : 'text-neutral-500'}`}>
                            {stg.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-neutral-950 text-white py-4 rounded-xl font-bold uppercase tracking-[0.05em] flex justify-center items-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98] text-xs cursor-pointer shadow-sm"
                    >
                      {isAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                      <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppBuy}
                      className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-[0.05em] flex justify-center items-center gap-2 hover:bg-[#20bd5a] transition-all active:scale-[0.98] text-xs cursor-pointer shadow-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>

                  {/* Delivery / Pincode check inline */}
                  <form onSubmit={handleCheckPincode} className="flex gap-2 pt-1">
                    <div className="relative flex-1">
                      <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Check delivery pincode (e.g. 500033)"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-neutral-200 rounded-lg outline-none focus:border-neutral-900 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-neutral-200"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeChecked && (
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 pt-0.5">
                      <Check size={14} /> Same-day delivery &amp; express dispatch available for {pincode}!
                    </div>
                  )}
                </div>

                {/* Accordions (Clean Recosto Style) */}
                <div className="border-t border-neutral-200/80 pt-2 space-y-0">
                  {/* Highlights Accordion */}
                  <div className="border-b border-neutral-200/80">
                    <button
                      onClick={() => toggleAccordion('highlights')}
                      className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-600 transition-colors"
                    >
                      Highlights &amp; Features
                      {openAccordion === 'highlights' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordion === 'highlights' && (
                      <div className="pb-5 text-xs text-neutral-600 leading-relaxed space-y-2">
                        {product.keyHighlights?.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Technical Specs Accordion */}
                  <div className="border-b border-neutral-200/80">
                    <button
                      onClick={() => toggleAccordion('specs')}
                      className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-600 transition-colors"
                    >
                      Technical Specifications
                      {openAccordion === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordion === 'specs' && (
                      <div className="pb-5 text-xs text-neutral-700 divide-y divide-neutral-100">
                        {Object.entries(product.specs || {}).map(([key, val]) => (
                          <div key={key} className="py-2.5 flex justify-between gap-4">
                            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">{key}</span>
                            <span className="font-semibold text-right text-neutral-950">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* What is Included Accordion */}
                  <div className="border-b border-neutral-200/80">
                    <button
                      onClick={() => toggleAccordion('box')}
                      className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-[0.08em] text-neutral-950 hover:text-neutral-600 transition-colors"
                    >
                      In The Box
                      {openAccordion === 'box' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordion === 'box' && (
                      <div className="pb-5 text-xs text-neutral-600 space-y-1.5">
                        {product.inTheBox?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust Badges Minimal */}
                <div className="flex justify-between items-center pt-4">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Shield size={18} strokeWidth={1.75} className="text-neutral-900" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-neutral-500">Official<br/>Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Truck size={18} strokeWidth={1.75} className="text-neutral-900" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-neutral-500">Express<br/>Hyderabad</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Award size={18} strokeWidth={1.75} className="text-neutral-900" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-neutral-500">Sealed Pack<br/>Original</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Similar Mobiles */}
          {similarProducts.length > 0 && (
            <div className="py-16 border-t border-neutral-200/60 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">Similar Mobiles</h3>
                  <Link href="/mobiles" className="text-[10px] font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700">
                    View Catalog →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {similarProducts.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/mobiles/${sim.slug}`}
                      className="group block p-4 rounded-xl transition-all duration-300 hover:bg-neutral-50/80"
                    >
                      <div className="aspect-[4/3] bg-[#f7f6f3] rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4">
                        <img
                          src={sim.images[0]}
                          alt={sim.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{sim.brand}</span>
                      <h4 className="font-bold uppercase tracking-tight text-sm mb-1 text-neutral-900 group-hover:text-amber-600 transition-colors truncate">
                        {sim.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1 mb-2">{sim.tagline}</p>
                      <span className="font-mono font-black text-sm text-neutral-900">{sim.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
        <MobileBottomBar onOpenRepairModal={() => setIsRepairOpen(true)} />
        <RepairModal isOpen={isRepairOpen} onClose={() => setIsRepairOpen(false)} />
      </div>
    </SmoothScrollProvider>
  );
}
