# Memory — AtithiOS Project Decisions

This file is a running log of key decisions. Read this first in every session
before making changes, so decisions already made are not re-litigated or reversed.

## Core Positioning
- AtithiOS is **infrastructure/protocol**, not "another booking app" — this is the
  main differentiator from ~120+ similar submissions in this competition
- The Open API layer is a first-class architectural component, not an afterthought

## Naming
- Product name: **AtithiOS** (chosen over YatraSetu, TrustRail, HostGrid, VeriStay)
- Reasoning: ties to Ministry of Tourism's own "Atithi Devo Bhava" campaign —
  judges recognize the reference; "OS" signals platform/infra, not just an app

## Problem Framing (do not dilute these numbers)
- India: ~0.8 hotel rooms per 1,000 people (vs 10+ US, ~3 China, 4+ Thailand)
- OTA commissions: 20-40% (Treebo exited MakeMyTrip/Goibibo over this)
- Only 4,925 homestays formally registered despite ₹4,722 Cr revenue (2024)
- CCI fined MakeMyTrip-Goibibo & OYO ₹392 Cr combined for price-parity abuse
- ~50 regulatory approvals block hotel/homestay formalization

## USP (must appear clearly in pitch and product)
- 5-8% flat commission vs industry's 20-40%
- Portable "Verified Host" credential — usable across booking channels
- Demand-matching engine — no existing OTA optimizes for this

## Tech Decisions
- **PostgreSQL over MySQL** — chosen for PostGIS geospatial support (demand-matching
  needs location/radius queries) and stronger relational + JSON support for
  trust/verification records
- Node.js + Express for API Gateway (matches reference architecture pattern reviewed)
- AI/ML verification is Python-based OCR + image classification (mocked in MVP —
  no real model needed for the prototype)

## Methodology Honesty Rule
- Do NOT claim "tested with real hosts in one town" — this has NOT happened yet
- Correct framing: prototype tested internally with sample/mock users; real-host
  pilot is a **planned next step**, not a completed one
- This distinction matters for credibility with judges — do not exaggerate stage

## Open Items / Not Yet Decided
- Whether to add a second lightweight DB (e.g. Firebase) for notifications — noted
  as optional polyglot-persistence idea, not committed
- Multi-language/vernacular onboarding — mentioned in roadmap, not in MVP scope
