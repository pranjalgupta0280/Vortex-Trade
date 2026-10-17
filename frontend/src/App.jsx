import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProcessGuide from './components/ProcessGuide';
import TechStackSection from './components/TechStackSection';
import LiveTryout from './components/LiveTryout';
import PricingSection from './components/PricingSection';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { API_BASE } from './config';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  // Check backend health and DB status
  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (res.ok) {
        const data = await res.json();
        setDbConnected(data.database?.connected || false);
      }
    } catch {
      setDbConnected(false);
    }
  };

  // Restore authenticated user
  const restoreUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch {
      // Offline fallback
    }
  };

  useEffect(() => {
    checkHealth();
    restoreUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const handleSelectPlan = async (planId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsAuthOpen(true);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        alert(`Successfully updated plan to ${planId.toUpperCase()}!`);
      }
    } catch (err) {
      console.error('Plan upgrade error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        dbConnected={dbConnected}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'overview' && (
          <>
            <HeroSection
              onStartTryout={() => setActiveTab('tryout')}
              onLearnProcess={() => setActiveTab('process')}
            />
            <ProcessGuide onTryoutClick={() => setActiveTab('tryout')} />
            <TechStackSection />
          </>
        )}

        {activeTab === 'process' && (
          <ProcessGuide onTryoutClick={() => setActiveTab('tryout')} />
        )}

        {activeTab === 'tech' && (
          <TechStackSection />
        )}

        {activeTab === 'tryout' && (
          <LiveTryout user={user} />
        )}

        {activeTab === 'pricing' && (
          <PricingSection
            user={user}
            onSelectPlan={handleSelectPlan}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => setUser(userData)}
      />
    </div>
  );
}
