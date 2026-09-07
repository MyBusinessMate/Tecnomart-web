const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function getRandomString(length: number): string {
  let result = "";
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      result += CHARSET[bytes[i] % CHARSET.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
    }
  }
  return result;
}

/**
 * Generates a unique coupon code in the format TM-XXXX-XX
 * Example: TM-X7K9-P2
 */
export function generateCouponCode(): string {
  const part1 = getRandomString(4);
  const part2 = getRandomString(2);
  return `TM-${part1}-${part2}`;
}

export function sanitizeCouponCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
}
