'use client'

import type { BookletData, BrickItem } from '@/lib/types'

interface InventoryPageProps {
  booklet: BookletData
  pageNumber: number
  totalPages: number
}

export default function InventoryPage({ booklet, pageNumber, totalPages }: InventoryPageProps) {
  return (
    <div className="booklet-page">
      <div className="inventory-header">
        <span className="inventory-label">Parts List</span>
        <span className="total-count">{booklet.totalBricks} pieces</span>
      </div>

      <div className="inventory-grid">
        {booklet.inventory.map((brick) => (
          <BrickInventoryItem key={brick.id} brick={brick} />
        ))}
      </div>

      <ProgressBar current={pageNumber} total={totalPages} />

      <style jsx>{`
        .booklet-page {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--booklet-bg);
          position: relative;
          overflow: hidden;
          font-family: var(--font-display);
          padding: 24px 28px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .inventory-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .inventory-label {
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 900;
          color: #1A1A1A;
          letter-spacing: -0.01em;
        }
        .total-count {
          font-size: clamp(11px, 1.5vw, 14px);
          font-weight: 700;
          color: #3A3A3A;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .inventory-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          flex: 1;
          align-content: flex-start;
        }
      `}</style>
    </div>
  )
}

function BrickInventoryItem({ brick }: { brick: BrickItem }) {
  return (
    <div className="brick-item">
      <div className="brick-visual">
        <MiniIsoBrick color={brick.colorHex} width={brick.width} type={brick.type} />
      </div>
      <span className="brick-qty">{brick.quantity}x</span>
      <style jsx>{`
        .brick-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.45);
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: var(--radius-brick-box);
          padding: 8px 10px 6px;
          min-width: 60px;
        }
        .brick-visual {
          width: 44px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brick-qty {
          font-size: clamp(10px, 1.2vw, 13px);
          font-weight: 800;
          color: #1A1A1A;
        }
      `}</style>
    </div>
  )
}

function MiniIsoBrick({ color, width, type }: { color: string; width: number; type: string }) {
  const h = type === 'plate' ? 3 : type === 'tile' ? 1 : 5
  const w = Math.min(width * 10, 40)
  const depth = type === 'tile' ? 2 : 5
  const dark = shadeColor(color, -40)
  const mid = shadeColor(color, -20)

  return (
    <svg viewBox={`0 0 ${w + 10} ${w * 0.5 + depth + 8}`} width="44" height="30">
      <polygon
        points={`${w/2},2 ${w},2+${w*0.25} ${w/2},2+${w*0.5} 0,2+${w*0.25}`}
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="0.5"
      />
      <polygon
        points={`${w},${2+w*0.25} ${w},${2+w*0.25+depth} ${w/2},${2+w*0.5+depth} ${w/2},${2+w*0.5}`}
        fill={mid}
      />
      <polygon
        points={`0,${2+w*0.25} ${w/2},${2+w*0.5} ${w/2},${2+w*0.5+depth} 0,${2+w*0.25+depth}`}
        fill={dark}
      />
      {type !== 'tile' && (
        <ellipse cx={w/2} cy={2 + w * 0.25 - 1} rx={3} ry={1.5} fill={shadeColor(color, -10)} />
      )}
    </svg>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current - 1) / (total - 1)) * 100
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
        <div className="progress-dot" style={{ left: `${pct}%` }} />
      </div>
      <span className="page-num">{current}</span>
      <style jsx>{`
        .progress-wrap {
          position: absolute;
          bottom: 14px;
          left: 28px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .progress-track {
          flex: 1;
          height: 3px;
          background: rgba(0,0,0,0.15);
          border-radius: 99px;
          position: relative;
        }
        .progress-fill {
          height: 100%;
          background: var(--booklet-progress);
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .progress-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--booklet-progress);
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .page-num {
          font-size: 11px;
          font-weight: 700;
          color: #3A3A3A;
          min-width: 16px;
          text-align: right;
        }
      `}</style>
    </div>
  )
}

function shadeColor(hex: string, amount: number): string {
  const cleaned = hex.replace('#', '')
  const n = parseInt(cleaned.length === 3
    ? cleaned.split('').map(c => c + c).join('')
    : cleaned, 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
