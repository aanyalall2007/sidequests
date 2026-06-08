'use client'

import type { BrickItem } from '@/lib/types'

interface BrickIconProps {
  brick: BrickItem
  size?: number
}

// Isometric-style brick rendered in SVG
export default function BrickIcon({ brick, size = 48 }: BrickIconProps) {
  const w = brick.width
  const h = brick.height
  const color = brick.colorHex

  // Derive shading from base color
  const darken = (hex: string, amount: number) => {
    const n = parseInt(hex.slice(1), 16)
    const r = Math.max(0, (n >> 16) - amount)
    const g = Math.max(0, ((n >> 8) & 0xff) - amount)
    const b = Math.max(0, (n & 0xff) - amount)
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }

  const topColor = color
  const sideColor = darken(color, 40)
  const frontColor = darken(color, 20)

  // Isometric projection dimensions
  const isoW = size * w * 0.5
  const isoH = size * 0.3
  const studR = size * 0.12

  const viewW = isoW * 2 + 8
  const viewH = isoW + isoH * h * 2 + size * 0.4 + 8

  // Top face (parallelogram)
  const topPts = [
    [viewW / 2, 4],
    [viewW - 4, 4 + isoW * 0.5],
    [viewW / 2, 4 + isoW],
    [4, 4 + isoW * 0.5],
  ].map(p => p.join(',')).join(' ')

  // Right face
  const rightPts = [
    [viewW - 4, 4 + isoW * 0.5],
    [viewW - 4, 4 + isoW * 0.5 + isoH * h],
    [viewW / 2, 4 + isoW + isoH * h],
    [viewW / 2, 4 + isoW],
  ].map(p => p.join(',')).join(' ')

  // Left face
  const leftPts = [
    [viewW / 2, 4 + isoW],
    [viewW / 2, 4 + isoW + isoH * h],
    [4, 4 + isoW * 0.5 + isoH * h],
    [4, 4 + isoW * 0.5],
  ].map(p => p.join(',')).join(' ')

  // Studs on top face
  const studs = []
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      const cx = viewW / 2 + (col - row) * (isoW / w) * 0.5
      const cy = 4 + isoW * 0.5 + (col + row) * (isoW / h) * 0.15 + studR * 0.5
      studs.push({ cx, cy })
    }
  }

  return (
    <svg
      width={viewW}
      height={viewH}
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ display: 'block' }}
    >
      <polygon points={leftPts} fill={sideColor} />
      <polygon points={rightPts} fill={frontColor} />
      <polygon points={topPts} fill={topColor} />
      {studs.map((s, i) => (
        <g key={i}>
          <ellipse cx={s.cx} cy={s.cy} rx={studR} ry={studR * 0.5} fill={darken(color, 10)} />
          <ellipse cx={s.cx} cy={s.cy - studR * 0.3} rx={studR * 0.9} ry={studR * 0.4} fill={topColor} />
        </g>
      ))}
    </svg>
  )
}
