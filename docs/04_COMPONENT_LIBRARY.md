# 04 — Component Library

Everything under `web/components/`. Server Components unless marked **client**.

## `ui/` — primitives

| Component | Notes |
| --- | --- |
| `Container` | `width="shell" \| "prose"`. The only place horizontal inset is set. |
| `Section` | The structural unit. `tone` sets ground **and** grain together. |
| `Headline` | Renders a `SplitHeadline` where one phrase carries gold emphasis. The emphasis is styling only — one sentence to a screen reader, one string to a crawler. |
| `Eyebrow` | Tracked uppercase label. `tone` for dark/parchment. |
| `Button` | `primary`, `ghost`, `ghostInk`, `quiet`, `quietInk`. Renders a `next/link`. |
| `Field` | Label + control + hint, wired with `aria-describedby`. Input or textarea via `rows`. |
| `Mark` | The nine-point orbital logo. Drawn — crisp at every size, no request. |
| `Ornament` | `Starburst`, `Divider`, `CornerFrame`. |
| `Reveal` | **client.** Scroll reveal via IntersectionObserver. ~0.4 kB, no animation library. |
| `JsonLd` | Renders a schema graph into the document. |

### `Section` and the answer-first contract

Every section leads with its ≤40-word answer sentence before supporting prose. That sentence is what AI engines lift, so it is chosen deliberately and rendered first — see `06_AEO_STRATEGY.md`.

### `Reveal` — the important detail

The hidden state is scoped to `html.js`, set by a tiny inline script in `layout.tsx` before first paint. **Without JavaScript the rule never applies and everything renders visible.**

This was a real bug: `.reveal { opacity: 0 }` applied unconditionally meant a failed bundle produced a blank page below the hero. Content must never depend on script to be seen. Do not reintroduce an unconditional hidden state.

## `graphics/` — information graphics

Drawn as SVG rather than shipped as images: sharper than photography, themeable from tokens, animatable, and free of any asset dependency.

| Component | What it draws |
| --- | --- |
| `PatternMap` | Six-axis radar (mind, identity, emotions, body, relationships, purpose) plus the scored bars |
| `CoreLoop` | Trigger → reaction → reinforcement → return, Orbis mark at centre |
| `DomainFlow` | Six gold-ringed icons joined by dotted arrows |

> **viewBox bleed.** `PatternMap` uses `-18 0 236 264` and `CoreLoop` `-24 0 248 206`. Long labels ("Relationships", "Reaction") clip against a tight box. Keep the bleed when editing.

## `layout/`

| Component | Notes |
| --- | --- |
| `Navbar` | **client** — scroll state and mobile overlay only. Everything it renders is in the server HTML. Focus-trapped, `Esc` closes, body scroll locked while open. |
| `Footer` | Columns are `<p>`, not headings — the `<nav>` is already labelled and footer columns shouldn't enter the document outline. |

> Neither logo link carries an `aria-label`. An accessible name that doesn't contain the visible text breaks voice control ("click Orbis Ojas"). The visible text is the name.

## `home/`

`Hero` · `QuestionCluster` · `PatternDomains` · `ArtifactShowcase` · `Testimonials` · `TrustClose`

**`QuestionCluster`** is the brand's signature object and deserves care:

- Server Component. The motion is pure CSS, so it ships **zero JavaScript** while every question stays in the initial HTML — which matters, because these nodes are also the Tier-1 keyword map.
- Questions are set *into* the sky as glowing text. No pill, no border, no backdrop blur — that reads as chat UI and flattens the one image the brand owns.
- One DOM, two layouts: a centred column on small screens, an absolutely positioned constellation from `lg`.
- **The `<ul>` carries `height: 100%` at `lg`.** It is the nodes' containing block, so without it their percentage offsets resolve against zero and every node stacks at the top.
- Star scatter uses a seeded hash, never `Math.random()`, so server and client renders match.

**`Testimonials`** renders a gold monogram disc when `avatar` is `null` — a deliberate treatment, not a broken image.

## `soul-mirror/`

`MirrorHero` · `MetricStrip` · `Reveals` · `Process` · `Faq` · `RequestForm`

**`Faq`** uses native `<details>`/`<summary>`: keyboard operable, screen-reader correct, zero JavaScript, and the answers sit in the DOM regardless of open state — which is what makes it the page's strongest AEO asset.

**`RequestForm`** is **client**. Two fieldsets, honeypot, inline validation, a real success state. Posts through `lib/forms/adapter.ts`.

## `atlas/`

`AtlasHero` · `QuestionIndex` · `TranslationTable` · `Upcoming`

`AtlasHero` reuses `QuestionCluster` directly — the constellation becomes the navigation, so the homepage's promise and the Atlas are the same object.

`TranslationTable` is a real `<table>` with `<caption>` and `<th scope>`, because it is real tabular data and that is how a crawler reads the correspondence.

## Rules

1. Tokens only. No literal colours or sizes in components.
2. Server Components by default. `"use client"` needs a stated reason.
3. Decorative SVG gets `aria-hidden` and `focusable="false"`.
4. Every interactive element keeps the global focus ring.
5. Copy lives in `content/`, never inline in JSX.
