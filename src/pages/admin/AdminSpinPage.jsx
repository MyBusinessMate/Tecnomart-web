"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import {
  fetchAllSpinCoupons,
  findCouponForVerification,
  markCouponRedeemed,
  cleanIndianPhone,
} from '@/lib/supabase';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Tag,
  Clock,
  QrCode,
  Play,
  Lock,
  Search,
  Phone,
  Eye,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Image as ImageIcon,
  MessageSquare,
} from 'lucide-react';

export default function AdminSpinPage() {
  const { showToast } = useAdminToast();
  const spinSettings = useAdminStore((s) => s.spinSettings || { prizes: [], recentLogs: [] });
  const prizes = spinSettings.prizes || [];

  // Supabase live records state
  const [coupons, setCoupons] = useState([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Scanner & Counter Verification State
  const [scannerQuery, setScannerQuery] = useState('');
  const [scannedCoupon, setScannedCoupon] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [scannerMessage, setScannerMessage] = useState(null);

  // Screenshot Inspection Modal
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Slices Editor State
  const [isCreating, setIsCreating] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [testSpinResult, setTestSpinResult] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    sliceIndex: 0,
    label: '',
    type: 'voucher',
    value: 500,
    couponCode: 'SPIN500',
    weight: 15,
    active: true,
  });

  // Load Supabase Coupons
  const loadCoupons = async () => {
    setIsLoadingCoupons(true);
    try {
      const data = await fetchAllSpinCoupons();
      setCoupons(data);
    } catch (err) {
      console.warn("Error loading coupons:", err);
    } finally {
      setIsLoadingCoupons(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  // Handle Staff Verification Scanner
  const handleScannerSubmit = async (e) => {
    e.preventDefault();
    if (!scannerQuery.trim()) return;

    setIsScanning(true);
    setScannerMessage(null);
    setScannedCoupon(null);

    try {
      // Parse query if staff pasted full URL like "...?code=TM-ABCD-1234"
      let cleanQuery = scannerQuery.trim();
      if (cleanQuery.includes('code=')) {
        const urlParams = new URLSearchParams(cleanQuery.split('?')[1] || '');
        cleanQuery = urlParams.get('code') || cleanQuery;
      }

      const result = await findCouponForVerification(cleanQuery);
      if (!result) {
        setScannerMessage({
          type: 'error',
          text: `No matching voucher found for "${cleanQuery}". Verify coupon code or mobile number.`,
        });
      } else {
        setScannedCoupon(result);
        if (result.status === 'redeemed') {
          setScannerMessage({
            type: 'info',
            text: `⚠️ Voucher is already redeemed! Claimed on ${new Date(result.redeemed_at || result.updated_at || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} by ${result.redeemed_by || 'Staff'}.`,
          });
        } else {
          setScannerMessage({
            type: 'success',
            text: `Valid Voucher Found! Customer: ${result.customer_name} • Prize: ${result.prize_name}`,
          });
        }
      }
    } catch (err) {
      setScannerMessage({
        type: 'error',
        text: 'Error scanning voucher: ' + (err.message || 'Network error'),
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Handle Mark as Redeemed at Counter
  const handleRedeemAtCounter = async (couponCode) => {
    setIsRedeeming(true);
    try {
      const res = await markCouponRedeemed(couponCode, "Tolichowki Billing Terminal #1");
      if (res.success) {
        showToast(res.message);
        setScannerMessage({ type: 'success', text: res.message });
        if (res.coupon) {
          setScannedCoupon(res.coupon);
        }
        await loadCoupons();
      } else {
        showToast(res.message, 'error');
        setScannerMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      showToast(err.message || 'Redemption failed', 'error');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleOpenCreate = () => {
    if (prizes.length >= 8) {
      showToast("Wheel is locked to exactly 8 slices. You can edit any of the existing 8 slices.", "error");
      return;
    }
    setFormData({
      id: `p_${Date.now()}`,
      sliceIndex: prizes.length,
      label: '₹750 Voucher',
      type: 'voucher',
      value: 750,
      couponCode: 'SPIN750',
      weight: 10,
      active: true,
    });
    setEditingPrize(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (pz) => {
    setFormData({ ...pz });
    setEditingPrize(pz);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.label.trim()) return;

    if (isCreating && prizes.length >= 8) {
      showToast("Cannot add more than 8 slices. The spin system is locked to 8.", "error");
      return;
    }

    try {
      adminDb.saveSpinPrize({
        ...formData,
        value: Number(formData.value),
        weight: Number(formData.weight),
      });
      showToast(isCreating ? "Reward slice created!" : "Reward slice updated!");
      setIsCreating(false);
      setEditingPrize(null);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (prizes.length <= 8) {
      showToast("Cannot delete: The spin wheel requires exactly 8 sectors. You can edit this slice instead.", "error");
      setDeleteTarget(null);
      return;
    }
    adminDb.deleteSpinPrize(deleteTarget.id);
    showToast(`Removed prize slice "${deleteTarget.label}".`);
    setDeleteTarget(null);
  };

  // Admin simulated test spin
  const handleTestSpin = () => {
    const activePrizes = prizes.filter((p) => p.active);
    if (activePrizes.length === 0) return;

    const totalWeight = activePrizes.reduce((sum, p) => sum + (p.weight || 1), 0);
    let rand = Math.random() * totalWeight;
    let selected = activePrizes[0];

    for (const p of activePrizes) {
      rand -= (p.weight || 1);
      if (rand <= 0) {
        selected = p;
        break;
      }
    }

    const testCode = `${selected.couponCode}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTestSpinResult({
      label: selected.label,
      code: testCode,
      weight: selected.weight,
      probability: ((selected.weight / totalWeight) * 100).toFixed(1),
    });

    showToast(`Test spin triggered: Won "${selected.label}"`);
  };

  // Filtered coupons list
  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer_phone.includes(searchQuery) ||
      c.coupon_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.prize_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'issued' && c.status === 'issued') ||
      (statusFilter === 'verified' && c.status === 'verified') ||
      (statusFilter === 'redeemed' && c.status === 'redeemed');

    return matchesSearch && matchesStatus;
  });

  const verifiedCount = coupons.filter((c) => c.status === 'verified').length;
  const redeemedCount = coupons.filter((c) => c.status === 'redeemed').length;
  const totalValue = coupons.reduce((sum, c) => sum + (Number(c.prize_value) || 0), 0);

  return (
    <AdminLayout activeTab="spin">
      <div className="space-y-6">
        
        {/* Header with Live Supabase Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
                Spin & Win Rewards Machine
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ● Supabase Live
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Store counter verification scanner, cross-device fraud protection, Google review proof audit, and prize slices.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadCoupons}
              title="Refresh database records"
              className="p-2.5 rounded-xl text-xs font-bold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCoupons ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleTestSpin}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Spin</span>
            </button>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Total Issued
            </div>
            <div className="text-2xl font-mono font-black text-neutral-950 mt-1">
              {coupons.length}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Physical & online spins</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
              Reviews Verified
            </div>
            <div className="text-2xl font-mono font-black text-blue-700 mt-1">
              {verifiedCount}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Google screenshot confirmed</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
              Redeemed at Store
            </div>
            <div className="text-2xl font-mono font-black text-emerald-700 mt-1">
              {redeemedCount}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Vouchers claimed at billing</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider">
              Total Discount Value
            </div>
            <div className="text-2xl font-mono font-black text-amber-600 mt-1">
              ₹{totalValue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">Promotional savings generated</div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COUNTER SCANNER & MANUAL VERIFICATION TERMINAL */}
        {/* ============================================================ */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900 text-white border-2 border-amber-400/80 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                  Tolichowki Counter Verification Terminal
                </h2>
                <p className="text-[11px] text-neutral-400">
                  Scan customer QR code, enter voucher credential (e.g. TM-XXXX-XXXX), or type 10-digit mobile number.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-800 text-amber-300 font-bold border border-amber-400/30 self-start sm:self-auto">
              TERMINAL READY • REAL-TIME
            </span>
          </div>

          {/* Scanner Search Bar */}
          <form onSubmit={handleScannerSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={scannerQuery}
                onChange={(e) => setScannerQuery(e.target.value)}
                placeholder="Paste scanned QR URL, Coupon Code (e.g. TM-H92A-4B2), or 10-digit Phone..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning || !scannerQuery.trim()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              {isScanning ? (
                <span>VERIFYING...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFY CREDENTIAL</span>
                </>
              )}
            </button>
          </form>

          {/* Scanner Status Message */}
          {scannerMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2 ${
                scannerMessage.type === 'success'
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300'
                  : scannerMessage.type === 'error'
                  ? 'bg-red-950/80 border border-red-500/60 text-red-300'
                  : 'bg-amber-950/80 border border-amber-500/60 text-amber-300'
              }`}
            >
              {scannerMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span>{scannerMessage.text}</span>
            </div>
          )}

          {/* Scanned Coupon Inspection Card */}
          {scannedCoupon && (
            <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-amber-400/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    VOUCHER PASS CREDENTIAL
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-black tracking-wider text-white">
                    {scannedCoupon.coupon_code}
                  </div>
                  <div className="text-xs text-neutral-300 flex items-center gap-3 pt-1">
                    <span>Customer: <strong className="text-white">{scannedCoupon.customer_name}</strong></span>
                    <span>•</span>
                    <span>Mobile: <strong className="text-white font-mono">+91 {cleanIndianPhone(scannedCoupon.customer_phone)}</strong></span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Prize Awarded</div>
                  <div className="text-base sm:text-lg font-black text-amber-300">
                    {scannedCoupon.prize_name}
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    Value: ₹{Number(scannedCoupon.prize_value).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Review Text Preview */}
              {scannedCoupon.review_text && (
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">
                    Customer Experience Review:
                  </span>
                  <p className="italic font-sans text-neutral-200">
                    "{scannedCoupon.review_text}"
                  </p>
                </div>
              )}

              {/* Screenshot Proof Preview */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                  {scannedCoupon.screenshot_url || scannedCoupon.screenshot_base64 ? (
                    <button
                      type="button"
                      onClick={() => setSelectedScreenshot(scannedCoupon)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Uploaded Google Review Proof</span>
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-500 italic">No screenshot proof uploaded yet</span>
                  )}
                </div>

                {/* Redeem Button */}
                {scannedCoupon.status === 'redeemed' ? (
                  <div className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-400 text-xs font-mono font-bold">
                    ✓ ALREADY REDEEMED
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isRedeeming}
                    onClick={() => handleRedeemAtCounter(scannedCoupon.coupon_code)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isRedeeming ? "PROCESSING..." : "MARK AS REDEEMED AT COUNTER"}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* CUSTOMER SPINS & GOOGLE REVIEWS AUDIT TABLE */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                Customer Spin Claims & Google Review Submissions ({filteredCoupons.length} records)
              </div>
              <p className="text-[11px] text-neutral-500">
                Real-time Supabase records bound to 10-digit mobile numbers with cross-device duplicate prevention.
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter name, phone, code..."
                  className="pl-7 pr-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 w-44"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-100 p-0.5 text-xs font-mono">
                {['all', 'verified', 'redeemed', 'issued'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white text-neutral-950 shadow-2xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Mobile Number</th>
                  <th className="py-3 px-4">Prize Won</th>
                  <th className="py-3 px-4">Voucher Code</th>
                  <th className="py-3 px-4">Review Text</th>
                  <th className="py-3 px-4">Proof</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoadingCoupons ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-xs text-neutral-400 font-mono">
                      Loading Supabase records...
                    </td>
                  </tr>
                ) : filteredCoupons.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-xs text-neutral-400 font-mono">
                      No coupon records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCoupons.map((c) => {
                    const cleanPhone = cleanIndianPhone(c.customer_phone);
                    return (
                      <tr key={c.id || c.coupon_code} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-3 px-4 text-[11px] font-mono text-neutral-500 whitespace-nowrap">
                          {new Date(c.issued_at || c.created_at || Date.now()).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>

                        <td className="py-3 px-4 font-bold text-neutral-950 whitespace-nowrap">
                          {c.customer_name}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-neutral-900 whitespace-nowrap">
                          <a
                            href={`tel:+91${cleanPhone}`}
                            className="hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                          >
                            <span>+91 {cleanPhone}</span>
                          </a>
                        </td>

                        <td className="py-3 px-4 font-bold text-neutral-950 whitespace-nowrap">
                          <div>{c.prize_name}</div>
                          <span className="text-[10px] font-mono text-neutral-400 font-normal">
                            Val: ₹{Number(c.prize_value).toLocaleString('en-IN')}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-amber-800 whitespace-nowrap">
                          {c.coupon_code}
                        </td>

                        <td className="py-3 px-4 max-w-xs truncate text-[11px] text-neutral-600" title={c.review_text || ''}>
                          {c.review_text ? (
                            <span className="italic">"{c.review_text}"</span>
                          ) : (
                            <span className="text-neutral-400 font-mono text-[10px]">No review written</span>
                          )}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          {c.screenshot_url || c.screenshot_base64 ? (
                            <button
                              type="button"
                              onClick={() => setSelectedScreenshot(c)}
                              className="px-2 py-1 rounded bg-neutral-100 hover:bg-amber-100 text-neutral-800 hover:text-amber-950 text-[10px] font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3 text-amber-600" />
                              <span>View Proof</span>
                            </button>
                          ) : (
                            <span className="text-[10px] font-mono text-neutral-400">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              c.status === 'redeemed'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : c.status === 'verified'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {c.status === 'redeemed' ? 'Redeemed' : c.status === 'verified' ? 'Verified' : 'Issued'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {c.status === 'redeemed' ? (
                            <span className="text-[10px] font-mono text-neutral-400">✓ Claimed</span>
                          ) : (
                            <button
                              onClick={() => handleRedeemAtCounter(c.coupon_code)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-neutral-900 hover:bg-black text-amber-300 transition-colors cursor-pointer"
                            >
                              Redeem
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRIZE SLICES CONFIGURATION */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
              Active Wheel Slices ({prizes.length} configured)
            </div>
            <div className="text-xs text-neutral-500">
              Total Probability Weight: <span className="font-mono font-bold text-neutral-900">{prizes.reduce((s, p) => s + (p.weight || 0), 0)}</span>
            </div>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Slice Index</th>
                <th className="py-3 px-4">Prize Label</th>
                <th className="py-3 px-4">Reward Type</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Coupon Prefix</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {prizes.map((pz, idx) => (
                <tr key={pz.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-neutral-500">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-neutral-950">
                    {pz.label}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold">
                      {pz.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                    ₹{pz.value}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                    {pz.couponCode}
                  </td>
                  <td className="py-3 px-4 font-mono text-neutral-700">
                    {pz.weight}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(pz)}
                      title="Edit prize slice settings"
                      className="px-2.5 py-1.5 rounded-md text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-amber-100 hover:text-amber-950 transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-neutral-700" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SCREENSHOT PROOF ZOOM MODAL */}
        {selectedScreenshot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
            <div className="relative w-full max-w-xl bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-950 uppercase tracking-tight">
                    Google Review Screenshot Proof
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {selectedScreenshot.customer_name} (+91 {cleanIndianPhone(selectedScreenshot.customer_phone)}) • {selectedScreenshot.coupon_code}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 cursor-pointer rounded-lg hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 bg-neutral-100 flex items-center justify-center max-h-[60vh] overflow-y-auto">
                <img
                  src={selectedScreenshot.screenshot_url || selectedScreenshot.screenshot_base64 || ''}
                  alt={`Proof by ${selectedScreenshot.customer_name}`}
                  className="max-w-full max-h-[55vh] object-contain rounded-xl border border-neutral-300 shadow-md"
                />
              </div>

              {selectedScreenshot.review_text && (
                <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-700">
                  <strong className="text-neutral-900 block font-mono text-[10px] uppercase mb-1">
                    Submitted Review Text:
                  </strong>
                  <p className="italic">"{selectedScreenshot.review_text}"</p>
                </div>
              )}

              <div className="p-4 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl cursor-pointer"
                >
                  Close Proof Viewer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CREATE / EDIT SLICE MODAL */}
        {(isCreating || editingPrize) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Create Prize Slice" : `Edit Slice: ${formData.label}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingPrize(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Prize Label on Wheel *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g. ₹1,000 Off Voucher"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Reward Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    >
                      <option value="voucher">Store Voucher</option>
                      <option value="discount">Instant Cash Discount</option>
                      <option value="accessory">Free Tech Accessory</option>
                      <option value="service">Free Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Value (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Coupon Prefix *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.couponCode}
                      onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                      placeholder="SPIN1000"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Probability Weight *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      placeholder="15"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingPrize(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Save Slice" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Reward Slice"
          message="Are you sure you want to remove this slice from the wheel? Customers will no longer be able to land on this reward."
          itemName={deleteTarget ? deleteTarget.label : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
