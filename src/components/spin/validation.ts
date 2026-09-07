/**
 * Validates an Indian mobile number.
 * Accepts formats: +91 9876543210, 9876543210, +919876543210, +91 98765 43210, etc.
 */
export function validateIndianPhone(phone: string): { isValid: boolean; formatted: string } {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  const match = cleaned.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  
  if (!match) {
    return { isValid: false, formatted: phone };
  }
  
  const nationalNumber = match[1];
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
