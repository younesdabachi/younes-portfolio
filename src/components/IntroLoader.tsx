import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useI18n } from '../i18n/I18n';

/**
 * Intro de chargement (< 1,2 s) : monogramme YA + barre de progression.
 * Ignorée entièrement si prefers-reduced-motion.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const { dict } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 950;
    let frame = 0;
    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      setProgress(ratio);
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onDone, 150);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      role="status"
      aria-label={dict.a11y.loading}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass gradient-border flex h-20 w-20 items-center justify-center rounded-2xl"
      >
        <span className="font-display text-3xl font-bold text-gradient animate-gradient-x">YA</span>
      </motion.div>

      <div className="mt-8 h-px w-44 overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-gold transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        {Math.round(progress * 100)}%
      </p>
    </motion.div>
  );
}
