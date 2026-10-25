import { useCallback, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Active l'effet spotlight suivant le curseur. */
  spotlight?: boolean;
  as?: 'div' | 'article' | 'li' | 'section';
}

/**
 * Carte de verre : backdrop-blur, bordure dégradée 1px, halo interne doux.
 * Le spotlight suit le curseur via les variables CSS --mx / --my.
 */
export function GlassCard({ children, className, spotlight = true, as = 'div' }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!spotlight) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    [spotlight]
  );

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'glass gradient-border rounded-2xl',
        spotlight && 'spotlight-card',
        className
      )}
      style={{ '--card-inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.04)' } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
