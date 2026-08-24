import type { Variants } from "motion/react";

/**
 * Shared Framer Motion configuration.
 *
 * Everything that uses these imports `m` (not `motion`) from `motion/react`
 * and renders inside `<MotionProvider>`, which loads only the
 * `domAnimation` feature set — roughly half the library.
 *
 * Motion is used where CSS genuinely cannot orchestrate the result:
 * scroll-linked parallax, staggered depth, and drawing a path on entry.
 * Simple hovers and ambient loops stay in CSS.
 */

/** The house spring. Weighted, settles rather than bounces. */
export const SPRING = { type: "spring", stiffness: 120, damping: 22, mass: 0.9 } as const;

export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/** Parent that staggers its children on entry. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  shown: { transition: { delayChildren, staggerChildren } },
});

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_QUINT } },
};

/** The report cards: each settles out of the stack into its place in the fan. */
export const fanCard = (rotate: number, x: number, y: number): Variants => ({
  hidden: { opacity: 0, rotate: 0, x: 0, y: 24, scale: 0.94 },
  shown: {
    opacity: 1,
    rotate,
    x,
    y,
    scale: 1,
    transition: SPRING,
  },
});

/** Draws a stroked path from nothing on entry. */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT_QUINT },
  },
};

/** Shared viewport config so every section triggers at the same point. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
