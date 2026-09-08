"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { useSound } from "./SoundProvider";
import { DEFAULT_PRIZES, PrizeDefinition } from "./prizes";
import { executeSpin, RewardWinner } from "./rewardService";
import {
  clearParticipationLocks,
  hasUserParticipated,
  markUserParticipated,
} from "./device";

interface LuckyWheelProps {
  sessionId: string;
  isSuperMode?: boolean;
  onWinnerCalculated: (winner: RewardWinner) => void;
}

export function LuckyWheelCanvas({ sessionId, isSuperMode = false, onWinnerCalculated }: LuckyWheelProps) {
  const { playWheelTick, playClick } = useSound();

  const [prizes] = useState<PrizeDefinition[]>(DEFAULT_PRIZES);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [spinError, setSpinError] = useState<string | null>(null);

  // Rotation in degrees
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationRef = useRef(0);
  const lastTickSegmentRef = useRef(-1);

  useEffect(() => {
    rotationRef.current = rotationAngle;
  }, [rotationAngle]);

  // Check persistent participation locks on mount
  useEffect(() => {
    if (isSuperMode) {
      clearParticipationLocks();
      setHasSpun(false);
      setSpinError(null);
      return;
    }

    if (hasUserParticipated()) {
      setHasSpun(true);
      setSpinError("You have already participated. Each visitor is limited to 1 lucky spin.");
    }
  }, [isSuperMode]);

  // Execute Spin on Center Button Click
  const handleCenterSpinClick = async () => {
    if (isSpinning || (!isSuperMode && hasSpun)) return;

    setIsSpinning(true);
    setSpinError(null);
    playClick();

    try {
      // Execute local prize selection & atomic lock
      const spinResult = executeSpin(sessionId, isSuperMode);

      if (!spinResult.success || !spinResult.winner) {
        setIsSpinning(false);
        if (spinResult.alreadySpun) {
          setHasSpun(true);
          markUserParticipated(sessionId);
          setSpinError(
            spinResult.message || "This device has already participated in Spin & Win. Each visitor is limited to 1 lucky spin."
          );
        } else {
          setSpinError(spinResult.message || "Unable to start spin. Please try again.");
        }
        return;
      }

      setHasSpun(true);
      const winningPrize = spinResult.winner;

      // Find winning index in exact clockwise 8-segment order:
      let winningIndex = prizes.findIndex(
        (p) =>
          p.id.toLowerCase() === winningPrize.prizeId.toLowerCase() ||
          p.name.toLowerCase() === winningPrize.prizeName.toLowerCase()
      );

      if (winningIndex === -1) {
        winningIndex = 0;
      }

      // Calculate target rotation angle so segment winningIndex stops at 12 o'clock
      const targetSegmentAngle = (360 - winningIndex * 45) % 360;
      const currentRotation = rotationRef.current;
      const baseSpins = 6 * 360; // 6 full 360° spins
      const currentFullRotations = Math.floor(currentRotation / 360) * 360;
      const finalTargetAngle = currentFullRotations + baseSpins + targetSegmentAngle;

      const startTime = performance.now();
      const spinDuration = 4800; // 4.8 seconds

      const animateWheel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / spinDuration);

        // High-speed acceleration + long cinematic quartic deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3.8);

        const currentAngle = currentRotation + (finalTargetAngle - currentRotation) * easeOut;
        setRotationAngle(currentAngle);

        // Segment boundary ticking sound
        const currentSegment = Math.floor((currentAngle % 360) / 45);
        if (currentSegment !== lastTickSegmentRef.current) {
          lastTickSegmentRef.current = currentSegment;
          playWheelTick();
        }

        if (progress < 1) {
          requestAnimationFrame(animateWheel);
        } else {
          setRotationAngle(finalTargetAngle);
          setIsSpinning(false);

          // Brief pause to let customer see the winning landed segment
          setTimeout(() => {
            onWinnerCalculated(winningPrize);
          }, 850);
        }
      };

      requestAnimationFrame(animateWheel);
    } catch (err: any) {
      console.error("Spin error:", err);
      setIsSpinning(false);
      setSpinError("Connection failed. Please retry.");
    }
  };

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const SEGMENT_COUNT = 8;
  const ARC_DEG = 360 / SEGMENT_COUNT; // 45 degrees
  const CONTENT_RADIUS_PERCENT = 33.5;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center px-3 py-1 sm:py-2 select-none relative z-10">
      {/* Stationary Ambient Halo in Page Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5B800]/[0.07] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Editorial Header (NO pill badges) */}
      <div className="mb-2 sm:mb-4">
        <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-neutral-950 uppercase leading-none">
          SPIN & <span className="text-[#F5B800]">WIN</span>
        </h1>
        <p className="text-[11px] sm:text-xs font-sans text-neutral-600 mt-1 max-w-xs mx-auto">
          Tap the center <span className="text-neutral-950 font-bold">SPIN</span> button to unlock your guaranteed prize.
        </p>
      </div>

      {spinError && (
        <div className="p-2.5 mb-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-sans font-medium">
          {spinError}
        </div>
      )}

      {/* ============================================================ */}
      {/* PROPER LAYERED INTERACTIVE WHEEL STAGE */}
      {/* ============================================================ */}
      <div
        className="relative flex items-center justify-center mx-auto"
        style={{
          width: "min(90vw, 68vh, 540px)",
          height: "min(90vw, 68vh, 540px)",
          aspectRatio: "1 / 1",
        }}
      >
        {/* ============================================================ */}
        {/* LAYER 1: STATIC FIXED GOLD POINTER (12 O'Clock, Never Rotates) */}
        {/* ============================================================ */}
        <div
          className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          style={{ width: "36px", height: "44px" }}
        >
          <svg
            viewBox="0 0 38 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_12px_rgba(245,184,0,0.8)]"
          >
            {/* Outer Gold Pointer Triangle */}
            <path
              d="M19 44L4 6C3 3.8 4.6 1.5 7.2 1.5H30.8C33.4 1.5 35 3.8 34 6L19 44Z"
              fill="url(#fixedPointerGrad)"
              stroke="#FFE9A6"
              strokeWidth="2"
            />
            {/* Inner Bevel Highlight */}
            <path d="M19 37L8 6H30L19 37Z" fill="url(#fixedInnerPointerGrad)" opacity="0.9" />
            <defs>
              <linearGradient id="fixedPointerGrad" x1="19" y1="1.5" x2="19" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF2C2" />
                <stop offset="0.45" stopColor="#F5B800" />
                <stop offset="1" stopColor="#A6730F" />
              </linearGradient>
              <linearGradient id="fixedInnerPointerGrad" x1="19" y1="6" x2="19" y2="37" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#F5B800" />
                <stop offset="1" stopColor="#D49B28" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ============================================================ */}
        {/* LAYER 2: ROTATING CIRCULAR WHEEL BASE (SVG Segments + Gold Rings) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 w-full h-full rounded-full select-none"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {/* Wheel Base SVG (8 Alternating Segments + Glowing Gold Outer Ring + Light Bulbs) */}
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
          >
            <defs>
              {/* Gold Segment Gradient */}
              <radialGradient id="goldSegGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF099" />
                <stop offset="60%" stopColor="#F5B800" />
                <stop offset="100%" stopColor="#D49B00" />
              </radialGradient>

              {/* Crisp Clean White Segment Gradient */}
              <radialGradient id="whiteSegGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8F8F8" />
                <stop offset="100%" stopColor="#EDEDED" />
              </radialGradient>

              {/* Outer Golden Bezel Gradient */}
              <radialGradient id="outerBezelGrad" cx="50%" cy="50%" r="50%">
                <stop offset="90%" stopColor="#FAFAFA" />
                <stop offset="93%" stopColor="#F5B800" />
                <stop offset="97%" stopColor="#FFE9A6" />
                <stop offset="100%" stopColor="#A6730F" />
              </radialGradient>
            </defs>

            {/* Outer Gold Ring Background */}
            <circle cx="300" cy="300" r="294" fill="url(#outerBezelGrad)" stroke="#F5B800" strokeWidth="2.5" />
            <circle cx="300" cy="300" r="280" fill="#FFFFFF" />

            {/* 8 Segments */}
            {prizes.map((p, i) => {
              const startAngle = i * ARC_DEG - ARC_DEG / 2 - 90; // centered at i * 45 deg
              const endAngle = startAngle + ARC_DEG;
              const startX = 300 + 276 * Math.cos(toRad(startAngle));
              const startY = 300 + 276 * Math.sin(toRad(startAngle));
              const endX = 300 + 276 * Math.cos(toRad(endAngle));
              const endY = 300 + 276 * Math.sin(toRad(endAngle));

              const isGold = i % 2 === 0;

              return (
                <g key={p.id}>
                  {/* Segment Pie Slice */}
                  <path
                    d={`M 300 300 L ${startX} ${startY} A 276 276 0 0 1 ${endX} ${endY} Z`}
                    fill={isGold ? "url(#goldSegGrad)" : "url(#whiteSegGrad)"}
                  />

                  {/* Golden Dividing Ray */}
                  <line
                    x1="300"
                    y1="300"
                    x2={startX}
                    y2={startY}
                    stroke="#F5B800"
                    strokeWidth="2.2"
                    opacity="0.9"
                  />
                </g>
              );
            })}

            {/* Inner Concentric Gold Ring */}
            <circle cx="300" cy="300" r="92" fill="none" stroke="#F5B800" strokeWidth="3" opacity="0.9" />
            <circle cx="300" cy="300" r="88" fill="none" stroke="#FFE9A6" strokeWidth="1.2" opacity="0.7" />

            {/* Perimeter Light Bulbs (24 glowing bulbs around circumference) */}
            {[...Array(24)].map((_, idx) => {
              const bAngle = (idx * 360) / 24 - 90;
              const bx = 300 + 288 * Math.cos(toRad(bAngle));
              const by = 300 + 288 * Math.sin(toRad(bAngle));
              const isAccent = idx % 3 === 0;

              return (
                <circle
                  key={idx}
                  cx={bx}
                  cy={by}
                  r={isAccent ? 3.5 : 2.5}
                  fill={isAccent ? "#FFFFFF" : "#F5B800"}
                  filter="drop-shadow(0 0 3px rgba(245,184,0,0.8))"
                />
              );
            })}
          </svg>
        </div>

        {/* ============================================================ */}
        {/* LAYER 3: INDEPENDENT PRIZE CONTENT (Counter-Rotated / Always Upright) */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {prizes.map((p, i) => {
            const segmentBaseAngle = i * ARC_DEG;
            const currentAngle = segmentBaseAngle + rotationAngle;

            const xPercent = 50 + CONTENT_RADIUS_PERCENT * Math.sin(toRad(currentAngle));
            const yPercent = 50 - CONTENT_RADIUS_PERCENT * Math.cos(toRad(currentAngle));

            return (
              <div
                key={p.id}
                className="absolute flex flex-col items-center justify-center text-center select-none"
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  transform: `translate(-50%, -50%)`,
                  width: "23%",
                  height: "23%",
                }}
              >
                {/* Prize Title Text */}
                <span
                  className="text-[9px] sm:text-[10px] font-heading font-black tracking-wider uppercase leading-none mb-1 text-neutral-950 line-clamp-1 drop-shadow-xs"
                >
                  {p.name}
                </span>

                {/* Product / Coupon Artwork Image (Always upright, never upside down) */}
                <div className="w-full h-full max-h-[75%] max-w-[90%] flex items-center justify-center p-1 rounded-xl bg-white/95 border border-neutral-200/80 shadow-xs backdrop-blur-[2px]">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain select-none"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* LAYER 4: STATIC INTERACTIVE CENTER SPIN BUTTON (100% WIN) */}
        {/* ============================================================ */}
        <button
          type="button"
          onClick={handleCenterSpinClick}
          disabled={isSpinning || (!isSuperMode && hasSpun)}
          aria-label="Spin the prize wheel"
          title="Click to Spin"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[24%] h-[24%] rounded-full flex flex-col items-center justify-center transition-all duration-200 outline-none select-none group cursor-pointer ${
            isSpinning || (!isSuperMode && hasSpun)
              ? "cursor-not-allowed opacity-95 scale-95"
              : "hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(245,184,0,0.6)]"
          }`}
          style={{
            background: "radial-gradient(circle at 35% 35%, #FFE9A6 0%, #F5B800 55%, #B88118 100%)",
            border: "3px solid #050505",
            boxShadow: "0 0 20px rgba(245,184,0,0.6), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.4)",
          }}
        >
          {/* Deep Obsidian Inner Hub with Gold Text */}
          <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-b from-[#1E1E1E] via-[#0A0A0A] to-[#000000] border-2 border-[#F5B800]/90 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
            {/* Glossy Top Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.12] to-transparent pointer-events-none" />

            {isSpinning ? (
              <Loader2 className="w-7 h-7 text-[#F5B800] animate-spin" />
            ) : !isSuperMode && hasSpun ? (
              <>
                <span className="text-sm sm:text-base font-heading font-black tracking-tight text-white/90 uppercase leading-none">
                  CLAIMED
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono font-medium tracking-wider text-neutral-400 uppercase mt-0.5 leading-none">
                  1 SPIN USED
                </span>
              </>
            ) : isSuperMode && hasSpun ? (
              <>
                <span className="text-xs sm:text-sm font-heading font-black tracking-tight text-white uppercase group-hover:text-[#F5B800] transition-colors leading-none drop-shadow-[0_0_10px_rgba(245,184,0,0.7)]">
                  SPIN AGAIN
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono font-medium tracking-wider text-[#F5B800] uppercase mt-0.5 leading-none">
                  UNLIMITED
                </span>
              </>
            ) : (
              <>
                <span className="text-lg sm:text-xl font-heading font-black tracking-tight text-white uppercase group-hover:text-[#F5B800] transition-colors leading-none drop-shadow-[0_0_10px_rgba(245,184,0,0.7)]">
                  SPIN
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#F5B800] uppercase mt-0.5 leading-none">
                  {isSuperMode ? "UNLIMITED" : "100% WIN"}
                </span>
              </>
            )}
          </div>
        </button>
      </div>

      {spinError && (
        <div className="mt-3 px-4 py-2 rounded-xl bg-red-50 border border-red-300 flex items-center gap-2 text-red-700 text-xs font-mono max-w-sm">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{spinError}</span>
        </div>
      )}

      {/* Footer Subtext (Bigger, consistent good font) */}
      <p className="text-xs sm:text-sm font-space font-extrabold tracking-[0.14em] text-neutral-800 uppercase mt-4 sm:mt-5 text-center flex items-center justify-center gap-2">
        <span>OFFICIAL PRIZE WHEEL</span>
        <span className="text-[#F5B800]">•</span>
        <span>100% WIN GUARANTEED</span>
      </p>
    </div>
  );
}
