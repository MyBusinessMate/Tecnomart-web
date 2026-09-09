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
      newErrors.phone = "Mobile number is required.";
    } else if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error || "Enter a valid 10-digit mobile number (+91).";
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
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-neutral-950 uppercase leading-tight">
              SHARE YOUR <span className="text-[#F5B800]">EXPERIENCE</span>
            </h1>

            <p className="text-xs font-sans text-neutral-600 mt-1.5 mb-4 max-w-xs leading-relaxed">
              Enter your details below to copy your review and claim your digital reward pass.
            </p>

            {/* Form Card */}
            <form
              onSubmit={handleCopyReviewAndOpenGoogle}
              className="w-full p-4 sm:p-6 rounded-3xl bg-white border border-neutral-200 space-y-4 sm:space-y-5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-left relative"
            >
              {serverError && (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs font-sans leading-relaxed">
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

              {/* Phone Number with fixed +91 prefix and 10 digits restriction */}
              <GlassInput
                label="MOBILE NUMBER *"
                placeholder="9876543210"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                prefixText="+91"
                value={phone}
                onChange={(e) => {
                  const cleanedDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(cleanedDigits);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                error={errors.phone}
                helperText="Official voucher code is bound to this 10-digit contact."
                leftIcon={<Phone className="w-4 h-4" />}
                autoComplete="tel"
                disabled={isLoading}
              />

              {/* Review Text Area */}
              <div className="w-full flex flex-col space-y-1.5 text-left">
                <div className="flex items-center justify-between pl-0.5">
                  <label
                    htmlFor="review-textarea"
                    className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-neutral-800 uppercase flex items-center gap-1.5"
                  >
                    <span>YOUR EXPERIENCE REVIEW *</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      isMinMet && !isMaxExceeded
                        ? "text-neutral-900 font-bold"
                        : isMaxExceeded
                        ? "text-red-500 font-bold"
                        : "text-neutral-400"
                    }`}
                  >
                    {charCount}/30 min ({charCount}/500)
                  </span>
                </div>

                <div
                  className={`relative w-full rounded-2xl bg-neutral-50 border transition-all duration-200 p-3 sm:p-3.5 shadow-xs ${
                    errors.feedback
                      ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.2)] bg-red-50/40"
                      : "border-neutral-300 focus-within:border-[#F5B800] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F5B800]/20 hover:border-neutral-400"
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
                    className="w-full bg-transparent text-neutral-900 text-sm font-sans tracking-wide outline-none placeholder:text-neutral-400 resize-none"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-[10px] text-neutral-500 font-sans">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-[#F5B800]" />
                      <span>Copied to clipboard on click</span>
                    </span>
                    {isMinMet && !isMaxExceeded && (
                      <span className="text-neutral-900 flex items-center gap-1 font-bold">
                        <Check className="w-3 h-3 stroke-[3] text-emerald-600" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>
                </div>

                {errors.feedback && (
                  <p className="text-[11px] sm:text-xs text-red-600 font-sans tracking-wide pl-1 font-medium">
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
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
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
            className="w-full p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#F5B800] shadow-[0_10px_40px_rgba(245,184,0,0.25)] text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F5B800]/20 border border-[#F5B800] flex items-center justify-center mx-auto text-neutral-950">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-heading font-black uppercase text-neutral-950 tracking-tight">
                REVIEW COPIED!
              </h2>
              <p className="text-xs font-sans text-neutral-600 max-w-xs mx-auto leading-relaxed">
                Opening Google Reviews in a new tab... Simply <span className="text-neutral-950 font-bold underline">Paste</span> and post!
              </p>
            </div>

            <div className="py-2">
              <Loader2 className="w-6 h-6 text-[#F5B800] animate-spin mx-auto" />
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-2 font-medium">
                REDIRECTING TO SCREENSHOT VERIFICATION
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
