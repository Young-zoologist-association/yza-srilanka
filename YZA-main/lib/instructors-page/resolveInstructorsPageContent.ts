import type { InstructorData, InstructorsPageData } from "@/lib/api/types";

export interface InstructorsPageContent {
  pageTitle: string;
  subtitle: string;
  instructors: InstructorData[];
}

export const INSTRUCTORS_PAGE_FALLBACK: InstructorsPageContent = {
  pageTitle: "Instructors",
  subtitle: "Our Instructors",
  instructors: [
    { id: 1, name: "S.A. Janaka", image: { url: "", alt: "S.A. Janaka" } },
    { id: 2, name: "Nadun Shanaka", image: { url: "", alt: "Nadun Shanaka" } },
    { id: 3, name: "Dinithi Gamage", image: { url: "", alt: "Dinithi Gamage" } },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function normalizeInstructor(instructor: InstructorData, index: number): InstructorData {
  return {
    id: instructor.id || index + 1,
    name: pickText(instructor.name, "Instructor"),
    image: instructor.image?.url?.trim()
      ? {
          url: instructor.image.url,
          alt: pickText(instructor.image.alt, instructor.name),
        }
      : { url: "", alt: instructor.name },
  };
}

export function resolveInstructorsPageContent(
  data: InstructorsPageData | null,
): InstructorsPageContent {
  if (!data) return INSTRUCTORS_PAGE_FALLBACK;

  const instructors = (data.instructors ?? [])
    .map(normalizeInstructor)
    .filter((instructor) => instructor.name);

  return {
    pageTitle: pickText(data.pageTitle, INSTRUCTORS_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, INSTRUCTORS_PAGE_FALLBACK.subtitle),
    instructors: instructors.length > 0 ? instructors : INSTRUCTORS_PAGE_FALLBACK.instructors,
  };
}
