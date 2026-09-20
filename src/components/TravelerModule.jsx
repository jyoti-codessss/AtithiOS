import React, { useState } from 'react';
import { useAtithi } from '../context/AtithiContext';
import { 
  CheckCircle2, 
  Leaf, 
  MapPin, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sparkles, 
  Calendar, 
  Users, 
  Info, 
  X, 
  Check, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function TravelerModule() {
  const { 
    listings, 
    selectedListing, 
    setSelectedListing, 
    bookingListing, 
    setBookingListing, 
    completedBooking, 
    setCompletedBooking, 
    createBooking,
    setActiveTab
  } = useAtithi();

  const [activeFilter, setActiveFilter] = useState('all'); // all, budget, homestay, verified, eco
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [nightsCount, setNightsCount] = useState(2);
  const [checkInDate, setCheckInDate] = useState('Oct 12, 2026');

  // Filter logic
  const filteredListings = listings.filter((item) => {
    if (activeFilter === 'budget') return item.price <= 1800;
    if (activeFilter === 'homestay') return item.type === 'homestay';
    if (activeFilter === 'verified') return item.verified === true;
    if (activeFilter === 'eco') return item.ecoScore >= 90;
    return true;
  });

  const handleStartBooking = (listing, e) => {
    if (e) e.stopPropagation();
    setBookingListing(listing);
    setSelectedListing(null);
  };

  // Helper to dynamically calculate rates based on guests & nights
  const calculatePricing = (listing, guests, nights) => {
    if (!listing) return { nightlyAtithi: 0, nightlyOta: 0, totalAtithi: 0, totalOta: 0, totalSaved: 0, occupancyLabel: '' };

    let nightlyAtithi = listing.price;
    let nightlyOta = listing.otaPrice;
    let occupancyLabel = '2 Guests (Couple / Pair) • Standard Double Room';

    if (guests === 1) {
      occupancyLabel = '1 Guest (Solo Traveler) • 1 Room';
      nightlyAtithi = listing.price;
      nightlyOta = listing.otaPrice;
    } else if (guests === 2) {
      occupancyLabel = '2 Guests (Couple / Pair) • Standard Double Room';
      nightlyAtithi = listing.price;
      nightlyOta = listing.otaPrice;
    } else if (guests === 3) {
      occupancyLabel = '3 Guests (Small Group) • 1 Room + Extra Mattress/Bed (+₹500/night)';
      nightlyAtithi = listing.price + 500;
      nightlyOta = listing.otaPrice + 750;
    } else if (guests === 4) {
      occupancyLabel = '4 Guests (Family) • 2 Adjoining Rooms / Family Suite (1.8x Base)';
      nightlyAtithi = Math.round(listing.price * 1.8);
      nightlyOta = Math.round(listing.otaPrice * 1.8);
    }

    const totalAtithi = nightlyAtithi * nights;
    const totalOta = nightlyOta * nights;
    const totalSaved = totalOta - totalAtithi;

    return {
      nightlyAtithi,
      nightlyOta,
      totalAtithi,
      totalOta,
      totalSaved,
      occupancyLabel
    };
  };

  const pricingDetails = bookingListing 
    ? calculatePricing(bookingListing, guestsCount, nightsCount) 
    : { nightlyAtithi: 0, nightlyOta: 0, totalAtithi: 0, totalOta: 0, totalSaved: 0, occupancyLabel: '' };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingListing) return;

    createBooking(bookingListing, {
      guestName: guestName.trim() || 'Guest',
      guests: guestsCount,
      nights: nightsCount,
      guestLabel: pricingDetails.occupancyLabel,
      dates: `${checkInDate} (${nightsCount} ${nightsCount === 1 ? 'Night' : 'Nights'})`,
      totalPaid: pricingDetails.totalAtithi,
      totalSaved: pricingDetails.totalSaved
    });
  };

  return (
    <div className="traveler-module">
      {/* Module Title & Value Proposition */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>
              Discover Verified Local Stays
            </h1>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Book authentic Indian homestays & boutique stays directly via AtithiOS Open Protocol. Zero price-parity inflation, 100% verified safety.
            </p>
          </div>
          <div style={{ 
            background: 'var(--color-primary-surface)', 
            border: '1px solid rgba(14, 59, 54, 0.2)', 
            padding: '10px 16px', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <TrendingDown size={20} color="var(--color-success)" />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Traveler Benefit</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>Avg 18-25% Cheaper than Major OTAs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" role="toolbar" aria-label="Filter Listings">
        <button 
          className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Stays ({listings.length})
        </button>
        <button 
          className={`filter-pill ${activeFilter === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveFilter('budget')}
        >
          <span>Budget Friendly (≤ ₹1,800)</span>
        </button>
        <button 
          className={`filter-pill ${activeFilter === 'homestay' ? 'active' : ''}`}
          onClick={() => setActiveFilter('homestay')}
        >
          <span>Authentic Homestays</span>
        </button>
        <button 
          className={`filter-pill ${activeFilter === 'verified' ? 'active' : ''}`}
          onClick={() => setActiveFilter('verified')}
        >
          <CheckCircle2 size={15} color="var(--color-accent)" />
          <span>Verified Only</span>
        </button>
        <button 
          className={`filter-pill ${activeFilter === 'eco' ? 'active' : ''}`}
          onClick={() => setActiveFilter('eco')}
        >
          <Leaf size={15} color="var(--color-success)" />
          <span>Eco-Friendly (90+ Score)</span>
        </button>
      </div>

      {/* Listings Grid */}
      <div className="listings-grid">
        {filteredListings.map((listing) => {
          const savingsPerNight = listing.otaPrice - listing.price;
          const savingsPct = Math.round((savingsPerNight / listing.otaPrice) * 100);

          return (
            <div 
              key={listing.id} 
              className="listing-card"
              onClick={() => setSelectedListing(listing)}
              style={{ cursor: 'pointer' }}
            >
              {/* Card Image */}
              <div className="listing-card-image-wrap">
                <img 
                  src={listing.image} 
                  alt={listing.name} 
                  className="listing-card-image"
                  loading="lazy"
                />
                
                {/* Badges Overlay */}
                <div className="listing-badge-overlay">
                  {listing.verified && (
                    <span className="verified-host-badge" title="AtithiOS Self-Certification & Physical Check Passed">
                      <span className="verified-icon-circle">✓</span>
                      <span>Verified Host</span>
                    </span>
                  )}
                </div>

                {/* Eco score pill */}
                <div className="eco-score-pill" title={`Eco-Sustainability Score: ${listing.ecoScore}/100`}>
                  <Leaf size={13} />
                  <span>Eco {listing.ecoScore}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="listing-card-body">
                <div>
                  <div className="listing-header-row">
                    <h3 className="listing-title">{listing.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>
                      <Star size={14} fill="#D9A441" color="#D9A441" />
                      <span>{listing.rating}</span>
                      <span className="text-muted" style={{ fontWeight: 400, fontSize: '12px' }}>({listing.reviewsCount})</span>
                    </div>
                  </div>
                  <div className="listing-location">
                    <MapPin size={14} />
                    <span>{listing.location}</span>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '13px', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {listing.description}
                </p>

                {/* Amenities chips */}
                <div className="amenities-row">
                  {listing.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="amenity-chip">{amenity}</span>
                  ))}
                  {listing.amenities.length > 3 && (
                    <span className="amenity-chip">+{listing.amenities.length - 3} more</span>
                  )}
                </div>

                {/* Two-line Price Comparison Badge (Core USP) */}
                <div className="price-comparison-badge">
                  <div className="price-row-top">
                    <span className="text-muted" style={{ fontSize: '12px' }}>Traditional OTA Price:</span>
                    <span className="ota-strike">₹{listing.otaPrice.toLocaleString('en-IN')}/night</span>
                  </div>
                  <div className="price-row-bottom">
                    <div>
                      <span className="atithi-price">₹{listing.price.toLocaleString('en-IN')}</span>
                      <span className="text-muted" style={{ fontSize: '12px', marginLeft: '4px' }}>/night</span>
                    </div>
                    <span className="savings-pill">
                      You save ₹{savingsPerNight.toLocaleString('en-IN')} ({savingsPct}%)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px' }}>
                  <button 
                    className="btn-outline" 
                    style={{ flex: 1, fontSize: '13px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedListing(listing);
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ flex: 1, fontSize: '13px' }}
                    onClick={(e) => handleStartBooking(listing, e)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="modal-backdrop" onClick={() => setSelectedListing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedListing(null)} aria-label="Close details modal">
              <X size={18} />
            </button>

            <img 
              src={selectedListing.image} 
              alt={selectedListing.name}
              style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '18px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="verified-host-badge">
                <span className="verified-icon-circle">✓</span>
                <span>Verified Host • Badge #{selectedListing.hostBadgeNumber}</span>
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                <Star size={15} fill="#D9A441" color="#D9A441" />
                <span>{selectedListing.rating} ({selectedListing.reviewsCount} verified traveler reviews)</span>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{selectedListing.name}</h2>
            <p className="listing-location" style={{ marginBottom: '14px' }}>
              <MapPin size={15} />
              <span>{selectedListing.location}</span>
            </p>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '18px', lineHeight: 1.55 }}>
              {selectedListing.description}
            </p>

            {/* Host Credentials & Safety checklist box */}
            <div style={{ background: 'var(--color-primary-surface)', border: '1px solid rgba(14, 59, 54, 0.18)', borderRadius: 'var(--radius-sm)', padding: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={20} color="var(--color-primary)" />
                <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)' }}>
                  Host Verification Dossier ({selectedListing.hostName})
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedListing.compliancePass.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-primary)' }}>
                    <Check size={15} color="var(--color-success)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Transparency Breakdown */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '16px', marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Zero-Middleman Price Breakdown
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span>Direct Host Payout:</span>
                <span style={{ fontWeight: 600 }}>₹{Math.round(selectedListing.price * 0.94).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>
                <span>AtithiOS Open Protocol Fee (6%):</span>
                <span>₹{Math.round(selectedListing.price * 0.06).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: 'var(--color-danger)', fontStyle: 'italic' }}>
                <span>Equivalent OTA Commission (28% cut):</span>
                <span>~₹{Math.round(selectedListing.otaPrice * 0.28).toLocaleString('en-IN')} (Saved!)</span>
              </div>
              <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600 }}>AtithiOS Direct Price:</span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  ₹{selectedListing.price.toLocaleString('en-IN')}<span style={{ fontSize: '13px', fontWeight: 400 }}> / night</span>
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setSelectedListing(null)}>
                Back to Stays
              </button>
              <button className="btn-primary" style={{ flex: 1.5 }} onClick={() => handleStartBooking(selectedListing)}>
                Book This Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal with Dynamic Guests & Duration Pricing */}
      {bookingListing && (
        <div className="modal-backdrop" onClick={() => setBookingListing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBookingListing(null)} aria-label="Close booking modal">
              <X size={18} />
            </button>

            <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>Confirm Your Stay</h2>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '18px' }}>
              Booking <strong>{bookingListing.name}</strong> in {bookingListing.location}
            </p>

            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="primary-guest-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                  Primary Guest Full Name
                </label>
                <input 
                  id="primary-guest-name"
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  placeholder="Enter guest full name (e.g. Rahul Sharma)"
                  className="form-input"
                />
              </div>

              {/* Dates & Duration + Guests Selection Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                <div>
                  <label htmlFor="booking-duration" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Stay Duration
                  </label>
                  <select 
                    id="booking-duration"
                    value={nightsCount} 
                    onChange={(e) => setNightsCount(Number(e.target.value))}
                    className="form-select"
                  >
                    <option value={1}>1 Night (Weekend Day)</option>
                    <option value={2}>2 Nights (Standard Weekend)</option>
                    <option value={3}>3 Nights (Long Weekend)</option>
                    <option value={4}>4 Nights (Extended Stay)</option>
                    <option value={5}>5 Nights (Workation)</option>
                    <option value={7}>7 Nights (Full Week)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="guests-count-select" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Guests & Occupancy
                  </label>
                  <select 
                    id="guests-count-select"
                    value={guestsCount} 
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="form-select"
                  >
                    <option value={1}>1 Guest (Solo)</option>
                    <option value={2}>2 Guests (Couple / Pair)</option>
                    <option value={3}>3 Guests (Small Group)</option>
                    <option value={4}>4 Guests (Family)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Price Calculation Box: Changes live when Solo / Pair / Group / Family is selected */}
              <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    Occupancy & Rates Breakdown
                  </span>
                  <span className="protocol-badge">
                    {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>

                {/* Selected Occupancy Mode Explanation */}
                <div style={{ 
                  background: 'var(--color-primary-surface)', 
                  padding: '8px 12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '12px', 
                  color: 'var(--color-primary)', 
                  fontWeight: 600,
                  marginBottom: '10px'
                }}>
                  {pricingDetails.occupancyLabel}
                </div>

                {/* Nightly calculation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>
                    {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} × ₹{pricingDetails.nightlyAtithi.toLocaleString('en-IN')}/night:
                  </span>
                  <span style={{ fontWeight: 600 }}>₹{pricingDetails.totalAtithi.toLocaleString('en-IN')}</span>
                </div>

                {/* OTA price equivalent */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  <span>Traditional OTA Equivalent ({nightsCount}N):</span>
                  <span style={{ textDecoration: 'line-through' }}>₹{pricingDetails.totalOta.toLocaleString('en-IN')}</span>
                </div>

                {/* Live savings */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--color-success)', fontWeight: 600 }}>
                  <span>Direct Booking Savings (vs OTA):</span>
                  <span>-₹{pricingDetails.totalSaved.toLocaleString('en-IN')} ({Math.round((pricingDetails.totalSaved / pricingDetails.totalOta) * 100)}% saved)</span>
                </div>

                {/* Total */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>Total Payable to Host:</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{pricingDetails.totalAtithi.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={18} color="var(--color-success)" />
                <span>Zero commission markup guarantee • Direct UPI settlement to host at check-in</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={() => setBookingListing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>
                  Confirm Booking (Instant Pass)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Pass Screen displaying dynamic values */}
      {completedBooking && (
        <div className="modal-backdrop" onClick={() => setCompletedBooking(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <button className="modal-close-btn" onClick={() => setCompletedBooking(null)} aria-label="Close confirmation pass">
              <X size={18} />
            </button>

            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--color-success-light)', 
              color: 'var(--color-success)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px',
              border: '2px solid var(--color-success)'
            }}>
              <CheckCircle2 size={38} />
            </div>

            <span className="verified-host-badge" style={{ marginBottom: '12px' }}>
              <span className="verified-icon-circle">✓</span>
              <span>AtithiOS Verified Booking Pass</span>
            </span>

            <h2 style={{ fontSize: '26px', marginBottom: '6px', color: 'var(--color-primary)' }}>
              Booking Confirmed!
            </h2>
            <p className="text-muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
              Booking Reference: <strong style={{ color: 'var(--color-primary)' }}>{completedBooking.id}</strong>
            </p>

            {/* Pass Ticket Box */}
            <div style={{ 
              border: '2px dashed var(--color-primary)', 
              borderRadius: 'var(--radius-md)', 
              padding: '20px', 
              background: '#fbfcf9', 
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Property</div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-primary)' }}>{completedBooking.listingName}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{completedBooking.location}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Guest & Duration</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{completedBooking.guestName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {completedBooking.nights} {completedBooking.nights === 1 ? 'Night' : 'Nights'} • {completedBooking.guests} {completedBooking.guests === 1 ? 'Guest' : 'Guests'}
                  </div>
                </div>
              </div>

              {/* Occupancy Detail */}
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '14px', background: 'var(--color-primary-surface)', padding: '6px 10px', borderRadius: '4px' }}>
                {completedBooking.guestLabel}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Total Stay Cost</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{completedBooking.totalPaid.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-success)', fontWeight: 600 }}>Saved via AtithiOS</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-success)' }}>
                    +₹{completedBooking.totalSaved.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '22px' }}>
              A confirmation SMS and digital key receipt have been routed to the host. No middleman cancellation penalties apply.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn-outline" 
                style={{ flex: 1 }} 
                onClick={() => {
                  setCompletedBooking(null);
                  setActiveTab('my-bookings');
                }}
              >
                View in My Bookings
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 1.2 }} 
                onClick={() => setCompletedBooking(null)}
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
