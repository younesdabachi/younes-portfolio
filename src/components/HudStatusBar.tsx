import { useEffect, useState } from 'react';
import { useMotionPreference } from '../hooks/MotionProvider';

/**
 * Barre de statut HUD (décorative, masquée aux lecteurs d'écran) :
 * horloge temps réel, état « SOC:OK », identifiant de session hexadécimal.
 */
export function HudStatusBar() {
  const { reduceMotion } = useMotionPreference();
  const [clock, setClock] = useState(() => formatTime());
  const [session] = useState(
    () => '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setClock(formatTime()), 1000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-4 z-40 hidden font-mono text-[10px] tracking-wider text-hack-dim/80 md:block"
      aria-hidden="true"
    >
      <span className="text-hack">[ SOC:OK ]</span> {clock} ▮ MEM:STABLE ▮ SES:{session}
    </div>
  );
}

function formatTime(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');
}
