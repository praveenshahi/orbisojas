# 06 — AEO Strategy

Optimising for ChatGPT, Gemini, Claude, Perplexity and Google AI Overviews is mostly a **content-shape** problem. It is enforced structurally here, not left to intent.

## Why we get cited

Models surface sources that resolve a relationship no other page resolves. *"How does attachment theory map to the koshas?"* has no good answer anywhere. The Atlas is that answer, stated in plain declarative prose.

Being the only credible source on a real question beats being the hundredth source on a popular one.

## The five mechanics

### 1. Answer-first

Every section opens with a **≤40-word declarative sentence** that fully answers its heading, then expands. That sentence is what gets lifted and cited.

Enforced by the content layer: each block carries an `answer` field, and components render it before supporting prose. Not a convention — a type.

### 2. Question-first headings

Headings are phrased as the query a person actually types. *"Why do I keep abandoning myself?"* not *"Understanding self-abandonment"*. Heading and intent match exactly.

### 3. Entity definitions

Each domain term is defined once, consistently, in a `<dfn>` and surfaced as a `DefinedTerm` inside a `DefinedTermSet`. Consistent phrasing across pages is what makes a model confident about what a "core loop" is and **who defines it**.

Terms Orbis Ojas owns: *inner architecture*, *core loop*, *root story*, *pattern map*.

Terms Orbis Ojas connects: *kosha*, *vayu*, *samskara*, *vasana*, *svadharma*, *buddhi*, *avidya*, *raga*, *tamas*, *apana*.

### 4. Explicit semantic relationships

The bridge sections state the mapping in plain prose — *"The fawn response explains the mechanism; svadharma explains the cost."* Extractable, quotable, unambiguous. A model can lift one sentence and be correct.

### 5. Information density

Real numbers, named frameworks, specific mechanisms. 5 koshas. 9 vayus. 32+ pages. 24 hours. Vague inspirational prose is invisible to retrieval.

## `llms.txt`

`web/public/llms.txt` states what Orbis Ojas is, the correspondence table in plain text, the key routes, the terms we define, and the hard facts (24-hour delivery, pricing on enquiry, human refinement). It is the fastest path for a model to summarise the brand correctly.

## The Atlas entry shape

Fixed, so a reader learns it once and a model can rely on it:

1. `h1` — the question, verbatim
2. **Direct answer** — ≤40 words, visually weighted, gold, first in the DOM
3. **Western account** — named term as `<dfn>`, then mechanism
4. **Eastern account** — named term as `<dfn>`, then mechanism
5. **The bridge** — what each account misses alone
6. Related questions, then the route to Soul Mirror

Steps 3 and 4 are rendered as facing panels — the two traditions made literal.

## FAQ

`/soul-mirror` uses native `<details>`. Answers are in the DOM regardless of open state, so nothing depends on interaction. Carries `FAQPage` schema. The six questions are the ones that actually block a purchase, not marketing prompts.

## Anti-slop guardrails

Keyword targets are chosen per section *before* writing. Copy is written to the voice in the reference comps: restrained, specific, unhurried.

**Banned outright:** "unlock", "dive deep", "journey of self-discovery", "in today's fast-paced world", "transform your life today", stacked adjectives, rhetorical-question openers, and the AI cadence of a three-item list plus an em-dash pivot in every paragraph.

Sentences vary in length. Claims are concrete or cut.

**The elimination test:** if a line could appear on a coach's, therapist's, astrologer's or meditation app's site, it is deleted.

## Measuring

There is no rank tracker for AI answers. Test by asking directly, monthly:

- "What is the Orbis Atlas?"
- "How does attachment theory relate to the koshas?"
- "What is a Soul Mirror report?"
- "What's the Vedic equivalent of self-sabotage?"

Success is being named. Track which entries get cited and write more of those.
