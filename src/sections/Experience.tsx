import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { experiences } from '../data/experience';
import { cn } from '../utils/cn';

/**
 * Timeline d'expérience : colonne de dates collante (sticky) sur desktop,
 * ligne verticale lumineuse, cartes révélées au scroll.
 */
export function Experience() {
  const { dict, lang } = useI18n();

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.experience.kicker} title={dict.experience.title} />

      <ol className="relative">
        {/* Ligne verticale */}
        <div
          className="absolute bottom-4 left-[7px] top-2 w-px bg-gradient-to-b from-accent/60 via-primary/40 to-transparent md:left-[199px]"
          aria-hidden="true"
        />

        {experiences.map((exp, i) => (
          <li key={exp.id} className="relative grid gap-4 pb-14 md:grid-cols-[180px_1fr] md:gap-10">
            {/* Date collante */}
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal delay={i * 0.04}>
                <div className="flex items-center gap-3 md:block">
                  <span
                    className="relative z-10 block h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs leading-relaxed text-muted md:mt-4">
                    {exp.start} — {exp.end ?? dict.experience.present}
                  </p>
                  <p
                    className={cn(
                      'font-display text-sm font-semibold text-text md:mt-1',
                      !exp.end && 'text-accent'
                    )}
                  >
                    {exp.company}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Carte */}
            <Reveal delay={0.08 + i * 0.04}>
              <article className="glass gradient-border spotlight-card group relative rounded-2xl p-6 md:p-7">
                <h3 className="font-display text-lg font-semibold leading-snug md:text-xl">
                  {exp.role[lang]}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {exp.company} · {exp.companyDesc[lang]} · {exp.location}
                </p>

                <h4 className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/80">
                  {dict.experience.missions}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {exp.missions[lang].map((mission, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-text/80">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 transition-colors group-hover:bg-accent"
                        aria-hidden="true"
                      />
                      {mission}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={dict.projects.tools}>
                  {exp.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-elevated/60 px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
