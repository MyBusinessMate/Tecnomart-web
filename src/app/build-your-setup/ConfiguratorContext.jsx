"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialBuildState, saveBuildState, loadBuildState, clearBuildState } from '../../lib/configurator/state';
import { generateRecommendedBuild, switchPlatform as switchPlatformHelper } from '../../lib/configurator/recommendation';
import { calculateTotal } from '../../lib/configurator/whatsapp';

const ConfiguratorContext = createContext(null);

export function ConfiguratorProvider({ children }) {
  const [buildState, setBuildState] = useState(initialBuildState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state on mount
  useEffect(() => {
    const draft = loadBuildState();
    if (draft && (draft.workload || draft.platform)) {
      setBuildState(draft);
    }
    setIsLoaded(true);
  }, []);

  // Save state on change
  useEffect(() => {
    if (isLoaded && (buildState.workload || buildState.platform)) {
      saveBuildState(buildState);
    }
  }, [buildState, isLoaded]);

  const updateWorkload = (workload) => {
    setBuildState(prev => ({
      ...prev,
      workload,
      stepIndex: 1 // Next: Intel vs AMD selection
    }));
  };

  const updatePlatform = (platform) => {
    setBuildState(prev => {
      const tempState = {
        ...prev,
        platform,
        stepIndex: 2 // Next: Priority tier selection
      };
      // Pre-generate recommended build
      const recommended = generateRecommendedBuild(tempState);
      return recommended;
    });
  };

  const updatePriority = (priority) => {
    setBuildState(prev => {
      const tempState = {
        ...prev,
        priority,
        stepIndex: 3 // Component walkthrough start
      };
      const recommended = generateRecommendedBuild(tempState);
      return recommended;
    });
  };

  const switchPlatform = (targetPlatform) => {
    setBuildState(prev => {
      const switched = switchPlatformHelper(prev, targetPlatform);
      return switched;
    });
  };

  const togglePlatform = () => {
    setBuildState(prev => {
      const nextPlatform = prev.platform === 'Intel' ? 'AMD' : 'Intel';
      return switchPlatformHelper(prev, nextPlatform);
    });
  };

  const setMode = (mode) => {
    setBuildState(prev => ({ ...prev, mode }));
  };

  const updateSelection = (category, item) => {
    setBuildState(prev => {
      const newSelections = {
        ...prev.selections,
        [category]: item
      };

      let newPlatform = prev.platform;
      // If user chooses a CPU, keep platform aligned
      if (category === 'cpu' && item?.brand) {
        newPlatform = item.brand;
      }

      const newState = {
        ...prev,
        platform: newPlatform,
        selections: newSelections,
        mode: 'customize'
      };

      return newState;
    });
  };

  const nextStep = () => {
    setBuildState(prev => ({ ...prev, stepIndex: prev.stepIndex + 1 }));
  };

  const prevStep = () => {
    setBuildState(prev => ({ ...prev, stepIndex: Math.max(0, prev.stepIndex - 1) }));
  };

  const jumpToStep = (index) => {
    setBuildState(prev => ({ ...prev, stepIndex: index }));
  };

  const resetBuild = () => {
    clearBuildState();
    setBuildState({ ...initialBuildState, buildId: crypto.randomUUID() });
  };

  const totalINR = calculateTotal(buildState.selections);

  const contextValue = useMemo(() => ({
    buildState,
    isLoaded,
    totalINR,
    updateWorkload,
    updatePlatform,
    updatePriority,
    switchPlatform,
    togglePlatform,
    updateSelection,
    setMode,
    nextStep,
    prevStep,
    jumpToStep,
    resetBuild
  }), [buildState, isLoaded, totalINR]);

  return (
    <ConfiguratorContext.Provider value={contextValue}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error("useConfigurator must be used within ConfiguratorProvider");
  return ctx;
}
