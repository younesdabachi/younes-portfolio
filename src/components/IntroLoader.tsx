import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18n';
import { useMotionPreference } from '../hooks/MotionProvider';

/**
 * Intro « séquence de boot » (< 2 s, cliquable pour passer) :
 * lignes de démarrage terminal puis ACCÈS AUTORISÉ.
 * Ignorée entièrement si les animations sont désactivées.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const { dict } = useI18n();
  const { reduceMotion } = useMotionPreference();
  const [visibleLines, setVisibleLines] = useState(0);
  const [granted, setGranted] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    if (reduceMotion) {
      finish();
      return;
    }
    const lines = dict.intro.bootLines;
    const timers: number[] = [];
    lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibleLines(i + 1), 240 + i * 260));
    });
    timers.push(
      window.setTimeout(() => setGranted(true), 240 + lines.length * 260 + 160)
    );
    timers.push(window.setTimeout(finish, 240 + lines.length * 260 + 950));
    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, dict.intro.bootLines]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-[#010604]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      role="status"
      aria-label={dict.a11y.loading}
      onClick={finish}
    >
      <div className="hack-panel scanlines hud-corners relative w-[min(92vw,480px)] rounded-2xl p-6">
        <div className="font-mono text-[12px] leading-loose text-hack-dim">
          {dict.intro.bootLines.slice(0, visibleLines).map((line) => (
            <p key={line}>{line}</p>
          ))}
          {granted && (
            <p className="hack-caret mt-3 text-base font-bold tracking-[0.25em] text-hack">
              {dict.intro.granted}
            </p>
          )}
        </div>
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-hack-dim/60">
        {dict.a11y.loading}
      </p>
    </motion.div>
  );
}
