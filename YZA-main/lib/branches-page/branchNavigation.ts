import type { BranchCard } from "@/lib/branches-page/resolveBranchesPageContent";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveBranchSlug(hash: string, branches: BranchCard[]): string | null {
  const normalized = hash.trim().replace(/^#/, "").toLowerCase();
  if (!normalized) return null;

  if (branches.some((branch) => branch.slug === normalized)) {
    return normalized;
  }

  const byName = branches.find((branch) => slugify(branch.name) === normalized);
  return byName?.slug ?? null;
}

function getNavbarOffset(): number {
  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 88;
}

export function isBranchSectionSnapped(element: HTMLElement, tolerance = 48): boolean {
  const top = element.getBoundingClientRect().top;
  return Math.abs(top - getNavbarOffset()) <= tolerance;
}

export function scrollToBranchSection(
  slug: string,
  options: { behavior?: ScrollBehavior } = {},
): boolean {
  const element = document.getElementById(slug);
  if (!element) return false;

  element.scrollIntoView({
    behavior: options.behavior ?? "smooth",
    block: "start",
  });
  return true;
}

export function waitForBranchSection(
  slug: string,
  maxAttempts = 80,
): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    let attempts = 0;

    const tryFind = () => {
      const element = document.getElementById(slug);
      if (element) {
        resolve(element);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        resolve(null);
        return;
      }

      requestAnimationFrame(tryFind);
    };

    tryFind();
  });
}

export function waitForScrollSettled(timeoutMs = 1200): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", onScrollEnd);
      window.clearTimeout(fallbackTimer);
      resolve();
    };

    const onScrollEnd = () => finish();

    const fallbackTimer = window.setTimeout(finish, timeoutMs);
    window.addEventListener("scrollend", onScrollEnd, { once: true });
  });
}
