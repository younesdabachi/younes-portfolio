import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useI18n } from '../i18n/I18n';

export const COPIED_EVENT = 'portfolio:copied';

/** Diffuse un événement de confirmation de copie (palette, contact…). */
export function notifyCopied(): void {
  window.dispatchEvent(new CustomEvent(COPIED_EVENT));
}

/** Toast « Copié » affiché après une copie dans le presse-papiers. */
export function CopyToast() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = 0;
    const onCopied = () => {
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 1900);
    };
    window.addEventListener(COPIED_EVENT, onCopied);
    return () => {
      window.removeEventListener(COPIED_EVENT, onCopied);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="fixed bottom-16 left-1/2 z-[170] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <span className="glass gradient-border flex items-center gap-2 rounded-full px-4 py-2 text-sm text-accent shadow-[0_0_24px_-8px_rgba(34,211,238,0.6)]">
            <Check className="h-4 w-4" aria-hidden="true" />
            {dict.palette.copied}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
