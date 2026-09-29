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

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// -------------------------------------------------------------
// Shared Layout Shell for Prerendered Inner HTML
// -------------------------------------------------------------
function wrapPageShell({ breadcrumbItems = [], title, subtitle, mainHtml }) {
  const breadcrumbHtml = breadcrumbItems.length
    ? `<nav aria-label="Breadcrumb" style="font-size:12px;color:#6b7280;margin-bottom:16px;">
        ${breadcrumbItems
          .map((item, idx) => {
            if (idx === breadcrumbItems.length - 1) {
              return `<span style="color:#111827;font-weight:600;">${escapeHtml(item.name)}</span>`;
            }
            return `<a href="${item.url}" style="color:#6b7280;text-decoration:none;">${escapeHtml(item.name)}</a> <span style="margin:0 4px;">/</span> `;
          })
          .join('')}
       </nav>`
    : '';

  return `
    <div style="min-height:100vh;background:#ffffff;display:flex;flex-direction:column;font-family:system-ui,-apple-system,sans-serif;">
      <header style="height:48px;background:#0d0d0d;display:flex;align-items:center;justify-content:space-between;padding:0 16px;">
        <a href="/" style="font-weight:900;color:#ffffff;font-size:16px;letter-spacing:-0.5px;text-decoration:none;">TECNOMART</a>
        <nav aria-label="Quick links" style="display:flex;gap:12px;font-size:13px;">
          <a href="/mobiles" style="color:#e5e5e5;text-decoration:none;">Mobiles</a>
          <a href="/laptops" style="color:#e5e5e5;text-decoration:none;">Laptops</a>
          <a href="/gaming" style="color:#e5e5e5;text-decoration:none;">Gaming PCs</a>
          <a href="/accessories" style="color:#e5e5e5;text-decoration:none;">Accessories</a>
          <a href="/repairs" style="color:#e5e5e5;text-decoration:none;">Repairs</a>
          <a href="/contact" style="color:#e5e5e5;text-decoration:none;">Contact</a>
        </nav>
      </header>
      <main id="main-content" style="max-width:1380px;margin:0 auto;padding:24px 16px;width:100%;box-sizing:border-box;">
        ${breadcrumbHtml}
        <header style="margin-bottom:28px;">
          <h1 style="font-size:28px;font-weight:900;line-height:1.2;color:#111827;margin:0 0 8px 0;">${escapeHtml(title)}</h1>
          ${subtitle ? `<p style="font-size:15px;color:#4b5563;line-height:1.6;margin:0;max-width:850px;">${escapeHtml(subtitle)}</p>` : ''}
        </header>
        ${mainHtml}
      </main>
      <footer style="background:#111827;color:#9ca3af;padding:32px 16px;margin-top:auto;font-size:13px;border-top:1px solid #1f2937;">
        <div style="max-width:1380px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;">
          <div>
            <p style="color:#ffffff;font-weight:700;margin:0 0 6px 0;">TecnoMart Hyderabad</p>
            <p style="margin:0;line-height:1.5;">7 Tombs Rd, Raghava Colony, Tolichowki, Hyderabad, Telangana 500008<br/>Hotline: <a href="tel:+919866388870" style="color:#f59e0b;text-decoration:none;">+91 98663 88870</a></p>
          </div>
          <div style="display:flex;gap:16px;align-items:center;">
            <a href="/repairs" style="color:#d1d5db;text-decoration:none;">Repairs</a>
            <a href="/pc-builds" style="color:#d1d5db;text-decoration:none;">PC Configurator</a>
            <a href="/deals" style="color:#d1d5db;text-decoration:none;">Deals</a>
            <a href="/contact" style="color:#d1d5db;text-decoration:none;">Contact</a>
            <a href="/sitemap" style="color:#d1d5db;text-decoration:none;">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  `;
}

// -------------------------------------------------------------
// Category Product List HTML Generator
// -------------------------------------------------------------
function generateCategoryBodyHtml({ categoryName, categorySlug, description, products }) {
  const cardsHtml = products
    .map((p) => {
      const pUrl = `/${categorySlug}/${p.slug}`;
      const img = p.images?.[0] || p.image || '/webp/logo.webp';
      const numPrice = p.rawPrice || Number(String(p.price || '0').replace(/[^0-9]/g, '')) || 0;
      const formattedPrice = numPrice ? `₹${numPrice.toLocaleString('en-IN')}` : p.price || '';

      return `
        <article style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <a href="${pUrl}" style="text-decoration:none;color:inherit;">
              <img src="${img}" alt="${escapeHtml(p.name)}" style="width:100%;height:180px;object-fit:contain;border-radius:8px;margin-bottom:12px;background:#f9fafb;" loading="lazy" />
              <div style="font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;margin-bottom:4px;">${escapeHtml(p.brand || 'TecnoMart')}</div>
              <h2 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 6px 0;line-height:1.3;">${escapeHtml(p.name)}</h2>
            </a>
            ${p.tagline ? `<p style="font-size:12px;color:#6b7280;margin:0 0 8px 0;line-height:1.4;">${escapeHtml(p.tagline)}</p>` : ''}
          </div>
          <div style="margin-top:12px;padding-top:12px;border-top:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:16px;font-weight:800;color:#111827;">${formattedPrice}</div>
              ${p.originalPrice ? `<div style="font-size:11px;color:#9ca3af;text-decoration:line-through;">${escapeHtml(p.originalPrice)}</div>` : ''}
            </div>
            <a href="${pUrl}" style="background:#0d0d0d;color:#ffffff;font-size:12px;font-weight:700;padding:8px 12px;border-radius:6px;text-decoration:none;">View Specs</a>
          </div>
        </article>
      `;
    })
    .join('');

  const mainHtml = `
    <section aria-label="${escapeHtml(categoryName)} Products">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;">
        ${cardsHtml}
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: categoryName, url: `/${categorySlug}` },
    ],
    title: `${categoryName} in Hyderabad`,
    subtitle: description,
    mainHtml,
  });
}

// -------------------------------------------------------------
// Product Detail Body HTML Generator
// -------------------------------------------------------------
function generateProductDetailBodyHtml({ product, categorySlug }) {
  const pUrl = `/${categorySlug}/${product.slug}`;
  const img = product.images?.[0] || product.image || '/webp/logo.webp';
  const numPrice = product.rawPrice || Number(String(product.price || '0').replace(/[^0-9]/g, '')) || 0;
  const formattedPrice = numPrice ? `₹${numPrice.toLocaleString('en-IN')}` : product.price || '';

  const specsRows = product.specs
    ? Object.entries(product.specs)
        .map(
          ([k, v]) => `
            <tr style="border-bottom:1px solid #f3f4f6;">
              <th style="text-align:left;padding:8px 12px;width:35%;font-weight:600;color:#4b5563;font-size:13px;">${escapeHtml(k)}</th>
              <td style="padding:8px 12px;color:#111827;font-size:13px;">${escapeHtml(v)}</td>
            </tr>`
        )
        .join('')
    : '';

  const mainHtml = `
    <article style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px;align-items:start;">
      <div style="border:1px solid #e5e7eb;border-radius:16px;padding:24px;background:#f9fafb;text-align:center;">
        <img src="${img}" alt="${escapeHtml(product.name)}" style="max-width:100%;max-height:380px;object-fit:contain;border-radius:12px;" />
      </div>
      <div>
        <div style="font-size:12px;font-weight:800;color:#d97706;text-transform:uppercase;margin-bottom:6px;">${escapeHtml(product.brand || 'TecnoMart')} · Official Warranty</div>
        <h1 style="font-size:26px;font-weight:900;color:#111827;line-height:1.2;margin:0 0 10px 0;">${escapeHtml(product.name)}</h1>
        ${product.tagline ? `<p style="font-size:14px;color:#6b7280;margin:0 0 16px 0;line-height:1.5;">${escapeHtml(product.tagline)}</p>` : ''}
        
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:20px;">
          <div style="display:flex;align-items:baseline;gap:12px;">
            <span style="font-size:28px;font-weight:900;color:#111827;">${formattedPrice}</span>
            ${product.originalPrice ? `<span style="font-size:14px;color:#9ca3af;text-decoration:line-through;">${escapeHtml(product.originalPrice)}</span>` : ''}
            ${product.discountPercent ? `<span style="font-size:12px;font-weight:700;color:#059669;background:#d1fae5;padding:2px 8px;border-radius:4px;">${escapeHtml(product.discountPercent)}</span>` : ''}
          </div>
          ${product.emiText ? `<p style="font-size:12px;color:#4b5563;margin:6px 0 0 0;">💳 ${escapeHtml(product.emiText)}</p>` : ''}
          <p style="font-size:12px;color:#059669;margin:8px 0 0 0;font-weight:600;">✓ In Stock at Tolichowki Showroom · Express 3-Hour Hyderabad Delivery</p>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:24px;">
          <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(formattedPrice)})" style="background:#25d366;color:#ffffff;font-size:13px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">WhatsApp Availability</a>
          <a href="tel:+919866388870" style="background:#111827;color:#ffffff;font-size:13px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;">Call Store</a>
        </div>

        ${specsRows ? `
          <div>
            <h2 style="font-size:16px;font-weight:800;color:#111827;margin:0 0 12px 0;">Technical Specifications</h2>
            <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <tbody>${specsRows}</tbody>
            </table>
          </div>
        ` : ''}
      </div>
    </article>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1), url: `/${categorySlug}` },
      { name: product.name, url: pUrl },
    ],
    title: product.name,
    subtitle: `Available with official warranty, 0% No-Cost EMI, and same-day delivery at TecnoMart Tolichowki showroom in Hyderabad.`,
    mainHtml,
  });
}

// -------------------------------------------------------------
// Specialized Service and Info Page Body Generators
// -------------------------------------------------------------
function generateRepairsBodyHtml() {
  const repairServices = [
    { title: 'Screen & OLED Display Replacement', duration: '45 – 60 Minutes', warranty: '90 Days Warranty', cost: 'From ₹1,499', desc: 'Original Super Retina, AMOLED & IPS display replacements with TrueTone restoration and 100% touch sensitivity.' },
    { title: 'Battery Replacement (100% Health)', duration: '30 Minutes', warranty: '6 Months Warranty', cost: 'From ₹999', desc: 'High-density certified Li-ion batteries with official battery health percentage reading and zero-drain calibration.' },
    { title: 'Motherboard & Chip-Level IC Repair', duration: '24 – 48 Hours', warranty: '90 Days Warranty', cost: 'From ₹2,499', desc: 'Advanced microscope micro-soldering, short-circuit diagnostics, PMIC replacement, and no-power resurrection.' },
    { title: 'Water / Liquid Damage Treatment', duration: 'Same Day / 24h', warranty: 'Tested Safe', cost: 'From ₹1,299', desc: 'Ultrasonic chemical cleaning, corrosion neutralization, and component level tracing to save your critical data.' },
    { title: 'Laptop Keyboard & Trackpad Repair', duration: '2 – 4 Hours', warranty: '6 Months Warranty', cost: 'From ₹1,499', desc: 'MacBook butterfly/scissor switches, backlit gaming keyboards, and multi-touch trackpad replacements.' },
    { title: 'Data Recovery & OS Re-installation', duration: '2 – 3 Hours', warranty: 'Data Safe', cost: 'From ₹799', desc: 'Corrupted NVMe/SSD data retrieval, macOS & Windows 11 clean installations, driver optimization, and malware cleanup.' },
  ];

  const cards = repairServices
    .map(
      (s) => `
      <article style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;background:#ffffff;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
          <h2 style="font-size:17px;font-weight:800;color:#111827;margin:0;">${escapeHtml(s.title)}</h2>
          <span style="font-size:14px;font-weight:800;color:#059669;">${escapeHtml(s.cost)}</span>
        </div>
        <p style="font-size:13px;color:#4b5563;line-height:1.5;margin:0 0 12px 0;">${escapeHtml(s.desc)}</p>
        <div style="display:flex;gap:12px;font-size:12px;color:#6b7280;font-weight:600;">
          <span>⏱ ${escapeHtml(s.duration)}</span>
          <span>🛡 ${escapeHtml(s.warranty)}</span>
        </div>
      </article>
    `
    )
    .join('');

  const mainHtml = `
    <section aria-label="Repair Services" style="margin-bottom:32px;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
        ${cards}
      </div>
    </section>
    <section aria-label="Service Center Location" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 8px 0;">Visit Our Tolichowki Service Center</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 12px 0;">
        Location: 7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad 500008.<br/>
        Hours: Monday – Sunday, 10:00 AM – 9:30 PM. Walk-ins welcome or WhatsApp +91 98663 88870 for estimated turnaround.
      </p>
      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20need%20a%20repair%20quote." style="background:#25d366;color:#ffffff;font-size:13px;font-weight:700;padding:10px 16px;border-radius:6px;text-decoration:none;display:inline-block;">Book Repair on WhatsApp</a>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Repairs & Service', url: '/repairs' },
    ],
    title: 'Certified Mobile & Laptop Repair Service in Hyderabad',
    subtitle: 'Same-day screen replacements, battery upgrades, and chip-level logic board diagnostics with 90-day warranty at our Tolichowki lab.',
    mainHtml,
  });
}

function generatePCBuildsBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:28px;">
      <h2 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 10px 0;">Online Custom PC Configurator & Wattage Calculator</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Build balanced, high-performance desktop rigs tailored for 4K competitive gaming, AI workflows, 3D rendering, and architecture CAD. Our Tolichowki hardware lab tests every build with 12 hours of thermal stress testing.
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
        <div style="border:1px solid #e5e7eb;padding:14px;border-radius:8px;background:#ffffff;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Competitive Esports Rigs</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Intel Core i5 / AMD Ryzen 5 + RTX 4060 with 240Hz 1080p high-FPS tuning.</p>
        </div>
        <div style="border:1px solid #e5e7eb;padding:14px;border-radius:8px;background:#ffffff;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">4K Ultra Gaming Rigs</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">AMD Ryzen 7800X3D + RTX 4080 Super / 4090 with custom liquid loop cooling.</p>
        </div>
        <div style="border:1px solid #e5e7eb;padding:14px;border-radius:8px;background:#ffffff;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">AI &amp; Workstation Desktops</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">AMD Ryzen 9 9950X / Intel Core i9-14900KS + 64GB DDR5 + PCIe Gen5 NVMe storage.</p>
        </div>
      </div>
      <div style="margin-top:20px;">
        <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20want%20to%20consult%20on%20a%20Custom%20PC%20Build." style="background:#0d0d0d;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block;">Consult PC Engineer on WhatsApp</a>
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Gaming PCs', url: '/gaming' },
      { name: 'PC Configurator', url: '/pc-builds' },
    ],
    title: 'Custom PC Builder & Configurator in Hyderabad',
    subtitle: 'Real-time component compatibility, live wattage calculations, instant pricing, and expert assembly in Tolichowki.',
    mainHtml,
  });
}

function generateDealsBodyHtml() {
  const deals = [
    { name: 'Apple iPhone 15 128GB', orig: '₹79,900', deal: '₹72,990', badge: 'LIGHTNING DEAL' },
    { name: 'Samsung Galaxy S24 256GB', orig: '₹74,999', deal: '₹62,999', badge: 'HOT DEAL' },
    { name: 'MacBook Air M2 8GB/256GB', orig: '₹1,14,900', deal: '₹98,990', badge: 'BEST SELLER' },
    { name: 'Sony WH-1000XM5 Headphones', orig: '₹34,990', deal: '₹24,990', badge: '28% OFF' },
    { name: 'ASUS ROG Zephyrus G14 (RTX 4060)', orig: '₹1,24,990', deal: '₹1,05,990', badge: '15% OFF' },
    { name: 'Logitech Gaming Bundle', orig: '₹18,990', deal: '₹13,499', badge: 'BUNDLE DEAL' },
  ];

  const cards = deals
    .map(
      (d) => `
      <article style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;background:#ffffff;">
        <span style="font-size:10px;font-weight:800;color:#dc2626;background:#fee2e2;padding:2px 6px;border-radius:4px;">${escapeHtml(d.badge)}</span>
        <h2 style="font-size:16px;font-weight:700;color:#111827;margin:8px 0 6px 0;">${escapeHtml(d.name)}</h2>
        <div style="display:flex;align-items:baseline;gap:8px;">
          <span style="font-size:18px;font-weight:800;color:#111827;">${escapeHtml(d.deal)}</span>
          <span style="font-size:12px;color:#9ca3af;text-decoration:line-through;">${escapeHtml(d.orig)}</span>
        </div>
      </article>
    `
    )
    .join('');

  const mainHtml = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
      ${cards}
    </div>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Deals & Offers', url: '/deals' },
    ],
    title: 'Limited-Time Tech Deals & Open-Box Offers in Hyderabad',
    subtitle: 'Exclusive discounts on flagship smartphones, creator laptops, gaming monitors, and authentic accessories at TecnoMart Tolichowki showroom.',
    mainHtml,
  });
}

function generateBlogsListBodyHtml() {
  const articles = [
    {
      slug: 'iphone-16-pro-vs-galaxy-s24-ultra-hyderabad',
      title: 'iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra: Which Flagship to Pick in Hyderabad?',
      desc: 'A practical real-world comparison of camera optics, battery longevity under harsh Hyderabad summers, and resale values.',
    },
    {
      slug: 'how-to-spot-fake-apple-accessories',
      title: 'How to Spot Counterfeit Apple Chargers and Accessories in India',
      desc: 'Learn the 5 critical checks to verify genuine Apple 20W adapters, MagSafe pucks, and braided USB-C cables before buying.',
    },
  ];

  const cards = articles
    .map(
      (a) => `
      <article style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;background:#ffffff;margin-bottom:16px;">
        <h2 style="font-size:18px;font-weight:800;margin:0 0 8px 0;">
          <a href="/blogs/${a.slug}" style="color:#111827;text-decoration:none;">${escapeHtml(a.title)}</a>
        </h2>
        <p style="font-size:14px;color:#4b5563;line-height:1.5;margin:0 0 12px 0;">${escapeHtml(a.desc)}</p>
        <a href="/blogs/${a.slug}" style="color:#d97706;font-weight:700;font-size:13px;text-decoration:none;">Read Full Guide &rarr;</a>
      </article>
    `
    )
    .join('');

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Tech Insights', url: '/blogs' },
    ],
    title: 'Tech Insights & Buyer Guides | TecnoMart Hyderabad',
    subtitle: 'Hardware engineering comparisons, smartphone buying advice, and genuine accessory verification tips from certified specialists.',
    mainHtml: `<div>${cards}</div>`,
  });
}

function generateBlogDetailBodyHtml(article) {
  let extraContent = '';
  if (article.slug === 'iphone-16-pro-vs-galaxy-s24-ultra-hyderabad') {
    extraContent = `
      <section style="margin:24px 0;">
        <h2 style="font-size:18px;font-weight:800;color:#111827;margin-bottom:12px;">Flagship Head-to-Head Specification &amp; Price Comparison</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:13px;">
          <thead>
            <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 12px;font-weight:700;">Metric</th>
              <th style="text-align:left;padding:10px 12px;font-weight:700;">Apple iPhone 16 Pro Max</th>
              <th style="text-align:left;padding:10px 12px;font-weight:700;">Samsung Galaxy S24 Ultra</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">TecnoMart Store Price</td>
              <td style="padding:10px 12px;font-weight:700;color:#111827;">₹99,999 (256GB)</td>
              <td style="padding:10px 12px;font-weight:700;color:#111827;">₹71,999 (256GB)</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">Official Indian MRP</td>
              <td style="padding:10px 12px;color:#6b7280;text-decoration:line-through;">₹1,49,900</td>
              <td style="padding:10px 12px;color:#6b7280;text-decoration:line-through;">₹1,29,999</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">Processor &amp; AI Engine</td>
              <td style="padding:10px 12px;color:#111827;">Apple A18 Pro (3nm) · Apple Intelligence</td>
              <td style="padding:10px 12px;color:#111827;">Snapdragon 8 Gen 3 for Galaxy · Galaxy AI</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">Display Quality &amp; Coating</td>
              <td style="padding:10px 12px;color:#111827;">6.9" Super Retina XDR OLED, 120Hz ProMotion</td>
              <td style="padding:10px 12px;color:#111827;">6.8" Dynamic AMOLED 2X, Gorilla Armor Anti-Reflective</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">Video Recording Excellence</td>
              <td style="padding:10px 12px;color:#111827;">4K 120fps Dolby Vision HDR, Log recording</td>
              <td style="padding:10px 12px;color:#111827;">8K 30fps / 4K 120fps slo-mo capture</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#4b5563;">Warranty &amp; Service</td>
              <td style="padding:10px 12px;color:#111827;">1-Yr Apple India Warranty + Tolichowki Care</td>
              <td style="padding:10px 12px;color:#111827;">1-Yr Samsung India Warranty + Tolichowki Care</td>
            </tr>
          </tbody>
        </table>
      </section>
    `;
  }

  const mainHtml = `
    <article style="max-width:800px;margin:0 auto;line-height:1.7;color:#374151;font-size:15px;">
      <p style="font-size:16px;color:#4b5563;margin-bottom:20px;">${escapeHtml(article.description)}</p>
      ${extraContent}
      <div style="background:#f9fafb;border-left:4px solid #f59e0b;padding:16px;border-radius:0 8px 8px 0;margin:24px 0;">
        <p style="margin:0;font-size:13px;color:#1f2937;">
          <strong>Have questions or looking for current in-store pricing?</strong> Visit TecnoMart at 7 Tombs Rd, Tolichowki, Hyderabad or call/WhatsApp our certified technicians at <a href="tel:+919866388870" style="color:#d97706;font-weight:700;">+91 98663 88870</a>.
        </p>
      </div>
    </article>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Tech Insights', url: '/blogs' },
      { name: article.title, url: `/blogs/${article.slug}` },
    ],
    title: article.title,
    subtitle: `Published by TecnoMart Hardware Specialists · Hyderabad`,
    mainHtml,
  });
}

function generateAboutBodyHtml() {
  const mainHtml = `
    <section style="line-height:1.7;color:#374151;font-size:15px;max-width:850px;">
      <p style="margin-bottom:16px;">
        Founded in 2016, <strong>TecnoMart</strong> has grown into Hyderabad's premier independent retail electronics showroom and certified hardware service center located at 7 Tombs Rd, Tolichowki.
      </p>
      <h2 style="font-size:20px;font-weight:800;color:#111827;margin:24px 0 10px 0;">Cleanroom Motherboard Repair &amp; Diagnostics</h2>
      <p style="margin-bottom:16px;">
        Unlike retail-only outlets, our Tolichowki headquarters features a dedicated Class-100 cleanroom workstation equipped with stereo microscopes, micro-soldering thermal stations, and programmable DC power supplies for precision logic board resurrection.
      </p>
      <h2 style="font-size:20px;font-weight:800;color:#111827;margin:24px 0 10px 0;">12-Hour Custom PC Stability Testing</h2>
      <p style="margin-bottom:16px;">
        Every custom liquid-cooled gaming desktop and high-throughput workstation assembled at TecnoMart undergoes 12 hours of synthetic burn-in testing (Cinebench, 3DMark, FurMark, MemTest86) to guarantee thermal equilibrium before delivery.
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin:24px 0;">
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:8px;text-align:center;background:#f9fafb;">
          <div style="font-size:24px;font-weight:900;color:#111827;">2016</div>
          <div style="font-size:12px;color:#6b7280;">Founded in Hyderabad</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:8px;text-align:center;background:#f9fafb;">
          <div style="font-size:24px;font-weight:900;color:#111827;">45,000+</div>
          <div style="font-size:12px;color:#6b7280;">Happy Customers</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:8px;text-align:center;background:#f9fafb;">
          <div style="font-size:24px;font-weight:900;color:#111827;">18,000+</div>
          <div style="font-size:12px;color:#6b7280;">Devices Repaired</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:8px;text-align:center;background:#f9fafb;">
          <div style="font-size:24px;font-weight:900;color:#111827;">4.8 / 5</div>
          <div style="font-size:12px;color:#6b7280;">Google Star Rating</div>
        </div>
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
    ],
    title: 'About TecnoMart — Tech Store & Service Center in Hyderabad',
    subtitle: 'Over a decade of trusted hardware expertise, 100% genuine retail units, and advanced chip-level repair capabilities in Tolichowki.',
    mainHtml,
  });
}

function generateContactBodyHtml() {
  const mainHtml = `
    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
        <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 16px 0;">Store &amp; Service Hub Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:8px 0;width:30%;color:#6b7280;">Address:</th>
              <td style="padding:8px 0;color:#111827;font-weight:600;">7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad, Telangana 500008</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:8px 0;color:#6b7280;">Phone:</th>
              <td style="padding:8px 0;"><a href="tel:+919866388870" style="color:#0284c7;text-decoration:none;font-weight:700;">+91 98663 88870</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:8px 0;color:#6b7280;">WhatsApp:</th>
              <td style="padding:8px 0;"><a href="https://wa.me/919866388870" style="color:#059669;text-decoration:none;font-weight:700;">+91 98663 88870</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:8px 0;color:#6b7280;">Email:</th>
              <td style="padding:8px 0;"><a href="mailto:support@tecnomart.in" style="color:#111827;text-decoration:none;">support@tecnomart.in</a></td>
            </tr>
            <tr>
              <th style="text-align:left;padding:8px 0;color:#6b7280;">Hours:</th>
              <td style="padding:8px 0;color:#111827;">Monday – Sunday: 10:00 AM – 9:30 PM IST</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
        <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 12px 0;">Send an Inquiry</h2>
        <p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0 0 16px 0;">Connect directly with our customer support and hardware consultants for instant stock confirmations or PC build quotations.</p>
        <a href="https://wa.me/919866388870?text=Hello%20TecnoMart!%20I%20have%20an%20inquiry." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Chat on WhatsApp Business</a>
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Contact Us', url: '/contact' },
    ],
    title: 'Contact TecnoMart — Tolichowki, Hyderabad',
    subtitle: 'Visit our flagship electronics showroom or speak with our hardware consultants for same-day delivery, PC builds, and repairs.',
    mainHtml,
  });
}

function generateCompareBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 10px 0;">Interactive Smartphone &amp; Laptop Comparison Engine</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Compare technical specifications, Geekbench CPU benchmarks, camera apertures, battery capacities, and live Indian rupee pricing side-by-side to make an informed upgrade choice.
      </p>
      <div style="display:flex;gap:12px;">
        <a href="/mobiles" style="background:#0d0d0d;color:#ffffff;font-size:13px;font-weight:700;padding:10px 16px;border-radius:6px;text-decoration:none;">Browse Smartphones</a>
        <a href="/laptops" style="background:#ffffff;border:1px solid #d1d5db;color:#111827;font-size:13px;font-weight:700;padding:10px 16px;border-radius:6px;text-decoration:none;">Browse Laptops</a>
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare' },
    ],
    title: 'Compare Flagship Smartphones & Laptops | TecnoMart Hyderabad',
    subtitle: 'Side-by-side technical benchmarks, camera optics, battery longevity, and transparent prices.',
    mainHtml,
  });
}

function generateEmiCalculatorBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 10px 0;">0% No-Cost &amp; Low-Cost EMI Calculator</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Calculate monthly installments across 3, 6, 9, 12, 18, and 24-month tenures with leading Indian banks (HDFC, ICICI, SBI, Axis, Kotak). TecnoMart provides instant 0% No-Cost EMI approvals on all flagship models.
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <h3 style="font-size:14px;font-weight:700;margin:0 0 4px 0;">iPhone 16 Pro Max</h3>
          <p style="font-size:13px;color:#059669;font-weight:700;margin:0;">From ₹8,333/mo (12 Months 0% EMI)</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <h3 style="font-size:14px;font-weight:700;margin:0 0 4px 0;">MacBook Air M2</h3>
          <p style="font-size:13px;color:#059669;font-weight:700;margin:0;">From ₹8,249/mo (12 Months 0% EMI)</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <h3 style="font-size:14px;font-weight:700;margin:0 0 4px 0;">RTX 4070 Gaming PC</h3>
          <p style="font-size:13px;color:#059669;font-weight:700;margin:0;">From ₹14,583/mo (12 Months 0% EMI)</p>
        </div>
      </div>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'EMI Calculator', url: '/emi-calculator' },
    ],
    title: 'No-Cost EMI Calculator for Smartphones & Laptops | TecnoMart',
    subtitle: 'Transparent installment calculations for Apple, Samsung, ASUS, and gaming rigs with 0% interest financing.',
    mainHtml,
  });
}

function generateExchangeBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 10px 0;">Instant Trade-In &amp; Device Buyback Valuation</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Upgrade to the latest flagship phone or MacBook by exchanging your existing device. We offer top trade-in credit based on genuine diagnostic grading with zero deduction surprises.
      </p>
      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20want%20to%20check%20exchange%20value%20for%20my%20device." style="background:#25d366;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block;">Get WhatsApp Trade-in Quote</a>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Exchange & Trade-In', url: '/exchange' },
    ],
    title: 'Trade-In & Device Exchange in Hyderabad | TecnoMart',
    subtitle: 'Get top cash or upgrade credit for your used phone or laptop at our Tolichowki showroom.',
    mainHtml,
  });
}

function generateCorporateBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 10px 0;">B2B Enterprise IT Procurement &amp; Bulk Hardware</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Equip your Hyderabad startup or enterprise with Apple MacBooks, ThinkPads, Dell workstations, and custom server equipment. Full GST input tax invoices, corporate credit terms, and dedicated on-site service SLAs.
      </p>
      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart%20Corporate!%20We%20require%20bulk%20IT%20hardware%20procurement." style="background:#0d0d0d;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block;">Contact Corporate Sales</a>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Corporate & B2B', url: '/corporate' },
    ],
    title: 'Corporate IT Procurement & Bulk Hardware in Hyderabad | TecnoMart',
    subtitle: 'Bulk business laptop supply, enterprise workstation fleets, and GST tax invoices.',
    mainHtml,
  });
}

function generateStudentsBodyHtml() {
  const mainHtml = `
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 10px 0;">Student &amp; Educator Tech Program</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
        Students and faculty from IIIT Hyderabad, IIT Hyderabad, Osmania, BITS Pilani Hyderabad, and any recognized college save extra on Apple MacBooks, Windows creator laptops, and study peripherals with verified college ID.
      </p>
      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20am%20a%20student%20inquiring%20about%20discounts." style="background:#25d366;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block;">Claim Student Discount on WhatsApp</a>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Student Discounts', url: '/students' },
    ],
    title: 'Student & Educator Discount Program in Hyderabad | TecnoMart',
    subtitle: 'Special pricing on Apple MacBooks, study laptops, and computing accessories for university students in Hyderabad.',
    mainHtml,
  });
}

function generateSitemapBodyHtml() {
  const departments = [
    { name: 'Smartphones & Flagships', url: '/mobiles' },
    { name: 'Laptops & Creator Ultrabooks', url: '/laptops' },
    { name: 'Custom Gaming PCs', url: '/gaming' },
    { name: 'Certified Refurbished Devices', url: '/refurbished' },
    { name: 'Genuine Accessories & Gear', url: '/accessories' },
    { name: 'Certified Repairs & Service', url: '/repairs' },
    { name: 'PC Configurator & Wattage Tool', url: '/pc-builds' },
    { name: 'Flash Deals & Offers', url: '/deals' },
    { name: 'Compare Devices', url: '/compare' },
    { name: 'EMI Calculator', url: '/emi-calculator' },
    { name: 'Trade-In / Exchange', url: '/exchange' },
    { name: 'Corporate IT Procurement', url: '/corporate' },
    { name: 'Student Discounts', url: '/students' },
    { name: 'Tech Insights & Guides', url: '/blogs' },
    { name: 'About TecnoMart', url: '/about' },
    { name: 'Contact & Store Location', url: '/contact' },
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms & Conditions', url: '/terms' },
  ];

  const links = departments
    .map(
      (d) => `
      <li style="margin-bottom:8px;">
        <a href="${d.url}" style="color:#0284c7;text-decoration:none;font-weight:600;font-size:14px;">${escapeHtml(d.name)}</a>
      </li>`
    )
    .join('');

  const mainHtml = `
    <section style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 16px 0;">All Website Routes &amp; Catalogs</h2>
      <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px;">
        ${links}
      </ul>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'HTML Sitemap', url: '/sitemap' },
    ],
    title: 'HTML Sitemap | TecnoMart Hyderabad',
    subtitle: 'Comprehensive index of all retail departments, repair solutions, financial calculators, and guides.',
    mainHtml,
  });
}

function generatePrivacyBodyHtml() {
  const mainHtml = `
    <section style="max-width:800px;margin:0 auto;line-height:1.7;color:#374151;font-size:14px;">
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:16px 0 8px 0;">1. Information We Collect</h2>
      <p>We collect necessary contact information (name, phone number, email, delivery address) strictly for order dispatch, repair notifications, and GST invoice compliance.</p>
      
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:20px 0 8px 0;">2. Device Privacy During Hardware Servicing</h2>
      <p>Customer device privacy is sacred. Our certified technicians never access, copy, or browse personal media or confidential files on customer laptops and phones checked in for screen, battery, or logic board repairs.</p>
      
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:20px 0 8px 0;">3. Contact Our Privacy Desk</h2>
      <p>For any data inquiries, reach us at <a href="mailto:privacy@tecnomart.in" style="color:#d97706;font-weight:600;">privacy@tecnomart.in</a> or visit our Tolichowki showroom at 7 Tombs Rd, Hyderabad.</p>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Privacy Policy', url: '/privacy' },
    ],
    title: 'Privacy Policy | TecnoMart Hyderabad',
    subtitle: 'Data protection standards and client confidentiality commitments.',
    mainHtml,
  });
}

function generateTermsBodyHtml() {
  const mainHtml = `
    <section style="max-width:800px;margin:0 auto;line-height:1.7;color:#374151;font-size:14px;">
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:16px 0 8px 0;">1. Brand New Retail Warranty</h2>
      <p>All brand new retail smartphones, laptops, monitors, and components sold by TecnoMart carry official brand authorized warranty across India with valid tax invoices.</p>
      
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:20px 0 8px 0;">2. Certified Refurbished Warranty</h2>
      <p>Refurbished units include a 1-Year TecnoMart Store Warranty covering internal hardware functionality, alongside a 7-day replacement period for technical defects.</p>
      
      <h2 style="font-size:17px;font-weight:800;color:#111827;margin:20px 0 8px 0;">3. 90-Day Repair Guarantee</h2>
      <p>Components replaced during repair servicing (screens, batteries, ports, micro-soldered ICs) are protected under our 90-day functional repair warranty.</p>
    </section>
  `;

  return wrapPageShell({
    breadcrumbItems: [
      { name: 'Home', url: '/' },
      { name: 'Terms & Conditions', url: '/terms' },
    ],
    title: 'Terms & Conditions & Warranty Policies | TecnoMart',
    subtitle: 'Transparent terms governing sales, repair guarantees, and return policies at our Tolichowki showroom.',
    mainHtml,
  });
}

// -------------------------------------------------------------
// HTML Builder Function
// -------------------------------------------------------------
function buildHtmlForRoute({ title, description, canonicalUrl, ogImage, schema, routeBodyHtml, isNoindex = false }) {
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

  // 8. Inject Prerendered Semantic Body HTML inside #root
  if (routeBodyHtml) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>\s*<\/body>/i,
      `<div id="root" data-ssr="static">${routeBodyHtml}</div>\n  </body>`
    );
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

// -------------------------------------------------------------
// Pre-computed Schemas for Static Routes
// -------------------------------------------------------------
const REPAIRS_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
        { '@type': 'ListItem', position: 2, name: 'Repairs & Service', item: `${DOMAIN}/repairs` },
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'Electronics & Computer Hardware Repair Service',
      provider: {
        '@type': 'ElectronicsStore',
        name: 'TecnoMart',
        url: DOMAIN,
        telephone: '+919866388870',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          postalCode: '500008',
          addressCountry: 'IN',
        },
      },
      areaServed: {
        '@type': 'City',
        name: 'Hyderabad',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'TecnoMart Repair Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Original OLED & AMOLED Screen Replacement' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Certified Battery Replacement (100% Health)' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chip-Level Motherboard & Logic Board Micro-Soldering' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ultrasonic Liquid Damage Chemical Treatment' } },
        ],
      },
    },
  ],
};

function createCategoryItemListSchema(categoryName, categorySlug, products) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
          { '@type': 'ListItem', position: 2, name: categoryName, item: `${DOMAIN}/${categorySlug}` },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${categoryName} at TecnoMart Hyderabad`,
        url: `${DOMAIN}/${categorySlug}`,
        itemListElement: products.slice(0, 30).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: p.name,
          url: `${DOMAIN}/${categorySlug}/${p.slug}`,
        })),
      },
    ],
  };
}

// -------------------------------------------------------------
// Route Registry Configuration
// -------------------------------------------------------------
const STATIC_ROUTES = [
  {
    path: '/mobiles',
    title: 'Best Mobile Shop in Hyderabad | Buy iPhones, Samsung Galaxy & Flagships | TecnoMart',
    description: 'Looking for the best mobile shop in Hyderabad? TecnoMart in Tolichowki offers the best prices on iPhone 16 Pro Max, Samsung S24 Ultra, OnePlus 12, and Google Pixel with official warranty and 3-hour doorstep delivery.',
    image: '/webp/bento-grid-images/mobiles.webp',
    schema: createCategoryItemListSchema('Smartphones & Mobiles', 'mobiles', MOBILES_DATA),
    bodyHtml: generateCategoryBodyHtml({
      categoryName: 'Smartphones & Flagships',
      categorySlug: 'mobiles',
      description: 'Explore the latest Apple iPhones, Samsung Galaxy flagships, and Google Pixel devices with official manufacturer warranty, 0% No-Cost EMI, and 3-hour doorstep delivery across Hyderabad.',
      products: MOBILES_DATA,
    }),
  },
  {
    path: '/laptops',
    title: 'Best Laptop Store in Hyderabad | Buy MacBooks, Gaming & Creator Laptops | TecnoMart',
    description: 'Looking for the best laptop store in Hyderabad? TecnoMart Tolichowki features Apple MacBook Pro M3, ASUS ROG Zephyrus, Dell XPS, Lenovo Legion, and HP Spectre with 0% No-Cost EMI and same-day delivery.',
    image: '/webp/bento-grid-images/laptop.webp',
    schema: createCategoryItemListSchema('Laptops & Ultrabooks', 'laptops', LAPTOPS_DATA),
    bodyHtml: generateCategoryBodyHtml({
      categoryName: 'Laptops & Creator Ultrabooks',
      categorySlug: 'laptops',
      description: 'Browse Apple MacBooks, ASUS ROG gaming laptops, Dell XPS, and Lenovo ThinkPads with official Indian tax invoices and same-day delivery in Tolichowki, Hyderabad.',
      products: LAPTOPS_DATA,
    }),
  },
  {
    path: '/accessories',
    title: 'Best Computer Accessories, Chargers & Audio Gear in Hyderabad | TecnoMart',
    description: 'Shop genuine accessories at TecnoMart Hyderabad. Apple 20W adapters, MagSafe chargers, mechanical gaming keyboards, studio headphones, and GaN multi-port chargers with official warranty in Tolichowki.',
    image: '/webp/bento-grid-images/accessories.webp',
    schema: createCategoryItemListSchema('Computer Accessories & Peripherals', 'accessories', ACCESSORIES_DATA),
    bodyHtml: generateCategoryBodyHtml({
      categoryName: 'Computer Accessories & Audio Gear',
      categorySlug: 'accessories',
      description: 'Authentic Apple adapters, GaN fast chargers, mechanical keyboards, gaming headsets, and audiophile monitors available at TecnoMart Tolichowki.',
      products: ACCESSORIES_DATA,
    }),
  },
  {
    path: '/gaming',
    title: 'Custom Gaming PC Builders in Hyderabad | Liquid-Cooled RTX Desktops | TecnoMart',
    description: 'Hyderabad\'s top custom liquid-cooled gaming PC builders in Tolichowki. Pre-built and bespoke rigs with NVIDIA RTX 4090, 4080 Super, AMD Ryzen 7800X3D, stress-tested with comprehensive warranty.',
    image: '/webp/bento-grid-images/pc.webp',
    schema: createCategoryItemListSchema('Custom Gaming PCs & Workstations', 'gaming', GAMING_DATA),
    bodyHtml: generateCategoryBodyHtml({
      categoryName: 'Custom Gaming PCs & Workstations',
      categorySlug: 'gaming',
      description: 'Precision-assembled gaming PCs with NVIDIA GeForce RTX 40-series GPUs, AMD Ryzen 7000/9000 CPUs, and custom liquid cooling loops tested for thermal equilibrium.',
      products: GAMING_DATA,
    }),
  },
  {
    path: '/refurbished',
    title: 'Certified Refurbished Laptops & Mobiles in Hyderabad | 1-Year Warranty | TecnoMart',
    description: 'Buy Grade-A+ certified refurbished iPhones, MacBooks, and business laptops in Hyderabad. 32-point hardware inspection, genuine battery health, 7-day replacement, and 1-year TecnoMart store warranty.',
    image: '/webp/bento-grid-images/mobiles.webp',
    schema: createCategoryItemListSchema('Certified Refurbished Hardware', 'refurbished', REFURBISHED_DATA),
    bodyHtml: generateCategoryBodyHtml({
      categoryName: 'Certified Refurbished Hardware',
      categorySlug: 'refurbished',
      description: 'Grade-A+ pre-owned Apple iPhones, MacBooks, and enterprise laptops tested across 32 hardware inspection points with 1-Year direct TecnoMart warranty.',
      products: REFURBISHED_DATA,
    }),
  },
  {
    path: '/repairs',
    title: 'Best Mobile & Laptop Repair Service in Hyderabad | Same-Day Screen & Battery Fix | TecnoMart',
    description: 'Looking for the best mobile and laptop repair in Hyderabad? TecnoMart Tolichowki service center offers same-day screen replacement, battery upgrades, chip-level logic board repairs, and 90-day warranty.',
    image: '/webp/logo.webp',
    schema: REPAIRS_SCHEMA,
    bodyHtml: generateRepairsBodyHtml(),
  },
  {
    path: '/pc-builds',
    title: 'Custom PC Builder & Configurator | Live Wattage & Price Estimator | TecnoMart Hyderabad',
    description: 'Build your dream gaming and workstation PC online with TecnoMart Hyderabad. Real-time component compatibility, live wattage calculations, instant pricing, and expert assembly in Tolichowki.',
    image: '/webp/bento-grid-images/pc.webp',
    bodyHtml: generatePCBuildsBodyHtml(),
  },
  {
    path: '/deals',
    title: 'Best Tech Deals, Flash Discounts & Open-Box Offers in Hyderabad | TecnoMart',
    description: 'Exclusive limited-time tech deals in Hyderabad. Massive price drops on flagship smartphones, creator laptops, gaming monitors, and authentic accessories at TecnoMart Tolichowki showroom.',
    image: '/webp/logo.webp',
    bodyHtml: generateDealsBodyHtml(),
  },
  {
    path: '/blogs',
    title: 'Tech Insights, Buyer Guides & Device Care | TecnoMart Hyderabad',
    description: 'Read in-depth tech comparisons, smartphone buying guides, Apple accessory verification tips, and PC building advice from TecnoMart\'s certified engineers in Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generateBlogsListBodyHtml(),
  },
  {
    path: '/about',
    title: 'About TecnoMart — Best Rated Tech Store & Service Center in Hyderabad',
    description: 'Learn why TecnoMart is Hyderabad\'s best-rated electronics store and certified service center in Tolichowki. Over 10+ years of trusted hardware expertise, 100% genuine units, and thousands of satisfied customers.',
    image: '/webp/logo.webp',
    bodyHtml: generateAboutBodyHtml(),
  },
  {
    path: '/contact',
    title: 'Contact TecnoMart — Tech Store & Service Center in Tolichowki, Hyderabad',
    description: 'Visit TecnoMart at 7 Tombs Rd, Tolichowki, Hyderabad. Call +91 98663 88870 or WhatsApp us for product availability, PC build quotes, or same-day repair appointments.',
    image: '/webp/logo.webp',
    bodyHtml: generateContactBodyHtml(),
  },
  {
    path: '/compare',
    title: 'Compare Smartphones & Laptops Side-by-Side | TecnoMart Hyderabad',
    description: 'Compare detailed technical specifications, benchmark performance, camera systems, battery life, and prices of smartphones and laptops side-by-side at TecnoMart.',
    image: '/webp/logo.webp',
    bodyHtml: generateCompareBodyHtml(),
  },
  {
    path: '/emi-calculator',
    title: 'No-Cost & Low-Cost EMI Calculator for Mobiles & Laptops | TecnoMart Hyderabad',
    description: 'Calculate monthly EMI installments for Apple iPhones, MacBooks, and gaming laptops. Compare tenure, interest rates, and down payment plans with leading Indian banks at TecnoMart.',
    image: '/webp/logo.webp',
    bodyHtml: generateEmiCalculatorBodyHtml(),
  },
  {
    path: '/exchange',
    title: 'Trade-In & Mobile/Laptop Exchange Value Calculator | TecnoMart Hyderabad',
    description: 'Get an instant valuation to trade in your old phone or laptop for cash or store credit towards a brand-new device at TecnoMart Tolichowki showroom in Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generateExchangeBodyHtml(),
  },
  {
    path: '/corporate',
    title: 'Corporate IT Procurement & Enterprise Hardware Bulk Orders | TecnoMart Hyderabad',
    description: 'Empower your Hyderabad business with bulk laptop procurement, workstations, fleet device management, GST invoices, and dedicated technical support from TecnoMart.',
    image: '/webp/logo.webp',
    bodyHtml: generateCorporateBodyHtml(),
  },
  {
    path: '/students',
    title: 'Student & Educator Discount Program on MacBooks & Laptops | TecnoMart Hyderabad',
    description: 'Verified student and educator discounts on Apple MacBooks, iPads, and Windows creator laptops in Hyderabad. Save up to ₹15,000 with valid university or college ID at TecnoMart.',
    image: '/webp/logo.webp',
    bodyHtml: generateStudentsBodyHtml(),
  },
  {
    path: '/sitemap',
    title: 'HTML Sitemap — Departments, Products, Repairs & Tools | TecnoMart Hyderabad',
    description: 'Complete directory of all departments, products, repair services, financial tools, and customer guides at TecnoMart Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generateSitemapBodyHtml(),
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | TecnoMart Technologies Pvt Ltd Hyderabad',
    description: 'Privacy policy and data protection commitments for TecnoMart customers, repair clients, and store visitors in Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generatePrivacyBodyHtml(),
  },
  {
    path: '/terms',
    title: 'Terms & Conditions, Warranty & Return Policies | TecnoMart Hyderabad',
    description: 'Terms and conditions, warranty coverage, repair guarantees, and return policies for purchases and services at TecnoMart Tolichowki, Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generateTermsBodyHtml(),
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

let generatedCount = 0;

// 1. Static Storefront & Service Pages
STATIC_ROUTES.forEach((route) => {
  const canonicalUrl = `${DOMAIN}${route.path}`;
  const html = buildHtmlForRoute({
    title: route.title,
    description: route.description,
    canonicalUrl,
    ogImage: route.image,
    schema: route.schema,
    routeBodyHtml: route.bodyHtml,
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

    const routeBodyHtml = generateProductDetailBodyHtml({ product, categorySlug });

    const html = buildHtmlForRoute({
      title,
      description,
      canonicalUrl,
      ogImage: primaryImg,
      schema: combinedSchema,
      routeBodyHtml,
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

  const routeBodyHtml = generateBlogDetailBodyHtml(article);

  const html = buildHtmlForRoute({
    title: `${article.title} | TecnoMart Hyderabad`,
    description: article.description,
    canonicalUrl,
    ogImage: article.image,
    schema: blogSchema,
    routeBodyHtml,
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
