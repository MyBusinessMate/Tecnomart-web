// Local high-resolution transparent assets & fallback assets for 100% reliable rendering across all preview & production environments

export const ASSETS = {
  // Brand Logos & Emblems
  logoGold: "/webp/logo.webp",
  logoFull: "/webp/tecnomart-logo.webp",

  // Hero Pedestal Products (High-res transparent cutouts)
  heroPc: "/webp/landing/flagship-rog-strix-gaming-pc-gold-amber.webp",
  heroLaptop: "/webp/landing/apple-macbook-pro-16-amber-gold-glow.webp",
  heroPhone: "/webp/landing/apple-iphone-16-pro-desert-amber-titanium.webp",

  // Category Visuals (Clean high-res PNGs)
  catMobile: "/webp/landing/apple-iphone-16-pro-desert-amber-titanium.webp",
  catLaptop: "/webp/landing/apple-macbook-air-silver-open.webp",
  catGamingPc: "/webp/landing/gaming-pc-setup-beast-gold.webp",
  catRefurbished: "/webp/landing/asus-zenbook-ultrabook-charcoal.webp",
  catRepairs: "/webp/landing/smartphone-motherboard-repair-technician.webp",
  catAccessories: "/webp/landing/gaming-peripherals-bundle-headset-controller.webp",

  // Gaming Banner Visuals
  gamingBannerPc: "/webp/landing/gaming-pc-setup-beast-gold.webp",
  blackCabinet: "/webp/landing/custom-gaming-pc-corsair-black-amber-rgb.webp",
  whiteCabinet: "/webp/landing/flagship-rog-strix-gaming-pc-gold-amber.webp",

  // Popular Picks Products
  productSmartwatch: "/webp/accessories/boat-wave-ultima-smartwatch-front.webp",
  productHeadphones: "/webp/accessories/sony-wh-1000xm5-wireless-anc-headphones.webp",
  productGpu: "/webp/landing/aorus-geforce-rtx-4090-triple-fan-gpu.webp",
  productGamingLaptop: "/webp/landing/asus-tuf-gaming-laptop-front.webp",
  productIphone15: "/webp/landing/apple-iphone-15-pro-black-titanium.webp",

  // Highlight Promo Cards
  refurbishedLaptop: "/webp/refurbished/refurbished-apple-macbook-pro-14-m1-pro.webp",
  repairHand: "/webp/landing/smartphone-motherboard-repair-technician.webp",
  repairTechnician: "/webp/landing/smartphone-motherboard-repair-technician.webp",

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
    badgeType: "red",
    image: ASSETS.productIphone15,
  },
];
