import { useI18n } from '../i18n/I18n';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../hooks/useLenis';
import { cn } from '../utils/cn';

const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'services', 'education', 'languages', 'interests', 'lab', 'contact'];

/** Indicateur de progression : points latéraux, actif selon la section visible. */
export function SectionProgress() {
  const { dict } = useI18n();
  const active = useActiveSection(sectionIds);

  const labels: Record<string, string> = {
    hero: dict.nav.home,
    about: dict.nav.about,
    skills: dict.nav.skills,
    experience: dict.nav.experience,
    projects: dict.nav.projects,
    services: dict.nav.services,
    education: dict.nav.education,
    languages: dict.nav.languages,
    interests: dict.nav.interests,
    lab: dict.nav.lab,
    contact: dict.nav.contact,
  };

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      aria-label={dict.a11y.sectionProgress}
    >
      {sectionIds.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(`#${id}`)}
          className="group flex items-center gap-2"
          aria-label={`${dict.a11y.goToSection} : ${labels[id]}`}
          data-cursor
        >
          <span
            className={cn(
              'rounded-full bg-text/80 px-2 py-0.5 font-mono text-[10px] text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
              active === id && 'opacity-100'
            )}
          >
            {labels[id]}
          </span>
          <span
            className={cn(
              'block rounded-full transition-all duration-300',
              active === id
                ? 'h-2.5 w-2.5 bg-accent shadow-[0_0_10px_2px_rgba(34,211,238,0.55)]'
                : 'h-1.5 w-1.5 bg-muted/40 group-hover:bg-muted'
            )}
          />
        </button>
      ))}
    </nav>
  );
}
