export function StudyGroupsLoading() {
  return (
    <section id="study-groups" className="page-snap-section py-16 sm:py-24 bg-[#f4f7f4] animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-14 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#3F7A4E]/15" />
            <div className="h-3 w-36 rounded bg-[#3F7A4E]/10" />
          </div>
          <div className="h-10 w-72 rounded bg-[#3F7A4E]/10" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-[#3F7A4E]/10" />
            <div className="h-4 w-5/6 rounded bg-[#3F7A4E]/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-[#3F7A4E]/10" />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-12 w-56 rounded-full bg-[#3F7A4E]/10" />
        </div>
      </div>
    </section>
  );
}
