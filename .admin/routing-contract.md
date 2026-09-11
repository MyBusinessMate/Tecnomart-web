# Routing Contract

```yaml
id: routing-contract
name: Admin & Application Routing Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Route Map

### Public Storefront Routes
- `/`: Landing homepage
- `/mobiles`, `/mobiles/:slug`: Mobile phones catalog & detail
- `/laptops`, `/laptops/:slug`: Laptops catalog & detail
- `/accessories`, `/accessories/:slug`: Accessories catalog & detail
- `/gaming`, `/gaming/:slug`: Gaming rigs catalog & detail
- `/refurbished`, `/refurbished/:slug`: Certified refurbished catalog & detail
- `/repairs`: Doorstep & in-store repair services
- `/pc-builds`, `/build-your-setup`: Custom PC configurator
- `/deals`: Active deals & flash sales
- `/spin`: Spin & win rewards machine
- `/supertechie`: Spin reward super admin inspection mode
- `/about`, `/contact`, `/terms`, `/privacy`: Information & policy pages
- `/cart`: Shopping cart checkout flow

### Admin Workspace Routes (`/myadmin/*`)
- `/myadmin/login`: Staff authentication screen (public to unauthenticated staff, rate-limited)
- `/myadmin`: Admin dashboard overview & analytics
- `/myadmin/products`: Product catalog & pricing CRUD
- `/myadmin/categories`: Categories & product types management
- `/myadmin/repairs`: Repair services, turnaround hours, pricing
- `/myadmin/configurator`: PC parts & component pricing CRUD
- `/myadmin/spin`: Spin & win rewards engine (prizes, weights, codes, spin logs)
- `/myadmin/blogs`: Content management & tech guides
- `/myadmin/store-info`: Store contact numbers, address, WhatsApp, timings
- `/myadmin/copy-content`: Per-product landing copy & legal policies
- `/myadmin/users`: Staff user management & permissions

## Route Protection Invariant
Any attempt to access `/myadmin/*` (other than `/myadmin/login`) without an active validated session will automatically redirect the client to `/myadmin/login` preserving the intended path.
