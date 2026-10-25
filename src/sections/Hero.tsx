import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, MapPin, Send } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { isWebGLAvailable } from '../hooks/useWebGL';
import { scrollToSection } from '../hooks/useLenis';
import { MagneticButton } from '../components/MagneticButton';
import { site } from '../data/site';

const NetworkScene = lazy(() => import('../components/three/NetworkScene'));

/** Hero plein écran : nom en dégradé animé, rôles rotatifs, CTA, topologie 3D. */
export function Hero() {
  const { dict } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const webglAvailable = useMemo(isWebGLAvailable, []);
  const [mount3D, setMount3D] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Monte la scène 3D après le premier rendu (LCP d'abord), jamais en mouvement réduit.
  useEffect(() => {
    if (!webglAvailable || prefersReducedMotion) return;
    const timer = window.setTimeout(() => setMount3D(true), 300);
    return () => window.clearTimeout(timer);
  }, [webglAvailable, prefersReducedMotion]);

  // Rotation des rôles
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % dict.hero.roles.length),
      2600
    );
    return () => window.clearInterval(id);
  }, [dict.hero.roles.length, prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label={dict.nav.home}
    >
      {/* Fond 3D / repli statique */}
      <div className="absolute inset-0 lg:left-[38%]" aria-hidden="true">
        {/* Repli statique (visible pendant le chargement, sur mobiles faibles ou sans WebGL) */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 62% 45%, rgba(59,130,246,0.16), transparent 70%), radial-gradient(ellipse 45% 45% at 75% 60%, rgba(34,211,238,0.12), transparent 70%)',
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(59,130,246,0.28)" strokeWidth="1" fill="none">
            {[
              [120, 180, 300, 110],
              [300, 110, 480, 200],
              [120, 180, 200, 380],
              [200, 380, 420, 420],
              [480, 200, 420, 420],
              [300, 110, 200, 380],
              [480, 200, 540, 360],
              [540, 360, 420, 420],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={i % 3 === 0 ? '4 6' : undefined} />
            ))}
          </g>
          {[
            [120, 180, '#3b82f6'],
            [300, 110, '#22d3ee'],
            [480, 200, '#3b82f6'],
            [200, 380, '#22d3ee'],
            [420, 420, '#3b82f6'],
            [540, 360, '#f5a524'],
          ].map(([cx, cy, color], i) => (
            <g key={i}>
              <circle cx={cx as number} cy={cy as number} r="16" fill={color as string} opacity="0.12" />
              <circle cx={cx as number} cy={cy as number} r="5" fill={color as string} opacity="0.85" />
            </g>
          ))}
        </svg>

        {mount3D && (
          <Suspense fallback={null}>
            <NetworkScene />
          </Suspense>
        )}
      </div>

      {/* Contenu */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:pt-24">
        <div className="max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.hero.location}
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 text-sm text-muted sm:text-base"
          >
            {dict.hero.greeting}
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {site.name.split(' ')[0]}{' '}
            <span className="text-gradient animate-gradient-x inline-block">
              {site.name.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-5 flex h-9 items-center text-xl font-medium text-text/90 sm:text-2xl"
          >
            <span className="mr-2 text-muted" aria-hidden="true">
              ‹›
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-accent"
              >
                {dict.hero.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="ml-1 inline-block h-6 w-[2px] animate-blink bg-accent" aria-hidden="true" />
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl leading-relaxed text-muted"
          >
            {dict.hero.tagline}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href={site.cvPath} download variant="primary">
              <Download className="h-4 w-4" aria-hidden="true" />
              {dict.hero.downloadCv}
            </MagneticButton>
            <MagneticButton onClick={() => scrollToSection('#contact')} variant="ghost">
              <Send className="h-4 w-4" aria-hidden="true" />
              {dict.hero.contact}
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.button
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-accent"
        aria-label={dict.hero.scroll}
        data-cursor
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{dict.hero.scroll}</span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
