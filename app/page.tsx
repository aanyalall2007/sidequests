'use client'

import { useState } from 'react'
import InputZone from '@/components/InputZone'
import InterpretationPreview from '@/components/InterpretationPreview'
import BookletViewer from '@/components/BookletViewer'
import type { InterpretationData, BookletData } from '@/lib/types'
import { USC_BOOKLET } from '@/lib/demo'

type Stage = 'input' | 'preview' | 'booklet'

export default function Home() {
  const [stage, setStage] = useState<Stage>('input')
  const [interpretation, setInterpretation] = useState<InterpretationData | null>(null)
  const [booklet, setBooklet] = useState<BookletData | null>(null)
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [description, setDescription] = useState<string | undefined>()

  const handleInterpretation = (data: InterpretationData, img?: File, desc?: string) => {
    setInterpretation(data)
    setImageFile(img)
    setDescription(desc)
    setStage('preview')
  }

  const handleBooklet = (data: BookletData) => {
    setBooklet(data)
    setStage('booklet')
  }

  const handleStartOver = () => {
    setStage('input')
    setInterpretation(null)
    setBooklet(null)
    setImageFile(undefined)
    setDescription(undefined)
  }

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={handleStartOver} style={{ cursor: 'pointer' }}>
          <span className="logo-lego">LEGO</span>
          <span className="logo-text">Brick Builder</span>
        </div>
        <p className="tagline">AI-powered building instructions</p>
      </header>

      {/* Main content */}
      <main className="main">
        {stage === 'input' && (
          <div className="hero">
            <div className="hero-copy">
              <h1 className="hero-title">
                Turn anything into<br />
                <span className="hero-accent">Lego instructions</span>
              </h1>
              <p className="hero-sub">
                Upload a photo or describe what you want to build.
                We&apos;ll generate a real step-by-step booklet — just like the one in the box.
              </p>
              <button className="demo-btn" onClick={() => handleBooklet(USC_BOOKLET)}>
                👀 See a sample — USC Village Clock Tower
              </button>
            </div>
            <InputZone onInterpretation={handleInterpretation} />
          </div>
        )}

        {stage === 'booklet' && booklet && (
          <BookletViewer booklet={booklet} onStartOver={handleStartOver} />
        )}
      </main>

      {/* Preview overlay */}
      {stage === 'preview' && interpretation && (
        <InterpretationPreview
          interpretation={interpretation}
          imageFile={imageFile}
          description={description}
          onApprove={handleBooklet}
          onEdit={handleStartOver}
        />
      )}

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-primary);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid var(--color-border-secondary);
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-lego {
          background: var(--lego-red);
          color: white;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 18px;
          letter-spacing: -0.02em;
          padding: 3px 8px;
          border-radius: 4px;
          border: 2px solid #a00008;
          box-shadow: inset 0 -2px 0 rgba(0,0,0,0.2);
        }
        .logo-text {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }
        .tagline {
          font-size: 13px;
          color: var(--color-text-tertiary);
          font-weight: 600;
          margin: 0;
        }
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 48px;
          padding: 60px 24px 80px;
        }
        .hero-copy {
          text-align: center;
          max-width: 560px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 900;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .hero-accent {
          color: var(--lego-red);
        }
        .hero-sub {
          font-size: clamp(15px, 2vw, 17px);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0 0 12px;
        }
        .demo-btn {
          background: none;
          border: 1.5px dashed var(--color-border-primary);
          border-radius: var(--radius-full);
          padding: 10px 20px;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.15s;
        }
        .demo-btn:hover {
          border-color: var(--lego-red);
          color: var(--lego-red);
          background: #fff5f5;
        }
        @media (max-width: 600px) {
          .header { padding: 16px 20px; }
          .tagline { display: none; }
          .hero { padding: 40px 20px 60px; gap: 32px; }
        }
      `}</style>
    </div>
  )
}
