import { Suspense } from "react";
import { getJuniorYzaPage, isWordPressConfigured } from "@/lib/api";
import { resolveJuniorYzaPageContent } from "@/lib/junior-yza-page/resolveJuniorYzaPageContent";
import { JuniorYzaPage } from "./JuniorYzaPage";
import { JuniorYzaPageLoading } from "./JuniorYzaPageLoading";

async function JuniorYzaPageFetcher() {
  const fallback = resolveJuniorYzaPageContent(null);

  if (!isWordPressConfigured()) {
    return <JuniorYzaPage content={fallback} />;
  }

  try {
    const page = await getJuniorYzaPage();
    const content = resolveJuniorYzaPageContent(page);
    return <JuniorYzaPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress Junior YZA page fetch failed, using fallback content.", error);
    }
    return <JuniorYzaPage content={fallback} />;
  }
}

export function JuniorYzaPageContainer() {
  return (
    <Suspense fallback={<JuniorYzaPageLoading />}>
      <JuniorYzaPageFetcher />
    </Suspense>
  );
}
