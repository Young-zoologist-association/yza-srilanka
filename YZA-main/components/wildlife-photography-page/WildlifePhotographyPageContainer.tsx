import { Suspense } from "react";
import {
  getGalleryPhotos,
  getHomePage,
  getWildlifePhotographyPage,
  isWordPressConfigured,
} from "@/lib/api";
import { resolveWildlifePhotographyPageContent } from "@/lib/wildlife-photography-page/resolveWildlifePhotographyPageContent";
import { WildlifePhotographyPage } from "./WildlifePhotographyPage";
import { WildlifePhotographyPageLoading } from "./WildlifePhotographyPageLoading";

async function WildlifePhotographyPageFetcher() {
  const fallback = resolveWildlifePhotographyPageContent(null, null, null);

  if (!isWordPressConfigured()) {
    return <WildlifePhotographyPage content={fallback} />;
  }

  let page = null;
  let gallerySection = null;
  let photos = null;

  try {
    page = await getWildlifePhotographyPage();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress wildlife photography page fetch failed.", error);
    }
  }

  try {
    const home = await getHomePage();
    gallerySection = home.gallery;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress home gallery section fetch failed.", error);
    }
  }

  try {
    photos = await getGalleryPhotos();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress gallery photos CPT fetch failed.", error);
    }
  }

  return (
    <WildlifePhotographyPage
      content={resolveWildlifePhotographyPageContent(page, gallerySection, photos)}
    />
  );
}

export function WildlifePhotographyPageContainer() {
  return (
    <Suspense fallback={<WildlifePhotographyPageLoading />}>
      <WildlifePhotographyPageFetcher />
    </Suspense>
  );
}
