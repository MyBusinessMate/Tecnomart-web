"use client";

import { DEFAULT_PRIZES, selectWinningPrize, getPrizeImage, PrizeDefinition } from "./prizes";
import { generateCouponCode } from "./code-generator";
import { getDeviceAndHardwareId, hasUserParticipated, markUserParticipated, clearParticipationLocks } from "./device";

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

export function executeSpin(sessionId: string, isSuperMode: boolean = false): {
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
    customerPhone: session.customerPhone,
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
  }
  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}
}

export function verifyScreenshotAndUnlock(
  sessionId: string,
  isSuperMode: boolean = false
): {
  success: boolean;
  verified: boolean;
  coupon: RewardWinner;
} {
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
    };
  }

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch {}

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
