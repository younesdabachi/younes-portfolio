import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '../utils/cn';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

/**
 * Bouton magnétique : légère attraction vers le curseur (désactivée sur tactile
 * et si prefers-reduced-motion). Rend un <a> si href est fourni, sinon <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  download,
  target,
  rel,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold',
        'transition-colors duration-200 will-change-transform',
        variant === 'primary'
          ? 'bg-primary-strong text-white shadow-[0_0_28px_-6px_rgba(59,130,246,0.55)] hover:bg-primary'
          : 'glass text-text hover:border-accent/50',
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel} aria-label={ariaLabel} data-cursor>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} data-cursor>
      {inner}
    </button>
  );
}
