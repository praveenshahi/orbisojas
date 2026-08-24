import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PatternQuestion } from "@/types/content";

/**
 * The signature object: real first-person search queries set *into* the
 * photographed sky as glowing text — no pill, no border, no backdrop.
 *
 * The earlier version wrapped each question in a bordered chip, which read
 * as chat UI and flattened the one image the brand actually owns. Here the
 * questions are lit like constellations, joined by drawn lines, drifting
 * slowly out of phase.
 *
 * Still a Server Component: the motion is pure CSS, so this ships zero
 * JavaScript while every question stays in the initial HTML — which matters,
 * because these nodes are also the Tier-1 keyword map.
 */

/** Percentages inset far enough that centred text clears the container. */
const POSITIONS: Record<string, { x: string; y: string }> = {
  abandon: { x: "50%", y: "45%" },
  letgo: { x: "48%", y: "7%" },
  attract: { x: "17%", y: "18%" },
  overthink: { x: "83%", y: "15%" },
  empty: { x: "14%", y: "62%" },
  sabotage: { x: "86%", y: "42%" },
  hide: { x: "20%", y: "40%" },
  stuck: { x: "84%", y: "68%" },
  trust: { x: "49%", y: "86%" },
};

function rhythm(index: number) {
  return {
    "--drift-duration": `${8 + (index % 4) * 1.4}s`,
    "--drift-delay": `${(index % 5) * 0.9}s`,
  } as React.CSSProperties;
}

export function QuestionCluster({ questions }: { questions: PatternQuestion[] }) {
  return (
    <div className="cluster">
      <ConstellationField questions={questions} />

      <ul className="cluster-nodes">
        {questions.map((question, index) => {
          const position = POSITIONS[question.id];
          return (
            <li
              key={question.id}
              style={
                {
                  ...rhythm(index),
                  ...(position ? { "--x": position.x, "--y": position.y } : {}),
                } as React.CSSProperties
              }
              className={cn("drift", position && "cluster-node", question.primary && "z-20")}
            >
              <Link
                href={`/atlas/${question.slug}`}
                className={cn(
                  "block text-center leading-snug transition-all duration-500 ease-(--ease-out-quint)",
                  "hover:-translate-y-0.5",
                  question.primary
                    ? "glow-gold font-display text-gold-bright text-(length:--text-display-s) hover:text-ivory lg:max-w-[13rem] lg:text-(length:--text-display-m)"
                    : "glow-ivory font-sans text-ivory/90 text-[0.8125rem] hover:text-gold-bright lg:max-w-[11.5rem] lg:text-(length:--text-small)",
                )}
              >
                {question.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The lit field behind the questions: a warm core, the lattice joining each
 * node to the centre, and scattered stars. Decorative — the meaning is in
 * the text — so it is hidden from assistive technology entirely.
 */
function ConstellationField({ questions }: { questions: PatternQuestion[] }) {
  const centre = POSITIONS["abandon"]!;
  const outer = questions.filter((q) => !q.primary && POSITIONS[q.id]);
  const n = (v: string) => Number(v.replace("%", ""));

  /* Deterministic scatter — a seeded hash, so the stars never move between
     server and client renders. */
  const stars = Array.from({ length: 46 }, (_, i) => {
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const b = Math.sin(i * 78.233) * 27183.1234;
    return {
      cx: ((a - Math.floor(a)) * 100).toFixed(2),
      cy: ((b - Math.floor(b)) * 100).toFixed(2),
      r: (0.12 + ((i % 5) / 5) * 0.2).toFixed(2),
      dur: 3.5 + (i % 4),
      delay: (i % 7) * 0.6,
    };
  });

  return (
    <svg
      aria-hidden
      focusable="false"
      className="cluster-lines pointer-events-none absolute inset-0 size-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <radialGradient id="cluster-core" cx="50%" cy="45%" r="46%">
          <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#c79a4e" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#c79a4e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cluster-ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8c88a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c79a4e" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <rect width="100" height="100" fill="url(#cluster-core)" />

      <g fill="#f7f2e8">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            className="twinkle"
            style={
              {
                "--twinkle-duration": `${s.dur}s`,
                "--twinkle-delay": `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* Lattice: centre to each node, plus a rim joining neighbours. */}
      <g stroke="url(#cluster-ray)" strokeWidth="0.14">
        {outer.map((q) => {
          const p = POSITIONS[q.id]!;
          return (
            <line
              key={q.id}
              x1={n(centre.x)}
              y1={n(centre.y)}
              x2={n(p.x)}
              y2={n(p.y)}
            />
          );
        })}
      </g>

      <g stroke="#c79a4e" strokeWidth="0.09" opacity="0.3">
        {outer.map((q, i) => {
          const p = POSITIONS[q.id]!;
          const next = POSITIONS[outer[(i + 1) % outer.length]!.id]!;
          return (
            <line
              key={`rim-${q.id}`}
              x1={n(p.x)}
              y1={n(p.y)}
              x2={n(next.x)}
              y2={n(next.y)}
            />
          );
        })}
      </g>

      {/* A node point at every question, and a brighter one at the centre. */}
      <g fill="#e8c88a">
        {outer.map((q, i) => {
          const p = POSITIONS[q.id]!;
          return (
            <circle
              key={`dot-${q.id}`}
              cx={n(p.x)}
              cy={n(p.y)}
              r="0.34"
              className="twinkle"
              style={
                {
                  "--twinkle-duration": `${4 + (i % 3)}s`,
                  "--twinkle-delay": `${i * 0.4}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
        <circle cx={n(centre.x)} cy={n(centre.y)} r="0.6" opacity="0.9" />
      </g>
    </svg>
  );
}
