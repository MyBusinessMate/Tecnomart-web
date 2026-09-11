# Project Contract

```yaml
id: project-contract
name: TecnoMart Retail & Electronics Platform
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Purpose
Specifies the core project facts, execution environment, technology dependencies, package versions, and platform boundaries for TecnoMart web applications.

## Project Facts
- **Application Name**: TecnoMart (Hyderabad's Premier Tech Hub)
- **Framework**: React 19.2.8 (`package.json:22`)
- **Build System**: Vite 6.4.3 (`package.json:40`)
- **Router**: React Router DOM 7.18.3 (`package.json:24`)
- **CSS Framework**: Tailwind CSS 4.3.3 via `@tailwindcss/vite` (`package.json:30,38`)
- **Motion Engine**: Framer Motion 13.1.0 (`package.json:17`) & GSAP 3.15.0 (`package.json:18`)
- **Smooth Scrolling**: Lenis 1.3.26 (`package.json:19`)
- **Iconography**: Lucide React 1.31.0 (`package.json:20`)
- **QR Generation**: QRCode 1.5.4 (`package.json:21`)
- **Confetti**: Canvas Confetti 1.9.4 (`package.json:14`)

## Invariants
1. Admin routes must live strictly beneath the `/myadmin` prefix to avoid clashing with customer storefront routes (`/mobiles`, `/laptops`, `/gaming`, `/accessories`, etc.).
2. The customer storefront and admin dashboard share an in-memory/localStorage reactive state so that updates in admin instantly reflect across the storefront.
3. No foreign dependencies or heavy external UI frameworks are required; vanilla CSS & Tailwind 4 utility tokens are utilized.

## Evidence
- `package.json`
- `vite.config.ts`
- `src/App.tsx`
