import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Curseur glow personnalisé : point + halo qui s'agrandit sur les éléments
 * interactifs. Désactivé sur les écrans tactiles et si mouvement réduit
 * (géré en CSS via .cursor-glow + pointer: coarse).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]'))
      );
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="cursor-glow" aria-hidden="true">
      {/* halo */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: hovering ? 0.9 : 0.45,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* point */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(34,211,238,0.8)]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
}
