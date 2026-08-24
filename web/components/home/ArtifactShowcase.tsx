import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CornerFrame, Starburst } from "@/components/ui/Ornament";
import { PatternMap } from "@/components/graphics/PatternMap";
import { CoreLoop } from "@/components/graphics/CoreLoop";
import type { HomeContent } from "@/types/content";

/**
 * The parchment band. Its job is proof: after two dark sections of
 * recognition, the visitor sees the thing they actually receive.
 *
 * The report's two signature spreads are drawn as SVG rather than shown as
 * photography, so they stay sharp at every size and can be updated as the
 * report itself evolves. The cover stays a photograph — it is an object.
 */
export function ArtifactShowcase({ artifact }: Pick<HomeContent, "artifact">) {
  return (
    <Section tone="parchment" labelledBy="artifact-heading" id="artifact">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <Eyebrow tone="parchment">{artifact.eyebrow}</Eyebrow>

          <Headline
            as="h2"
            id="artifact-heading"
            size="m"
            tone="parchment"
            content={artifact.heading}
            className="mt-5"
          />

          <p className="mt-6 max-w-md text-(length:--text-lead) leading-relaxed text-ink-muted">
            {artifact.answer}
          </p>

          <ul className="mt-8 space-y-3.5">
            {artifact.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-hairline-ink">
                  <Check aria-hidden className="size-3 text-gold-deep" strokeWidth={2.5} />
                </span>
                <span className="text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href={artifact.cta.href} variant="ghostInk">
              {artifact.cta.label}
            </Button>
          </div>
        </Reveal>

        {/* --- The artifact: cover, then the two spreads it contains ------ */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            {/* The object leads; the drawn spreads support it. */}
            <div className="grid grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] gap-4 sm:gap-6">
              {/* The cover, tilted and lifted — an object on a table. */}
              <figure className="relative self-center">
                <Image
                  src="/images/soul-mirror-spread.jpg"
                  alt={artifact.imageAlt}
                  width={1254}
                  height={1254}
                  sizes="(min-width: 1024px) 26vw, 44vw"
                  quality={86}
                  className="rounded-[3px] shadow-[0_26px_60px_-24px_rgb(27_24_21/0.62)]"
                />
                <CornerFrame className="-inset-2.5" />
              </figure>

              {/* The spreads, drawn. Sharper than the photograph they replace. */}
              <div className="grid gap-4 sm:gap-5">
                {[PatternMap, CoreLoop].map((Graphic, i) => (
                  <div
                    key={i}
                    className="rounded-[3px] border border-hairline-ink bg-parchment-deep/45 p-3 shadow-[0_14px_36px_-22px_rgb(27_24_21/0.5)] sm:p-4"
                  >
                    <Graphic />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
