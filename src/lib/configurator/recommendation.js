import { getOptionsForCategory, getCompatibleMotherboards, getCPUsByPlatform } from './compatibility';

/**
 * Score a single item based on current build state.
 */
function scoreItem(item, buildState) {
  let score = 0;

  // Platform constraint for CPU and Motherboard
  if (buildState.platform) {
    if (item.category === 'cpu' && item.brand.toLowerCase() !== buildState.platform.toLowerCase()) {
      return -1000;
    }
    if (item.category === 'motherboard' && item.compatibility?.platform?.toLowerCase() !== buildState.platform.toLowerCase()) {
      return -1000;
    }
  }

  // Workload Match
  const workload = buildState.workload;
  if (workload === 'video') {
    if (item.workloadTags?.includes('creative')) score += 35;
    if (item.workloadTags?.includes('workstation')) score += 20;
  } else if (workload === '3d') {
    if (item.workloadTags?.includes('workstation')) score += 35;
    if (item.workloadTags?.includes('creative')) score += 20;
  } else if (workload === 'ai') {
    if (item.workloadTags?.includes('heavy-multitasking')) score += 35;
    if (item.workloadTags?.includes('workstation')) score += 30;
  } else if (workload === 'gaming') {
    if (item.workloadTags?.includes('gaming')) score += 35;
    if (item.workloadTags?.includes('competitive')) score += 20;
  }

  // Priority Tier Match (value, balanced, performance)
  if (item.performanceTier === buildState.priority) {
    score += 30;
  }

  // Availability
  if (item.availability === 'in_stock') {
    score += 10;
  }

  // Tier balance with selected CPU
  if (buildState.selections.cpu && item.category !== 'cpu') {
    if (item.performanceTier === buildState.selections.cpu.performanceTier) {
      score += 20;
    }
  }

  return score;
}

/**
 * Returns the top recommended item for a category given current state.
 */
export function getRecommendedItem(category, buildState) {
  const resolvedSelections = { ...buildState.selections };
  const validOptions = getOptionsForCategory(category, resolvedSelections, buildState.platform);
  if (!validOptions || validOptions.length === 0) return null;

  const scored = validOptions.map(item => ({
    item,
    score: scoreItem(item, buildState)
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.item || validOptions[0];
}

export const stepsOrder = [
  'cpu', 'gpu', 'motherboard', 'memory', 'storage', 'psu', 'cooling', 'cabinet', 'monitor'
];

export function getTargetSteps(_workload) {
  // All desktop PC builds walk through the core hardware sequence
  return stepsOrder;
}

/**
 * Auto-generate full build based on workload, platform, and priority tier.
 */
export function generateRecommendedBuild(buildState) {
  const newState = {
    ...buildState,
    selections: { ...buildState.selections }
  };

  const targetSteps = getTargetSteps(buildState.workload);

  for (const step of targetSteps) {
    const recommended = getRecommendedItem(step, newState);
    if (recommended) {
      newState.selections[step] = recommended;
    }
  }

  return newState;
}

/**
 * Seamlessly switch build between Intel and AMD platforms.
 * Automatically swaps CPU and Motherboard to equivalent tier while preserving other parts.
 */
export function switchPlatform(buildState, targetPlatform) {
  const platform = targetPlatform || (buildState.platform === 'Intel' ? 'AMD' : 'Intel');
  
  const newState = {
    ...buildState,
    platform,
    selections: { ...buildState.selections }
  };

  // 1. Pick equivalent CPU on the target platform
  const targetCPUs = getCPUsByPlatform(platform);
  const currentTier = buildState.selections.cpu?.performanceTier || buildState.priority || 'balanced';
  
  let newCpu = targetCPUs.find(cpu => cpu.performanceTier === currentTier) || targetCPUs[0];
  newState.selections.cpu = newCpu;

  // 2. Pick compatible Motherboard for the new CPU
  const targetMbs = getCompatibleMotherboards(newCpu, platform);
  let newMb = targetMbs.find(mb => mb.performanceTier === currentTier) || targetMbs[0];
  newState.selections.motherboard = newMb;

  // 3. Re-evaluate cooler if needed (coolers support both sockets)
  return newState;
}
