export function CmcPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-52 rounded bg-white/10 mx-auto" />
          <div className="h-10 w-80 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-8 w-28 rounded-full bg-[#F2A93B]/20 mx-auto" />
          <div className="h-4 w-96 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`py-16 px-4 sm:px-6 ${i % 2 ? "bg-[#fafaf8]" : "bg-white"}`}>
          <div className="h-6 w-40 rounded bg-[#3F7A4E]/10 mx-auto mb-10" />
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {Array.from({ length: i === 0 ? 1 : i === 1 ? 2 : 3 }).map((_, j) => (
              <div key={j} className="flex flex-col items-center gap-4">
                <div className="w-36 h-36 rounded-2xl bg-[#3F7A4E]/10" />
                <div className="h-4 w-32 rounded bg-[#3F7A4E]/10" />
                <div className="h-3 w-24 rounded bg-[#3F7A4E]/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
