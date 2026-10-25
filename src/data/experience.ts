export interface Experience {
  id: string;
  role: { fr: string; en: string };
  company: string;
  companyDesc: { fr: string; en: string };
  location: string;
  start: string;
  end: string | null; // null = présent
  missions: { fr: string[]; en: string[] };
  tags: string[];
}

/** Expériences professionnelles — ordre antichronologique. */
export const experiences: Experience[] = [
  {
    id: 'topoget',
    role: {
      fr: 'Responsable du service informatique & Agent administratif',
      en: 'Head of IT Department & Administrative Officer',
    },
    company: 'Topoget',
    companyDesc: {
      fr: 'Études Topographiques et Techniques, ingénierie et conseils',
      en: 'Topographic and technical surveys, engineering and consulting',
    },
    location: 'Marrakech',
    start: '05/2026',
    end: null,
    missions: {
      fr: [
        'Informatique — administrer et maintenir le parc informatique ; support technique et dépannage réseau ; gestion des sauvegardes et des équipements IT ; assistance aux agents techniques.',
        'Administration — réceptionner, enregistrer et traiter les dossiers techniques des brigades de terrain et du département technique ; constituer les dossiers à déposer auprès des services de cadastre.',
        'Classer, numériser et archiver ; suivre l’avancement quotidien, gérer les priorités et les délais ; signaler au responsable toute difficulté nécessitant une décision.',
        'Plateformes — ONIGT (création et gestion des contrats) ; Centre Régional d’Investissement Marrakech-Safi (demandes AVNA) ; ANCFCC (consultations, certificats de propriété, plans cadastraux, dépôt de dossiers techniques).',
      ],
      en: [
        'IT — administer and maintain the IT asset fleet; technical support and network troubleshooting; manage backups and IT equipment; assist technical field agents.',
        'Administration — receive, register and process technical files from field crews and the technical department; assemble files to be submitted to the cadastre services.',
        'File, digitize and archive; track daily progress, manage priorities and deadlines; report to the manager any issue requiring a decision.',
        'Platforms — ONIGT (contract creation and management); Marrakech-Safi Regional Investment Center (AVNA applications); ANCFCC (queries, property certificates, cadastral plans, technical file submissions).',
      ],
    },
    tags: ['Windows', 'Linux Debian', 'ONIGT', 'ANCFCC', 'CRI'],
  },
  {
    id: 'mogador',
    role: {
      fr: 'Stagiaire IT Support & SOC',
      en: 'IT Support & SOC Intern',
    },
    company: 'Mogador Hotels & Resorts',
    companyDesc: {
      fr: 'Grand Mogador Aqua Resort & Grand Mogador AGDAL',
      en: 'Grand Mogador Aqua Resort & Grand Mogador AGDAL',
    },
    location: 'Marrakech',
    start: '03/2026',
    end: '04/2026',
    missions: {
      fr: [
        'Gérer le parc informatique et le support utilisateurs ; administrer, superviser et sécuriser les réseaux.',
        'Surveiller et planifier les sauvegardes de l’ERP Pluriel avec Iperius Backup.',
        'Projet SOC sous Linux Debian : déploiement et supervision de serveurs, monitoring sécurité et analyse de logs avec Grafana, Zabbix, Wazuh, Suricata et Cowrie.',
        'Assistance technique audiovisuelle au Palais des Congrès.',
      ],
      en: [
        'Manage the IT asset fleet and user support; administer, supervise and secure the networks.',
        'Monitor and schedule ERP Pluriel backups with Iperius Backup.',
        'SOC project on Linux Debian: server deployment and supervision, security monitoring and log analysis with Grafana, Zabbix, Wazuh, Suricata and Cowrie.',
        'Audiovisual technical assistance at the Palais des Congrès.',
      ],
    },
    tags: ['SOC', 'Wazuh', 'Suricata', 'Zabbix', 'Grafana', 'Cowrie'],
  },
  {
    id: 'milkiya',
    role: {
      fr: 'Développeur WordPress, Acquisition de leads & Marketing digital',
      en: 'WordPress Developer, Lead Acquisition & Digital Marketing',
    },
    company: 'Milkiya',
    companyDesc: {
      fr: 'Collaboration avec l’agence immobilière Milkiya',
      en: 'Collaboration with the Milkiya real estate agency',
    },
    location: 'Marrakech',
    start: '07/2023',
    end: '11/2025',
    missions: {
      fr: [
        'Campagnes Meta Ads orientées génération de leads : biens commerciaux, hangars et projets industriels.',
        'Tunnels de conversion complets : landing pages, formulaires et tracking.',
        'Projets WordPress de bout en bout : site vitrine de l’Hôtel Amalay (Marrakech) et site vitrine d’Atlas Luxury Villas (Route d’Amizmiz).',
      ],
      en: [
        'Meta Ads campaigns focused on lead generation: commercial properties, warehouses and industrial projects.',
        'Full conversion funnels: landing pages, forms and tracking.',
        'End-to-end WordPress projects: Hôtel Amalay showcase website (Marrakech) and Atlas Luxury Villas showcase website (Amizmiz Road).',
      ],
    },
    tags: ['WordPress', 'Meta Ads', 'Landing pages', 'Tracking'],
  },
  {
    id: 'nearshore',
    role: {
      fr: 'Technicien Réseaux & Support Informatique',
      en: 'Network & IT Support Technician',
    },
    company: 'Marrakech Nearshore',
    companyDesc: {
      fr: 'Hôtels Tachfine et Amalay, site Inara Camp (Agafay)',
      en: 'Tachfine and Amalay hotels, Inara Camp site (Agafay)',
    },
    location: 'Marrakech',
    start: '12/2021',
    end: '07/2023',
    missions: {
      fr: [
        'Gérer le parc informatique des hôtels et du site Inara Camp ; support utilisateurs ; diagnostic et résolution des incidents réseau.',
        'Administrer, superviser et sécuriser les réseaux ; installer et déployer l’application nationale SMIT.',
        'Contribuer à la mise en place du PMS Pluriel (Amalay et Tachfine) : saisie et structuration des données (articles, tarifs, chambres).',
        'Gérer les dossiers informatiques des hôtels.',
      ],
      en: [
        'Manage the IT asset fleet of the hotels and the Inara Camp site; user support; network incident diagnosis and resolution.',
        'Administer, supervise and secure the networks; install and deploy the national SMIT application.',
        'Contribute to the PMS Pluriel rollout (Amalay and Tachfine): data entry and structuring (items, rates, rooms).',
        'Manage the hotels’ IT files.',
      ],
    },
    tags: ['PMS Pluriel', 'SMIT', 'Support IT', 'Réseaux'],
  },
  {
    id: 'marrakech-telecom',
    role: {
      fr: 'Chargé d’Études FTTH',
      en: 'FTTH Engineering Studies Officer',
    },
    company: 'Marrakech Télécom',
    companyDesc: {
      fr: 'Études techniques FTTH pour Orange et Enedis',
      en: 'FTTH technical studies for Orange and Enedis',
    },
    location: 'Marrakech',
    start: '11/2019',
    end: '12/2021',
    missions: {
      fr: [
        'Études techniques FTTH et calculs de charges sur supports Orange et Enedis.',
        'Calculs mécaniques des appuis (CAPFT pour Orange, COMAC pour Enedis) et vérification de conformité.',
        'Plans sur AutoCAD : reports DT, plans de pérennité, plans FTTH ; dossiers techniques Enedis.',
        'Suivi des dossiers et planification des interventions terrain.',
      ],
      en: [
        'FTTH technical studies and load calculations on Orange and Enedis supports.',
        'Mechanical pole calculations (CAPFT for Orange, COMAC for Enedis) and compliance verification.',
        'AutoCAD drawings: DT reports, perpetuity plans, FTTH plans; Enedis technical files.',
        'File tracking and field intervention planning.',
      ],
    },
    tags: ['FTTH', 'AutoCAD', 'CAPFT', 'COMAC'],
  },
];
