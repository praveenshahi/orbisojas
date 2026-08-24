import { cn } from "@/lib/cn";
import type { SplitHeadline } from "@/types/content";

const SIZES = {
  xl: "text-(length:--text-display-xl)",
  l: "text-(length:--text-display-l)",
  m: "text-(length:--text-display-m)",
  s: "text-(length:--text-display-s)",
} as const;

/**
 * Renders a split headline where one phrase carries the gold emphasis.
 * The emphasis is styling only — it stays a single sentence to a screen
 * reader and a single string to a crawler.
 */
export function Headline({
  as: Tag = "h2",
  content,
  size = "l",
  id,
  className,
  tone = "dark",
}: {
  as?: "h1" | "h2" | "h3";
  content: SplitHeadline;
  size?: keyof typeof SIZES;
  id?: string;
  className?: string;
  tone?: "dark" | "parchment";
}) {
  return (
    <Tag
      id={id}
      className={cn(SIZES[size], tone === "dark" ? "text-ivory" : "text-ink-text", className)}
    >
      {content.before}
      {content.emphasis ? (
        <>
          {" "}
          <em
            className={cn(
              "not-italic",
              tone === "dark" ? "text-gold-bright" : "text-gold-deep",
            )}
          >
            {content.emphasis}
          </em>
        </>
      ) : null}
      {content.after ? ` ${content.after}` : null}
    </Tag>
  );
}
