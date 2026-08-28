"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AmazonQuadGrid() {
  const quadCards = [
    {
      id: 1,
      title: "Top Deals in Mobiles",
      linkText: "See all flagship smartphones",
      linkHref: "/mobiles",
      items: [
        {
          name: "iPhone 16 Pro Max",
          price: "₹1,44,900",
          img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80",
          href: "/mobiles/iphone-16-pro-max",
        },
        {
          name: "Galaxy S24 Ultra",
          price: "₹1,29,999",
          img: "/bento-grid-images/samsungs24.png",
          href: "/mobiles/samsung-galaxy-s24-ultra",
        },
        {
          name: "OnePlus 12 5G",
          price: "₹64,999",
          img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
          href: "/mobiles/oneplus-12",
        },
        {
          name: "iPhone 15 128GB",
          price: "₹69,900",
          img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80",
          href: "/mobiles/iphone-15",
        },
      ],
    },
    {
      id: 2,
      title: "Laptops & Workstations",
      linkText: "Explore all laptops",
      linkHref: "/laptops",
      items: [
        {
          name: "MacBook Pro 16 M3",
          price: "₹3,49,900",
          img: "/bento-grid-images/mackbook.png",
          href: "/laptops/macbook-pro-16-m3-max",
        },
        {
          name: "ROG Zephyrus G16",
          price: "₹2,69,990",
          img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80",
          href: "/laptops/asus-rog-zephyrus-g16-2025",
        },
        {
          name: "Dell XPS 14 OLED",
          price: "₹1,84,990",
          img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=500&q=80",
          href: "/laptops/dell-xps-14-oled",
        },
        {
          name: "Lenovo Legion Pro",
          price: "₹1,44,990",
          img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
          href: "/laptops/lenovo-legion-pro-5i",
        },
      ],
    },
    {
      id: 3,
      title: "Gaming & PC Build Parts",
      linkText: "Configure custom rig",
      linkHref: "/build-your-setup",
      items: [
        {
          name: "Beast V1 RTX 5090",
          price: "₹3,89,999",
          img: "/bento-grid-images/pc.png",
          href: "/gaming/beast-v1-ryzen-9-rtx-5090",
        },
        {
          name: "Streamer Pro Rig",
          price: "₹1,89,990",
          img: "/black-cabinet.png",
          href: "/gaming/streamer-pro-i7-rtx4070ti",
        },
        {
          name: "Alienware 4K OLED",
          price: "₹95,999",
          img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
          href: "/accessories/alienware-32-4k-oled-monitor",
        },
        {
          name: "RTX 4050 6GB GPU",
          price: "₹32,999",
          img: "/GPU-4050.png",
          href: "/accessories",
        },
      ],
    },
    {
      id: 4,
      title: "Refurbished & Repair Deals",
      linkText: "Book repair appointment",
      linkHref: "/repairs",
      items: [
        {
          name: "Refurb MacBook 14",
          price: "₹94,999",
          img: "/bento-grid-images/mackbook.png",
          href: "/refurbished/refurbished-macbook-pro-14-m1-pro",
        },
        {
          name: "Refurb iPhone 14 Pro",
          price: "₹64,999",
          img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80",
          href: "/refurbished/refurbished-iphone-14-pro-128gb",
        },
        {
          name: "Screen Replacement",
          price: "From ₹1,499",
          img: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=500&q=80",
          href: "/repairs",
        },
        {
          name: "Battery Swap",
          price: "From ₹999",
          img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
          href: "/repairs",
        },
      ],
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#FAFAFB] border-b border-neutral-200/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amazon-style 4-Card Quad Grid with elevated premium shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {quadCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-amber-400/80 transition-all duration-300 group/card"
            >
              <div>
                <h3 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight mb-4 flex items-center justify-between">
                  <span>{card.title}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 group-hover/card:scale-125 transition-transform" />
                </h3>

                {/* 2x2 Image Thumbnails Sub-grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {card.items.map((sub, i) => (
                    <Link
                      key={i}
                      href={sub.href}
                      className="group block bg-neutral-50/80 rounded-2xl p-2.5 border border-neutral-100 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left"
                    >
                      <div className="w-full aspect-square bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2 shadow-2xs border border-neutral-100">
                        <img
                          src={sub.img}
                          alt={sub.name}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[11.5px] font-extrabold text-neutral-900 truncate group-hover:text-amber-600 leading-tight">
                        {sub.name}
                      </p>
                      <p className="text-[10.5px] font-black text-amber-600 mt-0.5">
                        {sub.price}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Card Link */}
              <div className="pt-3 border-t border-neutral-100">
                <Link
                  href={card.linkHref}
                  className="text-xs font-black text-amber-600 hover:text-amber-700 flex items-center justify-between group/link"
                >
                  <span>{card.linkText}</span>
                  <div className="w-6 h-6 rounded-full bg-amber-50 group-hover/link:bg-amber-500 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover/link:text-neutral-950 transition-colors" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
