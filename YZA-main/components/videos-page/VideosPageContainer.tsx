import { Suspense } from "react";
import { getVideosPage, isWordPressConfigured } from "@/lib/api";
import { resolveVideosPageContent } from "@/lib/videos-page/resolveVideosPageContent";
import { VideosPage } from "./VideosPage";
import { VideosPageLoading } from "./VideosPageLoading";

async function VideosPageFetcher() {
  const fallback = resolveVideosPageContent(null);

  if (!isWordPressConfigured()) {
    return <VideosPage content={fallback} />;
  }

  try {
    const page = await getVideosPage();
    const content = resolveVideosPageContent(page);
    return <VideosPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress videos page fetch failed, using fallback content.", error);
    }
    return <VideosPage content={fallback} />;
  }
}

export function VideosPageContainer() {
  return (
    <Suspense fallback={<VideosPageLoading />}>
      <VideosPageFetcher />
    </Suspense>
  );
}
