export function HeroLoading() {
  return (
    <section className="page-snap-section relative min-h-[100svh] sm:h-screen sm:min-h-[640px] overflow-hidden flex items-center bg-[#1a2e1f] animate-pulse">
      <div className="absolute inset-0 z-0 bg-[#1a2e1f]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-24 w-full">
        <div className="max-w-3xl space-y-7">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-white/20" />
            <div className="h-3 w-56 rounded bg-white/15" />
          </div>

          <div className="space-y-4">
            <div className="h-16 sm:h-24 w-full max-w-xl rounded bg-white/10" />
            <div className="h-10 sm:h-16 w-48 rounded bg-white/10" />
          </div>

          <div className="space-y-2 max-w-xl">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-4/6 rounded bg-white/10" />
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="h-12 w-32 rounded-full bg-white/10" />
            <div className="h-12 w-32 rounded-full bg-white/10" />
            <div className="h-12 w-36 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="h-2 w-10 rounded bg-white/10" />
        <div className="h-4 w-4 rounded bg-white/10" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 70 L0 35 Q360 0 720 22 Q1080 44 1440 14 L1440 70 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
