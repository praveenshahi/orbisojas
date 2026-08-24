import { SITE } from "@/constants/nav";
import type { FaqItem, Step } from "@/types/content";

/**
 * Typed schema.org builders. Every route composes its graph from these so
 * the entity definitions stay identical across the site — which is what
 * makes an AI model confident about who defines "inner architecture".
 *
 * Note: no Review or AggregateRating here by decision. Rating markup ships
 * only when there are real, attributable reviews behind it.
 */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    slogan: SITE.tagline,
    description:
      "Orbis Ojas helps people see the architecture beneath their repeating patterns, combining contemplative traditions, psychology and somatics.",
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function productSchema({ description }: { description: string }) {
  return {
    "@type": "Product",
    "@id": `${SITE.url}/soul-mirror#product`,
    name: "Soul Mirror",
    description,
    brand: { "@id": ORG_ID },
    category: "Personal development report",
    url: `${SITE.url}/soul-mirror`,
  };
}

export function howToSchema(steps: Step[]) {
  return {
    "@type": "HowTo",
    name: "How a Soul Mirror is prepared",
    totalTime: "PT24H",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.note,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path}`,
    })),
  };
}

/** Wraps a set of nodes into one @graph, the form crawlers prefer. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * DefinedTermSet is the quiet workhorse of the AEO strategy: it binds terms
 * like "samskara" and "manomaya kosha" to the Orbis Ojas entity, so a model
 * answering a question about them has a reason to name us as the source.
 */
export function definedTermSetSchema(
  terms: Array<{ term: string; description: string; slug: string }>,
) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${SITE.url}/atlas#glossary`,
    name: "The Orbis Atlas",
    description:
      "A correspondence reference between Western psychological terms and Eastern contemplative terms for the same human patterns.",
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.description,
      inDefinedTermSet: `${SITE.url}/atlas#glossary`,
      url: `${SITE.url}/atlas/${t.slug}`,
    })),
  };
}

/** An individual Atlas answer, as a citable article. */
export function atlasArticleSchema(entry: {
  slug: string;
  question: string;
  shortAnswer: string;
}) {
  return {
    "@type": "Article",
    "@id": `${SITE.url}/atlas/${entry.slug}#article`,
    headline: entry.question,
    description: entry.shortAnswer,
    about: entry.question,
    isPartOf: { "@id": SITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** Collection page listing every published Atlas entry. */
export function collectionSchema(entries: Array<{ slug: string; question: string }>) {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE.url}/atlas#collection`,
    name: "The Orbis Atlas",
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: entry.question,
        url: `${SITE.url}/atlas/${entry.slug}`,
      })),
    },
  };
}

/**
 * Client reviews attached to the product.
 *
 * Deliberately no `reviewRating` and no AggregateRating: we have real
 * quotes from real people, but no per-review scores and no verified
 * aggregate. Inventing either would be review spam under Google's policy,
 * so the schema claims exactly what we can stand behind.
 */
export function reviewsSchema(
  items: Array<{ quote: string; name: string; role: string }>,
) {
  return items.map((item) => ({
    "@type": "Review",
    itemReviewed: { "@id": `${SITE.url}/soul-mirror#product` },
    reviewBody: item.quote,
    author: { "@type": "Person", name: item.name },
    publisher: { "@id": ORG_ID },
  }));
}

/**
 * AggregateRating for Soul Mirror. Confirmed by the owner as a real,
 * collected figure — that confirmation is the only thing that makes this
 * markup legitimate. If the collection process ever lapses, remove it:
 * unverifiable rating data risks a manual action.
 */
export function aggregateRatingSchema(ratingValue: string, ratingCount: number) {
  return {
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${SITE.url}/soul-mirror#product` },
    ratingValue,
    ratingCount,
    bestRating: "5",
    worstRating: "1",
  };
}
