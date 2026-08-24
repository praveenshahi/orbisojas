import { Mark } from "@/components/ui/Mark";

const STAGES = [
  { label: "Trigger", angle: -90 },
  { label: "Reaction", angle: 0 },
  { label: "Reinforcement", angle: 90 },
  { label: "Return", angle: 180 },
] as const;

/**
 * The core loop diagram from the report spread — trigger, reaction,
 * reinforcement, return — with the Orbis mark at the centre.
 *
 * Drawn as SVG for the same reasons as PatternMap: sharp, weightless and
 * independent of any photography.
 */
export function CoreLoop({ className }: { className?: string }) {
  const cx = 100;
  const cy = 100;
  const radius = 54;

  const at = (angleDeg: number, r = radius) => {
    const a = (angleDeg * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  return (
    <figure className={className} aria-hidden>
      {/* Bleed so the side stage labels clear the frame. */}
      <svg viewBox="-24 0 248 206" className="w-full">
        <defs>
          <marker
            id="loop-arrow"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="4.5"
            markerHeight="4.5"
            orient="auto-start-reverse"
          >
            <path d="M0 0l8 4-8 4z" fill="#8a6528" />
          </marker>
        </defs>

        <text
          x="100"
          y="14"
          textAnchor="middle"
          className="fill-ink-text font-sans text-[8px] tracking-[0.18em] uppercase"
        >
          Core loop
        </text>

        {/* Four arcs, each stopping short of the next node so the arrowheads
            read as motion between stages rather than a closed ring. */}
        <g fill="none" stroke="#8a6528" strokeWidth="0.9" markerEnd="url(#loop-arrow)">
          {STAGES.map((stage, i) => {
            const start = at(stage.angle + 16);
            const end = at(stage.angle + 74);
            return (
              <path
                key={stage.label}
                d={`M ${start[0]} ${start[1]} A ${radius} ${radius} 0 0 1 ${end[0]} ${end[1]}`}
                opacity={0.85 - i * 0.05}
              />
            );
          })}
        </g>

        {/* Stage nodes. */}
        {STAGES.map((stage) => {
          const [x, y] = at(stage.angle);
          return (
            <g key={stage.label}>
              <circle cx={x} cy={y} r="11" fill="#f4eee2" stroke="#8a6528" strokeWidth="0.7" />
              <circle cx={x} cy={y} r="2.4" fill="#8a6528" />
              <text
                x={x}
                y={y + (stage.angle === 90 ? 22 : stage.angle === -90 ? -17 : 0)}
                dx={stage.angle === 0 ? 17 : stage.angle === 180 ? -17 : 0}
                textAnchor={stage.angle === 0 ? "start" : stage.angle === 180 ? "end" : "middle"}
                dominantBaseline="middle"
                className="fill-ink-text font-sans text-[6.6px]"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* The centre: the pattern the loop is organised around. */}
        <circle cx={cx} cy={cy} r="17" fill="#f4eee2" opacity="0.9" />
        <foreignObject x={cx - 13} y={cy - 13} width="26" height="26">
          <Mark className="size-full text-gold-deep" />
        </foreignObject>
      </svg>
    </figure>
  );
}
