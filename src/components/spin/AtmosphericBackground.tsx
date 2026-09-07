"use client";

import React, { useEffect, useRef } from "react";

export function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      return () => window.removeEventListener("resize", handleResize);
    }

    // Particle pool: subtle floating golden micro-particles
    const particleCount = Math.min(24, Math.floor(width / 45));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.25 - 0.05,
      alpha: Math.random() * 0.3 + 0.08,
      targetAlpha: Math.random() * 0.3 + 0.08,
      color: Math.random() > 0.35 ? "245, 184, 0" : "255, 210, 28",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        p.alpha += (p.targetAlpha - p.alpha) * 0.015;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.015) {
          p.targetAlpha = Math.random() * 0.3 + 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Obsidian Black Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Layer 2: Soft Showroom Radial Glow Zones */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,184,0,0.06),transparent_70%)] opacity-90" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#F5B800]/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#FFD21C]/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Layer 3: Micro Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 4: Fine Cinematic Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Layer 5: Ambient Floating Golden Micro-Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
