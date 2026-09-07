"use client";

import React from "react";
import { useSound } from "./SoundProvider";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "solid" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function CyberButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glow = true,
  leftIcon,
  rightIcon,
  onClick,
  disabled,
  ...props
}: CyberButtonProps) {
  const { playClick } = useSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      playClick();
      if (onClick) onClick(e);
    }
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-bold tracking-wider",
    md: "px-6 py-3.5 text-sm font-bold tracking-widest",
    lg: "px-8 py-4 text-base font-bold tracking-widest",
  };

  const variantClasses = {
    primary:
      "bg-[#0E0E0E] border border-[#F5B800]/80 text-[#F5B800] hover:bg-[#F5B800] hover:text-neutral-950 hover:border-[#F5B800] active:scale-[0.98]",
    solid:
      "bg-[#F5B800] border border-[#F5B800] text-neutral-950 hover:bg-[#FFD21C] hover:shadow-[0_0_20px_rgba(245,184,0,0.6)] active:scale-[0.98]",
    secondary:
      "bg-neutral-900/80 border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 active:scale-[0.98]",
    danger:
      "bg-red-950/40 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white active:scale-[0.98]",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative group inline-flex items-center justify-center gap-2 rounded-xl font-heading uppercase transition-all duration-200 outline-none select-none disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer",
        sizeClasses[size],
        variantClasses[variant],
        glow && !disabled && variant === "primary" && "hover:shadow-[0_0_18px_rgba(245,184,0,0.5)]",
        glow && !disabled && variant === "solid" && "shadow-[0_0_15px_rgba(245,184,0,0.4)] hover:shadow-[0_0_25px_rgba(245,184,0,0.7)]",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </button>
  );
}
