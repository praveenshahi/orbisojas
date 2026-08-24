import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlyphCircle } from "@/components/ui/GlyphCircle";
import { FieldNote } from "@/components/ui/FieldNote";
import { atlasNodes, atlasStats, domains, fieldNotes, sourceCount } from "@/content/atlas";

/**
 * The closing band: build a path on the left, the living counters on the
 * right. Every number is derived — see `atlasStats` and `sourceCount`.
 */
export function AtlasAlive() {
  const stats = atlasStats();

  const counters = [
    { value: `${stats.nodes}`, label: "Nodes" },
    { value: `${domains.length}`, label: "Fields" },
    { value: `${stats.connections}`, label: "Connections" },
    { value: `${sourceCount()}`, label: "Sources" },
  ];

  /* Four representative fields, drawn as the dotted journey. */
  const path = domains.slice(0, 4);

  return (
    <section className="relative bg-void pb-16 grain-film" aria-label="Build a path through the Atlas">
      <Container className="relative z-1 grid gap-6 lg:grid-cols-2">
        {/* --- Build your own path -------------------------------------- */}
        <div className="rounded-[4px] border border-hairline bg-ink p-8">
          <h2 className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
            Build your own path
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-ivory-muted">
            Choose the fields you want to work through, and follow them in order rather than
            wandering the map.
          </p>

          {/* The dotted journey. */}
          <div className="relative my-9 flex items-center justify-between">
            <span
              aria-hidden
              className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-gold/35"
            />
            {path.map((d, i) => (
              <span
                key={d.id}
                className="drift relative"
                style={
                  {
                    "--drift-duration": `${8 + i}s`,
                    "--drift-delay": `${i * 0.7}s`,
                  } as React.CSSProperties
                }
              >
                <GlyphCircle name={d.glyph} size="sm" className="bg-ink" />
              </span>
            ))}
          </div>

          <Link
            href="#explore"
            className="group inline-flex items-center gap-2.5 rounded-[3px] border border-hairline-strong px-6 py-3 font-sans text-(length:--text-small) tracking-[0.06em] text-ivory uppercase transition-colors duration-400 hover:border-gold hover:bg-gold/8"
          >
            Build my path
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-400 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* --- The Atlas is alive --------------------------------------- */}
        <div className="relative rounded-[4px] border border-hairline bg-ink p-8">
          <h2 className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
            The Atlas is alive
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-ivory-muted">
            Research, insights and practices are added as they are written. Every number below is
            counted from what is actually published — nothing is rounded up.
          </p>

          {/* Right padding keeps the fourth counter clear of the note. */}
          <dl className="mt-9 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:pr-6">
            {counters.map((c) => (
              <div key={c.label}>
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <span className="block font-display text-(length:--text-display-s) leading-none text-ivory">
                    {c.value}
                  </span>
                  <span className="mt-2 block font-sans text-[0.625rem] tracking-[0.16em] text-ivory-faint uppercase">
                    {c.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <FieldNote
            note={fieldNotes["alive"]!}
            rotate="-3deg"
            className="mt-10 lg:absolute lg:-right-8 lg:-bottom-16 lg:mt-0 lg:max-w-[12rem]"
          />
        </div>
      </Container>

      <span className="sr-only">
        {atlasNodes.length} nodes published across {domains.length} fields.
      </span>
    </section>
  );
}
