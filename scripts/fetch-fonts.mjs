// Script temporaire : télécharge les woff2 Google Fonts pour auto-hébergement.
import { writeFile, mkdir } from 'node:fs/promises';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const FAMILIES = [
  { name: 'inter', query: 'Inter:wght@400;500;600' },
  { name: 'grotesk', query: 'Space+Grotesk:wght@400;600;700' },
  { name: 'jbmono', query: 'JetBrains+Mono:wght@400;600' },
];

await mkdir('public/fonts', { recursive: true });

for (const family of FAMILIES) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.query}&display=swap`;
  const res = await fetch(cssUrl, { headers: { 'User-Agent': UA } });
  const css = await res.text();

  // Blocs : /* subset */ @font-face { ... font-weight: W ... url(U) ... }
  const blocks = css.match(/\/\* ([a-z-]+) \*\/\s*@font-face\s*{[^}]+}/g) ?? [];
  for (const block of blocks) {
    const subset = block.match(/\/\* ([a-z-]+) \*\//)[1];
    if (subset !== 'latin' && subset !== 'latin-ext') continue;
    const weight = block.match(/font-weight:\s*(\d+)/)[1];
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const file = `public/fonts/${family.name}-${weight}-${subset}.woff2`;
    const fontRes = await fetch(url);
    const buf = Buffer.from(await fontRes.arrayBuffer());
    await writeFile(file, buf);
    console.log(`${file} — ${(buf.length / 1024).toFixed(1)} kB`);
  }
}
console.log('DONE');
