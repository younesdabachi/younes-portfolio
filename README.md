# Portfolio — Younes Ait Dabachi

Personal portfolio of **Younes Ait Dabachi** — Technicien Systèmes & Réseaux | Support IT | Agent administratif (Marrakech, Morocco).

A cyberpunk, hacker-terminal-styled, bilingual (FR/EN) single-page portfolio: **Vite + React 18 + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis + React Three Fiber**. Static output only — no backend.

**Live:** https://younesdabachi.github.io/younes-portfolio/ — every push to `main` auto-deploys via GitHub Actions.

---

## Run locally (Windows)

Requirements: **Node.js 18+** and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:5173/younes-portfolio/** (note the base path — it matches the GitHub Pages URL).

```bash
npm run build      # type-check + optimized static build → /dist
npm run preview    # serve the /dist build locally
npm run lint       # ESLint
npm run typecheck  # TypeScript only
npm run format     # Prettier
```

## Performance engineering

| Technique | Detail |
|---|---|
| **Code-splitting** | Vendor chunks (`react`, `framer-motion`) cached long-term; app code in its own chunk; **three.js lazy-loaded** only for the 3D hero (mounted on `requestIdleCallback`, never blocks first paint). |
| **Drei removed** | The `<Float>` helper was hand-rolled in `useFrame`, cutting ~160 kB from the three chunk (967 → 808 kB). |
| **Self-hosted fonts** | All woff2 files in `public/fonts` (latin + latin-ext, `font-display: swap`, `unicode-range` splits). Zero requests to Google Fonts. Critical fonts (Space Grotesk 700, Inter 400) are `<link rel="preload">`d. Regenerate with `node scripts/fetch-fonts.mjs`. |
| **`content-visibility: auto`** | Below-fold sections skip rendering/layout until scrolled near (`contain-intrinsic-size` avoids jumps). |
| **Fast intro** | Boot sequence shortened to ~1.4 s, clickable to skip, fully skipped when animations are off (LCP protection). |
| **GPU-only animation** | All effects use `transform`/`opacity`/`filter`; the matrix rain canvas runs at ~24 fps, DPR-capped at 1.5, and **pauses when off-screen or the tab is hidden**. |
| **Memory discipline** | Every timer, rAF loop, listener and IntersectionObserver is cleaned on unmount; the terminal caps its history at 60 lines; the alert feed at 40. No leaks. |
| **Clean prod output** | `esbuild.drop: ['console','debugger']` — nothing leaks to the console. |
| **Media** | Profile photo compressed to ~128 kB (from 4.7 MB) with explicit dimensions; SVG visuals everywhere else; CV PDF loads only on click. |

## Features

### Sections (in order)
Hero (3D network topology) · About (glitched photo, real-counters, interactive terminal) · Skills (chips, decrypt on hover) · Experience (sticky timeline) · Projects (filterable, `PRJ-XX` file tags, animated modals) · Services · Education & Certifications · Languages · **Interests** (laws of the universe with animated graphs + 12 NVIDIA technologies explained) · **Lab** (`// INTERLUDE · SOC MODE`) · Contact · Footer (live hexdump).

### Signature features
- **Command palette** (`Ctrl/Cmd+K`): navigation, theme, language, animations, Overdrive, copy email/phone, download CV.
- **Interactive terminal** (`help`, `whoami`, `skills`, `projects`, `experience`, `education`, `neofetch`, `contact`, `overdrive`, `clear`) — prints real portfolio data, arrow-key history.
- **MODE OVERDRIVE**: the ⚡ button in the Lab, the palette action, the `overdrive` terminal command — or the Konami code (↑↑↓↓←→←→BA): 12 s of full-screen matrix rain + hue shift.
- **Animations toggle** (⚡ navbar): follows the OS `prefers-reduced-motion` setting by default; user can force on/off (`localStorage`). CSS effects are gated via `html.motion-ok`.
- **Boot-sequence intro**, typewriter hero roles, scramble-decrypt section titles and tagline, HUD status bar, keyword ticker, signal LEDs, glitch photo loop, random site glitch pulse, **glitch hover on every button**, social buttons (Facebook · LinkedIn · WhatsApp) with looping RGB glitch.
- **FR/EN** toggle (persisted, `<html lang>`), architecture ready for Arabic + RTL.
- **Dark / light theme** (persisted), both AA+ contrast.
- **Contact form**: Web3Forms with honeypot, validation, graceful `mailto:` fallback.

## Editing content — where everything lives

No text is hardcoded in components.

| What | File |
|---|---|
| Name, email, phone, CV/photo paths, **social URLs** | `src/data/site.ts` |
| Skills · Experience · **Projects** · Services · Education/Languages | `src/data/*.ts` |
| UI strings (incl. laws of the universe, NVIDIA techs, terminal, palette) | `src/i18n/fr.json`, `src/i18n/en.json` |
| Design tokens / hacker effects | `src/styles/global.css` |

Bilingual fields are `{ fr: '…', en: '…' }`. Project visuals are generated SVGs (`src/components/ProjectVisual.tsx`); drop real screenshots in `public/images/` and reference them in `src/data/projects.ts`.

## Placeholders to review

- **CV**: `public/CV_Younes_Ait_Dabachi.pdf` ✅ in place.
- **Profile photo**: `public/images/profile.jpg` ✅ (compressed). Automatic "YA" monogram fallback if missing.
- **`.env`** contains the Web3Forms key and is committed so the Actions build can use it. Web3Forms keys are client-side by design, but anyone can read it — restrict it to your domain (or rotate it) from https://web3forms.com. For stricter hygiene, move it to a GitHub Actions secret instead.
- Root `deploy.yml` is an inactive duplicate of `.github/workflows/main.yml` — safe to delete.

## Contact form — Web3Forms

1. Free key at https://web3forms.com.
2. `.env` → `VITE_WEB3FORMS_KEY="your-key"` (or a GitHub Actions secret).
3. Restart `npm run dev`. Without a key the form falls back to `mailto:`.

## Deploy (GitHub Pages)

`base: '/younes-portfolio/'` is set in `vite.config.ts`. The workflow `.github/workflows/main.yml` builds and deploys on every push to `main`:

```bash
npm run build
git push
```

## Tech stack

Vite 6 · React 18 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion 11 · Lenis 1 · React Three Fiber 8 · three 0.170 · lucide-react · ESLint 9 + Prettier

---

© 2026 Younes Ait Dabachi
