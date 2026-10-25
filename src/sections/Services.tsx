import {
  Code2,
  FolderOpen,
  Megaphone,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { services } from '../data/services';

const icons: Record<string, LucideIcon> = {
  monitor: MonitorSmartphone,
  server: Server,
  shield: ShieldCheck,
  code: Code2,
  megaphone: Megaphone,
  folder: FolderOpen,
};

/** Services : six cartes en grille. */
export function Services() {
  const { dict, lang } = useI18n();

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.services.kicker} title={dict.services.title} />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Server;
          return (
            <li key={service.id} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <GlassCard className="group h-full p-6">
                  <span className="glass flex h-12 w-12 items-center justify-center rounded-xl text-accent transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{service.title[lang]}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {service.description[lang]}
                  </p>
                </GlassCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
