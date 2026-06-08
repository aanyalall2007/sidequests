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
        <button onClick={() => handleDownload(booklet)} className="download-btn">
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

function handleDownload(booklet: BookletData) {
  const pages = buildPages(booklet)

  const renderBrickBox = (bricks: BookletData['inventory']) =>
    bricks.slice(0, 6).map(b => `
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
        <div style="width:${Math.min(b.width * 16, 60)}px;height:${b.type === 'plate' ? 10 : 18}px;background:${b.colorHex};border-radius:3px;border:1px solid rgba(0,0,0,0.15);"></div>
        <span style="font-size:11px;font-weight:800;color:#1A1A1A;">${b.quantity}x</span>
      </div>`).join('')

  const renderStepPanel = (step: import('@/lib/types').InstructionStep) => `
    <div style="flex:1;padding:14px 16px 8px;display:flex;flex-direction:column;gap:8px;min-width:0;">
      <div style="display:flex;flex-wrap:wrap;gap:5px;background:rgba(255,255,255,0.45);border:1.5px solid rgba(255,255,255,0.7);border-radius:10px;padding:6px 8px;min-height:40px;align-items:center;">
        ${renderBrickBox(step.bricks)}
      </div>
      <div style="font-size:52px;font-weight:900;color:#1A1A1A;letter-spacing:-0.03em;line-height:1;">${step.stepNumber}</div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:4px 0;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
          ${step.bricks.map(b => `
            <div style="width:${Math.min(b.width * 18, 72)}px;height:${b.type === 'plate' ? 12 : 22}px;background:${b.colorHex};border-radius:3px;border:1px solid rgba(0,0,0,0.2);"></div>
          `).join('')}
        </div>
        <div style="font-size:12px;color:#333;text-align:center;line-height:1.5;max-width:260px;">${step.instruction}</div>
      </div>
    </div>`

  const pagesHTML = pages.map((page, i) => {
    const pct = pages.length > 1 ? (i / (pages.length - 1)) * 100 : 0
    const progressBar = `
      <div style="position:absolute;bottom:10px;left:20px;right:20px;display:flex;align-items:center;gap:8px;">
        <div style="flex:1;height:3px;background:rgba(0,0,0,0.15);border-radius:99px;">
          <div style="width:${pct}%;height:100%;background:#0057A8;border-radius:99px;"></div>
        </div>
        <span style="font-size:10px;font-weight:700;color:#3A3A3A;">${i + 1}</span>
      </div>`

    if (page.type === 'cover') return `
      <div class="booklet-page" style="background:#C5DDEF;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;position:relative;">
        <div style="position:absolute;top:20px;left:20px;background:#E3000B;color:white;font-weight:900;font-size:20px;padding:3px 9px;border-radius:5px;border:2px solid #a00008;">LEGO</div>
        <div style="font-size:14px;font-weight:700;position:absolute;bottom:24px;left:24px;color:#1A1A1A;">${booklet.setNumber}</div>
        <div style="font-size:44px;font-weight:900;color:#1A1A1A;letter-spacing:-0.02em;text-align:center;margin-top:40px;">${booklet.title}</div>
        <div style="font-size:15px;font-weight:700;color:#3A3A3A;text-transform:uppercase;letter-spacing:0.04em;margin-top:8px;">${booklet.totalBricks} pieces</div>
      </div>`

    if (page.type === 'inventory') return `
      <div class="booklet-page" style="background:#C5DDEF;padding:24px 24px 44px;position:relative;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
          <span style="font-size:20px;font-weight:900;color:#1A1A1A;">Parts List</span>
          <span style="font-size:13px;font-weight:700;color:#3A3A3A;text-transform:uppercase;">${booklet.totalBricks} pieces</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${booklet.inventory.map(b => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;background:rgba(255,255,255,0.45);border:1.5px solid rgba(255,255,255,0.7);border-radius:10px;padding:7px 9px;min-width:54px;">
              <div style="width:${Math.min(b.width * 14, 52)}px;height:${b.type === 'plate' ? 10 : 18}px;background:${b.colorHex};border-radius:3px;border:1px solid rgba(0,0,0,0.12);"></div>
              <span style="font-size:11px;font-weight:800;color:#1A1A1A;">${b.quantity}x</span>
              <span style="font-size:9px;color:#555;text-align:center;max-width:52px;">${b.name}</span>
            </div>`).join('')}
        </div>
        ${progressBar}
      </div>`

    // Step page
    const [left, right] = page.steps!
    return `
      <div class="booklet-page" style="background:#C5DDEF;position:relative;overflow:hidden;">
        <div style="display:flex;height:calc(100% - 28px);">
          ${renderStepPanel(left)}
          ${right ? `<div style="width:1.5px;background:#9BBFD8;margin:14px 0;flex-shrink:0;"></div>${renderStepPanel(right)}` : ''}
        </div>
        ${progressBar}
      </div>`
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${booklet.title} — Lego Instructions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Nunito', sans-serif; background: #eee; }
    .booklet-page {
      width: 277mm; height: 190mm;
      margin: 10mm auto;
      border-radius: 6px;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    @media print {
      body { background: white; }
      .booklet-page { margin: 0; border-radius: 0; box-shadow: none; width: 100%; height: 100vh; }
    }
  </style>
</head>
<body>
  ${pagesHTML}
  <script>window.onload = () => { setTimeout(() => window.print(), 800) }<\/script>
</body>
</html>`

  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close() }
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
