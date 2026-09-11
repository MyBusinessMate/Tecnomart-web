# Module Contract

```yaml
id: module-contract
name: Admin Modules and Capabilities Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Module Registry

### 1. Module `dashboard`
- **Route**: `/myadmin`
- **Widgets**: Metric bento cards (Total Live Products, Active Repair Jobs, Daily Spin Redemptions, Total Inventory Valuation), recent activity stream, quick actions.

### 2. Module `products`
- **Route**: `/myadmin/products`
- **Capabilities**: Complete product catalog list, live search, category filter, price range filter, stock status toggles, add product modal/drawer, edit product form, delete product confirmation.

### 3. Module `categories`
- **Route**: `/myadmin/categories`
- **Capabilities**: Add, edit, rename, remove categories and product types. View product count per category.

### 4. Module `repairs`
- **Route**: `/myadmin/repairs`
- **Capabilities**: Manage repair catalog, screen replacement pricing, battery service timings, motherboard repair turnaround, warranty durations.

### 5. Module `configurator`
- **Route**: `/myadmin/configurator`
- **Capabilities**: Manage component list for custom PC builder (CPUs, GPUs, RAM kits, SSDs, PSUs, Cases), live price adjustments, in-stock switches.

### 6. Module `spin`
- **Route**: `/myadmin/spin`
- **Capabilities**: Configure the 8 wheel slices, prize denominations (₹500, ₹1000, ₹2000, Free Screen Guard), probability weights, active coupon codes, and live spin audit history log.

### 7. Module `blogs`
- **Route**: `/myadmin/blogs`
- **Capabilities**: Tech guides & blog article creator/editor, author attribution, publish/draft toggle, rich content editing.

### 8. Module `store-info`
- **Route**: `/myadmin/store-info`
- **Capabilities**: Update store physical address, Tolichowki / Jubilee Hills coordinates, Google Maps link, phone numbers, WhatsApp dispatch numbers, working hours.

### 9. Module `copy-content`
- **Route**: `/myadmin/copy-content`
- **Capabilities**: Edit per-product landing headlines and subheads, Terms of Service text, Privacy Policy text, and Warranty policies.

### 10. Module `users`
- **Route**: `/myadmin/users`
- **Capabilities**: Staff user directory, add staff member, change RBAC role, reset password, remove staff with delete safety confirmation.
