import React, { useState } from 'react';
import { Database, Cpu, ShieldCheck, Send, CheckCircle2, ArrowRight, HelpCircle, Code, ChevronRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Market Data Ingestion',
    icon: Database,
    badge: 'Stage 1 • Inputs',
    summary: 'Streaming real-time ETH-USDC market data without downtime.',
    description: 'The agent continuously listens to live exchange feeds (Binance & Lighter Protocol). It collects Open, High, Low, Close, and Volume (OHLCV) candles across multiple timeframes (1h, 5m).',
    teachingPoint: 'Why not just trade on current price? Because raw price alone lacks context. Time-series candles establish historical support, resistance, and market velocity.',
    codeSnippet: `// 1. Fetch live 1h candles
GET /api/v3/klines?symbol=ETHUSDC&interval=1h
// Output: [Timestamp, Open, High, Low, Close, Volume]`
  },
  {
    id: 2,
    title: 'Technical Indicator Extraction',
    icon: Code,
    badge: 'Stage 2 • Math Engine',
    summary: 'Mathematical feature engineering: EMA 9/21 crossovers & MACD momentum.',
    description: 'The raw time-series is processed to extract mathematical signals: Exponential Moving Averages (EMA 9 & EMA 21) detect short-term trend shifts, while MACD (12, 26, 9) tracks directional momentum.',
    teachingPoint: 'Golden Cross (EMA 9 > EMA 21) indicates bullish upward acceleration. Death Cross (EMA 9 < EMA 21) indicates bearish downward pressure.',
    codeSnippet: `// 2. Exponential Moving Average Formula
EMA_today = (Price_today * (2 / (N + 1))) + (EMA_yesterday * (1 - (2 / (N + 1))))
MACD_Line = EMA(12) - EMA(26); Signal_Line = EMA(9, MACD_Line)`
  },
  {
    id: 3,
    title: 'LLM Contextual Reasoning',
    icon: Cpu,
    badge: 'Stage 3 • AI Brain',
    summary: 'Gemini Flash synthesizes multi-factor context into an auditable trade thesis.',
    description: 'Unlike rigid if-else bots, the agent prompts Gemini Flash with market indicators, available USDC balance, open positions, and recent trade logs. The LLM produces a structured JSON output with an explainable rationale.',
    teachingPoint: 'Traditional bots fail when market conditions get choppy. An LLM acts like an experienced portfolio manager, weighing confidence, risk-to-reward ratio, and market sentiment together.',
    codeSnippet: `// 3. Structured Decision from Gemini Flash
{
  "action": "LONG",
  "confidence": 84,
  "stopLoss": 2580.0,
  "takeProfit": 2740.0,
  "rationale": "Bullish EMA 9 cross confirmed by positive MACD histogram..."
}`
  },
  {
    id: 4,
    title: 'Risk Management Gatekeeper',
    icon: ShieldCheck,
    badge: 'Stage 4 • Capital Safety',
    summary: 'Deterministic risk layer validates all AI recommendations before order execution.',
    description: 'The AI never executes trades directly. Every recommendation is passed through a deterministic risk validation layer. If leverage exceeds 3x, exposure exceeds 25% of equity, or confidence is under 60%, the order is automatically downgraded to HOLD.',
    teachingPoint: 'Rule-of-Thumb in Quantitative Trading: Survival first, profits second. The risk engine prevents AI hallucinations or extreme market slippage from causing catastrophic drawdowns.',
    codeSnippet: `// 4. Deterministic Pre-Execution Gate
if (decision.confidence < 60 || requestedLeverage > 3.0) {
  decision.action = 'HOLD';
  decision.riskCheckPassed = false;
  audit.log('Risk Guard rejected trade: Insufficient confidence');
}`
  },
  {
    id: 5,
    title: 'Lighter Protocol Execution & Audit',
    icon: Send,
    badge: 'Stage 5 • Finality',
    summary: 'Order dispatch to Lighter Testnet and persistent MongoDB audit trail.',
    description: 'Approved orders are formatted and dispatched to the Lighter Protocol Testnet orderbook. Execution receipts, transaction hashes, and complete LLM reasoning chains are stored in MongoDB / Prisma for institutional auditability.',
    teachingPoint: 'Transparency is essential for academic research and regulatory compliance. Every trade can be traced back to the exact tick and rationale that created it.',
    codeSnippet: `// 5. Audit Record Stored in Database
{
  txHash: "0x3f9a...lighter-testnet",
  status: "SIMULATED_FILLED",
  network: "Lighter Protocol Testnet",
  timestamp: "2026-10-17T15:30:00Z"
}`
  }
];

export default function ProcessGuide({ onTryoutClick }) {
  const [selectedStep, setSelectedStep] = useState(1);
  const current = steps.find(s => s.id === selectedStep);

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            Interactive Beginner Walkthrough
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            How the Autonomous Trading Agent Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Click through each stage of the autonomous decision loop below to understand the journey from raw market ticks to verified on-chain execution.
          </p>
        </div>

        {/* Horizontal Step Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === selectedStep;
            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(step.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none'
                }}
              >
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#60a5fa' : 'var(--text-muted)'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: isActive ? '#93c5fd' : 'var(--text-muted)' }}>
                    STAGE {step.id}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {step.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Display */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Explanation side */}
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
              {current.badge}
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {current.title}
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#93c5fd', marginBottom: '1rem', fontWeight: 500 }}>
              {current.summary}
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {current.description}
            </p>

            {/* Beginner Teaching Tip */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              borderLeft: '4px solid #3b82f6',
              padding: '1rem',
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <HelpCircle size={16} /> Beginner Concept Insight:
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {current.teachingPoint}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {selectedStep < 5 ? (
                <button 
                  onClick={() => setSelectedStep(s => Math.min(s + 1, 5))}
                  className="btn btn-primary"
                >
                  Next Stage <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={onTryoutClick} className="btn btn-accent">
                  Try It in Live Sandbox <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Code & Logic Representation */}
          <div>
            <div style={{
              background: '#090d16',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              <div style={{
                background: '#111827',
                padding: '0.65rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)'
              }}>
                <span>execution_pipeline.ts (Stage {current.id})</span>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Active</span>
              </div>
              <pre style={{
                padding: '1.25rem',
                fontSize: '0.82rem',
                lineHeight: 1.6,
                fontFamily: 'var(--font-mono)',
                color: '#e2e8f0',
                overflowX: 'auto',
                margin: 0
              }}>
                <code>{current.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
