import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product, Category } from '../../../types';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Shield, Truck, Award, ArrowUpRight, X, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '../../../recostoData';
import gsap from 'gsap';

interface LayoutProps {
  product: Product;
  categories: Category[];
}

export function BaseEcomLayout({ product, categories }: LayoutProps) {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');
  const [isZoomed, setIsZoomed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const images = product.images?.length ? product.images : [product.imageUrl];
  
  // Fake original price logic for UI
  const priceNum = parseInt(product.price.replace(/\D/g, ''));
  const originalPrice = `₹${Math.round(priceNum * 1.3).toLocaleString('en-IN')}`;
  
  // Find category name
  const categoryObj = categories.find(c => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : 'Product';

  // Find similar products
  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };
  
  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // GSAP Animations
  useEffect(() => {
    if (galleryRef.current && detailsRef.current) {
      gsap.fromTo(galleryRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      const detailChildren = detailsRef.current.children;
      gsap.fromTo(detailChildren, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [product.id]);

  // Handle Zoom Modal ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    if (isZoomed) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-[#111]" ref={containerRef}>
      
      {/* Zoom Lightbox Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-8 right-8 w-12 h-12 bg-[#111] text-white rounded-md flex items-center justify-center hover:scale-95 transition-transform"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center p-4">
            <img 
              src={images[currentImg]} 
              alt={product.title} 
              className="w-full h-full object-contain filter drop-shadow-2xl" 
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-[#EAEAEA] rounded-md flex items-center justify-center hover:bg-[#f5f5f5] transition-colors shadow-sm text-[#111]">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImg} className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-[#EAEAEA] rounded-md flex items-center justify-center hover:bg-[#f5f5f5] transition-colors shadow-sm text-[#111]">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-8">
            {currentImg + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-[10px] uppercase tracking-[0.05em] font-medium text-[#787774]">
        <Link to="/" className="hover:text-[#111] transition-colors">HOME</Link> <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#111] transition-colors">{categoryName}</Link> <span className="mx-2">/</span>
        <span className="text-[#111]">{product.title}</span>
      </div>

      {/* Category Header */}
      <div className="text-center py-6 md:py-10">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-[#111]">{categoryName}</h1>
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {categories.slice(0, 5).map(c => (
            <button 
              key={c.id} 
              onClick={() => navigate(`/category/${c.id}`)}
              className={`text-[10px] font-bold uppercase tracking-[0.05em] px-4 py-2 rounded-full border transition-all ${c.id === product.category ? 'bg-[#111] text-white border-[#111]' : 'bg-transparent text-[#787774] border-[#EAEAEA] hover:border-[#111] hover:text-[#111]'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Image Viewer */}
          <div className="w-full lg:w-1/2" ref={galleryRef}>
            <div 
              className="bg-[#f7f6f3] border border-[#EAEAEA] rounded-[12px] p-8 md:p-16 relative flex items-center justify-center aspect-[4/5] md:aspect-square overflow-hidden group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              {/* Product Image */}
              <img 
                src={images[currentImg]} 
                alt={product.title} 
                className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-[1.02] mix-blend-multiply" 
              />
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#787774] bg-white/80 p-2 rounded-md backdrop-blur-sm border border-[#EAEAEA]">
                <ZoomIn size={20} />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#EAEAEA] rounded-md flex items-center justify-center hover:bg-[#f5f5f5] transition-colors shadow-sm opacity-0 group-hover:opacity-100 text-[#111]">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#EAEAEA] rounded-md flex items-center justify-center hover:bg-[#f5f5f5] transition-colors shadow-sm opacity-0 group-hover:opacity-100 text-[#111]">
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImg ? 'w-6 bg-[#111]' : 'w-1.5 bg-[#111]/20'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center" ref={detailsRef}>
            
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && <span className="bg-[#EDF3EC] text-[#346538] text-[9px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-full border border-[#EAEAEA]">New Arrival</span>}
              {product.isBestSeller && <span className="bg-[#FBF3DB] text-[#956400] text-[9px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-full border border-[#EAEAEA]">Best Seller</span>}
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.1] mb-3 text-[#111]">
              {product.title}
            </h2>
            <div className="text-[10px] uppercase font-bold tracking-[0.05em] text-[#787774] mb-8">
              COMPATIBILITY: <span className="text-[#111]">{product.compatibilityTags?.join(', ') || 'UNIVERSAL'}</span>
            </div>

            {/* Pricing Block */}
            <div className="flex items-center justify-between bg-white border border-[#EAEAEA] p-6 rounded-[8px] mb-10">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#787774] mb-1">Offer Price</div>
                <div className="text-4xl font-black font-mono tracking-tighter text-[#111]">{product.price}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#787774] mb-1">Original Price</div>
                <div className="text-lg font-mono line-through text-[#787774] mb-1">{originalPrice}</div>
                <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#346538] bg-[#EDF3EC] inline-block px-2 py-1 rounded-sm">30% Savings</div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#111] mb-3">Summary Profile</h3>
              <p className="text-sm text-[#2F3437] leading-[1.6]">
                {product.description || product.summary} Elevate your workspace workflow and setup with beautifully engineered, premium materials designed for daily excellence.
              </p>
            </div>

            {/* CTAs */}
            <div className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#787774] mb-4 border-b border-[#EAEAEA] pb-2">Official Marketplaces / Channels</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#FF9900] text-black py-4 rounded-[6px] font-bold uppercase tracking-[0.05em] flex justify-center items-center gap-2 hover:bg-[#e68a00] transition-transform hover:scale-[0.98] text-xs">
                  Shop on Amazon <ArrowUpRight size={16} />
                </a>
                <a href={product.flipkartUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#2874F0] text-white py-4 rounded-[6px] font-bold uppercase tracking-[0.05em] flex justify-center items-center gap-2 hover:bg-[#1a5bb8] transition-transform hover:scale-[0.98] text-xs">
                  Shop on Flipkart <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] uppercase font-bold tracking-[0.05em] text-[#787774]">
                <Shield size={12} className="text-[#111]" /> Fast Shipping via Official Partners Only
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-0 mb-10">
              {/* Accordion Item 1 */}
              <div className="border-b border-[#EAEAEA]">
                <button onClick={() => toggleAccordion('materials')} className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-[0.05em] text-[#111] hover:text-[#787774] transition-colors">
                  Acoustics & Materials
                  {openAccordion === 'materials' ? <ChevronUp size={16} className="text-[#787774]" /> : <ChevronDown size={16} className="text-[#787774]" />}
                </button>
                {openAccordion === 'materials' && (
                  <div className="pb-6 text-sm text-[#2F3437] leading-[1.6]">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Premium grade construction designed for maximum durability.</li>
                      <li>Water-resistant coating prevents permanent liquid damage.</li>
                      <li>Excellent protective padding guards against solid strike impacts.</li>
                      <li>Dynamic passive cooling architecture for peak thermal reduction.</li>
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Accordion Item 2 */}
              <div className="border-b border-[#EAEAEA]">
                <button onClick={() => toggleAccordion('specs')} className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-[0.05em] text-[#111] hover:text-[#787774] transition-colors">
                  Physical Specifications
                  {openAccordion === 'specs' ? <ChevronUp size={16} className="text-[#787774]" /> : <ChevronDown size={16} className="text-[#787774]" />}
                </button>
                {openAccordion === 'specs' && (
                  <div className="pb-6 text-sm text-[#2F3437] leading-[1.6]">
                    Dimensions and weight vary depending on the specific model. Please refer to the official marketplace listing for exact millimeter measurements and grams.
                  </div>
                )}
              </div>

              {/* Accordion Item 3 */}
              <div className="border-b border-[#EAEAEA]">
                <button onClick={() => toggleAccordion('included')} className="w-full flex justify-between items-center py-5 text-xs font-bold uppercase tracking-[0.05em] text-[#111] hover:text-[#787774] transition-colors">
                  What is Included
                  {openAccordion === 'included' ? <ChevronUp size={16} className="text-[#787774]" /> : <ChevronDown size={16} className="text-[#787774]" />}
                </button>
                {openAccordion === 'included' && (
                  <div className="pb-6 text-sm text-[#2F3437] leading-[1.6]">
                    Includes 1x {product.title} securely packaged in our signature unboxing experience.
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between items-center px-4 pt-6 border-t border-[#EAEAEA]">
              <div className="flex flex-col items-center gap-3">
                <Shield size={20} strokeWidth={1.5} className="text-[#111]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#787774] text-center">Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Truck size={20} strokeWidth={1.5} className="text-[#111]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#787774] text-center">Prime<br/>Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Award size={20} strokeWidth={1.5} className="text-[#111]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#787774] text-center">Premium<br/>Quality</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Similar Alternatives Section */}
      {similarProducts.length > 0 && (
        <div className="bg-white py-24 border-t border-[#EAEAEA]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h3 className="text-center text-xs font-bold uppercase tracking-[0.1em] text-[#111] mb-12">Similar Alternatives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarProducts.map(sim => (
                <Link key={sim.id} to={`/product/${sim.id}`} className="group bg-white rounded-[12px] p-6 border border-[#EAEAEA] hover:border-[#111] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
                  {sim.isBestSeller && <span className="bg-[#FBF3DB] text-[#956400] text-[9px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-full mb-4 inline-block">Best Seller</span>}
                  <div className="aspect-[4/3] bg-[#f7f6f3] rounded-[8px] mb-6 overflow-hidden flex items-center justify-center p-4">
                    <img src={sim.imageUrl} alt={sim.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold uppercase tracking-tight text-lg mb-2 text-[#111]">{sim.title}</h4>
                  <p className="text-sm text-[#787774] line-clamp-2 mb-4 leading-[1.6]">{sim.summary}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-[#111]">{sim.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
