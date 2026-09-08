"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, prefixText, className, id, ...props }, ref) => {
    const inputId = id || `glass-input-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {/* Top Explicit Label */}
        <label
          htmlFor={inputId}
          className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-neutral-800 uppercase flex items-center gap-1.5 pl-0.5"
        >
          {label}
        </label>

        {/* Input Box Container */}
        <div
          className={cn(
            "relative w-full rounded-2xl bg-neutral-50 border transition-all duration-200 flex items-center shadow-xs",
            error
              ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.2)] bg-red-50/40"
              : "border-neutral-300 focus-within:border-[#F5B800] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F5B800]/20 hover:border-neutral-400"
          )}
        >
          {leftIcon && (
            <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-neutral-600 flex items-center pointer-events-none shrink-0">
              {leftIcon}
            </div>
          )}

          {prefixText && (
            <div className={cn(
              "flex items-center text-xs sm:text-sm font-mono font-bold text-neutral-900 select-none border-r border-neutral-300 py-1 pr-2.5",
              leftIcon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"
            )}>
              {prefixText}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-transparent text-neutral-900 text-sm font-sans tracking-wide py-3 sm:py-3.5 outline-none placeholder:text-neutral-400 transition-colors rounded-2xl min-h-[46px] sm:min-h-[48px]",
              prefixText ? "pl-2.5" : leftIcon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4",
              rightIcon ? "pr-10 sm:pr-11" : "pr-3.5 sm:pr-4",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center shrink-0">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Bottom Error or Helper Text */}
        {error ? (
          <p className="text-[11px] sm:text-xs text-red-600 font-sans tracking-wide pl-1 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[10px] sm:text-[11px] text-neutral-500 font-sans tracking-wide pl-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
