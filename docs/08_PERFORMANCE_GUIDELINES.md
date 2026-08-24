# 08 — Performance Guidelines

## Budget

| Metric | Target |
| --- | --- |
| LCP | < 1.8s |
| CLS | 0 |
| INP | < 100ms |
| Client JS (homepage) | < 90 kB gzipped |
| Lighthouse Performance | ≥ 95 mobile, ≥ 99 desktop |

## Server-first

Every route is statically prerendered. Four things ship client JavaScript, each for a stated reason:

| Component | Why |
| --- | --- |
| `Navbar` | Scroll state, mobile overlay |
| `Reveal` | IntersectionObserver |
| `RequestForm` | Form state and submission |
| — | nothing else |

**`QuestionCluster` is a Server Component.** The brand's most animated object costs zero JavaScript because its motion is pure CSS. That is the pattern to copy: if it can be CSS, it is CSS.

Adding `"use client"` requires a reason recorded in the component's doc comment.

## Dependencies

Four runtime dependencies: `next`, `react`, `react-dom`, `lucide-react`. Plus `motion`, installed and currently unused.

- Lucide is imported per-icon; `optimizePackageImports` handles the rest.
- **No CSS framework runtime** — Tailwind v4 compiles to static CSS.
- No animation library in the shipped bundle today. Adding one costs ~34 kB; justify it against what CSS can already do.

## Images

- AVIF and WebP via `next/image`, configured in `next.config.ts`.
- **Explicit `width`/`height` or `fill` on every image.** This is why CLS is 0.
- `priority` on the LCP image only — the hero vista. Everything else lazy-loads.
- Accurate `sizes`. A wrong `sizes` makes the browser fetch a 3840px source for a 300px slot.
- Diagrams are SVG components, not images: no request, no decode, sharp at every DPR.

## Texture without cost

Grain is a single tiled 200px SVG `feTurbulence` **data URI** — no network request, cached as part of the stylesheet, and static so it paints once. A full-viewport live SVG filter would be far more expensive.

## Fonts

Two variable families, self-hosted by `next/font` with `display: swap`. No third-party connection, no FOIT, no layout shift.

## CSS

All tokens in one `@theme`. Tailwind v4 emits only used utilities. The constellation's positioning is hand-written CSS rather than utilities — deliberate, because arbitrary-value parsing on the most load-bearing component is not worth the risk.

## Measuring

Always against a **production build**. The dev server optimises images on demand and will mislead you.

```bash
npx next build && npx next start -p 3100
```

Then:

```
lighthouse_audit --device mobile --mode navigation
performance_start_trace → reload → performance_stop_trace
```

For LCP specifically, invoke the `debug-optimize-lcp` skill.

## Verified

- No horizontal overflow at 375 / 768 / 1024 / 1440 / 2560
- All copy present with JavaScript disabled
- Accessibility, Best Practices, SEO, Agentic Browsing: 100, zero failing audits

## Known follow-ups

- [ ] Run mobile Lighthouse against a production build and record the number
- [ ] Bundle analysis to confirm the < 90 kB budget
- [ ] Re-check LCP once the 2000px book image lands — it will be the heaviest asset on the page
