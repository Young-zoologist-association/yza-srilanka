export function CommitteesPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-32 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-64 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-80 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`py-16 px-4 sm:px-6 ${i % 2 ? "bg-[#fafaf8]" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            <div className="aspect-[4/3] rounded-3xl bg-[#3F7A4E]/10" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-[#3F7A4E]/10" />
              <div className="h-8 w-64 rounded bg-[#3F7A4E]/10" />
              <div className="h-1 w-16 rounded bg-[#F2A93B]/20" />
              <div className="h-24 rounded bg-[#3F7A4E]/10" />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
