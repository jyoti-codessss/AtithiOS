import React, { useState } from 'react';
import { useAtithi } from '../context/AtithiContext';
import { 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Building2, 
  FileCheck, 
  IndianRupee, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Check, 
  TrendingUp,
  Image as ImageIcon,
  Award
} from 'lucide-react';

export default function HostModule() {
  const { addListing, setActiveTab } = useAtithi();
  const [currentStep, setCurrentStep] = useState(1); // 1, 2, 3, 4

  // Form states
  const [propertyName, setPropertyName] = useState('Pine Shadow Heritage Villa');
  const [hostName, setHostName] = useState('Sunil Thakur');
  const [location, setLocation] = useState('Jibhi, Tirthan Valley, Himachal Pradesh');
  const [roomsCount, setRoomsCount] = useState(3);
  const [propertyType, setPropertyType] = useState('homestay');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80');

  // Checklist states
  const [checklist, setChecklist] = useState({
    fire: true,
    hygiene: true,
    structural: true,
    panchayat: true
  });

  // Pricing states
  const [basePrice, setBasePrice] = useState(2200);

  // Issued listing state
  const [createdListing, setCreatedListing] = useState(null);

  const toggleChecklist = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (currentStep === 3) {
      // Create listing
      const newListing = addListing({
        name: propertyName,
        hostName: hostName,
        location: location,
        price: basePrice,
        type: propertyType,
        image: selectedImage
      });
      setCreatedListing(newListing);
      setCurrentStep(4);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Commission calculations
  const otaCutPercent = 28;
  const atithiCutPercent = 6;
  const otaHostTakes = Math.round(basePrice * (1 - otaCutPercent / 100));
  const atithiHostTakes = Math.round(basePrice * (1 - atithiCutPercent / 100));
  const extraEarningsPerBooking = atithiHostTakes - otaHostTakes;
  const extraMonthlyEarnings = extraEarningsPerBooking * 15; // assuming 15 booked nights/month

  return (
    <div className="host-wizard-view">
      <div className="wizard-container">
        {/* Module Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="verified-host-badge" style={{ marginBottom: '8px' }}>
            <span className="verified-icon-circle">✓</span>
            <span>Host Formalization Protocol</span>
          </span>
          <h1 style={{ fontSize: '26px', color: 'var(--color-primary)', marginTop: '4px' }}>
            Host Compliance & Onboarding Wizard
          </h1>
          <p className="text-muted" style={{ fontSize: '14px', maxWidth: '580px', margin: '6px auto 0' }}>
            Join India's decentralized hospitality trust layer in 4 simple steps. Bypass 50+ bureaucratic roadblocks with structured self-certification.
          </p>
        </div>

        {/* 4-Segment Progress Bar (Pinned) */}
        <div className="wizard-progress-bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={4}>
          <div className={`wizard-step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="wizard-step-track">
              <div className="wizard-step-fill" style={{ width: currentStep >= 1 ? '100%' : '0%' }}></div>
            </div>
            <span className="wizard-step-label">1. Basic Info</span>
          </div>

          <div className={`wizard-step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="wizard-step-track">
              <div className="wizard-step-fill" style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
            </div>
            <span className="wizard-step-label">2. Self-Certify</span>
          </div>

          <div className={`wizard-step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="wizard-step-track">
              <div className="wizard-step-fill" style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
            </div>
            <span className="wizard-step-label">3. Fair Pricing</span>
          </div>

          <div className={`wizard-step-indicator ${currentStep >= 4 ? 'active' : ''}`}>
            <div className="wizard-step-track">
              <div className="wizard-step-fill" style={{ width: currentStep >= 4 ? '100%' : '0%' }}></div>
            </div>
            <span className="wizard-step-label">4. Verification</span>
          </div>
        </div>

        {/* Step 1: Basic Property Info */}
        {currentStep === 1 && (
          <div className="card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '6px' }}>Step 1: Tell Us About Your Stay</h2>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '22px' }}>
              Basic details to generate your digital identity on the national tourism registry.
            </p>

            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                <div>
                  <label htmlFor="property-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Stay / Homestay Name
                  </label>
                  <input 
                    id="property-name"
                    type="text" 
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    required
                    placeholder="e.g. Himalayan Pine Cottage"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="host-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Host / Owner Full Name
                  </label>
                  <input 
                    id="host-name"
                    type="text" 
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    required
                    placeholder="e.g. Sunil Thakur"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="property-location" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                  Location (Town, District, State)
                </label>
                <input 
                  id="property-location"
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g. Jibhi, Kullu District, Himachal Pradesh"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label htmlFor="property-category" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Property Category
                  </label>
                  <select 
                    id="property-category"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="form-select"
                  >
                    <option value="homestay">Rural / Local Homestay</option>
                    <option value="hotel">Independent Boutique Hotel</option>
                    <option value="cottage">Eco Cottage / Plantation Stay</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rooms-count" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                    Available Guest Rooms
                  </label>
                  <input 
                    id="rooms-count"
                    type="number" 
                    min="1" 
                    max="20"
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Photo selection placeholder */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>
                  Property Photo Showcase (Verified geo-tagged image placeholder)
                </label>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    style={{ width: '90px', height: '65px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    <div>✓ Geo-tag match verified via camera OCR module (mocked)</div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 600, marginTop: '2px' }}>AI Safety image analysis passed</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn-primary">
                  <span>Continue to Self-Certification</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Self-Certification Checklist */}
        {currentStep === 2 && (
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px' }}>Step 2: Self-Certification Checklist</h2>
              <span className="protocol-badge">Standard Compliance</span>
            </div>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '20px' }}>
              India has ~50 regulatory bottlenecks blocking formal registration. AtithiOS replaces predatory licensing with clear, enforceable safety benchmarks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {/* Checklist 1: Fire Safety */}
              <div 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '14px', 
                  background: checklist.fire ? 'var(--color-primary-surface)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
                onClick={() => toggleChecklist('fire')}
              >
                <input 
                  type="checkbox" 
                  checked={checklist.fire} 
                  onChange={() => toggleChecklist('fire')}
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={16} color="var(--color-danger)" />
                    Fire Extinguisher & Emergency Evacuation Path
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
                    Explainer: Property has functional ABC dry-powder fire extinguishers on each floor and unobstructed stairs.
                  </div>
                </div>
              </div>

              {/* Checklist 2: Hygiene */}
              <div 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '14px', 
                  background: checklist.hygiene ? 'var(--color-primary-surface)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
                onClick={() => toggleChecklist('hygiene')}
              >
                <input 
                  type="checkbox" 
                  checked={checklist.hygiene} 
                  onChange={() => toggleChecklist('hygiene')}
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="var(--color-success)" />
                    Hygiene, Fresh Bedding & Potable Water Standards
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
                    Explainer: Clean sanitized linens per check-in, disinfected washrooms, and tested clean RO or boiled mountain drinking water.
                  </div>
                </div>
              </div>

              {/* Checklist 3: Structural Safety */}
              <div 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '14px', 
                  background: checklist.structural ? 'var(--color-primary-surface)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
                onClick={() => toggleChecklist('structural')}
              >
                <input 
                  type="checkbox" 
                  checked={checklist.structural} 
                  onChange={() => toggleChecklist('structural')}
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={16} color="var(--color-primary)" />
                    Structural Integrity & Electrical Protection
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
                    Explainer: Secure balconies, sturdy railings, and enclosed MCB electrical panels with zero exposed wiring.
                  </div>
                </div>
              </div>

              {/* Checklist 4: Panchayat / Local ID */}
              <div 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '16px', 
                  display: 'flex', 
                  gap: '14px', 
                  background: checklist.panchayat ? 'var(--color-primary-surface)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
                onClick={() => toggleChecklist('panchayat')}
              >
                <input 
                  type="checkbox" 
                  checked={checklist.panchayat} 
                  onChange={() => toggleChecklist('panchayat')}
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileCheck size={16} color="var(--color-accent)" />
                    Local Identity & Gram Panchayat / Municipal Registration
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '3px' }}>
                    Explainer: Host Aadhaar authenticated via DigiLocker and matched to property address.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-outline" onClick={handlePrevStep}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                disabled={!checklist.fire || !checklist.hygiene || !checklist.structural}
                onClick={handleNextStep}
              >
                <span>Save & Set Pricing</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing & Commission Math */}
        {currentStep === 3 && (
          <div className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '20px' }}>Step 3: Fair Pricing & Commission Transparency</h2>
              <span className="protocol-badge">5-8% Flat Protocol Fee</span>
            </div>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '22px' }}>
              Commercial OTAs extract 20% to 40% commissions. On AtithiOS, you set your direct nightly rate and keep 92% to 95% of every single rupee.
            </p>

            {/* Price Slider */}
            <div style={{ background: 'var(--color-bg)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '22px' }}>
              <label htmlFor="pricing-slider" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '10px' }}>
                <span>Your Desired Nightly Room Rate (₹ INR)</span>
                <span style={{ fontSize: '19px', fontWeight: 700 }}>₹{basePrice.toLocaleString('en-IN')}</span>
              </label>
              <input 
                id="pricing-slider"
                type="range" 
                min="800" 
                max="8000" 
                step="100"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer', height: '6px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                <span>₹800 (Budget Stay)</span>
                <span>₹4,000 (Estate)</span>
                <span>₹8,000 (Luxury Heritage)</span>
              </div>
            </div>

            {/* Comparison Grid: OTA vs AtithiOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {/* Traditional OTA Card */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '16px', background: '#faf9f5' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  Traditional Aggregators (OTAs)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px', marginBottom: '12px' }}>
                  28% Average Commission Deducted
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Guest Pays:</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--color-danger)' }}>
                  <span>OTA Commission (-28%):</span>
                  <span>-₹{Math.round(basePrice * 0.28).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>You Keep:</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    ₹{otaHostTakes.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* AtithiOS Card */}
              <div style={{ border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', padding: '16px', background: 'var(--color-primary-surface)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '12px', background: 'var(--color-accent)', color: '#12201D', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                  FAIR MODEL
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  AtithiOS Trust Protocol
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-primary)', opacity: 0.85, marginTop: '2px', marginBottom: '12px' }}>
                  Flat 6% Protocol Maintenance Fee
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Guest Pays:</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', color: 'var(--color-primary)' }}>
                  <span>Protocol Fee (-6%):</span>
                  <span>-₹{Math.round(basePrice * 0.06).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(14, 59, 54, 0.25)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>You Keep (94%):</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{atithiHostTakes.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Extra monthly revenue badge */}
            <div style={{ 
              background: 'var(--color-success-light)', 
              border: '1px solid rgba(47, 158, 110, 0.4)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '14px 18px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px',
              marginBottom: '24px' 
            }}>
              <TrendingUp size={22} color="var(--color-success)" />
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '14px' }}>
                  +₹{extraEarningsPerBooking.toLocaleString('en-IN')} extra in your pocket per booking
                </span>
                <div style={{ fontSize: '12px', color: 'var(--color-primary)', opacity: 0.9, marginTop: '2px' }}>
                  That is ~<strong>₹{extraMonthlyEarnings.toLocaleString('en-IN')}</strong> additional annualizable income redirected to your family homestay every 15 nights!
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-outline" onClick={handlePrevStep}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>
                <span>Issue Verified Badge & Launch</span>
                <CheckCircle2 size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Verification & Live Launch */}
        {currentStep === 4 && createdListing && (
          <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
            <div style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%', 
              background: '#fff9ed', 
              border: '2px solid var(--color-accent)', 
              color: '#8c6310', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px',
              boxShadow: '0 4px 14px rgba(217, 164, 65, 0.25)' 
            }}>
              <Award size={42} />
            </div>

            <span className="verified-host-badge" style={{ marginBottom: '12px' }}>
              <span className="verified-icon-circle">✓</span>
              <span>Verified Host Credential Issued</span>
            </span>

            <h2 style={{ fontSize: '26px', color: 'var(--color-primary)', marginBottom: '8px' }}>
              Congratulations, {hostName}!
            </h2>
            <p className="text-muted" style={{ fontSize: '14px', maxWidth: '520px', margin: '0 auto 22px' }}>
              <strong>{propertyName}</strong> has passed decentralized compliance verification. Your property credential is now active across the AtithiOS network.
            </p>

            {/* Credential Card */}
            <div style={{ 
              maxWidth: '480px', 
              margin: '0 auto 26px', 
              border: '2px solid var(--color-accent)', 
              borderRadius: 'var(--radius-md)', 
              background: '#FFFFFF', 
              padding: '22px', 
              boxShadow: 'var(--shadow-md)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Certificate ID</div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-primary)' }}>{createdListing.hostBadgeNumber}</div>
                </div>
                <span className="protocol-badge">Active Status</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', marginBottom: '14px' }}>
                <div>
                  <span className="text-muted">Stay:</span> <strong>{propertyName}</strong>
                </div>
                <div>
                  <span className="text-muted">Host:</span> <strong>{hostName}</strong>
                </div>
                <div>
                  <span className="text-muted">Location:</span> <strong>{location}</strong>
                </div>
                <div>
                  <span className="text-muted">Base Price:</span> <strong>₹{basePrice.toLocaleString('en-IN')}/night</strong>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={16} color="var(--color-success)" />
                <span>Fire, Hygiene, Structural & KYC Verified • 94% Host Payout Rate</span>
              </div>
            </div>

            {/* Next Action */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button 
                className="btn-accent"
                onClick={() => {
                  setActiveTab('discover');
                }}
              >
                <span>View My Listing Live in Discover Stays</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
