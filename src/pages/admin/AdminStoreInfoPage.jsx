"use client";

import React, { useState } from 'react';
import AdminLayout, { useAdminToast } from '@/components/admin/AdminLayout';
import { useAdminStore, adminDb } from '@/lib/admin/adminStore';
import { MapPin, Phone, MessageSquare, Clock, Globe, Save } from 'lucide-react';

export default function AdminStoreInfoPage() {
  const { showToast } = useAdminToast();
  const currentInfo = useAdminStore((s) => s.storeInfo || {});

  const [formData, setFormData] = useState({
    storeName: currentInfo.storeName || 'TecnoMart Flagship Tech Hub',
    addressLine1: currentInfo.addressLine1 || 'Shop #4 & 5, Near Tolichowki Flyover, Main Road',
    addressLine2: currentInfo.addressLine2 || 'Jubilee Hills Road No. 36 Express Branch',
    city: currentInfo.city || 'Hyderabad',
    state: currentInfo.state || 'Telangana',
    pincode: currentInfo.pincode || '500008',
    phonePrimary: currentInfo.phonePrimary || '+91 90106 67726',
    phoneSecondary: currentInfo.phoneSecondary || '+91 80080 12345',
    whatsappNumber: currentInfo.whatsappNumber || '919010667726',
    supportEmail: currentInfo.supportEmail || 'support@tecnomart.in',
    workingHoursWeekday: currentInfo.workingHoursWeekday || 'Monday – Saturday: 10:30 AM – 10:00 PM',
    workingHoursWeekend: currentInfo.workingHoursWeekend || 'Sunday: 11:00 AM – 9:30 PM',
    googleMapsUrl: currentInfo.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Tolichowki+Hyderabad'
  });

  const handleSave = (e) => {
    e.preventDefault();
    adminDb.saveStoreInfo(formData);
    showToast("Store coordinates and contact info updated live!");
  };

  return (
    <AdminLayout activeTab="store-info">
      <div className="space-y-6 max-w-4xl">
        
        {/* Header */}
        <div className="pb-2 border-b border-neutral-200">
          <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight uppercase">
            Store Contact & Physical Address
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Updates physical store address, contact numbers, WhatsApp dispatch, and operating timings across all headers, footers, and Google Maps links.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Card 1: Physical Location */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span>Physical Storefront Locations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Store Display Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Primary Address Line 1 (Tolichowki)
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Secondary Address Line 2 (Jubilee Hills)
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  City & State
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Postal Pincode
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Contact Numbers & WhatsApp */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
              <Phone className="w-4 h-4 text-neutral-500" />
              <span>Contact Channels & WhatsApp</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Primary Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.phonePrimary}
                  onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  WhatsApp Direct Number (e.g. 919010667726)
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Customer Support Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>Store Operating Timings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Weekday Hours (Mon – Sat)
                </label>
                <input
                  type="text"
                  required
                  value={formData.workingHoursWeekday}
                  onChange={(e) => setFormData({ ...formData, workingHoursWeekday: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1">
                  Weekend Hours (Sunday)
                </label>
                <input
                  type="text"
                  required
                  value={formData.workingHoursWeekend}
                  onChange={(e) => setFormData({ ...formData, workingHoursWeekend: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Store Coordinates</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
