import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/ui/Headline";
import type { SoulMirrorContent } from "@/types/content";

/**
 * Native <details>/<summary>: keyboard operable, screen-reader correct and
 * zero JavaScript. The answers are always in the DOM regardless of open
 * state, which is what makes this the page's strongest AEO asset.
 */
export function Faq({ faq }: Pick<SoulMirrorContent, "faq">) {
  return (
    <Section tone="dark" labelledBy="faq-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <Headline as="h2" id="faq-heading" size="m" content={faq.headline} className="lg:sticky lg:top-32 lg:self-start" />

        <div className="divide-y divide-hairline border-y border-hairline">
          {faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-(length:--text-heading) leading-snug text-ivory transition-colors duration-300 group-hover:text-gold-bright">
                  {item.question}
                </h3>
                <Plus
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-gold transition-transform duration-400 ease-(--ease-out-quint) group-open:rotate-45"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="max-w-xl pb-7 leading-relaxed text-ivory-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
