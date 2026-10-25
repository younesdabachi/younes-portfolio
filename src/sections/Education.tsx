import { GraduationCap, Award } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { certificationList, educationList } from '../data/education';

/** Formation & certifications. */
export function Education() {
  const { dict, lang } = useI18n();

  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.education.kicker} title={dict.education.title} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Diplômes */}
        <Reveal>
          <GlassCard className="h-full p-6 md:p-8">
            <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              {dict.education.diplomas}
            </h3>
            <ol className="mt-6 space-y-6">
              {educationList.map((edu) => (
                <li key={edu.id} className="relative border-l border-line pl-5">
                  <span
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_1px_rgba(59,130,246,0.6)]"
                    aria-hidden="true"
                  />
                  <h4 className="font-display font-semibold leading-snug">{edu.title[lang]}</h4>
                  <p className="mt-1 text-sm text-muted">{edu.org}</p>
                  <p className="mt-1 font-mono text-xs text-muted/80">{edu.period}</p>
                </li>
              ))}
            </ol>
          </GlassCard>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.1}>
          <GlassCard className="flex h-full flex-col p-6 md:p-8">
            <h3 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-gold">
              <Award className="h-4 w-4" aria-hidden="true" />
              {dict.education.certifications}
            </h3>
            <ul className="mt-6 flex flex-1 flex-col justify-center gap-4">
              {certificationList.map((cert) => (
                <li
                  key={cert}
                  className="flex items-center gap-4 rounded-xl border border-line bg-elevated/50 p-4"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 font-display text-xs font-bold text-gold"
                    aria-hidden="true"
                  >
                    MOS
                  </span>
                  <div>
                    <p className="font-medium leading-snug">{cert}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{dict.education.certBy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
