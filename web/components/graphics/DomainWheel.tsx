import Link from "next/link";
import { GlyphCircle } from "@/components/ui/GlyphCircle";
import { Mark } from "@/components/ui/Mark";
import { domains, OJAS_CORE } from "@/content/atlas";

/**
 * The OJAS wheel: seven fields orbiting the centre.
 *
 * A Server Component — the lattice, the stars and the breathing are all CSS
 * and SVG, so the hero's centrepiece ships zero JavaScript and every label
 * is in the initial HTML.
 *
 * Positions come from each domain's `angle`, so re-ordering or adding a
 * field is a content change, not a layout one.
 */

const RADIUS = 37; // percent of the box, centre to satellite

function position(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + Math.cos(rad) * RADIUS,
    y: 50 + Math.sin(rad) * RADIUS,
  };
}

export function DomainWheel() {
  const stars = Array.from({ length: 54 }, (_, i) => {
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const b = Math.sin(i * 78.233) * 27183.1234;
    return {
      cx: ((a - Math.floor(a)) * 100).toFixed(2),
      cy: ((b - Math.floor(b)) * 100).toFixed(2),
      r: (0.12 + ((i % 5) / 5) * 0.22).toFixed(2),
      dur: 3.5 + (i % 4),
      delay: (i % 7) * 0.55,
    };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* --- The field: glow, orbit rings, lattice, stars ---------------- */}
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id="wheel-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.26" />
            <stop offset="42%" stopColor="#c79a4e" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#c79a4e" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill="url(#wheel-core)" />

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

        {/* Orbit rings. */}
        <g stroke="#c79a4e" fill="none" opacity="0.16">
          <circle cx="50" cy="50" r={RADIUS} strokeWidth="0.2" />
          <circle cx="50" cy="50" r={RADIUS * 0.62} strokeWidth="0.15" />
        </g>

        {/* Spokes from the centre, and the rim joining neighbours. */}
        <g stroke="#c79a4e" strokeWidth="0.18" opacity="0.42">
          {domains.map((d) => {
            const p = position(d.angle);
            return <line key={d.id} x1="50" y1="50" x2={p.x} y2={p.y} />;
          })}
        </g>
        <g stroke="#c79a4e" strokeWidth="0.12" opacity="0.24">
          {domains.map((d, i) => {
            const a = position(d.angle);
            const b = position(domains[(i + 1) % domains.length]!.angle);
            return <line key={`rim-${d.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
          })}
        </g>
      </svg>

      {/* --- The centre --------------------------------------------------- */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="mx-auto grid size-24 place-items-center rounded-full border border-gold/45 bg-void/60 backdrop-blur-[2px] sm:size-28">
          <Mark className="size-14 text-gold sm:size-16" />
        </span>
        <p className="mt-3 font-sans text-(length:--text-eyebrow) tracking-[0.28em] text-gold uppercase">
          {OJAS_CORE.label}
        </p>
        <p className="mt-1 text-[0.625rem] leading-tight text-ivory-faint">
          {OJAS_CORE.terms.join(" · ")}
        </p>
      </div>

      {/* --- The seven fields --------------------------------------------- */}
      <ul className="absolute inset-0">
        {domains.map((d, i) => {
          const p = position(d.angle);
          return (
            <li
              key={d.id}
              className="drift absolute -translate-x-1/2 -translate-y-1/2"
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  "--drift-duration": `${9 + (i % 4) * 1.3}s`,
                  "--drift-delay": `${(i % 5) * 0.8}s`,
                } as React.CSSProperties
              }
            >
              <Link
                href={`/atlas#explore`}
                className="group block w-[8.5rem] text-center sm:w-[9.5rem]"
              >
                <GlyphCircle
                  name={d.glyph}
                  size="md"
                  className="mx-auto bg-void/70 backdrop-blur-[2px] transition-colors duration-500 group-hover:border-gold"
                />
                <p className="mt-2.5 font-display text-[0.9375rem] leading-tight text-ivory transition-colors duration-500 group-hover:text-gold-bright">
                  {d.label}
                </p>
                <p className="mt-1 text-[0.5625rem] leading-tight text-ivory-faint">
                  {d.terms.join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
