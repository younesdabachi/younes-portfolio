import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18n';
import { useMotionPreference } from '../hooks/MotionProvider';

interface FeedLine {
  id: number;
  time: string;
  tool: string;
  message: string;
  severity: 'INFO' | 'WARN' | 'ALERT';
  ip: string;
}

/** Adresses des plages de documentation RFC 5737 — jamais de vraies IP. */
const DOC_IPS = ['192.0.2.', '198.51.100.', '203.0.113.'];

const TOOLS = ['wazuh', 'suricata', 'zabbix', 'grafana', 'cowrie'];

const MESSAGES: Record<string, string[]> = {
  wazuh: [
    'syscheck: checksum changed',
    'rootcheck: hidden process scan',
    'auth: agent key polling',
    'log analysis: authentication failure',
  ],
  suricata: [
    'TLS anomaly flagged',
    'dns query logged',
    'rule match: ET SCAN',
    'flow established http',
  ],
  zabbix: [
    'cpu load trigger OK',
    'icmp ping timeout',
    'disk usage threshold',
    'agent availability restored',
  ],
  grafana: [
    'panel query completed',
    'datasource health check',
    'alert rule evaluated',
    'dashboard snapshot saved',
  ],
  cowrie: [
    'honeypot session opened',
    'login failed (root)',
    'command logged: ls -la',
    'connection closed',
  ],
};

function randomIp(): string {
  const prefix = DOC_IPS[Math.floor(Math.random() * DOC_IPS.length)];
  return prefix + (1 + Math.floor(Math.random() * 254));
}

function randomSeverity(): FeedLine['severity'] {
  const roll = Math.random();
  if (roll > 0.93) return 'ALERT';
  if (roll > 0.72) return 'WARN';
  return 'INFO';
}

function makeLine(id: number): FeedLine {
  const tool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
  const pool = MESSAGES[tool];
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
  return {
    id,
    time,
    tool,
    message: pool[Math.floor(Math.random() * pool.length)],
    severity: randomSeverity(),
    ip: randomIp(),
  };
}

const SEVERITY_CLASS: Record<FeedLine['severity'], string> = {
  INFO: 'text-hack-dim',
  WARN: 'text-gold',
  ALERT: 'text-red-400',
};

/**
 * Flux d'alertes simulé (décoratif) : lignes générées aléatoirement,
 * clairement étiquetées « SIMULATION ». Aucune donnée réelle.
 */
export function ThreatFeed() {
  const { dict } = useI18n();
  const { reduceMotion } = useMotionPreference();
  const [lines, setLines] = useState<FeedLine[]>(() =>
    Array.from({ length: 6 }, (_, i) => makeLine(i))
  );
  const counter = useRef(6);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          counter.current += 1;
          const next = makeLine(counter.current);
          setLines((prev) => [...prev.slice(-38), next]);
          schedule();
        },
        1400 + Math.random() * 1600
      );
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [lines]);

  return (
    <div className="hack-panel scanlines relative overflow-hidden rounded-2xl" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-hack-line px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-hack">
          <span className="h-2 w-2 rounded-full bg-hack animate-pulse-dot" />
          {dict.lab.feedTitle}
        </span>
        <span className="rounded border border-hack-line px-2 py-0.5 font-mono text-[10px] text-hack-dim">
          {dict.projects.socBadge}
        </span>
      </div>
      <div ref={listRef} className="h-72 overflow-hidden px-4 py-3 font-mono text-[12px] leading-relaxed">
        {lines.map((line) => (
          <p key={line.id} className="whitespace-nowrap">
            <span className="text-hack-dim">{line.time}</span>{' '}
            <span className="text-hack">[{line.tool}]</span>{' '}
            <span className={SEVERITY_CLASS[line.severity]}>{line.severity}</span>{' '}
            <span className="text-hack/70">{line.message}</span>{' '}
            <span className="text-hack-dim">src={line.ip}</span>
          </p>
        ))}
      </div>
      {/* Résumé accessible : le flux défilant est masqué aux lecteurs d'écran */}
      <p className="sr-only">{dict.lab.a11yFeed}</p>
    </div>
  );
}
