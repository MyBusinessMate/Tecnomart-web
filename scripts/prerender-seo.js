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
// Single H1 enforcement: hideHeaderTitle prevents shell H1 on product detail pages
// -------------------------------------------------------------
function wrapPageShell({ breadcrumbItems = [], title, subtitle, mainHtml, hideHeaderTitle = false }) {
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
        ${
          hideHeaderTitle
            ? ''
            : `<header style="margin-bottom:28px;">
                <h1 style="font-size:28px;font-weight:900;line-height:1.2;color:#111827;margin:0 0 8px 0;">${escapeHtml(title)}</h1>
                ${subtitle ? `<p style="font-size:15px;color:#4b5563;line-height:1.6;margin:0;max-width:850px;">${escapeHtml(subtitle)}</p>` : ''}
              </header>`
        }
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
// Expanded with rich local shopping guides & FAQs (500+ words)
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
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:36px;">
        ${cardsHtml}
      </div>
    </section>

    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Buyer Guide: Purchasing ${escapeHtml(categoryName)} in Hyderabad</h2>
      <p style="margin:0 0 16px 0;font-size:14px;">
        Looking for genuine ${escapeHtml(categoryName.toLowerCase())} in Hyderabad with official manufacturer warranty and transparent pricing? At TecnoMart Tolichowki, every retail product is 100% authentic, sealed in original factory packaging, and backed by valid GST tax invoices for pan-India warranty coverage. Whether you are upgrading your daily work setup or investing in top-tier technology, we guarantee the best prices across the twin cities.
      </p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin:20px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">✓ 100% Sealed Indian Units</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">No gray-market or imported units without Indian warranty. Every box has genuine BIS certification and official manufacturer backing.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">✓ 0% No-Cost EMI Available</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">Split your payments effortlessly across 3 to 24 months with HDFC, ICICI, SBI, Axis, Kotak, and Bajaj Finserv financing options.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">✓ Express 3-Hour Doorstep Delivery</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">Order online or via WhatsApp and receive secured delivery anywhere in Hyderabad within 3 hours, or visit our Tolichowki showroom for instant pickup.</p>
        </div>
      </div>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Frequently Asked Questions</h3>
      <div style="font-size:14px;display:flex;flex-direction:column;gap:12px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Can I test the product before taking delivery at your Tolichowki store?</p>
          <p style="color:#6b7280;margin:0;">Yes! Our showroom specialists encourage full unboxing, physical inspection, display checks, and setup assistance before you complete payment.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Can I exchange my old phone or laptop for a discount?</p>
          <p style="color:#6b7280;margin:0;">Yes! Bring your existing device to our showroom or share specs on WhatsApp for an immediate diagnostic valuation and trade-in upgrade discount.</p>
        </div>
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
// Single H1 inside product container, rich substantive content (550+ words)
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
              <th style="text-align:left;padding:10px 14px;width:35%;font-weight:600;color:#4b5563;font-size:13px;">${escapeHtml(k)}</th>
              <td style="padding:10px 14px;color:#111827;font-size:13px;">${escapeHtml(v)}</td>
            </tr>`
        )
        .join('')
    : '';

  const mainHtml = `
    <article style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:36px;align-items:start;margin-bottom:36px;">
      <div style="border:1px solid #e5e7eb;border-radius:16px;padding:28px;background:#f9fafb;text-align:center;">
        <img src="${img}" alt="${escapeHtml(product.name)}" style="max-width:100%;max-height:400px;object-fit:contain;border-radius:12px;" />
      </div>
      <div>
        <div style="font-size:12px;font-weight:800;color:#d97706;text-transform:uppercase;margin-bottom:6px;">${escapeHtml(product.brand || 'TecnoMart')} · Official Indian Warranty</div>
        <!-- Single Unique H1 for the Product Page -->
        <h1 style="font-size:28px;font-weight:900;color:#111827;line-height:1.2;margin:0 0 10px 0;">${escapeHtml(product.name)}</h1>
        ${product.tagline ? `<p style="font-size:15px;color:#6b7280;margin:0 0 18px 0;line-height:1.5;">${escapeHtml(product.tagline)}</p>` : ''}
        
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px;margin-bottom:24px;">
          <div style="display:flex;align-items:baseline;gap:12px;">
            <span style="font-size:30px;font-weight:900;color:#111827;">${formattedPrice}</span>
            ${product.originalPrice ? `<span style="font-size:15px;color:#9ca3af;text-decoration:line-through;">${escapeHtml(product.originalPrice)}</span>` : ''}
            ${product.discountPercent ? `<span style="font-size:12px;font-weight:700;color:#059669;background:#d1fae5;padding:2px 8px;border-radius:4px;">${escapeHtml(product.discountPercent)}</span>` : ''}
          </div>
          ${product.emiText ? `<p style="font-size:13px;color:#4b5563;margin:8px 0 0 0;">💳 ${escapeHtml(product.emiText)}</p>` : ''}
          <p style="font-size:13px;color:#059669;margin:8px 0 0 0;font-weight:600;">✓ In Stock at Tolichowki Showroom · Express 3-Hour Hyderabad Delivery</p>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:28px;">
          <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(formattedPrice)})" style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">WhatsApp Availability</a>
          <a href="tel:+919866388870" style="background:#111827;color:#ffffff;font-size:14px;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none;">Call Store (+91 98663 88870)</a>
        </div>

        <div style="display:flex;gap:16px;font-size:13px;color:#4b5563;margin-bottom:24px;border-top:1px solid #f3f4f6;padding-top:16px;">
          <a href="/compare" style="color:#d97706;font-weight:600;text-decoration:none;">Compare Models</a>
          <span>·</span>
          <a href="/emi-calculator" style="color:#d97706;font-weight:600;text-decoration:none;">EMI Calculator</a>
          <span>·</span>
          <a href="/exchange" style="color:#d97706;font-weight:600;text-decoration:none;">Trade-In Old Phone</a>
        </div>

        ${
          specsRows
            ? `
          <div style="margin-top:20px;">
            <h2 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 12px 0;">Technical Specifications</h2>
            <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <tbody>${specsRows}</tbody>
            </table>
          </div>
        `
            : ''
        }
      </div>
    </article>

    <!-- Substantive Buyer Value Section (Solves Thin Content) -->
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Why Buy ${escapeHtml(product.name)} from TecnoMart Tolichowki?</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        TecnoMart is Hyderabad's premier independent technology showroom located at 7 Tombs Road, Tolichowki. When you purchase ${escapeHtml(product.name)} with us, you receive a guaranteed authentic Indian retail device accompanied by an official tax invoice, zero hidden charges, and manufacturer-authorized nationwide warranty support.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin-bottom:24px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">🛡 Official Brand Warranty</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Eligible for service at all brand-authorized centers across Hyderabad, Secunderabad, and India.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">⚡ 3-Hour Doorstep Delivery</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Express delivery to Jubilee Hills, Banjara Hills, Madhapur, Gachibowli, Kondapur, and Hitec City.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">💳 0% No-Cost EMI Plans</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Available on all major credit and debit cards, plus instant in-store Bajaj Finserv paperless approvals.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">🔄 Fair Exchange Valuation</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Trade in your old smartphone, tablet, or laptop for high exchange credit directly applied to this purchase.</p>
        </div>
      </div>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Frequently Asked Questions About ${escapeHtml(product.name)}</h3>
      <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Is ${escapeHtml(product.name)} brand new and sealed?</p>
          <p style="color:#6b7280;margin:0;">Yes, unless explicitly listed under our certified refurbished category, all products sold by TecnoMart are brand new, unopened factory units with genuine tamper-proof seals.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Can I visit the store to inspect before paying?</p>
          <p style="color:#6b7280;margin:0;">Absolutely. Visit our Tolichowki showroom (7 Tombs Road, Raghava Colony) any day between 10:00 AM and 9:30 PM. Our specialists can also assist with data migration from your older device.</p>
        </div>
      </div>
    </section>
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
    hideHeaderTitle: true, // Crucial: avoids duplicate <h1> on product detail pages!
  });
}

// -------------------------------------------------------------
// Specialized Service and Info Page Body Generators
// Substantive content (400-650 words each) resolving thin content
// -------------------------------------------------------------
function generateRepairsBodyHtml() {
  const repairServices = [
    { title: 'Screen & OLED Display Replacement', duration: '45 – 60 Minutes', warranty: '90 Days Warranty', cost: 'From ₹1,499', desc: 'Original Super Retina, AMOLED & IPS display replacements with TrueTone restoration, factory oleophobic coating, and 100% touch sensitivity.' },
    { title: 'Battery Replacement (100% Health)', duration: '30 Minutes', warranty: '6 Months Warranty', cost: 'From ₹999', desc: 'High-density certified Li-ion batteries with official battery health percentage reading, low thermal resistance, and zero-drain calibration.' },
    { title: 'Motherboard & Chip-Level IC Repair', duration: '24 – 48 Hours', warranty: '90 Days Warranty', cost: 'From ₹2,499', desc: 'Advanced stereo microscope micro-soldering, short-circuit diagnostics, PMIC replacement, audio IC fixes, and dead logic board resurrection.' },
    { title: 'Water & Liquid Damage Treatment', duration: 'Same Day / 24h', warranty: 'Tested Safe', cost: 'From ₹1,299', desc: 'Ultrasonic chemical bath cleaning, PCB corrosion neutralization, SMD component tracing, and emergency critical data recovery.' },
    { title: 'Laptop Keyboard & Trackpad Repair', duration: '2 – 4 Hours', warranty: '6 Months Warranty', cost: 'From ₹1,499', desc: 'MacBook scissor and butterfly keyboard replacements, backlit gaming keyboards, Precision Windows trackpads, and top-case assembly fixes.' },
    { title: 'Data Recovery & OS Re-installation', duration: '2 – 3 Hours', warranty: 'Data Safe', cost: 'From ₹799', desc: 'Corrupted NVMe/SSD data retrieval, macOS Monterey/Sonoma clean installation, Windows 11 optimization, thermal paste repasting, and fan de-dusting.' },
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

    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Our 4-Stage Precision Hardware Repair Workflow</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        At TecnoMart's Tolichowki service hub, hardware repairs are performed by ESD-certified engineers in a controlled Class-100 cleanroom environment. Whether your device has a cracked AMOLED glass, swollen battery, or dead power rail, we follow a transparent repair procedure:
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:24px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">1. Free 15-Min Diagnostic</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Comprehensive multimeter testing and visual inspection under microscope with zero upfront inspection fee.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">2. Genuine Part Sourcing</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Only Grade-A OEM or factory-authorized displays, ICs, and high-density cobalt battery cells are installed.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">3. Cleanroom Micro-Soldering</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Precision heat-controlled hot air stations and stereo microscopes ensure trace repairs without overheating adjacent chips.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">4. 45-Point QC & Warranty</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Full sensor, audio, wireless, thermal, and battery load testing before delivery, sealed with our 90-day warranty card.</p>
        </div>
      </div>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Frequently Asked Repair Questions</h3>
      <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Will my personal data remain safe during the repair?</p>
          <p style="color:#6b7280;margin:0;">Yes. We strictly adhere to device privacy. You do not need to share passwords for screen or battery replacements unless diagnostics explicitly demand it, and data is never accessed or backed up without authorization.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:14px;border-radius:8px;">
          <p style="font-weight:700;color:#111827;margin:0 0 4px 0;">Do you service liquid-damaged laptops and phones?</p>
          <p style="color:#6b7280;margin:0;">Yes. Bring your water-damaged device immediately without powering it on. Our ultrasonic cleaning and component-level tracing achieve a remarkable 80%+ success rate on liquid-damaged motherboards.</p>
        </div>
      </div>
    </section>

    <section aria-label="Service Center Location" style="background:#111827;color:#ffffff;border-radius:16px;padding:28px;">
      <h2 style="font-size:20px;font-weight:800;color:#ffffff;margin:0 0 8px 0;">Visit Our Tolichowki Service Center</h2>
      <p style="font-size:14px;color:#9ca3af;line-height:1.6;margin:0 0 16px 0;">
        Location: 7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad 500008.<br/>
        Hours: Monday – Sunday, 10:00 AM – 9:30 PM. Walk-ins welcome or WhatsApp for estimated turnaround and slot booking.
      </p>
      <div style="display:flex;gap:12px;">
        <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20need%20a%20repair%20quote." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Book Repair on WhatsApp</a>
        <a href="tel:+919866388870" style="background:#ffffff;color:#111827;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Call Service Desk</a>
      </div>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:28px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 10px 0;">Custom PC Configurator, Bottleneck Analysis & Wattage Calculator</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Build balanced, high-performance desktop rigs tailored for competitive 240Hz gaming, 4K video rendering, 3D architectural CAD, and local AI LLM fine-tuning. Our hardware engineering lab in Tolichowki inspects every component for compatibility, thermal headroom, and PCIe bandwidth allocation before assembly.
      </p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:24px;">
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:10px;background:#ffffff;">
          <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 6px 0;">Competitive Esports Rigs</h3>
          <p style="font-size:13px;color:#6b7280;margin:0 0 8px 0;">AMD Ryzen 5 7600 / Intel Core i5-14400F + RTX 4060 8GB with high-frequency DDR5 memory, tuned for 240+ FPS in Valorant, CS2, and Apex Legends.</p>
          <span style="font-size:13px;font-weight:700;color:#059669;">From ₹64,999</span>
        </div>
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:10px;background:#ffffff;">
          <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 6px 0;">1440p / 4K Ultra Gaming Rigs</h3>
          <p style="font-size:13px;color:#6b7280;margin:0 0 8px 0;">AMD Ryzen 7 7800X3D + NVIDIA RTX 4070 Ti Super / 4080 Super with 360mm AIO liquid cooling, gen4 NVMe storage, and Gold-certified PSUs.</p>
          <span style="font-size:13px;font-weight:700;color:#059669;">From ₹1,29,999</span>
        </div>
        <div style="border:1px solid #e5e7eb;padding:16px;border-radius:10px;background:#ffffff;">
          <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 6px 0;">AI &amp; Workstation Desktops</h3>
          <p style="font-size:13px;color:#6b7280;margin:0 0 8px 0;">AMD Ryzen 9 9950X / Intel Core i9-14900KS + NVIDIA RTX 4090 24GB + 64GB DDR5 ECC support for Blender, Premiere Pro, and PyTorch training.</p>
          <span style="font-size:13px;font-weight:700;color:#059669;">From ₹2,49,999</span>
        </div>
      </div>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Our Rig Assembly & Testing Standard</h3>
      <p style="font-size:14px;margin:0 0 16px 0;">
        Unlike bulk online prebuilt sellers, TecnoMart builds every desktop computer by hand with professional cable management, custom fan-curve tuning, and 12 continuous hours of synthetic burn-in testing (Cinebench R23, FurMark, 3DMark Time Spy, MemTest86). You receive full retail boxes, documentation, and a 3-year warranty covering assembly and diagnostics.
      </p>

      <div style="margin-top:20px;display:flex;gap:12px;">
        <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20want%20to%20consult%20on%20a%20Custom%20PC%20Build." style="background:#0d0d0d;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Consult PC Specialist on WhatsApp</a>
        <a href="/gaming" style="background:#ffffff;border:1px solid #d1d5db;color:#111827;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Browse Pre-Built Desktops</a>
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
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:32px;">
      ${cards}
    </div>

    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">TecnoMart Flash Sale & Open-Box Policy</h2>
      <p style="font-size:14px;margin:0 0 16px 0;">
        All deal items featured on this page represent either limited-inventory promotional stock directly subsidized by brand partners or certified open-box showroom display units. Open-box units have zero cosmetic flaws, 100% functional health, full retail accessories, and complete official manufacturer warranty starting from your date of tax invoice.
      </p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:20px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:8px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">First-Come, First-Served</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Due to heavy demand across Tolichowki and Hyderabad, deal prices cannot be held without an advance token or confirmed order.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:8px;">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px 0;">Extra Trade-In Bonus</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Exchange your older device during flash sales to receive an additional ₹2,000 to ₹5,000 exchange bonus on select models.</p>
        </div>
      </div>
      
      <p style="font-size:14px;margin:0;">
        Want to lock in a deal before stock depletes? WhatsApp our team immediately at <a href="https://wa.me/919866388870" style="color:#d97706;font-weight:700;">+91 98663 88870</a> for instant reservations.
      </p>
    </section>
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
      tag: 'Flagships',
    },
    {
      slug: 'how-to-spot-fake-apple-accessories',
      title: 'How to Spot Counterfeit Apple Chargers and Accessories in India',
      desc: 'Learn the 5 critical checks to verify genuine Apple 20W adapters, MagSafe pucks, and braided USB-C cables before buying.',
      tag: 'Accessories',
    },
    {
      slug: 'hp-laptop-lines-on-screen',
      title: 'HP Laptop Horizontal & Vertical Lines on Screen: Causes and Repair Solutions',
      desc: 'Expert troubleshooting for HP Pavilion and Omen displays. Identify whether you need an eDP cable reseat or panel replacement in Hyderabad.',
      tag: 'Hardware Repair',
    },
    {
      slug: 'asus-laptop-screen-flickering',
      title: 'How to Fix ASUS TUF & ROG Laptop Screen Flickering in Windows 11',
      desc: 'Step-by-step diagnostic guide to resolve display flicker caused by GPU driver mismatch, refresh rate conflicts, and backlight failure.',
      tag: 'Hardware Repair',
    },
    {
      slug: 'gaming-pc-build-guide',
      title: 'Ultimate Custom Gaming PC Build Guide 2026: Component Selection in Hyderabad',
      desc: 'Everything you need to know about CPU/GPU matching, PSU wattage sizing, thermal paste application, and bottleneck prevention.',
      tag: 'PC Builds',
    },
    {
      slug: 'laptop-pink-green-screen-fix',
      title: 'Why Does My Laptop Screen Have a Pink or Green Tint? Solutions Explained',
      desc: 'Distinguish between loose display flex cables, corrupted GPU drivers, and defective panel color channels with our technician guide.',
      tag: 'Hardware Repair',
    },
    {
      slug: 'red-screen-on-laptop',
      title: 'How to Fix Red Screen of Death (RSOD) on Windows Laptops',
      desc: 'Troubleshoot critical graphics errors, VRAM failure, BIOS misconfiguration, and driver conflicts causing red screen crashes.',
      tag: 'Diagnostics',
    },
    {
      slug: 'how-to-check-laptop-serial-number-warranty',
      title: 'How to Check Laptop Serial Number and Official Manufacturer Warranty in India',
      desc: 'Quick command prompt, PowerShell, BIOS, and chassis methods to locate serial numbers for HP, Dell, Lenovo, ASUS, and Apple MacBooks.',
      tag: 'Buyer Advice',
    },
    {
      slug: 'iphone-15-vs-iphone-16',
      title: 'iPhone 15 vs iPhone 16: Is the Upgrade Worth It for Hyderabad Users?',
      desc: 'Detailed comparison of camera systems, A18 processor performance, battery life, Action Button, and real-world resale values.',
      tag: 'Smartphones',
    },
    {
      slug: 'prebuilt-vs-custom-gaming-pc',
      title: 'Prebuilt vs Custom Gaming PC: Which Delivers Better Value in Hyderabad?',
      desc: 'An honest breakdown of proprietary components vs standard DIY hardware, thermal efficiency, warranty, and long-term upgradeability.',
      tag: 'PC Builds',
    },
    {
      slug: 'liquid-cooling-vs-air-cooling-gaming-pc',
      title: 'AIO Liquid Cooling vs Air Cooling for Gaming Desktops in Hyderabad Summers',
      desc: 'Thermal performance testing, ambient temperature handling, pump failure risks, and decibel noise comparisons for high-end gaming CPUs.',
      tag: 'Hardware Cooling',
    },
    {
      slug: 'refurbished-pc-laptop-worth-buying',
      title: 'Are Certified Refurbished Laptops and Desktops Worth Buying in 2026?',
      desc: 'Why Grade-A certified refurbished devices save you up to 50% while offering genuine battery life, clean motherboards, and 1-year store warranty.',
      tag: 'Refurbished Tech',
    },
  ];

  const cards = articles
    .map(
      (a) => `
      <article style="border:1px solid #e5e7eb;border-radius:12px;padding:22px;background:#ffffff;margin-bottom:16px;">
        <span style="font-size:11px;font-weight:700;color:#d97706;background:#fef3c7;padding:2px 8px;border-radius:4px;text-transform:uppercase;">${escapeHtml(a.tag)}</span>
        <h2 style="font-size:18px;font-weight:800;margin:10px 0 8px 0;line-height:1.3;">
          <a href="/blogs/${a.slug}" style="color:#111827;text-decoration:none;">${escapeHtml(a.title)}</a>
        </h2>
        <p style="font-size:14px;color:#4b5563;line-height:1.5;margin:0 0 14px 0;">${escapeHtml(a.desc)}</p>
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
    mainHtml: `<div style="max-width:900px;margin:0 auto;">${cards}</div>`,
  });
}

function generateBlogDetailBodyHtml(article) {
  const mainHtml = `
    <article style="max-width:850px;margin:0 auto;line-height:1.8;color:#374151;font-size:15px;">
      <!-- Key Takeaway AEO Direct Answer Block -->
      <div style="background:#fef3c7;border-left:4px solid #d97706;padding:18px;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="font-size:13px;font-weight:800;color:#92400e;text-transform:uppercase;margin:0 0 4px 0;">Summary & Quick Verdict</p>
        <p style="margin:0;font-size:14px;color:#78350f;line-height:1.6;">${escapeHtml(article.description)}</p>
      </div>

      ${article.contentHtml || `
        <h2 style="font-size:22px;font-weight:800;color:#111827;margin:28px 0 14px 0;">Comprehensive Analysis & Diagnostic Overview</h2>
        <p>
          Whether you are investing in modern computing hardware or troubleshooting frustrating hardware anomalies, accurate diagnostics are critical to protecting your investment. At TecnoMart's Tolichowki hardware laboratory, our certified technicians regularly inspect devices experiencing performance drops, screen defects, and thermal throttling.
        </p>

        <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 10px 0;">Key Hardware Factors to Consider</h3>
        <p>
          When evaluating electronics longevity under Indian climatic conditions—particularly harsh summer ambient temperatures exceeding 42°C in Hyderabad—hardware components experience distinct thermal and electrical stresses. Ensuring proper airflow, dust filtration, genuine voltage regulation, and certified accessories prevents premature component degradation.
        </p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:24px 0;">
          <h4 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 8px 0;">Technician Recommendation:</h4>
          <p style="font-size:14px;color:#4b5563;margin:0;">
            Always verify that retail components carry valid GST tax invoices for pan-India authorized warranty claims. Avoid unverified third-party chargers that lack surge protection, as overvoltage is the leading cause of logic board PMIC burnout.
          </p>
        </div>
      `}

      <div style="background:#f3f4f6;border-radius:12px;padding:24px;margin:32px 0;border:1px solid #e5e7eb;">
        <h3 style="font-size:18px;font-weight:800;color:#111827;margin:0 0 8px 0;">Need Hands-on Help in Hyderabad?</h3>
        <p style="font-size:14px;color:#4b5563;margin:0 0 16px 0;">
          Visit the TecnoMart Service & Retail Center at 7 Tombs Road, Tolichowki, Hyderabad. Our engineers provide instant hardware diagnostics, live demonstrations, screen replacements, and custom PC consultations.
        </p>
        <div style="display:flex;gap:12px;">
          <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20read%20your%20blog%20post%20on%20${encodeURIComponent(article.title)}%20and%20need%20assistance." style="background:#25d366;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;">Chat with Engineer on WhatsApp</a>
          <a href="/repairs" style="background:#111827;color:#ffffff;font-size:13px;font-weight:700;padding:10px 18px;border-radius:6px;text-decoration:none;">View Repair Services</a>
        </div>
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
    subtitle: `Published by TecnoMart Hardware Specialists · Tolichowki, Hyderabad`,
    mainHtml,
  });
}

function generateAboutBodyHtml() {
  const mainHtml = `
    <section style="line-height:1.8;color:#374151;font-size:15px;max-width:900px;margin:0 auto;">
      <p style="margin-bottom:20px;font-size:16px;">
        Founded in 2016, <strong>TecnoMart</strong> has established itself as Hyderabad's most trusted independent electronics retail showroom and certified hardware engineering center, centrally located at 7 Tombs Road, Tolichowki.
      </p>

      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:28px 0 12px 0;">Dedicated Cleanroom Micro-Soldering Lab</h2>
      <p style="margin-bottom:16px;">
        Unlike standard retail electronics outlets that outsource technical servicing, our Tolichowki facility features a dedicated Class-100 cleanroom repair laboratory equipped with high-resolution stereo microscopes, programmable infrared BGA rework stations, and precision DC power supplies. We resurrect complex logic boards, replace shorted power ICs, and perform microscopic trace jumpers with industry-leading success rates.
      </p>

      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:28px 0 12px 0;">Custom Liquid-Cooled PC Assembly & Thermal Testing</h2>
      <p style="margin-bottom:16px;">
        Every custom desktop workstation and gaming PC crafted at TecnoMart is engineered for sustained thermal equilibrium under harsh Indian ambient climates. We subject all builds to 12 hours of synthetic burn-in testing (Cinebench, FurMark, MemTest86, and 3DMark) to ensure zero blue-screens, no thermal throttling, and rock-solid reliability before handoff.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:32px 0;">
        <div style="border:1px solid #e5e7eb;padding:20px;border-radius:10px;text-align:center;background:#f9fafb;">
          <div style="font-size:28px;font-weight:900;color:#111827;">2016</div>
          <div style="font-size:13px;color:#6b7280;margin-top:4px;">Founded in Hyderabad</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:20px;border-radius:10px;text-align:center;background:#f9fafb;">
          <div style="font-size:28px;font-weight:900;color:#111827;">45,000+</div>
          <div style="font-size:13px;color:#6b7280;margin-top:4px;">Happy Customers</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:20px;border-radius:10px;text-align:center;background:#f9fafb;">
          <div style="font-size:28px;font-weight:900;color:#111827;">18,000+</div>
          <div style="font-size:13px;color:#6b7280;margin-top:4px;">Devices Repaired</div>
        </div>
        <div style="border:1px solid #e5e7eb;padding:20px;border-radius:10px;text-align:center;background:#f9fafb;">
          <div style="font-size:28px;font-weight:900;color:#111827;">4.8 / 5</div>
          <div style="font-size:13px;color:#6b7280;margin-top:4px;">Verified Google Rating</div>
        </div>
      </div>

      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:28px 0 12px 0;">Our 4 Core Commitments</h2>
      <ul style="padding-left:20px;margin-bottom:24px;">
        <li style="margin-bottom:8px;"><strong>100% Genuine Retail Units:</strong> We strictly sell authentic Indian retail models with valid GST invoices and official brand warranty.</li>
        <li style="margin-bottom:8px;"><strong>Transparent Diagnostic Pricing:</strong> Never pay hidden fees. We quote clear repair costs upfront following a free 15-minute diagnostic.</li>
        <li style="margin-bottom:8px;"><strong>Customer Privacy Protection:</strong> We maintain strict confidentiality over customer data during hardware repairs.</li>
        <li style="margin-bottom:8px;"><strong>Community Support:</strong> Special discounts for local students, educators, and emerging Hyderabad tech startups.</li>
      </ul>
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
    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin-bottom:32px;">
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;line-height:1.7;">
        <h2 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 16px 0;">Showroom & Service Center Location</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 0;width:30%;color:#6b7280;">Address:</th>
              <td style="padding:10px 0;color:#111827;font-weight:600;">7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad, Telangana 500008</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 0;color:#6b7280;">Landmark:</th>
              <td style="padding:10px 0;color:#111827;">Near Raghava Colony Arch, 5 minutes from Tolichowki Flyover, close to Paramount Colony.</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 0;color:#6b7280;">Phone Hotline:</th>
              <td style="padding:10px 0;"><a href="tel:+919866388870" style="color:#0284c7;text-decoration:none;font-weight:700;">+91 98663 88870</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 0;color:#6b7280;">WhatsApp Desk:</th>
              <td style="padding:10px 0;"><a href="https://wa.me/919866388870" style="color:#059669;text-decoration:none;font-weight:700;">+91 98663 88870</a> (Instant availability checks)</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <th style="text-align:left;padding:10px 0;color:#6b7280;">Email:</th>
              <td style="padding:10px 0;"><a href="mailto:support@tecnomart.in" style="color:#111827;text-decoration:none;">support@tecnomart.in</a></td>
            </tr>
            <tr>
              <th style="text-align:left;padding:10px 0;color:#6b7280;">Working Hours:</th>
              <td style="padding:10px 0;color:#111827;font-weight:600;">Monday – Sunday: 10:00 AM – 9:30 PM IST (Open 7 Days)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <h2 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 12px 0;">Connect With Hardware Specialists</h2>
          <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0 0 18px 0;">
            Looking for live Indian Rupee pricing, custom PC quotations, same-day repair appointment slots, or enterprise B2B inquiries? Contact our team directly via WhatsApp for guaranteed response within 5 minutes.
          </p>
          <div style="background:#f9fafb;padding:16px;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:20px;font-size:13px;color:#374151;">
            <p style="margin:0 0 4px 0;font-weight:700;">Parking & Accessibility:</p>
            <p style="margin:0;color:#6b7280;">Dedicated two-wheeler and four-wheeler parking available directly in front of the showroom. Wheelchair accessible ground floor entrance.</p>
          </div>
        </div>
        <a href="https://wa.me/919866388870?text=Hello%20TecnoMart!%20I%20have%20an%20inquiry." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:14px 24px;border-radius:8px;text-decoration:none;text-align:center;">Chat on WhatsApp Business (+91 98663 88870)</a>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Interactive Smartphone &amp; Laptop Comparison Engine</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Choosing between flagship devices requires analyzing real-world specifications beyond marketing claims. TecnoMart's comparison engine evaluates Geekbench multi-core CPU benchmarks, GPU rasterization scores, display peak nits, sensor sizes, and true battery endurance.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">Processor Performance</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">Apple A18 Pro vs Snapdragon 8 Gen 3 vs Intel Core Ultra vs Apple M3 Max silicon comparisons.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">Display Optics</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">ProMotion 120Hz OLED, Dynamic AMOLED 2X, anti-reflective Gorilla Armor coatings, and color accuracy.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 6px 0;">Camera Systems</h3>
          <p style="font-size:13px;color:#6b7280;margin:0;">5x optical periscope telephoto, 48MP ultrawide sensors, 4K 120fps Dolby Vision, and low-light nightography.</p>
        </div>
      </div>

      <div style="display:flex;gap:12px;margin-top:20px;">
        <a href="/mobiles" style="background:#0d0d0d;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;">Browse All Smartphones</a>
        <a href="/laptops" style="background:#ffffff;border:1px solid #d1d5db;color:#111827;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;">Browse All Laptops</a>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">0% No-Cost EMI Calculator & Financing Guide</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Upgrade to the latest Apple iPhone 16 Pro Max, MacBook Air M2, or RTX gaming laptop with zero upfront financial strain. TecnoMart partners with major Indian financial institutions to provide instant, paperless 0% No-Cost EMI approvals across flexible 3, 6, 9, 12, 18, and 24-month tenures.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">iPhone 16 Pro Max</h3>
          <p style="font-size:14px;color:#059669;font-weight:800;margin:0 0 4px 0;">From ₹8,333/mo (12 Months 0% EMI)</p>
          <p style="font-size:12px;color:#6b7280;margin:0;">Available on HDFC, ICICI, SBI & Axis Bank Credit Cards.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">MacBook Air M2</h3>
          <p style="font-size:14px;color:#059669;font-weight:800;margin:0 0 4px 0;">From ₹8,249/mo (12 Months 0% EMI)</p>
          <p style="font-size:12px;color:#6b7280;margin:0;">Zero down payment options available in-store.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">RTX 4070 Gaming PC</h3>
          <p style="font-size:14px;color:#059669;font-weight:800;margin:0 0 4px 0;">From ₹10,833/mo (12 Months 0% EMI)</p>
          <p style="font-size:12px;color:#6b7280;margin:0;">Custom rigs qualify for corporate & personal financing.</p>
        </div>
      </div>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Required Documents for Instant Showroom Approval</h3>
      <p style="font-size:14px;margin:0 0 12px 0;">
        For instant paperless financing approval at our Tolichowki showroom via Bajaj Finserv, HDB Financial, or IDFC First Bank, simply bring:
      </p>
      <ul style="padding-left:20px;font-size:14px;margin-bottom:20px;">
        <li>Aadhaar Card (linked to active mobile number for OTP verification)</li>
        <li>PAN Card for KYC compliance</li>
        <li>Active bank debit card or cancelled cheque for automated NACH mandate setup</li>
      </ul>

      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20want%20to%20check%20my%20EMI%20eligibility." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Check EMI Eligibility on WhatsApp</a>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Instant Device Trade-In & Buyback Valuation in Hyderabad</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Upgrade to a brand-new iPhone, Samsung flagship, or MacBook by exchanging your existing smartphone or laptop. Unlike automated trade-in apps that cut quoted valuations upon inspection, TecnoMart offers fair, transparent diagnostic grading with zero deduction surprises.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Step 1: Diagnostic Check</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Bring your device to Tolichowki or share model, storage, and condition photos on WhatsApp.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Step 2: Instant Valuation</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Our technicians test screen lines, touch sensors, battery health, and cameras to quote top market price.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Step 3: Instant Upgrade Credit</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Apply trade-in valuation directly toward your new purchase or receive instant cash/UPI transfer.</p>
        </div>
      </div>

      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20want%20to%20check%20exchange%20value%20for%20my%20device." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Get WhatsApp Trade-in Quote</a>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">B2B Enterprise IT Procurement, Fleet Deployments & Bulk Hardware</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Equip your Hyderabad startup, software consultancy, or corporate enterprise with business-grade Apple MacBooks, Lenovo ThinkPads, Dell Precision workstations, and bespoke server equipment. TecnoMart provides full GST input tax invoices, corporate credit terms, and dedicated on-site support service level agreements (SLAs).
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">18% GST Input Credit</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Every B2B order comes with genuine GST tax invoices allowing your business to claim full input tax credit.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Priority On-Site Support</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Dedicated hardware engineers for on-site troubleshooting, RAM/SSD upgrades, and loaner machines during servicing.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Bulk Volume Pricing</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Tiered institutional discounts on bulk laptop procurement for cohorts of 5 to 100+ workstations.</p>
        </div>
      </div>

      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart%20Corporate!%20We%20require%20bulk%20IT%20hardware%20procurement." style="background:#0d0d0d;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Contact Corporate Accounts Manager</a>
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
    <section style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;line-height:1.7;color:#374151;">
      <h2 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 12px 0;">Student & Educator Academic Tech Discount Program</h2>
      <p style="font-size:14px;margin:0 0 20px 0;">
        Students and faculty from IIIT Hyderabad, IIT Hyderabad, Osmania University, BITS Pilani Hyderabad, JNTU, and any recognized college save up to ₹15,000 on Apple MacBooks, Windows creator laptops, and study peripherals. Present your valid college ID card at our Tolichowki showroom or verify via WhatsApp.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0;">
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">MacBook Student Pricing</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Exclusive academic discounts on MacBook Air M2/M3 and MacBook Pro for coding and design coursework.</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e5e7eb;padding:16px;border-radius:10px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px 0;">Free Essential Tech Bundle</h3>
          <p style="font-size:12px;color:#6b7280;margin:0;">Complimentary padded laptop sleeve, wireless mouse, and keyboard guard with every student laptop purchase.</p>
        </div>
      </div>

      <a href="https://wa.me/919866388870?text=Hi%20TecnoMart!%20I%20am%20a%20student%20inquiring%20about%20discounts." style="background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block;">Claim Student Discount on WhatsApp</a>
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
    <section style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:28px;margin-bottom:32px;">
      <h2 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 16px 0;">All Website Routes, Catalogs & Tools</h2>
      <ul style="list-style:none;padding:0;margin:0 0 28px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;">
        ${links}
      </ul>

      <h3 style="font-size:18px;font-weight:700;color:#111827;margin:24px 0 12px 0;">Popular Flagship Products Available In-Store</h3>
      <p style="font-size:13px;color:#6b7280;margin:0 0 12px 0;">
        Direct access to flagship smartphones, MacBooks, and hardware configurations at our Tolichowki showroom:
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:13px;">
        <a href="/mobiles/apple-iphone-16-pro-max" style="background:#f3f4f6;padding:6px 12px;border-radius:6px;color:#111827;text-decoration:none;">iPhone 16 Pro Max</a>
        <a href="/mobiles/samsung-galaxy-s24-ultra" style="background:#f3f4f6;padding:6px 12px;border-radius:6px;color:#111827;text-decoration:none;">Samsung Galaxy S24 Ultra</a>
        <a href="/laptops/apple-macbook-pro-16-m3-max" style="background:#f3f4f6;padding:6px 12px;border-radius:6px;color:#111827;text-decoration:none;">MacBook Pro 16 M3 Max</a>
        <a href="/gaming" style="background:#f3f4f6;padding:6px 12px;border-radius:6px;color:#111827;text-decoration:none;">RTX 4090 Custom Gaming PC</a>
      </div>
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
    <section style="max-width:850px;margin:0 auto;line-height:1.8;color:#374151;font-size:14px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:20px 0 8px 0;">1. Information We Collect</h2>
      <p>We collect necessary contact information (name, phone number, email address, physical delivery address, and GST registration details where applicable) strictly for processing orders, managing customer repair jobs, and complying with Indian taxation statutes.</p>
      
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">2. Device Privacy During Hardware Servicing</h2>
      <p>Customer device privacy is sacred. Our certified technicians never access, copy, browse, or transfer personal media, messages, or confidential documents from customer laptops and phones checked in for screen, battery, or logic board repairs. Customers are encouraged to back up data prior to hardware servicing.</p>
      
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">3. Data Security & Storage Commitments</h2>
      <p>All financial transactions are handled securely through PCI-DSS compliant payment gateways. We never store credit card numbers, CVVs, or net banking passwords on our local servers.</p>

      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">4. Contact Our Privacy Officer</h2>
      <p>For inquiries regarding personal data retention or erasure requests under the Digital Personal Data Protection Act, contact <a href="mailto:privacy@tecnomart.in" style="color:#d97706;font-weight:600;">privacy@tecnomart.in</a> or visit our Tolichowki showroom at 7 Tombs Road, Hyderabad.</p>
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
    <section style="max-width:850px;margin:0 auto;line-height:1.8;color:#374151;font-size:14px;">
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:20px 0 8px 0;">1. Brand New Retail Warranty</h2>
      <p>All brand new retail smartphones, laptops, monitors, and components sold by TecnoMart carry official manufacturer authorized warranty across India with valid tax invoices. Warranty claims can be registered at any brand-authorized service center nationwide.</p>
      
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">2. Certified Refurbished Warranty</h2>
      <p>Certified refurbished units include a 1-Year TecnoMart Store Warranty covering internal hardware functionality, alongside a 7-day replacement period for technical defects discovered upon delivery.</p>
      
      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">3. 90-Day Hardware Repair Guarantee</h2>
      <p>Components replaced during repair servicing (screens, batteries, ports, micro-soldered ICs) are protected under our 90-day functional repair warranty. Physical cracks, accidental drops, or liquid ingress occurring post-repair void this warranty.</p>

      <h2 style="font-size:18px;font-weight:800;color:#111827;margin:24px 0 8px 0;">4. Returns & Replacement Policy</h2>
      <p>Defective retail items reported within 48 hours of purchase will be inspected at our Tolichowki service hub for prompt DOA replacement in accordance with brand partner protocols.</p>
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
  const resolvedImg = ogImage ? (ogImage.startsWith('http') ? ogImage : `${DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`) : `${DOMAIN}/webp/logo.webp`;
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
    if (html.includes('name="robots"')) {
      html = html.replace(
        /<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
        '<meta name="robots" content="noindex, follow" />'
      );
    } else {
      html = html.replace(
        /<\/head>/i,
        '    <meta name="robots" content="noindex, follow" />\n  </head>'
      );
    }
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
// Exact Title (50-60 chars) and Meta Description (120-160 chars)
// Matches Master SEO/AEO/GEO Audit Section 5
// -------------------------------------------------------------
const STATIC_ROUTES = [
  {
    path: '/mobiles',
    title: 'Mobile Shop in Hyderabad | iPhone, Samsung | TecnoMart',
    description: 'Buy latest iPhones, Samsung Galaxy & OnePlus at TecnoMart Tolichowki, Hyderabad. Best prices, 0% EMI & 3-hour express delivery. Call +91 98663 88870.',
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
    title: 'Laptop Store in Hyderabad | MacBook & Gaming | TecnoMart',
    description: 'Shop Apple MacBooks, ASUS ROG, Dell XPS & Lenovo laptops at TecnoMart Tolichowki, Hyderabad. Official warranty, 0% EMI & same-day delivery. Call us.',
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
    title: 'Computer Accessories & Audio in Hyderabad | TecnoMart',
    description: 'Genuine Apple adapters, GaN fast chargers, mechanical keyboards & audio gear at TecnoMart Tolichowki, Hyderabad. Official brand warranty on all items.',
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
    title: 'Custom Gaming PC Hyderabad | RTX Builds | TecnoMart',
    description: 'Custom liquid-cooled gaming PCs in Tolichowki, Hyderabad. Intel, AMD Ryzen & NVIDIA RTX 40-series builds tested for peak FPS. Visit showroom or call.',
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
    title: 'Refurbished iPhones & Laptops Hyderabad | TecnoMart',
    description: 'Buy Grade-A+ certified refurbished iPhones, MacBooks & laptops in Hyderabad. 32-point inspection, 1-year store warranty & 7-day replacement. Call us.',
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
    title: 'Mobile & Laptop Repair in Hyderabad | TecnoMart',
    description: 'Certified mobile & laptop repair in Tolichowki, Hyderabad. Screen replacement, battery repair & chip-level fixes with 90-day warranty. Same-day service.',
    image: '/webp/logo.webp',
    schema: REPAIRS_SCHEMA,
    bodyHtml: generateRepairsBodyHtml(),
  },
  {
    path: '/pc-builds',
    title: 'Custom PC Builder Hyderabad | Live Pricing | TecnoMart',
    description: 'Configure your dream gaming PC or workstation with live pricing & wattage calculator at TecnoMart Hyderabad. Stress-tested RTX builds. Call +91 98663 88870.',
    image: '/webp/bento-grid-images/pc.webp',
    bodyHtml: generatePCBuildsBodyHtml(),
  },
  {
    path: '/deals',
    title: 'Best Tech Deals & Open-Box Offers | TecnoMart',
    description: 'Exclusive discounts on smartphones, laptops, monitors & open-box deals at TecnoMart Tolichowki, Hyderabad. Limited stocks with warranty. Call now.',
    image: '/webp/logo.webp',
    bodyHtml: generateDealsBodyHtml(),
  },
  {
    path: '/blogs',
    title: 'Tech Guides & Buyer Advice | TecnoMart Hyderabad',
    description: 'Expert tech buying guides, repair diagnostics, smartphone comparisons & hardware tutorials from certified engineers at TecnoMart Tolichowki, Hyderabad.',
    image: '/webp/logo.webp',
    bodyHtml: generateBlogsListBodyHtml(),
  },
  {
    path: '/about',
    title: 'About TecnoMart | Tech Store in Hyderabad',
    description: "Learn about TecnoMart, Hyderabad's trusted electronics store & service center in Tolichowki since 2016. Genuine devices, cleanroom lab & 45K+ happy clients.",
    image: '/webp/logo.webp',
    bodyHtml: generateAboutBodyHtml(),
  },
  {
    path: '/contact',
    title: 'Contact TecnoMart | Tech Store in Tolichowki',
    description: 'Visit TecnoMart at 7 Tombs Rd, Tolichowki, Hyderabad. Call +91 98663 88870 or WhatsApp for prices, stock checks & same-day repairs. Open 7 days a week.',
    image: '/webp/logo.webp',
    bodyHtml: generateContactBodyHtml(),
  },
  {
    path: '/compare',
    title: 'Compare Phones & Laptops Side by Side | TecnoMart',
    description: 'Compare smartphone and laptop specifications, benchmarks, camera quality and live prices side by side at TecnoMart Hyderabad. Make the right choice.',
    image: '/webp/logo.webp',
    bodyHtml: generateCompareBodyHtml(),
  },
  {
    path: '/emi-calculator',
    title: 'EMI Calculator for Mobiles & Laptops | TecnoMart',
    description: 'Calculate 0% No-Cost EMI monthly installments on iPhones, MacBooks & gaming laptops at TecnoMart Hyderabad. HDFC, ICICI, SBI & Bajaj Finserv plans.',
    image: '/webp/logo.webp',
    bodyHtml: generateEmiCalculatorBodyHtml(),
  },
  {
    path: '/exchange',
    title: 'Phone & Laptop Trade-In Value | TecnoMart Hyderabad',
    description: 'Get instant trade-in value for your old smartphone or laptop at TecnoMart Tolichowki, Hyderabad. Fair diagnostic grading & instant upgrade cash credit.',
    image: '/webp/logo.webp',
    bodyHtml: generateExchangeBodyHtml(),
  },
  {
    path: '/corporate',
    title: 'Corporate IT Procurement Hyderabad | TecnoMart',
    description: 'B2B enterprise IT hardware, bulk laptop procurement & office workstation setups in Hyderabad. Full GST tax invoices & SLA support from TecnoMart.',
    image: '/webp/logo.webp',
    bodyHtml: generateCorporateBodyHtml(),
  },
  {
    path: '/students',
    title: 'Student Discount on MacBooks & Laptops | TecnoMart',
    description: 'Exclusive student discounts on Apple MacBooks, iPads & Windows laptops at TecnoMart Tolichowki, Hyderabad. Extra savings with valid student ID card.',
    image: '/webp/logo.webp',
    bodyHtml: generateStudentsBodyHtml(),
  },
  {
    path: '/sitemap',
    title: 'HTML Sitemap | TecnoMart Hyderabad',
    description: 'Complete directory of all departments, products, repair services, financial tools and buyer guides at TecnoMart Tolichowki, Hyderabad.',
    image: '/webp/logo.webp',
    isNoindex: true,
    bodyHtml: generateSitemapBodyHtml(),
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | TecnoMart Hyderabad',
    description: "Read TecnoMart's privacy policy, customer data protection standards and device privacy commitments for sales and hardware repairs in Hyderabad.",
    image: '/webp/logo.webp',
    bodyHtml: generatePrivacyBodyHtml(),
  },
  {
    path: '/terms',
    title: 'Terms & Warranty Policies | TecnoMart Hyderabad',
    description: 'Review TecnoMart sales terms, manufacturer warranty coverage, 90-day repair guarantees and exchange policies at our Tolichowki showroom.',
    image: '/webp/logo.webp',
    bodyHtml: generateTermsBodyHtml(),
  },
];

// -------------------------------------------------------------
// Expanded 12 Blog Articles (Exact 50-60 chars title, 120-160 chars meta)
// -------------------------------------------------------------
const BLOG_ARTICLES = [
  {
    slug: 'iphone-16-pro-vs-galaxy-s24-ultra-hyderabad',
    title: 'iPhone 16 Pro vs S24 Ultra | TecnoMart Hyderabad',
    description: 'Comprehensive comparison of iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra in Hyderabad. Camera optics, battery life, retail pricing & warranty details.',
    image: '/webp/bento-grid-images/mobiles.webp',
  },
  {
    slug: 'how-to-spot-fake-apple-accessories',
    title: 'Spot Fake Apple Accessories | TecnoMart Hyderabad',
    description: 'Learn how to detect fake Apple 20W chargers, MagSafe pucks & Lightning cables in India. Visual checks, serial verification & safety tips from TecnoMart.',
    image: '/webp/bento-grid-images/accessories.webp',
  },
  {
    slug: 'hp-laptop-lines-on-screen',
    title: 'HP Laptop Screen Lines Fix | TecnoMart Hyderabad',
    description: 'Troubleshoot horizontal and vertical lines on HP laptop screens. Diagnostic steps for GPU vs display panel failure and repair costs in Tolichowki.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    slug: 'asus-laptop-screen-flickering',
    title: 'ASUS Laptop Screen Flickering Fix | TecnoMart',
    description: 'Fix ASUS TUF and ROG laptop screen flickering in Windows 11. Step-by-step driver rollback, refresh rate fixes and hardware diagnostic guide.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    slug: 'gaming-pc-build-guide',
    title: 'Gaming PC Build Guide 2026 | TecnoMart Hyderabad',
    description: 'Step-by-step custom gaming PC build guide in Hyderabad. Component selection, thermal management, bottleneck prevention & assembly tips from TecnoMart.',
    image: '/webp/bento-grid-images/pc.webp',
  },
  {
    slug: 'laptop-pink-green-screen-fix',
    title: 'Laptop Pink & Green Screen Fix | TecnoMart Hyderabad',
    description: 'Resolve pink or green tint on laptop screens. Simple fixes for display cable reseating, Intel/NVIDIA graphics driver conflicts & panel replacement.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    slug: 'red-screen-on-laptop',
    title: 'Laptop Red Screen Error Fix | TecnoMart Hyderabad',
    description: 'How to diagnose and fix Red Screen of Death (RSOD) on Windows laptops. GPU driver clean install, BIOS updates & motherboard repair in Tolichowki.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    slug: 'how-to-check-laptop-serial-number-warranty',
    title: 'Check Laptop Serial & Warranty | TecnoMart Hyderabad',
    description: 'Find your laptop serial number in Windows command prompt, BIOS & chassis. Official warranty check portals for HP, Dell, Lenovo, ASUS & Apple MacBooks.',
    image: '/webp/bento-grid-images/laptop.webp',
  },
  {
    slug: 'iphone-15-vs-iphone-16',
    title: 'iPhone 15 vs iPhone 16 Comparison | TecnoMart',
    description: 'Apple iPhone 15 vs iPhone 16 comparison in Hyderabad. Camera upgrades, A18 chip, Action Button, battery endurance & trade-in value at TecnoMart.',
    image: '/webp/bento-grid-images/mobiles.webp',
  },
  {
    slug: 'prebuilt-vs-custom-gaming-pc',
    title: 'Prebuilt vs Custom Gaming PC | TecnoMart Hyderabad',
    description: 'Prebuilt vs custom gaming PC in Hyderabad. Comparison of component quality, upgradability, thermal efficiency & total ownership cost at TecnoMart.',
    image: '/webp/bento-grid-images/pc.webp',
  },
  {
    slug: 'liquid-cooling-vs-air-cooling-gaming-pc',
    title: 'Liquid vs Air Cooling for PC | TecnoMart Hyderabad',
    description: 'AIO liquid cooler vs air cooler for gaming PCs in Hyderabad. Thermal performance, noise levels, maintenance & summer ambient cooling benchmarks.',
    image: '/webp/bento-grid-images/pc.webp',
  },
  {
    slug: 'refurbished-pc-laptop-worth-buying',
    title: 'Is a Refurbished Laptop Worth It? | TecnoMart',
    description: 'Are refurbished laptops worth buying in Hyderabad? 32-point inspection, battery health criteria, warranty terms & price savings at TecnoMart.',
    image: '/webp/bento-grid-images/laptop.webp',
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
    isNoindex: route.isNoindex || false,
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
    const formattedPrice = `₹${numPrice.toLocaleString('en-IN')}`;

    // Precise Title Formatting (Strictly <= 60 characters)
    let title = `${product.name} Price in Hyderabad | TecnoMart`;
    if (title.length > 60) {
      title = `${product.name} in Hyderabad | TecnoMart`;
    }
    if (title.length > 60) {
      title = `${product.name.slice(0, 47)} | TecnoMart`;
    }

    // Precise Meta Description (Strictly 120 - 160 characters)
    let description = `Buy ${product.name} at TecnoMart Tolichowki, Hyderabad. Best INR price (${formattedPrice}), official warranty & 3-hour doorstep delivery. Call +91 98663 88870.`;
    if (description.length > 160) {
      description = `Buy ${product.name} at TecnoMart Tolichowki, Hyderabad. Best price (${formattedPrice}), official warranty & 3-hr delivery. Call +91 98663 88870.`;
    }
    if (description.length > 160) {
      description = `Buy ${product.name} at TecnoMart Tolichowki, Hyderabad. Best price (${formattedPrice}), official warranty & fast delivery. Ph +91 98663 88870.`;
    }
    if (description.length < 120) {
      description = `Buy authentic ${product.name} at TecnoMart Tolichowki, Hyderabad. Best INR price (${formattedPrice}), official brand warranty, 0% EMI and 3-hour doorstep delivery. Call +91 98663 88870.`;
    }

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
      ...(product.rating
        ? {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: String(product.rating),
              reviewCount: String(product.reviewCount || 100),
              bestRating: '5',
              worstRating: '1',
            },
          }
        : {}),
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
    dateModified: '2026-10-02',
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
    title: article.title,
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
