import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Languages, Menu, Moon, Sparkles, Sun, X, ZapOff } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { useTheme } from '../hooks/ThemeProvider';
import { useMotionPreference } from '../hooks/MotionProvider';
import { scrollToSection } from '../hooks/useLenis';
import { cn } from '../utils/cn';

interface NavbarProps {
  onOpenPalette: () => void;
}

const navIds = ['about', 'skills', 'experience', 'projects', 'services', 'education', 'lab', 'contact'] as const;

/** Barre de navigation fixe : verre au scroll, toggles thème/langue, palette, menu mobile. */
export function Navbar({ onOpenPalette }: NavbarProps) {
  const { dict, lang, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { reduceMotion, toggle: toggleMotion } = useMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const labels: Record<string, string> = {
    about: dict.nav.about,
    skills: dict.nav.skills,
    experience: dict.nav.experience,
    projects: dict.nav.projects,
    services: dict.nav.services,
    education: dict.nav.education,
    lab: dict.nav.lab,
    contact: dict.nav.contact,
  };

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(`#${id}`);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-line py-2' : 'bg-transparent py-4'
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
        aria-label={dict.nav.home}
      >
        {/* Monogramme + LEDs de signal */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('#hero')}
            className="glass gradient-border flex h-10 w-10 items-center justify-center rounded-xl"
            aria-label={dict.nav.home}
            data-cursor
          >
            <span className="font-display text-sm font-bold text-gradient">YA</span>
          </button>
          <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot [animation-delay:0.5s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot [animation-delay:1s]" />
          </span>
        </div>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navIds.map((id) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className="nav-glitch rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface/60 hover:text-text"
                data-cursor
              >
                {labels[id]}
              </button>
            </li>
          ))}
        </ul>

        {/* Contrôles */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="glass hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition-colors hover:text-text md:flex"
            aria-label={dict.a11y.openPalette}
            data-cursor
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono">Ctrl K</span>
          </button>

          <button
            onClick={toggleTheme}
            className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent"
            aria-label={dict.a11y.toggleTheme}
            data-cursor
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={toggleMotion}
            className={cn(
              'glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-accent',
              reduceMotion ? 'text-muted' : 'text-accent'
            )}
            aria-label={dict.a11y.toggleMotion}
            aria-pressed={!reduceMotion}
            data-cursor
          >
            {reduceMotion ? (
              <ZapOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={toggleLang}
            className="glass flex h-10 items-center justify-center rounded-full px-3 font-mono text-xs font-semibold uppercase transition-colors hover:text-accent"
            aria-label={dict.a11y.switchLang}
            data-cursor
          >
            <Languages className="mr-1.5 h-4 w-4" aria-hidden="true" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label={menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            aria-expanded={menuOpen}
            data-cursor
          >
            {menuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass border-t border-line lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
              {navIds.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm text-muted transition-colors hover:bg-surface/70 hover:text-text"
                  >
                    {labels[id]}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
