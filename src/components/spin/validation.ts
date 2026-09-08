/**
 * Strictly validates an Indian mobile number.
 * Accepts 10 digits starting with 6, 7, 8, or 9.
 * Rejects fake patterns, repetitive digits, sequential numbers, and invalid sequences.
 */
export function validateIndianPhone(phone: string): { isValid: boolean; formatted: string; error?: string } {
  if (!phone || typeof phone !== "string") {
    return { isValid: false, formatted: phone, error: "Mobile number is required." };
  }

  // Remove whitespace, dashes, parens
  const cleaned = phone.replace(/[\s\-()]/g, "");

  // Match national 10-digit number optionally prefixed with +91, 91, or 0
  const match = cleaned.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  
  if (!match) {
    // If it has letters or wrong length
    if (/[a-zA-Z]/.test(phone)) {
      return { isValid: false, formatted: phone, error: "Alphabets are not allowed in mobile number." };
    }
    const digitsOnly = cleaned.replace(/\D/g, "");
    if (digitsOnly.length > 0 && !/^[6-9]/.test(digitsOnly.slice(-10))) {
      return { isValid: false, formatted: phone, error: "Indian mobile numbers must start with 6, 7, 8, or 9." };
    }
    return { isValid: false, formatted: phone, error: "Please enter a valid 10-digit mobile number." };
  }
  
  const nationalNumber = match[1];

  // 1. Check for all repeated digits (e.g., 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(nationalNumber)) {
    return { isValid: false, formatted: phone, error: "Please enter a valid, active phone number." };
  }

  // 2. Check for sequential sequences (e.g., 1234567890, 9876543210, etc.)
  const sequentialPatterns = [
    "1234567890",
    "0123456789",
    "9876543210",
    "8765432109",
    "2345678901",
    "6789012345",
  ];
  if (sequentialPatterns.includes(nationalNumber)) {
    return { isValid: false, formatted: phone, error: "Sequential phone numbers are not accepted." };
  }

  // 3. Check for repeating pairs or triplets (e.g., 9898989898, 9191919191)
  const pair = nationalNumber.slice(0, 2);
  if (nationalNumber === pair.repeat(5)) {
    return { isValid: false, formatted: phone, error: "Repetitive pattern detected. Enter your real mobile number." };
  }

  // 4. Check for minimum unique digits (at least 4 unique digits)
  const uniqueDigits = new Set(nationalNumber.split(""));
  if (uniqueDigits.size < 4) {
    return { isValid: false, formatted: phone, error: "Please enter a genuine 10-digit mobile number." };
  }

  const formatted = `+91 ${nationalNumber.slice(0, 5)} ${nationalNumber.slice(5)}`;
  return { isValid: true, formatted };
}

/**
 * Masks a phone number to protect customer privacy (e.g., +91 ******9877)
 */
export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  const match = cleaned.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  if (!match) {
    if (phone.length > 4) {
      return phone.slice(0, 3) + "******" + phone.slice(-4);
    }
    return phone;
  }
  const digits = match[1];
  return `+91 ******${digits.slice(-4)}`;
}

export function validateEmail(email?: string): boolean {
  if (!email || email.trim() === "") return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}
