export function WildlifePhotographyPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[60vh] bg-[#1a2e1f]/80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="h-8 w-64 bg-[#3F7A4E]/10 rounded mx-auto mb-10" />
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-[#3F7A4E]/10" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-[#3F7A4E]/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
