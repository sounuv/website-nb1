export function BrandSphere() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Aura com efeito de brilho */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,150,255,0.7)_20%,rgba(0,0,0,0)_90%)] blur-lg animate-glow pointer-events-none" />

      {/* GIF da esfera com rotação */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg animate-spinSlow">
        <img
          src="/sphere.gif"
          alt="Spinning Sphere"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
