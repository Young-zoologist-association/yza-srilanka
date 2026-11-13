import { Suspense } from "react";
import {
  getEvents,
  getHomePage,
  getStorePage,
  getStudyGroups,
  isWordPressConfigured,
} from "@/lib/api";
import { AboutSection } from "@/components/home/about-section/AboutSection";
import { EventsSection } from "@/components/home/events/EventsSection";
import { StoreSection } from "@/components/home/store/StoreSection";
import { Hero } from "@/components/home/hero/Hero";
import { StudyGroups } from "@/components/home/study-groups/StudyGroups";
import { resolveAboutContent } from "@/lib/home/about/resolveAboutContent";
import { resolveEventsContent } from "@/lib/home/events/resolveEventsContent";
import { resolveHomeStoreContent } from "@/lib/home/store/resolveHomeStoreContent";
import { resolveHeroContent } from "@/lib/home/hero/resolveHeroContent";
import { resolveStudyGroupsContent } from "@/lib/home/study-groups/resolveStudyGroupsContent";
import { HomeSectionsLoading } from "./HomeSectionsLoading";

async function HomeSectionsContent() {
  if (!isWordPressConfigured()) {
    return (
      <>
        <Hero content={resolveHeroContent(null)} />
        <AboutSection content={resolveAboutContent(null)} />
        <StudyGroups content={resolveStudyGroupsContent(null, null)} />
        <EventsSection content={resolveEventsContent(null, null)} />
        <StoreSection content={resolveHomeStoreContent(null)} />
      </>
    );
  }

  const [homeResult, eventsResult, groupsResult, storeResult] = await Promise.allSettled([
    getHomePage(),
    getEvents(),
    getStudyGroups(),
    getStorePage(),
  ]);

  if (process.env.NODE_ENV === "development") {
    if (homeResult.status === "rejected") {
      console.warn("WordPress home page fetch failed, using fallback content.", homeResult.reason);
    }
    if (eventsResult.status === "rejected") {
      console.warn("WordPress events CPT fetch failed.", eventsResult.reason);
    }
    if (groupsResult.status === "rejected") {
      console.warn("WordPress study groups CPT fetch failed.", groupsResult.reason);
    }
    if (storeResult.status === "rejected") {
      console.warn("WordPress store page fetch failed.", storeResult.reason);
    }
  }

  const home = homeResult.status === "fulfilled" ? homeResult.value : null;
  const events = eventsResult.status === "fulfilled" ? eventsResult.value : null;
  const groups = groupsResult.status === "fulfilled" ? groupsResult.value : null;
  const storePage = storeResult.status === "fulfilled" ? storeResult.value : null;

  return (
    <>
      <Hero content={resolveHeroContent(home?.hero ?? null)} />
      <AboutSection content={resolveAboutContent(home?.about ?? null)} />
      <StudyGroups content={resolveStudyGroupsContent(home?.studyGroups ?? null, groups)} />
      <EventsSection content={resolveEventsContent(home?.events ?? null, events)} />
      <StoreSection content={resolveHomeStoreContent(storePage)} />
    </>
  );
}

export function HomeSections() {
  return (
    <Suspense fallback={<HomeSectionsLoading />}>
      <HomeSectionsContent />
    </Suspense>
  );
}
