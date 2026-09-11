# Data Contract

```yaml
id: data-contract
name: TecnoMart Admin & Storefront Schema Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Entity Schemas

### 1. Product Entity
```typescript
interface Product {
  id: string; // unique identifier (e.g. 'm1', 'l2', 'prod_xyz')
  slug: string; // URL-friendly slug
  name: string;
  brand: string;
  type: 'mobiles' | 'laptops' | 'gaming' | 'accessories' | 'refurbished';
  category?: string;
  ram?: string;
  storage?: string;
  tagline: string;
  price: string; // formatted INR string (e.g. '₹1,44,900')
  originalPrice: string;
  rawPrice: number; // integer numeric value for sorting and filters
  discountPercent: string;
  emiText: string;
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviewCount: number;
  stockStatus: string;
  deliveryTime: string;
  warrantyPeriod: string;
  images: string[];
  colors?: Array<{ name: string; hex: string }>;
  storages?: Array<{ size: string; price: string; rawPrice: number }>;
  configs?: Array<{ name: string; price: string; rawPrice: number }>;
  specs: Record<string, string>;
  keyHighlights: string[];
  inTheBox: string[];
  pageCopy?: {
    headline: string;
    subheadline: string;
    customNote: string;
  };
}
```

### 2. Category Entity
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  itemCount?: number;
}
```

### 3. Repair Service Entity
```typescript
interface RepairService {
  id: string;
  serviceName: string;
  deviceType: 'iPhone' | 'Samsung' | 'MacBook' | 'Laptop' | 'iPad' | 'Console';
  turnaroundTime: string; // e.g. "30 Minutes", "2 Hours", "Same Day"
  estimatedPrice: string;
  rawPrice: number;
  warrantyMonths: number;
  status: 'Active' | 'High Demand' | 'Paused';
}
```

### 4. PC Component Entity
```typescript
interface PcComponent {
  id: string;
  category: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'cabinet';
  name: string;
  brand: string;
  price: number;
  specs: string;
  inStock: boolean;
}
```

### 5. Spin Prize Entity
```typescript
interface SpinPrize {
  id: string;
  sliceIndex: number;
  label: string;
  type: 'discount' | 'accessory' | 'voucher' | 'service';
  value: number; // e.g. 500, 1000, 2000
  couponCode: string;
  weight: number; // probability weight (higher = more likely)
  active: boolean;
}
```

### 6. Blog Article Entity
```typescript
interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  published: boolean;
}
```

### 7. Store Info Entity
```typescript
interface StoreInfo {
  storeName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  supportEmail: string;
  workingHoursWeekday: string;
  workingHoursWeekend: string;
  googleMapsUrl: string;
}
```

### 8. Legal Policies Entity
```typescript
interface LegalPolicies {
  termsOfService: string;
  privacyPolicy: string;
  returnAndWarranty: string;
  updatedAt: string;
}
```
