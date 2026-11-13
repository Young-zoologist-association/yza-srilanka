import { Suspense } from "react";
import { getInstructorsPage, isWordPressConfigured } from "@/lib/api";
import { resolveInstructorsPageContent } from "@/lib/instructors-page/resolveInstructorsPageContent";
import { InstructorsPage } from "./InstructorsPage";
import { InstructorsPageLoading } from "./InstructorsPageLoading";

async function InstructorsPageFetcher() {
  const fallback = resolveInstructorsPageContent(null);

  if (!isWordPressConfigured()) {
    return <InstructorsPage content={fallback} />;
  }

  try {
    const page = await getInstructorsPage();
    const content = resolveInstructorsPageContent(page);
    return <InstructorsPage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress instructors page fetch failed, using fallback content.", error);
    }
    return <InstructorsPage content={fallback} />;
  }
}

export function InstructorsPageContainer() {
  return (
    <Suspense fallback={<InstructorsPageLoading />}>
      <InstructorsPageFetcher />
    </Suspense>
  );
}
