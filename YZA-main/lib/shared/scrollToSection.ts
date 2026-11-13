const DEFAULT_NAVBAR_OFFSET_PX = 88;

export function getNavbarOffsetPx(): number {
  const header = document.querySelector("header");
  if (!header) return DEFAULT_NAVBAR_OFFSET_PX;
  return Math.ceil(header.getBoundingClientRect().height);
}

export function scrollToSectionById(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const top = Math.max(0, section.offsetTop - getNavbarOffsetPx());
  window.scrollTo({ top, left: 0, behavior });
  return true;
}

/** Restores scroll after a modal closes without smooth-scroll jitter. */
export function restoreScrollAfterDialogClose(sectionId: string): void {
  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;

  html.style.scrollBehavior = "auto";

  const restore = () => scrollToSectionById(sectionId, "instant");

  restore();
  requestAnimationFrame(() => {
    restore();
    requestAnimationFrame(() => {
      html.style.scrollBehavior = previousScrollBehavior;
    });
  });
}

export function scrollToHashSection(
  hash: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const sectionId = hash.replace(/^#/, "").trim();
  if (!sectionId) return false;
  return scrollToSectionById(sectionId, behavior);
}

/** Retries until the section exists (e.g. after Suspense resolves). */
export function scrollToHashSectionWhenReady(
  hash: string,
  behavior: ScrollBehavior = "smooth",
): () => void {
  const delays = [0, 120, 350, 700, 1200];
  const timers = delays.map((delay) =>
    window.setTimeout(() => scrollToHashSection(hash, behavior), delay),
  );

  return () => {
    timers.forEach((timer) => window.clearTimeout(timer));
  };
}
