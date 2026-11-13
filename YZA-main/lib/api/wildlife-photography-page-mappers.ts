import type { WildlifePhotographyPageData } from "./types";
import type {
  WildlifePhotographyPageAcf,
  WpWildlifePhotographyPageResponse,
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

export function mapWildlifePhotographyPage(
  page: WpWildlifePhotographyPageResponse,
): WildlifePhotographyPageData {
  const acf = asRecord(page.acf) as WildlifePhotographyPageAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.wildlife_photography_title, "Wildlife Photography"),
    subtitle: asString(acf.wildlife_photography_page_subtitle),
    heroImage: mapAcfImage(
      acf.wildlife_photography_page_hero_background_image,
      "Wildlife Photography",
    ),
  };
}
