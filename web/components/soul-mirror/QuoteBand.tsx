import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { QuoteGlyph } from "@/components/ui/Ornament";
import { Lotus } from "@/components/graphics/Lotus";
import type { SoulMirrorContent } from "@/types/content";

/**
 * The page's emotional pivot, and the one band that was missing entirely.
 *
 * A framed dark card: lotus line-art anchoring the left, a mountain range
 * dissolving in from the right, the line centred between them. Static — its
 * weight comes from stillness, so nothing here animates.
 */
export function QuoteBand({ quoteBand }: Pick<SoulMirrorContent, "quoteBand">) {
  return (
    <section className="relative bg-void py-16 grain-film" aria-label="Orbis Ojas on understanding">
      <Container className="relative z-1">
        <figure className="relative overflow-hidden rounded-[4px] border border-hairline bg-ink">
          {/* Mountains, right. */}
          <div aria-hidden className="absolute inset-y-0 right-0 w-[42%]">
            <Image
              src="/images/quote-mountains.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 38vw, 60vw"
              quality={80}
              className="object-cover object-left"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_2%,rgb(18_16_14/0.72)_38%,rgb(18_16_14/0.25))]" />
          </div>

          {/* Lotus, left. */}
          <Lotus
            aria-hidden
            className="pointer-events-none absolute -bottom-4 left-4 hidden h-[118%] text-gold/45 sm:block"
          />

          <div className="relative z-1 px-8 py-14 text-center sm:px-16 lg:px-24">
            <QuoteGlyph className="mx-auto size-6 text-gold/70" />
            <blockquote className="mx-auto mt-5 max-w-2xl font-display text-(length:--text-display-s) leading-snug text-ivory">
              {quoteBand.quote}
            </blockquote>
            <figcaption className="mt-6 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.2em] text-gold">
              — {quoteBand.attribution}
            </figcaption>
          </div>
        </figure>
      </Container>
    </section>
  );
}
