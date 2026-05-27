'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { prompt: true,  text: '/cim-builder Draft CIM for SaaS company — attached data room', color: '#fff' },
  { prompt: false, text: 'Reading data room... structuring narrative...', color: 'rgba(255,255,255,0.38)' },
  { prompt: false, text: 'Building executive summary and financials...', color: 'rgba(255,255,255,0.38)' },
  { prompt: false, text: '✓ CIM ready — 64 pages. Download DOCX.', color: 'rgba(46,139,87,0.95)' },
  { prompt: true,  text: '/dcf Apple 10-K — 5yr DCF with WACC sensitivity', color: '#fff' },
  { prompt: false, text: 'Projecting FCF 2025–2029... calculating WACC...', color: 'rgba(255,255,255,0.38)' },
  { prompt: false, text: '✓ DCF complete. Base case $198/share. Excel ready.', color: 'rgba(46,139,87,0.95)' },
  { prompt: true,  text: '/ic-memo Acquisition of TechCo at 12x EBITDA', color: '#fff' },
  { prompt: false, text: '✓ IC memo drafted — 22 pages. Download PDF.', color: 'rgba(46,139,87,0.95)' },
]

const DELAYS = [400, 950, 750, 1400, 550, 1050, 1500, 600, 1300]
const RESTART_PAUSE = 3200

export default function TerminalDemo() {
  const [visible, setVisible] = useState(0)
  const [blink, setBlink]     = useState(true)

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (visible >= LINES.length) {
      const t = setTimeout(() => setVisible(0), RESTART_PAUSE)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisible(v => v + 1), DELAYS[visible] ?? 900)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <div style={{ width: '100%', background: '#0D1F14', borderRadius: 14, overflow: 'hidden' }}>
      {/* Title bar */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        {['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)'].map((bg, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: bg }} />
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)', marginLeft: 8 }}>
          claude — CBANK Skills
        </span>
      </div>

      {/* Body */}
      <div style={{
        padding: '24px 22px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        lineHeight: 2,
        minHeight: 280,
      }}>
        {LINES.slice(0, visible).map((line, i) => (
          <div
            key={`${visible}-${i}`}
            style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              animation: 'termLine 0.18s ease-out both',
            }}
          >
            <span style={{ color: line.prompt ? 'var(--accent)' : 'transparent', flexShrink: 0 }}>›</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}

        {/* Blinking cursor */}
        {visible < LINES.length && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0 }}>›</span>
            <span style={{
              display: 'inline-block', width: 7, height: 14,
              background: blink ? 'rgba(46,139,87,0.65)' : 'transparent',
              transition: 'background 0.1s',
              verticalAlign: 'middle',
            }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes termLine {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
