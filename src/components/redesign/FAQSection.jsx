"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurRevealText, BlurRevealBox } from './BlurReveal';

export const FAQS = [
  {
    question: "Are the products sold at TecnoMart 100% genuine and brand new?",
    answer: "Yes, absolutely. All brand-new smartphones, laptops, PC components, and accessories sold at TecnoMart are 100% authentic, sourced directly from authorized brand distributors with valid manufacturer warranty and official tax invoice.",
    category: "General",
  },
  {
    question: "How does the Custom PC Build service work at TecnoMart?",
    answer: "You can either use our online interactive Configurator or consult our expert PC engineers on WhatsApp. We help you choose balanced, compatible components for your specific workload or gaming resolution. Every PC is professionally assembled, cable-managed, stress-tested for 12 hours, and delivered with original component boxes.",
    category: "PC Builds",
  },
  {
    question: "What is your warranty policy on Certified Refurbished devices?",
    answer: "Every refurbished smartphone and laptop undergoes a rigorous 40+ point technical inspection (battery health, display integrity, motherboard diagnostics, thermal checks). We back all refurbished items with a 1-Year TecnoMart warranty and a 7-day replacement guarantee.",
    category: "Refurbished",
  },
  {
    question: "How fast can you repair my cracked phone or laptop screen?",
    answer: "Most smartphone screen and battery replacements are completed within 45 to 90 minutes at our Tolichowki service center. For complex repairs (motherboard IC repair, liquid damage treatment), we provide a 24 to 48-hour turnaround with detailed diagnostics.",
    category: "Repairs",
  },
  {
    question: "Do you offer doorstep pickup and delivery across Hyderabad?",
    answer: "Yes! We offer safe, insured doorstep pickup and return delivery for all repair devices and custom PC setups across Hyderabad & Secunderabad. Pan-India insured shipping is also available for all orders.",
    category: "Delivery",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, Cash at Store, No-Cost EMI on major credit cards, and GST Invoicing for corporate purchases.",
    category: "Payment",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-white border-b border-neutral-100">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-500 uppercase">
            HAVE QUESTIONS?
          </span>
          <div className="mt-1">
            <BlurRevealText
              text="FREQUENTLY ASKED QUESTIONS"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight justify-center"
              delay={0.1}
            />
          </div>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <BlurRevealBox key={idx} delay={idx * 0.05} yOffset={15}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-amber-500 text-neutral-950 rotate-180' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100/80 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurRevealBox>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <BlurRevealBox delay={0.3} yOffset={20}>
          <div className="mt-10 p-6 rounded-2xl bg-neutral-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Still have questions?
                </h4>
                <p className="text-xs text-neutral-400">
                  Chat directly with our tech experts on WhatsApp anytime.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/919010667726?text=Hi%20TecnoMart!%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </BlurRevealBox>

      </div>
    </section>
  );
}
