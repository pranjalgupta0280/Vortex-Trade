import React from 'react';
import { ArrowRight, Sparkles, BookOpen, ShieldCheck, Zap, LineChart } from 'lucide-react';

export default function HeroSection({ onStartTryout, onLearnProcess }) {
  return (
    <section style={{ padding: '3.5rem 0 2rem' }}>
      <div className="container">
        {/* Academic Affiliation Header */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 0.85rem',
          borderRadius: '20px',
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          marginBottom: '1.5rem',
          fontSize: '0.82rem',
          color: '#93c5fd'
        }}>
          <Sparkles size={14} color="#60a5fa" />
          <span>Major Project Synopsis • JSS Academy of Technical Education, Noida • AKTU Lucknow</span>
        </div>

        {/* Main Heading */}
        <div style={{ maxWidth: '850px' }}>
          <h1 style={{
            fontSize: '2.8rem',
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            background: 'linear-gradient(to right, #ffffff, #cbd5e1, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI-Driven Autonomous Trading Agent on Lighter Protocol
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            Conventional trading bots rely on rigid, predefined rules that fail during market shifts. 
            Our autonomous framework unifies <strong>real-time technical analysis (EMA & MACD)</strong>, 
            <strong>Large Language Model reasoning (Gemini Flash)</strong>, and a 
            <strong>pre-execution risk validation guard</strong> with automated order execution on the ETH-USDC market.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <button onClick={onStartTryout} className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 1.6rem' }}>
              Launch Interactive Tryout <ArrowRight size={18} />
            </button>
            <button onClick={onLearnProcess} className="btn btn-secondary" style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}>
              <BookOpen size={18} /> Learn the Step-by-Step Process
            </button>
          </div>
        </div>

        {/* Key Project Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem'
        }}>
          <div className="card">
            <div style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>
              <LineChart size={28} />
            </div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>Multi-Factor Technical Ingestion</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Collects live 1h/5m OHLCV candles from Binance/Lighter, computing dynamic EMA 9/21 crossovers, MACD momentum, and RSI.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#a855f7', marginBottom: '0.75rem' }}>
              <Zap size={28} />
            </div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>LLM Contextual Reasoning</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Replaces static if-else code with Gemini Flash reasoning over market structure, recent trade history, and portfolio state.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#10b981', marginBottom: '0.75rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>Pre-Execution Risk Layer</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Guards against catastrophic loss by strictly checking leverage bounds (≤3x), position allocation limits, and drawdown ceilings.
            </p>
          </div>
        </div>

        {/* Authors Bar */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          background: 'rgba(22, 31, 48, 0.6)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Student Investigators
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Soha Ratnam (2300910100179) • Pranjal Gupta (2300910100135) • Punya Jain (2300910100143)
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Supervision
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#60a5fa', marginTop: '0.2rem' }}>
              Dr. Vimal Gupta, Asst. Professor, CSE Dept
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
