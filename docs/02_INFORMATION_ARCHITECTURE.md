# 02 — Information Architecture

## Route map

```
/                          Homepage — recognition
/soul-mirror               The product — explanation and proof
/soul-mirror/request       The conversion — the form
/atlas                     The knowledge layer — entrance + question index
/atlas/[slug]              An individual answer (generated from content layer)

/sitemap.xml   /robots.txt   /llms.txt        generated
/opengraph-image                              generated per route
```

Deferred but architecturally provisioned: `/about`, `/atlas/practices`, `/atlas/research`, `/insights` (RSS-ready).

## The narrative spine

The three pages are not siblings. They are a sequence with distinct jobs, and each ends by handing the visitor to the next.

| Page | Job | Emotional state on arrival | Emotional state on exit |
| --- | --- | --- | --- |
| Homepage | **Mirror** | "Let me see what this is" | "This is describing me" |
| Soul Mirror | **Guide** | "What would I actually get?" | "This is real and I want it" |
| Atlas | **Universe** | "Are these people credible?" | "They know things nobody else has written down" |

The Atlas is the trust layer. It exists so that a sceptical, intelligent visitor can verify depth before spending money — and so that search engines and AI models have something substantial to index.

## Homepage structure

Ordered by the visitor's actual sequence of doubt.

1. **Hero — the question cluster.** A constellation of real first-person questions around a central node. The visitor finds theirs. Nothing is explained yet. One input: *What have you been trying to understand?*
2. **Connected domains.** The reveal that these questions are not separate — relationships, boundaries, self-worth, emotions, identity, purpose are one structure viewed from six angles. This is the first genuinely new idea the visitor encounters.
3. **The artifact.** Ivory band. The physical report, the pattern map, the core loop. Proof that something real is delivered. Answers "what do I actually get" before the visitor has to ask.
4. **Evidence.** Testimonials from people describing the shift, not praising the service. *Ships only if real.*
5. **Trust bar.** Confidentiality, the disciplines integrated, volume delivered. *Numbers ship only if real.*
6. **Close.** One CTA. No competing action.

**Heading hierarchy:** one `h1` (the hero headline). Each section a single `h2`. Sub-items `h3`. Never skipped.

## Soul Mirror page structure

1. **Hero** — "Meet yourself. Beyond your own story." Plus the disciplines strip (Astrology / Psychology / Somatics / AI + Human) and two CTAs: primary request, secondary sample.
2. **Credibility strip** — 5 koshas · 9 vayus · 12+ life areas · 32+ pages · 100% confidential. Concrete, countable, unusual.
3. **What it reveals** — the substantive list, paired with the report spread imagery.
4. **How it works** — six steps. Carries `HowTo` schema.
5. **FAQ** — the objections that actually block purchase, answered directly. Carries `FAQPage` schema.
6. **Close** — request.

## Request form

Single page, two fieldsets, no multi-step ceremony.

**Fieldset 1 — Coordinates**
`name` · `email` · `date of birth` · `time of birth` (with "I don't know" affordance) · `place of birth`

**Fieldset 2 — The pattern**
`What pattern keeps repeating in your life?` — the primary field, given visual weight
Three reflective questions, short-answer.

Honeypot field, inline validation on blur, a real success state that tells the person what happens next and when. Posts through `lib/forms/adapter.ts`.

## Atlas structure

Not a splash page. An entrance to a library that is visibly under construction but already useful.

1. **Entrance** — what the Atlas is and what it will hold.
2. **Question index** — the Tier-1 pattern questions, each linking to a genuine short answer. This is the SEO engine and the credibility proof simultaneously.
3. **Search** — built, functional over current content.
4. **What's coming** — honest, dated where possible.

Each `/atlas/[slug]` answer follows a fixed shape: the question as `h1`, a ≤40-word direct answer, the Western framing, the Eastern framing, the bridge between them, and a route to Soul Mirror.

## Internal linking

```
Homepage cluster node ──→ /atlas/[question]
                              │
                              └──→ /soul-mirror ──→ /soul-mirror/request
Homepage sections ────────────────→ /soul-mirror
Atlas entrance ───────────────────→ /soul-mirror
```

`/soul-mirror` is deliberately the most-linked internal destination. Every Atlas answer terminates in a route toward it. No page is more than two clicks from the form.

## Navigation

**Primary:** Soul Mirror · The Atlas · About *(when it exists)* — plus the CTA button, which is visually distinct and always present.

The nav is deliberately short. Every additional item is a competing destination, and the site has exactly one destination that matters.

**Mobile:** full-screen overlay, focus-trapped, `Esc` to close, CTA pinned at the bottom.

**Footer:** Explore / Resources / Connect columns, plus email capture. The footer is the only place secondary destinations are allowed to exist.

## Content ownership

All copy lives in `web/content/`, typed, separated from components. Rewriting a headline never requires touching a component. Every content object carries its target query so the copy contract in `lib/seo/keywords.ts` is verifiable in code review.
