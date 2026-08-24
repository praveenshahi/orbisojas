/**
 * The lotus line-art that anchors the left of the quote band.
 * Drawn as mirrored petal pairs radiating from a common base, so it stays
 * crisp at any size and takes its colour from the token.
 */
export function Lotus({ className }: { className?: string }) {
  const petals = [
    { rx: 7, ry: 34, rotate: 0 },
    { rx: 8, ry: 29, rotate: 26 },
    { rx: 8, ry: 29, rotate: -26 },
    { rx: 9, ry: 23, rotate: 50 },
    { rx: 9, ry: 23, rotate: -50 },
    { rx: 9, ry: 17, rotate: 72 },
    { rx: 9, ry: 17, rotate: -72 },
    { rx: 8, ry: 12, rotate: 90 },
    { rx: 8, ry: 12, rotate: -90 },
  ];

  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden focusable="false">
      <g stroke="currentColor" fill="none" strokeWidth="0.7" strokeLinejoin="round">
        {petals.map((p, i) => (
          <ellipse
            key={i}
            cx="60"
            cy={88 - p.ry}
            rx={p.rx}
            ry={p.ry}
            transform={`rotate(${p.rotate} 60 88)`}
          />
        ))}
        {/* Radiating filaments, as in the comp's mark. */}
        {Array.from({ length: 13 }, (_, i) => {
          const a = (-90 + (i - 6) * 13) * (Math.PI / 180);
          return (
            <line
              key={`f-${i}`}
              x1="60"
              y1="88"
              x2={60 + Math.cos(a) * 46}
              y2={88 + Math.sin(a) * 46}
              opacity="0.35"
            />
          );
        })}
        <circle cx="60" cy="88" r="2" />
      </g>
    </svg>
  );
}
