import sys
import json
import re

sys.path.append('scripts')
import build_full_products_data

def format_inr(val):
    s = str(val)
    if len(s) <= 3:
        return f"₹{s}"
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while len(rest) > 2:
        parts.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        parts.insert(0, rest)
    return f"₹{','.join(parts)},{last3}"

# 1. Update Mobiles in build_full_products_data.mobiles
mobiles_map = {
    "m1": {"price": 99999, "originalPrice": 149900, "name": "Apple iPhone 16 Pro Max", "storage": "256GB"},
    "m2": {"price": 71999, "originalPrice": 134999, "name": "Samsung Galaxy S24 Ultra", "storage": "256GB", "ram": "12GB"},
    "m3": {"price": 45999, "originalPrice": 69999, "name": "OnePlus 12 5G", "storage": "256GB", "ram": "12GB"},
    "m4": {"price": 109999, "originalPrice": 119999, "name": "Google Pixel 9 Pro", "storage": "256GB", "ram": "16GB"},
    "m5": {"price": 59900, "originalPrice": 69900, "name": "Apple iPhone 15", "storage": "128GB"},
    "m6": {"price": 119999, "originalPrice": 174999, "name": "Samsung Galaxy Z Fold 6", "storage": "256GB", "ram": "12GB"},
    "m7": {"price": 109900, "originalPrice": 124900, "name": "Apple iPhone 16 Pro", "storage": "128GB"},
    "m8": {"price": 67490, "originalPrice": 82900, "name": "Apple iPhone 16", "storage": "128GB"},
    "m9": {"price": 79900, "originalPrice": 92900, "name": "Apple iPhone 16 Plus", "storage": "128GB"},
    "m10": {"price": 119900, "originalPrice": 149900, "name": "Apple iPhone 15 Pro Max", "storage": "256GB"},
    "m11": {"price": 51499, "originalPrice": 69900, "name": "Apple iPhone 14", "storage": "128GB"},
    "m12": {"price": 39994, "originalPrice": 59900, "name": "Apple iPhone 13", "storage": "128GB"},
    "m13": {"price": 74990, "originalPrice": 139900, "name": "Certified Refurbished iPhone 14 Pro Max", "storage": "128GB"},
    "m14": {"price": 52990, "originalPrice": 119900, "name": "Certified Refurbished iPhone 13 Pro", "storage": "128GB"},
    "m15": {"price": 59999, "originalPrice": 99999, "name": "Samsung Galaxy S24+ 5G", "storage": "256GB", "ram": "12GB"},
    "m16": {"price": 43999, "originalPrice": 79999, "name": "Samsung Galaxy S24", "storage": "256GB", "ram": "8GB"},
    "m17": {"price": 79999, "originalPrice": 109999, "name": "Samsung Galaxy Z Flip 6", "storage": "256GB", "ram": "12GB"},
    "m18": {"price": 69999, "originalPrice": 124999, "name": "Samsung Galaxy S23 Ultra", "storage": "256GB", "ram": "12GB"},
    "m19": {"price": 68999, "originalPrice": 124999, "name": "Certified Refurbished Galaxy S23 Ultra", "storage": "256GB", "ram": "12GB"},
    "m20": {"price": 37999, "originalPrice": 59999, "name": "Samsung Galaxy S23 FE 5G", "storage": "128GB", "ram": "8GB"},
    "m21": {"price": 42999, "originalPrice": 44999, "name": "Samsung Galaxy A55 5G", "storage": "128GB", "ram": "8GB"},
    "m22": {"price": 29999, "originalPrice": 45999, "name": "OnePlus 12R 5G", "storage": "256GB", "ram": "8GB"},
    "m23": {"price": 99999, "originalPrice": 139999, "name": "OnePlus Open", "storage": "512GB", "ram": "16GB"},
    "m24": {"price": 23999, "originalPrice": 29999, "name": "OnePlus Nord 4 5G", "storage": "128GB", "ram": "8GB"},
    "m25": {"price": 124999, "originalPrice": 129999, "name": "Google Pixel 9 Pro XL", "storage": "256GB", "ram": "16GB"},
}

for m in build_full_products_data.mobiles:
    mid = m["id"]
    if mid in mobiles_map:
        up = mobiles_map[mid]
        price = up["price"]
        orig = up["originalPrice"]
        m["price"] = format_inr(price)
        m["rawPrice"] = price
        m["originalPrice"] = format_inr(orig)
        pct = max(1, round(((orig - price) / orig) * 100))
        m["discountPercent"] = f"{pct}% OFF"
        emi = round(price / 12)
        m["emiText"] = f"No-cost EMI from {format_inr(emi)}/month"
        if "name" in up:
            m["name"] = up["name"]
        if "storage" in up:
            m["storage"] = up["storage"]
        if "ram" in up:
            m["ram"] = up["ram"]

# 2. Update Laptops
laptops_map = {
    "laptop-1": {"price": 349900, "originalPrice": 379900, "name": "Apple MacBook Pro 16\" M3 Max", "ram": "36GB", "storage": "1TB"},
    "laptop-2": {"price": 219990, "originalPrice": 259990, "name": "ASUS ROG Zephyrus G16 (2025)"},
    "laptop-3": {"price": 205990, "originalPrice": 229990, "name": "Dell XPS 14 (9440) OLED"},
    "laptop-4": {"price": 144900, "originalPrice": 154900, "name": "Apple MacBook Air 15\" M3", "ram": "16GB", "storage": "512GB"},
    "laptop-5": {"price": 162990, "originalPrice": 189990, "name": "Lenovo Legion Pro 5i Gen 9"},
    "laptop-6": {"price": 69990, "originalPrice": 82990, "name": "HP Victus 15 Gaming"},
    "laptop-7": {"price": 189900, "originalPrice": 199900, "name": "Apple MacBook Pro 14\" M3 Pro"},
    "laptop-8": {"price": 69990, "originalPrice": 99900, "name": "Apple MacBook Air 13\" M2", "ram": "8GB", "storage": "256GB"},
    "laptop-9": {"price": 92990, "originalPrice": 194900, "name": "Certified Refurbished MacBook Pro 14\" M1 Pro"},
    "laptop-10": {"price": 54990, "originalPrice": 99900, "name": "Certified Refurbished MacBook Air 13\" M1"},
    "laptop-11": {"price": 269990, "originalPrice": 309990, "name": "Apple MacBook Pro 16\" M2 Max"},
    "laptop-12": {"price": 69990, "originalPrice": 129900, "name": "Certified Refurbished MacBook Pro 13\" M2"},
    "laptop-13": {"price": 104990, "originalPrice": 119990, "name": "ASUS Zenbook 14 OLED 2025"},
    "laptop-14": {"price": 74990, "originalPrice": 89990, "name": "ASUS TUF Gaming A15"},
    "laptop-15": {"price": 359990, "originalPrice": 399990, "name": "ASUS ROG Strix SCAR 18"},
    "laptop-16": {"price": 82990, "originalPrice": 149990, "name": "Certified Refurbished ASUS ROG Zephyrus G14"},
    "laptop-17": {"price": 278550, "originalPrice": 299990, "name": "Dell XPS 16 9640"},
    "laptop-18": {"price": 296490, "originalPrice": 344990, "name": "Dell Alienware m18 R2"},
    "laptop-19": {"price": 79999, "originalPrice": 169900, "name": "Certified Refurbished Dell XPS 13 Plus"},
    "laptop-20": {"price": 108499, "originalPrice": 124990, "name": "Dell Inspiron 16 Plus 7630"},
    "laptop-21": {"price": 239990, "originalPrice": 269990, "name": "Lenovo Legion Pro 7i Gen 9"},
    "laptop-22": {"price": 129990, "originalPrice": 149990, "name": "Lenovo Yoga Slim 7x Copilot+"},
    "laptop-23": {"price": 219990, "originalPrice": 249990, "name": "Lenovo ThinkPad X1 Carbon Gen 12"},
    "laptop-24": {"price": 52999, "originalPrice": 119900, "name": "Certified Refurbished ThinkPad T14s Gen 3"},
    "laptop-25": {"price": 164990, "originalPrice": 184990, "name": "HP Spectre x360 14"},
}

for l in build_full_products_data.laptops:
    lid = l["id"]
    if lid in laptops_map:
        up = laptops_map[lid]
        price = up["price"]
        orig = up["originalPrice"]
        l["price"] = format_inr(price)
        l["rawPrice"] = price
        l["originalPrice"] = format_inr(orig)
        pct = max(1, round(((orig - price) / orig) * 100))
        l["discountPercent"] = f"{pct}% OFF"
        emi = round(price / 12)
        l["emiText"] = f"No-cost EMI from {format_inr(emi)}/month"
        if "name" in up:
            l["name"] = up["name"]
        if "storage" in up:
            l["storage"] = up["storage"]
        if "ram" in up:
            l["ram"] = up["ram"]

# 3. Update Accessories
acc_map = {
    "acc-1": {"price": 21990, "originalPrice": 24900, "name": "Apple AirPods Pro 2nd Gen USB-C"},
    "acc-2": {"price": 28304, "originalPrice": 34990, "name": "Sony WH-1000XM5 Wireless Headphones"},
    "acc-3": {"price": 11999, "originalPrice": 14999, "name": "Anker 737 GaNPrime 24,000mAh 140W"},
    "acc-4": {"price": 16499, "originalPrice": 19999, "name": "Keychron Q1 Pro Wireless Mechanical Keyboard"},
    "acc-5": {"price": 13995, "originalPrice": 16995, "name": "Logitech G PRO X SUPERLIGHT 2"},
    "acc-6": {"price": 1699, "originalPrice": 1900, "name": "Apple 20W USB-C Power Adapter"},
    "acc-7": {"price": 3999, "originalPrice": 4500, "name": "Apple MagSafe Charger (1m)"},
    "acc-8": {"price": 1499, "originalPrice": 3999, "name": "boAt Wave Ultima Smartwatch"},
    "acc-9": {"price": 999, "originalPrice": 2999, "name": "Samsung 45W Power Adapter + Cable"},
    "acc-10": {"price": 16399, "originalPrice": 19500, "name": "Apple Magic Keyboard Touch ID + Numeric Keypad"},
    "acc-11": {"price": 36990, "originalPrice": 59900, "name": "Certified Refurbished AirPods Max Space Gray"},
    "acc-12": {"price": 32900, "originalPrice": 35900, "name": "Bose QuietComfort Ultra Headphones"},
    "acc-13": {"price": 9499, "originalPrice": 14999, "name": "SanDisk Extreme Portable SSD 1TB"},
    "acc-14": {"price": 7999, "originalPrice": 9999, "name": "Satechi USB-C Multiport Pro Hub 8K"},
    "acc-15": {"price": 18999, "originalPrice": 22999, "name": "Nomad Titanium Band Apple Watch Ultra 49mm"},
    "acc-16": {"price": 1899, "originalPrice": 2499, "name": "Spigen Rugged Armor MagFit iPhone 16 Pro Max"},
    "acc-17": {"price": 5499, "originalPrice": 7999, "name": "Ugreen Nexode 100W 4-Port GaN Charger"},
    "acc-18": {"price": 34990, "originalPrice": 39990, "name": "Shure SM7B Vocal Dynamic Microphone"},
    "acc-19": {"price": 14999, "originalPrice": 17999, "name": "Elgato Stream Deck MK.2"},
    "acc-20": {"price": 11900, "originalPrice": 12900, "name": "Apple Pencil Pro"},
    "acc-21": {"price": 59990, "originalPrice": 89900, "name": "Certified Refurbished Apple Watch Ultra 2 49mm"},
    "acc-22": {"price": 16999, "originalPrice": 24990, "name": "Sony WF-1000XM5 True Wireless Earbuds"},
    "acc-23": {"price": 24990, "originalPrice": 29990, "name": "SteelSeries Apex Pro TKL Wireless Gen 3"},
    "acc-24": {"price": 37999, "originalPrice": 42999, "name": "Marshall Stanmore III Bluetooth Speaker"},
    "acc-25": {"price": 12999, "originalPrice": 15999, "name": "Belkin BoostCharge Pro 3-in-1 MagSafe Stand"},
}

for a in build_full_products_data.accessories:
    aid = a["id"]
    if aid in acc_map:
        up = acc_map[aid]
        price = up["price"]
        orig = up["originalPrice"]
        a["price"] = format_inr(price)
        a["rawPrice"] = price
        a["originalPrice"] = format_inr(orig)
        pct = max(1, round(((orig - price) / orig) * 100))
        a["discountPercent"] = f"{pct}% OFF"
        if "name" in up:
            a["name"] = up["name"]

# 4. Serialize to src/data/products.js
mobiles_js = json.dumps(build_full_products_data.mobiles, indent=2)
laptops_js = json.dumps(build_full_products_data.laptops, indent=2)
accessories_js = json.dumps(build_full_products_data.accessories, indent=2)

output_content = f'''export const MOBILES_DATA = {mobiles_js};

export const LAPTOPS_DATA = {laptops_js};

export const ACCESSORIES_DATA = {accessories_js};

export const GAMING_DATA = [
  {{
    id: "g1",
    slug: "rtx-4090-liquid-cooled-beast",
    name: "Apex Liquid-Cooled RTX 4090 Rig",
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
    name: "Certified Refurbished MacBook Pro 14\\" M1 Pro",
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

export function getLaptopBySlug(slug) {{
  return LAPTOPS_DATA.find((l) => l.slug === slug || l.id === slug) || LAPTOPS_DATA[0];
}}

export function getMobileBySlug(slug) {{
  return MOBILES_DATA.find((m) => m.slug === slug || m.id === slug) || MOBILES_DATA[0];
}}

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

with open(r'src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(output_content)

print("Successfully wrote updated src/data/products.js!")
