export function VideosPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white/80">
              <div className="aspect-video bg-[#3F7A4E]/10" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-[#3F7A4E]/10" />
                <div className="h-16 rounded bg-[#3F7A4E]/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-[#3F7A4E]/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
