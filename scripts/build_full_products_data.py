import json

# Script to build src/data/products.js with exactly 25 Mobiles, 25 Laptops, 25 Accessories
# and existing Gaming & Refurbished data, plus helper functions and ALL_PRODUCTS.

mobiles = [
    {
        "id": "m1", "slug": "iphone-16-pro-max", "name": "Apple iPhone 16 Pro Max", "brand": "Apple",
        "ram": "8GB", "storage": "256GB", "price": "₹1,44,900", "originalPrice": "₹1,49,900", "rawPrice": 144900,
        "discountPercent": "3% OFF", "emiText": "No-cost EMI from ₹12,075/month", "badge": "TOP PICK",
        "badgeColor": "bg-amber-500 text-neutral-950", "rating": 4.9, "reviewCount": 384,
        "tags": ["new", "best"], "colors": [{"name": "Desert Titanium", "hex": "#C7B39B"}, {"name": "Natural Titanium", "hex": "#9E978E"}, {"name": "White Titanium", "hex": "#F2F1ED"}, {"name": "Black Titanium", "hex": "#343335"}],
        "images": ["/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp", "/webp/landing/apple-iphone-16-pro-desert-amber-titanium.webp"],
        "tagline": "Grade 5 Titanium body. 4K 120fps video recording. All-day heavy battery life.",
        "specs": {"Display": "6.9-inch Super Retina XDR OLED, 120Hz ProMotion", "Processor": "Apple A18 Pro chip with 6-core GPU", "RAM": "8GB Unified Memory", "Storage": "256GB", "Main Cameras": "48MP Main + 48MP Ultra-Wide + 12MP 5x Zoom", "Battery & Port": "4,685 mAh, USB-C 3.0", "OS": "iOS 18 with Apple Intelligence"}
    },
    {
        "id": "m2", "slug": "samsung-galaxy-s24-ultra", "name": "Samsung Galaxy S24 Ultra", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹1,24,999", "originalPrice": "₹1,34,999", "rawPrice": 124999,
        "discountPercent": "7% OFF", "emiText": "No-cost EMI starting at ₹10,416/month", "badge": "GALAXY AI",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.8, "reviewCount": 295,
        "tags": ["new", "best"], "colors": [{"name": "Titanium Gray", "hex": "#767571"}, {"name": "Titanium Black", "hex": "#2B2B2B"}, {"name": "Titanium Violet", "hex": "#47435B"}, {"name": "Titanium Yellow", "hex": "#EDE5C8"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp", "/webp/mobiles/img-2.webp"],
        "tagline": "Built-in S-Pen. 200MP camera with 100x zoom. Anti-reflective flat screen.",
        "specs": {"Display": "6.8-inch Dynamic AMOLED 2X, 120Hz Flat Display", "Processor": "Snapdragon 8 Gen 3 for Galaxy", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "200MP Main + 50MP 5x Periscope + 12MP Ultra-Wide", "Battery & Port": "5,000 mAh, 45W Fast Charging", "OS": "Android 14 (One UI 6.1 with Galaxy AI)"}
    },
    {
        "id": "m3", "slug": "oneplus-12", "name": "OnePlus 12 5G", "brand": "OnePlus",
        "ram": "12GB", "storage": "256GB", "price": "₹59,999", "originalPrice": "₹69,999", "rawPrice": 59999,
        "discountPercent": "14% OFF", "emiText": "No-cost EMI from ₹4,999/month", "badge": "BEST VALUE",
        "badgeColor": "bg-emerald-500 text-white", "rating": 4.8, "reviewCount": 218,
        "tags": ["new", "best"], "colors": [{"name": "Flowy Emerald", "hex": "#295A4B"}, {"name": "Silky Black", "hex": "#1C1C1E"}],
        "images": ["/webp/mobiles/oneplus-12-5g-flowy-emerald.webp", "/webp/mobiles/img-3.webp"],
        "tagline": "100W fast charger in the box. Hasselblad cameras. Smooth 120Hz display.",
        "specs": {"Display": "6.82-inch 2K 120Hz LTPO ProXDR AMOLED", "Processor": "Qualcomm Snapdragon 8 Gen 3", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra-Wide", "Battery & Port": "5,400 mAh, 100W SUPERVOOC", "OS": "OxygenOS 14 (Android 14)"}
    },
    {
        "id": "m4", "slug": "google-pixel-9-pro", "name": "Google Pixel 9 Pro", "brand": "Google",
        "ram": "16GB", "storage": "128GB", "price": "₹99,999", "originalPrice": "₹1,09,999", "rawPrice": 99999,
        "discountPercent": "9% OFF", "emiText": "No-cost EMI from ₹8,333/month", "badge": "AI POWERED",
        "badgeColor": "bg-purple-600 text-white", "rating": 4.7, "reviewCount": 164,
        "tags": ["new", "popular"], "colors": [{"name": "Obsidian", "hex": "#222326"}, {"name": "Porcelain", "hex": "#E7E4DF"}, {"name": "Hazel", "hex": "#7E837D"}],
        "images": ["/webp/mobiles/google-pixel-9-pro-obsidian.webp", "/webp/mobiles/img-4.webp"],
        "tagline": "Clean stock Android. 5x telephoto camera. Super bright Actua display.",
        "specs": {"Display": "6.3-inch Super Actua LTPO OLED 120Hz", "Processor": "Google Tensor G4 with Titan M2", "RAM": "16GB", "Storage": "128GB", "Main Cameras": "50MP Main + 48MP 5x Telephoto + 48MP Ultra-Wide", "Battery & Port": "4,700 mAh, Fast Charging", "OS": "Android 15 with Gemini AI"}
    },
    {
        "id": "m5", "slug": "apple-iphone-15", "name": "Apple iPhone 15", "brand": "Apple",
        "ram": "6GB", "storage": "128GB", "price": "₹65,999", "originalPrice": "₹69,900", "rawPrice": 65999,
        "discountPercent": "6% OFF", "emiText": "No-cost EMI from ₹5,500/month", "badge": "HOT SELLER",
        "badgeColor": "bg-amber-500 text-neutral-950", "rating": 4.8, "reviewCount": 420,
        "tags": ["popular"], "colors": [{"name": "Black", "hex": "#1C1C1E"}, {"name": "Blue", "hex": "#D2E5EB"}, {"name": "Green", "hex": "#D8E6D9"}, {"name": "Pink", "hex": "#FBE2DD"}],
        "images": ["/webp/mobiles/apple-iphone-15-pink.webp", "/webp/mobiles/img-5.webp"],
        "tagline": "Dynamic Island. 48MP main camera. USB-C port in sleek color-infused glass.",
        "specs": {"Display": "6.1-inch Super Retina XDR OLED Display", "Processor": "Apple A16 Bionic chip", "RAM": "6GB", "Storage": "128GB", "Main Cameras": "48MP Main with 2x Telephoto + 12MP Ultra-Wide", "Battery & Port": "3,349 mAh, USB-C", "OS": "iOS 17 upgradable to iOS 18"}
    },
    {
        "id": "m6", "slug": "samsung-galaxy-z-fold-6", "name": "Samsung Galaxy Z Fold 6", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹1,64,999", "originalPrice": "₹1,74,999", "rawPrice": 164999,
        "discountPercent": "6% OFF", "emiText": "No-cost EMI from ₹13,750/month", "badge": "FOLDABLE FLAGSHIP",
        "badgeColor": "bg-indigo-600 text-white", "rating": 4.7, "reviewCount": 98,
        "tags": ["new", "best"], "colors": [{"name": "Navy", "hex": "#1F2937"}, {"name": "Silver Shadow", "hex": "#D1D5DB"}, {"name": "Pink", "hex": "#FBCFE8"}],
        "images": ["/webp/mobiles/samsung-galaxy-z-fold-6-navy.webp", "/webp/mobiles/img-6.webp"],
        "tagline": "Dual screen foldable. Galaxy AI note assistant. Durable Armor Aluminum hinge.",
        "specs": {"Display": "7.6-inch Dynamic AMOLED 2X 120Hz Main + 6.3-inch Cover", "Processor": "Snapdragon 8 Gen 3 for Galaxy", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "50MP Main + 10MP 3x Telephoto + 12MP Ultra-Wide", "Battery & Port": "4,400 mAh, 25W Fast Charging", "OS": "Android 14 with One UI 6.1.1"}
    },
    {
        "id": "m7", "slug": "apple-iphone-16-pro", "name": "Apple iPhone 16 Pro", "brand": "Apple",
        "ram": "8GB", "storage": "128GB", "price": "₹1,19,900", "originalPrice": "₹1,24,900", "rawPrice": 119900,
        "discountPercent": "4% OFF", "emiText": "No-cost EMI from ₹9,991/month", "badge": "PRO CAMERA",
        "badgeColor": "bg-amber-500 text-neutral-950", "rating": 4.9, "reviewCount": 182,
        "tags": ["new", "best"], "colors": [{"name": "Desert Titanium", "hex": "#C7B39B"}, {"name": "Black Titanium", "hex": "#343335"}, {"name": "Natural Titanium", "hex": "#9E978E"}],
        "images": ["/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp"],
        "tagline": "6.3-inch ProMotion display. A18 Pro silicon. 5x optical zoom camera.",
        "specs": {"Display": "6.3-inch Super Retina XDR OLED, 120Hz ProMotion", "Processor": "Apple A18 Pro chip", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "48MP Fusion + 48MP Ultra-Wide + 12MP 5x Zoom", "Battery & Port": "3,582 mAh, USB-C 3.0", "OS": "iOS 18 with Apple Intelligence"}
    },
    {
        "id": "m8", "slug": "apple-iphone-16", "name": "Apple iPhone 16", "brand": "Apple",
        "ram": "8GB", "storage": "128GB", "price": "₹79,900", "originalPrice": "₹82,900", "rawPrice": 79900,
        "discountPercent": "4% OFF", "emiText": "No-cost EMI from ₹6,658/month", "badge": "NEW RELEASE",
        "badgeColor": "bg-emerald-500 text-white", "rating": 4.8, "reviewCount": 210,
        "tags": ["new", "popular"], "colors": [{"name": "Ultramarine", "hex": "#3E54A3"}, {"name": "Teal", "hex": "#A2D8D5"}, {"name": "Pink", "hex": "#ECA1B5"}, {"name": "White", "hex": "#F2F2F2"}, {"name": "Black", "hex": "#232323"}],
        "images": ["/webp/mobiles/apple-iphone-15-pink.webp"],
        "tagline": "Camera Control button. A18 chip. Spatial Audio and 48MP Fusion camera.",
        "specs": {"Display": "6.1-inch Super Retina XDR OLED", "Processor": "Apple A18 chip (3nm)", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "48MP Fusion + 12MP Ultra-Wide", "Battery & Port": "3,561 mAh, USB-C", "OS": "iOS 18 with Apple Intelligence"}
    },
    {
        "id": "m9", "slug": "apple-iphone-16-plus", "name": "Apple iPhone 16 Plus", "brand": "Apple",
        "ram": "8GB", "storage": "128GB", "price": "₹89,900", "originalPrice": "₹92,900", "rawPrice": 89900,
        "discountPercent": "3% OFF", "emiText": "No-cost EMI from ₹7,491/month", "badge": "BATTERY KING",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.8, "reviewCount": 115,
        "tags": ["new"], "colors": [{"name": "Ultramarine", "hex": "#3E54A3"}, {"name": "Teal", "hex": "#A2D8D5"}, {"name": "Black", "hex": "#232323"}],
        "images": ["/webp/mobiles/apple-iphone-15-pink.webp"],
        "tagline": "Huge 6.7-inch screen. Legendary 27-hour battery life. A18 power.",
        "specs": {"Display": "6.7-inch Super Retina XDR OLED", "Processor": "Apple A18 chip", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "48MP Fusion + 12MP Ultra-Wide", "Battery & Port": "4,674 mAh, USB-C", "OS": "iOS 18"}
    },
    {
        "id": "m10", "slug": "apple-iphone-15-pro-max", "name": "Apple iPhone 15 Pro Max", "brand": "Apple",
        "ram": "8GB", "storage": "256GB", "price": "₹1,29,990", "originalPrice": "₹1,49,900", "rawPrice": 129990,
        "discountPercent": "13% OFF", "emiText": "No-cost EMI from ₹10,832/month", "badge": "PRO SELLER",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 510,
        "tags": ["best", "popular"], "colors": [{"name": "Natural Titanium", "hex": "#9E978E"}, {"name": "Blue Titanium", "hex": "#2E3B4E"}, {"name": "Black Titanium", "hex": "#343335"}],
        "images": ["/webp/mobiles/apple-iphone-16-pro-max-desert-titanium.webp"],
        "tagline": "A17 Pro 3nm gaming chip. Titanium frame. 5x optical telephoto lens.",
        "specs": {"Display": "6.7-inch Super Retina XDR OLED 120Hz", "Processor": "Apple A17 Pro (3nm)", "RAM": "8GB", "Storage": "256GB", "Main Cameras": "48MP Main + 12MP 5x Zoom + 12MP Ultra-Wide", "Battery & Port": "4,441 mAh, USB-C 3.0", "OS": "iOS 17 / iOS 18"}
    },
    {
        "id": "m11", "slug": "apple-iphone-14", "name": "Apple iPhone 14", "brand": "Apple",
        "ram": "6GB", "storage": "128GB", "price": "₹54,990", "originalPrice": "₹69,900", "rawPrice": 54990,
        "discountPercent": "21% OFF", "emiText": "No-cost EMI from ₹4,582/month", "badge": "BUDGET APPLE",
        "badgeColor": "bg-neutral-800 text-white", "rating": 4.7, "reviewCount": 380,
        "tags": ["popular"], "colors": [{"name": "Midnight", "hex": "#1E2024"}, {"name": "Starlight", "hex": "#F8F7F3"}, {"name": "Blue", "hex": "#9EBBD0"}],
        "images": ["/webp/mobiles/apple-iphone-15-pink.webp"],
        "tagline": "Super Retina XDR display. A15 Bionic speed. Photonic engine cameras.",
        "specs": {"Display": "6.1-inch OLED Super Retina XDR", "Processor": "Apple A15 Bionic", "RAM": "6GB", "Storage": "128GB", "Main Cameras": "12MP Main + 12MP Ultra-Wide", "Battery & Port": "3,279 mAh, Lightning", "OS": "iOS 17 / iOS 18"}
    },
    {
        "id": "m12", "slug": "apple-iphone-13", "name": "Apple iPhone 13", "brand": "Apple",
        "ram": "4GB", "storage": "128GB", "price": "₹47,990", "originalPrice": "₹59,900", "rawPrice": 47990,
        "discountPercent": "20% OFF", "emiText": "EMI from ₹3,999/month", "badge": "TOP BUDGET",
        "badgeColor": "bg-emerald-600 text-white", "rating": 4.7, "reviewCount": 640,
        "tags": ["popular"], "colors": [{"name": "Midnight", "hex": "#1E2024"}, {"name": "Starlight", "hex": "#F8F7F3"}, {"name": "Pink", "hex": "#F9DFDB"}],
        "images": ["/webp/mobiles/apple-iphone-15-pink.webp"],
        "tagline": "Best value entry into Apple ecosystem. Reliable battery & smooth iOS.",
        "specs": {"Display": "6.1-inch Super Retina XDR OLED", "Processor": "Apple A15 Bionic", "RAM": "4GB", "Storage": "128GB", "Main Cameras": "12MP Dual Cameras", "Battery & Port": "3,227 mAh", "OS": "iOS 17 / iOS 18"}
    },
    {
        "id": "m13", "slug": "refurbished-iphone-14-pro-max", "name": "Certified Refurbished iPhone 14 Pro Max", "brand": "Apple",
        "ram": "6GB", "storage": "128GB", "price": "₹74,990", "originalPrice": "₹1,39,900", "rawPrice": 74990,
        "discountPercent": "46% OFF", "emiText": "EMI from ₹6,249/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 142,
        "tags": ["refurbished"], "colors": [{"name": "Deep Purple", "hex": "#4D4352"}, {"name": "Space Black", "hex": "#262626"}],
        "images": ["/webp/refurbished/refurbished-apple-ipad-pro-11-m2.webp"],
        "tagline": "Grade A+ like new. 96% battery health. 1-Year direct TecnoMart warranty.",
        "specs": {"Display": "6.7-inch OLED 120Hz Dynamic Island", "Processor": "A16 Bionic", "RAM": "6GB", "Storage": "128GB", "Main Cameras": "48MP + 12MP + 12MP", "Battery & Port": "4,323 mAh, 95%+ Health", "Warranty": "1-Year TecnoMart Store Warranty"}
    },
    {
        "id": "m14", "slug": "refurbished-iphone-13-pro", "name": "Certified Refurbished iPhone 13 Pro", "brand": "Apple",
        "ram": "6GB", "storage": "128GB", "price": "₹52,990", "originalPrice": "₹1,19,900", "rawPrice": 52990,
        "discountPercent": "56% OFF", "emiText": "EMI from ₹4,415/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 94,
        "tags": ["refurbished"], "colors": [{"name": "Sierra Blue", "hex": "#9FB5C4"}, {"name": "Graphite", "hex": "#383735"}],
        "images": ["/webp/refurbished/refurbished-apple-ipad-pro-11-m2.webp"],
        "tagline": "120Hz ProMotion screen. Triple cameras with macro mode. 6 months warranty.",
        "specs": {"Display": "6.1-inch Super Retina XDR 120Hz", "Processor": "A15 Bionic", "RAM": "6GB", "Storage": "128GB", "Main Cameras": "12MP Triple Cameras", "Battery & Port": "92%+ Tested Battery", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "m15", "slug": "samsung-galaxy-s24-plus", "name": "Samsung Galaxy S24+ 5G", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹84,999", "originalPrice": "₹99,999", "rawPrice": 84999,
        "discountPercent": "15% OFF", "emiText": "No-cost EMI from ₹7,083/month", "badge": "QHD+ DISPLAY",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.8, "reviewCount": 178,
        "tags": ["new"], "colors": [{"name": "Cobalt Violet", "hex": "#4C4661"}, {"name": "Onyx Black", "hex": "#2B2B2B"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp"],
        "tagline": "Quad HD+ 120Hz flat panel. 4,900 mAh big battery. Galaxy AI onboard.",
        "specs": {"Display": "6.7-inch QHD+ Dynamic AMOLED 2X 120Hz", "Processor": "Exynos 2400 Deca-Core", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "50MP Main + 10MP 3x + 12MP Ultra-Wide", "Battery & Port": "4,900 mAh, 45W Charging", "OS": "One UI 6.1 (Android 14)"}
    },
    {
        "id": "m16", "slug": "samsung-galaxy-s24", "name": "Samsung Galaxy S24", "brand": "Samsung",
        "ram": "8GB", "storage": "128GB", "price": "₹67,999", "originalPrice": "₹79,999", "rawPrice": 67999,
        "discountPercent": "15% OFF", "emiText": "No-cost EMI from ₹5,666/month", "badge": "COMPACT FLAGSHIP",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.7, "reviewCount": 215,
        "tags": ["popular"], "colors": [{"name": "Amber Yellow", "hex": "#F4E0A5"}, {"name": "Marble Gray", "hex": "#D1D3D4"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp"],
        "tagline": "One-hand compact flagship. 2,600 nits brightness. 7 years Android updates.",
        "specs": {"Display": "6.2-inch FHD+ Dynamic AMOLED 2X 120Hz", "Processor": "Exynos 2400 Deca-Core", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "50MP + 10MP + 12MP", "Battery & Port": "4,000 mAh", "OS": "Android 14 (One UI 6.1)"}
    },
    {
        "id": "m17", "slug": "samsung-galaxy-z-flip-6", "name": "Samsung Galaxy Z Flip 6", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹99,999", "originalPrice": "₹1,09,999", "rawPrice": 99999,
        "discountPercent": "9% OFF", "emiText": "No-cost EMI from ₹8,333/month", "badge": "STYLE ICON",
        "badgeColor": "bg-purple-600 text-white", "rating": 4.8, "reviewCount": 110,
        "tags": ["new", "popular"], "colors": [{"name": "Mint", "hex": "#C8E6C9"}, {"name": "Blue", "hex": "#90CAF9"}, {"name": "Silver Shadow", "hex": "#B0BEC5"}],
        "images": ["/webp/mobiles/samsung-galaxy-z-fold-6-navy.webp"],
        "tagline": "Pocket compact folding phone. 50MP upgraded camera. Vapor cooling chamber.",
        "specs": {"Display": "6.7-inch FHD+ Dynamic AMOLED 2X 120Hz + 3.4-inch Flex Window", "Processor": "Snapdragon 8 Gen 3 for Galaxy", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "50MP + 12MP Ultra-Wide", "Battery & Port": "4,000 mAh", "OS": "Android 14 with Galaxy AI"}
    },
    {
        "id": "m18", "slug": "samsung-galaxy-s23-ultra", "name": "Samsung Galaxy S23 Ultra", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹89,999", "originalPrice": "₹1,24,999", "rawPrice": 89999,
        "discountPercent": "28% OFF", "emiText": "No-cost EMI from ₹7,499/month", "badge": "100X SPACE ZOOM",
        "badgeColor": "bg-emerald-600 text-white", "rating": 4.9, "reviewCount": 490,
        "tags": ["best", "popular"], "colors": [{"name": "Green", "hex": "#3B4A3F"}, {"name": "Phantom Black", "hex": "#1E1E1E"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp"],
        "tagline": "200MP camera sensor. S-Pen included. Snapdragon 8 Gen 2 gaming chip.",
        "specs": {"Display": "6.8-inch Edge QHD+ AMOLED 120Hz", "Processor": "Snapdragon 8 Gen 2 for Galaxy", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "200MP + 12MP + 10MP (10x) + 10MP (3x)", "Battery & Port": "5,000 mAh, 45W Fast Charge", "OS": "Android 14 (One UI 6.1)"}
    },
    {
        "id": "m19", "slug": "refurbished-galaxy-s23-ultra", "name": "Certified Refurbished Galaxy S23 Ultra", "brand": "Samsung",
        "ram": "12GB", "storage": "256GB", "price": "₹68,999", "originalPrice": "₹1,24,999", "rawPrice": 68999,
        "discountPercent": "45% OFF", "emiText": "EMI from ₹5,750/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 85,
        "tags": ["refurbished"], "colors": [{"name": "Green", "hex": "#3B4A3F"}, {"name": "Cream", "hex": "#EFE9DE"}],
        "images": ["/webp/refurbished/refurbished-samsung-galaxy-s23-ultra.webp"],
        "tagline": "Like new condition with S-Pen. Tested 92%+ battery health. 6 months warranty.",
        "specs": {"Display": "6.8-inch AMOLED 120Hz QHD+", "Processor": "Snapdragon 8 Gen 2", "RAM": "12GB", "Storage": "256GB", "Main Cameras": "200MP Quad Cameras", "Battery & Port": "5,000 mAh", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "m20", "slug": "samsung-galaxy-s23-fe", "name": "Samsung Galaxy S23 FE 5G", "brand": "Samsung",
        "ram": "8GB", "storage": "128GB", "price": "₹37,999", "originalPrice": "₹59,999", "rawPrice": 37999,
        "discountPercent": "36% OFF", "emiText": "EMI from ₹3,166/month", "badge": "MIDRANGE CHAMPION",
        "badgeColor": "bg-indigo-600 text-white", "rating": 4.6, "reviewCount": 160,
        "tags": ["popular"], "colors": [{"name": "Mint", "hex": "#C5E1A5"}, {"name": "Graphite", "hex": "#37474F"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp"],
        "tagline": "Flagship nightography cameras. IP68 water resistance. 120Hz AMOLED.",
        "specs": {"Display": "6.4-inch Dynamic AMOLED 2X 120Hz", "Processor": "Exynos 2200 Octa-Core", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "50MP Main + 12MP Ultra-Wide + 8MP 3x Telephoto", "Battery & Port": "4,500 mAh", "OS": "Android 14 with One UI"}
    },
    {
        "id": "m21", "slug": "samsung-galaxy-a55", "name": "Samsung Galaxy A55 5G", "brand": "Samsung",
        "ram": "8GB", "storage": "128GB", "price": "₹34,999", "originalPrice": "₹39,999", "rawPrice": 34999,
        "discountPercent": "12% OFF", "emiText": "EMI from ₹2,916/month", "badge": "METAL FRAME",
        "badgeColor": "bg-teal-600 text-white", "rating": 4.6, "reviewCount": 130,
        "tags": ["popular"], "colors": [{"name": "Awesome Iceblue", "hex": "#CFE8FF"}, {"name": "Awesome Navy", "hex": "#27384E"}],
        "images": ["/webp/mobiles/samsung-galaxy-s24-ultra-titanium.webp"],
        "tagline": "Premium metal frame. Knox Vault hardware security. 5,000 mAh battery.",
        "specs": {"Display": "6.6-inch Super AMOLED 120Hz Vision Booster", "Processor": "Exynos 1480 (4nm)", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "50MP Main + 12MP Ultra-Wide + 5MP Macro", "Battery & Port": "5,000 mAh", "OS": "Android 14"}
    },
    {
        "id": "m22", "slug": "oneplus-12r", "name": "OnePlus 12R 5G", "brand": "OnePlus",
        "ram": "16GB", "storage": "256GB", "price": "₹42,999", "originalPrice": "₹45,999", "rawPrice": 42999,
        "discountPercent": "6% OFF", "emiText": "No-cost EMI from ₹3,583/month", "badge": "GAMING PHONE",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 310,
        "tags": ["popular"], "colors": [{"name": "Cool Blue", "hex": "#79A6D2"}, {"name": "Iron Gray", "hex": "#4A4D52"}],
        "images": ["/webp/mobiles/oneplus-12-5g-flowy-emerald.webp"],
        "tagline": "Snapdragon 8 Gen 2 power. Massive 5,500 mAh battery. 100W SUPERVOOC.",
        "specs": {"Display": "6.78-inch 1.5K 120Hz LTPO4 AMOLED", "Processor": "Snapdragon 8 Gen 2", "RAM": "16GB", "Storage": "256GB", "Main Cameras": "50MP Sony IMX890 + 8MP Ultra-Wide", "Battery & Port": "5,500 mAh, 100W Fast Charge", "OS": "OxygenOS 14"}
    },
    {
        "id": "m23", "slug": "oneplus-open", "name": "OnePlus Open Foldable", "brand": "OnePlus",
        "ram": "16GB", "storage": "512GB", "price": "₹1,39,999", "originalPrice": "₹1,49,999", "rawPrice": 139999,
        "discountPercent": "7% OFF", "emiText": "No-cost EMI from ₹11,666/month", "badge": "NO CREASE",
        "badgeColor": "bg-red-600 text-white", "rating": 4.9, "reviewCount": 75,
        "tags": ["best"], "colors": [{"name": "Emerald Dusk", "hex": "#1E4D3C"}, {"name": "Voyager Black", "hex": "#212121"}],
        "images": ["/webp/mobiles/oneplus-12-5g-flowy-emerald.webp"],
        "tagline": "Virtually invisible display crease. Hasselblad telephoto. Lightweight unibody.",
        "specs": {"Display": "7.82-inch 120Hz 2K Flexi-fluid AMOLED + 6.31-inch Cover", "Processor": "Snapdragon 8 Gen 2", "RAM": "16GB", "Storage": "512GB", "Main Cameras": "48MP + 64MP 3x Periscope + 48MP Ultra-Wide", "Battery & Port": "4,805 mAh, 67W Charging", "OS": "OxygenOS 13.2 Fold"}
    },
    {
        "id": "m24", "slug": "oneplus-nord-4", "name": "OnePlus Nord 4 5G", "brand": "OnePlus",
        "ram": "8GB", "storage": "128GB", "price": "₹29,999", "originalPrice": "₹32,999", "rawPrice": 29999,
        "discountPercent": "9% OFF", "emiText": "EMI from ₹2,499/month", "badge": "ALL-METAL UNIBODY",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.7, "reviewCount": 190,
        "tags": ["popular"], "colors": [{"name": "Oasis Green", "hex": "#8DB48E"}, {"name": "Obsidian Midnight", "hex": "#212529"}],
        "images": ["/webp/mobiles/oneplus-12-5g-flowy-emerald.webp"],
        "tagline": "Slim 5G full metal unibody. 100W SUPERVOOC. Snapdragon 7+ Gen 3.",
        "specs": {"Display": "6.74-inch 120Hz 1.5K AMOLED", "Processor": "Snapdragon 7+ Gen 3", "RAM": "8GB", "Storage": "128GB", "Main Cameras": "50MP Sony LYT-600 with OIS", "Battery & Port": "5,500 mAh, 100W Wired", "OS": "OxygenOS 14.1"}
    },
    {
        "id": "m25", "slug": "google-pixel-9-pro-xl", "name": "Google Pixel 9 Pro XL", "brand": "Google",
        "ram": "16GB", "storage": "256GB", "price": "₹1,24,999", "originalPrice": "₹1,34,999", "rawPrice": 124999,
        "discountPercent": "7% OFF", "emiText": "No-cost EMI from ₹10,416/month", "badge": "FLAGSHIP AI",
        "badgeColor": "bg-purple-600 text-white", "rating": 4.9, "reviewCount": 112,
        "tags": ["new", "best"], "colors": [{"name": "Obsidian", "hex": "#222326"}, {"name": "Porcelain", "hex": "#E7E4DF"}, {"name": "Hazel", "hex": "#7E837D"}],
        "images": ["/webp/mobiles/google-pixel-9-pro-obsidian.webp"],
        "tagline": "Huge 6.8-inch Super Actua panel. Gemini Live AI. 37W fastest Pixel charging.",
        "specs": {"Display": "6.8-inch LTPO OLED 120Hz, 3,000 nits brightness", "Processor": "Google Tensor G4 (4nm)", "RAM": "16GB", "Storage": "256GB", "Main Cameras": "50MP Main + 48MP 5x Telephoto + 48MP Ultra-Wide", "Battery & Port": "5,060 mAh, 37W Fast Charge", "OS": "Android 15"}
    }
]

laptops = [
    {
        "id": "l1", "slug": "apple-macbook-pro-16-m3-max", "name": "Apple MacBook Pro 16\" (M3 Max)", "brand": "Apple",
        "ram": "36GB", "storage": "1TB", "price": "₹3,49,900", "originalPrice": "₹3,99,900", "rawPrice": 349900,
        "discountPercent": "12% OFF", "emiText": "No-cost EMI from ₹29,158/month", "badge": "FLAGSHIP POWER",
        "badgeColor": "bg-neutral-900 text-white", "rating": 5.0, "reviewCount": 128,
        "tags": ["new", "best"], "colors": [{"name": "Space Black", "hex": "#242527"}, {"name": "Silver", "hex": "#E3E4E5"}],
        "images": ["/webp/laptops/apple-macbook-pro-16-m3-space-black.webp", "/webp/landing/apple-macbook-pro-16-space-black-glow.webp"],
        "tagline": "M3 Max with 16-core CPU & 40-core GPU. Liquid Retina XDR screen.",
        "specs": {"Display": "16.2-inch Liquid Retina XDR, 120Hz ProMotion", "Processor": "Apple M3 Max (16-Core CPU, 40-Core GPU)", "RAM": "36GB Unified Memory", "Storage": "1TB PCIe SSD", "Battery & Port": "100Wh, MagSafe 3, 3x Thunderbolt 4", "OS": "macOS Sonoma"}
    },
    {
        "id": "l2", "slug": "asus-rog-zephyrus-g16-2025", "name": "ASUS ROG Zephyrus G16 (2025)", "brand": "ASUS",
        "ram": "32GB", "storage": "1TB", "price": "₹2,19,990", "originalPrice": "₹2,49,990", "rawPrice": 219990,
        "discountPercent": "12% OFF", "emiText": "No-cost EMI from ₹18,332/month", "badge": "OLED GAMING",
        "badgeColor": "bg-red-600 text-white", "rating": 4.9, "reviewCount": 94,
        "tags": ["new", "best"], "colors": [{"name": "Eclipse Gray", "hex": "#43464B"}, {"name": "Platinum White", "hex": "#E5E7EB"}],
        "images": ["/webp/laptops/asus-rog-zephyrus-g16-display.webp", "/webp/laptops/asus-rog-zephyrus-g16-front.webp"],
        "tagline": "Intel Core Ultra 9 + RTX 4080 in ultra-thin 1.85kg CNC aluminum chassis.",
        "specs": {"Display": "16-inch 2.5K 240Hz ROG Nebula OLED, 0.2ms", "Processor": "Intel Core Ultra 9 185H with Intel AI Boost", "RAM": "32GB LPDDR5X", "Storage": "1TB PCIe 4.0 NVMe SSD", "Graphics": "NVIDIA GeForce RTX 4080 12GB GDDR6", "OS": "Windows 11 Home"}
    },
    {
        "id": "l3", "slug": "dell-xps-14-oled", "name": "Dell XPS 14 (9440) OLED", "brand": "Dell",
        "ram": "32GB", "storage": "1TB", "price": "₹1,94,990", "originalPrice": "₹2,19,990", "rawPrice": 194990,
        "discountPercent": "11% OFF", "emiText": "No-cost EMI from ₹16,249/month", "badge": "MINIMALIST PRO",
        "badgeColor": "bg-neutral-800 text-white", "rating": 4.8, "reviewCount": 76,
        "tags": ["popular"], "colors": [{"name": "Platinum Silver", "hex": "#C0C0C0"}, {"name": "Graphite", "hex": "#303030"}],
        "images": ["/webp/laptops/dell-xps-14-oled-front.webp", "/webp/laptops/dell-xps-14-oled-angle.webp"],
        "tagline": "Zero-lattice keyboard. Invisible haptic glass touchpad. 3.2K InfinityEdge.",
        "specs": {"Display": "14.5-inch 3.2K (3200x2000) 120Hz OLED Touch", "Processor": "Intel Core Ultra 7 155H (16 Cores)", "RAM": "32GB LPDDR5x", "Storage": "1TB PCIe NVMe SSD", "Graphics": "NVIDIA GeForce RTX 4050 6GB GDDR6", "OS": "Windows 11 Pro"}
    },
    {
        "id": "l4", "slug": "apple-macbook-air-15-m3", "name": "Apple MacBook Air 15\" (M3)", "brand": "Apple",
        "ram": "16GB", "storage": "512GB", "price": "₹1,44,900", "originalPrice": "₹1,54,900", "rawPrice": 144900,
        "discountPercent": "6% OFF", "emiText": "No-cost EMI from ₹12,075/month", "badge": "BESTSELLER",
        "badgeColor": "bg-amber-500 text-neutral-950", "rating": 4.9, "reviewCount": 312,
        "tags": ["new", "popular"], "colors": [{"name": "Midnight", "hex": "#1E232A"}, {"name": "Starlight", "hex": "#F0EAD6"}, {"name": "Space Gray", "hex": "#7D7E80"}, {"name": "Silver", "hex": "#E3E4E5"}],
        "images": ["/webp/laptops/apple-macbook-air-15-m3-front.webp", "/webp/laptops/apple-macbook-air-15-m3-angle.webp"],
        "tagline": "Thin 11.5mm unibody. Silent fanless design. 18-hour battery longevity.",
        "specs": {"Display": "15.3-inch Liquid Retina with True Tone (2880x1864)", "Processor": "Apple M3 (8-Core CPU, 10-Core GPU)", "RAM": "16GB Unified Memory", "Storage": "512GB SSD", "Weight": "1.51 kg", "OS": "macOS Sonoma"}
    },
    {
        "id": "l5", "slug": "lenovo-legion-pro-5i", "name": "Lenovo Legion Pro 5i Gen 9", "brand": "Lenovo",
        "ram": "32GB", "storage": "1TB", "price": "₹1,62,990", "originalPrice": "₹1,84,990", "rawPrice": 162990,
        "discountPercent": "12% OFF", "emiText": "No-cost EMI from ₹13,582/month", "badge": "ESPORTS RIG",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.8, "reviewCount": 145,
        "tags": ["best", "popular"], "colors": [{"name": "Onyx Grey", "hex": "#3A3D40"}],
        "images": ["/webp/laptops/lenovo-legion-pro-5i-front.webp", "/webp/laptops/lenovo-legion-pro-5i-angle.webp"],
        "tagline": "Intel i9-14900HX + RTX 4070 140W TGP. Coldfront 5.0 vapor cooling.",
        "specs": {"Display": "16-inch WQXGA (2560x1600) 240Hz 500nits IPS", "Processor": "Intel Core i9-14900HX (24 Cores, 32 Threads)", "RAM": "32GB (2x16GB) DDR5 5600MHz", "Storage": "1TB PCIe 4.0 NVMe SSD", "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6", "OS": "Windows 11 Home"}
    },
    {
        "id": "l6", "slug": "hp-victus-15-gaming", "name": "HP Victus 15 Gaming Laptop", "brand": "HP",
        "ram": "16GB", "storage": "512GB", "price": "₹69,990", "originalPrice": "₹82,990", "rawPrice": 69990,
        "discountPercent": "16% OFF", "emiText": "EMI starting from ₹5,832/month", "badge": "VALUE HERO",
        "badgeColor": "bg-emerald-600 text-white", "rating": 4.7, "reviewCount": 188,
        "tags": ["popular"], "colors": [{"name": "Mica Silver", "hex": "#48494B"}],
        "images": ["/webp/laptops/hp-victus-15-gaming-front.webp"],
        "tagline": "Intel i5 13th Gen + RTX 3050 6GB. Dual speaker tuned by B&O audio.",
        "specs": {"Display": "15.6-inch FHD (1920x1080) 144Hz IPS Anti-glare", "Processor": "Intel Core i5-13420H (8 Cores, 12 Threads)", "RAM": "16GB DDR4 3200MHz", "Storage": "512GB PCIe Gen4 NVMe SSD", "Graphics": "NVIDIA GeForce RTX 3050 6GB GDDR6", "OS": "Windows 11 Home"}
    },
    {
        "id": "l7", "slug": "apple-macbook-pro-14-m3-pro", "name": "Apple MacBook Pro 14\" (M3 Pro)", "brand": "Apple",
        "ram": "18GB", "storage": "512GB", "price": "₹1,89,900", "originalPrice": "₹1,99,900", "rawPrice": 189900,
        "discountPercent": "5% OFF", "emiText": "No-cost EMI from ₹15,825/month", "badge": "PRO CREATOR",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 160,
        "tags": ["best"], "colors": [{"name": "Space Black", "hex": "#242527"}, {"name": "Silver", "hex": "#E3E4E5"}],
        "images": ["/webp/laptops/apple-macbook-pro-16-m3-space-black.webp"],
        "tagline": "Liquid Retina XDR. 11-core CPU, 14-core GPU. High-bandwidth memory.",
        "specs": {"Display": "14.2-inch Liquid Retina XDR (3024x1964) 120Hz ProMotion", "Processor": "Apple M3 Pro (11-core CPU, 14-core GPU)", "RAM": "18GB Unified Memory", "Storage": "512GB PCIe SSD", "Battery & Port": "70Wh, MagSafe 3", "OS": "macOS Sonoma"}
    },
    {
        "id": "l8", "slug": "apple-macbook-air-13-m2", "name": "Apple MacBook Air 13\" (M2)", "brand": "Apple",
        "ram": "8GB", "storage": "256GB", "price": "₹89,900", "originalPrice": "₹99,900", "rawPrice": 89900,
        "discountPercent": "10% OFF", "emiText": "No-cost EMI from ₹7,491/month", "badge": "MOST POPULAR",
        "badgeColor": "bg-amber-500 text-neutral-950", "rating": 4.9, "reviewCount": 890,
        "tags": ["popular", "best"], "colors": [{"name": "Midnight", "hex": "#1E232A"}, {"name": "Starlight", "hex": "#F0EAD6"}, {"name": "Space Gray", "hex": "#7D7E80"}],
        "images": ["/webp/laptops/apple-macbook-air-15-m3-front.webp"],
        "tagline": "MagSafe charging, 1080p FaceTime HD camera, striking thin 1.24kg frame.",
        "specs": {"Display": "13.6-inch Liquid Retina Display", "Processor": "Apple M2 (8-core CPU, 8-core GPU)", "RAM": "8GB Unified Memory", "Storage": "256GB SSD", "Weight": "1.24 kg", "OS": "macOS Sonoma"}
    },
    {
        "id": "l9", "slug": "refurbished-macbook-pro-14-m1-pro", "name": "Certified Refurbished MacBook Pro 14\" (M1 Pro)", "brand": "Apple",
        "ram": "16GB", "storage": "512GB", "price": "₹92,990", "originalPrice": "₹1,94,900", "rawPrice": 92990,
        "discountPercent": "52% OFF", "emiText": "EMI from ₹7,749/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.9, "reviewCount": 78,
        "tags": ["refurbished"], "colors": [{"name": "Space Gray", "hex": "#7D7E80"}, {"name": "Silver", "hex": "#E3E4E5"}],
        "images": ["/webp/refurbished/refurbished-apple-macbook-pro-14-m1.webp"],
        "tagline": "Grade A+ pristine. 100% battery health verified. 1-Year store warranty.",
        "specs": {"Display": "14.2-inch Liquid Retina XDR 120Hz", "Processor": "Apple M1 Pro (8-Core CPU, 14-Core GPU)", "RAM": "16GB Unified", "Storage": "512GB SSD", "Condition": "Grade A+ (Mint)", "Warranty": "1-Year TecnoMart Warranty"}
    },
    {
        "id": "l10", "slug": "refurbished-macbook-air-m1", "name": "Certified Refurbished MacBook Air 13\" (M1)", "brand": "Apple",
        "ram": "8GB", "storage": "256GB", "price": "₹54,990", "originalPrice": "₹99,900", "rawPrice": 54990,
        "discountPercent": "45% OFF", "emiText": "EMI from ₹4,582/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 240,
        "tags": ["refurbished"], "colors": [{"name": "Gold", "hex": "#E8D3C3"}, {"name": "Space Gray", "hex": "#7D7E80"}],
        "images": ["/webp/refurbished/refurbished-apple-macbook-pro-14-m1.webp"],
        "tagline": "All-day battery. Silent fanless chassis. 1-Year TecnoMart warranty.",
        "specs": {"Display": "13.3-inch Retina Display", "Processor": "Apple M1 (8-core CPU, 7-core GPU)", "RAM": "8GB Unified", "Storage": "256GB SSD", "Condition": "Grade A+", "Warranty": "1-Year Warranty"}
    },
    {
        "id": "l11", "slug": "apple-macbook-pro-16-m2-max", "name": "Apple MacBook Pro 16\" (M2 Max)", "brand": "Apple",
        "ram": "32GB", "storage": "1TB", "price": "₹2,69,990", "originalPrice": "₹3,09,900", "rawPrice": 269990,
        "discountPercent": "13% OFF", "emiText": "No-cost EMI from ₹22,499/month", "badge": "HEAVY WORKSTATION",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 110,
        "tags": ["best"], "colors": [{"name": "Space Gray", "hex": "#7D7E80"}, {"name": "Silver", "hex": "#E3E4E5"}],
        "images": ["/webp/laptops/apple-macbook-pro-16-m3-space-black.webp"],
        "tagline": "M2 Max 38-core GPU beast. 96GB max unified memory support. 22h battery.",
        "specs": {"Display": "16.2-inch Liquid Retina XDR 120Hz", "Processor": "Apple M2 Max (12-Core CPU, 38-Core GPU)", "RAM": "32GB Unified", "Storage": "1TB PCIe SSD", "Battery & Port": "100Wh MagSafe 3", "OS": "macOS Sonoma"}
    },
    {
        "id": "l12", "slug": "refurbished-macbook-pro-13-m2", "name": "Certified Refurbished MacBook Pro 13\" (M2)", "brand": "Apple",
        "ram": "8GB", "storage": "256GB", "price": "₹69,990", "originalPrice": "₹1,29,900", "rawPrice": 69990,
        "discountPercent": "46% OFF", "emiText": "EMI from ₹5,832/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.7, "reviewCount": 65,
        "tags": ["refurbished"], "colors": [{"name": "Space Gray", "hex": "#7D7E80"}],
        "images": ["/webp/refurbished/refurbished-apple-macbook-pro-14-m1.webp"],
        "tagline": "Touch Bar model with active cooling fan for sustained heavy exports.",
        "specs": {"Display": "13.3-inch Retina Display with Touch Bar", "Processor": "Apple M2 (8-Core CPU, 10-Core GPU)", "RAM": "8GB Unified", "Storage": "256GB SSD", "Condition": "Grade A", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "l13", "slug": "asus-zenbook-14-oled", "name": "ASUS Zenbook 14 OLED (2025)", "brand": "ASUS",
        "ram": "16GB", "storage": "1TB", "price": "₹1,04,990", "originalPrice": "₹1,19,990", "rawPrice": 104990,
        "discountPercent": "12% OFF", "emiText": "No-cost EMI from ₹8,749/month", "badge": "ULTRAPORTABLE",
        "badgeColor": "bg-indigo-600 text-white", "rating": 4.8, "reviewCount": 82,
        "tags": ["popular"], "colors": [{"name": "Ponder Blue", "hex": "#2C3E50"}, {"name": "Foggy Silver", "hex": "#D5D8DC"}],
        "images": ["/webp/laptops/asus-rog-zephyrus-g16-display.webp"],
        "tagline": "Intel Core Ultra 7 155H with Intel Arc graphics in a 1.2kg body.",
        "specs": {"Display": "14-inch 3K (2880x1800) 120Hz Lumina OLED", "Processor": "Intel Core Ultra 7 155H", "RAM": "16GB LPDDR5X", "Storage": "1TB NVMe Gen4 SSD", "Weight": "1.2 kg", "OS": "Windows 11 Home"}
    },
    {
        "id": "l14", "slug": "asus-tuf-gaming-a15", "name": "ASUS TUF Gaming A15", "brand": "ASUS",
        "ram": "16GB", "storage": "512GB", "price": "₹74,990", "originalPrice": "₹89,990", "rawPrice": 74990,
        "discountPercent": "17% OFF", "emiText": "EMI from ₹6,249/month", "badge": "BEST BUDGET GAMER",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 350,
        "tags": ["popular", "best"], "colors": [{"name": "Mecha Grey", "hex": "#505459"}],
        "images": ["/webp/laptops/asus-rog-zephyrus-g16-front.webp"],
        "tagline": "AMD Ryzen 7 7735HS + RTX 4050 6GB. Military-grade MIL-STD-810H durability.",
        "specs": {"Display": "15.6-inch FHD (1920x1080) 144Hz IPS", "Processor": "AMD Ryzen 7 7735HS (8 Cores, 16 Threads)", "RAM": "16GB DDR5 4800MHz", "Storage": "512GB PCIe 4.0 NVMe SSD", "Graphics": "RTX 4050 6GB (140W TGP)", "OS": "Windows 11 Home"}
    },
    {
        "id": "l15", "slug": "asus-rog-strix-scar-18", "name": "ASUS ROG Strix SCAR 18", "brand": "ASUS",
        "ram": "64GB", "storage": "2TB", "price": "₹3,59,990", "originalPrice": "₹3,99,990", "rawPrice": 359990,
        "discountPercent": "10% OFF", "emiText": "No-cost EMI from ₹29,999/month", "badge": "DESKTOP REPLACEMENT",
        "badgeColor": "bg-red-600 text-white", "rating": 5.0, "reviewCount": 42,
        "tags": ["best"], "colors": [{"name": "Off Black", "hex": "#1C1C1E"}],
        "images": ["/webp/laptops/asus-rog-zephyrus-g16-display.webp"],
        "tagline": "Intel i9-14900HX + RTX 4090 175W. 18-inch Mini LED 240Hz screen.",
        "specs": {"Display": "18-inch 2.5K 240Hz ROG Nebula HDR Mini LED", "Processor": "Intel Core i9-14900HX", "RAM": "64GB DDR5 5600MHz", "Storage": "2TB (2x1TB) PCIe 4.0 in RAID 0", "Graphics": "RTX 4090 16GB GDDR6", "OS": "Windows 11 Pro"}
    },
    {
        "id": "l16", "slug": "refurbished-asus-rog-zephyrus-g14", "name": "Certified Refurbished ASUS ROG Zephyrus G14", "brand": "ASUS",
        "ram": "16GB", "storage": "1TB", "price": "₹82,990", "originalPrice": "₹1,49,990", "rawPrice": 82990,
        "discountPercent": "45% OFF", "emiText": "EMI from ₹6,915/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.8, "reviewCount": 54,
        "tags": ["refurbished"], "colors": [{"name": "Moonlight White", "hex": "#EFEFEF"}],
        "images": ["/webp/refurbished/refurbished-dell-xps-13-plus.webp"],
        "tagline": "Ryzen 9 6900HS + Radeon RX 6700S. AniMe Matrix lid display. 6mo warranty.",
        "specs": {"Display": "14-inch QHD+ 120Hz IPS", "Processor": "AMD Ryzen 9 6900HS", "RAM": "16GB DDR5", "Storage": "1TB NVMe SSD", "Condition": "Grade A+", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "l17", "slug": "dell-xps-16-9640", "name": "Dell XPS 16 (9640)", "brand": "Dell",
        "ram": "32GB", "storage": "1TB", "price": "₹2,69,990", "originalPrice": "₹2,99,990", "rawPrice": 269990,
        "discountPercent": "10% OFF", "emiText": "No-cost EMI from ₹22,499/month", "badge": "ULTIMATE CREATOR",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 60,
        "tags": ["new", "best"], "colors": [{"name": "Platinum Silver", "hex": "#C0C0C0"}],
        "images": ["/webp/laptops/dell-xps-14-oled-front.webp"],
        "tagline": "Core Ultra 9 + RTX 4070. 4K+ OLED InfinityEdge display. Gorilla Glass 3 palmrest.",
        "specs": {"Display": "16.3-inch 4K+ (3840x2400) OLED Touch 120Hz", "Processor": "Intel Core Ultra 9 185H (16 Cores)", "RAM": "32GB LPDDR5X", "Storage": "1TB PCIe NVMe SSD", "Graphics": "RTX 4070 8GB GDDR6", "OS": "Windows 11 Pro"}
    },
    {
        "id": "l18", "slug": "dell-alienware-m18-r2", "name": "Dell Alienware m18 R2", "brand": "Dell",
        "ram": "64GB", "storage": "2TB", "price": "₹3,44,990", "originalPrice": "₹3,84,990", "rawPrice": 344990,
        "discountPercent": "10% OFF", "emiText": "No-cost EMI from ₹28,749/month", "badge": "DESKTOP BEAST",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 38,
        "tags": ["best"], "colors": [{"name": "Dark Metallic Moon", "hex": "#2C2D30"}],
        "images": ["/webp/laptops/dell-xps-14-oled-angle.webp"],
        "tagline": "Intel Core i9-14900HX + RTX 4090 175W. Cryo-tech vapor cooling & CherryMX keys.",
        "specs": {"Display": "18-inch QHD+ (2560x1600) 165Hz ComfortView Plus", "Processor": "Intel Core i9-14900HX", "RAM": "64GB DDR5 5600MHz", "Storage": "2TB PCIe NVMe SSD", "Graphics": "RTX 4090 16GB GDDR6", "OS": "Windows 11 Pro"}
    },
    {
        "id": "l19", "slug": "refurbished-dell-xps-13-plus", "name": "Certified Refurbished Dell XPS 13 Plus", "brand": "Dell",
        "ram": "16GB", "storage": "512GB", "price": "₹79,999", "originalPrice": "₹1,69,900", "rawPrice": 79999,
        "discountPercent": "53% OFF", "emiText": "EMI from ₹6,666/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.7, "reviewCount": 52,
        "tags": ["refurbished"], "colors": [{"name": "Platinum", "hex": "#D8D8D8"}],
        "images": ["/webp/refurbished/refurbished-dell-xps-13-plus.webp"],
        "tagline": "3.5K OLED touch panel. Invisible glass touchpad. Core i7 12th Gen.",
        "specs": {"Display": "13.4-inch 3.5K (3456x2160) OLED Touch", "Processor": "Intel Core i7-1260P", "RAM": "16GB LPDDR5", "Storage": "512GB NVMe SSD", "Condition": "Grade A+ (Mint)", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "l20", "slug": "dell-inspiron-16-plus", "name": "Dell Inspiron 16 Plus (7630)", "brand": "Dell",
        "ram": "16GB", "storage": "1TB", "price": "₹1,12,990", "originalPrice": "₹1,29,990", "rawPrice": 112990,
        "discountPercent": "13% OFF", "emiText": "EMI from ₹9,415/month", "badge": "WORK & PLAY",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.7, "reviewCount": 85,
        "tags": ["new"], "colors": [{"name": "Dark Green", "hex": "#1E2B24"}],
        "images": ["/webp/laptops/dell-xps-14-oled-front.webp"],
        "tagline": "2.5K 16:10 screen with RTX 4050. Quad speakers with Waves MaxxAudio Pro.",
        "specs": {"Display": "16-inch 2.5K (2560x1600) 120Hz IPS", "Processor": "Intel Core i7-13700H (14 Cores)", "RAM": "16GB DDR5", "Storage": "1TB NVMe SSD", "Graphics": "RTX 4050 6GB GDDR6", "OS": "Windows 11 Home"}
    },
    {
        "id": "l21", "slug": "lenovo-legion-pro-7i", "name": "Lenovo Legion Pro 7i Gen 9", "brand": "Lenovo",
        "ram": "32GB", "storage": "1TB", "price": "₹2,39,990", "originalPrice": "₹2,74,990", "rawPrice": 239990,
        "discountPercent": "13% OFF", "emiText": "No-cost EMI from ₹19,999/month", "badge": "RTX 4080 PRO",
        "badgeColor": "bg-blue-600 text-white", "rating": 4.9, "reviewCount": 110,
        "tags": ["best", "new"], "colors": [{"name": "Eclipse Black", "hex": "#1C1C1E"}],
        "images": ["/webp/laptops/lenovo-legion-pro-5i-front.webp"],
        "tagline": "Core i9-14900HX + RTX 4080 175W. Legion Coldfront vapor chamber cooling.",
        "specs": {"Display": "16-inch WQXGA 240Hz 500nits PureSight Gaming", "Processor": "Intel Core i9-14900HX", "RAM": "32GB DDR5 5600MHz", "Storage": "1TB PCIe 4.0 NVMe", "Graphics": "RTX 4080 12GB (175W TGP)", "OS": "Windows 11 Home"}
    },
    {
        "id": "l22", "slug": "lenovo-yoga-slim-7x", "name": "Lenovo Yoga Slim 7x Copilot+ PC", "brand": "Lenovo",
        "ram": "16GB", "storage": "1TB", "price": "₹1,29,990", "originalPrice": "₹1,44,990", "rawPrice": 129990,
        "discountPercent": "10% OFF", "emiText": "No-cost EMI from ₹10,832/month", "badge": "COPILOT+ AI",
        "badgeColor": "bg-purple-600 text-white", "rating": 4.8, "reviewCount": 65,
        "tags": ["popular", "new"], "colors": [{"name": "Cosmic Blue", "hex": "#25384D"}],
        "images": ["/webp/laptops/lenovo-legion-pro-5i-angle.webp"],
        "tagline": "Snapdragon X Elite 45 TOPS NPU. 3K 90Hz PureSight OLED. 23h battery life.",
        "specs": {"Display": "14.5-inch 3K (2944x1840) 90Hz 1000nits OLED Touch", "Processor": "Snapdragon X Elite X1E-78-100 (12 Cores)", "RAM": "16GB LPDDR5X", "Storage": "1TB PCIe Gen4 SSD", "Weight": "1.28 kg", "OS": "Windows 11 with Copilot+ AI"}
    },
    {
        "id": "l23", "slug": "lenovo-thinkpad-x1-carbon-gen12", "name": "Lenovo ThinkPad X1 Carbon Gen 12", "brand": "Lenovo",
        "ram": "32GB", "storage": "1TB", "price": "₹2,19,990", "originalPrice": "₹2,49,990", "rawPrice": 219990,
        "discountPercent": "12% OFF", "emiText": "No-cost EMI from ₹18,332/month", "badge": "BUSINESS ICON",
        "badgeColor": "bg-neutral-900 text-white", "rating": 4.9, "reviewCount": 92,
        "tags": ["best"], "colors": [{"name": "Deep Black", "hex": "#121212"}],
        "images": ["/webp/laptops/lenovo-legion-pro-5i-front.webp"],
        "tagline": "Carbon fiber lid with magnesium chassis. Intel Core Ultra 7. Red TrackPoint.",
        "specs": {"Display": "14-inch 2.8K (2880x1800) OLED 120Hz 400 nits", "Processor": "Intel Core Ultra 7 155H", "RAM": "32GB LPDDR5X", "Storage": "1TB NVMe SSD", "Weight": "1.09 kg featherlight", "OS": "Windows 11 Pro"}
    },
    {
        "id": "l24", "slug": "refurbished-lenovo-thinkpad-t14s", "name": "Certified Refurbished ThinkPad T14s Gen 3", "brand": "Lenovo",
        "ram": "16GB", "storage": "512GB", "price": "₹52,999", "originalPrice": "₹1,24,990", "rawPrice": 52999,
        "discountPercent": "58% OFF", "emiText": "EMI from ₹4,416/month", "badge": "CERTIFIED REFURBISHED",
        "badgeColor": "bg-amber-600 text-white", "rating": 4.9, "reviewCount": 140,
        "tags": ["refurbished"], "colors": [{"name": "Thunder Black", "hex": "#1A1A1A"}],
        "images": ["/webp/refurbished/refurbished-lenovo-thinkpad-t14s.webp"],
        "tagline": "AMD Ryzen 7 PRO 6850U. Legendary spill-resistant keyboard. 6mo warranty.",
        "specs": {"Display": "14-inch WUXGA (1920x1200) IPS Low Power", "Processor": "AMD Ryzen 7 PRO 6850U (8C/16T)", "RAM": "16GB LPDDR5", "Storage": "512GB NVMe SSD", "Condition": "Grade A+", "Warranty": "6 Months Onsite Warranty"}
    },
    {
        "id": "l25", "slug": "hp-spectre-x360-14", "name": "HP Spectre x360 14 (2025)", "brand": "HP",
        "ram": "32GB", "storage": "1TB", "price": "₹1,64,990", "originalPrice": "₹1,84,990", "rawPrice": 164990,
        "discountPercent": "11% OFF", "emiText": "No-cost EMI from ₹13,749/month", "badge": "2-IN-1 CONVERTIBLE",
        "badgeColor": "bg-indigo-600 text-white", "rating": 4.8, "reviewCount": 74,
        "tags": ["new", "best"], "colors": [{"name": "Nightfall Black", "hex": "#1B1D21"}, {"name": "Slate Blue", "hex": "#303A45"}],
        "images": ["/webp/laptops/hp-victus-15-gaming-front.webp"],
        "tagline": "360-degree gem-cut hinge. 2.8K 120Hz OLED touch. Stylus pen included.",
        "specs": {"Display": "14-inch 2.8K (2880x1800) OLED 120Hz Touch", "Processor": "Intel Core Ultra 7 155H", "RAM": "32GB LPDDR5X", "Storage": "1TB PCIe Gen4 NVMe", "Battery & Port": "68Wh, 2x Thunderbolt 4", "OS": "Windows 11 Home"}
    }
]

accessories = [
    {
        "id": "a1", "slug": "apple-airpods-pro-2-usbc", "name": "Apple AirPods Pro (2nd Gen, USB-C)", "brand": "Apple",
        "price": "₹21,990", "originalPrice": "₹24,900", "rawPrice": 21990, "discountPercent": "12% OFF",
        "emiText": "EMI from ₹1,833/month", "badge": "BESTSELLER", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.9, "reviewCount": 512, "tags": ["popular", "best"],
        "images": ["/webp/accessories/apple-airpods-pro-2-case-open.webp", "/webp/accessories/apple-airpods-pro-2-buds-usbc.webp"],
        "tagline": "Up to 2x more Active Noise Cancellation. Adaptive Audio. Lossless audio ready.",
        "specs": {"Audio": "Apple H2 chip, Custom high-excursion driver", "Noise Cancellation": "Pro-level ANC + Transparency", "Battery": "Up to 6 hours listening, 30 hours with case", "Charging": "USB-C, MagSafe & Qi"}
    },
    {
        "id": "a2", "slug": "sony-wh-1000xm5", "name": "Sony WH-1000XM5 Wireless Headphones", "brand": "Sony",
        "price": "₹26,990", "originalPrice": "₹34,990", "rawPrice": 26990, "discountPercent": "23% OFF",
        "emiText": "EMI from ₹2,249/month", "badge": "INDUSTRY LEADING ANC", "badgeColor": "bg-blue-600 text-white",
        "rating": 4.9, "reviewCount": 380, "tags": ["popular", "best"],
        "images": ["/webp/accessories/sony-wh-1000xm5-wireless-anc-headphones.webp"],
        "tagline": "Two processors control 8 microphones for unmatched silence and crystal calls.",
        "specs": {"Drivers": "30mm precision-engineered drivers", "ANC": "Integrated Processor V1 + QN1", "Battery": "30 hours with ANC enabled", "Bluetooth": "LDAC, Multipoint connection"}
    },
    {
        "id": "a3", "slug": "anker-737-power-bank", "name": "Anker 737 GaNPrime Power Bank (24,000mAh, 140W)", "brand": "Anker",
        "price": "₹11,999", "originalPrice": "₹14,999", "rawPrice": 11999, "discountPercent": "20% OFF",
        "emiText": "EMI from ₹1,000/month", "badge": "FAST CHARGE BEAST", "badgeColor": "bg-amber-600 text-white",
        "rating": 4.9, "reviewCount": 160, "tags": ["best", "new"],
        "images": ["/webp/accessories/anker-737-ganprime-powerbank-140w.webp"],
        "tagline": "Ultra-powerful 140W two-way fast charging with smart digital color display.",
        "specs": {"Capacity": "24,000 mAh airline approved", "Output": "140W Max Power Delivery 3.1", "Ports": "2x USB-C + 1x USB-A", "Display": "Smart digital display shows real-time wattage"}
    },
    {
        "id": "a4", "slug": "keychron-q1-pro", "name": "Keychron Q1 Pro Wireless Custom Mechanical Keyboard", "brand": "Keychron",
        "price": "₹16,499", "originalPrice": "₹18,999", "rawPrice": 16499, "discountPercent": "13% OFF",
        "emiText": "EMI from ₹1,375/month", "badge": "CUSTOM KEYBOARD", "badgeColor": "bg-neutral-800 text-white",
        "rating": 4.9, "reviewCount": 94, "tags": ["best"],
        "images": ["/webp/accessories/keychron-q1-pro-mechanical-keyboard.webp"],
        "tagline": "Full CNC aluminum body, double-gasket design, QMK/VIA programmable.",
        "specs": {"Switches": "K Pro Mechanical Red / Brown (Hot-swappable)", "Connectivity": "Bluetooth 5.1 + Type-C Wired", "Compatibility": "macOS and Windows switchable", "Body": "Full CNC machined 6063 aluminum"}
    },
    {
        "id": "a5", "slug": "logitech-g-pro-x-superlight-2", "name": "Logitech G PRO X SUPERLIGHT 2 Gaming Mouse", "brand": "Logitech",
        "price": "₹13,995", "originalPrice": "₹15,995", "rawPrice": 13995, "discountPercent": "13% OFF",
        "emiText": "EMI from ₹1,166/month", "badge": "ESPORTS CHAMPION", "badgeColor": "bg-red-600 text-white",
        "rating": 4.9, "reviewCount": 210, "tags": ["popular", "best"],
        "images": ["/webp/accessories/logitech-g-pro-x-superlight-2-wireless-mouse.webp"],
        "tagline": "Lightweight 60g design, HERO 2 sensor with 32,000 DPI and LIGHTFORCE hybrid switches.",
        "specs": {"Sensor": "HERO 2 (32,000 DPI, 500+ IPS)", "Polling Rate": "4000Hz wireless polling", "Weight": "60 grams ultra-lightweight", "Battery": "Up to 95 hours constant motion"}
    },
    {
        "id": "a6", "slug": "apple-20w-usbc-power-adapter", "name": "Apple 20W USB-C Power Adapter (Original)", "brand": "Apple",
        "price": "₹1,699", "originalPrice": "₹1,900", "rawPrice": 1699, "discountPercent": "11% OFF",
        "badge": "GENUINE ACCESSORY", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.9, "reviewCount": 1240, "tags": ["popular"],
        "images": ["/webp/accessories/apple-airpods-pro-2-case-open.webp"],
        "tagline": "Fast, efficient charging at home or on the go. 100% Genuine with sealed bill.",
        "specs": {"Power": "20W Output", "Port": "USB Type-C", "Compatibility": "iPhone, iPad, Apple Watch"}
    },
    {
        "id": "a7", "slug": "apple-magsafe-charger-15w", "name": "Apple MagSafe Wireless Charger (15W)", "brand": "Apple",
        "price": "₹3,999", "originalPrice": "₹4,500", "rawPrice": 3999, "discountPercent": "11% OFF",
        "badge": "WIRELESS FAST", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.8, "reviewCount": 380, "tags": ["popular"],
        "images": ["/webp/accessories/apple-airpods-pro-2-case-open.webp"],
        "tagline": "Perfect magnetic alignment for fast wireless charging up to 15W.",
        "specs": {"Power": "15W Magnetic Fast Charge", "Cable": "Integrated 1m braided cable", "Compatibility": "iPhone 12 to 16 Pro Max"}
    },
    {
        "id": "a8", "slug": "boat-wave-ultima", "name": "boAt Wave Ultima Bluetooth Smartwatch", "brand": "boAt",
        "price": "₹1,499", "originalPrice": "₹3,990", "rawPrice": 1499, "discountPercent": "62% OFF",
        "badge": "BUDGET FAVORITE", "badgeColor": "bg-amber-500 text-neutral-950",
        "rating": 4.6, "reviewCount": 580, "tags": ["popular"],
        "images": ["/webp/accessories/boat-wave-ultima-smartwatch-front.webp"],
        "tagline": "1.83\" HD display, Bluetooth calling with clear mic, IP68 water resistance.",
        "specs": {"Display": "1.83-inch HD Curved Screen", "Calling": "Bluetooth Calling with dial pad", "Battery": "Up to 7 days standby", "Health": "Heart Rate & SpO2 tracking"}
    },
    {
        "id": "a9", "slug": "samsung-45w-travel-adapter", "name": "Samsung 45W Power Adapter with Cable", "brand": "Samsung",
        "price": "₹2,999", "originalPrice": "₹3,999", "rawPrice": 2999, "discountPercent": "25% OFF",
        "badge": "SUPER FAST", "badgeColor": "bg-blue-600 text-white",
        "rating": 4.8, "reviewCount": 290, "tags": ["popular"],
        "images": ["/webp/accessories/anker-737-ganprime-powerbank-140w.webp"],
        "tagline": "Super Fast Charging 2.0 for Galaxy S24 Ultra & Galaxy Tab series.",
        "specs": {"Output": "45W Power Delivery 3.0 PPS", "Includes": "5A USB-C to USB-C Cable (1.8m)"}
    },
    {
        "id": "a10", "slug": "apple-magic-keyboard-touch-id", "name": "Apple Magic Keyboard with Touch ID & Numeric Keypad", "brand": "Apple",
        "price": "₹16,500", "originalPrice": "₹17,500", "rawPrice": 16500, "discountPercent": "6% OFF",
        "badge": "TOUCH ID", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.9, "reviewCount": 115, "tags": ["best"],
        "images": ["/webp/accessories/keychron-q1-pro-mechanical-keyboard.webp"],
        "tagline": "Wireless rechargeable keyboard with fast, easy authentication for Mac.",
        "specs": {"Features": "Touch ID sensor, Numeric Keypad", "Battery": "Internal rechargeable battery lasts 1+ month"}
    },
    {
        "id": "a11", "slug": "refurbished-apple-airpods-max", "name": "Certified Refurbished Apple AirPods Max (Space Gray)", "brand": "Apple",
        "price": "₹36,990", "originalPrice": "₹59,900", "rawPrice": 36990, "discountPercent": "38% OFF",
        "badge": "CERTIFIED REFURBISHED", "badgeColor": "bg-amber-600 text-white",
        "rating": 4.8, "reviewCount": 64, "tags": ["refurbished"],
        "images": ["/webp/accessories/sony-wh-1000xm5-wireless-anc-headphones.webp"],
        "tagline": "Grade A+ like new. Spatial Audio with dynamic head tracking. 6mo warranty.",
        "specs": {"Drivers": "Apple-designed dynamic driver", "Body": "Anodized aluminum cups with knit mesh canopy", "Condition": "Grade A+ Mint", "Warranty": "6 Months TecnoMart Warranty"}
    },
    {
        "id": "a12", "slug": "bose-quietcomfort-ultra", "name": "Bose QuietComfort Ultra Wireless Headphones", "brand": "Bose",
        "price": "₹32,900", "originalPrice": "₹35,900", "rawPrice": 32900, "discountPercent": "8% OFF",
        "badge": "IMMERSIVE AUDIO", "badgeColor": "bg-neutral-800 text-white",
        "rating": 4.9, "reviewCount": 140, "tags": ["best", "new"],
        "images": ["/webp/accessories/sony-wh-1000xm5-wireless-anc-headphones.webp"],
        "tagline": "World-class noise cancellation with Bose Immersive spatial sound.",
        "specs": {"ANC": "CustomTune technology adjusts sound to your ears", "Battery": "Up to 24 hours playback"}
    },
    {
        "id": "a13", "slug": "sandisk-1tb-extreme-portable-ssd", "name": "SanDisk 1TB Extreme Portable SSD (1050MB/s)", "brand": "SanDisk",
        "price": "₹9,499", "originalPrice": "₹14,999", "rawPrice": 9499, "discountPercent": "37% OFF",
        "badge": "RUGGED STORAGE", "badgeColor": "bg-amber-600 text-white",
        "rating": 4.8, "reviewCount": 460, "tags": ["popular", "best"],
        "images": ["/webp/accessories/anker-737-ganprime-powerbank-140w.webp"],
        "tagline": "NVMe solid-state speeds up to 1050MB/s with IP65 water & dust resistance.",
        "specs": {"Speed": "Up to 1050MB/s read, 1000MB/s write", "Durability": "IP65 rating, 3m drop protection"}
    },
    {
        "id": "a14", "slug": "satechi-usb-c-multiport-hub", "name": "Satechi USB-C Multiport Pro Hub 8K", "brand": "Satechi",
        "price": "₹7,999", "originalPrice": "₹9,499", "rawPrice": 7999, "discountPercent": "16% OFF",
        "badge": "PRO DOCK", "badgeColor": "bg-neutral-800 text-white",
        "rating": 4.8, "reviewCount": 95, "tags": ["new"],
        "images": ["/webp/accessories/keychron-q1-pro-mechanical-keyboard.webp"],
        "tagline": "Premium aluminum hub featuring 8K HDMI, Gigabit Ethernet, SD card & 100W PD.",
        "specs": {"Ports": "HDMI 8K@30Hz, USB-A 3.2, USB-C 100W PD, Gigabit LAN, Micro/SD reader"}
    },
    {
        "id": "a15", "slug": "nomad-titanium-apple-watch-band", "name": "Nomad Titanium Band for Apple Watch Ultra (49mm)", "brand": "Nomad",
        "price": "₹18,999", "originalPrice": "₹21,999", "rawPrice": 18999, "discountPercent": "14% OFF",
        "badge": "GRADE 2 TITANIUM", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.9, "reviewCount": 48, "tags": ["best"],
        "images": ["/webp/accessories/boat-wave-ultima-smartwatch-front.webp"],
        "tagline": "Engineered from Grade 2 Titanium with custom magnetic clasp closure.",
        "specs": {"Material": "Grade 2 Titanium with DLC scratch-resistant coating", "Compatibility": "Apple Watch Ultra & 45mm"}
    },
    {
        "id": "a16", "slug": "spigen-rugged-armor-iphone-16", "name": "Spigen Rugged Armor MagFit for iPhone 16 Pro Max", "brand": "Spigen",
        "price": "₹1,899", "originalPrice": "₹2,499", "rawPrice": 1899, "discountPercent": "24% OFF",
        "badge": "MIL-GRADE DROP", "badgeColor": "bg-neutral-800 text-white",
        "rating": 4.8, "reviewCount": 730, "tags": ["popular"],
        "images": ["/webp/accessories/apple-airpods-pro-2-buds-usbc.webp"],
        "tagline": "Matte carbon fiber accents with Air Cushion Technology for military drop protection.",
        "specs": {"Feature": "Built-in magnetic ring for MagSafe", "Protection": "Air Cushion Technology corners"}
    },
    {
        "id": "a17", "slug": "ugreen-nexode-100w-gan-charger", "name": "Ugreen Nexode 100W 4-Port GaN Desktop Charger", "brand": "Ugreen",
        "price": "₹5,499", "originalPrice": "₹6,999", "rawPrice": 5499, "discountPercent": "21% OFF",
        "badge": "DESKTOP GAN", "badgeColor": "bg-emerald-600 text-white",
        "rating": 4.8, "reviewCount": 210, "tags": ["popular"],
        "images": ["/webp/accessories/anker-737-ganprime-powerbank-140w.webp"],
        "tagline": "Fast-charge MacBook Pro, iPhone, and accessories simultaneously from one wall outlet.",
        "specs": {"Ports": "3x USB-C + 1x USB-A", "Output": "100W Max total output with intelligent power allocation"}
    },
    {
        "id": "a18", "slug": "shure-sm7b-dynamic-microphone", "name": "Shure SM7B Cardioid Dynamic Vocal Microphone", "brand": "Shure",
        "price": "₹34,990", "originalPrice": "₹39,500", "rawPrice": 34990, "discountPercent": "11% OFF",
        "badge": "STUDIO GOLD", "badgeColor": "bg-neutral-900 text-white",
        "rating": 5.0, "reviewCount": 185, "tags": ["best"],
        "images": ["/webp/accessories/sony-wh-1000xm5-wireless-anc-headphones.webp"],
        "tagline": "The legendary studio standard broadcast microphone for podcasting and vocal tracking.",
        "specs": {"Type": "Dynamic (moving coil)", "Polar Pattern": "Cardioid", "Shielding": "Electromagnetic hum rejection"}
    },
    {
        "id": "a19", "slug": "elgato-stream-deck-mk2", "name": "Elgato Stream Deck MK.2 (15 LCD Keys)", "brand": "Elgato",
        "price": "₹14,999", "originalPrice": "₹16,999", "rawPrice": 14999, "discountPercent": "12% OFF",
        "badge": "CREATOR TOOL", "badgeColor": "bg-blue-600 text-white",
        "rating": 4.9, "reviewCount": 160, "tags": ["popular"],
        "images": ["/webp/accessories/keychron-q1-pro-mechanical-keyboard.webp"],
        "tagline": "15 customizable LCD keys to trigger studio actions, OBS scenes, and app shortcuts.",
        "specs": {"Keys": "15 customizable LCD keys with haptic response", "Interface": "USB 2.0 with detachable stand"}
    },
    {
        "id": "a20", "slug": "apple-pencil-pro", "name": "Apple Pencil Pro", "brand": "Apple",
        "price": "₹11,900", "originalPrice": "₹12,900", "rawPrice": 11900, "discountPercent": "8% OFF",
        "badge": "SQUEEZE SENSOR", "badgeColor": "bg-neutral-900 text-white",
        "rating": 4.9, "reviewCount": 142, "tags": ["new", "best"],
        "images": ["/webp/accessories/boat-wave-ultima-smartwatch-front.webp"],
        "tagline": "Barrel roll gyroscope, haptic feedback engine, and squeeze sensor for iPad Pro/Air.",
        "specs": {"Features": "Squeeze gesture, Barrel roll, Haptic feedback, Find My support"}
    },
    {
        "id": "a21", "slug": "refurbished-apple-watch-ultra-2", "name": "Certified Refurbished Apple Watch Ultra 2 (49mm)", "brand": "Apple",
        "price": "₹59,990", "originalPrice": "₹89,900", "rawPrice": 59990, "discountPercent": "33% OFF",
        "badge": "CERTIFIED REFURBISHED", "badgeColor": "bg-amber-600 text-white",
        "rating": 4.9, "reviewCount": 55, "tags": ["refurbished"],
        "images": ["/webp/accessories/boat-wave-ultima-smartwatch-front.webp"],
        "tagline": "Grade A+ titanium aerospace body. S9 chip with Double Tap gesture. 6mo warranty.",
        "specs": {"Case": "49mm Titanium, 3,000 nits display", "Battery": "36-72 hours, 98% battery health", "Warranty": "6 Months Warranty"}
    },
    {
        "id": "a22", "slug": "sony-wf-1000xm5-earbuds", "name": "Sony WF-1000XM5 True Wireless ANC Earbuds", "brand": "Sony",
        "price": "₹21,990", "originalPrice": "₹29,990", "rawPrice": 21990, "discountPercent": "27% OFF",
        "badge": "HI-RES WIRELESS", "badgeColor": "bg-blue-600 text-white",
        "rating": 4.8, "reviewCount": 215, "tags": ["best"],
        "images": ["/webp/accessories/apple-airpods-pro-2-buds-usbc.webp"],
        "tagline": "Dynamic Driver X with Dual processor noise canceling and LDAC streaming.",
        "specs": {"ANC": "Integrated Processor V2 + HD QN2e", "Battery": "8h earbuds + 16h case with ANC"}
    },
    {
        "id": "a23", "slug": "steelseries-apex-pro-tkl", "name": "SteelSeries Apex Pro TKL Wireless (Gen 3)", "brand": "SteelSeries",
        "price": "₹24,990", "originalPrice": "₹28,990", "rawPrice": 24990, "discountPercent": "14% OFF",
        "badge": "RAPID TRIGGER", "badgeColor": "bg-red-600 text-white",
        "rating": 4.9, "reviewCount": 88, "tags": ["best", "new"],
        "images": ["/webp/accessories/keychron-q1-pro-mechanical-keyboard.webp"],
        "tagline": "OmniPoint 3.0 adjustable HyperMagnetic switches with 40 levels of actuation.",
        "specs": {"Switches": "OmniPoint 3.0 Adjustable (0.1mm to 4.0mm)", "Connectivity": "2.4GHz Quantum 2.0 + Bluetooth 5.0"}
    },
    {
        "id": "a24", "slug": "marshall-stanmore-3-speaker", "name": "Marshall Stanmore III Bluetooth Home Speaker", "brand": "Marshall",
        "price": "₹37,999", "originalPrice": "₹41,999", "rawPrice": 37999, "discountPercent": "10% OFF",
        "badge": "ICONIC SOUND", "badgeColor": "bg-amber-600 text-white",
        "rating": 4.9, "reviewCount": 130, "tags": ["popular"],
        "images": ["/webp/accessories/boat-wave-ultima-smartwatch-front.webp"],
        "tagline": "Room-shaking Marshall signature sound with outward-angled tweeters.",
        "specs": {"Amplifiers": "One 50 Watt Class D amp for woofer, two 15 Watt amps for tweeters", "Inputs": "Bluetooth 5.2, 3.5mm AUX, RCA"}
    },
    {
        "id": "a25", "slug": "belkin-boostcharge-pro-3in1", "name": "Belkin BoostCharge Pro 3-in-1 MagSafe Wireless Stand", "brand": "Belkin",
        "price": "₹12,999", "originalPrice": "₹14,999", "rawPrice": 12999, "discountPercent": "13% OFF",
        "badge": "OFFICIAL MAGSAFE", "badgeColor": "bg-neutral-800 text-white",
        "rating": 4.8, "reviewCount": 175, "tags": ["best"],
        "images": ["/webp/accessories/apple-airpods-pro-2-case-open.webp"],
        "tagline": "Charges iPhone at 15W, Apple Watch fast charging, and AirPods at the same time.",
        "specs": {"Output": "15W MagSafe + 5W Apple Watch + 5W AirPods Qi pad"}
    }
]

# Write to src/data/products.js
output_content = f'''export const MOBILES_DATA = {json.dumps(mobiles, indent=2)};

export const LAPTOPS_DATA = {json.dumps(laptops, indent=2)};

export const ACCESSORIES_DATA = {json.dumps(accessories, indent=2)};

export const GAMING_DATA = [
  {{
    id: "g1",
    slug: "rtx-4090-liquid-cooled-beast",
    name: "Apex Liquid-Cooled RTX 4090 Super Rig",
    price: "₹3,89,999",
    rawPrice: 389999,
    badge: "CUSTOM FLAGSHIP",
    badgeColor: "bg-red-600 text-white font-black",
    rating: 5.0,
    specs: {{ "CPU": "AMD Ryzen 9 9950X", "GPU": "GeForce RTX 4090 24GB", "RAM": "64GB DDR5 6000MHz", "Storage": "2TB NVMe PCIe 4.0 SSD" }},
    images: ["/webp/gaming/img-1.webp"]
  }},
  {{
    id: "g2",
    slug: "rtx-4080-super-competitive-esports",
    name: "Valkyrie RTX 4080 Super Tournament Rig",
    price: "₹2,29,999",
    rawPrice: 229999,
    badge: "ESPORTS TOURNAMENT",
    badgeColor: "bg-blue-600 text-white font-black",
    rating: 4.9,
    specs: {{ "CPU": "Intel Core i7-14700K", "GPU": "GeForce RTX 4080 Super 16GB", "RAM": "32GB DDR5 6000MHz", "Storage": "1TB NVMe PCIe 4.0 SSD" }},
    images: ["/webp/gaming/img-2.webp"]
  }},
  {{
    id: "g3",
    slug: "rtx-4070-ti-super-stealth",
    name: "Stealth Blackout RTX 4070 Ti Super",
    price: "₹1,69,999",
    rawPrice: 169999,
    badge: "1440P BEAST",
    badgeColor: "bg-emerald-600 text-white font-black",
    rating: 4.8,
    specs: {{ "CPU": "AMD Ryzen 7 7800X3D", "GPU": "RTX 4070 Ti Super 16GB", "RAM": "32GB DDR5", "Storage": "1TB Gen4 SSD" }},
    images: ["/webp/gaming/img-3.webp"]
  }}
];

export const REFURBISHED_DATA = [
  {{
    id: "rf-1",
    slug: "refurbished-macbook-pro-14-m1-pro",
    name: "Certified Refurbished MacBook Pro 14\\" (M1 Pro)",
    brand: "Apple",
    category: "Refurbished Laptops",
    grade: "Grade A+",
    price: "₹92,990",
    rawPrice: 92990,
    originalPrice: "₹1,94,900",
    rating: 4.9,
    images: ["/webp/refurbished/refurbished-apple-macbook-pro-14-m1.webp"],
    specs: {{ "RAM & Storage": "16GB Unified + 512GB SSD", "Processor": "M1 Pro", "Condition": "Grade A+ (Mint)" }}
  }},
  {{
    id: "rf-2",
    slug: "refurbished-iphone-14-pro-max",
    name: "Certified Refurbished iPhone 14 Pro Max 128GB",
    brand: "Apple",
    category: "Refurbished Mobiles",
    grade: "Grade A+",
    price: "₹74,990",
    rawPrice: 74990,
    originalPrice: "₹1,39,900",
    rating: 4.8,
    images: ["/webp/refurbished/refurbished-apple-ipad-pro-11-m2.webp"],
    specs: {{ "RAM & Storage": "6GB RAM + 128GB Storage", "Processor": "A16 Bionic", "Condition": "Grade A+" }}
  }},
  {{
    id: "rf-3",
    slug: "refurbished-dell-xps-13-plus",
    name: "Certified Refurbished Dell XPS 13 Plus",
    brand: "Dell",
    category: "Refurbished Laptops",
    grade: "Grade A+",
    price: "₹79,999",
    rawPrice: 79999,
    originalPrice: "₹1,69,900",
    rating: 4.7,
    images: ["/webp/refurbished/refurbished-dell-xps-13-plus.webp"],
    specs: {{ "RAM & Storage": "16GB RAM + 512GB SSD", "Processor": "Intel Core i7-1260P", "Condition": "Grade A+" }}
  }}
];

export function getGamingBySlug(slug) {{
  return GAMING_DATA.find((g) => g.slug === slug || g.id === slug) || GAMING_DATA[0];
}}

export function getAccessoryBySlug(slug) {{
  return ACCESSORIES_DATA.find((a) => a.slug === slug || a.id === slug) || ACCESSORIES_DATA[0];
}}

export function getRefurbishedBySlug(slug) {{
  return REFURBISHED_DATA.find((r) => r.slug === slug || r.id === slug) || REFURBISHED_DATA[0];
}}

export const ALL_PRODUCTS = [
  ...MOBILES_DATA.map((p) => ({{ ...p, type: 'mobiles' }})),
  ...LAPTOPS_DATA.map((p) => ({{ ...p, type: 'laptops' }})),
  ...GAMING_DATA.map((p) => ({{ ...p, type: 'gaming' }})),
  ...ACCESSORIES_DATA.map((p) => ({{ ...p, type: 'accessories' }})),
  ...REFURBISHED_DATA.map((p) => ({{ ...p, type: 'refurbished' }})),
];
'''

with open(r'c:\Users\techt\tecnomart-final\src\data\products.js', 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated src/data/products.js with {len(mobiles)} mobiles, {len(laptops)} laptops, {len(accessories)} accessories.")
