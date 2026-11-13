import type { EventItem, EventsSection } from "@/lib/api/types";

export interface EventCardContent {
  id: number;
  title: string;
  dateDisplay: string;
  day: string;
  month: string;
  time: string;
  location: string;
  category: string;
  categoryColor: string;
  description: string;
  featured: boolean;
}

export interface EventsContent {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  description: string;
  calendarMonth: string;
  detailsButtonLabel: string;
  cards: EventCardContent[];
}

export const EVENTS_FALLBACK: EventsContent = {
  eyebrow: "What's Coming Up",
  titlePlain: "Upcoming",
  titleHighlight: "Events",
  description:
    "From dawn field surveys to national symposiums — join our active community on adventures across Sri Lanka's habitats.",
  calendarMonth: "July 2025",
  detailsButtonLabel: "Details",
  cards: [
    {
      id: 1,
      title: "Sinharaja Rainforest Bird Survey",
      dateDisplay: "12/07/2025",
      day: "12",
      month: "JUL",
      time: "5:30 AM – 6:00 PM",
      location: "Sinharaja Forest Reserve, Sabaragamuwa",
      category: "Field Study",
      categoryColor: "#1F8A7B",
      description:
        "A three-day intensive bird survey in the UNESCO World Heritage Site. Participants will record sightings, conduct point counts, and prepare a comprehensive species checklist.",
      featured: true,
    },
    {
      id: 2,
      title: "Herpetofauna Workshop — Kandy",
      dateDisplay: "03/08/2025",
      day: "03",
      month: "AUG",
      time: "9:00 AM – 4:00 PM",
      location: "Peradeniya University, Kandy",
      category: "Workshop",
      categoryColor: "#A0673A",
      description:
        "An interactive workshop on field identification of Sri Lankan reptiles and amphibians. Expert herpetologists will lead sessions on key identification features.",
      featured: false,
    },
    {
      id: 3,
      title: "Coastal Marine Biodiversity Transect",
      dateDisplay: "17/08/2025",
      day: "17",
      month: "AUG",
      time: "7:00 AM – 5:00 PM",
      location: "Hikkaduwa Marine Sanctuary, Southern Province",
      category: "Marine Survey",
      categoryColor: "#1F8A7B",
      description:
        "Snorkeling-based survey of fish, coral, and invertebrate species across designated transects. Open to certified swimmers with basic snorkeling experience.",
      featured: false,
    },
    {
      id: 4,
      title: "YZA Annual Symposium 2025",
      dateDisplay: "06/09/2025",
      day: "06",
      month: "SEP",
      time: "8:00 AM – 6:00 PM",
      location: "BMICH, Colombo 7",
      category: "Symposium",
      categoryColor: "#F2A93B",
      description:
        "The flagship annual event of YZA Sri Lanka — presentations by members, keynote talks by leading naturalists, poster sessions, and the YZA Awards Ceremony.",
      featured: false,
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function mapCard(event: EventItem, index: number): EventCardContent {
  const fallback = EVENTS_FALLBACK.cards[index % EVENTS_FALLBACK.cards.length];

  return {
    id: event.id,
    title: pickText(event.title, fallback.title),
    dateDisplay: pickText(event.dateDisplay, fallback.dateDisplay),
    day: pickText(event.day, fallback.day),
    month: pickText(event.month, fallback.month),
    time: pickText(event.time, fallback.time),
    location: pickText(event.location, fallback.location),
    category: pickText(event.category, fallback.category),
    categoryColor: hasText(event.categoryColor)
      ? event.categoryColor
      : fallback.categoryColor,
    description: pickText(event.description, fallback.description),
    featured: event.featured,
  };
}

function pickCards(cards: EventItem[] | null | undefined): EventCardContent[] {
  const mapped = (cards ?? [])
    .filter((card) => card.title.trim())
    .map((card, index) => mapCard(card, index));

  return mapped.length > 0 ? mapped : EVENTS_FALLBACK.cards;
}

export function resolveEventsContent(
  section?: Pick<
    EventsSection,
    | "eyebrow"
    | "titlePlain"
    | "titleHighlight"
    | "description"
    | "calendarMonth"
    | "detailsButtonLabel"
  > | null,
  cards?: EventItem[] | null,
): EventsContent {
  return {
    eyebrow: pickText(section?.eyebrow, EVENTS_FALLBACK.eyebrow),
    titlePlain: pickText(section?.titlePlain, EVENTS_FALLBACK.titlePlain),
    titleHighlight: pickText(section?.titleHighlight, EVENTS_FALLBACK.titleHighlight),
    description: pickText(section?.description, EVENTS_FALLBACK.description),
    calendarMonth: pickText(section?.calendarMonth, EVENTS_FALLBACK.calendarMonth),
    detailsButtonLabel: pickText(
      section?.detailsButtonLabel,
      EVENTS_FALLBACK.detailsButtonLabel,
    ),
    cards: pickCards(cards),
  };
}
