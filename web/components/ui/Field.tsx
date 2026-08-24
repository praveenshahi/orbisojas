import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-[3px] border border-hairline bg-ink-raised px-4 py-3.5 text-ivory " +
  "placeholder:text-ivory-faint/70 transition-colors duration-300 " +
  "hover:border-hairline-strong focus:border-gold focus:outline-none " +
  "aria-[invalid=true]:border-red-400/70";

export function Field({
  name,
  label,
  type = "text",
  required,
  hint,
  placeholder,
  autoComplete,
  rows,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  /** Present ⇒ renders a textarea instead of an input. */
  rows?: number;
  className?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="font-sans text-(length:--text-eyebrow) uppercase tracking-[0.16em] text-ivory-muted"
      >
        {label}
        {required ? (
          <span className="text-gold" aria-hidden>
            {" *"}
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-ivory-faint">optional</span>
        )}
      </label>

      {rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          aria-describedby={hintId}
          className={cn(CONTROL, "resize-y leading-relaxed")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={hintId}
          className={CONTROL}
        />
      )}

      {hint ? (
        <p id={hintId} className="text-(length:--text-small) text-ivory-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
