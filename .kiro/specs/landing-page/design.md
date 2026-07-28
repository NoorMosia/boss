# Design: Boss Reminisce Landing Page

## Overview

A single-page static landing site for Boss Reminisce, built with Astro and hand-written CSS. The site prioritizes craft, motion, and authenticity — using GSAP + Lenis for physics-based scroll animations, a custom swipeable card deck for discography, and an integrated audio player. Flat UI, Satoshi typeface, warm parchment palette. No frameworks, no AI aesthetic. Designed to impress through invisible details that compound into something that feels intentional and handmade.

## Architecture

```
boss/
├── .kiro/
│   └── specs/landing-page/
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
├── src/
│   ├── layouts/
│   │   └── Base.astro              # HTML shell, meta, fonts, global styles, scripts
│   ├── pages/
│   │   └── index.astro             # Single page, composes all sections
│   ├── components/
│   │   ├── Nav.astro               # Sticky nav with logo + links
│   │   ├── Hero.astro              # Tagline + portrait
│   │   ├── Discography.astro       # Card deck wrapper
│   │   ├── AudioPlayer.astro       # Custom player shell (hydrated via JS)
│   │   ├── VisualArchive.astro     # Bento grid with images + video
│   │   ├── Sessions.astro          # Upcoming sessions list
│   │   ├── Bio.astro               # Single paragraph bio
│   │   ├── PartnershipCredit.astro # tszuk partnership + visual collab credit
│   │   └── Footer.astro            # Socials + copyright
│   ├── scripts/
│   │   ├── smooth-scroll.js        # Lenis initialization
│   │   ├── animations.js           # GSAP + ScrollTrigger setup for all sections
│   │   ├── card-deck.js            # Swipeable card deck logic (touch + arrows)
│   │   ├── audio-player.js         # HTML5 Audio API controller + waveform
│   │   └── video-autoplay.js       # IntersectionObserver for video play/pause
│   ├── styles/
│   │   ├── global.css              # Reset, custom properties, base typography
│   │   ├── layout.css              # Grid systems, spacing utilities
│   │   └── components.css          # Component-specific styles
│   └── content/
│       └── sessions.json           # Upcoming sessions data
├── assets/
│   ├── artist/
│   │   ├── visuals/
│   │   │   ├── albumCover1-4.jpg       # Discography covers
│   │   │   ├── pe1-pe4.jpg, p1.jpg, p3.jpg  # Archive + hero images
│   │   │   ├── logo.png                # Brand logo
│   │   │   └── performance.mp4         # Archive video
│   │   └── tracks/                 # MP3 files (user-provided)
│   │       └── *.mp3
│   └── favicon/                    # Existing favicon set
├── public/
│   └── og-image.jpg                # Social sharing image (1200x630)
├── astro.config.mjs
└── package.json
```

---

## Design Tokens (CSS Custom Properties)

```css
:root {
  /* Colors */
  --color-bg: #fbf6ed;
  --color-bg-alt: #f3ece0;
  --color-text: #1a1a1a;
  --color-text-muted: #5c5c5c;
  --color-accent: #2d5016;          /* Deep green — accent moments */
  --color-accent-light: #4a7c2e;
  --color-border: #e0d9cc;
  --color-overlay: rgba(26, 26, 26, 0.04);

  /* Typography */
  --font-family: 'Satoshi', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-hero: clamp(2.5rem, 2rem + 3vw, 5rem);

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;
  --space-3xl: 10rem;

  /* Animation (Emil Kowalski curves) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;

  /* Layout */
  --max-width: 1200px;
  --nav-height: 4rem;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

---

## Components and Interfaces

### Astro Components (`.astro` files — server-rendered, zero JS by default)

| Component | Props / Inputs | Output |
|-----------|---------------|--------|
| `Base.astro` | `title?: string`, `description?: string` | HTML shell with meta, fonts, scripts |
| `Nav.astro` | none | Fixed nav with logo + anchor links |
| `Hero.astro` | none | Tagline + portrait with animation targets |
| `Discography.astro` | none (reads track data internally) | Card deck + audio player shell |
| `AudioPlayer.astro` | `tracks: Track[]` | Player markup with waveform + controls |
| `VisualArchive.astro` | none | Bento grid of images + video |
| `Sessions.astro` | `sessions: Session[]` | List of upcoming sessions |
| `Bio.astro` | none | Single paragraph section |
| `PartnershipCredit.astro` | none | tszuk partnership statement + visual collaboration credit |
| `Footer.astro` | none | Socials + copyright line (no tszuk) |

### Client-Side Scripts (vanilla JS — loaded as Astro `<script>` tags)

| Script | Responsibility | Exports / API |
|--------|---------------|---------------|
| `smooth-scroll.js` | Lenis init, GSAP ticker sync, anchor handling | Self-executing, no exports |
| `animations.js` | GSAP ScrollTrigger registrations for all sections | Self-executing, no exports |
| `card-deck.js` | Touch/pointer swipe, arrow click, card state | Self-executing, queries DOM via `[data-deck]` |
| `audio-player.js` | HTML5 Audio control, waveform, progress, seek | Self-executing, queries DOM via `[data-player]` |
| `video-autoplay.js` | IntersectionObserver play/pause on `<video>` | Self-executing, queries DOM via `[data-video]` |

### Interface Contracts (DOM data attributes)

Scripts communicate with components through `data-*` attributes:
- `data-deck` — card deck container
- `data-card` — individual swipeable card
- `data-deck-prev` / `data-deck-next` — arrow buttons
- `data-player` — audio player container
- `data-player-play` — play/pause button
- `data-player-progress` — progress bar element
- `data-player-track` — audio source reference
- `data-video` — video element for autoplay control
- `data-animate` — generic scroll-reveal target for GSAP

---

## Data Models

### Track (discography)
```typescript
interface Track {
  id: string;           // e.g. "midnight-archive"
  title: string;        // Display name
  cover: string;        // Path to album cover image
  src?: string;         // Path to mp3 file (optional — player gracefully handles missing)
}
```

Tracks are defined inline in `Discography.astro` or in a companion `src/content/tracks.json`.

### Session (upcoming events)
```typescript
interface Session {
  date: string;         // ISO date "2026-08-15"
  title: string;        // Event name
  location: string;     // City, Country
  description: string;  // One-line description
}
```

Source: `src/content/sessions.json`

```json
{
  "sessions": [
    {
      "date": "2026-08-15",
      "title": "Sunset Lounge Sessions",
      "location": "Cape Town, SA",
      "description": "An intimate evening of live acoustics."
    }
  ]
}
```

### Design Tokens
All visual tokens live in CSS custom properties (see Design Tokens section above). No JS-side theme config needed — everything resolves at the CSS layer.

---

## Correctness Properties

1. **Single mention rule:** The string "tszuk" must appear exactly twice across all rendered HTML — once in a strategic brand partnership statement, and once as a visual collaboration credit. It must NOT appear in the footer or navigation.
2. **Audio exclusivity:** Only one track may play at any time. Starting a new track pauses the current one.
3. **Card deck state:** The deck always has exactly one "active" card. Swiping/clicking advances to the next; after the last card, it loops to the first.
4. **Video lifecycle:** Video plays only when ≥50% visible in viewport and pauses otherwise. Must not auto-play with sound.
5. **Sessions empty state:** If `sessions.json` contains an empty array, the section renders "New sessions coming soon." — never an empty/broken layout.
6. **Font loading gate:** Page content is invisible (opacity 0) until fonts are loaded to prevent FOUT. Timeout fallback at 3 seconds (show content regardless).
7. **Reduced motion:** When `prefers-reduced-motion: reduce` is active, no transform/position animations fire. Lenis smooth scroll is disabled. Content is immediately visible.
8. **Responsive images:** All images have explicit width/height or aspect-ratio to prevent layout shift (CLS = 0).

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| MP3 file missing for a track | Player shows cover + title but disables play button, no error shown to user |
| Video fails to load | Video cell shows a still frame (poster attribute) or remains empty with background color |
| Font fails to load | 3-second timeout reveals page with system font fallback (`sans-serif`) |
| Sessions JSON is malformed | Build fails at Astro compile time (caught during development) |
| JS fails to load | Page is fully readable — all content is server-rendered HTML. Animations and interactivity degrade gracefully (no motion, no swipe, but content visible) |
| Touch events unsupported | Arrow buttons remain functional for navigation |
| Autoplay blocked by browser | Video remains paused, no overlay error — user can tap to play if `controls` fallback is present |

---

## Testing Strategy

### Manual Testing
- Visual review of all animations at 0.25x speed (GSAP `globalTimeline.timeScale(0.25)`)
- Test on real devices: iPhone SE (small), iPhone 14 (medium), iPad, desktop 1440px
- Keyboard-only navigation pass (Tab through all interactive elements)
- Screen reader pass (VoiceOver on macOS/iOS) for landmarks and labels
- `prefers-reduced-motion` toggle — verify all motion disabled

### Automated Checks
- `npm run build` — zero errors, clean static output
- Lighthouse CI — target 90+ on Performance, Accessibility, SEO, Best Practices
- HTML validation (W3C) — no semantic errors
- Check `tszuk` string count in built HTML (must equal 1)

### Browser Matrix
- Chrome (latest), Firefox (latest), Safari (latest), Safari iOS, Chrome Android
- GSAP + Lenis are well-supported across all modern browsers
- `@starting-style` used with fallback for Safari versions that don't support it

---

## Component Design

### Nav
- **Structure:** `<nav>` with flexbox — logo left, links right
- **Logo:** `<img>` with `border-radius: var(--border-radius-md)`, ~40px height
- **Links:** Plain text, no border, slide-in underline on hover using `::after` pseudo with `scaleX(0)` → `scaleX(1)` transition, `transform-origin: left`
- **Mobile:** Hamburger icon, slide-down menu with stagger animation
- **Behavior:** Fixed position, subtle background on scroll (via GSAP ScrollTrigger)

### Hero
- **Layout:** Centered, vertical stack on mobile; side-by-side on desktop
- **Tagline:** `<h1>` using `--text-hero`, `--font-weight-bold`
- **Portrait:** Full-bleed or contained, with subtle parallax (GSAP `y` shift at 0.3 speed ratio)
- **Entrance choreography:**
  1. Page fade-in (opacity 0 → 1, 300ms)
  2. Logo appears (fade + scale from 0.95, 200ms delay)
  3. Tagline words stagger in (translateY 20px → 0, opacity, 50ms stagger per word)
  4. Portrait fades up (opacity + translateY, 400ms with ease-out)

### Discography (Card Deck)
- **Layout:** Stacked cards, only top card fully visible, 2-3 peeking behind with offset
- **Card:** Album cover image fills card, track title at bottom in small text
- **Swipe (mobile):**
  - Touch event listeners tracking deltaX and elapsed time
  - Velocity calculation: `Math.abs(distance) / time`
  - Dismiss threshold: 100px distance OR velocity > 0.11
  - Card animates off-screen (translateX + rotate), next card scales up from 0.95
  - Damping at boundaries
- **Arrows (desktop):** Left/right buttons with `:active` scale(0.97)
- **Player (embedded below deck or on active card):**
  - Waveform: 30-40 thin bars, heights randomized per track, animated with subtle pulse on play
  - Progress: Bar fills left-to-right, accent color, GSAP-driven smooth interpolation
  - Play/pause: SVG icon morphs between states (path transition)
  - State: Accent color (`--color-accent`) on active elements

### Visual Archive (Bento Grid)
- **Grid:** CSS Grid with named areas, asymmetric sizing
  - Desktop: 3-4 columns, mixed row spans
  - Tablet: 2 columns
  - Mobile: single column stack
- **Images:** `object-fit: cover`, slight border-radius on some
- **Video cell:** Larger cell, `<video>` with `muted playsinline loop`, controlled by IntersectionObserver
- **Scroll reveal:** Each cell uses `clip-path: inset(0 0 100% 0)` → `inset(0)` with stagger (60ms per item), triggered at `-100px` margin
- **Hover:** `transform: scale(1.02)` with `--duration-base` ease-out + subtle overlay opacity shift

### Upcoming Sessions
- **Layout:** Vertical list, each session as a row/card
- **Data shape:**
  ```json
  {
    "sessions": [
      {
        "date": "2026-08-15",
        "title": "Sunset Lounge Sessions",
        "location": "Cape Town, SA",
        "description": "An intimate evening of live acoustics."
      }
    ]
  }
  ```
- **Entrance:** Each row slides up (translateY 30px → 0) + opacity, staggered 60ms
- **Empty state:** If no sessions, show "New sessions coming soon." in muted text

### Bio
- **Layout:** Centered, max-width ~600px, generous vertical padding
- **Typography:** `--text-lg`, `--font-weight-regular`, `--color-text`
- **Entrance:** Simple fade-in on scroll (opacity, 400ms)

### Footer
- **Layout:** Centered stack — social icons row, credit line below
- **Socials:** SVG icons (Spotify, Instagram, YouTube — placeholder hrefs), 24px, hover opacity shift
- **Credit:** `--text-sm`, `--color-text-muted`, `© 2026 Boss Reminisce`
- **Spacing:** Generous top padding to separate from content
- **No tszuk mention in footer**

### Partnership Credit
- **Layout:** Small, understated section between Visual Archive/Bio and Footer
- **Content:** Two lines:
  1. Statement: strategic brand partnership between Boss Reminisce and tszuk
  2. Credit: all visuals on this website are a product of collaboration between Boss Reminisce and tszuk
- **Typography:** `--text-sm`, `--color-text-muted`
- **Entrance:** Fade-in on scroll (opacity, 300ms)
- **These are the ONLY two places "tszuk" appears on the entire site**

---

## Animation Choreography Map

| Section | Trigger | Animation | Duration | Easing | Stagger |
|---------|---------|-----------|----------|--------|---------|
| Page load | fonts ready | Full page opacity 0→1 | 300ms | ease-out | — |
| Nav | page load | fade in | 200ms | ease-out | — |
| Nav background | scroll > 50px | opacity shift | 200ms | ease-out | — |
| Hero logo | load + 200ms | scale(0.95)→1 + opacity | 250ms | --ease-out | — |
| Hero tagline | load + 400ms | translateY(20px)→0 + opacity per word | 300ms | --ease-out | 50ms/word |
| Hero portrait | load + 700ms | translateY(40px)→0 + opacity | 500ms | --ease-out | — |
| Hero portrait | scroll | parallax translateY at 0.3x | continuous | linear | — |
| Discography cards | scroll into view | scale(0.95)→1 + opacity | 400ms | --ease-out | 80ms/card |
| Card swipe | touch release | translateX + rotate off-screen | 300ms | --ease-out | — |
| Archive cells | scroll into view | clip-path inset reveal | 600ms | --ease-in-out | 60ms/cell |
| Archive hover | pointer enter | scale(1.02) | 200ms | --ease-out | — |
| Video | scroll into view | auto-play | — | — | — |
| Sessions rows | scroll into view | translateY(30px)→0 + opacity | 350ms | --ease-out | 60ms/row |
| Bio | scroll into view | opacity 0→1 | 400ms | ease-out | — |
| Footer | scroll into view | opacity 0→1 | 300ms | ease-out | — |

---

## Responsive Breakpoints

```css
/* Mobile first */
/* Small: default (< 640px) */
/* Medium: 640px+ */
/* Large: 1024px+ */
/* XL: 1280px+ */

@media (min-width: 640px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide */ }
```

---

## Accessibility Approach

- All images: descriptive `alt` attributes
- Video: `aria-label`, no essential content conveyed only via video
- Audio player: keyboard operable (Space for play/pause, arrow keys for seek), `aria-label` on controls
- Nav: `<nav aria-label="Main navigation">`
- Sections: landmark roles via semantic elements (`<main>`, `<section>`, `<footer>`)
- Focus styles: visible outline (2px solid accent) on all interactive elements
- Reduced motion: disable transforms/position animations, keep opacity transitions

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## SEO & Social Structure

```html
<!-- Primary Meta -->
<title>Boss Reminisce — Melody meets lyricism</title>
<meta name="description" content="The official home of Boss Reminisce. Soulful melody, pure lyricism, rooted in South African sound.">

<!-- Open Graph -->
<meta property="og:type" content="music.musician">
<meta property="og:title" content="Boss Reminisce">
<meta property="og:description" content="Melody meets lyricism.">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://bossreminisce.com">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Boss Reminisce">
<meta name="twitter:description" content="Melody meets lyricism.">
<meta name="twitter:image" content="/og-image.jpg">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Boss Reminisce",
  "description": "Soulful melody meets pure lyricism.",
  "genre": ["Soul", "Acoustic", "Hip-Hop"],
  "url": "https://bossreminisce.com"
}
</script>
```

---

## Dependencies

| Package | Purpose | Version Strategy |
|---------|---------|-----------------|
| astro | Static site framework | pinned latest |
| gsap | Animation + ScrollTrigger | pinned (free tier) |
| lenis | Smooth scroll physics | pinned latest |
| @fontsource/satoshi | Self-hosted font | pinned latest |

No other dependencies. No Tailwind, no UI libraries, no CSS frameworks.
