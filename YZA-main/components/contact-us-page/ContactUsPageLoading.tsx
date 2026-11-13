export function ContactUsPageLoading() {
  return (
    <main className="bg-white animate-pulse">
      <div className="relative pt-32 pb-28 px-4 sm:px-6 bg-[#1a2e1f]">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 px-8 py-14 text-center space-y-5">
          <div className="h-8 w-36 rounded-full bg-white/10 mx-auto" />
          <div className="h-12 w-72 max-w-full rounded bg-white/10 mx-auto" />
          <div className="h-16 w-full max-w-md rounded bg-white/10 mx-auto" />
        </div>
      </div>
      <div className="py-14 px-4 sm:px-6 bg-[#fafaf8]">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
          <div className="h-44 rounded-[1.5rem] bg-[#3F7A4E]/10" />
          <div className="h-44 rounded-[1.5rem] bg-[#3F7A4E]/10" />
          <div className="h-44 rounded-[1.5rem] bg-[#3F7A4E]/10" />
        </div>
      </div>
    </main>
  );
}
