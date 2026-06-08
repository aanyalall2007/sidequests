# Design Brief: Lego Instruction Generator

## Problem

You have an idea — a photo of your dog, a rough sketch, a description of a castle — and no way to turn it into something you can actually build with Lego bricks. Official Lego sets are fixed. Custom MOC instructions require expert knowledge. There's no tool that takes *your* thing and hands you a proper step-by-step booklet.

## Solution

An AI-powered web app that turns any photo or text description into a Lego instruction booklet — designed to look and feel exactly like the real thing. The experience: upload a photo (or type a description), set a brick count target, watch the AI generate a simplified Lego interpretation for your approval, then receive a full multi-step instruction booklet you can view in the browser or download as a PDF.

The output is not a list of steps. It is a Lego booklet — powder blue background, isometric brick renders, red placement arrows, brick inventory boxes, progress bar, page numbers. Indistinguishable in format from an official set.

## Experience Principles

1. **Magic first, complexity later** — The wow moment (photo → booklet) must happen within 30 seconds of upload. Settings and customization never block the core flow.
2. **Faithful to the format** — Every output page must feel like a real Lego instruction. If it doesn't look like it came from a box, it has failed.
3. **Approve before commit** — The AI shows a simplified 3D interpretation of the model before generating full instructions. The user confirms or tweaks before the full booklet is produced.

## Aesthetic Direction

- **Philosophy**: Faithful replica — the UI of the *app* is clean and minimal (so it doesn't compete), but the *output* is a high-fidelity recreation of official Lego instruction design.
- **Tone**: Playful, confident, familiar. Feels like opening a new Lego set.
- **Reference points**: Official Lego instruction PDFs (set 40749 BrickHeadz). Lego.com branding — red `#E3000B`, yellow `#F7D117`, powder blue `#C5DDEF`. Bold rounded sans-serif type.
- **Anti-references**: Generic AI tool UIs (gray gradients, Tailwind defaults). Anything that looks like a "builder tool" or CAD software.

## Lego Instruction Booklet Spec (output format)

Derived from official PDF analysis:

- **Background**: Powder blue `#C5DDEF` on every instruction page
- **Cover page**: LEGO logo top-left, set name + generated title, large model render centered, set number bottom-left
- **Parts inventory page**: Grid of brick icons with quantities, rounded rect container, light background
- **Step pages**: Two steps per page, divided by vertical line. Each step has:
  - Rounded rect brick inventory box (top, shows only bricks for this step)
  - Large bold step number (black, ~72px)
  - Isometric 3D brick render with red arrows showing placement
  - Cream `#F5ECD0` sub-step callout box for complex multi-part steps
  - Progress bar at bottom (thin blue line, filled dot tracking page position)
- **Final page**: Completed model from multiple angles, legal notice

## Brick Complexity Tiers

User selects before generation:
- **Simple** (~50 bricks) — great for kids, fast build
- **Standard** (~100 bricks) — balanced
- **Advanced** (~200+ bricks) — detailed replica

## Component Inventory

| Component | Status | Notes |
|---|---|---|
| Upload / Describe input | New | Photo upload + text description textarea, toggle between modes |
| Brick count selector | New | Three-option pill selector (Simple / Standard / Advanced) |
| AI interpretation preview | New | Shows simplified 3D model render before full generation, approve/tweak CTA |
| Instruction booklet viewer | New | Multi-page viewer, powder blue BG, step-by-step navigation |
| Cover page | New | LEGO-style cover with generated title and model preview |
| Parts inventory page | New | Grid of brick icons with quantities |
| Step page | New | Two-up layout, brick box, step number, isometric render, progress bar |
| PDF export | New | Download the full booklet as a formatted PDF |
| Loading / generation state | New | Progress indicator during AI generation (~30s) |

## Key Interactions

**Upload flow:**
1. User lands on home — sees upload zone + text description field
2. Selects brick complexity tier
3. Clicks Generate → loading state (~5s for interpretation)
4. AI shows: simplified model description + brick list preview
5. User clicks Approve (or edits description and regenerates interpretation)
6. Full booklet generates (~20-30s), page-by-page reveal animation
7. Booklet viewer opens — user can page through or download PDF

**Booklet viewer:**
- Arrow keys / swipe to navigate pages
- Progress bar at bottom shows position
- Download button fixed in corner
- Clicking a brick in inventory highlights it in the step render

## Responsive Behavior

- **Desktop (1280px+)**: Two-column — input panel left, booklet preview right
- **Tablet (768-1279px)**: Single column, booklet viewer full-width below input
- **Mobile (< 768px)**: Upload/describe first, booklet opens as full-screen overlay after generation. PDF download is primary CTA.

The booklet viewer itself always renders at a fixed aspect ratio (landscape, matching real Lego booklet proportions: ~4:3).

## Accessibility Requirements

- Minimum 4.5:1 contrast on all text (the powder blue background requires care)
- Full keyboard navigation through booklet pages (arrow keys, tab)
- Alt text on all generated brick renders
- Screen reader announces current step number and brick counts

## Tech Stack

- **Next.js 14** (App Router) — frontend + API routes
- **Claude API** (claude-sonnet-4-6, vision) — photo analysis + instruction generation
- **React-PDF / jsPDF** — PDF export
- **SVG** — brick diagrams rendered in-browser
- **Vercel** — deployment

## Out of Scope

- 3D model viewer / interactive assembly (v1 uses 2.5D isometric SVG)
- User accounts, saved history, sharing links (v1 only)
- Exact Lego part numbers / BrickLink integration
- Mobile app (web only for v1)
- Multiple language support
