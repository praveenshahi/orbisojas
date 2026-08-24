import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-[3px] font-sans " +
  "text-(length:--text-small) tracking-[0.06em] uppercase " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-quint) " +
  "active:translate-y-px";

const VARIANTS = {
  /** The single primary action. Solid gold. Used sparingly, deliberately. */
  primary: "bg-gold text-void hover:bg-gold-bright px-7 py-4",
  /** Secondary path. Hairline only — never competes with primary. */
  ghost:
    "border border-hairline-strong text-ivory hover:border-gold hover:bg-gold/8 px-7 py-4",
  /** The same, for parchment bands. A separate variant rather than a colour
      override, because two competing text-colour utilities resolve by
      stylesheet order, not by class order — which is how the label went
      near-invisible on the ivory ground. */
  ghostInk:
    "border border-hairline-ink text-ink-text hover:border-gold-deep hover:bg-gold-deep/8 px-7 py-4",
  /** Inline text action inside prose. */
  quiet:
    "text-gold hover:text-gold-bright px-0 py-0 normal-case tracking-normal text-(length:--text-small)",
  quietInk:
    "text-gold-deep hover:text-ink-text px-0 py-0 normal-case tracking-normal text-(length:--text-small)",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className,
  withArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], className)}>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-(--ease-out-quint) group-hover:translate-x-1"
        />
      ) : null}
    </Link>
  );
}
