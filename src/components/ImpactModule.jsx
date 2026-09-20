import React from 'react';
import { useAtithi } from '../context/AtithiContext';
import { 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Percent, 
  Leaf, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  BarChart3,
  Award,
  ArrowUpRight
} from 'lucide-react';

export default function ImpactModule() {
  const { metrics } = useAtithi();

  // Sustainability gauge calculation (88 / 100)
  const score = 88;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="impact-module">
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: '26px', color: 'var(--color-primary)', marginBottom: '4px' }}>
              Impact & Trust Protocol Dashboard
            </h1>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Transforming informal hospitality into recognized, safe, and fair tourism infrastructure across India.
            </p>
          </div>
          <span className="protocol-badge">
            <Award size={14} /> Real-Time Protocol Economics
          </span>
        </div>
      </div>

      {/* Row 1: Macro Demo Counters (Using distinct fictional numbers as requested by user) */}
      <div className="counters-row">
        {/* Counter 1 */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Verified Hosts Onboarded
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {metrics.hostsOnboarded.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
            <ArrowUpRight size={14} />
            <span>+14.2% month-over-month</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
            Decentralized KYC & Safety verified
          </div>
        </div>

        {/* Counter 2 */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Income Redirected to Hosts
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)' }}>
              <IndianRupee size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            ₹{(metrics.incomeRedirectedINR / 100000).toFixed(2)} Lakhs
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
            <ArrowUpRight size={14} />
            <span>Saved from 28% OTA commission cuts</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
            Direct into host family bank accounts
          </div>
        </div>

        {/* Counter 3 */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Avg Traveler Savings
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c6310' }}>
              <Percent size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            {metrics.avgSavingsPercent}%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
            <span>Zero price-parity markup</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
            Avg ₹680 saved per booked room night
          </div>
        </div>

        {/* Counter 4 */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Protocol Take Rate
            </span>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-primary-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Scale size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
            6.0%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
            <span>vs 20%-40% charged by OTAs</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
            Only covers decentralized verification & registry
          </div>
        </div>
      </div>

      {/* Row 2: 3-Panel Main Analytics Grid */}
      <div className="dashboard-grid">
        {/* Panel 1: Bar Comparison Chart (Host Payouts on ₹10,000 Booking) */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', color: 'var(--color-primary)' }}>
                Host Net Payout Comparison
              </h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>
                Net earnings retained by host on a standard ₹10,000 booking
              </p>
            </div>
            <BarChart3 size={20} color="var(--color-primary)" />
          </div>

          {/* Bar Chart Visualizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', margin: '22px 0' }}>
            {/* Traditional OTA Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Commercial OTA (28% Aggregator Cut)</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>₹7,200</span>
              </div>
              <div style={{ height: '34px', background: 'var(--color-border-subtle)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '72%', background: '#7e8a87', display: 'flex', alignItems: 'center', paddingLeft: '12px', color: '#ffffff', fontSize: '12px', fontWeight: 600 }}>
                  Host Net: ₹7,200 (72%)
                </div>
                <div style={{ width: '28%', background: 'var(--color-danger)', opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '12px', fontWeight: 600 }}>
                  OTA: ₹2,800
                </div>
              </div>
            </div>

            {/* AtithiOS Protocol Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>AtithiOS Trust Protocol (6% Maintenance Fee)</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹9,400</span>
              </div>
              <div style={{ height: '34px', background: 'var(--color-border-subtle)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '94%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', paddingLeft: '12px', color: '#ffffff', fontSize: '12px', fontWeight: 600 }}>
                  Host Net: ₹9,400 (94%)
                </div>
                <div style={{ width: '6%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#12201D', fontSize: '12px', fontWeight: 800 }}>
                  6%
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--color-primary-surface)', borderRadius: 'var(--radius-sm)', padding: '14px', fontSize: '13px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={18} color="var(--color-primary)" />
            <span>
              <strong>+₹2,200 (+30.5%)</strong> higher net payout kept directly by local homestay hosts on every ₹10,000 of bookings.
            </span>
          </div>
        </div>

        {/* Panel 2: Sustainability Score Gauge */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '18px', color: 'var(--color-primary)' }}>
                Sample Property Sustainability Gauge
              </h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>
                Ecological & community impact index (Devdar Pine Heritage)
              </p>
            </div>
            <Leaf size={20} color="var(--color-success)" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', margin: '16px 0' }}>
            {/* SVG Circular Gauge */}
            <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="#e2e5de"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="var(--color-primary)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
                  {score}
                </div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  out of 100
                </div>
              </div>
            </div>

            {/* Gauge Component Breakdown */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '3px' }}>
                  <span>Local Food & Farm Sourcing</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>95%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--color-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '95%', height: '100%', background: 'var(--color-success)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '3px' }}>
                  <span>Water Harvesting / Spring Protection</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>90%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--color-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '90%', height: '100%', background: 'var(--color-primary)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '3px' }}>
                  <span>Solar Passive Heating & Energy</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>85%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--color-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--color-accent)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '3px' }}>
                  <span>Zero Single-Use Plastic Mandate</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>82%</span>
                </div>
                <div style={{ height: '5px', background: 'var(--color-border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: 'var(--color-success)' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
            Certified under AtithiOS Eco-Responsible Tourism Guidelines in partnership with local community panchayats.
          </div>
        </div>
      </div>

      {/* Row 3: Real National Problem Framing (Strictly keeping 4,925 stat here as instructed) */}
      <div className="card" style={{ padding: '24px', marginTop: '22px', background: '#f8f9f6', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <AlertTriangle size={20} color="var(--color-accent)" />
          <h3 style={{ fontSize: '17px', color: 'var(--color-primary)' }}>
            Why AtithiOS Protocol is Urgently Needed: The National Supply Gap
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-danger)', fontFamily: 'var(--font-heading)' }}>
              ~0.8
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
              Rooms per 1,000 People
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '5px', lineHeight: 1.4 }}>
              India vs 10+ in US, ~3 in China, 4+ in Thailand. Massive informal supply exists but remains locked.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-danger)', fontFamily: 'var(--font-heading)' }}>
              4,925
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
              Formally Registered Homestays
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '5px', lineHeight: 1.4 }}>
              In the entire nation of India, despite a ₹4,722 Cr homestay market. 50+ regulatory hurdles block hosts.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-danger)', fontFamily: 'var(--font-heading)' }}>
              20% - 40%
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
              Predatory OTA Commission
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '5px', lineHeight: 1.4 }}>
              Extracted from small operators, forcing independent brands and homestay owners to abandon listing platforms.
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-danger)', fontFamily: 'var(--font-heading)' }}>
              ₹392 Cr
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
              CCI Antitrust Penalty
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '5px', lineHeight: 1.4 }}>
              Imposed on MakeMyTrip-Goibibo & OYO for anti-competitive price parity and exclusivity enforcement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
