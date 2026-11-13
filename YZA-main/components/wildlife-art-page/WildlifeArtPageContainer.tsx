import { Suspense } from "react";
import { getWildlifeArtPage, isWordPressConfigured } from "@/lib/api";
import { resolveWildlifeArtPageContent } from "@/lib/wildlife-art-page/resolveWildlifeArtPageContent";
import { WildlifeArtPage } from "./WildlifeArtPage";
import { WildlifeArtPageLoading } from "./WildlifeArtPageLoading";

async function WildlifeArtPageFetcher() {
  const fallback = resolveWildlifeArtPageContent(null);

  if (!isWordPressConfigured()) {
    return <WildlifeArtPage content={fallback} />;
  }

  try {
    const page = await getWildlifeArtPage();
    const content = resolveWildlifeArtPageContent(page);
    return <WildlifeArtPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress wildlife art page fetch failed, using fallback content.", error);
    }
    return <WildlifeArtPage content={fallback} />;
  }
}

export function WildlifeArtPageContainer() {
  return (
    <Suspense fallback={<WildlifeArtPageLoading />}>
      <WildlifeArtPageFetcher />
    </Suspense>
  );
}
