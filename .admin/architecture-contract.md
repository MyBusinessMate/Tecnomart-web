# Architecture Contract

```yaml
id: architecture-contract
name: TecnoMart System Architecture
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Architecture Topology
TecnoMart is a high-performance single-page web application featuring two distinct user experiences:
1. **Public Customer Storefront**: Responsive shopping portal with mobile app drawer dock, product catalogs, interactive PC customizer, real-time filters, and instant WhatsApp buy flows.
2. **Super Administrator Workspace (`/myadmin`)**: Fully controlled, minimal utilitarian admin dashboard providing full CRUD over all store attributes with role-based access control, delete guards, and live storefront reactivity.

## Directory Organization
- `src/app/*`: Storefront route pages and views.
- `src/components/redesign/*`: Storefront UI components (Header, Footer, ProductFilters, BottomDock, TimedSpinPopup, etc.).
- `src/components/admin/*`: Admin panel shell, sidebar, table components, modals, guards.
- `src/pages/admin/*`: Dedicated admin view screens (Products, Pricing, Categories, Blogs, Repairs, PC Parts, Spin Settings, Store Info, Legal, Users).
- `src/lib/admin/adminStore.js`: Centralized reactive repository pattern backed by `localStorage` with fallback to default seed fixtures.
- `src/lib/admin/adminAuth.js`: RBAC session management, simulated password verification, and rate limiting.

## Invariants
- Admin components never leak internal management data to the unauthenticated public storefront.
- Every state mutation in `adminStore` notifies all active subscribers and updates persistent browser storage.
