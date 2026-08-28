"use client";

import React, { useEffect, useRef } from "react";
import { Star, ExternalLink, MessageCircle } from "lucide-react";
import { GoogleIcon, InstagramIcon } from "./Icons";
import { BlurRevealText, BlurRevealBox } from "./BlurReveal";

export default function LiveSocialProofWidgets() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let googleScript = null;
    let instaScript = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Dynamically inject Google Review Jotform widget
          googleScript = document.createElement("script");
          googleScript.src = "https://www.jotform.com/website-widgets/embed/01a0240cfc90700086e1a72675e90ce033e1";
          googleScript.async = true;
          document.body.appendChild(googleScript);

          // Dynamically inject Instagram Jotform widget
          instaScript = document.createElement("script");
          instaScript.src = "https://www.jotform.com/website-widgets/embed/01a02410d8d870008295c40edbeaf3eaa9f1";
          instaScript.async = true;
          document.body.appendChild(instaScript);

          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      try {
        if (googleScript && googleScript.parentNode) googleScript.parentNode.removeChild(googleScript);
        if (instaScript && instaScript.parentNode) instaScript.parentNode.removeChild(instaScript);
      } catch (e) {
        // cleanup safety
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-neutral-50/70 border-b border-neutral-100" id="live-social">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-500 uppercase">
            LIVE SOCIAL PROOF &amp; REVIEWS
          </span>
          <div className="mt-1">
            <BlurRevealText
              text="REAL CUSTOMERS. REAL EXPERIENCES."
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight justify-center"
              delay={0.1}
            />
          </div>
          <p className="text-xs sm:text-base text-neutral-600 mt-2">
            See recent unboxings, custom PC build setups, and verified Google reviews directly from our Hyderabad community.
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 2-Column Grid: Google Reviews Widget + Instagram Unboxings Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Card 1: Live Google Reviews Widget (Col 6) */}
          <div className="lg:col-span-6">
            <BlurRevealBox duration={0.6} delay={0.1} yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <GoogleIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black uppercase text-neutral-900 tracking-wider">
                        Google Verified Reviews
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span>4.9 / 5.0 (1,250+ Reviews)</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Tecno+Mart+Opposite+Fortune+Toyota+Service+Center+7+Tombs+Road+Tolichowki+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600 hover:text-amber-600 transition-colors uppercase tracking-wider"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Jotform Embed Mount Target */}
                <div className="min-h-[220px] overflow-hidden rounded-2xl bg-neutral-50 p-2 border border-neutral-100 flex items-center justify-center">
                  <div id="JFWebsiteWidget-01a0240cfc90700086e1a72675e90ce033e1" className="w-full" />
                </div>

              </div>
            </BlurRevealBox>
          </div>

          {/* Card 2: Live Instagram Reel Unboxings Widget (Col 6) */}
          <div className="lg:col-span-6">
            <BlurRevealBox duration={0.6} delay={0.2} yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200 shadow-sm hover:shadow-md transition-all">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                      <InstagramIcon className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black uppercase text-neutral-900 tracking-wider">
                        Instagram Unboxings
                      </h3>
                      <p className="text-[11px] font-medium text-neutral-500">
                        @tecnomart_hyd • Daily Rigs &amp; Deliveries
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://instagram.com/tecnomart_hyd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-amber-400 text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
                  >
                    <span>Follow</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Instagram Jotform Embed Mount Target */}
                <div className="min-h-[220px] overflow-hidden rounded-2xl bg-neutral-50 p-2 border border-neutral-100 flex items-center justify-center">
                  <div id="JFWebsiteWidget-01a02410d8d870008295c40edbeaf3eaa9f1" className="w-full" />
                </div>

              </div>
            </BlurRevealBox>
          </div>

        </div>

      </div>
    </section>
  );
}
