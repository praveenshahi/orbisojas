"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Mark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/constants/nav";

/**
 * Client only for two reasons: the scrolled state and the mobile overlay.
 * Everything it renders is present in the server HTML regardless.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change, and never leave the page locked behind an overlay.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-out-quint)",
        scrolled || open
          ? "border-b border-hairline bg-void/88 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3.5">
          <Mark className="size-9 shrink-0 text-gold" />
          <span className="leading-none">
            <span className="block font-display text-[1.15rem] tracking-[0.16em] text-ivory">
              ORBIS OJAS
            </span>
            <span className="mt-1 block font-sans text-[0.5625rem] tracking-[0.22em] text-gold uppercase">
              Consciousness Operating System
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative font-sans text-(length:--text-eyebrow) uppercase tracking-[0.18em] transition-colors duration-300",
                  "after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-500 after:ease-(--ease-out-quint)",
                  active
                    ? "text-ivory after:w-full"
                    : "text-ivory-muted hover:text-ivory after:w-0 hover:after:w-full",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Wrapped rather than given `hidden` directly: the Button's own
              `inline-flex` is also a display utility, and which one wins is
              decided by stylesheet order, not class order. */}
          <div className="hidden sm:block">
            <Button href="/soul-mirror#request" className="px-5 py-3">
              Begin your Soul Mirror
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 place-items-center rounded-[3px] border border-hairline text-ivory lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-hairline bg-void/97 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-hairline py-4 font-display text-(length:--text-display-s) text-ivory"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/soul-mirror#request" className="mt-6 w-full">
              Begin your Soul Mirror
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
