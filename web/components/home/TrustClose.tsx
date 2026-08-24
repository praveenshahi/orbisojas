import { Layers, Lock, PenLine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/types/content";

const ICONS = { lock: Lock, layers: Layers, pen: PenLine } as const;

export function TrustClose({ trust }: Pick<HomeContent, "trust">) {
  return (
    <Section tone="dark" labelledBy="close-heading" id="begin">
      <ul className="grid gap-10 border-b border-hairline pb-16 sm:grid-cols-3">
        {trust.items.map((item, index) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Lock;
          return (
            <Reveal as="li" key={item.label} delay={index * 80} className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline">
                <Icon aria-hidden className="size-4 text-gold" strokeWidth={1.25} />
              </span>
              <div>
                <h3 className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.18em] text-ivory">
                  {item.label}
                </h3>
                <p className="mt-2 text-(length:--text-small) leading-relaxed text-ivory-faint">
                  {item.note}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {/* One action. Nothing on the page competes with it. */}
      <Reveal className="flex flex-col items-start justify-between gap-8 pt-16 lg:flex-row lg:items-end">
        <Headline as="h2" id="close-heading" size="m" content={trust.close.heading} className="max-w-lg" />
        <Button href={trust.close.cta.href}>{trust.close.cta.label}</Button>
      </Reveal>
    </Section>
  );
}
