"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  StarBadgeIcon,
  PriceTagIcon,
  DeliveryBoxIcon,
  ReturnArrowIcon,
  SecureLockIcon,
  SupportHeadsetIcon,
} from './Icons';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Trusted Since 2016",
      subtitle: "Serving Thousands of Happy Customers",
      icon: <StarBadgeIcon className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Affordable Pricing",
      subtitle: "Best Value for Your Money",
      icon: <PriceTagIcon className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Fast Delivery",
      subtitle: "Pan India Safe & Secure",
      icon: <DeliveryBoxIcon className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Easy Returns",
      subtitle: "Hassle-Free Experience",
      icon: <ReturnArrowIcon className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Secure Payments",
      subtitle: "100% Safe Transactions",
      icon: <SecureLockIcon className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "After Sales Support",
      subtitle: "We're Here For You",
      icon: <SupportHeadsetIcon className="w-8 h-8 text-amber-500" />,
    },
  ];

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-neutral-100">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Emblem Divider */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight">
            WHY CHOOSE TECNO MART?
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
            <img src="/logo.png" alt="Emblem" className="w-5 h-5 object-contain" />
            <div className="w-8 h-[2px] bg-amber-500 rounded-full" />
          </div>
        </div>

        {/* 6 Pillars Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 text-center">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center group p-3 rounded-2xl transition-colors cursor-default"
            >
              {/* Circular gold icon container */}
              <div className="w-13 h-13 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 group-hover:scale-105 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug mb-1 group-hover:text-amber-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
