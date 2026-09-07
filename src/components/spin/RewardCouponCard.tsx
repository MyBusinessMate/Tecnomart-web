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
          <p className="text-[10px] font-mono font-semibold tracking-[0.25em] text-emerald-400 uppercase mb-2">
            OFFICIAL REWARD UNLOCKED
          </p>
          <h1 className="text-2xl sm:text-4xl font-space font-extrabold text-white tracking-tight uppercase">
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
          className="printable-voucher w-full max-w-xl rounded-[32px] bg-gradient-to-b from-[#161616] via-[#0E0E0E] to-[#060606] border border-white/[0.14] shadow-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-2xl transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,210,28,0.12)]"
        >
          {/* Subtle Satin Sheen & Diagonal Gold Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-electric-yellow/[0.03] to-transparent pointer-events-none" />

          {/* Pass Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
            <div className="flex items-baseline space-x-1.5 font-space">
              <span className="text-lg sm:text-xl font-bold tracking-[0.16em] text-white uppercase">
                TECHNO MART
              </span>
              <span className="text-lg sm:text-xl font-bold tracking-[0.16em] text-electric-yellow uppercase">
                PASS
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACTIVE</span>
            </div>
          </div>

          {/* Product Showcase Chamber */}
          <div className="py-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative z-10">
            {/* Velvet Black Display Frame with Gold Rim Lighting */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-black/80 border border-electric-yellow/50 p-3 flex items-center justify-center shadow-yellow-glow-sm relative overflow-hidden backdrop-blur-md">
              <img
                src={prizeImg}
                alt={coupon.prizeName}
                width={144}
                height={144}
                className="w-full h-full object-contain drop-shadow-xl select-none transition-transform duration-300 hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Reward Typography */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">
                UNLOCKED PRIZE
              </p>
              <h2 className="text-2xl sm:text-3xl font-space font-extrabold text-electric-yellow tracking-tight drop-shadow-[0_0_20px_rgba(255,210,28,0.35)] my-0.5">
                {coupon.prizeName}
              </h2>
              <p className="text-xs font-sans text-text-secondary leading-relaxed mt-1">
                {coupon.description}
              </p>
            </div>
          </div>

          {/* Technical Monospaced Claim Credential */}
          <div className="w-full p-4 rounded-2xl bg-[#080808] border border-white/[0.12] flex items-center justify-between shadow-inner relative z-10 my-1">
            <div className="flex flex-col text-left pl-1">
              <span className="text-[9px] font-mono tracking-[0.2em] text-text-muted uppercase">
                CLAIM CREDENTIAL
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-white select-all">
                {coupon.couponCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="Copy claim credential code"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-yellow/10 hover:bg-electric-yellow/20 active:scale-95 border border-electric-yellow/40 text-electric-yellow font-space text-xs font-bold transition-all select-none"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
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
          <div className="mt-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center text-center relative z-10">
            <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase mb-3 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-electric-yellow" />
              PRESENT AT STORE CHECKOUT • SCAN TO VERIFY
            </p>

            <div className="p-3.5 bg-white rounded-2xl shadow-2xl border-2 border-electric-yellow/80 inline-block relative group">
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
            <div className="flex items-center gap-1.5 mt-3.5 text-xs font-mono text-electric-champagne font-medium">
              <Clock className="w-3.5 h-3.5 text-electric-yellow" />
              <span>
                VALID FOR: {timeLeft.days}D {timeLeft.hours}H {timeLeft.mins}M
              </span>
            </div>
          </div>

          {/* Terms Accordion */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] relative z-10 text-left">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="w-full flex items-center justify-between text-xs font-space font-medium text-text-secondary hover:text-white transition-colors"
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
                  <ul className="text-[11px] font-sans text-text-muted space-y-1.5 mt-2.5 pl-2 leading-relaxed">
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
            className="flex items-center justify-between p-4 rounded-2xl bg-electric-yellow/[0.08] hover:bg-electric-yellow/[0.16] active:scale-98 border border-electric-yellow/40 transition-all text-white group shadow-yellow-glow-sm"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-electric-yellow uppercase tracking-wider">
                CALL STORE
              </span>
              <span className="text-sm font-mono font-bold tracking-wide">
                {STORE_PHONE}
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-electric-yellow/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4 text-electric-yellow" />
            </div>
          </a>

          {/* Exact Google Maps Destination Action */}
          <a
            href={STORE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] active:scale-98 border border-white/[0.12] transition-all text-white group"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                VISIT STORE
              </span>
              <span className="text-xs font-sans text-white/90">
                Get Driving Directions →
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <Navigation className="w-4 h-4 text-electric-yellow" />
            </div>
          </a>
        </motion.div>

        {/* Operating Hours & Save/Print Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-text-muted no-print"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Store Open Daily: 10:00 AM – 09:30 PM (IST)</span>
          </div>

          <CyberButton
            onClick={handlePrint}
            variant="secondary"
            size="sm"
            className="text-xs font-space tracking-wider uppercase"
            leftIcon={<Printer className="w-3.5 h-3.5 text-electric-yellow" />}
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
