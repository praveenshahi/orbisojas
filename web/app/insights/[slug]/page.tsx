import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Headline } from "@/components/ui/Headline";
import { JsonLd } from "@/components/ui/JsonLd";
import { atlasArticleSchema, breadcrumbSchema, graph } from "@/lib/seo/schema";
import { findInsight, INSIGHT_KIND_LABEL, insights } from "@/content/insights";
import { findDomain } from "@/content/atlas";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = findInsight(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title,
      description: insight.summary,
      url: `/insights/${insight.slug}`,
      type: "article",
      publishedTime: insight.date,
    },
  };
}

/** One insight. Same answer-first shape as an Atlas entry. */
export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = findInsight(slug);
  if (!insight) notFound();

  const domain = findDomain(insight.domain);

  return (
    <>
      <JsonLd
        data={graph(
          atlasArticleSchema({
            slug: `../insights/${insight.slug}`,
            question: insight.title,
            shortAnswer: insight.summary,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
        )}
      />

      <article>
        <header className="relative isolate overflow-hidden bg-void grain-film">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_22%_12%,rgb(199_154_78/0.14),transparent_70%)]"
          />
          <Container className="relative z-1 pt-36 pb-14 lg:pt-44">
            <nav aria-label="Breadcrumb">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 font-sans text-(length:--text-eyebrow) tracking-[0.18em] text-gold uppercase transition-colors duration-300 hover:text-gold-bright"
              >
                <ArrowLeft aria-hidden className="size-3.5" />
                Insights
              </Link>
            </nav>

            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-gold uppercase">
              {INSIGHT_KIND_LABEL[insight.kind]}
              {domain ? (
                <>
                  <span aria-hidden className="text-gold/50">·</span>
                  <span className="text-ivory-faint">{domain.label}</span>
                </>
              ) : null}
            </p>

            <h1 className="mt-4 max-w-3xl text-(length:--text-display-l) text-ivory">
              {insight.title}
            </h1>

            {/* The liftable sentence, given its own weight. */}
            <p className="mt-8 max-w-2xl border-l-2 border-gold pl-6 font-display text-(length:--text-display-s) leading-snug text-gold-bright">
              {insight.summary}
            </p>
          </Container>
        </header>

        <Section tone="raised" labelledBy="body-heading">
          <h2 id="body-heading" className="sr-only">
            Full note
          </h2>
          <div className="max-w-(--container-prose) space-y-6">
            {insight.body.map((para) => (
              <p key={para.slice(0, 40)} className="text-(length:--text-lead) leading-relaxed text-ivory-muted">
                {para}
              </p>
            ))}
          </div>
        </Section>

        <Section tone="dark">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <Headline
              as="h2"
              size="m"
              content={{ before: "Reading about a pattern", emphasis: "is not seeing your own." }}
              className="max-w-lg"
            />
            <Button href="/soul-mirror#request">Request your Soul Mirror</Button>
          </div>
        </Section>
      </article>

      <Footer />
    </>
  );
}
