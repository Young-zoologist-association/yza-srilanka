export function EventsLoading() {
  return (
    <section id="events" className="page-snap-section py-16 sm:py-24 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 sm:gap-16 items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#3F7A4E]/15" />
              <div className="h-3 w-32 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="h-10 w-64 rounded bg-[#3F7A4E]/10" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-[#3F7A4E]/10" />
              <div className="h-4 w-5/6 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="h-72 rounded-2xl bg-[#3F7A4E]/10" />
            <div className="h-4 w-48 rounded bg-[#3F7A4E]/10" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-[#3F7A4E]/10" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
