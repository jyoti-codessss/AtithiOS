# Architecture — AtithiOS

## MVP Build Note
This is a **frontend-only prototype**. No real backend is required. Use in-memory
state / mock JSON for all data. Everything below describes the target production
architecture — build the MVP so its structure could later plug into this without
a rewrite.

## System Layers
1. **Client Layer** — Traveler app, Host app (React Native / React.js for MVP: plain
   React or HTML/CSS/JS is fine)
2. **Core Protocol Layer** (real product, mocked in MVP)
   - Verification Engine — AI/ML document + photo checks
   - Booking & Pricing Engine — commission math, availability
   - Demand-Matching Engine — cross-region occupancy matching
3. **Data & Integration Layer** (real product, mocked in MVP)
   - Trust Database — PostgreSQL (host, booking, verification records)
   - Cloud Object Storage — photos/documents
   - Open API — lets partner OTAs/tourism boards consume verified host data

## Tech Stack (target production)
| Layer | Technology |
|---|---|
| Frontend | React Native (mobile), React.js (web/partner dashboard), HTML5/CSS3/JS |
| Backend | Node.js + Express (API Gateway) |
| AI/ML | Python — OCR + image classification for self-certification |
| Database | PostgreSQL (+ PostGIS for location queries) |
| Storage | AWS S3 / Firebase Storage |
| Integration | Google Maps API, Razorpay/UPI, DigiLocker (Govt ID), SMS/WhatsApp API |
| Security | JWT auth, AES-256 encryption, OTP verification, role-based access |

## Mock Data Shape (for MVP)
```json
{
  "listings": [
    { "id": "1", "name": "", "location": "", "price": 0, "otaPrice": 0,
      "verified": true, "ecoScore": 0, "type": "homestay" }
  ],
  "hosts": [
    { "id": "1", "name": "", "step": 1, "checklist": { "fire": false, "hygiene": false, "structural": false } }
  ],
  "bookings": [
    { "id": "1", "listingId": "1", "guest": "", "dates": "", "guests": 0 }
  ]
}
```

## Key Design Decision
The API layer is a first-class citizen, not an afterthought — architecture is
built so external partners (OTAs, tourism boards) could consume verified host
data without needing AtithiOS's own consumer app. This is the core differentiator:
infrastructure, not just an app.
