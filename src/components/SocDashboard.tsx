import { useI18n } from '../i18n/I18n';

/**
 * Carte « SOC dashboard » décorative : graphiques SVG animés.
 * Clairement étiquetée comme illustrative — aucune donnée réelle.
 */
export function SocDashboard() {
  const { dict } = useI18n();

  return (
    <figure className="relative">
      <div className="glass gradient-border rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              SOC — Wazuh · Suricata · Zabbix
            </span>
          </div>
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">
            {dict.projects.socBadge}
          </span>
        </div>

        <svg viewBox="0 0 560 220" className="w-full" role="img" aria-label={dict.projects.socCaption}>
          <defs>
            <linearGradient id="soc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="soc-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* grille */}
          <g stroke="rgba(139,154,179,0.12)" strokeWidth="1">
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="16" y1={y} x2="544" y2={y} />
            ))}
          </g>

          {/* courbe principale + aire */}
          <path
            d="M16 150 L70 120 L124 138 L178 95 L232 112 L286 70 L340 88 L394 55 L448 72 L502 40 L544 52 L544 190 L16 190 Z"
            fill="url(#soc-area)"
          />
          <path
            d="M16 150 L70 120 L124 138 L178 95 L232 112 L286 70 L340 88 L394 55 L448 72 L502 40 L544 52"
            fill="none"
            stroke="url(#soc-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* seconde courbe pointillée */}
          <path
            d="M16 172 L70 165 L124 170 L178 155 L232 162 L286 142 L340 150 L394 128 L448 136 L502 112 L544 122"
            fill="none"
            stroke="#f5a524"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            opacity="0.65"
          />

          {/* barres de niveau */}
          <g>
            {[
              [28, 26],
              [46, 38],
              [64, 22],
              [82, 44],
              [100, 30],
              [118, 48],
            ].map(([x, h], i) => (
              <rect
                key={i}
                x={x}
                y={196 - h * 0.4}
                width="10"
                height={h * 0.4}
                rx="2"
                fill={i % 2 === 0 ? '#3b82f6' : '#22d3ee'}
                opacity="0.75"
              />
            ))}
          </g>

          {/* flux d'alertes */}
          <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#8b9ab3">
            <rect x="440" y="150" width="104" height="14" rx="4" fill="#111a2e" stroke="rgba(34,211,238,0.3)" />
            <circle cx="448" cy="157" r="2.5" fill="#22d3ee" />
            <text x="456" y="160.5">alert: ssh</text>
            <rect x="440" y="168" width="104" height="14" rx="4" fill="#111a2e" stroke="rgba(245,165,36,0.3)" />
            <circle cx="448" cy="175" r="2.5" fill="#f5a524" />
            <text x="456" y="178.5">alert: web</text>
            <rect x="440" y="186" width="104" height="14" rx="4" fill="#111a2e" stroke="rgba(139,154,179,0.2)" />
            <circle cx="448" cy="193" r="2.5" fill="#8b9ab3" />
            <text x="456" y="196.5">ok</text>
          </g>
        </svg>

        {/* flux de logs animé */}
        <div className="mt-3 overflow-hidden rounded-lg border border-line bg-bg/60 p-3 font-mono text-[11px] leading-relaxed text-muted" aria-hidden="true">
          <p>
            <span className="text-accent">[wazuh]</span> syscheck: baseline updated —{' '}
            <span className="text-text/70">/var/ossec</span>
          </p>
          <p>
            <span className="text-primary">[suricata]</span> dns query logged —{' '}
            <span className="text-text/70">resolved</span>
          </p>
          <p>
            <span className="text-gold">[cowrie]</span> honeypot session closed —{' '}
            <span className="text-text/70">login failed</span>
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {dict.projects.socCaption}
      </figcaption>
    </figure>
  );
}
