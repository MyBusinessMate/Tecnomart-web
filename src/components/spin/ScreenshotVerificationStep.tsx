"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  FileCheck,
  Zap,
} from "lucide-react";
import { CyberButton } from "./CyberButton";
import { verifyScreenshotAndUnlock, RewardWinner } from "./rewardService";

interface ScreenshotVerificationStepProps {
  sessionId: string;
  customerName?: string;
  reviewText?: string;
  googleReviewUrl?: string;
  onVerificationSuccess: (couponData: RewardWinner) => void;
  isSuperMode?: boolean;
}

type VerificationStep = "UPLOAD" | "VERIFYING" | "VERIFIED" | "FAILED";

export function ScreenshotVerificationStep({
  sessionId,
  customerName,
  googleReviewUrl,
  onVerificationSuccess,
  isSuperMode = false,
}: ScreenshotVerificationStepProps) {
  const targetGoogleUrl =
    googleReviewUrl ||
    "https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Road+No+36+Jubilee+Hills+Hyderabad";

  const [step, setStep] = useState<VerificationStep>("UPLOAD");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [failureReason, setFailureReason] = useState<string>(
    "Please upload a screenshot showing your posted review."
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setUploadError(null);

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image is too large. Please select a screenshot under 10 MB.");
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError("Please upload a PNG, JPG, JPEG, or WEBP screenshot.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setBase64Image(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Submit screenshot for verification
  const handleSubmitScreenshot = () => {
    if (!base64Image) return;

    setStep("VERIFYING");

    setTimeout(() => {
      try {
        const result = verifyScreenshotAndUnlock(sessionId, isSuperMode);
        if (result.verified && result.coupon) {
          setStep("VERIFIED");
          setTimeout(() => {
            onVerificationSuccess(result.coupon);
          }, 1100);
        } else {
          setFailureReason("Please upload a screenshot showing your posted review.");
          setStep("FAILED");
        }
      } catch (err) {
        setFailureReason("Please upload a screenshot showing your posted review.");
        setStep("FAILED");
      }
    }, 900);
  };

  const handleUploadAgain = () => {
    setPreviewUrl(null);
    setBase64Image(null);
    setUploadError(null);
    setStep("UPLOAD");
  };

  const handleOpenGoogleAgain = () => {
    if (typeof window !== "undefined") {
      window.open(targetGoogleUrl, "_blank", "noopener,noreferrer");
    }
    setStep("UPLOAD");
  };

  const handleAdminBypass = () => {
    setStep("VERIFYING");
    setTimeout(() => {
      try {
        const result = verifyScreenshotAndUnlock(sessionId, isSuperMode);
        setStep("VERIFIED");
        setTimeout(() => {
          onVerificationSuccess(result.coupon);
        }, 800);
      } catch {
        setStep("VERIFIED");
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 py-3 sm:py-5 relative">
      <AnimatePresence mode="wait">
        {/* ============================================================ */}
        {/* STATE 1: SCREENSHOT UPLOAD */}
        {/* ============================================================ */}
        {step === "UPLOAD" && (
          <motion.div
            key="upload-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full flex flex-col items-center"
          >
            <h1 className="text-2xl sm:text-3xl font-space font-bold tracking-tight text-neutral-950 uppercase leading-tight">
              REVIEW <span className="text-[#F5B800]">POSTED?</span>
            </h1>

            <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1 mb-4 max-w-sm">
              Upload a screenshot of your posted Google review to claim your official reward pass.
            </p>

            {uploadError && (
              <div className="w-full p-3 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs font-sans mb-3.5 flex items-center gap-2 text-left">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Upload Card / Preview */}
            <div className="w-full p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-left space-y-4">
              {!previewUrl ? (
                // Dropzone & File Selector
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-8 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-[#F5B800] hover:bg-[#F5B800]/5 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 group select-none"
                >
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center group-hover:scale-105 group-hover:border-[#F5B800] transition-all shadow-xs">
                    <UploadCloud className="w-7 h-7 text-neutral-800" />
                  </div>

                  <div>
                    <p className="text-sm font-space font-bold text-neutral-950 uppercase tracking-wider">
                      SELECT SCREENSHOT
                    </p>
                    <p className="text-xs font-sans text-neutral-500 mt-1">
                      Choose image from gallery (PNG, JPG, WEBP)
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                // Selected Screenshot Preview
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-[#F5B800] bg-neutral-50 shadow-sm">
                    <img
                      src={previewUrl}
                      alt="Uploaded Review Screenshot"
                      className="w-full max-h-72 object-contain mx-auto"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-md bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-white">
                      READY
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CyberButton
                      onClick={handleSubmitScreenshot}
                      variant="solid"
                      size="md"
                      className="w-full font-space font-bold uppercase tracking-wider text-xs"
                      leftIcon={<FileCheck className="w-4 h-4 text-black" />}
                    >
                      VERIFY
                    </CyberButton>

                    <CyberButton
                      onClick={handleUploadAgain}
                      variant="secondary"
                      size="md"
                      className="w-full text-xs font-space tracking-wider uppercase"
                      leftIcon={<RotateCcw className="w-4 h-4 text-neutral-800" />}
                    >
                      CHANGE
                    </CyberButton>
                  </div>
                </div>
              )}

              {!previewUrl && (
                <CyberButton
                  onClick={() => fileInputRef.current?.click()}
                  variant="solid"
                  size="lg"
                  className="w-full font-space font-bold uppercase tracking-wider text-xs sm:text-sm"
                  leftIcon={<ImageIcon className="w-4 h-4 text-black" />}
                >
                  UPLOAD SCREENSHOT
                </CyberButton>
              )}

              {isSuperMode && (
                <button
                  type="button"
                  onClick={handleAdminBypass}
                  className="w-full mt-3 py-2 px-4 rounded-xl bg-neutral-900 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>ADMIN TEST: ONE-CLICK BYPASS &amp; UNLOCK</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STATE 2: VERIFYING STATE */}
        {/* ============================================================ */}
        {step === "VERIFYING" && (
          <motion.div
            key="verifying-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-8 rounded-3xl bg-white border-2 border-[#F5B800] text-center shadow-[0_10px_40px_rgba(245,184,0,0.2)] flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F5B800]/20 border border-[#F5B800] flex items-center justify-center mb-3.5 shadow-sm relative">
              <Loader2 className="w-7 h-7 text-neutral-950 animate-spin" />
            </div>

            <h2 className="text-xl sm:text-2xl font-space font-bold text-neutral-950 uppercase tracking-tight mb-1">
              CONFIRMING REVIEW...
            </h2>

            <p className="text-xs font-sans text-neutral-600">
              Verifying review screenshot...
            </p>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STATE 3: SUCCESS STATE */}
        {/* ============================================================ */}
        {step === "VERIFIED" && (
          <motion.div
            key="verified-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-8 rounded-3xl bg-white border-2 border-[#F5B800] text-center shadow-[0_10px_40px_rgba(245,184,0,0.2)] flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F5B800]/25 border-2 border-[#F5B800] flex items-center justify-center mb-3.5 shadow-sm text-neutral-950">
              <CheckCircle2 className="w-8 h-8 text-neutral-950" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-space font-bold text-neutral-950 uppercase tracking-tight">
              ✓ REVIEW CONFIRMED
            </h2>

            <p className="text-sm font-sans text-neutral-700 mt-1 mb-4">
              Your digital reward pass is ready.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-900">
              <Loader2 className="w-4 h-4 animate-spin text-[#F5B800]" />
              <span>GENERATING DIGITAL PASS...</span>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* STATE 4: FAILURE STATE */}
        {/* ============================================================ */}
        {step === "FAILED" && (
          <motion.div
            key="failed-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full p-7 rounded-3xl bg-white border border-red-300 text-center shadow-lg flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-400 flex items-center justify-center mb-3.5 shadow-sm">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-xl sm:text-2xl font-space font-bold text-neutral-950 uppercase tracking-tight">
              VERIFICATION NEEDED
            </h2>

            <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1 mb-5 max-w-sm">
              {failureReason}
            </p>

            {/* Action Buttons */}
            <div className="w-full space-y-2.5">
              <CyberButton
                onClick={handleUploadAgain}
                variant="solid"
                size="lg"
                className="w-full font-space font-bold uppercase tracking-wider text-xs"
                leftIcon={<UploadCloud className="w-4 h-4 text-black" />}
              >
                UPLOAD AGAIN
              </CyberButton>

              <CyberButton
                onClick={handleOpenGoogleAgain}
                variant="secondary"
                size="md"
                className="w-full font-space tracking-wider uppercase text-xs"
                leftIcon={<ExternalLink className="w-4 h-4 text-neutral-800" />}
              >
                OPEN GOOGLE
              </CyberButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
