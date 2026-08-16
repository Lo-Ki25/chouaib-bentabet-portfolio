/**
 * Grain filmique très discret sur toute la page — coût de rendu quasi nul
 * (un seul filtre SVG statique, aucune animation JS). Composant serveur
 * (pas de "use client" nécessaire, aucune interactivité).
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] opacity-[0.035] mix-blend-overlay"
    >
      <svg className="h-full w-full">
        <filter id="cb-grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cb-grain-noise)" />
      </svg>
    </div>
  );
}
