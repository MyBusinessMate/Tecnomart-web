"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandHeader } from "./BrandHeader";
import { LuckyWheelCanvas } from "./LuckyWheelCanvas";
import { WinnerReveal } from "./WinnerReveal";
import { FeedbackStep } from "./FeedbackStep";
import { ScreenshotVerificationStep } from "./ScreenshotVerificationStep";
import { RewardCouponCard } from "./RewardCouponCard";
import { clearParticipationLocks } from "./device";
import { getOrCreateSession, resetEntireSession, RewardWinner } from "./rewardService";
import { DEFAULT_PRIZES } from "./prizes";

type CustomerState = "SPIN" | "REVEAL" | "FEEDBACK" | "SCREENSHOT_VERIFY" | "COUPON";

export function RewardExperienceApp({ forceSuperMode = false }: { forceSuperMode?: boolean }) {
  const [isSuperTestMode, setIsSuperTestMode] = useState<boolean>(forceSuperMode);

  // Read URL search params safely in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isSuperRoute = window.location.pathname.toLowerCase().includes("supertechie");
      if (
        params.get("super") === "true" ||
        params.get("mode") === "super" ||
        params.get("mode") === "supertechie" ||
        isSuperRoute ||
        forceSuperMode
      ) {
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

  // Safe fallback winner so testing or state restoration never results in a blank screen
  const effectiveWinner: RewardWinner = winnerData || {
    prizeId: DEFAULT_PRIZES[1].id,
    prizeName: DEFAULT_PRIZES[1].name,
    prizeImage: DEFAULT_PRIZES[1].image,
    prizeType: DEFAULT_PRIZES[1].type,
    description: DEFAULT_PRIZES[1].description,
    value: DEFAULT_PRIZES[1].value,
    couponCode: "TM-PASS-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: customerName || "Techno Mart Guest",
    customerPhone: customerPhone || "+91 90106 67726",
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-white text-neutral-900">
      {/* Super Mode Test Bar */}
      {isSuperTestMode && (
        <div className="w-full bg-neutral-900 border-b border-amber-400/40 px-3 sm:px-6 py-2 z-50 text-white">
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

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-neutral-400 uppercase mr-1">
                STAGE:
              </span>
              {(["SPIN", "REVEAL", "FEEDBACK", "SCREENSHOT_VERIFY", "COUPON"] as CustomerState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setCurrentState(st)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    currentState === st
                      ? "bg-amber-400 text-black font-bold shadow-xs"
                      : "bg-neutral-800 text-neutral-300 hover:text-white"
                  }`}
                >
                  {st === "SPIN" ? "Wheel" : st === "REVEAL" ? "Winner" : st === "FEEDBACK" ? "Review" : st === "SCREENSHOT_VERIFY" ? "Verify" : "Pass"}
                </button>
              ))}

              <div className="h-3 w-[1px] bg-neutral-700 mx-1" />

              <button
                onClick={handleSpinAgain}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-amber-400/50 hover:bg-amber-400/20 transition-all flex items-center gap-1 cursor-pointer font-bold"
                title="Unlock device participation lock"
              >
                <span>↻</span>
                <span>SPIN AGAIN</span>
              </button>

              <button
                onClick={handleResetSession}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300 border border-neutral-700 hover:bg-neutral-800 transition-all cursor-pointer"
                title="Wipe entire session data"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Brand Header */}
      <BrandHeader isSuperMode={isSuperTestMode} onReset={handleResetSession} />

      {/* Unified Multi-Step Flow Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-center items-center relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: INTERACTIVE WHEEL VIEW */}
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
          {currentState === "REVEAL" && (
            <motion.div
              key="reveal-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <WinnerReveal
                winner={effectiveWinner}
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
          {currentState === "COUPON" && (
            <motion.div
              key="coupon-step"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center"
            >
              <RewardCouponCard
                coupon={effectiveWinner}
                isSuperMode={isSuperTestMode}
                onSpinAgain={handleSpinAgain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
