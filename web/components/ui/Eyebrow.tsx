import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "parchment";
}) {
  return (
    <p
      className={cn(
        "font-sans text-(length:--text-eyebrow) uppercase tracking-[0.2em]",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}
