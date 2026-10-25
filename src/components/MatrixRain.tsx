import { useEffect, useRef } from 'react';
import { useMotionPreference } from '../hooks/MotionProvider';

const GLYPHS = '01<>[]{}/\\|=+*#$%&@ABCDEF0123456789';
const FONT_SIZE = 14;
const COLUMN_SPEED = [0.6, 1.0, 1.6];

/**
 * Pluie de caractères style terminal (canvas, décoratif).
 * Ne tourne que si : animations activées ∧ section visible ∧ onglet actif.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduceMotion } = useMotionPreference();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      columns = Math.ceil(parent.clientWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
      speeds = Array.from(
        { length: columns },
        () => COLUMN_SPEED[Math.floor(Math.random() * COLUMN_SPEED.length)]
      );
    };
    resize();

    let running = false;
    let frame = 0;
    let last = 0;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!running || document.hidden) return;
      // ~24 fps : largement suffisant pour l'effet, très économique
      if (now - last < 42) return;
      last = now;

      const { width, height } = canvas.getBoundingClientRect();
      ctx.fillStyle = 'rgba(1, 6, 4, 0.14)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE + FONT_SIZE / 2;
        const y = drops[i] * FONT_SIZE;
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        // tête lumineuse, corps atténué
        ctx.fillStyle = i % 11 === 0 ? 'rgba(34, 211, 238, 0.9)' : 'rgba(74, 222, 128, 0.72)';
        ctx.fillText(glyph, x, y);
        ctx.fillStyle = 'rgba(22, 163, 74, 0.28)';
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - FONT_SIZE);

        if (y > height && Math.random() > 0.985) drops[i] = Math.random() * -20;
        drops[i] += speeds[i];
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-40"
      aria-hidden="true"
    />
  );
}
