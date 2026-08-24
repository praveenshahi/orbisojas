"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads only the `domAnimation` feature set — animations, gestures and
 * variants, without layout projection — which is roughly half the bundle
 * of the full `motion` import.
 *
 * Wrap any subtree using `m.*` in this. Never import `motion` directly;
 * that defeats the whole arrangement.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
