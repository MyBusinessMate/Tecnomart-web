"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CyberButton } from "./CyberButton";
import { useSound } from "./SoundProvider";
import { getPrizeImage } from "./prizes";
import { RewardWinner } from "./rewardService";
import confetti from "canvas-confetti";

interface WinnerRevealProps {
  winner: RewardWinner;
  onContinue: () => void;
  onSpinAgain?: () => void;
  isSuperMode?: boolean;
}

export function WinnerReveal({ winner, onContinue, onSpinAgain, isSuperMode = false }: WinnerRevealProps) {
  const { playWinnerReveal } = useSound();
  const prizeImg = winner.prizeImage || getPrizeImage(winner.prizeName);

  useEffect(() => {
    playWinnerReveal();

    try {
      const end = Date.now() + 1200;
      const colors = ["#F5B800", "#FFD21C", "#FFE9A6", "#FFFFFF"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: colors,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: colors,
          disableForReducedMotion: true,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  }, [playWinnerReveal]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center px-4 py-3 sm:py-5 relative z-20">
      {/* Subtle Warm Glow Burst */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F5B800]/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Big Bold Congratulations Header */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, type: "spring", damping: 15 }}
        className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-neutral-950 uppercase leading-none mb-1.5"
      >
        CONGRATULATIONS!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="text-xs sm:text-sm font-space font-extrabold tracking-widest text-[#F5B800] uppercase mb-4"
      >
        YOU WON AN EXCLUSIVE REWARD
      </motion.p>

      {/* Premium Prize White Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        className="w-full p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#F5B800] shadow-[0_10px_40px_rgba(245,184,0,0.2)] text-center relative overflow-hidden flex flex-col items-center"
      >
        {/* Product Image Container */}
        <div className="w-full h-36 sm:h-44 max-w-[240px] mx-auto rounded-2xl bg-neutral-50 border border-neutral-200 p-3 flex items-center justify-center shadow-inner relative overflow-hidden mb-3">
          <img
            src={prizeImg}
            alt={winner.prizeName}
            width={240}
            height={176}
            className="w-full h-full object-contain rounded-xl select-none transition-transform duration-300 hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Prize Name */}
        <p className="text-2xl sm:text-3xl font-heading font-black text-neutral-950 tracking-tight my-0.5">
          {winner.prizeName}
        </p>

        {/* Prize Description */}
        <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1 max-w-xs mx-auto leading-relaxed">
          {winner.description}
        </p>

        <div className="w-full mt-4 pt-3 border-t border-neutral-200 text-center">
          <p className="text-[10px] font-mono tracking-[0.15em] text-neutral-700 uppercase font-bold">
            PRIZE SECURED • VALID 30 DAYS AT TECHNO MART
          </p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full mt-5"
      >
        <CyberButton
          onClick={onContinue}
          variant="solid"
          size="lg"
          className="w-full shadow-[0_0_20px_rgba(245,184,0,0.4)] font-heading font-black tracking-wider uppercase text-sm"
          rightIcon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
        >
          CLAIM REWARD
        </CyberButton>

        {isSuperMode && onSpinAgain && (
          <CyberButton
            onClick={onSpinAgain}
            variant="secondary"
            size="md"
            className="w-full mt-2.5 text-xs font-mono tracking-wider uppercase border-[#F5B800] text-neutral-900 font-bold"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-neutral-900" />}
          >
            SPIN AGAIN (UNLIMITED)
          </CyberButton>
        )}
      </motion.div>
    </div>
  );
}
