export interface Education {
  id: string;
  title: { fr: string; en: string };
  org: string;
  period: string;
}

export interface LanguageSkill {
  id: string;
  name: { fr: string; en: string };
  level: { fr: string; en: string };
  /** Niveau relatif pour la jauge décorative (maternelle > intermédiaire). */
  dotCount: 1 | 2 | 3;
}

export const educationList: Education[] = [
  {
    id: 'ofppt',
    title: {
      fr: 'Technicien en Systèmes Informatiques et Réseaux',
      en: 'Computer Systems and Networks Technician',
    },
    org: 'Institut Spécialisé Industriel Marrakech (OFPPT)',
    period: '10/2017 – 09/2019',
  },
  {
    id: 'nobel-gestion',
    title: {
      fr: 'Technicien Spécialisé en Gestion des Entreprises',
      en: 'Specialized Technician in Business Management',
    },
    org: 'Nobel School, Marrakech',
    period: '09/2014 – 08/2016',
  },
  {
    id: 'nobel-informatique',
    title: {
      fr: 'Technicien en Gestion Informatisée',
      en: 'Computerized Management Technician',
    },
    org: 'Nobel School, Marrakech',
    period: '09/2012 – 08/2014',
  },
];

export const certificationList = [
  'Microsoft Office Specialist 2010 : Excel',
  'Microsoft Office Specialist 2010 : Word',
] as const;

export const languageList: LanguageSkill[] = [
  {
    id: 'ar',
    name: { fr: 'Arabe', en: 'Arabic' },
    level: { fr: 'Langue maternelle', en: 'Native' },
    dotCount: 3,
  },
  {
    id: 'fr',
    name: { fr: 'Français', en: 'French' },
    level: { fr: 'Intermédiaire', en: 'Intermediate' },
    dotCount: 2,
  },
  {
    id: 'en',
    name: { fr: 'Anglais', en: 'English' },
    level: { fr: 'Intermédiaire', en: 'Intermediate' },
    dotCount: 2,
  },
];
