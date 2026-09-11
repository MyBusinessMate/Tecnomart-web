"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAdminAuth, getRateLimitStatus } from '@/lib/admin/adminAuth';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@tecnomart.in');
  const [password, setPassword] = useState('Admin@Tecno2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rateLimit = getRateLimitStatus();

  // If already authenticated, redirect to dashboard or intended path
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/myadmin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your staff email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your access password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(email, password);
      setIsSubmitting(false);

      if (result.success) {
        const from = location.state?.from?.pathname || '/myadmin';
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col justify-center items-center px-4 py-12 antialiased text-neutral-900">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-mono font-bold text-neutral-800 mb-3 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>TECNOMART SECURITY GATEWAY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
          Staff Operations Login
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 font-normal">
          Authorized personnel access for store catalog, pricing, and system controls.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
        
        {/* Error / Rate Limit Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#FDEBEC] border border-red-200 text-xs text-[#9F2F2D] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-semibold">{errorMessage}</span>
          </div>
        )}

        {rateLimit.isLocked && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#FBF3DB] border border-amber-200 text-xs text-[#956400] flex items-start gap-2.5">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-semibold">
              Security lockout active. Try again in {rateLimit.remainingSeconds || 900} seconds.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tecnomart.in"
                disabled={rateLimit.isLocked || isSubmitting}
                className="w-full pl-9.5 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={rateLimit.isLocked || isSubmitting}
                className="w-full pl-9.5 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rateLimit.isLocked || isSubmitting}
            className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Authenticating..." : "Sign In to Operations"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 pt-5 border-t border-neutral-100">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Preset Staff Credentials
          </div>
          <div className="space-y-1.5 text-xs text-neutral-600 font-mono">
            <button
              type="button"
              onClick={() => { setEmail('admin@tecnomart.in'); setPassword('Admin@Tecno2026!'); }}
              className="w-full text-left p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>admin@tecnomart.in</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EDF3EC] text-[#346538] font-bold">SUPERADMIN</span>
            </button>
            <button
              type="button"
              onClick={() => { setEmail('manager@tecnomart.in'); setPassword('Manager@2026!'); }}
              className="w-full text-left p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-between cursor-pointer transition-colors"
            >
              <span>manager@tecnomart.in</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E1F3FE] text-[#1F6C9F] font-bold">MANAGER</span>
            </button>
          </div>
        </div>

      </div>

      <div className="mt-6 text-center text-xs text-neutral-400">
        TecnoMart Retail Systems © 2026 • Road No. 36 Jubilee Hills, Hyderabad
      </div>

    </div>
  );
}
