# ORBISOJAS Website Audit — June 2026

---

## 1. Executive Summary

The site has strong emotional storytelling, a distinctive pixel-art aesthetic, and solid content. But the technical foundation is fragile — two incompatible design systems coexist, 90% of code is duplicated across pages, 38MB of dead image weight ships with the project, and performance-critical patterns (fixed background attachment, un-throttled scroll listeners, no lazy loading) degrade the experience on the exact mobile devices the target audience uses.

**The 80/20:** Five changes would transform this site:
1. Kill the legacy pages and redirect to the new design system
2. Extract a shared CSS/JS core to eliminate 60KB of duplication
3. Rebuild the homepage journey selector as a fullscreen character-select experience
4. Convert images to WebP and lazy-load below-fold scenes
5. Add `prefers-reduced-motion` and basic structured data

---

## 2. Critical Issues

### 2.1 Two Incompatible Design Systems

The site runs TWO completely separate codebases:

| System | Pages | Nav | Cursor | Tokens | CSS Size |
|--------|-------|-----|--------|--------|----------|
| **Legacy v1** | index.html, begin.html, mirror.html, journey.html, framework.html | `.site-nav` with grain overlay + custom cursor | Custom div cursor | Different variable names | 26.8KB |
| **New v2** | home/, template/ (his), her/ | `.nav` with glass morphism, no cursor | System cursor | Three slightly different token sets | 12.6 + 27.8 + 28.2 = 68.6KB |

**Impact:** When a user clicks "ENTER MIRROR" from the pixel-art journey, they land on a page with a completely different visual language. The immersion breaks.

**Fix:** Rebuild begin.html in the v2 design system. Redirect legacy pages or remove them from deployment.

### 2.2 38MB of Dead Image Weight

```
Images currently in /website/:
  Source PNGs (unused in prod):    37.5 MB across 22 files
  Optimized JPGs (used in prod):    1.2 MB across 14 files
  Total on disk:                   38.7 MB
```

Files like `section1.png` (1.8MB), `girljourney.png` (2.3MB), `homepage.png` (2.0MB) are reference images and source PNGs sitting in the deployment directory. They are not referenced by any HTML/CSS but add weight to SCP transfers and could accidentally be served.

**Fix:** Move source PNGs to a `/sources/` directory outside `/website/`. Only optimized assets should be in the deploy tree.

### 2.3 Code Duplication (95%+)

| File | template/ (boy) | her/ (girl) | Difference |
|------|----------------|-------------|------------|
| CSS | 27.8 KB (1099 lines) | 28.2 KB (~1099 lines) | ~5 lines differ (girl pixel chars, .jp-char--queen vs --sovereign) |
| JS | 16.2 KB (538 lines) | 16.2 KB (same) | Identical minus `#boy` → `#girl` selectors |
| HTML | 15.3 KB | 15.2 KB | Different scene text, tags, character names |

**Impact:** Every bug fix must be applied to 2-3 files. Design system changes require editing 3 separate CSS files. This will not scale to additional journeys.

**Fix:** Extract shared `core.css` (~25KB) and `core.js` (~14KB). Per-page files hold only overrides (~2KB each).

### 2.4 Three Separate Token Systems

Homepage tokens:
```css
--midnight: #0B0C1E;  --deep: #141832;  --text: #E8E0D4;  --text-dim: rgba(232,224,212,0.5);
```

Journey tokens:
```css
--midnight: #0B0C1E;  --deep-blue: #141832;  --ink: #E8DCC8;  --ink-dim: #8A7D6A;
```

Same colors, different names. `--text` vs `--ink`. `--deep` vs `--deep-blue`. `--text-dim` vs `--ink-dim`. This guarantees drift.

**Fix:** Single canonical token file. One name per color. Import everywhere.

---

## 3. Quick Wins (< 1 hour each)

### 3.1 Add `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Zero effort. Major accessibility win.

### 3.2 Add Passive Scroll Listener Flag
Homepage `main.js` line 10: `window.addEventListener('scroll', fn)` — add `{ passive: true }` to unblock the main thread during scroll.

### 3.3 Unique Page Titles
```
Homepage:    "Orbisojas — Life Navigation System"
Boy:         "His Journey — Orbisojas"
Girl:        "Her Journey — Orbisojas"
Mirror:      "Enter the Mirror — Orbisojas"
```

### 3.4 Add Open Graph Meta
```html
<meta property="og:title" content="Orbisojas — Life Navigation System">
<meta property="og:description" content="The code running your life? You didn't write it.">
<meta property="og:image" content="https://orbisojas.com/img/og-image.jpg">
<meta property="og:type" content="website">
```

### 3.5 Add Favicon
Currently missing from all pages. Create a pixel-art favicon from the Ojas Orb heart.

### 3.6 Add `<link rel="canonical">`
```html
<link rel="canonical" href="https://orbisojas.com/">
```
Per page. Prevents duplicate indexing.

### 3.7 Reduce Font Weights
Currently loading 5 weights of Space Grotesk (300-700). The site only uses 300 and 400 meaningfully. Drop to `wght@300;400;600`.

---

## 4. High Impact Improvements

### 4.1 Homepage Journey Selector — Fullscreen Character Select

**Current state:** Two small cards with background-image thumbnails in a grid below the fold. Cards use CSS `background-image` which can't use `loading="lazy"`. The section doesn't fill the viewport. It feels like a menu, not a moment.

**Target state:** Fullscreen split-screen character select (think: game character selection). Each half of the screen is one journey. Mouse movement shifts the split point — hovering on the boy's side expands it, dimming the girl's side, and vice versa. The active side glows with its accent color (teal for boy, rose for girl). On mobile, vertical split with touch/tap to select.

This is the #1 UX priority — it's the gateway to the entire experience.

**Key technical approach:**
- Pure CSS + minimal JS (no images for the background split — use CSS gradients + the existing pixel-art JPGs as `<img>` tags with `loading="eager"` and `fetchpriority="high"`)
- `clip-path` or flexbox width transition for the split-point shift
- GPU-accelerated transforms only (no layout thrash)
- Works without JS (both sides visible, standard links)

### 4.2 Image Format Upgrade (WebP)

Current JPEG assets at 82% quality total ~1.2MB for all 14 files. WebP at equivalent quality would drop to ~700-800KB (~35% savings). AVIF even lower but browser support isn't universal enough.

```html
<picture>
  <source srcset="img/scene-01.webp" type="image/webp">
  <img src="img/scene-01.jpg" alt="Scene 1" loading="lazy">
</picture>
```

For CSS backgrounds, use `image-set()`:
```css
.scene-01 {
  background-image: url('../img/scene-01.jpg');
  background-image: image-set(url('../img/scene-01.webp') type('image/webp'), url('../img/scene-01.jpg') type('image/jpeg'));
}
```

### 4.3 Lazy Load Scene Backgrounds

Scenes 2-4 are below the fold. Currently all 4 backgrounds load immediately via CSS.

**Option A (simpler):** Move backgrounds from CSS to `<img>` tags with `loading="lazy"`, positioned absolutely behind content.

**Option B (more control):** Use IntersectionObserver to add a `.loaded` class when a scene enters the viewport, then set the background in CSS:
```css
.scene-02.loaded { background-image: url('../img/scene-02.jpg'); }
```

### 4.4 Remove `background-attachment: fixed`

`template/css/style.css` line 182-184:
```css
@supports (background-attachment: fixed) {
  @media (min-width: 900px) {
    .scene { background-attachment: fixed; }
  }
}
```

This forces each scene into a separate compositing layer. On mobile Chrome, it's silently ignored. On desktop, it causes repaint storms during scroll. The GSAP parallax drift (in main.js) already handles the parallax effect — the CSS `background-attachment: fixed` is redundant and conflicts with it.

**Fix:** Remove it entirely. The GSAP `backgroundPositionY` scrub provides better parallax.

### 4.5 Shared Core Architecture

```
website/
  shared/
    css/
      tokens.css       (design tokens — colors, fonts, spacing)
      core.css         (nav, footer, glass panels, word reveal, responsive base)
    js/
      core.js          (nav toggle, word reveal, descent meter, scroll state)
  home/
    css/style.css      (hero, journey selector — homepage-only styles)
    js/main.js         (hero animation, selector interaction)
  his/
    css/style.css      (scene overrides, boy-specific pixel chars)
    js/main.js         (scene animations — uses shared scene template)
  her/
    css/style.css      (scene overrides, girl-specific pixel chars)
    js/main.js         (scene animations — uses shared scene template)
```

Estimated savings: 60KB of CSS duplication eliminated. Single source of truth for tokens, nav, footer.

---

## 5. Asset Architecture Recommendations

### 5.1 Current Asset Strategy (Problems)

Every scene is a single monolithic background image. This means:
- No compositing flexibility (can't reuse mountains across scenes)
- Every scene change requires a new full-frame render
- No parallax on individual elements (only the entire background shifts)
- Can't animate individual elements (trees, stars, characters)

### 5.2 Recommended Decomposition

**Phase 1 (now — minimal effort):** Keep current approach but optimize delivery.
- Convert JPGs to WebP
- Preload scene-01, lazy-load scenes 2-4
- Remove source PNGs from deploy tree

**Phase 2 (next iteration — medium effort):** Decompose scenes into layers.
```
Scene 01 — The Surface:
  Layer 0: Gradient sky (pure CSS)
  Layer 1: City skyline (SVG or small PNG, repeatable)
  Layer 2: Room interior (unique per scene, main visual)
  Layer 3: Character overlay (CSS pixel art, already done in Scene 04)
  Layer 4: Floating elements (notification tags — already done)
```

Benefits:
- Parallax per layer (background sky moves slower than foreground buildings)
- Reusable sky/gradient across scenes (saves bandwidth)
- Character can be animated independently
- Responsive — layers can reposition for mobile without needing separate mobile assets

**Phase 3 (future — high effort):** Canvas/WebGL compositing.
- Programmatic pixel art rendering
- Particle systems for stars, mist, fireflies
- Dynamic lighting (the "light from below" concept rendered in real-time)
- Interactive elements (character follows mouse)

### 5.3 Reusable Asset Categories

**Environment (SVG/CSS):**
- Stars field (CSS radial dots or tiny SVG, randomized per load)
- Gradient skies (pure CSS, parameterized by scene temperature)
- Ambient mist (CSS pseudo-element with blur, or SVG filter)

**Characters (CSS box-shadow — already implemented):**
- Boy, Girl, Seeker, Builder, Lover, Sovereign/Queen
- Already built as pure CSS pixel art in journey pages
- Should be extracted into a shared sprite system

**Brand (SVG):**
- Ojas Orb heart (currently a Unicode glyph — should be a custom SVG for consistency)
- Social icons (already inline SVG)
- Logo lockup (pixel font + orb)

**Effects (CSS/JS):**
- Glass morphism panels (backdrop-filter, already shared)
- Word reveal animation (already shared via GSAP)
- Notification ping dots (already built)
- Glow/pulse effects (CSS animations, already shared)

---

## 6. Design System Recommendations

### 6.1 Typography Scale

Current: Sizes are ad-hoc (0.4rem, 0.5rem, 0.55rem, 0.6rem, 0.65rem, 0.7rem, 0.72rem, 0.8rem, 0.82rem, 0.85rem, 0.9rem, 1.1rem, 1.3rem). No system.

Recommended scale:
```css
--text-2xs: 0.5rem;    /* 8px — pixel labels, scene nums */
--text-xs: 0.625rem;   /* 10px — nav links, card CTAs */
--text-sm: 0.75rem;    /* 12px — subtitles, whispers */
--text-base: 0.875rem; /* 14px — body text */
--text-lg: 1rem;       /* 16px — scene titles */
--text-xl: 1.25rem;    /* 20px — hero subtitle */
--text-2xl: 1.5rem;    /* 24px — scene numbers */
--text-3xl: 2rem;      /* 32px — hero title (pixel) */
```

### 6.2 Spacing Scale

Current: Arbitrary values (0.4rem, 0.55rem, 0.6rem, 0.65rem, 0.7rem, 0.8rem, 1rem, 1.1rem...). No rhythm.

Recommended (4px base):
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

### 6.3 Unified Color Tokens

```css
/* Backgrounds */
--bg-primary: #0B0C1E;      /* midnight — page bg */
--bg-elevated: #141832;      /* deep blue — cards, elevated surfaces */
--bg-glass: rgba(11,12,30,0.55);

/* Text */
--text-primary: #E8DCC8;     /* ink/cream white */
--text-secondary: #8A7D6A;   /* ink-dim */
--text-accent: #D4A870;       /* cream — highlighted text */

/* Accents */
--accent-amber: #C08A2C;     /* primary accent */
--accent-rose: #C44858;       /* secondary, hearts */
--accent-teal: #1A4A5C;       /* boy journey */
--accent-flame: #C45E2A;
--accent-ember: #E8834A;

/* Borders */
--border-subtle: rgba(80,90,140,0.2);
--border-accent: rgba(192,138,44,0.25);

/* Functional */
--stone: #7A7A78;
```

### 6.4 Component Library (needed)

| Component | Status | Notes |
|-----------|--------|-------|
| Nav (desktop) | Built (3 variants) | Needs consolidation into 1 |
| Nav (mobile) | Built (2 variants) | Homepage vs journey differ |
| Glass Panel | Built | Shared but defined separately |
| Scene Section | Built | Duplicated across boy/girl |
| Metric Card | Built | Scene 02 only |
| Truth Column | Built | Scene 03 only |
| Journey Stage | Built | Scene 04 only |
| Pixel Character | Built | 7 characters via box-shadow |
| Footer | Built (2 variants) | Homepage vs journey differ |
| CTA Button | Built (3 variants) | Inconsistent styling |
| Word Reveal | Built | JS duplicated across pages |
| Descent Meter | Built | Journey pages only |
| Float Tag | Built | Notification popup style |

### 6.5 Grid System

No grid system exists. Layout is ad-hoc per section. Recommended:
```css
.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-6); }
.container--narrow { max-width: 720px; }
.container--wide { max-width: 1440px; }
```

---

## 7. Performance Improvements

### 7.1 Current Performance Profile (estimated)

| Metric | Homepage | Journey Pages |
|--------|----------|---------------|
| Total Page Weight | ~350KB | ~600KB |
| Images | ~250KB (3 JPGs) | ~450KB (4 JPGs) |
| CSS | ~13KB | ~28KB |
| JS | ~3KB + GSAP 70KB | ~16KB + GSAP 85KB |
| Fonts | ~50KB (2 families) | ~50KB (2 families) |
| LCP | hero-bg.jpg | scene-01.jpg |
| FID | Good (minimal JS) | Moderate (heavy GSAP init) |
| CLS | 0 (no layout shift) | 0 (fixed backgrounds) |

### 7.2 Recommended Optimizations

| Optimization | Impact | Effort |
|-------------|--------|--------|
| Convert images to WebP | -35% image weight | Low |
| Preload LCP image on journey pages | -200-400ms LCP | Low |
| Remove `background-attachment: fixed` | Eliminates scroll jank | Low |
| Lazy load scenes 2-4 | -300KB initial load | Medium |
| Subset Space Grotesk to 2 weights | -15KB font weight | Low |
| Add `font-display: swap` | Faster text render | Low |
| Add passive scroll listeners | Unblock main thread | Low |
| Share GSAP across pages via cache | Browser-cached after first visit | Low |
| Defer ScrollTrigger registration | Faster TTI | Medium |

### 7.3 Target Lighthouse Scores

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Performance | 70-80 | 95+ |
| Accessibility | 60-70 | 90+ |
| Best Practices | 75-85 | 95+ |
| SEO | 65-75 | 95+ |

---

## 8. UX Improvements

### 8.1 User Flow Analysis

```
Landing → Hero (scroll prompt) → Choose Journey → [Boy | Girl] Journey (4 scenes) → Enter Mirror → Form
```

**Drop-off points:**
1. **Hero → Choose section gap:** The hero fills 100vh, then the choose section is a standard padded section. There's a jarring transition from immersive to mundane. The choose section should feel like the NEXT moment of the journey, not a menu.

2. **Journey selector → Journey page:** Full page load. The immersion breaks. Consider keeping the hero on the journey page minimal (scene 01 IS the hero — no separate hero needed).

3. **Scene 04 CTA → begin.html:** Total design language break. User goes from pixel-art immersion to a plain form with grain overlay and custom cursor. Critical conversion point, worst UX.

4. **Mobile nav:** Homepage nav is hidden below 900px but the hamburger toggle works. Journey pages start with nav-links hidden too. Consistent but the mobile nav panel doesn't include the "ENTER MIRROR" CTA visually enough — it's the primary conversion action.

### 8.2 Copy Audit

**Too long:**
- Hero sub-text on homepage (3 lines, 26 words). Cut to 1 line: "Map the patterns shaping your life."
- Scene whispers sometimes stack 3 paragraphs. Two max.

**Too similar:**
- Boy and Girl Scene 01 share identical lead copy ("Everyone gave you a map..."). The whispers differ but the lead should too — the boy and girl experience different pressures.

**Missing:**
- No social proof anywhere (testimonials, numbers, press)
- No urgency or scarcity mechanism
- No "what happens next" after Mirror entry

### 8.3 Cognitive Load

Scene 02 (The System) has 10 metric cards. On mobile, this is overwhelming. Recommend: 5-6 cards max, or group them into 2 rows with a reveal animation that staggers them.

Scene 03 (The Truth) stacks a panel + truth columns + layers diagram. Three distinct information blocks in one viewport. Consider splitting truth columns and layers diagram into separate scroll sections.

---

## 9. Code Refactors

### 9.1 Immediate (current vanilla stack)

1. **Extract `shared/tokens.css`** — single source for all design tokens
2. **Extract `shared/core.css`** — nav, footer, glass panel, word reveal, responsive base
3. **Extract `shared/core.js`** — nav toggle, word reveal, descent meter, scroll utilities
4. **Delete legacy v1 pages** from deploy (index.html, mirror.html, journey.html, framework.html at website root)
5. **Move source PNGs** to `/sources/` outside deploy tree

### 9.2 Medium-term (still vanilla, better architecture)

```
website/
  shared/
    css/tokens.css         (1KB — variables only)
    css/core.css           (8KB — shared components)
    js/core.js             (4KB — shared utilities)
  home/
    index.html
    css/style.css          (5KB — homepage-specific)
    js/main.js             (3KB — homepage animations)
    img/                   (optimized WebP)
  his/
    index.html
    css/style.css          (3KB — boy overrides + pixel chars)
    js/main.js             (12KB — scene animations)
    img/
  her/
    index.html
    css/style.css          (3KB — girl overrides + pixel chars)
    js/main.js             (12KB — scene animations, shared with boy)
    img/
  begin.html               (rebuilt in v2 design system)
  img/                     (shared assets: og-image, favicon)
```

### 9.3 Future (framework migration)

If the site grows beyond 5-6 pages, consider:

**Next.js + Tailwind + Framer Motion:**
- Server-side rendering for SEO
- Automatic code splitting per route
- Tailwind replaces the CSS duplication problem
- Framer Motion replaces GSAP (smaller bundle, React-native)
- Image optimization built-in (next/image)
- Easy shared layout (nav, footer once)

**However:** For the current scale (4 pages + 1 form), the vanilla stack is correct. A framework would add complexity without proportional benefit. Revisit when adding: user accounts, dynamic content, CMS, or 5+ additional journey pages.

---

## 10. Accessibility Audit

### 10.1 Issues Found

| Issue | Severity | Location |
|-------|----------|----------|
| No `prefers-reduced-motion` | High | All pages |
| No skip-to-content link | Medium | All pages |
| No `lang` attributes on text with special characters | Low | Unicode hearts, stars |
| Color contrast: `--text-dim` (#8A7D6A) on `--midnight` (#0B0C1E) | Medium | Ratio ~3.5:1, needs 4.5:1 |
| Color contrast: `--stone` (#7A7A78) on dark backgrounds | Medium | Ratio ~4.1:1, borderline |
| No focus-visible styles on interactive elements | High | Nav links, CTAs have no visible focus ring |
| Scene panels `opacity: 0` in CSS with JS reveal | Medium | Content invisible without JS |
| `aria-hidden="true"` on descent meter | Good | Correctly applied |
| Mobile nav: no `aria-expanded` on toggle | Medium | Screen readers can't track state |
| Form inputs on begin.html missing `autocomplete` | Low | Should have `autocomplete="given-name"` etc. |

### 10.2 Fixes

```css
/* Focus visible */
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent-amber);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .word { opacity: 1 !important; transform: none !important; }
  .scene-panel { opacity: 1 !important; }
}
```

```html
<!-- Skip to content -->
<a href="#main" class="skip-link">Skip to content</a>

<!-- Nav toggle aria -->
<button class="nav-toggle" aria-label="Menu" aria-expanded="false">
```

### 10.3 Contrast Fixes

- `--text-dim` / `--ink-dim`: Lighten to `#A09580` (ratio 5.2:1)
- `--stone`: Lighten to `#8A8A88` (ratio 4.8:1)
- Or darken background behind these text elements

---

## 11. SEO Audit

### 11.1 Issues

| Issue | Pages Affected |
|-------|---------------|
| Duplicate `<title>` across 3 pages | Homepage, Boy, Girl |
| No structured data (JSON-LD) | All |
| No Open Graph / Twitter Card meta | All |
| No `<link rel="canonical">` | All |
| No sitemap.xml | Site-wide |
| No robots.txt | Site-wide |
| `<h1>` on journey pages is the scene title, not the page topic | Boy, Girl |
| `id="journey"` used on both homepage and Scene 04 of journey pages | Boy, Girl |
| No `alt` text on images (images are CSS backgrounds) | All |
| No internal linking beyond nav | All |

### 11.2 Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Orbisojas",
  "url": "https://orbisojas.com",
  "description": "A life navigation system for the modern human.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://orbisojas.com/begin.html?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 11.3 Heading Hierarchy

**Current (Boy page):**
```
h2 — THE BOY (Scene 01)
h2 — THE SYSTEM (Scene 02)
h2 — THE TRUTH (Scene 03)
h2 — THE JOURNEY (Scene 04)
```
No `<h1>`. The `<title>` tag is the only page-level heading.

**Recommended:**
```
h1 — His Journey — Orbisojas (visually hidden or in the nav area)
h2 — THE BOY
h2 — THE SYSTEM
h2 — THE TRUTH
h2 — THE JOURNEY
```

---

## 12. Motion Audit

### 12.1 Purposeful Motion (Keep)

| Animation | Purpose | Status |
|-----------|---------|--------|
| Word-by-word reveal | Storytelling pacing, "text as event" | Keep — core to identity |
| Scene panel fade from depth | Emergence into awareness | Keep — matches descent philosophy |
| Metric card stagger | Building pressure, system overwhelm | Keep — narrative function |
| Notification tag pop-in | Social pressure visualization | Keep — storytelling |
| Heart pop + floating hearts | Validation dopamine hit | Keep — clever commentary |
| Typewriter (WORK.EARN.REPEAT.) | Loop trap visualization | Keep — powerful |
| Never-enough loading bar | Infinite striving metaphor | Keep — design-as-meaning |
| Layer activation cascade | Consciousness layers revealing | Keep — framework visualization |
| Journey stage light-up | Character progression | Keep — game-feel |
| Descent meter fill | Progress through the descent | Keep — orientation |
| Ojas Orb pulse | Brand heartbeat | Keep — subtle brand presence |

### 12.2 Decorative Motion (Review)

| Animation | Issue | Recommendation |
|-----------|-------|---------------|
| `orbPulse` on BOTH nav orbs and hero divider heart | Three simultaneous pulsing elements visible at once | Keep on nav orb only. Hero divider heart should be static or pulse once on reveal. |
| Floating tag drift (infinite yoyo) | 6-7 elements each running infinite GSAP tweens | Reduce to CSS `animation` for lower overhead, or stop drift after 2 cycles |
| Clock label pulse (infinite yoyo) | Subtle but adds to animation count | Keep — it's the "2am phone" detail |
| Scroll arrows (infinite) | Standard UX pattern | Keep but respect `prefers-reduced-motion` |
| `keepUpPulse` (infinite border pulse) | Adds urgency authentically | Keep — it's the "urgency trap" |

### 12.3 Performance-Impacting Motion

| Issue | Impact | Fix |
|-------|--------|-----|
| `background-attachment: fixed` + GSAP parallax on same elements | Double compositing cost | Remove CSS `background-attachment: fixed` |
| 6+ infinite GSAP tweens (floating tags) | ~6 active tweens running continuously | Convert to CSS `animation` or stop after leaving viewport |
| Scroll listener without passive flag | Blocks scroll on mobile | Add `{ passive: true }` |
| No `will-change` hints on animated elements | Browser can't optimize ahead | Add `will-change: transform, opacity` on `.scene-panel`, `.jcard` |

---

## 13. Storytelling Audit

### 13.1 Current Flow

```
Homepage:  EVERY LIFE IS A JOURNEY → Choose Boy or Girl → Enter Mirror fallback
Boy/Girl:  THE BOY/GIRL (maps) → THE SYSTEM (pressure) → THE TRUTH (real vs visible) → THE JOURNEY (path) → Enter Mirror
```

This maps well to: **Discovery → Recognition → Reflection → Understanding → Navigation**

| Stage | Scene | Mapping | Strength |
|-------|-------|---------|----------|
| Discovery | Scene 01 | "Everyone gave you a map" | Strong — universal hook |
| Recognition | Scene 02 | "You're running an OS you never chose" | Strong — metric cards are visceral |
| Reflection | Scene 03 | "What you see vs what's really happening" | Good — truth columns are clear |
| Understanding | Scene 04 (path) | Character progression stages | Moderate — feels expository, could be more emotional |
| Navigation | CTA | "Enter the Mirror" | Weak — transitions to broken page |

### 13.2 Recommendations

1. **Scene 04 needs emotional weight, not information.** The character progression path (boy → seeker → builder → lover → sovereign) reads like a deck slide, not a felt experience. Consider: a single figure standing before the Mirror pool with the question "Are you ready to look?" — then the CTA.

2. **The transition from Scene 03 to Scene 04 is too abrupt.** Scene 03 reveals the wound ("fear, shame, inherited patterns"). Scene 04 immediately shows a happy progression path. There's no acknowledgment of the weight of the truth just revealed. A breathing moment between them — even just a full-viewport gradient with a single line of text — would honor the emotional arc.

3. **begin.html must continue the descent, not break it.** The form should feel like standing before the Mirror — dark, warm, intimate. Not a utility page.

---

## 14. Final Recommended Architecture

### Phase 1 — Immediate (this week)
Priority: Fix what's broken, eliminate waste.

1. Rebuild homepage journey selector as fullscreen character-select
2. Add `prefers-reduced-motion`, focus styles, ARIA attributes
3. Add unique titles, OG meta, canonical links per page
4. Remove `background-attachment: fixed` from journey pages
5. Add `{ passive: true }` to scroll listeners
6. Move 38MB of source PNGs out of deploy directory
7. Add `preload` for scene-01 on journey pages

### Phase 2 — Short-term (this month)
Priority: Consolidate architecture, improve performance.

1. Extract shared tokens.css, core.css, core.js
2. Convert all images to WebP with JPEG fallback
3. Implement lazy loading for scenes 2-4
4. Rebuild begin.html in v2 design system
5. Add sitemap.xml, robots.txt, structured data
6. Subset fonts to used weights only
7. Add favicon + apple-touch-icon

### Phase 3 — Medium-term (next quarter)
Priority: Scale and polish.

1. Decompose scene images into parallax layers
2. Add CSS particle effects (stars, mist) to replace static backgrounds
3. Build interactive character selector with mouse-follow glow
4. Add social proof section (when available)
5. Consider framework migration if adding more pages

### Phase 4 — Long-term (when needed)
Priority: Platform evolution.

1. Next.js migration for SSR, routing, image optimization
2. CMS integration for content updates
3. Canvas/WebGL for interactive pixel art scenes
4. User accounts and Mirror results dashboard

---

*Audit completed: 2026-06-17*
*Auditor: Claude (Principal Frontend Architect mode)*
*Scope: Full codebase, all pages, all assets*
