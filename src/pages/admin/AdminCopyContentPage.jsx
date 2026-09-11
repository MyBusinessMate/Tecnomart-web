"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { FileText, Save, ShieldCheck, Scale, Sparkles } from 'lucide-react';

export default function AdminCopyContentPage() {
  const { showToast } = useAdminToast();
  const legalContent = useAdminStore((s) => s.legalContent || {});

  const [formData, setFormData] = useState({
    termsOfService: legalContent.termsOfService || '',
    privacyPolicy: legalContent.privacyPolicy || '',
    returnAndWarranty: legalContent.returnAndWarranty || '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    adminDb.saveLegalContent(formData);
    showToast("Legal policies and terms updated across storefront!");
  };

  return (
    <AdminLayout activeTab="copy-content">
      <div className="space-y-6 max-w-4xl">
        
        {/* Header */}
        <div className="pb-2 border-b border-neutral-200">
          <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
            Storefront Copy & Legal Policies
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Database-backed content for customer-facing Terms of Service, Privacy Policy, and Return Guarantees.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Terms of Service */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
              <Scale className="w-4 h-4 text-neutral-500" />
              <span>Terms of Service Policy</span>
            </div>
            <p className="text-xs text-neutral-500">
              Displayed on <span className="font-mono text-neutral-700">/terms</span> and during checkout validation.
            </p>
            <textarea
              rows={6}
              required
              value={formData.termsOfService}
              onChange={(e) => setFormData({ ...formData, termsOfService: e.target.value })}
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-sans text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900 leading-relaxed"
            />
          </div>

          {/* Privacy Policy */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
              <ShieldCheck className="w-4 h-4 text-neutral-500" />
              <span>Privacy Policy</span>
            </div>
            <p className="text-xs text-neutral-500">
              Displayed on <span className="font-mono text-neutral-700">/privacy</span> regarding customer numbers and orders.
            </p>
            <textarea
              rows={6}
              required
              value={formData.privacyPolicy}
              onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-sans text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900 leading-relaxed"
            />
          </div>

          {/* Return & Warranty Policy */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
              <Sparkles className="w-4 h-4 text-neutral-500" />
              <span>Return & Warranty Guidelines</span>
            </div>
            <p className="text-xs text-neutral-500">
              Explains the 7-day brand replacement guarantee and refurbished store warranty.
            </p>
            <textarea
              rows={5}
              required
              value={formData.returnAndWarranty}
              onChange={(e) => setFormData({ ...formData, returnAndWarranty: e.target.value })}
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-sans text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900 leading-relaxed"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Policies</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
