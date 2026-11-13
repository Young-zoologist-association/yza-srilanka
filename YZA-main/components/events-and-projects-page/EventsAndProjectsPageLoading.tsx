export function EventsAndProjectsPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-48 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-80 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-96 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded bg-[#F2A93B]/20" />
            <div className="h-10 w-64 rounded bg-[#3F7A4E]/10" />
            <div className="h-24 rounded-2xl bg-[#3F7A4E]/10" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-[#3F7A4E]/10" />
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
