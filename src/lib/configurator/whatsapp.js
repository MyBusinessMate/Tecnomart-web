export function calculateTotal(selections) {
  let total = 0;
  for (const cat of Object.keys(selections)) {
    if (selections[cat]) {
      total += (selections[cat].priceINR || 0);
    }
  }
  return total;
}

export function generateNormalizedPayload(buildState, customerData) {
  const items = Object.values(buildState.selections)
    .filter(item => item !== null)
    .map(item => ({
      category: item.category,
      productId: item.id,
      name: item.name,
      brand: item.brand,
      quantity: 1,
      unitPriceINR: item.priceINR
    }));

  return {
    source: "custom-pc-configurator",
    buildId: buildState.buildId || crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    customer: {
      fullName: customerData.fullName,
      phone: customerData.phone,
      email: customerData.email,
      city: customerData.city,
      preferredContact: "whatsapp",
      notes: customerData.notes || ""
    },
    configuration: {
      workload: buildState.workload,
      platform: buildState.platform,
      priority: buildState.priority,
      mode: buildState.mode,
      items
    },
    pricing: {
      estimatedTotalINR: calculateTotal(buildState.selections),
      currency: "INR"
    }
  };
}

export function generateWhatsAppLink(payload) {
  const storePhone = "919010667726"; // Actual WhatsApp Business number

  const workloadLabels = {
    video: "Video Editing & Content Creation (4K/8K)",
    '3d': "3D CAD, Modeling & Rendering",
    ai: "AI, Machine Learning & Heavy Multitasking",
    gaming: "Esports & AAA Gaming Rig"
  };

  let msg = `*New Custom PC Build Configuration*\n\n`;
  msg += `*Customer:* ${payload.customer.fullName}\n`;
  msg += `*Phone:* ${payload.customer.phone}\n`;
  msg += `*City:* ${payload.customer.city}\n\n`;
  
  msg += `*Workload:* ${workloadLabels[payload.configuration.workload] || payload.configuration.workload}\n`;
  msg += `*Platform:* ${payload.configuration.platform} Architecture\n`;
  msg += `*Tier:* ${payload.configuration.priority?.toUpperCase()}\n\n`;
  msg += `*Selected Components:*\n`;

  payload.configuration.items.forEach(item => {
    msg += `• *${item.category.toUpperCase()}:* ${item.brand} ${item.name} — ₹${item.unitPriceINR.toLocaleString('en-IN')}\n`;
  });

  msg += `\n*Estimated Total:* ₹${payload.pricing.estimatedTotalINR.toLocaleString('en-IN')}\n`;
  if (payload.customer.notes) {
    msg += `*Notes:* ${payload.customer.notes}\n`;
  }

  const encodedMsg = encodeURIComponent(msg);
  return `https://wa.me/${storePhone}?text=${encodedMsg}`;
}
