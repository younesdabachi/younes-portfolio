import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { ProjectVisual } from '../components/ProjectVisual';
import { ProjectModal } from '../components/ProjectModal';
import { projects, type Project, type ProjectCategory } from '../data/projects';
import { cn } from '../utils/cn';

const filters: Array<ProjectCategory | 'all'> = ['all', 'web', 'cyber', 'networks', 'marketing'];

/** Projets filtrables ; chaque carte ouvre une modal animée. */
export function Projects() {
  const { dict } = useI18n();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  /** Numéro de dossier style cyberpunk : PRJ-01… stable quel que soit le filtre. */
  const prjId = (project: Project) =>
    `PRJ-${String(projects.findIndex((p) => p.id === project.id) + 1).padStart(2, '0')}`;

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.projects.kicker} title={dict.projects.title} />

      {/* Filtres */}
      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={dict.projects.title}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all',
                filter === f
                  ? 'bg-primary-strong text-[#01130b] shadow-[0_0_20px_-6px_rgba(74,222,128,0.6)]'
                  : 'glass text-muted hover:text-text'
              )}
              data-cursor
            >
              {dict.projects.filters[f]}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grille */}
      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <GlassCard as="div" className="group h-full">
                <button
                  onClick={() => setSelected(project)}
                  className="flex h-full w-full flex-col p-5 text-left"
                  aria-label={`${project.title} — ${dict.projects.view}`}
                  data-cursor
                >
                  <ProjectVisual
                    kind={project.visual}
                    title={project.title}
                    className="aspect-[400/240] w-full"
                  />
                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        {dict.projects.filters[project.category]}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.2em] text-muted/70">
                        {prjId(project)}
                      </p>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {project.client} · {project.period}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {dict.projects.view}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </GlassCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
