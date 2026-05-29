export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36 min-h-[80vh] flex items-center justify-center">
      {/* Premium Gym Background Image Canvas with Dark Overlay */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-700 scale-105"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')` 
        }}
      />
      {/* Cinematic Vignette Gradient Layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/50 via-neutral-950/85 to-neutral-950" />
      
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-400 uppercase mb-6 backdrop-blur-sm animate-pulse">
          The Future of Fitness is Contextual
        </span>
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Crush Goals With Your <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Personal AI Co-Pilot</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-300 font-medium dropshadow-sm drop-shadow-md">
          "The individual who says it cannot be done should not interrupt the individual who is already doing it." Streamline your nutrition, review logs dynamically, and coordinate metrics with peers instantly.
        </p>
      </div>
    </section>
  );
}