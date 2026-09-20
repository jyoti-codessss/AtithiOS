# Phases — AtithiOS MVP Build

Build in this exact order. Each phase should be a working checkpoint — don't move
to the next phase until the current one runs without errors.

## Phase 1 — Setup & Shell
- Project scaffold, routing/tab navigation between 4 modules
- Header with logo "AtithiOS" + tagline
- Color palette and typography wired in (see design.md)
- Empty screens for all 4 modules, navigable

## Phase 2 — Traveler: Discover & Book
- Listings grid with mock data (6-8 properties)
- Filter buttons (Budget / Homestay / Verified Only / Eco-Friendly)
- Listing detail view
- Book Now → confirmation screen

## Phase 3 — Host: Compliance Wizard
- 4-step wizard with progress bar
- Self-certification checklist with explainer text
- Pricing step with commission comparison
- Confirmation screen with "Verified Host" badge

## Phase 4 — AI Trip Planner
- Chat UI shell
- Keyword-matching logic for 3-4 sample destinations
- Fallback generic itinerary template for unmatched queries

## Phase 5 — Impact Dashboard
- Earnings comparison chart (OTA vs AtithiOS)
- Sustainability score gauge
- Demo counters (hosts onboarded, income redirected)

## Phase 6 — Polish Pass
- Check every screen has a visual element, not just text
- Check mobile responsiveness
- Remove any placeholder/lorem ipsum content
- Final click-through test: can someone go start-to-finish with no dead ends?

## Explicitly Deferred (mention in pitch, do not build)
- Real backend, real AI model, real payments
- Multi-language support
- Partner API sandbox (describe in pitch as roadmap only)
