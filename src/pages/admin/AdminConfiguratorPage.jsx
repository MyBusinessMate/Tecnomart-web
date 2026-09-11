"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { Cpu, Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';

export default function AdminConfiguratorPage() {
  const { showToast } = useAdminToast();
  const pcParts = useAdminStore((s) => s.pcParts || []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    category: 'cpu',
    name: '',
    brand: 'AMD',
    price: 35000,
    specs: '',
    inStock: true,
  });

  const filteredParts = pcParts.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `part_${Date.now()}`,
      category: 'cpu',
      name: '',
      brand: 'AMD',
      price: 25000,
      specs: '',
      inStock: true,
    });
    setEditingPart(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (part) => {
    setFormData({ ...part });
    setEditingPart(part);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    adminDb.savePcPart({ ...formData, price: Number(formData.price) });
    showToast(isCreating ? "Component added to PC configurator!" : "Component updated!");
    setIsCreating(false);
    setEditingPart(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deletePcPart(deleteTarget.id);
    showToast(`Deleted component "${deleteTarget.name}".`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout activeTab="configurator">
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              PC Configurator & Parts Pricing
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Configure CPUs, GPUs, RAM, motherboards, storage, and cases for customer custom PC builds.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Component</span>
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search component name or brand..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold px-3 py-2 text-neutral-900 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="all">All Components ({pcParts.length})</option>
              <option value="cpu">Processors (CPU)</option>
              <option value="gpu">Graphics Cards (GPU)</option>
              <option value="ram">Memory (RAM)</option>
              <option value="storage">Storage (SSD / NVMe)</option>
              <option value="motherboard">Motherboards</option>
              <option value="psu">Power Supplies (PSU)</option>
              <option value="cabinet">Cases & Cabinets</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Component Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Specs Summary</th>
                <th className="py-3 px-4">Configurator Rate</th>
                <th className="py-3 px-4">In Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-neutral-950">
                    {part.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {part.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-600">
                    {part.brand}
                  </td>
                  <td className="py-3 px-4 text-neutral-500 max-w-xs truncate">
                    {part.specs || "—"}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-neutral-950">
                    ₹{Number(part.price).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#EDF3EC] text-[#346538]">
                      YES
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(part)}
                        className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(part)}
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

        {/* CREATE / EDIT MODAL */}
        {(isCreating || editingPart) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Add PC Component" : `Edit: ${formData.name}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingPart(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Component Model / Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. AMD Ryzen 9 9950X"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Component Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    >
                      <option value="cpu">Processor (CPU)</option>
                      <option value="gpu">Graphics Card (GPU)</option>
                      <option value="ram">RAM Memory</option>
                      <option value="storage">Storage (SSD / NVMe)</option>
                      <option value="motherboard">Motherboard</option>
                      <option value="psu">Power Supply (PSU)</option>
                      <option value="cabinet">Cabinet / Case</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. AMD, NVIDIA, Corsair"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Configurator Unit Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="58999"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono font-bold text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Specs Summary
                  </label>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="e.g. Up to 5.7GHz, AM5 Socket, 80MB Cache"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingPart(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Save Component" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Delete PC Component"
          message="Are you sure you want to remove this component from the custom PC configurator?"
          itemName={deleteTarget ? `${deleteTarget.name} (₹${deleteTarget.price})` : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
