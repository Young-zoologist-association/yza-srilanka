export function MembershipPageLoading() {
  return (
    <main className="bg-[#f4f7f4] animate-pulse">
      <div className="min-h-[55vh] bg-[#1a2e1f]/80" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        <div className="max-w-4xl mx-auto h-44 md:h-48 rounded-2xl bg-[#F2A93B]/15 ring-2 ring-[#F2A93B]/20" />
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-white/80 ring-1 ring-[#3F7A4E]/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
