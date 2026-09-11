import React from 'react';
import {
  SCAN_PROFILE,
  SCAN_LINKS,
  ScanLink,
} from '@data/scan';
import SEO from '@/components/SEO';
import {
  Mail,
  Globe,
  Gift,
  Phone,
  ExternalLink,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

function BrandIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'whatsapp':
      return (
        <svg
          className="w-5 h-5 fill-current text-[#25D366]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.214 8.214 0 0 1-5.83 2.41c-1.47 0-2.91-.39-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.23-8.24zm4.5 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          className="w-5 h-5 fill-current text-[#E4405F]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          className="w-5 h-5 fill-current text-[#1877F2]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'google':
      return (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27a7.22 7.22 0 0 1 0-4.54V6.58H1.25a11.98 11.98 0 0 0 0 10.84l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      );
    case 'mail':
      return <Mail className="w-5 h-5 text-amber-400" />;
    case 'globe':
      return <Globe className="w-5 h-5 text-blue-400" />;
    case 'gift':
      return <Gift className="w-5 h-5 text-purple-400" />;
    case 'phone':
      return <Phone className="w-5 h-5 text-emerald-400" />;
    default:
      return <ExternalLink className="w-5 h-5 text-neutral-400" />;
  }
}

export default function ScanPage() {
  return (
    <>
      <SEO
        title={`${SCAN_PROFILE.name} | Official Connect & Store Links`}
        description={`Connect with ${SCAN_PROFILE.name} on WhatsApp, Instagram, Facebook, Google Maps & Support. Hyderabad's authorized tech retailer.`}
        canonicalUrl="https://scan.tecnomart.in"
      />

      <main className="min-h-screen w-full bg-[#09090b] text-white flex flex-col items-center justify-between px-4 py-12 selection:bg-[#F5B800] selection:text-black antialiased relative overflow-x-hidden">
        {/* Subtle atmospheric ambient glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="w-full max-w-md mx-auto flex flex-col items-center relative z-10">
          {/* Header Profile Section */}
          <header className="flex flex-col items-center text-center mb-8 w-full">
            {/* Logo */}
            <div className="relative mb-4 group">
              <div className="w-24 h-24 rounded-3xl p-1 bg-gradient-to-tr from-[#F5B800] via-amber-400 to-amber-200/40 shadow-2xl shadow-amber-500/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-[22px] bg-black p-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={SCAN_PROFILE.logoUrl}
                    alt={SCAN_PROFILE.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if webp fails
                      e.currentTarget.src = '/logo.png';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Brand Name & Verified Badge */}
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-2xl font-extrabold tracking-wider font-mono uppercase text-white">
                {SCAN_PROFILE.name}
              </h1>
              {SCAN_PROFILE.verified && (
                <CheckCircle2
                  className="w-5 h-5 text-[#F5B800] fill-[#F5B800]/20"
                  aria-label="Verified Store"
                />
              )}
            </div>

            {/* Tagline */}
            {SCAN_PROFILE.tagline && (
              <p className="text-xs text-neutral-400 mt-2 max-w-xs leading-relaxed">
                {SCAN_PROFILE.tagline}
              </p>
            )}

            {/* Location */}
            {SCAN_PROFILE.location && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300">
                <MapPin className="w-3 h-3 text-[#F5B800]" />
                <span>{SCAN_PROFILE.location}</span>
              </div>
            )}
          </header>

          {/* Links Stack (Linktree Style) */}
          <section
            aria-label="Quick Links"
            className="w-full space-y-3"
          >
            {SCAN_LINKS.map((link: ScanLink) => {
              const isPrimary = Boolean(link.primary);
              const label = link.button || link.buttonText || link.name;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                    isPrimary
                      ? 'bg-[#25D366]/15 hover:bg-[#25D366]/25 border-2 border-[#25D366]/60 hover:border-[#25D366] text-white shadow-lg shadow-[#25D366]/10 hover:scale-[1.01]'
                      : 'bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800/90 hover:border-[#F5B800]/50 text-neutral-200 shadow-md shadow-black/40 hover:scale-[1.01]'
                  }`}
                >
                  {/* Left: Icon & Text */}
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isPrimary
                          ? 'bg-[#25D366]/20 text-[#25D366]'
                          : 'bg-white/5 text-neutral-300'
                      }`}
                    >
                      <BrandIcon icon={link.icon} />
                    </div>

                    <div className="text-left truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-tight truncate">
                          {link.name}
                        </span>
                        {link.badge && (
                          <span
                            className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                              isPrimary
                                ? 'bg-[#25D366] text-black'
                                : 'bg-[#F5B800]/20 text-[#F5B800] border border-[#F5B800]/30'
                            }`}
                          >
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 font-normal truncate mt-0.5">
                        {label}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Arrow */}
                  <div className="shrink-0 pl-1 text-neutral-500 group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </section>

          {/* Quick Support Callout */}
          <div className="mt-8 w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-xs text-neutral-400">
              Need immediate store assistance in Hyderabad?
            </p>
            <p className="text-xs font-mono text-[#F5B800] font-semibold mt-1">
              Call / WhatsApp: +91 90106 67726
            </p>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-12 text-center text-xs text-neutral-500 font-mono relative z-10">
          <p>© {new Date().getFullYear()} TECNOMART. ALL RIGHTS RESERVED.</p>
        </footer>
      </main>
    </>
  );
}
