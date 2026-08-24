import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent, Testimonial } from "@/types/content";

export function Testimonials({ testimonials }: Pick<HomeContent, "testimonials">) {
  return (
    <Section tone="dark" labelledBy="testimonials-heading">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Headline
          as="h2"
          id="testimonials-heading"
          size="m"
          content={testimonials.heading}
        />
        <p className="max-w-sm text-ivory-faint lg:pb-2">{testimonials.support}</p>
      </div>

      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <Reveal as="li" key={item.name} delay={i * 90}>
            <TestimonialCard item={item} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-[3px] border border-hairline bg-ink-raised/70 p-7 transition-colors duration-500 ease-(--ease-out-quint) hover:border-gold/45">
      {/* The glyph, drawn rather than typed, so it stays a mark not a quote. */}
      <svg viewBox="0 0 24 18" className="size-6 shrink-0 text-gold/70" aria-hidden fill="currentColor">
        <path d="M0 18V9.6C0 4.3 3 .8 8.2 0l.9 2.4C6.2 3.4 4.6 5.3 4.6 7.7h3.7V18H0Zm14.7 0V9.6c0-5.3 3-8.8 8.2-9.6l.9 2.4c-2.9 1-4.5 2.9-4.5 5.3H23V18h-8.3Z" />
      </svg>

      <blockquote className="mt-5 grow leading-relaxed text-ivory-muted">
        {item.quote}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-hairline pt-5">
        <Avatar item={item} />
        <span className="leading-tight">
          <span className="block text-(length:--text-small) text-ivory">
            {item.name}, {item.age}
          </span>
          <span className="mt-0.5 block font-sans text-(length:--text-eyebrow) uppercase tracking-[0.16em] text-gold">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Photograph when we have one; otherwise a monogram, styled to look chosen. */
function Avatar({ item }: { item: Testimonial }) {
  if (item.avatar) {
    return (
      <Image
        src={item.avatar}
        alt=""
        aria-hidden
        width={80}
        height={80}
        sizes="40px"
        className="size-10 shrink-0 rounded-full object-cover ring-1 ring-gold/35"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/10 font-display text-(length:--text-small) text-gold-bright"
    >
      {item.name.charAt(0)}
    </span>
  );
}
