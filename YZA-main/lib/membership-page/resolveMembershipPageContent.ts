import type { MembershipPageData } from "@/lib/api/types";
import type { MembershipPageContent } from "./membershipPageContent";
import { MEMBERSHIP_PAGE_CONTENT } from "./membershipPageContent";

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

export function resolveMembershipPageContent(
  data: MembershipPageData | null,
): MembershipPageContent {
  if (!data) return MEMBERSHIP_PAGE_CONTENT;

  return {
    pageTitle: pickText(data.pageTitle, MEMBERSHIP_PAGE_CONTENT.pageTitle),
    subtitle: pickText(data.subtitle, MEMBERSHIP_PAGE_CONTENT.subtitle),
    howToTitle: pickText(data.howToTitle, MEMBERSHIP_PAGE_CONTENT.howToTitle),
    howToSubtitle: hasText(data.howToSubtitle)
      ? data.howToSubtitle.trim()
      : MEMBERSHIP_PAGE_CONTENT.howToSubtitle,
    howToIntro: pickText(data.howToIntro, MEMBERSHIP_PAGE_CONTENT.howToIntro),
    branches: data.branches.length > 0 ? data.branches : MEMBERSHIP_PAGE_CONTENT.branches,
    instructions: {
      eyebrow: pickText(data.instructionsEyebrow, MEMBERSHIP_PAGE_CONTENT.instructions.eyebrow),
      html: hasText(data.instructionsHtml)
        ? data.instructionsHtml.trim()
        : MEMBERSHIP_PAGE_CONTENT.instructions.html,
    },
    mainBranchNotice: MEMBERSHIP_PAGE_CONTENT.mainBranchNotice,
    categoriesTitle: pickText(data.categoriesTitle, MEMBERSHIP_PAGE_CONTENT.categoriesTitle),
    categoriesIntro: MEMBERSHIP_PAGE_CONTENT.categoriesIntro,
    categories:
      data.categories.length > 0 ? data.categories : MEMBERSHIP_PAGE_CONTENT.categories,
    activeMembers:
      data.activeMembers && data.activeMembers.lists.length > 0
        ? data.activeMembers
        : MEMBERSHIP_PAGE_CONTENT.activeMembers,
  };
}
