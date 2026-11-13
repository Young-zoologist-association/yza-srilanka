export function JuniorYzaPageLoading() {
  return (
    <main className="bg-[#fff8ef] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-3xl bg-[#3F7A4E]/10" />
          ))}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-[#3F7A4E]/10" />
          ))}
        </div>
        <div className="aspect-[16/10] rounded-[2rem] bg-[#3F7A4E]/10" />
      </div>
    </main>
  );
}
