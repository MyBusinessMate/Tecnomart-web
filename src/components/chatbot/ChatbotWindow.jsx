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
export default function ChatbotWindow({
  isOpen,
  onClose,
  onMinimize,
  initialFullscreen = false,
  isDedicatedPage = false
}) {
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

  // User session context and signals
  const [sessionContext, setSessionContext] = useState({
    flow: null, // 'laptop' | 'pc_build'
    selectedBudget: null, // 'under-30k' | '30k-40k' | '40k-50k' | '50k-70k' | 'above-70k'
    budgetLabel: null,
    shownLaptopsCount: 0,
    viewedLaptopIds: [],
    lastRecommendedLaptop: null,
    pcBuildStep: 0, // tracks step count for 3-step WhatsApp CTA
    pcBuildChoices: {},
  });

  const sessionContextRef = useRef(sessionContext);
  useEffect(() => {
    sessionContextRef.current = sessionContext;
  }, [sessionContext]);

  // Welcome state initialization
  const resetConversation = () => {
    const welcomeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-welcome-1',
        sender: 'assistant',
        title: "Hey, it's Teco here",
        emoji: "👋",
        text: "May I know what you are looking for today?",
        time: welcomeTime,
        isHistory: true,
        quickRepliesLayout: "grid",
        quickReplies: [
          { id: "opt-laptop", label: "Looking for a laptop", isPrimary: true, action: "opt_laptop" },
          { id: "opt-pc-build", label: "Want to build my own PC", action: "opt_pc_build" },
          { id: "opt-store-location", label: "Where is your store?", action: "opt_store_location" },
          { id: "opt-products", label: "What are the things we sell", action: "opt_products" }
        ]
      }
    ]);
    setIsTyping(false);
    setHasError(false);
    setSessionContext({
      flow: null,
      selectedBudget: null,
      budgetLabel: null,
      shownLaptopsCount: 0,
      viewedLaptopIds: [],
      lastRecommendedLaptop: null,
      pcBuildStep: 0,
      pcBuildChoices: {}
    });
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

    if (isFullscreen || (typeof window !== 'undefined' && window.innerWidth < 640)) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

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
        if (isFullscreen && !isDedicatedPage) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose, isDedicatedPage]);

  // Available laptops catalogue helper matching the 5 exact budget ranges
  const getFilteredLaptop = (budgetKey, viewedIds = []) => {
    const candidates = CHATBOT_FEATURED_LAPTOPS.filter((l) => {
      if (budgetKey === 'under-30k') return l.rawPrice <= 30000;
      if (budgetKey === '30k-40k') return l.rawPrice > 30000 && l.rawPrice <= 40000;
      if (budgetKey === '40k-50k') return l.rawPrice > 40000 && l.rawPrice <= 50000;
      if (budgetKey === '50k-70k') return l.rawPrice > 50000 && l.rawPrice <= 70000;
      if (budgetKey === 'above-70k') return l.rawPrice > 70000;
      return true;
    });

    // Try finding one not yet shown in this session
    const unviewed = candidates.filter((c) => !viewedIds.includes(c.id));
    if (unviewed.length > 0) return unviewed[0];
    if (candidates.length > 0) return candidates[0];
    return CHATBOT_FEATURED_LAPTOPS[0];
  };

  // Push user message and generate smart contextual responses
  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: now
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setHasError(false);

    setTimeout(() => {
      processAssistantReply(userText);
    }, 700);
  };

  // Logic to process assistant reply based on context and signals
  const processAssistantReply = (userText) => {
    const lower = userText.toLowerCase();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Where is your store?
    if (lower.includes('where is your store') || lower.includes('store location') || lower.includes('address')) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Our Hyderabad Store Location 📍",
          text: "You can find us right at:\nTecnoMart Technologies, 7 Tombs Rd, Raghava Colony, Tolichowki, Hyderabad - 500008.\n\n🕒 Open Daily: 10:30 AM – 9:30 PM\nWe have live display units you can test and inspect in person!",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "opt-laptop", label: "Looking for a laptop" },
            { id: "opt-pc-build", label: "Want to build my own PC" },
            { id: "talk-support", label: "Get Directions on WhatsApp", category: "support" }
          ]
        }
      ]);
      return;
    }

    // 2. What are the things we sell
    if (lower.includes('things we sell') || lower.includes('what do you sell') || lower.includes('catalog')) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Everything We Offer at TecnoMart 🛍️",
          text: "We specialize in both Certified Refurbished and Brand New genuine technology with official GST invoices:\n\n• Laptops (MacBooks, ThinkPads, Dell, HP, ASUS)\n• Custom Gaming & Professional Workstation PCs\n• Smartphones & Refurbished iPhones\n• GaN Fast Chargers, Audio & Mechanical Keyboards\n• Chip-Level Doorstep Repairs & RAM/SSD Upgrades",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "opt-laptop", label: "Explore Laptops" },
            { id: "opt-pc-build", label: "Custom PC Builds" },
            { id: "opt-store-location", label: "Visit Store Today" }
          ]
        }
      ]);
      return;
    }

    // 3. User chooses "Looking for a laptop"
    if (lower.includes('looking for a laptop') || lower === 'laptop') {
      setIsTyping(false);
      const initialLaptop = CHATBOT_FEATURED_LAPTOPS[0]; // HP EliteBook 840 G7
      const newViewed = [initialLaptop.id];

      setSessionContext((prev) => ({
        ...prev,
        flow: 'laptop',
        shownLaptopsCount: 1,
        viewedLaptopIds: newViewed,
        lastRecommendedLaptop: initialLaptop
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Top Rated Recommendation 💻",
          text: "Here is one of our most popular and highest-rated laptops tested with a 1-Year store warranty:",
          time: now,
          product: initialLaptop,
          onShowOther: () => handleShowOtherTrigger()
        }
      ]);
      return;
    }

    // 4. "Show Other" Trigger
    if (lower.includes('show other') || lower.includes('show another') || lower === 'show other ↑') {
      handleShowOtherTrigger();
      return;
    }

    // 5. User selects a budget or updates budget
    const hasBudgetPattern =
      lower.includes('under ₹30,000') || lower.includes('under 30k') || lower.includes('under 30000') ||
      lower.includes('30,000 - ₹40,000') || lower.includes('30,000 - 40,000') || lower.includes('30k-40k') ||
      lower.includes('40,000 - ₹50,000') || lower.includes('40,000 - 50,000') || lower.includes('40k-50k') ||
      lower.includes('50,000 - ₹70,000') || lower.includes('50,000 - 70,000') || lower.includes('50k-70k') ||
      lower.includes('above ₹70,000') || lower.includes('above 70k') || lower.includes('above 70000') ||
      lower.includes('update my budget') || lower === 'update my budget';

    if (hasBudgetPattern) {
      // 5a. If user clicked "Update My Budget", show budget options again WITHOUT changing laptopsShown counter
      if (lower.includes('update my budget')) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: "What's your budget?",
            time: now,
            quickRepliesLayout: "pills",
            quickReplies: [
              { id: "budget-under-30k", label: "Under ₹30,000" },
              { id: "budget-30k-40k", label: "₹30,000 - ₹40,000" },
              { id: "budget-40k-50k", label: "₹40,000 - ₹50,000" },
              { id: "budget-50k-70k", label: "₹50,000 - ₹70,000" },
              { id: "budget-above-70k", label: "Above ₹70,000" }
            ]
          }
        ]);
        return;
      }

      // 5b. Determine selected budget range
      let bKey = '40k-50k';
      let bLabel = '₹40,000 - ₹50,000';
      if (lower.includes('under ₹30,000') || lower.includes('under 30k') || lower.includes('under 30000') || lower.includes('25k') || lower.includes('20k')) {
        bKey = 'under-30k';
        bLabel = 'Under ₹30,000';
      } else if (lower.includes('30,000 - ₹40,000') || lower.includes('30,000 - 40,000') || lower.includes('30k-40k') || lower.includes('35k') || lower.includes('32k') || lower.includes('38k')) {
        bKey = '30k-40k';
        bLabel = '₹30,000 - ₹40,000';
      } else if (lower.includes('40,000 - ₹50,000') || lower.includes('40,000 - 50,000') || lower.includes('40k-50k') || lower.includes('45k') || lower.includes('42k') || lower.includes('48k')) {
        bKey = '40k-50k';
        bLabel = '₹40,000 - ₹50,000';
      } else if (lower.includes('50,000 - ₹70,000') || lower.includes('50,000 - 70,000') || lower.includes('50k-70k') || lower.includes('60k') || lower.includes('55k') || lower.includes('65k')) {
        bKey = '50k-70k';
        bLabel = '₹50,000 - ₹70,000';
      } else if (lower.includes('above ₹70,000') || lower.includes('above 70k') || lower.includes('above 70000') || lower.includes('80k') || lower.includes('90k') || lower.includes('1 lakh') || lower.includes('above 1 lakh')) {
        bKey = 'above-70k';
        bLabel = 'Above ₹70,000';
      }

      setIsTyping(false);

      // CRITICAL: Changing or selecting budget increments laptopsShown ONLY when a new laptop is recommended
      const currentCtx = sessionContextRef.current;
      const laptop = getFilteredLaptop(bKey, currentCtx.viewedLaptopIds);
      const newCount = currentCtx.shownLaptopsCount + 1;
      const newViewed = [...currentCtx.viewedLaptopIds, laptop.id];

      setSessionContext((prev) => ({
        ...prev,
        flow: 'laptop',
        selectedBudget: bKey,
        budgetLabel: bLabel,
        shownLaptopsCount: newCount,
        viewedLaptopIds: newViewed,
        lastRecommendedLaptop: laptop
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: `Laptops in ${bLabel} ⚡`,
          text: `Here is a recommendation matching your ${bLabel} budget:`,
          time: now,
          product: laptop,
          onShowOther: () => handleShowOtherTrigger(),
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "update-budget", label: "Update My Budget", isSecondary: true }
          ]
        }
      ]);
      return;
    }

    // 6. User clicked "Check Out Our Products"
    if (lower.includes('check out our products') || lower.includes('view products')) {
      handleRedirectToProducts();
      return;
    }

    // 7. PC Build Flow Progressive Logic
    if (
      lower.includes('build my own pc') ||
      lower.includes('pc build') ||
      sessionContext.flow === 'pc_build'
    ) {
      handlePcBuildFlow(lower, userText);
      return;
    }

    // Default intelligent conversational fallback
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: "I'm right here to assist you with finding a laptop, configuring a custom PC build, or store inquiries. Where should we begin?",
        time: now,
        quickRepliesLayout: "pills",
        quickReplies: [
          { id: "opt-laptop", label: "Looking for a laptop" },
          { id: "opt-pc-build", label: "Want to build my own PC" },
          { id: "opt-store-location", label: "Where is your store?" }
        ]
      }
    ]);
  };

  // Dedicated "Show Other" handling with exact 3-laptop limit and budget state machine
  const handleShowOtherTrigger = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const currentCtx = sessionContextRef.current;

      // EXACT 3-LAPTOP CONSTRAINT:
      // Once laptopsShown >= 3, and user clicks "Show Other", DO NOT show Laptop 4.
      // Instead show: "Check Out Our Products →"
      if (currentCtx.shownLaptopsCount >= 3) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            title: "Check Out Our Products 🔎",
            text: "You've viewed 3 top recommendations from our curated catalog! Explore all available laptops matching your budget with real-time stock:",
            time: now,
            quickRepliesLayout: "pills",
            quickReplies: [
              { id: "check-products", label: "Check Out Our Products →", isCta: true },
              { id: "update-budget", label: "Update My Budget", isSecondary: true }
            ]
          }
        ]);
        return;
      }

      // FIRST TIME SHOW OTHER: If user has NOT selected a budget yet, ask: "What's your budget?"
      if (!currentCtx.selectedBudget) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: "What's your budget?",
            time: now,
            quickRepliesLayout: "pills",
            quickReplies: [
              { id: "budget-under-30k", label: "Under ₹30,000" },
              { id: "budget-30k-40k", label: "₹30,000 - ₹40,000" },
              { id: "budget-40k-50k", label: "₹40,000 - ₹50,000" },
              { id: "budget-50k-70k", label: "₹50,000 - ₹70,000" },
              { id: "budget-above-70k", label: "Above ₹70,000" }
            ]
          }
        ]);
        return;
      }

      // SUBSEQUENT SHOW OTHER: User ALREADY has a selected budget!
      // Show next laptop matching the SAME active budget without re-prompting.
      const nextLaptop = getFilteredLaptop(currentCtx.selectedBudget, currentCtx.viewedLaptopIds);
      const newCount = currentCtx.shownLaptopsCount + 1;
      const newViewed = [...currentCtx.viewedLaptopIds, nextLaptop.id];

      setSessionContext((prev) => ({
        ...prev,
        shownLaptopsCount: newCount,
        viewedLaptopIds: newViewed,
        lastRecommendedLaptop: nextLaptop
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: `Another Option in ${currentCtx.budgetLabel} 🌟`,
          text: `Here is another great option in your ${currentCtx.budgetLabel} range:`,
          time: now,
          product: nextLaptop,
          onShowOther: () => handleShowOtherTrigger(),
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "update-budget", label: "Update My Budget", isSecondary: true }
          ]
        }
      ]);
    }, 600);
  };

  // Smart Products Page Redirection:
  // Passes ONLY budget information. Does NOT transfer RAM, processor, storage, or condition.
  const handleRedirectToProducts = () => {
    let targetUrl = '/laptops';
    const params = new URLSearchParams();

    // Map active budget to price query param for the Products page
    const activeBudget = sessionContextRef.current.selectedBudget || sessionContext.selectedBudget;
    if (activeBudget) {
      params.set('price', activeBudget);
    }

    const queryString = params.toString();
    const fullPath = queryString ? `${targetUrl}?${queryString}` : targetUrl;
    window.location.href = fullPath;
  };

  // Progressive PC Build Flow with WhatsApp CTA after 3 steps
  const handlePcBuildFlow = (lower, rawText) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsTyping(false);

    const currentStep = sessionContext.pcBuildStep || 0;

    // Step 0: Starting PC Build -> Ask Primary Purpose
    if (currentStep === 0 || lower.includes('want to build my own pc')) {
      setSessionContext((prev) => ({
        ...prev,
        flow: 'pc_build',
        pcBuildStep: 1,
        pcBuildChoices: {}
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Custom PC Configurator 🖥️ (Step 1/3)",
          text: "What will you mainly be using this PC build for?",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "pc-use-gaming", label: "Competitive & 4K Gaming" },
            { id: "pc-use-editing", label: "Video Editing & 3D Blender" },
            { id: "pc-use-coding", label: "Software Dev & AI Workstation" },
            { id: "pc-use-budget", label: "Everyday Office & Study" }
          ]
        }
      ]);
      return;
    }

    // Step 1: User chose purpose -> Ask Processor Platform
    if (currentStep === 1) {
      setSessionContext((prev) => ({
        ...prev,
        pcBuildStep: 2,
        pcBuildChoices: { ...prev.pcBuildChoices, purpose: rawText }
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Processor Architecture ⚙️ (Step 2/3)",
          text: "Which CPU platform do you prefer for your rig?",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "pc-cpu-intel", label: "Intel Core (13th / 14th Gen)" },
            { id: "pc-cpu-amd", label: "AMD Ryzen (7000 / 9000 Series)" },
            { id: "pc-cpu-expert", label: "Recommend best value CPU" }
          ]
        }
      ]);
      return;
    }

    // Step 2: User chose CPU -> Ask Estimated Rig Budget
    if (currentStep === 2) {
      setSessionContext((prev) => ({
        ...prev,
        pcBuildStep: 3,
        pcBuildChoices: { ...prev.pcBuildChoices, cpu: rawText }
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Target Budget 💰 (Step 3/3)",
          text: "What is your estimated total budget for the PC tower?",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "pc-b-45", label: "Under ₹50,000" },
            { id: "pc-b-75", label: "₹50,000 – ₹85,000" },
            { id: "pc-b-120", label: "₹85,000 – ₹1.5 Lakh" },
            { id: "pc-b-pro", label: "₹1.5 Lakh+ Ultra Rig" }
          ]
        }
      ]);
      return;
    }

    // Step 3 (The 4th interaction point): Show prominent WhatsApp CTA & Continuation
    if (currentStep === 3) {
      setSessionContext((prev) => ({
        ...prev,
        pcBuildStep: 4,
        pcBuildChoices: { ...prev.pcBuildChoices, budget: rawText }
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "Your Custom Build Blueprint is Ready! 🛠️",
          text: "We have your specifications saved! Our Tolichowki build team can assemble your components with verified compatibility, liquid cooling options, and same-day Hyderabad delivery.\n\nConnect on WhatsApp for the exact part list, live benchmark video, and best quotation:",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "pc-whatsapp-cta", label: "Contact on WhatsApp for Build Quote", isWhatsApp: true },
            { id: "pc-continue-gpu", label: "Choose Graphics Card (GPU) →" },
            { id: "opt-store-location", label: "Visit Store to Test Rigs" }
          ]
        }
      ]);
      return;
    }

    // Continuation if user clicked "Choose Graphics Card"
    if (currentStep >= 4) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          title: "GPU Selection 🎮",
          text: "Which graphics card series are you targeting?",
          time: now,
          quickRepliesLayout: "pills",
          quickReplies: [
            { id: "gpu-rtx4060", label: "NVIDIA RTX 4060 / 4060 Ti" },
            { id: "gpu-rtx4070", label: "NVIDIA RTX 4070 Super" },
            { id: "gpu-rx7600", label: "AMD Radeon RX 7600 XT" },
            { id: "pc-whatsapp-cta", label: "Discuss Build on WhatsApp", isWhatsApp: true }
          ]
        }
      ]);
    }
  };

  // Handle Quick Reply chip click
  const handleQuickReplySelect = (option) => {
    const label = option.label || option;

    if (option.action === 'opt_laptop' || option.id === 'opt-laptop') {
      handleUserMessage("Looking for a laptop");
      return;
    }

    if (option.action === 'opt_pc_build' || option.id === 'opt-pc-build') {
      handleUserMessage("Want to build my own PC");
      return;
    }

    if (option.action === 'opt_store_location' || option.id === 'opt-store-location') {
      handleUserMessage("Where is your store?");
      return;
    }

    if (option.action === 'opt_products' || option.id === 'opt-products') {
      handleUserMessage("What are the things we sell");
      return;
    }

    if (option.id === 'show-other' || option.action === 'show_other') {
      handleShowOtherTrigger();
      return;
    }

    if (option.id === 'check-products') {
      handleRedirectToProducts();
      return;
    }

    if (option.id === 'update-budget') {
      handleUserMessage("Update My Budget");
      return;
    }

    if (option.id && option.id.startsWith('budget-')) {
      handleUserMessage(label);
      return;
    }

    if (option.id === 'pc-whatsapp-cta') {
      const summaryText = `Hi TecnoMart! 👋 I configured a PC build on your website:\n• Purpose: ${sessionContext.pcBuildChoices?.purpose || 'Gaming'}\n• CPU: ${sessionContext.pcBuildChoices?.cpu || 'Intel / AMD'}\n• Target Budget: ${sessionContext.pcBuildChoices?.budget || 'Custom'}\nCan you share the full parts quotation and availability at Tolichowki?`;
      const url = `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${encodeURIComponent(summaryText)}`;
      if (confirmWhatsApp) {
        confirmWhatsApp(url);
      } else {
        window.open(url, '_blank');
      }
      return;
    }

    if (option.action === 'talk_support' || option.id === 'talk-support') {
      handleWhatsAppSupport();
      return;
    }

    handleUserMessage(label);
  };

  // WhatsApp Quote / WhatsApp Support trigger
  const handleWhatsAppQuote = (laptop) => {
    const text = encodeURIComponent(
      `Hi TecnoMart! 👋 I'm interested in *${laptop.name}* (${laptop.price}). Could you confirm availability and condition details at your Tolichowki store?`
    );
    const url = `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${text}`;
    if (confirmWhatsApp) {
      confirmWhatsApp(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleWhatsAppSupport = (customUrl) => {
    const url = customUrl || `https://wa.me/${TECNOMART_CHATBOT_INFO.whatsappPhone}?text=${encodeURIComponent("Hi TecnoMart Support! 👋 I need assistance finding a laptop or PC build.")}`;
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
      className={`fixed z-[9999] bg-[#FFFFFF] flex flex-col font-sans transition-all duration-200 ${
        isFullscreen
          ? "inset-0 w-full h-full rounded-none border-0 shadow-none m-0 p-0"
          : "bottom-0 sm:bottom-12 right-0 sm:right-6 w-full sm:w-[420px] h-[92vh] sm:h-[620px] max-h-[100dvh] sm:max-h-[calc(100vh-80px)] rounded-t-[26px] sm:rounded-[26px] border border-neutral-800/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
      }`}
    >
      {/* 1. Header (Obsidian top bar with logo avatar, verified pill, and window controls) */}
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
        className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3.5 space-y-1 overscroll-contain select-text bg-white"
        tabIndex={0}
        aria-live="polite"
      >
        {/* Store Trust Pill - Only in popup mode as requested (in full screen it is placed in header subtext) */}
        {!isFullscreen && (
          <div className="flex justify-center my-1 select-none">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f9fafb] border border-neutral-200/80 text-[11px] text-neutral-700 font-medium shadow-2xs">
              <span>📍</span>
              <span>Official TecnoMart Support • 7 Tombs Rd, Hyderabad</span>
            </div>
          </div>
        )}

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
        {showSuggestedQueries && messages.length <= 1 && (
          <div className="ml-10.5 mt-2 mr-1">
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
        isFullscreen={isFullscreen}
      />
    </div>
  );
}

