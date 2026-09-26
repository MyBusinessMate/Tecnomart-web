// TecnoMart Chatbot Knowledge & Laptop Catalog
// Real inventory data matching TecnoMart Hyderabad storefront

export const TECNOMART_CHATBOT_INFO = {
  storeName: "TecnoMart",
  legalName: "Tecno Mart Technologies Private Limited",
  phone: "+91 98663 88870",
  whatsappPhone: "919866388870",
  address: "7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad, 500008",
  hours: "10:30 AM – 9:30 PM (Mon - Sun)",
  experienceYears: "Since 2016",
  uspList: [
    "Grade-A+ Refurbished with 1-Year Store Warranty",
    "32-point comprehensive hardware check",
    "Same-day doorstep delivery & setup in Hyderabad",
    "Instant WhatsApp live video call inspection",
    "GST Invoice with official warranty on all items"
  ]
};

export const CHATBOT_FEATURED_LAPTOPS = [
  {
    id: "rec-hp-elitebook-840",
    slug: "hp-elitebook-840-g7",
    name: "HP EliteBook 840 G7 Ultrabook",
    brand: "HP",
    condition: "Certified Refurbished (Grade A+)",
    conditionBadge: "Refurbished",
    processor: "Intel Core i5-10310U (vPro)",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    display: "14\" FHD Anti-Glare IPS",
    battery: "Up to 8 hrs backup",
    price: "₹32,999",
    originalPrice: "₹89,990",
    rawPrice: 32999,
    discount: "63% OFF",
    warranty: "1 Year TecnoMart Warranty",
    availability: "In Stock (Hyderabad Store)",
    image: "/webp/landing/asus-zenbook-ultrabook-charcoal.webp",
    badges: ["Best for Students & Office", "1-Yr Warranty"],
    category: "refurbished",
    rating: 4.8,
    reviews: 64,
    bestFor: ["study", "office", "coding", "general"]
  },
  {
    id: "rec-macbook-air-m1",
    slug: "refurbished-macbook-air-m1",
    name: "Apple MacBook Air 13\" (M1 Chip)",
    brand: "Apple",
    condition: "Certified Refurbished (Grade A+)",
    conditionBadge: "Refurbished",
    processor: "Apple M1 Chip (8-Core CPU)",
    ram: "8GB Unified Memory",
    storage: "256GB PCIe SSD",
    display: "13.3\" Retina True Tone",
    battery: "15+ hrs battery (100% health tested)",
    price: "₹54,990",
    originalPrice: "₹99,900",
    rawPrice: 54990,
    discount: "45% OFF",
    warranty: "1 Year TecnoMart Warranty",
    availability: "In Stock (Tolichowki Hub)",
    image: "/webp/landing/apple-macbook-air-silver-open.webp",
    badges: ["Student Favorite", "Silent & Slim"],
    category: "refurbished",
    rating: 4.9,
    reviews: 240,
    bestFor: ["study", "coding", "design", "office"]
  },
  {
    id: "rec-hp-victus-15",
    slug: "hp-victus-15-gaming",
    name: "HP Victus 15 Gaming Laptop",
    brand: "HP",
    condition: "Brand New Sealed Box",
    conditionBadge: "Brand New",
    processor: "Intel Core i5-13420H (13th Gen)",
    ram: "16GB DDR4",
    storage: "512GB Gen4 SSD",
    display: "15.6\" 144Hz FHD IPS",
    graphics: "NVIDIA GeForce RTX 3050 (6GB)",
    battery: "Fast Charging 50% in 30 mins",
    price: "₹69,990",
    originalPrice: "₹82,990",
    rawPrice: 69990,
    discount: "16% OFF",
    warranty: "1 Year Official Brand Warranty + GST Bill",
    availability: "In Stock (Ready to dispatch)",
    image: "/webp/landing/asus-tuf-gaming-laptop-front.webp",
    badges: ["Gaming & 3D Render", "RTX 3050 6GB"],
    category: "new",
    rating: 4.7,
    reviews: 188,
    bestFor: ["gaming", "coding", "design"]
  },
  {
    id: "rec-lenovo-thinkpad-t490",
    slug: "lenovo-thinkpad-t490",
    name: "Lenovo ThinkPad T490 Rugged Business",
    brand: "Lenovo",
    condition: "Certified Refurbished (Grade A+)",
    conditionBadge: "Refurbished",
    processor: "Intel Core i5-8365U Quad-Core",
    ram: "16GB RAM",
    storage: "256GB NVMe SSD",
    display: "14\" FHD IPS Matte",
    battery: "6-8 hrs backup",
    price: "₹24,999",
    originalPrice: "₹74,999",
    rawPrice: 24999,
    discount: "66% OFF",
    warranty: "1 Year TecnoMart Warranty",
    availability: "In Stock (Limited units)",
    image: "/webp/laptops/asus-rog-zephyrus-g16-front.webp",
    badges: ["Under ₹25K", "Military-Grade Tough"],
    category: "refurbished",
    rating: 4.8,
    reviews: 42,
    bestFor: ["study", "office", "general"]
  },
  {
    id: "rec-macbook-pro-14-m1-pro",
    slug: "refurbished-macbook-pro-14-m1-pro",
    name: "Apple MacBook Pro 14\" (M1 Pro)",
    brand: "Apple",
    condition: "Certified Refurbished (Grade A+)",
    conditionBadge: "Refurbished",
    processor: "Apple M1 Pro (8-Core CPU, 14-Core GPU)",
    ram: "16GB Unified",
    storage: "512GB High-speed SSD",
    display: "14.2\" Liquid Retina XDR 120Hz",
    battery: "12-14 hrs battery life",
    price: "₹92,990",
    originalPrice: "₹1,94,900",
    rawPrice: 92990,
    discount: "52% OFF",
    warranty: "1 Year TecnoMart Warranty",
    availability: "In Stock",
    image: "/webp/refurbished/refurbished-apple-macbook-pro-14-m1.webp",
    badges: ["4K Video Editing", "XDR 120Hz ProMotion"],
    category: "refurbished",
    rating: 4.9,
    reviews: 78,
    bestFor: ["design", "coding", "office"]
  }
];

// Initial conversation suggestions / smart quick actions
export const INITIAL_QUICK_ACTIONS = [
  { id: "find-laptop", label: "Find a Laptop", action: "find_laptop", category: "primary" },
  { id: "browse-refurbished", label: "Browse Refurbished", action: "browse_refurbished", category: "primary" },
  { id: "browse-new", label: "Browse New Laptops", action: "browse_new", category: "primary" },
  { id: "check-availability", label: "Check Availability", action: "check_stock", category: "secondary" },
  { id: "talk-support", label: "Talk to Support", action: "talk_support", category: "support" }
];

export const BUDGET_OPTIONS = [
  { id: "b1", label: "Under ₹25,000", max: 25000, min: 0 },
  { id: "b2", label: "₹25,000 – ₹40,000", max: 40000, min: 25000 },
  { id: "b3", label: "₹40,000 – ₹60,000", max: 60000, min: 40000 },
  { id: "b4", label: "₹60,000+", max: Infinity, min: 60000 }
];

export const USE_CASE_OPTIONS = [
  { id: "study", label: "Study & College", icon: "BookOpen" },
  { id: "office", label: "Office & Productivity", icon: "Briefcase" },
  { id: "coding", label: "Coding & Development", icon: "Code2" },
  { id: "design", label: "Design & Video Editing", icon: "Palette" },
  { id: "gaming", label: "Gaming", icon: "Gamepad2" },
  { id: "general", label: "General Everyday Use", icon: "Laptop" }
];
