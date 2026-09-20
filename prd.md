# PRD — AtithiOS

## 1. Product Vision
AtithiOS is a trust and verification layer for India's tourism supply — not another OTA.
It helps informal hosts (homestays, small hotels) get verified and fairly booked, while
giving travelers transparent pricing and access to genuine local stays.

## 2. Problem
- India has ~0.8 hotel rooms per 1,000 people; real supply exists but stays informal
- OTAs charge 20-40% commission; small hosts can't sustain that margin
- ~50 regulatory approvals block formalization; only 4,925 homestays are formally registered
- CCI fined MakeMyTrip-Goibibo & OYO ₹392 Cr for price-parity practices

## 3. Target Users
- **Host** — small hotel owner / homestay owner, low-to-medium digital literacy, wants more
  income and an easy path to legitimacy
- **Traveler** — budget-conscious or experience-seeking tourist who wants transparent pricing
  and genuine local stays
- **Partner (future)** — regional OTA / state tourism board consuming the trust layer via API

## 4. MVP Scope (4 core modules — build all 4, keep each simple)

### Module 1: Traveler — Discover & Book
- Browse listings (mock data, 6-8 sample properties)
- Each card shows: photo placeholder, name, location, price, and a
  "OTA price vs AtithiOS price" comparison badge
- Filters: Budget / Homestay / Verified Only / Eco-Friendly
- Listing detail → Book Now → simple confirmation screen (no real payment)

### Module 2: Host — Compliance & Onboarding Wizard
- Step 1: Basic info (name, location, rooms, photo upload placeholder)
- Step 2: Self-certification checklist (fire safety, hygiene, structural safety —
  checkboxes with one-line explainer each)
- Step 3: Pricing (host sets price; show "you keep 92-95%" vs OTA comparison)
- Step 4: Confirmation — "Verified Host" badge issued, listing goes live

### Module 3: AI Trip Planner
- Simple chat UI
- Keyword-matched canned itinerary responses (no real AI API required for MVP)
- Recommends a mix of popular + offbeat spots, plus a suggested AtithiOS-listed stay

### Module 4: Impact Dashboard
- Bar comparison: host earnings via OTA vs via AtithiOS (dummy numbers)
- Sustainability score gauge for a sample property
- Counters: hosts onboarded, extra income redirected to hosts (demo numbers)

## 5. Success Metrics (for pitch, not live product)
- All 4 modules clickable end-to-end with no dead links
- Price comparison and commission math clearly visible on every relevant screen
- Demo completes in under 90 seconds

## 6. Out of Scope for MVP
- Real payments, real AI model, real backend/auth, real map data
- Multi-language support (mention as future roadmap only)
