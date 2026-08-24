import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import type { AtlasContent } from "@/types/content";

interface Row {
  slug: string;
  pattern: string;
  western: string;
  eastern: string;
}

/**
 * The correspondence table — the brand's actual intellectual position, made
 * literal. A real <table> because it is real tabular data: three columns
 * with headers, which is also how a crawler reads the relationship.
 *
 * On the parchment band, because this is the reference page of the atlas.
 */
export function TranslationTable({
  translation,
  rows,
}: {
  translation: AtlasContent["translation"];
  rows: Row[];
}) {
  return (
    <Section tone="parchment" labelledBy="translation-heading">
      <div className="max-w-2xl">
        <Eyebrow tone="parchment">{translation.eyebrow}</Eyebrow>
        <Headline
          as="h2"
          id="translation-heading"
          size="m"
          tone="parchment"
          content={translation.headline}
          className="mt-5"
        />
        <p className="mt-6 text-(length:--text-lead) leading-relaxed text-ink-muted">
          {translation.answer}
        </p>
      </div>

      <Reveal className="mt-14 overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Correspondences between Western clinical terms and Eastern contemplative terms
          </caption>
          <thead>
            <tr className="border-b border-gold-deep/45">
              <th
                scope="col"
                className="pb-4 pr-6 font-sans text-(length:--text-eyebrow) font-normal uppercase tracking-[0.18em] text-ink-muted"
              >
                The pattern
              </th>
              <th
                scope="col"
                className="pb-4 pr-6 font-sans text-(length:--text-eyebrow) font-normal uppercase tracking-[0.18em] text-ink-muted"
              >
                Western psychology
              </th>
              <th
                scope="col"
                className="pb-4 font-sans text-(length:--text-eyebrow) font-normal uppercase tracking-[0.18em] text-gold-deep"
              >
                Contemplative traditions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-b border-hairline-ink last:border-b-0">
                <th scope="row" className="py-5 pr-6 align-top font-normal">
                  <Link
                    href={`/atlas/${row.slug}`}
                    className="font-display text-(length:--text-heading) leading-snug text-ink-text underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-300 hover:decoration-gold-deep"
                  >
                    {row.pattern}
                  </Link>
                </th>
                <td className="py-5 pr-6 align-top text-(length:--text-small) leading-relaxed text-ink-muted">
                  {row.western}
                </td>
                <td className="py-5 align-top text-(length:--text-small) leading-relaxed text-gold-deep">
                  {row.eastern}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <p className="mt-8 max-w-xl text-(length:--text-small) leading-relaxed text-ink-muted italic">
        {translation.note}
      </p>
    </Section>
  );
}
