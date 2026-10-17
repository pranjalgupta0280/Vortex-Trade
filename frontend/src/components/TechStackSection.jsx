import React from 'react';
import { Layers, Server, Cpu, Database, Network, ShieldAlert } from 'lucide-react';

const technologies = [
  {
    name: 'Gemini 2.5 Flash / Groq LLM',
    category: 'Contextual AI Reasoning',
    icon: Cpu,
    color: '#a855f7',
    desc: 'Acts as the cognitive decision agent. Evaluates multi-factor market context, indicators, and historical logs to formulate structured actions (LONG, SHORT, CLOSE, HOLD).'
  },
  {
    name: 'Lighter Protocol Testnet',
    category: 'Decentralized Orderbook DEX',
    icon: Network,
    color: '#38bdf8',
    desc: 'Provides low-latency, off-chain matching with on-chain settlement for ETH-USDC perpetuals. Orders are digitally signed and executed in a safe testbed.'
  },
  {
    name: 'Node.js & Express API',
    category: 'Agent Orchestration Engine',
    icon: Server,
    color: '#10b981',
    desc: 'Coordinates the asynchronous loop: continuous polling of OHLCV candles, technical feature calculations, prompting the LLM, and invoking the risk gate.'
  },
  {
    name: 'MongoDB Atlas & Prisma ORM',
    category: 'Persistent Audit Trail',
    icon: Database,
    color: '#f59e0b',
    desc: 'Provides durable cloud storage for agent invocations, full LLM rationales, risk validation logs, user portfolio states, and execution receipts.'
  },
  {
    name: 'Technical Indicator Matrix',
    category: 'Quantitative Mathematical Models',
    icon: Layers,
    color: '#ec4899',
    desc: 'Computes Exponential Moving Averages (EMA 9, 21, 50), Moving Average Convergence Divergence (MACD 12, 26, 9), and Relative Strength Index (RSI 14).'
  },
  {
    name: 'Pre-Execution Risk Guard',
    category: 'Autonomous Capital Protection',
    icon: ShieldAlert,
    color: '#ef4444',
    desc: 'Enforces hardcoded risk constraints: bounds maximum leverage, evaluates maximum drawdown tolerance, and limits position sizing to protect account equity.'
  }
];

export default function TechStackSection() {
  return (
    <section style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            System Architecture & Methodology
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Engineered for Precision, Safety & Speed
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Every component in the AI-driven autonomous agent operates in a closed loop, ensuring complete transparency and deterministic safety.
          </p>
        </div>

        {/* Tech Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {technologies.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      padding: '0.6rem',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: t.color
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: t.color, fontWeight: 700 }}>
                        {t.category}
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        {t.name}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantitative Indicator Formula Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(22, 31, 48, 0.8), rgba(17, 24, 39, 0.9))',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#93c5fd' }}>
            Quantitative Indicator Formulations
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>EMA (Exponential Moving Average)</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                EMA_t = α * P_t + (1 - α) * EMA_{'{t-1}'}
              </div>
              <p>Where α = 2 / (N + 1). Calculates short-term (9-period) and medium-term (21-period) trend indicators on ETH-USDC.</p>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>MACD (Momentum & Convergence)</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#a855f7', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                MACD = EMA(12) - EMA(26); Signal = EMA(9, MACD)
              </div>
              <p>Detects acceleration. Positive histogram values indicate bullish momentum; negative indicates bearish deceleration.</p>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>RSI (Relative Strength Index)</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#34d399', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                RSI = 100 - [100 / (1 + AvgGain / AvgLoss)]
              </div>
              <p>Bounds oscillator between 0 and 100 to alert the LLM of overbought (&gt;70) or oversold (&lt;30) exhaustion conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
