"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./Icons";
import { X } from "lucide-react";

export default function WhatsAppConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xs sm:max-w-sm rounded-2xl bg-neutral-900 border border-white/15 p-5 shadow-2xl text-center flex flex-col items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-modal-title"
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-3.5 right-3.5 p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* WhatsApp Icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center mb-3 text-[#25D366]">
            <WhatsAppIcon className="w-6 h-6 fill-[#25D366]" />
          </div>

          <h3
            id="wa-modal-title"
            className="text-base sm:text-lg font-bold text-white mb-1.5 font-space"
          >
            Proceed to WhatsApp?
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 mb-5 leading-relaxed">
            Do you want to proceed to WhatsApp to chat with Techno Mart?
          </p>

          {/* Equal-width Action Buttons */}
          <div className="w-full flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all text-center cursor-pointer active:scale-98"
            >
              No
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/20 cursor-pointer active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 fill-black" />
              <span>Yes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
