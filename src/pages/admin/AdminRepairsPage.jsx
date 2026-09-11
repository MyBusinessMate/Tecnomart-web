"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { Wrench, Plus, Edit2, Trash2, X, Clock, ShieldCheck } from 'lucide-react';

export default function AdminRepairsPage() {
  const { showToast } = useAdminToast();
  const repairs = useAdminStore((s) => s.repairs || []);

  const [isCreating, setIsCreating] = useState(false);
  const [editingRepair, setEditingRepair] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    serviceName: '',
    deviceType: 'iPhone',
    turnaroundTime: '30 Minutes',
    estimatedPrice: '₹2,499 - ₹6,499',
    rawPrice: 2499,
    warrantyMonths: 6,
    status: 'Active',
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `rep_${Date.now()}`,
      serviceName: '',
      deviceType: 'iPhone',
      turnaroundTime: '30 Minutes',
      estimatedPrice: '₹3,499',
      rawPrice: 3499,
      warrantyMonths: 6,
      status: 'Active',
    });
    setEditingRepair(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (rep) => {
    setFormData({ ...rep });
    setEditingRepair(rep);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.serviceName.trim()) return;

    adminDb.saveRepair(formData);
    showToast(isCreating ? "Repair service added!" : "Repair service updated!");
    setIsCreating(false);
    setEditingRepair(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deleteRepair(deleteTarget.id);
    showToast(`Deleted service "${deleteTarget.serviceName}".`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout activeTab="repairs">
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Repair Services & Turnaround Timings
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Configure in-store diagnostics, repair rates, warranty coverage, and completion times.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Repair Service</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Service Name</th>
                <th className="py-3 px-4">Device Target</th>
                <th className="py-3 px-4">Turnaround Time</th>
                <th className="py-3 px-4">Estimated Rate</th>
                <th className="py-3 px-4">Warranty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {repairs.map((rep) => (
                <tr key={rep.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-neutral-950">
                    {rep.serviceName}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                    {rep.deviceType}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-700">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{rep.turnaroundTime}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-neutral-950">
                    {rep.estimatedPrice}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-700">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{rep.warrantyMonths} Months</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`
                      text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded
                      ${rep.status === 'Active' ? 'bg-[#EDF3EC] text-[#346538]' : 'bg-[#FBF3DB] text-[#956400]'}
                    `}>
                      {rep.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(rep)}
                        className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(rep)}
                        className="p-1.5 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {(isCreating || editingRepair) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Add Repair Service" : `Edit: ${formData.serviceName}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingRepair(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    placeholder="e.g. Original OLED Screen Replacement"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Target Device *
                    </label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    >
                      <option value="iPhone">iPhone</option>
                      <option value="Samsung">Samsung Galaxy</option>
                      <option value="MacBook">MacBook</option>
                      <option value="Laptop">Windows Laptop</option>
                      <option value="iPad">iPad / Tablet</option>
                      <option value="Console">Console / Rig</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Turnaround Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.turnaroundTime}
                      onChange={(e) => setFormData({ ...formData, turnaroundTime: e.target.value })}
                      placeholder="e.g. 30 Minutes, 2 Hours"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Estimated Rate Text *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedPrice}
                      onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })}
                      placeholder="₹4,999 - ₹18,999"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Warranty (Months) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.warrantyMonths}
                      onChange={(e) => setFormData({ ...formData, warrantyMonths: parseInt(e.target.value, 10) || 6 })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Service Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  >
                    <option value="Active">Active (Taking bookings)</option>
                    <option value="High Demand">High Demand</option>
                    <option value="Paused">Temporarily Paused</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingRepair(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Save Service" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Repair Service"
          message="Are you sure you want to delete this repair service? Customers will no longer see it on the repairs booking page."
          itemName={deleteTarget ? `${deleteTarget.serviceName} (${deleteTarget.deviceType})` : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
