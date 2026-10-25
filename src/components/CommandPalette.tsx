import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  FileText,
  Languages,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { useTheme } from '../hooks/ThemeProvider';
import { useMotionPreference } from '../hooks/MotionProvider';
import { triggerOverdrive } from './Overdrive';
import { scrollToSection, startScroll, stopScroll } from '../hooks/useLenis';
import { site } from '../data/site';
import { cn } from '../utils/cn';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Action {
  id: string;
  label: string;
  group: 'nav' | 'action';
  icon: React.ReactNode;
  run: () => void;
}

/** Palette de commandes (Ctrl/Cmd+K) : navigation, thème, langue, CV, e-mail. */
export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { dict, lang, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { reduceMotion, toggle: toggleMotion } = useMotionPreference();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    onClose();
    setQuery('');
    setIndex(0);
  }, [onClose]);

  const actions = useMemo<Action[]>(() => {
    const navItems: Action[] = (
      [
        ['hero', dict.nav.home],
        ['about', dict.nav.about],
        ['skills', dict.nav.skills],
        ['experience', dict.nav.experience],
        ['projects', dict.nav.projects],
        ['services', dict.nav.services],
        ['education', dict.nav.education],
        ['languages', dict.nav.languages],
        ['lab', dict.nav.lab],
        ['contact', dict.nav.contact],
      ] as const
    ).map(([id, label]) => ({
      id: `nav-${id}`,
      label,
      group: 'nav' as const,
      icon: <ArrowRight className="h-4 w-4" aria-hidden="true" />,
      run: () => {
        scrollToSection(`#${id}`);
      },
    }));

    const actionItems: Action[] = [
      {
        id: 'theme',
        label: theme === 'dark' ? dict.palette.themeLight : dict.palette.themeDark,
        group: 'action',
        icon:
          theme === 'dark' ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          ),
        run: toggleTheme,
      },
      {
        id: 'motion',
        label: reduceMotion ? dict.palette.motionOn : dict.palette.motionOff,
        group: 'action',
        icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
        run: toggleMotion,
      },
      ...(!reduceMotion
        ? [
            {
              id: 'overdrive',
              label: dict.palette.overdrive,
              group: 'action' as const,
              icon: <Zap className="h-4 w-4" aria-hidden="true" />,
              run: triggerOverdrive,
            },
          ]
        : []),
      {
        id: 'lang',
        label: dict.palette.lang,
        group: 'action',
        icon: <Languages className="h-4 w-4" aria-hidden="true" />,
        run: toggleLang,
      },
      {
        id: 'cv',
        label: dict.palette.downloadCv,
        group: 'action',
        icon: <Download className="h-4 w-4" aria-hidden="true" />,
        run: () => {
          const a = document.createElement('a');
          a.href = site.cvPath;
          a.download = 'CV_Younes_Ait_Dabachi.pdf';
          a.rel = 'noopener';
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: 'email',
        label: dict.palette.copyEmail,
        group: 'action',
        icon: <Mail className="h-4 w-4" aria-hidden="true" />,
        run: () => {
          void navigator.clipboard?.writeText(site.email);
        },
      },
    ];

    return [...navItems, ...actionItems];
  }, [dict, theme, toggleTheme, toggleLang, reduceMotion, toggleMotion]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  // Réinitialiser l'index quand les résultats changent
  useEffect(() => setIndex(0), [query, open]);

  useEffect(() => {
    if (!open) return;
    stopScroll();
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const previous = document.activeElement as HTMLElement | null;
    return () => {
      startScroll();
      window.clearTimeout(timer);
      previous?.focus();
    };
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const action = filtered[index];
      if (action) {
        close();
        window.setTimeout(action.run, 80);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  };

  // Faire suivre la liste
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('li');
    items?.[index]?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  // Accessibilité : annonce du changement de langue
  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Younes Ait Dabachi — Technicien Systèmes & Réseaux | Support IT'
        : 'Younes Ait Dabachi — Systems & Networks Technician | IT Support';
  }, [lang]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onKeyDown={handleKeyDown}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.palette.title}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-2xl"
          >
            {/* Champ de recherche */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                placeholder={dict.palette.placeholder}
                aria-label={dict.palette.title}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[index] ? `palette-opt-${filtered[index].id}` : undefined}
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
            </div>

            {/* Résultats */}
            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label={dict.palette.title}
              className="max-h-[46vh] overflow-y-auto py-2"
            >
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-muted">{dict.palette.empty}</li>
              )}
              {filtered.map((action, i) => {
                const showGroup =
                  i === 0 || filtered[i - 1].group !== action.group;
                return (
                  <li key={action.id}>
                    {showGroup && (
                      <p className="px-4 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                        {action.group === 'nav' ? dict.palette.navigation : dict.palette.actions}
                      </p>
                    )}
                    <button
                      id={`palette-opt-${action.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => {
                        close();
                        window.setTimeout(action.run, 80);
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                        i === index ? 'bg-primary/15 text-text' : 'text-muted hover:bg-surface/60'
                      )}
                      data-cursor
                    >
                      <span className={i === index ? 'text-accent' : 'text-muted'}>{action.icon}</span>
                      {action.label}
                      {i === index && (
                        <kbd className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
                          ↵
                        </kbd>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Pied */}
            <div className="border-t border-line px-4 py-2">
              <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <FileText className="h-3 w-3" aria-hidden="true" />
                {dict.palette.hint}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
