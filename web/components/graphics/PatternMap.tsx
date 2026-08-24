const AXES = ["Mind", "Identity", "Emotions", "Body", "Relationships", "Purpose"] as const;

/** Illustrative sample values — this is a specimen of the report, not a result. */
const SAMPLE = [0.77, 0.62, 0.68, 0.54, 0.42, 0.63];

const BARS = [
  { label: "Self-worth", value: 72 },
  { label: "Emotional regulation", value: 68 },
  { label: "Inner child", value: 54 },
  { label: "Boundaries", value: 42 },
  { label: "Identity clarity", value: 77 },
  { label: "Purpose alignment", value: 63 },
];

/**
 * The six-axis pattern map from the report spread, drawn rather than
 * photographed: crisp at every size, themeable from tokens, and free of any
 * image dependency. Decorative as a whole — the adjacent copy carries the
 * meaning — so it is hidden from assistive technology.
 */
export function PatternMap({ className }: { className?: string }) {
  const cx = 100;
  const cy = 102;
  const radius = 54;

  const point = (index: number, scale: number) => {
    const angle = (index / AXES.length) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(angle) * radius * scale, cy + Math.sin(angle) * radius * scale] as const;
  };

  const shape = SAMPLE.map((v, i) => point(i, v).join(",")).join(" ");

  return (
    <figure className={className} aria-hidden>
      {/* Horizontal bleed in the viewBox so long axis labels — "Relationships"
          especially — can never clip against the frame. */}
      <svg viewBox="-18 0 236 264" className="w-full">
        <text
          x="100"
          y="16"
          textAnchor="middle"
          className="fill-ink-text font-sans text-[8px] tracking-[0.18em] uppercase"
        >
          Your pattern map
        </text>

        {/* Concentric rings and spokes. */}
        <g stroke="#8a6528" fill="none" opacity="0.28">
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <polygon
              key={r}
              points={AXES.map((_, i) => point(i, r).join(",")).join(" ")}
              strokeWidth="0.5"
            />
          ))}
          {AXES.map((_, i) => {
            const [x, y] = point(i, 1);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} strokeWidth="0.4" />;
          })}
        </g>

        {/* The plotted shape. */}
        <polygon points={shape} fill="#1f4b47" fillOpacity="0.72" stroke="#c79a4e" strokeWidth="0.9" />
        <g fill="#c79a4e">
          {SAMPLE.map((v, i) => {
            const [x, y] = point(i, v);
            return <circle key={i} cx={x} cy={y} r="1.6" />;
          })}
        </g>

        {/* Axis labels, pushed just outside the outer ring. */}
        <g className="fill-ink-muted font-sans text-[6px]">
          {AXES.map((axis, i) => {
            const [x, y] = point(i, 1.24);
            return (
              <text
                key={axis}
                x={x}
                y={y}
                textAnchor={x > cx + 3 ? "start" : x < cx - 3 ? "end" : "middle"}
                dominantBaseline="middle"
              >
                {axis}
              </text>
            );
          })}
        </g>

        {/* The scored bars beneath. */}
        <g transform="translate(18, 178)">
          {BARS.map((bar, i) => (
            <g key={bar.label} transform={`translate(0, ${i * 13})`}>
              <text className="fill-ink-muted font-sans text-[6px]" dominantBaseline="middle" y="0">
                {bar.label}
              </text>
              <rect x="86" y="-2" width="60" height="3" rx="1.5" fill="#8a6528" opacity="0.2" />
              <rect
                x="86"
                y="-2"
                width={(60 * bar.value) / 100}
                height="3"
                rx="1.5"
                fill="#8a6528"
              />
              <text
                className="fill-ink-text font-sans text-[6px]"
                x="152"
                y="0"
                dominantBaseline="middle"
              >
                {bar.value}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );
}
