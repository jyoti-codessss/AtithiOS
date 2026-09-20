# Design — AtithiOS

## Brand
- Name: AtithiOS
- Tagline: "Verifying Every Host. Empowering Every Traveler."
- Feel: trustworthy, warm, grounded — not a generic tech-startup blue palette

## Color Palette
| Role | Color | Hex |
|---|---|---|
| Primary (deep teal) | brand, headers, primary buttons | `#0E3B36` |
| Accent (warm gold) | CTAs, highlights, verified badges | `#D9A441` |
| Background | page background | `#F5F7F3` |
| Text primary | body copy | `#12201D` |
| Text secondary | captions, labels | `#5F5E5A` |
| Success/positive | savings, eco-score good | `#2F9E6E` |
| Neutral card border | `#D3D1C7` |

Avoid: generic SaaS blue/purple gradients, cream + terracotta combo (overused),
stock travel-blue (#0077BE) — pick teal + gold instead, it's less common and
still reads as "travel/trust."

## Typography
- Headings: a distinctive serif or rounded display font (e.g. "Fraunces", "Poppins")
- Body: clean sans-serif (e.g. "Inter", "Work Sans")
- Never smaller than 12px for any label

## Component Style
- Rounded cards (8-12px radius), soft shadow, 1px neutral border
- Price comparison shown as a two-line badge: strikethrough OTA price + bold AtithiOS price + "you save ₹X" or "host keeps X% more"
- Verified Host badge: gold circular icon + checkmark, always paired with the word "Verified"
- Progress bar for host wizard: 4 segments, filled in teal as user progresses
- Charts: simple bar/gauge, teal + gold only — no rainbow chart colors

## Screen-Specific Notes
- **Discover & Book**: grid of cards, 2 columns mobile / 3-4 desktop
- **Host Wizard**: single-column centered form, progress bar pinned to top
- **AI Trip Planner**: chat bubbles — user right-aligned (gold), AI left-aligned (teal-tinted background)
- **Impact Dashboard**: 3-panel layout — chart, gauge, counters — all visible without scrolling on desktop
