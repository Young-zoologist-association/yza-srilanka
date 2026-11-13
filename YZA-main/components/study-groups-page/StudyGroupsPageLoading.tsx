export function StudyGroupsPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="relative pt-32 pb-24 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-40 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-64 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-4 w-96 max-w-full rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-4 px-4 sm:px-6 border-b border-[#3F7A4E]/10">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-28 rounded-full bg-[#3F7A4E]/10 flex-shrink-0" />
          ))}
        </div>
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className={`py-16 px-4 sm:px-6 ${i % 2 ? "bg-white" : "bg-[#f4f7f4]"}`}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            <div className="aspect-[4/3] rounded-3xl bg-[#3F7A4E]/10" />
            <div className="space-y-4">
              <div className="h-4 w-20 rounded bg-[#F2A93B]/20" />
              <div className="h-8 w-48 rounded bg-[#3F7A4E]/10" />
              <div className="h-1 w-16 rounded bg-[#3F7A4E]/10" />
              <div className="h-24 rounded bg-[#3F7A4E]/10" />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
