import { Suspense } from "react";
import { getNewsAndUpdatesPage, isWordPressConfigured } from "@/lib/api";
import { resolveNewsAndUpdatesPageContent } from "@/lib/news-and-updates-page/resolveNewsAndUpdatesPageContent";
import { NewsAndUpdatesPage } from "./NewsAndUpdatesPage";
import { NewsAndUpdatesPageLoading } from "./NewsAndUpdatesPageLoading";

async function NewsAndUpdatesPageFetcher() {
  const fallback = resolveNewsAndUpdatesPageContent(null);

  if (!isWordPressConfigured()) {
    return <NewsAndUpdatesPage content={fallback} />;
  }

  try {
    const page = await getNewsAndUpdatesPage();
    const content = resolveNewsAndUpdatesPageContent(page);
    return <NewsAndUpdatesPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress news and updates page fetch failed, using fallback content.", error);
    }
    return <NewsAndUpdatesPage content={fallback} />;
  }
}

export function NewsAndUpdatesPageContainer() {
  return (
    <Suspense fallback={<NewsAndUpdatesPageLoading />}>
      <NewsAndUpdatesPageFetcher />
    </Suspense>
  );
}
