import { cn } from "@/lib/cn";

/**
 * The gold-ringed glyph used by the hero disciplines and the process rail.
 *
 * The marks are drawn rather than pulled from an icon set: the comp's
 * vocabulary is sacred geometry — sun, mandala, spiral, orbit, lotus, flame
 * — and no general-purpose icon library has these without looking borrowed.
 */

export type GlyphName =
  | "sun"
  | "mandala"
  | "spiral"
  | "orbit"
  | "document"
  | "book"
  | "lotus"
  | "flame";

function Glyph({ name }: { name: GlyphName }) {
  const stroke = {
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "sun":
      return (
        <g {...stroke}>
          <circle cx="12" cy="12" r="4" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={12 + Math.cos(a) * 6.4}
                y1={12 + Math.sin(a) * 6.4}
                x2={12 + Math.cos(a) * 9}
                y2={12 + Math.sin(a) * 9}
              />
            );
          })}
        </g>
      );

    case "mandala":
      return (
        <g {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <circle key={i} cx={12 + Math.cos(a) * 4.5} cy={12 + Math.sin(a) * 4.5} r="4.5" />
            );
          })}
        </g>
      );

    case "spiral":
      return (
        <g {...stroke}>
          <path d="M12 3a9 9 0 1 1-8.6 11.6A6.6 6.6 0 0 1 12 6.4a4.6 4.6 0 0 1 3.6 7.4 2.8 2.8 0 0 1-4.6-1.3" />
        </g>
      );

    case "orbit":
      return (
        <g {...stroke}>
          <circle cx="12" cy="12" r="2.6" />
          <ellipse cx="12" cy="12" rx="9" ry="4.2" />
          <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      );

    case "document":
      return (
        <g {...stroke}>
          <path d="M6.5 3.5h7.8L18 7.2v13.3H6.5Z" />
          <path d="M14 3.6v3.8h3.8" />
          <path d="M9 12h6M9 15h6M9 18h4" />
        </g>
      );

    case "book":
      return (
        <g {...stroke}>
          <path d="M12 6.5C10.2 5 7.8 4.4 4.5 4.6v13c3.3-.2 5.7.4 7.5 1.9 1.8-1.5 4.2-2.1 7.5-1.9v-13c-3.3-.2-5.7.4-7.5 1.9Z" />
          <path d="M12 6.5v13" />
        </g>
      );

    case "lotus":
      return (
        <g {...stroke}>
          <path d="M12 19.5c-4 0-7.2-2.3-8-5.6 2-1 4-.7 5.6.5" />
          <path d="M12 19.5c4 0 7.2-2.3 8-5.6-2-1-4-.7-5.6.5" />
          <path d="M12 19.5c-2.6-2-3.8-4.6-3.3-7.3 1.5-.2 2.6.3 3.3 1.2.7-.9 1.8-1.4 3.3-1.2.5 2.7-.7 5.3-3.3 7.3Z" />
          <path d="M12 13.4c-1.4-2-1.5-4.4-.3-6.9 1.6 2 1.9 4.4.3 6.9Z" />
        </g>
      );

    case "flame":
      return (
        <g {...stroke}>
          <path d="M12 3.5c3.4 3.2 5.5 6 5.5 8.9a5.5 5.5 0 1 1-11 0c0-1.6.6-3.1 1.8-4.6.4 1.2 1 2 1.9 2.4-.3-2.6.3-4.9 1.8-6.7Z" />
        </g>
      );
  }
}

export function GlyphCircle({
  name,
  className,
  tone = "dark",
  size = "md",
}: {
  name: GlyphName;
  className?: string;
  tone?: "dark" | "parchment";
  size?: "sm" | "md" | "lg";
}) {
  const box = { sm: "size-10", md: "size-12", lg: "size-16" }[size];
  const glyph = { sm: "size-5", md: "size-6", lg: "size-8" }[size];

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full border",
        box,
        tone === "dark"
          ? "border-hairline-strong text-gold"
          : "border-gold-deep/35 bg-parchment-deep/40 text-gold-deep",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={glyph} aria-hidden focusable="false">
        <Glyph name={name} />
      </svg>
    </span>
  );
}
