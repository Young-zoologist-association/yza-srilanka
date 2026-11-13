import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import {
  createPublicationPageResolver,
  type PublicationPageContent,
} from "@/lib/publication-archive/createPublicationPageResolver";

export const PANIVUDAYA_PAGE_FALLBACK: PublicationPageContent = {
  pageTitle: "පණිවුඩය",
  subtitle: "පණිවුඩය",
  heroImageUrl: PAGE_HERO_IMAGES.panivudaya,
  items: [],
};

export const resolvePanivudayaPageContent = createPublicationPageResolver(PANIVUDAYA_PAGE_FALLBACK);

export type PanivudayaPageContent = PublicationPageContent;
