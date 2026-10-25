# Portfolio — Younes Ait Dabachi

Personal portfolio of **Younes Ait Dabachi** — Technicien Systèmes & Réseaux | Support IT | Agent administratif (Marrakech, Morocco).

A futuristic, dark-first, bilingual (FR/EN) single-page portfolio: **Vite + React 18 + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis + React Three Fiber**. Static output only — no backend.

---

## Run locally (Windows)

Requirements: **Node.js 18+** (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:5173

Other commands:

```bash
npm run build      # type-check + optimized static build → /dist
npm run preview    # serve the /dist build locally
npm run lint       # ESLint
npm run typecheck  # TypeScript only
npm run format     # Prettier
```

> ⚠️ Windows note: if `npm run dev` is blocked by OneDrive sync, pause sync or move the folder outside OneDrive.

## Editing content — where everything lives

All site content is data-driven; **no text is hardcoded in components**.

| What | File |
|---|---|
| Name, email, phone, CV path, photo path, stats | `src/data/site.ts` |
| Skills groups & chips | `src/data/skills.ts` |
| Experience timeline (bilingual) | `src/data/experience.ts` |
| **Projects** (cards + modal) | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| Education, certifications, languages | `src/data/education.ts` |
| UI strings FR | `src/i18n/fr.json` |
| UI strings EN | `src/i18n/en.json` |

Bilingual fields are simple objects: `title: { fr: '…', en: '…' }`.

**Adding a real project screenshot later:** drop the image in `public/images/` (e.g. `public/images/soc.jpg`), then reference it in `src/data/projects.ts`. Until then, each project uses a generated abstract SVG visual (`browser`, `soc`, `topology`, `funnel` variants in `src/components/ProjectVisual.tsx`).

## Placeholders to review

- **CV**: expected at `public/CV_Younes_Ait_Dabachi.pdf` — ✅ already in place. The "Download CV" button (hero + command palette) links to it.
- **Profile photo**: expected at `public/images/profile.jpg` — ✅ already in place (compressed to ~130 KB). If the file is missing, the About section falls back to a stylish "YA" monogram automatically.
- **Canonical + Open Graph URLs** in `index.html` currently point to `https://username.github.io/` — replace with the real URL after deployment.
- **The SOC dashboard** shown in the cybersecurity project is clearly labelled *Illustrative* — it is a decorative SVG, not real monitoring data.

## Contact form — Web3Forms

The form in the Contact section posts to [Web3Forms](https://web3forms.com) and **gracefully falls back to a `mailto:` link if no key is configured** (the site never breaks).

1. Get a free access key at https://web3forms.com (enter your email, receive the key).
2. Copy `.env.example` to `.env` and paste your key:
   ```
   VITE_WEB3FORMS_KEY="your-real-key"
   ```
3. Restart `npm run dev`.

Features: client-side validation, honeypot anti-spam field, loading/success/error states, `aria-live` announcements.

## Features

- **FR / EN** toggle (persisted in `localStorage`, sets `<html lang>`), architecture ready for Arabic + RTL (`src/i18n/I18n.tsx` — add `ar.json`, extend the `Lang` type).
- **Dark / light theme** toggle (persisted), same design tokens remapped.
- **Command palette** — `Ctrl/Cmd + K`: jump to sections, switch theme/language, download CV, copy email.
- **Interactive terminal** in About (`help`, `whoami`, `skills`, `contact`, `clear`, arrow-up history).
- **3D hero** — lazy-loaded network topology (React Three Fiber, ~3 draw calls), mouse parallax, pulses along links. Automatic fallbacks: static SVG topology when WebGL is unavailable, and no animation at all when `prefers-reduced-motion` is set.
- **Accessibility**: skip link, focus traps in modal/palette, visible focus rings, ARIA roles, keyboard navigation everywhere, AA+ contrast in both themes, full reduced-motion support.
- **SEO**: meta description, Open Graph + Twitter cards, JSON-LD `Person` schema, `robots.txt`, SVG "YA" favicon.

## Deploy later to GitHub Pages (user site)

The build already uses `base: '/'`, so it works as-is for `username.github.io`:

```bash
npm run build
```

Then either:
- Push the contents of `/dist` to the `main` branch of your `username.github.io` repository, **or**
- From this project's repository: Settings → Pages → Deploy from branch → `gh-pages` (you can create it with `npx gh-pages -d dist`).

After deploying, replace the placeholder canonical/OG URLs in `index.html` with the real `https://username.github.io/` address and rebuild.

## Tech stack

Vite 6 · React 18 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion 11 · Lenis 1 · React Three Fiber 8 + drei 9 · three.js 0.170 · lucide-react · ESLint 9 + Prettier

---

© 2026 Younes Ait Dabachi
