export function PresidentsPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-36 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-72 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-80 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-12 px-4 sm:px-6">
        <div className="max-w-md mx-auto rounded-[2rem] border border-[#F2A93B]/20 bg-white p-10 flex flex-col items-center gap-4">
          <div className="w-48 h-48 rounded-2xl bg-[#F2A93B]/10" />
          <div className="h-6 w-24 rounded-full bg-[#3F7A4E]/10" />
          <div className="h-8 w-48 rounded bg-[#3F7A4E]/10" />
        </div>
      </div>
      <div className="py-12 px-4 sm:px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-full aspect-square max-w-[160px] rounded-2xl bg-[#3F7A4E]/10" />
              <div className="h-4 w-28 rounded bg-[#3F7A4E]/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
