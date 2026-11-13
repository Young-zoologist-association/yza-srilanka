import { Suspense } from "react";
import { getNaturalistPage, isWordPressConfigured } from "@/lib/api";
import { resolveNaturalistGuidelinesPageContent } from "@/lib/naturalist-guidelines-page/resolveNaturalistGuidelinesPageContent";
import { NaturalistGuidelinesPage } from "./NaturalistGuidelinesPage";
import { NaturalistGuidelinesPageLoading } from "./NaturalistGuidelinesPageLoading";

async function NaturalistGuidelinesPageFetcher() {
  const fallback = resolveNaturalistGuidelinesPageContent(null);

  if (!isWordPressConfigured()) {
    return <NaturalistGuidelinesPage content={fallback} />;
  }

  try {
    const page = await getNaturalistPage();
    return (
      <NaturalistGuidelinesPage content={resolveNaturalistGuidelinesPageContent(page)} />
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress naturalist guidelines fetch failed.", error);
    }
    return <NaturalistGuidelinesPage content={fallback} />;
  }
}

export function NaturalistGuidelinesPageContainer() {
  return (
    <Suspense fallback={<NaturalistGuidelinesPageLoading />}>
      <NaturalistGuidelinesPageFetcher />
    </Suspense>
  );
}
