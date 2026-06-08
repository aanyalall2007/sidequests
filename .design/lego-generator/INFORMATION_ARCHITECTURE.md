# Information Architecture: Lego Instruction Generator

## Site Map

- Home (Generator) `/`
  - Interpretation Preview `/preview` (modal/overlay, not a separate route)
  - Booklet Viewer `/booklet/[id]`
    - Page view `/booklet/[id]?page=[n]`
- About `/about` (lightweight, secondary)

The app is essentially single-flow. 80% of time is spent on `/` (input) and `/booklet/[id]` (output). The preview step is an in-place overlay on `/`, not a separate page.

## Navigation Model

- **Primary navigation**: Minimal — just the LEGO-style wordmark/logo top-left, linking back to `/`. No nav items needed for v1 (the app is one flow).
- **Secondary navigation**: Inside the booklet viewer, prev/next page controls + page counter. These are the only navigation controls needed mid-flow.
- **Utility navigation**: "Download PDF" button, fixed top-right inside the booklet viewer. "Start over" link returns to `/`.
- **Mobile navigation**: No hamburger needed. Bottom-fixed bar inside booklet viewer with prev/next + download.

## Content Hierarchy

### Home `/`

1. **Input zone** (upload photo OR text description) — This is the entire purpose of the page. Nothing competes with it.
2. **Brick complexity selector** (Simple / Standard / Advanced) — Needed before generation, placed directly below input.
3. **Generate CTA** — Large, prominent button. Single action on the page.
4. **Example outputs / sample booklets** — Below the fold. Social proof that the output looks like a real Lego booklet.

### Interpretation Preview (overlay on `/`)

1. **AI's simplified model description** — Text summary of what the AI "sees" and will build.
2. **Brick count + color palette** — Shows what bricks will be used.
3. **Approve button** — Primary CTA. Starts full booklet generation.
4. **Edit / Regenerate** — Secondary action. Lets user tweak the description and re-run interpretation.

### Booklet Viewer `/booklet/[id]`

1. **Current instruction page** — Full-bleed booklet page render (powder blue, isometric bricks). Occupies 90% of viewport.
2. **Page navigation** (prev/next) — Minimal, never obscures content.
3. **Page counter** — "Page 4 of 14" top-right or bottom.
4. **Download PDF** — Fixed button, always accessible.
5. **Start Over** — Escape hatch, low prominence.

## User Flows

### Primary Flow: Generate from Photo

1. User lands on `/`
2. Sees upload zone + description field (tabbed: "Upload Photo" / "Describe It")
3. User uploads photo (drag-drop or click)
4. User selects brick complexity (Simple / Standard / Advanced) — default: Standard
5. User clicks **Generate**
   - Loading state: "Analysing your photo…" (~5s)
6. Interpretation preview overlay appears
   - Shows: model name, description, brick count estimate, dominant colors
   - If user clicks **Approve** → full booklet generation begins
   - If user clicks **Edit** → description field becomes editable, re-run interpretation
7. Booklet generation: "Building your instructions…" progress animation (~20-30s)
8. Booklet viewer opens at `/booklet/[id]`, cover page shown
9. User pages through instructions
10. User clicks **Download PDF** → PDF downloads

### Alternate Flow: Generate from Description

Same as above but step 3 is: user types a description (e.g. "a small red fire truck"). No photo needed.

### Return Flow: Start Over

From booklet viewer → click "Start Over" → returns to `/` with input cleared.

## Naming Conventions

| Concept | Label in UI | Notes |
|---|---|---|
| The thing being built | "model" | Not "object", "design", or "creation" |
| The output document | "instructions" | Not "booklet" or "guide" in UI labels |
| The AI preview step | "Preview" | Not "draft" or "interpretation" |
| Brick quantity categories | "Simple", "Standard", "Advanced" | Not "easy/medium/hard" — matches Lego tone |
| Starting a new generation | "Start over" | Not "reset" or "new project" |
| The step-by-step pages | "Steps" | Not "instructions" (reserved for the full document) |

## Component Reuse Map

| Component | Used on | Behavior differences |
|---|---|---|
| Lego-style wordmark header | All pages | Links to `/` everywhere |
| Loading/progress overlay | Home (interpretation), Home (booklet gen) | Different messages per stage |
| Booklet page renderer | Booklet viewer (primary), Home (sample preview below fold) | Full-size vs. thumbnail in samples |
| Download PDF button | Booklet viewer | Fixed position on desktop, bottom bar on mobile |
| Error state | Home, Booklet viewer | Inline on home, overlay on viewer |

## Content Growth Plan

v1 is stateless — no saved booklets, no user accounts. The only "growth" is within a single session:
- Generated booklets live at `/booklet/[id]` with a session-scoped ID (UUID stored in memory/URL)
- If user refreshes, session is lost — this is acceptable for v1
- v2 consideration: save booklets to a gallery at `/gallery` — IA already accommodates this with the `/booklet/[id]` URL pattern

## URL Strategy

- Pattern: `/booklet/[uuid]`
- Dynamic segments: `[id]` is a UUID generated at booklet creation time
- Query parameters: `?page=[n]` for deep-linking to a specific step (optional, progressive enhancement)
- No slug or user-generated path — avoids naming collisions and keeps it simple
