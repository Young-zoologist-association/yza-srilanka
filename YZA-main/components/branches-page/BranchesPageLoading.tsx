export function BranchesPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/3] rounded-3xl bg-[#3F7A4E]/10" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-[#3F7A4E]/10" />
              <div className="h-10 w-48 rounded bg-[#3F7A4E]/10" />
              <div className="h-24 rounded-xl bg-[#3F7A4E]/10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
