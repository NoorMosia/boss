# Design Principles

## Visual Identity

- Flat UI only — no shadows, no gradients, no glassmorphism, no blur effects on containers
- Warm parchment palette: `#fbf6ed` background, deep green accent (`#2d5016`), off-whites, muted borders
- One accent color used sparingly: play button, active nav indicator, progress bar fill
- Hierarchy through spacing and type weight — never through decoration
- Logo always has `border-radius: 8px`
- Imagery is real photography from `assets/artist/visuals/` — never stock, never AI-generated

## Typography

- Satoshi is the only typeface — no secondary font, no decorative fonts
- Hierarchy via weight (400, 500, 700) and size scale — never via font family change
- Fluid type using `clamp()` across all breakpoints
- Body text: regular weight. Headings: bold. Labels/muted: medium weight

## Animation (Emil Kowalski Principles)

- Custom easing curves only — never use browser defaults:
  - Ease-out: `cubic-bezier(0.23, 1, 0.32, 1)` — for entrances and UI feedback
  - Ease-in-out: `cubic-bezier(0.77, 0, 0.175, 1)` — for on-screen movement
- UI animations must stay under 300ms
- Scroll reveal animations can be 400-600ms (decorative, seen once)
- Stagger delays: 50-80ms between items, never longer
- Never animate from `scale(0)` — start from 0.95 minimum, combined with opacity
- `:active` scale(0.97) on all pressable/clickable elements
- Hover animations gated behind `@media (hover: hover) and (pointer: fine)`
- `prefers-reduced-motion`: disable all transform/position motion, keep opacity fades
- No animation on keyboard-initiated actions

## Scroll & Motion

- Lenis provides physics-based smooth scrolling — it must feel weighted, not floaty
- GSAP ScrollTrigger handles all scroll-linked reveals
- Parallax: subtle (0.3x speed ratio maximum) — never aggressive
- Video auto-plays muted on scroll into view, pauses on exit

## Tone & Content

- Minimal copy — let the music and visuals speak
- Bio: one paragraph, third-person informal, understated
- No promotional language, no superlatives, no "best" or "amazing"
- Discography: track title only, no credits, no genre tags, no descriptions

## Brand Rules

- "tszuk" appears exactly twice on the entire site:
  1. Strategic brand partnership statement
  2. Visual collaboration credit
- Both appear in the partnership credit section only — never in nav, hero, bio, or footer
- The site should never feel like it's advertising tszuk — it exists for Boss Reminisce
