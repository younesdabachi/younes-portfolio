import { Reveal } from './Reveal';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  id?: string;
}

/** En-tête de section : kicker monospace + titre display + hairline lumineuse. */
export function SectionHeading({ kicker, title, id }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14" id={id}>
      <Reveal>
        <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-accent">
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="hairline mt-6 w-40" aria-hidden="true" />
      </Reveal>
    </div>
  );
}
