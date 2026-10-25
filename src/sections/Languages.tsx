import { Languages as LanguagesIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { languageList } from '../data/education';
import { cn } from '../utils/cn';

/** Langues : trois cartes, niveau représenté par des points (sans prétention chiffrée). */
export function Languages() {
  const { dict, lang } = useI18n();

  return (
    <section id="languages" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.langs.kicker} title={dict.langs.title} />

      <ul className="grid gap-5 sm:grid-cols-3">
        {languageList.map((entry, i) => (
          <li key={entry.id}>
            <Reveal delay={i * 0.07} className="h-full">
              <GlassCard className="flex h-full flex-col items-center gap-3 p-8 text-center">
                <LanguagesIcon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold">{entry.name[lang]}</h3>
                <p className="text-sm text-muted">{entry.level[lang]}</p>
                <div
                  className="flex gap-2"
                  role="img"
                  aria-label={`${entry.name[lang]} : ${entry.level[lang]}`}
                >
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        dot <= entry.dotCount
                          ? 'bg-accent shadow-[0_0_8px_1px_rgba(34,211,238,0.5)]'
                          : 'bg-muted/25'
                      )}
                    />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
