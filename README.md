# aanu's closet — prototype

A quick static HTML/CSS/JS prototype for a personal styling app. Style is
lifted from `222.place` (Crimson Pro serif, dark forest green + cream,
lowercase copy, pill buttons, playful tilt on hover).

## Run it
Just open `index.html` in a browser — no build step, no dependencies.

## Files
- `index.html` — the closet grid, filterable by tag (empty state until you add pieces)
- `wishlist.html` — things to buy, sourced from the "twenny six / looks" Pinterest board + niche India shops, budgeted ₹1,000–3,000
- `chat.html` — outfit curator chat (currently simulated locally, see below)
- `style.css` — all styling / design tokens
- `data.js` — `closetItems` (empty array to start) and `wishlist` (seeded)
- `script.js` — rendering + chat logic

## Bringing this into Claude Code / the `sidequests` repo
This repo already has Next.js 16 + Tailwind v4 + `@anthropic-ai/sdk` set up
(used by the Lego generator sidequest), so the cleanest move is to port this
into a new route rather than starting fresh:

1. `app/aanus-closet/page.tsx` ← `index.html` body + `data.js` closetItems (read from a JSON file instead of a JS array)
2. `app/aanus-closet/wishlist/page.tsx` ← `wishlist.html` + wishlist data
3. `app/aanus-closet/chat/page.tsx` ← `chat.html`, converted to a client component
4. `app/aanus-closet/closet.css` ← `style.css`, scoped under a `.closet-theme` wrapper so it doesn't clash with the Lego app's tokens
5. `app/api/aanus-closet/chat/route.ts` ← new API route, calls `@anthropic-ai/sdk` server-side using `process.env.ANTHROPIC_API_KEY` (add that key in Vercel project settings — never commit it or put it in client JS)
6. Replace `getOutfitSuggestion()` in `script.js` with the real `fetch('/api/aanus-closet/chat')` call (the exact drop-in code is commented directly above that function)

## Adding clothes (the actual workflow)
There's no upload backend — this is a static site. The intended flow:
1. Photograph a piece.
2. Send it to Claude and say "add this to aanu's closet, tag: going out" (or whatever tag).
3. Claude removes the background, saves the cutout image, and adds an entry to the closet data (`{ id, name, image, tags }`).
4. Commit + push.

## Pinterest wishlist refresh
Re-check the "twenny six / looks" board roughly every 2 weeks and refresh
`wishlist` in `data.js` — ask Claude to "refresh my aanu's closet wishlist
from pinterest" to trigger a re-scrape and re-match.
