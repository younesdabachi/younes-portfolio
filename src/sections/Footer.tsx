import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { site } from '../data/site';
import { scrollToSection } from '../hooks/useLenis';

/** Pied de page : monogramme, coordonnées, mention légale, retour en haut. */
export function Footer() {
  const { dict, lang } = useI18n();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <span className="glass gradient-border flex h-11 w-11 items-center justify-center rounded-xl">
            <span className="font-display text-sm font-bold text-gradient">YA</span>
          </span>
          <div>
            <p className="font-display font-semibold">{site.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3 w-3" aria-hidden="true" /> {site.location[lang]}
            </p>
          </div>
        </div>

        <ul className="flex items-center gap-5 text-sm text-muted">
          <li>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 transition-colors hover:text-accent" data-cursor>
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{site.email}</span>
            </a>
          </li>
          <li>
            <a href={site.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-accent" data-cursor>
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{site.phoneDisplay}</span>
            </a>
          </li>
        </ul>

        <button
          onClick={() => scrollToSection('#hero')}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
          aria-label={dict.a11y.backToTop}
          data-cursor
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted sm:px-6 md:flex-row md:text-left">
          <p>
            © 2026 {site.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
