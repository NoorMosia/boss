# Code Conventions

## Stack

- Astro (static output, no SSR)
- Hand-written CSS (no Tailwind, no CSS frameworks, no utility classes)
- GSAP + ScrollTrigger for animations
- Lenis for smooth scroll
- Vanilla JavaScript for interactivity (no React, no Vue, no Svelte)

## CSS

- All design tokens live in CSS custom properties on `:root`
- Mobile-first responsive approach — base styles are mobile, scale up with `min-width` queries
- Breakpoints: 640px (tablet), 1024px (desktop), 1280px (wide)
- No `!important` except for `prefers-reduced-motion` overrides
- Properties animated: only `transform`, `opacity`, and `clip-path` (GPU-accelerated)
- No `transition: all` — always specify exact properties
- Class names are descriptive and flat (`.nav-link`, `.card-deck`, `.archive-grid`) — no BEM, no nesting conventions

## JavaScript

- Scripts are vanilla JS loaded via Astro `<script>` tags
- DOM hooks use `data-*` attributes, not classes:
  - `data-deck`, `data-card`, `data-deck-prev`, `data-deck-next`
  - `data-player`, `data-player-play`, `data-player-progress`, `data-player-track`
  - `data-video`
  - `data-animate` for generic scroll-reveal targets
- Scripts are self-executing — no exports, no module system between client scripts
- Each script handles one concern (single responsibility)
- Feature detection before using APIs (e.g., check IntersectionObserver exists)
- Always respect `prefers-reduced-motion` — check before initializing animations or Lenis

## Astro Components

- Components are `.astro` files — server-rendered, zero client JS by default
- Props are typed inline (no separate interface files for this project)
- Content data (sessions, tracks) lives in `src/content/` as JSON
- Images referenced from `assets/artist/visuals/` using Astro's asset pipeline
- Components are flat — no nested component directories, all in `src/components/`

## HTML

- Semantic elements always: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- Single `<h1>` per page (the hero tagline)
- All images have explicit `width`, `height`, or `aspect-ratio` to prevent CLS
- All images have descriptive `alt` text
- Interactive elements are keyboard accessible with visible focus styles
- `aria-label` on controls that lack visible text labels

## File Organization

```
src/
├── layouts/Base.astro
├── pages/index.astro
├── components/*.astro
├── scripts/*.js
├── styles/
│   ├── global.css      (reset + tokens + base type)
│   ├── layout.css      (containers + section spacing)
│   └── components.css  (component-specific styles)
└── content/
    └── sessions.json
```

## Build & Quality

- `npm run build` must produce zero errors and zero warnings
- All assets optimized through Astro's built-in pipeline
- Lighthouse target: 90+ on Performance, Accessibility, SEO, Best Practices
- No unused CSS, no unused JS in production output
