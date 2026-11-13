export function WildlifeArtPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-40 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-80 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-96 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white/80 p-3 space-y-3">
              <div className="aspect-[4/5] rounded-xl bg-[#3F7A4E]/10" />
              <div className="h-5 w-32 rounded bg-[#3F7A4E]/10" />
              <div className="h-4 w-24 rounded bg-[#3F7A4E]/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
