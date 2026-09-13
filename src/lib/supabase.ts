import { createClient } from "@supabase/supabase-js";

export interface SpinCouponRecord {
  id: string;
  customer_name: string;
  customer_phone: string;
  review_text: string | null;
  screenshot_url: string | null;
  screenshot_base64?: string | null;
  prize_id: string;
  prize_name: string;
  prize_type: string;
  prize_value: number;
  coupon_code: string;
  device_fingerprint?: string | null;
  status: "issued" | "verified" | "redeemed" | "expired";
  issued_at: string;
  expires_at: string;
  redeemed_at: string | null;
  redeemed_by: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://icbopvpqckwwzznkypkf.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYm9wdnBxY2t3d3p6bmt5cGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyODAzMDIsImV4cCI6MjEwNDg1NjMwMn0.PDb18ER3u1AfR_ll1WjhnvP26swDEmasY1DaB1a6-cU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
});

/**
 * Clean 10-digit Indian phone number
 */
export function cleanIndianPhone(raw: string): string {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits.slice(-10);
}

/**
 * Check if a mobile number has already redeemed or spun across ANY device
 */
export async function checkMobileAlreadyRedeemed(phone: string): Promise<{
  alreadyRedeemed: boolean;
  coupon: SpinCouponRecord | null;
  error?: string;
}> {
  const cleaned = cleanIndianPhone(phone);
  if (!cleaned || cleaned.length !== 10) {
    return { alreadyRedeemed: false, coupon: null };
  }

  try {
    const { data, error } = await supabase
      .from("spin_coupons")
      .select("*")
      .ilike("customer_phone", `%${cleaned}%`)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.warn("Supabase phone check warning:", error);
      return { alreadyRedeemed: false, coupon: null, error: error.message };
    }

    if (data && data.length > 0) {
      return {
        alreadyRedeemed: true,
        coupon: data[0] as SpinCouponRecord,
      };
    }

    return { alreadyRedeemed: false, coupon: null };
  } catch (err: any) {
    console.warn("Supabase connection check failed:", err);
    return { alreadyRedeemed: false, coupon: null, error: err.message };
  }
}

/**
 * Create or sync coupon record to Supabase database
 */
export async function syncCouponToSupabase(record: {
  customer_name: string;
  customer_phone: string;
  review_text?: string;
  screenshot_url?: string;
  screenshot_base64?: string;
  prize_id: string;
  prize_name: string;
  prize_type?: string;
  prize_value?: number;
  coupon_code: string;
  device_fingerprint?: string;
  status?: "issued" | "verified" | "redeemed";
  issued_at?: string;
  expires_at?: string;
}): Promise<SpinCouponRecord | null> {
  const cleanedPhone = cleanIndianPhone(record.customer_phone);

  const payload = {
    customer_name: record.customer_name || "Techno Mart Guest",
    customer_phone: cleanedPhone || record.customer_phone || "UNSPECIFIED",
    review_text: record.review_text || null,
    screenshot_url: record.screenshot_url || null,
    screenshot_base64: record.screenshot_base64 || null,
    prize_id: record.prize_id,
    prize_name: record.prize_name,
    prize_type: record.prize_type || "voucher",
    prize_value: record.prize_value || 0,
    coupon_code: record.coupon_code,
    device_fingerprint: record.device_fingerprint || null,
    status: record.status || "issued",
    issued_at: record.issued_at || new Date().toISOString(),
    expires_at: record.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("spin_coupons")
      .upsert(payload, { onConflict: "coupon_code" })
      .select()
      .single();

    if (error) {
      console.warn("Supabase upsert warning:", error);
      return null;
    }
    return data as SpinCouponRecord;
  } catch (err) {
    console.warn("Supabase upsert network error:", err);
    return null;
  }
}

/**
 * Upload screenshot to Supabase Storage and update coupon record
 */
export async function uploadReviewScreenshot(
  couponCode: string,
  base64Data: string
): Promise<{ url: string | null; success: boolean }> {
  try {
    // 1. Convert base64 Data URL to Blob
    const match = base64Data.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) {
      // Just save base64 directly to DB table as fallback
      await supabase
        .from("spin_coupons")
        .update({
          screenshot_base64: base64Data,
          status: "verified",
          updated_at: new Date().toISOString(),
        })
        .eq("coupon_code", couponCode);
      return { url: null, success: true };
    }

    const mimeType = match[1];
    const b64 = match[2];
    const byteCharacters = atob(b64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") || "png";
    const fileName = `${couponCode.replace(/[^a-zA-Z0-9_-]/g, "")}_${Date.now()}.${ext}`;

    // 2. Upload to review-screenshots bucket
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from("review-screenshots")
      .upload(fileName, blob, {
        contentType: mimeType,
        upsert: true,
      });

    let publicUrl: string | null = null;
    if (!uploadErr && uploadData) {
      const { data: urlData } = supabase.storage
        .from("review-screenshots")
        .getPublicUrl(fileName);
      publicUrl = urlData.publicUrl;
    }

    // 3. Update spin_coupons table with both publicUrl & base64
    await supabase
      .from("spin_coupons")
      .update({
        screenshot_url: publicUrl,
        screenshot_base64: base64Data,
        status: "verified",
        updated_at: new Date().toISOString(),
      })
      .eq("coupon_code", couponCode);

    return { url: publicUrl, success: true };
  } catch (err) {
    console.warn("Screenshot upload error:", err);
    // Fallback update DB with base64
    try {
      await supabase
        .from("spin_coupons")
        .update({
          screenshot_base64: base64Data,
          status: "verified",
          updated_at: new Date().toISOString(),
        })
        .eq("coupon_code", couponCode);
    } catch {}
    return { url: null, success: true };
  }
}

/**
 * Fetch all spin coupons for Admin Dashboard
 */
export async function fetchAllSpinCoupons(): Promise<SpinCouponRecord[]> {
  try {
    const { data, error } = await supabase
      .from("spin_coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Error fetching coupons:", error);
      return [];
    }
    return (data || []) as SpinCouponRecord[];
  } catch (err) {
    console.warn("Network error fetching coupons:", err);
    return [];
  }
}

/**
 * Search coupon by code or mobile number (for Staff Counter Scanner)
 */
export async function findCouponForVerification(query: string): Promise<SpinCouponRecord | null> {
  const cleanQ = query.trim().toUpperCase();
  const digits = cleanIndianPhone(query);

  try {
    // 1. Try exact coupon code match
    const { data: codeData } = await supabase
      .from("spin_coupons")
      .select("*")
      .ilike("coupon_code", cleanQ)
      .limit(1);

    if (codeData && codeData.length > 0) {
      return codeData[0] as SpinCouponRecord;
    }

    // 2. Try mobile number match
    if (digits && digits.length >= 7) {
      const { data: phoneData } = await supabase
        .from("spin_coupons")
        .select("*")
        .ilike("customer_phone", `%${digits}%`)
        .order("created_at", { ascending: false })
        .limit(1);

      if (phoneData && phoneData.length > 0) {
        return phoneData[0] as SpinCouponRecord;
      }
    }

    return null;
  } catch (err) {
    console.warn("Error finding coupon:", err);
    return null;
  }
}

/**
 * Mark coupon as Redeemed at physical store counter
 */
export async function markCouponRedeemed(
  couponCode: string,
  staffName: string = "Staff Counter"
): Promise<{ success: boolean; message: string; coupon?: SpinCouponRecord }> {
  try {
    const coupon = await findCouponForVerification(couponCode);
    if (!coupon) {
      return { success: false, message: "Coupon credential not found in database." };
    }

    if (coupon.status === "redeemed") {
      const redeemedDate = coupon.redeemed_at
        ? new Date(coupon.redeemed_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        : "previously";
      return {
        success: false,
        message: `Already Redeemed! This voucher was claimed on ${redeemedDate} by ${coupon.redeemed_by || "Staff"}.`,
        coupon,
      };
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("spin_coupons")
      .update({
        status: "redeemed",
        redeemed_at: now,
        redeemed_by: staffName,
        updated_at: now,
      })
      .eq("coupon_code", coupon.coupon_code)
      .select()
      .single();

    if (error) {
      return { success: false, message: "Failed to update redemption status: " + error.message };
    }

    return {
      success: true,
      message: `Success! ${coupon.prize_name} marked as REDEEMED for ${coupon.customer_name} (+91 ${cleanIndianPhone(coupon.customer_phone)}).`,
      coupon: data as SpinCouponRecord,
    };
  } catch (err: any) {
    return { success: false, message: "Redemption error: " + err.message };
  }
}
