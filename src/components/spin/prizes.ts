export interface PrizeDefinition {
  id: string;
  name: string;
  type: "coupon" | "product";
  image: string;
  description: string;
  value: number;
  probability: number; // percentage e.g. 20
  stock: number;
  active: boolean;
  colorTheme: "black" | "yellow" | "graphite" | "gold";
}

/**
 * EXACT WHEEL PRIZE ORDER (Clockwise starting from 12 o'clock top segment):
 * 1. DATA CABLE
 * 2. WIRELESS HEADPHONES
 * 3. PHONE COVERS
 * 4. ₹500 COUPON
 * 5. ₹1500 COUPON
 * 6. ₹2000 COUPON
 * 7. WIRED HEADPHONES
 * 8. NECK BAND
 */
export const DEFAULT_PRIZES: PrizeDefinition[] = [
  {
    id: "prize_data_cable",
    name: "DATA CABLE",
    type: "product",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224989/61_gaaibi.jpg",
    description: "Ultra-durable fast charging braided data transfer cable",
    value: 299,
    probability: 15,
    stock: 600,
    active: true,
    colorTheme: "yellow",
  },
  {
    id: "prize_wireless_headphones",
    name: "WIRELESS HEADPHONES",
    type: "product",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787225045/61_x0q9bz.png",
    description: "Premium wireless over-ear noise-isolating headphones",
    value: 1499,
    probability: 10,
    stock: 150,
    active: true,
    colorTheme: "black",
  },
  {
    id: "prize_phone_covers",
    name: "PHONE COVERS",
    type: "product",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787225102/62_pb8dxs.jpg",
    description: "Designer shockproof protective smartphone case",
    value: 399,
    probability: 15,
    stock: 500,
    active: true,
    colorTheme: "yellow",
  },
  {
    id: "prize_500_coupon",
    name: "₹500 COUPON",
    type: "coupon",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224631/56_cerwkr.jpg",
    description: "₹500 in-store discount voucher for tech services & accessories",
    value: 500,
    probability: 20,
    stock: 1000,
    active: true,
    colorTheme: "black",
  },
  {
    id: "prize_1500_coupon",
    name: "₹1500 COUPON",
    type: "coupon",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224707/57_gky26d.png",
    description: "₹1500 premium discount voucher on gadgets & repairs",
    value: 1500,
    probability: 8,
    stock: 500,
    active: true,
    colorTheme: "yellow",
  },
  {
    id: "prize_2000_coupon",
    name: "₹2000 COUPON",
    type: "coupon",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224771/58_hj8npj.jpg",
    description: "₹2000 mega discount voucher on top tech purchases",
    value: 2000,
    probability: 5,
    stock: 300,
    active: true,
    colorTheme: "black",
  },
  {
    id: "prize_wired_headphones",
    name: "WIRED HEADPHONES",
    type: "product",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224830/59_yg99ea.png",
    description: "High-clarity bass wired headphones with built-in mic",
    value: 699,
    probability: 15,
    stock: 400,
    active: true,
    colorTheme: "yellow",
  },
  {
    id: "prize_neck_band",
    name: "NECK BAND",
    type: "product",
    image: "https://res.cloudinary.com/akmdvmmw/image/upload/v1787224880/60_c5w9oh.webp",
    description: "Wireless magnetic sports neckband with fast charging",
    value: 999,
    probability: 12,
    stock: 350,
    active: true,
    colorTheme: "black",
  },
];

/**
 * Helper to get prize image by name or id
 */
export function getPrizeImage(prizeIdOrName?: string): string {
  if (!prizeIdOrName) return DEFAULT_PRIZES[0].image;
  const match = DEFAULT_PRIZES.find(
    (p) =>
      p.id.toLowerCase() === prizeIdOrName.toLowerCase() ||
      p.name.toLowerCase() === prizeIdOrName.toLowerCase()
  );
  return match ? match.image : DEFAULT_PRIZES[0].image;
}

/**
 * Cryptographically selects a winning prize from a list based on weighted probabilities
 */
export function selectWinningPrize<
  T extends { id: string; probability: number; stock: number; active: boolean }
>(prizes: T[]): T {
  const eligible = prizes.filter((p) => p.active && p.stock > 0);
  if (eligible.length === 0) {
    return prizes[0];
  }

  const totalWeight = eligible.reduce((acc, curr) => acc + curr.probability, 0);

  let randomRatio = Math.random();
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    randomRatio = arr[0] / 0xffffffff;
  }
  let target = randomRatio * totalWeight;

  for (const prize of eligible) {
    if (target < prize.probability) {
      return prize;
    }
    target -= prize.probability;
  }

  return eligible[eligible.length - 1];
}
