"use client";

import React, { useState } from 'react';
import Header from '@/components/redesign/Header';
import Footer from '@/components/redesign/Footer';
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider';
import ScrollProgress from '@/components/redesign/ScrollProgress';
import MobileBottomBar from '@/components/redesign/MobileBottomBar';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Product Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello TecnoMart! 👋\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Subject: ${formData.subject}\n- Message: ${formData.message}`
    );
    window.open(`https://wa.me/919010667726?text=${text}`, '_blank');
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent("Tecno Mart Road No 36 Jubilee Hills Hyderabad Telangana 500033");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-neutral-900 font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 lg:pb-0">
        <ScrollProgress />
        <Header cartCount={0} />

        <main className="flex-1 py-6 sm:py-10">
          <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-5">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-900 font-bold">Contact Us</span>
            </nav>

            {/* Hero Banner */}
            <div className="rounded-3xl bg-midgrey-900 overflow-hidden mb-8 relative border border-midgrey-700/60 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 px-7 py-8 sm:px-12 sm:py-10">
                <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-amber-400 uppercase">
                  GET IN TOUCH · VISIT OUR STORE
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2 leading-tight">
                  Contact TecnoMart
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl leading-relaxed">
                  Questions about product stock, custom PC builds, or repair appointments? We're here 7 days a week, 10 AM – 9:30 PM.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-xs font-bold text-neutral-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.8★ Google Rating
                  </span>
                  <span className="text-neutral-700">|</span>
                  <span>Open 7 Days a Week</span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-amber-400">Jubilee Hills, Hyderabad</span>
                </div>
              </div>
            </div>

            {/* Main Contact Grid - Clean Editorial Two-Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">

              {/* Left Contact Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-5">
                  <h3 className="text-lg font-black uppercase text-neutral-950 tracking-tight">
                    Store &amp; Service Center
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-neutral-600">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-900 block font-bold mb-0.5">Address</strong>
                        <span>H.No. B-2-293/82/A/1287, Road No. 36,<br />Jubilee Hills, Hyderabad, Telangana – 500033</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Phone className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-900 block font-bold mb-0.5">Phone &amp; WhatsApp</strong>
                        <a href="tel:+919010667726" className="hover:text-amber-600 transition-colors font-semibold">+91 90106 67726</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Mail className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-900 block font-bold mb-0.5">Email</strong>
                        <a href="mailto:support@tecnomart.in" className="hover:text-amber-600 transition-colors font-semibold">support@tecnomart.in</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-900 block font-bold mb-0.5">Working Hours</strong>
                        <span>Monday – Sunday: 10:00 AM – 9:30 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={openGoogleMaps}
                      className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open Google Maps</span>
                    </button>

                    <a
                      href="https://wa.me/919010667726"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm">
                <h3 className="text-base sm:text-lg font-black uppercase text-neutral-950 tracking-tight mb-1">
                  Drop Us a Message
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mb-6">
                  Questions about pricing, bulk corporate orders, or same-day repair availability? Fill out this quick form and we'll reply within minutes on WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-neutral-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 px-4 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-neutral-900 transition-colors cursor-pointer"
                    >
                      <option value="Product Inquiry">Product Inquiry (Mobiles &amp; Laptops)</option>
                      <option value="PC Custom Build Consultation">PC Custom Build Consultation</option>
                      <option value="Doorstep Repair Booking">Doorstep Repair Booking</option>
                      <option value="Corporate / Bulk Order">Corporate / Bulk Order</option>
                      <option value="Other Question">Other Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what you're looking for or describe your device issue..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 text-sm font-medium bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white text-neutral-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[50px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </main>

        <Footer />
        <MobileBottomBar cartCount={0} />
      </div>
    </SmoothScrollProvider>
  );
}
