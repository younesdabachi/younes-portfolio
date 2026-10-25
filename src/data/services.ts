export interface Service {
  id: string;
  icon: 'monitor' | 'server' | 'shield' | 'code' | 'megaphone' | 'folder';
  title: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const services: Service[] = [
  {
    id: 'support',
    icon: 'monitor',
    title: { fr: 'Support IT & maintenance', en: 'IT Support & maintenance' },
    description: {
      fr: 'Diagnostic et dépannage hardware/software, maintenance du parc informatique et assistance utilisateurs.',
      en: 'Hardware/software diagnosis and troubleshooting, IT asset maintenance and user assistance.',
    },
  },
  {
    id: 'admin-systems',
    icon: 'server',
    title: { fr: 'Administration réseaux & systèmes', en: 'Network & systems administration' },
    description: {
      fr: 'Administration, supervision et sécurisation des réseaux, sous Windows et Linux Debian.',
      en: 'Network administration, supervision and hardening, on Windows and Linux Debian.',
    },
  },
  {
    id: 'cyber',
    icon: 'shield',
    title: { fr: 'Cybersécurité & monitoring', en: 'Cybersecurity & monitoring' },
    description: {
      fr: 'Supervision SOC, analyse de logs et monitoring avec Wazuh, Suricata, Zabbix et Grafana.',
      en: 'SOC monitoring, log analysis and monitoring with Wazuh, Suricata, Zabbix and Grafana.',
    },
  },
  {
    id: 'wordpress',
    icon: 'code',
    title: { fr: 'Développement WordPress', en: 'WordPress development' },
    description: {
      fr: 'Sites vitrines de bout en bout : conception, mise en ligne, suivi et évolutions.',
      en: 'Showcase websites end to end: design, launch, maintenance and evolutions.',
    },
  },
  {
    id: 'marketing',
    icon: 'megaphone',
    title: { fr: 'Marketing digital & Meta Ads', en: 'Digital marketing & Meta Ads' },
    description: {
      fr: 'Campagnes de génération de leads, landing pages, tunnels de conversion et tracking.',
      en: 'Lead generation campaigns, landing pages, conversion funnels and tracking.',
    },
  },
  {
    id: 'admin',
    icon: 'folder',
    title: { fr: 'Gestion administrative & archivage', en: 'Administrative management & archiving' },
    description: {
      fr: 'Gestion documentaire, archivage numérique, suivi de dossiers et plateformes en ligne.',
      en: 'Document management, digital archiving, file tracking and online platforms.',
    },
  },
];
