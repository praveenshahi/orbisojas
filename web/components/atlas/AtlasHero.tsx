import Link from "next/link";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { FieldNote } from "@/components/ui/FieldNote";
import { DomainWheel } from "@/components/graphics/DomainWheel";
import { atlasStats, domains, fieldNotes } from "@/content/atlas";
import type { AtlasContent } from "@/types/content";

/**
 * Three columns: the address, the wheel, the field note.
 *
 * The counters beside the note are computed from the content layer, never
 * authored — the page can only ever claim the library it actually has.
 */
export function AtlasHero({ hero }: Pick<AtlasContent, "hero">) {
  const stats = atlasStats();

  return (
    <section
      className="relative isolate overflow-hidden bg-void grain-film graticule"
      aria-labelledby="atlas-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,rgb(199_154_78/0.12),transparent_72%)]"
      />

      <Container className="relative z-1 grid items-center gap-12 pt-32 pb-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)_minmax(0,0.6fr)] lg:gap-8 lg:pt-36">
        {/* --- The address ---------------------------------------------- */}
        <div className="max-w-md">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <Headline
            as="h1"
            id="atlas-heading"
            size="l"
            content={hero.headline}
            className="mt-5"
          />
          <p className="mt-6 leading-relaxed text-ivory-muted">{hero.answer}</p>

          <Link
            href="#explore"
            className="group mt-9 inline-flex items-center gap-4 rounded-full border border-hairline-strong py-2 pr-6 pl-2 transition-colors duration-400 hover:border-gold"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-colors duration-400 group-hover:bg-gold group-hover:text-void">
              <Play aria-hidden className="size-3.5 translate-x-px" fill="currentColor" />
            </span>
            <span className="font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-ivory uppercase">
              How to use the Atlas
            </span>
          </Link>
        </div>

        {/* --- The wheel ------------------------------------------------- */}
        <DomainWheel />

        {/* --- The field note ------------------------------------------- */}
        <div className="flex flex-col items-start gap-8 lg:items-end">
          <FieldNote note={fieldNotes["hero"]!} rotate="2deg" className="lg:ml-auto" />

          <div className="lg:text-right">
            <p className="font-sans text-(length:--text-eyebrow) tracking-[0.16em] text-gold uppercase">
              {stats.nodes} nodes · {domains.length} fields
            </p>
            <p className="mt-2 text-(length:--text-small) leading-relaxed text-ivory-faint">
              One living map.
              <br />
              Infinite pathways.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
