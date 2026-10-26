import { motion, useScroll, useSpring } from 'framer-motion';

/** Barre de progression de lecture (fine, cyan → néon, en haut de page). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[110] h-[2.5px] origin-left bg-gradient-to-r from-primary via-accent to-neon"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
