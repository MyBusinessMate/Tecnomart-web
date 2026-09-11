"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function AdminConfirmModal({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to permanently delete this item? This action cannot be undone.",
  itemName,
  confirmLabel = "Delete Record",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="relative w-full max-w-md bg-white rounded-xl border border-neutral-200 shadow-xl p-6 text-neutral-900 overflow-hidden"
        >
          {/* Subtle destructive top stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

          {/* Close button */}
          <button
            onClick={onCancel}
            aria-label="Cancel deletion"
            className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon & Title */}
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#FDEBEC] text-[#9F2F2D] flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 id="confirm-modal-title" className="text-base font-bold text-neutral-950">
                {title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Highlighted item name box */}
          {itemName && (
            <div className="mb-5 p-3 rounded-lg bg-neutral-50 border border-neutral-200/80 text-xs font-mono text-neutral-800 break-all">
              <span className="text-neutral-400 text-[11px] block uppercase font-sans font-bold tracking-wider mb-0.5">Target Record</span>
              {itemName}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#9F2F2D] hover:bg-red-800 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
