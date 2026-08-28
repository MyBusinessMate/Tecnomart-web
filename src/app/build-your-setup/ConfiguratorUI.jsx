"use client";
import React, { useState } from 'react';
import { useConfigurator } from './ConfiguratorContext';
import { useShop } from '@/context/ShopContext';
import { getTargetSteps } from '../../lib/configurator/recommendation';
import { getOptionsForCategory } from '../../lib/configurator/compatibility';
import { generateNormalizedPayload, generateWhatsAppLink } from '../../lib/configurator/whatsapp';
import Link from 'next/link';
import Video from 'lucide-react/dist/esm/icons/video';
import Box from 'lucide-react/dist/esm/icons/box';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Gamepad2 from 'lucide-react/dist/esm/icons/gamepad-2';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import Zap from 'lucide-react/dist/esm/icons/zap';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import Check from 'lucide-react/dist/esm/icons/check';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import styles from './ConfiguratorUI.module.css';

export default function ConfiguratorUI() {
  const { 
    buildState, isLoaded, 
    updateWorkload, updatePlatform, updatePriority, switchPlatform, togglePlatform,
    nextStep, prevStep, jumpToStep, resetBuild 
  } = useConfigurator();

  if (!isLoaded) return <div className={styles.loading}>Loading TecnoMart PC Configurator...</div>;

  // Step routing:
  // Step 0: Workload Selection (Video, 3D, AI, Gaming)
  // Step 1: Platform Selection (ONLY Intel vs AMD)
  // Step 2: Performance Tier (Value, Balanced, Performance)
  // Step 3 to 3 + targetSteps.length - 1: Component Walkthrough
  // Step 3 + targetSteps.length: Final Review & WhatsApp Quotation

  const currentStep = buildState.stepIndex;
  const targetSteps = getTargetSteps(buildState.workload);

  return (
    <div className={styles.wrapper}>
      {/* Header bar */}
      <div className={styles.header}>
        <Link href="/" className={styles.backToStoreBtn}>
          <ArrowLeft size={16} />
          <span>Back to Store</span>
        </Link>

        {buildState.workload && (
          <div className={styles.progressTracker}>
            <span className={styles.stepBadge}>
              {currentStep === 0 && 'Step 1: Use Case'}
              {currentStep === 1 && 'Step 2: Platform'}
              {currentStep === 2 && 'Step 3: Performance Tier'}
              {currentStep >= 3 && currentStep < 3 + targetSteps.length && (
                `Step ${currentStep + 1}: ${targetSteps[currentStep - 3]?.toUpperCase()}`
              )}
              {currentStep >= 3 + targetSteps.length && 'Final Step: Review & Quote'}
            </span>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.mainArea}>
          {/* STEP 0: Workload (Video / 3D / AI / Gaming) */}
          {currentStep === 0 && (
            <StepWorkload onSelect={updateWorkload} />
          )}

          {/* STEP 1: ONLY INTEL VS AMD */}
          {currentStep === 1 && (
            <StepPlatform 
              selectedPlatform={buildState.platform}
              onSelect={updatePlatform} 
              onBack={prevStep} 
            />
          )}

          {/* STEP 2: Performance Tier */}
          {currentStep === 2 && (
            <StepPriority 
              platform={buildState.platform}
              onSelect={updatePriority} 
              onBack={prevStep} 
            />
          )}
          
          {/* STEP 3+: Component Walkthrough */}
          {currentStep >= 3 && currentStep < 3 + targetSteps.length && (
            <ComponentStep 
              stepName={targetSteps[currentStep - 3]} 
              stepNumber={currentStep - 2}
              totalSteps={targetSteps.length}
              onNext={nextStep} 
              onBack={prevStep}
              onSwitchPlatform={switchPlatform}
            />
          )}

          {/* FINAL STEP: Review & WhatsApp Form */}
          {currentStep >= 3 + targetSteps.length && (
            <FinalForm onBack={prevStep} />
          )}
        </div>

        {/* Live Build Summary Sidebar */}
        {currentStep >= 1 && (
          <div className={styles.sidebar}>
            <BuildSummary 
              targetSteps={targetSteps} 
              onJumpToStep={jumpToStep}
              onTogglePlatform={togglePlatform}
              onReset={resetBuild}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// STEP 0: Workload / Use Case Selection
// ----------------------------------------------------
function StepWorkload({ onSelect }) {
  const workloads = [
    {
      id: 'video',
      title: 'Video Editing & Content Creation',
      desc: 'Optimized for Adobe Premiere, DaVinci Resolve, 4K/8K timeline rendering, and smooth scrubbing.',
      icon: Video,
      badge: '4K/8K Video & Motion'
    },
    {
      id: '3d',
      title: '3D CAD, Modeling & Rendering',
      desc: 'Built for Blender, Maya, Unreal Engine 5, AutoCAD, and heavy ray-traced compute workloads.',
      icon: Box,
      badge: 'Unreal & Blender'
    },
    {
      id: 'ai',
      title: 'AI, Deep Learning & Heavy Multitasking',
      desc: 'High VRAM and multicore muscle for running local LLMs, PyTorch training, Docker containers, and compilation.',
      icon: Brain,
      badge: 'Local AI & Data'
    },
    {
      id: 'gaming',
      title: 'Esports & AAA High-FPS Gaming',
      desc: 'Maximum frame rates, low latency, 1440p/4K ray tracing, and ultra fluid refresh rate responsiveness.',
      icon: Gamepad2,
      badge: 'High FPS & Ray Tracing'
    }
  ];

  return (
    <div className={styles.stepBox}>
      <div className={styles.stepIntro}>
        <span className={styles.subheadBadge}>Step 1 • Use Case</span>
        <h2>What is the primary purpose of your rig?</h2>
        <p>Select your main workflow. We will tailor the optimal hardware path and balance for your exact requirements.</p>
      </div>

      <div className={styles.workloadGrid}>
        {workloads.map(item => {
          const Icon = item.icon;
          return (
            <button 
              key={item.id} 
              className={styles.workloadCard} 
              onClick={() => onSelect(item.id)}
              type="button"
            >
              <div className={styles.workloadHeader}>
                <div className={styles.workloadIcon}>
                  <Icon size={24} />
                </div>
                <span className={styles.cardTag}>{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className={styles.selectAction}>
                <span>Select Workflow</span>
                <ArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// STEP 1: ONLY INTEL VS AMD (Platform Selection)
// ----------------------------------------------------
function StepPlatform({ selectedPlatform, onSelect, onBack }) {
  return (
    <div className={styles.stepBox}>
      <div className={styles.stepIntro}>
        <span className={styles.subheadBadge}>Step 2 • Architecture Selection</span>
        <h2>Choose Your Platform: Intel or AMD</h2>
        <p>Pick your CPU and platform foundation. You can switch between Intel and AMD at any time with a single click during the build.</p>
      </div>

      <div className={styles.platformTwoColumn}>
        {/* INTEL OPTION */}
        <div 
          className={`${styles.platformCard} ${styles.intelCard} ${selectedPlatform === 'Intel' ? styles.platformActive : ''}`}
          onClick={() => onSelect('Intel')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.platformGlowIntel} />
          <div className={styles.platformBadgeIntel}>
            <span className={styles.platformDotIntel} />
            <span>Intel® Core™ Ultra</span>
          </div>

          <div className={styles.platformLogoArea}>
            <Cpu size={36} className={styles.intelIcon} />
            <div className={styles.platformName}>INTEL PLATFORM</div>
          </div>

          <h3 className={styles.platformHeading}>LGA1851 Core Ultra Series</h3>
          <p className={styles.platformDesc}>
            Cutting-edge hybrid architecture with dedicated NPU AI compute, Intel QuickSync hardware media decoding, and high single-threaded clock speed.
          </p>

          <ul className={styles.platformHighlights}>
            <li><Check size={15} /> Intel QuickSync for ultra-fast video export</li>
            <li><Check size={15} /> Core Ultra 200S high-efficiency compute</li>
            <li><Check size={15} /> Z890 &amp; B860 PCIe 5.0 motherboard ecosystem</li>
            <li><Check size={15} /> Optimized for Adobe Suite &amp; gaming clock speeds</li>
          </ul>

          <button className={styles.platformSelectBtnIntel} type="button">
            <span>Choose Intel Platform</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* AMD OPTION */}
        <div 
          className={`${styles.platformCard} ${styles.amdCard} ${selectedPlatform === 'AMD' ? styles.platformActive : ''}`}
          onClick={() => onSelect('AMD')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.platformGlowAmd} />
          <div className={styles.platformBadgeAmd}>
            <span className={styles.platformDotAmd} />
            <span>AMD Ryzen™ 9000</span>
          </div>

          <div className={styles.platformLogoArea}>
            <Zap size={36} className={styles.amdIcon} />
            <div className={styles.platformName}>AMD PLATFORM</div>
          </div>

          <h3 className={styles.platformHeading}>AM5 Zen 5 Architecture</h3>
          <p className={styles.platformDesc}>
            Industry-leading multi-threaded render speeds, exceptional power efficiency, and long-term AM5 socket upgrade support through 2027+.
          </p>

          <ul className={styles.platformHighlights}>
            <li><Check size={15} /> Massive multi-core rendering &amp; 3D performance</li>
            <li><Check size={15} /> Ultra-low thermal footprint &amp; power efficiency</li>
            <li><Check size={15} /> Guaranteed AM5 future CPU upgrade roadmap</li>
            <li><Check size={15} /> X670E &amp; B650 high-bandwidth DDR5 support</li>
          </ul>

          <button className={styles.platformSelectBtnAmd} type="button">
            <span>Choose AMD Platform</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className={styles.stepFooter}>
        <button className={styles.textBtn} onClick={onBack} type="button">
          <ArrowLeft size={16} />
          <span>Back to Use Case</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// STEP 2: Performance Tier
// ----------------------------------------------------
function StepPriority({ platform, onSelect, onBack }) {
  const tiers = [
    {
      id: 'value',
      title: 'High-Value Performance',
      subtitle: 'Smart Budget • Uncompromised Quality',
      desc: 'Maximum performance per rupee. Ideal for 1080p/1440p gaming and smooth day-to-day video/content editing.',
      badge: 'Best Value'
    },
    {
      id: 'balanced',
      title: 'Sweet-Spot Balanced',
      subtitle: 'Most Popular • Pro Creation & Gaming',
      desc: 'The optimal balance of multi-core capability, RTX 50-series graphics, and premium thermal headroom.',
      badge: 'Recommended'
    },
    {
      id: 'performance',
      title: 'Enthusiast Flagship',
      subtitle: 'Zero Compromise • Maximum Throughput',
      desc: 'Top-tier silicon, high VRAM, 64GB+ DDR5 memory, and high-wattage Gold PSU for grueling 4K/8K rendering & local AI.',
      badge: 'Top Tier'
    }
  ];

  return (
    <div className={styles.stepBox}>
      <div className={styles.stepIntro}>
        <span className={styles.subheadBadge}>Step 3 • Target Performance Tier</span>
        <h2>Select Your Build Scale on {platform}</h2>
        <p>Choose your budget &amp; performance tier. We will pre-configure the optimal matching components which you can fully customize.</p>
      </div>

      <div className={styles.tierGrid}>
        {tiers.map(t => (
          <button 
            key={t.id} 
            className={styles.tierCard} 
            onClick={() => onSelect(t.id)}
            type="button"
          >
            <span className={styles.tierBadge}>{t.badge}</span>
            <h3>{t.title}</h3>
            <span className={styles.tierSubtitle}>{t.subtitle}</span>
            <p>{t.desc}</p>
            <div className={styles.selectAction}>
              <span>Generate Build</span>
              <ArrowRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <div className={styles.stepFooter}>
        <button className={styles.textBtn} onClick={onBack} type="button">
          <ArrowLeft size={16} />
          <span>Back to Platform</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// STEP 3+: Component Walkthrough with Switch Platform Button
// ----------------------------------------------------
function ComponentStep({ stepName, stepNumber, totalSteps, onNext, onBack, onSwitchPlatform }) {
  const { buildState, updateSelection } = useConfigurator();
  const currentPlatform = buildState.platform || buildState.selections.cpu?.brand || 'Intel';

  // State to filter CPUs if user wants to toggle specifically in CPU step
  const [activePlatformFilter, setActivePlatformFilter] = useState(currentPlatform);

  // Resolved options
  const resolvedSelections = { ...buildState.selections };
  const validOptions = getOptionsForCategory(stepName, resolvedSelections, activePlatformFilter);
  const selectedItem = buildState.selections[stepName];

  const handleSelect = (item) => {
    updateSelection(stepName, item);
    // If user clicked an AMD CPU while filter was AMD, keep platform synchronized
    if (stepName === 'cpu' && item?.brand) {
      setActivePlatformFilter(item.brand);
    }
  };

  const handlePlatformToggle = () => {
    const nextPlatform = currentPlatform === 'Intel' ? 'AMD' : 'Intel';
    setActivePlatformFilter(nextPlatform);
    onSwitchPlatform(nextPlatform);
  };

  const categoryTitles = {
    cpu: "Processor (CPU)",
    gpu: "Graphics Card (GPU)",
    motherboard: "Motherboard",
    memory: "DDR5 Memory (RAM)",
    storage: "High-Speed NVMe Storage",
    psu: "Power Supply Unit (PSU)",
    cooling: "CPU Cooling System",
    cabinet: "Airflow Chassis / Cabinet",
    monitor: "Color-Accurate Display"
  };

  return (
    <div className={styles.stepBox}>
      {/* Platform Switcher Banner (Visible at all times as requested) */}
      <div className={styles.platformSwitcherBanner}>
        <div className={styles.platformStatus}>
          <span className={styles.statusLabel}>Active Architecture:</span>
          <span className={`${styles.platformPill} ${currentPlatform === 'Intel' ? styles.intelPill : styles.amdPill}`}>
            {currentPlatform === 'Intel' ? '🔵 Intel LGA1851 Platform' : '🔴 AMD Ryzen AM5 Platform'}
          </span>
        </div>

        <button 
          type="button" 
          className={styles.switchPlatformBtn}
          onClick={handlePlatformToggle}
          title={`Switch all matching parts from ${currentPlatform} to ${currentPlatform === 'Intel' ? 'AMD' : 'Intel'}`}
        >
          <RefreshCw size={15} className={styles.spinIcon} />
          <span>Switch to {currentPlatform === 'Intel' ? 'AMD' : 'Intel'} Platform</span>
        </button>
      </div>

      {/* Step Header */}
      <div className={styles.stepHeader}>
        <div>
          <span className={styles.subheadBadge}>
            Part {stepNumber} of {totalSteps} • {stepName.toUpperCase()}
          </span>
          <h2>Select {categoryTitles[stepName] || stepName.toUpperCase()}</h2>
        </div>

        {/* If on CPU step, provide direct Intel <-> AMD part toggle tabs */}
        {stepName === 'cpu' && (
          <div className={styles.cpuPlatformTabs}>
            <button 
              type="button"
              className={`${styles.tabBtn} ${activePlatformFilter === 'Intel' ? styles.tabActiveIntel : ''}`}
              onClick={() => {
                setActivePlatformFilter('Intel');
                onSwitchPlatform('Intel');
              }}
            >
              🔵 Intel CPUs
            </button>
            <button 
              type="button"
              className={`${styles.tabBtn} ${activePlatformFilter === 'AMD' ? styles.tabActiveAmd : ''}`}
              onClick={() => {
                setActivePlatformFilter('AMD');
                onSwitchPlatform('AMD');
              }}
            >
              🔴 AMD CPUs
            </button>
          </div>
        )}
      </div>

      {/* Component Options Grid */}
      {validOptions.length === 0 ? (
        <div className={styles.noOptionsBox}>
          <p>No compatible items found for current selection.</p>
          <button className={styles.primaryBtn} onClick={handlePlatformToggle} type="button">
            Switch Platform to {currentPlatform === 'Intel' ? 'AMD' : 'Intel'}
          </button>
        </div>
      ) : (
        <div className={styles.componentGrid}>
          {validOptions.map(item => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div 
                key={item.id} 
                className={`${styles.compCard} ${isSelected ? styles.compSelected : ''}`}
                onClick={() => handleSelect(item)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.compTopRow}>
                  <span className={styles.compBadge}>{item.performanceTier}</span>
                  <span className={styles.compPrice}>₹{item.priceINR?.toLocaleString('en-IN')}</span>
                </div>

                <h4>{item.brand} {item.name}</h4>
                <p className={styles.compLabel}>{item.customerLabel}</p>
                <p className={styles.compDesc}>{item.shortDescription}</p>

                {/* Compatibility tags */}
                <div className={styles.specTags}>
                  {item.compatibility?.socket && (
                    <span className={styles.specTag}>Socket {item.compatibility.socket}</span>
                  )}
                  {item.compatibility?.wattage && (
                    <span className={styles.specTag}>{item.compatibility.wattage}W Power</span>
                  )}
                  {item.compatibility?.capacityGb && (
                    <span className={styles.specTag}>{item.compatibility.capacityGb}GB Capacity</span>
                  )}
                  {item.compatibility?.boardPowerW && (
                    <span className={styles.specTag}>{item.compatibility.boardPowerW}W TDP</span>
                  )}
                </div>

                <div className={styles.compSelectStatus}>
                  {isSelected ? (
                    <span className={styles.selectedLabel}>
                      <Check size={16} /> Selected
                    </span>
                  ) : (
                    <span className={styles.chooseLabel}>
                      Choose Item
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Navigation */}
      <div className={styles.stepFooter}>
        <button className={styles.textBtn} onClick={onBack} type="button">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button 
          className={styles.primaryBtn} 
          onClick={onNext} 
          disabled={!selectedItem}
          type="button"
        >
          <span>Continue to Next Part</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// BUILD SUMMARY SIDEBAR
// ----------------------------------------------------
function BuildSummary({ targetSteps, onJumpToStep, onTogglePlatform, onReset }) {
  const { buildState, totalINR } = useConfigurator();
  const { selections, platform, workload } = buildState;

  const workloadLabels = {
    video: "Video Editing (4K/8K)",
    '3d': "3D CAD & Rendering",
    ai: "AI & Deep Learning",
    gaming: "Esports & AAA Gaming"
  };

  return (
    <div className={styles.summaryBox}>
      <div className={styles.summaryHeader}>
        <div>
          <h3>Your Custom Build</h3>
          <span className={styles.summaryWorkloadTag}>
            {workloadLabels[workload] || 'Custom Rig'}
          </span>
        </div>
        <button className={styles.resetBtn} onClick={onReset} title="Reset Build" type="button">
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Platform Switcher inside summary */}
      {platform && (
        <div className={styles.summaryPlatformBox}>
          <div className={styles.summaryPlatformInfo}>
            <span className={styles.summaryPlatformLabel}>Platform:</span>
            <span className={`${styles.summaryPlatformVal} ${platform === 'Intel' ? styles.textIntel : styles.textAmd}`}>
              {platform === 'Intel' ? 'Intel LGA1851' : 'AMD AM5'}
            </span>
          </div>
          <button 
            type="button" 
            className={styles.summaryPlatformSwitchBtn}
            onClick={onTogglePlatform}
            title="Switch platform"
          >
            <RefreshCw size={12} />
            <span>Switch to {platform === 'Intel' ? 'AMD' : 'Intel'}</span>
          </button>
        </div>
      )}

      {/* List of components */}
      <div className={styles.summaryList}>
        {targetSteps.map((cat, idx) => {
          const item = selections[cat];
          return (
            <div 
              key={cat} 
              className={styles.summaryItem}
              onClick={() => onJumpToStep(idx + 3)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.summaryItemLeft}>
                <span className={styles.summaryCat}>{cat.toUpperCase()}</span>
                <span className={styles.summaryName}>
                  {item ? `${item.brand} ${item.name}` : 'Select part...'}
                </span>
              </div>
              <div className={styles.summaryItemRight}>
                {item ? (
                  <span className={styles.summaryPrice}>₹{item.priceINR?.toLocaleString('en-IN')}</span>
                ) : (
                  <span className={styles.pendingDot}>Pending</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Section */}
      <div className={styles.summaryTotal}>
        <div>
          <span className={styles.totalLabel}>Estimated Total</span>
          <span className={styles.taxNote}>Includes GST &amp; Assembly</span>
        </div>
        <span className={styles.totalAmount}>₹{totalINR.toLocaleString('en-IN')}</span>
      </div>

      {/* Direct support note */}
      <div className={styles.summaryFooterNote}>
        <ShieldCheck size={16} className="text-[#FDE047] shrink-0" />
        <span>Tested with 72h burn-in stress bench &amp; 3-Year warranty</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// FINAL STEP: Review & WhatsApp Request
// ----------------------------------------------------
function FinalForm({ onBack }) {
  const { buildState } = useConfigurator();
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', city: '', notes: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = generateNormalizedPayload(buildState, formData);
    
    // Redirect to WhatsApp
    const waLink = generateWhatsAppLink(payload);
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const { addToCart, setIsCartOpen } = useShop();

  const handleAddToCart = () => {
    const customRigProduct = {
      id: `custom-pc-${Date.now()}`,
      name: `TecnoMart Custom ${buildState.platform || 'Gaming'} Rig`,
      brand: "TecnoMart Custom Build",
      tagline: `Configured PC with ${buildState.selections.cpu?.name || 'CPU'} & ${buildState.selections.gpu?.name || 'GPU'}`,
      price: `₹${buildState.totalINR?.toLocaleString('en-IN')}`,
      rawPrice: buildState.totalINR || 0,
      images: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80"],
    };
    addToCart(customRigProduct);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.stepBox}>
      <div className={styles.stepIntro}>
        <span className={styles.subheadBadge}>Final Step • Get Official Quote</span>
        <h2>Your {buildState.platform} Rig is Configured!</h2>
        <p>Review the component summary on the right. Enter your contact details to receive an official invoice, check doorstep assembly in Hyderabad, and confirm parts availability via WhatsApp.</p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full Name *</label>
            <input 
              required 
              id="fullName" 
              type="text" 
              name="fullName" 
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">WhatsApp Phone Number *</label>
            <input 
              required 
              id="phone" 
              type="tel" 
              name="phone" 
              placeholder="e.g. +91 98765 43210"
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address *</label>
            <input 
              required 
              id="email" 
              type="email" 
              name="email" 
              placeholder="e.g. rahul@example.com"
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="city">City / Area in Hyderabad *</label>
            <input 
              required 
              id="city" 
              type="text" 
              name="city" 
              placeholder="e.g. Towlichowki / Hitec City"
              value={formData.city} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="notes">Custom Requests or Questions (Optional)</label>
          <textarea 
            id="notes" 
            name="notes" 
            placeholder="Let us know if you want custom RGB lighting, specific liquid cooling tubing, or extra storage drives..."
            value={formData.notes} 
            onChange={handleChange} 
            rows={3} 
          />
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-[48px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Add Entire Custom Rig to Cart</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[48px] bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider rounded-xl border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Print Official Quotation PDF</span>
          </button>
        </div>

        <div className={styles.stepFooter}>
          <button type="button" className={styles.textBtn} onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Parts</span>
          </button>

          <button type="submit" className={styles.whatsAppSubmitBtn}>
            <MessageCircle size={18} />
            <span>Send Custom Quote to WhatsApp</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
