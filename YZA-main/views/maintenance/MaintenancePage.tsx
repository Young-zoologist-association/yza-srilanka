/* eslint-disable @next/next/no-img-element */

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=1920&h=1080&fit=crop&auto=format";

/** Temporary "under maintenance" screen shown on the home route until launch. */
export default function MaintenancePage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6">
        <img
          src="/images/yza-logo.png"
          alt="Young Zoologists' Association of Sri Lanka"
          className="h-24 w-auto"
        />
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          We&apos;re getting ready
        </h1>
        <p className="text-lg text-white/85 sm:text-xl">
          Our new website will be launched on the 15th.
        </p>
      </div>
    </main>
  );
}
