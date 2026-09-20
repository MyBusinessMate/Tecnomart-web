# TecnoMart Deployment Storage Forensic Audit

## 1. Executive Summary & Forensic Diagnosis

The TecnoMart project hosted on Vercel suffered an exponential increase in cumulative Deployment Storage, escalating from ~250 MB (pre-Sep 5) to ~6.55 GB (Sep 6), ~11.59 GB (Sep 7), ~17.77 GB (Sep 19), and ultimately reaching **21.28 GB / 10 GB limit** on the Vercel Hobby plan.

### Proven Root Causes:
1. **Introduction of 191 MB of Uncompressed Product PNGs (Commit `8d3acf3`, Sep 6):**
   - 54 high-resolution raster images were committed under `public/images/` (accessories, gaming, landing, laptops, mobiles, refurbished).
   - Many of these were byte-for-byte identical duplicates under different names (e.g., `img-8.png` and `lg-ultragear-27-oled-gaming-monitor.png` are both 2.29 MB).
2. **WebP Generation without Original File Deletion (Commit `f4ecd5c`, Sep 7):**
   - WebP files were generated under `public/webp/` (~17.5 MB).
   - However, the original uncompressed PNGs in `public/images/` were retained.
   - In addition, an entire mirror tree was generated at `public/webp/images/` (~16.38 MB duplicated).
3. **Dead Asset Accumulation in `public/`:**
   - `public/frames/` contained 810 video sequence frames (`001.jpg` – `810.jpg`) totaling **31.16 MB**. An exhaustive grep verified this folder has **0 references** across all code, markup, and scripts.
   - `public/bento-grid-images/` contained 8 obsolete PNG files totaling **10.39 MB**, while all active UI components (`AmazonQuadGrid.jsx`, `CartDrawer.jsx`, `ShopContext.jsx`, `prerender-seo.js`) already link to `/webp/bento-grid-images/*.webp`.
   - `public/models/` contained 3 GLB versions totaling **24.76 MB**:
     - `3d-model-optimized.glb` (4.02 MB) – unreferenced
     - `3d-model-optimized-v4.glb` (10.84 MB) – unreferenced
     - `3d-model-optimized-v3.glb` (9.90 MB) – **active model** loaded in `src/components/redesign/HeroModel.jsx`.
   - Large unreferenced PNGs in `public/` root: `black-cabinet.png` (1.78 MB), `GPU-4050.png` (1.89 MB), `white-cabinet.png` (1.51 MB), `tecnomart-logo.png` (0.56 MB), and `logo.png` (0.14 MB) totaling **5.88 MB**, whose WebP counterparts are active.
4. **Production Source Maps Enabled in Vite:**
   - `vite.config.ts` had `sourcemap: true`, emitting 72 `.map` files totaling **8.65 MB** into `dist/`.
5. **Vercel Cumulative Storage Mechanism:**
   - Because `dist/` ballooned to **314.16 MB per build** (composed of 242 MB PNG/JPG + 34 MB WebP + 25 MB GLB + 8.6 MB maps + code/HTML), every commit triggered a deployment of ~314 MB.
   - Over ~60 deployments across recent feature/SEO commits, Vercel accumulated:
     $$60 \times 314 \text{ MB} \approx 18.84 \text{ GB} + \text{build cache} \approx 21.28 \text{ GB}$$

---

## 2. Framework & Build Architecture

- **Active Framework:** Vite 6.4.3 + React 19.2.8 (Single Page Application with post-build prerendering).
- **Entrypoint:** `index.html` & `src/main.jsx`.
- **Build Command:** `npm run build` (`node scripts/generate-sitemap.js && vite build && node scripts/prerender-seo.js`).
- **Output Directory:** `dist/`.
- **Next.js Leftovers / Compatibility Layer:**
  - Aliases in `vite.config.ts` (`next/link`, `next/image`, `next/navigation`, `next/dynamic`, `next/font/google`) resolve to local shims in `src/lib/`.
  - These shims are actively imported by several components across `src/components/redesign/` and `src/app/`. They are lightweight, zero-overhead shims and must be **preserved** to prevent build breakage.
  - No active Next.js framework dependency or Next.js build runtime exists.

---

## 3. Current vs Target Storage Metrics

| Metric | Pre-Cleanup (Measured) | Target Post-Cleanup (Estimated) | Reduction |
| :--- | :--- | :--- | :--- |
| **`public/` Total Size** | **301.45 MB** | **~35.5 MB** | **-265.95 MB (-88.2%)** |
| - `public/images/` | 191.28 MB | 0.00 MB (Deleted) | -191.28 MB |
| - `public/frames/` | 31.16 MB | 0.00 MB (Deleted) | -31.16 MB |
| - `public/webp/images/` | 16.38 MB | 0.00 MB (Deleted duplicate) | -16.38 MB |
| - `public/bento-grid-images/` | 10.39 MB | 0.00 MB (Deleted obsolete PNGs) | -10.39 MB |
| - `public/models/` | 24.76 MB | 9.90 MB (`current-3d-model.glb`) | -14.86 MB |
| - `public/` root obsolete PNGs | 5.88 MB | 0.00 MB (Deleted) | -5.88 MB |
| **`dist/` Total Size** | **314.16 MB** | **~42.0 MB** | **-272.16 MB (-86.6%)** |
| - Source Maps (`.map`) | 8.65 MB | 0.00 MB (Disabled in prod) | -8.65 MB |
| - Raster PNG/JPG in `dist` | 242.02 MB | ~0.10 MB (Only PWA icons retained) | -241.92 MB |

---

## 4. Detailed Asset Audit & Action Plan

### A. 3D GLB Models (`public/models/`)
- **Active Model Proven:** `public/models/3d-model-optimized-v3.glb` (9.90 MB / 10,381,268 bytes).
  - Referenced in `src/components/redesign/HeroModel.jsx`: `const MODEL_PATH = '/models/3d-model-optimized-v3.glb';`
- **Action:**
  1. Copy `3d-model-optimized-v3.glb` to `public/models/current-3d-model.glb`.
  2. Update `src/components/redesign/HeroModel.jsx` line 32 to:
     `const MODEL_PATH = '/models/current-3d-model.glb';`
  3. Delete `3d-model-optimized-v3.glb`, `3d-model-optimized-v4.glb`, and `3d-model-optimized.glb`.
- **Net Saving:** 14.86 MB.

### B. Unreferenced Video Frames (`public/frames/`)
- 810 files (`001.jpg` to `810.jpg`), total size **31.16 MB**.
- Checked all JS, JSX, TS, TSX, HTML, CSS, scripts. Zero references.
- **Action:** Delete `public/frames/`.
- **Net Saving:** 31.16 MB.

### C. Mirrored Duplicate WebP Folder (`public/webp/images/`)
- 113 files, total size **16.38 MB**.
- Mirrored duplicate of `public/webp/`. Code only references canonical `/webp/{category}/{filename}.webp`.
- **Action:** Delete `public/webp/images/`.
- **Net Saving:** 16.38 MB.

### D. Obsolete Product Catalog PNGs (`public/images/`)
- 54 files, total size **191.28 MB**.
- All catalog items in `src/data/products.js` and `src/data/redesignAssets.js` have already been migrated to use `/webp/`.
- The only remaining string occurrences for `/images/` were:
  - `src/data/catalog.js`: placeholder strings `/images/placeholder-*.jpg` for an unrendered configurator schema.
  - `public/_headers`: `/images/*` cache rule.
- **Action:**
  1. Remove `public/images/`.
  2. Clean up `public/_headers` rule.
- **Net Saving:** 191.28 MB.

### E. Obsolete Bento Grid PNGs (`public/bento-grid-images/`)
- 8 files, total size **10.39 MB**.
- `public/webp/bento-grid-images/` already contains the optimized WebP equivalents (350 KB total).
- Updated references in `public/design-system.html` to point to `/webp/bento-grid-images/`.
- **Action:** Delete `public/bento-grid-images/`.
- **Net Saving:** 10.39 MB.

### F. Obsolete Root PNGs in `public/`
- `black-cabinet.png` (1.78 MB), `GPU-4050.png` (1.89 MB), `white-cabinet.png` (1.51 MB), `tecnomart-logo.png` (0.56 MB), `logo.png` (0.14 MB).
- WebP equivalents exist in `public/webp/` and are actively used.
- Preserved necessary PWA & browser icons: `favicon-96x96.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`, `icon-maskable-512.png`, `web-app-manifest-*.png`.
- **Action:** Delete the 5 obsolete large PNGs from `public/`.
- **Net Saving:** 5.88 MB.

### G. Production Source Maps (`vite.config.ts`)
- In `vite.config.ts`, set `sourcemap: false` for production build.
- **Net Saving:** 8.65 MB per deployment.

### H. Unused Dependencies
- `gsap` (^3.15.0): Not imported in any source file or script. Lenis and Framer Motion are used for all site animations.
- `tailwindcss-animate` (^1.0.7): Tailwind v4 is using `@tailwindcss/vite` without any plugins configuration.
- **Action:** Safely prune `gsap` and `tailwindcss-animate` from `package.json` and run `npm install` to update `package-lock.json`.

---

## 5. Branch Audit

- `origin/main` (commit `ef86de6`): Active production branch.
- `origin/final-design` (last commit Sep 6): Stagnant historical branch. Not configured as Vercel production branch.
- `origin/main-copy` (last commit Sep 5): Stagnant historical branch. Pre-dates the image explosion.

---

## 6. Verification & Safety Protocol

1. Apply changes locally without committing.
2. Run `npm run build` to verify clean build, sitemap generation, and SEO prerendering.
3. Measure new `dist/` and `public/` directories.
4. Perform smoke tests with Playwright across all key routes.
5. Verify zero broken images and successful 3D model loading at `/models/current-3d-model.glb`.
