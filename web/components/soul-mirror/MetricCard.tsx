"use client";

import { m } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Leaf } from "@/components/ui/Ornament";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { riseIn, VIEWPORT } from "@/lib/motion";
import type { SoulMirrorContent } from "@/types/content";

/**
 * The floating parchment card from the comp.
 *
 * It deliberately straddles the seam between the hero and the band below —
 * negative top margin plus its own stacking context. That overlap is the
 * point: it is what stops the page reading as a stack of full-width strips.
 */
export function MetricCard({ metrics }: Pick<SoulMirrorContent, "metrics">) {
  return (
    <MotionProvider>
      <div className="motion-scope relative z-10 -mt-10 lg:-mt-20">
        <Container>
          <m.div
            initial="hidden"
            whileInView="shown"
            viewport={VIEWPORT}
            variants={riseIn}
            className="relative overflow-hidden rounded-[4px] bg-parchment grain-paper shadow-[0_30px_70px_-30px_rgb(0_0_0/0.85)]"
          >
            <div className="relative z-1 grid divide-y divide-hairline-ink sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_repeat(5,minmax(0,1fr))] lg:divide-x lg:divide-y-0">
              <div className="flex items-center gap-4 px-7 py-7">
                <Leaf className="size-7 shrink-0 text-gold-deep/70" />
                <p className="font-display text-(length:--text-small) leading-snug text-ink-text">
                  {metrics.lead}
                </p>
              </div>

              {metrics.items.map((metric) => (
                <div key={metric.label} className="px-5 py-7 text-center">
                  <p className="font-display text-(length:--text-display-m) leading-none text-ink-text">
                    {metric.value}
                  </p>
                  <p className="mx-auto mt-2.5 max-w-[9rem] font-sans text-(length:--text-eyebrow) uppercase tracking-[0.14em] text-ink-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </m.div>
        </Container>
      </div>
    </MotionProvider>
  );
}
