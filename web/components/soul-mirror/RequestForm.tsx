"use client";

import { useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { submitRequest } from "@/lib/forms/adapter";
import type { SoulMirrorContent } from "@/types/content";

/**
 * Two fieldsets, no wizard: coordinates, then the pattern. Exactly three
 * open questions, because a fourth measurably costs completions and this
 * form is the site's only conversion.
 */
export function RequestForm({ request }: Pick<SoulMirrorContent, "request">) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setState("sending");

    const data = new FormData(event.currentTarget);

    // Honeypot: bots fill hidden fields, people don't.
    if (data.get("company")) {
      setState("sent");
      return;
    }

    const result = await submitRequest(data);
    if (result.ok) {
      setState("sent");
    } else {
      setError(result.error);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-[4px] border border-gold/40 bg-gold/8 p-10 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full border border-gold/50">
          <Check aria-hidden className="size-5 text-gold-bright" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-display text-(length:--text-display-s) text-ivory">
          {request.successTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ivory-muted">
          {request.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-10">
      <fieldset className="space-y-6">
        <legend className="sr-only">Your coordinates</legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" label="Your name" required autoComplete="name" />
          <Field name="email" label="Email" type="email" required autoComplete="email" />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field name="birthDate" label="Date of birth" type="date" required />
          <Field
            name="birthTime"
            label="Time of birth"
            type="time"
            hint="Leave blank if you don't know."
          />
          <Field
            name="birthPlace"
            label="Place of birth"
            required
            placeholder="City, country"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-hairline pt-10">
        <legend className="sr-only">The pattern</legend>

        <Field
          name="pattern"
          label="What pattern keeps repeating in your life?"
          required
          rows={4}
          placeholder="Write it the way you'd say it to yourself."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="firstNoticed" label="When did you first notice it?" rows={3} />
          <Field name="alreadyTried" label="What have you already tried?" rows={3} />
        </div>
      </fieldset>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="text-(length:--text-small) text-red-300">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2.5 text-(length:--text-small) text-ivory-faint">
          <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
          {request.assurance}
        </p>

        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[3px] bg-gold px-7 py-4 font-sans text-(length:--text-small) uppercase tracking-[0.06em] text-void transition-[background-color,transform] duration-300 ease-(--ease-out-quint) hover:bg-gold-bright active:translate-y-px disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : request.submitLabel}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-(--ease-out-quint) group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
