import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionPreference } from '../hooks/MotionProvider';

interface RevealProps {
  children: ReactNode;
  /** Délai en secondes avant l'animation. */
  delay?: number;
  /** Décalage vertical initial en px. */
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * Révélation au scroll : opacité + translation (GPU-friendly), en cascade.
 * NB : motion.div est référencé statiquement (jamais recréé dans le rendu)
 * pour éviter tout remontage du sous-arbre — crucial pour les formulaires.
 */
export function Reveal({ children, delay = 0, y = 28, className, once = true }: RevealProps) {
  const { reduceMotion } = useMotionPreference();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
