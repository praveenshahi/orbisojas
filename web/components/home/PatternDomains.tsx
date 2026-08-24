import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Ornament";
import { DomainFlow } from "@/components/graphics/DomainFlow";
import type { HomeContent } from "@/types/content";

export function PatternDomains({ domains }: Pick<HomeContent, "domains">) {
  return (
    <Section tone="raised" labelledBy="domains-heading" id="domains">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
        <Reveal>
          <Headline as="h2" id="domains-heading" size="m" content={domains.heading} />

          {/* The answer sentence renders before supporting prose, always. */}
          <p className="mt-6 max-w-sm text-(length:--text-lead) leading-relaxed text-ivory-muted">
            {domains.answer}
          </p>
          <p className="mt-4 max-w-sm text-ivory-faint">{domains.support}</p>

          <div className="mt-8">
            <Button href={domains.link.href} variant="quiet">
              {domains.link.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <DomainFlow items={domains.items} />
        </Reveal>
      </div>

      <Divider className="mt-20" />
    </Section>
  );
}
