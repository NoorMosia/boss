# Implementation Plan:

## Overview

This plan covers the full build of the Boss Reminisce landing page — from Astro project scaffolding through to production-ready output. Work is organized in 7 sequential phases: scaffolding, layout, static components, animations, interactive islands, polish, and deploy prep. Each phase builds on the previous. Total: 28 tasks.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "name": "Wave 1: Project Scaffolding",
      "tasks": ["1.1", "1.2", "1.3"],
      "dependencies": []
    },
    {
      "name": "Wave 2: Layout & Base Page",
      "tasks": ["2.1", "2.2"],
      "dependencies": ["1.3"]
    },
    {
      "name": "Wave 3: Static Components",
      "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"],
      "dependencies": ["2.2"]
    },
    {
      "name": "Wave 4: Smooth Scroll & Animations",
      "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7"],
      "dependencies": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"]
    },
    {
      "name": "Wave 5: Interactive Islands",
      "tasks": ["5.1", "5.2", "5.3"],
      "dependencies": ["4.1", "3.3", "3.4"]
    },
    {
      "name": "Wave 6: Responsive & Polish",
      "tasks": ["6.1", "6.2", "6.3", "6.4"],
      "dependencies": ["5.1", "5.2", "5.3"]
    },
    {
      "name": "Wave 7: Build & Deploy Prep",
      "tasks": ["7.1", "7.2"],
      "dependencies": ["6.1", "6.2", "6.3", "6.4"]
    }
  ]
}
```

## Tasks

- [ ] 1. Initialize Astro project: Run `npm create astro@latest` in workspace root, install dependencies (`astro`, `gsap`, `lenis`), install Satoshi font via `@fontsource-variable/satoshi` or self-host, configure `astro.config.mjs` for static output and asset handling, verify `npm run dev` starts successfully.

- [ ] 2. Set up project structure: Create directory structure (`src/layouts/`, `src/pages/`, `src/components/`, `src/scripts/`, `src/styles/`, `src/content/`), move/reference existing assets from `assets/artist/visuals/` so Astro can resolve them, create `public/` folder with favicon files from `assets/favicon/`, create placeholder `public/og-image.jpg` path.

- [ ] 3. Global styles & design tokens: Create `src/styles/global.css` with CSS reset, custom properties (all tokens from design.md), and base typography. Create `src/styles/layout.css` with container, section spacing, grid helpers. Create `src/styles/components.css` (empty initially). Import Satoshi font via `@font-face` or fontsource. Verify font loads correctly in browser.

- [ ] 4. Create Base layout: Create `src/layouts/Base.astro` with `<html>`, `<head>` including all meta tags, OG, Twitter Card, JSON-LD, favicon links. Import global CSS files. Add font preload links. Include Lenis + GSAP script imports (deferred). Add page load transition wrapper (opacity 0 → 1 on fonts ready).

- [ ] 5. Create index page shell: Create `src/pages/index.astro`, import Base layout, add section placeholders for all 7 sections in order, verify page renders with correct meta and styles.

- [ ] 6. Nav component: Create `src/components/Nav.astro` with logo image (border-radius), desktop horizontal link list (Discography, Archive, Sessions) with anchor hrefs, mobile hamburger toggle + slide-down menu with stagger animation. Style slide-in underline hover on links (`::after` pseudo, scaleX transition), `:active` scale(0.97), fixed positioning with transparent → solid background on scroll. Responsive at all breakpoints.

- [ ] 7. Hero component: Create `src/components/Hero.astro` with `<h1>` tagline "Melody meets lyricism." split into `<span>` per word for stagger targeting. Portrait image (`pe3.jpg`) with responsive sizing. Layout: centered stack mobile, side-by-side desktop. Add data attributes/classes for GSAP targeting (`.hero-logo`, `.hero-word`, `.hero-portrait`). Style typography at `--text-hero` scale.

- [ ] 8. Discography component (structure): Create `src/components/Discography.astro` with card deck markup (stacked cards with `albumCover1-4.jpg`), track title per card (minimal), navigation arrows for desktop, audio player shell markup (waveform bars container, progress bar, play/pause SVG button). Add classes/data-attributes for JS targeting. Style card stack (position absolute, offsets for peeking cards). Style player controls and waveform bars. Responsive: full-width mobile, constrained desktop.

- [ ] 9. Visual Archive component: Create `src/components/VisualArchive.astro` with bento grid (CSS Grid named areas), place images (`p1.jpg`, `p3.jpg`, `pe1-pe4.jpg`) in grid cells, embed `<video>` for `performance.mp4` (`muted playsinline loop`, `preload="none"`). Add `loading="lazy"` on below-fold images. Style grid: 3-4 columns desktop, 2 tablet, 1 mobile. Images: `object-fit: cover`, subtle border-radius. Hover styles: scale(1.02) + overlay (gated behind `@media (hover: hover)`). Add classes for GSAP scroll-trigger targeting.

- [ ] 10. Sessions component: Create `src/content/sessions.json` with sample data (2-3 sessions). Create `src/components/Sessions.astro`, read and parse JSON at build time, render each session (date, title, location, description). Empty state: "New sessions coming soon." if array is empty. Style as vertical list with clear hierarchy. Add classes for stagger animation targeting.

- [ ] 11. Bio component: Create `src/components/Bio.astro` with single `<p>` bio copy (personal, understated, third-person informal). Centered layout, max-width ~600px, typography at `--text-lg` regular weight. Add class for fade-in trigger.

- [ ] 12. Footer component: Create `src/components/Footer.astro` with social icons row (Spotify, Instagram, YouTube SVGs, `<a href="#">`), credit line `© 2026 Boss Reminisce`. Style: centered, generous top spacing, muted text. Hover on icons: opacity shift. No tszuk mention here.

- [ ] 13. Partnership credit component: Create `src/components/PartnershipCredit.astro` — a small, understated section placed between archive/bio and footer. Two lines: (1) strategic brand partnership statement mentioning tszuk, (2) visual collaboration credit mentioning tszuk. Typography: `--text-sm`, muted. Fade-in on scroll. These are the ONLY two places "tszuk" appears on the entire site.

- [ ] 14. Lenis smooth scroll: Create `src/scripts/smooth-scroll.js`. Initialize Lenis with physics config (lerp, duration, smoothWheel). Connect Lenis to GSAP ticker for synchronized scroll position. Handle anchor link clicks (smooth scroll to section). Disable on `prefers-reduced-motion`.

- [ ] 15. Page load animation: In `src/scripts/animations.js`, wait for fonts + DOM ready. Animate page wrapper opacity 0 → 1 (300ms, ease-out). Sequence hero entrance: logo scale(0.95) + opacity (250ms, 200ms delay), tagline words translateY(20px) + opacity (300ms, 50ms stagger), portrait translateY(40px) + opacity (500ms). Skip all if `prefers-reduced-motion`.

- [ ] 16. Nav scroll behavior: In animations.js, add ScrollTrigger for nav background. After 50px scroll: add class for background color + subtle border-bottom. Transition: opacity 200ms ease-out.

- [ ] 17. Discography scroll reveal: ScrollTrigger on discography section. Cards: scale(0.95) + opacity → normal, staggered 80ms. Trigger: when section enters viewport at 80% from top.

- [ ] 18. Archive scroll reveals: ScrollTrigger on each archive grid cell. Animation: `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` (600ms, --ease-in-out). Stagger: 60ms per cell. Trigger margin: -100px.

- [ ] 19. Hero parallax: ScrollTrigger on hero portrait. Parallax: translateY shifts at 0.3x scroll speed. Smooth, continuous, linear easing.

- [ ] 20. Sessions + Bio + Footer reveals: Sessions rows translateY(30px) + opacity (60ms stagger). Bio opacity 0 → 1 (400ms). Footer opacity 0 → 1 (300ms). Each triggered on scroll into view.

- [ ] 21. Card deck swipe interaction: Create `src/scripts/card-deck.js`. Pointer event listeners tracking deltaX and elapsed time. During drag: card follows finger (translateX + slight rotate). On release: calculate velocity, dismiss if distance > 100px OR velocity > 0.11. Dismiss animation: translateX off-screen + rotate (300ms ease-out). Next card scales from 0.95 → 1. Pointer capture, multi-touch protection, boundary damping. Desktop arrows trigger same animation. Loop after last card.

- [ ] 22. Audio player interaction: Create `src/scripts/audio-player.js`. HTML5 `<audio>` per track. Play/pause toggles playback with SVG icon morph. Progress bar updates via GSAP smooth interpolation on `timeupdate`. Waveform bars with randomized heights and subtle pulse on play. Click/tap progress bar to seek. Only one track plays at a time. Keyboard: Space = play/pause, Left/Right = seek ±5s. Accent color on active elements. Accessible: `aria-label` on all controls.

- [ ] 23. Video autoplay on scroll: Create `src/scripts/video-autoplay.js`. IntersectionObserver on `<video>` (threshold: 0.5). On intersect: `video.play()`. On exit: `video.pause()`. Fallback: if autoplay blocked, show play button overlay.

- [ ] 24. Responsive testing & fixes: Test all components at 320px, 375px, 640px, 768px, 1024px, 1280px, 1440px. Fix grid breakpoints, font sizes, spacing, touch targets. Ensure card deck is usable on small screens. Verify nav hamburger on mobile. Archive grid single column must feel intentional.

- [ ] 25. Accessibility pass: Add `alt` text to all images. Verify heading hierarchy (single `<h1>`, logical flow). Test keyboard navigation on player, nav, card deck arrows. Add `focus-visible` styles (2px solid accent). Verify `prefers-reduced-motion` disables all motion. Check color contrast (AA minimum).

- [ ] 26. Performance pass: Verify images optimized (Astro built-in). Confirm video lazy loaded. Check no layout shifts (CLS) from fonts or images. Ensure GSAP/Lenis load after critical content. Target Lighthouse 90+ on all metrics.

- [ ] 27. Final visual polish: Review all animations at 0.25x speed for jank/incorrect origins/overlapping timings. Verify accent color in right moments (play button, active nav, progress bar). Confirm logo border-radius at all sizes. Check hover states gated behind `@media (hover: hover) and (pointer: fine)`. Final pass: does it feel crafted?

- [ ] 28. Production build: Run `npm run build` — verify clean output with no errors. Check `dist/` folder for correct asset references. Verify HTML has all meta, OG, favicon references. Test locally with `npm run preview`.

- [ ] 29. Final checks: Confirm tszuk appears exactly twice (partnership credit section only). Confirm no placeholder text remains. Confirm sessions.json is populated. Confirm audio player works with mp3 files or gracefully handles missing. Social links are `#` — verify no broken behavior.

---

## Notes

- **MP3 files:** Drop tracks into `assets/artist/tracks/` at any point. The audio player gracefully handles missing files (disables play button, no error shown).
- **OG image:** A 1200x630 placeholder path exists at `public/og-image.jpg`. Replace with a real image before launch.
- **Sessions content:** Edit `src/content/sessions.json` and rebuild to update events. No backend or API needed.
- **GSAP licensing:** GSAP free tier covers this project. ScrollTrigger is included in the free package. No commercial license required for non-SaaS use.
- **Satoshi font:** Available via Fontshare (free) or `@fontsource-variable/satoshi`. Self-hosting preferred for performance.
- **Phase 3 parallelism:** All 7 component tasks in Phase 3 are independent of each other and can be built in any order once the index shell (2.2) exists.
- **Testing on real devices:** Phase 6 responsive testing should include physical iPhone + Android if possible, not just browser devtools emulation.
- **Reduced motion:** Must be tested as a first-class experience, not an afterthought. Toggle in OS settings during Phase 6.
