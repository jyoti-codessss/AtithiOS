# Rules — AtithiOS MVP Build

## Must Do
- Build as a single working prototype — fully clickable, no dead buttons or broken links
- Use mock/dummy JSON data for everything — no real backend, no real payment, no real AI API
- Every screen must have at least one visual element (chart, badge, gauge, icon) — no plain text-only screens
- Show the "OTA price vs AtithiOS price" comparison wherever pricing appears — this is the core USP, it must be visible, not buried
- Keep it mobile-responsive — this will be demoed live, possibly on a laptop and a phone
- Follow the color palette and typography in design.md exactly — do not default to generic blue/purple SaaS style

## Must Not Do
- Do not build real authentication, real payments, or real AI model integration
- Do not use localStorage/sessionStorage if this is meant to run inside a sandboxed artifact — use in-memory React state instead
- Do not add features outside the 4 modules in prd.md — no scope creep before the demo
- Do not use stock generic icon packs that look identical to every other hackathon project — keep icons simple and consistent
- Do not leave placeholder Lorem Ipsum text visible in the final version — use realistic Indian tourism context (real-sounding place names, INR pricing)

## Priorities If Time Is Short
1. Traveler discover & book flow (this is what most judges will click first)
2. Host compliance wizard (this is the actual differentiator — do not cut this)
3. Impact dashboard (strong visual, quick to build with dummy charts)
4. AI trip planner (lowest priority — a simple canned-response chat is enough)

## Tone & Content Rules
- All pricing/currency in ₹ (INR)
- Use realistic Indian tourist destinations (Manali, Goa, Rishikesh, Coorg, etc.) in sample data
- Every "Verified Host" badge, checklist item, and price comparison should feel real, not vague
