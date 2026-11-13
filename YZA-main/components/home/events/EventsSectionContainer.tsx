import { Suspense } from "react";
import { getEvents, getHomePage, isWordPressConfigured } from "@/lib/api";
import { resolveEventsContent } from "@/lib/home/events/resolveEventsContent";
import { EventsSection } from "./EventsSection";
import { EventsLoading } from "./EventsLoading";

async function EventsFetcher() {
  const fallback = resolveEventsContent(null, null);

  if (!isWordPressConfigured()) {
    return <EventsSection content={fallback} />;
  }

  let section = null;
  let events = null;

  try {
    const home = await getHomePage();
    section = home.events;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress events section fetch failed.", error);
    }
  }

  try {
    events = await getEvents();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress events CPT fetch failed.", error);
    }
  }

  return <EventsSection content={resolveEventsContent(section, events)} />;
}

export function EventsSectionContainer() {
  return (
    <Suspense fallback={<EventsLoading />}>
      <EventsFetcher />
    </Suspense>
  );
}
