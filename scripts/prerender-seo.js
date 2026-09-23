import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  MOBILES_DATA,
  LAPTOPS_DATA,
  ACCESSORIES_DATA,
  GAMING_DATA,
  REFURBISHED_DATA,
} from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.tecnomart.in';
const DIST_DIR = path.resolve(__dirname, '../dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Dist directory does not exist! Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Template dist/index.html not found!');
  process.exit(1);
}

const BASE_HTML = fs.readFileSync(templatePath, 'utf-8');

const STATIC_ROUTES = [
  {
    path: '/mobiles',
    title: 'Best Mobile Shop in Hyderabad | Buy iPhones, Samsung Galaxy & Flagships | TecnoMart',
    description: 'Looking for the best mobile shop in Hyderabad? TecnoMart in Tolichowki offers the best prices on iPhone 16 Pro Max, Samsung S24 Ultra, OnePlus 12, and Google Pixel with official warranty and 3-hour doorstep delivery.',
    image: '/webp/bento-grid-images/mobiles.webp',
  },
  {
    path: '/laptops',
    title: 'Best Laptop Store in Hyderabad | Buy MacBooks, Gaming & Creator Laptops | TecnoMart',
    description: 'Looking for the best laptop store in Hyderabad? TecnoMart Tolichowki features Apple MacBook Pro M3, ASUS ROG Zephyrus, Dell XPS, Lenovo Legion, and HP Spectre with 0% No-Cost EMI and same-day delivery.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    path: '/accessories',
    title: 'Best Computer Accessories, Chargers & Audio Gear in Hyderabad | TecnoMart',
    description: 'Shop genuine accessories at TecnoMart Hyderabad. Apple 20W adapters, MagSafe chargers, mechanical gaming keyboards, studio headphones, and GaN multi-port chargers with official warranty in Tolichowki.',
    image: '/webp/bento-grid-images/accessories.webp',
  },
  {
    path: '/gaming',
    title: 'Custom Gaming PC Builders in Hyderabad | Liquid-Cooled RTX Desktops | TecnoMart',
    description: 'Hyderabad\'s top custom liquid-cooled gaming PC builders in Tolichowki. Pre-built and bespoke rigs with NVIDIA RTX 4090, 4080 Super, AMD Ryzen 7800X3D, stress-tested with comprehensive warranty.',
    image: '/webp/bento-grid-images/pc.webp',
  },
  {
    path: '/refurbished',
    title: 'Certified Refurbished Laptops & Mobiles in Hyderabad | 1-Year Warranty | TecnoMart',
    description: 'Buy Grade-A+ certified refurbished iPhones, MacBooks, and business laptops in Hyderabad. 32-point hardware inspection, genuine battery health, 7-day replacement, and 1-year TecnoMart store warranty.',
    image: '/webp/bento-grid-images/mobiles.webp',
  },
  {
    path: '/repairs',
    title: 'Best Mobile & Laptop Repair Service in Hyderabad | Same-Day Screen & Battery Fix | TecnoMart',
    description: 'Looking for the best mobile and laptop repair in Hyderabad? TecnoMart Tolichowki service center offers same-day screen replacement, battery upgrades, chip-level logic board repairs, and 90-day warranty.',
    image: '/webp/logo.webp',
  },
  {
    path: '/pc-builds',
    title: 'Custom PC Builder & Configurator | Live Wattage & Price Estimator | TecnoMart Hyderabad',
    description: 'Build your dream gaming and workstation PC online with TecnoMart Hyderabad. Real-time component compatibility, live wattage calculations, instant pricing, and expert assembly in Tolichowki.',
    image: '/webp/bento-grid-images/pc.webp',
  },
  {
    path: '/deals',
    title: 'Best Tech Deals, Flash Discounts & Open-Box Offers in Hyderabad | TecnoMart',
    description: 'Exclusive limited-time tech deals in Hyderabad. Massive price drops on flagship smartphones, creator laptops, gaming monitors, and authentic accessories at TecnoMart Tolichowki showroom.',
    image: '/webp/logo.webp',
  },
  {
    path: '/blogs',
    title: 'Tech Insights, Buyer Guides & Device Care | TecnoMart Hyderabad',
    description: 'Read in-depth tech comparisons, smartphone buying guides, Apple accessory verification tips, and PC building advice from TecnoMart\'s certified engineers in Hyderabad.',
    image: '/webp/logo.webp',
  },
  {
    path: '/about',
    title: 'About TecnoMart — Best Rated Tech Store & Service Center in Hyderabad',
    description: 'Learn why TecnoMart is Hyderabad\'s best-rated electronics store and certified service center in Tolichowki. Over 10+ years of trusted hardware expertise, 100% genuine units, and thousands of satisfied customers.',
    image: '/webp/logo.webp',
  },
  {
    path: '/contact',
    title: 'Contact TecnoMart — Tech Store & Service Center in Tolichowki, Hyderabad',
    description: 'Visit TecnoMart at 7 Tombs Rd, Tolichowki, Hyderabad. Call +91 98663 88870 or WhatsApp us for product availability, PC build quotes, or same-day repair appointments.',
    image: '/webp/logo.webp',
  },
  {
    path: '/compare',
    title: 'Compare Smartphones & Laptops Side-by-Side | TecnoMart Hyderabad',
    description: 'Compare detailed technical specifications, benchmark performance, camera systems, battery life, and prices of smartphones and laptops side-by-side at TecnoMart.',
    image: '/webp/logo.webp',
  },
  {
    path: '/emi-calculator',
    title: 'No-Cost & Low-Cost EMI Calculator for Mobiles & Laptops | TecnoMart Hyderabad',
    description: 'Calculate monthly EMI installments for Apple iPhones, MacBooks, and gaming laptops. Compare tenure, interest rates, and down payment plans with leading Indian banks at TecnoMart.',
    image: '/webp/logo.webp',
  },
  {
    path: '/exchange',
    title: 'Trade-In & Mobile/Laptop Exchange Value Calculator | TecnoMart Hyderabad',
    description: 'Get an instant valuation to trade in your old phone or laptop for cash or store credit towards a brand-new device at TecnoMart Tolichowki showroom in Hyderabad.',
    image: '/webp/logo.webp',
  },
  {
    path: '/corporate',
    title: 'Corporate IT Procurement & Enterprise Hardware Bulk Orders | TecnoMart Hyderabad',
    description: 'Empower your Hyderabad business with bulk laptop procurement, workstations, fleet device management, GST invoices, and dedicated technical support from TecnoMart.',
    image: '/webp/logo.webp',
  },
  {
    path: '/students',
    title: 'Student & Educator Discount Program on MacBooks & Laptops | TecnoMart Hyderabad',
    description: 'Verified student and educator discounts on Apple MacBooks, iPads, and Windows creator laptops in Hyderabad. Save up to ₹15,000 with valid university or college ID at TecnoMart.',
    image: '/webp/logo.webp',
  },
  {
    path: '/sitemap',
    title: 'HTML Sitemap — Departments, Products, Repairs & Tools | TecnoMart Hyderabad',
    description: 'Complete directory of all departments, products, repair services, financial tools, and customer guides at TecnoMart Hyderabad.',
    image: '/webp/logo.webp',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | TecnoMart Technologies Pvt Ltd Hyderabad',
    description: 'Privacy policy and data protection commitments for TecnoMart customers, repair clients, and store visitors in Hyderabad.',
    image: '/webp/logo.webp',
  },
  {
    path: '/terms',
    title: 'Terms & Conditions, Warranty & Return Policies | TecnoMart Hyderabad',
    description: 'Terms and conditions, warranty coverage, repair guarantees, and return policies for purchases and services at TecnoMart Tolichowki, Hyderabad.',
    image: '/webp/logo.webp',
  },
];

const BLOG_ARTICLES = [
  {
    slug: 'iphone-16-pro-vs-galaxy-s24-ultra-hyderabad',
    title: 'iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra: Which Flagship to Pick in Hyderabad?',
    description: 'A practical real-world comparison of camera optics, battery longevity under harsh Hyderabad summers, and resale values between iPhone 16 Pro Max and Galaxy S24 Ultra.',
    image: '/webp/bento-grid-images/mobiles.webp',
  },
  {
    slug: 'how-to-spot-fake-apple-accessories',
    title: 'How to Spot Counterfeit Apple Chargers and Accessories in India | TecnoMart Guide',
    description: 'Learn the 5 critical checks to verify genuine Apple 20W adapters, MagSafe pucks, and braided USB-C cables before buying in Hyderabad.',
    image: '/webp/bento-grid-images/accessories.webp',
  },
];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtmlForRoute({ title, description, canonicalUrl, ogImage, schema, isNoindex = false }) {
  let html = BASE_HTML;

  // 1. Replace Title
  const safeTitle = escapeHtml(title);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // 2. Replace Meta Description
  const safeDesc = escapeHtml(description);
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );

  // 3. Replace or Insert Canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }

  // 4. Update Open Graph tags
  const resolvedImg = ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:image" content="${resolvedImg}" />`);

  // 5. Update Twitter tags
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:image" content="${resolvedImg}" />`);

  // 6. Robots tag override if noindex
  if (isNoindex) {
    html = html.replace(
      /<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      '<meta name="robots" content="noindex, nofollow" />'
    );
  }

  // 7. Inject Route Schema if provided
  if (schema) {
    const schemaTag = `\n    <!-- Route Structured Data -->\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2)}\n    </script>\n`;
    html = html.replace(/<\/head>/i, `${schemaTag}  </head>`);
  }

  return html;
}

function writeRouteFile(routePath, content) {
  const cleanPath = routePath.replace(/^\//, '');
  const targetDir = path.join(DIST_DIR, cleanPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, content, 'utf-8');
}

let generatedCount = 0;

// 1. Static Storefront Pages
STATIC_ROUTES.forEach((route) => {
  const canonicalUrl = `${DOMAIN}${route.path}`;
  const html = buildHtmlForRoute({
    title: route.title,
    description: route.description,
    canonicalUrl,
    ogImage: route.image,
  });
  writeRouteFile(route.path, html);
  generatedCount++;
});

// 2. Product Detail Pages
const processProducts = (products, categorySlug) => {
  products.forEach((product) => {
    if (!product.slug) return;
    const routePath = `/${categorySlug}/${product.slug}`;
    const canonicalUrl = `${DOMAIN}${routePath}`;
    const primaryImg = product.images?.[0] || product.image || '/webp/logo.webp';
    const numPrice = product.rawPrice || Number(String(product.price || '0').replace(/[^0-9]/g, '')) || 9999;
    const title = `${product.name} — Best Price in Hyderabad | TecnoMart Tolichowki`;
    const description = `Buy authentic ${product.name} (${product.brand}) at TecnoMart Tolichowki, Hyderabad. Best INR price (${product.price || '₹' + numPrice}), official manufacturer warranty, and 3-hour doorstep delivery.`;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.tagline || description,
      image: primaryImg.startsWith('http') ? primaryImg : `${DOMAIN}${primaryImg.startsWith('/') ? '' : '/'}${primaryImg}`,
      brand: {
        '@type': 'Brand',
        name: product.brand || 'TecnoMart',
      },
      sku: product.id || product.slug,
      mpn: product.slug,
      url: canonicalUrl,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: numPrice,
        itemCondition: product.slug.includes('refurbished') ? 'https://schema.org/RefurbishedCondition' : 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: 'TecnoMart',
          url: DOMAIN,
        },
      },
      ...(product.rating ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(product.rating),
          reviewCount: String(product.reviewCount || 100),
          bestRating: '5',
          worstRating: '1',
        },
      } : {}),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
        { '@type': 'ListItem', position: 2, name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1), item: `${DOMAIN}/${categorySlug}` },
        { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
      ],
    };

    const combinedSchema = {
      '@context': 'https://schema.org',
      '@graph': [breadcrumbSchema, productSchema],
    };

    const html = buildHtmlForRoute({
      title,
      description,
      canonicalUrl,
      ogImage: primaryImg,
      schema: combinedSchema,
    });

    writeRouteFile(routePath, html);
    generatedCount++;
  });
};

processProducts(MOBILES_DATA, 'mobiles');
processProducts(LAPTOPS_DATA, 'laptops');
processProducts(ACCESSORIES_DATA, 'accessories');
processProducts(GAMING_DATA, 'gaming');
processProducts(REFURBISHED_DATA, 'refurbished');

// 3. Blog Detail Pages
BLOG_ARTICLES.forEach((article) => {
  const routePath = `/blogs/${article.slug}`;
  const canonicalUrl = `${DOMAIN}${routePath}`;
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${DOMAIN}${article.image.startsWith('/') ? '' : '/'}${article.image}`,
    datePublished: '2026-09-14',
    dateModified: '2026-09-19',
    author: {
      '@type': 'Organization',
      name: 'TecnoMart Hardware Specialists',
      url: DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TecnoMart',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAIN}/webp/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const html = buildHtmlForRoute({
    title: `${article.title} | TecnoMart Hyderabad`,
    description: article.description,
    canonicalUrl,
    ogImage: article.image,
    schema: blogSchema,
  });

  writeRouteFile(routePath, html);
  generatedCount++;
});

// 4. Prerender 404.html
const notFoundHtml = buildHtmlForRoute({
  title: 'Page Not Found (404) | TecnoMart Hyderabad',
  description: 'The page you are looking for does not exist or has moved. Explore our latest mobiles, laptops, accessories and repair services in Hyderabad.',
  canonicalUrl: `${DOMAIN}/404`,
  ogImage: '/webp/logo.webp',
  isNoindex: true,
});
fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
generatedCount++;

console.log(`Successfully generated SEO static snapshots for ${generatedCount} routes in ${DIST_DIR}`);
