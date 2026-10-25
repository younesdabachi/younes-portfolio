import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18n';
import { useMotionPreference } from '../hooks/MotionProvider';
import { MatrixRain } from './MatrixRain';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Œuf de Pâques : code Konami (↑↑↓↓←→←→BA) → MODE OVERDRIVE 12 s.
 * Pluie de caractères plein écran + notification. Ignoré si animations off.
 */
export function Overdrive() {
  const { dict } = useI18n();
  const { reduceMotion } = useMotionPreference();
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const onKey = (event: KeyboardEvent) => {
      const expected = KONAMI[progress.current];
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          setActive(true);
          setToast(true);
          document.body.classList.add('overdrive');
          window.setTimeout(() => setToast(false), 2600);
          window.setTimeout(() => {
            setActive(false);
            document.body.classList.remove('overdrive');
          }, 12000);
        }
      } else {
        progress.current = event.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('overdrive');
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[85]" aria-hidden="true">
          <MatrixRain />
        </div>
      )}
      {toast && (
        <div
          className="overdrive-toast pointer-events-none fixed left-1/2 top-20 z-[120] -translate-x-1/2"
          role="status"
        >
          <span className="hack-panel hud-corners relative rounded-lg px-6 py-3 font-mono text-sm font-bold tracking-[0.3em] text-neon shadow-[0_0_50px_-8px_rgba(232,121,249,0.7)]">
            {dict.lab.overdrive}
          </span>
        </div>
      )}
    </>
  );
}
