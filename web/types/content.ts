export interface Link {
  label: string;
  href: string;
}

/** A headline split so a single phrase can carry the gold emphasis. */
export interface SplitHeadline {
  before: string;
  emphasis?: string;
  after?: string;
}

/** A Tier-1 pattern query: a real search term and the brand's signature object. */
export interface PatternQuestion {
  id: string;
  text: string;
  /** Route in the Atlas where this question gets its full answer. */
  slug: string;
  /** The node held at the centre of the constellation. */
  primary?: boolean;
}

export interface IconItem {
  icon: string;
  label: string;
  note: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    headline: SplitHeadline;
    lead: string;
    promptLabel: string;
    promptHint: string;
    cta: Link;
  };
  questions: PatternQuestion[];
  domains: {
    heading: SplitHeadline;
    /** ≤40 words. Rendered first in the DOM. Written to be lifted verbatim. */
    answer: string;
    support: string;
    items: IconItem[];
    link: Link;
  };
  artifact: {
    eyebrow: string;
    heading: SplitHeadline;
    answer: string;
    points: string[];
    cta: Link;
    imageAlt: string;
  };
  testimonials: {
    heading: SplitHeadline;
    support: string;
    items: Testimonial[];
  };
  trust: {
    items: IconItem[];
    close: {
      heading: SplitHeadline;
      cta: Link;
    };
  };
}

export interface Metric {
  value: string;
  label: string;
}

export interface Step {
  title: string;
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}


export interface AtlasFraming {
  /** The named concept — surfaced as a DefinedTerm in schema. */
  term: string;
  body: string;
}

export interface AtlasEntry {
  slug: string;
  question: string;
  /** ≤40 words. Renders first. Written to be lifted into an AI Overview. */
  shortAnswer: string;
  western: AtlasFraming;
  eastern: AtlasFraming;
  /** The part nobody else has written: how the two accounts meet. */
  bridge: string;
  related: string[];
}

export interface AtlasContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: SplitHeadline; answer: string; support: string };
  index: { eyebrow: string; headline: SplitHeadline; answer: string };
  translation: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    note: string;
  };
  upcoming: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    items: Step[];
  };
  close: { headline: SplitHeadline; answer: string; cta: Link };
}

export interface Testimonial {
  quote: string;
  name: string;
  age: number;
  role: string;
  /** Path under /public. Null renders a gold monogram disc instead. */
  avatar: string | null;
}
export type GlyphKey =
  | "sun" | "mandala" | "spiral" | "orbit"
  | "document" | "book" | "lotus" | "flame";

export interface GlyphItem {
  glyph: GlyphKey;
  label: string;
  note: string;
}

export interface GlyphStep {
  glyph: GlyphKey;
  title: string;
  note: string;
}

export interface SoulMirrorContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    quote: string;
    cta: Link;
    secondaryCta: Link;
    imageAlt: string;
    disciplines: GlyphItem[];
    proof: {
      text: string;
      ratingValue: string;
      ratingCount: number;
      /** One entry per avatar slot; null renders a monogram disc. */
      avatars: Array<string | null>;
    };
  };
  metrics: { lead: string; items: Metric[] };
  reveals: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    support: string;
    points: string[];
    imageAlt: string;
  };
  quoteBand: { quote: string; attribution: string };
  process: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    steps: GlyphStep[];
  };
  faq: { headline: SplitHeadline; items: FaqItem[] };
  closing: {
    headline: SplitHeadline;
    support: string;
    cta: Link;
    assurances: string[];
    imageAlt: string;
  };
  request: {
    eyebrow: string;
    headline: SplitHeadline;
    answer: string;
    assurance: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
  };
}
