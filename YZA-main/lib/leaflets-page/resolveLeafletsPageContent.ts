import type { PdfResourceItemData } from "@/lib/api/types";
import {
  resolvePdfArchiveContent,
  type PdfArchivePageContent,
} from "@/lib/pdf-archive/resolvePdfArchiveContent";
import type { LeafletsPageData } from "@/lib/api/types";

const FALLBACK_LEAFLETS: PdfResourceItemData[] = [
  {
    id: "vanilla-moonii-leaflet",
    title: "දැඩි ලෙස වඳවී යාමේ තර්ජනයට ලක්වූ Vanilla moonii",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/Vanilla-moonii-leaflet.pdf",
    filename: "Vanilla-moonii-leaflet.pdf",
    filesize: 3563106,
    date: "27/06/2026",
  },
  {
    id: "mangrove-forest",
    title: "කඩොලාන වනාන්තර (Mangrove Forest)",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/mangrove-forest.pdf",
    filename: "mangrove-forest.pdf",
    filesize: 932201,
    date: "27/06/2026",
  },
  {
    id: "whale-watching",
    title: "ශ්‍රී ලංකාව අවට මුහුදු ක්ෂීරපායින්",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/whale-watching-doc.pdf",
    filename: "whale-watching-doc.pdf",
    filesize: 20222224,
    date: "27/06/2026",
  },
  {
    id: "fa-hien-cave",
    title: "Fa-Hien Cave",
    pdfUrl: "http://yzasrilanka.local/wp-content/uploads/2026/06/pahiyangala.pdf",
    filename: "pahiyangala.pdf",
    filesize: 1444740,
    date: "27/06/2026",
  },
];

export const LEAFLETS_PAGE_FALLBACK: PdfArchivePageContent = {
  pageTitle: "Leaflets",
  subtitle:
    "Browse educational leaflets created by YZA Sri Lanka to promote wildlife conservation, environmental awareness, and sustainable living.",
  heroImageUrl: "",
  items: FALLBACK_LEAFLETS,
};

export function resolveLeafletsPageContent(data: LeafletsPageData | null): PdfArchivePageContent {
  if (!data) return LEAFLETS_PAGE_FALLBACK;

  return resolvePdfArchiveContent(
    {
      pageTitle: data.pageTitle,
      subtitle: data.subtitle,
      heroImage: data.heroImage,
      items: data.leaflets,
    },
    LEAFLETS_PAGE_FALLBACK,
  );
}

export type LeafletsPageContent = PdfArchivePageContent;
