import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Préférence d'animation :
 * - 'auto' (défaut) : suit le réglage système prefers-reduced-motion ;
 * - 'on' / 'off'    : choix explicite de l'utilisateur (persisté).
 * La classe 'force-motion' sur <html> restaure les animations CSS
 * lorsqu'un utilisateur les active malgré un réglage système réduit.
 */

export type MotionChoice = 'auto' | 'on' | 'off';

const STORAGE_KEY = 'portfolio-motion';

interface MotionContextValue {
  /** true si le mouvement doit être réduit (choix utilisateur ⊕ système). */
  reduceMotion: boolean;
  choice: MotionChoice;
  setChoice: (choice: MotionChoice) => void;
  toggle: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

function readInitialChoice(): MotionChoice {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'auto' || stored === 'on' || stored === 'off') return stored;
  } catch {
    /* localStorage indisponible */
  }
  return 'auto';
}

function readSystemReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<MotionChoice>(readInitialChoice);
  const [systemReduced, setSystemReduced] = useState<boolean>(readSystemReduced);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setSystemReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const reduceMotion = choice === 'on' ? false : choice === 'off' ? true : systemReduced;

  const setChoice = useCallback((next: MotionChoice) => {
    setChoiceState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setChoice(reduceMotion ? 'on' : 'off');
  }, [reduceMotion, setChoice]);

  // force-motion : restaure les animations CSS bloquées par la règle
  // @media (prefers-reduced-motion: reduce) lorsque l'utilisateur les active.
  // motion-ok / motion-reduced : gate CSS pour les effets du Lab (glitch, scanlines).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('force-motion', choice === 'on' && systemReduced);
    root.classList.toggle('motion-ok', !reduceMotion);
    root.classList.toggle('motion-reduced', reduceMotion);
  }, [choice, systemReduced, reduceMotion]);

  const value = useMemo<MotionContextValue>(
    () => ({ reduceMotion, choice, setChoice, toggle }),
    [reduceMotion, choice, setChoice, toggle]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/**
 * Remplace useReducedMotion de framer-motion dans nos composants :
 * combine le réglage système ET le choix explicite de l'utilisateur.
 */
export function useMotionPreference(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotionPreference doit être utilisé dans <MotionProvider>');
  return ctx;
}
