import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import frJson from './fr.json';
import enJson from './en.json';

/** Langues supportées. L'architecture est prête pour 'ar' (RTL) : ajouter ar.json puis étendre ce type. */
export type Lang = 'fr' | 'en';
export type Dict = typeof frJson;

const STORAGE_KEY = 'portfolio-lang';

/** Langues écrites de droite à gauche (architecture prête pour l'arabe). */
const RTL_LANGS: string[] = ['ar'];

const enDict: Dict = enJson;

const dictionaries: Record<Lang, Dict> = { fr: frJson, en: enDict };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  dict: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readInitialLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    /* localStorage indisponible : valeur par défaut */
  }
  return 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Prêt pour l'arabe : dès que 'ar' sera ajouté au type Lang, dir basculera en rtl.
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, toggleLang, dict: dictionaries[lang] }),
    [lang, setLang, toggleLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>');
  return ctx;
}
