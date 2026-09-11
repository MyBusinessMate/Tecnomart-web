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
  ArrowRight,
  MapPin,
} from 'lucide-react';

function BrandIconBadge({ icon }: { icon: string }) {
  switch (icon) {
    case 'whatsapp':
      return (
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
          <svg
            className="w-6 h-6 fill-white text-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.214 8.214 0 0 1-5.83 2.41c-1.47 0-2.91-.39-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.23-8.24zm4.5 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
          </svg>
        </div>
      );
    case 'instagram':
      return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center shrink-0 shadow-xs">
          <svg
            className="w-6 h-6 text-white stroke-white fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      );
    case 'facebook':
      return (
        <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0 shadow-xs">
          <svg
            className="w-6 h-6 fill-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      );
    case 'google':
      return (
        <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6"
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
        </div>
      );
    case 'mail':
      return (
        <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0 shadow-xs">
          <Mail className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
      );
    case 'globe':
      return (
        <div className="w-12 h-12 rounded-full bg-[#0284C7] flex items-center justify-center shrink-0 shadow-xs">
          <Globe className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
      );
    case 'gift':
      return (
        <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center shrink-0 shadow-xs">
          <Gift className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 shadow-xs">
          <Globe className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
      );
  }
}

export default function ScanPage() {
  return (
    <>
      <SEO
        title={`${SCAN_PROFILE.name} | Official Connect & Store Links`}
        description={`Connect with ${SCAN_PROFILE.name} on WhatsApp, Instagram, Facebook, Google Maps & Support. Hyderabad's authorized tech retailer.`}
        keywords="TecnoMart, TecnoMart Hyderabad, Quick Links, WhatsApp Support, Tolichowki"
        canonical="https://scan.tecnomart.in"
        canonicalUrl="https://scan.tecnomart.in"
        ogImageAlt={`${SCAN_PROFILE.name} Official Links`}
      />

      <main className="min-h-screen w-full bg-white text-neutral-900 relative overflow-hidden flex flex-col justify-between items-center py-8 px-4 sm:py-10 antialiased selection:bg-[#FFD21C] selection:text-neutral-950">
        
        {/* ========================================================= */}
        {/* BACKGROUND GRAPHIC ORBS, CURVED LINES & DOT MATRICES     */}
        {/* ========================================================= */}

        {/* 1. Top-Left Delicate Concentric Wireframe Arcs */}
        <svg
          className="absolute -top-36 -left-36 w-[560px] h-[560px] pointer-events-none select-none z-0"
          viewBox="0 0 500 500"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="150" cy="150" r="320" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="150" cy="150" r="260" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.22" />
          <circle cx="150" cy="150" r="190" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.16" />
        </svg>

        {/* 2. Top-Left Subtle Glowing Crescent Arc */}
        <div
          className="absolute top-16 -left-28 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[2px] border-amber-300/40 pointer-events-none select-none z-0"
          aria-hidden="true"
        />

        {/* 3. Top-Right Dot Grid (3 columns x 5 rows) */}
        <div
          className="absolute top-28 right-8 sm:right-16 grid grid-cols-3 gap-3.5 pointer-events-none select-none z-0 opacity-40 hidden sm:grid"
          aria-hidden="true"
        >
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          ))}
        </div>

        {/* 4. Mid-Left Dot Grid (5 columns x 4 rows) */}
        <div
          className="absolute top-[52%] left-6 sm:left-14 grid grid-cols-5 gap-3.5 pointer-events-none select-none z-0 opacity-40 hidden sm:grid"
          aria-hidden="true"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          ))}
        </div>

        {/* 5. Right-Side Vibrant Yellow Crescent + Ambient Orbit */}
        <div
          className="absolute -right-32 sm:-right-40 top-[38%] pointer-events-none select-none z-0 hidden sm:block"
          aria-hidden="true"
        >
          {/* Main Bright Yellow Crescent Orb */}
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#FFD21C] to-[#F59E0B] shadow-[0_0_80px_rgba(251,191,36,0.35)] relative">
            {/* Overlapping translucent ring */}
            <div className="absolute -inset-10 rounded-full border border-amber-400/40" />
          </div>
        </div>

        {/* 6. Bottom-Left Warm Ambient Glow */}
        <div
          className="absolute -bottom-28 -left-28 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFD21C] to-[#F59E0B] opacity-80 blur-xs pointer-events-none select-none z-0"
          aria-hidden="true"
        />

        {/* 7. Bottom-Right Concentric Thin Wire Arc */}
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 rounded-full border-[1.5px] border-amber-300/40 pointer-events-none select-none z-0"
          aria-hidden="true"
        />

        {/* ========================================================= */}
        {/* TOP MICRO-HEADER LABELS (Desktop and Tablet)              */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1200px] mx-auto flex items-start justify-between relative z-10 px-2 sm:px-8 mb-6">
          {/* Top-Left: TECH / PEOPLE / TRUST */}
          <div className="text-left select-none pointer-events-none">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold leading-relaxed">
              <div>TECH</div>
              <div>PEOPLE</div>
              <div>TRUST</div>
            </div>
          </div>

          {/* Top-Right: SALES • SERVICE • SUPPORT — */}
          <div className="text-right select-none pointer-events-none flex items-center gap-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold">
              SALES &nbsp;•&nbsp; SERVICE &nbsp;•&nbsp; SUPPORT
            </span>
            <span className="w-7 sm:w-8 h-[2px] bg-[#F5B800] rounded-full inline-block" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN PROFILE & 7 LINK PILL CARDS                          */}
        {/* ========================================================= */}
        <div className="w-full max-w-[480px] mx-auto flex flex-col items-center relative z-10 my-auto">
          
          {/* Profile Header */}
          <header className="flex flex-col items-center text-center mb-7 w-full">
            {/* Black Squircle with stylized yellow 'T' */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-black rounded-[26px] sm:rounded-[28px] flex items-center justify-center shadow-xl shadow-neutral-900/10 mb-4 p-5 transition-transform hover:scale-105 duration-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                  <path d="M3 7h30l-4.5 7H22v16h-8V14H7.5L3 7z" fill="#FFD21C" />
                </svg>
              </div>
            </div>

            {/* Brand Title */}
            <h1 className="text-2xl sm:text-[32px] font-black tracking-wide uppercase text-neutral-950 font-sans leading-none">
              {SCAN_PROFILE.name}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-neutral-600 font-medium mt-2 text-center max-w-xs sm:max-w-md mx-auto leading-relaxed">
              {SCAN_PROFILE.tagline}
            </p>

            {/* Location Pill */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF9E6] border border-[#FDE68A]/70 text-xs font-semibold text-neutral-900 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 fill-black text-black" />
              <span>{SCAN_PROFILE.location}</span>
            </div>
          </header>

          {/* 7 Pill Action Cards */}
          <section
            aria-label="Quick Links"
            className="w-full space-y-3.5"
          >
            {SCAN_LINKS.map((link: ScanLink) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group w-full bg-white rounded-full border border-neutral-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.035)] hover:shadow-lg hover:border-neutral-200 hover:scale-[1.012] active:scale-[0.99] transition-all duration-200 p-2.5 sm:p-3 flex items-center justify-between cursor-pointer"
              >
                {/* Left: Round Color Icon + Label */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1 pl-0.5">
                  <BrandIconBadge icon={link.icon} />
                  <span className="text-[15px] sm:text-base font-bold text-neutral-900 tracking-tight truncate text-left">
                    {link.name}
                  </span>
                </div>

                {/* Right: Circular Action Arrow Button */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F3F4F6] group-hover:bg-neutral-200/90 flex items-center justify-center text-neutral-700 shrink-0 transition-colors mr-1">
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] text-neutral-700 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </section>

          {/* Divider: TECH FOR A BRIGHTER TOMORROW */}
          <div className="w-full flex items-center justify-center gap-3.5 my-7 select-none">
            <div className="h-[1px] bg-neutral-300 flex-1" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-neutral-500 uppercase font-semibold whitespace-nowrap">
              TECH FOR A BRIGHTER TOMORROW
            </span>
            <div className="h-[1px] bg-neutral-300 flex-1" />
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM MICRO-TYPOGRAPHY FOOTER (3 COLUMNS)               */}
        {/* ========================================================= */}
        <footer className="w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between px-2 sm:px-8 pt-4 pb-2 relative z-10 text-neutral-500 gap-4 sm:gap-0">
          {/* Bottom-Left */}
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] leading-relaxed text-left select-none pointer-events-none hidden sm:block">
            <div>SAME</div>
            <div>CITY</div>
            <div>BIGGER</div>
            <div>POSSIBILITIES</div>
          </div>

          {/* Center Copyright */}
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-center select-none">
            © 2026 TECNOMART. ALL RIGHTS RESERVED.
          </div>

          {/* Bottom-Right */}
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] leading-relaxed text-right flex flex-col items-end select-none pointer-events-none hidden sm:flex">
            <div className="w-7 h-[2px] bg-[#F5B800] rounded-full mb-2" />
            <div>DEVICES</div>
            <div>SERVICES</div>
            <div>SOLUTIONS</div>
            <div>ALL HERE</div>
          </div>
        </footer>

      </main>
    </>
  );
}
