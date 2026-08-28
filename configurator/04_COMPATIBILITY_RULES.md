# Compatibility Engine Rules

## Principle

Compatibility must be deterministic. Do not ask an LLM to decide whether parts fit together at runtime.

## Required product attributes

### CPU
- id
- brand
- model
- socket
- platform
- generation
- performanceTier: value | balanced | performance
- workloadTags
- wattClass
- memoryType
- requiresDiscreteGpu: boolean

### GPU
- id
- brand
- model
- performanceTier
- workloadTags
- vramGb
- recommendedSystemPowerW
- boardPowerW
- lengthMm
- slotWidth
- interface

### Motherboard
- id
- socket
- platform
- chipsetTier
- memoryType
- maxMemoryGb
- memorySlots
- formFactors
- m2Slots
- sataPorts
- pcieGeneration

### Memory kit
- id
- memoryType
- capacityGb
- speedClass
- moduleCount
- formFactor

### Storage
- id
- type: nvme | sata-ssd | hdd
- capacityGb
- interface
- generation
- formFactor

### PSU
- id
- wattage
- efficiency
- standard
- connectors
- recommendedForPowerW

### Cooler
- id
- type
- supportedSockets
- coolingTier
- tdpClass
- radiatorSize
- heightMm

### Cabinet
- id
- supportedFormFactors
- maxGpuLengthMm
- maxCoolerHeightMm
- supportedRadiators
- psuFormat
- includedFans

### Monitor
- id
- resolution
- refreshHz
- panelType
- sizeInches
- performanceTier

## CPU -> Motherboard

Only show boards whose socket/platform matches the selected CPU.

Example current-platform facts:
- AMD Ryzen desktop 9000 series uses the AM5 ecosystem. AMD's official desktop Ryzen page lists Ryzen 9000 alongside older families. citeturn819006search2
- Intel Core Ultra 200S desktop processors use LGA1851 and Intel 800-series chipsets. They are not backward compatible with older LGA1700 platforms. citeturn610280search3turn610280search5

## Motherboard -> Memory

Only show memory matching the board's supported memory type.

Also check:
- capacity limit
- module count
- form factor where applicable

## Motherboard -> Storage

Require a compatible interface.

For a simplified v1:
- prioritize NVMe M.2 storage;
- show SATA SSD only when useful or needed;
- do not force users to understand PCIe generations.

## CPU/GPU -> PSU

Use:
`requiredPsuW = max(gpuRecommendedSystemPowerW, cpuBasePowerW + gpuBoardPowerW + safetyAllowance)`, then round up to the next store-supported PSU tier.

Use a conservative safety allowance and never recommend a PSU below the GPU manufacturer's specified system-power guidance.

Example current official GPU guidance:
- NVIDIA RTX 5060 requires 550 W system power in the reference configuration; RTX 5060 Ti lists 600 W. citeturn514148search3
- NVIDIA RTX 5090 lists 1000 W required system power in the reference configuration. citeturn514148search2
- AMD RX 9070 XT lists a 750 W recommended PSU; RX 9070 lists 650 W. citeturn819006search48turn819006search1

Important: use the exact product/SKU values from the store's current catalog, not generic GPU-family estimates.

## CPU -> Cooling

Only show coolers compatible with the CPU socket and appropriate for the CPU's thermal class.

Intel currently notes LGA1851 boxed desktop processors require an appropriate thermal solution and that cooler compatibility/power requirements must be checked by model. citeturn610280search8

## Motherboard/GPU/Cooler -> Cabinet

Show only cases where all are true:
- motherboard form factor supported;
- GPU length <= max GPU length;
- cooler height <= max cooler height OR radiator supported;
- PSU format supported.

## GPU -> Monitor

For Complete Gaming Setup:
- value GPU -> prioritize 1080p monitors;
- balanced GPU -> prioritize 1440p monitors;
- performance GPU -> show 1440p high-refresh or 4K options.

This is a recommendation filter, not a hard compatibility rule.

## No-result safety

Never return zero choices for a customer step.

If filtering produces zero valid products:
1. relax only the least-important preference dimension;
2. preserve hard technical compatibility;
3. provide a single friendly note: `We adjusted the options to keep your build compatible.`
4. return at least one valid option if the catalog has any technically valid choice.

## Recommendation scoring

Suggested scoring factors:
- build type match: +30
- user goal match: +25
- priority tier match: +20
- compatibility: mandatory
- reasonable balance with current selected components: +15
- store priority/availability: +10

The recommendation engine should choose the highest-scoring technically valid product.
