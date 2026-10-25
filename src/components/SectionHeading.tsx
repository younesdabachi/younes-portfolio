import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPreference } from '../hooks/MotionProvider';
import { scrambleTo } from '../utils/scramble';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  id?: string;
}

/** En-tête de section : kicker terminal « > », titre décrypté au scroll, hairline. */
export function SectionHeading({ kicker, title, id }: SectionHeadingProps) {
  const { reduceMotion } = useMotionPreference();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(title);

  // Décryptage du titre à l'entrée dans le viewport (une fois).
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(title);
      return;
    }
    return scrambleTo(title, setDisplay);
  }, [inView, title, reduceMotion]);

  return (
    <div className="mb-10 md:mb-14" id={id}>
      <Reveal>
        <p className="kicker-term font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-accent">
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 ref={titleRef} className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          {display}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="hairline mt-6 w-40" aria-hidden="true" />
      </Reveal>
    </div>
  );
}
