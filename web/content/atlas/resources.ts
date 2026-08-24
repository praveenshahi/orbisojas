import type { AtlasResource, FieldNoteData, Pathway } from "@/types/atlas";

/**
 * The cards under "Explore this node".
 *
 * Six kinds are supported. Three are populated now from things that
 * genuinely exist — the named research, the field notes, and the Soul
 * Mirror chapters. `practice`, `product` and `case-study` are typed and
 * rendered but deliberately empty: they fill from /insights as you publish,
 * and a card type with nothing behind it simply does not render.
 */
export const atlasResources: AtlasResource[] = [
  /* --- Research: real citations, already named in the entries --------- */
  {
    id: "res-bowlby",
    kind: "research",
    domain: "relationships",
    title: "Attachment and Loss",
    meta: "John Bowlby · 1969",
    cta: { label: "View source", href: "/atlas/why-do-i-keep-attracting-the-same-people" },
  },
  {
    id: "res-winnicott",
    kind: "research",
    domain: "identity",
    title: "The True and False Self",
    meta: "D. W. Winnicott · 1960",
    cta: { label: "View source", href: "/atlas/why-do-i-hide-my-true-self" },
  },
  {
    id: "res-seligman",
    kind: "research",
    domain: "purpose",
    title: "Learned Helplessness",
    meta: "Martin Seligman · 1975",
    cta: { label: "View source", href: "/atlas/why-do-i-feel-stuck" },
  },
  {
    id: "res-koshas",
    kind: "research",
    domain: "body",
    title: "The Taittiriya Upanishad",
    meta: "The five-kosha model",
    cta: { label: "View source", href: "/atlas/why-do-i-overthink-everything" },
  },
  {
    id: "res-yogasutra",
    kind: "research",
    domain: "mind",
    title: "The Yoga Sutras",
    meta: "Patanjali · on the kleshas",
    cta: { label: "View source", href: "/atlas/why-cant-i-let-go" },
  },

  /* --- Insights: the field-note voice -------------------------------- */
  {
    id: "ins-023",
    kind: "insight",
    domain: "relationships",
    title: "Field Note 023",
    meta: "On intimacy",
    excerpt: "We don't fear intimacy. We fear being seen without our masks.",
    cta: { label: "Read insight", href: "/atlas/why-do-i-hide-my-true-self" },
  },
  {
    id: "ins-031",
    kind: "insight",
    domain: "purpose",
    title: "Field Note 031",
    meta: "On achievement",
    excerpt: "Success in the wrong layer works, and still does not land.",
    cta: { label: "Read insight", href: "/atlas/why-do-i-feel-empty-after-achieving" },
  },
  {
    id: "ins-038",
    kind: "insight",
    domain: "identity",
    title: "Field Note 038",
    meta: "On self-trust",
    excerpt: "The information was never missing. Permission to treat it as real was.",
    cta: { label: "Read insight", href: "/atlas/why-dont-i-trust-myself" },
  },
  {
    id: "ins-044",
    kind: "insight",
    domain: "body",
    title: "Field Note 044",
    meta: "On stillness",
    excerpt: "The layer generating the noise is not the layer you are arguing with.",
    cta: { label: "Read insight", href: "/atlas/why-do-i-overthink-everything" },
  },

  /* --- Soul Mirror: the chapter that covers each field ---------------- */
  ...(
    [
      ["relationships", "Relationships"],
      ["identity", "Identity & Self"],
      ["purpose", "Purpose & Dharma"],
      ["mind", "Mind & Cognition"],
      ["body", "Body & Nervous System"],
      ["feminine", "Feminine Energy"],
      ["masculine", "Masculine Energy"],
    ] as const
  ).map(([domain, label]) => ({
    id: `sm-${domain}`,
    kind: "soul-mirror" as const,
    domain,
    title: "Mirror chapter",
    meta: `${label} · in your report`,
    cta: { label: "See sample", href: "/soul-mirror#reveals" },
  })),
];

export function resourcesForDomain(domainId: string): AtlasResource[] {
  return atlasResources.filter((r) => r.domain === domainId);
}

/** How many distinct sources the library actually cites. Never authored. */
export function sourceCount(): number {
  return atlasResources.filter((r) => r.kind === "research").length;
}

/**
 * Curated routes through the map. Each one is a real published entry, so
 * a pathway can never lead somewhere that has not been written.
 */
export const pathways: Pathway[] = [
  { id: "p-heal", label: "Heal relationship patterns", domain: "relationships", href: "/atlas/why-do-i-keep-attracting-the-same-people" },
  { id: "p-letgo", label: "Learn to let go", domain: "relationships", href: "/atlas/why-cant-i-let-go" },
  { id: "p-self", label: "Relationship with self", domain: "identity", href: "/atlas/why-do-i-keep-abandoning-myself" },
  { id: "p-mask", label: "Stop performing", domain: "identity", href: "/atlas/why-do-i-hide-my-true-self" },
  { id: "p-trust", label: "Rebuild self-trust", domain: "identity", href: "/atlas/why-dont-i-trust-myself" },
  { id: "p-quiet", label: "Quiet the overthinking", domain: "mind", href: "/atlas/why-do-i-overthink-everything" },
  { id: "p-unstick", label: "Move when stuck", domain: "purpose", href: "/atlas/why-do-i-feel-stuck" },
  { id: "p-sabotage", label: "Stop sabotaging the work", domain: "purpose", href: "/atlas/why-do-i-self-sabotage" },
  { id: "p-empty", label: "Beyond the next achievement", domain: "purpose", href: "/atlas/why-do-i-feel-empty-after-achieving" },
  { id: "p-body", label: "Settle the nervous system", domain: "body", href: "/atlas/why-do-i-overthink-everything" },
  { id: "p-release", label: "Release what has completed", domain: "feminine", href: "/atlas/why-do-i-feel-stuck" },
  { id: "p-direction", label: "Hold a direction", domain: "masculine", href: "/atlas/why-do-i-self-sabotage" },
];

export function pathwaysForDomain(domainId: string): Pathway[] {
  return pathways.filter((p) => p.domain === domainId);
}

export const fieldNotes: Record<string, FieldNoteData> = {
  hero: {
    number: "017",
    body: "Wisdom is not information. It is connection. The Atlas reveals how everything is one.",
  },
  alive: {
    number: "041",
    body: "When you see the connections, life stops feeling like random events. It becomes a map.",
  },
};
