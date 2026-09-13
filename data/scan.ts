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
  primary?: boolean;
}

export interface ScanProfile {
  name: string;
  tagline: string;
  location: string;
  address: string;
  verified: boolean;
  logoUrl: string;
  mapsUrl: string;
}

export const SCAN_PROFILE: ScanProfile = {
  name: "TECNOMART",
  tagline: "Hyderabad's Authorized Tech Retailer & Certified Service Hub",
  location: "Tolichowki, Hyderabad",
  address: "7 Tombs Rd, Raghava Colony, Neeraj Colony, Toli Chowki, Hyderabad, Telangana 500008",
  verified: true,
  logoUrl: "/webp/logo.webp",
  mapsUrl: "https://maps.app.goo.gl/8ZeEuSuASBZwx1Ci7?g_st=ac",
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
    button: "Chat with us on WhatsApp",
    buttonText: "Chat with us on WhatsApp",
    primary: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/tecnomart.hyd",
    icon: "instagram",
    button: "Follow for updates & offers",
    buttonText: "Follow for updates & offers",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/share/1Hhx6x3meS/?mibextid=wwXIfr",
    icon: "facebook",
    button: "Connect with us",
    buttonText: "Connect with us",
  },
  {
    id: "google-business",
    name: "Google Business & Reviews",
    url: "https://maps.app.goo.gl/8ZeEuSuASBZwx1Ci7?g_st=ac",
    icon: "google",
    button: "Find us / Rate us on Google",
    buttonText: "Find us / Rate us on Google",
  },
  {
    id: "email",
    name: "Customer Support Email",
    url: "mailto:support@tecnomart.in?subject=Customer%20Inquiry%20via%20QR%20Scan",
    icon: "mail",
    button: "Reach our support team",
    buttonText: "Reach our support team",
  },
  {
    id: "website",
    name: "Official Store Website",
    url: "https://tecnomart.in",
    icon: "globe",
    button: "Browse our store catalog",
    buttonText: "Browse our store catalog",
  },
  {
    id: "spin",
    name: "Spin & Win Daily Rewards",
    url: "https://spin.tecnomart.in",
    icon: "gift",
    button: "Spin the reward wheel",
    buttonText: "Spin the reward wheel",
  },
];
