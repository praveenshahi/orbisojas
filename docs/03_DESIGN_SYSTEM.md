# 03 — Design System

All tokens live once in `web/app/globals.css` under `@theme`. Components consume tokens; components never invent values. If a colour or size appears as a literal in a component, that is a bug.

## Colour

Warm near-blacks, never neutral grey. Contrast ratios are measured, not estimated.

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `--color-void` | `#0a0908` | Page ground | — |
| `--color-ink` | `#12100e` | Raised bands | — |
| `--color-ink-raised` | `#1a1714` | Cards, inputs | — |
| `--color-parchment` | `#f4eee2` | Editorial bands | — |
| `--color-parchment-deep` | `#e8dcc6` | Insets on parchment | — |
| `--color-ivory` | `#f7f2e8` | Body text on dark | 17.4:1 |
| `--color-ivory-muted` | `#cabfae` | Secondary on dark | 9.9:1 |
| `--color-ivory-faint` | `#9a8f7e` | Tertiary on dark | 5.2:1 |
| `--color-ink-text` | `#1b1815` | Body on parchment | 15.6:1 |
| `--color-ink-muted` | `#554c40` | Secondary on parchment | 7.4:1 |
| `--color-gold` | `#c79a4e` | Accent, CTA fill | 7.6:1 on void |
| `--color-gold-bright` | `#e8c88a` | Headline emphasis | 12.1:1 on void |
| `--color-gold-deep` | `#8a6528` | Accent on parchment | 4.9:1 |

**Gold is the only accent.** No second hue. Anything that needs to stand out either uses gold or uses space.

Hairlines are gold at low opacity (`--color-hairline`, `--color-hairline-strong`, `--color-hairline-ink`), never grey borders. This is a large part of why the site reads warm rather than generic-dark.

> Any gold below ~55% opacity on a dark ground drops under 3:1. Use `/70` or higher for anything that carries meaning; reserve lower alphas for decoration.

## The tonal rhythm

Sections alternate **dark → parchment → dark**. This is the page's structure, not decoration, and it is what stops long pages reading as one undifferentiated scroll. `Section` takes `tone="dark" | "raised" | "parchment"` and applies the correct ground *and* its texture together, so a band cannot be built without grain.

## Texture

Every ground carries grain — a single tiled 200px SVG `feTurbulence` data URI. No network request, no layout cost, sharp at every DPR.

- `.grain-paper` — `multiply`, 6% — the grain sits *in* the sheet
- `.grain-film` — `overlay`, 3.5% — dark grounds gain depth without muddying
- `.graticule` — a faint 7rem gold chart rule, radially masked. Used on the Atlas.

This was the single highest-leverage change in the system. Flat colour is what made early builds read as templated.

## Typography

Two families. No more.

- **Display — Playfair Display Variable.** High-contrast serif. All headings, pull-quotes, index numbers, large numerals.
- **Body/UI — Instrument Sans Variable.** Humanist, warm. Body copy, labels, eyebrows, buttons.

Both self-hosted via `next/font` with `display: swap`. No third-party request.

Headings are optically tightened: `line-height: 1.06`, `letter-spacing: -0.018em`, `text-wrap: balance`. Body gets `text-wrap: pretty`.

### Scale

Fluid, clamped so ultra-wide never overshoots and mobile never crushes.

| Token | Range |
| --- | --- |
| `--text-display-xl` | 2.5 → 4.75rem |
| `--text-display-l` | 2.25 → 4.25rem |
| `--text-display-m` | 1.875 → 3rem |
| `--text-display-s` | 1.5 → 2.125rem |
| `--text-heading` | 1.25 → 1.5rem |
| `--text-lead` | 1.0625 → 1.25rem |
| `--text-eyebrow` | 0.75rem, `0.18em` tracking, uppercase |

**Eyebrow tracking tightens as containers narrow.** At six items across, `0.18em` makes adjacent labels collide; `DomainFlow` drops to `0.1em` at `xl`.

## Space

- `--spacing-section` — 5 → 10rem, the vertical beat between bands
- `--spacing-gutter` — 1.25 → 3rem, horizontal inset
- `--container-shell` — 82.5rem
- `--container-prose` — 34rem

## Motion

- `--ease-out-quint` `cubic-bezier(0.22, 1, 0.36, 1)` — the house easing
- Durations: 300ms interface, 500ms hover, 900ms reveal

Only `opacity` and `transform` are animated — both compositor-safe. See `07_ANIMATION_GUIDELINES.md`.

## Ornament

From the comps, in `components/ui/Ornament.tsx`:

- `Starburst` — eight rays, cardinals long and diagonals clipped, which gives the four-pointed read
- `Divider` — a hairline interrupted by the starburst; the section break
- `CornerFrame` — thin gold brackets framing photography

Drawn, not imaged. Used sparingly enough to still register as ornament.

## Component variants

Variants are **variants, not colour overrides.** Two competing text-colour utilities resolve by stylesheet order, not class order — which is how a CTA once rendered near-invisible on parchment. `Button` therefore has `ghost` and `ghostInk` as separate entries rather than one with a `className` patch.

## Focus

One treatment everywhere: `2px solid var(--color-gold-bright)`, `3px` offset. No component removes it.
