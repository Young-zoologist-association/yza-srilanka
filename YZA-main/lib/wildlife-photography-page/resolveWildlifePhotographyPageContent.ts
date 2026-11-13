import type { GalleryPhoto, GallerySection, WildlifePhotographyPageData } from "@/lib/api/types";
import {
  GALLERY_FALLBACK,
  resolveGalleryContent,
  type GalleryPhotoContent,
} from "@/lib/home/gallery/resolveGalleryContent";

export interface WildlifePhotographyPageContent {
  pageTitle: string;
  subtitle: string;
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  heroImageUrl: string;
  photos: GalleryPhotoContent[];
}

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

export const WILDLIFE_PHOTOGRAPHY_PAGE_FALLBACK: WildlifePhotographyPageContent = {
  pageTitle: "Wildlife Photography",
  subtitle:
    "Explore the full collection of moments captured by YZA members across Sri Lanka's wild places.",
  eyebrow: GALLERY_FALLBACK.eyebrow,
  titlePlain: GALLERY_FALLBACK.titlePlain,
  titleHighlight: GALLERY_FALLBACK.titleHighlight,
  heroImageUrl: GALLERY_FALLBACK.photos[0]?.src ?? "",
  photos: GALLERY_FALLBACK.photos,
};

export function resolveWildlifePhotographyPageContent(
  page: WildlifePhotographyPageData | null,
  gallerySection: Pick<
    GallerySection,
    "eyebrow" | "titlePlain" | "titleHighlight"
  > | null,
  photos: GalleryPhoto[] | null,
): WildlifePhotographyPageContent {
  const gallery = resolveGalleryContent(gallerySection, photos);
  const fallback = WILDLIFE_PHOTOGRAPHY_PAGE_FALLBACK;

  const heroFromPage = page?.heroImage?.url?.trim();
  const heroFromGallery = gallery.photos[0]?.src ?? "";
  const heroImageUrl = heroFromPage || heroFromGallery || fallback.heroImageUrl;

  const subtitle =
    pickText(page?.subtitle, "") ||
    "Explore the full collection of moments captured by YZA members across Sri Lanka's wild places.";

  return {
    pageTitle: pickText(page?.pageTitle, fallback.pageTitle),
    subtitle,
    eyebrow: gallery.eyebrow,
    titlePlain: gallery.titlePlain,
    titleHighlight: gallery.titleHighlight,
    heroImageUrl,
    photos: gallery.photos,
  };
}
