export function VigilBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base obsidian + violet/cyan blooms */}
      <div className="absolute inset-0 vigil-mesh" />
      {/* Faint blueprint grid */}
      <div className="absolute inset-0 vigil-grid opacity-60" />
      {/* Soft radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Film grain */}
      <div className="absolute inset-0 vigil-grain" />
    </div>
  );
}
