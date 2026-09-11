/**
 * TecnoMart Linktree / Quick QR Scan Links Configuration
 * Accessible at: scan.tecnomart.in (and /scan)
 *
 * Easy to maintain: Simply add or edit items in `SCAN_LINKS` to add new links over time!
 */

export interface ScanLink {
  id: string;
  name: string;
  url: string;
  icon: "whatsapp" | "instagram" | "facebook" | "google" | "mail" | "globe" | "gift" | "phone" | string;
  button: string; // The button label (e.g., "Chat on WhatsApp", "Follow", "Rate Us")
  buttonText?: string; // Fallback alias
  badge?: string;
  primary?: boolean;
}

export interface ScanProfile {
  name: string;
  tagline: string;
  location: string;
  verified: boolean;
  logoUrl: string;
}

export const SCAN_PROFILE: ScanProfile = {
  name: "TECNOMART",
  tagline: "Hyderabad's Authorized Tech Retailer & Certified Service Hub",
  location: "Tolichowki, Hyderabad",
  verified: true,
  logoUrl: "/webp/logo.webp",
};

// WhatsApp support pre-filled greeting message
const WHATSAPP_SUPPORT_MESSAGE = encodeURIComponent(
  "Hi TecnoMart! 👋 I scanned your store QR code. I would like to inquire about products, daily offers, or device repair service in Hyderabad. Could you please assist me?"
);

/**
 * SCAN_LINKS: Add new links here easily at any time!
 * Just provide: name, url, icon, button
 */
export const SCAN_LINKS: ScanLink[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Support",
    url: `https://wa.me/919010667726?text=${WHATSAPP_SUPPORT_MESSAGE}`,
    icon: "whatsapp",
    button: "Chat on WhatsApp",
    buttonText: "Chat on WhatsApp",
    badge: "Instant Reply",
    primary: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/tecnomart.hyd",
    icon: "instagram",
    button: "Follow on Instagram",
    buttonText: "Follow on Instagram",
    badge: "@tecnomart.hyd",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/tecnomarthyd",
    icon: "facebook",
    button: "Connect on Facebook",
    buttonText: "Connect on Facebook",
  },
  {
    id: "google-business",
    name: "Google Business & Reviews",
    url: "https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Opposite+Fortune+Toyota+Service+Center+7+Tombs+Road+Tolichowki+Hyderabad",
    icon: "google",
    button: "Find Us / Rate on Google",
    buttonText: "Find Us / Rate on Google",
    badge: "4.9 ★ Rating",
  },
  {
    id: "email",
    name: "Customer Support Email",
    url: "mailto:support@tecnomart.in?subject=Customer%20Inquiry%20via%20QR%20Scan",
    icon: "mail",
    button: "Email Support Team",
    buttonText: "Email Support Team",
    badge: "support@tecnomart.in",
  },
  {
    id: "website",
    name: "Official Store Website",
    url: "https://tecnomart.in",
    icon: "globe",
    button: "Browse Store Catalog",
    buttonText: "Browse Store Catalog",
  },
  {
    id: "spin",
    name: "Spin & Win Daily Rewards",
    url: "https://spin.tecnomart.in",
    icon: "gift",
    button: "Spin The Reward Wheel",
    buttonText: "Spin The Reward Wheel",
    badge: "Guaranteed Prize",
  },
];
