import { Suspense } from "react";
import { getSymposiumPage, isWordPressConfigured } from "@/lib/api";
import { resolveSymposiumPageContent } from "@/lib/symposium-page/resolveSymposiumPageContent";
import { SymposiumPage } from "./SymposiumPage";
import { SymposiumPageLoading } from "./SymposiumPageLoading";

async function SymposiumPageFetcher() {
  const fallback = resolveSymposiumPageContent(null);

  if (!isWordPressConfigured()) {
    return <SymposiumPage content={fallback} />;
  }

  try {
    const page = await getSymposiumPage();
    const content = resolveSymposiumPageContent(page);
    return <SymposiumPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress symposium page fetch failed, using fallback content.", error);
    }
    return <SymposiumPage content={fallback} />;
  }
}

export function SymposiumPageContainer() {
  return (
    <Suspense fallback={<SymposiumPageLoading />}>
      <SymposiumPageFetcher />
    </Suspense>
  );
}
