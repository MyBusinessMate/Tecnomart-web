# The TecnoMart Spin & Win Ecosystem: Complete Story & System Architecture

Welcome to the official chronicle and guide for the **TecnoMart Spin & Win Reward Machine**. This document breaks down the entire system in a narrative, story-driven format—explaining exactly what customers experience, how store personnel redeem prizes, what administrators can control, and the strict rules governing the platform.

---

## Act I: The Customer’s Journey (A Story of Discovery)

### 1. The Spark of Curiosity
Imagine **Ananya**, a tech enthusiast in Hyderabad, looking for a new gaming laptop or servicing her iPhone. While browsing the TecnoMart store or visiting the website on her mobile phone, she sees an electric gold banner:
> **"GET A LUCKY CHANCE TO WIN GADGETS, HEADPHONES & MEGA DISCOUNTS!"**

Tapping the **Spin** button transports her into the dedicated showroom experience at `/spin`. The interface is sleek, clean, and distraction-free: no cluttered app docks or intrusive menus—just a radiant, ambient golden glow and a precision-engineered 8-segment prize wheel.

The wheel features genuine tech prizes:
1. **Ultra-Durable Data Cable** (₹299 value)
2. **Noise-Isolating Wireless Headphones** (₹1,499 value)
3. **Shockproof Phone Covers** (₹399 value)
4. **₹500 In-Store Discount Voucher**
5. **₹1,500 Gadget Voucher**
6. **₹2,000 Mega Tech Discount**
7. **High-Clarity Wired Bass Headphones** (₹699 value)
8. **Magnetic Sports Neck Band** (₹999 value)

### 2. The Spin & Anticipation
At the center of the wheel rests an obsidian and gold button: **"SPIN • 100% WIN"**.

Ananya taps the center hub. A crisp acoustic tick echoes as the wheel accelerates rapidly into a dynamic blur. The physics engine applies an authentic deceleration curve—ticking past each boundary peg before slowing down with cinematic suspense. 

The pointer comes to a halt at the top segment: **₹2,000 COUPON**!

### 3. The Victory Reveal
Instantly, gold and white confetti cascades across her screen. The victory card rises with a warm congratulatory chime:
> **"CONGRATULATIONS! YOU WON AN EXCLUSIVE REWARD: ₹2,000 COUPON"**
> *Prize Secured • Valid for 30 Days at TecnoMart Tolichowki.*

Ananya taps **"CLAIM REWARD"** to lock in her prize.

### 4. Giving Back: The Feedback & Review Step
To maintain authenticity and mutual trust, TecnoMart asks Ananya to share her genuine experience:
- She enters her name: *Ananya Rao*
- She enters her mobile number: *+91 94921 58302*
- She writes a brief 2-sentence note about what she loves about TecnoMart (minimum 30 characters required).
- The form intelligently detects and rejects dummy sequential numbers (like `1234567890` or `9876543210`).

When she taps **"COPY REVIEW & OPEN GOOGLE"**:
1. Her review is silently copied to her clipboard.
2. A new tab opens directly to **TecnoMart's official Google Reviews page** (7 Tombs Road, Opposite Fortune Toyota Service, Tolichowki).
3. All she has to do is paste her review and tap Post on Google!

### 5. Proof & Instant Verification
Ananya takes a quick screenshot of her posted review on Google Maps and returns to the TecnoMart tab. She taps **"UPLOAD SCREENSHOT"** and selects the image. 

The engine verifies the receipt, stamps her session as verified, and presents a celebration checkmark: **"✓ REVIEW CONFIRMED — GENERATING DIGITAL PASS..."**

### 6. The Official Digital Credential Pass
Her official **Techno Mart Pass** materializes:
- **Interactive 2.5D Spring Tilt**: On desktop, the card subtly tilts with mouse movement like a holographic VIP credential.
- **Unique Claim Credential**: A generated tamper-proof code (e.g., `TM-TJC9-MN8F`) with a one-tap copy button.
- **Dynamic Scannable QR Code**: Generated on the spot, linking directly to verification.
- **Countdown Clock**: A live 30-day countdown timer showing the exact remaining time before expiry.
- **Store Location & Call Buttons**: One-tap directions to 7 Tombs Road, Tolichowki, and direct call support (`+91 90106 67726`).
- **Print / Save Pass**: A dedicated button allowing her to print or PDF-save her voucher.

---

## Act II: The In-Store Experience (At the Tolichowki Counter)

### What Happens When the Customer Arrives at the Store?
A few days later, Ananya visits the TecnoMart flagship store in Tolichowki:
1. She chooses an accessory or brings in her gadget for repair.
2. At checkout, she opens her phone and displays her **Techno Mart Pass**.
3. The store executive scans the QR code or types the `TM-XXXX-XXXX` credential into the billing terminal.
4. The system validates:
   - That the coupon is within the active 30-day window.
   - That the phone number on the invoice matches the voucher's bound mobile number.
   - That the voucher hasn't been redeemed previously.
5. The ₹2,000 discount is deducted immediately from her bill, or her won accessory (e.g. Wireless Headphones) is handed to her in brand-new sealed packaging.

---

## Act III: What the Customer Can & Cannot See

### What the Customer Can See:
- **Fair, Transparent Wheel**: All 8 prizes are clearly visible with high-resolution product photography and values.
- **Real-Time Validation**: Live feedback on character limits (e.g., `102/30 min`), mobile number format checks, and instant upload previews.
- **Persistent Pass Recovery**: If Ananya closes her browser, restarts her phone, or revisits `/spin` next week, the system recognizes her device signature and **immediately loads her earned Digital Pass**. She never loses her voucher.
- **Clear Store Information**: Store timings, address, phone number, and terms of redemption.

### What the Customer CANNOT Do (Anti-Abuse Protections):
- **Cannot Spin Multiple Times**: Once a device has spun, the wheel is locked. Tapping reload or clearing standard session cookies does not grant another spin due to hardware & canvas fingerprinting.
- **Cannot Submit Fake Phone Numbers**: The validator blocks repeated digits (`9999999999`), sequential patterns (`9876543210`), and invalid area codes.
- **Cannot Skip the Review Requirement**: The claim credential is only unlocked after the verification step is satisfied.
- **Cannot Use an Expired Pass**: The countdown timer strictly enforces the 30-day limit from the exact moment of issuance.

---

## Act IV: Administrator & Super Mode Capabilities

Administrators and store staff have a dedicated **Super Mode** accessible at `/supertechie` or by appending `?super=true` to any spin route.

### What Administrators CAN Do:

1. **Bypass Single-Device Lockouts**:
   - In Super Mode, admins can spin infinitely to demo the machine to VIP clients, record marketing videos, or test prizes.
2. **Instant Stage Jumping**:
   - The top admin bar features a direct stage switcher:
     - `[ Wheel ]`: View the live spinning wheel.
     - `[ Winner ]`: Jump directly to the prize reveal celebration with fallback demo prizes.
     - `[ Review ]`: Inspect the customer feedback and phone validation step.
     - `[ Verify ]`: View the screenshot upload screen.
     - `[ Pass ]`: Immediately inspect the generated Digital Pass and QR code without needing to perform a full spin.
3. **One-Click Admin Test Bypass**:
   - On the verification screen, Super Mode exposes an instant **"⚡ ADMIN TEST: ONE-CLICK BYPASS & UNLOCK"** button, allowing staff to bypass screenshot selection during quick test runs.
4. **Instant Session Reset**:
   - Admins can tap `[ RESET ]` to wipe all test localStorage keys, device hashes, and cached reviews in a single click to simulate a clean first-time customer.
5. **Adjust Prize Inventories & Probabilities**:
   - In the underlying prize catalog (`src/components/spin/prizes.ts`), store managers can adjust the relative probability weights (e.g., higher probability for vouchers during sale weekends) and individual stock counts.

### What Administrators CANNOT Do (Integrity Safeguards):

1. **Cannot Alter an Issued QR Code After Creation**:
   - Once a voucher code and QR hash are generated for a customer, the voucher data is client-signed with the customer's phone number and issue timestamp.
2. **Cannot Rig the Wheel to Fake Segments**:
   - The wheel’s math and physics are strictly bound to the 8 defined segments. The landed prize always matches the pointer’s resting point at 12 o'clock with zero discrepancy.
3. **Cannot Break Customer Privacy**:
   - Customer phone numbers and feedback submitted during the spin flow remain localized to the encrypted session and direct Google Maps post, without selling or exporting customer data to third-party ad brokers.

---

## Summary Matrix

| Capability | Regular Customer | Store Staff / Cashier | Super Admin (`/supertechie`) |
| :--- | :---: | :---: | :---: |
| **Spin the Wheel** | Exactly 1 time per device | Verification mode | Unlimited spins |
| **Prizes Offered** | 100% Guaranteed Win (8 items) | Inspect verified pass | Inspect all 8 prize variations |
| **Review Submission** | 30+ chars + Indian mobile | Verify on invoice | Skip/Bypass for testing |
| **Voucher Pass** | Stored securely on device | Scanned & Redeemed | Test render & export QR |
| **Stage Switcher** | Sequential only (1 → 5) | N/A | Jump directly to any stage |
| **Session Reset** | Locked upon spin | N/A | Instant one-click wipe |

---

*This document serves as the operational manual for the TecnoMart Spin & Win Reward Platform.*
