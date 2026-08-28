# Product Flow Specification

## 1. Landing-page entry

Section heading:

**Build your custom setup**

Supporting copy:

**Tell us what you need. We will narrow down the right PC for you.**

Primary CTA:

**Build your setup**

CTA behavior:
- Navigate to `/build-your-setup`.
- Start a fresh build only when no recoverable draft exists.
- If a saved draft exists, show a lightweight choice: **Continue your build** / **Start over**.
- Do not delete saved data unless the user explicitly chooses Start over.

## 2. Configurator shell

Desktop layout:
- Left/main column: current step and three option cards.
- Right/sticky column: live build summary.
- Top: step count/progress.
- Bottom: Back + Continue controls.

Mobile layout:
- Single-column step content.
- Sticky bottom summary bar: `Your build · X/Y`.
- Tapping summary opens a drawer with current selections.
- Back/Continue controls remain accessible without scrolling back to the top.

## 3. Step 1 - What do you want to build?

Three choices only:

### Gaming PC
For games, high FPS, competitive play, streaming and modern gaming.

### Workstation PC
For editing, 3D, rendering, engineering, software development, AI/ML and heavy multitasking.

### Complete Gaming Setup
A gaming PC plus the essential desk setup components.

## 4. Step 2 - What matters most to you?

Use user language.

### Best value
Spend wisely and get strong performance without overbuilding.

### Balanced - Recommended
The sweet spot for performance, longevity and sensible spending.

### Maximum performance
Prioritize speed and headroom over price.

This step creates an initial recommendation profile.

## 5. Optional user-goal refinement

Only show this step if the selected build type benefits from it. Do not make every user answer every technical question.

Gaming PC:
- Smooth everyday gaming
- High FPS competitive gaming
- High-quality 1440p/4K gaming

Workstation PC:
- Video/photo work
- 3D/CAD/rendering
- Coding/AI/heavy multitasking

Complete Gaming Setup:
- Casual gaming
- Competitive gaming
- High-end gaming/streaming

## 6. Component flow

Recommended generic order:

1. CPU
2. Graphics
3. Motherboard
4. Memory
5. Storage
6. Power
7. Cooling
8. Cabinet
9. Optional monitor
10. Keyboard + mouse
11. Headset
12. Accessories only when useful

Do not force irrelevant steps. For example, a monitor/keyboard/mouse/headset step belongs primarily to Complete Gaming Setup. For Gaming PC, keep peripherals optional.

## 7. Three-card rule

Every selection step presents exactly three cards where possible:

- One value option
- One recommended option
- One performance option

If a category does not have three valid options after filtering, show only the valid number. Never show incompatible items just to reach three.

Every card can have:
- product image
- plain-English name
- one-line benefit
- key visible specs
- price hidden during configuration
- `Recommended` badge on the recommended card

## 8. Recommendation behavior

Recommendation path:

User answers simple goals -> system selects a recommended set of compatible components.

The user can then:
- Accept recommendation and continue
- Customize component-by-component

When customizing:
- Keep recommendation card visible.
- Label alternatives as `More affordable`, `More performance`, or equivalent customer language.
- Do not use jargon in the main decision copy.

## 9. Back behavior

Back must:
- return to previous step;
- preserve current choices;
- allow editing;
- re-filter later steps when an upstream selection changes.

If an upstream change makes a later selection invalid:
- keep the changed upstream choice;
- clear only invalid dependent selections;
- show a friendly message such as `We updated a few choices to keep your build compatible.`
- never show a technical error.

## 10. Final step - Your custom setup

Heading:

**Your setup is ready**

Show:
- build type
- user goal
- each selected component
- concise plain-English reason for each key choice
- final estimated total
- any note such as `Final price may change based on current stock and supplier pricing.`

Primary CTA:

**Request this build**

Secondary action:

**Edit build**

Do not expose technical validation details unless the user opens a component detail.

## 11. Request form

Required:
- Full name
- Mobile/WhatsApp number
- Email
- City

Recommended optional:
- Preferred contact method
- Budget note
- Additional requirements

Show a read-only summary of the selected configuration directly above the submit button.

Consent checkbox if required by the site's privacy policy.

Submit CTA:

**Send my build request**

On submit:
1. validate form;
2. create normalized request payload;
3. submit to backend/database endpoint;
4. optionally open WhatsApp with the generated sales message;
5. show success state;
6. preserve an immutable copy of the submitted configuration client-side only for confirmation, not as the source of truth.

## 12. Success state

Heading:

**Request received**

Copy:

**We have your build details. Our team can review the configuration, confirm current availability/pricing, and contact you using the details you provided.**

Buttons:
- Back to store
- View my build summary
