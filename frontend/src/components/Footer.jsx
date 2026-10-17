import React from 'react';
import { Cpu, Code2, ExternalLink, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      background: 'rgba(11, 15, 25, 0.95)',
      padding: '3rem 0 2rem',
      color: 'var(--text-secondary)',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
              <Cpu size={18} color="#06b6d4" />
              <span>AI Autonomous Trading Agent</span>
            </div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>
              An academic and quantitative engineering initiative integrating technical indicators, Gemini LLM reasoning, and deterministic risk management on Lighter Protocol Testnet.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Academic Institutional Details
            </div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>
              Department of Computer Science and Engineering<br />
              <strong>JSS Academy of Technical Education, Noida</strong><br />
              Dr. APJ Abdul Kalam Technical University, Lucknow
            </p>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Project Team & Supervisor
            </div>
            <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>
              • Soha Ratnam (2300910100179)<br />
              • Pranjal Gupta (2300910100135)<br />
              • Punya Jain (2300910100143)<br />
              <span style={{ color: '#60a5fa' }}>Under the Supervision of Dr. Vimal Gupta</span>
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 AI Autonomous Trading Agent • All Rights Reserved
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Architecture: Node.js + React + Gemini + Lighter</span>
            <span>Database: MongoDB Atlas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
