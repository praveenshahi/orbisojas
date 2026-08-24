import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { QuestionCluster } from "./QuestionCluster";
import type { HomeContent } from "@/types/content";

export function Hero({ hero, questions }: Pick<HomeContent, "hero" | "questions">) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      {/* The vista. `priority` because this is the LCP element. */}
      <Image
        src="/images/hero-vista.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        quality={82}
        className="-z-20 object-cover object-[50%_72%]"
      />

      {/* Two overlays: one to seat the type, one to close the section edges.
          Both are gradients on a single element each — no filter, no blur. */}
      {/* Weighted left so the headline sits on near-black, and released on
          the right so the sky stays legible behind the constellation. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(10_9_8/0.94)_0%,rgb(10_9_8/0.7)_34%,rgb(10_9_8/0.2)_62%,rgb(10_9_8/0.3)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(to_bottom,rgb(10_9_8/0.95),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-[linear-gradient(to_top,var(--color-void),transparent)]"
      />

      <Container className="relative flex min-h-svh flex-col justify-center pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          {/* --- The address ------------------------------------------------ */}
          <div className="max-w-lg">
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <Headline
              as="h1"
              id="hero-heading"
              size="xl"
              content={hero.headline}
              className="mt-6"
            />

            <p className="mt-7 max-w-md text-(length:--text-lead) leading-relaxed text-ivory-muted">
              {hero.lead}
            </p>

            {/* The prompt reads as an invitation to answer, and resolves to the
                request form — one destination, no dead interaction. */}
            <Link
              href={hero.cta.href}
              className="group mt-10 flex w-full max-w-md items-center justify-between gap-4 rounded-full border border-hairline-strong bg-void/55 py-2 pr-2 pl-6 backdrop-blur-[2px] transition-colors duration-300 ease-(--ease-out-quint) hover:border-gold"
            >
              <span className="text-left text-(length:--text-small) text-ivory-muted transition-colors group-hover:text-ivory sm:text-(length:--text-body)">
                {hero.promptLabel}
              </span>
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-void transition-[background-color,transform] duration-300 ease-(--ease-out-quint) group-hover:translate-x-0.5 group-hover:bg-gold-bright"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="sr-only">{hero.cta.label}</span>
            </Link>

            <p className="mt-6">
              <Link
                href="/atlas"
                className="inline-flex items-center gap-2 text-(length:--text-small) text-ivory-faint transition-colors duration-300 hover:text-gold"
              >
                {hero.promptHint}
                <ChevronDown aria-hidden className="size-4" />
              </Link>
            </p>
          </div>

          {/* --- The mirror -------------------------------------------------- */}
          <QuestionCluster questions={questions} />
        </div>
      </Container>
    </section>
  );
}
