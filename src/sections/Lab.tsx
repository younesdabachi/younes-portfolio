import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useI18n } from '../i18n/I18n';
import { useMotionPreference } from '../hooks/MotionProvider';
import { MatrixRain } from '../components/MatrixRain';
import { ThreatFeed } from '../components/ThreatFeed';
import { Reveal } from '../components/Reveal';
import { triggerOverdrive } from '../components/Overdrive';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#$%&@01';

function scrambleTo(target: string, onTick: (s: string) => void, onDone: () => void): () => void {
  let frame = 0;
  const totalFrames = 26;
  const step = () => {
    frame += 1;
    const progress = frame / totalFrames;
    const resolved = Math.floor(progress * target.length);
    let out = '';
    for (let i = 0; i < target.length; i++) {
      if (i < resolved || target[i] === ' ') out += target[i];
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    onTick(out);
    if (frame < totalFrames) {
      raf = requestAnimationFrame(step);
    } else {
      onTick(target);
      onDone();
    }
  };
  let raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/**
 * Lab « MODE SOC » — interlude style film de hackers.
 * Tout est décoratif et étiqueté comme tel ; le protocole de décryptage
 * révèle de vraies valeurs du profil (rigueur, autonomie…).
 */
export function Lab() {
  const { dict, lang } = useI18n();
  const { reduceMotion } = useMotionPreference();
  const traits = dict.lab.traits;
  const [traitIndex, setTraitIndex] = useState(-1);
  const [display, setDisplay] = useState('' as string);
  const [accessFlash, setAccessFlash] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-35%' });
  const cancelRef = useRef<(() => void) | null>(null);

  // Flash « ACCÈS AUTORISÉ » à la première entrée dans la section
  useEffect(() => {
    if (!inView || reduceMotion) return;
    setAccessFlash(true);
    const timer = window.setTimeout(() => setAccessFlash(false), 1800);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  // Premier mot affiché dès l'entrée (décryptage automatique)
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setTraitIndex(0);
      setDisplay(traits[0]);
      return;
    }
    cancelRef.current?.();
    setTraitIndex(0);
    cancelRef.current = scrambleTo(traits[0], setDisplay, () => undefined);
    return () => cancelRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, lang]);

  const decryptNext = useCallback(() => {
    const next = (traitIndex + 1) % traits.length;
    setTraitIndex(next);
    cancelRef.current?.();
    if (reduceMotion) {
      setDisplay(traits[next]);
      return;
    }
    cancelRef.current = scrambleTo(traits[next], setDisplay, () => undefined);
  }, [traitIndex, traits, reduceMotion]);

  useEffect(() => () => cancelRef.current?.(), []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-hack-line bg-[#010604]"
      aria-label={dict.lab.title}
    >
      {/* Pluie de caractères + vignette CRT */}
      <MatrixRain />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Flash d'accès */}
      {accessFlash && (
        <div
          className="access-granted pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="hack-panel max-w-[90vw] break-words rounded-xl px-5 py-3 text-center font-mono text-base font-semibold tracking-[0.18em] text-hack shadow-[0_0_60px_-10px_rgba(74,222,128,0.6)] sm:px-8 sm:text-2xl sm:tracking-[0.3em] md:text-3xl">
            {dict.lab.accessGranted}
          </span>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-hack-dim md:text-sm">
            {dict.lab.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="glitch mt-3 font-display text-3xl font-bold tracking-tight text-hack md:text-5xl"
            data-text={dict.lab.title}
          >
            {dict.lab.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-hack-dim/90">
            {dict.lab.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Flux d'alertes simulé */}
          <Reveal delay={0.1}>
            <ThreatFeed />
          </Reveal>

          {/* Protocole de décryptage */}
          <Reveal delay={0.18}>
            <div className="hack-panel scanlines relative flex h-full flex-col rounded-2xl p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-hack">
                {dict.lab.decryptTitle}
              </p>

              <div className="mt-6 flex flex-1 items-center justify-center rounded-xl border border-hack-line/60 bg-black/40 px-3 py-8 sm:px-4 sm:py-10">
                <p
                  className="hack-caret min-h-[2.6em] max-w-full break-words text-center font-mono text-base font-semibold tracking-wider text-hack sm:min-h-[1.4em] sm:text-xl md:text-2xl"
                  aria-live="polite"
                  aria-label={dict.lab.a11yReveal}
                >
                  {display || dict.lab.encrypted}
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3">
                <button
                  onClick={decryptNext}
                  className="rounded-full border border-hack px-4 py-2.5 text-center font-mono text-sm font-semibold uppercase leading-snug tracking-[0.2em] text-hack transition-all hover:bg-hack/10 hover:shadow-[0_0_24px_-6px_rgba(74,222,128,0.6)] focus-visible:shadow-[0_0_24px_-6px_rgba(74,222,128,0.6)] sm:px-6"
                  data-cursor
                >
                  {dict.lab.decryptButton}
                </button>
                <p className="text-center text-xs text-hack-dim/80">{dict.lab.decryptHint}</p>

                {!reduceMotion && (
                  <button
                    onClick={triggerOverdrive}
                    className="mt-3 rounded-full border border-neon/60 px-4 py-2.5 text-center font-mono text-sm font-semibold uppercase leading-snug tracking-[0.2em] text-neon transition-all hover:bg-neon/10 hover:shadow-[0_0_24px_-6px_rgba(232,121,249,0.7)] sm:px-6"
                    data-cursor
                  >
                    ⚡ {dict.lab.overdriveButton}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
