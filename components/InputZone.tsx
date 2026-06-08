'use client'

import { useState, useRef } from 'react'
import type { ComplexityTier, InterpretationData } from '@/lib/types'

interface InputZoneProps {
  onInterpretation: (data: InterpretationData, imageFile?: File, description?: string) => void
}

const COMPLEXITY_OPTIONS: { id: ComplexityTier; label: string; sub: string; bricks: string }[] = [
  { id: 'simple', label: 'Simple', sub: 'Great for kids', bricks: '~50 pieces' },
  { id: 'standard', label: 'Standard', sub: 'Balanced detail', bricks: '~100 pieces' },
  { id: 'advanced', label: 'Advanced', sub: 'Detailed replica', bricks: '~200 pieces' },
]

export default function InputZone({ onInterpretation }: InputZoneProps) {
  const [mode, setMode] = useState<'photo' | 'describe'>('photo')
  const [complexity, setComplexity] = useState<ComplexityTier>('standard')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImage = (file: File) => {
    if (!file.type.startsWith('image/')) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImage(file)
  }

  const handleGenerate = async () => {
    if (mode === 'photo' && !imageFile) { setError('Please upload a photo'); return }
    if (mode === 'describe' && !description.trim()) { setError('Please enter a description'); return }
    setError(null)
    setLoading(true)

    try {
      const fd = new FormData()
      fd.append('complexity', complexity)
      if (description) fd.append('description', description)
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch('/api/interpret', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Failed to interpret')
      const data: InterpretationData = await res.json()
      onInterpretation(data, imageFile || undefined, description)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="input-zone">
      {/* Mode tabs */}
      <div className="mode-tabs">
        <button
          className={`tab ${mode === 'photo' ? 'active' : ''}`}
          onClick={() => setMode('photo')}
        >
          📷 Upload Photo
        </button>
        <button
          className={`tab ${mode === 'describe' ? 'active' : ''}`}
          onClick={() => setMode('describe')}
        >
          ✏️ Describe It
        </button>
      </div>

      {/* Input area */}
      {mode === 'photo' ? (
        <div
          className={`drop-zone ${dragOver ? 'drag-over' : ''} ${imagePreview ? 'has-image' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="image-preview-wrap">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button
                className="clear-image"
                onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null) }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="drop-prompt">
              <div className="drop-icon">🧱</div>
              <p className="drop-text">Drop a photo here</p>
              <p className="drop-sub">or click to browse</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
          />
        </div>
      ) : (
        <textarea
          className="describe-input"
          placeholder="Describe what you want to build in Lego... e.g. 'a small red fire truck' or 'the Eiffel Tower'"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      )}

      {mode === 'photo' && imagePreview && (
        <textarea
          className="describe-input small"
          placeholder="Optional: add context about the photo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      )}

      {/* Complexity */}
      <div className="complexity-row">
        <span className="complexity-label">Complexity</span>
        <div className="complexity-pills">
          {COMPLEXITY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`complexity-pill ${complexity === opt.id ? 'active' : ''}`}
              onClick={() => setComplexity(opt.id)}
            >
              <span className="pill-label">{opt.label}</span>
              <span className="pill-bricks">{opt.bricks}</span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {/* CTA */}
      <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
        {loading ? (
          <span className="loading-row">
            <span className="spinner" /> Analysing…
          </span>
        ) : (
          'Build My Instructions →'
        )}
      </button>

      <style jsx>{`
        .input-zone {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 560px;
        }
        .mode-tabs {
          display: flex;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          padding: 4px;
          gap: 4px;
        }
        .tab {
          flex: 1;
          padding: 10px 16px;
          border: none;
          background: transparent;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .tab.active {
          background: white;
          color: var(--color-text-primary);
          box-shadow: var(--shadow-sm);
        }
        .drop-zone {
          border: 2px dashed var(--color-border-primary);
          border-radius: var(--radius-lg);
          padding: 40px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.15s;
          background: var(--color-bg-secondary);
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .drop-zone:hover, .drop-zone.drag-over {
          border-color: var(--lego-red);
          background: #fef2f2;
        }
        .drop-zone.has-image {
          border-style: solid;
          border-color: var(--color-border-primary);
          padding: 8px;
          cursor: default;
        }
        .drop-icon { font-size: 36px; margin-bottom: 10px; }
        .drop-text {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0 0 4px;
        }
        .drop-sub {
          font-size: 13px;
          color: var(--color-text-tertiary);
          margin: 0;
        }
        .image-preview-wrap {
          position: relative;
          width: 100%;
          max-height: 220px;
          border-radius: 10px;
          overflow: hidden;
        }
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 10px;
        }
        .clear-image {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.5);
          color: white;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .describe-input {
          width: 100%;
          border: 2px solid var(--color-border-primary);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text-primary);
          background: var(--color-bg-secondary);
          resize: none;
          transition: border-color 0.15s;
          line-height: 1.5;
        }
        .describe-input:focus {
          outline: none;
          border-color: var(--lego-red);
          background: white;
        }
        .describe-input::placeholder { color: var(--color-text-tertiary); }
        .describe-input.small { min-height: unset; }
        .complexity-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .complexity-label {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .complexity-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .complexity-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 14px;
          border: 2px solid var(--color-border-primary);
          border-radius: var(--radius-md);
          background: white;
          cursor: pointer;
          transition: all 0.15s;
          gap: 2px;
        }
        .complexity-pill.active {
          border-color: var(--lego-red);
          background: #fff5f5;
        }
        .complexity-pill:hover:not(.active) {
          border-color: var(--color-text-secondary);
        }
        .pill-label {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--color-text-primary);
        }
        .pill-bricks {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-tertiary);
        }
        .error-msg {
          font-size: 13px;
          color: var(--lego-red);
          font-weight: 600;
          margin: 0;
        }
        .generate-btn {
          width: 100%;
          padding: 16px 24px;
          background: var(--lego-red);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.15s var(--ease-bounce);
          letter-spacing: -0.01em;
        }
        .generate-btn:hover:not(:disabled) {
          background: var(--lego-red-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(227,0,11,0.35);
        }
        .generate-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .generate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
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
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
