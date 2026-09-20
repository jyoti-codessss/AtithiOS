# AtithiOS (अतिथि देवो भव:)
### Decentralized Trust & Fair Hospitality Protocol for Indian Homestays

[![Vite](https://img.shields.io/badge/Built%20With-Vite%20%2B%20React-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-0E3B36?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Protocol-v1.0%20Active-2F9E6E?style=flat-square)](https://github.com/jyoti-codessss/AtithiOS)
[![Design](https://img.shields.io/badge/Design%20System-Deep%20Teal%20%26%20Warm%20Gold-D9A441?style=flat-square)](design.md)

> **"Atithi Devo Bhava" (अतिथि देवो भव:)** — *The Guest is Sacred.*  
> AtithiOS is an open, decentralized verification and fair booking infrastructure designed to disintermediate monopolistic Online Travel Agencies (OTAs), eliminate ghost listings, and redirect wealth back to Indian homestay hosts and conscious travelers.

---

## 🇮🇳 The Problem

1. **Exorbitant OTA Commissions (20–40%)**: Commercial aggregators extract massive cuts from small, family-run homestays while inflating final tariffs for travelers.
2. **Ghost Listings & Trust Deficit**: Travelers have no verifiable proof of host identity, fire safety, water sanitation, or authentic local ownership.
3. **Severe Registration Bottleneck**: Out of hundreds of thousands of homestays across India, **only 4,925 homestays** were officially registered nationwide on the national portal (NIDHI/Ministry of Tourism benchmark), held back by bureaucratic red tape and disjointed state-level compliance.

---

## 🛡️ The Solution: AtithiOS Architecture

AtithiOS provides a lightweight, open-standard trust layer operating on a **flat 5–8% protocol sustainability fee**, ensuring **94% of booking revenue stays in the host's pocket**.

```
   ┌────────────────────────────────────────────────────────┐
   │                   Traveler Client                      │
   │  (Discover • Price Comparison • Dynamic Pass • AI)     │
   └──────────────────────────┬─────────────────────────────┘
                              │
                    AtithiOS Open Protocol
                              │
   ┌──────────────────────────┴─────────────────────────────┐
   │                     Host Portal                        │
   │  (4-Step Compliance • 94% Payouts • Certified Badges)  │
   └────────────────────────────────────────────────────────┘
```

---

## ✨ Core Modules & Capabilities

### 1. Discover & Fair Booking (`TravelerModule`)
- **8 Pre-Seeded Indian Heritage & Boutique Stays**: Covering Himachal (Manali, Naggar), Uttarakhand (Rishikesh, Mukteshwar), Karnataka (Coorg), Goa (Palolem), and Rajasthan (Udaipur).
- **Two-Line Transparent Price Comparison Badges**: Instantly exposes how much OTA middlemen inflate prices (e.g., AtithiOS ₹1,850/night vs OTA ₹2,499/night).
- **Interactive Stay Details Modal**: Full compliance pass checklist, sustainability score, host credentials, and amenities.
- **Dynamic Pricing Recalculator**: Real-time recalculation of total cost and host savings based on guest count (Solo, Couple, Family) and duration (1 to 14 nights).
- **Instant Booking Pass**: Issues a confirmed booking ticket with unique reference ID (`ATITHI-XXXXXX`), verified badge, and exact guest name.

### 2. Host Self-Compliance Wizard (`HostModule`)
- **4-Step Guided Onboarding**:
  1. *Host KYC & Title Verification* (Aadhaar / DigiLocker / Land title linkage).
  2. *Safety & Structural Readiness* (Fire extinguishers, first-aid, safe electrical wiring).
  3. *Hygiene & Water Standards* (RO drinking water, clean linen, waste segregation).
  4. *Fair Pricing Guarantee & Badge Issuance*.
- **94% Fair Payout Slider**: Visual comparison proving how AtithiOS pays ₹9,400 per ₹10,000 booking vs ₹7,200 from typical OTAs.
- **Dynamic Registry Update**: Certified hosts are added live to the decentralized listings registry with immediate effect.

### 3. AtithiSahayak AI Support Chatbot (`SupportWidget`)
- **Floating Intelligent Assistant**: Accessible from any screen.
- **Traveler FAQ Guidance**: Explains protocol fees, verification checks, cancellation policies, and payment security.
- **Host Onboarding Mentor**: Answers questions about required state tourism documents and Aadhaar e-KYC.
- **Real-Time Booking Status Lookup**: Enter your reference ID (`ATITHI-XXXXXX`) to inspect confirmed reservation status.

### 4. AI Trip Planner (`PlannerModule`)
- **Interactive Conversational Itinerary Engine**: Recommends personalized itineraries and offbeat local trails for destinations like Manali, Rishikesh, South Goa, and Coorg.
- **Direct Stay Linkage**: Seamlessly connects suggested itineraries to certified AtithiOS homestays.

### 5. Macro Impact Dashboard (`ImpactModule`)
- **Live Ecosystem Metrics**:
  - **1,240** verified homestays onboarded.
  - **₹34,50,000+** extra income redirected to local families.
  - **18.5%** average savings per traveler.
- **Interactive Net Payout Bar Chart**: Clear graphical proof of fair pricing.
- **Circular SVG Sustainability Gauge**: 88/100 community eco-score benchmark.
- **National Problem Framing Card**: Highlighting the urgent need to formalize and empower grassroots tourism.

### 6. My Bookings Pass Wallet (`MyBookingsModule`)
- Centralized pass repository for all confirmed bookings.
- Real-time display of reference numbers, property details, dates, guests, total paid, and total savings.

### 7. Mobile-Native Experience (`MobileBottomNav`)
- Native mobile bottom navigation bar with haptic-inspired feedback and badge counters.
- Smooth bottom-sheet modal animations on mobile viewports (`max-width: 640px`).
- Safe-area insets support and Progressive Web App manifest (`manifest.json`).

---

## 🎨 Design System

AtithiOS is built with a bespoke, culturally resonant design system documented in [`design.md`](design.md):

| Element | Specification | Rationale |
| :--- | :--- | :--- |
| **Primary Color** | `#0E3B36` (Deep Teal) | Dignity, evergreen Indian forests, trusted verification |
| **Accent Color** | `#D9A441` (Warm Gold) | Sacred Indian hospitality (*Atithi Devo Bhava*) |
| **Background** | `#F5F7F3` (Off-white Khadi) | Reduces screen fatigue, feels organic and tactile |
| **Success / Safe**| `#2F9E6E` (Forest Green) | Certified compliance & trust badges |
| **Typography** | *Fraunces* (Serif) + *Inter* (Sans) | Heritage elegance meets high-clarity modern UI |
| **A11y Standard** | Min font size 12px, 42px touch targets | Accessible to all hosts across rural & urban India |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jyoti-codessss/AtithiOS.git
   cd AtithiOS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
AtithiOS/
├── public/
│   └── manifest.json         # PWA configuration
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Desktop header & trust protocol banner
│   │   ├── MobileBottomNav.jsx   # Native mobile 5-tab navigation
│   │   ├── TravelerModule.jsx    # Discover, filters, detail modal & booking pass
│   │   ├── HostModule.jsx        # 4-step compliance wizard & payout slider
│   │   ├── PlannerModule.jsx     # AI conversational itinerary planner
│   │   ├── ImpactModule.jsx      # Macro counters, bar chart & eco-gauge
│   │   ├── MyBookingsModule.jsx  # Confirmed bookings pass wallet
│   │   └── SupportWidget.jsx     # AtithiSahayak AI customer agent
│   ├── context/
│   │   └── AtithiContext.jsx     # Centralized React state management
│   ├── data/
│   │   └── mockData.js           # 8 Indian stays, AI plans & demo metrics
│   ├── App.jsx                   # View orchestration & responsive layout
│   ├── index.css                 # Vanilla CSS design tokens & responsive rules
│   └── main.jsx                  # Entry point
├── architecture.md               # Technical architecture & state flow
├── design.md                     # Color tokens, typography & component specs
├── prd.md                        # Product requirements & problem framing
├── phases.md                     # Phased roadmap & execution log
├── package.json
└── vite.config.js
```

---

## 📜 Guiding Philosophy

> *"अतिथिदेवो भव"*  
> *Taittiriya Upanishad, Shikshavalli, Anuvaka 11*  
> True hospitality is grounded in direct human connection, mutual respect, and fair compensation—not algorithmic exploitation.

---

## 🤝 Contributing & Feedback
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/jyoti-codessss/AtithiOS/issues).

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
