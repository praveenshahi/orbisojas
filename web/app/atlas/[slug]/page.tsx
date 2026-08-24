import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { atlas, atlasEntries, findEntry } from "@/content/atlas";
import { atlasArticleSchema, breadcrumbSchema, graph } from "@/lib/seo/schema";

/** Every entry is prerendered — these pages exist to be crawled. */
export function generateStaticParams() {
  return atlasEntries.map((entry) => ({ slug: entry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};

  return {
    title: entry.question,
    description: entry.shortAnswer,
    alternates: { canonical: `/atlas/${entry.slug}` },
    openGraph: {
      title: entry.question,
      description: entry.shortAnswer,
      url: `/atlas/${entry.slug}`,
      type: "article",
    },
  };
}

/**
 * Every answer follows one shape: the question, a direct answer, the Western
 * account, the Eastern account, then the bridge between them. Fixed order,
 * so a reader learns it once and a model can rely on it.
 */
export default async function AtlasEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const related = entry.related
    .map((s) => findEntry(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <>
      <JsonLd
        data={graph(
          atlasArticleSchema(entry),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Atlas", path: "/atlas" },
            { name: entry.question, path: `/atlas/${entry.slug}` },
          ]),
        )}
      />

      <article>
        {/* --- The question and its direct answer ------------------------- */}
        <header className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_10%,rgb(199_154_78/0.14),transparent_70%)]"
          />
          <Container className="pt-36 pb-16 lg:pt-44">
            <nav aria-label="Breadcrumb">
              <Link
                href="/atlas"
                className="inline-flex items-center gap-2 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:text-gold-bright"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                The Orbis Atlas
              </Link>
            </nav>

            <h1 className="mt-8 max-w-3xl text-(length:--text-display-l) text-ivory">
              {entry.question}
            </h1>

            {/* The lifted sentence. Given the weight it deserves. */}
            <p className="mt-8 max-w-2xl border-l-2 border-gold pl-6 font-display text-(length:--text-display-s) leading-snug text-gold-bright">
              {entry.shortAnswer}
            </p>
          </Container>
        </header>

        {/* --- The two accounts, set as facing pages ---------------------- */}
        <Section tone="raised" labelledBy="accounts-heading">
          <h2 id="accounts-heading" className="sr-only">
            How each tradition describes this pattern
          </h2>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {(
              [
                { kind: "Western psychology", framing: entry.western },
                { kind: "Contemplative traditions", framing: entry.eastern },
              ] as const
            ).map(({ kind, framing }) => (
              <div key={kind} className="border-t border-hairline pt-8">
                <p className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.18em] text-gold">
                  {kind}
                </p>
                <h3 className="mt-4 font-display text-(length:--text-display-s) leading-snug text-ivory">
                  <dfn className="not-italic">{framing.term}</dfn>
                </h3>
                <p className="mt-5 leading-relaxed text-ivory-muted">{framing.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* --- The bridge: the part nobody else has written --------------- */}
        <Section tone="parchment" labelledBy="bridge-heading">
          <div className="max-w-3xl">
            <Eyebrow tone="parchment">Where the two meet</Eyebrow>
            <h2
              id="bridge-heading"
              className="mt-5 text-(length:--text-display-m) text-ink-text"
            >
              What each account misses alone.
            </h2>
            <p className="mt-7 text-(length:--text-lead) leading-relaxed text-ink-muted">
              {entry.bridge}
            </p>
          </div>
        </Section>

        {/* --- Onward: related questions, then the one action ------------- */}
        <Section tone="dark" labelledBy="related-heading">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2
                id="related-heading"
                className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.18em] text-gold"
              >
                Related questions
              </h2>
              <ul className="mt-6 border-t border-hairline">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/atlas/${r.slug}`}
                      className="group flex items-baseline justify-between gap-6 border-b border-hairline py-5 transition-colors duration-400 hover:bg-gold/4"
                    >
                      <span className="font-display text-(length:--text-heading) text-ivory transition-colors duration-400 group-hover:text-gold-bright">
                        {r.question}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 self-center text-gold/50 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pt-10">
              <Headline as="h2" size="s" content={atlas.close.headline} />
              <p className="mt-5 text-ivory-muted">{atlas.close.answer}</p>
              <div className="mt-8">
                <Button href={atlas.close.cta.href}>{atlas.close.cta.label}</Button>
              </div>
            </div>
          </div>
        </Section>
      </article>
    <Footer />
    </>
  );
}
