# Site Architecture

## URL Structure

```
orbisojas.com/
  |-- /              Homepage (journey selector)
  |-- /his/          Boy's Journey (4-scene scroll descent)
  |-- /her/          Girl's Journey (4-scene scroll descent)
  |-- /begin.html    Enter the Mirror (form/entry — needs redesign)
```

## Navigation (unified across all pages)

```
[heart ORBISOJAS -> /]   [HIS JOURNEY -> /his/]   [HER JOURNEY -> /her/]   [ENTER MIRROR -> /begin.html]
```

- Current page gets `.nav-active` class (cream color + underline via ::after)
- Logo always links home
- Mobile: hamburger toggle, nav-links hidden until open
- Nav transitions: transparent at top, solid background at scrollY > 60

## Local File Structure

```
website/
  home/                     <- Homepage (deployed to /)
    index.html
    css/style.css
    js/main.js
    img/
      hero-bg.jpg           (75KB, 1536x341)
      boy-card.jpg           (72KB, 768x1024)
      girl-card.jpg          (98KB, 768x1024)
  
  template/                 <- Boy's Journey (deployed to /his/)
    index.html
    css/style.css
    js/main.js
    img/
      scene-01.jpg           (~65-86KB each)
      scene-02.jpg
      scene-03.jpg
      scene-04.jpg
  
  her/                      <- Girl's Journey (deployed to /her/)
    index.html
    css/style.css
    js/main.js
    img/
      scene-01.jpg           (~90-221KB each)
      scene-02.jpg
      scene-03.jpg
      scene-04.jpg
  
  begin.html                <- Mirror entry (legacy v1, needs redesign)
```

## Page Inventory

### Homepage (`/`)
- Hero section with GSAP word-by-word text reveal
- "CHOOSE YOUR JOURNEY" section with two cards (boy/girl)
- Cards have hover glow (boy=teal tint, girl=rose tint), arrow animation, shine sweep
- "EXPLORE THE SYSTEM" fallback CTA to begin.html
- Footer with SVG social icons (Discord, Instagram, YouTube, X) — all `#` placeholder links

### Boy's Journey (`/his/`)
- 4 pinned scroll scenes with parallax pixel art backgrounds
- Descent meter on left edge showing scroll progress
- Scene 01: "THE BOY" — maps given to you
- Scene 02: expectations shattering
- Scene 03: the descent inward
- Scene 04: arriving at the ground
- Floating expectation tags as notification popups
- CTA at bottom to begin.html

### Girl's Journey (`/her/`)
- Same 4-scene structure as boy's journey
- Scene 01: "THE GIRL" — different societal expectations
- Different whisper text: "Be good. Be quiet. Be grateful. Be pretty. Be perfect. Be small."
- Same descent meter, same scroll mechanics
- CTA at bottom to begin.html

### Enter Mirror (`/begin.html`)
- Legacy v1 design — needs rebuild to match pixel art aesthetic
- Currently functional but visually inconsistent with new pages

## Footer (all pages)

```html
[heart ORBISOJAS]
A NAVIGATION SYSTEM FOR THE MODERN HUMAN.
NOT JUST INFORMATION. TRANSFORMATION.
[Discord] [Instagram] [YouTube] [X]   <- SVGs at 18px, all # placeholder hrefs
```

---

**Related:** [[Tech Stack]] | [[Deployment Guide]] | [[Project Overview]]
