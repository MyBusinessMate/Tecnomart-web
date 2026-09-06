"use client";

import React from 'react';
import { Star, MapPin, ExternalLink, Navigation, Rocket } from 'lucide-react';
import { ASSETS } from '@/data/redesignAssets';
import { GoogleIcon } from './Icons';
import { BlurRevealBox } from './BlurReveal';

export default function ReviewsAndLocation() {
  const openGoogleMaps = () => {
    const query = encodeURIComponent("Tecno Mart Road No 36 Jubilee Hills Hyderabad Telangana 500033");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="py-4 sm:py-6 bg-white pb-12 sm:pb-16">
      <div className="max-w-[1380px] mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          
          {/* Card 3: Visit Our Store (Horizontal Split Card) */}
          <BlurRevealBox duration={0.6} yOffset={20}>
            <div className="h-full rounded-[22px] bg-[#fafafa] border border-neutral-100 overflow-hidden flex flex-col sm:flex-row items-stretch min-h-[220px]">
              
              {/* Left Column: Store Info (52%) */}
              <div className="w-full sm:w-[54%] p-6 sm:p-7 flex flex-col justify-between space-y-4">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Rocket className="w-4 h-4 text-neutral-900 fill-neutral-900" />
                    <span className="text-xs sm:text-sm font-black tracking-wider text-neutral-950 uppercase">
                      VISIT OUR STORE
                    </span>
                  </div>

                  {/* Address */}
                  <div className="space-y-0.5 text-xs text-neutral-700 font-medium mb-4">
                    <p className="font-black text-neutral-950 text-xs sm:text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-900 inline fill-neutral-900" />
                      <span>Tecno Mart</span>
                    </p>
                    <p className="pl-4 text-[11px] sm:text-xs leading-relaxed text-neutral-600 font-semibold">
                      H.No. 8-2-293/82/A/1287,<br />
                      Road No. 36, Jubilee Hills,<br />
                      Hyderabad, Telangana - 500033
                    </p>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div>
                  <button
                    onClick={openGoogleMaps}
                    className="btn-wipe-yellow inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="relative z-10">GET DIRECTIONS</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Embedded Map Image (46%) */}
              <div
                onClick={openGoogleMaps}
                className="w-full sm:w-[46%] min-h-[160px] sm:min-h-full relative overflow-hidden cursor-pointer bg-neutral-100 group border-t sm:border-t-0 sm:border-l border-[#ECECEC]"
              >
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                  alt="Tecno Mart Location Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/15 flex items-center justify-center">
                  <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-neutral-200 flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="text-[11px] font-black text-neutral-950 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                      <span>Tecno Mart</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </BlurRevealBox>

          {/* Card 4: Google Reviews */}
          <BlurRevealBox duration={0.6} delay={0.1} yOffset={20}>
            <div className="h-full rounded-[22px] bg-[#fafafa] p-6 sm:p-7 border border-neutral-100 flex flex-col justify-between space-y-4 min-h-[220px]">
              
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <GoogleIcon className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-black tracking-wider text-neutral-950 uppercase">
                    GOOGLE REVIEWS
                  </span>
                </div>

                {/* Rating & Stars Row */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                    4.8
                  </span>
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-neutral-500 font-semibold mb-4">
                  Based on 1,250+ reviews
                </p>

                {/* Avatars Cluster + Quote Side by Side */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-2.5 overflow-hidden flex-shrink-0">
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                      src={ASSETS.avatar1}
                      alt="Reviewer"
                    />
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                      src={ASSETS.avatar2}
                      alt="Reviewer"
                    />
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                      src={ASSETS.avatar3}
                      alt="Reviewer"
                    />
                    <img
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                      src={ASSETS.avatar4}
                      alt="Reviewer"
                    />
                  </div>

                  <p className="text-xs text-neutral-700 font-medium leading-snug">
                    &ldquo;Great products, genuine parts and amazing service!&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </BlurRevealBox>

        </div>
      </div>
    </section>
  );
}
