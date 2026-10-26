/**
 * Mini-diagrammes décoratifs des technologies NVIDIA (aria-hidden).
 * Petits SVG géométriques, animations CSS discrètes.
 */

const mono = 'JetBrains Mono, monospace';

export function NvidiaGlyph({ id }: { id: string }) {
  switch (id) {
    case 'dlss':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="2" y="10" width="16" height="16" rx="2" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" />
          <rect x="5" y="13" width="4" height="4" fill="var(--color-muted)" />
          <rect x="11" y="19" width="4" height="4" fill="var(--color-muted)" />
          <path d="M24 18 h8 m-3 -3 l3 3 l-3 3" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" className="animate-dash-flow" />
          <rect x="38" y="4" width="24" height="28" rx="3" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}${c}`} x={41 + c * 7} y={7 + r * 8} width="5" height="5" fill="var(--color-primary)" opacity={0.5 + ((r + c) % 3) * 0.25} />
            ))
          )}
        </svg>
      );
    case 'fg':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="4" y="8" width="12" height="20" rx="2" fill="var(--color-primary)" opacity="0.9" />
          <rect x="26" y="8" width="12" height="20" rx="2" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse-dot" />
          <rect x="48" y="8" width="12" height="20" rx="2" fill="var(--color-primary)" opacity="0.9" />
          <text x="7" y="22" fontSize="7" fill="var(--color-bg)" fontFamily={mono}>1</text>
          <text x="29" y="22" fontSize="7" fill="var(--color-neon)" fontFamily={mono}>AI</text>
          <text x="51" y="22" fontSize="7" fill="var(--color-bg)" fontFamily={mono}>2</text>
        </svg>
      );
    case 'rt':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <circle cx="8" cy="20" r="4" fill="var(--color-gold)" className="animate-pulse-dot" />
          <path d="M12 18 L32 8 L54 14" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
          <path d="M12 22 L30 30 L52 28" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" />
          <path d="M32 8 L40 30" stroke="var(--color-neon)" strokeWidth="1" fill="none" opacity="0.7" />
          <circle cx="54" cy="14" r="2" fill="var(--color-accent)" />
          <circle cx="52" cy="28" r="2" fill="var(--color-primary)" />
          <circle cx="40" cy="30" r="2" fill="var(--color-neon)" />
        </svg>
      );
    case 'cuda':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect
                key={`${r}${c}`}
                x={6 + c * 9}
                y={5 + r * 8}
                width="6"
                height="6"
                rx="1"
                fill="var(--color-primary)"
                className="animate-pulse-dot"
                style={{ animationDelay: `${((r * 6 + c) % 8) * 0.25}s` }}
              />
            ))
          )}
        </svg>
      );
    case 'tensor':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="6" y="4" width="16" height="16" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" />
          <rect x="42" y="20" width="16" height="16" fill="none" stroke="var(--color-neon)" strokeWidth="1.5" />
          <text x="10" y="15" fontSize="8" fill="var(--color-neon)" fontFamily={mono}>A</text>
          <text x="46" y="31" fontSize="8" fill="var(--color-neon)" fontFamily={mono}>B</text>
          <text x="28" y="24" fontSize="10" fill="var(--color-accent)" fontFamily={mono}>×</text>
        </svg>
      );
    case 'rtcore':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="24" y="4" width="16" height="8" rx="2" fill="var(--color-primary)" />
          <rect x="8" y="26" width="16" height="8" rx="2" fill="var(--color-accent)" opacity="0.8" />
          <rect x="40" y="26" width="16" height="8" rx="2" fill="var(--color-accent)" opacity="0.8" />
          <path d="M28 12 L16 26 M36 12 L48 26" stroke="var(--color-muted)" strokeWidth="1" />
          <text x="27" y="11" fontSize="6" fill="var(--color-bg)" fontFamily={mono}>BVH</text>
        </svg>
      );
    case 'vram':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          {[
            [4, 26, 24],
            [4, 18, 40],
            [4, 10, 56],
          ].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height="5" rx="1.5" fill="var(--color-primary)" opacity={0.5 + i * 0.25} />
          ))}
          <path d="M50 32 L58 24 L62 28 L68 20" stroke="var(--color-gold)" strokeWidth="1.5" fill="none" transform="translate(-8,-14)" />
        </svg>
      );
    case 'rbar':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="4" y="6" width="10" height="10" fill="var(--color-muted)" opacity="0.6" />
          <rect x="4" y="18" width="10" height="10" fill="var(--color-muted)" opacity="0.6" />
          <rect x="4" y="30" width="10" height="6" fill="var(--color-muted)" opacity="0.6" />
          <path d="M20 20 h8 m-3 -3 l3 3 l-3 3" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
          <rect x="34" y="6" width="26" height="30" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
          <rect x="38" y="10" width="18" height="22" fill="var(--color-primary)" className="animate-pulse-dot" />
          <text x="39" y="25" fontSize="7" fill="var(--color-bg)" fontFamily={mono}>BAR</text>
        </svg>
      );
    case 'vsr':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="4" y="10" width="20" height="14" rx="2" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M30 17 h6 m-3 -3 l3 3 l-3 3" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
          <rect x="42" y="6" width="18" height="22" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="45" y1={11 + i * 6} x2="57" y2={11 + i * 6} stroke="var(--color-primary)" strokeWidth="2" opacity={0.8} />
          ))}
        </svg>
      );
    case 'nis':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <path d="M8 28 L20 12 L32 24 L44 8 L56 18" stroke="var(--color-muted)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M8 26 L20 10 L32 22 L44 6 L56 16" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
          <circle cx="44" cy="6" r="2.5" fill="var(--color-accent)" />
        </svg>
      );
    case 'reflex':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          <rect x="4" y="14" width="10" height="14" rx="4" fill="var(--color-primary)" />
          <line x1="18" y1="8" x2="18" y2="34" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="42" y1="8" x2="42" y2="34" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="2 3" />
          <path d="M20 21 h18" stroke="var(--color-gold)" strokeWidth="2.5" className="animate-dash-flow" />
          <rect x="46" y="8" width="14" height="20" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
        </svg>
      );
    case 'nvenc':
      return (
        <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <rect key={i} x={4 + i * 10} y="14" width="8" height="12" rx="1.5" fill="none" stroke="var(--color-muted)" strokeWidth="1.2" />
          ))}
          <path d="M38 20 h6 m-3 -3 l3 3 l-3 3" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
          <rect x="48" y="12" width="12" height="16" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
          <text x="51" y="23" fontSize="7" fill="var(--color-primary)" fontFamily={mono}>01</text>
        </svg>
      );
    default:
      return null;
  }
}
