import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Mark } from "@/components/ui/Mark";
import { cn } from "@/lib/cn";
import type { AtlasResource, ResourceKind } from "@/types/atlas";

const KIND_LABEL: Record<ResourceKind, string> = {
  research: "Research",
  insight: "Insight",
  practice: "Practice",
  "soul-mirror": "Soul Mirror",
  "case-study": "Case study",
  product: "Product",
};

/**
 * The horizontal rail of cards beneath the explorer.
 *
 * Kinds with nothing behind them simply do not render — no empty states, no
 * "coming soon" tiles. As `resources.ts` fills, the rail fills with it.
 *
 * Scrolls natively with snap points rather than a JS carousel: keyboard and
 * touch both work for free, and it costs no client bundle.
 */
export function NodeCards({
  resources,
  domainLabel,
}: {
  resources: AtlasResource[];
  domainLabel: string;
}) {
  if (resources.length === 0) return null;

  return (
    <div className="border-t border-hairline p-6 lg:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-sans text-(length:--text-eyebrow) tracking-[0.2em] text-gold uppercase">
          Explore this field
        </p>
        <p className="text-(length:--text-small) text-ivory-faint">
          {resources.length} in {domainLabel}
        </p>
      </div>

      <ul className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
        {resources.map((r) => (
          <li key={r.id} className="w-[15rem] shrink-0 snap-start">
            <Card resource={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ resource }: { resource: AtlasResource }) {
  const isNote = resource.kind === "insight" || resource.kind === "case-study";

  return (
    <Link
      href={resource.cta.href}
      className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-hairline bg-ink-raised/70 transition-colors duration-500 ease-(--ease-out-quint) hover:border-gold/50"
    >
      {/* The head. Notes get paper; everything else gets the mark. */}
      <div
        className={cn(
          "relative flex h-32 items-center justify-center overflow-hidden px-5",
          isNote ? "bg-note grain-paper" : "bg-void",
        )}
      >
        {!isNote ? (
          <>
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgb(199_154_78/0.14),transparent_70%)]"
            />
            <Mark aria-hidden className="relative size-12 text-gold/60" />
          </>
        ) : (
          <p className="relative z-1 font-hand text-[1.0625rem] leading-snug text-note-ink">
            {resource.excerpt}
          </p>
        )}

        <span className="absolute top-3 left-3 rounded-[2px] bg-void/80 px-2 py-1 font-sans text-[0.5625rem] tracking-[0.16em] text-gold uppercase">
          {KIND_LABEL[resource.kind]}
        </span>
      </div>

      <div className="flex grow flex-col p-5">
        <h4 className="font-display text-(length:--text-heading) leading-snug text-ivory transition-colors duration-500 group-hover:text-gold-bright">
          {resource.title}
        </h4>
        <p className="mt-1.5 text-(length:--text-small) text-ivory-faint">{resource.meta}</p>

        <span className="mt-5 inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.14em] text-gold uppercase">
          {resource.cta.label}
          <ArrowRight
            aria-hidden
            className="size-3 transition-transform duration-400 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
