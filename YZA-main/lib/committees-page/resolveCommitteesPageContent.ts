import type { CommitteeData, CommitteesPageData } from "@/lib/api/types";

export interface CommitteesPageContent {
  pageTitle: string;
  committees: CommitteeData[];
}

export const COMMITTEES_PAGE_FALLBACK: CommitteesPageContent = {
  pageTitle: "COMMITTEES",
  committees: [
    {
      title: "Education Committee",
      description:
        "The committee organizes educational programs. The committee maintains the resource center (library) of the YZA. The main function is to handle the 5 groups of study. The committee is also responsible in organizing the annual exam for all five groups and certifying the well educated.",
      image: { url: "", alt: "Education Committee" },
    },
    {
      title: "Public Relations Committee",
      description:
        "This committee coordinates activities with branch organizations and conduct educational programs for the public. Specially conducts Lectures and Workshops in Schools and Dhamma (Sunday) Schools.",
      image: { url: "", alt: "Public Relations Committee" },
    },
    {
      title: "Publications Committee",
      description:
        "Publication committee handles and is a proud publisher of some very informative publications of YZA. The publications of YZA are an important aspect of the knowledge and the contribution of awareness to the public.",
      image: { url: "", alt: "Publications Committee" },
    },
    {
      title: "Research Committee",
      description:
        "Research committee is the corner-stand of YZA. It is through research that YZA achieves its ultimate goal of nature conservation.",
      image: { url: "", alt: "Research Committee" },
    },
    {
      title: "Environmental Action Committee",
      description:
        "This committee carries out the groundwork of conservation programs by handling campaigns, protests and movements. The main objective of this committee is to be involved in finding solutions for environmental programs in Sri Lanka, by analyzing the solution and the course for the situation.",
      image: { url: "", alt: "Environmental Action Committee" },
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function pickCommittees(
  committees: CommitteeData[] | undefined,
  fallback: CommitteeData[],
): CommitteeData[] {
  if (!committees?.length) return fallback;

  return committees.map((committee, index) => {
    const fallbackCommittee = fallback[index];
    return {
      title: pickText(committee.title, fallbackCommittee?.title ?? "Committee"),
      description: pickText(
        committee.description,
        fallbackCommittee?.description ?? "",
      ),
      image: committee.image?.url?.trim()
        ? {
            url: committee.image.url,
            alt: pickText(committee.image.alt, committee.title),
          }
        : (fallbackCommittee?.image ?? { url: "", alt: committee.title }),
    };
  });
}

export function resolveCommitteesPageContent(
  data: CommitteesPageData | null,
): CommitteesPageContent {
  if (!data) return COMMITTEES_PAGE_FALLBACK;

  return {
    pageTitle: pickText(data.pageTitle, COMMITTEES_PAGE_FALLBACK.pageTitle),
    committees: pickCommittees(data.committees, COMMITTEES_PAGE_FALLBACK.committees),
  };
}
