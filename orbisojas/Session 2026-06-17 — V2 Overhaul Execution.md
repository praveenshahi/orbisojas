# Session 2026-06-17 — V2 Overhaul Execution

Executed all 7 major tasks from the [[Website Audit — June 2026]].

## Tasks Completed

### 1. Quick Wins (Meta, Accessibility, Performance)
- Added favicon (ICO + PNG + apple-touch-icon) generated from logo
- OG meta + Twitter Cards on all 4 pages
- `aria-expanded` on all nav toggles
- Skip-to-content links on every page
- `prefers-reduced-motion` media queries
- Passive scroll listeners

### 2. Fullscreen Journey Selector
- Rebuilt homepage "Choose Your Journey" from card grid to fullscreen split-screen
- Mouse-driven panel expansion (hover makes panel grow to 1.6x)
- CSS `flex` transition with divider shift following cursor
- Mobile: tap-to-expand with `.boy-active` / `.girl-active` toggle

### 3. Shared CSS/JS Core
- `website/shared/css/tokens.css` — Single source of truth for design tokens
- `website/shared/css/core.css` — Resets, focus styles, word reveal, reduced motion, `.sr-only`
- `website/shared/js/core.js` — Word reveal, descent meter, lazy load, mobile nav toggle
- Eliminated 95%+ code duplication between boy/girl journey pages

### 4. Image Optimization
- Converted all 12 JPGs to WebP (356KB total savings)
- IntersectionObserver lazy loading for scenes 2-4 (rootMargin: 200px)
- Moved 51.8MB of source PNGs to `sources/` directory (outside deploy tree)
- Updated all CSS/HTML references from .jpg/.png to .webp

### 5. begin.html Rebuilt in V2
- Replaced v1 design (grain overlay, custom cursor, serif fonts) with v2 pixel-art system
- Glassmorphism form panel with `backdrop-filter: blur(24px)`
- V2 nav with logo, pixel font, and amber CTA
- Consistent footer matching all other pages
- All form fields preserved: name, DOB, birthplace, birth time, email

### 6. SEO
- `website/sitemap.xml` — 4 URLs with priorities
- `website/robots.txt` — Allow all, sitemap reference
- JSON-LD structured data on all 4 pages (WebSite on home, WebPage on others)
- Visually-hidden h1 tags on journey pages (had only h2s before)
- `.sr-only` utility class in core.css

### 7. Legacy V1 Cleanup
- Archived 6 files to `website/v1-archive/`: index.html, mirror.html, journey.html, framework.html, css/style.css, js/main.js
- Created root `index.html` with meta-refresh redirect to `/home/`
- Cleaned empty `css/` and `js/` directories from website root

## Post-Audit Fixes
- Fixed 4 broken resource paths on homepage (favicon + logo needed `../` prefix)
- Fixed 4 broken navigation links (`his/` -> `../template/`, `her/` -> `../her/`)
- Fixed cross-link on her page (`../his/` -> `../template/`)
- Added missing JSON-LD on begin.html

## Git Commit
`89b5cb6` — "Complete v2 website overhaul: shared design system, SEO, image optimization, and audit fixes"

## Remaining Work
- Social media links still use placeholder `#` hrefs
- Deploy latest changes to production VM (GCP)
- Consider nginx alias `/his/` -> `/template/` for cleaner URLs
