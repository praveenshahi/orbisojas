"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/ui/Headline";
import { RuleUnder, Starburst } from "@/components/ui/Ornament";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { riseIn, stagger, VIEWPORT } from "@/lib/motion";
import { EASE_OUT_QUINT } from "@/lib/motion";
import type { SoulMirrorContent } from "@/types/content";

/**
 * The report cards, fanned.
 *
 * Deviation stated plainly: the comp's fan is a single rendered artwork and
 * the five cards overlap in the source, so they cannot be cleanly cut into
 * independently movable layers. The fan therefore ships as one image —
 * matching the comp exactly — enlarged so it breaks out of its column, with
 * the entrance animated as a whole. If you supply the cards as separate
 * files they become individually staggered layers with no other change.
 */
export function Reveals({ reveals }: Pick<SoulMirrorContent, "reveals">) {
  return (
    <Section tone="raised" labelledBy="reveals-heading" id="reveals" className="motion-scope overflow-hidden">
      <MotionProvider>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10">
          <m.div initial="hidden" whileInView="shown" viewport={VIEWPORT} variants={stagger(0, 0.09)}>
            <m.p
              variants={riseIn}
              className="flex items-center gap-2.5 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.2em] text-gold"
            >
              <Starburst className="size-4 shrink-0" />
              {reveals.eyebrow}
            </m.p>

            <m.div variants={riseIn}>
              <Headline
                as="h2"
                id="reveals-heading"
                size="m"
                content={reveals.headline}
                className="mt-5"
              />
              <RuleUnder className="mt-6" />
            </m.div>

            <m.p variants={riseIn} className="mt-6 max-w-md leading-relaxed text-ivory-muted">
              {reveals.support}
            </m.p>

            <m.ul variants={stagger(0.1, 0.07)} className="mt-8 space-y-4">
              {reveals.points.map((point) => (
                <m.li key={point} variants={riseIn} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-hairline-strong">
                    <Check aria-hidden className="size-3 text-gold" strokeWidth={2.5} />
                  </span>
                  <span className="text-ivory-muted">{point}</span>
                </m.li>
              ))}
            </m.ul>
          </m.div>

          {/* Breaks its column to the right, as the comp does. */}
          <m.figure
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE_OUT_QUINT }}
            className="relative lg:-mr-[10vw] lg:w-[calc(100%+10vw)]"
          >
            {/* A pool of light under the fan, so it sits in space. */}
            <div
              aria-hidden
              className="absolute inset-[-12%] -z-1 bg-[radial-gradient(50%_45%_at_50%_50%,rgb(199_154_78/0.16),transparent_72%)]"
            />
            <Image
              src="/images/soul-mirror-cards.jpg"
              alt={reveals.imageAlt}
              width={1680}
              height={880}
              sizes="(min-width: 1024px) 66vw, 100vw"
              quality={88}
              className="w-full"
            />
          </m.figure>
        </div>
      </MotionProvider>
    </Section>
  );
}
