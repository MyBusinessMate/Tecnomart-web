"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { initialBuildState, saveBuildState, loadBuildState, clearBuildState } from '@/lib/configurator/state';
import { generateRecommendedBuild, switchPlatform as switchPlatformHelper, getTargetSteps } from '@/lib/configurator/recommendation';
import { getOptionsForCategory } from '@/lib/configurator/compatibility';
import { calculateTotal, generateNormalizedPayload, generateWhatsAppLink } from '@/lib/configurator/whatsapp';
import { BlurRevealText, BlurRevealBox } from '@/components/redesign/BlurReveal';
import { WhatsAppIcon } from '@/components/redesign/Icons';
import {
  Video,
  Box,
  Brain,
  Gamepad2,
  Cpu,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Layers,
  CheckCircle2,
  Sliders,
  Send,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';

export default function Configurator() {
  const [buildState, setBuildState] = useState(initialBuildState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState('guided'); // 'guided' | 'matrix'
  const [activeStepTab, setActiveStepTab] = useState('cpu');
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    notes: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const draft = loadBuildState();
    if (draft && (draft.workload || draft.platform)) {
      setBuildState(draft);
      if (draft.stepIndex >= 3) {
        const steps = getTargetSteps(draft.workload);
        const idx = Math.min(draft.stepIndex - 3, steps.length - 1);
        if (idx >= 0 && steps[idx]) {
          setActiveStepTab(steps[idx]);
        }
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded && (buildState.workload || buildState.platform)) {
      saveBuildState(buildState);
    }
  }, [buildState, isLoaded]);

  // Workload selection -> moves to platform step
  const handleSelectWorkload = (workload) => {
    setBuildState((prev) => ({
      ...prev,
      workload,
      stepIndex: 1,
    }));
  };

  // Platform selection (Intel vs AMD) -> moves to tier step
  const handleSelectPlatform = (platform) => {
    setBuildState((prev) => {
      const temp = {
        ...prev,
        platform,
        stepIndex: 2,
      };
      return generateRecommendedBuild(temp);
    });
  };

  // Priority tier selection (Value / Balanced / Performance) -> Generates entire recommended build
  const handleSelectTier = (priority) => {
    setBuildState((prev) => {
      const temp = {
        ...prev,
        priority,
        stepIndex: 3,
      };
      const recommended = generateRecommendedBuild(temp);
      return recommended;
    });
    setActiveStepTab('cpu');
  };

  // Instant platform switch (Intel <-> AMD)
  const handleSwitchPlatform = (targetPlatform) => {
    setBuildState((prev) => {
      const switched = switchPlatformHelper(prev, targetPlatform);
      return switched;
    });
  };

  // Single component update
  const handleUpdateComponent = (category, item) => {
    setBuildState((prev) => {
      let newPlatform = prev.platform;
      if (category === 'cpu' && item?.brand) {
        newPlatform = item.brand;
      }
      return {
        ...prev,
        platform: newPlatform,
        selections: {
          ...prev.selections,
          [category]: item,
        },
        mode: 'customize',
      };
    });
  };

  const handleReset = () => {
    clearBuildState();
    setBuildState({ ...initialBuildState, buildId: crypto.randomUUID() });
  };

  const targetSteps = getTargetSteps(buildState.workload);
  const totalPrice = useMemo(() => calculateTotal(buildState.selections), [buildState.selections]);

  // Wattage estimation
  const totalWattage = useMemo(() => {
    let cpuW = buildState.selections.cpu?.compatibility?.wattClass || 105;
    let gpuW = buildState.selections.gpu?.compatibility?.boardPowerW || 220;
    return cpuW + gpuW + 80;
  }, [buildState.selections]);

  const psuCapacity = buildState.selections.psu?.compatibility?.wattage || 750;
  const isPsuSufficient = psuCapacity >= totalWattage;

  const currentStep = buildState.stepIndex;

  const categoryTitles = {
    cpu: "1. Processor (CPU)",
    gpu: "2. Graphics Card (GPU)",
    motherboard: "3. Motherboard",
    memory: "4. DDR5 RAM",
    storage: "5. NVMe SSD Storage",
    psu: "6. Power Supply (PSU)",
    cooling: "7. CPU Cooler",
    cabinet: "8. Cabinet / Case",
    monitor: "9. Gaming Display / Monitor",
  };

  const workloads = [
    {
      id: 'video',
      title: 'Video Editing & Content Creation',
      desc: 'Adobe Premiere, DaVinci Resolve Studio, 4K/8K timeline playback, ProRes & hardware quicksync acceleration.',
      icon: Video,
      badge: '4K/8K Video',
    },
    {
      id: '3d',
      title: '3D CAD, Modeling & Rendering',
      desc: 'Blender, Unreal Engine 5, Maya, AutoCAD, ray-traced rendering, and intensive GPU compute cycles.',
      icon: Box,
      badge: 'Unreal & Blender',
    },
    {
      id: 'ai',
      title: 'AI, Deep Learning & Multitasking',
      desc: 'Local LLMs, PyTorch / TensorFlow machine learning, high VRAM requirements, and heavy multi-container Docker workloads.',
      icon: Brain,
      badge: 'Local AI & Code',
    },
    {
      id: 'gaming',
      title: 'Esports & AAA High-FPS Gaming',
      desc: 'Maximum frame rates, low system latency, 1440p/4K ray tracing, and ultra-fluid 240Hz/360Hz refresh rate responsiveness.',
      icon: Gamepad2,
      badge: 'High-FPS Gaming',
    },
  ];

  const tiers = [
    {
      id: 'value',
      title: 'High-Value Performance',
      subtitle: 'Smart Budget • Uncompromised Quality',
      desc: 'Maximum performance per rupee. Ideal for 1080p/1440p high FPS gaming and seamless 4K video editing.',
      badge: 'Best Value',
    },
    {
      id: 'balanced',
      title: 'Sweet-Spot Balanced',
      subtitle: 'Most Popular • Pro Creation & Gaming',
      desc: 'The optimal sweet-spot of multi-core capability, RTX graphics, 32GB DDR5 memory, and high thermal headroom.',
      badge: 'Recommended',
    },
    {
      id: 'performance',
      title: 'Enthusiast Flagship',
      subtitle: 'Zero Compromise • Maximum Throughput',
      desc: 'Top-tier silicon, massive VRAM, 64GB+ DDR5 memory, and 850W+ Gold PSU for grueling 4K/8K exports & local AI.',
      badge: 'Flagship Tier',
    },
  ];

  const handleWhatsAppQuote = () => {
    const payload = generateNormalizedPayload(buildState, customer);
    const link = generateWhatsAppLink(payload);
    window.open(link, '_blank');
  };

  if (!isLoaded) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Loading PC Configurator...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Progress Stepper */}
      <div className="mb-6 sm:mb-8 bg-neutral-50 border border-neutral-200 rounded-2xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-neutral-400">CONFIGURATOR</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-amber-600 font-extrabold uppercase">
            {currentStep === 0 && 'Step 1: Primary Workload'}
            {currentStep === 1 && 'Step 2: Platform Architecture'}
            {currentStep === 2 && 'Step 3: Performance Tier'}
            {currentStep === 3 && 'Step 4: Custom Hardware Configuration'}
            {currentStep >= 4 && 'Step 5: Final Review & WhatsApp Quote'}
          </span>
        </div>

        {buildState.workload && (
          <div className="flex items-center gap-2">
            {currentStep >= 3 && (
              <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('guided')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'guided' ? 'bg-midgrey-900 text-amber-400' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Step Walkthrough
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('matrix')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'matrix' ? 'bg-midgrey-900 text-amber-400' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Full Build Matrix
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-950 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Builder Left Column + Summary Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ========================================================
            LEFT COLUMN: INTERACTIVE STEP WORKFLOW
           ======================================================== */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 0: WORKLOAD / USE CASE */}
          {currentStep === 0 && (
            <BlurRevealBox yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                    STEP 1 • CHOOSE YOUR WORKFLOW
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-neutral-950 uppercase mt-1">
                    What is the primary purpose of your PC?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                    Select your main use case. Our recommendation engine will calibrate the ideal CPU-to-GPU balance and memory bandwidth.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {workloads.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectWorkload(item.id)}
                        className="group p-5 rounded-2xl border border-neutral-200 hover:border-amber-500 hover:bg-amber-50/30 transition-all cursor-pointer flex flex-col justify-between space-y-4 active:scale-98"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider bg-neutral-100 group-hover:bg-amber-100 text-neutral-800 px-2.5 py-1 rounded-md transition-colors">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                          <span>Select Workflow</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </BlurRevealBox>
          )}

          {/* STEP 1: PLATFORM SELECTION (INTEL VS AMD) */}
          {currentStep === 1 && (
            <BlurRevealBox yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                    STEP 2 • PLATFORM ARCHITECTURE
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-neutral-950 uppercase mt-1">
                    Choose Your Platform: Intel or AMD
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                    Pick your foundation. You can switch between Intel and AMD at any time with a single click during the build.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* INTEL CARD */}
                  <div
                    onClick={() => handleSelectPlatform('Intel')}
                    className="p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group active:scale-98 shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-md">
                          Intel Core Ultra
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-neutral-950 group-hover:text-blue-600 transition-colors">
                          Intel Platform
                        </h3>
                        <p className="text-xs text-blue-900 font-semibold mt-0.5">
                          LGA1851 / LGA1700 Hybrid Architecture
                        </p>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Dedicated NPU AI compute, Intel QuickSync hardware media decoding for lightning-fast Premiere/Resolve exports, and high single-threaded clock speed.
                      </p>

                      <ul className="space-y-1.5 text-xs text-neutral-700 font-medium pt-2 border-t border-blue-100">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>Intel QuickSync hardware video encoder</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>Core Ultra high efficiency compute</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>Z890 &amp; B860 PCIe 5.0 motherboard platform</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="w-full min-h-[44px] bg-blue-600 group-hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Select Intel Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* AMD CARD */}
                  <div
                    onClick={() => handleSelectPlatform('AMD')}
                    className="p-6 rounded-2xl border-2 border-red-200 hover:border-red-500 bg-red-50/30 hover:bg-red-50/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group active:scale-98 shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                          <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded-md">
                          AMD Ryzen AM5
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-neutral-950 group-hover:text-red-600 transition-colors">
                          AMD Platform
                        </h3>
                        <p className="text-xs text-red-900 font-semibold mt-0.5">
                          AM5 Zen 5 &amp; 3D V-Cache Series
                        </p>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Industry-leading multi-threaded render speeds, 3D V-Cache gaming dominance, ultra-low power consumption, and guaranteed AM5 upgrade longevity through 2027+.
                      </p>

                      <ul className="space-y-1.5 text-xs text-neutral-700 font-medium pt-2 border-t border-red-100">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span>Top-tier multi-threaded rendering</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span>3D V-Cache extreme gaming frames</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                          <span>Guaranteed AM5 future upgrade support</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="w-full min-h-[44px] bg-red-600 group-hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Select AMD Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setBuildState((p) => ({ ...p, stepIndex: 0 }))}
                    className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 py-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Workflow Selection</span>
                  </button>
                </div>
              </div>
            </BlurRevealBox>
          )}

          {/* STEP 2: PERFORMANCE TIER SELECTION (CLICK ONE -> EVERYTHING AUTO-CONFIGURED) */}
          {currentStep === 2 && (
            <BlurRevealBox yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                    STEP 3 • PERFORMANCE TIER
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-neutral-950 uppercase mt-1">
                    Select Your Build Scale on {buildState.platform}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                    Click one tier to immediately generate a complete, 100% harmonious system that you can customize part-by-part.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {tiers.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTier(t.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group active:scale-98 shadow-xs ${
                        t.id === 'balanced'
                          ? 'border-amber-500 bg-amber-50/40 hover:bg-amber-50/70'
                          : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50/50 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md inline-block ${
                            t.id === 'balanced'
                              ? 'bg-amber-500 text-neutral-950'
                              : 'bg-neutral-200 text-neutral-800'
                          }`}
                        >
                          {t.badge}
                        </span>

                        <h3 className="text-base font-black text-neutral-950 group-hover:text-amber-600 transition-colors">
                          {t.title}
                        </h3>

                        <p className="text-[11px] font-bold text-amber-700">
                          {t.subtitle}
                        </p>

                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-amber-600">
                        <span>Generate Build</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setBuildState((p) => ({ ...p, stepIndex: 1 }))}
                    className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 py-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Platform Selection</span>
                  </button>
                </div>
              </div>
            </BlurRevealBox>
          )}

          {/* STEP 3+: HARDWARE CUSTOMIZER (GUIDED STEP OR MATRIX VIEW) */}
          {currentStep >= 3 && currentStep < 3 + targetSteps.length && (
            <div className="space-y-5">
              
              {/* Architecture Switcher Banner (Always available) */}
              <div className="bg-midgrey-900 text-white rounded-2xl p-4 sm:p-5 border border-midgrey-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${buildState.platform === 'Intel' ? 'bg-blue-500' : 'bg-red-500'} animate-pulse`} />
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                      Active Architecture Platform
                    </span>
                    <span className="text-xs sm:text-sm font-black text-amber-400 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${buildState.platform === 'Intel' ? 'bg-blue-400' : 'bg-red-400'} inline-block`} />
                      {buildState.platform === 'Intel' ? 'Intel LGA1851 / 14th Gen Ecosystem' : 'AMD Ryzen AM5 Zen 5 Ecosystem'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSwitchPlatform(buildState.platform === 'Intel' ? 'AMD' : 'Intel')}
                  className="min-h-[38px] px-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Switch to {buildState.platform === 'Intel' ? 'AMD' : 'Intel'}</span>
                </button>
              </div>

              {/* GUIDED STEP-BY-STEP VIEW */}
              {viewMode === 'guided' && (
                <BlurRevealBox key={activeStepTab} yOffset={15}>
                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200 shadow-sm space-y-6">
                    
                    {/* Horizontal Step Navigation Bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-neutral-100 no-scrollbar">
                      {targetSteps.map((stepKey, idx) => {
                        const isCurrent = activeStepTab === stepKey;
                        const isPicked = !!buildState.selections[stepKey];

                        return (
                          <button
                            key={stepKey}
                            type="button"
                            onClick={() => setActiveStepTab(stepKey)}
                            className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                              isCurrent
                                ? 'bg-midgrey-900 text-amber-400 shadow-xs'
                                : isPicked
                                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                                : 'bg-neutral-50 text-neutral-400'
                            }`}
                          >
                            <span>{idx + 1}. {stepKey}</span>
                            {isPicked && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Step Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest">
                          STEP {targetSteps.indexOf(activeStepTab) + 1} OF {targetSteps.length}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-neutral-950 uppercase">
                          Select {categoryTitles[activeStepTab] || activeStepTab}
                        </h3>
                      </div>

                      <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg w-fit">
                        Current: ₹{buildState.selections[activeStepTab]?.priceINR?.toLocaleString('en-IN') || 0}
                      </span>
                    </div>

                    {/* Available Compatible Options List */}
                    <div className="space-y-3">
                      {getOptionsForCategory(activeStepTab, buildState.selections, buildState.platform).map((option) => {
                        const isSelected = buildState.selections[activeStepTab]?.id === option.id;

                        return (
                          <div
                            key={option.id}
                            onClick={() => handleUpdateComponent(activeStepTab, option)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 active:scale-99 min-h-[56px] ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                                : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/40'
                            }`}
                          >
                            <div className="flex items-start sm:items-center gap-3 min-w-0">
                              <div
                                className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                                  isSelected
                                    ? 'border-amber-500 bg-amber-500 text-neutral-950'
                                    : 'border-neutral-300'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>

                              <div className="min-w-0 space-y-0.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-xs sm:text-sm font-black text-neutral-950 leading-tight">
                                    {option.name}
                                  </h4>
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">
                                    {option.brand}
                                  </span>
                                  {option.performanceTier && (
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                                      {option.performanceTier}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-neutral-500 font-medium line-clamp-1">
                                  {option.shortDescription || option.customerLabel}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-baseline justify-between sm:justify-end gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200/60">
                              <span className="text-xs sm:text-sm font-black text-neutral-950">
                                ₹{option.priceINR?.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          const currIdx = targetSteps.indexOf(activeStepTab);
                          if (currIdx > 0) {
                            setActiveStepTab(targetSteps[currIdx - 1]);
                          } else {
                            setBuildState((p) => ({ ...p, stepIndex: 2 }));
                          }
                        }}
                        className="text-xs font-bold text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const currIdx = targetSteps.indexOf(activeStepTab);
                          if (currIdx < targetSteps.length - 1) {
                            setActiveStepTab(targetSteps[currIdx + 1]);
                          } else {
                            setBuildState((p) => ({ ...p, stepIndex: 3 + targetSteps.length }));
                          }
                        }}
                        className="min-h-[40px] px-5 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>
                          {targetSteps.indexOf(activeStepTab) === targetSteps.length - 1
                            ? 'Proceed to Review'
                            : 'Next Component'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>

                  </div>
                </BlurRevealBox>
              )}

              {/* MATRIX VIEW (ALL COMPONENTS AT ONCE) */}
              {viewMode === 'matrix' && (
                <div className="space-y-4">
                  {targetSteps.map((stepKey) => {
                    const currentPick = buildState.selections[stepKey];
                    const options = getOptionsForCategory(stepKey, buildState.selections, buildState.platform);

                    return (
                      <div key={stepKey} className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <h4 className="text-xs sm:text-sm font-black text-neutral-950 uppercase">
                            {categoryTitles[stepKey] || stepKey}
                          </h4>
                          <span className="text-xs font-bold text-amber-600">
                            Selected: ₹{currentPick?.priceINR?.toLocaleString('en-IN') || 0}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {options.map((opt) => {
                            const isChosen = currentPick?.id === opt.id;
                            return (
                              <div
                                key={opt.id}
                                onClick={() => handleUpdateComponent(stepKey, opt)}
                                className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all active:scale-98 min-h-[48px] ${
                                  isChosen
                                    ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/40'
                                }`}
                              >
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-neutral-900 leading-tight truncate">
                                    {opt.name}
                                  </p>
                                  <span className="text-[10px] text-neutral-500 font-medium">
                                    {opt.brand}
                                  </span>
                                </div>
                                <span className="text-xs font-black text-neutral-950 flex-shrink-0 pl-1">
                                  ₹{opt.priceINR?.toLocaleString('en-IN')}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setBuildState((p) => ({ ...p, stepIndex: 3 + targetSteps.length }))}
                      className="min-h-[44px] px-6 bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-md transition-all"
                    >
                      <span>Review Build &amp; WhatsApp Quote</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* FINAL STEP: REVIEW & WHATSAPP QUOTATION */}
          {currentStep >= 3 + targetSteps.length && (
            <BlurRevealBox yOffset={20}>
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                    FINAL STEP • QUOTATION &amp; ORDER
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-neutral-950 uppercase mt-1">
                    Your Custom PC Build Is Ready!
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                    Enter your details below to generate an instant official WhatsApp quotation with our technical team in Tolichowki, Hyderabad.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full h-11 px-3.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full h-11 px-3.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      City / Locality
                    </label>
                    <input
                      type="text"
                      placeholder="Hyderabad (Tolichowki / Gachibowli / Hitec City...)"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full h-11 px-3.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Special Requests / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. RGB cable combs, same-day delivery"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className="w-full h-11 px-3.5 text-base sm:text-sm bg-white border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-medium shadow-xs"
                    />
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppQuote}
                    className="w-full min-h-[50px] bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#20ba5a] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    <span>Send Build Quotation on WhatsApp</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBuildState((p) => ({ ...p, stepIndex: 3 }))}
                    className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 py-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Hardware Customizer</span>
                  </button>
                </div>
              </div>
            </BlurRevealBox>
          )}

        </div>

        {/* ========================================================
            RIGHT COLUMN: STICKY DESKTOP BUILD SUMMARY SIDEBAR
           ======================================================== */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-midgrey-900 text-white rounded-3xl p-6 sm:p-7 border border-midgrey-700/60 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
                RIG CONFIGURATION
              </span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                ✓ 100% Compatible
              </span>
            </div>

            {/* Wattage & PSU Check Gauge */}
            <div className="p-3.5 bg-midgrey-800 rounded-2xl border border-midgrey-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Wattage:
                </span>
                <span className="text-amber-400 font-black">{totalWattage} W</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${isPsuSufficient ? 'bg-amber-400' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (totalWattage / psuCapacity) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-400">
                Selected PSU: {buildState.selections.psu?.name?.split('(')[0] || '850W Gold'}
              </p>
            </div>

            {/* Selected Components List */}
            <div className="space-y-1.5 text-xs text-neutral-300 max-h-64 overflow-y-auto pr-1 no-scrollbar">
              {Object.entries(buildState.selections).map(([k, item]) => {
                if (!item) return null;
                return (
                  <div key={k} className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-400 uppercase text-[10px] font-bold">{k}:</span>
                    <span className="font-medium text-right text-white truncate max-w-[170px]">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total Price */}
            <div className="pt-2 border-t border-neutral-800 flex items-baseline justify-between">
              <span className="text-xs font-bold text-neutral-400 uppercase">Estimated Total:</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Order on WhatsApp</span>
              </button>

              <p className="text-center text-[10px] text-neutral-400 font-medium leading-relaxed">
                Free professional cable management • 12-Hour stress test • 3-Year Onsite Warranty.
              </p>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Tolichowki In-Store Direct Assembly</span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Every rig is assembled on live test benches with thermal imaging and delivered same-day in Hyderabad.
            </p>
          </div>
        </div>

      </div>

      {/* MOBILE STICKY FLOATING BOTTOM BAR */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-midgrey-950/95 backdrop-blur-xl border-t border-midgrey-700/60 p-3.5 shadow-2xl"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <span className="text-[10px] text-neutral-400 font-bold uppercase block">
              Total ({totalWattage}W)
            </span>
            <span className="text-lg font-black text-amber-400">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="flex-1 max-w-[220px] min-h-[44px] bg-[#25D366] active:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
