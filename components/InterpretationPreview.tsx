'use client'

import { useState } from 'react'
import type { InterpretationData, BookletData } from '@/lib/types'

interface InterpretationPreviewProps {
  interpretation: InterpretationData
  imageFile?: File
  description?: string
  onApprove: (booklet: BookletData) => void
  onEdit: () => void
}

export default function InterpretationPreview({
  interpretation,
  imageFile,
  description,
  onApprove,
  onEdit,
}: InterpretationPreviewProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async () => {
    setLoading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('interpretation', JSON.stringify(interpretation))
      if (description) fd.append('description', description)
      if (imageFile) fd.append('image', imageFile)
      fd.append('id', crypto.randomUUID())

      const res = await fetch('/api/generate', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Generation failed')
      const booklet: BookletData = await res.json()
      onApprove(booklet)
    } catch {
      setError('Failed to generate booklet. Try again.')
      setLoading(false)
    }
  }

  const COMPLEXITY_LABELS = { simple: 'Simple', standard: 'Standard', advanced: 'Advanced' }

  return (
    <div className="overlay">
      <div className="preview-card">
        <div className="preview-header">
          <span className="preview-tag">Preview</span>
          <h2 className="preview-title">{interpretation.title}</h2>
        </div>

        <p className="preview-desc">{interpretation.description}</p>

        <div className="preview-meta">
          <MetaBadge label="Pieces" value={`~${interpretation.brickCountEstimate}`} />
          <MetaBadge label="Complexity" value={COMPLEXITY_LABELS[interpretation.complexity]} />
          <MetaBadge label="Shape" value={interpretation.dominantShape} />
        </div>

        <div className="color-palette">
          {interpretation.colors.map((color) => (
            <ColorSwatch key={color} color={color} />
          ))}
        </div>

        <div className="approach-box">
          <span className="approach-label">Build approach</span>
          <p className="approach-text">{interpretation.suggestedApproach}</p>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="preview-actions">
          <button className="edit-btn" onClick={onEdit} disabled={loading}>
            ← Edit
          </button>
          <button className="approve-btn" onClick={handleApprove} disabled={loading}>
            {loading ? (
              <span className="loading-row">
                <span className="spinner" /> Building instructions…
              </span>
            ) : (
              'Approve & Build →'
            )}
          </button>
        </div>

        {loading && (
          <div className="loading-progress">
            <div className="progress-bar-anim" />
            <p className="loading-hint">Generating your Lego booklet… this takes ~20 seconds</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: var(--color-surface-overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 24px;
          backdrop-filter: blur(4px);
        }
        .preview-card {
          background: var(--color-bg-primary);
          border-radius: var(--radius-xl);
          padding: 32px;
          width: 100%;
          max-width: 520px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .preview-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .preview-tag {
          display: inline-block;
          background: var(--booklet-bg);
          color: var(--booklet-progress);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .preview-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 900;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
          margin: 0;
        }
        .preview-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin: 0;
        }
        .preview-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .color-palette {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .approach-box {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .approach-label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-tertiary);
        }
        .approach-text {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.5;
        }
        .error-msg {
          color: var(--lego-red);
          font-size: 13px;
          font-weight: 600;
          margin: 0;
        }
        .preview-actions {
          display: flex;
          gap: 12px;
        }
        .edit-btn {
          padding: 14px 20px;
          border: 2px solid var(--color-border-primary);
          border-radius: var(--radius-full);
          background: white;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .edit-btn:hover:not(:disabled) {
          border-color: var(--color-text-secondary);
          color: var(--color-text-primary);
        }
        .approve-btn {
          flex: 1;
          padding: 14px 20px;
          background: var(--lego-red);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.15s;
        }
        .approve-btn:hover:not(:disabled) {
          background: var(--lego-red-dark);
          transform: translateY(-1px);
        }
        .approve-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .loading-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .loading-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .progress-bar-anim {
          height: 3px;
          background: var(--color-bg-secondary);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }
        .progress-bar-anim::after {
          content: '';
          position: absolute;
          top: 0; left: -40%;
          width: 40%;
          height: 100%;
          background: var(--lego-red);
          border-radius: 99px;
          animation: slide 1.2s ease-in-out infinite;
        }
        @keyframes slide {
          0% { left: -40%; }
          100% { left: 100%; }
        }
        .loading-hint {
          font-size: 12px;
          color: var(--color-text-tertiary);
          text-align: center;
          margin: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="meta-badge">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
      <style jsx>{`
        .meta-badge {
          display: flex;
          flex-direction: column;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          gap: 2px;
        }
        .meta-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-tertiary);
        }
        .meta-value {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  )
}

const LEGO_COLORS: Record<string, string> = {
  red: '#CC0000', yellow: '#F7D117', blue: '#006CB7', green: '#237841',
  black: '#1B2A34', white: '#E8E8E8', grey: '#9BA19D', gray: '#9BA19D',
  tan: '#E4CD9E', orange: '#FE8A18', 'light-blue': '#9FC3E9',
  'dark-grey': '#595D60', brown: '#7B3F00', purple: '#6A0DAD',
  pink: '#FF6B9D', cyan: '#00B4D8', lime: '#9BC400',
}

function ColorSwatch({ color }: { color: string }) {
  const hex = LEGO_COLORS[color.toLowerCase()] || '#9BA19D'
  return (
    <div className="swatch" style={{ background: hex }} title={color}>
      <style jsx>{`
        .swatch {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(0,0,0,0.1);
          box-shadow: inset 0 -2px 0 rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  )
}
