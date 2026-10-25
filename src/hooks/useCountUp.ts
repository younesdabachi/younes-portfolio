import { useEffect, useRef, useState, type RefObject } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPreference } from './MotionProvider';

interface CountUpResult {
  value: number;
  ref: RefObject<HTMLSpanElement>;
}

/**
 * Compteur animé déclenché à l'entrée dans le viewport.
 * Respecte la préférence d'animation (valeur finale immédiate si réduite).
 * Usage : const { value, ref } = useCountUp(6); <span ref={ref}>{value}</span>
 */
export function useCountUp(target: number, durationMs = 1400): CountUpResult {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { reduceMotion } = useMotionPreference();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, durationMs, reduceMotion]);

  return { value, ref };
}
