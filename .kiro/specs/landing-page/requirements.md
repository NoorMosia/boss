# Requirements Document

## Introduction

This document defines the requirements for the Boss Reminisce landing page — a minimalistic, artsy, and authentic single-page website built for a strategic long-term brand partner of tszuk. The site must impress through craft, motion, and restraint. Flat UI, no AI aesthetic, no framework fingerprint. Every detail should feel intentional and handmade.

The primary audience is fans, industry contacts, and new listeners discovering Boss Reminisce. The site serves as a digital home: showcasing music, visuals, and upcoming events with a focus on experience over information density.

## Glossary

| Term | Definition |
|------|------------|
| Card deck | A stacked UI pattern where items are layered on top of each other, navigated by swiping or clicking arrows |
| Bento grid | An asymmetric CSS grid layout with mixed column/row spans, inspired by Japanese bento box compartments |
| Lenis | A lightweight smooth scroll library providing physics-based scrolling behavior |
| GSAP | GreenSock Animation Platform — an industry-standard JavaScript animation library |
| ScrollTrigger | A GSAP plugin that triggers animations based on scroll position |
| Stagger | A technique where multiple elements animate sequentially with a small delay between each |
| Clip-path reveal | An animation technique using CSS `clip-path: inset()` to progressively reveal an element |
| Emil Kowalski principles | A set of animation craft guidelines emphasizing custom easing curves, sub-300ms UI timing, and physics-based motion |
| Astro | A static site framework that ships zero JavaScript by default and renders components to HTML at build time |
| Island | In Astro, a component that hydrates client-side JavaScript on an otherwise static page |

## Requirements

## Functional Requirements

### FR-1: Navigation
- Fixed/sticky nav with logo (border-radius applied) and section links
- Links: Discography, Archive, Sessions
- Slide-in underline hover animation on nav links
- Mobile: collapsed hamburger or minimal toggle

### FR-2: Hero Section
- Tagline: "Melody meets lyricism."
- **Portrait:** `assets/artist/visuals/pe3.jpg` as focal visual
- Choreographed entrance sequence: logo → tagline (character/word stagger) → portrait (fade + scale)
- Parallax shift on portrait during scroll

### FR-3: Discography
- Album cover cards using `assets/artist/visuals/albumCover1-4.jpg`
- Swipeable card deck on mobile (touch gestures with velocity/momentum-based dismissal)
- Arrow navigation on desktop
- Track title only — no genre, no credits, no descriptions
- Integrated custom audio player per track:
  - Minimal waveform bar visualization
  - Smooth GSAP-driven progress bar
  - Morphing play/pause icon transition
  - Accent color on active/playing state
- Supports mp3 files placed in `assets/artist/tracks/`

### FR-4: Visual Archive
- Bento grid layout with images (`assets/artist/visuals/p1.jpg`, `p3.jpg`, `pe1-pe4.jpg`)
- Scroll-triggered clip-path reveals with stagger timing
- `performance.mp4` embedded in the grid:
  - Located at `assets/artist/visuals/performance.mp4`
  - Lazy loaded (loads while page is running)
  - Auto-plays muted when scrolled into view
  - Pauses when scrolled out of view
- Subtle hover interaction on images (slight scale + soft overlay shift)

### FR-5: Upcoming Sessions
- Data sourced from `src/content/sessions.json`
- Each session displays: date, title, location, short description
- Scroll-triggered reveal entrance
- Easy to update (edit JSON, rebuild)

### FR-6: Bio
- Single short paragraph — personal, understated tone
- Third-person but informal (friend telling you about the artist)
- No stats, no quote cards

### FR-7: Footer
- Social media icon links (placeholder `#` hrefs)
- Single credit line: `© 2026 Boss Reminisce`
- No mention of tszuk in the footer

### FR-8: tszuk Partnership Credit
- tszuk name appears exactly TWICE on the entire site:
  1. A brief statement about the strategic brand partnership between Boss Reminisce and tszuk
  2. A credit noting that all visuals on this website are a product of a collaboration between Boss Reminisce and tszuk
- Placement: a small, understated section (could live near the bio or between archive and footer)
- Tone: factual, minimal — not promotional

---

## Non-Functional Requirements

### NFR-1: Performance
- Static output (no SSR), Astro build
- Lazy load video and images below the fold
- GSAP animations on GPU-accelerated properties only (transform, opacity, clip-path)
- Fonts loaded before page reveal (prevent FOUT)
- Target: Lighthouse performance 90+

### NFR-2: Responsive Design
- Fluid layouts across all breakpoints (mobile, tablet, desktop)
- Touch-optimized targets on mobile (min 44px)
- Archive grid adapts from 1-col (mobile) to bento (desktop)
- Card deck swipe on touch, arrows on pointer devices

### NFR-3: Animation & Motion
- Lenis for physics-based smooth scrolling
- GSAP + ScrollTrigger for all scroll-linked animations
- Emil Kowalski principles:
  - Custom ease-out: `cubic-bezier(0.23, 1, 0.32, 1)`
  - Custom ease-in-out: `cubic-bezier(0.77, 0, 0.175, 1)`
  - UI animations under 300ms
  - Stagger delays 50-80ms between items
  - `:active` scale (0.97) on all interactive elements
  - Never animate from scale(0) — start from 0.95+ with opacity
  - Origin-aware transforms on popovers/tooltips
- `prefers-reduced-motion`: disable transform/position animations, keep opacity/color
- Page load transition: brief orchestrated fade-in after fonts ready

### NFR-4: SEO & Social
- Complete `<meta>` tags (title, description, keywords)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags (summary_large_image)
- MusicGroup structured data (JSON-LD)
- Canonical URL
- OG image placeholder path (1200x630)

### NFR-5: Favicon
- Use existing `assets/favicon/` files
- Include apple-touch-icon, android-chrome icons, favicon.ico
- Reference `site.webmanifest`

### NFR-6: Typography
- Satoshi — single typeface, weight variations for hierarchy
- No secondary font
- Type scale through CSS custom properties

### NFR-7: Visual Design
- Flat UI — no shadows, no gradients, no glassmorphism
- Warm parchment palette: `#fbf6ed` (background), deep greens, off-whites
- One accent color for interactive/active states (play button, active nav)
- Clean borders where separation is needed
- Hierarchy through spacing and type weight, not decoration
- Logo with border-radius

### NFR-8: Accessibility
- Semantic HTML throughout
- Proper heading hierarchy
- Alt text on all images
- Keyboard navigable audio player
- Focus-visible styles
- Sufficient color contrast ratios (WCAG AA minimum)
- `prefers-reduced-motion` respected

### NFR-9: Content Management
- Sessions data in `src/content/sessions.json` — editable without code changes
- Track metadata alongside mp3 files or in a companion JSON
- Assets referenced from `assets/artist/visuals/` directory (images, video, logo)
- Audio tracks from `assets/artist/tracks/` directory
