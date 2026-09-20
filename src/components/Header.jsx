import React from 'react';
import { useAtithi } from '../context/AtithiContext';
import { Compass, ShieldCheck, Sparkles, BarChart3, Ticket, Award } from 'lucide-react';

export default function Header() {
  const { activeTab, setActiveTab, bookings } = useAtithi();

  const tabs = [
    { id: 'discover', label: 'Discover & Book', icon: Compass },
    { id: 'host', label: 'Host Compliance Wizard', icon: ShieldCheck },
    { id: 'planner', label: 'AI Trip Planner', icon: Sparkles },
    { id: 'impact', label: 'Impact Dashboard', icon: BarChart3 },
    { id: 'my-bookings', label: 'My Bookings', icon: Ticket, count: bookings.length }
  ];

  return (
    <>
      {/* Protocol Banner: Reinforcing Core Positioning */}
      <div className="protocol-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="protocol-badge">
            <Award size={12} /> Tourism Trust Protocol
          </span>
          <span>
            Open Verification Infrastructure for Indian Hospitality • <strong>5-8% flat fee</strong> vs 20-40% OTA commissions
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2F9E6E' }}></span>
          <span>Decentralized Registry Active</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-section" onClick={() => setActiveTab('discover')}>
            <div className="brand-logo-seal" title="AtithiOS Protocol Seal">
              अ
            </div>
            <div className="brand-meta">
              <div className="brand-name-row">
                <span className="brand-title">AtithiOS</span>
              </div>
              <span className="brand-tagline">
                Verifying Every Host. Empowering Every Traveler.
              </span>
            </div>
          </div>

          {/* Navigation Tabs including My Bookings */}
          <nav className="nav-tabs" role="tablist" aria-label="Main Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={16} className="tab-icon" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span style={{ 
                      background: isActive ? 'var(--color-accent)' : 'var(--color-primary)', 
                      color: isActive ? '#12201D' : '#FFFFFF', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      padding: '1px 6px', 
                      borderRadius: 'var(--radius-full)',
                      marginLeft: '4px' 
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
