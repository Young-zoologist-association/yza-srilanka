export function StoreLoading() {
  return (
    <section id="store" className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#3F7A4E]/15" />
              <div className="h-3 w-28 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="h-10 w-full max-w-64 rounded bg-[#3F7A4E]/10" />
          </div>
          <div className="h-4 w-32 rounded bg-[#3F7A4E]/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[1.5rem] bg-[#3F7A4E]/10 aspect-[4/5]" />
          ))}
        </div>
      </div>
    </section>
  );
}
