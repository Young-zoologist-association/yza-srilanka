import type { EventsAndProjectsPageData, ProjectSectionData } from "@/lib/api/types";

export interface EventsAndProjectsPageContent {
  pageTitle: string;
  subtitle: string;
  projectSections: ProjectSectionData[];
}

export const EVENTS_AND_PROJECTS_PAGE_FALLBACK: EventsAndProjectsPageContent = {
  pageTitle: "Events and Projects",
  subtitle: "Our Events and Projects",
  projectSections: [
    {
      id: "zoo-based-programs",
      title: "Zoo-Based Programs",
      description:
        "YZA conducts a wide range of zoo-based programs at the National Zoological Gardens, providing members with valuable opportunities to learn about wildlife, biodiversity, conservation, and scientific research through practical and interactive experiences.",
    },
    {
      id: "field-based-projects",
      title: "Field-Based Projects",
      description:
        "The Young Zoologists' Association of Sri Lanka extends its conservation efforts beyond the boundaries of the National Zoological Gardens, actively engaging in a variety of field-based projects across Sri Lanka.",
    },
    {
      id: "event-programs",
      title: "Events",
      description:
        "The Young Zoologists' Association conducts several annual flagship events that promote wildlife conservation, environmental education, and public awareness.",
    },
    {
      id: "awareness-programs",
      title: "Awareness Programs",
      description:
        "The Young Zoologists' Association conducts a wide range of awareness programs targeting students and the general public to promote wildlife conservation and environmental protection.",
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeProjectSection(section: ProjectSectionData): ProjectSectionData | null {
  const title = pickText(section.title, "");
  const description = section.description?.trim() ?? "";
  if (!title && !description) return null;

  return {
    id: section.id,
    title: title || "Projects",
    description,
  };
}

export function resolveEventsAndProjectsPageContent(
  data: EventsAndProjectsPageData | null,
): EventsAndProjectsPageContent {
  if (!data) return EVENTS_AND_PROJECTS_PAGE_FALLBACK;

  const projectSections = (data.projectSections ?? [])
    .map(normalizeProjectSection)
    .filter((section): section is ProjectSectionData => section !== null);

  return {
    pageTitle: pickText(data.pageTitle, EVENTS_AND_PROJECTS_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, EVENTS_AND_PROJECTS_PAGE_FALLBACK.subtitle),
    projectSections:
      projectSections.length > 0
        ? projectSections
        : EVENTS_AND_PROJECTS_PAGE_FALLBACK.projectSections,
  };
}
