import { cn } from "@/lib/cn";

/**
 * The gold decorative vocabulary from the comps: an eight-point starburst,
 * and hairline rules that carry it. Drawn, so they stay crisp and cost
 * nothing, and used sparingly enough to still register as ornament.
 */

export function Starburst({ className }: { className?: string }) {
  const rays = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <g stroke="currentColor" strokeWidth="0.7" strokeLinecap="round">
        {rays.map((angle, i) => {
          // Cardinal rays run long; diagonals are clipped short, which is
          // what gives the mark its four-pointed read at a glance.
          const length = i % 2 === 0 ? 14 : 5.5;
          return (
            <line
              key={i}
              x1={16 + Math.cos(angle) * 2.5}
              y1={16 + Math.sin(angle) * 2.5}
              x2={16 + Math.cos(angle) * length}
              y2={16 + Math.sin(angle) * length}
            />
          );
        })}
      </g>
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** A hairline interrupted by the starburst. The section divider. */
export function Divider({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "parchment";
}) {
  const line = tone === "dark" ? "bg-hairline" : "bg-hairline-ink";
  const mark = tone === "dark" ? "text-gold/70" : "text-gold-deep/70";

  return (
    <div className={cn("flex items-center gap-5", className)} aria-hidden>
      <span className={cn("h-px flex-1", line)} />
      <Starburst className={cn("size-5 shrink-0", mark)} />
      <span className={cn("h-px flex-1", line)} />
    </div>
  );
}

/** Thin gold corner brackets — used to frame the report imagery. */
export function CornerFrame({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {(
        [
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "left-0 bottom-0 border-l border-b",
          "right-0 bottom-0 border-r border-b",
        ] as const
      ).map((pos) => (
        <span key={pos} className={cn("absolute size-7 border-gold/45", pos)} />
      ))}
    </div>
  );
}

/** The large decorative quote mark that frames the hero and quote-band lines. */
export function QuoteGlyph({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 18"
      className={cn(className, flip && "rotate-180")}
      aria-hidden
      focusable="false"
      fill="currentColor"
    >
      <path d="M0 18V9.6C0 4.3 3 .8 8.2 0l.9 2.4C6.2 3.4 4.6 5.3 4.6 7.7h3.7V18H0Zm14.7 0V9.6c0-5.3 3-8.8 8.2-9.6l.9 2.4c-2.9 1-4.5 2.9-4.5 5.3H23V18h-8.3Z" />
    </svg>
  );
}

/** The short gold rule that sits beneath a section heading in the comps. */
export function RuleUnder({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "parchment";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-16",
        tone === "dark" ? "bg-gold/60" : "bg-gold-deep/60",
        className,
      )}
    />
  );
}

/** A sprig, used as the lead-in mark on the metric card. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <g stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round">
        <path d="M12 22V8" />
        <path d="M12 13c0-3.2 2.3-5.8 5.5-6.2C17.2 10 14.9 12.6 12 13Z" />
        <path d="M12 16c0-3.2-2.3-5.8-5.5-6.2C6.8 13 9.1 15.6 12 16Z" />
        <path d="M12 8c0-3 1.6-5.4 4-6-.2 3-1.8 5.4-4 6Z" />
      </g>
    </svg>
  );
}
