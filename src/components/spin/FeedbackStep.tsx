"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ExternalLink,
  MessageSquare,
  Loader2,
  User,
  Phone,
  Check,
} from "lucide-react";
import { CyberButton } from "./CyberButton";
import { GlassInput } from "./GlassInput";
import { validateIndianPhone } from "./validation";
import { saveFeedback } from "./rewardService";

interface FeedbackStepProps {
  sessionId: string;
  defaultCustomerName?: string;
  googleReviewUrl?: string;
  onReviewSubmitted: (name: string, phone: string, reviewText: string) => void;
  isSuperMode?: boolean;
}

type StepState = "FORM" | "OPENING";

export function FeedbackStep({
  sessionId,
  defaultCustomerName = "",
  googleReviewUrl,
  onReviewSubmitted,
  isSuperMode = false,
}: FeedbackStepProps) {
  const targetGoogleUrl =
    googleReviewUrl ||
    "https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Road+No+36+Jubilee+Hills+Hyderabad";

  const [name, setName] = useState(
    defaultCustomerName === "Techno Mart Guest" ? "" : defaultCustomerName
  );
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; feedback?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [stepState, setStepState] = useState<StepState>("FORM");

  const charCount = feedback.trim().length;
  const isMinMet = charCount >= 30;
  const isMaxExceeded = charCount > 500;
  const isFormValid =
    name.trim().length >= 2 && phone.trim().length >= 10 && isMinMet && !isMaxExceeded;

  const handleCopyReviewAndOpenGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: { name?: string; phone?: string; feedback?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const phoneValidation = validateIndianPhone(phone);
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneValidation.isValid) {
      newErrors.phone = "Enter a valid 10-digit mobile number (+91).";
    }

    if (!feedback.trim()) {
      newErrors.feedback = "Please share your experience.";
    } else if (!isMinMet) {
      newErrors.feedback = `Minimum 30 characters required (${30 - charCount} more needed).`;
    } else if (isMaxExceeded) {
      newErrors.feedback = "Maximum 500 characters exceeded.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // 1. Copy exact review text to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(feedback.trim());
      }
    } catch {}

    // 2. Save Name, Phone, and Review into current session
    saveFeedback(sessionId, name.trim(), phoneValidation.formatted, feedback.trim());
    setIsLoading(false);

    // 3. Show OPENING state
    setStepState("OPENING");

    // 4. Open Google Reviews and transition to Screenshot Upload
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.open(targetGoogleUrl, "_blank", "noopener,noreferrer");
      }

      setTimeout(() => {
        onReviewSubmitted(name.trim(), phoneValidation.formatted, feedback.trim());
      }, 1400);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center px-3.5 sm:px-4 py-3 sm:py-5">
      <AnimatePresence mode="wait">
        {stepState === "FORM" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full flex flex-col items-center"
          >
            {/* 5-Star Rating Header */}
            <div className="flex items-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F5B800] text-[#F5B800]" />
              ))}
            </div>

            {/* Main Heading (NO pill badges) */}
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white uppercase leading-tight">
              SHARE YOUR <span className="text-[#F5B800]">EXPERIENCE</span>
            </h1>

            <p className="text-xs font-sans text-neutral-400 mt-1.5 mb-4 max-w-xs leading-relaxed">
              Enter your details below to copy your review and claim your digital reward pass.
            </p>

            {/* Form Card */}
            <form
              onSubmit={handleCopyReviewAndOpenGoogle}
              className="w-full p-4 sm:p-6 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-4 sm:space-y-5 shadow-2xl text-left relative backdrop-blur-xl"
            >
              {serverError && (
                <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-sans leading-relaxed">
                  {serverError}
                </div>
              )}

              {/* Full Name */}
              <GlassInput
                label="FULL NAME *"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                error={errors.name}
                leftIcon={<User className="w-4 h-4" />}
                autoComplete="name"
                disabled={isLoading}
              />

              {/* Phone Number */}
              <GlassInput
                label="MOBILE NUMBER *"
                placeholder="10-digit number"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                error={errors.phone}
                helperText="Official voucher code is bound to this contact."
                leftIcon={<Phone className="w-4 h-4" />}
                autoComplete="tel"
                disabled={isLoading}
              />

              {/* Review Text Area */}
              <div className="w-full flex flex-col space-y-1.5 text-left">
                <div className="flex items-center justify-between pl-0.5">
                  <label
                    htmlFor="review-textarea"
                    className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-white/80 uppercase flex items-center gap-1.5"
                  >
                    <span>YOUR EXPERIENCE REVIEW *</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      isMinMet && !isMaxExceeded
                        ? "text-[#F5B800] font-semibold"
                        : isMaxExceeded
                        ? "text-red-400 font-bold"
                        : "text-neutral-500"
                    }`}
                  >
                    {charCount}/30 min ({charCount}/500)
                  </span>
                </div>

                <div
                  className={`relative w-full rounded-2xl bg-black/60 border transition-all duration-200 backdrop-blur-md p-3 sm:p-3.5 ${
                    errors.feedback
                      ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-950/10"
                      : "border-white/15 focus-within:border-[#F5B800] focus-within:shadow-[0_0_15px_rgba(245,184,0,0.3)] hover:border-white/25"
                  }`}
                >
                  <textarea
                    id="review-textarea"
                    rows={4}
                    value={feedback}
                    onChange={(e) => {
                      setFeedback(e.target.value);
                      if (errors.feedback) setErrors((prev) => ({ ...prev, feedback: undefined }));
                    }}
                    placeholder="Describe your tech experience, purchased product, or service at TecnoMart..."
                    disabled={isLoading}
                    className="w-full bg-transparent text-white text-sm font-sans tracking-wide outline-none placeholder:text-neutral-500 resize-none"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-400 font-sans">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-[#F5B800]" />
                      <span>Copied to clipboard on click</span>
                    </span>
                    {isMinMet && !isMaxExceeded && (
                      <span className="text-[#F5B800] flex items-center gap-1 font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>
                </div>

                {errors.feedback && (
                  <p className="text-[11px] sm:text-xs text-red-400 font-sans tracking-wide pl-1">
                    {errors.feedback}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <CyberButton
                type="submit"
                variant="solid"
                size="lg"
                disabled={isLoading || !isFormValid}
                className="w-full mt-2 font-heading font-black tracking-wider uppercase text-sm"
                rightIcon={
                  isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
                  )
                }
              >
                {isLoading ? "PREPARING..." : "COPY REVIEW & OPEN GOOGLE"}
              </CyberButton>
            </form>
          </motion.div>
        )}

        {/* STATE 2: OPENING GOOGLE & COPIED MODAL */}
        {stepState === "OPENING" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-[#F5B800]/50 shadow-[0_0_30px_rgba(245,184,0,0.25)] text-center space-y-4 backdrop-blur-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F5B800]/15 border border-[#F5B800]/40 flex items-center justify-center mx-auto text-[#F5B800]">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-black uppercase text-white tracking-tight">
                REVIEW COPIED!
              </h2>
              <p className="text-xs font-sans text-neutral-300 max-w-xs mx-auto leading-relaxed">
                Opening Google Reviews in a new tab... Simply <span className="text-[#F5B800] font-bold">Paste</span> and post!
              </p>
            </div>

            <div className="py-2">
              <Loader2 className="w-6 h-6 text-[#F5B800] animate-spin mx-auto" />
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-2">
                REDIRECTING TO SCREENSHOT VERIFICATION
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
