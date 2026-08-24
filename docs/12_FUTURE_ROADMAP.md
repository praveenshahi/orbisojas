# 12 — Future Roadmap

Ordered by leverage, not by ease.

## Immediate — blocked on assets

- **The book photograph at 2000px+** — the angled cover beside the open spread, standalone. The artifact band is built to receive it and currently runs a crop from the comp.
- **Three testimonial avatars** — Ananya, Rohan, Meera. The cards render a gold monogram disc until they land, which is a deliberate state rather than a gap.
- **`NEXT_PUBLIC_WEB3FORMS_KEY`** — the form cannot deliver without it.

## Next — the Atlas is the growth engine

Nine entries are published. The strategy scales with the count.

- **Grow to 30–50 entries.** Every repeating pattern people bring. Adding one is a content-file change: route, sitemap, index row, correspondence row and schema all follow.
- **The framework reference** — the five koshas, nine vayus and three gunas set out precisely with their psychological correspondences. Deepens the `DefinedTermSet` and gives models more to bind to the brand.
- **Practices** — sequenced by pattern, not offered as general prescription.
- **"Where they disagree"** — the honest section. Where these traditions contradict each other and what that tension is worth. Nobody writes this, which is exactly why it will get cited.
- **Search** across Atlas content once the entry count justifies it.

## The About / Founder page

Fully designed in `aboutpage.jpeg` and deliberately deferred by the three-page scope. It is the strongest remaining trust asset — a founder page does work no product page can. Needs: the founder portraits, the practice photo grid, and the "Why I Built Orbis Ojas" video.

## Video — HTML to MP4

`hyperframes` is installed for this. The intent is to explain the inner-architecture concept visually, which is hard to do in prose and is the single biggest comprehension barrier for a first-time visitor.

Strong candidates: the core loop animating through one cycle; the constellation resolving from scattered questions into one pattern; a walkthrough of the report.

Remotion is an alternative for the same job. It is an npm package, not a skill — and it belongs in its own project, not in `web/`, where 50 MB of video tooling would compromise the bundle discipline.

## Conversion

- **Instrument the form.** Field-level drop-off on a nine-field form is the highest-value thing not currently measured.
- **A/B the hero prompt** — the input-styled CTA versus a plain button.
- **Reconsider "pricing on enquiry."** It suits high-value personalised work, but it is friction. Worth testing a stated price once there is enough volume to read the result.
- **Ratings** — once there is a real collection process, `AggregateRating` unlocks stars in search results. Not before; inventing an aggregate is review spam.

## Platform

- **Client portal** — the comps show one. Real product surface: deliver reports, book the integration session, hold history.
- **Move the form off Web3Forms** to a route handler plus a database when volume justifies it. `lib/forms/adapter.ts` exists so this is one file.
- **RSS** for Atlas entries once publishing is regular.
- **Internationalisation** — the Eastern vocabulary has obvious relevance in India specifically. `next-intl`, and the content layer is already separated for it.

## Maintenance

- Re-audit Lighthouse each quarter and after any dependency major.
- Re-run the AI citation test monthly (`06_AEO_STRATEGY.md`) and write more of whatever gets cited.
- Keep `llms.txt` current with the correspondence table.
- Every new section leads with its ≤40-word answer sentence. The contract does not lapse because the site got bigger.
