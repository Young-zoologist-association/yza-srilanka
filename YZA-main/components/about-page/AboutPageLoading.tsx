export function AboutPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="min-h-[72vh] bg-[#1a2e1f]/80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <div className="w-44 h-56 rounded-2xl bg-[#3F7A4E]/10 mx-auto lg:mx-0" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-[#3F7A4E]/10" />
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="h-6 w-48 rounded bg-[#3F7A4E]/10" />
            <div className="h-32 rounded bg-[#3F7A4E]/10" />
          </div>
          <div className="aspect-square rounded-3xl bg-[#3F7A4E]/10" />
        </div>
        <div className="h-48 rounded-3xl bg-[#3F7A4E]/10" />
      </div>
    </main>
  );
}
