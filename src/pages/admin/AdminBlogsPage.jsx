"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import AdminConfirmModal from '@/components/admin/AdminConfirmModal';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { BookOpen, Plus, Edit2, Trash2, X, Calendar, User } from 'lucide-react';

export default function AdminBlogsPage() {
  const { showToast } = useAdminToast();
  const blogs = useAdminStore((s) => s.blogs || []);

  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    author: 'TecnoMart Editorial Staff',
    date: 'September 2026',
    readTime: '5 min read',
    content: '',
    published: true,
  });

  const handleOpenCreate = () => {
    setFormData({
      id: `b_${Date.now()}`,
      title: '',
      slug: '',
      excerpt: '',
      author: 'TecnoMart Editorial Staff',
      date: 'September 2026',
      readTime: '5 min read',
      content: '',
      published: true,
    });
    setEditingBlog(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (blog) => {
    setFormData({ ...blog });
    setEditingBlog(blog);
    setIsCreating(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    adminDb.saveBlog(formData);
    showToast(isCreating ? "Article published!" : "Article updated!");
    setIsCreating(false);
    setEditingBlog(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    adminDb.deleteBlog(deleteTarget.id);
    showToast(`Article "${deleteTarget.title}" removed.`);
    setDeleteTarget(null);
  };

  return (
    <AdminLayout activeTab="blogs">
      <div className="space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
              Tech Guides & CMS Articles
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Create, edit, and publish buyer guides, benchmarks, and comparison articles.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`
                    text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded
                    ${blog.published ? 'bg-[#EDF3EC] text-[#346538]' : 'bg-[#FBF3DB] text-[#956400]'}
                  `}>
                    {blog.published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="p-1 rounded text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(blog)}
                      className="p-1 rounded text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-neutral-950 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-1 text-neutral-600">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-[150px]">{blog.author}</span>
                </div>
                <div>{blog.readTime || '5 min'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {(isCreating || editingBlog) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-5">
                <h3 className="text-base font-bold text-neutral-950 uppercase tracking-tight">
                  {isCreating ? "Draft New Tech Guide" : `Edit Article: ${formData.title}`}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingBlog(null); }}
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. iPhone 16 Pro Max vs Samsung Galaxy S24 Ultra in Hyderabad"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Author Attribution *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g. 6 min read"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Short Summary / Excerpt *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="One or two sentences summarizing the key takeaway..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                    Article Full Content *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write the full markdown or plain text article..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none font-mono leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="blog-published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-900"
                  />
                  <label htmlFor="blog-published" className="text-xs font-semibold text-neutral-700 cursor-pointer">
                    Publish immediately to customer storefront
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => { setIsCreating(false); setEditingBlog(null); }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 rounded-lg cursor-pointer shadow-xs"
                  >
                    {isCreating ? "Publish Guide" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        <AdminConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Article"
          message="Are you sure you want to delete this guide? It will be removed from all SEO sitemaps and blog listings."
          itemName={deleteTarget ? deleteTarget.title : ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />

      </div>
    </AdminLayout>
  );
}
