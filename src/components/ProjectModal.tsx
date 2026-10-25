import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, CalendarDays, Tag, Wrench, X } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { startScroll, stopScroll } from '../hooks/useLenis';
import { ProjectVisual } from './ProjectVisual';
import { SocDashboard } from './SocDashboard';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/** Modal projet animée : focus piégé, Échap pour fermer, scroll verrouillé. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { dict, lang } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      // Piège de focus dans la modal
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleKeyDown);
    stopScroll();
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      startScroll();
      window.clearTimeout(timer);
      previous?.focus();
    };
  }, [project, handleKeyDown]);

  const categoryLabel: Record<Project['category'], string> = {
    web: dict.projects.filters.web,
    cyber: dict.projects.filters.cyber,
    networks: dict.projects.filters.networks,
    marketing: dict.projects.filters.marketing,
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fond */}
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
          >
            {/* Barre d'outils */}
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {categoryLabel[project.category]}
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-accent"
                aria-label={dict.a11y.closeProject}
                data-cursor
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-6 sm:px-8">
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {project.title}
              </h3>

              <ProjectVisual
                kind={project.visual}
                title={project.title}
                className="mt-5 aspect-[400/240]"
              />

              {project.id === 'soc-mogador' && (
                <div className="mt-6">
                  <SocDashboard />
                </div>
              )}

              <p className="mt-6 leading-relaxed text-muted">{project.description[lang]}</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-line bg-surface/50 p-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <Building2 className="h-3 w-3" aria-hidden="true" /> {dict.projects.client}
                  </dt>
                  <dd className="mt-1.5 text-sm">{project.client}</dd>
                </div>
                <div className="rounded-xl border border-line bg-surface/50 p-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" /> {dict.projects.period}
                  </dt>
                  <dd className="mt-1.5 text-sm">{project.period}</dd>
                </div>
                <div className="rounded-xl border border-line bg-surface/50 p-3">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <Tag className="h-3 w-3" aria-hidden="true" /> {dict.projects.category}
                  </dt>
                  <dd className="mt-1.5 text-sm">{categoryLabel[project.category]}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h4 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <Wrench className="h-3 w-3" aria-hidden="true" /> {dict.projects.tools}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line bg-elevated/70 px-3 py-1 font-mono text-xs text-text/90"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
