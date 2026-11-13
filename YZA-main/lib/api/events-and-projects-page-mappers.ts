import type {
  CollaborativeSectionData,
  EventsAndProjectsPageData,
  ProjectSectionData,
  SponsorshipSectionData,
} from "./types";
import type {
  EventsAndProjectsPageAcf,
  ProjectsSectionAcf,
  WpEventsAndProjectsPageResponse,
} from "./wordpress-types";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function mapProjectBlock(
  block: unknown,
  id: string,
  titleKey: string,
  descriptionKey: string,
): ProjectSectionData | null {
  const record = asRecord(block);
  const title = asString(record[titleKey]).trim();
  const description = asString(record[descriptionKey]).trim();
  if (!title && !description) return null;

  return {
    id,
    title: title || "Projects",
    description,
  };
}

function mapProjectSections(section: ProjectsSectionAcf): ProjectSectionData[] {
  const sections = [
    mapProjectBlock(
      section.projects_at_the_zoo,
      "zoo-based-programs",
      "projects_at_the_zoo_title",
      "projects_at_the_zoo_description",
    ),
    mapProjectBlock(
      section.projects_at_the_field,
      "field-based-projects",
      "projects_at_the_field_title",
      "projects_at_the_field_description",
    ),
    mapProjectBlock(
      section.event_programs,
      "event-programs",
      "event_programs_title",
      "event_programs_description",
    ),
    mapProjectBlock(
      section.awareness_projects,
      "awareness-programs",
      "awareness_projects_title",
      "awareness_projects_description",
    ),
  ];

  return sections.filter((section): section is ProjectSectionData => section !== null);
}

function mapSponsorNames(value: unknown): string[] {
  if (!value || value === false || !Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      const record = asRecord(item);
      return asString(
        record.sponsorship_name ??
          record.sponsor_name ??
          record.partnership_name ??
          record.name,
      ).trim();
    })
    .filter(Boolean);
}

function mapSponsorship(value: unknown): SponsorshipSectionData | null {
  const record = asRecord(value);
  const title = asString(record.partnership_name).trim();
  const description = asString(record.sponsorship_description).trim();
  const sponsorNames = mapSponsorNames(record.sponsors);

  if (!title && !description && sponsorNames.length === 0) return null;

  return {
    title: title || "Sponsorships",
    description,
    sponsorNames,
  };
}

function mapCollaborative(value: unknown): CollaborativeSectionData | null {
  const record = asRecord(value);
  const title = asString(record.collaborative_and_partnership_title).trim();
  const description = asString(record.collaborative_and_partnership_description).trim();

  if (!title && !description) return null;

  return {
    title: title || "Collaborative and Partnership",
    description,
  };
}

export function mapEventsAndProjectsPage(
  page: WpEventsAndProjectsPageResponse,
): EventsAndProjectsPageData {
  const acf = asRecord(page.acf) as EventsAndProjectsPageAcf & AcfRecord;
  const projectsSection = asRecord(acf.projects_section) as ProjectsSectionAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.events_and_projects_page_title, "Events and Projects").trim(),
    subtitle: asString(acf.events_and_projects_page_subtitle, "Our Events and Projects").trim(),
    projectSections: mapProjectSections(projectsSection),
    sponsorship: mapSponsorship(acf.in_sponsorship),
    collaborative: mapCollaborative(acf.collaborative_and_partnership),
  };
}
