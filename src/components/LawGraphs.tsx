import { motion, useReducedMotion } from 'framer-motion';

/**
 * Graphiques animés des lois de l'univers (décoratifs, aria-hidden).
 * Les courbes se « dessinent » à l'entrée dans le viewport (pathLength).
 */

function DrawPath({ d, stroke = 'var(--color-primary)', delay = 0 }: { d: string; stroke?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth="2.5"
      strokeLinecap="round"
      initial={reduce ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.6, delay, ease: 'easeInOut' }}
    />
  );
}

function Axes() {
  return (
    <g stroke="var(--color-line)" strokeWidth="1">
      <line x1="16" y1="16" x2="16" y2="104" />
      <line x1="16" y1="104" x2="188" y2="104" />
    </g>
  );
}

export function LawGraph({ id }: { id: string }) {
  switch (id) {
    case 'entropy':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <Axes />
          <DrawPath d="M20 96 L40 88 L52 92 L66 78 L80 84 L94 68 L108 74 L122 58 L140 64 L158 46 L176 52" />
          {[
            [30, 92, 3],
            [58, 84, 2.5],
            [86, 72, 3],
            [114, 62, 2.5],
            [142, 50, 3],
            [168, 40, 2.5],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="var(--color-accent)"
              className="animate-pulse-dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <text x="130" y="20" fontSize="10" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            désordre →
          </text>
        </svg>
      );
    case 'emc2':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <Axes />
          <DrawPath d="M20 100 C 60 98, 90 92, 110 70 C 130 46, 150 30, 176 20" stroke="var(--color-neon)" />
          <DrawPath d="M20 100 C 60 96, 88 88, 106 74" delay={0.25} stroke="var(--color-accent)" />
          <circle cx="176" cy="20" r="4" fill="var(--color-gold)" className="animate-pulse-dot" />
          <text x="22" y="26" fontSize="11" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            E
          </text>
          <text x="170" y="116" fontSize="11" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            m
          </text>
        </svg>
      );
    case 'light':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <Axes />
          <line x1="150" y1="16" x2="150" y2="104" stroke="var(--color-gold)" strokeWidth="1.5" strokeDasharray="5 5" />
          <text x="154" y="26" fontSize="9" fill="var(--color-gold)" fontFamily="JetBrains Mono, monospace">
            c
          </text>
          <DrawPath d="M20 102 C 60 100, 100 92, 124 70 C 136 58, 142 44, 146 30" stroke="var(--color-accent)" />
          <circle cx="146" cy="30" r="3.5" fill="var(--color-accent)" className="animate-pulse-dot" />
        </svg>
      );
    case 'gravity':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <circle cx="100" cy="60" r="10" fill="var(--color-gold)" opacity="0.9" />
          <circle cx="100" cy="60" r="16" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
          <ellipse
            cx="100"
            cy="60"
            rx="70"
            ry="34"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <g style={{ transformOrigin: '100px 60px' }} className="animate-float-y">
            <circle cx="170" cy="60" r="4.5" fill="var(--color-accent)" />
          </g>
          <circle cx="42" cy="76" r="3" fill="var(--color-primary)" className="animate-pulse-dot" />
        </svg>
      );
    case 'exponential':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <Axes />
          <DrawPath d="M20 102 C 80 100, 120 96, 140 80 C 156 66, 166 46, 174 22" stroke="var(--color-primary)" />
          {[40, 80, 120, 160].map((x) => (
            <line
              key={x}
              x1={x}
              y1="104"
              x2={x}
              y2="108"
              stroke="var(--color-muted)"
              strokeWidth="1"
            />
          ))}
          <text x="34" y="116" fontSize="8" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            ×2
          </text>
          <text x="74" y="116" fontSize="8" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            ×4
          </text>
          <text x="114" y="116" fontSize="8" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            ×8
          </text>
          <text x="152" y="116" fontSize="8" fill="var(--color-muted)" fontFamily="JetBrains Mono, monospace">
            ×16
          </text>
          <circle cx="174" cy="22" r="3.5" fill="var(--color-neon)" className="animate-pulse-dot" />
        </svg>
      );
    case 'chaos':
      return (
        <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
          <Axes />
          <DrawPath d="M20 100 C 60 96, 90 84, 110 60 C 126 40, 140 28, 176 18" stroke="var(--color-primary)" />
          <DrawPath
            d="M21 100 C 62 90, 92 60, 112 44 C 130 30, 150 50, 178 84"
            stroke="var(--color-neon)"
            delay={0.3}
          />
          <circle cx="20" cy="100" r="4" fill="var(--color-gold)" />
          <text x="30" y="94" fontSize="9" fill="var(--color-gold)" fontFamily="JetBrains Mono, monospace">
            δx₀
          </text>
          <circle cx="176" cy="18" r="3" fill="var(--color-primary)" className="animate-pulse-dot" />
          <circle cx="178" cy="84" r="3" fill="var(--color-neon)" className="animate-pulse-dot" />
        </svg>
      );
    default:
      return null;
  }
}
