import type { GlyphKey } from "@/types/content";

/**
 * Insights: research notes, field notes and case studies.
 *
 * This is the surface you add to. Publishing here does three things at once
 * — it creates an indexable page, it appears in the Insights index, and it
 * can be referenced from `content/atlas/resources.ts` so it enriches the
 * Atlas node it belongs to.
 *
 * Adding one is a single object. Nothing else needs touching.
 */

export type InsightKind = "research" | "field-note" | "case-study";

export interface Insight {
  slug: string;
  kind: InsightKind;
  title: string;
  /** ≤40 words. Renders first, and is the AI-liftable sentence. */
  summary: string;
  /** Which of the seven fields this belongs to. */
  domain: string;
  glyph: GlyphKey;
  date: string;
  /** Paragraphs. Kept as plain strings so MDX stays optional. */
  body: string[];
}

export const insights: Insight[] = [
  {
    slug: "the-fawn-response-and-svadharma",
    kind: "research",
    title: "The fawn response, and what it costs you",
    summary:
      "Self-abandonment is a safety strategy, not a character flaw. Clinical language explains how it was installed; contemplative language explains what is lost while it runs.",
    domain: "identity",
    glyph: "spiral",
    date: "2026-08-01",
    body: [
      "The fawn response is the least discussed of the four. Fight, flight and freeze are legible — they look like something happening. Fawning looks like being easy to get along with, which is why it survives so long without being named.",
      "A child who could not afford a caregiver's withdrawal learns to read the room faster than they read themselves. That is an adaptive skill, and it works. Repeated for two decades it stops being a skill and becomes a personality: accommodating, unusually attuned, and unable to locate its own preference under pressure.",
      "Contemplative traditions describe the same event from the other end. Svadharma is one's own particular nature and obligation — the life that is actually yours to live. Losing it is treated not as a moral failure but as a kind of disorientation: acting from another's dharma while your own goes unlived.",
      "The two accounts are complementary, and neither is sufficient alone. Treating only the mechanism produces someone who can set boundaries and still does not know what they want.",
    ],
  },
  {
    slug: "why-insight-does-not-change-behaviour",
    kind: "field-note",
    title: "Why insight rarely changes behaviour",
    summary:
      "Understanding a pattern and interrupting it are different operations. Insight is verbal; the pattern is not. That mismatch explains most of the frustration people bring to this work.",
    domain: "mind",
    glyph: "book",
    date: "2026-08-12",
    body: [
      "Almost everyone who arrives here has already read the books. They can name their attachment style, describe their childhood accurately, and explain exactly why they do the thing they keep doing.",
      "And they keep doing it.",
      "The classical framing is useful here. A vasana is a latent tendency — a disposition carried beneath awareness that inclines behaviour before deliberation begins. It is not what you choose. It is what is already leaning when the choice arrives.",
      "If the tendency is not primarily verbal, it is unlikely to be dissolved verbally. This is why a Soul Mirror maps the loop, the belief beneath it and where it sits in the body together, rather than offering a better explanation of something you can already explain.",
    ],
  },
];

export function findInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export const INSIGHT_KIND_LABEL: Record<InsightKind, string> = {
  research: "Research",
  "field-note": "Field note",
  "case-study": "Case study",
};
