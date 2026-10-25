import type { ProjectVisual as VisualKind } from '../data/projects';

interface ProjectVisualProps {
  kind: VisualKind;
  title: string;
  className?: string;
}

/**
 * Vignettes de projet générées (SVG/CSS) — aucune photo de stock.
 * Quatre variantes : fenêtre navigateur, tableau de bord SOC,
 * topologie réseau, tunnel marketing.
 */
export function ProjectVisual({ kind, title, className }: ProjectVisualProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-line bg-surface ${className ?? ''}`}
      role="img"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden="true" />

      {kind === 'browser' && <BrowserMock />}
      {kind === 'soc' && <SocMock />}
      {kind === 'topology' && <TopologyMock />}
      {kind === 'funnel' && <FunnelMock />}
    </div>
  );
}

function BrowserMock() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pv-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="40" y="30" width="320" height="180" rx="10" fill="#0b1220" stroke="rgba(139,154,179,0.25)" />
      <rect x="40" y="30" width="320" height="26" rx="10" fill="#111a2e" />
      <circle cx="56" cy="43" r="3.5" fill="#f5a524" opacity="0.8" />
      <circle cx="68" cy="43" r="3.5" fill="#8b9ab3" opacity="0.5" />
      <circle cx="80" cy="43" r="3.5" fill="#22d3ee" opacity="0.7" />
      <rect x="96" y="38" width="180" height="10" rx="5" fill="url(#pv-bar)" opacity="0.35" />
      {/* image héro */}
      <rect x="56" y="70" width="288" height="60" rx="6" fill="url(#pv-bar)" opacity="0.28" />
      {/* texte */}
      <rect x="56" y="142" width="200" height="8" rx="4" fill="#e6edf7" opacity="0.55" />
      <rect x="56" y="158" width="150" height="8" rx="4" fill="#8b9ab3" opacity="0.4" />
      {/* bouton */}
      <rect x="56" y="176" width="70" height="18" rx="9" fill="#2563eb" opacity="0.85" />
      {/* cartes */}
      <rect x="240" y="142" width="104" height="52" rx="6" fill="#111a2e" stroke="rgba(139,154,179,0.2)" />
      <rect x="250" y="152" width="60" height="6" rx="3" fill="#22d3ee" opacity="0.6" />
      <rect x="250" y="164" width="84" height="6" rx="3" fill="#8b9ab3" opacity="0.35" />
      <rect x="250" y="176" width="70" height="6" rx="3" fill="#8b9ab3" opacity="0.25" />
    </svg>
  );
}

function SocMock() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pv-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="368" height="208" rx="10" fill="#0b1220" stroke="rgba(139,154,179,0.22)" />
      {/* ligne principale */}
      <polyline
        points="32,150 80,120 128,135 176,90 224,105 272,60 320,75 368,50"
        fill="none"
        stroke="url(#pv-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polyline
        points="32,170 80,160 128,168 176,150 224,158 272,135 320,142 368,120"
        fill="none"
        stroke="#f5a524"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.6"
      />
      {/* barres */}
      <rect x="40" y="185" width="18" height="24" rx="3" fill="#3b82f6" opacity="0.7" />
      <rect x="72" y="175" width="18" height="34" rx="3" fill="#3b82f6" opacity="0.8" />
      <rect x="104" y="192" width="18" height="17" rx="3" fill="#3b82f6" opacity="0.6" />
      <rect x="136" y="168" width="18" height="41" rx="3" fill="#22d3ee" opacity="0.8" />
      <rect x="168" y="182" width="18" height="27" rx="3" fill="#3b82f6" opacity="0.7" />
      <rect x="200" y="160" width="18" height="49" rx="3" fill="#22d3ee" opacity="0.9" />
      {/* alertes */}
      <rect x="252" y="30" width="116" height="20" rx="6" fill="#111a2e" stroke="rgba(34,211,238,0.35)" />
      <circle cx="264" cy="40" r="3" fill="#22d3ee" className="animate-pulse-dot" />
      <rect x="274" y="36" width="70" height="8" rx="4" fill="#8b9ab3" opacity="0.5" />
      <rect x="252" y="58" width="116" height="20" rx="6" fill="#111a2e" stroke="rgba(245,165,36,0.35)" />
      <circle cx="264" cy="68" r="3" fill="#f5a524" />
      <rect x="274" y="64" width="56" height="8" rx="4" fill="#8b9ab3" opacity="0.5" />
      <rect x="252" y="86" width="116" height="20" rx="6" fill="#111a2e" stroke="rgba(139,154,179,0.25)" />
      <circle cx="264" cy="96" r="3" fill="#8b9ab3" />
      <rect x="274" y="92" width="82" height="8" rx="4" fill="#8b9ab3" opacity="0.4" />
      {/* titre */}
      <rect x="32" y="30" width="90" height="10" rx="5" fill="#e6edf7" opacity="0.6" />
      <rect x="32" y="48" width="60" height="8" rx="4" fill="#8b9ab3" opacity="0.4" />
    </svg>
  );
}

function TopologyMock() {
  const nodes: Array<[number, number, number]> = [
    [60, 60, 7],
    [140, 40, 5],
    [230, 70, 6],
    [320, 50, 4],
    [90, 130, 5],
    [180, 120, 8],
    [270, 140, 6],
    [340, 110, 5],
    [60, 200, 4],
    [150, 195, 6],
    [240, 205, 5],
    [330, 185, 7],
  ];
  const links: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 5],
    [5, 6],
    [6, 7],
    [4, 8],
    [5, 9],
    [6, 10],
    [7, 11],
    [8, 9],
    [9, 10],
    [10, 11],
    [5, 10],
  ];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <g stroke="rgba(59,130,246,0.4)" strokeWidth="1.2">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke={i % 4 === 0 ? 'rgba(34,211,238,0.6)' : undefined}
            strokeDasharray={i % 3 === 0 ? '4 4' : undefined}
          />
        ))}
      </g>
      {nodes.map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r + 6} fill={i % 3 === 0 ? 'rgba(34,211,238,0.12)' : 'rgba(59,130,246,0.1)'} />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={i % 3 === 0 ? '#22d3ee' : '#3b82f6'}
            opacity={i % 2 === 0 ? 0.9 : 0.6}
          />
        </g>
      ))}
      <circle cx="180" cy="120" r="16" fill="none" stroke="#f5a524" strokeWidth="1" opacity="0.5" strokeDasharray="3 3" />
    </svg>
  );
}

function FunnelMock() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pv-funnel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f5a524" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* entonnoir */}
      <path d="M90 40 L310 40 L265 100 L135 100 Z" fill="url(#pv-funnel)" opacity="0.75" rx="4" />
      <path d="M145 112 L255 112 L225 168 L175 168 Z" fill="url(#pv-funnel)" opacity="0.55" />
      <path d="M182 180 L218 180 L200 214 L182 214 Z" fill="url(#pv-funnel)" opacity="0.9" />
      {/* flèches de flux */}
      <g stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <line x1="46" y1="70" x2="76" y2="70" className="animate-dash-flow" strokeDasharray="6 8" />
        <line x1="46" y1="140" x2="76" y2="140" className="animate-dash-flow" strokeDasharray="6 8" />
      </g>
      {/* courbe de conversion */}
      <polyline
        points="330,200 342,170 354,150 366,120 378,95"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="378" cy="95" r="4" fill="#f5a524" />
    </svg>
  );
}
