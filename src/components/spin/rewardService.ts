"use client";

import { DEFAULT_PRIZES, selectWinningPrize, getPrizeImage, PrizeDefinition } from "./prizes";
import { generateCouponCode } from "./code-generator";
import { getDeviceAndHardwareId, hasUserParticipated, markUserParticipated, clearParticipationLocks } from "./device";
import {
  syncCouponToSupabase,
  uploadReviewScreenshot,
  checkMobileAlreadyRedeemed,
  cleanIndianPhone,
  SpinCouponRecord,
} from "@/lib/supabase";

export interface RewardWinner {
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
  screenshotUrl?: string;
  reviewText?: string;
  status?: "issued" | "verified" | "redeemed" | "expired";
}

export interface RewardSessionData {
  sessionId: string;
  customerName: string;
  customerPhone: string;
  feedback: string;
  hasSpun: boolean;
  reviewVerified: boolean;
  alreadySpun: boolean;
  coupon: RewardWinner | null;
}

const STORAGE_SESSION_KEY = "technomart_reward_session_v2";

export function getOrCreateSession(isSuperMode: boolean = false): RewardSessionData {
  if (typeof window === "undefined") {
    return {
      sessionId: "ssr_session",
      customerName: "Techno Mart Guest",
      customerPhone: "",
      feedback: "",
      hasSpun: false,
      reviewVerified: false,
      alreadySpun: false,
      coupon: null,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (raw) {
      const parsed: RewardSessionData = JSON.parse(raw);
      if (!isSuperMode && hasUserParticipated()) {
        parsed.alreadySpun = true;
      }
      return parsed;
    }
  } catch {}

  const newSession: RewardSessionData = {
    sessionId: "tm_sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36),
    customerName: "Techno Mart Guest",
    customerPhone: "",
    feedback: "",
    hasSpun: false,
    reviewVerified: false,
    alreadySpun: !isSuperMode && hasUserParticipated(),
    coupon: null,
  };

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newSession));
  } catch {}

  return newSession;
}

/**
 * Check if a mobile number has already spun or claimed a coupon
 */
export async function checkMobileRedeemed(phone: string): Promise<{
  alreadyRedeemed: boolean;
  coupon: SpinCouponRecord | null;
}> {
  return await checkMobileAlreadyRedeemed(phone);
}

/**
 * Restore an existing verified coupon into local session
 */
export function restoreSessionFromCoupon(existingCoupon: SpinCouponRecord): RewardSessionData {
  const session = getOrCreateSession(true);
  session.customerName = existingCoupon.customer_name;
  session.customerPhone = existingCoupon.customer_phone;
  session.feedback = existingCoupon.review_text || "";
  session.hasSpun = true;
  session.alreadySpun = true;
  session.reviewVerified = existingCoupon.status === "verified" || existingCoupon.status === "redeemed";

  session.coupon = {
    prizeId: existingCoupon.prize_id,
    prizeName: existingCoupon.prize_name,
    prizeImage: getPrizeImage(existingCoupon.prize_name),
    prizeType: existingCoupon.prize_type,
    description: "In-store voucher for TecnoMart Tolichowki",
    value: Number(existingCoupon.prize_value) || 0,
    couponCode: existingCoupon.coupon_code,
    issuedAt: existingCoupon.issued_at,
    expiresAt: existingCoupon.expires_at,
    customerName: existingCoupon.customer_name,
    customerPhone: existingCoupon.customer_phone,
    screenshotUrl: existingCoupon.screenshot_url || undefined,
    reviewText: existingCoupon.review_text || undefined,
    status: existingCoupon.status,
  };

  markUserParticipated(session.sessionId);

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}

  return session;
}

export function executeSpin(
  sessionId: string,
  isSuperMode: boolean = false
): {
  success: boolean;
  winner?: RewardWinner;
  alreadySpun?: boolean;
  message?: string;
} {
  if (!isSuperMode && hasUserParticipated()) {
    return {
      success: false,
      alreadySpun: true,
      message: "This device has already participated in Spin & Win. Each visitor is limited to 1 lucky spin.",
    };
  }

  const session = getOrCreateSession(isSuperMode);
  const winningPrize = selectWinningPrize(DEFAULT_PRIZES);

  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  const code = generateCouponCode();
  const { hardwareHash } = getDeviceAndHardwareId();

  const winner: RewardWinner = {
    prizeId: winningPrize.id,
    prizeName: winningPrize.name,
    prizeImage: winningPrize.image || getPrizeImage(winningPrize.name),
    prizeType: winningPrize.type,
    description: winningPrize.description,
    value: winningPrize.value,
    couponCode: code,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    customerName: session.customerName || "Techno Mart Guest",
    customerPhone: session.customerPhone || "",
    status: "issued",
  };

  session.hasSpun = true;
  session.coupon = winner;

  if (!isSuperMode) {
    markUserParticipated(sessionId);
    session.alreadySpun = true;
  }

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}

  // Sync to Supabase in background
  syncCouponToSupabase({
    customer_name: winner.customerName,
    customer_phone: winner.customerPhone || "PENDING_VERIFY",
    prize_id: winner.prizeId,
    prize_name: winner.prizeName,
    prize_type: winner.prizeType,
    prize_value: winner.value,
    coupon_code: winner.couponCode,
    device_fingerprint: hardwareHash,
    status: "issued",
    issued_at: winner.issuedAt,
    expires_at: winner.expiresAt,
  }).catch((err) => console.warn("Background Supabase sync error:", err));

  return {
    success: true,
    winner,
  };
}

export function saveFeedback(
  sessionId: string,
  customerName: string,
  customerPhone: string,
  feedbackText: string
): void {
  const session = getOrCreateSession(true);
  session.customerName = customerName;
  session.customerPhone = customerPhone;
  session.feedback = feedbackText;

  if (session.coupon) {
    session.coupon.customerName = customerName;
    session.coupon.customerPhone = customerPhone;
    session.coupon.reviewText = feedbackText;
  }

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}

  // Sync updated details to Supabase
  if (session.coupon) {
    const { hardwareHash } = getDeviceAndHardwareId();
    syncCouponToSupabase({
      customer_name: customerName,
      customer_phone: customerPhone,
      review_text: feedbackText,
      prize_id: session.coupon.prizeId,
      prize_name: session.coupon.prizeName,
      prize_type: session.coupon.prizeType,
      prize_value: session.coupon.value,
      coupon_code: session.coupon.couponCode,
      device_fingerprint: hardwareHash,
      status: session.reviewVerified ? "verified" : "issued",
      issued_at: session.coupon.issuedAt,
      expires_at: session.coupon.expiresAt,
    }).catch((err) => console.warn("Supabase feedback sync error:", err));
  }
}

export async function verifyScreenshotAndUnlock(
  sessionId: string,
  isSuperMode: boolean = false,
  base64Image?: string
): Promise<{
  success: boolean;
  verified: boolean;
  coupon: RewardWinner;
}> {
  const session = getOrCreateSession(isSuperMode);
  session.reviewVerified = true;

  if (!session.coupon) {
    const winningPrize = selectWinningPrize(DEFAULT_PRIZES);
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
    session.coupon = {
      prizeId: winningPrize.id,
      prizeName: winningPrize.name,
      prizeImage: winningPrize.image,
      prizeType: winningPrize.type,
      description: winningPrize.description,
      value: winningPrize.value,
      couponCode: generateCouponCode(),
      issuedAt: issuedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      customerName: session.customerName || "Techno Mart Guest",
      customerPhone: session.customerPhone,
      status: "verified",
    };
  } else {
    session.coupon.status = "verified";
  }

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}

  // Upload screenshot to Supabase Storage & sync table
  if (base64Image && session.coupon) {
    try {
      const uploadRes = await uploadReviewScreenshot(session.coupon.couponCode, base64Image);
      if (uploadRes.url) {
        session.coupon.screenshotUrl = uploadRes.url;
        try {
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
        } catch {}
      }
    } catch (err) {
      console.warn("Screenshot Supabase upload error:", err);
    }
  } else if (session.coupon) {
    // Just sync status = 'verified'
    const { hardwareHash } = getDeviceAndHardwareId();
    syncCouponToSupabase({
      customer_name: session.coupon.customerName,
      customer_phone: session.coupon.customerPhone || session.customerPhone,
      review_text: session.feedback,
      prize_id: session.coupon.prizeId,
      prize_name: session.coupon.prizeName,
      prize_type: session.coupon.prizeType,
      prize_value: session.coupon.value,
      coupon_code: session.coupon.couponCode,
      device_fingerprint: hardwareHash,
      status: "verified",
      issued_at: session.coupon.issuedAt,
      expires_at: session.coupon.expiresAt,
    }).catch(() => {});
  }

  return {
    success: true,
    verified: true,
    coupon: session.coupon,
  };
}

export function resetEntireSession(): void {
  clearParticipationLocks();
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch {}
}
