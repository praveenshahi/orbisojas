# 07 — Animation Guidelines

## Principle

Motion earns its place or it is removed. The brand's confidence is expressed through stillness and space; animation exists to make things feel physical, never to prove the site is modern.

## The rule that governs everything

**Only `opacity` and `transform` are animated.** Both are compositor-only — no layout, no paint, no jank. Animating `width`, `height`, `top`, `left`, `margin`, `box-shadow` or `filter` is a bug.

## What actually moves

| Motion | Where | How |
| --- | --- | --- |
| `drift` | Constellation questions | CSS keyframes, 8–14s, out of phase |
| `twinkle` | Constellation stars | CSS keyframes, 3.5–7s |
| `reveal` | Every section | IntersectionObserver + CSS transition |
| Hover lift | Cards, index rows, buttons | `translate` 1–2px, 300–500ms |
| Arrow slide | Buttons, index rows | `translate-x` 4px on hover |
| Chevron rotate | FAQ | `rotate-45` on `group-open` |
| Nav ground | Navbar on scroll | `background-color` + `backdrop-filter` crossfade |

**Framer Motion is installed and currently unused.** Everything above is CSS. That is deliberate: `motion` is ~34 kB of client JS and none of this needs it. Reach for it only for layout animations, gesture-driven motion or orchestrated exits — and then behind `LazyMotion` + `domAnimation`.

## Timing

| Duration | Use |
| --- | --- |
| 300ms | Interface response — buttons, links |
| 400–500ms | Hover states, colour transitions |
| 900ms | Scroll reveals |
| 3.5–14s | Ambient — drift, twinkle |

Easing is `--ease-out-quint` `cubic-bezier(0.22, 1, 0.36, 1)`: fast departure, long settle. Reads as weight rather than springiness.

## Stagger

Reveals stagger by 50–90ms per item, capped. `QuestionIndex` uses `Math.min(i, 6) * 50` so a long list never leaves the last item waiting half a second.

Ambient motion is deliberately **out of phase** — duration and delay derived from index. Synchronised breathing looks mechanical; drift looks alive.

## Reduced motion

`prefers-reduced-motion: reduce` collapses every duration to 0.001ms and disables `scroll-behavior: smooth`. Reveals resolve to fully visible.

Motion is never the only signal. Every hover state that moves also changes colour or border.

## Scroll reveal — the constraint that matters

`.reveal`'s hidden state is scoped to `html.js`, set by an inline script before first paint. **Without JavaScript nothing hides.**

This is not a nicety. An unconditional `opacity: 0` means a failed bundle renders a blank page below the hero, and it hid content from full-page captures and audits. Never reintroduce an unconditional hidden state.

The observer disconnects after firing. Nothing stays resident.

## Performance

- `will-change` only on genuinely continuous animation (`.drift`, `.breathe`). Applying it broadly costs memory.
- No animation above the fold competes with LCP — the hero image and headline are static.
- The constellation is a Server Component; its motion costs zero JavaScript.

## Verifying

```bash
# Record a trace and check for long tasks / dropped frames
performance_start_trace → interact → performance_stop_trace
```

Then re-run at `prefers-reduced-motion: reduce` and confirm content is still fully legible and every state still readable.
