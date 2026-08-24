"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { GlyphCircle } from "@/components/ui/GlyphCircle";
import { QuoteGlyph, Starburst } from "@/components/ui/Ornament";
import { MotionProvider } from "@/components/ui/MotionProvider";
import type { SoulMirrorContent } from "@/types/content";

/**
 * Hero, built to the comp.
 *
 * The image is not a card — it runs full-bleed to the right viewport edge
 * with no frame, dissolving leftward into the dark. The quote lives inside
 * it, upper right. Client-side only for the scroll parallax; every string
 * still ships in the server HTML.
 */
export function MirrorHero({ hero }: Pick<SoulMirrorContent, "hero">) {
  return (
    <MotionProvider>
      <HeroInner hero={hero} />
    </MotionProvider>
  );
}

function HeroInner({ hero }: Pick<SoulMirrorContent, "hero">) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The image drifts slower than the page; the quote fades on its own curve.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "12%"]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-void grain-film"
      aria-labelledby="mirror-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(55%_50%_at_18%_30%,rgb(199_154_78/0.14),transparent_70%)]"
      />

      {/* --- The image: full-bleed right, no frame --------------------- */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[54%] lg:block">
        <m.div style={{ y: imageY }} className="relative h-[112%] w-full">
          <Image
            src="/images/soul-mirror-hero.jpg"
            alt={hero.imageAlt}
            fill
            priority
            sizes="54vw"
            quality={86}
            className="object-cover object-[38%_35%]"
          />
        </m.div>

        {/* Dissolve into the ground on every edge that meets the page. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-void)_0%,rgb(10_9_8/0.72)_18%,rgb(10_9_8/0.12)_46%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,var(--color-void),transparent)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-void),transparent)]"
        />

        {/* The quote, set inside the image. */}
        <m.figure
          style={{ opacity: quoteOpacity }}
          className="absolute top-[16%] right-[7%] w-[19rem] text-center"
        >
          <QuoteGlyph className="mx-auto size-7 text-gold/70" />
          <blockquote className="mt-4 font-display text-(length:--text-display-s) leading-snug text-ivory">
            {hero.quote}
          </blockquote>
          <span
            aria-hidden
            className="mx-auto mt-5 flex w-24 items-center gap-2.5"
          >
            <span className="h-px flex-1 bg-gold/45" />
            <Starburst className="size-3 shrink-0 text-gold/80" />
            <span className="h-px flex-1 bg-gold/45" />
          </span>
          <QuoteGlyph flip className="mx-auto mt-4 size-7 text-gold/70" />
        </m.figure>
      </div>

      {/* Below lg the image sits above the copy rather than beside it. */}
      <div className="relative h-[52vh] w-full lg:hidden">
        <Image
          src="/images/soul-mirror-hero.jpg"
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-[42%_28%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-void)_4%,rgb(10_9_8/0.45)_50%,rgb(10_9_8/0.5))]"
        />
      </div>

      <Container className="relative z-1 pt-16 pb-28 lg:grid lg:min-h-svh lg:content-center lg:pt-36 lg:pb-40">
        <div className="relative max-w-xl">
          {/* No eyebrow here — the comp goes straight to the headline, with
              the starburst set beside it rather than over it. */}
          <Starburst className="absolute -top-12 -left-14 hidden size-24 text-gold/60 lg:block" />

          <Headline
            as="h1"
            id="mirror-heading"
            size="xl"
            content={hero.headline}
          />

          <p className="mt-7 max-w-lg text-(length:--text-lead) leading-relaxed text-ivory-muted">
            {hero.answer}
          </p>

          {/* Four lenses, each with its drawn glyph. */}
          <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
            {/* A <dl>'s children must be dt/dd groups — the glyph therefore
                lives inside the <dt>, and the <dd> is indented to line up
                under the label rather than under the mark. */}
            {hero.disciplines.map((d) => (
              <div key={d.label}>
                <dt className="flex items-center gap-3 font-sans text-[0.6875rem] whitespace-nowrap uppercase tracking-[0.08em] text-ivory">
                  <GlyphCircle name={d.glyph} size="sm" />
                  {d.label}
                </dt>
                <dd className="mt-1.5 pl-[3.25rem] text-[0.75rem] leading-snug text-ivory-faint">
                  {d.note}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost" withArrow={false}>
              {hero.secondaryCta.label}
            </Button>
          </div>

          <SocialProof proof={hero.proof} />
        </div>
      </Container>
    </section>
  );
}

/** Avatar stack, trust line, stars and the rating — as the comp draws it. */
function SocialProof({ proof }: { proof: SoulMirrorContent["hero"]["proof"] }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
      <ul className="flex shrink-0 -space-x-3">
        {proof.avatars.map((src, i) =>
          src ? (
            <li key={i}>
              <Image
                src={src}
                alt=""
                aria-hidden
                width={72}
                height={72}
                sizes="36px"
                className="size-9 rounded-full object-cover ring-2 ring-void"
              />
            </li>
          ) : (
            <li
              key={i}
              aria-hidden
              className="grid size-9 place-items-center rounded-full bg-gold/15 ring-2 ring-void"
            >
              <span className="size-3 rounded-full bg-gold/45" />
            </li>
          ),
        )}
      </ul>

      <div>
        <p className="text-(length:--text-small) text-ivory-muted">{proof.text}</p>
        <p className="mt-1.5 flex items-center gap-2">
          <span aria-hidden className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="size-3.5" fill="currentColor">
                <path d="M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6 4.8 17.5 6 11.7 1.6 7.7l5.9-.7z" />
              </svg>
            ))}
          </span>
          <span className="text-(length:--text-small) text-ivory">
            {proof.ratingValue}/5
          </span>
          <span className="text-(length:--text-small) text-ivory-faint">
            based on {proof.ratingCount}+ clients
          </span>
        </p>
      </div>
    </div>
  );
}
