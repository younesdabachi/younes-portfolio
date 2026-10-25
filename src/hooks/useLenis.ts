import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

/** Instance Lenis partagée (scrollTo depuis la navbar, la palette, etc.). */
let lenisInstance: Lenis | null = null;

export function scrollToSection(selector: string): void {
  const target = document.querySelector(selector);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target as HTMLElement, { offset: -72, duration: 1.1 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function stopScroll(): void {
  lenisInstance?.stop();
  document.body.style.overflow = 'hidden';
}

export function startScroll(): void {
  lenisInstance?.start();
  document.body.style.overflow = '';
}

/**
 * Initialise le défilement fluide Lenis pour toute la page.
 * Désactivé si l'utilisateur préfère réduire les animations.
 */
export function useLenis(): void {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [prefersReducedMotion]);
}
