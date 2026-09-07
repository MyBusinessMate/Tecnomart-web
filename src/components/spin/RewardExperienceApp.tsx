"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandHeader } from "./BrandHeader";
import { LuckyWheelCanvas } from "./LuckyWheelCanvas";
import { WinnerReveal } from "./WinnerReveal";
import { FeedbackStep } from "./FeedbackStep";
import { ScreenshotVerificationStep } from "./ScreenshotVerificationStep";
import { RewardCouponCard } from "./RewardCouponCard";
import { RotateCcw } from "lucide-react";
import { clearParticipationLocks } from "./device";
import { getOrCreateSession, resetEntireSession, RewardWinner } from "./rewardService";

type CustomerState = "SPIN" | "REVEAL" | "FEEDBACK" | "SCREENSHOT_VERIFY" | "COUPON";

export function RewardExperienceApp({ forceSuperMode = false }: { forceSuperMode?: boolean }) {
  const [isSuperTestMode, setIsSuperTestMode] = useState<boolean>(forceSuperMode);

  // Read URL search params safely in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("super") === "true" || params.get("mode") === "super" || forceSuperMode) {
        setIsSuperTestMode(true);
      }
    }
  }, [forceSuperMode]);

  // Start directly in SPIN state for 0ms instant first-paint
  const [currentState, setCurrentState] = useState<CustomerState>("SPIN");
  const [sessionId, setSessionId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("Techno Mart Guest");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerReview, setCustomerReview] = useState<string>("");

  const [winnerData, setWinnerData] = useState<RewardWinner | null>(null);

  // Initialize or restore reward session seamlessly
  const initSession = () => {
    try {
      const session = getOrCreateSession(isSuperTestMode);
      if (session.sessionId) {
        setSessionId(session.sessionId);
      }
      if (session.customerName) setCustomerName(session.customerName);
      if (session.customerPhone) setCustomerPhone(session.customerPhone);
      if (session.feedback) setCustomerReview(session.feedback);

      // If user has already spun, direct them to their earned pass or verification
      if (!isSuperTestMode && session.alreadySpun) {
        if (session.coupon) {
          setWinnerData(session.coupon);
        }

        if (session.reviewVerified && session.coupon) {
          setCurrentState("COUPON");
        } else if (session.feedback && session.feedback.trim().length >= 30) {
          setCurrentState("SCREENSHOT_VERIFY");
        } else if (session.coupon) {
          setCurrentState("FEEDBACK");
        }
      }
    } catch (err) {
      console.warn("Session init error:", err);
    }
  };

  useEffect(() => {
    initSession();
  }, [isSuperTestMode]);

  // Callback when wheel spin halts at the landed prize
  const handleWinnerCalculated = (winner: RewardWinner) => {
    setWinnerData(winner);
    setCurrentState("REVEAL");
  };

  // Callback from WinnerReveal to move to Customer Info & Feedback Form
  const handleRevealContinue = () => {
    setCurrentState("FEEDBACK");
  };

  // Callback after saving Name, Phone & Review and opening Google Reviews
  const handleReviewSubmitted = (name: string, phone: string, review: string) => {
    setCustomerName(name);
    setCustomerPhone(phone);
    setCustomerReview(review);
    setCurrentState("SCREENSHOT_VERIFY");
  };

  // Callback when screenshot verification succeeds
  const handleScreenshotVerificationSuccess = (couponData: RewardWinner) => {
    setWinnerData((prev) => ({
      prizeId: prev?.prizeId || "prize",
      prizeName: couponData.prizeName || prev?.prizeName || "Exclusive Reward",
      prizeImage: couponData.prizeImage || prev?.prizeImage,
      prizeType: couponData.prizeType || prev?.prizeType || "product",
      description: couponData.description || prev?.description || "In-store voucher",
      value: couponData.value || prev?.value || 0,
      couponCode: couponData.couponCode,
      issuedAt: couponData.issuedAt,
      expiresAt: couponData.expiresAt,
      customerName: couponData.customerName || customerName,
      customerPhone: couponData.customerPhone || customerPhone,
    }));
    setCurrentState("COUPON");
  };

  const handleSpinAgain = () => {
    clearParticipationLocks();
    setCurrentState("SPIN");
  };

  const handleResetSession = () => {
    resetEntireSession();
    setWinnerData(null);
    setCurrentState("SPIN");
    initSession();
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#050505] text-white">
      {/* Super Mode Cyber Bar (Prominent, No Pill Badges) */}
      {isSuperTestMode && (
        <div className="w-full bg-[#0d0d0d] border-b border-electric-yellow/30 px-3 sm:px-6 py-2 z-50">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-yellow animate-pulse shadow-[0_0_8px_#FFD21C]" />
              <span className="text-xs font-mono font-bold tracking-wider text-electric-yellow uppercase">
                SUPER MODE (UNLIMITED)
              </span>
              <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                • SINGLE-DEVICE LOCKOUT BYPASSED • SPINS UNLIMITED
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs font-mono">
              <span className="text-[10px] text-text-muted uppercase mr-1 hidden md:inline">
                STAGE:
              </span>
              {(["SPIN", "REVEAL", "FEEDBACK", "SCREENSHOT_VERIFY", "COUPON"] as CustomerState[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    if (st === "REVEAL" && !winnerData) {
                      setWinnerData({
                        prizeId: "sample",
                        prizeName: "Wireless Headphones",
                        description: "Premium Over-Ear Bluetooth 5.3 Headphones",
                        value: 1499,
                        couponCode: "TM-SUPER-" + Math.floor(1000 + Math.random() * 9000),
                        issuedAt: new Date().toISOString(),
                        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
                        customerName: customerName || "Techno Mart Tester",
                      });
                    }
                    setCurrentState(st);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono transition-all ${
                    currentState === st
                      ? "bg-electric-yellow text-black font-bold"
                      : "bg-white/5 hover:bg-white/10 text-white/80"
                  }`}
                >
                  {st === "SPIN" ? "Wheel" : st === "REVEAL" ? "Winner" : st === "FEEDBACK" ? "Review" : st === "SCREENSHOT_VERIFY" ? "Verify" : "Pass"}
                </button>
              ))}

              <div className="h-3.5 w-px bg-white/20 mx-1 hidden sm:block" />

              <button
                type="button"
                onClick={handleSpinAgain}
                className="px-2 py-0.5 rounded bg-electric-yellow/20 hover:bg-electric-yellow/30 border border-electric-yellow/60 text-electric-yellow text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>SPIN AGAIN</span>
              </button>

              <button
                type="button"
                onClick={handleResetSession}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 text-[10px] tracking-wider uppercase transition-all"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand Header */}
      <BrandHeader />

      {/* Main Flow Stage */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 py-2 sm:py-6 max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: LUCKY WHEEL (INSTANT FIRST-PAINT) */}
          {currentState === "SPIN" && (
            <motion.div
              key="spin-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <LuckyWheelCanvas
                sessionId={sessionId}
                isSuperMode={isSuperTestMode}
                onWinnerCalculated={handleWinnerCalculated}
              />
            </motion.div>
          )}

          {/* STEP 2: WINNER REVEAL */}
          {currentState === "REVEAL" && winnerData && (
            <motion.div
              key="reveal-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <WinnerReveal
                winner={winnerData}
                onContinue={handleRevealContinue}
                onSpinAgain={handleSpinAgain}
                isSuperMode={isSuperTestMode}
              />
            </motion.div>
          )}

          {/* STEP 3: CUSTOMER FORM (NAME, PHONE, 30+ CHAR REVIEW, COPY & OPEN GOOGLE) */}
          {currentState === "FEEDBACK" && (
            <motion.div
              key="feedback-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <FeedbackStep
                sessionId={sessionId}
                defaultCustomerName={customerName}
                onReviewSubmitted={handleReviewSubmitted}
                isSuperMode={isSuperTestMode}
              />
            </motion.div>
          )}

          {/* STEP 4: SCREENSHOT VERIFICATION */}
          {currentState === "SCREENSHOT_VERIFY" && (
            <motion.div
              key="screenshot-verify-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <ScreenshotVerificationStep
                sessionId={sessionId}
                customerName={customerName}
                reviewText={customerReview}
                onVerificationSuccess={handleScreenshotVerificationSuccess}
                isSuperMode={isSuperTestMode}
              />
            </motion.div>
          )}

          {/* STEP 5: DIGITAL REWARD PASS (COUPON + QR + EXPIRATION) */}
          {currentState === "COUPON" && winnerData && (
            <motion.div
              key="coupon-step"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center"
            >
              <RewardCouponCard
                coupon={winnerData}
                isSuperMode={isSuperTestMode}
                onSpinAgain={handleSpinAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-3 sm:py-4 px-4 text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase border-t border-white/5">
        <span>TECHNO MART</span>
        <span className="mx-2 text-electric-yellow">•</span>
        <span>OFFICIAL REWARD MACHINE</span>
      </footer>
    </div>
  );
}
