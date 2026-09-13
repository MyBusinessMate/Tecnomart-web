import re
import json

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

def parse_num(raw_str):
    if not raw_str:
        return 0
    return int(re.sub(r"[^\d]", "", str(raw_str)))

# 1. Update MOBILES (25)
mobiles_new_prices = {
    "m1": {"price": 99999, "name": "Apple iPhone 16 Pro Max", "storage": "256GB"},
    "m2": {"price": 71999, "name": "Samsung Galaxy S24 Ultra", "storage": "256GB", "ram": "12GB"},
    "m3": {"price": 45999, "name": "OnePlus 12 5G", "storage": "256GB", "ram": "12GB"},
    "m4": {"price": 109999, "name": "Google Pixel 9 Pro", "storage": "256GB", "ram": "16GB"},
    "m5": {"price": 59900, "name": "Apple iPhone 15", "storage": "128GB"},
    "m6": {"price": 119999, "name": "Samsung Galaxy Z Fold 6", "storage": "256GB", "ram": "12GB"},
    "m7": {"price": 109900, "name": "Apple iPhone 16 Pro", "storage": "128GB"},
    "m8": {"price": 67490, "name": "Apple iPhone 16", "storage": "128GB"},
    "m9": {"price": 79900, "name": "Apple iPhone 16 Plus", "storage": "128GB"},
    "m10": {"price": 119900, "name": "Apple iPhone 15 Pro Max", "storage": "256GB"},
    "m11": {"price": 51499, "name": "Apple iPhone 14", "storage": "128GB"},
    "m12": {"price": 39994, "name": "Apple iPhone 13", "storage": "128GB"},
    "m13": {"price": 74990, "name": "Certified Refurbished iPhone 14 Pro Max", "storage": "128GB"},
    "m14": {"price": 52990, "name": "Certified Refurbished iPhone 13 Pro", "storage": "128GB"},
    "m15": {"price": 59999, "name": "Samsung Galaxy S24+ 5G", "storage": "256GB", "ram": "12GB"},
    "m16": {"price": 43999, "name": "Samsung Galaxy S24", "storage": "256GB", "ram": "8GB"},
    "m17": {"price": 79999, "name": "Samsung Galaxy Z Flip 6", "storage": "256GB", "ram": "12GB"},
    "m18": {"price": 69999, "name": "Samsung Galaxy S23 Ultra", "storage": "256GB", "ram": "12GB"},
    "m19": {"price": 68999, "name": "Certified Refurbished Galaxy S23 Ultra", "storage": "256GB", "ram": "12GB"},
    "m20": {"price": 37999, "name": "Samsung Galaxy S23 FE 5G", "storage": "128GB", "ram": "8GB"},
    "m21": {"price": 42999, "name": "Samsung Galaxy A55 5G", "storage": "128GB", "ram": "8GB"},
    "m22": {"price": 29999, "name": "OnePlus 12R 5G", "storage": "256GB", "ram": "8GB"},
    "m23": {"price": 99999, "name": "OnePlus Open", "storage": "512GB", "ram": "16GB"},
    "m24": {"price": 23999, "name": "OnePlus Nord 4 5G", "storage": "128GB", "ram": "8GB"},
    "m25": {"price": 124999, "name": "Google Pixel 9 Pro XL", "storage": "256GB", "ram": "16GB"},
}

# 2. Update LAPTOPS (25)
laptops_new_prices = {
    "laptop-1": {"price": 349900, "name": "Apple MacBook Pro 16\" M3 Max", "ram": "36GB", "storage": "1TB"},
    "laptop-2": {"price": 219990, "name": "ASUS ROG Zephyrus G16 (2025)"},
    "laptop-3": {"price": 205990, "name": "Dell XPS 14 (9440) OLED"},
    "laptop-4": {"price": 144900, "name": "Apple MacBook Air 15\" M3", "ram": "16GB", "storage": "512GB"},
    "laptop-5": {"price": 162990, "name": "Lenovo Legion Pro 5i Gen 9"},
    "laptop-6": {"price": 69990, "name": "HP Victus 15 Gaming"},
    "laptop-7": {"price": 189900, "name": "Apple MacBook Pro 14\" M3 Pro"},
    "laptop-8": {"price": 69990, "name": "Apple MacBook Air 13\" M2", "ram": "8GB", "storage": "256GB"},
    "laptop-9": {"price": 92990, "name": "Certified Refurbished MacBook Pro 14\" M1 Pro"},
    "laptop-10": {"price": 54990, "name": "Certified Refurbished MacBook Air 13\" M1"},
    "laptop-11": {"price": 269990, "name": "Apple MacBook Pro 16\" M2 Max"},
    "laptop-12": {"price": 69990, "name": "Certified Refurbished MacBook Pro 13\" M2"},
    "laptop-13": {"price": 104990, "name": "ASUS Zenbook 14 OLED 2025"},
    "laptop-14": {"price": 74990, "name": "ASUS TUF Gaming A15"},
    "laptop-15": {"price": 359990, "name": "ASUS ROG Strix SCAR 18"},
    "laptop-16": {"price": 82990, "name": "Certified Refurbished ASUS ROG Zephyrus G14"},
    "laptop-17": {"price": 278550, "name": "Dell XPS 16 9640"},
    "laptop-18": {"price": 296490, "name": "Dell Alienware m18 R2"},
    "laptop-19": {"price": 79999, "name": "Certified Refurbished Dell XPS 13 Plus"},
    "laptop-20": {"price": 108499, "name": "Dell Inspiron 16 Plus 7630"},
    "laptop-21": {"price": 239990, "name": "Lenovo Legion Pro 7i Gen 9"},
    "laptop-22": {"price": 129990, "name": "Lenovo Yoga Slim 7x Copilot+"},
    "laptop-23": {"price": 219990, "name": "Lenovo ThinkPad X1 Carbon Gen 12"},
    "laptop-24": {"price": 52999, "name": "Certified Refurbished ThinkPad T14s Gen 3"},
    "laptop-25": {"price": 164990, "name": "HP Spectre x360 14"},
}

# 3. Update GAMING (3)
gaming_new_prices = {
    "gaming-1": {"price": 389999, "name": "Apex Liquid-Cooled RTX 4090 Rig"},
    "gaming-2": {"price": 229999, "name": "Valkyrie RTX 4080 Super Tournament Rig"},
    "gaming-3": {"price": 169999, "name": "Stealth Blackout RTX 4070 Ti Super"},
}

# 4. Update REFURBISHED (3)
refurb_new_prices = {
    "rf-1": {"price": 92990, "name": "Certified Refurbished MacBook Pro 14\" M1 Pro"},
    "rf-2": {"price": 74990, "name": "Certified Refurbished iPhone 14 Pro Max 128GB"},
    "rf-3": {"price": 79999, "name": "Certified Refurbished Dell XPS 13 Plus"},
}

# 5. Update ACCESSORIES (25)
acc_new_prices = {
    "acc-1": {"price": 21990, "name": "Apple AirPods Pro 2nd Gen USB-C"},
    "acc-2": {"price": 28304, "name": "Sony WH-1000XM5 Wireless Headphones"},
    "acc-3": {"price": 11999, "name": "Anker 737 GaNPrime 24,000mAh 140W"},
    "acc-4": {"price": 16499, "name": "Keychron Q1 Pro Wireless Mechanical Keyboard"},
    "acc-5": {"price": 13995, "name": "Logitech G PRO X SUPERLIGHT 2"},
    "acc-6": {"price": 1699, "name": "Apple 20W USB-C Power Adapter"},
    "acc-7": {"price": 3999, "name": "Apple MagSafe Charger (1m)"},
    "acc-8": {"price": 1499, "name": "boAt Wave Ultima Smartwatch"},
    "acc-9": {"price": 999, "name": "Samsung 45W Power Adapter + Cable"},
    "acc-10": {"price": 16399, "name": "Apple Magic Keyboard Touch ID + Numeric Keypad"},
    "acc-11": {"price": 36990, "name": "Certified Refurbished AirPods Max Space Gray"},
    "acc-12": {"price": 32900, "name": "Bose QuietComfort Ultra Headphones"},
    "acc-13": {"price": 9499, "name": "SanDisk Extreme Portable SSD 1TB"},
    "acc-14": {"price": 7999, "name": "Satechi USB-C Multiport Pro Hub 8K"},
    "acc-15": {"price": 18999, "name": "Nomad Titanium Band Apple Watch Ultra 49mm"},
    "acc-16": {"price": 1899, "name": "Spigen Rugged Armor MagFit iPhone 16 Pro Max"},
    "acc-17": {"price": 5499, "name": "Ugreen Nexode 100W 4-Port GaN Charger"},
    "acc-18": {"price": 34990, "name": "Shure SM7B Vocal Dynamic Microphone"},
    "acc-19": {"price": 14999, "name": "Elgato Stream Deck MK.2"},
    "acc-20": {"price": 11900, "name": "Apple Pencil Pro"},
    "acc-21": {"price": 59990, "name": "Certified Refurbished Apple Watch Ultra 2 49mm"},
    "acc-22": {"price": 16999, "name": "Sony WF-1000XM5 True Wireless Earbuds"},
    "acc-23": {"price": 24990, "name": "SteelSeries Apex Pro TKL Wireless Gen 3"},
    "acc-24": {"price": 37999, "name": "Marshall Stanmore III Bluetooth Speaker"},
    "acc-25": {"price": 12999, "name": "Belkin BoostCharge Pro 3-in-1 MagSafe Stand"},
}

# 6. Update PC CATALOG (33)
catalog_new_prices = {
    "cpu-amd-9600x": 20690,
    "cpu-amd-9700x": 31999,
    "cpu-amd-9950x": 56999,
    "cpu-intel-245k": 23959,
    "cpu-intel-265k": 32999,
    "cpu-intel-285k": 65500,
    "gpu-rtx-5060": 36000,
    "gpu-rx-9070": 65000,
    "gpu-rtx-5070": 65000,
    "gpu-rtx-5090": 450000,
    "mb-b650m-ds3h": 14900,
    "mb-x670e-tuf": 28999,
    "mb-b860m-pro": 17999,
    "mb-z890-tomahawk": 34999,
    "ram-16-5200": 5999,
    "ram-32-6000": 11999,
    "ram-64-6400": 19999,
    "ssd-1tb-p3plus": 6499,
    "ssd-2tb-990pro": 17999,
    "ssd-4tb-sn850x": 31999,
    "psu-650-bronze": 7499,
    "psu-850-gold": 11999,
    "psu-1000-gold": 18999,
    "psu-1200-plat": 29999,
    "cooler-air-ak400": 2999,
    "cooler-aio-240": 8999,
    "cooler-aio-360": 15999,
    "case-matx-airflow": 5999,
    "case-atx-airflow": 8499,
    "case-atx-dualchamber": 14999,
    "mon-24-1080p-165": 12999,
    "mon-27-1440p-165": 27999,
    "mon-32-4k-oled": 114999
}

# --- PROCESS src/data/products.js ---
print("Updating src/data/products.js...")
with open("src/data/products.js", "r", encoding="utf-8") as f:
    p_content = f.read()

def update_item_in_js(match):
    block = match.group(0)
    # find id
    id_m = re.search(r'["\']id["\']:\s*["\']([^"\']+)["\']', block)
    if not id_m:
        return block
    pid = id_m.group(1)
    
    update = None
    if pid in mobiles_new_prices:
        update = mobiles_new_prices[pid]
    elif pid in laptops_new_prices:
        update = laptops_new_prices[pid]
    elif pid in gaming_new_prices:
        update = gaming_new_prices[pid]
    elif pid in refurb_new_prices:
        update = refurb_new_prices[pid]
    elif pid in acc_new_prices:
        update = acc_new_prices[pid]

    if not update:
        return block

    new_p = update["price"]
    formatted_p = format_inr(new_p)

    # originalPrice
    orig_m = re.search(r'["\']originalPrice["\']:\s*["\']([^"\']+)["\']', block)
    orig_val = parse_num(orig_m.group(1)) if orig_m else int(new_p * 1.1)
    if orig_val <= new_p:
        orig_val = int(new_p * 1.15)
    formatted_orig = format_inr(orig_val)

    # discount
    discount_pct = max(1, round(((orig_val - new_p) / orig_val) * 100))
    discount_str = f"{discount_pct}% OFF"

    # emi
    emi_val = round(new_p / 12)
    emi_str = f"No-cost EMI from {format_inr(emi_val)}/month"

    # replacements
    block = re.sub(r'["\']price["\']:\s*["\'][^"\']+["\']', f'"price": "{formatted_p}"', block)
    block = re.sub(r'["\']rawPrice["\']:\s*\d+', f'"rawPrice": {new_p}', block)
    block = re.sub(r'["\']originalPrice["\']:\s*["\'][^"\']+["\']', f'"originalPrice": "{formatted_orig}"', block)
    block = re.sub(r'["\']discountPercent["\']:\s*["\'][^"\']+["\']', f'"discountPercent": "{discount_str}"', block)
    if 'emiText' in block:
        block = re.sub(r'["\']emiText["\']:\s*["\'][^"\']+["\']', f'"emiText": "{emi_str}"', block)

    if "name" in update:
        block = re.sub(r'["\']name["\']:\s*["\'][^"\']+["\']', f'"name": "{update["name"]}"', block)
    if "storage" in update:
        block = re.sub(r'["\']storage["\']:\s*["\'][^"\']+["\']', f'"storage": "{update["storage"]}"', block)
    if "ram" in update:
        block = re.sub(r'["\']ram["\']:\s*["\'][^"\']+["\']', f'"ram": "{update["ram"]}"', block)

    return block

# Match each object { ... }
# In products.js each object is within array brackets
updated_p_content = re.sub(r'\{\s*"id":\s*"[^"]+".*?\n  \}', update_item_in_js, p_content, flags=re.DOTALL)
with open("src/data/products.js", "w", encoding="utf-8") as f:
    f.write(updated_p_content)
print("src/data/products.js updated successfully.")

# --- PROCESS src/data/catalog.js ---
print("Updating src/data/catalog.js...")
with open("src/data/catalog.js", "r", encoding="utf-8") as f:
    cat_content = f.read()

def update_catalog_item(match):
    block = match.group(0)
    id_m = re.search(r'id:\s*["\']([^"\']+)["\']', block)
    if not id_m:
        return block
    cid = id_m.group(1)
    if cid in catalog_new_prices:
        new_price = catalog_new_prices[cid]
        block = re.sub(r'priceINR:\s*\d+', f'priceINR: {new_price}', block)
    return block

updated_cat_content = re.sub(r'\{\s*id:\s*["\'][^"\']+["\'].*?\n  \}', update_catalog_item, cat_content, flags=re.DOTALL)
with open("src/data/catalog.js", "w", encoding="utf-8") as f:
    f.write(updated_cat_content)
print("src/data/catalog.js updated successfully.")

# --- PROCESS src/components/redesign/AmazonQuadGrid.jsx ---
print("Updating AmazonQuadGrid.jsx...")
with open("src/components/redesign/AmazonQuadGrid.jsx", "r", encoding="utf-8") as f:
    quad_content = f.read()

quad_replacements = [
    ('name: "iPhone 16 Pro Max",\n          price: "₹1,44,900"', 'name: "iPhone 16 Pro Max",\n          price: "₹99,999"'),
    ('name: "Galaxy S24 Ultra",\n          price: "₹1,29,999"', 'name: "Galaxy S24 Ultra",\n          price: "₹71,999"'),
    ('name: "OnePlus 12 5G",\n          price: "₹64,999"', 'name: "OnePlus 12 5G",\n          price: "₹45,999"'),
    ('name: "iPhone 15 128GB",\n          price: "₹69,900"', 'name: "iPhone 15 128GB",\n          price: "₹59,900"'),
    ('name: "ROG Zephyrus G16",\n          price: "₹2,69,990"', 'name: "ROG Zephyrus G16",\n          price: "₹2,19,990"'),
    ('name: "Dell XPS 14 OLED",\n          price: "₹1,84,990"', 'name: "Dell XPS 14 OLED",\n          price: "₹2,05,990"'),
    ('name: "Lenovo Legion Pro",\n          price: "₹1,44,990"', 'name: "Lenovo Legion Pro",\n          price: "₹1,62,990"'),
    ('name: "Alienware 4K OLED",\n          price: "₹95,999"', 'name: "Alienware 4K OLED",\n          price: "₹1,14,999"'),
    ('name: "Refurb MacBook 14",\n          price: "₹94,999"', 'name: "Refurb MacBook 14",\n          price: "₹92,990"'),
    ('name: "Refurb iPhone 14 Pro",\n          price: "₹64,999"', 'name: "Refurb iPhone 14 Pro",\n          price: "₹74,990"'),
]

for old_s, new_s in quad_replacements:
    quad_content = quad_content.replace(old_s, new_s)

with open("src/components/redesign/AmazonQuadGrid.jsx", "w", encoding="utf-8") as f:
    f.write(quad_content)
print("AmazonQuadGrid.jsx updated successfully.")

# --- GENERATE NEW products-list.md ---
print("Generating products-list.md with exact configurations and September 2026 prices...")
md_content = """# TecnoMart Official Product Catalog & Master Price List

> **Market Verification Date**: September 13, 2026  
> **Source / Basis**: Current India Market Benchmark & Direct Dealer Street Pricing  
> **Currency**: Indian Rupee (INR / ₹)  
> **Total SKUs**: 114 Active Store Items (25 Mobiles, 25 Laptops, 3 Gaming Rigs, 3 Refurbished, 25 Peripherals, 33 PC Configurator Components)

---

## 1. Smartphones & Flagship Mobiles (25 Products)

| # | Product Name | Exact Configuration | Current Selling Price | Reference MRP | Market Status |
|---|---|---|---|---|---|
| 1 | **Apple iPhone 16 Pro Max** | 256GB Unified Storage | **₹99,999** | ₹1,49,900 | Post-Launch Realignment |
| 2 | **Samsung Galaxy S24 Ultra** | 12GB RAM / 256GB Storage | **₹71,999** | ₹1,34,999 | Best Seller Flagship |
| 3 | **OnePlus 12 5G** | 12GB RAM / 256GB Storage | **₹45,999** | ₹69,999 | Top Performance Value |
| 4 | **Google Pixel 9 Pro** | 16GB RAM / 256GB Storage | **₹1,09,999** | ₹1,09,999 | Google Tensor G4 Flagship |
| 5 | **Apple iPhone 15** | 128GB Storage | **₹59,900** | ₹69,900 | High Volume Retail |
| 6 | **Samsung Galaxy Z Fold 6** | 12GB RAM / 256GB Storage | **₹1,19,999** | ₹1,74,999 | Foldable Flagship |
| 7 | **Apple iPhone 16 Pro** | 128GB Storage | **₹1,09,900** | ₹1,24,900 | Pro Compact Flagship |
| 8 | **Apple iPhone 16** | 128GB Storage | **₹67,490** | ₹82,900 | New Generation Base |
| 9 | **Apple iPhone 16 Plus** | 128GB Storage | **₹79,900** | ₹92,900 | Big Display Value |
| 10 | **Apple iPhone 15 Pro Max** | 256GB Storage | **₹1,19,900** | ₹1,49,900 | Titanium Pro Max |
| 11 | **Apple iPhone 14** | 128GB Storage | **₹51,499** | ₹69,900 | Proven Mainstream |
| 12 | **Apple iPhone 13** | 128GB Storage | **₹39,994** | ₹59,900 | Sub-₹40k Value Pick |
| 13 | **Certified Refurbished iPhone 14 Pro Max** | 128GB Storage (Grade A+) | **₹74,990** | ₹1,39,900 | Certified Pre-owned |
| 14 | **Certified Refurbished iPhone 13 Pro** | 128GB Storage (Grade A+) | **₹52,990** | ₹1,19,900 | 120Hz ProMotion Deal |
| 15 | **Samsung Galaxy S24+ 5G** | 12GB RAM / 256GB Storage | **₹59,999** | ₹99,999 | QHD+ Galaxy AI Flagship |
| 16 | **Samsung Galaxy S24** | 8GB RAM / 256GB Storage | **₹43,999** | ₹79,999 | Compact Flagship |
| 17 | **Samsung Galaxy Z Flip 6** | 12GB RAM / 256GB Storage | **₹79,999** | ₹1,09,999 | Pocket Foldable |
| 18 | **Samsung Galaxy S23 Ultra** | 12GB RAM / 256GB Storage | **₹69,999** | ₹1,24,999 | 100x Zoom Heavyweight |
| 19 | **Certified Refurbished Galaxy S23 Ultra** | 12GB RAM / 256GB Storage | **₹68,999** | ₹1,24,999 | Tested & Verified |
| 20 | **Samsung Galaxy S23 FE 5G** | 8GB RAM / 128GB Storage | **₹37,999** | ₹59,999 | Fan Edition Value |
| 21 | **Samsung Galaxy A55 5G** | 8GB RAM / 128GB Storage | **₹42,999** | ₹44,999 | Metal Frame Mid-Premium |
| 22 | **OnePlus 12R 5G** | 8GB RAM / 256GB Storage | **₹29,999** | ₹45,999 | Snapdragon 8 Gen 2 Beast |
| 23 | **OnePlus Open** | 16GB RAM / 512GB Storage | **₹99,999** | ₹1,39,999 | Dual-Screen Workstation |
| 24 | **OnePlus Nord 4 5G** | 8GB RAM / 128GB Storage | **₹23,999** | ₹29,999 | All-Metal Unibody |
| 25 | **Google Pixel 9 Pro XL** | 16GB RAM / 256GB Storage | **₹1,24,999** | ₹1,29,999 | Ultimate Google Camera |

---

## 2. Laptops & Ultrabooks (25 Products)

| # | Product Name | Exact Configuration | Current Selling Price | Category |
|---|---|---|---|---|
| 1 | **Apple MacBook Pro 16" M3 Max** | 36GB Unified RAM / 1TB SSD | **₹3,49,900** | Creator Workstation |
| 2 | **ASUS ROG Zephyrus G16 (2025)** | Core Ultra 9 / RTX 4080 / OLED | **₹2,19,990** | Ultra-Slim Gaming |
| 3 | **Dell XPS 14 (9440) OLED** | Core Ultra 7 / 3.2K OLED Touch | **₹2,05,990** | Executive Ultrabook |
| 4 | **Apple MacBook Air 15" M3** | 16GB RAM / 512GB SSD | **₹1,44,900** | Thin & Light Work |
| 5 | **Lenovo Legion Pro 5i Gen 9** | i9-14900HX / RTX 4070 / 240Hz | **₹1,62,990** | Competitive Esports |
| 6 | **HP Victus 15 Gaming** | Ryzen 5 / RTX 3050 6GB / 144Hz | **₹69,990** | Budget Gaming |
| 7 | **Apple MacBook Pro 14" M3 Pro** | 18GB RAM / 512GB SSD Space Black | **₹1,89,900** | Studio Mobility |
| 8 | **Apple MacBook Air 13" M2** | 8GB RAM / 256GB SSD Midnight | **₹69,990** | Students & Office |
| 9 | **Certified Refurbished MacBook Pro 14" M1 Pro** | 16GB RAM / 512GB SSD (Grade A+) | **₹92,990** | Refurbished Pro |
| 10 | **Certified Refurbished MacBook Air 13" M1** | 8GB RAM / 256GB SSD (Grade A+) | **₹54,990** | Entry Apple Silicon |
| 11 | **Apple MacBook Pro 16" M2 Max** | 32GB RAM / 1TB SSD Space Gray | **₹2,69,990** | High Performance |
| 12 | **Certified Refurbished MacBook Pro 13" M2** | 8GB RAM / 256GB SSD Touch Bar | **₹69,990** | Compact Pro |
| 13 | **ASUS Zenbook 14 OLED 2025** | Core Ultra 7 / 120Hz 3K OLED | **₹1,04,990** | Premium Ultrabook |
| 14 | **ASUS TUF Gaming A15** | Ryzen 7 7735HS / RTX 4060 | **₹74,990** | High FPS Value |
| 15 | **ASUS ROG Strix SCAR 18** | i9-14900HX / RTX 4090 16GB | **₹3,59,990** | Desktop Replacement |
| 16 | **Certified Refurbished ASUS ROG Zephyrus G14** | Ryzen 9 / RTX 4060 14" AnimeMatrix | **₹82,990** | Portable Beast |
| 17 | **Dell XPS 16 9640** | Core Ultra 7 / 4K+ OLED Touch | **₹2,78,550** | Flagship Creator |
| 18 | **Dell Alienware m18 R2** | i9-14900HX / RTX 4090 / 18" QHD+ | **₹2,96,490** | Extreme Gaming |
| 19 | **Certified Refurbished Dell XPS 13 Plus** | i7-1260P / 16GB / 512GB 3.5K OLED | **₹79,999** | Futuristic Glass |
| 20 | **Dell Inspiron 16 Plus 7630** | i7-13700H / RTX 4060 / 16" 2.5K | **₹1,08,499** | All-Rounder Laptop |
| 21 | **Lenovo Legion Pro 7i Gen 9** | i9-14900HX / RTX 4080 / 32GB | **₹2,39,990** | Tournament Esports |
| 22 | **Lenovo Yoga Slim 7x Copilot+** | Snapdragon X Elite / 3K PureSight | **₹1,29,990** | Next-Gen Copilot+ |
| 23 | **Lenovo ThinkPad X1 Carbon Gen 12** | Core Ultra 7 / 32GB / 1TB Carbon Fiber | **₹2,19,990** | Corporate Standard |
| 24 | **Certified Refurbished ThinkPad T14s Gen 3** | Ryzen 7 PRO / 16GB / 512GB | **₹52,999** | Enterprise Workhorse |
| 25 | **HP Spectre x360 14** | Core Ultra 7 / 2.8K OLED 2-in-1 | **₹1,64,990** | Convertible Luxury |

---

## 3. Gaming Desktops & Custom Rigs (3 Flagship Builds)

| # | Product Name | Architecture | Store Listed Price | Configuration Status |
|---|---|---|---|---|
| 1 | **Apex Liquid-Cooled RTX 4090 Rig** | AMD Ryzen 9 + RTX 4090 24GB Liquid Loop | **₹3,89,999** | Custom Liquid-Cooled |
| 2 | **Valkyrie RTX 4080 Super Tournament Rig** | Intel Core i7 + RTX 4080 Super 16GB | **₹2,29,999** | Competitive 4K Rig |
| 3 | **Stealth Blackout RTX 4070 Ti Super** | AMD Ryzen 7 + RTX 4070 Ti Super | **₹1,69,999** | Zero-RGB Stealth |

---

## 4. Certified Refurbished Flagships (3 Direct Store Warranty Items)

| # | Product Name | Condition & Warranty | Current Selling Price |
|---|---|---|---|
| 1 | **Certified Refurbished MacBook Pro 14" M1 Pro** | Grade A+ Mint, 12 Months Warranty | **₹92,990** |
| 2 | **Certified Refurbished iPhone 14 Pro Max 128GB** | Grade A+ Mint, 6 Months Warranty | **₹74,990** |
| 3 | **Certified Refurbished Dell XPS 13 Plus** | Grade A+ Mint, 6 Months Warranty | **₹79,999** |

---

## 5. Peripherals, Audio & Tech Accessories (25 Products)

| # | Product Name | Current Selling Price | Reference Category |
|---|---|---|---|
| 1 | **Apple AirPods Pro 2nd Gen USB-C** | **₹21,990** | True Wireless ANC |
| 2 | **Sony WH-1000XM5 Wireless Headphones** | **₹28,304** | Over-Ear Noise Canceling |
| 3 | **Anker 737 GaNPrime 24,000mAh 140W** | **₹11,999** | High-Wattage Power Bank |
| 4 | **Keychron Q1 Pro Wireless Mechanical Keyboard** | **₹16,499** | Custom Aluminum Keyboard |
| 5 | **Logitech G PRO X SUPERLIGHT 2** | **₹13,995** | Esports Wireless Mouse |
| 6 | **Apple 20W USB-C Power Adapter** | **₹1,699** | Official Fast Charger |
| 7 | **Apple MagSafe Charger (1m)** | **₹3,999** | Magnetic Wireless |
| 8 | **boAt Wave Ultima Smartwatch** | **₹1,499** | Bluetooth Calling Watch |
| 9 | **Samsung 45W Power Adapter + Cable** | **₹999** | Super Fast Charging 2.0 |
| 10 | **Apple Magic Keyboard Touch ID + Numeric Keypad** | **₹16,399** | Wireless Desktop Typing |
| 11 | **Certified Refurbished AirPods Max Space Gray** | **₹36,990** | Premium Over-Ear Audio |
| 12 | **Bose QuietComfort Ultra Headphones** | **₹32,900** | Spatial Audio ANC |
| 13 | **SanDisk Extreme Portable SSD 1TB** | **₹9,499** | 1050MB/s Rugged Storage |
| 14 | **Satechi USB-C Multiport Pro Hub 8K** | **₹7,999** | 8K HDMI & Ethernet Hub |
| 15 | **Nomad Titanium Band Apple Watch Ultra 49mm** | **₹18,999** | Grade 2 Titanium Link |
| 16 | **Spigen Rugged Armor MagFit iPhone 16 Pro Max** | **₹1,899** | Shock Absorption Case |
| 17 | **Ugreen Nexode 100W 4-Port GaN Charger** | **₹5,499** | Multi-Device Fast Charge |
| 18 | **Shure SM7B Vocal Dynamic Microphone** | **₹34,990** | Studio Broadcast Mic |
| 19 | **Elgato Stream Deck MK.2** | **₹14,999** | 15 LCD Studio Keys |
| 20 | **Apple Pencil Pro** | **₹11,900** | Haptic Barrel Roll Stylus |
| 21 | **Certified Refurbished Apple Watch Ultra 2 49mm** | **₹59,990** | Cellular Rugged Watch |
| 22 | **Sony WF-1000XM5 True Wireless Earbuds** | **₹16,999** | Dual Feedback ANC |
| 23 | **SteelSeries Apex Pro TKL Wireless Gen 3** | **₹24,990** | OmniPoint 3.0 Switches |
| 24 | **Marshall Stanmore III Bluetooth Speaker** | **₹37,999** | Home Audio Speaker |
| 25 | **Belkin BoostCharge Pro 3-in-1 MagSafe Stand** | **₹12,999** | 15W Fast Wireless Stand |

---

## 6. Custom PC Configurator Components (33 Items)

| # | Component Name | Category | Current Price (INR) | Specification Notes |
|---|---|---|---|---|
| 1 | **AMD Ryzen 5 9600X** | CPU | **₹20,690** | 6 Cores, 12 Threads, AM5 |
| 2 | **AMD Ryzen 7 9700X** | CPU | **₹31,999** | 8 Cores, 16 Threads, AM5 |
| 3 | **AMD Ryzen 9 9950X** | CPU | **₹56,999** | 16 Cores, 32 Threads, AM5 |
| 4 | **Intel Core Ultra 5 245K** | CPU | **₹23,959** | 14 Cores, LGA1851 Arrow Lake |
| 5 | **Intel Core Ultra 7 265K** | CPU | **₹32,999** | 20 Cores, LGA1851 Arrow Lake |
| 6 | **Intel Core Ultra 9 285K** | CPU | **₹65,500** | 24 Cores, 24 Threads Arrow Lake |
| 7 | **GeForce RTX 5060 8GB** | GPU | **₹36,000** | Next-Gen Blackwell Architecture |
| 8 | **Radeon RX 9070 16GB** | GPU | **₹65,000** | High VRAM 1440p / 4K Gaming |
| 9 | **GeForce RTX 5070 12GB** | GPU | **₹65,000** | DLSS 4 / Blackwell High FPS |
| 10 | **GeForce RTX 5090 32GB** | GPU | **₹4,50,000** | Ultimate Enthusiast AI & 8K |
| 11 | **Gigabyte B650M DS3H** | Motherboard | **₹14,900** | Micro-ATX, AM5, DDR5 |
| 12 | **ASUS TUF Gaming X670E-PLUS** | Motherboard | **₹28,999** | ATX, PCIe 5.0, AM5 |
| 13 | **MSI PRO B860M-A WIFI** | Motherboard | **₹17,999** | Micro-ATX, LGA1851, DDR5 |
| 14 | **MSI MAG Z890 TOMAHAWK WIFI** | Motherboard | **₹34,999** | ATX, Thunderbolt 4, LGA1851 |
| 15 | **Corsair Vengeance 16GB (2x8GB) DDR5-5200** | RAM | **₹5,999** | Dual Channel DDR5 Kit |
| 16 | **G.Skill Trident Z5 32GB (2x16GB) DDR5-6000** | RAM | **₹11,999** | CL30 Low Latency Gaming Kit |
| 17 | **Kingston Fury Beast 64GB (2x32GB) DDR5-6400** | RAM | **₹19,999** | High-Capacity Workstation Kit |
| 18 | **Crucial P3 Plus 1TB NVMe** | Storage | **₹6,499** | PCIe 4.0 up to 5,000 MB/s |
| 19 | **Samsung 990 PRO 2TB NVMe** | Storage | **₹17,999** | Flagship PCIe 4.0 up to 7,450 MB/s |
| 20 | **WD Black SN850X 4TB NVMe** | Storage | **₹31,999** | Ultra High-Capacity Gaming SSD |
| 21 | **Corsair CX650M 650W** | Power Supply | **₹7,499** | 80+ Bronze Semi-Modular |
| 22 | **MSI MPG A850G 850W** | Power Supply | **₹11,999** | 80+ Gold PCIe 5.0 ATX 3.0 |
| 23 | **Seasonic Focus GX-1000 1000W** | Power Supply | **₹18,999** | 80+ Gold Fully Modular |
| 24 | **Corsair RM1200x Shift 1200W** | Power Supply | **₹29,999** | 80+ Gold Side-Interface Modular |
| 25 | **DeepCool AK400** | Cooler | **₹2,999** | Single-Tower Air Cooler |
| 26 | **Arctic Liquid Freezer III 240** | Cooler | **₹8,999** | 240mm AIO Liquid Cooler |
| 27 | **Corsair iCUE H150i Elite** | Cooler | **₹15,999** | 360mm RGB AIO Liquid Cooler |
| 28 | **Montech AIR 100 ARGB** | Cabinet | **₹5,999** | Micro-ATX Mesh with 4 Fans |
| 29 | **Corsair 4000D Airflow** | Cabinet | **₹8,499** | Mid-Tower High Airflow |
| 30 | **Lian Li O11 Dynamic EVO** | Cabinet | **₹14,999** | Dual-Chamber Tempered Glass |
| 31 | **AOC 24G2SP 24" 165Hz** | Monitor | **₹12,999** | 1080p IPS 1ms Gaming Monitor |
| 32 | **LG 27GP850-B 27" 165Hz** | Monitor | **₹27,999** | 1440p Nano-IPS 1ms HDR |
| 33 | **Alienware AW3225QF 32" 4K OLED** | Monitor | **₹1,14,999** | 4K QD-OLED 240Hz Curved Gaming |
"""

with open("products-list.md", "w", encoding="utf-8") as f:
    f.write(md_content)
print("products-list.md generated successfully.")
print("ALL PRICING UPDATES COMPLETE!")
