/**
 * Base URL Vite : '/' en dev local, '/younes-portfolio/' dans le build
 * GitHub Pages (défini par `base` dans vite.config.ts). Les chemins ci-dessous
 * fonctionnent ainsi dans les deux environnements sans modification.
 */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Informations personnelles — source unique de vérité. */
export const site = {
  name: 'Younes Ait Dabachi',
  title: {
    fr: 'Technicien Systèmes & Réseaux | Support IT | Agent administratif',
    en: 'Systems & Networks Technician | IT Support | Administrative Officer',
  },
  location: { fr: 'Marrakech, Maroc', en: 'Marrakech, Morocco' },
  email: 'dabachiyounes0@gmail.com',
  phoneDisplay: '+212 675 926 365',
  phoneHref: 'tel:+212675926365',
  cvPath: `${BASE}CV_Younes_Ait_Dabachi.pdf`,
  profilePhoto: `${BASE}images/profile.jpg`,
  founded: 2026,
} as const;

/** Chiffres réels (dérivés du contenu, rien d'inventé). */
export const stats = {
  years: 6,
  roles: 5,
  projects: 6,
  certifications: 2,
} as const;
