import React from 'react';
import { useAtithi } from '../context/AtithiContext';
import { Compass, ShieldCheck, Sparkles, BarChart3, Ticket } from 'lucide-react';

export default function MobileBottomNav() {
  const { activeTab, setActiveTab, bookings } = useAtithi();

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'host', label: 'Host', icon: ShieldCheck },
    { id: 'planner', label: 'Planner', icon: Sparkles },
    { id: 'impact', label: 'Impact', icon: BarChart3 },
    { id: 'my-bookings', label: 'Bookings', icon: Ticket, count: bookings.length }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Bar">
      <div className="mobile-bottom-nav-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label={tab.label}
              aria-selected={isActive}
              role="tab"
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={18} />
                {isActive && <span className="mobile-nav-indicator" />}
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{ 
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    background: 'var(--color-accent)', 
                    color: '#12201D', 
                    fontSize: '10px', 
                    fontWeight: 800, 
                    padding: '1px 5px', 
                    borderRadius: '10px'
                  }}>
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="mobile-nav-label" style={{ fontSize: '11px' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
