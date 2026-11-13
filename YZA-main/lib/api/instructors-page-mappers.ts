import type { InstructorData, InstructorsPageData } from "./types";
import type {
  InstructorItemAcf,
  InstructorsPageAcf,
  WpInstructorsPageResponse,
} from "./wordpress-types";
import { mapAcfImage } from "./mappers";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mapInstructor(item: InstructorItemAcf, index: number): InstructorData | null {
  const name = asString(item.instructor_name).trim();
  if (!name) return null;

  return {
    id: index + 1,
    name,
    image: mapAcfImage(item.instructor_image, name),
  };
}

export function mapInstructorsPage(page: WpInstructorsPageResponse): InstructorsPageData {
  const acf = asRecord(page.acf) as InstructorsPageAcf & AcfRecord;
  const instructors = asArray<InstructorItemAcf>(acf.instructors)
    .map(mapInstructor)
    .filter((item): item is InstructorData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.instructors_page_title, "Instructors"),
    subtitle: asString(acf.instructors_page_subtitle, "Our Instructors"),
    instructors,
  };
}
