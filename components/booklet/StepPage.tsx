'use client'

import type { InstructionStep, BrickItem } from '@/lib/types'

interface StepPageProps {
  steps: [InstructionStep, InstructionStep?]
  pageNumber: number
  totalPages: number
}

export default function StepPage({ steps, pageNumber, totalPages }: StepPageProps) {
  const [left, right] = steps
  const pct = ((pageNumber - 1) / (totalPages - 1)) * 100

  return (
    <div className="booklet-page">
      <div className="steps-container">
        <StepPanel step={left} side="left" />
        {right && (
          <>
            <div className="step-divider" />
            <StepPanel step={right} side="right" />
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
          <div className="progress-dot" style={{ left: `${pct}%` }} />
        </div>
        <span className="page-num">{pageNumber}</span>
      </div>

      <style jsx>{`
        .booklet-page {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--booklet-bg);
          position: relative;
          overflow: hidden;
          font-family: var(--font-display);
        }
        .steps-container {
          display: flex;
          height: calc(100% - 32px);
        }
        .step-divider {
          width: 1.5px;
          background: var(--booklet-divider);
          flex-shrink: 0;
          margin: 16px 0;
        }
        .progress-wrap {
          position: absolute;
          bottom: 10px;
          left: 20px;
          right: 20px;
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

function StepPanel({ step, side }: { step: InstructionStep; side: 'left' | 'right' }) {
  return (
    <div className={`step-panel ${side}`}>
      {/* Brick inventory for this step */}
      <div className="step-bricks-box">
        {step.bricks.slice(0, 6).map((brick) => (
          <BrickCount key={brick.id} brick={brick} />
        ))}
      </div>

      {/* Step number */}
      <div className="step-number">{step.stepNumber}</div>

      {/* Main content area */}
      <div className="step-content">
        {step.subSteps && step.subSteps.length > 0 ? (
          <div className="substep-callout">
            {step.subSteps.map((sub) => (
              <div key={sub.number} className="substep">
                <span className="substep-num">{sub.number}</span>
                <div className="substep-bricks">
                  {sub.bricks.slice(0, 4).map((b) => (
                    <BrickCount key={b.id} brick={b} mini />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <BrickAssembly step={step} />
        )}
      </div>

      <style jsx>{`
        .step-panel {
          flex: 1;
          padding: 14px 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .step-bricks-box {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          background: rgba(255,255,255,0.45);
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: var(--radius-brick-box);
          padding: 6px 8px;
          min-height: 44px;
          align-items: center;
        }
        .step-number {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          color: #1A1A1A;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .step-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .substep-callout {
          background: var(--booklet-step-cream);
          border-radius: var(--radius-callout);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .substep {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .substep-num {
          font-size: clamp(14px, 2vw, 20px);
          font-weight: 900;
          color: #1A1A1A;
          min-width: 18px;
        }
        .substep-bricks {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  )
}

function BrickCount({ brick, mini = false }: { brick: BrickItem; mini?: boolean }) {
  const size = mini ? 24 : 36
  return (
    <div className="brick-count">
      <div className="brick-viz" style={{ width: size, height: size * 0.65 }}>
        <svg viewBox="0 0 40 26" width={size} height={size * 0.65}>
          <BrickSVG color={brick.colorHex} width={brick.width} type={brick.type} />
        </svg>
      </div>
      <span className="qty" style={{ fontSize: mini ? 9 : 11 }}>{brick.quantity}x</span>
      <style jsx>{`
        .brick-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .brick-viz {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qty {
          font-weight: 800;
          color: #1A1A1A;
          line-height: 1;
        }
      `}</style>
    </div>
  )
}

function BrickAssembly({ step }: { step: InstructionStep }) {
  // Render a simple growing stack diagram showing bricks being added
  const colors = step.bricks.map(b => b.colorHex)
  return (
    <div className="assembly">
      <svg viewBox="0 0 120 100" width="100%" height="100%" style={{ maxWidth: 160, maxHeight: 120 }}>
        {/* Base platform */}
        <BaseStack colors={colors} stepNum={step.stepNumber} />
        {/* Red placement arrows */}
        <Arrow x1={60} y1={20} x2={60} y2={42} />
        {/* New brick being added */}
        <g transform="translate(32, 10)">
          <BrickSVG color={colors[0] || '#CC0000'} width={2} type="brick" />
        </g>
      </svg>
      <style jsx>{`
        .assembly {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

function BaseStack({ colors, stepNum }: { colors: string[]; stepNum: number }) {
  const layers = Math.min(stepNum, 5)
  return (
    <>
      {Array.from({ length: layers }).map((_, i) => {
        const color = colors[i % colors.length] || '#CC0000'
        const y = 90 - i * 12
        return (
          <g key={i} transform={`translate(20, ${y})`}>
            <BrickSVG color={color} width={4} type={i === layers - 1 ? 'plate' : 'brick'} dim={i < layers - 1} />
          </g>
        )
      })}
    </>
  )
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CC0000" strokeWidth="2.5" strokeLinecap="round" />
      <polygon
        points={`${x2},${y2} ${x2 - 5},${y2 - 8} ${x2 + 5},${y2 - 8}`}
        fill="#CC0000"
      />
    </g>
  )
}

function BrickSVG({ color, width, type, dim = false }: {
  color: string; width: number; type: string; dim?: boolean
}) {
  const shade = shadeColor(color, -40)
  const mid = shadeColor(color, -20)
  const opacity = dim ? 0.45 : 1
  const w = Math.min(width * 10, 80)
  const d = type === 'plate' ? 3 : type === 'tile' ? 1 : 6

  return (
    <g opacity={opacity}>
      {/* Top */}
      <polygon
        points={`${w/2},2 ${w},2+${w*0.3} ${w/2},2+${w*0.6} 0,2+${w*0.3}`}
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="0.5"
      />
      {/* Right */}
      <polygon
        points={`${w},${2+w*0.3} ${w},${2+w*0.3+d} ${w/2},${2+w*0.6+d} ${w/2},${2+w*0.6}`}
        fill={mid}
      />
      {/* Left */}
      <polygon
        points={`0,${2+w*0.3} ${w/2},${2+w*0.6} ${w/2},${2+w*0.6+d} 0,${2+w*0.3+d}`}
        fill={shade}
      />
      {type !== 'tile' && width > 1 && (
        <>
          <ellipse cx={w * 0.3} cy={2 + w * 0.3 - 1} rx={3} ry={1.5} fill={shadeColor(color, -10)} />
          <ellipse cx={w * 0.7} cy={2 + w * 0.3 - 1} rx={3} ry={1.5} fill={shadeColor(color, -10)} />
        </>
      )}
      {type !== 'tile' && width === 1 && (
        <ellipse cx={w / 2} cy={2 + w * 0.3 - 1} rx={3} ry={1.5} fill={shadeColor(color, -10)} />
      )}
    </g>
  )
}

function shadeColor(hex: string, amount: number): string {
  const cleaned = hex.replace('#', '')
  const full = cleaned.length === 3
    ? cleaned.split('').map(c => c + c).join('')
    : cleaned
  const n = parseInt(full, 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
