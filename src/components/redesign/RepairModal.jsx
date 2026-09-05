"use client";

import React, { useState } from 'react';
import { X, Wrench } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useShop } from '@/context/ShopContext';

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM",
];

function getNextDates() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push({
      index: i,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : `${days[d.getDay()]} ${d.getDate()}`,
      date: d,
    });
  }
  return dates;
}

export default function RepairModal() {
  const { isRepairOpen: isOpen, setIsRepairOpen } = useShop();
  const onClose = () => setIsRepairOpen(false);
  const [deviceType, setDeviceType] = useState('Smartphone / iPhone');
  const [issue, setIssue] = useState('Screen Replacement');
  const [modelName, setModelName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');

  const dateOptions = getNextDates();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateLabel = dateOptions[selectedDate]?.label || 'Today';
    const message = encodeURIComponent(
      `Hello TecnoMart Service Center! 🛠️\nI would like to book a repair:\n- Name: ${customerName}\n- Phone: ${phone}\n- Device: ${deviceType} (${modelName || 'Not specified'})\n- Issue: ${issue}\n- Preferred Date: ${selectedDate === 0 ? 'Today' : selectedDate === 1 ? 'Tomorrow' : dateLabel}\n- Preferred Time: ${selectedSlot || 'Flexible'}\n\nPlease confirm my repair slot & estimate.`
    );
    window.open(`https://wa.me/919010667726?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-midgrey-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div data-lenis-prevent className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-neutral-200 p-5 sm:p-8 animate-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 active:scale-95 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-950 uppercase tracking-tight">
              Book A Repair Slot
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Free diagnosis • 100% Genuine parts • 90-day warranty
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Device Type
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full h-11 px-3 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
            >
              <option value="Smartphone / iPhone">Smartphone / iPhone</option>
              <option value="Laptop / MacBook">Laptop / MacBook</option>
              <option value="Gaming PC / Desktop">Gaming PC / Desktop</option>
              <option value="iPad / Tablet">iPad / Tablet</option>
              <option value="Smartwatch">Smartwatch</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Device Model Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. iPhone 15 Pro, Dell XPS 15..."
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full h-11 px-3.5 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Problem / Issue
            </label>
            <select
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full h-11 px-3 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
            >
              <option value="Screen Replacement">Screen Replacement & Broken Glass</option>
              <option value="Battery Drain / Replacement">Battery Replacement & Health Drain</option>
              <option value="No Power / Motherboard Issue">No Power / Dead Device / IC Repair</option>
              <option value="Liquid / Water Damage">Liquid / Water Damage Treatment</option>
              <option value="Charging Port / Mic / Speaker">Charging Port / Mic / Speaker</option>
              <option value="Software / OS / Virus Clean">Software / OS Re-installation / Virus Clean</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Preferred Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {dateOptions.map((d) => (
                <button
                  key={d.index}
                  type="button"
                  onClick={() => setSelectedDate(d.index)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    selectedDate === d.index
                      ? 'bg-midgrey-900 text-amber-400 border-midgrey-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Preferred Time Slot
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    selectedSlot === slot
                      ? 'bg-midgrey-900 text-amber-400 border-midgrey-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Rahul"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full h-11 px-3.5 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3.5 text-base sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Confirm &amp; Book On WhatsApp</span>
            </button>
          </div>

          <p className="text-center text-[11px] text-neutral-400 font-medium">
            Doorstep pickup &amp; drop available across Hyderabad!
          </p>
        </form>

      </div>
    </div>
  );
}
