/** Minimal class joiner. No dependency needed for what a filter can do. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
