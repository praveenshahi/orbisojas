# 09 — Accessibility

Target: **WCAG 2.1 AA**, verified by hand and by audit. Current Lighthouse accessibility score: **100, zero failing audits.**

## Colour and contrast

Every text token is measured against its ground in `03_DESIGN_SYSTEM.md`. Lowest passing pair is `--color-gold-deep` on parchment at 4.9:1.

> **The gold trap.** Gold below ~55% opacity on a dark ground falls under 3:1. `text-gold/45` measured 2.4:1 and failed. Anything carrying meaning uses `/70` or higher; lower alphas are for decoration only.

Colour is never the sole signal. Hover states that shift colour also move, underline or change border.

## Semantics

- One `h1` per page, no skipped levels.
- `header` / `nav` / `main` / `section` / `article` / `footer` used correctly.
- Footer columns are `<p>`, not headings — the `<nav>` is already labelled and they shouldn't enter the outline.
- The Soul Mirror disciplines are a `<dl>` — term and gloss, not four sections.
- The correspondence table is a real `<table>` with `<caption>` and `<th scope>`.
- The process is an `<ol>`; the FAQ is native `<details>`/`<summary>`.

## Naming

**No `aria-label` that contradicts visible text.** An accessible name not containing the visible label breaks voice control — a user saying "click Orbis Ojas" fails if the name is "Orbis Ojas — home". Both logo links rely on their visible text.

Decorative SVG carries `aria-hidden` and `focusable="false"`. Background images use `alt=""` plus `aria-hidden`.

## Keyboard

- One visible focus treatment everywhere: 2px `--color-gold-bright`, 3px offset. No component removes it.
- Skip link is the first focusable element, visible on focus.
- Mobile nav: focus-trapped, `Esc` closes, body scroll locked while open, closes on route change.
- Index rows are a single link wrapping the whole row — one tab stop and a large target, not three.
- `<details>` gives the FAQ correct keyboard behaviour for free.

## Forms

Every control has a real `<label>` with `htmlFor`. Hints are wired with `aria-describedby`. Fieldsets carry a `<legend>` (screen-reader only where the visual heading already serves). Errors use `role="alert"`. The honeypot is `aria-hidden` and `tabIndex={-1}`.

Optional fields are marked "optional" in text, not left to a colour cue.

## Motion

`prefers-reduced-motion: reduce` collapses all durations. Content never depends on motion to appear — the reveal system's hidden state is scoped to `html.js`, so no JavaScript means everything is visible.

## Images

Every `next/image` has explicit dimensions — zero layout shift. Decorative images get empty alt. The report imagery has descriptive alt naming what the spread actually shows.

## Responsive

Text reflows to 320px with no horizontal scroll. Wide content — the correspondence table — scrolls inside its own container, never the page body. Tap targets are ≥44px.

## Verification

```bash
# Audit
lighthouse_audit --device desktop --mode navigation

# Then by hand, which the audit cannot do for you:
```

1. Tab the whole page. Focus visible at every stop, order matches visual order.
2. Open the mobile nav with the keyboard alone; confirm the trap and `Esc`.
3. Complete the request form using only the keyboard.
4. Screen-reader pass: is the page comprehensible from the heading outline alone?
5. Re-run at `prefers-reduced-motion: reduce`.
6. Zoom to 200% and confirm nothing is clipped or overlapping.

A 100 score is a floor, not proof. It cannot tell you whether the tab order makes sense or whether an alt attribute is honest.
