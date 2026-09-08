"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Copy,
  Check,
  Printer,
  ChevronDown,
  ChevronUp,
  Clock,
  QrCode,
  PhoneCall,
  Navigation,
  ShieldCheck,
  Zap,
} from "lucide-react";
import QRCode from "qrcode";
import { CyberButton } from "./CyberButton";
import { getPrizeImage } from "./prizes";

interface RewardCouponProps {
  coupon: {
    prizeId: string;
    prizeName: string;
    prizeImage?: string;
    prizeType?: string;
    description: string;
    value: number;
    couponCode: string;
    issuedAt: string;
    expiresAt: string;
    customerName: string;
    customerPhone?: string;
  };
  isSuperMode?: boolean;
  onSpinAgain?: () => void;
}

const STORE_PHONE = "+91 90106 67726";
const STORE_PHONE_TEL = "tel:+919010667726";
const STORE_MAPS_URL =
  "https://www.google.com/maps/place/17%C2%B023'55.8%22N+78%C2%B024'40.4%22E/@17.3988333,78.4086473,831m/data=!3m1!1e3!4m4!3m3!8m2!3d17.3988333!4d78.4112222?hl=en&entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D";

export function RewardCouponCard({ coupon, isSuperMode = false, onSpinAgain }: RewardCouponProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showTerms, setShowTerms] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number }>({
    days: 30,
    hours: 0,
    mins: 0,
  });

  const cardRef = useRef<HTMLDivElement>(null);

  // 2.5D Spring Damped Mouse Tilt Effect (Desktop)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || typeof window === "undefined" || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const prizeImg = coupon.prizeImage || getPrizeImage(coupon.prizeName);

  // Generate crisp QR code
  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://technomart.in";
    const verificationUrl = `${origin}/#coupon-verify?code=${encodeURIComponent(coupon.couponCode)}`;

    QRCode.toDataURL(verificationUrl, {
      width: 400,
      margin: 1.5,
      color: {
        dark: "#050505",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Generation Error:", err));
  }, [coupon.couponCode]);

  // Live countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(coupon.expiresAt).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [coupon.expiresAt]);

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(coupon.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-20">
      {/* Showroom Ambient Depth Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-electric-yellow/[0.06] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Unified Showroom Architecture */}
      <div className="flex flex-col items-center">
        {/* Entrance Typography Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-4xl font-space font-black text-neutral-950 tracking-tight uppercase">
            DIGITAL CREDENTIAL
          </h1>
        </motion.div>

        {/* 2.5D Floating Hero Pass with Mouse Perspective */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="printable-voucher w-full max-w-xl rounded-[32px] bg-white border-2 border-[#F5B800] shadow-[0_15px_45px_rgba(245,184,0,0.18)] p-6 sm:p-8 relative overflow-hidden transition-shadow duration-300"
        >
          {/* Subtle Diagonal Gold Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#F5B800]/[0.03] to-transparent pointer-events-none" />

          {/* Pass Top Bar (NO green lines, NO ACTIVE badge) */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 relative z-10">
            <div className="flex items-baseline space-x-1.5 font-space">
              <span className="text-lg sm:text-xl font-black tracking-[0.16em] text-neutral-950 uppercase">
                TECHNO MART
              </span>
              <span className="text-lg sm:text-xl font-black tracking-[0.16em] text-[#F5B800] uppercase">
                PASS
              </span>
            </div>

            <div className="text-[10px] font-mono font-bold tracking-widest text-neutral-600 uppercase">
              OFFICIAL VERIFIED
            </div>
          </div>

          {/* Product Showcase Chamber */}
          <div className="py-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative z-10">
            {/* Display Frame with Gold Rim Lighting */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-neutral-50 border border-neutral-200 p-3 flex items-center justify-center shadow-xs relative overflow-hidden">
              <img
                src={prizeImg}
                alt={coupon.prizeName}
                width={144}
                height={144}
                className="w-full h-full object-contain select-none transition-transform duration-300 hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Reward Typography */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                UNLOCKED PRIZE
              </p>
              <h2 className="text-2xl sm:text-3xl font-space font-black text-neutral-950 tracking-tight my-0.5">
                {coupon.prizeName}
              </h2>
              <p className="text-xs font-sans text-neutral-600 leading-relaxed mt-1">
                {coupon.description}
              </p>
            </div>
          </div>

          {/* Technical Monospaced Claim Credential */}
          <div className="w-full p-4 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-between shadow-inner relative z-10 my-1">
            <div className="flex flex-col text-left pl-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-500 uppercase font-bold">
                CLAIM CREDENTIAL
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-neutral-950 select-all">
                {coupon.couponCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy claim credential code"
              className="btn-wipe-yellow flex items-center gap-1.5 px-4 py-2 rounded-xl active:scale-95 border border-[#F5B800] hover:border-black font-space text-xs font-extrabold transition-all select-none shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-neutral-950 stroke-[3]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* High-Contrast Ceramic QR Redemption Box */}
          <div className="mt-5 p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col items-center text-center relative z-10">
            <p className="text-[10px] font-mono tracking-[0.2em] text-neutral-600 uppercase mb-3 flex items-center gap-1.5 font-bold">
              <QrCode className="w-3.5 h-3.5 text-[#F5B800]" />
              PRESENT AT STORE CHECKOUT • SCAN TO VERIFY
            </p>

            <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-[#F5B800] inline-block relative group">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`Redemption QR for ${coupon.couponCode}`}
                  width={176}
                  height={176}
                  className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-lg"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-lg text-black text-xs font-mono">
                  Generating QR...
                </div>
              )}
            </div>

            {/* Expiration Countdown */}
            <div className="flex items-center gap-1.5 mt-3.5 text-xs font-mono text-neutral-900 font-bold">
              <Clock className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>
                VALID FOR: {timeLeft.days}D {timeLeft.hours}H {timeLeft.mins}M
              </span>
            </div>
          </div>

          {/* Terms Accordion */}
          <div className="mt-4 pt-3 border-t border-neutral-200 relative z-10 text-left">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="w-full flex items-center justify-between text-xs font-space font-bold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              <span>TERMS & STORE CONDITIONS</span>
              {showTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showTerms && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="text-[11px] font-sans text-neutral-600 space-y-1.5 mt-2.5 pl-2 leading-relaxed">
                    <li>• Valid only at Techno Mart physical retail store.</li>
                    <li>• Single-use only per customer / physical device.</li>
                    <li>• Present this digital pass or credential code to store staff at checkout.</li>
                    <li>• Cannot be combined with other clearance promotions.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Integrated Store Action & Navigation Hub (Desktop & Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-xl mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {/* 1-Tap Phone Call Action */}
          <a
            href={STORE_PHONE_TEL}
            className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 active:scale-98 border border-[#F5B800] transition-all text-neutral-950 group shadow-xs"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-neutral-700 uppercase tracking-wider font-bold">
                CALL STORE
              </span>
              <span className="text-sm font-mono font-black tracking-wide">
                {STORE_PHONE}
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#F5B800]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4 text-neutral-950" />
            </div>
          </a>

          {/* Exact Google Maps Destination Action */}
          <a
            href={STORE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 active:scale-98 border border-neutral-300 transition-all text-neutral-950 group shadow-xs"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider font-bold">
                VISIT STORE
              </span>
              <span className="text-xs font-sans text-neutral-900 font-semibold">
                Get Driving Directions →
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-neutral-200 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <Navigation className="w-4 h-4 text-neutral-950" />
            </div>
          </a>
        </motion.div>

        {/* Operating Hours & Save/Print Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-neutral-600 no-print"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5B800]" />
            <span className="font-medium text-neutral-700">Store Open Daily: 10:00 AM – 09:30 PM (IST)</span>
          </div>

          <CyberButton
            onClick={handlePrint}
            variant="secondary"
            size="sm"
            className="text-xs font-space tracking-wider uppercase border-neutral-300"
            leftIcon={<Printer className="w-3.5 h-3.5 text-neutral-800" />}
          >
            SAVE / PRINT PASS
          </CyberButton>
        </motion.div>

        {isSuperMode && onSpinAgain && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full max-w-xl mt-3.5 no-print"
          >
            <button
              type="button"
              onClick={onSpinAgain}
              className="w-full py-3 px-4 rounded-2xl bg-electric-yellow/15 hover:bg-electric-yellow/25 active:scale-98 border border-electric-yellow text-electric-yellow font-space font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-yellow-glow-sm"
            >
              <Zap className="w-4 h-4 fill-electric-yellow" />
              <span>⚡ TEST ANOTHER SPIN (UNLIMITED MODE)</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
