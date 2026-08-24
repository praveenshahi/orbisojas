import { GlyphCircle, type GlyphName } from "@/components/ui/GlyphCircle";
import { cn } from "@/lib/cn";
import type { IconItem } from "@/types/content";

/**
 * The seven fields joined by dotted gold arrows.
 *
 * The section's claim is that these are not separate problems, so the layout
 * has to demonstrate it — a grid of tiles asserts the opposite. Flows
 * horizontally from `xl`; below that it wraps to a grid, where connectors
 * between rows would only mislead.
 *
 * Marks come from `GlyphCircle`, the same drawn set the Atlas wheel uses, so
 * a field looks identical on both pages.
 */
export function DomainFlow({ items }: { items: IconItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 xl:flex xl:items-start xl:gap-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={item.label} className={cn("group text-center xl:flex xl:min-w-0 xl:flex-1 xl:items-start")}>
            <div className="xl:min-w-0 xl:flex-1">
              <GlyphCircle
                name={item.icon as GlyphName}
                size="md"
                className="mx-auto transition-colors duration-500 ease-(--ease-out-quint) group-hover:border-gold"
              />

              {/* Tracking tightens as the row narrows — at seven across,
                  0.18em is what made adjacent labels collide. */}
              <h3 className="mt-4 font-sans text-(length:--text-eyebrow) uppercase tracking-[0.14em] text-gold xl:px-1 xl:text-[0.5625rem] xl:tracking-[0.08em]">
                {item.label}
              </h3>
              <p className="mx-auto mt-2 max-w-[10rem] text-(length:--text-small) leading-relaxed text-ivory-faint xl:max-w-[7.5rem] xl:text-[0.6875rem]">
                {item.note}
              </p>
            </div>

            {/* The connector. Decorative, and only where there's room. */}
            {!isLast ? (
              <span aria-hidden className="hidden shrink-0 items-center gap-1 pt-6 xl:flex">
                <span className="h-px w-1 bg-gold/50" />
                <span className="h-px w-1 bg-gold/40" />
                <svg viewBox="0 0 8 8" className="size-2 text-gold/60" fill="currentColor">
                  <path d="M0 0l8 4-8 4z" />
                </svg>
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
