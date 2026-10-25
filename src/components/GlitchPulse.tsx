import { useEffect } from 'react';
import { useMotionPreference } from '../hooks/MotionProvider';

/**
 * Impulsion de glitch globale : toutes les 9–16 s, un très bref effet
 * (teinte + décalage) traverse <main>. Purement décoratif.
 */
export function GlitchPulse() {
  const { reduceMotion } = useMotionPreference();

  useEffect(() => {
    if (reduceMotion) return;
    let timer = 0;
    let cleanup = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          document.documentElement.classList.add('glitch-pulse-active');
          cleanup = window.setTimeout(
            () => document.documentElement.classList.remove('glitch-pulse-active'),
            220
          );
          schedule();
        },
        9000 + Math.random() * 7000
      );
    };
    schedule();
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(cleanup);
      document.documentElement.classList.remove('glitch-pulse-active');
    };
  }, [reduceMotion]);

  return null;
}
