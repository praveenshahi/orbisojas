import type { GlyphKey } from "./content";

/**
 * The Atlas content model.
 *
 * Everything the Atlas renders — the domain wheel, the explorer graph, the
 * resource cards, the counters — reads from these types. Counts are always
 * derived from the data, never authored, so the page can never claim a
 * library larger than the one that exists.
 */

/** The six colour-coded categories in the explorer legend. */
export type NodeCategory =
  | "human-theme"
  | "science"
  | "wisdom"
  | "practice"
  | "product"
  | "case-study";

/** The seven canonical fields of the map. Shared with the homepage. */
export interface Domain {
  id: string;
  label: string;
  /** The three terms printed beneath the label on the wheel. */
  terms: [string, string, string];
  glyph: GlyphKey;
  /** One sentence. Rendered as the selected-node description. */
  description: string;
  /** Position on the wheel, degrees clockwise from twelve o'clock. */
  angle: number;
}

/** A node in the explorer graph. */
export interface AtlasNode {
  id: string;
  title: string;
  category: NodeCategory;
  /** Domains this node belongs to. Drives filtering and the graph edges. */
  domains: string[];
  /** Optional one-line gloss shown in the list view. */
  note?: string;
  /** Where this node leads, if anywhere yet. */
  href?: string;
}

export type ResourceKind =
  | "research"
  | "insight"
  | "practice"
  | "soul-mirror"
  | "case-study"
  | "product";

/** A card under "Explore this node". */
export interface AtlasResource {
  id: string;
  kind: ResourceKind;
  domain: string;
  title: string;
  meta: string;
  /** Handwritten body, for `insight` and `case-study` cards. */
  excerpt?: string;
  image?: string;
  cta: { label: string; href: string };
}

/** A curated route through the map. */
export interface Pathway {
  id: string;
  label: string;
  domain: string;
  href: string;
}

/** A taped paper note. The brand's recurring marginalia device. */
export interface FieldNoteData {
  number: string;
  body: string;
}
