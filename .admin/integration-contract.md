# Integration Contract

```yaml
id: integration-contract
name: External & Storefront Integration Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Integrations

### 1. Storefront Reactivity Integration
- **Mechanism**: The `adminStore` exposes event listeners (`subscribe`) and custom React hooks (`useAdminStore`).
- **Effect**: Any mutation performed inside `/myadmin` immediately triggers a re-render in mounted storefront catalog views (`/mobiles`, `/laptops`, `/gaming`, `/accessories`, `/refurbished`, etc.) without page reload.

### 2. WhatsApp Direct Connect
- **Provider**: WhatsApp Click-to-Chat API (`https://wa.me/919010667726`).
- **Data Flow**: Pre-filled with updated store number, product name, and current pricing configured via `/myadmin/store-info`.

### 3. Google Maps Integration
- **Provider**: Google Maps Embed & Search URL.
- **Location Target**: TecnoMart, Road No. 36 Jubilee Hills & Tolichowki, Hyderabad.
- **Data Flow**: Dynamically bound to `storeInfo.googleMapsUrl`.

### 4. Reward Machine QR Code Verification
- **Provider**: QRCode library (`qrcode`).
- **Data Flow**: Encodes redemption voucher containing prize ID, expiration timestamp, and customer signature hash for in-store verification by cashier or admin.
