import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, Send, CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, DollarSign, Activity, FileText } from 'lucide-react';
import { API_BASE } from '../config';

export default function LiveTryout({ user }) {
  const [symbol, setSymbol] = useState('ETHUSDC');
  const [market, setMarket] = useState(null);
  const [loadingMarket, setLoadingMarket] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [decision, setDecision] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [audits, setAudits] = useState([]);
  const [riskConfig, setRiskConfig] = useState({
    riskPerTradePercent: 2,
    maxLeverage: 3,
  });

  // Fetch market data
  const fetchMarket = async () => {
    setLoadingMarket(true);
    try {
      const res = await fetch(`${API_BASE}/api/agent/market?symbol=${symbol}`);
      if (res.ok) {
        const data = await res.json();
        setMarket(data);
      }
    } catch (err) {
      console.error('Failed to load market:', err);
    } finally {
      setLoadingMarket(false);
    }
  };

  // Fetch audit records
  const fetchAudits = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/agent/audits`);
      if (res.ok) {
        const data = await res.json();
        setAudits(data.audits || []);
      }
    } catch (err) {
      console.error('Failed to load audits:', err);
    }
  };

  useEffect(() => {
    fetchMarket();
    fetchAudits();
    const interval = setInterval(fetchMarket, 15000); // 15s auto-refresh
    return () => clearInterval(interval);
  }, [symbol]);

  // Run Gemini LLM analysis
  const handleAnalyze = async () => {
    if (!market) return;
    setAnalyzing(true);
    setDecision(null);
    setExecutionResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/agent/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          marketData: market,
          portfolio: {
            balanceUsdc: user?.balanceUsdc || 10000,
            openPosition: 'NONE',
          },
          riskConfig,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDecision(data.decision);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Execute on Lighter Testnet
  const handleExecute = async () => {
    if (!decision) return;
    setExecuting(true);
    try {
      const res = await fetch(`${API_BASE}/api/agent/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          currentPrice: market?.price,
          symbol,
          userId: user?.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setExecutionResult(data.audit);
        fetchAudits();
      }
    } catch (err) {
      console.error('Execution failed:', err);
    } finally {
      setExecuting(false);
    }
  };

  // Render SVG Chart for candles
  const renderChart = () => {
    if (!market || !market.candles || market.candles.length === 0) return null;
    const candles = market.candles;
    const minPrice = Math.min(...candles.map(c => c.low));
    const maxPrice = Math.max(...candles.map(c => c.high));
    const range = maxPrice - minPrice || 1;
    const width = 640;
    const height = 180;

    const points = candles.map((c, i) => {
      const x = (i / (candles.length - 1)) * (width - 40) + 20;
      const y = height - ((c.close - minPrice) / range) * (height - 40) - 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div style={{ position: 'relative', width: '100%', height: `${height}px`, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1="0" y1="45" x2={width} y2="45" stroke="#1f293d" strokeDasharray="3 3" />
          <line x1="0" y1="90" x2={width} y2="90" stroke="#1f293d" strokeDasharray="3 3" />
          <line x1="0" y1="135" x2={width} y2="135" stroke="#1f293d" strokeDasharray="3 3" />

          {/* Area fill */}
          <polygon
            points={`20,${height} ${points} ${width - 20},${height}`}
            fill="url(#chartGradient)"
          />

          {/* Price Line */}
          <polyline
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
            points={points}
          />
        </svg>

        {/* Floating price tags */}
        <div style={{ position: 'absolute', top: '10px', left: '15px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          High: ${maxPrice.toFixed(2)}
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '15px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Low: ${minPrice.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <section style={{ padding: '3rem 0 4rem' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
              Autonomous Sandbox • Lighter Testnet
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Live Trading Agent Sandbox
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setSymbol('ETHUSDC')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: symbol === 'ETHUSDC' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ETH-USDC
              </button>
              <button 
                onClick={() => setSymbol('BTCUSDC')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: symbol === 'BTCUSDC' ? '#2563eb' : 'transparent',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                BTC-USDC
              </button>
            </div>

            <button 
              onClick={fetchMarket} 
              className="btn btn-secondary" 
              disabled={loadingMarket}
              style={{ padding: '0.55rem 0.85rem' }}
            >
              <RefreshCw size={15} className={loadingMarket ? 'spin-anim' : ''} /> Refresh
            </button>
          </div>
        </div>

        {/* Market Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Live Price</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.2rem', color: '#ffffff' }}>
              ${market ? market.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '...'}
            </div>
            <div style={{ fontSize: '0.82rem', marginTop: '0.2rem', color: (market?.change24h || 0) >= 0 ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {(market?.change24h || 0) >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {market ? `${market.change24h > 0 ? '+' : ''}${market.change24h}% (24h)` : ''}
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>EMA (9 vs 21)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '0.35rem', color: '#38bdf8' }}>
              ${market?.technicals?.ema9 || '...'} / ${market?.technicals?.ema21 || '...'}
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              <span className={`badge ${market?.technicals?.emaTrend === 'BULLISH_CROSS' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.65rem' }}>
                {market?.technicals?.emaTrend || 'ANALYZING'}
              </span>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MACD Histogram</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '0.35rem', color: '#c084fc' }}>
              {market?.technicals?.macdHistogram || '...'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Signal: {market?.technicals?.macdSignal || 0}
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>RSI (14-period)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '0.35rem', color: '#34d399' }}>
              {market?.technicals?.rsi || '...'}
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                {market?.technicals?.rsiStatus || 'NEUTRAL'}
              </span>
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              ETH-USDC 24-Hour Price Movement & Indicator Visualizer
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source: {market?.source || 'Exchange Feed'}
            </div>
          </div>
          {renderChart()}
        </div>

        {/* Interactive AI Agent Control & Output */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Control Panel */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="#38bdf8" /> Autonomous Agent Trigger
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Risk Constraint: Max Leverage
              </label>
              <select 
                value={riskConfig.maxLeverage}
                onChange={(e) => setRiskConfig({ ...riskConfig, maxLeverage: Number(e.target.value) })}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              >
                <option value={1}>1.0x (Spot / Zero Leverage)</option>
                <option value={2}>2.0x (Conservative)</option>
                <option value={3}>3.0x (Standard Synopsis Ceiling)</option>
                <option value={5}>5.0x (Aggressive - Triggers Risk Override)</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Max Capital Risk Per Trade
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={riskConfig.riskPerTradePercent}
                  onChange={(e) => setRiskConfig({ ...riskConfig, riskPerTradePercent: Number(e.target.value) })}
                  style={{ flex: 1 }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.9rem', width: '40px' }}>{riskConfig.riskPerTradePercent}%</span>
              </div>
            </div>

            <button 
              onClick={handleAnalyze} 
              disabled={analyzing} 
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              {analyzing ? (
                <>Synthesizing Multi-Factor Reasoning...</>
              ) : (
                <><Play size={16} fill="#ffffff" /> Run Gemini Autonomous Decision Core</>
              )}
            </button>
          </div>

          {/* Decision Card */}
          <div className="card" style={{ background: decision ? 'var(--bg-card)' : 'rgba(22, 31, 48, 0.4)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="#10b981" /> AI Output & Risk Gate
            </h3>

            {decision ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '8px',
                      backgroundColor: decision.action === 'LONG' ? '#059669' : decision.action === 'SHORT' ? '#dc2626' : '#d97706',
                      color: '#ffffff'
                    }}>
                      {decision.action}
                    </span>
                    <span className="badge badge-cyan">
                      {decision.confidence}% Confidence
                    </span>
                  </div>

                  <span className={`badge ${decision.riskCheckPassed ? 'badge-green' : 'badge-red'}`}>
                    {decision.riskCheckPassed ? 'Risk Verified' : 'Risk Rejected'}
                  </span>
                </div>

                {/* Sizing & Targets */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontSize: '0.8rem'
                }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Target Size</div>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{decision.targetSizeEth || 0.5} ETH</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Stop Loss</div>
                    <div style={{ fontWeight: 600, color: '#f87171' }}>${decision.stopLoss || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Take Profit</div>
                    <div style={{ fontWeight: 600, color: '#34d399' }}>${decision.takeProfit || 'N/A'}</div>
                  </div>
                </div>

                {/* Rationale */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Gemini Explanatory Rationale:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    {decision.rationale}
                  </p>
                </div>

                {/* Execution Button */}
                <button
                  onClick={handleExecute}
                  disabled={executing || decision.action === 'HOLD'}
                  className="btn btn-accent"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  {executing ? (
                    'Signing & Dispatched to Lighter...'
                  ) : decision.action === 'HOLD' ? (
                    'No Order Needed (Market in HOLD state)'
                  ) : (
                    <><Send size={15} /> Dispatch Order to Lighter Protocol Testnet</>
                  )}
                </button>

                {executionResult && (
                  <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', fontSize: '0.8rem' }}>
                    <div style={{ color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={16} /> Order Filled on Testnet
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                      Tx: {executionResult.txHash}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <Activity size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                <p style={{ fontSize: '0.9rem' }}>
                  Click "Run Gemini Autonomous Decision Core" to evaluate live ETH-USDC market indicators and generate an institutional trading signal.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Live Audit Log Section */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Persistent Audit Trail (MongoDB / Prisma)
              </h3>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Total Logged Decisions: {audits.length}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Time</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Symbol</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Action</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Confidence</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Price</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>LLM Rationale</th>
                </tr>
              </thead>
              <tbody>
                {audits.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No audit history yet. Run an analysis and execute an order to build your audit log.
                    </td>
                  </tr>
                ) : (
                  audits.slice(0, 8).map((a, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {new Date(a.createdAt).toLocaleTimeString()}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{a.symbol}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span className={`badge ${a.action === 'LONG' ? 'badge-green' : a.action === 'SHORT' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                          {a.action}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{a.confidence}%</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>${Number(a.price).toFixed(2)}</td>
                      <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>{a.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }}>
                        {a.llmRationale}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
