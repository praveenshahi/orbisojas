# 10 — Folder Structure

Repo root is `orbisojas/`. The Next.js app lives in `web/`; the old static site remains at `website/` until DNS cutover, then is archived.

```
orbisojas/
├── docs/                        These twelve documents
├── new site/                    The reference comps (*.jpeg) — source of truth for design
├── website/                     The v1 static site. Untouched. Archived at cutover.
└── web/                         The application
    ├── app/
    │   ├── layout.tsx           Fonts, JSON-LD, skip link, the `js` flag script
    │   ├── globals.css          EVERY design token. Nothing else defines colour or size.
    │   ├── page.tsx             Homepage
    │   ├── soul-mirror/page.tsx Product page + inline request form (#request)
    │   ├── atlas/page.tsx       Star-map hero, index, correspondence table
    │   ├── atlas/[slug]/page.tsx  One answer. Prerendered per entry.
    │   ├── opengraph-image.tsx  Build-time share card
    │   ├── sitemap.ts           Generated from the content layer
    │   └── robots.ts            Allows AI crawlers deliberately
    ├── components/
    │   ├── ui/                  Primitives. Tone-aware, token-driven.
    │   ├── graphics/            SVG information graphics
    │   ├── layout/              Navbar, Footer
    │   ├── home/                Homepage sections
    │   ├── soul-mirror/         Product page sections
    │   └── atlas/               Atlas sections
    ├── content/                 ALL copy. Typed. home.ts · soul-mirror.ts · atlas.ts
    ├── lib/
    │   ├── seo/schema.ts        Typed schema.org builders
    │   ├── forms/adapter.ts     The Web3Forms → Typeform swap point
    │   └── cn.ts
    ├── types/content.ts         The shape of every content object
    ├── constants/nav.ts         Navigation, footer columns, SITE
    └── public/
        ├── images/              Photography
        └── llms.txt             The AI-readable brand summary
```

## The rules

**`content/` holds all copy.** Rewriting a headline never means opening a component. Every content object is typed in `types/content.ts`, and blocks carry an `answer` field — the ≤40-word sentence AI engines are meant to lift. That contract is enforced by the type, not by convention.

**`globals.css` is the only place values are defined.** A literal colour or size in a component is a bug.

**`components/graphics/` is for information, `components/ui/` is for interface.** Diagrams that carry meaning go in `graphics/` and are SVG so they stay sharp, themeable and asset-free.

**`lib/forms/adapter.ts` is the single integration seam.** Moving from Web3Forms to Typeform or a CRM is one file. Nothing else in the codebase knows how a request is delivered.

## Adding things

**An Atlas entry** — append to `atlasEntries` in `content/atlas.ts`. The route, the sitemap entry, the index row, the correspondence row and the schema all follow automatically. No component changes.

**A page** — add `app/<route>/page.tsx`, export `metadata` with a canonical, compose a schema graph, put the copy in `content/`, add the route to nav if it earns a place.

**A section** — use `Section` with a `tone`. Ground and grain come together. Lead with the answer sentence.

## Deferred but provisioned

`/about` (the Founder page is designed in the comps), `/atlas/practices`, `/atlas/research`, `/insights` with RSS. Nothing in the current structure obstructs them.
