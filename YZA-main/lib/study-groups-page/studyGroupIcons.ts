import {
  Bird,
  Bug,
  Camera,
  Fish,
  Flower2,
  Leaf,
  Palette,
  PawPrint,
  Rabbit,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const SLUG_ICON_MAP: Record<string, LucideIcon> = {
  birds: Bird,
  mammals: PawPrint,
  reptiles: Rabbit,
  amphibians: Bug,
  fish: Fish,
  butterflies: Bug,
  flora: Flower2,
  "wildlife-art": Palette,
  "wildlife-photography": Camera,
  "junior-yza": Sparkles,
};

const KEYWORD_ICON_MAP: Array<[string, LucideIcon]> = [
  ["bird", Bird],
  ["mammal", PawPrint],
  ["reptile", Rabbit],
  ["amphib", Bug],
  ["fish", Fish],
  ["aquatic", Fish],
  ["butterfly", Bug],
  ["flora", Flower2],
  ["plant", Flower2],
  ["photograph", Camera],
  ["photo", Camera],
  ["art", Palette],
  ["junior", Sparkles],
  ["youth", Sparkles],
  ["j yza", Sparkles],
];

export function getStudyGroupIcon(
  slug: string,
  name: string,
  tag: string,
): LucideIcon {
  const normalizedSlug = slug.trim().toLowerCase();
  if (SLUG_ICON_MAP[normalizedSlug]) {
    return SLUG_ICON_MAP[normalizedSlug];
  }

  const haystack = `${slug} ${name} ${tag}`.toLowerCase();
  const keywordMatch = KEYWORD_ICON_MAP.find(([keyword]) => haystack.includes(keyword));
  return keywordMatch?.[1] ?? Leaf;
}

export function isCreativeOrYouthStudyGroup(slug: string, name: string): boolean {
  const key = `${slug} ${name}`.toLowerCase();
  return (
    key.includes("wildlife-art") ||
    key.includes("wildlife art") ||
    key.includes("wildlife-photography") ||
    key.includes("wildlife photography") ||
    key.includes("junior-yza") ||
    key.includes("junior yza")
  );
}
