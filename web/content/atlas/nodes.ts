import type { AtlasNode, NodeCategory } from "@/types/atlas";
import { atlasEntries } from "./entries";

/**
 * The explorer graph.
 *
 * Every node here is real — each one is a concept already named and
 * explained in a published Atlas entry. Nothing is invented to make the map
 * look populated. As entries are written, nodes are added here and the
 * counters, the graph and the filters all follow automatically.
 */

/** Which fields each published question sits across. */
const THEME_DOMAINS: Record<string, string[]> = {
  "why-do-i-keep-abandoning-myself": ["identity", "relationships", "masculine"],
  "why-do-i-keep-attracting-the-same-people": ["relationships", "mind"],
  "why-cant-i-let-go": ["relationships", "mind", "feminine"],
  "why-do-i-overthink-everything": ["mind", "body"],
  "why-do-i-self-sabotage": ["purpose", "masculine", "identity"],
  "why-do-i-feel-empty-after-achieving": ["purpose", "identity"],
  "why-do-i-hide-my-true-self": ["identity", "relationships"],
  "why-dont-i-trust-myself": ["identity", "mind"],
  "why-do-i-feel-stuck": ["purpose", "body", "masculine"],
};

/** Human themes: the nine published questions, as their pattern. */
const themes: AtlasNode[] = atlasEntries.map((entry) => ({
  id: `theme-${entry.slug}`,
  title: entry.question.replace(/^Why (do|don't|can't) I ?/i, "").replace(/\?$/, ""),
  category: "human-theme" as NodeCategory,
  domains: THEME_DOMAINS[entry.slug] ?? [],
  note: entry.shortAnswer,
  href: `/atlas/${entry.slug}`,
}));


/** Western clinical concepts, each cited in an entry. */
const science: AtlasNode[] = [
  { id: "sci-attachment", title: "Attachment theory", domains: ["relationships", "identity"], note: "Early relational patterns become the template later partners are read through." },
  { id: "sci-fawn", title: "The fawn response", domains: ["relationships", "body"], note: "Appeasing to stay safe, learned when a caregiver's withdrawal could not be afforded." },
  { id: "sci-repetition", title: "Repetition compulsion", domains: ["relationships"], note: "Unconscious return to an unresolved situation, hoping for a different ending." },
  { id: "sci-grief", title: "Complicated grief", domains: ["relationships", "mind"], note: "Grief that also removed an identity or an assumed future." },
  { id: "sci-rumination", title: "Rumination", domains: ["mind"], note: "Incompletion running on a loop, searching for a resolution the situation cannot supply." },
  { id: "sci-hypervigilance", title: "Hypervigilance", domains: ["mind", "body"], note: "A nervous system reading the environment as permanently unresolved." },
  { id: "sci-approach-avoid", title: "Approach-avoidance conflict", domains: ["purpose", "masculine"], note: "Wanting the outcome and avoiding what the outcome costs, at the same time." },
  { id: "sci-arrival", title: "The arrival fallacy", domains: ["purpose"], note: "The reliable gap between an anticipated outcome and the experience of reaching it." },
  { id: "sci-false-self", title: "The false self", domains: ["identity"], note: "Winnicott: a self formed to meet the environment when the true one could not be met." },
  { id: "sci-invalidation", title: "Chronic invalidation", domains: ["identity", "mind"], note: "Accurate perceptions repeatedly denied, teaching the system to route around its own signal." },
  { id: "sci-helplessness", title: "Learned helplessness", domains: ["purpose", "masculine", "body"], note: "The expectation of ineffectiveness, generalised and outliving the conditions that taught it." },
].map((n) => ({ ...n, category: "science" as NodeCategory }));

/** Contemplative concepts, each cited in an entry. */
const wisdom: AtlasNode[] = [
  { id: "wis-svadharma", title: "Svadharma", domains: ["purpose", "identity"], note: "One's own particular nature and obligation — the life that is actually yours to live." },
  { id: "wis-samskara", title: "Samskara", domains: ["relationships", "mind"], note: "A groove worn by repetition. Water does not choose its course; it follows the channel already cut." },
  { id: "wis-raga", title: "Raga", domains: ["relationships", "feminine"], note: "The pull toward what once produced pleasure, persisting after the object is gone." },
  { id: "wis-manomaya", title: "Manomaya kosha", domains: ["mind"], note: "The processing layer. Agitation there is treated as downstream of breath, not of thought." },
  { id: "wis-vasana", title: "Vasana", domains: ["purpose", "masculine"], note: "A latent tendency — not what you choose, but what is already leaning when the choice arrives." },
  { id: "wis-koshas", title: "The five koshas", domains: ["body", "identity", "mind"], note: "Layers of a person, each reached by different means. Effort in the wrong layer does not land." },
  { id: "wis-avidya", title: "Avidya", domains: ["identity"], note: "Not a lack of information — a sustained case of mistaken identity." },
  { id: "wis-buddhi", title: "Buddhi", domains: ["mind", "identity"], note: "The discerning faculty. When judgement fails it is described as clouded, never absent." },
  { id: "wis-tamas", title: "Tamas", domains: ["body", "purpose"], note: "Inertia. Heaviness. Resistance to movement, distinct from an absence of energy." },
  { id: "wis-apana", title: "Apana vayu", domains: ["body", "feminine"], note: "The downward current of release. Stagnation is retention — nothing completed has anywhere to go." },
].map((n) => ({ ...n, category: "wisdom" as NodeCategory }));

export const atlasNodes: AtlasNode[] = [...themes, ...science, ...wisdom];

/** Two nodes are connected when they share a field. */
export function connectionsFor(nodeId: string): AtlasNode[] {
  const node = atlasNodes.find((n) => n.id === nodeId);
  if (!node) return [];
  return atlasNodes.filter(
    (other) => other.id !== node.id && other.domains.some((d) => node.domains.includes(d)),
  );
}

export function nodesInDomain(domainId: string): AtlasNode[] {
  return atlasNodes.filter((n) => n.domains.includes(domainId));
}

/** Every counter on the page is computed. None is authored. */
export function atlasStats() {
  const edges = new Set<string>();
  for (const a of atlasNodes) {
    for (const b of atlasNodes) {
      if (a.id === b.id) continue;
      if (!a.domains.some((d) => b.domains.includes(d))) continue;
      edges.add([a.id, b.id].sort().join("::"));
    }
  }
  return { nodes: atlasNodes.length, connections: edges.size };
}

export const CATEGORY_LABELS: Record<NodeCategory, string> = {
  "human-theme": "Human themes",
  science: "Science",
  wisdom: "Wisdom traditions",
  practice: "Practices",
  product: "Products",
  "case-study": "Case studies",
};

/** Legend colours. Gold stays reserved for the brand; these are muted. */
export const CATEGORY_COLORS: Record<NodeCategory, string> = {
  "human-theme": "#c79a4e",
  science: "#5b8fa8",
  wisdom: "#a8794e",
  practice: "#6f9377",
  product: "#9a7fa8",
  "case-study": "#b06c6c",
};
