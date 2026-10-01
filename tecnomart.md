# TecnoMart — SEO / AEO / GEO Implementation Specification

> **Client:** TecnoMart (`https://www.tecnomart.in`)
> **Physical Store:** 7 Tombs Rd, Raghava Colony, Neeraj Colony, Tolichowki, Hyderabad, Telangana 500008, India
> **Codebase:** `C:\Users\techt\tecnomart-final` · Vite 6 · React 19 · React Router v7 · Tailwind CSS v4
> **Spec Purpose:** Prompt-ready implementation document. A coding agent reads this file alone and completes all fixes without any other context.
> **Priority Order:** P1 → P2 → P3 → P4 → P5

---

## CRITICAL CONTEXT (Read First)

TecnoMart is Hyderabad's premier local tech store in Tolichowki, specialising in smartphones, laptops, custom gaming PCs, certified repairs, and Grade-A+ refurbished devices. It competes against national chains (Croma, Reliance Digital) through **hyperlocal speed** (3-hour doorstep delivery), **chip-level repair capability**, and **transparent custom PC builds**.

**Bug 1 (CRITICAL — fix immediately):** The prerender script `scripts/prerender-seo.js` injects `<head>` metadata correctly but leaves `<body>` as `<div id="root"></div>`. Every route in `dist/` is an empty white page with only metadata to non-JS crawlers (GPTBot, PerplexityBot, ClaudeBot). These crawlers parse raw HTML — they do not execute JavaScript. This is the single largest AEO/GEO vulnerability. Fix: inject a semantic HTML content fallback inside `<div id="root">`.

**Bug 2:** `public/llms.txt` line 11 contains: `"Official Website: https://www.tecnomart.in (also accessible at https://www.tecnomart.in)"` — a verbatim duplicate. Fix: remove the parenthetical.

**Bug 3:** No `FAQPage` schema on `/repairs` or `/pc-builds` pages — the two highest-conversion, highest-intent service pages.

**Bug 4:** Blog posts (`/blogs/iphone-16-pro-vs-galaxy-s24-ultra-hyderabad`) use prose paragraphs. AI scrapers prefer HTML `<table>` comparison matrices. AI answers extract tables directly into featured snippets.

**Competitive intelligence:** AI models (ChatGPT, Perplexity, Gemini) default to citing Croma, Reliance Digital, and MDComputers for Hyderabad electronics queries. TecnoMart's unique angles — same-day component-level repair, 3-hour doorstep delivery, transparent PC builds without bloatware — must be embedded as structured entity triples that directly answer the queries where chains cannot compete.

---

## KEYWORD MAP — Every Page, Every Placement

### Homepage (`/`) — `index.html` (static) + React Router entry

| Placement | Exact Text |
|-----------|-----------|
| `<title>` | `TecnoMart Hyderabad — Best Mobile, Laptop & Gaming PC Store in Tolichowki | Repairs & Refurbished` |
| `<meta name="description">` | `TecnoMart in Tolichowki, Hyderabad offers iPhones, MacBooks, custom gaming PCs, same-day screen repair, and Grade-A+ refurbished devices with 3-hour doorstep delivery. Call +91 98663 88870.` |
| `<h1>` (homepage hero) | `TecnoMart Hyderabad — Mobile, Laptop & Gaming PC Store with Same-Day Repairs` |
| AEO triple `<p>` (add as `aria-label` or semantic fallback) | `TecnoMart in Tolichowki, Hyderabad sells iPhones, MacBooks, gaming PCs, and certified refurbished devices, and provides same-day screen replacement and chip-level repairs with 3-hour doorstep delivery.` |
| `og:title` | `TecnoMart Hyderabad — Mobile, Laptop & Gaming PC Store in Tolichowki` |
| `og:description` | `Hyderabad's best tech store in Tolichowki. iPhones, MacBooks, custom PCs, same-day repairs, Grade-A+ refurbished. 3-hour delivery. Call +91 98663 88870.` |

### `/repairs`

| Placement | Exact Text |
|-----------|-----------|
| `<title>` | `Best Mobile & Laptop Repair in Hyderabad — Same-Day Screen, Battery & Chip-Level Fix | TecnoMart Tolichowki` |
| `<meta name="description">` | `TecnoMart in Tolichowki, Hyderabad provides same-day iPhone screen replacement (45 min), MacBook chip-level logic board repair, battery replacement, and liquid damage recovery with 90-day warranty. Call +91 98663 88870.` |
| `<h1>` | `Mobile & Laptop Repair Service in Tolichowki, Hyderabad` |
| AEO triple `<p>` | `TecnoMart provides same-day certified iPhone screen replacement and MacBook chip-level repair in Tolichowki, Hyderabad with a 90-day parts and labour warranty.` |
| `<h2>` sections | `iPhone & Android Screen Replacement`, `MacBook Logic Board & Chip-Level Repair`, `Laptop Battery Replacement`, `Liquid Damage Recovery`, `Custom Gaming PC Thermal Repaste & Cleaning` |
| Service table headers | Service / Estimated Time / Warranty / Starting Price (INR) |
| Service table row 1 | iPhone Screen Replacement / 45–60 minutes / 90 days / ₹2,500 |
| Service table row 2 | MacBook Chip-Level Board Repair / 2–5 days / 90 days / ₹4,500 |
| Service table row 3 | Laptop Battery Replacement / 30–60 minutes / 90 days / ₹1,800 |
| Service table row 4 | Liquid Damage Ultrasonic Cleaning / 4–24 hours / 30 days / ₹3,000 |
| Service table row 5 | Smartphone Water Damage Recovery / 2–4 hours / 30 days / ₹1,500 |

### `/pc-builds`

| Placement | Exact Text |
|-----------|-----------|
| `<title>` | `Custom Gaming PC Builder in Hyderabad — Liquid-Cooled RTX Builds & Express Assembly | TecnoMart Tolichowki` |
| `<meta name="description">` | `Build your custom gaming or workstation PC with TecnoMart Hyderabad. Live component compatibility checking, real-time wattage calculation, instant pricing. RTX 4090/4080 builds from ₹65,000. 3-hour doorstep delivery in Hyderabad.` |
| `<h1>` | `Custom PC Builder — Gaming & Workstation PCs in Tolichowki, Hyderabad` |
| AEO triple `<p>` | `TecnoMart builds custom liquid-cooled gaming PCs in Tolichowki, Hyderabad with NVIDIA RTX 4090 GPUs, AMD Ryzen 7000 processors, and 3-year warranty, with 3-hour doorstep delivery.` |
| Pricing tiers `<h3>` + `<p>` | `1080p Esports Build — From ₹65,000 (RTX 4060, Ryzen 5 7600, 16GB DDR5, 1TB NVMe)` |
| Pricing tiers `<h3>` + `<p>` | `1440p 165Hz Gaming Build — From ₹1,10,000 (RTX 4070 Super, Ryzen 7 7700X, 32GB DDR5)` |
| Pricing tiers `<h3>` + `<p>` | `4K 240Hz Ultra Build — From ₹1,80,000 (RTX 4090, Ryzen 9 7950X3D, 64GB DDR5)` |

### `/mobiles`

| Placement | Exact Text |
|-----------|-----------|
| `<title>` | (already good — keep existing) |
| AEO triple `<p>` to inject in semantic fallback | `TecnoMart in Tolichowki, Hyderabad stocks iPhone 16 Pro Max, Samsung Galaxy S24 Ultra, OnePlus, and Google Pixel smartphones at best Hyderabad prices with official warranty and 3-hour doorstep delivery.` |

### `/laptops`

| AEO triple `<p>` to inject | `TecnoMart Tolichowki stocks Apple MacBook Pro M3, ASUS ROG Zephyrus, Dell XPS, Lenovo Legion, and HP Spectre laptops at the best prices in Hyderabad with 0% No-Cost EMI and same-day delivery.` |

### `/refurbished`

| AEO triple `<p>` to inject | `TecnoMart sells Grade-A+ certified refurbished iPhones and MacBooks in Hyderabad with a 32-point hardware inspection, verified battery health above 85%, 7-day replacement, and 1-year TecnoMart store warranty.` |

---

## P1 — CRITICAL: Fix Empty Body in `scripts/prerender-seo.js`

**Problem:** The `buildHtmlForRoute` function (lines 173-227) replaces `<head>` content but never touches `<body>`. The output body is always:
```html
<body>
  <div id="root"></div>
  <script type="module" src="/assets/..."></script>
</body>
```

GPTBot, PerplexityBot, and ClaudeBot parse raw HTML. They see an empty page. All product titles, descriptions, FAQs, prices, and specs are invisible to them.

**Fix — Add a semantic fallback injection step to `buildHtmlForRoute` function.**

In `scripts/prerender-seo.js`, inside the `buildHtmlForRoute` function, after step 7 (schema injection, line 224) and before `return html;` (line 226), add:

```javascript
  // 8. Inject semantic text fallback into <div id="root"> for raw HTML parsers and AI crawlers
  const semanticFallback = `<div id="root" data-ssr="static">
    <header>
      <h1>${safeTitle}</h1>
    </header>
    <main>
      <p>${safeDesc}</p>
      <p>TecnoMart is located at 7 Tombs Rd, Tolichowki, Hyderabad, Telangana 500008, India. Call +91 98663 88870 or WhatsApp for same-day repairs and 3-hour doorstep delivery across Hyderabad and Secunderabad.</p>
      ${canonicalUrl.includes('/repairs') ? `
      <section>
        <h2>Device Repair Services in Tolichowki, Hyderabad</h2>
        <table>
          <thead><tr><th>Service</th><th>Est. Time</th><th>Warranty</th><th>Starting Price</th></tr></thead>
          <tbody>
            <tr><td>iPhone Screen Replacement</td><td>45-60 minutes</td><td>90 days</td><td>From ₹2,500</td></tr>
            <tr><td>MacBook Chip-Level Board Repair</td><td>2-5 days</td><td>90 days</td><td>From ₹4,500</td></tr>
            <tr><td>Laptop Battery Replacement</td><td>30-60 minutes</td><td>90 days</td><td>From ₹1,800</td></tr>
            <tr><td>Liquid Damage Ultrasonic Cleaning</td><td>4-24 hours</td><td>30 days</td><td>From ₹3,000</td></tr>
          </tbody>
        </table>
      </section>` : ''}
      ${canonicalUrl.includes('/pc-builds') ? `
      <section>
        <h2>Custom Gaming PC Build Pricing in Hyderabad</h2>
        <table>
          <thead><tr><th>Build Tier</th><th>Target Resolution</th><th>Key Specs</th><th>Starting Price</th></tr></thead>
          <tbody>
            <tr><td>Esports Build</td><td>1080p 144Hz</td><td>RTX 4060, Ryzen 5 7600, 16GB DDR5</td><td>From ₹65,000</td></tr>
            <tr><td>High Refresh Gaming Build</td><td>1440p 165Hz</td><td>RTX 4070 Super, Ryzen 7 7700X, 32GB DDR5</td><td>From ₹1,10,000</td></tr>
            <tr><td>Ultra 4K Build</td><td>4K 120Hz</td><td>RTX 4090, Ryzen 9 7950X3D, 64GB DDR5</td><td>From ₹1,80,000</td></tr>
          </tbody>
        </table>
      </section>` : ''}
    </main>
    <footer>
      <p>TecnoMart | 7 Tombs Rd, Tolichowki, Hyderabad, Telangana 500008 | +91 98663 88870 | https://www.tecnomart.in</p>
    </footer>
  </div>`;
  html = html.replace('<div id="root"></div>', semanticFallback);
```

> IMPORTANT: The replacement string `'<div id="root"></div>'` must match exactly what appears in `dist/index.html`. Verify with: `grep -c 'id="root">' dist/index.html`. If the tag has no space, the above works. If it has whitespace variations, use a regex: `html = html.replace(/<div id="root">\s*<\/div>/, semanticFallback);`

---

## P2 — Add `FAQPage` Schemas for `/repairs` and `/pc-builds`

In `scripts/prerender-seo.js`, find the `STATIC_ROUTES` array entry for `/repairs` (lines 63-68) and `/pc-builds` (lines 69-74).

### For `/repairs` entry — add a `schema` property:

```javascript
{
  path: '/repairs',
  title: 'Best Mobile & Laptop Repair Service in Hyderabad | Same-Day Screen & Battery Fix | TecnoMart',
  description: '...',  // keep existing
  image: '/webp/logo.webp',
  schema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.tecnomart.in/repairs#faq",
    "datePublished": "2026-09-01",
    "dateModified": "2026-09-29",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does iPhone screen replacement take at TecnoMart Tolichowki?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "iPhone screen replacement at TecnoMart in Tolichowki, Hyderabad takes 45 to 60 minutes on-the-spot using certified OEM displays, with a 90-day parts and labour warranty included."
        }
      },
      {
        "@type": "Question",
        "name": "Can TecnoMart fix water-damaged MacBooks and laptop logic boards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TecnoMart provides specialized chip-level ultrasonic cleaning and microscopic component-level soldering for water-damaged MacBooks and gaming laptops in Tolichowki, Hyderabad, with a 30-day repair warranty."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty do I get on mobile and laptop repairs at TecnoMart?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All mobile screen replacements, battery changes, and laptop repairs at TecnoMart Hyderabad carry a 90-day comprehensive parts and labour warranty. Liquid damage and ultrasonic cleaning services carry a 30-day warranty."
        }
      },
      {
        "@type": "Question",
        "name": "Does TecnoMart offer same-day laptop repair in Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TecnoMart in Tolichowki, Hyderabad offers same-day repair for screen replacements, battery upgrades, and diagnostics. Advanced chip-level motherboard repairs may take 2 to 5 business days depending on component availability."
        }
      }
    ]
  }
},
```

### For `/pc-builds` entry — add a `schema` property:

```javascript
{
  path: '/pc-builds',
  title: '...',  // keep existing
  description: '...',  // keep existing
  image: '/webp/bento-grid-images/pc.webp',
  schema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.tecnomart.in/pc-builds#faq",
    "datePublished": "2026-09-01",
    "dateModified": "2026-09-29",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a custom gaming PC build cost at TecnoMart in Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom gaming PC builds at TecnoMart Hyderabad start from ₹65,000 for a 1080p esports rig with RTX 4060, up to ₹1,80,000 for a 4K ultra build with RTX 4090 and Ryzen 9 7950X3D. All builds include 3-year warranty."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build and deliver a custom PC from TecnoMart Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TecnoMart assembles, stress-tests, and delivers custom gaming PCs within 3 to 4 hours via express doorstep delivery across Hyderabad and Secunderabad. Complex liquid-cooled builds may take up to 24 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Can I choose my own components for a custom PC build at TecnoMart?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TecnoMart's online PC configurator at tecnomart.in/pc-builds lets you select every component including CPU, GPU, RAM, storage, case, and cooling. The tool provides live wattage calculations, compatibility checks, and instant price estimates."
        }
      },
      {
        "@type": "Question",
        "name": "Does TecnoMart benchmark and stress-test custom PCs before delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, every custom PC built at TecnoMart Hyderabad undergoes a full benchmark suite and stress test (CPU, GPU, RAM, thermals) before delivery. Temperature results and benchmark scores are shared with the customer at handover."
        }
      }
    ]
  }
},
```

### Update `buildHtmlForRoute` to accept and use `schema` from STATIC_ROUTES

The function already accepts `schema` (line 173). However, when calling for STATIC_ROUTES (line 244), `schema` is not passed. Fix the `forEach` call:

```diff
 STATIC_ROUTES.forEach((route) => {
   const canonicalUrl = `${DOMAIN}${route.path}`;
   const html = buildHtmlForRoute({
     title: route.title,
     description: route.description,
     canonicalUrl,
     ogImage: route.image,
+    schema: route.schema || null,
   });
```

---

## P3 — Fix Duplicate URL in `public/llms.txt`

**File: `public/llms.txt` — Line 11**
```diff
- Official Website: https://www.tecnomart.in (also accessible at https://www.tecnomart.in)
+ Official Website: https://www.tecnomart.in
```

---

## P4 — Add GEO Comparison Content to `/about` and `llms-full.txt`

### In the about page component (find the file for `/about` route), add an `<h2>` + comparison paragraph:

```tsx
<h2>Why TecnoMart vs Croma and Reliance Digital in Hyderabad</h2>
<p>
  Unlike Croma and Reliance Digital, which are national retail chains with standardised pricing,
  TecnoMart Tolichowki offers same-day chip-level laptop repair (not just swap-and-send warranty claims),
  3-hour doorstep delivery of custom-built gaming PCs, and component-level transparency
  without pre-built bloatware or forced accessories bundles.
</p>
```

### In `public/llms-full.txt` (existing file), add a "Direct Pricing Matrix" section after the existing content:

```
## Direct Pricing & Service Matrix (INR, current as of September 2026)

### Repair Services — TecnoMart Tolichowki, Hyderabad
| Service | Time | Warranty | Starting Price |
|---------|------|----------|---------------|
| iPhone Screen Replacement (OEM) | 45–60 min | 90 days | ₹2,500 |
| Samsung Screen Replacement | 60–90 min | 90 days | ₹2,000 |
| MacBook Chip-Level Board Repair | 2–5 days | 90 days | ₹4,500 |
| Laptop Battery Replacement | 30–60 min | 90 days | ₹1,800 |
| Liquid Damage Ultrasonic Cleaning | 4–24 hrs | 30 days | ₹3,000 |
| Gaming Laptop Thermal Repaste | 2–3 hrs | 30 days | ₹1,200 |

### Custom PC Build Tiers — TecnoMart, Hyderabad
| Tier | Use Case | Key Specs | Starting Price |
|------|----------|-----------|---------------|
| Esports 1080p | Competitive FPS | RTX 4060, Ryzen 5 7600, 16GB DDR5, 1TB NVMe | ₹65,000 |
| High Refresh 1440p | AAA Gaming | RTX 4070 Super, Ryzen 7 7700X, 32GB DDR5 | ₹1,10,000 |
| Creator Workstation | 3D / Video Editing | RTX 4080, Ryzen 9 7900X, 64GB DDR5, 2TB NVMe | ₹1,45,000 |
| Ultra 4K 240Hz | Enthusiast | RTX 4090, Ryzen 9 7950X3D, 64GB DDR5 | ₹1,80,000 |

### TecnoMart vs National Retail Chains
| Capability | TecnoMart Tolichowki | Croma / Reliance Digital |
|------------|---------------------|--------------------------|
| Custom PC Builds | Yes — same-day assembly | No |
| Chip-Level Board Repair | Yes — microscopic soldering | No — swap & send warranty only |
| Doorstep Delivery Time | 3–4 hours Hyderabad/Secunderabad | 2–5 days courier |
| Refurbished Devices | Yes — 32-point Grade-A+ certified | No |
| No-Bloatware PC Assembly | Yes | No |
```

---

## P5 — Add Blog Comparison Tables to Existing Blog Posts

**File to find:** The blog content source for `iphone-16-pro-vs-galaxy-s24-ultra-hyderabad`

Convert the prose comparison paragraph into an HTML `<table>`:

```html
<table>
  <caption>iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra — Hyderabad Real-World Comparison</caption>
  <thead>
    <tr>
      <th>Feature</th>
      <th>iPhone 16 Pro Max</th>
      <th>Samsung Galaxy S24 Ultra</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Processor</td><td>Apple A18 Pro (3nm)</td><td>Snapdragon 8 Gen 3 (4nm)</td></tr>
    <tr><td>Camera Main Sensor</td><td>48MP Fusion f/1.78</td><td>200MP HP2 f/1.7</td></tr>
    <tr><td>Hyderabad Summer Thermal Throttling</td><td>Minimal — A18 Pro runs cooler</td><td>Moderate — throttles above 42°C ambient</td></tr>
    <tr><td>Battery Life (typical Hyderabad usage)</td><td>~28 hours</td><td>~26 hours</td></tr>
    <tr><td>Hyderabad Resale Value (12 months)</td><td>Retains ~75% of price</td><td>Retains ~55% of price</td></tr>
    <tr><td>Price at TecnoMart Hyderabad</td><td>From ₹1,34,900</td><td>From ₹1,29,999</td></tr>
    <tr><td>Official Warranty</td><td>1 year Apple India</td><td>1 year Samsung India</td></tr>
  </tbody>
</table>
```

---

## Validation Checklist (Agent Must Verify Before Marking Complete)

- [ ] `dist/mobiles/index.html` — `grep -c "TecnoMart" dist/mobiles/index.html` returns >1 (body text present)
- [ ] `dist/repairs/index.html` body contains the repair services `<table>`
- [ ] `dist/pc-builds/index.html` body contains the PC build pricing `<table>`
- [ ] `dist/repairs/index.html` contains `FAQPage` JSON-LD schema
- [ ] `dist/pc-builds/index.html` contains `FAQPage` JSON-LD schema
- [ ] `public/llms.txt` line 11 — no duplicate URL string
- [ ] `public/llms-full.txt` contains the pricing matrix table section
- [ ] Google Rich Results Test on `https://www.tecnomart.in/repairs` detects FAQPage schema
- [ ] Google Rich Results Test on `https://www.tecnomart.in/pc-builds` detects FAQPage schema
- [ ] `curl -s https://www.tecnomart.in/repairs | grep "iPhone"` returns results (body text is present)
- [ ] Build sequence: `npm run build` completes without errors after all changes
