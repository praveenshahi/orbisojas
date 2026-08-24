# 05 — SEO Strategy

## The position

Orbis Ojas sits in a gap almost nobody occupies. Western searchers describe their pain in **therapy vocabulary**; Eastern traditions describe the same phenomena in **an entirely different vocabulary**. Both have large demand. Almost nothing credibly joins them.

We become the canonical translation layer. That wins near-zero-competition long-tail, borrows demand from saturated head terms through semantic proximity, and gives AI engines something genuinely new to cite.

## Three tiers

**Tier 1 — Pattern queries (the demand).** First-person, high intent, emotionally loaded.

`why do i keep abandoning myself` · `why do i self sabotage` · `why do i keep attracting the same kind of people` · `why do i feel empty after achieving things` · `why do i overthink everything` · `why can't i let go` · `why don't i trust myself` · `why do i hide my true self` · `why do i feel stuck`

These are the homepage constellation **and** the nine Atlas entries. The emotional hook and the keyword map are the same object.

**Tier 2 — Bridge queries (the moat).** Near-zero competition, disproportionate AEO value.

`koshas and attachment theory` · `samskara vs limiting belief` · `vedic psychology of repeating patterns` · `vasana and self sabotage` · `tamas and learned helplessness` · `eastern and western approaches to self-sabotage`

Each Atlas entry targets one of these through its `western.term` / `eastern.term` pair.

**Tier 3 — Brand entity.** `orbis ojas` · `soul mirror report` · `inner architecture` · `core loop`. Low volume, fully owned, and the terms AI engines must bind to the brand.

## Section → query map

The copy contract. Every section is written to one primary query, chosen before writing.

| Route / section | Primary query |
| --- | --- |
| `/` hero | why do i keep abandoning myself |
| `/` domains | are my problems connected |
| `/` artifact | what is a soul mirror report |
| `/` testimonials | soul mirror reviews |
| `/soul-mirror` hero | soul mirror report |
| `/soul-mirror` metrics | what is included in a soul mirror |
| `/soul-mirror` reveals | what does soul mirror reveal |
| `/soul-mirror` process | how does soul mirror work |
| `/soul-mirror` FAQ | is soul mirror astrology / how long does it take |
| `/atlas` hero | eastern and western psychology compared |
| `/atlas` translation | kosha psychology correspondence |
| `/atlas/[slug]` | the entry's own question, verbatim |

One primary query per section. No stuffing. Density comes from **entity coverage, not repetition**.

## Technical

- **All copy server-rendered.** The constellation animates via CSS but its text ships in the initial HTML. This constrains how that component may be built — see `04_COMPONENT_LIBRARY.md`.
- `sitemap.ts` generates from the content layer, so publishing an Atlas entry adds it automatically.
- `robots.ts` allows all agents, AI crawlers included — blocking GPTBot or ClaudeBot would forfeit the AEO strategy entirely.
- Canonicals on every route via `alternates.canonical`; `metadataBase` set in the root layout.
- `opengraph-image.tsx` generates the share card at build time.
- Every route is statically prerendered. Fast TTFB is a crawl-budget input.

## Schema graph

Typed builders in `web/lib/seo/schema.ts`, composed per route via `graph()`.

| Node | Where |
| --- | --- |
| `Organization`, `WebSite` | Root layout, every page |
| `Product` + `HowTo` + `FAQPage` | `/soul-mirror` |
| `Review` (×3) | `/` |
| `CollectionPage` + `DefinedTermSet` | `/atlas` |
| `Article` | `/atlas/[slug]` |
| `BreadcrumbList` | Every non-root route |

**No `AggregateRating`, and `Review` carries no `reviewRating`.** The testimonials are real, but there are no per-review scores and no verified aggregate. Inventing either is review spam under Google's policy. Add ratings only when there is a real collection process behind them.

## Internal linking

```
Homepage constellation → /atlas/[question] → /soul-mirror → #request
Atlas index/table      → /atlas/[question] ↗
Every Atlas entry      → /soul-mirror
```

`/soul-mirror` is deliberately the most-linked internal destination. No page is more than two clicks from the form.

## Headings

One `h1` per page. No skipped levels. Verified per build:

```bash
curl -s http://localhost:3000/soul-mirror | grep -o '<h[1-6]' | sort | uniq -c
```

Things that are *not* headings: footer column labels, discipline names in the Soul Mirror hero (a `<dl>`), decorative labels. Inflating the outline dilutes it.

## Launch checklist

- [ ] Google Search Console + Bing verification
- [ ] Submit `sitemap.xml`
- [ ] IndexNow ping on deploy
- [ ] Rich Results Test: Product, FAQPage, HowTo, Article
- [ ] Confirm `orbisojas.com` canonical host, no www duplicate
