"use client";

import { m } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { GlyphCircle } from "@/components/ui/GlyphCircle";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { drawLine, riseIn, stagger, VIEWPORT } from "@/lib/motion";
import type { SoulMirrorContent } from "@/types/content";

/**
 * Six steps as a horizontal rail, joined by a dotted connector that draws
 * itself left to right as the row enters — then the glyphs settle in behind
 * it. The drawing is why this uses Motion: `pathLength` has no CSS analogue
 * that degrades correctly.
 *
 * Below `lg` the connector is dropped and the steps become a plain grid,
 * where a line between wrapped rows would only mislead.
 */
export function ProcessRail({ process }: Pick<SoulMirrorContent, "process">) {
  return (
    <Section tone="parchment" labelledBy="process-heading" className="motion-scope">
      <MotionProvider>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="parchment">{process.eyebrow}</Eyebrow>
          <Headline
            as="h2"
            id="process-heading"
            size="m"
            tone="parchment"
            content={process.headline}
            className="mt-4"
          />
          <p className="mt-6 text-(length:--text-lead) leading-relaxed text-ink-muted">
            {process.answer}
          </p>
        </div>

        <div className="relative mt-16">
          {/* The connector, behind the glyphs, spanning centre to centre. */}
          <svg
            aria-hidden
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px w-full lg:block"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
          >
            <m.line
              x1={100 / 12}
              y1="0.5"
              x2={100 - 100 / 12}
              y2="0.5"
              stroke="#8a6528"
              strokeWidth="1"
              strokeDasharray="1.6 1.6"
              vectorEffect="non-scaling-stroke"
              initial="hidden"
              whileInView="shown"
              viewport={VIEWPORT}
              variants={drawLine}
            />
          </svg>

          <m.ol
            initial="hidden"
            whileInView="shown"
            viewport={VIEWPORT}
            variants={stagger(0.25, 0.1)}
            className="relative grid gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6"
          >
            {process.steps.map((step, i) => (
              <m.li key={step.title} variants={riseIn} className="text-center">
                <GlyphCircle
                  name={step.glyph}
                  tone="parchment"
                  size="lg"
                  className="mx-auto bg-parchment"
                />
                <p className="mt-5 font-display text-(length:--text-heading) leading-none text-gold-deep">
                  {i + 1}
                </p>
                <h3 className="mt-2.5 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.14em] text-ink-text">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[11rem] text-(length:--text-small) leading-relaxed text-ink-muted">
                  {step.note}
                </p>
              </m.li>
            ))}
          </m.ol>
        </div>
      </MotionProvider>
    </Section>
  );
}
