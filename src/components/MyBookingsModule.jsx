import React from 'react';
import { useAtithi } from '../context/AtithiContext';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Ticket,
  Clock,
  Compass
} from 'lucide-react';

export default function MyBookingsModule() {
  const { bookings, setActiveTab } = useAtithi();

  return (
    <div className="my-bookings-module">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>
              My Bookings & Digital Passes
            </h1>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              All your verified, zero-middleman stays booked directly through the AtithiOS Open Protocol.
            </p>
          </div>
          <div style={{ 
            background: 'var(--color-primary-surface)', 
            border: '1px solid rgba(14, 59, 54, 0.2)', 
            padding: '8px 16px', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>
              {bookings.length} {bookings.length === 1 ? 'Stay Confirmed' : 'Stays Confirmed'}
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center', maxWidth: '600px', margin: '30px auto' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--color-primary-surface)', 
            color: 'var(--color-primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 16px' 
          }}>
            <Ticket size={32} />
          </div>
          <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '8px' }}>
            No Confirmed Bookings Yet
          </h3>
          <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px' }}>
            Browse authentic local homestays across India and book with zero price parity markups and direct host payout.
          </p>
          <button className="btn-primary" onClick={() => setActiveTab('discover')}>
            <Compass size={16} />
            <span>Discover Verified Stays</span>
          </button>
        </div>
      ) : (
        /* Confirmed Bookings Cards Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {bookings.map((booking) => {
            const propName = booking.propertyName || booking.listingName;
            const refNumber = booking.referenceNumber || booking.id;
            const totalCost = booking.totalCost || booking.totalPaid;
            const savings = booking.savings || booking.totalSaved;

            return (
              <div key={booking.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Top Banner with Image thumbnail and status */}
                <div style={{ position: 'relative', height: '140px', background: 'var(--color-primary)', overflow: 'hidden' }}>
                  {booking.image && (
                    <img 
                      src={booking.image} 
                      alt={propName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14, 59, 54, 0.9) 0%, rgba(14, 59, 54, 0.2) 100%)' }}></div>

                  {/* Confirmed Badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{ 
                      background: 'var(--color-success)', 
                      color: '#FFFFFF', 
                      padding: '4px 10px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}>
                      <CheckCircle2 size={13} />
                      <span>Confirmed</span>
                    </span>
                  </div>

                  {/* Reference Number */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span style={{ 
                      background: 'rgba(255, 255, 255, 0.9)', 
                      color: 'var(--color-primary)', 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 700 
                    }}>
                      #{refNumber}
                    </span>
                  </div>

                  {/* Property Name overlay */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                    <h3 style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.2 }}>
                      {propName}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d8e5e2', fontSize: '12px', marginTop: '2px' }}>
                      <MapPin size={13} />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  {/* Guest & Duration Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--color-bg)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        Primary Guest
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {booking.guestName}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        Stay Duration
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {booking.dates}
                      </div>
                    </div>
                  </div>

                  {/* Occupancy Detail */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-primary)', background: 'var(--color-primary-surface)', padding: '6px 10px', borderRadius: '4px' }}>
                    <Users size={14} color="var(--color-primary)" />
                    <span>{booking.guestLabel || `${booking.guests} Guests`}</span>
                  </div>

                  {/* Price & Savings Breakdown */}
                  <div className="price-comparison-badge" style={{ marginTop: 'auto' }}>
                    <div className="price-row-top">
                      <span className="text-muted" style={{ fontSize: '12px' }}>Total Stay Cost:</span>
                      <span className="savings-pill">
                        Saved ₹{savings.toLocaleString('en-IN')} vs OTA
                      </span>
                    </div>
                    <div className="price-row-bottom">
                      <span className="atithi-price">
                        ₹{totalCost.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        Direct Host Settlement
                      </span>
                    </div>
                  </div>

                  {/* Digital Pass Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> Booked at {booking.bookedAt}
                    </span>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                      Zero Cancellation Fee
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
