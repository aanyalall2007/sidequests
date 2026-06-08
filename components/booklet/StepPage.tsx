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
        <StepPanel step={left} />
        {right && (
          <>
            <div className="step-divider" />
            <StepPanel step={right} />
          </>
        )}
      </div>

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

function StepPanel({ step }: { step: InstructionStep }) {
  return (
    <div className="step-panel">
      {/* Bricks needed this step */}
      <div className="step-bricks-box">
        {step.bricks.slice(0, 5).map((brick) => (
          <BrickCount key={brick.id} brick={brick} />
        ))}
      </div>

      {/* Step number */}
      <div className="step-number">{step.stepNumber}</div>

      {/* Main diagram — grid if available, else fallback */}
      <div className="step-diagram">
        {step.grid
          ? <GridDiagram grid={step.grid} newCells={step.newCells || []} />
          : <FallbackDiagram step={step} />
        }
      </div>

      {/* Instruction text */}
      <div className="step-instruction">{step.instruction}</div>

      <style jsx>{`
        .step-panel {
          flex: 1;
          padding: 10px 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
          overflow: hidden;
        }
        .step-bricks-box {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          background: rgba(255,255,255,0.45);
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: var(--radius-brick-box);
          padding: 5px 8px;
          min-height: 40px;
          align-items: center;
        }
        .step-number {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          color: #1A1A1A;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .step-diagram {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        .step-instruction {
          font-size: clamp(9px, 1.1vw, 12px);
          color: #2A2A2A;
          line-height: 1.4;
          font-family: var(--font-body);
          font-weight: 600;
          background: rgba(255,255,255,0.5);
          border-radius: 6px;
          padding: 5px 7px;
        }
      `}</style>
    </div>
  )
}

function GridDiagram({ grid, newCells }: { grid: string[][]; newCells: [number, number][] }) {
  const rows = grid.length
  const cols = grid[0]?.length || 0
  if (!rows || !cols) return null

  const newSet = new Set(newCells.map(([r, c]) => `${r},${c}`))

  // Find bounding box of non-empty cells to crop view
  let minR = rows, maxR = 0, minC = cols, maxC = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c]) {
        minR = Math.min(minR, r)
        maxR = Math.max(maxR, r)
        minC = Math.min(minC, c)
        maxC = Math.max(maxC, c)
      }
    }
  }

  const visRows = maxR - minR + 1
  const visCols = maxC - minC + 1
  const cellSize = Math.min(200 / visRows, 200 / visCols, 14)
  const w = visCols * cellSize
  const h = visRows * cellSize

  return (
    <div style={{ position: 'relative' }}>
      {/* "TOP VIEW" label */}
      <div style={{
        position: 'absolute', top: -14, left: 0, right: 0,
        textAlign: 'center', fontSize: 8, fontWeight: 700,
        letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)',
        textTransform: 'uppercase',
      }}>Top View</div>

      <svg width={w + 2} height={h + 2} style={{ display: 'block' }}>
        {/* Grid background */}
        <rect x={0} y={0} width={w + 2} height={h + 2} fill="rgba(255,255,255,0.15)" rx={4} />

        {Array.from({ length: visRows }, (_, ri) =>
          Array.from({ length: visCols }, (_, ci) => {
            const r = ri + minR
            const c = ci + minC
            const color = grid[r]?.[c]
            const isNew = newSet.has(`${r},${c}`)
            const x = ci * cellSize + 1
            const y = ri * cellSize + 1

            if (!color) {
              return (
                <rect
                  key={`${r},${c}`}
                  x={x} y={y}
                  width={cellSize - 0.5}
                  height={cellSize - 0.5}
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth={0.3}
                />
              )
            }

            return (
              <g key={`${r},${c}`}>
                <rect
                  x={x} y={y}
                  width={cellSize - 0.5}
                  height={cellSize - 0.5}
                  fill={color}
                  stroke={isNew ? '#000' : 'rgba(0,0,0,0.2)'}
                  strokeWidth={isNew ? 1.2 : 0.4}
                  opacity={isNew ? 1 : 0.4}
                  rx={1}
                />
                {/* Stud dot */}
                {cellSize >= 8 && (
                  <circle
                    cx={x + cellSize / 2 - 0.25}
                    cy={y + cellSize / 2 - 0.25}
                    r={cellSize * 0.2}
                    fill={isNew ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)'}
                  />
                )}
              </g>
            )
          })
        )}

        {/* Arrow pointing to new cells */}
        {newCells.length > 0 && (() => {
          const [nr, nc] = newCells[0]
          const ri = nr - minR
          const ci = nc - minC
          if (ri < 0 || ci < 0) return null
          const cx = ci * cellSize + cellSize / 2 + 1
          const cy = ri * cellSize + 1
          if (cy < 14) return null
          return (
            <g>
              <line x1={cx} y1={cy - 10} x2={cx} y2={cy - 2}
                stroke="#CC0000" strokeWidth={1.5} strokeLinecap="round" />
              <polygon
                points={`${cx},${cy - 1} ${cx - 3},${cy - 6} ${cx + 3},${cy - 6}`}
                fill="#CC0000"
              />
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

function FallbackDiagram({ step }: { step: InstructionStep }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
      {step.bricks.map((b) => (
        <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{
            width: Math.min(b.width * 16, 64),
            height: b.type === 'plate' ? 10 : 18,
            background: b.colorHex,
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.2)',
          }} />
          <span style={{ fontSize: 10, fontWeight: 800 }}>{b.quantity}×</span>
        </div>
      ))}
    </div>
  )
}

function BrickCount({ brick }: { brick: BrickItem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={{
        width: Math.min(brick.width * 12, 48),
        height: brick.type === 'plate' ? 8 : 14,
        background: brick.colorHex,
        borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.15)',
      }} />
      <span style={{ fontSize: 10, fontWeight: 800, color: '#1A1A1A' }}>{brick.quantity}×</span>
    </div>
  )
}
