import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import type { AtlasContent, AtlasEntry } from "@/types/content";

/**
 * Set as an index in a reference work rather than as a grid of cards:
 * numbered, hairline-ruled, each row carrying both vocabularies in small
 * caps beneath the question. The whole row is one link — a large target,
 * and one tab stop rather than three.
 */
export function QuestionIndex({
  index,
  entries,
}: {
  index: AtlasContent["index"];
  entries: AtlasEntry[];
}) {
  return (
    <Section tone="raised" labelledBy="index-heading" id="questions">
      <div className="max-w-2xl">
        <Eyebrow>{index.eyebrow}</Eyebrow>
        <Headline as="h2" id="index-heading" size="m" content={index.headline} className="mt-5" />
        <p className="mt-6 text-(length:--text-lead) leading-relaxed text-ivory-muted">
          {index.answer}
        </p>
      </div>

      <ol className="mt-14 border-t border-hairline">
        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.slug} delay={Math.min(i, 6) * 50}>
            <Link
              href={`/atlas/${entry.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-hairline py-7 transition-colors duration-500 ease-(--ease-out-quint) hover:bg-gold/4 sm:gap-x-8"
            >
              <span
                aria-hidden
                className="font-display text-(length:--text-heading) leading-none text-gold/70 transition-colors duration-500 group-hover:text-gold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <h3 className="font-display text-(length:--text-display-s) leading-snug text-ivory transition-colors duration-500 group-hover:text-gold-bright">
                  {entry.question}
                </h3>

                {/* Both vocabularies, visible before the click. This is the
                    row's actual argument. */}
                <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.14em] text-ivory-faint">
                  <span>{entry.western.term}</span>
                  <span aria-hidden className="text-gold/60">
                    ·
                  </span>
                  <span>{entry.eastern.term}</span>
                </span>
              </span>

              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 self-center text-gold/50 transition-all duration-500 ease-(--ease-out-quint) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                strokeWidth={1.5}
              />
            </Link>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
