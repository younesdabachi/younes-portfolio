import { useMotionPreference } from '../hooks/MotionProvider';

/** Mots-clés réels du parcours (outils, projets) — noms propres, sans traduction. */
const KEYWORDS = [
  'WAZUH',
  'SURICATA',
  'ZABBIX',
  'GRAFANA',
  'COWRIE',
  'LINUX DEBIAN',
  'FTTH',
  'AUTOCAD',
  'CAPFT / COMAC',
  'PMS PLURIEL',
  'ERP ODOO',
  'WORDPRESS',
  'META ADS',
  'IPERIUS BACKUP',
  'SMIT',
  'ONIGT / ANCFCC / CRI',
];

/**
 * Bandeau défilant décoratif (mots-clés réels du profil).
 * Masqué si les animations sont désactivées (pur élément décoratif).
 */
export function Ticker() {
  const { reduceMotion } = useMotionPreference();
  if (reduceMotion) return null;

  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center" aria-hidden="true">
      {KEYWORDS.map((word) => (
        <li key={word} className="flex items-center font-mono text-xs tracking-[0.25em] hud-fg">
          <span className="px-6">{word}</span>
          <span className="hud-fg-strong opacity-60">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="relative overflow-hidden border-y border-line py-3"
      style={{ background: 'var(--hud-strip)' }}
    >
      <div className="ticker-track">
        {row('a')}
        {row('b')}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, transparent 12%, transparent 88%, var(--color-bg) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
