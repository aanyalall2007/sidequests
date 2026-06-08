'use client'

import { useState, useCallback, useEffect } from 'react'
import type { BookletData } from '@/lib/types'
import CoverPage from './booklet/CoverPage'
import InventoryPage from './booklet/InventoryPage'
import StepPage from './booklet/StepPage'

interface BookletViewerProps {
  booklet: BookletData
  onStartOver: () => void
}

export default function BookletViewer({ booklet, onStartOver }: BookletViewerProps) {
  const pages = buildPages(booklet)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection('next')
      setCurrentPage(p => p + 1)
    }
  }, [currentPage, pages.length])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection('prev')
      setCurrentPage(p => p - 1)
    }
  }, [currentPage])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const page = pages[currentPage]

  return (
    <div className="viewer-wrap">
      {/* Header bar */}
      <div className="viewer-header">
        <button onClick={onStartOver} className="start-over-btn">
          ← Start Over
        </button>
        <span className="page-counter">Page {currentPage + 1} of {pages.length}</span>
        <button onClick={handleDownload} className="download-btn">
          Download PDF
        </button>
      </div>

      {/* Booklet */}
      <div className="booklet-container">
        <button
          className="nav-btn prev"
          onClick={goPrev}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div className="booklet-shadow" id="booklet-export">
          {page.type === 'cover' && <CoverPage booklet={booklet} />}
          {page.type === 'inventory' && (
            <InventoryPage booklet={booklet} pageNumber={currentPage + 1} totalPages={pages.length} />
          )}
          {page.type === 'step' && (
            <StepPage
              steps={page.steps!}
              pageNumber={currentPage + 1}
              totalPages={pages.length}
            />
          )}
        </div>

        <button
          className="nav-btn next"
          onClick={goNext}
          disabled={currentPage === pages.length - 1}
          aria-label="Next page"
        >
          ›
        </button>
      </div>

      {/* Dot pagination */}
      <div className="dots">
        {pages.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .viewer-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
          padding: 24px 16px;
        }
        .viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 900px;
        }
        .start-over-btn {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 0;
          transition: color 0.15s;
        }
        .start-over-btn:hover { color: var(--color-text-primary); }
        .page-counter {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-tertiary);
          letter-spacing: 0.04em;
        }
        .download-btn {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: white;
          background: var(--lego-red);
          border: none;
          border-radius: var(--radius-full);
          padding: 8px 20px;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .download-btn:hover {
          background: var(--lego-red-dark);
          transform: translateY(-1px);
        }
        .booklet-container {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 980px;
        }
        .booklet-shadow {
          flex: 1;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow-booklet);
        }
        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--color-border-primary);
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
          font-size: 24px;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s;
          line-height: 1;
        }
        .nav-btn:hover:not(:disabled) {
          background: var(--color-bg-secondary);
          border-color: var(--color-text-secondary);
        }
        .nav-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }
        .dots {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 300px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--color-border-primary);
          cursor: pointer;
          transition: all 0.15s;
          padding: 0;
        }
        .dot.active {
          background: var(--lego-red);
          transform: scale(1.3);
        }
        @media (max-width: 600px) {
          .nav-btn { display: none; }
          .booklet-container { gap: 0; }
        }
      `}</style>
    </div>
  )
}

function handleDownload() {
  window.print()
}

type Page =
  | { type: 'cover' }
  | { type: 'inventory' }
  | { type: 'step'; steps: [import('@/lib/types').InstructionStep, import('@/lib/types').InstructionStep?] }

function buildPages(booklet: BookletData): Page[] {
  const pages: Page[] = [{ type: 'cover' }, { type: 'inventory' }]
  const steps = booklet.steps
  for (let i = 0; i < steps.length; i += 2) {
    pages.push({
      type: 'step',
      steps: steps[i + 1]
        ? [steps[i], steps[i + 1]]
        : [steps[i]],
    })
  }
  return pages
}
