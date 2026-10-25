export type ProjectCategory = 'web' | 'cyber' | 'networks' | 'marketing';
export type ProjectVisual = 'browser' | 'soc' | 'topology' | 'funnel';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  period: string;
  description: { fr: string; en: string };
  tools: string[];
  /** Visuel abstrait généré (SVG/CSS) — remplacer plus tard par une capture réelle dans /public/images. */
  visual: ProjectVisual;
}

/**
 * Projets — 6 fiches.
 * Pour ajouter une vraie capture plus tard : ajouter `image: '/images/mon-projet.jpg'`
 * dans /public/images et l'utiliser dans ProjectCard / ProjectModal.
 */
export const projects: Project[] = [
  {
    id: 'amalay',
    title: 'Site vitrine — Hôtel Amalay',
    category: 'web',
    client: 'Hôtel Amalay, Marrakech',
    period: '2023 – 2025',
    description: {
      fr: 'Site vitrine développé sous WordPress dans le cadre de la collaboration avec l’agence Milkiya : conception, mise en ligne et suivi du site de l’hôtel situé à Marrakech. Projet mené de bout en bout, du paramétrage à la publication.',
      en: 'Showcase website built with WordPress as part of the collaboration with the Milkiya agency: design, launch and maintenance of the Marrakech hotel’s website. End-to-end project, from setup to publication.',
    },
    tools: ['WordPress', 'Web design', 'SEO de base'],
    visual: 'browser',
  },
  {
    id: 'atlas-villas',
    title: 'Site vitrine — Atlas Luxury Villas',
    category: 'web',
    client: 'Atlas Luxury Villas, Route d’Amizmiz',
    period: '2023 – 2025',
    description: {
      fr: 'Site vitrine WordPress pour Atlas Luxury Villas (Route d’Amizmiz) : mise en valeur des villas de luxe, pages claires et rapides, formulaire de contact. Développement et suivi assurés de bout en bout.',
      en: 'WordPress showcase website for Atlas Luxury Villas (Amizmiz Road): showcasing luxury villas with clear, fast pages and a contact form. Development and maintenance handled end to end.',
    },
    tools: ['WordPress', 'Landing pages', 'Formulaires'],
    visual: 'browser',
  },
  {
    id: 'soc-mogador',
    title: 'Projet SOC sous Linux Debian',
    category: 'cyber',
    client: 'Mogador Hotels & Resorts',
    period: '03/2026 – 04/2026',
    description: {
      fr: 'Projet SOC réalisé durant le stage chez Mogador Hotels & Resorts : déploiement et supervision de serveurs sous Linux Debian, monitoring de sécurité et analyse de logs avec Wazuh, Suricata, Zabbix, Grafana et Cowrie.',
      en: 'SOC project carried out during the internship at Mogador Hotels & Resorts: server deployment and supervision on Linux Debian, security monitoring and log analysis with Wazuh, Suricata, Zabbix, Grafana and Cowrie.',
    },
    tools: ['Wazuh', 'Suricata', 'Zabbix', 'Grafana', 'Cowrie', 'Linux Debian'],
    visual: 'soc',
  },
  {
    id: 'meta-ads-milkiya',
    title: 'Campagnes Meta Ads & génération de leads',
    category: 'marketing',
    client: 'Milkiya',
    period: '07/2023 – 11/2025',
    description: {
      fr: 'Campagnes Meta Ads orientées génération de leads pour l’agence immobilière Milkiya : biens commerciaux, hangars et projets industriels. Tunnels de conversion complets avec landing pages, formulaires et tracking.',
      en: 'Meta Ads campaigns focused on lead generation for the Milkiya real estate agency: commercial properties, warehouses and industrial projects. Full conversion funnels with landing pages, forms and tracking.',
    },
    tools: ['Meta Ads', 'Landing pages', 'Tunnels de conversion', 'Tracking'],
    visual: 'funnel',
  },
  {
    id: 'pms-pluriel',
    title: 'Déploiement PMS Pluriel',
    category: 'networks',
    client: 'Marrakech Nearshore — Hôtels Amalay & Tachfine',
    period: '2021 – 2023',
    description: {
      fr: 'Contribution à la mise en place du PMS Pluriel dans les hôtels Amalay et Tachfine : saisie et structuration des données (articles, tarifs, chambres) et gestion des dossiers informatiques des hôtels.',
      en: 'Contribution to the PMS Pluriel rollout in the Amalay and Tachfine hotels: data entry and structuring (items, rates, rooms) and management of the hotels’ IT files.',
    },
    tools: ['PMS Pluriel', 'Gestion de données', 'Support IT'],
    visual: 'topology',
  },
  {
    id: 'ftth',
    title: 'Études techniques FTTH',
    category: 'networks',
    client: 'Marrakech Télécom — Orange & Enedis',
    period: '2019 – 2021',
    description: {
      fr: 'Études techniques FTTH et calculs de charges sur supports Orange et Enedis : calculs mécaniques des appuis (CAPFT, COMAC), vérification de conformité, plans AutoCAD (reports DT, pérennité, FTTH) et dossiers techniques.',
      en: 'FTTH technical studies and load calculations on Orange and Enedis supports: mechanical pole calculations (CAPFT, COMAC), compliance verification, AutoCAD drawings (DT reports, perpetuity, FTTH) and technical files.',
    },
    tools: ['AutoCAD', 'CAPFT', 'COMAC', 'FTTH'],
    visual: 'topology',
  },
];
