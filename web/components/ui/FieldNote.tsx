import { Mark } from "@/components/ui/Mark";
import { cn } from "@/lib/cn";
import type { FieldNoteData } from "@/types/atlas";

/**
 * The taped paper note — the brand's marginalia device.
 *
 * A torn-off scrap pinned to the page: slightly rotated, grain in the
 * paper, a strip of tape at the top. The one place a third typeface earns
 * its keep, because a handwritten aside set in a serif is just a pull-quote.
 */
export function FieldNote({
  note,
  className,
  rotate = "-1.5deg",
}: {
  note: FieldNoteData;
  className?: string;
  rotate?: string;
}) {
  return (
    <figure
      className={cn("relative w-full max-w-[15rem]", className)}
      style={{ rotate }}
    >
      {/* Tape. Translucent, so the paper reads through it. */}
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-note/35 shadow-[0_1px_2px_rgb(0_0_0/0.25)] backdrop-blur-[1px]"
      />

      <div className="relative overflow-hidden bg-note px-5 py-6 grain-paper shadow-[0_18px_40px_-18px_rgb(0_0_0/0.75)]">
        <p className="relative z-1 font-sans text-[0.5625rem] tracking-[0.2em] text-note-ink/55 uppercase">
          Field note {note.number}
        </p>

        <blockquote className="relative z-1 mt-3 font-hand text-[1.35rem] leading-[1.45] text-note-ink">
          {note.body}
        </blockquote>

        <Mark aria-hidden className="relative z-1 mt-4 ml-auto size-5 text-gold-deep/55" />
      </div>
    </figure>
  );
}
