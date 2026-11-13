export function PdfArchivePageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-[#3F7A4E]/10" />
            <div className="min-h-[520px] rounded-2xl bg-[#3F7A4E]/10" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white/80" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
