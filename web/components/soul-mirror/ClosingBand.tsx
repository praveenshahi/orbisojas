import Image from "next/image";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import type { SoulMirrorContent } from "@/types/content";

/**
 * The closing card: photography on the left third, the turn in the middle,
 * the action on the right. A card inside a section rather than another
 * full-width band — the inset is what makes it read as a final object.
 */
export function ClosingBand({ closing }: Pick<SoulMirrorContent, "closing">) {
  return (
    <section className="relative bg-void pb-4 grain-film" aria-labelledby="closing-heading">
      <Container className="relative z-1">
        <div className="relative overflow-hidden rounded-[4px] border border-hairline bg-ink">
          <div className="grid items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,0.9fr)]">
            {/* Left third: the lamp. */}
            <figure className="relative h-44 lg:h-full lg:min-h-[15rem]">
              <Image
                src="/images/closing-band.jpg"
                alt={closing.imageAlt}
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                quality={82}
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,transparent_35%,rgb(18_16_14/0.6)_75%,var(--color-ink))] max-lg:bg-[linear-gradient(to_top,var(--color-ink),transparent_70%)]"
              />
            </figure>

            <div className="px-8 py-10 text-center lg:px-4 lg:py-12">
              <Headline
                as="h2"
                id="closing-heading"
                size="s"
                content={closing.headline}
              />
              <p className="mt-3 font-display text-(length:--text-lead) text-ivory-faint italic">
                {closing.support}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 px-8 pb-10 lg:items-start lg:px-0 lg:pr-10 lg:pb-0">
              <Button href={closing.cta.href}>{closing.cta.label}</Button>
              <p className="flex items-center gap-2 font-sans text-(length:--text-eyebrow) tracking-[0.12em] text-ivory-faint uppercase">
                <Lock aria-hidden className="size-3.5 text-gold" strokeWidth={1.5} />
                {closing.assurances.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
