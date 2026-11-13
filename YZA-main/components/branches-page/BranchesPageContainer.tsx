import { Suspense } from "react";
import { getBranchesPage, isWordPressConfigured } from "@/lib/api";
import { resolveBranchesPageContent } from "@/lib/branches-page/resolveBranchesPageContent";
import { BranchesPage } from "./BranchesPage";
import { BranchesPageLoading } from "./BranchesPageLoading";

async function BranchesPageFetcher() {
  const fallback = resolveBranchesPageContent(null);

  if (!isWordPressConfigured()) {
    return <BranchesPage content={fallback} />;
  }

  try {
    const page = await getBranchesPage();
    const content = resolveBranchesPageContent(page);
    return <BranchesPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress branches page fetch failed, using fallback content.", error);
    }
    return <BranchesPage content={fallback} />;
  }
}

export function BranchesPageContainer() {
  return (
    <Suspense fallback={<BranchesPageLoading />}>
      <BranchesPageFetcher />
    </Suspense>
  );
}
