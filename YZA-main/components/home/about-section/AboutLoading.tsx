export function AboutLoading() {
  return (
    <section id="about" className="page-snap-section py-16 sm:py-24 bg-white overflow-hidden animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#3F7A4E]/15" />
              <div className="h-3 w-24 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="space-y-3">
              <div className="h-10 w-full max-w-72 rounded bg-[#3F7A4E]/10" />
              <div className="h-10 w-full max-w-48 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="space-y-3 pt-2">
              <div className="h-4 w-full rounded bg-[#3F7A4E]/10" />
              <div className="h-4 w-full rounded bg-[#3F7A4E]/10" />
              <div className="h-4 w-5/6 rounded bg-[#3F7A4E]/10" />
            </div>
            <div className="h-4 w-40 rounded bg-[#3F7A4E]/10" />
          </div>

          <div className="space-y-8">
            <div className="aspect-[4/3] rounded-3xl bg-[#3F7A4E]/10" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-[#3F7A4E]/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
