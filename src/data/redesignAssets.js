// Local high-resolution transparent assets & fallback assets for 100% reliable rendering across all preview & production environments

export const ASSETS = {
  // Brand Logos & Emblems
  logoGold: "/logo.png",
  logoFull: "/tecnomart-logo.png",

  // Hero Pedestal Products (High-res transparent cutouts)
  heroPc: "/images/landing/img-15.png",
  heroLaptop: "/images/landing/img-20.png",
  heroPhone: "/images/landing/img-16.png",

  // Category Visuals (Clean high-res PNGs)
  catMobile: "/images/landing/img-16.png",
  catLaptop: "/images/landing/img-5.png",
  catGamingPc: "/images/landing/img-1.png",
  catRefurbished: "/images/landing/img-11.png",
  catRepairs: "/images/landing/img-4.png",
  catAccessories: "/images/landing/img-10.png",

  // Gaming Banner Visuals
  gamingBannerPc: "/images/landing/img-1.png",
  blackCabinet: "/images/landing/img-14.png",
  whiteCabinet: "/images/landing/img-15.png",

  // Popular Picks Products
  productSmartwatch: "/images/landing/img-8.png",
  productHeadphones: "/images/landing/img-6.png",
  productGpu: "/images/landing/img-3.png",
  productGamingLaptop: "/images/landing/img-9.png",
  productIphone15: "/images/landing/img-12.png",

  // Highlight Promo Cards
  refurbishedLaptop: "/images/landing/img-11.png",
  repairHand: "/images/landing/img-4.png",
  repairTechnician: "/images/landing/img-4.png",

  // Brand SVG Logos
  svgApple: "/svg/apple.svg",
  svgSamsung: "/svg/samsung.svg",
  svgAsus: "/svg/asus.svg",
  svgDell: "/svg/dell-mono.svg",
  svgHp: "/svg/hp.svg",
  svgLenovo: "/svg/lenovo-mono.svg",
  svgMsi: "/svg/msi.svg",
  svgAcer: "/svg/acer.svg",

  // Review Avatars
  avatar1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  avatar3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
  avatar4: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",

  // Map Imagery
  mapImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
};

export const CATEGORIES = [
  {
    id: "mobiles",
    name: "Mobiles",
    subtitle: "Latest Smartphones",
    image: ASSETS.catMobile,
    isImage: true,
  },
  {
    id: "laptops",
    name: "Laptops",
    subtitle: "For Work & Play",
    image: ASSETS.catLaptop,
    isImage: true,
  },
  {
    id: "gaming-pcs",
    name: "Gaming PCs",
    subtitle: "Built to Perform",
    image: ASSETS.catGamingPc,
    isImage: true,
  },
  {
    id: "refurbished",
    name: "Refurbished",
    subtitle: "Smart Savings",
    image: ASSETS.catRefurbished,
    isImage: true,
  },
  {
    id: "repairs",
    name: "Repairs",
    subtitle: "Fast & Reliable",
    image: ASSETS.catRepairs,
    isImage: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    subtitle: "Complete Your Tech",
    image: ASSETS.catAccessories,
    isImage: true,
  },
];

export const TRUST_BADGES = [
  {
    id: 1,
    title: "Best Prices",
    subtitle: "Guaranteed",
    iconType: "price",
  },
  {
    id: 2,
    title: "Expert Engineers",
    subtitle: "Certified Professionals",
    iconType: "engineer",
  },
  {
    id: 3,
    title: "Genuine Parts",
    subtitle: "100% Original",
    iconType: "parts",
  },
  {
    id: 4,
    title: "Warranty",
    subtitle: "Upto 2 Years",
    iconType: "warranty",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Trusted Since 2016",
    subtitle: "Serving Thousands of Happy Customers",
    iconType: "trusted",
  },
  {
    id: 2,
    title: "Affordable Pricing",
    subtitle: "Best Value for Your Money",
    iconType: "affordable",
  },
  {
    id: 3,
    title: "Fast Delivery",
    subtitle: "Pan India Safe & Secure",
    iconType: "delivery",
  },
  {
    id: 4,
    title: "Easy Returns",
    subtitle: "Hassle-Free Experience",
    iconType: "returns",
  },
  {
    id: 5,
    title: "Secure Payments",
    subtitle: "100% Safe Transactions",
    iconType: "secure",
  },
  {
    id: 6,
    title: "After Sales Support",
    subtitle: "We're Here For You",
    iconType: "support",
  },
];

export const POPULAR_PRODUCTS = [
  {
    id: "p1",
    name: "boAt Wave Ultima",
    subtitle: "Smartwatch",
    price: "₹1,499",
    rawPrice: 1499,
    badge: "HOT",
    badgeType: "red",
    image: ASSETS.productSmartwatch,
  },
  {
    id: "p2",
    name: "Sony WH-1000XM5",
    subtitle: "Wireless Headphones",
    price: "₹24,990",
    rawPrice: 24990,
    badge: "NEW",
    badgeType: "green",
    image: ASSETS.productHeadphones,
  },
  {
    id: "p3",
    name: "Zotac Gaming RTX 4060",
    subtitle: "8GB Dedicated GPU",
    price: "₹32,999",
    rawPrice: 32999,
    badge: "BESTSELLER",
    badgeType: "gold",
    image: ASSETS.productGpu,
  },
  {
    id: "p4",
    name: "Asus TUF F15",
    subtitle: "Gaming Laptop",
    price: "₹79,990",
    rawPrice: 79990,
    badge: "HOT",
    badgeType: "red",
    image: ASSETS.productGamingLaptop,
  },
  {
    id: "p5",
    name: "iPhone 15 (128GB)",
    subtitle: "Black",
    price: "₹69,900",
    rawPrice: 69900,
    badge: "NEW",
    badgeType: "green",
    image: ASSETS.productIphone15,
  },
];
