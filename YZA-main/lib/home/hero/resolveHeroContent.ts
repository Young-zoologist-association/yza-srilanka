import type { HeroData, WpImage } from "@/lib/api/types";

export interface HeroBackgroundSlide {
  url: string;
  alt: string;
}

export interface HeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  backgroundSlides: HeroBackgroundSlide[];
  ctas: {
    join: { label: string; url: string };
    discover: { label: string; url: string };
    events: { label: string; url: string };
  };
}

const FULL_ASSOCIATION_NAME = "Young Zoologists' Association of Sri Lanka";

/** Ensures legacy CMS / copy uses the full official name. */
export function ensureFullAssociationEyebrow(eyebrow: string): string {
  const trimmed = eyebrow.trim();
  if (!trimmed || trimmed.includes("of Sri Lanka")) {
    return trimmed;
  }

  return trimmed.replace(
    /^Young Zoologists' Association\b/,
    FULL_ASSOCIATION_NAME,
  );
}

export const HERO_FALLBACK: HeroContent = {
  eyebrow: `${FULL_ASSOCIATION_NAME} — Est. 1972`,
  headlineLine1: "Let's Protect Nature",
  headlineLine2: "Conservation Through Education.",
  subheadline:
    "Make conservation a habit and not an activity, through selfless dedication to the cause of environment and to instill the message in the hearts of the community.",
  backgroundSlides: [
    {
      url: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=1920&h=1080&fit=crop&auto=format",
      alt: "Dense tropical rainforest canopy",
    },
  ],
  ctas: {
    join: { label: "Join YZA", url: "/membership" },
    discover: { label: "Discover", url: "/about" },
    events: { label: "View Events", url: "/events-and-projects" },
  },
};

const LEGACY_CTA_URLS: Record<string, string> = {
  "#membership": "/membership",
  "#about": "/about",
  "#events": "/events-and-projects",
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function toSlide(image: WpImage, fallbackAlt: string): HeroBackgroundSlide {
  return {
    url: image.url.trim(),
    alt: pickText(image.alt, fallbackAlt),
  };
}

function pickBackgroundSlides(
  slides: WpImage[] | undefined,
  legacyImage: HeroData["backgroundImage"] | undefined,
  fallback: HeroBackgroundSlide[],
): HeroBackgroundSlide[] {
  const fromSlider = (slides ?? [])
    .filter((slide) => slide.url?.trim())
    .map((slide, index) => toSlide(slide, fallback[0]?.alt ?? `Hero slide ${index + 1}`));

  if (fromSlider.length > 0) {
    return fromSlider;
  }

  if (legacyImage?.url?.trim()) {
    return [toSlide(legacyImage, fallback[0]?.alt ?? "Hero background")];
  }

  return fallback;
}

function pickCta(
  cta: { label: string; url: string } | undefined,
  fallback: { label: string; url: string },
): { label: string; url: string } {
  const url = pickText(cta?.url, fallback.url);
  return {
    label: pickText(cta?.label, fallback.label),
    url: LEGACY_CTA_URLS[url] ?? url,
  };
}

/**
 * Merges WordPress hero ACF data with static fallbacks for any missing fields.
 */
export function resolveHeroContent(cmsHero?: HeroData | null): HeroContent {
  if (!cmsHero) {
    return HERO_FALLBACK;
  }

  const eyebrow = ensureFullAssociationEyebrow(
    pickText(cmsHero.eyebrow, HERO_FALLBACK.eyebrow),
  );

  return {
    eyebrow,
    headlineLine1: pickText(cmsHero.headlinePrefix, HERO_FALLBACK.headlineLine1),
    headlineLine2: pickText(cmsHero.headlineSecondary, HERO_FALLBACK.headlineLine2),
    subheadline: pickText(cmsHero.subheadline, HERO_FALLBACK.subheadline),
    backgroundSlides: pickBackgroundSlides(
      cmsHero.backgroundSlides,
      cmsHero.backgroundImage,
      HERO_FALLBACK.backgroundSlides,
    ),
    ctas: {
      join: pickCta(cmsHero.ctas?.join, HERO_FALLBACK.ctas.join),
      discover: pickCta(cmsHero.ctas?.discover, HERO_FALLBACK.ctas.discover),
      events: pickCta(cmsHero.ctas?.events, HERO_FALLBACK.ctas.events),
    },
  };
}
