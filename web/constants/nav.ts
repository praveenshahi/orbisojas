import type { Link } from "@/types/content";

/**
 * Deliberately short. Every additional destination competes with the one
 * that matters, so items are added only when they earn their place.
 */
export const NAV_LINKS: Link[] = [
  { label: "Soul Mirror", href: "/soul-mirror" },
  { label: "The Atlas", href: "/atlas" },
  { label: "Insights", href: "/insights" },
];

export const FOOTER_COLUMNS: Array<{ heading: string; links: Link[] }> = [
  {
    heading: "Explore",
    links: [
      { label: "Soul Mirror", href: "/soul-mirror" },
      { label: "The Atlas", href: "/atlas" },
      { label: "Insights", href: "/insights" },
      { label: "Begin", href: "/soul-mirror#request" },
    ],
  },
  {
    heading: "Questions",
    links: [
      { label: "Why do I keep abandoning myself?", href: "/atlas/why-do-i-keep-abandoning-myself" },
      { label: "Why do I self sabotage?", href: "/atlas/why-do-i-self-sabotage" },
      { label: "Why can't I let go?", href: "/atlas/why-cant-i-let-go" },
    ],
  },
];

export const SITE = {
  name: "Orbis Ojas",
  tagline: "Consciousness Operating System",
  url: "https://orbisojas.com",
} as const;
