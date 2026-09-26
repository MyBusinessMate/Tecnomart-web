"use client";

import React, { useState, useEffect } from 'react';
import ChatbotLauncher from './ChatbotLauncher';
import ChatbotWindow from './ChatbotWindow';
import { useLocation } from 'react-router-dom';

/**
 * TecnoMartChatbotWidget
 * Global floating widget coordinating launcher and conversational assistant window.
 * - Sits at bottom-right on desktop (bottom-6 right-6)
 * - Coexists cleanly with mobile bottom dock on mobile devices (sits above mobile bottom dock, or expands into comfortable bottom sheet)
 * - Excludes admin/scan views
 */
export default function TecnoMartChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const location = useLocation();

  // Hide on admin routes or dedicated scan linktree
  if (
    location.pathname.startsWith('/myadmin') ||
    location.pathname === '/scan'
  ) {
    return null;
  }

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
      }
      return next;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <div
      id="tecnomart-chatbot-container"
      className="fixed z-[9999] font-sans pointer-events-none"
    >
      {/* Floating Launcher Button - Bottom Right */}
      {/* On desktop: bottom-6 right-6. On mobile: bottom-20 right-4 (cleanly above mobile bottom dock) */}
      <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 pointer-events-auto z-[9999]">
        <ChatbotLauncher
          isOpen={isOpen}
          unreadCount={unreadCount}
          onClick={handleToggle}
        />
      </div>

      {/* Expanded Chatbot Window */}
      <div className="pointer-events-auto">
        <ChatbotWindow
          isOpen={isOpen}
          onClose={handleClose}
          onMinimize={handleMinimize}
        />
      </div>
    </div>
  );
}
