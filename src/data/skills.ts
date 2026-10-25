export interface SkillGroup {
  id: string;
  icon: 'network' | 'shield' | 'wrench' | 'globe' | 'folder';
  title: { fr: string; en: string };
  chips: { fr: string[]; en: string[] };
}

/** Compétences groupées — libellés bilingues, sans pourcentages inventés. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'network',
    icon: 'network',
    title: { fr: 'Réseaux et systèmes', en: 'Networking & systems' },
    chips: {
      fr: [
        'Administration réseau',
        'Support technique',
        'Windows',
        'Linux Debian',
        'Maintenance du parc informatique',
        'Diagnostic & dépannage hardware/software',
        'Sauvegardes (Iperius Backup)',
      ],
      en: [
        'Network administration',
        'Technical support',
        'Windows',
        'Linux Debian',
        'IT asset maintenance',
        'Hardware/software diagnosis & troubleshooting',
        'Backups (Iperius Backup)',
      ],
    },
  },
  {
    id: 'security',
    icon: 'shield',
    title: { fr: 'Cybersécurité et monitoring', en: 'Cybersecurity & monitoring' },
    chips: {
      fr: [
        'SOC',
        'Analyse de logs',
        'Wazuh',
        'Suricata',
        'Cowrie',
        'Zabbix',
        'Grafana',
        'Sécurisation des réseaux',
      ],
      en: [
        'SOC',
        'Log analysis',
        'Wazuh',
        'Suricata',
        'Cowrie',
        'Zabbix',
        'Grafana',
        'Network hardening',
      ],
    },
  },
  {
    id: 'tools',
    icon: 'wrench',
    title: { fr: 'Outils et ERP', en: 'Tools & ERP' },
    chips: {
      fr: [
        'Microsoft Word',
        'Microsoft Excel',
        'Google Sheets',
        'PMS Pluriel',
        'ERP Pluriel',
        'ERP Odoo',
        'AutoCAD',
      ],
      en: [
        'Microsoft Word',
        'Microsoft Excel',
        'Google Sheets',
        'PMS Pluriel',
        'ERP Pluriel',
        'ERP Odoo',
        'AutoCAD',
      ],
    },
  },
  {
    id: 'web',
    icon: 'globe',
    title: { fr: 'Web et marketing digital', en: 'Web & digital marketing' },
    chips: {
      fr: [
        'WordPress',
        'Meta Ads (Facebook, Instagram)',
        'Génération de leads',
        'Landing pages',
        'Tunnels de conversion',
        'Tracking',
      ],
      en: [
        'WordPress',
        'Meta Ads (Facebook, Instagram)',
        'Lead generation',
        'Landing pages',
        'Conversion funnels',
        'Tracking',
      ],
    },
  },
  {
    id: 'admin',
    icon: 'folder',
    title: { fr: 'Administratif', en: 'Administrative' },
    chips: {
      fr: [
        'Gestion documentaire',
        'Archivage numérique',
        'Suivi de dossiers',
        'Gestion des priorités et des délais',
        'Plateformes en ligne (ONIGT, ANCFCC, CRI)',
      ],
      en: [
        'Document management',
        'Digital archiving',
        'File tracking',
        'Priority & deadline management',
        'Online platforms (ONIGT, ANCFCC, CRI)',
      ],
    },
  },
];
