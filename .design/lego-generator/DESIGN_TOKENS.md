# Design Tokens: Lego Instruction Generator

Philosophy: **Faithful replica** — minimal app shell wraps an authentic Lego booklet output.  
Token file: `app/globals.css` (Tailwind v4, CSS custom properties + `@theme` block)

## Brand Primitives

| Token | Value | Use |
|---|---|---|
| `--lego-red` | `#E3000B` | Primary CTA, logo, accents |
| `--lego-red-dark` | `#B5000A` | Hover state for red buttons |
| `--lego-yellow` | `#F7D117` | Secondary accent, highlights |
| `--lego-blue` | `#006CB7` | Links, focus rings |
| `--lego-blue-light` | `#0090D4` | Links in dark mode |

## Booklet Tokens (output pages — never change these)

| Token | Value | Use |
|---|---|---|
| `--booklet-bg` | `#C5DDEF` | Background of every instruction page |
| `--booklet-bg-dark` | `#A8C8E0` | Slightly deeper for card/well zones |
| `--booklet-step-cream` | `#F5ECD0` | Sub-step callout box background |
| `--booklet-arrow` | `#CC0000` | Placement arrows on brick renders |
| `--booklet-progress` | `#0057A8` | Progress bar line and dot |
| `--booklet-divider` | `#9BBFD8` | Vertical divider between two steps |

## Typography

- **Display / Step numbers**: Nunito — weight 800–900, tight tracking
- **Body / UI labels**: Nunito Sans — weight 400–700

Step numbers on booklet pages: `~72px`, weight 900, `letter-spacing: -0.03em`  
Cover display: `~80px`, weight 900

## Spacing Scale (8px base)

`2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128px`

## Border Radius

- `--radius-brick-box: 10px` — brick inventory rounded rects
- `--radius-callout: 14px` — cream sub-step callouts
- `--radius-md: 12px` — general cards/inputs
- `--radius-lg: 20px` — overlays, panels
- `--radius-full: 9999px` — pill buttons

## Booklet Layout

- Aspect ratio: `4 / 3` (landscape, matches real Lego booklets)
- Max width: `900px`
- Always white shadow (`--shadow-booklet`) against the app background
- Booklet pages **never** enter dark mode — they are printed artifacts

## Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states |
| `--duration-normal` | `250ms` | UI transitions |
| `--duration-page` | `350ms` | Booklet page turn |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button press, CTA |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Overlay entry |
