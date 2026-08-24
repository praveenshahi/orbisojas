import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { MirrorHero } from "@/components/soul-mirror/MirrorHero";
import { MetricCard } from "@/components/soul-mirror/MetricCard";
import { Reveals } from "@/components/soul-mirror/Reveals";
import { QuoteBand } from "@/components/soul-mirror/QuoteBand";
import { ProcessRail } from "@/components/soul-mirror/ProcessRail";
import { Faq } from "@/components/soul-mirror/Faq";
import { ClosingBand } from "@/components/soul-mirror/ClosingBand";
import { RequestForm } from "@/components/soul-mirror/RequestForm";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { JsonLd } from "@/components/ui/JsonLd";
import { soulMirror } from "@/content/soul-mirror";
import {
  aggregateRatingSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  howToSchema,
  productSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: soulMirror.meta.title,
  description: soulMirror.meta.description,
  alternates: { canonical: "/soul-mirror" },
  openGraph: {
    title: soulMirror.meta.title,
    description: soulMirror.meta.description,
    url: "/soul-mirror",
  },
};

/**
 * Band order follows the reference comp exactly: hero → floating metric
 * card → what it reveals → the quote → how it works → FAQ → closing card,
 * with the request form appended per the one-page instruction.
 *
 * No two adjacent bands share a layout: full-bleed split, overlap card,
 * off-axis feature, full-width band, horizontal rail, two-column, inset
 * card, centred column.
 */
export default function SoulMirrorPage() {
  return (
    <>
      <JsonLd
        data={graph(
          productSchema({ description: soulMirror.meta.description }),
          aggregateRatingSchema(
            soulMirror.hero.proof.ratingValue,
            soulMirror.hero.proof.ratingCount,
          ),
          howToSchema(
            soulMirror.process.steps.map((s) => ({ title: s.title, note: s.note })),
          ),
          faqSchema(soulMirror.faq.items),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Soul Mirror", path: "/soul-mirror" },
          ]),
        )}
      />

      <MirrorHero hero={soulMirror.hero} />
      <MetricCard metrics={soulMirror.metrics} />
      <Reveals reveals={soulMirror.reveals} />
      <QuoteBand quoteBand={soulMirror.quoteBand} />
      <ProcessRail process={soulMirror.process} />
      <Faq faq={soulMirror.faq} />
      <ClosingBand closing={soulMirror.closing} />

      <Section tone="raised" id="request" labelledBy="request-heading">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>{soulMirror.request.eyebrow}</Eyebrow>
            <Headline
              as="h2"
              id="request-heading"
              size="m"
              content={soulMirror.request.headline}
              className="mt-5"
            />
            <p className="mx-auto mt-6 max-w-xl text-(length:--text-lead) leading-relaxed text-ivory-muted">
              {soulMirror.request.answer}
            </p>
          </div>

          <div className="mt-14">
            <RequestForm request={soulMirror.request} />
          </div>
        </div>
      </Section>
    <Footer tone="parchment" />
    </>
  );
}
