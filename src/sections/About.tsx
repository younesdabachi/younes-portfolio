import { useState } from 'react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { Terminal } from '../components/Terminal';
import { useCountUp } from '../hooks/useCountUp';
import { site, stats } from '../data/site';

function Fact({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const { value: count, ref } = useCountUp(value);
  return (
    <GlassCard className="flex flex-col items-center p-5 text-center">
      <span ref={ref} className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="mt-2 text-xs leading-snug text-muted">{label}</span>
    </GlassCard>
  );
}

/** À propos : profil, photo glitchée (repli « YA »), faits réels, terminal interactif. */
export function About() {
  const { dict } = useI18n();
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.about.kicker} title={dict.about.title} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* Colonne gauche : photo + faits */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <div className="relative mx-auto w-64 sm:w-72">
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-neon/20 blur-xl"
                aria-hidden="true"
              />
              {photoError ? (
                <div className="glass gradient-border relative flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl">
                  <span className="font-display text-7xl font-bold text-gradient animate-gradient-x">
                    {dict.a11y.photoFallback}
                  </span>
                </div>
              ) : (
                <div className="glitch-photo glass gradient-border relative aspect-[4/5] w-full rounded-3xl">
                  <img
                    src={site.profilePhoto}
                    alt={dict.about.photoAlt}
                    onError={() => setPhotoError(true)}
                    width={576}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 h-full w-full rounded-3xl object-cover"
                  />
                  {/* Calques glitch (copies RGB décalées) + barre de balayage */}
                  <img src={site.profilePhoto} alt="" aria-hidden="true" className="glitch-copy glitch-copy-a" />
                  <img src={site.profilePhoto} alt="" aria-hidden="true" className="glitch-copy glitch-copy-b" />
                  <span className="glitch-scan" aria-hidden="true" />
                </div>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {dict.about.factsTitle}
              </h3>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.05}>
                <Fact value={stats.years} suffix="+" label={dict.about.factYears} />
              </Reveal>
              <Reveal delay={0.1}>
                <Fact value={stats.roles} label={dict.about.factRoles} />
              </Reveal>
              <Reveal delay={0.15}>
                <Fact value={stats.projects} label={dict.about.factProjects} />
              </Reveal>
              <Reveal delay={0.2}>
                <Fact value={stats.certifications} label={dict.about.factCerts} />
              </Reveal>
            </div>
          </div>
        </div>

        {/* Colonne droite : texte + terminal */}
        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-text/90">{dict.about.p1}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="leading-relaxed text-muted">{dict.about.p2}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
