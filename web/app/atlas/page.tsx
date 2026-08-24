import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { AtlasHero } from "@/components/atlas/AtlasHero";
import { Explorer } from "@/components/atlas/Explorer";
import { QuestionIndex } from "@/components/atlas/QuestionIndex";
import { TranslationTable } from "@/components/atlas/TranslationTable";
import { AtlasAlive } from "@/components/atlas/AtlasAlive";
import { JsonLd } from "@/components/ui/JsonLd";
import { atlas, atlasEntries, translationRows } from "@/content/atlas";
import {
  breadcrumbSchema,
  collectionSchema,
  definedTermSetSchema,
  graph,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: atlas.meta.title,
  description: atlas.meta.description,
  alternates: { canonical: "/atlas" },
  openGraph: {
    title: atlas.meta.title,
    description: atlas.meta.description,
    url: "/atlas",
  },
};

/**
 * The Atlas: a map you can actually move through.
 *
 * The explorer is genuinely interactive and driven entirely by the content
 * layer — selecting a field redraws the graph, the detail panel, the
 * pathways and the cards together. The index and correspondence table below
 * give the same material in linear form, which is what crawlers read and
 * what a reader scanning rather than exploring wants.
 */
export default function AtlasPage() {
  const terms = atlasEntries.flatMap((entry) => [
    { term: entry.western.term, description: entry.western.body, slug: entry.slug },
    { term: entry.eastern.term, description: entry.eastern.body, slug: entry.slug },
  ]);

  return (
    <>
      <JsonLd
        data={graph(
          collectionSchema(atlasEntries),
          definedTermSetSchema(terms),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Atlas", path: "/atlas" },
          ]),
        )}
      />

      <AtlasHero hero={atlas.hero} />
      <Explorer />
      <QuestionIndex index={atlas.index} entries={atlasEntries} />
      <TranslationTable translation={atlas.translation} rows={translationRows} />
      <AtlasAlive />
      <Footer />
    </>
  );
}
