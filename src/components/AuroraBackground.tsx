/**
 * Fond décoratif fixe : aurore en dégradés maillés (mesh gradients animés en
 * transform GPU uniquement), grille fine, texture de bruit et vignette.
 * Statique si prefers-reduced-motion (via la règle CSS globale).
 */
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Aurore — trois halos animés (palette cyberpunk SOC) */}
      <div
        className="animate-aurora-a absolute -top-[20%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(34,197,94,0.5), rgba(34,197,94,0.14) 55%, transparent 75%)',
        }}
      />
      <div
        className="animate-aurora-b absolute top-[10%] -right-[20%] h-[55vmax] w-[55vmax] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(34,211,238,0.45), rgba(34,211,238,0.12) 55%, transparent 75%)',
        }}
      />
      <div
        className="animate-aurora-c absolute -bottom-[25%] left-[20%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.13] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(232,121,249,0.45), rgba(232,121,249,0.1) 50%, transparent 75%)',
        }}
      />

      {/* Grille fine masquée vers le centre */}
      <div className="grid-lines absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Lignes verticales lumineuses (hairlines) */}
      <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-line to-transparent" />
      <div className="absolute inset-y-0 right-[12%] w-px bg-gradient-to-b from-transparent via-line to-transparent" />

      {/* Texture de bruit */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(5,7,13,0.5) 100%)' }}
      />
    </div>
  );
}
