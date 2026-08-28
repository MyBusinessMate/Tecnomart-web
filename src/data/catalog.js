export const catalog = [
  // CPUs - AM5
  {
    id: "cpu-amd-9600x",
    category: "cpu",
    brand: "AMD",
    name: "Ryzen 5 9600X",
    customerLabel: "Great everyday performance",
    shortDescription: "Excellent value for 1080p/1440p gaming and standard multitasking.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 25000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "casual"],
    compatibility: {
      socket: "AM5",
      platform: "AMD",
      generation: "Ryzen 9000",
      wattClass: 65,
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  {
    id: "cpu-amd-9700x",
    category: "cpu",
    brand: "AMD",
    name: "Ryzen 7 9700X",
    customerLabel: "Balanced gaming & work",
    shortDescription: "Perfect balance of efficiency and high frame rates.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 35000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      socket: "AM5",
      platform: "AMD",
      generation: "Ryzen 9000",
      wattClass: 65,
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  {
    id: "cpu-amd-9950x",
    category: "cpu",
    brand: "AMD",
    name: "Ryzen 9 9950X",
    customerLabel: "Maximum workstation power",
    shortDescription: "Top-tier multicore performance for 3D rendering and heavy AI tasks.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 65000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "workstation", "heavy-multitasking"],
    compatibility: {
      socket: "AM5",
      platform: "AMD",
      generation: "Ryzen 9000",
      wattClass: 170,
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  // CPUs - Intel LGA1851
  {
    id: "cpu-intel-245k",
    category: "cpu",
    brand: "Intel",
    name: "Core Ultra 5 245K",
    customerLabel: "Reliable daily driver",
    shortDescription: "Solid base for casual gaming and office tasks.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 28000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "casual"],
    compatibility: {
      socket: "LGA1851",
      platform: "Intel",
      generation: "Core Ultra 200S",
      wattClass: 125,
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  {
    id: "cpu-intel-265k",
    category: "cpu",
    brand: "Intel",
    name: "Core Ultra 7 265K",
    customerLabel: "High-end sweet spot",
    shortDescription: "Strong single-core speed for competitive gaming.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 42000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "competitive", "creative"],
    compatibility: {
      socket: "LGA1851",
      platform: "Intel",
      generation: "Core Ultra 200S",
      wattClass: 125,
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  {
    id: "cpu-intel-285k",
    category: "cpu",
    brand: "Intel",
    name: "Core Ultra 9 285K",
    customerLabel: "Ultimate enthusiast CPU",
    shortDescription: "Uncompromising performance for streaming and 4K gaming.",
    image: "/images/placeholder-cpu.jpg",
    priceINR: 62000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "workstation", "streaming"],
    compatibility: {
      socket: "LGA1851",
      platform: "Intel",
      generation: "Core Ultra 200S",
      wattClass: 125, // Base power, boosts higher
      memoryType: "DDR5",
      requiresDiscreteGpu: false
    }
  },
  
  // GPUs
  {
    id: "gpu-nvidia-5060",
    category: "gpu",
    brand: "NVIDIA",
    name: "GeForce RTX 5060",
    customerLabel: "Great 1080p gaming",
    shortDescription: "Perfect entry into ray tracing and high FPS at 1080p.",
    image: "/images/placeholder-gpu.jpg",
    priceINR: 32000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "casual"],
    compatibility: {
      interface: "PCIe",
      recommendedSystemPowerW: 550,
      boardPowerW: 115,
      lengthMm: 240,
      slotWidth: 2
    }
  },
  {
    id: "gpu-amd-9070",
    category: "gpu",
    brand: "AMD",
    name: "Radeon RX 9070",
    customerLabel: "Smooth 1440p gaming",
    shortDescription: "Excellent value for maxed out 1440p games.",
    image: "/images/placeholder-gpu.jpg",
    priceINR: 55000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "competitive"],
    compatibility: {
      interface: "PCIe",
      recommendedSystemPowerW: 650,
      boardPowerW: 225,
      lengthMm: 280,
      slotWidth: 2.5
    }
  },
  {
    id: "gpu-nvidia-5070",
    category: "gpu",
    brand: "NVIDIA",
    name: "GeForce RTX 5070",
    customerLabel: "High-end 1440p & creative",
    shortDescription: "Incredible raster performance and AI features.",
    image: "/images/placeholder-gpu.jpg",
    priceINR: 65000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative", "streaming"],
    compatibility: {
      interface: "PCIe",
      recommendedSystemPowerW: 650,
      boardPowerW: 250,
      lengthMm: 300,
      slotWidth: 2.5
    }
  },
  {
    id: "gpu-nvidia-5090",
    category: "gpu",
    brand: "NVIDIA",
    name: "GeForce RTX 5090",
    customerLabel: "The absolute best",
    shortDescription: "Peerless 4K gaming and professional 3D rendering power.",
    image: "/images/placeholder-gpu.jpg",
    priceINR: 195000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "workstation", "heavy-multitasking"],
    compatibility: {
      interface: "PCIe",
      recommendedSystemPowerW: 1000,
      boardPowerW: 600,
      lengthMm: 360,
      slotWidth: 3.5
    }
  },

  // Motherboards
  {
    id: "mb-amd-b650",
    category: "motherboard",
    brand: "Gigabyte",
    name: "B650M DS3H",
    customerLabel: "Reliable AM5 base",
    shortDescription: "Everything you need for a modern Ryzen build.",
    image: "/images/placeholder-mb.jpg",
    priceINR: 14000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "casual"],
    compatibility: {
      socket: "AM5",
      platform: "AMD",
      chipsetTier: "B650",
      memoryType: "DDR5",
      maxMemoryGb: 128,
      memorySlots: 4,
      formFactors: ["Micro-ATX"],
      m2Slots: 2,
      sataPorts: 4,
      pcieGeneration: 4
    }
  },
  {
    id: "mb-amd-x670",
    category: "motherboard",
    brand: "ASUS",
    name: "TUF Gaming X670E-PLUS",
    customerLabel: "Premium AM5 board",
    shortDescription: "Robust power delivery and PCIe 5.0 for future-proofing.",
    image: "/images/placeholder-mb.jpg",
    priceINR: 28000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "workstation"],
    compatibility: {
      socket: "AM5",
      platform: "AMD",
      chipsetTier: "X670E",
      memoryType: "DDR5",
      maxMemoryGb: 192,
      memorySlots: 4,
      formFactors: ["ATX"],
      m2Slots: 4,
      sataPorts: 4,
      pcieGeneration: 5
    }
  },
  {
    id: "mb-intel-b860",
    category: "motherboard",
    brand: "MSI",
    name: "PRO B860M-A WIFI",
    customerLabel: "Reliable LGA1851 base",
    shortDescription: "Excellent value for Core Ultra 200S systems.",
    image: "/images/placeholder-mb.jpg",
    priceINR: 16000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "casual"],
    compatibility: {
      socket: "LGA1851",
      platform: "Intel",
      chipsetTier: "B860",
      memoryType: "DDR5",
      maxMemoryGb: 192,
      memorySlots: 4,
      formFactors: ["Micro-ATX"],
      m2Slots: 2,
      sataPorts: 4,
      pcieGeneration: 4
    }
  },
  {
    id: "mb-intel-z890",
    category: "motherboard",
    brand: "MSI",
    name: "MAG Z890 TOMAHAWK WIFI",
    customerLabel: "Premium LGA1851 board",
    shortDescription: "Top tier VRMs for maximum Core Ultra performance.",
    image: "/images/placeholder-mb.jpg",
    priceINR: 32000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "workstation"],
    compatibility: {
      socket: "LGA1851",
      platform: "Intel",
      chipsetTier: "Z890",
      memoryType: "DDR5",
      maxMemoryGb: 192,
      memorySlots: 4,
      formFactors: ["ATX"],
      m2Slots: 4,
      sataPorts: 6,
      pcieGeneration: 5
    }
  },

  // Memory
  {
    id: "ram-16gb-ddr5",
    category: "memory",
    brand: "Corsair",
    name: "Vengeance 16GB (2x8GB) DDR5-5200",
    customerLabel: "Basic DDR5",
    shortDescription: "Standard capacity for basic tasks and light gaming.",
    image: "/images/placeholder-ram.jpg",
    priceINR: 5000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["casual"],
    compatibility: {
      memoryType: "DDR5",
      capacityGb: 16,
      speedClass: 5200,
      moduleCount: 2,
      formFactor: "DIMM"
    }
  },
  {
    id: "ram-32gb-ddr5",
    category: "memory",
    brand: "G.Skill",
    name: "Trident Z5 32GB (2x16GB) DDR5-6000",
    customerLabel: "Sweet spot capacity",
    shortDescription: "Ideal amount and speed for modern gaming and work.",
    image: "/images/placeholder-ram.jpg",
    priceINR: 11000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      memoryType: "DDR5",
      capacityGb: 32,
      speedClass: 6000,
      moduleCount: 2,
      formFactor: "DIMM"
    }
  },
  {
    id: "ram-64gb-ddr5",
    category: "memory",
    brand: "Kingston",
    name: "Fury Beast 64GB (2x32GB) DDR5-6400",
    customerLabel: "Heavy multitasking",
    shortDescription: "For massive video projects and complex 3D scenes.",
    image: "/images/placeholder-ram.jpg",
    priceINR: 22000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation", "heavy-multitasking"],
    compatibility: {
      memoryType: "DDR5",
      capacityGb: 64,
      speedClass: 6400,
      moduleCount: 2,
      formFactor: "DIMM"
    }
  },

  // Storage
  {
    id: "storage-1tb-nvme",
    category: "storage",
    brand: "Crucial",
    name: "P3 Plus 1TB NVMe",
    customerLabel: "Fast standard storage",
    shortDescription: "Plenty of room for your OS and a few large games.",
    image: "/images/placeholder-storage.jpg",
    priceINR: 6000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["casual", "gaming"],
    compatibility: {
      type: "nvme",
      capacityGb: 1000,
      interface: "PCIe",
      generation: 4,
      formFactor: "M.2 2280"
    }
  },
  {
    id: "storage-2tb-nvme",
    category: "storage",
    brand: "Samsung",
    name: "990 PRO 2TB NVMe",
    customerLabel: "High capacity & speed",
    shortDescription: "Top tier loading times and massive space.",
    image: "/images/placeholder-storage.jpg",
    priceINR: 16000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      type: "nvme",
      capacityGb: 2000,
      interface: "PCIe",
      generation: 4,
      formFactor: "M.2 2280"
    }
  },
  {
    id: "storage-4tb-nvme",
    category: "storage",
    brand: "WD",
    name: "Black SN850X 4TB NVMe",
    customerLabel: "Massive fast vault",
    shortDescription: "Never worry about uninstalling games again.",
    image: "/images/placeholder-storage.jpg",
    priceINR: 31000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation", "gaming"],
    compatibility: {
      type: "nvme",
      capacityGb: 4000,
      interface: "PCIe",
      generation: 4,
      formFactor: "M.2 2280"
    }
  },

  // PSU
  {
    id: "psu-650w",
    category: "psu",
    brand: "Corsair",
    name: "CX650M 650W",
    customerLabel: "Reliable baseline power",
    shortDescription: "Bronze certified, enough for most midrange builds.",
    image: "/images/placeholder-psu.jpg",
    priceINR: 5500,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["casual"],
    compatibility: {
      wattage: 650,
      efficiency: "80+ Bronze",
      standard: "ATX",
      recommendedForPowerW: 550
    }
  },
  {
    id: "psu-850w",
    category: "psu",
    brand: "MSI",
    name: "MPG A850G 850W",
    customerLabel: "Strong Gold power",
    shortDescription: "Fully modular, highly efficient power delivery.",
    image: "/images/placeholder-psu.jpg",
    priceINR: 10500,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      wattage: 850,
      efficiency: "80+ Gold",
      standard: "ATX 3.0",
      recommendedForPowerW: 750
    }
  },
  {
    id: "psu-1000w",
    category: "psu",
    brand: "Seasonic",
    name: "Focus GX-1000 1000W",
    customerLabel: "Enthusiast headroom",
    shortDescription: "Flawless power for RTX 5090 level systems.",
    image: "/images/placeholder-psu.jpg",
    priceINR: 18000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation", "gaming"],
    compatibility: {
      wattage: 1000,
      efficiency: "80+ Gold",
      standard: "ATX 3.0",
      recommendedForPowerW: 1000
    }
  },
  {
    id: "psu-1200w",
    category: "psu",
    brand: "Corsair",
    name: "RM1200x Shift",
    customerLabel: "Extreme headroom",
    shortDescription: "For the most demanding builds possible.",
    image: "/images/placeholder-psu.jpg",
    priceINR: 23000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation"],
    compatibility: {
      wattage: 1200,
      efficiency: "80+ Gold",
      standard: "ATX 3.0",
      recommendedForPowerW: 1200
    }
  },

  // Cooler
  {
    id: "cooler-air",
    category: "cooling",
    brand: "Deepcool",
    name: "AK400",
    customerLabel: "Quiet air cooling",
    shortDescription: "Reliable standard cooling for non-K or 65W CPUs.",
    image: "/images/placeholder-cooler.jpg",
    priceINR: 3000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["casual"],
    compatibility: {
      type: "air",
      supportedSockets: ["AM5", "LGA1851"],
      coolingTier: 150,
      tdpClass: "medium",
      radiatorSize: 0,
      heightMm: 155
    }
  },
  {
    id: "cooler-aio-240",
    category: "cooling",
    brand: "Arctic",
    name: "Liquid Freezer III 240",
    customerLabel: "Liquid smooth temps",
    shortDescription: "Excellent AIO cooling for gaming chips.",
    image: "/images/placeholder-cooler.jpg",
    priceINR: 8500,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      type: "aio",
      supportedSockets: ["AM5", "LGA1851"],
      coolingTier: 250,
      tdpClass: "high",
      radiatorSize: 240,
      heightMm: 0
    }
  },
  {
    id: "cooler-aio-360",
    category: "cooling",
    brand: "Corsair",
    name: "iCUE H150i Elite",
    customerLabel: "Maximum chill",
    shortDescription: "Massive 360mm radiator for top-tier CPUs.",
    image: "/images/placeholder-cooler.jpg",
    priceINR: 17000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation", "gaming"],
    compatibility: {
      type: "aio",
      supportedSockets: ["AM5", "LGA1851"],
      coolingTier: 350,
      tdpClass: "extreme",
      radiatorSize: 360,
      heightMm: 0
    }
  },

  // Cabinet
  {
    id: "case-matx",
    category: "cabinet",
    brand: "Montech",
    name: "AIR 100 ARGB",
    customerLabel: "Compact & cool",
    shortDescription: "Micro-ATX case that fits most standard components easily.",
    image: "/images/placeholder-case.jpg",
    priceINR: 5000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["casual"],
    compatibility: {
      supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
      maxGpuLengthMm: 330,
      maxCoolerHeightMm: 161,
      supportedRadiators: [240],
      psuFormat: ["ATX"],
      includedFans: 4
    }
  },
  {
    id: "case-atx-mid",
    category: "cabinet",
    brand: "Corsair",
    name: "4000D Airflow",
    customerLabel: "The gold standard",
    shortDescription: "Roomy ATX mid-tower with legendary airflow.",
    image: "/images/placeholder-case.jpg",
    priceINR: 7500,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLengthMm: 360,
      maxCoolerHeightMm: 170,
      supportedRadiators: [240, 280, 360],
      psuFormat: ["ATX"],
      includedFans: 2
    }
  },
  {
    id: "case-atx-full",
    category: "cabinet",
    brand: "Lian Li",
    name: "O11 Dynamic EVO",
    customerLabel: "Showcase giant",
    shortDescription: "Beautiful glass panels and massive clearance.",
    image: "/images/placeholder-case.jpg",
    priceINR: 15000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["workstation", "gaming"],
    compatibility: {
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX"],
      maxGpuLengthMm: 422,
      maxCoolerHeightMm: 167,
      supportedRadiators: [240, 280, 360],
      psuFormat: ["ATX"],
      includedFans: 0
    }
  },

  // Monitor
  {
    id: "monitor-1080p",
    category: "monitor",
    brand: "AOC",
    name: "24G2SP 24\" 165Hz",
    customerLabel: "Fast 1080p gaming",
    shortDescription: "High refresh rate for competitive multiplayer.",
    image: "/images/placeholder-monitor.jpg",
    priceINR: 12000,
    availability: "in_stock",
    performanceTier: "value",
    workloadTags: ["gaming", "competitive"],
    compatibility: {
      resolution: "1080p",
      refreshHz: 165,
      panelType: "IPS",
      sizeInches: 24
    }
  },
  {
    id: "monitor-1440p",
    category: "monitor",
    brand: "LG",
    name: "27GP850-B 27\" 165Hz",
    customerLabel: "Crisp 1440p sweet spot",
    shortDescription: "The ideal balance of sharpness and fluid motion.",
    image: "/images/placeholder-monitor.jpg",
    priceINR: 28000,
    availability: "in_stock",
    performanceTier: "balanced",
    workloadTags: ["gaming", "creative"],
    compatibility: {
      resolution: "1440p",
      refreshHz: 165,
      panelType: "Nano IPS",
      sizeInches: 27
    }
  },
  {
    id: "monitor-4k",
    category: "monitor",
    brand: "Alienware",
    name: "AW3225QF 32\" 4K OLED",
    customerLabel: "Ultimate visual experience",
    shortDescription: "240Hz 4K OLED for breathtaking colors and infinite contrast.",
    image: "/images/placeholder-monitor.jpg",
    priceINR: 95000,
    availability: "in_stock",
    performanceTier: "performance",
    workloadTags: ["gaming", "creative", "media"],
    compatibility: {
      resolution: "4K",
      refreshHz: 240,
      panelType: "QD-OLED",
      sizeInches: 32
    }
  }
];
