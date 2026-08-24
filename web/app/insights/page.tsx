import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { GlyphCircle } from "@/components/ui/GlyphCircle";
import { Divider } from "@/components/ui/Ornament";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/seo/schema";
import { INSIGHT_KIND_LABEL, insights } from "@/content/insights";
import { findDomain } from "@/content/atlas";

const TITLE = "Insights — Research, field notes and case studies";
const DESCRIPTION =
  "Research notes, field notes and case studies from Orbis Ojas. Written entry by entry, each one belonging to a field of the Orbis Atlas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/insights" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/insights" },
};

/**
 * The publishing surface. Everything written here is indexable on its own,
 * appears in this index, and can be wired into an Atlas node so the map
 * gets richer as the writing accumulates.
 */
export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          collectionSchema(
            insights.map((i) => ({ slug: `../insights/${i.slug}`, question: i.title })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        )}
      />

      <section className="relative isolate overflow-hidden bg-void grain-film" aria-labelledby="insights-heading">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_25%_25%,rgb(199_154_78/0.13),transparent_70%)]"
        />
        <Container className="relative z-1 pt-36 pb-16 lg:pt-44">
          <div className="max-w-2xl">
            <Eyebrow>Insights</Eyebrow>
            <Headline
              as="h1"
              id="insights-heading"
              size="xl"
              content={{ before: "Notes from", emphasis: "the work." }}
              className="mt-6"
            />
            <p className="mt-7 text-(length:--text-lead) leading-relaxed text-ivory-muted">
              {DESCRIPTION}
            </p>
          </div>
          <Divider className="mt-14" />
        </Container>
      </section>

      <Section tone="raised" labelledBy="index-heading">
        <h2 id="index-heading" className="sr-only">
          All insights
        </h2>

        <ul className="border-t border-hairline">
          {insights.map((insight) => {
            const domain = findDomain(insight.domain);
            return (
              <li key={insight.slug}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 border-b border-hairline py-8 transition-colors duration-500 hover:bg-gold/4 sm:gap-x-8"
                >
                  <GlyphCircle name={insight.glyph} size="sm" className="mt-1" />

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-gold uppercase">
                      {INSIGHT_KIND_LABEL[insight.kind]}
                      {domain ? (
                        <>
                          <span aria-hidden className="text-gold/50">·</span>
                          <span className="text-ivory-faint">{domain.label}</span>
                        </>
                      ) : null}
                    </span>

                    <h3 className="mt-2.5 font-display text-(length:--text-display-s) leading-snug text-ivory transition-colors duration-500 group-hover:text-gold-bright">
                      {insight.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-ivory-muted">
                      {insight.summary}
                    </p>
                  </span>

                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 self-center text-gold/50 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Footer />
    </>
  );
}
