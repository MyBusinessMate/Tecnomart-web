"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { Layers, Plus, Edit2, Trash2, X, FolderTree } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { showToast } = useAdminToast();
  const categories = useAdminStore((s) => s.categories || []);
  const products = useAdminStore((s) => s.products || []);

  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    type: 'mobiles',
    description: '',
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `cat_${Date.now()}`,
      name: '',
      slug: '',
      type: 'mobiles',
      description: '',
    });
    setEditingCategory(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (cat) => {
    setFormData({ ...cat });
    setEditingCategory(cat);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    adminDb.saveCategory(formData);
    showToast(isCreating ? "Category created!" : "Category updated!");
    setIsCreating(false);
    setEditingCategory(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deleteCategory(deleteTarget.id);
    showToast(`Deleted category "${deleteTarget.name}".`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout activeTab="categories">
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Product Categories & Types
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Configure store taxonomy, slugs, and navigation departments.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid / Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug Identifier</th>
                <th className="py-3 px-4">Department Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Live Items</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat) => {
                const count = products.filter((p) => p.type === cat.type || p.category === cat.name).length;
                return (
                  <tr key={cat.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-neutral-950">
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">
                      /{cat.slug}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-bold">
                        {cat.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600 max-w-sm truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                      {count} items
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          className="p-1.5 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CREATE / EDIT MODAL */}
        {(isCreating || editingCategory) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Create Category" : `Edit Category: ${formData.name}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingCategory(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Category Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gaming Desktops"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. gaming-pcs"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Department Mapping *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  >
                    <option value="mobiles">Smartphones (mobiles)</option>
                    <option value="laptops">Laptops (laptops)</option>
                    <option value="gaming">Gaming Rigs (gaming)</option>
                    <option value="accessories">Accessories (accessories)</option>
                    <option value="refurbished">Certified Refurbished (refurbished)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Short description for customer catalog header..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingCategory(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Save Category" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Category"
          message="Are you sure you want to delete this category? Associated products will remain in the catalog under their base department."
          itemName={deleteTarget ? deleteTarget.name : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
