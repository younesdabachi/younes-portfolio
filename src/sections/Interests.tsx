import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { LawGraph } from '../components/LawGraphs';
import { NvidiaGlyph } from '../components/NvidiaGlyphs';
import { cn } from '../utils/cn';

/** Identifiants des graphiques (alignés sur l'ordre de dict.interests.laws). */
const LAW_IDS = ['entropy', 'emc2', 'light', 'gravity', 'exponential', 'chaos'];
const LAW_SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-6'];

/** Identifiants des glyphes (alignés sur l'ordre de dict.interests.nvidia). */
const NVIDIA_IDS = [
  'dlss',
  'fg',
  'rt',
  'cuda',
  'tensor',
  'rtcore',
  'vram',
  'rbar',
  'vsr',
  'nis',
  'reflex',
  'nvenc',
];

/**
 * Centres d'intérêt : lois de l'univers (grille bento + graphiques animés)
 * et technologies NVIDIA expliquées.
 */
export function Interests() {
  const { dict } = useI18n();

  return (
    <section id="interests" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.interests.kicker} title={dict.interests.title} />

      <Reveal>
        <p className="-mt-6 mb-14 max-w-2xl text-muted md:-mt-10">{dict.interests.intro}</p>
      </Reveal>

      {/* Lois de l'univers */}
      <Reveal>
        <h3 className="font-display text-2xl font-semibold">
          <span className="text-accent">§</span> {dict.interests.universeTitle}
        </h3>
        <p className="mt-1 text-sm text-muted">{dict.interests.universeSubtitle}</p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {dict.interests.laws.map((law, i) => (
          <Reveal key={law.name} delay={i * 0.05} className={cn('h-full', LAW_SPANS[i])}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display text-lg font-semibold leading-snug">{law.name}</h4>
                <code className="shrink-0 rounded-lg border border-line bg-elevated/70 px-2.5 py-1 font-mono text-xs text-accent">
                  {law.formula}
                </code>
              </div>
              <div className="mt-4 min-h-28 flex-1 rounded-xl border border-line bg-bg/50 p-2">
                <LawGraph id={LAW_IDS[i]} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{law.desc}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Technologies NVIDIA */}
      <Reveal>
        <h3 className="mt-20 font-display text-2xl font-semibold">
          <span className="text-accent">▸</span> {dict.interests.nvidiaTitle}
        </h3>
        <p className="mt-1 text-sm text-muted">{dict.interests.nvidiaSubtitle}</p>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dict.interests.nvidia.map((tech, i) => (
          <li key={tech.name}>
            <Reveal delay={(i % 4) * 0.05} className="h-full">
              <GlassCard className="group flex h-full flex-col gap-3 p-5">
                <NvidiaGlyph id={NVIDIA_IDS[i]} />
                <h4 className="font-mono text-sm font-semibold uppercase tracking-wider text-text">
                  {tech.name}
                </h4>
                <p className="text-[13px] leading-relaxed text-muted">{tech.desc}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
