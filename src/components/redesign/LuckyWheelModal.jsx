"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Trophy, Check, Copy } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const SEGMENTS = [
  { label: '₹500 OFF', code: 'FLAT500', color: '#FFD21C' },
  { label: '10% OFF', code: 'TECNO10', color: '#10B981' },
  { label: 'FREE SERVICE', code: 'FREECARE', color: '#3B82F6' },
  { label: '₹1,000 OFF', code: 'PRO1000', color: '#EC4899' },
  { label: 'FREE TEMPERED', code: 'FREESCREEN', color: '#8B5CF6' },
  { label: '5% CASHBACK', code: 'CASH5', color: '#F5B800' },
  { label: '₹250 OFF', code: 'SAVE250', color: '#14B8A6' },
  { label: 'LUCKY GIFT', code: 'LUCKYGIFT', color: '#EAB308' },
];

export default function LuckyWheelModal({ isOpen, onClose }) {
  const { applyCoupon, showToast } = useShop();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Pick a winning segment
    const winningIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    // Calculate final rotation (at least 5 full rotations + offset to winning segment)
    const extraRounds = 360 * 5;
    const targetAngle = extraRounds + (360 - (winningIndex * segmentAngle + segmentAngle / 2));
    
    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(SEGMENTS[winningIndex]);
    }, 3800);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    if (applyCoupon) {
      applyCoupon(code);
    }
    if (showToast) {
      showToast(`Coupon ${code} copied & applied!`);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Header */}
          <div className="text-center space-y-1 mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lucky Spin &amp; Win</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Spin to Win Instant Discounts!
            </h2>
            <p className="text-xs text-neutral-400">
              Try your luck and unlock exclusive checkout savings on TecnoMart.
            </p>
          </div>

          {/* Wheel Container */}
          <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
            {/* Top Indicator Arrow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-400 drop-shadow-md" />
            </div>

            {/* Rotating SVG Wheel */}
            <div
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.95, 0.35, 1)' : 'none',
              }}
              className="w-full h-full rounded-full shadow-2xl border-4 border-amber-400/80 overflow-hidden"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {SEGMENTS.map((seg, idx) => {
                  const angle = 360 / SEGMENTS.length;
                  const startAngle = idx * angle;
                  const endAngle = startAngle + angle;
                  const x1 = 100 + 100 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 100 + 100 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 100 + 100 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 100 + 100 * Math.sin((Math.PI * endAngle) / 180);
                  const path = `M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`;

                  // Text rotation
                  const textAngle = startAngle + angle / 2;
                  const textRad = (Math.PI * textAngle) / 180;
                  const textX = 100 + 62 * Math.cos(textRad);
                  const textY = 100 + 62 * Math.sin(textRad);

                  return (
                    <g key={idx}>
                      <path d={path} fill={idx % 2 === 0 ? '#1f1f23' : '#141417'} stroke="#2a2a30" strokeWidth="1" />
                      <circle cx={x1} cy={y1} r="2" fill="#fbbf24" />
                      <text
                        x={textX}
                        y={textY}
                        fill="#ffffff"
                        fontSize="7.5"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      >
                        {seg.label}
                      </text>
                    </g>
                  );
                })}
                {/* Center Hub */}
                <circle cx="100" cy="100" r="22" fill="#000000" stroke="#FFD21C" strokeWidth="3" />
                <circle cx="100" cy="100" r="14" fill="#FFD21C" />
              </svg>
            </div>

            {/* Center Spin Action Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute z-10 w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-[11px] uppercase tracking-wider flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-80 cursor-pointer"
            >
              {isSpinning ? '...' : 'SPIN'}
            </button>
          </div>

          {/* Won Prize Reward Box */}
          {wonPrize ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-center space-y-2"
            >
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase">
                <Trophy className="w-4 h-4" />
                <span>Congratulations! You Won {wonPrize.label}</span>
              </div>
              <p className="text-[11px] text-neutral-300 font-medium">
                Use promo code at checkout to claim your discount:
              </p>
              <div className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-700">
                <span className="font-mono font-black text-amber-400 tracking-wider text-sm">
                  {wonPrize.code}
                </span>
                <button
                  onClick={() => handleCopyCode(wonPrize.code)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 text-center">
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-98 transition-transform disabled:opacity-60 cursor-pointer"
              >
                {isSpinning ? 'Spinning the Wheel...' : 'Tap To Spin Wheel'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
