/** Utilitaires d'effet « décryptage » : texte brouillé qui se résout. */

export const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#$%&@01';

/**
 * Anime la résolution caractère par caractère de `target`.
 * Retourne une fonction d'annulation.
 */
export function scrambleTo(
  target: string,
  onTick: (current: string) => void,
  onDone?: () => void,
  totalFrames = 24
): () => void {
  let frame = 0;
  let raf = 0;
  const step = () => {
    frame += 1;
    const progress = frame / totalFrames;
    const resolved = Math.floor(progress * target.length);
    let out = '';
    for (let i = 0; i < target.length; i++) {
      if (i < resolved || target[i] === ' ') out += target[i];
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    onTick(out);
    if (frame < totalFrames) {
      raf = requestAnimationFrame(step);
    } else {
      onTick(target);
      onDone?.();
    }
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** Chaîne brouillée statique (état initial avant décryptage). */
export function scrambled(length: number): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return out;
}
