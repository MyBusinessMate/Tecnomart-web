import { Product, Category, Collection, Setup, Testimonial, GalleryItem } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS, CATEGORIES as DEFAULT_CATEGORIES, COLLECTIONS as DEFAULT_COLLECTIONS, SETUPS as DEFAULT_SETUPS } from '../recostoData';

const PRODUCTS_KEY = 'recosto_products';
const CATEGORIES_KEY = 'recosto_categories';
const COLLECTIONS_KEY = 'recosto_collections';
const SETUPS_KEY = 'recosto_setups';
const FEEDBACK_FAQS_KEY = 'recosto_faqs';
const HOMEPAGE_TEXTS_KEY = 'recosto_homepage_texts';
const TESTIMONIALS_KEY = 'recosto_testimonials';
const GALLERY_KEY = 'recosto_gallery';
const USERS_KEY = 'recosto_users';
const CURRENT_USER_KEY = 'recosto_current_user';

export interface EditableHomepageTexts {
  heroActiveCategory1: string;
  heroTitle1: string;
  heroDesc1: string;
  heroButton1: string;
  
  heroActiveCategory2: string;
  heroTitle2: string;
  heroDesc2: string;
  heroButton2: string;
  
  heroActiveCategory3: string;
  heroTitle3: string;
  heroDesc3: string;
  heroButton3: string;

  heroActiveCategory4: string;
  heroTitle4: string;
  heroDesc4: string;
  heroButton4: string;

  heroActiveCategory5: string;
  heroTitle5: string;
  heroDesc5: string;
  heroButton5: string;
  
  categoryHeading: string;
  categorySubheading: string;
  categoryButtonText: string;
  
  curatedHeading: string;
  curatedSubheading: string;
  curatedSeriesTag: string;
  curatedButtonText: string;
  
  bestSellersHeading: string;
  bestSellersSubheading: string;
  bestSellersViewAll: string;
  
  newArrivalsHeading: string;
  newArrivalsSubheading: string;
  newArrivalsViewAll: string;
  
  deviceHeading: string;
  deviceSubheading: string;
  deviceButtonText: string;
  
  testimonialsHeading: string;
  testimonialsSubheading: string;
  
  galleryHeading: string;
  gallerySubheading: string;
  
  faqsHeading: string;
  faqsSubheading: string;
  
  newsletterHeading: string;
  newsletterSubheading: string;
  newsletterButtonText: string;

  // Header navigation
  brandWordmark: string;
  navHome: string;
  navAbout: string;
  navContact: string;
  navShopButton: string;
  navLogintext: string;
  navUserAccounttext: string;

  // About Page
  aboutTitle: string;
  aboutSubheading: string;
  aboutPhilosophyHeading: string;
  aboutPhilosophyText: string;
  aboutPillarsHeading: string;
  
  // Pillars
  aboutPillar1Tag: string;
  aboutPillar1Title: string;
  aboutPillar1Desc: string;
  aboutPillar2Tag: string;
  aboutPillar2Title: string;
  aboutPillar2Desc: string;
  aboutPillar3Tag: string;
  aboutPillar3Title: string;
  aboutPillar3Desc: string;

  // Contact Page
  contactTitle: string;
  contactDesc: string;
  contactSlaTitle: string;
  contactSlaDesc: string;
  contactPrimaryInboxTitle: string;
  contactPrimaryInboxEmail: string;
  contactCommercialDeskTitle: string;
  contactCommercialDeskEmail: string;
  contactStatusText: string;
  
  // Footer
  footerDesc: string;
  footerSlogan: string;
  footerCompanyText: string;
  footerCopyright: string;
}

const DEFAULT_HOMEPAGE_TEXTS: EditableHomepageTexts = {
  heroActiveCategory1: 'Coffee Mugs',
  heroTitle1: 'Start Strong. Finish Strong.',
  heroDesc1: 'Your best work begins with the habits you repeat every morning. Fuel every sip with purpose and stay focused on what truly matters.',
  heroButton1: 'Shop Coffee Mugs',
  
  heroActiveCategory2: 'Laptop Skins',
  heroTitle2: 'Your Laptop. Your Signature.',
  heroDesc2: 'Premium matte laptop skins crafted for creators, professionals and students who believe clean design is the ultimate flex.',
  heroButton2: 'Shop Laptop Skins',
  
  heroActiveCategory3: 'Laptop Skins',
  heroTitle3: 'Minimal Design. Maximum Impression.',
  heroDesc3: 'Transform your workspace with elegant matte finishes that protect your device while making every desk setup look effortlessly premium.',
  heroButton3: 'Browse Skins',
  
  heroActiveCategory4: 'Mobile Cases',
  heroTitle4: 'Built To Feel Premium. Made To Last Daily.',
  heroDesc4: 'Premium ribbed silicone cases with soft-touch comfort, confident grip and everyday protection that never compromises your style.',
  heroButton4: 'Shop Cases',

  heroActiveCategory5: 'Mobile Cases',
  heroTitle5: 'Protection That Looks As Good As It Feels.',
  heroDesc5: 'Clean aesthetics, premium materials and reliable protection designed for every moment of your everyday carry.',
  heroButton5: 'Explore Cases',
  
  categoryHeading: 'Shop by Category',
  categorySubheading: 'Browse our complete collection of premium workstation upgrades.',
  categoryButtonText: 'Browse More Categories',
  
  curatedHeading: 'RECOSTO PICKS',
  curatedSubheading: 'Explore our handpicked theme combinations designed to integrate flawlessly.',
  curatedSeriesTag: 'Curated Series',
  curatedButtonText: 'Curation Series',
  
  bestSellersHeading: 'Best Sellers',
  bestSellersSubheading: 'Most requested workspace accents updated weekly.',
  bestSellersViewAll: 'View All',
  
  newArrivalsHeading: 'New Arrivals',
  newArrivalsSubheading: 'Discover our newest handpicked universal workspace catalog items.',
  newArrivalsViewAll: 'View All',
  
  deviceHeading: 'Shop by Device',
  deviceSubheading: 'Accessories designed perfectly for your daily drive.',
  deviceButtonText: 'View All Devices',
  
  testimonialsHeading: 'Loved By Thousands',
  testimonialsSubheading: 'Sincere reviews from verified workstation owners in our global community.',
  
  galleryHeading: 'Our Gallery',
  gallerySubheading: 'Premium showcase of actual product shots and community workstation setups.',
  
  faqsHeading: 'Frequently Asked Questions',
  faqsSubheading: 'Everything you need to know about Recosto models.',
  
  newsletterHeading: 'Stay In The Loop',
  newsletterSubheading: 'Receive periodic drops of brand-new setups, accessory updates, and exclusive curations directly.',
  newsletterButtonText: 'Subscribe',

  // Header navigation defaults
  brandWordmark: 'RECOSTO',
  navHome: 'Home',
  navAbout: 'About',
  navContact: 'Contact',
  navShopButton: 'Shop',
  navLogintext: 'LOG IN',
  navUserAccounttext: 'YOUR ACCOUNT',

  // About Page defaults
  aboutTitle: 'About Recosto',
  aboutSubheading: 'We are a premium, multi-category workspace accessories discovery experience dedicated to perfecting your daily workstation setup.',
  aboutPhilosophyHeading: 'THE GUIDING PHILOSOPHY',
  aboutPhilosophyText: 'Modern workspaces suffer from choice fatigue. Hundreds of lookalike cable managers, screen guards, and sleeves flood digital markets. Recosto filters out the noise. We do not sell products directly. We meticulously audit design, aesthetics, and user feedback—then securely route you and your purchase to trusted fulfillment platforms like Amazon or Flipkart.',
  aboutPillarsHeading: 'THE CORE BRAND PILLARS',
  
  // Pillars defaults
  aboutPillar1Tag: 'Curation Process',
  aboutPillar1Title: 'Artisanal Choice',
  aboutPillar1Desc: 'We select materials based on premium vegan leathers, heavy alloys, and matte textures to guarantee optimal workspace symmetry.',
  aboutPillar2Tag: 'Secure Checkout',
  aboutPillar2Title: 'Absolute Security',
  aboutPillar2Desc: 'Complete your checkout inside established industry-leading channels. Enjoy certified payment layers and prime delivery routes.',
  aboutPillar3Tag: 'Device Calibration',
  aboutPillar3Title: 'Verified Fits',
  aboutPillar3Desc: 'Every curated skin, case, or organizer undergoes meticulous dimension testing against target devices before being added.',

  // Contact Page defaults
  contactTitle: 'Get in Touch',
  contactDesc: 'Have a question about accessory compatibility, marketplace redirects, or feature requests? Reach out to our workspace support desk.',
  contactSlaTitle: '⚡ Timelines',
  contactSlaDesc: 'Guaranteed support response within 12 hours.',
  contactPrimaryInboxTitle: 'Primary Inbox',
  contactPrimaryInboxEmail: 'support@recosto.com',
  contactCommercialDeskTitle: 'Commercial Desk',
  contactCommercialDeskEmail: 'partners@recosto.com',
  contactStatusText: 'RECOSTO SUPPORT DISPATCH DESK // ACTIVE',
  
  // Footer defaults
  footerDesc: 'Curated premium accessories for your everyday carry and workspace setups. Discover high-quality gear safely redirected to Amazon or Flipkart.',
  footerSlogan: 'MADE FOR THE AMBITIOUS',
  footerCompanyText: 'Recosto By Unitru',
  footerCopyright: '© 2026 Recosto. All rights reserved.'
};

const DEFAULT_FAQS = [
  { q: "What is Recosto?", a: "Recosto is a premium accessories discovery catalog. We curate the best gear. We turn your workstation into an organized temple of speed." },
  { q: "Do you sell directly?", a: "No. We do not sell items directly. We show actual product views with a single Shop on Amazon button so you always purchase safely." },
  { q: "Are the products genuine?", a: "Yes, we only link to verified brand stores and trusted sellers on our partner marketplaces." },
  { q: "How do returns work?", a: "Since purchases are concluded on Amazon, their respective premium return and instant refund policies apply." }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Senior UI/UX Designer',
    comment: 'The Minimalist Desk Mat is a work of art. The tactile feel is incredible and it complements my sleek Apple Ecosystem perfectly. Recosto has the best taste!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'David Chen',
    role: 'Full Stack Engineer',
    comment: 'Finally found an aeronautical grade laptop stand that matches my Space Gray MacBook. Sturdy pivot joints and gorgeous industrial finish.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Content Creator',
    comment: 'Recosto’s curation is next level. Saved me hours of scrolling on Amazon. Every single accessory is super premium and coordinates beautifully.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  }
];

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Evergreen Ribbed Case',
    imageUrl: '/recosto-assets/mobile-cases/CASE-M-001.png',
    tag: 'Mobile Case'
  },
  {
    id: 'g2',
    title: 'Ivory Ribbed Case',
    imageUrl: '/recosto-assets/mobile-cases/CASE-M-002.png',
    tag: 'Mobile Case'
  },
  {
    id: 'g3',
    title: 'Evergreen Laptop Skin',
    imageUrl: '/recosto-assets/laptop-skins/SKIN-M-001.png',
    tag: 'Laptop Skin'
  },
  {
    id: 'g4',
    title: 'Sandstone Laptop Skin',
    imageUrl: '/recosto-assets/laptop-skins/SKIN-M-002.png',
    tag: 'Laptop Skin'
  },
  {
    id: 'g5',
    title: 'Vegan Leather Desk Mat',
    imageUrl: '/recosto-assets/desktop-mats/MAT-M-001.png',
    tag: 'Desk Mat'
  },
  {
    id: 'g6',
    title: 'Vegan Leather Desk Mat',
    imageUrl: '/recosto-assets/desktop-mats/MAT-M-002.png',
    tag: 'Desk Mat'
  },
  {
    id: 'g7',
    title: 'Daily Affirmation Mug',
    imageUrl: '/recosto-assets/coffee-mugs/MUG-M-001.png',
    tag: 'Coffee Mug'
  },
  {
    id: 'g8',
    title: 'Daily Affirmation Mug',
    imageUrl: '/recosto-assets/coffee-mugs/MUG-M-002.png',
    tag: 'Coffee Mug'
  }
];

export function initializeDB() {
  const version = localStorage.getItem('recosto_version_tag');
  if (version !== 'v6_inr') {
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(COLLECTIONS_KEY);
    localStorage.removeItem(SETUPS_KEY);
    localStorage.removeItem(FEEDBACK_FAQS_KEY);
    localStorage.removeItem(HOMEPAGE_TEXTS_KEY);
    localStorage.removeItem(TESTIMONIALS_KEY);
    localStorage.removeItem(GALLERY_KEY);
    localStorage.setItem('recosto_version_tag', 'v5_inr');
  }

  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(COLLECTIONS_KEY)) {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
  }
  if (!localStorage.getItem(SETUPS_KEY)) {
    localStorage.setItem(SETUPS_KEY, JSON.stringify(DEFAULT_SETUPS));
  }
  if (!localStorage.getItem(FEEDBACK_FAQS_KEY)) {
    localStorage.setItem(FEEDBACK_FAQS_KEY, JSON.stringify(DEFAULT_FAQS));
  }
  if (!localStorage.getItem(HOMEPAGE_TEXTS_KEY)) {
    localStorage.setItem(HOMEPAGE_TEXTS_KEY, JSON.stringify(DEFAULT_HOMEPAGE_TEXTS));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(TESTIMONIALS_KEY)) {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem(GALLERY_KEY)) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
  }
}

// Call on load
initializeDB();

export const db = {
  getProducts(): Product[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },
  saveProducts(products: Product[]) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('cms_update'));
  },

  getCategories(): Category[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    } catch {
      return DEFAULT_CATEGORIES;
    }
  },
  saveCategories(categories: Category[]) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event('cms_update'));
  },

  getCollections(): Collection[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(COLLECTIONS_KEY) || '[]');
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  },
  saveCollections(collections: Collection[]) {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    window.dispatchEvent(new Event('cms_update'));
  },

  getSetups(): Setup[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(SETUPS_KEY) || '[]');
    } catch {
      return DEFAULT_SETUPS;
    }
  },
  saveSetups(setups: Setup[]) {
    localStorage.setItem(SETUPS_KEY, JSON.stringify(setups));
    window.dispatchEvent(new Event('cms_update'));
  },

  getTestimonials(): Testimonial[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(TESTIMONIALS_KEY) || '[]');
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  },
  saveTestimonials(testimonials: Testimonial[]) {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('cms_update'));
  },

  getGalleryItems(): GalleryItem[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]');
    } catch {
      return DEFAULT_GALLERY_ITEMS;
    }
  },
  saveGalleryItems(items: GalleryItem[]) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cms_update'));
  },

  getFAQs() {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(FEEDBACK_FAQS_KEY) || '[]');
    } catch {
      return DEFAULT_FAQS;
    }
  },
  saveFAQs(faqs: { q: string; a: string }[]) {
    localStorage.setItem(FEEDBACK_FAQS_KEY, JSON.stringify(faqs));
    window.dispatchEvent(new Event('cms_update'));
  },

  getHomepageTexts(): EditableHomepageTexts {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(HOMEPAGE_TEXTS_KEY) || JSON.stringify(DEFAULT_HOMEPAGE_TEXTS));
    } catch {
      return DEFAULT_HOMEPAGE_TEXTS;
    }
  },
  saveHomepageTexts(texts: EditableHomepageTexts) {
    localStorage.setItem(HOMEPAGE_TEXTS_KEY, JSON.stringify(texts));
    window.dispatchEvent(new Event('cms_update'));
  },

  getUsers(): any[] {
    initializeDB();
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveUsers(users: any[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event('user_update'));
  },

  getCurrentUser(): any | null {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    } catch {
      return null;
    }
  },
  setCurrentUser(user: any | null) {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    window.dispatchEvent(new Event('user_update'));
  },

  addToWishlist(productId: string) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const users = this.getUsers();
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        const wishlist = u.wishlist || [];
        if (!wishlist.includes(productId)) {
          wishlist.push(productId);
        }
        return { ...u, wishlist };
      }
      return u;
    });
    
    this.saveUsers(updatedUsers);
    
    const updatedUser = { ...user, wishlist: updatedUsers.find(u => u.email === user.email).wishlist };
    this.setCurrentUser(updatedUser);
    return true;
  },

  removeFromWishlist(productId: string) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const users = this.getUsers();
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        const wishlist = (u.wishlist || []).filter((id: string) => id !== productId);
        return { ...u, wishlist };
      }
      return u;
    });
    
    this.saveUsers(updatedUsers);
    
    const updatedUser = { ...user, wishlist: updatedUsers.find(u => u.email === user.email).wishlist };
    this.setCurrentUser(updatedUser);
    return true;
  },

  getWishlist(): string[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    return user.wishlist || [];
  },

  initializeDB() {
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(COLLECTIONS_KEY);
    localStorage.removeItem(SETUPS_KEY);
    localStorage.removeItem(FEEDBACK_FAQS_KEY);
    localStorage.removeItem(HOMEPAGE_TEXTS_KEY);
    localStorage.removeItem(TESTIMONIALS_KEY);
    localStorage.removeItem(GALLERY_KEY);
    initializeDB();
  }
};

export function getOriginalPrice(priceStr: string): string {
  if (!priceStr) return '';
  const symbolMatch = priceStr.match(/^[^0-9]*/);
  const symbol = symbolMatch ? symbolMatch[0] : '';
  const cleanNumberStr = priceStr.replace(/[^0-9]/g, '');
  const numValue = parseInt(cleanNumberStr, 10);
  
  if (isNaN(numValue) || numValue <= 0) {
    return '';
  }
  
  let originalPrice = Math.round(numValue * 1.35);
  
  if (originalPrice > 1000) {
    originalPrice = Math.round(originalPrice / 100) * 100 - 1;
  } else if (originalPrice > 100) {
    originalPrice = Math.round(originalPrice / 10) * 10 - 1;
  }
  
  const formattedNum = symbol.includes('₹')
    ? originalPrice.toLocaleString('en-IN')
    : originalPrice.toLocaleString('en-US');
  
  return `${symbol}${formattedNum}`;
}
