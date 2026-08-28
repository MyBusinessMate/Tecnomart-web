# Data Model

## Product catalog object

```json
{
  "id": "gpu-nvidia-rtx-5070",
  "category": "gpu",
  "brand": "NVIDIA",
  "name": "GeForce RTX 5070",
  "customerLabel": "High-performance gaming graphics",
  "shortDescription": "Great for high-quality 1440p gaming and demanding creative work.",
  "image": "/images/products/rtx-5070.webp",
  "priceINR": 0,
  "availability": "in_stock",
  "performanceTier": "balanced",
  "workloadTags": ["gaming", "creative"],
  "compatibility": {
    "interface": "PCIe",
    "recommendedSystemPowerW": 650,
    "boardPowerW": 250,
    "lengthMm": 300,
    "slotWidth": 2.5
  },
  "meta": {
    "source": "manufacturer",
    "lastVerified": "YYYY-MM-DD"
  }
}
```

## Build state

```json
{
  "version": 1,
  "buildId": "generated-uuid-or-short-id",
  "buildType": "gaming-pc",
  "priority": "balanced",
  "goal": "1440p-gaming",
  "mode": "recommended",
  "selections": {
    "cpu": "",
    "gpu": "",
    "motherboard": "",
    "memory": "",
    "storage": "",
    "psu": "",
    "cooling": "",
    "cabinet": "",
    "monitor": "",
    "keyboardMouse": "",
    "headset": ""
  },
  "stepIndex": 0,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## localStorage key

`pcMart.customBuild.v1`

Do not store sensitive customer information in this key before the request form is submitted.

## Submitted lead object

```json
{
  "source": "custom-pc-configurator",
  "buildId": "",
  "submittedAt": "ISO-8601",
  "customer": {
    "fullName": "",
    "phone": "",
    "email": "",
    "city": "",
    "preferredContact": "whatsapp",
    "notes": ""
  },
  "configuration": {
    "buildType": "gaming-pc",
    "priority": "balanced",
    "goal": "1440p-gaming",
    "mode": "recommended",
    "items": []
  },
  "pricing": {
    "estimatedTotalINR": 0,
    "currency": "INR"
  },
  "tracking": {
    "landingPage": "",
    "campaign": "",
    "referrer": ""
  }
}
```

## Configuration item

```json
{
  "category": "cpu",
  "productId": "",
  "name": "",
  "brand": "",
  "quantity": 1,
  "unitPriceINR": 0
}
```

## Privacy

- Do not put phone/email inside analytics events by default.
- Do not persist customer contact details in localStorage unless the business explicitly requires it and privacy policy supports it.
- The database should be the system of record for submitted leads.
