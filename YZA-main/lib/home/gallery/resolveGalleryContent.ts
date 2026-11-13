import type { GalleryPhoto, GallerySection } from "@/lib/api/types";

export interface GalleryPhotoContent {
  id: number;
  src: string;
  alt: string;
  tag: string;
  tagColor: string;
}

export interface GalleryContent {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  photos: GalleryPhotoContent[];
}

const TAG_COLORS: Record<string, string> = {
  Birds: "#1F8A7B",
  Mammals: "#A0673A",
  Amphibians: "#3F7A4E",
  Marine: "#1F8A7B",
  Reptiles: "#3F7A4E",
  Butterflies: "#F2A93B",
  Flora: "#3F7A4E",
  Habitat: "#A0673A",
  "Field Study": "#3F7A4E",
};

export const GALLERY_FALLBACK: GalleryContent = {
  eyebrow: "Visual Storytelling",
  titlePlain: "Nature Through",
  titleHighlight: "Our Lens",
  photos: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1682788820676-2d68c93d3346?w=500&h=650&fit=crop&auto=format",
      alt: "Colorful toucan in tropical jungle",
      tag: "Birds",
      tagColor: "#1F8A7B",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&h=400&fit=crop&auto=format",
      alt: "Elephant walking during golden hour",
      tag: "Mammals",
      tagColor: "#A0673A",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=500&h=380&fit=crop&auto=format",
      alt: "Red-eyed tree frog on leaf",
      tag: "Amphibians",
      tagColor: "#3F7A4E",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1637308107894-0971cb8622ed?w=500&h=560&fit=crop&auto=format",
      alt: "School of fish over a coral reef",
      tag: "Marine",
      tagColor: "#1F8A7B",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1778439799363-6cd2e43f36ba?w=500&h=420&fit=crop&auto=format",
      alt: "Bright green lizard with spiky crest",
      tag: "Reptiles",
      tagColor: "#3F7A4E",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1664428622883-c7fdd8eb413e?w=500&h=480&fit=crop&auto=format",
      alt: "Butterfly resting on a flower",
      tag: "Butterflies",
      tagColor: "#F2A93B",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1682788819488-5f894b553503?w=500&h=600&fit=crop&auto=format",
      alt: "Vibrant tropical bird perched on branch",
      tag: "Birds",
      tagColor: "#1F8A7B",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1568576599114-b9aa87edd0e1?w=500&h=360&fit=crop&auto=format",
      alt: "Exotic tropical plant with pink leaves",
      tag: "Flora",
      tagColor: "#3F7A4E",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=500&h=440&fit=crop&auto=format",
      alt: "Lush green rainforest canopy",
      tag: "Habitat",
      tagColor: "#A0673A",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1679348181038-e68f4ca9f3f4?w=500&h=500&fit=crop&auto=format",
      alt: "YZA members on a forest field study",
      tag: "Field Study",
      tagColor: "#3F7A4E",
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function getTagColor(tag: string, explicitColor?: string): string {
  if (hasText(explicitColor)) {
    return explicitColor;
  }
  return TAG_COLORS[tag] ?? "#3F7A4E";
}

function mapPhoto(photo: GalleryPhoto, index: number): GalleryPhotoContent {
  const fallback = GALLERY_FALLBACK.photos[index % GALLERY_FALLBACK.photos.length];
  const tag = pickText(photo.tag, fallback.tag);
  const src = hasText(photo.image?.url) ? photo.image.url : fallback.src;
  const alt = hasText(photo.image?.alt)
    ? photo.image.alt
    : pickText(tag, fallback.alt);

  return {
    id: photo.id,
    src,
    alt,
    tag,
    tagColor: getTagColor(tag, photo.tagColor),
  };
}

function pickPhotos(photos: GalleryPhoto[] | null | undefined): GalleryPhotoContent[] {
  const mapped = (photos ?? [])
    .map((photo, index) => mapPhoto(photo, index))
    .filter((photo) => photo.src.trim());

  return mapped.length > 0 ? mapped : GALLERY_FALLBACK.photos;
}

export function resolveGalleryContent(
  section?: Pick<
    GallerySection,
    "eyebrow" | "titlePlain" | "titleHighlight"
  > | null,
  photos?: GalleryPhoto[] | null,
): GalleryContent {
  return {
    eyebrow: pickText(section?.eyebrow, GALLERY_FALLBACK.eyebrow),
    titlePlain: pickText(section?.titlePlain, GALLERY_FALLBACK.titlePlain),
    titleHighlight: pickText(
      section?.titleHighlight,
      GALLERY_FALLBACK.titleHighlight,
    ),
    photos: pickPhotos(photos),
  };
}
