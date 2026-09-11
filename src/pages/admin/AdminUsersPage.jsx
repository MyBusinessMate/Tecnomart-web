"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { Users, Plus, Edit2, Trash2, X, Shield, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function AdminUsersPage() {
  const { showToast } = useAdminToast();
  const staffUsers = useAdminStore((s) => s.staffUsers || []);

  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'manager',
    department: 'Operations',
    lastActive: 'Active today',
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `u_${Date.now()}`,
      name: '',
      email: '',
      role: 'manager',
      department: 'Operations',
      lastActive: 'Just invited',
    });
    setEditingUser(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (user) => {
    setFormData({ ...user });
    setEditingUser(user);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.name.trim()) return;

    adminDb.saveStaffUser(formData);
    showToast(isCreating ? "Staff user invited successfully!" : "Staff permissions updated!");
    setIsCreating(false);
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deleteStaffUser(deleteTarget.id);
    showToast(`Removed access for "${deleteTarget.name}".`);
    setDeleteTarget(null);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'superadmin':
        return 'bg-[#EDF3EC] text-[#346538]';
      case 'manager':
        return 'bg-[#E1F3FE] text-[#1F6C9F]';
      case 'editor':
        return 'bg-[#FBF3DB] text-[#956400]';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <AdminLayout activeTab="users">
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Staff Management & RBAC Permissions
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Super Admin control center to manage store employees, managers, editors, and cashiers.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Role Permission</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status / Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {staffUsers.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-neutral-950">{u.name}</div>
                    <div className="text-[11px] text-neutral-400 font-mono">ID: {u.id}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-700">
                    {u.email}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${getRoleBadge(u.role)}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    {u.department}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">
                    {u.lastActive || "Recently"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        disabled={u.role === 'superadmin'}
                        title={u.role === 'superadmin' ? "Cannot delete primary Superadmin" : "Remove staff access"}
                        className="p-1.5 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
        {(isCreating || editingUser) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Invite Staff Member" : `Edit Permissions: ${formData.name}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingUser(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Staff Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@tecnomart.in"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    System Role / Access Level *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  >
                    <option value="superadmin">Superadmin (Full Unrestricted Access)</option>
                    <option value="manager">Store Manager (Products, Pricing, Repairs)</option>
                    <option value="editor">Content Editor (Catalog & Blogs Only)</option>
                    <option value="viewer">Support / Cashier (Read-Only & Spin Verification)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Jubilee Hills Branch / Technical Lab"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingUser(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Grant Access" : "Save Role"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Revoke Staff Access"
          message="Are you sure you want to revoke system access for this staff member? Their session will be immediately terminated."
          itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.email})` : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
