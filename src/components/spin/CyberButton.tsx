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
      "bg-white border-2 border-[#F5B800] text-neutral-950 hover:bg-[#F5B800] active:scale-[0.98]",
    solid:
      "btn-wipe-yellow border-2 border-[#F5B800] font-black hover:border-black active:scale-[0.98]",
    secondary:
      "bg-neutral-100 border border-neutral-300 text-neutral-800 hover:bg-neutral-200 hover:text-black hover:border-neutral-400 active:scale-[0.98]",
    danger:
      "bg-red-50 border border-red-300 text-red-700 hover:bg-red-600 hover:text-white active:scale-[0.98]",
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
        glow && !disabled && variant === "solid" && "shadow-[0_0_15px_rgba(245,184,0,0.4)] hover:shadow-[0_0_25px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="relative z-10 transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {rightIcon && <span className="relative z-10 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </button>
  );
}
