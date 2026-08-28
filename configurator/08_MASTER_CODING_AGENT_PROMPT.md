# Master Coding-Agent Prompt

You are implementing a production-quality **Custom PC Setup Configurator** for a PC-only wholesale/reseller mart.

## Goal

Add a landing-page section named **Build your custom setup** with a CTA **Build your setup** that routes to `/build-your-setup`.

The dedicated page is an interactive step-by-step PC builder for:

1. Gaming PC
2. Workstation PC
3. Complete Gaming Setup

The system is designed for ordinary customers, not hardware engineers. Use plain user language in visible UI. Keep technical compatibility logic hidden behind deterministic rules.

## Non-negotiable requirements

1. Three options per choice step whenever three valid options exist.
2. One option can be marked **Recommended**.
3. Do not show configuration prices until the final summary.
4. Earlier choices must filter later choices.
5. Back navigation must preserve valid choices.
6. If an upstream change invalidates a downstream choice, clear only invalid dependent selections and explain it simply.
7. The user can switch between Recommended and Customize modes.
8. Recommended mode must automatically choose a compatible, sensible build.
9. Customize mode lets users change components one-by-one.
10. Store non-sensitive build state in `localStorage` under `pcMart.customBuild.v1`.
11. Do not ask users to understand socket/chipset jargon.
12. Never invent technically incompatible builds.
13. Do not use an LLM to decide hardware compatibility.
14. The final request form must include the complete selected configuration.
15. Submit the lead to a configurable backend endpoint.
16. Generate a WhatsApp-ready sales message from the exact same normalized configuration.
17. Make the UI excellent on mobile.
18. Keep the visual experience premium, calm, fast and low-cognitive-load.

## Page structure

### Landing section

Heading: `Build your custom setup`

Body: `Tell us what you need. We will guide you to a PC that fits your work, gaming, and performance goals.`

CTA: `Build your setup`

### Configurator header

- Back to store
- Page title: `Build a PC that fits you.`
- progress indicator
- reset action

### Step sequence

Step 1: What do you want to build?
- Gaming PC
- Workstation PC
- Complete Gaming Setup

Step 2: What matters most to you?
- Best value
- Balanced - Recommended
- Maximum performance

Optional goal step, shown when useful:
Gaming: everyday / competitive / 1440p-4K
Workstation: video-photo / 3D-CAD-rendering / coding-AI-heavy multitasking
Complete setup: casual / competitive / high-end-streaming

Then component flow:
CPU -> Graphics -> Motherboard -> Memory -> Storage -> Power -> Cooling -> Cabinet -> optional monitor/peripherals -> Final summary

## UX behavior

At every step:
- show exactly three cards when possible;
- show image, friendly name, one-line explanation, key visible specs;
- hide price until final summary;
- show one Recommended badge;
- show current selection state;
- allow click anywhere on card;
- support keyboard navigation and focus states;
- provide a disabled Continue button until a valid choice is selected;
- provide Back where appropriate.

Desktop:
- main step area + sticky build summary.

Mobile:
- one-column cards + sticky bottom build-summary bar.

## Recommendation engine

Build a deterministic scoring system.

Candidate score inputs:
- build type match +30
- goal match +25
- priority match +20
- current availability +10
- balanced fit with already-selected components +15

Compatibility is mandatory, not a score.

Recommended mode:
- automatically select the highest-scoring compatible candidate at each step;
- let the user inspect what was selected;
- provide `Customize instead`.

Customize mode:
- show the three filtered alternatives;
- keep the recommended option marked.

## Compatibility engine

Implement pure functions such as:

```ts
getCompatibleMotherboards(cpu, catalog)
getCompatibleMemory(motherboard, catalog)
getCompatibleStorage(motherboard, catalog)
getCompatiblePSUs(cpu, gpu, catalog)
getCompatibleCoolers(cpu, cabinet, catalog)
getCompatibleCabinets(motherboard, gpu, cooler, psu, catalog)
getRecommendedMonitor(gpu, goal, catalog)
```

Never rely on UI text for compatibility. Use stable product IDs and normalized attributes.

Hard rules:
- CPU socket/platform must match motherboard.
- Memory type must match motherboard.
- Storage interface must be supported by motherboard.
- PSU must meet the higher of GPU requirement or computed system requirement plus headroom.
- Cooling must support CPU socket and thermal class.
- Cabinet must support motherboard form factor, GPU length, cooler clearance/radiator size and PSU format.

## Data architecture

Create a single catalog/data layer, initially local JSON/module data.

Each product has:
- id
- category
- brand
- name
- customerLabel
- description
- image
- priceINR
- availability
- performanceTier
- workloadTags
- compatibility/meta

Do not scatter product information through individual components.

## Current starter data guidance

Use current manufacturer product families only as seed references. Current official sources include:
- AMD Ryzen desktop 9000-series portfolio. citeturn819006search2
- Intel Core Ultra 200S/200S Plus desktop processors on LGA1851/800-series platforms. citeturn610280search0turn610280search9
- NVIDIA GeForce RTX 50 desktop line including RTX 5090, 5080, 5070 Ti, 5070, 5060 Ti, 5060 and 5050. citeturn514148search0
- AMD Radeon RX 9000-series desktop products including RX 9070 XT, RX 9070, RX 9070 GRE and RX 9060 XT variants. citeturn819006search0turn819006search1

Do not invent store inventory. Mark sample prices with `priceINR: 0` until real store pricing is available.

## State persistence

Use localStorage key:
`pcMart.customBuild.v1`

Store:
- buildId
- buildType
- priority
- goal
- mode
- selections
- stepIndex
- timestamps

Do not store email/phone in this build draft unless explicitly required.

On page load:
- detect saved draft;
- allow Continue or Start over.

## Final summary

Show:
- full component list
- final estimated total in INR
- optional key performance highlights
- edit actions
- Request this build

Price should appear only here.

## Request form

Fields:
- full name required
- mobile/WhatsApp required
- email required
- city required
- preferred contact optional
- notes optional

Show configuration summary above submit.

On submit:

```text
validate -> normalize -> POST -> success -> optional WhatsApp
```

Make the backend endpoint configurable with an environment variable or config value, for example:
`CUSTOM_BUILD_REQUEST_ENDPOINT`

Expected normalized payload:

```json
{
  "source": "custom-pc-configurator",
  "buildId": "...",
  "submittedAt": "...",
  "customer": {
    "fullName": "...",
    "phone": "...",
    "email": "...",
    "city": "...",
    "preferredContact": "whatsapp",
    "notes": "..."
  },
  "configuration": {
    "buildType": "gaming-pc",
    "priority": "balanced",
    "goal": "1440p-gaming",
    "mode": "recommended",
    "items": []
  },
  "pricing": {
    "estimatedTotalINR": 0,
    "currency": "INR"
  }
}
```

## WhatsApp message

Generate from structured data, never from DOM scraping.

Example:

`New Custom PC Build Request`

`Customer: {name}`
`Phone: {phone}`
`City: {city}`

`Build: {build type}`
`Priority: {priority}`
`Goal: {goal}`

`CPU: ...`
`GPU: ...`
`Motherboard: ...`
`RAM: ...`
`Storage: ...`
`PSU: ...`
`Cooling: ...`
`Cabinet: ...`

`Estimated Total: ₹...`

`Notes: ...`

Do not place unescaped personal data into URLs. Use proper URL encoding for a WhatsApp link.

## Accessibility

- semantic headings
- buttons for actionable cards where practical
- visible keyboard focus
- `aria-selected` / `aria-pressed` where relevant
- labels for every form field
- accessible validation messages
- sufficient contrast
- reduced-motion handling

## Performance

- lazy-load product images below fold;
- compress/modernize product images;
- avoid unnecessary re-renders;
- debounce only where necessary;
- do not pre-load the entire product-image catalog if not needed.

## Error handling

User-facing errors must be simple.

Bad:
`Invalid chipset mapping: LGA1851 board candidate missing memory profile.`

Good:
`We couldn't keep that combination together. We adjusted the options to a compatible choice.`

For submission errors:
`We couldn't send your request yet. Please check your connection and try again.`

## Testing requirements

Write tests for:
- each build type
- each priority
- each goal
- CPU -> motherboard compatibility
- motherboard -> RAM compatibility
- GPU -> PSU requirements
- cabinet clearance
- back navigation
- upstream-change invalidation
- localStorage restore
- localStorage reset
- final price calculation
- final payload generation
- form validation
- WhatsApp message generation
- no zero-option dead ends when compatible catalog items exist

## Definition of done

The feature is complete only when a user can:

1. enter from the landing page;
2. choose one of three build types;
3. follow the recommended path;
4. optionally customize;
5. never see incompatible parts;
6. go backward and edit choices;
7. see their complete final build and price;
8. request the build with contact details;
9. have the exact configuration sent in the backend payload;
10. get a success confirmation;
11. optionally trigger the WhatsApp handoff;
12. return later and continue a saved draft.

Before declaring completion, run the acceptance checklist in `09_ACCEPTANCE_TESTS.md`.
