import React from 'react';
import { AtithiProvider, useAtithi } from './context/AtithiContext';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import TravelerModule from './components/TravelerModule';
import HostModule from './components/HostModule';
import PlannerModule from './components/PlannerModule';
import ImpactModule from './components/ImpactModule';
import MyBookingsModule from './components/MyBookingsModule';
import SupportWidget from './components/SupportWidget';
import { ShieldCheck } from 'lucide-react';

function AppContent() {
  const { activeTab } = useAtithi();

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {activeTab === 'discover' && <TravelerModule />}
        {activeTab === 'host' && <HostModule />}
        {activeTab === 'planner' && <PlannerModule />}
        {activeTab === 'impact' && <ImpactModule />}
        {activeTab === 'my-bookings' && <MyBookingsModule />}
      </main>

      {/* Floating Customer Support AI Agent */}
      <SupportWidget />

      {/* Mobile Native Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
              AtithiOS
            </span>
            <span>• Inspired by the spirit of "Atithi Devo Bhava" (अतिथि देवो भव:)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span>Decentralized Verification Protocol v1.0</span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span>Tested internally with sample & mock hosts</span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: 600 }}>
              <ShieldCheck size={14} color="#0E3B36" /> Open Trust Architecture
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AtithiProvider>
      <AppContent />
    </AtithiProvider>
  );
}
