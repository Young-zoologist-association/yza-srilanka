import type { NaturalistPageData } from "@/lib/api/types";
import { resolveNaturalistPageContent } from "@/lib/naturalist-page/resolveNaturalistPageContent";

export type NaturalistGuidelinesPageContent = ReturnType<
  typeof resolveNaturalistGuidelinesPageContent
>;

export function resolveNaturalistGuidelinesPageContent(data: NaturalistPageData | null) {
  const naturalist = resolveNaturalistPageContent(data);

  return {
    pageTitle: "Naturalist Guidelines",
    subtitle:
      "Official field guidance for young naturalists — observation, ethics, and documentation across Sri Lanka's ecosystems.",
    guidelines: naturalist.guidelines,
  };
}
