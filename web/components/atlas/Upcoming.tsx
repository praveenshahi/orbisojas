import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { AtlasContent } from "@/types/content";

export function Upcoming({
  upcoming,
  close,
}: {
  upcoming: AtlasContent["upcoming"];
  close: AtlasContent["close"];
}) {
  return (
    <Section tone="dark" labelledBy="upcoming-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <Eyebrow>{upcoming.eyebrow}</Eyebrow>
          <Headline
            as="h2"
            id="upcoming-heading"
            size="m"
            content={upcoming.headline}
            className="mt-5"
          />
          <p className="mt-6 max-w-sm text-(length:--text-lead) leading-relaxed text-ivory-muted">
            {upcoming.answer}
          </p>
        </div>

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {upcoming.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 70}>
              <div className="flex items-center gap-3">
                <span className="font-display text-(length:--text-small) text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px flex-1 bg-hairline" />
              </div>
              <h3 className="mt-4 font-display text-(length:--text-heading) text-ivory">
                {item.title}
              </h3>
              <p className="mt-2.5 text-(length:--text-small) leading-relaxed text-ivory-faint">
                {item.note}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Every Atlas route terminates here. */}
      <Reveal className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-hairline pt-16 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <Headline as="h2" size="m" content={close.headline} />
          <p className="mt-5 text-ivory-muted">{close.answer}</p>
        </div>
        <Button href={close.cta.href}>{close.cta.label}</Button>
      </Reveal>
    </Section>
  );
}
