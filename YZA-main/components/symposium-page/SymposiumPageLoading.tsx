export function SymposiumPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-3 w-40 rounded bg-white/10 mx-auto" />
          <div className="h-12 w-80 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-20 w-full max-w-xl rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-14 px-4 sm:px-6 bg-[#fafaf8]">
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#e8efe9] bg-white p-8 h-32" />
      </div>
      <div className="py-14 px-4 sm:px-6 bg-[#f4f7f4]">
        <div className="max-w-5xl mx-auto rounded-[1.75rem] border border-[#e8efe9] bg-white overflow-hidden grid md:grid-cols-2">
          <div className="aspect-[3/4] max-h-80 bg-[#3F7A4E]/10" />
          <div className="p-8 space-y-4">
            <div className="h-6 w-3/4 rounded bg-[#3F7A4E]/10" />
            <div className="h-16 w-full rounded bg-[#3F7A4E]/10" />
            <div className="h-10 w-40 rounded bg-[#3F7A4E]/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
