import type { Domain } from "@/types/atlas";

/**
 * The seven canonical fields of the Orbis map, orbiting OJAS.
 *
 * These are shared with the homepage — one taxonomy sitewide, so a visitor
 * moving between the two pages sees the same map of themselves. Angles are
 * degrees clockwise from twelve o'clock and set the wheel layout directly.
 */
export const OJAS_CORE = {
  label: "Ojas",
  terms: ["Life force", "Vitality", "Radiance"] as const,
  description:
    "Ojas is the vitality that holds the whole system together — the reserve that everything else draws on. Every field on this map is a way of spending it or restoring it.",
};

export const domains: Domain[] = [
  {
    id: "masculine",
    label: "Masculine Energy",
    terms: ["Direction", "Boundaries", "Action"],
    glyph: "sun",
    description:
      "The capacity to choose a direction and hold it — to say no, to act before certainty, and to stay with a decision once made.",
    angle: 0,
  },
  {
    id: "feminine",
    label: "Feminine Energy",
    terms: ["Flow", "Receptivity", "Creation"],
    glyph: "lotus",
    description:
      "The capacity to receive — to let something land rather than manage it, and to create from responsiveness rather than force.",
    angle: 51.4,
  },
  {
    id: "relationships",
    label: "Relationships",
    terms: ["Attachment", "Love", "Connection"],
    glyph: "mandala",
    description:
      "How we relate to ourselves and others. The patterns of attachment, love, connection and belonging that shape our experience.",
    angle: 102.9,
  },
  {
    id: "body",
    label: "Body & Nervous System",
    terms: ["Sensations", "Regulation", "Embodiment"],
    glyph: "flame",
    description:
      "Where the pattern is actually held. The nervous system decides what feels safe long before the mind explains why.",
    angle: 154.3,
  },
  {
    id: "purpose",
    label: "Purpose & Dharma",
    terms: ["Calling", "Alignment", "Contribution"],
    glyph: "orbit",
    description:
      "The life that is genuinely yours to live, and the distance between it and the one currently being lived.",
    angle: 205.7,
  },
  {
    id: "identity",
    label: "Identity & Self",
    terms: ["Who I am", "Story", "Integration"],
    glyph: "spiral",
    description:
      "The story you carry about who you are — including the parts constructed to survive a situation that has since passed.",
    angle: 257.1,
  },
  {
    id: "mind",
    label: "Mind & Cognition",
    terms: ["Thoughts", "Beliefs", "Meaning"],
    glyph: "book",
    description:
      "How attention moves, what it returns to, and the beliefs quietly deciding which interpretations are available to you.",
    angle: 308.6,
  },
];

export function findDomain(id: string): Domain | undefined {
  return domains.find((d) => d.id === id);
}
