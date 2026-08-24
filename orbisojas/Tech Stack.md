# Tech Stack

## Core

- **HTML/CSS/Vanilla JS** — No framework, no build step, static files
- **GSAP 3.12.5** + ScrollTrigger + ScrollToPlugin (CDN)
- **Google Fonts:** Press Start 2P (pixel headers), Space Grotesk (UI body/text)
- Pure static site — deploy by copying files to nginx

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Midnight | `#0B0C1E` | Page backgrounds, deepest sections |
| Deep Blue | `#141832` | Card backgrounds, secondary depth |
| Teal | `#1A4A5C` | Boy journey accent, hover glow |
| Amber | `#C08A2C` | Primary accent, dividers, active states |
| Rose | `#C44858` | Girl journey accent, hover glow |
| Cream | `#D4A870` | Text highlights, nav-active |
| Stone | `#7A7A78` | Muted body text, whisper copy |

CSS custom properties are defined on `:root` in each page's stylesheet.

## Typography

- **Press Start 2P** — Pixel font for scene numbers, section headers, scroll hints
- **Space Grotesk** — Clean sans for body text, nav links, scene copy (weights: 300-700)
- Text reveal: word-by-word animation using GSAP stagger (0.04-0.09s per word)
- Display text split into `.word` spans via JS for individual animation

## Animation System

All animations use GSAP + ScrollTrigger:

- **Word reveal:** innerHTML split on `<br>` and `<span>`, wrapped in `.word` spans, staggered opacity+translateY
- **Scene pinning:** `pin: true, scrub: true` — scroll position IS the animation timeline
- **Card entrance:** `y:50, opacity:0` → `y:0, opacity:1` with ScrollTrigger
- **Nav:** transparent → solid background at `scrollY > 60`
- **Descent meter:** thin vertical bar showing scroll progress (journey pages only)
- **Card hover:** `translateY(-6px)`, amber glow box-shadow, arrow `translateX(6px)`, shine sweep via `::before`

### Motion Rules (from Design System)

- Entrance = emergence (fade from deep, not slide from side)
- Text reveals are slow, word-by-word
- Nothing bounces, spins, slides from side, or loops
- Everything enters from depth (opacity 0→1, translateY, blur→sharp)
- `scrub: true` everywhere — user controls the pace

## Glass-morphism

Text panels use:
```css
backdrop-filter: blur(12px);
background: rgba(11, 12, 30, 0.7);
border: 1px solid rgba(255,255,255,0.06);
```

## Image Optimization

All images compressed to JPEG at 82% quality via Python/Pillow:
- Homepage hero: cropped from 3-panel 2.2MB PNG to single panel 75KB JPG
- Journey cards: split from combined 1.9MB PNG into 72KB + 98KB individual JPGs
- Scene backgrounds: 510-600KB PNGs → 65-86KB JPGs (boy), 1.9-2.6MB → 90-221KB (girl)
- Total homepage reduction: 6.5MB → 252KB (96%)

## Performance

- `<link rel="preload">` for critical above-fold images
- Nginx gzip on (text/css, application/javascript, etc.)
- Cache headers: images 30d (immutable), CSS/JS 7d, fonts 365d
- No video, no WebGL, no heavy assets
- Target: instant load, 60fps scroll

## Dev Server

Local preview via: `npx serve website -l 3456 --no-clipboard`
Config in `.claude/launch.json`

---

**Related:** [[Site Architecture]] | [[Design System]] | [[Deployment Guide]]
