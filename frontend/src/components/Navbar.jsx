import React from 'react';
import { Cpu, UserCheck, LogIn, ShieldAlert, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, dbConnected }) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => setActiveTab('overview')}
        >
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            padding: '0.45rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Cpu size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              AURA TRADE <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>AI AGENT</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ETH-USDC • Lighter Protocol
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'process' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => setActiveTab('process')}
              >
                How It Works
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'tech' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => setActiveTab('tech')}
              >
                Tech & Architecture
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'tryout' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: 600 }}
                onClick={() => setActiveTab('tryout')}
              >
                ⚡ Live Tryout
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none' }}
                onClick={() => setActiveTab('pricing')}
              >
                Pricing
              </button>
            </li>
          </ul>
        </nav>

        {/* User Account / Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* DB Indicator */}
          <div 
            title={dbConnected ? 'MongoDB Connected' : 'Database Resilient Fallback Active'}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.75rem', 
              color: dbConnected ? '#34d399' : '#fbbf24',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.3rem 0.6rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)'
            }}
          >
            <span style={{ 
              width: '7px', 
              height: '7px', 
              borderRadius: '50%', 
              backgroundColor: dbConnected ? '#10b981' : '#f59e0b',
              display: 'inline-block' 
            }} />
            {dbConnected ? 'MongoDB Online' : 'DB Safe Mode'}
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', textTransform: 'capitalize' }}>
                  {user.plan} Tier • ${(user.balanceUsdc || 10000).toLocaleString()}
                </div>
              </div>
              <button 
                onClick={onLogout} 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <LogIn size={15} /> Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
