import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";
import { cn } from "@/lib/cn";
import { FOOTER_COLUMNS, SITE } from "@/constants/nav";

/**
 * Two tones, because the comps use two: the homepage and Atlas close on
 * dark columns, the Soul Mirror page on a parchment bar with its links laid
 * out horizontally and the ॐ mark at the right.
 */
export function Footer({ tone = "dark" }: { tone?: "dark" | "parchment" }) {
  if (tone === "parchment") return <ParchmentFooter />;
  return <DarkFooter />;
}

function ParchmentFooter() {
  const explore = FOOTER_COLUMNS[0]?.links ?? [];

  return (
    <footer className="relative bg-parchment grain-paper">
      <Container className="relative z-1 flex flex-col items-center gap-8 py-9 lg:flex-row lg:justify-between">
        <Link href="/" className="flex items-center gap-3.5">
          <Mark className="size-9 shrink-0 text-gold-deep" />
          <span className="leading-none">
            <span className="block font-display text-[1.15rem] tracking-[0.16em] text-ink-text">
              ORBIS OJAS
            </span>
            <span className="mt-1 block font-sans text-[0.5625rem] tracking-[0.22em] text-gold-deep uppercase">
              Soul Mirror
            </span>
          </span>
        </Link>

        <nav aria-label="Explore" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.2em] text-gold-deep">
            Explore
          </span>
          {explore.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-(length:--text-small) text-ink-muted transition-colors duration-300 hover:text-ink-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <p className="text-(length:--text-small) text-ink-muted">
            Confidential · For your eyes only
          </p>
          <span aria-hidden className="font-display text-2xl text-gold-deep">
            ॐ
          </span>
        </div>
      </Container>

      <Container className="relative z-1 border-t border-hairline-ink py-5 text-center text-(length:--text-small) text-ink-muted">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </Container>
    </footer>
  );
}

function DarkFooter() {
  return (
    <footer className={cn("border-t border-hairline bg-ink grain-film")}>
      <Container className="relative z-1 grid gap-12 py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Link href="/" className="flex items-center gap-3.5">
            <Mark className="size-10 shrink-0 text-gold" />
            <span className="leading-none">
              <span className="block font-display text-[1.2rem] tracking-[0.16em] text-ivory">
                ORBIS OJAS
              </span>
              <span className="mt-1 block font-sans text-[0.5625rem] tracking-[0.22em] text-gold uppercase">
                {SITE.tagline}
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-xs text-(length:--text-small) leading-relaxed text-ivory-faint">
            Helping you see the architecture beneath your patterns — so understanding finally
            changes something.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            {/* Not a heading: the <nav> is already labelled, and footer
                columns shouldn't appear in the document outline. */}
            <p className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.2em] text-gold">
              {column.heading}
            </p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-(length:--text-small) text-ivory-muted transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="relative z-1 flex flex-col gap-3 border-t border-hairline py-7 text-(length:--text-small) text-ivory-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p>Private. Confidential. Yours.</p>
      </Container>
    </footer>
  );
}
