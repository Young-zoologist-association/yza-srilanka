export function NewsAndUpdatesPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-40 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-64 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-80 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-14 px-4 sm:px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[1.75rem] overflow-hidden border border-[#e8efe9]">
              <div className="aspect-[16/10] bg-[#3F7A4E]/10" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 rounded bg-[#3F7A4E]/10" />
                <div className="h-3 w-1/4 rounded bg-[#3F7A4E]/10" />
                <div className="h-16 w-full rounded bg-[#3F7A4E]/10" />
              </div>
              <div className="h-1 bg-[#3F7A4E]/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
