import { Suspense } from "react";
import { getNaturalistPage, isWordPressConfigured } from "@/lib/api";
import { resolveNaturalistPageContent } from "@/lib/naturalist-page/resolveNaturalistPageContent";
import { NaturalistPage } from "./NaturalistPage";
import { NaturalistPageLoading } from "./NaturalistPageLoading";

async function NaturalistPageFetcher() {
  const fallback = resolveNaturalistPageContent(null);

  if (!isWordPressConfigured()) {
    return <NaturalistPage content={fallback} />;
  }

  try {
    const page = await getNaturalistPage();
    const content = resolveNaturalistPageContent(page);
    return <NaturalistPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress naturalist page fetch failed, using fallback content.", error);
    }
    return <NaturalistPage content={fallback} />;
  }
}

export function NaturalistPageContainer() {
  return (
    <Suspense fallback={<NaturalistPageLoading />}>
      <NaturalistPageFetcher />
    </Suspense>
  );
}
