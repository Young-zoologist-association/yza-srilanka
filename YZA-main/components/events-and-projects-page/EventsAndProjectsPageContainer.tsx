import { Suspense } from "react";
import {
  getEvents,
  getEventsAndProjectsPage,
  getHomePage,
  isWordPressConfigured,
} from "@/lib/api";
import { resolveEventsContent } from "@/lib/home/events/resolveEventsContent";
import { resolveEventsAndProjectsPageContent } from "@/lib/events-and-projects-page/resolveEventsAndProjectsPageContent";
import { EventsAndProjectsPage } from "./EventsAndProjectsPage";
import { EventsAndProjectsPageLoading } from "./EventsAndProjectsPageLoading";

async function EventsAndProjectsPageFetcher() {
  const fallback = resolveEventsAndProjectsPageContent(null);
  const eventsFallback = resolveEventsContent(null, null);

  if (!isWordPressConfigured()) {
    return (
      <EventsAndProjectsPage content={fallback} eventsContent={eventsFallback} />
    );
  }

  let page = null;
  let eventsSection = null;
  let events = null;

  try {
    page = await getEventsAndProjectsPage();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress events and projects page fetch failed.", error);
    }
  }

  try {
    const home = await getHomePage();
    eventsSection = home.events;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress home events section fetch failed.", error);
    }
  }

  try {
    events = await getEvents();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress events CPT fetch failed.", error);
    }
  }

  const content = resolveEventsAndProjectsPageContent(page);
  const eventsContent = resolveEventsContent(eventsSection, events);

  return <EventsAndProjectsPage content={content} eventsContent={eventsContent} />;
}

export function EventsAndProjectsPageContainer() {
  return (
    <Suspense fallback={<EventsAndProjectsPageLoading />}>
      <EventsAndProjectsPageFetcher />
    </Suspense>
  );
}
