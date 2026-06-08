'use client'

import type { BookletData } from '@/lib/types'

interface CoverPageProps {
  booklet: BookletData
}

export default function CoverPage({ booklet }: CoverPageProps) {
  return (
    <div className="booklet-page cover-page">
      {/* LEGO logo top-left */}
      <div className="lego-logo">
        <span>LEGO</span>
      </div>

      {/* Set number */}
      <div className="set-number">{booklet.setNumber}</div>

      {/* Central model illustration */}
      <div className="cover-model">
        <div className="model-placeholder">
          <ModelIllustration booklet={booklet} />
        </div>
      </div>

      {/* Title */}
      <div className="cover-title">
        <h1>{booklet.title}</h1>
        <p className="cover-subtitle">{booklet.totalBricks} pieces</p>
      </div>

      <style jsx>{`
        .booklet-page {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--booklet-bg);
          position: relative;
          overflow: hidden;
          font-family: var(--font-display);
          user-select: none;
        }
        .cover-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }
        .lego-logo {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--lego-red);
          color: white;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: -0.02em;
          padding: 4px 10px;
          border-radius: 5px;
          border: 2px solid #a00008;
          box-shadow: inset 0 -2px 0 rgba(0,0,0,0.2);
        }
        .set-number {
          position: absolute;
          bottom: 28px;
          left: 28px;
          font-size: 14px;
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: 0.05em;
        }
        .cover-model {
          width: 55%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .model-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cover-title {
          text-align: center;
        }
        .cover-title h1 {
          font-size: clamp(22px, 4vw, 36px);
          font-weight: 900;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          margin: 0 0 4px;
        }
        .cover-subtitle {
          font-size: 14px;
          font-weight: 700;
          color: #3A3A3A;
          margin: 0;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

function ModelIllustration({ booklet }: { booklet: BookletData }) {
  // Build a simple stacked brick illustration from the inventory
  const colors = booklet.colors.slice(0, 4)
  const rows = 5
  const cols = 4

  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%">
      {/* Shadow */}
      <ellipse cx="100" cy="175" rx="60" ry="8" fill="rgba(0,0,0,0.12)" />
      {/* Stacked bricks isometric */}
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols - (row > 2 ? 1 : 0) }).map((_, col) => {
          const colorIdx = (row + col) % colors.length
          const color = LEGO_COLORS[colors[colorIdx]] || '#CC0000'
          const x = 60 + col * 20 - row * 8
          const y = 140 - row * 18 - col * 5
          return (
            <g key={`${row}-${col}`} transform={`translate(${x},${y})`}>
              <IsoBrick color={color} width={22} height={10} />
            </g>
          )
        })
      )}
    </svg>
  )
}

function IsoBrick({ color, width, height }: { color: string; width: number; height: number }) {
  const dark = shadeColor(color, -40)
  const mid = shadeColor(color, -20)
  const w = width
  const h = height
  const d = 6 // depth

  return (
    <g>
      {/* Top face */}
      <polygon
        points={`${w/2},0 ${w},${h*0.5} ${w/2},${h} 0,${h*0.5}`}
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
      />
      {/* Right face */}
      <polygon
        points={`${w},${h*0.5} ${w},${h*0.5+d} ${w/2},${h+d} ${w/2},${h}`}
        fill={mid}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
      />
      {/* Left face */}
      <polygon
        points={`0,${h*0.5} ${w/2},${h} ${w/2},${h+d} 0,${h*0.5+d}`}
        fill={dark}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
      />
      {/* Stud */}
      <ellipse cx={w/2} cy={h*0.5 - 2} rx={4} ry={2} fill={shadeColor(color, -10)} />
    </g>
  )
}

const LEGO_COLORS: Record<string, string> = {
  red: '#CC0000', yellow: '#F7D117', blue: '#006CB7', green: '#237841',
  black: '#1B2A34', white: '#F4F4F4', grey: '#9BA19D', gray: '#9BA19D',
  tan: '#E4CD9E', orange: '#FE8A18', 'light-blue': '#9FC3E9',
  'dark-grey': '#595D60', brown: '#7B3F00', purple: '#6A0DAD',
  pink: '#FF6B9D', cyan: '#00B4D8', lime: '#9BC400',
}

function shadeColor(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
