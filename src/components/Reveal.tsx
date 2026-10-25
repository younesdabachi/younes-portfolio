import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Délai en secondes avant l'animation. */
  delay?: number;
  /** Décalage vertical initial en px. */
  y?: number;
  as?: ElementType;
  className?: string;
  once?: boolean;
}

/** Révélation au scroll : opacité + translation (GPU-friendly), animée en cascade. */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, once = true }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Comp = motion.create(as as ElementType);

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Comp
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
