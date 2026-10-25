import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useI18n } from './i18n/I18n';
import { useLenis } from './hooks/useLenis';
import { IntroLoader } from './components/IntroLoader';
import { AuroraBackground } from './components/AuroraBackground';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { SectionProgress } from './components/SectionProgress';
import { CommandPalette } from './components/CommandPalette';
import { HudStatusBar } from './components/HudStatusBar';
import { Ticker } from './components/Ticker';
import { Overdrive } from './components/Overdrive';
import { GlitchPulse } from './components/GlitchPulse';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Education } from './sections/Education';
import { Languages } from './sections/Languages';
import { Lab } from './sections/Lab';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export default function App() {
  const { dict } = useI18n();
  const [introDone, setIntroDone] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useLenis();

  const finishIntro = useCallback(() => setIntroDone(true), []);

  // Palette : Ctrl/Cmd + K
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary-strong focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#01130b]"
      >
        {dict.a11y.skipToContent}
      </a>

      <AnimatePresence>
        {!introDone && <IntroLoader key="intro" onDone={finishIntro} />}
      </AnimatePresence>

      <AuroraBackground />
      <Cursor />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <SectionProgress />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <HudStatusBar />
      <Overdrive />
      <GlitchPulse />

      <main>
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Education />
        <Languages />
        <Lab />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
