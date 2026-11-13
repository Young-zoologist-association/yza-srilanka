export function StorePageLoading() {
  return (
    <main className="animate-pulse" style={{ backgroundColor: "#F7F3EB" }}>
      <div className="relative pt-32 pb-20 px-4 sm:px-6" style={{ backgroundColor: "#1B3A2D" }}>
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="h-8 w-44 rounded-full bg-white/10" />
            <div className="h-16 w-72 max-w-full rounded bg-white/10" />
            <div className="h-20 w-full max-w-xl rounded bg-white/10" />
          </div>
          <div className="h-44 rounded-[1.75rem] border border-white/10 bg-white/5" />
        </div>
      </div>
      <div className="py-14 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-56 rounded bg-[#6B8F71]/15" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[1.5rem] border border-[#6B8F71]/15 bg-white"
              >
                <div className="aspect-[4/5] bg-[#EDE6D8]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-[#6B8F71]/10" />
                  <div className="h-4 w-1/3 rounded bg-[#D4A054]/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
