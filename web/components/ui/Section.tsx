import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * The structural unit of every page.
 *
 * `tone` drives the dark → parchment → dark rhythm that gives the site its
 * editorial spine. `answer` enforces the AEO contract: a section's direct
 * answer sentence is rendered before its supporting prose, always, so the
 * text engines lift is the text we chose.
 */
export function Section({
  children,
  className,
  tone = "dark",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "parchment" | "raised";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-(--spacing-section)",
        // Texture is applied by tone, so no band can be built without it.
        tone === "dark" && "bg-void text-ivory grain-film",
        tone === "raised" && "bg-ink text-ivory grain-film",
        tone === "parchment" && "bg-parchment text-ink-text grain-paper",
        className,
      )}
    >
      {/* Above the ::after grain layer. */}
      <Container className="relative z-1">{children}</Container>
    </section>
  );
}
