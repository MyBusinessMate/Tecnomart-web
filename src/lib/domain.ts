/**
 * Domain and subdomain helper utilities for TecnoMart multi-domain architecture.
 * Primary domain: tecnomart.in (Showroom & E-commerce)
 * Subdomain: spin.tecnomart.in (Interactive Spin & Win Machine)
 */

export const STORE_DOMAIN = "https://tecnomart.in";
export const SPIN_DOMAIN = "https://spin.tecnomart.in";
export const SCAN_DOMAIN = "https://scan.tecnomart.in";

/**
 * Checks if the current window location is running under the spin subdomain
 * (e.g. spin.tecnomart.in, spin.localhost, or locally with ?subdomain=spin)
 */
export function isSpinSubdomain(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname.toLowerCase();

  // Explicit subdomain query parameter for easy testing in any dev environment
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("subdomain") === "spin") {
    return true;
  }

  // Exact match or prefix match for spin subdomain
  if (hostname === "spin.tecnomart.in" || hostname.startsWith("spin.")) {
    return true;
  }

  return false;
}

/**
 * Checks if the current window location is running under the scan subdomain
 * (e.g. scan.tecnomart.in, scan.tecnoomart.in, scan.localhost, or locally with ?subdomain=scan)
 */
export function isScanSubdomain(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname.toLowerCase();

  // Explicit subdomain query parameter for easy testing in any dev environment
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("subdomain") === "scan") {
    return true;
  }

  // Matches scan.tecnomart.in, scan.tecnoomart.in, or any scan.* subdomain
  if (
    hostname === "scan.tecnomart.in" ||
    hostname === "scan.tecnoomart.in" ||
    hostname.startsWith("scan.")
  ) {
    return true;
  }

  return false;
}

/**
 * Checks if current environment is running on the live production domain
 */
export function isProductionDomain(): boolean {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname.toLowerCase();
  return hostname.includes("tecnomart.in");
}

/**
 * Resolves the URL for the main storefront (tecnomart.in).
 * In local development when not on the production domain, it falls back to local origin or relative path.
 */
export function getStoreUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (typeof window === "undefined") return `${STORE_DOMAIN}${cleanPath}`;

  if (isProductionDomain()) {
    return `${STORE_DOMAIN}${cleanPath}`;
  }

  // In local development, if on spin.localhost or ?subdomain=spin, direct to base localhost
  if (isSpinSubdomain()) {
    const port = window.location.port ? `:${window.location.port}` : "";
    return `${window.location.protocol}//localhost${port}${cleanPath}`;
  }

  return cleanPath;
}

/**
 * Resolves the URL for the Spin & Win subdomain (spin.tecnomart.in).
 * In local development, it links to /spin or keeps the subdomain parameter.
 */
export function getSpinUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window === "undefined") {
    return `${SPIN_DOMAIN}${cleanPath === "/spin" ? "/" : cleanPath}`;
  }

  if (isProductionDomain()) {
    // On the spin subdomain, /spin maps to the root /
    const targetPath = cleanPath === "/spin" ? "/" : cleanPath;
    return `${SPIN_DOMAIN}${targetPath}`;
  }

  // In local development:
  // If already on spin subdomain or emulation, use relative path
  if (isSpinSubdomain()) {
    return cleanPath === "/spin" ? "/" : cleanPath;
  }

  // If on regular localhost, keep dev workflow seamless:
  // Can use /spin or ?subdomain=spin
  if (cleanPath === "/" || cleanPath === "/spin") {
    return "/spin";
  }
  return cleanPath;
}

/**
 * Resolves the URL for the Scan / Quick Links subdomain (scan.tecnomart.in).
 * In local development, it links to /scan or keeps the subdomain parameter.
 */
export function getScanUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window === "undefined") {
    return `${SCAN_DOMAIN}${cleanPath === "/scan" ? "/" : cleanPath}`;
  }

  if (isProductionDomain()) {
    const targetPath = cleanPath === "/scan" ? "/" : cleanPath;
    return `${SCAN_DOMAIN}${targetPath}`;
  }

  // In local development:
  if (isScanSubdomain()) {
    return cleanPath === "/scan" ? "/" : cleanPath;
  }

  if (cleanPath === "/" || cleanPath === "/scan") {
    return "/scan";
  }
  return cleanPath;
}

