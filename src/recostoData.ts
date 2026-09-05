import { Product, Category, Collection, Setup, UseCase } from './types';

export const CATEGORIES: Category[] = [
  { id: 'mobile-cases', name: 'Mobile Cases', count: 2, description: 'Premium protection for your device.' },
  { id: 'laptop-skins', name: 'Laptop Skins', count: 2, description: 'Premium matte skins for your laptop.' },
  { id: 'desk-mats', name: 'Desk Mats', count: 2, description: 'Elevate your entire workspace.' },
  { id: 'coffee-mugs', name: 'Coffee Mugs', count: 2, description: 'Start your day with purpose.' },
  { id: 'mobile-covers', name: 'Mobile Covers', count: 124, description: 'Premium protection for your device.' },
  { id: 'tempered-glass', name: 'Tempered Glass', count: 85, description: 'Shatter-proof screen protection.' },
  { id: 'laptop-sleeves', name: 'Laptop Sleeves', count: 42, description: 'Minimalist protection for laptops.' },
  { id: 'mouse-pads', name: 'Mouse Pads', count: 30, description: 'Smooth glide for work and play.' },
  { id: 'laptop-stands', name: 'Laptop Stands', count: 15, description: 'Ergonomic elevation.' },
  { id: 'chargers', name: 'Chargers', count: 56, description: 'Fast and reliable power.' },
  { id: 'cable-organizers', name: 'Cable Organizers', count: 22, description: 'Keep your setup clean.' },
  { id: 'workspace-essentials', name: 'Workspace Essentials', count: 45, description: 'Curated for productivity.' },
  { id: 'gaming-accessories', name: 'Gaming Accessories', count: 68, description: 'Level up your gaming setup.' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'CASE-001',
    title: 'Evergreen Ribbed Silicone Case',
    summary: 'Bold in color. Minimal in design.\n\nDesigned with a premium liquid silicone exterior and signature ribbed texture, the Evergreen Case delivers confident protection without compromising style. Comfortable to hold, resistant to fingerprints, and built for everyday drops, it keeps your phone looking as premium as the day you bought it.',
    price: '₹999',
    imageUrl: '/recosto-assets/mobile-cases/CASE-001.png',
    images: [
      '/recosto-assets/mobile-cases/CASE-001.png',
      '/recosto-assets/mobile-cases/CASE-M-001.png'
    ],
    category: 'mobile-cases',
    amazonUrl: '#',
    flipkartUrl: '#',
    isBestSeller: true,
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'CASE-002',
    title: 'Ivory Ribbed Silicone Case',
    summary: 'Clean design. Everyday confidence.\n\nFinished in a timeless ivory tone with a soft-touch matte texture, this premium silicone case offers reliable protection while maintaining a refined look. Raised edges help safeguard the display and camera, while the comfortable grip makes it perfect for daily use.',
    price: '₹999',
    imageUrl: '/recosto-assets/mobile-cases/CASE-002.png',
    images: [
      '/recosto-assets/mobile-cases/CASE-002.png',
      '/recosto-assets/mobile-cases/CASE-M-002.png'
    ],
    category: 'mobile-cases',
    amazonUrl: '#',
    flipkartUrl: '#',
    isBestSeller: true,
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'SKIN-001',
    title: 'Evergreen Premium Matte Laptop Skin',
    summary: 'Minimal look. Maximum personality.\n\nGive your laptop a premium makeover with our Evergreen Matte Skin. Precision cut for a perfect fit, it protects against scratches while maintaining a clean, professional appearance without adding bulk.',
    price: '₹699',
    imageUrl: '/recosto-assets/laptop-skins/SKIN-001.png',
    images: [
      '/recosto-assets/laptop-skins/SKIN-001.png',
      '/recosto-assets/laptop-skins/SKIN-M-001.png'
    ],
    category: 'laptop-skins',
    amazonUrl: '#',
    flipkartUrl: '#',
    isBestSeller: true,
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'SKIN-002',
    title: 'Sandstone Premium Matte Laptop Skin',
    summary: 'Elegant. Timeless. Built for creators.\n\nThe Sandstone Matte Skin combines subtle aesthetics with everyday protection. Crafted using premium vinyl, it resists scratches, bubbles and residue while giving your laptop a refined premium finish.',
    price: '₹699',
    imageUrl: '/recosto-assets/laptop-skins/SKIN-002.png',
    images: [
      '/recosto-assets/laptop-skins/SKIN-002.png',
      '/recosto-assets/laptop-skins/SKIN-M-002.png'
    ],
    category: 'laptop-skins',
    amazonUrl: '#',
    flipkartUrl: '#',
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'MAT-001',
    title: 'Evergreen Premium Desk Mat',
    summary: 'Your workspace deserves better.\n\nMade with a premium vegan leather surface, the Evergreen Desk Mat creates a clean workspace while protecting your desk from scratches, spills and everyday wear. Smooth enough for effortless mouse movement and durable enough for years of daily use.',
    price: '₹1,299',
    imageUrl: '/recosto-assets/desktop-mats/MAT-001.png',
    images: [
      '/recosto-assets/desktop-mats/MAT-001.png',
      '/recosto-assets/desktop-mats/MAT-M-001.png'
    ],
    category: 'desk-mats',
    amazonUrl: '#',
    flipkartUrl: '#',
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'MAT-002',
    title: 'Midnight Premium Desk Mat',
    summary: 'Professional from every angle.\n\nDesigned for modern workspaces, the Midnight Desk Mat adds a refined look while protecting your desk surface. Its premium finish offers a comfortable writing experience and smooth mouse control throughout your workday.',
    price: '₹1,299',
    imageUrl: '/recosto-assets/desktop-mats/MAT-002.png',
    images: [
      '/recosto-assets/desktop-mats/MAT-002.png',
      '/recosto-assets/desktop-mats/MAT-M-002.png'
    ],
    category: 'desk-mats',
    amazonUrl: '#',
    flipkartUrl: '#',
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'MUG-001',
    title: 'Get Shit Done Motivation Mug',
    summary: 'One mug. Zero excuses.\n\nWhether you\'re building your business, studying late or starting another Monday, this premium ceramic mug keeps your favourite drink close and your mindset even closer. A daily reminder to focus, execute and finish what matters.',
    price: '₹499',
    imageUrl: '/recosto-assets/coffee-mugs/MUG-001.png',
    images: [
      '/recosto-assets/coffee-mugs/MUG-001.png',
      '/recosto-assets/coffee-mugs/MUG-M-001.png'
    ],
    category: 'coffee-mugs',
    amazonUrl: '#',
    flipkartUrl: '#',
    compatibilityTags: ['Universal'],
    rating: 5,
  },
  {
    id: 'MUG-002',
    title: 'Bloom Daily Affirmation Mug',
    summary: 'Small reminders. Big impact.\n\nFeaturing uplifting affirmations wrapped in a soft pastel design, this premium ceramic mug brings positivity into your everyday routine. Perfect for coffee, tea or quiet moments that help you reset and recharge.',
    price: '₹499',
    imageUrl: '/recosto-assets/coffee-mugs/MUG-002.png',
    images: [
      '/recosto-assets/coffee-mugs/MUG-002.png',
      '/recosto-assets/coffee-mugs/MUG-M-002.png'
    ],
    category: 'coffee-mugs',
    amazonUrl: '#',
    flipkartUrl: '#',
    compatibilityTags: ['Universal'],
    rating: 5,
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'creator-essentials',
    title: 'Creator Essentials',
    description: 'Everything you need to craft your best work.',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800',
    productIds: ['MAT-001', 'CASE-002', 'MUG-001'],
  },
  {
    id: 'minimal-desk',
    title: 'Minimal Desk Setup',
    description: 'Keep it clean, keep it focused.',
    imageUrl: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800',
    productIds: ['MAT-002', 'CASE-001', 'SKIN-001'],
  },
  {
    id: 'travel-tech',
    title: 'Travel Tech Essentials',
    description: 'Protection and power on the go.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    productIds: ['SKIN-002', 'MUG-002'],
  }
];

export const SETUPS: Setup[] = [
  {
    id: 's1',
    title: 'The Deep Focus Workspace',
    description: 'A monochromatic, distraction-free desk setup designed for deep work.',
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200',
    productIds: ['MAT-001', 'SKIN-001', 'CASE-001']
  },
  {
    id: 's2',
    title: 'Creator Studio Plus',
    description: 'Equipped with essentials for video editing and content creation.',
    imageUrl: 'https://images.unsplash.com/photo-1598550874175-4d0ef43eeed7?auto=format&fit=crop&q=80&w=1200',
    productIds: ['MAT-002', 'SKIN-002', 'MUG-001']
  }
];

export const USE_CASES: UseCase[] = [
  { id: 'student', title: 'Student Setup', description: 'Affordable, durable essentials.', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800' },
  { id: 'office', title: 'Office Setup', description: 'Professional and ergonomic.', imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=800' },
  { id: 'gaming', title: 'Gaming Setup', description: 'High performance accessories.', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb?auto=format&fit=crop&q=80&w=800' },
  { id: 'travel', title: 'Travel Tech', description: 'Compact and protected.', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
];
