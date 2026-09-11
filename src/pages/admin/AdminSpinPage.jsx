"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { Sparkles, Plus, Edit2, Trash2, X, Check, Tag, Clock, QrCode, Play, Lock } from 'lucide-react';

export default function AdminSpinPage() {
  const { showToast } = useAdminToast();
  const spinSettings = useAdminStore((s) => s.spinSettings || { prizes: [], recentLogs: [] });
  const prizes = spinSettings.prizes || [];
  const logs = spinSettings.recentLogs || [];

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

    // Weighted random selection
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

    // Record to audit logs
    adminDb.addSpinLog({
      prize: selected.label,
      code: testCode,
      timestamp: new Date().toISOString(),
      verified: false,
    });

    showToast(`Test spin triggered: Won "${selected.label}"`);
  };

  return (
    <AdminLayout activeTab="spin">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Spin & Win Rewards Machine
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Configure wheel prize slices, probability weights, discount voucher codes, and claim audit logs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestSpin}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-neutral-800 bg-white border border-neutral-200 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Test Spin</span>
            </button>
            {prizes.length >= 8 ? (
              <div className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Locked: 8/8 Slices (Standard Wheel Geometry)</span>
              </div>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Prize Slice</span>
              </button>
            )}
          </div>
        </div>

        {/* Test Spin Result Banner */}
        {testSpinResult && (
          <div className="p-4 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center flex-shrink-0 font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">Test Spin Outcome</div>
                <div className="text-sm font-bold text-white">{testSpinResult.label}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>Voucher: <span className="font-bold text-amber-300">{testSpinResult.code}</span></div>
              <div className="text-neutral-400">Probability: {testSpinResult.probability}%</div>
              <button
                onClick={() => setTestSpinResult(null)}
                className="text-neutral-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PRIZE SLICES TABLE */}
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
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(pz)}
                        title="Edit prize slice settings"
                        className="px-2.5 py-1.5 rounded-md text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-amber-100 hover:text-amber-950 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-neutral-700" />
                        <span>Edit Slice</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECENT SPIN AUDIT LOGS */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600">
              Customer Spin & Verification Logs ({logs.length})
            </div>
            <div className="text-[11px] text-neutral-500">
              Anti-fraud encrypted records
            </div>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Prize Awarded</th>
                <th className="py-3 px-4">Generated Voucher Pass</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/60 transition-colors text-[11px]">
                  <td className="py-2.5 px-4 text-neutral-500">
                    {new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-neutral-900 font-sans text-xs">
                    {log.prize}
                  </td>
                  <td className="py-2.5 px-4 text-amber-700 font-bold">
                    {log.code}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`
                      text-[10px] uppercase px-1.5 py-0.5 rounded font-bold
                      ${log.verified ? 'bg-[#EDF3EC] text-[#346538]' : 'bg-[#FBF3DB] text-[#956400]'}
                    `}>
                      {log.verified ? 'Verified & Claimed' : 'Issued / Pending Claim'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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
