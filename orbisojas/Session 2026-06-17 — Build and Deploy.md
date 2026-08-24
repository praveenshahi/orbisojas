# Session 2026-06-17 — Build and Deploy

## What was built

### Homepage (orbisojas.com/)
- Built from scratch based on uploaded pixel art reference images
- Hero section with GSAP word-by-word text reveal
- "Choose Your Journey" section with two linked cards (boy/girl)
- Boy card: teal-tinted hover glow, links to /his/
- Girl card: rose-tinted hover glow, links to /her/
- "Explore the System" fallback CTA to begin.html
- Mobile-responsive with hamburger nav

### Image Optimization
- Hero background: cropped 3-panel 2.2MB PNG to first panel → 75KB JPG
- Journey cards: split combined 1.9MB PNG into two individual JPGs (72KB + 98KB)
- Boy scene images: 510-600KB PNGs → 65-86KB JPGs each
- Girl scene images: 1.9-2.6MB PNGs → 90-221KB JPGs each
- Total homepage reduction: 6.5MB → 252KB (96%)
- Used Python/Pillow for crop, compress, format conversion

### Navigation Consistency Fix
- Problem: Each page had completely different nav links — homepage had dead links (#about, #stories), boy page had section anchors, girl page had different anchors
- Solution: Unified all three pages to same nav structure
- Added `.nav-active` class for current page indicator
- Removed all dead links and page-specific anchors from global nav
- Standardized footer SVG sizes to 18px across all pages

### Nginx Performance
- Enabled gzip compression (text/css, application/javascript, etc.)
- Image cache: 30 days, immutable
- CSS/JS cache: 7 days
- Font cache: 365 days
- Added `<link rel="preload">` for critical above-fold images

## Files created/modified

**New:**
- `website/home/index.html` — Homepage
- `website/home/css/style.css` — Homepage styles
- `website/home/js/main.js` — Homepage animations
- `website/home/img/hero-bg.jpg` — Cropped/compressed hero
- `website/home/img/boy-card.jpg` — Boy journey card image
- `website/home/img/girl-card.jpg` — Girl journey card image

**Modified:**
- `website/template/index.html` — Unified nav, footer update
- `website/template/css/style.css` — .nav-active, .footer-brand, JPG refs
- `website/her/index.html` — Unified nav, footer update
- `website/her/css/style.css` — .nav-active, .footer-brand, JPG refs
- `website/template/img/scene-0{1-4}.jpg` — Compressed from PNG
- `website/her/img/scene-0{1-4}.jpg` — Compressed from PNG

## Deployed and verified

All pages deployed to orbisojas.com via gcloud SCP + SSH:
- Homepage: 200 OK, consistent nav verified
- /his/: 200 OK, nav-active on HIS JOURNEY
- /her/: 200 OK, nav-active on HER JOURNEY

## Known remaining items

- `begin.html` still uses old v1 design — needs redesign to match pixel art aesthetic
- Footer social links are all `#` placeholders — need real URLs
- No git repository initialized yet
- Girl scene images are larger than boy's (90-221KB vs 65-86KB) — could optimize further

---

**Related:** [[Home]] | [[Site Architecture]]
