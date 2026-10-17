import React from 'react';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Academic Explorer',
    price: '$0',
    frequency: 'forever free',
    badge: 'Open Access',
    description: 'Designed for students, academic researchers, and paper trading observers.',
    features: [
      'Real-time Binance & Lighter ETH-USDC feeds',
      'Standard EMA (9, 21) & MACD momentum calculations',
      'Gemini Flash autonomous signal generation (25 runs/day)',
      'Simulated Lighter Protocol Testnet execution',
      'Local audit log history',
    ],
    buttonText: 'Current Plan',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Quant Trader',
    price: '$29',
    frequency: '/ month',
    badge: 'Most Popular',
    description: 'For active algorithmic traders seeking continuous LLM-driven market reasoning.',
    features: [
      'Everything in Academic Explorer',
      'Unlimited real-time Gemini AI decision evaluations',
      'Full technical indicator suite (EMA, MACD, RSI, Bollinger)',
      'Customizable Pre-Execution Risk Guard constraints',
      'Persistent MongoDB Atlas audit trail with permanent storage',
      'Direct Lighter Protocol Testnet automated signing',
    ],
    buttonText: 'Upgrade to Quant Pro',
    popular: true,
  },
  {
    id: 'institutional',
    name: 'Autonomous Fund',
    price: '$99',
    frequency: '/ month',
    badge: 'Enterprise',
    description: 'Full autonomous trading pipeline for multi-asset institutional deployment.',
    features: [
      'Everything in Quant Trader',
      'Multi-currency support (ETH-USDC, BTC-USDC, SOL-USDC)',
      'Sub-second low-latency WebSocket order dispatch',
      'Institutional compliance & audit export (CSV, JSON, PDF)',
      'Dedicated private Lighter RPC endpoint connection',
      'Multi-user team permissions & portfolio access',
    ],
    buttonText: 'Deploy Institutional',
    popular: false,
  },
];

export default function PricingSection({ user, onSelectPlan, onOpenAuth }) {
  return (
    <section style={{ padding: '3.5rem 0 4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            Transparent Plans
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Predictable Pricing for Autonomous Intelligence
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Choose the plan that suits your research, quantitative experimentation, or autonomous fund operations.
          </p>
        </div>

        {/* Plan Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}>
          {plans.map((plan) => {
            const isCurrent = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: plan.popular ? '2px solid #3b82f6' : '1px solid var(--border-color)',
                  position: 'relative',
                  background: plan.popular 
                    ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                    : 'var(--bg-card)',
                  boxShadow: plan.popular ? '0 10px 30px rgba(59, 130, 246, 0.15)' : 'none'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    color: '#ffffff',
                    padding: '0.2rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{plan.name}</h3>
                    <span className="badge badge-cyan">{plan.badge}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '38px' }}>
                    {plan.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.75rem' }}>
                    <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{plan.frequency}</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Included Features:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {plan.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
                          <Check size={16} color="#34d399" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      if (!user) onOpenAuth();
                      else onSelectPlan(plan.id);
                    }}
                    className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', padding: '0.8rem' }}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Current Active Tier' : user ? plan.buttonText : 'Sign In to Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
