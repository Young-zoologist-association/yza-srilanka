import type { StudyGroupPageCard } from "@/lib/study-groups-page/resolveStudyGroupsPageContent";

/** Navbar hash segments that differ from CMS / fallback slugs */
const STUDY_GROUP_HASH_ALIASES: Record<string, string> = {
  "aquatic-life": "fish",
  butterflies: "butterflies",
  "wildlife-art": "wildlife-art",
  "wildlife-photography": "wildlife-photography",
  "junior-yza": "junior-yza",
  "junior-yza-programme": "junior-yza",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveStudyGroupSlug(
  hash: string,
  groups: StudyGroupPageCard[],
): string | null {
  const normalized = hash.trim().replace(/^#/, "").toLowerCase();
  if (!normalized) return null;

  const candidates = [
    normalized,
    STUDY_GROUP_HASH_ALIASES[normalized] ?? "",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (groups.some((group) => group.slug === candidate)) {
      return candidate;
    }
  }

  const byName = groups.find((group) => slugify(group.name) === normalized);
  return byName?.slug ?? candidates[0] ?? null;
}

function getNavbarOffset(): number {
  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 88;
}

export function isStudyGroupSectionSnapped(element: HTMLElement, tolerance = 48): boolean {
  const top = element.getBoundingClientRect().top;
  return Math.abs(top - getNavbarOffset()) <= tolerance;
}

export function scrollToStudyGroupSection(
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

export function waitForStudyGroupSection(
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
