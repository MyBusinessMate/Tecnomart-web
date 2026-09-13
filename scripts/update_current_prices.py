import re
import json

def format_inr(val):
    s = str(val)
    if len(s) <= 3:
        return "₹" + s
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while len(rest) > 2:
        parts.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        parts.insert(0, rest)
    return "₹" + ",".join(parts) + "," + last3

# Mobiles updates
mobiles_updates = {
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

# Laptops updates
laptops_updates = {
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

# Gaming updates
gaming_updates = {
    "gaming-1": {"price": 389999, "name": "Apex Liquid-Cooled RTX 4090 Rig"},
    "gaming-2": {"price": 229999, "name": "Valkyrie RTX 4080 Super Tournament Rig"},
    "gaming-3": {"price": 169999, "name": "Stealth Blackout RTX 4070 Ti Super"},
}

# Refurbished updates
refurb_updates = {
    "refurb-1": {"price": 92990, "name": "Certified Refurbished MacBook Pro 14\" M1 Pro"},
    "refurb-2": {"price": 74990, "name": "Certified Refurbished iPhone 14 Pro Max 128GB"},
    "refurb-3": {"price": 79999, "name": "Certified Refurbished Dell XPS 13 Plus"},
}

# Accessories updates
acc_updates = {
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

# PC Parts updates
catalog_updates = {
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

print("Loaded all updates mappings.")
