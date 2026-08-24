/**
 * The Orbis Ojas mark: a nine-point orbital geometry.
 * Drawn, not imaged — it stays crisp at every size and costs no request.
 */
export function Mark({ className }: { className?: string }) {
  const points = Array.from({ length: 9 }, (_, i) => {
    const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
    return { x: 24 + Math.cos(angle) * 17, y: 24 + Math.sin(angle) * 17 };
  });

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <g stroke="currentColor" fill="none" strokeWidth="0.6" opacity="0.75">
        <circle cx="24" cy="24" r="21.5" />
        <circle cx="24" cy="24" r="17" opacity="0.5" />
        {/* Chords skipping two vertices produce the enneagram lattice. */}
        {points.map((p, i) => {
          const q = points[(i + 2) % 9]!;
          return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>
      <g fill="currentColor">
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.1" />
        ))}
        <circle cx="24" cy="24" r="2.4" />
      </g>
    </svg>
  );
}
