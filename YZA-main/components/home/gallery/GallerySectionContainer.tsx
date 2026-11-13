import { Suspense } from "react";
import { getGalleryPhotos, getHomePage, isWordPressConfigured } from "@/lib/api";
import { resolveGalleryContent } from "@/lib/home/gallery/resolveGalleryContent";
import { GallerySection } from "./GallerySection";
import { GalleryLoading } from "./GalleryLoading";

async function GalleryFetcher() {
  const fallback = resolveGalleryContent(null, null);

  if (!isWordPressConfigured()) {
    return <GallerySection content={fallback} />;
  }

  let section = null;
  let photos = null;

  try {
    const home = await getHomePage();
    section = home.gallery;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress gallery section fetch failed.", error);
    }
  }

  try {
    photos = await getGalleryPhotos();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress gallery photos CPT fetch failed.", error);
    }
  }

  return <GallerySection content={resolveGalleryContent(section, photos)} />;
}

export function GallerySectionContainer() {
  return (
    <Suspense fallback={<GalleryLoading />}>
      <GalleryFetcher />
    </Suspense>
  );
}
