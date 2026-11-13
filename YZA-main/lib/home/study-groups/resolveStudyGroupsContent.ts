import type { StudyGroup, StudyGroupsSection } from "@/lib/api/types";

export interface StudyGroupCardContent {
  id: number;
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  accentColor: string;
}

export interface StudyGroupsContent {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  description: string;
  cards: StudyGroupCardContent[];
}

const ACCENT_COLORS = ["#1F8A7B", "#A0673A", "#3F7A4E", "#3F7A4E", "#1F8A7B", "#F2A93B", "#3F7A4E"];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const STUDY_GROUPS_FALLBACK: StudyGroupsContent = {
  eyebrow: "Biological Divisions",
  titlePlain: "Our",
  titleHighlight: "Study Groups",
  description:
    "From taxonomic field study to wildlife art, photography, and junior programmes—our groups conduct surveys, exhibitions, field camps, and awareness activities across Sri Lanka.",
  cards: [
    {
      id: 1,
      slug: "birds",
      name: "Birds",
      tag: "Aves",
      description:
        "Sri Lanka hosts 240+ bird species including 33 endemics. We study avian ecology, migration patterns, and nesting behaviors.",
      image:
        "https://images.unsplash.com/photo-1682788820676-2d68c93d3346?w=500&h=380&fit=crop&auto=format",
      accentColor: "#1F8A7B",
    },
    {
      id: 2,
      slug: "mammals",
      name: "Mammals",
      tag: "Mammalia",
      description:
        "From Asian elephants to elusive leopards — we track, document, and protect Sri Lanka's iconic mammal species.",
      image:
        "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&h=380&fit=crop&auto=format",
      accentColor: "#A0673A",
    },
    {
      id: 3,
      slug: "reptiles",
      name: "Reptiles",
      tag: "Reptilia",
      description:
        "Home to 200+ reptile species, Sri Lanka is a herpetological hotspot. We survey and document endemic lizards, snakes, and turtles.",
      image:
        "https://images.unsplash.com/photo-1778439799363-6cd2e43f36ba?w=500&h=380&fit=crop&auto=format",
      accentColor: "#3F7A4E",
    },
    {
      id: 4,
      slug: "amphibians",
      name: "Amphibians",
      tag: "Amphibia",
      description:
        "Sri Lanka's rainforests shelter over 100 amphibian species, many found nowhere else on Earth. We monitor their fragile habitats.",
      image:
        "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=500&h=380&fit=crop&auto=format",
      accentColor: "#3F7A4E",
    },
    {
      id: 5,
      slug: "fish",
      name: "Fish",
      tag: "Pisces",
      description:
        "From freshwater streams to coral reefs, we study aquatic biodiversity and advocate for marine and riverine conservation.",
      image:
        "https://images.unsplash.com/photo-1637308107894-0971cb8622ed?w=500&h=380&fit=crop&auto=format",
      accentColor: "#1F8A7B",
    },
    {
      id: 6,
      slug: "butterflies",
      name: "Butterflies",
      tag: "Lepidoptera",
      description:
        "With 245 recorded species, Sri Lanka's butterfly fauna is remarkable. We run transect counts and habitat assessments.",
      image:
        "https://images.unsplash.com/photo-1664428622883-c7fdd8eb413e?w=500&h=380&fit=crop&auto=format",
      accentColor: "#F2A93B",
    },
    {
      id: 7,
      slug: "flora",
      name: "Flora",
      tag: "Plantae",
      description:
        "Sri Lanka's plant diversity underpins all wildlife. We document endemic flowering plants, trees, and medicinal species.",
      image:
        "https://images.unsplash.com/photo-1568576599114-b9aa87edd0e1?w=500&h=380&fit=crop&auto=format",
      accentColor: "#3F7A4E",
    },
    {
      id: 8,
      slug: "wildlife-art",
      name: "Wildlife Art",
      tag: "Creative",
      description:
        "Members express conservation through painting, illustration, and mixed media—celebrating Sri Lanka's biodiversity and exhibiting work at YZA's annual wildlife art events.",
      image: "/images/page-heroes/wildlife-art-hero.png",
      accentColor: "#A0673A",
    },
    {
      id: 9,
      slug: "wildlife-photography",
      name: "Wildlife Photography",
      tag: "Creative",
      description:
        "Ethical wildlife photography across Sri Lanka's habitats—field outings, technique workshops, and member showcases that tell the story of our natural heritage.",
      image:
        "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=500&h=380&fit=crop&auto=format",
      accentColor: "#1F8A7B",
    },
    {
      id: 10,
      slug: "junior-yza",
      name: "Junior YZA",
      tag: "Youth Programme",
      description:
        "JYZA welcomes children aged 6–12 to age-appropriate nature activities at the National Zoological Gardens, Dehiwala—building early appreciation for wildlife and conservation.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=380&fit=crop&auto=format",
      accentColor: "#F2A93B",
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function mapCard(group: StudyGroup, index: number): StudyGroupCardContent {
  const fallback = STUDY_GROUPS_FALLBACK.cards[index % STUDY_GROUPS_FALLBACK.cards.length];

  return {
    id: group.id,
    slug: hasText(group.slug) ? group.slug : slugify(pickText(group.name, fallback.name)),
    name: pickText(group.name, fallback.name),
    tag: pickText(group.tag, fallback.tag),
    description: pickText(group.description, fallback.description),
    image: hasText(group.image?.url) ? group.image.url : fallback.image,
    accentColor: hasText(group.accentColor)
      ? group.accentColor
      : ACCENT_COLORS[index % ACCENT_COLORS.length],
  };
}

function pickCards(cards: StudyGroup[] | null | undefined): StudyGroupCardContent[] {
  const mapped = (cards ?? [])
    .filter((card) => card.name.trim())
    .map((card, index) => mapCard(card, index));

  return mapped.length > 0 ? mapped : STUDY_GROUPS_FALLBACK.cards;
}

/**
 * Merges home page section ACF fields with Study Groups CPT card data.
 */
export function resolveStudyGroupsContent(
  section?: Pick<
    StudyGroupsSection,
    "eyebrow" | "titlePlain" | "titleHighlight" | "description"
  > | null,
  cards?: StudyGroup[] | null,
): StudyGroupsContent {
  return {
    eyebrow: pickText(section?.eyebrow, STUDY_GROUPS_FALLBACK.eyebrow),
    titlePlain: pickText(section?.titlePlain, STUDY_GROUPS_FALLBACK.titlePlain),
    titleHighlight: pickText(
      section?.titleHighlight,
      STUDY_GROUPS_FALLBACK.titleHighlight,
    ),
    description: pickText(section?.description, STUDY_GROUPS_FALLBACK.description),
    cards: pickCards(cards),
  };
}
