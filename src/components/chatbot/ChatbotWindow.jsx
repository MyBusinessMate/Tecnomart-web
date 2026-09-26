import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import ErrorState from './ErrorState';
import SuggestedQueries from './SuggestedQueries';
import {
  TECNOMART_CHATBOT_INFO,
  CHATBOT_FEATURED_LAPTOPS,
  INITIAL_QUICK_ACTIONS,
  BUDGET_OPTIONS,
  USE_CASE_OPTIONS
} from './chatbotData';
import { useShop } from '@/context/ShopContext';

/**
 * ChatbotWindow
 * Complete customer assistant and laptop recommendation conversation window.
 * Supports floating popup mode as well as full-screen dedicated page mode.
 */
export default function ChatbotWindow({ isOpen, onClose, onMinimize, initialFullscreen = false }) {
  const { confirmWhatsApp } = useShop();

  // Dialog window element ref for accessibility & scroll
  const dialogRef = useRef(null);
  const messagesEndRef = useRef(null);

  // States
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);
  const [showSuggestedQueries, setShowSuggestedQueries] = useState(true);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    budget: null,
    useCase: null,
    choice: null,
  });

  // Welcome state initialization
  const resetConversation = () => {
    setMessages([
      {
        id: 'msg-welcome-1',
        sender: 'assistant',
        title: "Hi! Welcome to TecnoMart",
        emoji: "👋",
        text: "Looking for a laptop? I can help you find the right one based on your budget, use case, and requirements.",
        time: "2:01 PM",
        quickRepliesLayout: "grid",
        quickReplies: [
          { id: "find-laptop", label: "Find a Laptop", isPrimary: true, action: "find_laptop" },
          { id: "browse-refurbished", label: "Browse Refurbished", action: "browse_refurbished" },
          { id: "browse-new", label: "Browse New Laptops", action: "browse_new" },
          { id: "talk-support", label: "Talk to Support", action: "talk_support" }
        ]
      }
    ]);
    setIsTyping(false);
    setHasError(false);
    setCurrentStep('welcome');
    setUserProfile({ budget: null, useCase: null, choice: null });
  };

  useEffect(() => {
    if (messages.length === 0) {
      resetConversation();
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Prevent background homepage scroll when chat is in fullscreen or open
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scrolling when fullscreen or on mobile viewport
    if (isFullscreen || (typeof window !== 'undefined' && window.innerWidth < 640)) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Pause Lenis smooth scroll instance if active
      if (typeof window !== 'undefined' && window.__lenis) {
        try {
          window.__lenis.stop();
        } catch (_e) {}
      }

      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
        if (typeof window !== 'undefined' && window.__lenis) {
          try {
            window.__lenis.start();
          } catch (_e) {}
        }
      };
    }
  }, [isOpen, isFullscreen]);

  // Trap Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Push user message and generate smart contextual responses
  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: now
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setHasError(false);

    // 2. Simulate fast, natural typing response (350 - 750ms)
    setTimeout(() => {
      processAssistantReply(userText);
    }, 600);
  };

  // Logic to process assistant reply based on keywords or current context
  const processAssistantReply = (userText) => {
    const lower = userText.toLowerCase();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // If user explicitly asks for human/phone/whatsapp
    if (lower.includes('support') || lower.includes('executive') || lower.includes('human') || lower.includes('call') || lower.includes('contact')) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: "I'd be glad to connect you with our store executives at Tolichowki. You can chat over WhatsApp or give us a direct call:",
          time: now,
          isSupportEscalation: true
        }
      ]);
      return;
    }

    // If user triggers budget like "under 40000" or "40k" or mentions college/coding
    if (lower.includes('college') || lower.includes('student') || lower.includes('40,000') || lower.includes('40000') || lower.includes('40k')) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: "Great! What will you mainly use it for?",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "qc-study", label: "Study & Office", isSelected: true },
            { id: "qc-coding", label: "Coding" },
            { id: "qc-design", label: "Design" },
            { id: "qc-gaming", label: "Gaming" },
            { id: "qc-general", label: "General Use" }
          ]
        }
      ]);
      setCurrentStep('need_use_case');
      return;
    }

    // If user selected or typed use case (Study, Coding, Design, Gaming, General)
    if (
      lower.includes('study') ||
      lower.includes('office') ||
      lower.includes('coding') ||
      lower.includes('design') ||
      lower.includes('gaming') ||
      lower.includes('general')
    ) {
      setIsTyping(false);

      // Recommend HP EliteBook 840 G7 (as requested in prompt) or MacBook Air
      const matchedLaptop = lower.includes('gaming')
        ? CHATBOT_FEATURED_LAPTOPS.find((l) => l.slug === 'hp-victus-15-gaming')
        : lower.includes('design')
        ? CHATBOT_FEATURED_LAPTOPS.find((l) => l.slug === 'refurbished-macbook-pro-14-m1-pro')
        : CHATBOT_FEATURED_LAPTOPS.find((l) => l.slug === 'hp-elitebook-840-g7') || CHATBOT_FEATURED_LAPTOPS[0];

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Based on your requirements, here is our highest-rated recommendation with 1-Year store warranty:`,
          time: now,
          product: matchedLaptop,
          quickReplies: [
            { id: "alt-laptop", label: "Show Another Option", category: "primary" },
            { id: "refurb-browse", label: "Browse All Refurbished" },
            { id: "talk-support", label: "Talk to Store Executive", category: "support" }
          ]
        }
      ]);
      setCurrentStep('recommended');
      return;
    }

    // Default intelligent conversational fallback
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: "I can help narrow down the best laptop options in stock right now. What budget are you considering?",
        time: now,
        quickReplies: BUDGET_OPTIONS.map((b) => ({ id: b.id, label: b.label }))
      }
    ]);
  };

  // Handle Quick Reply chip click
  const handleQuickReplySelect = (option) => {
    const label = option.label || option;

    // Check action hooks
    if (option.action === 'talk_support' || option.id === 'talk-support') {
      handleUserMessage("Talk to a TecnoMart Support Executive");
      return;
    }

    if (option.action === 'find_laptop') {
      handleUserMessage("I need a laptop for college under ₹40,000.");
      return;
    }

    if (option.action === 'browse_refurbished') {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { id: `usr-${Date.now()}`, sender: 'user', text: "Browse Refurbished Laptops", time: now }
      ]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const refurbs = CHATBOT_FEATURED_LAPTOPS.filter((l) => l.conditionBadge === 'Refurbished');
        const first = refurbs[0];
        const second = refurbs[1];

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}-1`,
            sender: 'assistant',
            text: "Here are two of our most requested Certified Refurbished laptops in stock at Tolichowki. Each includes a 32-point hardware test and 1-Year store warranty:",
            time: now,
            product: first
          },
          {
            id: `bot-${Date.now()}-2`,
            sender: 'assistant',
            product: second,
            quickReplies: [
              { id: "qc-check-stock", label: "Check In-Store Availability" },
              { id: "talk-support", label: "Talk to Support", category: "support" }
            ]
          }
        ]);
      }, 500);
      return;
    }

    if (option.action === 'browse_new') {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { id: `usr-${Date.now()}`, sender: 'user', text: "Browse New Laptops", time: now }
      ]);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const newLaptop = CHATBOT_FEATURED_LAPTOPS.find((l) => l.conditionBadge === 'Brand New') || CHATBOT_FEATURED_LAPTOPS[2];
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: "Here is our top trending Brand New gaming & productivity laptop, sealed box with official GST invoice:",
            time: now,
            product: newLaptop,
            quickReplies: [
              { id: "talk-support", label: "Request Store Quote", category: "support" },
              { id: "browse-refurbished", label: "Compare with Refurbished" }
            ]
          }
        ]);
      }, 500);
      return;
    }

    if (option.action === 'check_stock' || option.id === 'qc-check-stock') {
      handleUserMessage("Can you check availability of laptops at Tolichowki, Hyderabad?");
      return;
    }

    if (option.id === 'alt-laptop') {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const secondOption = CHATBOT_FEATURED_LAPTOPS[1];
      setMessages((prev) => [
        ...prev,
        { id: `usr-${Date.now()}`, sender: 'user', text: "Show another option", time: now }
      ]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: "Here is an alternate premium pick popular among students and creative professionals:",
            time: now,
            product: secondOption,
            quickReplies: [
              { id: "talk-support", label: "Talk to Store Executive", category: "support" }
            ]
          }
        ]);
      }, 500);
      return;
    }

    // Default: pass label as user message
    handleUserMessage(label);
  };

  // WhatsApp Quote / WhatsApp Support trigger
  const handleWhatsAppQuote = (laptop) => {
    const text = encodeURIComponent(
      `Hi TecnoMart! 👋 I'm chatting with your website assistant and interested in *${laptop.name}* (${laptop.price}). Could you confirm availability and condition details at your Tolichowki store?`
    );
    const url = `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${text}`;
    if (confirmWhatsApp) {
      confirmWhatsApp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleWhatsAppSupport = (customUrl) => {
    const url = customUrl || `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${encodeURIComponent("Hi TecnoMart Support! 👋 I need assistance finding a laptop.")}`;
    if (confirmWhatsApp) {
      confirmWhatsApp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${TECNOMART_CHATBOT_INFO.phone}`;
  };

  const handleSelectQuestion = (question) => {
    handleUserMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="TecnoMart Customer Assistant"
      aria-modal="true"
      data-lenis-prevent="true"
      className={`fixed z-[9999] bg-[#FFFFFF] shadow-2xl flex flex-col overflow-hidden font-sans transition-all duration-200 ${
        isFullscreen
          ? "inset-0 w-full h-full rounded-none"
          : "bottom-0 sm:bottom-12 right-0 sm:right-6 w-full sm:w-[420px] h-[92vh] sm:h-[620px] max-h-[100dvh] sm:max-h-[calc(100vh-80px)] rounded-t-[26px] sm:rounded-[26px] border border-neutral-800/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* 1. Header (Obsidian top bar with robot avatar, verified pill, and window controls) */}
      <ChatHeader
        onMinimize={onMinimize || onClose}
        onClose={onClose}
        onReset={resetConversation}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />

      {/* 2. Messages Scroll Area */}
      <div
        data-lenis-prevent="true"
        className="flex-1 overflow-y-auto px-4 py-3.5 space-y-1 overscroll-contain select-text bg-white"
        tabIndex={0}
        aria-live="polite"
      >
        {/* Store Trust Pill matching screenshot */}
        <div className="flex justify-center my-1.5 select-none">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f9fafb] border border-neutral-200/80 text-[11px] text-neutral-700 font-medium shadow-2xs">
            <span>📍</span>
            <span>Official TecnoMart Support • 7 Tombs Rd, Hyderabad</span>
          </div>
        </div>

        {/* Message Stream */}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectQuickReply={handleQuickReplySelect}
            onSelectProduct={() => onClose()}
            onWhatsAppQuote={handleWhatsAppQuote}
            onWhatsAppSupport={handleWhatsAppSupport}
            onPhoneCall={handlePhoneCall}
          />
        ))}

        {/* Suggested Queries / People Also Ask (Interactive Accordion) */}
        {showSuggestedQueries && messages.length <= 3 && (
          <div className="ml-8 mt-2">
            <SuggestedQueries onSelectQuestion={handleSelectQuestion} />
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Error Fallback State */}
        {hasError && (
          <ErrorState
            onRetry={() => {
              setHasError(false);
              handleUserMessage("I need a laptop for college under ₹40,000.");
            }}
            onEscalateSupport={handleWhatsAppSupport}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Bottom Message Composer */}
      <ChatInput
        onSendMessage={handleUserMessage}
        disabled={isTyping}
        placeholder="Type your message or budget..."
      />
    </div>
  );
}
