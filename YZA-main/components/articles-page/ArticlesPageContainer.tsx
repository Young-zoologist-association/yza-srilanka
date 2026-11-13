import { Suspense } from "react";
import { getArticlesPage, isWordPressConfigured } from "@/lib/api";
import { resolveArticlesPageContent } from "@/lib/articles-page/resolveArticlesPageContent";
import { ArticlesPageLoading } from "./ArticlesPageLoading";
import { ArticlesPage } from "./ArticlesPage";

async function ArticlesPageFetcher() {
  const fallback = resolveArticlesPageContent(null);

  if (!isWordPressConfigured()) {
    return <ArticlesPage content={fallback} />;
  }

  try {
    const page = await getArticlesPage();
    const content = resolveArticlesPageContent(page);
    return <ArticlesPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress articles page fetch failed, using fallback content.", error);
    }
    return <ArticlesPage content={fallback} />;
  }
}

export function ArticlesPageContainer() {
  return (
    <Suspense fallback={<ArticlesPageLoading />}>
      <ArticlesPageFetcher />
    </Suspense>
  );
}
