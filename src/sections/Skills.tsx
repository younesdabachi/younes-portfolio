import { FolderOpen, Globe, Network, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { useMotionPreference } from '../hooks/MotionProvider';
import { scrambleTo } from '../utils/scramble';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { skillGroups } from '../data/skills';
import { cn } from '../utils/cn';

const icons: Record<string, LucideIcon> = {
  network: Network,
  shield: ShieldCheck,
  wrench: Wrench,
  globe: Globe,
  folder: FolderOpen,
};

/** Disposition bento : première rangée 2 grandes cartes, seconde 3 petites. */
const spans = [
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
];

/** Compétences : cartes bento, chips uniquement — aucun pourcentage inventé. */
export function Skills() {
  const { dict, lang } = useI18n();
  const { reduceMotion } = useMotionPreference();

  // Effet « décryptage » bref au survol d'une chip (écriture directe DOM, sans re-render).
  const handleChipHover = (event: React.MouseEvent<HTMLLIElement>, original: string) => {
    if (reduceMotion) return;
    const el = event.currentTarget;
    if (el.dataset.busy === '1') return;
    el.dataset.busy = '1';
    scrambleTo(
      original,
      (text) => {
        el.textContent = text;
      },
      () => {
        delete el.dataset.busy;
      },
      12
    );
  };

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.skills.kicker} title={dict.skills.title} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon] ?? Wrench;
          return (
            <Reveal key={group.id} delay={i * 0.06} className={cn('h-full', spans[i])}>
              <GlassCard className="group h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.title[lang]}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.chips[lang].map((chip) => (
                    <li
                      key={chip}
                      onMouseEnter={(e) => handleChipHover(e, chip)}
                      className="rounded-full border border-line bg-elevated/70 px-3 py-1.5 font-mono text-xs text-text/85 transition-colors hover:border-accent/50 hover:text-text"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
