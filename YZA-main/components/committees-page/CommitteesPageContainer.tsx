import { Suspense } from "react";
import { getCommitteesPage, isWordPressConfigured } from "@/lib/api";
import { resolveCommitteesPageContent } from "@/lib/committees-page/resolveCommitteesPageContent";
import { CommitteesPage } from "./CommitteesPage";
import { CommitteesPageLoading } from "./CommitteesPageLoading";

async function CommitteesPageFetcher() {
  const fallback = resolveCommitteesPageContent(null);

  if (!isWordPressConfigured()) {
    return <CommitteesPage content={fallback} />;
  }

  try {
    const page = await getCommitteesPage();
    const content = resolveCommitteesPageContent(page);
    return <CommitteesPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress committees page fetch failed, using fallback content.", error);
    }
    return <CommitteesPage content={fallback} />;
  }
}

export function CommitteesPageContainer() {
  return (
    <Suspense fallback={<CommitteesPageLoading />}>
      <CommitteesPageFetcher />
    </Suspense>
  );
}
